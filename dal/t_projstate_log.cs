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
    /// 数据访问类t_projstate_log 
    /// </summary>
    public class t_projstate_log : sara.dd.ldsw.idal.It_projstate_log
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public t_projstate_log()
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
        public string Add(sara.dd.ldsw.model.t_projstate_log model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.sys_flag != null)
            {
	            strSql1.Append("sys_flag,");
	            strSql2.Append("'" + (model.sys_flag) + "',");
	            strSql3.Append(":sys_flag,");
	            parameter = new OracleParameter(":sys_flag", OracleType.VarChar);
	            parameter.Value = model.sys_flag;
	            parameterList.Add(parameter);
            }
            
            if (model.businessname != null)
            {
	            strSql1.Append("businessname,");
	            strSql2.Append("'" + (model.businessname) + "',");
	            strSql3.Append(":businessname,");
	            parameter = new OracleParameter(":businessname", OracleType.VarChar);
	            parameter.Value = model.businessname;
	            parameterList.Add(parameter);
            }
            
            if (model.businessid != null)
            {
	            strSql1.Append("businessid,");
	            strSql2.Append("'" + (model.businessid) + "',");
	            strSql3.Append(":businessid,");
	            parameter = new OracleParameter(":businessid", OracleType.VarChar);
	            parameter.Value = model.businessid;
	            parameterList.Add(parameter);
            }
            
            if (model.fromstate != null)
            {
	            strSql1.Append("fromstate,");
	            strSql2.Append("'" + (model.fromstate) + "',");
	            strSql3.Append(":fromstate,");
	            parameter = new OracleParameter(":fromstate", OracleType.VarChar);
	            parameter.Value = model.fromstate;
	            parameterList.Add(parameter);
            }
            
            if (model.tostate != null)
            {
	            strSql1.Append("tostate,");
	            strSql2.Append("'" + (model.tostate) + "',");
	            strSql3.Append(":tostate,");
	            parameter = new OracleParameter(":tostate", OracleType.VarChar);
	            parameter.Value = model.tostate;
	            parameterList.Add(parameter);
            }
            
            if (model.processsinsid != null)
            {
	            strSql1.Append("processsinsid,");
	            strSql2.Append("'" + (model.processsinsid) + "',");
	            strSql3.Append(":processsinsid,");
	            parameter = new OracleParameter(":processsinsid", OracleType.VarChar);
	            parameter.Value = model.processsinsid;
	            parameterList.Add(parameter);
            }
            
            if (model.processdefid != null)
            {
	            strSql1.Append("processdefid,");
	            strSql2.Append("'" + (model.processdefid) + "',");
	            strSql3.Append(":processdefid,");
	            parameter = new OracleParameter(":processdefid", OracleType.VarChar);
	            parameter.Value = model.processdefid;
	            parameterList.Add(parameter);
            }
            
            if (model.workflowid != null)
            {
	            strSql1.Append("workflowid,");
	            strSql2.Append("'" + (model.workflowid) + "',");
	            strSql3.Append(":workflowid,");
	            parameter = new OracleParameter(":workflowid", OracleType.VarChar);
	            parameter.Value = model.workflowid;
	            parameterList.Add(parameter);
            }
            
            if (model.remark != null)
            {
	            strSql1.Append("remark,");
	            strSql2.Append("'" + (model.remark) + "',");
	            strSql3.Append(":remark,");
	            parameter = new OracleParameter(":remark", OracleType.VarChar);
	            parameter.Value = model.remark;
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
            
            strSql.Append("insert into t_projstate_log(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into t_projstate_log(");
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
        public string AddList(List<sara.dd.ldsw.model.t_projstate_log> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.t_projstate_log model in modelList)
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
        public string Update(sara.dd.ldsw.model.t_projstate_log model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update t_projstate_log set ");
            strSql_use.Append("update t_projstate_log set ");
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
            
	            if (model.sys_flag != null&& columsList.Contains("sys_flag"))
            {
                strSql.Append("sys_flag='" + (model.sys_flag) + "',");
                strSql_use.Append("sys_flag=:sys_flag,");
                parameter = new OracleParameter(":sys_flag", OracleType.VarChar);
                parameter.Value = model.sys_flag;
                parameterList.Add(parameter);
            }
            
	            if (model.businessname != null&& columsList.Contains("businessname"))
            {
                strSql.Append("businessname='" + (model.businessname) + "',");
                strSql_use.Append("businessname=:businessname,");
                parameter = new OracleParameter(":businessname", OracleType.VarChar);
                parameter.Value = model.businessname;
                parameterList.Add(parameter);
            }
            
	            if (model.businessid != null&& columsList.Contains("businessid"))
            {
                strSql.Append("businessid='" + (model.businessid) + "',");
                strSql_use.Append("businessid=:businessid,");
                parameter = new OracleParameter(":businessid", OracleType.VarChar);
                parameter.Value = model.businessid;
                parameterList.Add(parameter);
            }
            
	            if (model.fromstate != null&& columsList.Contains("fromstate"))
            {
                strSql.Append("fromstate='" + (model.fromstate) + "',");
                strSql_use.Append("fromstate=:fromstate,");
                parameter = new OracleParameter(":fromstate", OracleType.VarChar);
                parameter.Value = model.fromstate;
                parameterList.Add(parameter);
            }
            
	            if (model.tostate != null&& columsList.Contains("tostate"))
            {
                strSql.Append("tostate='" + (model.tostate) + "',");
                strSql_use.Append("tostate=:tostate,");
                parameter = new OracleParameter(":tostate", OracleType.VarChar);
                parameter.Value = model.tostate;
                parameterList.Add(parameter);
            }
            
	            if (model.processsinsid != null&& columsList.Contains("processsinsid"))
            {
                strSql.Append("processsinsid='" + (model.processsinsid) + "',");
                strSql_use.Append("processsinsid=:processsinsid,");
                parameter = new OracleParameter(":processsinsid", OracleType.VarChar);
                parameter.Value = model.processsinsid;
                parameterList.Add(parameter);
            }
            
	            if (model.processdefid != null&& columsList.Contains("processdefid"))
            {
                strSql.Append("processdefid='" + (model.processdefid) + "',");
                strSql_use.Append("processdefid=:processdefid,");
                parameter = new OracleParameter(":processdefid", OracleType.VarChar);
                parameter.Value = model.processdefid;
                parameterList.Add(parameter);
            }
            
	            if (model.workflowid != null&& columsList.Contains("workflowid"))
            {
                strSql.Append("workflowid='" + (model.workflowid) + "',");
                strSql_use.Append("workflowid=:workflowid,");
                parameter = new OracleParameter(":workflowid", OracleType.VarChar);
                parameter.Value = model.workflowid;
                parameterList.Add(parameter);
            }
            
	            if (model.remark != null&& columsList.Contains("remark"))
            {
                strSql.Append("remark='" + (model.remark) + "',");
                strSql_use.Append("remark=:remark,");
                parameter = new OracleParameter(":remark", OracleType.VarChar);
                parameter.Value = model.remark;
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
        public string UpdateList(List<sara.dd.ldsw.model.t_projstate_log> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.t_projstate_log model in modelList)
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
            strSql.Append("delete t_projstate_log where  ");
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
            strSql.Append("update t_projstate_log set ");
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
            strSql.Append("select count(*) from t_projstate_log");
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
        public List<sara.dd.ldsw.model.t_projstate_log> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from t_projstate_log t where");
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

            List<sara.dd.ldsw.model.t_projstate_log> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.t_projstate_log>(resultDataTable);
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

            string sqlString = "update t_num set f_tablesys_id = ";
            sqlString += " (select to_number(f_tablesys_id)+1 from t_num where f_tablename  = 't_projstate_log')";
            sqlString += " where f_tablename  = 't_projstate_log'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from t_num where f_tablename  = 't_projstate_log'";


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