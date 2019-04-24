using System;
using System.Collections;
using System.Collections.Specialized;
using System.Data;
using Oracle.DataAccess.Client;
using System.Data.Common;
using System.Collections.Generic;
using System.Web;
using System.Text;
using System.Reflection;
using System.Linq;

/*
 使用前添加引用Oracle.DataAccess，dll在路径
    C:\app\sk\product\11.2.0\dbhome_1\ODP.NET\bin\2.x\Oracle.DataAccess.dll
*/

namespace Eva.Library.Data.AccessOracleLargDataTrans
{
    

    /// <summary>
    /// OracleTransaction的方法
    /// </summary>
    public class Trans
    {
        private OracleConnection _conn;
        private OracleTransaction _trans;
        public Trans(OracleConnection conn)
        {
            this._conn = conn;
        }

        public void begin()
        {
            _trans = _conn.BeginTransaction();
        }

        public void commit()
        {
            _trans.Commit();
            _conn.Close();
        }
        public void rollback()
        {
            _trans.Rollback();
            _conn.Close();
        }

        public OracleTransaction getSqlTrans()
        {
            return this._trans;
        }
    }



    /// <summary>
    /// sql数据库带事务的访问器
    /// </summary>
    public class AccessDataTrans
    {

        private OracleConnection _connection;
        private Trans _trans;

        public AccessDataTrans(string databaseconnectstring)
        {
            OracleConnection conn = new OracleConnection(databaseconnectstring);
            conn.Open();
            this._connection = conn;
            this._trans = new Trans(this._connection);
        }


        /// <summary>
        /// 执行SQL语句，返回影响的记录数
        /// </summary>
        /// <param name="SQLString">SQL语句</param>
        /// <returns>影响的记录数</returns>
        public int ExecuteSql(string SQLString)
        {
            if (this._trans.getSqlTrans() == null)
            {
                throw new Exception("ExecuteSql操作必须开始一个事务");
            }
            using (OracleCommand cmd = new OracleCommand(SQLString, this._connection))
            {
                try
                {
                    cmd.Transaction = this._trans.getSqlTrans();
                    int rows = cmd.ExecuteNonQuery();

                    return rows;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    cmd.Dispose();
                }

            }
        }

        /// <summary>
        /// 执行查询语句，返回DataSet
        /// </summary>
        /// <param name="SQLString">查询语句</param>
        /// <returns>DataSet</returns>
        public DataSet Query(string SQLString)
        {
            if (this._trans.getSqlTrans() == null)
            {
                throw new Exception("Query操作必须开始一个事务");
            }
            using (OracleCommand cmd = new OracleCommand(SQLString, this._connection))
            {
                try
                {
                    DataSet ds = new DataSet();
                    cmd.Transaction = this._trans.getSqlTrans();
                    OracleDataAdapter command = new OracleDataAdapter(cmd);
                    command.Fill(ds, "ds");
                    return ds;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    cmd.Dispose();
                }
            }
        }


        /// <summary>
        ///  批量插入数据
        /// </summary>
        /// <param name="tableName">表名称</param>
        /// <param name="columnRowData">键-值存储的批量数据：键是列名称，值是该列对应的数据集合</param>
        /// <returns></returns>

        public int BatchInsert(string tableName, Dictionary<string, object[]> columnRowData)
        {

            if (string.IsNullOrEmpty(tableName))
            {
                throw new ArgumentNullException("tableName", "必须指定批量插入的表名称");
            }

            if (columnRowData == null || columnRowData.Count < 1)
            {
                throw new ArgumentException("必须指定批量插入的字段名称", "columnRowData");

            }

            if (this._trans.getSqlTrans() == null)
            {
                throw new Exception("ExecuteSql操作必须开始一个事务");
            }


            int iResult = 0;

            string[] dbColumns = columnRowData.Keys.ToArray();

            StringBuilder sbCmdText = new StringBuilder();

            if (columnRowData.Count > 0)
            {
                #region code
                // 准备插入SQL
                sbCmdText.AppendFormat("INSERT INTO {0} (", tableName);
                sbCmdText.Append(string.Join(",", dbColumns));
                sbCmdText.Append(") VALUES (");
                sbCmdText.Append(":" + string.Join(", :", dbColumns));
                sbCmdText.Append(") ");

                using (OracleCommand cmd = this._connection.CreateCommand())
                {
                    cmd.Transaction = this._trans.getSqlTrans();
                    // 绑定批处理的行数
                    cmd.ArrayBindCount = columnRowData.Values.First().Length; // 很重要
                    cmd.BindByName = true;
                    cmd.CommandType = CommandType.Text;
                    cmd.CommandText = sbCmdText.ToString();
                    cmd.CommandTimeout = 600; // 10分钟

                    // 创建参数
                    OracleParameter oraParam;
                    List<IDbDataParameter> cacher = new List<IDbDataParameter>();
                    OracleDbType dbType = OracleDbType.Object;
                    foreach (string colName in dbColumns)
                    {

                        dbType = this.getOracleDbType(columnRowData[colName][0]);
                        oraParam = new OracleParameter(colName, dbType);
                        oraParam.Direction = ParameterDirection.Input;
                        oraParam.OracleDbTypeEx = dbType;
                        oraParam.Value = columnRowData[colName];
                        cmd.Parameters.Add(oraParam);
                    }



                    // 执行批处理
                    try
                    {
                        iResult = cmd.ExecuteNonQuery();
                        cmd.Dispose();

                    }
                    catch (Exception dbex)
                    {
                        cmd.Dispose();

                        throw dbex;
                    }

                }
                #endregion

            }

            return iResult;

        }



