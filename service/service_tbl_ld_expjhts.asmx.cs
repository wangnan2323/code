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

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_expjhts 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_expjhts : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_expjhts _idal_tbl_ld_expjhts = new sara.dd.ldsw.dal.tbl_ld_expjhts();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_expjhts model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_expjhts>(json);
                model.f_dcpcmc = Eva.Library.Text.NumberTool.GetNoRepeatNumber();
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate= DateTime.Now;
                model.f_dcsj = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_expjhts.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_expjhts> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_expjhts>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_expjhts.AddList(modellist,null);

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
                sara.dd.ldsw.model.tbl_ld_expjhts model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_expjhts>(json);
                model.sys_lasteditdate = DateTime.Now;
                
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_expjhts.Update(model, columns, null);

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
                 List<sara.dd.ldsw.model.tbl_ld_expjhts> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_expjhts>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_expjhts.UpdateList(modellist, columns,null);

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
                resultDic["message"] = _idal_tbl_ld_expjhts.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_expjhts.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_expjhts.GetCount(whereString,null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_expjhts>(_idal_tbl_ld_expjhts.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_expjhts.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_expjhts.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_expjhts.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
                		
				columns += "^" + "f_dcsj";
                		
				columns += "^" + "f_dcr";
                		
				columns += "^" + "f_dcrid";
                		
				columns += "^" + "f_dcpcmc";
				columns += "^" + "f_zt";
				columns += "^" + "f_ztid";
				columns += "^" + "f_bz";
                
               
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

        //导出
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string sys_id,string json,string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            string sql = "";
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string userid = clientInfoDic["userid"];
                string username = clientInfoDic["username"];

                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                //缴费表
                sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
                DataTable dt = idal_tbl_ld_jfb.GetDataTableForPC(" f_lyid = '08080002' and f_ztid='0'", "false", "", "*", "", "", t);
                if (dt.Rows.Count== 0) {
                    #region
                //抄表表
                sara.dd.ldsw.idal.Itbl_ld_cbiao idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
                //客户表
                sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                IList< sara.dd.ldsw.model.tbl_ld_expjhts> ml = _idal_tbl_ld_expjhts.GetList("sys_id = '" + sys_id + "'", "", "*", "", "", t);
                if (ml.Count > 0)
                {
                    string jfb_sys_ids = "";
                    string expTxtString = "";
                    sara.dd.ldsw.model.tbl_ld_expjhts model = ml[0];

                    //查询出所有的模板
                    sql = "select * from tbl_ldbm_expdata where f_lxid = '08060002' order by sys_id asc";
                    DataTable ds = t.Query(sql).Tables[0];
                    int exptextrowindex = 1;
                        for (int i = 0; i < ds.Rows.Count; i++)
                        {
                            double hjsf = 0.0;//当前名称下的合计欠费金额
                            string khbhids = ds.Rows[i]["f_khbhid"].ToString();

                            DataTable dt_tbl_ld_khb = t.Query("select f_waterrent(t.f_khbhid,t.f_bqsl,'1') as sfjl,t.* from tbl_ld_cbiao t where f_khbhid in ('" + khbhids.Replace(",", "','") + "') and sys_delflag='0' and f_ztid='2' and f_jfbhid is null ").Tables[0];
                            if (khbhids != "")
                            {

                                #region 创建缴费记录
                                string[] khbhidsarr = khbhids.Split(',');//按‘,’拆分
                                for (int k = 0; k < khbhidsarr.Length; k++)
                                {
                                    //获取客户model 
                                    IList<sara.dd.ldsw.model.tbl_ld_khb> model_tbl_ld_khb_list = idal_tbl_ld_khb.GetList("sys_id = '" + khbhidsarr[k] + "'", "", "*", "", "", t);
                                    if (model_tbl_ld_khb_list.Count > 0)
                                    {
                                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = model_tbl_ld_khb_list[0];
                                        //string whereString = "";
                                        //whereString += " f_khbhid='" + khbhidsarr[k] + "'";
                                        //whereString += " and sys_delflag='0'";
                                        //whereString += " and f_ztid='2'";
                                        //whereString += " and f_jfbhid is null ";

                                        //IList<sara.dd.ldsw.model.tbl_ld_cbiao> model_tbl_ld_cbiao_list = idal_tbl_ld_cbiao.GetList(whereString, "", "*", "", "", t);
                                        DataRow[] drs_tbl_ld_khb = dt_tbl_ld_khb.Select(" f_khbhid='" + khbhidsarr[k] + "'");
                                        if (drs_tbl_ld_khb.Length > 0)
                                        {
                                            sara.dd.ldsw.model.tbl_ld_jfb model_tbl_ld_jfb = new sara.dd.ldsw.model.tbl_ld_jfb();
                                            #region 填充缴费表

                                            //缴费表model


                                            model_tbl_ld_jfb.sys_id = 0;

                                            model_tbl_ld_jfb.sys_orderid = "";

                                            model_tbl_ld_jfb.sys_creatuserid = userid;

                                            model_tbl_ld_jfb.sys_creatusername = username;

                                            model_tbl_ld_jfb.sys_creatdate = DateTime.Now;

                                            model_tbl_ld_jfb.sys_lastedituserid = userid;

                                            model_tbl_ld_jfb.sys_lasteditusername = username;

                                            model_tbl_ld_jfb.sys_lasteditdate = DateTime.Now;

                                            model_tbl_ld_jfb.sys_deluserid = "";

                                            model_tbl_ld_jfb.sys_delusername = "";

                                            model_tbl_ld_jfb.sys_deldate = DateTime.Parse("1900-1-1");

                                            model_tbl_ld_jfb.sys_delflag = "0";

                                            model_tbl_ld_jfb.f_value1 = "";

                                            model_tbl_ld_jfb.f_value2 = "";

                                            model_tbl_ld_jfb.f_value3 = "";

                                            model_tbl_ld_jfb.f_value4 = "";

                                            model_tbl_ld_jfb.f_value5 = "";

                                            model_tbl_ld_jfb.f_value6 = "";

                                            model_tbl_ld_jfb.f_value7 = "";

                                            model_tbl_ld_jfb.f_value8 = "";

                                            model_tbl_ld_jfb.f_value9 = "";

                                            model_tbl_ld_jfb.f_value10 = "";

                                            model_tbl_ld_jfb.f_jfbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "", t);

                                            model_tbl_ld_jfb.f_sjbh = "";

                                            model_tbl_ld_jfb.f_jfrq = DateTime.Now;

                                            model_tbl_ld_jfb.f_jffs = "建行托收";//

                                            model_tbl_ld_jfb.f_jffsid = "05740006";//

                                            model_tbl_ld_jfb.f_jcfs = "全额找零";

                                            model_tbl_ld_jfb.f_jcfsid = "05750001";

                                            model_tbl_ld_jfb.f_yyy = username;

                                            model_tbl_ld_jfb.f_yyyid = userid;

                                            model_tbl_ld_jfb.f_czsj = System.DateTime.Now;

                                            model_tbl_ld_jfb.f_sfykfp = "false";

                                            model_tbl_ld_jfb.f_zt = "新建";

                                            model_tbl_ld_jfb.f_ztid = "0";

                                            model_tbl_ld_jfb.f_bz = "";

                                            model_tbl_ld_jfb.f_khbh = model_tbl_ld_khb.f_khbh;

                                            model_tbl_ld_jfb.f_khbhid = model_tbl_ld_khb.sys_id.ToString();

                                            model_tbl_ld_jfb.f_yhbh = model_tbl_ld_khb.f_yhbh;

                                            model_tbl_ld_jfb.f_yhbhid = model_tbl_ld_khb.f_yhbhid;

                                            model_tbl_ld_jfb.f_yhm = model_tbl_ld_khb.f_yhm;

                                            model_tbl_ld_jfb.f_jfm = model_tbl_ld_khb.f_jfm;

                                            model_tbl_ld_jfb.f_dz = model_tbl_ld_khb.f_dz;

                                            model_tbl_ld_jfb.f_dh = model_tbl_ld_khb.f_dh;

                                            model_tbl_ld_jfb.f_dy = model_tbl_ld_khb.f_dy;

                                            model_tbl_ld_jfb.f_dyid = model_tbl_ld_khb.f_dyid;

                                            model_tbl_ld_jfb.f_sc = model_tbl_ld_khb.f_sc;

                                            model_tbl_ld_jfb.f_scid = model_tbl_ld_khb.f_scid;

                                            model_tbl_ld_jfb.f_qy = model_tbl_ld_khb.f_qy;

                                            model_tbl_ld_jfb.f_qyid = model_tbl_ld_khb.f_qyid;

                                            model_tbl_ld_jfb.f_pq = model_tbl_ld_khb.f_pq;

                                            model_tbl_ld_jfb.f_pqid = model_tbl_ld_khb.f_pqid;

                                            model_tbl_ld_jfb.f_sbbh = model_tbl_ld_khb.f_sbbh;

                                            model_tbl_ld_jfb.f_sbbhid = model_tbl_ld_khb.f_sbbhid;

                                            model_tbl_ld_jfb.f_yslx = model_tbl_ld_khb.f_yslx;

                                            model_tbl_ld_jfb.f_yslxid = model_tbl_ld_khb.f_yslxid;
                                            model_tbl_ld_jfb.f_lxtkhh = model_tbl_ld_khb.f_lxth;

                                            model_tbl_ld_jfb.f_sblx = model_tbl_ld_khb.f_sblx;

                                            model_tbl_ld_jfb.f_sblxid = model_tbl_ld_khb.f_sblxid;

                                            model_tbl_ld_jfb.f_rs = model_tbl_ld_khb.f_rs;
                                            model_tbl_ld_jfb.f_cbenbh = model_tbl_ld_khb.f_cbbh;
                                            model_tbl_ld_jfb.f_cbenbhid = model_tbl_ld_khb.f_cbbhid;

                                            model_tbl_ld_jfb.f_znjbh = "";
                                            model_tbl_ld_jfb.f_znjbhid = "";
                                            model_tbl_ld_jfb.f_znjje = "";
                                            model_tbl_ld_jfb.f_fjbh = "";
                                            model_tbl_ld_jfb.f_fjbhid = "";
                                            model_tbl_ld_jfb.f_fjje = "";

                                            model_tbl_ld_jfb.f_khytjjzsf = model_tbl_ld_khb.f_tjjzsf;
                                            model_tbl_ld_jfb.f_khytjjzpwf = model_tbl_ld_khb.f_tjjzpwf;
                                            model_tbl_ld_jfb.f_khyye = model_tbl_ld_khb.f_ycje;

                                            model_tbl_ld_jfb.f_khfz = model_tbl_ld_khb.f_khfz;
                                            model_tbl_ld_jfb.f_khfzid = model_tbl_ld_khb.f_khfzid;

                                            model_tbl_ld_jfb.f_ljqf = model_tbl_ld_khb.f_ljqf;
                                            model_tbl_ld_jfb.f_ly = "建行托收";
                                            model_tbl_ld_jfb.f_lyid = "08080002";

                                            model_tbl_ld_jfb.f_kplb = "";
                                            model_tbl_ld_jfb.f_kplbid = "";


                                            #endregion
                                            model_tbl_ld_jfb.f_yyt = "";//？？？？
                                            model_tbl_ld_jfb.f_yytid = "";//？？？？

                                            #region 计算钱数
                                            double ysfy = 0;//应收多少钱
                                                            //绿化表押金
                                            double ycje = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ycje);
                                            //原调价结转
                                            double tjjzYsf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_jfb.f_khytjjzsf);
                                            double tjjzYpwf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_jfb.f_khytjjzpwf);

                                            string cbbhids = "";
                                            string cbbhs = "";
                                            double sllj = 0;
                                            double sflj = 0;
                                            double pwflj = 0;
                                            double cbyslj = 0;//抄表应收累积
                                            double jmjelj = 0;//减免金额
                                            string sfjl = "";//算法记录
                                            for (int ii = 0; ii < drs_tbl_ld_khb.Length; ii++)
                                            {
                                                //sara.dd.ldsw.model.tbl_ld_cbiao model_tbl_ld_cbiao = model_tbl_ld_cbiao_list[ii];
                                                cbbhs += drs_tbl_ld_khb[ii]["f_cb_cbbh"].ToString() + ",";
                                                cbbhids += drs_tbl_ld_khb[ii]["sys_id"].ToString() + ",";

                                                sllj += Eva.Library.Text.NumberTool.Parse(drs_tbl_ld_khb[ii]["f_bqsl"].ToString());
                                                sflj += Eva.Library.Text.NumberTool.Parse(drs_tbl_ld_khb[ii]["f_sf"].ToString());
                                                pwflj += Eva.Library.Text.NumberTool.Parse(drs_tbl_ld_khb[ii]["f_pwf"].ToString());
                                                cbyslj += Eva.Library.Text.NumberTool.Parse(drs_tbl_ld_khb[ii]["f_bqje"].ToString());
                                                jmjelj += Eva.Library.Text.NumberTool.Parse(drs_tbl_ld_khb[ii]["f_jmje"].ToString());
                                                int index = drs_tbl_ld_khb[ii]["sfjl"].ToString().IndexOf("|");
                                                string f_sfjl = drs_tbl_ld_khb[ii]["sfjl"].ToString().Substring(index + 1);
                                                t.ExecuteSql("update tbl_ld_cbiao set f_sfjl='" + f_sfjl + "' where sys_id='" + drs_tbl_ld_khb[ii]["sys_id"].ToString() + "'");
                                                sfjl += f_sfjl + "|";
                                            }
                                            cbbhs = cbbhs.TrimEnd(',');
                                            cbbhids = cbbhids.TrimEnd(',');


                                            model_tbl_ld_jfb.f_sllj = Eva.Library.Text.NumberTool.GetNumberByLength(sllj, 2);
                                            model_tbl_ld_jfb.f_sflj = Eva.Library.Text.NumberTool.GetNumberByLength(sflj, 2);
                                            model_tbl_ld_jfb.f_pwflj = Eva.Library.Text.NumberTool.GetNumberByLength(pwflj, 2);
                                            model_tbl_ld_jfb.f_cbyslj = Eva.Library.Text.NumberTool.GetNumberByLength(cbyslj, 2);
                                            model_tbl_ld_jfb.f_dj = Eva.Library.Text.NumberTool.GetNumberByLength(cbyslj / sllj, 2);

                                            model_tbl_ld_jfb.f_sfjl = sfjl.TrimEnd('|');
                                            ysfy = cbyslj;//记录应收多少钱



                                            if (jmjelj > 0)//如果有减免，则不使用调价结转
                                            {
                                                model_tbl_ld_jfb.f_jmjelj = Eva.Library.Text.NumberTool.GetNumberByLength(jmjelj, 2);
                                                model_tbl_ld_jfb.f_jmhyslj = Eva.Library.Text.NumberTool.GetNumberByLength(cbyslj - jmjelj, 2);

                                                ysfy = cbyslj - jmjelj;//记录应收多少钱

                                                model_tbl_ld_jfb.f_sfsytjjz = "false";
                                                model_tbl_ld_jfb.f_sytjjzsf = "0";
                                                model_tbl_ld_jfb.f_sytjjzpwf = "0";
                                                model_tbl_ld_jfb.f_syhtjjzsf = "0";
                                                model_tbl_ld_jfb.f_syhtjjzpwf = "0";
                                            }
                                            else if (tjjzYsf > 0 && tjjzYpwf > 0)
                                            {
                                                model_tbl_ld_jfb.f_jmjelj = "0";
                                                model_tbl_ld_jfb.f_jmhyslj = "0";

                                                model_tbl_ld_jfb.f_sfsytjjz = "true";

                                                //计算水费
                                                double sysf = 0;
                                                double syhsf = 0;


                                                if (tjjzYsf >= sflj)
                                                {
                                                    sysf = sflj;
                                                    syhsf = tjjzYsf - sflj;
                                                }
                                                else
                                                {
                                                    sysf = tjjzYsf;
                                                    syhsf = 0;
                                                }

                                                //计算排污费
                                                double sypwf = 0;
                                                double syhpwf = 0;


                                                if (tjjzYpwf >= pwflj)
                                                {
                                                    sypwf = pwflj;
                                                    syhpwf = tjjzYpwf - pwflj;
                                                }
                                                else
                                                {
                                                    sypwf = tjjzYpwf;
                                                    syhpwf = 0;
                                                }


                                                model_tbl_ld_jfb.f_sytjjzsf = Eva.Library.Text.NumberTool.GetNumberByLength(sysf, 2);
                                                model_tbl_ld_jfb.f_sytjjzpwf = Eva.Library.Text.NumberTool.GetNumberByLength(sypwf, 2);
                                                model_tbl_ld_jfb.f_syhtjjzsf = Eva.Library.Text.NumberTool.GetNumberByLength(syhsf, 2);
                                                model_tbl_ld_jfb.f_syhtjjzpwf = Eva.Library.Text.NumberTool.GetNumberByLength(syhpwf, 2);


                                                ysfy = ysfy - sysf - sypwf;//记录应收多少钱
                                            }
                                            else
                                            {
                                                model_tbl_ld_jfb.f_jmjelj = "0";
                                                model_tbl_ld_jfb.f_jmhyslj = "0";
                                                model_tbl_ld_jfb.f_sfsytjjz = "false";
                                                model_tbl_ld_jfb.f_sytjjzsf = "0";
                                                model_tbl_ld_jfb.f_sytjjzpwf = "0";
                                                model_tbl_ld_jfb.f_syhtjjzsf = "0";
                                                model_tbl_ld_jfb.f_syhtjjzpwf = "0";
                                            }

                                            if (ysfy > 0 && ycje > 0)
                                            {
                                                model_tbl_ld_jfb.f_sfsyye = "true";

                                                double syye = 0;
                                                double syhye = 0;

                                                if (ycje >= ysfy)
                                                {
                                                    syye = ysfy;
                                                    syhye = syye - ysfy;
                                                }
                                                else
                                                {
                                                    syye = ycje;
                                                    syhye = 0;
                                                }

                                                model_tbl_ld_jfb.f_syye = Eva.Library.Text.NumberTool.GetNumberByLength(syye, 2);
                                                model_tbl_ld_jfb.f_yhye = Eva.Library.Text.NumberTool.GetNumberByLength(syhye, 2);

                                                ysfy = ysfy - syye;

                                            }
                                            else
                                            {
                                                model_tbl_ld_jfb.f_sfsyye = "false";
                                                model_tbl_ld_jfb.f_syye = "0";
                                                model_tbl_ld_jfb.f_yhye = "0";
                                            }



                                            model_tbl_ld_jfb.f_shys = Eva.Library.Text.NumberTool.GetNumberByLength(ysfy, 2);
                                            model_tbl_ld_jfb.f_shss = model_tbl_ld_jfb.f_shys;
                                            model_tbl_ld_jfb.f_hszl = "0";
                                            model_tbl_ld_jfb.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String(ysfy);

                                            hjsf += ysfy;//计算应收水费
                                            #endregion

                                            model_tbl_ld_jfb.f_cbbh = cbbhs;
                                            model_tbl_ld_jfb.f_cbbhid = cbbhids;

                                            string jfb_sys_id = idal_tbl_ld_jfb.Add(model_tbl_ld_jfb, t);

                                            jfb_sys_ids += jfb_sys_id + ",";
                                            sql = " update tbl_ld_cbiao set f_jfbh = '" + model_tbl_ld_jfb.f_jfbh + "' , f_jfbhid ='" + jfb_sys_id + "',  f_jfsj = to_date('" + model_tbl_ld_jfb.f_jfrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')  where sys_id in ('" + cbbhids.Replace(",", "','") + "')";
                                            t.ExecuteSql(sql);

                                        }
                                        else
                                        {
                                            //如果客户没有抄表记录，则不塞入数据
                                        }
                                    }
                                    else
                                    {
                                        //如果khbhid没有查询到客户，则不进行塞入数据
                                    }
                                }




                                #endregion

                            }
                            #region 生成导出内容

                            string v_nr = ds.Rows[i]["f_nr"].ToString();//获取f_nr的值
                            string[] v_nrarr = v_nr.Split('|');//按‘|’拆分

                            //生成nr的新值
                            string v_nr_new = "";

                            if (hjsf > 0)
                            {
                                for (int j = 0; j < v_nrarr.Length; j++)
                                {
                                    if (j == 0)
                                    {
                                        v_nr_new += (exptextrowindex).ToString() + "|";
                                        exptextrowindex += 1;
                                    }
                                    else if (j == 6)
                                    {
                                        string sf = Eva.Library.Text.NumberTool.GetNumberByLength(hjsf, 2);
                                        if(sf.IndexOf(".") == -1)
                                        {
                                            sf += ".00";
                                        }

                                        v_nr_new += sf + "|";
                                    }
                                    else
                                    {
                                        v_nr_new += v_nrarr[j] + "|";
                                    }
                                }
                                //v_nr_new = v_nr_new.TrimEnd('|');
                                v_nr_new = v_nr_new.Substring(0, v_nr_new.Length - 1);

                                if (i == ds.Rows.Count - 1)
                                {
                                    expTxtString += v_nr_new;
                                }
                                else
                                {
                                    expTxtString += v_nr_new + "\r\n";
                                }
                            }
                            else
                            {
                            }
                            #endregion

                        }


                    jfb_sys_ids = jfb_sys_ids.TrimEnd(',');

                    sql = "update tbl_ld_expjhts set f_value1 = '" + jfb_sys_ids + "' ";
                    string resultMessage = "";
                    if (jfb_sys_ids != "")
                    {
                        resultMessage = "生成" + jfb_sys_ids.Split(',').Length.ToString() + "条缴费记录";
                    }
                    else
                    {
                        resultMessage = "生成0条缴费记录";
                    }

                    sql += ",f_bz = '" + resultMessage + "'";
                        sql += ",f_zt = '已导出'";
                        sql += ",f_ztid = '1'";

                    sql += " where sys_id ='" + sys_id + "' ";
                    t.ExecuteSql(sql);

                    t.getTrans().commit();

                    //导出文件
                    expTxtString = "00201|\r\n" + expTxtString;
                    string path = Eva.Library.Configuration.ConfigurationManager.AppSettings["ExportJHTSRootPath"];
                    string name = model.f_dcpcmc + ".txt";
                    string downloadPath = Eva.Library.Format.FormatTextTool.GetMapPath((path + name), HttpContext.Current.Server);
                    sara.dd.ldsw.commonclass.FileOperation.writeFile(downloadPath, expTxtString);

                    //返回文件名
                    resultDic["result"] = "true";
                    resultDic["message"] = resultMessage;
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "传入的sys_id没有查询到数据";
                }
                    #endregion
                }else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "存在未处理的建行托收数据，请先完成处理操作，再执行本导出操作";
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
        public void ExportCross(string sys_id, string json, string clientInf)
        {
            string result1 = this.Export(sys_id, json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBack(string sys_id, string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            string sql = "";

            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string userid = clientInfoDic["userid"];
                string username = clientInfoDic["username"];

                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                IList<sara.dd.ldsw.model.tbl_ld_expjhts> ml = _idal_tbl_ld_expjhts.GetList("sys_id = '" + sys_id + "'", "", "*", "", "", t);
                if (ml.Count > 0)
                {
                    sara.dd.ldsw.model.tbl_ld_expjhts model = ml[0];
                    if (model.f_value1 !="")
                    {
                        //验证缴费ID只能是新建状态，否则不能回滚
                        sql = "select count(*) from tbl_ld_jfb where sys_id in ('" + model.f_value1.Replace(",", "','") + "') and f_ztid != '0'";
                        if (t.GetSingle(sql).ToString() == "0")
                        {
                            //循环缴费ID，更新抄表记录的状态
                            string[] strs = model.f_value1.Split(',');
                            for (int i = 0; i < strs.Length; i++)
                            {
                                string jfb_sys_id = strs[i];
                                sql = " update tbl_ld_cbiao set f_sfjl='',f_jfbh = '' , f_jfbhid ='',  f_jfsj = to_date('1900-01-01 00:00:00','yyyy-MM-dd hh24:mi:ss')  where f_jfbhid = '" + jfb_sys_id + "'";
                                t.ExecuteSql(sql);

                                //删除缴费ID
                                sql = "delete from tbl_ld_jfb where sys_id = '" + jfb_sys_id + "'";
                                t.ExecuteSql(sql);

                            }
                            //清空f_value1--jfb_sys_ids
                            sql = "update tbl_ld_expjhts set f_value1 = '',f_bz = '' where sys_id ='" + sys_id + "' ";
                            t.ExecuteSql(sql);

                            resultDic["message"] = "";
                            resultDic["result"] = "true";
                        }
                        else
                        {
                            sql = "update tbl_ld_expjhts set f_ztid = '1',f_zt = '已导出' where sys_id ='" + sys_id + "' ";
                            t.ExecuteSql(sql);

                            resultDic["result"] = "false";
                            resultDic["message"] = "存在已经缴费的缴费记录，不能回滚本数据";

                        }
                    }
                    else
                    {
                        resultDic["message"] = "";
                        resultDic["result"] = "true";
                    }
                   

                }
                else
                {
                    sql = "update tbl_ld_expjhts set f_ztid = '1',f_zt = '已导出' where sys_id ='" + sys_id + "' ";
                    t.ExecuteSql(sql);

                    resultDic["result"] = "false";
                    resultDic["message"] = "传入的sys_id没有查询到数据";
                }

                sara.dd.ldsw.model.tbl_ld_expjhts model1 = ml[0];
                #region 建行托收回滚写日志
                List<IDictionary<string, string>> arr = new List<IDictionary<string, string>>();
                IDictionary<string, string> temp = new Dictionary<string, string>();
                temp.Add("key", "rollback");
                temp.Add("oldvalue", "导出人：" + model1.f_dcr+ " 导出批次名称：" + model1.f_dcpcmc);
                temp.Add("newvalue", "");
                temp.Add("name", "导出建行托收回滚");
                arr.Add(temp);
                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_expjhts", model1.sys_id.ToString(), "tbl_ld_expjhts_detail", "导出建行托收回滚", arr, clientInf, t);
                #endregion
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


            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void RollBackCross(string sys_id, string json, string clientInf)
        {
            string result1 = this.RollBack(sys_id, json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }


    }
}









