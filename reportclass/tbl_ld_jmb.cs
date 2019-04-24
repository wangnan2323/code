using Eva.Library.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.reportclass
{
    public class tbl_ld_jmb
    {

        #region 变量属性

        private Eva.Library.ServiceAdapter.IAdapter.IReport _ir = Eva.Library.ServiceAdapter.AdapterFactory.ReportFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        private sara.dd.ldsw.model.tbl_ld_yhb _model_tbl_ld_khb = new sara.dd.ldsw.model.tbl_ld_yhb();
        private sara.dd.ldsw.idal.Itbl_ld_yhb _idal_tbl_ld_yhb = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_ld_yhb>(); //new sara.dd.ldsw.dal.tbl_ld_khb();

        #endregion

        #region 公有方法

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fk_tbl_ld_yhb_sys_id"></param>
        /// <param name="p"></param>
        /// <returns></returns>
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
            string filename = "减免信息" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + ".csv";
            sara.dd.ldsw.commonclass.commonclass.SaveCSV(dt_data, filepath + filename);
            return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;
            #endregion
        }

        #endregion



    }
}