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
    /// 实体类t_projstate_log 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class t_projstate_log
    {
    	public t_projstate_log()
		{}
		#region Model
                
		private int _sys_id;
                
		private string _sys_orderid;
                
		private string _sys_creatuserid;
                
		private string _sys_creatusername;
                
		private DateTime _sys_creatdate;
                
		private string _sys_flag;
                
		private string _businessname;
                
		private string _businessid;
                
		private string _fromstate;
                
		private string _tostate;
                
		private string _processsinsid;
                
		private string _processdefid;
                
		private string _workflowid;
                
		private string _remark;
                
		private string _value1;
                
		private string _value2;
                
		private string _value3;
                
		private string _value4;
                
		private string _value5;
                
                
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
		public string sys_creatuserid
		{
			get{return _sys_creatuserid;}
			set{ _sys_creatuserid=value;}
		}
                
		/// <summary>
		/// 创建人姓名
		/// </summary>
		public string sys_creatusername
		{
			get{return _sys_creatusername;}
			set{ _sys_creatusername=value;}
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
		/// 数据有效状态
		/// </summary>
		public string sys_flag
		{
			get{return _sys_flag;}
			set{ _sys_flag=value;}
		}
                
		/// <summary>
		/// 业务表名称
		/// </summary>
		public string businessname
		{
			get{return _businessname;}
			set{ _businessname=value;}
		}
                
		/// <summary>
		/// 业务表id
		/// </summary>
		public string businessid
		{
			get{return _businessid;}
			set{ _businessid=value;}
		}
                
		/// <summary>
		/// 业务状态[变更前]
		/// </summary>
		public string fromstate
		{
			get{return _fromstate;}
			set{ _fromstate=value;}
		}
                
		/// <summary>
		/// 业务状态[变更后]
		/// </summary>
		public string tostate
		{
			get{return _tostate;}
			set{ _tostate=value;}
		}
                
		/// <summary>
		/// 流程实例id
		/// </summary>
		public string processsinsid
		{
			get{return _processsinsid;}
			set{ _processsinsid=value;}
		}
                
		/// <summary>
		/// 流程定义id
		/// </summary>
		public string processdefid
		{
			get{return _processdefid;}
			set{ _processdefid=value;}
		}
                
		/// <summary>
		/// 审核流程id
		/// </summary>
		public string workflowid
		{
			get{return _workflowid;}
			set{ _workflowid=value;}
		}
                
		/// <summary>
		/// 审核意见
		/// </summary>
		public string remark
		{
			get{return _remark;}
			set{ _remark=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string value1
		{
			get{return _value1;}
			set{ _value1=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string value2
		{
			get{return _value2;}
			set{ _value2=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string value3
		{
			get{return _value3;}
			set{ _value3=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string value4
		{
			get{return _value4;}
			set{ _value4=value;}
		}
                
		/// <summary>
		/// 
		/// </summary>
		public string value5
		{
			get{return _value5;}
			set{ _value5=value;}
		}
                
		#endregion Model
    }
}