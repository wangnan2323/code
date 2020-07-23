using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace sara.dd.ldsw.reportclass
{
    public class tbl_ld_report
    {
        #region 属性变量
        private Eva.Library.ServiceAdapter.IAdapter.IReport _ir = Eva.Library.ServiceAdapter.AdapterFactory.ReportFactory.CreateService(Eva.Library.Configuration.ConfigurationManager.AppSettings["AppCode"]);

        private sara.dd.ldsw.commonclass.commonclass _cc = new sara.dd.ldsw.commonclass.commonclass();
        private sara.dd.ldsw.model.tbl_ld_report _model_tbl_ld_jfb = new sara.dd.ldsw.model.tbl_ld_report();
        private sara.dd.ldsw.idal.Itbl_ld_report _idal_tbl_ld_jfb = commonclass.dalfactory.Create<sara.dd.ldsw.idal.Itbl_ld_report>(); //new sara.dd.ldsw.dal.tbl_maintable();
        #endregion


        /// <summary>
        /// 日结账报表
        /// </summary>
        /// <param name="fk_tbl_maintable_sys_id"></param>
        /// <returns></returns>
        public string Report_rjzbb(DataTable dl_data)
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
            string reportname = "tbl_ld_report_rjzbb";

            //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
            string html = "false";
            //要导出文件名（用于对导出的文件命名）
            string outfilename = "日结账报表";
            //错误代码：为空时：说明成功；不为空时：请查阅错误表
            string errormessage = "";
            //文件路径：用于接受要导出文件的全路径
            string filepath = "";


            #region 组织数据

            #region 获取数据

            int dy = 0;
            int qy = 0;
            int qn = 0;
            int hj = 0;

            for (int i = 0; i < dl_data.Columns.Count; i++)
            {
                dl_data.Columns[i].ColumnName = dl_data.Columns[i].ColumnName.ToString().ToUpper();


            }
            //获取合并单元格的开始行和结束行
            for (int i = 0; i < dl_data.Rows.Count; i++)
            {
                if (dl_data.Rows[i]["LX"].ToString() == "当月")
                {
                    dy = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "欠月")
                {
                    qy = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "欠年")
                {
                    qn = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "总计")
                {
                    hj = i;
                }

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
            DataTable dt_merge = new DataTable("data");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            DataRow dr_merge;



            ////从下向上，从右向左，录入合并信息



            int count_datasource = dt_table.Rows.Count;
            //日期  
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "8";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "12";
            dt_merge.Rows.Add(dr_merge);

            //客户分组
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "4";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "7";
            dt_merge.Rows.Add(dr_merge);


            //收费员
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "2";
            dt_merge.Rows.Add(dr_merge);




            //欠年
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (qn + 1).ToString();
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = (hj).ToString();
            dr_merge["endcolumn"] = "1";
            dt_merge.Rows.Add(dr_merge);


            //欠月
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (qy + 1).ToString();
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = (qn).ToString();
            dr_merge["endcolumn"] = "1";
            dt_merge.Rows.Add(dr_merge);
            //当月
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (dy + 1).ToString();
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = (qy).ToString();
            dr_merge["endcolumn"] = "1";
            dt_merge.Rows.Add(dr_merge);




            ds_merge.Tables.Add(dt_merge);




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

            #endregion
            #endregion
        }





        public string Report_jgbrjzbb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_jgbrjzbb";
            string html = "false";
            string outfilename = "经管部日结账报表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 获取数据
            int jmyh = 0;
            int cjtsj = 0;
            int ickyh = 0;
            int syyh = 0;
            int ickycds = 0;
            int syycds = 0;
            int xxfljg = 0;
            //int th = 0;
            int stc = 0;
            int lyqdss = 0;
            int icbkf = 0;
            int wyj = 0;
            int gsfwf = 0;
            int zjsf = 0;
            //int ycbyc = 0;
            //int ycjz = 0;
            int lhsbyj = 0;
            int hj = 0;
            int jlzydhs = 0;
            int jlzyczs = 0;
            int hmylg = 0;
            int tzhyys = 0;

            for (int i = 0; i < dl_data.Columns.Count; i++)
            {
                dl_data.Columns[i].ColumnName = dl_data.Columns[i].ColumnName.ToString().ToUpper();
            }
            #region
            for (int i = 0; i < dl_data.Rows.Count; i++)
            {
                if (dl_data.Rows[i]["LX"].ToString() == "居民用户")
                {
                    jmyh = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "超阶梯水费")
                {
                    cjtsj = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "IC卡用户")
                {
                    ickyh = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "商业用户")
                {
                    syyh = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "IC卡邮储代收")
                {
                    ickycds = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "商业邮储代收")
                {
                    syycds = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "学校、福利机构")
                {
                    xxfljg = i;
                }
                //if (dl_data.Rows[i]["LX"].ToString() == "天化")
                //{
                //    th = i;
                //}
                if (dl_data.Rows[i]["LX"].ToString() == "生态城")
                {
                    stc = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "旅游区")
                {
                    lyqdss = i;

                }
                if (dl_data.Rows[i]["LX"].ToString() == "玖龙纸业粗制水")
                {
                    jlzyczs = i;
                }

                if (dl_data.Rows[i]["LX"].ToString() == "玖龙纸业淡化水")
                {
                    jlzydhs = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "航母游乐港")
                {
                    hmylg = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "IC补卡费")
                {
                    icbkf = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "违约金")
                {
                    wyj = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "供水服务费")
                {
                    gsfwf = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "追缴水费")
                {
                    zjsf = i;
                }
                //if (dl_data.Rows[i]["LX"].ToString() == "远传表绿化表押金")
                //{
                //    ycbyc = i;
                //}
                //if (dl_data.Rows[i]["LX"].ToString() == "绿化表押金结转")
                //{
                //    ycjz = i;
                //}
                if (dl_data.Rows[i]["LX"].ToString() == "绿化水表押金")
                {
                    lhsbyj = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "特种行业用水")
                {
                    tzhyys = i;
                }
                if (dl_data.Rows[i]["LX"].ToString() == "合计")
                {
                    hj = i;
                }

            }
            #endregion
            #endregion
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
            DataTable dt_merge = new DataTable("data");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            DataRow dr_merge;

            //从下向上，从右向左，录入合并信息
            // int count_datasource = datasource.Rows.Count;
            int count_datasource = dt_table.Rows.Count;

            //制表日期
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "14";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "17";
            dt_merge.Rows.Add(dr_merge);

            //审定人
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "7";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "13";
            dt_merge.Rows.Add(dr_merge);

            //审核人
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "3";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "6";
            dt_merge.Rows.Add(dr_merge);
            //制表人
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (count_datasource - 1).ToString();
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = (count_datasource - 1).ToString();
            dr_merge["endcolumn"] = "2";
            dt_merge.Rows.Add(dr_merge);


            ////合计
            //if (hj != 0)
            //{
            //    dr_merge = dt_merge.NewRow();
            //    dr_merge["startrow"] = (hj).ToString();
            //    dr_merge["startcolumn"] = "1";
            //    dr_merge["endrow"] = hj.ToString();
            //    dr_merge["endcolumn"] = "1";
            //    dt_merge.Rows.Add(dr_merge);

            //}

            //绿化水表押金
            if (lhsbyj != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (lhsbyj + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (tzhyys).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);

            }
            ////绿化表押金结转
            //if (ycjz != 0)
            //{
            //    dr_merge = dt_merge.NewRow();
            //    dr_merge["startrow"] = (ycjz + 1).ToString();
            //    dr_merge["startcolumn"] = "1";
            //    dr_merge["endrow"] = (lhsbyj).ToString();
            //    dr_merge["endcolumn"] = "1";
            //    dt_merge.Rows.Add(dr_merge);
            //}

            ////远传表绿化表押金
            //if (ycbyc != 0)
            //{
            //    dr_merge = dt_merge.NewRow();
            //    dr_merge["startrow"] = (ycbyc + 1).ToString();
            //    dr_merge["startcolumn"] = "1";
            //    dr_merge["endrow"] = (ycjz).ToString();
            //    dr_merge["endcolumn"] = "1";
            //    dt_merge.Rows.Add(dr_merge);
            //}

            //追缴水费
            if (zjsf != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (zjsf + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (lhsbyj).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }

            //供水服务费
            if (gsfwf != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (gsfwf + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (zjsf).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }

            //违约金
            if (wyj != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (wyj + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (gsfwf).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }
            //IC补卡费
            if (icbkf != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (icbkf + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (wyj).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }
            //玖龙纸业淡化水
            if (jlzydhs != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (jlzydhs + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (icbkf).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
                //ds_merge.Tables.Add(dt_merge);
            }

            //玖龙纸业粗制水
            if (jlzyczs != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (jlzyczs + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (jlzydhs).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
                //ds_merge.Tables.Add(dt_merge);
            }

            //航母游乐港
            if (hmylg != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (hmylg + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (jlzyczs).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
                //ds_merge.Tables.Add(dt_merge);
            }

            //旅游区趸售水
            if (lyqdss != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (lyqdss + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (hmylg).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
                //ds_merge.Tables.Add(dt_merge);
            }
            //生态城
            if (stc != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (stc + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (lyqdss).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);

            }
            ////天化
            //if (th != 0) { 
            //    dr_merge = dt_merge.NewRow();
            //    dr_merge["startrow"] = (th + 1).ToString();
            //    dr_merge["startcolumn"] = "1";
            //    dr_merge["endrow"] = (stc).ToString();
            //    dr_merge["endcolumn"] = "1";
            //    dt_merge.Rows.Add(dr_merge);
            //}
            //学校福利
            if (xxfljg != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (xxfljg + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (stc).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }

            //商业邮储代收
            if (syycds != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (syycds + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (xxfljg).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }

            //IC卡邮储代收
            if (ickycds != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (ickycds + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (syycds).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }

            //商业用户
            if (syyh != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (syyh + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (ickycds).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }
            //IC卡用户
            if (ickyh != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (ickyh + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (syyh).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }
            ////超阶梯水费
            if (cjtsj != 0)
            {
                dr_merge = dt_merge.NewRow();
                dr_merge["startrow"] = (cjtsj + 1).ToString();
                dr_merge["startcolumn"] = "1";
                dr_merge["endrow"] = (ickyh).ToString();
                dr_merge["endcolumn"] = "1";
                dt_merge.Rows.Add(dr_merge);
            }
            //if(cjtsj!=0){
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = (cjtsj + 1).ToString();
            //dr_merge["startcolumn"] = "1";
            //dr_merge["endrow"] = (ickyh).ToString();
            //dr_merge["endcolumn"] = "1";
            //dt_merge.Rows.Add(dr_merge);

            //}

            ////居民用户

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = (jmyh + 1).ToString();
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = (cjtsj).ToString();
            dr_merge["endcolumn"] = "1";
            dt_merge.Rows.Add(dr_merge);

            ds_merge.Tables.Add(dt_merge);

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
            #endregion
        }

        public string Report_yhqkhzb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_yhqkhzb";
            string html = "false";
            string outfilename = "用户情况年度汇总表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
            //DataTable dt_merge = new DataTable("data");//与上文（1）处的表格名称相对应
            //dt_merge.Columns.Add(new DataColumn("startrow"));
            //dt_merge.Columns.Add(new DataColumn("startcolumn"));
            //dt_merge.Columns.Add(new DataColumn("endrow"));
            //dt_merge.Columns.Add(new DataColumn("endcolumn"));
            //DataRow dr_merge;

            ////从下向上，从右向左，录入合并信息
            //// int count_datasource = datasource.Rows.Count;
            //int count_datasource = dt_table.Rows.Count;

            //制表日期
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = (count_datasource - 1).ToString();
            //dr_merge["startcolumn"] = "14";
            //dr_merge["endrow"] = (count_datasource - 1).ToString();
            //dr_merge["endcolumn"] = "17";
            //dt_merge.Rows.Add(dr_merge);

            ////审定人
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = (count_datasource - 1).ToString();
            //dr_merge["startcolumn"] = "7";
            //dr_merge["endrow"] = (count_datasource - 1).ToString();
            //dr_merge["endcolumn"] = "13";
            //dt_merge.Rows.Add(dr_merge);

            ////审核人
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = (count_datasource - 1).ToString();
            //dr_merge["startcolumn"] = "3";
            //dr_merge["endrow"] = (count_datasource - 1).ToString();
            //dr_merge["endcolumn"] = "6";
            //dt_merge.Rows.Add(dr_merge);
            ////制表人
            //dr_merge = dt_merge.NewRow();
            //dr_merge["startrow"] = (count_datasource - 1).ToString();
            //dr_merge["startcolumn"] = "1";
            //dr_merge["endrow"] = (count_datasource - 1).ToString();
            //dr_merge["endcolumn"] = "2";
            //dt_merge.Rows.Add(dr_merge);

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
            #endregion
        }
        /// <summary>
        /// 水表更换情况年度统计表
        /// </summary>
        /// <returns></returns>
        public string Report_sbghqkndtjb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_sbghqkndtjb";
            string html = "false";
            string outfilename = "水表更换情况年度统计表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }
        public string Report_nxssrqkb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_nxssrqkb";
            string html = "false";
            string outfilename = "年销售收入情况表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }

        /// <summary>
        /// 商业用水欠费统计表
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public string Report_syysqftjb(DataTable dl_data)
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
            string reportname = "tbl_ld_report_syysqftjb";

            //传入值：是否需要html预览（true,false）；传出值：html文件路径或false
            string html = "false";
            //要导出文件名（用于对导出的文件命名）
            string outfilename = "商业用水欠费统计表";
            //错误代码：为空时：说明成功；不为空时：请查阅错误表
            string errormessage = "";
            //文件路径：用于接受要导出文件的全路径
            string filepath = "";


            #region 组织数据

            #region 获取数据

            //for (int i = 1; i < dl_data.Columns.Count-1; i++)
            //{

            //    //dl_data.Columns[i].ColumnName = dl_data.Columns[i].ColumnName.ToString().ToUpper();

            //    //dl_data.Columns.Add(new DataColumn(dl_data.Columns[i].ColumnName.ToString()));
            //}

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
            //DataTable dt_table = new DataTable();
            //dt_table.Columns.Add("月份");
            //dt_table.Columns.Add("年份");
            //for (int i = 0; i < dl_data.Columns.Count; i++)
            //{
            //    dt_table.Columns.Add(dl_data.Columns[i].ColumnName.ToString());

            //}

            //for (int j = 0; j < dl_data.Rows.Count; j++)
            //{

            //    dr = dt_table.NewRow();
            //    switch (j.ToString())
            //    {
            //        case "0":
            //            dr["月份"] = "1月份";
            //            dr["年份"] = "所欠费用/元（含排污";
            //            break;
            //        case "1":
            //            dr["月份"] = "2月份";
            //            break;
            //        case "2":
            //            dr["月份"] = "3月份";
            //            break;
            //        case "3":
            //            dr["月份"] = "4月份";
            //            break;
            //        case "4":
            //            dr["月份"] = "5月份";
            //            break;
            //        case "5":
            //            dr["月份"] = "6月份";
            //            break;
            //        case "6":
            //            dr["月份"] = "7月份";
            //            break;
            //        case "7":
            //            dr["月份"] = "8月份";
            //            break;
            //        case "8":
            //            dr["月份"] = "9月份";
            //            break;
            //        case "9":
            //            dr["月份"] = "10月份";
            //            break;
            //        case "10":
            //            dr["月份"] = "11月份";
            //            break;
            //        case "11":
            //            dr["月份"] = "12月份";
            //            break;
            //        case "12":
            //            dr["月份"] = "总计";
            //            break;
            //        case "13":
            //            dr["月份"] = "欠费占比";
            //            break;
            //    }
            //    for (int ii = 2; ii < dt_table.Columns.Count; ii++)
            //    {
            //        dr[dt_table.Columns[ii].ColumnName.ToString()] = dl_data.Rows[j][dt_table.Columns[ii].ColumnName.ToString()].ToString();
            //    }

            //    dt_table.Rows.Add(dr);
            //}
            dr = dt_table.NewRow();
            for (int i = 0; i < dt_table.Columns.Count; i++)
            {
                dr[dt_table.Columns[i].ToString()] = dt_table.Columns[i].ColumnName;
            }
            dt_table.Rows.InsertAt(dr, 0);
            dr = dt_table.NewRow();
            for (int i = 0; i < dt_table.Columns.Count; i++)
            {
                dr[dt_table.Columns[i].ToString()] = "0";
            }

            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion

            #endregion


            //合并单元格
            #region 合并单元格
            DataTable dt_merge = new DataTable("data");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            DataRow dr_merge;



            //从下向上，从右向左，录入合并信息



            int count_datasource_row = dt_table.Rows.Count;
            int count_datasource_columns = dt_table.Columns.Count;
            ////////合计  
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = 14;
            dr_merge["startcolumn"] = count_datasource_columns;
            dr_merge["endrow"] = 2;
            dr_merge["endcolumn"] = count_datasource_columns;
            dt_merge.Rows.Add(dr_merge);

            ds_merge.Tables.Add(dt_merge);

           



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

            #endregion
            #endregion
        }
        public string Report_sfqktjb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_sfqktjb";
            string html = "false";
            string outfilename = "收费情况统计表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }
        /// <summary>
        /// 节水办用户明细表
        /// </summary>
        /// <returns></returns>
        public string Report_jsbyhmxb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_jsbyhmxb";
            string html = "false";
            string outfilename = "节水办用户明细表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }


        /// <summary>
        /// 节水办用户信息变更明细表
        /// </summary>
        /// <returns></returns>
        public string Report_jsbyhxxbgmxb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_jsbyhxxbgmxb";
            string html = "false";
            string outfilename = "节水办用户信息变更明细表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }
/// <summary>
        /// 日结算报表
        /// </summary>
        /// <returns></returns>
        public string Report_rjsbb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_rjsbb";
            string html = "false";
            string outfilename = "日结算报表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }
        /// <summary>
        /// 月销售情况统计表
        /// </summary>
        /// <returns></returns>
        public string Report_yfxsqktjb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_yfxsqktjb";
            string html = "false";
            string outfilename = "月份销售情况统计表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
            DataTable dt_merge = new DataTable("data");//与上文（1）处的表格名称相对应
            dt_merge.Columns.Add(new DataColumn("startrow"));
            dt_merge.Columns.Add(new DataColumn("startcolumn"));
            dt_merge.Columns.Add(new DataColumn("endrow"));
            dt_merge.Columns.Add(new DataColumn("endcolumn"));
            DataRow dr_merge;

            //从下向上，从右向左，录入合并信息
                                    
            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "15";
            dr_merge["endrow"] = "10";
            dr_merge["endcolumn"] = "14";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "12";
            dr_merge["endrow"] = "10";
            dr_merge["endcolumn"] = "13";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "11";
            dr_merge["endrow"] = "11";
            dr_merge["endcolumn"] = "11";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "10";
            dr_merge["endrow"] = "11";
            dr_merge["endcolumn"] = "10";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "9";
            dr_merge["endrow"] = "11";
            dr_merge["endcolumn"] = "9";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "8";
            dr_merge["endrow"] = "10";
            dr_merge["endcolumn"] = "7";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "6";
            dr_merge["endrow"] = "10";
            dr_merge["endcolumn"] = "5";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "10";
            dr_merge["startcolumn"] = "4";
            dr_merge["endrow"] = "10";
            dr_merge["endcolumn"] = "3";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "9";
            dr_merge["startcolumn"] = "15";
            dr_merge["endrow"] = "9";
            dr_merge["endcolumn"] = "12";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "9";
            dr_merge["startcolumn"] = "11";
            dr_merge["endrow"] = "9";
            dr_merge["endcolumn"] = "9";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "9";
            dr_merge["startcolumn"] = "8";
            dr_merge["endrow"] = "9";
            dr_merge["endcolumn"] = "3";
            dt_merge.Rows.Add(dr_merge);

            dr_merge = dt_merge.NewRow();
            dr_merge["startrow"] = "9";
            dr_merge["startcolumn"] = "1";
            dr_merge["endrow"] = "11";
            dr_merge["endcolumn"] = "2";
            dt_merge.Rows.Add(dr_merge);

            ds_merge.Tables.Add(dt_merge);

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
            #endregion
        }

        /// <summary>
        /// 年水量及销售收入情况分析表
        /// </summary>
        /// <returns></returns>
        public string Report_nsljxssrqkfeb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_nsljxssrqkfeb";
            string html = "false";
            string outfilename = "年水量及销售收入情况分析表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }

        /// <summary>
        /// 年居民水量情况分析表
        /// </summary>
        /// <returns></returns>
        public string Report_njmslqkfxb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_njmslqkfxb";
            string html = "false";
            string outfilename = "年居民水量情况分析表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }

        /// <summary>
        /// 年销售水量情况汇总表
        /// </summary>
        /// <returns></returns>
        public string Report_nxsslqkhzb(DataTable dl_data)
        {
            #region 执行操作
            #region 报表导出
            DataSet ds_base = new DataSet();
            DataSet ds_merge = new DataSet();
            DataSet ds_table = new DataSet();
            string reportname = "tbl_ld_report_nxsslqkhzb";
            string html = "false";
            string outfilename = "年销售水量情况汇总表";
            string errormessage = "";
            string filepath = "";
            #region 组织数据
            #region 数据项
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DATANAME"));       //数据项名称
            dt.Columns.Add(new DataColumn("DATAVALUE"));      //数据据项值（如果数据项是值，此处填写数据项的值，否则为空）
            dt.Columns.Add(new DataColumn("TABLENAME"));      //数据据项关联表名（如果数据项是表格，此处填写表格名称，否则为空）
            dt.Columns.Add(new DataColumn("LOCATION"));       //定位信息：一般为空，在报表服务中设置
            dt.Columns.Add(new DataColumn("STYLE"));          //样式信息：一般为空，在报表服务中设置
            DataRow dr = dt.NewRow();                         //添加数据项
            dr["DATANAME"] = "＜＠_TABLE_＠＞";        //数据项名称--与配置信息中数据项名称对应
            dr["DATAVALUE"] = "";// _model_tbl_100_xm_qkdcb.f_qsdwmc.ToString();                             //因为此数项为表格，所以此处空
            dr["TABLENAME"] = "data";                  //因为此数项为表格，所以此处填写表格名称（1）
            dt.Rows.Add(dr);
            ds_base.Tables.Add(dt);
            #region 数据
            #endregion
            #region 表格
            DataTable dt_table = dl_data.Copy();
            dr = dt_table.NewRow();
            dt_table.Rows.InsertAt(dr, 0);
            dt_table.TableName = "data";               //与上文（1）处的表格名称相对应      
            ds_table.Tables.Add(dt_table);
            #endregion
            #endregion
            #region 合并单元格
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
            #endregion
        }

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
            string filename = "用水量排名" + Eva.Library.Text.NumberTool.GetNoRepeatNumber() + ".csv";
            sara.dd.ldsw.commonclass.commonclass.SaveCSV(dt_data, filepath + filename);
            return Eva.Library.Configuration.ConfigurationManager.AppSettings["ReportFileDownLoadLoadRootPath"].ToString() + filename;
            #endregion
        }
    }
}
