using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class app_fileupload : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
           
            string funcName = context.Request.QueryString["funcName"];
            string resultMsg = "";

            #region MyRegion
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "false";
            resultDic["message"] = "";
            string fileRootPath = "";
            switch (funcName)
            {
                case "userImg":
                    {
                        fileRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["UserPhotoUrlRootPath"].ToString();
                    }
                    break;
                case "businessImg":
                    {
                        fileRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString();
                    }
                    break;
            }
            string uploadPath = fileRootPath + "fileuploadpath/";

            string uploadName = Eva.Library.Text.NumberTool.GetNoRepeatNumber() + ".png";
            string uploadFullPath = Eva.Library.Format.FormatTextTool.GetMapPath(uploadPath + uploadName, HttpContext.Current.Server);

            resultDic = upLoadFile(uploadPath, uploadName, context);

            if (resultDic["result"] == "true")
            {
                #region 压缩
                string thumbnailPath = fileRootPath + "thumbnailpath/";
                
                string thumbnailName = sara.dd.ldsw.commonclass.commonclass.makeThumbnailName(uploadName);
                string thumbnailFullPath = Eva.Library.Format.FormatTextTool.GetMapPath(thumbnailPath + thumbnailName, HttpContext.Current.Server);

                MagickNet.Image img = new MagickNet.Image(uploadFullPath);
                if (img.Orientation == MagickNet.OrientationType.RightTopOrientation)
                {
                    img.Rotate(90);
                    img.Orientation = MagickNet.OrientationType.UndefinedOrientation;
                }
                else if (img.Orientation == MagickNet.OrientationType.BottomRightOrientation)
                {
                    img.Rotate(180);
                    img.Orientation = MagickNet.OrientationType.UndefinedOrientation;
                }
                else if (img.Orientation == MagickNet.OrientationType.LeftBottomOrientation)
                {
                    img.Rotate(270);
                    img.Orientation = MagickNet.OrientationType.UndefinedOrientation;
                }
                //图片质量
                img.Quality = 100;
                //調整大小，是等比的，就是说宽长压宽，高长压高
                img.Resize(new MagickNet.Geometry(120, 120));
                img.Write(thumbnailFullPath);
                img.Dispose(); 
                #endregion
            }

            resultMsg = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            #endregion
            context.Response.Output.Write(resultMsg);
            context.Response.Output.Flush();
        }

        private Dictionary<string, string> upLoadFile(string filepath, string fileName, HttpContext context)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            long offset = 0;
            int size = 40960;
            byte[] intobuffer = new byte[size];
            Stream sr = context.Request.InputStream;
            try
            {
                string strPath = Eva.Library.Format.FormatTextTool.GetMapPath(filepath, HttpContext.Current.Server) + fileName;
                offset = (offset < 0 ? 0 : offset);
                FileStream filesStream = new FileStream(strPath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.Write);
                while (true)
                {
                    int bytesIn = sr.Read(intobuffer, 0, size);
                    if (bytesIn == 0)
                    {
                        break;
                    }
                    else
                    {
                        byte[] buffer = intobuffer;
                        //lock (locker)
                        {
                            //读写文件的文件流,支持同步读写也支持异步读写
                            filesStream.Seek(offset, SeekOrigin.Begin);
                            filesStream.Write(buffer, 0, bytesIn);
                            offset += bytesIn;
                        }
                    }
                }
                filesStream.Flush();
                filesStream.Close();
                filesStream.Dispose();

                resultDic["result"] = "true";
                resultDic["message"] = fileName;


            }
            catch (Exception ex)
            {

                resultDic["result"] = "false";
                resultDic["message"] = "程序异常：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }

            return resultDic;
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