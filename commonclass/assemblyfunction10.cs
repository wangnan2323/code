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
    public class assemblyfunction10
    {
        #region 变量属性
        private sara.dd.ldsw.idal.Itbl_maintable _idal_itbl_maintable = dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.CreateIAccessData();
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _t;
        private sara.dd.ldsw.commonclass.handleitemclass _hic = new sara.dd.ldsw.commonclass.handleitemclass();
        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        //更换水表表
        private sara.dd.ldsw.idal.Itbl_ld_ghsb idal_tbl_ld_ghsb = new sara.dd.ldsw.dal.tbl_ld_ghsb();
        private sara.dd.ldsw.model.tbl_ld_ghsb model_tbl_ld_ghsb = new sara.dd.ldsw.model.tbl_ld_ghsb();

        //客户表
        private sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_khb();
        //水表表
        private sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private sara.dd.ldsw.model.tbl_ld_sbb _model_tbl_ld_sbb = new sara.dd.ldsw.model.tbl_ld_sbb();

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
                //在此处添加针对projclassid = 3的业务代码
                string sql = "select f_value1 from tbl_ld_ghsb where fk_tbl_maintable_sys_id='" + sys_ids + "'";
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
                //    //新增水表_居民//业务代码，转给经办人时，默认转给发起的经办人
                //    if (useroperation.Tables[0].Rows[i]["fk_dy_jd_sys_id_to"].ToString() == "540008020")
                //    {
                //        string lcslid = useroperation.Tables[0].Rows[i]["fk_sl_lc_sys_id"].ToString();
                //        string sql = "select czrid,czrname from t_workitem where fk_sl_lc_sys_id = '" + lcslid + "' and fk_dy_jd_sys_id = '540008000'";
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
                        //更新旧水表的状态为停用
                        //更新客户表冗余水表信息的字段，判断停用水表编号是否有值，有用“^”分割保存。把f_value1，f_value2置为空
                        //更新更换水表表的状态为归档
                        model_tbl_ld_ghsb = idal_tbl_ld_ghsb.GetList(" fk_tbl_maintable_sys_id = '" + sys_idss[i].ToString() + "' ", "", "*", "", "", null)[0];
                        model_tbl_ld_khb = idal_tbl_ld_khb.GetList(" sys_id = '" + model_tbl_ld_ghsb.f_khbhid + "' ", "", "*", "", "", null)[0];
                        _model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList(" sys_id = '" + model_tbl_ld_khb.f_sbbhid + "' ", "", "*", "", "", null)[0];
                        #region 在水表表中新增一条数据

                        sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = new sara.dd.ldsw.model.tbl_ld_sbb();
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
                        model_tbl_ld_sbb.f_sbbh = sara.dd.ldsw.commonclass.commonclass.getBusinessNum("sb", model_tbl_ld_ghsb.f_newsblxid, null);
                        model_tbl_ld_sbb.f_ztsbh = "";
                        model_tbl_ld_sbb.f_lxth = "";
                        model_tbl_ld_sbb.f_sbfz = model_tbl_ld_ghsb.f_newsbfz;
                        model_tbl_ld_sbb.f_sbfzid = model_tbl_ld_ghsb.f_newsbfzid;
                        model_tbl_ld_sbb.f_sbpp = model_tbl_ld_ghsb.f_newsbpp;
                        model_tbl_ld_sbb.f_mph = model_tbl_ld_ghsb.f_newmph;
                        model_tbl_ld_sbb.f_sbdz = model_tbl_ld_ghsb.f_newsbdz;
                        model_tbl_ld_sbb.f_khbh = model_tbl_ld_ghsb.f_khbh;
                        model_tbl_ld_sbb.f_rs = model_tbl_ld_ghsb.f_newrs;
                        model_tbl_ld_sbb.f_sbkj = model_tbl_ld_ghsb.f_newsbkj;
                        model_tbl_ld_sbb.f_sbkjid = model_tbl_ld_ghsb.f_newsbkjid;
                        model_tbl_ld_sbb.f_sblx = model_tbl_ld_ghsb.f_newsblx;
                        model_tbl_ld_sbb.f_sblxid = model_tbl_ld_ghsb.f_newsblxid;
                        model_tbl_ld_sbb.f_jllx = model_tbl_ld_ghsb.f_newjllx;
                        model_tbl_ld_sbb.f_jllxid = model_tbl_ld_ghsb.f_newjllxid;
                        model_tbl_ld_sbb.f_cszm = model_tbl_ld_ghsb.f_newcszm;
                        model_tbl_ld_sbb.f_bqzm = model_tbl_ld_ghsb.f_newbqzm;
                        model_tbl_ld_sbb.f_sqzm = model_tbl_ld_ghsb.f_newsqzm;
                        model_tbl_ld_sbb.f_sqsl = model_tbl_ld_ghsb.f_newsqsl;
                        model_tbl_ld_sbb.f_ljgl = model_tbl_ld_ghsb.f_newljgl;
                        model_tbl_ld_sbb.f_qsqpjsl = model_tbl_ld_ghsb.f_newqsqpjsl;
                        model_tbl_ld_sbb.f_qlqpjsl = model_tbl_ld_ghsb.f_newqlqpjsl;
                        model_tbl_ld_sbb.f_zt = model_tbl_ld_ghsb.f_newzt;
                        model_tbl_ld_sbb.f_ztid = model_tbl_ld_ghsb.f_newztid;
                        model_tbl_ld_sbb.f_bz = model_tbl_ld_ghsb.f_bz;
                        model_tbl_ld_sbb.f_bqsl = model_tbl_ld_ghsb.f_newdysl;
                        model_tbl_ld_sbb.f_nljgl = model_tbl_ld_ghsb.f_newnysl;
                        model_tbl_ld_sbb.f_azrq = model_tbl_ld_ghsb.f_newazrq;
                        model_tbl_ld_sbb.f_qfzt = model_tbl_ld_ghsb.f_newqfzt;
                        model_tbl_ld_sbb.f_fj = model_tbl_ld_ghsb.f_xsbfj;
                        model_tbl_ld_sbb.f_synx = model_tbl_ld_ghsb.f_newsynx;
                        string sbbhid = idal_tbl_ld_sbb.Add(model_tbl_ld_sbb, null);
                        #endregion

                        #region 更新客户表冗余水表信息的字段，判断停用水表编号是否有值，有用“^”分割保存。把f_value1，f_value2置为空
                        model_tbl_ld_khb.f_sbbh = model_tbl_ld_sbb.f_sbbh;
                        model_tbl_ld_khb.f_sbbhid = sbbhid;
                        model_tbl_ld_khb.f_bqzm = model_tbl_ld_sbb.f_bqzm;
                        model_tbl_ld_khb.f_sqzm = model_tbl_ld_sbb.f_sqzm;
                        model_tbl_ld_khb.f_bqsl = model_tbl_ld_sbb.f_bqsl;
                        model_tbl_ld_khb.f_sqsl = model_tbl_ld_sbb.f_sqsl;
                        model_tbl_ld_khb.f_qsqpjsl = model_tbl_ld_sbb.f_qsqpjsl;
                        model_tbl_ld_khb.f_qlqpjsl = model_tbl_ld_sbb.f_qlqpjsl;
                        //model_tbl_ld_khb.f_ljgl = model_tbl_ld_sbb.f_ljgl;
                        model_tbl_ld_khb.f_lxth = model_tbl_ld_sbb.f_lxth;
                        model_tbl_ld_khb.f_sblx = model_tbl_ld_sbb.f_sblx;
                        model_tbl_ld_khb.f_sblxid = model_tbl_ld_sbb.f_sblxid;
                        model_tbl_ld_khb.f_jllx = model_tbl_ld_sbb.f_jllx;
                        model_tbl_ld_khb.f_jllxid = model_tbl_ld_sbb.f_jllxid;
                        if(model_tbl_ld_khb.f_tssbbh != "")
                        {
                            model_tbl_ld_khb.f_tssbbh = model_tbl_ld_khb.f_tssbbh + "^" + _model_tbl_ld_sbb.f_sbbh;
                            model_tbl_ld_khb.f_tssbbhid = model_tbl_ld_khb.f_tssbbhid + "^" + _model_tbl_ld_sbb.sys_id;
                        }
                        else
                        {
                            model_tbl_ld_khb.f_tssbbh = _model_tbl_ld_sbb.f_sbbh;
                            model_tbl_ld_khb.f_tssbbhid = _model_tbl_ld_sbb.sys_id.ToString();
                        }                        
                        model_tbl_ld_khb.f_ztsbh = model_tbl_ld_sbb.f_ztsbh;
                        model_tbl_ld_khb.f_rs = model_tbl_ld_sbb.f_rs;
                        model_tbl_ld_khb.f_sbkj = model_tbl_ld_sbb.f_sbkj;
                        model_tbl_ld_khb.f_sbkjid = model_tbl_ld_sbb.f_sbkjid;
                        model_tbl_ld_khb.f_sbfz = model_tbl_ld_sbb.f_sbfz;
                        model_tbl_ld_khb.f_sbfzid = model_tbl_ld_sbb.f_sbfzid;
                        //model_tbl_ld_khb.f_nljgl = model_tbl_ld_sbb.f_nljgl;

                        model_tbl_ld_khb.f_value1 = "";
                        model_tbl_ld_khb.f_value2 = "";

                        idal_tbl_ld_khb.Update(model_tbl_ld_khb, "f_sbbh,f_sbbhid,f_bqzm,f_sqzm,f_bqsl,f_sqsl,f_qsqpjsl,f_qlqpjsl,f_ljgl,f_lxth,f_sblx,f_sblxid,f_jllx,f_jllxid,f_tssbbh,f_tssbbhid,f_ztsbh,f_rs ,f_sbkj,f_sbkjid,f_sbfz,f_sbfzid,f_nljg,f_value1,f_value2", null);


                        #endregion

                        #region 更新旧水表的状态为停用
                        _model_tbl_ld_sbb.f_zt = "停用";
                        _model_tbl_ld_sbb.f_ztid = "9";
                        idal_tbl_ld_sbb.Update(_model_tbl_ld_sbb, "f_zt,f_ztid", null);
                        #endregion

                        #region 更新更换水表表的状态为归档,操作人，操作时间
                        model_tbl_ld_ghsb.f_zt = "归档";
                        model_tbl_ld_ghsb.f_ztid = "2";
                        model_tbl_ld_ghsb.f_czr = username;
                        model_tbl_ld_ghsb.f_czrid = userid;
                        model_tbl_ld_ghsb.f_czsj = DateTime.Now;
                        model_tbl_ld_ghsb.f_newsbbh = model_tbl_ld_sbb.f_sbbh;
                        idal_tbl_ld_ghsb.Update(model_tbl_ld_ghsb, "f_zt,f_ztid,f_czr,f_czrid,f_czsj,f_newsbbh", null);

                        #endregion


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
