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
using Eva.Library.Data;
using System.Globalization;
using System.Text;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_cbiao 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_cbiao : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_cbiao _idal_tbl_ld_cbiao = new sara.dd.ldsw.dal.tbl_ld_cbiao();
        private sara.dd.ldsw.idal.Itbl_ld_jfb _idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
        private sara.dd.ldsw.reportclass.tbl_ld_cbiao report = new sara.dd.ldsw.reportclass.tbl_ld_cbiao();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {
               
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_cbiao model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cbiao>(json);
                if (model.f_cb_cbbh == "")
                {
                    model.f_cb_cbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("cb", "", t);
                }
                model.f_cbsj = DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;
                //新建抄表sys_id;

                //如果是手持机，删除本客户下其他新新建状态抄表记录，避免重复抄表
                if (model.f_lyid == "05450002")
                {
                    t.ExecuteSql("delete from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid='0'");
                }

                    //如果状态是1，说明是提交操作，
                    #region MyRegion
                    if (model.f_ztid == "1")
                    {
                        //本期金额是否为0的判断，如果为0直接将状态置为已缴费
                        if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
                        {
                            model.f_ztid = "3";
                            model.f_zt = "已缴费";

                        }
                        #region 预算费
                        string str_ysf = t.GetSingle(" select f_waterrent('" + model.f_khbhid + "','" + model.f_bqsl + "','1') as je from dual ").ToString();

                        string sf = str_ysf.Split('|')[0].Split('^')[0];
                        string pwf = str_ysf.Split('|')[0].Split('^')[1];

                        double ysf = Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf);
                        model.f_value1 = Eva.Library.Text.NumberTool.GetNumberByLength(ysf, 2);

                        model.f_value2 = str_ysf;
                        #endregion

                        double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                        #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                        {
                            double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                            double zf = 0;
                            if (qsqpjsl != 0)
                            {
                                zf = (bqsl - qsqpjsl) / qsqpjsl;
                            }

                            sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                            sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                            double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                                model.f_sfsfts = "true";
                            }
                            else
                            {
                                model.f_sfsfts = "false";
                            }
                        }
                        #endregion

                        #region 最新平均水量

                        //【前三期平均水量】【前六期平均水量】

                        string f_qsqpjsl = "";
                        string f_qlqpjsl = "";
                        CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                        #endregion

                        #region 推送数据到客户表
                        //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                        //【前三期平均水量】【前六期平均水量】(最新三或六期)

                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                        #endregion
                        //计算新的抄表周期
                        DateTime cbsj;
                        DateTime today = DateTime.Now.Date;
                        DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                        dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                        model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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
                        idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl", t);


                        #region 写日志
                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_zhcbrq");
                        temp.Add("oldvalue", f_zhcbrq_old);
                        temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                        temp.Add("name", "最后抄表日期");
                        array.Add(temp);
                        IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                        f_bqzm.Add("key", "f_bqzm");
                        f_bqzm.Add("oldvalue", f_bqzm_old);
                        f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                        f_bqzm.Add("name", "本期止码 ");
                        array.Add(f_bqzm);
                        IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                        f_sqzm.Add("key", "f_sqzm");
                        f_sqzm.Add("oldvalue", f_sqzm_old);
                        f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                        f_sqzm.Add("name", "上期止码 ");
                        array.Add(f_sqzm);
                        IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                        f_nljgl.Add("key", "f_nljgl");
                        f_nljgl.Add("oldvalue", f_nljgl_old);
                        f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                        f_nljgl.Add("name", "年累计够量");
                        array.Add(f_nljgl);
                        IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                        f_ljgl.Add("key", "f_ljgl");
                        f_ljgl.Add("oldvalue", f_ljgl_old);
                        f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                        f_ljgl.Add("name", "累计够量");
                        array.Add(f_ljgl);
                        IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                        qsqpjsl_dic.Add("key", "qsqpjsl");
                        qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                        qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                        qsqpjsl_dic.Add("name", "前三期平均水量");
                        array.Add(qsqpjsl_dic);
                        IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                        qlqpjsl_dic.Add("key", "qlqpjsl");
                        qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                        qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                        qlqpjsl_dic.Add("name", "前六期平均水量");
                        array.Add(qlqpjsl_dic);
                        IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                        f_bqsl.Add("key", "f_bqsl");
                        f_bqsl.Add("oldvalue", f_bqsl_old);
                        f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                        f_bqsl.Add("name", "本期水量 ");
                        array.Add(f_bqsl);
                        IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                        f_sqsl.Add("key", "f_bqsl");
                        f_sqsl.Add("oldvalue", f_sqsl_old);
                        f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                        f_sqsl.Add("name", "上期水量");
                        array.Add(f_sqsl);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                        #endregion
                        #endregion


                        #region 推送数据到水表表
                        //【年累计购量】【累计购量】 
                        //【前三期平均水量】【前六期平均水量】

                        sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                        model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                        model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                        model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                        idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                        #endregion

                        #region 写日志

                        List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                        IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                        sb_f_nljgl.Add("key", "f_nljgl");
                        sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                        sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                        sb_f_nljgl.Add("name", "年累计购量");
                        list.Add(sb_f_nljgl);

                        IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                        sb_f_ljgl.Add("key", "f_ljgl");
                        sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                        sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                        sb_f_ljgl.Add("name", "累计购量");
                        list.Add(sb_f_ljgl);

                        IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                        sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                        sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                        sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                        sb_f_qsqpjsl.Add("name", "前三期平均水量");
                        list.Add(sb_f_qsqpjsl);

                        IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                        sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                        sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                        sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                        sb_f_qlqpjsl.Add("name", "前六期平均水量");
                        list.Add(sb_f_qlqpjsl);

                        IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                        sb_f_bqzm.Add("key", "f_bqzm");
                        sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                        sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                        sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                        sb_f_bqsl.Add("name", "本期水量");
                        list.Add(sb_f_bqsl);
                        IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                        sb_f_sqsl.Add("key", "f_sqsl");
                        sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                        sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                        sb_f_sqsl.Add("name", "上期水量");
                        list.Add(sb_f_sqsl);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion


                }
				
				 //已算费--app抄表缴费时，只抄表
                if (model.f_ztid == "2")
                {
                    //本期金额是否为0的判断，如果为0直接将状态置为已缴费
                    if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
                    {
                        model.f_ztid = "3";
                        model.f_zt = "已缴费";

                    }

                    double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                    #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                    {
                        double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                        double zf = 0;
                        if (qsqpjsl != 0)
                        {
                            zf = (bqsl - qsqpjsl) / qsqpjsl;
                        }

                        sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                        sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                        double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                            model.f_sfsfts = "true";
                        }
                        else
                        {
                            model.f_sfsfts = "false";
                        }
                    }
                    #endregion

                    #region 最新平均水量

                    //【前三期平均水量】【前六期平均水量】

                    string f_qsqpjsl = "";
                    string f_qlqpjsl = "";
                    CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                    #endregion

                    #region 推送数据到客户表
                    //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                    //【前三期平均水量】【前六期平均水量】(最新三或六期)
                    //【累计欠费】

                    sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                    model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    //写入抄表表瞬间累积欠费字段
                    model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ljqf", t);


                    #region 写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zhcbrq");
                    temp.Add("oldvalue", f_zhcbrq_old);
                    temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "最后抄表日期");
                    array.Add(temp);
                    IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                    f_bqzm.Add("key", "f_bqzm");
                    f_bqzm.Add("oldvalue", f_bqzm_old);
                    f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                    f_bqzm.Add("name", "本期止码 ");
                    array.Add(f_bqzm);
                    IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                    f_sqzm.Add("key", "f_sqzm");
                    f_sqzm.Add("oldvalue", f_sqzm_old);
                    f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                    f_sqzm.Add("name", "上期止码 ");
                    array.Add(f_sqzm);
                    IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                    f_nljgl.Add("key", "f_nljgl");
                    f_nljgl.Add("oldvalue", f_nljgl_old);
                    f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                    f_nljgl.Add("name", "年累计够量");
                    array.Add(f_nljgl);
                    IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                    f_ljgl.Add("key", "f_ljgl");
                    f_ljgl.Add("oldvalue", f_ljgl_old);
                    f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                    f_ljgl.Add("name", "累计够量");
                    array.Add(f_ljgl);
                    IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                    qsqpjsl_dic.Add("key", "qsqpjsl");
                    qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                    qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                    qsqpjsl_dic.Add("name", "前三期平均水量");
                    array.Add(qsqpjsl_dic);
                    IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                    qlqpjsl_dic.Add("key", "qlqpjsl");
                    qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                    qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                    qlqpjsl_dic.Add("name", "前六期平均水量");
                    array.Add(qlqpjsl_dic);
                    IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                    f_bqsl.Add("key", "f_bqsl");
                    f_bqsl.Add("oldvalue", f_bqsl_old);
                    f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                    f_bqsl.Add("name", "本期水量 ");
                    array.Add(f_bqsl);
                    IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                    f_sqsl.Add("key", "f_bqsl");
                    f_sqsl.Add("oldvalue", f_sqsl_old);
                    f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                    f_sqsl.Add("name", "上期水量");
                    array.Add(f_sqsl);
                    IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                    f_ljqf.Add("key", "f_ljqf");
                    f_ljqf.Add("oldvalue", f_ljqf_old);
                    f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                    f_ljqf.Add("name", "累计欠费");
                    array.Add(f_ljqf);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP只抄表", array, clientInf, t);
                    #endregion
                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】

                    sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                    sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                    model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                    model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                    model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                    idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                    #endregion

                    #region 写日志

                    List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                    IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                    sb_f_nljgl.Add("key", "f_nljgl");
                    sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                    sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                    sb_f_nljgl.Add("name", "年累计购量");
                    list.Add(sb_f_nljgl);

                    IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                    sb_f_ljgl.Add("key", "f_ljgl");
                    sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                    sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                    sb_f_ljgl.Add("name", "累计购量");
                    list.Add(sb_f_ljgl);

                    IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                    sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                    sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                    sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                    sb_f_qsqpjsl.Add("name", "前三期平均水量");
                    list.Add(sb_f_qsqpjsl);

                    IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                    sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                    sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                    sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                    sb_f_qlqpjsl.Add("name", "前六期平均水量");
                    list.Add(sb_f_qlqpjsl);

                    IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                    sb_f_bqzm.Add("key", "f_bqzm");
                    sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                    sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                    sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                    sb_f_bqsl.Add("name", "本期水量");
                    list.Add(sb_f_bqsl);
                    IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                    sb_f_sqsl.Add("key", "f_sqsl");
                    sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                    sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                    sb_f_sqsl.Add("name", "上期水量");
                    list.Add(sb_f_sqsl);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion
					}


                #endregion
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cbiao.Add(model, t);

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
                List<sara.dd.ldsw.model.tbl_ld_cbiao> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cbiao.AddList(modellist, null);

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

                sara.dd.ldsw.model.tbl_ld_cbiao model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cbiao>(json);
                model.sys_lasteditdate = DateTime.Now;


                    //如果状态是1，说明是提交操作，
                    #region MyRegion
                    if (model.f_ztid == "1")
                    {
                        //本期金额是否为0的判断，如果为0直接将状态置为已缴费
                        if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
                        {
                            model.f_ztid = "3";
                            model.f_zt = "已缴费";

                        }

                        #region 预算费
                        string str_ysf = t.GetSingle(" select f_waterrent('" + model.f_khbhid + "','" + model.f_bqsl + "','1') as je from dual ").ToString();

                        string sf = str_ysf.Split('|')[0].Split('^')[0];
                        string pwf = str_ysf.Split('|')[0].Split('^')[1];

                        double ysf = Eva.Library.Text.NumberTool.Parse(sf) + Eva.Library.Text.NumberTool.Parse(pwf);
                        model.f_value1 = Eva.Library.Text.NumberTool.GetNumberByLength(ysf, 2);

                        model.f_value2 = str_ysf;
                        #endregion

                        double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                        #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                        {
                            double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                            double zf = 0;
                            if (qsqpjsl != 0)
                            {
                                zf = (bqsl - qsqpjsl) / qsqpjsl;
                            }

                            sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                            sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                            double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                                model.f_sfsfts = "true";
                            }
                            else
                            {
                                model.f_sfsfts = "false";
                            }
                        }
                        #endregion

                        #region 最新平均水量

                        //【前三期平均水量】【前六期平均水量】

                        string f_qsqpjsl = "";
                        string f_qlqpjsl = "";
                        CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                        #endregion

                        #region 推送数据到客户表
                        //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                        //【前三期平均水量】【前六期平均水量】(最新三或六期)

                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                        #endregion
                        //计算新的抄表周期
                        DateTime cbsj;
                        DateTime today = DateTime.Now.Date;
                        DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                        dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                        model_tbl_ld_khb.f_bqzm = model.f_bqzm;

                        double yz = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                        double xz = yz + bqsl;
                        model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(xz, 2);

                        double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                        double new_ljgl = ljgl + bqsl;
                        model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

                        model_tbl_ld_khb.f_qsqpjsl = f_qsqpjsl;
                        model_tbl_ld_khb.f_qlqpjsl = f_qlqpjsl;

                        model_tbl_ld_khb.f_sqsl = model_tbl_ld_khb.f_bqsl;
                        model_tbl_ld_khb.f_bqsl = bqsl.ToString();

                        idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl", t);


                        #region 写日志
                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_zhcbrq");
                        temp.Add("oldvalue", f_zhcbrq_old);
                        temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                        temp.Add("name", "最后抄表日期");
                        array.Add(temp);
                        IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                        f_bqzm.Add("key", "f_bqzm");
                        f_bqzm.Add("oldvalue", f_bqzm_old);
                        f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                        f_bqzm.Add("name", "本期止码 ");
                        array.Add(f_bqzm);
                        IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                        f_sqzm.Add("key", "f_sqzm");
                        f_sqzm.Add("oldvalue", f_sqzm_old);
                        f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                        f_sqzm.Add("name", "上期止码 ");
                        array.Add(f_sqzm);
                        IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                        f_nljgl.Add("key", "f_nljgl");
                        f_nljgl.Add("oldvalue", f_nljgl_old);
                        f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                        f_nljgl.Add("name", "年累计够量");
                        array.Add(f_nljgl);
                        IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                        f_ljgl.Add("key", "f_ljgl");
                        f_ljgl.Add("oldvalue", f_ljgl_old);
                        f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                        f_ljgl.Add("name", "累计够量");
                        array.Add(f_ljgl);
                        IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                        qsqpjsl_dic.Add("key", "qsqpjsl");
                        qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                        qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                        qsqpjsl_dic.Add("name", "前三期平均水量");
                        array.Add(qsqpjsl_dic);
                        IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                        qlqpjsl_dic.Add("key", "qlqpjsl");
                        qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                        qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                        qlqpjsl_dic.Add("name", "前六期平均水量");
                        array.Add(qlqpjsl_dic);

                        IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                        f_bqsl.Add("key", "f_bqsl");
                        f_bqsl.Add("oldvalue", f_bqsl_old);
                        f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                        f_bqsl.Add("name", "本期水量 ");
                        array.Add(f_bqsl);
                        IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                        f_sqsl.Add("key", "f_bqsl");
                        f_sqsl.Add("oldvalue", f_sqsl_old);
                        f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                        f_sqsl.Add("name", "上期水量");
                        array.Add(f_sqsl);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                        #endregion
                        #endregion


                        #region 推送数据到水表表
                        //【年累计购量】【累计购量】 
                        //【前三期平均水量】【前六期平均水量】

                        sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];

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
                        model_tbl_ld_sbb.f_bqzm = model.f_bqzm;

                        model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                        model_tbl_ld_sbb.f_bqsl = model.f_bqsl;

                        idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                        #endregion


                        #region 写日志
                        //写日志
                        List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                        IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                        sb_f_nljgl.Add("key", "f_nljgl");
                        sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                        sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                        sb_f_nljgl.Add("name", "年累计购量");
                        list.Add(sb_f_nljgl);

                        IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                        sb_f_ljgl.Add("key", "f_ljgl");
                        sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                        sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                        sb_f_ljgl.Add("name", "累计购量");
                        list.Add(sb_f_ljgl);

                        IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                        sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                        sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                        sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                        sb_f_qsqpjsl.Add("name", "前三期平均水量");
                        list.Add(sb_f_qsqpjsl);

                        IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                        sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                        sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                        sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                        sb_f_qlqpjsl.Add("name", "前六期平均水量");
                        list.Add(sb_f_qlqpjsl);


                        IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                        sb_f_bqzm.Add("key", "f_bqzm");
                        sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                        sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                        sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                        sb_f_bqsl.Add("name", "本期水量");
                        list.Add(sb_f_bqsl);

                        IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                        sb_f_sqsl.Add("key", "f_sqsl");
                        sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                        sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                        sb_f_sqsl.Add("name", "上期水量");
                        list.Add(sb_f_sqsl);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);

                        #endregion
                    }
					 //已算费--app抄表缴费时，只抄表
                if (model.f_ztid == "2")
                {

                    //本期金额是否为0的判断，如果为0直接将状态置为已缴费
                    if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
                    {
                        model.f_ztid = "3";
                        model.f_zt = "已缴费";

                    }

                    double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                    #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                    {
                        double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                        double zf = 0;
                        if (qsqpjsl != 0)
                        {
                            zf = (bqsl - qsqpjsl) / qsqpjsl;
                        }

                        sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                        sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                        double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                            model.f_sfsfts = "true";
                        }
                        else
                        {
                            model.f_sfsfts = "false";
                        }
                    }
                    #endregion

                    #region 最新平均水量

                    //【前三期平均水量】【前六期平均水量】

                    string f_qsqpjsl = "";
                    string f_qlqpjsl = "";
                    CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                    #endregion

                    #region 推送数据到客户表
                    //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                    //【前三期平均水量】【前六期平均水量】(最新三或六期)
                    //【累计欠费】

                    sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                    model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    //写入抄表表瞬间累积欠费字段
                    model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);

                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ljqf", t);


                    #region 写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zhcbrq");
                    temp.Add("oldvalue", f_zhcbrq_old);
                    temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "最后抄表日期");
                    array.Add(temp);
                    IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                    f_bqzm.Add("key", "f_bqzm");
                    f_bqzm.Add("oldvalue", f_bqzm_old);
                    f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                    f_bqzm.Add("name", "本期止码 ");
                    array.Add(f_bqzm);
                    IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                    f_sqzm.Add("key", "f_sqzm");
                    f_sqzm.Add("oldvalue", f_sqzm_old);
                    f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                    f_sqzm.Add("name", "上期止码 ");
                    array.Add(f_sqzm);
                    IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                    f_nljgl.Add("key", "f_nljgl");
                    f_nljgl.Add("oldvalue", f_nljgl_old);
                    f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                    f_nljgl.Add("name", "年累计够量");
                    array.Add(f_nljgl);
                    IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                    f_ljgl.Add("key", "f_ljgl");
                    f_ljgl.Add("oldvalue", f_ljgl_old);
                    f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                    f_ljgl.Add("name", "累计够量");
                    array.Add(f_ljgl);
                    IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                    qsqpjsl_dic.Add("key", "qsqpjsl");
                    qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                    qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                    qsqpjsl_dic.Add("name", "前三期平均水量");
                    array.Add(qsqpjsl_dic);
                    IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                    qlqpjsl_dic.Add("key", "qlqpjsl");
                    qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                    qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                    qlqpjsl_dic.Add("name", "前六期平均水量");
                    array.Add(qlqpjsl_dic);
                    IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                    f_bqsl.Add("key", "f_bqsl");
                    f_bqsl.Add("oldvalue", f_bqsl_old);
                    f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                    f_bqsl.Add("name", "本期水量 ");
                    array.Add(f_bqsl);
                    IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                    f_sqsl.Add("key", "f_bqsl");
                    f_sqsl.Add("oldvalue", f_sqsl_old);
                    f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                    f_sqsl.Add("name", "上期水量");
                    array.Add(f_sqsl);
                    IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                    f_ljqf.Add("key", "f_ljqf");
                    f_ljqf.Add("oldvalue", f_ljqf_old);
                    f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                    f_ljqf.Add("name", "累计欠费");
                    array.Add(f_ljqf);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP只抄表", array, clientInf, t);
                    #endregion
                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】

                    sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                    sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                    model_tbl_ld_sbb.f_qsqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(sb_qsqpjsl, 2);

                    double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
                    model_tbl_ld_sbb.f_qlqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(sb_qlqpjsl, 2);

                    model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
                    model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                    model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                    model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                    idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                    #endregion

                    #region 写日志

                    List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                    IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                    sb_f_nljgl.Add("key", "f_nljgl");
                    sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                    sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                    sb_f_nljgl.Add("name", "年累计购量");
                    list.Add(sb_f_nljgl);

                    IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                    sb_f_ljgl.Add("key", "f_ljgl");
                    sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                    sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                    sb_f_ljgl.Add("name", "累计购量");
                    list.Add(sb_f_ljgl);

                    IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                    sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                    sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                    sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                    sb_f_qsqpjsl.Add("name", "前三期平均水量");
                    list.Add(sb_f_qsqpjsl);

                    IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                    sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                    sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                    sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                    sb_f_qlqpjsl.Add("name", "前六期平均水量");
                    list.Add(sb_f_qlqpjsl);

                    IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                    sb_f_bqzm.Add("key", "f_bqzm");
                    sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                    sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                    sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                    sb_f_bqsl.Add("name", "本期水量");
                    list.Add(sb_f_bqsl);
                    IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                    sb_f_sqsl.Add("key", "f_sqsl");
                    sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                    sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                    sb_f_sqsl.Add("name", "上期水量");
                    list.Add(sb_f_sqsl);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion
                }

                    #endregion


                    columns = FormatColumns(columns).Replace("^", ",");
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_cbiao.Update(model, columns, t);


                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);


                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                t.getTrans().rollback();

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Addforapp(string jsoncb,string jsonjf, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
            try
            {

                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_cbiao model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cbiao>(jsoncb);
                if (model.f_cb_cbbh == "")
                {
                    model.f_cb_cbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("cb", "", t);
                }
                model.f_cbsj = DateTime.Now;
                model.sys_creatdate = DateTime.Now;
                model.sys_lasteditdate = DateTime.Now;
                //新建抄表sys_id;
                string cbsysid = "";

                //如果是手持机，删除本客户下其他新新建状态抄表记录，避免重复抄表
                if (model.f_lyid == "05450002")
                {
                    t.ExecuteSql("delete from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid='0'");
                }

                #region MyRegion

                //已算费--app抄表缴费时，只抄表
                if (model.f_ztid == "2")
                {

                    //本期金额是否为0的判断，如果为0直接将状态置为已缴费
                    if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
                    {
                        model.f_ztid = "3";
                        model.f_zt = "已缴费";
                        

                    }

                    double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                    #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                    {
                        double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                        double zf = 0;
                        if (qsqpjsl != 0)
                        {
                            zf = (bqsl - qsqpjsl) / qsqpjsl;
                        }

                        sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                        sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                        double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                            model.f_sfsfts = "true";
                        }
                        else
                        {
                            model.f_sfsfts = "false";
                        }
                    }
                    #endregion

                    #region 最新平均水量

                    //【前三期平均水量】【前六期平均水量】

                    string f_qsqpjsl = "";
                    string f_qlqpjsl = "";
                    CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                    #endregion

                    #region 推送数据到客户表
                    //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                    //【前三期平均水量】【前六期平均水量】(最新三或六期)
                    //【累计欠费】

                    sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                    model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    //写入抄表表瞬间累积欠费字段
                    model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ljqf", t);


                    #region 写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zhcbrq");
                    temp.Add("oldvalue", f_zhcbrq_old);
                    temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "最后抄表日期");
                    array.Add(temp);
                    IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                    f_bqzm.Add("key", "f_bqzm");
                    f_bqzm.Add("oldvalue", f_bqzm_old);
                    f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                    f_bqzm.Add("name", "本期止码 ");
                    array.Add(f_bqzm);
                    IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                    f_sqzm.Add("key", "f_sqzm");
                    f_sqzm.Add("oldvalue", f_sqzm_old);
                    f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                    f_sqzm.Add("name", "上期止码 ");
                    array.Add(f_sqzm);
                    IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                    f_nljgl.Add("key", "f_nljgl");
                    f_nljgl.Add("oldvalue", f_nljgl_old);
                    f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                    f_nljgl.Add("name", "年累计够量");
                    array.Add(f_nljgl);
                    IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                    f_ljgl.Add("key", "f_ljgl");
                    f_ljgl.Add("oldvalue", f_ljgl_old);
                    f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                    f_ljgl.Add("name", "累计够量");
                    array.Add(f_ljgl);
                    IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                    qsqpjsl_dic.Add("key", "qsqpjsl");
                    qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                    qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                    qsqpjsl_dic.Add("name", "前三期平均水量");
                    array.Add(qsqpjsl_dic);
                    IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                    qlqpjsl_dic.Add("key", "qlqpjsl");
                    qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                    qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                    qlqpjsl_dic.Add("name", "前六期平均水量");
                    array.Add(qlqpjsl_dic);
                    IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                    f_bqsl.Add("key", "f_bqsl");
                    f_bqsl.Add("oldvalue", f_bqsl_old);
                    f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                    f_bqsl.Add("name", "本期水量 ");
                    array.Add(f_bqsl);
                    IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                    f_sqsl.Add("key", "f_bqsl");
                    f_sqsl.Add("oldvalue", f_sqsl_old);
                    f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                    f_sqsl.Add("name", "上期水量");
                    array.Add(f_sqsl);
                    IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                    f_ljqf.Add("key", "f_ljqf");
                    f_ljqf.Add("oldvalue", f_ljqf_old);
                    f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                    f_ljqf.Add("name", "累计欠费");
                    array.Add(f_ljqf);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP只抄表", array, clientInf, t);
                    #endregion
                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】

                    sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                    sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                    model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                    model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                    model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                    idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                    #endregion

                    #region 写日志

                    List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                    IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                    sb_f_nljgl.Add("key", "f_nljgl");
                    sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                    sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                    sb_f_nljgl.Add("name", "年累计购量");
                    list.Add(sb_f_nljgl);

                    IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                    sb_f_ljgl.Add("key", "f_ljgl");
                    sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                    sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                    sb_f_ljgl.Add("name", "累计购量");
                    list.Add(sb_f_ljgl);

                    IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                    sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                    sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                    sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                    sb_f_qsqpjsl.Add("name", "前三期平均水量");
                    list.Add(sb_f_qsqpjsl);

                    IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                    sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                    sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                    sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                    sb_f_qlqpjsl.Add("name", "前六期平均水量");
                    list.Add(sb_f_qlqpjsl);

                    IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                    sb_f_bqzm.Add("key", "f_bqzm");
                    sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                    sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                    sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                    sb_f_bqsl.Add("name", "本期水量");
                    list.Add(sb_f_bqsl);
                    IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                    sb_f_sqsl.Add("key", "f_sqsl");
                    sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                    sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                    sb_f_sqsl.Add("name", "上期水量");
                    list.Add(sb_f_sqsl);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion

                    cbsysid = _idal_tbl_ld_cbiao.Add(model, t);
                }

                //已缴费--app抄表缴费时，抄表缴费
                else if (model.f_ztid == "3")
                {


                    double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                    sara.dd.ldsw.model.tbl_ld_jfb jfmodel = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(jsonjf);

                    #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                    {
                        double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                        double zf = 0;
                        if (qsqpjsl != 0)
                        {
                            zf = (bqsl - qsqpjsl) / qsqpjsl;
                        }

                        sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                        sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                        double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                            model.f_sfsfts = "true";
                        }
                        else
                        {
                            model.f_sfsfts = "false";
                        }
                    }
                    #endregion

                    #region 最新平均水量

                    //【前三期平均水量】【前六期平均水量】

                    string f_qsqpjsl = "";
                    string f_qlqpjsl = "";
                    CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                    #endregion

                    #region 推送数据到客户表
                    //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                    //【前三期平均水量】【前六期平均水量】(最新三或六期)
                    //【累计欠费】

                    sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                    model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    //double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                    //model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    //写入抄表表瞬间累积欠费字段
                    model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf, 2);
                    //刷新缴费更新
                    model_tbl_ld_khb.f_ycje = jfmodel.f_yhye;
                    model_tbl_ld_khb.f_tjjzsf = jfmodel.f_syhtjjzsf;
                    model_tbl_ld_khb.f_tjjzpwf = jfmodel.f_syhtjjzpwf;

                    //刷新余额
                    model_tbl_ld_khb.f_ye = jfmodel.f_yhycje;

                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ycje,f_tjjzsf,f_tjjzpwf,f_ye", t);


                    #region 写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zhcbrq");
                    temp.Add("oldvalue", f_zhcbrq_old);
                    temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "最后抄表日期");
                    array.Add(temp);
                    IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                    f_bqzm.Add("key", "f_bqzm");
                    f_bqzm.Add("oldvalue", f_bqzm_old);
                    f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                    f_bqzm.Add("name", "本期止码 ");
                    array.Add(f_bqzm);
                    IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                    f_sqzm.Add("key", "f_sqzm");
                    f_sqzm.Add("oldvalue", f_sqzm_old);
                    f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                    f_sqzm.Add("name", "上期止码 ");
                    array.Add(f_sqzm);
                    IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                    f_nljgl.Add("key", "f_nljgl");
                    f_nljgl.Add("oldvalue", f_nljgl_old);
                    f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                    f_nljgl.Add("name", "年累计够量");
                    array.Add(f_nljgl);
                    IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                    f_ljgl.Add("key", "f_ljgl");
                    f_ljgl.Add("oldvalue", f_ljgl_old);
                    f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                    f_ljgl.Add("name", "累计够量");
                    array.Add(f_ljgl);
                    IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                    qsqpjsl_dic.Add("key", "qsqpjsl");
                    qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                    qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                    qsqpjsl_dic.Add("name", "前三期平均水量");
                    array.Add(qsqpjsl_dic);
                    IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                    qlqpjsl_dic.Add("key", "qlqpjsl");
                    qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                    qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                    qlqpjsl_dic.Add("name", "前六期平均水量");
                    array.Add(qlqpjsl_dic);
                    IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                    f_bqsl.Add("key", "f_bqsl");
                    f_bqsl.Add("oldvalue", f_bqsl_old);
                    f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                    f_bqsl.Add("name", "本期水量 ");
                    array.Add(f_bqsl);
                    IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                    f_sqsl.Add("key", "f_bqsl");
                    f_sqsl.Add("oldvalue", f_sqsl_old);
                    f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                    f_sqsl.Add("name", "上期水量");
                    array.Add(f_sqsl);

                    if (jfmodel.f_yhye != jfmodel.f_khyye)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_ycje");
                        temp.Add("oldvalue", jfmodel.f_khyye);
                        temp.Add("newvalue", jfmodel.f_yhye);
                        temp.Add("name", "绿化表押金");
                        array.Add(temp);
                    }

                    if (jfmodel.f_yhycje != jfmodel.f_khyycje)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_ye");
                        temp.Add("oldvalue", jfmodel.f_khyycje);
                        temp.Add("newvalue", jfmodel.f_yhycje);
                        temp.Add("name", "余额");
                        array.Add(temp);
                    }
                    if (jfmodel.f_syhtjjzsf != jfmodel.f_khytjjzsf)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_tjjzsf");
                        temp.Add("oldvalue", jfmodel.f_khytjjzsf);
                        temp.Add("newvalue", jfmodel.f_syhtjjzsf);
                        temp.Add("name", "调价结转水费");
                        array.Add(temp);
                    }

                    if (jfmodel.f_syhtjjzpwf != jfmodel.f_khytjjzpwf)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_tjjzpwf");
                        temp.Add("oldvalue", jfmodel.f_khytjjzpwf);
                        temp.Add("newvalue", jfmodel.f_syhtjjzpwf);
                        temp.Add("name", "调价结转污水处理费");
                        array.Add(temp);
                    }

                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP抄表缴费", array, clientInf, t);
                    #endregion
                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】

                    sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                    sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                    model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                    model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                    model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                    idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                    #endregion

                    #region 写日志

                    List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                    IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                    sb_f_nljgl.Add("key", "f_nljgl");
                    sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                    sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                    sb_f_nljgl.Add("name", "年累计购量");
                    list.Add(sb_f_nljgl);

                    IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                    sb_f_ljgl.Add("key", "f_ljgl");
                    sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                    sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                    sb_f_ljgl.Add("name", "累计购量");
                    list.Add(sb_f_ljgl);

                    IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                    sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                    sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                    sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                    sb_f_qsqpjsl.Add("name", "前三期平均水量");
                    list.Add(sb_f_qsqpjsl);

                    IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                    sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                    sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                    sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                    sb_f_qlqpjsl.Add("name", "前六期平均水量");
                    list.Add(sb_f_qlqpjsl);

                    IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                    sb_f_bqzm.Add("key", "f_bqzm");
                    sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                    sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                    sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                    sb_f_bqsl.Add("name", "本期水量");
                    list.Add(sb_f_bqsl);
                    IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                    sb_f_sqsl.Add("key", "f_sqsl");
                    sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                    sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                    sb_f_sqsl.Add("name", "上期水量");
                    list.Add(sb_f_sqsl);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion

                    cbsysid = _idal_tbl_ld_cbiao.Add(model, t);

                    #region 缴费部分

                    #region 设置时间
                    if (jfmodel.f_jfbh == "")
                    {
                        jfmodel.f_jfbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
                    }
                    if (jfmodel.f_sjbh == "")
                    {
                        jfmodel.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
                    }
                    jfmodel.f_jfrq = DateTime.Now;
                    jfmodel.f_czsj = DateTime.Now;
                    jfmodel.sys_creatdate = DateTime.Now;
                    jfmodel.sys_lasteditdate = DateTime.Now;
                    jfmodel.f_cbbh = model.f_cb_cbbh;
                    jfmodel.f_cbbhid = cbsysid;
                    #endregion

                    string jfbhid = _idal_tbl_ld_jfb.Add(jfmodel, t);
                    #endregion

                    model.f_jfbh = jfmodel.f_jfbh;
                    model.f_jfbhid = jfbhid;
                    model.f_jfsj = jfmodel.f_jfrq;

                    _idal_tbl_ld_cbiao.Update(model,"f_jfbh,f_jfbhid,f_jfsj", t);

                }
                #endregion
                resultDic["result"] = "true";
                resultDic["message"] = cbsysid;

                t.getTrans().commit();

                NewLog("数据创建成功，创建的数据为：" + jsoncb, "sql_insert", clientInf);
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("数据创建失败，创建的数据为：" + jsoncb + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddforappCross(string jsoncb, string jsonjf, string clientInf)
        {
            string result1 = this.Addforapp(jsoncb, jsonjf, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }


        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string Addwxforapp(string jsoncb, string jsonjf, string f_wxye,string clientInf)
        //{
        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    resultDic["result"] = "";
        //    resultDic["message"] = "";
        //    Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
        //    try
        //    {

        //        t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
        //        t.getTrans().begin();
        //        //微信余额回写标志
        //        string wxresult = "";

        //        sara.dd.ldsw.model.tbl_ld_cbiao model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cbiao>(jsoncb);
        //        if (model.f_cb_cbbh == "")
        //        {
        //            model.f_cb_cbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("cb", "", t);
        //        }
        //        model.f_cbsj = DateTime.Now;
        //        model.sys_creatdate = DateTime.Now;
        //        model.sys_lasteditdate = DateTime.Now;
        //        //新建抄表sys_id;
        //        string cbsysid = "";

        //        //如果是手持机，删除本客户下其他新新建状态抄表记录，避免重复抄表
        //        if (model.f_lyid == "05450002")
        //        {
        //            t.ExecuteSql("delete from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid='0'");
        //        }

        //        #region MyRegion

        //        //已算费--app抄表缴费时，只抄表
        //        if (model.f_ztid == "2")
        //        {

        //            //本期金额是否为0的判断，如果为0直接将状态置为已缴费
        //            if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
        //            {
        //                model.f_ztid = "3";
        //                model.f_zt = "已缴费";

        //            }

        //            double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
        //            #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
        //            {
        //                double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

        //                double zf = 0;
        //                if (qsqpjsl != 0)
        //                {
        //                    zf = (bqsl - qsqpjsl) / qsqpjsl;
        //                }

        //                sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
        //                sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

        //                double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


        //                bool sftx = true;

        //                if (-yqzf <= zf)
        //                {
        //                    if (zf <= yqzf)
        //                    {
        //                        sftx = false;
        //                    }
        //                }

        //                if (sftx)
        //                {
        //                    model.f_sfsfts = "true";
        //                }
        //                else
        //                {
        //                    model.f_sfsfts = "false";
        //                }
        //            }
        //            #endregion

        //            #region 最新平均水量

        //            //【前三期平均水量】【前六期平均水量】

        //            string f_qsqpjsl = "";
        //            string f_qlqpjsl = "";
        //            CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
        //            #endregion

        //            #region 推送数据到客户表
        //            //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
        //            //【前三期平均水量】【前六期平均水量】(最新三或六期)
        //            //【累计欠费】

        //            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        //            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

        //            #region 记录旧值
        //            string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
        //            string f_sqzm_old = model_tbl_ld_khb.f_sqzm;
        //            string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
        //            string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
        //            string f_ljgl_old = model_tbl_ld_khb.f_ljgl;
        //            string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
        //            string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
        //            string f_sqsl_old = model_tbl_ld_khb.f_sqsl;
        //            string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
        //            string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
        //            #endregion
        //            //计算新的抄表周期
        //            DateTime cbsj;
        //            DateTime today = DateTime.Now.Date;
        //            DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
        //            dtFormat.ShortDatePattern = "yyyy/MM/dd";
        //            cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);

        //            int cbzq = 0;
        //            if (int.TryParse(model_tbl_ld_khb.f_cbzq, out cbzq))
        //            {

        //            }
        //            else
        //            {
        //                cbzq = 1;
        //            }
        //            int sbyear = cbsj.Year;
        //            int sbmonth = cbsj.Month + cbzq + 1;

        //            if (sbmonth > 12)
        //            {
        //                sbyear++;
        //                sbmonth = sbmonth - 12;
        //            }

        //            cbsj = new DateTime(sbyear, sbmonth, 1);
        //            cbsj = cbsj.AddDays(-1);
        //            while (cbsj < today)
        //            {
        //                cbsj = cbsj.AddMonths(cbzq);
        //            }
        //            model_tbl_ld_khb.f_zhcbrq = cbsj;
        //            model_tbl_ld_khb.f_sqzm = model_tbl_ld_khb.f_bqzm;
        //            model_tbl_ld_khb.f_bqzm = model.f_bqzm;

        //            double yz = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
        //            double xz = yz + bqsl;
        //            model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2);

        //            double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
        //            double new_ljgl = ljgl + bqsl;
        //            model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

        //            model_tbl_ld_khb.f_qsqpjsl = f_qsqpjsl;
        //            model_tbl_ld_khb.f_qlqpjsl = f_qlqpjsl;

        //            model_tbl_ld_khb.f_sqsl = model_tbl_ld_khb.f_bqsl;
        //            model_tbl_ld_khb.f_bqsl = bqsl.ToString();

        //            double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
        //            double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
        //            model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
        //            //写入抄表表瞬间累积欠费字段
        //            model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
        //            idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ljqf", t);


        //            #region 写日志
        //            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
        //            IDictionary<string, string> temp = new Dictionary<string, string>();
        //            temp.Add("key", "f_zhcbrq");
        //            temp.Add("oldvalue", f_zhcbrq_old);
        //            temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
        //            temp.Add("name", "最后抄表日期");
        //            array.Add(temp);
        //            IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
        //            f_bqzm.Add("key", "f_bqzm");
        //            f_bqzm.Add("oldvalue", f_bqzm_old);
        //            f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
        //            f_bqzm.Add("name", "本期止码 ");
        //            array.Add(f_bqzm);
        //            IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
        //            f_sqzm.Add("key", "f_sqzm");
        //            f_sqzm.Add("oldvalue", f_sqzm_old);
        //            f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
        //            f_sqzm.Add("name", "上期止码 ");
        //            array.Add(f_sqzm);
        //            IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
        //            f_nljgl.Add("key", "f_nljgl");
        //            f_nljgl.Add("oldvalue", f_nljgl_old);
        //            f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
        //            f_nljgl.Add("name", "年累计够量");
        //            array.Add(f_nljgl);
        //            IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
        //            f_ljgl.Add("key", "f_ljgl");
        //            f_ljgl.Add("oldvalue", f_ljgl_old);
        //            f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
        //            f_ljgl.Add("name", "累计够量");
        //            array.Add(f_ljgl);
        //            IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
        //            qsqpjsl_dic.Add("key", "qsqpjsl");
        //            qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
        //            qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
        //            qsqpjsl_dic.Add("name", "前三期平均水量");
        //            array.Add(qsqpjsl_dic);
        //            IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
        //            qlqpjsl_dic.Add("key", "qlqpjsl");
        //            qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
        //            qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
        //            qlqpjsl_dic.Add("name", "前六期平均水量");
        //            array.Add(qlqpjsl_dic);
        //            IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
        //            f_bqsl.Add("key", "f_bqsl");
        //            f_bqsl.Add("oldvalue", f_bqsl_old);
        //            f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
        //            f_bqsl.Add("name", "本期水量 ");
        //            array.Add(f_bqsl);
        //            IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
        //            f_sqsl.Add("key", "f_bqsl");
        //            f_sqsl.Add("oldvalue", f_sqsl_old);
        //            f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
        //            f_sqsl.Add("name", "上期水量");
        //            array.Add(f_sqsl);
        //            IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
        //            f_ljqf.Add("key", "f_ljqf");
        //            f_ljqf.Add("oldvalue", f_ljqf_old);
        //            f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
        //            f_ljqf.Add("name", "累计欠费");
        //            array.Add(f_ljqf);
        //            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP只抄表", array, clientInf, t);
        //            #endregion
        //            #endregion

        //            #region 推送数据到水表表
        //            //【年累计购量】【累计购量】 
        //            //【前三期平均水量】【前六期平均水量】

        //            sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        //            sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
        //            string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
        //            string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
        //            string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
        //            string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;
        //            string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
        //            string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
        //            string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
        //            string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;

        //            double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
        //            double now_ljgl = sb_ljgl + bqsl;
        //            model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);

        //            double sb_nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
        //            double now_nljgl = sb_nljgl + bqsl;
        //            model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_nljgl, 2);

        //            double sb_qsqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qsqpjsl);
        //            model_tbl_ld_sbb.f_qsqpjsl = f_qsqpjsl;

        //            double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
        //            model_tbl_ld_sbb.f_qlqpjsl = f_qlqpjsl;

        //            model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
        //            model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
        //            model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
        //            model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
        //            idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
        //            #endregion

        //            #region 写日志

        //            List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


        //            IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
        //            sb_f_nljgl.Add("key", "f_nljgl");
        //            sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
        //            sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
        //            sb_f_nljgl.Add("name", "年累计购量");
        //            list.Add(sb_f_nljgl);

        //            IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
        //            sb_f_ljgl.Add("key", "f_ljgl");
        //            sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
        //            sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
        //            sb_f_ljgl.Add("name", "累计购量");
        //            list.Add(sb_f_ljgl);

        //            IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
        //            sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
        //            sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
        //            sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
        //            sb_f_qsqpjsl.Add("name", "前三期平均水量");
        //            list.Add(sb_f_qsqpjsl);

        //            IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
        //            sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
        //            sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
        //            sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
        //            sb_f_qlqpjsl.Add("name", "前六期平均水量");
        //            list.Add(sb_f_qlqpjsl);

        //            IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
        //            sb_f_bqzm.Add("key", "f_bqzm");
        //            sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
        //            sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
        //            sb_f_bqzm.Add("name", "本期止码");
        //            list.Add(sb_f_bqzm);
        //            IDictionary<string, string> sb_f_sqzm = new Dictionary<string, string>();
        //            sb_f_sqzm.Add("key", "f_sqzm");
        //            sb_f_sqzm.Add("oldvalue", sb_f_sqzm_old);
        //            sb_f_sqzm.Add("newvalue", model_tbl_ld_sbb.f_sqzm);
        //            sb_f_sqzm.Add("name", "上期止码");
        //            list.Add(sb_f_sqzm);
        //            IDictionary<string, string> sb_f_bqsl = new Dictionary<string, string>();
        //            sb_f_bqsl.Add("key", "f_bqsl");
        //            sb_f_bqsl.Add("oldvalue", sb_f_bqsl_old);
        //            sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
        //            sb_f_bqsl.Add("name", "本期水量");
        //            list.Add(sb_f_bqsl);
        //            IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
        //            sb_f_sqsl.Add("key", "f_sqsl");
        //            sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
        //            sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
        //            sb_f_sqsl.Add("name", "上期水量");
        //            list.Add(sb_f_sqsl);
        //            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
        //            #endregion

        //            cbsysid = _idal_tbl_ld_cbiao.Add(model, t);
        //        }

        //        //已缴费--app抄表缴费时，抄表缴费
        //        if (model.f_ztid == "3")
        //        {


        //            double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
        //            sara.dd.ldsw.model.tbl_ld_jfb jfmodel = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(jsonjf);

        //            #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
        //            {
        //                double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

        //                double zf = 0;
        //                if (qsqpjsl != 0)
        //                {
        //                    zf = (bqsl - qsqpjsl) / qsqpjsl;
        //                }

        //                sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
        //                sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

        //                double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


        //                bool sftx = true;

        //                if (-yqzf <= zf)
        //                {
        //                    if (zf <= yqzf)
        //                    {
        //                        sftx = false;
        //                    }
        //                }

        //                if (sftx)
        //                {
        //                    model.f_sfsfts = "true";
        //                }
        //                else
        //                {
        //                    model.f_sfsfts = "false";
        //                }
        //            }
        //            #endregion

        //            #region 最新平均水量

        //            //【前三期平均水量】【前六期平均水量】

        //            string f_qsqpjsl = "";
        //            string f_qlqpjsl = "";
        //            CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
        //            #endregion

        //            #region 推送数据到客户表
        //            //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
        //            //【前三期平均水量】【前六期平均水量】(最新三或六期)
        //            //【累计欠费】

        //            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        //            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

        //            #region 记录旧值
        //            string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
        //            string f_sqzm_old = model_tbl_ld_khb.f_sqzm;
        //            string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
        //            string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
        //            string f_ljgl_old = model_tbl_ld_khb.f_ljgl;
        //            string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
        //            string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
        //            string f_sqsl_old = model_tbl_ld_khb.f_sqsl;
        //            string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
        //            string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
        //            #endregion
        //            //计算新的抄表周期
        //            DateTime cbsj;
        //            DateTime today = DateTime.Now.Date;
        //            DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
        //            dtFormat.ShortDatePattern = "yyyy/MM/dd";
        //            cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);

        //            int cbzq = 0;
        //            if (int.TryParse(model_tbl_ld_khb.f_cbzq, out cbzq))
        //            {

        //            }
        //            else
        //            {
        //                cbzq = 1;
        //            }
        //            int sbyear = cbsj.Year;
        //            int sbmonth = cbsj.Month + cbzq + 1;

        //            if (sbmonth > 12)
        //            {
        //                sbyear++;
        //                sbmonth = sbmonth - 12;
        //            }

        //            cbsj = new DateTime(sbyear, sbmonth, 1);
        //            cbsj = cbsj.AddDays(-1);
        //            while (cbsj < today)
        //            {
        //                cbsj = cbsj.AddMonths(cbzq);
        //            }
        //            model_tbl_ld_khb.f_zhcbrq = cbsj;
        //            model_tbl_ld_khb.f_sqzm = model_tbl_ld_khb.f_bqzm;
        //            model_tbl_ld_khb.f_bqzm = model.f_bqzm;

        //            double yz = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
        //            double xz = yz + bqsl;
        //            model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(xz.ToString(), 2);

        //            double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
        //            double new_ljgl = ljgl + bqsl;
        //            model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl, 2);

        //            model_tbl_ld_khb.f_qsqpjsl = f_qsqpjsl;
        //            model_tbl_ld_khb.f_qlqpjsl = f_qlqpjsl;

        //            model_tbl_ld_khb.f_sqsl = model_tbl_ld_khb.f_bqsl;
        //            model_tbl_ld_khb.f_bqsl = bqsl.ToString();

        //            double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
        //            //double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
        //            //model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
        //            //写入抄表表瞬间累积欠费字段
        //            model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf, 2);
        //            //刷新缴费更新
        //            model_tbl_ld_khb.f_ycje = jfmodel.f_yhye;
        //            model_tbl_ld_khb.f_tjjzsf = jfmodel.f_syhtjjzsf;
        //            model_tbl_ld_khb.f_tjjzpwf = jfmodel.f_syhtjjzpwf;

        //            idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ycje,f_tjjzsf,f_tjjzpwf", t);


        //            #region 写日志
        //            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
        //            IDictionary<string, string> temp = new Dictionary<string, string>();
        //            temp.Add("key", "f_zhcbrq");
        //            temp.Add("oldvalue", f_zhcbrq_old);
        //            temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
        //            temp.Add("name", "最后抄表日期");
        //            array.Add(temp);
        //            IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
        //            f_bqzm.Add("key", "f_bqzm");
        //            f_bqzm.Add("oldvalue", f_bqzm_old);
        //            f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
        //            f_bqzm.Add("name", "本期止码 ");
        //            array.Add(f_bqzm);
        //            IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
        //            f_sqzm.Add("key", "f_sqzm");
        //            f_sqzm.Add("oldvalue", f_sqzm_old);
        //            f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
        //            f_sqzm.Add("name", "上期止码 ");
        //            array.Add(f_sqzm);
        //            IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
        //            f_nljgl.Add("key", "f_nljgl");
        //            f_nljgl.Add("oldvalue", f_nljgl_old);
        //            f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
        //            f_nljgl.Add("name", "年累计够量");
        //            array.Add(f_nljgl);
        //            IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
        //            f_ljgl.Add("key", "f_ljgl");
        //            f_ljgl.Add("oldvalue", f_ljgl_old);
        //            f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
        //            f_ljgl.Add("name", "累计够量");
        //            array.Add(f_ljgl);
        //            IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
        //            qsqpjsl_dic.Add("key", "qsqpjsl");
        //            qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
        //            qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
        //            qsqpjsl_dic.Add("name", "前三期平均水量");
        //            array.Add(qsqpjsl_dic);
        //            IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
        //            qlqpjsl_dic.Add("key", "qlqpjsl");
        //            qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
        //            qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
        //            qlqpjsl_dic.Add("name", "前六期平均水量");
        //            array.Add(qlqpjsl_dic);
        //            IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
        //            f_bqsl.Add("key", "f_bqsl");
        //            f_bqsl.Add("oldvalue", f_bqsl_old);
        //            f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
        //            f_bqsl.Add("name", "本期水量 ");
        //            array.Add(f_bqsl);
        //            IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
        //            f_sqsl.Add("key", "f_bqsl");
        //            f_sqsl.Add("oldvalue", f_sqsl_old);
        //            f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
        //            f_sqsl.Add("name", "上期水量");
        //            array.Add(f_sqsl);

        //            if (jfmodel.f_yhye != model_tbl_ld_khb.f_ycje)
        //            {
        //                temp = new Dictionary<string, string>();
        //                temp.Add("key", "f_ycje");
        //                temp.Add("oldvalue", model_tbl_ld_khb.f_ycje);
        //                temp.Add("newvalue", jfmodel.f_yhye);
        //                temp.Add("name", "绿化表押金");
        //                array.Add(temp);
        //            }
        //            if (jfmodel.f_syhtjjzsf != model_tbl_ld_khb.f_tjjzsf)
        //            {
        //                temp = new Dictionary<string, string>();
        //                temp.Add("key", "f_tjjzsf");
        //                temp.Add("oldvalue", model_tbl_ld_khb.f_tjjzsf);
        //                temp.Add("newvalue", jfmodel.f_syhtjjzsf);
        //                temp.Add("name", "调价结转水费");
        //                array.Add(temp);
        //            }

        //            if (jfmodel.f_syhtjjzpwf != model_tbl_ld_khb.f_tjjzpwf)
        //            {
        //                temp = new Dictionary<string, string>();
        //                temp.Add("key", "f_tjjzpwf");
        //                temp.Add("oldvalue", model_tbl_ld_khb.f_tjjzpwf);
        //                temp.Add("newvalue", jfmodel.f_syhtjjzpwf);
        //                temp.Add("name", "调价结转污水处理费");
        //                array.Add(temp);
        //            }

        //            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP抄表缴费", array, clientInf, t);
        //            #endregion
        //            #endregion

        //            #region 推送数据到水表表
        //            //【年累计购量】【累计购量】 
        //            //【前三期平均水量】【前六期平均水量】

        //            sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        //            sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
        //            string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
        //            string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
        //            string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
        //            string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;
        //            string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
        //            string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
        //            string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
        //            string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;

        //            double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
        //            double now_ljgl = sb_ljgl + bqsl;
        //            model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl, 2);

        //            double sb_nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
        //            double now_nljgl = sb_nljgl + bqsl;
        //            model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_nljgl, 2);

        //            double sb_qsqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qsqpjsl);
        //            model_tbl_ld_sbb.f_qsqpjsl = f_qsqpjsl;

        //            double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
        //            model_tbl_ld_sbb.f_qlqpjsl = f_qlqpjsl;

        //            model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
        //            model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
        //            model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
        //            model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
        //            idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
        //            #endregion

        //            #region 写日志

        //            List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


        //            IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
        //            sb_f_nljgl.Add("key", "f_nljgl");
        //            sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
        //            sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
        //            sb_f_nljgl.Add("name", "年累计购量");
        //            list.Add(sb_f_nljgl);

        //            IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
        //            sb_f_ljgl.Add("key", "f_ljgl");
        //            sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
        //            sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
        //            sb_f_ljgl.Add("name", "累计购量");
        //            list.Add(sb_f_ljgl);

        //            IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
        //            sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
        //            sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
        //            sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
        //            sb_f_qsqpjsl.Add("name", "前三期平均水量");
        //            list.Add(sb_f_qsqpjsl);

        //            IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
        //            sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
        //            sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
        //            sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
        //            sb_f_qlqpjsl.Add("name", "前六期平均水量");
        //            list.Add(sb_f_qlqpjsl);

        //            IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
        //            sb_f_bqzm.Add("key", "f_bqzm");
        //            sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
        //            sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
        //            sb_f_bqzm.Add("name", "本期止码");
        //            list.Add(sb_f_bqzm);
        //            IDictionary<string, string> sb_f_sqzm = new Dictionary<string, string>();
        //            sb_f_sqzm.Add("key", "f_sqzm");
        //            sb_f_sqzm.Add("oldvalue", sb_f_sqzm_old);
        //            sb_f_sqzm.Add("newvalue", model_tbl_ld_sbb.f_sqzm);
        //            sb_f_sqzm.Add("name", "上期止码");
        //            list.Add(sb_f_sqzm);
        //            IDictionary<string, string> sb_f_bqsl = new Dictionary<string, string>();
        //            sb_f_bqsl.Add("key", "f_bqsl");
        //            sb_f_bqsl.Add("oldvalue", sb_f_bqsl_old);
        //            sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
        //            sb_f_bqsl.Add("name", "本期水量");
        //            list.Add(sb_f_bqsl);
        //            IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
        //            sb_f_sqsl.Add("key", "f_sqsl");
        //            sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
        //            sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
        //            sb_f_sqsl.Add("name", "上期水量");
        //            list.Add(sb_f_sqsl);
        //            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
        //            #endregion

        //            cbsysid = _idal_tbl_ld_cbiao.Add(model, t);

        //            #region 缴费部分

        //            #region 设置时间
        //            if (jfmodel.f_jfbh == "")
        //            {
        //                jfmodel.f_jfbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
        //            }
        //            if (jfmodel.f_sjbh == "")
        //            {
        //                jfmodel.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
        //            }
        //            jfmodel.f_jfrq = DateTime.Now;
        //            jfmodel.f_czsj = DateTime.Now;
        //            jfmodel.sys_creatdate = DateTime.Now;
        //            jfmodel.sys_lasteditdate = DateTime.Now;
        //            jfmodel.f_cbbh = model.f_cb_cbbh;
        //            jfmodel.f_cbbhid = cbsysid;
        //            #endregion
        //            jfmodel.f_jffs = "e水生活缴费";
        //            jfmodel.f_jffsid = "05740015";
        //            jfmodel.f_ly = "e水生活";
        //            jfmodel.f_lyid = "08080007";

        //            string jfbhid = _idal_tbl_ld_jfb.Add(jfmodel, t);
        //            #endregion

        //            model.f_jfbh = jfmodel.f_jfbh;
        //            model.f_jfbhid = jfbhid;
        //            model.f_jfsj = jfmodel.f_jfrq;

        //            _idal_tbl_ld_cbiao.Update(model, "f_jfbh,f_jfbhid,f_jfsj", t);

        //            #region 更新微信余额
        //            //double new_wxye = Eva.Library.Text.NumberTool.Parse(f_wxye) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_shys);
        //            //object[] args = { Eva.Library.Text.NumberTool.GetNumberByLength(new_wxye,2),model.f_khbh };
        //            //wxresult = Eva.Library.WebService.DynamicWebServices.InvokeWebService("http://162.16.166.1/sara.dd.actionwx/service/service_tbl_wx_khb.asmx", "setWeixinyue", args).ToString();

        //            #endregion

        //        }
        //        #endregion

        //        if(wxresult == "true")
        //        {
        //            resultDic["result"] = "true";
        //            resultDic["message"] = cbsysid;

        //            t.getTrans().commit();
        //        }
        //        else
        //        {
        //            if (t != null)
        //            {
        //                t.getTrans().rollback();
        //            }

        //            resultDic["result"] = "false";
        //            resultDic["message"] = "回写微信余额失败";

        //        }




        //        NewLog("数据创建成功，创建的数据为：" + jsoncb, "sql_insert", clientInf);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (t != null)
        //        {
        //            t.getTrans().rollback();
        //        }

        //        resultDic["result"] = "false";
        //        resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
        //        NewLog("数据创建失败，创建的数据为：" + jsoncb + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
        //    }
        //    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //}



        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public void AddwxforappCross(string jsoncb, string jsonjf, string f_wxye,string clientInf)
        //{
        //    string result1 = this.Addwxforapp(jsoncb, jsonjf,f_wxye, clientInf);
        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    resultDic["d"] = result1;
        //    string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //    string callback = HttpContext.Current.Request["jsoncallback"];

        //    HttpContext.Current.Response.Write(callback + "(" + result + ")");
        //    HttpContext.Current.Response.End();
        //}



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Updateforapp(string jsoncb,string jsonjf, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;

            try
            {
                t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                t.getTrans().begin();

                sara.dd.ldsw.model.tbl_ld_cbiao model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_cbiao>(jsoncb);
                model.sys_lasteditdate = DateTime.Now;


                //如果状态是1，说明是提交操作，
                #region MyRegion

                //已算费--app抄表缴费时，只抄表
                if (model.f_ztid == "2")
                {

                    //本期金额是否为0的判断，如果为0直接将状态置为已缴费
                    if (Eva.Library.Text.NumberTool.Parse(model.f_bqsl) == 0)
                    {
                        model.f_ztid = "3";
                        model.f_zt = "已缴费";

                    }

                    double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                    #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                    {
                        double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                        double zf = 0;
                        if (qsqpjsl != 0)
                        {
                            zf = (bqsl - qsqpjsl) / qsqpjsl;
                        }

                        sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                        sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                        double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                            model.f_sfsfts = "true";
                        }
                        else
                        {
                            model.f_sfsfts = "false";
                        }
                    }
                    #endregion

                    #region 最新平均水量

                    //【前三期平均水量】【前六期平均水量】

                    string f_qsqpjsl = "";
                    string f_qlqpjsl = "";
                    CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                    #endregion

                    #region 推送数据到客户表
                    //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                    //【前三期平均水量】【前六期平均水量】(最新三或六期)
                    //【累计欠费】

                    sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                    model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    
                    //写入抄表表瞬间累积欠费字段
                    model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);

                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ljqf", t);


                    #region 写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zhcbrq");
                    temp.Add("oldvalue", f_zhcbrq_old);
                    temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "最后抄表日期");
                    array.Add(temp);
                    IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                    f_bqzm.Add("key", "f_bqzm");
                    f_bqzm.Add("oldvalue", f_bqzm_old);
                    f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                    f_bqzm.Add("name", "本期止码 ");
                    array.Add(f_bqzm);
                    IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                    f_sqzm.Add("key", "f_sqzm");
                    f_sqzm.Add("oldvalue", f_sqzm_old);
                    f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                    f_sqzm.Add("name", "上期止码 ");
                    array.Add(f_sqzm);
                    IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                    f_nljgl.Add("key", "f_nljgl");
                    f_nljgl.Add("oldvalue", f_nljgl_old);
                    f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                    f_nljgl.Add("name", "年累计够量");
                    array.Add(f_nljgl);
                    IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                    f_ljgl.Add("key", "f_ljgl");
                    f_ljgl.Add("oldvalue", f_ljgl_old);
                    f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                    f_ljgl.Add("name", "累计够量");
                    array.Add(f_ljgl);
                    IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                    qsqpjsl_dic.Add("key", "qsqpjsl");
                    qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                    qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                    qsqpjsl_dic.Add("name", "前三期平均水量");
                    array.Add(qsqpjsl_dic);
                    IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                    qlqpjsl_dic.Add("key", "qlqpjsl");
                    qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                    qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                    qlqpjsl_dic.Add("name", "前六期平均水量");
                    array.Add(qlqpjsl_dic);
                    IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                    f_bqsl.Add("key", "f_bqsl");
                    f_bqsl.Add("oldvalue", f_bqsl_old);
                    f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                    f_bqsl.Add("name", "本期水量 ");
                    array.Add(f_bqsl);
                    IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                    f_sqsl.Add("key", "f_bqsl");
                    f_sqsl.Add("oldvalue", f_sqsl_old);
                    f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                    f_sqsl.Add("name", "上期水量");
                    array.Add(f_sqsl);
                    IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                    f_ljqf.Add("key", "f_ljqf");
                    f_ljqf.Add("oldvalue", f_ljqf_old);
                    f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                    f_ljqf.Add("name", "累计欠费");
                    array.Add(f_ljqf);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP只抄表", array, clientInf, t);
                    #endregion
                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】

                    sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                    sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                    model_tbl_ld_sbb.f_qsqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(sb_qsqpjsl, 2);

                    double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
                    model_tbl_ld_sbb.f_qlqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(sb_qlqpjsl, 2);

                    model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
                    model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                    model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                    model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                    idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                    #endregion

                    #region 写日志

                    List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                    IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                    sb_f_nljgl.Add("key", "f_nljgl");
                    sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                    sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                    sb_f_nljgl.Add("name", "年累计购量");
                    list.Add(sb_f_nljgl);

                    IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                    sb_f_ljgl.Add("key", "f_ljgl");
                    sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                    sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                    sb_f_ljgl.Add("name", "累计购量");
                    list.Add(sb_f_ljgl);

                    IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                    sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                    sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                    sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                    sb_f_qsqpjsl.Add("name", "前三期平均水量");
                    list.Add(sb_f_qsqpjsl);

                    IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                    sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                    sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                    sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                    sb_f_qlqpjsl.Add("name", "前六期平均水量");
                    list.Add(sb_f_qlqpjsl);

                    IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                    sb_f_bqzm.Add("key", "f_bqzm");
                    sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                    sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                    sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                    sb_f_bqsl.Add("name", "本期水量");
                    list.Add(sb_f_bqsl);
                    IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                    sb_f_sqsl.Add("key", "f_sqsl");
                    sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                    sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                    sb_f_sqsl.Add("name", "上期水量");
                    list.Add(sb_f_sqsl);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion

                }

                //已缴费--app抄表缴费时，抄表缴费
                if (model.f_ztid == "3")
                {


                    double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);
                    sara.dd.ldsw.model.tbl_ld_jfb jfmodel = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_jfb>(jsonjf);
                    #region 进行“是否算费提示”的计算，振幅在范围内为false，范围外为true
                    {
                        double qsqpjsl = Eva.Library.Text.NumberTool.Parse(model.f_qsqpjsl);

                        double zf = 0;
                        if (qsqpjsl != 0)
                        {
                            zf = (bqsl - qsqpjsl) / qsqpjsl;
                        }

                        sara.dd.ldsw.idal.Itbl_ldbm_jtsj idal_tbl_ldbm_jtsj = new sara.dd.ldsw.dal.tbl_ldbm_jtsj();
                        sara.dd.ldsw.model.tbl_ldbm_jtsj model_tbl_ldbm_jtsj = idal_tbl_ldbm_jtsj.GetList("f_yslxid='" + model.f_yslxid + "'", "", "f_zfbl", "", "", t)[0];

                        double yqzf = Eva.Library.Text.NumberTool.Parse(model_tbl_ldbm_jtsj.f_zfbl) / 100;


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
                            model.f_sfsfts = "true";
                        }
                        else
                        {
                            model.f_sfsfts = "false";
                        }
                    }
                    #endregion

                    #region 最新平均水量

                    //【前三期平均水量】【前六期平均水量】

                    string f_qsqpjsl = "";
                    string f_qlqpjsl = "";
                    CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, model.f_bqsl, t);
                    #endregion

                    #region 推送数据到客户表
                    //【最后抄表时间】【最后抄表表底数】【年累计购量】【累计购量】
                    //【前三期平均水量】【前六期平均水量】(最新三或六期)
                    //【累计欠费】

                    sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];

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
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                    dtFormat.ShortDatePattern = "yyyy/MM/dd";
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
                    model_tbl_ld_khb.f_bqzm = model.f_bqzm;

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

                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    //double new_ljqf = ljqf + Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                    //model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf, 2);
                    //写入抄表表瞬间累积欠费字段
                    model.f_value3 = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf, 2);

                    //刷新缴费更新
                    model_tbl_ld_khb.f_ycje = jfmodel.f_yhye;
                    model_tbl_ld_khb.f_tjjzsf = jfmodel.f_syhtjjzsf;
                    model_tbl_ld_khb.f_tjjzpwf = jfmodel.f_syhtjjzpwf;

                    //刷新余额
                    model_tbl_ld_khb.f_ye = jfmodel.f_yhycje;

                    idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_bqzm,f_sqzm,f_zhcbrq,f_qlqpjsl,f_qsqpjsl,f_bqsl,f_sqsl,f_ycje,f_tjjzsf,f_tjjzpwf,f_ye", t);


                    #region 写日志
                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                    IDictionary<string, string> temp = new Dictionary<string, string>();
                    temp.Add("key", "f_zhcbrq");
                    temp.Add("oldvalue", f_zhcbrq_old);
                    temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                    temp.Add("name", "最后抄表日期");
                    array.Add(temp);
                    IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                    f_bqzm.Add("key", "f_bqzm");
                    f_bqzm.Add("oldvalue", f_bqzm_old);
                    f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                    f_bqzm.Add("name", "本期止码 ");
                    array.Add(f_bqzm);
                    IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                    f_sqzm.Add("key", "f_sqzm");
                    f_sqzm.Add("oldvalue", f_sqzm_old);
                    f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                    f_sqzm.Add("name", "上期止码 ");
                    array.Add(f_sqzm);
                    IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                    f_nljgl.Add("key", "f_nljgl");
                    f_nljgl.Add("oldvalue", f_nljgl_old);
                    f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                    f_nljgl.Add("name", "年累计够量");
                    array.Add(f_nljgl);
                    IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                    f_ljgl.Add("key", "f_ljgl");
                    f_ljgl.Add("oldvalue", f_ljgl_old);
                    f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                    f_ljgl.Add("name", "累计够量");
                    array.Add(f_ljgl);
                    IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                    qsqpjsl_dic.Add("key", "qsqpjsl");
                    qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                    qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                    qsqpjsl_dic.Add("name", "前三期平均水量");
                    array.Add(qsqpjsl_dic);
                    IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                    qlqpjsl_dic.Add("key", "qlqpjsl");
                    qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                    qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                    qlqpjsl_dic.Add("name", "前六期平均水量");
                    array.Add(qlqpjsl_dic);
                    IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                    f_bqsl.Add("key", "f_bqsl");
                    f_bqsl.Add("oldvalue", f_bqsl_old);
                    f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                    f_bqsl.Add("name", "本期水量 ");
                    array.Add(f_bqsl);
                    IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                    f_sqsl.Add("key", "f_bqsl");
                    f_sqsl.Add("oldvalue", f_sqsl_old);
                    f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                    f_sqsl.Add("name", "上期水量");
                    array.Add(f_sqsl);
                    if (jfmodel.f_yhye != jfmodel.f_khyye)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_ycje");
                        temp.Add("oldvalue", jfmodel.f_khyye);
                        temp.Add("newvalue", jfmodel.f_yhye);
                        temp.Add("name", "绿化表押金");
                        array.Add(temp);
                    }

                    if (jfmodel.f_yhycje != jfmodel.f_khyycje)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_ye");
                        temp.Add("oldvalue", jfmodel.f_khyycje);
                        temp.Add("newvalue", jfmodel.f_yhycje);
                        temp.Add("name", "余额");
                        array.Add(temp);
                    }
                    if (jfmodel.f_syhtjjzsf != jfmodel.f_khytjjzsf)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_tjjzsf");
                        temp.Add("oldvalue", jfmodel.f_khytjjzsf);
                        temp.Add("newvalue", jfmodel.f_syhtjjzsf);
                        temp.Add("name", "调价结转水费");
                        array.Add(temp);
                    }

                    if (jfmodel.f_syhtjjzpwf != jfmodel.f_khytjjzpwf)
                    {
                        temp = new Dictionary<string, string>();
                        temp.Add("key", "f_tjjzpwf");
                        temp.Add("oldvalue", jfmodel.f_khytjjzpwf);
                        temp.Add("newvalue", jfmodel.f_syhtjjzpwf);
                        temp.Add("name", "调价结转污水处理费");
                        array.Add(temp);
                    }
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "APP抄表缴费", array, clientInf, t);
                    #endregion
                    #endregion

                    #region 推送数据到水表表
                    //【年累计购量】【累计购量】 
                    //【前三期平均水量】【前六期平均水量】

                    sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                    sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];
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
                    model_tbl_ld_sbb.f_qsqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(sb_qsqpjsl, 2);

                    double sb_qlqpjsl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_qlqpjsl);
                    model_tbl_ld_sbb.f_qlqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(sb_qlqpjsl, 2);

                    model_tbl_ld_sbb.f_sqzm = model_tbl_ld_sbb.f_bqzm;
                    model_tbl_ld_sbb.f_bqzm = model.f_bqzm;
                    model_tbl_ld_sbb.f_sqsl = model_tbl_ld_sbb.f_bqsl;
                    model_tbl_ld_sbb.f_bqsl = model.f_bqsl;
                    idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);
                    #endregion

                    #region 写日志

                    List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();


                    IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                    sb_f_nljgl.Add("key", "f_nljgl");
                    sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                    sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                    sb_f_nljgl.Add("name", "年累计购量");
                    list.Add(sb_f_nljgl);

                    IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                    sb_f_ljgl.Add("key", "f_ljgl");
                    sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                    sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                    sb_f_ljgl.Add("name", "累计购量");
                    list.Add(sb_f_ljgl);

                    IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                    sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                    sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                    sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                    sb_f_qsqpjsl.Add("name", "前三期平均水量");
                    list.Add(sb_f_qsqpjsl);

                    IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                    sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                    sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                    sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                    sb_f_qlqpjsl.Add("name", "前六期平均水量");
                    list.Add(sb_f_qlqpjsl);

                    IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                    sb_f_bqzm.Add("key", "f_bqzm");
                    sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                    sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                    sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                    sb_f_bqsl.Add("name", "本期水量");
                    list.Add(sb_f_bqsl);
                    IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                    sb_f_sqsl.Add("key", "f_sqsl");
                    sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                    sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                    sb_f_sqsl.Add("name", "上期水量");
                    list.Add(sb_f_sqsl);
                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表提交", array, clientInf, t);
                    #endregion

                    

                    #region 缴费部分

                    #region 设置时间
                    if (jfmodel.f_jfbh == "")
                    {
                        jfmodel.f_jfbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
                    }
                    if (jfmodel.f_sjbh == "")
                    {
                        jfmodel.f_sjbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("jf", "");
                    }
                    jfmodel.f_jfrq = DateTime.Now;
                    jfmodel.f_czsj = DateTime.Now;
                    jfmodel.sys_creatdate = DateTime.Now;
                    jfmodel.sys_lasteditdate = DateTime.Now;
                    jfmodel.f_cbbh = model.f_cb_cbbh;
                    jfmodel.f_cbbhid = model.sys_id.ToString();
                    #endregion

                    //阶梯水价
                    //jfmodel.f_dyjtsl = model.f_dyjtsl;
                    //jfmodel.f_dyjtsf = model.f_dyjtsf;
                    //jfmodel.f_dejtsl = model.f_dejtsl;
                    //jfmodel.f_dejtsf = model.f_dejtsf;
                    //jfmodel.f_dsjtsl = model.f_dsjtsl;
                    //jfmodel.f_dsjtsf = model.f_dsjtsf;

                    string jfbhid = _idal_tbl_ld_jfb.Add(jfmodel, t);
                    #endregion

                    model.f_jfbh = jfmodel.f_jfbh;
                    model.f_jfbhid = jfbhid;
                    model.f_jfsj = jfmodel.f_jfrq;



                    

                }
                #endregion


                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cbiao.Update(model, columns, t);


                NewLog("数据更新成功，更新的数据为：json：" + jsoncb + "，columns：" + columns, "sql_update", clientInf);


                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                t.getTrans().rollback();

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + jsoncb + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateforappCross(string jsoncb,string jsonjf, string columns, string clientInf)
        {
            string result1 = this.Updateforapp(jsoncb,jsonjf, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateCross(string json,  string columns, string clientInf)
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
                List<sara.dd.ldsw.model.tbl_ld_cbiao> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(json);
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cbiao.UpdateList(modellist, columns, null);

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

                //删除子表的方法

                //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cbiao.Delete(whereString, null);
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
                resultDic["message"] = _idal_tbl_ld_cbiao.LogicDelete(delUserId, delUserName, delDate, whereString, null);

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
        public string GetCount(string whereString, string cxzxsjString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_cbiao.GetCount(whereString, cxzxsjString, null);

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
        public void GetCountCross(string whereString, string cxzxsjString, string clientInf)
        {
            string result1 = this.GetCount(whereString, cxzxsjString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetList(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                //string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_cbiao>(_idal_tbl_ld_cbiao.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);
                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_cbiao.GetDataTableForPC(whereString, cxzxsjString, orderByString, columnsString, pageSizeString, pageIndexString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_cbiao.GetCount(whereString, cxzxsjString, null) + "\",\"rows\":" + rows + "}";
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
        public void GetListCross(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetList(whereString, cxzxsjString, orderByString, columnsString, pageSizeString, pageIndexString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetListForApp(string whereString, string cxzxsjString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_cbiao.GetDataTableForApp(whereString, cxzxsjString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_cbiao.GetCount(whereString, cxzxsjString, null) + "\",\"rows\":" + rows + "}";
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
        public void GetListForAppCross(string whereString, string cxzxsjString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetListForApp(whereString, cxzxsjString, orderByString, columnsString, countString, stepString, clientInf);
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
        /// <param name="sys_id"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBack(string sys_id, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
            try
            {

                t.getTrans().begin();

                IList< sara.dd.ldsw.model.tbl_ld_cbiao> modelList = _idal_tbl_ld_cbiao.GetList("sys_id='" + sys_id + "'", "", "", "*", "", "", t);
                if(modelList.Count > 0)
                {   //抄表数据的回滚，肯定在运行库中
                    sara.dd.ldsw.model.tbl_ld_cbiao model = modelList[0];


                    if (model.f_ztid != "1")
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "该数据不可回滚";
                    }
                    else
                    {
                        #region 状态变为新建
                        model.f_ztid = "0";
                        model.f_zt = "新建";
                        #endregion
                        //回滚阶梯水价
                        model.f_dyjtsl = "0";
                        model.f_dyjtsf = "0";
                        model.f_dejtsl = "0";
                        model.f_dejtsf = "0";
                        model.f_dsjtsl = "0";
                        model.f_dsjtsf = "0";


                        _idal_tbl_ld_cbiao.Update(model, "f_ztid,f_zt,f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf", t);

                        double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);

                        #region 回滚客户表数据

                        //上一条抄表记录
                        DataTable dt_sytcbjl = t.Query("select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl,rownum  from (select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' order by f_cbsj desc) t where rownum =1").Tables[0];

                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];
                        #region 记录旧值
                        string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
                        string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
                        string f_sqzm_old = model_tbl_ld_khb.f_sqzm;

                        string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
                        string f_sqsl_old = model_tbl_ld_khb.f_sqsl;

                        string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
                        string f_ljgl_old = model_tbl_ld_khb.f_ljgl;

                        string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
                        string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
                        #endregion

                        //计算新的抄表周期
                        DateTime cbsj;
                        DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                        dtFormat.ShortDatePattern = "yyyy/MM/dd";

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


                        if (dt_sytcbjl.Rows.Count > 0)
                        {
                            model_tbl_ld_khb.f_zhcbrq = cbsj;
                            model_tbl_ld_khb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                            model_tbl_ld_khb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                            model_tbl_ld_khb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                            model_tbl_ld_khb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();
                            model_tbl_ld_khb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                            model_tbl_ld_khb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                            //model_tbl_ld_khb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                        }
                        else
                        {
                            model_tbl_ld_khb.f_zhcbrq = cbsj;

                            model_tbl_ld_khb.f_bqzm = model.f_sqzm;
                            model_tbl_ld_khb.f_sqzm = "";

                            model_tbl_ld_khb.f_bqsl = model.f_sqsl;
                            model_tbl_ld_khb.f_sqsl = "";
                            model_tbl_ld_khb.f_qsqpjsl = "";
                            model_tbl_ld_khb.f_qlqpjsl = "";
                            //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                            //double new_nljgl = nljgl - bqsl;
                            //model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                        }

                        model_tbl_ld_khb.f_nljgl = model.f_sjljsyl;

                        double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                        double new_ljgl = ljgl - bqsl;
                        model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl,2);



                        idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_zhcbrq", t);
                        #region 写日志
                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_zhcbrq");
                        temp.Add("oldvalue", f_zhcbrq_old);
                        temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                        temp.Add("name", "最后抄表日期");
                        array.Add(temp);
                        IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                        f_nljgl.Add("key", "f_nljgl");
                        f_nljgl.Add("oldvalue", f_nljgl_old);
                        f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                        f_nljgl.Add("name", "年累计够量");
                        array.Add(f_nljgl);
                        IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                        f_ljgl.Add("key", "f_ljgl");
                        f_ljgl.Add("oldvalue", f_ljgl_old);
                        f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                        f_ljgl.Add("name", "累计够量");
                        array.Add(f_ljgl);
                        IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                        qsqpjsl_dic.Add("key", "qsqpjsl");
                        qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                        qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                        qsqpjsl_dic.Add("name", "前三期平均水量");
                        array.Add(qsqpjsl_dic);
                        IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                        qlqpjsl_dic.Add("key", "qlqpjsl");
                        qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                        qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                        qlqpjsl_dic.Add("name", "年累计够量");
                        array.Add(qlqpjsl_dic);


                        IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                        f_bqzm.Add("key", "f_bqzm");
                        f_bqzm.Add("oldvalue", f_bqzm_old);
                        f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                        f_bqzm.Add("name", "本期止码");
                        array.Add(f_bqzm);

                        IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                        f_sqzm.Add("key", "f_sqzm");
                        f_sqzm.Add("oldvalue", f_sqzm_old);
                        f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                        f_sqzm.Add("name", "上期止码");
                        array.Add(f_sqzm);

                        IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                        f_bqsl.Add("key", "f_bqsl");
                        f_bqsl.Add("oldvalue", f_bqsl_old);
                        f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                        f_bqsl.Add("name", "本期水量");
                        array.Add(f_bqsl);

                        IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                        f_sqsl.Add("key", "f_sqsl");
                        f_sqsl.Add("oldvalue", f_sqsl_old);
                        f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                        f_sqsl.Add("name", "上期水量");
                        array.Add(f_sqsl);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, t);
                        #endregion

                        #endregion


                        #region 回滚水表表数据
                        //【年累计购量】【累计购量】 
                        //【前三期平均水量】【前六期平均水量】

                        //【上期止码】【本期止码】【上期水量】【本期水量】

                        sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];

                        string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                        string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                        string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                        string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;

                        string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                        string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                        string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                        string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;

                        if (dt_sytcbjl.Rows.Count > 0)
                        {
                            model_tbl_ld_sbb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                            model_tbl_ld_sbb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                            model_tbl_ld_sbb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                            model_tbl_ld_sbb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();
                            model_tbl_ld_sbb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                            model_tbl_ld_sbb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                            //model_tbl_ld_sbb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                        }
                        else
                        {
                            model_tbl_ld_sbb.f_bqzm = model.f_sqzm;
                            model_tbl_ld_sbb.f_sqzm = "";

                            model_tbl_ld_sbb.f_bqsl = model.f_sqsl;
                            model_tbl_ld_sbb.f_sqsl = "";
                            model_tbl_ld_sbb.f_qsqpjsl = "";
                            model_tbl_ld_sbb.f_qlqpjsl = "";
                            //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                            //double new_nljgl = nljgl - bqsl;
                            //model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                        }

                        double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                        double now_ljgl = sb_ljgl - bqsl;
                        model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl,2);
                        model_tbl_ld_sbb.f_nljgl = model.f_sjljsyl;


                        idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);


                        #region 写日志
                        //写日志
                        List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();

                        IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                        sb_f_nljgl.Add("key", "f_nljgl");
                        sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                        sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                        sb_f_nljgl.Add("name", "年累计购量");
                        list.Add(sb_f_nljgl);

                        IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                        sb_f_ljgl.Add("key", "f_ljgl");
                        sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                        sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                        sb_f_ljgl.Add("name", "累计购量");
                        list.Add(sb_f_ljgl);

                        IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                        sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                        sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                        sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                        sb_f_qsqpjsl.Add("name", "前三期平均水量");
                        list.Add(sb_f_qsqpjsl);

                        IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                        sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                        sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                        sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                        sb_f_qlqpjsl.Add("name", "前六期平均水量");
                        list.Add(sb_f_qlqpjsl);


                        IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                        sb_f_bqzm.Add("key", "f_bqzm");
                        sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                        sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                        sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                        sb_f_bqsl.Add("name", "本期水量");
                        list.Add(sb_f_bqsl);

                        IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                        sb_f_sqsl.Add("key", "f_sqsl");
                        sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                        sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                        sb_f_sqsl.Add("name", "上期水量");
                        list.Add(sb_f_sqsl);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, t);
                        #endregion
                        #endregion
                        #region 抄表回滚写日志
                        List<IDictionary<string, string>> arr = new List<IDictionary<string, string>>();
                        IDictionary<string, string> cbiao = new Dictionary<string, string>();
                        cbiao.Add("key", "rollback");
                        cbiao.Add("oldvalue", "客户编号：" + model.f_khbh + "抄表编号：" + model.f_cb_cbbh + " 用户名：" + model.f_yhm);
                        cbiao.Add("newvalue","");
                        cbiao.Add("name", "PC端抄表回滚");
                        arr.Add(cbiao);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_cbiao", model.sys_id.ToString(), "tbl_ld_cbiao_detail", "PC端抄表回滚", arr, clientInf, t);
                        #endregion
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                    }

                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "该数据不存在";
                }

                NewLog("数据更新成功，更新的数据为：sys_id：" + sys_id, "sql_update", clientInf);


                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                t.getTrans().rollback();

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：sys_id：" + sys_id + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }


        /// <summary>
        /// 数据回滚，app端只抄不收，进行回滚时调用
        /// </summary>
        /// <param name="sys_id"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBackCBForApp(string sys_id, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
            try
            {

                t.getTrans().begin();

                List<sara.dd.ldsw.model.tbl_ld_cbiao> modelist = _idal_tbl_ld_cbiao.GetList("sys_id='" + sys_id + "'", "", "", "*", "", "", t);
                if(modelist.Count > 0)
                {
                    sara.dd.ldsw.model.tbl_ld_cbiao model = modelist[0];


                    if (model.f_ztid != "1")
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "该数据不可回滚";
                    }
                    else
                    {
                        #region 状态变为新建
                        model.f_ztid = "0";
                        model.f_zt = "新建";
                        #endregion

                        //回滚阶梯水价
                        model.f_dyjtsl = "0";
                        model.f_dyjtsf = "0";
                        model.f_dejtsl = "0";
                        model.f_dejtsf = "0";
                        model.f_dsjtsl = "0";
                        model.f_dsjtsf = "0";

                        _idal_tbl_ld_cbiao.Update(model, "f_ztid,f_zt,f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf", t);

                        //#region 最新平均水量

                        ////【前三期平均水量】【前六期平均水量】

                        //string f_qsqpjsl = "";
                        //string f_qlqpjsl = "";
                        //CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, t);
                        //#endregion


                        double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);

                        #region 回滚客户表数据
                        //【最后抄表表底数】---【最后抄表时间】回滚
                        //【年累计购量】【累计购量】
                        //【前三期平均水量】【前六期平均水量】

                        //【上期止码】【本期止码】【上期水量】【本期水量】

                        //上一条抄表记录
                        DataTable dt_sytcbjl = t.Query("select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl,rownum  from (select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' order by f_cbsj desc) t where rownum =1").Tables[0];

                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];
                        #region 记录旧值
                        string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
                        string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
                        string f_sqzm_old = model_tbl_ld_khb.f_sqzm;

                        string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
                        string f_sqsl_old = model_tbl_ld_khb.f_sqsl;

                        string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
                        string f_ljgl_old = model_tbl_ld_khb.f_ljgl;

                        string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
                        string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;
                        #endregion

                        //计算新的抄表周期
                        DateTime cbsj;
                        DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                        dtFormat.ShortDatePattern = "yyyy/MM/dd";

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

                        if (dt_sytcbjl.Rows.Count > 0)
                        {
                            model_tbl_ld_khb.f_zhcbrq = cbsj;
                            model_tbl_ld_khb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                            model_tbl_ld_khb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                            model_tbl_ld_khb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                            model_tbl_ld_khb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();

                            model_tbl_ld_khb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                            model_tbl_ld_khb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                            //model_tbl_ld_khb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                        }
                        else
                        {
                            model_tbl_ld_khb.f_zhcbrq = cbsj;

                            model_tbl_ld_khb.f_bqzm = model.f_sqzm;
                            model_tbl_ld_khb.f_sqzm = "";

                            model_tbl_ld_khb.f_bqsl = model.f_sqsl;
                            model_tbl_ld_khb.f_sqsl = "";
                            model_tbl_ld_khb.f_qsqpjsl = "";
                            model_tbl_ld_khb.f_qlqpjsl = "";
                            //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                            //double new_nljgl = nljgl - bqsl;
                            //model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                        }
                        model_tbl_ld_khb.f_nljgl = model.f_sjljsyl;


                        double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                        double new_ljgl = ljgl - bqsl;
                        model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl,2);




                        idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_zhcbrq", t);
                        #region 写日志
                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_zhcbrq");
                        temp.Add("oldvalue", f_zhcbrq_old);
                        temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                        temp.Add("name", "最后抄表日期");
                        array.Add(temp);
                        IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                        f_nljgl.Add("key", "f_nljgl");
                        f_nljgl.Add("oldvalue", f_nljgl_old);
                        f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                        f_nljgl.Add("name", "年累计够量");
                        array.Add(f_nljgl);
                        IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                        f_ljgl.Add("key", "f_ljgl");
                        f_ljgl.Add("oldvalue", f_ljgl_old);
                        f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                        f_ljgl.Add("name", "累计够量");
                        array.Add(f_ljgl);
                        IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                        qsqpjsl_dic.Add("key", "qsqpjsl");
                        qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                        qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                        qsqpjsl_dic.Add("name", "前三期平均水量");
                        array.Add(qsqpjsl_dic);
                        IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                        qlqpjsl_dic.Add("key", "qlqpjsl");
                        qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                        qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                        qlqpjsl_dic.Add("name", "年累计够量");
                        array.Add(qlqpjsl_dic);


                        IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                        f_bqzm.Add("key", "f_bqzm");
                        f_bqzm.Add("oldvalue", f_bqzm_old);
                        f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                        f_bqzm.Add("name", "本期止码");
                        array.Add(f_bqzm);

                        IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                        f_sqzm.Add("key", "f_sqzm");
                        f_sqzm.Add("oldvalue", f_sqzm_old);
                        f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                        f_sqzm.Add("name", "上期止码");
                        array.Add(f_sqzm);

                        IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                        f_bqsl.Add("key", "f_bqsl");
                        f_bqsl.Add("oldvalue", f_bqsl_old);
                        f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                        f_bqsl.Add("name", "本期水量");
                        array.Add(f_bqsl);

                        IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                        f_sqsl.Add("key", "f_sqsl");
                        f_sqsl.Add("oldvalue", f_sqsl_old);
                        f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                        f_sqsl.Add("name", "上期水量");
                        array.Add(f_sqsl);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, t);
                        #endregion

                        #endregion


                        #region 回滚水表表数据
                        //【年累计购量】【累计购量】 
                        //【前三期平均水量】【前六期平均水量】

                        //【上期止码】【本期止码】【上期水量】【本期水量】

                        sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];

                        string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                        string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                        string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                        string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;

                        string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                        string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                        string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                        string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;

                        if (dt_sytcbjl.Rows.Count > 0)
                        {
                            model_tbl_ld_sbb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                            model_tbl_ld_sbb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                            model_tbl_ld_sbb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                            model_tbl_ld_sbb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();

                            model_tbl_ld_sbb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                            model_tbl_ld_sbb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                            //model_tbl_ld_sbb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                        }
                        else
                        {
                            model_tbl_ld_sbb.f_bqzm = model.f_sqzm;
                            model_tbl_ld_sbb.f_sqzm = "";

                            model_tbl_ld_sbb.f_bqsl = model.f_sqsl;
                            model_tbl_ld_sbb.f_sqsl = "";
                            model_tbl_ld_sbb.f_qsqpjsl = "";
                            model_tbl_ld_sbb.f_qlqpjsl = "";
                            //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                            //double new_nljgl = nljgl - bqsl;
                            //model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                        }
                        model_tbl_ld_sbb.f_nljgl = model.f_sjljsyl;

                        double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                        double now_ljgl = sb_ljgl - bqsl;
                        model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl,2);





                        idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);


                        #region 写日志
                        //写日志
                        List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();

                        IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                        sb_f_nljgl.Add("key", "f_nljgl");
                        sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                        sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                        sb_f_nljgl.Add("name", "年累计购量");
                        list.Add(sb_f_nljgl);

                        IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                        sb_f_ljgl.Add("key", "f_ljgl");
                        sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                        sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                        sb_f_ljgl.Add("name", "累计购量");
                        list.Add(sb_f_ljgl);

                        IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                        sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                        sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                        sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                        sb_f_qsqpjsl.Add("name", "前三期平均水量");
                        list.Add(sb_f_qsqpjsl);

                        IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                        sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                        sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                        sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                        sb_f_qlqpjsl.Add("name", "前六期平均水量");
                        list.Add(sb_f_qlqpjsl);


                        IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                        sb_f_bqzm.Add("key", "f_bqzm");
                        sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                        sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                        sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                        sb_f_bqsl.Add("name", "本期水量");
                        list.Add(sb_f_bqsl);

                        IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                        sb_f_sqsl.Add("key", "f_sqsl");
                        sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                        sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                        sb_f_sqsl.Add("name", "上期水量");
                        list.Add(sb_f_sqsl);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, t);
                        #endregion
                        #endregion
                        #region 抄表回滚写日志
                        List<IDictionary<string, string>> arr = new List<IDictionary<string, string>>();
                        IDictionary<string, string> cbiao = new Dictionary<string, string>();
                        cbiao.Add("key", "rollback");
                        cbiao.Add("oldvalue", "客户编号：" + model.f_khbh + "抄表编号：" + model.f_cb_cbbh + " 用户名：" + model.f_yhm);
                        cbiao.Add("newvalue", "");
                        cbiao.Add("name", "手持机抄表回滚");
                        arr.Add(cbiao);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_cbiao", model.sys_id.ToString(), "tbl_ld_cbiao_detail", "手持机抄表回滚", arr, clientInf, t);
                        #endregion
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                    }
                }

                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "传入数据不存在";
                }
                

                NewLog("数据更新成功，更新的数据为：sys_id：" + sys_id, "sql_update", clientInf);


                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                t.getTrans().rollback();

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：sys_id：" + sys_id + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void RollBackCBForAppCross(string sys_id, string clientInf)
        {
            string result1 = this.RollBackCBForApp(sys_id, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }


        /// <summary>
        /// 数据回滚， app端抄表缴费时，只缴费后，进行回滚，
        /// </summary>
        /// <param name="sys_id"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RollBackCBJFForApp(string sys_id, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
            try
            {

                t.getTrans().begin();

                IList<sara.dd.ldsw.model.tbl_ld_cbiao> modellist = _idal_tbl_ld_cbiao.GetList("sys_id='" + sys_id + "'",  "", "", "*", "", "", t);
                if(modellist.Count > 0)
                {
                    sara.dd.ldsw.model.tbl_ld_cbiao model = modellist[0];

                    if (model.f_ztid != "2")
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "该数据不可回滚";
                    }
                    else
                    {

                        #region 状态变为新建
                        model.f_ztid = "0";
                        model.f_zt = "新建";
                        #endregion

                        //回滚阶梯水价
                        model.f_dyjtsl = "0";
                        model.f_dyjtsf = "0";
                        model.f_dejtsl = "0";
                        model.f_dejtsf = "0";
                        model.f_dsjtsl = "0";
                        model.f_dsjtsf = "0";

                        _idal_tbl_ld_cbiao.Update(model, "f_ztid,f_zt,f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf", t);

                        //#region 最新平均水量

                        ////【前三期平均水量】【前六期平均水量】

                        //string f_qsqpjsl = "";
                        //string f_qlqpjsl = "";
                        //CountPJSL(model, ref f_qsqpjsl, ref f_qlqpjsl, t);
                        //#endregion


                        double bqsl = Eva.Library.Text.NumberTool.Parse(model.f_bqsl);

                        #region 回滚客户表数据
                        //【最后抄表表底数】------------【最后抄表时间】回滚
                        //【年累计购量】【累计购量】
                        //【前三期平均水量】【前六期平均水量】

                        //【上期止码】【本期止码】【上期水量】【本期水量】
                        //【累计欠费】
                        //上一条抄表记录
                        DataTable dt_sytcbjl = t.Query("select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl,rownum  from (select f_sjljsyl,f_qsqpjsl,f_qlqpjsl,f_cbsj, f_bqzm, f_sqzm, f_bqsl, f_sqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' order by f_cbsj desc) t where rownum =1").Tables[0];

                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id='" + model.f_khbhid + "'", "", "*", "", "", t)[0];
                        #region 记录旧值
                        string f_zhcbrq_old = model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd");
                        string f_bqzm_old = model_tbl_ld_khb.f_bqzm;
                        string f_sqzm_old = model_tbl_ld_khb.f_sqzm;

                        string f_bqsl_old = model_tbl_ld_khb.f_bqsl;
                        string f_sqsl_old = model_tbl_ld_khb.f_sqsl;

                        string f_nljgl_old = model_tbl_ld_khb.f_nljgl;
                        string f_ljgl_old = model_tbl_ld_khb.f_ljgl;

                        string f_qlqpjsl_old = model_tbl_ld_khb.f_qlqpjsl;
                        string f_qsqpjsl_old = model_tbl_ld_khb.f_qsqpjsl;


                        string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
                        #endregion


                        //计算新的抄表周期
                        DateTime cbsj;
                        DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
                        dtFormat.ShortDatePattern = "yyyy/MM/dd";

                        cbsj = Convert.ToDateTime(model_tbl_ld_khb.f_zhcbrq, dtFormat);
                        int sbyear = cbsj.Year;
                        int sbmonth = cbsj.Month + 1;
                        if(sbmonth == 13)
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
                        if (dt_sytcbjl.Rows.Count > 0)
                        {
                            model_tbl_ld_khb.f_zhcbrq = cbsj;
                            model_tbl_ld_khb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                            model_tbl_ld_khb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                            model_tbl_ld_khb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                            model_tbl_ld_khb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();

                            model_tbl_ld_khb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                            model_tbl_ld_khb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                            //model_tbl_ld_khb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                        }
                        else
                        {
                            model_tbl_ld_khb.f_zhcbrq = cbsj;

                            model_tbl_ld_khb.f_bqzm = model.f_sqzm;
                            model_tbl_ld_khb.f_sqzm = "";

                            model_tbl_ld_khb.f_bqsl = model.f_sqsl;
                            model_tbl_ld_khb.f_sqsl = "";
                            model_tbl_ld_khb.f_qsqpjsl = "";
                            model_tbl_ld_khb.f_qlqpjsl = "";
                            //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_nljgl);
                            //double new_nljgl = nljgl - bqsl;
                            //model_tbl_ld_khb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                        }

                        model_tbl_ld_khb.f_nljgl = model.f_sjljsyl;


                        double ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljgl);
                        double new_ljgl = ljgl - bqsl;
                        model_tbl_ld_khb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljgl,2);




                        double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                        double new_ljqf = ljqf - Eva.Library.Text.NumberTool.Parse(model.f_bqje);
                        model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(new_ljqf,2);

                        idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_ljgl,f_nljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_ljqf,f_zhcbrq", t);
                        #region 写日志
                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp = new Dictionary<string, string>();
                        temp.Add("key", "f_zhcbrq");
                        temp.Add("oldvalue", f_zhcbrq_old);
                        temp.Add("newvalue", model_tbl_ld_khb.f_zhcbrq.ToString("yyyy-MM-dd"));
                        temp.Add("name", "最后抄表日期");
                        array.Add(temp);
                        IDictionary<string, string> f_nljgl = new Dictionary<string, string>();
                        f_nljgl.Add("key", "f_nljgl");
                        f_nljgl.Add("oldvalue", f_nljgl_old);
                        f_nljgl.Add("newvalue", model_tbl_ld_khb.f_nljgl);
                        f_nljgl.Add("name", "年累计够量");
                        array.Add(f_nljgl);
                        IDictionary<string, string> f_ljgl = new Dictionary<string, string>();
                        f_ljgl.Add("key", "f_ljgl");
                        f_ljgl.Add("oldvalue", f_ljgl_old);
                        f_ljgl.Add("newvalue", model_tbl_ld_khb.f_ljgl);
                        f_ljgl.Add("name", "累计够量");
                        array.Add(f_ljgl);
                        IDictionary<string, string> qsqpjsl_dic = new Dictionary<string, string>();
                        qsqpjsl_dic.Add("key", "qsqpjsl");
                        qsqpjsl_dic.Add("oldvalue", f_qsqpjsl_old);
                        qsqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qsqpjsl);
                        qsqpjsl_dic.Add("name", "前三期平均水量");
                        array.Add(qsqpjsl_dic);
                        IDictionary<string, string> qlqpjsl_dic = new Dictionary<string, string>();
                        qlqpjsl_dic.Add("key", "qlqpjsl");
                        qlqpjsl_dic.Add("oldvalue", f_qlqpjsl_old);
                        qlqpjsl_dic.Add("newvalue", model_tbl_ld_khb.f_qlqpjsl);
                        qlqpjsl_dic.Add("name", "年累计够量");
                        array.Add(qlqpjsl_dic);


                        IDictionary<string, string> f_bqzm = new Dictionary<string, string>();
                        f_bqzm.Add("key", "f_bqzm");
                        f_bqzm.Add("oldvalue", f_bqzm_old);
                        f_bqzm.Add("newvalue", model_tbl_ld_khb.f_bqzm);
                        f_bqzm.Add("name", "本期止码");
                        array.Add(f_bqzm);

                        IDictionary<string, string> f_sqzm = new Dictionary<string, string>();
                        f_sqzm.Add("key", "f_sqzm");
                        f_sqzm.Add("oldvalue", f_sqzm_old);
                        f_sqzm.Add("newvalue", model_tbl_ld_khb.f_sqzm);
                        f_sqzm.Add("name", "上期止码");
                        array.Add(f_sqzm);

                        IDictionary<string, string> f_bqsl = new Dictionary<string, string>();
                        f_bqsl.Add("key", "f_bqsl");
                        f_bqsl.Add("oldvalue", f_bqsl_old);
                        f_bqsl.Add("newvalue", model_tbl_ld_khb.f_bqsl);
                        f_bqsl.Add("name", "本期水量");
                        array.Add(f_bqsl);

                        IDictionary<string, string> f_sqsl = new Dictionary<string, string>();
                        f_sqsl.Add("key", "f_sqsl");
                        f_sqsl.Add("oldvalue", f_sqsl_old);
                        f_sqsl.Add("newvalue", model_tbl_ld_khb.f_sqsl);
                        f_sqsl.Add("name", "上期水量");
                        array.Add(f_sqsl);

                        IDictionary<string, string> f_ljqf = new Dictionary<string, string>();
                        f_ljqf.Add("key", "f_ljqf");
                        f_ljqf.Add("oldvalue", f_ljqf_old);
                        f_ljqf.Add("newvalue", model_tbl_ld_khb.f_ljqf);
                        f_ljqf.Add("name", "累计欠费");
                        array.Add(f_ljqf);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, t);
                        #endregion

                        #endregion


                        #region 回滚水表表数据
                        //【年累计购量】【累计购量】 
                        //【前三期平均水量】【前六期平均水量】

                        //【上期止码】【本期止码】【上期水量】【本期水量】

                        sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList("sys_id='" + model.f_sbbhid + "'", "", "*", "", "", t)[0];

                        string sb_f_bqzm_old = model_tbl_ld_sbb.f_bqzm;
                        string sb_f_sqzm_old = model_tbl_ld_sbb.f_sqzm;
                        string sb_f_bqsl_old = model_tbl_ld_sbb.f_bqsl;
                        string sb_f_sqsl_old = model_tbl_ld_sbb.f_sqsl;

                        string sb_f_nljgl_old = model_tbl_ld_sbb.f_nljgl;
                        string sb_f_ljgl_old = model_tbl_ld_sbb.f_ljgl;
                        string sb_f_qsqpjsl_old = model_tbl_ld_sbb.f_qsqpjsl;
                        string sb_f_qlqpjsl_old = model_tbl_ld_sbb.f_qlqpjsl;

                        if (dt_sytcbjl.Rows.Count > 0)
                        {
                            model_tbl_ld_sbb.f_bqzm = dt_sytcbjl.Rows[0]["f_bqzm"].ToString();
                            model_tbl_ld_sbb.f_sqzm = dt_sytcbjl.Rows[0]["f_sqzm"].ToString();

                            model_tbl_ld_sbb.f_bqsl = dt_sytcbjl.Rows[0]["f_bqsl"].ToString();
                            model_tbl_ld_sbb.f_sqsl = dt_sytcbjl.Rows[0]["f_sqsl"].ToString();

                            model_tbl_ld_sbb.f_qsqpjsl = dt_sytcbjl.Rows[0]["f_qsqpjsl"].ToString();
                            model_tbl_ld_sbb.f_qlqpjsl = dt_sytcbjl.Rows[0]["f_qlqpjsl"].ToString();
                            //model_tbl_ld_sbb.f_nljgl = dt_sytcbjl.Rows[0]["f_sjljsyl"].ToString();
                        }
                        else
                        {
                            model_tbl_ld_sbb.f_bqzm = model.f_sqzm;
                            model_tbl_ld_sbb.f_sqzm = "";

                            model_tbl_ld_sbb.f_bqsl = model.f_sqsl;
                            model_tbl_ld_sbb.f_sqsl = "";
                            model_tbl_ld_sbb.f_qsqpjsl = "";
                            model_tbl_ld_sbb.f_qlqpjsl = "";
                            //double nljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_nljgl);
                            //double new_nljgl = nljgl - bqsl;
                            //model_tbl_ld_sbb.f_nljgl = Eva.Library.Text.NumberTool.GetNumberByLength(new_nljgl,2);
                        }
                        model_tbl_ld_sbb.f_nljgl = model.f_sjljsyl;

                        double sb_ljgl = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_sbb.f_ljgl);
                        double now_ljgl = sb_ljgl - bqsl;
                        model_tbl_ld_sbb.f_ljgl = Eva.Library.Text.NumberTool.GetNumberByLength(now_ljgl,2);




                        idal_tbl_ld_sbb.Update(model_tbl_ld_sbb, "f_nljgl,f_ljgl,f_qsqpjsl,f_qlqpjsl,f_bqzm,f_sqzm,f_bqsl,f_sqsl", t);


                        #region 写日志
                        //写日志
                        List<IDictionary<string, string>> list = new List<IDictionary<string, string>>();

                        IDictionary<string, string> sb_f_nljgl = new Dictionary<string, string>();
                        sb_f_nljgl.Add("key", "f_nljgl");
                        sb_f_nljgl.Add("oldvalue", sb_f_nljgl_old);
                        sb_f_nljgl.Add("newvalue", model_tbl_ld_sbb.f_nljgl);
                        sb_f_nljgl.Add("name", "年累计购量");
                        list.Add(sb_f_nljgl);

                        IDictionary<string, string> sb_f_ljgl = new Dictionary<string, string>();
                        sb_f_ljgl.Add("key", "f_ljgl");
                        sb_f_ljgl.Add("oldvalue", sb_f_ljgl_old);
                        sb_f_ljgl.Add("newvalue", model_tbl_ld_sbb.f_ljgl);
                        sb_f_ljgl.Add("name", "累计购量");
                        list.Add(sb_f_ljgl);

                        IDictionary<string, string> sb_f_qsqpjsl = new Dictionary<string, string>();
                        sb_f_qsqpjsl.Add("key", "f_qsqpjsl");
                        sb_f_qsqpjsl.Add("oldvalue", sb_f_qsqpjsl_old);
                        sb_f_qsqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qsqpjsl);
                        sb_f_qsqpjsl.Add("name", "前三期平均水量");
                        list.Add(sb_f_qsqpjsl);

                        IDictionary<string, string> sb_f_qlqpjsl = new Dictionary<string, string>();
                        sb_f_qlqpjsl.Add("key", "f_qlqpjsl");
                        sb_f_qlqpjsl.Add("oldvalue", sb_f_qlqpjsl_old);
                        sb_f_qlqpjsl.Add("newvalue", model_tbl_ld_sbb.f_qlqpjsl);
                        sb_f_qlqpjsl.Add("name", "前六期平均水量");
                        list.Add(sb_f_qlqpjsl);


                        IDictionary<string, string> sb_f_bqzm = new Dictionary<string, string>();
                        sb_f_bqzm.Add("key", "f_bqzm");
                        sb_f_bqzm.Add("oldvalue", sb_f_bqzm_old);
                        sb_f_bqzm.Add("newvalue", model_tbl_ld_sbb.f_bqzm);
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
                        sb_f_bqsl.Add("newvalue", model_tbl_ld_sbb.f_bqsl);
                        sb_f_bqsl.Add("name", "本期水量");
                        list.Add(sb_f_bqsl);

                        IDictionary<string, string> sb_f_sqsl = new Dictionary<string, string>();
                        sb_f_sqsl.Add("key", "f_sqsl");
                        sb_f_sqsl.Add("oldvalue", sb_f_sqsl_old);
                        sb_f_sqsl.Add("newvalue", model_tbl_ld_sbb.f_sqsl);
                        sb_f_sqsl.Add("name", "上期水量");
                        list.Add(sb_f_sqsl);

                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表回滚", array, clientInf, t);
                        #endregion
                        #endregion
                        #region 抄表回滚写日志
                        List<IDictionary<string, string>> arr = new List<IDictionary<string, string>>();
                        IDictionary<string, string> cbiao = new Dictionary<string, string>();
                        cbiao.Add("key", "rollback");
                        cbiao.Add("oldvalue", "客户编号：" + model.f_khbh + "抄表编号：" + model.f_cb_cbbh + " 用户名：" + model.f_yhm);
                        cbiao.Add("newvalue", "");
                        cbiao.Add("name", "抄表缴费回滚");
                        arr.Add(cbiao);
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_cbiao", model.sys_id.ToString(), "tbl_ld_cbiao_detail", "抄表缴费回滚", arr, clientInf, t);
                        #endregion
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                    }
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "数据不存在";
                }
               
                NewLog("数据更新成功，更新的数据为：sys_id：" + sys_id, "sql_update", clientInf);


                t.getTrans().commit();
            }
            catch (Exception ex)
            {
                t.getTrans().rollback();

                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：sys_id：" + sys_id + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void RollBackCBJFForAppCross(string sys_id, string clientInf)
        {
            string result1 = this.RollBackCBJFForApp(sys_id, clientInf);
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

                columns += "^" + "f_cb_cbbh";

                columns += "^" + "f_cb_cbbhid";

                columns += "^" + "f_khbh";

                columns += "^" + "f_khbhid";

                columns += "^" + "f_sqzm";

                columns += "^" + "f_bqzm";

                columns += "^" + "f_bqsl";

                columns += "^" + "f_sqsl";

                columns += "^" + "f_qsqpjsl";

                columns += "^" + "f_qlqpjsl";

                columns += "^" + "f_cbyname";

                columns += "^" + "f_cbyid";

                columns += "^" + "f_cbyphoto";

                columns += "^" + "f_cbsj";

                columns += "^" + "f_bk";

                columns += "^" + "f_bkid";

                columns += "^" + "f_zt";

                columns += "^" + "f_ztid";

                columns += "^" + "f_ly";

                columns += "^" + "f_lyid";

                columns += "^" + "f_bz";

                columns += "^" + "f_sbbh";

                columns += "^" + "f_sbbhid";

                columns += "^" + "f_sblx";

                columns += "^" + "f_sblxid";

                columns += "^" + "f_yslx";

                columns += "^" + "f_yslxid";

                columns += "^" + "f_lxtkhh";

                columns += "^" + "f_cbbh";

                columns += "^" + "f_cbbhid";

                columns += "^" + "f_cbmc";

                columns += "^" + "f_yhbh";

                columns += "^" + "f_yhbhid";

                columns += "^" + "f_yhm";

                columns += "^" + "f_jfm";

                columns += "^" + "f_dh";

                columns += "^" + "f_dz";

                columns += "^" + "f_dy";

                columns += "^" + "f_dyid";

                columns += "^" + "f_sc";

                columns += "^" + "f_scid";

                columns += "^" + "f_qy";

                columns += "^" + "f_qyid";

                columns += "^" + "f_pq";

                columns += "^" + "f_pqid";

                columns += "^" + "f_pgbh";

                columns += "^" + "f_pgbhid";

                columns += "^" + "f_pgr";

                columns += "^" + "f_pgrid";

                columns += "^" + "f_pgpcmc";

                columns += "^" + "f_pgsj";

                columns += "^" + "f_jfbh";

                columns += "^" + "f_jfbhid";

                columns += "^" + "f_jfsj";

                columns += "^" + "f_bqje";

                columns += "^" + "f_kj";
                columns += "^" + "f_kjid";
                columns += "^" + "f_ztkhh";
                columns += "^" + "f_ztsbh";
                columns += "^" + "f_ztyhh";
                columns += "^" + "f_rs";
                columns += "^" + "f_khfz";
                columns += "^" + "f_khfzid";
                columns += "^" + "f_sf";
                columns += "^" + "f_pwf";
                columns += "^" + "f_sjljsyl";
                columns += "^" + "f_jmje";
                columns += "^" + "f_jmbh";
                columns += "^" + "f_jmbhid";
                columns += "^" + "f_sfsfts";
                columns += "^" + "f_sfjl";
                columns += "^" + "f_dyjtsl";
                columns += "^" + "f_dyjtsf";
                columns += "^" + "f_dejtsl";
                columns += "^" + "f_dejtsf";
                columns += "^" + "f_dsjtsl";
                columns += "^" + "f_dsjtsf";
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


        private void CountPJSL(sara.dd.ldsw.model.tbl_ld_cbiao model, ref string f_qsqpjsl, ref string f_qlqpjsl, string bqsl, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            DataTable dt_pjsl = null;

            if (t == null)
            {
                _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                dt_pjsl = _iAccessData.Query("select f_bqsl,rownum from ( select f_bqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' and f_ztid <> '9'  order by f_cbsj desc) t where rownum<6").Tables[0];
            }
            else
            {
                dt_pjsl = t.Query("select f_bqsl,rownum from ( select f_bqsl from tbl_ld_cbiao where f_khbhid='" + model.f_khbhid + "' and f_ztid <> '0' and f_ztid <> '9' order by f_cbsj desc) t where rownum<6").Tables[0];
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
            f_qsqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(qsqpjsl,2);
            f_qlqpjsl = Eva.Library.Text.NumberTool.GetNumberByLength(qlqpjsl,2);
        }


        //导出数据
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Export(string whereString, string cxzxsjString, string column, string orderByString, string columnname, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                //string sql = "select " + column;
                //sql += " from tbl_ld_cbiao";
                //sql += " where" + whereString + "";
                //DataTable dt = _iAccessData.Query(sql).Tables[0];
                DataTable dt = _idal_tbl_ld_cbiao.GetDataTableForPC(whereString, cxzxsjString, orderByString, column, "", "", null);

                if (column.EndsWith("f_value10"))
                {
                    string sql = "select f_khbh,f_nr from TBL_LDBM_EXPDATA where f_lxid != '08060002'";
                    DataTable zhdt = _iAccessData.Query(sql).Tables[0];

                    for(int i = 0; i < dt.Rows.Count; i++)
                    {
                        DataRow[] drs = zhdt.Select("f_khbh='" + dt.Rows[i]["f_khbh"] + "'");

                        if (drs.Length == 1)
                        {
                            dt.Rows[i]["f_value10"] = drs[0]["f_nr"];
                        }
                    }
                }



                

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
        public void ExportCross(string whereString, string cxzxsjString, string orderByString, string column, string columnname, string clientInf)
        {
            string result1 = this.Export(whereString, cxzxsjString, orderByString, column, columnname, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string IsCanRollBack(string sys_id, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
            try
            {
                string sql = " select count(*) from tbl_ld_cbiao where sys_id > '" + sys_id + "' and f_khbhid = (select f_khbhid from tbl_ld_cbiao where sys_id = '" + sys_id + "')";
                string count = _iAccessData.GetSingle(sql).ToString();
                if (count != "0")
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "false";
                }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "true";
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
        public void IsCanRollBackCross(string sys_id, string clientInf)
        {
            string result1 = this.IsCanRollBack(sys_id, clientInf);
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
        public string RollBackSF(string sys_id,string khbhid,string bqje,string jmbhid, string clientInf)
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

                    sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("sys_id = ('" + khbhid + "') ", "", "*", "", "", t)[0];
                    string f_ljqf_old = model_tbl_ld_khb.f_ljqf;
                    double ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                    ljqf -= Eva.Library.Text.NumberTool.Parse(bqje);
                    model_tbl_ld_khb.f_ljqf = Eva.Library.Text.NumberTool.GetNumberByLength(ljqf.ToString(), 2);


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
               
                //清除算费数据
                string updatesql = "update TBL_LD_CBIAO set F_ZT='已抄表',F_ZTID='1',F_SF='0',F_PWF='0',F_BQJE='0' where SYS_ID='"+sys_id+"'";

                int flag = t.ExecuteSql(updatesql);
                if (flag < 0)
                {
                    t.getTrans().rollback();
                    resultDic["result"] = "false";
                    resultDic["message"] = "错误，更新水表信息时出现错误。";
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }

                //查询减免数据

                string jmids = jmbhid;

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


                resultDic["result"] = "true";
                resultDic["message"] = "执行成功！";

                NewLog("数据更新成功，更新的数据为：cbhhid：" + sys_id, "sql_update", clientInf);

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

                NewLog("数据更新失败，更新的数据为：cbhhid：" + sys_id + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SumList(string whereString, string cxzxsjString,  string sumString,  string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                string columnsString = "";
                string[] sumArray = sumString.Split('^');
                for(int i = 0; i < sumArray.Length; i++)
                {
                    columnsString += "SUM(" + sumArray[i] + ") as " + sumArray[i] + ",";
                }
                columnsString = columnsString.TrimEnd(',');

                StringBuilder strSql = new StringBuilder();

                strSql.Append(" select " + columnsString + " from (");

                if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("cBiao", cxzxsjString) == true)
                {
                    strSql.Append("  select * from  ");
                    strSql.Append("  ( ");
                    strSql.Append("  (select * from tbl_ld_cbiao t where ");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }
                    strSql.Append("   )    ");
                    strSql.Append("  union  all ");
                    strSql.Append("  (select * from tbl_ld_cbiao_his t where  ");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }
                    strSql.Append("   )    ");
                    strSql.Append("  )    ");

                }
                else
                {
                    strSql.Append(" select * from tbl_ld_cbiao t where");
                    if (whereString.Trim() == "")
                    {
                        strSql.Append(" 1=1 ");
                    }
                    else
                    {
                        strSql.Append(" " + whereString);
                    }

                }
                strSql.Append(" ) ");
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                DataTable resultDataTable = _iAccessData.Query(strSql.ToString()).Tables[0];

                string message = "{\"f_sf\":\"" + resultDataTable.Rows[0]["f_sf"] + "\",\"f_pwf\":\"" + resultDataTable.Rows[0]["f_pwf"] + "\",\"f_bqsl\":\"" + resultDataTable.Rows[0]["f_bqsl"] + "\",\"f_bqje\":\"" + resultDataTable.Rows[0]["f_bqje"] + "\"}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        /// <summary>
        /// 抄表表历史阶梯水价自动刷新程序
        /// </summary>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string historyJTSJ()
        {
            string result = "";
            try
            {
                double count = Eva.Library.Text.NumberTool.Parse(_idal_tbl_ld_cbiao.GetCount("(f_sfjl like '%3.95^%' or f_sfjl like '%5.25^%' or f_sfjl like '%7.05^%') and f_dyjtsl is null and f_dyjtsf is null","false",null));

                double pagecount = Math.Ceiling(count / 5000);

                for(int page = 1; page < pagecount; page++)
                {
                    List<model.tbl_ld_cbiao> cbmodellist = _idal_tbl_ld_cbiao.GetList("(f_sfjl like '%3.95^%' or f_sfjl like '%5.25^%' or f_sfjl like '%7.05^%') and f_dyjtsl is null and f_dyjtsf is null", "false", "", "sys_id,f_sfjl,f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf","5000", page.ToString(), null);

                    for (int i = 0; i < cbmodellist.Count(); i++)
                    {

                        model.tbl_ld_cbiao model = cbmodellist[i];

                        string sfjl = model.f_sfjl;
                        string[] sfarr = sfjl.Split('|');

                        model.f_dyjtsl = "0";
                        model.f_dyjtsf = "0";
                        model.f_dejtsl = "0";
                        model.f_dejtsf = "0";
                        model.f_dsjtsl = "0";
                        model.f_dsjtsf = "0";

                        for (int ii = 0; ii < sfarr.Length; ii++)
                        {
                            if (sfarr[ii].StartsWith("3.95^"))
                            {
                                string[] arr = sfarr[ii].Split('^');
                                if (arr.Length == 3)
                                {
                                    model.f_dyjtsl = arr[2];
                                    model.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(arr[0]) + Eva.Library.Text.NumberTool.Parse(arr[1])) * Eva.Library.Text.NumberTool.Parse(arr[2]), 2);
                                }
                            }
                            else if (sfarr[ii].StartsWith("5.25^"))
                            {
                                string[] arr = sfarr[ii].Split('^');
                                if (arr.Length == 3)
                                {
                                    model.f_dejtsl = arr[2];
                                    model.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(arr[0]) + Eva.Library.Text.NumberTool.Parse(arr[1])) * Eva.Library.Text.NumberTool.Parse(arr[2]), 2);
                                }
                            }
                            else if (sfarr[ii].StartsWith("7.05^"))
                            {
                                string[] arr = sfarr[ii].Split('^');
                                if (arr.Length == 3)
                                {
                                    model.f_dsjtsl = arr[2];
                                    model.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(arr[0]) + Eva.Library.Text.NumberTool.Parse(arr[1])) * Eva.Library.Text.NumberTool.Parse(arr[2]), 2);
                                }
                            }
                        }

                        _idal_tbl_ld_cbiao.Update(model, "f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf", null);
                    }
                }


                result = "success";

            }
              catch (Exception ex)
            {
                result = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

            }

            return result;
           
        }
    }
}









