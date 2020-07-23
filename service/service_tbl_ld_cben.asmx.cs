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
using System.Text;
using System.Data;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_cben 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_cben : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_cben _idal_tbl_ld_cben = new sara.dd.ldsw.dal.tbl_ld_cben();
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
                sara.dd.ldsw.model.tbl_ld_cben model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cben>(json);
                model.sys_lasteditdate = DateTime.Now;
                model.sys_creatdate = DateTime.Now;

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cben.Add(model, null);


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
                List<sara.dd.ldsw.model.tbl_ld_cben> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_cben>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cben.AddList(modellist, null);

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
            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
            string userid = clientInfoDic["userid"];
            string username = clientInfoDic["username"];
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                sara.dd.ldsw.model.tbl_ld_cben model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cben>(json);
                sara.dd.ldsw.model.tbl_ld_cben model_old = _idal_tbl_ld_cben.GetList(" sys_id='" + model.sys_id.ToString() + "'", "", "*", "", "", t)[0];
                columns = FormatColumns(columns).Replace("^", ",");
                model.sys_lasteditdate = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cben.Update(model, columns, t);

                //修改客户信息
                UpdateKHB(model, clientInf, t);
                //写自己的日志

                #region 写入日志
                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                #region 对比各个业务子段，将不同的写入array
                if (model.f_cbbh != model_old.f_cbbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbbh");
                    temp.Add("oldvalue", model_old.f_cbbh);
                    temp.Add("newvalue", model.f_cbbh);
                    temp.Add("name", "抄表编号");
                    array.Add(temp);
                }
                if (model.f_cbmc != model_old.f_cbmc)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbmc");
                    temp.Add("oldvalue", model_old.f_cbmc);
                    temp.Add("newvalue", model.f_cbmc);
                    temp.Add("name", "抄表名称");
                    array.Add(temp);
                }
                if (model.f_cbzq != model_old.f_cbzq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbzq");
                    temp.Add("oldvalue", model_old.f_cbzq);
                    temp.Add("newvalue", model.f_cbzq);
                    temp.Add("name", "抄表周期");
                    array.Add(temp);
                }
                if (model.f_ksyf != model_old.f_ksyf)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ksyf");
                    temp.Add("oldvalue", model_old.f_ksyf);
                    temp.Add("newvalue", model.f_ksyf);
                    temp.Add("name", "开始月份");
                    array.Add(temp);
                }
                if (model.f_cbymc != model_old.f_cbymc)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbymc");
                    temp.Add("oldvalue", model_old.f_cbymc);
                    temp.Add("newvalue", model.f_cbymc);
                    temp.Add("name", "抄表员名称");
                    array.Add(temp);
                }
                if (model.f_cbyid != model_old.f_cbyid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbyid");
                    temp.Add("oldvalue", model_old.f_cbyid);
                    temp.Add("newvalue", model.f_cbyid);
                    temp.Add("name", "抄表员id");
                    array.Add(temp);
                }
                if (model.f_cbyphoto != model_old.f_cbyphoto)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbyphoto");
                    temp.Add("oldvalue", model_old.f_cbyphoto);
                    temp.Add("newvalue", model.f_cbyphoto);
                    temp.Add("name", "抄表员photo");
                    array.Add(temp);
                }
                if (model.f_zt != model_old.f_zt)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zt");
                    temp.Add("oldvalue", model_old.f_zt);
                    temp.Add("newvalue", model.f_zt);
                    temp.Add("name", "状态");
                    array.Add(temp);
                }
                if (model.f_ztid != model_old.f_ztid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ztid");
                    temp.Add("oldvalue", model_old.f_ztid);
                    temp.Add("newvalue", model.f_ztid);
                    temp.Add("name", "状态id");
                    array.Add(temp);
                }
                if (model.f_value1 != model_old.f_value1)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_value1");
                    temp.Add("oldvalue", model_old.f_value1.Replace("1", "手持机-只抄不收").Replace("2", "手持机-抄表缴费"));
                    temp.Add("newvalue", model.f_value1.Replace("1", "手持机-只抄不收").Replace("2", "手持机-抄表缴费"));
                    temp.Add("name", "操作类型");
                    array.Add(temp);
                }
                if (model.f_bz != model_old.f_bz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_bz");
                    temp.Add("oldvalue", model_old.f_bz);
                    temp.Add("newvalue", model.f_bz);
                    temp.Add("name", "备注");
                    array.Add(temp);
                }
                #endregion
                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_cben", model.sys_id.ToString(), "tbl_ld_cben_detail", "抄本信息修改", array, clientInf, t);
                #endregion
                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
                t.getTrans().commit();
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
                List<sara.dd.ldsw.model.tbl_ld_cben> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_cben>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cben.UpdateList(modellist, columns, null);

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
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                //string sql = "select * from TBL_LD_KHB  where " + whereString;
                string sql = "select count(*) from tbl_ld_khb where f_cbbhid in(select sys_id from tbl_ld_cben where " + whereString + ")";
                string count = _iAccessData.GetSingle(sql).ToString();

              
                if (count != "0")
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "您所选定的信息，在客户表中存在引用，所以不能删除。";
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_cben.Delete(whereString, null);
                    NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);
                }
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
                resultDic["message"] = _idal_tbl_ld_cben.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
                resultDic["message"] = _idal_tbl_ld_cben.GetCount(whereString, null);

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

                //string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_cben>(_idal_tbl_ld_cben.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);
                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_cben.GetDataTableForPC(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null));
                string message = "{\"total\":\"" + _idal_tbl_ld_cben.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_cben.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_cben.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        /// 算费
        /// </summary>
        /// <param name="json"></param>
        /// <param name="columns"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Count(string cbenid, string pgid, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";



            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

            string userid = clientInfoDic["userid"];
            string username = clientInfoDic["username"];


            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                //插入或更新，评估表
                string pgid_new = "";
                string cbbh = t.GetSingle("select f_cbbh from TBL_LD_CBEN where sys_id='" + cbenid + "' ").ToString();

                sara.dd.ldsw.idal.Itbl_ld_pgb idal_tbl_ld_pgb = new sara.dd.ldsw.dal.tbl_ld_pgb();
                sara.dd.ldsw.model.tbl_ld_pgb model_tbl_ld_pgb = new sara.dd.ldsw.model.tbl_ld_pgb();
                if (pgid == "")
                {
                    model_tbl_ld_pgb.sys_id = 0;
                    model_tbl_ld_pgb.sys_orderid = "";
                    model_tbl_ld_pgb.sys_creatuserid = userid;
                    model_tbl_ld_pgb.sys_creatusername = username;
                    model_tbl_ld_pgb.sys_creatdate = DateTime.Now;
                    model_tbl_ld_pgb.sys_lastedituserid = userid;
                    model_tbl_ld_pgb.sys_lasteditusername = username;
                    model_tbl_ld_pgb.sys_lasteditdate = DateTime.Now;
                    model_tbl_ld_pgb.sys_deluserid = "";
                    model_tbl_ld_pgb.sys_delusername = "";
                    model_tbl_ld_pgb.sys_deldate = DateTime.Parse("1900-1-1");
                    model_tbl_ld_pgb.sys_delflag = "0";
                    model_tbl_ld_pgb.f_value1 = cbenid;
                    model_tbl_ld_pgb.f_value2 = "";
                    model_tbl_ld_pgb.f_value3 = "";
                    model_tbl_ld_pgb.f_value4 = "";
                    model_tbl_ld_pgb.f_value5 = "";
                    model_tbl_ld_pgb.f_value6 = "";
                    model_tbl_ld_pgb.f_value7 = "";
                    model_tbl_ld_pgb.f_value8 = "";
                    model_tbl_ld_pgb.f_value9 = "";
                    model_tbl_ld_pgb.f_value10 = "";
                    model_tbl_ld_pgb.f_pgr = username;
                    model_tbl_ld_pgb.f_pgrid = userid;
                    model_tbl_ld_pgb.f_pgsj = DateTime.Now;
                    model_tbl_ld_pgb.f_zt = "已算费";
                    model_tbl_ld_pgb.f_ztid = "1";
                    model_tbl_ld_pgb.f_pgpcmc = cbbh + "-" + DateTime.Now.ToString("yyyy-MM") + "-" + Eva.Library.Text.NumberTool.GetNoRepeatNumber();
                    model_tbl_ld_pgb.f_ly = "pc";
                    model_tbl_ld_pgb.f_lyid = "05830001";
                    model_tbl_ld_pgb.f_bz = "";
                    model_tbl_ld_pgb.f_pgbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("pg", "", t);
                    pgid_new = idal_tbl_ld_pgb.Add(model_tbl_ld_pgb, t);
                }
                else
                {
                    model_tbl_ld_pgb = idal_tbl_ld_pgb.GetList("sys_id='" + pgid + "'", "", "*", "", "", t)[0];
                    model_tbl_ld_pgb.f_zt = "已算费";
                    model_tbl_ld_pgb.f_ztid = "1";
                    idal_tbl_ld_pgb.Update(model_tbl_ld_pgb, "f_zt,f_ztid", t);
                }

                //获取本次需要计算的数据：此抄本，此评估的数据
                StringBuilder sb = new StringBuilder();
                sb.Append("select f_waterrent(t.f_khbhid,t.f_bqsl,'1') as je,");//79^19  水费^污水处理费
                sb.Append(" t.* from tbl_ld_cbiao t where t.f_cbbhid='" + cbenid + "' and t.f_ztid='1'");
                if (pgid == "")
                {
                    sb.Append(" and t.f_pgbhid is null");
                }
                else
                {
                    sb.Append(" and t.f_pgbhid='" + pgid + "'");
                }
                DataTable dt_tbl_ld_cbiao = t.Query(sb.ToString()).Tables[0];


                sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                sara.dd.ldsw.idal.Itbl_ld_cbiao idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
                //逐个计算,并更新，并写入客户表（累计欠费，累加）,并写日志
                for (int i = 0; i < dt_tbl_ld_cbiao.Rows.Count; i++)
                {
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id = ('" + dt_tbl_ld_cbiao.Rows[i]["f_khbhid"].ToString() + "') ", "", "*", "", "", t)[0];

                    string sf = dt_tbl_ld_cbiao.Rows[i]["je"].ToString().Split('|')[0].Split('^')[0];
                    string pwf = dt_tbl_ld_cbiao.Rows[i]["je"].ToString().Split('|')[0].Split('^')[1];
                    

                    string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
                    if (model_tbl_ld_khb.f_ljqf == null || model_tbl_ld_khb.f_ljqf == "")
                    {
                        model_tbl_ld_khb.f_ljqf = "0";
                    }

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    ljqf += Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf);
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf, 2);


                    #region 客户表写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                    f_ljqf.Add("key", "f_ljqf");
                    f_ljqf.Add("oldvalue", f_ljqf_old);
                    f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                    f_ljqf.Add("name", "累计欠费");
                    array.Add(f_ljqf);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cben_cbiao_treelist", "算费", array, clientInf, t);
                    #endregion

                    //更新客户表
                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljqf", t);


                    //此时抄表记录是“抄表”状态，所以肯定在运行库中
                    //更新抄表表，水费、污水处理费、状态

                    sara.dd.ldsw.model.tbl_ld_cbiao model_tbl_ld_cbiao = idal_tbl_ld_cbiao.GetList("sys_id='" + dt_tbl_ld_cbiao.Rows[i]["sys_id"].ToString() + "'", "", "", "*", "", "", t)[0];
                    model_tbl_ld_cbiao.f_zt = "已算费";
                    model_tbl_ld_cbiao.f_ztid = "2";
                    model_tbl_ld_cbiao.f_sf = sf;
                    model_tbl_ld_cbiao.f_pwf = pwf;
                    model_tbl_ld_cbiao.f_bqje = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf),2);
                    int ss = dt_tbl_ld_cbiao.Rows[i]["je"].ToString().IndexOf('|');
                    model_tbl_ld_cbiao.f_sfjl = dt_tbl_ld_cbiao.Rows[i]["je"].ToString().Substring(ss + 1);
                    #region 阶梯水价分析
                    model_tbl_ld_cbiao.f_dyjtsl = "0";
                    model_tbl_ld_cbiao.f_dyjtsf = "0";
                    model_tbl_ld_cbiao.f_dejtsl = "0";
                    model_tbl_ld_cbiao.f_dejtsf = "0";
                    model_tbl_ld_cbiao.f_dsjtsl = "0";
                    model_tbl_ld_cbiao.f_dsjtsf = "0";

                    string[] jtarr = model_tbl_ld_cbiao.f_sfjl.Split('|');


                    for(int ii=0;ii< jtarr.Length; ii++)
                    {
                        
                        if(jtarr[ii].StartsWith("3.95^.95") || jtarr[ii].StartsWith("3.95^0.95"))
                        {
                            //属于第一阶梯
                            model_tbl_ld_cbiao.f_dyjtsl = jtarr[ii].Split('^')[2];
                            model_tbl_ld_cbiao.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(4.9*Eva.Library.Text.NumberTool.Parse(model_tbl_ld_cbiao.f_dyjtsl), 2);
                        }
                        else if (jtarr[ii].StartsWith("5.25^.95") || jtarr[ii].StartsWith("5.25^0.95"))
                        {
                            //属于第二阶梯
                            model_tbl_ld_cbiao.f_dejtsl = jtarr[ii].Split('^')[2];
                            model_tbl_ld_cbiao.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength(6.2 * Eva.Library.Text.NumberTool.Parse(model_tbl_ld_cbiao.f_dejtsl), 2);

                        }
                        else if (jtarr[ii].StartsWith("7.05^.95") || jtarr[ii].StartsWith("7.05^0.95"))
                        {
                            //属于第三阶梯
                            model_tbl_ld_cbiao.f_dsjtsl = jtarr[ii].Split('^')[2];
                            model_tbl_ld_cbiao.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(8 * Eva.Library.Text.NumberTool.Parse(model_tbl_ld_cbiao.f_dsjtsl), 2);

                        }
                    }
                    #endregion

                    if (pgid == "")
                    {
                        model_tbl_ld_cbiao.f_pgbhid = pgid_new;
                        model_tbl_ld_cbiao.f_pgbh = model_tbl_ld_pgb.f_pgbh;
                        model_tbl_ld_cbiao.f_pgr = model_tbl_ld_pgb.f_pgr;
                        model_tbl_ld_cbiao.f_pgrid = model_tbl_ld_pgb.f_pgrid;
                        model_tbl_ld_cbiao.f_pgpcmc = model_tbl_ld_pgb.f_pgpcmc;
                        model_tbl_ld_cbiao.f_pgsj = model_tbl_ld_pgb.f_pgsj;
                    }
                    idal_tbl_ld_cbiao.Update(model_tbl_ld_cbiao, "f_zt,f_ztid,f_sf,f_pwf,f_pgbhid,f_pgbh,f_pgr,f_pgrid,f_pgpcmc,f_pgsj,f_bqje,f_sfjl,f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf", t);

                }


                resultDic["result"] = "true";
                resultDic["message"] = "执行成功！";

                NewLog("数据更新成功，更新的数据为：cbenid：" + cbenid + "，pgid：" + pgid, "sql_update", clientInf);

                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：cbenid：" + cbenid + "，pgid：" + pgid + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetListCountForApp(string type, string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                DataTable dt = _idal_tbl_ld_cben.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null);
                string sys_ids = "";

                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    sys_ids += dt.Rows[i]["sys_id"].ToString() + ",";
                }
                string rows = "";
                sys_ids = sys_ids.TrimEnd(',');
                DataTable dt_result = new DataTable();
                switch (type)
                {
                    case "1":
                        #region sql

                        sb.Append("select t.*,");
                        sb.Append("       (select count(*) from tbl_ld_khb where F_CBBHid = t.sys_id) as zs,");
                        sb.Append("       (select count(*)");
                        sb.Append("          from tbl_ld_khb");
                        sb.Append("         where F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) > f_zhcbrq) as wcs,");
                        sb.Append("       (select count(*)");
                        sb.Append("          from tbl_ld_khb");
                        sb.Append("         where F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= f_zhcbrq) as ycs,");
                        sb.Append("       ");
                        sb.Append("       (select COUNT(DISTINCT(T_CB.F_KHBH))");
                        sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh");
                        sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        sb.Append("           and t_kh.f_bqzm = t_cb.f_bqzm");
                        sb.Append("           and t_kh.f_sqzm = t_cb.f_sqzm");
                        sb.Append("           and t_cb.f_cbsj >= add_months(sysdate,-t.f_cbzq)");
                        sb.Append("           and t_cb.f_sfsfts = 'false') as ycbzc,");
                        sb.Append("       ");
                        sb.Append("       (select COUNT(DISTINCT(T_CB.F_KHBH))");
                        sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh");
                        sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        sb.Append("           and t_kh.f_bqzm = t_cb.f_bqzm");
                        sb.Append("           and t_kh.f_sqzm = t_cb.f_sqzm");
                        sb.Append("           and t_cb.f_cbsj >= add_months(sysdate,-t.f_cbzq)");
                        sb.Append("           and t_cb.f_sfsfts = 'true') as ycbyc,");
                        sb.Append("       ");
                        sb.Append("      (select count(*) ");
                        sb.Append("          from tbl_ld_khb t_kh ");
                        sb.Append("          left join tbl_ld_cbiao t_cb ");
                        sb.Append("            on t_cb.f_khbhid = t_kh.sys_id ");
                        sb.Append("           and t_cb.f_ztid = '1' ");
                        sb.Append("         where t_kh.F_CBBHid = t.sys_id ");
                        sb.Append("           and (to_number(t_kh.F_LJQF) > 0 or ");
                        sb.Append("               to_number(nvl(t_cb.f_value1, 0)) > 0)) as qfs, ");
                        sb.Append("        ");
                        sb.Append("       (select nvl(sum(to_number(t_kh.F_LJQF) + ");
                        sb.Append("                       to_number(nvl(t_cb.f_value1, 0))), ");
                        sb.Append("                   0) ");
                        sb.Append("          from tbl_ld_khb t_kh ");
                        sb.Append("          left join TBL_LD_CBIAO t_cb ");
                        sb.Append("            on t_cb.f_khbhid = t_kh.sys_id ");
                        sb.Append("           and t_cb.f_ztid = '1' ");
                        sb.Append("         where t_kh.F_CBBHid = t.sys_id) as qfje ");
                        sb.Append("  from TBL_LD_CBEN t");
                        sb.Append(" where t.sys_id in ('" + sys_ids.Replace(",", "','") + "') ");
                        dt_result = _iAccessData.Query(sb.ToString()).Tables[0];
                        #endregion
                        break;
                    case "2":
                        #region sql

                        sb.Append("select t.*,");
                        sb.Append("       (select count(*) from tbl_ld_khb where F_CBBHid = t.sys_id) as zs,");
                        sb.Append("       (select count(*)");
                        sb.Append("          from tbl_ld_khb");
                        sb.Append("         where F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) > f_zhcbrq) as wcs,");
                        sb.Append("       (select count(*)");
                        sb.Append("          from tbl_ld_khb");
                        sb.Append("         where F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= f_zhcbrq) as ycs,");
                        sb.Append("       ");
                        sb.Append("       (select COUNT(DISTINCT(T_CB.F_KHBH))");
                        sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh");
                        sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        sb.Append("           and t_kh.f_bqzm = t_cb.f_bqzm");
                        sb.Append("           and t_kh.f_sqzm = t_cb.f_sqzm");
                        sb.Append("           and t_cb.f_cbsj >= add_months(sysdate,-t.f_cbzq)");
                        sb.Append("           and t_cb.f_sfsfts = 'false') as ycbzc,");
                        sb.Append("       ");
                        sb.Append("       (select COUNT(DISTINCT(T_CB.F_KHBH))");
                        sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh");
                        sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        sb.Append("           and t_kh.f_bqzm = t_cb.f_bqzm");
                        sb.Append("           and t_kh.f_sqzm = t_cb.f_sqzm");
                        sb.Append("           and t_cb.f_cbsj >= add_months(sysdate,-t.f_cbzq)");
                        sb.Append("           and t_cb.f_sfsfts = 'true') as ycbyc,");
                        sb.Append("       ");
                        sb.Append("       (select COUNT(DISTINCT(T_CB.F_KHBH))");
                        sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh");
                        sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        sb.Append("           and t_kh.f_bqzm = t_cb.f_bqzm");
                        sb.Append("           and t_kh.f_sqzm = t_cb.f_sqzm");
                        sb.Append("           and t_cb.f_cbsj >= add_months(sysdate,-t.f_cbzq)");
                        sb.Append("           and t_cb.f_ztid = '3') as yjfs,");
                        sb.Append("       ");
                        //sb.Append("       (select sum(to_number(nvl(t_jf.f_shss,0)))");
                        //sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf");
                        //sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        //sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        //sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        //sb.Append("           and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq,-t.f_cbzq)");
                        //sb.Append("           and t_cb.f_ztid = '3'");
                        //sb.Append("           and t_cb.f_jfbhid = t_jf.sys_id) as yjfje,");
                        //sb.Append("       ");
                        //sb.Append("       (select sum(to_number(nvl(t_jf.f_syycje,0)))");
                        //sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf");
                        //sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        //sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        //sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        //sb.Append("           and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq,-t.f_cbzq)");
                        //sb.Append("           and t_cb.f_ztid = '3'");
                        //sb.Append("           and t_cb.f_jfbhid = t_jf.sys_id) as syye,");
                        //sb.Append("       ");
                        //sb.Append("       (select sum(to_number(nvl(t_jf.f_dszycje,0)))");
                        //sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf");
                        //sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        //sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        //sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        //sb.Append("           and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq,-t.f_cbzq)");
                        //sb.Append("           and t_cb.f_ztid = '3'");
                        //sb.Append("           and t_cb.f_jfbhid = t_jf.sys_id) as dszye,");
                        //sb.Append("       ");

                        //sb.Append("       (select sum(to_number(nvl(t_jf.f_dyjtsf,0)))");
                        //sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf");
                        //sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        //sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        //sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        //sb.Append("           and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq,-t.f_cbzq)");
                        //sb.Append("           and t_cb.f_ztid = '3'");
                        //sb.Append("           and t_cb.f_jfbhid = t_jf.sys_id) as dyjtsf,");
                        //sb.Append("       ");
                        //sb.Append("       (select sum(to_number(nvl(t_jf.f_dejtsf,0)))");
                        //sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf");
                        //sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        //sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        //sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        //sb.Append("           and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq,-t.f_cbzq)");
                        //sb.Append("           and t_cb.f_ztid = '3'");
                        //sb.Append("           and t_cb.f_jfbhid = t_jf.sys_id) as dejtsf,");
                        //sb.Append("       ");
                        //sb.Append("       (select sum(to_number(nvl(t_jf.f_dsjtsf,0)))");
                        //sb.Append("          from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf");
                        //sb.Append("         where t_cb.f_khbhid = t_kh.sys_id");
                        //sb.Append("           and t_kh.F_CBBHid = t.sys_id");
                        //sb.Append("           and TRUNC(SYSDATE) <= t_kh.f_zhcbrq");
                        //sb.Append("           and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq,-t.f_cbzq)");
                        //sb.Append("           and t_cb.f_ztid = '3'");
                        //sb.Append("           and t_cb.f_jfbhid = t_jf.sys_id) as dsjtsf,");
                        //sb.Append("       ");


                        sb.Append("      (select count(*) ");
                        sb.Append("          from tbl_ld_khb t_kh ");
                        sb.Append("          left join tbl_ld_cbiao t_cb ");
                        sb.Append("            on t_cb.f_khbhid = t_kh.sys_id ");
                        sb.Append("           and t_cb.f_ztid = '1' ");
                        sb.Append("         where t_kh.F_CBBHid = t.sys_id ");
                        sb.Append("           and (to_number(t_kh.F_LJQF) > 0 or ");
                        sb.Append("               to_number(nvl(t_cb.f_value1, 0)) > 0)) as qfs, ");
                        sb.Append("        ");
                        sb.Append("       (select nvl(sum(to_number(t_kh.F_LJQF) + ");
                        sb.Append("                       to_number(nvl(t_cb.f_value1, 0))), ");
                        sb.Append("                   0) ");
                        sb.Append("          from tbl_ld_khb t_kh ");
                        sb.Append("          left join TBL_LD_CBIAO t_cb ");
                        sb.Append("            on t_cb.f_khbhid = t_kh.sys_id ");
                        sb.Append("           and t_cb.f_ztid = '1' ");
                        sb.Append("         where t_kh.F_CBBHid = t.sys_id) as qfje ");
                        sb.Append("  from TBL_LD_CBEN t");
                        sb.Append(" where t.sys_id in ('" + sys_ids.Replace(",", "','") + "') ");
                        dt_result = _iAccessData.Query(sb.ToString()).Tables[0];


                        string sqlstring = "";
                        //算后实收合计，使用余额合计，预存余额合计，阶梯水价合计
                        sqlstring += "select t.f_cbbh,";
                        sqlstring += "       sum(to_number(nvl(t_jf.f_shss, 0))) as yjfje,";
                        sqlstring += "       sum(to_number(nvl(t_jf.f_syycje, '0'))) as syye,";
                        sqlstring += "       sum(to_number(nvl(t_jf.f_dszycje, '0'))) as dszye,";
                        sqlstring += "       sum(to_number(nvl(t_jf.f_dyjtsf, '0'))) as dyjtsf,";
                        sqlstring += "       sum(to_number(nvl(t_jf.f_dejtsf, '0'))) as dejtsf,";
                        sqlstring += "       sum(to_number(nvl(t_jf.f_dsjtsf, '0'))) as dsjtsf";
                        sqlstring += "  from TBL_LD_CBIAO t_cb, tbl_ld_khb t_kh, tbl_ld_jfb t_jf, TBL_LD_CBEN t";
                        sqlstring += " where t_cb.f_khbhid = t_kh.sys_id";
                        sqlstring += "   and t_kh.F_CBBHid = t.sys_id";
                        sqlstring += "   and TRUNC(SYSDATE) <= t_kh.f_zhcbrq";
                        sqlstring += "   and t_jf.f_jfrq >= add_months(t_kh.f_zhcbrq, -t.f_cbzq)";
                        sqlstring += "   and t_cb.f_ztid = '3'";
                        sqlstring += "   and t_cb.f_jfbhid = t_jf.sys_id";
                        sqlstring += "   and t.sys_id in ('" + sys_ids.Replace(",", "','") + "')";
                        sqlstring += " group by t.f_cbbh";

                        DataTable hjdt = _iAccessData.Query(sqlstring).Tables[0];
                        dt_result.Columns.Add("YJFJE", typeof(string));
                        dt_result.Columns.Add("SYYE", typeof(string));
                        dt_result.Columns.Add("DSZYE", typeof(string));
                        dt_result.Columns.Add("DYJTSF", typeof(string));
                        dt_result.Columns.Add("DEJTSF", typeof(string));
                        dt_result.Columns.Add("DSJTSF", typeof(string));

                        for (int i = 0; i < dt_result.Rows.Count; i++)
                        {
                            for(int ii=0;ii< hjdt.Rows.Count; ii++)
                            {
                                if (dt_result.Rows[i]["F_CBBH"].ToString() == hjdt.Rows[ii]["F_CBBH"].ToString())
                                {
                                    dt_result.Rows[i]["YJFJE"] = hjdt.Rows[ii]["YJFJE"].ToString();
                                    dt_result.Rows[i]["SYYE"] = hjdt.Rows[ii]["SYYE"].ToString();
                                    dt_result.Rows[i]["DSZYE"] = hjdt.Rows[ii]["DSZYE"].ToString();
                                    dt_result.Rows[i]["DYJTSF"] = hjdt.Rows[ii]["DYJTSF"].ToString();
                                    dt_result.Rows[i]["DEJTSF"] = hjdt.Rows[ii]["DEJTSF"].ToString();
                                    dt_result.Rows[i]["DSJTSF"] = hjdt.Rows[ii]["DSJTSF"].ToString();
                                }
                            }
                        }



                        #endregion
                        break;
                }
                 
                rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt_result);


                string message = "{\"total\":\"" + _idal_tbl_ld_cben.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
        public void GetListCountForAppCross(string type, string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetListCountForApp(type, whereString, orderByString, columnsString, countString, stepString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }


        /// <summary>
        /// 算费回滚
        /// </summary>
        /// <param name="json"></param>
        /// <param name="columns"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBack(string pgid, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
            try
            {

                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                //更新客户表累积购量
                string querycbsql = "select F_KHBHID,F_BQJE from TBL_LD_CBIAO where F_PGBHID='" + pgid + "' and F_ZTID='2'";
                DataTable dt = t.Query(querycbsql).Tables[0];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id = ('" + dt.Rows[i]["f_khbhid"] + "') ", "", "*", "", "", t)[0];
                    string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    ljqf -= Eva.Library.Text.NumberTool.Parse(dt.Rows[i]["f_bqje"].ToString());
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf.ToString(),2);


                    #region 客户表写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                    f_ljqf.Add("key", "f_ljqf");
                    f_ljqf.Add("oldvalue", f_ljqf_old);
                    f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                    f_ljqf.Add("name", "累计欠费");
                    array.Add(f_ljqf);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cben_cbiao_treelist", "算费", array, clientInf, t);
                    #endregion

                    //更新客户表
                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljqf", t);
                }
                //清除算费数据
                string updatesql = "update TBL_LD_CBIAO set F_ZT='已抄表',F_ZTID='1',F_SF='0',F_PWF='0',F_BQJE='0' where F_PGBHID='" + pgid + "' and F_ZTID='2'";

                int flag = t.ExecuteSql(updatesql);
                if (flag < 0)
                {
                    t.getTrans().rollback();
                    resultDic["result"] = "false";
                    resultDic["message"] = "错误，更新水表信息时出现错误。";
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }

                //查询减免数据
                string queryjmsql = "select SYS_ID,F_CB_CBBH FROM TBL_LD_CBIAO where F_PGBHID='" + pgid + "' and F_ZTID='2' and F_JMBHID is not null";
                dt = t.Query(queryjmsql).Tables[0];
                string jmids = "";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    jmids += dt.Rows[i]["sys_id"] + ",";
                }
                jmids = jmids.TrimEnd(',');
                if (jmids != "")
                {
                    //清除抄表表减免数据
                    string updatecbsql = "update TBL_LD_CBIAO set F_JMBH='',F_JMBHID='',F_JMJE='0',F_SFJL='' where SYS_ID in(" + jmids + ")";

                    flag = t.ExecuteSql(updatecbsql);
                    if (flag <= 0)
                    {
                        t.getTrans().rollback();
                        resultDic["result"] = "false";
                        resultDic["message"] = "错误，更新抄表表减免数据时出现错误。";
                        return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                    }

                    //清除减免表减免数据
                    string updatejmsql = "update TBL_LD_JMB set F_CBBH='',F_CBBHID='',F_ZTID='0',F_ZT='新建' where F_CBBHID in(" + jmids + ")";

                    flag = t.ExecuteSql(updatejmsql);
                    if (flag <= 0)
                    {
                        t.getTrans().rollback();
                        resultDic["result"] = "false";
                        resultDic["message"] = "错误，更新减免表减免数据时出现错误。";
                        return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                    }
                }

                //更改评估表状态
                string updatepgsql = "update TBL_LD_PGB set F_ZTID='2',F_ZT='已回滚' where SYS_ID='" + pgid + "'";

                flag = t.ExecuteSql(updatepgsql);
                if (flag <= 0)
                {
                    t.getTrans().rollback();
                    resultDic["result"] = "false";
                    resultDic["message"] = "错误，更新评估表数据时出现错误。";
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }



                resultDic["result"] = "true";
                resultDic["message"] = "执行成功！";

                NewLog("数据更新成功，更新的数据为：pgid：" + pgid, "sql_update", clientInf);

                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：pgid：" + pgid + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        /// <summary>
        private void UpdateKHB(sara.dd.ldsw.model.tbl_ld_cben model, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
            List<sara.dd.ldsw.model.tbl_ld_khb> list_model_old_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_cbbhid='" + model.sys_id + "'", "",
                "sys_id,f_cbbh,f_cbbhid,f_cbyxm,f_cbyid,f_cbzq,f_cbmc", "", "", t);
            StringBuilder sql = new StringBuilder();
            sql.Append(" update tbl_ld_khb ");
            sql.Append("set f_cbbh='" + model.f_cbbh + "',");
            sql.Append(" f_cbyxm='" + model.f_cbymc + "',");
            sql.Append(" f_cbyid='" + model.f_cbyid + "',");
            sql.Append(" f_cbzq='" + model.f_cbzq + "',");
            sql.Append(" f_cbmc='" + model.f_cbmc + "'");
            sql.Append(" where f_cbbhid='" + model.sys_id + "' ");
            if (t != null)
            {
                t.ExecuteSql(sql.ToString());
            }
            else
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                _iAccessData.ExecuteSql(sql.ToString());
            }
            List<sara.dd.ldsw.model.tbl_ld_khb> list_model_new_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_cbbhid='" + model.sys_id + "'", "",
                "sys_id,f_cbbh,f_cbbhid,f_cbyxm,f_cbyid,f_cbzq,f_cbmc", "", "", t);
            sara.dd.ldsw.model.tbl_ld_khb model_new_temp = null;
            sara.dd.ldsw.model.tbl_ld_khb model_old_temp = null;
            for (int i = 0; i < list_model_new_tbl_ld_khb.Count; i++)
            {
                #region 找到新旧model
                model_new_temp = list_model_new_tbl_ld_khb[i];
                for (int j = 0; j < list_model_old_tbl_ld_khb.Count; j++)
                {
                    if (model_new_temp.sys_id == list_model_old_tbl_ld_khb[j].sys_id)
                    {
                        model_old_temp = list_model_old_tbl_ld_khb[j];
                        break;
                    }
                }
                #endregion
                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                #region 对比字段加入array
                if (model_old_temp.f_cbbh != model_new_temp.f_cbbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbbh");
                    temp.Add("oldvalue", model_old_temp.f_cbbh);
                    temp.Add("newvalue", model_new_temp.f_cbbh);
                    temp.Add("name", "抄表编号");
                    array.Add(temp);
                }
                if (model_old_temp.f_cbbhid != model_new_temp.f_cbbhid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbbhid");
                    temp.Add("oldvalue", model_old_temp.f_cbbhid);
                    temp.Add("newvalue", model_new_temp.f_cbbhid);
                    temp.Add("name", "抄表编号id");
                    array.Add(temp);
                }
                if (model_old_temp.f_cbyxm != model_new_temp.f_cbyxm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbyxm");
                    temp.Add("oldvalue", model_old_temp.f_cbyxm);
                    temp.Add("newvalue", model_new_temp.f_cbyxm);
                    temp.Add("name", "抄表员姓名");
                    array.Add(temp);
                }
                if (model_old_temp.f_cbyid != model_new_temp.f_cbyid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbyid");
                    temp.Add("oldvalue", model_old_temp.f_cbyid);
                    temp.Add("newvalue", model_new_temp.f_cbyid);
                    temp.Add("name", "抄表员id");
                    array.Add(temp);
                }
                if (model_old_temp.f_cbzq != model_new_temp.f_cbzq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbzq");
                    temp.Add("oldvalue", model_old_temp.f_cbzq);
                    temp.Add("newvalue", model_new_temp.f_cbzq);
                    temp.Add("name", "抄表周期");
                    array.Add(temp);
                }
                if (model_old_temp.f_cbmc != model_new_temp.f_cbmc)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cbmc");
                    temp.Add("oldvalue", model_old_temp.f_cbmc);
                    temp.Add("newvalue", model_new_temp.f_cbmc);
                    temp.Add("name", "抄表名称");
                    array.Add(temp);
                }
                #endregion
                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_new_temp.sys_id.ToString(), "tbl_ld_cben_detail", "抄本信息修改推送客户信息", array, clientInf, t);
            }
        }
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

                columns += "^" + "f_cbbh";

                columns += "^" + "f_cbmc";

                columns += "^" + "f_cbzq";

                columns += "^" + "f_ksyf";

                columns += "^" + "f_cbymc";

                columns += "^" + "f_cbyid";

                columns += "^" + "f_cbyphoto";

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









