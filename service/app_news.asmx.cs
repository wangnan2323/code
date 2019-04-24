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
    /// app_news 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_news : System.Web.Services.WebService
    {
        private sara.dd.ldsw.idal.Itbl_app_news _idal_tbl_app_news = new sara.dd.ldsw.dal.tbl_app_news();
        private sara.dd.ldsw.idal.Itbl_app_news_title _idal_tbl_app_news_title = new sara.dd.ldsw.dal.tbl_app_news_title();
        private sara.dd.ldsw.idal.Itbl_app_news_content _idal_tbl_app_news_content = new sara.dd.ldsw.dal.tbl_app_news_content();
        private sara.dd.ldsw.idal.Itbl_app_news_discuss _idal_tbl_app_news_discuss = new sara.dd.ldsw.dal.tbl_app_news_discuss();
        private sara.dd.ldsw.idal.Itbl_app_news_like _idal_tbl_app_news_like = new sara.dd.ldsw.dal.tbl_app_news_like();

        /// <summary>
        /// 未登录用户可见新闻
        /// </summary>
        private string _usergroup105 = "105";


        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNewsList(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
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
                    #region rows
                    sqlString = "";
                    sqlString += " select * ";
                    sqlString += " from(select a.*, rownum as rn";
                    sqlString += " from(";
                    sqlString += " select ";
                    sqlString += GetColumnString(userIdString);
                    sqlString += " from tbl_app_news n";

                    sqlString += " where ";
                    sqlString += GetWhereString(userIdString, whereString);

                    sqlString += " order by ";
                    if (orderByString == "")//默认按照序号倒叙
                    {
                        sqlString += " to_number(sys_orderid) desc ";
                    }
                    sqlString += " ) a) b";

                    if (countString != "" && stepString != "")
                    {
                        sqlString += " where b.rn > '" + countString + "'";
                        sqlString += " and b.rn <= '" + (int.Parse(countString) + int.Parse(stepString)).ToString() + "'";
                    }


                    DataSet ds = _iAccessData.Query(sqlString);
                    string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(ds.Tables[0]);
                    #endregion

                    #region count
                    sqlString = "";
                    sqlString += " select count(*)";
                    sqlString += " from tbl_app_news n";
                    sqlString += " where ";
                    sqlString += GetWhereString(userIdString, whereString);
                    string total = _iAccessData.GetSingle(sqlString).ToString();
                    #endregion

                    string message = "{\"total\":\"" + total + "\",\"rows\":" + rows + "}";
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


        private string GetColumnString(string userIdString)
        {
            string sqlString = "";
            //是否显示topbar
            sqlString += " f_value2 as ishiddentopbar,";
            //创建人头像
            sqlString += " f_value1 as creatuserimg,";
            //创建人
            sqlString += " sys_lasteditusername as creatusername,";
            //标题
            sqlString += " sys_id as newsid,";
            //标题
            sqlString += " f_title as title,";
            //简述
            sqlString += " f_resume as resume,";
            //新闻类型
            sqlString += " f_newstype as newstype,";
            //标题类型
            sqlString += " f_titletypeid as titletypeid,";
            //标题图片^分割
            sqlString += " (select replace(wm_concat(f_mediaurl),',','^') from (select fk_tbl_app_news_sys_id,f_mediaurl from tbl_app_news_title order by sys_id) where fk_tbl_app_news_sys_id = n.sys_id) as titleimgurls,";
            //标题图片描述^分割
            sqlString += " (select replace(concat_str(cast(collect(f_mediadesc) as concattype)),',','^')  from (select fk_tbl_app_news_sys_id,f_mediadesc from tbl_app_news_title order by sys_id) where fk_tbl_app_news_sys_id = n.sys_id) as titleimgresumes,";
            //评论数
            sqlString += " (select count(*) from tbl_app_news_discuss where fk_tbl_app_news_sys_id = n.sys_id ) as discusscount,";
            //点赞数
            sqlString += " (select count(*) from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and f_liketypeid = '1' ) as likecount,";
            //不赞数
            sqlString += " (select count(*) from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and f_liketypeid = '2' ) as unlikecount,";

            if (userIdString == "")
            {
                sqlString += " 'false' as isliked,";

                sqlString += " 'false' as isunliked,";
            }
            else
            {
                //用户是否点赞
                sqlString += " (select decode( count(*),0,'false','true') from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and fk_t_user_id = '" + userIdString + "' and f_liketypeid = '1' ) as isliked,";
                //用户是否不赞
                sqlString += " (select decode( count(*),0,'false','true') from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and fk_t_user_id = '" + userIdString + "' and f_liketypeid = '2' ) as isunliked,";
            }


            //内容类型
            sqlString += " f_contenttypeid as contenttypeid,";
            if (userIdString == "")
            {
                //是否可以评论
                sqlString += " 'false' as iscandiscuss,";
            }
            else
            {
                //是否可以评论                
                //sqlString += " (select decode(decode(count(*), 0, 'false', 'true') || '_' || f_isdiscuss, 'true_true', 'true', 'false') from t_usergroup_relation ugr where ugr.u_id = '" + userIdString + "' and ','||n.f_discussrangeid||',' like '%,'||ugr.g_id||',%'  and  ugr.g_id = '" + _usergroup107 + "' ) as iscandiscuss,";
                sqlString += " decode( f_checknewsdiscuss('" + userIdString + "',f_discussrangeid)||f_isdiscuss,'truetrue','true','false') as iscandiscuss, ";

            }
            //发布时间
            sqlString += " f_releasedate as releasedate,";
            //发布时间2
            sqlString += " f_timedifferent(f_releasedate)  as timedifferent ";

            return sqlString;
        }
        private string GetWhereString(string userIdString, string whereString)
        {
            string sqlString = "";

            //已发布的新闻
            sqlString += " f_isrelease = 'true'";
            if (userIdString == "")
            {
                sqlString += " and ','||n.f_viewrangeid||',' like '%," + _usergroup105 + ",%'";
            }
            else
            {
                sqlString += "  and f_checknewsview('" + userIdString + "', f_viewrangeid) = 'true'";

                //sqlString += " and ( select count(*) from t_usergroup_relation ugr where ugr.u_id = '" + userIdString + "' and ','||n.f_viewrangeid||',' like '%,'||ugr.g_id||',%'  and ugr.g_id = '" + _usergroup108 + "' ) > 0";
            }

            if (whereString != "")
            {
                sqlString += "  and ";
                sqlString += whereString;
            }

            return sqlString;

        }


        //============================================
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddDiscuss(string newsIdString, string contentString, string discussNodeIdString, string clientInf)
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

                    string userid = userInfDic["userid"].ToString();
                    string username = userInfDic["username"].ToString();
                    string userimg = userInfDic["userimg"].ToString();

                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string nodeid = _iAccessData.GetSingle(GetNodeIdSqlString(discussNodeIdString)).ToString();

                    if (nodeid.Length == 1)
                    {
                        nodeid = "000" + nodeid;
                    }
                    else if (nodeid.Length == 2)
                    {
                        nodeid = "00" + nodeid;
                    }
                    else if (nodeid.Length == 3)
                    {
                        nodeid = "0" + nodeid;
                    }

                    sara.dd.ldsw.model.tbl_app_news_discuss model = new sara.dd.ldsw.model.tbl_app_news_discuss();
                    model.fk_tbl_app_news_sys_id = newsIdString.Trim();
                    model.f_discusscontent = commonclass.emojiclass.encodeEmoji(contentString);
                    model.fk_t_user_id = userid;
                    model.f_username = username;
                    model.f_userimg = userimg;
                    model.f_nodeid = nodeid;
                    model.sys_creatdate = System.DateTime.Now;
                    model.sys_creatuserid = userid;
                    model.sys_creatusername = username;

                    model.sys_lasteditdate = System.DateTime.Now;
                    model.sys_lastedituserid = userid;
                    model.sys_lasteditusername = username;

                    model.sys_delflag = "0";

                    _idal_tbl_app_news_discuss.Add(model, null);

                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
            }
            catch (Exception ex)
            {

                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        private string GetNodeIdSqlString(string f_nodeid)
        {
            string whereString = " length(f_nodeid)=4 ";
            string columnsString = "  nvl(max(to_number(f_nodeid)),0)+1 ";
            if (f_nodeid != "")
            {
                whereString = " f_nodeid like '" + f_nodeid + "%' and length(f_nodeid)='" + (f_nodeid.Length + 4) + "' ";
                columnsString = " nvl(max(to_number(substr(f_nodeid," + f_nodeid.Length + "+1,4))),0)+1 ";
            }
            string sql = "select " + columnsString + " as newcode from tbl_app_news_discuss where ";

            sql += whereString;

            return sql;
            //resultDic["message"] = _iAccessData.Query(sql).Tables[0].Rows[0]["newcode"].ToString();
        }





        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void AddLikeCross(string newsIdString, string isLikeString, string clientInf)
        {
            string result1 = this.AddLike(newsIdString, isLikeString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddLike(string newsIdString, string isLikeString, string clientInf)
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
                    #region MyRegion
                    string userid = userInfDic["userid"].ToString();
                    string username = userInfDic["username"].ToString();
                    string userimg = userInfDic["userimg"].ToString();
                    string whereString = " fk_t_user_id = '" + userid + "' and fk_tbl_app_news_sys_id = '" + newsIdString + "'";
                    List<sara.dd.ldsw.model.tbl_app_news_like> modellist = _idal_tbl_app_news_like.GetList(whereString, "", "*", "", "", null);
                    if (modellist.Count == 0)
                    {
                        sara.dd.ldsw.model.tbl_app_news_like model = new sara.dd.ldsw.model.tbl_app_news_like();
                        model.fk_tbl_app_news_sys_id = newsIdString;
                        model.fk_t_user_id = userid;
                        model.f_username = username;
                        model.f_userimg = userimg;
                        if (isLikeString == "true")
                        {
                            model.f_liketypeid = "1";
                            model.f_liketype = "赞";
                        }
                        else
                        {
                            model.f_liketypeid = "2";
                            model.f_liketype = "踩";
                        }

                        model.sys_creatdate = System.DateTime.Now;
                        model.sys_creatuserid = userid;
                        model.sys_creatusername = username;

                        model.sys_lasteditdate = System.DateTime.Now;
                        model.sys_lastedituserid = userid;
                        model.sys_lasteditusername = username;

                        model.sys_delflag = "0";

                        _idal_tbl_app_news_like.Add(model, null);
                    }
                    else
                    {
                        sara.dd.ldsw.model.tbl_app_news_like model = modellist[0];

                        if (isLikeString == "true" && model.f_liketypeid == "1")
                        {
                            //删除数据
                            _idal_tbl_app_news_like.Delete(whereString, null);
                        }
                        else if (isLikeString == "true" && model.f_liketypeid == "2")
                        {
                            model.f_liketypeid = "1";
                            model.f_liketype = "赞";
                            model.sys_lasteditdate = System.DateTime.Now;
                            model.sys_lastedituserid = userid;
                            model.sys_lasteditusername = userimg;
                            _idal_tbl_app_news_like.Update(model, "f_liketypeid,f_liketype,sys_lasteditdate,sys_lastedituserid,sys_lasteditusername", null);
                        }
                        else if (isLikeString == "false" && model.f_liketypeid == "1")
                        {
                            model.f_liketypeid = "2";
                            model.f_liketype = "踩";
                            _idal_tbl_app_news_like.Update(model, "f_liketypeid,f_liketype,sys_lasteditdate,sys_lastedituserid,sys_lasteditusername", null);
                        }
                        else if (isLikeString == "false" && model.f_liketypeid == "2")
                        {
                            //删除数据
                            _idal_tbl_app_news_like.Delete(whereString, null);
                        }
                    }
                    #endregion

                    resultDic["result"] = "true";
                    resultDic["message"] = "";
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetNewsContentType1Cross(string newsIdString, string clientInf)
        {
            string result1 = this.GetNewsContentType1(newsIdString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNewsContentType1(string newsIdString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            //string newsIdString = "11";
            //string clientInf = "{\"userid\":\"1280\",\"devicetype\":\"ios\"}";
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
                    _iAccessData = commonclass.commonclass.CreateIAccessData();
                    string userIdString = userInfDic["userid"].ToString();
                    string sqlString = "";
                    sqlString += " select ";

                    //创建人头像
                    sqlString += " f_value1 as creatuserimg,";
                    //创建人
                    sqlString += " sys_lasteditusername as creatusername,";
                    //标题
                    sqlString += " f_title as title,";
                    //简述
                    sqlString += " f_resume as resume,";
                    //新闻类型
                    sqlString += " f_newstype as newstype,";
                    //评论数
                    sqlString += " (select count(*) from tbl_app_news_discuss where fk_tbl_app_news_sys_id = n.sys_id ) as discusscount,";
                    //点赞数
                    sqlString += " (select count(*) from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and f_liketypeid = '1' ) as likecount,";
                    //不赞数
                    sqlString += " (select count(*) from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and f_liketypeid = '2' ) as unlikecount,";

                    if (userIdString == "")
                    {
                        sqlString += " 'false' as isliked,";

                        sqlString += " 'false' as isunliked,";
                    }
                    else
                    {
                        //用户是否点赞
                        sqlString += " (select decode( count(*),0,'false','true') from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and fk_t_user_id = '" + userIdString + "' and f_liketypeid = '1' ) as isliked,";
                        //用户是否不赞
                        sqlString += " (select decode( count(*),0,'false','true') from tbl_app_news_like where fk_tbl_app_news_sys_id = n.sys_id and fk_t_user_id = '" + userIdString + "' and f_liketypeid = '2' ) as isunliked,";
                    }
                    if (userIdString == "")
                    {
                        //是否可以评论
                        sqlString += " 'false' as iscandiscuss,";
                    }
                    else
                    {
                        //是否可以评论                
                        //sqlString += " (select decode(decode(count(*), 0, 'false', 'true') || '_' || f_isdiscuss, 'true_true', 'true', 'false') from t_usergroup_relation ugr where ugr.u_id = '" + userIdString + "' and ','||n.f_discussrangeid||',' like '%,'||ugr.g_id||',%'  and  ugr.g_id = '" + _usergroup107 + "' ) as iscandiscuss,";
                        sqlString += " decode( f_checknewsdiscuss('" + userIdString + "',f_discussrangeid)||f_isdiscuss,'truetrue','true','false') as iscandiscuss, ";

                    }
                    //发布时间
                    sqlString += " f_releasedate as releasedate,";
                    //发布时间2
                    sqlString += " f_timedifferent(f_releasedate)  as timedifferent, ";
                    //新闻内容
                    sqlString += " f_content as content, ";
                    //标签
                    sqlString += " f_tag  as tag";
                    sqlString += " from tbl_app_news n ";
                    sqlString += " where sys_id = '" + newsIdString + "' ";
                    DataTable dt = _iAccessData.Query(sqlString).Tables[0];
                    string content1rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                    sqlString = "";
                    sqlString += " select newsid, title, contenttypeid from( ";
                    if (dt.Rows.Count > 0)
                    {
                        string[] tagArray = dt.Rows[0]["tag"].ToString().Split(' ');
                        for (int i = 0; i < tagArray.Length; i++)
                        {
                            sqlString += " ( ";
                            sqlString += " select newsid, title, contenttypeid from ";
                            sqlString += " ( ";
                            sqlString += " select  sys_id as newsid, f_title as title,";

                            sqlString += " f_contenttypeid as contenttypeid ";

                            sqlString += " from tbl_app_news where sys_id !='" + newsIdString + "' and f_tag like '%" + tagArray[i].ToString() + "%' and f_contenttypeid in ('1','2') order by  to_number(sys_orderid) desc ";
                            sqlString += " ) ";
                            sqlString += " where rownum = 1 ";
                            sqlString += " ) ";


                            if (i != tagArray.Length - 1)
                            {
                                sqlString += " union all ";
                            }
                        }
                    }
                    sqlString += " )  ";

                    string tagrows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(_iAccessData.Query(sqlString).Tables[0]);
                    resultDic["result"] = "true";
                    resultDic["message"] = "{\"content1rows\":" + content1rows + ",\"tagrows\":" + tagrows + "}";
                }
            }
            catch (Exception ex)
            {
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void GetDiscussListCross(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            string result1 = this.GetDiscussList(whereString, orderByString, columnsString, countString, stepString, clientInf);
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["d"] = result1;
            string result = Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
            string callback = HttpContext.Current.Request["jsoncallback"];

            HttpContext.Current.Response.Write(callback + "(" + result + ")");
            HttpContext.Current.Response.End();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDiscussList(string whereString, string orderByString, string columnsString, string countString, string stepString, string clientInf)
        {
            Dictionary<string, string> resultDic = new Dictionary<string, string>();
            resultDic["result"] = "";
            resultDic["message"] = "";
            try
            {
                columnsString = "f_timedifferent(sys_creatdate) as timedifferent^f_discusscontent^f_nodeid^fk_t_user_id^f_username^f_userimg";
                columnsString = FormatDiscussColumns(columnsString).Replace("^", ",");

                DataTable dt = _idal_tbl_app_news_discuss.GetDataTable(whereString, orderByString, columnsString, countString, stepString, null);

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    dt.Rows[i]["f_discusscontent"] = commonclass.emojiclass.dencodeEmoji(dt.Rows[i]["f_discusscontent"].ToString());
                }
                string rows = Eva.Library.Format.FormatEntityTool.FormatDataTableToJson(dt);

                string message = "{\"total\":\"" + _idal_tbl_app_news_discuss.GetCount(whereString, null) + "\",\"rows\":" + rows + "}";
                resultDic["message"] = message;
                resultDic["result"] = "true";

            }
            catch (Exception ex)
            {
                resultDic["result"] = "false";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);

            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="columns"></param>
        /// <returns></returns>
        private string FormatDiscussColumns(string columns)
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

                columns += "^" + "fk_tbl_app_news_sys_id";

                columns += "^" + "f_discusscontent";

                columns += "^" + "f_nodeid";

                columns += "^" + "fk_t_user_id";

                columns += "^" + "f_username";

                columns += "^" + "f_userimg";


            }
            return columns.TrimStart('^');
        }
    }
}


