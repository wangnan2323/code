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
    /// 实体类tbl_ld_ickss 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_ickss
    {
    	public tbl_ld_ickss()
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
                
		private string _f_khbhid;
                
		private string _f_yhbh;
                
		private string _f_yhbhid;
		private string _f_dz;
        
		private string _f_dh;        
		private string _f_sc;
                
		private string _f_pq;
                
		private string _f_sblx;
private string _f_dyid;
                
		private string _f_yslx;
                
		
                
		
                
		
                
		private string _f_scid;
                
		private string _f_pqid;
                
		private string _f_sblxid;
                
		private string _f_yslxid;
                
		private DateTime _f_khrq;
                
		private string _f_dy;
                
		private string _f_yhm;
                
		private string _f_qy;
                
		private string _f_sbbh;               
                
		private string _f_lxtkhh;
		
		private string _f_kj;
                
		private string _f_jfm;
                
		
                
		private string _f_qyid;
                
		private string _f_sbbhid;
                
		private string _f_rs;
                
		private string _f_sf;
                
		private string _f_sl;
                
		private string _f_jfdh;
                
		private string _f_jfje;
                
		private string _f_zt;
                
		private string _f_ztid;
                
		private string _f_bz;
                
        private string _f_xkr;
        private string _f_xkrid;
        private DateTime _f_xkrq;
        private string _f_xiekr;
        private string _f_xiekrid;
        private DateTime _f_xiekrq;

        //新增
        private string _f_port;

        private string _f_xkms;

        private string _f_xkjzlx;

        private string _f_xkljgl;

        private string _f_xkgscs;

        private string _f_xkbcgsl;

        private string _f_xklx;

        private string _f_xkkh;

        private string _f_ssbh;

        private string _f_sjbh;

        private string _f_dkbcgsl;

        private string _f_dkgscs;

        private string _f_dkljgl;

        private string _f_dkjzlx;

        private string _f_dksbzt;

        private string _f_kjid;

        private string _f_dkkh;

        private string _f_ly;
        private string _f_lyid;
		private string _f_khfz;
                
		private string _f_khfzid;
                
		private string _f_cbbh;
                
		private string _f_cbbhid;
                
		private string _f_dj;
                
		private string _f_pwf;
                
		private string _f_ysje;
                
		private string _f_jmhysje;
                
		private string _f_khytjjzsf;
                
		private string _f_khytjjzpwf;
                
		private string _f_sfsytjjz;
                
		private string _f_sytjjzsf;
                
		private string _f_sytjjzpwf;
                
		private string _f_syhtjjzsf;
                
		private string _f_syhtjjzpwf;
                
		private string _f_khyye;
                
		private string _f_sfsyye;
                
		private string _f_syye;
                
		private string _f_yhye;
                
		private string _f_shys;
                
		private string _f_shss;
                
		private string _f_shzl;
                
		private string _f_shssdx;
                
		private string _f_jffs;
                
		private string _f_jffsid;
                
		private string _f_xkmsid;
                
		private string _f_yyt;

        private string _f_yytid;

        private string _f_kplb;
                
		private string _f_kplbid;
        private string _f_sfjl;
        private string _f_tgly;
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
		/// 客户编号id
		/// </summary>
		public string f_khbhid
		{
			get{return _f_khbhid;}
			set{ _f_khbhid=value;}
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
		/// 地址
		/// </summary>
		public string f_dz
		{
			get{return _f_dz;}
			set{ _f_dz=value;}
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
		/// 片区
		/// </summary>
		public string f_pq
		{
			get{return _f_pq;}
			set{ _f_pq=value;}
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
		/// 用水类别
		/// </summary>
		public string f_yslx
		{
			get{return _f_yslx;}
			set{ _f_yslx=value;}
		}
                
		/// <summary>
		/// 口径
		/// </summary>
		public string f_kj
		{
			get{return _f_kj;}
			set{ _f_kj=value;}
		}

        /// <summary>
        /// 口径id
        /// </summary>
        public string f_kjid
        {
            get { return _f_kjid; }
            set { _f_kjid = value; }
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
		/// 电话
		/// </summary>
		public string f_dh
		{
			get{return _f_dh;}
			set{ _f_dh=value;}
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
		/// 片区id
		/// </summary>
		public string f_pqid
		{
			get{return _f_pqid;}
			set{ _f_pqid=value;}
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
		/// 用水类别id
		/// </summary>
		public string f_yslxid
		{
			get{return _f_yslxid;}
			set{ _f_yslxid=value;}
		}
                
		/// <summary>
		/// 开户时间
		/// </summary>
		public DateTime f_khrq
		{
			get{return _f_khrq;}
			set{ _f_khrq=value;}
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
		/// 用户名
		/// </summary>
		public string f_yhm
		{
			get{return _f_yhm;}
			set{ _f_yhm=value;}
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
		/// 水表编号
		/// </summary>
		public string f_sbbh
		{
			get{return _f_sbbh;}
			set{ _f_sbbh=value;}
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
		/// 缴费名
		/// </summary>
		public string f_jfm
		{
			get{return _f_jfm;}
			set{ _f_jfm=value;}
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
		/// 区域ID
		/// </summary>
		public string f_qyid
		{
			get{return _f_qyid;}
			set{ _f_qyid=value;}
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
		/// 人数
		/// </summary>
		public string f_rs
		{
			get{return _f_rs;}
			set{ _f_rs=value;}
		}
                
		/// <summary>
		/// 水费
		/// </summary>
		public string f_sf
		{
			get{return _f_sf;}
			set{ _f_sf=value;}
		}
                
		/// <summary>
		/// 水量
		/// </summary>
		public string f_sl
		{
			get{return _f_sl;}
			set{ _f_sl=value;}
		}
                
		/// <summary>
		/// 缴费单号
		/// </summary>
		public string f_jfdh
		{
			get{return _f_jfdh;}
			set{ _f_jfdh=value;}
		}
                
		/// <summary>
		/// 缴费金额
		/// </summary>
		public string f_jfje
		{
			get{return _f_jfje;}
			set{ _f_jfje=value;}
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
                
        public string f_xkr
        {
            get { return _f_xkr; }
            set { _f_xkr = value; }
        }
        public string f_xkrid
        {
            get { return _f_xkrid; }
            set { _f_xkrid = value; }
        }
        public DateTime f_xkrq
        {
            get { return _f_xkrq; }
            set { _f_xkrq = value; }
        }
        public string f_xiekr
        {
            get { return _f_xiekr; }
            set { _f_xiekr = value; }
        }
        public string f_xiekrid
        {
            get { return _f_xiekrid; }
            set { _f_xiekrid = value; }
        }
        public DateTime f_xiekrq
        {
            get { return _f_xiekrq; }
            set { _f_xiekrq = value; }
        }

        //新增

        public string f_port
        {
            get { return _f_port; }
            set { _f_port = value; }
        }
        public string f_xkms
        {
            get { return _f_xkms; }
            set { _f_xkms = value; }
        }
        public string f_xkjzlx
        {
            get { return _f_xkjzlx; }
            set { _f_xkjzlx = value; }
        }
        public string f_xkljgl
        {
            get { return _f_xkljgl; }
            set { _f_xkljgl = value; }
        }
        public string f_xkgscs
        {
            get { return _f_xkgscs; }
            set { _f_xkgscs = value; }
        }

        public string f_xkbcgsl
        {
            get { return _f_xkbcgsl; }
            set { _f_xkbcgsl = value; }
        }
        public string f_xklx
        {
            get { return _f_xklx; }
            set { _f_xklx = value; }
        }
        public string f_xkkh
        {
            get { return _f_xkkh; }
            set { _f_xkkh = value; }
        }
        public string f_ssbh
        {
            get { return _f_ssbh; }
            set { _f_ssbh = value; }
        }
        public string f_sjbh
        {
            get { return _f_sjbh; }
            set { _f_sjbh = value; }
        }

        public string f_dkbcgsl
        {
            get { return _f_dkbcgsl; }
            set { _f_dkbcgsl = value; }
        }
        public string f_dkgscs
        {
            get { return _f_dkgscs; }
            set { _f_dkgscs = value; }
        }
        public string f_dkljgl
        {
            get { return _f_dkljgl; }
            set { _f_dkljgl = value; }
        }
        public string f_dkjzlx
        {
            get { return _f_dkjzlx; }
            set { _f_dkjzlx = value; }
        }
        public string f_dksbzt
        {
            get { return _f_dksbzt; }
            set { _f_dksbzt = value; }
        }

        public string f_ly
        {
            get { return _f_ly; }
            set { _f_ly = value; }
        }
        public string f_lyid
        {
            get { return _f_lyid; }
            set { _f_lyid = value; }
        }

        public string f_dkkh
        {
            get { return _f_dkkh; }
            set { _f_dkkh = value; }
        }
		
				/// <summary>
		/// 【冗余-客户】客户分组
		/// </summary>
		public string f_khfz
		{
			get{return _f_khfz;}
			set{ _f_khfz=value;}
		}
                
		/// <summary>
		/// 【冗余-客户】客户分组id
		/// </summary>
		public string f_khfzid
		{
			get{return _f_khfzid;}
			set{ _f_khfzid=value;}
		}
                
		/// <summary>
		/// 【冗余-客户】抄本编号
		/// </summary>
		public string f_cbbh
		{
			get{return _f_cbbh;}
			set{ _f_cbbh=value;}
		}
                
		/// <summary>
		/// 【冗余-客户】抄本编号id
		/// </summary>
		public string f_cbbhid
		{
			get{return _f_cbbhid;}
			set{ _f_cbbhid=value;}
		}
                
		/// <summary>
		/// 单价
		/// </summary>
		public string f_dj
		{
			get{return _f_dj;}
			set{ _f_dj=value;}
		}
                
		/// <summary>
		/// 污水处理费
		/// </summary>
		public string f_pwf
		{
			get{return _f_pwf;}
			set{ _f_pwf=value;}
		}
                
		/// <summary>
		/// 应收金额
		/// </summary>
		public string f_ysje
		{
			get{return _f_ysje;}
			set{ _f_ysje=value;}
		}
                
		/// <summary>
		/// 减免后应收金额
		/// </summary>
		public string f_jmhysje
		{
			get{return _f_jmhysje;}
			set{ _f_jmhysje=value;}
		}
                
		/// <summary>
		/// 客户原调价结转水费
		/// </summary>
		public string f_khytjjzsf
		{
			get{return _f_khytjjzsf;}
			set{ _f_khytjjzsf=value;}
		}
                
		/// <summary>
		/// 客户原调价结转污水处理费
		/// </summary>
		public string f_khytjjzpwf
		{
			get{return _f_khytjjzpwf;}
			set{ _f_khytjjzpwf=value;}
		}
                
		/// <summary>
		/// 是否使用调价结转
		/// </summary>
		public string f_sfsytjjz
		{
			get{return _f_sfsytjjz;}
			set{ _f_sfsytjjz=value;}
		}
                
		/// <summary>
		/// 使用调价结转水费
		/// </summary>
		public string f_sytjjzsf
		{
			get{return _f_sytjjzsf;}
			set{ _f_sytjjzsf=value;}
		}
                
		/// <summary>
		/// 使用调价结转污水处理费
		/// </summary>
		public string f_sytjjzpwf
		{
			get{return _f_sytjjzpwf;}
			set{ _f_sytjjzpwf=value;}
		}
                
		/// <summary>
		/// 使用后调价结转水费
		/// </summary>
		public string f_syhtjjzsf
		{
			get{return _f_syhtjjzsf;}
			set{ _f_syhtjjzsf=value;}
		}
                
		/// <summary>
		/// 使用后调价结转污水处理费
		/// </summary>
		public string f_syhtjjzpwf
		{
			get{return _f_syhtjjzpwf;}
			set{ _f_syhtjjzpwf=value;}
		}
                
		/// <summary>
		/// 客户原余额
		/// </summary>
		public string f_khyye
		{
			get{return _f_khyye;}
			set{ _f_khyye=value;}
		}
                
		/// <summary>
		/// 是否使用余额
		/// </summary>
		public string f_sfsyye
		{
			get{return _f_sfsyye;}
			set{ _f_sfsyye=value;}
		}
                
		/// <summary>
		/// 使用余额
		/// </summary>
		public string f_syye
		{
			get{return _f_syye;}
			set{ _f_syye=value;}
		}
                
		/// <summary>
		/// 用后余额
		/// </summary>
		public string f_yhye
		{
			get{return _f_yhye;}
			set{ _f_yhye=value;}
		}
                
		/// <summary>
		/// 算后应收
		/// </summary>
		public string f_shys
		{
			get{return _f_shys;}
			set{ _f_shys=value;}
		}
                
		/// <summary>
		/// 算后实收
		/// </summary>
		public string f_shss
		{
			get{return _f_shss;}
			set{ _f_shss=value;}
		}
                
		/// <summary>
		/// 算后找零
		/// </summary>
		public string f_shzl
		{
			get{return _f_shzl;}
			set{ _f_shzl=value;}
		}
                
		/// <summary>
		/// 算后实收大写
		/// </summary>
		public string f_shssdx
		{
			get{return _f_shssdx;}
			set{ _f_shssdx=value;}
		}
                
		/// <summary>
		/// 缴费方式
		/// </summary>
		public string f_jffs
		{
			get{return _f_jffs;}
			set{ _f_jffs=value;}
		}
                
		/// <summary>
		/// 缴费方式id
		/// </summary>
		public string f_jffsid
		{
			get{return _f_jffsid;}
			set{ _f_jffsid=value;}
		}
                
		/// <summary>
		/// 写卡模式id
		/// </summary>
		public string f_xkmsid
		{
			get{return _f_xkmsid;}
			set{ _f_xkmsid=value;}
		}
                
		/// <summary>
		/// 营业厅
		/// </summary>
		public string f_yyt
		{
			get{return _f_yyt;}
			set{ _f_yyt=value;}
		}

        /// <summary>
        /// 营业厅id
        /// </summary>
        public string f_yytid
        {
            get { return _f_yytid; }
            set { _f_yytid = value; }
        }

        /// <summary>
        /// 开票类别
        /// </summary>
        public string f_kplb
		{
			get{return _f_kplb;}
			set{ _f_kplb=value;}
		}
                
		/// <summary>
		/// 开票类别id
		/// </summary>
		public string f_kplbid
		{
			get{return _f_kplbid;}
			set{ _f_kplbid=value;}
		}
        public string f_sfjl
        {
            get { return _f_sfjl; }
            set { _f_sfjl = value; }
        }

        public string f_tgly
        {
            get { return _f_tgly; }
            set { _f_tgly = value; }
        }
        #endregion Model
    }
}



