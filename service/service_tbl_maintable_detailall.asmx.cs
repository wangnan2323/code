using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_tbl_maintable_detailall 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class service_tbl_maintable_detailall : System.Web.Services.WebService
    {
        #region 变量属性
        private sara.dd.ldsw.commonclass.handleitemclass _hic;
        private sara.dd.ldsw.commonclass.commonclass _cc;
        //private sara.dd.ldsw.commonclass.mapclass _mc;
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private sara.dd.ldsw.model.userinfo _userInfoModel;
        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable;
        private sara.dd.ldsw.idal.Itbl_maintable _idal_tbl_maintable;

        #endregion
        #region 公有方法
        /// <summary>
        /// 获取栅格
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProjectClassDtlTableName(string parameterJsonString, string clientInf)
        {
            
            #region demo
            /*
 string jsonString=@"[
                        {
                            nodeId: 'tbl_maintable_detail',
                            nodeName: '项目基本信息',
                            isShow: true,
                            isSelected: false,
                            isLoaded: false,
                            nodeUrl: '../tbl_maintable/tbl_maintable_detail_part.html',
                            nodeParam: '_pr_tbl_maintable_detail_sys_id=[_pr_tbl_maintable_sys_id]^_pr_pagetype_tbl_maintable_detail=[_pr_pagetype_tbl_maintable_detailall]',
                            nodeInitFunction: 'init_tbl_maintable_detail',
                            childNodes: []

                        },
                        {
                            nodeId: 'hr_2',
                            nodeName: '基础程序',
                            isShow: true,
                            isSelected: true,
                            isLoaded: false,
                            nodeUrl: '',
                            childNodes: [
                                {
                                    nodeId: 'tbl_codefactory_list',
                                    nodeName: 'list-detail',
                                    isShow: true,
                                    isSelected: true,
                                    isLoaded: false,
                                    nodeUrl: '../tbl_codefactory/tbl_codefactory_list_part.html',
                                    nodeParam: '_pr_listtype_tbl_codefactory_list=[_pr_pagetype_tbl_maintable_detailall]',
                                    nodeInitFunction: 'init_tbl_codefactory_list'
                                },
                                {
                                    nodeId: 'tbl_codefactory_modallist',
                                    nodeName: 'modallist',
                                    isShow: true,
                                    isSelected: false,
                                    isLoaded: false,
                                    nodeUrl: '../tbl_codefactory/tbl_codefactory_modallist_part.html',
                                    nodeParam: '_pr_listtype_tbl_codefactory_modallist=[_pr_pagetype_tbl_maintable_detailall]',
                                    nodeInitFunction: 'init_tbl_codefactory_modallist'
                                }
                            ]
                        },
                        {
                            nodeId: 'hr_3',
                            nodeName: '混合程序',
                            isShow: true,
                            isSelected: false,
                            isLoaded: false,
                            nodeUrl: '',
                            childNodes: [
                                {
                                    nodeId: 'tbl_fhd_detail',
                                    nodeName: 'detail-modallist',
                                    isShow: true,
                                    isSelected: true,
                                    isLoaded: false,
                                    nodeUrl: '../tbl_fhd/tbl_fhd_detail_part.html',
                                    nodeParam: '_pr_pagetype_tbl_fhd=[_pr_pagetype_tbl_maintable_detailall]^_pr_tbl_fhd_sys_id=100',
                                    nodeInitFunction: 'init_tbl_fhd_detail'
                                }
                            ]
                        }
                    ]";
*/

            #endregion

            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            _iAccessData = commonclass.commonclass.CreateIAccessData();
            #endregion

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();

                string workItemIdString = parameterJsonDic["workItemIdString"].ToString();
                string processDefIdString = parameterJsonDic["processDefIdString"].ToString();
                string activityDefIdString = parameterJsonDic["activityDefIdString"].ToString();
                string processInsIdString = parameterJsonDic["processInsIdString"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());


                //在此处添加代码，实现dtl1的配置对工作流中的节点起作用

                DataSet ds = new DataSet();
                bool b = true;

                //流程中的特殊栅格查询
                if (activityDefIdString != "" && processDefIdString != "" && ("," + Eva.Library.Configuration.ConfigurationManager.AppSettings["wf_showindetail_processdefids"].ToString() + ",").IndexOf("," + processDefIdString + ",") > -1)
                {
                    //根据流程定义ID反推流程构造ID
                    //[sys_appcode]1102[organid]020
                    //24011024020

                    string str_lcgzid = _cc.Getlcjdgzid(activityDefIdString);

                    string sql = "select tablenameen from t_projclass_dtl1 where projstate = '" + str_lcgzid + "' ";
                    object o_sql = _iAccessData.GetSingle(sql);
                    if (o_sql != null)
                    {
                        b = false;
                        ds = _cc.StringToDataSet(o_sql.ToString());
                    }
                }
                if (b == true)
                {
                    ds = _cc.GetTablenameen(projectClassIdString, projectClassDtl1String);
                }

                //t_projclass_dtl2.tablenameen
                string str_xmlx_sql_2 = "select tablenameen from t_projclass_dtl2 where projclassid = '" + projectClassIdString + "' and projstate = '" + projectClassDtl2String + "'";
                string str_xmlx_tablename_2 = _iAccessData.GetSingle(str_xmlx_sql_2).ToString();

                //栅格解析
                DataTable dt = ds.Tables[0].Clone();
                string[] values = str_xmlx_tablename_2.Split(',');
                string result = "";
                _userInfoModel = sara.dd.ldsw.commonclass.webserviceadapter.GetUserInfoModel(sysUserIdString, userInfoJsonString);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    result = "";
                    result = IsContent((ds.Tables[0].Rows[i]["value"].ToString()), values);
                    if (result != "")
                    {
                        DataRow dr = dt.NewRow();
                        dr["num"] = ds.Tables[0].Rows[i]["num"].ToString();
                        dr["name"] = ds.Tables[0].Rows[i]["name"].ToString();
                        dr["value"] = result;
                        dt.Rows.Add(dr);
                    }
                }
                ds = new DataSet();
                ds.Tables.Add(dt);

                //解析表格
                string jsonResult = "[";
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    jsonResult += @"{
                            nodeId: 'rt_" + i.ToString() + @"',
                            nodeName: '" + ds.Tables[0].Rows[i]["name"].ToString() + @"',
                            isShow: " + IsContent_jian(ds.Tables[0].Rows[i]["num"].ToString()) + @",
                            isSelected: " + IsContent_jia(ds.Tables[0].Rows[i]["num"].ToString()) + @",
                            isLoaded: false,
                            nodeUrl: '',
                            childNodes: [" + GetChildNodes(ds.Tables[0].Rows[i]["value"].ToString()) + @"]
                            },";
                }
                jsonResult = jsonResult.TrimEnd(',') + "]";

                string jsonString = jsonResult;


                resultDic["result"] = "true";
                resultDic["message"] = (jsonString.Replace("\r", "").Replace("\n", ""));
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 初始化按钮
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProjectClassDtlButton(string parameterJsonString, string clientInf)
        {
            #region demo
            //buttonCss:success//warning//danger//primary//info//magenta
            //buttonShowType:list/detail/all/null

            //<type>button</type>
            //<tip>新建</tip>
            //            string jsonString = @"
            //            [
            //                {
            //                    buttonId: 'btn_command_new_tbl_maintable_button',
            //                    buttonCss: 'success',
            //                    buttonText: '新建',                  
            //                    buttonConfirmContent: '',
            //                    buttonInputTitle: '',
            //                    buttonInputArgs:'',
            //                    buttonShowType: 'list',
            //                    buttonIsDisable: false,
            //                    buttonRemark: '',  
            //                    buttonServerEventArgs: '',
            //                    buttonClientEventArgs: 'btn_command_tbl_maintable_list_new(callBackFunction)'
            //
            //
            //                }, 
            //                {
            //                    buttonId: 'btn_command_send_tbl_maintable_button',
            //                    buttonCss: 'primary',
            //                    buttonText: '转件',                  
            //                    buttonConfirmContent: '',
            //                    buttonInputTitle: '审核意见',
            //                    buttonInputArgs:'',
            //                    buttonShowType: 'all',
            //                    buttonIsDisable: false,
            //                    buttonRemark: '',  
            //                    buttonServerEventArgs: '转件',
            //                    buttonClientEventArgs: 'btn_command_tbl_maintable_button_complete(callBackFunction)'
            //
            //
            //                }, 
            //                {
            //                    buttonId: 'btn_command_sendback_tbl_maintable_button',
            //                    buttonCss: 'danger',
            //                    buttonText: '退回',                 
            //                    buttonConfirmContent: '',
            //                    buttonInputTitle: '退回意见',
            //                    buttonInputArgs:'GetNextUsersString',
            //                    buttonShowType: 'all',
            //                    buttonIsDisable: false,
            //                    buttonRemark: '',  
            //                    buttonServerEventArgs: '退回',
            //                    buttonClientEventArgs: ''
            //                }, 
            //                {
            //                    buttonId: 'btn_command_workflow_tbl_maintable_button',
            //                    buttonCss: 'warning',
            //                    buttonText: '审批',                  
            //                    buttonConfirmContent: '',
            //                    buttonInputTitle: '',
            //                    buttonInputArgs:'',
            //                    buttonShowType: 'all',
            //                    buttonIsDisable: false,
            //                    buttonRemark: '',  
            //                    buttonServerEventArgs: '审批',
            //                    buttonClientEventArgs: 'btn_command_tbl_maintable_button_complete(callBackFunction)'
            //                }, 
            //                {
            //                    buttonId: 'btn_command_delete_tbl_maintable_button',
            //                    buttonCss: 'danger',
            //                    buttonText: '删除',                  
            //                    buttonConfirmContent: '请再次确认删除当前数据',
            //                    buttonInputTitle: '',
            //                    buttonInputArgs:'',
            //                    buttonShowType: 'all',
            //                    buttonIsDisable: false,
            //                    buttonRemark: '',  
            //                    buttonServerEventArgs: '删除',
            //                    buttonClientEventArgs: 'btn_command_tbl_maintable_button_complete(callBackFunction)'
            //                }
            //            ]";

            #endregion


            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            #endregion


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();

                string workItemIdString = parameterJsonDic["workItemIdString"].ToString();
                string processDefIdString = parameterJsonDic["processDefIdString"].ToString();
                string activityDefIdString = parameterJsonDic["activityDefIdString"].ToString();
                string processInsIdString = parameterJsonDic["processInsIdString"].ToString();

                DataSet ds_behave = _cc.GetBehave(projectClassIdString, projectClassDtl1String);

                if (ds_behave.Tables.Count > 0)
                {
                StringBuilder sb = new StringBuilder();
                sb.Append("[");
                StringBuilder content = new StringBuilder();
                for (int i = 0; i < ds_behave.Tables[0].Rows.Count; i++)
                {
                    content.Append("{");
                    content.Append("buttonId: '" + ds_behave.Tables[0].Rows[i]["buttonId"].ToString() + "',");
                    content.Append("buttonCss: '" + ds_behave.Tables[0].Rows[i]["buttonCss"].ToString() + "',");
                    content.Append("buttonText: '" + ds_behave.Tables[0].Rows[i]["buttonText"].ToString() + "',");
                    content.Append("buttonIsMustData: '" + ds_behave.Tables[0].Rows[i]["buttonIsMustData"].ToString() + "',");
                    content.Append("tip: '" + ds_behave.Tables[0].Rows[i]["tip"].ToString() + "',");
                    content.Append("buttonConfirmContent: '" + ds_behave.Tables[0].Rows[i]["buttonConfirmContent"].ToString() + "',");
                    content.Append("buttonInputTitle: '" + ds_behave.Tables[0].Rows[i]["buttonInputTitle"].ToString() + "',");
                    content.Append("buttonInputArgs: '" + ds_behave.Tables[0].Rows[i]["buttonInputArgs"].ToString() + "',");
                    content.Append("buttonShowType: '" + ds_behave.Tables[0].Rows[i]["buttonShowType"].ToString() + "',");
                    content.Append("buttonIsDisable: " + ds_behave.Tables[0].Rows[i]["buttonIsDisable"].ToString() + ",");
                    content.Append("buttonRemark: '" + ds_behave.Tables[0].Rows[i]["buttonRemark"].ToString() + "',");
                    content.Append("buttonServerEventArgs: '" + ds_behave.Tables[0].Rows[i]["buttonServerEventArgs"].ToString() + "',");
                    content.Append("buttonClientEventArgs: '" + ds_behave.Tables[0].Rows[i]["buttonClientEventArgs"].ToString() + "'");
                    content.Append("},");
                }
                sb.Append(content.ToString().TrimEnd(','));
                sb.Append("]");

                resultDic["result"] = "true";
                resultDic["message"] = (sb.ToString().Replace("\r", "").Replace("\n", ""));//jsonString
            }
                else
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = "[]";
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 获取下一个状态用户
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNextUsersString(string parameterJsonString, string clientInf)
        {

            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();//new sara.dd.ldsw.dal.tbl_maintable();
            #endregion


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();
                string buttonServerEventArgs = parameterJsonDic["buttonServerEventArgs"].ToString();

                string facterId = buttonServerEventArgs.Split('|')[2];

                DataSet ds_facter = _cc.GetFacter(projectClassIdString, projectClassDtl1String);

                _model_tbl_maintable = _idal_tbl_maintable.GetList(" sys_id='" + mainTableSysidString + "'", "", "*", "", "", null)[0];


                NameValueCollection nvc_parameters = new NameValueCollection();
                nvc_parameters.Add("sys_id", mainTableSysidString);
                string str_nextstate = _cc.GetNewProjStateByFacterid(nvc_parameters, facterId, ds_facter);

                DataSet ds = _cc.GetNextUser(projectClassIdString, str_nextstate, projectClassDtl2String, _model_tbl_maintable.xzqyid);

                StringBuilder resultString = new StringBuilder();
                resultString.Append("{");
                resultString.Append("\"nextuser\":");
                resultString.Append("[");
                string users = "";
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    users += "{\"id\":\"" + ds.Tables[0].Rows[i]["U_ID"].ToString() + "\",\"text\":\"" + ds.Tables[0].Rows[i]["U_NAME"].ToString() + "\"},";
                }
                //resultString.Append("{\"id\":\"3\",\"text\":\"天津市\"},");
                //resultString.Append("{\"id\":\"8\",\"text\":\"宁和\"}");
                resultString.Append(users.TrimEnd(','));
                resultString.Append("]}");


                resultDic["result"] = "true";
                resultDic["message"] = resultString.ToString();
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }

        /// <summary>
        /// 按钮事件
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoButtonServerEventArgs(string parameterJsonString, string clientInf)
        {

            #region MyRegion
            /*
            switch (buttonIdString + "_" + eventArgsString)
            {
                case "btn_command_send_tbl_maintable_button_转件":
                    {
                        resultDic["result"] = "false";
                        resultDic["message"] = ("输出信息的例子<br/>result必须等于false<br/>");
                    }
                    break;
                case "btn_command_sendback_tbl_maintable_button_退回":
                    {
                        resultDic["result"] = "true";//按钮栅格中没有配置client事件，可以在message中配置
                        resultDic["message"] = ("btn_command_tbl_maintable_button_complete(callBackFunction)");
                    }
                    break;
                case "btn_command_workflow_tbl_maintable_button_审批":
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                    }
                    break;
                case "btn_command_delete_tbl_maintable_button_删除":
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                    }
                    break;
                default:
                    {
                        resultDic["result"] = "true";
                        resultDic["message"] = "";
                        resultDic["result"] = "true";//按钮栅格中没有配置client事件，可以在message中配置
                        resultDic["message"] = ("btn_command_tbl_maintable_button_complete(callBackFunction)");
                        resultDic["result"] = "false";
                        resultDic["message"] = ("输出信息的例子<br/>result必须等于false<br/>");
                    }
                    break;
            }
            **/

            #endregion


            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
            #endregion


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                #region init
                string control_result = "";
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();
                string buttonIdString = parameterJsonDic["buttonIdString"].ToString();
                string eventArgsString = parameterJsonDic["eventArgsString"].ToString();
                string InputContentString = parameterJsonDic["InputContentString"].ToString();

                string workItemIdString = parameterJsonDic["workItemIdString"].ToString();
                string processDefIdString = parameterJsonDic["processDefIdString"].ToString();
                string activityDefIdString = parameterJsonDic["activityDefIdString"].ToString();
                string processInsIdString = parameterJsonDic["processInsIdString"].ToString();


                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());


                string validateFunction = eventArgsString.Split('|')[0].Replace(" ", "");
                string doFunction = eventArgsString.Split('|')[1].Replace(" ", "");
                string facterid = eventArgsString.Split('|')[2].Replace(" ", "");

                string message = InputContentString.Split('^')[0];
                string selectuserid = InputContentString.Split('^')[1];
                string selectusername = InputContentString.Split('^')[2];

                DataSet ds_facter = _cc.GetFacter(projectClassIdString, projectClassDtl1String);
                #endregion

                #region validate
                if (control_result == "")
                {
                    control_result = GetValidateResult(validateFunction, mainTableSysidString, clientInf);
                }
                if (control_result != "")
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = (control_result);
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }
                #endregion

                #region 判断当前状态是否正确
                sara.dd.ldsw.idal.Itbl_maintable idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();//new sara.dd.ldsw.dal.tbl_maintable();
                sara.dd.ldsw.model.tbl_maintable model_tbl_maintable = idal_tbl_maintable.GetList("sys_id='" + mainTableSysidString + "'", "", "*", "", "", null)[0];
                if (_cc.GetProjStateReal(projectClassDtl1String) != _cc.GetProjStateReal(model_tbl_maintable.sys_projectclassdtl1))
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = ("此件已转走，请重新登录！");
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }
                #endregion

                #region click

                #region businesscode
                if (selectuserid != "")
                {
                    _model_tbl_maintable = _idal_tbl_maintable.GetList(" sys_id ='" + mainTableSysidString + "'", "", "*", "", "", null)[0];
                    _model_tbl_maintable.value1 = selectuserid;
                    _idal_tbl_maintable.Update(_model_tbl_maintable, "value1", null);
                }
                #endregion
                string str_resultmessage = "";
                control_result = GetContentResult(doFunction, mainTableSysidString, facterid, ds_facter, message, buttonIdString, projectClassIdString, projectClassDtl1String, projectClassDtl2String, clientInf, ref str_resultmessage, workItemIdString, userInfoJsonString);
                if (control_result == "")
                {
                    resultDic["result"] = "true";
                    resultDic["message"] = (str_resultmessage);
                }
                else
                {
                    //业务性代码
                    switch (buttonIdString)
                    {
                        case "btn_command_send_tbl_maintable_button_1_4":

                            resultDic["result"] = "true";
                            resultDic["message"] = (control_result);
                            break;
                        default:
                            resultDic["result"] = "false";
                            resultDic["message"] = (control_result);
                            break;
                    }
                }
                #endregion

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 根据visibility拼接 项目可见性sql
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoStartWorkflow(string parameterJsonString, string clientInf)
        {

            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
            #endregion

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);
                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();
                string buttonIdString = parameterJsonDic["buttonIdString"].ToString();
                string eventArgsString = parameterJsonDic["eventArgsString"].ToString();
                string processdefidString = parameterJsonDic["processdefidString"].ToString();
                string czrIdString = parameterJsonDic["czrIdString"].ToString();
                string czrNameString = parameterJsonDic["czrNameString"].ToString();
                string shyjString = parameterJsonDic["shyjString"].ToString();

                #region 判断当前状态是否正确
                sara.dd.ldsw.idal.Itbl_maintable idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
                sara.dd.ldsw.model.tbl_maintable model_tbl_maintable = idal_tbl_maintable.GetList("sys_id='" + mainTableSysidString + "'", "", "*", "", "", null)[0];
                if (_cc.GetProjStateReal(projectClassDtl1String) != _cc.GetProjStateReal(model_tbl_maintable.sys_projectclassdtl1))
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = ("此件已转走，请重新登录！");
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }
                #endregion
                DataSet userOperationDataSet = new DataSet();
                userOperationDataSet.Tables.Add(Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(parameterJsonDic["userOperationString"].ToString()));
                for (int i = 0; i < userOperationDataSet.Tables[0].Rows.Count; i++)
                {
                    userOperationDataSet.Tables[0].Rows[i]["userids"] = (userOperationDataSet.Tables[0].Rows[i]["userids"].ToString());
                    userOperationDataSet.Tables[0].Rows[i]["usernames"] = (userOperationDataSet.Tables[0].Rows[i]["usernames"].ToString());
                }
                _cc = new sara.dd.ldsw.commonclass.commonclass();

                //string validateFunction = "";//eventArgsString.Split('|')[0].Replace(" ", "");
                //string doFunction = "";// eventArgsString.Split('|')[1].Replace(" ", "");
                string facterid = eventArgsString.Split('|')[2].Replace(" ", "");

                DataSet ds_facter = _cc.GetFacter(projectClassIdString, projectClassDtl1String);

                //转状态
                sara.dd.ldsw.commonclass.assemblyfunction af = new sara.dd.ldsw.commonclass.assemblyfunction();

                //下一个节点的用户名称
                string nextusernames = _cc.GetNextUserNamesByUserOperationDataSet(userOperationDataSet);

                Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = commonclass.commonclass.CreateIAccessDataTrans();
                try
                {
                    t.getTrans().begin();

                    string result = af.set_startworkflow(mainTableSysidString, "", nextusernames, ds_facter, shyjString, processdefidString, facterid, clientInf, t);

                    if (result != "")
                    {
                        throw new Exception(result);
                    }

                    Eva.Library.ServiceAdapter.IAdapter.IWorkFlow w = Eva.Library.ServiceAdapter.AdapterFactory.WorkFlowFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                    string businessparameter = mainTableSysidString;

                    //此处应该是maintable的ID，在新的程序结构中取消t_workflow的设置，也就是说，一个流程实例只能针对一条业务数据。
                    string operationResultString = "";
                    if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                    {
                        operationResultString = sara.platform.service.workflow.Service.StartWorkFlowToNextStep(businessparameter, processdefidString, czrIdString, czrNameString, DateTime.Now, shyjString, userOperationDataSet);
                    }
                    else
                    {
                        operationResultString = w.StartWorkFlowToNextStep(businessparameter, processdefidString, czrIdString, czrNameString, DateTime.Now, shyjString, userOperationDataSet);
                    }
                    string errormessage = "";
                    //[-1:启动流程失败] [-2:没有找到workitem] [-3:没有找到当前创建流程的workitem] [-4:没有找到workitem对应的操作] [-5:没有找到开始流程连接线]
                    switch (operationResultString)
                    {
                        case "-1":
                            errormessage = "启动流程失败";
                            break;
                        case "-2":
                            errormessage = "没有找到workitem";
                            break;
                        case "-3":
                            errormessage = "没有找到当前创建流程的workitem";
                            break;
                        case "-4":
                            errormessage = "没有找到workitem对应的操作";
                            break;
                        case "-5":
                            errormessage = "没有找到开始流程连接线";
                            break;
                    }

                    if (errormessage != "")
                    {
                        throw new Exception(errormessage);
                    }

                    try
                    {
                        string sys_processinsid = operationResultString.Split(';')[0];
                        string jdname = operationResultString.Split(';')[1];
                        //更新tbl_maintable中的工作流ID
                        t.ExecuteSql(" update tbl_maintable set sys_processinsid ='" + sys_processinsid + "' where sys_id='" + mainTableSysidString + "'");

                        t.ExecuteSql(" update t_projstate_log set processsinsid = '" + sys_processinsid + "' where sys_flag = '1' and businessid = '" + mainTableSysidString + "'");

                    }
                    catch//(Exception ex)
                    {

                    }

                    t.getTrans().commit();
                }
                catch (Exception ex)
                {
                    t.getTrans().rollback();
                    throw ex;
                }

                //流程启动成功返回：“79548;经办人起件”流程实例ID和实例名称
                //应该把内容回写到tblmaintable和log中
                //转maintable的状态
                //这个地方想一想怎么写得比较牢固一点，因为有可能流程转件成功，但是转状态失败了。。。。这个讨论一下吧
                //在此处完成业务操作。。。

                resultDic["result"] = "true";
                resultDic["message"] = "";
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoSendWorkflow(string parameterJsonString, string clientInf)
        {

            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
            #endregion

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);
                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();
                string buttonIdString = parameterJsonDic["buttonIdString"].ToString();
                string eventArgsString = parameterJsonDic["eventArgsString"].ToString();

                string workItemIdString = parameterJsonDic["workItemIdString"].ToString();
                string processDefIdString = parameterJsonDic["processDefIdString"].ToString();
                string activityDefIdString = parameterJsonDic["activityDefIdString"].ToString();
                string processInsIdString = parameterJsonDic["processInsIdString"].ToString();


                string czrIdString = parameterJsonDic["czrIdString"].ToString();
                string czrNameString = parameterJsonDic["czrNameString"].ToString();
                string shyjString = parameterJsonDic["shyjString"].ToString();
                string workflowOverString = parameterJsonDic["workflowOverString"].ToString();//0：流程未结束；1：正常结束；2：驳回
                #region 判断当前状态是否正确

                sara.dd.ldsw.idal.Itbl_maintable idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
                sara.dd.ldsw.model.tbl_maintable model_tbl_maintable = idal_tbl_maintable.GetList("sys_id='" + mainTableSysidString + "'", "", "*", "", "", null)[0];
                if (_cc.GetProjStateReal(projectClassDtl1String) != _cc.GetProjStateReal(model_tbl_maintable.sys_projectclassdtl1))
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = ("此件已转走，请重新登录！");
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }
                Eva.Library.ServiceAdapter.IAdapter.IWorkFlow iw = Eva.Library.ServiceAdapter.AdapterFactory.WorkFlowFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                DataTable dt = null;
                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                {
                    dt = sara.platform.service.workflow.Service.GetWorkItemByProcessDef(czrIdString, DateTime.Now, processDefIdString);
                }
                else
                {
                    dt = iw.GetWorkItemByProcessDef(czrIdString, DateTime.Now, processDefIdString);
                }
                DataRow[] drs = dt.Select("SL_LC_ID='" + processInsIdString + "'");
                if (drs.Length <= 0)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = ("此件已转走，请重新登录！");
                    return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
                }
                #endregion
                DataSet userOperationDataSet = new DataSet();
                userOperationDataSet.Tables.Add(Eva.Library.Format.FormatEntityTool.FormatJsonToDataTable(parameterJsonDic["userOperationString"].ToString()));
                for (int i = 0; i < userOperationDataSet.Tables[0].Rows.Count; i++)
                {
                    userOperationDataSet.Tables[0].Rows[i]["userids"] = (userOperationDataSet.Tables[0].Rows[i]["userids"].ToString());
                    userOperationDataSet.Tables[0].Rows[i]["usernames"] = (userOperationDataSet.Tables[0].Rows[i]["usernames"].ToString());
                }
                string facterid = "";
                _cc = new sara.dd.ldsw.commonclass.commonclass();

                DataSet ds_facter = _cc.GetFacter(projectClassIdString, projectClassDtl1String);
                sara.dd.ldsw.commonclass.assemblyfunction af = new sara.dd.ldsw.commonclass.assemblyfunction();

                Eva.Library.Data.AccessDataTrans.IAccessDataTrans t;

                Eva.Library.ServiceAdapter.IAdapter.IWorkFlow w = Eva.Library.ServiceAdapter.AdapterFactory.WorkFlowFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);
                //-1：操作失败；0:流程正常结束;1:流程驳回结束;2自流程结束;正常: 返回当前节点的名字
                string operationResultString = "";
                switch (workflowOverString)
                {
                    case "0"://流程未结束
                        #region MyRegion
                        {
                            t = commonclass.commonclass.CreateIAccessDataTrans();
                            try
                            {
                                t.getTrans().begin();
                                _cc.NewLog(mainTableSysidString, projectClassIdString, projectClassDtl1String, projectClassDtl1String, processInsIdString, shyjString, processDefIdString, activityDefIdString, clientInf, t);
                                string nextusernames = _cc.GetNextUserNamesByUserOperationDataSet(userOperationDataSet);

                                nextusernames = GetAllNextUsernames(mainTableSysidString, nextusernames, clientInf, t);

                                //t.ExecuteSql(" update tbl_maintable set sys_processnextuser ='" + (nextusernames) + "' where sys_id='" + mainTableSysidString + "'");
                                //2016-01-13-添加设置sys_first='0'的方法，实现在工作流转件时，也可以让下一个用户呈现未操作过的状态。
                                t.ExecuteSql(" update tbl_maintable set sys_first = '0', sys_processnextuser ='" + (nextusernames) + "' where sys_id='" + mainTableSysidString + "'");
                                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                                {
                                    operationResultString = sara.platform.service.workflow.Service.DriveActivityIns(workItemIdString, userOperationDataSet, czrIdString, czrNameString, System.DateTime.Now, shyjString);
                                }
                                else
                                {
                                    operationResultString = w.DriveActivityIns(workItemIdString, userOperationDataSet, czrIdString, czrNameString, System.DateTime.Now, shyjString);
                                }
                                if (operationResultString == "-1")
                            {
                                    throw new Exception("流程流转失败!");
                            }

                                t.getTrans().commit();
                            }
                            catch (Exception ex)
                            {
                                t.getTrans().rollback();
                                throw ex;
                            }

                        }
                        #endregion
                        break;
                    case "1"://正常结束
                        #region MyRegion
                        {
                            facterid = "0";
                            t = commonclass.commonclass.CreateIAccessDataTrans();

                            try
                            {
                                t.getTrans().begin();
                                string result = af.set_doworkflow(mainTableSysidString, facterid, ds_facter, shyjString, processInsIdString, projectClassIdString, projectClassDtl1String, processDefIdString, activityDefIdString, clientInf, t);

                                if (result != "")
                                {
                                    throw new Exception(result);
                                }
                                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                                {
                                    operationResultString = sara.platform.service.workflow.Service.DriveActivityIns(workItemIdString, userOperationDataSet, czrIdString, czrNameString, System.DateTime.Now, shyjString);
                                }
                                else
                                {
                                    operationResultString = w.DriveActivityIns(workItemIdString, userOperationDataSet, czrIdString, czrNameString, System.DateTime.Now, shyjString);
                                }
                                if (operationResultString == "-1")
                                {
                                    throw new Exception("流程结束失败!");
                                }
                                else
                                {
                                try
                                {
                                    //更新tbl_maintable中的工作流ID
                                    t.ExecuteSql(" update tbl_maintable set sys_processinsid ='' where sys_id='" + mainTableSysidString + "'");

                                }
                                catch//(Exception ex)
                                {

                                }
                                }
                                t.getTrans().commit();
                            }
                            catch (Exception ex)
                            {
                                t.getTrans().rollback();
                                throw ex;
                            }

                        }
                        #endregion
                        break;
                    case "2"://驳回
                        #region MyRegion
                        {
                            facterid = "1";
                            t = commonclass.commonclass.CreateIAccessDataTrans();
                           
                            try
                            {
                                t.getTrans().begin();
                                string result = af.set_doworkflowbak(mainTableSysidString, facterid, ds_facter, shyjString, processInsIdString, projectClassIdString, projectClassDtl1String, processDefIdString, activityDefIdString, clientInf, t);

                                if (result != "")
                                {
                                    throw new Exception(result);
                                }
                                if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
                                {
                                    operationResultString = sara.platform.service.workflow.Service.DriveActivityIns(workItemIdString, userOperationDataSet, czrIdString, czrNameString, System.DateTime.Now, shyjString);
                                }
                                else
                                {
                                    operationResultString = w.DriveActivityIns(workItemIdString, userOperationDataSet, czrIdString, czrNameString, System.DateTime.Now, shyjString);
                                }

                                if (operationResultString == "-1")
                                {
                                    throw new Exception("流程驳回失败!");
                                }
                                else
                                {
                                try
                                {
                                    //更新tbl_maintable中的工作流ID
                                    t.ExecuteSql(" update tbl_maintable set sys_processinsid ='' where sys_id='" + mainTableSysidString + "'");

                                }
                                catch//(Exception ex)
                                {

                                    }
                                }

                                t.getTrans().commit();
                            }
                            catch (Exception ex)
                            {
                                t.getTrans().rollback();
                                throw ex;
                            }
                        }
                        #endregion
                        break;
                }

                resultDic["result"] = "true";
                resultDic["message"] = "";
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 获取查询条件
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetMainTableQueryString(string parameterJsonString, string clientInf)
        {

            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            #endregion


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());

                DataSet ds_visibility = _cc.GetVisibility(projectClassIdString, projectClassDtl1String);
                _userInfoModel = sara.dd.ldsw.commonclass.webserviceadapter.GetUserInfoModel(sysUserIdString, userInfoJsonString);
                string resql = _cc.GetMainTableQueryString(projectClassIdString, projectClassDtl1String, projectClassDtl2String, ds_visibility, _userInfoModel);

                resultDic["result"] = "true";
                resultDic["message"] = (resql);
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 获取用户拥有的行政区域
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetXzqyIdTextString(string parameterJsonString, string clientInf)
        {

            #region 初始化
            _cc = new sara.dd.ldsw.commonclass.commonclass();
            #endregion

            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {

                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();
                string userInfoJsonString = (parameterJsonDic["userInfoJsonString"].ToString());

                DataSet ds = _cc.GetMainTableXZQY(sysUserIdString, userInfoJsonString);

                StringBuilder resultString = new StringBuilder();
                resultString.Append("{");
                resultString.Append("\"xzqy\":");
                resultString.Append("[");
                string content = "";
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    content += "{\"id\":\"" + ds.Tables[0].Rows[i]["NodeValue"].ToString() + "\",\"text\":\"" + ds.Tables[0].Rows[i]["NodeName"].ToString() + "\"},";
                }
                //resultString.Append("{\"id\":\"3\",\"text\":\"天津市\"},");
                //resultString.Append("{\"id\":\"8\",\"text\":\"宁和\"}");
                resultString.Append(content.TrimEnd(','));
                resultString.Append("]}");

                resultDic["result"] = "true";
                resultDic["message"] = resultString.ToString();
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 创建业务表数据
        /// </summary>
        /// <param name="parameterJsonString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CreatItem(string parameterJsonString, string clientInf)
        {

            #region 初始化
            _hic = new sara.dd.ldsw.commonclass.handleitemclass();
            #endregion


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string sysUserIdString = parameterJsonDic["sysUserIdString"].ToString();
                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                string projectClassIdString = parameterJsonDic["projectClassIdString"].ToString();
                string projectClassDtl1String = parameterJsonDic["projectClassDtl1String"].ToString();
                string projectClassDtl2String = parameterJsonDic["projectClassDtl2String"].ToString();

                string result = _hic.GenerateItem(mainTableSysidString, clientInf);

                if (result == "")
                {
                    sara.dd.ldsw.idal.Itbl_maintable idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
                    sara.dd.ldsw.model.tbl_maintable model_tbl_maintable = idal_tbl_maintable.GetList("sys_id='" + mainTableSysidString + "'", "", "*", "", "", null)[0];
                    result = model_tbl_maintable.sys_id.ToString() + "^" + model_tbl_maintable.sys_projectclassid + "^" + model_tbl_maintable.sys_projectclassdtl1 + "^" + model_tbl_maintable.sys_projectclassdtl2;
                    resultDic["result"] = "true";
                    resultDic["message"] = (result);
                }
                else
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = (result);
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
                NewLog("异常信息：" + Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace), "message_error", clientInf);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }




        /// <summary>
        /// 
        /// </summary>
        /// <param name="resultString"></param>
        /// <param name="tbl_maintable_sys_ids"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpDataSysFirst(string parameterJsonString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<string, string> parameterJsonDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(parameterJsonString);

                string mainTableSysidString = parameterJsonDic["mainTableSysidString"].ToString();
                
                sara.dd.ldsw.idal.Itbl_maintable idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
                sara.dd.ldsw.model.tbl_maintable model_tbl_maintable = idal_tbl_maintable.GetList("sys_id='" + mainTableSysidString + "'", "", "*", "", "", null)[0];
                model_tbl_maintable.sys_first = "1";//操作过
                idal_tbl_maintable.Update(model_tbl_maintable, "sys_first", null);

                resultDic["result"] = "true";
                resultDic["message"] = "";

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }




        /// <summary>
        /// 生成日志
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
        /// content中是否包括values中的值
        /// </summary>
        /// <param name="content"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        private string IsContent(string content_in, string[] values)
        {
            string result = "";
            string[] contents = content_in.Replace(" ", "").Replace("\r\n", "").Split(',');
            List<string> fieldnames = new List<string>();
            if (_userInfoModel.sys_fieldnames != "")
            {
                fieldnames = _userInfoModel.sys_fieldnames.Split('^').ToList();
            }
            
            foreach (string content in contents)
            {
                string tablename = content.Split(':')[0].Replace("-", "").Replace("+", "");
                bool b = false;
                foreach (string value in values)
                {
                    if (tablename == value)
                    {
                        //根据userfield设置栅格
                        if (fieldnames.Count > 0)
                        {
                            for (int i = 0; i < fieldnames.Count; i++)
                            {
                                if (tablename == fieldnames[i].ToString())
                                {
                                    b = true;
                                    break;
                                }
                            }
                            if (b == true)
                            {
                                break;
                            }
                        }
                        else
                        {
                            b = true;
                            break;
                        }

                        //b = true;
                        //break;
                    }
                }
                if (b)
                {
                    result += content + ",";
                }
            }

            if (result != "")
            {
                result = result.Substring(0, result.Length - 1);
                result = "+" + result;
            }

            return result;
        }

        /// <summary>
        /// 包含+是true
        /// </summary>
        /// <param name="isshow"></param>
        /// <returns></returns>
        private string IsContent_jia(string content)
        {
            string result = "false";
            if (content.Contains("+"))
            {
                result = "true";
            }
            return result;
        }

        /// <summary>
        /// 不包含-就是ture
        /// </summary>
        /// <param name="isshow"></param>
        /// <returns></returns>
        private string IsContent_jian(string content)
        {
            string result = "true";
            if (content.Contains("-"))
            {
                result = "false";
            }
            return result;
        }

        /// <summary>
        /// 解析子节点
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        private string GetChildNodes(string value)
        {
            StringBuilder result = new StringBuilder();
            value = value.Replace("\r", "").Replace("\n", "").Replace(" ", "");
            List<string> values = value.Split(',').ToList();
            for (int i = 0; i < values.Count; i++)
            {
                result.Append("{");
                result.Append("nodeId: '" + values[i].Split(':')[0].Replace("+", "").Replace("-", "") + "',");
                result.Append("nodeName: '" + values[i].Split(':')[1] + "',");
                result.Append("isShow: " + IsContent_jian(values[i].Substring(0, 1)) + ",");
                result.Append("isSelected: " + IsContent_jia(values[i]) + ",");
                result.Append("isLoaded: false,");
                result.Append("nodeUrl: '" + values[i].Split(':')[3].Split('?')[0] + "',");
                result.Append("nodeParam: '" + values[i].Split(':')[3].Split('?')[1] + "',");
                result.Append("nodeInitFunction: '" + values[i].Split(':')[2] + "'");
                result.Append("},");
            }
            return result.ToString().TrimEnd(',');
        }

        /// <summary>
        /// 获取验证结果
        /// </summary>
        /// <param name="isvalidate"></param>
        /// <param name="str_maintable_sys_ids"></param>
        /// <returns></returns>
        private string GetValidateResult(string isvalidate, string str_maintable_sys_ids, string clientinf)
        {
            string str_result = "";
            switch (isvalidate.ToLower())
            {
                case "true":
                    str_result = "";
                    break;
                case "false":
                    str_result = "系统设定中不允许此按钮的验证通过";
                    break;
                default:
                    string[] str = isvalidate.Split('^');
                    string str_ass_name = str[0].ToString();
                    string str_ass_classname = str[1].ToString();
                    string str_ass_functionname = str[2].ToString();
                    if (str.Length > 3)
                    {
                        string[] str_ass_functionparameters = str[3].ToString().Split('$');
                        Object[] o_ass_functionparameters = new Object[str_ass_functionparameters.Length];
                        for (int i = 0; i < str_ass_functionparameters.Length; i++)
                        {
                            switch (str_ass_functionparameters[i])
                            {
                                case "[sys_ids]":
                                    o_ass_functionparameters[i] = str_maintable_sys_ids;
                                    break;
                                case "[clientinf]":
                                    o_ass_functionparameters[i] = clientinf;
                                    break;
                                default:
                                    o_ass_functionparameters[i] = str_ass_functionparameters[i];
                                    break;
                            }
                        }
                        str_result = _cc.GetResultByParameters(str_ass_name, str_ass_classname, str_ass_functionname, o_ass_functionparameters);
                    }
                    else
                    {
                        str_result = _cc.GetResultByParameters(str_ass_name, str_ass_classname, str_ass_functionname, null);
                    }
                    break;
            }
            return str_result;
        }

        /// <summary>
        /// 跳转
        /// </summary>
        /// <param name="str_content"></param>
        /// <param name="sys_idss"></param>
        /// <param name="str_facterid"></param>
        /// <param name="ds_facter"></param>
        /// <param name="str_txt_bak_message"></param>
        /// <param name="str_name"></param>
        /// <param name="str_projxmlxid"></param>
        /// <returns></returns>
        private string GetContentResult(string str_content, string sys_idss, string str_facterid, DataSet ds_facter, string str_txt_bak_message, string str_name, string str_projectclassid, string str_projectclassdtl1, string str_projectclassdtl2, string clientInf, ref string str_resultmessage, string workitemid, string userInfoJsonString)
        {


            string[] str = str_content.Split('^');
            string str_ass_name = str[0].ToString();
            string str_ass_classname = str[1].ToString();
            string str_ass_functionname = str[2].ToString();
            string str_result = "";
            if (str.Length > 3)
            {
                string[] str_ass_functionparameters = str[3].ToString().Split('$');
                Object[] o_ass_functionparameters = new Object[str_ass_functionparameters.Length];
                int i_resultmessage = -1;
                for (int i = 0; i < str_ass_functionparameters.Length; i++)
                {
                    switch (str_ass_functionparameters[i])
                    {
                        case "[sys_ids]":
                            o_ass_functionparameters[i] = sys_idss;
                            break;
                        case "[str_facterid]":
                            o_ass_functionparameters[i] = str_facterid;
                            break;
                        case "[ds_facter]":
                            o_ass_functionparameters[i] = ds_facter;
                            break;
                        case "[str_txt_bak_message]":
                            o_ass_functionparameters[i] = str_txt_bak_message;
                            break;
                        case "[str_name]":
                            o_ass_functionparameters[i] = str_name;
                            break;
                        case "[str_projectclassid]":
                            o_ass_functionparameters[i] = str_projectclassid;
                            break;
                        case "[str_projectclassdtl1]":
                            o_ass_functionparameters[i] = str_projectclassdtl1;
                            break;
                        case "[str_projectclassdtl2]":
                            o_ass_functionparameters[i] = str_projectclassdtl2;
                            break;
                        case "[clientinf]":
                            o_ass_functionparameters[i] = clientInf;
                            break;
                        case "[str_resultmessage]":
                            o_ass_functionparameters[i] = str_resultmessage;
                            i_resultmessage = i;
                            break;
                        case "[workitemid]":
                            o_ass_functionparameters[i] = workitemid;
                            break;
                        case "[userinfojsonstring]":
                            o_ass_functionparameters[i] = userInfoJsonString;
                            break;
                        default:
                            o_ass_functionparameters[i] = str_ass_functionparameters[i];
                            break;
                    }
                }
                str_result = _cc.GetResultByParameters(str_ass_name, str_ass_classname, str_ass_functionname, o_ass_functionparameters);
                if (i_resultmessage > 0)
                {
                    str_resultmessage = o_ass_functionparameters[i_resultmessage].ToString();
                }
            }
            else
            {
                str_result = _cc.GetResultByParameters(str_ass_name, str_ass_classname, str_ass_functionname, null);
            }
            return str_result;
        }


        /// <summary>
        /// 替换待办人 姓名 （尤其在会签处用到）
        /// </summary>
        /// <param name="mainTableSysidString">主表外键</param>
        /// <param name="nextusernames">当前获得的待办人</param>
        /// <param name="clientInf">当前的登录信息</param>
        /// <param name="t"></param>
        /// <returns></returns>
        private string GetAllNextUsernames(string mainTableSysidString, string nextusernames, string clientInf, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>();// new sara.dd.ldsw.dal.tbl_maintable();
            _model_tbl_maintable = _idal_tbl_maintable.GetList("sys_id='" + mainTableSysidString + "'", "", "sys_processnextuser", "", "", t)[0];
            IList<string> OldUserNames = (_model_tbl_maintable.sys_processnextuser).Split(',');

            if (OldUserNames.Count > 1) //原来的代办人有多个 （会签中，如果待办人有多个，其中一条会签更换待办人的情况）
            {
                IDictionary<string, string> clientInfoDic = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(clientInf);
                string username = clientInfoDic["username"];

                if (OldUserNames.Contains(username))
                {
                    string newUserNames = _model_tbl_maintable.sys_processnextuser.Replace(username, nextusernames);
                    List<string> listNewUserNames = (newUserNames).Split(',').ToList();
                    listNewUserNames = listNewUserNames.Distinct().ToList();

                    nextusernames = string.Join(",", listNewUserNames);//给“下一个待办人”字段重新赋值
                }
            }

            return nextusernames;
        }
        #endregion
    }
}