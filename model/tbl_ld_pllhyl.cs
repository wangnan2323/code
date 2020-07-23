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
    /// 实体类tbl_ld_pllhyl 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_pllhyl
    {
    	public tbl_ld_pllhyl()
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
                
		private string _fk_tbl_ld_pllhlb_sys_id;
                
		private string _f_yzqk;
                
		private string _f_khbh;
                
		private string _f_ycje;
                
		private string _f_tbbh;
                
		private string _f_khzt;
                
		private string _f_khztid;
                
		private string _f_ztkhh;
                
		private string _f_djjzsf;
                
		private string _f_sfjlbjf;
                
		private string _f_sqysl;
                
		private string _f_khfz;
                
		private string _f_khfzid;
                
		private string _f_djjzpwf;
                
		private string _f_ickljgl;
                
		private string _f_jhysl;
                
		private string _f_yslx;
                
		private string _f_yslxid;
                
		private string _f_ljqf;
                
		private DateTime _f_zhcbrq;
                
		private string _f_khbz;
                
		private string _f_cbbh;
                
		private string _f_cbbhid;
                
		private string _f_cbxh;
                
		private string _f_cbmc;
                
		private string _f_cbzq;
                
		private string _f_cbyxm;
                
		private string _f_cbyxmid;
                
		private string _f_yhbh;
                
		private string _f_dh;
                
		private string _f_jyhh;
                
		private string _f_yhfz;
                
		private string _f_yhfzid;
                
		private string _f_yhm;
                
		private string _f_dz;
                
		private string _f_jfm;
                
		private string _f_dy;
                
		private string _f_dyid;
                
		private DateTime _f_khrq;
                
		private string _f_htbh;
                
		private string _f_htfj;
                
		private string _f_sfzzs;
                
		private string _f_sc;
                
		private string _f_scid;
                
		private string _f_sfts;
                
		private DateTime _f_htqdrq;
                
		private string _f_qtfj;
                
		private string _f_yhzt;
                
		private string _f_yhztid;
                
		private string _f_qy;
                
		private string _f_qyid;
                
		private string _f_tsyx;
                
		private string _f_tsyxid;
                
		private string _f_sfzh;
                
		private string _f_sfzfj;
                
		private string _f_yhbz;
                
		private string _f_pq;
                
		private string _f_pqid;
                
		private string _f_tsyxzh;
                
		private string _f_sbbh;
                
		private string _f_sbpp;
                
		private string _f_ztsbh;
                
		private string _f_mph;
                
		private string _f_lxth;
                
		private string _f_sbdz;
                
		private string _f_sbfz;
                
		private string _f_sbfzid;
                
		private string _f_rs;
                
		private string _f_cszm;
                
		private string _f_ljgl;
                
		private string _f_nljgl;
                
		private string _f_sbzt;
                
		private string _f_sbztid;
                
		private string _f_sbkj;
                
		private string _f_sbkjid;
                
		private string _f_bqzm;
                
		private string _f_bqsl;
                
		private DateTime _f_azrq;
                
		private string _f_sbfj;
                
		private string _f_sblx;
                
		private string _f_sblxid;
                
		private string _f_sqzm;
                
		private string _f_qsqpjsl;
                
		private string _f_synx;
                
		private string _f_sbbz;
                
		private string _f_jllx;
                
		private string _f_jllxid;
                
		private string _f_sqsl;
                
		private string _f_qlqpjsl;
                
		private string _f_qfzt;
                
                
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
		/// 批量立户列表_主键
		/// </summary>
		public string fk_tbl_ld_pllhlb_sys_id
		{
			get{return _fk_tbl_ld_pllhlb_sys_id;}
			set{ _fk_tbl_ld_pllhlb_sys_id=value;}
		}
                
		/// <summary>
		/// 验证情况
		/// </summary>
		public string f_yzqk
		{
			get{return _f_yzqk;}
			set{ _f_yzqk=value;}
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
		/// 绿化表押金
		/// </summary>
		public string f_ycje
		{
			get{return _f_ycje;}
			set{ _f_ycje=value;}
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
		/// 客户状态
		/// </summary>
		public string f_khzt
		{
			get{return _f_khzt;}
			set{ _f_khzt=value;}
		}
                
		/// <summary>
		/// 客户状态id
		/// </summary>
		public string f_khztid
		{
			get{return _f_khztid;}
			set{ _f_khztid=value;}
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
		/// 调价结转水费
		/// </summary>
		public string f_djjzsf
		{
			get{return _f_djjzsf;}
			set{ _f_djjzsf=value;}
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
		/// 申请用水量
		/// </summary>
		public string f_sqysl
		{
			get{return _f_sqysl;}
			set{ _f_sqysl=value;}
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
		/// 调价结转污水处理费
		/// </summary>
		public string f_djjzpwf
		{
			get{return _f_djjzpwf;}
			set{ _f_djjzpwf=value;}
		}
                
		/// <summary>
		/// IC卡累积购量
		/// </summary>
		public string f_ickljgl
		{
			get{return _f_ickljgl;}
			set{ _f_ickljgl=value;}
		}
                
		/// <summary>
		/// 计划用水量
		/// </summary>
		public string f_jhysl
		{
			get{return _f_jhysl;}
			set{ _f_jhysl=value;}
		}
                
		/// <summary>
		/// 用水类型
		/// </summary>
		public string f_yslx
		{
			get{return _f_yslx;}
			set{ _f_yslx=value;}
		}
                
		/// <summary>
		/// 用水类型id
		/// </summary>
		public string f_yslxid
		{
			get{return _f_yslxid;}
			set{ _f_yslxid=value;}
		}
                
		/// <summary>
		/// 累积欠费
		/// </summary>
		public string f_ljqf
		{
			get{return _f_ljqf;}
			set{ _f_ljqf=value;}
		}
                
		/// <summary>
		/// 最后抄表日期
		/// </summary>
		public DateTime f_zhcbrq
		{
			get{return _f_zhcbrq;}
			set{ _f_zhcbrq=value;}
		}
                
		/// <summary>
		/// 客户备注
		/// </summary>
		public string f_khbz
		{
			get{return _f_khbz;}
			set{ _f_khbz=value;}
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
		/// 抄本名称
		/// </summary>
		public string f_cbmc
		{
			get{return _f_cbmc;}
			set{ _f_cbmc=value;}
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
		/// 抄表员姓名
		/// </summary>
		public string f_cbyxm
		{
			get{return _f_cbyxm;}
			set{ _f_cbyxm=value;}
		}
                
		/// <summary>
		/// 抄表员姓名id
		/// </summary>
		public string f_cbyxmid
		{
			get{return _f_cbyxmid;}
			set{ _f_cbyxmid=value;}
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
		/// 电话
		/// </summary>
		public string f_dh
		{
			get{return _f_dh;}
			set{ _f_dh=value;}
		}
                
		/// <summary>
		/// 旧用户号
		/// </summary>
		public string f_jyhh
		{
			get{return _f_jyhh;}
			set{ _f_jyhh=value;}
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
		/// 用户名
		/// </summary>
		public string f_yhm
		{
			get{return _f_yhm;}
			set{ _f_yhm=value;}
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
		/// 缴费名
		/// </summary>
		public string f_jfm
		{
			get{return _f_jfm;}
			set{ _f_jfm=value;}
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
		/// 开户日期
		/// </summary>
		public DateTime f_khrq
		{
			get{return _f_khrq;}
			set{ _f_khrq=value;}
		}
                
		/// <summary>
		/// 合同编号
		/// </summary>
		public string f_htbh
		{
			get{return _f_htbh;}
			set{ _f_htbh=value;}
		}
                
		/// <summary>
		/// 合同附件
		/// </summary>
		public string f_htfj
		{
			get{return _f_htfj;}
			set{ _f_htfj=value;}
		}
                
		/// <summary>
		/// 是否增值税
		/// </summary>
		public string f_sfzzs
		{
			get{return _f_sfzzs;}
			set{ _f_sfzzs=value;}
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
		/// 是否托收
		/// </summary>
		public string f_sfts
		{
			get{return _f_sfts;}
			set{ _f_sfts=value;}
		}
                
		/// <summary>
		/// 合同签订日期
		/// </summary>
		public DateTime f_htqdrq
		{
			get{return _f_htqdrq;}
			set{ _f_htqdrq=value;}
		}
                
		/// <summary>
		/// 其他附件
		/// </summary>
		public string f_qtfj
		{
			get{return _f_qtfj;}
			set{ _f_qtfj=value;}
		}
                
		/// <summary>
		/// 用户状态
		/// </summary>
		public string f_yhzt
		{
			get{return _f_yhzt;}
			set{ _f_yhzt=value;}
		}
                
		/// <summary>
		/// 用户状态id
		/// </summary>
		public string f_yhztid
		{
			get{return _f_yhztid;}
			set{ _f_yhztid=value;}
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
		/// 托收银行
		/// </summary>
		public string f_tsyx
		{
			get{return _f_tsyx;}
			set{ _f_tsyx=value;}
		}
                
		/// <summary>
		/// 托收银行id
		/// </summary>
		public string f_tsyxid
		{
			get{return _f_tsyxid;}
			set{ _f_tsyxid=value;}
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
		/// 身份证附件
		/// </summary>
		public string f_sfzfj
		{
			get{return _f_sfzfj;}
			set{ _f_sfzfj=value;}
		}
                
		/// <summary>
		/// 用户备注
		/// </summary>
		public string f_yhbz
		{
			get{return _f_yhbz;}
			set{ _f_yhbz=value;}
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
		/// 水表编号
		/// </summary>
		public string f_sbbh
		{
			get{return _f_sbbh;}
			set{ _f_sbbh=value;}
		}
                
		/// <summary>
		/// 水表品牌
		/// </summary>
		public string f_sbpp
		{
			get{return _f_sbpp;}
			set{ _f_sbpp=value;}
		}
                
		/// <summary>
		/// 旧水表号
		/// </summary>
		public string f_ztsbh
		{
			get{return _f_ztsbh;}
			set{ _f_ztsbh=value;}
		}
                
		/// <summary>
		/// 铭牌号
		/// </summary>
		public string f_mph
		{
			get{return _f_mph;}
			set{ _f_mph=value;}
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
		/// 水表地址
		/// </summary>
		public string f_sbdz
		{
			get{return _f_sbdz;}
			set{ _f_sbdz=value;}
		}
                
		/// <summary>
		/// 水表分组
		/// </summary>
		public string f_sbfz
		{
			get{return _f_sbfz;}
			set{ _f_sbfz=value;}
		}
                
		/// <summary>
		/// 水表分组id
		/// </summary>
		public string f_sbfzid
		{
			get{return _f_sbfzid;}
			set{ _f_sbfzid=value;}
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
		/// 初始止码
		/// </summary>
		public string f_cszm
		{
			get{return _f_cszm;}
			set{ _f_cszm=value;}
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
		/// 年累计购量
		/// </summary>
		public string f_nljgl
		{
			get{return _f_nljgl;}
			set{ _f_nljgl=value;}
		}
                
		/// <summary>
		/// 水表状态
		/// </summary>
		public string f_sbzt
		{
			get{return _f_sbzt;}
			set{ _f_sbzt=value;}
		}
                
		/// <summary>
		/// 水表状态id
		/// </summary>
		public string f_sbztid
		{
			get{return _f_sbztid;}
			set{ _f_sbztid=value;}
		}
                
		/// <summary>
		/// 水表口径
		/// </summary>
		public string f_sbkj
		{
			get{return _f_sbkj;}
			set{ _f_sbkj=value;}
		}
                
		/// <summary>
		/// 水表口径id
		/// </summary>
		public string f_sbkjid
		{
			get{return _f_sbkjid;}
			set{ _f_sbkjid=value;}
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
		/// 安装日期
		/// </summary>
		public DateTime f_azrq
		{
			get{return _f_azrq;}
			set{ _f_azrq=value;}
		}
                
		/// <summary>
		/// 水表附件
		/// </summary>
		public string f_sbfj
		{
			get{return _f_sbfj;}
			set{ _f_sbfj=value;}
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
		/// 上期止码
		/// </summary>
		public string f_sqzm
		{
			get{return _f_sqzm;}
			set{ _f_sqzm=value;}
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
		/// 使用年限
		/// </summary>
		public string f_synx
		{
			get{return _f_synx;}
			set{ _f_synx=value;}
		}
                
		/// <summary>
		/// 水表备注
		/// </summary>
		public string f_sbbz
		{
			get{return _f_sbbz;}
			set{ _f_sbbz=value;}
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
		/// 上期水量
		/// </summary>
		public string f_sqsl
		{
			get{return _f_sqsl;}
			set{ _f_sqsl=value;}
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
		/// 铅封状态
		/// </summary>
		public string f_qfzt
		{
			get{return _f_qfzt;}
			set{ _f_qfzt=value;}
		}
                
		#endregion Model
    }
}



