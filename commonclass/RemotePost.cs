using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.commonclass
{
/// <summary>
    /// 跨页面POST数据
    /// </summary>
    public class RemotePost : Dictionary<string, string>
    {
        /// <summary>
        /// 提交HTTP POST请求
        /// </summary>
        /// <param name="url">请求目标地址</param>
        /// <param name="isBackable">可选参数，是否可通过浏览器回退按钮退到本提交页面</param>
        public void Submit(string url, bool isBackable = true)
        {
            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            if (isBackable)
            {
                response.Write("<html><head></head><body onload=\"pageload();\">");
                response.Write("<script language=\"javascript\">function pageload(){if(document.getElementById('hidBackUrl').value.length==0){document.getElementById('hidBackUrl').value=document.referrer;document.form1.submit();}else{location.href=document.getElementById('hidBackUrl').value;}}</script>");
                response.Write("<input id=\"hidBackUrl\" type=\"hidden\" value=\"\" />");
            }
            else
            {
                response.Write("<html><head></head><body onload=\"document.form1.submit();\">");
            }
            response.Write(string.Format("<form name=\"form1\" method=\"post\" action=\"{0}\">", url));
            foreach(string key in this.Keys)
            {
                response.Write(string.Format("<input name=\"{0}\" type=\"hidden\" value=\"{1}\" />", key, this[key]));
            } 
            response.Write("</form></body></html>");
            response.End();
        }
    }
}