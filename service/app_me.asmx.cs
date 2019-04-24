using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Web.Script.Services;

namespace sara.dd.ldsw.service
{
    /// <summary>
    /// app_me 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_me : System.Web.Services.WebService
    {

        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetMeList(string value2String,string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                IDictionary<String, String> userInfDic = commonclass.commonclass.CheckClientInf(clientInf);
                if (userInfDic == null)
                {
                    resultDic["result"] = "false";
                    resultDic["message"] = "客户端信息错误";
                }
                else
                {
                    string userIdString = userInfDic["userid"].ToString();
                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string sqlString = "";
                    List<String> sectionCodeList = new List<string>();
                    string sectionNames = "";
                    string sectionValues = "";
                    Dictionary<String, String> sectionContentDic = new Dictionary<string, string>();
                    //===============获取用indexview节点下的全部字段

                    //==用户的全部字段
                    DataSet userFieldDataSet = sara.platform.service.auth.Service.GetUserFieldByUserid(userIdString);
                    //找到meview根节点
                    string whereString8 = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
                    whereString8 += " and len(F_NODEID) = 8 ";
                    whereString8 += " and f_value2 = '" + value2String + "'";
                    DataRow[] userFieldDataRow8 = userFieldDataSet.Tables[0].Select(whereString8);//应该只有一行数据
                    int hh = 0;
                    for (int i = 0; i < userFieldDataRow8.Length; i++)
                    {
                        string whereString12 = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
                        whereString12 += " and len(F_NODEID) = 12 ";
                        whereString12 += "and F_NODEID like '" + userFieldDataRow8[i]["F_NODEID"].ToString() + "%'";
                        //得到indexview下section节点
                        DataRow[] userFieldDataRow12 = userFieldDataSet.Tables[0].Select(whereString12);

                        for (int j = 0; j < userFieldDataRow12.Length; j++)
                        {
                            string sectionCode = userFieldDataRow12[j]["f_value1"].ToString() + "_" + i.ToString() + j.ToString();
                            sectionCodeList.Add(sectionCode);

                            sectionNames += userFieldDataRow12[j]["f_name"].ToString() + "^";
                            if( userFieldDataRow12[j]["f_value2"].ToString() == "")
                            {
                                sectionValues += "0^";
                            }
                            else
                            {
                                sectionValues += userFieldDataRow12[j]["f_value2"].ToString() + "^";
                            }
                            

                            //读取16级子节点的f_value10的置，
                            string whereString16 = " ','+sys_appcode+',' like '%," + Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"] + ",%' ";
                            whereString16 += " and len(F_NODEID) = 16 ";
                            whereString16 += "and F_NODEID like '" + userFieldDataRow12[j]["F_NODEID"].ToString() + "%'";
                            //得到section下按钮节点
                            DataRow[] userFieldDataRow16 = userFieldDataSet.Tables[0].Select(whereString16);

                            switch (userFieldDataRow12[j]["f_value1"].ToString())
                            {
                                case "iconbutton0":
                                case "iconbutton1":
                                case "iconbuttontable":
                                    string iconButtonString = "[";
                                    for (int k = 0; k < userFieldDataRow16.Length; k++)
                                    {
                                        iconButtonString += "{";
                                        iconButtonString += "\"title\":\"" + userFieldDataRow16[k]["f_name"].ToString() + "\",";
                                        iconButtonString += "\"icon\":\"" + userFieldDataRow16[k]["f_value10"].ToString() + "\",";
                                        iconButtonString += "\"value1\":\"" + userFieldDataRow16[k]["f_value1"].ToString() + "\",";
                                        iconButtonString += "\"value2\":\"" + userFieldDataRow16[k]["f_value2"].ToString() + "\",";
                                        iconButtonString += "\"badge\":\"\"";
                                        iconButtonString += "},";
                                       
                                    }
                                    iconButtonString = iconButtonString.TrimEnd(',');
                                    iconButtonString += "]";
                                    sectionContentDic[sectionCode] = iconButtonString;
                                    break;
                                case "imgscroll0":
                                case "imgscroll1":
                                case "imgbutton0":
                                case "imgbutton1":
                                case "imgtext":
                                    //通过tbl_app_me构造数据
                                    {                                       
                                        string sys_ids = "";
                                        List<String> value1Array = new List<string>();
                                        List<String> value2Array = new List<string>();
                                        for (int k = 0; k < userFieldDataRow16.Length; k++)
                                        {
                                            sys_ids += userFieldDataRow16[k]["f_value10"].ToString() + "^";
                                            value1Array.Add(userFieldDataRow16[k]["f_value1"].ToString());
                                            value2Array.Add(userFieldDataRow16[k]["f_value2"].ToString());
                                        }
                                        sys_ids = sys_ids.TrimEnd('^');

                                        sqlString = "";
                                        sqlString += " select ";
                                        sqlString += GetColumnString();
                                        sqlString += " from tbl_app_me n";
                                        sqlString += " where 1 = 1";
                                        sqlString += " and sys_id in ('" + sys_ids.Replace("^", "','") + "')";
                                       
                                        DataTable dt = _iAccessData.Query(sqlString).Tables[0];

                                        DataTable dtsort = dt.Copy();
                                        dtsort.Clear();
                                        string[] sys_idsArray = sys_ids.Split('^');
                                        for (int m = 0; m < sys_idsArray.Length; m++)
                                        {                                           
                                            for (int n = 0; n < dt.Rows.Count; n++)
                                            {
                                                hh += 1;
                                                if( dt.Rows[n]["indexid"].ToString() == sys_idsArray[m])
                                                {
                                                    dt.Rows[n]["value1"] = value1Array[m];
                                                    dt.Rows[n]["value2"] = value2Array[m];
                                                    dtsort.Rows.Add(dt.Rows[n].ItemArray);                                                   
                                                    break;
                                                }
                                            }                                            
                                        }
                                        //重新计算顺序
                                        //====================
                                        string sectionContentString = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dtsort);
                                        sectionContentDic[sectionCode] = sectionContentString;
                                    }
                                    break;
                            }
                        }
                    }

                    string sectionCodes = "";
                    for (int i = 0; i < sectionCodeList.Count; i++)
                    {
                        sectionCodes += sectionCodeList[i].ToString() + "^";
                    }
                    string sectionCount = sectionCodeList.Count.ToString();
                    string message = "{";
                    message += "\"sectionNames\":\"" + sectionNames.Substring(0, sectionNames.Length - 1) + "\",";//解决名字全部为空的问题，所以不能用TrimEnd
                    message += "\"sectionCodes\":\"" + sectionCodes.TrimEnd('^') + "\",";
                    message += "\"sectionValues\":\"" + sectionValues.TrimEnd('^') + "\",";
                    message += "\"sectionCount\":\"" + sectionCount + "\",";

                    for (int i = 0; i < sectionCodeList.Count; i++)
                    {
                        message += "\"" + sectionCodeList[i].ToString() + "\":" + sectionContentDic[sectionCodeList[i].ToString()].ToString() + ",";
                    }


                    message = message.TrimEnd(',');
                    message += "}";

                    resultDic["result"] = "true";
                    resultDic["message"] = message;
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        private string GetColumnString()
        {
            string sqlString = "";
            //是否显示topbar
            //sqlString += " f_value2 as ishiddentopbar,";
            ////创建人头像
            //sqlString += " f_value1 as creatuserimg,";
            ////创建人
            //sqlString += " sys_lasteditusername as creatusername,";
          
            //标题
            sqlString += " f_title as title,";
            //简述
            sqlString += " f_resume as resume,";
            //新闻类型
            sqlString += " f_indextype as indextype,";
            //标题类型
            sqlString += " f_titletypeid as titletypeid,";
            //标题图片^分割
            sqlString += " (select replace(wm_concat(f_mediaurl),',','^') from (select fk_tbl_app_me_sys_id,f_mediaurl from tbl_app_me_title order by sys_id) where fk_tbl_app_me_sys_id = n.sys_id) as titleimgurls,";
            //标题图片描述^分割
            sqlString += " (select replace(concat_str(cast(collect(f_mediadesc) as concattype)),',','^')  from (select fk_tbl_app_me_sys_id,f_mediadesc from tbl_app_me_title order by sys_id) where fk_tbl_app_me_sys_id = n.sys_id) as titleimgresumes,";
            //评论数
            //sqlString += " '0' as discusscount,";
            ////点赞数
            //sqlString += " '0' as likecount,";
            ////不赞数
            //sqlString += " '0'  as unlikecount,";

            //sqlString += " 'false' as isliked,";

            //sqlString += " 'false' as isunliked,";




            ////内容类型
            //sqlString += " '--' as contenttypeid,";
            ////是否可以评论
            //sqlString += " 'false' as iscandiscuss,";


            ////发布时间
            //sqlString += " f_releasedate as releasedate,";
            ////发布时间2
            //sqlString += " f_timedifferent(f_releasedate) as timedifferent ";
            sqlString += " '' as value1,";
            sqlString += " '' as value2,";
         
            //标题
            sqlString += " sys_id as indexid";

            return sqlString;
        }

    }
}
