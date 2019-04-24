using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Reflection;
using Eva.Library.Data;
using System.Data;
using System.Web.Script.Serialization;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_commonselectuser 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class service_commonselectuser : System.Web.Services.WebService
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        /// <summary>
        /// 获取所有机构
        /// </summary>
        /// <param name="nodeid"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBaseCode(string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
          
            try
            {
                _iAccessData = commonclass.commonclass.CreateIAccessData();
                Dictionary<string, string> messageDic = new Dictionary<string, string>();
                string appcode = Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"].ToString();
                string sqlString = "";

                #region organ
                sqlString = "  select o_fullname as text,o_id as id,o_nodeid as nodeid from t_organ where o_state = '1' order by o_nodeid";
                DataTable organDataTable = _iAccessData.Query(sqlString).Tables[0];
                string tempText = "";
                string nodeid = "";
                DataRow[] drs = null;
                foreach (DataRow dr in organDataTable.Rows)
                {
                    tempText = dr["text"].ToString();
                    nodeid = dr["nodeid"].ToString();

                    while (nodeid.Length > 4)
                    {
                        nodeid = nodeid.Substring(0, nodeid.Length - 4);
                        drs = organDataTable.Select("nodeid='" + nodeid + "'");
                        tempText = drs[0]["text"].ToString() + "-" + tempText;
                    }
                    dr["text"] = tempText;
                }
                messageDic["organ"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(organDataTable);
                #endregion

                #region role
                sqlString = "select r_name as text ,r_id as id from t_role where ( r_sys_appcode is null or r_sys_appcode = '" + appcode + "') and r_state = '1'";
                DataTable roleDataTable = _iAccessData.Query(sqlString).Tables[0];
                messageDic["role"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(roleDataTable);
                #endregion

                #region usergroup
                sqlString = "select g_name as text ,g_id as id from t_usergroup where ( g_sys_appcode is null or g_sys_appcode = '" + appcode + "') and g_state = '1'";
                DataTable usergroupDataTable = _iAccessData.Query(sqlString).Tables[0];
                messageDic["usergroup"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(usergroupDataTable);
                #endregion

                #region position
                sqlString = "select p_fullname as text ,p_id as id from t_position where ( p_sys_appcode is null or p_sys_appcode = '" + appcode + "') and p_state = '1'";
                DataTable positionDataTable = _iAccessData.Query(sqlString).Tables[0];
                messageDic["position"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(positionDataTable);
                #endregion

                resultDic["message"] = Eva.Library.Format.FormatEntityTool.FormatDicToJson(messageDic);
                resultDic["result"] = "true";


                 
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
        public string GetUserNames(string queryParameter, string whereClause, string queryType,string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            
            string sqlString = "";
            DataTable resultDataTable = null;
            try
            {
                _iAccessData = commonclass.commonclass.CreateIAccessData();

                Dictionary<string, string> messageDic = new Dictionary<string, string>();                

                switch(queryType)
                {
                    case "role":
                        
                        {
                            sqlString = "select wm_concat(u.u_id) as userid, wm_concat(u.u_name) as username,wm_concat(u.u_phototurl) as phototurl from t_userrole_relation r, t_user u where r.r_id in ('" + queryParameter.Replace("^", "','") + "') and r.u_id = u.u_id and u.u_state = '1'";

                            if (whereClause != "")
                            {
                                sqlString += " and u.u_id in (" + whereClause + ") ";
                            }
                            resultDataTable = _iAccessData.Query(sqlString).Tables[0];

                            if(resultDataTable.Rows.Count>0)
                            {
                                messageDic["userids"] = resultDataTable.Rows[0]["userid"].ToString().Replace(",", "^");
                                messageDic["usernames"] = resultDataTable.Rows[0]["username"].ToString().Replace(",", "^");
                                messageDic["phototurls"] = resultDataTable.Rows[0]["phototurl"].ToString().Replace(",", "^");
                            }

                       
                        }
                        break;
                    case "organ":
                        {
                            sqlString = "select wm_concat(u.u_id) as userid,wm_concat(u.u_name) as username,wm_concat(u.u_phototurl) as phototurl  from t_user u where u.u_organid in ('" + queryParameter.Replace("^", "','") + "') and u.u_state = '1'";

                            if (whereClause != "")
                            {
                                sqlString += " and u.u_id in (" + whereClause + ") ";
                            }
                            resultDataTable = _iAccessData.Query(sqlString).Tables[0];

                            if (resultDataTable.Rows.Count > 0)
                            {
                                messageDic["userids"] = resultDataTable.Rows[0]["userid"].ToString().Replace(",", "^");
                                messageDic["usernames"] = resultDataTable.Rows[0]["username"].ToString().Replace(",", "^");
                                messageDic["phototurls"] = resultDataTable.Rows[0]["phototurl"].ToString().Replace(",", "^");
                            }
                        }
                        break;
                    case "usergroup":
                        {
                            sqlString = " select wm_concat(u.u_id) as userid, wm_concat(u.u_name) as username,wm_concat(u.u_phototurl) as phototurl  from t_usergroup_relation r, t_user u where r.g_id in ('" + queryParameter.Replace("^", "','") + "') and r.u_id = u.u_id and u.u_state = '1'";

                            if (whereClause != "")
                            {
                                sqlString += " and u.u_id in (" + whereClause + ") ";
                            }
                            resultDataTable = _iAccessData.Query(sqlString).Tables[0];

                            if (resultDataTable.Rows.Count > 0)
                            {
                                messageDic["userids"] = resultDataTable.Rows[0]["userid"].ToString().Replace(",", "^");
                                messageDic["usernames"] = resultDataTable.Rows[0]["username"].ToString().Replace(",", "^");
                                messageDic["phototurls"] = resultDataTable.Rows[0]["phototurl"].ToString().Replace(",", "^");
                            }
                        }
                        break;
                    case "username":
                        {
                            sqlString = "select wm_concat(u.u_id) as userid,wm_concat(u.u_name) as username,wm_concat(u.u_phototurl) as phototurl  from t_user u where u.u_name like '%" + queryParameter + "%' and u.u_state = '1'";
                            if (whereClause != "")
                            {
                                sqlString += " and u.u_id in ("+ whereClause + ") ";
                            }
                            //sqlString += " and u.u_id in (select r.u_id from t_userrole_relation r where r.r_id='2019') ";
                            resultDataTable = _iAccessData.Query(sqlString).Tables[0];

                            if (resultDataTable.Rows.Count > 0)
                            {
                                messageDic["userids"] = resultDataTable.Rows[0]["userid"].ToString().Replace(",", "^");
                                messageDic["usernames"] = resultDataTable.Rows[0]["username"].ToString().Replace(",", "^");
                                messageDic["phototurls"] = resultDataTable.Rows[0]["phototurl"].ToString().Replace(",", "^");
                            }
                        }
                        break;
                    case "position":
                        {
                            sqlString = "select wm_concat(u.u_id) as userid, wm_concat(u.u_name) as username,wm_concat(u.u_phototurl) as phototurl  from t_userposition_relation r, t_user u where r.p_id in ('" + queryParameter.Replace("^", "','") + "') and r.u_id = u.u_id and u.u_state = '1'";
                            if (whereClause != "")
                            {
                                sqlString += " and u.u_id in (" + whereClause + ") ";
                            }
                            resultDataTable = _iAccessData.Query(sqlString).Tables[0];

                            if (resultDataTable.Rows.Count > 0)
                            {
                                messageDic["userids"] = resultDataTable.Rows[0]["userid"].ToString().Replace(",", "^");
                                messageDic["usernames"] = resultDataTable.Rows[0]["username"].ToString().Replace(",", "^");
                                messageDic["phototurls"] = resultDataTable.Rows[0]["phototurl"].ToString().Replace(",", "^");
                            }
                        }
                        break;

                }

                resultDic["message"] = Eva.Library.Format.FormatEntityTool.FormatDicToJson(messageDic);
                resultDic["result"] = "true";



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
