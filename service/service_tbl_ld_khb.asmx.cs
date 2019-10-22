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
        

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SendMessage(string time,string wherestring,string gridselectids,string sysid)
        {
                
                Dictionary<string, string> resultDic = new Dictionary<string, string>();
                resultDic["result"] = "true";
                resultDic["message"] = "";
            if(onrunsysid == "" ||　onrunsysid == sysid)
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
                        List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList("sys_id in (" + gridselectids.Replace('^', ',') + ")", "", "f_khbh,f_dh,f_yhm,f_ljqf,f_dz", "", "", null);
                        //循环发送信息
                        for (int i = 0; i < khmodellist.Count; i++)
                        {

                            sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[i];
                            //判断客户是否存在电话
                            if (khmodel.f_dh != null && khmodel.f_dh.Length > 10)
                            {
                                Thread.Sleep(10);
                                //存在电话发送短信
                                sara.dd.ldsw.commonclass.duanxinclass.sendDuanxin(khmodel.f_dh,khmodel.f_khbh, khmodel.f_dz, khmodel.f_ljqf);
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
                                sara.dd.ldsw.commonclass.duanxinclass.sendDuanxin(khmodel.f_dh,khmodel.f_khbh, khmodel.f_dz, khmodel.f_ljqf);
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

    }
}









