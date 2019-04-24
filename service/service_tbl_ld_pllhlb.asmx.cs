//------------------------------------------------------------------------------
//     此代码由代码生成器EasyQuickDevelopToolV3.CodeFactory生成。
//     代码生成器版本：V3.1
//     代码模板版本：V1.20140523
//     
//     再编辑此代码以完成业务功能。
//     再编辑过程中须遵循现有编码规范和程序逻辑。     
//     异常的编码可能会导致不正确的行为。
//     重新生成代码，这些更改将会丢失。
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;
using System.Web.Script.Services;
using System.Reflection;
using System.Data;
using System.Globalization;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// Service_tbl_ld_pllhlb 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
     [System.Web.Script.Services.ScriptService]
    public class service_tbl_ld_pllhlb : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_ld_pllhlb _idal_tbl_ld_pllhlb = new sara.dd.ldsw.dal.tbl_ld_pllhlb();
        private sara.dd.ldsw.idal.Itbl_ld_pllhyl _idal_tbl_ld_pllhyl = new sara.dd.ldsw.dal.tbl_ld_pllhyl();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.idal.Itbl_ld_yhb _idal_tbl_ld_yhb = new sara.dd.ldsw.dal.tbl_ld_yhb();
        private sara.dd.ldsw.idal.Itbl_ld_sbb _idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = null;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Add(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                sara.dd.ldsw.model.tbl_ld_pllhlb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_pllhlb>(json);
                if (model.f_drbh == "")
                {
                    model.f_drbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("lh", "", null);
                }
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_pllhlb.Add(model, null);

                NewLog("数据创建成功，创建的数据为：" + json, "sql_insert", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("数据创建失败，创建的数据为：" + json + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddCross(string json, string clientInf)
        {
            string result1 = this.Add(json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddList(string json, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                List<sara.dd.ldsw.model.tbl_ld_pllhlb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_pllhlb>(json);
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_pllhlb.AddList(modellist,null);

                NewLog("数据创建成功，创建的数据为：" + json, "sql_insert", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据创建失败，创建的数据为：" + json + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_insert", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddListCross(string json, string clientInf)
        {
            string result1 = this.AddList(json, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Update(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_pllhlb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_pllhlb>(json);
                
                columns = FormatColumns(columns).Replace("^", ",");
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_pllhlb.Update(model, columns, null);

                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Analysis(string json, string columns,string type, string clientInf)
        {
            //首先保存数据
            string result1 = this.Update(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_pllhlb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_pllhlb>(json);
                //获取附件根路径
               string FileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString()+ "fileuploadpath/";
               FileUpLoadRootPath = Eva.Library.Format.FormatTextTool.GetMapPath(FileUpLoadRootPath, HttpContext.Current.Server);

                //获取附件名称
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";

                sqlString = "SELECT fileuploadname FROM tbl_file_content WHERE menuid='"+model.f_drwj+"'";
                DataTable dt = _iAccessData.Query(sqlString).Tables[0];

                //判断是否上传附件
                if (dt.Rows.Count > 0 && dt.Rows[0]["fileuploadname"] != null && dt.Rows[0]["fileuploadname"].ToString().Length>0)
                {
                    DataTable importfile = commonclass.commonclass.ReadExcel(FileUpLoadRootPath+ dt.Rows[0]["fileuploadname"].ToString()).Tables[0];

                    //判断是否为正确的导入模板
                    if(importfile.Columns[0].ColumnName == "用户名")
                    {
                        //获取codeservice
                        sqlString = "";
                        sqlString += "select a.parentnodeid,a.nodename,a.nodevalue,(select '' from dual) as sys_orderid from T_CODE_CONTENT a where a.parentnodeid in ('0556','0555','0592','0516','0523','0524','0525','0526') and a.nodename is not null";
                        sqlString += " union all                                                                                                                                                                        ";
                        sqlString += " select(select 'cben' from dual) as parentnodeid,b.f_cbbh as nodename,to_char(b.sys_id) as nodevalue,(select '' from dual) as sys_orderid from tbl_ld_cben b where b.sys_delflag = '0'                               ";
                        sqlString += " union all                                                                                                                                                                        ";
                        sqlString += " select(select 'yhfz' from dual) as parentnodeid,c.f_fzmc as nodename,to_char(c.sys_id) as nodevalue,(select '' from dual) as sys_orderid from tbl_ldbm_yhfz c where c.sys_delflag = '0'                             ";
                        sqlString += " union all                                                                                                                                                                        ";
                        sqlString += " select(select 'khfz' from dual) as parentnodeid,d.f_fzmc as nodename,to_char(d.sys_id) as nodevalue,(select '' from dual) as sys_orderid from tbl_ldbm_khfz d where d.sys_delflag = '0'                             ";
                        sqlString += " union all                                                                                                                                                                         ";
                        sqlString += " select(select 'sbfz' from dual) as parentnodeid,e.f_fzmc as nodename,to_char(e.sys_id) as nodevalue,(select '' from dual) as sys_orderid from tbl_ldbm_sbfz e where e.sys_delflag = '0'                             ";
                        sqlString += " union all                                                                                                                                                                         ";
                        sqlString += " select(select 'dycq' from dual) as parentnodeid,f.f_mc as nodename,to_char(f.sys_id) as nodevalue,f.sys_orderid as sys_orderid from tbl_ldbm_dycq f where f.sys_delflag = '0'                               ";
                        DataTable codedt = _iAccessData.Query(sqlString).Tables[0];

                        //创建子表对象list
                        List<sara.dd.ldsw.model.tbl_ld_pllhyl> modellist = new List<model.tbl_ld_pllhyl>();

                        DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                        dtFormat.ShortDatePattern = "yyyy/MM/dd";

                        IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                        System.DateTime currentTime = new System.DateTime();
                        currentTime = System.DateTime.Now;

                        DateTime blankTime = Convert.ToDateTime("1900/01/01", dtFormat);
                        #region 循环Excel实例化子表对象
                        for (int i = 0; i < importfile.Rows.Count; i++)
                        {
                            DataRow dr = importfile.Rows[i];

                            //空行判断,如果本行是空行直接跳到下一行
                            if (dr.IsNull(0) && dr.IsNull(1))
                            {
                                bool flag = true;
                                for (int j = 0; j < dr.ItemArray.Count(); j++)
                                {
                                    if (!dr.IsNull(j))
                                    {
                                        flag = false;
                                        break;
                                    }
                                }
                                if (flag)
                                {
                                    continue;
                                }

                            }

                            //创建子表实例化对象
                            sara.dd.ldsw.model.tbl_ld_pllhyl tempmodel = new sara.dd.ldsw.model.tbl_ld_pllhyl();
                            tempmodel.f_yzqk = "false";
                            tempmodel.fk_tbl_ld_pllhlb_sys_id = model.sys_id.ToString();
                            tempmodel.sys_creatuserid = userInfDic["userid"].ToString();
                            tempmodel.sys_creatusername = userInfDic["username"].ToString();
                            tempmodel.sys_lastedituserid = userInfDic["userid"].ToString();
                            tempmodel.sys_lasteditusername = userInfDic["username"].ToString();
                            tempmodel.sys_creatdate = currentTime;
                            tempmodel.sys_lasteditdate = currentTime;
                            tempmodel.sys_deldate = blankTime;
                            tempmodel.sys_delflag = "0";
                            tempmodel.f_sbfj = commonclass.filecontrol.GetNewFileId(null);
                            tempmodel.f_htfj = commonclass.filecontrol.GetNewFileId(null);
                            tempmodel.f_sfzfj = commonclass.filecontrol.GetNewFileId(null);
                            tempmodel.f_qtfj = commonclass.filecontrol.GetNewFileId(null);

                            //非空验证
                            if (dr.IsNull(0) || dr.IsNull(1) || dr.IsNull(24) || dr.IsNull(25) || dr.IsNull(26) || dr.IsNull(34) || dr.IsNull(36)|| dr.IsNull(44))
                            {
                                tempmodel.f_yzqk = "true";
                            }
                            //立户类型判断
                            if(type == "0")
                            {
                                //居民立户
                                if (dr[44].ToString().StartsWith("DH") || dr[34].ToString() == "客服中心大用户表" || dr[36].ToString() != "居民生活用水")
                                {
                                    tempmodel.f_yzqk = "true";
                                }
                            }
                            else if(type == "1") 
                            {
                                //大客户立户

                                if (!(dr[44].ToString().StartsWith("DH")) || dr[34].ToString() != "客服中心大用户表" || !(dr[36].ToString() != "居民生活用水"))
                                {
                                    tempmodel.f_yzqk = "true";
                                }
                            }

                            #region 对象赋值
                            tempmodel.f_yhm = dr[0].ToString();
                            tempmodel.f_jfm = dr[1].ToString();
                            tempmodel.f_dz = dr[2].ToString();
                            if (!dr.IsNull(3))
                            {
                                DataRow[] yhfz = codedt.Select("parentnodeid = 'yhfz' and nodename = '" + dr[3].ToString() + "'");
                                if (yhfz.Length > 0)
                                {
                                    tempmodel.f_yhfz = dr[3].ToString();
                                    tempmodel.f_yhfzid = yhfz[0]["nodevalue"].ToString();
                                }

                            }
                            tempmodel.f_dh = dr[4].ToString();
                            if (!dr.IsNull(5))
                            {
                                DataRow[] dy = codedt.Select("parentnodeid = 'dycq' and nodename = '" + dr[5].ToString() + "'");
                                if (dy.Length > 0)
                                {
                                    tempmodel.f_dy = dr[5].ToString();
                                    tempmodel.f_dyid = dy[0]["nodevalue"].ToString();
                                }

                            }
                            if (!dr.IsNull(6))
                            {
                                DataRow[] sc = codedt.Select("parentnodeid = 'dycq' and nodename = '" + dr[6].ToString() + "'");
                                if (sc.Length > 0)
                                {
                                    tempmodel.f_sc = dr[6].ToString();
                                    tempmodel.f_scid = sc[0]["nodevalue"].ToString();
                                }

                            }
                            string qyorderid = "";
                            if (!dr.IsNull(7))
                            {
                                DataRow[] qy = codedt.Select("parentnodeid = 'dycq' and nodename = '" + dr[7].ToString() + "'");
                                if (qy.Length > 0)
                                {
                                    tempmodel.f_qy = dr[7].ToString();
                                    tempmodel.f_qyid = qy[0]["nodevalue"].ToString();
                                    qyorderid = qy[0]["sys_orderid"].ToString();
                                }

                            }
                            if (!dr.IsNull(8) && qyorderid != "")
                            {
                                DataRow[] pq = codedt.Select("parentnodeid = 'dycq' and nodename = '" + dr[8].ToString() + "' and sys_orderid like '" + qyorderid + "%'");
                                if (pq.Length > 0)
                                {
                                    tempmodel.f_pq = dr[8].ToString();
                                    tempmodel.f_pqid = pq[0]["nodevalue"].ToString();
                                }

                            }
                            if (!dr.IsNull(9))
                            {
                                tempmodel.f_khrq = Convert.ToDateTime(dr[9].ToString(), dtFormat);
                            }
                            else
                            {
                                tempmodel.f_khrq = blankTime;
                            }

                            if (!dr.IsNull(10))
                            {
                                if (dr[10].ToString() == "是")
                                {
                                    tempmodel.f_sfts = "true";
                                }
                                else
                                {
                                    tempmodel.f_sfts = "false";
                                }
                            }
                            else
                            {
                                tempmodel.f_sfts = "false";
                            }

                            if (!dr.IsNull(11))
                            {
                                DataRow[] tsyh = codedt.Select("parentnodeid = '0592' and nodename = '" + dr[11].ToString() + "'");
                                if (tsyh.Length > 0)
                                {
                                    tempmodel.f_tsyx = dr[11].ToString();
                                    tempmodel.f_tsyxid = tsyh[0]["nodevalue"].ToString();
                                }

                            }

                            tempmodel.f_tsyxzh = dr[12].ToString();
                            tempmodel.f_htbh = dr[13].ToString();
                            tempmodel.f_sfzh = dr[14].ToString();

                            if (!dr.IsNull(15))
                            {
                                if (dr[15].ToString() == "是")
                                {
                                    tempmodel.f_sfzzs = "true";
                                }
                                else
                                {
                                    tempmodel.f_sfzzs = "false";
                                }
                            }
                            else
                            {
                                tempmodel.f_sfzzs = "false";
                            }

                            if (!dr.IsNull(16))
                            {
                                DataRow[] yhzt = codedt.Select("parentnodeid = '0516' and nodename = '" + dr[16].ToString() + "'");
                                if (yhzt.Length > 0)
                                {
                                    tempmodel.f_yhzt = dr[16].ToString();
                                    tempmodel.f_yhztid = yhzt[0]["nodevalue"].ToString();
                                }
                                else
                                {
                                    tempmodel.f_yhzt = "启用";
                                    tempmodel.f_yhztid = "0";
                                }
                            }
                            else
                            {
                                tempmodel.f_yhzt = "启用";
                                tempmodel.f_yhztid = "0";
                            }

                            if (!dr.IsNull(17))
                            {
                                tempmodel.f_htqdrq = Convert.ToDateTime(dr[17].ToString(), dtFormat);
                            }
                            else
                            {
                                tempmodel.f_htqdrq = blankTime;
                            }
                            tempmodel.f_yhbz = dr[18].ToString();

                            if (!dr.IsNull(19))
                            {
                                DataRow[] sbfz = codedt.Select("parentnodeid = 'sbfz' and nodename = '" + dr[19].ToString() + "'");
                                if (sbfz.Length > 0)
                                {
                                    tempmodel.f_sbfz = dr[19].ToString();
                                    tempmodel.f_sbfzid = sbfz[0]["nodevalue"].ToString();
                                }

                            }
                            tempmodel.f_sbpp = dr[20].ToString();
                            tempmodel.f_mph = dr[21].ToString();
                            tempmodel.f_rs = dr[22].ToString();
                            if (!dr.IsNull(23))
                            {
                                DataRow[] sbkj = codedt.Select("parentnodeid = '0523' and nodename = '" + dr[23].ToString() + "'");
                                if (sbkj.Length > 0)
                                {
                                    tempmodel.f_sbkj = dr[23].ToString();
                                    tempmodel.f_sbkjid = sbkj[0]["nodevalue"].ToString();
                                }

                            }

                            if (!dr.IsNull(24))
                            {
                                DataRow[] sblx = codedt.Select("parentnodeid = '0524' and nodename = '" + dr[24].ToString() + "'");
                                if (sblx.Length > 0)
                                {
                                    tempmodel.f_sblx = dr[24].ToString();
                                    tempmodel.f_sblxid = sblx[0]["nodevalue"].ToString();
                                }

                            }
                            if (!dr.IsNull(25))
                            {
                                DataRow[] jllx = codedt.Select("parentnodeid = '0525' and nodename = '" + dr[25].ToString() + "'");
                                if (jllx.Length > 0)
                                {
                                    tempmodel.f_jllx = dr[25].ToString();
                                    tempmodel.f_jllxid = jllx[0]["nodevalue"].ToString();
                                }

                            }

                            tempmodel.f_cszm = dr[26].ToString();
                            tempmodel.f_ljgl = dr[27].ToString();
                            tempmodel.f_nljgl = dr[28].ToString();

                            if (!dr.IsNull(29))
                            {
                                DataRow[] sbzt = codedt.Select("parentnodeid = '0526' and nodename = '" + dr[29].ToString() + "'");
                                if (sbzt.Length > 0)
                                {
                                    tempmodel.f_sbzt = dr[29].ToString();
                                    tempmodel.f_sbztid = sbzt[0]["nodevalue"].ToString();
                                }
                                else
                                {
                                    tempmodel.f_sbzt = "启用";
                                    tempmodel.f_sbztid = "0";
                                }
                            }
                            else
                            {
                                tempmodel.f_sbzt = "启用";
                                tempmodel.f_sbztid = "0";
                            }

                            if (!dr.IsNull(30))
                            {
                                if (dr[30].ToString() == "是")
                                {
                                    tempmodel.f_qfzt = "true";
                                }
                                else
                                {
                                    tempmodel.f_qfzt = "false";
                                }
                            }
                            else
                            {
                                tempmodel.f_qfzt = "false";
                            }

                            if (!dr.IsNull(31))
                            {
                                tempmodel.f_azrq = Convert.ToDateTime(dr[31].ToString(), dtFormat);
                            }
                            else
                            {
                                tempmodel.f_azrq = blankTime;
                            }
                            tempmodel.f_synx = dr[32].ToString();
                            tempmodel.f_sbbz = dr[33].ToString();

                            if (!dr.IsNull(34))
                            {
                                DataRow[] khfz = codedt.Select("parentnodeid = 'khfz' and nodename = '" + dr[34].ToString() + "'");
                                if (khfz.Length > 0)
                                {
                                    tempmodel.f_khfz = dr[34].ToString();
                                    tempmodel.f_khfzid = khfz[0]["nodevalue"].ToString();
                                }

                            }

                            tempmodel.f_ycje = dr[35].ToString();
                            if (!dr.IsNull(36))
                            {
                                DataRow[] yslx = codedt.Select("parentnodeid = '0555' and nodename = '" + dr[36].ToString() + "'");
                                if (yslx.Length > 0)
                                {
                                    tempmodel.f_yslx = dr[36].ToString();
                                    tempmodel.f_yslxid = yslx[0]["nodevalue"].ToString();
                                }

                            }
                            tempmodel.f_tbbh = dr[37].ToString();

                            if (!dr.IsNull(38))
                            {
                                if (dr[38].ToString() == "是")
                                {
                                    tempmodel.f_sfjlbjf = "true";
                                }
                                else
                                {
                                    tempmodel.f_sfjlbjf = "false";
                                }
                            }
                            else
                            {
                                tempmodel.f_sfjlbjf = "false";
                            }

                            if (!dr.IsNull(39))
                            {
                                tempmodel.f_zhcbrq = Convert.ToDateTime(dr[39].ToString(), dtFormat);
                            }
                            else
                            {
                                DateTime DateNow = DateTime.Now.AddMonths(-1);
                                DateTime DateBegin = new DateTime(DateNow.Year, DateNow.Month, 1);
                                DateTime DateEnd = DateBegin.AddMonths(1).AddDays(-1);
                                tempmodel.f_zhcbrq = DateEnd;
                            }
                            tempmodel.f_djjzsf = dr[40].ToString();
                            tempmodel.f_djjzpwf = dr[41].ToString();
                            tempmodel.f_sqysl = dr[42].ToString();
                            tempmodel.f_jhysl = dr[43].ToString();
                            if (!dr.IsNull(44))
                            {
                                DataRow[] cbbh = codedt.Select("parentnodeid = 'cben' and nodename = '" + dr[44].ToString() + "'");
                                if (cbbh.Length > 0)
                                {
                                    tempmodel.f_cbbh = dr[44].ToString();
                                    tempmodel.f_cbbhid = cbbh[0]["nodevalue"].ToString();
                                }

                            }
                            tempmodel.f_cbxh = dr[45].ToString();
                            if (!dr.IsNull(46))
                            {
                                DataRow[] khzt = codedt.Select("parentnodeid = '0556' and nodename = '" + dr[45].ToString() + "'");
                                if (khzt.Length > 0)
                                {
                                    tempmodel.f_khzt = dr[46].ToString();
                                    tempmodel.f_khztid = khzt[0]["nodevalue"].ToString();
                                }
                                else
                                {
                                    tempmodel.f_khzt = "启用";
                                    tempmodel.f_khztid = "0";
                                }

                            }
                            else
                            {
                                tempmodel.f_khzt = "启用";
                                tempmodel.f_khztid = "0";
                            }
                            tempmodel.f_khbz = dr[47].ToString();

                            #endregion

                            modellist.Add(tempmodel);
                        }
                        #endregion
                        _idal_tbl_ld_pllhyl.AddList(modellist, null);

                        resultDic["result"] = "true";
                        resultDic["message"] = result1;
                    }
                    else
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = "导入模板错误，请下载正确的导入模板进行导入！";
                    }

                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "请先上传导入文件再进行分析！";
                }

                NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Import(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                sara.dd.ldsw.model.tbl_ld_pllhlb model = Eva.Library.Format.FormatEntityTool.FormatJsonToModel<sara.dd.ldsw.model.tbl_ld_pllhlb>(json);

                //判断待导入数据是否存在异常
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";

                sqlString = "SELECT count(*) AS count FROM tbl_ld_pllhyl WHERE fk_tbl_ld_pllhlb_sys_id ='" + model.sys_id + "' AND f_yzqk='true' AND sys_delflag='0'";
                int errcount = int.Parse(_iAccessData.Query(sqlString).Tables[0].Rows[0]["count"].ToString());
                if(errcount > 0)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "导入未进行，待导入数据中存在"+errcount+"条异常数据，请修正后再导入。";

                }
                else
                {
                    //获取抄本信息
                    sqlString = "select * from tbl_ld_cben where sys_delflag = '0' AND f_ztid='0'";
                    DataTable cbdt = _iAccessData.Query(sqlString).Tables[0];

                    //userinfo信息
                    IDictionary<String, String> userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                    //时间信息
                    DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();

                    dtFormat.ShortDatePattern = "yyyy/MM/dd";

                    System.DateTime currentTime = new System.DateTime();
                    currentTime = System.DateTime.Now;

                    DateTime blankTime = Convert.ToDateTime("1900/01/01", dtFormat);
                    //获取待导入数据
                    sqlString = "SELECT * FROM tbl_ld_pllhyl WHERE fk_tbl_ld_pllhlb_sys_id ='" + model.sys_id + "' AND sys_delflag='0'";
                    DataTable dt = _iAccessData.Query(sqlString).Tables[0];
                    #region 循环导入
                    for(int i = 0; i < dt.Rows.Count; i++)
                    {
                        DataRow dr = dt.Rows[i];

                        //新建用户、客户、水表对象
                        sara.dd.ldsw.model.tbl_ld_khb khmodel = new model.tbl_ld_khb();
                        sara.dd.ldsw.model.tbl_ld_sbb sbmodel = new model.tbl_ld_sbb();
                        sara.dd.ldsw.model.tbl_ld_yhb yhmodel = new model.tbl_ld_yhb();
                        #region 实例化用户对象
                        yhmodel.f_yhbh = commonclass.commonclass.getBusinessNum("yh", dr["f_sblxid"].ToString());
                        yhmodel.f_ztyhh = yhmodel.f_yhbh;
                        //客户编号先定义
                        khmodel.f_khbh = commonclass.commonclass.getBusinessNum("kh", dr["f_sblxid"].ToString());
                        khmodel.f_ztkhh = khmodel.f_khbh;

                        yhmodel.sys_creatuserid = dr["sys_creatuserid"].ToString();
                        yhmodel.sys_creatusername = dr["sys_creatusername"].ToString();
                        yhmodel.sys_creatdate = currentTime;
                        yhmodel.sys_lastedituserid = dr["sys_lastedituserid"].ToString();
                        yhmodel.sys_lasteditusername = dr["sys_lasteditusername"].ToString();
                        yhmodel.sys_lasteditdate = currentTime;
                        yhmodel.sys_deldate = blankTime;
                        yhmodel.sys_delflag = "0";

                        yhmodel.f_yhm = dr["f_yhm"].ToString();
                        yhmodel.f_jfm = dr["f_jfm"].ToString();
                        yhmodel.f_dz = dr["f_dz"].ToString();
                        yhmodel.f_yhfz = dr["f_yhfz"].ToString();
                        yhmodel.f_yhfzid = dr["f_yhfzid"].ToString();
                        yhmodel.f_dh = dr["f_dh"].ToString();
                        yhmodel.f_dy = dr["f_dy"].ToString();
                        yhmodel.f_dyid = dr["f_dyid"].ToString();
                        yhmodel.f_sc = dr["f_sc"].ToString();
                        yhmodel.f_scid = dr["f_scid"].ToString();
                        yhmodel.f_qy = dr["f_qy"].ToString();
                        yhmodel.f_qyid = dr["f_qyid"].ToString();
                        yhmodel.f_pq = dr["f_pq"].ToString();
                        yhmodel.f_pqid = dr["f_pqid"].ToString();
                        yhmodel.f_khrq = Convert.ToDateTime(dr["f_khrq"].ToString(), dtFormat);
                        yhmodel.f_tsyx = dr["f_tsyx"].ToString();
                        yhmodel.f_tsyxid = dr["f_tsyxid"].ToString();
                        yhmodel.f_tsyxzh = dr["f_tsyxzh"].ToString();
                        yhmodel.f_htbh = dr["f_htbh"].ToString();
                        yhmodel.f_htfj = dr["f_htfj"].ToString();
                        yhmodel.f_sfzh = dr["f_sfzh"].ToString();
                        yhmodel.f_sfzfj = dr["f_sfzfj"].ToString();
                        yhmodel.f_sfzzs = dr["f_sfzzs"].ToString();
                        yhmodel.f_zt = dr["f_yhzt"].ToString();
                        yhmodel.f_ztid = dr["f_yhztid"].ToString();
                        yhmodel.f_bz = dr["f_yhbz"].ToString();
                        yhmodel.f_khbh = khmodel.f_khbh;
                        yhmodel.f_qtfj = dr["f_qtfj"].ToString();
                        yhmodel.f_htqdrq = Convert.ToDateTime(dr["f_htqdrq"].ToString(), dtFormat);

                        #endregion
                        //插入用户
                        string yhbhid = _idal_tbl_ld_yhb.Add(yhmodel,null);
                        #region 实例化水表对象
                        sbmodel.f_sbbh = commonclass.commonclass.getBusinessNum("sb", dr["f_sblxid"].ToString());
                        sbmodel.f_ztsbh = sbmodel.f_sbbh;
                        sbmodel.sys_creatuserid = dr["sys_creatuserid"].ToString();
                        sbmodel.sys_creatusername = dr["sys_creatusername"].ToString();
                        sbmodel.sys_creatdate = currentTime;
                        sbmodel.sys_lastedituserid = dr["sys_lastedituserid"].ToString();
                        sbmodel.sys_lasteditusername = dr["sys_lasteditusername"].ToString();
                        sbmodel.sys_lasteditdate = currentTime;
                        sbmodel.sys_deldate = blankTime;
                        sbmodel.sys_delflag = "0";

                        sbmodel.f_lxth = sbmodel.f_sbbh.Substring(sbmodel.f_sbbh.Length - 7, 7);
                        sbmodel.f_sbfz = dr["f_sbfz"].ToString();
                        sbmodel.f_sbfzid = dr["f_sbfzid"].ToString();
                        sbmodel.f_sbpp = dr["f_sbpp"].ToString();
                        sbmodel.f_mph = dr["f_mph"].ToString();
                        sbmodel.f_sbdz = dr["f_dz"].ToString();
                        sbmodel.f_khbh = khmodel.f_khbh;
                        sbmodel.f_rs = dr["f_rs"].ToString();
                        sbmodel.f_sbkj = dr["f_sbkj"].ToString();
                        sbmodel.f_sbkjid = dr["f_sbkjid"].ToString();
                        sbmodel.f_sblx= dr["f_sblx"].ToString();
                        sbmodel.f_sblxid = dr["f_sblxid"].ToString();
                        sbmodel.f_jllx = dr["f_jllx"].ToString();
                        sbmodel.f_jllxid = dr["f_jllxid"].ToString();
                        sbmodel.f_cszm = dr["f_cszm"].ToString();
                        sbmodel.f_bqzm = sbmodel.f_cszm;
                        sbmodel.f_sqzm = sbmodel.f_cszm;
                        sbmodel.f_sqsl = "0";
                        sbmodel.f_ljgl = dr["f_ljgl"].ToString();
                        sbmodel.f_qsqpjsl = "0";
                        sbmodel.f_qlqpjsl = "0";
                        sbmodel.f_zt = dr["f_sbzt"].ToString();
                        sbmodel.f_ztid = dr["f_sbztid"].ToString();
                        sbmodel.f_bz = dr["f_sbbz"].ToString();
                        sbmodel.f_bqsl = "0";
                        sbmodel.f_nljgl = dr["f_nljgl"].ToString();
                        sbmodel.f_azrq = Convert.ToDateTime(dr["f_azrq"].ToString(), dtFormat);
                        sbmodel.f_qfzt = dr["f_qfzt"].ToString();
                        sbmodel.f_fj = dr["f_sbfj"].ToString();
                        sbmodel.f_synx = dr["f_synx"].ToString();
                        #endregion
                        //插入水表
                        string sbbhid = _idal_tbl_ld_sbb.Add(sbmodel, null);
                        #region 实例化客户对象

                        khmodel.sys_creatuserid = dr["sys_creatuserid"].ToString();
                        khmodel.sys_creatusername = dr["sys_creatusername"].ToString();
                        khmodel.sys_creatdate = currentTime;
                        khmodel.sys_lastedituserid = dr["sys_lastedituserid"].ToString();
                        khmodel.sys_lasteditusername = dr["sys_lasteditusername"].ToString();
                        khmodel.sys_lasteditdate = currentTime;
                        khmodel.sys_deldate = blankTime;
                        khmodel.sys_delflag = "0";

                        khmodel.f_khfz = dr["f_khfz"].ToString();
                        khmodel.f_khfzid = dr["f_khfzid"].ToString();
                        khmodel.f_ycje = dr["f_ycje"].ToString();
                        khmodel.f_yslx = dr["f_yslx"].ToString();
                        khmodel.f_yslxid = dr["f_yslxid"].ToString();
                        khmodel.f_tbbh = dr["f_tbbh"].ToString();
                        khmodel.f_sfjlbjf = dr["f_sfjlbjf"].ToString();
                        khmodel.f_zt = dr["f_khzt"].ToString();
                        khmodel.f_ztid = dr["f_khztid"].ToString();
                        khmodel.f_bz = dr["f_khbz"].ToString();
                        khmodel.f_cbbh = dr["f_cbbh"].ToString();
                        khmodel.f_cbbhid = dr["f_cbbhid"].ToString();
                        if (dr["f_cbxh"].ToString() != null && dr["f_cbxh"].ToString() != "")
                        {
                            khmodel.f_cbxh = dr["f_cbxh"].ToString();
                        }
                        else
                        {
                            khmodel.f_cbxh = khmodel.f_khbh;
                        }
                           
                        if(dr["f_cbbhid"].ToString() != null && dr["f_cbbhid"].ToString() != "")
                        {
                            DataRow[] cbinfo = cbdt.Select("sys_id = '" + dr["f_cbbhid"].ToString() + "'");
                            if (cbinfo.Length > 0)
                            {
                                khmodel.f_cbyxm = cbinfo[0]["f_cbymc"].ToString();
                                khmodel.f_cbyid = cbinfo[0]["f_cbyid"].ToString();
                                khmodel.f_cbzq = cbinfo[0]["f_cbzq"].ToString();
                                khmodel.f_cbmc = cbinfo[0]["f_cbmc"].ToString();
                            }
                        }


                        khmodel.f_yhbh = yhmodel.f_yhbh;
                        khmodel.f_yhbhid = yhbhid;
                        khmodel.f_ztyhh = yhmodel.f_ztyhh;
                        khmodel.f_yhm = yhmodel.f_yhm;
                        khmodel.f_jfm = yhmodel.f_jfm;
                        khmodel.f_yhfz = yhmodel.f_yhfz;
                        khmodel.f_yhfzid = yhmodel.f_yhfzid;
                        khmodel.f_dz = yhmodel.f_dz;
                        khmodel.f_dh = yhmodel.f_dh;
                        khmodel.f_dy = yhmodel.f_dy;
                        khmodel.f_dyid = yhmodel.f_dyid;
                        khmodel.f_sc = yhmodel.f_sc;
                        khmodel.f_scid = yhmodel.f_scid;
                        khmodel.f_qy = yhmodel.f_qy;
                        khmodel.f_qyid = yhmodel.f_qyid;
                        khmodel.f_pq = yhmodel.f_pq;
                        khmodel.f_pqid = yhmodel.f_pqid;
                        khmodel.f_tsyxzh = yhmodel.f_tsyxzh;
                        khmodel.f_hth = yhmodel.f_htbh;
                        khmodel.f_sfzh = yhmodel.f_sfzh;
                        khmodel.f_khrq = yhmodel.f_khrq;

                        khmodel.f_sbbh = sbmodel.f_sbbh;
                        khmodel.f_sbbhid = sbbhid;
                        khmodel.f_bqzm = sbmodel.f_bqzm;
                        khmodel.f_sqzm = sbmodel.f_sqzm;
                        khmodel.f_bqsl = sbmodel.f_bqsl;
                        khmodel.f_sqsl = sbmodel.f_sqsl;
                        khmodel.f_qsqpjsl = sbmodel.f_qsqpjsl;
                        khmodel.f_qlqpjsl = sbmodel.f_qlqpjsl;
                        khmodel.f_ljgl = sbmodel.f_ljgl;
                        khmodel.f_nljgl = sbmodel.f_nljgl;
                        khmodel.f_lxth = sbmodel.f_lxth;
                        khmodel.f_sblx = sbmodel.f_sblx;
                        khmodel.f_sblxid = sbmodel.f_sblxid;
                        khmodel.f_jllx = sbmodel.f_jllx;
                        khmodel.f_jllxid = sbmodel.f_jllxid;
                        khmodel.f_ztsbh = sbmodel.f_ztsbh;
                        khmodel.f_rs = sbmodel.f_rs;
                        khmodel.f_sbkj = sbmodel.f_sbkj;
                        khmodel.f_sbkjid = sbmodel.f_sbkjid;
                        khmodel.f_sbfz = sbmodel.f_sbfz;
                        khmodel.f_sbfzid = sbmodel.f_sbfzid;
                        khmodel.f_sbdz = sbmodel.f_sbdz;

                        khmodel.f_zhcbrq = Convert.ToDateTime(dr["f_zhcbrq"].ToString(), dtFormat);
                        khmodel.f_ljqf = dr["f_ljqf"].ToString();
                        khmodel.f_tjjzsf = dr["f_djjzsf"].ToString();
                        khmodel.f_tjjzpwf = dr["f_djjzpwf"].ToString();
                        khmodel.f_sqysl = dr["f_sqysl"].ToString();
                        khmodel.f_jhysl = dr["f_jhysl"].ToString();
                        khmodel.f_ickljgl = dr["f_ickljgl"].ToString();
                        #endregion
                        //插入客户
                        _idal_tbl_ld_khb.Add(khmodel, null);

                        //更新子表的客户编号
                        string updatesql = "UPDATE tbl_ld_pllhyl SET f_khbh='" + khmodel.f_khbh + "' where sys_id='"+dr["sys_id"].ToString() + "'";
                        _iAccessData.ExecuteSql(updatesql);
                    }
                    #endregion
                    model.f_zt = "已导入";
                    model.f_ztid = "2";

                    columns = FormatColumns(columns).Replace("^", ",");
                    resultDic["result"] = "true";
                    resultDic["message"] = _idal_tbl_ld_pllhlb.Update(model, columns, null);

                    NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);

                    
                }

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateCross(string json, string columns, string clientInf)
        {
            string result1 = this.Update(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateList(string json, string columns, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                 List<sara.dd.ldsw.model.tbl_ld_pllhlb> modellist = Eva.Library.Format.FormatEntityTool.FormatJsonToModelList<sara.dd.ldsw.model.tbl_ld_pllhlb>(json);
                 columns = FormatColumns(columns).Replace("^", ",");
                 resultDic["result"] = "true";
                 resultDic["message"] = _idal_tbl_ld_pllhlb.UpdateList(modellist, columns,null);

                 NewLog("数据更新成功，更新的数据为：json：" + json + "，columns：" + columns, "sql_update", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据更新失败，更新的数据为：json：" + json + "，columns：" + columns + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_update", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void UpdateListCross(string json, string columns, string clientInf)
        {
            string result1 = this.UpdateList(json, columns, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Delete(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {    
                //删除附件的功能
                string fileIDs = "";
                string columnsString = "";
                
                columnsString += "f_drwj,";
                
                columnsString += "f_bcfj,";
                
                columnsString = columnsString.TrimEnd(',');
                List <sara.dd.ldsw.model.tbl_ld_pllhlb> l_tbl_ld_pllhlb = _idal_tbl_ld_pllhlb.GetList(whereString, "", columnsString, "", "", null);
                foreach (sara.dd.ldsw.model.tbl_ld_pllhlb model in l_tbl_ld_pllhlb)
                {
                    
                    fileIDs += model.f_drwj + ",";
                    
                    fileIDs += model.f_bcfj + ",";
                                       
                }
                fileIDs = fileIDs.TrimEnd(',');
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);

                //删除子表的方法
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sqlString = "";              
                 
                 sqlString = "delete from tbl_ld_pllhyl where fk_tbl_ld_pllhlb_sys_id in (select sys_id from tbl_ld_pllhlb where " + whereString + ")";
                 _iAccessData.ExecuteSql(sqlString);
                 

                  //加入删除子表附件文件的方法

                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_pllhlb.Delete(whereString, null);
                NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据删除失败，删除的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_delete", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void DeleteCross(string whereString, string clientInf)
        {
            string result1 = this.Delete(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string LogicDelete(string delUserId, string delUserName, string delDate, string whereString, string clientInf)
        {
          
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_pllhlb.LogicDelete(delUserId, delUserName, delDate, whereString,null);

                NewLog("数据删除成功，删除的数据条件为：" + whereString, "sql_delete", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据删除失败，删除的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_delete", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void LogicDeleteCross(string delUserId, string delUserName, string delDate, string whereString, string clientInf)
        {
            string result1 = this.LogicDelete(delUserId, delUserName, delDate, whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCount(string whereString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {               
                resultDic["result"] = "true";
                resultDic["message"] = _idal_tbl_ld_pllhlb.GetCount(whereString,null);

                NewLog("数据统计成功，统计的数据条件为：" + whereString, "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据统计失败，统计的数据条件为：" + whereString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetCountCross(string whereString, string clientInf)
        {
            string result1 = this.GetCount(whereString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatModelListToJson<sara.dd.ldsw.model.tbl_ld_pllhlb>(_idal_tbl_ld_pllhlb.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString,null), columnsString);

                string message = "{\"total\":\"" + _idal_tbl_ld_pllhlb.GetCount(whereString,null) + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

                NewLog("数据查询成功，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，pageSizeString：" + pageSizeString + "，pageIndexString：" + pageIndexString + "", "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据查询失败，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，pageSizeString：" + pageSizeString + "，pageIndexString：" + pageIndexString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetListCross(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf)
        {
            string result1 = this.GetList(whereString, orderByString, columnsString, pageSizeString, pageIndexString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetListForApp(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = FormatColumns(columnsString).Replace("^", ",");

                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_idal_tbl_ld_pllhlb.GetDataTableForApp(whereString, orderByString, columnsString, countString, stepString, null));

                string message = "{\"total\":\"" + _idal_tbl_ld_pllhlb.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

                NewLog("数据查询成功，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，countString：" + countString + "，stepString：" + stepString + "", "sql_select", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

                NewLog("数据查询失败，查询的数据条件为：whereString：" + whereString + "，orderByString：" + orderByString + "，columnsString：" + columnsString + "，countString：" + countString + "，stepString：" + stepString + "，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "sql_select", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetListForAppCross(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetListForApp(whereString, orderByString, columnsString, countString, stepString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
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
                		
				columns += "^" + "f_value1";
                		
				columns += "^" + "f_value2";
                		
				columns += "^" + "f_value3";
                		
				columns += "^" + "f_value4";
                		
				columns += "^" + "f_value5";
                		
				columns += "^" + "f_value6";
                		
				columns += "^" + "f_value7";
                		
				columns += "^" + "f_value8";
                		
				columns += "^" + "f_value9";
                		
				columns += "^" + "f_value10";
                		
				columns += "^" + "f_drbh";
                		
				columns += "^" + "f_fxsj";
                		
				columns += "^" + "fk_tbl_maintable_sys_id";
                		
				columns += "^" + "f_drr";
                		
				columns += "^" + "f_drsj";
                		
				columns += "^" + "f_drrid";
                		
				columns += "^" + "f_zt";
                		
				columns += "^" + "f_ztid";
                		
				columns += "^" + "f_drwj";
                		
				columns += "^" + "f_bcfj";
                		
				columns += "^" + "f_bz";
                
               
            }
            return columns.TrimStart('^');
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="messageString"></param>
        /// <param name="logClassString">
        /// sql_select,sql_insert,sql_update,sql_delete,
        /// function_select,function_edit,
        /// server_select,server_edit
        /// message_result,message_error,message_prepare
        /// </param>
        /// <param name="clientInfoJsonString"></param>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        private void NewLog(string messageString, string logClassString, string clientInfoJsonString)
        {

            Eva.Library.Log.LogContentModel lcm = new Eva.Library.Log.LogContentModel();
            switch (logClassString.ToLower())
            {
                case "sql_select":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_select;
                    break;
                case "sql_insert":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_insert;
                    break;
                case "sql_update":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_update;
                    break;
                case "sql_delete":
                    lcm.f_logclass = Eva.Library.Log.LogClass.sql_delete;
                    break;
                case "function_select":
                    lcm.f_logclass = Eva.Library.Log.LogClass.function_select;
                    break;
                case "function_edit":
                    lcm.f_logclass = Eva.Library.Log.LogClass.function_edit;
                    break;
                case "server_select":
                    lcm.f_logclass = Eva.Library.Log.LogClass.server_select;
                    break;
                case "server_edit":
                    lcm.f_logclass = Eva.Library.Log.LogClass.server_edit;
                    break;
                case "message_result":
                    lcm.f_logclass = Eva.Library.Log.LogClass.message_result;
                    break;
                case "message_error":
                    lcm.f_logclass = Eva.Library.Log.LogClass.message_error;
                    break;
                case "message_prepare":
                    lcm.f_logclass = Eva.Library.Log.LogClass.message_prepare;
                    break;
            }

            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInfoJsonString);

            lcm.f_content = messageString;
            lcm.f_userid = clientInfoDic["userid"];
            lcm.f_appcode = clientInfoDic["appcode"];
            lcm.f_appname = clientInfoDic["appname"];
            lcm.f_userip = clientInfoDic["userip"];
            lcm.f_usermac = clientInfoDic["usermac"];
            lcm.f_username = clientInfoDic["username"];


            sara.dd.ldsw.Global._ilog.NewLog(lcm);
        }

    }
}









