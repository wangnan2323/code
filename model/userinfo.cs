using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.model
{
        [Serializable]
    public class userinfo
    {
        private string _sys_userid;

        /// <summary>
        /// 用户ID
        /// </summary>
        public string sys_userid
        {
            get { return _sys_userid; }
            set { _sys_userid = value; }
        }

        private string _sys_username;
        /// <summary>
        /// 用户名称
        /// </summary>
        public string sys_username
        {
            get { return _sys_username; }
            set { _sys_username = value; }
        }
        private string _sys_userloginname;
        /// <summary>
        /// 用户登录名
        /// </summary>
        public string sys_userloginname
        {
            get { return _sys_userloginname; }
            set { _sys_userloginname = value; }
        }
        private string _sys_organid;
        /// <summary>
        /// 用户所在机构ID
        /// </summary>
        public string sys_organid
        {
            get { return _sys_organid; }
            set { _sys_organid = value; }
        }
        private string _sys_organcode;
        /// <summary>
        /// 用户所在机构工作流代码-区县代码
        /// </summary>
        public string sys_organcode
        {
            get { return _sys_organcode; }
            set { _sys_organcode = value; }
        }
        private string _sys_organname;
        /// <summary>
        /// 用户所在机构名称
        /// </summary>
        public string sys_organname
        {
            get { return _sys_organname; }
            set { _sys_organname = value; }
        }
        private string _sys_toporgan;
        /// <summary>
        /// 用户所在行政区域ID
        /// </summary>
        public string sys_toporgan
        {
            get { return _sys_toporgan; }
            set { _sys_toporgan = value; }
        }
        private string _sys_toporganname;
        /// <summary>
        /// 用户所在行政区域名称
        /// </summary>
        public string sys_toporganname
        {
            get { return _sys_toporganname; }
            set { _sys_toporganname = value; }
        }
        private string _sys_roles;
        /// <summary>
        /// 用户角色IDS
        /// </summary>
        public string sys_roles
        {
            get { return _sys_roles; }
            set { _sys_roles = value; }
        }
        private string _sys_rolenames;
        /// <summary>
        /// 用户角色名称
        /// </summary>
        public string sys_rolenames
        {
            get { return _sys_rolenames; }
            set { _sys_rolenames = value; }
        }
        private string _sys_rolenameremarks;
        /// <summary>
        /// 用户角色备注，行政区域角色备注为行政区域ID
        /// </summary>
        public string sys_rolenameremarks
        {
            get { return _sys_rolenameremarks; }
            set { _sys_rolenameremarks = value; }
        }
        private string _sys_positionids;
        /// <summary>
        /// 用户岗位IDS
        /// </summary>
        public string sys_positionids
        {
            get { return _sys_positionids; }
            set { _sys_positionids = value; }
        }
        private string _sys_positionnames;
        /// <summary>
        /// 用户岗位名称
        /// </summary>
        public string sys_positionnames
        {
            get { return _sys_positionnames; }
            set { _sys_positionnames = value; }
        }
        private string _sys_fieldnames;
        /// <summary>
        /// 用户字段信息
        /// </summary>
        public string sys_fieldnames
        {
            get { return _sys_fieldnames; }
            set { _sys_fieldnames = value; }
        }

    }
}