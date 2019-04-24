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
    /// 数据访问类tbl_ld_pllhyl 
    /// </summary>
    public class tbl_ld_pllhyl : sara.dd.ldsw.idal.Itbl_ld_pllhyl
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_pllhyl()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_pllhyl model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.fk_tbl_ld_pllhlb_sys_id != null)
            {
	            strSql1.Append("fk_tbl_ld_pllhlb_sys_id,");
	            strSql2.Append("'" + (model.fk_tbl_ld_pllhlb_sys_id) + "',");
	            strSql3.Append(":fk_tbl_ld_pllhlb_sys_id,");
	            parameter = new OracleParameter(":fk_tbl_ld_pllhlb_sys_id", OracleType.VarChar);
	            parameter.Value = model.fk_tbl_ld_pllhlb_sys_id;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yzqk != null)
            {
	            strSql1.Append("f_yzqk,");
	            strSql2.Append("'" + (model.f_yzqk) + "',");
	            strSql3.Append(":f_yzqk,");
	            parameter = new OracleParameter(":f_yzqk", OracleType.VarChar);
	            parameter.Value = model.f_yzqk;
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
            
            if (model.f_ycje != null)
            {
	            strSql1.Append("f_ycje,");
	            strSql2.Append("'" + (model.f_ycje) + "',");
	            strSql3.Append(":f_ycje,");
	            parameter = new OracleParameter(":f_ycje", OracleType.VarChar);
	            parameter.Value = model.f_ycje;
	            parameterList.Add(parameter);
            }
            
            if (model.f_tbbh != null)
            {
	            strSql1.Append("f_tbbh,");
	            strSql2.Append("'" + (model.f_tbbh) + "',");
	            strSql3.Append(":f_tbbh,");
	            parameter = new OracleParameter(":f_tbbh", OracleType.VarChar);
	            parameter.Value = model.f_tbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khzt != null)
            {
	            strSql1.Append("f_khzt,");
	            strSql2.Append("'" + (model.f_khzt) + "',");
	            strSql3.Append(":f_khzt,");
	            parameter = new OracleParameter(":f_khzt", OracleType.VarChar);
	            parameter.Value = model.f_khzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khztid != null)
            {
	            strSql1.Append("f_khztid,");
	            strSql2.Append("'" + (model.f_khztid) + "',");
	            strSql3.Append(":f_khztid,");
	            parameter = new OracleParameter(":f_khztid", OracleType.VarChar);
	            parameter.Value = model.f_khztid;
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
            
            if (model.f_djjzsf != null)
            {
	            strSql1.Append("f_djjzsf,");
	            strSql2.Append("'" + (model.f_djjzsf) + "',");
	            strSql3.Append(":f_djjzsf,");
	            parameter = new OracleParameter(":f_djjzsf", OracleType.VarChar);
	            parameter.Value = model.f_djjzsf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sfjlbjf != null)
            {
	            strSql1.Append("f_sfjlbjf,");
	            strSql2.Append("'" + (model.f_sfjlbjf) + "',");
	            strSql3.Append(":f_sfjlbjf,");
	            parameter = new OracleParameter(":f_sfjlbjf", OracleType.VarChar);
	            parameter.Value = model.f_sfjlbjf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sqysl != null)
            {
	            strSql1.Append("f_sqysl,");
	            strSql2.Append("'" + (model.f_sqysl) + "',");
	            strSql3.Append(":f_sqysl,");
	            parameter = new OracleParameter(":f_sqysl", OracleType.VarChar);
	            parameter.Value = model.f_sqysl;
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
            
            if (model.f_djjzpwf != null)
            {
	            strSql1.Append("f_djjzpwf,");
	            strSql2.Append("'" + (model.f_djjzpwf) + "',");
	            strSql3.Append(":f_djjzpwf,");
	            parameter = new OracleParameter(":f_djjzpwf", OracleType.VarChar);
	            parameter.Value = model.f_djjzpwf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_ickljgl != null)
            {
	            strSql1.Append("f_ickljgl,");
	            strSql2.Append("'" + (model.f_ickljgl) + "',");
	            strSql3.Append(":f_ickljgl,");
	            parameter = new OracleParameter(":f_ickljgl", OracleType.VarChar);
	            parameter.Value = model.f_ickljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jhysl != null)
            {
	            strSql1.Append("f_jhysl,");
	            strSql2.Append("'" + (model.f_jhysl) + "',");
	            strSql3.Append(":f_jhysl,");
	            parameter = new OracleParameter(":f_jhysl", OracleType.VarChar);
	            parameter.Value = model.f_jhysl;
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
            
            if (model.f_ljqf != null)
            {
	            strSql1.Append("f_ljqf,");
	            strSql2.Append("'" + (model.f_ljqf) + "',");
	            strSql3.Append(":f_ljqf,");
	            parameter = new OracleParameter(":f_ljqf", OracleType.VarChar);
	            parameter.Value = model.f_ljqf;
	            parameterList.Add(parameter);
            }
            
            if (model.f_zhcbrq != null)
            {
	            strSql1.Append("f_zhcbrq,");
	            strSql2.Append("to_date('" + model.f_zhcbrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_zhcbrq,");
	            parameter = new OracleParameter(":f_zhcbrq", OracleType.DateTime);
	            parameter.Value = model.f_zhcbrq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khbz != null)
            {
	            strSql1.Append("f_khbz,");
	            strSql2.Append("'" + (model.f_khbz) + "',");
	            strSql3.Append(":f_khbz,");
	            parameter = new OracleParameter(":f_khbz", OracleType.VarChar);
	            parameter.Value = model.f_khbz;
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
            
            if (model.f_cbxh != null)
            {
	            strSql1.Append("f_cbxh,");
	            strSql2.Append("'" + (model.f_cbxh) + "',");
	            strSql3.Append(":f_cbxh,");
	            parameter = new OracleParameter(":f_cbxh", OracleType.VarChar);
	            parameter.Value = model.f_cbxh;
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
            
            if (model.f_cbzq != null)
            {
	            strSql1.Append("f_cbzq,");
	            strSql2.Append("'" + (model.f_cbzq) + "',");
	            strSql3.Append(":f_cbzq,");
	            parameter = new OracleParameter(":f_cbzq", OracleType.VarChar);
	            parameter.Value = model.f_cbzq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbyxm != null)
            {
	            strSql1.Append("f_cbyxm,");
	            strSql2.Append("'" + (model.f_cbyxm) + "',");
	            strSql3.Append(":f_cbyxm,");
	            parameter = new OracleParameter(":f_cbyxm", OracleType.VarChar);
	            parameter.Value = model.f_cbyxm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_cbyxmid != null)
            {
	            strSql1.Append("f_cbyxmid,");
	            strSql2.Append("'" + (model.f_cbyxmid) + "',");
	            strSql3.Append(":f_cbyxmid,");
	            parameter = new OracleParameter(":f_cbyxmid", OracleType.VarChar);
	            parameter.Value = model.f_cbyxmid;
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
            
            if (model.f_dh != null)
            {
	            strSql1.Append("f_dh,");
	            strSql2.Append("'" + (model.f_dh) + "',");
	            strSql3.Append(":f_dh,");
	            parameter = new OracleParameter(":f_dh", OracleType.VarChar);
	            parameter.Value = model.f_dh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_jyhh != null)
            {
	            strSql1.Append("f_jyhh,");
	            strSql2.Append("'" + (model.f_jyhh) + "',");
	            strSql3.Append(":f_jyhh,");
	            parameter = new OracleParameter(":f_jyhh", OracleType.VarChar);
	            parameter.Value = model.f_jyhh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhfz != null)
            {
	            strSql1.Append("f_yhfz,");
	            strSql2.Append("'" + (model.f_yhfz) + "',");
	            strSql3.Append(":f_yhfz,");
	            parameter = new OracleParameter(":f_yhfz", OracleType.VarChar);
	            parameter.Value = model.f_yhfz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhfzid != null)
            {
	            strSql1.Append("f_yhfzid,");
	            strSql2.Append("'" + (model.f_yhfzid) + "',");
	            strSql3.Append(":f_yhfzid,");
	            parameter = new OracleParameter(":f_yhfzid", OracleType.VarChar);
	            parameter.Value = model.f_yhfzid;
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
            
            if (model.f_dz != null)
            {
	            strSql1.Append("f_dz,");
	            strSql2.Append("'" + (model.f_dz) + "',");
	            strSql3.Append(":f_dz,");
	            parameter = new OracleParameter(":f_dz", OracleType.VarChar);
	            parameter.Value = model.f_dz;
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
            
            if (model.f_khrq != null)
            {
	            strSql1.Append("f_khrq,");
	            strSql2.Append("to_date('" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_khrq,");
	            parameter = new OracleParameter(":f_khrq", OracleType.DateTime);
	            parameter.Value = model.f_khrq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_htbh != null)
            {
	            strSql1.Append("f_htbh,");
	            strSql2.Append("'" + (model.f_htbh) + "',");
	            strSql3.Append(":f_htbh,");
	            parameter = new OracleParameter(":f_htbh", OracleType.VarChar);
	            parameter.Value = model.f_htbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_htfj != null)
            {
	            strSql1.Append("f_htfj,");
	            strSql2.Append("'" + (model.f_htfj) + "',");
	            strSql3.Append(":f_htfj,");
	            parameter = new OracleParameter(":f_htfj", OracleType.VarChar);
	            parameter.Value = model.f_htfj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sfzzs != null)
            {
	            strSql1.Append("f_sfzzs,");
	            strSql2.Append("'" + (model.f_sfzzs) + "',");
	            strSql3.Append(":f_sfzzs,");
	            parameter = new OracleParameter(":f_sfzzs", OracleType.VarChar);
	            parameter.Value = model.f_sfzzs;
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
            
            if (model.f_sfts != null)
            {
	            strSql1.Append("f_sfts,");
	            strSql2.Append("'" + (model.f_sfts) + "',");
	            strSql3.Append(":f_sfts,");
	            parameter = new OracleParameter(":f_sfts", OracleType.VarChar);
	            parameter.Value = model.f_sfts;
	            parameterList.Add(parameter);
            }
            
            if (model.f_htqdrq != null)
            {
	            strSql1.Append("f_htqdrq,");
	            strSql2.Append("to_date('" + model.f_htqdrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_htqdrq,");
	            parameter = new OracleParameter(":f_htqdrq", OracleType.DateTime);
	            parameter.Value = model.f_htqdrq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_qtfj != null)
            {
	            strSql1.Append("f_qtfj,");
	            strSql2.Append("'" + (model.f_qtfj) + "',");
	            strSql3.Append(":f_qtfj,");
	            parameter = new OracleParameter(":f_qtfj", OracleType.VarChar);
	            parameter.Value = model.f_qtfj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhzt != null)
            {
	            strSql1.Append("f_yhzt,");
	            strSql2.Append("'" + (model.f_yhzt) + "',");
	            strSql3.Append(":f_yhzt,");
	            parameter = new OracleParameter(":f_yhzt", OracleType.VarChar);
	            parameter.Value = model.f_yhzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhztid != null)
            {
	            strSql1.Append("f_yhztid,");
	            strSql2.Append("'" + (model.f_yhztid) + "',");
	            strSql3.Append(":f_yhztid,");
	            parameter = new OracleParameter(":f_yhztid", OracleType.VarChar);
	            parameter.Value = model.f_yhztid;
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
            
            if (model.f_tsyx != null)
            {
	            strSql1.Append("f_tsyx,");
	            strSql2.Append("'" + (model.f_tsyx) + "',");
	            strSql3.Append(":f_tsyx,");
	            parameter = new OracleParameter(":f_tsyx", OracleType.VarChar);
	            parameter.Value = model.f_tsyx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_tsyxid != null)
            {
	            strSql1.Append("f_tsyxid,");
	            strSql2.Append("'" + (model.f_tsyxid) + "',");
	            strSql3.Append(":f_tsyxid,");
	            parameter = new OracleParameter(":f_tsyxid", OracleType.VarChar);
	            parameter.Value = model.f_tsyxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sfzh != null)
            {
	            strSql1.Append("f_sfzh,");
	            strSql2.Append("'" + (model.f_sfzh) + "',");
	            strSql3.Append(":f_sfzh,");
	            parameter = new OracleParameter(":f_sfzh", OracleType.VarChar);
	            parameter.Value = model.f_sfzh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sfzfj != null)
            {
	            strSql1.Append("f_sfzfj,");
	            strSql2.Append("'" + (model.f_sfzfj) + "',");
	            strSql3.Append(":f_sfzfj,");
	            parameter = new OracleParameter(":f_sfzfj", OracleType.VarChar);
	            parameter.Value = model.f_sfzfj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_yhbz != null)
            {
	            strSql1.Append("f_yhbz,");
	            strSql2.Append("'" + (model.f_yhbz) + "',");
	            strSql3.Append(":f_yhbz,");
	            parameter = new OracleParameter(":f_yhbz", OracleType.VarChar);
	            parameter.Value = model.f_yhbz;
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
            
            if (model.f_tsyxzh != null)
            {
	            strSql1.Append("f_tsyxzh,");
	            strSql2.Append("'" + (model.f_tsyxzh) + "',");
	            strSql3.Append(":f_tsyxzh,");
	            parameter = new OracleParameter(":f_tsyxzh", OracleType.VarChar);
	            parameter.Value = model.f_tsyxzh;
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
            
            if (model.f_sbpp != null)
            {
	            strSql1.Append("f_sbpp,");
	            strSql2.Append("'" + (model.f_sbpp) + "',");
	            strSql3.Append(":f_sbpp,");
	            parameter = new OracleParameter(":f_sbpp", OracleType.VarChar);
	            parameter.Value = model.f_sbpp;
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
            
            if (model.f_mph != null)
            {
	            strSql1.Append("f_mph,");
	            strSql2.Append("'" + (model.f_mph) + "',");
	            strSql3.Append(":f_mph,");
	            parameter = new OracleParameter(":f_mph", OracleType.VarChar);
	            parameter.Value = model.f_mph;
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
            
            if (model.f_sbdz != null)
            {
	            strSql1.Append("f_sbdz,");
	            strSql2.Append("'" + (model.f_sbdz) + "',");
	            strSql3.Append(":f_sbdz,");
	            parameter = new OracleParameter(":f_sbdz", OracleType.VarChar);
	            parameter.Value = model.f_sbdz;
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
            
            if (model.f_rs != null)
            {
	            strSql1.Append("f_rs,");
	            strSql2.Append("'" + (model.f_rs) + "',");
	            strSql3.Append(":f_rs,");
	            parameter = new OracleParameter(":f_rs", OracleType.VarChar);
	            parameter.Value = model.f_rs;
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
            
            if (model.f_ljgl != null)
            {
	            strSql1.Append("f_ljgl,");
	            strSql2.Append("'" + (model.f_ljgl) + "',");
	            strSql3.Append(":f_ljgl,");
	            parameter = new OracleParameter(":f_ljgl", OracleType.VarChar);
	            parameter.Value = model.f_ljgl;
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
            
            if (model.f_sbzt != null)
            {
	            strSql1.Append("f_sbzt,");
	            strSql2.Append("'" + (model.f_sbzt) + "',");
	            strSql3.Append(":f_sbzt,");
	            parameter = new OracleParameter(":f_sbzt", OracleType.VarChar);
	            parameter.Value = model.f_sbzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbztid != null)
            {
	            strSql1.Append("f_sbztid,");
	            strSql2.Append("'" + (model.f_sbztid) + "',");
	            strSql3.Append(":f_sbztid,");
	            parameter = new OracleParameter(":f_sbztid", OracleType.VarChar);
	            parameter.Value = model.f_sbztid;
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
            
            if (model.f_azrq != null)
            {
	            strSql1.Append("f_azrq,");
	            strSql2.Append("to_date('" + model.f_azrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_azrq,");
	            parameter = new OracleParameter(":f_azrq", OracleType.DateTime);
	            parameter.Value = model.f_azrq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbfj != null)
            {
	            strSql1.Append("f_sbfj,");
	            strSql2.Append("'" + (model.f_sbfj) + "',");
	            strSql3.Append(":f_sbfj,");
	            parameter = new OracleParameter(":f_sbfj", OracleType.VarChar);
	            parameter.Value = model.f_sbfj;
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
            
            if (model.f_sqzm != null)
            {
	            strSql1.Append("f_sqzm,");
	            strSql2.Append("'" + (model.f_sqzm) + "',");
	            strSql3.Append(":f_sqzm,");
	            parameter = new OracleParameter(":f_sqzm", OracleType.VarChar);
	            parameter.Value = model.f_sqzm;
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
            
            if (model.f_synx != null)
            {
	            strSql1.Append("f_synx,");
	            strSql2.Append("'" + (model.f_synx) + "',");
	            strSql3.Append(":f_synx,");
	            parameter = new OracleParameter(":f_synx", OracleType.VarChar);
	            parameter.Value = model.f_synx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sbbz != null)
            {
	            strSql1.Append("f_sbbz,");
	            strSql2.Append("'" + (model.f_sbbz) + "',");
	            strSql3.Append(":f_sbbz,");
	            parameter = new OracleParameter(":f_sbbz", OracleType.VarChar);
	            parameter.Value = model.f_sbbz;
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
            
            if (model.f_sqsl != null)
            {
	            strSql1.Append("f_sqsl,");
	            strSql2.Append("'" + (model.f_sqsl) + "',");
	            strSql3.Append(":f_sqsl,");
	            parameter = new OracleParameter(":f_sqsl", OracleType.VarChar);
	            parameter.Value = model.f_sqsl;
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
            
            if (model.f_qfzt != null)
            {
	            strSql1.Append("f_qfzt,");
	            strSql2.Append("'" + (model.f_qfzt) + "',");
	            strSql3.Append(":f_qfzt,");
	            parameter = new OracleParameter(":f_qfzt", OracleType.VarChar);
	            parameter.Value = model.f_qfzt;
	            parameterList.Add(parameter);
            }
            
            strSql.Append("insert into tbl_ld_pllhyl(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_pllhyl(");
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
	                string updateSqlString = " update tbl_ld_pllhyl set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_pllhyl> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_pllhyl model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_pllhyl model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_pllhyl set ");
            strSql_use.Append("update tbl_ld_pllhyl set ");
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
            
	            if (model.fk_tbl_ld_pllhlb_sys_id != null&& columsList.Contains("fk_tbl_ld_pllhlb_sys_id"))
            {
                strSql.Append("fk_tbl_ld_pllhlb_sys_id='" + (model.fk_tbl_ld_pllhlb_sys_id) + "',");
                strSql_use.Append("fk_tbl_ld_pllhlb_sys_id=:fk_tbl_ld_pllhlb_sys_id,");
                parameter = new OracleParameter(":fk_tbl_ld_pllhlb_sys_id", OracleType.VarChar);
                parameter.Value = model.fk_tbl_ld_pllhlb_sys_id;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yzqk != null&& columsList.Contains("f_yzqk"))
            {
                strSql.Append("f_yzqk='" + (model.f_yzqk) + "',");
                strSql_use.Append("f_yzqk=:f_yzqk,");
                parameter = new OracleParameter(":f_yzqk", OracleType.VarChar);
                parameter.Value = model.f_yzqk;
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
            
	            if (model.f_ycje != null&& columsList.Contains("f_ycje"))
            {
                strSql.Append("f_ycje='" + (model.f_ycje) + "',");
                strSql_use.Append("f_ycje=:f_ycje,");
                parameter = new OracleParameter(":f_ycje", OracleType.VarChar);
                parameter.Value = model.f_ycje;
                parameterList.Add(parameter);
            }
            
	            if (model.f_tbbh != null&& columsList.Contains("f_tbbh"))
            {
                strSql.Append("f_tbbh='" + (model.f_tbbh) + "',");
                strSql_use.Append("f_tbbh=:f_tbbh,");
                parameter = new OracleParameter(":f_tbbh", OracleType.VarChar);
                parameter.Value = model.f_tbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khzt != null&& columsList.Contains("f_khzt"))
            {
                strSql.Append("f_khzt='" + (model.f_khzt) + "',");
                strSql_use.Append("f_khzt=:f_khzt,");
                parameter = new OracleParameter(":f_khzt", OracleType.VarChar);
                parameter.Value = model.f_khzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khztid != null&& columsList.Contains("f_khztid"))
            {
                strSql.Append("f_khztid='" + (model.f_khztid) + "',");
                strSql_use.Append("f_khztid=:f_khztid,");
                parameter = new OracleParameter(":f_khztid", OracleType.VarChar);
                parameter.Value = model.f_khztid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ztkhh != null&& columsList.Contains("f_ztkhh"))
            {
                strSql.Append("f_ztkhh='" + (model.f_ztkhh) + "',");
                strSql_use.Append("f_ztkhh=:f_ztkhh,");
                parameter = new OracleParameter(":f_ztkhh", OracleType.VarChar);
                parameter.Value = model.f_ztkhh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_djjzsf != null&& columsList.Contains("f_djjzsf"))
            {
                strSql.Append("f_djjzsf='" + (model.f_djjzsf) + "',");
                strSql_use.Append("f_djjzsf=:f_djjzsf,");
                parameter = new OracleParameter(":f_djjzsf", OracleType.VarChar);
                parameter.Value = model.f_djjzsf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sfjlbjf != null&& columsList.Contains("f_sfjlbjf"))
            {
                strSql.Append("f_sfjlbjf='" + (model.f_sfjlbjf) + "',");
                strSql_use.Append("f_sfjlbjf=:f_sfjlbjf,");
                parameter = new OracleParameter(":f_sfjlbjf", OracleType.VarChar);
                parameter.Value = model.f_sfjlbjf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sqysl != null&& columsList.Contains("f_sqysl"))
            {
                strSql.Append("f_sqysl='" + (model.f_sqysl) + "',");
                strSql_use.Append("f_sqysl=:f_sqysl,");
                parameter = new OracleParameter(":f_sqysl", OracleType.VarChar);
                parameter.Value = model.f_sqysl;
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
            
	            if (model.f_djjzpwf != null&& columsList.Contains("f_djjzpwf"))
            {
                strSql.Append("f_djjzpwf='" + (model.f_djjzpwf) + "',");
                strSql_use.Append("f_djjzpwf=:f_djjzpwf,");
                parameter = new OracleParameter(":f_djjzpwf", OracleType.VarChar);
                parameter.Value = model.f_djjzpwf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ickljgl != null&& columsList.Contains("f_ickljgl"))
            {
                strSql.Append("f_ickljgl='" + (model.f_ickljgl) + "',");
                strSql_use.Append("f_ickljgl=:f_ickljgl,");
                parameter = new OracleParameter(":f_ickljgl", OracleType.VarChar);
                parameter.Value = model.f_ickljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jhysl != null&& columsList.Contains("f_jhysl"))
            {
                strSql.Append("f_jhysl='" + (model.f_jhysl) + "',");
                strSql_use.Append("f_jhysl=:f_jhysl,");
                parameter = new OracleParameter(":f_jhysl", OracleType.VarChar);
                parameter.Value = model.f_jhysl;
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
            
	            if (model.f_ljqf != null&& columsList.Contains("f_ljqf"))
            {
                strSql.Append("f_ljqf='" + (model.f_ljqf) + "',");
                strSql_use.Append("f_ljqf=:f_ljqf,");
                parameter = new OracleParameter(":f_ljqf", OracleType.VarChar);
                parameter.Value = model.f_ljqf;
                parameterList.Add(parameter);
            }
            
	            if (model.f_zhcbrq != null&& columsList.Contains("f_zhcbrq"))
            {
                strSql.Append("f_zhcbrq=to_date('" + model.f_zhcbrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_zhcbrq=:f_zhcbrq,");
                parameter = new OracleParameter(":f_zhcbrq", OracleType.DateTime);
                parameter.Value = model.f_zhcbrq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khbz != null&& columsList.Contains("f_khbz"))
            {
                strSql.Append("f_khbz='" + (model.f_khbz) + "',");
                strSql_use.Append("f_khbz=:f_khbz,");
                parameter = new OracleParameter(":f_khbz", OracleType.VarChar);
                parameter.Value = model.f_khbz;
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
            
	            if (model.f_cbxh != null&& columsList.Contains("f_cbxh"))
            {
                strSql.Append("f_cbxh='" + (model.f_cbxh) + "',");
                strSql_use.Append("f_cbxh=:f_cbxh,");
                parameter = new OracleParameter(":f_cbxh", OracleType.VarChar);
                parameter.Value = model.f_cbxh;
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
            
	            if (model.f_cbzq != null&& columsList.Contains("f_cbzq"))
            {
                strSql.Append("f_cbzq='" + (model.f_cbzq) + "',");
                strSql_use.Append("f_cbzq=:f_cbzq,");
                parameter = new OracleParameter(":f_cbzq", OracleType.VarChar);
                parameter.Value = model.f_cbzq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbyxm != null&& columsList.Contains("f_cbyxm"))
            {
                strSql.Append("f_cbyxm='" + (model.f_cbyxm) + "',");
                strSql_use.Append("f_cbyxm=:f_cbyxm,");
                parameter = new OracleParameter(":f_cbyxm", OracleType.VarChar);
                parameter.Value = model.f_cbyxm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_cbyxmid != null&& columsList.Contains("f_cbyxmid"))
            {
                strSql.Append("f_cbyxmid='" + (model.f_cbyxmid) + "',");
                strSql_use.Append("f_cbyxmid=:f_cbyxmid,");
                parameter = new OracleParameter(":f_cbyxmid", OracleType.VarChar);
                parameter.Value = model.f_cbyxmid;
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
            
	            if (model.f_dh != null&& columsList.Contains("f_dh"))
            {
                strSql.Append("f_dh='" + (model.f_dh) + "',");
                strSql_use.Append("f_dh=:f_dh,");
                parameter = new OracleParameter(":f_dh", OracleType.VarChar);
                parameter.Value = model.f_dh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jyhh != null&& columsList.Contains("f_jyhh"))
            {
                strSql.Append("f_jyhh='" + (model.f_jyhh) + "',");
                strSql_use.Append("f_jyhh=:f_jyhh,");
                parameter = new OracleParameter(":f_jyhh", OracleType.VarChar);
                parameter.Value = model.f_jyhh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhfz != null&& columsList.Contains("f_yhfz"))
            {
                strSql.Append("f_yhfz='" + (model.f_yhfz) + "',");
                strSql_use.Append("f_yhfz=:f_yhfz,");
                parameter = new OracleParameter(":f_yhfz", OracleType.VarChar);
                parameter.Value = model.f_yhfz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhfzid != null&& columsList.Contains("f_yhfzid"))
            {
                strSql.Append("f_yhfzid='" + (model.f_yhfzid) + "',");
                strSql_use.Append("f_yhfzid=:f_yhfzid,");
                parameter = new OracleParameter(":f_yhfzid", OracleType.VarChar);
                parameter.Value = model.f_yhfzid;
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
            
	            if (model.f_dz != null&& columsList.Contains("f_dz"))
            {
                strSql.Append("f_dz='" + (model.f_dz) + "',");
                strSql_use.Append("f_dz=:f_dz,");
                parameter = new OracleParameter(":f_dz", OracleType.VarChar);
                parameter.Value = model.f_dz;
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
            
	            if (model.f_khrq != null&& columsList.Contains("f_khrq"))
            {
                strSql.Append("f_khrq=to_date('" + model.f_khrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_khrq=:f_khrq,");
                parameter = new OracleParameter(":f_khrq", OracleType.DateTime);
                parameter.Value = model.f_khrq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_htbh != null&& columsList.Contains("f_htbh"))
            {
                strSql.Append("f_htbh='" + (model.f_htbh) + "',");
                strSql_use.Append("f_htbh=:f_htbh,");
                parameter = new OracleParameter(":f_htbh", OracleType.VarChar);
                parameter.Value = model.f_htbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_htfj != null&& columsList.Contains("f_htfj"))
            {
                strSql.Append("f_htfj='" + (model.f_htfj) + "',");
                strSql_use.Append("f_htfj=:f_htfj,");
                parameter = new OracleParameter(":f_htfj", OracleType.VarChar);
                parameter.Value = model.f_htfj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sfzzs != null&& columsList.Contains("f_sfzzs"))
            {
                strSql.Append("f_sfzzs='" + (model.f_sfzzs) + "',");
                strSql_use.Append("f_sfzzs=:f_sfzzs,");
                parameter = new OracleParameter(":f_sfzzs", OracleType.VarChar);
                parameter.Value = model.f_sfzzs;
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
            
	            if (model.f_sfts != null&& columsList.Contains("f_sfts"))
            {
                strSql.Append("f_sfts='" + (model.f_sfts) + "',");
                strSql_use.Append("f_sfts=:f_sfts,");
                parameter = new OracleParameter(":f_sfts", OracleType.VarChar);
                parameter.Value = model.f_sfts;
                parameterList.Add(parameter);
            }
            
	            if (model.f_htqdrq != null&& columsList.Contains("f_htqdrq"))
            {
                strSql.Append("f_htqdrq=to_date('" + model.f_htqdrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_htqdrq=:f_htqdrq,");
                parameter = new OracleParameter(":f_htqdrq", OracleType.DateTime);
                parameter.Value = model.f_htqdrq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_qtfj != null&& columsList.Contains("f_qtfj"))
            {
                strSql.Append("f_qtfj='" + (model.f_qtfj) + "',");
                strSql_use.Append("f_qtfj=:f_qtfj,");
                parameter = new OracleParameter(":f_qtfj", OracleType.VarChar);
                parameter.Value = model.f_qtfj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhzt != null&& columsList.Contains("f_yhzt"))
            {
                strSql.Append("f_yhzt='" + (model.f_yhzt) + "',");
                strSql_use.Append("f_yhzt=:f_yhzt,");
                parameter = new OracleParameter(":f_yhzt", OracleType.VarChar);
                parameter.Value = model.f_yhzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhztid != null&& columsList.Contains("f_yhztid"))
            {
                strSql.Append("f_yhztid='" + (model.f_yhztid) + "',");
                strSql_use.Append("f_yhztid=:f_yhztid,");
                parameter = new OracleParameter(":f_yhztid", OracleType.VarChar);
                parameter.Value = model.f_yhztid;
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
            
	            if (model.f_tsyx != null&& columsList.Contains("f_tsyx"))
            {
                strSql.Append("f_tsyx='" + (model.f_tsyx) + "',");
                strSql_use.Append("f_tsyx=:f_tsyx,");
                parameter = new OracleParameter(":f_tsyx", OracleType.VarChar);
                parameter.Value = model.f_tsyx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_tsyxid != null&& columsList.Contains("f_tsyxid"))
            {
                strSql.Append("f_tsyxid='" + (model.f_tsyxid) + "',");
                strSql_use.Append("f_tsyxid=:f_tsyxid,");
                parameter = new OracleParameter(":f_tsyxid", OracleType.VarChar);
                parameter.Value = model.f_tsyxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sfzh != null&& columsList.Contains("f_sfzh"))
            {
                strSql.Append("f_sfzh='" + (model.f_sfzh) + "',");
                strSql_use.Append("f_sfzh=:f_sfzh,");
                parameter = new OracleParameter(":f_sfzh", OracleType.VarChar);
                parameter.Value = model.f_sfzh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sfzfj != null&& columsList.Contains("f_sfzfj"))
            {
                strSql.Append("f_sfzfj='" + (model.f_sfzfj) + "',");
                strSql_use.Append("f_sfzfj=:f_sfzfj,");
                parameter = new OracleParameter(":f_sfzfj", OracleType.VarChar);
                parameter.Value = model.f_sfzfj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_yhbz != null&& columsList.Contains("f_yhbz"))
            {
                strSql.Append("f_yhbz='" + (model.f_yhbz) + "',");
                strSql_use.Append("f_yhbz=:f_yhbz,");
                parameter = new OracleParameter(":f_yhbz", OracleType.VarChar);
                parameter.Value = model.f_yhbz;
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
            
	            if (model.f_tsyxzh != null&& columsList.Contains("f_tsyxzh"))
            {
                strSql.Append("f_tsyxzh='" + (model.f_tsyxzh) + "',");
                strSql_use.Append("f_tsyxzh=:f_tsyxzh,");
                parameter = new OracleParameter(":f_tsyxzh", OracleType.VarChar);
                parameter.Value = model.f_tsyxzh;
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
            
	            if (model.f_sbpp != null&& columsList.Contains("f_sbpp"))
            {
                strSql.Append("f_sbpp='" + (model.f_sbpp) + "',");
                strSql_use.Append("f_sbpp=:f_sbpp,");
                parameter = new OracleParameter(":f_sbpp", OracleType.VarChar);
                parameter.Value = model.f_sbpp;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ztsbh != null&& columsList.Contains("f_ztsbh"))
            {
                strSql.Append("f_ztsbh='" + (model.f_ztsbh) + "',");
                strSql_use.Append("f_ztsbh=:f_ztsbh,");
                parameter = new OracleParameter(":f_ztsbh", OracleType.VarChar);
                parameter.Value = model.f_ztsbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_mph != null&& columsList.Contains("f_mph"))
            {
                strSql.Append("f_mph='" + (model.f_mph) + "',");
                strSql_use.Append("f_mph=:f_mph,");
                parameter = new OracleParameter(":f_mph", OracleType.VarChar);
                parameter.Value = model.f_mph;
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
            
	            if (model.f_sbdz != null&& columsList.Contains("f_sbdz"))
            {
                strSql.Append("f_sbdz='" + (model.f_sbdz) + "',");
                strSql_use.Append("f_sbdz=:f_sbdz,");
                parameter = new OracleParameter(":f_sbdz", OracleType.VarChar);
                parameter.Value = model.f_sbdz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbfz != null&& columsList.Contains("f_sbfz"))
            {
                strSql.Append("f_sbfz='" + (model.f_sbfz) + "',");
                strSql_use.Append("f_sbfz=:f_sbfz,");
                parameter = new OracleParameter(":f_sbfz", OracleType.VarChar);
                parameter.Value = model.f_sbfz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbfzid != null&& columsList.Contains("f_sbfzid"))
            {
                strSql.Append("f_sbfzid='" + (model.f_sbfzid) + "',");
                strSql_use.Append("f_sbfzid=:f_sbfzid,");
                parameter = new OracleParameter(":f_sbfzid", OracleType.VarChar);
                parameter.Value = model.f_sbfzid;
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
            
	            if (model.f_cszm != null&& columsList.Contains("f_cszm"))
            {
                strSql.Append("f_cszm='" + (model.f_cszm) + "',");
                strSql_use.Append("f_cszm=:f_cszm,");
                parameter = new OracleParameter(":f_cszm", OracleType.VarChar);
                parameter.Value = model.f_cszm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ljgl != null&& columsList.Contains("f_ljgl"))
            {
                strSql.Append("f_ljgl='" + (model.f_ljgl) + "',");
                strSql_use.Append("f_ljgl=:f_ljgl,");
                parameter = new OracleParameter(":f_ljgl", OracleType.VarChar);
                parameter.Value = model.f_ljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_nljgl != null&& columsList.Contains("f_nljgl"))
            {
                strSql.Append("f_nljgl='" + (model.f_nljgl) + "',");
                strSql_use.Append("f_nljgl=:f_nljgl,");
                parameter = new OracleParameter(":f_nljgl", OracleType.VarChar);
                parameter.Value = model.f_nljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbzt != null&& columsList.Contains("f_sbzt"))
            {
                strSql.Append("f_sbzt='" + (model.f_sbzt) + "',");
                strSql_use.Append("f_sbzt=:f_sbzt,");
                parameter = new OracleParameter(":f_sbzt", OracleType.VarChar);
                parameter.Value = model.f_sbzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbztid != null&& columsList.Contains("f_sbztid"))
            {
                strSql.Append("f_sbztid='" + (model.f_sbztid) + "',");
                strSql_use.Append("f_sbztid=:f_sbztid,");
                parameter = new OracleParameter(":f_sbztid", OracleType.VarChar);
                parameter.Value = model.f_sbztid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbkj != null&& columsList.Contains("f_sbkj"))
            {
                strSql.Append("f_sbkj='" + (model.f_sbkj) + "',");
                strSql_use.Append("f_sbkj=:f_sbkj,");
                parameter = new OracleParameter(":f_sbkj", OracleType.VarChar);
                parameter.Value = model.f_sbkj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbkjid != null&& columsList.Contains("f_sbkjid"))
            {
                strSql.Append("f_sbkjid='" + (model.f_sbkjid) + "',");
                strSql_use.Append("f_sbkjid=:f_sbkjid,");
                parameter = new OracleParameter(":f_sbkjid", OracleType.VarChar);
                parameter.Value = model.f_sbkjid;
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
            
	            if (model.f_azrq != null&& columsList.Contains("f_azrq"))
            {
                strSql.Append("f_azrq=to_date('" + model.f_azrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_azrq=:f_azrq,");
                parameter = new OracleParameter(":f_azrq", OracleType.DateTime);
                parameter.Value = model.f_azrq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbfj != null&& columsList.Contains("f_sbfj"))
            {
                strSql.Append("f_sbfj='" + (model.f_sbfj) + "',");
                strSql_use.Append("f_sbfj=:f_sbfj,");
                parameter = new OracleParameter(":f_sbfj", OracleType.VarChar);
                parameter.Value = model.f_sbfj;
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
            
	            if (model.f_sqzm != null&& columsList.Contains("f_sqzm"))
            {
                strSql.Append("f_sqzm='" + (model.f_sqzm) + "',");
                strSql_use.Append("f_sqzm=:f_sqzm,");
                parameter = new OracleParameter(":f_sqzm", OracleType.VarChar);
                parameter.Value = model.f_sqzm;
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
            
	            if (model.f_synx != null&& columsList.Contains("f_synx"))
            {
                strSql.Append("f_synx='" + (model.f_synx) + "',");
                strSql_use.Append("f_synx=:f_synx,");
                parameter = new OracleParameter(":f_synx", OracleType.VarChar);
                parameter.Value = model.f_synx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sbbz != null&& columsList.Contains("f_sbbz"))
            {
                strSql.Append("f_sbbz='" + (model.f_sbbz) + "',");
                strSql_use.Append("f_sbbz=:f_sbbz,");
                parameter = new OracleParameter(":f_sbbz", OracleType.VarChar);
                parameter.Value = model.f_sbbz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jllx != null&& columsList.Contains("f_jllx"))
            {
                strSql.Append("f_jllx='" + (model.f_jllx) + "',");
                strSql_use.Append("f_jllx=:f_jllx,");
                parameter = new OracleParameter(":f_jllx", OracleType.VarChar);
                parameter.Value = model.f_jllx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_jllxid != null&& columsList.Contains("f_jllxid"))
            {
                strSql.Append("f_jllxid='" + (model.f_jllxid) + "',");
                strSql_use.Append("f_jllxid=:f_jllxid,");
                parameter = new OracleParameter(":f_jllxid", OracleType.VarChar);
                parameter.Value = model.f_jllxid;
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
            
	            if (model.f_qlqpjsl != null&& columsList.Contains("f_qlqpjsl"))
            {
                strSql.Append("f_qlqpjsl='" + (model.f_qlqpjsl) + "',");
                strSql_use.Append("f_qlqpjsl=:f_qlqpjsl,");
                parameter = new OracleParameter(":f_qlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_qlqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_qfzt != null&& columsList.Contains("f_qfzt"))
            {
                strSql.Append("f_qfzt='" + (model.f_qfzt) + "',");
                strSql_use.Append("f_qfzt=:f_qfzt,");
                parameter = new OracleParameter(":f_qfzt", OracleType.VarChar);
                parameter.Value = model.f_qfzt;
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_pllhyl> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_pllhyl model in modelList)
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
            strSql.Append("delete tbl_ld_pllhyl where  ");
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
            strSql.Append("update tbl_ld_pllhyl set ");
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
            strSql.Append("select count(*) from tbl_ld_pllhyl");
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
        public List<sara.dd.ldsw.model.tbl_ld_pllhyl> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_pllhyl t where");
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

            List<sara.dd.ldsw.model.tbl_ld_pllhyl> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_pllhyl>(resultDataTable);
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
            strSql.Append(" select * from tbl_ld_pllhyl t where");
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
            strSql.Append(" select * from tbl_ld_pllhyl t where");
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
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_pllhyl')";
            sqlString += " where f_tablename  = 'tbl_ld_pllhyl'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_pllhyl'";


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
















