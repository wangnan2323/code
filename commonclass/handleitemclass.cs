using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;

namespace sara.dd.ldsw.commonclass
{
    public class handleitemclass
    {
        #region 属性变量

        private sara.dd.ldsw.idal.Itbl_maintable _idal_itbl_maintable = dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();

        private sara.dd.ldsw.idal.Itbl_filescontent _idal_itbl_filescontent = dalfactory.Create<sara.dd.ldsw.idal.Itbl_filescontent>();// new sara.dd.ldsw.dal.tbl_filescontent();
        private sara.dd.ldsw.model.tbl_filescontent _model_tbl_filescontent = new sara.dd.ldsw.model.tbl_filescontent();

        private sara.dd.ldsw.idal.Itbl_ld_xzsb idal_tbl_ld_xzsb = new sara.dd.ldsw.dal.tbl_ld_xzsb();
        private sara.dd.ldsw.model.tbl_ld_xzsb model_tbl_ld_xzsb = new sara.dd.ldsw.model.tbl_ld_xzsb();
       
        private sara.dd.ldsw.idal.Itbl_ld_ghsb idal_tbl_ld_ghsb = new sara.dd.ldsw.dal.tbl_ld_ghsb();
        private sara.dd.ldsw.model.tbl_ld_ghsb model_tbl_ld_ghsb = new sara.dd.ldsw.model.tbl_ld_ghsb();

        private sara.dd.ldsw.idal.Itbl_ld_xhhbt idal_tbl_ld_xhhbt = new sara.dd.ldsw.dal.tbl_ld_xhhbt();
        private sara.dd.ldsw.model.tbl_ld_xhhbt model_tbl_ld_xhhbt = new sara.dd.ldsw.model.tbl_ld_xhhbt();

        private sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_khb();

        private sara.dd.ldsw.idal.Itbl_ld_dyhlh idal_tbl_ld_dyhlh = new sara.dd.ldsw.dal.tbl_ld_dyhlh();
        private sara.dd.ldsw.model.tbl_ld_dyhlh model_tbl_ld_dyhlh = new sara.dd.ldsw.model.tbl_ld_dyhlh();
        private sara.dd.ldsw.idal.Itbl_ld_xgsbds idal_tbl_ld_xgsbds = new sara.dd.ldsw.dal.tbl_ld_xgsbds();
        private sara.dd.ldsw.model.tbl_ld_xgsbds model_tbl_ld_xgsbds = new sara.dd.ldsw.model.tbl_ld_xgsbds();
        private static Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
        private static Eva.Library.ServiceAdapter.IAdapter.ICode _ic = Eva.Library.ServiceAdapter.AdapterFactory.CodeFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);


        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();

        #endregion

