using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace sara.dd.ldsw.reportclass
{
    public class tbl_ld_jfb
    {
        #region 属性变量
        private Eva.Library.ServiceAdapter.IAdapter.IReport _ir = Eva.Library.ServiceAdapter.AdapterFactory.ReportFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        private sara.dd.ldsw.model.tbl_ld_jfb _model_tbl_ld_jfb = new sara.dd.ldsw.model.tbl_ld_jfb();
        private sara.dd.ldsw.idal.Itbl_ld_jfb _idal_tbl_ld_jfb = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_ld_jfb>(); //new sara.dd.ldsw.dal.tbl_maintable();
        #endregion

        #region 公有方法
        /// <summary>
        /// 缴费历史报表
        /// </summary>
        /// <param name="fk_tbl_maintable_sys_id"></param>
        /// <returns></returns>
        public string Report_jfls(DataTable dl_data)
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
            string reportname = "tbl_ld_jfb_jfls";

            //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
            string html = "false";
            //要导出文件名（用于对导出的文件命名）
            string outfilename = "缴费历史报表";
            //错误代码：为空时：说明成功；不为空时：请查阅错误表
            string errormessage = "";
            //文件路径：用于接受要导出文件的全路径
            string filepath = "";


            #region 组织数据

            #region 获取数据


            for (int i = 0; i < dl_data.Columns.Count; i++)
            {
                dl_data.Columns[i].ColumnName = dl_data.Columns[i].ColumnName.ToString().ToUpper();
            }

                //操作时间
                dl_data.Columns.Add(new DataColumn("CZSJ_TEXT"));
            for (int i = 0; i < dl_data.Rows.Count; i++)
            {
                dl_data.Rows[i]["CZSJ_TEXT"] = (DateTime.Parse(dl_data.Rows[i]["f_czsj"].ToString())).ToString("yyyy-MM-dd HH:mm:ss");
            }
            #endregion

            //数据项
            #region 数据项

            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置

            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            //ws20130626
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            //dr["DATAVALUE"] = _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据

            #endregion

            //表格
            #region 表格

            //表格
            DataTable dt_table = dl_data.Copy();

            //第一行用于存列数据类型
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);

            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion

            #endregion


            //合并单元格
            #region 合并单元格
            DataTable dt_merge = new DataTable("TBL_MAINTABLE");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            ds_merge.Tables.Add(dt_merge);
            #endregion

            #endregion


            //if (ds_table != null && ds_table.Tables.Count > 0 && ds_table.Tables[0] != null)
            //{
            //    for (int i_c = 0; i_c < ds_table.Tables[0].Columns.Count; i_c++)
            //    {
            //        ds_table.Tables[0].Columns[i_c].ColumnName = ds_table.Tables[0].Columns[i_c].ColumnName.ToUpper();
            //    }
            //}

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

            #endregion
        }

        
        public string ReportExcel(DataTable dt_data, string column, string columnname)
        {
            #region 导出CSV
            _cc.ClearReportFile();
            string[] columnarr = columnname.Split(',');
            for (int i = 0; i < columnarr.Length; i++)
            {
                dt_data.Columns[i].ColumnName = columnarr[i];
            }
            string filepath = Eva.Library.Format.FormatTextTool.GetMapPath(Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString(), HttpContext.Current.Server);
            string filename = "缴费信息" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + ".csv";
            sara.dd.ldsw.commonclass.commonclass.SaveCSV(dt_data, filepath + filename);
            return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;
            #endregion
        }
        #endregion
    }
}
