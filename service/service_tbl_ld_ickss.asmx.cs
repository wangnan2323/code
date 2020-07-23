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

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_ickss 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_ickss : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_ickss _idal_tbl_ld_ickss = new sara.dd.ldsw.dal.tbl_ld_ickss();
        private sara.dd.ldsw.idal.Itbl_ld_sbb _idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.reportclass.tbl_ld_ickss ickssreport = new sara.dd.ldsw.reportclass.tbl_ld_ickss();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json,string type, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                _iAccessDataTrans.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_ickss model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ickss>(json);

                if (model.f_ssbh == "")
                {
                    model.f_ssbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("ic", "");
                    model.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("ic", "");
                }

                #region 处理时间问题
               
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;
                model.f_xiekrq = DateTime.Now;
                #endregion

                switch (type)
                {
                    case "tg":
                        {

                            #region 退购
                            string ickssid = _idal_tbl_ld_ickss.Add(model, _iAccessDataTrans);
                            IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);
                            IList<sara.dd.ldsw.model.tbl_ld_sbb> model_sb_list = _idal_tbl_ld_sbb.GetList(" sys_id='" + model.f_sbbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);

                            if (model_khb_list.Count > 0 && model_sb_list.Count > 0)
                            {
                                sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];
                                sara.dd.ldsw.model.tbl_ld_sbb model_sbb = model_sb_list[0];

                                int flag_kh = _iAccessDataTrans.ExecuteSql("update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_LJGL=nvl(F_LJGL,'0')-" + model.f_dkbcgsl + ",F_NLJGL=nvl(F_NLJGL,'0')-" + model.f_dkbcgsl + ",F_ICKLJGL=nvl(F_ICKLJGL,'0')-" + model.f_dkbcgsl + ",F_VALUE9='4' WHERE SYS_ID='" + model.f_khbhid + "'");
                                int flag_sb = _iAccessDataTrans.ExecuteSql("update TBL_LD_SBB set F_SQSL='" + model.f_dkbcgsl + "',F_BQSL='" + model.f_xkbcgsl + "',F_LJGL=nvl(F_LJGL,'0')-" + model.f_dkbcgsl + ",F_NLJGL=nvl(F_NLJGL,'0')-" + model.f_dkbcgsl + " WHERE SYS_ID='" + model.f_sbbhid + "'");
                                int flag_ickss = _iAccessDataTrans.ExecuteSql("update TBL_LD_ICKSS set F_ZTID='4',F_ZT='写卡退购' WHERE SYS_ID='" + model.f_tgly + "'");
                                if (flag_kh >= 0 && flag_sb >= 0 && flag_ickss >= 0)
                                {
                                    #region 更新客户日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_yhye != model.f_khyye)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ycje");
                                        temp.Add("oldvalue", model.f_khyye);
                                        temp.Add("newvalue", model.f_yhye);
                                        temp.Add("name", "绿化表押金");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzpwf != model.f_khytjjzpwf)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzpwf");
                                        temp.Add("oldvalue", model.f_khytjjzpwf);
                                        temp.Add("newvalue", model.f_syhtjjzpwf);
                                        temp.Add("name", "调价结转污水处理费");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzsf != model.f_khytjjzsf)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzsf");
                                        temp.Add("oldvalue", model.f_khytjjzsf);
                                        temp.Add("newvalue", model.f_syhtjjzsf);
                                        temp.Add("name", "调价结转水费");
                                        array.Add(temp);
                                    }
                                    if (model_khb.f_ljgl == null || model_khb.f_ljgl == "")
                                    {
                                        model_khb.f_ljgl = "0";
                                    }
                                    if (model_khb.f_nljgl == null || model_khb.f_nljgl == "")
                                    {
                                        model_khb.f_nljgl = "0";
                                    }
                                    if (int.Parse(model.f_dkbcgsl) > 0)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljgl");
                                        temp.Add("oldvalue", model_khb.f_ljgl);
                                        temp.Add("newvalue", (int.Parse(model_khb.f_ljgl) - int.Parse(model.f_dkbcgsl)).ToString());
                                        temp.Add("name", "累积购量");
                                        array.Add(temp);
                                        IDictionary<string, string> temp2 = new Dictionary<string, string>();
                                        temp2.Add("key", "f_nljgl");
                                        temp2.Add("oldvalue", model_khb.f_nljgl);
                                        temp2.Add("newvalue", (int.Parse(model_khb.f_nljgl) - int.Parse(model.f_dkbcgsl)).ToString());
                                        temp2.Add("name", "年累积购量");
                                        array.Add(temp2);
                                    }

                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_ickss_detail", "IC卡售水", array, clientInf, _iAccessDataTrans);
                                    #endregion

                                    #region 写入水表表日志
                                    array = new List<IDictionary<string, string>>();
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_dkbcgsl != model_sbb.f_sqsl)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sqsl");
                                        temp.Add("oldvalue", model_sbb.f_sqsl);
                                        temp.Add("newvalue", model.f_dkbcgsl);
                                        temp.Add("name", "上期水量");
                                        array.Add(temp);
                                    }

                                    if (model.f_xkbcgsl != model_sbb.f_bqsl)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_bqsl");
                                        temp.Add("oldvalue", model_sbb.f_bqsl);
                                        temp.Add("newvalue", model.f_xkbcgsl);
                                        temp.Add("name", "本期水量");
                                        array.Add(temp);
                                    }
                                    if (model_sbb.f_ljgl == null || model_sbb.f_ljgl == "")
                                    {
                                        model_sbb.f_ljgl = "0";
                                    }
                                    if (model_sbb.f_nljgl == null || model_sbb.f_nljgl == "")
                                    {
                                        model_sbb.f_nljgl = "0";
                                    }
                                    if (int.Parse(model.f_dkbcgsl) > 0)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljgl");
                                        temp.Add("oldvalue", model_sbb.f_ljgl);
                                        temp.Add("newvalue", (int.Parse(model_sbb.f_ljgl) - int.Parse(model.f_dkbcgsl)).ToString());
                                        temp.Add("name", "累积购量");
                                        array.Add(temp);
                                        IDictionary<string, string> temp2 = new Dictionary<string, string>();
                                        temp2.Add("key", "f_nljgl");
                                        temp2.Add("oldvalue", model_sbb.f_nljgl);
                                        temp2.Add("newvalue", (int.Parse(model_sbb.f_nljgl) - int.Parse(model.f_dkbcgsl)).ToString());
                                        temp2.Add("name", "年累积购量");
                                        array.Add(temp2);
                                    }

                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model.f_sbbhid.ToString(), "tbl_ld_ickss_detail", "IC卡售水", array, clientInf, _iAccessDataTrans);
                                    #endregion

                                    resultDic["result"] = "true";
                                    resultDic["message"] = ickssid;

                                    _iAccessDataTrans.getTrans().commit();
                                }
                                else
                                {
                                    resultDic["result"] = "false";
                                    string errormessage = "";
                                    if (flag_sb < 0)
                                    {
                                        errormessage += "水表信息更新失败;";
                                    }
                                    if (flag_kh < 0)
                                    {
                                        errormessage += "客户信息更新失败;";
                                    }
                                    if (flag_ickss < 0)
                                    {
                                        errormessage += "IC卡退购信息更新失败;";
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

                                if (model_sb_list.Count <= 0)
                                {
                                    errormessage += "没有查询到水表信息;";
                                }
                                resultDic["message"] = errormessage;

                                _iAccessDataTrans.getTrans().rollback();
                            }
                            #endregion

                        }
                        break;
                    case "xk":
                    case "pt":
                    default:
                        {
                            string ickssid = _idal_tbl_ld_ickss.Add(model, _iAccessDataTrans);
                            resultDic["result"] = "true";
                            resultDic["message"] = ickssid;

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
        public void AddCross(string json,string type, string clientInf)
        {
            string result1 = this.Add(json, type,clientInf);
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
                List<sara.dd.ldsw.model.tbl_ld_ickss> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ickss>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ickss.AddList(modellist,null);

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
        public string Update(string json, string columns,string type, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();

                columns = FormatColumns(columns).Replace("^", ",");

                sara.dd.ldsw.model.tbl_ld_ickss model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ickss>(json);
                model.sys_lasteditdate = DateTime.Now;

                switch (type)
                {
                    case "xk":
                        {
                            resultDic["result"] = "true";
                            resultDic["message"] = _idal_tbl_ld_ickss.Update(model, columns, _iAccessDataTrans);

                            IList<sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);

                            IList<sara.dd.ldsw.model.tbl_ld_sbb> model_sbb_list = _idal_tbl_ld_sbb.GetList(" sys_id='" + model.f_sbbhid.ToString() + "'", "", "*", "", "", _iAccessDataTrans);
                           
                            if(model_khb_list.Count > 0 && model_sbb_list.Count >0)
                            {
                                sara.dd.ldsw.model.tbl_ld_sbb model_sbb = model_sbb_list[0];
                                sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];

                                //更新客户表
                                int flag_kh = _iAccessDataTrans.ExecuteSql("update TBL_LD_KHB set F_YCJE='" + model.f_yhye + "',F_TJJZPWF='" + model.f_syhtjjzpwf + "',F_TJJZSF='" + model.f_syhtjjzsf + "',F_LJGL=nvl(F_LJGL,'0')+" + model.f_xkbcgsl + ",F_NLJGL=nvl(F_NLJGL,'0')+" + model.f_xkbcgsl + ",F_ICKLJGL=nvl(F_ICKLJGL,'0')+" + model.f_xkbcgsl + ",F_VALUE9='',F_VALUE3='"+model.f_kplbid+"' WHERE SYS_ID='" + model.f_khbhid + "'");
                                //更新水表表
                                int flag_sb = _iAccessDataTrans.ExecuteSql("update TBL_LD_SBB set F_SQSL='" + model.f_dkbcgsl + "',F_BQSL='" + model.f_xkbcgsl + "',F_LJGL=nvl(F_LJGL,'0')+" + model.f_xkbcgsl + ",F_NLJGL=nvl(F_NLJGL,'0')+" + model.f_xkbcgsl + " WHERE SYS_ID='" + model.f_sbbhid + "'");


                                if (flag_kh >= 0 && flag_sb >= 0)
                                {
                                    #region 写入客户表日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_yhye != model.f_khyye)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ycje");
                                        temp.Add("oldvalue", model.f_khyye);
                                        temp.Add("newvalue", model.f_yhye);
                                        temp.Add("name", "绿化表押金");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzpwf != model.f_khytjjzpwf)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzpwf");
                                        temp.Add("oldvalue", model.f_khytjjzpwf);
                                        temp.Add("newvalue", model.f_syhtjjzpwf);
                                        temp.Add("name", "调价结转污水处理费");
                                        array.Add(temp);
                                    }
                                    if (model.f_syhtjjzsf != model.f_khytjjzsf)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_tjjzsf");
                                        temp.Add("oldvalue", model.f_khytjjzsf);
                                        temp.Add("newvalue", model.f_syhtjjzsf);
                                        temp.Add("name", "调价结转水费");
                                        array.Add(temp);
                                    }
                                    if (model_khb.f_ljgl == null || model_khb.f_ljgl == "")
                                    {
                                        model_khb.f_ljgl = "0";
                                    }
                                    if (model_khb.f_nljgl == null || model_khb.f_nljgl == "")
                                    {
                                        model_khb.f_nljgl = "0";
                                    }
                                    if (int.Parse(model.f_xkbcgsl) > 0)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljgl");
                                        temp.Add("oldvalue", model_khb.f_ljgl);
                                        temp.Add("newvalue", (int.Parse(model_khb.f_ljgl) + int.Parse(model.f_xkbcgsl)).ToString());
                                        temp.Add("name", "累积购量");
                                        array.Add(temp);
                                        IDictionary<string, string> temp2 = new Dictionary<string, string>();
                                        temp2.Add("key", "f_nljgl");
                                        temp2.Add("oldvalue", model_khb.f_nljgl);
                                        temp2.Add("newvalue", (int.Parse(model_khb.f_nljgl) + int.Parse(model.f_xkbcgsl)).ToString());
                                        temp2.Add("name", "年累积购量");
                                        array.Add(temp2);
                                    }

                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_ickss_detail", "IC卡售水", array, clientInf, _iAccessDataTrans);
                                    #endregion

                                    #region 写入水表表日志
                                    array = new List<IDictionary<string, string>>();
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_dkbcgsl != model_sbb.f_sqsl)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sqsl");
                                        temp.Add("oldvalue", model_sbb.f_sqsl);
                                        temp.Add("newvalue", model.f_dkbcgsl);
                                        temp.Add("name", "上期水量");
                                        array.Add(temp);
                                    }

                                    if (model.f_xkbcgsl != model_sbb.f_bqsl)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_bqsl");
                                        temp.Add("oldvalue", model_sbb.f_bqsl);
                                        temp.Add("newvalue", model.f_xkbcgsl);
                                        temp.Add("name", "本期水量");
                                        array.Add(temp);
                                    }
                                    if (model_sbb.f_ljgl == null || model_sbb.f_ljgl == "")
                                    {
                                        model_sbb.f_ljgl = "0";
                                    }
                                    if (model_sbb.f_nljgl == null || model_sbb.f_nljgl == "")
                                    {
                                        model_sbb.f_nljgl = "0";
                                    }
                                    if (int.Parse(model.f_xkbcgsl) > 0)
                                    {
                                        IDictionary<string, string> temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljgl");
                                        temp.Add("oldvalue", model_sbb.f_ljgl);
                                        temp.Add("newvalue", (int.Parse(model_sbb.f_ljgl) + int.Parse(model.f_xkbcgsl)).ToString());
                                        temp.Add("name", "累积购量");
                                        array.Add(temp);
                                        IDictionary<string, string> temp2 = new Dictionary<string, string>();
                                        temp2.Add("key", "f_nljgl");
                                        temp2.Add("oldvalue", model_sbb.f_nljgl);
                                        temp2.Add("newvalue", (int.Parse(model_sbb.f_nljgl) + int.Parse(model.f_xkbcgsl)).ToString());
                                        temp2.Add("name", "年累积购量");
                                        array.Add(temp2);
                                    }

                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model.f_sbbhid.ToString(), "tbl_ld_ickss_detail", "IC卡售水", array, clientInf, _iAccessDataTrans);
                                    #endregion

                                    _iAccessDataTrans.getTrans().commit();
                                }
                                else
                                {
                                    string errormessage = "";
                                    if (flag_kh < 0)
                                    {
                                        errormessage += "客户表更新失败;";
                                    }

                                    if (flag_sb < 0)
                                    {
                                        errormessage += "水表表更新失败;";
                                    }
                         
                                    resultDic["result"] = "false";
                                    resultDic["message"] = errormessage;

                                    _iAccessDataTrans.getTrans().rollback();

                                }

                            }
                            else
                            {
                                string errormessage = "";

                                if(model_khb_list.Count <= 0)
                                {
                                    errormessage += "没有查询到客户信息;";
                                }
                                if (model_sbb_list.Count <= 0)
                                {
                                    errormessage += "没有查询到水表信息;";
                                }
                                resultDic["result"] = "false";
                                resultDic["message"] = errormessage;

                                _iAccessDataTrans.getTrans().rollback();

                            }

                        }
                        break;
                    case "pt":
                    case "tg":
                    default:
                        {

                            resultDic["result"] = "true";
                            resultDic["message"] = _idal_tbl_ld_ickss.Update(model, columns, _iAccessDataTrans);

                            _iAccessDataTrans.getTrans().commit();
                        }
                        break;
                }
               
              

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
        public void UpdateCross(string json, string columns, string type, string clientInf)
        {
            string result1 = this.Update(json, columns,type, clientInf);
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
                 List<sara.dd.ldsw.model.tbl_ld_ickss> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ickss>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_ickss.UpdateList(modellist, columns,null);

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

                //删除子表的方法

                  //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ickss.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_ickss.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_ickss.GetCount(whereString, cxzxsjString, null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_ickss>(_idal_tbl_ld_ickss.GetList(whereString, cxzxsjString, orderByString, columnsString, pageSizeString, pageIndexString, null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_ickss.GetCount(whereString, cxzxsjString, null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_ickss.GetDataTableForApp(whereString, cxzxsjString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_ickss.GetCount(whereString, cxzxsjString, null) + "\",\"rows\":" + rows + "}";
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
                    strSql.Append("  (select * from tbl_ld_ickss t where ");
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
                    strSql.Append("  (select * from tbl_ld_icksshis_his t where  ");
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
                    strSql.Append(" select * from tbl_ld_ickss t where");
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

                string message = "{\"f_sflj\":\"" + resultDataTable.Rows[0]["f_sf"] + "\",\"f_pwflj\":\"" + resultDataTable.Rows[0]["f_pwf"] + "\",\"f_sllj\":\"" + resultDataTable.Rows[0]["f_sl"] + "\",\"f_shss\":\"" + resultDataTable.Rows[0]["f_shss"] + "\"}";
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
                		
				columns += "^" + "f_khbh";
                		
				columns += "^" + "f_khbhid";
                		
				columns += "^" + "f_yhbh";
                		
				columns += "^" + "f_dz";
                		
				columns += "^" + "f_sc";
                		
				columns += "^" + "f_pq";
                		
				columns += "^" + "f_sblx";
                		
				columns += "^" + "f_yslx";
                		
				columns += "^" + "f_kj";
                		
				columns += "^" + "f_yhbhid";
                		
				columns += "^" + "f_dh";
                		
				columns += "^" + "f_scid";
                		
				columns += "^" + "f_pqid";
                		
				columns += "^" + "f_sblxid";
                		
				columns += "^" + "f_yslxid";
                		
				columns += "^" + "f_khrq";
                		
				columns += "^" + "f_dy";
                		
				columns += "^" + "f_yhm";
                		
				columns += "^" + "f_qy";
                		
				columns += "^" + "f_sbbh";
                		
				columns += "^" + "f_lxtkhh";
                		
				columns += "^" + "f_jfm";
                		
				columns += "^" + "f_dyid";
                		
				columns += "^" + "f_qyid";
                		
				columns += "^" + "f_sbbhid";
                		
				columns += "^" + "f_rs";
                		
				columns += "^" + "f_sf";
                		
				columns += "^" + "f_sl";
                		
				columns += "^" + "f_jfdh";
                		
				columns += "^" + "f_jfje";
                		
				columns += "^" + "f_zt";
                		
				columns += "^" + "f_ztid";
                		
				columns += "^" + "f_bz";

                columns += "^" + "f_xkr";

                columns += "^" + "f_xkrid";

                columns += "^" + "f_xkrq";

                columns += "^" + "f_xiekr";

                columns += "^" + "f_xiekrid";

                columns += "^" + "f_xiekrq";
                        columns += "^" + "f_kjid";		
				        columns += "^" + "f_ssbh";
                        		
				        columns += "^" + "f_sjbh";
                        		
				        columns += "^" + "f_ly";
                        		
				        columns += "^" + "f_lyid";
                        		
				        columns += "^" + "f_xklx";
                        		
				        columns += "^" + "f_xkkh";
                        		
				        columns += "^" + "f_xkgscs";
                        		
				        columns += "^" + "f_xkbcgsl";
                        		
				        columns += "^" + "f_xkms";
                        		
				        columns += "^" + "f_xkljgl";
                        		
				        columns += "^" + "f_xkjzlx";
                        		
				        columns += "^" + "f_port";
                        		
				        columns += "^" + "f_dkkh";
                        		
				        columns += "^" + "f_dkbcgsl";
                        		
				        columns += "^" + "f_dkgscs";
                        		
				        columns += "^" + "f_dkljgl";
                        		
				        columns += "^" + "f_dkjzlx";
                        		
				        columns += "^" + "f_dksbzt";
				        columns += "^" + "f_khfz";
                        		
				        columns += "^" + "f_khfzid";
                        		
				        columns += "^" + "f_cbbh";
                        		
				        columns += "^" + "f_cbbhid";
                        		
				        columns += "^" + "f_dj";
                        		
				        columns += "^" + "f_pwf";
                        		
				        columns += "^" + "f_ysje";
                        		
				        columns += "^" + "f_jmhysje";
                        		
				        columns += "^" + "f_khytjjzsf";
                        		
				        columns += "^" + "f_khytjjzpwf";
                        		
				        columns += "^" + "f_sfsytjjz";
                        		
				        columns += "^" + "f_sytjjzsf";
                        		
				        columns += "^" + "f_sytjjzpwf";
                        		
				        columns += "^" + "f_syhtjjzsf";
                        		
				        columns += "^" + "f_syhtjjzpwf";
                        		
				        columns += "^" + "f_khyye";
                        		
				        columns += "^" + "f_sfsyye";
                        		
				        columns += "^" + "f_syye";
                        		
				        columns += "^" + "f_yhye";
                        		
				        columns += "^" + "f_shys";
                        		
				        columns += "^" + "f_shss";
                        		
				        columns += "^" + "f_shzl";
                        		
				        columns += "^" + "f_shssdx";
                        		
				        columns += "^" + "f_jffs";
                        		
				        columns += "^" + "f_jffsid";
                        		
				        columns += "^" + "f_xkmsid";
                        		
				        columns += "^" + "f_yyt";
                        		
                columns += "^" + "f_yytid";
				        columns += "^" + "f_kplb";
                        		
				        columns += "^" + "f_kplbid";
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
        public string NewExport(string whereString, string cxzxsjString,string orderByString, string column, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_ickss";
                //sql += " where" + whereString + "";
               // DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_ickss.GetDataTableForPC(whereString, cxzxsjString, orderByString, column, "", "", null);
                        string file = ickssreport.ReportExcel(dt,column, columnname);
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
        public void NewExportCross(string whereString, string cxzxsjString,string orderByString, string column, string columnname, string clientInf)
        {
            string result1 = this.NewExport(whereString, cxzxsjString, orderByString, column, columnname, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        #region 旧导出方法
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string Export(string whereString, string clientInf)
        //{
        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    resultDic["result"] = "";
        //    resultDic["message"] = "";
        //    _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
        //    string sql = "";
        //    try
        //    {
        //        IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
        //        if (whereString != "")
        //        {
        //            sql = "select f_ssbh,f_khbh,f_yhm,f_dz,f_dh,f_xkgscs,f_xkljgl,f_xiekrq,f_yslx,f_shys,f_zt,f_bz";
        //            sql += " from tbl_ld_ickss";
        //            sql += " where " + whereString + " ";
        //        }
        //        else
        //        {
        //            sql = "select f_ssbh,f_khbh,f_yhm,f_dz,f_dh,f_xkgscs,f_xkljgl,f_xiekrq,f_yslx,f_shys,f_zt,f_bz";
        //            sql += " from tbl_ld_jfb";
        //        }
        //        DataTable dt = _iAccessData.Query(sql).Tables[0];
        //        Dictionary<string, string> lockdic = commonclass.commonclass.lockFunction("CreateReport");
        //        if(lockdic["result"] == "true")
        //        {
        //            try
        //            {
        //        string file = ickssreport.Report_ickss(dt);
        //          commonclass.commonclass.unLockFunction("CreateReport");
        //        resultDic["result"] = "true";
        //        resultDic["message"] = file;
        //            }
        //            catch(Exception ex)
        //            {
        //                commonclass.commonclass.unLockFunction("CreateReport");
        //                resultDic["result"] = "false";
        //                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
        //            }                 
        //        }
        //        else
        //        {
        //            resultDic["result"] = "false";
        //            resultDic["message"] = lockdic["message"];
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        resultDic["result"] = "false";
        //        resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
        //    }
        //    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //}
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public void ExportCross(string whereString, string clientInf)
        //{
        //    string result1 = this.Export(whereString, clientInf);
        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    resultDic["d"] = result1;
        //    string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //    string callback = HttpContext.Current.Request["jsoncallback"];
        //    HttpContext.Current.Response.Write(callback + "(" + result + ")");
        //    HttpContext.Current.Response.End();
        //}
        #endregion


    }
}









