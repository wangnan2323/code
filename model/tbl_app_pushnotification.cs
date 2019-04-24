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
    /// 实体类tbl_app_pushnotification 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_app_pushnotification
    {
    	public tbl_app_pushnotification()
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
                
		private string _f_title;
                
		private string _f_content;
                
		private string _f_send_username;
                
		private string _f_send_userid;
                
		private DateTime _f_send_datetime;
                
		private string _f_recive_username;
                
		private string _f_recive_userid;
                
		private string _f_recive_deviceid;
                
		private string _f_recive_devicetype;
                
		private string _f_recive_devicetypeid;
                
		private string _f_recive_certificate;
                
		private string _f_businesstablename;
                
		private string _f_businesstablekeyname;
                
		private string _f_businesstablekeyvalue;
                
		private string _f_status;
                
		private string _f_statusid;
                
                
		/// <summary>
		/// id
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
		/// 创建人id
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
		/// 最后修改人id
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
		/// 删除人id
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
		/// 
		/// </summary>
		public string f_value1
		{
			get{return _f_value1;}
			set{ _f_value1=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value2
		{
			get{return _f_value2;}
			set{ _f_value2=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value3
		{
			get{return _f_value3;}
			set{ _f_value3=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value4
		{
			get{return _f_value4;}
			set{ _f_value4=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value5
		{
			get{return _f_value5;}
			set{ _f_value5=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value6
		{
			get{return _f_value6;}
			set{ _f_value6=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value7
		{
			get{return _f_value7;}
			set{ _f_value7=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value8
		{
			get{return _f_value8;}
			set{ _f_value8=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value9
		{
			get{return _f_value9;}
			set{ _f_value9=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string f_value10
		{
			get{return _f_value10;}
			set{ _f_value10=value;}
		}
                
		/// <summary>
		/// 标题
		/// </summary>
		public string f_title
		{
			get{return _f_title;}
			set{ _f_title=value;}
		}
                
		/// <summary>
		/// 内容
		/// </summary>
		public string f_content
		{
			get{return _f_content;}
			set{ _f_content=value;}
		}
                
		/// <summary>
		/// 发送人姓名
		/// </summary>
		public string f_send_username
		{
			get{return _f_send_username;}
			set{ _f_send_username=value;}
		}
                
		/// <summary>
		/// 发送人id
		/// </summary>
		public string f_send_userid
		{
			get{return _f_send_userid;}
			set{ _f_send_userid=value;}
		}
                
		/// <summary>
		/// 发送日期
		/// </summary>
		public DateTime f_send_datetime
		{
			get{return _f_send_datetime;}
			set{ _f_send_datetime=value;}
		}
                
		/// <summary>
		/// 接收人名称
		/// </summary>
		public string f_recive_username
		{
			get{return _f_recive_username;}
			set{ _f_recive_username=value;}
		}
                
		/// <summary>
		/// 接收人id
		/// </summary>
		public string f_recive_userid
		{
			get{return _f_recive_userid;}
			set{ _f_recive_userid=value;}
		}
                
		/// <summary>
		/// 接收人设备id
		/// </summary>
		public string f_recive_deviceid
		{
			get{return _f_recive_deviceid;}
			set{ _f_recive_deviceid=value;}
		}
                
		/// <summary>
		/// 接收人设备类型：ios；android
		/// </summary>
		public string f_recive_devicetype
		{
			get{return _f_recive_devicetype;}
			set{ _f_recive_devicetype=value;}
		}
                
		/// <summary>
		/// f_reciver_devicetype
		/// </summary>
		public string f_recive_devicetypeid
		{
			get{return _f_recive_devicetypeid;}
			set{ _f_recive_devicetypeid=value;}
		}
                
		/// <summary>
		/// 接收端证书
		/// </summary>
		public string f_recive_certificate
		{
			get{return _f_recive_certificate;}
			set{ _f_recive_certificate=value;}
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
		/// 业务表主键名称
		/// </summary>
		public string f_businesstablekeyname
		{
			get{return _f_businesstablekeyname;}
			set{ _f_businesstablekeyname=value;}
		}
                
		/// <summary>
		/// 业务表主键值
		/// </summary>
		public string f_businesstablekeyvalue
		{
			get{return _f_businesstablekeyvalue;}
			set{ _f_businesstablekeyvalue=value;}
		}
                
		/// <summary>
		/// 状态：0：未发送；1：已发送；2：已接受
		/// </summary>
		public string f_status
		{
			get{return _f_status;}
			set{ _f_status=value;}
		}
                
		/// <summary>
		/// f_status
		/// </summary>
		public string f_statusid
		{
			get{return _f_statusid;}
			set{ _f_statusid=value;}
		}
                
		#endregion Model
    }
}



