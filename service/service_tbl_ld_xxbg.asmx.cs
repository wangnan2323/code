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
using System.Data.OleDb;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_xxbg 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_xxbg : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_xxbg _idal_tbl_ld_xxbg = new sara.dd.ldsw.dal.tbl_ld_xxbg();
        private sara.dd.ldsw.idal.Itbl_ld_xxbgnr _idal_tbl_ld_xxbgnr = new sara.dd.ldsw.dal.tbl_ld_xxbgnr();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        private sara.dd.ldsw.reportclass.tbl_ld_xxbg report = new sara.dd.ldsw.reportclass.tbl_ld_xxbg();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_xxbg model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_xxbg>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbg.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_xxbg> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_xxbg>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbg.AddList(modellist, null);

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
            try
            {
                sara.dd.ldsw.idal.Itbl_ld_xxbg idal_tbl_ld_xxbg = new sara.dd.ldsw.dal.tbl_ld_xxbg();
                sara.dd.ldsw.model.tbl_ld_xxbg model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_xxbg>(json);

                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbg.Update(model, columns, null);

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
                List<sara.dd.ldsw.model.tbl_ld_xxbg> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_xxbg>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbg.UpdateList(modellist, columns, null);

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
                string fileIDs = "";
                string columnsString = "";

                columnsString += "f_bgyj,";

                columnsString = columnsString.TrimEnd(',');
                List<sara.dd.ldsw.model.tbl_ld_xxbg> l_tbl_ld_xxbg = _idal_tbl_ld_xxbg.GetList(whereString, "", columnsString, "", "", null);
                foreach (sara.dd.ldsw.model.tbl_ld_xxbg model in l_tbl_ld_xxbg)
                {

                    fileIDs += model.f_bgyj + ",";

                }
                fileIDs = fileIDs.TrimEnd(',');
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);

                //删除子表的方法
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string[] sysid = whereString.Split('\'');
                string sql = "update tbl_ld_khb set f_value1='" + "" + "',f_value2 = '" + "" + "' where f_value2 = '" + sysid[1] + "'";
                _iAccessData.ExecuteSql(sql);
                string sqlString = "";

                sqlString = "delete from tbl_ld_xxbgnr where fk_tbl_ld_xxbg_sys_id in (select sys_id from tbl_ld_xxbg where " + whereString + ")";
                _iAccessData.ExecuteSql(sqlString);


                //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbg.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_xxbg.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
                resultDic["message"] = _idal_tbl_ld_xxbg.GetCount(whereString, null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_xxbg>(_idal_tbl_ld_xxbg.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_xxbg.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        public string GetListForApp(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_xxbg.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_xxbg.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

                columns += "^" + "f_bgmc";

                columns += "^" + "f_bglx";

                columns += "^" + "f_bglxid";

                columns += "^" + "fk_tbl_maintable_sys_id";

                columns += "^" + "f_bgyy";

                columns += "^" + "f_bgyj";

                columns += "^" + "f_fqr";

                columns += "^" + "f_fqrid";

                columns += "^" + "f_fqsj";

                columns += "^" + "f_xgr";

                columns += "^" + "f_xgrid";

                columns += "^" + "f_xgsj";

                columns += "^" + "f_zt";

                columns += "^" + "f_ztid";

                columns += "^" + "f_ly";

                columns += "^" + "f_lyid";

                columns += "^" + "f_bz";

                columns += "^" + "f_xxbg";

                columns += "^" + "f_khxx";
                columns += "^" + "f_khjson";
                columns += "^" + "f_khbh";
                columns += "^" + "f_khbhid";
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
        public string Submit(string json, string columns, string khidString, string sbidString, string yhidString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();
                sara.dd.ldsw.idal.Itbl_ld_xxbg idal_tbl_ld_xxbg = new sara.dd.ldsw.dal.tbl_ld_xxbg();

                sara.dd.ldsw.model.tbl_ld_xxbg model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_xxbg>(json);

                IList<sara.dd.ldsw.model.tbl_ld_xxbgnr> model_xxbgnr_list = _idal_tbl_ld_xxbgnr.GetList(" fk_tbl_ld_xxbg_sys_id='" + model.sys_id.ToString() + "'", "", "*", "", "", _iAccessDataTrans);


                if (khidString != "")
                {
                    #region 更新主表数据
                    columns = FormatColumns(columns).Replace("^", ",");
                    _idal_tbl_ld_xxbg.Update(model, columns, _iAccessDataTrans);
                    #endregion
                    #region 将客户表的value1和value2清空
                    string sql = "update tbl_ld_khb set f_value1='" + "" + "',f_value2 = '" + "" + "' where sys_id = '" + khidString + "'";
                    _iAccessDataTrans.ExecuteSql(sql);
                    #endregion
                    for (int i = 0; i < model_xxbgnr_list.Count; i++)
                    {

                        sara.dd.ldsw.model.tbl_ld_xxbgnr model_xxbgnr = model_xxbgnr_list[i];

                        if (model_xxbgnr.f_bgnr == "用户名")
                        {
                            service_tbl_ldbm_expdata expdate = new service_tbl_ldbm_expdata();
                            expdate.Change(model.f_khbh, model_xxbgnr.f_text_new, "","");
                            string sqlString = model_xxbgnr.f_value10;
                            
                            string[] sqlArray = sqlString.Split('^');
                            for (int ii = 0; ii < sqlArray.Length; ii++)
                            {
                                if (sqlArray[ii] != "")
                                {
                                    _iAccessDataTrans.ExecuteSql(sqlArray[ii]);
                                }
                            }
                        }
                        else if(model_xxbgnr.f_bgnr == "托收银行账号")
                        {
                            service_tbl_ldbm_expdata expdate = new service_tbl_ldbm_expdata();
                            expdate.Change(model.f_khbh, "", model_xxbgnr.f_text_new,"");
                        }
                        else if (model_xxbgnr.f_bgnr == "地址")
                        {
                            service_tbl_ldbm_expdata expdate = new service_tbl_ldbm_expdata();
                            expdate.Change(model.f_khbh, "", "", model_xxbgnr.f_text_new);
                            string sqlString = model_xxbgnr.f_value10;

                            string[] sqlArray = sqlString.Split('^');
                            for (int ii = 0; ii < sqlArray.Length; ii++)
                            {
                                if (sqlArray[ii] != "")
                                {
                                    _iAccessDataTrans.ExecuteSql(sqlArray[ii]);
                                }
                            }
                        }
                        else
                        {
                            string sqlString = model_xxbgnr.f_value10;
                            
                            string[] sqlArray = sqlString.Split('^');
                            for (int ii = 0; ii < sqlArray.Length; ii++)
                            {
                                if (sqlArray[ii] != "")
                                {
                                    _iAccessDataTrans.ExecuteSql(sqlArray[ii]);
                                }
                            }
                        }

                        
                        #region 写日志


                        List<IDictionary<string, string>> array_sb = new List<IDictionary<string, string>>();
                        List<IDictionary<string, string>> array_yh = new List<IDictionary<string, string>>();
                        List<IDictionary<string, string>> array_kh = new List<IDictionary<string, string>>();

                        IDictionary<string, string> temp = null;
                        string bgnr = model_xxbgnr.f_bgnr;
                        string tablename = model_xxbgnr.f_value9;

                        string[] tableName = tablename.Split('^');

                        for (int iii = 0; iii < tableName.Length; iii++)
                        {
                            if (tableName[iii] != "")
                            {
                                switch (tableName[iii])
                                {
                                    case "tbl_ld_sbb":
                                        #region 水表表写日志

                                        if (model_xxbgnr.f_multidropdownlist_new != model_xxbgnr.f_multidropdownlist_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_multidropdownlist_old);
                                            temp.Add("newvalue", model_xxbgnr.f_multidropdownlist_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_sb.Add(temp);
                                        }

                                        if (model_xxbgnr.f_singledropdownlist_new != model_xxbgnr.f_singledropdownlist_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdownlist_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdownlist_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_sb.Add(temp);
                                        }
                                        if (model_xxbgnr.f_textarea_new != model_xxbgnr.f_textarea_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_textarea_old);
                                            temp.Add("newvalue", model_xxbgnr.f_textarea_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_sb.Add(temp);
                                        }
                                        if (model_xxbgnr.f_text_new != model_xxbgnr.f_text_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_text_old);
                                            temp.Add("newvalue", model_xxbgnr.f_text_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_sb.Add(temp);
                                        }
                                        if (model_xxbgnr.f_toggle_new != model_xxbgnr.f_toggle_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_toggle_old);
                                            temp.Add("newvalue", model_xxbgnr.f_toggle_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_sb.Add(temp);

                                        }

                                        if (model_xxbgnr.f_datetime_new != model_xxbgnr.f_datetime_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_datetime_old.ToString("yyyy-MM-dd"));
                                            temp.Add("newvalue", model_xxbgnr.f_datetime_new.ToString("yyyy-MM-dd"));
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_sb.Add(temp);

                                        }
                                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", sbidString, "tbl_ld_sbb_detail", "信息变更内容_水表", array_sb, clientInf, _iAccessDataTrans);


                                        #endregion
                                        break;
                                    case "tbl_ld_khb":
                                        #region 客户表写日志

                                        if (model_xxbgnr.f_multidropdownlist_new != model_xxbgnr.f_multidropdownlist_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_multidropdownlist_old);
                                            temp.Add("newvalue", model_xxbgnr.f_multidropdownlist_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_dy_new != model_xxbgnr.f_singledropdowngroup_dy_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_dy_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_dy_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_sc_new != model_xxbgnr.f_singledropdowngroup_sc_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_sc_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_sc_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_qy_new != model_xxbgnr.f_singledropdowngroup_qy_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_qy_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_qy_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_pq_new != model_xxbgnr.f_singledropdowngroup_pq_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_pq_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_pq_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdownlist_new != model_xxbgnr.f_singledropdownlist_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdownlist_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdownlist_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_textarea_new != model_xxbgnr.f_textarea_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_textarea_old);
                                            temp.Add("newvalue", model_xxbgnr.f_textarea_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_text_new != model_xxbgnr.f_text_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_text_old);
                                            temp.Add("newvalue", model_xxbgnr.f_text_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_toggle_new != model_xxbgnr.f_toggle_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_toggle_old);
                                            temp.Add("newvalue", model_xxbgnr.f_toggle_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);

                                        }

                                        if (model_xxbgnr.f_datetime_new != model_xxbgnr.f_datetime_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_datetime_old.ToString("yyyy-MM-dd"));
                                            temp.Add("newvalue", model_xxbgnr.f_datetime_new.ToString("yyyy-MM-dd"));
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_kh.Add(temp);

                                        }
                                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", khidString, "tbl_ld_khb_detail", "信息变更内容_客户", array_kh, clientInf, _iAccessDataTrans);


                                        #endregion
                                        break;
                                    case "tbl_ld_yhb":
                                        #region 用户表写日志

                                        if (model_xxbgnr.f_multidropdownlist_new != model_xxbgnr.f_multidropdownlist_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_multidropdownlist_old);
                                            temp.Add("newvalue", model_xxbgnr.f_multidropdownlist_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_dy_new != model_xxbgnr.f_singledropdowngroup_dy_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_dy_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_dy_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_sc_new != model_xxbgnr.f_singledropdowngroup_sc_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_sc_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_sc_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_qy_new != model_xxbgnr.f_singledropdowngroup_qy_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_qy_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_qy_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdowngroup_pq_new != model_xxbgnr.f_singledropdowngroup_pq_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdowngroup_pq_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdowngroup_pq_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_singledropdownlist_new != model_xxbgnr.f_singledropdownlist_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_singledropdownlist_old);
                                            temp.Add("newvalue", model_xxbgnr.f_singledropdownlist_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_textarea_new != model_xxbgnr.f_textarea_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_textarea_old);
                                            temp.Add("newvalue", model_xxbgnr.f_textarea_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_text_new != model_xxbgnr.f_text_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_text_old);
                                            temp.Add("newvalue", model_xxbgnr.f_text_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);
                                        }
                                        if (model_xxbgnr.f_toggle_new != model_xxbgnr.f_toggle_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_toggle_old);
                                            temp.Add("newvalue", model_xxbgnr.f_toggle_new);
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);

                                        }

                                        if (model_xxbgnr.f_datetime_new != model_xxbgnr.f_datetime_old)
                                        {
                                            temp = new Dictionary<string, string>();
                                            temp.Add("key", bgnr);
                                            temp.Add("oldvalue", model_xxbgnr.f_datetime_old.ToString("yyyy-MM-dd"));
                                            temp.Add("newvalue", model_xxbgnr.f_datetime_new.ToString("yyyy-MM-dd"));
                                            temp.Add("name", model_xxbgnr.f_bgnr);
                                            array_yh.Add(temp);

                                        }
                                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_yhb", yhidString, "tbl_ld_yhb_detail", "信息变更内容_用户", array_yh, clientInf, _iAccessDataTrans);


                                        #endregion
                                        break;
                                }
                            }
                        }


                        #endregion

                    }

                    _iAccessDataTrans.getTrans().commit();
                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "没有查询到客户信息";
                }
            }
            catch (Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                    _iAccessDataTrans = null;

                }

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void SubmitCross(string json, string columns, string khidString, string sbidString, string yhidString, string clientInf)
        {
            string result1 = this.Submit(json, columns, khidString, sbidString, yhidString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];
            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetKhJsonAndUpdate(string json, string khidString, string clearKhbhString, string czlxString, string czidString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                Dictionary<string, string> khxxJsonDic = new Dictionary<string, string>();
                DataTable dt = new DataTable();

                _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                _iAccessDataTrans.getTrans().begin();

                sara.dd.ldsw.idal.Itbl_ld_xxbg idal_tbl_ld_xxbg = new sara.dd.ldsw.dal.tbl_ld_xxbg();
                sara.dd.ldsw.model.tbl_ld_xxbg model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_xxbg>(json);

                List<DataTable> lt = new List<DataTable>();
                lt = sara.dd.ldsw.commonclass.commonclass.GetKhxxJsonAndSetCzlx(khidString, czlxString, czidString, _iAccessDataTrans);

                DataTable khxx = lt[0];
                DataTable yhxx = lt[1];
                DataTable sbxx = lt[2];

                if (khxx.Rows.Count > 0)
                {

                }
                DataRow dr = khxx.Rows[0];//这是拿到第一行数据
                string khbh = dr["f_khbh"].ToString();
                string khbhid = dr["sys_id"].ToString();
                string yhm = dr["f_yhm"].ToString();
                string dz = dr["f_dz"].ToString();
                string sbdz = dr["f_sbdz"].ToString();
                string khxx_yhm_dz = yhm + "," + dz + "," + sbdz;
                khxxJsonDic["khxx"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(khxx); ;
                khxxJsonDic["yhxx"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(yhxx);
                khxxJsonDic["sbxx"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(sbxx);
                string khxxJson = Eva.Library.Format.FormatEntityTool.FormatDicToJson(khxxJsonDic);


                //2.取出用户民、地址 逗号分隔，放到数据库f_khxx

                //3.更新f_khbh,f_khbhid
                model.f_khbh = khbh;
                model.f_khbhid = khbhid;
                model.f_khxx = khxx_yhm_dz;
                model.f_khjson = khxxJson;

                //4.clearKhbhString不等于json中的客户编号  那么清空上一个客户编号的f_value1和f_value2 
                #region clearCzlx
                if (clearKhbhString != khbh)
                {
                    string sql = "update tbl_ld_khb set f_value1='" + "" + "',f_value2 = '" + "" + "' where f_khbh = '" + clearKhbhString + "'";
                    _iAccessDataTrans.ExecuteSql(sql);

                }
                #endregion

                idal_tbl_ld_xxbg.Update(model, "f_khjson,f_khxx,f_khbh,f_khbhid", _iAccessDataTrans);

                _iAccessDataTrans.getTrans().commit();

                resultDic["result"] = "true";
                resultDic["message"] = khxxJson;

            }
            catch (Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                    _iAccessDataTrans = null;
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetKhJsonAndUpdateCross(string json, string khidString, string clearKhbhString, string clearCzlx, string czidString, string clientInf)
        {
            string result1 = this.GetKhJsonAndUpdate(json, clearCzlx, khidString, clearKhbhString, czidString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        //导出数据
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

                DataTable dt = _idal_tbl_ld_xxbg.GetDataTableForPC(whereString, orderByString, column, "", "", null);
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
    }
}









