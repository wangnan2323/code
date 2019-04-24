using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.commonclass
{
    public class clobcontrol
    {
        #region 变量属性

        private static sara.dd.ldsw.model.tbl_clob _model_tbl_clob;
        private static sara.dd.ldsw.idal.Itbl_clob _idal_tbl_clob = dalfactory.Create<sara.dd.ldsw.idal.Itbl_clob>();// new sara.dd.ldsw.dal.tbl_clob();
        
        #endregion


        #region 公有方法
        /// <summary>
        /// 获取clobID
        /// </summary>
        /// <param name="tablename">业务表名称</param>
        /// <param name="columnname">业务表字段</param>
        /// <param name="sys_id">业务表主键</param>
        /// <param name="content">内容</param>
        /// <param name="userid">用户ID</param>
        /// <param name="username">用户名</param>
        /// <returns>clobid</returns>
        public static string GetNewClobId(string tablename, string columnname, string sys_id, string content, string userid, string username, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string clob_sys_id = "";
            _model_tbl_clob = new sara.dd.ldsw.model.tbl_clob();
            _model_tbl_clob.sys_id = 0;
            _model_tbl_clob.sys_orderid = "";
            _model_tbl_clob.sys_creatuserid = userid;
            _model_tbl_clob.sys_creatusername = username;
            _model_tbl_clob.sys_creatdate = System.DateTime.Now;
            _model_tbl_clob.sys_lastedituserid = userid;
            _model_tbl_clob.sys_lasteditusername = username;
            _model_tbl_clob.sys_lasteditdate = System.DateTime.Now;
            _model_tbl_clob.sys_deluserid = "";
            _model_tbl_clob.sys_delusername = "";
            _model_tbl_clob.sys_deldate = DateTime.Parse("1900-1-1");
            _model_tbl_clob.sys_delflag = "0";
            _model_tbl_clob.f_value1 = tablename + "^" + columnname;
            _model_tbl_clob.f_value2 = sys_id.ToString();
            _model_tbl_clob.f_value3 = "";
            _model_tbl_clob.f_value4 = "";
            _model_tbl_clob.f_value5 = "";
            _model_tbl_clob.f_value6 = "";
            _model_tbl_clob.f_value7 = "";
            _model_tbl_clob.f_value8 = "";
            _model_tbl_clob.f_value9 = "";
            _model_tbl_clob.f_value10 = "";
            _model_tbl_clob.f_clob = content;
            clob_sys_id = _idal_tbl_clob.Add(_model_tbl_clob, t);
            return clob_sys_id;
        }


        /// <summary>
        /// 更新clob 根据clobID
        /// </summary>
        /// <param name="tablename">业务表名称</param>
        /// <param name="columnname">业务表字段</param>
        /// <param name="sys_id">业务表主键</param>
        /// <param name="content">内容</param>
        /// <param name="sys_id">Clobid</param>
        /// <param name="userid">用户ID</param>
        /// <param name="username">用户名</param>
        /// <returns>clobid</returns>
        public static string UpdataClob(string tablename, string columnname, string sys_id, string content, string clobid, string userid, string username, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            string reuslt = "";
            _model_tbl_clob = _idal_tbl_clob.GetList(" sys_id='" + clobid + "'", "", "*", "", "", t)[0];
            //_model_tbl_clob.sys_id = 0;
            //_model_tbl_clob.sys_orderid = "";
            //_model_tbl_clob.sys_creatuserid = userid;
            //_model_tbl_clob.sys_creatusername = username;
            //_model_tbl_clob.sys_creatdate = System.DateTime.Now;
            _model_tbl_clob.sys_lastedituserid = userid;
            _model_tbl_clob.sys_lasteditusername = username;
            _model_tbl_clob.sys_lasteditdate = System.DateTime.Now;
            //_model_tbl_clob.sys_deluserid = "";
            //_model_tbl_clob.sys_delusername = "";
            //_model_tbl_clob.sys_deldate = DateTime.Parse("1900-1-1");
            //_model_tbl_clob.sys_delflag = "0";
            _model_tbl_clob.f_value1 = tablename + "^" + columnname;
            _model_tbl_clob.f_value2 = sys_id.ToString();
            //_model_tbl_clob.f_value3 = "";
            //_model_tbl_clob.f_value4 = "";
            //_model_tbl_clob.f_value5 = "";
            //_model_tbl_clob.f_value6 = "";
            //_model_tbl_clob.f_value7 = "";
            //_model_tbl_clob.f_value8 = "";
            //_model_tbl_clob.f_value9 = "";
            //_model_tbl_clob.f_value10 = "";
            _model_tbl_clob.f_clob = content;
            _idal_tbl_clob.Update(_model_tbl_clob, "sys_lastedituserid,sys_lasteditusername,sys_lasteditdate,f_value1,f_value2,f_clob", t);
            return reuslt;
        }


        /// <summary>
        /// 获取clob
        /// </summary>
        /// <param name="clobid">clobid</param>
        /// <param name="t"></param>
        /// <returns></returns>
        public static string GetClob(string clobid, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            _model_tbl_clob = _idal_tbl_clob.GetList(" sys_id='" + clobid + "'", "", "*", "", "", t)[0];
            return _model_tbl_clob.f_clob;
        }

        /// <summary>
        /// 删除clob
        /// </summary>
        /// <param name="clobid">clobid</param>
        /// <param name="t"></param>
        /// <returns></returns>
        public static string DeleteClob(string wherestr, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t)
        {
            _idal_tbl_clob.Delete(wherestr, t);
            return "";
        }
        #endregion
    }
}