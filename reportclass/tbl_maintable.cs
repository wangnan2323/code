using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.reportclass
{
    public class tbl_maintable
    {

        #region 变量属性

        private Eva.Library.ServiceAdapter.IAdapter.IReport _ir = Eva.Library.ServiceAdapter.AdapterFactory.ReportFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        private sara.dd.ldsw.model.tbl_maintable _model_tbl_maintable = new sara.dd.ldsw.model.tbl_maintable();
        private sara.dd.ldsw.idal.Itbl_maintable _idal_tbl_maintable = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_maintable>(); //new sara.dd.ldsw.dal.tbl_maintable();

        #endregion

        #region 公有方法
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fk_tbl_maintable_sys_id"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        public string ReportWord(string fk_tbl_maintable_sys_id)
        {
            #region 执行操作

            #region 报表导出
            //数据项
            DataSet ds_base = new DataSet();
            //合并单元格
            DataSet ds_merge = new DataSet();
            //表格
            DataSet ds_table = new DataSet();
            //报表名称（唯一标识）
            string reportname = "40_tbl_maintable";

            //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
            string html = "false";
            //要导出文件名（用于对导出的文件命名）
            string outfilename = "";
            //错误代码：为空时：说明成功；不为空时：请查阅错误表
            string errormessage = "";
            //文件路径：用于接受要导出文件的全路径
            string filepath = "";

            #region 组织数据
            _model_tbl_maintable = _idal_tbl_maintable.GetList(" sys_id='" + fk_tbl_maintable_sys_id + "'", "", "*", "", "", null)[0];

            //数据项
            #region 数据项


            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置


            //项目名称
            DataRow dr = dt.NewRow();
            dr["DATANAME"] = "＜＠_TBL_MAINTABLE_XMMC_＠＞";
            dr["DATAVALUE"] = _model_tbl_maintable.xmmc;
            dr["TABLENAME"] = "";
            dt.Rows.Add(dr);


            //单位名称
            dr = dt.NewRow();
            dr["DATANAME"] = "＜＠_TBL_MAINTABLE_DWMC_＠＞";
            dr["DATAVALUE"] = _model_tbl_maintable.dwmc;
            dr["TABLENAME"] = "";
            dt.Rows.Add(dr);


            ds_base.Tables.Add(dt);
            #endregion

            //表格
            #region 表格

            //DataTable dt_data = _bll_tbl_100_xm_qsqk_xx.GetList(" fk_tbl_maintable_sys_id='" + fk_tbl_maintable_sys_id + "'").Tables[0];
            //DataTable dt_table = dt_data.Clone();
            ////第一行用于存列数据类型
            //dr = dt_table.NewRow();
            //dt_table.Rows.Add(dr);
            //dt_table.TableName = "TBL_100_XM_QSQK_XX_MODALPOPUPLIST";               //与上文（1）处的表格名称相对应      
            //ds_table.Tables.Add(dt_table);           //与上文（1）处的表格名称相对应      
            #endregion

            //合并单元格
            #region 合并单元格
            DataTable dt_merge = new DataTable("TBL_MAINTABLE");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            //DataRow dr_merge;

            //从下向上，从右向左，录入合并信息

            ds_merge.Tables.Add(dt_merge);

            #endregion

            #endregion
            #endregion
            _cc.ClearReportFile();
            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                filepath = sara.platform.service.report.Service.CreatReport(ds_base, ds_table, ds_merge, reportname, ref html, ref outfilename, ref errormessage);
            }
            else
            {
                filepath = _ir.CreatReport(ds_base, ds_table, ds_merge, reportname, ref html, ref outfilename, ref errormessage);
            }
            if (errormessage == "")
            {
                string path = filepath;
                string filename = "";
                int count = path.LastIndexOf('\\');
                filename = path.Substring(count, path.Length - count);
                filename = filename.TrimStart('\\');
                return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;

            }
            else
            {
                throw new Exception(errormessage);
            }
            #endregion
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fk_tbl_maintable_sys_id"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        public string ReportExcel(string fk_tbl_maintable_sys_id)
        {

            #region 执行操作

            #region 报表导出
            //数据项
            DataSet ds_base = new DataSet();
            //合并单元格
            DataSet ds_merge = new DataSet();
            //表格
            DataSet ds_table = new DataSet();
            //报表名称（唯一标识）
            string reportname = "40_tbl_maintable_excel";

            //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
            string html = "false";
            //要导出文件名（用于对导出的文件命名）
            string outfilename = "";
            //错误代码：为空时：说明成功；不为空时：请查阅错误表
            string errormessage = "";
            //文件路径：用于接受要导出文件的全路径
            string filepath = "";


            #region 组织数据

            #region 获取数据
            _model_tbl_maintable = _idal_tbl_maintable.GetList(" sys_id='" + fk_tbl_maintable_sys_id + "'", "", "*", "", "", null)[0];

            #endregion

            //数据项
            #region 数据项

            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr;
            #region 数据

            //表格
            dr = dt.NewRow();
            dr["DATANAME"] = "＜＠_TABLE_＠＞";
            dr["DATAVALUE"] = "";
            dr["TABLENAME"] = "TABLE";
            dt.Rows.Add(dr);

            ds_base.Tables.Add(dt);
            #endregion

            //表格
            DataTable dt_table = new DataTable();
            for (int i = 0; i < 20; i++)
            {
                dt_table.Columns.Add("XMMC" + (i + 1).ToString());
            }
            //第一行用于存列数据类型
            dr = dt_table.NewRow();
            dt_table.Rows.Add(dr);
            //输入数据
            DataRow dr_temp;
            for (int i = 0; i < 20; i++)
            {
                dr_temp = dt_table.NewRow();
                for (int j = 1; j <= 20; j++)
                {
                    dr_temp["XMMC" + j.ToString()] = _model_tbl_maintable.xmmc + "_" + j.ToString();
                }
                dt_table.Rows.Add(dr_temp);
            }
            dt_table.TableName = "TABLE";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);

            //合并单元格
            #region 合并单元格
            DataTable dt_merge = new DataTable("TABLE");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            DataRow dr_merge;

            ////从下向上，从右向左，录入合并信息
            //int count_datasource = datasource.Rows.Count;
            ////合计
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = count_datasource.ToString();
            //dr_merge["startcolumn"] = "1";
            //dr_merge["endrow"] = count_datasource.ToString();
            //dr_merge["endcolumn"] = "2";
            //dt_merge.Rows.Add(dr_merge);



            ds_merge.Tables.Add(dt_merge);
            #endregion


            #endregion

            #endregion


            #endregion

            _cc.ClearReportFile();
            if (sara.dd.ldsw.commonclass.commonclass.GetPlatformServiceModel() == "dll")
            {
                filepath = sara.platform.service.report.Service.CreatReport(ds_base, ds_table, ds_merge, reportname, ref html, ref outfilename, ref errormessage);
            }
            else
            {
                filepath = _ir.CreatReport(ds_base, ds_table, ds_merge, reportname, ref html, ref outfilename, ref errormessage);
            }
            if (errormessage == "")
            {
                string path = filepath;
                string filename = "";
                int count = path.LastIndexOf('\\');
                filename = path.Substring(count, path.Length - count);
                filename = filename.TrimStart('\\');
                return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;

            }
            else
            {
                throw new Exception(errormessage);
            }
            #endregion
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fk_tbl_maintable_sys_id"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        public string ReportExcelBig(string fk_tbl_maintable_sys_id)
        {
            string filepath = Eva.Library.Configuration.ConfigurationManager.AppSettings[HttpContext.Current.Request.PhysicalApplicationPath+"EasyFrameServiceReport.config", "40_reportdownloadpath"].ToString();
            //  /sara.dd.ldsw.file/reports/reportfile/
            filepath = HttpContext.Current.Server.MapPath(filepath);

            string filename = DateTime.Now.Ticks.ToString() + ".csv";

            FileStream fs = new FileStream(filepath + filename, System.IO.FileMode.Create, System.IO.FileAccess.Write);
            //StreamWriter sw = new StreamWriter(fs, System.Text.Encoding.Default);
            StreamWriter sw = new StreamWriter(fs, System.Text.Encoding.UTF8);

            _model_tbl_maintable = _idal_tbl_maintable.GetList(" sys_id='" + fk_tbl_maintable_sys_id + "'", "", "*", "", "", null)[0];

            DataTable dt = new DataTable();
            for (int i = 0; i < 20; i++)
            {
                dt.Columns.Add("XMMC" + (i + 1).ToString());
            }
            //输入数据
            DataRow dr_temp;
            for (int i = 0; i < 20000; i++)
            {
                dr_temp = dt.NewRow();
                for (int j = 1; j <= 20; j++)
                {
                    dr_temp["XMMC" + j.ToString()] = _model_tbl_maintable.xmmc + "_" + j.ToString();
                }
                dt.Rows.Add(dr_temp);
            }

            string data = "";
            //写出列名称
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                data += dt.Columns[i].ColumnName.ToString();
                if (i < dt.Columns.Count - 1)
                {
                    data += ",";
                }
            }
            sw.WriteLine(data);
            //写出各行数据
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                data = "";
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    string str = dt.Rows[i][j].ToString();
                    str = str.Replace("\"", "\"\"");//替换英文冒号 英文冒号需要换成两个冒号
                    var reg = new System.Text.RegularExpressions.Regex("^[1234567890.,，]+$");
                    if (reg.IsMatch(str))
                    {
                        str = "\t" + str;
                    }
                    if (str.Contains(",") || str.Contains("\"")
                        || str.Contains("\r") || str.Contains("\n")) //含逗号 冒号 换行符的需要放到引号中
                    {
                        str = string.Format("\"{0}\"", str);
                    }

                    data += str;
                    if (j < dt.Columns.Count - 1)
                    {
                        data += ",";
                    }
                }
                sw.WriteLine(data);
            }
            sw.Close();
            fs.Close();

            
            return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;


        }
        #endregion
    }
}