using Eva.Library.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.UI;

namespace sara.dd.ldsw
{
    public class Global : System.Web.HttpApplication
    {
        public static Eva.Library.Log.ILog _ilog;

        public static DataTable _dt_token_function_islock;//悲观锁
        public static DataTable _dt_token_function_istoken;//无需验证token
        public static DataTable _dt_token_function_isencrypt;//无需加密
        public static Eva.Library.Data.AccessData.IAccessData _iAccessData;


        public static string ConfigWebServiceCollect = "";//是否开启webservice搜集器
        public static string ConfigWebServiceToken = "";//是否开启令牌认证
        public static string ConfigWebServiceLock = "";//是否开启悲观锁

        public static string ConfigWebServiceEncrypt = "";//是否开启加密算法

        public static string ConfigAppName = "";
        public static string ConfigAppCode = "";
        public static string ConfigDefaultTokenId = "";

        protected void Application_Start(object sender, EventArgs e)
        {
            try
            {


                HttpContext HttpCurrent = HttpContext.Current;
                if (HttpCurrent != null)
                {
                    Eva.Library.Global.AppRootPath = HttpCurrent.Server.MapPath("~");
                }
                else
                {
                    Eva.Library.Global.AppRootPath = AppDomain.CurrentDomain.BaseDirectory;
                    if (Regex.Match(Eva.Library.Global.AppRootPath, @"\\$", RegexOptions.Compiled).Success)
                    {
                        Eva.Library.Global.AppRootPath = Eva.Library.Global.AppRootPath.Substring(0, Eva.Library.Global.AppRootPath.Length - 1);
                    }
                }
                Eva.Library.Global.AppRootPath = Eva.Library.Global.AppRootPath + "\\";

                Eva.Library.Global.ConfigFileName = System.Configuration.ConfigurationManager.AppSettings["ConfigFileName"].ToString();


                //2016-01-15---token

                _iAccessData = commonclass.commonclass.CreateIAccessData();
                _dt_token_function_istoken = _iAccessData.Query("select f_function,f_service from t_token_function where sys_delflag='0' and f_istoken='false'").Tables[0];
                _dt_token_function_isencrypt = _iAccessData.Query("select f_function,f_service from t_token_function where sys_delflag='0' and f_isencrypt='false'").Tables[0];
                _dt_token_function_islock = _iAccessData.Query("select f_function,f_service,f_value10 from t_token_function where sys_delflag='0' and f_value10 is not null").Tables[0];

                ConfigAppName = System.Configuration.ConfigurationManager.AppSettings["EasyFrameConfigName"].ToString();
                ConfigAppCode = Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"].ToString();
                ConfigDefaultTokenId = Eva.Library.Configuration.ConfigurationManager.AppSettings["DefaultTokenId"].ToString();
                ConfigWebServiceCollect = Eva.Library.Configuration.ConfigurationManager.AppSettings["WebServiceCollect"].ToString();
                ConfigWebServiceEncrypt = Eva.Library.Configuration.ConfigurationManager.AppSettings["WebServiceEncrypt"].ToString();
                ConfigWebServiceLock = Eva.Library.Configuration.ConfigurationManager.AppSettings["WebServiceLock"].ToString();

                ConfigWebServiceToken = Eva.Library.Configuration.ConfigurationManager.AppSettings["WebServiceToken"].ToString();


                //2016-01-15---log
                if (_ilog == null)
                {
                    _ilog = Eva.Library.Log.LogFactory.CreateLogBySchemaName(Eva.Library.Global.AppRootPath + Eva.Library.Global.ConfigFileName, "54");
                }
            }
            catch
            {

            }

        }



        protected void Session_Start(object sender, EventArgs e)
        {

        }

