﻿//------------------------------------------------------------------------------
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
    /// Service_tbl_ld_xxbgnr 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_xxbgnr : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_xxbgnr _idal_tbl_ld_xxbgnr = new sara.dd.ldsw.dal.tbl_ld_xxbgnr();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        private sara.dd.ldsw.reportclass.tbl_ldbm_expdata report = new sara.dd.ldsw.reportclass.tbl_ldbm_expdata();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_xxbgnr model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_xxbgnr>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbgnr.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_xxbgnr> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_xxbgnr>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbgnr.AddList(modellist,null);

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
                sara.dd.ldsw.model.tbl_ld_xxbgnr model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_xxbgnr>(json);
                
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_xxbgnr.Update(model, columns, null);

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
                 List<sara.dd.ldsw.model.tbl_ld_xxbgnr> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_xxbgnr>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_xxbgnr.UpdateList(modellist, columns,null);

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
                resultDic["message"] = _idal_tbl_ld_xxbgnr.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_xxbgnr.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_xxbgnr.GetCount(whereString,null);

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

                List<sara.dd.ldsw.model.tbl_ld_xxbgnr> modellist = _idal_tbl_ld_xxbgnr.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null);
                columnsString = columnsString.Replace("(SELECT f_khbh from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value1", "f_value1");
                columnsString = columnsString.Replace("(SELECT f_khxx from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value2", "f_value2");

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_xxbgnr>(modellist, columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_xxbgnr.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_xxbgnr.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_xxbgnr.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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


        //导出数据
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string whereString, string column, string orderByString, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_cbiao";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_xxbgnr.GetDataTableForPC(whereString, orderByString, column, "", "", null);
                column = column.Replace("(SELECT f_khbh from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value1", "f_value1");
                column = column.Replace("(SELECT f_khxx from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value2", "f_value2");

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
                		
				columns += "^" + "fk_tbl_ld_xxbg_sys_id";
                		
				columns += "^" + "f_bgnr";
                		
				columns += "^" + "f_bgnrid";
                		
				columns += "^" + "f_singledropdowngroup_dy_old";
                		
				columns += "^" + "f_singledropdowngroup_dy_oldid";
                		
				columns += "^" + "f_singledropdowngroup_sc_old";
                		
				columns += "^" + "f_singledropdowngroup_sc_oldid";
                		
				columns += "^" + "f_singledropdowngroup_qy_old";
                		
				columns += "^" + "f_singledropdowngroup_qy_oldid";
                		
				columns += "^" + "f_singledropdowngroup_pq_old";
                		
				columns += "^" + "f_singledropdowngroup_pq_oldid";
                		
				columns += "^" + "f_singledropdowngroup_dy_new";
                		
				columns += "^" + "f_singledropdowngroup_dy_newid";
                		
				columns += "^" + "f_singledropdowngroup_sc_new";
                		
				columns += "^" + "f_singledropdowngroup_sc_newid";
                		
				columns += "^" + "f_singledropdowngroup_qy_new";
                		
				columns += "^" + "f_singledropdowngroup_qy_newid";
                		
				columns += "^" + "f_singledropdowngroup_pq_new";
                		
				columns += "^" + "f_singledropdowngroup_pq_newid";
                		
				columns += "^" + "f_text_old";
                		
				columns += "^" + "f_text_new";
                		
				columns += "^" + "f_singledropdownlist_old";
                		
				columns += "^" + "f_singledropdownlist_oldid";
                		
				columns += "^" + "f_singledropdownlist_new";
                		
				columns += "^" + "f_singledropdownlist_newid";
                		
				columns += "^" + "f_multidropdownlist_old";
                		
				columns += "^" + "f_multidropdownlist_oldid";
                		
				columns += "^" + "f_multidropdownlist_new";
                		
				columns += "^" + "f_multidropdownlist_newid";
                		
				columns += "^" + "f_datetime_old";
                		
				columns += "^" + "f_datetime_new";
                		
				columns += "^" + "f_datetimetime_old";
                		
				columns += "^" + "f_datetimetime_new";
                		
				columns += "^" + "f_toggle_old";
                		
				columns += "^" + "f_toggle_new";
                		
				columns += "^" + "f_textarea_old";
                		
				columns += "^" + "f_textarea_new";
                
               
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
     }
}









