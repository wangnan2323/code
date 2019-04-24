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
    /// 实体类tbl_ld_xxbgnr 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_xxbgnr
    {
    	public tbl_ld_xxbgnr()
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
                
		private string _fk_tbl_ld_xxbg_sys_id;
                
		private string _f_bgnr;
                
		private string _f_bgnrid;
                
		private string _f_singledropdowngroup_dy_old;
                
		private string _f_singledropdowngroup_dy_oldid;
                
		private string _f_singledropdowngroup_sc_old;
                
		private string _f_singledropdowngroup_sc_oldid;
                
		private string _f_singledropdowngroup_qy_old;
                
		private string _f_singledropdowngroup_qy_oldid;
                
		private string _f_singledropdowngroup_pq_old;
                
		private string _f_singledropdowngroup_pq_oldid;
                
		private string _f_singledropdowngroup_dy_new;
                
		private string _f_singledropdowngroup_dy_newid;
                
		private string _f_singledropdowngroup_sc_new;
                
		private string _f_singledropdowngroup_sc_newid;
                
		private string _f_singledropdowngroup_qy_new;
                
		private string _f_singledropdowngroup_qy_newid;
                
		private string _f_singledropdowngroup_pq_new;
                
		private string _f_singledropdowngroup_pq_newid;
                
		private string _f_text_old;
                
		private string _f_text_new;
                
		private string _f_singledropdownlist_old;
                
		private string _f_singledropdownlist_oldid;
                
		private string _f_singledropdownlist_new;
                
		private string _f_singledropdownlist_newid;
                
		private string _f_multidropdownlist_old;
                
		private string _f_multidropdownlist_oldid;
                
		private string _f_multidropdownlist_new;
                
		private string _f_multidropdownlist_newid;
                
		private DateTime _f_datetime_old;
                
		private DateTime _f_datetime_new;
                
		private DateTime _f_datetimetime_old;
                
		private DateTime _f_datetimetime_new;
                
		private string _f_toggle_old;
                
		private string _f_toggle_new;
                
		private string _f_textarea_old;
                
		private string _f_textarea_new;
                
                
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
		/// 信息变更_主键
		/// </summary>
		public string fk_tbl_ld_xxbg_sys_id
		{
			get{return _fk_tbl_ld_xxbg_sys_id;}
			set{ _fk_tbl_ld_xxbg_sys_id=value;}
		}
                
		/// <summary>
		/// 变更内容
		/// </summary>
		public string f_bgnr
		{
			get{return _f_bgnr;}
			set{ _f_bgnr=value;}
		}
                
		/// <summary>
		/// 变更内容id
		/// </summary>
		public string f_bgnrid
		{
			get{return _f_bgnrid;}
			set{ _f_bgnrid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_dy_old
		{
			get{return _f_singledropdowngroup_dy_old;}
			set{ _f_singledropdowngroup_dy_old=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_dy_oldid
		{
			get{return _f_singledropdowngroup_dy_oldid;}
			set{ _f_singledropdowngroup_dy_oldid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_sc_old
		{
			get{return _f_singledropdowngroup_sc_old;}
			set{ _f_singledropdowngroup_sc_old=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_sc_oldid
		{
			get{return _f_singledropdowngroup_sc_oldid;}
			set{ _f_singledropdowngroup_sc_oldid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_qy_old
		{
			get{return _f_singledropdowngroup_qy_old;}
			set{ _f_singledropdowngroup_qy_old=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_qy_oldid
		{
			get{return _f_singledropdowngroup_qy_oldid;}
			set{ _f_singledropdowngroup_qy_oldid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_pq_old
		{
			get{return _f_singledropdowngroup_pq_old;}
			set{ _f_singledropdowngroup_pq_old=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_pq_oldid
		{
			get{return _f_singledropdowngroup_pq_oldid;}
			set{ _f_singledropdowngroup_pq_oldid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_dy_new
		{
			get{return _f_singledropdowngroup_dy_new;}
			set{ _f_singledropdowngroup_dy_new=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_dy_newid
		{
			get{return _f_singledropdowngroup_dy_newid;}
			set{ _f_singledropdowngroup_dy_newid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_sc_new
		{
			get{return _f_singledropdowngroup_sc_new;}
			set{ _f_singledropdowngroup_sc_new=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_sc_newid
		{
			get{return _f_singledropdowngroup_sc_newid;}
			set{ _f_singledropdowngroup_sc_newid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_qy_new
		{
			get{return _f_singledropdowngroup_qy_new;}
			set{ _f_singledropdowngroup_qy_new=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_qy_newid
		{
			get{return _f_singledropdowngroup_qy_newid;}
			set{ _f_singledropdowngroup_qy_newid=value;}
		}
                
		/// <summary>
		/// singledropdowngroup
		/// </summary>
		public string f_singledropdowngroup_pq_new
		{
			get{return _f_singledropdowngroup_pq_new;}
			set{ _f_singledropdowngroup_pq_new=value;}
		}
                
		/// <summary>
		/// singledropdowngroupid
		/// </summary>
		public string f_singledropdowngroup_pq_newid
		{
			get{return _f_singledropdowngroup_pq_newid;}
			set{ _f_singledropdowngroup_pq_newid=value;}
		}
                
		/// <summary>
		/// text
		/// </summary>
		public string f_text_old
		{
			get{return _f_text_old;}
			set{ _f_text_old=value;}
		}
                
		/// <summary>
		/// text
		/// </summary>
		public string f_text_new
		{
			get{return _f_text_new;}
			set{ _f_text_new=value;}
		}
                
		/// <summary>
		/// singledropdownlist
		/// </summary>
		public string f_singledropdownlist_old
		{
			get{return _f_singledropdownlist_old;}
			set{ _f_singledropdownlist_old=value;}
		}
                
		/// <summary>
		/// singledropdownlistid
		/// </summary>
		public string f_singledropdownlist_oldid
		{
			get{return _f_singledropdownlist_oldid;}
			set{ _f_singledropdownlist_oldid=value;}
		}
                
		/// <summary>
		/// singledropdownlist
		/// </summary>
		public string f_singledropdownlist_new
		{
			get{return _f_singledropdownlist_new;}
			set{ _f_singledropdownlist_new=value;}
		}
                
		/// <summary>
		/// singledropdownlistid
		/// </summary>
		public string f_singledropdownlist_newid
		{
			get{return _f_singledropdownlist_newid;}
			set{ _f_singledropdownlist_newid=value;}
		}
                
		/// <summary>
		/// multidropdownlist
		/// </summary>
		public string f_multidropdownlist_old
		{
			get{return _f_multidropdownlist_old;}
			set{ _f_multidropdownlist_old=value;}
		}
                
		/// <summary>
		/// multidropdownlistid
		/// </summary>
		public string f_multidropdownlist_oldid
		{
			get{return _f_multidropdownlist_oldid;}
			set{ _f_multidropdownlist_oldid=value;}
		}
                
		/// <summary>
		/// multidropdownlist
		/// </summary>
		public string f_multidropdownlist_new
		{
			get{return _f_multidropdownlist_new;}
			set{ _f_multidropdownlist_new=value;}
		}
                
		/// <summary>
		/// multidropdownlistid
		/// </summary>
		public string f_multidropdownlist_newid
		{
			get{return _f_multidropdownlist_newid;}
			set{ _f_multidropdownlist_newid=value;}
		}
                
		/// <summary>
		/// datetime
		/// </summary>
		public DateTime f_datetime_old
		{
			get{return _f_datetime_old;}
			set{ _f_datetime_old=value;}
		}
                
		/// <summary>
		/// datetime
		/// </summary>
		public DateTime f_datetime_new
		{
			get{return _f_datetime_new;}
			set{ _f_datetime_new=value;}
		}
                
		/// <summary>
		/// datetime_time
		/// </summary>
		public DateTime f_datetimetime_old
		{
			get{return _f_datetimetime_old;}
			set{ _f_datetimetime_old=value;}
		}
                
		/// <summary>
		/// datetime_time
		/// </summary>
		public DateTime f_datetimetime_new
		{
			get{return _f_datetimetime_new;}
			set{ _f_datetimetime_new=value;}
		}
                
		/// <summary>
		/// toggle
		/// </summary>
		public string f_toggle_old
		{
			get{return _f_toggle_old;}
			set{ _f_toggle_old=value;}
		}
                
		/// <summary>
		/// toggle
		/// </summary>
		public string f_toggle_new
		{
			get{return _f_toggle_new;}
			set{ _f_toggle_new=value;}
		}
                
		/// <summary>
		/// textarea
		/// </summary>
		public string f_textarea_old
		{
			get{return _f_textarea_old;}
			set{ _f_textarea_old=value;}
		}
                
		/// <summary>
		/// textarea
		/// </summary>
		public string f_textarea_new
		{
			get{return _f_textarea_new;}
			set{ _f_textarea_new=value;}
		}
                
		#endregion Model
    }
}



