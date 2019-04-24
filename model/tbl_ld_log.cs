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
    /// 实体类tbl_ld_log 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_log
    {
    	public tbl_ld_log()
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
                
		private string _f_businesstablename;
                
		private string _f_businesstableprikeyvalue;
                
		private string _f_editusername;
                
		private string _f_edituserloginname;
                
		private string _f_edituserid;
                
		private string _f_edituserip;
                
		private string _f_editusermac;
                
		private DateTime _f_editdatetime;
                
		private string _f_edittype;
                
		private string _f_editsource;
                
		private string _f_editcontent;
                
		private string _f_editcontentid;
                
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
		/// 业务表名称
		/// </summary>
		public string f_businesstablename
		{
			get{return _f_businesstablename;}
			set{ _f_businesstablename=value;}
		}
                
		/// <summary>
		/// 业务表主键值
		/// </summary>
		public string f_businesstableprikeyvalue
		{
			get{return _f_businesstableprikeyvalue;}
			set{ _f_businesstableprikeyvalue=value;}
		}
                
		/// <summary>
		/// 修改人姓名
		/// </summary>
		public string f_editusername
		{
			get{return _f_editusername;}
			set{ _f_editusername=value;}
		}
                
		/// <summary>
		/// 修改人登录名
		/// </summary>
		public string f_edituserloginname
		{
			get{return _f_edituserloginname;}
			set{ _f_edituserloginname=value;}
		}
                
		/// <summary>
		/// 修改人ID
		/// </summary>
		public string f_edituserid
		{
			get{return _f_edituserid;}
			set{ _f_edituserid=value;}
		}
                
		/// <summary>
		/// 修改人IP地址
		/// </summary>
		public string f_edituserip
		{
			get{return _f_edituserip;}
			set{ _f_edituserip=value;}
		}
                
		/// <summary>
		/// 修改人MAC地址
		/// </summary>
		public string f_editusermac
		{
			get{return _f_editusermac;}
			set{ _f_editusermac=value;}
		}
                
		/// <summary>
		/// 修改时间
		/// </summary>
		public DateTime f_editdatetime
		{
			get{return _f_editdatetime;}
			set{ _f_editdatetime=value;}
		}
                
		/// <summary>
		/// 修改类型
		/// </summary>
		public string f_edittype
		{
			get{return _f_edittype;}
			set{ _f_edittype=value;}
		}
                
		/// <summary>
		/// 修改来源
		/// </summary>
		public string f_editsource
		{
			get{return _f_editsource;}
			set{ _f_editsource=value;}
		}
                
		/// <summary>
		/// 修改内容
		/// </summary>
		public string f_editcontent
		{
			get{return _f_editcontent;}
			set{ _f_editcontent=value;}
		}
                
		/// <summary>
		/// 修改内容id
		/// </summary>
		public string f_editcontentid
		{
			get{return _f_editcontentid;}
			set{ _f_editcontentid=value;}
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



