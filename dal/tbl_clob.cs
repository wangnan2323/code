//------------------------------------------------------------------------------
//     此代码由代码生成器EasyQuickDevelopToolV3.CodeFactory生成。
//     代码生成器版本：V3.1
//     代码模板版本：V1.20140523
//     
//     再编辑此代码以完成业务功能。
//     再编辑过程中须遵循现有编码规范和程序逻辑。     
//     异常的编码可能会导致不正确的行为。
//     重新生成代码，这些更改将会丢失。
//------------------------------------------------------------------------------
using System;
using System.Data;
using System.Data.OracleClient;
using System.Text;
using System.Collections.Generic;

using Eva.Library.Data;
namespace sara.dd.ldsw.dal
{
    /// <summary>
    /// 数据访问类tbl_clob 
    /// </summary>
    public class tbl_clob : sara.dd.ldsw.idal.Itbl_clob
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_clob()
        {
            _iAccessData = Eva.Library.Data.AccessData.AccessDataFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
        }
        #region  成员方法

        /// <summary>
        /// 重写添加addlayerconfig
        /// </summary>
        /// <param name="json"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string Add(sara.dd.ldsw.model.tbl_clob model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql1 = new StringBuilder();
            StringBuilder strSql2 = new StringBuilder();

            string sid = "";
            if (model.sys_id <= 0)
            {
                if (t == null)
                {
                    sid = GetMaxId(null).ToString();
                }
                else
                {
                    sid = GetMaxId(t).ToString();
                }

            }
            else
            {
                sid = model.sys_id.ToString();
            }

            #region sqlString
            strSql1.Append("sys_id,");
            strSql2.Append("'" + sid + "',");

