using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.commonclass
{
    public class webserviceadapter
    {

        private static Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        #region 用户信息相关
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="sys_user_id"></param>
        /// <returns></returns>
        public static sara.dd.ldsw.model.userinfo GetUserInfoModel(string userIdString, string userInfoJsonString)
        {
            if (userInfoJsonString != "")
            {
                sara.dd.ldsw.model.userinfo userInfoModel = new sara.dd.ldsw.model.userinfo();

                IDictionary<string, string> userInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(userInfoJsonString);

                userInfoModel.sys_userid = userInfoDic["sys_userid"].ToString();
                userInfoModel.sys_username = userInfoDic["sys_username"].ToString();
                userInfoModel.sys_userloginname = userInfoDic["sys_userloginname"].ToString();

                userInfoModel.sys_organid = userInfoDic["sys_organid"].ToString();
                userInfoModel.sys_organcode = userInfoDic["sys_organcode"].ToString();
                userInfoModel.sys_organname = userInfoDic["sys_organname"].ToString();

                userInfoModel.sys_toporgan = userInfoDic["sys_toporgan"].ToString();
                userInfoModel.sys_toporganname = userInfoDic["sys_toporganname"].ToString();

                userInfoModel.sys_roles = userInfoDic["sys_roles"].ToString();
                userInfoModel.sys_rolenames = userInfoDic["sys_rolenames"].ToString();
                userInfoModel.sys_rolenameremarks = userInfoDic["sys_rolenameremarks"].ToString();

                userInfoModel.sys_positionids = userInfoDic["sys_positionids"].ToString();
                userInfoModel.sys_positionnames = userInfoDic["sys_positionnames"].ToString();

                userInfoModel.sys_fieldnames = userInfoDic["sys_fieldnames"].ToString();



                return userInfoModel;
            }
            else
            {

                sara.dd.ldsw.model.userinfo userInfoModel = new sara.dd.ldsw.model.userinfo();

                DataSet dsInf=null;
                DataSet dsOrg = null;
                DataSet dsRole = null;
                DataSet dsPosition = null;
                DataSet dsField = null;
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    dsInf = sara.platform.service.auth.Service.GetUserInfByUserid(userIdString);
                    dsOrg = sara.platform.service.auth.Service.GetUserOrganByUserid(userIdString);
                    dsRole = sara.platform.service.auth.Service.GetUserRoleByUserid(userIdString);
                    dsPosition = sara.platform.service.auth.Service.GetUserPositionByUserid(userIdString);
                    dsField = sara.platform.service.auth.Service.GetUserFieldByUserid(userIdString);
                }
                else
                {
                    dsInf = _ia.GetUserInfByUserid(userIdString);
                    dsOrg = _ia.GetUserOrganByUserid(userIdString);
                    dsRole = _ia.GetUserRoleByUserid(userIdString);
                    dsPosition = _ia.GetUserPositionByUserid(userIdString);
                    dsField = _ia.GetUserFieldByUserid(userIdString);
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

                userInfoModel.sys_userid = userIdString;
                userInfoModel.sys_username = dsInf.Tables[0].Rows[0]["U_Name"].ToString();
                userInfoModel.sys_userloginname = dsInf.Tables[0].Rows[0]["U_Code"].ToString();

                userInfoModel.sys_organid = dsOrg.Tables[0].Rows[0]["O_ID"].ToString();
                userInfoModel.sys_organcode = dsOrg.Tables[0].Rows[0]["O_CODE"].ToString();
                userInfoModel.sys_organname = dsOrg.Tables[0].Rows[0]["O_FullName"].ToString();

                userInfoModel.sys_toporgan = dsInf.Tables[0].Rows[0]["U_REMARK"].ToString();
                userInfoModel.sys_toporganname = ds_TopOrgan.Tables[0].Rows[0]["o_fullname"].ToString();

                userInfoModel.sys_roles = "";
                userInfoModel.sys_rolenames = "";
                userInfoModel.sys_rolenameremarks = "";
                for (int i = 0; i < dsRole.Tables[0].Rows.Count; i++)
                {
                    if ((dsRole.Tables[0].Rows[i]["r_sys_appcode"].ToString() == "") || ("," + dsRole.Tables[0].Rows[i]["r_sys_appcode"].ToString() + ",").IndexOf("," + Eva.Library.Configuration.ConfigurationManager.AppSettings["APPCODE"] + ",") > -1)
                    {
                        userInfoModel.sys_roles += "" + dsRole.Tables[0].Rows[i]["R_ID"].ToString() + "^";
                        userInfoModel.sys_rolenames += "" + dsRole.Tables[0].Rows[i]["R_NAME"].ToString() + "^";
                        userInfoModel.sys_rolenameremarks += "" + dsRole.Tables[0].Rows[i]["R_REMARK"].ToString().Replace(",", "|").Replace("，", "|") + "^";
                    }
                }
                userInfoModel.sys_roles = userInfoModel.sys_roles.TrimEnd('^');
                userInfoModel.sys_rolenames = userInfoModel.sys_rolenames.TrimEnd('^');
                userInfoModel.sys_rolenameremarks = userInfoModel.sys_rolenameremarks.TrimEnd('^');

                userInfoModel.sys_positionids = "";
                userInfoModel.sys_positionnames = "";
                for (int i = 0; i < dsPosition.Tables[0].Rows.Count; i++)
                {
                    if (dsRole.Tables[0].Rows[i]["r_sys_appcode"].ToString() == "" || ("," + dsPosition.Tables[0].Rows[i]["p_sys_appcode"].ToString() + ",").IndexOf("," + Eva.Library.Configuration.ConfigurationManager.AppSettings["APPCODE"] + ",") > -1)
                    {
                        userInfoModel.sys_positionids += "" + dsPosition.Tables[0].Rows[i]["p_id"].ToString() + "^";
                        userInfoModel.sys_positionnames += "" + dsPosition.Tables[0].Rows[i]["p_fullname"].ToString() + "^";
                    }
                }
                userInfoModel.sys_positionids = userInfoModel.sys_positionids.TrimEnd('^');
                userInfoModel.sys_positionnames = userInfoModel.sys_positionnames.TrimEnd('^');

                userInfoModel.sys_fieldnames = "";
                for (int i = 0; i < dsField.Tables[0].Rows.Count; i++)
                {
                    userInfoModel.sys_fieldnames = "" + dsField.Tables[0].Rows[i]["tablename"].ToString() + "^";
                }
                userInfoModel.sys_fieldnames = userInfoModel.sys_fieldnames.TrimEnd('^');

                return userInfoModel;
            }
        }


        /// <summary>
        /// 行政分区、图层，角色使用到的part-all模式layer_role_all
        /// </summary>
        /// <param name="userInfoModel"></param>
        /// <param name="allConfig"></param>
        /// <param name="partConfig"></param>
        /// <returns></returns>
        public static Eva.Library.Collection.NoRepeatingStringCollection GetUserRoleRemarkPartAll(sara.dd.ldsw.model.userinfo userInfoModel, string allConfig, string partConfig)
        {
            Eva.Library.Collection.NoRepeatingStringCollection resultIdsList = new Eva.Library.Collection.NoRepeatingStringCollection();
            
            List<string> userRolesList = userInfoModel.sys_roles.Split('^').ToList<string>();
            //图层ID/行政区域的备注
            List<string> resultRoleNameRemarksList = new List<string>();
            //用户具备的全部角色备注
            string[] userRoleNameRemarksArray = userInfoModel.sys_rolenameremarks.Split('^');

            //判断当前用户是否具备全图层角色
            if (("^" + userInfoModel.sys_roles + "^").IndexOf("^" + allConfig + "^") > -1)
            {
                int allResultIndex = userRolesList.IndexOf(allConfig);
                resultRoleNameRemarksList.Add(userRoleNameRemarksArray[allResultIndex].ToString());
            }
            else
            {
                string[] partResultIdArray = userInfoModel.sys_roles.Split('^');
                foreach (string partLayerIdString in partResultIdArray)
                {
                    if (("," + partConfig + ",").IndexOf("," + partLayerIdString + ",") > -1)
                    {
                        int roleResultIndex = userRolesList.IndexOf(partLayerIdString);
                        resultRoleNameRemarksList.Add(userRoleNameRemarksArray[roleResultIndex].ToString());
                    }
                }
            }

            foreach (string cc in resultRoleNameRemarksList)
            {
                string[] ccArray = cc.Split('|');

                foreach (string resultid in ccArray)
                {
                    if (resultid != "")
                    {
                        resultIdsList.Add(resultid);
                    }

                }
            }

            return resultIdsList;
        }

        #endregion


        #region 调用webservice

        /// <summary>
        /// 通用执行webservice方法，本项目所有webservice都走这个方法，方便统一调整
        /// </summary>
        /// <param name="url"></param>
        /// <param name="methordName"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public static object DoWebService(string url, string methordName, object[] args)
        {

            return Eva.Library.WebService.DynamicWebServices.InvokeWebService(url, methordName, args);
        }
        #endregion

    }
}