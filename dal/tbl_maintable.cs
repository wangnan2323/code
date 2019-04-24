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
    /// 数据访问类tbl_maintable 
    /// </summary>
    public class tbl_maintable : sara.dd.ldsw.idal.Itbl_maintable
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_maintable()
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
        public string Add(sara.dd.ldsw.model.tbl_maintable model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            StringBuilder strSql1 = new StringBuilder();
            StringBuilder strSql2 = new StringBuilder();
            StringBuilder strSql3 = new StringBuilder();
            if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            }
            else //如果是sql形式的话，则进行textFormat
            {
                model = Eva.Library.Format.FormatTextTool.ModelFormat(model);
            }
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            
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
									model.sys_id = int.Parse(sid);                
            }
            else
            {
                sid = model.sys_id.ToString();
            }
            
            #region sqlString
            strSql1.Append("sys_id,");
            strSql2.Append("'" + sid + "',");
            strSql3.Append(":sys_id,");
            					parameter = new OracleParameter(":sys_id", OracleType.Number);
			parameter.Value = sid;
            parameterList.Add(parameter);
            
            if (model.sys_orderid != null)
            {
	            strSql1.Append("sys_orderid,");
	            strSql2.Append("'" + (model.sys_orderid) + "',");
	            strSql3.Append(":sys_orderid,");
	            parameter = new OracleParameter(":sys_orderid", OracleType.VarChar);
	            parameter.Value = model.sys_orderid;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_creatuserid != null)
            {
	            strSql1.Append("sys_creatuserid,");
	            strSql2.Append("'" + (model.sys_creatuserid) + "',");
	            strSql3.Append(":sys_creatuserid,");
	            parameter = new OracleParameter(":sys_creatuserid", OracleType.VarChar);
	            parameter.Value = model.sys_creatuserid;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_creatusername != null)
            {
	            strSql1.Append("sys_creatusername,");
	            strSql2.Append("'" + (model.sys_creatusername) + "',");
	            strSql3.Append(":sys_creatusername,");
	            parameter = new OracleParameter(":sys_creatusername", OracleType.VarChar);
	            parameter.Value = model.sys_creatusername;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_creatdate != null)
            {
	            strSql1.Append("sys_creatdate,");
	            strSql2.Append("to_date('" + model.sys_creatdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":sys_creatdate,");
	            parameter = new OracleParameter(":sys_creatdate", OracleType.DateTime);
	            parameter.Value = model.sys_creatdate;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_lastedituserid != null)
            {
	            strSql1.Append("sys_lastedituserid,");
	            strSql2.Append("'" + (model.sys_lastedituserid) + "',");
	            strSql3.Append(":sys_lastedituserid,");
	            parameter = new OracleParameter(":sys_lastedituserid", OracleType.VarChar);
	            parameter.Value = model.sys_lastedituserid;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_lasteditusername != null)
            {
	            strSql1.Append("sys_lasteditusername,");
	            strSql2.Append("'" + (model.sys_lasteditusername) + "',");
	            strSql3.Append(":sys_lasteditusername,");
	            parameter = new OracleParameter(":sys_lasteditusername", OracleType.VarChar);
	            parameter.Value = model.sys_lasteditusername;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_lasteditdate != null)
            {
	            strSql1.Append("sys_lasteditdate,");
	            strSql2.Append("to_date('" + model.sys_lasteditdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":sys_lasteditdate,");
	            parameter = new OracleParameter(":sys_lasteditdate", OracleType.DateTime);
	            parameter.Value = model.sys_lasteditdate;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_deluserid != null)
            {
	            strSql1.Append("sys_deluserid,");
	            strSql2.Append("'" + (model.sys_deluserid) + "',");
	            strSql3.Append(":sys_deluserid,");
	            parameter = new OracleParameter(":sys_deluserid", OracleType.VarChar);
	            parameter.Value = model.sys_deluserid;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_delusername != null)
            {
	            strSql1.Append("sys_delusername,");
	            strSql2.Append("'" + (model.sys_delusername) + "',");
	            strSql3.Append(":sys_delusername,");
	            parameter = new OracleParameter(":sys_delusername", OracleType.VarChar);
	            parameter.Value = model.sys_delusername;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_deldate != null)
            {
	            strSql1.Append("sys_deldate,");
	            strSql2.Append("to_date('" + model.sys_deldate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":sys_deldate,");
	            parameter = new OracleParameter(":sys_deldate", OracleType.DateTime);
	            parameter.Value = model.sys_deldate;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_delflag != null)
            {
	            strSql1.Append("sys_delflag,");
	            strSql2.Append("'" + (model.sys_delflag) + "',");
	            strSql3.Append(":sys_delflag,");
	            parameter = new OracleParameter(":sys_delflag", OracleType.VarChar);
	            parameter.Value = model.sys_delflag;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_processnextuser != null)
            {
	            strSql1.Append("sys_processnextuser,");
	            strSql2.Append("'" + (model.sys_processnextuser) + "',");
	            strSql3.Append(":sys_processnextuser,");
	            parameter = new OracleParameter(":sys_processnextuser", OracleType.VarChar);
	            parameter.Value = model.sys_processnextuser;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_projectclassdtl1 != null)
            {
	            strSql1.Append("sys_projectclassdtl1,");
	            strSql2.Append("'" + (model.sys_projectclassdtl1) + "',");
	            strSql3.Append(":sys_projectclassdtl1,");
	            parameter = new OracleParameter(":sys_projectclassdtl1", OracleType.VarChar);
	            parameter.Value = model.sys_projectclassdtl1;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_projectclassdtl2 != null)
            {
	            strSql1.Append("sys_projectclassdtl2,");
	            strSql2.Append("'" + (model.sys_projectclassdtl2) + "',");
	            strSql3.Append(":sys_projectclassdtl2,");
	            parameter = new OracleParameter(":sys_projectclassdtl2", OracleType.VarChar);
	            parameter.Value = model.sys_projectclassdtl2;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_processinsid != null)
            {
	            strSql1.Append("sys_processinsid,");
	            strSql2.Append("'" + (model.sys_processinsid) + "',");
	            strSql3.Append(":sys_processinsid,");
	            parameter = new OracleParameter(":sys_processinsid", OracleType.VarChar);
	            parameter.Value = model.sys_processinsid;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_projectclassdtl1_name != null)
            {
	            strSql1.Append("sys_projectclassdtl1_name,");
	            strSql2.Append("'" + (model.sys_projectclassdtl1_name) + "',");
	            strSql3.Append(":sys_projectclassdtl1_name,");
	            parameter = new OracleParameter(":sys_projectclassdtl1_name", OracleType.VarChar);
	            parameter.Value = model.sys_projectclassdtl1_name;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_projectclassdtl2_name != null)
            {
	            strSql1.Append("sys_projectclassdtl2_name,");
	            strSql2.Append("'" + (model.sys_projectclassdtl2_name) + "',");
	            strSql3.Append(":sys_projectclassdtl2_name,");
	            parameter = new OracleParameter(":sys_projectclassdtl2_name", OracleType.VarChar);
	            parameter.Value = model.sys_projectclassdtl2_name;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_first != null)
            {
	            strSql1.Append("sys_first,");
	            strSql2.Append("'" + (model.sys_first) + "',");
	            strSql3.Append(":sys_first,");
	            parameter = new OracleParameter(":sys_first", OracleType.VarChar);
	            parameter.Value = model.sys_first;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_projectclassid != null)
            {
	            strSql1.Append("sys_projectclassid,");
	            strSql2.Append("'" + (model.sys_projectclassid) + "',");
	            strSql3.Append(":sys_projectclassid,");
	            parameter = new OracleParameter(":sys_projectclassid", OracleType.VarChar);
	            parameter.Value = model.sys_projectclassid;
	            parameterList.Add(parameter);
            }
            
            if (model.fk_tbl_maintable_sys_id != null)
            {
	            strSql1.Append("fk_tbl_maintable_sys_id,");
	            strSql2.Append("'" + (model.fk_tbl_maintable_sys_id) + "',");
	            strSql3.Append(":fk_tbl_maintable_sys_id,");
	            parameter = new OracleParameter(":fk_tbl_maintable_sys_id", OracleType.VarChar);
	            parameter.Value = model.fk_tbl_maintable_sys_id;
	            parameterList.Add(parameter);
            }
            
            if (model.fk_workflow_sys_id != null)
            {
	            strSql1.Append("fk_workflow_sys_id,");
	            strSql2.Append("'" + (model.fk_workflow_sys_id) + "',");
	            strSql3.Append(":fk_workflow_sys_id,");
	            parameter = new OracleParameter(":fk_workflow_sys_id", OracleType.VarChar);
	            parameter.Value = model.fk_workflow_sys_id;
	            parameterList.Add(parameter);
            }
            
            if (model.shpid != null)
            {
	            strSql1.Append("shpid,");
	            strSql2.Append("'" + (model.shpid) + "',");
	            strSql3.Append(":shpid,");
	            parameter = new OracleParameter(":shpid", OracleType.VarChar);
	            parameter.Value = model.shpid;
	            parameterList.Add(parameter);
            }
            
            if (model.xmmc != null)
            {
	            strSql1.Append("xmmc,");
	            strSql2.Append("'" + (model.xmmc) + "',");
	            strSql3.Append(":xmmc,");
	            parameter = new OracleParameter(":xmmc", OracleType.VarChar);
	            parameter.Value = model.xmmc;
	            parameterList.Add(parameter);
            }
            
            if (model.xzqy != null)
            {
	            strSql1.Append("xzqy,");
	            strSql2.Append("'" + (model.xzqy) + "',");
	            strSql3.Append(":xzqy,");
	            parameter = new OracleParameter(":xzqy", OracleType.VarChar);
	            parameter.Value = model.xzqy;
	            parameterList.Add(parameter);
            }
            
            if (model.xzqyid != null)
            {
	            strSql1.Append("xzqyid,");
	            strSql2.Append("'" + (model.xzqyid) + "',");
	            strSql3.Append(":xzqyid,");
	            parameter = new OracleParameter(":xzqyid", OracleType.VarChar);
	            parameter.Value = model.xzqyid;
	            parameterList.Add(parameter);
            }
            
            if (model.dwmc != null)
            {
	            strSql1.Append("dwmc,");
	            strSql2.Append("'" + (model.dwmc) + "',");
	            strSql3.Append(":dwmc,");
	            parameter = new OracleParameter(":dwmc", OracleType.VarChar);
	            parameter.Value = model.dwmc;
	            parameterList.Add(parameter);
            }
            
            if (model.lrr != null)
            {
	            strSql1.Append("lrr,");
	            strSql2.Append("'" + (model.lrr) + "',");
	            strSql3.Append(":lrr,");
	            parameter = new OracleParameter(":lrr", OracleType.VarChar);
	            parameter.Value = model.lrr;
	            parameterList.Add(parameter);
            }
            
            if (model.lrrq != null)
            {
	            strSql1.Append("lrrq,");
	            strSql2.Append("to_date('" + model.lrrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":lrrq,");
	            parameter = new OracleParameter(":lrrq", OracleType.DateTime);
	            parameter.Value = model.lrrq;
	            parameterList.Add(parameter);
            }
            
            if (model.bz != null)
            {
	            strSql1.Append("bz,");
	            strSql2.Append("'" + (model.bz) + "',");
	            strSql3.Append(":bz,");
	            parameter = new OracleParameter(":bz", OracleType.VarChar);
	            parameter.Value = model.bz;
	            parameterList.Add(parameter);
            }
            
            if (model.xmlx != null)
            {
	            strSql1.Append("xmlx,");
	            strSql2.Append("'" + (model.xmlx) + "',");
	            strSql3.Append(":xmlx,");
	            parameter = new OracleParameter(":xmlx", OracleType.VarChar);
	            parameter.Value = model.xmlx;
	            parameterList.Add(parameter);
            }
            
            if (model.xmlxid != null)
            {
	            strSql1.Append("xmlxid,");
	            strSql2.Append("'" + (model.xmlxid) + "',");
	            strSql3.Append(":xmlxid,");
	            parameter = new OracleParameter(":xmlxid", OracleType.VarChar);
	            parameter.Value = model.xmlxid;
	            parameterList.Add(parameter);
            }
            
            if (model.value1 != null)
            {
	            strSql1.Append("value1,");
	            strSql2.Append("'" + (model.value1) + "',");
	            strSql3.Append(":value1,");
	            parameter = new OracleParameter(":value1", OracleType.VarChar);
	            parameter.Value = model.value1;
	            parameterList.Add(parameter);
            }
            
            if (model.value2 != null)
            {
	            strSql1.Append("value2,");
	            strSql2.Append("'" + (model.value2) + "',");
	            strSql3.Append(":value2,");
	            parameter = new OracleParameter(":value2", OracleType.VarChar);
	            parameter.Value = model.value2;
	            parameterList.Add(parameter);
            }
            
            if (model.value3 != null)
            {
	            strSql1.Append("value3,");
	            strSql2.Append("'" + (model.value3) + "',");
	            strSql3.Append(":value3,");
	            parameter = new OracleParameter(":value3", OracleType.VarChar);
	            parameter.Value = model.value3;
	            parameterList.Add(parameter);
            }
            
            if (model.value4 != null)
            {
	            strSql1.Append("value4,");
	            strSql2.Append("'" + (model.value4) + "',");
	            strSql3.Append(":value4,");
	            parameter = new OracleParameter(":value4", OracleType.VarChar);
	            parameter.Value = model.value4;
	            parameterList.Add(parameter);
            }
            
            if (model.value5 != null)
            {
	            strSql1.Append("value5,");
	            strSql2.Append("'" + (model.value5) + "',");
	            strSql3.Append(":value5,");
	            parameter = new OracleParameter(":value5", OracleType.VarChar);
	            parameter.Value = model.value5;
	            parameterList.Add(parameter);
            }
            
            if (model.value6 != null)
            {
	            strSql1.Append("value6,");
	            strSql2.Append("'" + (model.value6) + "',");
	            strSql3.Append(":value6,");
	            parameter = new OracleParameter(":value6", OracleType.VarChar);
	            parameter.Value = model.value6;
	            parameterList.Add(parameter);
            }
            
            if (model.value7 != null)
            {
	            strSql1.Append("value7,");
	            strSql2.Append("'" + (model.value7) + "',");
	            strSql3.Append(":value7,");
	            parameter = new OracleParameter(":value7", OracleType.VarChar);
	            parameter.Value = model.value7;
	            parameterList.Add(parameter);
            }
            
            if (model.value8 != null)
            {
	            strSql1.Append("value8,");
	            strSql2.Append("'" + (model.value8) + "',");
	            strSql3.Append(":value8,");
	            parameter = new OracleParameter(":value8", OracleType.VarChar);
	            parameter.Value = model.value8;
	            parameterList.Add(parameter);
            }
            
            if (model.value9 != null)
            {
	            strSql1.Append("value9,");
	            strSql2.Append("'" + (model.value9) + "',");
	            strSql3.Append(":value9,");
	            parameter = new OracleParameter(":value9", OracleType.VarChar);
	            parameter.Value = model.value9;
	            parameterList.Add(parameter);
            }
            
            if (model.value10 != null)
            {
	            strSql1.Append("value10,");
	            strSql2.Append("'" + (model.value10) + "',");
	            strSql3.Append(":value10,");
	            parameter = new OracleParameter(":value10", OracleType.VarChar);
	            parameter.Value = model.value10;
	            parameterList.Add(parameter);
            }
            
            if (model.sys_projectclassid_name != null)
            {
	            strSql1.Append("sys_projectclassid_name,");
	            strSql2.Append("'" + (model.sys_projectclassid_name) + "',");
	            strSql3.Append(":sys_projectclassid_name,");
	            parameter = new OracleParameter(":sys_projectclassid_name", OracleType.VarChar);
	            parameter.Value = model.sys_projectclassid_name;
	            parameterList.Add(parameter);
            }
            
            strSql.Append("insert into tbl_maintable(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_maintable(");
            strSql_use.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql_use.Append(")");
            strSql_use.Append(" values (");
            strSql_use.Append(strSql3.ToString().Remove(strSql3.Length - 1));
            strSql_use.Append(")");
            
            #endregion
            if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            	#region parameter
                if (parameterList.Count > 0)
                {
                    if (t == null)
                    {
                        _iAccessData.ExecuteSql(strSql_use.ToString(), parameterList.ToArray());
                    }
                    else
                    {
                        t.ExecuteSql(strSql_use.ToString(), parameterList.ToArray());
                    }
                }              
                #endregion
            }
            else
            {
             	#region sql
             	 if (t == null)
            	{
                	_iAccessData.ExecuteSql(strSql.ToString());
            	}
	            else
	            {
	                t.ExecuteSql(strSql.ToString());
	            }           
	             	#endregion
            }
            
           
            return sid;

        }

        /// <summary>
        /// 重写添加addlist
        /// </summary>
        /// <param name="json"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        public string AddList(List<sara.dd.ldsw.model.tbl_maintable> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_maintable model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_maintable model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_maintable set ");
            strSql_use.Append("update tbl_maintable set ");
            if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            }
            else //如果是sql形式的话，则进行textReturn
            {
                model = Eva.Library.Format.FormatTextTool.ModelFormat(model);
            }
            
	            
	            if (model.sys_orderid != null&& columsList.Contains("sys_orderid"))
            {
                strSql.Append("sys_orderid='" + (model.sys_orderid) + "',");
                strSql_use.Append("sys_orderid=:sys_orderid,");
                parameter = new OracleParameter(":sys_orderid", OracleType.VarChar);
                parameter.Value = model.sys_orderid;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_creatuserid != null&& columsList.Contains("sys_creatuserid"))
            {
                strSql.Append("sys_creatuserid='" + (model.sys_creatuserid) + "',");
                strSql_use.Append("sys_creatuserid=:sys_creatuserid,");
                parameter = new OracleParameter(":sys_creatuserid", OracleType.VarChar);
                parameter.Value = model.sys_creatuserid;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_creatusername != null&& columsList.Contains("sys_creatusername"))
            {
                strSql.Append("sys_creatusername='" + (model.sys_creatusername) + "',");
                strSql_use.Append("sys_creatusername=:sys_creatusername,");
                parameter = new OracleParameter(":sys_creatusername", OracleType.VarChar);
                parameter.Value = model.sys_creatusername;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_creatdate != null&& columsList.Contains("sys_creatdate"))
            {
                strSql.Append("sys_creatdate=to_date('" + model.sys_creatdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("sys_creatdate=:sys_creatdate,");
                parameter = new OracleParameter(":sys_creatdate", OracleType.DateTime);
                parameter.Value = model.sys_creatdate;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_lastedituserid != null&& columsList.Contains("sys_lastedituserid"))
            {
                strSql.Append("sys_lastedituserid='" + (model.sys_lastedituserid) + "',");
                strSql_use.Append("sys_lastedituserid=:sys_lastedituserid,");
                parameter = new OracleParameter(":sys_lastedituserid", OracleType.VarChar);
                parameter.Value = model.sys_lastedituserid;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_lasteditusername != null&& columsList.Contains("sys_lasteditusername"))
            {
                strSql.Append("sys_lasteditusername='" + (model.sys_lasteditusername) + "',");
                strSql_use.Append("sys_lasteditusername=:sys_lasteditusername,");
                parameter = new OracleParameter(":sys_lasteditusername", OracleType.VarChar);
                parameter.Value = model.sys_lasteditusername;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_lasteditdate != null&& columsList.Contains("sys_lasteditdate"))
            {
                strSql.Append("sys_lasteditdate=to_date('" + model.sys_lasteditdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("sys_lasteditdate=:sys_lasteditdate,");
                parameter = new OracleParameter(":sys_lasteditdate", OracleType.DateTime);
                parameter.Value = model.sys_lasteditdate;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_deluserid != null&& columsList.Contains("sys_deluserid"))
            {
                strSql.Append("sys_deluserid='" + (model.sys_deluserid) + "',");
                strSql_use.Append("sys_deluserid=:sys_deluserid,");
                parameter = new OracleParameter(":sys_deluserid", OracleType.VarChar);
                parameter.Value = model.sys_deluserid;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_delusername != null&& columsList.Contains("sys_delusername"))
            {
                strSql.Append("sys_delusername='" + (model.sys_delusername) + "',");
                strSql_use.Append("sys_delusername=:sys_delusername,");
                parameter = new OracleParameter(":sys_delusername", OracleType.VarChar);
                parameter.Value = model.sys_delusername;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_deldate != null&& columsList.Contains("sys_deldate"))
            {
                strSql.Append("sys_deldate=to_date('" + model.sys_deldate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("sys_deldate=:sys_deldate,");
                parameter = new OracleParameter(":sys_deldate", OracleType.DateTime);
                parameter.Value = model.sys_deldate;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_delflag != null&& columsList.Contains("sys_delflag"))
            {
                strSql.Append("sys_delflag='" + (model.sys_delflag) + "',");
                strSql_use.Append("sys_delflag=:sys_delflag,");
                parameter = new OracleParameter(":sys_delflag", OracleType.VarChar);
                parameter.Value = model.sys_delflag;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_processnextuser != null&& columsList.Contains("sys_processnextuser"))
            {
                strSql.Append("sys_processnextuser='" + (model.sys_processnextuser) + "',");
                strSql_use.Append("sys_processnextuser=:sys_processnextuser,");
                parameter = new OracleParameter(":sys_processnextuser", OracleType.VarChar);
                parameter.Value = model.sys_processnextuser;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_projectclassdtl1 != null&& columsList.Contains("sys_projectclassdtl1"))
            {
                strSql.Append("sys_projectclassdtl1='" + (model.sys_projectclassdtl1) + "',");
                strSql_use.Append("sys_projectclassdtl1=:sys_projectclassdtl1,");
                parameter = new OracleParameter(":sys_projectclassdtl1", OracleType.VarChar);
                parameter.Value = model.sys_projectclassdtl1;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_projectclassdtl2 != null&& columsList.Contains("sys_projectclassdtl2"))
            {
                strSql.Append("sys_projectclassdtl2='" + (model.sys_projectclassdtl2) + "',");
                strSql_use.Append("sys_projectclassdtl2=:sys_projectclassdtl2,");
                parameter = new OracleParameter(":sys_projectclassdtl2", OracleType.VarChar);
                parameter.Value = model.sys_projectclassdtl2;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_processinsid != null&& columsList.Contains("sys_processinsid"))
            {
                strSql.Append("sys_processinsid='" + (model.sys_processinsid) + "',");
                strSql_use.Append("sys_processinsid=:sys_processinsid,");
                parameter = new OracleParameter(":sys_processinsid", OracleType.VarChar);
                parameter.Value = model.sys_processinsid;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_projectclassdtl1_name != null&& columsList.Contains("sys_projectclassdtl1_name"))
            {
                strSql.Append("sys_projectclassdtl1_name='" + (model.sys_projectclassdtl1_name) + "',");
                strSql_use.Append("sys_projectclassdtl1_name=:sys_projectclassdtl1_name,");
                parameter = new OracleParameter(":sys_projectclassdtl1_name", OracleType.VarChar);
                parameter.Value = model.sys_projectclassdtl1_name;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_projectclassdtl2_name != null&& columsList.Contains("sys_projectclassdtl2_name"))
            {
                strSql.Append("sys_projectclassdtl2_name='" + (model.sys_projectclassdtl2_name) + "',");
                strSql_use.Append("sys_projectclassdtl2_name=:sys_projectclassdtl2_name,");
                parameter = new OracleParameter(":sys_projectclassdtl2_name", OracleType.VarChar);
                parameter.Value = model.sys_projectclassdtl2_name;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_first != null&& columsList.Contains("sys_first"))
            {
                strSql.Append("sys_first='" + (model.sys_first) + "',");
                strSql_use.Append("sys_first=:sys_first,");
                parameter = new OracleParameter(":sys_first", OracleType.VarChar);
                parameter.Value = model.sys_first;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_projectclassid != null&& columsList.Contains("sys_projectclassid"))
            {
                strSql.Append("sys_projectclassid='" + (model.sys_projectclassid) + "',");
                strSql_use.Append("sys_projectclassid=:sys_projectclassid,");
                parameter = new OracleParameter(":sys_projectclassid", OracleType.VarChar);
                parameter.Value = model.sys_projectclassid;
                parameterList.Add(parameter);
            }
            
	            if (model.fk_tbl_maintable_sys_id != null&& columsList.Contains("fk_tbl_maintable_sys_id"))
            {
                strSql.Append("fk_tbl_maintable_sys_id='" + (model.fk_tbl_maintable_sys_id) + "',");
                strSql_use.Append("fk_tbl_maintable_sys_id=:fk_tbl_maintable_sys_id,");
                parameter = new OracleParameter(":fk_tbl_maintable_sys_id", OracleType.VarChar);
                parameter.Value = model.fk_tbl_maintable_sys_id;
                parameterList.Add(parameter);
            }
            
	            if (model.fk_workflow_sys_id != null&& columsList.Contains("fk_workflow_sys_id"))
            {
                strSql.Append("fk_workflow_sys_id='" + (model.fk_workflow_sys_id) + "',");
                strSql_use.Append("fk_workflow_sys_id=:fk_workflow_sys_id,");
                parameter = new OracleParameter(":fk_workflow_sys_id", OracleType.VarChar);
                parameter.Value = model.fk_workflow_sys_id;
                parameterList.Add(parameter);
            }
            
	            if (model.shpid != null&& columsList.Contains("shpid"))
            {
                strSql.Append("shpid='" + (model.shpid) + "',");
                strSql_use.Append("shpid=:shpid,");
                parameter = new OracleParameter(":shpid", OracleType.VarChar);
                parameter.Value = model.shpid;
                parameterList.Add(parameter);
            }
            
	            if (model.xmmc != null&& columsList.Contains("xmmc"))
            {
                strSql.Append("xmmc='" + (model.xmmc) + "',");
                strSql_use.Append("xmmc=:xmmc,");
                parameter = new OracleParameter(":xmmc", OracleType.VarChar);
                parameter.Value = model.xmmc;
                parameterList.Add(parameter);
            }
            
	            if (model.xzqy != null&& columsList.Contains("xzqy"))
            {
                strSql.Append("xzqy='" + (model.xzqy) + "',");
                strSql_use.Append("xzqy=:xzqy,");
                parameter = new OracleParameter(":xzqy", OracleType.VarChar);
                parameter.Value = model.xzqy;
                parameterList.Add(parameter);
            }
            
	            if (model.xzqyid != null&& columsList.Contains("xzqyid"))
            {
                strSql.Append("xzqyid='" + (model.xzqyid) + "',");
                strSql_use.Append("xzqyid=:xzqyid,");
                parameter = new OracleParameter(":xzqyid", OracleType.VarChar);
                parameter.Value = model.xzqyid;
                parameterList.Add(parameter);
            }
            
	            if (model.dwmc != null&& columsList.Contains("dwmc"))
            {
                strSql.Append("dwmc='" + (model.dwmc) + "',");
                strSql_use.Append("dwmc=:dwmc,");
                parameter = new OracleParameter(":dwmc", OracleType.VarChar);
                parameter.Value = model.dwmc;
                parameterList.Add(parameter);
            }
            
	            if (model.lrr != null&& columsList.Contains("lrr"))
            {
                strSql.Append("lrr='" + (model.lrr) + "',");
                strSql_use.Append("lrr=:lrr,");
                parameter = new OracleParameter(":lrr", OracleType.VarChar);
                parameter.Value = model.lrr;
                parameterList.Add(parameter);
            }
            
	            if (model.lrrq != null&& columsList.Contains("lrrq"))
            {
                strSql.Append("lrrq=to_date('" + model.lrrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("lrrq=:lrrq,");
                parameter = new OracleParameter(":lrrq", OracleType.DateTime);
                parameter.Value = model.lrrq;
                parameterList.Add(parameter);
            }
            
	            if (model.bz != null&& columsList.Contains("bz"))
            {
                strSql.Append("bz='" + (model.bz) + "',");
                strSql_use.Append("bz=:bz,");
                parameter = new OracleParameter(":bz", OracleType.VarChar);
                parameter.Value = model.bz;
                parameterList.Add(parameter);
            }
            
	            if (model.xmlx != null&& columsList.Contains("xmlx"))
            {
                strSql.Append("xmlx='" + (model.xmlx) + "',");
                strSql_use.Append("xmlx=:xmlx,");
                parameter = new OracleParameter(":xmlx", OracleType.VarChar);
                parameter.Value = model.xmlx;
                parameterList.Add(parameter);
            }
            
	            if (model.xmlxid != null&& columsList.Contains("xmlxid"))
            {
                strSql.Append("xmlxid='" + (model.xmlxid) + "',");
                strSql_use.Append("xmlxid=:xmlxid,");
                parameter = new OracleParameter(":xmlxid", OracleType.VarChar);
                parameter.Value = model.xmlxid;
                parameterList.Add(parameter);
            }
            
	            if (model.value1 != null&& columsList.Contains("value1"))
            {
                strSql.Append("value1='" + (model.value1) + "',");
                strSql_use.Append("value1=:value1,");
                parameter = new OracleParameter(":value1", OracleType.VarChar);
                parameter.Value = model.value1;
                parameterList.Add(parameter);
            }
            
	            if (model.value2 != null&& columsList.Contains("value2"))
            {
                strSql.Append("value2='" + (model.value2) + "',");
                strSql_use.Append("value2=:value2,");
                parameter = new OracleParameter(":value2", OracleType.VarChar);
                parameter.Value = model.value2;
                parameterList.Add(parameter);
            }
            
	            if (model.value3 != null&& columsList.Contains("value3"))
            {
                strSql.Append("value3='" + (model.value3) + "',");
                strSql_use.Append("value3=:value3,");
                parameter = new OracleParameter(":value3", OracleType.VarChar);
                parameter.Value = model.value3;
                parameterList.Add(parameter);
            }
            
	            if (model.value4 != null&& columsList.Contains("value4"))
            {
                strSql.Append("value4='" + (model.value4) + "',");
                strSql_use.Append("value4=:value4,");
                parameter = new OracleParameter(":value4", OracleType.VarChar);
                parameter.Value = model.value4;
                parameterList.Add(parameter);
            }
            
	            if (model.value5 != null&& columsList.Contains("value5"))
            {
                strSql.Append("value5='" + (model.value5) + "',");
                strSql_use.Append("value5=:value5,");
                parameter = new OracleParameter(":value5", OracleType.VarChar);
                parameter.Value = model.value5;
                parameterList.Add(parameter);
            }
            
	            if (model.value6 != null&& columsList.Contains("value6"))
            {
                strSql.Append("value6='" + (model.value6) + "',");
                strSql_use.Append("value6=:value6,");
                parameter = new OracleParameter(":value6", OracleType.VarChar);
                parameter.Value = model.value6;
                parameterList.Add(parameter);
            }
            
	            if (model.value7 != null&& columsList.Contains("value7"))
            {
                strSql.Append("value7='" + (model.value7) + "',");
                strSql_use.Append("value7=:value7,");
                parameter = new OracleParameter(":value7", OracleType.VarChar);
                parameter.Value = model.value7;
                parameterList.Add(parameter);
            }
            
	            if (model.value8 != null&& columsList.Contains("value8"))
            {
                strSql.Append("value8='" + (model.value8) + "',");
                strSql_use.Append("value8=:value8,");
                parameter = new OracleParameter(":value8", OracleType.VarChar);
                parameter.Value = model.value8;
                parameterList.Add(parameter);
            }
            
	            if (model.value9 != null&& columsList.Contains("value9"))
            {
                strSql.Append("value9='" + (model.value9) + "',");
                strSql_use.Append("value9=:value9,");
                parameter = new OracleParameter(":value9", OracleType.VarChar);
                parameter.Value = model.value9;
                parameterList.Add(parameter);
            }
            
	            if (model.value10 != null&& columsList.Contains("value10"))
            {
                strSql.Append("value10='" + (model.value10) + "',");
                strSql_use.Append("value10=:value10,");
                parameter = new OracleParameter(":value10", OracleType.VarChar);
                parameter.Value = model.value10;
                parameterList.Add(parameter);
            }
            
	            if (model.sys_projectclassid_name != null&& columsList.Contains("sys_projectclassid_name"))
            {
                strSql.Append("sys_projectclassid_name='" + (model.sys_projectclassid_name) + "',");
                strSql_use.Append("sys_projectclassid_name=:sys_projectclassid_name,");
                parameter = new OracleParameter(":sys_projectclassid_name", OracleType.VarChar);
                parameter.Value = model.sys_projectclassid_name;
                parameterList.Add(parameter);
            }
            
            int n = strSql.ToString().LastIndexOf(",");
            strSql.Remove(n, 1);
            strSql.Append(" where sys_id='" + model.sys_id + "'");
            
            n = strSql_use.ToString().LastIndexOf(",");
            strSql_use.Remove(n, 1);
            strSql_use.Append(" where sys_id='" + model.sys_id + "'");
            #endregion
            int columscount = 0;
            if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            	#region parameter
                if (parameterList.Count > 0)
                {
                    if (t == null)
                    {
                        columscount = _iAccessData.ExecuteSql(strSql_use.ToString(), parameterList.ToArray());
                    }
                    else
                    {
                        columscount = t.ExecuteSql(strSql_use.ToString(), parameterList.ToArray());
                    }
                }              
                #endregion
            }
            else
            {
            	#region sql
				if (t == null)
				{
					columscount = _iAccessData.ExecuteSql(strSql.ToString());
				}
				else
				{
					columscount = t.ExecuteSql(strSql.ToString());
				}
								#endregion
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_maintable> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_maintable model in modelList)
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
            strSql.Append("delete tbl_maintable where  ");
            strSql.Append(whereString);
           int executecount = 0;
            if(t==null)
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
            strSql.Append("update tbl_maintable set ");
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
            strSql.Append("select count(*) from tbl_maintable");
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
        public List<sara.dd.ldsw.model.tbl_maintable> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_maintable t where");
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
            if(t==null)
            {
                resultDataTable = _iAccessData.Query(strSql.ToString()).Tables[0];
            }
            else
            {
                resultDataTable = t.Query(strSql.ToString()).Tables[0];
            }

            List<sara.dd.ldsw.model.tbl_maintable> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_maintable>(resultDataTable);
			if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            }
            else //如果是sql形式的话，则进行textReturn
            {
                modelList = Eva.Library.Format.FormatTextTool.ModelListReturn(modelList);
            }
            return modelList;
        }




        /// <summary>
        /// 得到最大ID
        /// </summary>
        public string GetMaxId(Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string sqlString = "update tbl_num set f_tablesys_id = ";
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_maintable')";
            sqlString += " where f_tablename  = 'tbl_maintable'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_maintable'";


            if (t == null)
            {
                return _iAccessData.GetSingle(sqlString).ToString();
            }
            else
            {
                return t.GetSingle(sqlString).ToString();
            }
        }


        #endregion 成员方法
    }
}