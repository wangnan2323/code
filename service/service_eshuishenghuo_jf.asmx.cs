using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_eshuishenghuo_jf 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class service_eshuishenghuo_jf : System.Web.Services.WebService
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        [WebMethod]
        public string dojf(string khbh,string payAmount)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                _iAccessData = commonclass.commonclass.CreateIAccessData();
                if (khbh.Length == 10)
                {
                    //查询该用户未缴费的抄表记录
                    DataTable dt = _iAccessData.Query("select wm_concat(sys_id) as sys_id,wm_concat(f_cb_cbbh) as f_cbbh,sum(f_bqje) as f_bqje,sum(f_bqsl) as f_bqsl,sum(f_sf) as f_sf,sum(f_pwf) as f_pwf,f_yhm,REPLACE(wm_concat(f_sfjl),',','|') as f_sfjl from TBL_LD_CBIAO where f_khbh='" + khbh + "' and f_ztid='2' group by f_yhm").Tables[0];

                    double bqje = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_bqje"].ToString());
                    double bqsl = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_bqsl"].ToString());
                    double sf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_sf"].ToString());
                    double pwf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_pwf"].ToString());

                    //核实缴费信息正确性
                    if (bqje == Eva.Library.Text.NumberTool.Parse(payAmount))
                    {
                        //客户信息
                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_khbh='" + khbh + "'", "", "*", "", "", null)[0];
                        #region 创建缴费记录
                        sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                        DateTime currentTime = System.DateTime.Now;

                        jfmodel.sys_creatuserid = "1563";
                        jfmodel.sys_creatusername = "e水生活自助缴费";
                        jfmodel.sys_creatdate = currentTime;
                        jfmodel.sys_lastedituserid = "1563";
                        jfmodel.sys_lasteditusername = "e水生活自助缴费";
                        jfmodel.sys_lasteditdate = currentTime;
                        jfmodel.sys_deldate = DateTime.Parse("1900-01-01");
                        jfmodel.sys_delflag = "0";
                        jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                        jfmodel.f_jfrq = currentTime;
                        jfmodel.f_jffs = "e水生活缴费";
                        jfmodel.f_jffsid = "05740015";
                        jfmodel.f_jcfs = "全额找零";
                        jfmodel.f_jcfsid = "05750001";
                        jfmodel.f_yyy = "e水生活自助缴费";
                        jfmodel.f_yyyid = "1563";
                        jfmodel.f_czsj = currentTime;
                        jfmodel.f_sfykfp = "false";
                        jfmodel.f_zt = "已提交";
                        jfmodel.f_ztid = "2";
                        jfmodel.f_khbh = model_tbl_ld_khb.f_khbh;
                        jfmodel.f_khbhid = model_tbl_ld_khb.sys_id.ToString();
                        jfmodel.f_yhbh = model_tbl_ld_khb.f_yhbh;
                        jfmodel.f_yhbhid = model_tbl_ld_khb.f_yhbhid;
                        jfmodel.f_yhm = model_tbl_ld_khb.f_yhm;
                        jfmodel.f_jfm = model_tbl_ld_khb.f_jfm;
                        jfmodel.f_dh = model_tbl_ld_khb.f_dh;
                        jfmodel.f_dz = model_tbl_ld_khb.f_dz;
                        jfmodel.f_dy = model_tbl_ld_khb.f_dy;
                        jfmodel.f_dyid = model_tbl_ld_khb.f_dyid;
                        jfmodel.f_sc = model_tbl_ld_khb.f_sc;
                        jfmodel.f_scid = model_tbl_ld_khb.f_scid;
                        jfmodel.f_qy = model_tbl_ld_khb.f_qy;
                        jfmodel.f_qyid = model_tbl_ld_khb.f_qyid;
                        jfmodel.f_pq = model_tbl_ld_khb.f_pq;
                        jfmodel.f_pqid = model_tbl_ld_khb.f_pqid;
                        jfmodel.f_sbbh = model_tbl_ld_khb.f_sbbh;
                        jfmodel.f_sbbhid = model_tbl_ld_khb.f_sbbhid;
                        jfmodel.f_sblx = model_tbl_ld_khb.f_sblx;
                        jfmodel.f_sblxid = model_tbl_ld_khb.f_sblxid;
                        jfmodel.f_yslx = model_tbl_ld_khb.f_yslx;
                        jfmodel.f_yslxid = model_tbl_ld_khb.f_yslxid;
                        jfmodel.f_lxtkhh = model_tbl_ld_khb.f_lxth;
                        jfmodel.f_rs = model_tbl_ld_khb.f_rs;
                        jfmodel.f_cbbh = dt.Rows[0]["f_cbbh"].ToString();
                        jfmodel.f_cbbhid = dt.Rows[0]["sys_id"].ToString();
                        jfmodel.f_cbyslj = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                        jfmodel.f_sllj = Eva.Library.Text.NumberTool.GetNumberByLength(bqsl, 0);
                        jfmodel.f_sflj = Eva.Library.Text.NumberTool.GetNumberByLength(sf, 2);
                        jfmodel.f_pwflj = Eva.Library.Text.NumberTool.GetNumberByLength(pwf, 2);
                        jfmodel.f_dj = Eva.Library.Text.NumberTool.GetNumberByLength(Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj) / Eva.Library.Text.NumberTool.Parse(jfmodel.f_sllj), 2);
                        jfmodel.f_jmhyslj = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                        jfmodel.f_khytjjzsf = model_tbl_ld_khb.f_tjjzsf;
                        jfmodel.f_khytjjzpwf = model_tbl_ld_khb.f_tjjzpwf;
                        jfmodel.f_sfsytjjz = "false";
                        jfmodel.f_sytjjzsf = "0";
                        jfmodel.f_sytjjzpwf = "0";
                        jfmodel.f_syhtjjzsf = model_tbl_ld_khb.f_tjjzsf;
                        jfmodel.f_syhtjjzpwf = model_tbl_ld_khb.f_tjjzpwf;
                        jfmodel.f_khyye = model_tbl_ld_khb.f_ycje;
                        jfmodel.f_sfsyye = "false";
                        jfmodel.f_syye = "0";
                        jfmodel.f_yhye = model_tbl_ld_khb.f_ycje;
                        jfmodel.f_shys = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                        jfmodel.f_shss = Eva.Library.Text.NumberTool.GetNumberByLength(bqje, 2);
                        jfmodel.f_hszl = "0";
                        jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj)));
                        jfmodel.f_khfz = model_tbl_ld_khb.f_khfz;
                        jfmodel.f_khfzid = model_tbl_ld_khb.f_khfzid;
                        jfmodel.f_cbenbh = model_tbl_ld_khb.f_cbbh;
                        jfmodel.f_cbenbhid = model_tbl_ld_khb.f_cbbhid;
                        jfmodel.f_ljqf = model_tbl_ld_khb.f_ljqf;
                        jfmodel.f_jmjelj = "0";
                        jfmodel.f_ly = "e水生活";
                        jfmodel.f_lyid = "08080007";


                        jfmodel.f_sfjl = dt.Rows[0]["f_sfjl"].ToString();

                        string jfbhid = idal_tbl_ld_jfb.Add(jfmodel, null);
                        #endregion


                        //更新抄表表
                        string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + jfmodel.f_jfbh + "',F_JFBHID='" + jfbhid + "',F_JFSJ=to_date('" + jfmodel.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + dt.Rows[0]["sys_id"].ToString() + ")";
                        //更新客户表
                        string updatekh = "update TBL_LD_KHB set F_YCJE='" + jfmodel.f_yhye + "',F_TJJZSF='" + jfmodel.f_syhtjjzsf + "',F_TJJZPWF='" + jfmodel.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + jfmodel.f_cbyslj + " where sys_id='" + jfmodel.f_khbhid + "'";

                        int flag_cb = _iAccessData.ExecuteSql(updatecb);
                        int flag_kh = _iAccessData.ExecuteSql(updatekh);



                        //写入客户表日志
                        #region 写入日志
                        List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                        IDictionary<string, string> temp = null;
                        #region 对比各个业务子段，将不同的写入array
                        if (jfmodel.f_yhye != model_tbl_ld_khb.f_ycje)
                        {
                            temp = new Dictionary<string, string>();
                            temp.Add("key", "f_ycje");
                            temp.Add("oldvalue", model_tbl_ld_khb.f_ycje);
                            temp.Add("newvalue", jfmodel.f_yhye);
                            temp.Add("name", "绿化表押金");
                            array.Add(temp);
                        }
                        if (jfmodel.f_syhtjjzsf != model_tbl_ld_khb.f_tjjzsf)
                        {
                            temp = new Dictionary<string, string>();
                            temp.Add("key", "f_tjjzsf");
                            temp.Add("oldvalue", model_tbl_ld_khb.f_tjjzsf);
                            temp.Add("newvalue", jfmodel.f_syhtjjzsf);
                            temp.Add("name", "调价结转水费");
                            array.Add(temp);
                        }

                        if (jfmodel.f_syhtjjzpwf != model_tbl_ld_khb.f_tjjzpwf)
                        {
                            temp = new Dictionary<string, string>();
                            temp.Add("key", "f_tjjzpwf");
                            temp.Add("oldvalue", model_tbl_ld_khb.f_tjjzpwf);
                            temp.Add("newvalue", jfmodel.f_syhtjjzpwf);
                            temp.Add("name", "调价结转排污费");
                            array.Add(temp);
                        }
                        if (jfmodel.f_cbyslj == null || jfmodel.f_cbyslj == "")
                        {
                            jfmodel.f_cbyslj = "0";
                        }
                        if (model_tbl_ld_khb.f_ljqf == null || model_tbl_ld_khb.f_ljqf == "")
                        {
                            model_tbl_ld_khb.f_ljqf = "0";
                        }


                        if (double.Parse(jfmodel.f_cbyslj) > 0)
                        {
                            temp = new Dictionary<string, string>();
                            temp.Add("key", "f_ljqf");
                            temp.Add("oldvalue", model_tbl_ld_khb.f_ljqf);
                            temp.Add("newvalue", (double.Parse(model_tbl_ld_khb.f_ljqf) - double.Parse(jfmodel.f_cbyslj)).ToString());
                            temp.Add("name", "累计欠费");
                            array.Add(temp);
                        }


                        #endregion
                        sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", jfmodel.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, "", null);
                        #endregion
                        //缴费成功
                        resultDic["result"] = "true";
                        resultDic["message"] = jfbhid;
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "传入缴费金额"+payAmount+"与该用户实际欠费金额"+bqje+"不符";
                    }

                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "传入错误的客户编号"+khbh;

                }
            }
            catch (System.Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = "程序异常" + ex.ToString();
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
    }
}
