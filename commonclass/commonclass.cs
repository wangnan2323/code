using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml;

namespace sara.dd.ldsw.commonclass
{
    public class commonclass
    {
        #region 属性变量

        private Eva.Library.ServiceAdapter.IAdapter.IAuth _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private Eva.Library.ServiceAdapter.IAdapter.ICode _ic = Eva.Library.ServiceAdapter.AdapterFactory.CodeFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.CreateIAccessData();

        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();
        private sara.dd.ldsw.idal.Itbl_maintable _idal_tbl_maintable = dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();

        private sara.dd.ldsw.model.t_projstate_log _model_t_projstate_log = new sara.dd.ldsw.model.t_projstate_log();
        private sara.dd.ldsw.idal.It_projstate_log _idal_t_projstate_log = dalfactory.Create<sara.dd.ldsw.idal.It_projstate_log>();// new sara.dd.ldsw.dal.t_projstate_log();

        private sara.dd.ldsw.model.userinfo _userInfoModel;
        #endregion
        #region 公有方法

        #region 绑定行政区域下拉列表用
        /// <summary>
        /// 绑定行政区域下拉列表用
        /// </summary>
        /// <returns></returns>
        public DataSet GetMainTableXZQY(string sysUserIdString, string userInfoJsonString)
        {
            //根据当前用户所在行政区域，计算他能看到几个行政区域ID

            DataSet ds_xzqy;

            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                ds_xzqy = sara.platform.service.code.Service.GetContentCollectionByMenuNodeID(Eva.Library.Configuration.ConfigurationManager.AppSettings["tbl_maintable_xzqy"].ToString());
            }
            else
            {
                ds_xzqy = _ic.GetContentCollectionByMenuNodeID(Eva.Library.Configuration.ConfigurationManager.AppSettings["tbl_maintable_xzqy"].ToString());
            }

            //string str_role_all = Eva.Library.Configuration.ConfigurationManager.AppSettings["xzqy_role_all"].ToString();
            //string str_role_part = Eva.Library.Configuration.ConfigurationManager.AppSettings["xzqy_role_part"].ToString();

            //获取当前用户信息
            _userInfoModel = sara.dd.ldsw.commonclass.webserviceadapter.GetUserInfoModel(sysUserIdString, userInfoJsonString);

            //用户角色具备的行政区域ID
            Eva.Library.Collection.NoRepeatingStringCollection xzqyIdsList = sara.dd.ldsw.commonclass.webserviceadapter.GetUserRoleRemarkPartAll(_userInfoModel, Eva.Library.Configuration.ConfigurationManager.AppSettings["xzqy_role_all"].ToString(), Eva.Library.Configuration.ConfigurationManager.AppSettings["xzqy_role_part"]);

            //用户所在机构具备的行政区域ID
            xzqyIdsList.Add(_userInfoModel.sys_toporgan);



            DataSet ds_result = ds_xzqy.Clone();

            for (int i = 0; i < ds_xzqy.Tables[0].Rows.Count; i++)
            {
                if (xzqyIdsList.Contains(ds_xzqy.Tables[0].Rows[i]["NodeValue"].ToString()))
                {
                    DataRow dr = ds_result.Tables[0].NewRow();

                    dr["NodeName"] = ds_xzqy.Tables[0].Rows[i]["NodeName"].ToString();
                    dr["NodeValue"] = ds_xzqy.Tables[0].Rows[i]["NodeValue"].ToString();

                    ds_result.Tables[0].Rows.Add(dr);
                }
            }

            return ds_result;
        }