            strSql1.Append("sys_orderid,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_orderid) + "',");

            strSql1.Append("sys_creatuserid,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_creatuserid) + "',");

            strSql1.Append("sys_creatusername,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_creatusername) + "',");

            strSql1.Append("sys_creatdate,");
            strSql2.Append("to_date('" + model.sys_creatdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");

            strSql1.Append("sys_lastedituserid,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_lastedituserid) + "',");

            strSql1.Append("sys_lasteditusername,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_lasteditusername) + "',");

            strSql1.Append("sys_lasteditdate,");
            strSql2.Append("to_date('" + model.sys_lasteditdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");

            strSql1.Append("sys_deluserid,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_deluserid) + "',");

            strSql1.Append("sys_delusername,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_delusername) + "',");

            strSql1.Append("sys_deldate,");
            strSql2.Append("to_date('" + model.sys_deldate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");

            strSql1.Append("sys_delflag,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_delflag) + "',");

            strSql1.Append("f_value1,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value1) + "',");

            strSql1.Append("f_value2,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value2) + "',");

            strSql1.Append("f_value3,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value3) + "',");

            strSql1.Append("f_value4,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value4) + "',");

            strSql1.Append("f_value5,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value5) + "',");

            strSql1.Append("f_value6,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value6) + "',");

            strSql1.Append("f_value7,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value7) + "',");

            strSql1.Append("f_value8,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value8) + "',");

            strSql1.Append("f_value9,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value9) + "',");

            strSql1.Append("f_value10,");
            strSql2.Append("'" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value10) + "',");


            strSql.Append("insert into tbl_clob(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");

            #endregion
            if (t == null)
            {
                _iAccessData.ExecuteSql(strSql.ToString());
            }
            else
            {
                t.ExecuteSql(strSql.ToString());
            }
            List<OracleParameter> parameters = new List<OracleParameter>();
            List<string> paraStr = new List<string>();

            if (model.f_clob != null && model.f_clob.Length > 0)
            {
                OracleParameter p = new OracleParameter(":f_clob", OracleType.Clob);
                p.Value = Eva.Library.Format.FormatTextTool.TextFormat(model.f_clob);
                parameters.Add(p);
                paraStr.Add(" f_clob = :f_clob ");
            }
            else
            {
                paraStr.Add(" f_clob = null ");
            }
            if (paraStr.Count > 0)
            {
                string str = " update tbl_clob set " + string.Join(" , ", paraStr.ToArray()) + " where sys_id = '" + sid + "' ";
                if (parameters.Count > 0)
                {
                    if (t == null)
                    {
                        _iAccessData.ExecuteSql(str, parameters.ToArray());
                    }
                    else
                    {
                        t.ExecuteSql(str, parameters.ToArray());
                    }
                }
                else
                {
                    if (t == null)
                    {
                        _iAccessData.ExecuteSql(str);
                    }
                    else
                    {
                        t.ExecuteSql(str);
                    }
                }
            }
            return sid;

        }

        /// <summary>
        /// 重写添加addlist
        /// </summary>
        /// <param name="json"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string AddList(List<sara.dd.ldsw.model.tbl_clob> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
                if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_clob model in modelList)
                {
                    if (t == null)
                    {
                        Newids += Add(model, _iAccessDataTrans) + "^";
                    }
                    else
                    {
                        Newids += Add(model, t) + "^";
                    }
                }
                if (t == null)
                {
                    _iAccessDataTrans.getTrans().commit();
                }

                return Newids.TrimEnd('^');
            }
            catch (Exception ex)
            {
                if (t == null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }
                throw ex;
            }

        }

        /// <summary>
        /// 重写更新updatepaper
        /// </summary>
        /// <param name="json"></param>
        /// <param name="columns"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string Update(sara.dd.ldsw.model.tbl_clob model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);

            #region sqlString
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tbl_clob set ");


            if (model.sys_orderid != null && columsList.Contains("sys_orderid"))
            {
                strSql.Append("sys_orderid='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_orderid) + "',");
            }

            if (model.sys_creatuserid != null && columsList.Contains("sys_creatuserid"))
            {
                strSql.Append("sys_creatuserid='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_creatuserid) + "',");
            }

            if (model.sys_creatusername != null && columsList.Contains("sys_creatusername"))
            {
                strSql.Append("sys_creatusername='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_creatusername) + "',");
            }

            if (model.sys_creatdate != null && columsList.Contains("sys_creatdate"))
            {
                strSql.Append("sys_creatdate=to_date('" + model.sys_creatdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
            }

            if (model.sys_lastedituserid != null && columsList.Contains("sys_lastedituserid"))
            {
                strSql.Append("sys_lastedituserid='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_lastedituserid) + "',");
            }

            if (model.sys_lasteditusername != null && columsList.Contains("sys_lasteditusername"))
            {
                strSql.Append("sys_lasteditusername='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_lasteditusername) + "',");
            }

            if (model.sys_lasteditdate != null && columsList.Contains("sys_lasteditdate"))
            {
                strSql.Append("sys_lasteditdate=to_date('" + model.sys_lasteditdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
            }

            if (model.sys_deluserid != null && columsList.Contains("sys_deluserid"))
            {
                strSql.Append("sys_deluserid='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_deluserid) + "',");
            }

            if (model.sys_delusername != null && columsList.Contains("sys_delusername"))
            {
                strSql.Append("sys_delusername='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_delusername) + "',");
            }

            if (model.sys_deldate != null && columsList.Contains("sys_deldate"))
            {
                strSql.Append("sys_deldate=to_date('" + model.sys_deldate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
            }

            if (model.sys_delflag != null && columsList.Contains("sys_delflag"))
            {
                strSql.Append("sys_delflag='" + Eva.Library.Format.FormatTextTool.TextFormat(model.sys_delflag) + "',");
            }

            if (model.f_value1 != null && columsList.Contains("f_value1"))
            {
                strSql.Append("f_value1='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value1) + "',");
            }

            if (model.f_value2 != null && columsList.Contains("f_value2"))
            {
                strSql.Append("f_value2='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value2) + "',");
            }

            if (model.f_value3 != null && columsList.Contains("f_value3"))
            {
                strSql.Append("f_value3='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value3) + "',");
            }

            if (model.f_value4 != null && columsList.Contains("f_value4"))
            {
                strSql.Append("f_value4='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value4) + "',");
            }

            if (model.f_value5 != null && columsList.Contains("f_value5"))
            {
                strSql.Append("f_value5='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value5) + "',");
            }

            if (model.f_value6 != null && columsList.Contains("f_value6"))
            {
                strSql.Append("f_value6='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value6) + "',");
            }

            if (model.f_value7 != null && columsList.Contains("f_value7"))
            {
                strSql.Append("f_value7='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value7) + "',");
            }

            if (model.f_value8 != null && columsList.Contains("f_value8"))
            {
                strSql.Append("f_value8='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value8) + "',");
            }

            if (model.f_value9 != null && columsList.Contains("f_value9"))
            {
                strSql.Append("f_value9='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value9) + "',");
            }

            if (model.f_value10 != null && columsList.Contains("f_value10"))
            {
                strSql.Append("f_value10='" + Eva.Library.Format.FormatTextTool.TextFormat(model.f_value10) + "',");
            }


            int n = strSql.ToString().LastIndexOf(",");
            strSql.Remove(n, 1);
            strSql.Append(" where sys_id='" + model.sys_id + "'");


            #endregion
            int columscount = 0;
            if (t == null)
            {
                columscount += _iAccessData.ExecuteSql(strSql.ToString());
            }
            else
            {
                columscount += t.ExecuteSql(strSql.ToString());
            }



            List<OracleParameter> parameters = new List<OracleParameter>();
            List<string> paraStr = new List<string>();



            if (columsList.Contains("f_clob"))
            {
                if (model.f_clob != null && model.f_clob.Length > 0)
                {
                    OracleParameter p = new OracleParameter(":f_clob", OracleType.Clob);
                    p.Value = Eva.Library.Format.FormatTextTool.TextFormat(model.f_clob);
                    parameters.Add(p);
                    paraStr.Add(" f_clob = :f_clob ");
                }
                else
                {
                    paraStr.Add(" f_clob = null ");
                }
            }
            if (paraStr.Count > 0)
            {
                string str = " update tbl_clob set " + string.Join(" , ", paraStr.ToArray()) + " where sys_id = '" + model.sys_id + "' ";
                if (parameters.Count > 0)
                {
                    if (t == null)
                    {
                        columscount = _iAccessData.ExecuteSql(str, parameters.ToArray());
                    }
                    else
                    {
                        columscount = t.ExecuteSql(str, parameters.ToArray());
                    }
                }
                else
                {
                    if (t == null)
                    {
                        columscount = _iAccessData.ExecuteSql(str);
                    }
                    else
                    {
                        columscount = t.ExecuteSql(str);
                    }
                }
            }

            return columscount.ToString();
        }

        /// <summary>
        /// 重写updatelist
        /// </summary>
        /// <param name="json"></param>
        /// <param name="columns"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string UpdateList(List<sara.dd.ldsw.model.tbl_clob> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
                if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_clob model in modelList)
                {
                    if (t == null)
                    {
                        if (Update(model, columns, _iAccessDataTrans) == "1")
                        {
                            column++;
                        }
                    }
                    else
                    {
                        if (Update(model, columns, t) == "1")
                        {
                            column++;
                        }
                    }
                }
                if (t == null)
                {
                    _iAccessDataTrans.getTrans().commit();
                }
            }
            catch (Exception ex)
            {
                if (t == null)
                {
                    _iAccessDataTrans.getTrans().rollback();
                }
                throw ex;
            }


            return column.ToString();
        }

        /// <summary>
        /// 重写deleteshape
        /// </summary>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string Delete(string whereString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete tbl_clob where  ");
            strSql.Append(whereString);
            int executecount = 0;
            if (t == null)
            {
                executecount = _iAccessData.ExecuteSql(strSql.ToString());
            }
            else
            {
                executecount = t.ExecuteSql(strSql.ToString());
            }

            return executecount.ToString();
        }

        /// <summary>
        /// 重写logicdelete
        /// </summary>
        /// <param name="delUserId"></param>
        /// <param name="delUserName"></param>
        /// <param name="delDate"></param>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string LogicDelete(string delUserId, string delUserName, string delDate, string whereString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tbl_clob set ");
            strSql.Append("sys_deluserid='" + delUserId + "',");
            strSql.Append("sys_delusername='" + delUserName + "',");
            strSql.Append("sys_deldate=to_date('" + System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
            strSql.Append("sys_delflag='1',");
            int n = strSql.ToString().LastIndexOf(",");
            strSql.Remove(n, 1);
            strSql.Append(" where  " + whereString + " ");
            int executecount = 0;
            if (t == null)
            {
                executecount = _iAccessData.ExecuteSql(strSql.ToString());
            }
            else
            {
                executecount = t.ExecuteSql(strSql.ToString());
            }

            return executecount.ToString();
        }

        /// <summary>
        /// 重写获取count
        /// </summary>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string GetCount(string whereString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(*) from tbl_clob");
            if (whereString.Trim() != "")
            {
                strSql.Append(" where " + whereString);
            }
            string count = "0";
            if (t == null)
            {
                count = int.Parse(_iAccessData.GetSingle(strSql.ToString()).ToString()).ToString();
            }
            else
            {
                count = int.Parse(t.GetSingle(strSql.ToString()).ToString()).ToString();
            }
            return count;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="whereString"></param>      
        /// <param name="orderByString">sys_creatdate desc,sys_id desc</param>
        /// <param name="columnsString">where、orderby条件可以在columns之外</param>
        /// <param name="pageSizeString">如果为null则获取全部数据</param>
        /// <param name="pageIndexString">如果为null则获取全部数据</param>
        /// <returns></returns>
        public List<sara.dd.ldsw.model.tbl_clob> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_clob t where");
            if (whereString.Trim() == "")
            {
                strSql.Append(" 1=1 ");
            }
            else
            {
                strSql.Append(" " + whereString);
            }
            if (orderByString.Trim() == "")
            {
                strSql.Append(" order by sys_creatdate desc ");
            }
            else
            {
                strSql.Append(" order by " + orderByString);
            }

            strSql.Append(" ) a ");
            strSql.Append(" ) b ");

            if (pageSizeString != "" && pageSizeString != null && pageIndexString != "" && pageIndexString != null)
            {
                int fromInt = int.Parse(pageSizeString) * (int.Parse(pageIndexString) - 1) + 1;
                int toInt = (int.Parse(pageSizeString) * (int.Parse(pageIndexString)));

                strSql.Append(" where b.rn>='" + fromInt.ToString() + "'  and b.rn <='" + toInt.ToString() + "' ");
            }

            DataTable resultDataTable = null;
            if (t == null)
            {
                resultDataTable = _iAccessData.Query(strSql.ToString()).Tables[0];
            }
            else
            {
                resultDataTable = t.Query(strSql.ToString()).Tables[0];
            }

            List<sara.dd.ldsw.model.tbl_clob> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_clob>(resultDataTable);

            return modelList;
        }




        /// <summary>
        /// 得到最大ID
        /// </summary>
        public string GetMaxId(Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {


            string sqlString = "select TBL_CLOB_SEQUENCE.Nextval from dual";



            return _iAccessData.GetSingle(sqlString).ToString();

        }


        #endregion 成员方法
    }
}