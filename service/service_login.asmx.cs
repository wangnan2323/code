using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_auth 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class service_login : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UserLogin(string userLoginNameString, string userPasswordString, string userPatternString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {


                Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

                string userid = "";
                //登录方式：0普通登录，1超级登录
                string logintype = "0";
                //如果传入的password是--的话自动调用超级密码登录
                if (userPasswordString == "--")
                {
                    userPasswordString = Eva.Library.Configuration.ConfigurationManager.AppSettings["UpassWord"].ToString();
                }

                if (userPasswordString == Eva.Library.Configuration.ConfigurationManager.AppSettings["UpassWord"].ToString())
                {
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        userid = sara.platform.service.auth.Service.UserLoginByLoginName1(userLoginNameString);
                        logintype = "1";
                    }
                    else
                    {
                        userid = _ia.UserLoginByLoginName1(userLoginNameString);
                        logintype = "1";
                    }
                }
                else
                {
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        userid = sara.platform.service.auth.Service.UserLogin1(userLoginNameString, userPasswordString);
                        logintype = "0";
                    }
                    else
                    {
                        userid = _ia.UserLogin1(userLoginNameString, userPasswordString);
                        logintype = "0";
                    }
                }
                

                //通过图形码和userid校验用户是否正确

                if (userPatternString != "--")
                {
                    string sqlString = "select count(*) from t_user where u_id = '" + userid + "' and f_value2 = '" + userPatternString + "'  and u_state = '1'";

                    string ss = "";
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        ss = sara.platform.service.auth.Service.QuerySql(sqlString).Tables[0].Rows[0][0].ToString();
                    }
                    else
                    {
                        ss = _ia.QuerySql(sqlString).Tables[0].Rows[0][0].ToString();
                    }
                    if (ss != "1")
                    {
                        userid = "0";
                    }
                }


                if (userid == "0")
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "登录失败，用户名和密码不符。";
                }
                else
                {

                    Session["userid"] = userid;
                    Session.Timeout = 1440;

                    resultDic["result"] = "true";
                    resultDic["message"] = userid+"^"+logintype;
                  


                    try
                    {
                        Eva.Library.Net.NetTool nt = new Eva.Library.Net.NetTool();
                        string ipAddressString = nt.GetBrowerIP();
                        string macAddressString = nt.GetRemoteMacByIP(ipAddressString);

                        string sqlString = "";
                        sqlString += " insert into t_login_log ";
                        sqlString += " (sys_id, f_userid, f_userloginname, f_username, f_date, f_ip, f_mac, f_clienttype, f_loginpattern) ";
                        sqlString += " values ";
                        //sqlString += " ((select nvl(max(sys_id), 0) + 1 as sys_id from t_login_log), ";
                        sqlString += " ('1', ";
                        sqlString += " '" + userid + "', ";
                        sqlString += " '" + userLoginNameString + "', ";
                        sqlString += " '" + userLoginNameString + "',";
                        sqlString += " to_date('" + System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "', 'yyyy-MM-dd hh24:mi:ss'),";
                        sqlString += " '"+ ipAddressString + "',";
                        sqlString += " '"+ macAddressString + "',";
                        sqlString += " 'pc',";
                        sqlString += " 'pc') ";
                        Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.commonclass.CreateIAccessData();
                        _iAccessData.ExecuteSql(sqlString);
                    }
                    catch
                    {

                    }
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUserInf(string userIdString,string uuid)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                if (checkUserInf(userIdString, uuid))
                {

                    Session["userid"] = userIdString;
                    Session.Timeout = 1440;

                    Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                    #region 装载用户信息
                    DataSet dsInf = null;
                    DataSet dsOrg = null;
                    DataSet dsRole = null;
                    DataSet dsPosition = null;
                    //DataSet dsField = null;

                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        dsInf = sara.platform.service.auth.Service.GetUserInfByUserid(userIdString);
                        dsOrg = sara.platform.service.auth.Service.GetUserOrganByUserid(userIdString);
                        dsRole = sara.platform.service.auth.Service.GetUserRoleByUserid(userIdString);
                        dsPosition = sara.platform.service.auth.Service.GetUserPositionByUserid(userIdString);
                      //  dsField = sara.platform.service.auth.Service.GetUserFieldByUserid(userIdString);
                    }
                    else
                    {
                        dsInf = _ia.GetUserInfByUserid(userIdString);
                        dsOrg = _ia.GetUserOrganByUserid(userIdString);
                        dsRole = _ia.GetUserRoleByUserid(userIdString);
                        dsPosition = _ia.GetUserPositionByUserid(userIdString);
                        //dsField = _ia.GetUserFieldByUserid(userIdString);
                    }


                string userInfJson = "{";

                #region user
                userInfJson += "\"sys_userid\":\"" + userIdString + "\",";
                userInfJson += "\"sys_username\":\"" + dsInf.Tables[0].Rows[0]["U_Name"].ToString() + "\",";
                userInfJson += "\"sys_userloginname\":\"" + dsInf.Tables[0].Rows[0]["U_Code"].ToString() + "\",";

                userInfJson += "\"sys_photourl\":\"" + dsInf.Tables[0].Rows[0]["U_PHOTOTURL"].ToString() + "\",";
                userInfJson += "\"sys_value1\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE1"].ToString() + "\",";
                userInfJson += "\"sys_value2\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE2"].ToString() + "\",";
                userInfJson += "\"sys_value3\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE3"].ToString() + "\",";
                userInfJson += "\"sys_value4\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE4"].ToString() + "\",";
                userInfJson += "\"sys_value5\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE5"].ToString() + "\",";
                userInfJson += "\"sys_value6\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE6"].ToString() + "\",";
                userInfJson += "\"sys_value7\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE7"].ToString() + "\",";
                userInfJson += "\"sys_value8\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE8"].ToString() + "\",";
                userInfJson += "\"sys_value9\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE9"].ToString() + "\",";
                userInfJson += "\"sys_value10\":\"" + dsInf.Tables[0].Rows[0]["F_VALUE10"].ToString() + "\",";

                #endregion

                #region organ

                if (dsOrg.Tables[0].Rows.Count > 0)
                {
                    userInfJson += "\"sys_organid\":\"" + dsOrg.Tables[0].Rows[0]["O_ID"].ToString() + "\",";
                    userInfJson += "\"sys_organcode\":\"" + dsOrg.Tables[0].Rows[0]["O_CODE"].ToString() + "\",";//用于组装流程编号 
                    userInfJson += "\"sys_organname\":\"" + dsOrg.Tables[0].Rows[0]["O_FullName"].ToString() + "\",";
                }
                else
                {
                    userInfJson += "\"sys_organid\":\"" + "" + "\",";
                    userInfJson += "\"sys_organcode\":\"" + "" + "\",";
                    userInfJson += "\"sys_organname\":\"" + "" + "\",";
                }

                string sqlString = "select o_id,o_fullname from t_organ  where o_id in ('" + dsInf.Tables[0].Rows[0]["U_REMARK"].ToString() + "') ";

                DataSet ds_TopOrgan = null;

                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    ds_TopOrgan = sara.platform.service.auth.Service.QuerySql(sqlString);
                }
                else
                {
                    ds_TopOrgan = _ia.QuerySql(sqlString);
                }

                userInfJson += "\"sys_toporgan\":\"" + dsInf.Tables[0].Rows[0]["U_REMARK"].ToString() + "\",";
                if (ds_TopOrgan.Tables[0].Rows.Count > 0)
                {
                    userInfJson += "\"sys_toporganname\":\"" + ds_TopOrgan.Tables[0].Rows[0]["o_fullname"].ToString() + "\",";
                }
                else
                {
                    userInfJson += "\"sys_toporganname\":\"\",";
                }
                #endregion

                #region roles
                if (dsRole.Tables[0].Rows.Count > 0)
                {
                    string roles = "";
                    string rolenames = "";
                    string sys_rolenameremarks = "";

                    for (int i = 0; i < dsRole.Tables[0].Rows.Count; i++)
                    {
                        if (dsRole.Tables[0].Rows[i]["r_sys_appcode"].ToString()=="" || ("," + dsRole.Tables[0].Rows[i]["r_sys_appcode"].ToString() + ",").IndexOf("," + Eva.Library.Configuration.ConfigurationManager.AppSettings["APPCODE"] + ",") > -1)
                        {
                            roles += "" + dsRole.Tables[0].Rows[i]["R_ID"].ToString() + "^";
                            rolenames += "" + dsRole.Tables[0].Rows[i]["R_NAME"].ToString() + "^";
                            sys_rolenameremarks += "" + dsRole.Tables[0].Rows[i]["R_REMARK"].ToString().Replace(",", "|").Replace("，", "|") + "^";
                        }
                    }
                    userInfJson += "\"sys_roles\":\"" + roles.TrimEnd('^') + "\",";
                    userInfJson += "\"sys_rolenames\":\"" + rolenames.TrimEnd('^') + "\",";
                    userInfJson += "\"sys_rolenameremarks\":\"" + sys_rolenameremarks.TrimEnd('^') + "\",";
                }
                else
                {
                    userInfJson += "\"sys_roles\":\"" + "" + "\",";
                    userInfJson += "\"sys_rolenames\":\"" + "\",";
                    userInfJson += "\"sys_rolenameremarks\":\"" + "\",";
                }
                #endregion

                #region position
                if (dsPosition.Tables[0].Rows.Count > 0)
                {

                    string positionids = "";
                    string positionnames = "";
                    for (int i = 0; i < dsPosition.Tables[0].Rows.Count; i++)
                    {
                        if (("," + dsPosition.Tables[0].Rows[i]["p_sys_appcode"].ToString() + ",").IndexOf("," + Eva.Library.Configuration.ConfigurationManager.AppSettings["APPCODE"] + ",") > -1)
                        {
                            positionids += "" + dsPosition.Tables[0].Rows[i]["p_id"].ToString() + "^";
                            positionnames += "" + dsPosition.Tables[0].Rows[i]["p_fullname"].ToString() + "^";
                        }
                    }

                    userInfJson += "\"sys_positionids\":\"" + positionids.TrimEnd('^') + "\",";
                    userInfJson += "\"sys_positionnames\":\"" + positionnames.TrimEnd('^') + "\",";
                }
                else
                {
                    userInfJson += "\"sys_positionids\":\"" + "" + "\",";
                    userInfJson += "\"sys_positionnames\":\"" + "\",";
                }
                #endregion

                #region field
                //if (dsField.Tables.Count > 0 && dsField.Tables[0].Rows.Count > 0)
                //{

                //    string tablename = "";
                //    for (int i = 0; i < dsField.Tables[0].Rows.Count; i++)
                //    {
                //        tablename += "" + dsField.Tables[0].Rows[i]["f_name"].ToString() + "^";
                //    }

                //    userInfJson += "\"sys_fieldnames\":\"" + tablename.TrimEnd('^') + "\"";
                //}
                //else
                //{
                //    userInfJson += "\"sys_fieldnames\":\"" + "\"";
                //}
                #endregion


                userInfJson += "}";
                #endregion

                    resultDic["result"] = "true";
                    resultDic["message"] = userInfJson;
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "timeout";
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        private bool checkUserInf(string userIdString, string uuid)
        {
            if ((Session["userid"] != null && Session["userid"].ToString() == userIdString) || uuid == Eva.Library.Configuration.ConfigurationManager.AppSettings["uuid"].ToString())
            {
                return true;
            } 
            return false;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUserRuleInf(string userIdString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

                string userRuleString = "";
                DataSet userRuleDataSet = null;
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    userRuleDataSet = sara.platform.service.auth.Service.GetUserRuleByUserid(userIdString);
                }
                else
                {
                    userRuleDataSet = _ia.GetUserRuleByUserid(userIdString);
                }

                string serviceIPString = Eva.Library.Configuration.ConfigurationManager.AppSettings["LocalHostIP"].ToString();
                string userIDString = userIdString;
                DataRow[] userRuleDataRow = userRuleDataSet.Tables[0].Select(" ','+f_sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' and len(F_CODE) = 4  and F_RULEMODEL = '1'");
                for (int i = 0; i < userRuleDataRow.Length; i++)
                {
                    userRuleString += "{";
                    userRuleString += "\"f_id\":\"" + userRuleDataRow[i]["F_ID"].ToString() + "\",";
                    userRuleString += "\"f_code\":\"" + userRuleDataRow[i]["F_CODE"].ToString() + "\",";
                    userRuleString += "\"f_name\":\"" + userRuleDataRow[i]["F_NAME"].ToString() + "\",";
                    userRuleString += "\"f_url\":\"" + formatUrlString(userRuleDataRow[i]["F_URL"].ToString(), serviceIPString, userIDString) + "\",";
                    userRuleString += "\"f_target\":\"" + userRuleDataRow[i]["F_TARGET"].ToString() + "\",";
                    userRuleString += "\"f_tile\":\"" + userRuleDataRow[i]["F_TILE"].ToString() + "\",";
                    userRuleString += "\"f_sys_appcode\":\"" + userRuleDataRow[i]["F_SYS_APPCODE"].ToString() + "\",";
                    userRuleString += "\"f_state\":\"" + userRuleDataRow[i]["F_STATE"].ToString() + "\",";
                    userRuleString += "\"f_rulemodel\":\"" + userRuleDataRow[i]["F_RULEMODEL"].ToString() + "\",";
                    userRuleString += "\"f_value1\":\"" + userRuleDataRow[i]["f_value1"].ToString() + "\",";
                    userRuleString += "\"f_children\":[";
                    userRuleString += GetChildRenRule(userRuleDataSet, userRuleDataRow[i]["F_CODE"].ToString(), 8, serviceIPString, userIDString);
                    userRuleString += "]";
                    userRuleString += "},";
                }
                userRuleString = "[" + userRuleString.TrimEnd(',') + "]";
                resultDic["result"] = "true";
                resultDic["message"] = userRuleString;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        private string GetChildRenRule(DataSet userRuleDataSet, string nodeIdString, int nodeLengthInt, string serviceIPString, string userIDString)
        {

            string userRuleString = "";

            DataRow[] userRuleDataRow = userRuleDataSet.Tables[0].Select(" ','+f_sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' and len(F_CODE) = " + nodeLengthInt.ToString() + "  and F_CODE like '" + nodeIdString + "%'  and F_RULEMODEL = '1'");
            for (int i = 0; i < userRuleDataRow.Length; i++)
            {
                userRuleString += "{";
                userRuleString += "\"f_id\":\"" + userRuleDataRow[i]["F_ID"].ToString() + "\",";
                userRuleString += "\"f_code\":\"" + userRuleDataRow[i]["F_CODE"].ToString() + "\",";
                userRuleString += "\"f_name\":\"" + userRuleDataRow[i]["F_NAME"].ToString() + "\",";
                userRuleString += "\"f_url\":\"" + formatUrlString(userRuleDataRow[i]["F_URL"].ToString(), serviceIPString, userIDString) + "\",";
                userRuleString += "\"f_target\":\"" + userRuleDataRow[i]["F_TARGET"].ToString() + "\",";
                userRuleString += "\"f_tile\":\"" + userRuleDataRow[i]["F_TILE"].ToString() + "\",";
                userRuleString += "\"f_sys_appcode\":\"" + userRuleDataRow[i]["F_SYS_APPCODE"].ToString() + "\",";
                userRuleString += "\"f_state\":\"" + userRuleDataRow[i]["F_STATE"].ToString() + "\",";
                userRuleString += "\"f_rulemodel\":\"" + userRuleDataRow[i]["F_RULEMODEL"].ToString() + "\",";
                userRuleString += "\"f_value1\":\"" + userRuleDataRow[i]["f_value1"].ToString() + "\",";
                userRuleString += "\"f_children\":[";
                userRuleString += GetChildRenRule(userRuleDataSet, userRuleDataRow[i]["F_CODE"].ToString(), nodeLengthInt + 4, serviceIPString, userIDString);
                userRuleString += "]";
                userRuleString += "},";
            }



            return userRuleString.TrimEnd(',');
        }
        private string formatUrlString(string urlString,string serviceIPString,string userIDString)
        {
            return urlString.Replace("【serviceip】", serviceIPString).Replace("【userid】", userIDString);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUserLoginNameByMac()
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                Eva.Library.Net.NetTool nt = new Eva.Library.Net.NetTool();
                string ipAddressString = nt.GetBrowerIP();
                string macAddressString = nt.GetRemoteMacByIP(ipAddressString);

                if (macAddressString == "00-00-00-00-00-00" || macAddressString == "")
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "";
                }
                else
                {
                    Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

                    string sqlString = "select * from t_user where upper(f_value1) like '%" + macAddressString.ToUpper() + "%'";
                    DataSet ds = null;
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        ds = sara.platform.service.auth.Service.QuerySql(sqlString);
                    }
                    else
                    {
                        ds = _ia.QuerySql(sqlString);
                    }

                    if (ds.Tables[0].Rows.Count == 1)
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = ds.Tables[0].Rows[0]["U_Code"].ToString();
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "";
                    }
                }


            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateUserAttr(string userIdString, string userAttrsString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {


                Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);


                string result = "";
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    result = sara.platform.service.auth.Service.UpdateUserAttr(userIdString, userAttrsString.Replace("^", ":").Replace("~", ";"));
                }
                else
                {
                    result = _ia.UpdateUserAttr(userIdString, userAttrsString.Replace("^", ":").Replace("~", ";"));
                }
                if (result == "1")
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "";
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
        public string UpdateUserPassWord(string userIdString, string oldPasswordString, string newPasswordString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {


                Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);


                bool result = false;
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    result = sara.platform.service.auth.Service.UpdateUserPassWord(userIdString, oldPasswordString, newPasswordString);
                }
                else
                {
                    result = _ia.UpdateUserPassWord(userIdString, oldPasswordString, newPasswordString);
                }
                if (result)
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "";
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
        public string GetClientInfo()
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                Eva.Library.Net.NetTool nt = new Eva.Library.Net.NetTool();
                string ipAddressString = nt.GetBrowerIP();
                string macAddressString = nt.GetRemoteMacByIP(ipAddressString);

                resultDic["result"] = "true";
                resultDic["message"] = "{\"ip\":\"" + ipAddressString + "\",\"mac\":\"" + macAddressString + "\"}";

  
            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UserLogout()
        {
            try
            {
                Session["userid"] = null;
            }
            catch
            {
            }
            return "";
        }
    }
}