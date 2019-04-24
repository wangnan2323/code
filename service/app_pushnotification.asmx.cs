using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Web.Script.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// app_pushnotification 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_pushnotification : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_app_pushnotification _idal_tbl_app_pushnotification = new sara.dd.ldsw.dal.tbl_app_pushnotification();

        private Eva.Library.Data.AccessData.IAccessData _iAccessData;


        /// <summary>
        /// 获取用户推送数据统计
        /// </summary>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCount(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<String, String> userInfDic = commonclass.commonclass.CheckClientInf(clientInf);
                if (userInfDic == null)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户端信息错误";
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_app_pushnotification.GetCount(whereString, null);
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
        /// 获取用户推送数据
        /// </summary>
        /// <param name="whereString"></param>
        /// <param name="orderByString"></param>
        /// <param name="columnsString"></param>
        /// <param name="countString"></param>
        /// <param name="stepString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataTable(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<String, String> userInfDic = commonclass.commonclass.CheckClientInf(clientInf);
                if (userInfDic == null)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户端信息错误";
                }
                else
                {
                    columnsString = FormatColumns(columnsString).Replace("^", ",").Replace("f_send_userphoto", "(select U_PHOTOTURL from t_user where u_id=f_send_userid) as f_send_userphoto");
                    
                    DataTable dt = _idal_tbl_app_pushnotification.GetDataTable(whereString, orderByString, columnsString, countString, stepString, null);
                    string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);
                    string message = "{\"total\":\"" + _idal_tbl_app_pushnotification.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
                    resultDic["message"] = message;
                    resultDic["result"] = "true";
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
        /// 更新推送数据状态
        /// </summary>
        /// <param name="notificationIdsString"></param>
        /// <param name="userIdString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateStatus(string notificationIdsString,string userIdString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<String, String> userInfDic = commonclass.commonclass.CheckClientInf(clientInf);
                if (userInfDic == null)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户端信息错误";
                }
                else
                {
                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string sqlString = "";
                    if (notificationIdsString != "-1")
                    {
                        sqlString = "update tbl_app_pushnotification set f_statusid = '2' , f_status = '已接受' where sys_id in ('" + notificationIdsString.Replace("^", "','") + "')";
                    }
                    else
                    {
                        sqlString = "update tbl_app_pushnotification set f_statusid = '2' , f_status = '已接受' where f_recive_userid  = '" + userIdString + "'";
                    }
                
                    
                    _iAccessData.ExecuteSql(sqlString);

                    string count = _idal_tbl_app_pushnotification.GetCount(" f_recive_userid = '" + userIdString + "' and f_statusid = '1'", null);
                    resultDic["result"] = "true";
                    resultDic["message"] = count;
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
