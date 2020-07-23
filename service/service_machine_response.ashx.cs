using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_machine_response 的摘要说明
    /// </summary>
    public class service_machine_response : IHttpHandler
    {
        //<?xml version = '1.0' encoding='UTF-8'?><Document><Head><TranCode>MAPIPY5196</TranCode><MerPtcId>301120049009501</MerPtcId><ReqTime>20200527111603</ReqTime><Version>1.0.20181206</Version></Head><Body><TranType>PAY</TranType><MerTranNo>202005271115468380</MerTranNo><TranState>SUCCESS</TranState><TranStateCode></TranStateCode><TranStateMsg></TranStateMsg><BatchNo>20200527</BatchNo><FinalTime>20200527111602</FinalTime><Amount>0.01</Amount><Currency>CNY</Currency><TranContent>0000108096</TranContent><MerMemo></MerMemo></Body></Document>
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                Stream s = System.Web.HttpContext.Current.Request.InputStream;
                byte[] b = new byte[s.Length];
                s.Read(b, 0, (int)s.Length);
                string message = UTF8Encoding.UTF8.GetString(b);
                message = message.Replace(" ", "").Replace("\n", "").Replace("\r", "").Replace(" ", "");
                message = System.Web.HttpUtility.UrlDecode(message, System.Text.Encoding.UTF8);
                message = message.Replace("RSASignData=", "");
                com.bocom.pay.BocomClient client = new com.bocom.pay.BocomClient();
                client.initialize(Eva.Library.Global.AppRootPath + "bocommjava/ini/BocompayMerchant.xml");
                string xmlstr = client.AttachedVerify(message);
                string MerTranNo = "";
                string khbh = "";
                string amount = "";
                string result = "";
                if (xmlstr != null && xmlstr != "")
                {
                    xmlstr = xmlstr.TrimEnd('0');
                    XmlDocument document = new XmlDocument();
                    document.LoadXml(xmlstr);
                    khbh = document.GetElementsByTagName("TranContent")[0].InnerText;
                    MerTranNo = document.GetElementsByTagName("MerTranNo")[0].InnerText;
                    amount = document.GetElementsByTagName("Amount")[0].InnerText;
                    result = document.GetElementsByTagName("TranState")[0].InnerText;

                    if (result == "SUCCESS")
                    {
                        sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                        sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
                        _iAccessDataTrans = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                        _iAccessDataTrans.getTrans().begin();
                        //获取客户model
                        List<sara.dd.ldsw.model.tbl_ld_khb> khmodellist = idal_tbl_ld_khb.GetList(" f_khbh='" + khbh + "'", " sys_id desc", "*", "", "", _iAccessDataTrans);
                        if (khmodellist.Count == 1)
                        {
                            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = khmodellist[0];
                            //累计欠费
                            double ljqf = 0;
                            if(model_tbl_ld_khb.f_ljqf != null && model_tbl_ld_khb.f_ljqf != "")
                            {
                                ljqf = Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf);
                            }
                            else
                            {
                                ljqf = 0;
                            }
                            //判断客户是否存在欠费
                            if (ljqf > 0)
                            {
                                //存在欠费
                                //查询该用户未缴费的抄表记录
                                string add_sqlStr = "sum(f_dyjtsl) as f_dyjtsl ,sum(f_dyjtsf) as f_dyjtsf ,sum(f_dejtsl) as f_dejtsl ,sum(f_dejtsf) as f_dejtsf ,sum(f_dsjtsl) as f_dsjtsl ,sum(f_dsjtsf) as f_dsjtsf ";
                                DataTable dt = _iAccessDataTrans.Query("select wm_concat(sys_id) as sys_id,wm_concat(f_cb_cbbh) as f_cbbh,sum(f_bqje) as f_bqje,sum(f_bqsl) as f_bqsl,sum(f_sf) as f_sf,sum(f_pwf) as f_pwf,f_yhm,REPLACE(wm_concat(f_sfjl),',','|') as f_sfjl ," + add_sqlStr + " from TBL_LD_CBIAO where f_khbh='" + khbh + "' and f_ztid='2' group by f_yhm").Tables[0];

                                //DataTable ye_dt = _iAccessDataTrans.Query("select NVL(f_ye,0) as f_ye from TBL_LD_KHB where f_khbh='" + khbh + "'").Tables[0];
                                //double ye = Eva.Library.Text.NumberTool.Parse(ye_dt.Rows[0]["f_ye"].ToString());
                                double bqje = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_bqje"].ToString());
                                double bqsl = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_bqsl"].ToString());
                                double sf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_sf"].ToString());
                                double pwf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_pwf"].ToString());
                                double f_dyjtsl = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_dyjtsl"].ToString());
                                double f_dyjtsf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_dyjtsf"].ToString());
                                double f_dejtsl = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_dejtsl"].ToString());
                                double f_dejtsf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_dejtsf"].ToString());
                                double f_dsjtsl = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_dsjtsl"].ToString());
                                double f_dsjtsf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_dsjtsf"].ToString());

                                if (bqje == Eva.Library.Text.NumberTool.Parse(model_tbl_ld_khb.f_ljqf))
                                {
                                    #region 创建缴费记录
                                    sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                                    DateTime currentTime = System.DateTime.Now;

                                    jfmodel.sys_creatuserid = "1571";
                                    jfmodel.sys_creatusername = "营业厅缴费机";
                                    jfmodel.sys_creatdate = currentTime;
                                    jfmodel.sys_lastedituserid = "1571";
                                    jfmodel.sys_lasteditusername = "营业厅缴费机";
                                    jfmodel.sys_lasteditdate = currentTime;
                                    jfmodel.sys_deldate = DateTime.Parse("1900-01-01");
                                    jfmodel.sys_delflag = "0";
                                    jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                                    jfmodel.f_jfrq = currentTime;
                                    jfmodel.f_jffs = "缴费机自助缴费";
                                    jfmodel.f_jffsid = "05740017";
                                    jfmodel.f_jcfs = "全额找零";
                                    jfmodel.f_jcfsid = "05750001";
                                    jfmodel.f_yyy = "营业厅缴费机";
                                    jfmodel.f_yyyid = "1571";
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
                                    //增加交行待对账标志
                                    jfmodel.f_value1 = "1";
                                    //增加交行商户订单号
                                    jfmodel.f_value2 = MerTranNo;

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
                                    //余额部分
                                    jfmodel.f_khyycje = model_tbl_ld_khb.f_ye;
                                    if (Eva.Library.Text.NumberTool.Parse(jfmodel.f_khyycje) >= Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj))
                                    {
                                        jfmodel.f_syycje = jfmodel.f_cbyslj;
                                    }
                                    else
                                    {
                                        jfmodel.f_syycje = jfmodel.f_khyycje;
                                    }
                                    //是否使用预存金额
                                    if (Eva.Library.Text.NumberTool.Parse(jfmodel.f_syycje) > 0)
                                    {
                                        jfmodel.f_sfsyycje = "true";
                                    }
                                    else
                                    {
                                        jfmodel.f_sfsyycje = "false";
                                    }




                                    jfmodel.f_shys = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_syycje)), 2);
                                    jfmodel.f_shss = Eva.Library.Text.NumberTool.GetNumberByLength(amount, 2);

                                    //多收转预存金额
                                    jfmodel.f_dszycje = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(jfmodel.f_shss) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_shys)), 2);

                                    //用后预存金额
                                    jfmodel.f_yhycje = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(jfmodel.f_khyycje) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_syycje) + Eva.Library.Text.NumberTool.Parse(jfmodel.f_dszycje)), 2);
                                    jfmodel.f_hszl = "0";
                                    jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(jfmodel.f_shss)));
                                    jfmodel.f_khfz = model_tbl_ld_khb.f_khfz;
                                    jfmodel.f_khfzid = model_tbl_ld_khb.f_khfzid;
                                    jfmodel.f_cbenbh = model_tbl_ld_khb.f_cbbh;
                                    jfmodel.f_cbenbhid = model_tbl_ld_khb.f_cbbhid;
                                    jfmodel.f_ljqf = model_tbl_ld_khb.f_ljqf;
                                    jfmodel.f_jmjelj = "0";
                                    jfmodel.f_ly = "缴费机";
                                    jfmodel.f_lyid = "08080010";


                                    jfmodel.f_sfjl = dt.Rows[0]["f_sfjl"].ToString();

                                    jfmodel.f_dyjtsl = Eva.Library.Text.NumberTool.GetNumberByLength(f_dyjtsl, 2);
                                    jfmodel.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(f_dyjtsf, 2);
                                    jfmodel.f_dejtsl = Eva.Library.Text.NumberTool.GetNumberByLength(f_dejtsl, 2);
                                    jfmodel.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength(f_dejtsf, 2);
                                    jfmodel.f_dsjtsl = Eva.Library.Text.NumberTool.GetNumberByLength(f_dsjtsl, 2);
                                    jfmodel.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(f_dsjtsf, 2);

                                    string jfbhid = idal_tbl_ld_jfb.Add(jfmodel, _iAccessDataTrans);
                                    #endregion


                                    //更新抄表表
                                    string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + jfmodel.f_jfbh + "',F_JFBHID='" + jfbhid + "',F_JFSJ=to_date('" + jfmodel.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + dt.Rows[0]["sys_id"].ToString() + ")";
                                    //更新客户表
                                    string updatekh = "update TBL_LD_KHB set F_YCJE='" + jfmodel.f_yhye + "',F_TJJZSF='" + jfmodel.f_syhtjjzsf + "',F_TJJZPWF='" + jfmodel.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + jfmodel.f_cbyslj + ",f_ye = '" + jfmodel.f_yhycje + "' where sys_id='" + jfmodel.f_khbhid + "'";

                                    int flag_cb = _iAccessDataTrans.ExecuteSql(updatecb);
                                    int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);



                                    //写入客户表日志
                                    #region 写入日志
                                    List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                    IDictionary<string, string> temp = null;
                                    #region 对比各个业务子段，将不同的写入array
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
                                    sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", jfmodel.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, "", _iAccessDataTrans);
                                    #endregion

                                    _iAccessDataTrans.getTrans().commit();
                                }
                                else
                                {
                                    _iAccessDataTrans.getTrans().rollback();

                                }
                            }
                            else
                            {
                                //不存在欠费
                                #region 创建缴费记录
                                sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                                DateTime currentTime = System.DateTime.Now;

                                jfmodel.sys_creatuserid = "1571";
                                jfmodel.sys_creatusername = "营业厅缴费机";
                                jfmodel.sys_creatdate = currentTime;
                                jfmodel.sys_lastedituserid = "1571";
                                jfmodel.sys_lasteditusername = "营业厅缴费机";
                                jfmodel.sys_lasteditdate = currentTime;
                                jfmodel.sys_deldate = DateTime.Parse("1900-01-01");
                                jfmodel.sys_delflag = "0";
                                jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                                jfmodel.f_jfrq = currentTime;
                                jfmodel.f_jffs = "缴费机自助缴费";
                                jfmodel.f_jffsid = "05740017";
                                jfmodel.f_jcfs = "全额找零";
                                jfmodel.f_jcfsid = "05750001";
                                jfmodel.f_yyy = "营业厅缴费机";
                                jfmodel.f_yyyid = "1571";
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
                                //增加交行待对账标志
                                jfmodel.f_value1 = "1";
                                //增加交行商户订单号
                                jfmodel.f_value2 = MerTranNo;
                                jfmodel.f_cbbh = "";
                                jfmodel.f_cbbhid = "";
                                jfmodel.f_cbyslj = "0";
                                jfmodel.f_sllj = "0";
                                jfmodel.f_sflj = "0";
                                jfmodel.f_pwflj = "0";
                                jfmodel.f_dj = "0";
                                jfmodel.f_jmhyslj = "0";
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
                                //余额部分
                                jfmodel.f_khyycje = model_tbl_ld_khb.f_ye;
                                if (Eva.Library.Text.NumberTool.Parse(jfmodel.f_khyycje) >= Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj))
                                {
                                    jfmodel.f_syycje = jfmodel.f_cbyslj;
                                }
                                else
                                {
                                    jfmodel.f_syycje = jfmodel.f_khyycje;
                                }
                                //是否使用预存金额
                                if (Eva.Library.Text.NumberTool.Parse(jfmodel.f_syycje) > 0)
                                {
                                    jfmodel.f_sfsyycje = "true";
                                }
                                else
                                {
                                    jfmodel.f_sfsyycje = "false";
                                }




                                jfmodel.f_shys = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(jfmodel.f_cbyslj) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_syycje)), 2);
                                jfmodel.f_shss = Eva.Library.Text.NumberTool.GetNumberByLength(amount, 2);

                                //多收转预存金额
                                jfmodel.f_dszycje = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(jfmodel.f_shss) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_shys)), 2);

                                //用后预存金额
                                jfmodel.f_yhycje = Eva.Library.Text.NumberTool.GetNumberByLength((Eva.Library.Text.NumberTool.Parse(jfmodel.f_khyycje) - Eva.Library.Text.NumberTool.Parse(jfmodel.f_syycje) + Eva.Library.Text.NumberTool.Parse(jfmodel.f_dszycje)), 2);
                                jfmodel.f_hszl = "0";
                                jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(jfmodel.f_shss)));
                                jfmodel.f_khfz = model_tbl_ld_khb.f_khfz;
                                jfmodel.f_khfzid = model_tbl_ld_khb.f_khfzid;
                                jfmodel.f_cbenbh = model_tbl_ld_khb.f_cbbh;
                                jfmodel.f_cbenbhid = model_tbl_ld_khb.f_cbbhid;
                                jfmodel.f_ljqf = model_tbl_ld_khb.f_ljqf;
                                jfmodel.f_jmjelj = "0";
                                jfmodel.f_ly = "缴费机";
                                jfmodel.f_lyid = "08080010";


                                jfmodel.f_sfjl = "";

                                jfmodel.f_dyjtsl = Eva.Library.Text.NumberTool.GetNumberByLength("0", 2);
                                jfmodel.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength("0", 2);
                                jfmodel.f_dejtsl = Eva.Library.Text.NumberTool.GetNumberByLength("0", 2);
                                jfmodel.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength("0", 2);
                                jfmodel.f_dsjtsl = Eva.Library.Text.NumberTool.GetNumberByLength("0", 2);
                                jfmodel.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength("0", 2);

                                string jfbhid = idal_tbl_ld_jfb.Add(jfmodel, _iAccessDataTrans);
                                #endregion

                                //更新客户表
                                string updatekh = "update TBL_LD_KHB set F_YCJE='" + jfmodel.f_yhye + "',F_TJJZSF='" + jfmodel.f_syhtjjzsf + "',F_TJJZPWF='" + jfmodel.f_syhtjjzpwf + "',F_LJQF=nvl(F_LJQF,'0')-" + jfmodel.f_cbyslj + ",f_ye = '" + jfmodel.f_yhycje + "' where sys_id='" + jfmodel.f_khbhid + "'";


                                int flag_kh = _iAccessDataTrans.ExecuteSql(updatekh);



                                //写入客户表日志
                                #region 写入日志
                                List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();
                                IDictionary<string, string> temp = null;
                                #region 对比各个业务子段，将不同的写入array
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
                                sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", jfmodel.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, "", _iAccessDataTrans);
                                #endregion
                                //缴费成功
                                _iAccessDataTrans.getTrans().commit();
                            }
                        }
                    }
                }

                DateTime now = DateTime.Now;
                //证书号
                string certid = Eva.Library.Configuration.ConfigurationManager.AppSettings["certid"].ToString();
                string rsptime = now.ToString("yyyyMMddHHmmss");
                string responsestr = "<?xml version='1.0' encoding='UTF-8'?><Document><Head><RspType>NORMAL</RspType><RspCode>MAPIPY0000</RspCode><RspMsg>交易成功</RspMsg><RspTime>" + rsptime + "</RspTime></Head><Body><MerTranNo>" + MerTranNo + "</MerTranNo></Body></Document>";
                string rsasign = client.AttachedSign(certid, responsestr);
                //rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);
                //StringBuilder builder = new StringBuilder();
                //builder.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                context.Response.ContentType = "text/plain";
                //context.Response.ContentType = "text/xml";
                context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
                context.Response.Charset = "UTF-8";
                context.Response.Write(rsasign);
            }
            catch (System.Exception ex)
            {
                if (_iAccessDataTrans != null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }

            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}