        ///  批量更新数据
        /// </summary>
        /// <param name="tableName">表名称</param>
        /// <param name="keyColumName">主键列名称</param>
        /// <param name="columnRowData">键-值存储的批量数据：键是列名称，值是该列对应的数据集合</param>
        /// <returns></returns>

        public int BatchUpdate(string tableName, string keyColumName, Dictionary<string, object[]> columnRowData)

        {

            if (string.IsNullOrEmpty(tableName))
            {
                throw new ArgumentNullException("tableName", "必须指定批量插入的表名称");
            }

            if (string.IsNullOrEmpty(tableName))
            {
                throw new ArgumentNullException("keyColumName", "必须指定批量插入表的主键列名称");
            }

            if (columnRowData == null || columnRowData.Count < 1)
            {
                throw new ArgumentException("必须指定批量插入的字段名称", "columnRowData");
            }

            if (this._trans.getSqlTrans() == null)
            {
                throw new Exception("ExecuteSql操作必须开始一个事务");
            }



            int iResult = 0;

            string[] dbColumns = columnRowData.Keys.ToArray();

            StringBuilder sbCmdText = new StringBuilder();

            if (columnRowData.Count > 0)
            {
                // 准备更新SQL
                sbCmdText.AppendFormat("update {0} set  ", tableName);
                foreach (var col in dbColumns)
                {
                    if (keyColumName.Equals(col, StringComparison.OrdinalIgnoreCase))
                    {
                        continue;
                    }

                    sbCmdText.AppendFormat("{0} = :{0} ,", col);

                }
                sbCmdText.Remove(sbCmdText.Length - 1, 1);
                sbCmdText.AppendFormat(" where {0} = :{0}", keyColumName);


                #region code
                using (OracleCommand cmd = this._connection.CreateCommand())
                {

                    // 绑定批处理的行数

                    cmd.ArrayBindCount = columnRowData.Values.First().Length; // 很重要
                    cmd.BindByName = true;
                    cmd.CommandType = CommandType.Text;
                    cmd.CommandText = sbCmdText.ToString();
                    cmd.CommandTimeout = 600; // 10分钟

                    // 创建参数

                    OracleParameter oraParam;
                    List<IDbDataParameter> cacher = new List<IDbDataParameter>();
                    OracleDbType dbType = OracleDbType.Object;
                    foreach (string colName in dbColumns)
                    {

                        dbType = this.getOracleDbType(columnRowData[colName][0]);
                        oraParam = new OracleParameter(colName, dbType);
                        oraParam.Direction = ParameterDirection.Input;
                        oraParam.OracleDbTypeEx = dbType;
                        oraParam.Value = columnRowData[colName];
                        cmd.Parameters.Add(oraParam);
                    }

                    try
                    {
                        cmd.Transaction = this._trans.getSqlTrans();
                        iResult = cmd.ExecuteNonQuery();
                        cmd.Dispose();

                    }

                    catch (Exception dbex)
                    {

                        cmd.Dispose();
                        throw dbex;

                    }

                }
                #endregion

            }



            return iResult;

        }
        /// <summary>
        ///  根据数据类型获取OracleDbType
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>

        private OracleDbType getOracleDbType(object value)

        {

            OracleDbType dataType = OracleDbType.Object;

            if (value is string)

            {

                dataType = OracleDbType.Varchar2;

            }

            else if (value is DateTime)

            {

                dataType = OracleDbType.TimeStamp;

            }

            else if (value is int || value is short)

            {

                dataType = OracleDbType.Int32;

            }

            else if (value is long)

            {

                dataType = OracleDbType.Int64;

            }

            else if (value is decimal || value is double)

            {

                dataType = OracleDbType.Decimal;

            }

            else if (value is Guid)

            {

                dataType = OracleDbType.Varchar2;

            }

            else if (value is bool || value is Boolean)

            {

                dataType = OracleDbType.Byte;

            }

            else if (value is byte[])

            {

                dataType = OracleDbType.Blob;

            }

            else if (value is char)

            {

                dataType = OracleDbType.Char;

            }



            return dataType;

        }

