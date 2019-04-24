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
    /// 数据访问类tbl_app_codefactory 
    /// </summary>
    public class tbl_app_codefactory : sara.dd.ldsw.idal.Itbl_app_codefactory
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_app_codefactory()
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
        public string Add(sara.dd.ldsw.model.tbl_app_codefactory model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_text != null)
            {
	            strSql1.Append("f_text,");
	            strSql2.Append("'" + (model.f_text) + "',");
	            strSql3.Append(":f_text,");
	            parameter = new OracleParameter(":f_text", OracleType.VarChar);
	            parameter.Value = model.f_text;
	            parameterList.Add(parameter);
            }
            
            if (model.f_en != null)
            {
	            strSql1.Append("f_en,");
	            strSql2.Append("'" + (model.f_en) + "',");
	            strSql3.Append(":f_en,");
	            parameter = new OracleParameter(":f_en", OracleType.VarChar);
	            parameter.Value = model.f_en;
	            parameterList.Add(parameter);
            }
            
            if (model.f_num != null)
            {
	            strSql1.Append("f_num,");
	            strSql2.Append("'" + (model.f_num) + "',");
	            strSql3.Append(":f_num,");
	            parameter = new OracleParameter(":f_num", OracleType.VarChar);
	            parameter.Value = model.f_num;
	            parameterList.Add(parameter);
            }
            
            if (model.f_password != null)
            {
	            strSql1.Append("f_password,");
	            strSql2.Append("'" + (model.f_password) + "',");
	            strSql3.Append(":f_password,");
	            parameter = new OracleParameter(":f_password", OracleType.VarChar);
	            parameter.Value = model.f_password;
	            parameterList.Add(parameter);
            }
            
            if (model.f_textarea != null)
            {
	            strSql1.Append("f_textarea,");
	            strSql2.Append("'" + (model.f_textarea) + "',");
	            strSql3.Append(":f_textarea,");
	            parameter = new OracleParameter(":f_textarea", OracleType.VarChar);
	            parameter.Value = model.f_textarea;
	            parameterList.Add(parameter);
            }
            
            if (model.f_textbutton != null)
            {
	            strSql1.Append("f_textbutton,");
	            strSql2.Append("'" + (model.f_textbutton) + "',");
	            strSql3.Append(":f_textbutton,");
	            parameter = new OracleParameter(":f_textbutton", OracleType.VarChar);
	            parameter.Value = model.f_textbutton;
	            parameterList.Add(parameter);
            }
            
            if (model.f_date != null)
            {
	            strSql1.Append("f_date,");
	            strSql2.Append("to_date('" + model.f_date.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_date,");
	            parameter = new OracleParameter(":f_date", OracleType.DateTime);
	            parameter.Value = model.f_date;
	            parameterList.Add(parameter);
            }
            
            if (model.f_time != null)
            {
	            strSql1.Append("f_time,");
	            strSql2.Append("'" + (model.f_time) + "',");
	            strSql3.Append(":f_time,");
	            parameter = new OracleParameter(":f_time", OracleType.VarChar);
	            parameter.Value = model.f_time;
	            parameterList.Add(parameter);
            }
            
            if (model.f_autocomplete != null)
            {
	            strSql1.Append("f_autocomplete,");
	            strSql2.Append("'" + (model.f_autocomplete) + "',");
	            strSql3.Append(":f_autocomplete,");
	            parameter = new OracleParameter(":f_autocomplete", OracleType.VarChar);
	            parameter.Value = model.f_autocomplete;
	            parameterList.Add(parameter);
            }
            
            if (model.f_stepper != null)
            {
	            strSql1.Append("f_stepper,");
	            strSql2.Append("'" + (model.f_stepper) + "',");
	            strSql3.Append(":f_stepper,");
	            parameter = new OracleParameter(":f_stepper", OracleType.VarChar);
	            parameter.Value = model.f_stepper;
	            parameterList.Add(parameter);
            }
            
            if (model.f_switch != null)
            {
	            strSql1.Append("f_switch,");
	            strSql2.Append("'" + (model.f_switch) + "',");
	            strSql3.Append(":f_switch,");
	            parameter = new OracleParameter(":f_switch", OracleType.VarChar);
	            parameter.Value = model.f_switch;
	            parameterList.Add(parameter);
            }
            
            if (model.f_valuelist != null)
            {
	            strSql1.Append("f_valuelist,");
	            strSql2.Append("'" + (model.f_valuelist) + "',");
	            strSql3.Append(":f_valuelist,");
	            parameter = new OracleParameter(":f_valuelist", OracleType.VarChar);
	            parameter.Value = model.f_valuelist;
	            parameterList.Add(parameter);
            }
            
            if (model.f_buttonlist_single != null)
            {
	            strSql1.Append("f_buttonlist_single,");
	            strSql2.Append("'" + (model.f_buttonlist_single) + "',");
	            strSql3.Append(":f_buttonlist_single,");
	            parameter = new OracleParameter(":f_buttonlist_single", OracleType.VarChar);
	            parameter.Value = model.f_buttonlist_single;
	            parameterList.Add(parameter);
            }
            
            if (model.f_buttonlist_singleid != null)
            {
	            strSql1.Append("f_buttonlist_singleid,");
	            strSql2.Append("'" + (model.f_buttonlist_singleid) + "',");
	            strSql3.Append(":f_buttonlist_singleid,");
	            parameter = new OracleParameter(":f_buttonlist_singleid", OracleType.VarChar);
	            parameter.Value = model.f_buttonlist_singleid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_buttonlist_multi != null)
            {
	            strSql1.Append("f_buttonlist_multi,");
	            strSql2.Append("'" + (model.f_buttonlist_multi) + "',");
	            strSql3.Append(":f_buttonlist_multi,");
	            parameter = new OracleParameter(":f_buttonlist_multi", OracleType.VarChar);
	            parameter.Value = model.f_buttonlist_multi;
	            parameterList.Add(parameter);
            }
            
            if (model.f_buttonlist_multiid != null)
            {
	            strSql1.Append("f_buttonlist_multiid,");
	            strSql2.Append("'" + (model.f_buttonlist_multiid) + "',");
	            strSql3.Append(":f_buttonlist_multiid,");
	            parameter = new OracleParameter(":f_buttonlist_multiid", OracleType.VarChar);
	            parameter.Value = model.f_buttonlist_multiid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_itemlist_single != null)
            {
	            strSql1.Append("f_itemlist_single,");
	            strSql2.Append("'" + (model.f_itemlist_single) + "',");
	            strSql3.Append(":f_itemlist_single,");
	            parameter = new OracleParameter(":f_itemlist_single", OracleType.VarChar);
	            parameter.Value = model.f_itemlist_single;
	            parameterList.Add(parameter);
            }
            
            if (model.f_itemlist_singleid != null)
            {
	            strSql1.Append("f_itemlist_singleid,");
	            strSql2.Append("'" + (model.f_itemlist_singleid) + "',");
	            strSql3.Append(":f_itemlist_singleid,");
	            parameter = new OracleParameter(":f_itemlist_singleid", OracleType.VarChar);
	            parameter.Value = model.f_itemlist_singleid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_itemlist_multi != null)
            {
	            strSql1.Append("f_itemlist_multi,");
	            strSql2.Append("'" + (model.f_itemlist_multi) + "',");
	            strSql3.Append(":f_itemlist_multi,");
	            parameter = new OracleParameter(":f_itemlist_multi", OracleType.VarChar);
	            parameter.Value = model.f_itemlist_multi;
	            parameterList.Add(parameter);
            }
            
            if (model.f_itemlist_multiid != null)
            {
	            strSql1.Append("f_itemlist_multiid,");
	            strSql2.Append("'" + (model.f_itemlist_multiid) + "',");
	            strSql3.Append(":f_itemlist_multiid,");
	            parameter = new OracleParameter(":f_itemlist_multiid", OracleType.VarChar);
	            parameter.Value = model.f_itemlist_multiid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_poplist_single != null)
            {
	            strSql1.Append("f_poplist_single,");
	            strSql2.Append("'" + (model.f_poplist_single) + "',");
	            strSql3.Append(":f_poplist_single,");
	            parameter = new OracleParameter(":f_poplist_single", OracleType.VarChar);
	            parameter.Value = model.f_poplist_single;
	            parameterList.Add(parameter);
            }
            
            if (model.f_poplist_singleid != null)
            {
	            strSql1.Append("f_poplist_singleid,");
	            strSql2.Append("'" + (model.f_poplist_singleid) + "',");
	            strSql3.Append(":f_poplist_singleid,");
	            parameter = new OracleParameter(":f_poplist_singleid", OracleType.VarChar);
	            parameter.Value = model.f_poplist_singleid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_poplist_multi != null)
            {
	            strSql1.Append("f_poplist_multi,");
	            strSql2.Append("'" + (model.f_poplist_multi) + "',");
	            strSql3.Append(":f_poplist_multi,");
	            parameter = new OracleParameter(":f_poplist_multi", OracleType.VarChar);
	            parameter.Value = model.f_poplist_multi;
	            parameterList.Add(parameter);
            }
            
            if (model.f_poplist_multiid != null)
            {
	            strSql1.Append("f_poplist_multiid,");
	            strSql2.Append("'" + (model.f_poplist_multiid) + "',");
	            strSql3.Append(":f_poplist_multiid,");
	            parameter = new OracleParameter(":f_poplist_multiid", OracleType.VarChar);
	            parameter.Value = model.f_poplist_multiid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_fileid != null)
            {
	            strSql1.Append("f_fileid,");
	            strSql2.Append("'" + (model.f_fileid) + "',");
	            strSql3.Append(":f_fileid,");
	            parameter = new OracleParameter(":f_fileid", OracleType.VarChar);
	            parameter.Value = model.f_fileid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_file != null)
            {
	            strSql1.Append("f_file,");
	            strSql2.Append("'" + (model.f_file) + "',");
	            strSql3.Append(":f_file,");
	            parameter = new OracleParameter(":f_file", OracleType.VarChar);
	            parameter.Value = model.f_file;
	            parameterList.Add(parameter);
            }
            
            strSql.Append("insert into tbl_app_codefactory(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_app_codefactory(");
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
        public string AddList(List<sara.dd.ldsw.model.tbl_app_codefactory> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_app_codefactory model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_app_codefactory model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_app_codefactory set ");
            strSql_use.Append("update tbl_app_codefactory set ");
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
            
	            if (model.f_text != null&& columsList.Contains("f_text"))
            {
                strSql.Append("f_text='" + (model.f_text) + "',");
                strSql_use.Append("f_text=:f_text,");
                parameter = new OracleParameter(":f_text", OracleType.VarChar);
                parameter.Value = model.f_text;
                parameterList.Add(parameter);
            }
            
	            if (model.f_en != null&& columsList.Contains("f_en"))
            {
                strSql.Append("f_en='" + (model.f_en) + "',");
                strSql_use.Append("f_en=:f_en,");
                parameter = new OracleParameter(":f_en", OracleType.VarChar);
                parameter.Value = model.f_en;
                parameterList.Add(parameter);
            }
            
	            if (model.f_num != null&& columsList.Contains("f_num"))
            {
                strSql.Append("f_num='" + (model.f_num) + "',");
                strSql_use.Append("f_num=:f_num,");
                parameter = new OracleParameter(":f_num", OracleType.VarChar);
                parameter.Value = model.f_num;
                parameterList.Add(parameter);
            }
            
	            if (model.f_password != null&& columsList.Contains("f_password"))
            {
                strSql.Append("f_password='" + (model.f_password) + "',");
                strSql_use.Append("f_password=:f_password,");
                parameter = new OracleParameter(":f_password", OracleType.VarChar);
                parameter.Value = model.f_password;
                parameterList.Add(parameter);
            }
            
	            if (model.f_textarea != null&& columsList.Contains("f_textarea"))
            {
                strSql.Append("f_textarea='" + (model.f_textarea) + "',");
                strSql_use.Append("f_textarea=:f_textarea,");
                parameter = new OracleParameter(":f_textarea", OracleType.VarChar);
                parameter.Value = model.f_textarea;
                parameterList.Add(parameter);
            }
            
	            if (model.f_textbutton != null&& columsList.Contains("f_textbutton"))
            {
                strSql.Append("f_textbutton='" + (model.f_textbutton) + "',");
                strSql_use.Append("f_textbutton=:f_textbutton,");
                parameter = new OracleParameter(":f_textbutton", OracleType.VarChar);
                parameter.Value = model.f_textbutton;
                parameterList.Add(parameter);
            }
            
	            if (model.f_date != null&& columsList.Contains("f_date"))
            {
                strSql.Append("f_date=to_date('" + model.f_date.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_date=:f_date,");
                parameter = new OracleParameter(":f_date", OracleType.DateTime);
                parameter.Value = model.f_date;
                parameterList.Add(parameter);
            }
            
	            if (model.f_time != null&& columsList.Contains("f_time"))
            {
                strSql.Append("f_time='" + (model.f_time) + "',");
                strSql_use.Append("f_time=:f_time,");
                parameter = new OracleParameter(":f_time", OracleType.VarChar);
                parameter.Value = model.f_time;
                parameterList.Add(parameter);
            }
            
	            if (model.f_autocomplete != null&& columsList.Contains("f_autocomplete"))
            {
                strSql.Append("f_autocomplete='" + (model.f_autocomplete) + "',");
                strSql_use.Append("f_autocomplete=:f_autocomplete,");
                parameter = new OracleParameter(":f_autocomplete", OracleType.VarChar);
                parameter.Value = model.f_autocomplete;
                parameterList.Add(parameter);
            }
            
	            if (model.f_stepper != null&& columsList.Contains("f_stepper"))
            {
                strSql.Append("f_stepper='" + (model.f_stepper) + "',");
                strSql_use.Append("f_stepper=:f_stepper,");
                parameter = new OracleParameter(":f_stepper", OracleType.VarChar);
                parameter.Value = model.f_stepper;
                parameterList.Add(parameter);
            }
            
	            if (model.f_switch != null&& columsList.Contains("f_switch"))
            {
                strSql.Append("f_switch='" + (model.f_switch) + "',");
                strSql_use.Append("f_switch=:f_switch,");
                parameter = new OracleParameter(":f_switch", OracleType.VarChar);
                parameter.Value = model.f_switch;
                parameterList.Add(parameter);
            }
            
	            if (model.f_valuelist != null&& columsList.Contains("f_valuelist"))
            {
                strSql.Append("f_valuelist='" + (model.f_valuelist) + "',");
                strSql_use.Append("f_valuelist=:f_valuelist,");
                parameter = new OracleParameter(":f_valuelist", OracleType.VarChar);
                parameter.Value = model.f_valuelist;
                parameterList.Add(parameter);
            }
            
	            if (model.f_buttonlist_single != null&& columsList.Contains("f_buttonlist_single"))
            {
                strSql.Append("f_buttonlist_single='" + (model.f_buttonlist_single) + "',");
                strSql_use.Append("f_buttonlist_single=:f_buttonlist_single,");
                parameter = new OracleParameter(":f_buttonlist_single", OracleType.VarChar);
                parameter.Value = model.f_buttonlist_single;
                parameterList.Add(parameter);
            }
            
	            if (model.f_buttonlist_singleid != null&& columsList.Contains("f_buttonlist_singleid"))
            {
                strSql.Append("f_buttonlist_singleid='" + (model.f_buttonlist_singleid) + "',");
                strSql_use.Append("f_buttonlist_singleid=:f_buttonlist_singleid,");
                parameter = new OracleParameter(":f_buttonlist_singleid", OracleType.VarChar);
                parameter.Value = model.f_buttonlist_singleid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_buttonlist_multi != null&& columsList.Contains("f_buttonlist_multi"))
            {
                strSql.Append("f_buttonlist_multi='" + (model.f_buttonlist_multi) + "',");
                strSql_use.Append("f_buttonlist_multi=:f_buttonlist_multi,");
                parameter = new OracleParameter(":f_buttonlist_multi", OracleType.VarChar);
                parameter.Value = model.f_buttonlist_multi;
                parameterList.Add(parameter);
            }
            
	            if (model.f_buttonlist_multiid != null&& columsList.Contains("f_buttonlist_multiid"))
            {
                strSql.Append("f_buttonlist_multiid='" + (model.f_buttonlist_multiid) + "',");
                strSql_use.Append("f_buttonlist_multiid=:f_buttonlist_multiid,");
                parameter = new OracleParameter(":f_buttonlist_multiid", OracleType.VarChar);
                parameter.Value = model.f_buttonlist_multiid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_itemlist_single != null&& columsList.Contains("f_itemlist_single"))
            {
                strSql.Append("f_itemlist_single='" + (model.f_itemlist_single) + "',");
                strSql_use.Append("f_itemlist_single=:f_itemlist_single,");
                parameter = new OracleParameter(":f_itemlist_single", OracleType.VarChar);
                parameter.Value = model.f_itemlist_single;
                parameterList.Add(parameter);
            }
            
	            if (model.f_itemlist_singleid != null&& columsList.Contains("f_itemlist_singleid"))
            {
                strSql.Append("f_itemlist_singleid='" + (model.f_itemlist_singleid) + "',");
                strSql_use.Append("f_itemlist_singleid=:f_itemlist_singleid,");
                parameter = new OracleParameter(":f_itemlist_singleid", OracleType.VarChar);
                parameter.Value = model.f_itemlist_singleid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_itemlist_multi != null&& columsList.Contains("f_itemlist_multi"))
            {
                strSql.Append("f_itemlist_multi='" + (model.f_itemlist_multi) + "',");
                strSql_use.Append("f_itemlist_multi=:f_itemlist_multi,");
                parameter = new OracleParameter(":f_itemlist_multi", OracleType.VarChar);
                parameter.Value = model.f_itemlist_multi;
                parameterList.Add(parameter);
            }
            
	            if (model.f_itemlist_multiid != null&& columsList.Contains("f_itemlist_multiid"))
            {
                strSql.Append("f_itemlist_multiid='" + (model.f_itemlist_multiid) + "',");
                strSql_use.Append("f_itemlist_multiid=:f_itemlist_multiid,");
                parameter = new OracleParameter(":f_itemlist_multiid", OracleType.VarChar);
                parameter.Value = model.f_itemlist_multiid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_poplist_single != null&& columsList.Contains("f_poplist_single"))
            {
                strSql.Append("f_poplist_single='" + (model.f_poplist_single) + "',");
                strSql_use.Append("f_poplist_single=:f_poplist_single,");
                parameter = new OracleParameter(":f_poplist_single", OracleType.VarChar);
                parameter.Value = model.f_poplist_single;
                parameterList.Add(parameter);
            }
            
	            if (model.f_poplist_singleid != null&& columsList.Contains("f_poplist_singleid"))
            {
                strSql.Append("f_poplist_singleid='" + (model.f_poplist_singleid) + "',");
                strSql_use.Append("f_poplist_singleid=:f_poplist_singleid,");
                parameter = new OracleParameter(":f_poplist_singleid", OracleType.VarChar);
                parameter.Value = model.f_poplist_singleid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_poplist_multi != null&& columsList.Contains("f_poplist_multi"))
            {
                strSql.Append("f_poplist_multi='" + (model.f_poplist_multi) + "',");
                strSql_use.Append("f_poplist_multi=:f_poplist_multi,");
                parameter = new OracleParameter(":f_poplist_multi", OracleType.VarChar);
                parameter.Value = model.f_poplist_multi;
                parameterList.Add(parameter);
            }
            
	            if (model.f_poplist_multiid != null&& columsList.Contains("f_poplist_multiid"))
            {
                strSql.Append("f_poplist_multiid='" + (model.f_poplist_multiid) + "',");
                strSql_use.Append("f_poplist_multiid=:f_poplist_multiid,");
                parameter = new OracleParameter(":f_poplist_multiid", OracleType.VarChar);
                parameter.Value = model.f_poplist_multiid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_fileid != null&& columsList.Contains("f_fileid"))
            {
                strSql.Append("f_fileid='" + (model.f_fileid) + "',");
                strSql_use.Append("f_fileid=:f_fileid,");
                parameter = new OracleParameter(":f_fileid", OracleType.VarChar);
                parameter.Value = model.f_fileid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_file != null&& columsList.Contains("f_file"))
            {
                strSql.Append("f_file='" + (model.f_file) + "',");
                strSql_use.Append("f_file=:f_file,");
                parameter = new OracleParameter(":f_file", OracleType.VarChar);
                parameter.Value = model.f_file;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_app_codefactory> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_app_codefactory model in modelList)
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
            strSql.Append("delete tbl_app_codefactory where  ");
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
            strSql.Append("update tbl_app_codefactory set ");
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
            strSql.Append("select count(*) from tbl_app_codefactory");
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
        public List<sara.dd.ldsw.model.tbl_app_codefactory> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_app_codefactory t where");
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

            List<sara.dd.ldsw.model.tbl_app_codefactory> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_app_codefactory>(resultDataTable);
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
            strSql.Append(" select * from tbl_app_codefactory t where");
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
            strSql.Append(" select * from tbl_app_codefactory t where");
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
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_app_codefactory')";
            sqlString += " where f_tablename  = 'tbl_app_codefactory'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_app_codefactory'";


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
















