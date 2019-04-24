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
    public class assemblyfunction6
    {
        #region 变量属性
        private sara.dd.ldsw.idal.Itbl_maintable _idal_itbl_maintable = dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();
        private Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.CreateIAccessData();
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _t;
        private sara.dd.ldsw.commonclass.handleitemclass _hic = new sara.dd.ldsw.commonclass.handleitemclass();
        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        //销户和报停主表
        private sara.dd.ldsw.idal.Itbl_ld_xhhbt idal_tbl_ld_xhhbt = new sara.dd.ldsw.dal.tbl_ld_xhhbt();
        private sara.dd.ldsw.model.tbl_ld_xhhbt model_tbl_ld_xhhbt = new sara.dd.ldsw.model.tbl_ld_xhhbt();
        //销户和报停子表
        private sara.dd.ldsw.idal.Itbl_ld_xhhbtzb idal_tbl_ld_xhhbtzb = new sara.dd.ldsw.dal.tbl_ld_xhhbtzb();
        private sara.dd.ldsw.model.tbl_ld_xhhbtzb model_tbl_ld_xhhbtzb = new sara.dd.ldsw.model.tbl_ld_xhhbtzb();
        //抄本信息
        private sara.dd.ldsw.idal.Itbl_ld_cben idal_tbl_ld_cben = new sara.dd.ldsw.dal.tbl_ld_cben();
        private sara.dd.ldsw.model.tbl_ld_cben model_tbl_ld_cben = new sara.dd.ldsw.model.tbl_ld_cben();

        //客户表
        private sara.dd.ldsw.idal.Itbl_ld_khb idal_tbl_ld_khb = new sara.dd.ldsw.dal.tbl_ld_khb();
        private sara.dd.ldsw.model.tbl_ld_khb model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_khb();
        //水表表
        private sara.dd.ldsw.idal.Itbl_ld_sbb idal_tbl_ld_sbb = new sara.dd.ldsw.dal.tbl_ld_sbb();
        private sara.dd.ldsw.model.tbl_ld_sbb model_tbl_ld_sbb = new sara.dd.ldsw.model.tbl_ld_sbb();
        //用户表
        private sara.dd.ldsw.idal.Itbl_ld_yhb idal_tbl_ld_yhb = new sara.dd.ldsw.dal.tbl_ld_yhb();
        private sara.dd.ldsw.model.tbl_ld_yhb model_tbl_ld_yhb = new sara.dd.ldsw.model.tbl_ld_yhb();

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
                _iAccessData = sara.dd.ldsw.commonclass.commonclass.CreateIAccessData();
                string sql = "select count(*) from tbl_ld_xhhbtzb where fk_tbl_ld_xhhbt_sys_id = (select sys_id from tbl_ld_xhhbt  where fk_tbl_maintable_sys_id='" + sys_ids + "') and f_khbh is null";
                string count = "0";
                object o = _iAccessData.GetSingle(sql);
                if (o != null)
                {
                    count = o.ToString();
                }
                string total = "0";
                sql = "select count(*) from tbl_ld_xhhbtzb where fk_tbl_ld_xhhbt_sys_id = (select sys_id from tbl_ld_xhhbt  where fk_tbl_maintable_sys_id='" + sys_ids + "')";
                object res = _iAccessData.GetSingle(sql);
                if (res != null)
                {
                    total = res.ToString();
                }
                if (count != "0"|| total == "0")
                {
                    result = "请先选定客户在进行操作";
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
                        string sql = "";
                        _t = commonclass.CreateIAccessDataTrans();
                        _t.getTrans().begin();

                        #region businesscode
                        //businesscode
                        //在此处添加针对projclassid = 3的业务代码 
                        //更改水表表，用户表，客户表的状态，抄本信息（多个客户）
                        //置空客户表f_value1，f_value2的状态
                        //更新本表的状态
                        model_tbl_ld_xhhbt = idal_tbl_ld_xhhbt.GetList(" fk_tbl_maintable_sys_id='" + sys_idss[i].ToString() + "'", "", "*", "", "", null)[0];

                        model_tbl_ld_cben = idal_tbl_ld_cben.GetList("f_cbmc ='QH023'", "", "*", "", "", null)[0];

                        IList<sara.dd.ldsw.model.tbl_ld_xhhbtzb> model_tbl_ld_xhhbtzb = idal_tbl_ld_xhhbtzb.GetList(" fk_tbl_ld_xhhbt_sys_id='" + model_tbl_ld_xhhbt.sys_id + "'", "", "*", "", "", null);

                        foreach (sara.dd.ldsw.model.tbl_ld_xhhbtzb model in model_tbl_ld_xhhbtzb)
                        {

                            model_tbl_ld_khb = idal_tbl_ld_khb.GetList(" f_khbh='" + model.f_khbh + "'", "", "*", "", "", null)[0];
                            string khfz = model_tbl_ld_khb.f_khfz;
                            string khfzid = model_tbl_ld_khb.f_khfzid;
                            string[] khfzarr = khfz.Split(',');
                            string[] khfzidarr = khfzid.Split(',');
                            string newkhfz = "";
                            string newkhfzid = "";
                            if (khfz == "")
                            {
                                newkhfz = "龙达水务清户表";
                                newkhfzid = "4059";
                            }else
                            {
                                for (int a=0;a< khfzarr.Length;a++)
                                {
                                    if(khfzarr[a]== "龙达水务新立户表"|| khfzarr[a] == "客服中心总表"|| khfzarr[a] == "客服中心大用户表" || khfzarr[a] == "经营中心考核表" || khfzarr[a] == "经营中心排子表" || khfzarr[a] == "经营中心远传表" || khfzarr[a] == "经营中心居民表")
                                    {
                                    }else
                                    {
                                        newkhfz += khfzarr[a]+',';
                                        newkhfzid += khfzidarr[a] + ',';
                                    }
                                }
                                newkhfz = newkhfz.TrimEnd(',') + ","+"龙达水务清户表";
                                newkhfzid = newkhfzid.TrimEnd(',') + "," + "4059";
                            }
                            sql = " update tbl_ld_khb set f_zt = '销户' , f_ztid ='1',f_value1='',f_value2='',";
                            sql += "f_cbbh='" + model_tbl_ld_cben.f_cbbh + "',f_cbbhid='" + model_tbl_ld_cben.sys_id + "',";
                            sql += "f_cbyxm='" + model_tbl_ld_cben.f_cbymc + "',f_cbyid='" + model_tbl_ld_cben.f_cbyid + "',";
                            sql += "f_khfz='" + newkhfz + "',f_khfzid='" + newkhfzid + "',";
                            sql += "f_cbzq='" + model_tbl_ld_cben.f_cbzq + "',f_cbmc='" + model_tbl_ld_cben.f_cbmc + "' where sys_id ='" + model.f_khbhid + "'";
                            _t.ExecuteSql(sql);

                            //在客户表中加日志
                            List<IDictionary<string, string>> array = new List<IDictionary<string, string>>();

                            if (model_tbl_ld_khb.f_zt != "销户")
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_zt");
                                temp.Add("oldvalue", model_tbl_ld_khb.f_zt);
                                temp.Add("newvalue", "销户");
                                temp.Add("name", "状态");
                                array.Add(temp);
                            }
                            if (model_tbl_ld_khb.f_khfz != newkhfz)
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_khfz");
                                temp.Add("oldvalue", model_tbl_ld_khb.f_khfz);
                                temp.Add("newvalue", newkhfz);
                                temp.Add("name", "客户分组");
                                array.Add(temp);
                            }

                            if (model_tbl_ld_cben.f_cbbh != model_tbl_ld_khb.f_cbbh)
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_cbbh");
                                temp.Add("oldvalue", model_tbl_ld_khb.f_cbbh);
                                temp.Add("newvalue", model_tbl_ld_cben.f_cbbh);
                                temp.Add("name", "抄本编号");
                                array.Add(temp);
                            }

                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_khb", model_tbl_ld_khb.sys_id.ToString(), "tbl_ld_xhhbt_detail", "用户销户", array, clientInf, _t);

                            model_tbl_ld_sbb = idal_tbl_ld_sbb.GetList(" f_khbh='" + model.f_khbh + "'", "", "*", "", "", null)[0];
                            string sbfz = model_tbl_ld_sbb.f_sbfz;
                            string sbfzid = model_tbl_ld_khb.f_sbfzid;
                            string[] sbfzarr = sbfz.Split(',');
                            string[] sbfzidarr = sbfzid.Split(',');
                            string newsbfz = "";
                            string newsbfzid = "";
                            if (sbfz == "")
                            {
                                newsbfz = "龙达水务清户表";
                                newsbfzid = "4100";
                            }
                            else
                            {
                                for (int a = 0; a < sbfzarr.Length; a++)
                                {
                                    if (sbfzarr[a] == "龙达水务新立户表" || sbfzarr[a] == "客服中心总表" || sbfzarr[a] == "客服中心大用户表" || sbfzarr[a] == "经营中心考核表" || sbfzarr[a] == "经营中心排子表" || sbfzarr[a] == "经营中心远传表" || sbfzarr[a] == "经营中心居民表")
                                    {
                                    }
                                    else
                                    {
                                        newsbfz += sbfzarr[a] + ',';
                                        newsbfzid += sbfzidarr[a] + ',';
                                    }
                                }
                                newsbfz = newsbfz.TrimEnd(',') + "," + "龙达水务清户表";
                                newsbfzid = newsbfzid.TrimEnd(',') + "," + "4100";
                            }
                            sql = " update tbl_ld_sbb set f_zt = '销户' , f_ztid ='1',f_sbfz='"+ newsbfz + "',f_sbfzid='"+ newsbfzid + "' where f_khbh ='" + model.f_khbh + "'";
                            _t.ExecuteSql(sql);

                            //在水表表中加日志
                            List<IDictionary<string, string>> array1 = new List<IDictionary<string, string>>();

                            if (model_tbl_ld_sbb.f_zt != "销户")
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_zt");
                                temp.Add("oldvalue", model_tbl_ld_sbb.f_zt);
                                temp.Add("newvalue", "销户");
                                temp.Add("name", "状态");
                                array1.Add(temp);
                            }
                            if (model_tbl_ld_sbb.f_sbfz != newsbfz)
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_khfz");
                                temp.Add("oldvalue", model_tbl_ld_sbb.f_sbfz);
                                temp.Add("newvalue", newsbfz);
                                temp.Add("name", "水表分组");
                                array1.Add(temp);
                            }
                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_sbb", model_tbl_ld_sbb.sys_id.ToString(), "tbl_ld_xhhbt_detail", "用户销户", array1, clientInf, _t);

                            model_tbl_ld_yhb = idal_tbl_ld_yhb.GetList(" f_khbh='" + model.f_khbh + "'", "", "*", "", "", null)[0];
                            string yhfz = model_tbl_ld_yhb.f_yhfz;
                            string yhfzid = model_tbl_ld_khb.f_yhfzid;
                            string[] yhfzarr = yhfz.Split(',');
                            string[] yhfzidarr = yhfzid.Split(',');
                            string newyhfz = "";
                            string newyhfzid = "";
                            if (yhfz == "")
                            {
                                newyhfz = "龙达水务清户表";
                                newyhfzid = "4138";
                            }
                            else
                            {
                                for (int a = 0; a < sbfzarr.Length; a++)
                                {
                                    if (yhfzarr[a] == "龙达水务新立户表" || yhfzarr[a] == "客服中心总表" || yhfzarr[a] == "客服中心大用户表" || yhfzarr[a] == "经营中心考核表" || yhfzarr[a] == "经营中心排子表" || yhfzarr[a] == "经营中心远传表" || yhfzarr[a] == "经营中心居民表")
                                    {
                                    }
                                    else
                                    {
                                        newyhfz += yhfzarr[a] + ',';
                                        newyhfzid += yhfzidarr[a] + ',';
                                    }
                                }
                                newyhfz = newyhfz.TrimEnd(',') + "," + "龙达水务清户表";
                                newyhfzid = newyhfzid.TrimEnd(',') + "," + "4138";
                            }
                            sql = " update tbl_ld_yhb set f_zt = '销户' , f_ztid ='3',f_yhfz='"+ newyhfz + "',f_yhfzid='"+ newyhfzid + "' where f_khbh ='" + model.f_khbh + "'";
                            _t.ExecuteSql(sql);

                            //在用户表中加日志
                            List<IDictionary<string, string>> array2 = new List<IDictionary<string, string>>();

                            if (model_tbl_ld_yhb.f_zt != "销户")
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_zt");
                                temp.Add("oldvalue", model_tbl_ld_yhb.f_zt);
                                temp.Add("newvalue", "销户");
                                temp.Add("name", "状态");
                                array2.Add(temp);
                            }
                            if (model_tbl_ld_yhb.f_yhfz != newsbfz)
                            {
                                IDictionary<string, string> temp = new Dictionary<string, string>();
                                temp.Add("key", "f_khfz");
                                temp.Add("oldvalue", model_tbl_ld_yhb.f_yhfz);
                                temp.Add("newvalue", newyhfz);
                                temp.Add("name", "用户分组");
                                array2.Add(temp);
                            }
                            sara.dd.ldsw.commonclass.commonclass.addUpdateLog("tbl_ld_yhb", model_tbl_ld_yhb.sys_id.ToString(), "tbl_ld_xhhbt_detail", "用户销户", array2, clientInf, _t);

                            sql = " update tbl_ld_xhhbt set f_zt = '归档' , f_ztid ='2',f_czr='"+username+"',f_czrid='"+ userid + "',f_czsj=to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')  where  sys_id ='" + model_tbl_ld_xhhbt.sys_id + "'";
                            _t.ExecuteSql(sql);


                        }

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
            //删除时判断子表是否存在数据
            if (str_result != "")
            {
                return str_result;
            }
            string sql = "select count(*) from tbl_ld_xhhbtzb where fk_tbl_ld_xhhbt_sys_id=(select sys_id from tbl_ld_xhhbt where fk_tbl_maintable_sys_id ='" + sys_ids + "')";
            string count = "0";
            object o = _iAccessData.GetSingle(sql);
            if (o != null)
            {
                count = o.ToString();
            }
            if (count != "0")
            {
                str_result = "请先删除子表中的数据。";
            }
            else
            {
                str_result = "";
            }
            #endregion
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
