using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using Eva.Library.Data;

namespace sara.dd.ldsw.commonclass
{
    public class assemblyfunction3
    {
        #region 变量属性
        private sara.dd.ldsw.idal.Itbl_maintable _idal_itbl_maintable = dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.CreateIAccessData();
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _t;
        private sara.dd.ldsw.commonclass.handleitemclass _hic = new sara.dd.ldsw.commonclass.handleitemclass();
        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        //新增水表表
        private sara.dd.ldsw.idal.Itbl_ld_xzsb idal_tbl_ld_xzsb = new sara.dd.ldsw.dal.tbl_ld_xzsb();
        private sara.dd.ldsw.model.tbl_ld_xzsb model_tbl_ld_xzsb = new sara.dd.ldsw.model.tbl_ld_xzsb();
        //客户表
        private sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.model.tbl_ld_khb _model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_khb();
        //水表表
        private sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = new sara.dd.ldsw.model.tbl_ld_sbb();
        //用户表
        private sara.dd.ldsw.idal.Itbl_ld_yhb idal_tbl_ld_yhb = new sara.dd.ldsw.dal.tbl_ld_yhb();
        private sara.dd.ldsw.model.tbl_ld_yhb _model_tbl_ld_yhb = new sara.dd.ldsw.model.tbl_ld_yhb();
        #endregion

        #region 选中几个sys_id
        /// <summary>
        /// 验证只能选中一个sys_id
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <returns></returns>
        public string get_resultonlyonesysid(string sys_ids)
        {
            string str_result = "";


            if (sys_ids.Length > 0 && sys_ids.Split('^').Length == 1)
            {

            }
            else
            {
                str_result = "请选择一条数据。";
            }

            return str_result;
        }

        /// <summary>
        /// 验证至少选中一个sys_id
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <returns></returns>
        public string get_resultmorethanonesysid(string sys_ids)
        {
            string str_result = "";
            if (sys_ids.Length > 0)
            {

            }
            else
            {
                str_result = "请选择要操作的条目。";
            }

            return str_result;
        } 
        #endregion

        #region projclassstate变化
        /// <summary>
        /// projclassstate向后流转
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_txt_bak_message"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string set_send(string sys_ids, string str_facterid, DataSet ds_facter, string str_txt_bak_message, string clientInf)
        {
            string result = "";
            string all_result = "";
            string[] sys_idss = sys_ids.Split(',');
            for (int i = 0; i < sys_idss.Length; i++)
            {
                try
                {
                    _t = commonclass.CreateIAccessDataTrans();

                    _t.getTrans().begin();
                    NameValueCollection nvc_maintableparameters = new NameValueCollection();
                    nvc_maintableparameters.Add("sys_processnextuser", "^nextuser");
                    nvc_maintableparameters.Add("fk_tbl_maintable_sys_id", "^null");
                    nvc_maintableparameters.Add("sys_processinsid", "^null");
                    result = _hic.NextStateItemNew(sys_idss[i].ToString(), nvc_maintableparameters, str_facterid, ds_facter, str_txt_bak_message, "", "", clientInf, _t);
                    if (result == "")
                    {
                        _t.getTrans().commit();
                    }
                    else
                    {
                        _t.getTrans().rollback();
                        all_result += result;
                    }
                }
                catch (Exception ex)
                {
                    _t.getTrans().rollback();
                    result = ex.ToString();
                    all_result += result;
                }
            }
            return all_result;
        }


        /// <summary>
        ///  projclassstate向前流转
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_txt_bak_message"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string set_sendbak(string sys_ids, string str_facterid, DataSet ds_facter, string str_txt_bak_message, string clientInf)
        {
            string result = "";
            string all_result = "";
            string[] sys_idss = sys_ids.Split(',');
            for (int i = 0; i < sys_idss.Length; i++)
            {
                try
                {
                    _t = commonclass.CreateIAccessDataTrans();
                    _t.getTrans().begin();
                    NameValueCollection nvc_maintableparameters = new NameValueCollection();
                    nvc_maintableparameters.Add("sys_processnextuser", "^nextuser");
                    nvc_maintableparameters.Add("fk_tbl_maintable_sys_id", "^null");
                    nvc_maintableparameters.Add("sys_processinsid", "^null");
                    result = _hic.NextStateItemNew(sys_idss[i].ToString(), nvc_maintableparameters, str_facterid, ds_facter, str_txt_bak_message, "", "", clientInf, _t);
                    if (result == "")
                    {
                        _t.getTrans().commit();
                    }
                    else
                    {
                        _t.getTrans().rollback();
                        all_result += result;
                    }
                }
                catch (Exception ex)
                {
                    _t.getTrans().rollback();
                    result = ex.ToString();
                    all_result += result;
                }
            }
            return all_result;
        }
        #endregion
        
