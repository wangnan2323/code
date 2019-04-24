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
    /// 数据访问类tbl_ld_ickss 
    /// </summary>
    public class tbl_ld_ickss : sara.dd.ldsw.idal.Itbl_ld_ickss
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_ickss()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_ickss model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_yhbh != null)
            {
	            strSql1.Append("f_yhbh,");
	            strSql2.Append("'" + (model.f_yhbh) + "',");
	            strSql3.Append(":f_yhbh,");
	            parameter = new OracleParameter(":f_yhbh", OracleType.VarChar);
	            parameter.Value = model.f_yhbh;
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
            
            if (model.f_sblx != null)
            {
	            strSql1.Append("f_sblx,");
	            strSql2.Append("'" + (model.f_sblx) + "',");
	            strSql3.Append(":f_sblx,");
	            parameter = new OracleParameter(":f_sblx", OracleType.VarChar);
	            parameter.Value = model.f_sblx;
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

            if (model.f_yhbhid != null)
            {
	            strSql1.Append("f_yhbhid,");
	            strSql2.Append("'" + (model.f_yhbhid) + "',");
	            strSql3.Append(":f_yhbhid,");
	            parameter = new OracleParameter(":f_yhbhid", OracleType.VarChar);
	            parameter.Value = model.f_yhbhid;
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
            
            if (model.f_sblxid != null)
            {
	            strSql1.Append("f_sblxid,");
	            strSql2.Append("'" + (model.f_sblxid) + "',");
	            strSql3.Append(":f_sblxid,");
	            parameter = new OracleParameter(":f_sblxid", OracleType.VarChar);
	            parameter.Value = model.f_sblxid;
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
            
            if (model.f_khrq != null)
            {
	            strSql1.Append("f_khrq,");
	            strSql2.Append("to_date('" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_khrq,");
	            parameter = new OracleParameter(":f_khrq", OracleType.DateTime);
	            parameter.Value = model.f_khrq;
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
            
            if (model.f_yhm != null)
            {
	            strSql1.Append("f_yhm,");
	            strSql2.Append("'" + (model.f_yhm) + "',");
	            strSql3.Append(":f_yhm,");
	            parameter = new OracleParameter(":f_yhm", OracleType.VarChar);
	            parameter.Value = model.f_yhm;
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
            
            if (model.f_sbbh != null)
            {
	            strSql1.Append("f_sbbh,");
	            strSql2.Append("'" + (model.f_sbbh) + "',");
	            strSql3.Append(":f_sbbh,");
	            parameter = new OracleParameter(":f_sbbh", OracleType.VarChar);
	            parameter.Value = model.f_sbbh;
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
            
            if (model.f_jfm != null)
            {
	            strSql1.Append("f_jfm,");
	            strSql2.Append("'" + (model.f_jfm) + "',");
	            strSql3.Append(":f_jfm,");
	            parameter = new OracleParameter(":f_jfm", OracleType.VarChar);
	            parameter.Value = model.f_jfm;
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
            
            if (model.f_sbbhid != null)
            {
	            strSql1.Append("f_sbbhid,");
	            strSql2.Append("'" + (model.f_sbbhid) + "',");
	            strSql3.Append(":f_sbbhid,");
	            parameter = new OracleParameter(":f_sbbhid", OracleType.VarChar);
	            parameter.Value = model.f_sbbhid;
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
            
            if (model.f_sf != null)
            {
	            strSql1.Append("f_sf,");
	            strSql2.Append("'" + (model.f_sf) + "',");
	            strSql3.Append(":f_sf,");
	            parameter = new OracleParameter(":f_sf", OracleType.VarChar);
	            parameter.Value = model.f_sf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sl != null)
            {
	            strSql1.Append("f_sl,");
	            strSql2.Append("'" + (model.f_sl) + "',");
	            strSql3.Append(":f_sl,");
	            parameter = new OracleParameter(":f_sl", OracleType.VarChar);
	            parameter.Value = model.f_sl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfdh != null)
            {
	            strSql1.Append("f_jfdh,");
	            strSql2.Append("'" + (model.f_jfdh) + "',");
	            strSql3.Append(":f_jfdh,");
	            parameter = new OracleParameter(":f_jfdh", OracleType.VarChar);
	            parameter.Value = model.f_jfdh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfje != null)
            {
	            strSql1.Append("f_jfje,");
	            strSql2.Append("'" + (model.f_jfje) + "',");
	            strSql3.Append(":f_jfje,");
	            parameter = new OracleParameter(":f_jfje", OracleType.VarChar);
	            parameter.Value = model.f_jfje;
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
            //寻卡人
            if (model.f_xkr != null)
            {
                strSql1.Append("f_xkr,");
                strSql2.Append("'" + (model.f_xkr) + "',");
                strSql3.Append(":f_xkr,");
                parameter = new OracleParameter(":f_xkr", OracleType.VarChar);
                parameter.Value = model.f_xkr;
                parameterList.Add(parameter);
            }

            //寻卡人id
            if (model.f_xkrid != null)
            {
                strSql1.Append("f_xkrid,");
                strSql2.Append("'" + (model.f_xkrid) + "',");
                strSql3.Append(":f_xkrid,");
                parameter = new OracleParameter(":f_xkrid", OracleType.VarChar);
                parameter.Value = model.f_xkrid;
                parameterList.Add(parameter);
            }

            //寻卡日期
            if (model.f_xkrq != null)
            {
                strSql1.Append("f_xkrq,");
                strSql2.Append("to_date('" + model.f_xkrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql3.Append(":f_xkrq,");
                parameter = new OracleParameter(":f_xkrq", OracleType.DateTime);
                parameter.Value = model.f_xkrq;
                parameterList.Add(parameter);
            }

            //写卡人
            if (model.f_xiekr != null)
            {
                strSql1.Append("f_xiekr,");
                strSql2.Append("'" + (model.f_xiekr) + "',");
                strSql3.Append(":f_xiekr,");
                parameter = new OracleParameter(":f_xiekr", OracleType.VarChar);
                parameter.Value = model.f_xiekr;
                parameterList.Add(parameter);
            }

            //写卡人id
            if (model.f_xiekrid != null)
            {
                strSql1.Append("f_xiekrid,");
                strSql2.Append("'" + (model.f_xiekrid) + "',");
                strSql3.Append(":f_xiekrid,");
                parameter = new OracleParameter(":f_xiekrid", OracleType.VarChar);
                parameter.Value = model.f_xiekrid;
                parameterList.Add(parameter);
            }
            //写卡日期
            if (model.f_xiekrq != null)
            {
                strSql1.Append("f_xiekrq,");
                strSql2.Append("to_date('" + model.f_xiekrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql3.Append(":f_xiekrq,");
                parameter = new OracleParameter(":f_xiekrq", OracleType.DateTime);
                parameter.Value = model.f_xiekrq;
                parameterList.Add(parameter);
            }

            //新增
            if (model.f_port != null)
            {
                strSql1.Append("f_port,");
                strSql2.Append("'" + (model.f_port) + "',");
                strSql3.Append(":f_port,");
                parameter = new OracleParameter(":f_port", OracleType.VarChar);
                parameter.Value = model.f_port;
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

            if (model.f_xkjzlx != null)
            {
                strSql1.Append("f_xkjzlx,");
                strSql2.Append("'" + (model.f_xkjzlx) + "',");
                strSql3.Append(":f_xkjzlx,");
                parameter = new OracleParameter(":f_xkjzlx", OracleType.VarChar);
                parameter.Value = model.f_xkjzlx;
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

            if (model.f_ssbh != null)
            {
                strSql1.Append("f_ssbh,");
                strSql2.Append("'" + (model.f_ssbh) + "',");
                strSql3.Append(":f_ssbh,");
                parameter = new OracleParameter(":f_ssbh", OracleType.VarChar);
                parameter.Value = model.f_ssbh;
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

            if (model.f_dkkh != null)
            {
                strSql1.Append("f_dkkh,");
                strSql2.Append("'" + (model.f_dkkh) + "',");
                strSql3.Append(":f_dkkh,");
                parameter = new OracleParameter(":f_dkkh", OracleType.VarChar);
                parameter.Value = model.f_dkkh;
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
            
            if (model.f_dj != null)
            {
	            strSql1.Append("f_dj,");
	            strSql2.Append("'" + (model.f_dj) + "',");
	            strSql3.Append(":f_dj,");
	            parameter = new OracleParameter(":f_dj", OracleType.VarChar);
	            parameter.Value = model.f_dj;
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
            
            if (model.f_ysje != null)
            {
	            strSql1.Append("f_ysje,");
	            strSql2.Append("'" + (model.f_ysje) + "',");
	            strSql3.Append(":f_ysje,");
	            parameter = new OracleParameter(":f_ysje", OracleType.VarChar);
	            parameter.Value = model.f_ysje;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jmhysje != null)
            {
	            strSql1.Append("f_jmhysje,");
	            strSql2.Append("'" + (model.f_jmhysje) + "',");
	            strSql3.Append(":f_jmhysje,");
	            parameter = new OracleParameter(":f_jmhysje", OracleType.VarChar);
	            parameter.Value = model.f_jmhysje;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khytjjzsf != null)
            {
	            strSql1.Append("f_khytjjzsf,");
	            strSql2.Append("'" + (model.f_khytjjzsf) + "',");
	            strSql3.Append(":f_khytjjzsf,");
	            parameter = new OracleParameter(":f_khytjjzsf", OracleType.VarChar);
	            parameter.Value = model.f_khytjjzsf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khytjjzpwf != null)
            {
	            strSql1.Append("f_khytjjzpwf,");
	            strSql2.Append("'" + (model.f_khytjjzpwf) + "',");
	            strSql3.Append(":f_khytjjzpwf,");
	            parameter = new OracleParameter(":f_khytjjzpwf", OracleType.VarChar);
	            parameter.Value = model.f_khytjjzpwf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sfsytjjz != null)
            {
	            strSql1.Append("f_sfsytjjz,");
	            strSql2.Append("'" + (model.f_sfsytjjz) + "',");
	            strSql3.Append(":f_sfsytjjz,");
	            parameter = new OracleParameter(":f_sfsytjjz", OracleType.VarChar);
	            parameter.Value = model.f_sfsytjjz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sytjjzsf != null)
            {
	            strSql1.Append("f_sytjjzsf,");
	            strSql2.Append("'" + (model.f_sytjjzsf) + "',");
	            strSql3.Append(":f_sytjjzsf,");
	            parameter = new OracleParameter(":f_sytjjzsf", OracleType.VarChar);
	            parameter.Value = model.f_sytjjzsf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sytjjzpwf != null)
            {
	            strSql1.Append("f_sytjjzpwf,");
	            strSql2.Append("'" + (model.f_sytjjzpwf) + "',");
	            strSql3.Append(":f_sytjjzpwf,");
	            parameter = new OracleParameter(":f_sytjjzpwf", OracleType.VarChar);
	            parameter.Value = model.f_sytjjzpwf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_syhtjjzsf != null)
            {
	            strSql1.Append("f_syhtjjzsf,");
	            strSql2.Append("'" + (model.f_syhtjjzsf) + "',");
	            strSql3.Append(":f_syhtjjzsf,");
	            parameter = new OracleParameter(":f_syhtjjzsf", OracleType.VarChar);
	            parameter.Value = model.f_syhtjjzsf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_syhtjjzpwf != null)
            {
	            strSql1.Append("f_syhtjjzpwf,");
	            strSql2.Append("'" + (model.f_syhtjjzpwf) + "',");
	            strSql3.Append(":f_syhtjjzpwf,");
	            parameter = new OracleParameter(":f_syhtjjzpwf", OracleType.VarChar);
	            parameter.Value = model.f_syhtjjzpwf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khyye != null)
            {
	            strSql1.Append("f_khyye,");
	            strSql2.Append("'" + (model.f_khyye) + "',");
	            strSql3.Append(":f_khyye,");
	            parameter = new OracleParameter(":f_khyye", OracleType.VarChar);
	            parameter.Value = model.f_khyye;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sfsyye != null)
            {
	            strSql1.Append("f_sfsyye,");
	            strSql2.Append("'" + (model.f_sfsyye) + "',");
	            strSql3.Append(":f_sfsyye,");
	            parameter = new OracleParameter(":f_sfsyye", OracleType.VarChar);
	            parameter.Value = model.f_sfsyye;
	            parameterList.Add(parameter);
            }
            
            if (model.f_syye != null)
            {
	            strSql1.Append("f_syye,");
	            strSql2.Append("'" + (model.f_syye) + "',");
	            strSql3.Append(":f_syye,");
	            parameter = new OracleParameter(":f_syye", OracleType.VarChar);
	            parameter.Value = model.f_syye;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhye != null)
            {
	            strSql1.Append("f_yhye,");
	            strSql2.Append("'" + (model.f_yhye) + "',");
	            strSql3.Append(":f_yhye,");
	            parameter = new OracleParameter(":f_yhye", OracleType.VarChar);
	            parameter.Value = model.f_yhye;
	            parameterList.Add(parameter);
            }
            
            if (model.f_shys != null)
            {
	            strSql1.Append("f_shys,");
	            strSql2.Append("'" + (model.f_shys) + "',");
	            strSql3.Append(":f_shys,");
	            parameter = new OracleParameter(":f_shys", OracleType.VarChar);
	            parameter.Value = model.f_shys;
	            parameterList.Add(parameter);
            }
            
            if (model.f_shss != null)
            {
	            strSql1.Append("f_shss,");
	            strSql2.Append("'" + (model.f_shss) + "',");
	            strSql3.Append(":f_shss,");
	            parameter = new OracleParameter(":f_shss", OracleType.VarChar);
	            parameter.Value = model.f_shss;
	            parameterList.Add(parameter);
            }
            
            if (model.f_shzl != null)
            {
	            strSql1.Append("f_shzl,");
	            strSql2.Append("'" + (model.f_shzl) + "',");
	            strSql3.Append(":f_shzl,");
	            parameter = new OracleParameter(":f_shzl", OracleType.VarChar);
	            parameter.Value = model.f_shzl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_shssdx != null)
            {
	            strSql1.Append("f_shssdx,");
	            strSql2.Append("'" + (model.f_shssdx) + "',");
	            strSql3.Append(":f_shssdx,");
	            parameter = new OracleParameter(":f_shssdx", OracleType.VarChar);
	            parameter.Value = model.f_shssdx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jffs != null)
            {
	            strSql1.Append("f_jffs,");
	            strSql2.Append("'" + (model.f_jffs) + "',");
	            strSql3.Append(":f_jffs,");
	            parameter = new OracleParameter(":f_jffs", OracleType.VarChar);
	            parameter.Value = model.f_jffs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jffsid != null)
            {
	            strSql1.Append("f_jffsid,");
	            strSql2.Append("'" + (model.f_jffsid) + "',");
	            strSql3.Append(":f_jffsid,");
	            parameter = new OracleParameter(":f_jffsid", OracleType.VarChar);
	            parameter.Value = model.f_jffsid;
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
            
            if (model.f_yyt != null)
            {
	            strSql1.Append("f_yyt,");
	            strSql2.Append("'" + (model.f_yyt) + "',");
	            strSql3.Append(":f_yyt,");
	            parameter = new OracleParameter(":f_yyt", OracleType.VarChar);
	            parameter.Value = model.f_yyt;
	            parameterList.Add(parameter);
            }

            if (model.f_yytid != null)
            {
                strSql1.Append("f_yytid,");
                strSql2.Append("'" + (model.f_yytid) + "',");
                strSql3.Append(":f_yytid,");
                parameter = new OracleParameter(":f_yytid", OracleType.VarChar);
                parameter.Value = model.f_yytid;
                parameterList.Add(parameter);
            }

            if (model.f_kplb != null)
            {
	            strSql1.Append("f_kplb,");
	            strSql2.Append("'" + (model.f_kplb) + "',");
	            strSql3.Append(":f_kplb,");
	            parameter = new OracleParameter(":f_kplb", OracleType.VarChar);
	            parameter.Value = model.f_kplb;
	            parameterList.Add(parameter);
            }
            
            if (model.f_kplbid != null)
            {
	            strSql1.Append("f_kplbid,");
	            strSql2.Append("'" + (model.f_kplbid) + "',");
	            strSql3.Append(":f_kplbid,");
	            parameter = new OracleParameter(":f_kplbid", OracleType.VarChar);
	            parameter.Value = model.f_kplbid;
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
            if (model.f_tgly != null)
            {
                strSql1.Append("f_tgly,");
                strSql2.Append("'" + (model.f_tgly) + "',");
                strSql3.Append(":f_tgly,");
                parameter = new OracleParameter(":f_tgly", OracleType.VarChar);
                parameter.Value = model.f_tgly;
                parameterList.Add(parameter);
            }
            strSql.Append("insert into tbl_ld_ickss(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_ickss(");
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
	                string updateSqlString = " update tbl_ld_ickss set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_ickss> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ickss model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_ickss model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_ickss set ");
            strSql_use.Append("update tbl_ld_ickss set ");
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
            
	            if (model.f_yhbh != null&& columsList.Contains("f_yhbh"))
            {
                strSql.Append("f_yhbh='" + (model.f_yhbh) + "',");
                strSql_use.Append("f_yhbh=:f_yhbh,");
                parameter = new OracleParameter(":f_yhbh", OracleType.VarChar);
                parameter.Value = model.f_yhbh;
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
            
	            if (model.f_sblx != null&& columsList.Contains("f_sblx"))
            {
                strSql.Append("f_sblx='" + (model.f_sblx) + "',");
                strSql_use.Append("f_sblx=:f_sblx,");
                parameter = new OracleParameter(":f_sblx", OracleType.VarChar);
                parameter.Value = model.f_sblx;
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
            
	            if (model.f_kj != null&& columsList.Contains("f_kj"))
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

            if (model.f_yhbhid != null&& columsList.Contains("f_yhbhid"))
            {
                strSql.Append("f_yhbhid='" + (model.f_yhbhid) + "',");
                strSql_use.Append("f_yhbhid=:f_yhbhid,");
                parameter = new OracleParameter(":f_yhbhid", OracleType.VarChar);
                parameter.Value = model.f_yhbhid;
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
            
	            if (model.f_sblxid != null&& columsList.Contains("f_sblxid"))
            {
                strSql.Append("f_sblxid='" + (model.f_sblxid) + "',");
                strSql_use.Append("f_sblxid=:f_sblxid,");
                parameter = new OracleParameter(":f_sblxid", OracleType.VarChar);
                parameter.Value = model.f_sblxid;
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
            
	            if (model.f_khrq != null&& columsList.Contains("f_khrq"))
            {
                strSql.Append("f_khrq=to_date('" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_khrq=:f_khrq,");
                parameter = new OracleParameter(":f_khrq", OracleType.DateTime);
                parameter.Value = model.f_khrq;
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
            
	            if (model.f_yhm != null&& columsList.Contains("f_yhm"))
            {
                strSql.Append("f_yhm='" + (model.f_yhm) + "',");
                strSql_use.Append("f_yhm=:f_yhm,");
                parameter = new OracleParameter(":f_yhm", OracleType.VarChar);
                parameter.Value = model.f_yhm;
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
            
	            if (model.f_sbbh != null&& columsList.Contains("f_sbbh"))
            {
                strSql.Append("f_sbbh='" + (model.f_sbbh) + "',");
                strSql_use.Append("f_sbbh=:f_sbbh,");
                parameter = new OracleParameter(":f_sbbh", OracleType.VarChar);
                parameter.Value = model.f_sbbh;
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
            
	            if (model.f_jfm != null&& columsList.Contains("f_jfm"))
            {
                strSql.Append("f_jfm='" + (model.f_jfm) + "',");
                strSql_use.Append("f_jfm=:f_jfm,");
                parameter = new OracleParameter(":f_jfm", OracleType.VarChar);
                parameter.Value = model.f_jfm;
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
            
	            if (model.f_sbbhid != null&& columsList.Contains("f_sbbhid"))
            {
                strSql.Append("f_sbbhid='" + (model.f_sbbhid) + "',");
                strSql_use.Append("f_sbbhid=:f_sbbhid,");
                parameter = new OracleParameter(":f_sbbhid", OracleType.VarChar);
                parameter.Value = model.f_sbbhid;
                parameterList.Add(parameter);
            }

	            if (model.f_rs != null&& columsList.Contains("f_rs"))
            {
                strSql.Append("f_rs='" + (model.f_rs) + "',");
                strSql_use.Append("f_rs=:f_rs,");
                parameter = new OracleParameter(":f_rs", OracleType.VarChar);
                parameter.Value = model.f_rs;
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
            
	            if (model.f_sl != null&& columsList.Contains("f_sl"))
            {
                strSql.Append("f_sl='" + (model.f_sl) + "',");
                strSql_use.Append("f_sl=:f_sl,");
                parameter = new OracleParameter(":f_sl", OracleType.VarChar);
                parameter.Value = model.f_sl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfdh != null&& columsList.Contains("f_jfdh"))
            {
                strSql.Append("f_jfdh='" + (model.f_jfdh) + "',");
                strSql_use.Append("f_jfdh=:f_jfdh,");
                parameter = new OracleParameter(":f_jfdh", OracleType.VarChar);
                parameter.Value = model.f_jfdh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfje != null&& columsList.Contains("f_jfje"))
            {
                strSql.Append("f_jfje='" + (model.f_jfje) + "',");
                strSql_use.Append("f_jfje=:f_jfje,");
                parameter = new OracleParameter(":f_jfje", OracleType.VarChar);
                parameter.Value = model.f_jfje;
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
            //寻卡人
            if (model.f_xkr != null && columsList.Contains("f_xkr"))
            {
                strSql.Append("f_xkr='" + (model.f_xkr) + "',");
                strSql_use.Append("f_xkr=:f_xkr,");
                parameter = new OracleParameter(":f_xkr", OracleType.VarChar);
                parameter.Value = model.f_xkr;
                parameterList.Add(parameter);
            }
            //寻卡人id
            if (model.f_xkrid != null && columsList.Contains("f_xkrid"))
            {
                strSql.Append("f_xkrid='" + (model.f_xkrid) + "',");
                strSql_use.Append("f_xkrid=:f_xkrid,");
                parameter = new OracleParameter(":f_xkrid", OracleType.VarChar);
                parameter.Value = model.f_xkrid;
                parameterList.Add(parameter);
            }
            //寻卡日期
            if (model.f_xkrq != null && columsList.Contains("f_xkrq"))
            {
                strSql.Append("f_xkrq=to_date('" + model.f_xkrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_xkrq=:f_xkrq,");
                parameter = new OracleParameter(":f_xkrq", OracleType.DateTime);
                parameter.Value = model.f_xkrq;
                parameterList.Add(parameter);
            }
            //写卡人
            if (model.f_xiekr != null && columsList.Contains("f_xiekr"))
            {
                strSql.Append("f_xiekr='" + (model.f_xiekr) + "',");
                strSql_use.Append("f_xiekr=:f_xiekr,");
                parameter = new OracleParameter(":f_xiekr", OracleType.VarChar);
                parameter.Value = model.f_xiekr;
                parameterList.Add(parameter);
            }
            //写卡人id
            if (model.f_xiekrid != null && columsList.Contains("f_xiekrid"))
            {
                strSql.Append("f_xiekrid='" + (model.f_xiekrid) + "',");
                strSql_use.Append("f_xiekrid=:f_xiekrid,");
                parameter = new OracleParameter(":f_xiekrid", OracleType.VarChar);
                parameter.Value = model.f_xiekrid;
                parameterList.Add(parameter);
            }
            //写卡日期
            if (model.f_xiekrq != null && columsList.Contains("f_xiekrq"))
            {
                strSql.Append("f_xiekrq=to_date('" + model.f_xiekrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_xiekrq=:f_xiekrq,");
                parameter = new OracleParameter(":f_xiekrq", OracleType.DateTime);
                parameter.Value = model.f_xiekrq;
                parameterList.Add(parameter);
            }

            //新增
            if (model.f_port != null && columsList.Contains("f_port"))
            {
                strSql.Append("f_port='" + (model.f_port) + "',");
                strSql_use.Append("f_port=:f_port,");
                parameter = new OracleParameter(":f_port", OracleType.VarChar);
                parameter.Value = model.f_port;
                parameterList.Add(parameter);
            }

            if (model.f_xkms != null && columsList.Contains("f_xkms"))
            {
                strSql.Append("f_xkms='" + (model.f_xkms) + "',");
                strSql_use.Append("f_xkms=:f_xkms,");
                parameter = new OracleParameter(":f_xkms", OracleType.VarChar);
                parameter.Value = model.f_xkms;
                parameterList.Add(parameter);
            }

            if (model.f_xkjzlx != null && columsList.Contains("f_xkjzlx"))
            {
                strSql.Append("f_xkjzlx='" + (model.f_xkjzlx) + "',");
                strSql_use.Append("f_xkjzlx=:f_xkjzlx,");
                parameter = new OracleParameter(":f_xkjzlx", OracleType.VarChar);
                parameter.Value = model.f_xkjzlx;
                parameterList.Add(parameter);
            }

            if (model.f_xkljgl != null && columsList.Contains("f_xkljgl"))
            {
                strSql.Append("f_xkljgl='" + (model.f_xkljgl) + "',");
                strSql_use.Append("f_xkljgl=:f_xkljgl,");
                parameter = new OracleParameter(":f_xkljgl", OracleType.VarChar);
                parameter.Value = model.f_xkljgl;
                parameterList.Add(parameter);
            }

            if (model.f_xkgscs != null && columsList.Contains("f_xkgscs"))
            {
                strSql.Append("f_xkgscs='" + (model.f_xkgscs) + "',");
                strSql_use.Append("f_xkgscs=:f_xkgscs,");
                parameter = new OracleParameter(":f_xkgscs", OracleType.VarChar);
                parameter.Value = model.f_xkgscs;
                parameterList.Add(parameter);
            }

            if (model.f_xkbcgsl != null && columsList.Contains("f_xkbcgsl"))
            {
                strSql.Append("f_xkbcgsl='" + (model.f_xkbcgsl) + "',");
                strSql_use.Append("f_xkbcgsl=:f_xkbcgsl,");
                parameter = new OracleParameter(":f_xkbcgsl", OracleType.VarChar);
                parameter.Value = model.f_xkbcgsl;
                parameterList.Add(parameter);
            }

            if (model.f_xklx != null && columsList.Contains("f_xklx"))
            {
                strSql.Append("f_xklx='" + (model.f_xklx) + "',");
                strSql_use.Append("f_xklx=:f_xklx,");
                parameter = new OracleParameter(":f_xklx", OracleType.VarChar);
                parameter.Value = model.f_xklx;
                parameterList.Add(parameter);
            }

            if (model.f_xkkh != null && columsList.Contains("f_xkkh"))
            {
                strSql.Append("f_xkkh='" + (model.f_xkkh) + "',");
                strSql_use.Append("f_xkkh=:f_xkkh,");
                parameter = new OracleParameter(":f_xkkh", OracleType.VarChar);
                parameter.Value = model.f_xkkh;
                parameterList.Add(parameter);
            }

            if (model.f_ssbh != null && columsList.Contains("f_ssbh"))
            {
                strSql.Append("f_ssbh='" + (model.f_ssbh) + "',");
                strSql_use.Append("f_ssbh=:f_ssbh,");
                parameter = new OracleParameter(":f_ssbh", OracleType.VarChar);
                parameter.Value = model.f_ssbh;
                parameterList.Add(parameter);
            }

            if (model.f_sjbh != null && columsList.Contains("f_sjbh"))
            {
                strSql.Append("f_sjbh='" + (model.f_sjbh) + "',");
                strSql_use.Append("f_sjbh=:f_sjbh,");
                parameter = new OracleParameter(":f_sjbh", OracleType.VarChar);
                parameter.Value = model.f_sjbh;
                parameterList.Add(parameter);
            }

            if (model.f_dkbcgsl != null && columsList.Contains("f_dkbcgsl"))
            {
                strSql.Append("f_dkbcgsl='" + (model.f_dkbcgsl) + "',");
                strSql_use.Append("f_dkbcgsl=:f_dkbcgsl,");
                parameter = new OracleParameter(":f_dkbcgsl", OracleType.VarChar);
                parameter.Value = model.f_dkbcgsl;
                parameterList.Add(parameter);
            }

            if (model.f_dkgscs != null && columsList.Contains("f_dkgscs"))
            {
                strSql.Append("f_dkgscs='" + (model.f_dkgscs) + "',");
                strSql_use.Append("f_dkgscs=:f_dkgscs,");
                parameter = new OracleParameter(":f_dkgscs", OracleType.VarChar);
                parameter.Value = model.f_dkgscs;
                parameterList.Add(parameter);
            }

            if (model.f_dkljgl != null && columsList.Contains("f_dkljgl"))
            {
                strSql.Append("f_dkljgl='" + (model.f_dkljgl) + "',");
                strSql_use.Append("f_dkljgl=:f_dkljgl,");
                parameter = new OracleParameter(":f_dkljgl", OracleType.VarChar);
                parameter.Value = model.f_dkljgl;
                parameterList.Add(parameter);
            }

            if (model.f_dkjzlx != null && columsList.Contains("f_dkjzlx"))
            {
                strSql.Append("f_dkjzlx='" + (model.f_dkjzlx) + "',");
                strSql_use.Append("f_dkjzlx=:f_dkjzlx,");
                parameter = new OracleParameter(":f_dkjzlx", OracleType.VarChar);
                parameter.Value = model.f_dkjzlx;
                parameterList.Add(parameter);
            }

            if (model.f_dksbzt != null && columsList.Contains("f_dksbzt"))
            {
                strSql.Append("f_dksbzt='" + (model.f_dksbzt) + "',");
                strSql_use.Append("f_dksbzt=:f_dksbzt,");
                parameter = new OracleParameter(":f_dksbzt", OracleType.VarChar);
                parameter.Value = model.f_dksbzt;
                parameterList.Add(parameter);
            }

            if (model.f_ly != null && columsList.Contains("f_ly"))
            {
                strSql.Append("f_ly='" + (model.f_ly) + "',");
                strSql_use.Append("f_ly=:f_ly,");
                parameter = new OracleParameter(":f_ly", OracleType.VarChar);
                parameter.Value = model.f_ly;
                parameterList.Add(parameter);
            }

            if (model.f_lyid != null && columsList.Contains("f_lyid"))
            {
                strSql.Append("f_lyid='" + (model.f_lyid) + "',");
                strSql_use.Append("f_lyid=:f_lyid,");
                parameter = new OracleParameter(":f_lyid", OracleType.VarChar);
                parameter.Value = model.f_lyid;
                parameterList.Add(parameter);
            }

            if (model.f_dkkh != null && columsList.Contains("f_dkkh"))
            {
                strSql.Append("f_dkkh='" + (model.f_dkkh) + "',");
                strSql_use.Append("f_dkkh=:f_dkkh,");
                parameter = new OracleParameter(":f_dkkh", OracleType.VarChar);
                parameter.Value = model.f_dkkh;
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
            
	            if (model.f_dj != null&& columsList.Contains("f_dj"))
            {
                strSql.Append("f_dj='" + (model.f_dj) + "',");
                strSql_use.Append("f_dj=:f_dj,");
                parameter = new OracleParameter(":f_dj", OracleType.VarChar);
                parameter.Value = model.f_dj;
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
            
	            if (model.f_ysje != null&& columsList.Contains("f_ysje"))
            {
                strSql.Append("f_ysje='" + (model.f_ysje) + "',");
                strSql_use.Append("f_ysje=:f_ysje,");
                parameter = new OracleParameter(":f_ysje", OracleType.VarChar);
                parameter.Value = model.f_ysje;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jmhysje != null&& columsList.Contains("f_jmhysje"))
            {
                strSql.Append("f_jmhysje='" + (model.f_jmhysje) + "',");
                strSql_use.Append("f_jmhysje=:f_jmhysje,");
                parameter = new OracleParameter(":f_jmhysje", OracleType.VarChar);
                parameter.Value = model.f_jmhysje;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khytjjzsf != null&& columsList.Contains("f_khytjjzsf"))
            {
                strSql.Append("f_khytjjzsf='" + (model.f_khytjjzsf) + "',");
                strSql_use.Append("f_khytjjzsf=:f_khytjjzsf,");
                parameter = new OracleParameter(":f_khytjjzsf", OracleType.VarChar);
                parameter.Value = model.f_khytjjzsf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khytjjzpwf != null&& columsList.Contains("f_khytjjzpwf"))
            {
                strSql.Append("f_khytjjzpwf='" + (model.f_khytjjzpwf) + "',");
                strSql_use.Append("f_khytjjzpwf=:f_khytjjzpwf,");
                parameter = new OracleParameter(":f_khytjjzpwf", OracleType.VarChar);
                parameter.Value = model.f_khytjjzpwf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sfsytjjz != null&& columsList.Contains("f_sfsytjjz"))
            {
                strSql.Append("f_sfsytjjz='" + (model.f_sfsytjjz) + "',");
                strSql_use.Append("f_sfsytjjz=:f_sfsytjjz,");
                parameter = new OracleParameter(":f_sfsytjjz", OracleType.VarChar);
                parameter.Value = model.f_sfsytjjz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sytjjzsf != null&& columsList.Contains("f_sytjjzsf"))
            {
                strSql.Append("f_sytjjzsf='" + (model.f_sytjjzsf) + "',");
                strSql_use.Append("f_sytjjzsf=:f_sytjjzsf,");
                parameter = new OracleParameter(":f_sytjjzsf", OracleType.VarChar);
                parameter.Value = model.f_sytjjzsf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sytjjzpwf != null&& columsList.Contains("f_sytjjzpwf"))
            {
                strSql.Append("f_sytjjzpwf='" + (model.f_sytjjzpwf) + "',");
                strSql_use.Append("f_sytjjzpwf=:f_sytjjzpwf,");
                parameter = new OracleParameter(":f_sytjjzpwf", OracleType.VarChar);
                parameter.Value = model.f_sytjjzpwf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_syhtjjzsf != null&& columsList.Contains("f_syhtjjzsf"))
            {
                strSql.Append("f_syhtjjzsf='" + (model.f_syhtjjzsf) + "',");
                strSql_use.Append("f_syhtjjzsf=:f_syhtjjzsf,");
                parameter = new OracleParameter(":f_syhtjjzsf", OracleType.VarChar);
                parameter.Value = model.f_syhtjjzsf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_syhtjjzpwf != null&& columsList.Contains("f_syhtjjzpwf"))
            {
                strSql.Append("f_syhtjjzpwf='" + (model.f_syhtjjzpwf) + "',");
                strSql_use.Append("f_syhtjjzpwf=:f_syhtjjzpwf,");
                parameter = new OracleParameter(":f_syhtjjzpwf", OracleType.VarChar);
                parameter.Value = model.f_syhtjjzpwf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khyye != null&& columsList.Contains("f_khyye"))
            {
                strSql.Append("f_khyye='" + (model.f_khyye) + "',");
                strSql_use.Append("f_khyye=:f_khyye,");
                parameter = new OracleParameter(":f_khyye", OracleType.VarChar);
                parameter.Value = model.f_khyye;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sfsyye != null&& columsList.Contains("f_sfsyye"))
            {
                strSql.Append("f_sfsyye='" + (model.f_sfsyye) + "',");
                strSql_use.Append("f_sfsyye=:f_sfsyye,");
                parameter = new OracleParameter(":f_sfsyye", OracleType.VarChar);
                parameter.Value = model.f_sfsyye;
                parameterList.Add(parameter);
            }
            
	            if (model.f_syye != null&& columsList.Contains("f_syye"))
            {
                strSql.Append("f_syye='" + (model.f_syye) + "',");
                strSql_use.Append("f_syye=:f_syye,");
                parameter = new OracleParameter(":f_syye", OracleType.VarChar);
                parameter.Value = model.f_syye;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhye != null&& columsList.Contains("f_yhye"))
            {
                strSql.Append("f_yhye='" + (model.f_yhye) + "',");
                strSql_use.Append("f_yhye=:f_yhye,");
                parameter = new OracleParameter(":f_yhye", OracleType.VarChar);
                parameter.Value = model.f_yhye;
                parameterList.Add(parameter);
            }
            
	            if (model.f_shys != null&& columsList.Contains("f_shys"))
            {
                strSql.Append("f_shys='" + (model.f_shys) + "',");
                strSql_use.Append("f_shys=:f_shys,");
                parameter = new OracleParameter(":f_shys", OracleType.VarChar);
                parameter.Value = model.f_shys;
                parameterList.Add(parameter);
            }
            
	            if (model.f_shss != null&& columsList.Contains("f_shss"))
            {
                strSql.Append("f_shss='" + (model.f_shss) + "',");
                strSql_use.Append("f_shss=:f_shss,");
                parameter = new OracleParameter(":f_shss", OracleType.VarChar);
                parameter.Value = model.f_shss;
                parameterList.Add(parameter);
            }
            
	            if (model.f_shzl != null&& columsList.Contains("f_shzl"))
            {
                strSql.Append("f_shzl='" + (model.f_shzl) + "',");
                strSql_use.Append("f_shzl=:f_shzl,");
                parameter = new OracleParameter(":f_shzl", OracleType.VarChar);
                parameter.Value = model.f_shzl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_shssdx != null&& columsList.Contains("f_shssdx"))
            {
                strSql.Append("f_shssdx='" + (model.f_shssdx) + "',");
                strSql_use.Append("f_shssdx=:f_shssdx,");
                parameter = new OracleParameter(":f_shssdx", OracleType.VarChar);
                parameter.Value = model.f_shssdx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jffs != null&& columsList.Contains("f_jffs"))
            {
                strSql.Append("f_jffs='" + (model.f_jffs) + "',");
                strSql_use.Append("f_jffs=:f_jffs,");
                parameter = new OracleParameter(":f_jffs", OracleType.VarChar);
                parameter.Value = model.f_jffs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jffsid != null&& columsList.Contains("f_jffsid"))
            {
                strSql.Append("f_jffsid='" + (model.f_jffsid) + "',");
                strSql_use.Append("f_jffsid=:f_jffsid,");
                parameter = new OracleParameter(":f_jffsid", OracleType.VarChar);
                parameter.Value = model.f_jffsid;
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
            
	            if (model.f_yyt != null&& columsList.Contains("f_yyt"))
            {
                strSql.Append("f_yyt='" + (model.f_yyt) + "',");
                strSql_use.Append("f_yyt=:f_yyt,");
                parameter = new OracleParameter(":f_yyt", OracleType.VarChar);
                parameter.Value = model.f_yyt;
                parameterList.Add(parameter);
            }

            if (model.f_yytid != null && columsList.Contains("f_yytid"))
            {
                strSql.Append("f_yytid='" + (model.f_yytid) + "',");
                strSql_use.Append("f_yytid=:f_yytid,");
                parameter = new OracleParameter(":f_yytid", OracleType.VarChar);
                parameter.Value = model.f_yytid;
                parameterList.Add(parameter);
            }

            if (model.f_kplb != null&& columsList.Contains("f_kplb"))
            {
                strSql.Append("f_kplb='" + (model.f_kplb) + "',");
                strSql_use.Append("f_kplb=:f_kplb,");
                parameter = new OracleParameter(":f_kplb", OracleType.VarChar);
                parameter.Value = model.f_kplb;
                parameterList.Add(parameter);
            }
            
	            if (model.f_kplbid != null&& columsList.Contains("f_kplbid"))
            {
                strSql.Append("f_kplbid='" + (model.f_kplbid) + "',");
                strSql_use.Append("f_kplbid=:f_kplbid,");
                parameter = new OracleParameter(":f_kplbid", OracleType.VarChar);
                parameter.Value = model.f_kplbid;
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
            if (model.f_tgly != null && columsList.Contains("f_tgly"))
            {
                strSql.Append("f_tgly='" + (model.f_tgly) + "',");
                strSql_use.Append("f_tgly=:f_tgly,");
                parameter = new OracleParameter(":f_tgly", OracleType.VarChar);
                parameter.Value = model.f_tgly;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_ickss> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ickss model in modelList)
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
            strSql.Append("delete tbl_ld_ickss where  ");
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
            strSql.Append("update tbl_ld_ickss set ");
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
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("ickss", cxzxsjString) == true)
            {
                strSql.Append(" select sum(c) from  ");
                strSql.Append(" ( ");
                strSql.Append(" select count(*) as c  from tbl_ld_ickss ");
                if (whereString.Trim() != "")
                {
                    strSql.Append(" where " + whereString);
                }
                strSql.Append(" union all");
                strSql.Append(" select count(*) as c  from tbl_ld_ickss_his  ");
                if (whereString.Trim() != "")
                {
                    strSql.Append(" where " + whereString);
                }
                strSql.Append(" ) ");
            }
            else
            {
            strSql.Append("select count(*) from tbl_ld_ickss");
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
        public List<sara.dd.ldsw.model.tbl_ld_ickss> GetList(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("ickss", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_ickss t where ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  union all ");
                strSql.Append("  (select * from tbl_ld_ickss_his t where  ");
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
            strSql.Append(" select * from tbl_ld_ickss t where");
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
            if(t==null)
            {
                resultDataTable = _iAccessData.Query(strSql.ToString()).Tables[0];
            }
            else
            {
                resultDataTable = t.Query(strSql.ToString()).Tables[0];
            }

            List<sara.dd.ldsw.model.tbl_ld_ickss> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_ickss>(resultDataTable);
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
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("ickss", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_ickss t where ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  union all ");
                strSql.Append("  (select * from tbl_ld_ickss_his t where  ");
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
            strSql.Append(" select * from tbl_ld_ickss t where");
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


        public DataTable GetDataTableForApp(string whereString, string cxzxsjString, string orderByString, string columnsString, string countString, string stepString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("ickss", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_ickss t where ");
                if (whereString.Trim() == "")
                {
                    strSql.Append(" 1=1 ");
                }
                else
                {
                    strSql.Append(" " + whereString);
                }
                strSql.Append("   )    ");
                strSql.Append("  union all ");
                strSql.Append("  (select * from tbl_ld_ickss_his t where  ");
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
            strSql.Append(" select * from tbl_ld_ickss t where");
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

            string sqlString = "update tbl_num set f_tablesys_id = ";
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ickss')";
            sqlString += " where f_tablename  = 'tbl_ld_ickss'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ickss'";


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
















