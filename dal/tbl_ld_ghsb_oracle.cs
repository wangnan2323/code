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
    /// 数据访问类tbl_ld_ghsb 
    /// </summary>
    public class tbl_ld_ghsb : sara.dd.ldsw.idal.Itbl_ld_ghsb
    {
        private Eva.Library.Data.AccessData.IAccessData _iAccessData;
        private Eva.Library.Data.AccessDataTrans.IAccessDataTrans _iAccessDataTrans;
        public tbl_ld_ghsb()
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
        public string Add(sara.dd.ldsw.model.tbl_ld_ghsb model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
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
            
            if (model.f_ghsbbh != null)
            {
	            strSql1.Append("f_ghsbbh,");
	            strSql2.Append("'" + (model.f_ghsbbh) + "',");
	            strSql3.Append(":f_ghsbbh,");
	            parameter = new OracleParameter(":f_ghsbbh", OracleType.VarChar);
	            parameter.Value = model.f_ghsbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_ghsbmc != null)
            {
	            strSql1.Append("f_ghsbmc,");
	            strSql2.Append("'" + (model.f_ghsbmc) + "',");
	            strSql3.Append(":f_ghsbmc,");
	            parameter = new OracleParameter(":f_ghsbmc", OracleType.VarChar);
	            parameter.Value = model.f_ghsbmc;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sqr != null)
            {
	            strSql1.Append("f_sqr,");
	            strSql2.Append("'" + (model.f_sqr) + "',");
	            strSql3.Append(":f_sqr,");
	            parameter = new OracleParameter(":f_sqr", OracleType.VarChar);
	            parameter.Value = model.f_sqr;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sqrid != null)
            {
	            strSql1.Append("f_sqrid,");
	            strSql2.Append("'" + (model.f_sqrid) + "',");
	            strSql3.Append(":f_sqrid,");
	            parameter = new OracleParameter(":f_sqrid", OracleType.VarChar);
	            parameter.Value = model.f_sqrid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_sqsj != null)
            {
	            strSql1.Append("f_sqsj,");
	            strSql2.Append("to_date('" + model.f_sqsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_sqsj,");
	            parameter = new OracleParameter(":f_sqsj", OracleType.DateTime);
	            parameter.Value = model.f_sqsj;
	            parameterList.Add(parameter);
            }
            
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
            
            if (model.f_khxx != null)
            {
	            strSql1.Append("f_khxx,");
	            strSql2.Append("'" + (model.f_khxx) + "',");
	            strSql3.Append(":f_khxx,");
	            parameter = new OracleParameter(":f_khxx", OracleType.VarChar);
	            parameter.Value = model.f_khxx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbbh != null)
            {
	            strSql1.Append("f_oldsbbh,");
	            strSql2.Append("'" + (model.f_oldsbbh) + "',");
	            strSql3.Append(":f_oldsbbh,");
	            parameter = new OracleParameter(":f_oldsbbh", OracleType.VarChar);
	            parameter.Value = model.f_oldsbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbh != null)
            {
	            strSql1.Append("f_oldsbh,");
	            strSql2.Append("'" + (model.f_oldsbh) + "',");
	            strSql3.Append(":f_oldsbh,");
	            parameter = new OracleParameter(":f_oldsbh", OracleType.VarChar);
	            parameter.Value = model.f_oldsbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldlxth != null)
            {
	            strSql1.Append("f_oldlxth,");
	            strSql2.Append("'" + (model.f_oldlxth) + "',");
	            strSql3.Append(":f_oldlxth,");
	            parameter = new OracleParameter(":f_oldlxth", OracleType.VarChar);
	            parameter.Value = model.f_oldlxth;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbfz != null)
            {
	            strSql1.Append("f_oldsbfz,");
	            strSql2.Append("'" + (model.f_oldsbfz) + "',");
	            strSql3.Append(":f_oldsbfz,");
	            parameter = new OracleParameter(":f_oldsbfz", OracleType.VarChar);
	            parameter.Value = model.f_oldsbfz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbfzid != null)
            {
	            strSql1.Append("f_oldsbfzid,");
	            strSql2.Append("'" + (model.f_oldsbfzid) + "',");
	            strSql3.Append(":f_oldsbfzid,");
	            parameter = new OracleParameter(":f_oldsbfzid", OracleType.VarChar);
	            parameter.Value = model.f_oldsbfzid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbpp != null)
            {
	            strSql1.Append("f_oldsbpp,");
	            strSql2.Append("'" + (model.f_oldsbpp) + "',");
	            strSql3.Append(":f_oldsbpp,");
	            parameter = new OracleParameter(":f_oldsbpp", OracleType.VarChar);
	            parameter.Value = model.f_oldsbpp;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldmph != null)
            {
	            strSql1.Append("f_oldmph,");
	            strSql2.Append("'" + (model.f_oldmph) + "',");
	            strSql3.Append(":f_oldmph,");
	            parameter = new OracleParameter(":f_oldmph", OracleType.VarChar);
	            parameter.Value = model.f_oldmph;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsblx != null)
            {
	            strSql1.Append("f_oldsblx,");
	            strSql2.Append("'" + (model.f_oldsblx) + "',");
	            strSql3.Append(":f_oldsblx,");
	            parameter = new OracleParameter(":f_oldsblx", OracleType.VarChar);
	            parameter.Value = model.f_oldsblx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsblxid != null)
            {
	            strSql1.Append("f_oldsblxid,");
	            strSql2.Append("'" + (model.f_oldsblxid) + "',");
	            strSql3.Append(":f_oldsblxid,");
	            parameter = new OracleParameter(":f_oldsblxid", OracleType.VarChar);
	            parameter.Value = model.f_oldsblxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldjllx != null)
            {
	            strSql1.Append("f_oldjllx,");
	            strSql2.Append("'" + (model.f_oldjllx) + "',");
	            strSql3.Append(":f_oldjllx,");
	            parameter = new OracleParameter(":f_oldjllx", OracleType.VarChar);
	            parameter.Value = model.f_oldjllx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldjllxid != null)
            {
	            strSql1.Append("f_oldjllxid,");
	            strSql2.Append("'" + (model.f_oldjllxid) + "',");
	            strSql3.Append(":f_oldjllxid,");
	            parameter = new OracleParameter(":f_oldjllxid", OracleType.VarChar);
	            parameter.Value = model.f_oldjllxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldrs != null)
            {
	            strSql1.Append("f_oldrs,");
	            strSql2.Append("'" + (model.f_oldrs) + "',");
	            strSql3.Append(":f_oldrs,");
	            parameter = new OracleParameter(":f_oldrs", OracleType.VarChar);
	            parameter.Value = model.f_oldrs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbkj != null)
            {
	            strSql1.Append("f_oldsbkj,");
	            strSql2.Append("'" + (model.f_oldsbkj) + "',");
	            strSql3.Append(":f_oldsbkj,");
	            parameter = new OracleParameter(":f_oldsbkj", OracleType.VarChar);
	            parameter.Value = model.f_oldsbkj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbkjid != null)
            {
	            strSql1.Append("f_oldsbkjid,");
	            strSql2.Append("'" + (model.f_oldsbkjid) + "',");
	            strSql3.Append(":f_oldsbkjid,");
	            parameter = new OracleParameter(":f_oldsbkjid", OracleType.VarChar);
	            parameter.Value = model.f_oldsbkjid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsbdz != null)
            {
	            strSql1.Append("f_oldsbdz,");
	            strSql2.Append("'" + (model.f_oldsbdz) + "',");
	            strSql3.Append(":f_oldsbdz,");
	            parameter = new OracleParameter(":f_oldsbdz", OracleType.VarChar);
	            parameter.Value = model.f_oldsbdz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldazrq != null)
            {
	            strSql1.Append("f_oldazrq,");
	            strSql2.Append("to_date('" + model.f_oldazrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_oldazrq,");
	            parameter = new OracleParameter(":f_oldazrq", OracleType.DateTime);
	            parameter.Value = model.f_oldazrq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldqfzt != null)
            {
	            strSql1.Append("f_oldqfzt,");
	            strSql2.Append("'" + (model.f_oldqfzt) + "',");
	            strSql3.Append(":f_oldqfzt,");
	            parameter = new OracleParameter(":f_oldqfzt", OracleType.VarChar);
	            parameter.Value = model.f_oldqfzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsynx != null)
            {
	            strSql1.Append("f_oldsynx,");
	            strSql2.Append("'" + (model.f_oldsynx) + "',");
	            strSql3.Append(":f_oldsynx,");
	            parameter = new OracleParameter(":f_oldsynx", OracleType.VarChar);
	            parameter.Value = model.f_oldsynx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldcszm != null)
            {
	            strSql1.Append("f_oldcszm,");
	            strSql2.Append("'" + (model.f_oldcszm) + "',");
	            strSql3.Append(":f_oldcszm,");
	            parameter = new OracleParameter(":f_oldcszm", OracleType.VarChar);
	            parameter.Value = model.f_oldcszm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldqsqpjsl != null)
            {
	            strSql1.Append("f_oldqsqpjsl,");
	            strSql2.Append("'" + (model.f_oldqsqpjsl) + "',");
	            strSql3.Append(":f_oldqsqpjsl,");
	            parameter = new OracleParameter(":f_oldqsqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_oldqsqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldqlqpjsl != null)
            {
	            strSql1.Append("f_oldqlqpjsl,");
	            strSql2.Append("'" + (model.f_oldqlqpjsl) + "',");
	            strSql3.Append(":f_oldqlqpjsl,");
	            parameter = new OracleParameter(":f_oldqlqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_oldqlqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldbqzm != null)
            {
	            strSql1.Append("f_oldbqzm,");
	            strSql2.Append("'" + (model.f_oldbqzm) + "',");
	            strSql3.Append(":f_oldbqzm,");
	            parameter = new OracleParameter(":f_oldbqzm", OracleType.VarChar);
	            parameter.Value = model.f_oldbqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsqzm != null)
            {
	            strSql1.Append("f_oldsqzm,");
	            strSql2.Append("'" + (model.f_oldsqzm) + "',");
	            strSql3.Append(":f_oldsqzm,");
	            parameter = new OracleParameter(":f_oldsqzm", OracleType.VarChar);
	            parameter.Value = model.f_oldsqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldsqsl != null)
            {
	            strSql1.Append("f_oldsqsl,");
	            strSql2.Append("'" + (model.f_oldsqsl) + "',");
	            strSql3.Append(":f_oldsqsl,");
	            parameter = new OracleParameter(":f_oldsqsl", OracleType.VarChar);
	            parameter.Value = model.f_oldsqsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_olddysl != null)
            {
	            strSql1.Append("f_olddysl,");
	            strSql2.Append("'" + (model.f_olddysl) + "',");
	            strSql3.Append(":f_olddysl,");
	            parameter = new OracleParameter(":f_olddysl", OracleType.VarChar);
	            parameter.Value = model.f_olddysl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldljgl != null)
            {
	            strSql1.Append("f_oldljgl,");
	            strSql2.Append("'" + (model.f_oldljgl) + "',");
	            strSql3.Append(":f_oldljgl,");
	            parameter = new OracleParameter(":f_oldljgl", OracleType.VarChar);
	            parameter.Value = model.f_oldljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldnysl != null)
            {
	            strSql1.Append("f_oldnysl,");
	            strSql2.Append("'" + (model.f_oldnysl) + "',");
	            strSql3.Append(":f_oldnysl,");
	            parameter = new OracleParameter(":f_oldnysl", OracleType.VarChar);
	            parameter.Value = model.f_oldnysl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldzt != null)
            {
	            strSql1.Append("f_oldzt,");
	            strSql2.Append("'" + (model.f_oldzt) + "',");
	            strSql3.Append(":f_oldzt,");
	            parameter = new OracleParameter(":f_oldzt", OracleType.VarChar);
	            parameter.Value = model.f_oldzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldztid != null)
            {
	            strSql1.Append("f_oldztid,");
	            strSql2.Append("'" + (model.f_oldztid) + "',");
	            strSql3.Append(":f_oldztid,");
	            parameter = new OracleParameter(":f_oldztid", OracleType.VarChar);
	            parameter.Value = model.f_oldztid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_ysbbz != null)
            {
	            strSql1.Append("f_ysbbz,");
	            strSql2.Append("'" + (model.f_ysbbz) + "',");
	            strSql3.Append(":f_ysbbz,");
	            parameter = new OracleParameter(":f_ysbbz", OracleType.VarChar);
	            parameter.Value = model.f_ysbbz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbbh != null)
            {
	            strSql1.Append("f_newsbbh,");
	            strSql2.Append("'" + (model.f_newsbbh) + "',");
	            strSql3.Append(":f_newsbbh,");
	            parameter = new OracleParameter(":f_newsbbh", OracleType.VarChar);
	            parameter.Value = model.f_newsbbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newxsbjsbh != null)
            {
	            strSql1.Append("f_newxsbjsbh,");
	            strSql2.Append("'" + (model.f_newxsbjsbh) + "',");
	            strSql3.Append(":f_newxsbjsbh,");
	            parameter = new OracleParameter(":f_newxsbjsbh", OracleType.VarChar);
	            parameter.Value = model.f_newxsbjsbh;
	            parameterList.Add(parameter);
            }
            
            if (model.f_oldxsblxth != null)
            {
	            strSql1.Append("f_oldxsblxth,");
	            strSql2.Append("'" + (model.f_oldxsblxth) + "',");
	            strSql3.Append(":f_oldxsblxth,");
	            parameter = new OracleParameter(":f_oldxsblxth", OracleType.VarChar);
	            parameter.Value = model.f_oldxsblxth;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbfz != null)
            {
	            strSql1.Append("f_newsbfz,");
	            strSql2.Append("'" + (model.f_newsbfz) + "',");
	            strSql3.Append(":f_newsbfz,");
	            parameter = new OracleParameter(":f_newsbfz", OracleType.VarChar);
	            parameter.Value = model.f_newsbfz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbfzid != null)
            {
	            strSql1.Append("f_newsbfzid,");
	            strSql2.Append("'" + (model.f_newsbfzid) + "',");
	            strSql3.Append(":f_newsbfzid,");
	            parameter = new OracleParameter(":f_newsbfzid", OracleType.VarChar);
	            parameter.Value = model.f_newsbfzid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbpp != null)
            {
	            strSql1.Append("f_newsbpp,");
	            strSql2.Append("'" + (model.f_newsbpp) + "',");
	            strSql3.Append(":f_newsbpp,");
	            parameter = new OracleParameter(":f_newsbpp", OracleType.VarChar);
	            parameter.Value = model.f_newsbpp;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newmph != null)
            {
	            strSql1.Append("f_newmph,");
	            strSql2.Append("'" + (model.f_newmph) + "',");
	            strSql3.Append(":f_newmph,");
	            parameter = new OracleParameter(":f_newmph", OracleType.VarChar);
	            parameter.Value = model.f_newmph;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsblx != null)
            {
	            strSql1.Append("f_newsblx,");
	            strSql2.Append("'" + (model.f_newsblx) + "',");
	            strSql3.Append(":f_newsblx,");
	            parameter = new OracleParameter(":f_newsblx", OracleType.VarChar);
	            parameter.Value = model.f_newsblx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsblxid != null)
            {
	            strSql1.Append("f_newsblxid,");
	            strSql2.Append("'" + (model.f_newsblxid) + "',");
	            strSql3.Append(":f_newsblxid,");
	            parameter = new OracleParameter(":f_newsblxid", OracleType.VarChar);
	            parameter.Value = model.f_newsblxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newjllx != null)
            {
	            strSql1.Append("f_newjllx,");
	            strSql2.Append("'" + (model.f_newjllx) + "',");
	            strSql3.Append(":f_newjllx,");
	            parameter = new OracleParameter(":f_newjllx", OracleType.VarChar);
	            parameter.Value = model.f_newjllx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newjllxid != null)
            {
	            strSql1.Append("f_newjllxid,");
	            strSql2.Append("'" + (model.f_newjllxid) + "',");
	            strSql3.Append(":f_newjllxid,");
	            parameter = new OracleParameter(":f_newjllxid", OracleType.VarChar);
	            parameter.Value = model.f_newjllxid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newrs != null)
            {
	            strSql1.Append("f_newrs,");
	            strSql2.Append("'" + (model.f_newrs) + "',");
	            strSql3.Append(":f_newrs,");
	            parameter = new OracleParameter(":f_newrs", OracleType.VarChar);
	            parameter.Value = model.f_newrs;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbkj != null)
            {
	            strSql1.Append("f_newsbkj,");
	            strSql2.Append("'" + (model.f_newsbkj) + "',");
	            strSql3.Append(":f_newsbkj,");
	            parameter = new OracleParameter(":f_newsbkj", OracleType.VarChar);
	            parameter.Value = model.f_newsbkj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbkjid != null)
            {
	            strSql1.Append("f_newsbkjid,");
	            strSql2.Append("'" + (model.f_newsbkjid) + "',");
	            strSql3.Append(":f_newsbkjid,");
	            parameter = new OracleParameter(":f_newsbkjid", OracleType.VarChar);
	            parameter.Value = model.f_newsbkjid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsbdz != null)
            {
	            strSql1.Append("f_newsbdz,");
	            strSql2.Append("'" + (model.f_newsbdz) + "',");
	            strSql3.Append(":f_newsbdz,");
	            parameter = new OracleParameter(":f_newsbdz", OracleType.VarChar);
	            parameter.Value = model.f_newsbdz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsynx != null)
            {
	            strSql1.Append("f_newsynx,");
	            strSql2.Append("'" + (model.f_newsynx) + "',");
	            strSql3.Append(":f_newsynx,");
	            parameter = new OracleParameter(":f_newsynx", OracleType.VarChar);
	            parameter.Value = model.f_newsynx;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newazrq != null)
            {
	            strSql1.Append("f_newazrq,");
	            strSql2.Append("to_date('" + model.f_newazrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
	            strSql3.Append(":f_newazrq,");
	            parameter = new OracleParameter(":f_newazrq", OracleType.DateTime);
	            parameter.Value = model.f_newazrq;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newqfzt != null)
            {
	            strSql1.Append("f_newqfzt,");
	            strSql2.Append("'" + (model.f_newqfzt) + "',");
	            strSql3.Append(":f_newqfzt,");
	            parameter = new OracleParameter(":f_newqfzt", OracleType.VarChar);
	            parameter.Value = model.f_newqfzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newcszm != null)
            {
	            strSql1.Append("f_newcszm,");
	            strSql2.Append("'" + (model.f_newcszm) + "',");
	            strSql3.Append(":f_newcszm,");
	            parameter = new OracleParameter(":f_newcszm", OracleType.VarChar);
	            parameter.Value = model.f_newcszm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newqsqpjsl != null)
            {
	            strSql1.Append("f_newqsqpjsl,");
	            strSql2.Append("'" + (model.f_newqsqpjsl) + "',");
	            strSql3.Append(":f_newqsqpjsl,");
	            parameter = new OracleParameter(":f_newqsqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_newqsqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newqlqpjsl != null)
            {
	            strSql1.Append("f_newqlqpjsl,");
	            strSql2.Append("'" + (model.f_newqlqpjsl) + "',");
	            strSql3.Append(":f_newqlqpjsl,");
	            parameter = new OracleParameter(":f_newqlqpjsl", OracleType.VarChar);
	            parameter.Value = model.f_newqlqpjsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newbqzm != null)
            {
	            strSql1.Append("f_newbqzm,");
	            strSql2.Append("'" + (model.f_newbqzm) + "',");
	            strSql3.Append(":f_newbqzm,");
	            parameter = new OracleParameter(":f_newbqzm", OracleType.VarChar);
	            parameter.Value = model.f_newbqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsqzm != null)
            {
	            strSql1.Append("f_newsqzm,");
	            strSql2.Append("'" + (model.f_newsqzm) + "',");
	            strSql3.Append(":f_newsqzm,");
	            parameter = new OracleParameter(":f_newsqzm", OracleType.VarChar);
	            parameter.Value = model.f_newsqzm;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newsqsl != null)
            {
	            strSql1.Append("f_newsqsl,");
	            strSql2.Append("'" + (model.f_newsqsl) + "',");
	            strSql3.Append(":f_newsqsl,");
	            parameter = new OracleParameter(":f_newsqsl", OracleType.VarChar);
	            parameter.Value = model.f_newsqsl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newdysl != null)
            {
	            strSql1.Append("f_newdysl,");
	            strSql2.Append("'" + (model.f_newdysl) + "',");
	            strSql3.Append(":f_newdysl,");
	            parameter = new OracleParameter(":f_newdysl", OracleType.VarChar);
	            parameter.Value = model.f_newdysl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newljgl != null)
            {
	            strSql1.Append("f_newljgl,");
	            strSql2.Append("'" + (model.f_newljgl) + "',");
	            strSql3.Append(":f_newljgl,");
	            parameter = new OracleParameter(":f_newljgl", OracleType.VarChar);
	            parameter.Value = model.f_newljgl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newnysl != null)
            {
	            strSql1.Append("f_newnysl,");
	            strSql2.Append("'" + (model.f_newnysl) + "',");
	            strSql3.Append(":f_newnysl,");
	            parameter = new OracleParameter(":f_newnysl", OracleType.VarChar);
	            parameter.Value = model.f_newnysl;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newzt != null)
            {
	            strSql1.Append("f_newzt,");
	            strSql2.Append("'" + (model.f_newzt) + "',");
	            strSql3.Append(":f_newzt,");
	            parameter = new OracleParameter(":f_newzt", OracleType.VarChar);
	            parameter.Value = model.f_newzt;
	            parameterList.Add(parameter);
            }
            
            if (model.f_newztid != null)
            {
	            strSql1.Append("f_newztid,");
	            strSql2.Append("'" + (model.f_newztid) + "',");
	            strSql3.Append(":f_newztid,");
	            parameter = new OracleParameter(":f_newztid", OracleType.VarChar);
	            parameter.Value = model.f_newztid;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xsbfj != null)
            {
	            strSql1.Append("f_xsbfj,");
	            strSql2.Append("'" + (model.f_xsbfj) + "',");
	            strSql3.Append(":f_xsbfj,");
	            parameter = new OracleParameter(":f_xsbfj", OracleType.VarChar);
	            parameter.Value = model.f_xsbfj;
	            parameterList.Add(parameter);
            }
            
            if (model.f_xsbbz != null)
            {
	            strSql1.Append("f_xsbbz,");
	            strSql2.Append("'" + (model.f_xsbbz) + "',");
	            strSql3.Append(":f_xsbbz,");
	            parameter = new OracleParameter(":f_xsbbz", OracleType.VarChar);
	            parameter.Value = model.f_xsbbz;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khjson != null && model.f_khjson.Length > 0)
            {
	            strSql1.Append("f_khjson,");
	            strSql2.Append("'" + (model.f_khjson) + "',");
	            strSql3.Append(":f_khjson,");
	            parameter = new OracleParameter(":f_khjson", OracleType.Clob);
	            parameter.Value = model.f_khjson;
	            parameterList.Add(parameter);
            }
            
            if (model.f_khjsonid != null)
            {
	            strSql1.Append("f_khjsonid,");
	            strSql2.Append("'" + (model.f_khjsonid) + "',");
	            strSql3.Append(":f_khjsonid,");
	            parameter = new OracleParameter(":f_khjsonid", OracleType.VarChar);
	            parameter.Value = model.f_khjsonid;
	            parameterList.Add(parameter);
            }
            
            if (model.fk_tbl_maintable_sys_id != null)
            {
	            strSql1.Append("fk_tbl_maintable_sys_id,");
	            strSql2.Append("'" + (model.fk_tbl_maintable_sys_id) + "',");
	            strSql3.Append(":fk_tbl_maintable_sys_id,");
	            parameter = new OracleParameter(":fk_tbl_maintable_sys_id", OracleType.VarChar);
	            parameter.Value = model.fk_tbl_maintable_sys_id;
	            parameterList.Add(parameter);
            }
            
            if (model.f_lcfj != null)
            {
	            strSql1.Append("f_lcfj,");
	            strSql2.Append("'" + (model.f_lcfj) + "',");
	            strSql3.Append(":f_lcfj,");
	            parameter = new OracleParameter(":f_lcfj", OracleType.VarChar);
	            parameter.Value = model.f_lcfj;
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
            
            strSql.Append("insert into tbl_ld_ghsb(");
            strSql.Append(strSql1.ToString().Remove(strSql1.Length - 1));
            strSql.Append(")");
            strSql.Append(" values (");
            strSql.Append(strSql2.ToString().Remove(strSql2.Length - 1));
            strSql.Append(")");
            
            strSql_use.Append("insert into tbl_ld_ghsb(");
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
	            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            
			            if (model.f_khjson != null && model.f_khjson.Length > 0)
	            {
	                p = new OracleParameter(":f_khjson", OracleType.Clob);
	                p.Value = (model.f_khjson);
	                pList.Add(p);
	                paraStrList.Add(" f_khjson = :f_khjson ");
	            }
	            else
	            {
	                paraStrList.Add(" f_khjson = null ");
	            }
	            
			            
			            
			            
			            
			            
			            
	            if (paraStrList.Count > 0)
	            {
	                string updateSqlString = " update tbl_ld_ghsb set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + sid + "' ";
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
        public string AddList(List<sara.dd.ldsw.model.tbl_ld_ghsb> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {

            string Newids = "";
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ghsb model in modelList)
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
        public string Update(sara.dd.ldsw.model.tbl_ld_ghsb model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            String[] columnsArray = columns.Split(',');
            List<string> columsList = new List<string>(columnsArray);
            List<OracleParameter> parameterList = new List<OracleParameter>();
            OracleParameter parameter = null;
            #region sqlString
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql_use = new StringBuilder();
            strSql.Append("update tbl_ld_ghsb set ");
            strSql_use.Append("update tbl_ld_ghsb set ");
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
            
	            if (model.f_ghsbbh != null&& columsList.Contains("f_ghsbbh"))
            {
                strSql.Append("f_ghsbbh='" + (model.f_ghsbbh) + "',");
                strSql_use.Append("f_ghsbbh=:f_ghsbbh,");
                parameter = new OracleParameter(":f_ghsbbh", OracleType.VarChar);
                parameter.Value = model.f_ghsbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ghsbmc != null&& columsList.Contains("f_ghsbmc"))
            {
                strSql.Append("f_ghsbmc='" + (model.f_ghsbmc) + "',");
                strSql_use.Append("f_ghsbmc=:f_ghsbmc,");
                parameter = new OracleParameter(":f_ghsbmc", OracleType.VarChar);
                parameter.Value = model.f_ghsbmc;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sqr != null&& columsList.Contains("f_sqr"))
            {
                strSql.Append("f_sqr='" + (model.f_sqr) + "',");
                strSql_use.Append("f_sqr=:f_sqr,");
                parameter = new OracleParameter(":f_sqr", OracleType.VarChar);
                parameter.Value = model.f_sqr;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sqrid != null&& columsList.Contains("f_sqrid"))
            {
                strSql.Append("f_sqrid='" + (model.f_sqrid) + "',");
                strSql_use.Append("f_sqrid=:f_sqrid,");
                parameter = new OracleParameter(":f_sqrid", OracleType.VarChar);
                parameter.Value = model.f_sqrid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_sqsj != null&& columsList.Contains("f_sqsj"))
            {
                strSql.Append("f_sqsj=to_date('" + model.f_sqsj.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_sqsj=:f_sqsj,");
                parameter = new OracleParameter(":f_sqsj", OracleType.DateTime);
                parameter.Value = model.f_sqsj;
                parameterList.Add(parameter);
            }
            
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
            
	            if (model.f_khxx != null&& columsList.Contains("f_khxx"))
            {
                strSql.Append("f_khxx='" + (model.f_khxx) + "',");
                strSql_use.Append("f_khxx=:f_khxx,");
                parameter = new OracleParameter(":f_khxx", OracleType.VarChar);
                parameter.Value = model.f_khxx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbbh != null&& columsList.Contains("f_oldsbbh"))
            {
                strSql.Append("f_oldsbbh='" + (model.f_oldsbbh) + "',");
                strSql_use.Append("f_oldsbbh=:f_oldsbbh,");
                parameter = new OracleParameter(":f_oldsbbh", OracleType.VarChar);
                parameter.Value = model.f_oldsbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbh != null&& columsList.Contains("f_oldsbh"))
            {
                strSql.Append("f_oldsbh='" + (model.f_oldsbh) + "',");
                strSql_use.Append("f_oldsbh=:f_oldsbh,");
                parameter = new OracleParameter(":f_oldsbh", OracleType.VarChar);
                parameter.Value = model.f_oldsbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldlxth != null&& columsList.Contains("f_oldlxth"))
            {
                strSql.Append("f_oldlxth='" + (model.f_oldlxth) + "',");
                strSql_use.Append("f_oldlxth=:f_oldlxth,");
                parameter = new OracleParameter(":f_oldlxth", OracleType.VarChar);
                parameter.Value = model.f_oldlxth;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbfz != null&& columsList.Contains("f_oldsbfz"))
            {
                strSql.Append("f_oldsbfz='" + (model.f_oldsbfz) + "',");
                strSql_use.Append("f_oldsbfz=:f_oldsbfz,");
                parameter = new OracleParameter(":f_oldsbfz", OracleType.VarChar);
                parameter.Value = model.f_oldsbfz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbfzid != null&& columsList.Contains("f_oldsbfzid"))
            {
                strSql.Append("f_oldsbfzid='" + (model.f_oldsbfzid) + "',");
                strSql_use.Append("f_oldsbfzid=:f_oldsbfzid,");
                parameter = new OracleParameter(":f_oldsbfzid", OracleType.VarChar);
                parameter.Value = model.f_oldsbfzid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbpp != null&& columsList.Contains("f_oldsbpp"))
            {
                strSql.Append("f_oldsbpp='" + (model.f_oldsbpp) + "',");
                strSql_use.Append("f_oldsbpp=:f_oldsbpp,");
                parameter = new OracleParameter(":f_oldsbpp", OracleType.VarChar);
                parameter.Value = model.f_oldsbpp;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldmph != null&& columsList.Contains("f_oldmph"))
            {
                strSql.Append("f_oldmph='" + (model.f_oldmph) + "',");
                strSql_use.Append("f_oldmph=:f_oldmph,");
                parameter = new OracleParameter(":f_oldmph", OracleType.VarChar);
                parameter.Value = model.f_oldmph;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsblx != null&& columsList.Contains("f_oldsblx"))
            {
                strSql.Append("f_oldsblx='" + (model.f_oldsblx) + "',");
                strSql_use.Append("f_oldsblx=:f_oldsblx,");
                parameter = new OracleParameter(":f_oldsblx", OracleType.VarChar);
                parameter.Value = model.f_oldsblx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsblxid != null&& columsList.Contains("f_oldsblxid"))
            {
                strSql.Append("f_oldsblxid='" + (model.f_oldsblxid) + "',");
                strSql_use.Append("f_oldsblxid=:f_oldsblxid,");
                parameter = new OracleParameter(":f_oldsblxid", OracleType.VarChar);
                parameter.Value = model.f_oldsblxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldjllx != null&& columsList.Contains("f_oldjllx"))
            {
                strSql.Append("f_oldjllx='" + (model.f_oldjllx) + "',");
                strSql_use.Append("f_oldjllx=:f_oldjllx,");
                parameter = new OracleParameter(":f_oldjllx", OracleType.VarChar);
                parameter.Value = model.f_oldjllx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldjllxid != null&& columsList.Contains("f_oldjllxid"))
            {
                strSql.Append("f_oldjllxid='" + (model.f_oldjllxid) + "',");
                strSql_use.Append("f_oldjllxid=:f_oldjllxid,");
                parameter = new OracleParameter(":f_oldjllxid", OracleType.VarChar);
                parameter.Value = model.f_oldjllxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldrs != null&& columsList.Contains("f_oldrs"))
            {
                strSql.Append("f_oldrs='" + (model.f_oldrs) + "',");
                strSql_use.Append("f_oldrs=:f_oldrs,");
                parameter = new OracleParameter(":f_oldrs", OracleType.VarChar);
                parameter.Value = model.f_oldrs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbkj != null&& columsList.Contains("f_oldsbkj"))
            {
                strSql.Append("f_oldsbkj='" + (model.f_oldsbkj) + "',");
                strSql_use.Append("f_oldsbkj=:f_oldsbkj,");
                parameter = new OracleParameter(":f_oldsbkj", OracleType.VarChar);
                parameter.Value = model.f_oldsbkj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbkjid != null&& columsList.Contains("f_oldsbkjid"))
            {
                strSql.Append("f_oldsbkjid='" + (model.f_oldsbkjid) + "',");
                strSql_use.Append("f_oldsbkjid=:f_oldsbkjid,");
                parameter = new OracleParameter(":f_oldsbkjid", OracleType.VarChar);
                parameter.Value = model.f_oldsbkjid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsbdz != null&& columsList.Contains("f_oldsbdz"))
            {
                strSql.Append("f_oldsbdz='" + (model.f_oldsbdz) + "',");
                strSql_use.Append("f_oldsbdz=:f_oldsbdz,");
                parameter = new OracleParameter(":f_oldsbdz", OracleType.VarChar);
                parameter.Value = model.f_oldsbdz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldazrq != null&& columsList.Contains("f_oldazrq"))
            {
                strSql.Append("f_oldazrq=to_date('" + model.f_oldazrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_oldazrq=:f_oldazrq,");
                parameter = new OracleParameter(":f_oldazrq", OracleType.DateTime);
                parameter.Value = model.f_oldazrq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldqfzt != null&& columsList.Contains("f_oldqfzt"))
            {
                strSql.Append("f_oldqfzt='" + (model.f_oldqfzt) + "',");
                strSql_use.Append("f_oldqfzt=:f_oldqfzt,");
                parameter = new OracleParameter(":f_oldqfzt", OracleType.VarChar);
                parameter.Value = model.f_oldqfzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsynx != null&& columsList.Contains("f_oldsynx"))
            {
                strSql.Append("f_oldsynx='" + (model.f_oldsynx) + "',");
                strSql_use.Append("f_oldsynx=:f_oldsynx,");
                parameter = new OracleParameter(":f_oldsynx", OracleType.VarChar);
                parameter.Value = model.f_oldsynx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldcszm != null&& columsList.Contains("f_oldcszm"))
            {
                strSql.Append("f_oldcszm='" + (model.f_oldcszm) + "',");
                strSql_use.Append("f_oldcszm=:f_oldcszm,");
                parameter = new OracleParameter(":f_oldcszm", OracleType.VarChar);
                parameter.Value = model.f_oldcszm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldqsqpjsl != null&& columsList.Contains("f_oldqsqpjsl"))
            {
                strSql.Append("f_oldqsqpjsl='" + (model.f_oldqsqpjsl) + "',");
                strSql_use.Append("f_oldqsqpjsl=:f_oldqsqpjsl,");
                parameter = new OracleParameter(":f_oldqsqpjsl", OracleType.VarChar);
                parameter.Value = model.f_oldqsqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldqlqpjsl != null&& columsList.Contains("f_oldqlqpjsl"))
            {
                strSql.Append("f_oldqlqpjsl='" + (model.f_oldqlqpjsl) + "',");
                strSql_use.Append("f_oldqlqpjsl=:f_oldqlqpjsl,");
                parameter = new OracleParameter(":f_oldqlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_oldqlqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldbqzm != null&& columsList.Contains("f_oldbqzm"))
            {
                strSql.Append("f_oldbqzm='" + (model.f_oldbqzm) + "',");
                strSql_use.Append("f_oldbqzm=:f_oldbqzm,");
                parameter = new OracleParameter(":f_oldbqzm", OracleType.VarChar);
                parameter.Value = model.f_oldbqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsqzm != null&& columsList.Contains("f_oldsqzm"))
            {
                strSql.Append("f_oldsqzm='" + (model.f_oldsqzm) + "',");
                strSql_use.Append("f_oldsqzm=:f_oldsqzm,");
                parameter = new OracleParameter(":f_oldsqzm", OracleType.VarChar);
                parameter.Value = model.f_oldsqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldsqsl != null&& columsList.Contains("f_oldsqsl"))
            {
                strSql.Append("f_oldsqsl='" + (model.f_oldsqsl) + "',");
                strSql_use.Append("f_oldsqsl=:f_oldsqsl,");
                parameter = new OracleParameter(":f_oldsqsl", OracleType.VarChar);
                parameter.Value = model.f_oldsqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_olddysl != null&& columsList.Contains("f_olddysl"))
            {
                strSql.Append("f_olddysl='" + (model.f_olddysl) + "',");
                strSql_use.Append("f_olddysl=:f_olddysl,");
                parameter = new OracleParameter(":f_olddysl", OracleType.VarChar);
                parameter.Value = model.f_olddysl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldljgl != null&& columsList.Contains("f_oldljgl"))
            {
                strSql.Append("f_oldljgl='" + (model.f_oldljgl) + "',");
                strSql_use.Append("f_oldljgl=:f_oldljgl,");
                parameter = new OracleParameter(":f_oldljgl", OracleType.VarChar);
                parameter.Value = model.f_oldljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldnysl != null&& columsList.Contains("f_oldnysl"))
            {
                strSql.Append("f_oldnysl='" + (model.f_oldnysl) + "',");
                strSql_use.Append("f_oldnysl=:f_oldnysl,");
                parameter = new OracleParameter(":f_oldnysl", OracleType.VarChar);
                parameter.Value = model.f_oldnysl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldzt != null&& columsList.Contains("f_oldzt"))
            {
                strSql.Append("f_oldzt='" + (model.f_oldzt) + "',");
                strSql_use.Append("f_oldzt=:f_oldzt,");
                parameter = new OracleParameter(":f_oldzt", OracleType.VarChar);
                parameter.Value = model.f_oldzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldztid != null&& columsList.Contains("f_oldztid"))
            {
                strSql.Append("f_oldztid='" + (model.f_oldztid) + "',");
                strSql_use.Append("f_oldztid=:f_oldztid,");
                parameter = new OracleParameter(":f_oldztid", OracleType.VarChar);
                parameter.Value = model.f_oldztid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_ysbbz != null&& columsList.Contains("f_ysbbz"))
            {
                strSql.Append("f_ysbbz='" + (model.f_ysbbz) + "',");
                strSql_use.Append("f_ysbbz=:f_ysbbz,");
                parameter = new OracleParameter(":f_ysbbz", OracleType.VarChar);
                parameter.Value = model.f_ysbbz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbbh != null&& columsList.Contains("f_newsbbh"))
            {
                strSql.Append("f_newsbbh='" + (model.f_newsbbh) + "',");
                strSql_use.Append("f_newsbbh=:f_newsbbh,");
                parameter = new OracleParameter(":f_newsbbh", OracleType.VarChar);
                parameter.Value = model.f_newsbbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newxsbjsbh != null&& columsList.Contains("f_newxsbjsbh"))
            {
                strSql.Append("f_newxsbjsbh='" + (model.f_newxsbjsbh) + "',");
                strSql_use.Append("f_newxsbjsbh=:f_newxsbjsbh,");
                parameter = new OracleParameter(":f_newxsbjsbh", OracleType.VarChar);
                parameter.Value = model.f_newxsbjsbh;
                parameterList.Add(parameter);
            }
            
	            if (model.f_oldxsblxth != null&& columsList.Contains("f_oldxsblxth"))
            {
                strSql.Append("f_oldxsblxth='" + (model.f_oldxsblxth) + "',");
                strSql_use.Append("f_oldxsblxth=:f_oldxsblxth,");
                parameter = new OracleParameter(":f_oldxsblxth", OracleType.VarChar);
                parameter.Value = model.f_oldxsblxth;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbfz != null&& columsList.Contains("f_newsbfz"))
            {
                strSql.Append("f_newsbfz='" + (model.f_newsbfz) + "',");
                strSql_use.Append("f_newsbfz=:f_newsbfz,");
                parameter = new OracleParameter(":f_newsbfz", OracleType.VarChar);
                parameter.Value = model.f_newsbfz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbfzid != null&& columsList.Contains("f_newsbfzid"))
            {
                strSql.Append("f_newsbfzid='" + (model.f_newsbfzid) + "',");
                strSql_use.Append("f_newsbfzid=:f_newsbfzid,");
                parameter = new OracleParameter(":f_newsbfzid", OracleType.VarChar);
                parameter.Value = model.f_newsbfzid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbpp != null&& columsList.Contains("f_newsbpp"))
            {
                strSql.Append("f_newsbpp='" + (model.f_newsbpp) + "',");
                strSql_use.Append("f_newsbpp=:f_newsbpp,");
                parameter = new OracleParameter(":f_newsbpp", OracleType.VarChar);
                parameter.Value = model.f_newsbpp;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newmph != null&& columsList.Contains("f_newmph"))
            {
                strSql.Append("f_newmph='" + (model.f_newmph) + "',");
                strSql_use.Append("f_newmph=:f_newmph,");
                parameter = new OracleParameter(":f_newmph", OracleType.VarChar);
                parameter.Value = model.f_newmph;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsblx != null&& columsList.Contains("f_newsblx"))
            {
                strSql.Append("f_newsblx='" + (model.f_newsblx) + "',");
                strSql_use.Append("f_newsblx=:f_newsblx,");
                parameter = new OracleParameter(":f_newsblx", OracleType.VarChar);
                parameter.Value = model.f_newsblx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsblxid != null&& columsList.Contains("f_newsblxid"))
            {
                strSql.Append("f_newsblxid='" + (model.f_newsblxid) + "',");
                strSql_use.Append("f_newsblxid=:f_newsblxid,");
                parameter = new OracleParameter(":f_newsblxid", OracleType.VarChar);
                parameter.Value = model.f_newsblxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newjllx != null&& columsList.Contains("f_newjllx"))
            {
                strSql.Append("f_newjllx='" + (model.f_newjllx) + "',");
                strSql_use.Append("f_newjllx=:f_newjllx,");
                parameter = new OracleParameter(":f_newjllx", OracleType.VarChar);
                parameter.Value = model.f_newjllx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newjllxid != null&& columsList.Contains("f_newjllxid"))
            {
                strSql.Append("f_newjllxid='" + (model.f_newjllxid) + "',");
                strSql_use.Append("f_newjllxid=:f_newjllxid,");
                parameter = new OracleParameter(":f_newjllxid", OracleType.VarChar);
                parameter.Value = model.f_newjllxid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newrs != null&& columsList.Contains("f_newrs"))
            {
                strSql.Append("f_newrs='" + (model.f_newrs) + "',");
                strSql_use.Append("f_newrs=:f_newrs,");
                parameter = new OracleParameter(":f_newrs", OracleType.VarChar);
                parameter.Value = model.f_newrs;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbkj != null&& columsList.Contains("f_newsbkj"))
            {
                strSql.Append("f_newsbkj='" + (model.f_newsbkj) + "',");
                strSql_use.Append("f_newsbkj=:f_newsbkj,");
                parameter = new OracleParameter(":f_newsbkj", OracleType.VarChar);
                parameter.Value = model.f_newsbkj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbkjid != null&& columsList.Contains("f_newsbkjid"))
            {
                strSql.Append("f_newsbkjid='" + (model.f_newsbkjid) + "',");
                strSql_use.Append("f_newsbkjid=:f_newsbkjid,");
                parameter = new OracleParameter(":f_newsbkjid", OracleType.VarChar);
                parameter.Value = model.f_newsbkjid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsbdz != null&& columsList.Contains("f_newsbdz"))
            {
                strSql.Append("f_newsbdz='" + (model.f_newsbdz) + "',");
                strSql_use.Append("f_newsbdz=:f_newsbdz,");
                parameter = new OracleParameter(":f_newsbdz", OracleType.VarChar);
                parameter.Value = model.f_newsbdz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsynx != null&& columsList.Contains("f_newsynx"))
            {
                strSql.Append("f_newsynx='" + (model.f_newsynx) + "',");
                strSql_use.Append("f_newsynx=:f_newsynx,");
                parameter = new OracleParameter(":f_newsynx", OracleType.VarChar);
                parameter.Value = model.f_newsynx;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newazrq != null&& columsList.Contains("f_newazrq"))
            {
                strSql.Append("f_newazrq=to_date('" + model.f_newazrq.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss'),");
                strSql_use.Append("f_newazrq=:f_newazrq,");
                parameter = new OracleParameter(":f_newazrq", OracleType.DateTime);
                parameter.Value = model.f_newazrq;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newqfzt != null&& columsList.Contains("f_newqfzt"))
            {
                strSql.Append("f_newqfzt='" + (model.f_newqfzt) + "',");
                strSql_use.Append("f_newqfzt=:f_newqfzt,");
                parameter = new OracleParameter(":f_newqfzt", OracleType.VarChar);
                parameter.Value = model.f_newqfzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newcszm != null&& columsList.Contains("f_newcszm"))
            {
                strSql.Append("f_newcszm='" + (model.f_newcszm) + "',");
                strSql_use.Append("f_newcszm=:f_newcszm,");
                parameter = new OracleParameter(":f_newcszm", OracleType.VarChar);
                parameter.Value = model.f_newcszm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newqsqpjsl != null&& columsList.Contains("f_newqsqpjsl"))
            {
                strSql.Append("f_newqsqpjsl='" + (model.f_newqsqpjsl) + "',");
                strSql_use.Append("f_newqsqpjsl=:f_newqsqpjsl,");
                parameter = new OracleParameter(":f_newqsqpjsl", OracleType.VarChar);
                parameter.Value = model.f_newqsqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newqlqpjsl != null&& columsList.Contains("f_newqlqpjsl"))
            {
                strSql.Append("f_newqlqpjsl='" + (model.f_newqlqpjsl) + "',");
                strSql_use.Append("f_newqlqpjsl=:f_newqlqpjsl,");
                parameter = new OracleParameter(":f_newqlqpjsl", OracleType.VarChar);
                parameter.Value = model.f_newqlqpjsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newbqzm != null&& columsList.Contains("f_newbqzm"))
            {
                strSql.Append("f_newbqzm='" + (model.f_newbqzm) + "',");
                strSql_use.Append("f_newbqzm=:f_newbqzm,");
                parameter = new OracleParameter(":f_newbqzm", OracleType.VarChar);
                parameter.Value = model.f_newbqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsqzm != null&& columsList.Contains("f_newsqzm"))
            {
                strSql.Append("f_newsqzm='" + (model.f_newsqzm) + "',");
                strSql_use.Append("f_newsqzm=:f_newsqzm,");
                parameter = new OracleParameter(":f_newsqzm", OracleType.VarChar);
                parameter.Value = model.f_newsqzm;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newsqsl != null&& columsList.Contains("f_newsqsl"))
            {
                strSql.Append("f_newsqsl='" + (model.f_newsqsl) + "',");
                strSql_use.Append("f_newsqsl=:f_newsqsl,");
                parameter = new OracleParameter(":f_newsqsl", OracleType.VarChar);
                parameter.Value = model.f_newsqsl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newdysl != null&& columsList.Contains("f_newdysl"))
            {
                strSql.Append("f_newdysl='" + (model.f_newdysl) + "',");
                strSql_use.Append("f_newdysl=:f_newdysl,");
                parameter = new OracleParameter(":f_newdysl", OracleType.VarChar);
                parameter.Value = model.f_newdysl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newljgl != null&& columsList.Contains("f_newljgl"))
            {
                strSql.Append("f_newljgl='" + (model.f_newljgl) + "',");
                strSql_use.Append("f_newljgl=:f_newljgl,");
                parameter = new OracleParameter(":f_newljgl", OracleType.VarChar);
                parameter.Value = model.f_newljgl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newnysl != null&& columsList.Contains("f_newnysl"))
            {
                strSql.Append("f_newnysl='" + (model.f_newnysl) + "',");
                strSql_use.Append("f_newnysl=:f_newnysl,");
                parameter = new OracleParameter(":f_newnysl", OracleType.VarChar);
                parameter.Value = model.f_newnysl;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newzt != null&& columsList.Contains("f_newzt"))
            {
                strSql.Append("f_newzt='" + (model.f_newzt) + "',");
                strSql_use.Append("f_newzt=:f_newzt,");
                parameter = new OracleParameter(":f_newzt", OracleType.VarChar);
                parameter.Value = model.f_newzt;
                parameterList.Add(parameter);
            }
            
	            if (model.f_newztid != null&& columsList.Contains("f_newztid"))
            {
                strSql.Append("f_newztid='" + (model.f_newztid) + "',");
                strSql_use.Append("f_newztid=:f_newztid,");
                parameter = new OracleParameter(":f_newztid", OracleType.VarChar);
                parameter.Value = model.f_newztid;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xsbfj != null&& columsList.Contains("f_xsbfj"))
            {
                strSql.Append("f_xsbfj='" + (model.f_xsbfj) + "',");
                strSql_use.Append("f_xsbfj=:f_xsbfj,");
                parameter = new OracleParameter(":f_xsbfj", OracleType.VarChar);
                parameter.Value = model.f_xsbfj;
                parameterList.Add(parameter);
            }
            
	            if (model.f_xsbbz != null&& columsList.Contains("f_xsbbz"))
            {
                strSql.Append("f_xsbbz='" + (model.f_xsbbz) + "',");
                strSql_use.Append("f_xsbbz=:f_xsbbz,");
                parameter = new OracleParameter(":f_xsbbz", OracleType.VarChar);
                parameter.Value = model.f_xsbbz;
                parameterList.Add(parameter);
            }
            
	            if (model.f_khjson != null&& columsList.Contains("f_khjson"))
            {
                strSql.Append("f_khjson='" + (model.f_khjson) + "',");
                strSql_use.Append("f_khjson=:f_khjson,");
                parameter = new OracleParameter(":f_khjson", OracleType.Clob);
                if (model.f_khjson == "")
                {
                    parameter.Value = " ";
                }
                else
                {
                    parameter.Value = model.f_khjson;
                }               
                parameterList.Add(parameter);
            }
            
	            if (model.f_khjsonid != null&& columsList.Contains("f_khjsonid"))
            {
                strSql.Append("f_khjsonid='" + (model.f_khjsonid) + "',");
                strSql_use.Append("f_khjsonid=:f_khjsonid,");
                parameter = new OracleParameter(":f_khjsonid", OracleType.VarChar);
                parameter.Value = model.f_khjsonid;
                parameterList.Add(parameter);
            }
            
	            if (model.fk_tbl_maintable_sys_id != null&& columsList.Contains("fk_tbl_maintable_sys_id"))
            {
                strSql.Append("fk_tbl_maintable_sys_id='" + (model.fk_tbl_maintable_sys_id) + "',");
                strSql_use.Append("fk_tbl_maintable_sys_id=:fk_tbl_maintable_sys_id,");
                parameter = new OracleParameter(":fk_tbl_maintable_sys_id", OracleType.VarChar);
                parameter.Value = model.fk_tbl_maintable_sys_id;
                parameterList.Add(parameter);
            }
            
	            if (model.f_lcfj != null&& columsList.Contains("f_lcfj"))
            {
                strSql.Append("f_lcfj='" + (model.f_lcfj) + "',");
                strSql_use.Append("f_lcfj=:f_lcfj,");
                parameter = new OracleParameter(":f_lcfj", OracleType.VarChar);
                parameter.Value = model.f_lcfj;
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
								List<string> paraStrList = new List<string>();
                List<OracleParameter> pList = new List<OracleParameter>();
                OracleParameter p = null;				
					
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
									if (columsList.Contains("f_khjson"))
				{ 
				if (model.f_khjson != null && model.f_khjson.Length > 0)
				{
				    p = new OracleParameter(":f_khjson", OracleType.Clob);
				    p.Value = (model.f_khjson);
				    pList.Add(p);
				    paraStrList.Add(" f_khjson = :f_khjson ");
				}
				else
				{
				    paraStrList.Add(" f_khjson = null ");
				}
				}	            
				
						            
				
						            
				
						            
				
						            
				
						            
				
						            
				
				if (paraStrList.Count > 0)
				{
					string updateSqlString = " update tbl_ld_ghsb set " + string.Join(" , ", paraStrList.ToArray()) + " where sys_id = '" + model.sys_id + "' ";
					if (pList.Count > 0)
					{
					   if (t == null)
					    {
					        columscount = _iAccessData.ExecuteSql(updateSqlString, pList.ToArray());
					    }
					    else
					    {
					        columscount = t.ExecuteSql(updateSqlString, pList.ToArray());
					    }
					}                
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
        public string UpdateList(List<sara.dd.ldsw.model.tbl_ld_ghsb> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            int column = 0;
            try
            {
               if (t == null)
                {
                    _iAccessDataTrans = Eva.Library.Data.AccessDataTrans.AccessDataTransFactory.CreateDataAccess(DataBaseType.oracledal, Eva.Library.Configuration.ConfigurationManager.AppSettings["DataBaseConnectionString"].ToString());
                    _iAccessDataTrans.getTrans().begin();
                }

                foreach (sara.dd.ldsw.model.tbl_ld_ghsb model in modelList)
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
            strSql.Append("delete tbl_ld_ghsb where  ");
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
            strSql.Append("update tbl_ld_ghsb set ");
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
            strSql.Append("select count(*) from tbl_ld_ghsb");
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
        public List<sara.dd.ldsw.model.tbl_ld_ghsb> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" select " + columnsString + " from (");
            strSql.Append(" select rownum rn,a.* from (");
            strSql.Append(" select * from tbl_ld_ghsb t where");
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

            List<sara.dd.ldsw.model.tbl_ld_ghsb> modelList = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_ghsb>(resultDataTable);
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
            strSql.Append(" select * from tbl_ld_ghsb t where");
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
            strSql.Append(" select * from tbl_ld_ghsb t where");
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
            sqlString += " (select to_number(f_tablesys_id)+1 from tbl_num where f_tablename  = 'tbl_ld_ghsb')";
            sqlString += " where f_tablename  = 'tbl_ld_ghsb'";

            if (t == null)
            {
                _iAccessData.ExecuteSql(sqlString);
            }
            else
            {
                t.ExecuteSql(sqlString);
            }

            sqlString = "select f_tablesys_id from tbl_num where f_tablename  = 'tbl_ld_ghsb'";


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
















