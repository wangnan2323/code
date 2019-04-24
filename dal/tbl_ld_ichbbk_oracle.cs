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
    /// 数据访问类tbl_ld_ichbbk 
    /// </summary>
    public class tbl_ld_ichbbk : sara.dd.ldsw.idal.Itbl_ld_ichbbk
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_ichbbk()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_ichbbk model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_hbbh != null)
            {
	            strSql1.Append("f_hbbh,");
	            strSql2.Append("'" + (model.f_hbbh) + "',");
	            strSql3.Append(":f_hbbh,");
	            parameter = new OracleParameter(":f_hbbh", OracleType.VarChar);
	            parameter.Value = model.f_hbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sjbh != null)
            {
	            strSql1.Append("f_sjbh,");
	            strSql2.Append("'" + (model.f_sjbh) + "',");
	            strSql3.Append(":f_sjbh,");
	            parameter = new OracleParameter(":f_sjbh", OracleType.VarChar);
	            parameter.Value = model.f_sjbh;
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
            
            if (model.f_lxth != null)
            {
	            strSql1.Append("f_lxth,");
	            strSql2.Append("'" + (model.f_lxth) + "',");
	            strSql3.Append(":f_lxth,");
	            parameter = new OracleParameter(":f_lxth", OracleType.VarChar);
	            parameter.Value = model.f_lxth;
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
            
            if (model.f_xunkr != null)
            {
	            strSql1.Append("f_xunkr,");
	            strSql2.Append("'" + (model.f_xunkr) + "',");
	            strSql3.Append(":f_xunkr,");
	            parameter = new OracleParameter(":f_xunkr", OracleType.VarChar);
	            parameter.Value = model.f_xunkr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xiekrid != null)
            {
	            strSql1.Append("f_xiekrid,");
	            strSql2.Append("'" + (model.f_xiekrid) + "',");
	            strSql3.Append(":f_xiekrid,");
	            parameter = new OracleParameter(":f_xiekrid", OracleType.VarChar);
	            parameter.Value = model.f_xiekrid;
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
            
            if (model.f_dy != null)
            {
	            strSql1.Append("f_dy,");
	            strSql2.Append("'" + (model.f_dy) + "',");
	            strSql3.Append(":f_dy,");
	            parameter = new OracleParameter(":f_dy", OracleType.VarChar);
	            parameter.Value = model.f_dy;
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
            
            if (model.f_xunkrid != null)
            {
	            strSql1.Append("f_xunkrid,");
	            strSql2.Append("'" + (model.f_xunkrid) + "',");
	            strSql3.Append(":f_xunkrid,");
	            parameter = new OracleParameter(":f_xunkrid", OracleType.VarChar);
	            parameter.Value = model.f_xunkrid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xiekrq != null)
            {
	            strSql1.Append("f_xiekrq,");
	            strSql2.Append("'" + (model.f_xiekrq) + "',");
	            strSql3.Append(":f_xiekrq,");
	            parameter = new OracleParameter(":f_xiekrq", OracleType.VarChar);
	            parameter.Value = model.f_xiekrq;
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
            
            if (model.f_dyid != null)
            {
	            strSql1.Append("f_dyid,");
	            strSql2.Append("'" + (model.f_dyid) + "',");
	            strSql3.Append(":f_dyid,");
	            parameter = new OracleParameter(":f_dyid", OracleType.VarChar);
	            parameter.Value = model.f_dyid;
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
            
            if (model.f_xunkrq != null)
            {
	            strSql1.Append("f_xunkrq,");
	            strSql2.Append("'" + (model.f_xunkrq) + "',");
	            strSql3.Append(":f_xunkrq,");
	            parameter = new OracleParameter(":f_xunkrq", OracleType.VarChar);
	            parameter.Value = model.f_xunkrq;
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
            
            if (model.f_yhbhid != null)
            {
	            strSql1.Append("f_yhbhid,");
	            strSql2.Append("'" + (model.f_yhbhid) + "',");
	            strSql3.Append(":f_yhbhid,");
	            parameter = new OracleParameter(":f_yhbhid", OracleType.VarChar);
	            parameter.Value = model.f_yhbhid;
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
            
            if (model.f_pq != null)
            {
	            strSql1.Append("f_pq,");
	            strSql2.Append("'" + (model.f_pq) + "',");
	            strSql3.Append(":f_pq,");
	            parameter = new OracleParameter(":f_pq", OracleType.VarChar);
	            parameter.Value = model.f_pq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xiekr != null)
            {
	            strSql1.Append("f_xiekr,");
	            strSql2.Append("'" + (model.f_xiekr) + "',");
	            strSql3.Append(":f_xiekr,");
	            parameter = new OracleParameter(":f_xiekr", OracleType.VarChar);
	            parameter.Value = model.f_xiekr;
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
            
            if (model.f_khrq != null)
            {
	            strSql1.Append("f_khrq,");
                strSql2.Append("to_date('" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_khrq,");
                parameter = new OracleParameter(":f_khrq", OracleType.DateTime);
	            parameter.Value = model.f_khrq;
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
            
            if (model.f_pqid != null)
            {
	            strSql1.Append("f_pqid,");
	            strSql2.Append("'" + (model.f_pqid) + "',");
	            strSql3.Append(":f_pqid,");
	            parameter = new OracleParameter(":f_pqid", OracleType.VarChar);
	            parameter.Value = model.f_pqid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sbbh != null)
            {
	            strSql1.Append("f_o_sbbh,");
	            strSql2.Append("'" + (model.f_o_sbbh) + "',");
	            strSql3.Append(":f_o_sbbh,");
	            parameter = new OracleParameter(":f_o_sbbh", OracleType.VarChar);
	            parameter.Value = model.f_o_sbbh;
	            parameterList.Add(parameter);
            }

            if (model.f_o_sbbhid != null)
            {
                strSql1.Append("f_o_sbbhid,");
                strSql2.Append("'" + (model.f_o_sbbhid) + "',");
                strSql3.Append(":f_o_sbbhid,");
                parameter = new OracleParameter(":f_o_sbbhid", OracleType.VarChar);
                parameter.Value = model.f_o_sbbhid;
                parameterList.Add(parameter);
            }

            if (model.f_o_sbfzid != null)
            {
	            strSql1.Append("f_o_sbfzid,");
	            strSql2.Append("'" + (model.f_o_sbfzid) + "',");
	            strSql3.Append(":f_o_sbfzid,");
	            parameter = new OracleParameter(":f_o_sbfzid", OracleType.VarChar);
	            parameter.Value = model.f_o_sbfzid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_khbh != null)
            {
	            strSql1.Append("f_o_khbh,");
	            strSql2.Append("'" + (model.f_o_khbh) + "',");
	            strSql3.Append(":f_o_khbh,");
	            parameter = new OracleParameter(":f_o_khbh", OracleType.VarChar);
	            parameter.Value = model.f_o_khbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sblx != null)
            {
	            strSql1.Append("f_o_sblx,");
	            strSql2.Append("'" + (model.f_o_sblx) + "',");
	            strSql3.Append(":f_o_sblx,");
	            parameter = new OracleParameter(":f_o_sblx", OracleType.VarChar);
	            parameter.Value = model.f_o_sblx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_cszm != null)
            {
	            strSql1.Append("f_o_cszm,");
	            strSql2.Append("'" + (model.f_o_cszm) + "',");
	            strSql3.Append(":f_o_cszm,");
	            parameter = new OracleParameter(":f_o_cszm", OracleType.VarChar);
	            parameter.Value = model.f_o_cszm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_ljgl != null)
            {
	            strSql1.Append("f_o_ljgl,");
	            strSql2.Append("'" + (model.f_o_ljgl) + "',");
	            strSql3.Append(":f_o_ljgl,");
	            parameter = new OracleParameter(":f_o_ljgl", OracleType.VarChar);
	            parameter.Value = model.f_o_ljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_jsbh != null)
            {
	            strSql1.Append("f_o_jsbh,");
	            strSql2.Append("'" + (model.f_o_jsbh) + "',");
	            strSql3.Append(":f_o_jsbh,");
	            parameter = new OracleParameter(":f_o_jsbh", OracleType.VarChar);
	            parameter.Value = model.f_o_jsbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sbpp != null)
            {
	            strSql1.Append("f_o_sbpp,");
	            strSql2.Append("'" + (model.f_o_sbpp) + "',");
	            strSql3.Append(":f_o_sbpp,");
	            parameter = new OracleParameter(":f_o_sbpp", OracleType.VarChar);
	            parameter.Value = model.f_o_sbpp;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_rs != null)
            {
	            strSql1.Append("f_o_rs,");
	            strSql2.Append("'" + (model.f_o_rs) + "',");
	            strSql3.Append(":f_o_rs,");
	            parameter = new OracleParameter(":f_o_rs", OracleType.VarChar);
	            parameter.Value = model.f_o_rs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sblxid != null)
            {
	            strSql1.Append("f_o_sblxid,");
	            strSql2.Append("'" + (model.f_o_sblxid) + "',");
	            strSql3.Append(":f_o_sblxid,");
	            parameter = new OracleParameter(":f_o_sblxid", OracleType.VarChar);
	            parameter.Value = model.f_o_sblxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_bqzm != null)
            {
	            strSql1.Append("f_o_bqzm,");
	            strSql2.Append("'" + (model.f_o_bqzm) + "',");
	            strSql3.Append(":f_o_bqzm,");
	            parameter = new OracleParameter(":f_o_bqzm", OracleType.VarChar);
	            parameter.Value = model.f_o_bqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_qsqpjsl != null)
            {
	            strSql1.Append("f_o_qsqpjsl,");
	            strSql2.Append("'" + (model.f_o_qsqpjsl) + "',");
	            strSql3.Append(":f_o_qsqpjsl,");
	            parameter = new OracleParameter(":f_o_qsqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_o_qsqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_lxth != null)
            {
	            strSql1.Append("f_o_lxth,");
	            strSql2.Append("'" + (model.f_o_lxth) + "',");
	            strSql3.Append(":f_o_lxth,");
	            parameter = new OracleParameter(":f_o_lxth", OracleType.VarChar);
	            parameter.Value = model.f_o_lxth;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_mph != null)
            {
	            strSql1.Append("f_o_mph,");
	            strSql2.Append("'" + (model.f_o_mph) + "',");
	            strSql3.Append(":f_o_mph,");
	            parameter = new OracleParameter(":f_o_mph", OracleType.VarChar);
	            parameter.Value = model.f_o_mph;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sbkj != null)
            {
	            strSql1.Append("f_o_sbkj,");
	            strSql2.Append("'" + (model.f_o_sbkj) + "',");
	            strSql3.Append(":f_o_sbkj,");
	            parameter = new OracleParameter(":f_o_sbkj", OracleType.VarChar);
	            parameter.Value = model.f_o_sbkj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_jllx != null)
            {
	            strSql1.Append("f_o_jllx,");
	            strSql2.Append("'" + (model.f_o_jllx) + "',");
	            strSql3.Append(":f_o_jllx,");
	            parameter = new OracleParameter(":f_o_jllx", OracleType.VarChar);
	            parameter.Value = model.f_o_jllx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sqzm != null)
            {
	            strSql1.Append("f_o_sqzm,");
	            strSql2.Append("'" + (model.f_o_sqzm) + "',");
	            strSql3.Append(":f_o_sqzm,");
	            parameter = new OracleParameter(":f_o_sqzm", OracleType.VarChar);
	            parameter.Value = model.f_o_sqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_qlqpjsl != null)
            {
	            strSql1.Append("f_o_qlqpjsl,");
	            strSql2.Append("'" + (model.f_o_qlqpjsl) + "',");
	            strSql3.Append(":f_o_qlqpjsl,");
	            parameter = new OracleParameter(":f_o_qlqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_o_qlqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sbfz != null)
            {
	            strSql1.Append("f_o_sbfz,");
	            strSql2.Append("'" + (model.f_o_sbfz) + "',");
	            strSql3.Append(":f_o_sbfz,");
	            parameter = new OracleParameter(":f_o_sbfz", OracleType.VarChar);
	            parameter.Value = model.f_o_sbfz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sbdz != null)
            {
	            strSql1.Append("f_o_sbdz,");
	            strSql2.Append("'" + (model.f_o_sbdz) + "',");
	            strSql3.Append(":f_o_sbdz,");
	            parameter = new OracleParameter(":f_o_sbdz", OracleType.VarChar);
	            parameter.Value = model.f_o_sbdz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sbkjid != null)
            {
	            strSql1.Append("f_o_sbkjid,");
	            strSql2.Append("'" + (model.f_o_sbkjid) + "',");
	            strSql3.Append(":f_o_sbkjid,");
	            parameter = new OracleParameter(":f_o_sbkjid", OracleType.VarChar);
	            parameter.Value = model.f_o_sbkjid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_jllxid != null)
            {
	            strSql1.Append("f_o_jllxid,");
	            strSql2.Append("'" + (model.f_o_jllxid) + "',");
	            strSql3.Append(":f_o_jllxid,");
	            parameter = new OracleParameter(":f_o_jllxid", OracleType.VarChar);
	            parameter.Value = model.f_o_jllxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_sqsl != null)
            {
	            strSql1.Append("f_o_sqsl,");
	            strSql2.Append("'" + (model.f_o_sqsl) + "',");
	            strSql3.Append(":f_o_sqsl,");
	            parameter = new OracleParameter(":f_o_sqsl", OracleType.VarChar);
	            parameter.Value = model.f_o_sqsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_o_bqsl != null)
            {
	            strSql1.Append("f_o_bqsl,");
	            strSql2.Append("'" + (model.f_o_bqsl) + "',");
	            strSql3.Append(":f_o_bqsl,");
	            parameter = new OracleParameter(":f_o_bqsl", OracleType.VarChar);
	            parameter.Value = model.f_o_bqsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbbh != null)
            {
	            strSql1.Append("f_n_sbbh,");
	            strSql2.Append("'" + (model.f_n_sbbh) + "',");
	            strSql3.Append(":f_n_sbbh,");
	            parameter = new OracleParameter(":f_n_sbbh", OracleType.VarChar);
	            parameter.Value = model.f_n_sbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbfz != null)
            {
	            strSql1.Append("f_n_sbfz,");
	            strSql2.Append("'" + (model.f_n_sbfz) + "',");
	            strSql3.Append(":f_n_sbfz,");
	            parameter = new OracleParameter(":f_n_sbfz", OracleType.VarChar);
	            parameter.Value = model.f_n_sbfz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbfzid != null)
            {
	            strSql1.Append("f_n_sbfzid,");
	            strSql2.Append("'" + (model.f_n_sbfzid) + "',");
	            strSql3.Append(":f_n_sbfzid,");
	            parameter = new OracleParameter(":f_n_sbfzid", OracleType.VarChar);
	            parameter.Value = model.f_n_sbfzid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbpp != null)
            {
	            strSql1.Append("f_n_sbpp,");
	            strSql2.Append("'" + (model.f_n_sbpp) + "',");
	            strSql3.Append(":f_n_sbpp,");
	            parameter = new OracleParameter(":f_n_sbpp", OracleType.VarChar);
	            parameter.Value = model.f_n_sbpp;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_mph != null)
            {
	            strSql1.Append("f_n_mph,");
	            strSql2.Append("'" + (model.f_n_mph) + "',");
	            strSql3.Append(":f_n_mph,");
	            parameter = new OracleParameter(":f_n_mph", OracleType.VarChar);
	            parameter.Value = model.f_n_mph;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_rs != null)
            {
	            strSql1.Append("f_n_rs,");
	            strSql2.Append("'" + (model.f_n_rs) + "',");
	            strSql3.Append(":f_n_rs,");
	            parameter = new OracleParameter(":f_n_rs", OracleType.VarChar);
	            parameter.Value = model.f_n_rs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbkj != null)
            {
	            strSql1.Append("f_n_sbkj,");
	            strSql2.Append("'" + (model.f_n_sbkj) + "',");
	            strSql3.Append(":f_n_sbkj,");
	            parameter = new OracleParameter(":f_n_sbkj", OracleType.VarChar);
	            parameter.Value = model.f_n_sbkj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbkjid != null)
            {
	            strSql1.Append("f_n_sbkjid,");
	            strSql2.Append("'" + (model.f_n_sbkjid) + "',");
	            strSql3.Append(":f_n_sbkjid,");
	            parameter = new OracleParameter(":f_n_sbkjid", OracleType.VarChar);
	            parameter.Value = model.f_n_sbkjid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_jsbh != null)
            {
	            strSql1.Append("f_n_jsbh,");
	            strSql2.Append("'" + (model.f_n_jsbh) + "',");
	            strSql3.Append(":f_n_jsbh,");
	            parameter = new OracleParameter(":f_n_jsbh", OracleType.VarChar);
	            parameter.Value = model.f_n_jsbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_lxth != null)
            {
	            strSql1.Append("f_n_lxth,");
	            strSql2.Append("'" + (model.f_n_lxth) + "',");
	            strSql3.Append(":f_n_lxth,");
	            parameter = new OracleParameter(":f_n_lxth", OracleType.VarChar);
	            parameter.Value = model.f_n_lxth;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_khbh != null)
            {
	            strSql1.Append("f_n_khbh,");
	            strSql2.Append("'" + (model.f_n_khbh) + "',");
	            strSql3.Append(":f_n_khbh,");
	            parameter = new OracleParameter(":f_n_khbh", OracleType.VarChar);
	            parameter.Value = model.f_n_khbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sblx != null)
            {
	            strSql1.Append("f_n_sblx,");
	            strSql2.Append("'" + (model.f_n_sblx) + "',");
	            strSql3.Append(":f_n_sblx,");
	            parameter = new OracleParameter(":f_n_sblx", OracleType.VarChar);
	            parameter.Value = model.f_n_sblx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sblxid != null)
            {
	            strSql1.Append("f_n_sblxid,");
	            strSql2.Append("'" + (model.f_n_sblxid) + "',");
	            strSql3.Append(":f_n_sblxid,");
	            parameter = new OracleParameter(":f_n_sblxid", OracleType.VarChar);
	            parameter.Value = model.f_n_sblxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_jllx != null)
            {
	            strSql1.Append("f_n_jllx,");
	            strSql2.Append("'" + (model.f_n_jllx) + "',");
	            strSql3.Append(":f_n_jllx,");
	            parameter = new OracleParameter(":f_n_jllx", OracleType.VarChar);
	            parameter.Value = model.f_n_jllx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_jllxid != null)
            {
	            strSql1.Append("f_n_jllxid,");
	            strSql2.Append("'" + (model.f_n_jllxid) + "',");
	            strSql3.Append(":f_n_jllxid,");
	            parameter = new OracleParameter(":f_n_jllxid", OracleType.VarChar);
	            parameter.Value = model.f_n_jllxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_ljgl != null)
            {
	            strSql1.Append("f_n_ljgl,");
	            strSql2.Append("'" + (model.f_n_ljgl) + "',");
	            strSql3.Append(":f_n_ljgl,");
	            parameter = new OracleParameter(":f_n_ljgl", OracleType.VarChar);
	            parameter.Value = model.f_n_ljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_cqzm != null)
            {
	            strSql1.Append("f_n_cqzm,");
	            strSql2.Append("'" + (model.f_n_cqzm) + "',");
	            strSql3.Append(":f_n_cqzm,");
	            parameter = new OracleParameter(":f_n_cqzm", OracleType.VarChar);
	            parameter.Value = model.f_n_cqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sqzm != null)
            {
	            strSql1.Append("f_n_sqzm,");
	            strSql2.Append("'" + (model.f_n_sqzm) + "',");
	            strSql3.Append(":f_n_sqzm,");
	            parameter = new OracleParameter(":f_n_sqzm", OracleType.VarChar);
	            parameter.Value = model.f_n_sqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_bqzm != null)
            {
	            strSql1.Append("f_n_bqzm,");
	            strSql2.Append("'" + (model.f_n_bqzm) + "',");
	            strSql3.Append(":f_n_bqzm,");
	            parameter = new OracleParameter(":f_n_bqzm", OracleType.VarChar);
	            parameter.Value = model.f_n_bqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_bqsl != null)
            {
	            strSql1.Append("f_n_bqsl,");
	            strSql2.Append("'" + (model.f_n_bqsl) + "',");
	            strSql3.Append(":f_n_bqsl,");
	            parameter = new OracleParameter(":f_n_bqsl", OracleType.VarChar);
	            parameter.Value = model.f_n_bqsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_qsqpjsl != null)
            {
	            strSql1.Append("f_n_qsqpjsl,");
	            strSql2.Append("'" + (model.f_n_qsqpjsl) + "',");
	            strSql3.Append(":f_n_qsqpjsl,");
	            parameter = new OracleParameter(":f_n_qsqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_n_qsqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_qlqpjsl != null)
            {
	            strSql1.Append("f_n_qlqpjsl,");
	            strSql2.Append("'" + (model.f_n_qlqpjsl) + "',");
	            strSql3.Append(":f_n_qlqpjsl,");
	            parameter = new OracleParameter(":f_n_qlqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_n_qlqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sqsl != null)
            {
	            strSql1.Append("f_n_sqsl,");
	            strSql2.Append("'" + (model.f_n_sqsl) + "',");
	            strSql3.Append(":f_n_sqsl,");
	            parameter = new OracleParameter(":f_n_sqsl", OracleType.VarChar);
	            parameter.Value = model.f_n_sqsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_n_sbdz != null)
            {
	            strSql1.Append("f_n_sbdz,");
	            strSql2.Append("'" + (model.f_n_sbdz) + "',");
	            strSql3.Append(":f_n_sbdz,");
	            parameter = new OracleParameter(":f_n_sbdz", OracleType.VarChar);
	            parameter.Value = model.f_n_sbdz;
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
            
            if (model.f_o_sbds != null)
            {
	            strSql1.Append("f_o_sbds,");
	            strSql2.Append("'" + (model.f_o_sbds) + "',");
	            strSql3.Append(":f_o_sbds,");
	            parameter = new OracleParameter(":f_o_sbds", OracleType.VarChar);
	            parameter.Value = model.f_o_sbds;
	            parameterList.Add(parameter);
            }
            
            if (model.f_gslb != null)
            {
	            strSql1.Append("f_gslb,");
	            strSql2.Append("'" + (model.f_gslb) + "',");
	            strSql3.Append(":f_gslb,");
	            parameter = new OracleParameter(":f_gslb", OracleType.VarChar);
	            parameter.Value = model.f_gslb;
	            parameterList.Add(parameter);
            }
            
            if (model.f_gslbid != null)
            {
	            strSql1.Append("f_gslbid,");
	            strSql2.Append("'" + (model.f_gslbid) + "',");
	            strSql3.Append(":f_gslbid,");
	            parameter = new OracleParameter(":f_gslbid", OracleType.VarChar);
	            parameter.Value = model.f_gslbid;
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
            
            if (model.f_xklx != null)
            {
	            strSql1.Append("f_xklx,");
	            strSql2.Append("'" + (model.f_xklx) + "',");
	            strSql3.Append(":f_xklx,");
	            parameter = new OracleParameter(":f_xklx", OracleType.VarChar);
	            parameter.Value = model.f_xklx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkkh != null)
            {
	            strSql1.Append("f_xkkh,");
	            strSql2.Append("'" + (model.f_xkkh) + "',");
	            strSql3.Append(":f_xkkh,");
	            parameter = new OracleParameter(":f_xkkh", OracleType.VarChar);
	            parameter.Value = model.f_xkkh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkgscs != null)
            {
	            strSql1.Append("f_xkgscs,");
	            strSql2.Append("'" + (model.f_xkgscs) + "',");
	            strSql3.Append(":f_xkgscs,");
	            parameter = new OracleParameter(":f_xkgscs", OracleType.VarChar);
	            parameter.Value = model.f_xkgscs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkbcgsl != null)
            {
	            strSql1.Append("f_xkbcgsl,");
	            strSql2.Append("'" + (model.f_xkbcgsl) + "',");
	            strSql3.Append(":f_xkbcgsl,");
	            parameter = new OracleParameter(":f_xkbcgsl", OracleType.VarChar);
	            parameter.Value = model.f_xkbcgsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkms != null)
            {
	            strSql1.Append("f_xkms,");
	            strSql2.Append("'" + (model.f_xkms) + "',");
	            strSql3.Append(":f_xkms,");
	            parameter = new OracleParameter(":f_xkms", OracleType.VarChar);
	            parameter.Value = model.f_xkms;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkmsid != null)
            {
	            strSql1.Append("f_xkmsid,");
	            strSql2.Append("'" + (model.f_xkmsid) + "',");
	            strSql3.Append(":f_xkmsid,");
	            parameter = new OracleParameter(":f_xkmsid", OracleType.VarChar);
	            parameter.Value = model.f_xkmsid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkljgl != null)
            {
	            strSql1.Append("f_xkljgl,");
	            strSql2.Append("'" + (model.f_xkljgl) + "',");
	            strSql3.Append(":f_xkljgl,");
	            parameter = new OracleParameter(":f_xkljgl", OracleType.VarChar);
	            parameter.Value = model.f_xkljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xkjzlx != null)
            {
	            strSql1.Append("f_xkjzlx,");
	            strSql2.Append("'" + (model.f_xkjzlx) + "',");
	            strSql3.Append(":f_xkjzlx,");
	            parameter = new OracleParameter(":f_xkjzlx", OracleType.VarChar);
	            parameter.Value = model.f_xkjzlx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_port != null)
            {
	            strSql1.Append("f_port,");
	            strSql2.Append("'" + (model.f_port) + "',");
	            strSql3.Append(":f_port,");
	            parameter = new OracleParameter(":f_port", OracleType.VarChar);
	            parameter.Value = model.f_port;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dkkh != null)
            {
	            strSql1.Append("f_dkkh,");
	            strSql2.Append("'" + (model.f_dkkh) + "',");
	            strSql3.Append(":f_dkkh,");
	            parameter = new OracleParameter(":f_dkkh", OracleType.VarChar);
	            parameter.Value = model.f_dkkh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dkbcgsl != null)
            {
	            strSql1.Append("f_dkbcgsl,");
	            strSql2.Append("'" + (model.f_dkbcgsl) + "',");
	            strSql3.Append(":f_dkbcgsl,");
	            parameter = new OracleParameter(":f_dkbcgsl", OracleType.VarChar);
	            parameter.Value = model.f_dkbcgsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dkgscs != null)
            {
	            strSql1.Append("f_dkgscs,");
	            strSql2.Append("'" + (model.f_dkgscs) + "',");
	            strSql3.Append(":f_dkgscs,");
	            parameter = new OracleParameter(":f_dkgscs", OracleType.VarChar);
	            parameter.Value = model.f_dkgscs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dkljgl != null)
            {
	            strSql1.Append("f_dkljgl,");
	            strSql2.Append("'" + (model.f_dkljgl) + "',");
	            strSql3.Append(":f_dkljgl,");
	            parameter = new OracleParameter(":f_dkljgl", OracleType.VarChar);
	            parameter.Value = model.f_dkljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dkjzlx != null)
            {
	            strSql1.Append("f_dkjzlx,");
	            strSql2.Append("'" + (model.f_dkjzlx) + "',");
	            strSql3.Append(":f_dkjzlx,");
	            parameter = new OracleParameter(":f_dkjzlx", OracleType.VarChar);
	            parameter.Value = model.f_dkjzlx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_dksbzt != null)
            {
	            strSql1.Append("f_dksbzt,");
	            strSql2.Append("'" + (model.f_dksbzt) + "',");
	            strSql3.Append(":f_dksbzt,");
	            parameter = new OracleParameter(":f_dksbzt", OracleType.VarChar);
	            parameter.Value = model.f_dksbzt;
	            parameterList.Add(parameter);
            }

            if (model.f_bssl != null)
            {
                strSql1.Append("f_bssl,");
                strSql2.Append("'" + (model.f_bssl) + "',");
                strSql3.Append(":f_bssl,");
                parameter = new OracleParameter(":f_bssl", OracleType.VarChar);
                parameter.Value = model.f_bssl;
                parameterList.Add(parameter);
            }
            if (model.f_hbyy != null)
            {
                strSql1.Append("f_hbyy,");
                strSql2.Append("'" + (model.f_hbyy) + "',");
                strSql3.Append(":f_hbyy,");
                parameter = new OracleParameter(":f_hbyy", OracleType.VarChar);
                parameter.Value = model.f_hbyy;
                parameterList.Add(parameter);
            }
            strSql.Append("insert into tbl_ld_ichbbk(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_ichbbk(");
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
	                string updateSqlString = " update tbl_ld_ichbbk set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_ichbbk> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ichbbk model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_ichbbk model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_ichbbk set ");
            strSql_use.Append("update tbl_ld_ichbbk set ");
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
            
	            if (model.f_hbbh != null&& columsList.Contains("f_hbbh"))
            {
                strSql.Append("f_hbbh='" + (model.f_hbbh) + "',");
                strSql_use.Append("f_hbbh=:f_hbbh,");
                parameter = new OracleParameter(":f_hbbh", OracleType.VarChar);
                parameter.Value = model.f_hbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sjbh != null&& columsList.Contains("f_sjbh"))
            {
                strSql.Append("f_sjbh='" + (model.f_sjbh) + "',");
                strSql_use.Append("f_sjbh=:f_sjbh,");
                parameter = new OracleParameter(":f_sjbh", OracleType.VarChar);
                parameter.Value = model.f_sjbh;
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
            
	            if (model.f_lxth != null&& columsList.Contains("f_lxth"))
            {
                strSql.Append("f_lxth='" + (model.f_lxth) + "',");
                strSql_use.Append("f_lxth=:f_lxth,");
                parameter = new OracleParameter(":f_lxth", OracleType.VarChar);
                parameter.Value = model.f_lxth;
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
            
	            if (model.f_xunkr != null&& columsList.Contains("f_xunkr"))
            {
                strSql.Append("f_xunkr='" + (model.f_xunkr) + "',");
                strSql_use.Append("f_xunkr=:f_xunkr,");
                parameter = new OracleParameter(":f_xunkr", OracleType.VarChar);
                parameter.Value = model.f_xunkr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xiekrid != null&& columsList.Contains("f_xiekrid"))
            {
                strSql.Append("f_xiekrid='" + (model.f_xiekrid) + "',");
                strSql_use.Append("f_xiekrid=:f_xiekrid,");
                parameter = new OracleParameter(":f_xiekrid", OracleType.VarChar);
                parameter.Value = model.f_xiekrid;
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
            
	            if (model.f_dy != null&& columsList.Contains("f_dy"))
            {
                strSql.Append("f_dy='" + (model.f_dy) + "',");
                strSql_use.Append("f_dy=:f_dy,");
                parameter = new OracleParameter(":f_dy", OracleType.VarChar);
                parameter.Value = model.f_dy;
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
            
	            if (model.f_xunkrid != null&& columsList.Contains("f_xunkrid"))
            {
                strSql.Append("f_xunkrid='" + (model.f_xunkrid) + "',");
                strSql_use.Append("f_xunkrid=:f_xunkrid,");
                parameter = new OracleParameter(":f_xunkrid", OracleType.VarChar);
                parameter.Value = model.f_xunkrid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xiekrq != null&& columsList.Contains("f_xiekrq"))
            {
                strSql.Append("f_xiekrq='" + (model.f_xiekrq) + "',");
                strSql_use.Append("f_xiekrq=:f_xiekrq,");
                parameter = new OracleParameter(":f_xiekrq", OracleType.VarChar);
                parameter.Value = model.f_xiekrq;
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
            
	            if (model.f_dyid != null&& columsList.Contains("f_dyid"))
            {
                strSql.Append("f_dyid='" + (model.f_dyid) + "',");
                strSql_use.Append("f_dyid=:f_dyid,");
                parameter = new OracleParameter(":f_dyid", OracleType.VarChar);
                parameter.Value = model.f_dyid;
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
            
	            if (model.f_xunkrq != null&& columsList.Contains("f_xunkrq"))
            {
                strSql.Append("f_xunkrq='" + (model.f_xunkrq) + "',");
                strSql_use.Append("f_xunkrq=:f_xunkrq,");
                parameter = new OracleParameter(":f_xunkrq", OracleType.VarChar);
                parameter.Value = model.f_xunkrq;
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
            
	            if (model.f_yhbhid != null&& columsList.Contains("f_yhbhid"))
            {
                strSql.Append("f_yhbhid='" + (model.f_yhbhid) + "',");
                strSql_use.Append("f_yhbhid=:f_yhbhid,");
                parameter = new OracleParameter(":f_yhbhid", OracleType.VarChar);
                parameter.Value = model.f_yhbhid;
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
            
	            if (model.f_pq != null&& columsList.Contains("f_pq"))
            {
                strSql.Append("f_pq='" + (model.f_pq) + "',");
                strSql_use.Append("f_pq=:f_pq,");
                parameter = new OracleParameter(":f_pq", OracleType.VarChar);
                parameter.Value = model.f_pq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xiekr != null&& columsList.Contains("f_xiekr"))
            {
                strSql.Append("f_xiekr='" + (model.f_xiekr) + "',");
                strSql_use.Append("f_xiekr=:f_xiekr,");
                parameter = new OracleParameter(":f_xiekr", OracleType.VarChar);
                parameter.Value = model.f_xiekr;
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
            
	            if (model.f_khrq != null&& columsList.Contains("f_khrq"))
            {
                strSql.Append("f_khrq=to_date('" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_khrq=:f_khrq,");
                parameter = new OracleParameter(":f_khrq", OracleType.DateTime);
                parameter.Value = model.f_khrq;
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
            
	            if (model.f_pqid != null&& columsList.Contains("f_pqid"))
            {
                strSql.Append("f_pqid='" + (model.f_pqid) + "',");
                strSql_use.Append("f_pqid=:f_pqid,");
                parameter = new OracleParameter(":f_pqid", OracleType.VarChar);
                parameter.Value = model.f_pqid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sbbh != null&& columsList.Contains("f_o_sbbh"))
            {
                strSql.Append("f_o_sbbh='" + (model.f_o_sbbh) + "',");
                strSql_use.Append("f_o_sbbh=:f_o_sbbh,");
                parameter = new OracleParameter(":f_o_sbbh", OracleType.VarChar);
                parameter.Value = model.f_o_sbbh;
                parameterList.Add(parameter);
            }

            if (model.f_o_sbbhid != null && columsList.Contains("f_o_sbbhid"))
            {
                strSql.Append("f_o_sbbhid='" + (model.f_o_sbbhid) + "',");
                strSql_use.Append("f_o_sbbhid=:f_o_sbbhid,");
                parameter = new OracleParameter(":f_o_sbbhid", OracleType.VarChar);
                parameter.Value = model.f_o_sbbhid;
                parameterList.Add(parameter);
            }

            if (model.f_o_sbfzid != null&& columsList.Contains("f_o_sbfzid"))
            {
                strSql.Append("f_o_sbfzid='" + (model.f_o_sbfzid) + "',");
                strSql_use.Append("f_o_sbfzid=:f_o_sbfzid,");
                parameter = new OracleParameter(":f_o_sbfzid", OracleType.VarChar);
                parameter.Value = model.f_o_sbfzid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_khbh != null&& columsList.Contains("f_o_khbh"))
            {
                strSql.Append("f_o_khbh='" + (model.f_o_khbh) + "',");
                strSql_use.Append("f_o_khbh=:f_o_khbh,");
                parameter = new OracleParameter(":f_o_khbh", OracleType.VarChar);
                parameter.Value = model.f_o_khbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sblx != null&& columsList.Contains("f_o_sblx"))
            {
                strSql.Append("f_o_sblx='" + (model.f_o_sblx) + "',");
                strSql_use.Append("f_o_sblx=:f_o_sblx,");
                parameter = new OracleParameter(":f_o_sblx", OracleType.VarChar);
                parameter.Value = model.f_o_sblx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_cszm != null&& columsList.Contains("f_o_cszm"))
            {
                strSql.Append("f_o_cszm='" + (model.f_o_cszm) + "',");
                strSql_use.Append("f_o_cszm=:f_o_cszm,");
                parameter = new OracleParameter(":f_o_cszm", OracleType.VarChar);
                parameter.Value = model.f_o_cszm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_ljgl != null&& columsList.Contains("f_o_ljgl"))
            {
                strSql.Append("f_o_ljgl='" + (model.f_o_ljgl) + "',");
                strSql_use.Append("f_o_ljgl=:f_o_ljgl,");
                parameter = new OracleParameter(":f_o_ljgl", OracleType.VarChar);
                parameter.Value = model.f_o_ljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_jsbh != null&& columsList.Contains("f_o_jsbh"))
            {
                strSql.Append("f_o_jsbh='" + (model.f_o_jsbh) + "',");
                strSql_use.Append("f_o_jsbh=:f_o_jsbh,");
                parameter = new OracleParameter(":f_o_jsbh", OracleType.VarChar);
                parameter.Value = model.f_o_jsbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sbpp != null&& columsList.Contains("f_o_sbpp"))
            {
                strSql.Append("f_o_sbpp='" + (model.f_o_sbpp) + "',");
                strSql_use.Append("f_o_sbpp=:f_o_sbpp,");
                parameter = new OracleParameter(":f_o_sbpp", OracleType.VarChar);
                parameter.Value = model.f_o_sbpp;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_rs != null&& columsList.Contains("f_o_rs"))
            {
                strSql.Append("f_o_rs='" + (model.f_o_rs) + "',");
                strSql_use.Append("f_o_rs=:f_o_rs,");
                parameter = new OracleParameter(":f_o_rs", OracleType.VarChar);
                parameter.Value = model.f_o_rs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sblxid != null&& columsList.Contains("f_o_sblxid"))
            {
                strSql.Append("f_o_sblxid='" + (model.f_o_sblxid) + "',");
                strSql_use.Append("f_o_sblxid=:f_o_sblxid,");
                parameter = new OracleParameter(":f_o_sblxid", OracleType.VarChar);
                parameter.Value = model.f_o_sblxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_bqzm != null&& columsList.Contains("f_o_bqzm"))
            {
                strSql.Append("f_o_bqzm='" + (model.f_o_bqzm) + "',");
                strSql_use.Append("f_o_bqzm=:f_o_bqzm,");
                parameter = new OracleParameter(":f_o_bqzm", OracleType.VarChar);
                parameter.Value = model.f_o_bqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_qsqpjsl != null&& columsList.Contains("f_o_qsqpjsl"))
            {
                strSql.Append("f_o_qsqpjsl='" + (model.f_o_qsqpjsl) + "',");
                strSql_use.Append("f_o_qsqpjsl=:f_o_qsqpjsl,");
                parameter = new OracleParameter(":f_o_qsqpjsl", OracleType.VarChar);
                parameter.Value = model.f_o_qsqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_lxth != null&& columsList.Contains("f_o_lxth"))
            {
                strSql.Append("f_o_lxth='" + (model.f_o_lxth) + "',");
                strSql_use.Append("f_o_lxth=:f_o_lxth,");
                parameter = new OracleParameter(":f_o_lxth", OracleType.VarChar);
                parameter.Value = model.f_o_lxth;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_mph != null&& columsList.Contains("f_o_mph"))
            {
                strSql.Append("f_o_mph='" + (model.f_o_mph) + "',");
                strSql_use.Append("f_o_mph=:f_o_mph,");
                parameter = new OracleParameter(":f_o_mph", OracleType.VarChar);
                parameter.Value = model.f_o_mph;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sbkj != null&& columsList.Contains("f_o_sbkj"))
            {
                strSql.Append("f_o_sbkj='" + (model.f_o_sbkj) + "',");
                strSql_use.Append("f_o_sbkj=:f_o_sbkj,");
                parameter = new OracleParameter(":f_o_sbkj", OracleType.VarChar);
                parameter.Value = model.f_o_sbkj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_jllx != null&& columsList.Contains("f_o_jllx"))
            {
                strSql.Append("f_o_jllx='" + (model.f_o_jllx) + "',");
                strSql_use.Append("f_o_jllx=:f_o_jllx,");
                parameter = new OracleParameter(":f_o_jllx", OracleType.VarChar);
                parameter.Value = model.f_o_jllx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sqzm != null&& columsList.Contains("f_o_sqzm"))
            {
                strSql.Append("f_o_sqzm='" + (model.f_o_sqzm) + "',");
                strSql_use.Append("f_o_sqzm=:f_o_sqzm,");
                parameter = new OracleParameter(":f_o_sqzm", OracleType.VarChar);
                parameter.Value = model.f_o_sqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_qlqpjsl != null&& columsList.Contains("f_o_qlqpjsl"))
            {
                strSql.Append("f_o_qlqpjsl='" + (model.f_o_qlqpjsl) + "',");
                strSql_use.Append("f_o_qlqpjsl=:f_o_qlqpjsl,");
                parameter = new OracleParameter(":f_o_qlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_o_qlqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sbfz != null&& columsList.Contains("f_o_sbfz"))
            {
                strSql.Append("f_o_sbfz='" + (model.f_o_sbfz) + "',");
                strSql_use.Append("f_o_sbfz=:f_o_sbfz,");
                parameter = new OracleParameter(":f_o_sbfz", OracleType.VarChar);
                parameter.Value = model.f_o_sbfz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sbdz != null&& columsList.Contains("f_o_sbdz"))
            {
                strSql.Append("f_o_sbdz='" + (model.f_o_sbdz) + "',");
                strSql_use.Append("f_o_sbdz=:f_o_sbdz,");
                parameter = new OracleParameter(":f_o_sbdz", OracleType.VarChar);
                parameter.Value = model.f_o_sbdz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sbkjid != null&& columsList.Contains("f_o_sbkjid"))
            {
                strSql.Append("f_o_sbkjid='" + (model.f_o_sbkjid) + "',");
                strSql_use.Append("f_o_sbkjid=:f_o_sbkjid,");
                parameter = new OracleParameter(":f_o_sbkjid", OracleType.VarChar);
                parameter.Value = model.f_o_sbkjid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_jllxid != null&& columsList.Contains("f_o_jllxid"))
            {
                strSql.Append("f_o_jllxid='" + (model.f_o_jllxid) + "',");
                strSql_use.Append("f_o_jllxid=:f_o_jllxid,");
                parameter = new OracleParameter(":f_o_jllxid", OracleType.VarChar);
                parameter.Value = model.f_o_jllxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_sqsl != null&& columsList.Contains("f_o_sqsl"))
            {
                strSql.Append("f_o_sqsl='" + (model.f_o_sqsl) + "',");
                strSql_use.Append("f_o_sqsl=:f_o_sqsl,");
                parameter = new OracleParameter(":f_o_sqsl", OracleType.VarChar);
                parameter.Value = model.f_o_sqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_o_bqsl != null&& columsList.Contains("f_o_bqsl"))
            {
                strSql.Append("f_o_bqsl='" + (model.f_o_bqsl) + "',");
                strSql_use.Append("f_o_bqsl=:f_o_bqsl,");
                parameter = new OracleParameter(":f_o_bqsl", OracleType.VarChar);
                parameter.Value = model.f_o_bqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbbh != null&& columsList.Contains("f_n_sbbh"))
            {
                strSql.Append("f_n_sbbh='" + (model.f_n_sbbh) + "',");
                strSql_use.Append("f_n_sbbh=:f_n_sbbh,");
                parameter = new OracleParameter(":f_n_sbbh", OracleType.VarChar);
                parameter.Value = model.f_n_sbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbfz != null&& columsList.Contains("f_n_sbfz"))
            {
                strSql.Append("f_n_sbfz='" + (model.f_n_sbfz) + "',");
                strSql_use.Append("f_n_sbfz=:f_n_sbfz,");
                parameter = new OracleParameter(":f_n_sbfz", OracleType.VarChar);
                parameter.Value = model.f_n_sbfz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbfzid != null&& columsList.Contains("f_n_sbfzid"))
            {
                strSql.Append("f_n_sbfzid='" + (model.f_n_sbfzid) + "',");
                strSql_use.Append("f_n_sbfzid=:f_n_sbfzid,");
                parameter = new OracleParameter(":f_n_sbfzid", OracleType.VarChar);
                parameter.Value = model.f_n_sbfzid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbpp != null&& columsList.Contains("f_n_sbpp"))
            {
                strSql.Append("f_n_sbpp='" + (model.f_n_sbpp) + "',");
                strSql_use.Append("f_n_sbpp=:f_n_sbpp,");
                parameter = new OracleParameter(":f_n_sbpp", OracleType.VarChar);
                parameter.Value = model.f_n_sbpp;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_mph != null&& columsList.Contains("f_n_mph"))
            {
                strSql.Append("f_n_mph='" + (model.f_n_mph) + "',");
                strSql_use.Append("f_n_mph=:f_n_mph,");
                parameter = new OracleParameter(":f_n_mph", OracleType.VarChar);
                parameter.Value = model.f_n_mph;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_rs != null&& columsList.Contains("f_n_rs"))
            {
                strSql.Append("f_n_rs='" + (model.f_n_rs) + "',");
                strSql_use.Append("f_n_rs=:f_n_rs,");
                parameter = new OracleParameter(":f_n_rs", OracleType.VarChar);
                parameter.Value = model.f_n_rs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbkj != null&& columsList.Contains("f_n_sbkj"))
            {
                strSql.Append("f_n_sbkj='" + (model.f_n_sbkj) + "',");
                strSql_use.Append("f_n_sbkj=:f_n_sbkj,");
                parameter = new OracleParameter(":f_n_sbkj", OracleType.VarChar);
                parameter.Value = model.f_n_sbkj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbkjid != null&& columsList.Contains("f_n_sbkjid"))
            {
                strSql.Append("f_n_sbkjid='" + (model.f_n_sbkjid) + "',");
                strSql_use.Append("f_n_sbkjid=:f_n_sbkjid,");
                parameter = new OracleParameter(":f_n_sbkjid", OracleType.VarChar);
                parameter.Value = model.f_n_sbkjid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_jsbh != null&& columsList.Contains("f_n_jsbh"))
            {
                strSql.Append("f_n_jsbh='" + (model.f_n_jsbh) + "',");
                strSql_use.Append("f_n_jsbh=:f_n_jsbh,");
                parameter = new OracleParameter(":f_n_jsbh", OracleType.VarChar);
                parameter.Value = model.f_n_jsbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_lxth != null&& columsList.Contains("f_n_lxth"))
            {
                strSql.Append("f_n_lxth='" + (model.f_n_lxth) + "',");
                strSql_use.Append("f_n_lxth=:f_n_lxth,");
                parameter = new OracleParameter(":f_n_lxth", OracleType.VarChar);
                parameter.Value = model.f_n_lxth;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_khbh != null&& columsList.Contains("f_n_khbh"))
            {
                strSql.Append("f_n_khbh='" + (model.f_n_khbh) + "',");
                strSql_use.Append("f_n_khbh=:f_n_khbh,");
                parameter = new OracleParameter(":f_n_khbh", OracleType.VarChar);
                parameter.Value = model.f_n_khbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sblx != null&& columsList.Contains("f_n_sblx"))
            {
                strSql.Append("f_n_sblx='" + (model.f_n_sblx) + "',");
                strSql_use.Append("f_n_sblx=:f_n_sblx,");
                parameter = new OracleParameter(":f_n_sblx", OracleType.VarChar);
                parameter.Value = model.f_n_sblx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sblxid != null&& columsList.Contains("f_n_sblxid"))
            {
                strSql.Append("f_n_sblxid='" + (model.f_n_sblxid) + "',");
                strSql_use.Append("f_n_sblxid=:f_n_sblxid,");
                parameter = new OracleParameter(":f_n_sblxid", OracleType.VarChar);
                parameter.Value = model.f_n_sblxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_jllx != null&& columsList.Contains("f_n_jllx"))
            {
                strSql.Append("f_n_jllx='" + (model.f_n_jllx) + "',");
                strSql_use.Append("f_n_jllx=:f_n_jllx,");
                parameter = new OracleParameter(":f_n_jllx", OracleType.VarChar);
                parameter.Value = model.f_n_jllx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_jllxid != null&& columsList.Contains("f_n_jllxid"))
            {
                strSql.Append("f_n_jllxid='" + (model.f_n_jllxid) + "',");
                strSql_use.Append("f_n_jllxid=:f_n_jllxid,");
                parameter = new OracleParameter(":f_n_jllxid", OracleType.VarChar);
                parameter.Value = model.f_n_jllxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_ljgl != null&& columsList.Contains("f_n_ljgl"))
            {
                strSql.Append("f_n_ljgl='" + (model.f_n_ljgl) + "',");
                strSql_use.Append("f_n_ljgl=:f_n_ljgl,");
                parameter = new OracleParameter(":f_n_ljgl", OracleType.VarChar);
                parameter.Value = model.f_n_ljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_cqzm != null&& columsList.Contains("f_n_cqzm"))
            {
                strSql.Append("f_n_cqzm='" + (model.f_n_cqzm) + "',");
                strSql_use.Append("f_n_cqzm=:f_n_cqzm,");
                parameter = new OracleParameter(":f_n_cqzm", OracleType.VarChar);
                parameter.Value = model.f_n_cqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sqzm != null&& columsList.Contains("f_n_sqzm"))
            {
                strSql.Append("f_n_sqzm='" + (model.f_n_sqzm) + "',");
                strSql_use.Append("f_n_sqzm=:f_n_sqzm,");
                parameter = new OracleParameter(":f_n_sqzm", OracleType.VarChar);
                parameter.Value = model.f_n_sqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_bqzm != null&& columsList.Contains("f_n_bqzm"))
            {
                strSql.Append("f_n_bqzm='" + (model.f_n_bqzm) + "',");
                strSql_use.Append("f_n_bqzm=:f_n_bqzm,");
                parameter = new OracleParameter(":f_n_bqzm", OracleType.VarChar);
                parameter.Value = model.f_n_bqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_bqsl != null&& columsList.Contains("f_n_bqsl"))
            {
                strSql.Append("f_n_bqsl='" + (model.f_n_bqsl) + "',");
                strSql_use.Append("f_n_bqsl=:f_n_bqsl,");
                parameter = new OracleParameter(":f_n_bqsl", OracleType.VarChar);
                parameter.Value = model.f_n_bqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_qsqpjsl != null&& columsList.Contains("f_n_qsqpjsl"))
            {
                strSql.Append("f_n_qsqpjsl='" + (model.f_n_qsqpjsl) + "',");
                strSql_use.Append("f_n_qsqpjsl=:f_n_qsqpjsl,");
                parameter = new OracleParameter(":f_n_qsqpjsl", OracleType.VarChar);
                parameter.Value = model.f_n_qsqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_qlqpjsl != null&& columsList.Contains("f_n_qlqpjsl"))
            {
                strSql.Append("f_n_qlqpjsl='" + (model.f_n_qlqpjsl) + "',");
                strSql_use.Append("f_n_qlqpjsl=:f_n_qlqpjsl,");
                parameter = new OracleParameter(":f_n_qlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_n_qlqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sqsl != null&& columsList.Contains("f_n_sqsl"))
            {
                strSql.Append("f_n_sqsl='" + (model.f_n_sqsl) + "',");
                strSql_use.Append("f_n_sqsl=:f_n_sqsl,");
                parameter = new OracleParameter(":f_n_sqsl", OracleType.VarChar);
                parameter.Value = model.f_n_sqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_n_sbdz != null&& columsList.Contains("f_n_sbdz"))
            {
                strSql.Append("f_n_sbdz='" + (model.f_n_sbdz) + "',");
                strSql_use.Append("f_n_sbdz=:f_n_sbdz,");
                parameter = new OracleParameter(":f_n_sbdz", OracleType.VarChar);
                parameter.Value = model.f_n_sbdz;
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
            
	            if (model.f_o_sbds != null&& columsList.Contains("f_o_sbds"))
            {
                strSql.Append("f_o_sbds='" + (model.f_o_sbds) + "',");
                strSql_use.Append("f_o_sbds=:f_o_sbds,");
                parameter = new OracleParameter(":f_o_sbds", OracleType.VarChar);
                parameter.Value = model.f_o_sbds;
                parameterList.Add(parameter);
            }
            
	            if (model.f_gslb != null&& columsList.Contains("f_gslb"))
            {
                strSql.Append("f_gslb='" + (model.f_gslb) + "',");
                strSql_use.Append("f_gslb=:f_gslb,");
                parameter = new OracleParameter(":f_gslb", OracleType.VarChar);
                parameter.Value = model.f_gslb;
                parameterList.Add(parameter);
            }
            
	            if (model.f_gslbid != null&& columsList.Contains("f_gslbid"))
            {
                strSql.Append("f_gslbid='" + (model.f_gslbid) + "',");
                strSql_use.Append("f_gslbid=:f_gslbid,");
                parameter = new OracleParameter(":f_gslbid", OracleType.VarChar);
                parameter.Value = model.f_gslbid;
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
            
	            if (model.f_xklx != null&& columsList.Contains("f_xklx"))
            {
                strSql.Append("f_xklx='" + (model.f_xklx) + "',");
                strSql_use.Append("f_xklx=:f_xklx,");
                parameter = new OracleParameter(":f_xklx", OracleType.VarChar);
                parameter.Value = model.f_xklx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkkh != null&& columsList.Contains("f_xkkh"))
            {
                strSql.Append("f_xkkh='" + (model.f_xkkh) + "',");
                strSql_use.Append("f_xkkh=:f_xkkh,");
                parameter = new OracleParameter(":f_xkkh", OracleType.VarChar);
                parameter.Value = model.f_xkkh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkgscs != null&& columsList.Contains("f_xkgscs"))
            {
                strSql.Append("f_xkgscs='" + (model.f_xkgscs) + "',");
                strSql_use.Append("f_xkgscs=:f_xkgscs,");
                parameter = new OracleParameter(":f_xkgscs", OracleType.VarChar);
                parameter.Value = model.f_xkgscs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkbcgsl != null&& columsList.Contains("f_xkbcgsl"))
            {
                strSql.Append("f_xkbcgsl='" + (model.f_xkbcgsl) + "',");
                strSql_use.Append("f_xkbcgsl=:f_xkbcgsl,");
                parameter = new OracleParameter(":f_xkbcgsl", OracleType.VarChar);
                parameter.Value = model.f_xkbcgsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkms != null&& columsList.Contains("f_xkms"))
            {
                strSql.Append("f_xkms='" + (model.f_xkms) + "',");
                strSql_use.Append("f_xkms=:f_xkms,");
                parameter = new OracleParameter(":f_xkms", OracleType.VarChar);
                parameter.Value = model.f_xkms;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkmsid != null&& columsList.Contains("f_xkmsid"))
            {
                strSql.Append("f_xkmsid='" + (model.f_xkmsid) + "',");
                strSql_use.Append("f_xkmsid=:f_xkmsid,");
                parameter = new OracleParameter(":f_xkmsid", OracleType.VarChar);
                parameter.Value = model.f_xkmsid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkljgl != null&& columsList.Contains("f_xkljgl"))
            {
                strSql.Append("f_xkljgl='" + (model.f_xkljgl) + "',");
                strSql_use.Append("f_xkljgl=:f_xkljgl,");
                parameter = new OracleParameter(":f_xkljgl", OracleType.VarChar);
                parameter.Value = model.f_xkljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xkjzlx != null&& columsList.Contains("f_xkjzlx"))
            {
                strSql.Append("f_xkjzlx='" + (model.f_xkjzlx) + "',");
                strSql_use.Append("f_xkjzlx=:f_xkjzlx,");
                parameter = new OracleParameter(":f_xkjzlx", OracleType.VarChar);
                parameter.Value = model.f_xkjzlx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_port != null&& columsList.Contains("f_port"))
            {
                strSql.Append("f_port='" + (model.f_port) + "',");
                strSql_use.Append("f_port=:f_port,");
                parameter = new OracleParameter(":f_port", OracleType.VarChar);
                parameter.Value = model.f_port;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dkkh != null&& columsList.Contains("f_dkkh"))
            {
                strSql.Append("f_dkkh='" + (model.f_dkkh) + "',");
                strSql_use.Append("f_dkkh=:f_dkkh,");
                parameter = new OracleParameter(":f_dkkh", OracleType.VarChar);
                parameter.Value = model.f_dkkh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dkbcgsl != null&& columsList.Contains("f_dkbcgsl"))
            {
                strSql.Append("f_dkbcgsl='" + (model.f_dkbcgsl) + "',");
                strSql_use.Append("f_dkbcgsl=:f_dkbcgsl,");
                parameter = new OracleParameter(":f_dkbcgsl", OracleType.VarChar);
                parameter.Value = model.f_dkbcgsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dkgscs != null&& columsList.Contains("f_dkgscs"))
            {
                strSql.Append("f_dkgscs='" + (model.f_dkgscs) + "',");
                strSql_use.Append("f_dkgscs=:f_dkgscs,");
                parameter = new OracleParameter(":f_dkgscs", OracleType.VarChar);
                parameter.Value = model.f_dkgscs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dkljgl != null&& columsList.Contains("f_dkljgl"))
            {
                strSql.Append("f_dkljgl='" + (model.f_dkljgl) + "',");
                strSql_use.Append("f_dkljgl=:f_dkljgl,");
                parameter = new OracleParameter(":f_dkljgl", OracleType.VarChar);
                parameter.Value = model.f_dkljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dkjzlx != null&& columsList.Contains("f_dkjzlx"))
            {
                strSql.Append("f_dkjzlx='" + (model.f_dkjzlx) + "',");
                strSql_use.Append("f_dkjzlx=:f_dkjzlx,");
                parameter = new OracleParameter(":f_dkjzlx", OracleType.VarChar);
                parameter.Value = model.f_dkjzlx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_dksbzt != null&& columsList.Contains("f_dksbzt"))
            {
                strSql.Append("f_dksbzt='" + (model.f_dksbzt) + "',");
                strSql_use.Append("f_dksbzt=:f_dksbzt,");
                parameter = new OracleParameter(":f_dksbzt", OracleType.VarChar);
                parameter.Value = model.f_dksbzt;
                parameterList.Add(parameter);
            }

            if (model.f_bssl != null && columsList.Contains("f_bssl"))
            {
                strSql.Append("f_bssl='" + (model.f_bssl) + "',");
                strSql_use.Append("f_bssl=:f_bssl,");
                parameter = new OracleParameter(":f_bssl", OracleType.VarChar);
                parameter.Value = model.f_bssl;
                parameterList.Add(parameter);
            }
            if (model.f_hbyy != null && columsList.Contains("f_hbyy"))
            {
                strSql.Append("f_hbyy='" + (model.f_hbyy) + "',");
                strSql_use.Append("f_hbyy=:f_hbyy,");
                parameter = new OracleParameter(":f_hbyy", OracleType.VarChar);
                parameter.Value = model.f_hbyy;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_ichbbk> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ichbbk model in modelList)
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
            strSql.Append("delete tbl_ld_ichbbk where  ");
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
            strSql.Append("update tbl_ld_ichbbk set ");
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
            strSql.Append("select count(*) from tbl_ld_ichbbk");
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
        public List<sara.dd.ldsw.model.tbl_ld_ichbbk> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_ichbbk t where");
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

            List<sara.dd.ldsw.model.tbl_ld_ichbbk> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_ichbbk>(resultDataTable);
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
            strSql.Append(" select * from tbl_ld_ichbbk t where");
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
            strSql.Append(" select * from tbl_ld_ichbbk t where");
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
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ichbbk')";
            sqlString += " where f_tablename  = 'tbl_ld_ichbbk'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ichbbk'";


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
















