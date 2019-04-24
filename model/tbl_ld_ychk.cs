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
    /// 实体类tbl_ld_ychk 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class tbl_ld_ychk
    {
    	public tbl_ld_ychk()
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
                
		private string _f_ychkpc;
                
		private string _f_cbxz;
                
		private string _f_cbxzid;

        private string _f_jfly;

        private string _f_jflyid;

        private string _f_dcr;
                
		private DateTime _f_dcsj;
                
		private string _f_drr;
                
		private DateTime _f_drsj;
                
		private string _f_tsjgdr;
                
		private string _f_zt;
                
		private string _f_ztid;
                
		private string _f_dcrid;
                
		private string _f_drrid;
                
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
		/// 邮储划扣批次
		/// </summary>
		public string f_ychkpc
		{
			get{return _f_ychkpc;}
			set{ _f_ychkpc=value;}
		}
                
		/// <summary>
		/// 抄本选择
		/// </summary>
		public string f_cbxz
		{
			get{return _f_cbxz;}
			set{ _f_cbxz=value;}
		}
                
		/// <summary>
		/// 抄本选择id
		/// </summary>
		public string f_cbxzid
		{
			get{return _f_cbxzid;}
			set{ _f_cbxzid=value;}
		}

        /// <summary>
        /// 抄本选择
        /// </summary>
        public string f_jfly
        {
            get { return _f_jfly; }
            set { _f_jfly = value; }
        }

        /// <summary>
        /// 抄本选择id
        /// </summary>
        public string f_jflyid
        {
            get { return _f_jflyid; }
            set { _f_jflyid = value; }
        }

        /// <summary>
        /// 导出人
        /// </summary>
        public string f_dcr
		{
			get{return _f_dcr;}
			set{ _f_dcr=value;}
		}
                
		/// <summary>
		/// 导出时间
		/// </summary>
		public DateTime f_dcsj
		{
			get{return _f_dcsj;}
			set{ _f_dcsj=value;}
		}
                
		/// <summary>
		/// 导入人
		/// </summary>
		public string f_drr
		{
			get{return _f_drr;}
			set{ _f_drr=value;}
		}
                
		/// <summary>
		/// 导入时间
		/// </summary>
		public DateTime f_drsj
		{
			get{return _f_drsj;}
			set{ _f_drsj=value;}
		}
                
		/// <summary>
		/// 托收结果导入
		/// </summary>
		public string f_tsjgdr
		{
			get{return _f_tsjgdr;}
			set{ _f_tsjgdr=value;}
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
		/// 导出人id
		/// </summary>
		public string f_dcrid
		{
			get{return _f_dcrid;}
			set{ _f_dcrid=value;}
		}
                
		/// <summary>
		/// 导入人id
		/// </summary>
		public string f_drrid
		{
			get{return _f_drrid;}
			set{ _f_drrid=value;}
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



