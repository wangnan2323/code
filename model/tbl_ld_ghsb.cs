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
    /// 实体类tbl_ld_ghsb 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_ghsb
    {
    	public tbl_ld_ghsb()
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
                
		private string _f_ghsbbh;
                
		private string _f_ghsbmc;
                
		private string _f_sqr;
                
		private string _f_sqrid;
                
		private DateTime _f_sqsj;
                
		private string _f_czr;
                
		private string _f_czrid;
                
		private DateTime _f_czsj;
                
		private string _f_khbh;
                
		private string _f_khbhid;
                
		private string _f_khxx;
                
		private string _f_oldsbbh;
                
		private string _f_oldsbh;
                
		private string _f_oldlxth;
                
		private string _f_oldsbfz;
                
		private string _f_oldsbfzid;
                
		private string _f_oldsbpp;
                
		private string _f_oldmph;
                
		private string _f_oldsblx;
                
		private string _f_oldsblxid;
                
		private string _f_oldjllx;
                
		private string _f_oldjllxid;
                
		private string _f_oldrs;
                
		private string _f_oldsbkj;
                
		private string _f_oldsbkjid;
                
		private string _f_oldsbdz;
                
		private DateTime _f_oldazrq;
                
		private string _f_oldqfzt;
                
		private string _f_oldsynx;
                
		private string _f_oldcszm;
                
		private string _f_oldqsqpjsl;
                
		private string _f_oldqlqpjsl;
                
		private string _f_oldbqzm;
                
		private string _f_oldsqzm;
                
		private string _f_oldsqsl;
                
		private string _f_olddysl;
                
		private string _f_oldljgl;
                
		private string _f_oldnysl;
                
		private string _f_oldzt;
                
		private string _f_oldztid;
                
		private string _f_ysbbz;
                
		private string _f_newsbbh;
                
		private string _f_newxsbjsbh;
                
		private string _f_oldxsblxth;
                
		private string _f_newsbfz;
                
		private string _f_newsbfzid;
                
		private string _f_newsbpp;
                
		private string _f_newmph;
                
		private string _f_newsblx;
                
		private string _f_newsblxid;
                
		private string _f_newjllx;
                
		private string _f_newjllxid;
                
		private string _f_newrs;
                
		private string _f_newsbkj;
                
		private string _f_newsbkjid;
                
		private string _f_newsbdz;
                
		private string _f_newsynx;
                
		private DateTime _f_newazrq;
                
		private string _f_newqfzt;
                
		private string _f_newcszm;
                
		private string _f_newqsqpjsl;
                
		private string _f_newqlqpjsl;
                
		private string _f_newbqzm;
                
		private string _f_newsqzm;
                
		private string _f_newsqsl;
                
		private string _f_newdysl;
                
		private string _f_newljgl;
                
		private string _f_newnysl;
                
		private string _f_newzt;
                
		private string _f_newztid;
                
		private string _f_xsbfj;
                
		private string _f_xsbbz;
                
		private string _f_khjson;
                
		private string _f_khjsonid;
                
		private string _fk_tbl_maintable_sys_id;
                
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
		/// 更换水表编号
		/// </summary>
		public string f_ghsbbh
		{
			get{return _f_ghsbbh;}
			set{ _f_ghsbbh=value;}
		}
                
		/// <summary>
		/// 更换水表名称
		/// </summary>
		public string f_ghsbmc
		{
			get{return _f_ghsbmc;}
			set{ _f_ghsbmc=value;}
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
		/// 操作时间
		/// </summary>
		public DateTime f_czsj
		{
			get{return _f_czsj;}
			set{ _f_czsj=value;}
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
		/// 客户信息
		/// </summary>
		public string f_khxx
		{
			get{return _f_khxx;}
			set{ _f_khxx=value;}
		}
                
		/// <summary>
		/// 水表编号
		/// </summary>
		public string f_oldsbbh
		{
			get{return _f_oldsbbh;}
			set{ _f_oldsbbh=value;}
		}
                
		/// <summary>
		/// 旧水表号
		/// </summary>
		public string f_oldsbh
		{
			get{return _f_oldsbh;}
			set{ _f_oldsbh=value;}
		}
                
		/// <summary>
		/// 老系统号
		/// </summary>
		public string f_oldlxth
		{
			get{return _f_oldlxth;}
			set{ _f_oldlxth=value;}
		}
                
		/// <summary>
		/// 水表分组
		/// </summary>
		public string f_oldsbfz
		{
			get{return _f_oldsbfz;}
			set{ _f_oldsbfz=value;}
		}
                
		/// <summary>
		/// 水表分组id
		/// </summary>
		public string f_oldsbfzid
		{
			get{return _f_oldsbfzid;}
			set{ _f_oldsbfzid=value;}
		}
                
		/// <summary>
		/// 水表品牌
		/// </summary>
		public string f_oldsbpp
		{
			get{return _f_oldsbpp;}
			set{ _f_oldsbpp=value;}
		}
                
		/// <summary>
		/// 铭牌号
		/// </summary>
		public string f_oldmph
		{
			get{return _f_oldmph;}
			set{ _f_oldmph=value;}
		}
                
		/// <summary>
		/// 水表类型
		/// </summary>
		public string f_oldsblx
		{
			get{return _f_oldsblx;}
			set{ _f_oldsblx=value;}
		}
                
		/// <summary>
		/// 水表类型id
		/// </summary>
		public string f_oldsblxid
		{
			get{return _f_oldsblxid;}
			set{ _f_oldsblxid=value;}
		}
                
		/// <summary>
		/// 计量类型
		/// </summary>
		public string f_oldjllx
		{
			get{return _f_oldjllx;}
			set{ _f_oldjllx=value;}
		}
                
		/// <summary>
		/// 计量类型id
		/// </summary>
		public string f_oldjllxid
		{
			get{return _f_oldjllxid;}
			set{ _f_oldjllxid=value;}
		}
                
		/// <summary>
		/// 人数
		/// </summary>
		public string f_oldrs
		{
			get{return _f_oldrs;}
			set{ _f_oldrs=value;}
		}
                
		/// <summary>
		/// 水表口径
		/// </summary>
		public string f_oldsbkj
		{
			get{return _f_oldsbkj;}
			set{ _f_oldsbkj=value;}
		}
                
		/// <summary>
		/// 水表口径id
		/// </summary>
		public string f_oldsbkjid
		{
			get{return _f_oldsbkjid;}
			set{ _f_oldsbkjid=value;}
		}
                
		/// <summary>
		/// 水表地址
		/// </summary>
		public string f_oldsbdz
		{
			get{return _f_oldsbdz;}
			set{ _f_oldsbdz=value;}
		}
                
		/// <summary>
		/// 安装日期
		/// </summary>
		public DateTime f_oldazrq
		{
			get{return _f_oldazrq;}
			set{ _f_oldazrq=value;}
		}
                
		/// <summary>
		/// 铅封状态
		/// </summary>
		public string f_oldqfzt
		{
			get{return _f_oldqfzt;}
			set{ _f_oldqfzt=value;}
		}
                
		/// <summary>
		/// 使用年限
		/// </summary>
		public string f_oldsynx
		{
			get{return _f_oldsynx;}
			set{ _f_oldsynx=value;}
		}
                
		/// <summary>
		/// 初始止码
		/// </summary>
		public string f_oldcszm
		{
			get{return _f_oldcszm;}
			set{ _f_oldcszm=value;}
		}
                
		/// <summary>
		/// 前三期平均水量
		/// </summary>
		public string f_oldqsqpjsl
		{
			get{return _f_oldqsqpjsl;}
			set{ _f_oldqsqpjsl=value;}
		}
                
		/// <summary>
		/// 前六期平均水量
		/// </summary>
		public string f_oldqlqpjsl
		{
			get{return _f_oldqlqpjsl;}
			set{ _f_oldqlqpjsl=value;}
		}
                
		/// <summary>
		/// 本期止码
		/// </summary>
		public string f_oldbqzm
		{
			get{return _f_oldbqzm;}
			set{ _f_oldbqzm=value;}
		}
                
		/// <summary>
		/// 上期止码
		/// </summary>
		public string f_oldsqzm
		{
			get{return _f_oldsqzm;}
			set{ _f_oldsqzm=value;}
		}
                
		/// <summary>
		/// 上期水量
		/// </summary>
		public string f_oldsqsl
		{
			get{return _f_oldsqsl;}
			set{ _f_oldsqsl=value;}
		}
                
		/// <summary>
		/// 当月水量
		/// </summary>
		public string f_olddysl
		{
			get{return _f_olddysl;}
			set{ _f_olddysl=value;}
		}
                
		/// <summary>
		/// 累计购量
		/// </summary>
		public string f_oldljgl
		{
			get{return _f_oldljgl;}
			set{ _f_oldljgl=value;}
		}
                
		/// <summary>
		/// 年用水量
		/// </summary>
		public string f_oldnysl
		{
			get{return _f_oldnysl;}
			set{ _f_oldnysl=value;}
		}
                
		/// <summary>
		/// 状态
		/// </summary>
		public string f_oldzt
		{
			get{return _f_oldzt;}
			set{ _f_oldzt=value;}
		}
                
		/// <summary>
		/// 状态id
		/// </summary>
		public string f_oldztid
		{
			get{return _f_oldztid;}
			set{ _f_oldztid=value;}
		}
                
		/// <summary>
		/// 原水表备注
		/// </summary>
		public string f_ysbbz
		{
			get{return _f_ysbbz;}
			set{ _f_ysbbz=value;}
		}
                
		/// <summary>
		/// 新水表编号
		/// </summary>
		public string f_newsbbh
		{
			get{return _f_newsbbh;}
			set{ _f_newsbbh=value;}
		}
                
		/// <summary>
		/// 新水表旧水表号
		/// </summary>
		public string f_newxsbjsbh
		{
			get{return _f_newxsbjsbh;}
			set{ _f_newxsbjsbh=value;}
		}
                
		/// <summary>
		/// 新水表老系统号
		/// </summary>
		public string f_oldxsblxth
		{
			get{return _f_oldxsblxth;}
			set{ _f_oldxsblxth=value;}
		}
                
		/// <summary>
		/// 新水表水表分组
		/// </summary>
		public string f_newsbfz
		{
			get{return _f_newsbfz;}
			set{ _f_newsbfz=value;}
		}
                
		/// <summary>
		/// 新水表水表分组id
		/// </summary>
		public string f_newsbfzid
		{
			get{return _f_newsbfzid;}
			set{ _f_newsbfzid=value;}
		}
                
		/// <summary>
		/// 新水表水表品牌
		/// </summary>
		public string f_newsbpp
		{
			get{return _f_newsbpp;}
			set{ _f_newsbpp=value;}
		}
                
		/// <summary>
		/// 新水表铭牌号
		/// </summary>
		public string f_newmph
		{
			get{return _f_newmph;}
			set{ _f_newmph=value;}
		}
                
		/// <summary>
		/// 新水表类型
		/// </summary>
		public string f_newsblx
		{
			get{return _f_newsblx;}
			set{ _f_newsblx=value;}
		}
                
		/// <summary>
		/// 新水表类型id
		/// </summary>
		public string f_newsblxid
		{
			get{return _f_newsblxid;}
			set{ _f_newsblxid=value;}
		}
                
		/// <summary>
		/// 新水表计量类型
		/// </summary>
		public string f_newjllx
		{
			get{return _f_newjllx;}
			set{ _f_newjllx=value;}
		}
                
		/// <summary>
		/// 新水表计量类型id
		/// </summary>
		public string f_newjllxid
		{
			get{return _f_newjllxid;}
			set{ _f_newjllxid=value;}
		}
                
		/// <summary>
		/// 新水表人数
		/// </summary>
		public string f_newrs
		{
			get{return _f_newrs;}
			set{ _f_newrs=value;}
		}
                
		/// <summary>
		/// 新水表口径
		/// </summary>
		public string f_newsbkj
		{
			get{return _f_newsbkj;}
			set{ _f_newsbkj=value;}
		}
                
		/// <summary>
		/// 新水表口径id
		/// </summary>
		public string f_newsbkjid
		{
			get{return _f_newsbkjid;}
			set{ _f_newsbkjid=value;}
		}
                
		/// <summary>
		/// 新水表地址
		/// </summary>
		public string f_newsbdz
		{
			get{return _f_newsbdz;}
			set{ _f_newsbdz=value;}
		}
                
		/// <summary>
		/// 新水表使用年限
		/// </summary>
		public string f_newsynx
		{
			get{return _f_newsynx;}
			set{ _f_newsynx=value;}
		}
                
		/// <summary>
		/// 新水表安装日期
		/// </summary>
		public DateTime f_newazrq
		{
			get{return _f_newazrq;}
			set{ _f_newazrq=value;}
		}
                
		/// <summary>
		/// 新水表铅封状态
		/// </summary>
		public string f_newqfzt
		{
			get{return _f_newqfzt;}
			set{ _f_newqfzt=value;}
		}
                
		/// <summary>
		/// 新水表初始止码
		/// </summary>
		public string f_newcszm
		{
			get{return _f_newcszm;}
			set{ _f_newcszm=value;}
		}
                
		/// <summary>
		/// 新水表前三期平均水量
		/// </summary>
		public string f_newqsqpjsl
		{
			get{return _f_newqsqpjsl;}
			set{ _f_newqsqpjsl=value;}
		}
                
		/// <summary>
		/// 新水表前六期平均水量
		/// </summary>
		public string f_newqlqpjsl
		{
			get{return _f_newqlqpjsl;}
			set{ _f_newqlqpjsl=value;}
		}
                
		/// <summary>
		/// 新水表本期止码
		/// </summary>
		public string f_newbqzm
		{
			get{return _f_newbqzm;}
			set{ _f_newbqzm=value;}
		}
                
		/// <summary>
		/// 新水表上期止码
		/// </summary>
		public string f_newsqzm
		{
			get{return _f_newsqzm;}
			set{ _f_newsqzm=value;}
		}
                
		/// <summary>
		/// 新水表上期水量
		/// </summary>
		public string f_newsqsl
		{
			get{return _f_newsqsl;}
			set{ _f_newsqsl=value;}
		}
                
		/// <summary>
		/// 新水表当月水量
		/// </summary>
		public string f_newdysl
		{
			get{return _f_newdysl;}
			set{ _f_newdysl=value;}
		}
                
		/// <summary>
		/// 新水表累计购量
		/// </summary>
		public string f_newljgl
		{
			get{return _f_newljgl;}
			set{ _f_newljgl=value;}
		}
                
		/// <summary>
		/// 新水表年用水量
		/// </summary>
		public string f_newnysl
		{
			get{return _f_newnysl;}
			set{ _f_newnysl=value;}
		}
                
		/// <summary>
		/// 状态
		/// </summary>
		public string f_newzt
		{
			get{return _f_newzt;}
			set{ _f_newzt=value;}
		}
                
		/// <summary>
		/// 状态id
		/// </summary>
		public string f_newztid
		{
			get{return _f_newztid;}
			set{ _f_newztid=value;}
		}
                
		/// <summary>
		/// 新水表附件
		/// </summary>
		public string f_xsbfj
		{
			get{return _f_xsbfj;}
			set{ _f_xsbfj=value;}
		}
                
		/// <summary>
		/// 新水表备注
		/// </summary>
		public string f_xsbbz
		{
			get{return _f_xsbbz;}
			set{ _f_xsbbz=value;}
		}
                
		/// <summary>
		/// 客户json
		/// </summary>
		public string f_khjson
		{
			get{return _f_khjson;}
			set{ _f_khjson=value;}
		}
                
		/// <summary>
		/// 客户jsonid
		/// </summary>
		public string f_khjsonid
		{
			get{return _f_khjsonid;}
			set{ _f_khjsonid=value;}
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