        #region function f_checktoken
        /*
                             CREATE OR REPLACE FUNCTION f_checktoken(arg_token    in varchar2, --token
                                        arg_service  in varchar2, --定义参数变量
                                        arg_function in varchar2)
  return varchar2 as
  v_result varchar2(200);
  v_count  number;

BEGIN
  --定义返回值
  v_result := 'true';
  --私有变量
  v_count := 0;
  --0、验证有效性
  select count(*)
    into v_count
    from t_token_list t, t_token_function f, t_token_relation r
   where t.sys_id = r.fk_t_token_list_sys_id
     and f.sys_id = r.fk_t_token_function_sys_id
     and t.f_token = arg_token
     and t.sys_delflag = '0'
     and t.f_enable = 'true'
     and sysdate between t.f_startdate and t.f_enddate
     and f.f_service = arg_service
     and f.f_function = arg_function
     and f.sys_delflag = '0';

  if v_count > 0 then
    v_result := 'true';
  
  else
    --v_result := 'false';
    --1、验证token是否存在
    select count(*)
      into v_count
      from t_token_list
     where f_token = arg_token;
    if v_count <= 0 then
      v_result := '传入的token不存在于Token列表中';
    else
      --2、验证token是否已停用
      select count(*)
        into v_count
        from t_token_list
       where f_token = arg_token
         and sys_delflag = '0';
      if v_count <= 0 then
        v_result := '传入的token已经停用';
      else
        --3、验证token是否超时
        select count(*)
          into v_count
          from t_token_list
         where f_token = arg_token
           and sys_delflag = '0'
           and sysdate between f_startdate and f_enddate;
        if v_count <= 0 then
          v_result := '传入的token已超时';
        else
          --4、验证function和service是否存在
          select count(*)
            into v_count
            from t_token_function
           where f_service = arg_service
             and f_function = arg_function;
        
          if v_count <= 0 then
            v_result := 'function或者service不存在于服务列表中';
          else
            --5、验证function和service是否已停用
            select count(*)
              into v_count
              from t_token_function
             where f_service = arg_service
               and f_function = arg_function
               and sys_delflag = '0';
          
            if v_count <= 0 then
              v_result := 'function或者service已停用';
            else
               v_result := '当前token不具备对此服务或方法的操作权限';
            end if;
          
          end if;
        
        end if;
      end if;
    end if;
  end if;

  RETURN(v_result);

END f_checktoken;

                             
                             */