        #region 公有方法
        /// <summary>
        /// 下一个状态
        /// </summary>
        /// <param name="fk_tbl_maintable_sys_id"></param>
        /// <param name="nvc_maintableparameters"></param>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="remark"></param>
        /// <param name="processinsid"></param>
        /// <param name="businessparm"></param>
        /// <param name="clientInf"></param>
        /// <param name="_t"></param>
        /// <returns></returns>
        public string NextStateItemNew(string fk_tbl_maintable_sys_id, NameValueCollection nvc_maintableparameters, string str_facterid, DataSet ds_facter, string remark, string processinsid,string processactivedefid, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans _t)
        {
            try
            {
                _model_tbl_maintable = _idal_itbl_maintable.GetList(" sys_id ='" + fk_tbl_maintable_sys_id + "'", "", "*", "", "", null)[0];
                string projclass = _model_tbl_maintable.sys_projectclassid;
                string oldstate = _model_tbl_maintable.sys_projectclassdtl1;
                NameValueCollection nvc_parameters = new NameValueCollection();
                nvc_parameters.Add("sys_id", fk_tbl_maintable_sys_id);
                string str_nextstate = _cc.GetNewProjStateByFacterid(nvc_parameters, str_facterid, ds_facter, _t);
                _model_tbl_maintable.sys_projectclassdtl1 = str_nextstate;
                _model_tbl_maintable.sys_projectclassdtl1_name = _cc.GetProjStateName(_model_tbl_maintable.sys_projectclassid, _model_tbl_maintable.sys_projectclassdtl1, _t);
                string[] keys = nvc_maintableparameters.AllKeys;
                string processdefid = "";
                for (int i = 0; i < keys.Length; i++)
                {
                    switch (keys[i].ToString())
                    {
                        case "sys_processinsid":
                            if (nvc_maintableparameters["sys_processinsid"].ToString() != "^null")
                            {
                                _model_tbl_maintable.sys_processinsid = nvc_maintableparameters["sys_processinsid"].ToString();
                            }
                            break;
                        case "sys_processnextuser":
                            if (nvc_maintableparameters["sys_processnextuser"].ToString() != "^null")
                            {
                                if (nvc_maintableparameters["sys_processnextuser"].ToString() == "^nextuser")
                                {
                                    string users = "";
                                    DataSet ds = _cc.GetNextUser(projclass, _cc.GetProjStateReal(str_nextstate), _model_tbl_maintable.sys_projectclassdtl2, _model_tbl_maintable.xzqyid);
                                    foreach (DataRow dr in ds.Tables[0].Rows)
                                    {
                                        //驳回时时
                                        if (str_nextstate=="1_1")
                                        {
                                            if(dr["u_name"].ToString()== _model_tbl_maintable.sys_creatusername)
                                            {
                                                users = dr["u_name"].ToString();
                                            }

                                        }else if (str_nextstate == "4")
                                        {
                                            if (dr["u_name"].ToString() == _model_tbl_maintable.sys_creatusername)
                                            {
                                                users = dr["u_name"].ToString();
                                            }else
                                            {
                                                users += dr["u_name"].ToString() + ",";
                                            }
                                        }
                                        else
                                        {
                                            users += dr["u_name"].ToString() + ",";
                                        }
                                        
                                    }
                                    _model_tbl_maintable.sys_processnextuser = users.TrimEnd(',');
                                }
                                else
                                {
                                    _model_tbl_maintable.sys_processnextuser = nvc_maintableparameters["sys_processnextuser"].ToString();
                                }
                            }
                            break;
                        case "fk_tbl_maintable_sys_id":
                            if (nvc_maintableparameters["fk_tbl_maintable_sys_id"].ToString() != "^null")
                            {
                                _model_tbl_maintable.fk_tbl_maintable_sys_id = nvc_maintableparameters["fk_tbl_maintable_sys_id"].ToString();
                            }
                            break;
                        case "processdefid":
                            if (nvc_maintableparameters["processdefid"].ToString() != "^null")
                            {
                                processdefid = nvc_maintableparameters["processdefid"].ToString();
                            }
                            break;
                        default:
                            break;
                    }
                }
                _model_tbl_maintable.sys_first = "0";//未操作
                _idal_itbl_maintable.Update(_model_tbl_maintable, "sys_projectclassdtl1,sys_projectclassdtl1_name,sys_processinsid,sys_processnextuser,fk_tbl_maintable_sys_id,sys_first", _t);

                _cc.NewLog(_model_tbl_maintable.sys_id.ToString(), projclass, oldstate, str_nextstate, processinsid, remark, processdefid, processactivedefid, clientInf, _t);
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        ///创建项目
        /// </summary>
        /// <param name="xmmc"></param>
        /// <param name="userid"></param>
        /// <param name="username"></param>
        /// <param name="xmlx"></param>
        /// <param name="projclassid"></param>
        /// <param name="xzqy"></param>
        /// <param name="xzqyid"></param>
        /// <param name="remark"></param>
        /// <param name="shpid"></param>
        /// <param name="sys_appcode"></param>
        /// <returns></returns>
        public string GenerateItem(string tbl_maintable_sys_id, string clientInf)
        {
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = commonclass.CreateIAccessDataTrans();
            try
            {
                t.getTrans().begin();
                _model_tbl_maintable = _idal_itbl_maintable.GetList("sys_id='" + tbl_maintable_sys_id + "'", "", "*", "", "", t)[0];
                #region  创建项目

                string xmlx = _model_tbl_maintable.xmlx;
                string xzqy = _model_tbl_maintable.xzqy;
                string userid = _model_tbl_maintable.sys_creatuserid;
                string username = _model_tbl_maintable.sys_creatusername;
                string sMainTableID = tbl_maintable_sys_id;
                string xmlxid = _model_tbl_maintable.xmlxid;
                string xzqyid = _model_tbl_maintable.xzqyid;
                string projclassid = _model_tbl_maintable.sys_projectclassid;
                string projclassdtl2 = _model_tbl_maintable.sys_projectclassdtl2;
                string shpid = _model_tbl_maintable.shpid;
                string xmmc = _model_tbl_maintable.xmmc;
                string remark = "";
                

                #endregion
                #region 创建基础数据

                CreatBaseData(userid, username, sMainTableID, projclassdtl2, xzqyid, projclassid, shpid, t);

                #endregion
                #region  创建业务数据
                CreatBusinessData(_model_tbl_maintable, userid, username, sMainTableID, projclassdtl2, xzqyid, projclassid, shpid, t);
                #endregion
                #region 生成报表菜单
                CreatReportMenuData(userid, username, sMainTableID, projclassdtl2, projclassid, t);
                #endregion
                #region 创建日志
                _cc.NewLog(sMainTableID, projclassid, "", "1", "", xmlx + "项目创建\n" + remark, "","", clientInf, t);
                #endregion
                t.getTrans().commit();
                return "";
            }
            catch (Exception ex)
            {
                t.getTrans().rollback();

                //项目创建失败，删除数据
                Eva.Library.Data.AccessData.IAccessData _ia = commonclass.CreateIAccessData();
                _ia.ExecuteSql("delete from tbl_maintable where sys_id='" + tbl_maintable_sys_id + "'");
                
                throw ex;
            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="tbl_maintable_sys_id"></param>
        /// <param name="str_name"></param>
        /// <param name="p"></param>
        /// <param name="t"></param>
        /// <returns></returns>
        public string DelItem(string tbl_maintable_sys_id, string str_name, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            try
            {
                _model_tbl_maintable = _idal_itbl_maintable.GetList(" sys_id='" + tbl_maintable_sys_id + "'", "", "*", "", "", null)[0];

                string result = "";
               
                if (result == "")
                {
                    string maintable_sys_id = _model_tbl_maintable.sys_id.ToString();
                    #region 删除日志
                    _cc.DelLog(maintable_sys_id, _model_tbl_maintable.xmmc, t);
                    #endregion
                    #region 删除业务数据+附件
                    DelBusinessData(maintable_sys_id, _model_tbl_maintable.sys_projectclassid, _model_tbl_maintable.sys_projectclassdtl2, t);
                    #endregion
                    #region 删除基础数据
                    DelBaseData(maintable_sys_id, _model_tbl_maintable.sys_projectclassid, _model_tbl_maintable.sys_projectclassdtl2, t);
                    #endregion
                    #region 删除maintable
                    DelMainTable(maintable_sys_id, t);
                    #endregion

                }
                return result;
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        /// <summary>
        /// 刷新用到t_upshp_dl表的业务表数据
        /// </summary>
        /// <param name="_model"></param>
        /// <param name="userid"></param>
        /// <param name="username"></param>
        /// <param name="sMainTableID"></param>
        /// <param name="projxmlxid"></param>
        /// <param name="xzqyid"></param>
        /// <param name="projclassid"></param>
        /// <param name="shpid"></param>
        /// <param name="t"></param>
        public string UpDateBusinessData(string userid, string username, string sMainTableID, string shpid, string projclassid, string xzqyid, string path_inner, string path_new, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string errormessage = "";
            try
            {
                //string up_shape_dl_f_sjlx_inner = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["up_shape_dl_f_sjlx_inner"].ToString();
                _model_tbl_maintable = _idal_itbl_maintable.GetList(" sys_id='" + sMainTableID + "'", "", "*", "", "", t)[0];
                string projclassdtl2 = _model_tbl_maintable.sys_projectclassdtl2;
                string xzqy = _cc.GetXzqyByID(xzqyid);
               

                IList<string> tablenameList = _cc.GetTableNameEnList(projclassid, projclassdtl2, t);

                foreach (string tablename in tablenameList)
                {
                    switch (tablename)
                    {
                        case ""://样例代码 "tbl_5_bcht":
                            {
                            }
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                errormessage = ex.Message;
            }
            return errormessage;
        }

        #endregion

     
        #region 创建项目

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_model"></param>
        /// <param name="userid"></param>
        /// <param name="username"></param>
        /// <param name="sMainTableID"></param>
        /// <param name="projxmlxid"></param>
        /// <param name="xzqyid"></param>
        /// <param name="projclassid"></param>
        /// <param name="shpid"></param>
        /// <param name="t"></param>
        public void CreatBusinessData(sara.dd.ldsw.model.tbl_maintable _model, string userid, string username, string sMainTableID, string projclassdtl2, string xzqyid, string projclassid, string shpid, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            IList<string> tablenameList = _cc.GetTableNameEnList(projclassid, projclassdtl2, t);
            foreach (string tablename in tablenameList)
            {
                switch (tablename)
                {
                    #region 更换水表
                    case "tbl_ld_ghsb"://样例代码 "tbl_5_bcht":
                        {
                            sara.dd.ldsw.idal.Itbl_ld_ghsb idal_tbl_ld_ghsb = new sara.dd.ldsw.dal.tbl_ld_ghsb();
                            sara.dd.ldsw.model.tbl_ld_ghsb model_tbl_ld_ghsb = new sara.dd.ldsw.model.tbl_ld_ghsb();
                            model_tbl_ld_ghsb.sys_id = 0;

                            model_tbl_ld_ghsb.sys_orderid = "";

                            model_tbl_ld_ghsb.sys_creatuserid = userid;

                            model_tbl_ld_ghsb.sys_creatusername = username;

                            model_tbl_ld_ghsb.sys_creatdate = DateTime.Now;

                            model_tbl_ld_ghsb.sys_lastedituserid = userid;

                            model_tbl_ld_ghsb.sys_lasteditusername = username;

                            model_tbl_ld_ghsb.sys_lasteditdate = DateTime.Now;

                            model_tbl_ld_ghsb.sys_deluserid = "";

                            model_tbl_ld_ghsb.sys_delusername = "";

                            model_tbl_ld_ghsb.sys_deldate = DateTime.Parse("1900-1-1");

                            model_tbl_ld_ghsb.sys_delflag = "0";

                            model_tbl_ld_ghsb.f_value1 = "";

                            model_tbl_ld_ghsb.f_value2 = "";

                            model_tbl_ld_ghsb.f_value3 = "";

                            model_tbl_ld_ghsb.f_value4 = "";

                            model_tbl_ld_ghsb.f_value5 = "";

                            model_tbl_ld_ghsb.f_value6 = "";

                            model_tbl_ld_ghsb.f_value7 = "";

                            model_tbl_ld_ghsb.f_value8 = "";

                            model_tbl_ld_ghsb.f_value9 = "";

                            model_tbl_ld_ghsb.f_value10 = "";

                            model_tbl_ld_ghsb.f_sqr = username;

                            model_tbl_ld_ghsb.f_sqrid = userid;

                            model_tbl_ld_ghsb.f_sqsj = DateTime.Now;

                            model_tbl_ld_ghsb.f_czsj = DateTime.Parse("1900-1-1");

                            model_tbl_ld_ghsb.f_oldazrq = DateTime.Parse("1900-1-1");

                            model_tbl_ld_ghsb.f_newazrq = DateTime.Now;

                            model_tbl_ld_ghsb.f_zt = "新建";

                            model_tbl_ld_ghsb.f_ztid = "0";

                            model_tbl_ld_ghsb.f_ghsbbh = commonclass.getBusinessNum("GHSB","");

                            model_tbl_ld_ghsb.f_xsbfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);

                            model_tbl_ld_ghsb.f_lcfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);

                            model_tbl_ld_ghsb.fk_tbl_maintable_sys_id = sMainTableID;
                            model_tbl_ld_ghsb.f_newbqzm = "0";
                            model_tbl_ld_ghsb.f_newsqzm = "0";
                            model_tbl_ld_ghsb.f_newsqsl = "0";
                            model_tbl_ld_ghsb.f_newdysl = "0";
                            model_tbl_ld_ghsb.f_newqsqpjsl = "0";
                            model_tbl_ld_ghsb.f_newqlqpjsl = "0";
                            model_tbl_ld_ghsb.f_newljgl = "0";
                            model_tbl_ld_ghsb.f_newnysl = "0";
                            model_tbl_ld_ghsb.f_newzt = "启用";
                            model_tbl_ld_ghsb.f_newztid = "0";
                            model_tbl_ld_ghsb.f_newsbbh= "";
                            model_tbl_ld_ghsb.f_ghsbmc = "更换水表_" + DateTime.Now.ToString("yyyyMMddHHmmss");
                            idal_tbl_ld_ghsb.Add(model_tbl_ld_ghsb, t);
                            
                        }
                        break;
                    #endregion
                    #region 100项目业务数据创建
                    //case "tbl_100_xm_jbxx":
                    //    {
                    //        #region tbl_100_xm_jbxx
                    //        _model_tbl_100_xm_jbxx = new Easy2008.LAND.SPTJ.Model.tbl_100_xm_jbxx();
                    //        _model_tbl_100_xm_jbxx.sys_id = 0;
                    //        _model_tbl_100_xm_jbxx.sys_creatdate = DateTime.Now;
                    //        _model_tbl_100_xm_jbxx.sys_creatuserid = userid;
                    //        _model_tbl_100_xm_jbxx.sys_creatusername = username;
                    //        _model_tbl_100_xm_jbxx.sys_deldate = DateTime.Parse("1900-1-1");
                    //        _model_tbl_100_xm_jbxx.sys_delflag = "0";
                    //        _model_tbl_100_xm_jbxx.sys_deluserid = "";
                    //        _model_tbl_100_xm_jbxx.sys_delusername = "";
                    //        _model_tbl_100_xm_jbxx.sys_lasteditdate = DateTime.Now;
                    //        _model_tbl_100_xm_jbxx.sys_lastedituserid = userid;
                    //        _model_tbl_100_xm_jbxx.sys_lasteditusername = username;
                    //        _model_tbl_100_xm_jbxx.sys_orderid = _bll_tbl_100_xm_jbxx.GetMaxOrderID(t);
                    //        _model_tbl_100_xm_jbxx.fk_tbl_maintable_sys_id = sMainTableID;
                    //        //2014-02-25
                    //        _model_tbl_100_xm_jbxx.f_value1 = _cc.GetDKPCLX(shpid);
                    //        _model_tbl_100_xm_jbxx.f_value2 = "";
                    //        _model_tbl_100_xm_jbxx.f_value3 = "";
                    //        _model_tbl_100_xm_jbxx.f_value4 = "";
                    //        _model_tbl_100_xm_jbxx.f_value5 = "";
                    //        _model_tbl_100_xm_jbxx.f_value6 = "";
                    //        _model_tbl_100_xm_jbxx.f_value7 = "";
                    //        _model_tbl_100_xm_jbxx.f_value8 = "";
                    //        _model_tbl_100_xm_jbxx.f_value9 = "";
                    //        _model_tbl_100_xm_jbxx.f_value10 = "";

                    //        _model_tbl_100_xm_jbxx.f_xmmc = _model.xmmc;
                    //        _model_tbl_100_xm_jbxx.f_bz = _model.bz;
                    //        _model_tbl_100_xm_jbxx.f_dkbh = "";

                    //        _model_tbl_100_xm_jbxx.f_dwmc = "";
                    //        _model_tbl_100_xm_jbxx.f_dwmcid = xzqyid;

                    //        DataSet ds_f_dwmc = _csa.GetContentCollectionByMenuNodeID(Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_dwmc"].ToString());
                    //        if (ds_f_dwmc != null && ds_f_dwmc.Tables[0] != null && ds_f_dwmc.Tables[0].Rows.Count > 0)
                    //        {
                    //            DataRow[] dr = ds_f_dwmc.Tables[0].Select(" nodevalue='" + _model_tbl_100_xm_jbxx.f_dwmcid + "'");
                    //            if (dr.Length > 0)
                    //            {
                    //                _model_tbl_100_xm_jbxx.f_dwmc = dr[0]["nodename"].ToString();
                    //            }
                    //        }

                    //        _model_tbl_100_xm_jbxx.f_gdfs = "";
                    //        _model_tbl_100_xm_jbxx.f_gdfsid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_gdfs_mr"].ToString();

                    //        DataSet ds_f_gdfs = _csa.GetContentCollectionByMenuNodeID(Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_gdfs"].ToString());
                    //        if (ds_f_gdfs != null && ds_f_gdfs.Tables[0] != null && ds_f_gdfs.Tables[0].Rows.Count > 0)
                    //        {
                    //            DataRow[] dr = ds_f_gdfs.Tables[0].Select(" nodevalue='" + _model_tbl_100_xm_jbxx.f_gdfsid + "'");
                    //            if (dr.Length > 0)
                    //            {
                    //                _model_tbl_100_xm_jbxx.f_gdfs = dr[0]["nodename"].ToString();
                    //            }
                    //        }

                    //        string sql = "select t.f_dlbm,t.f_dlmc, t.rowid from UP_SHAPE_DL t where t.f_sjlx is null and t.fk_tbl_maintable_sys_id='" + sMainTableID + "'";
                    //        DataSet ds = t.Query(sql);
                    //        DataSet result;//用于存放查询结果
                    //        string dlbm = "";//地类编码
                    //        if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                    //        {
                    //            dlbm = ds.Tables[0].Rows[0]["f_dlbm"].ToString();

                    //            switch (dlbm.Substring(0, 2))
                    //            {
                    //                case "05"://商服
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '05%' and length(dlid)=3) where dlid='" + dlbm + "'");

                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_sf"].ToString();
                    //                    }
                    //                    break;
                    //                case "06"://工矿仓储用地--
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '06%' and length(dlid)=3) where dlid='" + dlbm + "'");
                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_gkcc"].ToString();
                    //                    }
                    //                    break;
                    //                case "07"://住宅
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '07%' and length(dlid)=3) where dlid='" + dlbm + "'");
                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_zz"].ToString();
                    //                    }
                    //                    break;
                    //                case "08"://公共设施用地  
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '08%' and length(dlid)=3) where dlid='" + dlbm + "'");
                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_gg"].ToString();
                    //                    }
                    //                    break;
                    //                case "09"://特殊用地
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '09%' and length(dlid)=3) where dlid='" + dlbm + "'");
                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_tsyd"].ToString();
                    //                    }
                    //                    break;
                    //                case "10"://交通运输用地
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '10%' and length(dlid)=3) where dlid='" + dlbm + "'");
                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_jtys"].ToString();
                    //                    }
                    //                    break;
                    //                case "11"://水域水利
                    //                    result = t.Query("select dlid from (select dlid from t_dlbm where dlclass2='2' and dlid like '11%' and length(dlid)=3) where dlid='" + dlbm + "'");
                    //                    if (result != null && result.Tables[0].Rows.Count > 0 && result.Tables[0].Rows[0][0].ToString() != "")
                    //                    {
                    //                        _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_sl"].ToString();
                    //                    }
                    //                    break;
                    //            }
                    //        }

                    //        if (_model_tbl_100_xm_jbxx.f_kfytid == "" && dlbm != "")
                    //        {
                    //            _model_tbl_100_xm_jbxx.f_kfytid = Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt_qttd"].ToString();
                    //        }

                    //        DataSet ds_f_kfyt = _csa.GetContentCollectionByMenuNodeID(Easy2008.QuickDevelop.Configuration.ConfigurationManager.AppSettings["tbl_100_xm_jbxx_f_kfyt"].ToString());
                    //        if (ds_f_kfyt != null && ds_f_kfyt.Tables[0] != null && ds_f_kfyt.Tables[0].Rows.Count > 0)
                    //        {
                    //            DataRow[] dr = ds_f_kfyt.Tables[0].Select(" nodevalue='" + _model_tbl_100_xm_jbxx.f_kfytid + "'");
                    //            if (dr.Length > 0)
                    //            {
                    //                _model_tbl_100_xm_jbxx.f_kfyt = dr[0]["nodename"].ToString();
                    //            }
                    //        }

                    //        _model_tbl_100_xm_jbxx.f_lrr = username;
                    //        _model_tbl_100_xm_jbxx.f_lrrq = DateTime.Now;
                    //        _model_tbl_100_xm_jbxx.f_nd = System.DateTime.Now.Year.ToString();
                    //        _model_tbl_100_xm_jbxx.f_ndid = System.DateTime.Now.Year.ToString();
                    //        _model_tbl_100_xm_jbxx.f_szsx = _model.xzqy;
                    //        _model_tbl_100_xm_jbxx.f_szsxid = _model.xzqyid;
                    //        _model_tbl_100_xm_jbxx.f_xmlx = _model.xmlx;
                    //        _model_tbl_100_xm_jbxx.f_xmlxid = _model.xmlxid;

                    //        string str_qsdwmc = "";
                    //        string str_qsdwdm = "";
                    //        _getdata.Get_tbl_100_xm_jbxx_f_qsdwmc_f_qsdwdm(sMainTableID, ref str_qsdwmc, ref str_qsdwdm, t);

                    //        _model_tbl_100_xm_jbxx.f_zhqsdwmc = str_qsdwmc;

                    //        _model_tbl_100_xm_jbxx.f_zhqsdwdm = str_qsdwdm;

                    //        //获取
                    //        _model_tbl_100_xm_jbxx.f_txqmj = _getdata.Get_tbl_100_xm_jbxx_f_txqmj(sMainTableID, t);
                    //        _model_tbl_100_xm_jbxx.f_mj = _getdata.Get_tbl_100_xm_jbxx_f_mj(sMainTableID, t);

                    //        _bll_tbl_100_xm_jbxx.Add(_model_tbl_100_xm_jbxx, t);
                    //        #endregion
                    //    }
                    //    break;
                    #endregion
                    #region 新增水表
                    case "tbl_ld_xzsb":
                        {                            
                            model_tbl_ld_xzsb.sys_id = 0;
                            model_tbl_ld_xzsb.sys_orderid = "";
                            model_tbl_ld_xzsb.sys_creatuserid = userid;
                            model_tbl_ld_xzsb.sys_creatusername = username;
                            model_tbl_ld_xzsb.sys_creatdate = DateTime.Now;
                            model_tbl_ld_xzsb.sys_lastedituserid = userid;
                            model_tbl_ld_xzsb.sys_lasteditusername = username;
                            model_tbl_ld_xzsb.sys_lasteditdate = DateTime.Now;
                            model_tbl_ld_xzsb.sys_deluserid = "";
                            model_tbl_ld_xzsb.sys_delusername = "";
                            model_tbl_ld_xzsb.sys_deldate = DateTime.Parse("1900-1-1");
                            model_tbl_ld_xzsb.sys_delflag = "0";
                            model_tbl_ld_xzsb.f_value1 = "";
                            model_tbl_ld_xzsb.f_value2 = "";
                            model_tbl_ld_xzsb.f_value3 = "";
                            model_tbl_ld_xzsb.f_value4 = "";
                            model_tbl_ld_xzsb.f_value5 = "";
                            model_tbl_ld_xzsb.f_value6 = "";
                            model_tbl_ld_xzsb.f_value7 = "";
                            model_tbl_ld_xzsb.f_value8 = "";
                            model_tbl_ld_xzsb.f_value9 = "";
                            model_tbl_ld_xzsb.f_value10 = "";
                            model_tbl_ld_xzsb.fk_tbl_maintable_sys_id = sMainTableID;
                            model_tbl_ld_xzsb.f_xzsbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("xzsb", "", null);
                            model_tbl_ld_xzsb.f_sqr = username;
                            model_tbl_ld_xzsb.f_sqrid = userid;
                            model_tbl_ld_xzsb.f_sqsj = DateTime.Now;
                            model_tbl_ld_xzsb.f_azrq = DateTime.Now;
                            model_tbl_ld_xzsb.f_sbfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_xzsb.f_lcfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_xzsb.f_zt = "新建";
                            model_tbl_ld_xzsb.f_ztid = "0";
                            model_tbl_ld_xzsb.f_xzsbmc = "新增水表_" + DateTime.Now.ToString("yyyyMMddHHmmss");
                            idal_tbl_ld_xzsb.Add(model_tbl_ld_xzsb, t);
                        }
                        break;
                    #endregion
                    #region 大客户立户
                    case "tbl_ld_dyhlh":
                        {
                            model_tbl_ld_dyhlh.sys_id = 0;
                            model_tbl_ld_dyhlh.sys_orderid = "";
                            model_tbl_ld_dyhlh.sys_creatuserid = userid;
                            model_tbl_ld_dyhlh.sys_creatusername = username;
                            model_tbl_ld_dyhlh.sys_creatdate = DateTime.Now;
                            model_tbl_ld_dyhlh.sys_lastedituserid = userid;
                            model_tbl_ld_dyhlh.sys_lasteditusername = username;
                            model_tbl_ld_dyhlh.sys_lasteditdate = DateTime.Now;
                            model_tbl_ld_dyhlh.sys_deluserid = "";
                            model_tbl_ld_dyhlh.sys_delusername = "";
                            model_tbl_ld_dyhlh.sys_deldate = DateTime.Parse("1900-1-1");
                            model_tbl_ld_dyhlh.sys_delflag = "0";
                            model_tbl_ld_dyhlh.f_value1 = "";
                            model_tbl_ld_dyhlh.f_value2 = "";
                            model_tbl_ld_dyhlh.f_value3 = "";
                            model_tbl_ld_dyhlh.f_value4 = "";
                            model_tbl_ld_dyhlh.f_value5 = "";
                            model_tbl_ld_dyhlh.f_value6 = "";
                            model_tbl_ld_dyhlh.f_value7 = "";
                            model_tbl_ld_dyhlh.f_value8 = "";
                            model_tbl_ld_dyhlh.f_value9 = "";
                            model_tbl_ld_dyhlh.f_value10 = "";
                            model_tbl_ld_dyhlh.fk_tbl_maintable_sys_id = sMainTableID;
                            model_tbl_ld_dyhlh.f_dyhlhbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("DHLH", "", null);
                            model_tbl_ld_dyhlh.f_mc = "";
                            model_tbl_ld_dyhlh.f_sqr = username;
                            model_tbl_ld_dyhlh.f_sqrid = userid;
                            model_tbl_ld_dyhlh.f_sqsj = DateTime.Now;
                            model_tbl_ld_dyhlh.f_khrq = DateTime.Now;
                            model_tbl_ld_dyhlh.f_htqdrq = DateTime.Now;
                            model_tbl_ld_dyhlh.f_azrq = DateTime.Now;
                            model_tbl_ld_dyhlh.f_khzt = "启用";
                            model_tbl_ld_dyhlh.f_khztid ="0";
                            model_tbl_ld_dyhlh.f_yhzt = "新用户"; //启用 0
                            model_tbl_ld_dyhlh.f_yhztid ="1";
                            model_tbl_ld_dyhlh.f_sbzt = "启用";
                            model_tbl_ld_dyhlh.f_sbztid = "0";
                            model_tbl_ld_dyhlh.f_ycje = "0";
                            model_tbl_ld_dyhlh.f_tjjzsf = "0";
                            model_tbl_ld_dyhlh.f_tjjzpwf = "0";
                            model_tbl_ld_dyhlh.f_jhysl = "0";
                            model_tbl_ld_dyhlh.f_sqysl = "0";
                            model_tbl_ld_dyhlh.f_rs = "0";

                            DateTime DateNow = DateTime.Now.AddMonths(0);
                            DateTime DateBegin = new DateTime(DateNow.Year, DateNow.Month, 1);
                            DateTime DateEnd = DateBegin.AddMonths(1).AddDays(-1);
                            model_tbl_ld_dyhlh.f_zhcbrq = DateEnd;

                            model_tbl_ld_dyhlh.f_htfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_dyhlh.f_qtfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_dyhlh.f_sfzfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_dyhlh.f_azrq = DateTime.Now;
                            model_tbl_ld_dyhlh.f_sbfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_dyhlh.f_lcfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                            model_tbl_ld_dyhlh.f_zt = "新建";
                            model_tbl_ld_dyhlh.f_ztid = "0";
                            model_tbl_ld_dyhlh.f_mc= "立户_" + DateTime.Now.ToString("yyyyMMddHHmmss");
                            model_tbl_ld_dyhlh.f_sqr = username;
                            model_tbl_ld_dyhlh.f_sqrid = userid;
                            model_tbl_ld_dyhlh.f_sqsj = DateTime.Now;
                            idal_tbl_ld_dyhlh.Add(model_tbl_ld_dyhlh, t);
                        }
                        break;
                    #endregion
					 #region 销户和报停
                    case "tbl_ld_xhhbt":
                        {
                            model_tbl_ld_xhhbt.sys_id = 0;

                            model_tbl_ld_xhhbt.sys_orderid = "";

                            model_tbl_ld_xhhbt.sys_creatuserid = userid;

                            model_tbl_ld_xhhbt.sys_creatusername = username;

                            model_tbl_ld_xhhbt.sys_creatdate = DateTime.Now;

                            model_tbl_ld_xhhbt.sys_lastedituserid = userid;

                            model_tbl_ld_xhhbt.sys_lasteditusername = username;

                            model_tbl_ld_xhhbt.sys_lasteditdate = DateTime.Now;

                            model_tbl_ld_xhhbt.sys_deluserid = "";

                            model_tbl_ld_xhhbt.sys_delusername = "";

                            model_tbl_ld_xhhbt.sys_deldate = DateTime.Parse("1900-1-1");

                            model_tbl_ld_xhhbt.sys_delflag = "0";

                            model_tbl_ld_xhhbt.f_value1 = "";

                            model_tbl_ld_xhhbt.f_value2 = "";

                            model_tbl_ld_xhhbt.f_value3 = "";

                            model_tbl_ld_xhhbt.f_value4 = "";

                            model_tbl_ld_xhhbt.f_value5 = "";

                            model_tbl_ld_xhhbt.f_value6 = "";

                            model_tbl_ld_xhhbt.f_value7 = "";

                            model_tbl_ld_xhhbt.f_value8 = "";

                            model_tbl_ld_xhhbt.f_value9 = "";

                            model_tbl_ld_xhhbt.f_value10 = "";

                            model_tbl_ld_xhhbt.fk_tbl_maintable_sys_id = sMainTableID;

                            model_tbl_ld_xhhbt.f_xhbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("xhbt", "", null);

                            model_tbl_ld_xhhbt.f_sqr = username;

                            model_tbl_ld_xhhbt.f_sqrid = userid;

                            model_tbl_ld_xhhbt.f_sqsj = DateTime.Now;

                            model_tbl_ld_xhhbt.f_fj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);

                            model_tbl_ld_xhhbt.f_zt = "新建";

                            model_tbl_ld_xhhbt.f_ztid = "0";
                            model_tbl_ld_xhhbt.f_xhmc = "申请_" + DateTime.Now.ToString("yyyyMMddHHmmss");
                            idal_tbl_ld_xhhbt.Add(model_tbl_ld_xhhbt, t);
                        }
                        break;
                    #endregion
                    #region 修改水表底数
                    case "tbl_ld_xgsbds":
                        {
                            model_tbl_ld_xgsbds.sys_id = 0;

                            model_tbl_ld_xgsbds.sys_orderid = "";

                            model_tbl_ld_xgsbds.sys_creatuserid = userid;

                            model_tbl_ld_xgsbds.sys_creatusername = username;

                            model_tbl_ld_xgsbds.sys_creatdate = DateTime.Now;

                            model_tbl_ld_xgsbds.sys_lastedituserid = userid;

                            model_tbl_ld_xgsbds.sys_lasteditusername = username;

                            model_tbl_ld_xgsbds.sys_lasteditdate = DateTime.Now;

                            model_tbl_ld_xgsbds.sys_deluserid = "";

                            model_tbl_ld_xgsbds.sys_delusername = "";

                            model_tbl_ld_xgsbds.sys_deldate = DateTime.Parse("1900-1-1");

                            model_tbl_ld_xgsbds.sys_delflag = "0";

                            model_tbl_ld_xgsbds.f_value1 = "";

                            model_tbl_ld_xgsbds.f_value2 = "";

                            model_tbl_ld_xgsbds.f_value3 = "";

                            model_tbl_ld_xgsbds.f_value4 = "";

                            model_tbl_ld_xgsbds.f_value5 = "";

                            model_tbl_ld_xgsbds.f_value6 = "";

                            model_tbl_ld_xgsbds.f_value7 = "";

                            model_tbl_ld_xgsbds.f_value8 = "";

                            model_tbl_ld_xgsbds.f_value9 = "";

                            model_tbl_ld_xgsbds.f_value10 = "";

                            model_tbl_ld_xgsbds.fk_tbl_maintable_sys_id = sMainTableID;

                            model_tbl_ld_xgsbds.f_xgsbdsbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("xgsbds", "", null);

                            model_tbl_ld_xgsbds.f_sqr = username;

                            model_tbl_ld_xgsbds.f_sqrid = userid;

                            model_tbl_ld_xgsbds.f_sqsj = DateTime.Now;

                            model_tbl_ld_xgsbds.f_bcfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);

                            model_tbl_ld_xgsbds.f_drwj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);

                            model_tbl_ld_xgsbds.f_lcfj = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);

