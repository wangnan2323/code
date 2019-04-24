using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
namespace sara.dd.ldsw.commonclass
{
    public class langueclass : IHttpHandler
    {
        bool IHttpHandler.IsReusable
        {
            get
            {
                return true;
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            string url = context.Request.Path;
            // context.Response.ContentType = "text/javascript";
            //context.Request.Params["rc"] == "1"

            string filepath = context.Server.MapPath(url);
            string filecontent = "";
            filecontent = readFile(filepath);
            //var sb = new StringBuilder(filecontent);
            for (int i=0;i<100000;i++)
            {
                filecontent = filecontent.Replace("用户名", "用戶名");
                filecontent = filecontent.Replace("密码", "密碼いあぃ");

            }
            
            context.Response.Write(filecontent.ToString());
            context.Response.Flush();

        }

        public static string readFile(string filepath)
        {
            StreamReader sr = null;
            string content = "";
            try
            {
                FileInfo fi = new FileInfo(filepath);
                sr = new StreamReader(fi.OpenRead());
                content = sr.ReadToEnd();
            }
            catch(Exception ex)
            {
                content = null;
            }
            finally
            {
                if (sr != null)
                {
                    sr.Close();
                }
            }
            return content;

        }
    }
}
