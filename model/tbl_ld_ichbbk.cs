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
    /// 实体类tbl_ld_ichbbk 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_ichbbk
    {
    	public tbl_ld_ichbbk()
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
                
		private string _f_hbbh;
                
		private string _f_sjbh;
                
		private string _f_khbh;
                
		private string _f_yhm;
                
		private string _f_jfm;
                
		private string _f_lxth;
                
		private string _f_dh;
                
		private string _f_dz;
                
		private string _f_xunkr;
                
		private string _f_xiekrid;
                
		private string _f_yslxid;
                
		private string _f_dy;
                
		private string _f_qy;
                
		private string _f_xunkrid;
                
		private string _f_xiekrq;
                
		private string _f_yhbh;
                
		private string _f_dyid;
                
		private string _f_qyid;
                
		private string _f_xunkrq;
                
		private string _f_khbhid;
                
		private string _f_yhbhid;
                
		private string _f_sc;
                
		private string _f_pq;
                
		private string _f_xiekr;
                
		private string _f_yslx;
                
		private DateTime _f_khrq;
                
		private string _f_scid;
                
		private string _f_pqid;
                
		private string _f_o_sbbh;

        private string _f_o_sbbhid;

        private string _f_o_sbfzid;
                
		private string _f_o_khbh;
                
		private string _f_o_sblx;
                
		private string _f_o_cszm;
                
		private string _f_o_ljgl;
                
		private string _f_o_jsbh;
                
		private string _f_o_sbpp;
                
		private string _f_o_rs;
                
		private string _f_o_sblxid;
                
		private string _f_o_bqzm;
                
		private string _f_o_qsqpjsl;
                
		private string _f_o_lxth;
                
		private string _f_o_mph;
                
		private string _f_o_sbkj;
                
		private string _f_o_jllx;
                
		private string _f_o_sqzm;
                
		private string _f_o_qlqpjsl;
                
		private string _f_o_sbfz;
                
		private string _f_o_sbdz;
                
		private string _f_o_sbkjid;
                
		private string _f_o_jllxid;
                
		private string _f_o_sqsl;
                
		private string _f_o_bqsl;
                
		private string _f_n_sbbh;
                
		private string _f_n_sbfz;
                
		private string _f_n_sbfzid;
                
		private string _f_n_sbpp;
                
		private string _f_n_mph;
                
		private string _f_n_rs;
                
		private string _f_n_sbkj;
                
		private string _f_n_sbkjid;
                
		private string _f_n_jsbh;
                
		private string _f_n_lxth;
                
		private string _f_n_khbh;
                
		private string _f_n_sblx;
                
		private string _f_n_sblxid;
                
		private string _f_n_jllx;
                
		private string _f_n_jllxid;
                
		private string _f_n_ljgl;
                
		private string _f_n_cqzm;
                
		private string _f_n_sqzm;
                
		private string _f_n_bqzm;
                
		private string _f_n_bqsl;
                
		private string _f_n_qsqpjsl;
                
		private string _f_n_qlqpjsl;
                
		private string _f_n_sqsl;
                
		private string _f_n_sbdz;
                
		private string _f_zt;
                
		private string _f_ztid;
                
		private string _f_bz;
                
                
		private string _f_o_sbds;
                
		private string _f_gslb;
                
		private string _f_gslbid;
                
		private string _f_khfz;
                
		private string _f_khfzid;
                
		private string _f_cbbh;
                
		private string _f_cbbhid;
                
		private string _f_xklx;
                
		private string _f_xkkh;
                
		private string _f_xkgscs;
                
		private string _f_xkbcgsl;
                
		private string _f_xkms;
                
		private string _f_xkmsid;
                
		private string _f_xkljgl;
                
		private string _f_xkjzlx;
                
		private string _f_port;
                
		private string _f_dkkh;
                
		private string _f_dkbcgsl;
                
		private string _f_dkgscs;
                
		private string _f_dkljgl;
                
		private string _f_dkjzlx;
                
		private string _f_dksbzt;

        private string _f_bssl;
        private string _f_hbyy;
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
		/// 换表编号
		/// </summary>
		public string f_hbbh
		{
			get{return _f_hbbh;}
			set{ _f_hbbh=value;}
		}
                
		/// <summary>
		/// 收据编号
		/// </summary>
		public string f_sjbh
		{
			get{return _f_sjbh;}
			set{ _f_sjbh=value;}
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
		/// 老系统号
		/// </summary>
		public string f_lxth
		{
			get{return _f_lxth;}
			set{ _f_lxth=value;}
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
		/// 寻卡人
		/// </summary>
		public string f_xunkr
		{
			get{return _f_xunkr;}
			set{ _f_xunkr=value;}
		}
                
		/// <summary>
		/// 写卡人id
		/// </summary>
		public string f_xiekrid
		{
			get{return _f_xiekrid;}
			set{ _f_xiekrid=value;}
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
		/// 地域
		/// </summary>
		public string f_dy
		{
			get{return _f_dy;}
			set{ _f_dy=value;}
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
		/// 寻卡人id
		/// </summary>
		public string f_xunkrid
		{
			get{return _f_xunkrid;}
			set{ _f_xunkrid=value;}
		}
                
		/// <summary>
		/// 写卡日期
		/// </summary>
		public string f_xiekrq
		{
			get{return _f_xiekrq;}
			set{ _f_xiekrq=value;}
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
		/// 地域id
		/// </summary>
		public string f_dyid
		{
			get{return _f_dyid;}
			set{ _f_dyid=value;}
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
		/// 寻卡日期
		/// </summary>
		public string f_xunkrq
		{
			get{return _f_xunkrq;}
			set{ _f_xunkrq=value;}
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
		/// 用户编号id
		/// </summary>
		public string f_yhbhid
		{
			get{return _f_yhbhid;}
			set{ _f_yhbhid=value;}
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
		/// 写卡人
		/// </summary>
		public string f_xiekr
		{
			get{return _f_xiekr;}
			set{ _f_xiekr=value;}
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
		/// 开户日期
		/// </summary>
		public DateTime f_khrq
		{
			get{return _f_khrq;}
			set{ _f_khrq=value;}
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
		/// 老水表编号
		/// </summary>
		public string f_o_sbbh
		{
			get{return _f_o_sbbh;}
			set{ _f_o_sbbh=value;}
		}

        /// <summary>
        /// 老水表编号id
        /// </summary>
        public string f_o_sbbhid
        {
            get { return _f_o_sbbhid; }
            set { _f_o_sbbhid = value; }
        }

        /// <summary>
        /// 老水表水表分组id
        /// </summary>
        public string f_o_sbfzid
		{
			get{return _f_o_sbfzid;}
			set{ _f_o_sbfzid=value;}
		}
                
		/// <summary>
		/// 老水表客户编号
		/// </summary>
		public string f_o_khbh
		{
			get{return _f_o_khbh;}
			set{ _f_o_khbh=value;}
		}
                
		/// <summary>
		/// 老水表类型
		/// </summary>
		public string f_o_sblx
		{
			get{return _f_o_sblx;}
			set{ _f_o_sblx=value;}
		}
                
		/// <summary>
		/// 老水表初始止码
		/// </summary>
		public string f_o_cszm
		{
			get{return _f_o_cszm;}
			set{ _f_o_cszm=value;}
		}
                
		/// <summary>
		/// 老水表累积购量
		/// </summary>
		public string f_o_ljgl
		{
			get{return _f_o_ljgl;}
			set{ _f_o_ljgl=value;}
		}
                
		/// <summary>
		/// 老水表旧水表号
		/// </summary>
		public string f_o_jsbh
		{
			get{return _f_o_jsbh;}
			set{ _f_o_jsbh=value;}
		}
                
		/// <summary>
		/// 老水表水表品牌
		/// </summary>
		public string f_o_sbpp
		{
			get{return _f_o_sbpp;}
			set{ _f_o_sbpp=value;}
		}
                
		/// <summary>
		/// 老水表人数
		/// </summary>
		public string f_o_rs
		{
			get{return _f_o_rs;}
			set{ _f_o_rs=value;}
		}
                
		/// <summary>
		/// 老水表类型id
		/// </summary>
		public string f_o_sblxid
		{
			get{return _f_o_sblxid;}
			set{ _f_o_sblxid=value;}
		}
                
		/// <summary>
		/// 老水表本期止码
		/// </summary>
		public string f_o_bqzm
		{
			get{return _f_o_bqzm;}
			set{ _f_o_bqzm=value;}
		}
                
		/// <summary>
		/// 老水表前三期平均水量
		/// </summary>
		public string f_o_qsqpjsl
		{
			get{return _f_o_qsqpjsl;}
			set{ _f_o_qsqpjsl=value;}
		}
                
		/// <summary>
		/// 老水表老系统号 
		/// </summary>
		public string f_o_lxth
		{
			get{return _f_o_lxth;}
			set{ _f_o_lxth=value;}
		}
                
		/// <summary>
		/// 老水表铭牌号
		/// </summary>
		public string f_o_mph
		{
			get{return _f_o_mph;}
			set{ _f_o_mph=value;}
		}
                
		/// <summary>
		/// 老水表口径
		/// </summary>
		public string f_o_sbkj
		{
			get{return _f_o_sbkj;}
			set{ _f_o_sbkj=value;}
		}
                
		/// <summary>
		/// 老水表计量类型
		/// </summary>
		public string f_o_jllx
		{
			get{return _f_o_jllx;}
			set{ _f_o_jllx=value;}
		}
                
		/// <summary>
		/// 老水表上期止码
		/// </summary>
		public string f_o_sqzm
		{
			get{return _f_o_sqzm;}
			set{ _f_o_sqzm=value;}
		}
                
		/// <summary>
		/// 老水表前六期平均水量
		/// </summary>
		public string f_o_qlqpjsl
		{
			get{return _f_o_qlqpjsl;}
			set{ _f_o_qlqpjsl=value;}
		}
                
		/// <summary>
		/// 老水表水表分组
		/// </summary>
		public string f_o_sbfz
		{
			get{return _f_o_sbfz;}
			set{ _f_o_sbfz=value;}
		}
                
		/// <summary>
		/// 老水表水表地址
		/// </summary>
		public string f_o_sbdz
		{
			get{return _f_o_sbdz;}
			set{ _f_o_sbdz=value;}
		}
                
		/// <summary>
		/// 老水表口径id
		/// </summary>
		public string f_o_sbkjid
		{
			get{return _f_o_sbkjid;}
			set{ _f_o_sbkjid=value;}
		}
                
		/// <summary>
		/// 老水表计量类型id
		/// </summary>
		public string f_o_jllxid
		{
			get{return _f_o_jllxid;}
			set{ _f_o_jllxid=value;}
		}
                
		/// <summary>
		/// 老水表上期水量
		/// </summary>
		public string f_o_sqsl
		{
			get{return _f_o_sqsl;}
			set{ _f_o_sqsl=value;}
		}
                
		/// <summary>
		/// 老水表本期水量
		/// </summary>
		public string f_o_bqsl
		{
			get{return _f_o_bqsl;}
			set{ _f_o_bqsl=value;}
		}
                
		/// <summary>
		/// 新水表编号
		/// </summary>
		public string f_n_sbbh
		{
			get{return _f_n_sbbh;}
			set{ _f_n_sbbh=value;}
		}
                
		/// <summary>
		/// 新水表水表分组
		/// </summary>
		public string f_n_sbfz
		{
			get{return _f_n_sbfz;}
			set{ _f_n_sbfz=value;}
		}
                
		/// <summary>
		/// 新水表水表分组id
		/// </summary>
		public string f_n_sbfzid
		{
			get{return _f_n_sbfzid;}
			set{ _f_n_sbfzid=value;}
		}
                
		/// <summary>
		/// 新水表水表品牌
		/// </summary>
		public string f_n_sbpp
		{
			get{return _f_n_sbpp;}
			set{ _f_n_sbpp=value;}
		}
                
		/// <summary>
		/// 新水表铭牌号
		/// </summary>
		public string f_n_mph
		{
			get{return _f_n_mph;}
			set{ _f_n_mph=value;}
		}
                
		/// <summary>
		/// 新水表人数
		/// </summary>
		public string f_n_rs
		{
			get{return _f_n_rs;}
			set{ _f_n_rs=value;}
		}
                
		/// <summary>
		/// 新水表口径
		/// </summary>
		public string f_n_sbkj
		{
			get{return _f_n_sbkj;}
			set{ _f_n_sbkj=value;}
		}
                
		/// <summary>
		/// 新水表口径id
		/// </summary>
		public string f_n_sbkjid
		{
			get{return _f_n_sbkjid;}
			set{ _f_n_sbkjid=value;}
		}
                
		/// <summary>
		/// 新水表旧水表号
		/// </summary>
		public string f_n_jsbh
		{
			get{return _f_n_jsbh;}
			set{ _f_n_jsbh=value;}
		}
                
		/// <summary>
		/// 新水表老系统号
		/// </summary>
		public string f_n_lxth
		{
			get{return _f_n_lxth;}
			set{ _f_n_lxth=value;}
		}
                
		/// <summary>
		/// 新系统客户编号
		/// </summary>
		public string f_n_khbh
		{
			get{return _f_n_khbh;}
			set{ _f_n_khbh=value;}
		}
                
		/// <summary>
		/// 新水表类型
		/// </summary>
		public string f_n_sblx
		{
			get{return _f_n_sblx;}
			set{ _f_n_sblx=value;}
		}
                
		/// <summary>
		/// 新水表类型id
		/// </summary>
		public string f_n_sblxid
		{
			get{return _f_n_sblxid;}
			set{ _f_n_sblxid=value;}
		}
                
		/// <summary>
		/// 新水表计量类型
		/// </summary>
		public string f_n_jllx
		{
			get{return _f_n_jllx;}
			set{ _f_n_jllx=value;}
		}
                
		/// <summary>
		/// 新水表计量类型id
		/// </summary>
		public string f_n_jllxid
		{
			get{return _f_n_jllxid;}
			set{ _f_n_jllxid=value;}
		}
                
		/// <summary>
		/// 新水表累积购量
		/// </summary>
		public string f_n_ljgl
		{
			get{return _f_n_ljgl;}
			set{ _f_n_ljgl=value;}
		}
                
		/// <summary>
		/// 新水表初期止码
		/// </summary>
		public string f_n_cqzm
		{
			get{return _f_n_cqzm;}
			set{ _f_n_cqzm=value;}
		}
                
		/// <summary>
		/// 新水表上期止码
		/// </summary>
		public string f_n_sqzm
		{
			get{return _f_n_sqzm;}
			set{ _f_n_sqzm=value;}
		}
                
		/// <summary>
		/// 新水表本期止码
		/// </summary>
		public string f_n_bqzm
		{
			get{return _f_n_bqzm;}
			set{ _f_n_bqzm=value;}
		}
                
		/// <summary>
		/// 新水表本期水量
		/// </summary>
		public string f_n_bqsl
		{
			get{return _f_n_bqsl;}
			set{ _f_n_bqsl=value;}
		}
                
		/// <summary>
		/// 新水表前三期平均水量
		/// </summary>
		public string f_n_qsqpjsl
		{
			get{return _f_n_qsqpjsl;}
			set{ _f_n_qsqpjsl=value;}
		}
                
		/// <summary>
		/// 新水表前六期平均水量
		/// </summary>
		public string f_n_qlqpjsl
		{
			get{return _f_n_qlqpjsl;}
			set{ _f_n_qlqpjsl=value;}
		}
                
		/// <summary>
		/// 新水表上期水量
		/// </summary>
		public string f_n_sqsl
		{
			get{return _f_n_sqsl;}
			set{ _f_n_sqsl=value;}
		}
                
		/// <summary>
		/// 新水表地址
		/// </summary>
		public string f_n_sbdz
		{
			get{return _f_n_sbdz;}
			set{ _f_n_sbdz=value;}
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
		/// 【冗余-客户】老水表底数
		/// </summary>
		public string f_o_sbds
		{
			get{return _f_o_sbds;}
			set{ _f_o_sbds=value;}
		}
                
		/// <summary>
		/// 购水类别
		/// </summary>
		public string f_gslb
		{
			get{return _f_gslb;}
			set{ _f_gslb=value;}
		}
                
		/// <summary>
		/// 购水类别id
		/// </summary>
		public string f_gslbid
		{
			get{return _f_gslbid;}
			set{ _f_gslbid=value;}
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
		/// 写卡类型【0普通卡
		/// </summary>
		public string f_xklx
		{
			get{return _f_xklx;}
			set{ _f_xklx=value;}
		}
                
		/// <summary>
		/// 写卡卡号
		/// </summary>
		public string f_xkkh
		{
			get{return _f_xkkh;}
			set{ _f_xkkh=value;}
		}
                
		/// <summary>
		/// 写卡购水次数
		/// </summary>
		public string f_xkgscs
		{
			get{return _f_xkgscs;}
			set{ _f_xkgscs=value;}
		}
                
		/// <summary>
		/// 写卡本次购水量
		/// </summary>
		public string f_xkbcgsl
		{
			get{return _f_xkbcgsl;}
			set{ _f_xkbcgsl=value;}
		}
                
		/// <summary>
		/// 写卡模式
		/// </summary>
		public string f_xkms
		{
			get{return _f_xkms;}
			set{ _f_xkms=value;}
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
		/// 写卡累积购量
		/// </summary>
		public string f_xkljgl
		{
			get{return _f_xkljgl;}
			set{ _f_xkljgl=value;}
		}
                
		/// <summary>
		/// 写卡介质类型
		/// </summary>
		public string f_xkjzlx
		{
			get{return _f_xkjzlx;}
			set{ _f_xkjzlx=value;}
		}
                
		/// <summary>
		/// 串口号【读写共用】
		/// </summary>
		public string f_port
		{
			get{return _f_port;}
			set{ _f_port=value;}
		}
                
		/// <summary>
		/// 读卡卡号
		/// </summary>
		public string f_dkkh
		{
			get{return _f_dkkh;}
			set{ _f_dkkh=value;}
		}
                
		/// <summary>
		/// 读卡本次购水量
		/// </summary>
		public string f_dkbcgsl
		{
			get{return _f_dkbcgsl;}
			set{ _f_dkbcgsl=value;}
		}
                
		/// <summary>
		/// 读卡购水次数
		/// </summary>
		public string f_dkgscs
		{
			get{return _f_dkgscs;}
			set{ _f_dkgscs=value;}
		}
                
		/// <summary>
		/// 读卡累积购量
		/// </summary>
		public string f_dkljgl
		{
			get{return _f_dkljgl;}
			set{ _f_dkljgl=value;}
		}
                
		/// <summary>
		/// 读卡介质类型
		/// </summary>
		public string f_dkjzlx
		{
			get{return _f_dkjzlx;}
			set{ _f_dkjzlx=value;}
		}
                
		/// <summary>
		/// 读卡刷表状态
		/// </summary>
		public string f_dksbzt
		{
			get{return _f_dksbzt;}
			set{ _f_dksbzt=value;}
		}

        /// <summary>
        /// 补水水量
        /// </summary>
        public string f_bssl
        {
            get { return _f_bssl; }
            set { _f_bssl = value; }
        }
        public string f_hbyy
        {
            get { return _f_hbyy; }
            set { _f_hbyy = value; }
        }
        #endregion Model
    }
}



