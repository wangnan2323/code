using Eva.Library.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// service_businessflow 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class service_businessflow : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBusinessFlow(string appCodeString, string sysIdString)
        {
            Eva.Library.Data.AccessData.IAccessData _iAccessData;
            _iAccessData = commonclass.commonclass.CreateIAccessData();

            Eva.Library.Data.AccessData.IAccessData _iAccessData_workflow;
            _iAccessData_workflow = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["WorkFlowDataBaseConnectionString"].ToString());

            Eva.Library.Data.AccessData.IAccessData _iAccessData_auth;
            _iAccessData_auth = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["AuthDataBaseConnectionString"].ToString());


            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";

            #region activity--节点集合activityclass:1、关键节点；2、流程节点、3、流程中的会签节点、4关键节点的归档状态、5关键节点的开始节点、6、流程节点的开始节点、7流程节点的结束节点
            DataTable activityDataTable = new DataTable();

            DataColumn dc = new DataColumn();
            dc.ColumnName = "activityid";
            activityDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "activityorderid";
            activityDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "activityname";
            activityDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "activityclass";
            activityDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "workflownode";
            activityDataTable.Columns.Add(dc);

            //节点操作人
            dc = new DataColumn();
            dc.ColumnName = "username";
            activityDataTable.Columns.Add(dc);

            //审核意见数量
            dc = new DataColumn();
            dc.ColumnName = "logcount";
            activityDataTable.Columns.Add(dc);

            //审核意见内容
            dc = new DataColumn();
            dc.ColumnName = "logcontent";
            activityDataTable.Columns.Add(dc);

            //是否是点亮节点
            dc = new DataColumn();
            dc.ColumnName = "iscurrent";
            activityDataTable.Columns.Add(dc);
            #endregion

            #region connection--连接线集合connectionclass：1、关键节点连接线；2、流程连接线；3、会签节点连接线
            DataTable connectionDataTable = new DataTable();

            dc = new DataColumn();
            dc.ColumnName = "fromactivityid";
            connectionDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "toactivityid";
            connectionDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "connectionid";
            connectionDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "connectionname";
            connectionDataTable.Columns.Add(dc);

            dc = new DataColumn();
            dc.ColumnName = "connectionclass";
            connectionDataTable.Columns.Add(dc);
            #endregion

            string message = "";

            try
            {
                string sqlString = "";

                #region 行政区域和当前状态
                //行政区域
                string xzqyid = "";
                //当前状态：如果处于退回状态则自动替换为正式状态
                string currentstate = "";
                //流程实例ID
                string processinsid = "";
                //项目类型ID
                string projectclassid = "";
                //数据类型IDprojclassdtl2
                string projclassdtl2id = "";
                sqlString = " select sys_projectclassid,xzqyid,sys_projectclassdtl1,sys_processinsid,xmlxid from tbl_maintable where sys_id  = '" + sysIdString + "'";

                DataSet ds_maintable = _iAccessData.Query(sqlString);

                xzqyid = ds_maintable.Tables[0].Rows[0]["xzqyid"].ToString();

                currentstate = ds_maintable.Tables[0].Rows[0]["sys_projectclassdtl1"].ToString();              

                if (currentstate.IndexOf('_') > -1)
                {
                    currentstate = currentstate.Split('_')[0].ToString();
                }

                processinsid = ds_maintable.Tables[0].Rows[0]["sys_processinsid"].ToString();

                projectclassid = ds_maintable.Tables[0].Rows[0]["sys_projectclassid"].ToString();

                projclassdtl2id = ds_maintable.Tables[0].Rows[0]["xmlxid"].ToString();
                
                #endregion

                #region businesstable 根据当前项目的projclassid,获取此projclassid的全部状态配置-此数据会在后边的程序中继续格式化
                sqlString = "";
                sqlString += " select a.sys_orderid,";
                sqlString += " a.projstate,";
                sqlString += " a.value1,";
                //sqlString += " (xmltype(a.facter)).extract('/table/tr/value').getstringval() as line,";
                //sqlString += " (xmltype(a.facter)).extract('/table/tr/wfprocessdefid').getstringval() as workflow ,";
                //sqlString += " (xmltype(a.behave)).extract('/table/tr/isvisibility').getstringval() as isvisibility,";

                sqlString += " (xmltype(a.facter)).extract('/table/tr/num').getstringval() as facternum,";
                sqlString += " (xmltype(a.facter)).extract('/table/tr/value').getstringval() as line,";
                sqlString += " (xmltype(a.facter)).extract('/table/tr/wfprocessdefid').getstringval() as workflow,";
                sqlString += " (xmltype(a.behave)).extract('/table/tr/facterid').getstringval() as facterid,";
                sqlString += " (xmltype(a.behave)).extract('/table/tr/isvisibility').getstringval() as isvisibility,  ";
                sqlString += " '' workflownode, ";
                sqlString += " a.value4";
                sqlString += " from t_projclass_dtl1 a";
                sqlString += " where projclassid = (select sys_projectclassid";
                sqlString += " from tbl_maintable t";
                sqlString += " where sys_id = '" + sysIdString + "')";
                sqlString += " and value4 in ('0', '2')";
                sqlString += " order by to_number(sys_orderid)";

                DataTable businessTable = _iAccessData.Query(sqlString).Tables[0];
                #endregion

                #region code1--计算businessTable的line和workflow
                for (int i = 0; i < businessTable.Rows.Count; i++)
                {

                    #region projstate
                    //<wfprocessdefid>[sys_appcode]1101[organid]</wfprocessdefid><wfprocessdefid>-1</wfprocessdefid>
                    string workflows = businessTable.Rows[i]["workflow"].ToString().Replace("</wfprocessdefid><wfprocessdefid>", "`").Replace("</wfprocessdefid>\n<wfprocessdefid>", "`");
                    workflows = workflows.Replace("</wfprocessdefid>", "");
                    workflows = workflows.Replace("<wfprocessdefid>", "");
                    workflows = workflows.Replace("<wfprocessdefid/>", "");
                    workflows = workflows.Replace("\n", "");
                    //[sys_appcode]1101[organid]^-1
                    businessTable.Rows[i]["workflow"] = workflows;

                    string projstate = businessTable.Rows[i]["projstate"].ToString();
                    //if (projstate.Length == 1)
                    //{
                    //    projstate = "0" + projstate;
                    //}

                    //[sys_appcode]1101[organid]^-1
                    businessTable.Rows[i]["projstate"] = projstate;
                    #endregion

                    #region lines

                    //2014-10-27-在此处添加演算，计算出facterid对应的isvisibility,应该是一个keyvalue的集合
                    //经过实际数据演算，发现如果关闭isvisibility=false的连接线，会造成流程节点无法和后继节点连接的问题，

                    string isvisibilitys = businessTable.Rows[i]["isvisibility"].ToString().Replace("</isvisibility><isvisibility>", "`").Replace("</isvisibility>\n<isvisibility>", "`");
                    isvisibilitys = isvisibilitys.Replace("</isvisibility>", "");
                    isvisibilitys = isvisibilitys.Replace("<isvisibility>", "");
                    isvisibilitys = isvisibilitys.Replace("<isvisibility/>", "");
                    isvisibilitys = isvisibilitys.Replace("\n", "");
                    string[] isvisibilitysArray = isvisibilitys.Split('`');

                    string facterids = businessTable.Rows[i]["facterid"].ToString().Replace("</facterid><facterid>", "`").Replace("</facterid>\n<facterid>", "`");
                    facterids = facterids.Replace("</facterid>", "");
                    facterids = facterids.Replace("<facterid>", "");
                    facterids = facterids.Replace("<facterid/>", "");
                    facterids = facterids.Replace("\n", "");
                    string[] facteridsArray = facterids.Split('`');

                    System.Collections.Hashtable facterAndIsvisbolity = new System.Collections.Hashtable();
                    for (int j = 0; j < facteridsArray.Length; j++)
                    {
                        if (facteridsArray[j].ToString() != "-1")
                        {
                            facterAndIsvisbolity.Add(facteridsArray[j].ToString(), isvisibilitysArray[j].ToString());
                        }
                    }

                    string facternums = businessTable.Rows[i]["facternum"].ToString().Replace("</num><num>", "`").Replace("</num>\n<num>", "`");
                    facternums = facternums.Replace("</num>", "");
                    facternums = facternums.Replace("<num>", "");
                    facternums = facternums.Replace("<num/>", "");
                    facternums = facternums.Replace("\n", "");
                    string[] facternumsArray = facternums.Split('`');

                    //<value>f_true()?2:2</value><value>f_true()?7:7</value>
                    string lines = businessTable.Rows[i]["line"].ToString().Replace("</value><value>", "`").Replace("</value>\n<value>", "`");
                    lines = lines.Replace("</value>", "");
                    lines = lines.Replace("<value>", "");
                    lines = lines.Replace("<value/>", "");
                    lines = lines.Replace("\n", "");
                    //f_true()?2:2^f_true()?7:7
                    string[] lineArray = lines.Split('`');

                    System.Collections.Hashtable facterAndLine = new System.Collections.Hashtable();
                    for (int j = 0; j < facternumsArray.Length; j++)
                    {
                        facterAndLine.Add(facternumsArray[j].ToString(), lineArray[j].ToString());
                    }

                    string newline = "";

                    //在此处添加判断，验证当前的连接线是否应该被添加（决定于isvisibility属性）
                    foreach (DictionaryEntry de in facterAndLine)
                    {
                        // if (facterAndIsvisbolity[de.Key].ToString().ToLower() == "true")
                        //{
                        string line = de.Value.ToString();

                        #region code
                        string aaa = "";
                        if (line == "")
                        {

                        }
                        else
                        {
                            string[] cc = line.Split('?')[1].ToString().Split(':');
                            foreach (string c in cc)
                            {
                                if (c.IndexOf('_') > -1)
                                {
                                    //aaa += c.Split('_')[0].ToString() + ",";
                                }
                                else
                                {
                                    if (("," + aaa + ",").IndexOf("," + c + ",") > -1)
                                    {
                                        // aaa += c + ",";
                                    }
                                    else
                                    {
                                        aaa += c + ",";
                                    }
                                }
                            }
                        }

                        //在此处添加判断，验证当前的连接线是否应该被添加（决定于isvisibility属性）
                        newline += aaa.TrimEnd(',') + "`";
                        #endregion
                        //}
                    }


                    #region code
                    //foreach (string line in lineArray)
                    //{
                    //    string aaa = "";
                    //    if (line == "")
                    //    {

                    //    }
                    //    else
                    //    {
                    //        string[] cc = line.Split('?')[1].ToString().Split(':');
                    //        foreach (string c in cc)
                    //        {
                    //            if (c.IndexOf('_') > -1)
                    //            {
                    //            }
                    //            else
                    //            {
                    //                if (("," + aaa + ",").IndexOf("," + c + ",") > -1)
                    //                {

                    //                }
                    //                else
                    //                {
                    //                    aaa += c + ",";
                    //                }
                    //            }
                    //        }
                    //    }                       
                    //    newline += aaa.TrimEnd(',') + "`";
                    //} 
                    #endregion
                    //3,5^7
                    newline = newline.TrimEnd('`').TrimStart('`');
                    businessTable.Rows[i]["line"] = newline;
                    #endregion

                    #region workflownode
                    string[] cLines = businessTable.Rows[i]["line"].ToString().Split('`');
                    string[] cWorkflows = businessTable.Rows[i]["workflow"].ToString().Split('`');
                    for (int j = 0; j < cLines.Length; j++)
                    {
                        if (cWorkflows[j].IndexOf('[') > -1)
                        {
                            DataRow[] cDrs = businessTable.Select("projstate = '" + cLines[j] + "'");

                            if (cDrs.Length > 0)
                            {
                                cDrs[0]["workflownode"] = cWorkflows[j];
                            }
                        }
                    }
                    #endregion
                }
                #endregion

                #region code2--计算activityDataTable和connectionDataTable，项目当前状态会把activityDataTable中对应的activityclass设置为1.5


                for (int i = 0; i < businessTable.Rows.Count; i++)
                {
                    DataRow newRow = activityDataTable.NewRow();


                    newRow["activityid"] = businessTable.Rows[i]["projstate"].ToString();

                    newRow["activityorderid"] = getOrderId(businessTable.Rows[i]["sys_orderid"].ToString());
                    newRow["activityname"] = businessTable.Rows[i]["value1"].ToString();

                    //如果是归档状态是4
                    if (businessTable.Rows[i]["value4"].ToString() == "2")
                    {
                        newRow["activityclass"] = "4";//归档节点
                    }
                    else if(i==0)
                    {
                        newRow["activityclass"] = "5";//开始节点
                    }
                    else 
                    {
                        newRow["activityclass"] = "1";//一般节点
                    }

                    //是不是当前节点
                    if (currentstate == businessTable.Rows[i]["projstate"].ToString())
                    {
                        newRow["iscurrent"] = "true";
                    }
                    else
                    {
                        newRow["iscurrent"] = "false";
                    }

                    newRow["workflownode"] = businessTable.Rows[i]["workflownode"].ToString();

                    activityDataTable.Rows.Add(newRow);


                    string[] lines1 = businessTable.Rows[i]["line"].ToString().Split('`');

                    foreach (string line1 in lines1)
                    {
                        string[] lines2 = line1.Split(',');

                        foreach (string line2 in lines2)
                        {
                            if (line2 != "")
                            {
                                newRow = connectionDataTable.NewRow();

                                newRow["fromactivityid"] = businessTable.Rows[i]["projstate"].ToString();
                                newRow["toactivityid"] = line2;
                                newRow["connectionid"] = "";
                                newRow["connectionname"] = "";
                                newRow["connectionclass"] = "1";

                                connectionDataTable.Rows.Add(newRow);
                            }
                        }
                    }
                }
                #endregion

                #region code3--计算activityDataTable流程定义ID
                int activityCount = activityDataTable.Rows.Count;
                for (int i = 0; i < activityCount; i++)
                {
                    if (activityDataTable.Rows[i]["workflownode"].ToString() != "")
                    {
                        #region 计算lcdyid，分2种情况讨论，结果记录在activityDataTable.workflownode中
                        string lcdyid = activityDataTable.Rows[i]["workflownode"].ToString().Replace("[sys_appcode]", appCodeString + "0");
                        lcdyid = lcdyid.Replace("[organid]", "");

                        sqlString = "select * from t_dy_lc where sys_id like '" + lcdyid + "%' and (','||sys_remark||',' like '%," + appCodeString + ",%')";
                        DataSet ds_lc = _iAccessData_workflow.Query(sqlString);
                        if (ds_lc.Tables[0].Rows.Count == 1)
                        {
                            lcdyid = ds_lc.Tables[0].Rows[0]["sys_id"].ToString();
                        }
                        else
                        {
                            lcdyid = activityDataTable.Rows[i]["workflownode"].ToString().Replace("[sys_appcode]", appCodeString + "0").Replace("[organid]", xzqyid);

                            if (ds_lc.Tables[0].Select("sys_id = '" + lcdyid + "'").Length != 1)
                            {
                                lcdyid = "";
                                //在此处发现因为xzqyID配置错误，造成的流程错误
                                if (xzqyid == "3")
                                {
                                    lcdyid = activityDataTable.Rows[i]["workflownode"].ToString().Replace("[sys_appcode]", appCodeString + "0").Replace("[organid]", "4");
                                    if (ds_lc.Tables[0].Select("sys_id = '" + lcdyid + "'").Length != 1)
                                    {
                                        lcdyid = "";
                                    }
                                }
                                else
                                {
                                    lcdyid = activityDataTable.Rows[i]["workflownode"].ToString().Replace("[sys_appcode]", appCodeString + "0").Replace("[organid]", "4");
                                    if (ds_lc.Tables[0].Select("sys_id = '" + lcdyid + "'").Length != 1)
                                    {
                                        lcdyid = "";
                                    }
                                }
                            }
                        }
                        activityDataTable.Rows[i]["workflownode"] = lcdyid;
                        #endregion


                        DataSet ds_workitem = null;
                        #region 验证当前节点是否处于点亮状态，如果处于，则需要考虑工作流中的点亮问题,查询workitem，获取sl信息--------修改代码，新cc平台没有t_workflow这个表了
                        if (activityDataTable.Rows[i]["iscurrent"].ToString()=="true")
                        {
                            //找到对应的流程实例，查看该定义节点是否处于点亮状态

                            //sqlString = "select f_processinsid from t_workflow where sys_delflag = '1' and f_businessids = '" + sysIdString + "'";
                            //object oa = _iAccessData.GetSingle(sqlString);
                            if (processinsid != "")
                            {
                                sqlString = " select a.czrid,a.fk_dy_jd_sys_id ";
                                sqlString += " from t_workitem a, ";
                                sqlString += " t_sl_lc b, ";
                                sqlString += " t_sl_jd d  ";
                                sqlString += " where a.fk_sl_lc_sys_id = '" + processinsid + "' ";
                                sqlString += " and a.xszt in ('0','1','5')  ";
                                sqlString += " and a.fk_sl_lc_sys_id = b.sys_id  ";
                                sqlString += " and a.fk_sl_jd_sys_id = d.sys_id  ";
                                sqlString += " and b.fk_dy_lc_sys_id in ('" + lcdyid + "')  ";
                                // sqlString += " and b.sys_remark in ('" + appCodeString + "') ";
                                sqlString += " and (','||b.sys_remark||',' like '%," + appCodeString + ",%')";
                                sqlString += " and d.jdzt in ('1','3','5','8') order by a.cjsj desc ";

                                ds_workitem = _iAccessData_workflow.Query(sqlString);
                            }
                        }
                        #endregion


                        #region 添加流程节点

                        string connectionIds = "";

                        sqlString = "select sys_id,jdmc,jdlx,jdnyh,czrygz,czryid from t_dy_jd  where fk_dy_lc_sys_id = '" + lcdyid + "' order by sys_id";
                        DataSet ds_jd = _iAccessData_workflow.Query(sqlString);

                        sqlString = "  select fk_dy_jd_sys_id_from,fk_dy_jd_sys_id_to,ljxmc  from t_dy_ljx t where fk_dy_lc_sys_id  ='" + lcdyid + "'  and  ljxlx in ('0','1','2')";
                        DataSet ds_ljx = _iAccessData_workflow.Query(sqlString);

                        for (int j = 0; j < ds_jd.Tables[0].Rows.Count; j++)
                        {
                            switch (ds_jd.Tables[0].Rows[j]["jdnyh"].ToString())
                            {
                                case "2"://串行
                                case "3"://并行
                                case "4"://竞争
                                    {
                                        #region 构造节点和连接线
                                      //节点内用户
                                        DataSet ds_user = this.getDsUser(ds_jd, j, sqlString, _iAccessData_auth);
                                       
                                       

                                        #region 根据用户构造节点
                                        string lastactivityid = "";
                                        for (int k = 0; k < ds_user.Tables[0].Rows.Count; k++)
                                        {
                                            DataRow newRow = activityDataTable.NewRow();
                                            newRow["activityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "_" + ds_user.Tables[0].Rows[k]["u_id"].ToString();

                                            newRow["activityorderid"] = activityDataTable.Rows[i]["activityorderid"].ToString() + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "_" + getOrderId(k.ToString()) + "_" + ds_user.Tables[0].Rows[k]["u_id"].ToString();

                                            newRow["activityname"] = ds_jd.Tables[0].Rows[j]["jdmc"].ToString();

                                            newRow["username"] = ds_user.Tables[0].Rows[k]["u_name"].ToString();
                                            //如果当前节点是点亮节点,则设置节点的activityclass带有.5的标记
                                            if (activityDataTable.Rows[i]["iscurrent"].ToString() == "true")
                                            {
                                                if (ds_workitem != null)
                                                {
                                                    DataRow[] drs_workitem = ds_workitem.Tables[0].Select(" fk_dy_jd_sys_id = '" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "' and  czrid = '" + ds_user.Tables[0].Rows[k]["u_id"].ToString() + "'");
                                                    if (drs_workitem.Length > 0)
                                                    {
                                                        newRow["activityclass"] = "3";
                                                        newRow["iscurrent"] = "true";
                                                    }
                                                    else
                                                    {
                                                        newRow["activityclass"] = "3";
                                                        newRow["iscurrent"] = "false";
                                                    }
                                                }
                                                else
                                                {
                                                    newRow["activityclass"] = "3";
                                                    newRow["iscurrent"] = "false";
                                                }
                                            }
                                            else
                                            {
                                                newRow["activityclass"] = "3";
                                                newRow["iscurrent"] = "false";
                                            }

                                            newRow["workflownode"] = "-" + lcdyid;
                                            activityDataTable.Rows.Add(newRow);

                                            #region 根据节点构造连接线
                                            //并行、竞争
                                            if (ds_jd.Tables[0].Rows[j]["jdnyh"].ToString() == "4" || ds_jd.Tables[0].Rows[j]["jdnyh"].ToString() == "3")
                                            {
                                                DataRow[] dr_ljxs = ds_ljx.Tables[0].Select(" fk_dy_jd_sys_id_to ='" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "'");

                                                foreach (DataRow dr_ljx in dr_ljxs)
                                                {
                                                    newRow = connectionDataTable.NewRow();

                                                    newRow["fromactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + dr_ljx["fk_dy_jd_sys_id_from"].ToString();
                                                    newRow["toactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "_" + ds_user.Tables[0].Rows[k]["u_id"].ToString();
                                                    newRow["connectionid"] = "";
                                                    newRow["connectionname"] = "";
                                                    newRow["connectionclass"] = "3";

                                                    connectionDataTable.Rows.Add(newRow);

                                                    connectionIds += newRow["toactivityid"] + ",";
                                                }
                                            }
                                            else//串行
                                            {
                                                if (k == 0)
                                                {
                                                    DataRow[] dr_ljxs = ds_ljx.Tables[0].Select(" fk_dy_jd_sys_id_to ='" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "'");

                                                    foreach (DataRow dr_ljx in dr_ljxs)
                                                    {
                                                        newRow = connectionDataTable.NewRow();

                                                        newRow["fromactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + dr_ljx["fk_dy_jd_sys_id_from"].ToString();
                                                        newRow["toactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "_" + ds_user.Tables[0].Rows[k]["u_id"].ToString();
                                                        newRow["connectionid"] = "";
                                                        newRow["connectionname"] = "";
                                                        newRow["connectionclass"] = "3";

                                                        connectionDataTable.Rows.Add(newRow);

                                                        lastactivityid = newRow["toactivityid"].ToString();

                                                        if (k == ds_user.Tables[0].Rows.Count - 1)
                                                        {
                                                            connectionIds += lastactivityid + ",";
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    newRow = connectionDataTable.NewRow();

                                                    newRow["fromactivityid"] = lastactivityid;
                                                    newRow["toactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "_" + ds_user.Tables[0].Rows[k]["u_id"].ToString();
                                                    newRow["connectionid"] = "";
                                                    newRow["connectionname"] = "";
                                                    newRow["connectionclass"] = "3";

                                                    connectionDataTable.Rows.Add(newRow);

                                                    lastactivityid = newRow["toactivityid"].ToString();

                                                    if (k == ds_user.Tables[0].Rows.Count - 1)
                                                    {
                                                        connectionIds += lastactivityid + ",";
                                                    }
                                                }

                                            }
                                            #endregion
                                        }
                                        #endregion
                                        #endregion
                                    }
                                    break;
                                case "0":
                                case "1":
                                    {
                                        #region 构造节点

                                        //节点内用户
                                        DataSet ds_user = this.getDsUser(ds_jd, j, sqlString, _iAccessData_auth);

                                        DataRow newRow = activityDataTable.NewRow();
                                        newRow["activityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString();
                                        newRow["activityorderid"] = activityDataTable.Rows[i]["activityorderid"].ToString() + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString();

                                        newRow["activityname"] = ds_jd.Tables[0].Rows[j]["jdmc"].ToString();

                                        string username = "";
                                        for (int ii = 0; ii<ds_user.Tables[0].Rows.Count;ii++ )
                                        {
                                            username += ds_user.Tables[0].Rows[ii]["u_name"].ToString() + "，";
                                        }

                                        newRow["username"] = username.TrimEnd('，');


                                        if (activityDataTable.Rows[i]["iscurrent"].ToString()=="true")
                                        {
                                            if (ds_workitem != null)
                                            {
                                                DataRow[] drs_workitem = ds_workitem.Tables[0].Select(" fk_dy_jd_sys_id = '" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "'");
                                                if (drs_workitem.Length > 0)
                                                {                                                  

                                                    if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "0")
                                                    {
                                                        newRow["activityclass"] = "6";
                                                    }
                                                    else if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "5")
                                                    {
                                                        newRow["activityclass"] = "7";
                                                    }
                                                    else
                                                    {
                                                        newRow["activityclass"] = "2";
                                                    }

                                                    newRow["iscurrent"] = "true";
                                                }
                                                else
                                                {
                                                    if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "0")
                                                    {
                                                        newRow["activityclass"] = "6";
                                                    }
                                                    else if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "5")
                                                    {
                                                        newRow["activityclass"] = "7";
                                                    }
                                                    else
                                                    {
                                                        newRow["activityclass"] = "2";
                                                    }
                                                    newRow["iscurrent"] = "false";
                                                }
                                            }
                                            else
                                            {
                                                if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "0")
                                                {
                                                    newRow["activityclass"] = "6";
                                                }
                                                else if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "5")
                                                {
                                                    newRow["activityclass"] = "7";
                                                }
                                                else
                                                {
                                                    newRow["activityclass"] = "2";
                                                }
                                                newRow["iscurrent"] = "false";
                                            }
                                        }
                                        else
                                        {
                                            if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "0")
                                            {
                                                newRow["activityclass"] = "6";
                                            }
                                            else if (ds_jd.Tables[0].Rows[j]["jdlx"].ToString() == "5")
                                            {
                                                newRow["activityclass"] = "7";
                                            }
                                            else
                                            {
                                                newRow["activityclass"] = "2";
                                            }
                                            newRow["iscurrent"] = "false";
                                        }
                                        newRow["workflownode"] = "-" + lcdyid;//带有-号可能表示当前工作流节点不是被激活的节点。。。
                                        activityDataTable.Rows.Add(newRow);
                                        #endregion


                                        #region 连接线
                                        DataRow[] dr_ljxs = ds_ljx.Tables[0].Select(" fk_dy_jd_sys_id_to ='" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString() + "'");

                                        foreach (DataRow dr_ljx in dr_ljxs)
                                        {
                                            string fromid = activityDataTable.Rows[i]["activityid"] + "_" + dr_ljx["fk_dy_jd_sys_id_from"].ToString();
                                            //判断from节点是否存在于activityDataTable中，如果存在则继续，如果不存在则从connectionIds中查询是否存在，根据需要添加连接线
                                            DataRow[] drc = activityDataTable.Select(" activityid = '" + fromid + "'");

                                            if (drc.Length > 0)
                                            {
                                                newRow = connectionDataTable.NewRow();

                                                newRow["fromactivityid"] = fromid;
                                                newRow["toactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString();
                                                newRow["connectionid"] = "";
                                                newRow["connectionname"] = "";
                                                newRow["connectionclass"] = "2";

                                                connectionDataTable.Rows.Add(newRow);
                                            }
                                            else
                                            {
                                                string[] connectIdArray = connectionIds.TrimEnd(',').Split(',');

                                                foreach (string connectid in connectIdArray)
                                                {
                                                    if (connectid.IndexOf(fromid + "_") > -1)
                                                    {
                                                        newRow = connectionDataTable.NewRow();

                                                        newRow["fromactivityid"] = connectid;
                                                        newRow["toactivityid"] = activityDataTable.Rows[i]["activityid"] + "_" + ds_jd.Tables[0].Rows[j]["sys_id"].ToString();
                                                        newRow["connectionid"] = "";
                                                        newRow["connectionname"] = "";
                                                        newRow["connectionclass"] = "3";

                                                        connectionDataTable.Rows.Add(newRow);

                                                        connectionIds = ("," + connectionIds + ",").Replace("," + connectid + ",", ",").TrimEnd(',').TrimStart(',');
                                                    }
                                                }
                                            }
                                        }
                                        #endregion
                                    }
                                    break;
                            }

                        }
                        #endregion
                    }
                }
                #endregion


                activityDataTable.DefaultView.Sort = "activityorderid";
                activityDataTable = activityDataTable.DefaultView.ToTable();

               

                #region code4--计算activityDataTable的username/logcount/logcontent
                
                sqlString = "";
                sqlString += " select ";
                sqlString += " sys_creatuserid as userid,";
                sqlString += " sys_creatusername as username, ";
                sqlString += " sys_creatdate as logdate, ";
                sqlString += " fromstate as projclassid, ";
                sqlString += " processsinsid as processinsid, ";
                sqlString += " workflowid as processdefid, ";
                sqlString += " value1 as activatedefid, ";
                sqlString += " remark ";
                sqlString += " from t_projstate_log t where businessid = '" + sysIdString + "' order by sys_creatdate desc ";

                DataTable logTable = _iAccessData.Query(sqlString).Tables[0];

                for (int i = 0; i < activityDataTable.Rows.Count; i++)
                {
                    //如果当前节点是关键节点
                    if (activityDataTable.Rows[i]["workflownode"].ToString() == "")
                    {
                        DataRow[] drs = logTable.Select(" projclassid = '" + activityDataTable.Rows[i]["activityid"].ToString() + "'");
                        //当前节点是关键节点，并存在审核记录
                        if (drs.Length > 0)
                        {
                            activityDataTable.Rows[i]["username"] = drs[0]["username"].ToString();
                            activityDataTable.Rows[i]["logcount"] = drs.Length.ToString();
                            activityDataTable.Rows[i]["logcontent"] = getLogContent(drs);
                        }
                        else
                        {
                            //当前节点没有审核记录

                            sara.dd.ldsw.commonclass.commonclass cc = new commonclass.commonclass();

                            DataSet dsUser = cc.GetNextUser(projectclassid, activityDataTable.Rows[i]["activityid"].ToString(), projclassdtl2id, xzqyid);

                            string usernames = "";
                            for (int ii = 0; ii < dsUser.Tables[0].Rows.Count;ii++ )
                            {
                                usernames += dsUser.Tables[0].Rows[ii]["U_NAME"].ToString() + "，";
                            }

                            activityDataTable.Rows[i]["username"] = usernames.TrimEnd('，');
                            activityDataTable.Rows[i]["logcount"] = "0";
                            activityDataTable.Rows[i]["logcontent"] = "";
                        }
                    }
                    else
                    {
                        //如果当前节点是工作流节点

                        //开始节点不需要体现用户信息
                        if (activityDataTable.Rows[i]["activityclass"].ToString() == "6")
                        {
                            #region 开始节点不需要体现用户信息
                            activityDataTable.Rows[i]["username"] = "";
                            activityDataTable.Rows[i]["logcount"] = "0";
                            activityDataTable.Rows[i]["logcontent"] = ""; 
                            #endregion
                        }
                        else
                        {
                            //读取日志表信息
                            #region 读取日志表信息
                            string[] args = activityDataTable.Rows[i]["activityid"].ToString().Split('_');
                            if (args.Length >= 2)
                            {
                                string projclassid = "";
                                string activatedefid = "";
                                string userid = "";
                                //流程节点
                                if (args.Length == 2)
                                {
                                    projclassid = args[0].ToString();
                                    activatedefid = args[1].ToString();

                                }
                                //子流程节点
                                else if (args.Length == 3)
                                {
                                    projclassid = args[0].ToString();
                                    activatedefid = args[1].ToString();
                                    userid = args[2].ToString();
                                }

                                sqlString = " projclassid = '" + projclassid + "'";
                                sqlString += " and  activatedefid = '" + activatedefid + "'";
                                if (userid != "")
                                {
                                    sqlString += " and  userid = '" + userid + "'";
                                }
                                DataRow[] drs = logTable.Select(sqlString);

                                if (drs.Length > 0)
                                {
                                    activityDataTable.Rows[i]["username"] = drs[0]["username"].ToString();
                                }

                                activityDataTable.Rows[i]["logcount"] = drs.Length.ToString();

                                activityDataTable.Rows[i]["logcontent"] = getLogContent(drs);
                            }
                            else
                            {
                                activityDataTable.Rows[i]["username"] = "";
                                activityDataTable.Rows[i]["logcount"] = "0";
                                activityDataTable.Rows[i]["logcontent"] = "";
                            } 
                            #endregion
                        }
                       

                    }
                  

                }
                #endregion


                message = "{";
                message += "\"activity\":{\"total\":\"" + activityDataTable.Rows.Count.ToString() + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(activityDataTable) + "},";
                message += "\"connection\":{\"total\":\"" + connectionDataTable.Rows.Count.ToString() + "\",\"rows\":" + Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(connectionDataTable) + "}";
                message += "}";


                resultDic["result"] = "true";

                //message = "{\"activity\":{\"total\":\"49\",\"rows\":[{\"activityid\":\"1\",\"activityorderid\":\"000001\",\"activityname\":\"区县组批次\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"2\",\"activityorderid\":\"000002\",\"activityname\":\"区县审核\",\"activityclass\":\"1.5\",\"workflownode\":\"250110114\"},{\"activityid\":\"2_250110114000\",\"activityorderid\":\"000002_250110114000\",\"activityname\":\"经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-250110114\"},{\"activityid\":\"2_250110114010\",\"activityorderid\":\"000002_250110114010\",\"activityname\":\"科长审核\",\"activityclass\":\"2.5\",\"workflownode\":\"-250110114\"},{\"activityid\":\"2_250110114020\",\"activityorderid\":\"000002_250110114020\",\"activityname\":\"主管局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-250110114\"},{\"activityid\":\"2_250110114030\",\"activityorderid\":\"000002_250110114030\",\"activityname\":\"局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-250110114\"},{\"activityid\":\"2_250110114040\",\"activityorderid\":\"000002_250110114040\",\"activityname\":\"经办人报市政府\",\"activityclass\":\"2\",\"workflownode\":\"-250110114\"},{\"activityid\":\"2_250110114050\",\"activityorderid\":\"000002_250110114050\",\"activityname\":\"局长终审\",\"activityclass\":\"2\",\"workflownode\":\"-250110114\"},{\"activityid\":\"2_250110114060\",\"activityorderid\":\"000002_250110114060\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-250110114\"},{\"activityid\":\"3\",\"activityorderid\":\"000003\",\"activityname\":\"滨海收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"4\",\"activityorderid\":\"000004\",\"activityname\":\"滨海审核\",\"activityclass\":\"1\",\"workflownode\":\"250110349\"},{\"activityid\":\"4_250110349000\",\"activityorderid\":\"000004_250110349000\",\"activityname\":\"经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-250110349\"},{\"activityid\":\"4_250110349010\",\"activityorderid\":\"000004_250110349010\",\"activityname\":\"科长审核\",\"activityclass\":\"2\",\"workflownode\":\"-250110349\"},{\"activityid\":\"4_250110349020\",\"activityorderid\":\"000004_250110349020\",\"activityname\":\"主管局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-250110349\"},{\"activityid\":\"4_250110349030\",\"activityorderid\":\"000004_250110349030\",\"activityname\":\"局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-250110349\"},{\"activityid\":\"4_250110349040\",\"activityorderid\":\"000004_250110349040\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-250110349\"},{\"activityid\":\"5\",\"activityorderid\":\"000005\",\"activityname\":\"市局收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"6\",\"activityorderid\":\"000006\",\"activityname\":\"市局审核\",\"activityclass\":\"1\",\"workflownode\":\"25011054\"},{\"activityid\":\"6_25011054010\",\"activityorderid\":\"000006_25011054010\",\"activityname\":\"市局资源处经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054020\",\"activityorderid\":\"000006_25011054020\",\"activityname\":\"市局资源处审查占补平衡\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054030\",\"activityorderid\":\"000006_25011054030\",\"activityname\":\"市局资源处审查计划审核\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054040\",\"activityorderid\":\"000006_25011054040\",\"activityname\":\"市局资源处主管处长1审核\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054060\",\"activityorderid\":\"000006_25011054060\",\"activityname\":\"市局资源处处长审核\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_849\",\"activityorderid\":\"000006_25011054070_000000_849\",\"activityname\":\"市局会签_规划处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_853\",\"activityorderid\":\"000006_25011054070_000001_853\",\"activityname\":\"市局会签_地籍处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_854\",\"activityorderid\":\"000006_25011054070_000002_854\",\"activityname\":\"市局会签_信访处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_850\",\"activityorderid\":\"000006_25011054070_000003_850\",\"activityname\":\"市局会签_法监处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_848\",\"activityorderid\":\"000006_25011054070_000004_848\",\"activityname\":\"市局会签_利用处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_851\",\"activityorderid\":\"000006_25011054070_000005_851\",\"activityname\":\"市局会签_地矿处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054070_852\",\"activityorderid\":\"000006_25011054070_000006_852\",\"activityname\":\"市局会签_法规处会签\",\"activityclass\":\"3\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054080\",\"activityorderid\":\"000006_25011054080\",\"activityname\":\"市局资源处处长审核\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054090\",\"activityorderid\":\"000006_25011054090\",\"activityname\":\"市局主管局长审核或审批\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054100\",\"activityorderid\":\"000006_25011054100\",\"activityname\":\"市局局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054110\",\"activityorderid\":\"000006_25011054110\",\"activityname\":\"办公室（市政府已批）填写批准文号和批准日期\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054120\",\"activityorderid\":\"000006_25011054120\",\"activityname\":\"资源处经办人（市政府已批）\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054130\",\"activityorderid\":\"000006_25011054130\",\"activityname\":\"市局资源处经办人报部\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054140\",\"activityorderid\":\"000006_25011054140\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054150\",\"activityorderid\":\"000006_25011054150\",\"activityname\":\"办公室（市政府未批）填写请示文号和请示日期\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"6_25011054160\",\"activityorderid\":\"000006_25011054160\",\"activityname\":\"资源处经办人（市政府未批）\",\"activityclass\":\"2\",\"workflownode\":\"-25011054\"},{\"activityid\":\"8\",\"activityorderid\":\"000008\",\"activityname\":\"区县实施收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"9\",\"activityorderid\":\"0009.1\",\"activityname\":\"区县实施审核\",\"activityclass\":\"1\",\"workflownode\":\"250110714\"},{\"activityid\":\"9_250110714000\",\"activityorderid\":\"0009.1_250110714000\",\"activityname\":\"经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-250110714\"},{\"activityid\":\"9_250110714010\",\"activityorderid\":\"0009.1_250110714010\",\"activityname\":\"科长审核\",\"activityclass\":\"2\",\"workflownode\":\"-250110714\"},{\"activityid\":\"9_250110714020\",\"activityorderid\":\"0009.1_250110714020\",\"activityname\":\"主管局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-250110714\"},{\"activityid\":\"9_250110714030\",\"activityorderid\":\"0009.1_250110714030\",\"activityname\":\"局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-250110714\"},{\"activityid\":\"9_250110714040\",\"activityorderid\":\"0009.1_250110714040\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-250110714\"},{\"activityid\":\"10\",\"activityorderid\":\"0009.2\",\"activityname\":\"区县实施上传材料\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"13\",\"activityorderid\":\"0009.3\",\"activityname\":\"区县批次归档-转用类型\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"7\",\"activityorderid\":\"0009.9\",\"activityname\":\"归档\",\"activityclass\":\"1\",\"workflownode\":\"\"}]},\"connection\":{\"total\":\"58\",\"rows\":[{\"fromactivityid\":\"1\",\"toactivityid\":\"2\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"1\",\"toactivityid\":\"7\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2\",\"toactivityid\":\"3\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2\",\"toactivityid\":\"5\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"3\",\"toactivityid\":\"11\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"3\",\"toactivityid\":\"4\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"4\",\"toactivityid\":\"5\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"5\",\"toactivityid\":\"12\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"5\",\"toactivityid\":\"6\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"6\",\"toactivityid\":\"13\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"6\",\"toactivityid\":\"8\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"8\",\"toactivityid\":\"9\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"8\",\"toactivityid\":\"7\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"9\",\"toactivityid\":\"10\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"10\",\"toactivityid\":\"7\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"13\",\"toactivityid\":\"7\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2_250110114000\",\"toactivityid\":\"2_250110114010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_250110114010\",\"toactivityid\":\"2_250110114020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_250110114020\",\"toactivityid\":\"2_250110114030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_250110114030\",\"toactivityid\":\"2_250110114040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_250110114040\",\"toactivityid\":\"2_250110114050\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_250110114050\",\"toactivityid\":\"2_250110114060\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_250110349000\",\"toactivityid\":\"4_250110349010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_250110349010\",\"toactivityid\":\"4_250110349020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_250110349020\",\"toactivityid\":\"4_250110349030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_250110349030\",\"toactivityid\":\"4_250110349040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054010\",\"toactivityid\":\"6_25011054020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054010\",\"toactivityid\":\"6_25011054030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054020\",\"toactivityid\":\"6_25011054030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054030\",\"toactivityid\":\"6_25011054040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054040\",\"toactivityid\":\"6_25011054060\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_849\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_853\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_854\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_850\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_848\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_851\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054070_852\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_849\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_853\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_854\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_850\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_848\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_851\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054070_852\",\"toactivityid\":\"6_25011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_25011054060\",\"toactivityid\":\"6_25011054090\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054080\",\"toactivityid\":\"6_25011054090\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054090\",\"toactivityid\":\"6_25011054100\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054110\",\"toactivityid\":\"6_25011054120\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054120\",\"toactivityid\":\"6_25011054130\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054120\",\"toactivityid\":\"6_25011054140\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054130\",\"toactivityid\":\"6_25011054140\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054100\",\"toactivityid\":\"6_25011054150\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_25011054150\",\"toactivityid\":\"6_25011054160\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_250110714000\",\"toactivityid\":\"9_250110714010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_250110714010\",\"toactivityid\":\"9_250110714020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_250110714020\",\"toactivityid\":\"9_250110714030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_250110714030\",\"toactivityid\":\"9_250110714040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"}]}}";
                // message = "{\"activity\":{\"total\":\"48\",\"rows\":[{\"activityid\":\"1\",\"activityorderid\":\"001010\",\"activityname\":\"区县起件\",\"activityclass\":\"1.5\",\"workflownode\":\"\"},{\"activityid\":\"2\",\"activityorderid\":\"001020\",\"activityname\":\"区县审核\",\"activityclass\":\"1\",\"workflownode\":\"3016\"},{\"activityid\":\"2_3016000\",\"activityorderid\":\"001020_3016000\",\"activityname\":\"宁河市场经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"2_3016010\",\"activityorderid\":\"001020_3016010\",\"activityname\":\"宁河市场科科长初审\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"2_3016020\",\"activityorderid\":\"001020_3016020\",\"activityname\":\"宁河副局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"2_3016030\",\"activityorderid\":\"001020_3016030\",\"activityname\":\"宁河局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"2_3016040\",\"activityorderid\":\"001020_3016040\",\"activityname\":\"宁河市场经办人办理\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"2_3016050\",\"activityorderid\":\"001020_3016050\",\"activityname\":\"宁河局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"2_3016060\",\"activityorderid\":\"001020_3016060\",\"activityname\":\"局长审核通过\",\"activityclass\":\"2\",\"workflownode\":\"-3016\"},{\"activityid\":\"3\",\"activityorderid\":\"001030\",\"activityname\":\"交易中心\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"4\",\"activityorderid\":\"001040\",\"activityname\":\"交易中心分发\",\"activityclass\":\"1\",\"workflownode\":\"354\"},{\"activityid\":\"4_354000\",\"activityorderid\":\"001040_354000\",\"activityname\":\"[分发]交易中心办公室经办人发件\",\"activityclass\":\"2\",\"workflownode\":\"-354\"},{\"activityid\":\"4_354010\",\"activityorderid\":\"001040_354010\",\"activityname\":\"[分发]交易中心主任审核\",\"activityclass\":\"2\",\"workflownode\":\"-354\"},{\"activityid\":\"4_354020\",\"activityorderid\":\"001040_354020\",\"activityname\":\"[分发]交易中心副主任\",\"activityclass\":\"2\",\"workflownode\":\"-354\"},{\"activityid\":\"4_354030\",\"activityorderid\":\"001040_354030\",\"activityname\":\"[分发]交易中心部长\",\"activityclass\":\"2\",\"workflownode\":\"-354\"},{\"activityid\":\"4_354040\",\"activityorderid\":\"001040_354040\",\"activityname\":\"[分发]交易中心经办人\",\"activityclass\":\"2\",\"workflownode\":\"-354\"},{\"activityid\":\"4_354050\",\"activityorderid\":\"001040_354050\",\"activityname\":\"[分发]流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-354\"},{\"activityid\":\"5\",\"activityorderid\":\"001050\",\"activityname\":\"交易中心经办人办理\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"6\",\"activityorderid\":\"001060\",\"activityname\":\"交易中心审批流程\",\"activityclass\":\"1\",\"workflownode\":\"374\"},{\"activityid\":\"6_374000\",\"activityorderid\":\"001060_374000\",\"activityname\":\"交易中心经办人\",\"activityclass\":\"2\",\"workflownode\":\"-374\"},{\"activityid\":\"6_374010\",\"activityorderid\":\"001060_374010\",\"activityname\":\"交易中心部长\",\"activityclass\":\"2\",\"workflownode\":\"-374\"},{\"activityid\":\"6_374020\",\"activityorderid\":\"001060_374020\",\"activityname\":\"交易中心副主任\",\"activityclass\":\"2\",\"workflownode\":\"-374\"},{\"activityid\":\"6_374030\",\"activityorderid\":\"001060_374030\",\"activityname\":\"交易中心主任\",\"activityclass\":\"2\",\"workflownode\":\"-374\"},{\"activityid\":\"6_374040\",\"activityorderid\":\"001060_374040\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-374\"},{\"activityid\":\"7\",\"activityorderid\":\"001070\",\"activityname\":\"交易中心经办人\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"8\",\"activityorderid\":\"001080\",\"activityname\":\"区县收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"9\",\"activityorderid\":\"001090\",\"activityname\":\"区县审核\",\"activityclass\":\"1\",\"workflownode\":\"3916\"},{\"activityid\":\"9_3916000\",\"activityorderid\":\"001090_3916000\",\"activityname\":\"宁河市场经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-3916\"},{\"activityid\":\"9_3916010\",\"activityorderid\":\"001090_3916010\",\"activityname\":\"宁河市场科科长初审\",\"activityclass\":\"2\",\"workflownode\":\"-3916\"},{\"activityid\":\"9_3916020\",\"activityorderid\":\"001090_3916020\",\"activityname\":\"宁河副局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-3916\"},{\"activityid\":\"9_3916030\",\"activityorderid\":\"001090_3916030\",\"activityname\":\"宁河局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-3916\"},{\"activityid\":\"9_3916040\",\"activityorderid\":\"001090_3916040\",\"activityname\":\"宁河局长审核通过\",\"activityclass\":\"2\",\"workflownode\":\"-3916\"},{\"activityid\":\"10\",\"activityorderid\":\"001100\",\"activityname\":\"区县归档\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"11\",\"activityorderid\":\"001110\",\"activityname\":\"归档\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"12\",\"activityorderid\":\"001120\",\"activityname\":\"新区土地中心前期部部长\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"13\",\"activityorderid\":\"001130\",\"activityname\":\"新区土地中心分发流程\",\"activityclass\":\"1\",\"workflownode\":\"3501549\"},{\"activityid\":\"13_3501549000\",\"activityorderid\":\"001130_3501549000\",\"activityname\":\"前期部部长\",\"activityclass\":\"2\",\"workflownode\":\"-3501549\"},{\"activityid\":\"13_3501549010\",\"activityorderid\":\"001130_3501549010\",\"activityname\":\"前期部经办人\",\"activityclass\":\"2\",\"workflownode\":\"-3501549\"},{\"activityid\":\"13_3501549020\",\"activityorderid\":\"001130_3501549020\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-3501549\"},{\"activityid\":\"14\",\"activityorderid\":\"001140\",\"activityname\":\"新区土地中心前期部经办人\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"15\",\"activityorderid\":\"001150\",\"activityname\":\"新区土地中心审批流程\",\"activityclass\":\"1\",\"workflownode\":\"3501649\"},{\"activityid\":\"15_3501649000\",\"activityorderid\":\"001150_3501649000\",\"activityname\":\"区县经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-3501649\"},{\"activityid\":\"15_3501649010\",\"activityorderid\":\"001150_3501649010\",\"activityname\":\"前期部部长初审\",\"activityclass\":\"2\",\"workflownode\":\"-3501649\"},{\"activityid\":\"15_3501649020\",\"activityorderid\":\"001150_3501649020\",\"activityname\":\"副主任审核\",\"activityclass\":\"2\",\"workflownode\":\"-3501649\"},{\"activityid\":\"15_3501649030\",\"activityorderid\":\"001150_3501649030\",\"activityname\":\"主任审批\",\"activityclass\":\"2\",\"workflownode\":\"-3501649\"},{\"activityid\":\"15_3501649040\",\"activityorderid\":\"001150_3501649040\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-3501649\"},{\"activityid\":\"16\",\"activityorderid\":\"001160\",\"activityname\":\"新区土地中心前期部经办人\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"99\",\"activityorderid\":\"001990\",\"activityname\":\"流拍\",\"activityclass\":\"1\",\"workflownode\":\"\"}]},\"connection\":{\"total\":\"43\",\"rows\":[{\"fromactivityid\":\"1\",\"toactivityid\":\"2\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2\",\"toactivityid\":\"12\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2\",\"toactivityid\":\"3\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"3\",\"toactivityid\":\"4\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"4\",\"toactivityid\":\"5\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"5\",\"toactivityid\":\"6\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"6\",\"toactivityid\":\"7\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"7\",\"toactivityid\":\"8\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"8\",\"toactivityid\":\"9\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"8\",\"toactivityid\":\"99\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"9\",\"toactivityid\":\"10\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"10\",\"toactivityid\":\"99\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"10\",\"toactivityid\":\"11\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"12\",\"toactivityid\":\"13\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"13\",\"toactivityid\":\"14\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"14\",\"toactivityid\":\"15\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"15\",\"toactivityid\":\"16\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"16\",\"toactivityid\":\"8\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2_3016000\",\"toactivityid\":\"2_3016010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_3016010\",\"toactivityid\":\"2_3016020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_3016020\",\"toactivityid\":\"2_3016030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_3016030\",\"toactivityid\":\"2_3016040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_3016040\",\"toactivityid\":\"2_3016050\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_3016050\",\"toactivityid\":\"2_3016060\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_354000\",\"toactivityid\":\"4_354010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_354010\",\"toactivityid\":\"4_354020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_354020\",\"toactivityid\":\"4_354030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_354030\",\"toactivityid\":\"4_354040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_354040\",\"toactivityid\":\"4_354050\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_374000\",\"toactivityid\":\"6_374010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_374010\",\"toactivityid\":\"6_374020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_374020\",\"toactivityid\":\"6_374030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_374030\",\"toactivityid\":\"6_374040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_3916000\",\"toactivityid\":\"9_3916010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_3916010\",\"toactivityid\":\"9_3916020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_3916020\",\"toactivityid\":\"9_3916030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"9_3916030\",\"toactivityid\":\"9_3916040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"13_3501549000\",\"toactivityid\":\"13_3501549010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"13_3501549010\",\"toactivityid\":\"13_3501549020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"15_3501649000\",\"toactivityid\":\"15_3501649010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"15_3501649010\",\"toactivityid\":\"15_3501649020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"15_3501649020\",\"toactivityid\":\"15_3501649030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"15_3501649030\",\"toactivityid\":\"15_3501649040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"}]}}";
                // message = "{\"activity\":{\"total\":\"40\",\"rows\":[{\"activityid\":\"1\",\"activityorderid\":\"110010\",\"activityname\":\"区县起件\",\"activityclass\":\"1.5\",\"workflownode\":\"\"},{\"activityid\":\"2\",\"activityorderid\":\"110020\",\"activityname\":\"区县审核\",\"activityclass\":\"1\",\"workflownode\":\"300110112\"},{\"activityid\":\"2_300110112000\",\"activityorderid\":\"110020_300110112000\",\"activityname\":\"经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-300110112\"},{\"activityid\":\"2_300110112010\",\"activityorderid\":\"110020_300110112010\",\"activityname\":\"科长审核\",\"activityclass\":\"2\",\"workflownode\":\"-300110112\"},{\"activityid\":\"2_300110112020\",\"activityorderid\":\"110020_300110112020\",\"activityname\":\"主管局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-300110112\"},{\"activityid\":\"2_300110112030\",\"activityorderid\":\"110020_300110112030\",\"activityname\":\"局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-300110112\"},{\"activityid\":\"2_300110112040\",\"activityorderid\":\"110020_300110112040\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-300110112\"},{\"activityid\":\"3\",\"activityorderid\":\"110030\",\"activityname\":\"滨海收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"4\",\"activityorderid\":\"110040\",\"activityname\":\"滨海审核\",\"activityclass\":\"1\",\"workflownode\":\"300110349\"},{\"activityid\":\"4_300110349000\",\"activityorderid\":\"110040_300110349000\",\"activityname\":\"经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-300110349\"},{\"activityid\":\"4_300110349010\",\"activityorderid\":\"110040_300110349010\",\"activityname\":\"科长审核\",\"activityclass\":\"2\",\"workflownode\":\"-300110349\"},{\"activityid\":\"4_300110349020\",\"activityorderid\":\"110040_300110349020\",\"activityname\":\"主管局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-300110349\"},{\"activityid\":\"4_300110349030\",\"activityorderid\":\"110040_300110349030\",\"activityname\":\"局长审批\",\"activityclass\":\"2\",\"workflownode\":\"-300110349\"},{\"activityid\":\"4_300110349040\",\"activityorderid\":\"110040_300110349040\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-300110349\"},{\"activityid\":\"5\",\"activityorderid\":\"110050\",\"activityname\":\"市局收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"6\",\"activityorderid\":\"110060\",\"activityname\":\"市局审核\",\"activityclass\":\"1\",\"workflownode\":\"30011054\"},{\"activityid\":\"6_30011054000\",\"activityorderid\":\"110060_30011054000\",\"activityname\":\"经办人起件\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054010\",\"activityorderid\":\"110060_30011054010\",\"activityname\":\"副处长审核\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054020\",\"activityorderid\":\"110060_30011054020\",\"activityname\":\"处长审核\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054030_1077\",\"activityorderid\":\"110060_30011054030_000000_1077\",\"activityname\":\"研究中心会签_ggnew_yjzxhq\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054030_1075\",\"activityorderid\":\"110060_30011054030_000001_1075\",\"activityname\":\"研究中心会签_ggnew_yjzxhq2\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054030_1074\",\"activityorderid\":\"110060_30011054030_000002_1074\",\"activityname\":\"研究中心会签_ggnew_yjzxhq1\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054040_1069\",\"activityorderid\":\"110060_30011054040_000000_1069\",\"activityname\":\"资源处会签_ggnew_zychq2\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054040_1068\",\"activityorderid\":\"110060_30011054040_000001_1068\",\"activityname\":\"资源处会签_ggnew_zychq1\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054040_1078\",\"activityorderid\":\"110060_30011054040_000002_1078\",\"activityname\":\"资源处会签_ggnew_zychq\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054050_1076\",\"activityorderid\":\"110060_30011054050_000000_1076\",\"activityname\":\"利用处会签_ggnew_lychq\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054050_1066\",\"activityorderid\":\"110060_30011054050_000001_1066\",\"activityname\":\"利用处会签_ggnew_lychq1\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054050_1067\",\"activityorderid\":\"110060_30011054050_000002_1067\",\"activityname\":\"利用处会签_ggnew_lychq2\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054060_1079\",\"activityorderid\":\"110060_30011054060_000000_1079\",\"activityname\":\"权籍处会签_ggnew_qjchq\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054060_1072\",\"activityorderid\":\"110060_30011054060_000001_1072\",\"activityname\":\"权籍处会签_ggnew_qjchq1\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054060_1073\",\"activityorderid\":\"110060_30011054060_000002_1073\",\"activityname\":\"权籍处会签_ggnew_qjchq2\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054070_1065\",\"activityorderid\":\"110060_30011054070_000000_1065\",\"activityname\":\"地矿处会签_ggnew_dkchq\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054070_1070\",\"activityorderid\":\"110060_30011054070_000001_1070\",\"activityname\":\"地矿处会签_ggnew_dkchq1\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054070_1071\",\"activityorderid\":\"110060_30011054070_000002_1071\",\"activityname\":\"地矿处会签_ggnew_dkchq2\",\"activityclass\":\"3\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054080\",\"activityorderid\":\"110060_30011054080\",\"activityname\":\"处长审批\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054090\",\"activityorderid\":\"110060_30011054090\",\"activityname\":\"局领导审批\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054100\",\"activityorderid\":\"110060_30011054100\",\"activityname\":\"经办人办理\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"6_30011054110\",\"activityorderid\":\"110060_30011054110\",\"activityname\":\"流程结束\",\"activityclass\":\"2\",\"workflownode\":\"-30011054\"},{\"activityid\":\"7\",\"activityorderid\":\"110070\",\"activityname\":\"区县收件\",\"activityclass\":\"1\",\"workflownode\":\"\"},{\"activityid\":\"8\",\"activityorderid\":\"110080\",\"activityname\":\"归档\",\"activityclass\":\"1\",\"workflownode\":\"\"}]},\"connection\":{\"total\":\"42\",\"rows\":[{\"fromactivityid\":\"1\",\"toactivityid\":\"2\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"1\",\"toactivityid\":\"10\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2\",\"toactivityid\":\"3\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2\",\"toactivityid\":\"5\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"3\",\"toactivityid\":\"4\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"4\",\"toactivityid\":\"5\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"5\",\"toactivityid\":\"6\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"6\",\"toactivityid\":\"7\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"7\",\"toactivityid\":\"8\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"1\"},{\"fromactivityid\":\"2_300110112000\",\"toactivityid\":\"2_300110112010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_300110112010\",\"toactivityid\":\"2_300110112020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_300110112020\",\"toactivityid\":\"2_300110112030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"2_300110112030\",\"toactivityid\":\"2_300110112040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_300110349000\",\"toactivityid\":\"4_300110349010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_300110349010\",\"toactivityid\":\"4_300110349020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_300110349020\",\"toactivityid\":\"4_300110349030\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"4_300110349030\",\"toactivityid\":\"4_300110349040\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_30011054000\",\"toactivityid\":\"6_30011054010\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_30011054010\",\"toactivityid\":\"6_30011054020\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_30011054020\",\"toactivityid\":\"6_30011054030_1077\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054030_1077\",\"toactivityid\":\"6_30011054030_1075\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054030_1075\",\"toactivityid\":\"6_30011054030_1074\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054020\",\"toactivityid\":\"6_30011054040_1069\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054040_1069\",\"toactivityid\":\"6_30011054040_1068\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054040_1068\",\"toactivityid\":\"6_30011054040_1078\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054020\",\"toactivityid\":\"6_30011054050_1076\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054050_1076\",\"toactivityid\":\"6_30011054050_1066\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054050_1066\",\"toactivityid\":\"6_30011054050_1067\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054020\",\"toactivityid\":\"6_30011054060_1079\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054060_1079\",\"toactivityid\":\"6_30011054060_1072\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054060_1072\",\"toactivityid\":\"6_30011054060_1073\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054020\",\"toactivityid\":\"6_30011054070_1065\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054070_1065\",\"toactivityid\":\"6_30011054070_1070\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054070_1070\",\"toactivityid\":\"6_30011054070_1071\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054030_1074\",\"toactivityid\":\"6_30011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054040_1078\",\"toactivityid\":\"6_30011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054050_1067\",\"toactivityid\":\"6_30011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054060_1073\",\"toactivityid\":\"6_30011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054070_1071\",\"toactivityid\":\"6_30011054080\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"3\"},{\"fromactivityid\":\"6_30011054080\",\"toactivityid\":\"6_30011054090\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_30011054090\",\"toactivityid\":\"6_30011054100\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"},{\"fromactivityid\":\"6_30011054100\",\"toactivityid\":\"6_30011054110\",\"connectionid\":\"\",\"connectionname\":\"\",\"connectionclass\":\"2\"}]}}";
                resultDic["message"] = message;
            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        private string getOrderId(string orderid)
        {
            if (orderid.Length == 1)
            {
                return "00000" + orderid;
            }
            else if (orderid.Length == 2)
            {
                return "0000" + orderid;
            }
            else if (orderid.Length == 3)
            {
                return "000" + orderid;
            }
            else if (orderid.Length == 4)
            {
                return "00" + orderid;
            }
            else if (orderid.Length == 5)
            {
                return "0" + orderid;
            }
            else if (orderid.Length == 6)
            {
                return "" + orderid;
            }
            else
            {
                return "" + orderid;
            }
        }

        private DataSet getDsUser(DataSet ds_jd, int j, string sqlString, Eva.Library.Data.AccessData.IAccessData _iAccessData_auth)
        {
            DataSet ds_user = null;
            // 0：用户ID；   1：角色ID；   2：岗位ID；   3：机构ID；
            switch (ds_jd.Tables[0].Rows[j]["czrygz"].ToString())
            {
                case "0":
                    sqlString = "select u_id,u_name from t_user where u_id in ('" + ds_jd.Tables[0].Rows[j]["czryid"].ToString().Replace(",", "','") + "') order by u_id";
                    ds_user = _iAccessData_auth.Query(sqlString);
                    break;
                case "1":
                    {
                        sqlString = "select r.r_id, u.u_id,u.u_name from t_user u,t_userrole_relation r";
                        sqlString += " where u.u_id = r.u_id";
                        sqlString += " and r.r_id in ('" + ds_jd.Tables[0].Rows[j]["czryid"].ToString().Replace(",", "','") + "')";
                        sqlString += " order by r.r_id,u.u_id";
                        DataSet ds = _iAccessData_auth.Query(sqlString);

                        DataTable dt_temp = new DataTable();

                        DataColumn dc = new DataColumn();
                        dc.ColumnName = "u_id";
                        dt_temp.Columns.Add(dc);

                        dc = new DataColumn();
                        dc.ColumnName = "u_name";
                        dt_temp.Columns.Add(dc);

                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            if (dt_temp.Select(" u_id = '" + ds.Tables[0].Rows[i]["u_id"].ToString() + "' and u_name = '" + ds.Tables[0].Rows[i]["u_name"].ToString() + "'").Length <= 0)
                            {
                                DataRow dr = dt_temp.NewRow();
                                dr["u_id"] = ds.Tables[0].Rows[i]["u_id"].ToString();
                                dr["u_name"] = ds.Tables[0].Rows[i]["u_name"].ToString();

                                dt_temp.Rows.Add(dr);
                            }

                        }

                        ds_user = new DataSet();
                        ds_user.Tables.Add(dt_temp);
                    }
                    
                        break;
                case "2":
                        {
                            sqlString = "select r.p_id,u.u_id,u.u_name from t_user u,t_userposition_relation r";
                            sqlString += " where u.u_id = r.u_id";
                            sqlString += " and r.p_id in ('" + ds_jd.Tables[0].Rows[j]["czryid"].ToString().Replace(",", "','") + "')";
                            sqlString += " order by r.p_id,u.u_id";
                            DataSet ds = _iAccessData_auth.Query(sqlString);

                            DataTable dt_temp = new DataTable();

                            DataColumn dc = new DataColumn();
                            dc.ColumnName = "u_id";
                            dt_temp.Columns.Add(dc);

                            dc = new DataColumn();
                            dc.ColumnName = "u_name";
                            dt_temp.Columns.Add(dc);

                            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                            {
                                if (dt_temp.Select(" u_id = '" + ds.Tables[0].Rows[i]["u_id"].ToString() + "' and u_name = '" + ds.Tables[0].Rows[i]["u_name"].ToString() + "'").Length <= 0)
                                {
                                    DataRow dr = dt_temp.NewRow();
                                    dr["u_id"] = ds.Tables[0].Rows[i]["u_id"].ToString();
                                    dr["u_name"] = ds.Tables[0].Rows[i]["u_name"].ToString();

                                    dt_temp.Rows.Add(dr);
                                }

                            }
                            ds_user = new DataSet();
                            ds_user.Tables.Add(dt_temp);
                        }
                        
                    break;
                case "3":
                    sqlString = "select u_id,u_name from t_user where u_organid in ('" + ds_jd.Tables[0].Rows[j]["czryid"].ToString().Replace(",", "','") + "') order by u_organid, u_id";
                    ds_user = _iAccessData_auth.Query(sqlString);
                    break;
            }

            return ds_user;
        }

        private string getLogContent(DataRow[] drs)
        {
            string logcontent = "";

            foreach (DataRow dr in drs)
            {
                logcontent += dr["username"].ToString() + "`";
                logcontent += dr["logdate"] + "`";
                logcontent += dr["remark"] + "";
                logcontent += "~";
            }
            return logcontent.TrimEnd('~');
        }
    }
}
