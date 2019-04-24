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
using System.Web.Script.Services;
using System.Data;
using System.Globalization;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_qfts 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_qfts : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_qfts _idal_tbl_ld_qfts = new sara.dd.ldsw.dal.tbl_ld_qfts();
        private sara.dd.ldsw.idal.Itbl_ld_qftsyl _idal_tbl_ld_qftsyl = new sara.dd.ldsw.dal.tbl_ld_qftsyl();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.idal.Itbl_ld_sbb _idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private sara.dd.ldsw.idal.Itbl_ld_yhb _idal_tbl_ld_yhb = new sara.dd.ldsw.dal.tbl_ld_yhb();
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
                sara.dd.ldsw.model.tbl_ld_qfts model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_qfts>(json);
                if (model.f_drbh == "")
                {
                    model.f_drbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("lh", "", null);
                }
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_qfts.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_qfts> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_qfts>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_qfts.AddList(modellist,null);

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
                sara.dd.ldsw.model.tbl_ld_qfts model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_qfts>(json);
                
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_qfts.Update(model, columns, null);

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
                 List<sara.dd.ldsw.model.tbl_ld_qfts> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_qfts>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_qfts.UpdateList(modellist, columns,null);

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
                
                columnsString += "f_drwj,";
                
                columnsString += "f_bcfj,";
                
                columnsString = columnsString.TrimEnd(',');
                List <sara.dd.ldsw.model.tbl_ld_qfts> l_tbl_ld_qfts = _idal_tbl_ld_qfts.GetList(whereString, "", columnsString, "", "", null);
                foreach (sara.dd.ldsw.model.tbl_ld_qfts model in l_tbl_ld_qfts)
                {
                    
                    fileIDs += model.f_drwj + ",";
                    
                    fileIDs += model.f_bcfj + ",";
                                       
                }
                fileIDs = fileIDs.TrimEnd(',');
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);

                //删除子表的方法
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";              
                 
                 sqlString = "delete from tbl_ld_qftsyl where fk_tbl_ld_qfts_sys_id in (select sys_id from tbl_ld_qfts where " + whereString + ")";
                 _iAccessData.ExecuteSql(sqlString);
                 

                  //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_qfts.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_qfts.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_qfts.GetCount(whereString,null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_qfts>(_idal_tbl_ld_qfts.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_qfts.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_qfts.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_qfts.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Analysis(string json, string columns, string clientInf)
        {
            //首先保存数据
            string result1 = this.Update(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_qfts model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_qfts>(json);
                //获取附件根路径
                string FileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString() + "fileuploadpath/";
                FileUpLoadRootPath = Eva.Library.Format.FormatTextTool.GetMapPath(FileUpLoadRootPath, HttpContext.Current.Server);

                //获取附件名称
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";

                sqlString = "SELECT fileuploadname FROM tbl_file_content WHERE menuid='" + model.f_drwj + "'";
                DataTable dt = _iAccessData.Query(sqlString).Tables[0];

                //判断是否上传附件
                if (dt.Rows.Count > 0 && dt.Rows[0]["fileuploadname"] != null && dt.Rows[0]["fileuploadname"].ToString().Length > 0)
                {
                    DataTable importfile = commonclass.commonclass.ReadExcel(FileUpLoadRootPath + dt.Rows[0]["fileuploadname"].ToString()).Tables[0];

                    //判断是否为正确的导入模板
                    if (importfile.Columns[0].ColumnName == "停水客户编号")
                    {
                        string khbhids = "";
                        for(int j = 0; j < importfile.Rows.Count; j++)
                        {
                            if(importfile.Rows[j][0].ToString() != null && importfile.Rows[j][0].ToString() != "")
                            {
                                string khbhid = "";
                                khbhid = importfile.Rows[j][0].ToString().PadLeft(10, '0');
                                khbhids += khbhid + ",";
                            }
                            
                        }
                        khbhids = khbhids.TrimEnd(',');
                        if(khbhids == "")
                        {
                            resultDic["result"] = "false";
                            resultDic["message"] = "模板内没有数据！";
                        }
                        else
                        {
                            List<sara.dd.ldsw.model.tbl_ld_khb> khbmodellist = _idal_tbl_ld_khb.GetList("f_khbh in (" + khbhids + ")", "", "sys_id,f_khbh,f_yhm,f_khfz,f_yslx,f_zt,f_sbbh,f_dh,f_dz,f_ztid", "", "", null);
                            List<sara.dd.ldsw.model.tbl_ld_qftsyl> qftsylmodellist = new List<sara.dd.ldsw.model.tbl_ld_qftsyl>();
                            IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                            DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                            dtFormat.ShortDatePattern = "yyyy/MM/dd";



                            System.DateTime currentTime = new System.DateTime();
                            currentTime = System.DateTime.Now;
                            DateTime blankTime = Convert.ToDateTime("1900/01/01", dtFormat);

                            foreach (sara.dd.ldsw.model.tbl_ld_khb khmodel in khbmodellist)
                            {
                                if(khmodel.f_ztid == "0")
                                {
                                    //创建子表实例化对象
                                    sara.dd.ldsw.model.tbl_ld_qftsyl tempmodel = new sara.dd.ldsw.model.tbl_ld_qftsyl();

                                    tempmodel.fk_tbl_ld_qfts_sys_id = model.sys_id.ToString();
                                    tempmodel.sys_creatuserid = userInfDic["userid"].ToString();
                                    tempmodel.sys_creatusername = userInfDic["username"].ToString();
                                    tempmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                                    tempmodel.sys_lasteditusername = userInfDic["username"].ToString();
                                    tempmodel.sys_creatdate = currentTime;
                                    tempmodel.sys_lasteditdate = currentTime;
                                    tempmodel.sys_deldate = blankTime;
                                    tempmodel.sys_delflag = "0";
                                    tempmodel.f_khbh = khmodel.f_khbh;
                                    tempmodel.f_yhm = khmodel.f_yhm;
                                    tempmodel.f_khfz = khmodel.f_khfz;
                                    tempmodel.f_yslx = khmodel.f_yslx;
                                    tempmodel.f_khzt = khmodel.f_zt;
                                    tempmodel.f_sbbh = khmodel.f_sbbh;
                                    tempmodel.f_dh = khmodel.f_dh;
                                    tempmodel.f_dz = khmodel.f_dz;
                                    qftsylmodellist.Add(tempmodel);
                                }

                            }

                            _idal_tbl_ld_qftsyl.AddList(qftsylmodellist, null);

                            resultDic["result"] = "true";
                            resultDic["message"] = result1;

                        }

                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "导入模板错误，请下载正确的导入模板进行导入！";
                    }

                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "请先上传导入文件再进行分析！";
                }

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
        public string Import(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_qfts model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_qfts>(json);

                //判断待导入数据是否存在异常
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";

                sqlString = "SELECT count(*) AS count FROM tbl_ld_qftsyl WHERE fk_tbl_ld_qfts_sys_id ='" + model.sys_id + "' AND sys_delflag='0'";
                int count = int.Parse(_iAccessData.Query(sqlString).Tables[0].Rows[0]["count"].ToString());
                if (count <= 0)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "导入未进行，不存在待导入数据，请修正后再导入。";

                }
                else
                {
                    //userinfo信息
                    IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                    //时间信息
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                    dtFormat.ShortDatePattern = "yyyy/MM/dd";

                    System.DateTime currentTime = new System.DateTime();
                    currentTime = System.DateTime.Now;

                    DateTime blankTime = Convert.ToDateTime("1900/01/01", dtFormat);
                    //获取待导入数据
                    List<sara.dd.ldsw.model.tbl_ld_qftsyl> qftsylmodellist = _idal_tbl_ld_qftsyl.GetList("fk_tbl_ld_qfts_sys_id ='" + model.sys_id + "' AND sys_delflag='0'", "", "*", "", "", null);
                    List<sara.dd.ldsw.model.tbl_ld_khb> khbmodellist = new List<ldsw.model.tbl_ld_khb>();
                    List<sara.dd.ldsw.model.tbl_ld_sbb> sbbmodellist = new List<ldsw.model.tbl_ld_sbb>();
                    List<sara.dd.ldsw.model.tbl_ld_yhb> yhbmodellist = new List<ldsw.model.tbl_ld_yhb>();
                    //获取客户编号
                    string khbhs = "";
                    foreach(model.tbl_ld_qftsyl qftsylmodel in qftsylmodellist)
                    {
                        khbhs += "'"+qftsylmodel.f_khbh+"',";
                        qftsylmodel.f_khzt = "停水";
                    }
                    khbhs = khbhs.TrimEnd(',');
                    //获取客户与水表对象集合
                    khbmodellist = _idal_tbl_ld_khb.GetList("f_khbh in (" + khbhs + ") and (f_ztid='0' or f_ztid='4')", "", "*", "", "", null);
                    sbbmodellist = _idal_tbl_ld_sbb.GetList("f_khbh in (" + khbhs + ") and (f_ztid='0' or f_ztid='4')", "", "*", "", "", null);
                    yhbmodellist = _idal_tbl_ld_yhb.GetList("f_khbh in (" + khbhs + ") and (f_ztid='0' or f_ztid='4')", "", "*", "", "", null);
                    //修改客户状态
                    foreach (model.tbl_ld_khb khbmodel in khbmodellist)
                    {
                        khbmodel.f_zt = "停水";
                        khbmodel.f_ztid = "2";
                    }
                    foreach(model.tbl_ld_sbb sbbmodel in sbbmodellist)
                    {
                        sbbmodel.f_zt = "停水";
                        sbbmodel.f_ztid = "2";
                    }
                    foreach (model.tbl_ld_yhb yhbmodel in yhbmodellist)
                    {
                        yhbmodel.f_zt = "停水";
                        yhbmodel.f_ztid = "2";
                    }
                    //更新数据库
                    _idal_tbl_ld_khb.UpdateList(khbmodellist, "f_zt,f_ztid", null);
                    _idal_tbl_ld_sbb.UpdateList(sbbmodellist, "f_zt,f_ztid", null);
                    _idal_tbl_ld_yhb.UpdateList(yhbmodellist, "f_zt,f_ztid", null);
                    //更新子表
                    _idal_tbl_ld_qftsyl.UpdateList(qftsylmodellist, "f_khzt", null);

                    model.f_zt = "已导入";
                    model.f_ztid = "2";

                    columns = FormatColumns(columns).Replace("^", ",");
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_qfts.Update(model, columns, null);

                    NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);


                }

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

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
                		
				columns += "^" + "f_drbh";
                		
				columns += "^" + "f_drr";
                		
				columns += "^" + "f_fxsj";
                		
				columns += "^" + "f_drsj";
                		
				columns += "^" + "f_drwj";
                		
				columns += "^" + "f_bcfj";
                		
				columns += "^" + "f_zt";
                		
				columns += "^" + "f_ztid";
                		
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









