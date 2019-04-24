using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;
using sara.dd.ldsw.commonclass;
using System.Reflection;
using Microsoft.CSharp;
using System.CodeDom.Compiler;

using System.Net;
namespace sara.dd.ldsw
{
    /// <summary>
    /// publish 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class ProjectTool : System.Web.Services.WebService
    {

        /// <summary>
        /// 发布项目
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string PublishProject()
        {
            string errorFileName = "";
            string sourceRootPathString = @"C:\inetpub\wwwroot\sara\sara.dd.ldsw";
            string targetRootPathString = @"C:\inetpub\wwwroot\sara.dd.ldsw.ftp";
            string str = "";

            //.cs.csproj.user.suo.cache
            string[] copyExtNameArry = {
                ".html", ".txt", ".dll",".pdb",".xml",".asax",".asmx",".ashx",".aspx",
                ".png",".gif",".jpg",".doc",".db",".woff2",".eot",".svg",".ttf",".woff",".json",".exe",".xap",".WD3",
                ".css",".js",
                ".config",
                ".tcs",".tjsp",".txml",".taspx",".tjs",".thtml",".tcss",".txaml",".tsvc",".tasmx",
                ".zip",
                ".p12"
            };



            //.html,.txt,.config,.asax,.cs,.asmx,
            //.csproj,.user,.suo,.dll,.pdb,.xml,
            //.css,.js,.png,.gif,.psd,
            //.cache,.jpg,.doc,
            //.ashx,.db,.woff2,.eot,
            //.svg,.ttf,.woff,.json,
            //.exe,.xap,.aspx,.WD3


            string[] editExtNameArray = { ".html", ".config", ".js" };
            List<FileInformation> list = DirectoryAllFiles.GetAllFiles(new System.IO.DirectoryInfo(sourceRootPathString));
            Eva.Library.Collection.NoRepeatingStringCollection n = new Eva.Library.Collection.NoRepeatingStringCollection();
            foreach (var item in list)
            {
                str += string.Format("文件目录：{0}文件名：{1}后缀：{2}", item.FilePath, item.FileName, item.FileExtName);
                n.Add(item.FileExtName);
                bool isCopy = false;
                if (copyExtNameArry.Contains(item.FileExtName))
                {
                    if (item.FileExtName == ".js")
                    {
                        if(item.FileName.Contains(".min.js"))
                        {
                            isCopy = true;
                        }
                        else
                        {
                            isCopy = false;
                        }
                    }
                    else if (item.FileExtName == ".css")
                    {
                        if (item.FileName.Contains(".min.css"))
                        {
                            isCopy = true;
                        }
                        else
                        {
                            isCopy = false;
                        }
                    }
                    else if (item.FileExtName == ".config")
                    {
                        if (item.FileName.Contains(".Debug.config")|| item.FileName.Contains(".Release.config"))
                        {
                            isCopy = false;
                        }
                        else
                        {
                            isCopy = true;
                        }
                    }
                    else
                    {
                        isCopy = true;

                    }

                }
                else
                {
                    isCopy = false;
                }

                if (isCopy == true)
                { 

                    if (!Directory.Exists(item.FilePath.Replace(sourceRootPathString, targetRootPathString)))
                    {
                        Directory.CreateDirectory(item.FilePath.Replace(sourceRootPathString, targetRootPathString));
                    }

                    System.IO.File.Copy(item.FilePath + "\\" + item.FileName, item.FilePath.Replace(sourceRootPathString, targetRootPathString) + "\\" + item.FileName, true);

                    if (editExtNameArray.Contains(item.FileExtName))
                    {
                        string targetFileFullName = item.FilePath.Replace(sourceRootPathString, targetRootPathString) + "\\" + item.FileName;
                        string filecontent = FileOperation.ReadFile(targetFileFullName);

                        if (filecontent.IndexOf("127.0.0.1/sara.dd.ldsw") > -1)
                        {
                            filecontent = filecontent.Replace("127.0.0.1/sara.dd.ldsw", "www.hotworld.com.cn");
                        }

                        if (item.FileExtName == ".html" && filecontent.IndexOf("ismin: true,") > -1)
                        {
                            filecontent = filecontent.Replace("ismin: true,", "ismin: true,");
                        }

                        if (item.FileExtName == ".html")
                        {
                            filecontent = filecontent.Replace(".js\"", ".min.js\"").Replace(".min.min.js\"", ".min.js\"");
                            filecontent = filecontent.Replace(".css\"", ".min.css\"").Replace(".min.min.css\"", ".min.css\"");
                            
                        }
                        errorFileName += FileOperation.writeFile(targetFileFullName, filecontent) + "\r\n";

                    }


                }



            }

            return errorFileName;

        }

        /// <summary>
        /// 获取最新版本的platformOperation的UI
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string LibSaraPlatformOperationUIForPublish()
        {
            string projectName = "sara.dd.ldsw";
            string errorFileName = "";
            string rootPathString = @"C:\inetpub\wwwroot\sara\";
            string sourcePathString = @"sara.platform.operation\";
            string targetPathString = projectName + @"\sara.platform.operation\";

            //删除已有文件
            if (Directory.Exists(rootPathString + targetPathString))
            {
                Directory.Delete(rootPathString + targetPathString, true);
            }

            //需要拷贝的文件
            string[] copyExtNameArry = { ".html", ".css", ".js", ".asmx", ".png", ".gif" };
            //需要修改参数的文件
            string[] editExtNameArray = { ".html", ".js" };

            //获取文件夹下的所有文件集合
            List<FileInformation> list = DirectoryAllFiles.GetAllFiles(new System.IO.DirectoryInfo(rootPathString + sourcePathString));

            Eva.Library.Collection.NoRepeatingStringCollection n = new Eva.Library.Collection.NoRepeatingStringCollection();

           
            foreach (var item in list)
            {
                n.Add(item.FileExtName);

                #region 是否拷贝
                bool isCopy = false;
                if (copyExtNameArry.Contains(item.FileExtName))
                {
                    if (item.FileExtName == ".js")
                    {
                        if (item.FileName.Contains(".min.js"))
                        {
                            isCopy = true;
                        }
                        else
                        {
                            isCopy = false;
                        }
                    }
                    else if (item.FileExtName == ".css")
                    {
                        if (item.FileName.Contains(".min.css"))
                        {
                            isCopy = true;
                        }
                        else
                        {
                            isCopy = false;
                        }
                    }
                    else if (item.FileExtName == ".config")
                    {
                        if (item.FileName.Contains(".Debug.config") || item.FileName.Contains(".Release.config"))
                        {
                            isCopy = false;
                        }
                        else
                        {
                            isCopy = true;
                        }
                    }
                    else
                    {
                        isCopy = true;

                    }

                }
                else
                {
                    isCopy = false;
                }
                #endregion

                if (isCopy == true)
                {
                    #region 拷贝文件
                    if (!Directory.Exists(item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString)))
                    {
                        Directory.CreateDirectory(item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString));
                    }

                    System.IO.File.Copy(item.FilePath + "\\" + item.FileName, item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString) + "\\" + item.FileName, true);

                    #endregion

                    #region 修改文件内容
                    if (editExtNameArray.Contains(item.FileExtName))
                    {
                        string targetFileFullName = item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString) + "\\" + item.FileName;
                        string filecontent = FileOperation.ReadFile(targetFileFullName);

                        #region 替换文件内容
                        //平台operation的路径
                        if (filecontent.IndexOf("【sara.platform.operation.url】") > -1)
                        {
                            filecontent = filecontent.Replace("【sara.platform.operation.url】", "//127.0.0.1/" + projectName + "/sara.platform.operation/");
                        }
                        //资源文件路径
                        if (filecontent.IndexOf("【sara.resource.library.url】") > -1)
                        {
                            //如果是dd框架，那么sara.resource.library应该是在项目外，应该去掉
                            //如果是ee框架，那么sara.resource.library应该是在项目内，所以应该保留
                            if (projectName.IndexOf(".dd.") > -1)
                            {
                                filecontent = filecontent.Replace("【sara.resource.library.url】", "//162.16.166.1/sara.resource.library/");
                            }
                            else
                            {
                                filecontent = filecontent.Replace("【sara.resource.library.url】", "//127.0.0.1/" + projectName + "/sara.resource.library/");
                            }
                        }
                        //附件文件路径
                        if (filecontent.IndexOf("【sara.project.url】") > -1)
                        {
                            filecontent = filecontent.Replace("【sara.project.url】", "//127.0.0.1/"+ projectName + "/");
                        }
                        //附件文件路径
                        if (filecontent.IndexOf("【sara.project.file.url】") > -1)
                        {
                            if (projectName.IndexOf(".dd.") > -1)
                            {
                                filecontent = filecontent.Replace("【sara.project.file.url】", "//127.0.0.1/"+ projectName + ".file/");
                            }
                            else
                            {
                                filecontent = filecontent.Replace("【sara.project.file.url】", "//127.0.0.1/" + projectName + "/" + projectName + ".file/");
                            }
                        }
                        //rootip
                        if (filecontent.IndexOf("【sara.include.rootip】") > -1)
                        {
                            if (projectName.IndexOf(".dd.") > -1)
                            {
                                filecontent = filecontent.Replace("【sara.include.rootip】", "127.0.0.1" );
                            }
                            else
                            {
                                filecontent = filecontent.Replace("【sara.include.rootip】", "127.0.0.1/" + projectName);
                            }
                        }
                        
                        #endregion

                        #region min化问题
                        if (item.FileExtName == ".html" && filecontent.IndexOf("ismin: true,") > -1)
                        {
                            filecontent = filecontent.Replace("ismin: true,", "ismin: true,");
                        }

                        if (item.FileExtName == ".html")
                        {
                            filecontent = filecontent.Replace(".js\"", ".min.js\"").Replace(".min.min.js\"", ".min.js\"");
                            filecontent = filecontent.Replace(".css\"", ".min.css\"").Replace(".min.min.css\"", ".min.css\"");

                        }
                        #endregion
                        errorFileName += FileOperation.writeFile(targetFileFullName, filecontent);
                        //Console.WriteLine("拷贝并编辑文件" + item.FileName);
                    }
                    else
                    {
                        //Console.WriteLine("拷贝文件" + item.FileName);
                    }
                    #endregion

                }
            }
            return errorFileName;
        }

        /// <summary>
        /// 获取最新版本的platformOperation的UI
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string LibSaraPlatformOperationUIForDebugJs()
        {
            string projectName = "sara.dd.ldsw";
            string errorFileName = "";
            string rootPathString = @"C:\inetpub\wwwroot\sara\";
            string sourcePathString = @"sara.platform.operation\";
            string targetPathString = projectName + @"\sara.platform.operation\";

            //删除已有文件
            if (Directory.Exists(rootPathString + targetPathString))
            {
                Directory.Delete(rootPathString + targetPathString, true);
            }

            //需要拷贝的文件
            string[] copyExtNameArry = { ".html", ".css", ".js", ".asmx", ".png", ".gif" };
            //需要修改参数的文件
            string[] editExtNameArray = { ".html", ".js" };

            //获取文件夹下的所有文件集合
            List<FileInformation> list = DirectoryAllFiles.GetAllFiles(new System.IO.DirectoryInfo(rootPathString + sourcePathString));

            Eva.Library.Collection.NoRepeatingStringCollection n = new Eva.Library.Collection.NoRepeatingStringCollection();

            foreach (var item in list)
            {
                n.Add(item.FileExtName);

                #region 是否拷贝
                bool isCopy = false;
                if (copyExtNameArry.Contains(item.FileExtName))
                {
                    if (item.FileExtName == ".js")
                    {
                        if (item.FileName.Contains(".min.js"))
                        {
                            isCopy = false;
                        }
                        else
                        {
                            isCopy = true;
                        }
                    }
                    else if (item.FileExtName == ".css")
                    {
                        if (item.FileName.Contains(".min.css"))
                        {
                            isCopy = false;
                        }
                        else
                        {
                            isCopy = true;
                        }
                    }
                    else if (item.FileExtName == ".config")
                    {
                        if (item.FileName.Contains(".Debug.config") || item.FileName.Contains(".Release.config"))
                        {
                            isCopy = false;
                        }
                        else
                        {
                            isCopy = true;
                        }
                    }
                    else
                    {
                        isCopy = true;

                    }

                }
                else
                {
                    isCopy = false;
                }
                #endregion

                if (isCopy == true)
                {
                    #region 拷贝文件
                    if (!Directory.Exists(item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString)))
                    {
                        Directory.CreateDirectory(item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString));
                    }

                    System.IO.File.Copy(item.FilePath + "\\" + item.FileName, item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString) + "\\" + item.FileName, true);

                    #endregion

                    #region 修改文件内容
                    if (editExtNameArray.Contains(item.FileExtName))
                    {
                        string targetFileFullName = item.FilePath.Replace(rootPathString + sourcePathString, rootPathString + targetPathString) + "\\" + item.FileName;
                        string filecontent = FileOperation.ReadFile(targetFileFullName);

                        #region 项目路径
                        //平台operation的路径
                        if (filecontent.IndexOf("【sara.platform.operation.url】") > -1)
                        {
                            filecontent = filecontent.Replace("【sara.platform.operation.url】", "//127.0.0.1/" + projectName + "/sara.platform.operation/");
                        }
                        //资源文件路径
                        if (filecontent.IndexOf("【sara.resource.library.url】") > -1)
                        {
                            //如果是dd框架，那么sara.resource.library应该是在项目外，应该去掉
                            //如果是ee框架，那么sara.resource.library应该是在项目内，所以应该保留
                            if (projectName.IndexOf(".dd.") > -1)
                            {
                                filecontent = filecontent.Replace("【sara.resource.library.url】", "//162.16.166.1/sara.resource.library/");
                            }
                            else
                            {
                                filecontent = filecontent.Replace("【sara.resource.library.url】", "//127.0.0.1/" + projectName + "/sara.resource.library/");
                            }
                        }
                        //附件文件路径
                        if (filecontent.IndexOf("【sara.project.url】") > -1)
                        {
                            filecontent = filecontent.Replace("【sara.project.url】", "//127.0.0.1/"+ projectName + "/");
                        }
                        //附件文件路径
                        if (filecontent.IndexOf("【sara.project.file.url】") > -1)
                        {
                            if (projectName.IndexOf(".dd.") > -1)
                            {
                                filecontent = filecontent.Replace("【sara.project.file.url】", "//127.0.0.1/" + projectName + ".file/");
                            }
                            else
                            {
                                filecontent = filecontent.Replace("【sara.project.file.url】", "//127.0.0.1/" + projectName + "/sara.dd.ldsw.file/");
                            }
                        }
                        //rootip
                        if (filecontent.IndexOf("【sara.include.rootip】") > -1)
                        {
                            if (projectName.IndexOf(".dd.") > -1)
                            {
                                filecontent = filecontent.Replace("【sara.include.rootip】", "127.0.0.1");
                            }
                            else
                            {
                                filecontent = filecontent.Replace("【sara.include.rootip】", "127.0.0.1/" + projectName);
                            }
                        }




                        #endregion

                        #region min化问题
                        if (item.FileExtName == ".html" && filecontent.IndexOf("ismin: true,") > -1)
                        {
                            filecontent = filecontent.Replace("ismin: true,", "ismin: true,");
                        }

                        if (item.FileExtName == ".html")
                        {
                            filecontent = filecontent.Replace(".min.js\"", ".js\"").Replace(".min.min.js\"", ".js\"");
                            filecontent = filecontent.Replace(".min.css\"", ".css\"").Replace(".min.min.css\"", ".css\"");

                        }
                        #endregion
                        errorFileName += FileOperation.writeFile(targetFileFullName, filecontent);
                        //Console.WriteLine("拷贝并编辑文件" + item.FileName);
                    }
                    else
                    {
                        //Console.WriteLine("拷贝文件" + item.FileName);
                    }
                    #endregion

                }
            }
            return errorFileName;
        }

        /// <summary>
        /// 获取最新版本的platformOperation的DLL
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string LibSaraPlatformOperationDll()
        {
            string projectName = "sara.dd.ldsw";
       
            string rootPathString = @"C:\inetpub\wwwroot\sara\";
            string sourcePathString = @"sara.platform.operation\bin\Debug\";
            string targetPathString = projectName + @"\lib\";

            string[] nameArray = { "sara.platform.operation.dll", "sara.platform.operation.pdb" };

            for (int i = 0; i < nameArray.Length; i++)
            {
                //删除原始文件
                //if (File.Exists(rootPathString + targetPathString + nameArray[i]))
                //{
                //    File.Delete(rootPathString + targetPathString + nameArray[i]);
                //}

                File.Copy(rootPathString + sourcePathString + nameArray[i], rootPathString + targetPathString + nameArray[i], true);
            }
          


            return "";
        }

        /// <summary>
        /// 获取最新版本的SaraPlatformService的Dll
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string LibSaraPlatformServiceDll()
        {
            string projectName = "sara.dd.ldsw";

            string rootPathString = @"C:\inetpub\wwwroot\sara\";
            string sourcePathString = @"sara.platform.service\bin\Debug\";
            string targetPathString = projectName + @"\lib\";

            string[] nameArray = { "sara.platform.service.dll", "sara.platform.service.pdb" };

            for (int i = 0; i < nameArray.Length; i++)
            {
                //删除原始文件
                //if (File.Exists(rootPathString + targetPathString + nameArray[i]))
                //{
                //    File.Delete(rootPathString + targetPathString + nameArray[i]);
                //}

                File.Copy(rootPathString + sourcePathString + nameArray[i], rootPathString + targetPathString + nameArray[i], true);
            }
            return "";
        }

        /// <summary>
        /// 获取最新版本的EvaLibrary的Dll
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string LibEvaLibraryDll()
        {
            string projectName = "sara.dd.ldsw";

            string rootPathString = @"C:\inetpub\wwwroot\";
            string sourcePathString = @"Eva\Eva.Library\bin\Debug\";
            string targetPathString = @"sara\" + projectName + @"\lib\";

            string[] nameArray = { "Eva.Library.dll", "Eva.Library.dll.config", "Eva.Library.pdb", "MySql.Data.dll" };

            for (int i = 0; i < nameArray.Length; i++)
            {
                //删除原始文件
                //if (File.Exists(rootPathString + targetPathString + nameArray[i]))
                //{
                //    File.Delete(rootPathString + targetPathString + nameArray[i]);
                //}

                File.Copy(rootPathString + sourcePathString + nameArray[i], rootPathString + targetPathString + nameArray[i], true);
            }
           
            return "";
        }

        /// <summary>
        /// 获取最新版本的Easy2008QuickDevelop的Dll
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string LibEasy2008QuickDevelopDll()
        {
            string projectName = "sara.dd.ldsw";

            string rootPathString = @"C:\inetpub\wwwroot\";
            string sourcePathString = @"Easy2008\Easy2008.QuickDevelop\bin\Debug\";
            string targetPathString = @"sara\" + projectName + @"\lib\";

            string[] nameArray = { "AjaxControlToolkit.dll", "AjaxControlToolkit.pdb",
                "ComponentArt.Web.UI.dll",
                "Easy2008.QuickDevelop.dll","Easy2008.QuickDevelop.dll.config","Easy2008.QuickDevelop.pdb","Easy2008.QuickDevelop.XML",
                "Easy2008.QuickDevelop.QRCode.dll","Easy2008.QuickDevelop.QRCode.pdb",
                "ICSharpCode.SharpZipLib.dll",
                "Maticsoft.DBUtility.dll",
              
                "MySql.Data.dll"
            };

            for (int i = 0; i < nameArray.Length; i++)
            {
                File.Copy(rootPathString + sourcePathString + nameArray[i], rootPathString + targetPathString + nameArray[i], true);
            }


            string sourcePathString2 = @"Easy2008\Easy2008.QuickDevelop.Tools.OfficeTool\bin\Debug\";
            string[] nameArray2 = {
                "Easy2008.QuickDevelop.Tools.OfficeTool.dll","Easy2008.QuickDevelop.Tools.OfficeTool.pdb","Easy2008.QuickDevelop.Tools.OfficeTool.XML",
                "Microsoft.Office.Interop.Excel.dll","Microsoft.Office.Interop.Word.dll",
                "Office.dll"
                };
            for (int i = 0; i < nameArray2.Length; i++)
            {
                File.Copy(rootPathString + sourcePathString2 + nameArray2[i], rootPathString + targetPathString + nameArray2[i], true);
            }

            string sourcePathString3 = @"Easy2008\Easy2008.QuickDevelop\Lib\";
            string[] nameArray3= {

                "LTP.Common.dll"
                };
            for (int i = 0; i < nameArray3.Length; i++)
            {
                File.Copy(rootPathString + sourcePathString3 + nameArray3[i], rootPathString + targetPathString + nameArray3[i], true);
            }

            return "";
        }

        [WebMethod]
        public string 动态编译()
        {
            string MyCodeString = @"

        public class MyTest

        {

            public static string GetTestString()

            {

                string MyStr = ""This is a Dynamic Compiler Demo!"";

                return MyStr;

            }

        }";
            CompilerParameters compilerParams = new CompilerParameters();
            ///编译器选项设置
            compilerParams.CompilerOptions = "/target:library /optimize";
            ///编译时在内存输出
            compilerParams.GenerateInMemory = true;
            ///生成调试信息
            compilerParams.IncludeDebugInformation = false;
            ///添加相关的引用
            compilerParams.ReferencedAssemblies.Add("mscorlib.dll");
            compilerParams.ReferencedAssemblies.Add("System.dll");
            //ICodeCompiler compiler = new CSharpCodeProvider().CreateCompiler();
            CodeDomProvider compiler = CodeDomProvider.CreateProvider("C#");
            ///编译

            CompilerResults results = compiler.CompileAssemblyFromSource(compilerParams, MyCodeString);
            // string[] str = { "C:\\inetpub\\wwwroot\\sara\\sara.dd.ldsw\\service\\tokentest.asmx","C:\\inetpub\\wwwroot\\sara\\sara.dd.ldsw\\service\\tokentest.asmx.cs" };
            // CompilerResults results = compiler.CompileAssemblyFromFile(compilerParams, str);
            ///创建程序集

            Assembly asm = results.CompiledAssembly;



            ///获取编译后的类型

            object objMyTestClass = asm.CreateInstance("MyTest");

            Type MyTestClassType = objMyTestClass.GetType();


            object aadd = MyTestClassType.GetMethod("GetTestString").Invoke(objMyTestClass, null);

            return aadd.ToString();

        }

        [WebMethod]
        public string readHttpFile()
        {
            string urlString = "http://127.0.0.1/sara.dd.ldsw.file/files_design_templet/dal_oracle.tcs";

            //string trempPath = @"C:\inetpub\wwwroot\sara\sara.dd.ldsw\aaa.txt";
            //File.Create(trempPath);
            //System.Net.WebClient myWebClient = new System.Net.WebClient();
            //myWebClient.DownloadFile(urlString, trempPath);
            //string fileString = ReadFile(trempPath);
            //File.Delete(trempPath);
            //return fileString;

            return CopyFileByUrl(urlString);

            //HttpWebRequest myRequest = (HttpWebRequest)HttpWebRequest.Create("");// 打开网络连接

            //myRequest.AddRange(0);// 设置Range值,与上面的writeStream.Seek用意相同,是为了定义远程文件读取位置
            //Stream readStream = myRequest.GetResponse().GetResponseStream();// 向服务器请求,获得服务器的回应数据流
            //byte[] btArray = new byte[512];// 定义一个字节数据,用来向readStream读取内容和向writeStream写入内容
            //System.Text.StringBuilder sb = new System.Text.StringBuilder();
            //int contentSize = readStream.Read(btArray, 0, btArray.Length);// 向远程文件读第一次
            //sb.Append(System.Text.Encoding.UTF8.GetString(btArray));

            //while (contentSize > 0)// 如果读取长度大于零则继续读
            //{

            //    contentSize = readStream.Read(btArray, 0, btArray.Length);// 继续向远程文件读取   
            //    sb.Append(System.Text.Encoding.UTF8.GetString(btArray));
            //}
            //readStream.Close();

            //return sb.ToString();

        }

        public string CopyFileByUrl(string url)
        {
            string name = url.Substring(url.LastIndexOf('/') + 1);//获取名字
          System.Text.StringBuilder sb = new System.Text.StringBuilder();

            HttpWebRequest request = HttpWebRequest.Create(url) as HttpWebRequest;
            request.Method = "GET";
            request.ProtocolVersion = new Version(1, 1);
            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                return string.Empty;//找不到则直接返回null
            }
            // 转换为byte类型
            System.IO.Stream stream = response.GetResponseStream();


            //创建本地文件写入流
       //     Stream fs = new FileStream(filePath, FileMode.Create);
            byte[] bArr = new byte[1024];
            int size = stream.Read(bArr, 0, (int)bArr.Length);
         
            while (size > 0)
            {
                //   fs.Write(bArr, 0, size);
                sb.Append(System.Text.Encoding.UTF8.GetString(bArr));
                size = stream.Read(bArr, 0, (int)bArr.Length);
                
            }
           // fs.Close();
            stream.Close();
            return sb.ToString();
        }

        

        public string ReadFile(string fileFullName)
        {
            StreamReader sr = null;
            string content = "";
            try
            {
                FileInfo fi = new FileInfo(fileFullName);
                sr = new StreamReader(fi.OpenRead());
                content = sr.ReadToEnd();
            }
            catch
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
