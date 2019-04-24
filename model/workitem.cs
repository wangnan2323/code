using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.model
{

//    @"tbl_maintable_sys_id: '{0}',
//              projectclassid: '{2}',
//              projectclassid_name: '{3}',
//              projectclassdtl1: '2{6}',
//              projectclassdtl1_name: '区县审核{7}',
//              projectclassdtl2: '{4}',
//              projectclassdtl2_name: '{5}',
//              appurl: '../tbl_maintable/tbl_maintable_detailall.html',
//              appparameter: 'uid=[userid]^sys_id=[tbl_maintable_sys_id]^pagetype=[pagetype]^projectclassid=[projectclassid]^projectclassdtl1=[projectclassdtl1]^projectclassdtl2=[projectclassdtl1]^appcode=[appcode]',
//              shpid: '111222',
//              receivetime: '{1}',
//              xmmc: '项目名称_{0}_{1}',
//              custom_xmlx: '项目类型1',
//              custom_dwmc: '单位名称1'";

        [Serializable]
    public class workitem
    {

        private string _tbl_maintable_sys_id;

        public string tbl_maintable_sys_id
        {
            get { return _tbl_maintable_sys_id; }
            set { _tbl_maintable_sys_id = value; }
        }

        private string _projectclassid;

        public string projectclassid
        {
            get { return _projectclassid; }
            set { _projectclassid = value; }
        }


        private string _projectclassorderid;

        public string projectclassorderid
        {
            get { return _projectclassorderid; }
            set { _projectclassorderid = value; }
        }

        private string  _projectclassid_name;

        public string  projectclassid_name
        {
            get { return _projectclassid_name; }
            set { _projectclassid_name = value; }
        }


        private string _projectclassdtl1;

        public string projectclassdtl1
        {
            get { return _projectclassdtl1; }
            set { _projectclassdtl1 = value; }
        }

        private string _projectclassdtl1orderid;

        public string projectclassdtl1orderid
        {
            get { return _projectclassdtl1orderid; }
            set { _projectclassdtl1orderid = value; }
        }

        private string _projectclassdtl1_name;

        public string projectclassdtl1_name
        {
            get { return _projectclassdtl1_name; }
            set { _projectclassdtl1_name = value; }
        }

        private string _projectclassdtl2;

        public string projectclassdtl2
        {
            get { return _projectclassdtl2; }
            set { _projectclassdtl2 = value; }
        }

        private string _projectclassdtl2orderid;

        public string projectclassdtl2orderid
        {
            get { return _projectclassdtl2orderid; }
            set { _projectclassdtl2orderid = value; }
        }

        private string _projectclassdtl2_name;

        public string projectclassdtl2_name
        {
            get { return _projectclassdtl2_name; }
            set { _projectclassdtl2_name = value; }
        }


        private string _appurl;

        public string appurl
        {
            get { return _appurl; }
            set { _appurl = value; }
        }


        private string _appparameter;

        public string appparameter
        {
            get { return _appparameter; }
            set { _appparameter = value; }
        }


        private string _shpid;

        public string shpid
        {
            get { return _shpid; }
            set { _shpid = value; }
        }

        private string _receivetime;

        public string receivetime
        {
            get { return _receivetime; }
            set { _receivetime = value; }
        }

        private string _lzlx;
        public string lzlx
        {
            get { return _lzlx; }
            set { _lzlx = value; }
        }

        private string _xmmc;

        public string xmmc
        {
            get { return _xmmc; }
            set { _xmmc = value; }
        }

        private string _custom_xmlx;

        public string custom_xmlx
        {
            get { return _custom_xmlx; }
            set { _custom_xmlx = value; }
        }

        private string _custom_dwmc;

        public string custom_dwmc
        {
            get { return _custom_dwmc; }
            set { _custom_dwmc = value; }
        }

        private string _custom_lrr;

        public string custom_lrr
        {
            get { return _custom_lrr; }
            set { _custom_lrr = value; }
        }

        private string _custom_xzqy;

        public string custom_xzqy
        {
            get { return _custom_xzqy; }
            set { _custom_xzqy = value; }
        }
            /// <summary>
            /// 流转类型：办件、审批
            /// </summary>



        private string _sys_first;
            /// <summary>
            /// 0:未操作过1：有操作过
            /// </summary>
        public string sys_first
        {
            get { return _sys_first; }
            set { _sys_first = value; }
        }

        
        
    }
}