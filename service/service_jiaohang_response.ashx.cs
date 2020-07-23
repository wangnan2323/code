using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_jiaohang_response 的摘要说明
    /// </summary>
    public class service_jiaohang_response : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
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
            if (xmlstr != null && xmlstr != "")
            {
                xmlstr = xmlstr.TrimEnd('0');
                XmlDocument document = new XmlDocument();
                document.LoadXml(xmlstr);

                MerTranNo = document.GetElementsByTagName("MerTranNo")[0].InnerText;

            }
            
            DateTime dt = DateTime.Now;
            string rsptime = dt.ToString("yyyyMMddHHmmss");
            string responsestr = "<?xml version='1.0' encoding='UTF-8'?><Document><Head><RspType>NORMAL</RspType><RspCode> MAPIPY0000</RspCode><RspMsg>交易成功</RspMsg><RspTime>"+ rsptime + "</RspTime></Head><Body><MerTranNo>"+MerTranNo+"</MerTranNo></Body></Document>";
            string rsasign = client.AttachedSign("301140880629503", responsestr);
            //rsasign = System.Web.HttpUtility.UrlEncode(rsasign, System.Text.Encoding.UTF8);
            //StringBuilder builder = new StringBuilder();
            //builder.AppendFormat("{0}={1}", "RSASignData", rsasign.Replace("\n", "").Replace("\r", ""));
            context.Response.ContentType = "text/plain";
            //context.Response.ContentType = "text/xml";
            context.Response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
            context.Response.Charset = "UTF-8";
            context.Response.Write(rsasign);
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