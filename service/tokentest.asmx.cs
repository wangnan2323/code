using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// tokentest 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class tokentest : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_maintable _idal_t_projclass_dtl1 = new sara.dd.ldsw.dal.tbl_maintable();

        

        [WebMethod]
        public string HelloWorld()
        {
            return Server.MapPath("https://127.0.0.1/sara.dd.ldsw/");
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetList(string whereString)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_maintable>(_idal_t_projclass_dtl1.GetList(whereString, " sys_id", FormatColumns("").Replace("^", ","), "", "", null), FormatColumns("").Replace("^", ","));

                string message = "{\"total\":\"" + _idal_t_projclass_dtl1.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";

                //string token = HttpContext.Current.Request.QueryString["token"].ToString();
//                message = @"表情符号大全 心形符号大全
//
//QQ起昵称专用特效字符
//︻︼︽︾〒↑↓☉⊙●〇◎¤★☆■▓「」『』◆◇▲△▼▽◣◥◢◣◤ ◥№↑↓→←↘↙Ψ※㊣∑⌒∩【】〖〗＠ξζω□∮〓※》∏卐√ ╳々♀♂∞①ㄨ≡╬╭╮╰╯╱╲ ▂ ▂ ▃ ▄ ▅ ▆ ▇ █ ▂▃▅▆█ ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁
//
//♡. ≥▂≤　≥０≤　≥＾≤　≥ω≤　≥﹏≤　≥△≤　≥▽≤";
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
        /// 字符串加密
        /// </summary>
        /// <param name="strText">字符串</param>
        /// <param name="strEncrKey">密钥8位数字或字母</param>
        /// <returns></returns>
        public string DesEncryptString(string strText, string strEncrKey)
        {
            byte[] rgbKey = null;
            string SIv = "inputvec";
            try
            {
                rgbKey = System.Text.Encoding.UTF8.GetBytes(strEncrKey.Substring(0, strEncrKey.Length));
                System.Security.Cryptography.DESCryptoServiceProvider provider = new System.Security.Cryptography.DESCryptoServiceProvider();
                provider.Key = rgbKey;
                provider.IV = System.Text.Encoding.UTF8.GetBytes(SIv);
                provider.Mode = System.Security.Cryptography.CipherMode.ECB;

                byte[] bytes = System.Text.Encoding.UTF8.GetBytes(strText);
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                System.Security.Cryptography.CryptoStream stream2 = new System.Security.Cryptography.CryptoStream(stream, provider.CreateEncryptor(), System.Security.Cryptography.CryptoStreamMode.Write);
                stream2.Write(bytes, 0, bytes.Length);
                stream2.FlushFinalBlock();
                return Convert.ToBase64String(stream.ToArray());
            }
            catch (Exception exception)
            {
                //return ("error:" + exception.Message + "\r");
                throw exception;
            }
        }


        /// <summary>
        /// 字符串解密
        /// </summary>
        /// <param name="strText">字符串</param>
        /// <param name="sDecrKey">密钥8位数字或字母</param>
        /// <returns></returns>
        public static string DesDecryptString(string strText, string sDecrKey)
        {
            byte[] rgbKey = null;
            string SIv = "inputvec";
            byte[] buffer = new byte[strText.Length];
            try
            {
                rgbKey = System.Text.Encoding.UTF8.GetBytes(sDecrKey.Substring(0, 8));
                System.Security.Cryptography.DESCryptoServiceProvider provider = new System.Security.Cryptography.DESCryptoServiceProvider();
                provider.Key = rgbKey;
                provider.IV = System.Text.Encoding.UTF8.GetBytes(SIv);
                provider.Mode = System.Security.Cryptography.CipherMode.ECB;

                buffer = Convert.FromBase64String(strText);
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                System.Security.Cryptography.CryptoStream stream2 = new System.Security.Cryptography.CryptoStream(stream, provider.CreateDecryptor(), System.Security.Cryptography.CryptoStreamMode.Write);
                stream2.Write(buffer, 0, buffer.Length);
                stream2.FlushFinalBlock();
                System.Text.Encoding encoding = new System.Text.UTF8Encoding();
                return encoding.GetString(stream.ToArray());
            }
            catch (Exception exception)
            {
                //return ("error:" + exception.Message + "\r");
                throw exception;
            }
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

                columns += "^" + "sys_processnextuser";

                columns += "^" + "sys_projectclassdtl1";

                columns += "^" + "sys_projectclassdtl2";

                columns += "^" + "sys_processinsid";

                columns += "^" + "sys_projectclassdtl1_name";

                columns += "^" + "sys_projectclassdtl2_name";

                columns += "^" + "sys_first";

                columns += "^" + "sys_projectclassid";

                columns += "^" + "sys_projectclassid_name";

                columns += "^" + "fk_tbl_maintable_sys_id";

                columns += "^" + "fk_workflow_sys_id";

                columns += "^" + "shpid";

                columns += "^" + "xmmc";

                columns += "^" + "xzqy";

                columns += "^" + "xzqyid";

                columns += "^" + "dwmc";

                columns += "^" + "lrr";

                columns += "^" + "lrrq";

                columns += "^" + "bz";

                columns += "^" + "xmlx";

                columns += "^" + "xmlxid";

                columns += "^" + "value1";

                columns += "^" + "value2";

                columns += "^" + "value3";

                columns += "^" + "value4";

                columns += "^" + "value5";

                columns += "^" + "value6";

                columns += "^" + "value7";

                columns += "^" + "value8";

                columns += "^" + "value9";

                columns += "^" + "value10";


            }
            return columns.TrimStart('^');
        }
    }
}
