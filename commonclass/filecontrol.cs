using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.commonclass
{
    public class filecontrol
    {
        #region 变量属性
        private static string _serviceFile_url = Eva.Library.Configuration.ConfigurationManager.AppSettings["ServiceFile"].ToString();
        private static Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.CreateIAccessData();
        private static string _fileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString();
        #endregion

        #region 公有方法


        /// <summary>
        /// 获取新的FILEID
        /// </summary>
        /// <returns></returns>
        public static string GetNewFileId(Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string sql = "select max(id) from tbl_file_menu ";
            object o;
            string fileid = "";
            if (t == null)
            {
                fileid = ((o = _iAccessData.GetSingle(sql)) == null ? "0" : o.ToString());
            }
            else
            {
                fileid = ((o = t.GetSingle(sql)) == null ? "0" : o.ToString());
            }
            if (fileid == "")
            {
                fileid = "0";
            }
            fileid = (int.Parse(fileid) + 1).ToString();
            sql = "insert into tbl_file_menu(id,hascontent) values('" + fileid + "','1')";            
            if (t == null)
            {
                _iAccessData.ExecuteSql(sql);
            }
            else
            {
                t.ExecuteSql(sql);
            }

            return fileid;
        }



        /// <summary>
        /// 删除附件
        /// </summary>
        /// <param name="fileID">附件ID</param>
        /// <param name="delmod">1：物理删除，2：逻辑删除</param>
        /// <param name="isfilelog">1：记录日志，2：不记录日志</param>
        /// <param name="clientInf">用户信息</param>
        /// <returns></returns>
        public static void deleteByFileName(string fileIDs, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            //删除物理文件
            string fileuploadname = "";
            string query_sql = "select * from tbl_file_content where menuid in ('" + fileIDs.Replace(",", "','") + "')";
            DataSet ds = null;
            if (t == null)
            {
                ds = _iAccessData.Query(query_sql);
            }
            else
            {
                ds = t.Query(query_sql);
            }
            if (ds != null)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    fileuploadname += ds.Tables[0].Rows[i]["fileuploadname"].ToString() + "^";
                }
            }
            fileuploadname = fileuploadname.TrimEnd('^');
            if (fileuploadname != "")
            {
                string methordName = "deleteByFileUploadName";
                object[] args = { _fileUpLoadRootPath, fileuploadname };
                string rr = sara.dd.ldsw.commonclass.webserviceadapter.DoWebService(_serviceFile_url, methordName, args).ToString();


                IDictionary<string, string> re = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(rr);

                if (re["result"] == "true")
                {
                }
                else
                {
                    throw new Exception(re["message"]);
                }
            }
            string sql_tbl_file_content = " delete from tbl_file_content where menuid  in ('" + fileIDs.Replace(",", "','") + "')";
            string sql_tbl_file_menu = " delete from tbl_file_menu where id  in ('" + fileIDs.Replace(",", "','") + "')";
            if (t == null)
            {
                _iAccessData.ExecuteSql(sql_tbl_file_content);
                _iAccessData.ExecuteSql(sql_tbl_file_menu);
            }
            else
            {
                t.ExecuteSql(sql_tbl_file_content);
                t.ExecuteSql(sql_tbl_file_menu);
            }
        }


        /// <summary>
        /// 删除附件，需要传入上传文件跟路径
        /// </summary>
        /// <param name="fileID"></param>
        /// <param name="fileuploadrootpath"></param>
        /// <param name="t"></param>
        public static void deleteByFileName(string fileIDs,string fileuploadrootpath, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            //删除物理文件
            string fileuploadname = "";
            string query_sql = "select * from tbl_file_content where menuid  in ('" + fileIDs.Replace(",", "','") + "')";
            DataSet ds = null;
            if (t == null)
            {
                ds = _iAccessData.Query(query_sql);
            }
            else
            {
                ds = t.Query(query_sql);
            }
            if (ds != null)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    fileuploadname += ds.Tables[0].Rows[i]["fileuploadname"].ToString() + "^";
                }
            }
            fileuploadname = fileuploadname.TrimEnd('^');
            if (fileuploadname != "")
            {
                string methordName = "deleteByFileUploadName";
                object[] args = { fileuploadrootpath, fileuploadname };
                string rr = sara.dd.ldsw.commonclass.webserviceadapter.DoWebService(_serviceFile_url, methordName, args).ToString();


                IDictionary<string, string> re = Eva.Library.Format.FormatEntityTool.FormatJsonToDic(rr);

                if (re["result"] == "true")
                {
                }
                else
                {
                    throw new Exception(re["message"]);
                }
            }
            string sql_tbl_file_content = " delete from tbl_file_content where menuid   in ('" + fileIDs.Replace(",", "','") + "')";
            string sql_tbl_file_menu = " delete from tbl_file_menu where id   in ('" + fileIDs.Replace(",", "','") + "')";
            if (t == null)
            {
                _iAccessData.ExecuteSql(sql_tbl_file_content);
                _iAccessData.ExecuteSql(sql_tbl_file_menu);
            }
            else
            {
                t.ExecuteSql(sql_tbl_file_content);
                t.ExecuteSql(sql_tbl_file_menu);
            }
        }


        public static string GetFilesJsonArrayByFileId(string fileID)
        {
            Eva.Library.Data.AccessData.IAccessData _iAccessData = commonclass.CreateIAccessData();

            string sqlString = "select * from tbl_file_content where menuid = '" + fileID + "'";


            string ShpFileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["ShpFileUpLoadRootPath"].ToString().Replace("http://", "");

            DataSet ds = _iAccessData.Query(sqlString);

            IList<IDictionary<string, string>> resultDicList = new List<IDictionary<string, string>>();

            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                Dictionary<string, string> a = new Dictionary<string, string>();
                a["filerealname"] = ds.Tables[0].Rows[i]["filerealname"].ToString();
                a["fileuploadname"] = ShpFileUpLoadRootPath + ds.Tables[0].Rows[i]["fileuploadname"].ToString();
                resultDicList.Add(a);
            }

            return Eva.Library.Format.FormatEntityTool.FormatDicListToJson(resultDicList);
        }

        /// <summary>
        /// 根据上传路径和文件名删除文件
        /// </summary>
        /// <param name="fileuploadrootpath"></param>
        /// <param name="filename"></param>
        public static string DeleteUploadFile(string fileuploadrootpath, string filename)
        {
            string methordName = "deleteByFileUploadName";
            object[] args = { fileuploadrootpath, filename };
            string rr = sara.dd.ldsw.commonclass.webserviceadapter.DoWebService(_serviceFile_url, methordName, args).ToString();
            return rr;
        }

        #endregion
    }
}