using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace sara.dd.actionwx.ld.service
{
    /// <summary>
    /// service_tbl_wx_jhresponse 的摘要说明
    /// </summary>
    public class service_tbl_wx_jhresponse : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Stream s = System.Web.HttpContext.Current.Request.InputStream;
            byte[] b = new byte[s.Length];
            s.Read(b, 0, (int)s.Length);
            string message = UTF8Encoding.UTF8.GetString(b);
            message = message.Replace("\n", "").Replace("\r", "").Replace(" ", "");
            message = System.Web.HttpUtility.UrlDecode(message, System.Text.Encoding.UTF8);
            message = message.Replace("RSASignData=", "");
            com.bocom.pay.BocomClient client = new com.bocom.pay.BocomClient();
            client.initialize(Eva.Library.Global.AppRootPath + "bocommjava/ini/BocompayMerchant.xml");
            string xmlstr = client.AttachedVerify(message);

            sara.dd.actionwx.ld.commonclass.ioclass.writeLog(System.DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "--" + xmlstr, "pay");

            
            if (xmlstr != null && xmlstr != "")
            {
                //解析xml文件
                xmlstr = xmlstr.TrimEnd('0');
                XmlDocument document = new XmlDocument();
                document.LoadXml(xmlstr);
                //商户订单号
                string out_trade_no = document.GetElementsByTagName("MerTranNo")[0].InnerText;
                //交行流水号
                string MerPtcId = document.GetElementsByTagName("MerPtcId")[0].InnerText;
                //交易结果
                string TranState = document.GetElementsByTagName("TranState")[0].InnerText;


                #region 收入记录update
                sara.dd.actionwx.ld.idal.Itbl_wx_srjl dal = sara.dd.actionwx.ld.commonclass.dalfactory.Create<sara.dd.actionwx.ld.idal.Itbl_wx_srjl>();
                List<sara.dd.actionwx.ld.model.tbl_wx_srjl> modellist = dal.GetList(" f_out_trade_no = '" + out_trade_no + "'", "", "*", "", "", null);
                if (modellist.Count == 1)
                {
                    sara.dd.actionwx.ld.model.tbl_wx_srjl model = modellist[0];
                    string gsgsid = model.f_gsgsid;
                    string khbh = model.f_khbh;

                    
                        #region  计算广告

                        try
                        {
                            //获取累计欠费
                            sara.dd.actionwx.ld.idal.Itbl_wx_khb dal_tbl_wx_khb = sara.dd.actionwx.ld.commonclass.dalfactory.Create<sara.dd.actionwx.ld.idal.Itbl_wx_khb>();
                            List<sara.dd.actionwx.ld.model.tbl_wx_khb> khbmodellist = dal_tbl_wx_khb.GetList("sys_id='" + model.f_khid + "' and f_ztid='0'", "", "*", "", "", null);
                            //获取f_value1,f_value2,f_value3的值
                            sara.dd.actionwx.ld.idal.Itbl_wx_yhb dal_tbl_wx_yhb = sara.dd.actionwx.ld.commonclass.dalfactory.Create<sara.dd.actionwx.ld.idal.Itbl_wx_yhb>();
                            List<sara.dd.actionwx.ld.model.tbl_wx_yhb> yhbmodellist = dal_tbl_wx_yhb.GetList("sys_id='" + model.f_uid + "' and f_ztid='0'", "", "*", "", "", null);
                            if (khbmodellist.Count == 1 && yhbmodellist.Count == 1)
                            {
                                sara.dd.actionwx.ld.model.tbl_wx_khb khbmodel = khbmodellist[0];
                                string ljqf = khbmodel.f_ljqf;
                                sara.dd.actionwx.ld.model.tbl_wx_yhb yhbmodel = yhbmodellist[0];



                                #region 根据缴费金额、累计欠费判断用户分类（预存性、节水型）

                                string yhfl = "";
                                string yhflid = "";


                                if (yhbmodel.f_value3 == null || yhbmodel.f_value3 == "")
                                {
                                    yhbmodel.f_value3 = "0";
                                }

                                int value3 = int.Parse(yhbmodel.f_value3);


                                if (Eva.Library.Text.NumberTool.Parse(ljqf) == 0 && Eva.Library.Text.NumberTool.Parse(model.f_czje) > 0)
                                {
                                    value3 = value3 + 1;
                                }
                                else
                                {
                                    value3 = value3 - 1;
                                }

                                if (value3 > 0)
                                {
                                    yhfl = "预存型用户";
                                    yhflid = "04980002";
                                }
                                else if (value3 <= 0)
                                {
                                    yhfl = "节水型用户";
                                    yhflid = "04980001";
                                }
                                #endregion


                                #region 用户分类
                                string value1 = yhbmodel.f_value1.TrimEnd(',') + ",";
                                string value2 = yhbmodel.f_value2.TrimEnd(',') + ",";

                                if (yhfl == "预存型用户")
                                {
                                    value1 = value1.Replace("节水型用户,", "");
                                    value1 = value1.Replace("预存型用户,", "");

                                    value1 += yhfl + ",";
                                }
                                else if (yhfl == "节俭型用户")
                                {
                                    value1 = value1.Replace("预存型用户,", "");
                                    value1 = value1.Replace("节俭型用户,", "");

                                    value1 += yhfl + ",";
                                }
                                if (yhflid == "04980001")
                                {
                                    value2 = value2.Replace("04980002,", "");
                                    value2 = value2.Replace("04980001,", "");

                                    value2 += yhflid + ",";
                                }
                                else if (yhflid == "04980002")
                                {
                                    value2 = value2.Replace("04980001,", "");
                                    value2 = value2.Replace("04980002,", "");

                                    value2 += yhflid + ",";
                                }
                                #endregion

                                value1 = value1.TrimStart(',');
                                value1 = value1.TrimEnd(',');
                                value2 = value2.TrimStart(',');
                                value2 = value2.TrimEnd(',');

                                yhbmodel.f_value1 = value1;
                                yhbmodel.f_value2 = value2;
                                yhbmodel.f_value3 = value3.ToString();
                                dal_tbl_wx_yhb.Update(yhbmodel, "f_value1,f_value2,f_value3", null);

                            }
                        }
                        catch (Exception ex)
                        {

                        }

                        #endregion
                        //0微信缴费发起
                        //1微信缴费成功
                        //2微信缴费失败


                        //5外系统销账成功
                        //6外系统销账失败

                        #region 更新数据库中缴费状态--微信缴费成功或者微信缴费失败
                        string columnString = "";

                    //后台通知
                    //<? xml version = '1.0' encoding = 'UTF-8' ?>< Document >< Head >< TranCode > MAPIPY5196 </ TranCode >< MerPtcId > 301140853999579 </ MerPtcId >< ReqTime > 20191206110259 </ ReqTime >< Version > 1.0.20181206 </ Version ></ Head >< Body >< TranType > PAY </ TranType >< MerTranNo > 201912061102509360 </ MerTranNo >< TranState > SUCCESS </ TranState >< TranStateCode ></ TranStateCode >< TranStateMsg ></ TranStateMsg >< BatchNo > 20191206 </ BatchNo >< FinalTime > 20191206110239 </ FinalTime >< Amount > 0.01 </ Amount >< Currency > CNY </ Currency >< TranContent > aaa </ TranContent >< MerMemo > bbb </ MerMemo ></ Body ></ Document >


                    model.f_result_code = TranState;
                    columnString += "f_result_code,";

                    model.f_transaction_id = MerPtcId;
                        columnString += "f_transaction_id,";

                        if (model.f_result_code == "SUCCESS")
                        {
                            model.f_zt = "微信缴费成功";
                            columnString += "f_zt,";
                            model.f_ztid = "1";
                            columnString += "f_ztid,";
                        }
                        else
                        {
                            model.f_zt = "微信缴费失败";
                            columnString += "f_zt,";
                            model.f_ztid = "2";
                            columnString += "f_ztid,";
                        }
                        dal.Update(model, columnString.TrimEnd(','), null);
                    #endregion

                    #region 销账
                    if (model.f_ztid == "1")//(最新逻辑：如果状态是微信缴费成功，调用业务销账系统)
                        {

                        #region 通知龙达销账
                        Dictionary<string, string> result_commit_Dic = sara.dd.actionwx.ld.commonclass.ysadapter.commitYsxt(model);

                            columnString = "";
                            if (result_commit_Dic["result"] == "true")
                            {
                                model.f_zt = "完结";
                                columnString += "f_zt,";
                                model.f_ztid = "5";
                                columnString += "f_ztid,";
                                model.f_value3 = result_commit_Dic["message"].ToString();
                                columnString += "f_value3,";

                            }
                            else
                            {
                                int i = 0;
                                string resultcommit = "";
                                string messagecommit = "";
                                do

                                {

                                    Dictionary<string, string> resultcommit_Dic = sara.dd.actionwx.ld.commonclass.ysadapter.commitYsxt(model);
                                    resultcommit = resultcommit_Dic["result"];
                                    messagecommit = resultcommit_Dic["message"];
                                    i = i + 1;
                                }

                                while (resultcommit == "false" && i < 6);
                                if (resultcommit == "true")
                                {
                                    model.f_zt = "完结";
                                    columnString += "f_zt,";
                                    model.f_ztid = "5";
                                    columnString += "f_ztid,";
                                    model.f_value3 = messagecommit;
                                    columnString += "f_value3,";
                                }
                                else
                                {
                                    model.f_zt = "外系统销账失败";
                                    columnString += "f_zt,";
                                    model.f_ztid = "6";
                                    columnString += "f_ztid,";
                                }
                            }
                            
                            dal.Update(model, columnString.TrimEnd(','), null);
                        #endregion
                        #region 发送缴费成功的消息（不管是否记账成功 销账成功 应该均发消息）
                        try
                        {
                            //to-do
                                //Eva.Library.Data.AccessData.IAccessData _iAccessData = sara.dd.actionwx.ld.commonclass.commonclass.CreateIAccessData();
                                //string jfhburl = "";
                                //string bzstr = "";

                                ////客户编号、充值金额

                                //DataTable jfhb_dt = _iAccessData.Query(sql).Tables[0];
                                //if (jfhb_dt.Rows.Count == 1)
                                //{
                                //    jfhburl = jfhb_dt.Rows[0]["f_ycxlqlj"].ToString();
                                //    bzstr = jfhb_dt.Rows[0]["f_fsnr"].ToString(); ;
                                //}
                                //else
                                //{
                                //    jfhburl = "";
                                //    bzstr = "您可以到缴费记录查看更多信息!";
                                //}

                                //try
                                //{
                                //    sara.dd.actionwx.ld.commonclass.wxclass wxclass = new sara.dd.actionwx.ld.commonclass.wxclass();
                                //    string sendResult = wxclass.sendTemplateMessage(model.f_openid, jfhburl, "你的订单已缴费成功", model.f_gsgs, model.f_khmc, model.f_time_end.ToString("yyyy-MM-dd HH:mm:ss"), model.f_total_fee.ToString(), bzstr, "x-ghXIJfEn4UE97u8MIVIdpV7ebOKBAG99B-vYi1hTg");
                                //}

                                //catch (Exception ex)
                                //{
                                //}
                                //if (jfhb_dt.Rows.Count == 1)
                                //{
                                //    string updatesql = "update tbl_wx_jfhb set f_ztid='04990002',f_zt='发送',f_fssj=to_date('" + DateTime.Now + "','yyyy-MM-dd hh24:mi:ss'),f_fsrmc='" + model.f_uname + "',f_fsrid='" + model.f_uid + "',f_openid='" + model.f_openid + "' where sys_id='" + jfhb_dt.Rows[0]["sys_id"] + "'";
                                //    _iAccessData.ExecuteSql(updatesql);
                                //}
                            }
                            catch (Exception ex)
                            {
                            }
                            #endregion
                        }

                    #endregion
                                     


                    #region 报文响应成功
                    DateTime dt = DateTime.Now;
                    string rsptime = dt.ToString("yyyyMMddHHmmss");

                    //证书号
                    string certid = Eva.Library.Configuration.ConfigurationManager.AppSettings["certid"].ToString();

                    string responsestr = "<?xml version='1.0' encoding='UTF-8'?><Document><Head><RspType>NORMAL</RspType><RspCode>MAPIPY0000</RspCode><RspMsg>交易成功</RspMsg><RspTime>" + rsptime + "</RspTime></Head><Body><MerTranNo>" + out_trade_no + "</MerTranNo></Body></Document>";
                    string rsasign = client.AttachedSign(certid, responsestr);
                    //rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);
                    //StringBuilder builder = new StringBuilder();
                    //builder.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                    context.Response.ContentType = "text/plain";
                    //context.Response.ContentType = "text/xml";
                    context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
                    context.Response.Charset = "UTF-8";
                    context.Response.Write(rsasign);
                    #endregion
                }
                else
                {

                    #region 报文响应失败
                    DateTime dt = DateTime.Now;
                    string rsptime = dt.ToString("yyyyMMddHHmmss");

                    //证书号
                    string certid = Eva.Library.Configuration.ConfigurationManager.AppSettings["certid"].ToString();

                    string responsestr = "<?xml version='1.0' encoding='UTF-8'?><Document><Head><RspType>ERROR</RspType><RspCode>MAPIPY0000</RspCode><RspMsg>交易失败</RspMsg><RspTime>" + rsptime + "</RspTime></Head><Body><MerTranNo>" + out_trade_no + "</MerTranNo></Body></Document>";
                    string rsasign = client.AttachedSign(certid, responsestr);
                    //rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);
                    //StringBuilder builder = new StringBuilder();
                    //builder.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
                    context.Response.ContentType = "text/plain";
                    //context.Response.ContentType = "text/xml";
                    context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
                    context.Response.Charset = "UTF-8";
                    context.Response.Write(rsasign);
                    #endregion
                }
                #endregion


               

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