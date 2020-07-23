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
namespace sara.dd.ldsw.model
{
    [Serializable]
    /// <summary>
    /// 实体类tbl_ld_cbiao 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_cbiao
    {
    	public tbl_ld_cbiao()
		{}
		#region Model
                
		private int _sys_id;
                
		private string _sys_orderid;
                
		private string _sys_creatuserid;
                
		private string _sys_creatusername;
                
		private DateTime _sys_creatdate;
                
		private string _sys_lastedituserid;
                
		private string _sys_lasteditusername;
                
		private DateTime _sys_lasteditdate;
                
		private string _sys_deluserid;
                
		private string _sys_delusername;
                
		private DateTime _sys_deldate;
                
		private string _sys_delflag;
                
		private string _f_value1;
                
		private string _f_value2;
                
		private string _f_value3;
                
		private string _f_value4;
                
		private string _f_value5;
                
		private string _f_value6;
                
		private string _f_value7;
                
		private string _f_value8;
                
		private string _f_value9;
                
		private string _f_value10;
                
		private string _f_cb_cbbh;
                
		private string _f_cb_cbbhid;
                
		private string _f_khbh;
                
		private string _f_khbhid;
                
		private string _f_sqzm;
                
		private string _f_bqzm;
                
		private string _f_bqsl;
                
		private string _f_sqsl;
                
		private string _f_qsqpjsl;
                
		private string _f_qlqpjsl;
                
		private string _f_cbyname;
                
		private string _f_cbyid;
                
		private string _f_cbyphoto;
                
		private DateTime _f_cbsj;
                
		private string _f_bk;
                
		private string _f_bkid;
                
		private string _f_zt;
                
		private string _f_ztid;
                
		private string _f_ly;
                
		private string _f_lyid;
                
		private string _f_bz;
                
		private string _f_sbbh;
                
		private string _f_sbbhid;
                
		private string _f_sblx;
                
		private string _f_sblxid;
                
		private string _f_yslx;
                
		private string _f_yslxid;
                
		private string _f_lxtkhh;
                
		private string _f_cbbh;
                
		private string _f_cbbhid;
                
		private string _f_cbmc;
                
		private string _f_yhbh;
                
		private string _f_yhbhid;
                
		private string _f_yhm;
                
		private string _f_jfm;
                
		private string _f_dh;
                
		private string _f_dz;
                
		private string _f_dy;
                
		private string _f_dyid;
                
		private string _f_sc;
                
		private string _f_scid;
                
		private string _f_qy;
                
		private string _f_qyid;
                
		private string _f_pq;
                
		private string _f_pqid;
                
		private string _f_pgbh;
                
		private string _f_pgbhid;
                
		private string _f_pgr;
                
		private string _f_pgrid;
                
		private string _f_pgpcmc;
                
		private DateTime _f_pgsj;
                
		private string _f_jfbh;
                
		private string _f_jfbhid;
                
		private DateTime _f_jfsj;
                
		private string _f_bqje;
        private string _f_kj;
        private string _f_kjid;
        private string _f_ztkhh;
        private string _f_ztsbh;
        private string _f_ztyhh;
        private string _f_rs;
		private string _f_khfz;
		private string _f_khfzid;
		private string _f_sf;
		private string _f_pwf;
		private string _f_sjljsyl;
		private string _f_jmje;
		private string _f_jmbh;
		private string _f_jmbhid;
		private string _f_sfsfts;
        private string _f_sfjl;

        private string _f_dyjtsl;
        private string _f_dyjtsf;
        private string _f_dejtsl;
        private string _f_dejtsf;
        private string _f_dsjtsl;
        private string _f_dsjtsf;
		/// <summary>
		/// 主键
		/// </summary>
		public int sys_id
		{
			get{return _sys_id;}
			set{ _sys_id=value;}
		}
                
		/// <summary>
		/// 序号
		/// </summary>
		public string sys_orderid
		{
			get{return _sys_orderid;}
			set{ _sys_orderid=value;}
		}
                
		/// <summary>
		/// 创建人ID
		/// </summary>
		public string sys_creatuserid
		{
			get{return _sys_creatuserid;}
			set{ _sys_creatuserid=value;}
		}
                
		/// <summary>
		/// 创建人名称
		/// </summary>
		public string sys_creatusername
		{
			get{return _sys_creatusername;}
			set{ _sys_creatusername=value;}
		}
                
		/// <summary>
		/// 创建日期
		/// </summary>
		public DateTime sys_creatdate
		{
			get{return _sys_creatdate;}
			set{ _sys_creatdate=value;}
		}
                
		/// <summary>
		/// 最后修改人ID
		/// </summary>
		public string sys_lastedituserid
		{
			get{return _sys_lastedituserid;}
			set{ _sys_lastedituserid=value;}
		}
                
		/// <summary>
		/// 最后修改人名称
		/// </summary>
		public string sys_lasteditusername
		{
			get{return _sys_lasteditusername;}
			set{ _sys_lasteditusername=value;}
		}
                
		/// <summary>
		/// 最后修改日期
		/// </summary>
		public DateTime sys_lasteditdate
		{
			get{return _sys_lasteditdate;}
			set{ _sys_lasteditdate=value;}
		}
                
		/// <summary>
		/// 删除人ID
		/// </summary>
		public string sys_deluserid
		{
			get{return _sys_deluserid;}
			set{ _sys_deluserid=value;}
		}
                
		/// <summary>
		/// 删除人名称
		/// </summary>
		public string sys_delusername
		{
			get{return _sys_delusername;}
			set{ _sys_delusername=value;}
		}
                
		/// <summary>
		/// 删除日期
		/// </summary>
		public DateTime sys_deldate
		{
			get{return _sys_deldate;}
			set{ _sys_deldate=value;}
		}
                
		/// <summary>
		/// 删除标志位
		/// </summary>
		public string sys_delflag
		{
			get{return _sys_delflag;}
			set{ _sys_delflag=value;}
		}
                
		/// <summary>
		/// 备用字段1
		/// </summary>
		public string f_value1
		{
			get{return _f_value1;}
			set{ _f_value1=value;}
		}
                
		/// <summary>
		/// 备用字段2
		/// </summary>
		public string f_value2
		{
			get{return _f_value2;}
			set{ _f_value2=value;}
		}
                
		/// <summary>
		/// 备用字段3
		/// </summary>
		public string f_value3
		{
			get{return _f_value3;}
			set{ _f_value3=value;}
		}
                
		/// <summary>
		/// 备用字段4
		/// </summary>
		public string f_value4
		{
			get{return _f_value4;}
			set{ _f_value4=value;}
		}
                
		/// <summary>
		/// 备用字段5
		/// </summary>
		public string f_value5
		{
			get{return _f_value5;}
			set{ _f_value5=value;}
		}
                
		/// <summary>
		/// 备用字段6
		/// </summary>
		public string f_value6
		{
			get{return _f_value6;}
			set{ _f_value6=value;}
		}
                
		/// <summary>
		/// 备用字段7
		/// </summary>
		public string f_value7
		{
			get{return _f_value7;}
			set{ _f_value7=value;}
		}
                
		/// <summary>
		/// 备用字段8
		/// </summary>
		public string f_value8
		{
			get{return _f_value8;}
			set{ _f_value8=value;}
		}
                
		/// <summary>
		/// 备用字段9
		/// </summary>
		public string f_value9
		{
			get{return _f_value9;}
			set{ _f_value9=value;}
		}
                
		/// <summary>
		/// 备用字段10
		/// </summary>
		public string f_value10
		{
			get{return _f_value10;}
			set{ _f_value10=value;}
		}
                
		/// <summary>
		/// 抄表编号
		/// </summary>
		public string f_cb_cbbh
		{
			get{return _f_cb_cbbh;}
			set{ _f_cb_cbbh=value;}
		}
                
		/// <summary>
		/// 抄表编号id
		/// </summary>
		public string f_cb_cbbhid
		{
			get{return _f_cb_cbbhid;}
			set{ _f_cb_cbbhid=value;}
		}
                
		/// <summary>
		/// 客户编号
		/// </summary>
		public string f_khbh
		{
			get{return _f_khbh;}
			set{ _f_khbh=value;}
		}
                
		/// <summary>
		/// 客户编号id
		/// </summary>
		public string f_khbhid
		{
			get{return _f_khbhid;}
			set{ _f_khbhid=value;}
		}
                
		/// <summary>
		/// 上期止码
		/// </summary>
		public string f_sqzm
		{
			get{return _f_sqzm;}
			set{ _f_sqzm=value;}
		}
                
		/// <summary>
		/// 本期止码
		/// </summary>
		public string f_bqzm
		{
			get{return _f_bqzm;}
			set{ _f_bqzm=value;}
		}
                
		/// <summary>
		/// 本期水量
		/// </summary>
		public string f_bqsl
		{
			get{return _f_bqsl;}
			set{ _f_bqsl=value;}
		}
                
		/// <summary>
		/// 上期水量
		/// </summary>
		public string f_sqsl
		{
			get{return _f_sqsl;}
			set{ _f_sqsl=value;}
		}
                
		/// <summary>
		/// 前三期平均水量
		/// </summary>
		public string f_qsqpjsl
		{
			get{return _f_qsqpjsl;}
			set{ _f_qsqpjsl=value;}
		}
                
		/// <summary>
		/// 前六期平均水量
		/// </summary>
		public string f_qlqpjsl
		{
			get{return _f_qlqpjsl;}
			set{ _f_qlqpjsl=value;}
		}
                
		/// <summary>
		/// 抄表员name
		/// </summary>
		public string f_cbyname
		{
			get{return _f_cbyname;}
			set{ _f_cbyname=value;}
		}
                
		/// <summary>
		/// 抄表员id
		/// </summary>
		public string f_cbyid
		{
			get{return _f_cbyid;}
			set{ _f_cbyid=value;}
		}
                
		/// <summary>
		/// 抄表员photo
		/// </summary>
		public string f_cbyphoto
		{
			get{return _f_cbyphoto;}
			set{ _f_cbyphoto=value;}
		}
                
		/// <summary>
		/// 抄表时间
		/// </summary>
		public DateTime f_cbsj
		{
			get{return _f_cbsj;}
			set{ _f_cbsj=value;}
		}
                
		/// <summary>
		/// 表况
		/// </summary>
		public string f_bk
		{
			get{return _f_bk;}
			set{ _f_bk=value;}
		}
                
		/// <summary>
		/// 表况id
		/// </summary>
		public string f_bkid
		{
			get{return _f_bkid;}
			set{ _f_bkid=value;}
		}
                
		/// <summary>
		/// 状态
		/// </summary>
		public string f_zt
		{
			get{return _f_zt;}
			set{ _f_zt=value;}
		}
                
		/// <summary>
		/// 状态id
		/// </summary>
		public string f_ztid
		{
			get{return _f_ztid;}
			set{ _f_ztid=value;}
		}
                
		/// <summary>
		/// 来源
		/// </summary>
		public string f_ly
		{
			get{return _f_ly;}
			set{ _f_ly=value;}
		}
                
		/// <summary>
		/// 来源id
		/// </summary>
		public string f_lyid
		{
			get{return _f_lyid;}
			set{ _f_lyid=value;}
		}
                
		/// <summary>
		/// 备注
		/// </summary>
		public string f_bz
		{
			get{return _f_bz;}
			set{ _f_bz=value;}
		}
                
		/// <summary>
		/// 水表编号
		/// </summary>
		public string f_sbbh
		{
			get{return _f_sbbh;}
			set{ _f_sbbh=value;}
		}
                
		/// <summary>
		/// 水表编号id
		/// </summary>
		public string f_sbbhid
		{
			get{return _f_sbbhid;}
			set{ _f_sbbhid=value;}
		}
                
		/// <summary>
		/// 水表类型
		/// </summary>
		public string f_sblx
		{
			get{return _f_sblx;}
			set{ _f_sblx=value;}
		}
                
		/// <summary>
		/// 水表类型id
		/// </summary>
		public string f_sblxid
		{
			get{return _f_sblxid;}
			set{ _f_sblxid=value;}
		}
                
		/// <summary>
		/// 用水类别
		/// </summary>
		public string f_yslx
		{
			get{return _f_yslx;}
			set{ _f_yslx=value;}
		}
                
		/// <summary>
		/// 用水类别id
		/// </summary>
		public string f_yslxid
		{
			get{return _f_yslxid;}
			set{ _f_yslxid=value;}
		}
                
		/// <summary>
		/// 老系统客户号
		/// </summary>
		public string f_lxtkhh
		{
			get{return _f_lxtkhh;}
			set{ _f_lxtkhh=value;}
		}
                
		/// <summary>
		/// 抄本编号
		/// </summary>
		public string f_cbbh
		{
			get{return _f_cbbh;}
			set{ _f_cbbh=value;}
		}
                
		/// <summary>
		/// 抄本编号id
		/// </summary>
		public string f_cbbhid
		{
			get{return _f_cbbhid;}
			set{ _f_cbbhid=value;}
		}
                
		/// <summary>
		/// 抄本名称
		/// </summary>
		public string f_cbmc
		{
			get{return _f_cbmc;}
			set{ _f_cbmc=value;}
		}
                
		/// <summary>
		/// 用户编号
		/// </summary>
		public string f_yhbh
		{
			get{return _f_yhbh;}
			set{ _f_yhbh=value;}
		}
                
		/// <summary>
		/// 用户编号id
		/// </summary>
		public string f_yhbhid
		{
			get{return _f_yhbhid;}
			set{ _f_yhbhid=value;}
		}
                
		/// <summary>
		/// 用户名
		/// </summary>
		public string f_yhm
		{
			get{return _f_yhm;}
			set{ _f_yhm=value;}
		}
                
		/// <summary>
		/// 缴费名
		/// </summary>
		public string f_jfm
		{
			get{return _f_jfm;}
			set{ _f_jfm=value;}
		}
                
		/// <summary>
		/// 电话
		/// </summary>
		public string f_dh
		{
			get{return _f_dh;}
			set{ _f_dh=value;}
		}
                
		/// <summary>
		/// 地址
		/// </summary>
		public string f_dz
		{
			get{return _f_dz;}
			set{ _f_dz=value;}
		}
                
		/// <summary>
		/// 地域
		/// </summary>
		public string f_dy
		{
			get{return _f_dy;}
			set{ _f_dy=value;}
		}
                
		/// <summary>
		/// 地域id
		/// </summary>
		public string f_dyid
		{
			get{return _f_dyid;}
			set{ _f_dyid=value;}
		}
                
		/// <summary>
		/// 水厂
		/// </summary>
		public string f_sc
		{
			get{return _f_sc;}
			set{ _f_sc=value;}
		}
                
		/// <summary>
		/// 水厂id
		/// </summary>
		public string f_scid
		{
			get{return _f_scid;}
			set{ _f_scid=value;}
		}
                
		/// <summary>
		/// 区域
		/// </summary>
		public string f_qy
		{
			get{return _f_qy;}
			set{ _f_qy=value;}
		}
                
		/// <summary>
		/// 区域id
		/// </summary>
		public string f_qyid
		{
			get{return _f_qyid;}
			set{ _f_qyid=value;}
		}
                
		/// <summary>
		/// 片区
		/// </summary>
		public string f_pq
		{
			get{return _f_pq;}
			set{ _f_pq=value;}
		}
                
		/// <summary>
		/// 片区id
		/// </summary>
		public string f_pqid
		{
			get{return _f_pqid;}
			set{ _f_pqid=value;}
		}
                
		/// <summary>
		/// 评估编号
		/// </summary>
		public string f_pgbh
		{
			get{return _f_pgbh;}
			set{ _f_pgbh=value;}
		}
                
		/// <summary>
		/// 评估编号id
		/// </summary>
		public string f_pgbhid
		{
			get{return _f_pgbhid;}
			set{ _f_pgbhid=value;}
		}
                
		/// <summary>
		/// 评估人
		/// </summary>
		public string f_pgr
		{
			get{return _f_pgr;}
			set{ _f_pgr=value;}
		}
                
		/// <summary>
		/// 评估人id
		/// </summary>
		public string f_pgrid
		{
			get{return _f_pgrid;}
			set{ _f_pgrid=value;}
		}
                
		/// <summary>
		/// 评估批次名称
		/// </summary>
		public string f_pgpcmc
		{
			get{return _f_pgpcmc;}
			set{ _f_pgpcmc=value;}
		}
                
		/// <summary>
		/// 评估时间
		/// </summary>
		public DateTime f_pgsj
		{
			get{return _f_pgsj;}
			set{ _f_pgsj=value;}
		}
                
		/// <summary>
		/// 缴费编号
		/// </summary>
		public string f_jfbh
		{
			get{return _f_jfbh;}
			set{ _f_jfbh=value;}
		}
                
		/// <summary>
		/// 缴费编号id
		/// </summary>
		public string f_jfbhid
		{
			get{return _f_jfbhid;}
			set{ _f_jfbhid=value;}
		}
                
		/// <summary>
		/// 缴费时间
		/// </summary>
		public DateTime f_jfsj
		{
			get{return _f_jfsj;}
			set{ _f_jfsj=value;}
		}
                
		/// <summary>
		/// 本期金额
		/// </summary>
		public string f_bqje
		{
			get{return _f_bqje;}
			set{ _f_bqje=value;}
		}
                
		public string f_kj
        {
            get { return _f_kj; }
            set { _f_kj = value; }
        }
		public string f_kjid
        {
            get { return _f_kjid; }
            set { _f_kjid = value; }
        }
		public string f_ztkhh
        {
            get { return _f_ztkhh; }
            set { _f_ztkhh = value; }
        }
		public string f_ztsbh
        {
            get { return _f_ztsbh; }
            set { _f_ztsbh = value; }
        }
		public string f_ztyhh
        {
            get { return _f_ztyhh; }
            set { _f_ztyhh = value; }
        }
		public string f_rs
        {
            get { return _f_rs; }
            set { _f_rs = value; }
        }
		public string f_khfz
		{
			get{return _f_khfz;}
			set{ _f_khfz=value;}
		}
		public string f_khfzid
		{
			get{return _f_khfzid;}
			set{ _f_khfzid=value;}
		}
		public string f_sf
		{
			get{return _f_sf;}
			set{ _f_sf=value;}
		}
		public string f_pwf
		{
			get{return _f_pwf;}
			set{ _f_pwf=value;}
		}
		
		public string f_sjljsyl
		{
			get{return _f_sjljsyl;}
			set{ _f_sjljsyl=value;}
		}
		public string f_jmje
		{
			get{return _f_jmje;}
			set{ _f_jmje=value;}
		}
		public string f_jmbh
		{
			get{return _f_jmbh;}
			set{ _f_jmbh=value;}
		}
		public string f_jmbhid
		{
			get{return _f_jmbhid;}
			set{ _f_jmbhid=value;}
		}
		public string f_sfsfts
		{
			get{return _f_sfsfts;}
			set{ _f_sfsfts=value;}
		}
        public string f_sfjl
        {
            get { return _f_sfjl; }
            set { _f_sfjl = value; }
        }

        public string f_dyjtsl
        {
            get { return _f_dyjtsl; }
            set { _f_dyjtsl = value; }
        }


        public string f_dyjtsf
        {
            get { return _f_dyjtsf; }
            set { _f_dyjtsf = value; }
        }

        public string f_dejtsl
        {
            get { return _f_dejtsl; }
            set { _f_dejtsl = value; }
        }


        public string f_dejtsf
        {
            get { return _f_dejtsf; }
            set { _f_dejtsf = value; }
        }

        public string f_dsjtsl
        {
            get { return _f_dsjtsl; }
            set { _f_dsjtsl = value; }
        }


        public string f_dsjtsf
        {
            get { return _f_dsjtsf; }
            set { _f_dsjtsf = value; }
        }
        #endregion Model
    }
}