        /// <summary>
        /// 将model转换为Dictionary<string, object[]>格式
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="modelList"></param>
        /// <returns></returns>
        public Dictionary<string, object[]> GetRowDataByModelList<T>(List<T> modelList)
        {

            //结果集
            Dictionary<string, object[]> restult = new Dictionary<string, object[]>();

            //获取model的结构
            Dictionary<string, string> modelDefi = getModelDefi<T>(modelList[0]);


            foreach (string key in modelDefi.Keys)
            {
                List<object> values = new List<object>();
                string defi = modelDefi[key];
                foreach (T model in modelList)
                {
                    object oo = getModelValue<T>(model, key);

                    if (oo == null)
                    {
                        switch (defi)
                        {
                            case "int32":
                                values.Add(0);
                                break;
                            case "string":
                                values.Add("");
                                break;
                            case "datetime":
                                values.Add(DateTime.Parse("1900-01-01"));
                                break;
                        }
                    }
                    else
                    {
                        values.Add(oo);
                    }
                }

                restult[key] = values.ToArray();
            }

            return restult;
        }

        /// <summary>
        /// 获取model的结构
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        private Dictionary<string, string> getModelDefi<T>(T t)
        {
            Dictionary<string, string> modelDefi = new Dictionary<string, string>();
            PropertyInfo[] pis = typeof(T).GetProperties();

            foreach (PropertyInfo pi in pis)
            {
                string attrName = pi.Name.ToString().ToLower();//得到属性的名称
                string attrType = pi.PropertyType.Name.ToString().ToLower();//得到属性的类型

                modelDefi[attrName] = attrType;
            }

            return modelDefi;
        }

        /// <summary>
        /// 获取model中指定字段的值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        private object getModelValue<T>(T t, string key)
        {
            object o = null;
            PropertyInfo[] pis = typeof(T).GetProperties();
            foreach (PropertyInfo pi in pis)
            {
                string attrName = pi.Name.ToString();//得到属性的名称
                if (key == attrName)
                {
                    o = pi.GetValue(t, null);
                    break;
                }
            }

            return o;
        }

        /// <summary>
        /// 获取事务
        /// </summary>
        /// <returns></returns>
        public Trans getTrans()
        {
            return this._trans;
        }


    }

}


/*
 
      Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans aa = null;
                                try
                                {
                                   aa = new Eva.Library.Data.AccessOracleLargDataTrans.AccessDataTrans("user id=saradd_ldsw_0930;data source=gis1661;password=xibanyavsagenting");

                                    Console.WriteLine(System.DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss"));
                                    List<sara.dd.ldsw.model.tbl_ld_cbiao> ml = new List<model.tbl_ld_cbiao>();
                                    sara.dd.ldsw.dal.tbl_ld_cbiao dal = new ldsw.dal.tbl_ld_cbiao();
                                    int countccc = 10000;
                                    for (int i = 0; i < countccc; i++)
                                    {
                                        sara.dd.ldsw.model.tbl_ld_cbiao model1 = new ldsw.model.tbl_ld_cbiao();
                                        model1.sys_id = int.Parse(dal.GetMaxId(null));
                                        model1.sys_creatdate = System.DateTime.Now;
                                        ml.Add(model1);
                                    }
                                    Console.WriteLine(System.DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss"));


                                    aa.getTrans().begin();
                                    Dictionary<string, object[]> result = aa.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(ml);
                                    aa.BatchInsert("tbl_ld_cbiao", result);

                                    string sql = "select * from tbl_ld_cbiao where sys_id > 2960145";
                                    DataSet ds = aa.Query(sql);
                                    List<sara.dd.ldsw.model.tbl_ld_cbiao> ml1 = Eva.Library.Format.FormatEntityTool.FormatDataTableToModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(ds.Tables[0]);

                                    for (int i = 0; i < ml1.Count; i++)
                                    {
                                        ml1[i].sys_orderid = i.ToString();
                                    }

                                    Dictionary<string, object[]> result11 = aa.GetRowDataByModelList<sara.dd.ldsw.model.tbl_ld_cbiao>(ml1);
                                    aa.BatchUpdate("tbl_ld_cbiao", "sys_id", result11);

                                    aa.getTrans().commit();

                                    Console.WriteLine(System.DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss"));
                                }
                                catch(Exception ex)
                                {
                                    aa.getTrans().rollback();
                                    Console.WriteLine(System.DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + ex.Message + ex.StackTrace);
                                }
     */
