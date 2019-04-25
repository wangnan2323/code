//------------------------------------------------------------------------------
//     此代码由代码生成器EasyQuickDevelopToolV3.CodeFactory生成。
//     代码生成器版本：V3.1
//     代码模板版本：V1.20140523
//     
//     再编辑此代码以完成业务功能。
//     再编辑过程中须遵循现有编码规范和程序逻辑。     
//     异常的编码可能会导致不正确的行为。
//     重新生成代码，这些更改将会丢失。
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;
using System.Web.Script.Services;
using System.Reflection;
using Eva.Library.Data;
using System.Data;
using System.Text;
using System.Globalization;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_jfb 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_jfb : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_jfb _idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
        private sara.dd.ldsw.idal.Itbl_ld_cbiao _idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.reportclass.tbl_ld_jfb tt = new sara.dd.ldsw.reportclass.tbl_ld_jfb();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string type, string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                //缴费逻辑
                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_jfb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(json);

                #region 设置时间
                if (model.f_jfbh == "")
                {
                    model.f_jfbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
                }
                if (model.f_sjbh == "")
                {
                    model.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
                }
                model.f_jfrq = DateTime.Now;
                model.f_czsj = DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;
                #endregion


                    switch (type)
                    {
                        case "jf"://缴费
                            {
                                #region 缴费
                                string jfbid = _idal_tbl_ld_jfb.Add(model, _iAccessDataTrans);

                                IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);

                                if (model_khb_list.Count > 0)
                                {
                                    sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];

                                    //更新抄表表
                                    string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + model.f_jfbh + "',F_JFBHID='" + jfbid + "',F_JFSJ=to_date('" + model.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + model.f_cbbhid + ")";

                                    //更新客户表
                                    string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + ",F_VALUE3='" + model.f_kplbid + "',F_VALUE4='"+model.f_jffsid+"' where sys_id='" + model.f_khbhid + "'";


                                    int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                    int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);

                                    if (flag_cb >= 0 && flag_kh >= 0)
                                    {
                                        //写入客户表日志
                                        #region 写入日志
                                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                        IDictionary<string, string> temp = null;
                                        #region 对比各个业务子段，将不同的写入array
                                        if (model.f_yhye != model_khb.f_ycje)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_ycje");
                                            temp.Add("oldvalue", model_khb.f_ycje);
                                            temp.Add("newvalue", model.f_yhye);
                                            temp.Add("name", "绿化表押金");
                                            array.Add(temp);
                                        }
                                        if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_tjjzsf");
                                            temp.Add("oldvalue", model_khb.f_tjjzsf);
                                            temp.Add("newvalue", model.f_syhtjjzsf);
                                            temp.Add("name", "调价结转水费");
                                            array.Add(temp);
                                        }

                                        if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_tjjzpwf");
                                            temp.Add("oldvalue", model_khb.f_tjjzpwf);
                                            temp.Add("newvalue", model.f_syhtjjzpwf);
                                            temp.Add("name", "调价结转排污费");
                                            array.Add(temp);
                                        }
                                        if (model.f_cbyslj == null || model.f_cbyslj == "")
                                        {
                                            model.f_cbyslj = "0";
                                        }
                                        if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
                                        {
                                            model_khb.f_ljqf = "0";
                                        }


                                        if (double.Parse(model.f_cbyslj) > 0)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_ljqf");
                                            temp.Add("oldvalue", model_khb.f_ljqf);
                                            temp.Add("newvalue", (double.Parse(model_khb.f_ljqf) - double.Parse(model.f_cbyslj)).ToString());
                                            temp.Add("name", "累计欠费");
                                            array.Add(temp);
                                        }


                                        #endregion
                                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
                                        #endregion

                                        resultDic["result"] = "true";
                                        resultDic["message"] = jfbid;

                                        _iAccessDataTrans.getTrans().commit();
                                    }
                                    else
                                    {
                                        resultDic["result"] = "false";
                                        string errormessage = "";

                                        if (flag_cb <= 0)
                                        {
                                            errormessage += "抄表信息更新失败;";
                                        }
                                        if (flag_kh <= 0)
                                        {
                                            errormessage += "客户信息更新失败;";
                                        }

                                        resultDic["message"] = errormessage;
                                        _iAccessDataTrans.getTrans().rollback();
                                    }
                                }
                                else
                                {
                                    resultDic["result"] = "false";
                                    string errormessage = "";
                                    if (model_khb_list.Count <= 0)
                                    {
                                        errormessage += "没有查询到客户信息;";
                                    }


                                    resultDic["message"] = errormessage;
                                    _iAccessDataTrans.getTrans().rollback();
                                }

                                #endregion

                            }
                            break;
                        case "jfforapp"://app缴费
                            {


                                string jfbid = _idal_tbl_ld_jfb.Add(model, _iAccessDataTrans);


                                IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);

                                if (model_khb_list.Count > 0)
                                {

                                    sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];

                                    //更新抄表表
                                    string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + model.f_jfbh + "',F_JFBHID='" + jfbid + "',F_JFSJ=to_date('" + model.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + model.f_cbbhid + ")";
                                    //更新客户表
                                string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + " where sys_id='" + model.f_khbhid + "'";

                                    int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                    int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);
                                    if (flag_cb >= 0 && flag_kh >= 0)
                                    {
                                        //写入客户表日志
                                        #region 写入日志
                                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                        IDictionary<string, string> temp = null;
                                        #region 对比各个业务子段，将不同的写入array
                                        if (model.f_yhye != model_khb.f_ycje)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_ycje");
                                            temp.Add("oldvalue", model_khb.f_ycje);
                                            temp.Add("newvalue", model.f_yhye);
                                            temp.Add("name", "绿化表押金");
                                            array.Add(temp);
                                        }
                                        if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_tjjzsf");
                                            temp.Add("oldvalue", model_khb.f_tjjzsf);
                                            temp.Add("newvalue", model.f_syhtjjzsf);
                                            temp.Add("name", "调价结转水费");
                                            array.Add(temp);
                                        }

                                        if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_tjjzpwf");
                                            temp.Add("oldvalue", model_khb.f_tjjzpwf);
                                            temp.Add("newvalue", model.f_syhtjjzpwf);
                                            temp.Add("name", "调价结转排污费");
                                            array.Add(temp);
                                        }
                                        if (model.f_cbyslj == null || model.f_cbyslj == "")
                                        {
                                            model.f_cbyslj = "0";
                                        }
                                        if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
                                        {
                                            model_khb.f_ljqf = "0";
                                        }



                                        #endregion
                                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
                                        #endregion

                                        resultDic["result"] = "true";
                                        resultDic["message"] = jfbid;
                                        _iAccessDataTrans.getTrans().commit();
                                    }
                                    else
                                    {
                                        resultDic["result"] = "false";
                                        string errormessage = "";

                                        if (flag_cb < 0)
                                        {
                                            errormessage += "抄表信息更新失败;";
                                        }
                                        if (flag_kh < 0)
                                        {
                                            errormessage += "客户信息更新失败;";
                                        }

                                        resultDic["message"] = errormessage;
                                        _iAccessDataTrans.getTrans().rollback();
                                    }

                                }
                                else
                                {
                                    resultDic["result"] = "false";
                                    string errormessage = "";
                                    if (model_khb_list.Count <= 0)
                                    {
                                        errormessage += "没有查询到客户信息;";
                                    }


                                    resultDic["message"] = errormessage;
                                    _iAccessDataTrans.getTrans().rollback();
                                }

                            }
                            break;
                        case "pt"://普通==
                            {
                                string jfbid = _idal_tbl_ld_jfb.Add(model, _iAccessDataTrans);
                                resultDic["result"] = "true";
                                resultDic["message"] = jfbid;
                                _iAccessDataTrans.getTrans().commit();
                            }
                            break;
                    }





                NewLog("数据创建成功，创建的数据为：" + json, "sql_insert", clientInf);
            }
            catch (Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("数据创建失败，创建的数据为：" + json + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddCross(string json, string type, string clientInf)
        {
            string result1 = this.Add(json, type, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddList(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                List<sara.dd.ldsw.model.tbl_ld_jfb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_jfb>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_jfb.AddList(modellist, null);

                NewLog("数据创建成功，创建的数据为：" + json, "sql_insert", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据创建失败，创建的数据为：" + json + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddListCross(string json, string clientInf)
        {
            string result1 = this.AddList(json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Update(string json, string type, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();

            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_jfb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(json);
                model.sys_lasteditdate = DateTime.Now;

                switch (type)
                {
                    case "jf":
                        {
                            #region 缴费
                            columns = FormatColumns(columns).Replace("^", ",");
                            _idal_tbl_ld_jfb.Update(model, columns, _iAccessDataTrans);


                            IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);
                            if (model_khb_list.Count > 0)
                            {
                                sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];

                                //更新抄表表
                                string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + model.f_jfbh + "',F_JFBHID='" + model.sys_id + "',F_JFSJ=to_date('" + model.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + model.f_cbbhid + ")";
                                //更新客户表
                                string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + " where sys_id='" + model.f_khbhid + "'";

                                int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);

                                if (flag_cb >= 0 && flag_kh >= 0)
                                {

                                    //写入客户表日志
                                    #region 写入日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    IDictionary<string, string> temp = null;
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_yhye != model_khb.f_ycje)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ycje");
                                        temp.Add("oldvalue", model_khb.f_ycje);
                                        temp.Add("newvalue", model.f_yhye);
                                        temp.Add("name", "绿化表押金");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzsf");
                                        temp.Add("oldvalue", model_khb.f_tjjzsf);
                                        temp.Add("newvalue", model.f_syhtjjzsf);
                                        temp.Add("name", "调价结转水费");
                                        array.Add(temp);
                                    }

                                    if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzpwf");
                                        temp.Add("oldvalue", model_khb.f_tjjzpwf);
                                        temp.Add("newvalue", model.f_syhtjjzpwf);
                                        temp.Add("name", "调价结转排污费");
                                        array.Add(temp);
                                    }
                                    if (model.f_cbyslj == null || model.f_cbyslj == "")
                                    {
                                        model.f_cbyslj = "0";
                                    }
                                    if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
                                    {
                                        model_khb.f_ljqf = "0";
                                    }


                                    if (double.Parse(model.f_cbyslj) > 0)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljqf");
                                        temp.Add("oldvalue", model_khb.f_ljqf);
                                        temp.Add("newvalue", (double.Parse(model_khb.f_ljqf) - double.Parse(model.f_cbyslj)).ToString());
                                        temp.Add("name", "累计欠费");
                                        array.Add(temp);
                                    }


                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
                                    #endregion


                                    resultDic["result"] = "true";
                                    resultDic["message"] = "";

                                    _iAccessDataTrans.getTrans().commit();
                                }
                                else
                                {
                                    resultDic["result"] = "false";
                                    string errormessage = "";

                                    if (flag_cb < 0)
                                    {
                                        errormessage += "抄表信息更新失败;";
                                    }
                                    if (flag_kh < 0)
                                    {
                                        errormessage += "客户信息更新失败;";
                                    }

                                    resultDic["message"] = errormessage;
                                    _iAccessDataTrans.getTrans().rollback();
                                }


                            }
                            else
                            {
                                resultDic["result"] = "false";
                                string errormessage = "";
                                if (model_khb_list.Count <= 0)
                                {
                                    errormessage += "没有查询到客户信息;";
                                }
                                resultDic["message"] = errormessage;
                                _iAccessDataTrans.getTrans().rollback();

                            }
                            #endregion
                        }
                        break;
                    case "hg":
                        {
                            //#region 回滚
                            //columns = FormatColumns(columns).Replace("^", ",");
                            //_idal_tbl_ld_jfb.Update(model, columns, _iAccessDataTrans);


                            //IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);
                            //if (model_khb_list.Count > 0)
                            //{
                            //    sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];
                            //    string updatecb = "";
                            //    string updatekh = "";
                            //    if (model.f_lyid == "08080004")
                            //    {
                            //        //抄表机更新抄表表
                            //        updatecb = "update TBL_LD_CBIAO set F_ZT='已抄表',F_ZTID='1',F_JFBH='',F_JFBHID='',F_JFSJ='' where SYS_ID in (" + model.f_cbbhid + ")";
                            //        //更新客户表
                            //        updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_khyye + "',F_TJJZSF='" + model.f_khytjjzsf + "',F_TJJZPWF='" + model.f_khytjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')+" + model.f_cbyslj + " where sys_id='" + model.f_khbhid + "'";

                            //    }
                            //    else
                            //    {
                            //        //营业厅更新抄表表
                            //        updatecb = "update TBL_LD_CBIAO set F_ZT='已算费',F_ZTID='2',F_JFBH='',F_JFBHID='',F_JFSJ='' where SYS_ID in (" + model.f_cbbhid + ")";
                            //        //更新客户表
                            //        updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_khyye + "',F_TJJZSF='" + model.f_khytjjzsf + "',F_TJJZPWF='" + model.f_khytjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')+" + model.f_cbyslj + " where sys_id='" + model.f_khbhid + "'";



                            //    }

                            //    int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                            //    int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);
                            //    if (flag_cb >= 0 && flag_kh >= 0)
                            //    {
                            //        //写入客户表日志
                            //        #region 写入日志
                            //        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                            //        IDictionary<string, string> temp = null;
                            //        #region 对比各个业务子段，将不同的写入array
                            //        if (model.f_yhye != model_khb.f_ycje)
                            //        {
                            //            temp = new Dictionary<string, string>();
                            //            temp.Add("key", "f_ycje");
                            //            temp.Add("oldvalue", model_khb.f_ycje);
                            //            temp.Add("newvalue", model.f_yhye);
                            //            temp.Add("name", "绿化表押金");
                            //            array.Add(temp);
                            //        }
                            //        if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
                            //        {
                            //            temp = new Dictionary<string, string>();
                            //            temp.Add("key", "f_tjjzsf");
                            //            temp.Add("oldvalue", model_khb.f_tjjzsf);
                            //            temp.Add("newvalue", model.f_syhtjjzsf);
                            //            temp.Add("name", "调价结转水费");
                            //            array.Add(temp);
                            //        }

                            //        if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
                            //        {
                            //            temp = new Dictionary<string, string>();
                            //            temp.Add("key", "f_tjjzpwf");
                            //            temp.Add("oldvalue", model_khb.f_tjjzpwf);
                            //            temp.Add("newvalue", model.f_syhtjjzpwf);
                            //            temp.Add("name", "调价结转排污费");
                            //            array.Add(temp);
                            //        }
                            //        if (model.f_cbyslj == null || model.f_cbyslj == "")
                            //        {
                            //            model.f_cbyslj = "0";
                            //        }
                            //        if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
                            //        {
                            //            model_khb.f_ljqf = "0";
                            //        }


                            //        if (double.Parse(model.f_cbyslj) > 0)
                            //        {
                            //            temp = new Dictionary<string, string>();
                            //            temp.Add("key", "f_ljqf");
                            //            temp.Add("oldvalue", model_khb.f_ljqf);
                            //            temp.Add("newvalue", (double.Parse(model_khb.f_ljqf) + double.Parse(model.f_cbyslj)).ToString());
                            //            temp.Add("name", "累计欠费");
                            //            array.Add(temp);
                            //        }


                            //        #endregion
                            //        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
                            //        #endregion

                            //        #region 缴费回滚日志
                            //        List<IDictionary<string, string>> array1 = new List<IDictionary<string, string>>();
                            //        IDictionary<string, string> temp1 = null;
                            //        temp1 = new Dictionary<string, string>();
                            //        temp1.Add("key", "rollback");
                            //        temp1.Add("oldvalue", "客户编号： " + model_khb.f_khbh + " 抄表编号：" + model.f_cbbh + "  缴费编号： " + model.f_jfbh);
                            //        temp1.Add("newvalue", "");
                            //        temp1.Add("name", "抄表回滚");
                            //        array1.Add(temp1);
                            //        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_jfb", model.sys_id.ToString(), "tbl_ld_jfb_detail", "缴费回滚", array1, clientInf, _iAccessDataTrans);
                            //        #endregion
                            //        resultDic["result"] = "true";
                            //        resultDic["message"] = "";

                            //        _iAccessDataTrans.getTrans().commit();
                            //    }
                            //    else
                            //    {
                            //        resultDic["result"] = "false";
                            //        string errormessage = "";

                            //        if (flag_cb < 0)
                            //        {
                            //            errormessage += "抄表信息更新失败;";
                            //        }
                            //        if (flag_kh < 0)
                            //        {
                            //            errormessage += "客户信息更新失败;";
                            //        }

                            //        resultDic["message"] = errormessage;
                            //        _iAccessDataTrans.getTrans().rollback();
                            //    }

                            //}
                            //else
                            //{
                            //    resultDic["result"] = "false";
                            //    string errormessage = "";
                            //    if (model_khb_list.Count <= 0)
                            //    {
                            //        errormessage += "没有查询到客户信息;";
                            //    }
                            //    resultDic["message"] = errormessage;
                            //    _iAccessDataTrans.getTrans().rollback();
                            //}

                            //resultDic["result"] = "true";
                            //resultDic["message"] = "";
                            //#endregion
                        }
                        break;
                    case "pt":
                    default:
                        {
                            columns = FormatColumns(columns).Replace("^", ",");
                            _idal_tbl_ld_jfb.Update(model, columns, _iAccessDataTrans);

                            _iAccessDataTrans.getTrans().commit();

                            resultDic["result"] = "true";
                            resultDic["message"] = "";
                        }
                        break;
                }



                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
            }
            catch (Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateCross(string json, string type, string columns, string clientInf)
        {
            string result1 = this.Update(json, type, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateList(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                List<sara.dd.ldsw.model.tbl_ld_jfb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_jfb>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_jfb.UpdateList(modellist, columns, null);

                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateListCross(string json, string columns, string clientInf)
        {
            string result1 = this.UpdateList(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Delete(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                //删除附件的功能
                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();
                //删除子表的方法
                string sql = " update tbl_ld_cbiao set f_jfbh ='',f_jfbhid ='' where f_jfbhid in(select sys_id from tbl_ld_jfb where " + whereString + ")";
                //加入删除子表附件文件的方法
                _iAccessDataTrans.ExecuteSql(sql);

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_jfb.Delete(whereString, _iAccessDataTrans);
                _iAccessDataTrans.getTrans().commit();
                NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);

            }
            catch (Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据删除失败，删除的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_delete", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void DeleteCross(string whereString, string clientInf)
        {
            string result1 = this.Delete(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string LogicDelete(string delUserId, string delUserName, string delDate, string whereString, string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_jfb.LogicDelete(delUserId, delUserName, delDate, whereString, null);

                NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据删除失败，删除的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_delete", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void LogicDeleteCross(string delUserId, string delUserName, string delDate, string whereString, string clientInf)
        {
            string result1 = this.LogicDelete(delUserId, delUserName, delDate, whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCount(string whereString, string cxzxsjString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_jfb.GetCount(whereString, cxzxsjString, null);

                NewLog("数据统计成功，统计的数据条件为：" + whereString, "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据统计失败，统计的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetCountCross(string whereString, string cxzxsjString, string clientInf)
        {
            string result1 = this.GetCount(whereString, cxzxsjString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetList(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");


                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_jfb.GetDataTableForPC(whereString, cxzxsjString, orderByString, columnsString, pageSizeString, pageIndexString, null));
                string message = "{\"total\":\"" + _idal_tbl_ld_jfb.GetCount(whereString, cxzxsjString, null) + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

                NewLog("数据查询成功，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，pageSizeString：" + pageSizeString + "，pageIndexString：" + pageIndexString + "", "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据查询失败，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，pageSizeString：" + pageSizeString + "，pageIndexString：" + pageIndexString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetListCross(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetList(whereString, cxzxsjString, orderByString, columnsString, pageSizeString, pageIndexString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetListForApp(string whereString, string cxzxsjString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_jfb.GetDataTableForApp(whereString, cxzxsjString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_jfb.GetCount(whereString, cxzxsjString, null) + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

                NewLog("数据查询成功，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，countString：" + countString + "，stepString：" + stepString + "", "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据查询失败，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，countString：" + countString + "，stepString：" + stepString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetListForAppCross(string whereString, string cxzxsjString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetListForApp(whereString, cxzxsjString, orderByString, columnsString, countString, stepString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="columns"></param>
        /// <returns></returns>
        private string FormatColumns(string columns)
        {
            if (columns == "")
            {

                columns += "^" + "sys_id";

                columns += "^" + "sys_orderid";

                columns += "^" + "sys_creatuserid";

                columns += "^" + "sys_creatusername";

                columns += "^" + "sys_creatdate";

                columns += "^" + "sys_lastedituserid";

                columns += "^" + "sys_lasteditusername";

                columns += "^" + "sys_lasteditdate";

                columns += "^" + "sys_deluserid";

                columns += "^" + "sys_delusername";

                columns += "^" + "sys_deldate";

                columns += "^" + "sys_delflag";

                columns += "^" + "f_value1";

                columns += "^" + "f_value2";

                columns += "^" + "f_value3";

                columns += "^" + "f_value4";

                columns += "^" + "f_value5";

                columns += "^" + "f_value6";

                columns += "^" + "f_value7";

                columns += "^" + "f_value8";

                columns += "^" + "f_value9";

                columns += "^" + "f_value10";

                columns += "^" + "f_jfbh";

                columns += "^" + "f_sjbh";

                columns += "^" + "f_jfrq";

                columns += "^" + "f_jffs";

                columns += "^" + "f_jffsid";

                columns += "^" + "f_jf_jffsid";

                columns += "^" + "f_jcfs";

                columns += "^" + "f_jcfsid";

                columns += "^" + "f_jc_jcfsid";

                columns += "^" + "f_yyy";

                columns += "^" + "f_yyyid";








                columns += "^" + "f_czr";

                columns += "^" + "f_czsj";

                columns += "^" + "f_sfykfp";

                columns += "^" + "f_zt";

                columns += "^" + "f_ztid";

                columns += "^" + "f_bz";

                columns += "^" + "f_khbh";

                columns += "^" + "f_khbhid";

                columns += "^" + "f_yhbh";

                columns += "^" + "f_yhbhid";

                columns += "^" + "f_yhm";

                columns += "^" + "f_jfm";

                columns += "^" + "f_dz";

                columns += "^" + "f_dh";

                columns += "^" + "f_dy";

                columns += "^" + "f_dyid";

                columns += "^" + "f_sc";

                columns += "^" + "f_scid";

                columns += "^" + "f_qy";

                columns += "^" + "f_qyid";

                columns += "^" + "f_pq";

                columns += "^" + "f_pqid";

                columns += "^" + "f_sbbh";

                columns += "^" + "f_sbbhid";

                columns += "^" + "f_yslx";

                columns += "^" + "f_yslxid";

                columns += "^" + "f_lxtkhh";

                columns += "^" + "f_sblx";

                columns += "^" + "f_sblxid";

                columns += "^" + "f_rs";

                columns += "^" + "f_cbbh";

                columns += "^" + "f_cbbhid";








                columns += "^" + "f_znjbh";

                columns += "^" + "f_znjbhid";

                columns += "^" + "f_znjje";

                columns += "^" + "f_fjbh";

                columns += "^" + "f_fjbhid";

                columns += "^" + "f_fjje";
                columns += "^" + "f_yyt";
                columns += "^" + "f_yytid";
                columns += "^" + "f_dj";
                columns += "^" + "f_cbyslj";
                columns += "^" + "f_sllj";
                columns += "^" + "f_sflj";
                columns += "^" + "f_pwflj";
                columns += "^" + "f_jmhyslj";
                columns += "^" + "f_jmjelj";
                columns += "^" + "f_khytjjzsf";
                columns += "^" + "f_khytjjzpwf";
                columns += "^" + "f_sfsytjjz";
                columns += "^" + "f_khyye";
                columns += "^" + "f_sfsyye";
                columns += "^" + "f_syye";
                columns += "^" + "f_yhye";
                columns += "^" + "f_shys";
                columns += "^" + "f_shss";
                columns += "^" + "f_hszl";
                columns += "^" + "f_shssdx";
                columns += "^" + "f_khfz";
                columns += "^" + "f_khfzid";
                columns += "^" + "f_cbenbh";
                columns += "^" + "f_cbenbhid";
                columns += "^" + "f_ljqf";
                columns += "^" + "f_kplb";
                columns += "^" + "f_kplbid";
                columns += "^" + "f_sytjjzsf";
                columns += "^" + "f_sytjjzpwf";
                columns += "^" + "f_syhtjjzsf";
                columns += "^" + "f_syhtjjzpwf";
                columns += "^" + "f_ly";
                columns += "^" + "f_lyid";
                columns += "^" + "f_sfjl";


            }
            return columns.TrimStart('^');
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="messageString"></param>
        /// <param name="logClassString">
        /// sql_select,sql_insert,sql_update,sql_delete,
        /// function_select,function_edit,
        /// server_select,server_edit
        /// message_result,message_error,message_prepare
        /// </param>
        /// <param name="clientInfoJsonString"></param>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        private void NewLog(string messageString, string logClassString, string clientInfoJsonString)
        {

            Eva.Library.Log.LogContentModel lcm = new Eva.Library.Log.LogContentModel();
            switch (logClassString.ToLower())
            {
                case "sql_select":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_select;
                    break;
                case "sql_insert":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_insert;
                    break;
                case "sql_update":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_update;
                    break;
                case "sql_delete":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_delete;
                    break;
                case "function_select":
                    lcm.f_logclass = Eva.Library.Log.LogClass.function_select;
                    break;
                case "function_edit":
                    lcm.f_logclass = Eva.Library.Log.LogClass.function_edit;
                    break;
                case "server_select":
                    lcm.f_logclass = Eva.Library.Log.LogClass.server_select;
                    break;
                case "server_edit":
                    lcm.f_logclass = Eva.Library.Log.LogClass.server_edit;
                    break;
                case "message_result":
                    lcm.f_logclass = Eva.Library.Log.LogClass.message_result;
                    break;
                case "message_error":
                    lcm.f_logclass = Eva.Library.Log.LogClass.message_error;
                    break;
                case "message_prepare":
                    lcm.f_logclass = Eva.Library.Log.LogClass.message_prepare;
                    break;
            }

            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInfoJsonString);

            lcm.f_content = messageString;
            lcm.f_userid = clientInfoDic["userid"];
            lcm.f_appcode = clientInfoDic["appcode"];
            lcm.f_appname = clientInfoDic["appname"];
            lcm.f_userip = clientInfoDic["userip"];
            lcm.f_usermac = clientInfoDic["usermac"];
            lcm.f_username = clientInfoDic["username"];


            sara.dd.ldsw.Global._ilog.NewLog(lcm);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            string sql = "";
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                if (whereString != "")
                {
                    sql = "select f_khbh,f_sjbh,f_jfbh,f_yhm,f_dz,f_dj,f_cbyslj,f_sflj,f_pwflj,f_shss,";
                    sql += "f_jmjelj,f_jffs,f_jcfs,f_yyy,f_czsj,f_sfykfp,f_kplb,f_yyt,f_zt,f_ly from tbl_ld_jfb";
                    sql += " where " + whereString + " ";
                }
                else
                {
                    sql = "select f_khbh,f_sjbh,f_jfbh,f_yhm,f_dz,f_dj,f_cbyslj,f_sflj,f_pwflj,f_shss,";
                    sql += "f_jmjelj,f_jffs,f_jcfs,f_yyy,f_czsj,f_sfykfp,f_kplb,f_yyt,f_zt,f_ly from tbl_ld_jfb";
                }
                DataTable dt = _iAccessData.Query(sql).Tables[0];

                string file = tt.Report_jfls(dt);
                resultDic["result"] = "true";
                resultDic["message"] = file;

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void ExportCross(string whereString, string clientInf)
        {
            string result1 = this.Export(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Updatekp(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sql = "update tbl_ld_jfb set f_sfykfp='true'where " + whereString + " ";
                int flag = _iAccessData.ExecuteSql(sql);
                if (flag >= 0)
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "更新成功";
                    NewLog("更新数据成功，更新的数据条件为：" + whereString, "sql_update", clientInf);
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "更新失败。";
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("更新数据失败，更新的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "update_delete", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdatekpCross(string whereString, string clientInf)
        {
            string result1 = this.Updatekp(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string NewExport(string whereString, string cxzxsjString, string orderByString, string column, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_jfb";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];

                DataTable dt = _idal_tbl_ld_jfb.GetDataTableForPC(whereString, cxzxsjString, orderByString, column, "", "", null);

                string file = tt.ReportExcel(dt, column, columnname);

                resultDic["result"] = "true";
                resultDic["message"] = file;

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void NewExportCross(string whereString, string cxzxsjString, string orderByString, string column, string columnname, string clientInf)
        {
            string result1 = this.NewExport(whereString, cxzxsjString, orderByString, column, columnname, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string IsCanRollBack(string sys_id, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sql = "select count(*) from tbl_ld_jfb where sys_id > '" + sys_id + "' and f_khbhid = (select f_khbhid from tbl_ld_jfb  where sys_id = '" + sys_id + "') and f_ztid='2'";
                string count = _iAccessData.GetSingle(sql).ToString();
                if (count != "0")
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "false";
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "true";
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void IsCanRollBackCross(string sys_id, string clientInf)
        {
            string result1 = this.IsCanRollBack(sys_id, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string WriteOff(string json,string sys_id,string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                //更新抄表状态
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlstr = "UPDATE tbl_ld_jfb SET f_zt='已冲红',f_ztid='3' WHERE sys_id='" + sys_id + "'";
                int result = _iAccessData.ExecuteSql(sqlstr);
                if (result <= 0)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "更新缴费状态时出错";
                }
                else
                {
                    
                    //添加冲红的缴费记录
                    string result1 = this.Add(json, "pt", clientInf);
                    IDictionary<string, string> addresult = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(result1);
                    sara.dd.ldsw.model.tbl_ld_jfb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(json);
                    sqlstr = "UPDATE tbl_ld_jfb SET f_czsj=to_date('"+model.f_czsj+ "','yyyy-mm-dd hh24:mi:ss'),f_jfrq=to_date('" + model.f_jfrq + "','yyyy-mm-dd hh24:mi:ss') WHERE sys_id='" + addresult["message"] + "'";
                    result = _iAccessData.ExecuteSql(sqlstr);
                    if (result <= 0)
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "更新缴费时间时出错";
                    }
                    IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                    //增加冲红日志
                    #region 写入日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = null;
                    
                    temp = new Dictionary<string, string>();
                    temp.Add("key", "创建人" + clientInfoDic["username"]);
                    temp.Add("oldvalue", "客户编号" + model.f_khbh+ ",冲红金额" + model.f_cbyslj);
                    temp.Add("newvalue", "");
                    temp.Add("name", "缴费冲红");
                    array.Add(temp);



                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_jfb", model.f_khbhid.ToString(), "tbl_ld_jfb_list", "缴费冲红", array, clientInf, null);
                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                    #endregion
                }


            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("数据创建失败，创建的数据为：" + json + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBack(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();
                #region 回滚缴费以及抄表记录
                
                IList<sara.dd.ldsw.model.tbl_ld_jfb> modellist = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList < sara.dd.ldsw.model.tbl_ld_jfb > (_idal_tbl_ld_jfb.GetDataTableForPC(whereString, "false", "", "*", "", "", _iAccessDataTrans));

                if(modellist.Count == 1)
                {
                    sara.dd.ldsw.model.tbl_ld_jfb model = modellist[0];
                    IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);
                    if (model_khb_list.Count > 0)
                    {
                        sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];
                        string updatecb = "";
                        string updatekh = "";
                        if (model.f_lyid == "08080004")
                        {

                            //更新客户表
                            double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_sllj);


                            #region 回滚客户表数据
                            IList<sara.dd.ldsw.model.tbl_ld_cbiao> cbmodellist = _idal_tbl_ld_cbiao.GetList(" sys_id in (" + model.f_cbbhid.ToString() + ")","", "", "*", "", "", _iAccessDataTrans);
                            sara.dd.ldsw.model.tbl_ld_cbiao cbmodel = cbmodellist[0];
                            //上一条抄表记录
                            DataTable dt_sytcbjl = _iAccessDataTrans.Query("select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl,rownum  from (select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' and sys_id <> '"+cbmodel.sys_id+"' order by f_cbsj desc) t where rownum =1").Tables[0];

                            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", _iAccessDataTrans)[0];
                            #region 记录旧值
                            string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
                            string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
                            string f_sqzm_old = model_tbl_ld_khb.f_sqzm;

                            string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
                            string f_sqsl_old = model_tbl_ld_khb.f_sqsl;

                            string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
                            string f_ljgl_old = model_tbl_ld_khb.f_ljgl;

                            string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
                            string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
                            #endregion

                            //计算新的抄表周期
                            DateTime cbsj;
                            DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                            dtFormat.ShortDatePattern = "yyyy/MM/dd";

                            cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);
                            int sbyear = cbsj.Year;
                            int sbmonth = cbsj.Month + 1;
                            if (sbmonth == 13)
                            {
                                sbyear++;
                                sbmonth = 1;
                            }
                            cbsj = new DateTime(sbyear, sbmonth, 1);
                            int cbzq = 0;
                            if (int.TryParse(model_tbl_ld_khb.f_cbzq, out cbzq))
                            {

                            }
                            else
                            {
                                cbzq = 1;
                            }

                            cbsj = cbsj.AddMonths(-cbzq);



                            cbsj = cbsj.AddDays(-1);


                            if (dt_sytcbjl.Rows.Count > 0)
                            {
                                model_tbl_ld_khb.f_zhcbrq = cbsj;
                                model_tbl_ld_khb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                                model_tbl_ld_khb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                                model_tbl_ld_khb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                                model_tbl_ld_khb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();
                                model_tbl_ld_khb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                                model_tbl_ld_khb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                                //model_tbl_ld_khb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                            }
                            else
                            {
                                model_tbl_ld_khb.f_zhcbrq = cbsj;

                                model_tbl_ld_khb.f_bqzm = cbmodel.f_sqzm;
                                model_tbl_ld_khb.f_sqzm = "";

                                model_tbl_ld_khb.f_bqsl = cbmodel.f_sqsl;
                                model_tbl_ld_khb.f_sqsl = "";
                                model_tbl_ld_khb.f_qsqpjsl = "";
                                model_tbl_ld_khb.f_qlqpjsl = "";
                                //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                                //double new_nljgl = nljgl - bqsl;
                                //model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                            }

                            model_tbl_ld_khb.f_nljgl = cbmodel.f_sjljsyl;

                            double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                            double new_ljgl = ljgl - bqsl;
                            model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

                            model_tbl_ld_khb.f_ycje = model.f_khyye;
                            model_tbl_ld_khb.f_tjjzsf = model.f_khytjjzsf;
                            model_tbl_ld_khb.f_tjjzpwf = model.f_khytjjzpwf;

                            idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ycje,f_tjjzsf,f_tjjzpwf,f_ljgl,f_nljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_zhcbrq", _iAccessDataTrans);
                            #region 写日志
                            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                            IDictionary<string, string> temp = new Dictionary<string, string>();
                            temp.Add("key", "f_zhcbrq");
                            temp.Add("oldvalue", f_zhcbrq_old);
                            temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                            temp.Add("name", "最后抄表日期");
                            array.Add(temp);
                            IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                            f_nljgl.Add("key", "f_nljgl");
                            f_nljgl.Add("oldvalue", f_nljgl_old);
                            f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                            f_nljgl.Add("name", "年累计够量");
                            array.Add(f_nljgl);
                            IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                            f_ljgl.Add("key", "f_ljgl");
                            f_ljgl.Add("oldvalue", f_ljgl_old);
                            f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                            f_ljgl.Add("name", "累计够量");
                            array.Add(f_ljgl);
                            IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                            qsqpjsl_dic.Add("key", "qsqpjsl");
                            qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                            qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                            qsqpjsl_dic.Add("name", "前三期平均水量");
                            array.Add(qsqpjsl_dic);
                            IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                            qlqpjsl_dic.Add("key", "qlqpjsl");
                            qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                            qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                            qlqpjsl_dic.Add("name", "年累计够量");
                            array.Add(qlqpjsl_dic);


                            IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                            f_bqzm.Add("key", "f_bqzm");
                            f_bqzm.Add("oldvalue", f_bqzm_old);
                            f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                            f_bqzm.Add("name", "本期止码");
                            array.Add(f_bqzm);

                            IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                            f_sqzm.Add("key", "f_sqzm");
                            f_sqzm.Add("oldvalue", f_sqzm_old);
                            f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                            f_sqzm.Add("name", "上期止码");
                            array.Add(f_sqzm);

                            IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                            f_bqsl.Add("key", "f_bqsl");
                            f_bqsl.Add("oldvalue", f_bqsl_old);
                            f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                            f_bqsl.Add("name", "本期水量");
                            array.Add(f_bqsl);

                            IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                            f_sqsl.Add("key", "f_sqsl");
                            f_sqsl.Add("oldvalue", f_sqsl_old);
                            f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                            f_sqsl.Add("name", "上期水量");
                            array.Add(f_sqsl);

                            if (model.f_yhye != model_khb.f_ycje)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_ycje");
                                temp.Add("oldvalue", model_khb.f_ycje);
                                temp.Add("newvalue", model.f_yhye);
                                temp.Add("name", "绿化表押金");
                                array.Add(temp);
                            }
                            if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_tjjzsf");
                                temp.Add("oldvalue", model_khb.f_tjjzsf);
                                temp.Add("newvalue", model.f_syhtjjzsf);
                                temp.Add("name", "调价结转水费");
                                array.Add(temp);
                            }

                            if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_tjjzpwf");
                                temp.Add("oldvalue", model_khb.f_tjjzpwf);
                                temp.Add("newvalue", model.f_syhtjjzpwf);
                                temp.Add("name", "调价结转排污费");
                                array.Add(temp);
                            }


                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, _iAccessDataTrans);
                            #endregion

                            #endregion


                            #region 回滚水表表数据
                            //【年累计购量】【累计购量】 
                            //【前三期平均水量】【前六期平均水量】

                            //【上期止码】【本期止码】【上期水量】【本期水量】

                            sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                            sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", _iAccessDataTrans)[0];

                            string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                            string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                            string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                            string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;

                            string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                            string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                            string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                            string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;

                            if (dt_sytcbjl.Rows.Count > 0)
                            {
                                model_tbl_ld_sbb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                                model_tbl_ld_sbb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                                model_tbl_ld_sbb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                                model_tbl_ld_sbb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();
                                model_tbl_ld_sbb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                                model_tbl_ld_sbb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                                //model_tbl_ld_sbb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                            }
                            else
                            {
                                model_tbl_ld_sbb.f_bqzm = cbmodel.f_sqzm;
                                model_tbl_ld_sbb.f_sqzm = "";

                                model_tbl_ld_sbb.f_bqsl = cbmodel.f_sqsl;
                                model_tbl_ld_sbb.f_sqsl = "";
                                model_tbl_ld_sbb.f_qsqpjsl = "";
                                model_tbl_ld_sbb.f_qlqpjsl = "";
                                //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                                //double new_nljgl = nljgl - bqsl;
                                //model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl, 2);
                            }

                            double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                            double now_ljgl = sb_ljgl - bqsl;
                            model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);
                            model_tbl_ld_sbb.f_nljgl = cbmodel.f_sjljsyl;


                            idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", _iAccessDataTrans);


                            #region 写日志
                            //写日志
                            List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();

                            IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                            sb_f_nljgl.Add("key", "f_nljgl");
                            sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                            sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                            sb_f_nljgl.Add("name", "年累计购量");
                            list.Add(sb_f_nljgl);

                            IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                            sb_f_ljgl.Add("key", "f_ljgl");
                            sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                            sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                            sb_f_ljgl.Add("name", "累计购量");
                            list.Add(sb_f_ljgl);

                            IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                            sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                            sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                            sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                            sb_f_qsqpjsl.Add("name", "前三期平均水量");
                            list.Add(sb_f_qsqpjsl);

                            IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                            sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                            sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                            sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                            sb_f_qlqpjsl.Add("name", "前六期平均水量");
                            list.Add(sb_f_qlqpjsl);


                            IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                            sb_f_bqzm.Add("key", "f_bqzm");
                            sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                            sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
                            sb_f_bqzm.Add("name", "本期止码");
                            list.Add(sb_f_bqzm);

                            IDictionary<string, string> sb_f_sqzm = new Dictionary<string, string>();
                            sb_f_sqzm.Add("key", "f_sqzm");
                            sb_f_sqzm.Add("oldvalue", sb_f_sqzm_old);
                            sb_f_sqzm.Add("newvalue", model_tbl_ld_sbb.f_sqzm);
                            sb_f_sqzm.Add("name", "上期止码");
                            list.Add(sb_f_sqzm);

                            IDictionary<string, string> sb_f_bqsl = new Dictionary<string, string>();
                            sb_f_bqsl.Add("key", "f_bqsl");
                            sb_f_bqsl.Add("oldvalue", sb_f_bqsl_old);
                            sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                            sb_f_bqsl.Add("name", "本期水量");
                            list.Add(sb_f_bqsl);

                            IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                            sb_f_sqsl.Add("key", "f_sqsl");
                            sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                            sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                            sb_f_sqsl.Add("name", "上期水量");
                            list.Add(sb_f_sqsl);

                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, _iAccessDataTrans);
                            #endregion
                            #endregion

                            #region 删除缴费记录                            
                            _idal_tbl_ld_jfb.Delete(whereString, _iAccessDataTrans);

                            #endregion

                            #region 删除抄表记录
                            _idal_tbl_ld_cbiao.Delete(" sys_id in (" + model.f_cbbhid + ")", _iAccessDataTrans);
                            #endregion

                            #region 缴费回滚日志
                            List<IDictionary<string, string>> array1 = new List<IDictionary<string, string>>();
                            IDictionary<string, string> temp1 = null;
                            temp1 = new Dictionary<string, string>();
                            temp1.Add("key", "rollback");
                            temp1.Add("oldvalue", "客户编号： " + model_khb.f_khbh + " 抄表编号：" + model.f_cbbh + "  缴费编号： " + model.f_jfbh);
                            temp1.Add("newvalue", "");
                            temp1.Add("name", "抄表回滚");
                            array1.Add(temp1);
                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_jfb", model.sys_id.ToString(), "tbl_ld_jfb_detail", "缴费回滚", array1, clientInf, _iAccessDataTrans);
                            #endregion

                            _iAccessDataTrans.getTrans().commit();
                            resultDic["result"] = "true";
                            resultDic["message"] = "";

                        }
                        else
                        {
                            //营业厅更新抄表表
                            updatecb = "update TBL_LD_CBIAO set F_ZT='已算费',F_ZTID='2',F_JFBH='',F_JFBHID='',F_JFSJ='' where SYS_ID in (" + model.f_cbbhid + ")";
                            //更新客户表
                            updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_khyye + "',F_TJJZSF='" + model.f_khytjjzsf + "',F_TJJZPWF='" + model.f_khytjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')+" + model.f_cbyslj + " where sys_id='" + model.f_khbhid + "'";

                            int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                            int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);
                            //写入客户表日志
                            #region 写入日志
                            if (flag_cb >= 0 && flag_kh >= 0)
                            {

                                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                IDictionary<string, string> temp = null;
                                #region 对比各个业务子段，将不同的写入array
                                if (model.f_yhye != model_khb.f_ycje)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_ycje");
                                    temp.Add("oldvalue", model_khb.f_ycje);
                                    temp.Add("newvalue", model.f_yhye);
                                    temp.Add("name", "绿化表押金");
                                    array.Add(temp);
                                }
                                if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_tjjzsf");
                                    temp.Add("oldvalue", model_khb.f_tjjzsf);
                                    temp.Add("newvalue", model.f_syhtjjzsf);
                                    temp.Add("name", "调价结转水费");
                                    array.Add(temp);
                                }

                                if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_tjjzpwf");
                                    temp.Add("oldvalue", model_khb.f_tjjzpwf);
                                    temp.Add("newvalue", model.f_syhtjjzpwf);
                                    temp.Add("name", "调价结转排污费");
                                    array.Add(temp);
                                }
                                if (model.f_cbyslj == null || model.f_cbyslj == "")
                                {
                                    model.f_cbyslj = "0";
                                }
                                if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
                                {
                                    model_khb.f_ljqf = "0";
                                }


                                if (double.Parse(model.f_cbyslj) > 0)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_ljqf");
                                    temp.Add("oldvalue", model_khb.f_ljqf);
                                    temp.Add("newvalue", (double.Parse(model_khb.f_ljqf) + double.Parse(model.f_cbyslj)).ToString());
                                    temp.Add("name", "累计欠费");
                                    array.Add(temp);
                                }

                                #endregion
                                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
                                #endregion

                                #region 缴费回滚日志
                                List<IDictionary<string, string>> array1 = new List<IDictionary<string, string>>();
                                IDictionary<string, string> temp1 = null;
                                temp1 = new Dictionary<string, string>();
                                temp1.Add("key", "rollback");
                                temp1.Add("oldvalue", "客户编号： " + model_khb.f_khbh + " 抄表编号：" + model.f_cbbh + "  缴费编号： " + model.f_jfbh);
                                temp1.Add("newvalue", "");
                                temp1.Add("name", "抄表回滚");
                                array1.Add(temp1);
                                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_jfb", model.sys_id.ToString(), "tbl_ld_jfb_detail", "缴费回滚", array1, clientInf, _iAccessDataTrans);
                                #endregion
                                model.f_zt = "新建";
                                model.f_ztid = "0";
                                _idal_tbl_ld_jfb.Update(model, "f_zt,f_ztid", _iAccessDataTrans);
                                _iAccessDataTrans.getTrans().commit();
                                resultDic["result"] = "true";
                                resultDic["message"] = "";

                            }
                            else
                            {
                                resultDic["result"] = "false";
                                string errormessage = "";

                                if (flag_cb < 0)
                                {
                                    errormessage += "抄表信息更新失败;";
                                }
                                if (flag_kh < 0)
                                {
                                    errormessage += "客户信息更新失败;";
                                }

                                resultDic["message"] = errormessage;
                                _iAccessDataTrans.getTrans().rollback();
                            }




                        }






                    }
                    else
                    {
                        resultDic["result"] = "false";
                        string errormessage = "";
                        if (model_khb_list.Count <= 0)
                        {
                            errormessage += "没有查询到客户信息;";
                        }
                        resultDic["message"] = errormessage;
                        _iAccessDataTrans.getTrans().rollback();
                    }

                }



                #endregion



            }
            catch (Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据删除失败，删除的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_delete", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SumList(string whereString, string cxzxsjString, string sumString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                string columnsString = "";
                string[] sumArray = sumString.Split('^');
                for (int i = 0; i < sumArray.Length; i++)
                {
                    columnsString += "SUM(" + sumArray[i] + ") as " + sumArray[i] + ",";
                }
                columnsString = columnsString.TrimEnd(',');

                StringBuilder strSql = new StringBuilder();

                strSql.Append(" select " + columnsString + " from (");

                if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("jf", cxzxsjString) == true)
                {
                    strSql.Append("  select * from  ");
                    strSql.Append("  ( ");
                    strSql.Append("  (select * from tbl_ld_jfb t where ");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }
                    strSql.Append("   )    ");
                    strSql.Append("  union  all ");
                    strSql.Append("  (select * from tbl_ld_jfb_his t where  ");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }
                    strSql.Append("   )    ");
                    strSql.Append("  )    ");

                }
                else
                {
                    strSql.Append(" select * from tbl_ld_jfb t where");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }

                }
                strSql.Append(" ) ");
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                DataTable resultDataTable = _iAccessData.Query(strSql.ToString()).Tables[0];

                string message = "{\"f_sflj\":\"" + resultDataTable.Rows[0]["f_sflj"] + "\",\"f_pwflj\":\"" + resultDataTable.Rows[0]["f_pwflj"] + "\",\"f_sllj\":\"" + resultDataTable.Rows[0]["f_sllj"] + "\",\"f_cbyslj\":\"" + resultDataTable.Rows[0]["f_cbyslj"] + "\",\"f_shss\":\"" + resultDataTable.Rows[0]["f_shss"] + "\"}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


    }
}









