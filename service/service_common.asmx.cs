using Eva.Library.Data;
using System;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Collections.Generic;

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
    public class service_common : System.Web.Services.WebService
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
        public string GetIdText(string dataNameStr, string whereStr, string columsStr)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            string[] columns = (columsStr).Split('^');
            try
            {
                string sql = "select distinct " + string.Join(",", columns) + " from " + (dataNameStr) + ((whereStr) == "" ? "" : (" where " + (whereStr)));
                Eva.Library.Data.AccessData.IAccessData _ia = commonclass.commonclass.CreateIAccessData();
                DataSet ds = _ia.Query(sql);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    ds.Tables[0].Columns.Add("id");
                    ds.Tables[0].Columns.Add("text");
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        ds.Tables[0].Rows[i]["id"] = ds.Tables[0].Rows[i][columns[0]];
                        ds.Tables[0].Rows[i]["text"] = ds.Tables[0].Rows[i][columns[1]];
                    }
                    ds.Tables[0].Columns.Remove(columns[0]);
                    ds.Tables[0].Columns.Remove(columns[1]);
                    resultDic["result"] = "true";
                    resultDic["message"] = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ds.Tables[0]);
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "[]";
                }
            }
            catch (Exception e)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(e.Message);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataXml(string dataNameString, string whereString, string columnsString, string orderByString, string pageSizeString, string pageIndexString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            string message = "";

            try
            {
                string xmlPathString = Eva.Library.Configuration.ConfigurationManager.AppSettings["XmlPath"].ToString() + dataNameString;

                DataSet ds = new DataSet();
                ds.ReadXml(xmlPathString);


                if (whereString != "")
                {
                    DataRow[] drs = ds.Tables[0].Select((whereString));

                    if (drs.Length > 0)
                    {

                        DataTable dt1 = ds.Tables[0].Clone();

                        DataRow dra;

                        Eva.Library.Collection.NoRepeatingStringCollection removeColumns = new Eva.Library.Collection.NoRepeatingStringCollection();
                        foreach (DataRow dr in drs)
                        {
                            dra = dt1.NewRow();
                            foreach (DataColumn dc1 in ds.Tables[0].Columns)
                            {
                                if (columnsString.Trim() != "")
                                {
                                    if (("^" + columnsString + "^").IndexOf("^" + dc1.ColumnName + "^") > -1)
                                    {
                                        dra[dc1.ColumnName] = dr[dc1.ColumnName];
                                    }
                                    else
                                    {

                                        removeColumns.Add(dc1.ColumnName);
                                    }
                                }
                                else
                                {
                                    dra[dc1.ColumnName] = dr[dc1.ColumnName];
                                }

                            }
                            dt1.Rows.Add(dra);
                        }



                        foreach (string removeColumn in removeColumns)
                        {
                            if (removeColumn != "")
                            {
                                dt1.Columns.Remove(removeColumn);
                            }
                        }

                        DataTable dtc = GetDataTable(dt1, pageIndexString, pageSizeString);
                        message = "{\"total\":\"" + dt1.Rows.Count.ToString() + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dtc) + "}";

                    }
                    else
                    {
                        message = "{\"total\":\"0\",\"rows\":[]}";
                    }
                }
                else
                {

                    DataTable dtc = GetDataTable(ds.Tables[0], pageIndexString, pageSizeString);
                    message = "{\"total\":\"" + ds.Tables[0].Rows.Count.ToString() + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dtc) + "}";

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

        private DataTable GetDataTable(DataTable dt, string pageIndexString, string pageSizeString)
        {
            if (pageIndexString != "" && pageSizeString != "")
            {
                int from = (int.Parse(pageIndexString) - 1) * int.Parse(pageSizeString);
                int to = (int.Parse(pageIndexString)) * int.Parse(pageSizeString);

                if (to > dt.Rows.Count)
                {
                    to = dt.Rows.Count;
                }
                DataTable dtResult1 = dt.Clone();
                DataRow drResult1;
                for (int i = from; i < to; i++)
                {
                    drResult1 = dtResult1.NewRow();
                    foreach (DataColumn dc1 in dt.Columns)
                    {
                        drResult1[dc1.ColumnName] = dt.Rows[i][dc1.ColumnName];

                    }
                    dtResult1.Rows.Add(drResult1);

                }

                return dtResult1;

            }
            else
            {
                return dt;
            }

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCommonData(string dataNameString, string whereString, string columnsString, string orderByString, string pageSizeString, string pageIndexString)
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

                    if (pageSizeString != "" && pageSizeString != null && pageIndexString != "" && pageIndexString != null)
                    {
                        int fromInt = int.Parse(pageSizeString) * (int.Parse(pageIndexString) - 1) + 1;
                        int toInt = (int.Parse(pageSizeString) * (int.Parse(pageIndexString)));

                        strSql.Append(" where b.rn>='" + fromInt.ToString() + "'  and b.rn <='" + toInt.ToString() + "' ");
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
                        //发现少引号，怀疑是bug--sk
                        message += "\"" + key + "\":\"" + o.ToString() + "\",";
                    }
                    else
                    {
                        //发现少引号，怀疑是bug--sk
                        message += "\"" + key + "\":\"" + "" + "\",";
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
        public string QuerySqlsByAppcode(string sqlStringJson, string appcodeStr, string isShowAll)
        {

            _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectString_" + appcodeStr].ToString());

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
                    string sql = sqlStringDic[key];
                    if (isShowAll != "true")
                    {
                        sql = "select * from (" + (sql) + ") where rownum<1001";
                    }
                    ds = _iAccessData.Query(Eva.Library.Format.FormatTextTool.FormatSqlStrWidthIn1000(sql));

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



        #region 根据dataset生成报表
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CreatExcelByData(string dataJson)
        {

            return sara.dd.ldsw.commonclass.commonclass.CreatExcelByDataTable(Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(dataJson));

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CreatExcelBySqlAppcode(string sqlStr, string appcodeStr)
        {

            _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectString_" + appcodeStr].ToString());
            DataSet ds = _iAccessData.Query((sqlStr));
            return sara.dd.ldsw.commonclass.commonclass.CreatExcelByDataTable(ds.Tables[0]);
        }
        #endregion

        /// <summary>
        /// 为前台做代理，执行一些跨域webservice
        /// </summary>
        /// <param name="url">url^fname</param>
        /// <param name="args">arg1^arg2^arg3^...</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoWebServiceForJS(string url, string args)
        {
            //return sara.dd.ldsw.commonclass.CommonClazz.DoWebService(url, args);

            return sara.dd.ldsw.commonclass.webserviceadapter.DoWebService(url.Split('^')[0], url.Split('^')[1], args.Split('^')).ToString();
        }


        //获取最大业务表编号
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getBusinessNum(string typeid, string nodeid)
        {


            string num = sara.dd.ldsw.commonclass.commonclass.getBusinessNum(typeid, nodeid);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["message"] = num;
            resultDic["result"] = "true";

            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        //邮储银行接口用，IC查询请求
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ycICQuery(string khbh,int sl)
        {
           
            Dictionary<string, string> result = new Dictionary<string, string>();
            try
            {


                sara.dd.ldsw.idal.Itbl_ld_ickss _idal_tbl_ld_ickss = new sara.dd.ldsw.dal.tbl_ld_ickss();
                sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                List<sara.dd.ldsw.model.tbl_ld_ickss> modellist = _idal_tbl_ld_ickss.GetList(" f_khbh='" + khbh + "' and f_lyid='05930001' and f_ztid='1' and f_xkrq=(select max(f_xkrq) from tbl_ld_ickss where f_khbh='" + khbh + "' and f_lyid='05930001' and f_ztid='1' )", "false","","*","","",null);
                List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList(" f_khbh='" + khbh + "'", "", "*", "", "", null);

                if (modellist.Count > 0 && khmodellist.Count>0 )
                {
                    sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[0];
                    sara.dd.ldsw.model.tbl_ld_ickss model = modellist[0];
                    //判断购水量
                    if(sl == Eva.Library.Text.NumberTool.Parse(model.f_sl))
                    {


                        //客户存在并包含购水记录
                        result.Add("custname", khmodel.f_yhm);//用户名
                        result.Add("custaddr", khmodel.f_dz);//地址
                        double sf = Eva.Library.Text.NumberTool.Parse(model.f_sf);
                        double pwf = Eva.Library.Text.NumberTool.Parse(model.f_pwf);
                        result.Add("waterfee", Eva.Library.Text.NumberTool.GetNumberByLength(sf/sl,2));//水费单价
                        result.Add("wpafee", Eva.Library.Text.NumberTool.GetNumberByLength(pwf / sl, 2));//污水处理费单价
                        result.Add("watertype", khmodel.f_yslx);//用水类型
                        result.Add("lastcode", model.f_dkljgl);//读卡累积购量
                        result.Add("currcode", model.f_xkljgl);//写卡累积购量
                        result.Add("shouldAmt", model.f_shys);//总应收费用
                        result.Add("ret", "49");//应答码


                    }
                    else
                    {
                        //水量信息不正确
                        result.Add("ret", "54");//应答码
                    }


                }
                else
                {
                    //客户不存在
                    result.Add("ret", "54");//应答码
                }
                return Eva.Library.Format.FormatEntityTool.FormatDicToJson(result);
            }
            catch(Exception ex)
            {
                //程序异常
                result.Add("ret", "54");//应答码
                return Eva.Library.Format.FormatEntityTool.FormatDicToJson(result);
            }
            
        }


        //邮储银行接口用，IC销账请求
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ycICPay(string paynostr,string wdstr,string sfystr,string gmrq,string khbhstr,int sl,decimal je)
        {
            //50|0x03|160123456789012345|100300012696|980|2|2012235689456874538125|0820102031|082030394|0820190103

            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();

                string sql = "insert into TBL_LD_YCXZJL (f_lsh,f_wd,f_sfy,f_gmrq,f_khbh,f_gmsl,f_sfje,f_lx,sys_id) VALUES ('"+paynostr+"','"+wdstr+"','"+sfystr+"','"+gmrq+"','"+khbhstr+"','"+sl.ToString()+"','"+je.ToString()+"','IC',SEQ_TBL_LD_YCXZJL.nextval)";
                int ins = _iAccessData.ExecuteSql(sql);
                if(ins > 0)
                {



                    return "true";

                }
                else
                {



                    return "false";

                }
            }
            catch (Exception ex)
            {

                return "false";
            }



        }

        //邮储银行接口用，IC对账请求
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ycICReport(string receive)
        {
            //50|0x05|0123456789012345|20190103|wenjian|20190103133800
            string result = "";
            int resultlenth = 0;
            string token = receive.Split('|')[2];
            string dzrq = receive.Split('|')[3];
            string filename = receive.Split('|')[4];
            string time = receive.Split('|')[5];
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();

                string sql = "SELECT * FROM TBL_LD_YCXZJL WHERE F_LX='IC' AND F_GMRQ='"+dzrq+"'";
                DataTable dt = _iAccessData.Query(sql).Tables[0];
                int count = 1;
                int slcount = 0;
                int jecount = 0;
                string txtstr = "";

                for(int i = 0; i < dt.Rows.Count; i++)
                {
                    DataRow dr = dt.Rows[i];
                    txtstr += count++ + "|" + dr["f_lsh"] + "|" + dr["f_wd"] + "|" + dr["f_sfy"] + "|" + dr["f_gmrq"] + "|" + dr["f_khbh"] + "|" + dr["f_gmsl"] + "|" + dr["f_sfje"]+ "\r\n";
                    slcount += int.Parse(dr["f_gmsl"].ToString());
                    jecount += int.Parse(dr["f_sfje"].ToString());
                }
                count--;
                //导出文件
                txtstr = count+"|"+slcount+"|"+jecount+"\r\n" + txtstr;
                string path = Eva.Library.Configuration.ConfigurationManager.AppSettings["ExportJHTSRootPath"];
                string name = filename + Eva.Library.Text.NumberTool.GetNoRepeatNumber()+".txt";
                string downloadPath = Eva.Library.Format.FormatTextTool.GetMapPath((path + name), HttpContext.Current.Server);
                sara.dd.ldsw.commonclass.FileOperation.writeFile(downloadPath, txtstr);
                //接口类型代码
                result += "0x06|";
                resultlenth += 4;

                //返回码
                result += "1|";
                resultlenth += 1;

                //token
                result += token;
                resultlenth += token.Length;


                //报文长度
                result = resultlenth.ToString() + "|" + result;


                return result;
            }
            catch (Exception ex)
            {
                //响应编码
                result += "0x06|";
                resultlenth += 4;


                //返回码
                result += "2|";
                resultlenth += 1;

                //token
                result += token + "|";
                resultlenth += token.Length;


                //报文长度
                result = resultlenth.ToString() + "|" + result;
                return result;
            }



        }


        //邮储银行接口用，大用户查询请求
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ycDHQuery(string khbh)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();

                //判断该用户是否处于建行托收
                string sql = "select count(*) as count from TBL_LD_JFB  where f_lyid='08080002' and f_ztid='0' and f_khbh='" + khbh + "'";
                string count = _iAccessData.GetSingle(sql).ToString();

                if (Eva.Library.Text.NumberTool.Parse(count) > 0)
                {
                    //处于建行托收不能缴费
                    result["ret"] = "50";
                }
                else
                {
                    sara.dd.ldsw.idal.Itbl_ld_cbiao _idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
                    //sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    List<sara.dd.ldsw.model.tbl_ld_cbiao> modellist = _idal_tbl_ld_cbiao.GetList(" f_khbh='" + khbh + "' and f_ztid='2' and (f_cbbh like 'DH%' or f_cbbh like 'ZB%')", "false", "", "*", "", "", null);
                    //List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList(" f_khbh='" + khbh + "'", "", "*", "", "", null);

                    if (modellist.Count == 1)
                    {
                        sara.dd.ldsw.model.tbl_ld_cbiao model = modellist[0];


                        //客户名
                        result["custname"] = model.f_yhm;

                        //地址
                        result["custaddr"] = model.f_dz;


                        double bqje = Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                        string bqjestr = Eva.Library.Text.NumberTool.GetNumberByLength((bqje * 100), 0);
                        //应收金额
                        result["amount"] = model.f_bqje;


                        double sl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                        double sf = Eva.Library.Text.NumberTool.Parse(model.f_sf);
                        string sfstr = Eva.Library.Text.NumberTool.GetNumberByLength(sf * 100, 0);
                        double pwf = Eva.Library.Text.NumberTool.Parse(model.f_pwf);
                        string pwfstr = Eva.Library.Text.NumberTool.GetNumberByLength(pwf * 100, 0);
                        string sfdj = Eva.Library.Text.NumberTool.GetNumberByLength((sf / sl), 0);
                        string pwfdj = Eva.Library.Text.NumberTool.GetNumberByLength((pwf / sl), 0);

                        result["begincode"] = model.f_sqzm;
                        result["endcode"] = model.f_bqzm;
                        result["wateruse"] = model.f_bqsl;
                        result["wateramt"] = sfdj;
                        result["pwamt"] = pwfdj;
                        result["ret"] = "49";


                    }
                    else
                    {
                        //抄表记录不唯一
                        //返回码不存在
                        result["ret"] = "50";
                    }
                }

                return Eva.Library.Format.FormatEntityTool.FormatDicToJson(result);
            }
            catch (Exception ex)
            {
                //程序异常
                result["ret"] = "50";
                return Eva.Library.Format.FormatEntityTool.FormatDicToJson(result);
            }



        }

        //邮储银行接口用，大用户销账请求
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ycDHPay(string paynostr, string wdstr, string sfystr, string gmrq, string khbh, decimal je)
        {

            try
            {



                sara.dd.ldsw.idal.Itbl_ld_cbiao _idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
                sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
                List<sara.dd.ldsw.model.tbl_ld_cbiao> modellist = _idal_tbl_ld_cbiao.GetList(" f_khbh='" + khbh + "' and f_ztid='2' and (f_cbbh like 'DH%' or f_cbbh like 'ZB%')", "false", "", "*", "", "", null);
                List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = _idal_tbl_ld_khb.GetList(" f_khbh='" + khbh + "'", "", "*", "", "", null);

                if (modellist.Count == 1 && Eva.Library.Text.NumberTool.Parse(modellist[0].f_bqje)== (double)je)
                {
                    sara.dd.ldsw.model.tbl_ld_cbiao model = modellist[0];
                    sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[0];


                    #region 创建缴费记录
                    //时间信息
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                    dtFormat.ShortDatePattern = "yyyy/MM/dd";

                    System.DateTime currentTime = new System.DateTime();
                    currentTime = System.DateTime.Now;

                    DateTime blankTime = DateTime.Parse("1900-01-01");
                    sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                    //jfmodel.sys_id = int.Parse(idal_tbl_ld_jfb.GetMaxId(null));
                    jfmodel.sys_creatuserid = "1564";
                    jfmodel.sys_creatusername = "PBT";
                    jfmodel.sys_creatdate = currentTime;
                    jfmodel.sys_lastedituserid = "1564";
                    jfmodel.sys_lasteditusername = "PBT";
                    jfmodel.sys_lasteditdate = currentTime;
                    jfmodel.sys_deldate = blankTime;
                    jfmodel.sys_delflag = "0";
                    jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                    jfmodel.f_jfrq = currentTime;
                    jfmodel.f_jffs = "邮储代缴大用户";
                    jfmodel.f_jffsid = "05740014";
                    jfmodel.f_jcfs = "全额找零";
                    jfmodel.f_jcfsid = "05750001";
                    jfmodel.f_yyy = "PBT";
                    jfmodel.f_yyyid = "1564";
                    jfmodel.f_czsj = currentTime;
                    jfmodel.f_sfykfp = "false";
                    jfmodel.f_zt = "已提交";
                    jfmodel.f_ztid = "2";
                    jfmodel.f_khbh = khmodel.f_khbh;
                    jfmodel.f_khbhid = khmodel.sys_id.ToString();
                    jfmodel.f_yhbh = khmodel.f_yhbh;
                    jfmodel.f_yhbhid = khmodel.f_yhbhid;
                    jfmodel.f_yhm = khmodel.f_yhm;
                    jfmodel.f_jfm = khmodel.f_jfm;
                    jfmodel.f_dh = khmodel.f_dh;
                    jfmodel.f_dz = khmodel.f_dz;
                    jfmodel.f_dy = khmodel.f_dy;
                    jfmodel.f_dyid = khmodel.f_dyid;
                    jfmodel.f_sc = khmodel.f_sc;
                    jfmodel.f_scid = khmodel.f_scid;
                    jfmodel.f_qy = khmodel.f_qy;
                    jfmodel.f_qyid = khmodel.f_qyid;
                    jfmodel.f_pq = khmodel.f_pq;
                    jfmodel.f_pqid = khmodel.f_pqid;
                    jfmodel.f_sbbh = khmodel.f_sbbh;
                    jfmodel.f_sbbhid = khmodel.f_sbbhid;
                    jfmodel.f_sblx = khmodel.f_sblx;
                    jfmodel.f_sblxid = khmodel.f_sblxid;
                    jfmodel.f_yslx = khmodel.f_yslx;
                    jfmodel.f_yslxid = khmodel.f_yslxid;
                    jfmodel.f_lxtkhh = khmodel.f_lxth;
                    jfmodel.f_rs = khmodel.f_rs;
                    jfmodel.f_cbbh = model.f_cb_cbbh;
                    jfmodel.f_cbbhid = model.sys_id.ToString();
                    jfmodel.f_cbyslj = model.f_bqje;
                    jfmodel.f_sllj = model.f_bqsl;
                    jfmodel.f_sflj = model.f_sf;
                    jfmodel.f_pwflj = model.f_pwf;
                    jfmodel.f_dj = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj) / Eva.Library.Text.NumberTool.Parse(jfmodel.f_sllj), 2);
                    jfmodel.f_jmhyslj = model.f_bqje;
                    jfmodel.f_khytjjzsf = khmodel.f_tjjzsf;
                    jfmodel.f_khytjjzpwf = khmodel.f_tjjzpwf;
                    jfmodel.f_sfsytjjz = "false";
                    jfmodel.f_sytjjzsf = "0";
                    jfmodel.f_sytjjzpwf = "0";
                    jfmodel.f_syhtjjzsf = khmodel.f_tjjzsf;
                    jfmodel.f_syhtjjzpwf = khmodel.f_tjjzpwf;
                    jfmodel.f_khyye = khmodel.f_ycje;
                    jfmodel.f_sfsyye = "false";
                    jfmodel.f_syye = "0";
                    jfmodel.f_yhye = khmodel.f_ycje;
                    jfmodel.f_shys = model.f_bqje;
                    jfmodel.f_shss = model.f_bqje;
                    jfmodel.f_hszl = "0";
                    jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj)));
                    jfmodel.f_khfz = khmodel.f_khfz;
                    jfmodel.f_khfzid = khmodel.f_khfzid;
                    jfmodel.f_cbenbh = khmodel.f_cbbh;
                    jfmodel.f_cbenbhid = khmodel.f_cbbhid;
                    jfmodel.f_ljqf = khmodel.f_ljqf;
                    jfmodel.f_jmjelj = "0";
                    jfmodel.f_ly = "邮储银行缴费";
                    jfmodel.f_lyid = "08080008";
                    jfmodel.f_sfjl = model.f_sfjl;

                    //插入缴费表
                    string jfsysid = idal_tbl_ld_jfb.Add(jfmodel,null);


                    #endregion

                    #region 更新抄表表
                    model.f_zt = "已缴费";
                    model.f_ztid = "3";
                    model.f_jfbh = jfmodel.f_jfbh;
                    model.f_jfbhid = jfsysid;
                    model.f_jfsj = jfmodel.f_jfrq;
                    _idal_tbl_ld_cbiao.Update(model,"f_zt,f_ztid,f_jfbh,f_jfbhid,f_jfsj",null);
                    #endregion

                    #region 更新客户表
                    khmodel.f_ljqf = "0";
                    _idal_tbl_ld_khb.Update(khmodel, "f_ljqf", null);

                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = null;
                    temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ljqf");
                    temp.Add("oldvalue", khmodel.f_ljqf);
                    temp.Add("newvalue", "0");
                    temp.Add("name", "累计欠费");
                    array.Add(temp);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_jfb_detail", "邮储代缴大用户", array, "", null);
                    #endregion

                    #region 增加对账记录
                    _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();

                    string sql = "insert into TBL_LD_YCXZJL (f_lsh,f_wd,f_sfy,f_gmrq,f_khbh,f_gmsl,f_sfje,f_lx,sys_id) VALUES ('" + paynostr + "','" + wdstr + "','" + sfystr + "','" + gmrq + "','" + khbh + "','" + model.f_bqsl + "','" + je + "','DH',SEQ_TBL_LD_YCXZJL.nextval)";
                    int ins = _iAccessData.ExecuteSql(sql);

                    if (ins > 0)
                    {
                        return "true";
                    }
                    else
                    {
                        return "false";
                    }
                    #endregion

                    


                }
                else
                {
                    //销账状态
                    return "false";
                }

            }
            catch (Exception ex)
            {
                //程序异常

                return "error";
            }



        }


       

        #region business

        /// <summary>
        /// 验证附件大小
        /// </summary>
        /// <param name="menuids"></param>
        /// <param name="fileMaxSize">单位：b</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckFileSize(string menuids, string fileMaxSize)
        {
            _iAccessData = commonclass.commonclass.CreateIAccessData();

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            try
            {
                DataSet dsFile = _iAccessData.Query("select * from tbl_file_content where menuid in ('" + menuids.Replace("^", "','") + "')");

                string message = "";

                for (int i = 0; i < dsFile.Tables[0].Rows.Count; i++)
                {
                    if (Eva.Library.Text.NumberTool.Parse(dsFile.Tables[0].Rows[i]["filesize"].ToString()) > Eva.Library.Text.NumberTool.Parse(fileMaxSize))
                    {
                        message += "【" + dsFile.Tables[0].Rows[i]["filerealname"].ToString() + "】文件大于" + fileMaxSize + "，请注意修改<br/>";
                    }
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

        #endregion

        //short转byte[2]数组 
        public static byte[] shortToByte(short number)
        {
            int temp = number;
            byte[] b = new byte[2];

            for (int i = 0; i < b.Length; i++)
            {
                byte[] bitc = BitConverter.GetBytes(temp & 0xff);
                b[i] = bitc[0];//将最低位保存在最低位
                temp = temp >> 8; // 向右移8位 
            }
            return b;
        }

        //byte[2] 数组转short
        public static short byteToShort(byte[] b)
        {
            short s = 0;
            short s0 = (short)(b[0] & 0xff);// 最低位 
            short s1 = (short)(b[1] & 0xff);
            s1 <<= 8;
            s = (short)(s0 | s1);
            return s;
        }
    }
}
