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
using Eva.Library.Data;
using System.Data;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_ichbbk 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_ichbbk : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_ichbbk _idal_tbl_ld_ichbbk = new sara.dd.ldsw.dal.tbl_ld_ichbbk();
        private sara.dd.ldsw.idal.Itbl_ld_sbb _idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.reportclass.tbl_ld_ichbbk report = new sara.dd.ldsw.reportclass.tbl_ld_ichbbk();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
      

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
           
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_ichbbk model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ichbbk>(json);
                if (model.f_hbbh == "")
                {
                    model.f_hbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("hb", "", t);
                    model.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("hb", "", t);
                }
                model.sys_lasteditdate = DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ichbbk.Add(model, t);

                t.getTrans().commit();
                NewLog("数据创建成功，创建的数据为：" + json, "sql_insert", clientInf);
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }


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
                List<sara.dd.ldsw.model.tbl_ld_ichbbk> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ichbbk>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ichbbk.AddList(modellist,null);

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
        //type:pt 普通 hb换表
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Update(string json, string columns,string type, string clientInf)
        {
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_ichbbk model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_ichbbk>(json);
                model.sys_lasteditdate = DateTime.Now;

                switch(type)
                {
                    case"hb":
                        {

                         

                            IList< sara.dd.ldsw.model.tbl_ld_khb> model_khb_list = _idal_tbl_ld_khb.GetList(" sys_id='" + model.f_khbhid.ToString() + "'", "", "*", "", "", t);
                            IList<sara.dd.ldsw.model.tbl_ld_sbb> model_sbb_list = _idal_tbl_ld_sbb.GetList(" sys_id='" + model.f_o_sbbhid.ToString() + "'", "", "*", "", "", t);
                            if(model_khb_list.Count > 0 && model_sbb_list.Count > 0)
                            {
                                sara.dd.ldsw.model.tbl_ld_khb model_khb = model_khb_list[0];
                                sara.dd.ldsw.model.tbl_ld_sbb model_sbb = model_sbb_list[0];


                                //新增水表
                                string newsbid = int.Parse(model.f_n_sbbh).ToString();
                                string insertsql = "insert into TBL_LD_SBB(SYS_ID,SYS_CREATUSERNAME,SYS_CREATDATE,SYS_LASTEDITUSERNAME,SYS_LASTEDITDATE,SYS_DELDATE,SYS_DELFLAG,";
                                insertsql += "F_SBBH,F_ZTSBH,F_LXTH,F_SBFZ,F_SBFZID,F_SBPP,F_MPH,F_SBDZ,F_KHBH,F_RS,F_SBKJ,F_SBKJID,F_SBLX,F_SBLXID,F_JLLX,F_JLLXID,F_CSZM,F_BQZM,";
                                insertsql += "F_SQZM,F_SQSL,F_LJGL,F_qsqpjsl,F_qlqpjsl,F_ZT,F_ZTID,F_BQSL,F_NLJGL) values(" + newsbid + ",'";
                                insertsql += clientInfoDic["username"] + "',to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),'";
                                insertsql += clientInfoDic["username"] + "',to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),";
                                insertsql += "to_date('1900-01-01','yyyy-MM-dd'),'0','" + model.f_n_sbbh + "','" + model.f_n_jsbh + "','" + model.f_n_lxth + "','" + model.f_n_sbfz + "',";
                                insertsql += "'" + model.f_n_sbfzid + "','" + model.f_n_sbpp + "','" + model.f_n_mph + "','" + model.f_n_sbdz + "','" + model.f_khbh + "',";
                                insertsql += "'" + model.f_n_rs + "','" + model.f_n_sbkj + "','" + model.f_n_sbkjid + "','" + model.f_n_sblx + "','" + model.f_n_sblxid + "',";
                                insertsql += "'" + model.f_n_jllx + "','" + model.f_n_jllxid + "','0','0','0','0','" + model_sbb.f_ljgl + "','0','0','启用','0','0','" + model_sbb.f_nljgl + "')";

                                int flag_newsb = t.ExecuteSql(insertsql);


                                //修改老水表信息
                                string updatesql = "update TBL_LD_SBB set SYS_LASTEDITUSERNAME='" + clientInfoDic["username"] + "',SYS_LASTEDITDATE=to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),";
                                updatesql += "F_ZT='停用',F_ZTID='9' where SYS_ID='" + model.f_o_sbbhid.ToString() + "'";
                                int flag_oldsb = t.ExecuteSql(updatesql);


                                //修改客户信息
                                string f_o_sbbhid = "";
                                string f_o_sbbh = "";
                                if (model_khb.f_tssbbhid != "")
                                {
                                    f_o_sbbhid = model_khb.f_tssbbhid + "^" + model.f_o_sbbhid;
                                    f_o_sbbh = model_khb.f_tssbbh + "^" + model.f_o_sbbh;
                                }
                                else
                                {
                                    f_o_sbbhid = model.f_o_sbbhid;
                                    f_o_sbbh = model.f_o_sbbh;
                                }
                                string updatekh = "update TBL_LD_KHB set SYS_LASTEDITUSERNAME='" + clientInfoDic["username"] + "',SYS_LASTEDITDATE=to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),";
                                updatekh += "F_SBBH='" + model.f_n_sbbh + "',F_SBBHID='" + newsbid + "',F_BQZM='0',F_SQZM='0',F_BQSL='0',F_SQSL='0',F_QSQPJSL='0',F_QLQPJSL='0',F_LJGL='" + model_sbb.f_ljgl + "',F_LXTH='" + model.f_n_lxth + "',";
                                updatekh += "F_SBLX='" + model.f_n_sblx + "',F_SBLXID='" + model.f_n_sblxid + "',F_JLLX='" + model.f_n_jllx + "',F_JLLXID='" + model.f_n_jllxid + "',F_ZTSBH='" + model.f_n_jsbh + "',F_RS='" + model.f_n_rs + "',";
                                updatekh += "F_TSSBBHID='" + f_o_sbbhid + "',F_TSSBBH='" + f_o_sbbh + "',";
                                updatekh += "F_SBKJ='" + model.f_n_sbkj + "',F_SBKJID='" + model.f_n_sbkjid + "',F_SBFZ='" + model.f_n_sbfz + "',F_SBFZID='" + model.f_n_sbfzid + "',F_NLJGL='" + model_sbb.f_nljgl + "',F_ICKLJGL='"+model.f_xkljgl+"',F_VALUE9='3' where SYS_ID='" + model.f_khbhid + "'";
                                int flag_kh = t.ExecuteSql(updatekh);

                                if (flag_kh >= 0 && flag_oldsb >= 0 && flag_newsb > 0)
                                {
                                    //记录水表日志
                                    #region 写入日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    #region 对比各个业务子段，将不同的写入array

                                    IDictionary<string, string> temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_zt");
                                    temp.Add("oldvalue", model_sbb.f_zt);
                                    temp.Add("newvalue", "停用");
                                    temp.Add("name", "状态");
                                    array.Add(temp);

                                    temp = new Dictionary<string, string>();
                                    temp.Add("key", "f_ztid");
                                    temp.Add("oldvalue", model_sbb.f_ztid);
                                    temp.Add("newvalue", "9");
                                    temp.Add("name", "状态id");
                                    array.Add(temp);

                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model.f_o_sbbhid.ToString(), "tbl_ld_ichbbk_detail", "IC卡换表补卡", array, clientInf, t);
                                    #endregion

                                    //更新客户表日志

                                    #region 写入日志
                                    array = new List<IDictionary<string, string>>();
                                    #region 对比各个业务子段，将不同的写入array
                                    if (model.f_n_sbbh != model_khb.f_sbbh)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sbbh");
                                        temp.Add("oldvalue", model_khb.f_sbbh);
                                        temp.Add("newvalue", model.f_n_sbbh);
                                        temp.Add("name", "水表编号");
                                        array.Add(temp);
                                    }
                                    if (newsbid != model_khb.f_sbbhid)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sbbhid");
                                        temp.Add("oldvalue", model_khb.f_sbbhid);
                                        temp.Add("newvalue", newsbid);
                                        temp.Add("name", "水表编号id");
                                        array.Add(temp);
                                    }
                                    if ("0" != model_khb.f_bqzm)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_bqzm");
                                        temp.Add("oldvalue", model_khb.f_bqzm);
                                        temp.Add("newvalue", "0");
                                        temp.Add("name", "本期止码");
                                        array.Add(temp);
                                    }
                                    if ("0" != model_khb.f_sqzm)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sqzm");
                                        temp.Add("oldvalue", model_khb.f_sqzm);
                                        temp.Add("newvalue", "0");
                                        temp.Add("name", "上期止码");
                                        array.Add(temp);
                                    }
                                    if ("0" != model_khb.f_bqsl)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_bqsl");
                                        temp.Add("oldvalue", model_khb.f_bqsl);
                                        temp.Add("newvalue", "0");
                                        temp.Add("name", "本期水量");
                                        array.Add(temp);
                                    }
                                    if ("0" != model_khb.f_sqsl)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sqsl");
                                        temp.Add("oldvalue", model_khb.f_sqsl);
                                        temp.Add("newvalue", "0");
                                        temp.Add("name", "上期水量");
                                        array.Add(temp);
                                    }
                                    if ("0" != model_khb.f_qsqpjsl)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_qsqpjsl");
                                        temp.Add("oldvalue", model_khb.f_qsqpjsl);
                                        temp.Add("newvalue", "0");
                                        temp.Add("name", "前三期平均水量");
                                        array.Add(temp);
                                    }
                                    if ("0" != model_khb.f_qlqpjsl)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_qlqpjsl");
                                        temp.Add("oldvalue", model_khb.f_qlqpjsl);
                                        temp.Add("newvalue", "0");
                                        temp.Add("name", "前六期平均水量");
                                        array.Add(temp);
                                    }
                                    if (model_sbb.f_ljgl != model_khb.f_ljgl)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ljgl");
                                        temp.Add("oldvalue", model_khb.f_ljgl);
                                        temp.Add("newvalue", model_sbb.f_ljgl);
                                        temp.Add("name", "累积购量");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_lxth != model_khb.f_lxth)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_lxth");
                                        temp.Add("oldvalue", model_khb.f_lxth);
                                        temp.Add("newvalue", model.f_n_lxth);
                                        temp.Add("name", "老系统号");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_sblx != model_khb.f_sblx)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sblx");
                                        temp.Add("oldvalue", model_khb.f_sblx);
                                        temp.Add("newvalue", model.f_n_sblx);
                                        temp.Add("name", "水表类型");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_sblxid != model_khb.f_sblxid)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sblxid");
                                        temp.Add("oldvalue", model_khb.f_sblxid);
                                        temp.Add("newvalue", model.f_n_sblxid);
                                        temp.Add("name", "水表类型id");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_jllx != model_khb.f_jllx)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_jllx");
                                        temp.Add("oldvalue", model_khb.f_jllx);
                                        temp.Add("newvalue", model.f_n_jllx);
                                        temp.Add("name", "计量类型");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_jllxid != model_khb.f_jllxid)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_jllxid");
                                        temp.Add("oldvalue", model_khb.f_jllxid);
                                        temp.Add("newvalue", model.f_n_jllxid);
                                        temp.Add("name", "计量类型");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_jsbh != model_khb.f_ztsbh)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_ztsbh");
                                        temp.Add("oldvalue", model_khb.f_ztsbh);
                                        temp.Add("newvalue", model.f_n_jsbh);
                                        temp.Add("name", "旧水表号");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_rs != model_khb.f_rs)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_rs");
                                        temp.Add("oldvalue", model_khb.f_rs);
                                        temp.Add("newvalue", model.f_n_rs);
                                        temp.Add("name", "人数");
                                        array.Add(temp);
                                    }

                                    if (model.f_n_sbkj != model_khb.f_sbkj)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sbkj");
                                        temp.Add("oldvalue", model_khb.f_sbkj);
                                        temp.Add("newvalue", model.f_n_sbkj);
                                        temp.Add("name", "水表口径");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_sbkjid != model_khb.f_sbkjid)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sbkjid");
                                        temp.Add("oldvalue", model_khb.f_sbkjid);
                                        temp.Add("newvalue", model.f_n_sbkjid);
                                        temp.Add("name", "水表口径id");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_sbfz != model_khb.f_sbfz)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sbfz");
                                        temp.Add("oldvalue", model_khb.f_sbfz);
                                        temp.Add("newvalue", model.f_n_sbfz);
                                        temp.Add("name", "水表分组");
                                        array.Add(temp);
                                    }
                                    if (model.f_n_sbfzid != model_khb.f_sbfzid)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_sbfzid");
                                        temp.Add("oldvalue", model_khb.f_sbfzid);
                                        temp.Add("newvalue", model.f_n_sbfzid);
                                        temp.Add("name", "水表分组id");
                                        array.Add(temp);
                                    }
                                    if (model_sbb.f_nljgl != model_khb.f_nljgl)
                                    {
                                        temp = new Dictionary<string, string>();
                                        temp.Add("key", "f_nljgl");
                                        temp.Add("oldvalue", model_khb.f_nljgl);
                                        temp.Add("newvalue", model_sbb.f_nljgl);
                                        temp.Add("name", "年用水量");
                                        array.Add(temp);
                                    }


                                    #endregion
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model.f_khbhid.ToString(), "tbl_ld_ichbbk_detail", "IC卡换表补卡", array, clientInf, t);
                                    #endregion


                                    columns = FormatColumns(columns).Replace("^", ",");
                                    resultDic["result"] = "true";
                                    resultDic["message"] = _idal_tbl_ld_ichbbk.Update(model, columns, t);
                                    t.getTrans().commit();
                                    NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
                                }
                                else
                                {
                                    string errormessage = "";
                                    if (flag_kh < 0)
                                    {
                                        errormessage += "客户表更新失败;";
                                    }

                                    if (flag_oldsb < 0)
                                    {
                                        errormessage += "旧水表数据更新失败;";
                                    }

                                    if (flag_newsb <= 0)
                                    {
                                        errormessage += "新水表数据写入失败;";
                                    }

                                    resultDic["result"] = "false";
                                    resultDic["message"] = errormessage;

                                    t.getTrans().rollback();
                                }

                            }
                            else
                            {
                                string errormessage = "";

                                if (model_khb_list.Count <= 0)
                                {
                                    errormessage += "没有查询到客户信息;";
                                }
                                if (model_sbb_list.Count <= 0)
                                {
                                    errormessage += "没有查询到水表信息;";
                                }
                                resultDic["result"] = "false";
                                resultDic["message"] = errormessage;

                                t.getTrans().rollback();
                            }

                        
                        }
                        break;
                    case "pt":
                    default:
                        {
                            columns = FormatColumns(columns).Replace("^", ",");
                            resultDic["result"] = "true";
                            resultDic["message"] = _idal_tbl_ld_ichbbk.Update(model, columns, t);

                            t.getTrans().commit();

                            NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
                        }
                        break;
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
        public void UpdateCross(string json, string columns,string type, string clientInf)
        {
            string result1 = this.Update(json, columns,type, clientInf);
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
                 List<sara.dd.ldsw.model.tbl_ld_ichbbk> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_ichbbk>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_ichbbk.UpdateList(modellist, columns,null);

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
             

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_ichbbk.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_ichbbk.LogicDelete(delUserId, delUserName, delDate, whereString,null);

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
                resultDic["message"] = _idal_tbl_ld_ichbbk.GetCount(whereString,null);

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

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_ichbbk>(_idal_tbl_ld_ichbbk.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_ichbbk.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
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

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_ichbbk.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_ichbbk.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
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
                		
				columns += "^" + "f_hbbh";
                		
				columns += "^" + "f_sjbh";
                		
				columns += "^" + "f_khbh";
                		
				columns += "^" + "f_yhm";
                		
				columns += "^" + "f_jfm";
                		
				columns += "^" + "f_lxth";
                		
				columns += "^" + "f_dh";
                		
				columns += "^" + "f_dz";
                		
				columns += "^" + "f_xunkr";
                		
				columns += "^" + "f_xiekrid";
                		
				columns += "^" + "f_yslxid";
                		
				columns += "^" + "f_dy";
                		
				columns += "^" + "f_qy";
                		
				columns += "^" + "f_xunkrid";
                		
				columns += "^" + "f_xiekrq";
                		
				columns += "^" + "f_yhbh";
                		
				columns += "^" + "f_dyid";
                		
				columns += "^" + "f_qyid";
                		
				columns += "^" + "f_xunkrq";
                		
				columns += "^" + "f_khbhid";
                		
				columns += "^" + "f_yhbhid";
                		
				columns += "^" + "f_sc";
                		
				columns += "^" + "f_pq";
                		
				columns += "^" + "f_xiekr";
                		
				columns += "^" + "f_yslx";
                		
				columns += "^" + "f_khrq";
                		
				columns += "^" + "f_scid";
                		
				columns += "^" + "f_pqid";
                		
				columns += "^" + "f_o_sbbh";
                		
				columns += "^" + "f_o_sbfzid";
                		
				columns += "^" + "f_o_khbh";
                		
				columns += "^" + "f_o_sblx";
                		
				columns += "^" + "f_o_cszm";
                		
				columns += "^" + "f_o_ljgl";
                		
				columns += "^" + "f_o_jsbh";
                		
				columns += "^" + "f_o_sbpp";
                		
				columns += "^" + "f_o_rs";
                		
				columns += "^" + "f_o_sblxid";
                		
				columns += "^" + "f_o_bqzm";
                		
				columns += "^" + "f_o_qsqpjsl";
                		
				columns += "^" + "f_o_lxth";
                		
				columns += "^" + "f_o_mph";
                		
				columns += "^" + "f_o_sbkj";
                		
				columns += "^" + "f_o_jllx";
                		
				columns += "^" + "f_o_sqzm";
                		
				columns += "^" + "f_o_qlqpjsl";
                		
				columns += "^" + "f_o_sbfz";
                		
				columns += "^" + "f_o_sbdz";
                		
				columns += "^" + "f_o_sbkjid";
                		
				columns += "^" + "f_o_jllxid";
                		
				columns += "^" + "f_o_sqsl";
                		
				columns += "^" + "f_o_bqsl";
                		
				columns += "^" + "f_n_sbbh";
                		
				columns += "^" + "f_n_sbfz";
                		
				columns += "^" + "f_n_sbfzid";
                		
				columns += "^" + "f_n_sbpp";
                		
				columns += "^" + "f_n_mph";
                		
				columns += "^" + "f_n_rs";
                		
				columns += "^" + "f_n_sbkj";
                		
				columns += "^" + "f_n_sbkjid";
                		
				columns += "^" + "f_n_jsbh";
                		
				columns += "^" + "f_n_lxth";
                		
				columns += "^" + "f_n_khbh";
                		
				columns += "^" + "f_n_sblx";
                		
				columns += "^" + "f_n_sblxid";
                		
				columns += "^" + "f_n_jllx";
                		
				columns += "^" + "f_n_jllxid";
                		
				columns += "^" + "f_n_ljgl";
                		
				columns += "^" + "f_n_cqzm";
                		
				columns += "^" + "f_n_sqzm";
                		
				columns += "^" + "f_n_bqzm";
                		
				columns += "^" + "f_n_bqsl";
                		
				columns += "^" + "f_n_qsqpjsl";
                		
				columns += "^" + "f_n_qlqpjsl";
                		
				columns += "^" + "f_n_sqsl";
                		
				columns += "^" + "f_n_sbdz";
                		
				columns += "^" + "f_zt";
                		
				columns += "^" + "f_ztid";
                		
				columns += "^" + "f_bz";
                        		
				        columns += "^" + "f_o_sbbhid";
                        		
				        columns += "^" + "f_o_sbds";
                        		
				        columns += "^" + "f_gslb";
                        		
				        columns += "^" + "f_gslbid";
                        		
				        columns += "^" + "f_khfz";
                        		
				        columns += "^" + "f_khfzid";
                        		
				        columns += "^" + "f_cbbh";
                        		
				        columns += "^" + "f_cbbhid";
                        		
				        columns += "^" + "f_xklx";
                        		
				        columns += "^" + "f_xkkh";
                        		
				        columns += "^" + "f_xkgscs";
                        		
				        columns += "^" + "f_xkbcgsl";
                        		
				        columns += "^" + "f_xkms";
                        		
				        columns += "^" + "f_xkmsid";
                        		
				        columns += "^" + "f_xkljgl";
                        		
				        columns += "^" + "f_xkjzlx";
                        		
				        columns += "^" + "f_port";
                        		
				        columns += "^" + "f_dkkh";
                        		
				        columns += "^" + "f_dkbcgsl";
                        		
				        columns += "^" + "f_dkgscs";
                        		
				        columns += "^" + "f_dkljgl";
                        		
				        columns += "^" + "f_dkjzlx";
                        		
				        columns += "^" + "f_dksbzt";

                        columns += "^" + "f_bssl";
                        columns += "^" + "f_hbyy";
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
                //sql += " from tbl_ld_ichbbk";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_ichbbk.GetDataTableForPC(whereString, orderByString, column, "", "", null);
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