        public string GetXzqyByID(string xzqyid)
        {
            DataSet ds;

            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                ds = sara.platform.service.code.Service.GetContentCollectionByMenuNodeID(Eva.Library.Configuration.ConfigurationManager.AppSettings["tbl_maintable_xzqy"].ToString());
            }
            else
            {
                ds = _ic.GetContentCollectionByMenuNodeID(Eva.Library.Configuration.ConfigurationManager.AppSettings["tbl_maintable_xzqy"].ToString());
            }
            return ds.Tables[0].Select(" NodeValue = '" + xzqyid + "'")[0]["NodeName"].ToString();
        }
        #endregion

        #region 栅格相关

        /// <summary>
        /// [新]根据条件ID计算下一个状态
        /// </summary>
        /// <param name="nvc_parameters">参数</param>
        /// <param name="facterid">facterid</param>
        /// <param name="ds_facter">条件的数据源</param>
        /// <param name="t">trans</param>
        /// <returns></returns>
        public string GetNewProjStateByFacterid(NameValueCollection nvc_parameters, string facterid, DataSet ds_facter)
        {
            string newprojstate = "";

            string facter_value = "";
            string facter_value_functionname = "";
            string facter_value_functionparameters = "";
            string facter_value_functionresult1 = "";
            string facter_value_functionresult2 = "";
            string str_sql = "";

            DataRow[] drs_facter = ds_facter.Tables[0].Select(" num = '" + facterid + "'");
            if (drs_facter.Length == 1)
            {
                facter_value = drs_facter[0]["value"].ToString();
                facter_value_functionname = facter_value.Split('?')[0].ToString().Split('(')[0].ToString();
                facter_value_functionparameters = facter_value.Split('?')[0].ToString().Split('(')[1].ToString().Split(')')[0].ToString();
                //根据配置替换，形成可用的参数

                if (facter_value_functionparameters != "")
                {
                    facter_value_functionparameters = "'" + facter_value_functionparameters.Replace("^", "','") + "'";
                    if (nvc_parameters != null)
                    {

                        string[] str_keys = nvc_parameters.AllKeys;
                        for (int i = 0; i < str_keys.Length; i++)
                        {
                            facter_value_functionparameters = facter_value_functionparameters.Replace("[" + str_keys[i].ToString() + "]", nvc_parameters[str_keys[i].ToString()].ToString());
                        }
                    }
                }

                facter_value_functionresult1 = facter_value.Split('?')[1].ToString().Split(':')[0].ToString();
                facter_value_functionresult2 = facter_value.Split('?')[1].ToString().Split(':')[1].ToString();


                str_sql = "select " + facter_value_functionname + "(" + facter_value_functionparameters + ") from dual";
                object o = _iAccessData.GetSingle(str_sql);

                if (o != null)
                {
                    if (o.ToString() == "true")
                    {
                        newprojstate = facter_value_functionresult1;
                    }
                    else
                    {
                        newprojstate = facter_value_functionresult2;
                    }
                }
                else
                {
                    throw new Exception("facter集合中定义的function执行异常!");
                }
            }
            else
            {
                throw new Exception("behavename指定的facterid在ds_facter集合中没有对应的项!");
            }

            return newprojstate;
        }

        /// <summary>
        /// 根据条件获取当前类型状态的名称
        /// </summary>
        /// <param name="projectclassid"></param>
        /// <param name="projectstate"></param>
        /// <param name="_t"></param>
        /// <returns></returns>
        public string GetProjStateName(string projectclassid, string projectstate, Eva.Library.Data.AccessDataTrans.IAccessDataTrans _t)
        {
            object r = _t.GetSingle("select value1 from t_projclass_dtl1 where projclassid='" + projectclassid + "' and projstate='" + projectstate + "' ");
            if (r != null)
            {
                return r.ToString();
            }
            else
            {
                return "";
            }
        }

        /// <summary>
        /// xml to dataset
        /// </summary>
        /// <param name="xmlstream"></param>
        /// <returns></returns>
        public DataSet StringToDataSet(string xmlstream)
        {
            if (xmlstream == null || xmlstream.Trim().Length == 0)
            {
                return null;
            }
            StringReader reader = new StringReader(xmlstream);
            XmlTextReader xmlreader = new XmlTextReader(reader);
            try
            {
                DataSet ds = new DataSet();
                ds.ReadXml(xmlreader);
                return ds;
            }
            finally
            {
                reader.Close();
                xmlreader.Close();
            }
        }

        /// <summary>
        /// [新]获取当前状态的全部子状态可能
        /// </summary>
        /// <param name="Statedel1"></param>
        /// <returns>exp:1_1;return:1,1_1,1_2,1_3,1+1,1+2,1+3</returns>
        public string GetProjStateAll(string projstate)
        {
            //sk-2015-01-28-下面这一行代码原本是有的，但是编译不了
            //projstate = GetProjStateReal(projstate);
            string ssa = "";
            string[] sa = Regex.Split(projstate, ",");
            for (int i = 0; i < sa.Length; i++)
            {
                ssa += sa[i].ToString() + ",";
                ssa += sa[i].ToString() + "_1,";
                ssa += sa[i].ToString() + "_2,";
                ssa += sa[i].ToString() + "_3,";
                ssa += sa[i].ToString() + "+1,";
                ssa += sa[i].ToString() + "+2,";
                ssa += sa[i].ToString() + "+3,";
            }
            if (ssa.Length > 1)
            {
                ssa = ssa.Substring(0, ssa.Length - 1);
            }
            return ssa;
        }

        /// <summary>
        /// [新]获取当前状态的真实状态
        /// </summary>
        /// <param name="projstate"></param>
        /// <returns>exp:1_1;return:1</returns>
        public string GetProjStateReal(string projstate)
        {
            return projstate.Split('_')[0].ToString().Split('+')[0].ToString();
        }


        /// <summary>
        /// 获取Behave数据
        /// </summary>
        /// <param name="projectClassIdString"></param>
        /// <param name="projectClassDtl1String"></param>
        /// <returns></returns>
        public DataSet GetBehave(string projectClassIdString, string projectClassDtl1String)
        {
            string str_xmlx_sql_1 = "select BEHAVE from t_projclass_dtl1 where projstate ='" + projectClassDtl1String + "' and projclassid = '" + projectClassIdString + "'";
            string str_xmlx_1 = _iAccessData.GetSingle(str_xmlx_sql_1).ToString();
            DataSet ds = StringToDataSet(str_xmlx_1);
            return ds;
        }

        /// <summary>
        /// 获取faceter数据
        /// </summary>
        /// <param name="projectClassIdString"></param>
        /// <param name="projectClassDtl1String"></param>
        /// <returns></returns>
        public DataSet GetFacter(string projectClassIdString, string projectClassDtl1String)
        {
            string str_xmlx_sql_1 = "select facter from t_projclass_dtl1 where projstate ='" + projectClassDtl1String + "' and projclassid = '" + projectClassIdString + "'";
            string str_xmlx_1 = _iAccessData.GetSingle(str_xmlx_sql_1).ToString();
            DataSet ds = StringToDataSet(str_xmlx_1);
            return ds;
        }

        /// <summary>
        /// 获取Tablenameen数据
        /// </summary>
        /// <param name="projectClassIdString"></param>
        /// <param name="projectClassDtl1String"></param>
        /// <returns></returns>
        public DataSet GetTablenameen(string projectClassIdString, string projectClassDtl1String)
        {
            string str_xmlx_sql_1 = "select tablenameen from t_projclass_dtl1 where projstate ='" + projectClassDtl1String + "' and projclassid = '" + projectClassIdString + "'";
            string str_xmlx_1 = _iAccessData.GetSingle(str_xmlx_sql_1).ToString();
            DataSet ds = StringToDataSet(str_xmlx_1);
            return ds;
        }

        /// <summary>
        /// 获取Visibility数据
        /// </summary>
        /// <param name="projectClassIdString"></param>
        /// <param name="projectClassDtl1String"></param>
        /// <returns></returns>
        public DataSet GetVisibility(string projectClassIdString, string projectClassDtl1String)
        {
            string str_xmlx_sql_1 = "select VISIBILITY from t_projclass_dtl1 where projstate ='" + projectClassDtl1String + "' and projclassid = '" + projectClassIdString + "'";
            string str_xmlx_1 = _iAccessData.GetSingle(str_xmlx_sql_1).ToString();
            DataSet ds = StringToDataSet(str_xmlx_1);
            return ds;
        }

        /// <summary>
        /// [新]根据条件ID计算下一个状态
        /// </summary>
        /// <param name="nvc_parameters">参数</param>
        /// <param name="facterid">facterid</param>
        /// <param name="ds_facter">条件的数据源</param>
        /// <param name="t">trans</param>
        /// <returns></returns>
        public string GetNewProjStateByFacterid(NameValueCollection nvc_parameters, string facterid, DataSet ds_facter, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string newprojstate = "";
            string facter_value = "";
            string facter_value_functionname = "";
            string facter_value_functionparameters = "";
            string facter_value_functionresult1 = "";
            string facter_value_functionresult2 = "";
            string str_sql = "";
            DataRow[] drs_facter = ds_facter.Tables[0].Select(" num = '" + facterid + "'");
            if (drs_facter.Length == 1)
            {
                facter_value = drs_facter[0]["value"].ToString();
                facter_value_functionname = facter_value.Split('?')[0].ToString().Split('(')[0].ToString();
                facter_value_functionparameters = facter_value.Split('?')[0].ToString().Split('(')[1].ToString().Split(')')[0].ToString();
                //根据配置替换，形成可用的参数
                if (facter_value_functionparameters != "")
                {
                    facter_value_functionparameters = "'" + facter_value_functionparameters.Replace("^", "','") + "'";
                    if (nvc_parameters != null)
                    {
                        string[] str_keys = nvc_parameters.AllKeys;
                        for (int i = 0; i < str_keys.Length; i++)
                        {
                            facter_value_functionparameters = facter_value_functionparameters.Replace("[" + str_keys[i].ToString() + "]", nvc_parameters[str_keys[i].ToString()].ToString());
                        }
                    }
                }
                facter_value_functionresult1 = facter_value.Split('?')[1].ToString().Split(':')[0].ToString();
                facter_value_functionresult2 = facter_value.Split('?')[1].ToString().Split(':')[1].ToString();
                str_sql = "select " + facter_value_functionname + "(" + facter_value_functionparameters + ") from dual";
                object o = _iAccessData.GetSingle(str_sql);
                if (o != null)
                {
                    if (o.ToString() == "true")
                    {
                        newprojstate = facter_value_functionresult1;
                    }
                    else
                    {
                        newprojstate = facter_value_functionresult2;
                    }
                }
                else
                {
                    throw new Exception("facter集合中定义的function执行异常!");
                }
            }
            else
            {
                throw new Exception("behavename指定的facterid在ds_facter集合中没有对应的项!");
            }
            return newprojstate;
        }

        /// <summary>
        /// [新]获取[归档]状态下有关的表名称
        /// </summary>
        /// <param name="projclassid"></param>
        /// <param name="projxmlx"></param>
        /// <param name="t"></param>
        /// <returns></returns>
        public List<string> GetTableNameEnList(string projclassid, string projclassdtl2, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            List<string> tablenameList = new List<string>();
            //获取项目类型中的tablename配置
            string str_xmlx_sql_2 = "select tablenameen from t_projclass_dtl2 where projclassid = '" + projclassid + "' and projstate = '" + projclassdtl2 + "'";
            string str_xmlx_tablename_2 = t.GetSingle(str_xmlx_sql_2).ToString();
            //获取projdtl1中tableanem的配置
            string str_xmlx_sql_1 = "select tablenameen from t_projclass_dtl1 where  PROJCLASSID='" + projclassid + "' and Value4='2' ORDER BY TO_NUMBER(SYS_ORDERID) ";
            string str_xmlx_tablename_1 = t.GetSingle(str_xmlx_sql_1).ToString();
            string str_projclass_tablename = "";
            if (str_xmlx_tablename_1 != "")
            {
                DataSet ds_tablenameen = this.StringToDataSet((str_xmlx_tablename_1));
                for (int i = 0; i < ds_tablenameen.Tables[0].Rows.Count; i++)
                {
                    str_projclass_tablename += ds_tablenameen.Tables[0].Rows[i]["value"].ToString() + ",";
                }
            }
            string str_tablename = "";
            if (str_projclass_tablename != "" && str_xmlx_tablename_2 != "")
            {
                IList<string> tablenameLists = str_projclass_tablename.TrimEnd(',').Split(',');
                foreach (string tablename in tablenameLists)
                {
                    str_tablename = tablename.Split(':')[0].ToString().Trim().Replace("+", "").Replace("-", "").ToLower();
                    if (("," + str_xmlx_tablename_2 + ",").IndexOf("," + str_tablename + ",") > -1)
                    {
                        tablenameList.Add(str_tablename);
                    }
                }
            }
            return tablenameList;
        }

        /// <summary>
        /// 根据栅格获取tbl_maintable查询语句
        /// </summary>
        /// <param name="projectClassIdString"></param>
        /// <param name="projectClassDtl1String"></param>
        /// <param name="projectClassDtl2String"></param>
        /// <param name="sysUserIdString"></param>
        /// <returns></returns>
        public string GetMainTableQueryString(string projectClassIdString, string projectClassDtl1String, string projectClassDtl2String, DataSet ds_visibility, sara.dd.ldsw.model.userinfo userInfoModel)
        {
            IList<string> sc = new List<string>();

            sc.Add(" SYS_PROJECTCLASSDTL1 in ('" + GetProjStateAll(projectClassDtl1String).Replace(",", "','") + "')");

            sc.Add(" SYS_PROJECTCLASSID in ('" + projectClassIdString + "')");

            for (int i = 0; i < ds_visibility.Tables[0].Rows.Count; i++)
            {
                if (ds_visibility.Tables[0].Rows[i]["key"].ToString() == "forshowitem")
                {
                    //string[] str_values = Eva.Library.Format.FormatTextTool.TextReturn(ds_visibility.Tables[0].Rows[i]["value"].ToString()).Split('^');
                    string[] str_values = (ds_visibility.Tables[0].Rows[i]["value"].ToString()).Split('^');
                    for (int j = 0; j < str_values.Length; j++)
                    {
                        string str_value = str_values[j].ToString();

                        str_value = str_value.Replace("[sys_userid]", userInfoModel.sys_userid);

                        str_value = str_value.Replace("[projxmlx]", projectClassDtl2String);

                        str_value = str_value.Replace("[xzqyid]", userInfoModel.sys_toporgan);

                        sc.Add(str_value);
                    }
                }
            }
            string resql = "";

            for (int i = 0; i < sc.Count; i++)
            {
                resql += sc[i] + " and ";
            }

            resql += " 1=1 ";

            return resql;
        }
        #endregion

        #region 权限相关
        /// <summary>
        /// 获取下一状态用户
        /// </summary>
        /// <param name="projectClassIdString"></param>
        /// <param name="projectClassDtl1String"></param>
        /// <param name="facterid"></param>
        /// <param name="xzqyid"></param>
        /// <returns></returns>
        public DataSet GetNextUser(string projectClassIdString, string projectClassDtl1String, string projectClassDtl2String, string xzqyid)
        {

            List<string> ls_where = new List<string>();

            string strc = "";

            DataSet ds_visibility = this.GetVisibility(projectClassIdString, projectClassDtl1String);

            for (int i = 0; i < ds_visibility.Tables[0].Rows.Count; i++)
            {
                if (ds_visibility.Tables[0].Rows[i]["key"].ToString() == "forshowuser")
                {
                    //string[] str_values = Eva.Library.Format.FormatTextTool.TextReturn(ds_visibility.Tables[0].Rows[i]["value"].ToString()).Split('^');
                    string[] str_values = (ds_visibility.Tables[0].Rows[i]["value"].ToString()).Split('^');

                    for (int j = 0; j < str_values.Length; j++)
                    {
                        strc = str_values[j].Replace("[xzqyid]", xzqyid);
                        if (strc != "")
                        {
                            ls_where.Add(strc);
                        }
                    }
                }
            }



            StringBuilder sb = new StringBuilder();
            sb.Append(" select * from t_user");
            sb.Append(" where ';' || u_ruleids || ';' like ");
            sb.Append(" (");
            sb.Append(" select '%;' || f_id || ';%' from t_rule ");
            sb.Append(" where f_sys_appcode like '%" + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + "%' ");
            sb.Append(" and lower(f_url) like '%tbl_maintable_list.html%' ");
            sb.Append(" and lower(f_url) like '%projectclassid=" + projectClassIdString + "&%' ");
            sb.Append(" and lower(f_url) like '%projectclassdtl1=" + this.GetProjStateReal(projectClassDtl1String) + "%'");
            sb.Append("     and (lower(f_url) like '%projectclassdtl2=" + projectClassDtl2String.Split('_')[0].ToString() + "%' or lower(f_url) not like '%projectclassdtl2=%')");
            sb.Append(" ) ");

            for (int i = 0; i < ls_where.Count; i++)
            {
                sb.Append(" and " + ls_where[i].ToString());
            }

            sb.Append(" union all");
            sb.Append(" select * from t_user");
            sb.Append(" where u_id in");
            sb.Append(" (");
            sb.Append("   select u_id from t_userrulegroup_relation where rg_id in ");
            sb.Append("   (");
            sb.Append("     select rg_id from t_rulegroup where ';' || rg_ruleids || ';' like ");
            sb.Append("     (");
            sb.Append("     select '%;' || f_id || ';%' from t_rule ");
            sb.Append("     where f_sys_appcode like '%" + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + "%'");
            sb.Append("     and lower(f_url) like '%tbl_maintable_list.html%' ");
            sb.Append("     and lower(f_url) like '%projectclassid=" + projectClassIdString + "&%' ");
            sb.Append("     and lower(f_url) like '%projectclassdtl1=" + this.GetProjStateReal(projectClassDtl1String) + "%' ");
            sb.Append("     and (lower(f_url) like '%projectclassdtl2=" + projectClassDtl2String.Split('_')[0].ToString() + "%' or lower(f_url) not like '%projectclassdtl2=%')");
            sb.Append("     )");
            sb.Append("   )");
            sb.Append(" ) ");

            for (int i = 0; i < ls_where.Count; i++)
            {
                sb.Append(" and " + ls_where[i].ToString());
            }

            DataSet ds = null;
            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                ds = sara.platform.service.auth.Service.QuerySql(sb.ToString());
            }
            else
            {
                ds = _ia.QuerySql(sb.ToString());
            }

            return ds;
        }
        #endregion

        #region 工作流相关
        /// <summary>
        /// 根据栅格与当前用户信息获取流程定义ID
        /// </summary>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string GetWorkFlowLCDYID(string str_facterid, DataSet ds_facter, string clientInf, string userInfoJsonString)
        {
            string wflcdyid = "";
            DataRow[] drs_facter = ds_facter.Tables[0].Select(" num = '" + str_facterid + "'");
            if (drs_facter.Length == 1)
            {
                wflcdyid = drs_facter[0]["wfprocessdefid"].ToString();
            }
            else
            {
                throw new Exception("behavename指定的facterid在ds_facter集合中没有对应的项!");
            }
            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
            _userInfoModel = sara.dd.ldsw.commonclass.webserviceadapter.GetUserInfoModel(clientInfoDic["userid"], userInfoJsonString);
            string str_sys_toporgan = _userInfoModel.sys_toporgan;

            wflcdyid = wflcdyid.Replace("[sys_appcode]", Eva.Library.Configuration.ConfigurationManager.AppSettings["wf_sys_appcode"].ToString()).Replace("[organid]", str_sys_toporgan);
            return wflcdyid;
        }

        /// <summary>
        /// 根据userOperationDataSet获取下一个节点代办人的usernames
        /// </summary>
        /// <param name="userOperationDataSet"></param>
        /// <returns>userid,username</returns>
        public string GetNextUserNamesByUserOperationDataSet(DataSet userOperationDataSet)
        {
            //过滤被选中的非远程连接线中的usernames（小写逗号分割）中不带符号的部分
            string result = "";
            DataRow[] drs = userOperationDataSet.Tables[0].Select("Iselected in ('0') and Operation_class_id in ('0','1','2','3','4','5','6','8','9','10')");
            foreach (DataRow dr in drs)
            {
                string[] names = dr["usernames"].ToString().Split(',');
                foreach (string name in names)
                {
                    if (name.Trim() != "" && !name.StartsWith("-"))
                    {
                        result += name + ",";
                    }
                }
            }
            return result.TrimEnd(',');
        }

        /// <summary>
        /// 根据流程构造ID的格式获得流程定义ID[sys_appcode]1101[organid]
        /// </summary>
        /// <param name="str_lcdygzid"></param>
        /// <param name="str_appcode"></param>
        /// <param name="str_sys_toporgan"></param>
        /// <returns></returns>
        public string Getlcdyidbygz(string str_lcdygzid, string str_sys_toporgan)
        {
            return str_lcdygzid.Replace("[sys_appcode]", Eva.Library.Configuration.ConfigurationManager.AppSettings["wf_sys_appcode"].ToString()).Replace("[organid]", str_sys_toporgan);
        }

        /// <summary>
        /// 获取流程规则ID：25011032001--[sys_appcode]1103[organid]001
        /// 兼容传入流程定义ID，但是
        /// </summary>
        /// <param name="str_lcdyid"></param>
        /// <returns></returns>
        public string Getlcjdgzid(string str_lcdyjdid)
        {

            //code-less
            //return "[sys_appcode]" + str_lcdyjdid.Substring(3, 4) + "[organid]" + str_lcdyjdid.Substring(str_lcdyjdid.Length - 3, 3);
            //return "[sys_appcode]" + str_lcdyjdid.Substring(3, 2) + "[organid]" + str_lcdyjdid.Substring(str_lcdyjdid.Length - 3, 3);
            //540004020
            //[sys_appcode]004020
            return "[sys_appcode]" + str_lcdyjdid.Substring(3, 3)  + str_lcdyjdid.Substring(str_lcdyjdid.Length - 3, 3);

        }

        #endregion

        #region 日志相关
        /// <summary>
        ///  创建日志
        /// </summary>
        /// <param name="businessid"></param>
        /// <param name="fromstate"></param>
        /// <param name="tostate"></param>
        /// <param name="processinsid"></param>
        /// <param name="remark"></param>
        public void NewLog(string businessid, string projclassid, string fromstate, string tostate, string processinsid, string remark, string clientInf)
        {

            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
            string userid = clientInfoDic["userid"];
            string username = clientInfoDic["username"];
            string ip = clientInfoDic["userip"];
            string mac = clientInfoDic["usermac"];

            //修改之前的数据日志状态为过期
            string ssa = "update t_projstate_log set SYS_FLAG = '-1' where businessid = '" + businessid + "'";
            _iAccessData.ExecuteSql(ssa);
            _model_t_projstate_log = new sara.dd.ldsw.model.t_projstate_log();
            _model_t_projstate_log.sys_id = 0;
            _model_t_projstate_log.businessid = businessid;
            _model_t_projstate_log.businessname = projclassid;
            _model_t_projstate_log.fromstate = fromstate;
            _model_t_projstate_log.tostate = tostate;
            _model_t_projstate_log.sys_creatuserid = userid;
            _model_t_projstate_log.sys_creatusername = username;
            _model_t_projstate_log.processsinsid = processinsid;
            _model_t_projstate_log.remark = remark;
            _model_t_projstate_log.sys_creatdate = System.DateTime.Now;
            //_model_t_projstate_log.workflowid = workflowid;
            _model_t_projstate_log.sys_flag = "1";

            _idal_t_projstate_log.Add(_model_t_projstate_log, null);
        }

        /// <summary>
        ///  创建日志
        /// </summary>
        /// <param name="businessid"></param>
        /// <param name="fromstate"></param>
        /// <param name="tostate"></param>
        /// <param name="processinsid"></param>
        /// <param name="remark"></param>
        public void NewLog(string businessid, string projclassid, string fromstate, string tostate, string processinsid, string remark, string processdefid, string activitydefid, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
            string userid = clientInfoDic["userid"];
            string username = clientInfoDic["username"];
            string ip = clientInfoDic["userip"];
            string mac = clientInfoDic["usermac"];

            //修改之前的数据日志状态为过期
            string ssa = "update t_projstate_log set sys_flag = '-1' where businessid = '" + businessid + "'";
            t.ExecuteSql(ssa);
            _model_t_projstate_log = new sara.dd.ldsw.model.t_projstate_log();
            _model_t_projstate_log.sys_id = 0;
            _model_t_projstate_log.businessid = businessid;
            _model_t_projstate_log.businessname = projclassid;
            _model_t_projstate_log.fromstate = fromstate;
            _model_t_projstate_log.tostate = tostate;
            _model_t_projstate_log.sys_creatuserid = userid;
            _model_t_projstate_log.sys_creatusername = username;
            _model_t_projstate_log.processsinsid = processinsid;
            _model_t_projstate_log.remark = remark;
            _model_t_projstate_log.sys_creatdate = System.DateTime.Now;
            _model_t_projstate_log.workflowid = processdefid;
            _model_t_projstate_log.sys_flag = "1";

            _model_t_projstate_log.value1 = activitydefid;
            _idal_t_projstate_log.Add(_model_t_projstate_log, t);
        }

        /// <summary>
        /// 删除日志
        /// </summary>
        /// <param name="businessid"></param>
        /// <param name="buiinessname"></param>
        public void DelLog(string businessid, string buiinessname, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            _idal_t_projstate_log.Delete(" businessid = '" + businessid + "' ", t);
        }
        #endregion

        #region 报表相关

        /// <summary>
        /// 清理报表文件
        /// </summary>
        public void ClearReportFile()
        {
            string filepath = Eva.Library.Format.FormatTextTool.GetMapPath(Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString(), HttpContext.Current.Server);
            List<string> files = System.IO.Directory.GetFiles(filepath).ToList();

            DateTime datetime;
            int count = int.Parse(Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileKeepDate"].ToString());
            for (int i = 0; i < files.Count; i++)
            {
                datetime = System.IO.File.GetCreationTime(files[i]);
                if (datetime < DateTime.Now.AddDays(-count))
                {
                    try
                    {
                        File.Delete(files[i]);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }

        }


        public static string CreatExcelByDataTable(DataTable data)
        {
            Eva.Library.ServiceAdapter.IAdapter.IReport _rs = Eva.Library.ServiceAdapter.AdapterFactory.ReportFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"].ToString());

            string resultString = "";
            try
            {


                #region 报表导出
                //数据项
                DataSet ds_base = new DataSet();
                //合并单元格
                DataSet ds_merge = new DataSet();
                //表格
                DataSet ds_table = new DataSet();
                //报表名称（唯一标识）
                string reportname = "dataset_excel";

                //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
                string html = "false";
                //要导出文件名（用于对导出的文件命名）
                string outfilename = "";
                //错误代码：为空时：说明成功；不为空时：请查阅错误表
                string errormessage = "";
                //文件路径：用于接受要导出文件的全路径
                string filepath = "";

                #region 组织数据

                //DataSet ds = null;// Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(dataJson);

                //数据项
                #region 数据项

                DataTable dt = new DataTable();
                dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
                dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
                dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
                dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
                dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置

                DataRow dr = dt.NewRow();                         //添加数据项
                dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
                dr["DATAVALUE"] = "";                             //因为此数项为表格，所以此处空
                dr["TABLENAME"] = "TABLE";                  //因为此数项为表格，所以此处填写表格名称（1）
                dt.Rows.Add(dr);

                ds_base.Tables.Add(dt);
                #endregion

                //表格
                #region 表格

                DataTable dt_data = data;

                DataTable dt_table = new DataTable();
                for (int i = 0; i < dt_data.Columns.Count; i++)
                {
                    dt_table.Columns.Add(new DataColumn(dt_data.Columns[i].ColumnName));
                }
                //第一行用于存列数据类型
                dr = dt_table.NewRow();
                for (int i = 0; i < dt_table.Columns.Count; i++)
                {
                    dr[i] = "文本";
                }
                dt_table.Rows.Add(dr);
                //输入数据
                //列名
                dr = dt_table.NewRow();
                for (int i = 0; i < dt_data.Columns.Count; i++)
                {
                    if (dt_data.Columns[0].Caption != "")
                    {
                        dr[i] = dt_data.Columns[i].Caption;
                    }
                    else
                    {
                        dr[i] = dt_data.Columns[i].ColumnName;
                    }
                }
                dt_table.Rows.Add(dr);
                DateTime datetime_temp;
                DateTime datetime_0 = DateTime.Parse("0001-01-01");
                DateTime datetime_00 = DateTime.Parse("1900-01-01");
                for (int i = 0; i < dt_data.Rows.Count; i++)
                {
                    dr = dt_table.NewRow();
                    for (int j = 0; j < dt_data.Columns.Count; j++)
                    {
                        switch (dt_data.Columns[j].DataType.Name.ToLower())
                        {
                            case "string":
                            case "int32":
                                dr[j] = dt_data.Rows[i][j].ToString();
                                break;
                            case "datetime":
                                if (DateTime.TryParse(dt_data.Rows[i][j].ToString(), out datetime_temp))
                                {
                                    if (datetime_temp != datetime_0 && datetime_temp != datetime_00)
                                    {
                                        dr[j] = datetime_temp.ToString("yyyy-MM-dd HH:mm:ss");
                                    }
                                }
                                break;
                        }
                    }
                    dt_table.Rows.Add(dr);
                }
                dt_table.TableName = "TABLE";               //与上文（1）处的表格名称相对应      
                ds_table.Tables.Add(dt_table);           //与上文（1）处的表格名称相对应      
                #endregion

                //合并单元格
                #region 合并单元格
                //DataTable dt_merge = new DataTable("TBL_110_XM_QSQK_XX_MODALPOPUPLIST");//与上文（1）处的表格名称相对应
                //dt_merge.Columns.Add(new DataColumn("startrow"));
                //dt_merge.Columns.Add(new DataColumn("startcolumn"));
                //dt_merge.Columns.Add(new DataColumn("endrow"));
                //dt_merge.Columns.Add(new DataColumn("endcolumn"));
                //DataRow dr_merge;

                //ds_merge.Tables.Add(dt_merge);

                #endregion

                #endregion
                #endregion

                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    filepath = sara.platform.service.report.Service.CreatReport(ds_base, ds_table, ds_merge, reportname, ref html, ref outfilename, ref errormessage);
                }
                else
                {
                    filepath = _rs.CreatReport(ds_base, ds_table, ds_merge, reportname, ref html, ref outfilename, ref errormessage);
                }
                if (errormessage == "")
                {
                    string path = filepath;
                    string filename = "";
                    int count = path.LastIndexOf('\\');
                    filename = path.Substring(count, path.Length - count);
                    filename = filename.TrimStart('\\');
                    resultString = "{result:'true',message:'" + Eva.Library.Configuration.ConfigurationManager.AppSettings["ServiceRoportRootPath"] + filename + "'}";

                }
                else
                {
                    resultString = "{result:'false',message:'" + errormessage + "'}";
                }

            }
            catch (Exception ex)
            {
                resultString = "{result:'false',message:'" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace) + "'}";
            }
            return resultString;
        }
        #endregion





        #region 反射方法
        /// <summary>
        /// 反射
        /// </summary>
        /// <param name="str_ass_name"></param>
        /// <param name="str_ass_classname"></param>
        /// <param name="str_ass_functionname"></param>
        /// <param name="obj_ass_functionparameters"></param>
        /// <returns></returns>
        public string GetResultByParameters(string str_ass_name, string str_ass_classname, string str_ass_functionname, Object[] obj_ass_functionparameters)
        {
            Assembly _ass = Assembly.Load(str_ass_name);
            Type _type = _ass.GetType(str_ass_name + "." + str_ass_classname);
            Object _obj = Activator.CreateInstance(_type);
            MethodInfo meth = _type.GetMethod(str_ass_functionname);

            return (string)(meth.Invoke(_obj, obj_ass_functionparameters));
        }
        #endregion


        public static Eva.Library.Data.AccessData.IAccessData CreateIAccessData()
        {
            Eva.Library.Data.AccessData.IAccessData _iAccessData = null;
            switch (Eva.Library.Configuration.ConfigurationManager.AppSettings["dalTypeStr"])
            {
                case "MySql":
                    _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.mysqldal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
                case "Oracle":
                    _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
                case "SqlServer":
                    _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.mysqldal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
                default:
                    _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
            }

            return _iAccessData;

        }
        public static Eva.Library.Data.AccessDataTrans.IAccessDataTrans CreateIAccessDataTrans()
        {

            Eva.Library.Data.AccessDataTrans.IAccessDataTrans IAccessDataTrans = null;
            switch (Eva.Library.Configuration.ConfigurationManager.AppSettings["dalTypeStr"])
            {
                case "MySql":
                    IAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.mysqldal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
                case "Oracle":
                    IAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
                case "SqlServer":
                    IAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.mysqldal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
                default:
                    IAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    break;
            }

            return IAccessDataTrans;

        }

        public static string GetResultStr(bool result, string msg)
        {
            IDictionary<string, string> resultdic = new Dictionary<string, string>();
            if (result)
            {
                resultdic["result"] = "true";
                resultdic["message"] = msg;
            }
            else
            {
                resultdic["result"] = "false";
                resultdic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(msg);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultdic);
        }

        public static string GetResultStr(string msg)
        {
            IDictionary<string, string> resultdic = new Dictionary<string, string>();

            resultdic["result"] = "true";
            resultdic["message"] = msg;

            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultdic);
        }

        public static string GetResultStr(Exception e)
        {
            IDictionary<string, string> resultdic = new Dictionary<string, string>();

            resultdic["result"] = "false";
            resultdic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(e.Message);

            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultdic);
        }

        public static IDictionary<string, string> GetResultDic(bool result, string msg)
        {
            IDictionary<string, string> resultdic = new Dictionary<string, string>();
            if (result)
            {
                resultdic["result"] = "true";
                resultdic["message"] = msg;
            }
            else
            {
                resultdic["result"] = "false";
                resultdic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(msg);
            }
            return (resultdic);
        }
        public static string GetCurrentAppcode()
        {
            return Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"];
        }
        #region 判断采用的平台服务模式：webservice/dll
        /// <summary>
        /// 获取采用的平台服务模式：webservice/dll
        /// </summary>
        /// <returns></returns>
        public static string GetPlatformServiceModel()
        {
            return Eva.Library.Configuration.ConfigurationManager.AppSettings["PlatformServiceModel"].ToString();
        }
        #endregion
        #endregion

        /// <summary>
        /// 获取“涉及用户”的id,text形式json字符串
        /// </summary>
        /// <returns></returns>
        public static string GetGroupJsonString()
        {
            string sqlString = "select u_id as id,u_name as text from t_user where u_state = '1'";
            Eva.Library.Data.AccessData.IAccessData ia = CreateIAccessData();
            return Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ia.Query(sqlString).Tables[0]);

        }


        public static DataSet ReadExcel(string filefullpath)
        {
            string fileType;
            string connStr = null;

            string fileName = filefullpath;

            fileType = fileName.Substring(fileName.LastIndexOf("."));
            if (fileType == ".xls")
            {
                connStr = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + fileName + ";" + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";
            }
            else if (fileType == ".xlsx")
            {
                connStr = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + fileName + ";" + ";Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1\"";
            }
            if (connStr == null)
            {
                throw new Exception("无法识别的文件类型！");
            }

            OleDbConnection conn = new OleDbConnection(connStr);
            conn.Open();
            DataTable dtSheetName = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, new object[] { null, null, null, "TABLE" });
            string sql_F = " select * from {0}";
            OleDbDataAdapter da = new OleDbDataAdapter();
            DataSet dsItem = new DataSet();

            for (int i = 0; i < dtSheetName.Rows.Count; i++)
            {
                var SheetName = (string)dtSheetName.Rows[i]["TABLE_NAME"];
                if (SheetName.Contains("$") && !SheetName.Replace("'", "").EndsWith("$")) continue;//过滤无效SheetName完毕....
                var tblName = string.Format("[{0}]", SheetName);

                da.SelectCommand = new OleDbCommand(String.Format(sql_F, tblName), conn);
                da.Fill(dsItem, tblName);
            }
            conn.Close();

            return dsItem;
        }


        /// <summary>
        /// 将DataTable中数据写入到CSV文件中
        /// </summary>
        /// <param name="dt">提供保存数据的DataTable</param>
        /// <param name="fileName">CSV的文件路径</param>
        public static void SaveCSV(DataTable dt, string fullPath)
        {
            FileInfo fi = new FileInfo(fullPath);
            if (!fi.Directory.Exists)
            {
                fi.Directory.Create();
            }
            FileStream fs = new FileStream(fullPath, System.IO.FileMode.Create, System.IO.FileAccess.Write);
            //StreamWriter sw = new StreamWriter(fs, System.Text.Encoding.Default);
            StreamWriter sw = new StreamWriter(fs, System.Text.Encoding.UTF8);
            string data = "";
            //写出列名称
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                data += dt.Columns[i].ColumnName.ToString();
                if (i < dt.Columns.Count - 1)
                {
                    data += ",";
                }
            }
            sw.WriteLine(data);
            //写出各行数据
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                data = "";
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    string str = dt.Rows[i][j].ToString();
                    str = str.Replace("\"", "\"\"");//替换英文冒号 英文冒号需要换成两个冒号
                    var reg = new System.Text.RegularExpressions.Regex("^[1234567890.,，]+$");
                    if (reg.IsMatch(str))
                    {
                        str = "\t" + str;
                    }
                    if (str.Contains(",") || str.Contains("\"")
                        || str.Contains("\r") || str.Contains("\n")) //含逗号 冒号 换行符的需要放到引号中
                    {
                        str = string.Format("\"{0}\"", str);
                    }

                    data += str;
                    if (j < dt.Columns.Count - 1)
                    {
                        data += ",";
                    }
                }
                sw.WriteLine(data);
            }
            sw.Close();
            fs.Close();

        }


        /// <summary>
        /// appService校验clienInf
        /// </summary>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public static IDictionary<String, String> CheckClientInf(string clientInf)
        {
            IDictionary<String, String> userInfDic = null;
            try
            {
                userInfDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                if (userInfDic.Keys.Contains("userid") && userInfDic.Keys.Contains("devicetype") && userInfDic.Keys.Contains("userimg") && userInfDic.Keys.Contains("username"))
                {

                }
                else
                {
                    userInfDic = null;
                }
            }
            catch
            {

            }

            return userInfDic;
        }
      
    

        public static string makeThumbnailName(string fileuploadname)
        {
            if (fileuploadname.IndexOf("-thumbnail") > -1)
            {
                return fileuploadname;
            }
            else
            {
                string thumbnailName = fileuploadname.Substring(0, fileuploadname.LastIndexOf('.')) + "-thumbnail" + fileuploadname.Substring(fileuploadname.LastIndexOf('.'));
                return thumbnailName;
            }

        }
        /// <summary>
        /// 生成各业务表的客户编号
        /// </summary>
        /// typeid:类型参数（KH客户、YH用户、SB水表、JF缴费、CB抄表、PG评估、IC ic卡、JM减免、DR缴费导入、HB换表、XJ IC卡新建、LH 批量立户、GHSB 更换水表、XZSB 新增水表 、DHLH 大客户立户 、XHBT 大客户销户、QFTS 欠费停水 、YCBGL 远传表管理 、 DX 短信催收）
        /// nodeid：水表node参数（05240012、05240013 SB030 IC卡表 / 05240026、05240019 SB020 远传表 / 05240001 SB000 机械表 / 其它 SB090）
        /// <returns>该业务表的客户编号 10位</returns>
        public static string getBusinessNum(string typeid, string nodeid, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            Eva.Library.Data.AccessData.IAccessData ia = CreateIAccessData();

          
            typeid = typeid.ToUpper();
            string num = "";
            #region 

            switch (typeid)
            {
                case "SB":
                    {
                        #region 水表
                        switch (nodeid)
                        {
                            case "7"://IC卡智能水表
                            case "16"://Ⅱ型IC卡水表
                            case "12"://Ⅱ型射频卡水表
                            case "13"://Ⅲ型射频卡水表
                                {
                                    num = "030";
                                }
                                break;

                            case "99"://GSM无线远传水表
                            case "19":
                                {
                                    num = "022";
                                }
                                break;

                            case "100"://普通机械表
                                {
                                    num = "000";
                                }
                                break;
                            default:
                                {
                                    num = "090";
                                }
                                break;
                        }
                        string sqlString = "select max(to_number(substr(f_sbbh,4,7)))+1 from tbl_ld_sbb where substr(f_sbbh,0,3) = '" + num + "' ";
                        object o = null;
                        if (t == null)
                        {
                           o =  ia.GetSingle(sqlString);
                        }
                        else
                        {
                           o =  t.GetSingle(sqlString);
                        }    

                   
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 7)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 7);
                        }

                        num = num + ostr; 
                        #endregion
                                               
                    }
                    break;
                case "YH":
                    {
                        #region 用户
                        switch (nodeid)
                        {
                            case "7"://IC卡智能水表
                            case "16"://Ⅱ型IC卡水表
                            case "12"://Ⅱ型射频卡水表
                            case "13"://Ⅲ型射频卡水表
                                {
                                    num = "030";
                                }
                                break;

                            case "99"://GSM无线远传水表
                            case "19":
                                {
                                    num = "022";
                                }
                                break;

                            case "100"://普通机械表
                                {
                                    num = "000";
                                }
                                break;
                            default:
                                {
                                    num = "090";
                                }
                                break;
                        }
                        string sqlString = "select max(to_number(substr(f_yhbh,4,7)))+1 from tbl_ld_yhb where substr(f_yhbh,0,3) = '" + num + "' ";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 7)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 7);
                        }

                        num = num + ostr;
                        #endregion
                    }
                    break;
                case "KH":
                    {
                        #region 客户
                        switch (nodeid)
                        {
                            case "7"://IC卡智能水表
                            case "16"://Ⅱ型IC卡水表
                            case "12"://Ⅱ型射频卡水表
                            case "13"://Ⅲ型射频卡水表
                                {
                                    num = "030";
                                }
                                break;

                            case "99"://GSM无线远传水表
                            case "19":
                                {
                                    num = "022";
                                }
                                break;

                            case "100"://普通机械表
                                {
                                    num = "000";
                                }
                                break;
                            default:
                                {
                                    num = "090";
                                }
                                break;
                        }
                        string sqlString = "select max(to_number(substr(f_khbh,4,7)))+1 from tbl_ld_khb where substr(f_khbh,0,3) = '" + num + "' ";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 7)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 7);
                        }

                        num = num + ostr;
                        #endregion
                    }
                    break;
                case "CB":
                    {
                        #region 抄表
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_cbiao')";
                        //sqlString += " where f_tablename  = 'tbl_ld_cbiao'";
                      
                        //if (t == null)
                        //{
                        //     ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}    
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_cbiao'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    

                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr; 
                        #endregion
                    }
                    break;           
              
                case "IC":
                    {
                        #region IC 卡销售
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ickss')";
                        //sqlString += " where f_tablename  = 'tbl_ld_ickss'";
                   

                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ickss'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr; 
                        #endregion
                    }
                    break;
                case "HB":
                    {
                        #region 换表补发
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ichbbk')";
                        //sqlString += " where f_tablename  = 'tbl_ld_ichbbk'";
                    
                    


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ichbbk'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    



                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr; 
                        #endregion
                    }
                    break;
                case "JF":
                    {
                        #region 缴费
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_jfb')";
                        //sqlString += " where f_tablename  = 'tbl_ld_jfb'";
                      
                    

                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_jfb'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    

                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "PG":
                    {
                        #region 算费
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_pgb')";
                        //sqlString += " where f_tablename  = 'tbl_ld_pgb'";
          
                      


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_pgb'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    

                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "JM":
                    {
                        #region 减免
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_jmb')";
                        //sqlString += " where f_tablename  = 'tbl_ld_jmb'";
                       
                   
                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_jmb'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }    

                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "XJ":
                    {
                        #region IC 卡销售
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ickxj')";
                        //sqlString += " where f_tablename  = 'tbl_ld_ickxj'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ickxj'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "LH":
                    {
                        #region 批量立户
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_pllhlb')";
                        //sqlString += " where f_tablename  = 'tbl_ld_pllhlb'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_pllhlb'";
                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "GHSB":
                    {
                        #region 更换水表
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ghsb')";
                        //sqlString += " where f_tablename  = 'tbl_ld_ghsb'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ghsb'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "XZSB":
                    {
                        #region 新增水表
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_xzsb')";
                        //sqlString += " where f_tablename  = 'tbl_ld_xzsb'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_xzsb'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "DHLH":
                    {
                        #region 大客户立户
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_dyhlh')";
                        //sqlString += " where f_tablename  = 'tbl_ld_dyhlh'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_dyhlh'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "XHBT":
                    {
                        #region 销户报停
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_xhhbt')";
                        //sqlString += " where f_tablename  = 'tbl_ld_xhhbt'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_xhhbt'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "QFTS":
                    {
                        #region 欠费停水
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_qfts')";
                        //sqlString += " where f_tablename  = 'tbl_ld_qfts'";


                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_qfts'";

                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }


                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();

                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }

                        num = ostr;
                        #endregion
                    }
                    break;
                case "XGSBDS":
                    {
                        #region 修改水表底数
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_xgsbds')";
                        //sqlString += " where f_tablename  = 'tbl_ld_xgsbds'";
                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_xgsbds'";
                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();
                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }
                        num = ostr;
                        #endregion
                    }
                    break;
                case "YCBGL":
                    {
                        #region 远传表管理
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ycbgl')";
                        //sqlString += " where f_tablename  = 'tbl_ld_ycbgl'";
                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ycbgl'";
                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();
                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }
                        num = ostr;
                        #endregion
                    }
                    break;
                case "DX":
                    {
                        #region 短信催收
                        //string sqlString = "update tbl_num set f_tablesys_id = ";
                        //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_dxcs')";
                        //sqlString += " where f_tablename  = 'tbl_ld_dxcs'";
                        //if (t == null)
                        //{
                        //    ia.ExecuteSql(sqlString);
                        //}
                        //else
                        //{
                        //    t.ExecuteSql(sqlString);
                        //}
                        string sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_dxcs'";
                        object o = null;
                        if (t == null)
                        {
                            o = ia.GetSingle(sqlString);
                        }
                        else
                        {
                            o = t.GetSingle(sqlString);
                        }
                        string ostr = "";
                        if (o != null)
                        {
                            ostr = o.ToString();
                            if (ostr == "")
                            {
                                ostr = "1";
                            }
                        }
                        else
                        {
                            ostr = "1";
                        }
                        if (ostr.Length < 10)
                        {
                            do
                            {
                                ostr = "0" + ostr;
                            }
                            while (ostr.Length < 10);
                        }
                        num = ostr;
                        #endregion
                    }
                    break;
            }         
         
            #endregion

           
            return num;

        }


        public static string getBusinessNum(string typeid, string nodeid)
        {
            return getBusinessNum(typeid, nodeid, null);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="tableName">表名字，eg：tbl_ld_yhb</param>
        /// <param name="tablePriKeyValue">主键值，eg：2</param>
        /// <param name="editType">程序英文名称，eg：tbl_ld_yhb_detail</param>
        /// <param name="editSource">程序中文名称或描述,eg：用户信息修改程序</param>
        /// <param name="array">dic中有四个值，key,name,oldvalue,newvalue[{"key":"f_yhm","oldvalue":"刘玉东","newvalue":"刘玉东2","name":"用户名"}]</param>
        /// <param name="t">可以传null</param>
        /// <returns></returns>
        public static string addUpdateLog(string tableName, string tablePriKeyValue, string editType, string editSource, List<IDictionary<string, string>> array,string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string result = "";
            try
            {
                if(array.Count > 0)
                {
                    string username = "";
                    string userid = "";
                    string userip = "";
                    string usermac = "";
                    string userloginname = "";

                sara.dd.ldsw.idal.Itbl_ld_log dal = sara.dd.ldsw.commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_ld_log>();
                sara.dd.ldsw.model.tbl_ld_log model = new sara.dd.ldsw.model.tbl_ld_log();
                    if(clientInf != null && clientInf != "")
                    {
                        IDictionary<string, string> dic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);

                        if (dic.Keys.Contains("username"))
                        {
                            username = dic["username"];
                        }

                        if (dic.Keys.Contains("userid"))
                        {
                            userid = dic["userid"];
                        }

                        if (dic.Keys.Contains("userip"))
                        {
                            userip = dic["userip"];
                        }

                        if (dic.Keys.Contains("usermac"))
                        {
                            usermac = dic["usermac"];
                        }

                        if (dic.Keys.Contains("userloginname"))
                        {
                            userloginname = dic["userloginname"];
                        }
                    }

                DateTime now = System.DateTime.Now;
                model.sys_delflag = "0";
                model.sys_lasteditusername = username;
                model.sys_lastedituserid = userid;
                model.sys_lasteditdate = now;
                model.sys_creatdate = now;
                model.sys_creatusername = username;
                model.sys_creatuserid = userid;

                model.f_businesstablename = tableName;
                model.f_businesstableprikeyvalue = tablePriKeyValue;
                model.f_editusername = username;
                model.f_edituserloginname = userloginname;
                model.f_edituserid = userid;
                model.f_edituserip = userip;
                model.f_editusermac = usermac;
                model.f_editdatetime = now;
                model.f_edittype = editType;
                model.f_editsource = editSource;
                model.f_editcontentid = "";
                #region 避免空报错
                for (int i = 0; i < array.Count; i++)
                {
                    if (array[i]["oldvalue"] == null)
                    {
                        array[i]["oldvalue"] = "空";
                    }
                    if (array[i]["newvalue"] == null)
                    {
                        array[i]["newvalue"] = "空";
                    }
                }
                #endregion
                model.f_editcontent = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(array);
                model.f_bz = "";

                dal.Add(model, t);
            }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        /// <summary>
        /// 数字转中文大写
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public static string num2String(double num)
        {
            if (num >= 1000000000)
            {
                Console.WriteLine("num is too large");
                return "";
            }
            string result = "";
            string front = "";//整数部分 
            string back = "";//小数部分 
            string[] num_strs = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };//大写数字数组 
            string[] num_dw = { "", "拾", "佰", "仟", "万", "拾万", "佰万", "仟万", "亿" };//大写数字单位数组 
            string[] money_dw = { "分", "角", "圆" };//人民币单位数组 
            string str_num = num.ToString();
            string[] strs = str_num.Split('.');
            if (num < 0)//负数的话 
            {
                result += "负";
                str_num = str_num.Replace("-", "");
            }

            int num_f = 0;//整数部分 
            int num_back = 0;//小数部分 

            if (strs.Length == 2)
            {
                front = strs[0];
                back = strs[1];

                num_f = Convert.ToInt32(front);
                num_back = Convert.ToInt32(back);


            }
            else
            {
                front = num.ToString();
                num_f = Convert.ToInt32(front);
            }

            for (int i = 8; i >= 0; i--)//从八个0 就是亿开始 
            {
                string cs = "1";//除数 
                for (int j = 1; j <= i; j++)//除数补零 
                {
                    cs += "0";
                }
                int num_cs = Convert.ToInt32(cs);
                int s = num_f / num_cs;//商 
                if (s == 0)//商为0意味着除数没有这么大 直接跳到下一次循环 
                {
                    continue;
                }
                else
                {
                    result += num_strs[s] + num_dw[i];//针对这一位生成结果 
                    num_f = num_f % num_cs;//整数部分重新赋值成余数继续循环 
                }
            }
            result += money_dw[2];//整数位添加货币单位 
            //以下针对结果进行处理使之合理化 
            //循环加零 如2003 不处理将是两千三圆 处理后为两千零三圆 
            //算法为在数字单位数组中从佰开始遍历（第三位）找结果字符串中是否含有它的上一位 如没有则需在此单位的下一位置加入一个“零” 
            for (int i = 2; i < num_dw.Length; i++)
            {
                if (result.IndexOf(num_dw[i]) == -1)
                {
                    continue;
                }

                if (result.IndexOf(num_dw[i - 1]) == -1)
                {
                    result = result.Insert(result.IndexOf(num_dw[i]) + 1, "零");
                }
            }
            //以下处理多出的“万” 如出现二十万两万。。。应为二十二万 
            //算法为保留最后出现的万字 其他去掉 
            string[] strs1 = result.Split('万');
            result = "";
            //以万字拆分字符串后 遍历结果数组 在结果数组的前一位加上万字 
            for (int i = 0; i < strs1.Length; i++)
            {
                result += strs1[i];
                if (i == strs1.Length - 2)
                {
                    result += "万";
                }

            }
            //以下处理录入0时 直接生成零圆 
            if (result == money_dw[2])
            {
                result = "零" + money_dw[2];
            }

            //小数部分处理 
            if (back != null && back != "")
            {
                if (back.Length > 2)//只截取前两位 到分 在小的无货币单位支持 没有意义 
                {
                    back = back.Substring(0, 2);
                }
                num_back = Convert.ToInt32(back);

                int s = num_back / 10;
                int ys = num_back % 10;
                if (s == 0)//只有角一位 
                {
                    result += (num_strs[ys] + money_dw[1]);
                }
                else
                {
                    result += (num_strs[s] + money_dw[1] + num_strs[ys] + money_dw[0]);
                }
            }

            return result;
        }


        #region 悲观锁
        ///// <summary>
        ///// 锁定方法
        ///// </summary>
        ///// <param name="functionName"></param>
        ///// <returns></returns>
        //public static Dictionary<string, string> lockFunction(string functionName)
        //{

        //    Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //    if (System.Web.HttpContext.Current.Application[functionName] == null)
        //    {
        //        System.Web.HttpContext.Current.Application[functionName] = "0";
        //        System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
        //    }
        //    try
        //    {
        //        if (System.Web.HttpContext.Current.Application[functionName].ToString() == "0")
        //        {

        //            System.Web.HttpContext.Current.Application.Lock();
        //            System.Web.HttpContext.Current.Application[functionName] = "1";
        //            System.Web.HttpContext.Current.Application.UnLock();

        //            resultDic["result"] = "true";
        //            resultDic["message"] = "";

        //        }
        //        else
        //        {
        //            int time = int.Parse(System.Web.HttpContext.Current.Application[functionName + "Times"].ToString());
        //            time += 1;
        //            if (time >= 6)
        //            {
        //                resultDic["result"] = "false";
        //                resultDic["message"] = "超时";

        //            }
        //            else
        //            {
        //                System.Web.HttpContext.Current.Application.Lock();
        //                System.Web.HttpContext.Current.Application[functionName + "Times"] = time;
        //                System.Web.HttpContext.Current.Application.UnLock();

        //                System.Threading.Thread.Sleep(1000);

        //                resultDic = lockFunction(functionName);
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        System.Web.HttpContext.Current.Application.Lock();
        //        System.Web.HttpContext.Current.Application[functionName] = "0";
        //        System.Web.HttpContext.Current.Application.UnLock();

        //        System.Web.HttpContext.Current.Application.Lock();
        //        System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
        //        System.Web.HttpContext.Current.Application.UnLock();

        //        resultDic["result"] = "error";
        //        resultDic["message"] = "操作异常：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
        //    }

        //    return resultDic;

        //}

        ///// <summary>
        ///// 解锁方法
        ///// </summary>
        ///// <param name="functionName"></param>
        ///// <returns></returns>
        //public static string unLockFunction(string functionName)
        //{
        //    if (System.Web.HttpContext.Current.Application[functionName] == null)
        //    {
        //        System.Web.HttpContext.Current.Application[functionName] = "0";
        //        System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
        //    }
        //    try
        //    {
        //        System.Web.HttpContext.Current.Application.Lock();
        //        System.Web.HttpContext.Current.Application[functionName] = "0";
        //        System.Web.HttpContext.Current.Application.UnLock();

        //        System.Web.HttpContext.Current.Application.Lock();
        //        System.Web.HttpContext.Current.Application[functionName + "Times"] = "0";
        //        System.Web.HttpContext.Current.Application.UnLock();
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {

        //    }

        //    return "";
        //} 
        #endregion




        /// <summary>
        /// 判断是否需要进入历史表进行查询
        /// 如果开始时间和结束都是都是空，则只差新表，如果都是-1，则新表老表一起查
        /// </summary>
        /// <param name="typeString">cBiao</param>
        /// <param name="cxzxsjString">开始时间</param>
        /// <param name="sjToString">结束时间</param>        
        /// <returns></returns>
        /// 

     
        /// <summary>
        /// 判断是否需要进入历史表进行查询
        /// 如果查询最小时间是空，则只查运行表，如果都是-1，则连历史库一起查
        /// </summary>
        /// <param name="typeString"></param>
        /// <param name="cxzxsjString"></param>
        /// <returns></returns>
        public static bool isNeedHis(string typeString, string cxzxsjString)
        {
            if (cxzxsjString == "true")
            {
                return true;
            }
            else if (cxzxsjString == "false")
            {
                return false;
            }

            //else if (cxzxsjString == "" )
            //{
            //    return false;
            //}
            //else if (cxzxsjString == "-1" )
            //{
            //    return true;
            //}
            else
            {
                DateTime HisDatetime = DateTime.Parse(DateTime.Now.Year.ToString() + "-01-01 00:00:00");
                if (Eva.Library.Configuration.ConfigurationManager.AppSettings[typeString + "HisDatetime"].ToString() != "")
                {
                    HisDatetime = DateTime.Parse(Eva.Library.Configuration.ConfigurationManager.AppSettings[typeString + "HisDatetime"].ToString());
                }


                //开始时间，结束时间
                DateTime sjFromDatetime = DateTime.Parse("1900-01-01");
            
                if (cxzxsjString != "")
                {
                    sjFromDatetime = DateTime.Parse(cxzxsjString);
                }            

                if (sjFromDatetime < HisDatetime)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        /// <summary>
        /// 选中客户，并且给客户打标记，并且获取三合计json
        /// </summary>
        /// <param name="khidString"></param>
        /// <param name="czlxString"></param>
        /// <param name="czidString"></param>
        /// <param name="_iAccessDataTrans"></param>
        /// <returns></returns>
        public static List<DataTable> GetKhxxJsonAndSetCzlx(string khidString, string czlxString, string czidString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans)
        {
            List<DataTable> lt = new List<DataTable>();

            //根据客户编号id查khxx
            DataTable khxxx = _iAccessDataTrans.Query("select * from tbl_ld_khb where sys_id = '" + khidString + "'").Tables[0];

            //用户编号id/水表编号id
            string yhbhid = khxxx.Rows[0]["f_yhbhid"].ToString();
            string sbbhid = khxxx.Rows[0]["f_sbbhid"].ToString();

            DataTable yhxxx = _iAccessDataTrans.Query("select * from tbl_ld_yhb where sys_id = '" + yhbhid + "'").Tables[0];
            DataTable sbxxx = _iAccessDataTrans.Query("select * from tbl_ld_sbb where sys_id = '" + sbbhid + "'").Tables[0];

            
            lt.Add(khxxx);
            lt.Add(yhxxx);
            lt.Add(sbxxx);
           
            string sql = "update tbl_ld_khb set f_value1='" + czlxString + "',f_value2 = '" + czidString + "' where sys_id = '" + khidString + "'";
            _iAccessDataTrans.ExecuteSql(sql);
            return lt;
        }
    }
}