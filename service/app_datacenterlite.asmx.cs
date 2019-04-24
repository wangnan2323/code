using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Web.Script.Services;
using System.Text;
namespace sara.dd.ldsw.service
{
    /// <summary>
    /// app_datacenterlite 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_datacenterlite : System.Web.Services.WebService
    {

        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetCommonDataCross(string dataNameString, string whereString, string columnsString, string orderByString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetCommonData(dataNameString, whereString, columnsString, orderByString, pageSizeString, pageIndexString, clientInf);

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCommonData(string dataNameString, string whereString, string columnsString, string orderByString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            string message = "";
            Eva.Library.Data.AccessData.IAccessData ia = null;
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
                    whereString = Eva.Library.Format.FormatTextTool.TextReturn(whereString);
                    ia = commonclass.commonclass.CreateIAccessData();
                    columnsString = columnsString.Replace("^", ",");
                    StringBuilder strSql = new StringBuilder(100);
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
                        //strSql.Append(" order by sys_creatdate desc ");
                    }
                    else
                    {
                        strSql.Append(" order by " + Eva.Library.Format.FormatTextTool.TextReturn(orderByString));
                    }

                    strSql.Append(" ) a ");
                    strSql.Append(" ) b ");

                    if (pageSizeString != "" && pageSizeString != null && pageIndexString != "" && pageIndexString != null)
                    {
                        int fromInt = int.Parse(pageSizeString) * (int.Parse(pageIndexString) - 1) + 1;
                        int toInt = (int.Parse(pageSizeString) * (int.Parse(pageIndexString)));

                        strSql.Append(" where b.rn>='" + fromInt.ToString() + "'  and b.rn <='" + toInt.ToString() + "' ");
                    }


                    DataSet ds = ia.Query(strSql.ToString());
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string count = "0";
                        string countSql = "select count(1) from " + dataNameString;
                        if (whereString.Trim() != "")
                        {
                            countSql += " where " + whereString;
                        }
                        count = ia.GetSingle(countSql).ToString();
                        message = "{\"total\":\"" + count + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ds.Tables[0]) + "}";

                    }
                    else
                    {
                        message = "{\"total\":\"0\",\"rows\":[]}";
                    }


                    resultDic["result"] = "true";
                    resultDic["message"] = message;
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
        public void GetLayoutHtmlCross(string layoutNameString, string clientInf)
        {
            string result1 = this.GetLayoutHtml(layoutNameString, clientInf);

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetLayoutHtml(string layoutNameString, string clientInf)
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
                    string layout = Eva.Library.Configuration.ConfigurationManager.AppSettings["AppResourceRootPath"];
                    layout += "datacenterlitelayout/";
                    layout += layoutNameString;

                    string path = Eva.Library.Format.FormatTextTool.GetMapPath(layout, Server);
                    string layoutString = System.IO.File.ReadAllText(path);


                    resultDic["result"] = "true";
                    resultDic["message"] = layoutString.Replace("\r", "").Replace("\n", "");
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
