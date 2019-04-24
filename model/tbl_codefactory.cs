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
    /// 实体类tbl_codefactory 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_codefactory
    {
    	public tbl_codefactory()
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
                
		private string _f_text1;
                
		private string _f_text2;
                
		private string _f_text3;
                
		private string _f_singledropdownlist;
                
		private string _f_singledropdownlistid;
                
		private string _f_multidropdownlist;
                
		private string _f_multidropdownlistid;
                
		private string _f_itemlist;

        private string _f_itemlistid;
                
		private string _f_toggle;
                
		private string _f_checklist;
                
		private string _f_checklistid;
                
		private string _f_radiolist;
                
		private string _f_radiolistid;
                
		private string _f_autocomplete;
                
		private DateTime _f_datetime;
                
		private string _f_slider;
                
		private string _f_textarea;
                
		private string _f_richtext;
                
		private string _f_file;
                
                
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
		/// 删除时间
		/// </summary>
		public DateTime sys_deldate
		{
			get{return _sys_deldate;}
			set{ _sys_deldate=value;}
		}
                
		/// <summary>
		/// 是否删除：0：否，1：是
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
		/// 文本录入框
		/// </summary>
		public string f_text1
		{
			get{return _f_text1;}
			set{ _f_text1=value;}
		}
                
		/// <summary>
		/// 带按钮的文本录入框
		/// </summary>
		public string f_text2
		{
			get{return _f_text2;}
			set{ _f_text2=value;}
		}
                
		/// <summary>
		/// 带提示的文本录入框
		/// </summary>
		public string f_text3
		{
			get{return _f_text3;}
			set{ _f_text3=value;}
		}
                
		/// <summary>
		/// 单选下拉列表
		/// </summary>
		public string f_singledropdownlist
		{
			get{return _f_singledropdownlist;}
			set{ _f_singledropdownlist=value;}
		}
                
		/// <summary>
		/// 单选下拉列表id
		/// </summary>
		public string f_singledropdownlistid
		{
			get{return _f_singledropdownlistid;}
			set{ _f_singledropdownlistid=value;}
		}
                
		/// <summary>
		/// 复选下拉列表
		/// </summary>
		public string f_multidropdownlist
		{
			get{return _f_multidropdownlist;}
			set{ _f_multidropdownlist=value;}
		}
                
		/// <summary>
		/// 复选下拉列表id
		/// </summary>
		public string f_multidropdownlistid
		{
			get{return _f_multidropdownlistid;}
			set{ _f_multidropdownlistid=value;}
		}
                
		/// <summary>
        /// itemlist
		/// </summary>
		public string f_itemlist
		{
			get{return _f_itemlist;}
            set { _f_itemlist = value; }
		}
                
		/// <summary>
		/// listboxid
		/// </summary>
        public string f_itemlistid
		{
            get { return _f_itemlistid; }
            set { _f_itemlistid = value; }
		}
                
		/// <summary>
		/// 是否按钮
		/// </summary>
		public string f_toggle
		{
			get{return _f_toggle;}
			set{ _f_toggle=value;}
		}
                
		/// <summary>
		/// 复选框列表
		/// </summary>
		public string f_checklist
		{
			get{return _f_checklist;}
            set { _f_checklist = value; }
		}
                
		/// <summary>
		/// 复选框列表id
		/// </summary>
		public string f_checklistid
		{
			get{return _f_checklistid;}
            set { _f_checklistid = value; }
		}
                
		/// <summary>
		/// 单选框列表
		/// </summary>
		public string f_radiolist
		{
			get{return _f_radiolist;}
			set{ _f_radiolist=value;}
		}
                
		/// <summary>
		/// 单选框列表id
		/// </summary>
		public string f_radiolistid
		{
			get{return _f_radiolistid;}
			set{ _f_radiolistid=value;}
		}
                
		/// <summary>
		/// 自动完成
		/// </summary>
		public string f_autocomplete
		{
			get{return _f_autocomplete;}
			set{ _f_autocomplete=value;}
		}
                
		/// <summary>
		/// 日期和时间
		/// </summary>
		public DateTime f_datetime
		{
			get{return _f_datetime;}
			set{ _f_datetime=value;}
		}
                
		/// <summary>
		/// 滑动条
		/// </summary>
		public string f_slider
		{
			get{return _f_slider;}
			set{ _f_slider=value;}
		}
                
		/// <summary>
		/// 大文本框
		/// </summary>
		public string f_textarea
		{
			get{return _f_textarea;}
			set{ _f_textarea=value;}
		}
                
		/// <summary>
		/// 富文本框
		/// </summary>
		public string f_richtext
		{
			get{return _f_richtext;}
			set{ _f_richtext=value;}
		}
                
		/// <summary>
		/// 附件
		/// </summary>
		public string f_file
		{
			get{return _f_file;}
			set{ _f_file=value;}
		}
                
		#endregion Model
    }
}