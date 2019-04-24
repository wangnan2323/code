using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
namespace sara.dd.ldsw.service
{
    /// <summary>
    /// app_file 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class app_file : System.Web.Services.WebService
    {

        [WebMethod]
        public string DeleteImage(string fileName, string funcName, string clientInf)
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
                    string msg = "";
                    string UserPhotoUrlRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["UserPhotoUrlRootPath"].ToString();
                    string FileUpLoadRootPath = Eva.Library.Configuration.ConfigurationManager.AppSettings["FileUpLoadRootPath"].ToString();

                    string[] fileNameArray = fileName.Split(';');

                    for (int i = 0; i < fileNameArray.Length; i++)
                    {
                        string fileNameString = "";
                        if (fileNameArray[i].IndexOf("^") > -1)
                        {
                            fileNameString = fileNameArray[i].Split('^')[0];
                        }
                        else
                        {
                            fileNameString = fileNameArray[i];
                        }
                        switch (funcName)
                        {
                            case "userImg":
                                commonclass.filecontrol.DeleteUploadFile(UserPhotoUrlRootPath, fileNameString);
                                break;
                            case "businessImg":
                                commonclass.filecontrol.DeleteUploadFile(FileUpLoadRootPath, fileNameString);
                                break;
                        }
                    }
                    resultDic["result"] = "true";
                    resultDic["message"] = msg;
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
        public string UpdateFileData(string fileId, string fileContent, string businessKey, string businessTableName, string clientInf)
        {
            Eva.Library.Data.AccessDataTrans.IAccessDataTrans t = null;
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
                    string fileIdKey = fileId.Split('|')[0];
                    string fileIdValue = fileId.Split('|')[1];

                    string fileContentKey = fileContent.Split('|')[0];
                    string fileContentValue = fileContent.Split('|')[1];

                    string businessKeyName = businessKey.Split('|')[0];
                    string businessValue = businessKey.Split('|')[1];

                    string str = "";
                    t = sara.dd.ldsw.commonclass.commonclass.CreateIAccessDataTrans();
                    t.getTrans().begin();

                    //验证，如果fileIdValue为空，则自动创建一个fileid的value
                    if(fileIdValue == "")
                    {
                        str = "select tbl_file_menu_sequence.nextval from dual";
                        object o = t.GetSingle(str);
                        string fileid = (o == null || o.ToString() == "" ? "0" : o.ToString());

                        fileid = (int.Parse(fileid) + 1).ToString();
                        str = "insert into tbl_file_menu(id,hascontent) values('" + fileid + "','1')";
                        t.ExecuteSql(str);

                        fileIdValue = fileid;
                    }

                    //分析传入数据
                    List<String> fileNameList = new List<string>();
                    List<String> fileSizeList = new List<string>();

                    string[] fileContentArray = fileContentValue.Split(';');
                    for (int i = 0; i < fileContentArray.Length;i++ )
                    {
                        string[] a = fileContentArray[i].Split('^');
                        fileNameList.Add(a[0]);
                        fileSizeList.Add(a[1] + "^" + a[2]);
                    }
                    string fileNameString = "," + string.Join(",", fileNameList) + ",";


                    str = "select * from tbl_file_content where menuid = '" + fileIdValue + "'";
                    DataSet ds = t.Query(str);
                    List<String> oldfileNameList = new List<string>();
                   
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {   
                        oldfileNameList.Add(ds.Tables[0].Rows[i]["fileuploadname"].ToString());
                    }
                    string oldFileNameString = "," + string.Join(",", oldfileNameList) + ",";

                  
                    //==================找到需要删除的文件-====================
                    List<String> needDelFileNameList = new List<string>();
                    for (int i = 0; i < oldfileNameList.Count; i++)
                    {
                        if (fileNameString.IndexOf("," + oldfileNameList[i] + ",") > -1)
                        {

                        }
                        else
                        {
                            needDelFileNameList.Add(oldfileNameList[i]);
                        }
                    }

                    for (int i = 0; i < needDelFileNameList.Count; i++)
                    {
                        //删除记录
                        DataRow[] dr_del = ds.Tables[0].Select(" fileuploadname = '" + needDelFileNameList[i] + "'");
                        if (dr_del.Length > 0)
                        {
                            str = "delete from tbl_file_content where id = '" + dr_del[0]["id"].ToString() + "'";
                            t.ExecuteSql(str);
                        }
                    }


                    //==================找到需要新建的文件-====================
                    List<String> needAddFileNameList = new List<string>();
                    for (int i = 0; i < fileNameList.Count; i++)
                    {
                        if (oldFileNameString.IndexOf("," + fileNameList[i] + ",") > -1)
                        {

                        }
                        else
                        {
                            needAddFileNameList.Add(fileNameList[i]);
                        }
                    }
                    for (int i = 0; i < needAddFileNameList.Count; i++)
                    {
                        str = " insert into tbl_file_content ";
                        str += " (id, menuid, fileuploadname, filerealname, filesize, filetype, creatdate, deldate, delflag) ";
                        str += " values ";
                        str += " (tbl_file_content_sequence.nextval, '" + fileIdValue + "', '" + needAddFileNameList[i] + "', '" + needAddFileNameList[i] + "', '0', '" + needAddFileNameList[i].Substring(needAddFileNameList[i].LastIndexOf('.')) + "', to_date('" + System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'), to_date('1900-01-01 00:00:00','yyyy-MM-dd hh24:mi:ss'), '0')";

                        t.ExecuteSql(str);
                    }
                    

                  


                    //更新业务数据
                    str = " update " + businessTableName + " set ";
                    str += fileContentKey + " = '" + fileContentValue + "'";
                    str += "," + fileIdKey + " = '" + fileIdValue + "'";
                    str += " where " + businessKeyName + " = '" + businessValue + "'";
                    t.ExecuteSql(str);

                    t.getTrans().commit();
                    resultDic["result"] = "true";
                    resultDic["message"] = "";

                }
            }
            catch (Exception ex)
            {
                if (t != null)
                {
                    t.getTrans().rollback();
                }
                resultDic["result"] = "error";
                resultDic["message"] = Eva.Library.Format.FormatTextTool.ErrorMessageFormat(ex.Message + ex.StackTrace);
            }
            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);

        }
    }
}
