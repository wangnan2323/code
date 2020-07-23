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
using System.Net;
using System.IO;
using System.Xml;

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

                                if (model.f_cbbhid != null && model.f_cbbhid != "")
                                {
                                    //更新抄表表
                                    string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + model.f_jfbh + "',F_JFBHID='" + jfbid + "',F_JFSJ=to_date('" + model.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + model.f_cbbhid + ")";
                                    int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                }


                                //更新客户表
                                string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + ",F_VALUE3='" + model.f_kplbid + "',F_VALUE4='" + model.f_jffsid + "',F_YE='" + model.f_yhycje + "' where sys_id='" + model.f_khbhid + "'";



                                int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);

                                if (flag_kh >= 0)
                                {
                                    //写入客户表日志
                                    #region 写入日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    IDictionary<string, string> temp = null;
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_yhye != model.f_khyye)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ycje");
                                        temp.Add("oldvalue", model.f_khyye);
                                        temp.Add("newvalue", model.f_yhye);
                                        temp.Add("name", "绿化表押金");
                                        array.Add(temp);
                                    }

                                    if (model.f_yhycje != model.f_khyycje)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ye");
                                        temp.Add("oldvalue", model.f_khyycje);
                                        temp.Add("newvalue", model.f_yhycje);
                                        temp.Add("name", "余额");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzsf != model.f_khytjjzsf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzsf");
                                        temp.Add("oldvalue", model.f_khytjjzsf);
                                        temp.Add("newvalue", model.f_syhtjjzsf);
                                        temp.Add("name", "调价结转水费");
                                        array.Add(temp);
                                    }

                                    if (model.f_syhtjjzpwf != model.f_khytjjzpwf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzpwf");
                                        temp.Add("oldvalue", model.f_khytjjzpwf);
                                        temp.Add("newvalue", model.f_syhtjjzpwf);
                                        temp.Add("name", "调价结转污水处理费");
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

                                    //if (flag_cb <= 0)
                                    //{
                                    //    errormessage += "抄表信息更新失败;";
                                    //}
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
                                string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + ",F_YE='" + model.f_yhycje + "' where sys_id='" + model.f_khbhid + "'";

                                int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);
                                if (flag_cb >= 0 && flag_kh >= 0)
                                {
                                    //写入客户表日志
                                    #region 写入日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    IDictionary<string, string> temp = null;
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_yhye != model.f_khyye)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ycje");
                                        temp.Add("oldvalue", model.f_khyye);
                                        temp.Add("newvalue", model.f_yhye);
                                        temp.Add("name", "绿化表押金");
                                        array.Add(temp);
                                    }

                                    if (model.f_yhycje != model.f_khyycje)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ye");
                                        temp.Add("oldvalue", model.f_khyycje);
                                        temp.Add("newvalue", model.f_yhycje);
                                        temp.Add("name", "余额");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzsf != model.f_khytjjzsf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzsf");
                                        temp.Add("oldvalue", model.f_khytjjzsf);
                                        temp.Add("newvalue", model.f_syhtjjzsf);
                                        temp.Add("name", "调价结转水费");
                                        array.Add(temp);
                                    }

                                    if (model.f_syhtjjzpwf != model.f_khytjjzpwf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzpwf");
                                        temp.Add("oldvalue", model.f_khytjjzpwf);
                                        temp.Add("newvalue", model.f_syhtjjzpwf);
                                        temp.Add("name", "调价结转污水处理费");
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

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string Addwx(string json, string type, string f_wxye, string clientInf)
        //{

        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    resultDic["result"] = "";
        //    resultDic["message"] = "";
        //    try
        //    {
        //        //缴费逻辑
        //        _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
        //        _iAccessDataTrans.getTrans().begin();

        //        sara.dd.ldsw.model.tbl_ld_jfb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(json);

        //        #region 设置时间
        //        if (model.f_jfbh == "")
        //        {
        //            model.f_jfbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
        //        }
        //        if (model.f_sjbh == "")
        //        {
        //            model.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
        //        }
        //        model.f_jfrq = DateTime.Now;
        //        model.f_czsj = DateTime.Now;
        //        model.sys_creatdate = DateTime.Now;
        //        model.sys_lasteditdate = DateTime.Now;
        //        #endregion


        //        switch (type)
        //        {
        //            case "jf"://缴费
        //                {
        //                    #region 缴费
        //                    string jfbid = _idal_tbl_ld_jfb.Add(model, _iAccessDataTrans);

        //                    IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);

        //                    if (model_khb_list.Count > 0)
        //                    {
        //                        sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];

        //                        //更新抄表表
        //                        string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + model.f_jfbh + "',F_JFBHID='" + jfbid + "',F_JFSJ=to_date('" + model.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + model.f_cbbhid + ")";

        //                        //更新客户表
        //                        string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + ",F_VALUE3='" + model.f_kplbid + "',F_VALUE4='" + model.f_jffsid + "',F_YE='" + model.f_yhycje + "' where sys_id='" + model.f_khbhid + "'";


        //                        int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
        //                        int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);

        //                        if (flag_cb >= 0 && flag_kh >= 0)
        //                        {
        //                            //写入客户表日志
        //                            #region 写入日志
        //                            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
        //                            IDictionary<string, string> temp = null;
        //                            #region 对比各个业务子段，将不同的写入array
        //                            if (model.f_yhye != model_khb.f_ycje)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_ycje");
        //                                temp.Add("oldvalue", model_khb.f_ycje);
        //                                temp.Add("newvalue", model.f_yhye);
        //                                temp.Add("name", "绿化表押金");
        //                                array.Add(temp);
        //                            }
        //                            if (model.f_yhycje != model_khb.f_ye)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_ye");
        //                                temp.Add("oldvalue", model_khb.f_ye);
        //                                temp.Add("newvalue", model.f_yhycje);
        //                                temp.Add("name", "余额");
        //                                array.Add(temp);
        //                            }
        //                            if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_tjjzsf");
        //                                temp.Add("oldvalue", model_khb.f_tjjzsf);
        //                                temp.Add("newvalue", model.f_syhtjjzsf);
        //                                temp.Add("name", "调价结转水费");
        //                                array.Add(temp);
        //                            }

        //                            if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_tjjzpwf");
        //                                temp.Add("oldvalue", model_khb.f_tjjzpwf);
        //                                temp.Add("newvalue", model.f_syhtjjzpwf);
        //                                temp.Add("name", "调价结转污水处理费");
        //                                array.Add(temp);
        //                            }
        //                            if (model.f_cbyslj == null || model.f_cbyslj == "")
        //                            {
        //                                model.f_cbyslj = "0";
        //                            }
        //                            if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
        //                            {
        //                                model_khb.f_ljqf = "0";
        //                            }


        //                            if (double.Parse(model.f_cbyslj) > 0)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_ljqf");
        //                                temp.Add("oldvalue", model_khb.f_ljqf);
        //                                temp.Add("newvalue", (double.Parse(model_khb.f_ljqf) - double.Parse(model.f_cbyslj)).ToString());
        //                                temp.Add("name", "累计欠费");
        //                                array.Add(temp);
        //                            }


        //                            #endregion
        //                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
        //                            #endregion

        //                            resultDic["result"] = "true";
        //                            resultDic["message"] = jfbid;

        //                            _iAccessDataTrans.getTrans().commit();
        //                        }
        //                        else
        //                        {
        //                            resultDic["result"] = "false";
        //                            string errormessage = "";

        //                            if (flag_cb <= 0)
        //                            {
        //                                errormessage += "抄表信息更新失败;";
        //                            }
        //                            if (flag_kh <= 0)
        //                            {
        //                                errormessage += "客户信息更新失败;";
        //                            }

        //                            resultDic["message"] = errormessage;
        //                            _iAccessDataTrans.getTrans().rollback();
        //                        }
        //                    }
        //                    else
        //                    {
        //                        resultDic["result"] = "false";
        //                        string errormessage = "";
        //                        if (model_khb_list.Count <= 0)
        //                        {
        //                            errormessage += "没有查询到客户信息;";
        //                        }


        //                        resultDic["message"] = errormessage;
        //                        _iAccessDataTrans.getTrans().rollback();
        //                    }

        //                    #endregion

        //                }
        //                break;
        //            case "jfforapp"://app缴费
        //                {


        //                    string jfbid = _idal_tbl_ld_jfb.Add(model, _iAccessDataTrans);


        //                    IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);

        //                    if (model_khb_list.Count > 0)
        //                    {

        //                        sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];

        //                        //更新抄表表
        //                        string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + model.f_jfbh + "',F_JFBHID='" + jfbid + "',F_JFSJ=to_date('" + model.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + model.f_cbbhid + ")";
        //                        //更新客户表
        //                        string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + ",F_YE='" + model.f_yhycje + "' where sys_id='" + model.f_khbhid + "'";

        //                        int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
        //                        int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);
        //                        if (flag_cb >= 0 && flag_kh >= 0)
        //                        {
        //                            //写入客户表日志
        //                            #region 写入日志
        //                            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
        //                            IDictionary<string, string> temp = null;
        //                            #region 对比各个业务子段，将不同的写入array
        //                            if (model.f_yhye != model_khb.f_ycje)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_ycje");
        //                                temp.Add("oldvalue", model_khb.f_ycje);
        //                                temp.Add("newvalue", model.f_yhye);
        //                                temp.Add("name", "绿化表押金");
        //                                array.Add(temp);
        //                            }
        //                            if (model.f_yhycje != model_khb.f_ye)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_ye");
        //                                temp.Add("oldvalue", model_khb.f_ye);
        //                                temp.Add("newvalue", model.f_yhycje);
        //                                temp.Add("name", "余额");
        //                                array.Add(temp);
        //                            }
        //                            if (model.f_syhtjjzsf != model_khb.f_tjjzsf)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_tjjzsf");
        //                                temp.Add("oldvalue", model_khb.f_tjjzsf);
        //                                temp.Add("newvalue", model.f_syhtjjzsf);
        //                                temp.Add("name", "调价结转水费");
        //                                array.Add(temp);
        //                            }

        //                            if (model.f_syhtjjzpwf != model_khb.f_tjjzpwf)
        //                            {
        //                                temp = new Dictionary<string, string>();
        //                                temp.Add("key", "f_tjjzpwf");
        //                                temp.Add("oldvalue", model_khb.f_tjjzpwf);
        //                                temp.Add("newvalue", model.f_syhtjjzpwf);
        //                                temp.Add("name", "调价结转污水处理费");
        //                                array.Add(temp);
        //                            }
        //                            if (model.f_cbyslj == null || model.f_cbyslj == "")
        //                            {
        //                                model.f_cbyslj = "0";
        //                            }
        //                            if (model_khb.f_ljqf == null || model_khb.f_ljqf == "")
        //                            {
        //                                model_khb.f_ljqf = "0";
        //                            }



        //                            #endregion
        //                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, clientInf, _iAccessDataTrans);
        //                            #endregion

        //                            #region 更新微信余额
        //                            //double new_wxye = Eva.Library.Text.NumberTool.Parse(f_wxye) - Eva.Library.Text.NumberTool.Parse(model.f_shys);
        //                            //object[] args = { Eva.Library.Text.NumberTool.GetNumberByLength(new_wxye, 2), model.f_khbh };
        //                            //string wxresult = Eva.Library.WebService.DynamicWebServices.InvokeWebService("http://162.16.166.1/sara.dd.actionwx/service/service_tbl_wx_khb.asmx", "setWeixinyue", args).ToString();

        //                            #endregion


        //                                resultDic["result"] = "true";
        //                                resultDic["message"] = jfbid;
        //                                _iAccessDataTrans.getTrans().commit();


        //                        }
        //                        else
        //                        {
        //                            resultDic["result"] = "false";
        //                            string errormessage = "";

        //                            if (flag_cb < 0)
        //                            {
        //                                errormessage += "抄表信息更新失败;";
        //                            }
        //                            if (flag_kh < 0)
        //                            {
        //                                errormessage += "客户信息更新失败;";
        //                            }

        //                            resultDic["message"] = errormessage;
        //                            _iAccessDataTrans.getTrans().rollback();
        //                        }

        //                    }
        //                    else
        //                    {
        //                        resultDic["result"] = "false";
        //                        string errormessage = "";
        //                        if (model_khb_list.Count <= 0)
        //                        {
        //                            errormessage += "没有查询到客户信息;";
        //                        }


        //                        resultDic["message"] = errormessage;
        //                        _iAccessDataTrans.getTrans().rollback();
        //                    }

        //                }
        //                break;
        //            case "pt"://普通==
        //                {
        //                    string jfbid = _idal_tbl_ld_jfb.Add(model, _iAccessDataTrans);
        //                    resultDic["result"] = "true";
        //                    resultDic["message"] = jfbid;
        //                    _iAccessDataTrans.getTrans().commit();
        //                }
        //                break;
        //        }





        //        NewLog("数据创建成功，创建的数据为：" + json, "sql_insert", clientInf);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_iAccessDataTrans != null)
        //        {
        //            _iAccessDataTrans.getTrans().rollback();
        //        }

        //        resultDic["result"] = "false";
        //        resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
        //        NewLog("数据创建失败，创建的数据为：" + json + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
        //    }
        //    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //}

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public void AddwxCross(string json, string type, string f_wxye, string clientInf)
        //{
        //    string result1 = this.Addwx(json, type, f_wxye, clientInf);
        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    resultDic["d"] = result1;
        //    string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //    string callback = HttpContext.Current.Request["jsoncallback"];

        //    HttpContext.Current.Response.Write(callback + "(" + result + ")");
        //    HttpContext.Current.Response.End();
        //}

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
                                string updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + model.f_cbyslj + ",F_YE='" + model.f_yhycje + "',F_VALUE5='' where sys_id='" + model.f_khbhid + "'";

                                int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);

                                if (flag_cb >= 0 && flag_kh >= 0)
                                {

                                    //写入客户表日志
                                    #region 写入日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    IDictionary<string, string> temp = null;
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_yhye != model.f_khyye)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ycje");
                                        temp.Add("oldvalue", model.f_khyye);
                                        temp.Add("newvalue", model.f_yhye);
                                        temp.Add("name", "绿化表押金");
                                        array.Add(temp);
                                    }
                                    if (model.f_yhycje != model.f_khyycje)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ye");
                                        temp.Add("oldvalue", model.f_khyycje);
                                        temp.Add("newvalue", model.f_yhycje);
                                        temp.Add("name", "余额");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzsf != model.f_khytjjzsf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzsf");
                                        temp.Add("oldvalue", model.f_khytjjzsf);
                                        temp.Add("newvalue", model.f_syhtjjzsf);
                                        temp.Add("name", "调价结转水费");
                                        array.Add(temp);
                                    }

                                    if (model.f_syhtjjzpwf != model.f_khytjjzpwf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzpwf");
                                        temp.Add("oldvalue", model.f_khytjjzpwf);
                                        temp.Add("newvalue", model.f_syhtjjzpwf);
                                        temp.Add("name", "调价结转污水处理费");
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
                            //            temp.Add("name", "调价结转污水处理费");
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

                //更新客户表的F_VALUE5托收标志
                sql = "update tbl_ld_khb set f_value5='' where f_khbh in (select f_khbh from tbl_ld_jfb where " + whereString + ")";
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
                columns += "^" + "f_dyjtsl";
                columns += "^" + "f_dyjtsf";
                columns += "^" + "f_dejtsl";
                columns += "^" + "f_dejtsf";
                columns += "^" + "f_dsjtsl";
                columns += "^" + "f_dsjtsf";
                columns += "^" + "f_khyycje";
                columns += "^" + "f_sfsyycje";
                columns += "^" + "f_syycje";
                columns += "^" + "f_yhycje";
                columns += "^" + "f_dszycje";


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

                if (column.Contains("f_sfjl"))
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string sfjl = dt.Rows[i]["f_sfjl"].ToString();
                        string[] sfjlarr = sfjl.Split('|');
                        string result = "";
                        for (int ii = 0; ii < sfjlarr.Length; ii++)
                        {
                            string[] sfarr = sfjlarr[ii].Split('^');
                            if (sfarr.Length == 3)
                            {
                                result += "水费:" + sfarr[0] + " 污水处理费:" + sfarr[1] + " 水量:" + sfarr[2] + ",";
                            }
                        }
                        result = result.TrimEnd(',');
                        dt.Rows[i]["f_sfjl"] = result;
                    }
                }


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
        public string WriteOff(string json, string sys_id, string clientInf)
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
                    sqlstr = "UPDATE tbl_ld_jfb SET f_czsj=to_date('" + model.f_czsj + "','yyyy-mm-dd hh24:mi:ss'),f_jfrq=to_date('" + model.f_jfrq + "','yyyy-mm-dd hh24:mi:ss') WHERE sys_id='" + addresult["message"] + "'";
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
                    temp.Add("oldvalue", "客户编号" + model.f_khbh + ",冲红金额" + model.f_cbyslj);
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

                IList<sara.dd.ldsw.model.tbl_ld_jfb> modellist = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_jfb>(_idal_tbl_ld_jfb.GetDataTableForPC(whereString, "false", "", "*", "", "", _iAccessDataTrans));

                if (modellist.Count == 1)
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
                            IList<sara.dd.ldsw.model.tbl_ld_cbiao> cbmodellist = _idal_tbl_ld_cbiao.GetList(" sys_id in (" + model.f_cbbhid.ToString() + ")", "", "", "*", "", "", _iAccessDataTrans);
                            sara.dd.ldsw.model.tbl_ld_cbiao cbmodel = cbmodellist[0];
                            //上一条抄表记录
                            DataTable dt_sytcbjl = _iAccessDataTrans.Query("select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl,rownum  from (select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' and sys_id <> '" + cbmodel.sys_id + "' order by f_cbsj desc) t where rownum =1").Tables[0];

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
                            //回滚余额
                            model_tbl_ld_khb.f_ye = model.f_khyycje;

                            idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ycje,f_tjjzsf,f_tjjzpwf,f_ljgl,f_nljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_zhcbrq,f_ye", _iAccessDataTrans);
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

                            if (model.f_khyye != model.f_yhye)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_ycje");
                                temp.Add("oldvalue", model.f_yhye);
                                temp.Add("newvalue", model.f_khyye);
                                temp.Add("name", "绿化表押金");
                                array.Add(temp);
                            }

                            if (model.f_khyycje != model.f_yhycje)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_ye");
                                temp.Add("oldvalue", model.f_yhycje);
                                temp.Add("newvalue", model.f_khyycje);
                                temp.Add("name", "余额");
                                array.Add(temp);
                            }
                            if (model.f_khytjjzsf != model.f_syhtjjzsf)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_tjjzsf");
                                temp.Add("oldvalue", model.f_syhtjjzsf);
                                temp.Add("newvalue", model.f_khytjjzsf);
                                temp.Add("name", "调价结转水费");
                                array.Add(temp);
                            }

                            if (model.f_khytjjzpwf != model.f_syhtjjzpwf)
                            {
                                temp = new Dictionary<string, string>();
                                temp.Add("key", "f_tjjzpwf");
                                temp.Add("oldvalue", model.f_syhtjjzpwf);
                                temp.Add("newvalue", model.f_khytjjzpwf);
                                temp.Add("name", "调价结转污水处理费");
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
                            if (model.f_cbbhid != null && model.f_cbbhid != "")
                            {
                                updatecb = "update TBL_LD_CBIAO set F_ZT='已算费',F_ZTID='2',F_JFBH='',F_JFBHID='',F_JFSJ='' where SYS_ID in (" + model.f_cbbhid + ")";
                                int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                            }
                            //更新客户表
                            updatekh = "update TBL_LD_KHB set F_YCJE='" + model.f_khyye + "',F_TJJZSF='" + model.f_khytjjzsf + "',F_TJJZPWF='" + model.f_khytjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')+" + model.f_cbyslj + ",F_YE='" + model.f_khyycje + "' where sys_id='" + model.f_khbhid + "'";


                            int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);
                            //写入客户表日志
                            #region 写入日志
                            if (flag_kh >= 0)
                            {

                                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                IDictionary<string, string> temp = null;
                                #region 对比各个业务子段，将不同的写入array

                                if (model.f_khyye != model.f_yhye)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_ycje");
                                    temp.Add("oldvalue", model.f_yhye);
                                    temp.Add("newvalue", model.f_khyye);
                                    temp.Add("name", "绿化表押金");
                                    array.Add(temp);
                                }

                                if (model.f_khyycje != model.f_yhycje)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_ye");
                                    temp.Add("oldvalue", model.f_yhycje);
                                    temp.Add("newvalue", model.f_khyycje);
                                    temp.Add("name", "余额");
                                    array.Add(temp);
                                }
                                if (model.f_khytjjzsf != model.f_syhtjjzsf)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_tjjzsf");
                                    temp.Add("oldvalue", model.f_syhtjjzsf);
                                    temp.Add("newvalue", model.f_khytjjzsf);
                                    temp.Add("name", "调价结转水费");
                                    array.Add(temp);
                                }

                                if (model.f_khytjjzpwf != model.f_syhtjjzpwf)
                                {
                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_tjjzpwf");
                                    temp.Add("oldvalue", model.f_syhtjjzpwf);
                                    temp.Add("newvalue", model.f_khytjjzpwf);
                                    temp.Add("name", "调价结转污水处理费");
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

                string message = "{\"f_sflj\":\"" + resultDataTable.Rows[0]["f_sflj"] + "\",\"f_pwflj\":\"" + resultDataTable.Rows[0]["f_pwflj"] + "\",\"f_sllj\":\"" + resultDataTable.Rows[0]["f_sllj"] + "\",\"f_cbyslj\":\"" + resultDataTable.Rows[0]["f_cbyslj"] + "\",\"f_shss\":\"" + resultDataTable.Rows[0]["f_shss"] + "\",\"f_dszycje\":\"" + resultDataTable.Rows[0]["f_dszycje"] + "\",\"f_syycje\":\"" + resultDataTable.Rows[0]["f_syycje"] + "\"}";
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
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AutoRemoveAccount()
        {
            //缴费

            sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
            //抄表

            sara.dd.ldsw.idal.Itbl_ld_cbiao idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
            //客户表

            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
            //客户表日志(方法)


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                #region 查询客户表信息
                //数据库连接
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();

                //查询条件 邮储账户不做选择 ，存在余额， 存在累计欠费
                string khb_sqlStr = "select * from TBL_LD_KHB t where  f_value5 is null and to_number(f_ye) > 0 and to_number(f_ljqf) > 0 ";
                DataTable khbdt = _iAccessData.Query(khb_sqlStr).Tables[0];
                System.DateTime currentTime = new System.DateTime();
                currentTime = System.DateTime.Now;
                DateTime blankTime = DateTime.Parse("1900-01-01");
                if (khbdt.Rows.Count > 0)
                {
                    int cbiaodtCount = 0;
                    for (int i = 0; i < khbdt.Rows.Count; i++)
                    {


                        //通过客户表中的客户编号查询抄表表（按抄表时间升序）
                        string cbiao_sqlStr = "select * from TBL_LD_CBIAO t where f_khbh = '" + khbdt.Rows[i]["f_khbh"] + "' and f_ztid = '2' order by f_cbsj asc ";
                        //当前余额
                        string dqye = khbdt.Rows[i]["f_ye"].ToString();
                        //当前累计欠费
                        string dqljqf = khbdt.Rows[i]["f_ljqf"].ToString();
                        DataTable cbiaodt = _iAccessData.Query(cbiao_sqlStr).Tables[0];
                        if (cbiaodt.Rows.Count > 0)
                        {
                            if (_iAccessDataTrans == null)
                            {
                                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                                _iAccessDataTrans.getTrans().begin();
                            }
                            for (int j = 0; j < cbiaodt.Rows.Count; j++)
                            {

                                //当前金额大于本期金额
                                if (Eva.Library.Text.NumberTool.Parse(dqye) > Eva.Library.Text.NumberTool.Parse(cbiaodt.Rows[j]["f_bqje"].ToString()))
                                {
                                    if (_iAccessDataTrans == null)
                                    {
                                        _iAccessDataTrans.getTrans().begin();
                                    }
                                    cbiaodtCount++;
                                    #region 生成缴费记录
                                    sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                                    jfmodel.sys_id = int.Parse(idal_tbl_ld_jfb.GetMaxId(null));
                                    jfmodel.sys_creatuserid = "1572";
                                    jfmodel.sys_creatusername = "自动缴费";
                                    jfmodel.sys_creatdate = currentTime;
                                    jfmodel.sys_lastedituserid = "1572";
                                    jfmodel.sys_lasteditusername = "自动缴费";
                                    jfmodel.sys_lasteditdate = currentTime;
                                    jfmodel.sys_deldate = blankTime;
                                    jfmodel.sys_delflag = "0";
                                    jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                                    jfmodel.f_jfrq = currentTime;
                                    jfmodel.f_jffs = "自动销账";
                                    jfmodel.f_jffsid = "05740016";
                                    jfmodel.f_jcfs = "全额找零";
                                    jfmodel.f_jcfsid = "05750001";
                                    jfmodel.f_yyy = "自动缴费";
                                    jfmodel.f_yyyid = "1572";
                                    jfmodel.f_czsj = currentTime;
                                    jfmodel.f_sfykfp = "false";
                                    jfmodel.f_zt = "已提交";
                                    jfmodel.f_ztid = "2";
                                    jfmodel.f_khbh = khbdt.Rows[i]["f_khbh"].ToString();
                                    jfmodel.f_khbhid = khbdt.Rows[i]["sys_id"].ToString();
                                    jfmodel.f_yhbh = khbdt.Rows[i]["f_yhbh"].ToString();
                                    jfmodel.f_yhbhid = khbdt.Rows[i]["f_yhbhid"].ToString();
                                    jfmodel.f_yhm = khbdt.Rows[i]["f_yhm"].ToString();
                                    jfmodel.f_jfm = khbdt.Rows[i]["f_jfm"].ToString();
                                    jfmodel.f_dh = khbdt.Rows[i]["f_dh"].ToString();
                                    jfmodel.f_dz = khbdt.Rows[i]["f_dz"].ToString();
                                    jfmodel.f_dy = khbdt.Rows[i]["f_dy"].ToString();
                                    jfmodel.f_dyid = khbdt.Rows[i]["f_dyid"].ToString();
                                    jfmodel.f_sc = khbdt.Rows[i]["f_sc"].ToString();
                                    jfmodel.f_scid = khbdt.Rows[i]["f_scid"].ToString();
                                    jfmodel.f_qy = khbdt.Rows[i]["f_qy"].ToString();
                                    jfmodel.f_qyid = khbdt.Rows[i]["f_qyid"].ToString();
                                    jfmodel.f_pq = khbdt.Rows[i]["f_pq"].ToString();
                                    jfmodel.f_pqid = khbdt.Rows[i]["f_pqid"].ToString();
                                    jfmodel.f_sbbh = khbdt.Rows[i]["f_sbbh"].ToString();
                                    jfmodel.f_sbbhid = khbdt.Rows[i]["f_sbbhid"].ToString();
                                    jfmodel.f_sblx = khbdt.Rows[i]["f_sblx"].ToString();
                                    jfmodel.f_sblxid = khbdt.Rows[i]["f_sblxid"].ToString();
                                    jfmodel.f_yslx = khbdt.Rows[i]["f_yslx"].ToString();
                                    jfmodel.f_yslxid = khbdt.Rows[i]["f_yslxid"].ToString();
                                    jfmodel.f_lxtkhh = khbdt.Rows[i]["f_lxth"].ToString();
                                    jfmodel.f_rs = khbdt.Rows[i]["f_rs"].ToString();
                                    jfmodel.f_cbbh = cbiaodt.Rows[j]["f_cb_cbbh"].ToString();
                                    jfmodel.f_cbbhid = cbiaodt.Rows[j]["sys_id"].ToString();
                                    jfmodel.f_cbyslj = cbiaodt.Rows[j]["f_bqje"].ToString();
                                    jfmodel.f_sllj = cbiaodt.Rows[j]["f_bqsl"].ToString();
                                    jfmodel.f_sflj = cbiaodt.Rows[j]["f_sf"].ToString();
                                    jfmodel.f_pwflj = cbiaodt.Rows[j]["f_pwf"].ToString();
                                    jfmodel.f_dj = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj) / Eva.Library.Text.NumberTool.Parse(jfmodel.f_sllj), 2);
                                    jfmodel.f_jmhyslj = cbiaodt.Rows[j]["f_bqje"].ToString();
                                    jfmodel.f_khytjjzsf = khbdt.Rows[i]["f_tjjzsf"].ToString();
                                    jfmodel.f_khytjjzpwf = khbdt.Rows[i]["f_tjjzpwf"].ToString();
                                    jfmodel.f_sfsytjjz = "false";
                                    jfmodel.f_sytjjzsf = "0";
                                    jfmodel.f_sytjjzpwf = "0";
                                    jfmodel.f_syhtjjzsf = khbdt.Rows[i]["f_tjjzsf"].ToString();
                                    jfmodel.f_syhtjjzpwf = khbdt.Rows[i]["f_tjjzpwf"].ToString();
                                    jfmodel.f_khyye = khbdt.Rows[i]["f_ycje"].ToString();
                                    jfmodel.f_sfsyye = "false";
                                    jfmodel.f_syye = "0";
                                    jfmodel.f_yhye = khbdt.Rows[i]["f_ycje"].ToString();
                                    jfmodel.f_shys = cbiaodt.Rows[j]["f_bqje"].ToString();
                                    jfmodel.f_shss = "0";
                                    jfmodel.f_hszl = "0";
                                    jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(jfmodel.f_shss)));
                                    jfmodel.f_khfz = khbdt.Rows[i]["f_khfz"].ToString();
                                    jfmodel.f_khfzid = khbdt.Rows[i]["f_khfzid"].ToString();
                                    jfmodel.f_cbenbh = khbdt.Rows[i]["f_cbbh"].ToString();
                                    jfmodel.f_cbenbhid = khbdt.Rows[i]["f_cbbhid"].ToString();
                                    jfmodel.f_ljqf = dqljqf;
                                    jfmodel.f_jmjelj = "0";
                                    jfmodel.f_ly = "自动销账";
                                    jfmodel.f_lyid = "08080009";
                                    //需要修改？？？
                                    jfmodel.f_dyjtsl = cbiaodt.Rows[j]["f_dyjtsl"].ToString();
                                    jfmodel.f_dyjtsf = cbiaodt.Rows[j]["f_dyjtsf"].ToString();
                                    jfmodel.f_dejtsl = cbiaodt.Rows[j]["f_dejtsl"].ToString();
                                    jfmodel.f_dejtsf = cbiaodt.Rows[j]["f_dejtsf"].ToString();
                                    jfmodel.f_dsjtsl = cbiaodt.Rows[j]["f_dsjtsl"].ToString();
                                    jfmodel.f_dsjtsf = cbiaodt.Rows[j]["f_dsjtsf"].ToString();
                                    jfmodel.f_khyycje = dqye;
                                    jfmodel.f_sfsyycje = "true";
                                    jfmodel.f_syycje = cbiaodt.Rows[j]["f_bqje"].ToString();
                                    jfmodel.f_dszycje = "0";
                                    jfmodel.f_yhycje = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(dqye) - Eva.Library.Text.NumberTool.Parse(cbiaodt.Rows[j]["f_bqje"].ToString()), 2);


                                    jfmodel.f_sfjl = cbiaodt.Rows[j]["f_sfjl"].ToString();

                                    idal_tbl_ld_jfb.Add(jfmodel, _iAccessDataTrans);
                                    #endregion
                                    #region 更新抄表记录
                                    sara.dd.ldsw.model.tbl_ld_cbiao model_cbiao = new model.tbl_ld_cbiao();
                                    model_cbiao = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cbiaodt)[j];
                                    model_cbiao.f_zt = "已缴费";
                                    model_cbiao.f_ztid = "3";
                                    model_cbiao.f_jfbh = jfmodel.f_jfbh;
                                    model_cbiao.f_jfbhid = jfmodel.sys_id.ToString();
                                    model_cbiao.f_jfsj = jfmodel.f_jfrq;
                                    idal_tbl_ld_cbiao.Update(model_cbiao, "f_zt,f_ztid,f_jfbh,f_jfbhid,f_jfsj", _iAccessDataTrans);
                                    #endregion
                                    #region 更新客户表
                                    sara.dd.ldsw.model.tbl_ld_khb model_khb = new model.tbl_ld_khb();
                                    model_khb = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_khb>(khbdt)[i];
                                    model_khb.f_ye = jfmodel.f_yhycje;
                                    model_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(dqljqf) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj)), 2);

                                    idal_tbl_ld_khb.Update(model_khb, "f_ljqf,f_ye", _iAccessDataTrans);
                                    #endregion
                                    #region 添加客户表日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    IDictionary<string, string> temp = null;
                                    //余额
                                    if (dqye != model_khb.f_ye)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ye");
                                        temp.Add("oldvalue", dqye);
                                        temp.Add("newvalue", model_khb.f_ye);
                                        temp.Add("name", "余额");
                                        array.Add(temp);
                                    }
                                    //累计欠费
                                    if (dqljqf != model_khb.f_ljqf)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljqf");
                                        temp.Add("oldvalue", dqljqf);
                                        temp.Add("newvalue", model_khb.f_ljqf);
                                        temp.Add("name", "累计欠费");
                                        array.Add(temp);
                                    }
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", khbdt.Rows[i]["sys_id"].ToString(), "AutoRemoveAccount", "自动销账", array, "", _iAccessDataTrans);
                                    dqljqf = model_khb.f_ljqf;
                                    dqye = jfmodel.f_yhycje;
                                    #endregion



                                }
                                else
                                {
                                    break;
                                }




                            }

                            if (_iAccessDataTrans != null)
                            {
                                _iAccessDataTrans.getTrans().commit();
                                _iAccessDataTrans = null;
                            }
                        }

                    }

                    resultDic["result"] = "true";
                    resultDic["message"] = "";

                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户表不存在符合条件的数据。";
                    if (_iAccessDataTrans != null)
                    {
                        _iAccessDataTrans.getTrans().commit();
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
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string dojhdz(string dzrq, string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                string dtstr = "";
                string dt = "";
                if (dzrq != null && dzrq != "")
                {
                    DateTime dzrqdt = Convert.ToDateTime(dzrq);
                    dtstr = dzrqdt.ToString("yyyyMMdd");
                    dt = dzrqdt.ToString("yyyy-MM-dd");
                }
                else
                {
                    //昨天的日期
                    DateTime yesterday = DateTime.Now.AddDays(-1);
                    dtstr = yesterday.ToString("yyyyMMdd");
                    dt = yesterday.ToString("yyyy-MM-dd");
                }
                List<sara.dd.ldsw.model.tbl_ld_jhdz> modellist = new List<sara.dd.ldsw.model.tbl_ld_jhdz>();


                #region 调用交行api获取昨天对账文件
                com.bocom.pay.BocomClient client = new com.bocom.pay.BocomClient();
                client.initialize(Eva.Library.Global.AppRootPath + "bocommjava/ini/BocompayMerchant.xml");

                string url = Eva.Library.Configuration.ConfigurationManager.AppSettings["apiurl"].ToString();
                string merptcid = Eva.Library.Configuration.ConfigurationManager.AppSettings["merptcid"].ToString();
                string certid = Eva.Library.Configuration.ConfigurationManager.AppSettings["certid"].ToString();
                DateTime dttoday = DateTime.Now;
                string str = dttoday.ToString("yyyyMMddHHmmss");
                //测试
                //dtstr = "20191206";

                string senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>" + merptcid + "</MerPtcId><ReqTime>" + str + "</ReqTime><TranCode>MAPIPY5197</TranCode><Version>1.1.20181206</Version></Head><Body><BatchNo>" + dtstr + "</BatchNo></Body></Document>";
                string rsasign = client.AttachedSign(certid, senddata);
                rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);


                string result = "";
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
                StringBuilder builder = new StringBuilder();
                builder.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                byte[] data = Encoding.UTF8.GetBytes(builder.ToString());
                req.ContentLength = data.Length;
                using (Stream reqStream = req.GetRequestStream())
                {
                    reqStream.Write(data, 0, data.Length);
                    reqStream.Close();
                }
                HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                Stream stream = resp.GetResponseStream();
                string xmlstr;
                //获取响应内容
                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                {
                    result = reader.ReadToEnd();
                    xmlstr = client.AttachedVerify(result);
                }
                #endregion

                #region 分析对账结果，正向对账
                if (xmlstr != null && xmlstr != "")
                {
                    //解析xml文件
                    xmlstr = xmlstr.TrimEnd('0');

                    if (xmlstr.IndexOf("<File>") != -1)
                    {
                        XmlDocument document = new XmlDocument();
                        document.LoadXml(xmlstr);
                        //对账文件
                        string file = document.GetElementsByTagName("File")[0].InnerText;
                        //对账文件数组
                        string[] files = file.Split(new char[2] { '\r', '\n' });

                        for (int i = 0; i < files.Length; i++)
                        {
                            string current = files[i];
                            if (current != null && current != "")
                            {
                                //对账示例 20191206	301140853999579	PAY	201912061034311153	SUCCESS	20191206103440	0.01	0.00	RMB	aaa	bbb	B2C-JSAPI-WECHAT	WECHAT	0102201912061034210042564445	4200000422201912061908067158		01310999999	DEBIT
                                string[] cols = current.Split(new char[1] { '\t' });
                                //筛选交易成功记录
                                if (cols[4] == "SUCCESS")
                                {
                                    //构建model
                                    sara.dd.ldsw.model.tbl_ld_jhdz model = new sara.dd.ldsw.model.tbl_ld_jhdz();
                                    model.f_jhddh = cols[3];
                                    model.f_jyje = cols[6];

                                    //根据商户订单号查询缴费记录
                                    List<sara.dd.ldsw.model.tbl_ld_jfb> jfmodellist = _idal_tbl_ld_jfb.GetList("f_value2='" + cols[3] + "'", "false", "sys_id desc", "*", "", "", null);

                                    //判断是否存在对应缴费记录
                                    if (jfmodellist.Count == 1)
                                    {
                                        //存在对应缴费记录
                                        sara.dd.ldsw.model.tbl_ld_jfb jfmodel = jfmodellist[0];
                                        model.f_jfbh = jfmodel.f_jfbh;
                                        model.f_jfje = jfmodel.f_shss;
                                        model.f_jfrq = jfmodel.f_jfrq;
                                        model.f_ly = jfmodel.f_ly;

                                        //判断缴费金额是否一致
                                        if (Eva.Library.Text.NumberTool.Parse(model.f_jyje) == Eva.Library.Text.NumberTool.Parse(model.f_jfje))
                                        {
                                            //缴费金额一致，对账无误
                                            model.f_dzjg = "正确";

                                            //更新缴费表对账状态
                                            jfmodel.f_value1 = "2";
                                            _idal_tbl_ld_jfb.Update(jfmodel, "f_value1", null);
                                        }
                                        else
                                        {
                                            //缴费金额不一致
                                            model.f_dzjg = "缴费金额不一致";

                                            //更新缴费表对账状态
                                            jfmodel.f_value1 = "3";
                                            _idal_tbl_ld_jfb.Update(jfmodel, "f_value1", null);
                                        }
                                    }
                                    else if (jfmodellist.Count > 1)
                                    {
                                        //在营收系统多次下账
                                        string jfbh = "";
                                        for (int ii = 0; ii < jfmodellist.Count; ii++)
                                        {
                                            jfbh += jfmodellist[ii].f_jfbh + ",";
                                            jfmodellist[ii].f_value1 = "3";
                                        }
                                        jfbh = jfbh.TrimEnd(',');
                                        model.f_jfbh = jfbh;
                                        model.f_dzjg = "营收系统多次下账";

                                        //更新缴费表对账状态
                                        _idal_tbl_ld_jfb.UpdateList(jfmodellist, "f_value1", null);

                                    }
                                    else
                                    {
                                        //不存在对应缴费记录
                                        model.f_dzjg = "交行已下账，营收系统未入账";
                                    }


                                    //将结果插入modellist
                                    modellist.Add(model);
                                }

                            }

                        }
                    }

                }

                #endregion

                #region 查询缴费表未对账结果，反向对账
                List<sara.dd.ldsw.model.tbl_ld_jfb> dzmodellist = _idal_tbl_ld_jfb.GetList("f_value1='1' and f_jfrq between to_date('" + dt + " 00:00:00','yyyy-mm-dd hh24:mi:ss') and to_date('" + dt + " 23:59:59','yyyy-mm-dd hh24:mi:ss')", "false", "sys_id desc", "*", "", "", null);
                if (dzmodellist.Count > 0)
                {
                    //存在交行未入账情况
                    for (int i = 0; i < dzmodellist.Count; i++)
                    {
                        //构建model
                        sara.dd.ldsw.model.tbl_ld_jhdz model = new sara.dd.ldsw.model.tbl_ld_jhdz();
                        model.f_jhddh = dzmodellist[i].f_value2;
                        model.f_jfbh = dzmodellist[i].f_jfbh;
                        model.f_jfje = dzmodellist[i].f_shss;
                        model.f_jfrq = dzmodellist[i].f_jfrq;
                        model.f_ly = dzmodellist[i].f_ly;
                        model.f_dzjg = "交行未入账";
                        //存入modellist
                        modellist.Add(model);
                    }


                }
                #endregion
                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson(modellist);
                string message = "{\"total\":\"" + modellist.Count + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("数据创建失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 缴费机是否可以缴费判断
        /// </summary>
        /// <param name="dzrq"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string jfjCanPay(string f_khbh)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                List<model.tbl_ld_khb> modellist = _idal_tbl_ld_khb.GetList(" f_khbh='" + f_khbh + "'", " sys_id desc", "*", "", "", null);
                if (modellist.Count == 1)
                {
                    model.tbl_ld_khb model = modellist[0];

                    if (model.f_value5 != null && model.f_value5 != "")
                    {
                        //银行托收中情况不能缴费
                        resultDic["result"] = "false";
                        resultDic["message"] = "银行托收中，不能缴费";
                    }
                    else if ((model.f_yqjmsf != null && model.f_yqjmsf != "" && model.f_yqjmsf != "0") || (model.f_yqjmpwf != null && model.f_yqjmpwf != "" && model.f_yqjmpwf != "0"))
                    {
                        //存在疫情减免不能缴费
                        resultDic["result"] = "false";
                        resultDic["message"] = "存在疫情减免，不能缴费";
                    }
                    else if (("," + model.f_khfzid + ",").Contains(",4063,"))
                    {
                        //IC卡用户不能缴费
                        resultDic["result"] = "false";
                        resultDic["message"] = "IC卡用户，不能缴费";
                    }
                    else if (("," + model.f_khfzid + ",").Contains(",4057,"))
                    {
                        List<sara.dd.ldsw.model.tbl_ld_cbiao> cbmodellist = _idal_tbl_ld_cbiao.GetList(" F_KHBH='" + f_khbh + "' AND F_ZTID='2' and f_cbsj < ADD_MONTHS(sysdate,-2)", "false", " sys_id desc", "*", "", "", null);
                        if (cbmodellist.Count > 0)
                        {
                            //大用户存在两期以上未交费
                            resultDic["result"] = "false";
                            resultDic["message"] = "大用户存在两期以上未交费欠费记录，不能缴费";
                        }
                        else
                        {
                            resultDic["result"] = "true";
                        }
                    }
                    else
                    {
                        resultDic["result"] = "true";
                    }
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户编号不存在";
                }

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 缴费机缴费时通过交行api生成二维码
        /// </summary>
        /// <param name="f_khbh">客户编号</param>
        /// <param name="jfje">缴费金额</param>
        /// <param name="out_trade_no">商户订单号</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string jfjPay(string f_khbh, string jfje, string out_trade_no)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                #region 调用交行api跳转支付

                string expire = Eva.Library.Configuration.ConfigurationManager.AppSettings["expire"].ToString();
                DateTime time_start = DateTime.Now;//开始时间
                DateTime time_expire = DateTime.Now.AddMinutes(Eva.Library.Text.NumberTool.Parse(expire));//超时时间

                string czje = Eva.Library.Text.NumberTool.Parse(jfje).ToString("0.00");
                //实例化api工具
                com.bocom.pay.BocomClient client = new com.bocom.pay.BocomClient();
                //调用xml配置，正式需改xml
                client.initialize(Eva.Library.Global.AppRootPath + "bocommjava/ini/BocompayMerchant.xml");
                string rsasign = "";
                //获取当前时间
                string timestr = time_start.ToString("yyyyMMddHHmmss");

                //交行API前台url
                string url = Eva.Library.Configuration.ConfigurationManager.AppSettings["apiurl"].ToString();
                //商户号
                string merptcid = Eva.Library.Configuration.ConfigurationManager.AppSettings["merptcid"].ToString();
                //证书号
                string certid = Eva.Library.Configuration.ConfigurationManager.AppSettings["certid"].ToString();
                //后台通知地址
                string notifyurl = Eva.Library.Configuration.ConfigurationManager.AppSettings["notifyurl"].ToString();

                string timeexpire = time_expire.ToString("yyyyMMddHHmmss");

                //生成二维码xml
                //string senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>" + merptcid + "</MerPtcId><ReqTime>" + timestr + "</ReqTime><TranCode>MAPIPY5114</TranCode><Version>1.1.20181206</Version></Head><Body><PayMerTranNo>" + out_trade_no + "</PayMerTranNo><Location>ONLINE</Location><TranScene>B2C-JSAPI-WECHAT</TranScene><Amount>" + czje + "</Amount><Currency>CNY</Currency><TranContent></TranContent><MerMemo></MerMemo><TranOptions></TranOptions><ValidPeriod>" + timeexpire + "</ValidPeriod><NotifyURL>" + notifyurl + "</NotifyURL></Body></Document>";
                string senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>" + merptcid + "</MerPtcId><ReqTime>" + timestr + "</ReqTime><TranCode>MAPIPY5112</TranCode><Version>1.1.20181206</Version></Head><Body><PayMerTranNo>" + out_trade_no + "</PayMerTranNo><Location>ONLINE</Location><TranScene>B2C-API-DISPLAYCODE</TranScene><Amount>" + czje + "</Amount><Currency>CNY</Currency><TranContent>" + f_khbh + "</TranContent><MerMemo></MerMemo><TranOptions></TranOptions><ValidPeriod>" + timeexpire + "</ValidPeriod><NotifyURL>" + notifyurl + "</NotifyURL></Body></Document>";
                rsasign = client.AttachedSign(certid, senddata);
                rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);

                #region post请求2
                string result = "";
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
                StringBuilder builder = new StringBuilder();
                builder.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                byte[] data = Encoding.UTF8.GetBytes(builder.ToString());
                req.ContentLength = data.Length;
                using (Stream reqStream = req.GetRequestStream())
                {
                    reqStream.Write(data, 0, data.Length);
                    reqStream.Close();
                }
                HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                Stream stream = resp.GetResponseStream();
                string xmlstr = "";
                //获取响应内容
                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                {
                    result = reader.ReadToEnd();
                    xmlstr = client.AttachedVerify(result);
                }
                #endregion

                if (xmlstr != null && xmlstr != "")
                {
                    XmlDocument document = new XmlDocument();
                    document.LoadXml(xmlstr);

                    string RspCode = document.GetElementsByTagName("RspCode")[0].InnerText;
                    string DisplayCodeText = document.GetElementsByTagName("DisplayCodeText")[0].InnerText;

                    if (RspCode == "MAPIPY0000" && DisplayCodeText.Length > 0)
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = DisplayCodeText;
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "";
                    }
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "";
                }


                #endregion

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 验证缴费结果
        /// </summary>
        /// <param name="out_trade_no">商户订单号</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string jfjCheckPay(string out_trade_no)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                double count = Eva.Library.Text.NumberTool.Parse(_idal_tbl_ld_jfb.GetCount(" f_value2='" + out_trade_no + "' and f_ztid='2'", "false", null));
                if (count > 0)
                {
                    resultDic["result"] = "true";
                }
                else
                {
                    resultDic["result"] = "false";
                }
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