                            model_tbl_ld_xgsbds.f_zt = "新建";

                            model_tbl_ld_xgsbds.f_ztid = "0";
                            model_tbl_ld_xgsbds.f_czsj = DateTime.Parse("1900-1-1");
                            model_tbl_ld_xgsbds.f_drsj = DateTime.Parse("1900-1-1");
                            model_tbl_ld_xgsbds.f_fxsj = DateTime.Parse("1900-1-1");
                            model_tbl_ld_xgsbds.f_xgsbdsmc = "修改水表底数_" + DateTime.Now.ToString("yyyyMMddHHmmss");
                            idal_tbl_ld_xgsbds.Add(model_tbl_ld_xgsbds, t);

                        }
                        break;
                    #endregion
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// forxm
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="username"></param>
        /// <param name="sMainTableID"></param>
        /// <param name="projxmlxid"></param>
        /// <param name="xzqyid"></param>
        /// <param name="projclassid"></param>
        /// <param name="shpid"></param>
        /// <param name="t"></param>
        private void CreatBaseData(string userid, string username, string sMainTableID, string projclassdtl2, string xzqyid, string projclassid, string shpid, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            //修改up_shape状态

            //string str = "update up_shape set proj_guid = '" + sMainTableID + "' where shp_id ='" + shpid + "' ";

            //t.ExecuteSql(str);

            //str = "update up_shape_dl set FK_TBL_MAINTABLE_SYS_ID = '" + sMainTableID + "' where SYS_SHPID ='" + shpid + "' ";

            //t.ExecuteSql(str);

            //str = "update up_shape_dl2 set FK_TBL_MAINTABLE_SYS_ID = '" + sMainTableID + "' where SYS_SHPID ='" + shpid + "' ";

            //t.ExecuteSql(str);

            //str = "update up_shape_gh set FK_TBL_MAINTABLE_SYS_ID = '" + sMainTableID + "' where SYS_SHPID ='" + shpid + "' ";

            //t.ExecuteSql(str);

            //创建要件

            string str = "select value10 from t_projclass_dtl2  where projstate = '" + projclassdtl2 + "' and projclassid = '" + projclassid + "'";
            string menuid = t.GetSingle(str).ToString();

            if (menuid != "-1" && menuid != "")
            {
                DataSet ds_filescontent = null;
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    ds_filescontent = sara.platform.service.code.Service.GetContentCollectionByMenuNodeID(menuid);
                }
                else
                {
                    ds_filescontent = _ic.GetContentCollectionByMenuNodeID(menuid);
                }
                if (ds_filescontent.Tables.Count > 0)
                {
                    DataView dv_sort = ds_filescontent.Tables[0].DefaultView;
                    dv_sort.Sort = "nodeid asc";
                    DataTable dt_filescontent = dv_sort.ToTable();

                    foreach (DataRow dr_filescontent in dt_filescontent.Rows)
                    {
                        _model_tbl_filescontent = new sara.dd.ldsw.model.tbl_filescontent();
                        // 系统数据赋值
                        _model_tbl_filescontent.sys_id = 0;
                        _model_tbl_filescontent.sys_orderid = "";
                        _model_tbl_filescontent.sys_userid = userid;
                        _model_tbl_filescontent.sys_username = username;
                        _model_tbl_filescontent.sys_creatdate = System.DateTime.Now;
                        _model_tbl_filescontent.sys_lastedituserid = userid;
                        _model_tbl_filescontent.sys_lasteditusername = username;
                        _model_tbl_filescontent.sys_lasteditdate = System.DateTime.Now;
                        _model_tbl_filescontent.sys_delflag = "0";
                        _model_tbl_filescontent.sys_deldate = System.DateTime.Parse("1900-01-01");

                        // 业务数据赋值
                        _model_tbl_filescontent.filerealname = sara.dd.ldsw.commonclass.filecontrol.GetNewFileId(null);
                        _model_tbl_filescontent.fk_maintable_sys_id = sMainTableID;
                        _model_tbl_filescontent.fk_projclass_sys_id = projclassid;
                        _model_tbl_filescontent.fnumber = dr_filescontent["NODEVALUE"].ToString();
                        _model_tbl_filescontent.filetitle = dr_filescontent["NODENAME"].ToString();
                        _model_tbl_filescontent.filesize = "0";

                        _idal_itbl_filescontent.Add(_model_tbl_filescontent, t);
                    }
                }
            }
        }

        /// <summary>
        /// 生成报表菜单
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="username"></param>
        /// <param name="sMainTableID"></param>
        /// <param name="xmlxid"></param>
        /// <param name="projclassid"></param>
        /// <param name="t"></param>
        public void CreatReportMenuData(string userid, string username, string sMainTableID, string projclassdtl2, string projclassid, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            //string str = "";
            //str = "select value8 from t_projclass_dtl2  where projstate = '" + xmlxid + "' and projclassid = '" + projclassid + "'";
            //string menuid = t.GetSingle(str).ToString();

            ////获取所有应用
            //IList<string> tablenameList = _cc.GetTableNameEnList(projclassid, xmlxid, t);
            //string yy_tablenames = ",";
            //for (int i = 0; i < tablenameList.Count; i++)
            //{
            //    yy_tablenames += tablenameList[i].ToString() + ",";
            //}

            //string yyname = "";//应用名称/与栅格及字段配置中的表名一致，用于控制报表的可见性，与相关表一样

            //DataSet ds_yw = new DataSet();//用于查询相关业务表，来确定当前报表需要导出几个报表
            //string tablename = "";//用于记录根据某个表的数量来创建几条报表数据
            //List<string> tablecolumn = new List<string>();//用于区分多个报表的字段名称

            //string reportlx = "";//用于记录需要创建几条数据

            //string classname = "";//类名
            //string functionname = "";//方法名称
            //string parameters = "";//参数

            //string reportname = "";//报表名称

            //string tablecountsql = "";//用于查询表中数量

            //string[] temp;//用于临时存储
            //if (menuid != "-1" && menuid != "")
            //{
            //    DataSet ds_reportmenu = _cs.GetContentCollectionByMenuNodeID(menuid);

            //    if (ds_reportmenu.Tables.Count > 0)
            //    {
            //        DataView dv_sort = ds_reportmenu.Tables[0].DefaultView;
            //        dv_sort.Sort = "nodeid asc";
            //        DataTable dt_reportmenutable = dv_sort.ToTable();

            //        foreach (DataRow dr_filescontent in dt_reportmenutable.Rows)
            //        {
            //            string[] content = dr_filescontent["NODEVALUE"].ToString().Split(':');

            //            yyname = content[0];//应用
            //            reportlx = content[1];//报表配置类型0_0:固定一个报表  0_1：固定多个报表  1_1：非固定报表         本系统中不涉及非固定报表

            //            //用于确定报表个数
            //            temp = content[2].Split('.');
            //            tablename = temp[0];
            //            tablecolumn.Clear();
            //            for (int i = 1; i < temp.Length; i++)
            //            {
            //                tablecolumn.Add(temp[i]);
            //            }

            //            //用于确定所报表类，方法、参数
            //            classname = content[3];
            //            functionname = content[4];
            //            parameters = content[5];

            //            //报表中文名称
            //            reportname = dr_filescontent["NODENAME"].ToString();

            //            //reportlx = dr_filescontent["NODEVALUE"].ToString().Split(':')[0];
            //            //tablename = dr_filescontent["NODEVALUE"].ToString().Split(':')[1].Split('.')[0];
            //            //tablecolumn.Clear();
            //            //for (int i = 1; i < dr_filescontent["NODEVALUE"].ToString().Split(':')[1].Split('.').Length; i++)
            //            //{
            //            //    tablecolumn.Add(dr_filescontent["NODEVALUE"].ToString().Split(':')[1].Split('.')[i]);
            //            //}

            //            //classname = dr_filescontent["NODEVALUE"].ToString().Split(':')[2];
            //            //functionname = dr_filescontent["NODEVALUE"].ToString().Split(':')[3];
            //            //if (dr_filescontent["NODEVALUE"].ToString().Split(':').Length >= 5)
            //            //{
            //            //    dtl_tablename = dr_filescontent["NODEVALUE"].ToString().Split(':')[4];
            //            //}
            //            //else
            //            //{
            //            //    dtl_tablename = "";
            //            //}
            //            //reportname = dr_filescontent["NODENAME"].ToString();

            //            //应用是否存在
            //            if (yy_tablenames.IndexOf("," + yyname + ",") > -1)
            //            {
            //                switch (reportlx)
            //                {
            //                    case "0_0"://一个
            //                        #region 填写数据
            //                        _model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //                        // 系统数据赋值
            //                        _model_tbl_report_menu.sys_id = 0;
            //                        _model_tbl_report_menu.sys_groupid = "";
            //                        _model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //                        _model_tbl_report_menu.sys_creatuserid = userid;
            //                        _model_tbl_report_menu.sys_creatusername = username;
            //                        _model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //                        _model_tbl_report_menu.sys_lastedituserid = userid;
            //                        _model_tbl_report_menu.sys_lasteditusername = username;
            //                        _model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //                        _model_tbl_report_menu.sys_delflag = "0";
            //                        _model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //                        _model_tbl_report_menu.sys_deluserid = "";
            //                        _model_tbl_report_menu.sys_delusername = "";

            //                        _model_tbl_report_menu.f_value1 = yyname;
            //                        _model_tbl_report_menu.f_value2 = reportlx;
            //                        _model_tbl_report_menu.f_value3 = "0";
            //                        _model_tbl_report_menu.f_value4 = "";
            //                        _model_tbl_report_menu.f_value5 = "";
            //                        _model_tbl_report_menu.f_value6 = "";
            //                        _model_tbl_report_menu.f_value7 = "";
            //                        _model_tbl_report_menu.f_value8 = "";
            //                        _model_tbl_report_menu.f_value9 = "";
            //                        _model_tbl_report_menu.f_value10 = "";

            //                        // 业务数据赋值

            //                        _model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //                        _model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //                        _model_tbl_report_menu.sys_projectclassid = projclassid;

            //                        _model_tbl_report_menu.f_reportnamecn = reportname;
            //                        _model_tbl_report_menu.f_reportnameen = classname + "." + functionname;
            //                        _model_tbl_report_menu.f_reportparameters = parameters.Replace("[fk_tbl_maintable_sys_id]", sMainTableID);


            //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);

            //                        #endregion
            //                        break;
            //                    case "0_1"://超过1个
            //                        switch (tablename)//分几个报表的特殊化处理
            //                        {
            //                            case "":
            //                                break;
            //                            default:
            //                                tablecountsql = "select * from " + tablename + " where fk_tbl_maintable_sys_id='" + sMainTableID + "'";
            //                                ds_yw = t.Query(tablecountsql);
            //                                break;
            //                        }

            //                        for (int i = 0; i < ds_yw.Tables[0].Rows.Count; i++)
            //                        {
            //                            #region 填写数据
            //                            _model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //                            // 系统数据赋值
            //                            _model_tbl_report_menu.sys_id = 0;
            //                            _model_tbl_report_menu.sys_groupid = "";
            //                            _model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //                            _model_tbl_report_menu.sys_creatuserid = userid;
            //                            _model_tbl_report_menu.sys_creatusername = username;
            //                            _model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //                            _model_tbl_report_menu.sys_lastedituserid = userid;
            //                            _model_tbl_report_menu.sys_lasteditusername = username;
            //                            _model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //                            _model_tbl_report_menu.sys_delflag = "0";
            //                            _model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //                            _model_tbl_report_menu.sys_deluserid = "";
            //                            _model_tbl_report_menu.sys_delusername = "";

            //                            _model_tbl_report_menu.f_value1 = yyname;
            //                            _model_tbl_report_menu.f_value2 = reportlx;
            //                            _model_tbl_report_menu.f_value3 = "0";
            //                            _model_tbl_report_menu.f_value4 = "";
            //                            _model_tbl_report_menu.f_value5 = "";
            //                            _model_tbl_report_menu.f_value6 = "";
            //                            _model_tbl_report_menu.f_value7 = "";
            //                            _model_tbl_report_menu.f_value8 = "";
            //                            _model_tbl_report_menu.f_value9 = "";
            //                            _model_tbl_report_menu.f_value10 = "";

            //                            // 业务数据赋值

            //                            _model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //                            _model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //                            _model_tbl_report_menu.sys_projectclassid = projclassid;

            //                            _model_tbl_report_menu.f_reportnamecn = reportname;
            //                            foreach (string column in tablecolumn)
            //                            {
            //                                _model_tbl_report_menu.f_reportnamecn += "\\" + ds_yw.Tables[0].Rows[i][column].ToString();
            //                            }
            //                            _model_tbl_report_menu.f_reportnameen = classname + "." + functionname;
            //                            _model_tbl_report_menu.f_reportparameters = parameters.Replace("[fk_tbl_maintable_sys_id]", sMainTableID).Replace("[sys_id]", ds_yw.Tables[0].Rows[i]["sys_id"].ToString());

            //                            _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                            #endregion
            //                        }
            //                        break;
            //                    case "1_1"://模板
            //                        #region 填写数据
            //                        //_model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //                        //// 系统数据赋值
            //                        //_model_tbl_report_menu.sys_id = 0;
            //                        //_model_tbl_report_menu.sys_groupid = "";
            //                        //_model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //                        //_model_tbl_report_menu.sys_creatuserid = userid;
            //                        //_model_tbl_report_menu.sys_creatusername = username;
            //                        //_model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //                        //_model_tbl_report_menu.sys_lastedituserid = userid;
            //                        //_model_tbl_report_menu.sys_lasteditusername = username;
            //                        //_model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //                        //_model_tbl_report_menu.sys_delflag = "0";
            //                        //_model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //                        //_model_tbl_report_menu.sys_deluserid = "";
            //                        //_model_tbl_report_menu.sys_delusername = "";

            //                        //_model_tbl_report_menu.f_value1 = dtl_tablename;
            //                        //_model_tbl_report_menu.f_value2 = "";
            //                        //_model_tbl_report_menu.f_value3 = "";
            //                        //_model_tbl_report_menu.f_value4 = "";
            //                        //_model_tbl_report_menu.f_value5 = "";
            //                        //_model_tbl_report_menu.f_value6 = "";
            //                        //_model_tbl_report_menu.f_value7 = "";
            //                        //_model_tbl_report_menu.f_value8 = "";
            //                        //_model_tbl_report_menu.f_value9 = "";
            //                        //_model_tbl_report_menu.f_value10 = "";

            //                        //// 业务数据赋值

            //                        //_model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //                        //_model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //                        //_model_tbl_report_menu.sys_projectclassid = projclassid;

            //                        //_model_tbl_report_menu.f_reportnamecn = reportname;
            //                        //_model_tbl_report_menu.f_reportnameen = classname + ":" + functionname;
            //                        //_model_tbl_report_menu.f_reportparameters = "fk_tbl_maintable_sys_id=" + sMainTableID;

            //                        //switch (tablename)
            //                        //{
            //                        //    case "up_shape":
            //                        //        #region
            //                        //        switch (functionname)
            //                        //        {
            //                        //            case "Report":
            //                        //                switch (xmlxid.Substring(0, 1))
            //                        //                {
            //                        //                    case "1_0_0"://征转
            //                        //                    case "1"://征转
            //                        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:ZZ;dkzk:JN~JW;sjlx:INNER";
            //                        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                        //                        break;
            //                        //                    case "2_0_0"://征收 
            //                        //                    case "2"://征收 
            //                        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=wlx:ZS;dkzk:JN~JW;sjlx:INNER";
            //                        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                        //                        break;
            //                        //                    case "3_0_0"://转用
            //                        //                    case "3"://转用
            //                        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:ZY;dkzk:JN~JW;sjlx:INNER";
            //                        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                        //                        break;
            //                        //                    case "4_0_0"://半征半转
            //                        //                    case "4"://半征半转
            //                        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:BZBZ;dkzk:JN~JW;sjlx:INNER";
            //                        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                        //                        _model_tbl_report_menu.sys_id = 0;
            //                        //                        _model_tbl_report_menu.f_reportnamecn += "只征";
            //                        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:BZBZ;dkzk:JWZZ;sjlx:INNER";
            //                        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                        //                        break;

            //                        //                }
            //                        //                break;
            //                        //        }
            //                        //        #endregion
            //                        //        break;
            //                        //    default:
            //                        //        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //                        //        break;
            //                        //}
            //                        #endregion
            //                        break;
            //                }
            //            }
            //            #region
            //            //switch (reportlx)
            //            //{
            //            //    case "0_0"://一个
            //            //        #region 填写数据
            //            //        _model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //            //        // 系统数据赋值
            //            //        _model_tbl_report_menu.sys_id = 0;
            //            //        _model_tbl_report_menu.sys_groupid = "";
            //            //        _model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //            //        _model_tbl_report_menu.sys_creatuserid = userid;
            //            //        _model_tbl_report_menu.sys_creatusername = username;
            //            //        _model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //            //        _model_tbl_report_menu.sys_lastedituserid = userid;
            //            //        _model_tbl_report_menu.sys_lasteditusername = username;
            //            //        _model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //            //        _model_tbl_report_menu.sys_delflag = "0";
            //            //        _model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //            //        _model_tbl_report_menu.sys_deluserid = "";
            //            //        _model_tbl_report_menu.sys_delusername = "";

            //            //        _model_tbl_report_menu.f_value1 = dtl_tablename;
            //            //        _model_tbl_report_menu.f_value2 = "";
            //            //        _model_tbl_report_menu.f_value3 = "";
            //            //        _model_tbl_report_menu.f_value4 = "";
            //            //        _model_tbl_report_menu.f_value5 = "";
            //            //        _model_tbl_report_menu.f_value6 = "";
            //            //        _model_tbl_report_menu.f_value7 = "";
            //            //        _model_tbl_report_menu.f_value8 = "";
            //            //        _model_tbl_report_menu.f_value9 = "";
            //            //        _model_tbl_report_menu.f_value10 = "";

            //            //        // 业务数据赋值

            //            //        _model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //            //        _model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //            //        _model_tbl_report_menu.sys_projectclassid = projclassid;

            //            //        _model_tbl_report_menu.f_reportnamecn = reportname;
            //            //        _model_tbl_report_menu.f_reportnameen = classname + ":" + functionname;
            //            //        _model_tbl_report_menu.f_reportparameters = "fk_tbl_maintable_sys_id=" + sMainTableID;

            //            //        switch (tablename)
            //            //        {
            //            //            case "up_shape":
            //            //                #region
            //            //                switch (functionname)
            //            //                {
            //            //                    case "Report":
            //            //                        switch (xmlxid.Substring(0, 1))
            //            //                        {
            //            //                            case "1_0_0"://征转
            //            //                            case "1"://征转
            //            //                                _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:ZZ;dkzk:JN~JW;sjlx:INNER";
            //            //                                _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                                break;
            //            //                            case "2_0_0"://征收 
            //            //                            case "2"://征收 
            //            //                                _model_tbl_report_menu.f_reportparameters += "^dl_params=wlx:ZS;dkzk:JN~JW;sjlx:INNER";
            //            //                                _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                                break;
            //            //                            case "3_0_0"://转用
            //            //                            case "3"://转用
            //            //                                _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:ZY;dkzk:JN~JW;sjlx:INNER";
            //            //                                _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                                break;
            //            //                            case "4_0_0"://半征半转
            //            //                            case "4"://半征半转
            //            //                                _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:BZBZ;dkzk:JN~JW;sjlx:INNER";
            //            //                                _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                                _model_tbl_report_menu.sys_id = 0;
            //            //                                _model_tbl_report_menu.f_reportnamecn += "只征";
            //            //                                _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:BZBZ;dkzk:JWZZ;sjlx:INNER";
            //            //                                _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                                break;

            //            //                        }
            //            //                        break;
            //            //                }
            //            //                #endregion
            //            //                break;
            //            //            default:
            //            //                _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                break;
            //            //        }
            //            //        #endregion
            //            //        break;
            //            //    case "0_1"://超过1个
            //            //        switch (tablename)
            //            //        {
            //            //            //批次阶段引用项目的报表
            //            //            case "tbl_110_xm_tbl_maintable":
            //            //                tablecountsql = "select * from tbl_maintable where fk_tbl_maintable_sys_id='" + sMainTableID + "'";
            //            //                ds_yw = t.Query(tablecountsql);
            //            //                for (int i = 0; i < ds_yw.Tables[0].Rows.Count; i++)
            //            //                {
            //            //                    #region 填写数据
            //            //                    _model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //            //                    // 系统数据赋值
            //            //                    _model_tbl_report_menu.sys_id = 0;
            //            //                    _model_tbl_report_menu.sys_groupid = "";
            //            //                    _model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //            //                    _model_tbl_report_menu.sys_creatuserid = userid;
            //            //                    _model_tbl_report_menu.sys_creatusername = username;
            //            //                    _model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //            //                    _model_tbl_report_menu.sys_lastedituserid = userid;
            //            //                    _model_tbl_report_menu.sys_lasteditusername = username;
            //            //                    _model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //            //                    _model_tbl_report_menu.sys_delflag = "0";
            //            //                    _model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //            //                    _model_tbl_report_menu.sys_deluserid = "";
            //            //                    _model_tbl_report_menu.sys_delusername = "";

            //            //                    _model_tbl_report_menu.f_value1 = dtl_tablename;
            //            //                    _model_tbl_report_menu.f_value2 = "";
            //            //                    _model_tbl_report_menu.f_value3 = "";
            //            //                    _model_tbl_report_menu.f_value4 = "";
            //            //                    _model_tbl_report_menu.f_value5 = "";
            //            //                    _model_tbl_report_menu.f_value6 = "";
            //            //                    _model_tbl_report_menu.f_value7 = "";
            //            //                    _model_tbl_report_menu.f_value8 = "";
            //            //                    _model_tbl_report_menu.f_value9 = "";
            //            //                    _model_tbl_report_menu.f_value10 = "";

            //            //                    // 业务数据赋值

            //            //                    _model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //            //                    _model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //            //                    _model_tbl_report_menu.sys_projectclassid = projclassid;

            //            //                    _model_tbl_report_menu.f_reportnamecn = reportname;
            //            //                    foreach (string column in tablecolumn)
            //            //                    {
            //            //                        _model_tbl_report_menu.f_reportnamecn += "\\" + ds_yw.Tables[0].Rows[i][column].ToString();
            //            //                    }
            //            //                    _model_tbl_report_menu.f_reportnameen = classname + ":" + functionname;
            //            //                    _model_tbl_report_menu.f_reportparameters = "fk_tbl_maintable_sys_id=" + ds_yw.Tables[0].Rows[i]["sys_id"].ToString();

            //            //                    _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                    #endregion
            //            //                }
            //            //                break;
            //            //            default:
            //            //                tablecountsql = "select * from " + tablename + " where fk_tbl_maintable_sys_id='" + sMainTableID + "'";
            //            //                ds_yw = t.Query(tablecountsql);
            //            //                for (int i = 0; i < ds_yw.Tables[0].Rows.Count; i++)
            //            //                {
            //            //                    #region 填写数据
            //            //                    _model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //            //                    // 系统数据赋值
            //            //                    _model_tbl_report_menu.sys_id = 0;
            //            //                    _model_tbl_report_menu.sys_groupid = "";
            //            //                    _model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //            //                    _model_tbl_report_menu.sys_creatuserid = userid;
            //            //                    _model_tbl_report_menu.sys_creatusername = username;
            //            //                    _model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //            //                    _model_tbl_report_menu.sys_lastedituserid = userid;
            //            //                    _model_tbl_report_menu.sys_lasteditusername = username;
            //            //                    _model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //            //                    _model_tbl_report_menu.sys_delflag = "0";
            //            //                    _model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //            //                    _model_tbl_report_menu.sys_deluserid = "";
            //            //                    _model_tbl_report_menu.sys_delusername = "";

            //            //                    _model_tbl_report_menu.f_value1 = dtl_tablename;
            //            //                    _model_tbl_report_menu.f_value2 = "";
            //            //                    _model_tbl_report_menu.f_value3 = "";
            //            //                    _model_tbl_report_menu.f_value4 = "";
            //            //                    _model_tbl_report_menu.f_value5 = "";
            //            //                    _model_tbl_report_menu.f_value6 = "";
            //            //                    _model_tbl_report_menu.f_value7 = "";
            //            //                    _model_tbl_report_menu.f_value8 = "";
            //            //                    _model_tbl_report_menu.f_value9 = "";
            //            //                    _model_tbl_report_menu.f_value10 = "";

            //            //                    // 业务数据赋值

            //            //                    _model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //            //                    _model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //            //                    _model_tbl_report_menu.sys_projectclassid = projclassid;

            //            //                    _model_tbl_report_menu.f_reportnamecn = reportname;
            //            //                    foreach (string column in tablecolumn)
            //            //                    {
            //            //                        _model_tbl_report_menu.f_reportnamecn += "\\" + ds_yw.Tables[0].Rows[i][column].ToString();
            //            //                    }
            //            //                    _model_tbl_report_menu.f_reportnameen = classname + ":" + functionname;
            //            //                    _model_tbl_report_menu.f_reportparameters = "fk_tbl_maintable_sys_id=" + sMainTableID + "^sys_id=" + ds_yw.Tables[0].Rows[i]["sys_id"].ToString();

            //            //                    _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //                    #endregion
            //            //                }
            //            //                break;
            //            //        }
            //            //        break;
            //            //    case "1_1"://模板
            //            //        #region 填写数据
            //            //        //_model_tbl_report_menu = new Easy2008.LAND.SPTJ.Model.tbl_report_menu();
            //            //        //// 系统数据赋值
            //            //        //_model_tbl_report_menu.sys_id = 0;
            //            //        //_model_tbl_report_menu.sys_groupid = "";
            //            //        //_model_tbl_report_menu.sys_orderid = _bll_tbl_filescontent.GetMaxOrderID(t);
            //            //        //_model_tbl_report_menu.sys_creatuserid = userid;
            //            //        //_model_tbl_report_menu.sys_creatusername = username;
            //            //        //_model_tbl_report_menu.sys_creatdate = System.DateTime.Now;
            //            //        //_model_tbl_report_menu.sys_lastedituserid = userid;
            //            //        //_model_tbl_report_menu.sys_lasteditusername = username;
            //            //        //_model_tbl_report_menu.sys_lasteditdate = System.DateTime.Now;
            //            //        //_model_tbl_report_menu.sys_delflag = "0";
            //            //        //_model_tbl_report_menu.sys_deldate = System.DateTime.Parse("1900-01-01");
            //            //        //_model_tbl_report_menu.sys_deluserid = "";
            //            //        //_model_tbl_report_menu.sys_delusername = "";

            //            //        //_model_tbl_report_menu.f_value1 = dtl_tablename;
            //            //        //_model_tbl_report_menu.f_value2 = "";
            //            //        //_model_tbl_report_menu.f_value3 = "";
            //            //        //_model_tbl_report_menu.f_value4 = "";
            //            //        //_model_tbl_report_menu.f_value5 = "";
            //            //        //_model_tbl_report_menu.f_value6 = "";
            //            //        //_model_tbl_report_menu.f_value7 = "";
            //            //        //_model_tbl_report_menu.f_value8 = "";
            //            //        //_model_tbl_report_menu.f_value9 = "";
            //            //        //_model_tbl_report_menu.f_value10 = "";

            //            //        //// 业务数据赋值

            //            //        //_model_tbl_report_menu.fk_tbl_maintable_sys_id = sMainTableID;
            //            //        //_model_tbl_report_menu.sys_projectclassdtl2 = xmlxid;
            //            //        //_model_tbl_report_menu.sys_projectclassid = projclassid;

            //            //        //_model_tbl_report_menu.f_reportnamecn = reportname;
            //            //        //_model_tbl_report_menu.f_reportnameen = classname + ":" + functionname;
            //            //        //_model_tbl_report_menu.f_reportparameters = "fk_tbl_maintable_sys_id=" + sMainTableID;

            //            //        //switch (tablename)
            //            //        //{
            //            //        //    case "up_shape":
            //            //        //        #region
            //            //        //        switch (functionname)
            //            //        //        {
            //            //        //            case "Report":
            //            //        //                switch (xmlxid.Substring(0, 1))
            //            //        //                {
            //            //        //                    case "1_0_0"://征转
            //            //        //                    case "1"://征转
            //            //        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:ZZ;dkzk:JN~JW;sjlx:INNER";
            //            //        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //        //                        break;
            //            //        //                    case "2_0_0"://征收 
            //            //        //                    case "2"://征收 
            //            //        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=wlx:ZS;dkzk:JN~JW;sjlx:INNER";
            //            //        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //        //                        break;
            //            //        //                    case "3_0_0"://转用
            //            //        //                    case "3"://转用
            //            //        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:ZY;dkzk:JN~JW;sjlx:INNER";
            //            //        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //        //                        break;
            //            //        //                    case "4_0_0"://半征半转
            //            //        //                    case "4"://半征半转
            //            //        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:BZBZ;dkzk:JN~JW;sjlx:INNER";
            //            //        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //        //                        _model_tbl_report_menu.sys_id = 0;
            //            //        //                        _model_tbl_report_menu.f_reportnamecn += "只征";
            //            //        //                        _model_tbl_report_menu.f_reportparameters += "^dl_params=ywlx:BZBZ;dkzk:JWZZ;sjlx:INNER";
            //            //        //                        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //        //                        break;

            //            //        //                }
            //            //        //                break;
            //            //        //        }
            //            //        //        #endregion
            //            //        //        break;
            //            //        //    default:
            //            //        //        _bll_tbl_report_menu.Add(_model_tbl_report_menu, t);
            //            //        //        break;
            //            //        //}
            //            //        #endregion
            //            //        break;
            //            //}
            //            #endregion
            //        }
            //    }
            //}
        }

        #endregion
        #region 删除相关
        #region 删除Maintable
        private void DelMainTable(string maintable_sys_id, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            _idal_itbl_maintable.Delete(" sys_id='" + maintable_sys_id + "'", t);
        }
        #endregion
        #region 删除业务数据
        private void DelBusinessData(string maintable_sys_id, string projclassid, string projectclassdtl2, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string fileIDs = "";
            string columnsString = "";
            IList<string> tablenameList = _cc.GetTableNameEnList(projclassid, projectclassdtl2, t);
            foreach (string tablename in tablenameList)
            {
                //删除附件文件
                switch (tablename)
                {
                    #region 1测试类型
                    //case "tbl_110_cjqrs":
                    //    List<Easy2008.LAND.GDNEW.Model.tbl_110_cjqrs> list_model_tbl_110_cjqrs = _bll_tbl_110_cjqrs.GetModelList(" FK_tbl_MAINTABLE_SYS_ID = '" + maintable_sys_id + "'", t);
                    //    foreach (Easy2008.LAND.GDNEW.Model.tbl_110_cjqrs model in list_model_tbl_110_cjqrs)
                    //    {
                    //        _fc.DeleteInfByMenuId(model.f_fj, p);
                    //    }
                    //    break;
                    #endregion
                    #region 新增水表
                    case "tbl_ld_xzsb":
                        model_tbl_ld_xzsb = idal_tbl_ld_xzsb.GetList(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", "", "*", "", "", null)[0];
                        if (model_tbl_ld_xzsb.f_khbhid != "")
                        {
                            string sql = " update tbl_ld_khb set f_value1 = '' , f_value2 ='' where sys_id ='" + model_tbl_ld_xzsb.f_khbhid + "'";
                            t.ExecuteSql(sql);
                        }
                        columnsString += "f_khjsonid,";
                        columnsString += "f_sbfj,";
                        columnsString += "f_lcfj,";
                        columnsString = columnsString.TrimEnd(',');
                        List<sara.dd.ldsw.model.tbl_ld_xzsb> l_tbl_ld_xzsb = idal_tbl_ld_xzsb.GetList(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", "", columnsString, "", "", null);
                        foreach (sara.dd.ldsw.model.tbl_ld_xzsb model in l_tbl_ld_xzsb)
                        {
                            fileIDs += model.f_khjsonid + ",";
                            fileIDs += model.f_sbfj + ",";
                            fileIDs += model.f_lcfj + ",";
                        }
                        fileIDs = fileIDs.TrimEnd(',');
                        sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);
                        idal_tbl_ld_xzsb.Delete(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", null);
                        break;
                    #endregion
                    #region 更换水表
                    case "tbl_ld_ghsb":
                        model_tbl_ld_ghsb = idal_tbl_ld_ghsb.GetList(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", "", "*", "", "", null)[0];
                        if (model_tbl_ld_ghsb.f_khbhid != "")
                        {
                            string sql = " update tbl_ld_khb set f_value1 = '' , f_value2 ='' where sys_id ='" + model_tbl_ld_ghsb.f_khbhid + "'";
                            t.ExecuteSql(sql);
                        }
                        columnsString += "f_xsbfj,";
                        columnsString += "f_khjsonid,";
                        columnsString += "f_lcfj,";
                        columnsString = columnsString.TrimEnd(',');
                        List<sara.dd.ldsw.model.tbl_ld_ghsb> l_tbl_ld_ghsb = idal_tbl_ld_ghsb.GetList(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "'", "", columnsString, "", "", null);
                        foreach (sara.dd.ldsw.model.tbl_ld_ghsb model in l_tbl_ld_ghsb)
                        {
                            fileIDs += model.f_xsbfj + ",";
                            fileIDs += model.f_khjsonid + ",";
                            fileIDs += model.f_lcfj + ",";
                        }
                        fileIDs = fileIDs.TrimEnd(',');
                        sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);
                        idal_tbl_ld_ghsb.Delete(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", null);

                        break;
                    #endregion
                    #region 大用户立户
                    case "tbl_ld_dyhlh":
                        columnsString += "f_htfj,";
                        columnsString += "f_qtfj,";
                        columnsString += "f_sfzfj,";
                        columnsString += "f_sbfj,";
                        columnsString += "f_lcfj,";
                        columnsString = columnsString.TrimEnd(',');
                        List<sara.dd.ldsw.model.tbl_ld_dyhlh> l_tbl_ld_dyhlh = idal_tbl_ld_dyhlh.GetList(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", "", columnsString, "", "", null);
                        foreach (sara.dd.ldsw.model.tbl_ld_dyhlh model in l_tbl_ld_dyhlh)
                        {

                            fileIDs += model.f_htfj + ",";
                            fileIDs += model.f_qtfj + ",";
                            fileIDs += model.f_sfzfj + ",";
                            fileIDs += model.f_sbfj + ",";
                            fileIDs += model.f_lcfj + ",";
                        }
                        fileIDs = fileIDs.TrimEnd(',');
                        sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);
                        idal_tbl_ld_dyhlh.Delete(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", null);
                        break;
                    #endregion
					 #region 销户和报停
                    case "tbl_ld_xhhbt":
                        columnsString += "f_fj,";
                        columnsString = columnsString.TrimEnd(',');
                        List<sara.dd.ldsw.model.tbl_ld_xhhbt> l_tbl_ld_xhhbt = idal_tbl_ld_xhhbt.GetList(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", "", columnsString, "", "", null);
                        foreach (sara.dd.ldsw.model.tbl_ld_xhhbt model in l_tbl_ld_xhhbt)
                        {
                            fileIDs += model.f_fj + ",";
                        }
                        fileIDs = fileIDs.TrimEnd(',');
                        sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);
                        idal_tbl_ld_xhhbt.Delete(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", null);

                        break;
                    #endregion
                    #region 修改水表底数
                    case "tbl_ld_xgsbds":
                        columnsString += "f_drwj,";

                        columnsString += "f_bcfj,";

                        columnsString += "f_lcfj,";
                        columnsString = columnsString.TrimEnd(',');
                        List<sara.dd.ldsw.model.tbl_ld_xgsbds> l_tbl_ld_xgsbds = idal_tbl_ld_xgsbds.GetList("fk_tbl_maintable_sys_id = '" + maintable_sys_id + "'", "", columnsString, "", "", null);
                        foreach (sara.dd.ldsw.model.tbl_ld_xgsbds model in l_tbl_ld_xgsbds)
                {

                            fileIDs += model.f_drwj + ",";
                    //case "tbl_filescontent":
                            fileIDs += model.f_bcfj + ",";

                            fileIDs += model.f_lcfj + ",";

                        }
                        fileIDs = fileIDs.TrimEnd(',');
                        sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(fileIDs, null);
                        idal_tbl_ld_xgsbds.Delete(" fk_tbl_maintable_sys_id = '" + maintable_sys_id + "' ", null);
                        break;
                    #endregion

                    default:
                        break;
                }
            }
        }
        #endregion
        #region 删除基础数据
        private void DelBaseData(string maintable_sys_id, string projclassid, string projectclassdtl2, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            //////修改up_shape状态--2011-11-14-取消服务器删除up_shape的方法，让客户端删除
            //string str = "delete from up_shape  where proj_guid = '" + maintable_sys_id + "'";
            //t.ExecuteSql(str);
            //str = "delete from up_shape_dl  where fk_tbl_maintable_sys_id = '" + maintable_sys_id + "'";
            //t.ExecuteSql(str);
            ////str = "delete from up_shape_dl2  where fk_tbl_maintable_sys_id = '" + maintable_sys_id + "'";
            ////t.ExecuteSql(str);
            ////str = "delete from up_shape_gh  where fk_tbl_maintable_sys_id = '" + maintable_sys_id + "'";
            ////t.ExecuteSql(str);
            //删除要件        
            //删除filescontent信息
            List<sara.dd.ldsw.model.tbl_filescontent> _model_tbl_filescontents = _idal_itbl_filescontent.GetList("FK_MAINTABLE_SYS_ID = '" + maintable_sys_id + "'", "", "*", "", "", t);
            //删除物理文件
            foreach (sara.dd.ldsw.model.tbl_filescontent _model_tbl_filescontent in _model_tbl_filescontents)
            {
                sara.dd.ldsw.commonclass.filecontrol.deleteByFileName(_model_tbl_filescontent.filerealname, t);
            }
            //删除数据
            _idal_itbl_filescontent.Delete(" FK_MAINTABLE_SYS_ID = '" + maintable_sys_id + "' ", t);
        }
        #endregion
        #endregion


        
    }
}