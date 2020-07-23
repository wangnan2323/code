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
    /// 实体类tbl_ld_dyhlh 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_dyhlh
    {
    	public tbl_ld_dyhlh()
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
                
		private string _fk_tbl_maintable_sys_id;
                
		private string _f_dyhlhbh;
                
		private string _f_mc;
                
		private string _f_sqr;
                
		private string _f_sqrid;
                
		private DateTime _f_sqsj;
                
		private string _f_czr;
                
		private string _f_czrid;
                
		private DateTime _f_czrsj;
                
		private string _f_khfz;
                
		private string _f_khfzid;
                
		private string _f_yslx;
                
		private string _f_yslxid;
                
		private string _f_ycje;
                
		private DateTime _f_zhcbrq;
                
		private string _f_tbbh;
                
		private string _f_sfjlbjf;
                
		private string _f_tjjzsf;
                
		private string _f_tjjzpwf;
                
		private string _f_jhysl;
                
		private string _f_sqysl;
                
		private string _f_khzt;
                
		private string _f_khztid;
                
		private string _f_khbz;
                
		private string _f_cbbh;
                
		private string _f_cbbhid;
                
		private string _f_cbxh;
                
		private string _f_yhm;
                
		private string _f_jfm;
                
		private DateTime _f_khrq;
                
		private string _f_yhfz;
                
		private string _f_yhfzid;
                
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
                
		private string _f_sfts;
                
		private string _f_tsyx;
                
		private string _f_tsyxid;
                
		private string _f_tsyxzh;
                
		private string _f_htbh;
                
		private DateTime _f_htqdrq;
                
		private string _f_sfzh;
                
		private string _f_htfj;
                
		private string _f_qtfj;
                
		private string _f_sfzfj;
                
		private string _f_sfzzs;
                
		private string _f_yhzt;
                
		private string _f_yhztid;
                
		private string _f_yhbz;
                
		private string _f_lxth;
                
		private string _f_sbfz;
                
		private string _f_sbfzid;
                
		private string _f_rs;
                
		private string _f_sbpp;
                
		private string _f_mph;
                
		private string _f_sbdz;
                
		private string _f_sbkj;
                
		private string _f_sbkjid;
                
		private string _f_sblx;
                
		private string _f_sblxid;
                
		private string _f_jllx;
                
		private string _f_jllxid;
                
		private string _f_cszm;
                
		private DateTime _f_azrq;
                
		private string _f_synx;
                
		private string _f_qfzt;
                
		private string _f_sbzt;
                
		private string _f_sbztid;
                
		private string _f_sbfj;
                
		private string _f_sbbz;
                
		private string _f_lcfj;
                
		private string _f_zt;
                
		private string _f_ztid;
                
		private string _f_bz;
                
                
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
		/// fk_tbl_maintable_sys_id
		/// </summary>
		public string fk_tbl_maintable_sys_id
		{
			get{return _fk_tbl_maintable_sys_id;}
			set{ _fk_tbl_maintable_sys_id=value;}
		}
                
		/// <summary>
		/// 大用户立户编号
		/// </summary>
		public string f_dyhlhbh
		{
			get{return _f_dyhlhbh;}
			set{ _f_dyhlhbh=value;}
		}
                
		/// <summary>
		/// 名称
		/// </summary>
		public string f_mc
		{
			get{return _f_mc;}
			set{ _f_mc=value;}
		}
                
		/// <summary>
		/// 申请人
		/// </summary>
		public string f_sqr
		{
			get{return _f_sqr;}
			set{ _f_sqr=value;}
		}
                
		/// <summary>
		/// 申请人id
		/// </summary>
		public string f_sqrid
		{
			get{return _f_sqrid;}
			set{ _f_sqrid=value;}
		}
                
		/// <summary>
		/// 申请时间
		/// </summary>
		public DateTime f_sqsj
		{
			get{return _f_sqsj;}
			set{ _f_sqsj=value;}
		}
                
		/// <summary>
		/// 操作人
		/// </summary>
		public string f_czr
		{
			get{return _f_czr;}
			set{ _f_czr=value;}
		}
                
		/// <summary>
		/// 操作人id
		/// </summary>
		public string f_czrid
		{
			get{return _f_czrid;}
			set{ _f_czrid=value;}
		}
                
		/// <summary>
		/// 操作人时间
		/// </summary>
		public DateTime f_czrsj
		{
			get{return _f_czrsj;}
			set{ _f_czrsj=value;}
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
		/// 绿化表押金
		/// </summary>
		public string f_ycje
		{
			get{return _f_ycje;}
			set{ _f_ycje=value;}
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
		/// 调价结转水费
		/// </summary>
		public string f_tjjzsf
		{
			get{return _f_tjjzsf;}
			set{ _f_tjjzsf=value;}
		}
                
		/// <summary>
		/// 调价结转污水处理费
		/// </summary>
		public string f_tjjzpwf
		{
			get{return _f_tjjzpwf;}
			set{ _f_tjjzpwf=value;}
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
		/// 申请用水量
		/// </summary>
		public string f_sqysl
		{
			get{return _f_sqysl;}
			set{ _f_sqysl=value;}
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
		/// 开户日期
		/// </summary>
		public DateTime f_khrq
		{
			get{return _f_khrq;}
			set{ _f_khrq=value;}
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
		/// 是否托收
		/// </summary>
		public string f_sfts
		{
			get{return _f_sfts;}
			set{ _f_sfts=value;}
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
		/// 托收银行账号
		/// </summary>
		public string f_tsyxzh
		{
			get{return _f_tsyxzh;}
			set{ _f_tsyxzh=value;}
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
		/// 合同签订日期
		/// </summary>
		public DateTime f_htqdrq
		{
			get{return _f_htqdrq;}
			set{ _f_htqdrq=value;}
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
		/// 合同附件
		/// </summary>
		public string f_htfj
		{
			get{return _f_htfj;}
			set{ _f_htfj=value;}
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
		/// 身份证附件
		/// </summary>
		public string f_sfzfj
		{
			get{return _f_sfzfj;}
			set{ _f_sfzfj=value;}
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
		/// 用户备注
		/// </summary>
		public string f_yhbz
		{
			get{return _f_yhbz;}
			set{ _f_yhbz=value;}
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
		/// 水表品牌
		/// </summary>
		public string f_sbpp
		{
			get{return _f_sbpp;}
			set{ _f_sbpp=value;}
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
		/// 水表地址
		/// </summary>
		public string f_sbdz
		{
			get{return _f_sbdz;}
			set{ _f_sbdz=value;}
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
		/// 初始止码
		/// </summary>
		public string f_cszm
		{
			get{return _f_cszm;}
			set{ _f_cszm=value;}
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
		/// 使用年限
		/// </summary>
		public string f_synx
		{
			get{return _f_synx;}
			set{ _f_synx=value;}
		}
                
		/// <summary>
		/// 铅封状态
		/// </summary>
		public string f_qfzt
		{
			get{return _f_qfzt;}
			set{ _f_qfzt=value;}
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
		/// 水表附件
		/// </summary>
		public string f_sbfj
		{
			get{return _f_sbfj;}
			set{ _f_sbfj=value;}
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
		/// 流程附件
		/// </summary>
		public string f_lcfj
		{
			get{return _f_lcfj;}
			set{ _f_lcfj=value;}
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
                
		#endregion Model
    }
}



