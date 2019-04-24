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
    /// Service_tbl_ld_sbb 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_sbb : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_sbb _idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private sara.dd.ldsw.reportclass.tbl_ld_sbb report = new sara.dd.ldsw.reportclass.tbl_ld_sbb();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_sbb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_sbb>(json);
                model.sys_id = int.Parse(model.f_sbbh);
                model.sys_lasteditdate = DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                model.f_azrq = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_sbb.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_sbb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_sbb>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_sbb.AddList(modellist,null);

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
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();
                sara.dd.ldsw.model.tbl_ld_sbb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_sbb>(json);
                sara.dd.ldsw.model.tbl_ld_sbb model_old = _idal_tbl_ld_sbb.GetList(" sys_id='" + model.sys_id.ToString() + "'", "", "*", "", "", t)[0];
                
                columns = FormatColumns(columns).Replace("^", ",");
                model.sys_lasteditdate = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_sbb.Update(model, columns, t);

                UpdateKHB(model, clientInf, t);

                #region 写入日志
                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                #region 对比各个业务子段，将不同的写入array
                if (model.f_sbbh != model_old.f_sbbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbbh");
                    temp.Add("oldvalue", model_old.f_sbbh);
                    temp.Add("newvalue", model.f_sbbh);
                    temp.Add("name", "水表编号");
                    array.Add(temp);
                }
                if (model.f_sqzm != model_old.f_sqzm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sqzm");
                    temp.Add("oldvalue", model_old.f_sqzm);
                    temp.Add("newvalue", model.f_sqzm);
                    temp.Add("name", "上期止码");
                    array.Add(temp);
                }
                if (model.f_bqzm != model_old.f_bqzm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_bqzm");
                    temp.Add("oldvalue", model_old.f_bqzm);
                    temp.Add("newvalue", model.f_bqzm);
                    temp.Add("name", "本期止码");
                    array.Add(temp);
                }
                if (model.f_bqsl != model_old.f_bqsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_bqzm");
                    temp.Add("oldvalue", model_old.f_bqsl);
                    temp.Add("newvalue", model.f_bqsl);
                    temp.Add("name", "本期水量");
                    array.Add(temp);
                }
                if (model.f_sqsl != model_old.f_sqsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sqsl");
                    temp.Add("oldvalue", model_old.f_sqsl);
                    temp.Add("newvalue", model.f_sqsl);
                    temp.Add("name", "上期水量");
                    array.Add(temp);
                }
                if (model.f_qsqpjsl != model_old.f_qsqpjsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qsqpjsl");
                    temp.Add("oldvalue", model_old.f_qsqpjsl);
                    temp.Add("newvalue", model.f_qsqpjsl);
                    temp.Add("name", "前三期平均水量");
                    array.Add(temp);
                }
                if (model.f_qlqpjsl != model_old.f_qlqpjsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qlqpjsl");
                    temp.Add("oldvalue", model_old.f_qlqpjsl);
                    temp.Add("newvalue", model.f_qlqpjsl);
                    temp.Add("name", "前六期平均水量");
                    array.Add(temp);
                }
                if (model.f_nljgl != model_old.f_nljgl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_nljgl");
                    temp.Add("oldvalue", model_old.f_nljgl);
                    temp.Add("newvalue", model.f_nljgl);
                    temp.Add("name", "年累积购量");
                    array.Add(temp);
                }
                if (model.f_lxth != model_old.f_lxth)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_lxth");
                    temp.Add("oldvalue", model_old.f_lxth);
                    temp.Add("newvalue", model.f_lxth);
                    temp.Add("name", "老系统号");
                    array.Add(temp);
                }
                if (model.f_sblx != model_old.f_sblx)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sblx");
                    temp.Add("oldvalue", model_old.f_sblx);
                    temp.Add("newvalue", model.f_sblx);
                    temp.Add("name", "水表类型");
                    array.Add(temp);
                }
                if (model.f_sblxid != model_old.f_sblxid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sblxid");
                    temp.Add("oldvalue", model_old.f_sblxid);
                    temp.Add("newvalue", model.f_sblxid);
                    temp.Add("name", "水表类型id");
                    array.Add(temp);
                }
                if (model.f_jllx != model_old.f_jllx)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_jllx");
                    temp.Add("oldvalue", model_old.f_jllx);
                    temp.Add("newvalue", model.f_jllx);
                    temp.Add("name", "计量类型");
                    array.Add(temp);
                }
                if (model.f_jllxid != model_old.f_jllxid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_jllxid");
                    temp.Add("oldvalue", model_old.f_jllxid);
                    temp.Add("newvalue", model.f_jllxid);
                    temp.Add("name", "计量类型id");
                    array.Add(temp);
                }
                if (model.f_ztsbh != model_old.f_ztsbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ztsbh");
                    temp.Add("oldvalue", model_old.f_ztsbh);
                    temp.Add("newvalue", model.f_ztsbh);
                    temp.Add("name", "旧水表号");
                    array.Add(temp);
                }
                if (model.f_rs != model_old.f_rs)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_rs");
                    temp.Add("oldvalue", model_old.f_rs);
                    temp.Add("newvalue", model.f_rs);
                    temp.Add("name", "人数");
                    array.Add(temp);
                }
                if (model.f_sbkj != model_old.f_sbkj)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbkj");
                    temp.Add("oldvalue", model_old.f_sbkj);
                    temp.Add("newvalue", model.f_sbkj);
                    temp.Add("name", "水表口径");
                    array.Add(temp);
                }
                if (model.f_sbkjid != model_old.f_sbkjid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbkjid");
                    temp.Add("oldvalue", model_old.f_sbkjid);
                    temp.Add("newvalue", model.f_sbkjid);
                    temp.Add("name", "水表口径id");
                    array.Add(temp);
                }
                if (model.f_sbfz != model_old.f_sbfz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbfz");
                    temp.Add("oldvalue", model_old.f_sbfz);
                    temp.Add("newvalue", model.f_sbfz);
                    temp.Add("name", "水表分组");
                    array.Add(temp);
                }
                if (model.f_azrq != model_old.f_azrq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_azrq");
                    temp.Add("oldvalue", model_old.f_azrq.ToString("yyyy-MM-dd"));
                    temp.Add("newvalue", model.f_azrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "安装日期");
                    array.Add(temp);
                }
                if (model.f_sbfzid != model_old.f_sbfzid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbfzid");
                    temp.Add("oldvalue", model_old.f_sbfzid);
                    temp.Add("newvalue", model.f_sbfzid);
                    temp.Add("name", "水表分组id");
                    array.Add(temp);
                }
                if (model.f_sbpp != model_old.f_sbpp)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbpp");
                    temp.Add("oldvalue", model_old.f_sbpp);
                    temp.Add("newvalue", model.f_sbpp);
                    temp.Add("name", "水表品牌");
                    array.Add(temp);
                }
                if (model.f_mph != model_old.f_mph)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_mph");
                    temp.Add("oldvalue", model_old.f_mph);
                    temp.Add("newvalue", model.f_mph);
                    temp.Add("name", "铭牌号");
                    array.Add(temp);
                }
                if (model.f_sbdz != model_old.f_sbdz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbdz");
                    temp.Add("oldvalue", model_old.f_sbdz);
                    temp.Add("newvalue", model.f_sbdz);
                    temp.Add("name", "水表地址");
                    array.Add(temp);
                }
                if (model.f_qfzt != model_old.f_qfzt)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qfzt");
                    temp.Add("oldvalue", model_old.f_qfzt);
                    temp.Add("newvalue", model.f_qfzt);
                    temp.Add("name", "铅封状态");
                    array.Add(temp);
                }
                if (model.f_cszm != model_old.f_cszm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_cszm");
                    temp.Add("oldvalue", model_old.f_cszm);
                    temp.Add("newvalue", model.f_cszm);
                    temp.Add("name", "初始止码");
                    array.Add(temp);
                }
                if (model.f_ljgl != model_old.f_ljgl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ljgl");
                    temp.Add("oldvalue", model_old.f_ljgl);
                    temp.Add("newvalue", model.f_ljgl);
                    temp.Add("name", "累计购量");
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
                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model.sys_id.ToString(), "tbl_ld_sbb_detail", "水表信息修改", array, clientInf, t);
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
                 List<sara.dd.ldsw.model.tbl_ld_sbb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_sbb>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_sbb.UpdateList(modellist, columns,null);

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

                string sql = "select count(*) from tbl_ld_khb where f_sbbhid in (select sys_id from tbl_ld_sbb where " + whereString + ")";
                string count = _iAccessData.GetSingle(sql).ToString();
                if (count != "0")
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "您所选定的信息，在客户表中存在引用，所以不能删除。";
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_sbb.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_sbb.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_sbb.GetCount(whereString,null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_sbb>(_idal_tbl_ld_sbb.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_sbb.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_sbb.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_sbb.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
                		
				columns += "^" + "f_sbbh";
                		
				columns += "^" + "f_ztsbh";
                		
				columns += "^" + "f_lxth";
                		
				columns += "^" + "f_sbfz";
                		
				columns += "^" + "f_sbfzid";
                		
				columns += "^" + "f_sbpp";
                		
				columns += "^" + "f_mph";
                		
				columns += "^" + "f_sbdz";
                		
				columns += "^" + "f_khbh";
                		
				columns += "^" + "f_rs";
                		
				columns += "^" + "f_sbkj";
                		
				columns += "^" + "f_sbkjid";
                		
				columns += "^" + "f_sblx";
                		
				columns += "^" + "f_sblxid";
                		
				columns += "^" + "f_jllx";
                		
				columns += "^" + "f_jllxid";
                		
				columns += "^" + "f_cszm";
                		
				columns += "^" + "f_bqzm";
                		
				columns += "^" + "f_sqzm";
                		
				columns += "^" + "f_sqsl";

                columns += "^" + "f_bqsl";

                columns += "^" + "f_ljgl";
                		
				columns += "^" + "f_qsqpjsl";
                		
				columns += "^" + "f_qlqpjsl";
                		
				columns += "^" + "f_zt";
                		
				columns += "^" + "f_ztid";
                		
				columns += "^" + "f_bz";
				        columns += "^" + "f_nljgl";
                
                columns += "^" + "f_azrq";
               
                columns += "^" + "f_qfzt";
                columns += "^" + "f_fj";
                columns += "^" + "f_synx";
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

        private void UpdateKHB(sara.dd.ldsw.model.tbl_ld_sbb model, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
            List<sara.dd.ldsw.model.tbl_ld_khb> list_model_old_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_sbbhid='" + model.sys_id + "'", "",
                "sys_id,f_sbbh,f_sbbhid,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_qsqpjsl,f_qlqpjsl,f_ljgl,f_lxth,f_sblx,f_sblxid,f_jllx,f_jllxid,f_ztsbh,f_rs,f_sbkj,f_sbkjid,f_sbfz,f_sbfzid", "", "", t);
            StringBuilder sql = new StringBuilder();
            sql.Append(" update tbl_ld_khb ");
            sql.Append(" set f_sbbh='" + model.f_sbbh + "',");
            sql.Append(" f_bqzm='" + model.f_bqzm + "',");
            sql.Append(" f_sqzm='" + model.f_sqzm + "',");
            sql.Append(" f_bqsl='" + model.f_bqsl + "',");
            sql.Append(" f_sqsl='" + model.f_sqsl + "',");
            sql.Append(" f_qsqpjsl='" + model.f_qsqpjsl + "',");
            sql.Append(" f_qlqpjsl='" + model.f_qlqpjsl + "',");
            sql.Append(" f_ljgl='" + model.f_ljgl + "',");
            sql.Append(" f_nljgl='" + model.f_nljgl + "',");
            sql.Append(" f_lxth='" + model.f_lxth + "',");
            sql.Append(" f_sblx='" + model.f_sblx + "',");
            sql.Append(" f_sblxid='" + model.f_sblxid + "',");
            sql.Append(" f_jllx='" + model.f_jllx + "',");
            sql.Append(" f_jllxid='" + model.f_jllxid + "',");
            sql.Append(" f_ztsbh='" + model.f_ztsbh + "',");
            sql.Append(" f_rs='" + model.f_rs + "',");
            sql.Append(" f_sbkj='" + model.f_sbkj + "',");
            sql.Append(" f_sbkjid='" + model.f_sbkjid + "',");
            sql.Append(" f_sbfz='" + model.f_sbfz + "',");
            sql.Append(" f_sbfzid='" + model.f_sbfzid + "',");
            sql.Append(" f_sbdz='" + model.f_sbdz + "'");
            sql.Append(" where f_sbbhid='" + model.sys_id + "' ");
            if (t != null)
            {
                t.ExecuteSql(sql.ToString());
            }
            else
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                _iAccessData.ExecuteSql(sql.ToString());
            }
            List<sara.dd.ldsw.model.tbl_ld_khb> list_model_new_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_sbbhid='" + model.sys_id + "'", "",
                "sys_id,f_sbbh,f_sbbhid,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_qsqpjsl,f_qlqpjsl,f_ljgl,f_lxth,f_sblx,f_sblxid,f_jllx,f_jllxid,f_ztsbh,f_rs,f_sbkj,f_sbkjid,f_sbfz,f_sbfzid", "", "", t);
            sara.dd.ldsw.model.tbl_ld_khb model_new_temp=null;
            sara.dd.ldsw.model.tbl_ld_khb model_old_temp=null;
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
                #region 对比子段加入array
                if (model_old_temp.f_sbbh != model_new_temp.f_sbbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbbh");
                    temp.Add("oldvalue", model_old_temp.f_sbbh);
                    temp.Add("newvalue", model_new_temp.f_sbbh);
                    temp.Add("name", "水表编号");
                    array.Add(temp);
                }
                if (model_old_temp.f_bqzm != model_new_temp.f_bqzm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_bqzm");
                    temp.Add("oldvalue", model_old_temp.f_bqzm);
                    temp.Add("newvalue", model_new_temp.f_bqzm);
                    temp.Add("name", "本期止码");
                    array.Add(temp);
                }
                if (model_old_temp.f_sqzm != model_new_temp.f_sqzm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sqzm	");
                    temp.Add("oldvalue", model_old_temp.f_sqzm);
                    temp.Add("newvalue", model_new_temp.f_sqzm);
                    temp.Add("name", "上期止码");
                    array.Add(temp);
                }
                if (model_old_temp.f_bqsl != model_new_temp.f_bqsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_bqsl");
                    temp.Add("oldvalue", model_old_temp.f_bqsl);
                    temp.Add("newvalue", model_new_temp.f_bqsl);
                    temp.Add("name", "本期水量");
                    array.Add(temp);
                }
                if (model_old_temp.f_sqsl != model_new_temp.f_sqsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sqsl");
                    temp.Add("oldvalue", model_old_temp.f_sqsl);
                    temp.Add("newvalue", model_new_temp.f_sqsl);
                    temp.Add("name", "上期水量");
                    array.Add(temp);
                }
                if (model_old_temp.f_qsqpjsl != model_new_temp.f_qsqpjsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qsqpjsl");
                    temp.Add("oldvalue", model_old_temp.f_qsqpjsl);
                    temp.Add("newvalue", model_new_temp.f_qsqpjsl);
                    temp.Add("name", "前三期本均水量");
                    array.Add(temp);
                }
                if (model_old_temp.f_qlqpjsl != model_new_temp.f_qlqpjsl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qlqpjsl");
                    temp.Add("oldvalue", model_old_temp.f_qlqpjsl);
                    temp.Add("newvalue", model_new_temp.f_qlqpjsl);
                    temp.Add("name", "前六期本均水量");
                    array.Add(temp);
                }
                if (model_old_temp.f_ljgl != model_new_temp.f_ljgl)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ljgl");
                    temp.Add("oldvalue", model_old_temp.f_ljgl);
                    temp.Add("newvalue", model_new_temp.f_ljgl);
                    temp.Add("name", "年用水量");
                    array.Add(temp);
                }
                if (model_old_temp.f_lxth != model_new_temp.f_lxth)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_lxth");
                    temp.Add("oldvalue", model_old_temp.f_lxth);
                    temp.Add("newvalue", model_new_temp.f_lxth);
                    temp.Add("name", "老系统号");
                    array.Add(temp);
                }
                if (model_old_temp.f_sblx != model_new_temp.f_sblx)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sblx");
                    temp.Add("oldvalue", model_old_temp.f_sblx);
                    temp.Add("newvalue", model_new_temp.f_sblx);
                    temp.Add("name", "水表类型");
                    array.Add(temp);
                }
                if (model_old_temp.f_sblxid != model_new_temp.f_sblxid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sblxid");
                    temp.Add("oldvalue", model_old_temp.f_sblxid);
                    temp.Add("newvalue", model_new_temp.f_sblxid);
                    temp.Add("name", "水表类型id");
                    array.Add(temp);
                }
                if (model_old_temp.f_jllx != model_new_temp.f_jllx)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_jllx");
                    temp.Add("oldvalue", model_old_temp.f_jllx);
                    temp.Add("newvalue", model_new_temp.f_jllx);
                    temp.Add("name", "计量类型");
                    array.Add(temp);
                }
                if (model_old_temp.f_jllxid != model_new_temp.f_jllxid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_jllxid");
                    temp.Add("oldvalue", model_old_temp.f_jllxid);
                    temp.Add("newvalue", model_new_temp.f_jllxid);
                    temp.Add("name", "计量类型id");
                    array.Add(temp);
                }
                if (model_old_temp.f_ztsbh != model_new_temp.f_ztsbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ztsbh");
                    temp.Add("oldvalue", model_old_temp.f_ztsbh);
                    temp.Add("newvalue", model_new_temp.f_ztsbh);
                    temp.Add("name", "旧水表号");
                    array.Add(temp);
                }
                if (model_old_temp.f_rs != model_new_temp.f_rs)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_rs");
                    temp.Add("oldvalue", model_old_temp.f_rs);
                    temp.Add("newvalue", model_new_temp.f_rs);
                    temp.Add("name", "人数");
                    array.Add(temp);
                }
                if (model_old_temp.f_sbkj != model_new_temp.f_sbkj)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbkj");
                    temp.Add("oldvalue", model_old_temp.f_sbkj);
                    temp.Add("newvalue", model_new_temp.f_sbkj);
                    temp.Add("name", "水表口径");
                    array.Add(temp);
                }
                if (model_old_temp.f_sbkjid != model_new_temp.f_sbkjid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbkjid");
                    temp.Add("oldvalue", model_old_temp.f_sbkjid);
                    temp.Add("newvalue", model_new_temp.f_sbkjid);
                    temp.Add("name", "水表口径id");
                    array.Add(temp);
                }
                if (model_old_temp.f_sbfz != model_new_temp.f_sbfz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbfz");
                    temp.Add("oldvalue", model_old_temp.f_sbfz);
                    temp.Add("newvalue", model_new_temp.f_sbfz);
                    temp.Add("name", "水表分组");
                    array.Add(temp);
                }
                if (model_old_temp.f_sbfzid != model_new_temp.f_sbfzid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sbfzid");
                    temp.Add("oldvalue", model_old_temp.f_sbfzid);
                    temp.Add("newvalue", model_new_temp.f_sbfzid);
                    temp.Add("name", "水表分组id");
                    array.Add(temp);
                }
                #endregion
                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_new_temp.sys_id.ToString(), "tbl_ld_sbb_detail", "用户信息修改推送水表信息", array, clientInf, t);
            }
        }


        //导出数据
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string whereString,string orderByString, string column, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_sbb";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_sbb.GetDataTableForPC(whereString, orderByString, column, "", "", null);
                        string file = report.ReportExcel(dt, column, columnname);

                        resultDic["result"] = "true";
                        resultDic["message"] = file;



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
        public void ExportCross(string whereString,string orderByString, string column, string columnname, string clientInf)
        {
            string result1 = this.Export(whereString, orderByString, column, columnname, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
    }
}









