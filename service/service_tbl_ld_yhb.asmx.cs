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
    /// Service_tbl_ld_yhb 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_yhb : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_yhb _idal_tbl_ld_yhb = new sara.dd.ldsw.dal.tbl_ld_yhb();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        private sara.dd.ldsw.reportclass.tbl_ld_yhb report = new sara.dd.ldsw.reportclass.tbl_ld_yhb();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_yhb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_yhb>(json);
                model.sys_id = int.Parse(model.f_yhbh);
                model.f_khrq = DateTime.Now;
                model.f_htqdrq= DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_yhb.Add(model, null);

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
                List<sara.dd.ldsw.model.tbl_ld_yhb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_yhb>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_yhb.AddList(modellist, null);

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

                sara.dd.ldsw.model.tbl_ld_yhb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_yhb>(json);
                sara.dd.ldsw.model.tbl_ld_yhb model_old = _idal_tbl_ld_yhb.GetList(" sys_id='" + model.sys_id.ToString() + "'", "", "*", "", "", t)[0];
                columns = FormatColumns(columns).Replace("^", ",");
                model.sys_lasteditdate = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_yhb.Update(model, columns, t);

                //更新客户表中用户信息
                UpdateKHB(model,clientInf, t);

                #region 写入日志
                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();

                //dic中有四个值，key,name,oldvalue,newvalue[{"key":"f_yhm","oldvalue":"刘玉东","newvalue":"刘玉东2","name":"用户名"}]
                #region 对比各个业务子段，将不同的写入array
                if (model.f_yhbh != model_old.f_yhbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhbh");
                    temp.Add("oldvalue", model_old.f_yhbh);
                    temp.Add("newvalue", model.f_yhbh);
                    temp.Add("name", "用户编号");
                    array.Add(temp);
                }
                if (model.f_ztyhh != model_old.f_ztyhh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ztyhh");
                    temp.Add("oldvalue", model_old.f_ztyhh);
                    temp.Add("newvalue", model.f_ztyhh);
                    temp.Add("name", "旧用户号");
                    array.Add(temp);
                }
                if (model.f_yhm != model_old.f_yhm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhm");
                    temp.Add("oldvalue", model_old.f_yhm);
                    temp.Add("newvalue", model.f_yhm);
                    temp.Add("name", "用户名");
                    array.Add(temp);

                    //用户名变更时执行过户
                    sara.dd.ldsw.service.service_tbl_ldbm_expdata expdate = new service_tbl_ldbm_expdata();
                    expdate.Change(model.f_khbh, model.f_yhm, "","");
                }
                if (model.f_jfm != model_old.f_jfm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_jfm");
                    temp.Add("oldvalue", model_old.f_jfm);
                    temp.Add("newvalue", model.f_jfm);
                    temp.Add("name", "缴费名");
                    array.Add(temp);
                }
                if (model.f_dz != model_old.f_dz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dz");
                    temp.Add("oldvalue", model_old.f_dz);
                    temp.Add("newvalue", model.f_dz);
                    temp.Add("name", "地址");
                    array.Add(temp);

                    //地址变更时执行过户
                    sara.dd.ldsw.service.service_tbl_ldbm_expdata expdate = new service_tbl_ldbm_expdata();
                    expdate.Change(model.f_khbh, "", "",model.f_dz);
                }
                if (model.f_yhfz != model_old.f_yhfz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhfz");
                    temp.Add("oldvalue", model_old.f_yhfz);
                    temp.Add("newvalue", model.f_yhfz);
                    temp.Add("name", "用户分组");
                    array.Add(temp);
                }
                if (model.f_yhfzid != model_old.f_yhfzid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhfzid");
                    temp.Add("oldvalue", model_old.f_yhfzid);
                    temp.Add("newvalue", model.f_yhfzid);
                    temp.Add("name", "用户分组id");
                    array.Add(temp);
                }
                if (model.f_dh != model_old.f_dh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dh");
                    temp.Add("oldvalue", model_old.f_dh);
                    temp.Add("newvalue", model.f_dh);
                    temp.Add("name", "电话");
                    array.Add(temp);
                }
                if (model.f_dy != model_old.f_dy)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dy");
                    temp.Add("oldvalue", model_old.f_dy);
                    temp.Add("newvalue", model.f_dy);
                    temp.Add("name", "地域");
                    array.Add(temp);
                }
                if (model.f_dyid != model_old.f_dyid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dyid");
                    temp.Add("oldvalue", model_old.f_dyid);
                    temp.Add("newvalue", model.f_dyid);
                    temp.Add("name", "地域id");
                    array.Add(temp);
                }
                if (model.f_sc != model_old.f_sc)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sc");
                    temp.Add("oldvalue", model_old.f_sc);
                    temp.Add("newvalue", model.f_sc);
                    temp.Add("name", "水厂");
                    array.Add(temp);
                }
                if (model.f_scid != model_old.f_scid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_scid");
                    temp.Add("oldvalue", model_old.f_scid);
                    temp.Add("newvalue", model.f_scid);
                    temp.Add("name", "水厂id");
                    array.Add(temp);
                }
                if (model.f_qy != model_old.f_qy)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qy");
                    temp.Add("oldvalue", model_old.f_qy);
                    temp.Add("newvalue", model.f_qy);
                    temp.Add("name", "区域");
                    array.Add(temp);
                }
                if (model.f_qyid != model_old.f_qyid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qyid");
                    temp.Add("oldvalue", model_old.f_qyid);
                    temp.Add("newvalue", model.f_qyid);
                    temp.Add("name", "区域id");
                    array.Add(temp);
                }
                if (model.f_pq != model_old.f_pq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_pq");
                    temp.Add("oldvalue", model_old.f_pq);
                    temp.Add("newvalue", model.f_pq);
                    temp.Add("name", "片区");
                    array.Add(temp);
                }
                if (model.f_pqid != model_old.f_pqid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_pqid");
                    temp.Add("oldvalue", model_old.f_pqid);
                    temp.Add("newvalue", model.f_pqid);
                    temp.Add("name", "片区id");
                    array.Add(temp);
                }
                if (model.f_khrq != model_old.f_khrq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_khrq");
                    temp.Add("oldvalue", model_old.f_khrq.ToString("yyyy-MM-dd"));
                    temp.Add("newvalue", model.f_khrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "开户日期");
                    array.Add(temp);
                }
                if (model.f_htqdrq != model_old.f_htqdrq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_htqdrq");
                    temp.Add("oldvalue", model_old.f_htqdrq.ToString("yyyy-MM-dd"));
                    temp.Add("newvalue", model.f_htqdrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "合同签订日期");
                    array.Add(temp);
                }
                if (model.f_sfts != model_old.f_sfts)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sfts");
                    temp.Add("oldvalue", model_old.f_sfts);
                    temp.Add("newvalue", model.f_sfts);
                    temp.Add("name", "是否托收");
                    array.Add(temp);
                }
                if (model.f_tsyx != model_old.f_tsyx)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_tsyx");
                    temp.Add("oldvalue", model_old.f_tsyx);
                    temp.Add("newvalue", model.f_tsyx);
                    temp.Add("name", "托收银行");
                    array.Add(temp);
                }
                if (model.f_tsyxzh != model_old.f_tsyxzh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_tsyxzh");
                    temp.Add("oldvalue", model_old.f_tsyxzh);
                    temp.Add("newvalue", model.f_tsyxzh);
                    temp.Add("name", "托收银行账号");
                    array.Add(temp);
                }
                if (model.f_htbh != model_old.f_htbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_htbh");
                    temp.Add("oldvalue", model_old.f_htbh);
                    temp.Add("newvalue", model.f_htbh);
                    temp.Add("name", "合同编号");
                    array.Add(temp);
                }
                if (model.f_htfj != model_old.f_htfj)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_htfj");
                    temp.Add("oldvalue", model_old.f_htfj);
                    temp.Add("newvalue", model.f_htfj);
                    temp.Add("name", "合同附件");
                    array.Add(temp);
                }
                if (model.f_qtfj != model_old.f_qtfj)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qtfj");
                    temp.Add("oldvalue", model_old.f_qtfj);
                    temp.Add("newvalue", model.f_qtfj);
                    temp.Add("name", "其他附件");
                    array.Add(temp);
                }
                if (model.f_sfzh != model_old.f_sfzh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sfzh");
                    temp.Add("oldvalue", model_old.f_sfzh);
                    temp.Add("newvalue", model.f_sfzh);
                    temp.Add("name", "身份证号");
                    array.Add(temp);
                }
                if (model.f_sfzfj != model_old.f_sfzfj)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sfzfj");
                    temp.Add("oldvalue", model_old.f_sfzfj);
                    temp.Add("newvalue", model.f_sfzfj);
                    temp.Add("name", "身份证附件");
                    array.Add(temp);
                }
                if (model.f_sfzzs != model_old.f_sfzzs)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sfzzs");
                    temp.Add("oldvalue", model_old.f_sfzzs);
                    temp.Add("newvalue", model.f_sfzzs);
                    temp.Add("name", "是否增值税");
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
                if (model.f_khbh != model_old.f_khbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_khbh");
                    temp.Add("oldvalue", model_old.f_khbh);
                    temp.Add("newvalue", model.f_khbh);
                    temp.Add("name", "客户编号");
                    array.Add(temp);
                }
                if (model.f_wxwybz != model_old.f_wxwybz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_wxwybz");
                    temp.Add("oldvalue", model_old.f_wxwybz);
                    temp.Add("newvalue", model.f_wxwybz);
                    temp.Add("name", "微信唯一标志");
                    array.Add(temp);
                }
                if (model.f_zfbwybz != model_old.f_zfbwybz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zfbwybz");
                    temp.Add("oldvalue", model_old.f_zfbwybz);
                    temp.Add("newvalue", model.f_zfbwybz);
                    temp.Add("name", "支付宝唯一标志");
                    array.Add(temp);
                }
                if (model.f_gdyxwybz != model_old.f_gdyxwybz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_gdyxwybz");
                    temp.Add("oldvalue", model_old.f_gdyxwybz);
                    temp.Add("newvalue", model.f_gdyxwybz);
                    temp.Add("name", "光大银行唯一标志");
                    array.Add(temp);
                }
                if (model.f_tsyxid != model_old.f_tsyxid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_tsyxid");
                    temp.Add("oldvalue", model_old.f_tsyxid);
                    temp.Add("newvalue", model.f_tsyxid);
                    temp.Add("name", "托收银行id");
                    array.Add(temp);
                }
                #endregion
                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_yhb", model.sys_id.ToString(), "tbl_ld_yhb_detail", "用户信息修改", array, clientInf, t);
                
                #endregion

                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);

                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                if(t!=null)
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
                List<sara.dd.ldsw.model.tbl_ld_yhb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_yhb>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_yhb.UpdateList(modellist, columns, null);

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

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
           

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                string sql = "select count(*) from tbl_ld_khb where f_yhbhid in(select sys_id from tbl_ld_yhb where " + whereString + ")";
                string count = t.GetSingle(sql).ToString();
                if (count != "0")
                {
                    t.getTrans().rollback();
                    resultDic["result"] = "false";
                    resultDic["message"] = "您所选定的信息，在客户表中存在引用，所以不能删除。";
                }
                else
                {
        
                    #region 删除附件的功能
                    string fileIDs = "";
                    string columnsString = "";

                    columnsString += "f_htfj,";
                    columnsString += "f_qtfj,";
                    columnsString += "f_sfzfj,";

                    columnsString = columnsString.TrimEnd(',');
                    List<sara.dd.ldsw.model.tbl_ld_yhb> l_tbl_ld_yhb = _idal_tbl_ld_yhb.GetList(whereString, "", columnsString, "", "", t);
                    foreach (sara.dd.ldsw.model.tbl_ld_yhb model in l_tbl_ld_yhb)
                    {

                        fileIDs += model.f_htfj + ",";
                        fileIDs += model.f_qtfj + ",";
                        fileIDs += model.f_sfzfj + ",";

                    }
                    fileIDs = fileIDs.TrimEnd(',');
                    sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, t); 
                    #endregion

                   
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_yhb.Delete(whereString, t);
                    t.getTrans().commit();
                    NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);
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
                resultDic["message"] = _idal_tbl_ld_yhb.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
                resultDic["message"] = _idal_tbl_ld_yhb.GetCount(whereString, null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_yhb>(_idal_tbl_ld_yhb.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_yhb.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_yhb.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_yhb.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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

                columns += "^" + "f_yhbh";

                columns += "^" + "f_ztyhh";

                columns += "^" + "f_yhm";

                columns += "^" + "f_jfm";

                columns += "^" + "f_dz";

                columns += "^" + "f_yhfz";

                columns += "^" + "f_yhfzid";

                columns += "^" + "f_dh";

                columns += "^" + "f_dy";

                columns += "^" + "f_dyid";

                columns += "^" + "f_sc";

                columns += "^" + "f_scid";

                columns += "^" + "f_qy";

                columns += "^" + "f_qyid";

                columns += "^" + "f_pq";

                columns += "^" + "f_pqid";

                columns += "^" + "f_khrq";

                columns += "^" + "f_sfts";

                columns += "^" + "f_tsyx";

                columns += "^" + "f_tsyxzh";

                columns += "^" + "f_htbh";

                columns += "^" + "f_htfj";

                columns += "^" + "f_qtfj";
                columns += "^" + "f_sfzh";

                columns += "^" + "f_sfzfj";

                columns += "^" + "f_sfzzs";

                columns += "^" + "f_zt";

                columns += "^" + "f_ztid";

                columns += "^" + "f_bz";

                columns += "^" + "f_khbh";

                columns += "^" + "f_wxwybz";

                columns += "^" + "f_zfbwybz";

                columns += "^" + "f_gdyxwybz";

                columns += "^" + "f_htqdrq";     //合同签订日期

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



        private void UpdateKHB(sara.dd.ldsw.model.tbl_ld_yhb model,string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb=new sara.dd.ldsw.dal.tbl_ld_khb();
            List<sara.dd.ldsw.model.tbl_ld_khb> list_model_old_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_yhbhid='" + model.sys_id + "'", "",
                "sys_id,f_yhbh,f_yhbhid,f_jfm,f_yhfz,f_yhfzid,f_dz,f_dh,f_dy,f_dyid,f_sc,f_scid,f_qy,f_qyid,f_pq,f_pqid,f_tsyxzh,f_hth,f_sfzh,f_khrq,f_yhm,f_ztyhh", "", "", t);

            StringBuilder sql = new StringBuilder();
            sql.Append(" update tbl_ld_khb ");
            sql.Append(" set f_yhbh='" + model.f_yhbh + "',");
            //sql.Append(" f_yhbhid='" + model.f_yhbhid + "',");
            sql.Append(" f_jfm='" + model.f_jfm + "',");
            sql.Append(" f_yhfz='" + model.f_yhfz + "',");
            sql.Append(" f_yhfzid='" + model.f_yhfzid + "',");
            sql.Append(" f_dz='" + model.f_dz + "',");
            sql.Append(" f_dh='" + model.f_dh + "',");
            sql.Append(" f_dy='" + model.f_dy + "',");
            sql.Append(" f_dyid='" + model.f_dyid + "',");
            sql.Append(" f_sc='" + model.f_sc + "',");
            sql.Append(" f_scid='" + model.f_scid + "',");
            sql.Append(" f_qy='" + model.f_qy + "',");
            sql.Append(" f_qyid='" + model.f_qyid + "',");
            sql.Append(" f_pq='" + model.f_pq + "',");
            sql.Append(" f_pqid='" + model.f_pqid + "',");
            sql.Append(" f_tsyxzh='" + model.f_tsyxzh + "',");
            sql.Append(" f_hth='" + model.f_htbh + "',");
            sql.Append(" f_sfzh='" + model.f_sfzh + "',");
            sql.Append(" f_yhm='" + model.f_yhm + "',");
            sql.Append(" f_ztyhh='" + model.f_ztyhh + "',");
            sql.Append(" f_khrq=to_date( '" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')");
            sql.Append(" where f_yhbhid='" + model.sys_id + "' ");

            if (t != null)
            {
                t.ExecuteSql(sql.ToString());
            }
            else
            {
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                _iAccessData.ExecuteSql(sql.ToString());
            }

            List<sara.dd.ldsw.model.tbl_ld_khb> list_model_new_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_yhbhid='" + model.sys_id + "'", "",
                "sys_id,f_yhbh,f_yhbhid,f_jfm,f_yhfz,f_yhfzid,f_dz,f_dh,f_dy,f_dyid,f_sc,f_scid,f_qy,f_qyid,f_pq,f_pqid,f_tsyxzh,f_hth,f_sfzh,f_khrq,f_yhm,f_ztyhh", "", "", t);



            //写日志
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

                #region 对比子段加入array
               
                if (model_old_temp.f_yhbh != model_new_temp.f_yhbh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhbh");
                    temp.Add("oldvalue", model_old_temp.f_yhbh);
                    temp.Add("newvalue", model_new_temp.f_yhbh);
                    temp.Add("name", "用户编号");
                    array.Add(temp);
                }
                if (model_old_temp.f_jfm != model_new_temp.f_jfm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_jfm");
                    temp.Add("oldvalue", model_old_temp.f_jfm);
                    temp.Add("newvalue", model_new_temp.f_jfm);
                    temp.Add("name", "缴费名");
                    array.Add(temp);
                }
                if (model_old_temp.f_yhfz != model_new_temp.f_yhfz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhfz");
                    temp.Add("oldvalue", model_old_temp.f_yhfz);
                    temp.Add("newvalue", model_new_temp.f_yhfz);
                    temp.Add("name", "用户分组");
                    array.Add(temp);
                }
                if (model_old_temp.f_yhfzid != model_new_temp.f_yhfzid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhfzid");
                    temp.Add("oldvalue", model_old_temp.f_yhfzid);
                    temp.Add("newvalue", model_new_temp.f_yhfzid);
                    temp.Add("name", "用户分组id");
                    array.Add(temp);
                }
                if (model_old_temp.f_dz != model_new_temp.f_dz)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dz");
                    temp.Add("oldvalue", model_old_temp.f_dz);
                    temp.Add("newvalue", model_new_temp.f_dz);
                    temp.Add("name", "地址");
                    array.Add(temp);
                }
                if (model_old_temp.f_dh != model_new_temp.f_dh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dh");
                    temp.Add("oldvalue", model_old_temp.f_dh);
                    temp.Add("newvalue", model_new_temp.f_dh);
                    temp.Add("name", "电话");
                    array.Add(temp);
                }
                if (model_old_temp.f_dy != model_new_temp.f_dy)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dy");
                    temp.Add("oldvalue", model_old_temp.f_dy);
                    temp.Add("newvalue", model_new_temp.f_dy);
                    temp.Add("name", "地域");
                    array.Add(temp);
                }
                if (model_old_temp.f_dyid != model_new_temp.f_dyid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_dyid");
                    temp.Add("oldvalue", model_old_temp.f_dyid);
                    temp.Add("newvalue", model_new_temp.f_dyid);
                    temp.Add("name", "地域id");
                    array.Add(temp);
                }
                if (model_old_temp.f_sc != model_new_temp.f_sc)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sc");
                    temp.Add("oldvalue", model_old_temp.f_sc);
                    temp.Add("newvalue", model_new_temp.f_sc);
                    temp.Add("name", "水厂");
                    array.Add(temp);
                }
                if (model_old_temp.f_scid != model_new_temp.f_scid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_scid");
                    temp.Add("oldvalue", model_old_temp.f_scid);
                    temp.Add("newvalue", model_new_temp.f_scid);
                    temp.Add("name", "水厂id");
                    array.Add(temp);
                }
                if (model_old_temp.f_qy != model_new_temp.f_qy)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qy");
                    temp.Add("oldvalue", model_old_temp.f_qy);
                    temp.Add("newvalue", model_new_temp.f_qy);
                    temp.Add("name", "区域");
                    array.Add(temp);
                }
                if (model_old_temp.f_qyid != model_new_temp.f_qyid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_qyid");
                    temp.Add("oldvalue", model_old_temp.f_qyid);
                    temp.Add("newvalue", model_new_temp.f_qyid);
                    temp.Add("name", "区域id");
                    array.Add(temp);
                }
                if (model_old_temp.f_pq != model_new_temp.f_pq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_pq");
                    temp.Add("oldvalue", model_old_temp.f_pq);
                    temp.Add("newvalue", model_new_temp.f_pq);
                    temp.Add("name", "片区");
                    array.Add(temp);
                }
                if (model_old_temp.f_pqid != model_new_temp.f_pqid)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_pqid");
                    temp.Add("oldvalue", model_old_temp.f_pqid);
                    temp.Add("newvalue", model_new_temp.f_pqid);
                    temp.Add("name", "片区id");
                    array.Add(temp);
                }
                if (model_old_temp.f_tsyxzh != model_new_temp.f_tsyxzh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_tsyxzh");
                    temp.Add("oldvalue", model_old_temp.f_tsyxzh);
                    temp.Add("newvalue", model_new_temp.f_tsyxzh);
                    temp.Add("name", "托收银行账号");
                    array.Add(temp);
                }
                if (model_old_temp.f_hth != model_new_temp.f_hth)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_hth");
                    temp.Add("oldvalue", model_old_temp.f_hth);
                    temp.Add("newvalue", model_new_temp.f_hth);
                    temp.Add("name", "合同号");
                    array.Add(temp);
                }
                if (model_old_temp.f_sfzh != model_new_temp.f_sfzh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_sfzh");
                    temp.Add("oldvalue", model_old_temp.f_sfzh);
                    temp.Add("newvalue", model_new_temp.f_sfzh);
                    temp.Add("name", "身份证号");
                    array.Add(temp);
                }
                if (model_old_temp.f_khrq != model_new_temp.f_khrq)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_khrq");
                    temp.Add("oldvalue", model_old_temp.f_khrq.ToString());
                    temp.Add("newvalue", model_new_temp.f_khrq.ToString());
                    temp.Add("name", "开户日期");
                    array.Add(temp);
                }
                if (model_old_temp.f_yhm != model_new_temp.f_yhm)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_yhm");
                    temp.Add("oldvalue", model_old_temp.f_yhm);
                    temp.Add("newvalue", model_new_temp.f_yhm);
                    temp.Add("name", "用户名");
                    array.Add(temp);
                }
                if (model_old_temp.f_ztyhh != model_new_temp.f_ztyhh)
                {
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_ztyhh");
                    temp.Add("oldvalue", model_old_temp.f_ztyhh);
                    temp.Add("newvalue", model_new_temp.f_ztyhh);
                    temp.Add("name", "旧用户号");
                    array.Add(temp);
                }
                #endregion

                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_new_temp.sys_id.ToString(), "tbl_ld_yhb_detail", "用户信息修改推送客户信息", array, clientInf, t);
                

            }
        }


        //导出数据
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string whereString, string orderByString, string column, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_yhb";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_yhb.GetDataTableForPC(whereString, orderByString, column, "", "", null);
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
        public void ExportCross(string whereString, string orderByString, string column, string columnname, string clientInf)
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









