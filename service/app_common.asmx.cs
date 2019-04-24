using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_code 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_common : System.Web.Services.WebService
    {

        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetContentCollectionByMenuNodeIDs(string menuNodeIdsString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            string[] menuNodeIds = menuNodeIdsString.Split('^');
            string resultStr = "{";
            try
            {
                Eva.Library.ServiceAdapter.IAdapter.ICode _ic = Eva.Library.ServiceAdapter.AdapterFactory.CodeFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                for (int j = 0; j < menuNodeIds.Length; j++)
                {
                    DataSet ds = null;
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        ds = sara.platform.service.code.Service.GetContentCollectionByMenuNodeID(menuNodeIds[j]);
                    }
                    else
                    {
                        ds = _ic.GetContentCollectionByMenuNodeID(menuNodeIds[j]);
                    }
                    resultStr += "\"" + menuNodeIds[j] + "\":";
                    if (ds != null)
                    {
                        DataTable dt = new DataTable();
                        DataColumn dc = new DataColumn();
                        dc.ColumnName = "id";
                        dt.Columns.Add(dc);
                        dc = new DataColumn();
                        dc.ColumnName = "text";
                        dt.Columns.Add(dc);
                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = ds.Tables[0].Rows[i]["nodevalue"].ToString();
                            dr["text"] = ds.Tables[0].Rows[i]["nodename"].ToString();
                            dt.Rows.Add(dr);
                        }
                        resultStr += Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt) + ",";
                    }
                    else
                    {
                        resultStr += "[],";
                    }
                }
                resultStr = resultStr.TrimEnd(',');
                resultStr += "}";
                if (resultStr == "")
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "[]";
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = resultStr;
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
        public void GetContentCollectionByMenuNodeIDsCross(string menuNodeIdsString)
        {
            string result1 = this.GetContentCollectionByMenuNodeIDs(menuNodeIdsString);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCommonData(string dataNameString, string whereString, string columnsString, string orderByString, string countString, string stepString)
        {

            _iAccessData = commonclass.commonclass.CreateIAccessData();


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            string message = "";

            try
            {
                columnsString = columnsString.TrimStart('^').TrimEnd('^').Replace("^", ",");
                //whereString = (whereString);
                //orderByString = (orderByString);

                StringBuilder strSqlCount = new StringBuilder();

                strSqlCount.Append(" select count(*) from " + dataNameString + " t where");
                if (whereString.Trim() == "")
                {
                    strSqlCount.Append(" 1=1 ");
                }
                else
                {
                    strSqlCount.Append(" " + whereString);
                }
                string count = _iAccessData.GetSingle(strSqlCount.ToString()).ToString();

                if (count == "0" || count == "")
                {
                    message = "{\"total\":\"0\",\"rows\":[]}";
                }
                else
                {

                    StringBuilder strSql = new StringBuilder();

                    strSql.Append(" select " + columnsString + " from (");
                    strSql.Append(" select rownum rn,a.* from (");
                    strSql.Append(" select * from " + dataNameString + " t where");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }
                    if (orderByString.Trim() == "")
                    {

                    }
                    else
                    {
                        strSql.Append(" order by " + orderByString);
                    }

                    strSql.Append(" ) a ");
                    strSql.Append(" ) b ");


                    if (countString != "" && countString != null && stepString != "" && stepString != null)
                    {
                        strSql.Append(" where b.rn>'" + countString + "'  and b.rn <='" + (int.Parse(countString) + int.Parse(stepString)).ToString() + "' ");
                    }
                    DataTable resultDataTable = _iAccessData.Query(strSql.ToString()).Tables[0];
                    message = "{\"total\":\"" + count + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(resultDataTable) + "}";

                }

                resultDic["result"] = "true";
                resultDic["message"] = message;
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
        public void GetCommonDataCross(string dataNameString, string whereString, string columnsString, string orderByString, string countString, string stepString)
        {
            string result1 = this.GetCommonData(dataNameString, whereString, columnsString, orderByString, countString, stepString);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string QuerySqls(string sqlStringJson)
        {
            _iAccessData = commonclass.commonclass.CreateIAccessData();

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            string message = "";

            try
            {
                IDictionary<string, string> sqlStringDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(sqlStringJson);
                DataSet ds = null;
                foreach (string key in sqlStringDic.Keys)
                {

                    ds = _iAccessData.Query((sqlStringDic[key].ToString()));

                    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        message += "\"" + key + "\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ds.Tables[0]) + ",";
                    }
                    else
                    {
                        message += "\"" + key + "\":" + "[]" + ",";
                    }
                }


                resultDic["result"] = "true";
                resultDic["message"] = "{" + message.TrimEnd(',') + "}";
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
        public void QuerySqlsCross(string sqlStringJson)
        {
            string result1 = this.QuerySqls(sqlStringJson);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ExecuteSqls(string sqlStringJson)
        {
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans iAccessDataTrans = commonclass.commonclass.CreateIAccessDataTrans();

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            string message = "";
            try
            {
                iAccessDataTrans.getTrans().begin();
                IDictionary<string, string> sqlStringDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(sqlStringJson);
                foreach (string key in sqlStringDic.Keys)
                {
                    int resultNum = iAccessDataTrans.ExecuteSql((sqlStringDic[key].ToString()));
                    message += "\"" + key + "\":" + resultNum.ToString() + ",";
                }
                iAccessDataTrans.getTrans().commit();
                resultDic["result"] = "true";
                resultDic["message"] = "{" + message.TrimEnd(',') + "}";
            }
            catch (Exception ex)
            {
                iAccessDataTrans.getTrans().rollback();
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void ExecuteSqlsCross(string sqlStringJson)
        {
            string result1 = this.ExecuteSqls(sqlStringJson);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSingleSqls(string sqlStringJson)
        {
            _iAccessData = commonclass.commonclass.CreateIAccessData();
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            string message = "";
            try
            {
                IDictionary<string, string> sqlStringDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(sqlStringJson);

                foreach (string key in sqlStringDic.Keys)
                {
                    object o = _iAccessData.GetSingle((sqlStringDic[key].ToString()));

                    if (o != null)
                    {
                        message += "\"" + key + "\":" + o.ToString() + ",";
                    }
                    else
                    {
                        message += "\"" + key + "\":" + "" + ",";
                    }
                }

                resultDic["result"] = "true";
                resultDic["message"] = "{" + message.TrimEnd(',') + "}";
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
        public void GetSingleSqlsCross(string sqlStringJson)
        {
            string result1 = this.GetSingleSqls(sqlStringJson);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }



    }
}
