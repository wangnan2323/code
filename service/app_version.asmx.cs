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
    public class app_version : System.Web.Services.WebService
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        #region HTML
        /// <summary>
        /// 更新App的HTML文件
        /// </summary>
        /// <param name="version"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHtmlResource(string appVersionString, string htmlVersionString, string clientInf)
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
                    string currentVersion = "1.0.0";                   

                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string sqlString = "select f_htmlversion from tbl_app_version  where f_apptypeid = '" + userInfDic["devicetype"] + "'  and f_appversion = '" + appVersionString + "'";
                    DataSet ds = _iAccessData.Query(sqlString);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        currentVersion = ds.Tables[0].Rows[0]["f_htmlversion"].ToString();                      
                    }


                    if (currentVersion != htmlVersionString)
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = currentVersion;//版本号不一致，需要客户端调用下边方法，验证是哪个文件不一致

                    }
                    else
                    {                       
                        resultDic["result"] = "true";
                        resultDic["message"] = "true";//版本号一致
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
        public string GetHtmlFileVersion(string htmlVersionJsonString, string clientInf)
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

                    DataTable clientDataTable = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(htmlVersionJsonString);
                    sara.dd.ldsw.dal.tbl_app_version_html dal = new sara.dd.ldsw.dal.tbl_app_version_html();
                    DataTable serverDataTable = dal.GetDataTableForPC("", "", "f_htmlname,f_htmlversion", "", "", null);
                    DataTable resultDataTable = serverDataTable.Clone();
                    if (clientDataTable == null)
                    {
                        resultDataTable = serverDataTable;
                    }
                    else
                    {
                        for (int i = 0; i < serverDataTable.Rows.Count; i++)
                        {
                            //判断client中是否有，
                            DataRow[] drs = clientDataTable.Select(" f_htmlname = '" + serverDataTable.Rows[i]["f_htmlname"].ToString() + "'");

                            if (drs.Length > 0) //如果有
                            {
                                //判断是否版本相同
                                if (drs[0]["f_htmlversion"].ToString() != serverDataTable.Rows[i]["f_htmlversion"].ToString())
                                {
                                    DataRow dr = resultDataTable.NewRow();
                                    dr["f_htmlversion"] = serverDataTable.Rows[i]["f_htmlversion"].ToString();
                                    dr["f_htmlname"] = serverDataTable.Rows[i]["f_htmlname"].ToString();
                                    resultDataTable.Rows.Add(dr);
                                }
                            }
                            else //如果没有
                            {
                                DataRow dr = resultDataTable.NewRow();
                                dr["f_htmlversion"] = serverDataTable.Rows[i]["f_htmlversion"].ToString();
                                dr["f_htmlname"] = serverDataTable.Rows[i]["f_htmlname"].ToString();
                                resultDataTable.Rows.Add(dr);
                            }
                        }
                    }
                    resultDic["result"] = "true";
                    resultDic["message"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(resultDataTable);
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
        public string  GetHtmlFileString(string htmlNameString,string clientInf)
        {
            //Dictionary<string, string> resultDic = new Dictionary<string, string>();
            //resultDic["result"] = "";
            //resultDic["message"] = "";
            string resultString = "";
            try
            {
                IDictionary<String, String> userInfDic = commonclass.commonclass.CheckClientInf(clientInf);
                if (userInfDic == null)
                {
                    //resultDic["result"] = "false";
                    //resultDic["message"] = "客户端信息错误";
                }
                else
                {
                    string rootpath = Eva.Library.Format.FormatTextTool.GetMapPath(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppResourceRootPath"].ToString() + "html/", Server);
                    string str = sara.dd.ldsw.commonclass.FileOperation.ReadFile(rootpath + htmlNameString.Replace("\\", "/"));
                    str = str.Replace("\r\n", "《br//》").Replace("\r", "《br//》").Replace("\n", "《br//》");

                    //System.Threading.Thread.Sleep(2000);
                    //resultDic["result"] = "true";
                    //resultDic["message"] = str;
                    resultString = str;
                }
            }
            catch (Exception ex)
            {
                //resultDic["result"] = "error";
                //resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            //return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            return resultString;


        }      
        #endregion

        #region COLOR
        /// <summary>
        /// 更新App的Color文件
        /// </summary>
        /// <param name="version"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetColorResource(string appVersionString, string colorVersionString, string clientInf)
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
                    string rootpath = Eva.Library.Format.FormatTextTool.GetMapPath(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppResourceRootPath"].ToString() + "color/", Server);
                    string currentVersion = "1.0.1";
                    #region 读取最新版本号
                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string sqlString = "select f_colorversion from tbl_app_version  where f_apptypeid = '" + userInfDic["devicetype"] + "' and f_appversion = '" + appVersionString + "'";
                    object o = _iAccessData.GetSingle(sqlString);
                    if (o != null)
                    {
                        currentVersion = o.ToString();
                    }
                    #endregion
                    if (currentVersion != colorVersionString)
                    {
                        List<String> colorfiles = new List<String>();
                        sqlString = "select distinct(f_resourcename) as resourcename from tbl_app_version_color ";
                        DataSet ds = _iAccessData.Query(sqlString);
                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            colorfiles.Add(ds.Tables[0].Rows[i]["resourcename"].ToString());
                        }

                        sqlString = "select f_resourcename,f_resourcekey,f_resourcevalue from tbl_app_version_color";
                        ds = _iAccessData.Query(sqlString);


                        IList<IDictionary<string, string>> colorList = new List<IDictionary<string, string>>();

                        #region colorDic
                        foreach (string colorfile in colorfiles)
                        {

                            DataRow[] drs = ds.Tables[0].Select(" f_resourcename = '" + colorfile + "'");
                            Dictionary<string, string> colorContent = new Dictionary<string, string>();

                            for (int i = 0; i < drs.Length; i++)
                            {
                                colorContent[drs[i]["f_resourcekey"].ToString()] = drs[i]["f_resourcevalue"].ToString();
                            }
                            Dictionary<string, string> colorDic = new Dictionary<string, string>();
                            colorDic["name"] = colorfile;
                            colorDic["value"] = Eva.Library.Format.FormatEntityTool.FormatDicToJson(colorContent);
                            colorList.Add(colorDic);
                        }

                        #endregion


                        Dictionary<string, string> htmlResourceDic = new Dictionary<string, string>();
                        htmlResourceDic["version"] = currentVersion;
                        htmlResourceDic["content"] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(colorList);

                        string htmlResourceString = Eva.Library.Format.FormatEntityTool.FormatDicToJson(htmlResourceDic);

                        resultDic["result"] = "true";
                        resultDic["message"] = htmlResourceString;

                    }
                    else
                    {
                        Dictionary<string, string> htmlResourceDic = new Dictionary<string, string>();
                        htmlResourceDic["version"] = currentVersion;
                        htmlResourceDic["content"] = "";

                        string htmlResourceString = Eva.Library.Format.FormatEntityTool.FormatDicToJson(htmlResourceDic);
                        resultDic["result"] = "true";
                        resultDic["message"] = htmlResourceString;
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
        #endregion

        #region CODE
        /// <summary>
        /// 更新App的Color文件
        /// </summary>
        /// <param name="version"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCodeResource(string appVersionString, string codeVersionString, string clientInf)
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
                    string currentVersion = "1.0.1";


                    #region 读取最新版本号
                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string sqlString = "select f_codeversion from tbl_app_version  where f_apptypeid = '" + userInfDic["devicetype"] + "' and f_appversion = '" + appVersionString + "'";
                    object o = _iAccessData.GetSingle(sqlString);
                    if (o != null)
                    {
                        currentVersion = o.ToString();
                    }
                    #endregion

                    if (currentVersion != codeVersionString)
                    {
                        Dictionary<string, string> htmlResourceDic = new Dictionary<string, string>();
                        htmlResourceDic["version"] = currentVersion;
                        htmlResourceDic["content"] = Eva.Library.Format.FormatEntityTool.FormatDicToJson(GetCode("sara.dd.ldsw"));

                        string htmlResourceString = Eva.Library.Format.FormatEntityTool.FormatDicToJson(htmlResourceDic);

                        resultDic["result"] = "true";
                        resultDic["message"] = htmlResourceString;

                    }
                    else
                    {
                        Dictionary<string, string> htmlResourceDic = new Dictionary<string, string>();
                        htmlResourceDic["version"] = currentVersion;
                        htmlResourceDic["content"] = "";

                        string htmlResourceString = Eva.Library.Format.FormatEntityTool.FormatDicToJson(htmlResourceDic);
                        resultDic["result"] = "true";
                        resultDic["message"] = htmlResourceString;
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


        #region code

        private Dictionary<string, string> GetCode(string appname)
        {
            string sql = "select nodeid from t_code_menu where length(nodeid)=4 and appname='" + appname + "' and nodeoperpage = 'app' order by nodeid asc";
            var ia = commonclass.commonclass.CreateIAccessData();
            var ds = ia.Query(sql);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            if (ds != null && ds.Tables.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    string nodeid = ds.Tables[0].Rows[i]["nodeid"].ToString();
                    sql = "select count(1) from t_code_menu where parentnodeid='" + nodeid + "'";
                    object count_o = ia.GetSingle(sql);
                    if (count_o != null && count_o.ToString() != "" && count_o.ToString() != "0")
                    {
                        resultDic[nodeid] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(GetCode(appname, 8, nodeid));
                    }
                    else
                    {
                        sql = "select count(1) from t_code_content where parentnodeid='" + nodeid + "'";
                        count_o = ia.GetSingle(sql);
                        if (count_o != null && count_o.ToString() != "" && count_o.ToString() != "0")
                        {
                            resultDic[nodeid] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(GetContent(nodeid));
                        }
                    }
                }
            }
            return resultDic;
        }

        private IList<IDictionary<string, string>> GetCode(string appname, int currentnodeidlength, string parentnodeid)
        {
            IList<IDictionary<string, string>> resultDiclist = new List<IDictionary<string, string>>();
            Dictionary<string, string> resultDic = null;
            var ia = commonclass.commonclass.CreateIAccessData();
            int nextlevelnodeidlength = currentnodeidlength + 4;
            string sqlString = "select nodeid,nodename from t_code_menu where length(nodeid)='" + currentnodeidlength + "' and appname='" + appname + "'";
            if (parentnodeid != "")
            {
                sqlString += " and parentnodeid='" + parentnodeid + "'";
            }
            sqlString += "order by nodeid asc";
            var ds = ia.Query(sqlString);
            if (ds != null && ds.Tables.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    string key = ds.Tables[0].Rows[i]["nodeid"].ToString();
                    string value = ds.Tables[0].Rows[i]["nodename"].ToString();
                    resultDic = new Dictionary<string, string>();

                    resultDic["id"] = key;
                    resultDic["text"] = value;
                    string countSqlString = "select count(1) from t_code_menu where parentnodeid = '" + key + "'";
                    object count_o = ia.GetSingle(countSqlString);
                    if (count_o != null && count_o.ToString() != "" && count_o.ToString() != "0")
                    {
                        resultDic["child"] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(GetCode(appname, nextlevelnodeidlength, key));
                    }
                    else
                    {
                        countSqlString = "select count(1) from t_code_content where parentnodeid = '" + key + "'";
                        count_o = ia.GetSingle(countSqlString);
                        if (count_o != null && count_o.ToString() != "" && count_o.ToString() != "0")
                        {
                            resultDic["child"] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(GetContent(key));
                        }
                    }
                    resultDiclist.Add(resultDic);
                }
            }
            return resultDiclist;
        }
        private IList<IDictionary<string, string>> GetContent(string parentnodeid)
        {
            IList<IDictionary<string, string>> resultDiclist = new List<IDictionary<string, string>>();
            Dictionary<string, string> resultDic = null;
            string sqlString = "select nodevalue,nodename from t_code_content where parentnodeid='" + parentnodeid + "' order by nodeid asc";
            var ia = commonclass.commonclass.CreateIAccessData();
            var ds = ia.Query(sqlString);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                var key = ds.Tables[0].Rows[i]["nodevalue"].ToString();
                var value = ds.Tables[0].Rows[i]["nodename"].ToString();
                resultDic = new Dictionary<string, string>();
                resultDic["id"] = key;
                resultDic["text"] = value;
                resultDiclist.Add(resultDic);
            }

            return resultDiclist;
        }
        #endregion
        #endregion

        #region STATUS
        /// <summary>
        /// 获取app的状态：-1没有这个版本，1开发中的版本，2审核中的版本，3发布中的版本，4历史版本
        /// </summary>
        /// <param name="appVersionString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAppStatus(string appVersionString, string clientInf)
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
                    string currentVersion = "-1";

                    _iAccessData = commonclass.commonclass.CreateIAccessData();

                    string sqlString = "select f_appstatusid from tbl_app_version  where f_apptypeid = '" + userInfDic["devicetype"] + "' and f_appversion = '" + appVersionString + "'";

                    object o = _iAccessData.GetSingle(sqlString);
                    if (o != null)
                    {
                        currentVersion = o.ToString();
                    }
                    resultDic["result"] = "true";
                    resultDic["message"] = currentVersion;
                }
            }
            catch (Exception ex)
            {

                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);



        }
        #endregion



        /// <summary>
        /// 记录可能的崩溃信息
        /// </summary>
        /// <param name="appVersionString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddAndroidAppLog(string message, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessData = commonclass.commonclass.CreateIAccessData();

                if (message.Length > 2100)
                {
                    message = message.Substring(message.Length - 2100);
                }

                string sqlString = "insert into TBL_ANDROIDAPP_LOG (sys_id, message, clientinfo, sys_creatdate, value1, value2, value3, value4, value5)";
                sqlString += "values ((select nvl(max(sys_id),0)+1 from TBL_ANDROIDAPP_LOG), '" + message + "', '" + clientInf + "', sysdate, '', '', '', '', '')";

                _iAccessData.ExecuteSql(sqlString);

                resultDic["result"] = "true";
                resultDic["message"] = "";

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
