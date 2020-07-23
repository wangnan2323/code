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
    /// 数据访问类tbl_ld_cbiao 
    /// </summary>
    public class tbl_ld_cbiao : sara.dd.ldsw.idal.Itbl_ld_cbiao
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_cbiao()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_cbiao model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_cb_cbbh != null)
            {
	            strSql1.Append("f_cb_cbbh,");
	            strSql2.Append("'" + (model.f_cb_cbbh) + "',");
	            strSql3.Append(":f_cb_cbbh,");
	            parameter = new OracleParameter(":f_cb_cbbh", OracleType.VarChar);
	            parameter.Value = model.f_cb_cbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cb_cbbhid != null)
            {
	            strSql1.Append("f_cb_cbbhid,");
	            strSql2.Append("'" + (model.f_cb_cbbhid) + "',");
	            strSql3.Append(":f_cb_cbbhid,");
	            parameter = new OracleParameter(":f_cb_cbbhid", OracleType.VarChar);
	            parameter.Value = model.f_cb_cbbhid;
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
            
            if (model.f_khbhid != null)
            {
	            strSql1.Append("f_khbhid,");
	            strSql2.Append("'" + (model.f_khbhid) + "',");
	            strSql3.Append(":f_khbhid,");
	            parameter = new OracleParameter(":f_khbhid", OracleType.VarChar);
	            parameter.Value = model.f_khbhid;
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
            
            if (model.f_bqzm != null)
            {
	            strSql1.Append("f_bqzm,");
	            strSql2.Append("'" + (model.f_bqzm) + "',");
	            strSql3.Append(":f_bqzm,");
	            parameter = new OracleParameter(":f_bqzm", OracleType.VarChar);
	            parameter.Value = model.f_bqzm;
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
            
            if (model.f_sqsl != null)
            {
	            strSql1.Append("f_sqsl,");
	            strSql2.Append("'" + (model.f_sqsl) + "',");
	            strSql3.Append(":f_sqsl,");
	            parameter = new OracleParameter(":f_sqsl", OracleType.VarChar);
	            parameter.Value = model.f_sqsl;
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
            
            if (model.f_cbyname != null)
            {
	            strSql1.Append("f_cbyname,");
	            strSql2.Append("'" + (model.f_cbyname) + "',");
	            strSql3.Append(":f_cbyname,");
	            parameter = new OracleParameter(":f_cbyname", OracleType.VarChar);
	            parameter.Value = model.f_cbyname;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbyid != null)
            {
	            strSql1.Append("f_cbyid,");
	            strSql2.Append("'" + (model.f_cbyid) + "',");
	            strSql3.Append(":f_cbyid,");
	            parameter = new OracleParameter(":f_cbyid", OracleType.VarChar);
	            parameter.Value = model.f_cbyid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbyphoto != null)
            {
	            strSql1.Append("f_cbyphoto,");
	            strSql2.Append("'" + (model.f_cbyphoto) + "',");
	            strSql3.Append(":f_cbyphoto,");
	            parameter = new OracleParameter(":f_cbyphoto", OracleType.VarChar);
	            parameter.Value = model.f_cbyphoto;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbsj != null)
            {
	            strSql1.Append("f_cbsj,");
	            strSql2.Append("to_date('" + model.f_cbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_cbsj,");
	            parameter = new OracleParameter(":f_cbsj", OracleType.DateTime);
	            parameter.Value = model.f_cbsj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_bk != null)
            {
	            strSql1.Append("f_bk,");
	            strSql2.Append("'" + (model.f_bk) + "',");
	            strSql3.Append(":f_bk,");
	            parameter = new OracleParameter(":f_bk", OracleType.VarChar);
	            parameter.Value = model.f_bk;
	            parameterList.Add(parameter);
            }
            
            if (model.f_bkid != null)
            {
	            strSql1.Append("f_bkid,");
	            strSql2.Append("'" + (model.f_bkid) + "',");
	            strSql3.Append(":f_bkid,");
	            parameter = new OracleParameter(":f_bkid", OracleType.VarChar);
	            parameter.Value = model.f_bkid;
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
            
            if (model.f_ly != null)
            {
	            strSql1.Append("f_ly,");
	            strSql2.Append("'" + (model.f_ly) + "',");
	            strSql3.Append(":f_ly,");
	            parameter = new OracleParameter(":f_ly", OracleType.VarChar);
	            parameter.Value = model.f_ly;
	            parameterList.Add(parameter);
            }
            
            if (model.f_lyid != null)
            {
	            strSql1.Append("f_lyid,");
	            strSql2.Append("'" + (model.f_lyid) + "',");
	            strSql3.Append(":f_lyid,");
	            parameter = new OracleParameter(":f_lyid", OracleType.VarChar);
	            parameter.Value = model.f_lyid;
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
            
            if (model.f_sbbh != null)
            {
	            strSql1.Append("f_sbbh,");
	            strSql2.Append("'" + (model.f_sbbh) + "',");
	            strSql3.Append(":f_sbbh,");
	            parameter = new OracleParameter(":f_sbbh", OracleType.VarChar);
	            parameter.Value = model.f_sbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbbhid != null)
            {
	            strSql1.Append("f_sbbhid,");
	            strSql2.Append("'" + (model.f_sbbhid) + "',");
	            strSql3.Append(":f_sbbhid,");
	            parameter = new OracleParameter(":f_sbbhid", OracleType.VarChar);
	            parameter.Value = model.f_sbbhid;
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
            
            if (model.f_yslx != null)
            {
	            strSql1.Append("f_yslx,");
	            strSql2.Append("'" + (model.f_yslx) + "',");
	            strSql3.Append(":f_yslx,");
	            parameter = new OracleParameter(":f_yslx", OracleType.VarChar);
	            parameter.Value = model.f_yslx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yslxid != null)
            {
	            strSql1.Append("f_yslxid,");
	            strSql2.Append("'" + (model.f_yslxid) + "',");
	            strSql3.Append(":f_yslxid,");
	            parameter = new OracleParameter(":f_yslxid", OracleType.VarChar);
	            parameter.Value = model.f_yslxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_lxtkhh != null)
            {
	            strSql1.Append("f_lxtkhh,");
	            strSql2.Append("'" + (model.f_lxtkhh) + "',");
	            strSql3.Append(":f_lxtkhh,");
	            parameter = new OracleParameter(":f_lxtkhh", OracleType.VarChar);
	            parameter.Value = model.f_lxtkhh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbbh != null)
            {
	            strSql1.Append("f_cbbh,");
	            strSql2.Append("'" + (model.f_cbbh) + "',");
	            strSql3.Append(":f_cbbh,");
	            parameter = new OracleParameter(":f_cbbh", OracleType.VarChar);
	            parameter.Value = model.f_cbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbbhid != null)
            {
	            strSql1.Append("f_cbbhid,");
	            strSql2.Append("'" + (model.f_cbbhid) + "',");
	            strSql3.Append(":f_cbbhid,");
	            parameter = new OracleParameter(":f_cbbhid", OracleType.VarChar);
	            parameter.Value = model.f_cbbhid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbmc != null)
            {
	            strSql1.Append("f_cbmc,");
	            strSql2.Append("'" + (model.f_cbmc) + "',");
	            strSql3.Append(":f_cbmc,");
	            parameter = new OracleParameter(":f_cbmc", OracleType.VarChar);
	            parameter.Value = model.f_cbmc;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhbh != null)
            {
	            strSql1.Append("f_yhbh,");
	            strSql2.Append("'" + (model.f_yhbh) + "',");
	            strSql3.Append(":f_yhbh,");
	            parameter = new OracleParameter(":f_yhbh", OracleType.VarChar);
	            parameter.Value = model.f_yhbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhbhid != null)
            {
	            strSql1.Append("f_yhbhid,");
	            strSql2.Append("'" + (model.f_yhbhid) + "',");
	            strSql3.Append(":f_yhbhid,");
	            parameter = new OracleParameter(":f_yhbhid", OracleType.VarChar);
	            parameter.Value = model.f_yhbhid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhm != null)
            {
	            strSql1.Append("f_yhm,");
	            strSql2.Append("'" + (model.f_yhm) + "',");
	            strSql3.Append(":f_yhm,");
	            parameter = new OracleParameter(":f_yhm", OracleType.VarChar);
	            parameter.Value = model.f_yhm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfm != null)
            {
	            strSql1.Append("f_jfm,");
	            strSql2.Append("'" + (model.f_jfm) + "',");
	            strSql3.Append(":f_jfm,");
	            parameter = new OracleParameter(":f_jfm", OracleType.VarChar);
	            parameter.Value = model.f_jfm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dh != null)
            {
	            strSql1.Append("f_dh,");
	            strSql2.Append("'" + (model.f_dh) + "',");
	            strSql3.Append(":f_dh,");
	            parameter = new OracleParameter(":f_dh", OracleType.VarChar);
	            parameter.Value = model.f_dh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dz != null)
            {
	            strSql1.Append("f_dz,");
	            strSql2.Append("'" + (model.f_dz) + "',");
	            strSql3.Append(":f_dz,");
	            parameter = new OracleParameter(":f_dz", OracleType.VarChar);
	            parameter.Value = model.f_dz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dy != null)
            {
	            strSql1.Append("f_dy,");
	            strSql2.Append("'" + (model.f_dy) + "',");
	            strSql3.Append(":f_dy,");
	            parameter = new OracleParameter(":f_dy", OracleType.VarChar);
	            parameter.Value = model.f_dy;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dyid != null)
            {
	            strSql1.Append("f_dyid,");
	            strSql2.Append("'" + (model.f_dyid) + "',");
	            strSql3.Append(":f_dyid,");
	            parameter = new OracleParameter(":f_dyid", OracleType.VarChar);
	            parameter.Value = model.f_dyid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sc != null)
            {
	            strSql1.Append("f_sc,");
	            strSql2.Append("'" + (model.f_sc) + "',");
	            strSql3.Append(":f_sc,");
	            parameter = new OracleParameter(":f_sc", OracleType.VarChar);
	            parameter.Value = model.f_sc;
	            parameterList.Add(parameter);
            }
            
            if (model.f_scid != null)
            {
	            strSql1.Append("f_scid,");
	            strSql2.Append("'" + (model.f_scid) + "',");
	            strSql3.Append(":f_scid,");
	            parameter = new OracleParameter(":f_scid", OracleType.VarChar);
	            parameter.Value = model.f_scid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_qy != null)
            {
	            strSql1.Append("f_qy,");
	            strSql2.Append("'" + (model.f_qy) + "',");
	            strSql3.Append(":f_qy,");
	            parameter = new OracleParameter(":f_qy", OracleType.VarChar);
	            parameter.Value = model.f_qy;
	            parameterList.Add(parameter);
            }
            
            if (model.f_qyid != null)
            {
	            strSql1.Append("f_qyid,");
	            strSql2.Append("'" + (model.f_qyid) + "',");
	            strSql3.Append(":f_qyid,");
	            parameter = new OracleParameter(":f_qyid", OracleType.VarChar);
	            parameter.Value = model.f_qyid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pq != null)
            {
	            strSql1.Append("f_pq,");
	            strSql2.Append("'" + (model.f_pq) + "',");
	            strSql3.Append(":f_pq,");
	            parameter = new OracleParameter(":f_pq", OracleType.VarChar);
	            parameter.Value = model.f_pq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pqid != null)
            {
	            strSql1.Append("f_pqid,");
	            strSql2.Append("'" + (model.f_pqid) + "',");
	            strSql3.Append(":f_pqid,");
	            parameter = new OracleParameter(":f_pqid", OracleType.VarChar);
	            parameter.Value = model.f_pqid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pgbh != null)
            {
	            strSql1.Append("f_pgbh,");
	            strSql2.Append("'" + (model.f_pgbh) + "',");
	            strSql3.Append(":f_pgbh,");
	            parameter = new OracleParameter(":f_pgbh", OracleType.VarChar);
	            parameter.Value = model.f_pgbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pgbhid != null)
            {
	            strSql1.Append("f_pgbhid,");
	            strSql2.Append("'" + (model.f_pgbhid) + "',");
	            strSql3.Append(":f_pgbhid,");
	            parameter = new OracleParameter(":f_pgbhid", OracleType.VarChar);
	            parameter.Value = model.f_pgbhid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pgr != null)
            {
	            strSql1.Append("f_pgr,");
	            strSql2.Append("'" + (model.f_pgr) + "',");
	            strSql3.Append(":f_pgr,");
	            parameter = new OracleParameter(":f_pgr", OracleType.VarChar);
	            parameter.Value = model.f_pgr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pgrid != null)
            {
	            strSql1.Append("f_pgrid,");
	            strSql2.Append("'" + (model.f_pgrid) + "',");
	            strSql3.Append(":f_pgrid,");
	            parameter = new OracleParameter(":f_pgrid", OracleType.VarChar);
	            parameter.Value = model.f_pgrid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pgpcmc != null)
            {
	            strSql1.Append("f_pgpcmc,");
	            strSql2.Append("'" + (model.f_pgpcmc) + "',");
	            strSql3.Append(":f_pgpcmc,");
	            parameter = new OracleParameter(":f_pgpcmc", OracleType.VarChar);
	            parameter.Value = model.f_pgpcmc;
	            parameterList.Add(parameter);
            }
            
            if (model.f_pgsj != null)
            {
	            strSql1.Append("f_pgsj,");
	            strSql2.Append("to_date('" + model.f_pgsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_pgsj,");
	            parameter = new OracleParameter(":f_pgsj", OracleType.DateTime);
	            parameter.Value = model.f_pgsj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfbh != null)
            {
	            strSql1.Append("f_jfbh,");
	            strSql2.Append("'" + (model.f_jfbh) + "',");
	            strSql3.Append(":f_jfbh,");
	            parameter = new OracleParameter(":f_jfbh", OracleType.VarChar);
	            parameter.Value = model.f_jfbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfbhid != null)
            {
	            strSql1.Append("f_jfbhid,");
	            strSql2.Append("'" + (model.f_jfbhid) + "',");
	            strSql3.Append(":f_jfbhid,");
	            parameter = new OracleParameter(":f_jfbhid", OracleType.VarChar);
	            parameter.Value = model.f_jfbhid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfsj != null)
            {
	            strSql1.Append("f_jfsj,");
	            strSql2.Append("to_date('" + model.f_jfsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_jfsj,");
	            parameter = new OracleParameter(":f_jfsj", OracleType.DateTime);
	            parameter.Value = model.f_jfsj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_bqje != null)
            {
	            strSql1.Append("f_bqje,");
	            strSql2.Append("'" + (model.f_bqje) + "',");
	            strSql3.Append(":f_bqje,");
	            parameter = new OracleParameter(":f_bqje", OracleType.VarChar);
	            parameter.Value = model.f_bqje;
	            parameterList.Add(parameter);
            }
            
            if (model.f_kj != null)
            {
                strSql1.Append("f_kj,");
                strSql2.Append("'" + (model.f_kj) + "',");
                strSql3.Append(":f_kj,");
                parameter = new OracleParameter(":f_kj", OracleType.VarChar);
                parameter.Value = model.f_kj;
                parameterList.Add(parameter);
            }
            if (model.f_kjid != null)
            {
                strSql1.Append("f_kjid,");
                strSql2.Append("'" + (model.f_kjid) + "',");
                strSql3.Append(":f_kjid,");
                parameter = new OracleParameter(":f_kjid", OracleType.VarChar);
                parameter.Value = model.f_kjid;
                parameterList.Add(parameter);
            }
            if (model.f_ztkhh != null)
            {
                strSql1.Append("f_ztkhh,");
                strSql2.Append("'" + (model.f_ztkhh) + "',");
                strSql3.Append(":f_ztkhh,");
                parameter = new OracleParameter(":f_ztkhh", OracleType.VarChar);
                parameter.Value = model.f_ztkhh;
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
            if (model.f_ztyhh != null)
            {
                strSql1.Append("f_ztyhh,");
                strSql2.Append("'" + (model.f_ztyhh) + "',");
                strSql3.Append(":f_ztyhh,");
                parameter = new OracleParameter(":f_ztyhh", OracleType.VarChar);
                parameter.Value = model.f_ztyhh;
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
            if (model.f_khfz != null)
            {
	            strSql1.Append("f_khfz,");
	            strSql2.Append("'" + (model.f_khfz) + "',");
	            strSql3.Append(":f_khfz,");
	            parameter = new OracleParameter(":f_khfz", OracleType.VarChar);
	            parameter.Value = model.f_khfz;
	            parameterList.Add(parameter);
            }
            if (model.f_khfzid != null)
            {
	            strSql1.Append("f_khfzid,");
	            strSql2.Append("'" + (model.f_khfzid) + "',");
	            strSql3.Append(":f_khfzid,");
	            parameter = new OracleParameter(":f_khfzid", OracleType.VarChar);
	            parameter.Value = model.f_khfzid;
	            parameterList.Add(parameter);
            }
            if (model.f_sf != null)
            {
	            strSql1.Append("f_sf,");
	            strSql2.Append("'" + (model.f_sf) + "',");
	            strSql3.Append(":f_sf,");
	            parameter = new OracleParameter(":f_sf", OracleType.VarChar);
	            parameter.Value = model.f_sf;
	            parameterList.Add(parameter);
            }
            if (model.f_pwf != null)
            {
	            strSql1.Append("f_pwf,");
	            strSql2.Append("'" + (model.f_pwf) + "',");
	            strSql3.Append(":f_pwf,");
	            parameter = new OracleParameter(":f_pwf", OracleType.VarChar);
	            parameter.Value = model.f_pwf;
	            parameterList.Add(parameter);
            }
       
            if (model.f_sjljsyl != null)
            {
	            strSql1.Append("f_sjljsyl,");
	            strSql2.Append("'" + (model.f_sjljsyl) + "',");
	            strSql3.Append(":f_sjljsyl,");
	            parameter = new OracleParameter(":f_sjljsyl", OracleType.VarChar);
	            parameter.Value = model.f_sjljsyl;
	            parameterList.Add(parameter);
            }
            if (model.f_jmje != null)
            {
	            strSql1.Append("f_jmje,");
	            strSql2.Append("'" + (model.f_jmje) + "',");
	            strSql3.Append(":f_jmje,");
	            parameter = new OracleParameter(":f_jmje", OracleType.VarChar);
	            parameter.Value = model.f_jmje;
	            parameterList.Add(parameter);
            }
            if (model.f_jmbh != null)
            {
	            strSql1.Append("f_jmbh,");
	            strSql2.Append("'" + (model.f_jmbh) + "',");
	            strSql3.Append(":f_jmbh,");
	            parameter = new OracleParameter(":f_jmbh", OracleType.VarChar);
	            parameter.Value = model.f_jmbh;
	            parameterList.Add(parameter);
            }
            if (model.f_jmbhid != null)
            {
	            strSql1.Append("f_jmbhid,");
	            strSql2.Append("'" + (model.f_jmbhid) + "',");
	            strSql3.Append(":f_jmbhid,");
	            parameter = new OracleParameter(":f_jmbhid", OracleType.VarChar);
	            parameter.Value = model.f_jmbhid;
	            parameterList.Add(parameter);
            }
            if (model.f_sfsfts != null)
            {
	            strSql1.Append("f_sfsfts,");
	            strSql2.Append("'" + (model.f_sfsfts) + "',");
	            strSql3.Append(":f_sfsfts,");
	            parameter = new OracleParameter(":f_sfsfts", OracleType.VarChar);
	            parameter.Value = model.f_sfsfts;
	            parameterList.Add(parameter);
            }
            if (model.f_sfjl != null)
            {
                strSql1.Append("f_sfjl,");
                strSql2.Append("'" + (model.f_sfjl) + "',");
                strSql3.Append(":f_sfjl,");
                parameter = new OracleParameter(":f_sfjl", OracleType.VarChar);
                parameter.Value = model.f_sfjl;
                parameterList.Add(parameter);
            }

            if (model.f_dyjtsl != null)
            {
                strSql1.Append("f_dyjtsl,");
                strSql2.Append("'" + (model.f_dyjtsl) + "',");
                strSql3.Append(":f_dyjtsl,");
                parameter = new OracleParameter(":f_dyjtsl", OracleType.VarChar);
                parameter.Value = model.f_dyjtsl;
                parameterList.Add(parameter);
            }

            if (model.f_dyjtsf != null)
            {
                strSql1.Append("f_dyjtsf,");
                strSql2.Append("'" + (model.f_dyjtsf) + "',");
                strSql3.Append(":f_dyjtsf,");
                parameter = new OracleParameter(":f_dyjtsf", OracleType.VarChar);
                parameter.Value = model.f_dyjtsf;
                parameterList.Add(parameter);
            }
            if (model.f_dejtsl != null)
            {
                strSql1.Append("f_dejtsl,");
                strSql2.Append("'" + (model.f_dejtsl) + "',");
                strSql3.Append(":f_dejtsl,");
                parameter = new OracleParameter(":f_dejtsl", OracleType.VarChar);
                parameter.Value = model.f_dejtsl;
                parameterList.Add(parameter);
            }

            if (model.f_dejtsf != null)
            {
                strSql1.Append("f_dejtsf,");
                strSql2.Append("'" + (model.f_dejtsf) + "',");
                strSql3.Append(":f_dejtsf,");
                parameter = new OracleParameter(":f_dejtsf", OracleType.VarChar);
                parameter.Value = model.f_dejtsf;
                parameterList.Add(parameter);
            }
            if (model.f_dsjtsl != null)
            {
                strSql1.Append("f_dsjtsl,");
                strSql2.Append("'" + (model.f_dsjtsl) + "',");
                strSql3.Append(":f_dsjtsl,");
                parameter = new OracleParameter(":f_dsjtsl", OracleType.VarChar);
                parameter.Value = model.f_dsjtsl;
                parameterList.Add(parameter);
            }

            if (model.f_dsjtsf != null)
            {
                strSql1.Append("f_dsjtsf,");
                strSql2.Append("'" + (model.f_dsjtsf) + "',");
                strSql3.Append(":f_dsjtsf,");
                parameter = new OracleParameter(":f_dsjtsf", OracleType.VarChar);
                parameter.Value = model.f_dsjtsf;
                parameterList.Add(parameter);
            }
            strSql.Append("insert into tbl_ld_cbiao(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_cbiao(");
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
	                string updateSqlString = " update tbl_ld_cbiao set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_cbiao> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_cbiao model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_cbiao model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_cbiao set ");
            strSql_use.Append("update tbl_ld_cbiao set ");
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
            
	            if (model.f_cb_cbbh != null&& columsList.Contains("f_cb_cbbh"))
            {
                strSql.Append("f_cb_cbbh='" + (model.f_cb_cbbh) + "',");
                strSql_use.Append("f_cb_cbbh=:f_cb_cbbh,");
                parameter = new OracleParameter(":f_cb_cbbh", OracleType.VarChar);
                parameter.Value = model.f_cb_cbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cb_cbbhid != null&& columsList.Contains("f_cb_cbbhid"))
            {
                strSql.Append("f_cb_cbbhid='" + (model.f_cb_cbbhid) + "',");
                strSql_use.Append("f_cb_cbbhid=:f_cb_cbbhid,");
                parameter = new OracleParameter(":f_cb_cbbhid", OracleType.VarChar);
                parameter.Value = model.f_cb_cbbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khbh != null&& columsList.Contains("f_khbh"))
            {
                strSql.Append("f_khbh='" + (model.f_khbh) + "',");
                strSql_use.Append("f_khbh=:f_khbh,");
                parameter = new OracleParameter(":f_khbh", OracleType.VarChar);
                parameter.Value = model.f_khbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khbhid != null&& columsList.Contains("f_khbhid"))
            {
                strSql.Append("f_khbhid='" + (model.f_khbhid) + "',");
                strSql_use.Append("f_khbhid=:f_khbhid,");
                parameter = new OracleParameter(":f_khbhid", OracleType.VarChar);
                parameter.Value = model.f_khbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sqzm != null&& columsList.Contains("f_sqzm"))
            {
                strSql.Append("f_sqzm='" + (model.f_sqzm) + "',");
                strSql_use.Append("f_sqzm=:f_sqzm,");
                parameter = new OracleParameter(":f_sqzm", OracleType.VarChar);
                parameter.Value = model.f_sqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bqzm != null&& columsList.Contains("f_bqzm"))
            {
                strSql.Append("f_bqzm='" + (model.f_bqzm) + "',");
                strSql_use.Append("f_bqzm=:f_bqzm,");
                parameter = new OracleParameter(":f_bqzm", OracleType.VarChar);
                parameter.Value = model.f_bqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bqsl != null&& columsList.Contains("f_bqsl"))
            {
                strSql.Append("f_bqsl='" + (model.f_bqsl) + "',");
                strSql_use.Append("f_bqsl=:f_bqsl,");
                parameter = new OracleParameter(":f_bqsl", OracleType.VarChar);
                parameter.Value = model.f_bqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sqsl != null&& columsList.Contains("f_sqsl"))
            {
                strSql.Append("f_sqsl='" + (model.f_sqsl) + "',");
                strSql_use.Append("f_sqsl=:f_sqsl,");
                parameter = new OracleParameter(":f_sqsl", OracleType.VarChar);
                parameter.Value = model.f_sqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_qsqpjsl != null&& columsList.Contains("f_qsqpjsl"))
            {
                strSql.Append("f_qsqpjsl='" + (model.f_qsqpjsl) + "',");
                strSql_use.Append("f_qsqpjsl=:f_qsqpjsl,");
                parameter = new OracleParameter(":f_qsqpjsl", OracleType.VarChar);
                parameter.Value = model.f_qsqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_qlqpjsl != null&& columsList.Contains("f_qlqpjsl"))
            {
                strSql.Append("f_qlqpjsl='" + (model.f_qlqpjsl) + "',");
                strSql_use.Append("f_qlqpjsl=:f_qlqpjsl,");
                parameter = new OracleParameter(":f_qlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_qlqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbyname != null&& columsList.Contains("f_cbyname"))
            {
                strSql.Append("f_cbyname='" + (model.f_cbyname) + "',");
                strSql_use.Append("f_cbyname=:f_cbyname,");
                parameter = new OracleParameter(":f_cbyname", OracleType.VarChar);
                parameter.Value = model.f_cbyname;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbyid != null&& columsList.Contains("f_cbyid"))
            {
                strSql.Append("f_cbyid='" + (model.f_cbyid) + "',");
                strSql_use.Append("f_cbyid=:f_cbyid,");
                parameter = new OracleParameter(":f_cbyid", OracleType.VarChar);
                parameter.Value = model.f_cbyid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbyphoto != null&& columsList.Contains("f_cbyphoto"))
            {
                strSql.Append("f_cbyphoto='" + (model.f_cbyphoto) + "',");
                strSql_use.Append("f_cbyphoto=:f_cbyphoto,");
                parameter = new OracleParameter(":f_cbyphoto", OracleType.VarChar);
                parameter.Value = model.f_cbyphoto;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbsj != null&& columsList.Contains("f_cbsj"))
            {
                strSql.Append("f_cbsj=to_date('" + model.f_cbsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_cbsj=:f_cbsj,");
                parameter = new OracleParameter(":f_cbsj", OracleType.DateTime);
                parameter.Value = model.f_cbsj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bk != null&& columsList.Contains("f_bk"))
            {
                strSql.Append("f_bk='" + (model.f_bk) + "',");
                strSql_use.Append("f_bk=:f_bk,");
                parameter = new OracleParameter(":f_bk", OracleType.VarChar);
                parameter.Value = model.f_bk;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bkid != null&& columsList.Contains("f_bkid"))
            {
                strSql.Append("f_bkid='" + (model.f_bkid) + "',");
                strSql_use.Append("f_bkid=:f_bkid,");
                parameter = new OracleParameter(":f_bkid", OracleType.VarChar);
                parameter.Value = model.f_bkid;
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
            
	            if (model.f_ly != null&& columsList.Contains("f_ly"))
            {
                strSql.Append("f_ly='" + (model.f_ly) + "',");
                strSql_use.Append("f_ly=:f_ly,");
                parameter = new OracleParameter(":f_ly", OracleType.VarChar);
                parameter.Value = model.f_ly;
                parameterList.Add(parameter);
            }
            
	            if (model.f_lyid != null&& columsList.Contains("f_lyid"))
            {
                strSql.Append("f_lyid='" + (model.f_lyid) + "',");
                strSql_use.Append("f_lyid=:f_lyid,");
                parameter = new OracleParameter(":f_lyid", OracleType.VarChar);
                parameter.Value = model.f_lyid;
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
            
	            if (model.f_sbbh != null&& columsList.Contains("f_sbbh"))
            {
                strSql.Append("f_sbbh='" + (model.f_sbbh) + "',");
                strSql_use.Append("f_sbbh=:f_sbbh,");
                parameter = new OracleParameter(":f_sbbh", OracleType.VarChar);
                parameter.Value = model.f_sbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbbhid != null&& columsList.Contains("f_sbbhid"))
            {
                strSql.Append("f_sbbhid='" + (model.f_sbbhid) + "',");
                strSql_use.Append("f_sbbhid=:f_sbbhid,");
                parameter = new OracleParameter(":f_sbbhid", OracleType.VarChar);
                parameter.Value = model.f_sbbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sblx != null&& columsList.Contains("f_sblx"))
            {
                strSql.Append("f_sblx='" + (model.f_sblx) + "',");
                strSql_use.Append("f_sblx=:f_sblx,");
                parameter = new OracleParameter(":f_sblx", OracleType.VarChar);
                parameter.Value = model.f_sblx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sblxid != null&& columsList.Contains("f_sblxid"))
            {
                strSql.Append("f_sblxid='" + (model.f_sblxid) + "',");
                strSql_use.Append("f_sblxid=:f_sblxid,");
                parameter = new OracleParameter(":f_sblxid", OracleType.VarChar);
                parameter.Value = model.f_sblxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yslx != null&& columsList.Contains("f_yslx"))
            {
                strSql.Append("f_yslx='" + (model.f_yslx) + "',");
                strSql_use.Append("f_yslx=:f_yslx,");
                parameter = new OracleParameter(":f_yslx", OracleType.VarChar);
                parameter.Value = model.f_yslx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yslxid != null&& columsList.Contains("f_yslxid"))
            {
                strSql.Append("f_yslxid='" + (model.f_yslxid) + "',");
                strSql_use.Append("f_yslxid=:f_yslxid,");
                parameter = new OracleParameter(":f_yslxid", OracleType.VarChar);
                parameter.Value = model.f_yslxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_lxtkhh != null&& columsList.Contains("f_lxtkhh"))
            {
                strSql.Append("f_lxtkhh='" + (model.f_lxtkhh) + "',");
                strSql_use.Append("f_lxtkhh=:f_lxtkhh,");
                parameter = new OracleParameter(":f_lxtkhh", OracleType.VarChar);
                parameter.Value = model.f_lxtkhh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbbh != null&& columsList.Contains("f_cbbh"))
            {
                strSql.Append("f_cbbh='" + (model.f_cbbh) + "',");
                strSql_use.Append("f_cbbh=:f_cbbh,");
                parameter = new OracleParameter(":f_cbbh", OracleType.VarChar);
                parameter.Value = model.f_cbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbbhid != null&& columsList.Contains("f_cbbhid"))
            {
                strSql.Append("f_cbbhid='" + (model.f_cbbhid) + "',");
                strSql_use.Append("f_cbbhid=:f_cbbhid,");
                parameter = new OracleParameter(":f_cbbhid", OracleType.VarChar);
                parameter.Value = model.f_cbbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbmc != null&& columsList.Contains("f_cbmc"))
            {
                strSql.Append("f_cbmc='" + (model.f_cbmc) + "',");
                strSql_use.Append("f_cbmc=:f_cbmc,");
                parameter = new OracleParameter(":f_cbmc", OracleType.VarChar);
                parameter.Value = model.f_cbmc;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhbh != null&& columsList.Contains("f_yhbh"))
            {
                strSql.Append("f_yhbh='" + (model.f_yhbh) + "',");
                strSql_use.Append("f_yhbh=:f_yhbh,");
                parameter = new OracleParameter(":f_yhbh", OracleType.VarChar);
                parameter.Value = model.f_yhbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhbhid != null&& columsList.Contains("f_yhbhid"))
            {
                strSql.Append("f_yhbhid='" + (model.f_yhbhid) + "',");
                strSql_use.Append("f_yhbhid=:f_yhbhid,");
                parameter = new OracleParameter(":f_yhbhid", OracleType.VarChar);
                parameter.Value = model.f_yhbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhm != null&& columsList.Contains("f_yhm"))
            {
                strSql.Append("f_yhm='" + (model.f_yhm) + "',");
                strSql_use.Append("f_yhm=:f_yhm,");
                parameter = new OracleParameter(":f_yhm", OracleType.VarChar);
                parameter.Value = model.f_yhm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfm != null&& columsList.Contains("f_jfm"))
            {
                strSql.Append("f_jfm='" + (model.f_jfm) + "',");
                strSql_use.Append("f_jfm=:f_jfm,");
                parameter = new OracleParameter(":f_jfm", OracleType.VarChar);
                parameter.Value = model.f_jfm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dh != null&& columsList.Contains("f_dh"))
            {
                strSql.Append("f_dh='" + (model.f_dh) + "',");
                strSql_use.Append("f_dh=:f_dh,");
                parameter = new OracleParameter(":f_dh", OracleType.VarChar);
                parameter.Value = model.f_dh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dz != null&& columsList.Contains("f_dz"))
            {
                strSql.Append("f_dz='" + (model.f_dz) + "',");
                strSql_use.Append("f_dz=:f_dz,");
                parameter = new OracleParameter(":f_dz", OracleType.VarChar);
                parameter.Value = model.f_dz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dy != null&& columsList.Contains("f_dy"))
            {
                strSql.Append("f_dy='" + (model.f_dy) + "',");
                strSql_use.Append("f_dy=:f_dy,");
                parameter = new OracleParameter(":f_dy", OracleType.VarChar);
                parameter.Value = model.f_dy;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dyid != null&& columsList.Contains("f_dyid"))
            {
                strSql.Append("f_dyid='" + (model.f_dyid) + "',");
                strSql_use.Append("f_dyid=:f_dyid,");
                parameter = new OracleParameter(":f_dyid", OracleType.VarChar);
                parameter.Value = model.f_dyid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sc != null&& columsList.Contains("f_sc"))
            {
                strSql.Append("f_sc='" + (model.f_sc) + "',");
                strSql_use.Append("f_sc=:f_sc,");
                parameter = new OracleParameter(":f_sc", OracleType.VarChar);
                parameter.Value = model.f_sc;
                parameterList.Add(parameter);
            }
            
	            if (model.f_scid != null&& columsList.Contains("f_scid"))
            {
                strSql.Append("f_scid='" + (model.f_scid) + "',");
                strSql_use.Append("f_scid=:f_scid,");
                parameter = new OracleParameter(":f_scid", OracleType.VarChar);
                parameter.Value = model.f_scid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_qy != null&& columsList.Contains("f_qy"))
            {
                strSql.Append("f_qy='" + (model.f_qy) + "',");
                strSql_use.Append("f_qy=:f_qy,");
                parameter = new OracleParameter(":f_qy", OracleType.VarChar);
                parameter.Value = model.f_qy;
                parameterList.Add(parameter);
            }
            
	            if (model.f_qyid != null&& columsList.Contains("f_qyid"))
            {
                strSql.Append("f_qyid='" + (model.f_qyid) + "',");
                strSql_use.Append("f_qyid=:f_qyid,");
                parameter = new OracleParameter(":f_qyid", OracleType.VarChar);
                parameter.Value = model.f_qyid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pq != null&& columsList.Contains("f_pq"))
            {
                strSql.Append("f_pq='" + (model.f_pq) + "',");
                strSql_use.Append("f_pq=:f_pq,");
                parameter = new OracleParameter(":f_pq", OracleType.VarChar);
                parameter.Value = model.f_pq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pqid != null&& columsList.Contains("f_pqid"))
            {
                strSql.Append("f_pqid='" + (model.f_pqid) + "',");
                strSql_use.Append("f_pqid=:f_pqid,");
                parameter = new OracleParameter(":f_pqid", OracleType.VarChar);
                parameter.Value = model.f_pqid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pgbh != null&& columsList.Contains("f_pgbh"))
            {
                strSql.Append("f_pgbh='" + (model.f_pgbh) + "',");
                strSql_use.Append("f_pgbh=:f_pgbh,");
                parameter = new OracleParameter(":f_pgbh", OracleType.VarChar);
                parameter.Value = model.f_pgbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pgbhid != null&& columsList.Contains("f_pgbhid"))
            {
                strSql.Append("f_pgbhid='" + (model.f_pgbhid) + "',");
                strSql_use.Append("f_pgbhid=:f_pgbhid,");
                parameter = new OracleParameter(":f_pgbhid", OracleType.VarChar);
                parameter.Value = model.f_pgbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pgr != null&& columsList.Contains("f_pgr"))
            {
                strSql.Append("f_pgr='" + (model.f_pgr) + "',");
                strSql_use.Append("f_pgr=:f_pgr,");
                parameter = new OracleParameter(":f_pgr", OracleType.VarChar);
                parameter.Value = model.f_pgr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pgrid != null&& columsList.Contains("f_pgrid"))
            {
                strSql.Append("f_pgrid='" + (model.f_pgrid) + "',");
                strSql_use.Append("f_pgrid=:f_pgrid,");
                parameter = new OracleParameter(":f_pgrid", OracleType.VarChar);
                parameter.Value = model.f_pgrid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pgpcmc != null&& columsList.Contains("f_pgpcmc"))
            {
                strSql.Append("f_pgpcmc='" + (model.f_pgpcmc) + "',");
                strSql_use.Append("f_pgpcmc=:f_pgpcmc,");
                parameter = new OracleParameter(":f_pgpcmc", OracleType.VarChar);
                parameter.Value = model.f_pgpcmc;
                parameterList.Add(parameter);
            }
            
	            if (model.f_pgsj != null&& columsList.Contains("f_pgsj"))
            {
                strSql.Append("f_pgsj=to_date('" + model.f_pgsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_pgsj=:f_pgsj,");
                parameter = new OracleParameter(":f_pgsj", OracleType.DateTime);
                parameter.Value = model.f_pgsj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfbh != null&& columsList.Contains("f_jfbh"))
            {
                strSql.Append("f_jfbh='" + (model.f_jfbh) + "',");
                strSql_use.Append("f_jfbh=:f_jfbh,");
                parameter = new OracleParameter(":f_jfbh", OracleType.VarChar);
                parameter.Value = model.f_jfbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfbhid != null&& columsList.Contains("f_jfbhid"))
            {
                strSql.Append("f_jfbhid='" + (model.f_jfbhid) + "',");
                strSql_use.Append("f_jfbhid=:f_jfbhid,");
                parameter = new OracleParameter(":f_jfbhid", OracleType.VarChar);
                parameter.Value = model.f_jfbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfsj != null&& columsList.Contains("f_jfsj"))
            {
                strSql.Append("f_jfsj=to_date('" + model.f_jfsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_jfsj=:f_jfsj,");
                parameter = new OracleParameter(":f_jfsj", OracleType.DateTime);
                parameter.Value = model.f_jfsj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_bqje != null&& columsList.Contains("f_bqje"))
            {
                strSql.Append("f_bqje='" + (model.f_bqje) + "',");
                strSql_use.Append("f_bqje=:f_bqje,");
                parameter = new OracleParameter(":f_bqje", OracleType.VarChar);
                parameter.Value = model.f_bqje;
                parameterList.Add(parameter);
            }
            if (model.f_kj != null && columsList.Contains("f_kj"))
            {
                strSql.Append("f_kj='" + (model.f_kj) + "',");
                strSql_use.Append("f_kj=:f_kj,");
                parameter = new OracleParameter(":f_kj", OracleType.VarChar);
                parameter.Value = model.f_kj;
                parameterList.Add(parameter);
            }
            if (model.f_kjid != null && columsList.Contains("f_kjid"))
            {
                strSql.Append("f_kjid='" + (model.f_kjid) + "',");
                strSql_use.Append("f_kjid=:f_kjid,");
                parameter = new OracleParameter(":f_kjid", OracleType.VarChar);
                parameter.Value = model.f_kjid;
                parameterList.Add(parameter);
            }
            if (model.f_ztkhh != null && columsList.Contains("f_ztkhh"))
            {
                strSql.Append("f_ztkhh='" + (model.f_ztkhh) + "',");
                strSql_use.Append("f_ztkhh=:f_ztkhh,");
                parameter = new OracleParameter(":f_ztkhh", OracleType.VarChar);
                parameter.Value = model.f_ztkhh;
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
            if (model.f_ztyhh != null && columsList.Contains("f_ztyhh"))
            {
                strSql.Append("f_ztyhh='" + (model.f_ztyhh) + "',");
                strSql_use.Append("f_ztyhh=:f_ztyhh,");
                parameter = new OracleParameter(":f_ztyhh", OracleType.VarChar);
                parameter.Value = model.f_ztyhh;
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
	            if (model.f_khfz != null&& columsList.Contains("f_khfz"))
            {
                strSql.Append("f_khfz='" + (model.f_khfz) + "',");
                strSql_use.Append("f_khfz=:f_khfz,");
                parameter = new OracleParameter(":f_khfz", OracleType.VarChar);
                parameter.Value = model.f_khfz;
                parameterList.Add(parameter);
            }
	            if (model.f_khfzid != null&& columsList.Contains("f_khfzid"))
            {
                strSql.Append("f_khfzid='" + (model.f_khfzid) + "',");
                strSql_use.Append("f_khfzid=:f_khfzid,");
                parameter = new OracleParameter(":f_khfzid", OracleType.VarChar);
                parameter.Value = model.f_khfzid;
                parameterList.Add(parameter);
            }
	            if (model.f_sf != null&& columsList.Contains("f_sf"))
            {
                strSql.Append("f_sf='" + (model.f_sf) + "',");
                strSql_use.Append("f_sf=:f_sf,");
                parameter = new OracleParameter(":f_sf", OracleType.VarChar);
                parameter.Value = model.f_sf;
                parameterList.Add(parameter);
            }
	            if (model.f_pwf != null&& columsList.Contains("f_pwf"))
            {
                strSql.Append("f_pwf='" + (model.f_pwf) + "',");
                strSql_use.Append("f_pwf=:f_pwf,");
                parameter = new OracleParameter(":f_pwf", OracleType.VarChar);
                parameter.Value = model.f_pwf;
                parameterList.Add(parameter);
            }
	    
	            if (model.f_sjljsyl != null&& columsList.Contains("f_sjljsyl"))
            {
                strSql.Append("f_sjljsyl='" + (model.f_sjljsyl) + "',");
                strSql_use.Append("f_sjljsyl=:f_sjljsyl,");
                parameter = new OracleParameter(":f_sjljsyl", OracleType.VarChar);
                parameter.Value = model.f_sjljsyl;
                parameterList.Add(parameter);
            }
	            if (model.f_jmje != null&& columsList.Contains("f_jmje"))
            {
                strSql.Append("f_jmje='" + (model.f_jmje) + "',");
                strSql_use.Append("f_jmje=:f_jmje,");
                parameter = new OracleParameter(":f_jmje", OracleType.VarChar);
                parameter.Value = model.f_jmje;
                parameterList.Add(parameter);
            }
	            if (model.f_jmbh != null&& columsList.Contains("f_jmbh"))
            {
                strSql.Append("f_jmbh='" + (model.f_jmbh) + "',");
                strSql_use.Append("f_jmbh=:f_jmbh,");
                parameter = new OracleParameter(":f_jmbh", OracleType.VarChar);
                parameter.Value = model.f_jmbh;
                parameterList.Add(parameter);
            }
	            if (model.f_jmbhid != null&& columsList.Contains("f_jmbhid"))
            {
                strSql.Append("f_jmbhid='" + (model.f_jmbhid) + "',");
                strSql_use.Append("f_jmbhid=:f_jmbhid,");
                parameter = new OracleParameter(":f_jmbhid", OracleType.VarChar);
                parameter.Value = model.f_jmbhid;
                parameterList.Add(parameter);
            }
	            if (model.f_sfsfts != null&& columsList.Contains("f_sfsfts"))
            {
                strSql.Append("f_sfsfts='" + (model.f_sfsfts) + "',");
                strSql_use.Append("f_sfsfts=:f_sfsfts,");
                parameter = new OracleParameter(":f_sfsfts", OracleType.VarChar);
                parameter.Value = model.f_sfsfts;
                parameterList.Add(parameter);
            }
            if (model.f_sfjl != null && columsList.Contains("f_sfjl"))
            {
                strSql.Append("f_sfjl='" + (model.f_sfjl) + "',");
                strSql_use.Append("f_sfjl=:f_sfjl,");
                parameter = new OracleParameter(":f_sfjl", OracleType.VarChar);
                parameter.Value = model.f_sfjl;
                parameterList.Add(parameter);
            }

            if (model.f_dyjtsl != null && columsList.Contains("f_dyjtsl"))
            {
                strSql.Append("f_dyjtsl='" + (model.f_dyjtsl) + "',");
                strSql_use.Append("f_dyjtsl=:f_dyjtsl,");
                parameter = new OracleParameter(":f_dyjtsl", OracleType.VarChar);
                parameter.Value = model.f_dyjtsl;
                parameterList.Add(parameter);
            }

            if (model.f_dyjtsf != null && columsList.Contains("f_dyjtsf"))
            {
                strSql.Append("f_dyjtsf='" + (model.f_dyjtsf) + "',");
                strSql_use.Append("f_dyjtsf=:f_dyjtsf,");
                parameter = new OracleParameter(":f_dyjtsf", OracleType.VarChar);
                parameter.Value = model.f_dyjtsf;
                parameterList.Add(parameter);
            }

            if (model.f_dejtsl != null && columsList.Contains("f_dejtsl"))
            {
                strSql.Append("f_dejtsl='" + (model.f_dejtsl) + "',");
                strSql_use.Append("f_dejtsl=:f_dejtsl,");
                parameter = new OracleParameter(":f_dejtsl", OracleType.VarChar);
                parameter.Value = model.f_dejtsl;
                parameterList.Add(parameter);
            }

            if (model.f_dejtsf != null && columsList.Contains("f_dejtsf"))
            {
                strSql.Append("f_dejtsf='" + (model.f_dejtsf) + "',");
                strSql_use.Append("f_dejtsf=:f_dejtsf,");
                parameter = new OracleParameter(":f_dejtsf", OracleType.VarChar);
                parameter.Value = model.f_dejtsf;
                parameterList.Add(parameter);
            }

            if (model.f_dsjtsl != null && columsList.Contains("f_dsjtsl"))
            {
                strSql.Append("f_dsjtsl='" + (model.f_dsjtsl) + "',");
                strSql_use.Append("f_dsjtsl=:f_dsjtsl,");
                parameter = new OracleParameter(":f_dsjtsl", OracleType.VarChar);
                parameter.Value = model.f_dsjtsl;
                parameterList.Add(parameter);
            }

            if (model.f_dsjtsf != null && columsList.Contains("f_dsjtsf"))
            {
                strSql.Append("f_dsjtsf='" + (model.f_dsjtsf) + "',");
                strSql_use.Append("f_dsjtsf=:f_dsjtsf,");
                parameter = new OracleParameter(":f_dsjtsf", OracleType.VarChar);
                parameter.Value = model.f_dsjtsf;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_cbiao> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_cbiao model in modelList)
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
            strSql.Append("delete tbl_ld_cbiao where  ");
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
            strSql.Append("update tbl_ld_cbiao set ");
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
        public string GetCount(string whereString, string cxzxsjString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("cBiao", cxzxsjString) == true)
            {
                strSql.Append(" select sum(c) from  ");
                strSql.Append(" ( ");
                strSql.Append(" select count(*) as c  from tbl_ld_cbiao t ");
                if (whereString.Trim() != "")
                {
                    strSql.Append(" where " + whereString);
                }
                strSql.Append(" union  all ");
                strSql.Append(" select count(*) as c  from tbl_ld_cbiao_his t ");
                if (whereString.Trim() != "")
                {
                    strSql.Append(" where " + whereString);
                }
                strSql.Append(" ) ");
            }
            else
            {
                strSql.Append("select count(*) from tbl_ld_cbiao t");
            if (whereString.Trim() != "")
            {
                strSql.Append(" where " + whereString);
                }
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
        public List<sara.dd.ldsw.model.tbl_ld_cbiao> GetList(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");

            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("cBiao", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_cbiao t where ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");                       
                strSql.Append("  union  all ");
                strSql.Append("  (select * from tbl_ld_cbiao_his t where  ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");           
                strSql.Append("  )    ");

                if (orderByString.Trim() == "")
                {
                    strSql.Append(" order by sys_creatdate desc ");
                }
                else
                {
                    strSql.Append(" order by " + orderByString);
                }
            }
            else
            {
                strSql.Append(" select * from tbl_ld_cbiao t where");
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

            List<sara.dd.ldsw.model.tbl_ld_cbiao> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(resultDataTable);
            if (Eva.Library.Configuration.ConfigurationManager.AppSettings["SqlEditMode"].ToString() == "parameter")
            {
            }
            else //如果是sql形式的话，则进行textReturn
            {
                modelList = Eva.Library.Format.FormatTextTool.ModelListReturn(modelList);
            }
            return modelList;
        }


        public DataTable GetDataTableForPC(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");


            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("cBiao", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_cbiao t where ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  union  all ");
                strSql.Append("  (select * from tbl_ld_cbiao_his t where  ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  )    ");

                if (orderByString.Trim() == "")
                {
                    strSql.Append(" order by sys_creatdate desc ");
                }
                else
                {
                    strSql.Append(" order by " + orderByString);
                }
            }
            else
            {
                strSql.Append(" select * from tbl_ld_cbiao t where");
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


        public DataTable GetDataTableForApp(string whereString, string cxzxsjString,  string orderByString, string columnsString, string countString, string stepString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");


            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("cBiao", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_cbiao t where ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  union  all ");
                strSql.Append("  (select * from tbl_ld_cbiao_his t where  ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  )    ");

                if (orderByString.Trim() == "")
                {
                    strSql.Append(" order by sys_creatdate desc ");
                }
                else
                {
                    strSql.Append(" order by " + orderByString);
                }
            }
            else
            {
                strSql.Append(" select * from tbl_ld_cbiao t where");
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

            //string sqlString = "update tbl_num set f_tablesys_id = ";
            //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_cbiao')";
            //sqlString += " where f_tablename  = 'tbl_ld_cbiao'";

            //if (t == null)
            //{
           //     _iAccessData.ExecuteSql(sqlString);
           // }
            //else
           // {
            //    t.ExecuteSql(sqlString);
           // }

           // sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_cbiao'";


           // if (t == null)
            //{
            //    return _iAccessData.GetSingle(sqlString).ToString();
          //  }
            //else
         //   {
           //     return t.GetSingle(sqlString).ToString();
          //  }

            string sqlString = "";
            sqlString = "select TBL_LD_CBIAO_SYS_ID_SEQU.NEXTVAL from dual";
            return _iAccessData.GetSingle(sqlString).ToString();
        }


        #endregion 成员方法



    }
}
















