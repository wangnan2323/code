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
using System.Globalization;
using Eva.Library.Data;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_ycbgl 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_ycbgl : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_ycbgl _idal_tbl_ld_ycbgl = new sara.dd.ldsw.dal.tbl_ld_ycbgl();
        private sara.dd.ldsw.idal.Itbl_ld_ycbglzb _idal_tbl_ld_ycbglzb = new sara.dd.ldsw.dal.tbl_ld_ycbglzb();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.idal.Itbl_ld_cbiao _idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
        private sara.dd.ldsw.idal.Itbl_ld_sbb _idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private sara.dd.ldsw.reportclass.tbl_ld_ycbdc report_ycbdc = new sara.dd.ldsw.reportclass.tbl_ld_ycbdc();


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);
                if (model.f_ywbh == "")
                {
                    model.f_ywbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("ycbgl", "", null);
                }
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ycbgl.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_ycbgl> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ycbgl.AddList(modellist, null);

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
                sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);

                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ycbgl.Update(model, columns, null);

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
                List<sara.dd.ldsw.model.tbl_ld_ycbgl> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ycbgl.UpdateList(modellist, columns, null);

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
                List<sara.dd.ldsw.model.tbl_ld_ycbgl> l_tbl_ld_ycbgl = _idal_tbl_ld_ycbgl.GetList(whereString, "", columnsString, "", "", null);
                foreach (sara.dd.ldsw.model.tbl_ld_ycbgl model in l_tbl_ld_ycbgl)
                {

                    fileIDs += model.f_drwj + ",";

                    fileIDs += model.f_bcfj + ",";

                }
                fileIDs = fileIDs.TrimEnd(',');
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);

                //删除子表的方法
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";

                sqlString = "delete from tbl_ld_ycbglzb where fk_tbl_ld_ycbgl_sys_id in (select sys_id from tbl_ld_ycbgl where " + whereString + ")";
                _iAccessData.ExecuteSql(sqlString);


                //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ycbgl.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_ycbgl.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
                resultDic["message"] = _idal_tbl_ld_ycbgl.GetCount(whereString, null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_ycbgl>(_idal_tbl_ld_ycbgl.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_ycbgl.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_ycbgl.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_ycbgl.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        public string Export(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                string result1 = this.Update(json, columns, clientInf);
                sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);

                ////获取远传表用于对象list
                //List<sara.dd.ldsw.model.tbl_ld_khb> khbmodellist = _idal_tbl_ld_khb.GetList(" f_cbbhid in ('4695','4670') and f_yhm='张春鹏'", " sys_id desc","f_khbh,f_yhm,f_sbbh,f_dz,f_dh,f_zhcbrq,f_bqzm","","",null);
                ////远传表子表对象list
                //List<sara.dd.ldsw.model.tbl_ld_ycbglzb> ycbglzbmodellist = new List<sara.dd.ldsw.model.tbl_ld_ycbglzb>();

                //userinfo信息
                IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                //insert into sql
                string insertsql = "insert into tbl_ld_ycbglzb";
                insertsql += "  (sys_id, sys_orderid, sys_creatuserid, sys_creatusername, sys_creatdate, sys_lastedituserid, sys_lasteditusername, sys_lasteditdate, sys_deluserid, sys_delusername, sys_deldate, sys_delflag,";
                insertsql += "  f_value1, f_value2, f_value3, f_value4, f_value5, f_value6, f_value7, f_value8, f_value9, f_value10,             ";
                insertsql += "  fk_tbl_ld_ycbgl_sys_id,                                                                                          ";
                insertsql += "  f_khbh, f_yhm, f_sbbh, f_dz, f_dh, f_sqzm, f_zhcbrq, f_bqzm, f_cbsj)                                             ";
                insertsql += "                                                                                                                   ";
                insertsql += "(select                                                                                                            ";
                insertsql += "SEQ_TBL_LD_YCBGLZB.Nextval as sys_id, '' as sys_orderid,                                                           ";
                insertsql += "'" + userInfDic["userid"].ToString() + "' as sys_creatuserid, '" + userInfDic["username"].ToString() + "' as sys_creatusername, sysdate as sys_creatdate,                                      ";
                insertsql += "'" + userInfDic["userid"].ToString() + "' as sys_lastedituserid, '" + userInfDic["username"].ToString() + "' as sys_lasteditusername, sysdate as sys_lasteditdate,                             ";
                insertsql += "'' as sys_deluserid, '' as sys_delusername, to_date('1900-01-01', 'yyyy-MM-dd') as sys_deldate, '0' as sys_delflag,";
                insertsql += "TO_CHAR((select max(f_cbsj) from tbl_ld_cbiao where f_khbh=kh.f_khbh),'yyyy-mm-dd hh24:mi:ss') as f_value1, '', '', '', '', '', '', '', '', '',                                                                            ";
                insertsql += "'" + model.sys_id.ToString() + "',                                                                                                              ";
                insertsql += "kh.f_khbh, kh.f_yhm, kh.f_lxth, kh.f_dz, kh.f_dh, kh.f_bqzm, kh.f_zhcbrq, '', to_date('1900-01-01', 'yyyy-MM-dd')";
                insertsql += "from tbl_ld_khb kh where f_cbbhid in ('4736'))";
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                _iAccessData.ExecuteSql(insertsql);

                ////时间信息
                //DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                //dtFormat.ShortDatePattern = "yyyy/MM/dd";

                //System.DateTime currentTime = new System.DateTime();
                //currentTime = System.DateTime.Now;

                //DateTime blankTime = Convert.ToDateTime("1900/01/01", dtFormat);
                ////循环创建子表对象
                //foreach (sara.dd.ldsw.model.tbl_ld_khb khbmodel in khbmodellist)
                //{
                //    sara.dd.ldsw.model.tbl_ld_ycbglzb ycbglzbmodel = new sara.dd.ldsw.model.tbl_ld_ycbglzb();


                //    ycbglzbmodel.sys_creatuserid = userInfDic["userid"].ToString();
                //    ycbglzbmodel.sys_creatusername = userInfDic["username"].ToString();
                //    ycbglzbmodel.sys_creatdate = currentTime;
                //    ycbglzbmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                //    ycbglzbmodel.sys_lasteditusername = userInfDic["username"].ToString();
                //    ycbglzbmodel.sys_lasteditdate = currentTime;
                //    ycbglzbmodel.sys_deldate = blankTime;
                //    ycbglzbmodel.sys_delflag = "0";

                //    ycbglzbmodel.fk_tbl_ld_ycbgl_sys_id = model.sys_id.ToString();
                //    ycbglzbmodel.f_khbh = khbmodel.f_khbh;
                //    ycbglzbmodel.f_yhm = khbmodel.f_yhm;
                //    ycbglzbmodel.f_sbbh = khbmodel.f_sbbh;
                //    ycbglzbmodel.f_dz = khbmodel.f_dz;
                //    ycbglzbmodel.f_dh = khbmodel.f_dh;
                //    ycbglzbmodel.f_sqzm = khbmodel.f_bqzm;
                //    ycbglzbmodel.f_zhcbrq = khbmodel.f_zhcbrq;
                //    ycbglzbmodel.f_cbsj = blankTime;

                //    ycbglzbmodellist.Add(ycbglzbmodel);
                //}

                ////插入子表对象
                //_idal_tbl_ld_ycbglzb.AddList(ycbglzbmodellist, null);

                //输出导出文件
                DataTable dt = _idal_tbl_ld_ycbglzb.GetDataTableForPC(" fk_tbl_ld_ycbgl_sys_id='" + model.sys_id + "'", " sys_id asc", "f_khbh,f_yhm,f_dz,f_dh,f_sqzm,f_value1,f_sbbh,'' as a,'' as b", "", "", null);
                string file = report_ycbdc.ReportExcel(dt, "f_khbh,f_yhm,f_dz,f_dh,f_sqzm,f_sbbh,a,b", "客户编号,用户名,地址,电话,上期止码,上期抄表时间,水表编号,本期止码,本期抄表时间");
                //127.0.0.1/sara.dd.ldsw.file/files/fileuploadpath/远传表导出201811291104226881.csv
                string filename = file.Substring(file.LastIndexOf('/') + 1);
                string suffix = "." + filename.Split('.')[1];
                //保存附件
                string filesql = "INSERT INTO tbl_file_content VALUES (tbl_file_content_sequence.nextval,'" + model.f_bcfj + "','" + filename + "','" + filename + "','0','" + suffix + "',to_date('" + model.f_dcsj + "','yyyy-mm-dd hh24:mi:ss'),to_date('1900-01-01','yyyy-mm-dd'),'0')";
                _iAccessData.ExecuteSql(filesql);
                resultDic["result"] = "true";
                resultDic["message"] = file;

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
            //首先保存数据
            string result1 = this.Update(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                    sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);
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
                        if (importfile.Columns[0].ColumnName == "客户编号" && importfile.Columns[1].ColumnName == "用户名")
                        {

                            DataRow[] drs = importfile.Select("本期止码 is not null and 抄表时间 is not null and 本期止码 >= 上期止码");


                            foreach (DataRow dr in drs)
                            {
                                string sql = "UPDATE tbl_ld_ycbglzb SET f_bqzm='" + dr[6] + "',f_cbsj=to_date('" + dr[7] + "','yyyy/MM/dd hh24:mi:ss') WHERE f_khbh='" + dr[0].ToString().Replace("\t", "") + "'";
                                _iAccessData.ExecuteSql(sql);

                            }


                            resultDic["result"] = "true";
                            resultDic["message"] = result1;

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
        public string Create(string json, string columns, string clientInf, string countstr)
        {
            //首先保存数据
            string result1 = this.Update(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans t = null;
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);
                //创建导入进程0/100
                sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycb" + model.sys_id + ".txt", "0/100");
                //获取远传表的的所有用户
                string khquerysql = "SELECT * FROM tbl_ld_khb WHERE f_cbbhid = '4736' and f_ztid in ('0','4') and sys_delflag='0'";
                DataTable khdt = _iAccessData.Query(khquerysql).Tables[0];
                //获取远传表用户的所有水表
                string sbquerysql = "SELECT * FROM tbl_ld_sbb WHERE sys_id in (select f_sbbhid from tbl_ld_khb where f_cbbhid = '4736' and f_ztid in ('0','4') and sys_delflag='0') and f_ztid in ('0','4') and sys_delflag='0'";
                DataTable sbdt = _iAccessData.Query(sbquerysql).Tables[0];
                //获取所有子表信息
                string zbquerysql = "SELECT * FROM tbl_ld_ycbglzb WHERE FK_TBL_LD_YCBGL_SYS_ID='" + model.sys_id + "'";
                DataTable zbdt = _iAccessData.Query(zbquerysql).Tables[0];
                //获取所有阶梯水价
                string jtsjquerysql = "SELECT * FROM tbl_ldbm_jtsj";
                DataTable jtsjdt = _iAccessData.Query(jtsjquerysql).Tables[0];
                //时间信息
                DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                DateTimeFormatInfo dtFormat2 = new DateTimeFormatInfo();
                dtFormat.ShortDatePattern = "yyyy/MM/dd";
                dtFormat2.ShortDatePattern = "yyyy/MM/dd HH:mm:ss";
                System.DateTime currentTime = new System.DateTime();
                currentTime = System.DateTime.Now;


                DateTime blankTime = DateTime.Parse("1900-01-01");
                //userinfo信息
                IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                //获取附件根路径
                string FileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString() + "fileuploadpath/";
                FileUpLoadRootPath = Eva.Library.Format.FormatTextTool.GetMapPath(FileUpLoadRootPath, HttpContext.Current.Server);

                //获取附件名称

                string sqlString = "";

                sqlString = "SELECT fileuploadname FROM tbl_file_content WHERE menuid='" + model.f_drwj + "'";
                DataTable dt = _iAccessData.Query(sqlString).Tables[0];

                if (true)
                {
                    //测试代码
                    resultDic["result"] = "false";
                    resultDic["message"] = "EXCEL数据格式错误、或版本错误、或数据来源异常！";
                }
                else
                {
                    //判断是否上传附件
                    if (dt.Rows.Count > 0 && dt.Rows[0]["fileuploadname"] != null && dt.Rows[0]["fileuploadname"].ToString().Length > 0)
                    {
                        DataTable importfile = commonclass.commonclass.ReadExcel(FileUpLoadRootPath + dt.Rows[0]["fileuploadname"].ToString()).Tables[0];

                        //判断是否为正确的导入模板
                        if (importfile.Columns[0].ColumnName == "客户编号" && importfile.Columns[1].ColumnName == "用户名")
                        {
                            //筛选excel
                            DataRow[] drs = importfile.Select("本期止码 is not null and 本期抄表时间 is not null");
                            //循环信息以及事务开启
                            t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                            t.getTrans().begin();
                            //循环次数以及循环最大值
                            int step = 500; //步长
                            int maxtime = (drs.Count() / step) + 1; //运行次数总和
                            int count = int.Parse(countstr); //当前运行至
                                                             //远传表子表modellist
                            List<sara.dd.ldsw.model.tbl_ld_ycbglzb> ycbglzblist = new List<sara.dd.ldsw.model.tbl_ld_ycbglzb>();
                            //抄表modellist
                            List<sara.dd.ldsw.model.tbl_ld_cbiao> cblist = new List<sara.dd.ldsw.model.tbl_ld_cbiao>();
                            //客户modellist
                            List<sara.dd.ldsw.model.tbl_ld_khb> khlist = new List<sara.dd.ldsw.model.tbl_ld_khb>();
                            //水表modellist
                            List<sara.dd.ldsw.model.tbl_ld_sbb> sblist = new List<sara.dd.ldsw.model.tbl_ld_sbb>();

                            //日志开关
                            bool logflag = false;
                            for (int i = count * step; i < drs.Count(); i++)
                            {
                                DataRow drzb = drs[i];
                                if (Eva.Library.Text.NumberTool.Parse(drzb[7].ToString()) > Eva.Library.Text.NumberTool.Parse(drzb[4].ToString()))
                                {
                                    DataRow[] kharray = khdt.Select("f_khbh='" + drzb[0].ToString().Replace("\t", "").PadLeft(10, '0') + "'");
                                    DataTable khtemp = this.ToDataTable(kharray);
                                    if (kharray.Length == 1)
                                    {

                                        DataRow khdr = kharray[0];
                                        if (Eva.Library.Text.NumberTool.Parse(drzb[4].ToString().Replace("\t", "")) == Eva.Library.Text.NumberTool.Parse(khdr["f_bqzm"].ToString()))
                                        {
                                            //保存客户编号用于

                                            DataRow[] zbdr = zbdt.Select("f_khbh='" + drzb[0].ToString().Replace("\t", "").PadLeft(10, '0') + "'");
                                            DataTable zbtemp = this.ToDataTable(zbdr);
                                            List<sara.dd.ldsw.model.tbl_ld_ycbglzb> zbml = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_ycbglzb>(zbtemp);
                                            //更新远传表子表
                                            if (zbml.Count > 0)
                                            {
                                                zbml[0].f_bqzm = drzb[7].ToString().Replace("\t", "");
                                                zbml[0].f_cbsj = Convert.ToDateTime(drzb[8].ToString().Replace("\t", ""), dtFormat2);
                                                ycbglzblist.Add(zbml[0]);
                                            }



                                            sara.dd.ldsw.model.tbl_ld_cbiao cbmodel = new model.tbl_ld_cbiao();

                                            double bqsl = Eva.Library.Text.NumberTool.Parse(drzb[7].ToString().Replace("\t", "")) - Eva.Library.Text.NumberTool.Parse(drzb[4].ToString().Replace("\t", ""));

                                            #region 计算水费
                                            string sql = "select f_waterrent('" + khdr["sys_id"].ToString() + "'," + bqsl + ",'2') as sf from dual";
                                            DataRow dr = _iAccessData.Query(sql).Tables[0].Rows[0];
                                            string[] sfjlarr = dr["sf"].ToString().Split('|');
                                            //预算费记录
                                            cbmodel.f_sfjl = "";

                                            for (int ii = 1; ii < sfjlarr.Length; ii++)
                                            {
                                                cbmodel.f_sfjl += sfjlarr[ii] + "|";
                                            }

                                            cbmodel.f_sfjl = cbmodel.f_sfjl.TrimEnd('|');

                                            string sfstr = dr["sf"].ToString().Split('|')[0];
                                            string sf = sfstr.Split('^')[0];
                                            cbmodel.f_sf = sf;
                                            string pwf = sfstr.Split('^')[1];
                                            cbmodel.f_pwf = pwf;
                                            double bqje = Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf);
                                            cbmodel.f_bqje = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);


                                            #endregion

                                            #region 阶梯水价分析
                                            cbmodel.f_dyjtsl = "0";
                                            cbmodel.f_dyjtsf = "0";
                                            cbmodel.f_dejtsl = "0";
                                            cbmodel.f_dejtsf = "0";
                                            cbmodel.f_dsjtsl = "0";
                                            cbmodel.f_dsjtsf = "0";

                                            string[] jtarr = cbmodel.f_sfjl.Split('|');

                                            for (int ii = 0; ii < jtarr.Length; ii++)
                                            {

                                                if (jtarr[ii].StartsWith("3.95^.95") || jtarr[ii].StartsWith("3.95^0.95"))
                                                {
                                                    //属于第一阶梯
                                                    cbmodel.f_dyjtsl = jtarr[ii].Split('^')[2];
                                                    cbmodel.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(4.9 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dyjtsl), 2);
                                                }
                                                else if (jtarr[ii].StartsWith("5.25^.95") || jtarr[ii].StartsWith("5.25^0.95"))
                                                {
                                                    //属于第二阶梯
                                                    cbmodel.f_dejtsl = jtarr[ii].Split('^')[2];
                                                    cbmodel.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength(6.2 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dejtsl), 2);

                                                }
                                                else if (jtarr[ii].StartsWith("7.05^.95") || jtarr[ii].StartsWith("7.05^0.95"))
                                                {
                                                    //属于第三阶梯
                                                    cbmodel.f_dsjtsl = jtarr[ii].Split('^')[2];
                                                    cbmodel.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(8 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dsjtsl), 2);

                                                }
                                            }
                                            #endregion

                                            #region 将客户基础信息放入抄表model
                                            cbmodel.sys_id = int.Parse(_idal_tbl_ld_cbiao.GetMaxId(null));
                                            cbmodel.sys_creatuserid = userInfDic["userid"].ToString();
                                            cbmodel.sys_creatusername = userInfDic["username"].ToString();
                                            cbmodel.sys_creatdate = currentTime;
                                            cbmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                                            cbmodel.sys_lasteditusername = userInfDic["username"].ToString();
                                            cbmodel.sys_lasteditdate = currentTime;
                                            cbmodel.sys_deldate = blankTime;
                                            cbmodel.sys_delflag = "0";
                                            cbmodel.f_cb_cbbh = commonclass.commonclass.getBusinessNum("CB", "", null);
                                            cbmodel.f_khbh = khdr["f_khbh"].ToString();
                                            cbmodel.f_khbhid = khdr["sys_id"].ToString();
                                            cbmodel.f_sqzm = drzb[4].ToString().Replace("\t", "");
                                            cbmodel.f_bqzm = drzb[7].ToString().Replace("\t", "");
                                            cbmodel.f_bqsl = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);
                                            cbmodel.f_sqsl = khdr["f_bqsl"].ToString();
                                            cbmodel.f_cbyid = userInfDic["userid"].ToString();
                                            cbmodel.f_cbyname = userInfDic["username"].ToString();
                                            cbmodel.f_cbsj = currentTime;
                                            cbmodel.f_bk = "正常";
                                            cbmodel.f_bkid = "05430001";
                                            cbmodel.f_zt = "已算费";
                                            cbmodel.f_ztid = "2";
                                            cbmodel.f_ly = "远传表自动计算";
                                            cbmodel.f_lyid = "05450004";
                                            cbmodel.f_sbbh = khdr["f_sbbh"].ToString();
                                            cbmodel.f_sbbhid = khdr["f_sbbhid"].ToString();
                                            cbmodel.f_sblx = khdr["f_sblx"].ToString();
                                            cbmodel.f_sblxid = khdr["f_sblxid"].ToString();
                                            cbmodel.f_yslx = khdr["f_yslx"].ToString();
                                            cbmodel.f_yslxid = khdr["f_yslxid"].ToString();
                                            cbmodel.f_lxtkhh = khdr["f_lxth"].ToString();
                                            cbmodel.f_cbbh = khdr["f_cbbh"].ToString();
                                            cbmodel.f_cbbhid = khdr["f_cbbhid"].ToString();
                                            cbmodel.f_cbmc = khdr["f_cbmc"].ToString();
                                            cbmodel.f_yhbh = khdr["f_yhbh"].ToString();
                                            cbmodel.f_yhbhid = khdr["f_yhbhid"].ToString();
                                            cbmodel.f_yhm = khdr["f_yhm"].ToString();
                                            cbmodel.f_jfm = khdr["f_jfm"].ToString();
                                            cbmodel.f_dh = khdr["f_dh"].ToString();
                                            cbmodel.f_dz = khdr["f_dz"].ToString();
                                            cbmodel.f_dy = khdr["f_dy"].ToString();
                                            cbmodel.f_dyid = khdr["f_dyid"].ToString();
                                            cbmodel.f_sc = khdr["f_sc"].ToString();
                                            cbmodel.f_scid = khdr["f_scid"].ToString();
                                            cbmodel.f_qy = khdr["f_qy"].ToString();
                                            cbmodel.f_qyid = khdr["f_qyid"].ToString();
                                            cbmodel.f_pq = khdr["f_pq"].ToString();
                                            cbmodel.f_pqid = khdr["f_pqid"].ToString();
                                            cbmodel.f_kj = khdr["f_sbkj"].ToString();
                                            cbmodel.f_kjid = khdr["f_sbkjid"].ToString();
                                            cbmodel.f_ztkhh = khdr["f_ztkhh"].ToString();
                                            cbmodel.f_ztsbh = khdr["f_ztsbh"].ToString();
                                            cbmodel.f_ztyhh = khdr["f_ztyhh"].ToString();
                                            cbmodel.f_rs = khdr["f_rs"].ToString();
                                            cbmodel.f_khfz = khdr["f_khfz"].ToString();
                                            cbmodel.f_khfzid = khdr["f_khfzid"].ToString();
                                            cbmodel.f_sjljsyl = khdr["f_nljgl"].ToString();
                                            cbmodel.f_pgsj = blankTime;
                                            cbmodel.f_jfsj = blankTime;
                                            //写入抄表表瞬间累积欠费字段
                                            double ljqf = Eva.Library.Text.NumberTool.Parse(khdr["f_ljqf"].ToString());
                                            cbmodel.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf + bqje, 2);




                                            #endregion

                                            #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                                            {
                                                double qsqpjsl = Eva.Library.Text.NumberTool.Parse(khdr["f_qsqpjsl"].ToString());

                                                double zf = 0;
                                                if (qsqpjsl != 0)
                                                {
                                                    zf = (bqsl - qsqpjsl) / qsqpjsl;
                                                }

                                                DataRow[] jtsjdr = jtsjdt.Select("f_yslxid='" + khdr["f_yslxid"].ToString() + "'");
                                                double yqzf = Eva.Library.Text.NumberTool.Parse(jtsjdr[0]["f_zfbl"].ToString()) / 100;


                                                bool sftx = true;

                                                if (-yqzf <= zf)
                                                {
                                                    if (zf <= yqzf)
                                                    {
                                                        sftx = false;
                                                    }
                                                }

                                                if (sftx)
                                                {
                                                    cbmodel.f_sfsfts = "true";
                                                }
                                                else
                                                {
                                                    cbmodel.f_sfsfts = "false";
                                                }
                                            }
                                            cblist.Add(cbmodel);
                                            #endregion


                                            #region 最新平均水量

                                            //【前三期平均水量】【前六期平均水量】

                                            string f_qsqpjsl = "";
                                            string f_qlqpjsl = "";
                                            CountPJSL(int.Parse(khdr["sys_id"].ToString()), ref f_qsqpjsl, ref f_qlqpjsl, bqsl.ToString(), khdt, null);
                                            #endregion

                                            #region 推送数据到客户表
                                            //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                                            //【前三期平均水量】【前六期平均水量】(最新三或六期)
                                            //【累计欠费】

                                            List<sara.dd.ldsw.model.tbl_ld_khb> khml = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_khb>(khtemp);

                                            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = khml[0];

                                            #region 记录旧值
                                            string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
                                            string f_sqzm_old = model_tbl_ld_khb.f_sqzm;
                                            string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
                                            string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
                                            string f_ljgl_old = model_tbl_ld_khb.f_ljgl;
                                            string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
                                            string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
                                            string f_sqsl_old = model_tbl_ld_khb.f_sqsl;
                                            string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
                                            string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
                                            #endregion
                                            //计算新的抄表周期
                                            DateTime cbsj;
                                            DateTime today = DateTime.Now.Date;
                                            cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);

                                            int cbzq = 0;
                                            if (int.TryParse(model_tbl_ld_khb.f_cbzq, out cbzq))
                                            {

                                            }
                                            else
                                            {
                                                cbzq = 1;
                                            }
                                            int sbyear = cbsj.Year;
                                            int sbmonth = cbsj.Month + cbzq + 1;

                                            if (sbmonth > 12)
                                            {
                                                sbyear++;
                                                sbmonth = sbmonth - 12;
                                            }

                                            cbsj = new DateTime(sbyear, sbmonth, 1);
                                            cbsj = cbsj.AddDays(-1);
                                            while (cbsj < today)
                                            {
                                                cbsj = cbsj.AddMonths(cbzq);
                                            }
                                            model_tbl_ld_khb.f_zhcbrq = cbsj;
                                            model_tbl_ld_khb.f_sqzm = model_tbl_ld_khb.f_bqzm;
                                            model_tbl_ld_khb.f_bqzm = drzb[7].ToString().Replace("\t", "");

                                            double yz = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                                            double xz = yz + bqsl;
                                            model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2);

                                            double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                                            double new_ljgl = ljgl + bqsl;
                                            model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

                                            model_tbl_ld_khb.f_qsqpjsl = f_qsqpjsl;
                                            model_tbl_ld_khb.f_qlqpjsl = f_qlqpjsl;

                                            model_tbl_ld_khb.f_sqsl = model_tbl_ld_khb.f_bqsl;
                                            model_tbl_ld_khb.f_bqsl = bqsl.ToString();

                                            ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                                            double new_ljqf = ljqf + bqje;
                                            model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);

                                            khlist.Add(model_tbl_ld_khb);



                                            if (logflag)
                                            {
                                                #region 写日志
                                                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                                temp.Add("key", "f_zhcbrq");
                                                temp.Add("oldvalue", f_zhcbrq_old);
                                                temp.Add("newvalue", cbsj.ToString("yyyy-MM-dd"));
                                                temp.Add("name", "最后抄表日期");
                                                array.Add(temp);
                                                IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                                                f_bqzm.Add("key", "f_bqzm");
                                                f_bqzm.Add("oldvalue", f_bqzm_old);
                                                f_bqzm.Add("newvalue", drzb[7].ToString().Replace("\t", ""));
                                                f_bqzm.Add("name", "本期止码 ");
                                                array.Add(f_bqzm);
                                                IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                                                f_sqzm.Add("key", "f_sqzm");
                                                f_sqzm.Add("oldvalue", f_sqzm_old);
                                                f_sqzm.Add("newvalue", drzb[4].ToString().Replace("\t", ""));
                                                f_sqzm.Add("name", "上期止码 ");
                                                array.Add(f_sqzm);
                                                IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                                                f_nljgl.Add("key", "f_nljgl");
                                                f_nljgl.Add("oldvalue", f_nljgl_old);
                                                f_nljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2));
                                                f_nljgl.Add("name", "年累计购量");
                                                array.Add(f_nljgl);
                                                IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                                                f_ljgl.Add("key", "f_ljgl");
                                                f_ljgl.Add("oldvalue", f_ljgl_old);
                                                f_ljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2));
                                                f_ljgl.Add("name", "累计购量");
                                                array.Add(f_ljgl);
                                                IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                                                qsqpjsl_dic.Add("key", "qsqpjsl");
                                                qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                                                qsqpjsl_dic.Add("newvalue", f_qsqpjsl);
                                                qsqpjsl_dic.Add("name", "前三期平均水量");
                                                array.Add(qsqpjsl_dic);
                                                IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                                                qlqpjsl_dic.Add("key", "qlqpjsl");
                                                qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                                                qlqpjsl_dic.Add("newvalue", f_qlqpjsl);
                                                qlqpjsl_dic.Add("name", "前六期平均水量");
                                                array.Add(qlqpjsl_dic);
                                                IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                                                f_bqsl.Add("key", "f_bqsl");
                                                f_bqsl.Add("oldvalue", f_bqsl_old);
                                                f_bqsl.Add("newvalue", bqsl.ToString());
                                                f_bqsl.Add("name", "本期水量 ");
                                                array.Add(f_bqsl);
                                                IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                                                f_sqsl.Add("key", "f_bqsl");
                                                f_sqsl.Add("oldvalue", f_sqsl_old);
                                                f_sqsl.Add("newvalue", khdr["f_bqsl"].ToString());
                                                f_sqsl.Add("name", "上期水量");
                                                array.Add(f_sqsl);

                                                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", khdr["sys_id"].ToString(), "tbl_ld_ycbgl_detail", "远传表自动抄表", array, clientInf, null);
                                                #endregion
                                            }

                                            #endregion

                                            #region 推送数据到水表表
                                            //【年累计购量】【累计购量】 
                                            //【前三期平均水量】【前六期平均水量】
                                            DataRow[] sbdr = sbdt.Select("sys_id='" + khdr["f_sbbhid"].ToString() + "'");
                                            List<sara.dd.ldsw.model.tbl_ld_sbb> sbtemp = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_sbb>(this.ToDataTable(sbdr));
                                            sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = sbtemp[0];

                                            string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                                            string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                                            string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                                            string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;
                                            string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                                            string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                                            string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                                            string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;


                                            double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                                            double now_ljgl = sb_ljgl + bqsl;
                                            model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);

                                            double sb_nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                                            double now_nljgl = sb_nljgl + bqsl;
                                            model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_nljgl, 2);

                                            double sb_qsqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qsqpjsl);
                                            model_tbl_ld_sbb.f_qsqpjsl = f_qsqpjsl;

                                            double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
                                            model_tbl_ld_sbb.f_qlqpjsl = f_qlqpjsl;
                                            model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
                                            model_tbl_ld_sbb.f_bqzm = drzb[7].ToString().Replace("\t", "");
                                            model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                                            model_tbl_ld_sbb.f_bqsl = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);

                                            sblist.Add(model_tbl_ld_sbb);
                                            #endregion
                                            if (logflag)
                                            {
                                                #region 写日志

                                                List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                                                IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                                                sb_f_nljgl.Add("key", "f_nljgl");
                                                sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                                                sb_f_nljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2));
                                                sb_f_nljgl.Add("name", "年累计购量");
                                                list.Add(sb_f_nljgl);

                                                IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                                                sb_f_ljgl.Add("key", "f_ljgl");
                                                sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                                                sb_f_ljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2));
                                                sb_f_ljgl.Add("name", "累计购量");
                                                list.Add(sb_f_ljgl);

                                                IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                                                sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                                                sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                                                sb_f_qsqpjsl.Add("newvalue", f_qsqpjsl);
                                                sb_f_qsqpjsl.Add("name", "前三期平均水量");
                                                list.Add(sb_f_qsqpjsl);

                                                IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                                                sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                                                sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                                                sb_f_qlqpjsl.Add("newvalue", f_qlqpjsl);
                                                sb_f_qlqpjsl.Add("name", "前六期平均水量");
                                                list.Add(sb_f_qlqpjsl);

                                                IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                                                sb_f_bqzm.Add("key", "f_bqzm");
                                                sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                                                sb_f_bqzm.Add("newvalue", drzb[7].ToString().Replace("\t", ""));
                                                sb_f_bqzm.Add("name", "本期止码");
                                                list.Add(sb_f_bqzm);
                                                IDictionary<string, string> sb_f_sqzm = new Dictionary<string, string>();
                                                sb_f_sqzm.Add("key", "f_sqzm");
                                                sb_f_sqzm.Add("oldvalue", sb_f_sqzm_old);
                                                sb_f_sqzm.Add("newvalue", drzb[4].ToString().Replace("\t", ""));
                                                sb_f_sqzm.Add("name", "上期止码");
                                                list.Add(sb_f_sqzm);
                                                IDictionary<string, string> sb_f_bqsl = new Dictionary<string, string>();
                                                sb_f_bqsl.Add("key", "f_bqsl");
                                                sb_f_bqsl.Add("oldvalue", sb_f_bqsl_old);
                                                sb_f_bqsl.Add("newvalue", bqsl.ToString());
                                                sb_f_bqsl.Add("name", "本期水量");
                                                list.Add(sb_f_bqsl);
                                                IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                                                sb_f_sqsl.Add("key", "f_sqsl");
                                                sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                                                sb_f_sqsl.Add("newvalue", khdr["f_bqsl"].ToString());
                                                sb_f_sqsl.Add("name", "上期水量");
                                                list.Add(sb_f_sqsl);
                                                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", khdr["f_sbbhid"].ToString(), "tbl_ld_ycbgl_detail", "远传表自动抄表", list, clientInf, null);
                                                #endregion
                                            }

                                            count++;
                                            if (count % step == 0)
                                            {
                                                //批量建立抄表记录并清空list
                                                Dictionary<string, object[]> result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cblist);
                                                t.BatchInsert("tbl_ld_cbiao", result);

                                                cblist = new List<ldsw.model.tbl_ld_cbiao>();

                                                //批量更新远传表
                                                result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_ycbglzb>(ycbglzblist);
                                                t.BatchUpdate("tbl_ld_ycbglzb", "sys_id", result);

                                                ycbglzblist = new List<ldsw.model.tbl_ld_ycbglzb>();

                                                //批量更新客户表
                                                result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                                                t.BatchUpdate("tbl_ld_khb", "sys_id", result);
                                                khlist = new List<ldsw.model.tbl_ld_khb>();

                                                //批量更新水表表
                                                result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_sbb>(sblist);
                                                t.BatchUpdate("tbl_ld_sbb", "sys_id", result);
                                                sblist = new List<ldsw.model.tbl_ld_sbb>();


                                                t.getTrans().commit();
                                                t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                                                t.getTrans().begin();
                                                sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycb" + model.sys_id + ".txt", (count / step).ToString() + "/" + maxtime.ToString());
                                            }
                                        }
                                    }

                                }
                            }
                            Dictionary<string, object[]> result2 = null;
                            if (cblist.Count > 0)
                            {
                                //批量建立抄表记录并清空list
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cblist);
                                t.BatchInsert("tbl_ld_cbiao", result2);

                                cblist = new List<ldsw.model.tbl_ld_cbiao>();
                            }

                            if (ycbglzblist.Count > 0)
                            {
                                //批量更新远传表
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_ycbglzb>(ycbglzblist);
                                t.BatchUpdate("tbl_ld_ycbglzb", "sys_id", result2);

                                ycbglzblist = new List<ldsw.model.tbl_ld_ycbglzb>();
                            }

                            if (khlist.Count > 0)
                            {
                                //批量更新客户表
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                                t.BatchUpdate("tbl_ld_khb", "sys_id", result2);
                                khlist = new List<ldsw.model.tbl_ld_khb>();
                            }

                            if (sblist.Count > 0)
                            {
                                //批量更新水表表
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_sbb>(sblist);
                                t.BatchUpdate("tbl_ld_sbb", "sys_id", result2);
                                sblist = new List<ldsw.model.tbl_ld_sbb>();
                            }

                            sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycb" + model.sys_id + ".txt", maxtime.ToString() + "/" + maxtime.ToString());
                            t.getTrans().commit();

                            resultDic["result"] = "true";
                            resultDic["message"] = "true";



                            resultDic["result"] = "true";
                            resultDic["message"] = result1;

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
        public string CreateDL(string json, string columns, string clientInf, string countstr, string cjcbsj)
        {
            //首先保存数据
            string result1 = this.Update(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans t = null;
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);
                //创建导入进程0/100
                sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycb" + model.sys_id + ".txt", "0/100");
                //获取远传表的的所有用户
                //4796为新建电力远传表抄本  4738排子
                string khquerysql = "SELECT * FROM tbl_ld_khb WHERE f_cbbhid = '4796' and f_ztid in ('0','4') and sys_delflag='0'";
                DataTable khdt = _iAccessData.Query(khquerysql).Tables[0];
                //获取远传表用户的所有水表
                string sbquerysql = "SELECT * FROM tbl_ld_sbb WHERE sys_id in (select f_sbbhid from tbl_ld_khb where f_cbbhid = '4796' and f_ztid in ('0','4') and sys_delflag='0') and f_ztid in ('0','4') and sys_delflag='0'";
                DataTable sbdt = _iAccessData.Query(sbquerysql).Tables[0];

                //获取所有阶梯水价
                string jtsjquerysql = "SELECT * FROM tbl_ldbm_jtsj";
                DataTable jtsjdt = _iAccessData.Query(jtsjquerysql).Tables[0];
                //时间信息
                DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                DateTimeFormatInfo dtFormat2 = new DateTimeFormatInfo();
                dtFormat.ShortDatePattern = "yyyy/MM/dd";
                dtFormat2.ShortDatePattern = "yyyy/MM/dd HH:mm:ss";
                System.DateTime currentTime = new System.DateTime();
                currentTime = System.DateTime.Now;

                DateTime cbsjtime = DateTime.Parse(cjcbsj);
                DateTime blankTime = DateTime.Parse("1900-01-01");
                //userinfo信息
                IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                //获取附件根路径
                string FileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString() + "fileuploadpath/";
                FileUpLoadRootPath = Eva.Library.Format.FormatTextTool.GetMapPath(FileUpLoadRootPath, HttpContext.Current.Server);

                //获取附件名称

                string sqlString = "";

                sqlString = "SELECT fileuploadname FROM tbl_file_content WHERE menuid='" + model.f_drwj + "'";
                DataTable dt = _iAccessData.Query(sqlString).Tables[0];

                if (true)
                {
                    //测试代码
                    resultDic["result"] = "false";
                    resultDic["message"] = "EXCEL数据格式错误、或版本错误、或数据来源异常！";
                }
                else
                {
                    //判断是否上传附件
                    if (dt.Rows.Count > 0 && dt.Rows[0]["fileuploadname"] != null && dt.Rows[0]["fileuploadname"].ToString().Length > 0)
                    {
                        DataTable importfile = commonclass.commonclass.ReadExcel(FileUpLoadRootPath + dt.Rows[0]["fileuploadname"].ToString()).Tables[0];

                        //判断是否为正确的导入模板
                        if (importfile.Columns[0].ColumnName.Trim() == "水利户号" && importfile.Columns[2].ColumnName.Trim() == "地址")
                        {
                            //筛选excel
                            DataRow[] drs = importfile.Select("水表指数 is not null");
                            //循环信息以及事务开启
                            t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                            t.getTrans().begin();
                            //循环次数以及循环最大值
                            int step = 500; //步长
                            int maxtime = (drs.Count() / step) + 1; //运行次数总和
                            int count = int.Parse(countstr); //当前运行至
                                                             //远传表子表modellist
                            List<sara.dd.ldsw.model.tbl_ld_ycbglzb> ycbglzblist = new List<sara.dd.ldsw.model.tbl_ld_ycbglzb>();
                            //抄表modellist
                            List<sara.dd.ldsw.model.tbl_ld_cbiao> cblist = new List<sara.dd.ldsw.model.tbl_ld_cbiao>();
                            //客户modellist
                            List<sara.dd.ldsw.model.tbl_ld_khb> khlist = new List<sara.dd.ldsw.model.tbl_ld_khb>();
                            //水表modellist
                            List<sara.dd.ldsw.model.tbl_ld_sbb> sblist = new List<sara.dd.ldsw.model.tbl_ld_sbb>();

                            //日志开关
                            bool logflag = false;
                            for (int i = count * step; i < drs.Count(); i++)
                            {
                                DataRow drzb = drs[i];
                                DataRow[] kharray = khdt.Select("f_khbh='" + drzb[0].ToString().Replace("\t", "").PadLeft(10, '0') + "'");
                                DataTable khtemp = this.ToDataTable(kharray);
                                if (kharray.Length == 1)
                                {

                                    DataRow khdr = kharray[0];
                                    //止码应大于起码
                                    if (Eva.Library.Text.NumberTool.Parse(drzb[3].ToString().Replace("\t", "")) > Eva.Library.Text.NumberTool.Parse(khdr["f_bqzm"].ToString()))
                                    {

                                        //循环创建子表对象
                                        sara.dd.ldsw.model.tbl_ld_ycbglzb ycbglzbmodel = new sara.dd.ldsw.model.tbl_ld_ycbglzb();

                                        ycbglzbmodel.sys_id = int.Parse(_idal_tbl_ld_ycbglzb.GetMaxId(null));
                                        ycbglzbmodel.sys_creatuserid = userInfDic["userid"].ToString();
                                        ycbglzbmodel.sys_creatusername = userInfDic["username"].ToString();
                                        ycbglzbmodel.sys_creatdate = currentTime;
                                        ycbglzbmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                                        ycbglzbmodel.sys_lasteditusername = userInfDic["username"].ToString();
                                        ycbglzbmodel.sys_lasteditdate = currentTime;
                                        ycbglzbmodel.sys_deldate = blankTime;
                                        ycbglzbmodel.sys_delflag = "0";

                                        ycbglzbmodel.fk_tbl_ld_ycbgl_sys_id = model.sys_id.ToString();
                                        ycbglzbmodel.f_khbh = khdr["f_khbh"].ToString();
                                        ycbglzbmodel.f_yhm = khdr["f_yhm"].ToString();
                                        ycbglzbmodel.f_sbbh = khdr["f_sbbh"].ToString();
                                        ycbglzbmodel.f_dz = khdr["f_dz"].ToString();
                                        ycbglzbmodel.f_dh = khdr["f_dh"].ToString();
                                        ycbglzbmodel.f_sqzm = khdr["f_bqzm"].ToString();
                                        ycbglzbmodel.f_bqzm = drzb[3].ToString().Replace("\t", "");
                                        ycbglzbmodel.f_cbsj = cbsjtime;
                                        ycbglzbmodel.f_zhcbrq = Convert.ToDateTime(khdr["f_zhcbrq"].ToString(), dtFormat);

                                        ycbglzblist.Add(ycbglzbmodel);




                                        //创建抄表记录
                                        sara.dd.ldsw.model.tbl_ld_cbiao cbmodel = new model.tbl_ld_cbiao();

                                        double bqsl = Eva.Library.Text.NumberTool.Parse(drzb[3].ToString().Replace("\t", "")) - Eva.Library.Text.NumberTool.Parse(khdr["f_bqzm"].ToString());

                                        #region 计算水费
                                        string sql = "select f_waterrent('" + khdr["sys_id"].ToString() + "'," + bqsl + ",'2') as sf from dual";
                                        DataRow dr = _iAccessData.Query(sql).Tables[0].Rows[0];
                                        string[] sfjlarr = dr["sf"].ToString().Split('|');
                                        //预算费记录
                                        cbmodel.f_sfjl = "";

                                        for (int ii = 1; ii < sfjlarr.Length; ii++)
                                        {
                                            cbmodel.f_sfjl += sfjlarr[ii] + "|";
                                        }

                                        cbmodel.f_sfjl = cbmodel.f_sfjl.TrimEnd('|');
                                        string sfstr = dr["sf"].ToString().Split('|')[0];
                                        string sf = sfstr.Split('^')[0];
                                        cbmodel.f_sf = sf;
                                        string pwf = sfstr.Split('^')[1];
                                        cbmodel.f_pwf = pwf;
                                        double bqje = Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf);
                                        cbmodel.f_bqje = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);


                                        #endregion
                                        #region 阶梯水价分析
                                        cbmodel.f_dyjtsl = "0";
                                        cbmodel.f_dyjtsf = "0";
                                        cbmodel.f_dejtsl = "0";
                                        cbmodel.f_dejtsf = "0";
                                        cbmodel.f_dsjtsl = "0";
                                        cbmodel.f_dsjtsf = "0";
                                        string[] jtarr = cbmodel.f_sfjl.Split('|');

                                        for (int ii = 0; ii < jtarr.Length; ii++)
                                        {

                                            if (jtarr[ii].StartsWith("3.95^.95") || jtarr[ii].StartsWith("3.95^0.95"))
                                            {
                                                //属于第一阶梯
                                                cbmodel.f_dyjtsl = jtarr[ii].Split('^')[2];
                                                cbmodel.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(4.9 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dyjtsl), 2);
                                            }
                                            else if (jtarr[ii].StartsWith("5.25^.95") || jtarr[ii].StartsWith("5.25^0.95"))
                                            {
                                                //属于第二阶梯
                                                cbmodel.f_dejtsl = jtarr[ii].Split('^')[2];
                                                cbmodel.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength(6.2 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dejtsl), 2);

                                            }
                                            else if (jtarr[ii].StartsWith("7.05^.95") || jtarr[ii].StartsWith("7.05^0.95"))
                                            {
                                                //属于第三阶梯
                                                cbmodel.f_dsjtsl = jtarr[ii].Split('^')[2];
                                                cbmodel.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(8 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dsjtsl), 2);

                                            }
                                        }
                                        #endregion

                                        #region 将客户基础信息放入抄表model
                                        cbmodel.sys_id = int.Parse(_idal_tbl_ld_cbiao.GetMaxId(null));
                                        cbmodel.sys_creatuserid = userInfDic["userid"].ToString();
                                        cbmodel.sys_creatusername = userInfDic["username"].ToString();
                                        cbmodel.sys_creatdate = currentTime;
                                        cbmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                                        cbmodel.sys_lasteditusername = userInfDic["username"].ToString();
                                        cbmodel.sys_lasteditdate = currentTime;
                                        cbmodel.sys_deldate = blankTime;
                                        cbmodel.sys_delflag = "0";
                                        cbmodel.f_cb_cbbh = commonclass.commonclass.getBusinessNum("CB", "", null);
                                        cbmodel.f_khbh = khdr["f_khbh"].ToString();
                                        cbmodel.f_khbhid = khdr["sys_id"].ToString();
                                        cbmodel.f_sqzm = khdr["f_bqzm"].ToString();
                                        cbmodel.f_bqzm = drzb[3].ToString().Replace("\t", "");
                                        cbmodel.f_bqsl = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);
                                        cbmodel.f_sqsl = khdr["f_bqsl"].ToString();
                                        cbmodel.f_cbyid = userInfDic["userid"].ToString();
                                        cbmodel.f_cbyname = userInfDic["username"].ToString();
                                        cbmodel.f_cbsj = cbsjtime;
                                        cbmodel.f_bk = "正常";
                                        cbmodel.f_bkid = "05430001";
                                        cbmodel.f_zt = "已算费";
                                        cbmodel.f_ztid = "2";
                                        cbmodel.f_ly = "远传表自动计算";
                                        cbmodel.f_lyid = "05450004";
                                        cbmodel.f_sbbh = khdr["f_sbbh"].ToString();
                                        cbmodel.f_sbbhid = khdr["f_sbbhid"].ToString();
                                        cbmodel.f_sblx = khdr["f_sblx"].ToString();
                                        cbmodel.f_sblxid = khdr["f_sblxid"].ToString();
                                        cbmodel.f_yslx = khdr["f_yslx"].ToString();
                                        cbmodel.f_yslxid = khdr["f_yslxid"].ToString();
                                        cbmodel.f_lxtkhh = khdr["f_lxth"].ToString();
                                        cbmodel.f_cbbh = khdr["f_cbbh"].ToString();
                                        cbmodel.f_cbbhid = khdr["f_cbbhid"].ToString();
                                        cbmodel.f_cbmc = khdr["f_cbmc"].ToString();
                                        cbmodel.f_yhbh = khdr["f_yhbh"].ToString();
                                        cbmodel.f_yhbhid = khdr["f_yhbhid"].ToString();
                                        cbmodel.f_yhm = khdr["f_yhm"].ToString();
                                        cbmodel.f_jfm = khdr["f_jfm"].ToString();
                                        cbmodel.f_dh = khdr["f_dh"].ToString();
                                        cbmodel.f_dz = khdr["f_dz"].ToString();
                                        cbmodel.f_dy = khdr["f_dy"].ToString();
                                        cbmodel.f_dyid = khdr["f_dyid"].ToString();
                                        cbmodel.f_sc = khdr["f_sc"].ToString();
                                        cbmodel.f_scid = khdr["f_scid"].ToString();
                                        cbmodel.f_qy = khdr["f_qy"].ToString();
                                        cbmodel.f_qyid = khdr["f_qyid"].ToString();
                                        cbmodel.f_pq = khdr["f_pq"].ToString();
                                        cbmodel.f_pqid = khdr["f_pqid"].ToString();
                                        cbmodel.f_kj = khdr["f_sbkj"].ToString();
                                        cbmodel.f_kjid = khdr["f_sbkjid"].ToString();
                                        cbmodel.f_ztkhh = khdr["f_ztkhh"].ToString();
                                        cbmodel.f_ztsbh = khdr["f_ztsbh"].ToString();
                                        cbmodel.f_ztyhh = khdr["f_ztyhh"].ToString();
                                        cbmodel.f_rs = khdr["f_rs"].ToString();
                                        cbmodel.f_khfz = khdr["f_khfz"].ToString();
                                        cbmodel.f_khfzid = khdr["f_khfzid"].ToString();
                                        cbmodel.f_sjljsyl = khdr["f_nljgl"].ToString();
                                        cbmodel.f_pgsj = blankTime;
                                        cbmodel.f_jfsj = blankTime;
                                        //写入抄表表瞬间累积欠费字段
                                        double ljqf = Eva.Library.Text.NumberTool.Parse(khdr["f_ljqf"].ToString());
                                        cbmodel.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf + bqje, 2);




                                        #endregion

                                        #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                                        {
                                            double qsqpjsl = Eva.Library.Text.NumberTool.Parse(khdr["f_qsqpjsl"].ToString());

                                            double zf = 0;
                                            if (qsqpjsl != 0)
                                            {
                                                zf = (bqsl - qsqpjsl) / qsqpjsl;
                                            }

                                            DataRow[] jtsjdr = jtsjdt.Select("f_yslxid='" + khdr["f_yslxid"].ToString() + "'");
                                            double yqzf = Eva.Library.Text.NumberTool.Parse(jtsjdr[0]["f_zfbl"].ToString()) / 100;


                                            bool sftx = true;

                                            if (-yqzf <= zf)
                                            {
                                                if (zf <= yqzf)
                                                {
                                                    sftx = false;
                                                }
                                            }

                                            if (sftx)
                                            {
                                                cbmodel.f_sfsfts = "true";
                                            }
                                            else
                                            {
                                                cbmodel.f_sfsfts = "false";
                                            }
                                        }
                                        cblist.Add(cbmodel);
                                        #endregion


                                        #region 最新平均水量

                                        //【前三期平均水量】【前六期平均水量】

                                        string f_qsqpjsl = "";
                                        string f_qlqpjsl = "";
                                        CountPJSL(int.Parse(khdr["sys_id"].ToString()), ref f_qsqpjsl, ref f_qlqpjsl, bqsl.ToString(), khdt, null);
                                        #endregion

                                        #region 推送数据到客户表
                                        //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                                        //【前三期平均水量】【前六期平均水量】(最新三或六期)
                                        //【累计欠费】

                                        List<sara.dd.ldsw.model.tbl_ld_khb> khml = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_khb>(khtemp);

                                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = khml[0];

                                        #region 记录旧值
                                        string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
                                        string f_sqzm_old = model_tbl_ld_khb.f_sqzm;
                                        string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
                                        string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
                                        string f_ljgl_old = model_tbl_ld_khb.f_ljgl;
                                        string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
                                        string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
                                        string f_sqsl_old = model_tbl_ld_khb.f_sqsl;
                                        string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
                                        string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
                                        #endregion
                                        //计算新的抄表周期
                                        DateTime cbsj;
                                        DateTime today = DateTime.Now.Date;
                                        cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);

                                        int cbzq = 0;
                                        if (int.TryParse(model_tbl_ld_khb.f_cbzq, out cbzq))
                                        {

                                        }
                                        else
                                        {
                                            cbzq = 1;
                                        }
                                        int sbyear = cbsj.Year;
                                        int sbmonth = cbsj.Month + cbzq + 1;

                                        if (sbmonth > 12)
                                        {
                                            sbyear++;
                                            sbmonth = sbmonth - 12;
                                        }

                                        cbsj = new DateTime(sbyear, sbmonth, 1);
                                        cbsj = cbsj.AddDays(-1);
                                        while (cbsj < today)
                                        {
                                            cbsj = cbsj.AddMonths(cbzq);
                                        }
                                        model_tbl_ld_khb.f_zhcbrq = cbsj;
                                        model_tbl_ld_khb.f_sqzm = model_tbl_ld_khb.f_bqzm;
                                        model_tbl_ld_khb.f_bqzm = drzb[3].ToString().Replace("\t", "");

                                        double yz = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                                        double xz = yz + bqsl;
                                        model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2);

                                        double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                                        double new_ljgl = ljgl + bqsl;
                                        model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

                                        model_tbl_ld_khb.f_qsqpjsl = f_qsqpjsl;
                                        model_tbl_ld_khb.f_qlqpjsl = f_qlqpjsl;

                                        model_tbl_ld_khb.f_sqsl = model_tbl_ld_khb.f_bqsl;
                                        model_tbl_ld_khb.f_bqsl = bqsl.ToString();

                                        ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                                        double new_ljqf = ljqf + bqje;
                                        model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);

                                        khlist.Add(model_tbl_ld_khb);



                                        if (logflag)
                                        {
                                            #region 写日志
                                            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                            IDictionary<string, string> temp = new Dictionary<string, string>();
                                            temp.Add("key", "f_zhcbrq");
                                            temp.Add("oldvalue", f_zhcbrq_old);
                                            temp.Add("newvalue", cbsj.ToString("yyyy-MM-dd"));
                                            temp.Add("name", "最后抄表日期");
                                            array.Add(temp);
                                            IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                                            f_bqzm.Add("key", "f_bqzm");
                                            f_bqzm.Add("oldvalue", f_bqzm_old);
                                            f_bqzm.Add("newvalue", drzb[3].ToString().Replace("\t", ""));
                                            f_bqzm.Add("name", "本期止码 ");
                                            array.Add(f_bqzm);
                                            IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                                            f_sqzm.Add("key", "f_sqzm");
                                            f_sqzm.Add("oldvalue", f_sqzm_old);
                                            f_sqzm.Add("newvalue", khdr["f_bqzm"].ToString());
                                            f_sqzm.Add("name", "上期止码 ");
                                            array.Add(f_sqzm);
                                            IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                                            f_nljgl.Add("key", "f_nljgl");
                                            f_nljgl.Add("oldvalue", f_nljgl_old);
                                            f_nljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2));
                                            f_nljgl.Add("name", "年累计购量");
                                            array.Add(f_nljgl);
                                            IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                                            f_ljgl.Add("key", "f_ljgl");
                                            f_ljgl.Add("oldvalue", f_ljgl_old);
                                            f_ljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2));
                                            f_ljgl.Add("name", "累计购量");
                                            array.Add(f_ljgl);
                                            IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                                            qsqpjsl_dic.Add("key", "qsqpjsl");
                                            qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                                            qsqpjsl_dic.Add("newvalue", f_qsqpjsl);
                                            qsqpjsl_dic.Add("name", "前三期平均水量");
                                            array.Add(qsqpjsl_dic);
                                            IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                                            qlqpjsl_dic.Add("key", "qlqpjsl");
                                            qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                                            qlqpjsl_dic.Add("newvalue", f_qlqpjsl);
                                            qlqpjsl_dic.Add("name", "前六期平均水量");
                                            array.Add(qlqpjsl_dic);
                                            IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                                            f_bqsl.Add("key", "f_bqsl");
                                            f_bqsl.Add("oldvalue", f_bqsl_old);
                                            f_bqsl.Add("newvalue", bqsl.ToString());
                                            f_bqsl.Add("name", "本期水量 ");
                                            array.Add(f_bqsl);
                                            IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                                            f_sqsl.Add("key", "f_bqsl");
                                            f_sqsl.Add("oldvalue", f_sqsl_old);
                                            f_sqsl.Add("newvalue", khdr["f_bqsl"].ToString());
                                            f_sqsl.Add("name", "上期水量");
                                            array.Add(f_sqsl);

                                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", khdr["sys_id"].ToString(), "tbl_ld_ycbgl_detail", "远传表自动抄表", array, clientInf, null);
                                            #endregion
                                        }

                                        #endregion

                                        #region 推送数据到水表表
                                        //【年累计购量】【累计购量】 
                                        //【前三期平均水量】【前六期平均水量】
                                        DataRow[] sbdr = sbdt.Select("sys_id='" + khdr["f_sbbhid"].ToString() + "'");
                                        List<sara.dd.ldsw.model.tbl_ld_sbb> sbtemp = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_sbb>(this.ToDataTable(sbdr));
                                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = sbtemp[0];

                                        string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                                        string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                                        string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                                        string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;
                                        string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                                        string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                                        string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                                        string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;


                                        double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                                        double now_ljgl = sb_ljgl + bqsl;
                                        model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);

                                        double sb_nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                                        double now_nljgl = sb_nljgl + bqsl;
                                        model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_nljgl, 2);

                                        double sb_qsqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qsqpjsl);
                                        model_tbl_ld_sbb.f_qsqpjsl = f_qsqpjsl;

                                        double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
                                        model_tbl_ld_sbb.f_qlqpjsl = f_qlqpjsl;

                                        model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
                                        model_tbl_ld_sbb.f_bqzm = drzb[3].ToString().Replace("\t", "");
                                        model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                                        model_tbl_ld_sbb.f_bqsl = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);

                                        sblist.Add(model_tbl_ld_sbb);
                                        #endregion
                                        if (logflag)
                                        {
                                            #region 写日志

                                            List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                                            IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                                            sb_f_nljgl.Add("key", "f_nljgl");
                                            sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                                            sb_f_nljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2));
                                            sb_f_nljgl.Add("name", "年累计购量");
                                            list.Add(sb_f_nljgl);

                                            IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                                            sb_f_ljgl.Add("key", "f_ljgl");
                                            sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                                            sb_f_ljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2));
                                            sb_f_ljgl.Add("name", "累计购量");
                                            list.Add(sb_f_ljgl);

                                            IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                                            sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                                            sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                                            sb_f_qsqpjsl.Add("newvalue", f_qsqpjsl);
                                            sb_f_qsqpjsl.Add("name", "前三期平均水量");
                                            list.Add(sb_f_qsqpjsl);

                                            IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                                            sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                                            sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                                            sb_f_qlqpjsl.Add("newvalue", f_qlqpjsl);
                                            sb_f_qlqpjsl.Add("name", "前六期平均水量");
                                            list.Add(sb_f_qlqpjsl);

                                            IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                                            sb_f_bqzm.Add("key", "f_bqzm");
                                            sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                                            sb_f_bqzm.Add("newvalue", drzb[3].ToString().Replace("\t", ""));
                                            sb_f_bqzm.Add("name", "本期止码");
                                            list.Add(sb_f_bqzm);
                                            IDictionary<string, string> sb_f_sqzm = new Dictionary<string, string>();
                                            sb_f_sqzm.Add("key", "f_sqzm");
                                            sb_f_sqzm.Add("oldvalue", sb_f_sqzm_old);
                                            sb_f_sqzm.Add("newvalue", khdr["f_bqzm"].ToString());
                                            sb_f_sqzm.Add("name", "上期止码");
                                            list.Add(sb_f_sqzm);
                                            IDictionary<string, string> sb_f_bqsl = new Dictionary<string, string>();
                                            sb_f_bqsl.Add("key", "f_bqsl");
                                            sb_f_bqsl.Add("oldvalue", sb_f_bqsl_old);
                                            sb_f_bqsl.Add("newvalue", bqsl.ToString());
                                            sb_f_bqsl.Add("name", "本期水量");
                                            list.Add(sb_f_bqsl);
                                            IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                                            sb_f_sqsl.Add("key", "f_sqsl");
                                            sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                                            sb_f_sqsl.Add("newvalue", khdr["f_bqsl"].ToString());
                                            sb_f_sqsl.Add("name", "上期水量");
                                            list.Add(sb_f_sqsl);
                                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", khdr["f_sbbhid"].ToString(), "tbl_ld_ycbgl_detail", "远传表自动抄表", list, clientInf, null);
                                            #endregion
                                        }

                                        count++;
                                        if (count % step == 0)
                                        {
                                            //批量建立抄表记录并清空list
                                            Dictionary<string, object[]> result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cblist);
                                            t.BatchInsert("tbl_ld_cbiao", result);

                                            cblist = new List<ldsw.model.tbl_ld_cbiao>();

                                            //批量建立远传表子表
                                            result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_ycbglzb>(ycbglzblist);
                                            t.BatchInsert("tbl_ld_ycbglzb", result);

                                            ycbglzblist = new List<ldsw.model.tbl_ld_ycbglzb>();

                                            //批量更新客户表
                                            result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                                            t.BatchUpdate("tbl_ld_khb", "sys_id", result);
                                            khlist = new List<ldsw.model.tbl_ld_khb>();

                                            //批量更新水表表
                                            result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_sbb>(sblist);
                                            t.BatchUpdate("tbl_ld_sbb", "sys_id", result);
                                            sblist = new List<ldsw.model.tbl_ld_sbb>();


                                            t.getTrans().commit();
                                            t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                                            t.getTrans().begin();
                                            sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycb" + model.sys_id + ".txt", (count / step).ToString() + "/" + maxtime.ToString());
                                        }
                                    }
                                }


                            }
                            Dictionary<string, object[]> result2 = null;
                            if (cblist.Count > 0)
                            {
                                //批量建立抄表记录并清空list
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(cblist);
                                t.BatchInsert("tbl_ld_cbiao", result2);

                                cblist = new List<ldsw.model.tbl_ld_cbiao>();
                            }

                            if (ycbglzblist.Count > 0)
                            {
                                //批量建立远传表子表
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_ycbglzb>(ycbglzblist);
                                t.BatchInsert("tbl_ld_ycbglzb", result2);

                                ycbglzblist = new List<ldsw.model.tbl_ld_ycbglzb>();
                            }

                            if (khlist.Count > 0)
                            {
                                //批量更新客户表
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                                t.BatchUpdate("tbl_ld_khb", "sys_id", result2);
                                khlist = new List<ldsw.model.tbl_ld_khb>();
                            }

                            if (sblist.Count > 0)
                            {
                                //批量更新水表表
                                result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_sbb>(sblist);
                                t.BatchUpdate("tbl_ld_sbb", "sys_id", result2);
                                sblist = new List<ldsw.model.tbl_ld_sbb>();
                            }

                            sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycb" + model.sys_id + ".txt", maxtime.ToString() + "/" + maxtime.ToString());
                            t.getTrans().commit();

                            resultDic["result"] = "true";
                            resultDic["message"] = "true";



                            resultDic["result"] = "true";
                            resultDic["message"] = result1;

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
        public string CreateNB(string sbbh, string bqzm, string sqzm, string bqsl, DateTime zhcbsj)
        {
            //首先保存数据
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = commonclass.commonclass.CreateIAccessDataTrans();
            try
            {
                //循环信息以及事务开启
                t.getTrans().begin();

                //获取所有阶梯水价
                string jtsjquerysql = "SELECT * FROM tbl_ldbm_jtsj";
                DataTable jtsjdt = t.Query(jtsjquerysql).Tables[0];
                //时间信息
                DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                DateTimeFormatInfo dtFormat2 = new DateTimeFormatInfo();
                dtFormat.ShortDatePattern = "yyyy/MM/dd";
                dtFormat2.ShortDatePattern = "yyyy/MM/dd HH:mm:ss";
                DateTime currentTime = new System.DateTime();
                currentTime = System.DateTime.Now;

                DateTime blankTime = DateTime.Parse("1900-01-01");





                //客户modellist
                List<sara.dd.ldsw.model.tbl_ld_khb> khlist = new List<sara.dd.ldsw.model.tbl_ld_khb>();

                //日志开关
                bool logflag = true;
                //获取客户信息
                khlist = _idal_tbl_ld_khb.GetList("f_sbbh='" + sbbh + "'", "", "*", "", "", t);

                if (khlist.Count == 1)
                {
                    sara.dd.ldsw.model.tbl_ld_khb khmodel = khlist[0];

                        //创建抄表记录
                        sara.dd.ldsw.model.tbl_ld_cbiao cbmodel = new model.tbl_ld_cbiao();

                        #region 计算水费
                        string sql = "select f_waterrent('" + khmodel.sys_id + "'," + bqsl + ",'2') as sf from dual";
                        DataRow dr = t.Query(sql).Tables[0].Rows[0];
                    string[] sfjlarr = dr["sf"].ToString().Split('|');
                    //预算费记录
                    cbmodel.f_sfjl = "";

                    for (int ii = 1; ii < sfjlarr.Length; ii++)
                    {
                        cbmodel.f_sfjl += sfjlarr[ii] + "|";
                    }

                    cbmodel.f_sfjl = cbmodel.f_sfjl.TrimEnd('|');
                    string sfstr = dr["sf"].ToString().Split('|')[0];
                        string sf = sfstr.Split('^')[0];
                        cbmodel.f_sf = sf;
                        string pwf = sfstr.Split('^')[1];
                        cbmodel.f_pwf = pwf;
                        double bqje = Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf);
                        cbmodel.f_bqje = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);


                    #endregion

                    #region 阶梯水价分析
                    cbmodel.f_dyjtsl = "0";
                    cbmodel.f_dyjtsf = "0";
                    cbmodel.f_dejtsl = "0";
                    cbmodel.f_dejtsf = "0";
                    cbmodel.f_dsjtsl = "0";
                    cbmodel.f_dsjtsf = "0";
                    string[] jtarr = cbmodel.f_sfjl.Split('|');

                    for (int ii = 0; ii < jtarr.Length; ii++)
                    {

                        if (jtarr[ii].StartsWith("3.95^.95") || jtarr[ii].StartsWith("3.95^0.95"))
                        {
                            //属于第一阶梯
                            cbmodel.f_dyjtsl = jtarr[ii].Split('^')[2];
                            cbmodel.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(4.9 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dyjtsl), 2);
                        }
                        else if (jtarr[ii].StartsWith("5.25^.95") || jtarr[ii].StartsWith("5.25^0.95"))
                        {
                            //属于第二阶梯
                            cbmodel.f_dejtsl = jtarr[ii].Split('^')[2];
                            cbmodel.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength(6.2 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dejtsl), 2);

                        }
                        else if (jtarr[ii].StartsWith("7.05^.95") || jtarr[ii].StartsWith("7.05^0.95"))
                        {
                            //属于第三阶梯
                            cbmodel.f_dsjtsl = jtarr[ii].Split('^')[2];
                            cbmodel.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(8 * Eva.Library.Text.NumberTool.Parse(cbmodel.f_dsjtsl), 2);

                        }
                    }
                    #endregion

                    #region 将客户基础信息放入抄表model
                    cbmodel.sys_creatuserid = "1570";
                        cbmodel.sys_creatusername = "NB远传自动抄表";
                        cbmodel.sys_creatdate = currentTime;
                        cbmodel.sys_lastedituserid = "1570";
                        cbmodel.sys_lasteditusername = "NB远传自动抄表";
                        cbmodel.sys_lasteditdate = currentTime;
                        cbmodel.sys_deldate = blankTime;
                        cbmodel.sys_delflag = "0";
                        cbmodel.f_cb_cbbh = commonclass.commonclass.getBusinessNum("CB", "", null);
                        cbmodel.f_khbh = khmodel.f_khbh;
                        cbmodel.f_khbhid = khmodel.sys_id.ToString();
                        cbmodel.f_sqzm = sqzm;
                        cbmodel.f_bqzm = bqzm;
                        cbmodel.f_bqsl = bqsl;
                        cbmodel.f_sqsl = khmodel.f_bqsl;
                        cbmodel.f_cbyid = "1570";
                        cbmodel.f_cbyname = "NB远传自动抄表";
                        cbmodel.f_cbsj = zhcbsj;
                        cbmodel.f_bk = "正常";
                        cbmodel.f_bkid = "05430001";
                        cbmodel.f_zt = "已算费";
                        cbmodel.f_ztid = "2";
                        cbmodel.f_ly = "远传表自动计算";
                        cbmodel.f_lyid = "05450004";
                        cbmodel.f_sbbh = khmodel.f_sbbh;
                        cbmodel.f_sbbhid = khmodel.f_sbbhid;
                        cbmodel.f_sblx = khmodel.f_sblx;
                        cbmodel.f_sblxid = khmodel.f_sblxid;
                        cbmodel.f_yslx = khmodel.f_yslx;
                        cbmodel.f_yslxid = khmodel.f_yslxid;
                        cbmodel.f_lxtkhh = khmodel.f_lxth;
                        cbmodel.f_cbbh = khmodel.f_cbbh;
                        cbmodel.f_cbbhid = khmodel.f_cbbhid;
                        cbmodel.f_cbmc = khmodel.f_cbmc;
                        cbmodel.f_yhbh = khmodel.f_yhbh;
                        cbmodel.f_yhbhid = khmodel.f_yhbhid;
                        cbmodel.f_yhm = khmodel.f_yhm;
                        cbmodel.f_jfm = khmodel.f_jfm;
                        cbmodel.f_dh = khmodel.f_dh;
                        cbmodel.f_dz = khmodel.f_dz;
                        cbmodel.f_dy = khmodel.f_dy;
                        cbmodel.f_dyid = khmodel.f_dyid;
                        cbmodel.f_sc = khmodel.f_sc;
                        cbmodel.f_scid = khmodel.f_scid;
                        cbmodel.f_qy = khmodel.f_qy;
                        cbmodel.f_qyid = khmodel.f_qyid;
                        cbmodel.f_pq = khmodel.f_pq;
                        cbmodel.f_pqid = khmodel.f_pqid;
                        cbmodel.f_kj = khmodel.f_sbkj;
                        cbmodel.f_kjid = khmodel.f_sbkjid;
                        cbmodel.f_ztkhh = khmodel.f_ztkhh;
                        cbmodel.f_ztsbh = khmodel.f_ztsbh;
                        cbmodel.f_ztyhh = khmodel.f_ztyhh;
                        cbmodel.f_rs = khmodel.f_rs;
                        cbmodel.f_khfz = khmodel.f_khfz;
                        cbmodel.f_khfzid = khmodel.f_khfzid;
                        cbmodel.f_sjljsyl = khmodel.f_nljgl;
                        cbmodel.f_pgsj = blankTime;
                        cbmodel.f_jfsj = blankTime;
                        //写入抄表表瞬间累积欠费字段
                        double ljqf = Eva.Library.Text.NumberTool.Parse(khmodel.f_ljqf);
                        cbmodel.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf + bqje, 2);




                        #endregion

                        #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                        {
                            double qsqpjsl = Eva.Library.Text.NumberTool.Parse(khmodel.f_qsqpjsl);

                            double zf = 0;
                            if (qsqpjsl != 0)
                            {
                                zf = (Eva.Library.Text.NumberTool.Parse(bqsl) - qsqpjsl) / qsqpjsl;
                            }

                            DataRow[] jtsjdr = jtsjdt.Select("f_yslxid='" + khmodel.f_yslxid + "'");
                            double yqzf = Eva.Library.Text.NumberTool.Parse(jtsjdr[0]["f_zfbl"].ToString()) / 100;


                            bool sftx = true;

                            if (-yqzf <= zf)
                            {
                                if (zf <= yqzf)
                                {
                                    sftx = false;
                                }
                            }

                            if (sftx)
                            {
                                cbmodel.f_sfsfts = "true";
                            }
                            else
                            {
                                cbmodel.f_sfsfts = "false";
                            }
                        }
                        _idal_tbl_ld_cbiao.Add(cbmodel, t);
                        #endregion


                        #region 最新平均水量

                        //【前三期平均水量】【前六期平均水量】

                        string f_qsqpjsl = "";
                        string f_qlqpjsl = "";
                        CountPJSL(khmodel.sys_id, ref f_qsqpjsl, ref f_qlqpjsl, bqsl, null);
                        #endregion

                        #region 推送数据到客户表
                        //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                        //【前三期平均水量】【前六期平均水量】(最新三或六期)
                        //【累计欠费】

                        #region 记录旧值
                        string f_zhcbrq_old = khmodel.f_zhcbrq.ToString("yyyy-MM-dd");
                        string f_sqzm_old = khmodel.f_sqzm;
                        string f_bqzm_old = khmodel.f_bqzm;
                        string f_nljgl_old = khmodel.f_nljgl;
                        string f_ljgl_old = khmodel.f_ljgl;
                        string f_qlqpjsl_old = khmodel.f_qlqpjsl;
                        string f_qsqpjsl_old = khmodel.f_qsqpjsl;
                        string f_sqsl_old = khmodel.f_sqsl;
                        string f_bqsl_old = khmodel.f_bqsl;
                        string f_ljqf_old = khmodel.f_ljqf;
                        #endregion
                        //计算新的抄表周期
                        DateTime cbsj;
                        DateTime today = DateTime.Now.Date;
                        cbsj = Convert.ToDateTime(khmodel.f_zhcbrq, dtFormat);

                        int cbzq = 0;
                        if (int.TryParse(khmodel.f_cbzq, out cbzq))
                        {

                        }
                        else
                        {
                            cbzq = 1;
                        }
                        int sbyear = cbsj.Year;
                        int sbmonth = cbsj.Month + cbzq + 1;

                        if (sbmonth > 12)
                        {
                            sbyear++;
                            sbmonth = sbmonth - 12;
                        }

                        cbsj = new DateTime(sbyear, sbmonth, 1);
                        cbsj = cbsj.AddDays(-1);
                        while (cbsj < today)
                        {
                            cbsj = cbsj.AddMonths(cbzq);
                        }
                        khmodel.f_zhcbrq = cbsj;
                        khmodel.f_sqzm = khmodel.f_bqzm;
                        khmodel.f_bqzm = bqzm;

                        double yz = Eva.Library.Text.NumberTool.Parse(khmodel.f_nljgl);
                        double xz = yz + Eva.Library.Text.NumberTool.Parse(bqsl);
                        khmodel.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2);

                        double ljgl = Eva.Library.Text.NumberTool.Parse(khmodel.f_ljgl);
                        double new_ljgl = ljgl + Eva.Library.Text.NumberTool.Parse(bqsl);
                        khmodel.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

                        khmodel.f_qsqpjsl = f_qsqpjsl;
                        khmodel.f_qlqpjsl = f_qlqpjsl;

                        khmodel.f_sqsl = khmodel.f_bqsl;
                        khmodel.f_bqsl = bqsl.ToString();

                        ljqf = Eva.Library.Text.NumberTool.Parse(khmodel.f_ljqf);
                        double new_ljqf = ljqf + bqje;
                        khmodel.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);

                    _idal_tbl_ld_khb.Update(khmodel, "f_zhcbrq,f_sqzm,f_bqzm,f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_sqsl,f_bqsl,f_ljqf", t);

                        



                        if (logflag)
                        {
                            #region 写日志
                            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                            IDictionary<string, string> temp = new Dictionary<string, string>();
                            temp.Add("key", "f_zhcbrq");
                            temp.Add("oldvalue", f_zhcbrq_old);
                            temp.Add("newvalue", cbsj.ToString("yyyy-MM-dd"));
                            temp.Add("name", "最后抄表日期");
                            array.Add(temp);
                            IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                            f_bqzm.Add("key", "f_bqzm");
                            f_bqzm.Add("oldvalue", f_bqzm_old);
                            f_bqzm.Add("newvalue", bqzm);
                            f_bqzm.Add("name", "本期止码 ");
                            array.Add(f_bqzm);
                            IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                            f_sqzm.Add("key", "f_sqzm");
                            f_sqzm.Add("oldvalue", f_sqzm_old);
                            f_sqzm.Add("newvalue", khmodel.f_bqzm);
                            f_sqzm.Add("name", "上期止码 ");
                            array.Add(f_sqzm);
                            IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                            f_nljgl.Add("key", "f_nljgl");
                            f_nljgl.Add("oldvalue", f_nljgl_old);
                            f_nljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2));
                            f_nljgl.Add("name", "年累计购量");
                            array.Add(f_nljgl);
                            IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                            f_ljgl.Add("key", "f_ljgl");
                            f_ljgl.Add("oldvalue", f_ljgl_old);
                            f_ljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2));
                            f_ljgl.Add("name", "累计购量");
                            array.Add(f_ljgl);
                            IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                            qsqpjsl_dic.Add("key", "qsqpjsl");
                            qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                            qsqpjsl_dic.Add("newvalue", f_qsqpjsl);
                            qsqpjsl_dic.Add("name", "前三期平均水量");
                            array.Add(qsqpjsl_dic);
                            IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                            qlqpjsl_dic.Add("key", "qlqpjsl");
                            qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                            qlqpjsl_dic.Add("newvalue", f_qlqpjsl);
                            qlqpjsl_dic.Add("name", "前六期平均水量");
                            array.Add(qlqpjsl_dic);
                            IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                            f_bqsl.Add("key", "f_bqsl");
                            f_bqsl.Add("oldvalue", f_bqsl_old);
                            f_bqsl.Add("newvalue", bqsl.ToString());
                            f_bqsl.Add("name", "本期水量 ");
                            array.Add(f_bqsl);
                            IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                            f_sqsl.Add("key", "f_bqsl");
                            f_sqsl.Add("oldvalue", f_sqsl_old);
                            f_sqsl.Add("newvalue", khmodel.f_bqsl);
                            f_sqsl.Add("name", "上期水量");
                            array.Add(f_sqsl);

                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", khmodel.sys_id.ToString(), "WaterDataCenterService", "NB远传表自动抄表", array, "", null);
                            #endregion
                        }

                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】
                    List<sara.dd.ldsw.model.tbl_ld_sbb> sbtemp = _idal_tbl_ld_sbb.GetList("f_sbbh='" + sbbh + "'", "", "*", "", "", t);
                    if (sbtemp.Count == 1)
                    {
                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = sbtemp[0];

                        string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                        string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                        string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                        string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;
                        string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                        string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                        string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                        string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;


                        double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                        double now_ljgl = sb_ljgl + Eva.Library.Text.NumberTool.Parse(bqsl);
                        model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);

                        double sb_nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                        double now_nljgl = sb_nljgl + Eva.Library.Text.NumberTool.Parse(bqsl);
                        model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_nljgl, 2);


                        model_tbl_ld_sbb.f_qsqpjsl = f_qsqpjsl;
                        model_tbl_ld_sbb.f_qlqpjsl = f_qlqpjsl;


                        model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
                        model_tbl_ld_sbb.f_bqzm = bqzm;
                        model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                        model_tbl_ld_sbb.f_bqsl = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);

                        _idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_ljgl,f_nljgl,f_qsqpjsl,f_qlqpjsl,f_sqzm,f_bqzm,f_sqsl,f_bqsl", t);
                        #endregion
                        if (logflag)
                        {
                            #region 写日志

                            List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                            IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                            sb_f_nljgl.Add("key", "f_nljgl");
                            sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                            sb_f_nljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2));
                            sb_f_nljgl.Add("name", "年累计购量");
                            list.Add(sb_f_nljgl);

                            IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                            sb_f_ljgl.Add("key", "f_ljgl");
                            sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                            sb_f_ljgl.Add("newvalue", Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2));
                            sb_f_ljgl.Add("name", "累计购量");
                            list.Add(sb_f_ljgl);

                            IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                            sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                            sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                            sb_f_qsqpjsl.Add("newvalue", f_qsqpjsl);
                            sb_f_qsqpjsl.Add("name", "前三期平均水量");
                            list.Add(sb_f_qsqpjsl);

                            IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                            sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                            sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                            sb_f_qlqpjsl.Add("newvalue", f_qlqpjsl);
                            sb_f_qlqpjsl.Add("name", "前六期平均水量");
                            list.Add(sb_f_qlqpjsl);

                            IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                            sb_f_bqzm.Add("key", "f_bqzm");
                            sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                            sb_f_bqzm.Add("newvalue", bqzm);
                            sb_f_bqzm.Add("name", "本期止码");
                            list.Add(sb_f_bqzm);
                            IDictionary<string, string> sb_f_sqzm = new Dictionary<string, string>();
                            sb_f_sqzm.Add("key", "f_sqzm");
                            sb_f_sqzm.Add("oldvalue", sb_f_sqzm_old);
                            sb_f_sqzm.Add("newvalue", model_tbl_ld_sbb.f_sqzm);
                            sb_f_sqzm.Add("name", "上期止码");
                            list.Add(sb_f_sqzm);
                            IDictionary<string, string> sb_f_bqsl = new Dictionary<string, string>();
                            sb_f_bqsl.Add("key", "f_bqsl");
                            sb_f_bqsl.Add("oldvalue", sb_f_bqsl_old);
                            sb_f_bqsl.Add("newvalue", bqsl.ToString());
                            sb_f_bqsl.Add("name", "本期水量");
                            list.Add(sb_f_bqsl);
                            IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                            sb_f_sqsl.Add("key", "f_sqsl");
                            sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                            sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                            sb_f_sqsl.Add("name", "上期水量");
                            list.Add(sb_f_sqsl);
                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "WaterDataCenterService", "NB远传表自动抄表", list, "", null);
                            #endregion
                        }


                    }
                        
                    
                }
                t.getTrans().commit();

            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                return Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

            }
            return "true";

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBack(string json, string columns, string clientInf, string type)
        {
            //首先保存数据

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans t = null;
            try
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                sara.dd.ldsw.model.tbl_ld_ycbgl model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ycbgl>(json);


                //判断是否为最后一条可回滚数据
                string sql = "SELECT max(sys_id) FROM TBL_LD_YCBGL WHERE f_value1='" + type + "'";
                string maxid = _iAccessData.GetSingle(sql).ToString();
                if (maxid == model.sys_id.ToString())
                {
                    //创建导入进程0/100
                    sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycbhg" + model.sys_id + ".txt", "0/100");

                    //对应抄本编号id
                    string cbbhid = "";
                    if (type == "0")
                    {
                        cbbhid = "4736";
                    }
                    else
                    {
                        cbbhid = "4796";
                    }
                    //获取远传表的的所有用户
                    string khquerysql = "SELECT * FROM tbl_ld_khb WHERE f_cbbhid = '" + cbbhid + "' and f_ztid in ('0','4') and sys_delflag='0'";
                    DataTable khdt = _iAccessData.Query(khquerysql).Tables[0];
                    //获取远传表用户的所有水表
                    string sbquerysql = "SELECT * FROM tbl_ld_sbb WHERE sys_id in (select f_sbbhid from tbl_ld_khb where f_cbbhid = '" + cbbhid + "' and f_ztid in ('0','4') and sys_delflag='0') and f_ztid in ('0','4') and sys_delflag='0'";
                    DataTable sbdt = _iAccessData.Query(sbquerysql).Tables[0];
                    //获取远传表用户所有已算费的数据
                    string cbquerysql = "SELECT * FROM tbl_ld_cbiao WHERE f_cbbhid = '" + cbbhid + "' order by sys_id desc";
                    DataTable cbdt = _iAccessData.Query(cbquerysql).Tables[0];
                    //获取所有抄表的子表信息
                    string zbquerysql = "SELECT * FROM tbl_ld_ycbglzb WHERE FK_TBL_LD_YCBGL_SYS_ID='" + model.sys_id + "' AND f_bqzm is not null";
                    DataTable zbdt = _iAccessData.Query(zbquerysql).Tables[0];
                    ////获取所有阶梯水价
                    //string jtsjquerysql = "SELECT * FROM tbl_ldbm_jtsj";
                    //DataTable jtsjdt = _iAccessData.Query(jtsjquerysql).Tables[0];
                    //待更新的khmodellist
                    List<sara.dd.ldsw.model.tbl_ld_khb> khlist = new List<ldsw.model.tbl_ld_khb>();
                    //待更新的sbmodellist
                    List<sara.dd.ldsw.model.tbl_ld_sbb> sblist = new List<ldsw.model.tbl_ld_sbb>();
                    //需要删除的抄表sys_id
                    string cbsysid = "";
                    //需要删除的子表sys_id
                    string zbsysid = "";
                    //时间信息
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    DateTimeFormatInfo dtFormat2 = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
                    dtFormat2.ShortDatePattern = "yyyy/MM/dd HH:mm:ss";
                    System.DateTime currentTime = new System.DateTime();
                    currentTime = System.DateTime.Now;
                    DateTime blankTime = DateTime.Parse("1900-01-01");
                    //userinfo信息
                    IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                    //循环子表抄表数据，逐条回滚
                    for (int i = 0; i < zbdt.Rows.Count; i++)
                    {
                        DataRow dr = zbdt.Rows[i];
                        DataRow[] cbdrs = cbdt.Select("f_khbh='" + dr["f_khbh"].ToString() + "' and f_sqzm='" + dr["f_sqzm"].ToString() + "' and f_bqzm='" + dr["f_bqzm"].ToString() + "' and f_ztid='2'", "sys_id desc");
                        DataRow[] khdrs = khdt.Select("f_khbh='" + dr["f_khbh"].ToString() + "'");
                        DataRow[] sbdrs = sbdt.Select("f_khbh='" + dr["f_khbh"].ToString() + "'");
                        if (cbdrs.Length > 0 && khdrs.Length > 0 && sbdrs.Length > 0)
                        {
                            //记录待删抄表sys_id
                            cbsysid += cbdrs[0]["sys_id"].ToString() + ",";
                            zbsysid += dr["sys_id"].ToString() + ",";
                            //本期水量
                            double bqsl = Eva.Library.Text.NumberTool.Parse(cbdrs[0]["f_bqsl"].ToString());
                            #region 回滚客户表数据

                            //上一条抄表记录
                            DataRow[] dt_sytcbjl = cbdt.Select("f_khbh='" + dr["f_khbh"].ToString() + "' and f_ztid <> '0' and sys_id <> '" + cbdrs[0]["sys_id"].ToString() + "'", "f_cbsj desc");


                            List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_khb>(this.ToDataTable(khdrs));
                            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = khmodellist[0];

                            //计算新的抄表周期
                            DateTime cbsj;
                            cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);
                            int sbyear = cbsj.Year;
                            int sbmonth = cbsj.Month + 1;
                            if (sbmonth == 13)
                            {
                                sbyear++;
                                sbmonth = 1;
                            }
                            cbsj = new DateTime(sbyear, sbmonth, 1);
                            int cbzq = 0;
                            if (int.TryParse(model_tbl_ld_khb.f_cbzq, out cbzq))
                            {

                            }
                            else
                            {
                                cbzq = 1;
                            }

                            cbsj = cbsj.AddMonths(-cbzq);



                            cbsj = cbsj.AddDays(-1);


                            if (dt_sytcbjl.Length > 0)
                            {
                                model_tbl_ld_khb.f_zhcbrq = cbsj;
                                model_tbl_ld_khb.f_bqzm = dt_sytcbjl[0]["f_bqzm"].ToString();
                                model_tbl_ld_khb.f_sqzm = dt_sytcbjl[0]["f_sqzm"].ToString();

                                model_tbl_ld_khb.f_bqsl = dt_sytcbjl[0]["f_bqsl"].ToString();
                                model_tbl_ld_khb.f_sqsl = dt_sytcbjl[0]["f_sqsl"].ToString();
                                model_tbl_ld_khb.f_qsqpjsl = dt_sytcbjl[0]["f_qsqpjsl"].ToString();
                                model_tbl_ld_khb.f_qlqpjsl = dt_sytcbjl[0]["f_qlqpjsl"].ToString();
                            }
                            else
                            {
                                model_tbl_ld_khb.f_zhcbrq = cbsj;

                                model_tbl_ld_khb.f_bqzm = cbdrs[0]["f_sqzm"].ToString();
                                model_tbl_ld_khb.f_sqzm = "";

                                model_tbl_ld_khb.f_bqsl = cbdrs[0]["f_sqsl"].ToString();
                                model_tbl_ld_khb.f_sqsl = "";
                                model_tbl_ld_khb.f_qsqpjsl = "";
                                model_tbl_ld_khb.f_qlqpjsl = "";
                            }

                            model_tbl_ld_khb.f_nljgl = cbdrs[0]["f_sjljsyl"].ToString();

                            double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                            double new_ljgl = ljgl - bqsl;
                            model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);


                            double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                            double new_ljqf = ljqf - Eva.Library.Text.NumberTool.Parse(cbdrs[0]["f_bqje"].ToString());
                            model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);

                            khlist.Add(model_tbl_ld_khb);


                            #endregion

                            #region 回滚水表表数据
                            //【年累计购量】【累计购量】 
                            //【前三期平均水量】【前六期平均水量】

                            //【上期止码】【本期止码】【上期水量】【本期水量】


                            List<sara.dd.ldsw.model.tbl_ld_sbb> sbmodellist = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_sbb>(this.ToDataTable(sbdrs));
                            sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = sbmodellist[0];


                            if (dt_sytcbjl.Length > 0)
                            {
                                model_tbl_ld_sbb.f_bqzm = dt_sytcbjl[0]["f_bqzm"].ToString();
                                model_tbl_ld_sbb.f_sqzm = dt_sytcbjl[0]["f_sqzm"].ToString();

                                model_tbl_ld_sbb.f_bqsl = dt_sytcbjl[0]["f_bqsl"].ToString();
                                model_tbl_ld_sbb.f_sqsl = dt_sytcbjl[0]["f_sqsl"].ToString();

                                model_tbl_ld_sbb.f_qsqpjsl = dt_sytcbjl[0]["f_qsqpjsl"].ToString();
                                model_tbl_ld_sbb.f_qlqpjsl = dt_sytcbjl[0]["f_qlqpjsl"].ToString();
                            }
                            else
                            {
                                model_tbl_ld_sbb.f_bqzm = cbdrs[0]["f_sqzm"].ToString();
                                model_tbl_ld_sbb.f_sqzm = "";

                                model_tbl_ld_sbb.f_bqsl = cbdrs[0]["f_sqsl"].ToString();
                                model_tbl_ld_sbb.f_sqsl = "";
                                model_tbl_ld_sbb.f_qsqpjsl = "";
                                model_tbl_ld_sbb.f_qlqpjsl = "";
                            }
                            model_tbl_ld_sbb.f_nljgl = cbdrs[0]["f_sjljsyl"].ToString();

                            double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                            double now_ljgl = sb_ljgl - bqsl;
                            model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);

                            sblist.Add(model_tbl_ld_sbb);


                            #endregion
                        }

                        if ((i + 1) % 501 == 0)
                        {


                            //开启事务
                            t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                            t.getTrans().begin();

                            //删除抄表记录
                            cbsysid = cbsysid.TrimEnd(',');
                            string delcbsql = "DELETE FROM tbl_ld_cbiao WHERE sys_id in(" + cbsysid + ")";
                            t.ExecuteSql(delcbsql);
                            cbsysid = "";

                            //删除子表记录
                            zbsysid = zbsysid.TrimEnd(',');
                            string delzbsql = "DELETE FROM tbl_ld_ycbglzb WHERE sys_id in(" + zbsysid + ")";
                            t.ExecuteSql(delzbsql);
                            zbsysid = "";

                            //批量更新客户表
                            Dictionary<string, object[]> result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                            t.BatchUpdate("tbl_ld_khb", "sys_id", result);
                            khlist = new List<ldsw.model.tbl_ld_khb>();

                            //批量更新水表表
                            result = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_sbb>(sblist);
                            t.BatchUpdate("tbl_ld_sbb", "sys_id", result);
                            sblist = new List<ldsw.model.tbl_ld_sbb>();


                            t.getTrans().commit();

                            sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycbhg" + model.sys_id + ".txt", i.ToString() + "/" + zbdt.Rows.Count.ToString());

                        }

                    }

                    //循环结束
                    t = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans(Eva.Library.Configuration.ConfigurationManager.AppSettings["AccessOracleLargConnectionString"].ToString());
                    t.getTrans().begin();
                    Dictionary<string, object[]> result2 = null;
                    if (cbsysid.Length > 0)
                    {
                        //删除抄表记录
                        cbsysid = cbsysid.TrimEnd(',');
                        string delcbsql = "DELETE FROM tbl_ld_cbiao WHERE sys_id in(" + cbsysid + ")";
                        t.ExecuteSql(delcbsql);
                        cbsysid = "";
                    }
                    if (zbsysid.Length > 0)
                    {
                        //删除子表记录
                        zbsysid = zbsysid.TrimEnd(',');
                        string delzbsql = "DELETE FROM tbl_ld_ycbglzb WHERE sys_id in(" + zbsysid + ")";
                        t.ExecuteSql(delzbsql);
                        zbsysid = "";
                    }
                    if (khlist.Count > 0)
                    {
                        //批量更新客户表
                        result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_khb>(khlist);
                        t.BatchUpdate("tbl_ld_khb", "sys_id", result2);
                        khlist = new List<ldsw.model.tbl_ld_khb>();
                    }

                    if (sblist.Count > 0)
                    {
                        //批量更新水表表
                        result2 = t.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_sbb>(sblist);
                        t.BatchUpdate("tbl_ld_sbb", "sys_id", result2);
                        sblist = new List<ldsw.model.tbl_ld_sbb>();
                    }





                    t.getTrans().commit();

                    sara.dd.ldsw.commonclass.FileOperation.writeFile(Eva.Library.Global.AppRootPath + "ycbhg" + model.sys_id + ".txt", "100/100");

                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "只能回滚最后一条记录！";
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
                string s = sara.dd.ldsw.commonclass.FileOperation.ReadFile(Eva.Library.Global.AppRootPath + "ycb" + sys_id + ".txt");

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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Readhg(string sys_id)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";


            try
            {
                string s = sara.dd.ldsw.commonclass.FileOperation.ReadFile(Eva.Library.Global.AppRootPath + "ycbhg" + sys_id + ".txt");

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

                columns += "^" + "f_ywbh";

                columns += "^" + "f_dcr";

                columns += "^" + "f_dcsj";

                columns += "^" + "f_drr";

                columns += "^" + "f_drsj";

                columns += "^" + "f_cjcbsjzxr";

                columns += "^" + "f_cjcbsj";

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

        private void CountPJSL(int khbhid, ref string f_qsqpjsl, ref string f_qlqpjsl, string bqsl, DataTable khdt, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            DataTable dt_pjsl = null;

            if (t == null)
            {
                _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                dt_pjsl = _iAccessData.Query("select f_bqsl,rownum from ( select f_bqsl from tbl_ld_cbiao where f_khbhid='" + khbhid + "' and f_ztid <> '0' and f_ztid <> '9'  order by f_cbsj desc) t where rownum<6").Tables[0];
            }
            else
            {
                dt_pjsl = t.Query("select f_bqsl,rownum from ( select f_bqsl from tbl_ld_cbiao where f_khbhid='" + khbhid + "' and f_ztid <> '0' and f_ztid <> '9' order by f_cbsj desc) t where rownum<6").Tables[0];
            }

            double qsqpjsl = double.Parse(bqsl); int count_qs = 1;
            double qlqpjsl = double.Parse(bqsl); int count_ql = 1;

            for (int i = 0; i < dt_pjsl.Rows.Count; i++)
            {
                if (i < 2)
                {
                    qsqpjsl += Eva.Library.Text.NumberTool.Parse(dt_pjsl.Rows[i]["f_bqsl"].ToString());
                    count_qs++;
                }
                qlqpjsl += Eva.Library.Text.NumberTool.Parse(dt_pjsl.Rows[i]["f_bqsl"].ToString());
                count_ql++;
            }
            if (count_qs != 0)
            {
                qsqpjsl = qsqpjsl / count_qs;
            }
            if (count_ql != 0)
            {
                qlqpjsl = qlqpjsl / count_ql;
            }
            f_qsqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(qsqpjsl, 2);
            f_qlqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(qlqpjsl, 2);
        }

        private void CountPJSL(int khbhid, ref string f_qsqpjsl, ref string f_qlqpjsl, string bqsl, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            DataTable dt_pjsl = null;

            if (t == null)
            {
                _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                dt_pjsl = _iAccessData.Query("select f_bqsl,rownum from ( select f_bqsl from tbl_ld_cbiao where f_khbhid='" + khbhid + "' and f_ztid <> '0' and f_ztid <> '9'  order by f_cbsj desc) t where rownum<6").Tables[0];
            }
            else
            {
                dt_pjsl = t.Query("select f_bqsl,rownum from ( select f_bqsl from tbl_ld_cbiao where f_khbhid='" + khbhid + "' and f_ztid <> '0' and f_ztid <> '9' order by f_cbsj desc) t where rownum<6").Tables[0];
            }

            double qsqpjsl = double.Parse(bqsl); int count_qs = 1;
            double qlqpjsl = double.Parse(bqsl); int count_ql = 1;

            for (int i = 0; i < dt_pjsl.Rows.Count; i++)
            {
                if (i < 2)
                {
                    qsqpjsl += Eva.Library.Text.NumberTool.Parse(dt_pjsl.Rows[i]["f_bqsl"].ToString());
                    count_qs++;
                }
                qlqpjsl += Eva.Library.Text.NumberTool.Parse(dt_pjsl.Rows[i]["f_bqsl"].ToString());
                count_ql++;
            }
            if (count_qs != 0)
            {
                qsqpjsl = qsqpjsl / count_qs;
            }
            if (count_ql != 0)
            {
                qlqpjsl = qlqpjsl / count_ql;
            }
            f_qsqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(qsqpjsl, 2);
            f_qlqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(qlqpjsl, 2);
        }


        public DataTable ToDataTable(DataRow[] rows)
        {
            if (rows == null || rows.Length == 0) return null;
            DataTable tmp = rows[0].Table.Clone();  // 复制DataRow的表结构  
            foreach (DataRow row in rows)
                tmp.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  
            return tmp;
        }


    }
}









