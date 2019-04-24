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
    /// 数据访问类tbl_ld_sbb 
    /// </summary>
    public class tbl_ld_sbb : sara.dd.ldsw.idal.Itbl_ld_sbb
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_sbb()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_sbb model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_sbbh != null)
            {
	            strSql1.Append("f_sbbh,");
	            strSql2.Append("'" + (model.f_sbbh) + "',");
	            strSql3.Append(":f_sbbh,");
	            parameter = new OracleParameter(":f_sbbh", OracleType.VarChar);
	            parameter.Value = model.f_sbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_ztsbh != null)
            {
	            strSql1.Append("f_ztsbh,");
	            strSql2.Append("'" + (model.f_ztsbh) + "',");
	            strSql3.Append(":f_ztsbh,");
	            parameter = new OracleParameter(":f_ztsbh", OracleType.VarChar);
	            parameter.Value = model.f_ztsbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_lxth != null)
            {
	            strSql1.Append("f_lxth,");
	            strSql2.Append("'" + (model.f_lxth) + "',");
	            strSql3.Append(":f_lxth,");
	            parameter = new OracleParameter(":f_lxth", OracleType.VarChar);
	            parameter.Value = model.f_lxth;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbfz != null)
            {
	            strSql1.Append("f_sbfz,");
	            strSql2.Append("'" + (model.f_sbfz) + "',");
	            strSql3.Append(":f_sbfz,");
	            parameter = new OracleParameter(":f_sbfz", OracleType.VarChar);
	            parameter.Value = model.f_sbfz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbfzid != null)
            {
	            strSql1.Append("f_sbfzid,");
	            strSql2.Append("'" + (model.f_sbfzid) + "',");
	            strSql3.Append(":f_sbfzid,");
	            parameter = new OracleParameter(":f_sbfzid", OracleType.VarChar);
	            parameter.Value = model.f_sbfzid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbpp != null)
            {
	            strSql1.Append("f_sbpp,");
	            strSql2.Append("'" + (model.f_sbpp) + "',");
	            strSql3.Append(":f_sbpp,");
	            parameter = new OracleParameter(":f_sbpp", OracleType.VarChar);
	            parameter.Value = model.f_sbpp;
	            parameterList.Add(parameter);
            }
            
            if (model.f_mph != null)
            {
	            strSql1.Append("f_mph,");
	            strSql2.Append("'" + (model.f_mph) + "',");
	            strSql3.Append(":f_mph,");
	            parameter = new OracleParameter(":f_mph", OracleType.VarChar);
	            parameter.Value = model.f_mph;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbdz != null)
            {
	            strSql1.Append("f_sbdz,");
	            strSql2.Append("'" + (model.f_sbdz) + "',");
	            strSql3.Append(":f_sbdz,");
	            parameter = new OracleParameter(":f_sbdz", OracleType.VarChar);
	            parameter.Value = model.f_sbdz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khbh != null)
            {
	            strSql1.Append("f_khbh,");
	            strSql2.Append("'" + (model.f_khbh) + "',");
	            strSql3.Append(":f_khbh,");
	            parameter = new OracleParameter(":f_khbh", OracleType.VarChar);
	            parameter.Value = model.f_khbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_rs != null)
            {
	            strSql1.Append("f_rs,");
	            strSql2.Append("'" + (model.f_rs) + "',");
	            strSql3.Append(":f_rs,");
	            parameter = new OracleParameter(":f_rs", OracleType.VarChar);
	            parameter.Value = model.f_rs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbkj != null)
            {
	            strSql1.Append("f_sbkj,");
	            strSql2.Append("'" + (model.f_sbkj) + "',");
	            strSql3.Append(":f_sbkj,");
	            parameter = new OracleParameter(":f_sbkj", OracleType.VarChar);
	            parameter.Value = model.f_sbkj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbkjid != null)
            {
	            strSql1.Append("f_sbkjid,");
	            strSql2.Append("'" + (model.f_sbkjid) + "',");
	            strSql3.Append(":f_sbkjid,");
	            parameter = new OracleParameter(":f_sbkjid", OracleType.VarChar);
	            parameter.Value = model.f_sbkjid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sblx != null)
            {
	            strSql1.Append("f_sblx,");
	            strSql2.Append("'" + (model.f_sblx) + "',");
	            strSql3.Append(":f_sblx,");
	            parameter = new OracleParameter(":f_sblx", OracleType.VarChar);
	            parameter.Value = model.f_sblx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sblxid != null)
            {
	            strSql1.Append("f_sblxid,");
	            strSql2.Append("'" + (model.f_sblxid) + "',");
	            strSql3.Append(":f_sblxid,");
	            parameter = new OracleParameter(":f_sblxid", OracleType.VarChar);
	            parameter.Value = model.f_sblxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jllx != null)
            {
	            strSql1.Append("f_jllx,");
	            strSql2.Append("'" + (model.f_jllx) + "',");
	            strSql3.Append(":f_jllx,");
	            parameter = new OracleParameter(":f_jllx", OracleType.VarChar);
	            parameter.Value = model.f_jllx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jllxid != null)
            {
	            strSql1.Append("f_jllxid,");
	            strSql2.Append("'" + (model.f_jllxid) + "',");
	            strSql3.Append(":f_jllxid,");
	            parameter = new OracleParameter(":f_jllxid", OracleType.VarChar);
	            parameter.Value = model.f_jllxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cszm != null)
            {
	            strSql1.Append("f_cszm,");
	            strSql2.Append("'" + (model.f_cszm) + "',");
	            strSql3.Append(":f_cszm,");
	            parameter = new OracleParameter(":f_cszm", OracleType.VarChar);
	            parameter.Value = model.f_cszm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_bqzm != null)
            {
	            strSql1.Append("f_bqzm,");
	            strSql2.Append("'" + (model.f_bqzm) + "',");
	            strSql3.Append(":f_bqzm,");
	            parameter = new OracleParameter(":f_bqzm", OracleType.VarChar);
	            parameter.Value = model.f_bqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sqzm != null)
            {
	            strSql1.Append("f_sqzm,");
	            strSql2.Append("'" + (model.f_sqzm) + "',");
	            strSql3.Append(":f_sqzm,");
	            parameter = new OracleParameter(":f_sqzm", OracleType.VarChar);
	            parameter.Value = model.f_sqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sqsl != null)
            {
	            strSql1.Append("f_sqsl,");
	            strSql2.Append("'" + (model.f_sqsl) + "',");
	            strSql3.Append(":f_sqsl,");
	            parameter = new OracleParameter(":f_sqsl", OracleType.VarChar);
	            parameter.Value = model.f_sqsl;
	            parameterList.Add(parameter);
            }

            if (model.f_bqsl != null)
            {
                strSql1.Append("f_bqsl,");
                strSql2.Append("'" + (model.f_bqsl) + "',");
                strSql3.Append(":f_bqsl,");
                parameter = new OracleParameter(":f_bqsl", OracleType.VarChar);
                parameter.Value = model.f_bqsl;
                parameterList.Add(parameter);
            }

            if (model.f_ljgl != null)
            {
	            strSql1.Append("f_ljgl,");
	            strSql2.Append("'" + (model.f_ljgl) + "',");
	            strSql3.Append(":f_ljgl,");
	            parameter = new OracleParameter(":f_ljgl", OracleType.VarChar);
	            parameter.Value = model.f_ljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_qsqpjsl != null)
            {
	            strSql1.Append("f_qsqpjsl,");
	            strSql2.Append("'" + (model.f_qsqpjsl) + "',");
	            strSql3.Append(":f_qsqpjsl,");
	            parameter = new OracleParameter(":f_qsqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_qsqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_qlqpjsl != null)
            {
	            strSql1.Append("f_qlqpjsl,");
	            strSql2.Append("'" + (model.f_qlqpjsl) + "',");
	            strSql3.Append(":f_qlqpjsl,");
	            parameter = new OracleParameter(":f_qlqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_qlqpjsl;
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
            
            if (model.f_nljgl != null)
            {
	            strSql1.Append("f_nljgl,");
	            strSql2.Append("'" + (model.f_nljgl) + "',");
	            strSql3.Append(":f_nljgl,");
	            parameter = new OracleParameter(":f_nljgl", OracleType.VarChar);
	            parameter.Value = model.f_nljgl;
	            parameterList.Add(parameter);
            }
            if (model.f_azrq != null)
            {
                strSql1.Append("f_azrq,");
                strSql2.Append("to_date('" + model.f_azrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql3.Append(":f_azrq,");
                parameter = new OracleParameter(":f_azrq", OracleType.DateTime);
                parameter.Value = model.f_azrq;
                parameterList.Add(parameter);
            }
            if (model.f_qfzt != null)
            {
                strSql1.Append("f_qfzt,");
                strSql2.Append("'" + (model.f_qfzt) + "',");
                strSql3.Append(":f_qfzt,");
                parameter = new OracleParameter(":f_qfzt", OracleType.VarChar);
                parameter.Value = model.f_qfzt;
                parameterList.Add(parameter);
            }
            if (model.f_fj != null)
            {
                strSql1.Append("f_fj,");
                strSql2.Append("'" + (model.f_fj) + "',");
                strSql3.Append(":f_fj,");
                parameter = new OracleParameter(":f_fj", OracleType.VarChar);
                parameter.Value = model.f_fj;
                parameterList.Add(parameter);
            }

            if (model.f_synx != null)
            {
                strSql1.Append("f_synx,");
                strSql2.Append("'" + (model.f_synx) + "',");
                strSql3.Append(":f_synx,");
                parameter = new OracleParameter(":f_synx", OracleType.VarChar);
                parameter.Value = model.f_synx;
                parameterList.Add(parameter);
            }
            strSql.Append("insert into tbl_ld_sbb(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_sbb(");
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
	                string updateSqlString = " update tbl_ld_sbb set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_sbb> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_sbb model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_sbb model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_sbb set ");
            strSql_use.Append("update tbl_ld_sbb set ");
            if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            }
            else //如果是sql形式的话，则进行textReturn
            {
                model = Eva.Library.Format.FormatTextTool.ModelFormat(model);
            }


            if (model.sys_orderid != null && columsList.Contains("sys_orderid"))
            {
                strSql.Append("sys_orderid='" + (model.sys_orderid) + "',");
                strSql_use.Append("sys_orderid=:sys_orderid,");
                parameter = new OracleParameter(":sys_orderid", OracleType.VarChar);
                parameter.Value = model.sys_orderid;
                parameterList.Add(parameter);
            }

            if (model.sys_creatuserid != null && columsList.Contains("sys_creatuserid"))
            {
                strSql.Append("sys_creatuserid='" + (model.sys_creatuserid) + "',");
                strSql_use.Append("sys_creatuserid=:sys_creatuserid,");
                parameter = new OracleParameter(":sys_creatuserid", OracleType.VarChar);
                parameter.Value = model.sys_creatuserid;
                parameterList.Add(parameter);
            }

            if (model.sys_creatusername != null && columsList.Contains("sys_creatusername"))
            {
                strSql.Append("sys_creatusername='" + (model.sys_creatusername) + "',");
                strSql_use.Append("sys_creatusername=:sys_creatusername,");
                parameter = new OracleParameter(":sys_creatusername", OracleType.VarChar);
                parameter.Value = model.sys_creatusername;
                parameterList.Add(parameter);
            }

            if (model.sys_creatdate != null && columsList.Contains("sys_creatdate"))
            {
                strSql.Append("sys_creatdate=to_date('" + model.sys_creatdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("sys_creatdate=:sys_creatdate,");
                parameter = new OracleParameter(":sys_creatdate", OracleType.DateTime);
                parameter.Value = model.sys_creatdate;
                parameterList.Add(parameter);
            }

            if (model.sys_lastedituserid != null && columsList.Contains("sys_lastedituserid"))
            {
                strSql.Append("sys_lastedituserid='" + (model.sys_lastedituserid) + "',");
                strSql_use.Append("sys_lastedituserid=:sys_lastedituserid,");
                parameter = new OracleParameter(":sys_lastedituserid", OracleType.VarChar);
                parameter.Value = model.sys_lastedituserid;
                parameterList.Add(parameter);
            }

            if (model.sys_lasteditusername != null && columsList.Contains("sys_lasteditusername"))
            {
                strSql.Append("sys_lasteditusername='" + (model.sys_lasteditusername) + "',");
                strSql_use.Append("sys_lasteditusername=:sys_lasteditusername,");
                parameter = new OracleParameter(":sys_lasteditusername", OracleType.VarChar);
                parameter.Value = model.sys_lasteditusername;
                parameterList.Add(parameter);
            }

            if (model.sys_lasteditdate != null && columsList.Contains("sys_lasteditdate"))
            {
                strSql.Append("sys_lasteditdate=to_date('" + model.sys_lasteditdate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("sys_lasteditdate=:sys_lasteditdate,");
                parameter = new OracleParameter(":sys_lasteditdate", OracleType.DateTime);
                parameter.Value = model.sys_lasteditdate;
                parameterList.Add(parameter);
            }

            if (model.sys_deluserid != null && columsList.Contains("sys_deluserid"))
            {
                strSql.Append("sys_deluserid='" + (model.sys_deluserid) + "',");
                strSql_use.Append("sys_deluserid=:sys_deluserid,");
                parameter = new OracleParameter(":sys_deluserid", OracleType.VarChar);
                parameter.Value = model.sys_deluserid;
                parameterList.Add(parameter);
            }

            if (model.sys_delusername != null && columsList.Contains("sys_delusername"))
            {
                strSql.Append("sys_delusername='" + (model.sys_delusername) + "',");
                strSql_use.Append("sys_delusername=:sys_delusername,");
                parameter = new OracleParameter(":sys_delusername", OracleType.VarChar);
                parameter.Value = model.sys_delusername;
                parameterList.Add(parameter);
            }

            if (model.sys_deldate != null && columsList.Contains("sys_deldate"))
            {
                strSql.Append("sys_deldate=to_date('" + model.sys_deldate.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("sys_deldate=:sys_deldate,");
                parameter = new OracleParameter(":sys_deldate", OracleType.DateTime);
                parameter.Value = model.sys_deldate;
                parameterList.Add(parameter);
            }

            if (model.sys_delflag != null && columsList.Contains("sys_delflag"))
            {
                strSql.Append("sys_delflag='" + (model.sys_delflag) + "',");
                strSql_use.Append("sys_delflag=:sys_delflag,");
                parameter = new OracleParameter(":sys_delflag", OracleType.VarChar);
                parameter.Value = model.sys_delflag;
                parameterList.Add(parameter);
            }

            if (model.f_value1 != null && columsList.Contains("f_value1"))
            {
                strSql.Append("f_value1='" + (model.f_value1) + "',");
                strSql_use.Append("f_value1=:f_value1,");
                parameter = new OracleParameter(":f_value1", OracleType.VarChar);
                parameter.Value = model.f_value1;
                parameterList.Add(parameter);
            }

            if (model.f_value2 != null && columsList.Contains("f_value2"))
            {
                strSql.Append("f_value2='" + (model.f_value2) + "',");
                strSql_use.Append("f_value2=:f_value2,");
                parameter = new OracleParameter(":f_value2", OracleType.VarChar);
                parameter.Value = model.f_value2;
                parameterList.Add(parameter);
            }

            if (model.f_value3 != null && columsList.Contains("f_value3"))
            {
                strSql.Append("f_value3='" + (model.f_value3) + "',");
                strSql_use.Append("f_value3=:f_value3,");
                parameter = new OracleParameter(":f_value3", OracleType.VarChar);
                parameter.Value = model.f_value3;
                parameterList.Add(parameter);
            }

            if (model.f_value4 != null && columsList.Contains("f_value4"))
            {
                strSql.Append("f_value4='" + (model.f_value4) + "',");
                strSql_use.Append("f_value4=:f_value4,");
                parameter = new OracleParameter(":f_value4", OracleType.VarChar);
                parameter.Value = model.f_value4;
                parameterList.Add(parameter);
            }

            if (model.f_value5 != null && columsList.Contains("f_value5"))
            {
                strSql.Append("f_value5='" + (model.f_value5) + "',");
                strSql_use.Append("f_value5=:f_value5,");
                parameter = new OracleParameter(":f_value5", OracleType.VarChar);
                parameter.Value = model.f_value5;
                parameterList.Add(parameter);
            }

            if (model.f_value6 != null && columsList.Contains("f_value6"))
            {
                strSql.Append("f_value6='" + (model.f_value6) + "',");
                strSql_use.Append("f_value6=:f_value6,");
                parameter = new OracleParameter(":f_value6", OracleType.VarChar);
                parameter.Value = model.f_value6;
                parameterList.Add(parameter);
            }

            if (model.f_value7 != null && columsList.Contains("f_value7"))
            {
                strSql.Append("f_value7='" + (model.f_value7) + "',");
                strSql_use.Append("f_value7=:f_value7,");
                parameter = new OracleParameter(":f_value7", OracleType.VarChar);
                parameter.Value = model.f_value7;
                parameterList.Add(parameter);
            }

            if (model.f_value8 != null && columsList.Contains("f_value8"))
            {
                strSql.Append("f_value8='" + (model.f_value8) + "',");
                strSql_use.Append("f_value8=:f_value8,");
                parameter = new OracleParameter(":f_value8", OracleType.VarChar);
                parameter.Value = model.f_value8;
                parameterList.Add(parameter);
            }

            if (model.f_value9 != null && columsList.Contains("f_value9"))
            {
                strSql.Append("f_value9='" + (model.f_value9) + "',");
                strSql_use.Append("f_value9=:f_value9,");
                parameter = new OracleParameter(":f_value9", OracleType.VarChar);
                parameter.Value = model.f_value9;
                parameterList.Add(parameter);
            }

            if (model.f_value10 != null && columsList.Contains("f_value10"))
            {
                strSql.Append("f_value10='" + (model.f_value10) + "',");
                strSql_use.Append("f_value10=:f_value10,");
                parameter = new OracleParameter(":f_value10", OracleType.VarChar);
                parameter.Value = model.f_value10;
                parameterList.Add(parameter);
            }

            if (model.f_sbbh != null && columsList.Contains("f_sbbh"))
            {
                strSql.Append("f_sbbh='" + (model.f_sbbh) + "',");
                strSql_use.Append("f_sbbh=:f_sbbh,");
                parameter = new OracleParameter(":f_sbbh", OracleType.VarChar);
                parameter.Value = model.f_sbbh;
                parameterList.Add(parameter);
            }

            if (model.f_ztsbh != null && columsList.Contains("f_ztsbh"))
            {
                strSql.Append("f_ztsbh='" + (model.f_ztsbh) + "',");
                strSql_use.Append("f_ztsbh=:f_ztsbh,");
                parameter = new OracleParameter(":f_ztsbh", OracleType.VarChar);
                parameter.Value = model.f_ztsbh;
                parameterList.Add(parameter);
            }

            if (model.f_lxth != null && columsList.Contains("f_lxth"))
            {
                strSql.Append("f_lxth='" + (model.f_lxth) + "',");
                strSql_use.Append("f_lxth=:f_lxth,");
                parameter = new OracleParameter(":f_lxth", OracleType.VarChar);
                parameter.Value = model.f_lxth;
                parameterList.Add(parameter);
            }

            if (model.f_sbfz != null && columsList.Contains("f_sbfz"))
            {
                strSql.Append("f_sbfz='" + (model.f_sbfz) + "',");
                strSql_use.Append("f_sbfz=:f_sbfz,");
                parameter = new OracleParameter(":f_sbfz", OracleType.VarChar);
                parameter.Value = model.f_sbfz;
                parameterList.Add(parameter);
            }

            if (model.f_sbfzid != null && columsList.Contains("f_sbfzid"))
            {
                strSql.Append("f_sbfzid='" + (model.f_sbfzid) + "',");
                strSql_use.Append("f_sbfzid=:f_sbfzid,");
                parameter = new OracleParameter(":f_sbfzid", OracleType.VarChar);
                parameter.Value = model.f_sbfzid;
                parameterList.Add(parameter);
            }

            if (model.f_sbpp != null && columsList.Contains("f_sbpp"))
            {
                strSql.Append("f_sbpp='" + (model.f_sbpp) + "',");
                strSql_use.Append("f_sbpp=:f_sbpp,");
                parameter = new OracleParameter(":f_sbpp", OracleType.VarChar);
                parameter.Value = model.f_sbpp;
                parameterList.Add(parameter);
            }

            if (model.f_mph != null && columsList.Contains("f_mph"))
            {
                strSql.Append("f_mph='" + (model.f_mph) + "',");
                strSql_use.Append("f_mph=:f_mph,");
                parameter = new OracleParameter(":f_mph", OracleType.VarChar);
                parameter.Value = model.f_mph;
                parameterList.Add(parameter);
            }

            if (model.f_sbdz != null && columsList.Contains("f_sbdz"))
            {
                strSql.Append("f_sbdz='" + (model.f_sbdz) + "',");
                strSql_use.Append("f_sbdz=:f_sbdz,");
                parameter = new OracleParameter(":f_sbdz", OracleType.VarChar);
                parameter.Value = model.f_sbdz;
                parameterList.Add(parameter);
            }

            if (model.f_khbh != null && columsList.Contains("f_khbh"))
            {
                strSql.Append("f_khbh='" + (model.f_khbh) + "',");
                strSql_use.Append("f_khbh=:f_khbh,");
                parameter = new OracleParameter(":f_khbh", OracleType.VarChar);
                parameter.Value = model.f_khbh;
                parameterList.Add(parameter);
            }

            if (model.f_rs != null && columsList.Contains("f_rs"))
            {
                strSql.Append("f_rs='" + (model.f_rs) + "',");
                strSql_use.Append("f_rs=:f_rs,");
                parameter = new OracleParameter(":f_rs", OracleType.VarChar);
                parameter.Value = model.f_rs;
                parameterList.Add(parameter);
            }

            if (model.f_sbkj != null && columsList.Contains("f_sbkj"))
            {
                strSql.Append("f_sbkj='" + (model.f_sbkj) + "',");
                strSql_use.Append("f_sbkj=:f_sbkj,");
                parameter = new OracleParameter(":f_sbkj", OracleType.VarChar);
                parameter.Value = model.f_sbkj;
                parameterList.Add(parameter);
            }

            if (model.f_sbkjid != null && columsList.Contains("f_sbkjid"))
            {
                strSql.Append("f_sbkjid='" + (model.f_sbkjid) + "',");
                strSql_use.Append("f_sbkjid=:f_sbkjid,");
                parameter = new OracleParameter(":f_sbkjid", OracleType.VarChar);
                parameter.Value = model.f_sbkjid;
                parameterList.Add(parameter);
            }

            if (model.f_sblx != null && columsList.Contains("f_sblx"))
            {
                strSql.Append("f_sblx='" + (model.f_sblx) + "',");
                strSql_use.Append("f_sblx=:f_sblx,");
                parameter = new OracleParameter(":f_sblx", OracleType.VarChar);
                parameter.Value = model.f_sblx;
                parameterList.Add(parameter);
            }

            if (model.f_sblxid != null && columsList.Contains("f_sblxid"))
            {
                strSql.Append("f_sblxid='" + (model.f_sblxid) + "',");
                strSql_use.Append("f_sblxid=:f_sblxid,");
                parameter = new OracleParameter(":f_sblxid", OracleType.VarChar);
                parameter.Value = model.f_sblxid;
                parameterList.Add(parameter);
            }

            if (model.f_jllx != null && columsList.Contains("f_jllx"))
            {
                strSql.Append("f_jllx='" + (model.f_jllx) + "',");
                strSql_use.Append("f_jllx=:f_jllx,");
                parameter = new OracleParameter(":f_jllx", OracleType.VarChar);
                parameter.Value = model.f_jllx;
                parameterList.Add(parameter);
            }

            if (model.f_jllxid != null && columsList.Contains("f_jllxid"))
            {
                strSql.Append("f_jllxid='" + (model.f_jllxid) + "',");
                strSql_use.Append("f_jllxid=:f_jllxid,");
                parameter = new OracleParameter(":f_jllxid", OracleType.VarChar);
                parameter.Value = model.f_jllxid;
                parameterList.Add(parameter);
            }

            if (model.f_cszm != null && columsList.Contains("f_cszm"))
            {
                strSql.Append("f_cszm='" + (model.f_cszm) + "',");
                strSql_use.Append("f_cszm=:f_cszm,");
                parameter = new OracleParameter(":f_cszm", OracleType.VarChar);
                parameter.Value = model.f_cszm;
                parameterList.Add(parameter);
            }

            if (model.f_bqzm != null && columsList.Contains("f_bqzm"))
            {
                strSql.Append("f_bqzm='" + (model.f_bqzm) + "',");
                strSql_use.Append("f_bqzm=:f_bqzm,");
                parameter = new OracleParameter(":f_bqzm", OracleType.VarChar);
                parameter.Value = model.f_bqzm;
                parameterList.Add(parameter);
            }

            if (model.f_sqzm != null && columsList.Contains("f_sqzm"))
            {
                strSql.Append("f_sqzm='" + (model.f_sqzm) + "',");
                strSql_use.Append("f_sqzm=:f_sqzm,");
                parameter = new OracleParameter(":f_sqzm", OracleType.VarChar);
                parameter.Value = model.f_sqzm;
                parameterList.Add(parameter);
            }

            if (model.f_sqsl != null && columsList.Contains("f_sqsl"))
            {
                strSql.Append("f_sqsl='" + (model.f_sqsl) + "',");
                strSql_use.Append("f_sqsl=:f_sqsl,");
                parameter = new OracleParameter(":f_sqsl", OracleType.VarChar);
                parameter.Value = model.f_sqsl;
                parameterList.Add(parameter);
            }

            if (model.f_bqsl != null && columsList.Contains("f_bqsl"))
            {
                strSql.Append("f_bqsl='" + (model.f_bqsl) + "',");
                strSql_use.Append("f_bqsl=:f_bqsl,");
                parameter = new OracleParameter(":f_bqsl", OracleType.VarChar);
                parameter.Value = model.f_bqsl;
                parameterList.Add(parameter);
            }

            if (model.f_ljgl != null && columsList.Contains("f_ljgl"))
            {
                strSql.Append("f_ljgl='" + (model.f_ljgl) + "',");
                strSql_use.Append("f_ljgl=:f_ljgl,");
                parameter = new OracleParameter(":f_ljgl", OracleType.VarChar);
                parameter.Value = model.f_ljgl;
                parameterList.Add(parameter);
            }

            if (model.f_qsqpjsl != null && columsList.Contains("f_qsqpjsl"))
            {
                strSql.Append("f_qsqpjsl='" + (model.f_qsqpjsl) + "',");
                strSql_use.Append("f_qsqpjsl=:f_qsqpjsl,");
                parameter = new OracleParameter(":f_qsqpjsl", OracleType.VarChar);
                parameter.Value = model.f_qsqpjsl;
                parameterList.Add(parameter);
            }

            if (model.f_qlqpjsl != null && columsList.Contains("f_qlqpjsl"))
            {
                strSql.Append("f_qlqpjsl='" + (model.f_qlqpjsl) + "',");
                strSql_use.Append("f_qlqpjsl=:f_qlqpjsl,");
                parameter = new OracleParameter(":f_qlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_qlqpjsl;
                parameterList.Add(parameter);
            }

            if (model.f_zt != null && columsList.Contains("f_zt"))
            {
                strSql.Append("f_zt='" + (model.f_zt) + "',");
                strSql_use.Append("f_zt=:f_zt,");
                parameter = new OracleParameter(":f_zt", OracleType.VarChar);
                parameter.Value = model.f_zt;
                parameterList.Add(parameter);
            }

            if (model.f_ztid != null && columsList.Contains("f_ztid"))
            {
                strSql.Append("f_ztid='" + (model.f_ztid) + "',");
                strSql_use.Append("f_ztid=:f_ztid,");
                parameter = new OracleParameter(":f_ztid", OracleType.VarChar);
                parameter.Value = model.f_ztid;
                parameterList.Add(parameter);
            }

            if (model.f_bz != null && columsList.Contains("f_bz"))
            {
                strSql.Append("f_bz='" + (model.f_bz) + "',");
                strSql_use.Append("f_bz=:f_bz,");
                parameter = new OracleParameter(":f_bz", OracleType.VarChar);
                parameter.Value = model.f_bz;
                parameterList.Add(parameter);
            }
            if (model.f_nljgl != null && columsList.Contains("f_nljgl"))
            {
                strSql.Append("f_nljgl='" + (model.f_nljgl) + "',");
                strSql_use.Append("f_nljgl=:f_nljgl,");
                parameter = new OracleParameter(":f_nljgl", OracleType.VarChar);
                parameter.Value = model.f_nljgl;
                parameterList.Add(parameter);
            }
            if (model.f_azrq != null && columsList.Contains("f_azrq"))
            {
                strSql.Append("f_azrq=to_date('" + model.f_azrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_azrq=:f_azrq,");
                parameter = new OracleParameter(":f_azrq", OracleType.DateTime);
                parameter.Value = model.f_azrq;
                parameterList.Add(parameter);
            }

            if (model.f_qfzt != null && columsList.Contains("f_qfzt"))
            {
                strSql.Append("f_qfzt='" + (model.f_qfzt) + "',");
                strSql_use.Append("f_qfzt=:f_qfzt,");
                parameter = new OracleParameter(":f_qfzt", OracleType.VarChar);
                parameter.Value = model.f_qfzt;
                parameterList.Add(parameter);
            }
            if (model.f_fj != null && columsList.Contains("f_fj"))
            {
                strSql.Append("f_fj='" + (model.f_fj) + "',");
                strSql_use.Append("f_fj=:f_fj,");
                parameter = new OracleParameter(":f_fj", OracleType.VarChar);
                parameter.Value = model.f_fj;
                parameterList.Add(parameter);
            }
            if (model.f_synx != null && columsList.Contains("f_synx"))
            {
                strSql.Append("f_synx='" + (model.f_synx) + "',");
                strSql_use.Append("f_synx=:f_synx,");
                parameter = new OracleParameter(":f_synx", OracleType.VarChar);
                parameter.Value = model.f_synx;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_sbb> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_sbb model in modelList)
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
            strSql.Append("delete tbl_ld_sbb where  ");
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
            strSql.Append("update tbl_ld_sbb set ");
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
            strSql.Append("select count(*) from tbl_ld_sbb");
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
        public List<sara.dd.ldsw.model.tbl_ld_sbb> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_sbb t where");
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

            List<sara.dd.ldsw.model.tbl_ld_sbb> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_sbb>(resultDataTable);
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
            strSql.Append(" select * from tbl_ld_sbb t where");
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
            strSql.Append(" select * from tbl_ld_sbb t where");
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
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_sbb')";
            sqlString += " where f_tablename  = 'tbl_ld_sbb'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_sbb'";


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
















