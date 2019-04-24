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
    /// 实体类tbl_maintable 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_maintable
    {
    	public tbl_maintable()
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
                
		private string _sys_processnextuser;
                
		private string _sys_projectclassdtl1;
                
		private string _sys_projectclassdtl2;
                
		private string _sys_processinsid;
                
		private string _sys_projectclassdtl1_name;
                
		private string _sys_projectclassdtl2_name;
                
		private string _sys_first;
                
		private string _sys_projectclassid;
                
		private string _fk_tbl_maintable_sys_id;
                
		private string _fk_workflow_sys_id;
                
		private string _shpid;
                
		private string _xmmc;
                
		private string _xzqy;
                
		private string _xzqyid;
                
		private string _dwmc;
                
		private string _lrr;
                
		private DateTime _lrrq;
                
		private string _bz;
                
		private string _xmlx;
                
		private string _xmlxid;
                
		private string _value1;
                
		private string _value2;
                
		private string _value3;
                
		private string _value4;
                
		private string _value5;
                
		private string _value6;
                
		private string _value7;
                
		private string _value8;
                
		private string _value9;
                
		private string _value10;

        private string _sys_projectclassid_name;
                
                
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
		/// 删除人id
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
		/// 删除时间1900-1-1
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
		/// 下一个操作人
		/// </summary>
		public string sys_processnextuser
		{
			get{return _sys_processnextuser;}
			set{ _sys_processnextuser=value;}
		}
                
		/// <summary>
		/// 业务状态
		/// </summary>
		public string sys_projectclassdtl1
		{
			get{return _sys_projectclassdtl1;}
			set{ _sys_projectclassdtl1=value;}
		}
                
		/// <summary>
		/// 数据状态
		/// </summary>
		public string sys_projectclassdtl2
		{
			get{return _sys_projectclassdtl2;}
			set{ _sys_projectclassdtl2=value;}
		}
                
		/// <summary>
		/// 流程实例id
		/// </summary>
		public string sys_processinsid
		{
			get{return _sys_processinsid;}
			set{ _sys_processinsid=value;}
		}
                
		/// <summary>
		/// --
		/// </summary>
		public string sys_projectclassdtl1_name
		{
			get{return _sys_projectclassdtl1_name;}
			set{ _sys_projectclassdtl1_name=value;}
		}
                
		/// <summary>
		/// --
		/// </summary>
		public string sys_projectclassdtl2_name
		{
			get{return _sys_projectclassdtl2_name;}
			set{ _sys_projectclassdtl2_name=value;}
		}
                
		/// <summary>
		/// 是否经过操作0: 未经操作；1：经过操作
		/// </summary>
		public string sys_first
		{
			get{return _sys_first;}
			set{ _sys_first=value;}
		}
                
		/// <summary>
		/// 项目类型id
		/// </summary>
		public string sys_projectclassid
		{
			get{return _sys_projectclassid;}
			set{ _sys_projectclassid=value;}
		}
                
		/// <summary>
		/// 外键
		/// </summary>
		public string fk_tbl_maintable_sys_id
		{
			get{return _fk_tbl_maintable_sys_id;}
			set{ _fk_tbl_maintable_sys_id=value;}
		}
                
		/// <summary>
		/// 数据处于哪个审核流程包中id
		/// </summary>
		public string fk_workflow_sys_id
		{
			get{return _fk_workflow_sys_id;}
			set{ _fk_workflow_sys_id=value;}
		}
                
		/// <summary>
		/// 图形id
		/// </summary>
		public string shpid
		{
			get{return _shpid;}
			set{ _shpid=value;}
		}
                
		/// <summary>
		/// 项目名称
		/// </summary>
		public string xmmc
		{
			get{return _xmmc;}
			set{ _xmmc=value;}
		}
                
		/// <summary>
		/// 行政区域
		/// </summary>
		public string xzqy
		{
			get{return _xzqy;}
			set{ _xzqy=value;}
		}
                
		/// <summary>
		/// xzqy
		/// </summary>
		public string xzqyid
		{
			get{return _xzqyid;}
			set{ _xzqyid=value;}
		}
                
		/// <summary>
		/// 单位名称
		/// </summary>
		public string dwmc
		{
			get{return _dwmc;}
			set{ _dwmc=value;}
		}
                
		/// <summary>
		/// 录入人
		/// </summary>
		public string lrr
		{
			get{return _lrr;}
			set{ _lrr=value;}
		}
                
		/// <summary>
		/// 录入日期
		/// </summary>
		public DateTime lrrq
		{
			get{return _lrrq;}
			set{ _lrrq=value;}
		}
                
		/// <summary>
		/// 备注
		/// </summary>
		public string bz
		{
			get{return _bz;}
			set{ _bz=value;}
		}
                
		/// <summary>
		/// 项目类型
		/// </summary>
		public string xmlx
		{
			get{return _xmlx;}
			set{ _xmlx=value;}
		}
                
		/// <summary>
		/// xmlx
		/// </summary>
		public string xmlxid
		{
			get{return _xmlxid;}
			set{ _xmlxid=value;}
		}
                
		/// <summary>
		/// 备用字段1
		/// </summary>
		public string value1
		{
			get{return _value1;}
			set{ _value1=value;}
		}
                
		/// <summary>
		/// 备用字段2
		/// </summary>
		public string value2
		{
			get{return _value2;}
			set{ _value2=value;}
		}
                
		/// <summary>
		/// 备用字段3
		/// </summary>
		public string value3
		{
			get{return _value3;}
			set{ _value3=value;}
		}
                
		/// <summary>
		/// 备用字段4
		/// </summary>
		public string value4
		{
			get{return _value4;}
			set{ _value4=value;}
		}
                
		/// <summary>
		/// 备用字段5
		/// </summary>
		public string value5
		{
			get{return _value5;}
			set{ _value5=value;}
		}
                
		/// <summary>
		/// 备用字段6
		/// </summary>
		public string value6
		{
			get{return _value6;}
			set{ _value6=value;}
		}
                
		/// <summary>
		/// 备用字段7
		/// </summary>
		public string value7
		{
			get{return _value7;}
			set{ _value7=value;}
		}
                
		/// <summary>
		/// 备用字段8
		/// </summary>
		public string value8
		{
			get{return _value8;}
			set{ _value8=value;}
		}
                
		/// <summary>
		/// 备用字段9
		/// </summary>
		public string value9
		{
			get{return _value9;}
			set{ _value9=value;}
		}
                
		/// <summary>
		/// 备用字段10
		/// </summary>
		public string value10
		{
			get{return _value10;}
			set{ _value10=value;}
		}

        /// <summary>
        /// --
        /// </summary>
        public string sys_projectclassid_name
        {
            get { return _sys_projectclassid_name; }
            set { _sys_projectclassid_name = value; }
        }
                
		#endregion Model
    }
}