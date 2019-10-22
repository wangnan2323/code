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
using sara.dd.ldsw.commonclass;
using System.IO;
using System.Globalization;
using System.Text;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_ychk 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_ychk : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_ychk _idal_tbl_ld_ychk = new sara.dd.ldsw.dal.tbl_ld_ychk();
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
                sara.dd.ldsw.model.tbl_ld_ychk model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ychk>(json);
                model.f_ychkpc = Eva.Library.Text.NumberTool.GetNoRepeatNumber();
                model.f_zt = "新建";
                model.f_ztid = "0";
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ychk.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_ychk> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ychk>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ychk.AddList(modellist,null);

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
        public string Update(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_ychk model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ychk>(json);
                
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ychk.Update(model, columns, null);

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
        public void UpdateCross(string json, string columns, string clientInf)
        {
            string result1 = this.Update(json, columns, clientInf);
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
                 List<sara.dd.ldsw.model.tbl_ld_ychk> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ychk>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_ychk.UpdateList(modellist, columns,null);

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
                
                columnsString += "f_tsjgdr,";
                
                columnsString = columnsString.TrimEnd(',');
                List <sara.dd.ldsw.model.tbl_ld_ychk> l_tbl_ld_ychk = _idal_tbl_ld_ychk.GetList(whereString, "", columnsString, "", "", null);
                foreach (sara.dd.ldsw.model.tbl_ld_ychk model in l_tbl_ld_ychk)
                {
                    
                    fileIDs += model.f_tsjgdr + ",";
                                       
                }
                fileIDs = fileIDs.TrimEnd(',');
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);

                //删除子表的方法

                  //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ychk.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_ychk.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_ychk.GetCount(whereString,null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_ychk>(_idal_tbl_ld_ychk.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_ychk.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_ychk.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_ychk.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

        //导出
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string filename, string cbbhid, string clientInf)
        {
            
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            string sql = "";
            string khbhids = "";
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string userid = clientInfoDic["userid"];
                string username = clientInfoDic["username"];

                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                //已算费的远传抄表记录
                sara.dd.ldsw.idal.Itbl_ld_cbiao idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
                DataTable dt = new DataTable();

                dt = idal_tbl_ld_cbiao.GetDataTableForPC(" f_ztid='2' and f_cbbhid in (" + cbbhid + ")", "false", "", "*", "", "", t);


                if (dt.Rows.Count != 0)
                {
                    string expTxtString = "";
                    //查询出所有的模板08060003
                    string lxids = "";
                    if(cbbhid.IndexOf("4736")!=-1 || cbbhid.IndexOf("4761") != -1 || cbbhid.IndexOf("4738") != -1)
                    {
                        lxids += "08060001,";
                    }
                    if(cbbhid.IndexOf("4796") != -1)
                    {
                        lxids += "08060003,";
                    }
                    lxids = lxids.TrimEnd(',');
                    sql = "select * from tbl_ldbm_expdata where f_lxid in ("+lxids+") order by sys_id asc";
                    DataTable dtmb = t.Query(sql).Tables[0];
                    int exptextrowindex = 1;
                    int filecount = 1;
                    double sumsf = 0.0;
                    string path = Eva.Library.Configuration.ConfigurationManager.AppSettings["ExportYCHKRootPath"]+filename+"\\";
                    string zippath = Eva.Library.Format.FormatTextTool.GetMapPath(path, HttpContext.Current.Server);
                    string zipname = Eva.Library.Format.FormatTextTool.GetMapPath(Eva.Library.Configuration.ConfigurationManager.AppSettings["ExportYCHKRootPath"] + filename + ".zip", HttpContext.Current.Server);
                    if (System.IO.File.Exists(zipname) == true)
                    {
                        System.IO.File.Delete(zipname);
                    }
                    string name = "";
                    string downloadPath = "";

                    for (int i = 0; i < dtmb.Rows.Count; i++)
                    {

                        #region 生成导出内容

                        string v_nr = dtmb.Rows[i]["f_nr"].ToString();//获取f_nr的值
                        string[] v_nrarr = v_nr.Split('|');//按‘|’拆分
                        if(v_nrarr.Length > 1)
                        {
                        //生成nr的新值
                        string v_nr_new = "";
                        DataRow[] drs = dt.Select("f_khbh='"+ v_nrarr [1]+ "'");
                        double hjsf = 0.0;
                        for (int k = 0; k < drs.Length; k++)
                        {
                            
                            hjsf += Eva.Library.Text.NumberTool.Parse(drs[k]["f_bqje"].ToString());
                        }
                        if (drs.Length > 0 && hjsf>0)
                        {
                                khbhids += "'"+ drs[0]["f_khbh"] + "',";
                            sumsf += hjsf;
                            for (int j = 0; j < v_nrarr.Length; j++)
                            {

                                if (j == 0)
                                {
                                    v_nr_new += (exptextrowindex).ToString() + "|";
                                    exptextrowindex += 1;
                                }
                                else if (j == 2)
                                {
                                    DateTime today = DateTime.Today;
                                    v_nr_new +=  today.Year.ToString()+today.Month.ToString() + "|";
                                }
                                else if (j == 5)
                                {

                                    string sf = Eva.Library.Text.NumberTool.GetNumberByLength(hjsf, 2);
                                    if (sf.IndexOf(".") == -1)
                                    {
                                        sf += ".00";
                                    }

                                    v_nr_new += sf + "|";
                                }
                                else
                                {
                                    v_nr_new += v_nrarr[j] + "|";
                                }
                            }
                            //v_nr_new = v_nr_new.TrimEnd('|');
                            v_nr_new = v_nr_new.Substring(0, v_nr_new.Length - 1);

                            if (i == dtmb.Rows.Count - 1)
                            {
                                expTxtString += v_nr_new;
                            }
                            else
                            {
                                expTxtString += v_nr_new + "\r\n";
                            }

                            if(exptextrowindex > 5000)
                            {

                                    khbhids = khbhids.TrimEnd(',');
                                    //更新邮储划扣标志
                                    if (khbhids.Length > 0)
                                    {
                                        string updatesql = "update TBL_LD_KHB set F_VALUE5='1' where SYS_ID in (" + khbhids + ")";
                                        updatesql = Eva.Library.Format.FormatTextTool.FormatSqlStrWidthIn1000(updatesql);
                                        t.ExecuteSql(updatesql);
                                    }
                                    khbhids = "";
                                    //满5000导出文件
                                    string total = Eva.Library.Text.NumberTool.GetNumberByLength(sumsf, 2);
                                    if (total.IndexOf('.') == -1)
                                    {
                                    total = total + ".00";
                                }
                                expTxtString = (exptextrowindex - 1)+"|" + total + "|0|\r\n" + expTxtString;
                                name = filename +"_"+ filecount +".txt";
                                downloadPath = Eva.Library.Format.FormatTextTool.GetMapPath((path + name), HttpContext.Current.Server);
                                sara.dd.ldsw.commonclass.FileOperation.writeFile(downloadPath, expTxtString);
                                expTxtString = "";
                                sumsf = 0.0;
                                filecount++;
                                exptextrowindex = 1;

                            }
                        }
                        }

                        #endregion

                    }
                    //导出文件
                    string total2 = Eva.Library.Text.NumberTool.GetNumberByLength(sumsf, 2);
                    if (total2.IndexOf('.') == -1)
                    {
                        total2 = total2 + ".00";
                    }
                    expTxtString = (exptextrowindex-1)+"|" +total2 + "|0|\r\n" + expTxtString;
                    name = filename + "_" + filecount + ".txt";
                    downloadPath = Eva.Library.Format.FormatTextTool.GetMapPath((path + name), HttpContext.Current.Server);
                    sara.dd.ldsw.commonclass.FileOperation.writeFile(downloadPath, expTxtString);

                    bool result = sara.dd.ldsw.commonclass.zipclass.Zip(zippath, zipname);
                    System.IO.Directory.Delete(zippath, true);

                    khbhids = khbhids.TrimEnd(',');
                    //更新邮储划扣标志
                    if (khbhids.Length > 0)
                    {
                        string updatesql = "update TBL_LD_KHB set F_VALUE5='1' where SYS_ID in ("+ khbhids + ")";
                        updatesql = Eva.Library.Format.FormatTextTool.FormatSqlStrWidthIn1000(updatesql);
                        t.ExecuteSql(updatesql);
                    }

                    t.getTrans().commit();

                    //返回文件名
                    resultDic["result"] = "true";
                    resultDic["message"] = Eva.Library.Configuration.ConfigurationManager.AppSettings["ExportYCHKRootPath"] + filename + ".zip";
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "没有可导出的邮储划扣数据";
                }
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Import(string json, string columns, string clientInf,string cbbhid,string jflyid)
        {
            //首先保存数据
            //string result1 = this.Update(json, columns, clientInf);
            Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans t = null;
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                sara.dd.ldsw.model.tbl_ld_ychk model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ychk>(json);
                //创建导入进程0/100
                sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ychk" + model.sys_id + ".txt",  "0/100");

                //缴费dal
                sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
                //获取远传表的的所有用户
                string khquerysql = "SELECT * FROM tbl_ld_khb WHERE f_cbbhid in ("+ cbbhid + ") and f_ztid in ('0','4') and sys_delflag='0'";
                DataTable khdt = _iAccessData.Query(khquerysql).Tables[0];

                //获取远传表抄表数据
                string cbquerysql = "select * from tbl_ld_cbiao where f_khbhid in (select sys_id from tbl_ld_khb where f_cbbhid in ("+ cbbhid + ") and f_ztid in ('0','4') and sys_delflag='0') and f_ztid = '2'";
                DataTable cbdt = _iAccessData.Query(cbquerysql).Tables[0];

                //抄表modellist
                List<sara.dd.ldsw.model.tbl_ld_cbiao> cblist = new List<sara.dd.ldsw.model.tbl_ld_cbiao>();
                //客户modellist
                List<sara.dd.ldsw.model.tbl_ld_khb> khlist = new List<sara.dd.ldsw.model.tbl_ld_khb>();
                //缴费modellist
                List<sara.dd.ldsw.model.tbl_ld_jfb> jflist = new List<sara.dd.ldsw.model.tbl_ld_jfb>();
                //userinfo信息
                IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                //时间信息
                DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                dtFormat.ShortDatePattern = "yyyy/MM/dd";

                System.DateTime currentTime = new System.DateTime();
                currentTime = System.DateTime.Now;

                //DateTime blankTime = Convert.ToDateTime("1900/01/01", dtFormat);
                //sk

                DateTime blankTime = DateTime.Parse("1900-01-01");

                //获取附件根路径
                string FileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString() + "fileuploadpath/";
                FileUpLoadRootPath = Eva.Library.Format.FormatTextTool.GetMapPath(FileUpLoadRootPath, HttpContext.Current.Server);

                //获取附件名称
                
                string sqlString = "";

                sqlString = "SELECT fileuploadname FROM tbl_file_content WHERE menuid='" + model.f_tsjgdr + "'";
                DataTable dt = _iAccessData.Query(sqlString).Tables[0];

                //判断是否上传附件
                if (dt.Rows.Count > 0)
                {
                    //循环信息以及事务开启
                    t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                    t.getTrans().begin();
                    //循环次数以及循环最大值
                    int step = 500; //步长
                    int maxtime = dt.Rows.Count * 5000; //运行次数总和
                    int count = 0; //当前运行至                                                     

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        //循环解析.o文件
                        if (dt.Rows[i]["fileuploadname"] != null && dt.Rows[i]["fileuploadname"].ToString().Length > 0)
                        {
                            //解析.o
                            StreamReader sr = new StreamReader(FileUpLoadRootPath + dt.Rows[i]["fileuploadname"].ToString(), Encoding.GetEncoding("GB2312"));
                            string txt = sr.ReadToEnd().Replace("\n", "^");
                            string[] nodes = txt.Split('^');

                            foreach (string node in nodes)
                            {
                                count++;
                                string[] strs = node.Split('|');
                                if (strs.Length>11 && strs[1].ToString().Trim() == "00" && strs[10].ToString().Trim() != "0.00")
                                {

                                    //邮储划扣成功创建抄表记录

                                    //获取客户信息
                                    DataRow[] kharray = khdt.Select("f_khbh='" + strs[4].ToString().Trim() + "'");
                                    if (kharray.Length == 1)
                                    {
                                        DataRow khdr = kharray[0];
                                        //获取抄表编号及id

                                        DataRow[] cbdrs = cbdt.Select("f_khbh = '" + khdr["f_khbh"].ToString() + "' and f_cbbhid in ("+ cbbhid + ")");
                                        string sysids = "";
                                        string cbbhs = "";
                                        string sfjls = "";
                                        double sf = 0;
                                        double pwf = 0;
                                        double bqsl = 0;
                                        double bqje = 0;

                                        foreach(DataRow dr in cbdrs)
                                        {
                                            sysids += dr["sys_id"].ToString()+",";
                                            cbbhs += dr["f_cb_cbbh"].ToString() + ",";
                                            sfjls += dr["f_sfjl"].ToString() + "|";
                                            sf += Eva.Library.Text.NumberTool.Parse(dr["f_sf"].ToString());
                                            pwf += Eva.Library.Text.NumberTool.Parse(dr["f_pwf"].ToString());
                                            bqsl += Eva.Library.Text.NumberTool.Parse(dr["f_bqsl"].ToString());
                                            bqje += Eva.Library.Text.NumberTool.Parse(dr["f_bqje"].ToString());
                                        }
                                        sf = Eva.Library.Text.NumberTool.Parse(Eva.Library.Text.NumberTool.GetNumberByLength(sf, 2));
                                        pwf = Eva.Library.Text.NumberTool.Parse(Eva.Library.Text.NumberTool.GetNumberByLength(pwf, 2));
                                        bqsl = Eva.Library.Text.NumberTool.Parse(Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0));
                                        bqje = Eva.Library.Text.NumberTool.Parse(Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2));
                                        sysids = sysids.TrimEnd(',');
                                        cbbhs = cbbhs.TrimEnd(',');
                                        sfjls = sfjls.TrimEnd('|');

                                        if (cbdrs.Count() > 0 && Eva.Library.Text.NumberTool.Parse(strs[9].ToString().Trim()) == bqje)
                                        {

                                            sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                                            jfmodel.sys_id = int.Parse(idal_tbl_ld_jfb.GetMaxId(null));
                                            jfmodel.sys_creatuserid = userInfDic["userid"].ToString();
                                            jfmodel.sys_creatusername = userInfDic["username"].ToString();
                                            jfmodel.sys_creatdate = currentTime;
                                            jfmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                                            jfmodel.sys_lasteditusername = userInfDic["username"].ToString();
                                            jfmodel.sys_lasteditdate = currentTime;
                                            jfmodel.sys_deldate = blankTime;
                                            jfmodel.sys_delflag = "0";
                                            jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                                            jfmodel.f_jfrq = currentTime;
                                            jfmodel.f_jffs = "邮储划扣";
                                            jfmodel.f_jffsid = "05740009";
                                            jfmodel.f_jcfs = "全额找零";
                                            jfmodel.f_jcfsid = "05750001";
                                            jfmodel.f_yyy = userInfDic["username"].ToString();
                                            jfmodel.f_yyyid = userInfDic["userid"].ToString();
                                            jfmodel.f_czsj = currentTime;
                                            jfmodel.f_sfykfp = "false";
                                            jfmodel.f_zt = "已提交";
                                            jfmodel.f_ztid = "2";
                                            jfmodel.f_khbh = khdr["f_khbh"].ToString();
                                            jfmodel.f_khbhid = khdr["sys_id"].ToString();
                                            jfmodel.f_yhbh = khdr["f_yhbh"].ToString();
                                            jfmodel.f_yhbhid = khdr["f_yhbhid"].ToString();
                                            jfmodel.f_yhm = khdr["f_yhm"].ToString();
                                            jfmodel.f_jfm = khdr["f_jfm"].ToString();
                                            jfmodel.f_dh = khdr["f_dh"].ToString();
                                            jfmodel.f_dz = khdr["f_dz"].ToString();
                                            jfmodel.f_dy = khdr["f_dy"].ToString();
                                            jfmodel.f_dyid = khdr["f_dyid"].ToString();
                                            jfmodel.f_sc = khdr["f_sc"].ToString();
                                            jfmodel.f_scid = khdr["f_scid"].ToString();
                                            jfmodel.f_qy = khdr["f_qy"].ToString();
                                            jfmodel.f_qyid = khdr["f_qyid"].ToString();
                                            jfmodel.f_pq = khdr["f_pq"].ToString();
                                            jfmodel.f_pqid = khdr["f_pqid"].ToString();
                                            jfmodel.f_sbbh = khdr["f_sbbh"].ToString();
                                            jfmodel.f_sbbhid = khdr["f_sbbhid"].ToString();
                                            jfmodel.f_sblx = khdr["f_sblx"].ToString();
                                            jfmodel.f_sblxid = khdr["f_sblxid"].ToString();
                                            jfmodel.f_yslx = khdr["f_yslx"].ToString();
                                            jfmodel.f_yslxid = khdr["f_yslxid"].ToString();
                                            jfmodel.f_lxtkhh = khdr["f_lxth"].ToString();
                                            jfmodel.f_rs = khdr["f_rs"].ToString();
                                            jfmodel.f_cbbh = cbbhs;
                                            jfmodel.f_cbbhid = sysids;
                                            jfmodel.f_cbyslj = Eva.Library.Text.NumberTool.GetNumberByLength(bqje,2);
                                            jfmodel.f_sllj = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);
                                            jfmodel.f_sflj = Eva.Library.Text.NumberTool.GetNumberByLength(sf, 2);
                                            jfmodel.f_pwflj = Eva.Library.Text.NumberTool.GetNumberByLength(pwf, 2);
                                            jfmodel.f_dj = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj) / Eva.Library.Text.NumberTool.Parse(jfmodel.f_sllj), 2);
                                            jfmodel.f_jmhyslj = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                                            jfmodel.f_khytjjzsf = khdr["f_tjjzsf"].ToString();
                                            jfmodel.f_khytjjzpwf = khdr["f_tjjzpwf"].ToString();
                                            jfmodel.f_sfsytjjz = "false";
                                            jfmodel.f_sytjjzsf = "0";
                                            jfmodel.f_sytjjzpwf = "0";
                                            jfmodel.f_syhtjjzsf = khdr["f_tjjzsf"].ToString();
                                            jfmodel.f_syhtjjzpwf = khdr["f_tjjzpwf"].ToString();
                                            jfmodel.f_khyye = khdr["f_ycje"].ToString();
                                            jfmodel.f_sfsyye = "false";
                                            jfmodel.f_syye = "0";
                                            jfmodel.f_yhye = khdr["f_ycje"].ToString();
                                            jfmodel.f_shys = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                                            jfmodel.f_shss = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                                            jfmodel.f_hszl = "0";
                                            jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj)));
                                            jfmodel.f_khfz = khdr["f_khfz"].ToString();
                                            jfmodel.f_khfzid = khdr["f_khfzid"].ToString();
                                            jfmodel.f_cbenbh = khdr["f_cbbh"].ToString();
                                            jfmodel.f_cbenbhid = khdr["f_cbbhid"].ToString();
                                            jfmodel.f_ljqf = khdr["f_ljqf"].ToString();
                                            jfmodel.f_jmjelj = "0";
                                                jfmodel.f_ly = "邮储划扣";
                                                jfmodel.f_lyid = "08080001";


                                            jfmodel.f_sfjl = sfjls;

                                            jflist.Add(jfmodel);

                                            //更新抄表表
                                            DataTable cbtemp = this.ToDataTable(cbdrs);
                                            List<sara.dd.ldsw.model.tbl_ld_cbiao> cbmodellist = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cbtemp);

                                            foreach(sara.dd.ldsw.model.tbl_ld_cbiao cbmodel in cbmodellist)
                                            {
                                                cbmodel.f_zt = "已缴费";
                                                cbmodel.f_ztid = "3";
                                                cbmodel.f_jfbh = jfmodel.f_jfbh;
                                                cbmodel.f_jfbhid = jfmodel.sys_id.ToString();
                                                cbmodel.f_jfsj = jfmodel.f_jfrq;

                                                cblist.Add(cbmodel);
                                            }

                                            //更新客户表
                                            DataTable khtemp = this.ToDataTable(kharray);
                                            List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_khb>(khtemp);
                                            sara.dd.ldsw.model.tbl_ld_khb khmodel = khmodellist[0];
                                            khmodel.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(khmodel.f_ljqf) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj)), 2);
                                            khlist.Add(khmodel);


                                        }



                                    }
                                }

                                if (count % step == 0)
                                {
                                    //批量建立抄表记录并清空list
                                    Dictionary<string, object[]> result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_jfb>(jflist);
                                    t.BatchInsert("tbl_ld_jfb", result);

                                    jflist = new List<ldsw.model.tbl_ld_jfb>();

                                    //批量更新抄表表
                                    result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cblist);
                                    t.BatchUpdate("tbl_ld_cbiao", "sys_id", result);

                                    cblist = new List<ldsw.model.tbl_ld_cbiao>();

                                    //批量更新客户表
                                    result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                                    t.BatchUpdate("tbl_ld_khb", "sys_id", result);
                                    khlist = new List<ldsw.model.tbl_ld_khb>();

                                    t.getTrans().commit();
                                    t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                                    t.getTrans().begin();
                                    sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ychk" + model.sys_id + ".txt", count.ToString() + "/" + maxtime.ToString());
                                }

                            }

                        }
                    }
                    Dictionary<string, object[]> result2 = null;
                    if (jflist.Count > 0)
                    {
                        result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_jfb>(jflist);
                        t.BatchInsert("tbl_ld_jfb", result2);

                        jflist = new List<ldsw.model.tbl_ld_jfb>();
                    }
                    if(cblist.Count>0)
                    {
                        result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cblist);
                        t.BatchUpdate("tbl_ld_cbiao", "sys_id", result2);

                        cblist = new List<ldsw.model.tbl_ld_cbiao>();
                    }
                    if(khlist.Count>0)
                    {
                        result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                        t.BatchUpdate("tbl_ld_khb", "sys_id", result2);
                        khlist = new List<ldsw.model.tbl_ld_khb>();
                    }

                    string updatesql = "update TBL_LD_KHB set F_VALUE5='' where F_VALUE5='1'";
                    t.ExecuteSql(updatesql);

                    sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ychk" + model.sys_id + ".txt", maxtime.ToString() + "/" + maxtime.ToString());
                    t.getTrans().commit();


                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "未上传文件";
                }
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Read(string sys_id)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";


            try
            {
                string s = sara.dd.ldsw.commonclass.FileOperation.ReadFile(Eva.Library.Global.AppRootPath + "ychk" + sys_id + ".txt");

                if (s == null)
                {
                    s = "";
                }
                resultDic["result"] = "true";
                resultDic["message"] = s;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        public DataTable ToDataTable(DataRow[] rows)
        {
            if (rows == null || rows.Length == 0) return null;
            DataTable tmp = rows[0].Table.Clone();  // 复制DataRow的表结构  
            foreach (DataRow row in rows)
                tmp.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  
            return tmp;
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
                		
				columns += "^" + "f_ychkpc";
                		
				columns += "^" + "f_cbxz";
                		
				columns += "^" + "f_cbxzid";

                columns += "^" + "f_jfly";

                columns += "^" + "f_jflyid";

                columns += "^" + "f_dcr";
                		
				columns += "^" + "f_dcsj";
                		
				columns += "^" + "f_drr";
                		
				columns += "^" + "f_drsj";
                		
				columns += "^" + "f_tsjgdr";
                		
				columns += "^" + "f_zt";
                		
				columns += "^" + "f_ztid";
                		
				columns += "^" + "f_dcrid";
                		
				columns += "^" + "f_drrid";
                		
				columns += "^" + "f_bz";
                
               
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

    }
}









