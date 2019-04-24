using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// app_user 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_user : System.Web.Services.WebService
    {

        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        /// <summary>
        /// 用户登录并写入用户devicetoken并返回用户信息
        /// </summary>
        /// <param name="userLoginNameString"></param>
        /// <param name="userPasswordString"></param>
        /// <param name="deviceTypeString"></param>
        /// <param name="deviceTokenString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UserLoginAndGetUserInf(string userLoginNameString, string userPasswordString, string deviceTypeString, string deviceTokenString, string clientInf)
        {

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                _iAccessData = commonclass.commonclass.CreateIAccessData();
                IDictionary<String, String> userInfDic = commonclass.commonclass.CheckClientInf(clientInf);
                if (userInfDic == null)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户端信息错误";
                }
                else
                {
                    string userIdString = "";
                    //为未注册帐户写的特异代码
                    if (userLoginNameString == "" || userLoginNameString == "nouser")
                    {
                        userIdString = sara.platform.service.auth.Service.UserLoginByLoginName1("nouser");
                        resultDic["result"] = "nouser";
                    }
                    else
                    {
                        //如果传入的password是--的话自动调用超级密码登录
                        if (userPasswordString == "--")
                        {
                            userPasswordString = Eva.Library.Configuration.ConfigurationManager.AppSettings["UpassWord"].ToString();
                        }
                        //获取userid
                        if (userPasswordString == Eva.Library.Configuration.ConfigurationManager.AppSettings["UpassWord"].ToString())
                        {
                            userIdString = sara.platform.service.auth.Service.UserLoginByLoginName1(userLoginNameString);
                        }
                        else
                        {
                            userIdString = sara.platform.service.auth.Service.UserLogin1(userLoginNameString, userPasswordString);
                        }
                        resultDic["result"] = "true";
                    }
                    //教研userid
                    if (userIdString == "0")
                    {
                        userIdString = sara.platform.service.auth.Service.UserLoginByLoginName1("nouser");
                        resultDic["result"] = "wronguser";
                    }
                    string userInfJson = GetUserInfJsonString(userIdString, deviceTokenString, deviceTypeString, userLoginNameString, userInfDic, _iAccessData);

                    //如果没有权限，则按照nouser登陆
                    if (userInfJson == "-1")
                    {
                        userIdString = sara.platform.service.auth.Service.UserLoginByLoginName1("nouser");
                        userInfJson = GetUserInfJsonString(userIdString, deviceTokenString, deviceTypeString, userLoginNameString, userInfDic, _iAccessData);
                        resultDic["result"] = "noright";

                    }

                    resultDic["message"] = userInfJson;
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        private string GetUserInfJsonString(string userIdString, string deviceTokenString, string deviceTypeString, string userLoginNameString, IDictionary<String, String> userInfDic, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            string sqlString = "";
            #region 装载用户信息
            DataSet dsInf = sara.platform.service.auth.Service.GetUserInfByUserid(userIdString);
            DataSet dsOrg = sara.platform.service.auth.Service.GetUserOrganByUserid(userIdString);
            DataSet dsGroup = sara.platform.service.auth.Service.GetUserGroupByUserid(userIdString);
            DataSet dsPosition = sara.platform.service.auth.Service.GetUserPositionByUserid(userIdString);
            DataSet userFieldDataSet = sara.platform.service.auth.Service.GetUserFieldByUserid(userIdString);


            string userInfJson = "{";

            #region user
            userInfJson += "\"sys_userid\":\"" + userIdString + "\",";
            userInfJson += "\"sys_username\":\"" + dsInf.Tables[0].Rows[0]["U_Name"].ToString() + "\",";
            userInfJson += "\"sys_userloginname\":\"" + dsInf.Tables[0].Rows[0]["U_Code"].ToString() + "\",";

            //手写签名的图片地址
            userInfJson += "\"sys_signedurl\":\"" + dsInf.Tables[0].Rows[0]["U_SIGNEDURL"].ToString() + "\",";
            //头像的图片地址
            userInfJson += "\"sys_phototurl\":\"" + dsInf.Tables[0].Rows[0]["U_PHOTOTURL"].ToString() + "\",";


            userInfJson += "\"sys_devicetoken\":\"" + deviceTokenString + "\",";
            userInfJson += "\"sys_devicetype\":\"" + deviceTypeString + "\",";



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

            if (dsInf.Tables[0].Rows[0]["U_REMARK"].ToString() != "")
            {
                sqlString = "select o_id,o_fullname from t_organ  where o_id in ('" + dsInf.Tables[0].Rows[0]["U_REMARK"].ToString() + "') ";

                DataSet ds_TopOrgan = sara.platform.service.auth.Service.QuerySql(sqlString);

                userInfJson += "\"sys_toporgan\":\"" + dsInf.Tables[0].Rows[0]["U_REMARK"].ToString() + "\",";
                if (ds_TopOrgan.Tables[0].Rows.Count > 0)
                {
                    userInfJson += "\"sys_toporganname\":\"" + ds_TopOrgan.Tables[0].Rows[0]["o_fullname"].ToString() + "\",";
                }
                else
                {
                    userInfJson += "\"sys_toporganname\":\"\",";
                }
            }
            else
            {
                userInfJson += "\"sys_toporgan\":\"\",";
                userInfJson += "\"sys_toporganname\":\"\",";
            }


            #endregion

            #region groups
            if (dsGroup.Tables[0].Rows.Count > 0)
            {
                string groups = "";


                for (int i = 0; i < dsGroup.Tables[0].Rows.Count; i++)
                {
                    if (dsGroup.Tables[0].Rows[i]["g_sys_appcode"].ToString() == "" || ("," + dsGroup.Tables[0].Rows[i]["g_sys_appcode"].ToString() + ",").IndexOf("," + Eva.Library.Configuration.ConfigurationManager.AppSettings["APPCODE"] + ",") > -1)
                    {
                        groups += "{";

                        groups += "\"g_id\":\"" + dsGroup.Tables[0].Rows[i]["g_id"].ToString() + "\",";
                        groups += "\"g_name\":\"" + dsGroup.Tables[0].Rows[i]["g_name"].ToString() + "\",";
                        groups += "\"f_value1\":\"" + dsGroup.Tables[0].Rows[i]["f_value1"].ToString() + "\",";
                        groups += "\"f_value2\":\"" + dsGroup.Tables[0].Rows[i]["f_value2"].ToString() + "\"";
                        groups += "},";
                    }
                }
                userInfJson += "\"sys_groups\":[" + groups.TrimEnd(',') + "],";

            }
            else
            {
                userInfJson += "\"sys_groups\":[],";

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

            string userFieldString = "";

            string whereString = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
            whereString += " and len(F_NODEID) = 4 ";
            whereString += " and f_type = 'app'";
            DataRow[] userFieldDataRow = userFieldDataSet.Tables[0].Select(whereString);//应该只有一行数据

            //indexview的nodeid
            string whereString8 = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
            whereString8 += " and len(F_NODEID) = 8 ";
            whereString8 += " and f_value1 = 'htmlview' ";
            DataRow[] userFieldDataRow8 = userFieldDataSet.Tables[0].Select(whereString8);//应该只有一行数据
            string indexViewNodeid = "";
            if (userFieldDataRow8.Length > 0)
            {
                indexViewNodeid = userFieldDataRow8[0]["F_NODEID"].ToString();
            }

            //meview的nodeid
            string whereString9 = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
            whereString9 += " and len(F_NODEID) = 8 ";
            whereString9 += " and f_value1 = 'meview' ";
            DataRow[] userFieldDataRow9 = userFieldDataSet.Tables[0].Select(whereString9);//应该只有一行数据
            string meViewNodeid = "";
            if (userFieldDataRow9.Length > 0)
            {
                meViewNodeid = userFieldDataRow9[0]["F_NODEID"].ToString();
            }
                     
            

            for (int i = 0; i < userFieldDataRow.Length; i++)
            {
                string whereString1 = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
                whereString1 += " and len(F_NODEID) > 4 ";
                whereString1 += "and F_NODEID like '" + userFieldDataRow[i]["F_NODEID"].ToString() + "%'";

                DataRow[] userFieldDataRow1 = userFieldDataSet.Tables[0].Select(whereString1);

                for (int j = 0; j < userFieldDataRow1.Length; j++)
                {
                    if (userFieldDataRow1[j]["F_NODEID"].ToString().IndexOf(indexViewNodeid) ==0  && userFieldDataRow1[j]["F_NODEID"].ToString() != indexViewNodeid)
                    {

                    }
                    else if (userFieldDataRow1[j]["F_NODEID"].ToString().IndexOf(meViewNodeid) == 0 && userFieldDataRow1[j]["F_NODEID"].ToString() != meViewNodeid)
                    {

                    }
                   
                    else
                    {
                        userFieldString += "{";
                        userFieldString += "\"f_id\":\"" + userFieldDataRow1[j]["F_ID"].ToString() + "\",";
                        userFieldString += "\"f_nodeid\":\"" + userFieldDataRow1[j]["F_NODEID"].ToString() + "\",";
                        userFieldString += "\"f_name\":\"" + userFieldDataRow1[j]["F_NAME"].ToString() + "\",";
                        userFieldString += "\"f_type\":\"" + userFieldDataRow1[j]["F_TYPE"].ToString() + "\",";
                        userFieldString += "\"sys_appcode\":\"" + userFieldDataRow1[j]["SYS_APPCODE"].ToString() + "\",";
                        userFieldString += "\"f_value1\":\"" + userFieldDataRow1[j]["F_VALUE1"].ToString() + "\",";
                        userFieldString += "\"f_value2\":\"" + userFieldDataRow1[j]["F_VALUE2"].ToString() + "\",";
                        userFieldString += "\"f_value3\":\"" + userFieldDataRow1[j]["F_VALUE3"].ToString() + "\",";
                        userFieldString += "\"f_value4\":\"" + userFieldDataRow1[j]["F_VALUE4"].ToString() + "\",";
                        userFieldString += "\"f_value5\":\"" + userFieldDataRow1[j]["F_VALUE5"].ToString() + "\",";
                        userFieldString += "\"f_value6\":\"" + userFieldDataRow1[j]["F_VALUE6"].ToString() + "\",";
                        userFieldString += "\"f_value7\":\"" + userFieldDataRow1[j]["F_VALUE7"].ToString() + "\",";
                        userFieldString += "\"f_value8\":\"" + userFieldDataRow1[j]["F_VALUE8"].ToString() + "\",";
                        userFieldString += "\"f_value9\":\"" + userFieldDataRow1[j]["F_VALUE9"].ToString() + "\",";
                        userFieldString += "\"f_value10\":\"" + userFieldDataRow1[j]["F_VALUE10"].ToString() + "\"";
                        //userFieldString += "\"f_children\":[";
                        //userFieldString += GetChildRenField(userFieldDataSet, userFieldDataRow1[j]["F_NODEID"].ToString(), 12);
                        //userFieldString += "]";
                        userFieldString += "},";
                    }
                }

            }
            userFieldString = "[" + userFieldString.TrimEnd(',') + "]";


            userInfJson += "\"sys_fields\":" + userFieldString + ",";


            #endregion



            userInfJson += "\"sys_end\":\"\"";
            userInfJson += "}";
            #endregion

            //如果没有权限
            if (userFieldDataRow.Length == 0)
            {
                userInfJson = "-1";
            }
            else
            {
                #region update user f_value6更新用户手机类型和deviceTonke
                //未注册用户不用保存手机类型
                if (userLoginNameString != "nouser" && userLoginNameString != "")
                {
                    string parameterString = "f_value6:" + deviceTypeString + ";";
                    parameterString += "f_value8:" + deviceTokenString + ";";
                    sara.platform.service.auth.Service.UpdateUserAttr(userIdString, parameterString);
                }

                #endregion

                #region 写日至
                //写入登陆日至
                try
                {
                    //未注册用户不用记录日志
                    if (userLoginNameString != "nouser" && userLoginNameString != "")
                    {
                        sqlString = "";
                        sqlString += " insert into t_login_log ";
                        sqlString += " (sys_id, f_userid, f_userloginname, f_username, f_date, f_ip, f_mac, f_clienttype, f_loginpattern) ";
                        sqlString += " values ";
                        //sqlString += " ((select nvl(max(sys_id), 0) + 1 as sys_id from t_login_log), ";
                        sqlString += " ('1', ";
                        sqlString += " '" + userIdString + "', ";
                        sqlString += " '" + userLoginNameString + "', ";
                        sqlString += " '" + dsInf.Tables[0].Rows[0]["U_Name"].ToString() + "',";
                        sqlString += " to_date('" + System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "', 'yyyy-MM-dd hh24:mi:ss'),";
                        sqlString += " '" + userInfDic["userip"].ToString() + "',";
                        sqlString += " '" + userInfDic["usermac"].ToString() + "',";
                        sqlString += " '" + userInfDic["devicetype"].ToString() + "',";
                        sqlString += " '" + userInfDic["devicetype"].ToString() + "') ";

                        _iAccessData.ExecuteSql(sqlString);
                    }

                }
                catch
                {

                }
                #endregion
            }

            return userInfJson;
        }

        //这个方法好像没有用了
        private string GetChildRenField(DataSet userFieldDataSet, string nodeIdString, int nodeLengthInt)
        {

            string userFieldString = "";
            string whereString = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%'";
            whereString += " and len(F_NODEID) = " + nodeLengthInt.ToString() + "  ";
            whereString += " and F_NODEID like '" + nodeIdString + "%'";
            DataRow[] userFieldDataRow = userFieldDataSet.Tables[0].Select(whereString);
            for (int i = 0; i < userFieldDataRow.Length; i++)
            {
                userFieldString += "{";
                userFieldString += "\"f_id\":\"" + userFieldDataRow[i]["F_ID"].ToString() + "\",";
                userFieldString += "\"f_nodeid\":\"" + userFieldDataRow[i]["F_NODEID"].ToString() + "\",";
                userFieldString += "\"f_name\":\"" + userFieldDataRow[i]["F_NAME"].ToString() + "\",";
                userFieldString += "\"f_type\":\"" + userFieldDataRow[i]["F_TYPE"].ToString() + "\",";
                userFieldString += "\"sys_appcode\":\"" + userFieldDataRow[i]["SYS_APPCODE"].ToString() + "\",";
                userFieldString += "\"f_value1\":\"" + userFieldDataRow[i]["F_VALUE1"].ToString() + "\",";
                userFieldString += "\"f_value2\":\"" + userFieldDataRow[i]["F_VALUE2"].ToString() + "\",";
                userFieldString += "\"f_value3\":\"" + userFieldDataRow[i]["F_VALUE3"].ToString() + "\",";
                userFieldString += "\"f_value4\":\"" + userFieldDataRow[i]["F_VALUE4"].ToString() + "\",";
                userFieldString += "\"f_value5\":\"" + userFieldDataRow[i]["F_VALUE5"].ToString() + "\",";
                userFieldString += "\"f_value6\":\"" + userFieldDataRow[i]["F_VALUE6"].ToString() + "\",";
                userFieldString += "\"f_value7\":\"" + userFieldDataRow[i]["F_VALUE7"].ToString() + "\",";
                userFieldString += "\"f_value8\":\"" + userFieldDataRow[i]["F_VALUE8"].ToString() + "\",";
                userFieldString += "\"f_value9\":\"" + userFieldDataRow[i]["F_VALUE9"].ToString() + "\",";
                userFieldString += "\"f_value10\":\"" + userFieldDataRow[i]["F_VALUE10"].ToString() + "\",";

                userFieldString += "\"f_children\":[";
                userFieldString += GetChildRenField(userFieldDataSet, userFieldDataRow[i]["F_NODEID"].ToString(), nodeLengthInt + 4);
                userFieldString += "]";
                userFieldString += "},";
            }



            return userFieldString.TrimEnd(',');
        }

        /// <summary>
        /// 用户注销
        /// </summary>
        /// <param name="userIdString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UserLogout(string userIdString, string clientInf)
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

                    string parameterString = "f_value6:" + "" + ";";
                    parameterString += "f_value8:" + "" + ";";
                    if (sara.platform.service.auth.Service.UpdateUserAttr(userIdString, parameterString) == "1")
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "注销成功";
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "注销失败";
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


        /// <summary>
        /// 更新用户devicetoken
        /// </summary>
        /// <param name="userIdString"></param>
        /// <param name="deviceTokenString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateDeviceToken(string userIdString, string deviceTokenString, string clientInf)
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
                    string parameterString = "f_value6:" + "ios" + ";";
                    parameterString += "f_value8:" + deviceTokenString + ";";
                    if (sara.platform.service.auth.Service.UpdateUserAttr(userIdString, parameterString) == "1")
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "DeviceToken修改成功";
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "DeviceToken修改失败";
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

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="userIdString"></param>
        /// <param name="newPassword"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateUserPassword(string userLoginNameString, string newPassword, string clientInf)
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
                    string sql = "update t_user set u_pwd = '" + sara.platform.service.auth.Service.PassWordEncrypt(newPassword) + "' where u_code = '" + userLoginNameString + "'";

                    _iAccessData = commonclass.commonclass.CreateIAccessData();

                    if (_iAccessData.ExecuteSql(sql) > 0)
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "密码修改成功";
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "密码修改失败";
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


        /// <summary>
        /// 校验用户名和密码，用于修改密码时校验旧密码的正确性
        /// </summary>
        /// <param name="userIdString"></param>
        /// <param name="newPassword"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckUserPassword(string userLoginNameString, string userPasswordString, string clientInf)
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
                    string userIdString = sara.platform.service.auth.Service.UserLogin1(userLoginNameString, userPasswordString);

                    if (userIdString == "0")
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "用户名和密码不符";
                    }
                    else
                    {
                        resultDic["result"] = "true";
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


        /// <summary>
        /// 修改用户头像
        /// </summary>
        /// <param name="userIdString"></param>
        /// <param name="newPassword"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateUserImg(string userIdString, string userImgString, string clientInf)
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
                    string parameterString = "";
                    parameterString += "u_phototurl:" + userImgString + ";";
                    if (sara.platform.service.auth.Service.UpdateUserAttr(userIdString, parameterString) == "1")
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "用户头像修改成功";
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "用户头像修改失败";
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

        /// <summary>
        /// 修改用户名
        /// </summary>
        /// <param name="userIdString"></param>
        /// <param name="userImgString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateUserName(string userIdString, string userNameString, string clientInf)
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


                    string parameterString = "";
                    parameterString += "u_name:" + userNameString + ";";
                    if (sara.platform.service.auth.Service.UpdateUserAttr(userIdString, parameterString) == "1")
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "用户名修改成功";
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "用户名修改失败";
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userLoginNameString"></param>
        /// <param name="userPasswordString"></param>
        /// <param name="userTypeString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RegisterUser(string userLoginNameString, string userPasswordString, string userNameString, string userTypeString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            string sql = "";
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
                    t = commonclass.commonclass.CreateIAccessDataTrans();
                    t.getTrans().begin();

                    #region t_user
                    sara.platform.operation.auth.idal.It_user _idal_t_user = new sara.platform.operation.auth.dal.oracledal.t_user();
                    sara.platform.operation.auth.model.t_user model = new platform.operation.auth.model.t_user();
                    model.u_id = "";
                    model.u_code = userLoginNameString;
                    model.u_pwd = sara.platform.service.auth.Service.PassWordEncrypt(userPasswordString);
                    model.u_name = userNameString;
                    model.u_state = "1";
                    model.u_registerdate = System.DateTime.Now;
                    model.u_usestate = "1";
                    model.u_lastlogintime = System.DateTime.Now;
                    model.u_remark = "";
                    switch (userTypeString)
                    {
                        case "1":
                            model.u_organid = "";//注册用户所在机构
                            break;
                        case "2":
                            model.u_organid = "5";//注册用户所在机构
                            break;
                        case "3":
                            model.u_organid = "";
                            break;
                    }

                    model.u_filedids = "";
                    model.u_ruleids = "";
                    model.u_signedurl = "";
                    model.u_phototurl = "";
                    model.f_value6 = userInfDic["devicetype"].ToString();
                    string userid = _idal_t_user.Add(model, t);
                    #endregion

                    //此处添加代码，给用户赋予app权限                 


                    sql = " insert into t_userfield_relation ";
                    sql += " (id, fg_id, u_id, remark) ";
                    sql += " values ";
                    sql += " (( select max(id) +1  from t_userfield_relation), '1010','" + userid + "', '')";
                    t.ExecuteSql(sql);


                    sql = " insert into t_usergroup_relation ";
                    sql += " (id, u_id, g_id, remark)";
                    sql += " values";
                    sql += " (( select max(id) +1  from t_usergroup_relation), '" + userid + "', '105', '')";//新闻 - 未登陆 - 可见

                    t.ExecuteSql(sql);

                    sql = " insert into t_usergroup_relation ";
                    sql += " (id, u_id, g_id, remark)";
                    sql += " values";
                    sql += " (( select max(id) +1  from t_usergroup_relation), '" + userid + "', '107', '')";//新闻 - 已登陆 - 可见

                    t.ExecuteSql(sql);

                    sql = " insert into t_usergroup_relation ";
                    sql += " (id, u_id, g_id, remark)";
                    sql += " values";
                    sql += " (( select max(id) +1  from t_usergroup_relation), '" + userid + "', '108', '')";//新闻 - 已登陆 - 评论

                    t.ExecuteSql(sql);


                    t.getTrans().commit();
                    resultDic["result"] = "true";
                    resultDic["message"] = userid;
                }
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }

                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="userLoginNameString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUserLoginNameCount(string userLoginNameString, string clientInf)
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
                    Eva.Library.Data.AccessData.IAccessData ia = commonclass.commonclass.CreateIAccessData();

                    string sql = "select count(*) from t_user where u_code = '" + userLoginNameString + "'";
                    string count = ia.GetSingle(sql).ToString();
                    resultDic["result"] = "true";
                    resultDic["message"] = count;
                }

            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        /// <summary>
        /// 通知手机端是否显示出验证码--因为短信不好使
        /// </summary>
        /// <param name="userLoginNameString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCheckNumber(string phoneNumberString, string clientInf)
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
                    Random ran = new Random();
                    int RandKey = ran.Next(100000, 999999);

                    resultDic["result"] = "true";
                    resultDic["message"] = Eva.Library.Configuration.ConfigurationManager.AppSettings["isShowCheckNumber"].ToString() + "-" + RandKey.ToString();
                }

            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
    }
}
