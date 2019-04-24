using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.reportclass
{
    public class tbl_ld_khbzdy
    {

        #region 变量属性

        private Eva.Library.ServiceAdapter.IAdapter.IReport _ir = Eva.Library.ServiceAdapter.AdapterFactory.ReportFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        private sara.dd.ldsw.model.tbl_ld_khb _model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_khb();
        private sara.dd.ldsw.idal.Itbl_ld_khb _idal_tbl_ld_khb = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_ld_khb>(); //new sara.dd.ldsw.dal.tbl_ld_khb();

        #endregion

        #region 公有方法
    
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fk_tbl_ld_khb_sys_id"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        public string ReportExcel(DataTable dt_data,string column,string columnname)
        {
            #region
            //#region 执行操作

            //#region 报表导出
            //数据项
            //DataSet ds_base = new DataSet();
            //合并单元格
            //DataSet ds_merge = new DataSet();
            //表格
            //DataSet ds_table = new DataSet();
            //报表名称（唯一标识）
            //string reportname = "tbl_ld_report_khzdybb";

            //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
            //string html = "false";
            //要导出文件名（用于对导出的文件命名）
            //string outfilename = "";
            //错误代码：为空时：说明成功；不为空时：请查阅错误表
            //string errormessage = "";
            //文件路径：用于接受要导出文件的全路径
            //string filepath = "";


            //#region 组织数据

            //#region 获取数据
            //_model_tbl_ld_khb = _idal_tbl_ld_khb.GetList(" sys_id='" + fk_tbl_ld_khb_sys_id + "'", "", "*", "", "", null)[0];

            //#endregion

            //数据项
            //#region 数据项

            //DataTable dt = new DataTable();
            //dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            //dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            //dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            //dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            //dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            //DataRow dr;
            //#region 数据

            //表格
            //dr = dt.NewRow();
            //dr["DATANAME"] = "＜＠_TABLE_＠＞";
            //dr["DATAVALUE"] = "";
            //dr["TABLENAME"] = "TABLE";
            //dt.Rows.Add(dr);

            //ds_base.Tables.Add(dt);
            //#endregion

            //表格
            //DataTable dt_table = dt_data.Clone();
        
            //第一行用于存列数据类型
            //dr = dt_table.NewRow();
            //DataRow dr2 = dt_table.NewRow();
            //string[] columnarr = columnname.Split(',');
            //for (int i = 0; i < columnarr.Length; i++)
            //{
            //    dr[i] = "0";
            //    dr2[i] = columnarr[i];
            //}
            //dt_table.Rows.Add(dr);
            //dt_table.Rows.Add(dr2);
            //输入数据
            //DataRow dr_temp;
            //for (int i = 0; i < dt_data.Rows.Count; i++)
            //{
            //    dr_temp = dt_table.NewRow();
            //    for (int j = 0; j < dt_data.Columns.Count; j++)
            //    {
            //        dr_temp[j] = dt_data.Rows[i][j].ToString();
            //    }
            //    dt_table.Rows.Add(dr_temp);
            //}
            //dt_table.TableName = "TABLE";               //与上文（1）处的表格名称相对应      
            //ds_table.Tables.Add(dt_table);

            //合并单元格
            //#region 合并单元格
            //DataTable dt_merge = new DataTable("TABLE");//与上文（1）处的表格名称相对应
            //dt_merge.Columns.Add(new DataColumn("startrow"));
            //dt_merge.Columns.Add(new DataColumn("startcolumn"));
            //dt_merge.Columns.Add(new DataColumn("endrow"));
            //dt_merge.Columns.Add(new DataColumn("endcolumn"));
            //DataRow dr_merge;

            ////从下向上，从右向左，录入合并信息
            //int count_datasource = datasource.Rows.Count;
            ////合计
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = count_datasource.ToString();
            //dr_merge["startcolumn"] = "1";
            //dr_merge["endrow"] = count_datasource.ToString();
            //dr_merge["endcolumn"] = "2";
            //dt_merge.Rows.Add(dr_merge);



            //ds_merge.Tables.Add(dt_merge);








            #endregion

            #region 导出CSV
            _cc.ClearReportFile();
            string[] columnarr = columnname.Split(',');
            for (int i = 0; i < columnarr.Length; i++)
            {
                dt_data.Columns[i].ColumnName = columnarr[i];
            }
            string filepath = Eva.Library.Format.FormatTextTool.GetMapPath(Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString(), HttpContext.Current.Server);
            string filename = "客户信息自定义" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + ".csv";
            sara.dd.ldsw.commonclass.commonclass.SaveCSV(dt_data, filepath + filename);
                return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;

            #endregion
        }
    
        #endregion
    }
}