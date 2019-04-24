using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Eva.Library.Data;
using System.Text;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_main 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class service_main : System.Web.Services.WebService
    { 

        #region GetWorkItem
        #region 属性变量
        private Eva.Library.ServiceAdapter.IAdapter.IAuth _ia;

        private Eva.Library.ServiceAdapter.IAdapter.IWorkFlow _iw;

        private Eva.Library.Data.AccessData.IAccessData _iAccessData;

        private sara.dd.ldsw.commonclass.commonclass _cc;

        private string _pr_appcode;

        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable;
        private sara.dd.ldsw.idal.Itbl_maintable _idal_tbl_maintable;
        private DataTable _dt_rules;
        #endregion

        #region 公有方法
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetWorkItem(string parameterJsonString, string clientInf)
        {
            #region code







            //                string resultString = @"
            //        {
            //        customColumnJsonArray: [
            //        {
            //            columnField: 'custom_xmlx',
            //            columnText: '项目类型'
            //        },
            //        {
            //            columnField: 'custom_dwmc',
            //            columnText: '单位名称'
            //        }
            //        ],
            //        menuJsonArray: [
            //            {
            //                projectclassid: '1',
            //                projectclassid_name: '地块',
            //                count: '21',
            //                children: [
            //                    {
            //                        projectclassdtl2: '1',
            //                        projectclassdtl2_name: '单独选址',
            //                        count: '3'
            //                    },
            //                    {
            //                        projectclassdtl2: '2',
            //                        projectclassdtl2_name: '城镇分批次',
            //                        count: '5'
            //                    },
            //                    {
            //                        projectclassdtl2: '3',
            //                        projectclassdtl2_name: '实施方案',
            //                        count: '11'
            //                    },
            //                    {
            //                        projectclassdtl2: '4',
            //                        projectclassdtl2_name: '线性工程',
            //                        count: '2'
            //                    }
            //
            //                ]
            //            }, {
            //                projectclassid: '2',
            //                projectclassid_name: '批次',
            //                count: '10',
            //                children: [
            //                    {
            //                        projectclassdtl2: '1',
            //                        projectclassdtl2_name: '单独选址',
            //                        count: '2'
            //                    },
            //                    {
            //                        projectclassdtl2: '2',
            //                        projectclassdtl2_name: '城镇分批次',
            //                        count: '3'
            //                    },
            //                    {
            //                        projectclassdtl2: '3',
            //                        projectclassdtl2_name: '实施方案',
            //                        count: '4'
            //                    },
            //                    {
            //                        projectclassdtl2: '4',
            //                        projectclassdtl2_name: '线性工程',
            //                        count: '1'
            //                    }
            //
            //                ]
            //            }
            //        ],
            //        contentJsonArray: [
            //            {0}
            //        ],
            //        contentCount: 31
            //    }";
            #endregion

            #region 初始化
            _ia = Eva.Library.ServiceAdapter.AdapterFactory.AuthFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

            _iw = Eva.Library.ServiceAdapter.AdapterFactory.WorkFlowFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

            _iAccessData = commonclass.commonclass.CreateIAccessData();

            _cc = new sara.dd.ldsw.commonclass.commonclass();

            _pr_appcode = Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"].ToString();

            _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();
            _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
            #endregion

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string searchTextString = parameterJsonDic["searchTextString"].ToString();
                int stratIndexInt = int.Parse(parameterJsonDic["stratIndexString"].ToString());
                int endIndexInt = int.Parse(parameterJsonDic["endIndexString"].ToString());
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());

                //返回值汇总
                IDictionary<string, string> resultStringDic = new Dictionary<string, string>();
                resultStringDic["customColumnJsonArray"] = "";
                resultStringDic["menuJsonArray"] = "";
                resultStringDic["contentJsonArray"] = "";
                resultStringDic["contentCount"] = "";


                //1、构造自定义字段列，描述字段名称和文字
                #region customColumnJsonList
                IList<IDictionary<string, string>> customColumnJsonList = new List<IDictionary<string, string>>();

                //string[] columnFieldArray = new string[4] { "custom_xmlx", "custom_dwmc", "custom_lrr", "custom_xzqy" };
                //string[] columnTextArray = new string[4] { "项目类型", "单位名称", "录入人", "行政区域" };
                string[] columnFieldArray = new string[0] { };
                string[] columnTextArray = new string[0] { };

                for (int i = 0; i < columnFieldArray.Length; i++)
                {
                    IDictionary<string, string> customColumnJson1 = new Dictionary<string, string>();
                    customColumnJson1["columnField"] = columnFieldArray[i].ToString();
                    customColumnJson1["columnText"] = columnTextArray[i].ToString();
                    customColumnJsonList.Add(customColumnJson1);
                }


                resultStringDic["customColumnJsonArray"] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(customColumnJsonList);
                #endregion

                //2、获取数据\排序
                #region order 按照priclassid,projectclassdtl2排序
                List<sara.dd.ldsw.model.workitem> lw = GetUserWorkItem(sysUserIdString, searchTextString, userInfoJsonString);

                //lw.Sort(delegate(sara.dd.ldsw.model.workitem w1, sara.dd.ldsw.model.workitem w2)
                //{
                //    return (w1.projectclassid + "_" + w1.projectclassdtl2).CompareTo(w2.projectclassid + "_" + w2.projectclassdtl2);
                //});
                #endregion

                //3、构造菜单
                #region menuJsonArray
                Eva.Library.Collection.NoRepeatingStringCollection nrsc_projectclassid = new Eva.Library.Collection.NoRepeatingStringCollection();
                Eva.Library.Collection.NoRepeatingStringCollection nrsc_projectclassid_name = new Eva.Library.Collection.NoRepeatingStringCollection();
                for (int i = 0; i < lw.Count; i++)
                {
                    nrsc_projectclassid.Add(lw[i].projectclassid);
                    nrsc_projectclassid_name.Add(lw[i].projectclassid_name);
                }

                IList<IDictionary<string, string>> menuJsonList = new List<IDictionary<string, string>>();
                int allCount = 0;
                for (int i = 0; i < nrsc_projectclassid.Count; i++)
                {
                    //查询当下projectclassid下的数据
                    IEnumerable<sara.dd.ldsw.model.workitem> workitemQuery = from w in lw
                                                                                  where w.projectclassid == nrsc_projectclassid[i]
                                                                                  select w;
                    //目的：计算count，计算children
                    int count = 0;
                    IList<IDictionary<string, string>> childrenDicList = new List<IDictionary<string, string>>();

                    Eva.Library.Collection.NoRepeatingStringCollection nrsc_projectclassdtl2 = new Eva.Library.Collection.NoRepeatingStringCollection();
                    Eva.Library.Collection.NoRepeatingStringCollection nrsc_projectclassdtl2_name = new Eva.Library.Collection.NoRepeatingStringCollection();


                    foreach (sara.dd.ldsw.model.workitem w in workitemQuery)
                    {
                        if (w.tbl_maintable_sys_id != "-1")
                        {
                            count++;
                            allCount++;
                        }


                        nrsc_projectclassdtl2.Add(w.projectclassdtl2);
                        nrsc_projectclassdtl2_name.Add(w.projectclassdtl2_name);



                    }

                    for (int i2 = 0; i2 < nrsc_projectclassdtl2.Count; i2++)
                    {

                        //查询当下projectclassid\projectclassdtl2下的数据
                        IEnumerable<sara.dd.ldsw.model.workitem> workitemQuery2 = from w2 in lw
                                                                                       where w2.projectclassid == nrsc_projectclassid[i]
                                                                                       && w2.projectclassdtl2 == nrsc_projectclassdtl2[i2]
                                                                                       select w2;
                        int count2 = 0;
                        string projclassdtl2name = "";
                        foreach (sara.dd.ldsw.model.workitem w2 in workitemQuery2)
                        {
                            if (w2.tbl_maintable_sys_id != "-1" && w2.projectclassdtl2 == nrsc_projectclassdtl2[i2] && w2.projectclassid == nrsc_projectclassid[i])
                            {
                                count2++;
                                projclassdtl2name = w2.projectclassdtl2_name;
                            }
                        }
                        if (count2 > 0)
                        {

                        IDictionary<string, string> menuJson2 = new Dictionary<string, string>();
                        menuJson2["projectclassdtl2"] = nrsc_projectclassdtl2[i2].ToString();
                            menuJson2["projectclassdtl2_name"] = projclassdtl2name;//nrsc_projectclassdtl2_name[i2].ToString();
                        menuJson2["count"] = count2.ToString();
                        childrenDicList.Add(menuJson2);
                        }
                    }



                    #region 构造父节点
                    IDictionary<string, string> menuJson = new Dictionary<string, string>();
                    menuJson["projectclassid"] = nrsc_projectclassid[i].ToString();
                    menuJson["projectclassid_name"] = nrsc_projectclassid_name[i].ToString();
                    menuJson["children"] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(childrenDicList);
                    menuJson["count"] = count.ToString();
                    menuJsonList.Add(menuJson);
                    #endregion

                }

                resultStringDic["menuJsonArray"] = Eva.Library.Format.FormatEntityTool.FormatDicListToJson(menuJsonList);
                #endregion

                //4、构造数据内容
                #region contentJsonArray


                List<sara.dd.ldsw.model.workitem> lw2 = new List<model.workitem>();
                if (endIndexInt == -1)
                {
                    endIndexInt = lw.Count;
                }
                else
                {
                    if (lw.Count < endIndexInt)
                    {
                        endIndexInt = lw.Count;
                    }
                }

                for (int i = stratIndexInt; i < endIndexInt; i++)
                {
                    lw2.Add(lw[i]);
                }

                resultStringDic["contentJsonArray"] = Eva.Library.Format.FormatEntityTool.FormatModelListToJson(lw2, "");


                #endregion

                //5、构造count
                #region contentCount
                resultStringDic["contentCount"] = allCount.ToString();
                #endregion

                resultDic["result"] = "true";
                resultDic["message"] = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultStringDic);//.Replace("\\\"", "\"").Replace("\\\"", "\"").Replace("\\\"", "\"").Replace("\\\"", "\"").Replace("\\\"", "\"").Replace("\"[", "[").Replace("]\"", "]");

                NewLog("获取用户待办工作执行成功。", "message_result", clientInf);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("获取用户待办工作执行失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
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
        #endregion

        #region 私有方法

        /// <summary>
        /// 获取代办工作
        /// </summary>
        /// <param name="sysUserIdString"></param>
        /// <param name="searchTextString"></param>
        /// <returns></returns>
        private List<sara.dd.ldsw.model.workitem> GetUserWorkItem(string sysUserIdString, string searchTextString, string userInfoJsonString)
        {

            #region code
            //            string resultTempleteString = @"tbl_maintable_sys_id: '{0}',
            //              projectclassid: '{2}',
            //              projectclassid_name: '{3}',
            //              projectclassdtl1: '2{6}',
            //              projectclassdtl1_name: '区县审核{7}',
            //              projectclassdtl2: '{4}',
            //              projectclassdtl2_name: '{5}',
            //              appurl: '../tbl_maintable/tbl_maintable_detailall.html',
            //              appparameter: 'uid=[userid]^sys_id=[tbl_maintable_sys_id]^pagetype=[pagetype]^projectclassid=[projectclassid]^projectclassdtl1=[projectclassdtl1]^projectclassdtl2=[projectclassdtl1]^appcode=[appcode]',
            //              shpid: '111222',
            //              receivetime: '{1}',
            //              xmmc: '项目名称_{0}_{1}',
            //              custom_xmlx: '项目类型1',
            //              custom_dwmc: '单位名称1'"; 
            #endregion

            List<sara.dd.ldsw.model.workitem> lw = new List<model.workitem>();

            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                _dt_rules = sara.platform.service.auth.Service.GetUserRuleByUserid(sysUserIdString).Tables[0];
            }
            else
            {
                _dt_rules = _ia.GetUserRuleByUserid(sysUserIdString).Tables[0];
            }
            sara.dd.ldsw.model.userinfo modeluserinfo = sara.dd.ldsw.commonclass.webserviceadapter.GetUserInfoModel(sysUserIdString, userInfoJsonString);
            
            //获取t_projclass\t_projclass_dtl数据
            string str_sql_projectclass = "select * from t_projclass order by to_number(sys_orderid)";
            DataTable dt_projectclass = _iAccessData.Query(str_sql_projectclass).Tables[0];
            string str_sql_projectclassdtl1 = "select p.sys_orderid,p.projclassname,p.filescontentid,d.* from t_projclass p,t_projclass_dtl1 d where p.sys_id = d.projclassid order by to_number(p.sys_orderid),to_number(d.sys_orderid)";
            DataTable dt_projectclassdtl1 = _iAccessData.Query(str_sql_projectclassdtl1).Tables[0];
            string str_sql_projectclassdtl2 = "select * from t_projclass_dtl2 ";
            DataTable dt_projectclassdtl2 = _iAccessData.Query(str_sql_projectclassdtl2).Tables[0];
            //一次性获得全部待办工作
            DataTable dt_workitem = null;
            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                dt_workitem = sara.platform.service.workflow.Service.GetWorkItem(sysUserIdString, System.DateTime.Now);
            }
            else
            {
                dt_workitem = _iw.GetWorkItem(sysUserIdString, System.DateTime.Now);
            }
            sara.dd.ldsw.model.workitem wim;

            string str_workflow_tbl_maintable_sys_ids = "";
            string str_projclass_tbl_maintable_sys_ids = "";
            List<string> list_projectclass = new List<string>();//没有待办工作的类型
            #region 拼sys_id
            {
                string str_projectclassid = "";
                string str_projectdtl1 = "";
                string str_projectclassname = "";
                string str_projectdtl1name = "";
                string str_projectdtl2 = "";
                string str_projectdtl2name = "";
                DataSet ds_projectfacter;
                DataSet ds_projectvisibility;

                for (int wf = 0; wf < dt_workitem.Rows.Count; wf++)
                {
                    str_workflow_tbl_maintable_sys_ids += dt_workitem.Rows[wf]["ywbzjz"].ToString() + ",";
                }
                str_workflow_tbl_maintable_sys_ids = str_workflow_tbl_maintable_sys_ids.TrimEnd(',');

                #region 根据t_projclass循环建立sys_id
                for (int i = 0; i < dt_projectclass.Rows.Count; i++)
                {
                    //循环t_projclassdtl
                    List<DataRow> drs_projclassdtl = dt_projectclassdtl1.Select(" projclassid = '" + dt_projectclass.Rows[i]["sys_id"].ToString() + "'  and value4='0' ").ToList();
                    for (int j = 0; j < drs_projclassdtl.Count; j++)
                    {
                        str_projectclassid = drs_projclassdtl[j]["projclassid"].ToString();
                        str_projectdtl1 = drs_projclassdtl[j]["projstate"].ToString();
                        str_projectclassname = drs_projclassdtl[j]["projclassname"].ToString();
                        str_projectdtl1name = drs_projclassdtl[j]["value1"].ToString();
                        ds_projectfacter = _cc.StringToDataSet(drs_projclassdtl[j]["facter"].ToString());
                        ds_projectvisibility = _cc.StringToDataSet(drs_projclassdtl[j]["visibility"].ToString());
                        List<DataRow> drs_projclassdtl2 = dt_projectclassdtl2.Select(" projclassid = '" + dt_projectclass.Rows[i]["sys_id"].ToString() + "' and value4='0' ").ToList();
                        for (int k = 0; k < drs_projclassdtl2.Count; k++)
                        {
                            str_projectdtl2 = drs_projclassdtl2[k]["projstate"].ToString();
                            str_projectdtl2name = drs_projclassdtl2[k]["projname"].ToString();
                            #region 根据权限查询sys_id
                            if (this.IsBusinessUserRule(_pr_appcode, str_projectclassid, str_projectdtl1, str_projectdtl2))
                            {
                                string ids = GetMainTableSysIds(str_projectclassid, str_projectdtl1, str_projectdtl2, ds_projectvisibility, modeluserinfo);
                                if (ids != "")
                                {
                                    if (str_projclass_tbl_maintable_sys_ids != "")
                                    {
                                        str_projclass_tbl_maintable_sys_ids += ",";
                                    }
                                    str_projclass_tbl_maintable_sys_ids += ids;
                                }
                                if (!list_projectclass.Contains(str_projectclassid + "^" + str_projectdtl2))
                                {
                                    list_projectclass.Add(str_projectclassid + "^" + str_projectdtl2);
                                }
                            }
                            #endregion
                        }
                    }
                }
                #endregion
            }
            #endregion

            #region 查询数据
            {
                string query_sys_ids = str_workflow_tbl_maintable_sys_ids + "," + str_projclass_tbl_maintable_sys_ids;
                query_sys_ids = query_sys_ids.Trim(',');
                string query_sql = "select * from view_main where sys_id in ('" + query_sys_ids.Replace(",", "','") + "')" + GetFullTextSearch(searchTextString);
                DataSet ds_result = _iAccessData.Query(query_sql);
                DataRow[] drs_projclass;
                DataRow[] drs_projclassdtl2;
                DataRow[] drs_projclassdtl1;
                DataRow[] drs_workflow;
                string yy = "";
                string s_parameter = "";
                List<string> l_parameters = new List<string>();
                List<string> l_parameternames = new List<string>();
                foreach (DataRow dr in ds_result.Tables[0].Rows)
                {
                    wim = new sara.dd.ldsw.model.workitem();

                    wim.projectclassid = dr["sys_projectclassid"].ToString();
                    drs_projclass = dt_projectclass.Select(" sys_id = '" + wim.projectclassid + "'");
                    wim.projectclassorderid = drs_projclass[0]["sys_orderid"].ToString();
                    wim.projectclassid_name = (drs_projclass[0]["projclassname"].ToString());
                    wim.projectclassdtl2 = dr["sys_projectclassdtl2"].ToString();
                    drs_projclassdtl2 = dt_projectclassdtl2.Select("projclassid='" + wim.projectclassid + "' and projstate = '" + wim.projectclassdtl2 + "'");
                    wim.projectclassdtl2orderid = drs_projclassdtl2[0]["sys_orderid"].ToString();
                    wim.projectclassdtl2_name = (drs_projclassdtl2[0]["projname"].ToString());
                    wim.projectclassdtl1 = dr["sys_projectclassdtl1"].ToString();
                    drs_projclassdtl1 = dt_projectclassdtl1.Select("projclassid='" + wim.projectclassid + "' and projstate = '" + wim.projectclassdtl1 + "'");
                    wim.projectclassdtl1orderid = drs_projclassdtl1[0]["sys_orderid"].ToString();
                    wim.projectclassdtl1_name = (drs_projclassdtl1[0]["value1"].ToString());

                    wim.tbl_maintable_sys_id = dr["sys_id"].ToString();
                    wim.shpid = dr["shpid"].ToString();
                    wim.xmmc = (dr["xmmc"].ToString());

                    //如果创建项目失败，可能造成没有日志的情况，则jssj为空，则在此处做容错处理，设定接收事件为当前日期
                    if (dr["jssj"].ToString() == "")
                    {
                        wim.receivetime = System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    }
                    else
                    {
                        wim.receivetime = DateTime.Parse(dr["jssj"].ToString()).ToString("yyyy-MM-dd HH:mm:ss");
                    }
                    wim.custom_xzqy = (dr["xzqy"].ToString());
                    wim.custom_lrr = (dr["lrr"].ToString());
                    wim.custom_xmlx = (wim.projectclassdtl2_name);
                    wim.custom_dwmc = (dr["dwmc"].ToString());

                    wim.sys_first = dr["sys_first"].ToString();

                    drs_workflow = dt_workitem.Select("ywbzjz='" + wim.tbl_maintable_sys_id + "'");
                    if (drs_workflow.Length > 0)
                    {
                        #region code
                        //如果发生一个maintable重复起件的问题，或者流程错乱的问题，直接不显示该流程。
                        if (dr["sys_processinsid"].ToString() != drs_workflow[0]["sl_lc_id"].ToString())
                        {
                            //写日志--codeless
                            continue;
                        }
                        //流转类型：办件、审批
                        if (drs_workflow[0]["jdzt"].ToString() == "5")
                        {
                            wim.lzlx = "-审批流程中[退回]";
                        }
                        else
                        {
                            wim.lzlx = "审批流程中";
                        }
                        yy = drs_workflow[0]["khyydw"].ToString();
                        wim.appurl = yy.Split('?')[0];
                        s_parameter = yy.Split('?')[1];
                        l_parameters = yy.Split('?')[1].Split('^').ToList();
                        l_parameternames = new List<string>();
                        foreach (string parameter in l_parameters)
                        {
                            l_parameternames.Add(parameter.Split('=')[0]);
                        }
                        if (!l_parameternames.Contains("uid"))
                        {
                            s_parameter += "^uid=[userid]";
                        }
                        if (!l_parameternames.Contains("uidsys_id"))
                        {
                            s_parameter += "^sys_id=[tbl_maintable_sys_id]";
                        }
                        if (!l_parameternames.Contains("pagetype"))
                        {
                            s_parameter += "^pagetype=[pagetype]";
                        }
                        if (!l_parameternames.Contains("projectclassid"))
                        {
                            s_parameter += "^projectclassid=[projectclassid]";
                        }
                        if (!l_parameternames.Contains("projectclassdtl1"))
                        {
                            s_parameter += "^projectclassdtl1=[projectclassdtl1]";
                        }
                        if (!l_parameternames.Contains("projectclassdtl2"))
                        {
                            s_parameter += "^projectclassdtl2=[projectclassdtl2]";
                        }
                        if (!l_parameternames.Contains("appcode"))
                        {
                            s_parameter += "^appcode=[appcode]";
                        }

                        if (!l_parameternames.Contains("workitemid"))
                        {
                            s_parameter += "^workitemid=" + drs_workflow[0]["workitem_sys_id"].ToString();
                        }
                        if (!l_parameternames.Contains("processdefid"))
                        {
                            s_parameter += "^processdefid=" + drs_workflow[0]["fk_dy_lc_sys_id"].ToString();
                        }
                        if (!l_parameternames.Contains("activitydefid"))
                        {
                            s_parameter += "^activitydefid=" + drs_workflow[0]["fk_dy_jd_sys_id"].ToString();
                        }
                        if (!l_parameternames.Contains("processinsid"))
                        {
                            s_parameter += "^processinsid=" + drs_workflow[0]["sl_lc_id"].ToString();
                        }
                        wim.appparameter = s_parameter.Trim('^');
                        #endregion
                    }
                    else
                    {
                        if (wim.projectclassdtl1.IndexOf("_") > -1)
                        {
                            wim.lzlx = "-办件中[退回]";
                        }
                        else
                        {
                            wim.lzlx = "办件中";
                        }
                        wim.appurl = "../tbl_maintable/tbl_maintable_detailall.html";
                        wim.appparameter = "uid=[userid]^sys_id=[tbl_maintable_sys_id]^pagetype=[pagetype]^projectclassid=[projectclassid]^projectclassdtl1=[projectclassdtl1]^projectclassdtl2=[projectclassdtl2]^appcode=[appcode]";
                    }
                    lw.Add(wim);
                }
            }
            #endregion

            #region 补充没有待办工作的类型
            {
                DataRow[] drs_projclass;
                DataRow[] drs_projclassdtl2;
                string projclassid = "";
                string projcalssdtl2id = "";
                foreach (string content in list_projectclass)
                {
                    wim = new sara.dd.ldsw.model.workitem();
                    projclassid = content.Split('^')[0];
                    projcalssdtl2id = content.Split('^')[1];
                    wim.projectclassid = projclassid;
                    drs_projclass = dt_projectclass.Select(" sys_id = '" + wim.projectclassid + "'");
                    wim.projectclassorderid = drs_projclass[0]["sys_orderid"].ToString();
                    wim.projectclassid_name = (drs_projclass[0]["projclassname"].ToString());
                    wim.projectclassdtl2 = projcalssdtl2id;
                    drs_projclassdtl2 = dt_projectclassdtl2.Select(" projstate = '" + wim.projectclassdtl2 + "'");
                    wim.projectclassdtl2orderid = drs_projclassdtl2[0]["sys_orderid"].ToString();
                    wim.projectclassdtl2_name = (drs_projclassdtl2[0]["projname"].ToString());
                    //wim.projectclassdtl1 = dr["sys_projectclassdtl1"].ToString();
                    //drs_projclassdtl1 = dt_projectclassdtl1.Select(" projstate = '" + wim.projectclassdtl1 + "'");
                    //wim.projectclassdtl1orderid = drs_projclassdtl1[0]["sys_orderid"].ToString();
                    //wim.projectclassdtl1_name = (drs_projclassdtl1[0]["value1"].ToString());

                    wim.tbl_maintable_sys_id = "-1";//dr["sys_id"].ToString();
                    //wim.shpid = dr["shpid"].ToString();
                    //wim.xmmc = (dr["xmmc"].ToString());

                    lw.Add(wim);
                }
            }
            #endregion

            #region 排序

            lw.Sort(delegate(sara.dd.ldsw.model.workitem p1, sara.dd.ldsw.model.workitem p2)
            {
                int result = 0;
                int projectclass = Comparer<float>.Default.Compare(float.Parse(p1.projectclassorderid), float.Parse(p2.projectclassorderid));
                if (projectclass != 0)
                {
                    result = projectclass;
                }
                else
                {
                    int projectclassdtl2 = Comparer<float>.Default.Compare(float.Parse(p1.projectclassdtl2orderid), float.Parse(p2.projectclassdtl2orderid));
                    if (projectclassdtl2 != 0)
                    {
                        result = projectclassdtl2;
                    }
                    else
                    {
                        int receivetime = Comparer<string>.Default.Compare(p2.receivetime, p1.receivetime);
                        if (receivetime != 0)
                        {
                            result = receivetime;
                        }
                    }
                }
                return result;
            });
            #endregion
            return lw;
        }

        /// <summary>
        /// 检查用户是否具有该权限
        /// </summary>
        /// <param name="sys_appcode"></param>
        /// <param name="projclass"></param>
        /// <param name="projstate"></param>
        /// <param name="projxmlx"></param>
        /// <returns></returns>
        private bool IsBusinessUserRule(string sys_appcode, string projectClassIdString, string projectClassDtl1String, string projectClassDtl2String)
        {
            StringBuilder sb = new StringBuilder();
            //判断用户是否有这个权限
            sb.Append("     f_sys_appcode like '%" + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + "%'");
            sb.Append("     and f_url like '%tbl_maintable_list.html%' ");
            sb.Append("     and f_url like '%projectclassid=" + projectClassIdString + "%' ");
            sb.Append("     and f_url like '%projectclassdtl1=" + _cc.GetProjStateReal(projectClassDtl1String) + "%' ");
            sb.Append("     and (f_url like '%projectclassdtl2=" + projectClassDtl2String.Split('_')[0].ToString() + "%' or f_url not like '%projectclassdtl2=%')");
            if (_dt_rules.Select(sb.ToString()).Length > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 获取maintable_sys_ids
        /// </summary>
        /// <param name="?"></param>
        /// <param name="?"></param>
        /// <param name="?"></param>
        /// <param name="?"></param>
        /// <returns></returns>
        private string GetMainTableSysIds(string str_projectclassid, string str_projectdtl1, string str_projectdtl2, DataSet ds_projectvisibility, sara.dd.ldsw.model.userinfo userInfoModel)
        {
            string sys_ids = "";
            string sqlwhere = _cc.GetMainTableQueryString(str_projectclassid, str_projectdtl1, str_projectdtl2, ds_projectvisibility, userInfoModel);
            DataSet ds = _iAccessData.Query(" select sys_id from tbl_maintable where " + sqlwhere + "");
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                sys_ids += ds.Tables[0].Rows[i]["sys_id"].ToString() + ",";
            }
            sys_ids = sys_ids.TrimEnd(',');
            return sys_ids;
        }

        /// <summary>
        /// 模糊查询
        /// </summary>
        private string GetFullTextSearch(string searchTextString)
        {
            if (searchTextString.Trim() == "")
            {
                return "";
            }
            List<string> s_items = new List<string>();
            List<string> s_fields = null;
            List<string> s = new List<string>(searchTextString.Split(' '));
            if (s.Count > 0)
            {
                for (int i = 0; i < s.Count; i++)
                {
                    if (s[i].Length > 0)
                    {
                        s_fields = new List<string>();

                        s_fields.Add(" xmmc like '%" + (s[i]) + "%' ");

                        s_fields.Add(" xzqy like '%" + (s[i]) + "%' ");

                        s_fields.Add(" dwmc like '%" + (s[i]) + "%' ");

                        s_fields.Add(" lrr like '%" + (s[i]) + "%' ");

                        s_fields.Add(" xmlx like '%" + (s[i]) + "%' ");

                        //DateTime d_lrrq = new DateTime();
                        //if (DateTime.TryParse(s[i], out d_lrrq) == true)
                        //{
                        //    s_fields.Add(" lrrq = '" + d_lrrq.ToString("yyyy-MM-dd") + "' ");
                        //}

                        //s_fields.Add(" bz like '%" + (s[i]) + "%' ");

                        s_items.Add(" ( " + string.Join(" or ", s_fields.ToArray()) + " ) ");
                    }
                }
            }
            return " and " + string.Join(" and ", s_items.ToArray());
        }


        #endregion 
        #endregion
        
        #region GetComment
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetComment(string parameterJsonString, string clientInf)
        {


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string appcodeIdString = parameterJsonDic["appcodeIdString"].ToString();
                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());

                Eva.Library.Data.AccessData.IAccessData ia = commonclass.commonclass.CreateIAccessData();

                string whereString = " ( ','||f_groupid||',') like '%," + sysUserIdString + ",%' ";
                whereString += "and sysdate between f_startdate and f_edndate+1 ";
                whereString += "and sys_delflag = '0'";


                string sql = "select count(*) from tbl_notice where" + whereString;
                string total = ia.GetSingle(sql).ToString();

                sql = "";
                sql += "  select sys_id, sys_creatusername, f_title, f_content as f_content_dtl,";
                sql += "(select wm_concat(filerealname) from tbl_file_content where menuid = n.f_file) as f_filerealname,";
                sql += "(select wm_concat(fileuploadname) from tbl_file_content where menuid = n.f_file) as f_fileuploadname,";
                sql += "f_startdate as f_act_startdate from tbl_notice n where " + whereString;


                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ia.Query(sql).Tables[0]);
                string message = "{\"total\":\"" + total + "\",\"rows\":" + rows + "}";


                resultDic["result"] = "true";
                resultDic["message"] = message;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("获取用户待办工作执行失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }       
        #endregion

        #region GetNoteBook
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNoteBook(string parameterJsonString, string clientInf)
        {


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string appcodeIdString = parameterJsonDic["appcodeIdString"].ToString();
                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());

                string startDateString = (parameterJsonDic["startDateString"].ToString());
                string endDateString = (parameterJsonDic["endDateString"].ToString());

               
                string whereString = " ( ','||f_groupid||',') like '%," + sysUserIdString + ",%' ";
                whereString += " and(";
                whereString += " (f_startdate <= to_date('" + startDateString + "', 'yyyy-MM-dd') and f_edndate >= to_date('" + endDateString + "', 'yyyy-MM-dd')+1) ";
                whereString += " or (f_startdate >= to_date('" + startDateString + "', 'yyyy-MM-dd') and f_edndate <= to_date('" + endDateString + "', 'yyyy-MM-dd')+1)";
                whereString += " or (f_startdate >= to_date('" + startDateString + "', 'yyyy-MM-dd') and f_edndate >= to_date('" + endDateString + "', 'yyyy-MM-dd')+1)";
                whereString += " or (f_startdate <= to_date('" + startDateString + "', 'yyyy-MM-dd') and f_edndate <= to_date('" + endDateString + "', 'yyyy-MM-dd')+1)";
                whereString += ")";
                whereString += " and sys_delflag = '0'";
                whereString += " and f_statusid in ('0','1')";

                Eva.Library.Data.AccessData.IAccessData ia = commonclass.commonclass.CreateIAccessData();
                string sql = "select count(*) from tbl_task where " + whereString;
                string total = ia.GetSingle(sql).ToString();

                sql = "";
                sql += "select ";
                sql += " sys_id, ";
                sql += " f_group, ";
                sql += " sys_lasteditusername as f_czr, ";
                sql += " substr(f_content,0,30) as f_title, ";
                sql += " f_comment as f_content, ";
                sql += " f_startdate as f_date1, ";
                sql += " f_edndate as f_date2, ";
                sql += " (select wm_concat(filerealname) from tbl_file_content where menuid = n.f_file ) as f_filerealname, ";
                sql += " (select wm_concat(fileuploadname) from tbl_file_content where menuid = n.f_file  ) as f_fileuploadname ";
                sql += " from tbl_task n ";

                sql += " where " + whereString;


                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ia.Query(sql).Tables[0]);
                string message = "{\"total\":\"" + total + "\",\"rows\":" + rows + "}";


                resultDic["result"] = "true";
                resultDic["message"] = message;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("获取用户待办工作执行失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);


        }
        #endregion

        #region GetNews
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNews(string parameterJsonString, string clientInf)
        {
           


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
               
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string appcodeIdString = parameterJsonDic["appcodeIdString"].ToString();
                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());
                string pageIndexString = (parameterJsonDic["pageIndexString"].ToString());
                string pageSizeString = (parameterJsonDic["pageSizeString"].ToString());



                string whereString = " ( ','||f_groupid||',') like '%," + sysUserIdString + ",%' ";
                whereString += " and sys_delflag = '0'";
                whereString += " and f_statusid in ('2')";

                Eva.Library.Data.AccessData.IAccessData ia = commonclass.commonclass.CreateIAccessData();
                string sql = "select count(*) from tbl_task where " + whereString;
                string total = ia.GetSingle(sql).ToString();



                StringBuilder strSql = new StringBuilder();
                strSql.Append(" select * from (");
                strSql.Append(" select a.*,rownum from (");
                strSql.Append(" select sys_id,sys_lasteditusername as f_czr,substr(f_content,0,30) as f_title,f_content as f_content_dtl, f_edndate as f_date from tbl_task t where");
                strSql.Append(" " + whereString);
                strSql.Append(" ) a ");
                strSql.Append(" ) b ");
                int totalInt = int.Parse(pageSizeString);
                int fromInt = totalInt * (int.Parse(pageIndexString) - 1);
                strSql.Append(" where rownum >=" + fromInt.ToString() + " and rownum <=" + totalInt.ToString() + "");


                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ia.Query(strSql.ToString()).Tables[0]);
                string message = "{\"total\":\"" + total + "\",\"rows\":" + rows + "}";


                resultDic["result"] = "true";
                resultDic["message"] = message;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("获取用户待办工作执行失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }
        #endregion

        #region GetSupport
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSupport(string parameterJsonString, string clientInf)
        {
           

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string appcodeIdString = parameterJsonDic["appcodeIdString"].ToString();
                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());

                Eva.Library.Data.AccessData.IAccessData ia = commonclass.commonclass.CreateIAccessData();

                string whereString = " ( ','||f_groupid||',') like '%," + sysUserIdString + ",%' ";
                whereString += "and sys_delflag = '0'";


                string sql = "select count(*) from tbl_resource where" + whereString;
                string total = ia.GetSingle(sql).ToString();

                sql = "";
                sql += "  select sys_id,f_title";

                sql += " from tbl_resource n where " + whereString;


                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ia.Query(sql).Tables[0]);
                string message = "{\"total\":\"" + total + "\",\"rows\":" + rows + "}";


                resultDic["result"] = "true";
                resultDic["message"] = message;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("获取用户待办工作执行失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSupportContent(string parameterJsonString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string supportid = parameterJsonDic["supportid"].ToString();


                Eva.Library.Data.AccessData.IAccessData ia = commonclass.commonclass.CreateIAccessData();

                string whereString = " sys_id = '" + supportid + "'";


                string sql = "select count(*) from tbl_resource where" + whereString;
                string total = ia.GetSingle(sql).ToString();

                
                sql = "";
                sql += "  select f_content as f_content_dtl,";
                sql += "  sys_creatusername as f_czr,";
                sql += " (select wm_concat(filerealname) from tbl_file_content where menuid = n.f_file ) as f_filerealname, ";
                sql += " (select wm_concat(fileuploadname) from tbl_file_content where menuid = n.f_file  ) as f_fileuploadname ";
                sql += " from tbl_resource n where " + whereString;


                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ia.Query(sql).Tables[0]);
                string message = "{\"total\":\"" + total + "\",\"rows\":" + rows + "}";


                resultDic["result"] = "true";
                resultDic["message"] = message;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("获取用户待办工作执行失败，异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);


            //string resultString = "{\"result\":\"true\",\"message\":\"{\\\"total\\\":\\\"1\\\",\\\"rows\\\":[{\\\"sys_id\\\":\\\"137\\\",\\\"f_appcode\\\":\\\"征转V2\\\",\\\"f_title\\\":\\\"帮助标题\\\",\\\"f_content\\\":\\\"4575\\\",\\\"f_content_dtl\\\":\\\"<p>帮助内容</p><h1><span style=\\\\\\\"font-weight: bold;\\\\\\\">帮助内容</span></h1>\\\",\\\"f_file\\\":\\\"\\\",\\\"f_act_startdate\\\":\\\"2017/3/21 13:31:22\\\"}]}\"}";
            //return resultString;
        }
        #endregion
    }
}
