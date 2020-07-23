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
using System.Data;
using Eva.Library.Data;
using System.Text;
using System.Threading;
using System.IO;
using System.Net;
using System.Diagnostics;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_khb 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_khb : System.Web.Services.WebService
    {
        static string sendcount = "";
        static string onrunsysid = "";
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.idal.Itbl_ld_cbiao _idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
        private sara.dd.ldsw.idal.Itbl_ld_ickss _idal_tbl_ld_ickss = new sara.dd.ldsw.dal.tbl_ld_ickss();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private sara.dd.ldsw.reportclass.tbl_ld_khb re = new sara.dd.ldsw.reportclass.tbl_ld_khb();
        private sara.dd.ldsw.reportclass.tbl_ld_khbzdy report = new sara.dd.ldsw.reportclass.tbl_ld_khbzdy();
        private sara.dd.ldsw.reportclass.tbl_ld_khxx report_khxx = new sara.dd.ldsw.reportclass.tbl_ld_khxx();

        //public service_tbl_ld_khb()
        //{
        //    _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
        //}

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_khb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_khb>(json);

                DateTime DateNow = DateTime.Now.AddMonths(-1);
                DateTime DateBegin = new DateTime(DateNow.Year, DateNow.Month, 1);
                DateTime DateEnd = DateBegin.AddMonths(1).AddDays(-1);
                model.f_zhcbrq = DateEnd;
                model.sys_id = int.Parse(model.f_khbh);
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_khb.Add(model, null);

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
        public void AddCross(string json, string clientInf)
        {
            string result1 = this.Add(json, clientInf);
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
                List<sara.dd.ldsw.model.tbl_ld_khb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_khb>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_khb.AddList(modellist, null);

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
        public string Update(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {
                sara.dd.ldsw.model.tbl_ld_khb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_khb>(json);
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                model.sys_lasteditdate = DateTime.Now;
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_khb.Update(model, columns, t);

                #region 向用户表，水表表中刷入数据
                string updateyhb = "update tbl_ld_yhb set f_khbh='" + model.f_khbh + "' where f_yhbh='" + model.f_yhbh + "'";
                string updatesbb = "update tbl_ld_sbb set f_khbh='" + model.f_khbh + "' where f_sbbh='" + model.f_sbbh + "'";
                int yhflag = t.ExecuteSql(updateyhb);
                int sbflag = t.ExecuteSql(updatesbb);
                if (yhflag >= 0 && sbflag >= 0)
                {
                    t.getTrans().commit();
                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
                else
                {
                    t.getTrans().rollback();

                    resultDic["result"] = "false";
                    resultDic["message"] = "修改批量任务中的状态失败";
                }
                #endregion

                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateCross(string json, string columns, string clientInf)
        {
            string result1 = this.Update(json, columns, clientInf);
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
                List<sara.dd.ldsw.model.tbl_ld_khb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_khb>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_khb.UpdateList(modellist, columns, null);

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
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                string sql = "select count(*) from tbl_ld_cbiao where f_khbhid in (select sys_id from tbl_ld_khb where " + whereString + ")";
                string sql1 = "select count(*) from tbl_ld_jfb where f_khbhid in (select sys_id from tbl_ld_khb where " + whereString + ")";
                string sql2 = "select count(*) from tbl_ld_ickss where f_khbhid in (select sys_id from tbl_ld_khb where " + whereString + ")";


                double count = Eva.Library.Text.NumberTool.Parse(t.GetSingle(sql).ToString());
                double count1 = Eva.Library.Text.NumberTool.Parse(t.GetSingle(sql1).ToString());
                double count2 = Eva.Library.Text.NumberTool.Parse(t.GetSingle(sql2).ToString());

                if (count > 0 || count1 > 0 || count2 > 0)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "您所选定的信息，在抄表表或者缴费表、IC卡表中存在引用，所以不能删除。";
                    t.getTrans().rollback();
                }
                else
                {

                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_khb.Delete(whereString, t);
                    t.getTrans().commit();
                    NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);
                }
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
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
                resultDic["message"] = _idal_tbl_ld_khb.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
        public string GetCount(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_khb.GetCount(whereString, null);

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
        public void GetCountCross(string whereString, string clientInf)
        {
            string result1 = this.GetCount(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");
                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_khb.GetDataTableForPC(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null));

                //  string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_khb>(_idal_tbl_ld_khb.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_khb.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        public void GetListCross(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTimeList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");
                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_khb.GetTimeDataTableForPC(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null));

                //  string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_khb>(_idal_tbl_ld_khb.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_khb.GetTimeCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        public void GetTimeListCross(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetTimeList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetListForApp(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_khb.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_khb.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        public void GetListForAppCross(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetListForApp(whereString, orderByString, columnsString, countString, stepString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdatePLXG(string sys_ids, string json, string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                //带事务
                t.getTrans().begin();
                //查找sys_ids model
                List<sara.dd.ldsw.model.tbl_ld_khb> list_model_old = _idal_tbl_ld_khb.GetList(" sys_id in ('" + sys_ids.Replace("^", "','").ToString() + "') ", "", "*", "", "", t);
                List<sara.dd.ldsw.model.tbl_ld_khb> list_model_new = new List<model.tbl_ld_khb>();
                //解析JSON
                IDictionary<string, string> datajson = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(json);

                string f_cbbh = datajson["f_cbbh"];
                string f_cbbhid = datajson["f_cbbhid"];
                string f_khfz = datajson["f_khfz"];
                string f_khfzid = datajson["f_khfzid"];
                string f_yslx = datajson["f_yslx"];
                string f_yslxid = datajson["f_yslxid"];
                //string f_sfjlbjf = datajson["f_sfjlbjf"];
                string f_zt = datajson["f_zt"];
                string f_ztid = datajson["f_ztid"];


                for (int i = 0; i < list_model_old.Count; i++)
                {
                    #region 获取
                    sara.dd.ldsw.model.tbl_ld_khb model_new = new sara.dd.ldsw.model.tbl_ld_khb();
                    model_new.sys_id = list_model_old[i].sys_id;
                    model_new.f_cbbh = list_model_old[i].f_cbbh;
                    model_new.f_cbbhid = list_model_old[i].f_cbbhid;
                    model_new.f_khfz = list_model_old[i].f_khfz;
                    model_new.f_khfzid = list_model_old[i].f_khfzid;
                    model_new.f_yslx = list_model_old[i].f_yslx;
                    model_new.f_yslxid = list_model_old[i].f_yslxid;
                    //model_new.f_sfjlbjf = list_model_old[i].f_sfjlbjf;
                    model_new.f_zt = list_model_old[i].f_zt;
                    model_new.f_ztid = list_model_old[i].f_ztid;

                    #endregion

                    #region 赋值
                    model_new.f_cbyxm = "";
                    model_new.f_cbyid = "";
                    model_new.f_cbzq = "";
                    model_new.f_cbmc = "";
                    if (f_cbbh != "")
                    {
                        model_new.f_cbbh = f_cbbh;
                    }
                    if (f_cbbhid != "")
                    {
                        model_new.f_cbbhid = f_cbbhid;
                        sara.dd.ldsw.idal.Itbl_ld_cben idal_tbl_ld_cben = new sara.dd.ldsw.dal.tbl_ld_cben();
                        sara.dd.ldsw.model.tbl_ld_cben model_tbl_ld_cben = idal_tbl_ld_cben.GetList("sys_id = '" + model_new.f_cbbhid + "'", "", "*", "", "", t)[0];
                        model_new.f_cbyxm = model_tbl_ld_cben.f_cbymc;
                        model_new.f_cbyid = model_tbl_ld_cben.f_cbyid;
                        model_new.f_cbzq = model_tbl_ld_cben.f_cbzq;
                        model_new.f_cbmc = model_tbl_ld_cben.f_cbmc;
                    }
                    if (f_khfz != "")
                    {
                        model_new.f_khfz = f_khfz;
                    }
                    if (f_khfzid != "")
                    {
                        model_new.f_khfzid = f_khfzid;
                    }
                    if (f_yslx != "")
                    {
                        model_new.f_yslx = f_yslx;
                    }
                    if (f_yslxid != "")
                    {
                        model_new.f_yslxid = f_yslxid;
                    }
                    //    model_new.f_sfjlbjf = f_sfjlbjf;
                    if (f_zt != "")
                    {
                        model_new.f_zt = f_zt;
                    }
                    if (f_ztid != "")
                    {
                        model_new.f_ztid = f_ztid;
                    }
                    #endregion

                    _idal_tbl_ld_khb.Update(model_new, "f_cbbh,f_cbbhid,f_cbyxm,f_cbyid,f_cbzq,f_cbmc,f_khfz,f_khfzid,f_yslx,f_yslxid,f_sfjlbjl,f_zt,f_ztid", t);
                    list_model_new.Add(model_new);
                }
                #region 写入日志
                sara.dd.ldsw.model.tbl_ld_khb model_new_temp = null;
                sara.dd.ldsw.model.tbl_ld_khb model_old_temp = null;

                for (int i = 0; i < list_model_new.Count; i++)
                {

                    #region 找到新旧model
                    model_new_temp = list_model_new[i];

                    for (int j = 0; j < list_model_old.Count; j++)
                    {
                        if (model_new_temp.sys_id == list_model_old[j].sys_id)
                        {
                            model_old_temp = list_model_old[j];
                            break;
                        }
                    }
                    #endregion
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();

                    //dic中有四个值，key,name,oldvalue,newvalue[{"key":"f_yhm","oldvalue":"刘玉东","newvalue":"刘玉东2","name":"用户名"}]
                    #region 对比各个业务子段，将不同的写入array
                    if (model_new_temp.f_cbbh != model_old_temp.f_cbbh && model_new_temp.f_cbbh != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_cbbh");
                        temp.Add("oldvalue", model_old_temp.f_cbbh);
                        temp.Add("newvalue", model_new_temp.f_cbbh);
                        temp.Add("name", "抄本编号");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_cbbhid != model_old_temp.f_cbbhid && model_new_temp.f_cbbhid != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_cbbhid");
                        temp.Add("oldvalue", model_old_temp.f_cbbhid);
                        temp.Add("newvalue", model_new_temp.f_cbbhid);
                        temp.Add("name", "抄表编号id");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_khfz != model_old_temp.f_khfz && model_new_temp.f_khfz != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_khfz");
                        temp.Add("oldvalue", model_old_temp.f_khfz);
                        temp.Add("newvalue", model_new_temp.f_khfz);
                        temp.Add("name", "客户分组");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_khfzid != model_old_temp.f_khfzid && model_new_temp.f_khfzid != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_khfzid");
                        temp.Add("oldvalue", model_old_temp.f_khfzid);
                        temp.Add("newvalue", model_new_temp.f_khfzid);
                        temp.Add("name", "客户分组id");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_yslx != model_old_temp.f_yslx && model_new_temp.f_yslx != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_yslx");
                        temp.Add("oldvalue", model_old_temp.f_yslx);
                        temp.Add("newvalue", model_new_temp.f_yslx);
                        temp.Add("name", "用水类型");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_yslxid != model_old_temp.f_yslxid && model_new_temp.f_yslxid != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_yslxid");
                        temp.Add("oldvalue", model_old_temp.f_yslxid);
                        temp.Add("newvalue", model_new_temp.f_yslxid);
                        temp.Add("name", "用水类型id");
                        array.Add(temp);
                    }
                    //if (model_new_temp.f_sfjlbjf != model_old_temp.f_sfjlbjf && model_new_temp.f_sfjlbjf != "")
                    //{
                    //    IDictionary<string, string> temp = new Dictionary<string, string>();
                    //    temp.Add("key", "f_sfjlbjf");
                    //    temp.Add("oldvalue", model_old_temp.f_sfjlbjf);
                    //    temp.Add("newvalue", model_new_temp.f_sfjlbjf);
                    //    temp.Add("name", "是否累量不计费");
                    //    array.Add(temp);
                    //}
                    if (model_new_temp.f_zt != model_old_temp.f_zt && model_new_temp.f_zt != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_zt");
                        temp.Add("oldvalue", model_old_temp.f_zt);
                        temp.Add("newvalue", model_new_temp.f_zt);
                        temp.Add("name", "状态");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_ztid != model_old_temp.f_ztid && model_new_temp.f_ztid != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_ztid");
                        temp.Add("oldvalue", model_old_temp.f_ztid);
                        temp.Add("newvalue", model_new_temp.f_ztid);
                        temp.Add("name", "状态id");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_cbyxm != model_old_temp.f_cbyxm && model_new_temp.f_cbyxm != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_cbyxm");
                        temp.Add("oldvalue", model_old_temp.f_cbyxm);
                        temp.Add("newvalue", model_new_temp.f_cbyxm);
                        temp.Add("name", "抄表员");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_cbyid != model_old_temp.f_cbyid && model_new_temp.f_cbyid != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_cbyid");
                        temp.Add("oldvalue", model_old_temp.f_cbyid);
                        temp.Add("newvalue", model_new_temp.f_cbyid);
                        temp.Add("name", "抄表员id");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_cbzq != model_old_temp.f_cbzq && model_new_temp.f_cbzq != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_cbzq");
                        temp.Add("oldvalue", model_old_temp.f_cbzq);
                        temp.Add("newvalue", model_new_temp.f_cbzq);
                        temp.Add("name", "抄本周期");
                        array.Add(temp);
                    }
                    if (model_new_temp.f_cbmc != model_old_temp.f_cbmc && model_new_temp.f_cbmc != "")
                    {
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_cbmc");
                        temp.Add("oldvalue", model_old_temp.f_cbmc);
                        temp.Add("newvalue", model_new_temp.f_cbmc);
                        temp.Add("name", "抄本名称");
                        array.Add(temp);
                    }
                    #endregion
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_new_temp.sys_id.ToString(), "tbl_ld_khb_detail", "客户信息批量修改", array, clientInf, t);

                }

                #endregion

                resultDic["result"] = "true";
                resultDic["message"] = "";

                NewLog("数据更新成功，更新的数据为：json：" + json + "，sys_ids：" + sys_ids, "sql_update", clientInf);
                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，sys_ids：" + sys_ids + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
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

                columns += "^" + "f_ztkhh";

                columns += "^" + "f_khfz";

                columns += "^" + "f_khfzid";

                columns += "^" + "f_ycje";

                columns += "^" + "f_yslx";

                columns += "^" + "f_yslxid";

                columns += "^" + "f_tbbh";

                columns += "^" + "f_sfjlbjf";

                columns += "^" + "f_zt";

                columns += "^" + "f_ztid";

                columns += "^" + "f_bz";

                columns += "^" + "f_cbbh";

                columns += "^" + "f_cbbhid";

                columns += "^" + "f_cbxh";

                columns += "^" + "f_cbyxm";

                columns += "^" + "f_cbyid";

                columns += "^" + "f_cbzq";

                columns += "^" + "f_cbmc";

                columns += "^" + "f_yhbh";

                columns += "^" + "f_yhbhid";

                columns += "^" + "f_jfm";

                columns += "^" + "f_yhfz";

                columns += "^" + "f_yhfzid";

                columns += "^" + "f_dz";

                columns += "^" + "f_sbdz";
                columns += "^" + "f_ye";
                columns += "^" + "f_dh";

                columns += "^" + "f_dy";

                columns += "^" + "f_dyid";

                columns += "^" + "f_sc";

                columns += "^" + "f_scid";

                columns += "^" + "f_qy";

                columns += "^" + "f_qyid";

                columns += "^" + "f_pq";

                columns += "^" + "f_pqid";

                columns += "^" + "f_tsyxzh";

                columns += "^" + "f_hth";

                columns += "^" + "f_sfzh";

                columns += "^" + "f_khrq";

                columns += "^" + "f_sbbh";

                columns += "^" + "f_sbbhid";

                columns += "^" + "f_bqzm";

                columns += "^" + "f_sqzm";

                columns += "^" + "f_bqsl";

                columns += "^" + "f_sqsl";

                columns += "^" + "f_qsqpjsl";

                columns += "^" + "f_qlqpjsl";

                columns += "^" + "f_ljgl";

                columns += "^" + "f_lxth";

                columns += "^" + "f_sblx";

                columns += "^" + "f_sblxid";

                columns += "^" + "f_jllx";

                columns += "^" + "f_jllxid";

                columns += "^" + "f_tssbbh";
                columns += "^" + "f_ljqf";
                columns += "^" + "f_tjjzpwf";
                columns += "^" + "f_tjjzsf";
                columns += "^" + "f_tssbbhid";
                columns += "^" + "f_nljgl";
                columns += "^" + "f_sqysl";
                columns += "^" + "f_jhysl";
                columns += "^" + "f_ickljgl";


                columns += "^" + "f_sfdxcs";
                columns += "^" + "f_dxcsyy";

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
        public string Move(string sys_id, string type, string clientInf)
        {
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                string sql = "select f_cbxh , f_cbbh from tbl_ld_khb where sys_id ='" + sys_id + "' ";
                DataSet ds = t.Query(sql);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    string f_cbxh = ds.Tables[0].Rows[0]["f_cbxh"].ToString();
                    string f_cbbh = ds.Tables[0].Rows[0]["f_cbbh"].ToString();
                    sql = "";
                    sql += " select *  from ( ";
                    sql += " select rownum rn, b.* from (";
                    sql += " select f_cbxh, f_cbbh,sys_id from tbl_ld_khb";
                    sql += " where f_cbbh = '" + f_cbbh + "'";
                    if (type == "down")
                    {
                        sql += " and to_number(f_cbxh) > to_number('" + f_cbxh + "')  order by to_number(f_cbxh) asc";
                    }
                    else
                    {
                        sql += " and to_number(f_cbxh) < to_number('" + f_cbxh + "')  order by to_number(f_cbxh) desc";
                    }
                    sql += " ) b) c";
                    sql += " where c.rn = 1";
                    DataSet newds = t.Query(sql);
                    if (newds.Tables[0].Rows.Count > 0)
                    {
                        string newf_cbxh = newds.Tables[0].Rows[0]["f_cbxh"].ToString();
                        string newf_cbbh = newds.Tables[0].Rows[0]["f_cbbh"].ToString();
                        string newsys_id = newds.Tables[0].Rows[0]["sys_id"].ToString();
                        sql = "update tbl_ld_khb set f_cbxh = '" + newf_cbxh + "' where sys_id = '" + sys_id + "'";
                        t.ExecuteSql(sql);
                        sql = "update tbl_ld_khb set f_cbxh = '" + f_cbxh + "' where sys_id = '" + newsys_id + "'";
                        t.ExecuteSql(sql);
                        t.getTrans().commit();
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                    }
                    else
                    {
                        t.getTrans().rollback();
                        resultDic["result"] = "false";
                        if (type == "up")
                        {
                            resultDic["message"] = "当前已经是第一条数据";
                        }
                        else
                        {
                            resultDic["message"] = "当前已经是最后一条数据";
                        }
                    }
                }
                else
                {
                    t.getTrans().rollback();
                    resultDic["result"] = "false";
                    resultDic["message"] = "移动数据失败";
                }
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void MoveCross(string sys_id, string type, string clientInf)
        {
            string result1 = this.Move(sys_id, type, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ReportList(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string sql = "select f_khbh,f_ycje,f_yslx,f_cbbh,f_yhm,f_dz,f_dh,f_tjjzpwf,f_tjjzsf,f_nljgl,f_ljqf,f_qy,f_pq,f_sblx,f_zt,f_bz";
                sql += " from tbl_ld_khb";
                sql += " where" + whereString + "";
                DataTable dt = _iAccessData.Query(sql).Tables[0];

                string file = re.ReportExcel(dt);

                resultDic["result"] = "true";
                resultDic["message"] = file;


            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            //string sql = "select " + column;
            //sql += " from tbl_ld_khb";
            //sql += " where" + whereString + "";
            //DataTable dt = _iAccessData.Query(sql).Tables[0];
        }

        //导出数据客户信息
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ReportTime(string whereString, string orderByString, string column, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_khb_time";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_khb.GetTimeDataTableForPC(whereString, orderByString, column, "", "", null);

                string file = report.ReportExcel(dt, column, columnname);
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


        //导出数据客户信息
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string whereString, string orderByString, string column, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                DataTable dt = _idal_tbl_ld_khb.GetDataTableForPC(whereString, orderByString, column, "", "", null);

                if (column.EndsWith("f_value10"))
                {
                    string sql = "select f_khbh,f_nr from TBL_LDBM_EXPDATA where f_lxid != '08060002'";
                    DataTable zhdt = _iAccessData.Query(sql).Tables[0];

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        DataRow[] drs = zhdt.Select("f_khbh='" + dt.Rows[i]["f_khbh"] + "'");

                        if (drs.Length == 1)
                        {
                            dt.Rows[i]["f_value10"] = drs[0]["f_nr"];
                        }
                    }
                }

                string file = report_khxx.ReportExcel(dt, column, columnname);

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
        public void ExportCross(string whereString, string orderByString, string column, string columnname, string clientInf)
        {
            string result1 = this.Export(whereString, orderByString, column, columnname, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getWeixinyue(string f_khbh)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                object[] args = { f_khbh };
                string result = Eva.Library.WebService.DynamicWebServices.InvokeWebService("http://162.16.166.1/sara.dd.actionwx/service/service_tbl_wx_khb.asmx", "getWeixinyue", args).ToString();

                resultDic["result"] = "true";
                resultDic["message"] = result;

            }
            catch (Exception ex)
            {

                resultDic["result"] = "false";
                resultDic["message"] = ex.ToString();
            }

            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        //缴费及查询接口
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string jfjQuery(string f_khbh, string type)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            resultDic["cbdt"] = "";
            try
            {
                List<model.tbl_ld_khb> modellist = _idal_tbl_ld_khb.GetList(" f_khbh='" + f_khbh + "'", " sys_id desc", "*", "", "", null);
                DataTable dt = null;


                if (modellist.Count == 1)
                {
                    //判断是否属于IC卡用户
                    if (modellist[0].f_khfzid.IndexOf("4063") != -1)
                    {
                        //属于IC卡用户

                        dt = _idal_tbl_ld_ickss.GetDataTableForPC(" f_khbh='" + f_khbh + "' and to_char(f_xiekrq,'yyyy')=to_char(sysdate,'yyyy') and f_ztid='2'", "false", " f_xiekrq desc", "f_xiekrq as 写卡日期,f_sl as 当期购水量,f_ysje as 当期金额,f_sf as 水费,f_pwf as 污水处理费,f_sblx as 水表类型,f_ly as 来源", "", "", null);
                        //dt = _idal_tbl_ld_ickss.GetDataTableForPC(" f_khbh='" + f_khbh + "' and (to_char(f_xiekrq,'yyyy')=to_char(sysdate,'yyyy') or to_char(f_xiekrq,'yyyy')=to_char(add_months(sysdate,-12),'yyyy')) and f_ztid='2'", "false", " f_xiekrq desc", "f_xiekrq as 写卡日期,f_sl as 当期购水量,f_ysje as 当期金额,f_sf as 水费,f_pwf as 污水处理费,f_sblx as 水表类型,f_ly as 来源", "", "", null);


                    }
                    else
                    {
                        //非IC卡用户
                        if (type == "query")
                        {
                            dt = _idal_tbl_ld_cbiao.GetDataTableForPC(" f_khbh='" + f_khbh + "' and to_char(f_cbsj,'yyyy')=to_char(sysdate,'yyyy')", "false", " f_cbsj desc", "f_cbsj as 抄表时间,f_bqsl as 当月水量,f_bqje as 当期金额,f_sf as 水费,f_pwf as 污水处理费,REPLACE(f_zt,'已算费','未缴费') as 缴费状态,f_dyjtsl as 一阶梯水量,f_dyjtsf as 一阶梯水费,f_dejtsl as 二阶梯水量,f_dejtsf as 二阶梯水费,f_dsjtsl as 三阶梯水量,f_dsjtsf as 三阶梯水费", "", "", null);
                            //dt = _idal_tbl_ld_cbiao.GetDataTableForPC(" f_khbh='" + f_khbh + "' and (to_char(f_cbsj,'yyyy')=to_char(sysdate,'yyyy') or to_char(f_cbsj,'yyyy')=to_char(add_months(sysdate,-12),'yyyy'))", "false", " f_cbsj desc", "f_cbsj as 抄表时间,f_bqsl as 当月水量,f_bqje as 当期金额,f_sf as 水费,f_pwf as 污水处理费,REPLACE(f_zt,'已算费','未缴费') as 缴费状态,f_dyjtsl as 一阶梯水量,f_dyjtsf as 一阶梯水费,f_dejtsl as 二阶梯水量,f_dejtsf as 二阶梯水费,f_dsjtsl as 三阶梯水量,f_dsjtsf as 三阶梯水费", "", "", null);

                        }
                        else
                        {
                            dt = _idal_tbl_ld_cbiao.GetDataTableForPC(" f_khbh='" + f_khbh + "' and to_char(f_cbsj,'yyyy')=to_char(sysdate,'yyyy') and f_ztid='2'", "false", " f_cbsj desc", "f_cbsj as 抄表时间,f_bqsl as 当月水量,f_bqje as 当期金额,f_sf as 水费,f_pwf as 污水处理费,REPLACE(f_zt,'已算费','未缴费') as 缴费状态,f_dyjtsl as 一阶梯水量,f_dyjtsf as 一阶梯水费,f_dejtsl as 二阶梯水量,f_dejtsf as 二阶梯水费,f_dsjtsl as 三阶梯水量,f_dsjtsf as 三阶梯水费", "", "", null);
                            //dt = _idal_tbl_ld_cbiao.GetDataTableForPC(" f_khbh='" + f_khbh + "' and (to_char(f_cbsj,'yyyy')=to_char(sysdate,'yyyy') or to_char(f_cbsj,'yyyy')=to_char(add_months(sysdate,-12),'yyyy')) and f_ztid='2'", "false", " f_cbsj desc", "f_cbsj as 抄表时间,f_bqsl as 当月水量,f_bqje as 当期金额,f_sf as 水费,f_pwf as 污水处理费,REPLACE(f_zt,'已算费','未缴费') as 缴费状态,f_dyjtsl as 一阶梯水量,f_dyjtsf as 一阶梯水费,f_dejtsl as 二阶梯水量,f_dejtsf as 二阶梯水费,f_dsjtsl as 三阶梯水量,f_dsjtsf as 三阶梯水费", "", "", null);

                        }
                    }


                    resultDic["result"] = "true";
                    resultDic["message"] = Eva.Library.Format.FormatEntityTool.FormatModelToJson(modellist[0]);
                    if (dt.Rows.Count > 0)
                    {
                        resultDic["cbdt"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);
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
                resultDic["message"] = ex.ToString();
            }

            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SendMessage(string time, string wherestring, string gridselectids, string sysid)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "true";
            resultDic["message"] = "";
            if (onrunsysid == "" || onrunsysid == sysid)
            {
                if (time == "0")
                {
                    onrunsysid = sysid;
                    sendcount = "0";
                    DoSendWork dosend = new DoSendWork();
                    dosend.sysid = sysid;
                    dosend.wherestring = wherestring;
                    dosend.gridselectids = gridselectids;

                    Thread t = new Thread(new ThreadStart(dosend.DoWork)); //实例化一个线程
                    t.Start(); //启动
                }
                else
                {

                    HttpCookie cookie = HttpContext.Current.Request.Cookies["sendmessage" + sysid];
                    if (cookie == null)
                    {
                        cookie = new HttpCookie("sendmessage" + sysid);
                    }
                    cookie.Value = sendcount;
                    cookie.Path = "/sara.dd.ldsw/";
                    HttpContext.Current.Response.AppendCookie(cookie);


                }
            }
            else
            {
                resultDic["result"] = "false";
                resultDic["message"] = "";
            }


            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }
        class DoSendWork
        {
            public string sysid;//id
            public string wherestring; //查询条件where语句
            public string gridselectids; //选中发送人


            public void DoWork()
            {

                sara.dd.ldsw.idal.Itbl_ld_dxcs _idal_tbl_ld_dxcs = new sara.dd.ldsw.dal.tbl_ld_dxcs();
                sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                //判断是否存在勾选项
                if (gridselectids != null && gridselectids.Length > 0)
                {
                    //存在勾选，只对勾选项用户发送短信息
                    List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList("sys_id in (" + gridselectids.Replace('^', ',') + ") and f_sfdxcs='true'", "", "f_khbh,f_dh,f_yhm,f_ljqf,f_dz", "", "", null);
                    //循环发送信息
                    for (int i = 0; i < khmodellist.Count; i++)
                    {

                        sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[i];
                        //判断客户是否存在电话
                        if (khmodel.f_dh != null && khmodel.f_dh.Length > 10)
                        {
                            Thread.Sleep(10);
                            //存在电话发送短信
                            sara.dd.ldsw.commonclass.duanxinclass.sendDuanxin(khmodel.f_dh, khmodel.f_khbh, khmodel.f_dz, khmodel.f_ljqf);
                            sendcount = i.ToString();

                        }
                        else
                        {
                            //没有电话跳到下一位
                            sendcount = i.ToString();
                        }
                    }

                    sendcount = khmodellist.Count.ToString();
                }
                else
                {
                    //不存在勾选项，按照wherestirng查询信息获取用户电话
                    if (wherestring.Length > 0)
                    {
                        wherestring = wherestring + " and f_sfdxcs='true'";
                    }
                    else
                    {
                        wherestring = " f_sfdxcs='true'";
                    }
                    List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList(wherestring, "", "f_khbh,f_dh,f_yhm,f_ljqf,f_dz", "", "", null);
                    //循环发送信息
                    for (int i = 0; i < khmodellist.Count; i++)
                    {
                        Thread.Sleep(10);
                        sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[i];
                        //判断客户是否存在电话
                        if (khmodel.f_dh != null && khmodel.f_dh.Length > 10)
                        {
                            //存在电话发送短信
                            sara.dd.ldsw.commonclass.duanxinclass.sendDuanxin(khmodel.f_dh, khmodel.f_khbh, khmodel.f_dz, khmodel.f_ljqf);
                            sendcount = i.ToString();
                        }
                        else
                        {
                            //没有电话跳到下一位
                            sendcount = i.ToString();
                        }
                    }
                    sendcount = khmodellist.Count.ToString();
                }


                //短信发送完成更新发送状态
                List<sara.dd.ldsw.model.tbl_ld_dxcs> modellist = _idal_tbl_ld_dxcs.GetList("sys_id='" + this.sysid + "'", "", "*", "", "", null);

                if (modellist.Count == 1)
                {
                    sara.dd.ldsw.model.tbl_ld_dxcs model = modellist[0];

                    model.f_fsztid = "2";
                    model.f_fszt = "已发送";

                    _idal_tbl_ld_dxcs.Update(model, "f_fsztid,f_fszt", null);
                }

                onrunsysid = "";
            }

        }

        //以下均为实验
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void MultiMessage()
        {
            sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
            List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList("length(f_dh)=11 and f_dh like '1%'", "", "f_dh", "", "", null);
            //List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList("f_dh='13920294833'", "", "f_dh", "", "", null);

            List<string> phoneNumbers = new List<string>();
            //循环发送信息
            for (int i = 0; i < khmodellist.Count; i++)
            {
                sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[i];
                //判断客户是否存在电话
                if (khmodel.f_dh != null && khmodel.f_dh.Length > 10)
                {
                    //存在电话放入数组
                    phoneNumbers.Add(khmodel.f_dh);

                }

            }

            sara.dd.ldsw.commonclass.duanxinclass.sendMessage(phoneNumbers);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void SubmitServer(string type)
        {
            try
            {
                string url = "";
                com.bocom.pay.BocomClient client = new com.bocom.pay.BocomClient();
                client.initialize(Eva.Library.Global.AppRootPath + "bocommjava/ini/BocompayMerchant.xml");
                string senddata = "";
                string rsasign = "";
                DateTime dt = DateTime.Now;
                string str = dt.ToString("yyyyMMddHHmmss");
                switch (type)
                {
                    case "1":
                        url = "http://pbanktest.95559.com.cn/mapiTRL/pay";
                        //微信
                        senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>301140853999579</MerPtcId><ReqTime>" + str + "</ReqTime><TranCode>MAPIPY5114</TranCode><Version>1.1.20181206</Version></Head><Body><PayMerTranNo>" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + "</PayMerTranNo><Location>ONLINE</Location><TranScene>B2C-JSAPI-WECHAT</TranScene><Amount>0.01</Amount><Currency>CNY</Currency><TranContent>aaa</TranContent><MerMemo>bbb</MerMemo><TranOptions></TranOptions><ValidPeriod>20201221235959</ValidPeriod><NotifyURL>https://162.16.166.1//sara.dd.ldsw/service/service_jiaohang_response.ashx</NotifyURL></Body></Document>";
                        //支付宝
                        //senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>301140853999579</MerPtcId><ReqTime>" + str + "</ReqTime><TranCode>MAPIPY5114</TranCode><Version>1.1.20181206</Version></Head><Body><PayMerTranNo>" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + "</PayMerTranNo><Location>ONLINE</Location><TranScene>B2C-JSAPI-ALIPAY</TranScene><Amount>0.01</Amount><Currency>CNY</Currency><TranContent>aaa</TranContent><MerMemo>bbb</MerMemo><TranOptions></TranOptions><ValidPeriod>20191221235959</ValidPeriod><NotifyURL>https://162.16.166.1//sara.dd.ldsw/service/service_jiaohang_response.ashx</NotifyURL></Body></Document>";

                        rsasign = client.AttachedSign("301140880629503", senddata);
                        var post = new sara.dd.ldsw.commonclass.RemotePost();
                        post.Add("RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                        post.Submit(url);
                        //后台通知
                        //<? xml version = '1.0' encoding = 'UTF-8' ?>< Document >< Head >< TranCode > MAPIPY5196 </ TranCode >< MerPtcId > 301140853999579 </ MerPtcId >< ReqTime > 20191206110259 </ ReqTime >< Version > 1.0.20181206 </ Version ></ Head >< Body >< TranType > PAY </ TranType >< MerTranNo > 201912061102509360 </ MerTranNo >< TranState > SUCCESS </ TranState >< TranStateCode ></ TranStateCode >< TranStateMsg ></ TranStateMsg >< BatchNo > 20191206 </ BatchNo >< FinalTime > 20191206110239 </ FinalTime >< Amount > 0.01 </ Amount >< Currency > CNY </ Currency >< TranContent > aaa </ TranContent >< MerMemo > bbb </ MerMemo ></ Body ></ Document >
                        //   string message = "MIIGnAYJKoZIhvcNAQcCoIIGjTCCBokCAQExCzAJBgUrDgMCGgUAMIICJwYJKoZIhvcNAQcBoIICGASCAhQ8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCc%2FPjxEb2N1bWVudD48SGVhZD48VHJhbkNvZGU%2BTUFQSVBZNTE5NjwvVHJhbkNvZGU%2BPE1lclB0Y0lkPjMwMTE0MDg1Mzk5OTU3OTwvTWVyUHRjSWQ%2BPFJlcVRpbWU%2BMjAxOTEyMDYxMTAyNTk8L1JlcVRpbWU%2BPFZlcnNpb24%2BMS4wLjIwMTgxMjA2PC9WZXJzaW9uPjwvSGVhZD48Qm9keT48VHJhblR5cGU%2BUEFZPC9UcmFuVHlwZT48TWVyVHJhbk5vPjIwMTkxMjA2MTEwMjUwOTM2MDwvTWVyVHJhbk5vPjxUcmFuU3RhdGU%2BU1VDQ0VTUzwvVHJhblN0YXRlPjxUcmFuU3RhdGVDb2RlPjwvVHJhblN0YXRlQ29kZT48VHJhblN0YXRlTXNnPjwvVHJhblN0YXRlTXNnPjxCYXRjaE5vPjIwMTkxMjA2PC9CYXRjaE5vPjxGaW5hbFRpbWU%2BMjAxOTEyMDYxMTAyMzk8L0ZpbmFsVGltZT48QW1vdW50PjAuMDE8L0Ftb3VudD48Q3VycmVuY3k%2BQ05ZPC9DdXJyZW5jeT48VHJhbkNvbnRlbnQ%2BYWFhPC9UcmFuQ29udGVudD48TWVyTWVtbz5iYmI8L01lck1lbW8%2BPC9Cb2R5PjwvRG9jdW1lbnQ%2BoIIC5zCCAuMwggJMoAMCAQICATkwDQYJKoZIhvcNAQEFBQAwMzELMAkGA1UEBhMCQ04xEDAOBgNVBAoTB0JPQ1Rlc3QxEjAQBgNVBAMTCUJPQ1Rlc3RDQTAeFw0xNTEwMTQwNzU5NTRaFw0yNTEwMTEwNzU5NTRaMFwxCzAJBgNVBAYTAkNOMRAwDgYDVQQK";
                        //message += "EwdCT0NUZXN0MREwDwYDVQQLEwhCQU5LQ09NTTESMBAGA1UECxMJTWVyY2hhbnRzMRQwEgYDVQQDEwtCb2NvbU5ldFBheTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOOPTJvVLWObz4ynjtV2GCCSr1CsowDJKXidJ8jIASg7zmQEOXtDtKm9iKYjXvAfbrwW % 2BrheIfsYq % 2F % 2F1BUdOvhkdEbXvq7DxgiS0lR % 2BtVkhbtQRznhP8TdW304af0FLYIFVHvixx9HGFu1CRvgM2E9vy7fG % 2Bep73HtsOhobaKrbFJrqhxBSsWV1xBs2nsUHQqkdFmTyGgzichVeoJ6IeY4biOahxot8 % 2FfD7EZQ3 % 2Bsj0uba5h3snd2ZyMPXNK % 2Fn % 2BVulx % 2FhNmg3XDbRhCQprSTF2Pg % 2F6SirGC71gWe8 % 2FhGJi0cJP1OFm9 % 2FpPfT3O4gsG8abzbIxqV % 2FubNWldJjZuXNYmECAwEAAaNaMFgwCQYDVR0TBAIwADAsBglghkgBhvhCAQ0EHxYdT3BlblNTTCBHZW5lcmF0ZWQgQ2VydGlmaWNhdGUwHQYDVR0OBBYEFIFJUd7iiM % 2FEhU4AdIYORLGUUBMLMA0GCSqGSIb3DQEBBQUAA4GBAF1cFJQLvTqJvaLNLlncJWs2Ke1dm % 2B % 2Br1jpUQm % 2B2mMioviupeMMH9dZ7nZNt2br4DQq4R % 2FDLQWUhysevueXYf0IR76wBuyNrfoIkmUjZjAcTgDFL0qLHv9aIqcx1GmHJS % 2FWSL6 % 2FOBkEqFhcU25Th0ZtP % 2BiQpJ4CsxrVXE8D6TCYaMYIBXzCCAVsCAQEwODAzMQswCQYDVQQGEwJDTjEQMA4GA1UEChMHQk9DVGVzdDESMBAGA1UEAxMJQk9DVGVzdENBAgE5MAkGBSsOAwIaBQAwDQYJKoZIhvcNAQEBBQAEggEAzNr3uiRKH7sNJAcZbVmTgPKcEMuYhfUEx3qEVLQaQk49R";
                        //                   message+=" % 2B7gpQ10n6yNeOeadsZ9mYVzTttU8WSoOuOpwcER5Diy0NndYD % 2FUkQ % 2FGVEOC2s5smvpnq3QPbltU8qyCZKkjR3 % 2FDxXPtI6RouTTsYy1LkHl3 % 2BbQ % 2BlNIO48CU0GcFeUc0U2d3AmhhHIeNk2MvdqPcG % 2BtDxMvnSY9SLCv % 2Br98oPreLEMl8uLE4491o % 2FoET7rQuo24BXms % 2BRZv86uPeKXXdZADL7FBQHlG2ZX % 2Bizfj9u2I % 2F4DTa4pG5ONxgaoFDXL77zjH9tYghMj % 2Fzte6v4k0lSFbcbByxhSDe % 2Bmk3ErFvIw % 3D % 3D";

                        //message = message.Replace("\n", "").Replace("\r", "").Replace(" ", "");
                        //message = System.Web.HttpUtility.UrlDecode(message, System.Text.Encoding.UTF8);
                        //string ll = client.AttachedVerify(message);
                        break;
                    case "2":
                        url = "http://pbanktest.95559.com.cn/mapiTRL/interface";
                        senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>301140853999579</MerPtcId><ReqTime>" + str + "</ReqTime><TranCode>MAPIPY5112</TranCode><Version>1.1.20181206</Version></Head><Body><PayMerTranNo>" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + "</PayMerTranNo><Location>ONLINE</Location><TranScene>B2C-API-DISPLAYCODE</TranScene><Amount>0.01</Amount><Currency>CNY</Currency><TranContent>aaa</TranContent><MerMemo>bbb</MerMemo><TranOptions></TranOptions><ValidPeriod>20201221235959</ValidPeriod><NotifyURL>https://162.16.166.1//sara.dd.ldsw/service/service_jiaohang_response.ashx</NotifyURL></Body></Document>";
                        rsasign = client.AttachedSign("301140880629503", senddata);
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
                        //获取响应内容
                        using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                        {
                            result = reader.ReadToEnd();
                            string xmlstr = client.AttachedVerify(result);
                        }
                        #endregion
                        //var post2 = new sara.dd.ldsw.commonclass.RemotePost();
                        //post2.Add("RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                        //post2.Submit(url);
                        break;
                    case "3":
                        url = "http://pbanktest.95559.com.cn/mapiTRL/interface";
                        senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>301140853999579</MerPtcId><ReqTime>" + str + "</ReqTime><TranCode>MAPIPY5197</TranCode><Version>1.1.20181206</Version></Head><Body><BatchNo>20190106</BatchNo></Body></Document>";
                        rsasign = client.AttachedSign("301140880629503", senddata);
                        rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);

                        #region post请求2
                        string result2 = "";
                        HttpWebRequest req2 = (HttpWebRequest)WebRequest.Create(url);
                        req2.Method = "POST";
                        req2.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
                        StringBuilder builder2 = new StringBuilder();
                        builder2.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                        byte[] data2 = Encoding.UTF8.GetBytes(builder2.ToString());
                        req2.ContentLength = data2.Length;
                        using (Stream reqStream = req2.GetRequestStream())
                        {
                            reqStream.Write(data2, 0, data2.Length);
                            reqStream.Close();
                        }
                        HttpWebResponse resp2 = (HttpWebResponse)req2.GetResponse();
                        Stream stream2 = resp2.GetResponseStream();
                        //获取响应内容
                        using (StreamReader reader = new StreamReader(stream2, Encoding.UTF8))
                        {
                            result = reader.ReadToEnd();
                            string xmlstr = client.AttachedVerify(result);
                        }
                        #endregion
                        //var post2 = new sara.dd.ldsw.commonclass.RemotePost();
                        //post2.Add("RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                        //post2.Submit(url);
                        break;
                    case "4":
                        url = "http://pbanktest.95559.com.cn/mapiTRL/interface";
                        senddata = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Document><Head><MerPtcId>301140853999579</MerPtcId><ReqTime>" + str + "</ReqTime><TranCode>MAPIPY5192</TranCode><Version>1.1.20181206</Version></Head><Body><TranType>PAY</TranType><MerTranNo>202001031522355518</MerTranNo></Body></Document>";
                        rsasign = client.AttachedSign("301140880629503", senddata);
                        rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);

                        #region post请求2
                        string result3 = "";
                        HttpWebRequest req3 = (HttpWebRequest)WebRequest.Create(url);
                        req3.Method = "POST";
                        req3.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
                        StringBuilder builder3 = new StringBuilder();
                        builder3.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                        byte[] data3 = Encoding.UTF8.GetBytes(builder3.ToString());
                        req3.ContentLength = data3.Length;
                        using (Stream reqStream = req3.GetRequestStream())
                        {
                            reqStream.Write(data3, 0, data3.Length);
                            reqStream.Close();
                        }
                        HttpWebResponse resp3 = (HttpWebResponse)req3.GetResponse();
                        Stream stream3 = resp3.GetResponseStream();
                        //获取响应内容
                        using (StreamReader reader = new StreamReader(stream3, Encoding.UTF8))
                        {
                            result = reader.ReadToEnd();
                            string xmlstr = client.AttachedVerify(result);
                        }
                        #endregion

                        break;
                }


            }
            catch (Exception ex)
            {

            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string tcsServer(string url, string type)
        {
            try
            {

                switch (type)
                {
                    case "data":
                        string senddata = "{\"appid\":\"76\",\"json\":{\"txzhid\":\"\",\"xmmc\":\"111111\",\"xzqy\":\"北辰区\",\"mbzbx\":\"2000国家大地坐标系大地坐标\",\"zhyt\":\"征转报部数据\",\"sydw\":\"55222\",\"fjsm\":\"4422\",\"bz\":\"33\",\"cjr\":\"22\"}}";

                        #region post请求2
                        string result = "";
                        HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                        req.Method = "POST";
                        req.ContentType = "application/json;charset=UTF-8";

                        byte[] data = Encoding.UTF8.GetBytes(senddata);
                        req.ContentLength = data.Length;
                        using (Stream reqStream = req.GetRequestStream())
                        {
                            reqStream.Write(data, 0, data.Length);
                            reqStream.Close();
                        }
                        HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                        Stream stream = resp.GetResponseStream();
                        //获取响应内容
                        using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                        {
                            result = reader.ReadToEnd();
                        }
                        return result;
                        #endregion

                        break;
                    case "file":
                        string filePath = @"D:/测试.prj";
                        string filename = "测试.prj";
                        string fileuploadname = "";
                        string result2 = sendFileToServer(url, filePath, filename, fileuploadname, 40960, 0, "2606", "76");
                        return result2;
                        break;
                    default:
                        return "";
                        break;
                }


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void videotest(string para)
        {
            try
            {
         
                Process process = new Process();

                process.StartInfo.FileName = "C:\\inetpub\\esa\\ffmpeg.cmd";

                process.StartInfo.UseShellExecute = true;
                process.StartInfo.CreateNoWindow = false;//不创建窗口 
                
                                                         //这里相当于传参数 
                process.StartInfo.Arguments = para;
                process.Start();

                //测试同步执行 
                process.WaitForExit();


            }
            catch (Exception ex)
            {
               
            }

        }

        private string sendFileToServer(string url, string filePath, string filename, string fileuploadname, int filestep, int fileoffset, string txzhid, string appid)
        {
            try
            {
                Random random = new Random();

                #region 将文件转成二进制

                FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                byte[] fileContentByte = new byte[fs.Length]; // 二进制文件
                fs.Read(fileContentByte, 0, Convert.ToInt32(fs.Length));
                fs.Close();
                int filesize = fileContentByte.Length;

                #endregion


                string result = "";
                string resultMessage = "";
                while (fileoffset < filesize)
                {
                    if ((filesize - fileoffset) < filestep)
                    {
                        filestep = (filesize - fileoffset);
                    }
                    string fileguid = random.Next(11111, 99999).ToString();
                    string urlString = url;
                    urlString += "&filesize=" + filesize;
                    urlString += "&filename=" + filename;
                    urlString += "&fileuploadname=" + fileuploadname;
                    urlString += "&fileoffset=" + fileoffset;
                    urlString += "&fileguid=" + fileguid;
                    urlString += "&filestep=" + filestep;
                    urlString += "&txzhid=" + txzhid;
                    urlString += "&appid=" + appid;



                    #region post请求
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(urlString);
                    request.Method = "POST";
                    request.ContentType = "application/octet-stream;";
                    using (Stream reqStream = request.GetRequestStream())
                    {
                        reqStream.Write(fileContentByte, fileoffset, filestep);
                        reqStream.Close();
                    }

                    HttpWebResponse resp = (HttpWebResponse)request.GetResponse();
                    Stream stream = resp.GetResponseStream();
                    //获取响应内容
                    using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        result = reader.ReadToEnd();
                        ResultJson dic = Newtonsoft.Json.JsonConvert.DeserializeObject<ResultJson>(result);

                        string guid = dic.message.Split('^')[0];
                        if (guid == fileguid)
                        {
                            if (dic.result == "true")
                            {
                                fileoffset = fileoffset + filestep;
                                fileuploadname = dic.message.Split('^')[1];
                                resultMessage = filename + "^" + fileuploadname;
                            }
                            else
                            {
                                resultMessage = filename + "^" + fileuploadname + "^" + dic.message.Split('^')[1];
                                break;
                            }
                        }

                    }
                    #endregion

                }
                return resultMessage;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// 返回值的实体对象
        /// </summary>
        private class ResultJson
        {
            public string result { get; set; }
            public string message { get; set; }
        }







    }
}









