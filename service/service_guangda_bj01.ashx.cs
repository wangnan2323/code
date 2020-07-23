using System;
using System.Collections.Generic;
using System.Collections.Specialized;
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
    /// service_guangda_bj01 的摘要说明
    /// </summary>
    public class service_guangda_bj01 : IHttpHandler
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        public void ProcessRequest(HttpContext context)
        {

            try
            {
                //string method = System.Web.HttpContext.Current.Request.HttpMethod;
                //string type = System.Web.HttpContext.Current.Request.RequestType;

                //NameValueCollection nvc =  System.Web.HttpContext.Current.Request.Params;
                //string[] paramss = nvc.AllKeys;
                Stream s = System.Web.HttpContext.Current.Request.InputStream;
                byte[] b = new byte[s.Length];
                s.Read(b, 0, (int)s.Length);
                //string xmlstr = UTF8Encoding.UTF8.GetString(b);
                string xmlstr = System.Text.Encoding.GetEncoding("gbk").GetString(b);
                if (xmlstr != null && xmlstr != "")
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
                    //客户编号
                    string billKey = "";
                    ////起始笔数
                    //string beginNum = "";
                    ////查询笔数
                    //string queryNum = "";

                    FTranCode = document.GetElementsByTagName("FTranCode")[0].InnerText;
                    InstID = document.GetElementsByTagName("InstID")[0].InnerText;
                    TranDateTime = document.GetElementsByTagName("TranDateTime")[0].InnerText;
                    BankNum = document.GetElementsByTagName("BankNum")[0].InnerText;
                    billKey = document.GetElementsByTagName("billKey")[0].InnerText;
                    //beginNum = document.GetElementsByTagName("beginNum")[0].InnerText;
                    //queryNum = document.GetElementsByTagName("queryNum")[0].InnerText;

                    _iAccessData = commonclass.commonclass.CreateIAccessData();

                    //DataTable khdt = _iAccessData.Query("SELECT * FROM TBL_LD_KHB WHERE F_KHBH='" + billKey + "' and f_cbbh not like 'PZ%' and f_cbbh not like 'YC%'").Tables[0];
                    DataTable khdt = _iAccessData.Query("SELECT * FROM TBL_LD_KHB WHERE F_KHBH='" + billKey + "'").Tables[0];
                    if (billKey.Length == 10 && khdt.Rows.Count == 1)
                    {
                        
                        DataRow khdr = khdt.Rows[0];
                        //判断是否在代扣中并判断是否存在疫情减免
                        if((khdr["f_value5"] != null && khdr["f_value5"].ToString() != "")||(khdr["f_yqjmsf"] != null && khdr["f_yqjmsf"].ToString() != "" && khdr["f_yqjmsf"].ToString() != "0") || (khdr["f_yqjmpwf"] != null && khdr["f_yqjmpwf"].ToString() != "" && khdr["f_yqjmpwf"].ToString() != "0"))
                        {
                            //代扣中返回错误报文

                            string errxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                            errxml += "<Out>";
                            errxml += "<Head>";
                            errxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                            errxml += "<InstID>" + InstID + "</InstID>";
                            errxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                            errxml += "<BankNum>" + BankNum + "</BankNum>";
                            errxml += "<AnsCode>ERR0000</AnsCode>";
                            errxml += "</Head>";
                            errxml += "<Body>";
                            errxml += "<ErrorCode>DEF0018</ErrorCode>";
                            errxml += "<ErrorInfo></ErrorInfo>";
                            errxml += "</Body>";
                            errxml += "</Out>";

                            context.Response.ContentType = "text/xml";
                            context.Response.Charset = "gbk";
                            context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                            context.Response.Write(errxml);
                        }
                        else
                        {
                            bool flag = true;
                            //判断大用户超过两期未缴费
                            if (khdr["f_khfz"].ToString().Contains("大用户"))
                            {
                                DataTable cbdt = _iAccessData.Query("SELECT * FROM TBL_LD_CBIAO WHERE F_KHBH='" + billKey + "' AND F_ZTID='2' and f_cbsj < ADD_MONTHS(sysdate,-2)").Tables[0];

                                if (cbdt.Rows.Count > 0)
                                {
                                    //代扣中返回错误报文

                                    string errxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                                    errxml += "<Out>";
                                    errxml += "<Head>";
                                    errxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                                    errxml += "<InstID>" + InstID + "</InstID>";
                                    errxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                                    errxml += "<BankNum>" + BankNum + "</BankNum>";
                                    errxml += "<AnsCode>ERR0000</AnsCode>";
                                    errxml += "</Head>";
                                    errxml += "<Body>";
                                    errxml += "<ErrorCode>DEF0021</ErrorCode>";
                                    errxml += "<ErrorInfo></ErrorInfo>";
                                    errxml += "</Body>";
                                    errxml += "</Out>";

                                    context.Response.ContentType = "text/xml";
                                    context.Response.Charset = "gbk";
                                    context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                                    context.Response.Write(errxml);
                                    flag = false;
                                }

                            }

                            if (flag)
                            {
                                DataTable dt = _iAccessData.Query("SELECT NVL(F_LJQF,0) as f_ljqf,f_yhm,f_hth ,f_ye,f_dz FROM TBL_LD_KHB WHERE F_KHBH='" + billKey + "'").Tables[0];
                                double ljqf = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_ljqf"].ToString());
                                double ye = Eva.Library.Text.NumberTool.Parse(dt.Rows[0]["f_ye"].ToString());
                                ljqf = ljqf - ye;
                                if (ljqf <= 0)
                                {
                                    //错误报文 用户未欠费
                                    string errxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                                    errxml += "<Out>";
                                    errxml += "<Head>";
                                    errxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                                    errxml += "<InstID>" + InstID + "</InstID>";
                                    errxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                                    errxml += "<BankNum>" + BankNum + "</BankNum>";
                                    errxml += "<AnsCode>ERR0000</AnsCode>";
                                    errxml += "</Head>";
                                    errxml += "<Body>";
                                    errxml += "<ErrorCode>DEF0002</ErrorCode>";
                                    errxml += "<ErrorInfo></ErrorInfo>";
                                    errxml += "</Body>";
                                    errxml += "</Out>";

                                    context.Response.ContentType = "text/xml";
                                    context.Response.Charset = "gbk";
                                    context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                                    context.Response.Write(errxml);
                                }
                                else
                                {
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
                                    resultxml += "<companyNo>" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + "</companyNo>";
                                    resultxml += "<billKey>" + billKey + "</billKey>";
                                    resultxml += "<item1></item1>";
                                    resultxml += "<item2></item2>";
                                    resultxml += "<item3></item3>";
                                    resultxml += "<item4></item4>";
                                    resultxml += "<item5></item5>";
                                    resultxml += "<item6></item6>";
                                    resultxml += "<item7>" + dt.Rows[0]["f_dz"] + "</item7>";
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
                                    resultxml += "<totalNum>1</totalNum>";
                                    resultxml += "<Frame>";
                                    resultxml += "<contractNo>" + dt.Rows[0]["f_hth"] + "</contractNo>";
                                    resultxml += "<customerName>" + dt.Rows[0]["f_yhm"] + "</customerName>";
                                    resultxml += "<balance>0</balance>";
                                    resultxml += "<payAmount>" + ljqf + "</payAmount>";
                                    resultxml += "<beginDate></beginDate>";
                                    resultxml += "<endDate></endDate>";
                                    resultxml += "<detailFiled1></detailFiled1>";
                                    resultxml += "<detailFiled2></detailFiled2>";
                                    resultxml += "<detailFiled3></detailFiled3>";
                                    resultxml += "<detailFiled4></detailFiled4>";
                                    resultxml += "<detailFiled5>" + dt.Rows[0]["f_dz"] + "</detailFiled5>";
                                    resultxml += "</Frame>";
                                    resultxml += "</Body>";
                                    resultxml += "</Out>";
                                    //context.Response.ContentType = "text/plain";
                                    context.Response.ContentType = "text/xml";
                                    context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gbk");
                                    context.Response.Charset = "gbk";
                                    context.Response.Write(resultxml);

                                }
                            }

                        }





                    }
                    else
                    {
                        //错误报文 错误的客户编号
                        string errxml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
                        errxml += "<Out>";
                        errxml += "<Head>";
                        errxml += "<FTranCode>" + FTranCode + "</FTranCode>";
                        errxml += "<InstID>" + InstID + "</InstID>";
                        errxml += "<TranDateTime>" + TranDateTime + "</TranDateTime>";
                        errxml += "<BankNum>" + BankNum + "</BankNum>";
                        errxml += "<AnsCode>ERR0000</AnsCode>";
                        errxml += "</Head>";
                        errxml += "<Body>";
                        errxml += "<ErrorCode>DEF0010</ErrorCode>";
                        errxml += "<ErrorInfo>错误的客户编号</ErrorInfo>";
                        errxml += "</Body>";
                        errxml += "</Out>";

                        context.Response.ContentType = "text/xml";
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
                errxml += "<AnsCode>ERR0000</AnsCode>";
                errxml += "</Head>";
                errxml += "<Body>";
                errxml += "<ErrorCode>DEF0001</ErrorCode>";
                errxml += "<ErrorInfo>" + ex.ToString() + "</ErrorInfo>";
                errxml += "</Body>";
                errxml += "</Out>";

                context.Response.ContentType = "text/xml";
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