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
using System.Data;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_report 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_report : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_report _idal_tbl_ld_report = new sara.dd.ldsw.dal.tbl_ld_report();
        private sara.dd.ldsw.reportclass.tbl_ld_report tt = new sara.dd.ldsw.reportclass.tbl_ld_report();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_report model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_report>(json);
                model.f_zbsj = DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;




                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_report.Add(model, null);

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

        //用水量排名报表
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetReport(string cxrqfrom, string cxrqto, string yslfrom, string yslto, string pm)
        {
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            DateTime from = Convert.ToDateTime(cxrqfrom);
            DateTime to = Convert.ToDateTime(cxrqto);
            string wherestr = "";

            if (cxrqfrom != null && cxrqfrom != "")
            {
                wherestr += " and f_cbsj >= to_date('" + cxrqfrom + "','yyyy-mm-dd hh24:mi:ss')";
            }

            if (cxrqto != null && cxrqto != "")
            {
                wherestr += " and f_cbsj <=to_date('" + cxrqto + "','yyyy-mm-dd hh24:mi:ss')";
            }

            if (yslfrom != null && yslfrom != "")
            {
                wherestr += " and f_bqsl >=" + yslfrom;
            }

            if (yslto != null && yslto != "")
            {
                wherestr += " and f_bqsl <=" + yslto;
            }

            string sql = "select d.*,TRUNC(d.yszje/d.yssl,2) as dj,(select NVL(sum(f_bqje),0) from tbl_ld_cbiao where f_yhm=d.f_yhm and f_ztid='3' " + wherestr + ") as sszje from (select rownum as rn,t.* from (select f_yhm,NVL(sum(f_bqje),0) as yszje,NVL(sum(f_sf),0) as yssf,NVL(sum(f_pwf),0) as yspwf,NVL(sum(f_bqsl),0) as yssl from tbl_ld_cbiao where 1=1 " + wherestr + " group by f_yhm order by yssl desc) t) d";

            if (pm != null && pm != "")
            {
                sql += " where rn<=" + pm;
            }
            else
            {
                sql += " where rn<=20";
            }


            DataSet ds = new DataSet();
            DataTable resultDataTable = new DataTable();
            ds = _iAccessData.Query(sql);
            if (ds.Tables.Count > 0)
            {
                DataTable tempDataTable = ds.Tables[0];
                int total = tempDataTable.Rows.Count;
                resultDataTable = tempDataTable.Clone();
                //分析玖龙纸业
                //淡化水查询
                sql = "select count(*) as count from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl not like '3.97^0^%' " + wherestr;
                string count1 = _iAccessData.GetSingle(sql).ToString();

                //粗制水查询
                sql = "select count(*) as count from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl like '3.97^0^%' " + wherestr;
                string count2 = _iAccessData.GetSingle(sql).ToString();

                if (count1 == "0" || count2 == "0")
                {
                    //玖龙单水价
                    resultDataTable = tempDataTable;
                }
                else
                {
                    //玖龙多水价
                    for (int i = 0; i < tempDataTable.Rows.Count; i++)
                    {
                        if (tempDataTable.Rows[i]["f_yhm"].ToString() == "玖龙纸业(天津)有限公司")
                        {
                            sql = "select d.*,'6.996' as dj,(select NVL(sum(f_bqje),0) from tbl_ld_cbiao where f_yhm=d.f_yhm and f_ztid='3' and f_yhm='玖龙纸业(天津)有限公司' and f_sfjl not like '3.97^0^%' " + wherestr + ") as sszje from (select '" + (i + 1) + "' as rn,t.* from (select f_yhm,NVL(sum(f_bqje),0) as yszje,NVL(sum(f_sf),0) as yssf,NVL(sum(f_pwf),0) as yspwf,NVL(sum(f_bqsl),0) as yssl from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl not like '3.97^0^%' " + wherestr + " group by f_yhm) t) d";
                            DataTable dt1 = _iAccessData.Query(sql).Tables[0];

                            DataRow newrow1 = dt1.Rows[0];
                            resultDataTable.Rows.Add(newrow1.ItemArray);


                            sql = "select d.*,'3.97' as dj,(select NVL(sum(f_bqje),0) from tbl_ld_cbiao where f_yhm=d.f_yhm and f_ztid='3' and f_yhm='玖龙纸业(天津)有限公司' and f_sfjl like '3.97^0^%' " + wherestr + ") as sszje from (select '" + (i + 1) + "' as rn,t.* from (select f_yhm,NVL(sum(f_bqje),0) as yszje,NVL(sum(f_sf),0) as yssf,NVL(sum(f_pwf),0) as yspwf,NVL(sum(f_bqsl),0) as yssl from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl like '3.97^0^%' " + wherestr + " group by f_yhm) t) d";
                            DataTable dt2 = _iAccessData.Query(sql).Tables[0];

                            DataRow newrow2 = dt2.Rows[0];
                            resultDataTable.Rows.Add(newrow2.ItemArray);
                        }
                        else
                        {
                            DataRow newrow = tempDataTable.Rows[i];
                            resultDataTable.Rows.Add(newrow.ItemArray);
                        }
                    }
                }
                resultDic["result"] = "true";
                resultDic["message"] = "{\"total\":\"" + total.ToString() + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(resultDataTable) + "}";


            }
            else
            {

                resultDic["result"] = "true";
                resultDic["message"] = "{\"total\":\"0\",\"rows\":[]}";

            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        //导出用水量排名报表
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ExportReport(string cxrqfrom, string cxrqto, string yslfrom, string yslto, string pm)
        {
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            DateTime from = Convert.ToDateTime(cxrqfrom);
            DateTime to = Convert.ToDateTime(cxrqto);
            string wherestr = "";

            if (cxrqfrom != null && cxrqfrom != "")
            {
                wherestr += " and f_cbsj >= to_date('" + cxrqfrom + "','yyyy-mm-dd hh24:mi:ss')";
            }

            if (cxrqto != null && cxrqto != "")
            {
                wherestr += " and f_cbsj <=to_date('" + cxrqto + "','yyyy-mm-dd hh24:mi:ss')";
            }

            if (yslfrom != null && yslfrom != "")
            {
                wherestr += " and f_bqsl >=" + yslfrom;
            }

            if (yslto != null && yslto != "")
            {
                wherestr += " and f_bqsl <=" + yslto;
            }

            string sql = "select d.rn,d.f_yhm,TRUNC(d.yszje/d.yssl,2) as dj,d.yszje,d.yspwf,d.yssf,d.yssl,(select NVL(sum(f_bqje),0) from tbl_ld_cbiao where f_yhm=d.f_yhm and f_ztid='3' " + wherestr + ") as sszje from (select rownum as rn,t.* from (select f_yhm,NVL(sum(f_bqje),0) as yszje,NVL(sum(f_sf),0) as yssf,NVL(sum(f_pwf),0) as yspwf,NVL(sum(f_bqsl),0) as yssl from tbl_ld_cbiao where 1=1 " + wherestr + " group by f_yhm order by yssl desc) t) d";

            if (pm != null && pm != "")
            {
                sql += " where rn<=" + pm;
            }
            else
            {
                sql += " where rn<=20";
            }


            DataSet ds = new DataSet();
            DataTable resultDataTable = new DataTable();
            ds = _iAccessData.Query(sql);
            if (ds.Tables.Count > 0)
            {
                DataTable tempDataTable = ds.Tables[0];
                int total = tempDataTable.Rows.Count;
                resultDataTable = tempDataTable.Clone();
                //分析玖龙纸业
                //淡化水查询
                sql = "select count(*) as count from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl not like '3.97^0^%' " + wherestr;
                string count1 = _iAccessData.GetSingle(sql).ToString();

                //粗制水查询
                sql = "select count(*) as count from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl like '3.97^0^%' " + wherestr;
                string count2 = _iAccessData.GetSingle(sql).ToString();

                if (count1 == "0" || count2 == "0")
                {
                    //玖龙单水价
                    resultDataTable = tempDataTable;
                }
                else
                {
                    //玖龙多水价
                    for (int i = 0; i < tempDataTable.Rows.Count; i++)
                    {
                        if (tempDataTable.Rows[i]["f_yhm"].ToString() == "玖龙纸业(天津)有限公司")
                        {
                            sql = "select d.rn,d.f_yhm,'6.996' as dj,d.yszje,d.yspwf,d.yssf,d.yssl,(select NVL(sum(f_bqje),0) from tbl_ld_cbiao where f_yhm=d.f_yhm and f_ztid='3' and f_yhm='玖龙纸业(天津)有限公司' and f_sfjl not like '3.97^0^%' " + wherestr + ") as sszje from (select '" + (i + 1) + "' as rn,t.* from (select f_yhm,NVL(sum(f_bqje),0) as yszje,NVL(sum(f_sf),0) as yssf,NVL(sum(f_pwf),0) as yspwf,NVL(sum(f_bqsl),0) as yssl from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl not like '3.97^0^%' " + wherestr + " group by f_yhm) t) d";
                            DataTable dt1 = _iAccessData.Query(sql).Tables[0];

                            DataRow newrow1 = dt1.Rows[0];
                            resultDataTable.Rows.Add(newrow1.ItemArray);


                            sql = "select d.rn,d.f_yhm,'3.97' as dj,d.yszje,d.yspwf,d.yssf,d.yssl,(select NVL(sum(f_bqje),0) from tbl_ld_cbiao where f_yhm=d.f_yhm and f_ztid='3' and f_yhm='玖龙纸业(天津)有限公司' and f_sfjl like '3.97^0^%' " + wherestr + ") as sszje from (select '" + (i + 1) + "' as rn,t.* from (select f_yhm,NVL(sum(f_bqje),0) as yszje,NVL(sum(f_sf),0) as yssf,NVL(sum(f_pwf),0) as yspwf,NVL(sum(f_bqsl),0) as yssl from tbl_ld_cbiao where f_yhm='玖龙纸业(天津)有限公司' and f_sfjl like '3.97^0^%' " + wherestr + " group by f_yhm) t) d";
                            DataTable dt2 = _iAccessData.Query(sql).Tables[0];

                            DataRow newrow2 = dt2.Rows[0];
                            resultDataTable.Rows.Add(newrow2.ItemArray);
                        }
                        else
                        {
                            DataRow newrow = tempDataTable.Rows[i];
                            resultDataTable.Rows.Add(newrow.ItemArray);
                        }
                    }
                }
                string column = "rn,f_yhm,dj,yszje,yspwf,yssf,yssl,sszje";
                string columnname = "排名,用户名,单价,应收总金额,应收排污费,应收水费,应收水量,实收总金额";
                string file = tt.ReportExcel(resultDataTable, column, columnname);
                resultDic["result"] = "true";
                resultDic["message"] = file;


            }
            else
            {

                resultDic["result"] = "true";
                resultDic["message"] = "";

            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddCross(string json, string clientInf)
        {
            string result1 = this.Add(json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddList(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                List<sara.dd.ldsw.model.tbl_ld_report> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_report>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_report.AddList(modellist, null);

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
        public void AddListCross(string json, string clientInf)
        {
            string result1 = this.AddList(json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Update(string updateType, string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columns = FormatColumns(columns).Replace("^", ",");
                sara.dd.ldsw.model.tbl_ld_report model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_report>(json);
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                model.sys_lasteditdate = DateTime.Now;
                string message = "";
                switch (updateType)
                {
                    case "rollback":

                        model.f_content = "";
                        message = _idal_tbl_ld_report.Update(model, columns, null);
                        #region 数据报表回滚日志
                        List<IDictionary<string, string>> array1 = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp1 = null;
                        temp1 = new Dictionary<string, string>();
                        temp1.Add("key", "rollback");
                        temp1.Add("oldvalue", "报表名称： " + model.f_bbmc + " 制表人：" + model.f_zbr);
                        temp1.Add("newvalue", "");
                        temp1.Add("name", model.f_bblx + "回滚");
                        array1.Add(temp1);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_report", model.sys_id.ToString(), "tbl_ld_report_modallist", "数据报表回滚", array1, clientInf, null);
                        #endregion
                        break;
                    default:
                        IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                        string userid = clientInfoDic["userid"];
                        string username = clientInfoDic["username"];

                        switch (model.f_bblxid)
                        {
                            case "08110001"://日结账报表
                                {

                                    DataTable dt = Get08110001(model.f_zbrid, model.f_zbsj, model.f_value4, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110002"://经管部日结账报表
                                {
                                    DataTable dt = Get08110002(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110003"://用户情况年度汇总表
                                {
                                    DataTable dt = Get08110003(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110004"://年度销售收入情况表
                                {
                                    DataTable dt = Get08110004(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110005"://商业用水欠费统计表
                                {
                                    DataTable dt = Get08110005(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110006"://水表更换情况年度统计表
                                {
                                    DataTable dt = Get08110006(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110007"://收费情况年度统计表
                                {
                                    DataTable dt = Get08110007(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110008"://日结算报表
                                {
                                    DataTable dt = Get08110008(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110009"://节水办用户明细表
                                {
                                    DataTable dt = Get08110009(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110010"://节水办用户信息变更明细表
                                {
                                    DataTable dt = Get08110010(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110011"://月销售情况统计表
                                {
                                    DataTable dt = Get08110011(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110012"://年水量及销售收入情况分析表
                                {
                                    DataTable dt = Get08110012(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110013"://年居民水量情况分析表
                                {
                                    DataTable dt = Get08110013(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;
                            case "08110014"://年销售水量情况汇总表
                                {
                                    DataTable dt = Get08110014(model.f_zbrid, model.f_zbsj, _iAccessData);
                                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                                    if (columns.IndexOf(",f_content,") < 0)
                                    {
                                        columns += ",f_content";
                                    }
                                    message = model.f_content;
                                    _idal_tbl_ld_report.Update(model, columns, null);
                                }
                                break;

                        }

                        break;





                }



                resultDic["result"] = "true";
                resultDic["message"] = message;

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

        private DataTable Get08110014(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //12个月的列和总计的列
            for (int j = 1; j <= 12; j++)
            {
                reportdt.Columns.Add("yssl" + j, System.Type.GetType("System.String"));//应收水量
                reportdt.Columns.Add("sssl" + j, System.Type.GetType("System.String"));//实收水量
                reportdt.Columns.Add("rate" + j, System.Type.GetType("System.String"));//所占比率
                reportdt.Columns.Add("qssl" + j, System.Type.GetType("System.String"));//欠收水量

            }

            reportdt.Columns.Add("yssl13", System.Type.GetType("System.String"));//应收水量
            reportdt.Columns.Add("sssl13", System.Type.GetType("System.String"));//实收水量

            reportdt.Columns.Add("qssl13", System.Type.GetType("System.String"));//欠收水量
            reportdt.Columns.Add("rate13", System.Type.GetType("System.String"));//所占比率


            //reportdt.Rows[0] 总表4.2
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[1] 总表3.95
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[2] 卡表3.95
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[3] 卡表6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[4] 远传表3.95
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[5] 入户直收3.95
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[6] 入户直收5.25
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[7] 入户直收7.05
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[8] 居民水量合计
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[9] 大客户A区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[10] 大客户A区4.6
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[11] 大客户B区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[12] 大客户B区4.6
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[13] 大客户C区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[14] 大客户C区4.6
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[15] 大客户E区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[16] 大客户F区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[17] 大客户G区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[18] 大客户G区4.6
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[19] 大客户H区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[20] 大客户I区5.55
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[21] 大客户I区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[22] 大客户J区4.85
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[23] 大客户J区6.5
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[24] 大客户J区6.45
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[25] 大客户合计
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[26] 玖龙粗制水
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[27] 玖龙淡化水
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");

            //reportdt.Rows[28] 玖龙合计
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");
            //reportdt.Rows[29] 总计
            reportdt.Rows.Add("0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0%", "0", "0", "0", "0", "0%");


            //循环12个月
            for (int i = 1; i <= 13; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                if (i < 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }
                else if (i == 13)
                {
                    datastart = new DateTime(zbsj.Year, 1, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }
                //时间区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";


                #region 居民部分
                //获取基础数据
                //总表4.2
                string sql = "select (select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao a";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4058,%'";
                sql += " and f_sfjl like '4.2%'";
                sql += " and f_cbsj " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4058,%'";
                sql += " and f_sfjl like '4.2%'";
                sql += " and f_cbsj " + czsjwhere;
                sql += " and f_jfsj " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";
                //总表3.95
                sql += "select (select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao a";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4058,%'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_cbsj " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4058,%'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_cbsj " + czsjwhere;
                sql += " and f_jfsj " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";

                //卡表3.95
                sql += "select (select sum(f_sl)";
                sql += " from tbl_ld_ickss a";
                sql += " where f_yslxid = '2'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_xiekrq " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_sl)";
                sql += " from tbl_ld_ickss";
                sql += " where f_yslxid = '2'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_xiekrq " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";


                //卡表6.5
                sql += "select (select sum(f_sl)";
                sql += " from tbl_ld_ickss a";
                sql += " where f_yslxid = '2'";
                sql += " and f_sfjl like '6.5%'";
                sql += " and f_xiekrq " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_sl)";
                sql += " from tbl_ld_ickss";
                sql += " where f_yslxid = '2'";
                sql += " and f_sfjl like '6.5%'";
                sql += " and f_xiekrq " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";

                //远传表3.95
                sql += "select (select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao a";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4054,%'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_cbsj " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4054,%'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_cbsj " + czsjwhere;
                sql += " and f_jfsj " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";

                //入户直收3.95
                sql += "select (select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao a";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4053,%'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_cbsj " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4053,%'";
                sql += " and f_sfjl like '3.95%'";
                sql += " and f_cbsj " + czsjwhere;
                sql += " and f_jfsj " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";

                //入户直收5.25
                sql += "select (select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao a";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4053,%'";
                sql += " and f_sfjl like '5.25%'";
                sql += " and f_cbsj " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4053,%'";
                sql += " and f_sfjl like '5.25%'";
                sql += " and f_cbsj " + czsjwhere;
                sql += " and f_jfsj " + czsjwhere + ") as sssl";
                sql += " from dual";
                sql += " union all ";

                //入户直收7.05
                sql += "select (select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao a";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4053,%'";
                sql += " and f_sfjl like '7.05%'";
                sql += " and f_cbsj " + czsjwhere + ") as yssl,";
                sql += "(select sum(f_bqsl)";
                sql += " from tbl_ld_cbiao";
                sql += " where f_yslxid = '2'";
                sql += " and ',' || f_khfzid || ',' like '%,4053,%'";
                sql += " and f_sfjl like '7.05%'";
                sql += " and f_cbsj " + czsjwhere;
                sql += " and f_jfsj " + czsjwhere + ") as sssl";
                sql += " from dual";
                DataTable jmdt = _iAccessData.Query(sql).Tables[0];

                double yssllj = 0;

                double sssllj = 0;

                for (int j = 0; j < jmdt.Rows.Count; j++)
                {
                    double yssl = 0;

                    double sssl = 0;

                    //应收水量
                    if (jmdt.Rows[j]["yssl"].ToString() != null && jmdt.Rows[j]["yssl"].ToString() != "")
                    {
                        yssl = Eva.Library.Text.NumberTool.Parse(jmdt.Rows[j]["yssl"].ToString());
                        yssllj += yssl;
                        reportdt.Rows[j]["yssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssl, 0);
                    }
                    else
                    {
                        reportdt.Rows[j]["yssl" + i] = "0";
                    }

                    //实收水量
                    if (jmdt.Rows[j]["sssl"].ToString() != null && jmdt.Rows[j]["sssl"].ToString() != "")
                    {
                        sssl = Eva.Library.Text.NumberTool.Parse(jmdt.Rows[j]["sssl"].ToString());
                        sssllj += sssl;
                        reportdt.Rows[j]["sssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssl, 0);
                    }
                    else
                    {
                        reportdt.Rows[j]["sssl" + i] = "0";
                    }

                    //欠收水量
                    double qssl = yssl - sssl;
                    reportdt.Rows[j]["qssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssl, 0);

                }

                //月合计行
                reportdt.Rows[8]["yssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssllj, 0);
                reportdt.Rows[8]["sssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssllj, 0);
                double qssllj = yssllj - sssllj;
                reportdt.Rows[8]["qssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssllj, 0);
                //月占比
                if (yssllj == 0)
                {
                    reportdt.Rows[0]["rate" + i] = "0%";
                    reportdt.Rows[1]["rate" + i] = "0%";
                    reportdt.Rows[2]["rate" + i] = "0%";
                    reportdt.Rows[3]["rate" + i] = "0%";
                    reportdt.Rows[4]["rate" + i] = "0%";
                    reportdt.Rows[5]["rate" + i] = "0%";
                    reportdt.Rows[6]["rate" + i] = "0%";
                    reportdt.Rows[7]["rate" + i] = "0%";
                    reportdt.Rows[8]["rate" + i] = "0%";

                }
                else
                {
                    for (int jj = 0; jj < 9; jj++)
                    {
                        double rate = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[jj]["sssl" + i].ToString()) / yssllj * 100;
                        reportdt.Rows[jj]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(rate, 2) + "%";
                    }


                }
                #endregion

                #region 大用户部分
                //应收查询
                string yssql = "select qy,sum(f_bqsl) as yssl";
                yssql += "  from (select NVL(substr(f_sfjl,0,4),SUBSTR(F_SUBSTR(F_VALUE2,'|',1),0,4))||f_qy as qy,f_bqsl from tbl_ld_cbiao where f_qy is not null    ";
                yssql += "  and f_yslxid != '2' ";
                yssql += "   and f_qy is not null";
                yssql += "   and f_cbsj  " + czsjwhere + ")";
                yssql += " group by qy         ";
                DataTable dhysdt = _iAccessData.Query(yssql).Tables[0];


                for (int a = 0; a < dhysdt.Rows.Count; a++)
                {
                    if (dhysdt.Rows[a]["yssl"].ToString() == null || dhysdt.Rows[a]["yssl"].ToString() == "")
                    {
                        dhysdt.Rows[a]["yssl"] = "0";
                    }

                    switch (dhysdt.Rows[a]["qy"].ToString())
                    {
                        case "6.50A":
                        case "6.5^A":
                            reportdt.Rows[9]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "4.60A":
                        case "4.6^A":
                            reportdt.Rows[10]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50B":
                        case "6.5^B":
                            reportdt.Rows[11]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "4.60B":
                        case "4.6^B":
                            reportdt.Rows[12]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50C":
                        case "6.5^C":
                            reportdt.Rows[13]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "4.60C":
                        case "4.6^C":
                            reportdt.Rows[14]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50E":
                        case "6.5^E":
                            reportdt.Rows[15]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50F":
                        case "6.5^F":
                            reportdt.Rows[16]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50G":
                        case "6.5^G":
                            reportdt.Rows[17]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "4.60G":
                        case "4.6^G":
                            reportdt.Rows[18]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50H":
                        case "6.5^H":
                            reportdt.Rows[19]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "5.55I":
                            reportdt.Rows[20]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50I":
                        case "6.5^I":
                            reportdt.Rows[21]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "4.85J":
                            reportdt.Rows[22]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.50J":
                        case "6.5^J":
                            reportdt.Rows[23]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.45J":
                            reportdt.Rows[24]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "3.97D":
                            reportdt.Rows[26]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                        case "6.99D":
                        case "7^0^D":
                        case "7.0^D":
                        case "7.00D":
                            reportdt.Rows[27]["yssl" + i] = dhysdt.Rows[a]["yssl"].ToString();
                            break;
                    }
                }


                //实收查询

                string sssql = "select qy,sum(f_bqsl) as sssl";
                sssql += "  from (select NVL(substr(f_sfjl,0,4),SUBSTR(F_SUBSTR(F_VALUE2,'|',1),0,4))||f_qy as qy,f_bqsl from tbl_ld_cbiao where f_qy is not null     ";
                sssql += " and f_yslxid != '2' ";
                sssql += "   and f_qy is not null";
                sssql += "   and f_cbsj  " + czsjwhere;
                sssql += "   and f_jfsj  " + czsjwhere + ")";
                sssql += " group by qy         ";
                DataTable dhssdt = _iAccessData.Query(sssql).Tables[0];

                for (int b = 0; b < dhssdt.Rows.Count; b++)
                {
                    if (dhssdt.Rows[b]["sssl"].ToString() == null || dhssdt.Rows[b]["sssl"].ToString() == "")
                    {
                        dhssdt.Rows[b]["sssl"] = "0";
                    }

                    switch (dhssdt.Rows[b]["qy"].ToString())
                    {
                        case "6.50A":
                        case "6.5^A":
                            reportdt.Rows[9]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "4.60A":
                        case "4.6^A":
                            reportdt.Rows[10]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50B":
                        case "6.5^B":
                            reportdt.Rows[11]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "4.60B":
                        case "4.6^B":
                            reportdt.Rows[12]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50C":
                        case "6.5^C":
                            reportdt.Rows[13]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "4.60C":
                        case "4.6^C":
                            reportdt.Rows[14]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50E":
                        case "6.5^E":
                            reportdt.Rows[15]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50F":
                        case "6.5^F":
                            reportdt.Rows[16]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50G":
                        case "6.5^G":
                            reportdt.Rows[17]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "4.60G":
                        case "4.6^G":
                            reportdt.Rows[18]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50H":
                        case "6.5^H":
                            reportdt.Rows[19]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "5.55I":
                            reportdt.Rows[20]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50I":
                        case "6.5^I":
                            reportdt.Rows[21]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "4.85J":
                            reportdt.Rows[22]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.50J":
                        case "6.5^J":
                            reportdt.Rows[23]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.45J":
                            reportdt.Rows[24]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "3.97D":
                            reportdt.Rows[26]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                        case "6.99D":
                        case "7^0^D":
                        case "7.0^D":
                        case "7.00D":
                            reportdt.Rows[27]["sssl" + i] = dhssdt.Rows[b]["sssl"].ToString();
                            break;
                    }
                }

                //小计部分
                double yssldh = 0;
                double sssldh = 0;
                double yssljl = 0;
                double sssljl = 0;

                for (int m = 9; m < 25; m++)
                {
                    yssldh += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[m]["yssl" + i].ToString());
                    sssldh += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[m]["sssl" + i].ToString());
                }
                reportdt.Rows[25]["yssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssldh, 0);
                reportdt.Rows[25]["sssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssldh, 0);
                yssljl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[26]["yssl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[27]["yssl" + i].ToString());
                sssljl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[26]["sssl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[27]["sssl" + i].ToString());
                reportdt.Rows[28]["yssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssljl, 0);
                reportdt.Rows[28]["sssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssljl, 0);

                //欠收部分

                for (int c = 9; c < 29; c++)
                {

                    double yssl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["yssl" + i].ToString());
                    yssldh += yssl;
                    double sssl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["sssl" + i].ToString());
                    sssldh += sssl;
                    double qssl = yssl - sssl;
                    reportdt.Rows[c]["qssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssl, 2);

                    if (yssldh == 0)
                    {
                        reportdt.Rows[c]["rate" + i] = "100%";

                    }
                    else
                    {
                        double rate = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["sssl" + i].ToString()) / yssldh * 100;
                        reportdt.Rows[c]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(rate, 2) + "%";

                    }

                }


                #endregion


                #region 总计
                double yssltotal = yssllj + yssldh + yssljl;
                double sssltotal = sssllj + sssldh + sssljl;
                double qssltotal = yssltotal - sssltotal;


                reportdt.Rows[29]["yssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssltotal, 2);
                reportdt.Rows[29]["sssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssltotal, 2);
                reportdt.Rows[29]["qssl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssltotal, 2);
                #endregion
            }


            return reportdt;

        }


        private DataTable Get08110013(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();


            for (int i = 1; i < 13; i++)
            {
                //月水量
                reportdt.Columns.Add("sl" + i, System.Type.GetType("System.String"));
                //月占比
                reportdt.Columns.Add("rate" + i, System.Type.GetType("System.String"));
            }
            //合计
            reportdt.Columns.Add("total", System.Type.GetType("System.String"));

            //reportdt.Rows[0] 总表
            reportdt.Rows.Add("0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0");
            //reportdt.Rows[1] 卡表
            reportdt.Rows.Add("0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0");
            //reportdt.Rows[2] 远传表
            reportdt.Rows.Add("0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0");
            //reportdt.Rows[3] 入户直收
            reportdt.Rows.Add("0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0");
            //reportdt.Rows[4] 总计
            reportdt.Rows.Add("0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0");


            //总表合计
            double zbtotal = 0;
            //卡表合计
            double kbtotal = 0;
            //远传表合计
            double yctotal = 0;
            //入户直收合计
            double jmtotal = 0;
            //总合计
            double zjtotal = 0;


            //循环12个月
            for (int i = 1; i <= 12; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                DateTime monthstart = new DateTime();
                DateTime monthend = new DateTime();
                DateTime yearstart = new DateTime(zbsj.Year, 1, 1);
                if (i < 12)
                {
                    if (i == 11)
                    {
                        monthstart = new DateTime(zbsj.Year, (i + 1), 1);
                        monthend = new DateTime(zbsj.Year + 1, 1, 1);
                        monthend = monthend.AddDays(-1);
                    }
                    else
                    {
                        monthstart = new DateTime(zbsj.Year, (i + 1), 1);
                        monthend = new DateTime(zbsj.Year, (i + 2), 1);
                        monthend = monthend.AddDays(-1);
                    }
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                    monthstart = new DateTime(zbsj.Year + 1, 1, 1);
                    monthend = new DateTime(zbsj.Year + 1, 2, 1);
                    monthend = dataend.AddDays(-1);
                }

                //当月查询区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";
                //次月月查询区间
                string ycczsjwhere = " between to_date('" + monthstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + monthend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

                //获取总表数据
                string sql = "select NVL(SUM(f_bqsl),0) from TBL_LD_CBIAO where (f_ztid='2' or f_ztid='3') and f_cbbh like 'ZB%' and f_cbsj " + czsjwhere;
                reportdt.Rows[0]["sl" + i] = _iAccessData.GetSingle(sql);
                zbtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString());
                //获取卡表数据
                sql = "select NVL(SUM(f_sl),0) from TBL_LD_ICKSS where f_ztid = '2'  and f_yslxid='2' and f_xiekrq" + czsjwhere;
                reportdt.Rows[1]["sl" + i] = _iAccessData.GetSingle(sql);
                kbtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString());

                //获取远传数据
                sql = "select NVL(SUM(f_bqsl),0) from TBL_LD_CBIAO where (f_ztid = '2' or f_ztid = '3') and (f_cbbh like 'YC%' or f_cbbh = 'PZ001') and f_cbsj " + ycczsjwhere;
                reportdt.Rows[2]["sl" + i] = _iAccessData.GetSingle(sql);
                yctotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString());

                //获取入户直收数据
                sql = "select NVL(SUM(f_bqsl),0) from TBL_LD_CBIAO where (f_ztid = '2' or f_ztid = '3') and f_cbbh like 'J0%' and f_cbsj " + czsjwhere;
                reportdt.Rows[3]["sl" + i] = _iAccessData.GetSingle(sql);
                jmtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString());

                //月总计数据
                double yzj = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl" + i].ToString());
                reportdt.Rows[4]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yzj, 0);
                zjtotal += yzj;

                //月占比
                if (yzj > 0)
                {
                    reportdt.Rows[0]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString()) / yzj * 100, 2) + "%";

                    reportdt.Rows[1]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString()) / yzj * 100, 2) + "%";
                    reportdt.Rows[2]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString()) / yzj * 100, 2) + "%";
                    reportdt.Rows[3]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString()) / yzj * 100, 2) + "%";
                    reportdt.Rows[4]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl" + i].ToString()) / yzj * 100, 2) + "%";

                }
                else
                {
                    reportdt.Rows[0]["rate" + i] = "0%";
                    reportdt.Rows[1]["rate" + i] = "0%";
                    reportdt.Rows[2]["rate" + i] = "0%";
                    reportdt.Rows[3]["rate" + i] = "0%";
                    reportdt.Rows[4]["rate" + i] = "0%";

                }

            }

            //合计行

            reportdt.Rows[0]["total"] = zbtotal;
            reportdt.Rows[1]["total"] = kbtotal;
            reportdt.Rows[2]["total"] = yctotal;
            reportdt.Rows[3]["total"] = jmtotal;
            reportdt.Rows[4]["total"] = zjtotal;

            return reportdt;


        }


        private DataTable Get08110012(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            //水费单价
            reportdt.Columns.Add("sfdj", System.Type.GetType("System.String"));

            //排污费单价
            reportdt.Columns.Add("pwfdj", System.Type.GetType("System.String"));

            //单价
            reportdt.Columns.Add("dj", System.Type.GetType("System.String"));

            for (int i = 1; i < 14; i++)
            {
                //月水量
                reportdt.Columns.Add("sl" + i, System.Type.GetType("System.String"));
                //月占比
                reportdt.Columns.Add("rate" + i, System.Type.GetType("System.String"));
            }

            //获取单价
            //居民生活用水
            string sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='2' order by to_number(f_jtsj) asc";
            DataTable jmysdt = _iAccessData.Query(sql).Tables[0];
            string jmsf = "";
            string jmpwf = "";
            string jmdj = "";

            for (int i = 0; i < jmysdt.Rows.Count; i++)
            {
                jmsf += jmysdt.Rows[i]["f_jtsj"].ToString() + "|";
                jmpwf += jmysdt.Rows[i]["f_pwf"].ToString() + "|";
                jmdj += jmysdt.Rows[i]["dj"].ToString() + "|";
            }

            jmsf = jmsf.Trim('|');
            jmpwf = jmpwf.Trim('|');
            jmdj = jmdj.Trim('|');

            //学校/居委会
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='101' order by to_number(f_jtsj) asc";
            DataTable xxdt = _iAccessData.Query(sql).Tables[0];
            string xxsf = xxdt.Rows[0]["f_jtsj"].ToString();
            string xxpwf = xxdt.Rows[0]["f_pwf"].ToString();
            string xxdj = xxdt.Rows[0]["dj"].ToString();
            //生态城
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='72' order by to_number(f_jtsj) asc";
            DataTable stcdt = _iAccessData.Query(sql).Tables[0];
            string stcsf = stcdt.Rows[0]["f_jtsj"].ToString();
            string stcpwf = stcdt.Rows[0]["f_pwf"].ToString();
            string stcdj = stcdt.Rows[0]["dj"].ToString();
            //经营服务
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='3' order by to_number(f_jtsj) asc";
            DataTable jyfwdt = _iAccessData.Query(sql).Tables[0];
            string jyfwsf = jyfwdt.Rows[0]["f_jtsj"].ToString();
            string jyfwpwf = jyfwdt.Rows[0]["f_pwf"].ToString();
            string jyfwdj = jyfwdt.Rows[0]["dj"].ToString();

            //滨海旅游区
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='98' order by to_number(f_jtsj) asc";
            DataTable lyqdt = _iAccessData.Query(sql).Tables[0];
            string lyqsf = lyqdt.Rows[0]["f_jtsj"].ToString();
            string lyqpwf = lyqdt.Rows[0]["f_pwf"].ToString();
            string lyqdj = lyqdt.Rows[0]["dj"].ToString();
            //游乐港
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='106' order by to_number(f_jtsj) asc";
            DataTable ylgdt = _iAccessData.Query(sql).Tables[0];
            string ylgsf = ylgdt.Rows[0]["f_jtsj"].ToString();
            string ylgpwf = ylgdt.Rows[0]["f_pwf"].ToString();
            string ylgdj = ylgdt.Rows[0]["dj"].ToString();

            //玖龙纸业粗制水
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='104' order by to_number(f_jtsj) asc";
            DataTable czsdt = _iAccessData.Query(sql).Tables[0];
            string czssf = czsdt.Rows[0]["f_jtsj"].ToString();
            string czspwf = czsdt.Rows[0]["f_pwf"].ToString();
            string czsdj = czsdt.Rows[0]["dj"].ToString();
            //玖龙纸业淡化水
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='105' order by to_number(f_jtsj) asc";
            DataTable dhsdt = _iAccessData.Query(sql).Tables[0];
            string dhssf = dhsdt.Rows[0]["f_jtsj"].ToString();
            string dhspwf = dhsdt.Rows[0]["f_pwf"].ToString();
            string dhsdj = dhsdt.Rows[0]["dj"].ToString();

            //特种行业用水
            sql = "select f_jtsj,f_pwf,to_char((f_jtsj+f_pwf),'FM90.000') as dj from TBL_LDBM_JTSJ t where t.f_jsrq>sysdate and t.f_zzrq>sysdate and f_yslxid='6' order by to_number(f_jtsj) asc";
            DataTable tzdt = _iAccessData.Query(sql).Tables[0];
            string tzsf = tzdt.Rows[0]["f_jtsj"].ToString();
            string tzpwf = tzdt.Rows[0]["f_pwf"].ToString();
            string tzdj = tzdt.Rows[0]["dj"].ToString();


            //reportdt.Rows[0] 居民生活
            reportdt.Rows.Add(jmsf, jmpwf, jmdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[1] 学校/居委会
            reportdt.Rows.Add(xxsf, xxpwf, xxdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[2] 生态城
            reportdt.Rows.Add(stcsf, stcpwf, stcdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[3] 经营服务
            reportdt.Rows.Add(jyfwsf, jyfwpwf, jyfwdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[4] 滨海旅游区
            reportdt.Rows.Add(lyqsf, lyqpwf, lyqdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[5] 游乐港
            reportdt.Rows.Add(ylgsf, ylgpwf, ylgdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[6] 特种行业用水
            reportdt.Rows.Add(tzsf, tzpwf, tzdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[7] 偷盗用水
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[8] 售水总量
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[9] 供水总量
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[10] 产销差率
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[11] 销售收入
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[12] 实收水费
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[13] 回款率
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[14] 收欠年欠费
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");

            //reportdt.Rows[15] 玖龙纸业粗制水
            reportdt.Rows.Add(czssf, czspwf, czsdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[16] 玖龙纸业淡化水
            reportdt.Rows.Add(dhssf, dhspwf, dhsdj, "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[17] 玖龙供水量
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[18] 玖龙产销差率
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[19] 玖龙销售收入
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[20] 玖龙实收水费
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //reportdt.Rows[21] 玖龙回款率
            reportdt.Rows.Add("", "", "", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%", "0", "0%");
            //居民水量合计
            double jmtotal = 0;
            //学校/居委会合计
            double xxtotal = 0;
            //生态城合计
            double stctotal = 0;
            //经营服务合计
            double jyfwtotal = 0;
            //滨海旅游区合计
            double lyqtotal = 0;
            //游乐港合计
            double ylgtotal = 0;
            //特种行业用水合计
            double tztotal = 0;
            //售水总量合计
            double sszltotal = 0;
            //销售收入合计
            double xxsrtotal = 0;
            //实收水费合计
            double sssftotal = 0;
            //收欠年欠费合计
            double qntotal = 0;


            //玖龙纸业粗制水合计
            double czstotal = 0;
            //玖龙纸业淡化水合计
            double dhstotal = 0;
            //玖龙销售收入合计
            double jlxxsrtotal = 0;
            //玖龙实收水费合计
            double jlsssftotal = 0;

            //循环12个月
            for (int i = 1; i <= 12; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                DateTime monthstart = new DateTime();
                DateTime monthend = new DateTime();
                DateTime yearstart = new DateTime(zbsj.Year, 1, 1);
                if (i < 12)
                {
                    if (i == 11)
                    {
                        monthstart = new DateTime(zbsj.Year, (i + 1), 1);
                        monthend = new DateTime(zbsj.Year + 1, 1, 1);
                        monthend = monthend.AddDays(-1);
                    }
                    else
                    {
                        monthstart = new DateTime(zbsj.Year, (i + 1), 1);
                        monthend = new DateTime(zbsj.Year, (i + 2), 1);
                        monthend = monthend.AddDays(-1);
                    }
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                    monthstart = new DateTime(zbsj.Year + 1, 1, 1);
                    monthend = new DateTime(zbsj.Year + 1, 2, 1);
                    monthend = dataend.AddDays(-1);
                }

                //当月查询区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";
                //次月月查询区间
                string ycczsjwhere = " between to_date('" + monthstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + monthend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

                //获取本月应收数据
                sql = "select f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid='2' or f_ztid='3') and f_cbbh not like 'YC%' and f_cbsj " + czsjwhere;
                sql += " union all ";
                sql += " select f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid='2' or f_ztid='3') and f_cbbh like 'YC%' and f_cbsj " + ycczsjwhere;
                sql += " union all ";
                sql += " select f_sl as f_bqsl,f_sfjl,f_shss as f_bqje,f_value2 from TBL_LD_ickss where f_ztid='2' and f_xiekrq " + czsjwhere;

                DataTable byysdt = _iAccessData.Query(sql).Tables[0];

                //获取本月实收数据
                sql = "select f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid = '2' or f_ztid = '3') and f_cbbh not like 'YC%' and f_cbsj " + czsjwhere + " and f_jfsj " + czsjwhere;
                sql += " union all ";
                sql += "select f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid = '2' or f_ztid = '3') and f_cbbh like 'YC%' and f_cbsj " + ycczsjwhere + " and f_jfsj " + ycczsjwhere;
                sql += " union all ";
                sql += " select f_sl as f_bqsl,f_sfjl,f_shss as f_bqje,f_value2 from TBL_LD_ickss where f_ztid='2' and f_xiekrq " + czsjwhere;

                DataTable byssdt = _iAccessData.Query(sql).Tables[0];

                //获取本月收回欠款数据(欠年)
                sql = "select f_bqsl,f_sfjl,f_cbsj,f_bqje,f_value2 from TBL_LD_CBIAO where f_ztid = '3' and f_cbsj < to_date('" + yearstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and f_jfsj " + czsjwhere;
                DataTable qnqkdt = _iAccessData.Query(sql).Tables[0];

                #region 分析应收数据
                for (int j = 0; j < byysdt.Rows.Count; j++)
                {
                    string sfarr = byysdt.Rows[j]["f_sfjl"].ToString();
                    if (sfarr == null || sfarr == "")
                    {
                        string[] arr = byysdt.Rows[j]["f_value2"].ToString().Split('|');

                        if (arr.Length > 1)
                        {
                            sfarr = arr[1];
                        }
                        else
                        {
                            continue;
                        }
                    }
                    double sfdj = Eva.Library.Text.NumberTool.Parse(sfarr.Split('^')[0].ToString());


                    if (("|" + jmsf + "|").IndexOf("|" + Eva.Library.Text.NumberTool.GetNumberByLength(sfdj, 3) + "|") != -1)
                    {
                        reportdt.Rows[0]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);

                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(xxsf))
                    {
                        reportdt.Rows[1]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(stcsf))
                    {
                        reportdt.Rows[2]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(jyfwsf))
                    {
                        reportdt.Rows[3]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(lyqsf))
                    {
                        reportdt.Rows[4]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(ylgsf))
                    {
                        reportdt.Rows[5]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(tzsf))
                    {
                        reportdt.Rows[6]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(czssf))
                    {
                        reportdt.Rows[15]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[15]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[19]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == 7 || sfdj == Eva.Library.Text.NumberTool.Parse(dhssf))
                    {
                        reportdt.Rows[16]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[16]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[19]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[j]["f_bqje"].ToString()), 2);
                    }




                }
                //应收合计
                jmtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString());
                xxtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString());
                stctotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString());
                jyfwtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString());
                lyqtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl" + i].ToString());
                ylgtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sl" + i].ToString());
                tztotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sl" + i].ToString());
                xxsrtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString());


                czstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[15]["sl" + i].ToString());
                dhstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[16]["sl" + i].ToString());
                jlxxsrtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl" + i].ToString());
                #endregion

                #region 分析实收数据
                for (int j = 0; j < byssdt.Rows.Count; j++)
                {
                    string sfarr = byssdt.Rows[j]["f_sfjl"].ToString();
                    if (sfarr == null || sfarr == "")
                    {
                        string[] arr = byssdt.Rows[j]["f_value2"].ToString().Split('|');

                        if (arr.Length > 1)
                        {
                            sfarr = arr[1];
                        }
                        else
                        {
                            continue;
                        }
                    }
                    double sfdj = Eva.Library.Text.NumberTool.Parse(sfarr.Split('^')[0].ToString());


                    if (("|" + jmsf + "|").IndexOf("|" + Eva.Library.Text.NumberTool.GetNumberByLength(sfdj, 3) + "|") != -1)
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(xxsf))
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(stcsf))
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(jyfwsf))
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(lyqsf))
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(ylgsf))
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(tzsf))
                    {
                        reportdt.Rows[12]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(czssf))
                    {
                        reportdt.Rows[20]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[20]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == 7 || sfdj == Eva.Library.Text.NumberTool.Parse(dhssf))
                    {
                        reportdt.Rows[20]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[20]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[j]["f_bqje"].ToString()), 2);
                    }

                }
                //实收合计
                sssftotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString());
                jlsssftotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[20]["sl" + i].ToString());
                #endregion

                #region 分析收欠年数据
                for (int j = 0; j < qnqkdt.Rows.Count; j++)
                {
                    string sfarr = qnqkdt.Rows[j]["f_sfjl"].ToString();
                    if (sfarr == null || sfarr == "")
                    {
                        string[] arr = byssdt.Rows[j]["f_value2"].ToString().Split('|');

                        if (arr.Length > 1)
                        {
                            sfarr = arr[1];
                        }
                        else
                        {
                            continue;
                        }
                    }
                    double sfdj = Eva.Library.Text.NumberTool.Parse(sfarr.Split('^')[0].ToString());

                    if (("|" + jmsf + "|").IndexOf("|" + Eva.Library.Text.NumberTool.GetNumberByLength(sfdj, 3) + "|") != -1)
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(xxsf))
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(stcsf))
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(jyfwsf))
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);

                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(lyqsf))
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(ylgsf))
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);
                    }
                    else if (sfdj == Eva.Library.Text.NumberTool.Parse(tzsf))
                    {
                        reportdt.Rows[14]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[j]["f_bqje"].ToString()), 2);
                    }

                }
                qntotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sl" + i].ToString());
                #endregion

                #region 分析售水总量、月占比、回款率
                //售水总量
                double sszlhj = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sl" + i].ToString());
                reportdt.Rows[8]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sszlhj, 2);
                double jlsszlhj = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[15]["sl" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[16]["sl" + i].ToString());

                //月占比
                if (sszlhj == 0)
                {
                    reportdt.Rows[0]["rate" + i] = "0%";
                    reportdt.Rows[1]["rate" + i] = "0%";
                    reportdt.Rows[2]["rate" + i] = "0%";
                    reportdt.Rows[3]["rate" + i] = "0%";
                    reportdt.Rows[4]["rate" + i] = "0%";
                    reportdt.Rows[5]["rate" + i] = "0%";
                    reportdt.Rows[6]["rate" + i] = "0%";
                }
                else
                {
                    reportdt.Rows[0]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                    reportdt.Rows[1]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                    reportdt.Rows[2]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                    reportdt.Rows[3]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                    reportdt.Rows[4]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                    reportdt.Rows[5]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                    reportdt.Rows[6]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sl" + i].ToString()) / sszlhj * 100), 2) + "%";
                }

                if (jlsszlhj == 0)
                {
                    reportdt.Rows[15]["rate" + i] = "0%";
                    reportdt.Rows[16]["rate" + i] = "0%";

                }
                else
                {
                    reportdt.Rows[15]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[15]["sl" + i].ToString()) / jlsszlhj * 100), 2) + "%";
                    reportdt.Rows[16]["rate" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[16]["sl" + i].ToString()) / jlsszlhj * 100), 2) + "%";
                }

                //回款率
                if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) == 0)
                {
                    reportdt.Rows[13]["sl" + i] = "0%";

                }
                else
                {
                    reportdt.Rows[13]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl" + i].ToString()) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl" + i].ToString()) * 100), 2) + "%";

                }

                if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl" + i].ToString()) == 0)
                {
                    reportdt.Rows[21]["sl" + i] = "0%";

                }
                else
                {
                    reportdt.Rows[21]["sl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[20]["sl" + i].ToString()) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl" + i].ToString()) * 100), 2) + "%";

                }

                #endregion

            }

            #region 分析全年售水总量、月占比、回款率
            reportdt.Rows[0]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(jmtotal, 2);
            reportdt.Rows[1]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(xxtotal, 2);
            reportdt.Rows[2]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(stctotal, 2);
            reportdt.Rows[3]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(jyfwtotal, 2);
            reportdt.Rows[4]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(lyqtotal, 2);
            reportdt.Rows[5]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(ylgtotal, 2);
            reportdt.Rows[6]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(tztotal, 2);
            reportdt.Rows[8]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(sszltotal, 2);
            reportdt.Rows[11]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(xxsrtotal, 2);
            reportdt.Rows[12]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(sssftotal, 2);
            reportdt.Rows[14]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(qntotal, 2);

            reportdt.Rows[15]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(czstotal, 2);
            reportdt.Rows[16]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(dhstotal, 2);
            reportdt.Rows[19]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(jlxxsrtotal, 2);
            reportdt.Rows[20]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(jlsssftotal, 2);
            //售水总量
            double sszl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sl13"].ToString());
            reportdt.Rows[8]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength(sszl, 2);
            double jlsszl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[15]["sl13"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[16]["sl13"].ToString());

            //月占比
            if (sszl == 0)
            {
                reportdt.Rows[0]["rate13"] = "0%";
                reportdt.Rows[1]["rate13"] = "0%";
                reportdt.Rows[2]["rate13"] = "0%";
                reportdt.Rows[3]["rate13"] = "0%";
                reportdt.Rows[4]["rate13"] = "0%";
                reportdt.Rows[5]["rate13"] = "0%";
                reportdt.Rows[6]["rate13"] = "0%";
            }
            else
            {
                reportdt.Rows[0]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["sl13"].ToString()) / sszl * 100), 2) + "%";
                reportdt.Rows[1]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["sl13"].ToString()) / sszl * 100), 2) + "%";
                reportdt.Rows[2]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["sl13"].ToString()) / sszl * 100), 2) + "%";
                reportdt.Rows[3]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["sl13"].ToString()) / sszl * 100), 2) + "%";
                reportdt.Rows[4]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["sl13"].ToString()) / sszl * 100), 2) + "%";
                reportdt.Rows[5]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sl13"].ToString()) / sszl * 100), 2) + "%";
                reportdt.Rows[6]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sl13"].ToString()) / sszl * 100), 2) + "%";

            }

            if (jlsszl == 0)
            {
                reportdt.Rows[15]["rate13"] = "0%";
                reportdt.Rows[16]["rate13"] = "0%";

            }
            else
            {
                reportdt.Rows[15]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[15]["sl13"].ToString()) / jlsszl * 100), 2) + "%";
                reportdt.Rows[16]["rate13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[16]["sl13"].ToString()) / jlsszl * 100), 2) + "%";

            }

            //回款率
            if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl13"].ToString()) == 0)
            {
                reportdt.Rows[13]["sl13"] = "0%";

            }
            else
            {
                reportdt.Rows[13]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sl13"].ToString()) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sl13"].ToString()) * 100), 2) + "%";

            }

            if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl13"].ToString()) == 0)
            {
                reportdt.Rows[21]["sl13"] = "0%";

            }
            else
            {
                reportdt.Rows[21]["sl13"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[20]["sl13"].ToString()) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[19]["sl13"].ToString()) * 100), 2) + "%";

            }

            #endregion


            return reportdt;

        }


        private DataTable Get08110011(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();

            //总金额
            reportdt.Columns.Add("zje", System.Type.GetType("System.String"));
            //总水费
            reportdt.Columns.Add("zsf", System.Type.GetType("System.String"));
            //当月应收水费
            reportdt.Columns.Add("dyyssf", System.Type.GetType("System.String"));
            //当月应收水量
            reportdt.Columns.Add("dyyssl", System.Type.GetType("System.String"));
            //当月实收水费
            reportdt.Columns.Add("dysssf", System.Type.GetType("System.String"));
            //当月实收水量
            reportdt.Columns.Add("dysssl", System.Type.GetType("System.String"));
            //当月欠收水费
            reportdt.Columns.Add("dyqssf", System.Type.GetType("System.String"));
            //当月欠收水量
            reportdt.Columns.Add("dyqssl", System.Type.GetType("System.String"));
            //当月实收排污费
            reportdt.Columns.Add("dysspwf", System.Type.GetType("System.String"));
            //当月欠收排污费
            reportdt.Columns.Add("dyqspwf", System.Type.GetType("System.String"));
            //当月应收排污费
            reportdt.Columns.Add("dyyspwf", System.Type.GetType("System.String"));
            //收回本年水费
            reportdt.Columns.Add("shbnsf", System.Type.GetType("System.String"));
            //收回本年排污费
            reportdt.Columns.Add("shbnpwf", System.Type.GetType("System.String"));
            //收回欠年水费
            reportdt.Columns.Add("shqnsf", System.Type.GetType("System.String"));
            //收回欠年排污费
            reportdt.Columns.Add("shqnpwf", System.Type.GetType("System.String"));

            //reportdt.Rows[0] 居民生活
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[1] 学校/居委会
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[2] 生态城
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[3] 经营服务
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[4] 滨海旅游区
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[5] 游乐港
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[6] 偷盗用水
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[7] 自来水合计
            reportdt.Rows.Add("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //列标题
            reportdt.Rows.Add("实收水费", "", " 当    月      实         收         情         况", "", "", "", "", "", "当 月 污 水 处 理 费", "", "", "  收  回  欠  费  情  况", "", "", "");
            //列标题
            reportdt.Rows.Add("", "", "应    收     数", "", "实    收    数", "", "欠   收   数", "", "实收排污费（元）", "欠收排污费（元）", "排污费合计（元）", "本    年    度", "", " 上   年   度", "");
            //列标题
            reportdt.Rows.Add("", "", "水  费（元）", " 水  量（吨）", "水  费（元）", " 水  量（吨）", "水  费（元）", " 水  量（吨）", "", "", "", "水  费（元）", "污水处理费（元）", "水  费（元）", "污水处理费（元）");

            //reportdt.Rows[11] 玖龙纸业淡化水
            reportdt.Rows.Add("0", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[12] 玖龙纸业粗制水
            reportdt.Rows.Add("0", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            //reportdt.Rows[13] 粗制水合计
            reportdt.Rows.Add("0", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");


            DateTime datastart = new DateTime(zbsj.Year, zbsj.Month, 1);

            DateTime monthstart = new DateTime();
            DateTime monthend = new DateTime();
            int month = zbsj.Month + 1;
            DateTime dataend = new DateTime();
            if (month > 12)
            {
                dataend = new DateTime((zbsj.Year + 1), 1, 1);
                monthstart = new DateTime((zbsj.Year + 1), 1, 1);
            }
            else
            {
                dataend = new DateTime(zbsj.Year, month, 1);
                monthstart = new DateTime(zbsj.Year, month, 1);
            }
            dataend = dataend.AddDays(-1);

            int nextmonth = zbsj.Month + 2;
            if (nextmonth > 12)
            {
                int temp = nextmonth - 12;
                monthend = new DateTime((zbsj.Year + 1), temp, 1);
            }
            else
            {
                monthend = new DateTime(zbsj.Year, nextmonth, 1);
            }
            monthend = monthend.AddDays(-1);

            DateTime yearstart = new DateTime(zbsj.Year, 1, 1);
            DateTime yearend = new DateTime(zbsj.Year, 12, 31);
            //当月查询区间
            string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";
            //次月月查询区间
            string ycczsjwhere = " between to_date('" + monthstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + monthend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";
            ////本年度查询区间
            //string yearwhere = " between to_date('" + yearstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + yearend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";
            ////欠年查询区间
            //string qyearwhere = " < to_date('" + yearstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss')";


            //获取本月应收数据
            string sql = "select f_sf,f_pwf,f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid='2' or f_ztid='3') and f_cbbh not like 'YC%' and f_cbsj " + czsjwhere;
            sql += " union all ";
            sql += " select f_sf,f_pwf,f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid='2' or f_ztid='3') and f_cbbh like 'YC%' and f_cbsj " + ycczsjwhere;
            sql += " union all ";
            sql += " select f_sf,f_pwf,f_sl as f_bqsl,f_sfjl,f_shss as f_bqje,f_value2 from TBL_LD_ickss where f_ztid='2' and f_xiekrq " + czsjwhere;

            DataTable byysdt = _iAccessData.Query(sql).Tables[0];

            //获取本月实收数据
            sql = "select f_sf,f_pwf,f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid = '2' or f_ztid = '3') and f_cbbh not like 'YC%' and f_cbsj " + czsjwhere + " and f_jfsj " + czsjwhere;
            sql += " union all ";
            sql += "select f_sf,f_pwf,f_bqsl,f_sfjl,f_bqje,f_value2 from TBL_LD_CBIAO where (f_ztid = '2' or f_ztid = '3') and f_cbbh like 'YC%' and f_cbsj " + ycczsjwhere + " and f_jfsj " + ycczsjwhere;
            sql += " union all ";
            sql += " select f_sf,f_pwf,f_sl as f_bqsl,f_sfjl,f_shss as f_bqje,f_value2 from TBL_LD_ickss where f_ztid='2' and f_xiekrq " + czsjwhere;

            DataTable byssdt = _iAccessData.Query(sql).Tables[0];

            //获取本月收回欠款数据(本年)
            sql = "select f_sf,f_pwf,f_bqsl,f_sfjl,f_cbsj,f_bqje,f_value2 from TBL_LD_CBIAO where f_ztid = '3' and f_cbsj < to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and f_cbsj > to_date('" + yearstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and f_jfsj " + czsjwhere;
            DataTable bnqkdt = _iAccessData.Query(sql).Tables[0];

            //获取本月收回欠款数据(欠年)
            sql = "select f_sf,f_pwf,f_bqsl,f_sfjl,f_cbsj,f_bqje,f_value2 from TBL_LD_CBIAO where f_ztid = '3' and f_cbsj < to_date('" + yearstart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and f_jfsj " + czsjwhere;
            DataTable qnqkdt = _iAccessData.Query(sql).Tables[0];

            #region 分析本月应收数据
            for (int i = 0; i < byysdt.Rows.Count; i++)
            {
                string sfarr = byysdt.Rows[i]["f_sfjl"].ToString();
                if (sfarr.Length < 4)
                {
                    sfarr = byysdt.Rows[i]["f_value2"].ToString();
                    string[] arr = sfarr.Split('|');
                    if (arr.Length > 1)
                    {
                        sfarr = arr[1];
                        if (sfarr.Length < 4)
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }

                switch (sfarr.Substring(0, 4))
                {
                    case "3.95":
                    case "5.25":
                    case "7.05":
                        reportdt.Rows[0]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[0]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[0]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.60":
                    case "4.6^":
                        reportdt.Rows[1]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[1]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[1]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "5.55":
                        reportdt.Rows[2]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[2]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[2]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.50":
                    case "6.5^":
                        reportdt.Rows[3]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[3]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[3]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.85":
                        reportdt.Rows[4]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[4]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[4]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.45":
                        reportdt.Rows[5]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[5]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[5]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "7^0^":
                    case "7.00":
                    case "7.0^":
                        reportdt.Rows[11]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[11]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "3.97":
                        reportdt.Rows[12]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[12]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[12]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byysdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                }

            }
            #endregion

            #region 分析本月实收数据
            for (int i = 0; i < byssdt.Rows.Count; i++)
            {
                string sfarr = byssdt.Rows[i]["f_sfjl"].ToString();

                if (sfarr.Length < 4)
                {
                    sfarr = byssdt.Rows[i]["f_value2"].ToString();
                    string[] arr = sfarr.Split('|');
                    if (arr.Length > 1)
                    {
                        sfarr = arr[1];
                        if (sfarr.Length < 4)
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }

                switch (sfarr.Substring(0, 4))
                {
                    case "3.95":
                    case "5.25":
                    case "7.05":
                        reportdt.Rows[0]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[0]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[0]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[0]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[0]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.60":
                    case "4.6^":

                        reportdt.Rows[1]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[1]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[1]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[1]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[1]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "5.55":
                        reportdt.Rows[2]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[2]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[2]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[2]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[2]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.50":
                    case "6.5^":

                        reportdt.Rows[3]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[3]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[3]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[3]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[3]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);


                        break;
                    case "4.85":
                        reportdt.Rows[4]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[4]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[4]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[4]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[4]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);


                        break;
                    case "6.45":
                        reportdt.Rows[5]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[5]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[5]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[5]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[5]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);


                        break;
                    case "7^0^":
                    case "7.00":
                    case "7.0^":
                        reportdt.Rows[11]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);

                        reportdt.Rows[11]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[11]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[11]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);


                        break;
                    case "3.97":
                        reportdt.Rows[12]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqje"].ToString()), 2);

                        reportdt.Rows[12]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[12]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_bqsl"].ToString()), 2);
                        reportdt.Rows[12]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(byssdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                }

            }
            #endregion

            #region 分析收回欠款本年度情况
            for (int i = 0; i < bnqkdt.Rows.Count; i++)
            {
                string sfarr = bnqkdt.Rows[i]["f_sfjl"].ToString();

                if (sfarr.Length < 4)
                {
                    sfarr = bnqkdt.Rows[i]["f_value2"].ToString();
                    string[] arr = sfarr.Split('|');
                    if (arr.Length > 1)
                    {
                        sfarr = arr[1];
                        if (sfarr.Length < 4)
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }

                switch (sfarr.Substring(0, 4))
                {
                    case "3.95":
                    case "5.25":
                    case "7.05":
                        reportdt.Rows[0]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[0]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[0]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[0]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.60":
                    case "4.6^":

                        reportdt.Rows[1]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[1]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[1]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[1]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "5.55":
                        reportdt.Rows[2]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[2]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[2]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[2]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.50":
                    case "6.5^":

                        reportdt.Rows[3]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[3]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[3]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[3]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.85":
                        reportdt.Rows[4]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[4]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[4]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[4]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.45":
                        reportdt.Rows[5]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[5]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[5]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[5]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "7^0^":
                    case "7.00":
                    case "7.0^":
                        reportdt.Rows[11]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[11]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[11]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[11]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "3.97":
                        reportdt.Rows[12]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[12]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[12]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[12]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(bnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                }

            }

            #endregion

            #region 分析收回欠款欠年度情况
            for (int i = 0; i < qnqkdt.Rows.Count; i++)
            {
                string sfarr = qnqkdt.Rows[i]["f_sfjl"].ToString();

                if (sfarr.Length < 4)
                {
                    sfarr = qnqkdt.Rows[i]["f_value2"].ToString();
                    string[] arr = sfarr.Split('|');
                    if (arr.Length > 1)
                    {
                        sfarr = arr[1];
                        if (sfarr.Length < 4)
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }


                switch (sfarr.Substring(0, 4))
                {
                    case "3.95":
                    case "5.25":
                    case "7.05":
                        reportdt.Rows[0]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[0]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[0]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[0]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.60":
                    case "4.6^":

                        reportdt.Rows[1]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[1]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[1]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[1]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "5.55":
                        reportdt.Rows[2]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[2]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[2]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[2]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.50":
                    case "6.5^":

                        reportdt.Rows[3]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[3]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[3]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[3]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "4.85":
                        reportdt.Rows[4]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[4]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[4]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[4]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "6.45":
                        reportdt.Rows[5]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[5]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[5]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[5]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "7^0^":
                    case "7.00":
                    case "7.0^":
                        reportdt.Rows[11]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[11]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[11]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[11]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                    case "3.97":
                        reportdt.Rows[12]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_bqje"].ToString()), 2);
                        reportdt.Rows[12]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);

                        reportdt.Rows[12]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_sf"].ToString()), 2);
                        reportdt.Rows[12]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(qnqkdt.Rows[i]["f_pwf"].ToString()), 2);

                        break;
                }

            }

            #endregion

            #region 统计欠收情况
            reportdt.Rows[0]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysssf"].ToString())), 2);
            reportdt.Rows[0]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysssl"].ToString())), 2);
            reportdt.Rows[0]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysspwf"].ToString())), 2);

            reportdt.Rows[1]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysssf"].ToString())), 2);
            reportdt.Rows[1]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysssl"].ToString())), 2);
            reportdt.Rows[1]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysspwf"].ToString())), 2);

            reportdt.Rows[2]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysssf"].ToString())), 2);
            reportdt.Rows[2]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysssl"].ToString())), 2);
            reportdt.Rows[2]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysspwf"].ToString())), 2);

            reportdt.Rows[3]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysssf"].ToString())), 2);
            reportdt.Rows[3]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysssl"].ToString())), 2);
            reportdt.Rows[3]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysspwf"].ToString())), 2);

            reportdt.Rows[4]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysssf"].ToString())), 2);
            reportdt.Rows[4]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysssl"].ToString())), 2);
            reportdt.Rows[4]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysspwf"].ToString())), 2);

            reportdt.Rows[5]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysssf"].ToString())), 2);
            reportdt.Rows[5]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysssl"].ToString())), 2);
            reportdt.Rows[5]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysspwf"].ToString())), 2);

            reportdt.Rows[11]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysssf"].ToString())), 2);
            reportdt.Rows[11]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysssl"].ToString())), 2);
            reportdt.Rows[11]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysspwf"].ToString())), 2);

            reportdt.Rows[12]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyssf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysssf"].ToString())), 2);
            reportdt.Rows[12]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyssl"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysssl"].ToString())), 2);
            reportdt.Rows[12]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyspwf"].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysspwf"].ToString())), 2);

            #endregion
            #region 统计合计行
            reportdt.Rows[7]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zje"].ToString()), 2);
            reportdt.Rows[7]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["zsf"].ToString()), 2);
            reportdt.Rows[7]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyssf"].ToString()), 2);
            reportdt.Rows[7]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyssl"].ToString()), 2);
            reportdt.Rows[7]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysssf"].ToString()), 2);
            reportdt.Rows[7]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysssl"].ToString()), 2);
            reportdt.Rows[7]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyqssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyqssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyqssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyqssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyqssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyqssf"].ToString()), 2);
            reportdt.Rows[7]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyqssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyqssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyqssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyqssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyqssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyqssl"].ToString()), 2);
            reportdt.Rows[7]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dysspwf"].ToString()), 2);
            reportdt.Rows[7]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyqspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyqspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyqspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyqspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyqspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyqspwf"].ToString()), 2);
            reportdt.Rows[7]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["dyyspwf"].ToString()), 2);
            reportdt.Rows[7]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shbnsf"].ToString()), 2);
            reportdt.Rows[7]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shbnpwf"].ToString()), 2);
            reportdt.Rows[7]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shqnsf"].ToString()), 2);
            reportdt.Rows[7]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["shqnpwf"].ToString()), 2);

            reportdt.Rows[13]["zje"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zje"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zje"].ToString()), 2);
            reportdt.Rows[13]["zsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["zsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["zsf"].ToString()), 2);
            reportdt.Rows[13]["dyyssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyssf"].ToString()), 2);
            reportdt.Rows[13]["dyyssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyssl"].ToString()), 2);
            reportdt.Rows[13]["dysssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysssf"].ToString()), 2);
            reportdt.Rows[13]["dysssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysssl"].ToString()), 2);
            reportdt.Rows[13]["dyqssf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyqssf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyqssf"].ToString()), 2);
            reportdt.Rows[13]["dyqssl"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyqssl"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyqssl"].ToString()), 2);
            reportdt.Rows[13]["dysspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dysspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dysspwf"].ToString()), 2);
            reportdt.Rows[13]["dyqspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyqspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyqspwf"].ToString()), 2);
            reportdt.Rows[13]["dyyspwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["dyyspwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["dyyspwf"].ToString()), 2);
            reportdt.Rows[13]["shbnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shbnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shbnsf"].ToString()), 2);
            reportdt.Rows[13]["shbnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shbnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shbnpwf"].ToString()), 2);
            reportdt.Rows[13]["shqnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shqnsf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shqnsf"].ToString()), 2);
            reportdt.Rows[13]["shqnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["shqnpwf"].ToString()) + Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["shqnpwf"].ToString()), 2);

            #endregion
            return reportdt;

        }

        private DataTable Get08110010(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();

            //序号列
            reportdt.Columns.Add("xh", System.Type.GetType("System.String"));
            //水表编号
            reportdt.Columns.Add("f_sbbh", System.Type.GetType("System.String"));
            //水表类型
            reportdt.Columns.Add("f_sblx", System.Type.GetType("System.String"));
            //用水类型
            reportdt.Columns.Add("f_yslx", System.Type.GetType("System.String"));
            //单位地址
            reportdt.Columns.Add("dwdz", System.Type.GetType("System.String"));
            //水表地址
            reportdt.Columns.Add("f_sbdz", System.Type.GetType("System.String"));
            //用户名
            reportdt.Columns.Add("f_yhm", System.Type.GetType("System.String"));
            //电话
            reportdt.Columns.Add("f_dh", System.Type.GetType("System.String"));
            //类型 
            reportdt.Columns.Add("lx", System.Type.GetType("System.String"));
            //备注
            reportdt.Columns.Add("bz", System.Type.GetType("System.String"));

            DateTime datastart = new DateTime(zbsj.Year, zbsj.Month, 1);
            int month = zbsj.Month + 1;
            DateTime dataend = new DateTime();
            if (month > 12)
            {
                dataend = new DateTime((zbsj.Year + 1), 1, 1);
            }
            else
            {
                dataend = new DateTime(zbsj.Year, month, 1);
            }
            dataend = dataend.AddDays(-1);
            //时间区间
            string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

            //获取批量立户新装的客户信息
            string sql = "select b.f_sbbh,a.f_sblx,a.f_yslx,b.f_sbdz as dwdz,b.f_sbdz,a.f_yhm,b.f_dh,'新装' as lx from tbl_ld_pllhyl a,tbl_ld_khb b where a.f_khbh=b.f_khbh and a.f_khbh is not null and a.f_khztid='0' and ','||a.f_khfzid||',' like '%,4064,%' and a.SYS_LASTEDITDATE " + czsjwhere;
            DataTable pllhxzdt = _iAccessData.Query(sql).Tables[0];

            //获取大用户立户新装的客户编号ids
            sql = "select b.f_sbbh,a.f_sblx,a.f_yslx,a.f_sbdz as dwdz,a.f_sbdz,a.f_yhm,a.f_dh,'新装' as lx from TBL_LD_DYHLH a,TBL_LD_KHB b WHERE a.f_value2 = b.f_khbh and a.f_khztid='0' and ','||a.f_khfzid||',' like '%,4064,%' and a.f_czrsj " + czsjwhere;
            DataTable dyhlhxzdt = _iAccessData.Query(sql).Tables[0];

            //获取批量立户临水的客户信息
            sql = "select f_sbbh,f_sblx,f_yslx,f_sbdz as dwdz,f_sbdz,f_yhm,f_dh,'临水' as lx from tbl_ld_pllhyl where f_khbh is not null and f_khztid='4' and ','||f_khfzid||',' like '%,4064,%' and SYS_LASTEDITDATE " + czsjwhere;
            DataTable pllhlsdt = _iAccessData.Query(sql).Tables[0];

            //获取大用户立户临水的客户编号ids
            sql = "select b.f_sbbh,a.f_sblx,a.f_yslx,a.f_sbdz as dwdz,a.f_sbdz,a.f_yhm,a.f_dh,'临水' as lx from TBL_LD_DYHLH a,TBL_LD_KHB b WHERE a.f_value2 = b.f_khbh and a.f_khztid='4' and ','||a.f_khfzid||',' like '%,4064,%' and a.f_czrsj " + czsjwhere;
            DataTable dyhlhlsdt = _iAccessData.Query(sql).Tables[0];

            //获取更名的客户信息
            sql = "select c.f_sbbh,c.f_sblx,c.f_yslx,c.f_sbdz as dwdz,c.f_sbdz,c.f_yhm,c.f_dh,'更名' as lx from TBL_LD_XXBG a,TBL_LD_XXBGNR b,TBL_LD_KHB c where a.sys_id=b.fk_tbl_ld_xxbg_sys_id and a.f_khbh=c.f_khbh and b.f_bgnr='用户名' and ','||c.f_khfzid||',' like '%,4064,%' and a.f_xgsj " + czsjwhere;
            DataTable gmdt = _iAccessData.Query(sql).Tables[0];

            int count = 1;
            for (int i = 0; i < gmdt.Rows.Count; i++)
            {

                reportdt.Rows.Add(count++, gmdt.Rows[i]["f_sbbh"].ToString(), gmdt.Rows[i]["f_sblx"].ToString(), gmdt.Rows[i]["f_yslx"].ToString(), gmdt.Rows[i]["dwdz"].ToString(), gmdt.Rows[i]["f_sbdz"].ToString(), gmdt.Rows[i]["f_yhm"].ToString(), gmdt.Rows[i]["f_dh"].ToString(), gmdt.Rows[i]["lx"].ToString(), "");  //添加数据行

            }

            for (int m = 0; m < dyhlhlsdt.Rows.Count; m++)
            {

                reportdt.Rows.Add(count++, dyhlhlsdt.Rows[m]["f_sbbh"].ToString(), dyhlhlsdt.Rows[m]["f_sblx"].ToString(), dyhlhlsdt.Rows[m]["f_yslx"].ToString(), dyhlhlsdt.Rows[m]["dwdz"].ToString(), dyhlhlsdt.Rows[m]["f_sbdz"].ToString(), dyhlhlsdt.Rows[m]["f_yhm"].ToString(), dyhlhlsdt.Rows[m]["f_dh"].ToString(), dyhlhlsdt.Rows[m]["lx"].ToString(), "");  //添加数据行


            }

            for (int j = 0; j < pllhlsdt.Rows.Count; j++)
            {

                reportdt.Rows.Add(count++, pllhlsdt.Rows[j]["f_sbbh"].ToString(), pllhlsdt.Rows[j]["f_sblx"].ToString(), pllhlsdt.Rows[j]["f_yslx"].ToString(), pllhlsdt.Rows[j]["dwdz"].ToString(), pllhlsdt.Rows[j]["f_sbdz"].ToString(), pllhlsdt.Rows[j]["f_yhm"].ToString(), pllhlsdt.Rows[j]["f_dh"].ToString(), pllhlsdt.Rows[j]["lx"].ToString(), "");  //添加数据行


            }

            for (int k = 0; k < dyhlhxzdt.Rows.Count; k++)
            {

                reportdt.Rows.Add(count++, dyhlhxzdt.Rows[k]["f_sbbh"].ToString(), dyhlhxzdt.Rows[k]["f_sblx"].ToString(), dyhlhxzdt.Rows[k]["f_yslx"].ToString(), dyhlhxzdt.Rows[k]["dwdz"].ToString(), dyhlhxzdt.Rows[k]["f_sbdz"].ToString(), dyhlhxzdt.Rows[k]["f_yhm"].ToString(), dyhlhxzdt.Rows[k]["f_dh"].ToString(), dyhlhxzdt.Rows[k]["lx"].ToString(), "");  //添加数据行

            }

            for (int l = 0; l < pllhxzdt.Rows.Count; l++)
            {

                reportdt.Rows.Add(count++, pllhxzdt.Rows[l]["f_sbbh"].ToString(), pllhxzdt.Rows[l]["f_sblx"].ToString(), pllhxzdt.Rows[l]["f_yslx"].ToString(), pllhxzdt.Rows[l]["dwdz"].ToString(), pllhxzdt.Rows[l]["f_sbdz"].ToString(), pllhxzdt.Rows[l]["f_yhm"].ToString(), pllhxzdt.Rows[l]["f_dh"].ToString(), pllhxzdt.Rows[l]["lx"].ToString(), "");  //添加数据行

            }




            return reportdt;

        }

        private DataTable Get08110009(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //12个月的列和总计的列
            //序号列
            reportdt.Columns.Add("xh", System.Type.GetType("System.String"));
            //客户编号列
            reportdt.Columns.Add("khbh", System.Type.GetType("System.String"));
            //抄表日期列
            reportdt.Columns.Add("cbrq", System.Type.GetType("System.String"));
            //用户名
            reportdt.Columns.Add("yhm", System.Type.GetType("System.String"));
            //本期水量
            reportdt.Columns.Add("bqsl", System.Type.GetType("System.String"));

            DateTime datastart = new DateTime(zbsj.Year, zbsj.Month, 1);
            int month = zbsj.Month + 1;
            DateTime dataend = new DateTime();
            if (month > 12)
            {
                dataend = new DateTime((zbsj.Year + 1), 1, 1);
            }
            else
            {
                dataend = new DateTime(zbsj.Year, month, 1);
            }
            dataend = dataend.AddDays(-1);
            //时间区间
            string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

            //获取节水办抄表信息
            string sql = "select f_khbh,f_cbsj,f_yhm,f_bqsl from TBL_LD_CBIAO where ','||f_khfzid||',' like '%,4064,%' and f_cbsj " + czsjwhere;
            DataTable dt = _iAccessData.Query(sql).Tables[0];
            double total = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                reportdt.Rows.Add();
                reportdt.Rows[i]["xh"] = i + 1;
                reportdt.Rows[i]["khbh"] = dt.Rows[i]["f_khbh"];
                reportdt.Rows[i]["cbrq"] = dt.Rows[i]["f_cbsj"];
                reportdt.Rows[i]["yhm"] = dt.Rows[i]["f_yhm"];
                reportdt.Rows[i]["bqsl"] = dt.Rows[i]["f_bqsl"];
                total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["f_bqsl"].ToString());
            }
            reportdt.Rows.Add();
            reportdt.Rows[dt.Rows.Count]["xh"] = "合计";
            reportdt.Rows[dt.Rows.Count]["bqsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(total, 2);



            return reportdt;

        }

        private DataTable Get08110008(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //12个月的列和总计的列

            reportdt.Columns.Add("je", System.Type.GetType("System.String"));
            //reportdt.Rows[0] 现金
            reportdt.Rows.Add("0");
            //reportdt.Rows[1] 支票
            reportdt.Rows.Add("0");
            //reportdt.Rows[2] pose机
            reportdt.Rows.Add("0");
            //reportdt.Rows[3] 电汇
            reportdt.Rows.Add("0");
            //reportdt.Rows[4] 预存水费
            reportdt.Rows.Add("0");
            //reportdt.Rows[5] 预收结转
            reportdt.Rows.Add("0");
            //reportdt.Rows[6] 邮储划扣
            reportdt.Rows.Add("0");
            //reportdt.Rows[7] 预收消减
            reportdt.Rows.Add("0");
            //reportdt.Rows[8] 承兑
            reportdt.Rows.Add("0");
            //reportdt.Rows[9] 建行托收
            reportdt.Rows.Add("0");
            //reportdt.Rows[10] 支付宝
            reportdt.Rows.Add("0");
            //reportdt.Rows[11] 微信
            reportdt.Rows.Add("0");
            //reportdt.Rows[12] e水生活
            reportdt.Rows.Add("0");
            //reportdt.Rows[13] 邮储代缴大用户
            reportdt.Rows.Add("0");
            //reportdt.Rows[14] 光大银行网上缴费
            reportdt.Rows.Add("0");

            //reportdt.Rows[15] 合计
            reportdt.Rows.Add("0");

            DateTime datastart = new DateTime(zbsj.Year, zbsj.Month, 1);
            int month = zbsj.Month + 1;
            DateTime dataend = new DateTime();
            if (month > 12)
            {
                dataend = new DateTime((zbsj.Year + 1), 1, 1);
            }
            else
            {
                dataend = new DateTime(zbsj.Year, month, 1);
            }
            dataend = dataend.AddDays(-1);
            //时间区间
            string czsjwhere = " between to_date('" + zbsj.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + zbsj.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

            //获取缴费信息
            string sql = "select f_jffs,sum(f_shss) as total from TBL_LD_JFB where f_yyyid in (" + userid + ") and f_jfrq " + czsjwhere + " group by f_jffs";
            DataTable dt = _iAccessData.Query(sql).Tables[0];
            double total = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                switch (dt.Rows[i]["f_jffs"].ToString())
                {
                    case "现金":
                        reportdt.Rows[0]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "支票":
                        reportdt.Rows[1]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "pose机":
                        reportdt.Rows[2]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "电汇":
                        reportdt.Rows[3]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "预存水费":
                        reportdt.Rows[4]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "预收结转":
                        reportdt.Rows[5]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "邮储划扣":
                        reportdt.Rows[6]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;

                    case "预存消减":
                        reportdt.Rows[7]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;




                    case "承兑":
                        reportdt.Rows[8]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "建行托收":
                        reportdt.Rows[9]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "支付宝":
                        reportdt.Rows[10]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "微信":
                        reportdt.Rows[11]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "e水生活缴费":
                        reportdt.Rows[12]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "邮储代缴大用户":
                        reportdt.Rows[13]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "光大银行网上缴费":
                        reportdt.Rows[14]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                }
            }

            //获取IC售水信息
            sql = "select f_jffs,sum(f_shss) as total from TBL_LD_ICKSS where f_xiekrid in (" + userid + ") and f_xiekrq " + czsjwhere + " group by f_jffs";
            dt = _iAccessData.Query(sql).Tables[0];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                switch (dt.Rows[i]["f_jffs"].ToString())
                {
                    case "现金":
                        reportdt.Rows[0]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[0]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "支票":
                        reportdt.Rows[1]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[1]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "pose机":
                        reportdt.Rows[2]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[2]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "电汇":
                        reportdt.Rows[3]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[3]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "预存水费":
                        reportdt.Rows[4]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[4]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "预收结转":
                        reportdt.Rows[5]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "邮储划扣":
                        reportdt.Rows[6]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;

                    case "预存消减":
                        reportdt.Rows[7]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[7]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;




                    case "承兑":
                        reportdt.Rows[8]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[8]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "建行托收":
                        reportdt.Rows[9]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[9]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "支付宝":
                        reportdt.Rows[10]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[10]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "微信":
                        reportdt.Rows[11]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["je"].ToString()) + Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString()), 2);
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "e水生活缴费":
                        reportdt.Rows[12]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "邮储代缴大用户":
                        reportdt.Rows[13]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                    case "光大银行网上缴费":
                        reportdt.Rows[14]["je"] = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        total += Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["total"].ToString());
                        break;
                }
            }


            reportdt.Rows[15]["je"] = Eva.Library.Text.NumberTool.GetNumberByLength(total, 2);



            return reportdt;

        }

        private DataTable Get08110007(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //循环12个月创建空列
            for (int j = 1; j <= 13; j++)
            {
                reportdt.Columns.Add("zs" + j, System.Type.GetType("System.String"));//总户数
                reportdt.Columns.Add("sc" + j, System.Type.GetType("System.String"));//实抄
                reportdt.Columns.Add("cjl" + j, System.Type.GetType("System.String"));//抄见率
                reportdt.Columns.Add("qf" + j, System.Type.GetType("System.String"));//清费
                reportdt.Columns.Add("ts" + j, System.Type.GetType("System.String"));//停水
                reportdt.Columns.Add("qfl" + j, System.Type.GetType("System.String"));//清费率

            }
            //共62行 0-5 DH抄本 6大用户IC 7大用户小计 8-55 J0/JD抄本 56总表 57IC居民 58远传 59大用户小计 60总计 61平均抄见率
            for (int row = 0; row < 61; row++)
            {
                reportdt.Rows.Add("0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%", "0", "0", "0%");
            }
            reportdt.Rows.Add();
            //定义各抄本总户数
            double zsDH014 = 0;
            double zsDH015 = 0;
            double zsDH016 = 0;
            double zsDH017 = 0;
            double zsDH018 = 0;
            double zsDH019 = 0;
            double zsDHIC = 0;
            //double zsDHxj = 0;
            double zsJ001A = 0;
            double zsJ001B = 0;
            double zsJ002A = 0;
            double zsJ002B = 0;
            double zsJ003A = 0;
            double zsJ003B = 0;
            double zsJ004A = 0;
            double zsJ004B = 0;
            double zsJ005A = 0;
            double zsJ005B = 0;
            double zsJ006A = 0;
            double zsJ006B = 0;
            double zsJ007A = 0;
            double zsJ007B = 0;
            double zsJ008A = 0;
            double zsJ008B = 0;
            double zsJ009A = 0;
            double zsJ009B = 0;
            double zsJ010A = 0;
            double zsJ010B = 0;
            double zsJ011A = 0;
            double zsJ011B = 0;
            double zsJ012A = 0;
            double zsJ012B = 0;
            double zsJ013A = 0;
            double zsJ013B = 0;
            double zsJD04A = 0;
            double zsJD04B = 0;
            double zsJD05A = 0;
            double zsJD05B = 0;
            double zsJD06A = 0;
            double zsJD06B = 0;
            double zsJD07A = 0;
            double zsJD07B = 0;
            double zsJD08A = 0;
            double zsJD08B = 0;
            double zsJD09A = 0;
            double zsJD09B = 0;
            double zsJD10A = 0;
            double zsJD10B = 0;
            double zsJD11A = 0;
            double zsJD11B = 0;
            double zsJD12A = 0;
            double zsJD12B = 0;
            double zsJD13A = 0;
            double zsJD13B = 0;
            double zsJD14A = 0;
            double zsJD14B = 0;
            double zsZB = 0;
            double zsJMIC = 0;
            double zsYC = 0;
            //double zsJMxj = 0;



            #region 获得各抄本的总户数
            string sql = "select f_cbbh,count(f_cbbh) as count from tbl_ld_khb where f_ztid in ('0','4') and sys_delflag='0' group by f_cbbh";
            DataTable dt = _iAccessData.Query(sql).Tables[0];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                switch (dt.Rows[i]["f_cbbh"].ToString())
                {
                    case "DH014":
                        zsDH014 = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsDH014, 0, reportdt);
                        break;
                    case "DH015":
                        zsDH015 = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsDH015, 1, reportdt);
                        break;
                    case "DH016":
                        zsDH016 = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsDH016, 2, reportdt);
                        break;
                    case "DH017":
                        zsDH017 = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsDH017, 3, reportdt);
                        break;
                    case "DH018":
                        zsDH018 = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsDH018, 4, reportdt);
                        break;
                    case "DH019":
                        zsDH019 = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsDH019, 5, reportdt);
                        break;
                    case "J001A":
                        zsJ001A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ001A, 8, reportdt);
                        break;
                    case "J001B":
                        zsJ001B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ001B, 9, reportdt);
                        break;
                    case "J002A":
                        zsJ002A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ002A, 10, reportdt);
                        break;
                    case "J002B":
                        zsJ002B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ002B, 11, reportdt);
                        break;
                    case "J003A":
                        zsJ003A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ003A, 12, reportdt);
                        break;
                    case "J003B":
                        zsJ003B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ003B, 13, reportdt);
                        break;
                    case "J004A":
                        zsJ004A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ004A, 14, reportdt);
                        break;
                    case "J004B":
                        zsJ004B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ004B, 15, reportdt);
                        break;
                    case "J005A":
                        zsJ005A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ005A, 16, reportdt);
                        break;
                    case "J005B":
                        zsJ005B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ005B, 17, reportdt);
                        break;
                    case "J006A":
                        zsJ006A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ006A, 18, reportdt);
                        break;
                    case "J006B":
                        zsJ006B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ006B, 19, reportdt);
                        break;
                    case "J007A":
                        zsJ007A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ007A, 20, reportdt);
                        break;
                    case "J007B":
                        zsJ007B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ007B, 21, reportdt);
                        break;
                    case "J008A":
                        zsJ008A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ008A, 22, reportdt);
                        break;
                    case "J008B":
                        zsJ008B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ008B, 23, reportdt);
                        break;
                    case "J009A":
                        zsJ009A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ009A, 24, reportdt);
                        break;
                    case "J009B":
                        zsJ009B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ009B, 25, reportdt);
                        break;
                    case "J010A":
                        zsJ010A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ010A, 26, reportdt);
                        break;
                    case "J010B":
                        zsJ010B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ010B, 27, reportdt);
                        break;
                    case "J011A":
                        zsJ011A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ011A, 28, reportdt);
                        break;
                    case "J011B":
                        zsJ011B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ011B, 29, reportdt);
                        break;
                    case "J012A":
                        zsJ012A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ012A, 30, reportdt);
                        break;
                    case "J012B":
                        zsJ012B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ012B, 31, reportdt);
                        break;
                    case "J013A":
                        zsJ013A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ013A, 32, reportdt);
                        break;
                    case "J013B":
                        zsJ013B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJ013B, 33, reportdt);
                        break;
                    case "JD04A":
                        zsJD04A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD04A, 34, reportdt);
                        break;
                    case "JD04B":
                        zsJD04B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD04B, 35, reportdt);
                        break;
                    case "JD05A":
                        zsJD05A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD05A, 36, reportdt);
                        break;
                    case "JD05B":
                        zsJD05B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD05B, 37, reportdt);
                        break;
                    case "JD06A":
                        zsJD06A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD06A, 38, reportdt);
                        break;
                    case "JD06B":
                        zsJD06B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD06B, 39, reportdt);
                        break;
                    case "JD07A":
                        zsJD07A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD07A, 40, reportdt);
                        break;
                    case "JD07B":
                        zsJD07B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD07B, 41, reportdt);
                        break;
                    case "JD08A":
                        zsJD08A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD08A, 42, reportdt);
                        break;
                    case "JD08B":
                        zsJD08B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD08B, 43, reportdt);
                        break;
                    case "JD09A":
                        zsJD09A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD09A, 44, reportdt);
                        break;
                    case "JD09B":
                        zsJD09B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD09B, 45, reportdt);
                        break;
                    case "JD10A":
                        zsJD10A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD10A, 46, reportdt);
                        break;
                    case "JD10B":
                        zsJD10B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD10B, 47, reportdt);
                        break;
                    case "JD11A":
                        zsJD11A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD11A, 48, reportdt);
                        break;
                    case "JD11B":
                        zsJD11B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD11B, 49, reportdt);
                        break;
                    case "JD12A":
                        zsJD12A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD12A, 50, reportdt);
                        break;
                    case "JD12B":
                        zsJD12B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD12B, 51, reportdt);
                        break;
                    case "JD13A":
                        zsJD13A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD13A, 52, reportdt);
                        break;
                    case "JD13B":
                        zsJD13B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD13B, 53, reportdt);
                        break;
                    case "JD14A":
                        zsJD14A = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD14A, 54, reportdt);
                        break;
                    case "JD14B":
                        zsJD14B = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsJD14B, 55, reportdt);
                        break;
                    case "ZB020":
                        zsZB = Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["count"].ToString());
                        reportdt = setzs(zsZB, 56, reportdt);
                        break;
                }

            }

            //统计IC卡用户数
            sql = "select count(*) as count from tbl_ld_khb where f_ztid in ('0','4') and sys_delflag='0' and f_cbbh like 'IC%' and f_yslxid='2'";
            sql += "union all";
            sql += " select count(*) as count from tbl_ld_khb where f_ztid in ('0', '4') and sys_delflag = '0' and f_cbbh like 'IC%' and f_yslxid != '2'";
            sql += "union all";
            sql += " select count(*) as count from tbl_ld_khb where f_ztid in ('0', '4') and sys_delflag = '0' and f_cbbh like 'YC%'";

            dt = _iAccessData.Query(sql).Tables[0];
            zsJMIC = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["count"].ToString());
            reportdt = setzs(zsJMIC, 6, reportdt);
            zsDHIC = Eva.Library.Text.NumberTool.Parse(dt.Rows[1]["count"].ToString());
            reportdt = setzs(zsDHIC, 57, reportdt);
            zsYC = Eva.Library.Text.NumberTool.Parse(dt.Rows[2]["count"].ToString());
            reportdt = setzs(zsYC, 58, reportdt);
            #endregion

            //循环12个月  1级循环
            for (int i = 0; i < 13; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                if (i < 11)
                {
                    datastart = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = new DateTime(zbsj.Year, (i + 2), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 11)
                {
                    datastart = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, 1, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }


                //时间区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

                //获取抄表户数
                sql = "select f_cbbh,count(f_cbbh) as count from tbl_ld_cbiao where f_ztid !='0' and f_ztid !='9' and f_cbsj " + czsjwhere + "  group by f_cbbh";
                DataTable cbdt = _iAccessData.Query(sql).Tables[0];

                reportdt = Get08110007Dt(reportdt, cbdt, i, "sc");

                //获取清费户数
                sql = "select f_cbbh,count(f_cbbh) as count from tbl_ld_cbiao where f_ztid !='0' and f_ztid !='9' and f_cbsj " + czsjwhere + " and f_jfsj " + czsjwhere + "  group by f_cbbh";
                DataTable jfdt = _iAccessData.Query(sql).Tables[0];

                reportdt = Get08110007Dt(reportdt, jfdt, i, "qf");

                //获取停水户数
                sql = "select b.f_cbbh,count(b.f_cbbh) as count from tbl_ld_qftsyl a,tbl_ld_khb b where a.f_khbh=b.f_khbh and a.sys_lasteditdate " + czsjwhere + " group by b.f_cbbh";
                DataTable tsdt = _iAccessData.Query(sql).Tables[0];
                reportdt = Get08110007Dt(reportdt, tsdt, i, "ts");

                //填充IC卡用户
                reportdt.Rows[6]["sc" + (i + 1)] = "0";
                reportdt.Rows[6]["qf" + (i + 1)] = "0";
                reportdt.Rows[6]["ts" + (i + 1)] = "0";
                reportdt.Rows[57]["sc" + (i + 1)] = "0";
                reportdt.Rows[57]["qf" + (i + 1)] = "0";
                reportdt.Rows[57]["ts" + (i + 1)] = "0";

                double jmzstotal = 0;
                double jmsctotal = 0;
                double jmqftotal = 0;
                double jmtstotal = 0;
                double dhzstotal = 0;
                double dhsctotal = 0;
                double dhqftotal = 0;
                double dhtstotal = 0;

                //统计计算
                for (int l = 0; l < 62; l++)
                {
                    //居民部分
                    if (l < 7)
                    {
                        jmzstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString());
                        jmsctotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["sc" + (i + 1)].ToString());
                        jmqftotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["qf" + (i + 1)].ToString());
                        jmtstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["ts" + (i + 1)].ToString());
                        double cjl = 0;
                        if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) != 0)
                        {
                            cjl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["sc" + (i + 1)].ToString()) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) * 100;

                        }
                        reportdt.Rows[l]["cjl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(cjl, 2) + "%";
                        double qfl = 0;
                        if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) != 0)
                        {
                            qfl = (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["qf" + (i + 1)].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["ts" + (i + 1)].ToString())) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) * 100;

                        }
                        reportdt.Rows[l]["qfl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(qfl, 2) + "%";

                    }
                    //居民小计
                    if (l == 7)
                    {
                        reportdt.Rows[l]["zs" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(jmzstotal, 0);
                        reportdt.Rows[l]["sc" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(jmsctotal, 0);
                        reportdt.Rows[l]["ts" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(jmtstotal, 0);
                        double cjl = jmsctotal / jmzstotal * 100;
                        reportdt.Rows[l]["cjl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(cjl, 2) + "%";
                        double qfl = (jmqftotal - jmtstotal) / jmzstotal * 100;
                        reportdt.Rows[l]["qfl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(qfl, 2) + "%";

                    }
                    //大户部分
                    if (l > 7 && l < 59)
                    {
                        dhzstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString());
                        dhsctotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["sc" + (i + 1)].ToString());
                        dhqftotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["qf" + (i + 1)].ToString());
                        dhtstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["ts" + (i + 1)].ToString());
                        double cjl = 0;
                        if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) != 0)
                        {
                            cjl = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["sc" + (i + 1)].ToString()) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) * 100;

                        }
                        reportdt.Rows[l]["cjl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(cjl, 2) + "%";
                        double qfl = 0;
                        if (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) != 0)
                        {
                            qfl = (Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["qf" + (i + 1)].ToString()) - Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["ts" + (i + 1)].ToString())) / Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + (i + 1)].ToString()) * 100;

                        }
                        reportdt.Rows[l]["qfl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(qfl, 2) + "%";

                    }
                    //大户小计
                    if (l == 59)
                    {
                        reportdt.Rows[l]["zs" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(dhzstotal, 0);
                        reportdt.Rows[l]["sc" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(dhsctotal, 0);
                        reportdt.Rows[l]["ts" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(dhtstotal, 0);
                        double cjl = dhsctotal / dhzstotal * 100;
                        reportdt.Rows[l]["cjl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(cjl, 2) + "%";
                        double qfl = (dhqftotal - dhtstotal) / dhzstotal * 100;
                        reportdt.Rows[l]["qfl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(qfl, 2) + "%";

                    }
                    //总计
                    if (l == 60)
                    {
                        reportdt.Rows[l]["zs" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength((dhzstotal + jmzstotal), 0);
                        reportdt.Rows[l]["sc" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength((dhsctotal + jmsctotal), 0);
                        reportdt.Rows[l]["ts" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength((dhtstotal + jmtstotal), 0);
                        double cjl = (dhsctotal + jmsctotal) / (dhzstotal + jmzstotal) * 100;
                        reportdt.Rows[l]["cjl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(cjl, 2) + "%";
                        double qfl = ((dhqftotal + jmqftotal) - (dhtstotal + jmtstotal)) / (dhzstotal + jmzstotal) * 100;
                        reportdt.Rows[l]["qfl" + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(qfl, 2) + "%";

                    }

                }

            }

            reportdt.Rows[61]["zs1"] = reportdt.Rows[60]["cjl13"].ToString();

            return reportdt;

        }

        private DataTable Get08110007Dt(DataTable reportdt, DataTable dt, int i, string type)
        {
            for (int k = 0; k < dt.Rows.Count; k++)
            {
                switch (dt.Rows[k]["f_cbbh"].ToString())
                {
                    case "DH014":
                        reportdt.Rows[0][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "DH015":
                        reportdt.Rows[1][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "DH016":
                        reportdt.Rows[2][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "DH017":
                        reportdt.Rows[3][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "DH018":
                        reportdt.Rows[4][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "DH019":
                        reportdt.Rows[5][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J001A":
                        reportdt.Rows[8][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J001B":
                        reportdt.Rows[9][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J002A":
                        reportdt.Rows[10][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J002B":
                        reportdt.Rows[11][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J003A":
                        reportdt.Rows[12][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J003B":
                        reportdt.Rows[13][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J004A":
                        reportdt.Rows[14][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J004B":
                        reportdt.Rows[15][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J005A":
                        reportdt.Rows[16][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J005B":
                        reportdt.Rows[17][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J006A":
                        reportdt.Rows[18][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J006B":
                        reportdt.Rows[19][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J007A":
                        reportdt.Rows[20][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J007B":
                        reportdt.Rows[21][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J008A":
                        reportdt.Rows[22][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J008B":
                        reportdt.Rows[23][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J009A":
                        reportdt.Rows[24][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J009B":
                        reportdt.Rows[25][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J010A":
                        reportdt.Rows[26][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J010B":
                        reportdt.Rows[27][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J011A":
                        reportdt.Rows[28][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J011B":
                        reportdt.Rows[29][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J012A":
                        reportdt.Rows[30][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J012B":
                        reportdt.Rows[31][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J013A":
                        reportdt.Rows[32][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "J013B":
                        reportdt.Rows[33][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD04A":
                        reportdt.Rows[34][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD04B":
                        reportdt.Rows[35][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD05A":
                        reportdt.Rows[36][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD05B":
                        reportdt.Rows[37][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD06A":
                        reportdt.Rows[38][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD06B":
                        reportdt.Rows[39][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD07A":
                        reportdt.Rows[40][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD07B":
                        reportdt.Rows[41][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD08A":
                        reportdt.Rows[42][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD08B":
                        reportdt.Rows[43][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD09A":
                        reportdt.Rows[44][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD09B":
                        reportdt.Rows[45][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD10A":
                        reportdt.Rows[46][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD10B":
                        reportdt.Rows[47][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD11A":
                        reportdt.Rows[48][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD11B":
                        reportdt.Rows[49][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD12A":
                        reportdt.Rows[50][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD12B":
                        reportdt.Rows[51][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD13A":
                        reportdt.Rows[52][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD13B":
                        reportdt.Rows[53][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD14A":
                        reportdt.Rows[54][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "JD14B":
                        reportdt.Rows[55][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "ZB020":
                        reportdt.Rows[56][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        break;
                    case "YC000":
                        if (reportdt.Rows[58][type + (i + 1)].ToString().Length > 0)
                        {
                            double temp = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[58][type + (i + 1)].ToString());
                            temp += Eva.Library.Text.NumberTool.Parse(dt.Rows[k]["count"].ToString());
                            reportdt.Rows[58][type + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(temp, 0);
                        }
                        else
                        {
                            reportdt.Rows[58][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        }
                        break;
                    case "YC001":
                        if (reportdt.Rows[58][type + (i + 1)].ToString().Length > 0)
                        {
                            double temp = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[58][type + (i + 1)].ToString());
                            temp += Eva.Library.Text.NumberTool.Parse(dt.Rows[k]["count"].ToString());
                            reportdt.Rows[58][type + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(temp, 0);
                        }
                        else
                        {
                            reportdt.Rows[58][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        }
                        break;
                    case "YC021":
                        if (reportdt.Rows[58][type + (i + 1)].ToString().Length > 0)
                        {
                            double temp = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[58][type + (i + 1)].ToString());
                            temp += Eva.Library.Text.NumberTool.Parse(dt.Rows[k]["count"].ToString());
                            reportdt.Rows[58][type + (i + 1)] = Eva.Library.Text.NumberTool.GetNumberByLength(temp, 0);
                        }
                        else
                        {
                            reportdt.Rows[58][type + (i + 1)] = dt.Rows[k]["count"].ToString();
                        }
                        break;
                }
            }
            return reportdt;
        }

        private DataTable setzs(double result, int row, DataTable reportdt)
        {
            for (int i = 1; i <= 13; i++)
            {
                if (i < 13)
                {
                    reportdt.Rows[row]["zs" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(result, 2);
                }
                else
                {
                    int cbzq = 2;
                    if (row >= 8 && row <= 33)
                    {
                        cbzq = 1;
                    }
                    reportdt.Rows[row]["zs" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(result * 6 * cbzq, 2);
                }
            }
            return reportdt;

        }

        private DataTable Get08110006(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //12个月的列和总计的列
            reportdt.Columns.Add("sbzs", System.Type.GetType("System.String"));

            for (int j = 1; j <= 13; j++)
            {
                reportdt.Columns.Add("xz" + j, System.Type.GetType("System.String"));//新装
                reportdt.Columns.Add("wx" + j, System.Type.GetType("System.String"));//维修换表
                reportdt.Columns.Add("gz" + j, System.Type.GetType("System.String"));//改造换表
                reportdt.Columns.Add("xj" + j, System.Type.GetType("System.String"));//小计
            }
            //reportdt.Rows[0] 入户直说
            reportdt.Rows.Add();
            //reportdt.Rows[1] 总表
            reportdt.Rows.Add();
            //reportdt.Rows[2] 卡表
            reportdt.Rows.Add();
            //reportdt.Rows[3] 远传表
            reportdt.Rows.Add();
            //reportdt.Rows[4] 居民小计
            reportdt.Rows.Add();

            //reportdt.Rows[5] 大客户机械表
            reportdt.Rows.Add();
            //reportdt.Rows[6] 大客户IC卡表
            reportdt.Rows.Add();
            //reportdt.Rows[7] 大客户小计
            reportdt.Rows.Add();
            //reportdt.Rows[8] 总计
            reportdt.Rows.Add();

            //水表总数统计
            string sql = "select";
            sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4053,%') as jm, ";
            sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4058,%') as zb,";
            sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4063,%') as ic,";
            sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4054,%') as yc,";
            sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid != '2' and f_sblxid='100') as dhjx,";
            sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid != '2' and ',' || k.f_khfzid || ',' like '%,4063,%') as dhic";
            sql += " from dual";
            DataTable dt = _iAccessData.Query(sql).Tables[0];
            //居民新增赋值
            reportdt.Rows[0]["sbzs"] = dt.Rows[0]["jm"].ToString();
            reportdt.Rows[1]["sbzs"] = dt.Rows[0]["zb"].ToString();
            reportdt.Rows[2]["sbzs"] = dt.Rows[0]["ic"].ToString();
            reportdt.Rows[3]["sbzs"] = dt.Rows[0]["yc"].ToString();
            reportdt.Rows[5]["sbzs"] = dt.Rows[0]["dhjx"].ToString();
            reportdt.Rows[6]["sbzs"] = dt.Rows[0]["dhic"].ToString();

            //合计行
            reportdt.Rows[4]["sbzs"] = (int.Parse(reportdt.Rows[0]["sbzs"].ToString()) + int.Parse(reportdt.Rows[1]["sbzs"].ToString()) + int.Parse(reportdt.Rows[2]["sbzs"].ToString()) + int.Parse(reportdt.Rows[3]["sbzs"].ToString())).ToString();
            reportdt.Rows[7]["sbzs"] = (int.Parse(reportdt.Rows[5]["sbzs"].ToString()) + int.Parse(reportdt.Rows[6]["sbzs"].ToString())).ToString();

            reportdt.Rows[8]["sbzs"] = (int.Parse(reportdt.Rows[4]["sbzs"].ToString()) + int.Parse(reportdt.Rows[7]["sbzs"].ToString())).ToString();



            //循环12个月
            for (int i = 1; i < 13; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                if (i < 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }
                //时间区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";


                #region 居民、大用户新增部分
                //获取批量立户的客户编号ids
                sql = "select XMLAGG(XMLELEMENT(E, f_khbh || ',')).EXTRACT('//text()').getclobval() from tbl_ld_pllhyl where f_khbh is not null and SYS_LASTEDITDATE " + czsjwhere;
                string pllhkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //获取大用户立户的客户编号ids
                sql = "select XMLAGG(XMLELEMENT(E, f_value2 || ',')).EXTRACT('//text()').getclobval() from tbl_ld_dyhlh where f_value2 is not null and f_czrsj " + czsjwhere;
                string dyhlhkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //所有立户人员的客户编号
                string lhkhids = (pllhkhids + "," + dyhlhkhids).Trim(',');
                reportdt = Get08110004Dt(reportdt, lhkhids, i, "xz", _iAccessData);
                #endregion

                #region 居民、大用户维修部分
                //换表流程维修查询
                sql = "select XMLAGG(XMLELEMENT(E, b.f_khbh || ',')).EXTRACT('//text()').getclobval() from tbl_ld_ghsb b where b.f_value2='维修更换' and b.f_ztid='2' and b.f_czsj " + czsjwhere;
                string wxlckhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //IC卡换表补卡
                sql = "select XMLAGG(XMLELEMENT(E, f_khbh || ',')).EXTRACT('//text()').getclobval() from TBL_LD_ICHBBK where f_ztid='2' and to_date(f_xiekrq,'yyyy-MM-dd hh24:mi:ss') " + czsjwhere;
                string ickhids = _iAccessData.GetSingle(sql).ToString().Trim(',');

                string wxkhids = (wxlckhids + "," + ickhids).Trim(',');

                reportdt = Get08110004Dt(reportdt, wxkhids, i, "wx", _iAccessData);

                #endregion

                #region 居民、大用户改造部分
                //销户流程查询
                sql = "select XMLAGG(XMLELEMENT(E, b.f_khbh || ',')).EXTRACT('//text()').getclobval() from tbl_ld_ghsb b where b.f_value2='改造更换' and b.f_ztid='2' and b.f_czsj " + czsjwhere;
                string gzlckhids = _iAccessData.GetSingle(sql).ToString().Trim(',');

                reportdt = Get08110004Dt(reportdt, gzlckhids, i, "gz", _iAccessData);

                #endregion


                #region 用户总数
                for (int l = 0; l < 9; l++)
                {
                    reportdt.Rows[l]["xj" + i] = (int.Parse(reportdt.Rows[l]["xz" + i].ToString()) + int.Parse(reportdt.Rows[l]["wx" + i].ToString()) + int.Parse(reportdt.Rows[l]["gz" + i].ToString())).ToString();
                }
                #endregion
            }

            //统计全年数据
            for (int l = 0; l < 9; l++)
            {
                double xztotal = 0;
                double wxtotal = 0;
                double gztotal = 0;
                double xjtotal = 0;
                for (int m = 1; m < 13; m++)
                {
                    xztotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["xz" + m].ToString());
                    wxtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["wx" + m].ToString());
                    gztotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["gz" + m].ToString());
                    xjtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["xj" + m].ToString());
                }
                reportdt.Rows[l]["xz13"] = Eva.Library.Text.NumberTool.GetNumberByLength(xztotal, 2);
                reportdt.Rows[l]["wx13"] = Eva.Library.Text.NumberTool.GetNumberByLength(wxtotal, 2);
                reportdt.Rows[l]["gz13"] = Eva.Library.Text.NumberTool.GetNumberByLength(gztotal, 2);
                reportdt.Rows[l]["xj13"] = Eva.Library.Text.NumberTool.GetNumberByLength(xjtotal, 2);
            }


            return reportdt;

        }

        private DataTable Get08110005(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //从2010年开始一直到选择制表时间作为列  
            for (int year = 2010; year <= zbsj.Year; year++)
            {
                reportdt.Columns.Add(year + "年", System.Type.GetType("System.String"));
            }
            reportdt.Columns.Add("总计", System.Type.GetType("System.String"));
            //reportdt.Rows[0] 1月份
            reportdt.Rows.Add();
            //reportdt.Rows[1] 2月份
            reportdt.Rows.Add();
            //reportdt.Rows[2] 3月份
            reportdt.Rows.Add();
            //reportdt.Rows[3] 4月份
            reportdt.Rows.Add();
            //reportdt.Rows[4] 5月份
            reportdt.Rows.Add();
            //reportdt.Rows[5] 6月份
            reportdt.Rows.Add();
            //reportdt.Rows[6] 7月份
            reportdt.Rows.Add();
            //reportdt.Rows[7] 8月份
            reportdt.Rows.Add();
            //reportdt.Rows[8] 9月份
            reportdt.Rows.Add();
            //reportdt.Rows[9] 10月份
            reportdt.Rows.Add();
            //reportdt.Rows[10] 11月份
            reportdt.Rows.Add();
            //reportdt.Rows[11] 12月份
            reportdt.Rows.Add();
            //reportdt.Rows[12] 总计
            reportdt.Rows.Add();
            //reportdt.Rows[13] 欠费占比
            reportdt.Rows.Add();
            double total = 0;
            //循环年 1级循环
            for (int year = 2010; year <= zbsj.Year; year++)
            {
                double yeartotal = 0;
                //循环月 2级循环
                for (int i = 0; i < 12; i++)
                {
                    DateTime datastart = new DateTime();
                    DateTime dataend = new DateTime();
                    if (i < 11)
                    {
                        datastart = new DateTime(year, (i + 1), 1);
                        dataend = new DateTime(year, (i + 2), 1);
                        dataend = dataend.AddDays(-1);
                    }
                    else if (i == 11)
                    {
                        datastart = new DateTime(year, (i + 1), 1);
                        dataend = new DateTime(year, 12, 31);
                    }

                    //时间区间
                    string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";

                    //获取欠费金额
                    string sql = "select sum(f_bqje) from TBL_LD_CBIAO where (f_yslxid != '2' OR f_cbbh='ZB020') and f_ztid='2' and f_cbsj " + czsjwhere;
                    double qfje = Eva.Library.Text.NumberTool.Parse(_iAccessData.GetSingle(sql).ToString());
                    yeartotal += qfje;

                    reportdt.Rows[i][year + "年"] = Eva.Library.Text.NumberTool.GetNumberByLength(qfje, 2);
                }


                total += yeartotal;
                //年小计
                reportdt.Rows[12][year + "年"] = Eva.Library.Text.NumberTool.GetNumberByLength(yeartotal, 2);
            }
            //总计
            reportdt.Rows[0]["总计"] = Eva.Library.Text.NumberTool.GetNumberByLength(total, 2);
            //年占比计算
            for (int year = 2010; year <= zbsj.Year; year++)
            {
                double nqfje = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12][year + "年"].ToString());
                double bl = nqfje / total * 100;
                reportdt.Rows[13][year + "年"] = Eva.Library.Text.NumberTool.GetNumberByLength(bl, 2) + "%";
            }
            reportdt.Rows[13]["总计"] = "100%";
            return reportdt;

        }

        private DataTable Get08110003(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //12个月的列和总计的列
            for (int j = 1; j <= 13; j++)
            {
                reportdt.Columns.Add("xz" + j, System.Type.GetType("System.String"));
                reportdt.Columns.Add("ty" + j, System.Type.GetType("System.String"));
                reportdt.Columns.Add("xh" + j, System.Type.GetType("System.String"));
                reportdt.Columns.Add("gh" + j, System.Type.GetType("System.String"));
                reportdt.Columns.Add("zs" + j, System.Type.GetType("System.String"));
            }
            //reportdt.Rows[0] 总表
            reportdt.Rows.Add();
            //reportdt.Rows[1] 卡表
            reportdt.Rows.Add();
            //reportdt.Rows[2] 远传表
            reportdt.Rows.Add();
            //reportdt.Rows[3] 入户直说
            reportdt.Rows.Add();
            //reportdt.Rows[4] 居民小计
            reportdt.Rows.Add();
            //reportdt.Rows[5] 大客户A区
            reportdt.Rows.Add();
            //reportdt.Rows[6] 大客户B区
            reportdt.Rows.Add();
            //reportdt.Rows[7] 大客户C区
            reportdt.Rows.Add();
            //reportdt.Rows[8] 大客户D区
            reportdt.Rows.Add();
            //reportdt.Rows[9] 大客户E区
            reportdt.Rows.Add();
            //reportdt.Rows[10] 大客户F区
            reportdt.Rows.Add();
            //reportdt.Rows[11] 大客户G区
            reportdt.Rows.Add();
            //reportdt.Rows[12] 大客户H区
            reportdt.Rows.Add();
            //reportdt.Rows[13] 大客户I区
            reportdt.Rows.Add();
            //reportdt.Rows[14] 大客户J区
            reportdt.Rows.Add();
            //reportdt.Rows[15] 大客户小计
            reportdt.Rows.Add();
            //reportdt.Rows[16] 总计
            reportdt.Rows.Add();

            //循环12个月
            for (int i = 1; i < 13; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                if (i < 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }

                //时间区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";


                #region 居民、大用户新增部分
                //获取批量立户的客户编号ids
                string sql = "select XMLAGG(XMLELEMENT(E, f_khbh || ',')).EXTRACT('//text()').getclobval() from tbl_ld_pllhyl where f_khbh is not null and SYS_LASTEDITDATE " + czsjwhere;
                string pllhkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //获取大用户立户的客户编号ids
                sql = "select XMLAGG(XMLELEMENT(E, f_value2 || ',')).EXTRACT('//text()').getclobval() from tbl_ld_dyhlh where f_value2 is not null and f_czrsj " + czsjwhere;
                string dyhlhkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //所有立户人员的客户编号
                string lhkhids = (pllhkhids + "," + dyhlhkhids).Trim(',');
                reportdt = Get08110003Dt(reportdt, lhkhids, i, "xz", _iAccessData);
                #endregion

                #region 居民、大用户停用部分
                //报停流程查询
                sql = "select XMLAGG(XMLELEMENT(E, b.f_khbh || ',')).EXTRACT('//text()').getclobval() from tbl_ld_xhhbt a,tbl_ld_xhhbtzb b,tbl_maintable c where a.sys_id=b.fk_tbl_ld_xhhbt_sys_id and a.fk_tbl_maintable_sys_id = c.sys_id and a.f_ztid='2' and c.xmlxid='7' and a.f_czsj " + czsjwhere;
                string btlckhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //报停信息变更（预作）
                sql = "select XMLAGG(XMLELEMENT(E, a.f_khbh || ',')).EXTRACT('//text()').getclobval() from TBL_LD_XXBG a,TBL_LD_XXBGNR b where a.sys_id=b.fk_tbl_ld_xxbg_sys_id and b.f_bgnr='状态' and b.f_value9='tbl_ld_khb' and b.f_singledropdownlist_new='停用' and a.f_xgsj " + czsjwhere;
                string btbgkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');

                string btkhids = (btlckhids + "," + btbgkhids).Trim(',');

                reportdt = Get08110003Dt(reportdt, btkhids, i, "ty", _iAccessData);

                #endregion

                #region 居民、大用户销户部分
                //销户流程查询
                sql = "select XMLAGG(XMLELEMENT(E, b.f_khbh || ',')).EXTRACT('//text()').getclobval() from tbl_ld_xhhbt a,tbl_ld_xhhbtzb b,tbl_maintable c where a.sys_id=b.fk_tbl_ld_xhhbt_sys_id and a.fk_tbl_maintable_sys_id = c.sys_id and a.f_ztid='2' and c.xmlxid='6' and a.f_czsj " + czsjwhere;
                string xhlckhids = _iAccessData.GetSingle(sql).ToString().Trim(',');
                //销户信息变更（预作）
                sql = "select XMLAGG(XMLELEMENT(E, a.f_khbh || ',')).EXTRACT('//text()').getclobval() from TBL_LD_XXBG a,TBL_LD_XXBGNR b where a.sys_id=b.fk_tbl_ld_xxbg_sys_id and b.f_bgnr='状态' and b.f_value9='tbl_ld_khb' and b.f_singledropdownlist_new='销户' and a.f_xgsj " + czsjwhere;
                string xhbgkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');

                string xhkhids = (xhlckhids + "," + xhbgkhids).Trim(',');
                reportdt = Get08110003Dt(reportdt, xhkhids, i, "xh", _iAccessData);

                #endregion

                #region 居民、大用户过户部分
                sql = "select XMLAGG(XMLELEMENT(E, a.f_khbh || ',')).EXTRACT('//text()').getclobval() from TBL_LD_XXBG a,TBL_LD_XXBGNR b where a.sys_id=b.fk_tbl_ld_xxbg_sys_id and b.f_bgnr='用户名' and a.f_xgsj " + czsjwhere;
                string ghkhids = _iAccessData.GetSingle(sql).ToString().Trim(',');

                reportdt = Get08110003Dt(reportdt, ghkhids, i, "gh", _iAccessData);
                #endregion

                #region 用户总数
                for (int l = 0; l < 17; l++)
                {
                    reportdt.Rows[l]["zs" + i] = (int.Parse(reportdt.Rows[l]["xz" + i].ToString()) + int.Parse(reportdt.Rows[l]["ty" + i].ToString()) + int.Parse(reportdt.Rows[l]["xh" + i].ToString()) + int.Parse(reportdt.Rows[l]["gh" + i].ToString())).ToString();
                }
                #endregion
            }

            //统计全年数据
            for (int l = 0; l < 17; l++)
            {
                double xztotal = 0;
                double tytotal = 0;
                double xhtotal = 0;
                double ghtotal = 0;
                double zstotal = 0;
                for (int m = 1; m < 13; m++)
                {
                    xztotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["xz" + m].ToString());
                    tytotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["ty" + m].ToString());
                    xhtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["xh" + m].ToString());
                    ghtotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["gh" + m].ToString());
                    zstotal += Eva.Library.Text.NumberTool.Parse(reportdt.Rows[l]["zs" + m].ToString());
                }
                reportdt.Rows[l]["xz13"] = Eva.Library.Text.NumberTool.GetNumberByLength(xztotal, 2);
                reportdt.Rows[l]["ty13"] = Eva.Library.Text.NumberTool.GetNumberByLength(tytotal, 2);
                reportdt.Rows[l]["xh13"] = Eva.Library.Text.NumberTool.GetNumberByLength(xhtotal, 2);
                reportdt.Rows[l]["gh13"] = Eva.Library.Text.NumberTool.GetNumberByLength(ghtotal, 2);
                reportdt.Rows[l]["zs13"] = Eva.Library.Text.NumberTool.GetNumberByLength(zstotal, 2);
            }


            return reportdt;

        }

        private DataTable Get08110004Dt(DataTable reportdt, string khbhids, int i, string type, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            if (khbhids.Length > 0)
            {
                DataTable dhdt = new DataTable();
                string[] khbharray = khbhids.Split(',');
                if (khbharray.Length > 1000)
                {
                    //居民新立户统计
                    List<string> khidlist = new List<string>(khbharray);

                    string wherestr = GetWhereInValuesSql("k.f_khbh", khidlist, 900);

                    string sql = "select";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4053,%' and " + wherestr + ") as jm, ";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4058,%' and " + wherestr + ") as zb,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4063,%' and " + wherestr + ") as ic,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4054,%' and " + wherestr + ") as yc,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid != '2' and f_sblxid='100' and " + wherestr + ") as dhjx,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid != '2' and ',' || k.f_khfzid || ',' like '%,4063,%' and " + wherestr + ") as dhic";
                    sql += " from dual";
                    DataTable dt = _iAccessData.Query(sql).Tables[0];
                    //居民新增赋值
                    reportdt.Rows[0][type + i] = dt.Rows[0]["jm"].ToString();
                    reportdt.Rows[1][type + i] = dt.Rows[0]["zb"].ToString();
                    reportdt.Rows[2][type + i] = dt.Rows[0]["ic"].ToString();
                    reportdt.Rows[3][type + i] = dt.Rows[0]["yc"].ToString();
                    reportdt.Rows[5][type + i] = dt.Rows[0]["dhjx"].ToString();
                    reportdt.Rows[6][type + i] = dt.Rows[0]["dhic"].ToString();
                }
                else
                {
                    //居民新立户统计
                    string sql = "select";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4053,%' and k.f_khbh in (" + khbhids + ")) as jm, ";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4058,%' and k.f_khbh in (" + khbhids + ")) as zb,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4063,%' and k.f_khbh in (" + khbhids + ")) as ic,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4054,%' and k.f_khbh in (" + khbhids + ")) as yc,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid != '2' and f_sblxid='100' and k.f_khbh in (" + khbhids + ")) as dhjx,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid != '2' and ',' || k.f_khfzid || ',' like '%,4063,%' and k.f_khbh in (" + khbhids + ")) as dhic";
                    sql += " from dual";
                    DataTable dt = _iAccessData.Query(sql).Tables[0];
                    //居民新增赋值
                    reportdt.Rows[0][type + i] = dt.Rows[0]["jm"].ToString();
                    reportdt.Rows[1][type + i] = dt.Rows[0]["zb"].ToString();
                    reportdt.Rows[2][type + i] = dt.Rows[0]["ic"].ToString();
                    reportdt.Rows[3][type + i] = dt.Rows[0]["yc"].ToString();
                    reportdt.Rows[5][type + i] = dt.Rows[0]["dhjx"].ToString();
                    reportdt.Rows[6][type + i] = dt.Rows[0]["dhic"].ToString();
                }



            }
            else
            {
                //该月无数据
                reportdt.Rows[0][type + i] = "0";
                reportdt.Rows[1][type + i] = "0";
                reportdt.Rows[2][type + i] = "0";
                reportdt.Rows[3][type + i] = "0";
                reportdt.Rows[5][type + i] = "0";
                reportdt.Rows[6][type + i] = "0";
            }
            //合计行
            reportdt.Rows[4][type + i] = (int.Parse(reportdt.Rows[0][type + i].ToString()) + int.Parse(reportdt.Rows[1][type + i].ToString()) + int.Parse(reportdt.Rows[2][type + i].ToString()) + int.Parse(reportdt.Rows[3][type + i].ToString())).ToString();
            reportdt.Rows[7][type + i] = (int.Parse(reportdt.Rows[5][type + i].ToString()) + int.Parse(reportdt.Rows[6][type + i].ToString())).ToString();

            reportdt.Rows[8][type + i] = (int.Parse(reportdt.Rows[4][type + i].ToString()) + int.Parse(reportdt.Rows[7][type + i].ToString())).ToString();

            return reportdt;
        }

        private DataTable Get08110003Dt(DataTable reportdt, string khbhids, int i, string type, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            if (khbhids.Length > 0)
            {
                DataTable dhdt = new DataTable();
                string[] khbharray = khbhids.Split(',');
                if (khbharray.Length > 1000)
                {
                    List<string> khidlist = new List<string>(khbharray);

                    string wherestr = GetWhereInValuesSql("k.f_khbh", khidlist, 900);
                    //居民新立户统计
                    string sql = "select";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4058,%' and " + wherestr + ") as zb,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4063,%' and " + wherestr + ") as ic,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4054,%' and " + wherestr + ") as yc,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4053,%' and " + wherestr + ") as jm ";
                    sql += "from dual";
                    DataTable dt = _iAccessData.Query(sql).Tables[0];
                    //居民新增赋值
                    reportdt.Rows[0][type + i] = dt.Rows[0]["zb"].ToString();
                    reportdt.Rows[1][type + i] = dt.Rows[0]["ic"].ToString();
                    reportdt.Rows[2][type + i] = dt.Rows[0]["yc"].ToString();
                    reportdt.Rows[3][type + i] = dt.Rows[0]["jm"].ToString();

                    //大用户新立户统计

                    sql = "select f_qy,count(f_qy) as count from tbl_ld_khb k where  k.f_yslxid != '2' and k.f_qy is not null and " + wherestr + " group by f_qy";
                    dhdt = _iAccessData.Query(sql).Tables[0];
                    reportdt.Rows[5][type + i] = "0";
                    reportdt.Rows[6][type + i] = "0";
                    reportdt.Rows[7][type + i] = "0";
                    reportdt.Rows[8][type + i] = "0";
                    reportdt.Rows[9][type + i] = "0";
                    reportdt.Rows[10][type + i] = "0";
                    reportdt.Rows[11][type + i] = "0";
                    reportdt.Rows[12][type + i] = "0";
                    reportdt.Rows[13][type + i] = "0";
                    reportdt.Rows[14][type + i] = "0";
                }
                else
                {
                    //居民新立户统计
                    string sql = "select";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4058,%' and k.f_khbh in (" + khbhids + ")) as zb,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4063,%' and k.f_khbh in (" + khbhids + ")) as ic,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4054,%' and k.f_khbh in (" + khbhids + ")) as yc,";
                    sql += "(select count(*) from tbl_ld_khb k where k.f_yslxid = '2' and ',' || k.f_khfzid || ',' like '%,4053,%' and k.f_khbh in (" + khbhids + ")) as jm ";
                    sql += "from dual";
                    DataTable dt = _iAccessData.Query(sql).Tables[0];
                    //居民新增赋值
                    reportdt.Rows[0][type + i] = dt.Rows[0]["zb"].ToString();
                    reportdt.Rows[1][type + i] = dt.Rows[0]["ic"].ToString();
                    reportdt.Rows[2][type + i] = dt.Rows[0]["yc"].ToString();
                    reportdt.Rows[3][type + i] = dt.Rows[0]["jm"].ToString();

                    //大用户新立户统计

                    sql = "select f_qy,count(f_qy) as count from tbl_ld_khb k where  k.f_yslxid != '2' and k.f_qy is not null and k.f_khbh in (" + khbhids + ") group by f_qy";
                    dhdt = _iAccessData.Query(sql).Tables[0];
                    reportdt.Rows[5][type + i] = "0";
                    reportdt.Rows[6][type + i] = "0";
                    reportdt.Rows[7][type + i] = "0";
                    reportdt.Rows[8][type + i] = "0";
                    reportdt.Rows[9][type + i] = "0";
                    reportdt.Rows[10][type + i] = "0";
                    reportdt.Rows[11][type + i] = "0";
                    reportdt.Rows[12][type + i] = "0";
                    reportdt.Rows[13][type + i] = "0";
                    reportdt.Rows[14][type + i] = "0";
                }


                for (int k = 0; k < dhdt.Rows.Count; k++)
                {
                    switch (dhdt.Rows[k]["f_qy"].ToString())
                    {
                        case "A":
                            reportdt.Rows[5][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "B":
                            reportdt.Rows[6][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "C":
                            reportdt.Rows[7][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "D":
                            reportdt.Rows[8][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "E":
                            reportdt.Rows[9][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "F":
                            reportdt.Rows[10][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "G":
                            reportdt.Rows[11][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "H":
                            reportdt.Rows[12][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "I":
                            reportdt.Rows[13][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                        case "J":
                            reportdt.Rows[14][type + i] = dhdt.Rows[k]["count"].ToString();
                            break;
                    }
                }

            }
            else
            {
                //该月无数据
                reportdt.Rows[0][type + i] = "0";
                reportdt.Rows[1][type + i] = "0";
                reportdt.Rows[2][type + i] = "0";
                reportdt.Rows[3][type + i] = "0";
                reportdt.Rows[5][type + i] = "0";
                reportdt.Rows[6][type + i] = "0";
                reportdt.Rows[7][type + i] = "0";
                reportdt.Rows[8][type + i] = "0";
                reportdt.Rows[9][type + i] = "0";
                reportdt.Rows[10][type + i] = "0";
                reportdt.Rows[11][type + i] = "0";
                reportdt.Rows[12][type + i] = "0";
                reportdt.Rows[13][type + i] = "0";
                reportdt.Rows[14][type + i] = "0";
            }
            //合计行
            reportdt.Rows[4][type + i] = (int.Parse(reportdt.Rows[0][type + i].ToString()) + int.Parse(reportdt.Rows[1][type + i].ToString()) + int.Parse(reportdt.Rows[2][type + i].ToString()) + int.Parse(reportdt.Rows[3][type + i].ToString())).ToString();
            reportdt.Rows[15][type + i] = (int.Parse(reportdt.Rows[5][type + i].ToString()) + int.Parse(reportdt.Rows[6][type + i].ToString()) + int.Parse(reportdt.Rows[7][type + i].ToString()) + int.Parse(reportdt.Rows[8][type + i].ToString()) + int.Parse(reportdt.Rows[9][type + i].ToString()) + int.Parse(reportdt.Rows[10][type + i].ToString()) + int.Parse(reportdt.Rows[11][type + i].ToString()) + int.Parse(reportdt.Rows[12][type + i].ToString()) + int.Parse(reportdt.Rows[13][type + i].ToString()) + int.Parse(reportdt.Rows[14][type + i].ToString())).ToString();

            reportdt.Rows[16][type + i] = (int.Parse(reportdt.Rows[4][type + i].ToString()) + int.Parse(reportdt.Rows[15][type + i].ToString())).ToString();

            return reportdt;
        }

        private DataTable Get08110004(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {
            //创建空白报表
            DataTable reportdt = new DataTable();
            //12个月的列和总计的列
            for (int j = 1; j <= 13; j++)
            {
                reportdt.Columns.Add("yssf" + j, System.Type.GetType("System.String"));//应收水费
                reportdt.Columns.Add("yspwf" + j, System.Type.GetType("System.String"));//应收排污费
                reportdt.Columns.Add("sssf" + j, System.Type.GetType("System.String"));//实收水费
                reportdt.Columns.Add("sspwf" + j, System.Type.GetType("System.String"));//实收排污费
                reportdt.Columns.Add("qssf" + j, System.Type.GetType("System.String"));//欠收水费
                reportdt.Columns.Add("qspwf" + j, System.Type.GetType("System.String"));//欠收排污费
                reportdt.Columns.Add("hkl" + j, System.Type.GetType("System.String"));//回款率
            }
            DataRow dr5 = reportdt.NewRow();
            DataRow dr6 = reportdt.NewRow();
            DataRow dr7 = reportdt.NewRow();
            DataRow dr8 = reportdt.NewRow();
            DataRow dr9 = reportdt.NewRow();
            DataRow dr10 = reportdt.NewRow();
            DataRow dr11 = reportdt.NewRow();
            DataRow dr12 = reportdt.NewRow();
            DataRow dr13 = reportdt.NewRow();
            DataRow dr14 = reportdt.NewRow();
            for (int k = 1; k <= 13; k++)
            {
                dr5["yssf" + k] = "0.00";
                dr5["yspwf" + k] = "0.00";
                dr5["sssf" + k] = "0.00";
                dr5["sspwf" + k] = "0.00";
                dr6["yssf" + k] = "0.00";
                dr6["yspwf" + k] = "0.00";
                dr6["sssf" + k] = "0.00";
                dr6["sspwf" + k] = "0.00";
                dr7["yssf" + k] = "0.00";
                dr7["yspwf" + k] = "0.00";
                dr7["sssf" + k] = "0.00";
                dr7["sspwf" + k] = "0.00";
                dr8["yssf" + k] = "0.00";
                dr8["yspwf" + k] = "0.00";
                dr8["sssf" + k] = "0.00";
                dr8["sspwf" + k] = "0.00";
                dr9["yssf" + k] = "0.00";
                dr9["yspwf" + k] = "0.00";
                dr9["sssf" + k] = "0.00";
                dr9["sspwf" + k] = "0.00";
                dr10["yssf" + k] = "0.00";
                dr10["yspwf" + k] = "0.00";
                dr10["sssf" + k] = "0.00";
                dr10["sspwf" + k] = "0.00";
                dr11["yssf" + k] = "0.00";
                dr11["yspwf" + k] = "0.00";
                dr11["sssf" + k] = "0.00";
                dr11["sspwf" + k] = "0.00";
                dr12["yssf" + k] = "0.00";
                dr12["yspwf" + k] = "0.00";
                dr12["sssf" + k] = "0.00";
                dr12["sspwf" + k] = "0.00";
                dr13["yssf" + k] = "0.00";
                dr13["yspwf" + k] = "0.00";
                dr13["sssf" + k] = "0.00";
                dr13["sspwf" + k] = "0.00";
                dr14["yssf" + k] = "0.00";
                dr14["yspwf" + k] = "0.00";
                dr14["sssf" + k] = "0.00";
                dr14["sspwf" + k] = "0.00";
            }
            //reportdt.Rows[0] 总表
            reportdt.Rows.Add();
            //reportdt.Rows[1] 卡表
            reportdt.Rows.Add();
            //reportdt.Rows[2] 远传表
            reportdt.Rows.Add();
            //reportdt.Rows[3] 入户直收
            reportdt.Rows.Add();
            //reportdt.Rows[4] 居民小计
            reportdt.Rows.Add();
            //reportdt.Rows[5] 大客户A区
            reportdt.Rows.Add(dr5);
            //reportdt.Rows[6] 大客户B区
            reportdt.Rows.Add(dr6);
            //reportdt.Rows[7] 大客户C区
            reportdt.Rows.Add(dr7);
            //reportdt.Rows[8] 大客户D区
            reportdt.Rows.Add(dr8);
            //reportdt.Rows[9] 大客户E区
            reportdt.Rows.Add(dr9);
            //reportdt.Rows[10] 大客户F区
            reportdt.Rows.Add(dr10);
            //reportdt.Rows[11] 大客户G区
            reportdt.Rows.Add(dr11);
            //reportdt.Rows[12] 大客户H区
            reportdt.Rows.Add(dr12);
            //reportdt.Rows[13] 大客户I区
            reportdt.Rows.Add(dr13);
            //reportdt.Rows[14] 大客户J区
            reportdt.Rows.Add(dr14);
            //reportdt.Rows[15] 大客户小计
            reportdt.Rows.Add();
            //reportdt.Rows[16] 总计
            reportdt.Rows.Add();

            //循环12个月
            for (int i = 1; i <= 13; i++)
            {
                DateTime datastart = new DateTime();
                DateTime dataend = new DateTime();
                if (i < 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, (i + 1), 1);
                    dataend = dataend.AddDays(-1);
                }
                else if (i == 12)
                {
                    datastart = new DateTime(zbsj.Year, i, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }
                else if (i == 13)
                {
                    datastart = new DateTime(zbsj.Year, 1, 1);
                    dataend = new DateTime(zbsj.Year, 12, 31);
                }
                //时间区间
                string czsjwhere = " between to_date('" + datastart.ToString("yyyy-MM-dd") + " 00:00:00', 'yyyy-MM-dd hh24:mi:ss') and to_date('" + dataend.ToString("yyyy-MM-dd") + " 23:59:59', 'yyyy-MM-dd hh24:mi:ss')";


                #region 居民部分
                //获取基础数据
                string sql = "select (select sum(f_sf)                                                      ";
                sql += "        from tbl_ld_cbiao a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4058,%'                            ";
                sql += "         and f_cbsj " + czsjwhere + ") as yssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_cbiao a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4058,%'                            ";
                sql += "         and f_cbsj " + czsjwhere + ") as yspwf,";
                sql += "     (select sum(f_sf)                                                         ";
                sql += "        from tbl_ld_cbiao                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4058,%'                            ";
                sql += "         and f_cbsj " + czsjwhere;
                sql += "         and f_jfsj " + czsjwhere + ") as sssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_cbiao                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4058,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere;
                sql += "         and f_jfsj  " + czsjwhere + ") as sspwf";
                sql += " from dual                                                                      ";
                sql += "union all                                                                      ";
                sql += "select (select sum(f_sf)                                                       ";
                sql += "        from tbl_ld_ickss a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and f_xiekrq  " + czsjwhere + ") as yssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_ickss a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and f_xiekrq  " + czsjwhere + ") as yspwf,";
                sql += "     (select sum(f_sf)                                                         ";
                sql += "        from tbl_ld_ickss                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and f_xiekrq  " + czsjwhere + ") as sssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_ickss                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and f_xiekrq  " + czsjwhere + ") as sspwf";
                sql += " from dual                                                                      ";
                sql += "  union all                                                                    ";
                sql += "select (select sum(f_sf)                                                       ";
                sql += "        from tbl_ld_cbiao a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4054,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere + ") as yssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_cbiao a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4054,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere + ") as yspwf,";
                sql += "     (select sum(f_sf)                                                         ";
                sql += "        from tbl_ld_cbiao                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4054,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere;
                sql += "         and f_jfsj  " + czsjwhere + ") as sssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_cbiao                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4054,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere;
                sql += "         and f_jfsj  " + czsjwhere + ") as sspwf";
                sql += " from dual                                                                      ";
                sql += "    union all                                                                  ";
                sql += "select (select sum(f_sf)                                                       ";
                sql += "        from tbl_ld_cbiao a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4053,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere + ") as yssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_cbiao a                                                    ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4053,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere + ") as yspwf,";
                sql += "     (select sum(f_sf)                                                         ";
                sql += "        from tbl_ld_cbiao                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4053,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere;
                sql += "         and f_jfsj  " + czsjwhere + ") as sssf,";
                sql += "     (select sum(f_pwf)                                                        ";
                sql += "        from tbl_ld_cbiao                                                      ";
                sql += "       where f_yslxid = '2'                                                    ";
                sql += "         and ',' || f_khfzid || ',' like '%,4053,%'                            ";
                sql += "         and f_cbsj  " + czsjwhere;
                sql += "         and f_jfsj  " + czsjwhere + ") as sspwf";
                sql += " from dual";
                DataTable jmdt = _iAccessData.Query(sql).Tables[0];

                double yssflj = 0;
                double yspwflj = 0;
                double sssflj = 0;
                double sspwflj = 0;
                for (int j = 0; j < jmdt.Rows.Count; j++)
                {
                    double yssf = 0;
                    double yspwf = 0;
                    double sssf = 0;
                    double sspwf = 0;
                    //应收水费
                    if (jmdt.Rows[j]["yssf"].ToString() != null && jmdt.Rows[j]["yssf"].ToString() != "")
                    {
                        yssf = Eva.Library.Text.NumberTool.Parse(jmdt.Rows[j]["yssf"].ToString());
                        yssflj += yssf;
                        reportdt.Rows[j]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssf, 2);
                    }
                    else
                    {
                        reportdt.Rows[j]["yssf" + i] = "0.00";
                    }

                    //实收水费
                    if (jmdt.Rows[j]["sssf"].ToString() != null && jmdt.Rows[j]["sssf"].ToString() != "")
                    {
                        sssf = Eva.Library.Text.NumberTool.Parse(jmdt.Rows[j]["sssf"].ToString());
                        sssflj += sssf;
                        reportdt.Rows[j]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssf, 2);
                    }
                    else
                    {
                        reportdt.Rows[j]["sssf" + i] = "0.00";
                    }

                    //欠收水费
                    double qssf = yssf - sssf;
                    reportdt.Rows[j]["qssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssf, 2);

                    //应收排污费
                    if (jmdt.Rows[j]["yspwf"].ToString() != null && jmdt.Rows[j]["yspwf"].ToString() != "")
                    {
                        yspwf = Eva.Library.Text.NumberTool.Parse(jmdt.Rows[j]["yspwf"].ToString());
                        yspwflj += yspwf;
                        reportdt.Rows[j]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yspwf, 2);
                    }
                    else
                    {
                        reportdt.Rows[j]["yspwf" + i] = "0.00";
                    }

                    //实收排污费
                    if (jmdt.Rows[j]["sspwf"].ToString() != null && jmdt.Rows[j]["sspwf"].ToString() != "")
                    {
                        sspwf = Eva.Library.Text.NumberTool.Parse(jmdt.Rows[j]["sspwf"].ToString());
                        sspwflj += sspwf;
                        reportdt.Rows[j]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sspwf, 2);
                    }
                    else
                    {
                        reportdt.Rows[j]["sspwf" + i] = "0.00";
                    }

                    //欠收排污费
                    double qspwf = yspwf - sspwf;
                    reportdt.Rows[j]["qspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qspwf, 2);

                    //当月回款率
                    if (yssf + yspwf == 0)
                    {
                        reportdt.Rows[j]["hkl" + i] = "100%";
                    }
                    else
                    {
                        double hkl = (sssf + sspwf) / (yssf + yspwf) * 100;
                        reportdt.Rows[j]["hkl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(hkl, 2) + "%";
                    }

                }

                //月合计行
                reportdt.Rows[4]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssflj, 2);
                reportdt.Rows[4]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yspwflj, 2);
                reportdt.Rows[4]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssflj, 2);
                reportdt.Rows[4]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sspwflj, 2);
                double qssflj = yssflj - sssflj;
                reportdt.Rows[4]["qssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssflj, 2);
                double qspwflj = yspwflj - sspwflj;
                reportdt.Rows[4]["qspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qspwflj, 2);
                if (yssflj + yspwflj == 0)
                {
                    reportdt.Rows[4]["hkl" + i] = "100%";
                }
                else
                {
                    double hkllj = (sssflj + sspwflj) / (yssflj + yspwflj) * 100;
                    reportdt.Rows[4]["hkl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(hkllj, 2) + "%";
                }
                #endregion

                #region 大用户部分
                //应收查询
                string yssql = "select f_qy, sum(f_sf) as yssf, sum(f_pwf) as yspwf";
                yssql += "  from tbl_ld_cbiao    ";
                yssql += " where f_yslxid != '2' ";
                yssql += "   and f_qy is not null";
                yssql += "   and f_cbsj  " + czsjwhere;
                yssql += " group by f_qy         ";
                DataTable dhysdt = _iAccessData.Query(yssql).Tables[0];

                string ysicsql = "select f_qy, sum(f_sf) as yssf, sum(f_pwf) as yspwf";
                ysicsql += "  from tbl_ld_ickss    ";
                ysicsql += " where f_yslxid != '2' ";
                ysicsql += "   and f_qy is not null";
                ysicsql += "   and f_xiekrq " + czsjwhere;
                ysicsql += " group by f_qy         ";
                DataTable dhysicdt = _iAccessData.Query(ysicsql).Tables[0];

                for (int a = 0; a < dhysdt.Rows.Count; a++)
                {
                    if (dhysdt.Rows[a]["yssf"].ToString() == null || dhysdt.Rows[a]["yssf"].ToString() == "")
                    {
                        dhysdt.Rows[a]["yssf"] = "0.00";
                    }
                    if (dhysdt.Rows[a]["yspwf"].ToString() == null || dhysdt.Rows[a]["yspwf"].ToString() == "")
                    {
                        dhysdt.Rows[a]["yspwf"] = "0.00";
                    }
                    switch (dhysdt.Rows[a]["f_qy"].ToString())
                    {
                        case "A":
                            reportdt.Rows[5]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[5]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "B":
                            reportdt.Rows[6]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[6]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "C":
                            reportdt.Rows[7]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[7]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "D":
                            reportdt.Rows[8]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[8]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "E":
                            reportdt.Rows[9]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[9]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "F":
                            reportdt.Rows[10]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[10]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "G":
                            reportdt.Rows[11]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[11]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "H":
                            reportdt.Rows[12]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[12]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "I":
                            reportdt.Rows[13]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[13]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                        case "J":
                            reportdt.Rows[14]["yssf" + i] = dhysdt.Rows[a]["yssf"].ToString();
                            reportdt.Rows[14]["yspwf" + i] = dhysdt.Rows[a]["yspwf"].ToString();
                            break;
                    }
                }

                for (int a = 0; a < dhysicdt.Rows.Count; a++)
                {
                    if (dhysicdt.Rows[a]["yssf"].ToString() == null || dhysicdt.Rows[a]["yssf"].ToString() == "")
                    {
                        dhysicdt.Rows[a]["yssf"] = "0.00";
                    }
                    if (dhysicdt.Rows[a]["yspwf"].ToString() == null || dhysicdt.Rows[a]["yspwf"].ToString() == "")
                    {
                        dhysicdt.Rows[a]["yspwf"] = "0.00";
                    }
                    switch (dhysicdt.Rows[a]["f_qy"].ToString())
                    {
                        case "A":
                            reportdt.Rows[5]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[5]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "B":
                            reportdt.Rows[6]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[6]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "C":
                            reportdt.Rows[7]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[7]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[7]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[7]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "D":
                            reportdt.Rows[8]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[8]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[8]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[8]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "E":
                            reportdt.Rows[9]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[9]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[9]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[9]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "F":
                            reportdt.Rows[10]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[10]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[10]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[10]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "G":
                            reportdt.Rows[11]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[11]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "H":
                            reportdt.Rows[12]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[12]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "I":
                            reportdt.Rows[13]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[13]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[13]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[13]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                        case "J":
                            reportdt.Rows[14]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["yssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[14]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["yspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwf"].ToString())), 2);
                            break;
                    }
                }
                //实收查询
                string sssql = "select f_qy, sum(f_sf) as sssf, sum(f_pwf) as sspwf";
                sssql += "  from tbl_ld_cbiao    ";
                sssql += " where f_yslxid != '2' ";
                sssql += "   and f_qy is not null";
                sssql += "   and f_cbsj  " + czsjwhere;
                sssql += "   and f_jfsj  " + czsjwhere;
                sssql += " group by f_qy         ";
                DataTable dhssdt = _iAccessData.Query(sssql).Tables[0];

                for (int b = 0; b < dhssdt.Rows.Count; b++)
                {
                    if (dhssdt.Rows[b]["sssf"].ToString() == null || dhssdt.Rows[b]["sssf"].ToString() == "")
                    {
                        dhssdt.Rows[b]["sssf"] = "0.00";
                    }
                    if (dhssdt.Rows[b]["sspwf"].ToString() == null || dhssdt.Rows[b]["sspwf"].ToString() == "")
                    {
                        dhssdt.Rows[b]["sspwf"] = "0.00";
                    }

                    switch (dhssdt.Rows[b]["f_qy"].ToString())
                    {

                        case "A":
                            reportdt.Rows[5]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[5]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "B":
                            reportdt.Rows[6]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[6]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "C":
                            reportdt.Rows[7]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[7]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "D":
                            reportdt.Rows[8]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[8]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "E":
                            reportdt.Rows[9]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[9]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "F":
                            reportdt.Rows[10]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[10]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "G":
                            reportdt.Rows[11]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[11]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "H":
                            reportdt.Rows[12]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[12]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "I":
                            reportdt.Rows[13]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[13]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                        case "J":
                            reportdt.Rows[14]["sssf" + i] = dhssdt.Rows[b]["sssf"].ToString();
                            reportdt.Rows[14]["sspwf" + i] = dhssdt.Rows[b]["sspwf"].ToString();
                            break;
                    }
                }

                for (int a = 0; a < dhysicdt.Rows.Count; a++)
                {
                    if (dhysicdt.Rows[a]["yssf"].ToString() == null || dhysicdt.Rows[a]["yssf"].ToString() == "")
                    {
                        dhysicdt.Rows[a]["yssf"] = "0.00";
                    }
                    if (dhysicdt.Rows[a]["yspwff"].ToString() == null || dhysicdt.Rows[a]["yspwff"].ToString() == "")
                    {
                        dhysicdt.Rows[a]["yspwff"] = "0.00";
                    }
                    switch (dhysicdt.Rows[a]["f_qy"].ToString())
                    {
                        case "A":
                            reportdt.Rows[5]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[5]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[5]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "B":
                            reportdt.Rows[6]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[6]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[6]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "C":
                            reportdt.Rows[7]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[7]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[7]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[7]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "D":
                            reportdt.Rows[8]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[8]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[8]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[8]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "E":
                            reportdt.Rows[9]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[9]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[9]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[9]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "F":
                            reportdt.Rows[10]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[10]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[10]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[10]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "G":
                            reportdt.Rows[11]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[11]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[11]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "H":
                            reportdt.Rows[12]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[12]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[12]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "I":
                            reportdt.Rows[13]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[13]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[13]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[13]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                        case "J":
                            reportdt.Rows[14]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sssf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yssf"].ToString())), 2);
                            reportdt.Rows[14]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(reportdt.Rows[14]["sspwf" + i].ToString()) + Eva.Library.Text.NumberTool.Parse(dhysicdt.Rows[a]["yspwff"].ToString())), 2);
                            break;
                    }
                }

                //欠收部分
                double yssfdh = 0;
                double yspwfdh = 0;
                double sssfdh = 0;
                double sspwfdh = 0;
                for (int c = 5; c < 15; c++)
                {
                    double yssf = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["yssf" + i].ToString());
                    yssfdh += yssf;
                    double yspwf = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["yspwf" + i].ToString());
                    yspwfdh += yspwf;
                    double sssf = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["sssf" + i].ToString());
                    sssfdh += sssf;
                    double sspwf = Eva.Library.Text.NumberTool.Parse(reportdt.Rows[c]["sspwf" + i].ToString());
                    sspwfdh += sspwf;
                    double qssf = yssf - sssf;
                    reportdt.Rows[c]["qssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssf, 2);
                    double qspwf = yspwf - sspwf;
                    reportdt.Rows[c]["qspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qspwf, 2);
                    if (yssf + yspwf == 0)
                    {
                        reportdt.Rows[c]["hkl" + i] = "100%";

                    }
                    else
                    {
                        double hkl = (sssf + sspwf) / (yssf + yspwf) * 100;
                        reportdt.Rows[c]["hkl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(hkl, 2) + "%";

                    }

                }
                //大用户合计
                reportdt.Rows[15]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssfdh, 2);
                reportdt.Rows[15]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yspwfdh, 2);
                reportdt.Rows[15]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssfdh, 2);
                reportdt.Rows[15]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sspwfdh, 2);
                double qssfdh = yssfdh - sssfdh;
                reportdt.Rows[15]["qssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssfdh, 2);
                double qspwfdh = yspwfdh - sspwfdh;
                reportdt.Rows[15]["qspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qspwfdh, 2);
                if (yssfdh + yspwfdh == 0)
                {
                    reportdt.Rows[15]["hkl" + i] = "100%";
                }
                else
                {
                    double hkldh = (sssfdh + sspwfdh) / (yssfdh + yspwfdh) * 100;
                    reportdt.Rows[15]["hkl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(hkldh, 2) + "%";
                }

                #endregion


                #region 合计
                double yssftotal = yssflj + yssfdh;
                double yspwftotal = yspwflj + yspwfdh;
                double sssftotal = sssflj + sspwfdh;
                double sspwftotal = sspwflj + sspwfdh;
                double qssftotal = yssftotal - sssftotal;
                double qspwftotal = yspwftotal - sspwftotal;
                double hkltotal = (sssftotal + sspwftotal) / (yssftotal + yspwftotal) * 100;

                reportdt.Rows[16]["yssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yssftotal, 2);
                reportdt.Rows[16]["yspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(yspwftotal, 2);
                reportdt.Rows[16]["sssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sssftotal, 2);
                reportdt.Rows[16]["sspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(sspwftotal, 2);
                reportdt.Rows[16]["qssf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qssftotal, 2);
                reportdt.Rows[16]["qspwf" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(qspwftotal, 2);
                reportdt.Rows[16]["hkl" + i] = Eva.Library.Text.NumberTool.GetNumberByLength(hkltotal, 2) + "%";
                #endregion
            }


            return reportdt;

        }
        private DataTable Get08110002(string userid, DateTime zbsj, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {

            string sql = "";
            DataTable dt_dy = null;
            DataTable dt_qy = null;
            DataTable dt_qn = null;
            DataTable dt_lj = null;


            #region dataset
            //操作时间where
            string czsjwhere = " between to_date('" + zbsj.ToString("yyyy-MM-dd") + " 00:00:00','yyyy-MM-dd hh24:mi:ss') and  to_date('" + zbsj.ToString("yyyy-MM-dd") + " 23:59:59','yyyy-MM-dd hh24:mi:ss')  ";

            //--当月;
            string dywhere = " between trunc(add_months(last_day(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + " ','yyyy-MM-dd hh24:mi:ss')), -1) + 1)  and last_day(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')) ";

            //---欠月
            string qywhere = " between trunc(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),'yy')  and trunc(add_months(last_day(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')), -1) + 1) -1 ";

            //--欠年
            string qnwhere = " <  trunc(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),'yy')-1 ";

            sql = "";
            sql += " select * ";
            sql += "   from (select f_sfjl,  ";
            sql += "                f_yslxid,  ";
            sql += "                f_sblxid,  ";
            sql += "                f_lyid,  ";
            sql += "                f_cbsj as rq,  ";
            sql += "                'jxb' as lx  ";
            sql += "           from tbl_ld_cbiao  ";
            sql += "          where f_jfbhid in (select sys_id ";
            sql += "                               from tbl_ld_jfb  ";
            sql += "                              where f_lyid in ('08080003','08080002','08080007','08080008','08080006')  ";
            sql += "                                and f_ztid = '2'  ";
            sql += "                                and f_sfjl is not null  ";
            sql += "                                and f_czsj " + czsjwhere;
            sql += "                                and f_yyyid in (" + userid + ")) ";
            sql += "         union all ";
            sql += "         select f_sfjl, ";
            sql += "                f_yslxid, ";
            sql += "                f_sblxid, ";
            sql += "                f_lyid, ";
            sql += "                f_xiekrq as rq, ";
            sql += "                'ickb' as lx ";
            sql += "           from tbl_ld_ickss ";
            sql += "          where f_ztid in ('2','3','4') ";
            sql += "            and f_sfjl is not null ";
            sql += "            and f_xiekrq  " + czsjwhere;
            sql += "            and f_xiekrid in (" + userid + ")) ";


            //当月

            string sqldy = sql + "  where rq  " + dywhere;
            sqldy += "  order by to_number(f_yslxid), f_sfjl ";

            dt_dy = _iAccessData.Query(sqldy).Tables[0];
            //欠月

            string sqlqy = sql + "  where rq  " + qywhere;
            sqlqy += "  order by to_number(f_yslxid), f_sfjl ";

            dt_qy = _iAccessData.Query(sqlqy).Tables[0];

            //前年
            string sqlqn = sql + "  where rq  " + qnwhere;
            sqlqn += "  order by to_number(f_yslxid), f_sfjl ";


            dt_qn = _iAccessData.Query(sqlqn).Tables[0];

            //累计
            sql = "";

            sql += "  select sum(jm) as jm, sum(tjjz) as tjjz, sum(yc) as yc, sum(ys) as ys ";
            sql += "  from ( ";
            sql += "  select sum(F_JMJELJ) as jm, ";
            sql += "      sum(F_SYTJJZSF + F_SYTJJZPWF) as tjjz, ";
            sql += "      sum(F_SYYE) as yc,";
            sql += "      sum(F_SHYS) as ys";
            sql += "  from tbl_ld_jfb";
            sql += "  where f_lyid in ('08080003','08080002','08080007','08080008','08080006')";
            sql += "  and f_ztid = '2'";
            sql += "  and f_czsj  " + czsjwhere;
            sql += "  and f_yyyid in (" + userid + ")";
            sql += "  union all ";
            sql += "  select to_number('0') as jm,";
            sql += "      sum(F_SYTJJZSF + F_SYTJJZPWF) as tjjz,";
            sql += "      sum(F_SYYE) as yc,";
            sql += "      sum(F_SHYS) as ys";
            sql += "  from tbl_ld_ickss";
            sql += "  where f_ztid in ('2','3','4')";
            sql += "  and f_sfjl is not null";
            sql += "  and f_xiekrq  " + czsjwhere;
            sql += "  and f_xiekrid in (" + userid + "))";




            dt_lj = _iAccessData.Query(sql).Tables[0];

            #endregion


            DataTable dt_target = new DataTable();
            #region dt_target
            DataColumn dc = new DataColumn();
            dc.ColumnName = "lx";//类型
            dt_target.Columns.Add(dc);

            dc = new DataColumn("rownum", typeof(Double));
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "dysfpwfdj";//当月水费排污费单价
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "dysfdj";//当月水费单价
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "dysl";//当月水量
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "dysf";//当月水费
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "dypwfdj";//当月排污费单价
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "dypwf";//当月排污费金额
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "qysl";//欠月水量
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "qysf";//	欠月水费金额
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "qypwf";//	欠月排污费金额
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "qnsl";//	欠年水量
            dt_target.Columns.Add(dc);


            dc = new DataColumn();
            dc.ColumnName = "qnsf";//	欠年水费金额
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "qnpwf";//	欠年排污费金额
            dt_target.Columns.Add(dc);


            //dc = new DataColumn();
            //dc.ColumnName = "ycsfxj";//	绿化表押金水费消减
            //dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "sumsl";//	总计水量 
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "zjsf";//	总计水费 
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "zjpwf";//	总计排污
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "zjsl";//	总计金额
            dt_target.Columns.Add(dc);
            #endregion
            //===============水表类型的分析

            //select f_sblx,f_sblxid from tbl_ld_sbb group by f_sblx,f_sblxid
            //无表	0
            //普通机械表	100

            //Ⅱ型射频卡水表	12
            //Ⅲ型射频卡水表	13
            //Ⅱ型IC卡水表	16
            //IC卡智能水表	7

            //GSM无线远传水表	99

            //===============用水类型分析


            //select f_yslx,f_yslxid from tbl_ld_khb  group by f_yslx,f_yslxid

            //计量不计费	1
            //居民生活用水	2
            //经营服务用水	3

            //特种行业用水	6

            //学校、福利、居委会	101
            //旅游区趸售水	102
            //玖龙粗制水	104
            //玖龙淡化水	105
            //航母游乐港	106




            //居民用户
            //超阶梯水费

            //居民===当月
            DataRow[] drs_dy_jmjx = dt_dy.Select("f_yslxid = '2' and f_sblxid = '100' and lx = 'jxb'"); //居民+机械表
            dt_target = Get08110002Dt(drs_dy_jmjx, dt_target, "居民用户", "dy", 1);

            //居民===欠月
            DataRow[] drs_qy_jmjx = dt_qy.Select("f_yslxid = '2' and f_sblxid = '100' and lx = 'jxb'"); //居民+机械表
            dt_target = Get08110002Dt(drs_qy_jmjx, dt_target, "居民用户", "qy", 1);

            //居民===欠年
            DataRow[] drs_qn_jmjx = dt_qn.Select("f_yslxid = '2' and f_sblxid = '100' and lx = 'jxb'"); //居民+机械表
            dt_target = Get08110002Dt(drs_qn_jmjx, dt_target, "居民用户", "qn", 1);


            //判断是否存在"居民用户",
            DataRow[] drs_isjm = dt_target.Select("lx = '居民用户'");
            if (drs_isjm.Length <= 0)
            {
                DataRow drn1 = dt_target.NewRow();
                drn1["lx"] = "居民用户";
                drn1["rownum"] = "1";
                drn1["dysfdj"] = "";
                drn1["dypwfdj"] = "";
                drn1["dysfpwfdj"] = "";
                drn1["dysf"] = "0.0";
                drn1["dypwf"] = "0.0";
                drn1["dysl"] = "0.0";
                drn1["qysl"] = "0.0";
                drn1["qypwf"] = "0.0";
                drn1["qysf"] = "0.0";
                drn1["qnsl"] = "0.0";
                drn1["qnsf"] = "0.0";
                drn1["qnpwf"] = "0.0";
                //drn1["ycsfxj"] = "";
                drn1["sumsl"] = "";
                drn1["zjsf"] = "";
                drn1["zjpwf"] = "";
                drn1["zjsl"] = "";
                dt_target.Rows.InsertAt(drn1, 0);
            }

            //判断是否存在"超阶梯水费"
            DataRow[] drs_iscjt = dt_target.Select("lx = '超阶梯水费'");
            if (drs_iscjt.Length <= 0)
            {
                DataRow drn2 = dt_target.NewRow();
                drn2["lx"] = "超阶梯水费";
                drn2["rownum"] = "2";
                drn2["dysfdj"] = "";
                drn2["dypwfdj"] = "";
                drn2["dysfpwfdj"] = "";
                drn2["dysf"] = "0.0";
                drn2["dypwf"] = "0.0";
                drn2["dysl"] = "0.0";
                drn2["qysl"] = "0.0";
                drn2["qypwf"] = "0.0";
                drn2["qysf"] = "0.0";
                drn2["qnsl"] = "0.0";
                drn2["qnsf"] = "0.0";
                drn2["qnpwf"] = "0.0";
                //drn2["ycsfxj"] = "";
                drn2["sumsl"] = "";
                drn2["zjsf"] = "";
                drn2["zjpwf"] = "";
                drn2["zjsl"] = "";
                dt_target.Rows.Add(drn2);
            }


            //IC卡用户

            DataRow[] drs_dy_jmsyic = dt_dy.Select("f_yslxid in ('2','3') and f_sblxid in ('12','13','16','7') and lx = 'ickb' and f_lyid = '05930002'"); //居民+商业+ic卡表+营业厅
            dt_target = Get08110002Dt(drs_dy_jmsyic, dt_target, "IC卡用户", "dy", 3);

            DataRow[] drs_qy_jmsyic = dt_qy.Select("f_yslxid in ('2','3') and f_sblxid in ('12','13','16','7') and lx = 'ickb' and f_lyid = '05930002'"); //居民+商业+ic卡表+营业厅
            dt_target = Get08110002Dt(drs_qy_jmsyic, dt_target, "IC卡用户", "qy", 3);

            DataRow[] drs_qn_jmsyic = dt_qn.Select("f_yslxid in ('2','3') and f_sblxid in ('12','13','16','7') and lx = 'ickb' and f_lyid = '05930002'"); //居民+商业+ic卡表+营业厅
            dt_target = Get08110002Dt(drs_qn_jmsyic, dt_target, "IC卡用户", "qn", 3);

            //商业用户

            DataRow[] drs_dy_syjx = dt_dy.Select("f_yslxid = '3' and f_sblxid = '100' and lx = 'jxb'"); //居民+机械表
            dt_target = Get08110002Dt(drs_dy_syjx, dt_target, "商业用户", "dy", 4);

            DataRow[] drs_qy_syjx = dt_qy.Select("f_yslxid = '3' and f_sblxid = '100' and lx = 'jxb'"); //居民+机械表
            dt_target = Get08110002Dt(drs_qy_syjx, dt_target, "商业用户", "qy", 4);

            DataRow[] drs_qn_syjx = dt_qn.Select("f_yslxid = '3' and f_sblxid = '100' and lx = 'jxb'"); //居民+机械表
            dt_target = Get08110002Dt(drs_qn_syjx, dt_target, "商业用户", "qn", 4);

            //IC卡邮储代收     

            DataRow[] drs_dy_jmsyycic = dt_dy.Select("f_yslxid in ('2','3') and f_sblxid in ('12','13','16','7') and lx = 'ickb' and f_lyid = '05930001'"); //居民+商业+ic卡表+营业厅
            dt_target = Get08110002Dt(drs_dy_jmsyycic, dt_target, "IC卡邮储代收", "dy", 5);

            DataRow[] drs_qy_jmsyycic = dt_qy.Select("f_yslxid in ('2','3') and f_sblxid in ('12','13','16','7') and lx = 'ickb' and f_lyid = '05930001'"); //居民+商业+ic卡表+营业厅
            dt_target = Get08110002Dt(drs_qy_jmsyycic, dt_target, "IC卡邮储代收", "qy", 5);

            DataRow[] drs_qn_jmsyycic = dt_qn.Select("f_yslxid in ('2','3') and f_sblxid in ('12','13','16','7') and lx = 'ickb' and f_lyid = '05930001'"); //居民+商业+ic卡表+营业厅
            dt_target = Get08110002Dt(drs_qn_jmsyycic, dt_target, "IC卡邮储代收", "qn", 5);

            //商业邮储代收
            dt_target = Get08110002EmptyRow(dt_target, "商业邮储代收", "4.6", "0.95", 6);
            dt_target = Get08110002EmptyRow(dt_target, "商业邮储代收", "6.5", "1.4", 6);

            //学校、福利机构

            DataRow[] drs_dy_xxjx = dt_dy.Select("f_yslxid = '101' and f_sblxid = '100' and lx = 'jxb'"); //学校、福利机构+机械表
            dt_target = Get08110002Dt(drs_dy_xxjx, dt_target, "学校、福利机构", "dy", 7);

            DataRow[] drs_qy_xxjx = dt_qy.Select("f_yslxid = '101' and f_sblxid = '100' and lx = 'jxb'"); //学校、福利机构+机械表
            dt_target = Get08110002Dt(drs_qy_xxjx, dt_target, "学校、福利机构", "qy", 7);

            DataRow[] drs_qn_xxjx = dt_qn.Select("f_yslxid = '101' and f_sblxid = '100' and lx = 'jxb'"); //学校、福利机构+机械表
            dt_target = Get08110002Dt(drs_qn_xxjx, dt_target, "学校、福利机构", "qn", 7);

            ////天化
            //dt_target = Get08110002EmptyRow(dt_target, "天化", "5.55", "0", 8);
            DataRow[] drs_dy_stc = dt_dy.Select("f_yslxid = '103' and f_sblxid = '100' and lx = 'jxb'"); //学校、福利机构+机械表
            dt_target = Get08110002Dt(drs_dy_stc, dt_target, "生态城", "dy", 8);

            DataRow[] drs_qy_stc = dt_qy.Select("f_yslxid = '103' and f_sblxid = '100' and lx = 'jxb'"); //学校、福利机构+机械表
            dt_target = Get08110002Dt(drs_qy_stc, dt_target, "生态城", "qy", 8);

            DataRow[] drs_qn_stc = dt_qn.Select("f_yslxid = '103' and f_sblxid = '100' and lx = 'jxb'"); //学校、福利机构+机械表
            dt_target = Get08110002Dt(drs_qn_stc, dt_target, "生态城", "qn", 8);

            //生态城
            //dt_target = Get08110002EmptyRow(dt_target, "生态城", "5.55", "0", 8);

            //旅游区
            DataRow[] drs_dy_lyqjx = dt_dy.Select("f_yslxid = '102' and f_sblxid = '100' and lx = 'jxb'"); //旅游区+机械表
            dt_target = Get08110002Dt(drs_dy_lyqjx, dt_target, "旅游区", "dy", 9);

            DataRow[] drs_qy_lyqjx = dt_qy.Select("f_yslxid = '102' and f_sblxid = '100' and lx = 'jxb'"); //旅游区+机械表
            dt_target = Get08110002Dt(drs_qy_lyqjx, dt_target, "旅游区", "qy", 9);

            DataRow[] drs_qn_lyqjx = dt_qn.Select("f_yslxid = '102' and f_sblxid = '100' and lx = 'jxb'"); //旅游区+机械表
            dt_target = Get08110002Dt(drs_qn_lyqjx, dt_target, "旅游区", "qn", 9);

            //航母
            DataRow[] drs_dy_hmjx = dt_dy.Select("f_yslxid = '106' and f_sblxid = '100' and lx = 'jxb'"); //航母+机械表
            dt_target = Get08110002Dt(drs_dy_hmjx, dt_target, "航母游乐港", "dy", 10);

            DataRow[] drs_qy_hmjx = dt_qy.Select("f_yslxid = '106' and f_sblxid = '100' and lx = 'jxb'"); //航母+机械表
            dt_target = Get08110002Dt(drs_qy_hmjx, dt_target, "航母游乐港", "qy", 10);

            DataRow[] drs_qn_hmjx = dt_qn.Select("f_yslxid = '106' and f_sblxid = '100' and lx = 'jxb'"); //航母+机械表
            dt_target = Get08110002Dt(drs_qn_hmjx, dt_target, "航母游乐港", "qn", 10);

            //玖龙纸业粗制水

            DataRow[] drs_dy_jlczjx = dt_dy.Select("f_yslxid = '104' and f_sblxid = '100'  and lx = 'jxb'"); //玖龙纸业粗制水+机械表
            dt_target = Get08110002Dt(drs_dy_jlczjx, dt_target, "玖龙纸业粗制水", "dy", 11);

            DataRow[] drs_qy_jlczjx = dt_qy.Select("f_yslxid = '104' and f_sblxid = '100'  and lx = 'jxb'"); //玖龙纸业粗制水+机械表
            dt_target = Get08110002Dt(drs_qy_jlczjx, dt_target, "玖龙纸业粗制水", "qy", 11);

            DataRow[] drs_qn_jlczjx = dt_qn.Select("f_yslxid = '104' and f_sblxid = '100'  and lx = 'jxb'"); //玖龙纸业粗制水+机械表
            dt_target = Get08110002Dt(drs_qn_jlczjx, dt_target, "玖龙纸业粗制水", "qn", 11);

            //玖龙纸业淡化水

            DataRow[] drs_dy_jldhjx = dt_dy.Select("f_yslxid = '105' and f_sblxid = '100'  and lx = 'jxb'"); //玖龙纸业淡化水+机械表
            dt_target = Get08110002Dt(drs_dy_jldhjx, dt_target, "玖龙纸业淡化水", "dy", 12);

            DataRow[] drs_qy_jldhjx = dt_qy.Select("f_yslxid = '105' and f_sblxid = '100'  and lx = 'jxb'"); //玖龙纸业淡化水+机械表
            dt_target = Get08110002Dt(drs_qy_jldhjx, dt_target, "玖龙纸业淡化水", "qy", 12);

            DataRow[] drs_qn_jldhjx = dt_qn.Select("f_yslxid = '105' and f_sblxid = '100' and lx = 'jxb'"); //玖龙纸业淡化水+机械表
            dt_target = Get08110002Dt(drs_qn_jldhjx, dt_target, "玖龙纸业淡化水", "qn", 12);

            //IC补卡费
            dt_target = Get08110002EmptyRow(dt_target, "IC补卡费", "--", "--", 13);
            //违约金
            dt_target = Get08110002EmptyRow(dt_target, "违约金", "--", "--", 14);
            //供水服务费
            dt_target = Get08110002EmptyRow(dt_target, "供水服务费", "--", "--", 15);
            //追缴水费
            dt_target = Get08110002EmptyRow(dt_target, "追缴水费", "6.5", "1.4", 16);
            dt_target = Get08110002EmptyRow(dt_target, "追缴水费", "3.95", "0.95", 16);
            ////远传表绿化表押金
            //dt_target = Get08110002EmptyRow(dt_target, "远传表绿化表押金", "", "", 17);
            ////绿化表押金结转
            //dt_target = Get08110002EmptyRow(dt_target, "绿化表押金结转", "", "", 18);
            //绿化水表押金
            dt_target = Get08110002EmptyRow(dt_target, "绿化水表押金", "", "", 19);


            //特种行业用水

            DataRow[] drs_dy_tzhyys = dt_dy.Select("f_yslxid = '6' and f_sblxid = '100'  and lx = 'jxb'"); //特种行业用水+机械表
            dt_target = Get08110002Dt(drs_dy_tzhyys, dt_target, "特种行业用水", "dy", 20);

            DataRow[] drs_qy_tzhyys = dt_qy.Select("f_yslxid = '6' and f_sblxid = '100'  and lx = 'jxb'"); //特种行业用水+机械表
            dt_target = Get08110002Dt(drs_qy_tzhyys, dt_target, "特种行业用水", "qy", 20);

            DataRow[] drs_qn_tzhyys = dt_qn.Select("f_yslxid = '6' and f_sblxid = '100' and lx = 'jxb'"); //特种行业用水+机械表
            dt_target = Get08110002Dt(drs_qn_tzhyys, dt_target, "特种行业用水", "qn", 20);


            //合计

            DataTable dt_result = dt_target.Clone();

            dt_target.DefaultView.Sort = "rownum asc";

            double total_dysl = 0;
            double total_dysf = 0;
            double total_dypwf = 0;


            double total_qysl = 0;
            double total_qysf = 0;
            double total_qypwf = 0;


            double total_qnsl = 0;
            double total_qnsf = 0;
            double total_qnpwf = 0;

            double total_sumsl = 0;
            double total_zjsl = 0;
            double total_zjsf = 0;
            double total_zjpwf = 0;

            string lastlx = "";
            for (int i = 0; i < dt_target.Rows.Count; i++)
            {

                double dd_dysl = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["dysl"].ToString());
                double dd_dysf = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["dysf"].ToString());
                double dd_dypwf = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["dypwf"].ToString());

                double dd_qysl = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["qysl"].ToString());
                double dd_qysf = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["qysf"].ToString());
                double dd_qypwf = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["qypwf"].ToString());

                double dd_qnsl = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["qnsl"].ToString());
                double dd_qnsf = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["qnsf"].ToString());
                double dd_qnpwf = Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["qnpwf"].ToString());

                total_dysl += dd_dysl;
                total_dysf += dd_dysf;
                total_dypwf += dd_dypwf;

                total_qysl += dd_qysl;
                total_qysf += dd_qysf;
                total_qypwf += dd_qypwf;

                total_qnsl += dd_qnsl;
                total_qnsf += dd_qnsf;
                total_qnpwf += dd_qnpwf;

                double sumsl = dd_dysl + dd_qysl + dd_qnsl;
                double zjsf = dd_dysf + dd_qysf + dd_qnsf;
                double zjpwf = dd_dypwf + dd_qypwf + dd_qnpwf;
                double zjsl = zjsf + zjpwf;

                total_sumsl += sumsl;
                total_zjsl += zjsl;
                total_zjsf += zjsf;
                total_zjpwf += zjpwf;

                if (dt_target.Rows[i]["lx"].ToString() != lastlx)
                {
                    lastlx = dt_target.Rows[i]["lx"].ToString();
                }
                else
                {
                    dt_target.Rows[i]["lx"] = "";
                }
                dt_target.Rows[i]["sumsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(sumsl, 2);
                dt_target.Rows[i]["zjsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(zjsf, 2);
                dt_target.Rows[i]["zjpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(zjpwf, 2);
                dt_target.Rows[i]["zjsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(zjsl, 2);

                dt_result.ImportRow(dt_target.Rows[i]);
            }



            DataRow drn = dt_result.NewRow();
            drn["lx"] = "合计";
            drn["rownum"] = 99;
            drn["dysfdj"] = "--";
            drn["dypwfdj"] = "--";
            drn["dysfpwfdj"] = "--";




            drn["dysf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_dysf, 2);
            drn["dypwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_dypwf, 2);
            drn["dysl"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_dysl, 2);

            drn["qysl"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_qysl, 2);
            drn["qypwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_qypwf, 2);
            drn["qysf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_qysf, 2);

            drn["qnsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_qnsl, 2);
            drn["qnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_qnsf, 2);
            drn["qnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_qnpwf, 2);

            //drn["ycsfxj"] = dt_lj.Rows[0]["yc"].ToString();

            drn["sumsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_sumsl, 2);
            drn["zjsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_zjsf, 2);
            drn["zjpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_zjpwf, 2);
            drn["zjsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(total_zjsl, 2);

            dt_result.Rows.Add(drn);

            return dt_result;

        }

        private DataTable Get08110002Dt(DataRow[] drs_source, DataTable dt_target, string name, string type, double rownum)
        {
            if (drs_source.Length > 0)
            {
                for (int i = 0; i < drs_source.Length; i++)
                {
                    string sfjl = drs_source[i]["f_sfjl"].ToString();
                    if (sfjl.IndexOf("|") > 0)
                    {

                        string[] sfjls = sfjl.Split('|');
                        for (int ii = 0; ii < sfjls.Length; ii++)
                        {
                            if (sfjls[ii] != "")
                            {
                                dt_target = Get08110002DySflj(sfjls[ii], dt_target, name, type, rownum);
                            }

                        }
                    }
                    else
                    {
                        dt_target = Get08110002DySflj(sfjl, dt_target, name, type, rownum);
                    }
                }
            }
            else
            {
                if (type == "dy")
                {
                    DataRow drn = dt_target.NewRow();
                    if (name == "学校、福利机构")
                    {
                        drn["dysfdj"] = "4.60";
                        drn["dypwfdj"] = "0.95";
                        drn["dysfpwfdj"] = "5.55";

                    }

                    else if (name == "旅游区")
                    {

                        drn["dysfdj"] = "4.85";
                        drn["dypwfdj"] = "0.00";
                        drn["dysfpwfdj"] = "4.85";
                    }

                    else if (name == "航母游乐港")
                    {
                        drn["dysfdj"] = "6.45";
                        drn["dypwfdj"] = "0.00";
                        drn["dysfpwfdj"] = "6.45";
                    }

                    else if (name == "玖龙纸业粗制水")
                    {
                        drn["dysfdj"] = "3.97";
                        drn["dypwfdj"] = "0.00";
                        drn["dysfpwfdj"] = "3.97";
                    }

                    else if (name == "玖龙纸业淡化水")
                    {

                        drn["dysfdj"] = "6.996";
                        drn["dypwfdj"] = "0.00";
                        drn["dysfpwfdj"] = "6.996";
                    }
                    else if (name == "IC卡邮储代收")
                    {

                        drn["dysfdj"] = "3.95";
                        drn["dypwfdj"] = "0.95";
                        drn["dysfpwfdj"] = "4.9";
                    }
                    else if (name == "特种行业用水")
                    {

                        drn["dysfdj"] = "20.90";
                        drn["dypwfdj"] = "1.40";
                        drn["dysfpwfdj"] = "22.30";
                    }
                    else
                    {
                        drn["dysfdj"] = "";
                        drn["dypwfdj"] = "";
                        drn["dysfpwfdj"] = "";
                    }

                    drn["lx"] = name;
                    drn["rownum"] = rownum;


                    drn["dysf"] = "0.0";
                    drn["dypwf"] = "0.0";
                    drn["dysl"] = "0.0";
                    drn["qysl"] = "0.0";
                    drn["qypwf"] = "0.0";
                    drn["qysf"] = "0.0";
                    drn["qnsl"] = "0.0";
                    drn["qnsf"] = "0.0";
                    drn["qnpwf"] = "0.0";
                    //drn["ycsfxj"] = "";
                    drn["zjsf"] = "";
                    drn["zjpwf"] = "";
                    drn["zjsl"] = "";
                    dt_target.Rows.Add(drn);
                }
            }
            return dt_target;

        }

        private DataTable Get08110002DySflj(string sfjl, DataTable dt_target, string name, string type, double rownum)
        {
            string[] sfjlArray = sfjl.Split('^');
            string dj_sf = sfjlArray[0];
            string dj_pwf = sfjlArray[1];
            string sl = sfjlArray[2];
            //string sf = dt_dy.Rows[i]["f_sf"].ToString();
            //string pwf = dt_dy.Rows[i]["f_pwf"].ToString();


            double d_dj_sf = Eva.Library.Text.NumberTool.Parse(dj_sf);
            double d_dj_pwf = Eva.Library.Text.NumberTool.Parse(dj_pwf);
            if (d_dj_sf == 7 && d_dj_pwf == 0)
            {
                d_dj_sf = 6.996;
            }
            double d_sl = Eva.Library.Text.NumberTool.Parse(sl);
            double d_sf = d_dj_sf * d_sl;
            double d_pwf = d_dj_pwf * d_sl;

            double d_dj_sfpwf = d_dj_sf + d_dj_pwf;

            if (name == "居民用户")
            {
                if (d_dj_sfpwf == 4.9)
                {

                }
                else
                {
                    name = "超阶梯水费";

                    rownum = rownum + 1;
                }

            }



            DataRow[] drs = dt_target.Select("lx = '" + name + "' and  dysfdj = '" + Eva.Library.Text.NumberTool.GetNumberByLength(dj_sf, 2) + "' and dypwfdj = '" + Eva.Library.Text.NumberTool.GetNumberByLength(dj_pwf, 2) + "'");

            if (drs.Length > 0)
            {
                switch (type)
                {
                    case "dy":
                        {
                            double dd_dysl = Eva.Library.Text.NumberTool.Parse(drs[0]["dysl"].ToString());
                            double dd_dysf = Eva.Library.Text.NumberTool.Parse(drs[0]["dysf"].ToString());
                            double dd_dypwf = Eva.Library.Text.NumberTool.Parse(drs[0]["dypwf"].ToString());


                            drs[0]["dysl"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_dysl + d_sl, 2);
                            drs[0]["dysf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_dysf + d_sf, 2);
                            drs[0]["dypwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_dypwf + d_pwf, 2);
                        }

                        break;
                    case "qy":
                        {
                            double dd_qysl = Eva.Library.Text.NumberTool.Parse(drs[0]["qysl"].ToString());
                            double dd_qysf = Eva.Library.Text.NumberTool.Parse(drs[0]["qysf"].ToString());
                            double dd_qypwf = Eva.Library.Text.NumberTool.Parse(drs[0]["qypwf"].ToString());


                            drs[0]["qysl"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_qysl + d_sl, 2);
                            drs[0]["qysf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_qysf + d_sf, 2);
                            drs[0]["qypwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_qypwf + d_pwf, 2);
                        }

                        break;
                    case "qn":
                        {
                            double dd_qnsl = Eva.Library.Text.NumberTool.Parse(drs[0]["qnsl"].ToString());
                            double dd_qnsf = Eva.Library.Text.NumberTool.Parse(drs[0]["qnsf"].ToString());
                            double dd_qnpwf = Eva.Library.Text.NumberTool.Parse(drs[0]["qnpwf"].ToString());


                            drs[0]["qnsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_qnsl + d_sl, 2);
                            drs[0]["qnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_qnsf + d_sf, 2);
                            drs[0]["qnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_qnpwf + d_pwf, 2);
                        }

                        break;
                }



            }
            else
            {
                DataRow drn = dt_target.NewRow();
                drn["lx"] = name;
                drn["rownum"] = rownum;
                drn["dysfdj"] = Eva.Library.Text.NumberTool.GetNumberByLength(dj_sf, 2);
                drn["dypwfdj"] = Eva.Library.Text.NumberTool.GetNumberByLength(dj_pwf, 2);
                drn["dysfpwfdj"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_dj_sfpwf, 2);


                switch (type)
                {
                    case "dy":
                        {

                            drn["dysf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf, 2);
                            drn["dypwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_pwf, 2);
                            drn["dysl"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sl, 2);


                            drn["qysl"] = "0.0";
                            drn["qypwf"] = "0.0";
                            drn["qysf"] = "0.0";

                            drn["qnsl"] = "0.0";
                            drn["qnsf"] = "0.0";
                            drn["qnpwf"] = "0.0";

                        }
                        break;

                    case "qn":
                        {

                            drn["dysf"] = "0.0";
                            drn["dypwf"] = "0.0";
                            drn["dysl"] = "0.0";


                            drn["qysl"] = "0.0";
                            drn["qypwf"] = "0.0";
                            drn["qysf"] = "0.0";

                            drn["qnsl"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sl, 2);
                            drn["qnsf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf, 2);
                            drn["qnpwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_pwf, 2);

                        }
                        break;

                    case "qy":
                        {
                            drn["dysf"] = "0.0";
                            drn["dypwf"] = "0.0";
                            drn["dysl"] = "0.0";


                            drn["qysl"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sl, 2);
                            drn["qypwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_pwf, 2);
                            drn["qysf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf, 2);

                            drn["qnsl"] = "0.0";
                            drn["qnsf"] = "0.0";
                            drn["qnpwf"] = "0.0";

                        }
                        break;
                }


                //drn["ycsfxj"] = "0.0";

                drn["zjsf"] = "0.0";
                drn["zjpwf"] = "0.0";
                drn["zjsl"] = "0.0";

                dt_target.Rows.Add(drn);

            }

            return dt_target;
        }

        private DataTable Get08110002EmptyRow(DataTable dt_target, string lx, string sfdj, string pwfdj, double rownum)
        {
            DataRow drn = dt_target.NewRow();
            drn["lx"] = lx;
            drn["rownum"] = rownum;
            drn["dysfdj"] = sfdj;
            drn["dypwfdj"] = pwfdj;
            drn["dysfpwfdj"] = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(sfdj) + Eva.Library.Text.NumberTool.Parse(pwfdj), 2);




            drn["dysf"] = "0.0";
            drn["dypwf"] = "0.0";
            drn["dysl"] = "0.0";

            drn["qysl"] = "0.0";
            drn["qypwf"] = "0.0";
            drn["qysf"] = "0.0";

            drn["qnsl"] = "0.0";
            drn["qnsf"] = "0.0";
            drn["qnpwf"] = "0.0";

            //drn["ycsfxj"] = "0.0";

            drn["zjsf"] = "0.0";
            drn["zjpwf"] = "0.0";
            drn["zjsl"] = "0.0";

            dt_target.Rows.Add(drn);

            return dt_target;
        }

        /// <summary>
        /// 获取日结转报表
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="_iAccessData"></param>
        /// <returns></returns>
        private DataTable Get08110001(string userid, DateTime zbsj, string khfzid, Eva.Library.Data.AccessData.IAccessData _iAccessData)
        {

            string sql = "";
            DataTable dt_dy = null;
            DataTable dt_qy = null;
            DataTable dt_qn = null;
            DataTable dt_lj = null;


            #region dataset
            //操作时间where
            string czsjwhere = " between to_date('" + zbsj.ToString("yyyy-MM-dd") + " 00:00:00','yyyy-MM-dd hh24:mi:ss') and  to_date('" + zbsj.ToString("yyyy-MM-dd") + " 23:59:59','yyyy-MM-dd hh24:mi:ss')  ";

            //--当月;
            string dywhere = " between trunc(add_months(last_day(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + " ','yyyy-MM-dd hh24:mi:ss')), -1) + 1)  and last_day(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')) ";

            //---欠月
            string qywhere = " between trunc(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),'yy')  and trunc(add_months(last_day(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')), -1) + 1) -1 ";

            //--欠年
            string qnwhere = " <  trunc(to_date('" + zbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),'yy')-1 ";

            string[] khfzarray = khfzid.Split(',');
            sql = "";
            sql += " select * ";
            sql += "   from (select f_sfjl,  ";
            sql += "                f_yslxid,  ";
            sql += "                f_sblxid,  ";
            sql += "                f_lyid,  ";
            sql += "                f_cbsj as rq,  ";
            sql += "                'jxb' as lx  ";
            sql += "           from tbl_ld_cbiao  ";
            sql += "          where f_jfbhid in (select sys_id ";
            sql += "                               from tbl_ld_jfb  ";
            sql += "                              where f_lyid in ('08080003','08080002','08080007','08080008','08080006')  ";
            sql += "                                and f_ztid = '2'  ";

            for (int l = 0; l < khfzarray.Length; l++)
            {
                if (l == 0)
                {
                    sql += "                                and (','||f_khfzid||',' like ('%," + khfzarray[l] + ",%') ";


                }
                else
                {
                    sql += "                                or ','||f_khfzid||',' like ('%," + khfzarray[l] + ",%') ";

                }


            }
            sql += ")";
            sql += "                                and f_sfjl is not null  ";
            sql += "                                and f_czsj " + czsjwhere;
            sql += "                                and f_yyyid in (" + userid + ")) ";



            if (("," + khfzid + ",").IndexOf(",4063,") != -1)
            {
                sql += "         union all ";
                sql += "         select f_sfjl, ";
                sql += "                f_yslxid, ";
                sql += "                f_sblxid, ";
                sql += "                f_lyid, ";
                sql += "                f_xiekrq as rq, ";
                sql += "                'ickb' as lx ";
                sql += "           from tbl_ld_ickss ";
                sql += "          where f_ztid in ('2','3','4') ";
                sql += "            and f_sfjl is not null ";
                sql += "            and f_xiekrq  " + czsjwhere;
                sql += "            and f_xiekrid in (" + userid + ") ";
            }

            sql += ")";


            //当月

            string sqldy = sql + "  where rq  " + dywhere;
            sqldy += "  order by to_number(f_yslxid), f_sfjl ";

            dt_dy = _iAccessData.Query(sqldy).Tables[0];
            //欠月

            string sqlqy = sql + "  where rq  " + qywhere;
            sqlqy += "  order by to_number(f_yslxid), f_sfjl ";

            dt_qy = _iAccessData.Query(sqlqy).Tables[0];

            //前年
            string sqlqn = sql + "  where rq  " + qnwhere;
            sqlqn += "  order by to_number(f_yslxid), f_sfjl ";


            dt_qn = _iAccessData.Query(sqlqn).Tables[0];

            //累计
            sql = "";
            sql += "  select sum(jm) as jm, sum(tjjz) as tjjz, sum(yc) as yc, sum(ys) as ys ";
            sql += "  from ( ";
            sql += "  select sum(F_JMJELJ) as jm, ";
            sql += "      sum(F_SYTJJZSF + F_SYTJJZPWF) as tjjz, ";
            sql += "      sum(F_SYYE) as yc,";
            sql += "      sum(F_SHYS) as ys";
            sql += "  from tbl_ld_jfb";
            sql += "  where f_lyid in ('08080003','08080002','08080007','08080008','08080006')";
            sql += "  and f_ztid = '2'";

            for (int l = 0; l < khfzarray.Length; l++)
            {
                if (l == 0)
                {
                    sql += "                                and (','||f_khfzid||',' like ('%," + khfzarray[l] + ",%') ";


                }
                else
                {
                    sql += "                                or ','||f_khfzid||',' like ('%," + khfzarray[l] + ",%') ";

                }


            }
            sql += ")";
            sql += "  and f_czsj  " + czsjwhere;
            sql += "  and f_yyyid in (" + userid + ")";



            if (("," + khfzid + ",").IndexOf(",4063,") != -1)
            {
                sql += "  union all";
                sql += "  select to_number('0') as jm,";
                sql += "      sum(F_SYTJJZSF + F_SYTJJZPWF) as tjjz,";
                sql += "      sum(F_SYYE) as yc,";
                sql += "      sum(F_SHYS) as ys";
                sql += "  from tbl_ld_ickss";
                sql += "  where f_ztid in ('2','3','4')";
                sql += "  and f_sfjl is not null";
                sql += "  and f_xiekrq  " + czsjwhere;
                sql += "  and f_xiekrid in (" + userid + ")";
            }
            sql += ")";



            dt_lj = _iAccessData.Query(sql).Tables[0];

            #endregion

            #region 构造ds

            DataTable dt_target = new DataTable();
            DataColumn dc = new DataColumn();
            dc.ColumnName = "lx";//类型
            dt_target.Columns.Add(dc);


            dc = new DataColumn();
            dc.ColumnName = "sj";//水价
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "sf";//水费
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "sl";//水量
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "pwf";//排污费
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "ysje";//应收金额
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "zrje";//折让金额
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "ycdx";//	绿化表押金抵消
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "xzyc";//	新增绿化表押金
            dt_target.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "ssje";//	实收金额
            dt_target.Columns.Add(dc);

            DataTable dt_target_dy = dt_target.Clone();

            DataTable dt_target_qy = dt_target.Clone();

            DataTable dt_target_qn = dt_target.Clone();
            #endregion



            dt_target_dy = Get08110001ResultDt(dt_dy, dt_target_dy, "当月");


            dt_target_qy = Get08110001ResultDt(dt_qy, dt_target_qy, "欠月");


            dt_target_qn = Get08110001ResultDt(dt_qn, dt_target_qn, "欠年");



            double d_sf = 0;
            double d_sl = 0;
            double d_pwf = 0;
            double d_ysje = 0;
            for (int i = 0; i < dt_target_dy.Rows.Count; i++)
            {
                dt_target.ImportRow(dt_target_dy.Rows[i]);
                if (dt_target_dy.Rows[i]["sj"].ToString() != "合计")
                {
                    d_sf += Eva.Library.Text.NumberTool.Parse(dt_target_dy.Rows[i]["sf"].ToString());
                    d_sl += Eva.Library.Text.NumberTool.Parse(dt_target_dy.Rows[i]["sl"].ToString());
                    d_pwf += Eva.Library.Text.NumberTool.Parse(dt_target_dy.Rows[i]["pwf"].ToString());
                    d_ysje += Eva.Library.Text.NumberTool.Parse(dt_target_dy.Rows[i]["ysje"].ToString());
                }
            }

            for (int i = 0; i < dt_target_qy.Rows.Count; i++)
            {
                dt_target.ImportRow(dt_target_qy.Rows[i]);
                if (dt_target_qy.Rows[i]["sj"].ToString() != "合计")
                {
                    d_sf += Eva.Library.Text.NumberTool.Parse(dt_target_qy.Rows[i]["sf"].ToString());
                    d_sl += Eva.Library.Text.NumberTool.Parse(dt_target_qy.Rows[i]["sl"].ToString());
                    d_pwf += Eva.Library.Text.NumberTool.Parse(dt_target_qy.Rows[i]["pwf"].ToString());
                    d_ysje += Eva.Library.Text.NumberTool.Parse(dt_target_qy.Rows[i]["ysje"].ToString());
                }
            }

            for (int i = 0; i < dt_target_qn.Rows.Count; i++)
            {
                dt_target.ImportRow(dt_target_qn.Rows[i]);
                if (dt_target_qn.Rows[i]["sj"].ToString() != "合计")
                {
                    d_sf += Eva.Library.Text.NumberTool.Parse(dt_target_qn.Rows[i]["sf"].ToString());
                    d_sl += Eva.Library.Text.NumberTool.Parse(dt_target_qn.Rows[i]["sl"].ToString());
                    d_pwf += Eva.Library.Text.NumberTool.Parse(dt_target_qn.Rows[i]["pwf"].ToString());
                    d_ysje += Eva.Library.Text.NumberTool.Parse(dt_target_qn.Rows[i]["ysje"].ToString());
                }

            }
            DataRow dr_target_new = dt_target.NewRow();

            dr_target_new["lx"] = "总计";
            dr_target_new["sj"] = "";
            dr_target_new["sf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf, 2);
            dr_target_new["sl"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sl, 2);
            dr_target_new["pwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_pwf, 2);
            dr_target_new["ysje"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_ysje, 2);
            if (dt_lj.Rows.Count > 0)
            {
                dr_target_new["zrje"] = Eva.Library.Text.NumberTool.GetNumberByLength(dt_lj.Rows[0]["jm"].ToString(), 2);
                dr_target_new["ycdx"] = Eva.Library.Text.NumberTool.GetNumberByLength(dt_lj.Rows[0]["tjjz"].ToString(), 2);
                dr_target_new["xzyc"] = Eva.Library.Text.NumberTool.GetNumberByLength(dt_lj.Rows[0]["yc"].ToString(), 2);
                dr_target_new["ssje"] = Eva.Library.Text.NumberTool.GetNumberByLength(dt_lj.Rows[0]["ys"].ToString(), 2);
            }
            else
            {
                dr_target_new["zrje"] = "0.0";
                dr_target_new["ycdx"] = "0.0";
                dr_target_new["xzyc"] = "0.0";
                dr_target_new["ssje"] = "0.0";
            }


            dt_target.Rows.Add(dr_target_new);

            return dt_target;
        }

        private DataTable Get08110001ResultDt(DataTable dt_source, DataTable dt_target, string name)
        {
            for (int i = 0; i < dt_source.Rows.Count; i++)
            {
                string sfjl = dt_source.Rows[i]["f_sfjl"].ToString();

                if (sfjl.IndexOf("|") > 0)
                {
                    string[] sfjls = sfjl.Split('|');
                    for (int ii = 0; ii < sfjls.Length; ii++)
                    {
                        if (sfjls[ii] != "")
                        {
                            dt_target = Get08110001ResultDtSfjl(sfjls[ii], dt_target);
                        }

                    }
                }
                else
                {
                    dt_target = Get08110001ResultDtSfjl(sfjl, dt_target);
                }

            }


            double d_sf = 0;
            double d_sl = 0;
            double d_pwf = 0;
            double d_ysje = 0;

            for (int i = 0; i < dt_target.Rows.Count; i++)
            {
                if (i == 0)
                {
                    dt_target.Rows[i]["lx"] = name;
                }
                d_sf += Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["sf"].ToString());
                d_sl += Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["sl"].ToString());
                d_pwf += Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["pwf"].ToString());
                d_ysje += Eva.Library.Text.NumberTool.Parse(dt_target.Rows[i]["ysje"].ToString());

            }
            DataRow dr_target_new = dt_target.NewRow();
            if (dt_target.Rows.Count == 0)
            {
                dr_target_new["lx"] = name;
            }
            else
            {
                dr_target_new["lx"] = "";
            }

            dr_target_new["sj"] = "合计";
            dr_target_new["sf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf, 2);
            dr_target_new["sl"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sl, 2);
            dr_target_new["pwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_pwf, 2);
            dr_target_new["ysje"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_ysje, 2);
            dr_target_new["zrje"] = "0.0";
            dr_target_new["ycdx"] = "0.0";
            dr_target_new["xzyc"] = "0.0";
            dr_target_new["ssje"] = "0.0";

            dt_target.Rows.Add(dr_target_new);

            return dt_target;
        }

        private DataTable Get08110001ResultDtSfjl(string sfjl, DataTable dt_target)
        {
            string[] sfjlArray = sfjl.Split('^');
            string dj_sf = sfjlArray[0];
            string dj_pwf = sfjlArray[1];
            string sl = sfjlArray[2];



            double d_dj_sf = Eva.Library.Text.NumberTool.Parse(dj_sf);
            double d_dj_pwf = Eva.Library.Text.NumberTool.Parse(dj_pwf);
            if (d_dj_sf == 7 && d_dj_pwf == 0)
            {
                d_dj_sf = 6.996;
            }
            double d_sl = Eva.Library.Text.NumberTool.Parse(sl);
            double d_sf = d_dj_sf * d_sl;
            double d_pwf = d_dj_pwf * d_sl;

            double d_dj_sfpwf = d_dj_sf + d_dj_pwf;

            string dj_sfpwf = Eva.Library.Text.NumberTool.GetNumberByLength(d_dj_sfpwf, 2);
            if (dj_sfpwf == "5.55")
            {
                dj_sfpwf = dj_sfpwf + "_" + d_dj_sf;
            }
            DataRow[] drs = dt_target.Select("sj = '" + dj_sfpwf + "'");
            if (drs.Length > 0)
            {
                double dd_sf = Eva.Library.Text.NumberTool.Parse(drs[0]["sf"].ToString());
                double dd_sl = Eva.Library.Text.NumberTool.Parse(drs[0]["sl"].ToString());
                double dd_pwf = Eva.Library.Text.NumberTool.Parse(drs[0]["pwf"].ToString());
                double dd_ysje = Eva.Library.Text.NumberTool.Parse(drs[0]["ysje"].ToString());

                drs[0]["sf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_sf + d_sf, 2);
                drs[0]["sl"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_sl + d_sl, 2);
                drs[0]["pwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_pwf + d_pwf, 2);
                drs[0]["ysje"] = Eva.Library.Text.NumberTool.GetNumberByLength(dd_ysje + d_sf + d_pwf, 2);

            }
            else
            {
                DataRow drn = dt_target.NewRow();

                drn["sj"] = dj_sfpwf;
                drn["sf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf, 2);
                drn["sl"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sl, 2);
                drn["pwf"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_pwf, 2);
                drn["ysje"] = Eva.Library.Text.NumberTool.GetNumberByLength(d_sf + d_pwf, 2);
                drn["zrje"] = "0.0";
                drn["ycdx"] = "0.0";
                drn["xzyc"] = "0.0";
                drn["ssje"] = "0.0";

                dt_target.Rows.Add(drn);

            }

            return dt_target;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateCross(string updateType, string json, string columns, string clientInf)
        {
            string result1 = this.Update(updateType, json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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
                List<sara.dd.ldsw.model.tbl_ld_report> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_report>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_report.UpdateList(modellist, columns, null);

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
        public void UpdateListCross(string json, string columns, string clientInf)
        {
            string result1 = this.UpdateList(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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
                //删除附件的功能
                string fileIDs = "";
                string columnsString = "";

                columnsString += "f_contentid,";

                columnsString = columnsString.TrimEnd(',');
                List<sara.dd.ldsw.model.tbl_ld_report> l_tbl_ld_report = _idal_tbl_ld_report.GetList(whereString, "", columnsString, "", "", null);
                foreach (sara.dd.ldsw.model.tbl_ld_report model in l_tbl_ld_report)
                {

                    fileIDs += model.f_contentid + ",";

                }
                fileIDs = fileIDs.TrimEnd(',');
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);

                //删除子表的方法

                //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_report.Delete(whereString, null);
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
        public void DeleteCross(string whereString, string clientInf)
        {
            string result1 = this.Delete(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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
                resultDic["message"] = _idal_tbl_ld_report.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
        public void LogicDeleteCross(string delUserId, string delUserName, string delDate, string whereString, string clientInf)
        {
            string result1 = this.LogicDelete(delUserId, delUserName, delDate, whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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
                resultDic["message"] = _idal_tbl_ld_report.GetCount(whereString, null);

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
        public void GetCountCross(string whereString, string clientInf)
        {
            string result1 = this.GetCount(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_report>(_idal_tbl_ld_report.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_report.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetListCross(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetListForApp(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_report.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_report.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

                NewLog("数据查询成功，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，countString：" + countString + "，stepString：" + stepString + "", "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据查询失败，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，countString：" + countString + "，stepString：" + stepString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetListForAppCross(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetListForApp(whereString, orderByString, columnsString, countString, stepString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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

                columns += "^" + "f_bbmc";

                columns += "^" + "f_bblx";

                columns += "^" + "f_bblxid";

                columns += "^" + "f_zbr";

                columns += "^" + "f_zbrid";

                columns += "^" + "f_zbsj";

                columns += "^" + "f_zt";

                columns += "^" + "f_ztid";

                columns += "^" + "f_bz";

                columns += "^" + "f_content";

                columns += "^" + "f_contentid";


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
        public string DownLoad(string sys_id, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            string file = "";
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string userid = clientInfoDic["userid"];
                string username = clientInfoDic["username"];
                List<sara.dd.ldsw.model.tbl_ld_report> modelist = _idal_tbl_ld_report.GetList("sys_id = '" + sys_id + "'", "", "*", "", "", null);


                if (modelist.Count > 0)
                {
                    sara.dd.ldsw.model.tbl_ld_report m = modelist[0];
                    DataTable dt = null;
                    if (m.f_content != null && m.f_content != "" && m.f_content != "[]")
                    {
                        switch (m.f_bblxid)
                        {
                            case "08110001"://日结账报表

                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);

                                DataRow dr = null;
                                dr = dt.NewRow();
                                dr["sl"] = "客户分组：" + m.f_value3;
                                dr["LX"] = "收费员：" + m.f_zbr;
                                dr["SSJE"] = "日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr);
                                file = tt.Report_rjzbb(dt);

                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110002"://经营管理部日结账报表
                                            //DataTable dt1 = new DataTable();
                                            //DataColumn dc1 = null;
                                            //DataRow dr1 = null;
                                            //dc1 = dt1.Columns.Add("F_DJ");
                                            //dc1 = dt1.Columns.Add("F_SL");
                                            //dc1 = dt1.Columns.Add("F_SFJE");
                                            //dr1 = dt1.NewRow();
                                            //dr1["F_DJ"] = "4.2";
                                            //dr1["F_SL"] = "100";
                                            //dr1["F_SFJE"] = "420";
                                            //dt1.Rows.Add(dr1);
                                            //dr1 = dt1.NewRow();
                                            //dr1["F_DJ"] = "3.95";
                                            //dr1["F_SL"] = "100";
                                            //dr1["F_SFJE"] = "395";
                                            //dr1 = dt1.NewRow();
                                            //dr1 = dt1.NewRow();
                                            //dr1["F_DJ"] = "5.25";
                                            //dr1["F_SL"] = "100";
                                            //dr1["F_SFJE"] = "525";
                                            //dr1 = dt1.NewRow();
                                            // string file = re.Report_jgbrjzbb(dt1);

                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr1 = null;
                                dr1 = dt.NewRow();
                                dr1["LX"] = "制表人：" + m.f_zbr;
                                dr1["DYSL"] = "审核人：";
                                dr1["DYPWF"] = "审定人：";
                                dr1["ZJSF"] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr1);
                                file = tt.Report_jgbrjzbb(dt);

                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;

                            case "08110003"://用户情况年度汇总表

                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr2 = null;
                                dr2 = dt.NewRow();
                                dr2["xz1"] = "制表人：" + m.f_zbr;
                                dr2["xz2"] = "审核人：";
                                dr2["xz3"] = "审定人：";
                                dr2["xz4"] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr2);
                                file = tt.Report_yhqkhzb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110006"://水表更换情况年度统计表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0006 = null;
                                dr0006 = dt.NewRow();
                                dr0006["xz1"] = "制表人：" + m.f_zbr;
                                dr0006["xz2"] = "审核人：";
                                dr0006["xz3"] = "审定人：";
                                dr0006["xz4"] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0006);
                                file = tt.Report_sbghqkndtjb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110004"://年销售收入情况表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0004 = null;
                                dr0004 = dt.NewRow();
                                dr0004["yssf1"] = "制表人：" + m.f_zbr;
                                dr0004["yssf2"] = "审核人：";
                                dr0004["yssf3"] = "审定人：";
                                dr0004["yssf4"] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0004);
                                file = tt.Report_nxssrqkb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110005"://商业用水欠费统计表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0005 = null;
                                dr0005 = dt.NewRow();
                                dr0005[0] = m.f_zbr;
                                dr0005[2] = "审核人：";
                                dr0005[4] = "审定人：";
                                dr0005[6] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0005);
                                file = tt.Report_syysqftjb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110007"://收费情况统计表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0007 = null;
                                dr0007 = dt.NewRow();
                                dr0007["zs1"] = "制表人：" + m.f_zbr;
                                dr0007["zs2"] = "审核人：";
                                dr0007["zs3"] = "审定人：";
                                dr0007["zs4"] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0007);
                                file = tt.Report_sfqktjb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110009"://节水办用户明细表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0009 = null;
                                dr0009 = dt.NewRow();
                                dr0009[0] = "制表人：";
                                dr0009[1] = m.f_zbr;
                                dr0009[2] = "审核人：";
                                dr0009[3] = "审定人：";
                                dr0009[4] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0009);
                                file = tt.Report_jsbyhmxb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110010"://节水办用户明细表变更
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0010 = null;
                                dr0010 = dt.NewRow();
                                dr0010["xh"] = "制表人：";
                                dr0010["f_sbbh"] = m.f_zbr;

                                dr0010["f_sblx"] = "审核人：";
                                dr0010["dwdz"] = "审定人：";
                                dr0010["f_yhm"] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0010);
                                file = tt.Report_jsbyhxxbgmxb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110008"://日结算报表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0008 = null;
                                dr0008 = dt.NewRow();
                                dr0008[0] = m.f_zbr;
                                dt.Rows.Add(dr0008);
                                dr0008 = dt.NewRow();
                                dr0008[0] = (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0008);
                                file = tt.Report_rjsbb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110011"://月份销售情况统计表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0011 = null;
                                dr0011 = dt.NewRow();
                                dr0011[0] = m.f_zbr;
                                dr0011[1] = "审核人:";
                                dr0011[3] = "审定人:";
                                dr0011[6] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0011);
                                file = tt.Report_yfxsqktjb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110012"://年水量及销售收入情况分析表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0012 = null;
                                dr0012 = dt.NewRow();
                                dr0012[0] = "制表人:" + m.f_zbr;
                                dr0012[3] = "审核人:";
                                dr0012[6] = "审定人:";
                                dr0012[9] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0012);
                                file = tt.Report_nsljxssrqkfeb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110013"://年居民水量情况分析表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0013 = null;
                                dr0013 = dt.NewRow();
                                dr0013[0] = "制表人:" + m.f_zbr;
                                dr0013[3] = "审核人:";
                                dr0013[6] = "审定人:";
                                dr0013[9] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0013);
                                file = tt.Report_njmslqkfxb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                            case "08110014"://年销售水量情况汇总表
                                dt = Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(m.f_content);
                                DataRow dr0014 = null;
                                dr0014 = dt.NewRow();
                                dr0014[0] = "制表人:" + m.f_zbr;
                                dr0014[3] = "审核人:";
                                dr0014[6] = "审定人:";
                                dr0014[9] = "报表统计日期：" + (DateTime.Parse(m.f_zbsj.ToString())).ToString("yyyy-MM-dd");
                                dt.Rows.Add(dr0014);
                                file = tt.Report_nxsslqkhzb(dt);
                                resultDic["result"] = "true";
                                resultDic["message"] = file;
                                break;
                        }

                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "该报表无内容";
                    }

                    //resultDic["result"] = "true";
                    //resultDic["message"] = file;
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "您选择的数据不存在";
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
        public void DownLoadCross(string sys_id, string clientInf)
        {
            string result1 = this.DownLoad(sys_id, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }


        //自动报表引导
        [WebMethod]
        public string autoReport(string userid, DateTime zbsj, string reporttype, string reporttypeid)
        {
            //获取月底时间
            try
            {
                zbsj = zbsj.AddDays(-1);
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                DataTable dt = new DataTable();
                switch (reporttype)
                {
                    case "用户情况年度汇总表":
                        dt = Get08110003(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "年度销售收入情况表":
                        dt = Get08110004(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "商业用水欠费统计表":
                        dt = Get08110005(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "水表更换情况年度统计表":
                        dt = Get08110006(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;

                    case "收费情况年度统计表":
                        dt = Get08110007(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;

                    case "节水办用户明细表":
                        dt = Get08110009(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "节水办用户信息变更明细表":
                        dt = Get08110010(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "月销售情况统计表":
                        dt = Get08110011(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "年水量及销售收入情况分析表":
                        dt = Get08110012(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "年居民水量情况分析表":
                        dt = Get08110013(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                    case "年销售水量情况汇总表":
                        dt = Get08110014(userid, zbsj, _iAccessData);
                        reportdbCreate(dt, userid, zbsj, reporttype, reporttypeid);
                        break;
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }

            return "报表成功生成";

        }


        //报表数据自动生成

        public void reportdbCreate(DataTable dt, string userid, DateTime zbsj, string reporttype, string reporttypeid)
        {
            try
            {
                //获取制表人详情
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sql = "select username,t.u_organid as organid,(select o_fullname from t_organ where o_id=t.u_organid) as organ from (select U_CODE as username,U_ORGANID FROM t_user where U_ID='" + userid + "') t";
                DataTable userdt = _iAccessData.Query(sql).Tables[0];
                if (userdt.Rows.Count == 1)
                {
                    string username = userdt.Rows[0]["username"].ToString();
                    string organid = userdt.Rows[0]["organid"].ToString();
                    string organ = userdt.Rows[0]["organ"].ToString();

                    sara.dd.ldsw.model.tbl_ld_report model = new model.tbl_ld_report();
                    model.sys_creatuserid = userid;
                    model.sys_creatusername = username;
                    model.sys_creatdate = zbsj;
                    model.sys_lastedituserid = userid;
                    model.sys_lasteditusername = username;
                    model.sys_lasteditdate = zbsj;
                    model.sys_delflag = "0";
                    model.f_value1 = organid;
                    model.f_value2 = organ;
                    model.f_bbmc = "新建" + organ + reporttype + "_" + Eva.Library.Text.NumberTool.GetNoRepeatNumber();
                    model.f_bblx = reporttype;
                    model.f_bblxid = reporttypeid;
                    model.f_zbr = username;
                    model.f_zbrid = userid;
                    model.f_zbsj = zbsj;
                    model.f_zt = "已导出";
                    model.f_ztid = "1";
                    model.f_content = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                    _idal_tbl_ld_report.Add(model, null);
                }
                else
                {
                    throw new Exception("制表人id不正确");
                }









            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /**
     * 获取where in语句
     *
     * @param column      字段名
     * @param values      值集合
     * @param num         数量
     * @return where in语句
     */
        String GetWhereInValuesSql(String column, List<String> values, int num)
        {
            // sql语句
            String sql = "(";
            // 值的个数
            int valueSize = values.Count();

            // 批次数
            int batchSize = valueSize / num + (valueSize % num == 0 ? 0 : 1);
            for (int i = 0; i < batchSize; i++)
            {
                if (i > 0)
                {
                    sql += ") or ";
                }
                sql += column + " in (";
                for (int j = i * num; (j < (i + 1) * num) && j < valueSize; j++)
                {
                    if (j > i * num)
                    {
                        sql += ",";
                    }
                    sql += "'" + values[j] + "'";
                }
            }
            sql += "))";
            return sql;
        }
    }
}









