using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_guangda_test 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class service_guangda_test : System.Web.Services.WebService
    {

        [WebMethod]

        //发送XML
        public string m_PostSubmit(string strUrl, string strParam)
        {
            string strResult = "error";
            try
            {
                System.Net.HttpWebRequest req = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(strUrl);
                //Encoding encoding = Encoding.UTF8;
                Encoding encoding = Encoding.GetEncoding("gbk");
                //encoding.GetBytes(postData);
                byte[] bs = System.Text.Encoding.GetEncoding("gbk").GetBytes(strParam);
                string responseData = System.String.Empty;
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded";
                req.ContentLength = bs.Length;
                try
                {
                    using (System.IO.Stream reqStream = req.GetRequestStream())
                    {
                        reqStream.Write(bs, 0, bs.Length);
                        reqStream.Close();
                    }
                    using (System.Net.HttpWebResponse response = (System.Net.HttpWebResponse)req.GetResponse())
                    {
                        using (System.IO.StreamReader reader = new System.IO.StreamReader(response.GetResponseStream(), encoding))
                        {
                            responseData = reader.ReadToEnd().ToString();
                            strResult = responseData;
                        }
                    }
                }
                catch (System.Exception ex)
                {
                    strResult = "error：" + ex.Message;//返回异常信息
                }
            }
            catch (System.Exception ex)
            {
                strResult = "error：" + ex.Message;//返回异常信息
            }
            return strResult;
        }

    }
}
