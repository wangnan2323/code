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
    /// 实体类tbl_ld_khb 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_khb
    {
    	public tbl_ld_khb()
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
                
		private string _f_khbh;
                
		private string _f_ztkhh;
                
		private string _f_khfz;
                
		private string _f_khfzid;
                
		private string _f_ycje;
                
		private string _f_yslx;
                
		private string _f_yslxid;
                
		private string _f_tbbh;
                
		private string _f_sfjlbjf;
                
		private string _f_zt;
                
		private string _f_ztid;
                
		private string _f_bz;
                
		private string _f_cbbh;
                
		private string _f_cbbhid;
                
		private string _f_cbxh;
                
		private string _f_cbyxm;
                
		private string _f_cbyid;
                
		private string _f_cbzq;
                
		private string _f_cbmc;
                
		private string _f_yhbh;
                
		private string _f_yhbhid;
                
		private string _f_jfm;
                
		private string _f_yhfz;
                
		private string _f_yhfzid;
                
		private string _f_dz;
                
		private string _f_dh;
                
		private string _f_dy;
                
		private string _f_dyid;
                
		private string _f_sc;
                
		private string _f_scid;
                
		private string _f_qy;
                
		private string _f_qyid;
                
		private string _f_pq;
                
		private string _f_pqid;
                
		private string _f_tsyxzh;
                
		private string _f_hth;
                
		private string _f_sfzh;
                
		private DateTime _f_khrq;
                
		private string _f_sbbh;
                
		private string _f_sbbhid;
                
		private string _f_bqzm;
                
		private string _f_sqzm;
                
		private string _f_bqsl;
                
		private string _f_sqsl;
                
		private string _f_qsqpjsl;
                
		private string _f_qlqpjsl;
                
		private string _f_ljgl;
                
		private string _f_lxth;
                
		private string _f_sblx;
                
		private string _f_sblxid;
                
		private string _f_jllx;
                
		private string _f_jllxid;
                
		private string _f_tssbbh;



        // 新增字段

        private string _f_ztsbh;

        private string _f_rs;

        private string _f_sbkj;

        private string _f_sbkjid;

        private string _f_sbfz;

        private string _f_sbfzid;

        private string _f_ztyhh;

        private string _f_wxwybz;

        private string _f_zfbwybz;

        private string _f_gdyhwybz;

        private string _f_yhm;

        private DateTime _f_zhcbrq;

		private string _f_ljqf;
	
		private string _f_tjjzpwf;
		private string _f_tjjzsf;
		private string _f_tssbbhid;
		private string _f_nljgl;
        private string _f_sqysl;
        private string _f_jhysl;
        private string _f_ickljgl;
        private string _f_sbdz;
        private string _f_ye;
        private string _f_sfdxcs;
        private string _f_dxcsyy;
        private string _f_yqjmsf;
        private string _f_yqjmpwf;
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
		/// 客户编号
		/// </summary>
		public string f_khbh
		{
			get{return _f_khbh;}
			set{ _f_khbh=value;}
		}
                
		/// <summary>
		/// 旧客户号
		/// </summary>
		public string f_ztkhh
		{
			get{return _f_ztkhh;}
			set{ _f_ztkhh=value;}
		}
                
		/// <summary>
		/// 客户分组
		/// </summary>
		public string f_khfz
		{
			get{return _f_khfz;}
			set{ _f_khfz=value;}
		}
                
		/// <summary>
		/// 客户分组id
		/// </summary>
		public string f_khfzid
		{
			get{return _f_khfzid;}
			set{ _f_khfzid=value;}
		}
                
		/// <summary>
		/// 绿化表押金
		/// </summary>
		public string f_ycje
		{
			get{return _f_ycje;}
			set{ _f_ycje=value;}
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
		/// 套表编号
		/// </summary>
		public string f_tbbh
		{
			get{return _f_tbbh;}
			set{ _f_tbbh=value;}
		}
                
		/// <summary>
		/// 是否计量不计费
		/// </summary>
		public string f_sfjlbjf
		{
			get{return _f_sfjlbjf;}
			set{ _f_sfjlbjf=value;}
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
		/// 备注
		/// </summary>
		public string f_bz
		{
			get{return _f_bz;}
			set{ _f_bz=value;}
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
		/// 抄本序号
		/// </summary>
		public string f_cbxh
		{
			get{return _f_cbxh;}
			set{ _f_cbxh=value;}
		}
                
		/// <summary>
		/// 抄表员姓名
		/// </summary>
		public string f_cbyxm
		{
			get{return _f_cbyxm;}
			set{ _f_cbyxm=value;}
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
		/// 抄表周期
		/// </summary>
		public string f_cbzq
		{
			get{return _f_cbzq;}
			set{ _f_cbzq=value;}
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
		/// 缴费名
		/// </summary>
		public string f_jfm
		{
			get{return _f_jfm;}
			set{ _f_jfm=value;}
		}
                
		/// <summary>
		/// 用户分组
		/// </summary>
		public string f_yhfz
		{
			get{return _f_yhfz;}
			set{ _f_yhfz=value;}
		}
                
		/// <summary>
		/// 用户分组id
		/// </summary>
		public string f_yhfzid
		{
			get{return _f_yhfzid;}
			set{ _f_yhfzid=value;}
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
		/// 电话
		/// </summary>
		public string f_dh
		{
			get{return _f_dh;}
			set{ _f_dh=value;}
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
		/// 托收银行账号
		/// </summary>
		public string f_tsyxzh
		{
			get{return _f_tsyxzh;}
			set{ _f_tsyxzh=value;}
		}
                
		/// <summary>
		/// 合同号
		/// </summary>
		public string f_hth
		{
			get{return _f_hth;}
			set{ _f_hth=value;}
		}
                
		/// <summary>
		/// 身份证号
		/// </summary>
		public string f_sfzh
		{
			get{return _f_sfzh;}
			set{ _f_sfzh=value;}
		}
                
		/// <summary>
		/// 开户日期
		/// </summary>
		public DateTime f_khrq
		{
			get{return _f_khrq;}
			set{ _f_khrq=value;}
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
		/// 本期止码
		/// </summary>
		public string f_bqzm
		{
			get{return _f_bqzm;}
			set{ _f_bqzm=value;}
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
		/// 累积购量
		/// </summary>
		public string f_ljgl
		{
			get{return _f_ljgl;}
			set{ _f_ljgl=value;}
		}
                
		/// <summary>
		/// 老系统号
		/// </summary>
		public string f_lxth
		{
			get{return _f_lxth;}
			set{ _f_lxth=value;}
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
		/// 计量类型
		/// </summary>
		public string f_jllx
		{
			get{return _f_jllx;}
			set{ _f_jllx=value;}
		}
                
		/// <summary>
		/// 计量类型id
		/// </summary>
		public string f_jllxid
		{
			get{return _f_jllxid;}
			set{ _f_jllxid=value;}
		}
                
		/// <summary>
		/// 停水水表编号
		/// </summary>
		public string f_tssbbh
		{
			get{return _f_tssbbh;}
			set{ _f_tssbbh=value;}
		}


        /// 新增
        public string f_ztsbh
        {
            get { return _f_ztsbh; }
            set { _f_ztsbh = value; }
        }


        public string f_rs
        {
            get { return _f_rs; }
            set { _f_rs = value; }
        }

        public string f_sbkj
        {
            get { return _f_sbkj; }
            set { _f_sbkj = value; }
        }

        public string f_sbkjid
        {
            get { return _f_sbkjid; }
            set { _f_sbkjid = value; }
        }

        public string f_sbfz
        {
            get { return _f_sbfz; }
            set { _f_sbfz = value; }
        }

        public string f_sbfzid
        {
            get { return _f_sbfzid; }
            set { _f_sbfzid = value; }
        }

        public string f_ztyhh
        {
            get { return _f_ztyhh; }
            set { _f_ztyhh = value; }
        }

        public string f_wxwybz
        {
            get { return _f_wxwybz; }
            set { _f_wxwybz = value; }
        }

        public string f_zfbwybz
        {
            get { return _f_zfbwybz; }
            set { _f_zfbwybz = value; }
        }

        public string f_gdyhwybz
        {
            get { return _f_gdyhwybz; }
            set { _f_gdyhwybz = value; }
        }

        public string f_yhm
        {
            get { return _f_yhm; }
            set { _f_yhm = value; }
        }
        public DateTime f_zhcbrq
        {
            get { return _f_zhcbrq; }
            set { _f_zhcbrq = value; }
        }
		public string f_ljqf
		{
			get{return _f_ljqf;}
			set{ _f_ljqf=value;}
		}
	
	
		public string f_tjjzpwf
		{
			get{return _f_tjjzpwf;}
			set{ _f_tjjzpwf=value;}
		}
		public string f_tjjzsf
		{
			get{return _f_tjjzsf;}
			set{ _f_tjjzsf=value;}
		}
		public string f_tssbbhid
		{
			get{return _f_tssbbhid;}
			set{ _f_tssbbhid=value;}
		}
		public string f_nljgl
		{
			get{return _f_nljgl;}
			set{ _f_nljgl=value;}
		}
        /// <summary>
		/// 申请用水量
		/// </summary>
		public string f_sqysl
        {
            get { return _f_sqysl; }
            set { _f_sqysl = value; }
        }

        /// <summary>
		/// 计划用水量
		/// </summary>
		public string f_jhysl
        {
            get { return _f_jhysl; }
            set { _f_jhysl = value; }
        }

        /// <summary>
		/// IC卡累计购量
		/// </summary>
		public string f_ickljgl
        {
            get { return _f_ickljgl; }
            set { _f_ickljgl = value; }
        }

        /// <summary>
        /// 水表地址
        /// </summary>
        public string f_sbdz
        {
            get { return _f_sbdz; }
            set { _f_sbdz = value; }
        }
        public string f_ye
        {
            get { return _f_ye; }
            set { _f_ye = value; }
        }

        /// <summary>
        /// 是否短信催收
        /// </summary>
        public string f_sfdxcs
        {
            get { return _f_sfdxcs; }
            set { _f_sfdxcs = value; }
        }

        /// <summary>
        /// 短信催收原因
        /// </summary>
        public string f_dxcsyy
        {
            get { return _f_dxcsyy; }
            set { _f_dxcsyy = value; }
        }

        public string f_yqjmsf
        {
            get { return _f_yqjmsf; }
            set { _f_yqjmsf = value; }
        }

        public string f_yqjmpwf
        {
            get { return _f_yqjmpwf; }
            set { _f_yqjmpwf = value; }
        }
        #endregion Model
    }
}