        #endregion

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            try
            {
                //请求服务的路径
                string path = this.Request.Path;
                //请求的方法
                string function = this.Request.PathInfo.Replace("/", "");
                //请求的service
                string service = path.Replace(function, "");
                //执行消息
                string message = "";



                //webservice采集器
                if (ConfigWebServiceCollect == "true")
                {
                    #region 传输通道加密算法-采集
                    Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
                    try
                    {

                        if (function != "")
                        {

                            if (service != "")
                            {
                                t = commonclass.commonclass.CreateIAccessDataTrans();

                                t.getTrans().begin();

                                string sql = "select count(*) from t_token_function  where f_function = '" + function + "' and f_service = '" + service + "' and  f_appname = '" + ConfigAppName + "'";

                                if (t.GetSingle(sql).ToString() == "0")
                                {
                                    sara.platform.operation.token.model.t_token_function m = new sara.platform.operation.token.model.t_token_function();
                                    m.sys_creatdate = DateTime.Now;
                                    m.sys_lasteditdate = DateTime.Now;
                                    m.sys_deldate = DateTime.Parse("1900-01-01");
                                    m.sys_delflag = "0";
                                    m.f_appcode = ConfigAppCode;
                                    m.f_appname = ConfigAppName;
                                    m.f_appnameen = ConfigAppName;
                                    m.f_function = function;
                                    m.f_service = service;
                                    m.f_isencrypt = "true";
                                    m.f_istoken = "true";

                                    sara.platform.operation.token.idal.It_token_function d = sara.platform.operation.commonclass.platformdalfactory.Create<sara.platform.operation.token.idal.It_token_function>();
                                    string id = d.Add(m, t);

                                    sara.platform.operation.token.model.t_token_relation rm = new sara.platform.operation.token.model.t_token_relation();
                                    rm.fk_t_token_function_sys_id = id;
                                    rm.fk_t_token_list_sys_id = ConfigDefaultTokenId;

                                    sara.platform.operation.token.idal.It_token_relation rd = sara.platform.operation.commonclass.platformdalfactory.Create<sara.platform.operation.token.idal.It_token_relation>();
                                    rd.Add(rm, t);

                                }
                                t.getTrans().commit();
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (t != null)
                        {
                            t.getTrans().rollback();
                        }

                    }
                    finally
                    {

                    }
                    #endregion
                }

                //是否开启token
                if (ConfigWebServiceToken == "true")
                {
                    #region 传输通道令牌管理
                    //是否为webservice调用
                    //if (this.Request.CurrentExecutionFilePathExtension != ".asmx")
                    //{
                    //    return;
                    //}


                    //如果是直接打开webSerivce页面，function参数会为空
                    if (function != "")
                    {

                        //检查是否例外
                        DataRow[] drs = _dt_token_function_istoken.Select(" f_function='" + function + "' and f_service='" + service + "'");
                        if (drs.Length == 0)
                        {

                            //获取token
                            object token = this.Request.QueryString["token"];
                            if (token != null)
                            {

                                object result = _iAccessData.GetSingle("select f_checktoken('" + token + "','" + service + "','" + function + "') from dual");
                                if (result != null)
                                {
                                    if (result.ToString() == "true")
                                    {

                                    }
                                    else
                                    {
                                        message = result.ToString();//token的验证信息
                                    }
                                }
                                else
                                {
                                    message = "其他未知错误";
                                }
                            }
                            else
                            {
                                message += "必须传入token";
                            }
                        }
                    }
                    #endregion

                }

                //如果不满足令牌，则直接退出，不进行后边的验证
                if (message != "")
                {
                    Response.Write(message);
                    Response.End();
                }

                //是否开启悲观锁
                if (ConfigWebServiceLock == "true")
                {
                    #region 防并发悲观锁

                    DataRow[] drs_lock = _dt_token_function_islock.Select(" f_function='" + function + "' and f_service='" + service + "'");
                    if (drs_lock.Length != 0)
                    {
                        string functionName = drs_lock[0]["f_value10"].ToString();
                        string lockResult = lockFunction(functionName);
                        switch (lockResult)
                        {
                            case "true":

                                break;
                            case "false":
                                message = "访问超时，请稍后再试";
                                break;
                            case "error":
                                message = "访问异常";
                                break;
                        }
                    }


                    #endregion
                }


                //如果不满足令牌，则直接退出，不进行后边的验证
                if (message != "")
                {
                    Response.Write(message);
                    Response.End();
                }



            }
            catch
            {

            }

        }


        private string lockFunction(string functionName)
        {
            string result = "";
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            if (System.Web.HttpContext.Current.Application[functionName] == null)
            {
                System.Web.HttpContext.Current.Application[functionName] = "0";
                System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
            }
            try
            {
                if (System.Web.HttpContext.Current.Application[functionName].ToString() == "0")
                {

                    System.Web.HttpContext.Current.Application.Lock();
                    System.Web.HttpContext.Current.Application[functionName] = "1";
                    System.Web.HttpContext.Current.Application.UnLock();
                    result = "true";

                }
                else
                {
                    int time = int.Parse(System.Web.HttpContext.Current.Application[functionName + "Times"].ToString());
                    time += 1;
                    if (time >= 6)
                    {
                        result = "false";


                    }
                    else
                    {
                        System.Web.HttpContext.Current.Application.Lock();
                        System.Web.HttpContext.Current.Application[functionName + "Times"] = time;
                        System.Web.HttpContext.Current.Application.UnLock();

                        System.Threading.Thread.Sleep(1000);

                        result = lockFunction(functionName);
                    }
                }
            }
            catch (Exception ex)
            {
                System.Web.HttpContext.Current.Application.Lock();
                System.Web.HttpContext.Current.Application[functionName] = "0";
                System.Web.HttpContext.Current.Application.UnLock();

                System.Web.HttpContext.Current.Application.Lock();
                System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
                System.Web.HttpContext.Current.Application.UnLock();

                result = "error";

            }

            return result;

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                _ilog.CommitLog();

                System.Collections.Specialized.NameObjectCollectionBase.KeysCollection kk = System.Web.HttpContext.Current.Application.Keys;
                System.Web.HttpContext.Current.Application.Lock();
                foreach (string str in kk)
                {
                    System.Web.HttpContext.Current.Application[str] = "0";
                }

                System.Web.HttpContext.Current.Application.UnLock();
            }
            catch
            {
            }
        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {
            try
            {
                _ilog.CommitLog();

            }
            catch
            {
            }
        }

        protected void Application_EndRequest(object sender, EventArgs e)
        {

            try
            {
                //请求服务的路径
                string path = this.Request.Path;
                //请求的方法
                string function = this.Request.PathInfo.Replace("/", "");
                //请求的service
                string service = path.Replace(function, "");
                string message = "";
                string EncryptResult = "";


                //是否开启悲观锁
                if (ConfigWebServiceLock == "true")
                {

                    #region 关闭悲观锁
                    DataRow[] drs_lock = _dt_token_function_islock.Select(" f_function='" + function + "' and f_service='" + service + "'");
                    if (drs_lock.Length != 0)
                    {
                        string functionName = drs_lock[0]["f_value10"].ToString();


                        System.Web.HttpContext.Current.Application.Lock();
                        System.Web.HttpContext.Current.Application[functionName] = "0";
                        System.Web.HttpContext.Current.Application.UnLock();

                        System.Web.HttpContext.Current.Application.Lock();
                        System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
                        System.Web.HttpContext.Current.Application.UnLock();
                    }

                    #endregion

                }


                if (ConfigWebServiceEncrypt == "true")
                {
                    #region 传输通道加密算法
                    //是否为webservice调用
                    //if (this.Request.CurrentExecutionFilePathExtension != ".asmx")
                    //{
                    //    return;
                    //}

                    if (function != "")
                    {
                        #region 加密

                        //检查是否例外
                        DataRow[] drs = _dt_token_function_isencrypt.Select(" f_function='" + function + "' and f_service='" + service + "'");
                        if (drs.Length == 0)
                        {

                            object token = this.Request.QueryString["token"];
                            if (token != null)
                            {
                                string output = Eva.Library.Web.Global.GetEndRequestString();
                                if (output == "")
                                {
                                    //数据读取失败
                                    //不处理
                                }
                                else
                                {
                                    IDictionary<string, string> dic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(output);
                                    IDictionary<string, string> resultDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(dic["d"]);
                                    if (resultDic["result"] == "true")
                                    {
                                        resultDic["message"] = Eva.Library.Format.FormatTextTool.WebEncryptString(resultDic["message"], token.ToString());
                                        resultDic["encryption"] = "true";
                                    }
                                    dic["d"] = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                                    EncryptResult = Eva.Library.Format.FormatEntityTool.FormatDicToJson(dic);

                                }

                            }
                            else
                            {
                                message += "必须传入token";
                            }


                        }
                        else
                        {
                            //配置不唯一
                            //不处理
                        }
                        #endregion
                    }
                    else
                    {
                        //方法读取失败
                        //不处理
                    }
                    #endregion

                }

                if (message != "")
                {
                    Response.ClearContent();
                    Response.Write(message);
                    Response.End();
                }
                else
                {
                    if (EncryptResult != "")
                    {
                        Response.ClearContent();
                        Response.Write(EncryptResult);
                    }
                }







            }
            catch
            {

            }

        }






    }
}