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
using System.Web.Script.Serialization;

using System.IO;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Threading;


namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_app_pushnotification 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_app_pushnotification : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_app_pushnotification _idal_tbl_app_pushnotification = new sara.dd.ldsw.dal.tbl_app_pushnotification();

        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_app_pushnotification model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_app_pushnotification>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.Add(model, null);

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
        public string AddList(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = commonclass.commonclass.CreateIAccessData();
            try
            {
                //从t_user表读取f_value6(设备类型)，f_value7(推送证书)，f_value8(设备ID)
                List<sara.dd.ldsw.model.tbl_app_pushnotification> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_app_pushnotification>(json);

                string useridString = "";
                for (int i = 0; i < modellist.Count; i++)
                {
                    useridString += modellist[i].f_recive_userid + ",";
                }
                string sqlString = "select u_id,u_name,f_value6,f_value7,f_value8 from t_user where u_state = '1' and u_id in ('" + useridString.TrimEnd(',').Replace(",", "','") + "')";
                DataTable dt = _iAccessData.Query(sqlString).Tables[0];
                DataRow[] dr = null;
                for (int i = 0; i < modellist.Count; i++)
                {
                    dr = dt.Select("u_id = '" + modellist[i].f_recive_userid + "'");
                    if (dr.Length > 0)
                    {
                        modellist[i].f_recive_devicetype = dr[0]["f_value6"].ToString();
                        modellist[i].f_recive_devicetypeid = dr[0]["f_value6"].ToString();
                        modellist[i].f_recive_deviceid = dr[0]["f_value8"].ToString();
                        //modellist[i].f_recive_certificate = dr[0]["f_value7"].ToString();
                    }
                }
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.AddList(modellist, null);

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
        public string Update(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_app_pushnotification model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_app_pushnotification>(json);

                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.Update(model, columns, null);

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
        public string UpdateList(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                List<sara.dd.ldsw.model.tbl_app_pushnotification> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_app_pushnotification>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.UpdateList(modellist, columns, null);

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
        public string Delete(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.Delete(whereString, null);

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
        public string LogicDelete(string delUserId, string delUserName, string delDate, string whereString, string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
        public string GetCount(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_app_pushnotification.GetCount(whereString, null);

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
        public string GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_app_pushnotification>(_idal_tbl_app_pushnotification.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_app_pushnotification.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

                columns += "^" + "f_title";

                columns += "^" + "f_content";

                columns += "^" + "f_send_username";

                columns += "^" + "f_send_userid";

                columns += "^" + "f_send_datetime";

                columns += "^" + "f_recive_username";

                columns += "^" + "f_recive_userid";

                columns += "^" + "f_recive_deviceid";

                columns += "^" + "f_recive_devicetype";

                columns += "^" + "f_recive_devicetypeid";

                columns += "^" + "f_recive_certificate";

                columns += "^" + "f_businesstablename";

                columns += "^" + "f_businesstablekeyname";

                columns += "^" + "f_businesstablekeyvalue";

                columns += "^" + "f_status";

                columns += "^" + "f_statusid";


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
        public string SendNotification(string sendIds, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = commonclass.commonclass.CreateIAccessData();
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = "";

                //接入消息发送代码。。。。。。

                string sqlString = "";

                sqlString += " select sys_id,";
                sqlString += " (select count(*)+" + sendIds.Split('^').Length.ToString() + " from tbl_app_pushnotification where f_recive_userid = a.f_recive_userid and f_statusid in ('1')) as f_badge,";
                sqlString += " f_title,";
                sqlString += " f_content,";
                sqlString += " f_recive_devicetype,";
                sqlString += " f_recive_deviceid,";
                sqlString += " f_recive_userid,";
                //sqlString += " f_recive_certificate,";
                sqlString += " f_businesstablename,";
                sqlString += " f_businesstablekeyname,";
                sqlString += " f_businesstablekeyvalue";
                sqlString += " from tbl_app_pushnotification a where a.f_statusid = '0'";
                sqlString += " and sys_id in ('" + sendIds.Replace("^", "','") + "')";

                DataTable dt = _iAccessData.Query(sqlString).Tables[0];
                PushNotificationClass pc = new PushNotificationClass(Server.MapPath("~"));

                string successId = "";
                string result = "";
                foreach (DataRow dr in dt.Rows)
                {

                    switch (dr["f_recive_devicetype"].ToString())
                    {
                        case "ios":
                            result = pc.PushMessageIos(dr["f_recive_deviceid"].ToString(),
                                dr["f_title"].ToString(),
                                dr["f_businesstablename"].ToString() + "^" + dr["f_businesstablekeyname"].ToString() + "^" + dr["f_businesstablekeyvalue"].ToString() + "^" + dr["sys_id"].ToString(),
                                dr["f_badge"].ToString());
                            break;
                        case "android":
                            result = pc.PushMessageAndroid(dr["f_recive_deviceid"].ToString(), dr["f_title"].ToString());
                            break;
                    }
                    if (result == "")
                    {
                        successId += dr["sys_id"].ToString() + "^";
                    }
                }


                sqlString = "update tbl_app_pushnotification set f_statusid = '1',f_status = '已发送' where sys_id in ('" + successId.TrimEnd('^').Replace("^", "','") + "')";
                _iAccessData.ExecuteSql(sqlString);

                NewLog("消息发送成功：" + sendIds, "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("消息发送失败：" + sendIds + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }



        //推送消息的封装方法
        public string SendNotificationByUserId(string receivedUserIds, string titleString, string contentString, string senderUserId, string senderUserName, string businessTableName, string businessKeyName, string businessKeyValue, Eva.Library.Data.AccessDataTrans.IAccessDataTrans iAccessDataTrans)
        {
          

            sara.dd.ldsw.idal.Itbl_app_pushnotification idal = new sara.dd.ldsw.dal.tbl_app_pushnotification();
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t;
            if (iAccessDataTrans == null)
            {
                t = commonclass.commonclass.CreateIAccessDataTrans();
            }
            else
            {
                t = iAccessDataTrans;
            }
            string sendIds = "";
            try
            {
                if (iAccessDataTrans == null)
                {
                t.getTrans().begin();
                }
                string[] receivedUserIdArray = receivedUserIds.Split(',');
                for (int i = 0; i < receivedUserIdArray.Length; i++)
                {
                    sara.dd.ldsw.model.tbl_app_pushnotification p = new model.tbl_app_pushnotification();
                    p.sys_creatdate = System.DateTime.Now;
                    p.sys_creatuserid = senderUserId;
                    p.sys_creatusername = senderUserName;

                    p.sys_lasteditdate = System.DateTime.Now;
                    p.sys_lastedituserid = senderUserId;
                    p.sys_lasteditusername = senderUserName;

                    p.sys_deldate = DateTime.Parse("1900-01-01");
                    p.sys_delflag = "0";

                    p.f_content = contentString;
                    p.f_title = titleString;
                    p.f_status = "未发送";
                    p.f_statusid = "0";

                    p.f_send_datetime = System.DateTime.Now;
                    p.f_send_userid = senderUserId;
                    p.f_send_username = senderUserName;
                    p.f_businesstablename = businessTableName;
                    p.f_businesstablekeyname = businessKeyName;
                    p.f_businesstablekeyvalue = businessKeyValue;
                    p.f_recive_userid = receivedUserIdArray[i];

                    string sql = " select u_name,f_value8,f_value6 from t_user where u_id = '" + p.f_recive_userid + "'";
                    DataSet ds = t.Query(sql);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        p.f_recive_username = ds.Tables[0].Rows[0]["u_name"].ToString();
                        p.f_recive_deviceid = ds.Tables[0].Rows[0]["f_value8"].ToString();
                        p.f_recive_devicetype = ds.Tables[0].Rows[0]["f_value6"].ToString();
                        p.f_recive_devicetypeid = ds.Tables[0].Rows[0]["f_value6"].ToString();
                    }

                    sendIds += idal.Add(p, t) + "^";
                }



                string sqlString = "";

                sqlString += " select sys_id,";
                sqlString += " (select count(*)+" + sendIds.Split('^').Length.ToString() + " from tbl_app_pushnotification where f_recive_userid = a.f_recive_userid and f_statusid in ('1')) as f_badge,";
                sqlString += " f_title,";
                sqlString += " f_content,";
                sqlString += " f_recive_devicetype,";
                sqlString += " f_recive_deviceid,";
                sqlString += " f_recive_userid,";
                //sqlString += " f_recive_certificate,";
                sqlString += " f_businesstablename,";
                sqlString += " f_businesstablekeyname,";
                sqlString += " f_businesstablekeyvalue";
                sqlString += " from tbl_app_pushnotification a where a.f_statusid = '0'";
                sqlString += " and sys_id in ('" + sendIds.Replace("^", "','") + "')";

                DataTable dt = t.Query(sqlString).Tables[0];
                

                string successId = "";
                string result = "";
                foreach (DataRow dr in dt.Rows)
                {
                    PushNotificationClass thread = new PushNotificationClass(Server.MapPath("~"));
                    switch (dr["f_recive_devicetype"].ToString())
                    {
                        case "ios":
                            thread.typeString = "ios";

                            thread.iosBadgeString = dr["f_badge"].ToString();
                            thread.iosDeviceIDString = dr["f_recive_deviceid"].ToString();
                            thread.iosParameterString = dr["f_businesstablename"].ToString() + "^" + dr["f_businesstablekeyname"].ToString() + "^" + dr["f_businesstablekeyvalue"].ToString();
                            thread.iosTitleString = dr["f_title"].ToString();

                            break;
                        case "android":
                            thread.typeString = "android";
                            thread.androidUserids = dr["f_recive_deviceid"].ToString();
                            thread.androidMessage = dr["f_title"].ToString();

                            break;
                    }

                    Thread thread_temp = new Thread(new ThreadStart(thread.PushForThread));
                    thread_temp.Start();
                    if (result == "")
                    {
                        successId += dr["sys_id"].ToString() + "^";
                    }
                }


                sqlString = "update tbl_app_pushnotification set f_statusid = '1',f_status = '已发送' where sys_id in ('" + successId.TrimEnd('^').Replace("^", "','") + "')";
                t.ExecuteSql(sqlString);

                if (iAccessDataTrans == null)
                {
                t.getTrans().commit();
                }
            }
            catch (Exception ex)
            {
                if (iAccessDataTrans == null)
                {
                t.getTrans().rollback();
                }
                throw ex;
            }



            return "";
        }


    }


    public class PushNotificationClass : System.Web.Services.WebService
    {
        public string typeString = "ios";
        public string iosRootPathString = "";
        public string iosDeviceIDString;
        public string iosTitleString;
        public string iosParameterString;
        public string iosBadgeString;

        public string androidUserids;
        public string androidMessage;
        public PushNotificationClass(string ioscertificateRootPathString)
        {
            iosRootPathString = ioscertificateRootPathString;
        }

        public void PushForThread()
        {
            if (typeString == "ios")
            {
                PushMessageIos(iosDeviceIDString, iosTitleString, iosParameterString, iosBadgeString);
            }
            else
            {
                PushMessageAndroid(androidUserids, androidMessage);
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="deviceIDString"></param>
        /// <param name="titleString"></param>
        /// <param name="messageTypeString"></param>
        /// <param name="badgeString"></param>
        /// <param name="certificateString">mmDevelop/mm</param>
        /// <returns></returns>
        public string PushMessageIos(string deviceIDString, string titleString, string parameterString, string badgeString)
        {

            try
            {
                int portInt = 2195;
                var hostNameString = "";
                var certificatePathString = "";
                switch (Eva.Library.Configuration.ConfigurationManager.AppSettings["IosPushNotificationCertificate"].ToString())
                {
                    case "distribution":
                        //certificatePathString = Server.MapPath("~") + @"\lib\mmPush.p12";
                        certificatePathString = iosRootPathString + @"\lib\com.mm.oda.distribution.push3.p12";
                        hostNameString = "gateway.push.apple.com";
                        break;
                    case "development":
                        //certificatePathString = Server.MapPath("~") + @"\lib\mmDevelopPush.p12";
                        certificatePathString = iosRootPathString + @"\lib\com.mm.oda.developer.push3.p12";
                        hostNameString = "gateway.sandbox.push.apple.com";
                        break;
                }


                //这样写就可以不用IIS应用程序池下设置“加载用户配置文件=true”
                X509Certificate2 clientCertificate = new X509Certificate2(certificatePathString, "abc123", X509KeyStorageFlags.MachineKeySet);
                //X509Certificate2 clientCertificate = new X509Certificate2(System.IO.File.ReadAllBytes(certificatePathString), "abc123");

                X509Certificate2Collection certificatesCollection = new X509Certificate2Collection(clientCertificate);

                TcpClient client = new TcpClient(hostNameString, portInt);
                SslStream sslStream = new SslStream(client.GetStream(), false, new RemoteCertificateValidationCallback(ValidateServerCertificate), null);

                try
                {
                    sslStream.AuthenticateAsClient(hostNameString, certificatesCollection, SslProtocols.Tls, false);
                    MemoryStream memoryStream = new MemoryStream();
                    BinaryWriter writer = new BinaryWriter(memoryStream);
                    writer.Write((byte)0);
                    writer.Write((byte)0);
                    writer.Write((byte)32);

                    writer.Write(HexStringToByteArray(deviceIDString.ToUpper()));
                    //String payload = "{\"aps\":{\"alert\":\"" + content + "\",\"badge\":\"1\"}}";
                    String payload = "{\"aps\":{\"alert\":\"" + titleString + "\",\"badge\":" + badgeString + ",\"sound\":\"default\",\"parameter\":\"" + parameterString + "\"}}";
                    var payloadlength = System.Text.Encoding.UTF8.GetBytes(payload).Length;
                    writer.Write((byte)0);
                    //writer.Write((byte)payload.Length);
                    writer.Write((byte)payloadlength);
                    byte[] b1 = System.Text.Encoding.UTF8.GetBytes(payload);
                    writer.Write(b1);
                    writer.Flush();
                    byte[] array = memoryStream.ToArray();
                    sslStream.Write(array);
                    sslStream.Flush();
                    client.Close();
                }
                catch (System.Security.Authentication.AuthenticationException ex)
                {
                    client.Close();
                    throw ex;
                }
                catch (Exception e)
                {
                    client.Close();
                    throw e;
                }
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message + ex.StackTrace;
            }



        }


        private bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            Console.WriteLine(certificate.Subject);
            return true;
        }

        private byte[] HexStringToByteArray(string hex)
        {
            return Enumerable.Range(0, hex.Length)
                              .Where(x => x % 2 == 0)
                              .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                              .ToArray();

        }




        public string PushMessageAndroid(string userids, string message)
        {
            string bakresult = "";

            try
            {
                String app_key = "bb71416767c858874bd07300";
                String master_secret = "347c247ab94d07df068e452d";
                cn.jpush.api.JPushClient client = new cn.jpush.api.JPushClient(app_key, master_secret);
                cn.jpush.api.push.mode.PushPayload payload = PushObject_All_All_Alert(userids, message);

                var result = client.SendPush(payload);
                //由于统计数据并非非是即时的,所以等待一小段时间再执行下面的获取结果方法
                //System.Threading.Thread.Sleep(10000);
                //如需查询上次推送结果执行下面的代码
                //var apiResult = client.getReceivedApi(result.msg_id.ToString());
                //var apiResultv3 = client.getReceivedApi_v3(result.msg_id.ToString());
                ////如需查询某个messageid的推送结果执行下面的代码
                //var queryResultWithV2 = client.getReceivedApi("1739302794");
                //var querResultWithV3 = client.getReceivedApi_v3("1739302794");


            }
            catch (cn.jpush.api.common.APIRequestException e)
            {
                //Console.WriteLine("Error response from JPush server. Should review and fix it. ");
                //Console.WriteLine("HTTP Status: " + e.Status);
                //Console.WriteLine("Error Code: " + e.ErrorCode);
                //Console.WriteLine("Error Message: " + e.ErrorCode);
                bakresult = e.Message;
            }
            return bakresult;
        }

        private cn.jpush.api.push.mode.PushPayload PushObject_All_All_Alert(string userids, string message)
        {
            cn.jpush.api.push.mode.PushPayload pushPayload = new cn.jpush.api.push.mode.PushPayload();
            pushPayload.platform = cn.jpush.api.push.mode.Platform.all();
            if (userids != "")
            {
                pushPayload.audience = cn.jpush.api.push.mode.Audience.s_alias(userids.Split(','));
            }
            else
            {
                pushPayload.audience = cn.jpush.api.push.mode.Audience.all();
            }

            pushPayload.notification = new cn.jpush.api.push.mode.Notification().setAlert(message).setAndroid(new cn.jpush.api.push.notification.AndroidNotification()
                                            .setBuilderID(1));
            return pushPayload;

        }

    }
}









