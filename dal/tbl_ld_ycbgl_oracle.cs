﻿//------------------------------------------------------------------------------
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
    /// 数据访问类tbl_ld_ycbgl 
    /// </summary>
    public class tbl_ld_ycbgl : sara.dd.ldsw.idal.Itbl_ld_ycbgl
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_ycbgl()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_ycbgl model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_value1 != null)
            {
	            strSql1.Append("f_value1,");
	            strSql2.Append("'" + (model.f_value1) + "',");
	            strSql3.Append(":f_value1,");
	            parameter = new OracleParameter(":f_value1", OracleType.VarChar);
	            parameter.Value = model.f_value1;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value2 != null)
            {
	            strSql1.Append("f_value2,");
	            strSql2.Append("'" + (model.f_value2) + "',");
	            strSql3.Append(":f_value2,");
	            parameter = new OracleParameter(":f_value2", OracleType.VarChar);
	            parameter.Value = model.f_value2;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value3 != null)
            {
	            strSql1.Append("f_value3,");
	            strSql2.Append("'" + (model.f_value3) + "',");
	            strSql3.Append(":f_value3,");
	            parameter = new OracleParameter(":f_value3", OracleType.VarChar);
	            parameter.Value = model.f_value3;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value4 != null)
            {
	            strSql1.Append("f_value4,");
	            strSql2.Append("'" + (model.f_value4) + "',");
	            strSql3.Append(":f_value4,");
	            parameter = new OracleParameter(":f_value4", OracleType.VarChar);
	            parameter.Value = model.f_value4;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value5 != null)
            {
	            strSql1.Append("f_value5,");
	            strSql2.Append("'" + (model.f_value5) + "',");
	            strSql3.Append(":f_value5,");
	            parameter = new OracleParameter(":f_value5", OracleType.VarChar);
	            parameter.Value = model.f_value5;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value6 != null)
            {
	            strSql1.Append("f_value6,");
	            strSql2.Append("'" + (model.f_value6) + "',");
	            strSql3.Append(":f_value6,");
	            parameter = new OracleParameter(":f_value6", OracleType.VarChar);
	            parameter.Value = model.f_value6;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value7 != null)
            {
	            strSql1.Append("f_value7,");
	            strSql2.Append("'" + (model.f_value7) + "',");
	            strSql3.Append(":f_value7,");
	            parameter = new OracleParameter(":f_value7", OracleType.VarChar);
	            parameter.Value = model.f_value7;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value8 != null)
            {
	            strSql1.Append("f_value8,");
	            strSql2.Append("'" + (model.f_value8) + "',");
	            strSql3.Append(":f_value8,");
	            parameter = new OracleParameter(":f_value8", OracleType.VarChar);
	            parameter.Value = model.f_value8;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value9 != null)
            {
	            strSql1.Append("f_value9,");
	            strSql2.Append("'" + (model.f_value9) + "',");
	            strSql3.Append(":f_value9,");
	            parameter = new OracleParameter(":f_value9", OracleType.VarChar);
	            parameter.Value = model.f_value9;
	            parameterList.Add(parameter);
            }
            
            if (model.f_value10 != null)
            {
	            strSql1.Append("f_value10,");
	            strSql2.Append("'" + (model.f_value10) + "',");
	            strSql3.Append(":f_value10,");
	            parameter = new OracleParameter(":f_value10", OracleType.VarChar);
	            parameter.Value = model.f_value10;
	            parameterList.Add(parameter);
            }
            
            if (model.f_ywbh != null)
            {
	            strSql1.Append("f_ywbh,");
	            strSql2.Append("'" + (model.f_ywbh) + "',");
	            strSql3.Append(":f_ywbh,");
	            parameter = new OracleParameter(":f_ywbh", OracleType.VarChar);
	            parameter.Value = model.f_ywbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dcr != null)
            {
	            strSql1.Append("f_dcr,");
	            strSql2.Append("'" + (model.f_dcr) + "',");
	            strSql3.Append(":f_dcr,");
	            parameter = new OracleParameter(":f_dcr", OracleType.VarChar);
	            parameter.Value = model.f_dcr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dcsj != null)
            {
	            strSql1.Append("f_dcsj,");
	            strSql2.Append("to_date('" + model.f_dcsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_dcsj,");
	            parameter = new OracleParameter(":f_dcsj", OracleType.DateTime);
	            parameter.Value = model.f_dcsj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_drr != null)
            {
	            strSql1.Append("f_drr,");
	            strSql2.Append("'" + (model.f_drr) + "',");
	            strSql3.Append(":f_drr,");
	            parameter = new OracleParameter(":f_drr", OracleType.VarChar);
	            parameter.Value = model.f_drr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_drsj != null)
            {
	            strSql1.Append("f_drsj,");
	            strSql2.Append("to_date('" + model.f_drsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_drsj,");
	            parameter = new OracleParameter(":f_drsj", OracleType.DateTime);
	            parameter.Value = model.f_drsj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cjcbsjzxr != null)
            {
	            strSql1.Append("f_cjcbsjzxr,");
	            strSql2.Append("'" + (model.f_cjcbsjzxr) + "',");
	            strSql3.Append(":f_cjcbsjzxr,");
	            parameter = new OracleParameter(":f_cjcbsjzxr", OracleType.VarChar);
	            parameter.Value = model.f_cjcbsjzxr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cjcbsj != null)
            {
	            strSql1.Append("f_cjcbsj,");
	            strSql2.Append("to_date('" + model.f_cjcbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_cjcbsj,");
	            parameter = new OracleParameter(":f_cjcbsj", OracleType.DateTime);
	            parameter.Value = model.f_cjcbsj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_drwj != null)
            {
	            strSql1.Append("f_drwj,");
	            strSql2.Append("'" + (model.f_drwj) + "',");
	            strSql3.Append(":f_drwj,");
	            parameter = new OracleParameter(":f_drwj", OracleType.VarChar);
	            parameter.Value = model.f_drwj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_bcfj != null)
            {
	            strSql1.Append("f_bcfj,");
	            strSql2.Append("'" + (model.f_bcfj) + "',");
	            strSql3.Append(":f_bcfj,");
	            parameter = new OracleParameter(":f_bcfj", OracleType.VarChar);
	            parameter.Value = model.f_bcfj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_zt != null)
            {
	            strSql1.Append("f_zt,");
	            strSql2.Append("'" + (model.f_zt) + "',");
	            strSql3.Append(":f_zt,");
	            parameter = new OracleParameter(":f_zt", OracleType.VarChar);
	            parameter.Value = model.f_zt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_ztid != null)
            {
	            strSql1.Append("f_ztid,");
	            strSql2.Append("'" + (model.f_ztid) + "',");
	            strSql3.Append(":f_ztid,");
	            parameter = new OracleParameter(":f_ztid", OracleType.VarChar);
	            parameter.Value = model.f_ztid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_bz != null)
            {
	            strSql1.Append("f_bz,");
	            strSql2.Append("'" + (model.f_bz) + "',");
	            strSql3.Append(":f_bz,");
	            parameter = new OracleParameter(":f_bz", OracleType.VarChar);
	            parameter.Value = model.f_bz;
	            parameterList.Add(parameter);
            }
            
            strSql.Append("insert into tbl_ld_ycbgl(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_ycbgl(");
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
		            List<string> paraStrList = new List<string>();
                List<OracleParameter> pList = new List<OracleParameter>();
                OracleParameter p = null;
	            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
	            if (paraStrList.Count > 0)
	            {
	                string updateSqlString = " update tbl_ld_ycbgl set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
	                if (pList.Count > 0)
	                {
	                    if (t == null)
	                    {
	                        _iAccessData.ExecuteSql(updateSqlString, pList.ToArray());
	                    }
	                    else
	                    {
	                        t.ExecuteSql(updateSqlString, pList.ToArray());
	                    }
	                }	                
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_ycbgl> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ycbgl model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_ycbgl model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_ycbgl set ");
            strSql_use.Append("update tbl_ld_ycbgl set ");
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
            
	            if (model.f_value1 != null&& columsList.Contains("f_value1"))
            {
                strSql.Append("f_value1='" + (model.f_value1) + "',");
                strSql_use.Append("f_value1=:f_value1,");
                parameter = new OracleParameter(":f_value1", OracleType.VarChar);
                parameter.Value = model.f_value1;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value2 != null&& columsList.Contains("f_value2"))
            {
                strSql.Append("f_value2='" + (model.f_value2) + "',");
                strSql_use.Append("f_value2=:f_value2,");
                parameter = new OracleParameter(":f_value2", OracleType.VarChar);
                parameter.Value = model.f_value2;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value3 != null&& columsList.Contains("f_value3"))
            {
                strSql.Append("f_value3='" + (model.f_value3) + "',");
                strSql_use.Append("f_value3=:f_value3,");
                parameter = new OracleParameter(":f_value3", OracleType.VarChar);
                parameter.Value = model.f_value3;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value4 != null&& columsList.Contains("f_value4"))
            {
                strSql.Append("f_value4='" + (model.f_value4) + "',");
                strSql_use.Append("f_value4=:f_value4,");
                parameter = new OracleParameter(":f_value4", OracleType.VarChar);
                parameter.Value = model.f_value4;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value5 != null&& columsList.Contains("f_value5"))
            {
                strSql.Append("f_value5='" + (model.f_value5) + "',");
                strSql_use.Append("f_value5=:f_value5,");
                parameter = new OracleParameter(":f_value5", OracleType.VarChar);
                parameter.Value = model.f_value5;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value6 != null&& columsList.Contains("f_value6"))
            {
                strSql.Append("f_value6='" + (model.f_value6) + "',");
                strSql_use.Append("f_value6=:f_value6,");
                parameter = new OracleParameter(":f_value6", OracleType.VarChar);
                parameter.Value = model.f_value6;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value7 != null&& columsList.Contains("f_value7"))
            {
                strSql.Append("f_value7='" + (model.f_value7) + "',");
                strSql_use.Append("f_value7=:f_value7,");
                parameter = new OracleParameter(":f_value7", OracleType.VarChar);
                parameter.Value = model.f_value7;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value8 != null&& columsList.Contains("f_value8"))
            {
                strSql.Append("f_value8='" + (model.f_value8) + "',");
                strSql_use.Append("f_value8=:f_value8,");
                parameter = new OracleParameter(":f_value8", OracleType.VarChar);
                parameter.Value = model.f_value8;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value9 != null&& columsList.Contains("f_value9"))
            {
                strSql.Append("f_value9='" + (model.f_value9) + "',");
                strSql_use.Append("f_value9=:f_value9,");
                parameter = new OracleParameter(":f_value9", OracleType.VarChar);
                parameter.Value = model.f_value9;
                parameterList.Add(parameter);
            }
            
	            if (model.f_value10 != null&& columsList.Contains("f_value10"))
            {
                strSql.Append("f_value10='" + (model.f_value10) + "',");
                strSql_use.Append("f_value10=:f_value10,");
                parameter = new OracleParameter(":f_value10", OracleType.VarChar);
                parameter.Value = model.f_value10;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ywbh != null&& columsList.Contains("f_ywbh"))
            {
                strSql.Append("f_ywbh='" + (model.f_ywbh) + "',");
                strSql_use.Append("f_ywbh=:f_ywbh,");
                parameter = new OracleParameter(":f_ywbh", OracleType.VarChar);
                parameter.Value = model.f_ywbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dcr != null&& columsList.Contains("f_dcr"))
            {
                strSql.Append("f_dcr='" + (model.f_dcr) + "',");
                strSql_use.Append("f_dcr=:f_dcr,");
                parameter = new OracleParameter(":f_dcr", OracleType.VarChar);
                parameter.Value = model.f_dcr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dcsj != null&& columsList.Contains("f_dcsj"))
            {
                strSql.Append("f_dcsj=to_date('" + model.f_dcsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_dcsj=:f_dcsj,");
                parameter = new OracleParameter(":f_dcsj", OracleType.DateTime);
                parameter.Value = model.f_dcsj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_drr != null&& columsList.Contains("f_drr"))
            {
                strSql.Append("f_drr='" + (model.f_drr) + "',");
                strSql_use.Append("f_drr=:f_drr,");
                parameter = new OracleParameter(":f_drr", OracleType.VarChar);
                parameter.Value = model.f_drr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_drsj != null&& columsList.Contains("f_drsj"))
            {
                strSql.Append("f_drsj=to_date('" + model.f_drsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_drsj=:f_drsj,");
                parameter = new OracleParameter(":f_drsj", OracleType.DateTime);
                parameter.Value = model.f_drsj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cjcbsjzxr != null&& columsList.Contains("f_cjcbsjzxr"))
            {
                strSql.Append("f_cjcbsjzxr='" + (model.f_cjcbsjzxr) + "',");
                strSql_use.Append("f_cjcbsjzxr=:f_cjcbsjzxr,");
                parameter = new OracleParameter(":f_cjcbsjzxr", OracleType.VarChar);
                parameter.Value = model.f_cjcbsjzxr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cjcbsj != null&& columsList.Contains("f_cjcbsj"))
            {
                strSql.Append("f_cjcbsj=to_date('" + model.f_cjcbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_cjcbsj=:f_cjcbsj,");
                parameter = new OracleParameter(":f_cjcbsj", OracleType.DateTime);
                parameter.Value = model.f_cjcbsj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_drwj != null&& columsList.Contains("f_drwj"))
            {
                strSql.Append("f_drwj='" + (model.f_drwj) + "',");
                strSql_use.Append("f_drwj=:f_drwj,");
                parameter = new OracleParameter(":f_drwj", OracleType.VarChar);
                parameter.Value = model.f_drwj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bcfj != null&& columsList.Contains("f_bcfj"))
            {
                strSql.Append("f_bcfj='" + (model.f_bcfj) + "',");
                strSql_use.Append("f_bcfj=:f_bcfj,");
                parameter = new OracleParameter(":f_bcfj", OracleType.VarChar);
                parameter.Value = model.f_bcfj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_zt != null&& columsList.Contains("f_zt"))
            {
                strSql.Append("f_zt='" + (model.f_zt) + "',");
                strSql_use.Append("f_zt=:f_zt,");
                parameter = new OracleParameter(":f_zt", OracleType.VarChar);
                parameter.Value = model.f_zt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ztid != null&& columsList.Contains("f_ztid"))
            {
                strSql.Append("f_ztid='" + (model.f_ztid) + "',");
                strSql_use.Append("f_ztid=:f_ztid,");
                parameter = new OracleParameter(":f_ztid", OracleType.VarChar);
                parameter.Value = model.f_ztid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bz != null&& columsList.Contains("f_bz"))
            {
                strSql.Append("f_bz='" + (model.f_bz) + "',");
                strSql_use.Append("f_bz=:f_bz,");
                parameter = new OracleParameter(":f_bz", OracleType.VarChar);
                parameter.Value = model.f_bz;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_ycbgl> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ycbgl model in modelList)
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
            strSql.Append("delete tbl_ld_ycbgl where  ");
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
            strSql.Append("update tbl_ld_ycbgl set ");
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
            strSql.Append("select count(*) from tbl_ld_ycbgl");
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
        public List<sara.dd.ldsw.model.tbl_ld_ycbgl> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_ycbgl t where");
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

            List<sara.dd.ldsw.model.tbl_ld_ycbgl> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_ycbgl>(resultDataTable);
			if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            }
            else //如果是sql形式的话，则进行textReturn
            {
                modelList = Eva.Library.Format.FormatTextTool.ModelListReturn(modelList);
            }
            return modelList;
        }


        public DataTable GetDataTableForPC(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_ycbgl t where");
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
           
            return resultDataTable;
        }


        public DataTable GetDataTableForApp(string whereString, string orderByString, string columnsString, string countString, string stepString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_ycbgl t where");
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

            if (countString != "" && countString != null && stepString != "" && stepString != null)
            {
                strSql.Append(" where b.rn>'" + countString + "'  and b.rn <='" + (int.Parse(countString) + int.Parse(stepString)).ToString() + "' ");
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

            return resultDataTable;
        }


        /// <summary>
        /// 得到最大ID
        /// </summary>
        public string GetMaxId(Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string sqlString = "update tbl_num set f_tablesys_id = ";
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ycbgl')";
            sqlString += " where f_tablename  = 'tbl_ld_ycbgl'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ycbgl'";


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
















