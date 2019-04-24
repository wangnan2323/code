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
    /// 实体类tbl_filescontent 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_filescontent
    {
    	public tbl_filescontent()
		{}
		#region Model
                
		private int _sys_id;
                
		private string _sys_orderid;
                
		private string _sys_userid;
                
		private string _sys_username;
                
		private DateTime _sys_creatdate;
                
		private string _sys_lastedituserid;
                
		private string _sys_lasteditusername;
                
		private DateTime _sys_lasteditdate;
                
		private string _sys_deluserid;
                
		private string _sys_delusername;
                
		private DateTime _sys_deldate;
                
		private string _sys_delflag;
                
		private string _fk_maintable_sys_id;
                
		private string _fk_projclass_sys_id;
                
		private string _filename;
                
		private string _filerealname;
                
		private string _fileclass;
                
		private string _filesize;
                
		private string _filetitle;
                
		private string _filenote;
                
		private string _fnumber;
                
                
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
		/// 创建人id
		/// </summary>
		public string sys_userid
		{
			get{return _sys_userid;}
			set{ _sys_userid=value;}
		}
                
		/// <summary>
		/// 创建人姓名
		/// </summary>
		public string sys_username
		{
			get{return _sys_username;}
			set{ _sys_username=value;}
		}
                
		/// <summary>
		/// 创建时间
		/// </summary>
		public DateTime sys_creatdate
		{
			get{return _sys_creatdate;}
			set{ _sys_creatdate=value;}
		}
                
		/// <summary>
		/// 最终修改人id
		/// </summary>
		public string sys_lastedituserid
		{
			get{return _sys_lastedituserid;}
			set{ _sys_lastedituserid=value;}
		}
                
		/// <summary>
		/// 最终修改人姓名
		/// </summary>
		public string sys_lasteditusername
		{
			get{return _sys_lasteditusername;}
			set{ _sys_lasteditusername=value;}
		}
                
		/// <summary>
		/// 最终修改时间
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
		/// 删除人姓名
		/// </summary>
		public string sys_delusername
		{
			get{return _sys_delusername;}
			set{ _sys_delusername=value;}
		}
                
		/// <summary>
		/// 删除时间
		/// </summary>
		public DateTime sys_deldate
		{
			get{return _sys_deldate;}
			set{ _sys_deldate=value;}
		}
                
		/// <summary>
		/// 删除标志位0
		/// </summary>
		public string sys_delflag
		{
			get{return _sys_delflag;}
			set{ _sys_delflag=value;}
		}
                
		/// <summary>
		/// 外键
		/// </summary>
		public string fk_maintable_sys_id
		{
			get{return _fk_maintable_sys_id;}
			set{ _fk_maintable_sys_id=value;}
		}
                
		/// <summary>
		/// 业务类型ID
		/// </summary>
		public string fk_projclass_sys_id
		{
			get{return _fk_projclass_sys_id;}
			set{ _fk_projclass_sys_id=value;}
		}
                
		/// <summary>
		/// 文件名称
		/// </summary>
		public string filename
		{
			get{return _filename;}
			set{ _filename=value;}
		}
                
		/// <summary>
		/// 文件真名
		/// </summary>
		public string filerealname
		{
			get{return _filerealname;}
			set{ _filerealname=value;}
		}
                
		/// <summary>
		/// 文件类型
		/// </summary>
		public string fileclass
		{
			get{return _fileclass;}
			set{ _fileclass=value;}
		}
                
		/// <summary>
		/// 文件大小
		/// </summary>
		public string filesize
		{
			get{return _filesize;}
			set{ _filesize=value;}
		}
                
		/// <summary>
		/// 文件说明[来源于数据初始化]nodename
		/// </summary>
		public string filetitle
		{
			get{return _filetitle;}
			set{ _filetitle=value;}
		}
                
		/// <summary>
		/// 文件说明
		/// </summary>
		public string filenote
		{
			get{return _filenote;}
			set{ _filenote=value;}
		}
                
		/// <summary>
		/// 次数
		/// </summary>
		public string fnumber
		{
			get{return _fnumber;}
			set{ _fnumber=value;}
		}
                
		#endregion Model
    }
}