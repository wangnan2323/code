using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.model
{
    public class tbl_ld_jhdz
    {
        public tbl_ld_jhdz(string f_jhddz, string f_jyje, string f_jfbh, string f_jfje, DateTime f_jfrq, string f_dzjg,string f_ly)
        {
            this.f_jhddh = f_jhddh;
            this.f_jyje = f_jyje;
            this.f_jfbh = f_jfbh;
            this.f_jfje = f_jfje;
            this.f_jfrq = f_jfrq;
            this.f_dzjg = f_dzjg;
            this.f_ly = f_ly;
        }
        public tbl_ld_jhdz()
        {

        }
        #region Model
        //交行订单号
        string _f_jhddh;
        public string f_jhddh
        {
            get { return _f_jhddh; }
            set { _f_jhddh = value; }
        }
        //交易金额
        string _f_jyje;
        public string f_jyje
        {
            get { return _f_jyje; }
            set { _f_jyje = value; }
        }
        //缴费编号
        string _f_jfbh;
        public string f_jfbh
        {
            get { return _f_jfbh; }
            set { _f_jfbh = value; }
        }
        //缴费金额
        string _f_jfje;
        public string f_jfje
        {
            get { return _f_jfje; }
            set { _f_jfje = value; }
        }
        //来源
        string _f_ly;
        public string f_ly
        {
            get { return _f_ly; }
            set { _f_ly = value; }
        }
        //缴费日期
        DateTime _f_jfrq;
        public DateTime f_jfrq
        {
            get { return _f_jfrq; }
            set { _f_jfrq = value; }
        }
        //对账结果
        string _f_dzjg;
        public string f_dzjg
        {
            get { return _f_dzjg; }
            set { _f_dzjg = value; }
        }
        #endregion

        



    }

}