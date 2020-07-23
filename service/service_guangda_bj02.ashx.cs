using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Xml;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_guangda_bj02 的摘要说明
    /// </summary>
    public class service_guangda_bj02 : IHttpHandler
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        public void ProcessRequest(HttpContext context)
        {

            try
            {
                Stream s = System.Web.HttpContext.Current.Request.InputStream;
                byte[] b = new byte[s.Length];
                s.Read(b, 0, (int)s.Length);
                //string xmlstr = UTF8Encoding.UTF8.GetString(b);
                string xmlstr = System.Text.Encoding.GetEncoding("gbk").GetString(b);
                if(xmlstr != null && xmlstr != "")
                {
                    xmlstr = xmlstr.TrimEnd('0');
                    XmlDocument document = new XmlDocument();
                    document.LoadXml(xmlstr);
                    //交易码
                    string FTranCode = "";
                    //公缴单位分配机构号
                    string InstID = "";
                    //交易日期时间
                    string TranDateTime = "";
                    //银行端系统流水号
                    string BankNum = "";
                    //缴费交易日期
                    string payDate = "";
                    //缴费交易流水
                    string bankBillNo = "";
                    //客户编号
                    string billKey = "";

                    //客户姓名
                    string customerName = "";
                    //缴费金额
                    string payAmount = "";

                    ////起始笔数
                    //string beginNum = "";
                    ////查询笔数
                    //string queryNum = "";

                    FTranCode = document.GetElementsByTagName("FTranCode")[0].InnerText;
                    InstID = document.GetElementsByTagName("InstID")[0].InnerText;
                    TranDateTime = document.GetElementsByTagName("TranDateTime")[0].InnerText;
                    BankNum = document.GetElementsByTagName("BankNum")[0].InnerText;
                    payDate = document.GetElementsByTagName("payDate")[0].InnerText;
                    bankBillNo = document.GetElementsByTagName("bankBillNo")[0].InnerText;
                    billKey = document.GetElementsByTagName("billKey")[0].InnerText;
                    customerName = document.GetElementsByTagName("customerName")[0].InnerText;
                    payAmount = document.GetElementsByTagName("payAmount")[0].InnerText;
                    //beginNum = document.GetElementsByTagName("beginNum")[0].InnerText;
                    //queryNum = document.GetElementsByTagName("queryNum")[0].InnerText;

                    _iAccessData = commonclass.commonclass.CreateIAccessData();

                    if(billKey.Length == 10)
                    {
                        //查询该用户未缴费的抄表记录
                        string add_sqlStr = "sum(f_dyjtsl) as f_dyjtsl ,sum(f_dyjtsf) as f_dyjtsf ,sum(f_dejtsl) as f_dejtsl ,sum(f_dejtsf) as f_dejtsf ,sum(f_dsjtsl) as f_dsjtsl ,sum(f_dsjtsf) as f_dsjtsf ";
                        DataTable dt = _iAccessData.Query("select wm_concat(sys_id) as sys_id,wm_concat(f_cb_cbbh) as f_cbbh,sum(f_bqje) as f_bqje,sum(f_bqsl) as f_bqsl,sum(f_sf) as f_sf,sum(f_pwf) as f_pwf,f_yhm,REPLACE(wm_concat(f_sfjl),',','|') as f_sfjl , "+ add_sqlStr + " from TBL_LD_CBIAO where f_khbh='" + billKey+ "' and f_ztid='2' and f_cbbh not like 'PZ%' and f_cbbh not like 'YC%' group by f_yhm").Tables[0];

                        DataTable ye_dt = _iAccessData.Query("select NVL(f_ye,0) as f_ye from TBL_LD_KHB where f_khbh='" + billKey + "'").Tables[0];
                        double ye = Eva.Library.Text.NumberTool.Parse(ye_dt.Rows[0]["f_ye"].ToString());
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

                        //核实缴费信息正确性
                        if (customerName.Trim() == dt.Rows[0]["f_yhm"].ToString() && (Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_bqje"].ToString())- ye) == Eva.Library.Text.NumberTool.Parse(payAmount))
                        {
                            //客户信息
                            sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
                            sara.dd.ldsw.idal.Itbl_ld_jfb idal_tbl_ld_jfb = new sara.dd.ldsw.dal.tbl_ld_jfb();
                            sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = idal_tbl_ld_khb.GetList("f_khbh='" + billKey + "'", "", "*", "", "", null)[0];
                            #region 创建缴费记录
                            sara.dd.ldsw.model.tbl_ld_jfb jfmodel = new model.tbl_ld_jfb();
                            DateTime currentTime = System.DateTime.Now;

                            jfmodel.sys_creatuserid = "1565";
                            jfmodel.sys_creatusername = "光大";
                            jfmodel.sys_creatdate = currentTime;
                            jfmodel.sys_lastedituserid = "1565";
                            jfmodel.sys_lasteditusername = "光大";
                            jfmodel.sys_lasteditdate = currentTime;
                            jfmodel.sys_deldate = DateTime.Parse("1900-01-01");
                            jfmodel.sys_delflag = "0";
                            jfmodel.f_jfbh = commonclass.commonclass.getBusinessNum("JF", "", null);
                            jfmodel.f_jfrq = currentTime;
                            jfmodel.f_jffs = "光大银行网上缴费";
                            jfmodel.f_jffsid = "05740010";
                            jfmodel.f_jcfs = "全额找零";
                            jfmodel.f_jcfsid = "05750001";
                            jfmodel.f_yyy = "光大";
                            jfmodel.f_yyyid = "1565";
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
                            jfmodel.f_shys = payAmount;
                            jfmodel.f_shss = payAmount;
                            jfmodel.f_hszl = "0";
                            jfmodel.f_shssdx = sara.dd.ldsw.commonclass.commonclass.num2String((Eva.Library.Text.NumberTool.Parse(payAmount)));
                            jfmodel.f_khfz = model_tbl_ld_khb.f_khfz;
                            jfmodel.f_khfzid = model_tbl_ld_khb.f_khfzid;
                            jfmodel.f_cbenbh = model_tbl_ld_khb.f_cbbh;
                            jfmodel.f_cbenbhid = model_tbl_ld_khb.f_cbbhid;
                            jfmodel.f_ljqf = model_tbl_ld_khb.f_ljqf;
                            jfmodel.f_jmjelj = "0";
                            jfmodel.f_ly = "光大自助缴费";
                            jfmodel.f_lyid = "08080006";
                            jfmodel.f_bz = xmlstr;

                            jfmodel.f_sfjl = dt.Rows[0]["f_sfjl"].ToString();

                            jfmodel.f_dyjtsl = Eva.Library.Text.NumberTool.GetNumberByLength(f_dyjtsl, 2);
                            jfmodel.f_dyjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(f_dyjtsf, 2);
                            jfmodel.f_dejtsl = Eva.Library.Text.NumberTool.GetNumberByLength(f_dejtsl, 2);
                            jfmodel.f_dejtsf = Eva.Library.Text.NumberTool.GetNumberByLength(f_dejtsf, 2);
                            jfmodel.f_dsjtsl = Eva.Library.Text.NumberTool.GetNumberByLength(f_dsjtsl, 2);
                            jfmodel.f_dsjtsf = Eva.Library.Text.NumberTool.GetNumberByLength(f_dsjtsf, 2);
                            jfmodel.f_khyycje = model_tbl_ld_khb.f_ye;
                            if ( ye > 0)
                            {
                                jfmodel.f_sfsyycje = "true";
                                jfmodel.f_syycje = model_tbl_ld_khb.f_ye;
                            }
                            else
                            {
                                jfmodel.f_sfsyycje = "false";
                                jfmodel.f_syycje = "0";
                            }
                            jfmodel.f_yhycje = "0";
                            jfmodel.f_dszycje = "0";
                            string jfbhid = idal_tbl_ld_jfb.Add(jfmodel, null);
                            #endregion


                            //更新抄表表
                            string updatecb = "update TBL_LD_CBIAO set F_ZT='已缴费',F_ZTID='3',F_JFBH='" + jfmodel.f_jfbh + "',F_JFBHID='" + jfbhid + "',F_JFSJ=to_date('" + jfmodel.f_jfrq + "','yyyy-MM-dd hh24:mi:ss') where SYS_ID in (" + dt.Rows[0]["sys_id"].ToString() + ")";
                            //更新客户表
                            string updatekh = "update TBL_LD_KHB set F_YCJE='" + jfmodel.f_yhye + "',F_TJJZSF='" + jfmodel.f_syhtjjzsf + "',F_TJJZPWF='" + jfmodel.f_syhtjjzpwf + "',F_LJQF= '0' ,f_ye = '"+ jfmodel.f_yhycje+ "' where sys_id='" + jfmodel.f_khbhid + "'";

                            int flag_cb = _iAccessData.ExecuteSql(updatecb);
                            int flag_kh = _iAccessData.ExecuteSql(updatekh);



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
                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", jfmodel.f_khbhid.ToString(), "tbl_ld_jfb_detail", "缴费表", array, "", null);
                            #endregion

                            #region 应答报文
                            string resultxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                            resultxml += "<Out>";
                            resultxml += "<Head>";
                            resultxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                            resultxml += "<InstID>" + InstID + "</InstID>";
                            resultxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                            resultxml += "<BankNum>" + BankNum + "</BankNum>";
                            resultxml += "<AnsCode>AAAAAAA</AnsCode>";
                            resultxml += "</Head>";
                            resultxml += "<Body>";
                            resultxml += "<companyNo>" + jfmodel.f_jfbh + "</companyNo>";
                            resultxml += "<billKey>" + billKey + "</billKey>";
                            resultxml += "<payAmount>" + payAmount + "</payAmount>";
                            resultxml += "<receiptNo></receiptNo>";
                            resultxml += "<reserve1></reserve1>";
                            resultxml += "<reserve2></reserve2>";
                            resultxml += "<reserve3></reserve3>";
                            resultxml += "<reserve4></reserve4>";
                            resultxml += "<reserve5></reserve5>";
                            resultxml += "<reserve6></reserve6>";
                            resultxml += "<reserve7></reserve7>";
                            resultxml += "<reserve8></reserve8>";
                            resultxml += "<reserve9></reserve9>";
                            resultxml += "<reserve10></reserve10>";
                            resultxml += "<reserve11></reserve11>";
                            resultxml += "<reserve12></reserve12>";
                            resultxml += "<reserve13></reserve13>";
                            resultxml += "<reserve14></reserve14>";
                            resultxml += "<reserve15></reserve15>";
                            resultxml += "<reserve16></reserve16>";
                            resultxml += "<reserve17></reserve17>";
                            resultxml += "<reserve18></reserve18>";
                            resultxml += "</Body>";
                            resultxml += "</Out>";

                            context.Response.ContentType = "text/plain";
                            context.Response.Charset = "gbk";
                            context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                            context.Response.Write(resultxml);
                            #endregion
                        }
                        else
                        {
                            //错误报文，缴费信息不一致
                            string errxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                            errxml += "<Out>";
                            errxml += "<Head>";
                            errxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                            errxml += "<InstID>" + InstID + "</InstID>";
                            errxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                            errxml += "<BankNum>" + BankNum + "</BankNum>";
                            errxml += "<AnsCode>ERR000</AnsCode>";
                            errxml += "</Head>";
                            errxml += "<Body>";
                            errxml += "<ErrorCode>DEF0013</ErrorCode>";
                            errxml += "<ErrorInfo>错误的缴费信息</ErrorInfo>";
                            errxml += "</Body>";
                            errxml += "</Out>";

                            context.Response.ContentType = "text/plain";
                            context.Response.Charset = "gbk";
                            context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                            context.Response.Write(errxml);
                        }



                    }
                    else
                    {
                        //错误报文 错误的客户编号
                       string errxml ="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                        errxml += "<Out>";
                        errxml += "<Head>";
                        errxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                        errxml += "<InstID>" + InstID + "</InstID>";
                        errxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                        errxml += "<BankNum>" + BankNum + "</BankNum>";
                        errxml += "<AnsCode>ERR000</AnsCode>";
                        errxml += "</Head>";
                        errxml += "<Body>";
                        errxml += "<ErrorCode>DEF0013</ErrorCode>";
                        errxml += "<ErrorInfo>错误的客户编号</ErrorInfo>";
                        errxml += "</Body>";
                        errxml += "</Out>";

                        context.Response.ContentType = "text/plain";
                        context.Response.Charset = "gbk";
                        context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                        context.Response.Write(errxml);

                    }


                }
            }
            catch (System.Exception ex)
            {
                //错误报文 错误的客户编号
                string errxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                errxml += "<Out>";
                errxml += "<Head>";
                errxml += "<FTranCode></FTranCode>";
                errxml += "<InstID></InstID>";
                errxml += "<TranDateTime></TranDateTime>";
                errxml += "<BankNum></BankNum>";
                errxml += "<AnsCode>ERR000</AnsCode>";
                errxml += "</Head>";
                errxml += "<Body>";
                errxml += "<ErrorCode>DEF0006</ErrorCode>";
                errxml += "<ErrorInfo>"+ex.ToString()+"</ErrorInfo>";
                errxml += "</Body>";
                errxml += "</Out>";

                context.Response.ContentType = "text/plain";
                context.Response.Charset = "gbk";
                context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                context.Response.Write(errxml);
            }







        }


        //接收XML

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}