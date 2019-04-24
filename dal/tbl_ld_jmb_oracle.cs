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
    /// 数据访问类tbl_ld_jmb 
    /// </summary>
    public class tbl_ld_jmb : sara.dd.ldsw.idal.Itbl_ld_jmb
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_jmb()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_jmb model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_jmbh != null)
            {
	            strSql1.Append("f_jmbh,");
	            strSql2.Append("'" + (model.f_jmbh) + "',");
	            strSql3.Append(":f_jmbh,");
	            parameter = new OracleParameter(":f_jmbh", OracleType.VarChar);
	            parameter.Value = model.f_jmbh;
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
            
            if (model.f_jmje != null)
            {
	            strSql1.Append("f_jmje,");
	            strSql2.Append("'" + (model.f_jmje) + "',");
	            strSql3.Append(":f_jmje,");
	            parameter = new OracleParameter(":f_jmje", OracleType.VarChar);
	            parameter.Value = model.f_jmje;
	            parameterList.Add(parameter);
            }
            
            //if (model.f_yy != null)
            //{
            // strSql1.Append("f_yy,");
            // strSql2.Append("'" + (model.f_yy) + "',");
            // strSql3.Append(":f_yy,");
            // parameter = new OracleParameter(":f_yy", OracleType.VarChar);
            // parameter.Value = model.f_yy;
            // parameterList.Add(parameter);
            
            //if (model.f_yyid != null)
            //{
            // strSql1.Append("f_yyid,");
            // strSql2.Append("'" + (model.f_yyid) + "',");
            // strSql3.Append(":f_yyid,");
            // parameter = new OracleParameter(":f_yyid", OracleType.VarChar);
            // parameter.Value = model.f_yyid;
            // parameterList.Add(parameter);
            
            if (model.f_czr != null)
            {
	            strSql1.Append("f_czr,");
	            strSql2.Append("'" + (model.f_czr) + "',");
	            strSql3.Append(":f_czr,");
	            parameter = new OracleParameter(":f_czr", OracleType.VarChar);
	            parameter.Value = model.f_czr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_czrid != null)
            {
	            strSql1.Append("f_czrid,");
	            strSql2.Append("'" + (model.f_czrid) + "',");
	            strSql3.Append(":f_czrid,");
	            parameter = new OracleParameter(":f_czrid", OracleType.VarChar);
	            parameter.Value = model.f_czrid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_czsj != null)
            {
	            strSql1.Append("f_czsj,");
	            strSql2.Append("to_date('" + model.f_czsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_czsj,");
	            parameter = new OracleParameter(":f_czsj", OracleType.DateTime);
	            parameter.Value = model.f_czsj;
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
            
            if (model.f_jfbh != null)
            {
	            strSql1.Append("f_jfbh,");
	            strSql2.Append("'" + (model.f_jfbh) + "',");
	            strSql3.Append(":f_jfbh,");
	            parameter = new OracleParameter(":f_jfbh", OracleType.VarChar);
	            parameter.Value = model.f_jfbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jfid != null)
            {
	            strSql1.Append("f_jfid,");
	            strSql2.Append("'" + (model.f_jfid) + "',");
	            strSql3.Append(":f_jfid,");
	            parameter = new OracleParameter(":f_jfid", OracleType.VarChar);
	            parameter.Value = model.f_jfid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_syqk != null)
            {
	            strSql1.Append("f_syqk,");
	            strSql2.Append("'" + (model.f_syqk) + "',");
	            strSql3.Append(":f_syqk,");
	            parameter = new OracleParameter(":f_syqk", OracleType.VarChar);
	            parameter.Value = model.f_syqk;
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
            
            if (model.f_dz != null)
            {
	            strSql1.Append("f_dz,");
	            strSql2.Append("'" + (model.f_dz) + "',");
	            strSql3.Append(":f_dz,");
	            parameter = new OracleParameter(":f_dz", OracleType.VarChar);
	            parameter.Value = model.f_dz;
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
            if (model.f_cbenbh != null)
            {
	            strSql1.Append("f_cbenbh,");
	            strSql2.Append("'" + (model.f_cbenbh) + "',");
	            strSql3.Append(":f_cbenbh,");
	            parameter = new OracleParameter(":f_cbenbh", OracleType.VarChar);
	            parameter.Value = model.f_cbenbh;
	            parameterList.Add(parameter);
            }
            if (model.f_cbenbhid != null)
            {
	            strSql1.Append("f_cbenbhid,");
	            strSql2.Append("'" + (model.f_cbenbhid) + "',");
	            strSql3.Append(":f_cbenbhid,");
	            parameter = new OracleParameter(":f_cbenbhid", OracleType.VarChar);
	            parameter.Value = model.f_cbenbhid;
	            parameterList.Add(parameter);
            }
            strSql.Append("insert into tbl_ld_jmb(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_jmb(");
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
	                string updateSqlString = " update tbl_ld_jmb set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_jmb> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_jmb model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_jmb model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_jmb set ");
            strSql_use.Append("update tbl_ld_jmb set ");
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
            
	            if (model.f_jmbh != null&& columsList.Contains("f_jmbh"))
            {
                strSql.Append("f_jmbh='" + (model.f_jmbh) + "',");
                strSql_use.Append("f_jmbh=:f_jmbh,");
                parameter = new OracleParameter(":f_jmbh", OracleType.VarChar);
                parameter.Value = model.f_jmbh;
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
            
	            if (model.f_jmje != null&& columsList.Contains("f_jmje"))
            {
                strSql.Append("f_jmje='" + (model.f_jmje) + "',");
                strSql_use.Append("f_jmje=:f_jmje,");
                parameter = new OracleParameter(":f_jmje", OracleType.VarChar);
                parameter.Value = model.f_jmje;
                parameterList.Add(parameter);
            }
            
            // if (model.f_yy != null&& columsList.Contains("f_yy"))
            //{
            //    strSql.Append("f_yy='" + (model.f_yy) + "',");
            //    strSql_use.Append("f_yy=:f_yy,");
            //    parameter = new OracleParameter(":f_yy", OracleType.VarChar);
            //    parameter.Value = model.f_yy;
            //    parameterList.Add(parameter);
            
            // if (model.f_yyid != null&& columsList.Contains("f_yyid"))
            //{
            //    strSql.Append("f_yyid='" + (model.f_yyid) + "',");
            //    strSql_use.Append("f_yyid=:f_yyid,");
            //    parameter = new OracleParameter(":f_yyid", OracleType.VarChar);
            //    parameter.Value = model.f_yyid;
            //    parameterList.Add(parameter);
            
	            if (model.f_czr != null&& columsList.Contains("f_czr"))
            {
                strSql.Append("f_czr='" + (model.f_czr) + "',");
                strSql_use.Append("f_czr=:f_czr,");
                parameter = new OracleParameter(":f_czr", OracleType.VarChar);
                parameter.Value = model.f_czr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_czrid != null&& columsList.Contains("f_czrid"))
            {
                strSql.Append("f_czrid='" + (model.f_czrid) + "',");
                strSql_use.Append("f_czrid=:f_czrid,");
                parameter = new OracleParameter(":f_czrid", OracleType.VarChar);
                parameter.Value = model.f_czrid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_czsj != null&& columsList.Contains("f_czsj"))
            {
                strSql.Append("f_czsj=to_date('" + model.f_czsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_czsj=:f_czsj,");
                parameter = new OracleParameter(":f_czsj", OracleType.DateTime);
                parameter.Value = model.f_czsj;
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
            
	            if (model.f_jfbh != null&& columsList.Contains("f_jfbh"))
            {
                strSql.Append("f_jfbh='" + (model.f_jfbh) + "',");
                strSql_use.Append("f_jfbh=:f_jfbh,");
                parameter = new OracleParameter(":f_jfbh", OracleType.VarChar);
                parameter.Value = model.f_jfbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jfid != null&& columsList.Contains("f_jfid"))
            {
                strSql.Append("f_jfid='" + (model.f_jfid) + "',");
                strSql_use.Append("f_jfid=:f_jfid,");
                parameter = new OracleParameter(":f_jfid", OracleType.VarChar);
                parameter.Value = model.f_jfid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_syqk != null&& columsList.Contains("f_syqk"))
            {
                strSql.Append("f_syqk='" + (model.f_syqk) + "',");
                strSql_use.Append("f_syqk=:f_syqk,");
                parameter = new OracleParameter(":f_syqk", OracleType.VarChar);
                parameter.Value = model.f_syqk;
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
            
	            if (model.f_dz != null&& columsList.Contains("f_dz"))
            {
                strSql.Append("f_dz='" + (model.f_dz) + "',");
                strSql_use.Append("f_dz=:f_dz,");
                parameter = new OracleParameter(":f_dz", OracleType.VarChar);
                parameter.Value = model.f_dz;
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
            if (model.f_sblxid != null && columsList.Contains("f_sblxid"))
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
            if (model.f_yslxid != null && columsList.Contains("f_yslxid"))
            {
                strSql.Append("f_yslxid='" + (model.f_yslxid) + "',");
                strSql_use.Append("f_yslxid=:f_yslxid,");
                parameter = new OracleParameter(":f_yslxid", OracleType.VarChar);
                parameter.Value = model.f_yslxid;
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
	            if (model.f_cbenbh != null&& columsList.Contains("f_cbenbh"))
            {
                strSql.Append("f_cbenbh='" + (model.f_cbenbh) + "',");
                strSql_use.Append("f_cbenbh=:f_cbenbh,");
                parameter = new OracleParameter(":f_cbenbh", OracleType.VarChar);
                parameter.Value = model.f_cbenbh;
                parameterList.Add(parameter);
            }
	            if (model.f_cbenbhid != null&& columsList.Contains("f_cbenbhid"))
            {
                strSql.Append("f_cbenbhid='" + (model.f_cbenbhid) + "',");
                strSql_use.Append("f_cbenbhid=:f_cbenbhid,");
                parameter = new OracleParameter(":f_cbenbhid", OracleType.VarChar);
                parameter.Value = model.f_cbenbhid;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_jmb> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_jmb model in modelList)
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
            strSql.Append("delete tbl_ld_jmb where  ");
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
            strSql.Append("update tbl_ld_jmb set ");
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
            strSql.Append("select count(*) from tbl_ld_jmb");
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
        public List<sara.dd.ldsw.model.tbl_ld_jmb> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_jmb t where");
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

            List<sara.dd.ldsw.model.tbl_ld_jmb> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_jmb>(resultDataTable);
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
            strSql.Append(" select * from tbl_ld_jmb t where");
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
            strSql.Append(" select * from tbl_ld_jmb t where");
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
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_jmb')";
            sqlString += " where f_tablename  = 'tbl_ld_jmb'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_jmb'";


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
















