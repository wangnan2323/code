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
    /// 数据访问类tbl_ld_jfb 
    /// </summary>
    public class tbl_ld_jfb : sara.dd.ldsw.idal.Itbl_ld_jfb
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_jfb()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_jfb model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
                //if (t == null)
                //{
                    sid = GetMaxId(null).ToString();
                //}
                //else
                //{
                //    sid = GetMaxId(null).ToString();
                //}                 
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
            
            if (model.f_jfbh != null)
            {
	            strSql1.Append("f_jfbh,");
	            strSql2.Append("'" + (model.f_jfbh) + "',");
	            strSql3.Append(":f_jfbh,");
	            parameter = new OracleParameter(":f_jfbh", OracleType.VarChar);
	            parameter.Value = model.f_jfbh;
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
            
            if (model.f_jfrq != null)
            {
	            strSql1.Append("f_jfrq,");
	            strSql2.Append("to_date('" + model.f_jfrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_jfrq,");
	            parameter = new OracleParameter(":f_jfrq", OracleType.DateTime);
	            parameter.Value = model.f_jfrq;
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
            
            
            if (model.f_jcfs != null)
            {
	            strSql1.Append("f_jcfs,");
	            strSql2.Append("'" + (model.f_jcfs) + "',");
	            strSql3.Append(":f_jcfs,");
	            parameter = new OracleParameter(":f_jcfs", OracleType.VarChar);
	            parameter.Value = model.f_jcfs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jcfsid != null)
            {
	            strSql1.Append("f_jcfsid,");
	            strSql2.Append("'" + (model.f_jcfsid) + "',");
	            strSql3.Append(":f_jcfsid,");
	            parameter = new OracleParameter(":f_jcfsid", OracleType.VarChar);
	            parameter.Value = model.f_jcfsid;
	            parameterList.Add(parameter);
            }
            
            
            
            if (model.f_yyy != null)
            {
	            strSql1.Append("f_yyy,");
	            strSql2.Append("'" + (model.f_yyy) + "',");
	            strSql3.Append(":f_yyy,");
	            parameter = new OracleParameter(":f_yyy", OracleType.VarChar);
	            parameter.Value = model.f_yyy;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yyyid != null)
            {
	            strSql1.Append("f_yyyid,");
	            strSql2.Append("'" + (model.f_yyyid) + "',");
	            strSql3.Append(":f_yyyid,");
	            parameter = new OracleParameter(":f_yyyid", OracleType.VarChar);
	            parameter.Value = model.f_yyyid;
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
            
            if (model.f_sfykfp != null)
            {
	            strSql1.Append("f_sfykfp,");
	            strSql2.Append("'" + (model.f_sfykfp) + "',");
	            strSql3.Append(":f_sfykfp,");
	            parameter = new OracleParameter(":f_sfykfp", OracleType.VarChar);
	            parameter.Value = model.f_sfykfp;
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
            
            if (model.f_rs != null)
            {
	            strSql1.Append("f_rs,");
	            strSql2.Append("'" + (model.f_rs) + "',");
	            strSql3.Append(":f_rs,");
	            parameter = new OracleParameter(":f_rs", OracleType.VarChar);
	            parameter.Value = model.f_rs;
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
            
            
            
            
            
            
            
            if (model.f_znjbh != null)
            {
	            strSql1.Append("f_znjbh,");
	            strSql2.Append("'" + (model.f_znjbh) + "',");
	            strSql3.Append(":f_znjbh,");
	            parameter = new OracleParameter(":f_znjbh", OracleType.VarChar);
	            parameter.Value = model.f_znjbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_znjbhid != null)
            {
	            strSql1.Append("f_znjbhid,");
	            strSql2.Append("'" + (model.f_znjbhid) + "',");
	            strSql3.Append(":f_znjbhid,");
	            parameter = new OracleParameter(":f_znjbhid", OracleType.VarChar);
	            parameter.Value = model.f_znjbhid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_znjje != null)
            {
	            strSql1.Append("f_znjje,");
	            strSql2.Append("'" + (model.f_znjje) + "',");
	            strSql3.Append(":f_znjje,");
	            parameter = new OracleParameter(":f_znjje", OracleType.VarChar);
	            parameter.Value = model.f_znjje;
	            parameterList.Add(parameter);
            }
            
            if (model.f_fjbh != null)
            {
	            strSql1.Append("f_fjbh,");
	            strSql2.Append("'" + (model.f_fjbh) + "',");
	            strSql3.Append(":f_fjbh,");
	            parameter = new OracleParameter(":f_fjbh", OracleType.VarChar);
	            parameter.Value = model.f_fjbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_fjbhid != null)
            {
	            strSql1.Append("f_fjbhid,");
	            strSql2.Append("'" + (model.f_fjbhid) + "',");
	            strSql3.Append(":f_fjbhid,");
	            parameter = new OracleParameter(":f_fjbhid", OracleType.VarChar);
	            parameter.Value = model.f_fjbhid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_fjje != null)
            {
	            strSql1.Append("f_fjje,");
	            strSql2.Append("'" + (model.f_fjje) + "',");
	            strSql3.Append(":f_fjje,");
	            parameter = new OracleParameter(":f_fjje", OracleType.VarChar);
	            parameter.Value = model.f_fjje;
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
                strSql2.Append("'" + (model.f_yyt) + "',");
                strSql3.Append(":f_yytid,");
                parameter = new OracleParameter(":f_yytid", OracleType.VarChar);
                parameter.Value = model.f_yytid;
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
            if (model.f_cbyslj != null)
            {
	            strSql1.Append("f_cbyslj,");
	            strSql2.Append("'" + (model.f_cbyslj) + "',");
	            strSql3.Append(":f_cbyslj,");
	            parameter = new OracleParameter(":f_cbyslj", OracleType.VarChar);
	            parameter.Value = model.f_cbyslj;
	            parameterList.Add(parameter);
            }
            if (model.f_sllj != null)
            {
	            strSql1.Append("f_sllj,");
	            strSql2.Append("'" + (model.f_sllj) + "',");
	            strSql3.Append(":f_sllj,");
	            parameter = new OracleParameter(":f_sllj", OracleType.VarChar);
	            parameter.Value = model.f_sllj;
	            parameterList.Add(parameter);
            }
            if (model.f_sflj != null)
            {
	            strSql1.Append("f_sflj,");
	            strSql2.Append("'" + (model.f_sflj) + "',");
	            strSql3.Append(":f_sflj,");
	            parameter = new OracleParameter(":f_sflj", OracleType.VarChar);
	            parameter.Value = model.f_sflj;
	            parameterList.Add(parameter);
            }
            if (model.f_pwflj != null)
            {
	            strSql1.Append("f_pwflj,");
	            strSql2.Append("'" + (model.f_pwflj) + "',");
	            strSql3.Append(":f_pwflj,");
	            parameter = new OracleParameter(":f_pwflj", OracleType.VarChar);
	            parameter.Value = model.f_pwflj;
	            parameterList.Add(parameter);
            }
            if (model.f_jmhyslj != null)
            {
	            strSql1.Append("f_jmhyslj,");
	            strSql2.Append("'" + (model.f_jmhyslj) + "',");
	            strSql3.Append(":f_jmhyslj,");
	            parameter = new OracleParameter(":f_jmhyslj", OracleType.VarChar);
	            parameter.Value = model.f_jmhyslj;
	            parameterList.Add(parameter);
            }
            if (model.f_jmjelj != null)
            {
                strSql1.Append("f_jmjelj,");
                strSql2.Append("'" + (model.f_jmjelj) + "',");
                strSql3.Append(":f_jmjelj,");
                parameter = new OracleParameter(":f_jmjelj", OracleType.VarChar);
                parameter.Value = model.f_jmjelj;
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
            if (model.f_hszl != null)
            {
	            strSql1.Append("f_hszl,");
	            strSql2.Append("'" + (model.f_hszl) + "',");
	            strSql3.Append(":f_hszl,");
	            parameter = new OracleParameter(":f_hszl", OracleType.VarChar);
	            parameter.Value = model.f_hszl;
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
            if (model.f_ljqf != null)
            {
	            strSql1.Append("f_ljqf,");
	            strSql2.Append("'" + (model.f_ljqf) + "',");
	            strSql3.Append(":f_ljqf,");
	            parameter = new OracleParameter(":f_ljqf", OracleType.VarChar);
	            parameter.Value = model.f_ljqf;
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
            if (model.f_sfjl != null)
            {
                strSql1.Append("f_sfjl,");
                strSql2.Append("'" + (model.f_sfjl) + "',");
                strSql3.Append(":f_sfjl,");
                parameter = new OracleParameter(":f_sfjl", OracleType.VarChar);
                parameter.Value = model.f_sfjl;
                parameterList.Add(parameter);
            }
            strSql.Append("insert into tbl_ld_jfb(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_jfb(");
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
	                string updateSqlString = " update tbl_ld_jfb set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_jfb> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_jfb model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_jfb model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_jfb set ");
            strSql_use.Append("update tbl_ld_jfb set ");
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
            
	            if (model.f_jfbh != null&& columsList.Contains("f_jfbh"))
            {
                strSql.Append("f_jfbh='" + (model.f_jfbh) + "',");
                strSql_use.Append("f_jfbh=:f_jfbh,");
                parameter = new OracleParameter(":f_jfbh", OracleType.VarChar);
                parameter.Value = model.f_jfbh;
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
            
	            if (model.f_jfrq != null&& columsList.Contains("f_jfrq"))
            {
                strSql.Append("f_jfrq=to_date('" + model.f_jfrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_jfrq=:f_jfrq,");
                parameter = new OracleParameter(":f_jfrq", OracleType.DateTime);
                parameter.Value = model.f_jfrq;
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
            
	            
            
	            if (model.f_jcfs != null&& columsList.Contains("f_jcfs"))
            {
                strSql.Append("f_jcfs='" + (model.f_jcfs) + "',");
                strSql_use.Append("f_jcfs=:f_jcfs,");
                parameter = new OracleParameter(":f_jcfs", OracleType.VarChar);
                parameter.Value = model.f_jcfs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jcfsid != null&& columsList.Contains("f_jcfsid"))
            {
                strSql.Append("f_jcfsid='" + (model.f_jcfsid) + "',");
                strSql_use.Append("f_jcfsid=:f_jcfsid,");
                parameter = new OracleParameter(":f_jcfsid", OracleType.VarChar);
                parameter.Value = model.f_jcfsid;
                parameterList.Add(parameter);
            }
            
            
	            if (model.f_yyy != null&& columsList.Contains("f_yyy"))
            {
                strSql.Append("f_yyy='" + (model.f_yyy) + "',");
                strSql_use.Append("f_yyy=:f_yyy,");
                parameter = new OracleParameter(":f_yyy", OracleType.VarChar);
                parameter.Value = model.f_yyy;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yyyid != null&& columsList.Contains("f_yyyid"))
            {
                strSql.Append("f_yyyid='" + (model.f_yyyid) + "',");
                strSql_use.Append("f_yyyid=:f_yyyid,");
                parameter = new OracleParameter(":f_yyyid", OracleType.VarChar);
                parameter.Value = model.f_yyyid;
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
            
	            if (model.f_sfykfp != null&& columsList.Contains("f_sfykfp"))
            {
                strSql.Append("f_sfykfp='" + (model.f_sfykfp) + "',");
                strSql_use.Append("f_sfykfp=:f_sfykfp,");
                parameter = new OracleParameter(":f_sfykfp", OracleType.VarChar);
                parameter.Value = model.f_sfykfp;
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
            
	            if (model.f_rs != null&& columsList.Contains("f_rs"))
            {
                strSql.Append("f_rs='" + (model.f_rs) + "',");
                strSql_use.Append("f_rs=:f_rs,");
                parameter = new OracleParameter(":f_rs", OracleType.VarChar);
                parameter.Value = model.f_rs;
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
            
	            
            
	        
            
	            
            
	            if (model.f_znjbh != null&& columsList.Contains("f_znjbh"))
            {
                strSql.Append("f_znjbh='" + (model.f_znjbh) + "',");
                strSql_use.Append("f_znjbh=:f_znjbh,");
                parameter = new OracleParameter(":f_znjbh", OracleType.VarChar);
                parameter.Value = model.f_znjbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_znjbhid != null&& columsList.Contains("f_znjbhid"))
            {
                strSql.Append("f_znjbhid='" + (model.f_znjbhid) + "',");
                strSql_use.Append("f_znjbhid=:f_znjbhid,");
                parameter = new OracleParameter(":f_znjbhid", OracleType.VarChar);
                parameter.Value = model.f_znjbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_znjje != null&& columsList.Contains("f_znjje"))
            {
                strSql.Append("f_znjje='" + (model.f_znjje) + "',");
                strSql_use.Append("f_znjje=:f_znjje,");
                parameter = new OracleParameter(":f_znjje", OracleType.VarChar);
                parameter.Value = model.f_znjje;
                parameterList.Add(parameter);
            }
            
	            if (model.f_fjbh != null&& columsList.Contains("f_fjbh"))
            {
                strSql.Append("f_fjbh='" + (model.f_fjbh) + "',");
                strSql_use.Append("f_fjbh=:f_fjbh,");
                parameter = new OracleParameter(":f_fjbh", OracleType.VarChar);
                parameter.Value = model.f_fjbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_fjbhid != null&& columsList.Contains("f_fjbhid"))
            {
                strSql.Append("f_fjbhid='" + (model.f_fjbhid) + "',");
                strSql_use.Append("f_fjbhid=:f_fjbhid,");
                parameter = new OracleParameter(":f_fjbhid", OracleType.VarChar);
                parameter.Value = model.f_fjbhid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_fjje != null&& columsList.Contains("f_fjje"))
            {
                strSql.Append("f_fjje='" + (model.f_fjje) + "',");
                strSql_use.Append("f_fjje=:f_fjje,");
                parameter = new OracleParameter(":f_fjje", OracleType.VarChar);
                parameter.Value = model.f_fjje;
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
	            if (model.f_dj != null&& columsList.Contains("f_dj"))
            {
                strSql.Append("f_dj='" + (model.f_dj) + "',");
                strSql_use.Append("f_dj=:f_dj,");
                parameter = new OracleParameter(":f_dj", OracleType.VarChar);
                parameter.Value = model.f_dj;
                parameterList.Add(parameter);
            }
	            if (model.f_cbyslj != null&& columsList.Contains("f_cbyslj"))
            {
                strSql.Append("f_cbyslj='" + (model.f_cbyslj) + "',");
                strSql_use.Append("f_cbyslj=:f_cbyslj,");
                parameter = new OracleParameter(":f_cbyslj", OracleType.VarChar);
                parameter.Value = model.f_cbyslj;
                parameterList.Add(parameter);
            }
	            if (model.f_sllj != null&& columsList.Contains("f_sllj"))
            {
                strSql.Append("f_sllj='" + (model.f_sllj) + "',");
                strSql_use.Append("f_sllj=:f_sllj,");
                parameter = new OracleParameter(":f_sllj", OracleType.VarChar);
                parameter.Value = model.f_sllj;
                parameterList.Add(parameter);
            }
	            if (model.f_sflj != null&& columsList.Contains("f_sflj"))
            {
                strSql.Append("f_sflj='" + (model.f_sflj) + "',");
                strSql_use.Append("f_sflj=:f_sflj,");
                parameter = new OracleParameter(":f_sflj", OracleType.VarChar);
                parameter.Value = model.f_sflj;
                parameterList.Add(parameter);
            }
	            if (model.f_pwflj != null&& columsList.Contains("f_pwflj"))
            {
                strSql.Append("f_pwflj='" + (model.f_pwflj) + "',");
                strSql_use.Append("f_pwflj=:f_pwflj,");
                parameter = new OracleParameter(":f_pwflj", OracleType.VarChar);
                parameter.Value = model.f_pwflj;
                parameterList.Add(parameter);
            }
	            if (model.f_jmhyslj != null&& columsList.Contains("f_jmhyslj"))
            {
                strSql.Append("f_jmhyslj='" + (model.f_jmhyslj) + "',");
                strSql_use.Append("f_jmhyslj=:f_jmhyslj,");
                parameter = new OracleParameter(":f_jmhyslj", OracleType.VarChar);
                parameter.Value = model.f_jmhyslj;
                parameterList.Add(parameter);
            }
            if (model.f_jmjelj != null && columsList.Contains("f_jmjelj"))
            {
                strSql.Append("f_jmjelj='" + (model.f_jmjelj) + "',");
                strSql_use.Append("f_jmjelj=:f_jmjelj,");
                parameter = new OracleParameter(":f_jmjelj", OracleType.VarChar);
                parameter.Value = model.f_jmjelj;
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
	            if (model.f_hszl != null&& columsList.Contains("f_hszl"))
            {
                strSql.Append("f_hszl='" + (model.f_hszl) + "',");
                strSql_use.Append("f_hszl=:f_hszl,");
                parameter = new OracleParameter(":f_hszl", OracleType.VarChar);
                parameter.Value = model.f_hszl;
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
	            if (model.f_ljqf != null&& columsList.Contains("f_ljqf"))
            {
                strSql.Append("f_ljqf='" + (model.f_ljqf) + "',");
                strSql_use.Append("f_ljqf=:f_ljqf,");
                parameter = new OracleParameter(":f_ljqf", OracleType.VarChar);
                parameter.Value = model.f_ljqf;
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
            if (model.f_sfjl != null && columsList.Contains("f_sfjl"))
            {
                strSql.Append("f_sfjl='" + (model.f_sfjl) + "',");
                strSql_use.Append("f_sfjl=:f_sfjl,");
                parameter = new OracleParameter(":f_sfjl", OracleType.VarChar);
                parameter.Value = model.f_sfjl;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_jfb> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_jfb model in modelList)
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
            strSql.Append("delete tbl_ld_jfb where  ");
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
            strSql.Append("update tbl_ld_jfb set ");
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
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("jf", cxzxsjString) == true)
            {
                strSql.Append(" select sum(c) from  ");
                strSql.Append(" ( ");
                strSql.Append(" select count(*) as c  from tbl_ld_jfb ");
                if (whereString.Trim() != "")
                {
                    strSql.Append(" where " + whereString);
                }
                strSql.Append(" union all ");
                strSql.Append(" select count(*) as c  from tbl_ld_jfb_his  ");
                if (whereString.Trim() != "")
                {
                    strSql.Append(" where " + whereString);
                }
                strSql.Append(" ) ");
            }
            else
            {
            strSql.Append("select count(*) from tbl_ld_jfb");
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
        public List<sara.dd.ldsw.model.tbl_ld_jfb> GetList(string whereString, string cxzxsjString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("jf", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_jfb t where ");
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
                strSql.Append("  (select * from tbl_ld_jfb_his t where  ");
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
            strSql.Append(" select * from tbl_ld_jfb t where");
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

            List<sara.dd.ldsw.model.tbl_ld_jfb> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_jfb>(resultDataTable);
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
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("jf", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_jfb t where ");
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
                strSql.Append("  (select * from tbl_ld_jfb_his t where  ");
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
            strSql.Append(" select * from tbl_ld_jfb t where");
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
            if (sara.dd.ldsw.commonclass.commonclass.isNeedHis("jf", cxzxsjString) == true)
            {
                strSql.Append("  select * from  ");
                strSql.Append("  ( ");
                strSql.Append("  (select * from tbl_ld_jfb t where ");
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
                strSql.Append("  (select * from tbl_ld_jfb_his t where  ");
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
            strSql.Append(" select * from tbl_ld_jfb t where");
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
            //sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_jfb')";
            //sqlString += " where f_tablename  = 'tbl_ld_jfb'";

            //if (t == null)
            //{
            //    _iAccessData.ExecuteSql(sqlString);
            //}
            //else
            //{
            //    t.ExecuteSql(sqlString);
            //}

            // sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_jfb'";
            string sqlString = "";
            sqlString = "select TBL_LD_JFB_SYS_ID_SEQU.NEXTVAL from dual";
            return _iAccessData.GetSingle(sqlString).ToString();

            //if (t == null)
            //{
            //    return _iAccessData.GetSingle(sqlString).ToString();
            //}
            //else
            //{
            //    return t.GetSingle(sqlString).ToString();
            //}
        }


        #endregion 成员方法
    }
}
