        #region 工作流启动
        /// <summary>
        /// 验证是不是能启动流程
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_resultmessage"></param>
        /// <param name="clientInf"></param>
        /// <param name="userInfoJsonString"></param>
        /// <returns></returns>
        public string get_startworkflow(string sys_ids, string str_facterid, DataSet ds_facter, ref string str_resultmessage, string clientInf, string userInfoJsonString)
        {
            string result = "";
            try
            {
                Eva.Library.ServiceAdapter.IAdapter.IWorkFlow w = Eva.Library.ServiceAdapter.AdapterFactory.WorkFlowFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                string lcdyid = _cc.GetWorkFlowLCDYID(str_facterid, ds_facter, clientInf, userInfoJsonString);
                DataSet ds;
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    ds = sara.platform.service.workflow.Service.GetUserOperationStartByDylcid(lcdyid);
                }
                else
                {
                    ds = w.GetUserOperationStartByDylcid(lcdyid);
                }
                #region businesscode
                //businesscode
                //验证所选客户是否可以进流程
                string sql = "select f_value1 from tbl_ld_xzsb where fk_tbl_maintable_sys_id='" + sys_ids + "'";
                string value1 = "";
                object o = _iAccessData.GetSingle(sql);
                if (o != null)
                {
                    value1 = o.ToString();
                }
                if (value1 == "")
                {
                    result = "填写的信息未保存";
                }
                else
                {
                    result = "";
                }
                #endregion
                str_resultmessage = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return result;
        }

        /// <summary>
        /// 启动流程方法
        /// </summary>
        /// <param name="sys_id"></param>
        /// <param name="sys_processinsid"></param>
        /// <param name="selectusernames"></param>
        /// <param name="_ds_facter"></param>
        /// <param name="str_shyj"></param>
        /// <param name="processdefid"></param>
        /// <param name="facterid"></param>
        /// <param name="clientInf"></param>
        /// <param name="t"></param>
        /// <returns></returns>
        //public string set_startworkflow(string sys_id, string sys_processinsid, string selectusernames, DataSet _ds_facter, string str_shyj, string processdefid, string facterid, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        //{
        //    string result = "";
        //    NameValueCollection nvc_maintableparameters = new NameValueCollection();
        //    nvc_maintableparameters.Add("sys_processnextuser", selectusernames);
        //    nvc_maintableparameters.Add("sys_processinsid", sys_processinsid);
        //    nvc_maintableparameters.Add("processdefid", processdefid);
        //    nvc_maintableparameters.Add("fk_tbl_maintable_sys_id", "^null");
        //    result = _hic.NextStateItemNew(sys_id, nvc_maintableparameters, facterid, _ds_facter, str_shyj, sys_processinsid, "", clientInf, t);
        //    return result;
            //if (result == "")
            //{
            //    #region  businesscode
            //    //根据WorkFlowUserControl1.WF_ProcessDefid可以识别业务程序进行业务代码编写
            //    #endregion
            //}
        //}

        #endregion

        #region 工作流转件
        /// <summary>
        /// 验证是不是能转件
        /// </summary>
        /// <param name="workitemid"></param>
        /// <param name="str_resultmessage"></param>
        /// <param name="clientInf"></param>
        /// <returns>//[sys_id]$[fk_workflow_sys_id]$[selectusernames]$[ds_facter]$[str_shyj]$[processinsid]$[businessparm]$[processdefid]$[facterid]$[trans]</returns>
        public string get_sendworkflow(string workitemid, ref string str_resultmessage, string clientInf)
        {
            string result = "";
            try
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string userid = clientInfoDic["userid"];
                string username = clientInfoDic["username"];

                Eva.Library.ServiceAdapter.IAdapter.IWorkFlow w = Eva.Library.ServiceAdapter.AdapterFactory.WorkFlowFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                DataSet useroperation = null;
                string shyj = "";
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    shyj = sara.platform.service.workflow.Service.GetUserOperationSHYJ(workitemid);
                }
                else
                {
                    shyj = w.GetUserOperationSHYJ(workitemid);
                }


                if (shyj == "-1")
                {
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        useroperation = sara.platform.service.workflow.Service.GetUserOperation(workitemid, userid, username, DateTime.Now);
                    }
                    else
                    {
                        useroperation = w.GetUserOperation(workitemid, userid, username, DateTime.Now);
                    }
                }
                else
                {
                    DataSet ds_old;

                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        ds_old = sara.platform.service.workflow.Service.GetUserOperationCZNR(workitemid);
                    }
                    else
                    {
                        ds_old = w.GetUserOperationCZNR(workitemid);
                    }
                    if (ds_old == null || ds_old.Tables.Count == 0)
                    {

                        if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                        {
                            useroperation = sara.platform.service.workflow.Service.GetUserOperation(workitemid, userid, username, DateTime.Now);
                        }
                        else
                        {
                            useroperation = w.GetUserOperation(workitemid, userid, username, DateTime.Now);
                        }
                    }
                    else
                    {
                        useroperation = ds_old;
                    }
                }
                #region  businesscode
                //在此处添加业务代码，可以控制默认选中哪个tab页，那条连接线，哪个用户
                //具体规则如下：
                //1、在datarow["Iselected"]中，设置0表示连接线被选中，设置-1表示连接线没有被选中
                //2、在datarow["userids"]\datarow["usernames"]中存放着备选用户的id和name，以小写逗号分割，例如：
                //datarow["userids"] = "1,2";datarow["usernames"] = "张三,李四"
                //此时程序会自动选中这2个用户，在id和names前边加“-”，则不会被选中，例如：
                //datarow["userids"] = "-1,2";datarow["usernames"] = "-张三,李四"
                //则李四默认会被选中，张三默认不会被选中
                //3、可以调整1，2的顺序，实现对审核顺序的调整，（如果当前节点的jdnyh!=1,并且节点类型是串行的话）
                //4、在1个useroperation中会存在多个连接线（多个datarow），当某个datarow的iselected=+0时，该连接线所在的页会默认被打开
                //如果不设置+号的话，则默认打开第一个0的连接线所在的页。
                //一个useroperation中只能有一个+0，否则按照最先一个+0计算。

                //传过来的数据里边，默认用户都是被选中的，连接线也是被选中的。


                //for (int i = 0; i < useroperation.Tables[0].Rows.Count; i++)
                //{
                    //新增水表_居民//业务代码，转给经办人时，默认转给发起的经办人
                //    if (useroperation.Tables[0].Rows[i]["fk_dy_jd_sys_id_to"].ToString() == "540003020")
                //    {
                //        string lcslid = useroperation.Tables[0].Rows[i]["fk_sl_lc_sys_id"].ToString();
                //        string sql = "select czrid,czrname from t_workitem where fk_sl_lc_sys_id = '" + lcslid + "' and fk_dy_jd_sys_id = '540003000'";
                //        DataSet dsczr = _iAccessData.Query(sql);
                //        if (dsczr.Tables[0].Rows.Count > 0)
                //        {
                //            string czrid = dsczr.Tables[0].Rows[0]["czrid"].ToString();
                //            string czrname = dsczr.Tables[0].Rows[0]["czrname"].ToString();

                //            string[] oldUserIdArray = useroperation.Tables[0].Rows[i]["userids"].ToString().Split(',');
                //            string[] oldUserNameArray = useroperation.Tables[0].Rows[i]["usernames"].ToString().Split(',');

                //            string newUserIds = "";
                //            string newUserNames = "";

                //            for (int ii = 0; ii < oldUserIdArray.Length; ii++)
                //            {
                //                if (oldUserIdArray[ii] == czrid)
                //                {
                //                    newUserIds += oldUserIdArray[ii] + ",";
                //                    newUserNames += oldUserNameArray[ii] + ",";
                //                }
                //                else
                //                {
                //                    newUserIds += "-" + oldUserIdArray[ii] + ",";
                //                    newUserNames += "-" + oldUserNameArray[ii] + ",";
                //                }
                //            }
                //            useroperation.Tables[0].Rows[i]["userids"] = newUserIds.TrimEnd(',');
                //            useroperation.Tables[0].Rows[i]["usernames"] = newUserNames.TrimEnd(',');

                //        }
                //    }
                //}

                #endregion
                str_resultmessage = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(useroperation.Tables[0]);
            }
            catch (Exception ex)
            {
                result = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return result;
        }


        /// <summary>
        /// 流程中转件功能
        /// </summary>
        /// <param name="sys_id"></param>
        /// <param name="facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_shyj"></param>
        /// <param name="processinsid"></param>
        /// <param name="businessclass"></param>
        /// <param name="businessstate"></param>
        /// <param name="processdefid"></param>
        /// <param name="processactivedefid"></param>
        /// <param name="clientInf"></param>
        /// <param name="t"></param>
        /// <returns>//[sys_id]$[facterid]$[ds_facter]$[str_shyj]$[processinsid]$[fk_workflow_sys_id]$[businessclass]$[businessstate]$[processdefid]$[processactivedefid]$[trans]</returns>
        //public string set_doworkflow(string sys_id, string facterid, DataSet ds_facter, string str_shyj, string processinsid, string businessclass, string businessstate, string processdefid, string processactivedefid, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        //{
        //    string result = "";
        //    NameValueCollection nvc_maintableparameters = new NameValueCollection();
        //    nvc_maintableparameters.Add("sys_processnextuser", "^nextuser");
        //    nvc_maintableparameters.Add("sys_processinsid", processinsid);
        //    nvc_maintableparameters.Add("fk_tbl_maintable_sys_id", "^null");
        //    result = _hic.NextStateItemNew(sys_id, nvc_maintableparameters, facterid, ds_facter, str_shyj, processinsid, processactivedefid, clientInf, t);

        //    #region businesscode
            //businesscode
            //在此处添加针对projclassid = 3的业务代码 
            //switch (_pr_businessclass + "_" + _pr_businessstate)
            //{
            //    default:
            //        break;
            //}
        //    #endregion
        //    return result;
        //}

        /// <summary>
        /// 流程中转件退回功能
        /// </summary>
        /// <param name="sys_id"></param>
        /// <param name="facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_shyj"></param>
        /// <param name="processinsid"></param>
        /// <param name="businessclass"></param>
        /// <param name="businessstate"></param>
        /// <param name="processdefid"></param>
        /// <param name="processactivedefid"></param>
        /// <param name="clientInf"></param>
        /// <param name="t"></param>
        /// <returns>//[sys_id]$[facterid]$[ds_facter]$[str_shyj]$[processinsid]$[fk_workflow_sys_id]$[businessclass]$[businessstate]$[processdefid]$[processactivedefid]$[trans]</returns>
        //public string set_doworkflowbak(string sys_id, string facterid, DataSet ds_facter, string str_shyj, string processinsid, string businessclass, string businessstate, string processdefid, string processactivedefid, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        //{
        //    string result = "";
        //    NameValueCollection nvc_maintableparameters = new NameValueCollection();
        //    nvc_maintableparameters.Add("sys_processnextuser", "^nextuser");
        //    nvc_maintableparameters.Add("sys_processinsid", processinsid);
        //    nvc_maintableparameters.Add("fk_tbl_maintable_sys_id", "^null");
        //    result = _hic.NextStateItemNew(sys_id, nvc_maintableparameters, facterid, ds_facter, str_shyj, processinsid, processactivedefid, clientInf, t);


        //    #region businesscode
            //businesscode
            //在此处添加针对projclassid = 3的业务代码 

            //switch (_pr_businessclass + "_" + _pr_businessstate)
            //{
            //    default:
            //        break;
            //}
        //    #endregion


        //    return result;
        //}

        #endregion

        #region 归档

        /// <summary>
        /// 归档时验证
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <returns></returns>
        public string get_complete(string sys_ids)
        {
            string str_result = "";

            str_result = get_resultonlyonesysid(sys_ids);

            #region businesscode
            //businesscode
            //在此处添加针对projclassid = 3的业务代码 
            #endregion
            if (str_result != "")
            {
                return str_result;
            }



            return str_result;
        }

        /// <summary>
        /// //projclass = 3时进行的归档操作，执行落数程序
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_txt_bak_message"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string set_complete(string sys_ids, string str_facterid, DataSet ds_facter, string str_txt_bak_message, string clientInf)
        {
            /*
            all_result返回参数的整理：
             * 1、"{\"result\":\"true\",\"message\":\"\"}"----》第二次点击落地按钮，（理论上不应该出现这个情况，有可能是第一次操作时整个操作流程没有完成，所以造成用户可以点击这个按钮，所以此处的操作仅实现状态修改，返回值为true）
             * 2、"{\"result\":\"submit\",\"message\":\"" + messageString + "\"}";----》此时message是一个字符串，shpid|path
             * 3、"{\"result\":\"false\",\"message\":\"" + messageString + "\"}";----》此时message是一个字符串，异常信息。
             * 4、"{\"result\":\"submitqueue\",\"message\":\"\"}"----》成功加入队列
             
             */
            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
            string userid = clientInfoDic["userid"];
            string username = clientInfoDic["username"];

            string all_result = "";
            string[] sys_idss = sys_ids.Split(',');
            for (int i = 0; i < sys_idss.Length; i++)
            {
                try
                {
                    _model_tbl_maintable = _idal_itbl_maintable.GetList(" sys_id='" + sys_idss[i].ToString() + "'", "", "*", "", "", null)[0];


                    if (all_result == "")
                    {
                        string result = "";
                        _t = commonclass.CreateIAccessDataTrans();
                        _t.getTrans().begin();

                        #region businesscode
                        //businesscode
                        //在此处添加针对projclassid = 3的业务代码 


                        //在水表表，用户表，客户表新增一条数据                                                
                        model_tbl_ld_xzsb = idal_tbl_ld_xzsb.GetList(" fk_tbl_maintable_sys_id = '" + sys_idss[i].ToString() + "' ", "", "*", "", "", null)[0];
                        _model_tbl_ld_khb = idal_tbl_ld_khb.GetList(" sys_id = '" + model_tbl_ld_xzsb.f_khbhid + "' ", "", "*", "", "", null)[0];
                        _model_tbl_ld_yhb = idal_tbl_ld_yhb.GetList(" sys_id = '" + _model_tbl_ld_khb.f_yhbhid + "' ", "", "*", "", "", null)[0];

                        sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_khb();
                        model_tbl_ld_khb.f_khbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("kh", model_tbl_ld_xzsb.f_sblxid, null);


                        #region 用户表
                        sara.dd.ldsw.model.tbl_ld_yhb model_tbl_ld_yhb = new sara.dd.ldsw.model.tbl_ld_yhb();

                        model_tbl_ld_yhb.sys_id = 0;

                        model_tbl_ld_yhb.sys_orderid = "";

                        model_tbl_ld_yhb.sys_creatuserid = userid;

                        model_tbl_ld_yhb.sys_creatusername = username;

                        model_tbl_ld_yhb.sys_creatdate = DateTime.Now;

                        model_tbl_ld_yhb.sys_lastedituserid = userid;

                        model_tbl_ld_yhb.sys_lasteditusername = username;

                        model_tbl_ld_yhb.sys_lasteditdate = DateTime.Now;

                        model_tbl_ld_yhb.sys_deluserid = "";

                        model_tbl_ld_yhb.sys_delusername = "";

                        model_tbl_ld_yhb.sys_deldate = DateTime.Parse("1900-1-1");

                        model_tbl_ld_yhb.sys_delflag = "0";

                        model_tbl_ld_yhb.f_value1 = "";

                        model_tbl_ld_yhb.f_value2 = "";

                        model_tbl_ld_yhb.f_value3 = "";

                        model_tbl_ld_yhb.f_value4 = "";

                        model_tbl_ld_yhb.f_value5 = "";

                        model_tbl_ld_yhb.f_value6 = "";

                        model_tbl_ld_yhb.f_value7 = "";

                        model_tbl_ld_yhb.f_value8 = "";

                        model_tbl_ld_yhb.f_value9 = "";

                        model_tbl_ld_yhb.f_value10 = "";

                        model_tbl_ld_yhb.f_yhbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("yh", model_tbl_ld_xzsb.f_sblxid, null);
                        model_tbl_ld_yhb.f_ztyhh = "";
                        model_tbl_ld_yhb.f_yhm = _model_tbl_ld_yhb.f_yhm;
                        model_tbl_ld_yhb.f_jfm = _model_tbl_ld_yhb.f_jfm;
                        model_tbl_ld_yhb.f_dz = _model_tbl_ld_yhb.f_dz;
                        model_tbl_ld_yhb.f_yhfz = _model_tbl_ld_yhb.f_yhfz;
                        model_tbl_ld_yhb.f_yhfzid = _model_tbl_ld_yhb.f_yhfzid;
                        model_tbl_ld_yhb.f_dh = _model_tbl_ld_yhb.f_dh;
                        model_tbl_ld_yhb.f_dy = _model_tbl_ld_yhb.f_dy;
                        model_tbl_ld_yhb.f_dyid = _model_tbl_ld_yhb.f_dyid;
                        model_tbl_ld_yhb.f_sc = _model_tbl_ld_yhb.f_sc;
                        model_tbl_ld_yhb.f_scid = _model_tbl_ld_yhb.f_scid;
                        model_tbl_ld_yhb.f_qy = _model_tbl_ld_yhb.f_qy;
                        model_tbl_ld_yhb.f_qyid = _model_tbl_ld_yhb.f_qyid;
                        model_tbl_ld_yhb.f_pq = _model_tbl_ld_yhb.f_pq;
                        model_tbl_ld_yhb.f_pqid = _model_tbl_ld_yhb.f_pqid;
                        model_tbl_ld_yhb.f_khrq = DateTime.Now;
                        model_tbl_ld_yhb.f_sfts = _model_tbl_ld_yhb.f_sfts;
                        model_tbl_ld_yhb.f_tsyx = _model_tbl_ld_yhb.f_tsyx;
                        model_tbl_ld_yhb.f_tsyxzh = _model_tbl_ld_yhb.f_tsyxzh;
                        model_tbl_ld_yhb.f_htbh = _model_tbl_ld_yhb.f_htbh;
                        model_tbl_ld_yhb.f_htfj = _model_tbl_ld_yhb.f_htfj;
                        model_tbl_ld_yhb.f_sfzh = _model_tbl_ld_yhb.f_sfzh;
                        model_tbl_ld_yhb.f_sfzfj = _model_tbl_ld_yhb.f_sfzfj;
                        model_tbl_ld_yhb.f_sfzzs = _model_tbl_ld_yhb.f_sfzzs;
                        model_tbl_ld_yhb.f_zt = _model_tbl_ld_yhb.f_zt;
                        model_tbl_ld_yhb.f_ztid = _model_tbl_ld_yhb.f_ztid;
                        model_tbl_ld_yhb.f_bz = _model_tbl_ld_yhb.f_bz;
                        model_tbl_ld_yhb.f_khbh = model_tbl_ld_khb.f_khbh;
                        model_tbl_ld_yhb.f_wxwybz = _model_tbl_ld_yhb.f_wxwybz;
                        model_tbl_ld_yhb.f_zfbwybz = _model_tbl_ld_yhb.f_zfbwybz;
                        model_tbl_ld_yhb.f_gdyxwybz = _model_tbl_ld_yhb.f_gdyxwybz;
                        model_tbl_ld_yhb.f_tsyxid = _model_tbl_ld_yhb.f_tsyxid;
                        model_tbl_ld_yhb.f_qtfj = _model_tbl_ld_yhb.f_qtfj;
                        model_tbl_ld_yhb.f_htqdrq = _model_tbl_ld_yhb.f_htqdrq;

                        string yhbhid = idal_tbl_ld_yhb.Add(model_tbl_ld_yhb, null);
                        #endregion

                        #region 水表表


                        model_tbl_ld_sbb.sys_id = 0;

                        model_tbl_ld_sbb.sys_orderid = "";

                        model_tbl_ld_sbb.sys_creatuserid = userid;

                        model_tbl_ld_sbb.sys_creatusername = username;

                        model_tbl_ld_sbb.sys_creatdate = DateTime.Now;

                        model_tbl_ld_sbb.sys_lastedituserid = userid;

                        model_tbl_ld_sbb.sys_lasteditusername = username;

                        model_tbl_ld_sbb.sys_lasteditdate = DateTime.Now;

                        model_tbl_ld_sbb.sys_deluserid = "";

                        model_tbl_ld_sbb.sys_delusername = "";

                        model_tbl_ld_sbb.sys_deldate = DateTime.Parse("1900-1-1");

                        model_tbl_ld_sbb.sys_delflag = "0";

                        model_tbl_ld_sbb.f_value1 = "";

                        model_tbl_ld_sbb.f_value2 = "";

                        model_tbl_ld_sbb.f_value3 = "";

                        model_tbl_ld_sbb.f_value4 = "";

                        model_tbl_ld_sbb.f_value5 = "";

                        model_tbl_ld_sbb.f_value6 = "";

                        model_tbl_ld_sbb.f_value7 = "";

                        model_tbl_ld_sbb.f_value8 = "";

                        model_tbl_ld_sbb.f_value9 = "";

                        model_tbl_ld_sbb.f_value10 = "";
                        model_tbl_ld_sbb.f_sbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("sb", model_tbl_ld_xzsb.f_sblxid, null);
                        model_tbl_ld_sbb.f_ztsbh = "";
                        model_tbl_ld_sbb.f_lxth = "";
                        model_tbl_ld_sbb.f_sbfz = model_tbl_ld_xzsb.f_sbfz;
                        model_tbl_ld_sbb.f_sbfzid = model_tbl_ld_xzsb.f_sbfzid;
                        model_tbl_ld_sbb.f_sbpp = model_tbl_ld_xzsb.f_sbpp;
                        model_tbl_ld_sbb.f_mph = model_tbl_ld_xzsb.f_mph;
                        model_tbl_ld_sbb.f_sbdz = model_tbl_ld_xzsb.f_sbdz;
                        model_tbl_ld_sbb.f_khbh = model_tbl_ld_khb.f_khbh;
                        model_tbl_ld_sbb.f_rs = model_tbl_ld_xzsb.f_rs;
                        model_tbl_ld_sbb.f_sbkj = model_tbl_ld_xzsb.f_sbkj;
                        model_tbl_ld_sbb.f_sbkjid = model_tbl_ld_xzsb.f_sbkjid;
                        model_tbl_ld_sbb.f_sblx = model_tbl_ld_xzsb.f_sblx;
                        model_tbl_ld_sbb.f_sblxid = model_tbl_ld_xzsb.f_sblxid;
                        model_tbl_ld_sbb.f_jllx = model_tbl_ld_xzsb.f_jllx;
                        model_tbl_ld_sbb.f_jllxid = model_tbl_ld_xzsb.f_jllxid;
                        model_tbl_ld_sbb.f_cszm = model_tbl_ld_xzsb.f_cszm;
                        model_tbl_ld_sbb.f_bqzm = "0";
                        model_tbl_ld_sbb.f_sqzm = "0";
                        model_tbl_ld_sbb.f_sqsl = "0";
                        model_tbl_ld_sbb.f_ljgl = "0";
                        model_tbl_ld_sbb.f_qsqpjsl = "0";
                        model_tbl_ld_sbb.f_qlqpjsl = "0";
                        model_tbl_ld_sbb.f_zt = "0";
                        model_tbl_ld_sbb.f_ztid = "启用";
                        model_tbl_ld_sbb.f_bz = "";
                        model_tbl_ld_sbb.f_bqsl = "0";
                        model_tbl_ld_sbb.f_nljgl = "0";
                        model_tbl_ld_sbb.f_azrq = model_tbl_ld_xzsb.f_azrq;
                        model_tbl_ld_sbb.f_qfzt = model_tbl_ld_xzsb.f_qfzt;
                        model_tbl_ld_sbb.f_fj = model_tbl_ld_xzsb.f_sbfj;
                        model_tbl_ld_sbb.f_synx = model_tbl_ld_xzsb.f_synx;

                        string sbbhid = idal_tbl_ld_sbb.Add(model_tbl_ld_sbb, null);
                        #endregion

                        #region 客户

                        model_tbl_ld_khb.sys_id = 0;

                        model_tbl_ld_khb.sys_orderid = "";

                        model_tbl_ld_khb.sys_creatuserid = "";

                        model_tbl_ld_khb.sys_creatusername = "";

                        model_tbl_ld_khb.sys_creatdate = DateTime.Now;

                        model_tbl_ld_khb.sys_lastedituserid = "";

                        model_tbl_ld_khb.sys_lasteditusername = "";

                        model_tbl_ld_khb.sys_lasteditdate = DateTime.Now;

                        model_tbl_ld_khb.sys_deluserid = "";

                        model_tbl_ld_khb.sys_delusername = "";

                        model_tbl_ld_khb.sys_deldate = DateTime.Parse("1900-1-1");

                        model_tbl_ld_khb.sys_delflag = "0";

                        model_tbl_ld_khb.f_value1 = "";

                        model_tbl_ld_khb.f_value2 = "";

                        model_tbl_ld_khb.f_value3 = "";

                        model_tbl_ld_khb.f_value4 = "";

                        model_tbl_ld_khb.f_value5 = "";

                        model_tbl_ld_khb.f_value6 = "";

                        model_tbl_ld_khb.f_value7 = "";

                        model_tbl_ld_khb.f_value8 = "";

                        model_tbl_ld_khb.f_value9 = "";

                        model_tbl_ld_khb.f_value10 = "";

                        model_tbl_ld_khb.f_ztkhh = "";
                        model_tbl_ld_khb.f_khfz = _model_tbl_ld_khb.f_khfz;
                        model_tbl_ld_khb.f_khfzid = _model_tbl_ld_khb.f_khfzid;
                        model_tbl_ld_khb.f_ycje = _model_tbl_ld_khb.f_ycje;
                        model_tbl_ld_khb.f_yslx = _model_tbl_ld_khb.f_yslx;
                        model_tbl_ld_khb.f_yslxid = _model_tbl_ld_khb.f_yslxid;
                        model_tbl_ld_khb.f_tbbh = _model_tbl_ld_khb.f_tbbh;
                        model_tbl_ld_khb.f_sfjlbjf = _model_tbl_ld_khb.f_sfjlbjf;
                        model_tbl_ld_khb.f_zt = _model_tbl_ld_khb.f_zt;
                        model_tbl_ld_khb.f_ztid = _model_tbl_ld_khb.f_ztid;
                        model_tbl_ld_khb.f_bz = _model_tbl_ld_khb.f_bz;
                        model_tbl_ld_khb.f_cbbh = _model_tbl_ld_khb.f_cbbh;
                        model_tbl_ld_khb.f_cbbhid = _model_tbl_ld_khb.f_cbbhid;
                        model_tbl_ld_khb.f_cbxh = _model_tbl_ld_khb.f_cbxh + ".5";
                        model_tbl_ld_khb.f_cbyxm = _model_tbl_ld_khb.f_cbyxm;
                        model_tbl_ld_khb.f_cbyid = _model_tbl_ld_khb.f_cbyid;
                        model_tbl_ld_khb.f_cbzq = _model_tbl_ld_khb.f_cbzq;
                        model_tbl_ld_khb.f_cbmc = _model_tbl_ld_khb.f_cbmc;
                        model_tbl_ld_khb.f_yhbh = model_tbl_ld_yhb.f_yhbh;
                        model_tbl_ld_khb.f_yhbhid = yhbhid;
                        model_tbl_ld_khb.f_jfm = _model_tbl_ld_khb.f_jfm;
                        model_tbl_ld_khb.f_yhfz = _model_tbl_ld_khb.f_yhfz;
                        model_tbl_ld_khb.f_yhfzid = _model_tbl_ld_khb.f_yhfzid;
                        model_tbl_ld_khb.f_dz = _model_tbl_ld_khb.f_dz;
                        model_tbl_ld_khb.f_dh = _model_tbl_ld_khb.f_dh;
                        model_tbl_ld_khb.f_dy = _model_tbl_ld_khb.f_dy;
                        model_tbl_ld_khb.f_dyid = _model_tbl_ld_khb.f_dyid;
                        model_tbl_ld_khb.f_sc = _model_tbl_ld_khb.f_sc;
                        model_tbl_ld_khb.f_scid = _model_tbl_ld_khb.f_scid;
                        model_tbl_ld_khb.f_qy = _model_tbl_ld_khb.f_qy;
                        model_tbl_ld_khb.f_qyid = _model_tbl_ld_khb.f_qyid;
                        model_tbl_ld_khb.f_pq = _model_tbl_ld_khb.f_pq;
                        model_tbl_ld_khb.f_pqid = _model_tbl_ld_khb.f_pqid;
                        model_tbl_ld_khb.f_tsyxzh = _model_tbl_ld_khb.f_tsyxzh;
                        model_tbl_ld_khb.f_hth = _model_tbl_ld_khb.f_hth;
                        model_tbl_ld_khb.f_sfzh = _model_tbl_ld_khb.f_sfzh;
                        model_tbl_ld_khb.f_khrq = _model_tbl_ld_khb.f_khrq;
                        model_tbl_ld_khb.f_sbbh = model_tbl_ld_sbb.f_sbbh;
                        model_tbl_ld_khb.f_sbbhid = sbbhid;
                        model_tbl_ld_khb.f_bqzm = model_tbl_ld_sbb.f_bqzm;
                        model_tbl_ld_khb.f_sqzm = model_tbl_ld_sbb.f_sqzm;
                        model_tbl_ld_khb.f_bqsl = model_tbl_ld_sbb.f_bqsl;
                        model_tbl_ld_khb.f_sqsl = model_tbl_ld_sbb.f_sqsl;
                        model_tbl_ld_khb.f_qsqpjsl = model_tbl_ld_sbb.f_qsqpjsl;
                        model_tbl_ld_khb.f_qlqpjsl = model_tbl_ld_sbb.f_qlqpjsl;
                        model_tbl_ld_khb.f_ljgl = model_tbl_ld_sbb.f_ljgl;
                        model_tbl_ld_khb.f_lxth = "";
                        model_tbl_ld_khb.f_sblx = model_tbl_ld_sbb.f_sblx;
                        model_tbl_ld_khb.f_sblxid = model_tbl_ld_sbb.f_sblxid;
                        model_tbl_ld_khb.f_jllx = model_tbl_ld_sbb.f_jllx;
                        model_tbl_ld_khb.f_jllxid = model_tbl_ld_sbb.f_jllxid;
                        model_tbl_ld_khb.f_tssbbh = _model_tbl_ld_khb.f_tssbbh;
                        model_tbl_ld_khb.f_ztsbh = model_tbl_ld_sbb.f_ztsbh;
                        model_tbl_ld_khb.f_rs = model_tbl_ld_sbb.f_rs;
                        model_tbl_ld_khb.f_sbkj = model_tbl_ld_sbb.f_sbkj;
                        model_tbl_ld_khb.f_sbkjid = model_tbl_ld_sbb.f_sbkjid;
                        model_tbl_ld_khb.f_sbfz = model_tbl_ld_sbb.f_sbfz;
                        model_tbl_ld_khb.f_sbfzid = model_tbl_ld_sbb.f_sbfzid;
                        model_tbl_ld_khb.f_ztyhh = _model_tbl_ld_khb.f_ztyhh;
                        model_tbl_ld_khb.f_wxwybz = _model_tbl_ld_khb.f_wxwybz;
                        model_tbl_ld_khb.f_zfbwybz = _model_tbl_ld_khb.f_zfbwybz;
                        model_tbl_ld_khb.f_gdyhwybz = _model_tbl_ld_khb.f_gdyhwybz;
                        model_tbl_ld_khb.f_yhm = _model_tbl_ld_khb.f_yhm;
                        model_tbl_ld_khb.f_zhcbrq = _model_tbl_ld_khb.f_zhcbrq;
                        model_tbl_ld_khb.f_ljqf = _model_tbl_ld_khb.f_ljqf;
                        model_tbl_ld_khb.f_tjjzpwf = _model_tbl_ld_khb.f_tjjzpwf;
                        model_tbl_ld_khb.f_tjjzsf = _model_tbl_ld_khb.f_tjjzsf;
                        model_tbl_ld_khb.f_tssbbhid = _model_tbl_ld_khb.f_tssbbhid;
                        model_tbl_ld_khb.f_nljgl = model_tbl_ld_sbb.f_nljgl;
                        model_tbl_ld_khb.f_sqysl = _model_tbl_ld_khb.f_sqysl;
                        model_tbl_ld_khb.f_jhysl = _model_tbl_ld_khb.f_jhysl;
                        model_tbl_ld_khb.f_ickljgl = _model_tbl_ld_khb.f_ickljgl;
                        model_tbl_ld_khb.f_sbdz = _model_tbl_ld_khb.f_sbdz;
                        idal_tbl_ld_khb.Add(model_tbl_ld_khb, null);
                        #endregion

                        //更新本表的状态，操作时间，操作人
                        model_tbl_ld_xzsb.f_zt = "归档";
                        model_tbl_ld_xzsb.f_ztid = "2";
                        model_tbl_ld_xzsb.f_czr = username;
                        model_tbl_ld_xzsb.f_czrid = userid;
                        model_tbl_ld_xzsb.f_czsj = DateTime.Now;
                        idal_tbl_ld_xzsb.Update(model_tbl_ld_xzsb, "f_zt,f_ztid,f_czr,f_czrid,f_czsj", null);

                        //置空客户表的f_value状态
                        _model_tbl_ld_khb.f_value1 = "";
                        _model_tbl_ld_khb.f_value2 = "";
                        idal_tbl_ld_khb.Update(_model_tbl_ld_khb, "f_value1,f_value2", null);
                        #endregion

                        //调整数据状态

                        NameValueCollection nvc_maintableparameters = new NameValueCollection();
                        nvc_maintableparameters.Add("sys_processnextuser", "^nextuser");
                        nvc_maintableparameters.Add("fk_tbl_maintable_sys_id", "^null");
                        nvc_maintableparameters.Add("fk_workflow_sys_id", "^null");
                        result = _hic.NextStateItemNew(sys_idss[i].ToString(), nvc_maintableparameters, str_facterid, ds_facter, str_txt_bak_message, "", "", clientInf, _t);


                        if (result == "")
                        {
                            _t.getTrans().commit();
                        }
                        else
                        {
                            _t.getTrans().rollback();
                            all_result = "{\"result\":\"false\",\"message\":\"" + result + "\"}";
                        }
                    }

                }
                catch (Exception ex)
                {
                    all_result = "{\"result\":\"false\",\"message\":\"" + ex.Message + "\"}";
                }
            }
            if (all_result == "")
            {
                // all_result = "{\"result\":\"true\",\"message\":\"\"}";
            }
            return all_result;
        }
        #endregion

        #region 删除
        /// <summary>
        /// 删除时验证
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <returns></returns>
        public string get_del(string sys_ids)
        {
            string str_result = "";

            str_result = get_resultonlyonesysid(sys_ids);

            #region businesscode
            //businesscode
            //在此处添加针对projclassid = 3的业务代码 
            #endregion
            if (str_result != "")
            {
                return str_result;
            }



            return str_result;
        }

        /// <summary>
        /// 执行删除
        /// </summary>
        /// <param name="sys_ids"></param>
        /// <param name="str_name"></param>
        /// <returns></returns>
        public string set_del(string sys_ids, string str_name)
        {
            string[] sys_idss = System.Text.RegularExpressions.Regex.Split(sys_ids, ",");
            string str_result_all = "";
            for (int i = 0; i < sys_idss.Length; i++)
            {
                string result = "";
                try
                {
                    _model_tbl_maintable = _idal_itbl_maintable.GetList("sys_id='" + sys_idss[i] + "'", "", "*", "", "", null)[0];
                    _t = commonclass.CreateIAccessDataTrans();
                    _t.getTrans().begin();
                    #region businesscode
                    //businesscode
                    //在此处添加针对projclassid = 3的业务代码 
                    #endregion

                    if (result == "")
                    {
                        result = _hic.DelItem(sys_idss[i].ToString(), str_name, _t);
                    }
                    if (result == "")
                    {
                        _t.getTrans().commit();
                    }
                    else
                    {
                        _t.getTrans().rollback();
                        str_result_all += result;
                    }
                }
                catch (Exception ex)
                {
                    _t.getTrans().rollback();
                    result = ex.ToString();
                    str_result_all += result;
                }
            }
            return str_result_all;

        }
        #endregion

    }
}
