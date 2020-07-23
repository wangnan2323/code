


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_cbreport_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_cbreport.asmx/',
        //Grid控件的分页参数，设置为空即可实现不分页
        _pageSize = '20',
        _isPage = true,
        //Code数据存储容器
        _baseCodeHashMap = null,
        //校验结果容器
        _validateMessage = null,
        _validateMessage_searchtime = null,
        //按钮工具
        _ladda_btn_command_new = null,
        _ladda_btn_command_delete = null,
        _ladda_btn_command_exp = null,
        _ladda_btn_command_his = null,
        _ladda_btn_command_showcolunm = null,
        //查询sql语句
        _whereClauseString = '',
        //_default_two_from = '',//默认开始两月之内的
        //_defaultfrom = '',//默认开始时间，当前天
        //_defaultto = '',//默认开始时间，当前天


    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function (callBackFunction)
    {
        try
        {

            that._pr_listtype = requestQuery('listtype');
            that._pr_isadmin = requestQuery('isadmin');
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            that._pr_searchtime = requestQuery('searchtime');
            that._pr_searchhis = requestQuery('searchhis');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

            if (that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null')
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number(that._pr_gridpageindex);
            }

            if (that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null')
            {
                that._pr_searchcontent = new Object();
            }
            else
            {
                that._pr_searchcontent = (new Function("", "return " + that._pr_searchcontent))();
            }

            if (that._pr_searchhis == null || that._pr_searchhis == '' || that._pr_searchhis == 'null')
            {
                that._pr_searchhis = 'false';
            }

            if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null')
            {
                that._pr_searchtype = '1';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_cbreport_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_cbreport_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_cbreport_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_cbreport_list').attr("disabled", true);
                    break;
            }
            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '1';
            }

            if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null')
            {
                _blockMessage.show('listtype参数接收失败...', 'fail');
            }
            else
            {
                callBackFunction.success();
            }
        }
        catch (ex)
        {
            _blockMessage.show('initParameter执行失败<br/>' + ex.message, 'fail');
        }

    },
    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function (isDisable)
    {
        try
        {

            if (isDisable)
            {
                $('#btn_command_delete_tbl_ld_cbreport_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_cbreport_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_cbreport_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_cbreport_list').removeClass('hidden');
            }
        }
        catch (ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }

    },



    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchBaseCode
    *  参数:callBackFunction
    *  初始化高级查询model用到Code内容，存储在_baseCodeHashMap中
    */
    initSearchBaseCode = function (callBackFunction)
    {

        var codeServiceId = '';

        codeServiceId += "0543^";

        codeServiceId += "0544^";

        codeServiceId += "0545^";

        codeServiceId += "0555^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {

                try
                {
                    _baseCodeHashMap = new hashMap();

                    var codenull = [];

                    _baseCodeHashMap.put('codeservice_0513', codenull);

                    _baseCodeHashMap.put('codeservice_0514', codenull);
                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    _baseCodeHashMap.put('codeservice_0543', resultArray['0543']);

                    _baseCodeHashMap.put('codeservice_0544', resultArray['0544']);

                    _baseCodeHashMap.put('codeservice_0545', resultArray['0545']);

                    _baseCodeHashMap.put('codeservice_yslx', resultArray['0555']);
                    var cbgx = [ { id: '1', text: '>' }, { id: '2', text: '>=' }, { id: '3', text: '<' }, { id: '4', text: '<=' }, { id: '5', text: '=' }];
                    _baseCodeHashMap.put('codeservice_cbgx', cbgx);
                    if (commonObj._jtsjflag)
                    {
                        var columnsArray = [
                            { "id": "f_cb_cbbh", "text": "抄表编号" },
                            { "id": "f_khbh", "text": "客户编号" },
                            { "id": "f_sqzm", "text": " 上期止码" },
                            { "id": "f_bqzm", "text": " 本期止码" },
                            { "id": "f_bqsl", "text": " 本期水量" },
                            { "id": "f_sqsl", "text": "上期水量" },
                            { "id": "f_qsqpjsl", "text": "前三期平均水量" },
                            { "id": "f_qlqpjsl", "text": "前六期平均水量" },
                            { "id": "f_cbyname", "text": "抄表员" },
                            { "id": "f_cbsj", "text": "抄表时间" },
                            { "id": "f_bk", "text": "表况" },
                            { "id": "f_zt", "text": "状态" },
                            { "id": "f_ly", "text": "来源" },
                            { "id": "f_bz", "text": "备注" },
                            { "id": "f_sbbh", "text": "水表编号" },
                            { "id": "f_sblx", "text": "水表类型" },
                            { "id": "f_yslx", "text": "用水类型" },
                            { "id": "f_lxtkhh", "text": "老系统客户号" },
                            { "id": "f_cbbh", "text": "抄本编号" },
                            { "id": "f_cbmc", "text": "抄本名称" },
                            { "id": "f_yhbh", "text": "用户编号" },
                            { "id": "f_yhm", "text": "用户名" },
                            { "id": "f_jfm", "text": "缴费名" },
                            { "id": "f_dh", "text": "电话" },
                            { "id": "f_dz", "text": "地址" },
                            { "id": "f_dy", "text": "地域" },
                            { "id": "f_sc", "text": "水厂" },
                            { "id": "f_qy", "text": "区域" },
                            { "id": "f_pq", "text": "片区" },
                            { "id": "f_pgbh", "text": "评估编号" },
                            { "id": "f_pgr", "text": "评估人" },
                            { "id": "f_pgpcmc", "text": "评估批次名称" },
                            { "id": "f_pgsj", "text": "评估时间" },
                            { "id": "f_jfbh", "text": "缴费编号" },
                            { "id": "f_jfsj", "text": "缴费时间" },
                            { "id": "f_bqje", "text": "本期金额" },
                            { "id": "f_kj", "text": "口径" },
                            { "id": "f_ztkhh", "text": "旧客户号" },
                            { "id": "f_ztsbh", "text": "旧水表号" },
                            { "id": "f_ztyhh", "text": "旧用户号" },
                            { "id": "f_rs", "text": "人数" },
                            { "id": "f_khfz", "text": "客户分组" },
                            { "id": "f_sf", "text": " 水费" },
                            { "id": "f_pwf", "text": "污水处理费" },
                            { "id": "f_sjljsyl", "text": "年累计购量" },
                            { "id": "f_jmje", "text": "减免金额" },
                            { "id": "f_jmbh", "text": "减免编号" },
                            { "id": "f_sfsfts", "text": "是否算费提示" },
                            { "id": "f_sfjl", "text": "算法记录" },
                            { "id": "f_dyjtsl", "text": "第一阶梯水量" },
                            { "id": "f_dyjtsf", "text": "第一阶梯水费" },
                            { "id": "f_dejtsl", "text": "第二阶梯水量" },
                            { "id": "f_dejtsf", "text": "第二阶梯水费" },
                            { "id": "f_dsjtsl", "text": "第三阶梯水量" },
                            { "id": "f_dsjtsf", "text": "第三阶梯水费" }
                        ]
                    }
                    else
                    {
                        var columnsArray = [
                            { "id": "f_cb_cbbh", "text": "抄表编号" },
                            { "id": "f_khbh", "text": "客户编号" },
                            { "id": "f_sqzm", "text": " 上期止码" },
                            { "id": "f_bqzm", "text": " 本期止码" },
                            { "id": "f_bqsl", "text": " 本期水量" },
                            { "id": "f_sqsl", "text": "上期水量" },
                            { "id": "f_qsqpjsl", "text": "前三期平均水量" },
                            { "id": "f_qlqpjsl", "text": "前六期平均水量" },
                            { "id": "f_cbyname", "text": "抄表员" },
                            { "id": "f_cbsj", "text": "抄表时间" },
                            { "id": "f_bk", "text": "表况" },
                            { "id": "f_zt", "text": "状态" },
                            { "id": "f_ly", "text": "来源" },
                            { "id": "f_bz", "text": "备注" },
                            { "id": "f_sbbh", "text": "水表编号" },
                            { "id": "f_sblx", "text": "水表类型" },
                            { "id": "f_yslx", "text": "用水类型" },
                            { "id": "f_lxtkhh", "text": "老系统客户号" },
                            { "id": "f_cbbh", "text": "抄本编号" },
                            { "id": "f_cbmc", "text": "抄本名称" },
                            { "id": "f_yhbh", "text": "用户编号" },
                            { "id": "f_yhm", "text": "用户名" },
                            { "id": "f_jfm", "text": "缴费名" },
                            { "id": "f_dh", "text": "电话" },
                            { "id": "f_dz", "text": "地址" },
                            { "id": "f_dy", "text": "地域" },
                            { "id": "f_sc", "text": "水厂" },
                            { "id": "f_qy", "text": "区域" },
                            { "id": "f_pq", "text": "片区" },
                            { "id": "f_pgbh", "text": "评估编号" },
                            { "id": "f_pgr", "text": "评估人" },
                            { "id": "f_pgpcmc", "text": "评估批次名称" },
                            { "id": "f_pgsj", "text": "评估时间" },
                            { "id": "f_jfbh", "text": "缴费编号" },
                            { "id": "f_jfsj", "text": "缴费时间" },
                            { "id": "f_bqje", "text": "本期金额" },
                            { "id": "f_kj", "text": "口径" },
                            { "id": "f_ztkhh", "text": "旧客户号" },
                            { "id": "f_ztsbh", "text": "旧水表号" },
                            { "id": "f_ztyhh", "text": "旧用户号" },
                            { "id": "f_rs", "text": "人数" },
                            { "id": "f_khfz", "text": "客户分组" },
                            { "id": "f_sf", "text": " 水费" },
                            { "id": "f_pwf", "text": "污水处理费" },
                            { "id": "f_sjljsyl", "text": "年累计购量" },
                            { "id": "f_jmje", "text": "减免金额" },
                            { "id": "f_jmbh", "text": "减免编号" },
                            { "id": "f_sfsfts", "text": "是否算费提示" },
                            { "id": "f_sfjl", "text": "算法记录" }
                            ]
                    }

                    var jtsjArray = [
                        { "id": "1", "text": "显示第一阶梯" },
                        { "id": "2", "text": "显示第二阶梯" },
                        { "id": "3", "text": "显示第三阶梯" }
                    ]
                    _baseCodeHashMap.put('codeservice_cbiao', columnsArray);
                    _baseCodeHashMap.put('codeservice_jtsj', jtsjArray);
                    var sqlJson = {
                         //"tbl_ldbm_yhfz": "select sys_id as id, f_fzbm||'_'||f_fzmc as text from tbl_ldbm_yhfz where sys_delflag='0' and f_ztid='0' order by sys_id",
                        //"tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and length(sys_orderid)=4 order by sys_orderid",
                        "cby": 'select u.u_id as id,u.u_name as text from t_user u ,t_userrole_relation r where u.u_id = r.u_id and r.r_id=\'2019\'',
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_sbfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                        "tbl_ld_cbbh": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',
                        "cbtime": 'select distinct(f_time) as id,(select distinct(f_time) from tbl_ld_cbiao) as text from TBL_LD_CBIAO_QF',
                    }
                    commonObj.querySqls(sqlJson, {

                        success: function (messageJson)
                        {
                            $.each(messageJson["tbl_ldbm_khfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["tbl_ldbm_yhfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_yhfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["tbl_ldbm_sbfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_sbfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_sbfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_sbfz"][i]["disabled"] = false;
                                }
                            });
                            // _baseCodeHashMap.put('codeservice_0511', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_0512', messageJson["tbl_ldbm_dycq"]);
                            _baseCodeHashMap.put('servicecode_cby', messageJson['cby']);
                            _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_yhfz', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_sbfz', messageJson["tbl_ldbm_sbfz"]);
                            _baseCodeHashMap.put('codeservice_cbbh', messageJson["tbl_ld_cbbh"]);
                            _baseCodeHashMap.put('codeservice_time', messageJson["cbtime"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('querySqls<br/>' + message, 'fail');
                        }
                    })





                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败。<br/>' + ex.message, 'fail');
                }
            }
        });
    },

    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化高级查询model控件，会用到_baseCodeHashMap
    */
    initSearchControl = function (callBackFunction)
    {
        try
        {
            var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');
            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');
            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');

            var codeService_0543 = _baseCodeHashMap.get('codeservice_0543');

            var codeService_0544 = _baseCodeHashMap.get('codeservice_0544');

            var codeService_0545 = _baseCodeHashMap.get('codeservice_0545');
            var codeService_cby = _baseCodeHashMap.get('servicecode_cby');
            var codeservice_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeservice_yhfz = _baseCodeHashMap.get('codeservice_yhfz');
            var codeservice_sbfz = _baseCodeHashMap.get('codeservice_sbfz');
            var codeservice_cbbh = _baseCodeHashMap.get('codeservice_cbbh');
            var codeservice_cbgx = _baseCodeHashMap.get('codeservice_cbgx');
            var codeservice_yslx = _baseCodeHashMap.get('codeservice_yslx');

            var codeservice_time = _baseCodeHashMap.get('codeservice_time');

            var codeservice_jtsj = _baseCodeHashMap.get('codeservice_jtsj');
            controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_cbreport_list', codeservice_cbbh);
            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_cbreport_list', codeservice_khfz);
            controlObj.multidropdownlistinit('search_f_yhfz_tbl_ld_cbreport_list', codeservice_yhfz);
            controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_cbreport_list', codeservice_sbfz);

            controlObj.multidropdownlistinit('search_f_jtsj_tbl_ld_cbreport_list', codeservice_jtsj);

            controlObj.multidropdownlistinit('search_f_bk_tbl_ld_cbreport_list', codeService_0543);

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_cbreport_list', codeService_0544);

            controlObj.multidropdownlistinit('search_f_ly_tbl_ld_cbreport_list', codeService_0545);

            controlObj.multidropdownlistinit('search_f_cbyname_tbl_ld_cbreport_list', codeService_cby);

            controlObj.multidropdownlistinit('search_f_time_tbl_ld_cbreport_list', codeservice_time);

            controlObj.singledropdownlistinit('search_f_dy_tbl_ld_cbreport_list', codeService_0512, f_dy_onchange);
            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_cbreport_list', codeService_0513, f_sc_onchange);
            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_cbreport_list', codeService_0514, f_qy_onchange);
            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', codeService_0515, f_pq_onchange);
            controlObj.singledropdownlistinit('search_f_cbgx_tbl_ld_cbreport_list', codeservice_cbgx, null);
            controlObj.multidropdownlistinit('search_f_yslx_tbl_ld_cbreport_list', codeservice_yslx, null);
            controlObj.datetimeinit('search_f_pgsj_tbl_ld_cbreport_list_datefrom', 'search_f_pgsj_tbl_ld_cbreport_list_timefrom');
            controlObj.datetimeinit('search_f_pgsj_tbl_ld_cbreport_list_dateto', 'search_f_pgsj_tbl_ld_cbreport_list_timeto');

            controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_datefrom', 'search_f_pgsj_tbl_ld_cbreport_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_dateto', 'search_f_pgsj_tbl_ld_cbreport_list_timeto', '1900-01-01 00:00:00');

            controlObj.datetimeinit('search_f_jfsj_tbl_ld_cbreport_list_datefrom', 'search_f_jfsj_tbl_ld_cbreport_list_timefrom');
            controlObj.datetimeinit('search_f_jfsj_tbl_ld_cbreport_list_dateto', 'search_f_jfsj_tbl_ld_cbreport_list_timeto');

            controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_datefrom', 'search_f_jfsj_tbl_ld_cbreport_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_dateto', 'search_f_jfsj_tbl_ld_cbreport_list_timeto', '1900-01-01 00:00:00');


            //controlObj.datetimeinit('search_f_cbsj_tbl_ld_cbreport_list_datefrom', 'search_f_cbsj_tbl_ld_cbreport_list_timefrom');
            //controlObj.datetimeinit('search_f_cbsj_tbl_ld_cbreport_list_dateto', 'search_f_cbsj_tbl_ld_cbreport_list_timeto');

            //模态窗口
            $('#div_search_modal_tbl_ld_cbreport_list').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initSearchControl执行失败。<br/>' + ex.message, 'fail');
        }
    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置查询model的内容
    */
    setSearchModel = function (callBackFunction)
    {
        try
        {
            if (that._pr_searchhis == 'true')
            {
                $('#btn_command_his_tbl_ld_cbreport_list').removeClass('btn-default');
                $('#btn_command_his_tbl_ld_cbreport_list').addClass('btn-primary');

                $('#btn_command_his_tbl_ld_cbreport_list').text('含历史库数据');

            }
            else
            {
                $('#btn_command_his_tbl_ld_cbreport_list').addClass('btn-default');
                $('#btn_command_his_tbl_ld_cbreport_list').removeClass('btn-primary');
                $('#btn_command_his_tbl_ld_cbreport_list').text('不含历史库数据');
            }
            if (that._pr_searchtime != '')
            {
                controlObj.multidropdownlistid('search_f_time_tbl_ld_cbreport_list', that._pr_searchtime);

                $("#querymonth").html(that._pr_searchtime);
            }
            else
            {
                controlObj.multidropdownlistid('search_f_time_tbl_ld_cbreport_list', "");

                $("#querymonth").html("全部");
            }
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        //简单查询
                        $("#txt_command_search_tbl_ld_cbreport_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_cbreport_list = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_value10);

                        controlObj.text('search_f_cbbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cbbhid);

                        controlObj.text('search_f_khbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_khbh);

                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_khfzid);
                        controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_yhfzid);
                        controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sbfzid);
                        controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cbbhid);
                        controlObj.multidropdownlistid('search_f_jtsj_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jtsjid);
                        controlObj.text('search_f_sf_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sf);
                        controlObj.text('search_f_pwf_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pwf);
                        controlObj.text('search_f_sjljsyl_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sjljsyl);
                        controlObj.text('search_f_jmje_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jmje);
                        controlObj.text('search_f_jmbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jmbh);
                        controlObj.text('search_f_jmbhid_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jmbhid);
                        controlObj.text('search_f_sfsfts_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sfsfts);
                        controlObj.text('search_f_sqzm_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sqzm);

                        controlObj.text('search_f_bqzm_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_bqzm);

                        controlObj.text('search_f_bqsl_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_bqsl);

                        controlObj.text('search_f_sqsl_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sqsl);

                        controlObj.text('search_f_qsqpjsl_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_qsqpjsl);

                        controlObj.text('search_f_qlqpjsl_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_qlqpjsl);

                        controlObj.multidropdownlistid('search_f_cbyname_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cbyid);


                        controlObj.multidropdownlistid('search_f_bk_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_bkid);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_ztid);

                        controlObj.multidropdownlistid('search_f_ly_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_lyid);

                        controlObj.text('search_f_bz_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_bz);

                        controlObj.text('search_f_yhm_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_yhm);

                        controlObj.text('search_f_jfm_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jfm);
                        controlObj.singledropdownlistid('search_f_dy_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_dyid);

                        controlObj.singledropdownlistid('search_f_cbgx_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cbgxid);
                        controlObj.multidropdownlistid('search_f_yslx_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_yslxid);
                        controlObj.text('search_f_dz_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_dz);

                        var dy = { "added": { "id": tbl_ld_cbreport_list.f_dyid } };
                        var sc = { "added": { "id": tbl_ld_cbreport_list.f_scid } };
                        var qy = { "added": { "id": tbl_ld_cbreport_list.f_qyid } };
                        //// 
                        f_dy_onchange(dy, {

                            success: function ()
                            {
                                controlObj.singledropdownlistid('search_f_sc_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_scid);
                                f_sc_onchange(sc, {
                                    success: function ()
                                    {
                                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_qyid);
                                        f_qy_onchange(qy, {
                                            success: function ()
                                            {
                                                controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pqid);
                                            }
                                        });
                                    }

                                });
                            }
                        });

                        controlObj.text('search_f_lxtkhh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_lxtkhh);

                        controlObj.text('search_f_pgbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pgbh);

                        controlObj.text('search_f_pgbhid_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pgbhid);

                        controlObj.text('search_f_pgr_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pgr);

                        controlObj.text('search_f_pgrid_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pgrid);

                        controlObj.text('search_f_pgpcmc_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_pgpcmc);


                        controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_datefrom', 'search_f_pgsj_tbl_ld_cbreport_list_timefrom', tbl_ld_cbreport_list.f_pgsjfrom);
                        controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_dateto', 'search_f_pgsj_tbl_ld_cbreport_list_timeto', tbl_ld_cbreport_list.f_pgsjto);

                        controlObj.text('search_f_jfbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jfbh);

                        controlObj.text('search_f_jfbhid_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_jfbhid);


                        controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_datefrom', 'search_f_jfsj_tbl_ld_cbreport_list_timefrom', tbl_ld_cbreport_list.f_jfsjfrom);
                        controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_dateto', 'search_f_jfsj_tbl_ld_cbreport_list_timeto', tbl_ld_cbreport_list.f_jfsjto);

                        controlObj.text('search_f_bqje_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_bqje);

                        controlObj.text('search_f_sbbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sbbh);

                        controlObj.text('search_f_sblx_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_sblx);

                        controlObj.text('search_f_yslx_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_yslx);

                        controlObj.text('search_f_cbbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cbbh);

                        controlObj.text('search_f_cbmc_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cbmc);

                        controlObj.text('search_f_cb_cbbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_cb_cbbh);

                        controlObj.text('search_f_yhbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_yhbh);

                        controlObj.text('search_f_yhbhid_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_yhbhid);

                        controlObj.text('search_f_kj_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_kj);
                        controlObj.text('search_f_kjid_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_kjid);
                        controlObj.text('search_f_ztkhh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_ztkhh);
                        controlObj.text('search_f_ztsbh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_ztsbh);
                        controlObj.text('search_f_ztyhh_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_ztyhh);
                        controlObj.text('search_f_rs_tbl_ld_cbreport_list', tbl_ld_cbreport_list.f_rs);


                    }
                    break;
            }
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败<br/>' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {
        try
        {
            debugger
            if ($('#btn_command_his_tbl_ld_cbreport_list').hasClass('btn-default'))
            {
                that._pr_searchhis = 'false';
            }
            else
            {
                that._pr_searchhis = 'true';
            }

            that._pr_searchtime = controlObj.multidropdownlistid('search_f_time_tbl_ld_cbreport_list');               

            $("#querymonth").html(that._pr_searchtime);
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_cbreport_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_cbreport_list = new Object();


                    tbl_ld_cbreport_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_cbbhid = controlObj.text('search_f_cbbhid_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_cbreport_list');

                    tbl_ld_cbreport_list.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_cbbh = controlObj.multidropdownlist('search_f_cbbh_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_khfz = controlObj.multidropdownlist('search_f_khfz_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_yhfz = controlObj.multidropdownlist('search_f_yhfz_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_yhfzid = controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_sbfz = controlObj.multidropdownlist('search_f_sbfz_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_sf = controlObj.text('search_f_sf_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_pwf = controlObj.text('search_f_pwf_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_sjljsyl = controlObj.text('search_f_sjljsyl_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_jmje = controlObj.text('search_f_jmje_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_jmbh = controlObj.text('search_f_jmbh_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_jmbhid = controlObj.text('search_f_jmbhid_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_sfsfts = controlObj.text('search_f_sfsfts_tbl_ld_cbreport_list');

                    tbl_ld_cbreport_list.f_sqzm = controlObj.text('search_f_sqzm_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_bqzm = controlObj.text('search_f_bqzm_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_bqsl = controlObj.text('search_f_bqsl_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_sqsl = controlObj.text('search_f_sqsl_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_qsqpjsl = controlObj.text('search_f_qsqpjsl_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_qlqpjsl = controlObj.text('search_f_qlqpjsl_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_cbyid = controlObj.multidropdownlistid('search_f_cbyname_tbl_ld_cbreport_list');



                    tbl_ld_cbreport_list.f_bkid = controlObj.multidropdownlistid('search_f_bk_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_lyid = controlObj.multidropdownlistid('search_f_ly_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_bz = controlObj.text('search_f_bz_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_dy = controlObj.singledropdownlist('search_f_dy_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_sc = controlObj.singledropdownlist('search_f_sc_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_qy = controlObj.singledropdownlist('search_f_qy_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pq = controlObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_lxtkhh = controlObj.text('search_f_lxtkhh_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pgbh = controlObj.text('search_f_pgbh_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pgbhid = controlObj.text('search_f_pgbhid_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pgr = controlObj.text('search_f_pgr_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pgrid = controlObj.text('search_f_pgrid_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pgpcmc = controlObj.text('search_f_pgpcmc_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_pgsjfrom = controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_datefrom', 'search_f_pgsj_tbl_ld_cbreport_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_cbreport_list.f_pgsjto = controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_dateto', 'search_f_pgsj_tbl_ld_cbreport_list_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_cbreport_list.f_jfbh = controlObj.text('search_f_jfbh_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_jfbhid = controlObj.text('search_f_jfbhid_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_jfsjfrom = controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_datefrom', 'search_f_jfsj_tbl_ld_cbreport_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_cbreport_list.f_jfsjto = controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_dateto', 'search_f_jfsj_tbl_ld_cbreport_list_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_cbreport_list.f_bqje = controlObj.text('search_f_bqje_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_sblx = controlObj.text('search_f_sblx_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_cbreport_list');




                    tbl_ld_cbreport_list.f_cbmc = controlObj.text('search_f_cbmc_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_cb_cbbh = controlObj.text('search_f_cb_cbbh_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_cbreport_list');


                    tbl_ld_cbreport_list.f_kj = controlObj.text('search_f_kj_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_kjid = controlObj.text('search_f_kjid_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_ztkhh = controlObj.text('search_f_ztkhh_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_ztsbh = controlObj.text('search_f_ztsbh_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_ztyhh = controlObj.text('search_f_ztyhh_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_rs = controlObj.text('search_f_rs_tbl_ld_cbreport_list');

                    tbl_ld_cbreport_list.f_cbgxid = controlObj.singledropdownlistid('search_f_cbgx_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_yslxid = controlObj.multidropdownlistid('search_f_yslx_tbl_ld_cbreport_list');

                    tbl_ld_cbreport_list.f_cbsl = controlObj.text('search_f_cbsl_tbl_ld_cbreport_list');
                    tbl_ld_cbreport_list.f_dz = controlObj.text('search_f_dz_tbl_ld_cbreport_list');

                    tbl_ld_cbreport_list.f_jtsjid = controlObj.multidropdownlistid('search_f_jtsj_tbl_ld_cbreport_list');
                    that._pr_searchcontent.type2 = tbl_ld_cbreport_list;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }


    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  针对_pr_searchcontent.type2进行验证
    */
    checkSearchModel = function (callBackFunction)
    {
        try
        {
            if (that._pr_searchtype == '2')
            {
                var tbl_ld_cbreport_list = that._pr_searchcontent.type2;
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();




                if (tbl_ld_cbreport_list.f_value1.length > 200)
                {
                    errorMessageHansMap.put('search_f_value1_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value2.length > 200)
                {
                    errorMessageHansMap.put('search_f_value2_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value3.length > 200)
                {
                    errorMessageHansMap.put('search_f_value3_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value4.length > 200)
                {
                    errorMessageHansMap.put('search_f_value4_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value5.length > 200)
                {
                    errorMessageHansMap.put('search_f_value5_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value6.length > 200)
                {
                    errorMessageHansMap.put('search_f_value6_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value7.length > 200)
                {
                    errorMessageHansMap.put('search_f_value7_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value8.length > 200)
                {
                    errorMessageHansMap.put('search_f_value8_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value9.length > 200)
                {
                    errorMessageHansMap.put('search_f_value9_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_value10.length > 200)
                {
                    errorMessageHansMap.put('search_f_value10_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_cbbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbbhid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_sbbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_sbbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }



                if (tbl_ld_cbreport_list.f_khbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_khbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_khfz.length > 200)
                {
                    errorMessageHansMap.put('search_f_khfz_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_yhfz.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhfz_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_sbfz.length > 200)
                {
                    errorMessageHansMap.put('search_f_sbfz_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_sf.length > 200)
                {
                    errorMessageHansMap.put('search_f_sf_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_pwf.length > 200)
                {
                    errorMessageHansMap.put('search_f_pwf_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_sjljsyl.length > 200)
                {
                    errorMessageHansMap.put('search_f_sjljsyl_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_jmje.length > 200)
                {
                    errorMessageHansMap.put('search_f_jmje_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_jmbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_jmbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_jmbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_jmbhid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_sfsfts.length > 200)
                {
                    errorMessageHansMap.put('search_f_sfsfts_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_sqzm.length > 200)
                {
                    errorMessageHansMap.put('search_f_sqzm_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_sqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbreport_list.f_sqzm))
                {
                    errorMessageHansMap.put('search_f_sqzm_tbl_ld_cbreport_list', '必须是数字');
                }




                if (tbl_ld_cbreport_list.f_bqzm.length > 200)
                {
                    errorMessageHansMap.put('search_f_bqzm_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_bqsl.length > 200)
                {
                    errorMessageHansMap.put('search_f_bqsl_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_bqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbreport_list.f_bqsl))
                {
                    errorMessageHansMap.put('search_f_bqsl_tbl_ld_cbreport_list', '必须是数字');
                }




                if (tbl_ld_cbreport_list.f_sqsl.length > 200)
                {
                    errorMessageHansMap.put('search_f_sqsl_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_qsqpjsl.length > 200)
                {
                    errorMessageHansMap.put('search_f_qsqpjsl_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_qlqpjsl.length > 200)
                {
                    errorMessageHansMap.put('search_f_qlqpjsl_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_cbyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbyname_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_bkid.length > 200)
                {
                    errorMessageHansMap.put('search_f_bk_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_ztid.length > 200)
                {
                    errorMessageHansMap.put('search_f_zt_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_lyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_ly_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_bz.length > 200)
                {
                    errorMessageHansMap.put('search_f_bz_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_yhm.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhm_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_jfm.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfm_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_dy.length > 200)
                {
                    errorMessageHansMap.put('search_f_dy_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_sc.length > 200)
                {
                    errorMessageHansMap.put('search_f_sc_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_qy.length > 200)
                {
                    errorMessageHansMap.put('search_f_qy_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_pq.length > 200)
                {
                    errorMessageHansMap.put('search_f_pq_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_lxtkhh.length > 200)
                {
                    errorMessageHansMap.put('search_f_lxtkhh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_pgbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_pgbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_pgbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_pgbhid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_pgr.length > 200)
                {
                    errorMessageHansMap.put('search_f_pgr_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_pgrid.length > 200)
                {
                    errorMessageHansMap.put('search_f_pgrid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_pgpcmc.length > 200)
                {
                    errorMessageHansMap.put('search_f_pgpcmc_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }







                if (tbl_ld_cbreport_list.f_jfbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_jfbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfbhid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_kj.length > 200)
                {
                    errorMessageHansMap.put('search_f_kj_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_kjid.length > 200)
                {
                    errorMessageHansMap.put('search_f_kjid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_ztkhh.length > 200)
                {
                    errorMessageHansMap.put('search_f_ztkhh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_ztsbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_ztsbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_ztyhh.length > 200)
                {
                    errorMessageHansMap.put('search_f_ztyhh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_cbreport_list.f_rs.length > 200)
                {
                    errorMessageHansMap.put('search_f_rs_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }







                if (tbl_ld_cbreport_list.f_bqje.length > 200)
                {
                    errorMessageHansMap.put('search_f_bqje_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }













                if (tbl_ld_cbreport_list.f_cbbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_cbmc.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbmc_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_cb_cbbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_cb_cbbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_cbreport_list.f_dz.length > 200)
                {
                    errorMessageHansMap.put('search_f_dz_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_yhbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhbh_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_cbreport_list.f_yhbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhbhid_tbl_ld_cbreport_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_cbreport_list.f_cbgxid.length == 0
               && tbl_ld_cbreport_list.f_cbsl.length == 0)
                {

                }
                else if (
                     tbl_ld_cbreport_list.f_cbgxid.length != 0
                    && tbl_ld_cbreport_list.f_cbsl.length != 0)
                {
                    if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbreport_list.f_cbsl))
                    {
                        errorMessageHansMap.put('search_f_cbsl_tbl_ld_cbreport_list', '必须填写数字');
                    }
                }
                else
                {
                   
                    if (tbl_ld_cbreport_list.f_cbgxid.length == 0 )
                    {
                        errorMessageHansMap.put('search_f_cbgx_tbl_ld_cbreport_list', '不能为空');
                    }
                    if (tbl_ld_cbreport_list.f_cbsl.length == 0)
                    {
                        errorMessageHansMap.put('search_f_cbsl_tbl_ld_cbreport_list', '不能为空');
                    }

                    if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbreport_list.f_cbsl))
                    {
                        errorMessageHansMap.put('search_f_cbsl_tbl_ld_cbreport_list', '必须填写数字');
                    }
                }

                if (errorMessageHansMap.keys().length > 0)
                {
                    _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail('');
                }
                else
                {
                    _validateMessage.hidden();
                    callBackFunction.success();
                }
            }
            else
            {
                _validateMessage_searchtime.hidden();
                callBackFunction.success();
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }

    },

    /* 
    *  
    *  方法:clearSearchModel
    *  参数:callBackFunction
    *  清空_pr_searchtype和searchModel
    */
    clearSearchModel = function ()
    {


        switch (that._pr_searchtype)
        {
            case "1":
                if (that._pr_searchcontent.type2 == undefined)
                {
                    that._pr_searchcontent.type2 = new Object();
                }

                that._pr_searchcontent.type2.f_value1 = '';
                controlObj.text('search_f_value1_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cbbhid);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_khfzid);
                that._pr_searchcontent.type2.f_yhfzid = '';
                controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_yhfzid);
                that._pr_searchcontent.type2.f_sbfzid = '';
                controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sbfzid);
                that._pr_searchcontent.type2.f_sf = '';
                controlObj.text('search_f_sf_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sf);
                that._pr_searchcontent.type2.f_pwf = '';
                controlObj.text('search_f_pwf_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pwf);
                that._pr_searchcontent.type2.f_sjljsyl = '';
                controlObj.text('search_f_sjljsyl_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sjljsyl);
                that._pr_searchcontent.type2.f_jmje = '';
                controlObj.text('search_f_jmje_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jmje);
                that._pr_searchcontent.type2.f_jmbh = '';
                controlObj.text('search_f_jmbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jmbh);
                that._pr_searchcontent.type2.f_jmbhid = '';
                controlObj.text('search_f_jmbhid_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jmbhid);
                that._pr_searchcontent.type2.f_sfsfts = '';
                controlObj.text('search_f_sfsfts_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sfsfts);
                that._pr_searchcontent.type2.f_sqzm = '';
                controlObj.text('search_f_sqzm_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sqzm);


                that._pr_searchcontent.type2.f_bqzm = '';
                controlObj.text('search_f_bqzm_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_bqzm);


                that._pr_searchcontent.type2.f_bqsl = '';
                controlObj.text('search_f_bqsl_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_bqsl);


                that._pr_searchcontent.type2.f_sqsl = '';
                controlObj.text('search_f_sqsl_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sqsl);


                that._pr_searchcontent.type2.f_qsqpjsl = '';
                controlObj.text('search_f_qsqpjsl_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_qsqpjsl);


                that._pr_searchcontent.type2.f_qlqpjsl = '';
                controlObj.text('search_f_qlqpjsl_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_qlqpjsl);


                that._pr_searchcontent.type2.f_cbyid = '';
                controlObj.multidropdownlistid('search_f_cbyname_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cbyid);



                that._pr_searchcontent.type2.f_bkid = '';
                controlObj.multidropdownlistid('search_f_bk_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_bkid);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.f_lyid = '';
                controlObj.multidropdownlistid('search_f_ly_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_lyid);

                that._pr_searchcontent.type2.f_jtsjid = '';
                controlObj.multidropdownlistid('search_f_jtsj_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jtsjid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_bz);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jfm);




                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.singledropdownlistid('search_f_dy_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_dyid);





                that._pr_searchcontent.type2.f_scid = '';
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_scid);




                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pqid);




                that._pr_searchcontent.type2.f_lxtkhh = '';
                controlObj.text('search_f_lxtkhh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_lxtkhh);


                that._pr_searchcontent.type2.f_pgbh = '';
                controlObj.text('search_f_pgbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pgbh);


                that._pr_searchcontent.type2.f_pgbhid = '';
                controlObj.text('search_f_pgbhid_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pgbhid);


                that._pr_searchcontent.type2.f_pgr = '';
                controlObj.text('search_f_pgr_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pgr);


                that._pr_searchcontent.type2.f_pgrid = '';
                controlObj.text('search_f_pgrid_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pgrid);


                that._pr_searchcontent.type2.f_pgpcmc = '';
                controlObj.text('search_f_pgpcmc_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_pgpcmc);


                that._pr_searchcontent.type2.f_pgsjfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_pgsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_datefrom', 'search_f_pgsj_tbl_ld_cbreport_list_timefrom', that._pr_searchcontent.type2.f_pgsjfrom);
                controlObj.datetime('search_f_pgsj_tbl_ld_cbreport_list_dateto', 'search_f_pgsj_tbl_ld_cbreport_list_timeto', that._pr_searchcontent.type2.f_pgsjto);


                that._pr_searchcontent.type2.f_jfbh = '';
                controlObj.text('search_f_jfbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jfbh);


                that._pr_searchcontent.type2.f_jfbhid = '';
                controlObj.text('search_f_jfbhid_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_jfbhid);


                that._pr_searchcontent.type2.f_jfsjfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_jfsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_datefrom', 'search_f_jfsj_tbl_ld_cbreport_list_timefrom', that._pr_searchcontent.type2.f_jfsjfrom);
                controlObj.datetime('search_f_jfsj_tbl_ld_cbreport_list_dateto', 'search_f_jfsj_tbl_ld_cbreport_list_timeto', that._pr_searchcontent.type2.f_jfsjto);


                that._pr_searchcontent.type2.f_bqje = '';
                controlObj.text('search_f_bqje_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_bqje);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_sblx = '';
                controlObj.text('search_f_sblx_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_sblx);


                that._pr_searchcontent.type2.f_yslx = '';
                controlObj.text('search_f_yslx_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_yslx);


                that._pr_searchcontent.type2.f_cbbh = '';
                controlObj.text('search_f_cbbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cbbh);


                that._pr_searchcontent.type2.f_cbmc = '';
                controlObj.text('search_f_cbmc_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cbmc);


                that._pr_searchcontent.type2.f_cb_cbbh = '';
                controlObj.text('search_f_cb_cbbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cb_cbbh);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_yhbhid = '';
                controlObj.text('search_f_yhbhid_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_yhbhid);

                that._pr_searchcontent.type2.f_kj = '';
                controlObj.text('search_f_kj_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_kj);
                that._pr_searchcontent.type2.f_kjid = '';
                controlObj.text('search_f_kjid_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_kjid);
                that._pr_searchcontent.type2.f_ztkhh = '';
                controlObj.text('search_f_ztkhh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_ztkhh);
                that._pr_searchcontent.type2.f_ztsbh = '';
                controlObj.text('search_f_ztsbh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_ztsbh);
                that._pr_searchcontent.type2.f_ztyhh = '';
                controlObj.text('search_f_ztyhh_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_ztyhh);
                that._pr_searchcontent.type2.f_rs = '';
                controlObj.text('search_f_rs_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_rs);


                that._pr_searchcontent.type2.f_cbgxid = '';
                controlObj.singledropdownlistid('search_f_cbgx_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cbgxid);
                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.multidropdownlistid('search_f_yslx_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_yslxid);

                that._pr_searchcontent.type2.f_cbsl = '';
                controlObj.text('search_f_cbsl_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_cbsl);
                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_cbreport_list', that._pr_searchcontent.type2.f_dz);
                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_cbreport_list").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

     getArea = function (id, callbackFunction)
     {
         //// 
         var sqlString = '';
         sqlString += "select sys_id as id, f_mc as text ";
         sqlString += "from tbl_ldbm_dycq  ";
         sqlString += "where sys_delflag = '0' ";
         //sqlString += "and f_ztid = '0' ";
         sqlString += "and length(sys_orderid) =  ";
         sqlString += "    (select length(sys_orderid) + 4 from tbl_ldbm_dycq where sys_id = '" + id + "') ";
         sqlString += "and sys_orderid like ";
         sqlString += "    (select sys_orderid || '%' from tbl_ldbm_dycq where sys_id = '" + id + "') ";
         sqlString += "order by sys_orderid ";
         var sqlJson = {
             "tbl_ldbm_dycq": sqlString
         }
         commonObj.querySqls(sqlJson, {
             success: function (messageJson)
             {
                 callbackFunction.success(messageJson["tbl_ldbm_dycq"]);
             },
             fail: function (message)
             {
             }
         })
     },
    //地域onchange事件
      f_dy_onchange = function (e, callbackfunction)
      {
          // // 
          if (e.added != undefined)
          {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray)
                  {
                      controlObj.singledropdownlistinit('search_f_sc_tbl_ld_cbreport_list', jsonArray, f_sc_onchange);
                      controlObj.singledropdownlistid('search_f_sc_tbl_ld_cbreport_list', '-1');
                      // controlObj.singledropdownlist('search_f_sc_tbl_ld_cbreport_list', '');
                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                      else
                      {
                          controlObj.singledropdownlistinit('search_f_qy_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                          controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list', '-1');
                          // controlObj.singledropdownlist('search_f_qy_tbl_ld_cbreport_list', '');
                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list', '');
                      }
                  }
              })
          }
          else
          {
              controlObj.singledropdownlistinit('search_f_sc_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
              controlObj.singledropdownlistid('search_f_sc_tbl_ld_cbreport_list', '-1');
              //controlObj.singledropdownlist('search_f_sc_tbl_ld_cbreport_list', '');
              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list', '-1');
              // controlObj.singledropdownlist('search_f_qy_tbl_ld_cbreport_list', '');
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list', '');
          }
      },
    //水厂onchange事件
      f_sc_onchange = function (e, callbackfunction)
      {
          // // 
          if (e.added != undefined)
          {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray)
                  {
                      controlObj.singledropdownlistinit('search_f_qy_tbl_ld_cbreport_list', jsonArray, f_qy_onchange);
                      controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list', '-1');
                      //controlObj.singledropdownlist('search_f_qy_tbl_ld_cbreport_list', '');
                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                      else
                      {
                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list', '');
                      }
                  }
              })
          }
          else
          {

              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_cbreport_list', '-1');
              // controlObj.singledropdownlist('search_f_qy_tbl_ld_cbreport_list', '');

              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', '-1');
              //controlObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list', '');
          }


      },
      //区域onchange事件
      f_qy_onchange = function (e, callbackfunction)
      {
          // // 
          if (e.added != undefined)
          {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray)
                  {
                      controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', jsonArray, f_pq_onchange);
                      controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', '-1');
                      //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list', '');
                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                  }
              })
          }
          else
          {
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_cbreport_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_cbreport_list', '-1');
              //controlObj.singledropdownlist('search_f_pq_tbl_ld_cbreport_list', '');
          }
      },
      //片区onchange事件
       f_pq_onchange = function (e)
       {
           var controlid = e.target.id;
       },
    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {

        var whereClause = '';
        if (that._pr_searchtime != '')
        {
            whereClause += " f_time in ('" + that._pr_searchtime.replaceAll(',','\',\'') + "') and ";

        }
        else
        {

        }
        switch (that._pr_searchtype)
        {
            case "1":
                {

                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        var vv = that._pr_searchcontent.type1.split(' ');
                        if (vv.length > 0)
                        {
                            for (var i = 0; i < vv.length; i++)
                            {
                                if (vv[i] != '')
                                {
                                    whereClause += "(";

                                    whereClause += " f_cbbhid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                                    whereClause += " f_khfzid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sf like '%" + vv[i] + "%' or ";
                                    whereClause += " f_pwf like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sjljsyl like '%" + vv[i] + "%' or ";
                                    whereClause += " f_jmje like '%" + vv[i] + "%' or ";
                                    whereClause += " f_jmbh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_jmbhid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sfsfts like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qlqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbyname like '%" + vv[i] + "%' or ";



                                    whereClause += " f_bk like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ly like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_scid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgrid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgpcmc like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_pgsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfbhid like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_jfsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqje like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbmc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cb_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_kj like '%" + vv[i] + "%' or ";
                                    whereClause += " f_kjid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_ztkhh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_ztsbh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_ztyhh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_rs like '%" + vv[i] + "%' or ";

                                    if (whereClause.length > 0)
                                    {
                                        whereClause = whereClause.substr(0, whereClause.length - 3);
                                    }
                                    whereClause += ") and ";
                                }
                            }

                        }


                    }


                }
                break;
            case "2":
                {
                    if (that._pr_searchcontent.type2 != undefined)
                    {

                        var tbl_ld_cbreport_list = that._pr_searchcontent.type2;



                        //if (tbl_ld_cbreport_list.f_cbbhid.length > 0)
                        //{
                        //    whereClause += " f_cbbhid like '%" + tbl_ld_cbreport_list.f_cbbhid + "%' and ";
                        //}


                        if (tbl_ld_cbreport_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_cbreport_list.f_khbh + "%' and ";
                        }

                        if (tbl_ld_cbreport_list.f_khfzid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_khfzid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_khfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_cbreport_list.f_yhfzid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_yhfzid.split(',');
                            var aaa = '';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    aaa += ' ';
                                }
                                else
                                {
                                    aaa += ' or ';
                                }
                                aaa += "((','||f_yhfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            aaa = " f_khbhid in (select sys_id from tbl_ld_khb where " + aaa + ")";
                            whereClause += '(';
                            whereClause += aaa;
                            whereClause += ') and ';
                        }
                        debugger
                        if (tbl_ld_cbreport_list.f_jtsjid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_jtsjid.split(',');
                            var aaa = '';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    aaa += ' ';
                                }
                                else
                                {
                                    aaa += ' or ';
                                }
                                switch (elementArray[i])
                                {
                                    case "1":
                                        aaa += "(f_dyjtsl>0)"
                                        break;
                                    case "2":
                                        aaa += "(f_dejtsl>0)"
                                        break;
                                    case "3":
                                        aaa += "(f_dsjtsl>0)"
                                        break;
                                }
                               
                            });
                            whereClause += '(';
                            whereClause += aaa;
                            whereClause += ') and ';
                        }

                        if (tbl_ld_cbreport_list.f_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_sbfzid.split(',');
                            var aaa = '';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    aaa += ' ';
                                }
                                else
                                {
                                    aaa += ' or ';
                                }
                                aaa += "((','||f_sbfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                                aaa = " f_khbhid in (select sys_id from tbl_ld_khb where " + aaa + ")";
                                whereClause += '(';
                                whereClause += aaa;
                                whereClause += ') and ';
                            });
                        }
                        if (tbl_ld_cbreport_list.f_sf.length > 0)
                        {
                            whereClause += " f_sf like '%" + tbl_ld_cbreport_list.f_sf + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_pwf.length > 0)
                        {
                            whereClause += " f_pwf like '%" + tbl_ld_cbreport_list.f_pwf + "%' and ";
                        }

                        if (tbl_ld_cbreport_list.f_sjljsyl.length > 0)
                        {
                            whereClause += " f_sjljsyl like '%" + tbl_ld_cbreport_list.f_sjljsyl + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_jmje.length > 0)
                        {
                            whereClause += " f_jmje like '%" + tbl_ld_cbreport_list.f_jmje + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_jmbh.length > 0)
                        {
                            whereClause += " f_jmbh like '%" + tbl_ld_cbreport_list.f_jmbh + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_jmbhid.length > 0)
                        {
                            whereClause += " f_jmbhid like '%" + tbl_ld_cbreport_list.f_jmbhid + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_sfsfts.length > 0)
                        {
                            whereClause += " f_sfsfts like '%" + tbl_ld_cbreport_list.f_sfsfts + "%' and ";
                        }

                        if (tbl_ld_cbreport_list.f_sqzm.length > 0)
                        {
                            whereClause += " f_sqzm like '%" + tbl_ld_cbreport_list.f_sqzm + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_bqzm.length > 0)
                        {
                            whereClause += " f_bqzm like '%" + tbl_ld_cbreport_list.f_bqzm + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_bqsl.length > 0)
                        {
                            whereClause += " f_bqsl like '%" + tbl_ld_cbreport_list.f_bqsl + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_sqsl.length > 0)
                        {
                            whereClause += " f_sqsl like '%" + tbl_ld_cbreport_list.f_sqsl + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_qsqpjsl.length > 0)
                        {
                            whereClause += " f_qsqpjsl like '%" + tbl_ld_cbreport_list.f_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_qlqpjsl.length > 0)
                        {
                            whereClause += " f_qlqpjsl like '%" + tbl_ld_cbreport_list.f_qlqpjsl + "%' and ";
                        }



                        if (tbl_ld_cbreport_list.f_cbyid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_cbyid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_cbyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }





                        if (tbl_ld_cbreport_list.f_bkid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_bkid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_bkid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cbreport_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_ztid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_ztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cbreport_list.f_lyid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_lyid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_lyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cbreport_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_cbreport_list.f_bz + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_cbreport_list.f_yhm + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_cbreport_list.f_jfm + "%' and ";
                        }


                        //if (tbl_ld_cbreport_list.f_dy.length > 0) {
                        //    whereClause += " f_dy like '%" + tbl_ld_cbreport_list.f_dy + "%' and ";
                        //}


                        if (tbl_ld_cbreport_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid = '" + tbl_ld_cbreport_list.f_dyid + "' and ";
                        }


                        //if (tbl_ld_cbreport_list.f_sc.length > 0) {
                        //    whereClause += " f_sc like '%" + tbl_ld_cbreport_list.f_sc + "%' and ";
                        //}


                        if (tbl_ld_cbreport_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid = '" + tbl_ld_cbreport_list.f_scid + "' and ";
                        }


                        //if (tbl_ld_cbreport_list.f_qy.length > 0) {
                        //    whereClause += " f_qy like '%" + tbl_ld_cbreport_list.f_qy + "%' and ";
                        //}


                        if (tbl_ld_cbreport_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid = '" + tbl_ld_cbreport_list.f_qyid + "' and ";
                        }


                        //if (tbl_ld_cbreport_list.f_pq.length > 0) {
                        //    whereClause += " f_pq like '%" + tbl_ld_cbreport_list.f_pq + "%' and ";
                        //}


                        if (tbl_ld_cbreport_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid = '" + tbl_ld_cbreport_list.f_pqid + "' and ";
                        }


                        if (tbl_ld_cbreport_list.f_lxtkhh.length > 0)
                        {
                            whereClause += " f_lxtkhh like '%" + tbl_ld_cbreport_list.f_lxtkhh + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_pgbh.length > 0)
                        {
                            whereClause += " f_pgbh like '%" + tbl_ld_cbreport_list.f_pgbh + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_pgbhid.length > 0)
                        {
                            whereClause += " f_pgbhid like '%" + tbl_ld_cbreport_list.f_pgbhid + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_pgr.length > 0)
                        {
                            whereClause += " f_pgr like '%" + tbl_ld_cbreport_list.f_pgr + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_pgrid.length > 0)
                        {
                            whereClause += " f_pgrid like '%" + tbl_ld_cbreport_list.f_pgrid + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_pgpcmc.length > 0)
                        {
                            whereClause += " f_pgpcmc like '%" + tbl_ld_cbreport_list.f_pgpcmc + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_pgsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_pgsj >= to_date('" + tbl_ld_cbreport_list.f_pgsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_cbreport_list.f_pgsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_pgsj <= to_date('" + tbl_ld_cbreport_list.f_pgsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_cbreport_list.f_jfbh.length > 0)
                        {
                            whereClause += " f_jfbh like '%" + tbl_ld_cbreport_list.f_jfbh + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_jfbhid.length > 0)
                        {
                            whereClause += " f_jfbhid like '%" + tbl_ld_cbreport_list.f_jfbhid + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_jfsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_jfsj >= to_date('" + tbl_ld_cbreport_list.f_jfsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_cbreport_list.f_jfsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_jfsj <= to_date('" + tbl_ld_cbreport_list.f_jfsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_cbreport_list.f_bqje.length > 0)
                        {
                            whereClause += " f_bqje like '%" + tbl_ld_cbreport_list.f_bqje + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_cbreport_list.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_sblx.length > 0)
                        {
                            whereClause += " f_sblx like '%" + tbl_ld_cbreport_list.f_sblx + "%' and ";
                        }


                        //if (tbl_ld_cbreport_list.f_yslx.length > 0)
                        //{
                        //    whereClause += " f_yslx like '%" + tbl_ld_cbreport_list.f_yslx + "%' and ";
                        //}


                        if (tbl_ld_cbreport_list.f_cbbhid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_cbbhid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_cbbhid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_cbreport_list.f_cbmc.length > 0)
                        {
                            whereClause += " f_cbmc like '%" + tbl_ld_cbreport_list.f_cbmc + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_cb_cbbh.length > 0)
                        {
                            whereClause += " f_cb_cbbh like '%" + tbl_ld_cbreport_list.f_cb_cbbh + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_cbreport_list.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_yhbhid.length > 0)
                        {
                            whereClause += " f_yhbhid like '%" + tbl_ld_cbreport_list.f_yhbhid + "%' and ";
                        }


                        if (tbl_ld_cbreport_list.f_kj.length > 0)
                        {
                            whereClause += " f_kj like '%" + tbl_ld_cbreport_list.f_kj + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_kjid.length > 0)
                        {
                            whereClause += " f_kjid like '%" + tbl_ld_cbreport_list.f_kjid + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_ztkhh.length > 0)
                        {
                            whereClause += " f_ztkhh like '%" + tbl_ld_cbreport_list.f_ztkhh + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_ztsbh.length > 0)
                        {
                            whereClause += " f_ztsbh like '%" + tbl_ld_cbreport_list.f_ztsbh + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_ztyhh.length > 0)
                        {
                            whereClause += " f_ztyhh like '%" + tbl_ld_cbreport_list.f_ztyhh + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_rs.length > 0)
                        {
                            whereClause += " f_rs like '%" + tbl_ld_cbreport_list.f_rs + "%' and ";
                        }
                        if (tbl_ld_cbreport_list.f_cbgxid.length != 0 && tbl_ld_cbreport_list.f_cbsl.length != 0)
                        {
                            whereClause += " f_bqsl  ";
                            switch (tbl_ld_cbreport_list.f_cbgxid)
                            {
                                case "1":
                                    whereClause += ">";
                                    break;
                                case "2":
                                    whereClause += ">=";
                                    break;
                                case "3":
                                    whereClause += "<";
                                    break;
                                case "4":
                                    whereClause += "<=";
                                    break;
                                case "5":
                                    whereClause += "=";
                                    break;
                            }
                            whereClause += " " + tbl_ld_cbreport_list.f_cbsl + "";
                            whereClause += " and ";
                        }
                      
                        if (tbl_ld_cbreport_list.f_yslxid.length > 0)
                        {
                            var elementArray = tbl_ld_cbreport_list.f_yslxid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_yslxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }

                        if (tbl_ld_cbreport_list.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_cbreport_list.f_dz + "%' and ";
                        }

                    }
                    break;
                }

        }
        if (whereClause.length > 0)
        {
            whereClause = whereClause.substr(0, whereClause.length - 4);
        }

        _whereClauseString = whereClause;
        callBackFunction.success();
    },
    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
        if (that._pr_gridselectids == '')
        {
            $('#btn_command_clearselect_tbl_ld_cbreport_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_cbreport_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_cbreport_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_cbreport_list .cc-badge-p').html(currentcount + '/' + allcount);

        }
    },
    /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function (callBackFunction)
    {
        try
        {

            //根据页面情况设置Grid的高度


            var columnsarray = [
                {
                 field: 'sys_id', title: 'sys_id',
                    align: 'center',
                 "class": 'hidden',
                    valign: 'middle',
                    visible: true,
                    sortable: false,



                    }
            ];

            var columnHashMap = new hashMap();
            columnHashMap.put('f_cb_cbbh', {
                field: 'f_cb_cbbh',
                title: "抄表编号",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });

            columnHashMap.put('f_khbh', {

                field: 'f_khbh',
                title: "客户编号",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });            
            columnHashMap.put('f_sqzm', {

                field: 'f_sqzm',
                title: "上期止码",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_bqzm', {

                field: 'f_bqzm',
                title: "本期止码",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_bqsl', {

                field: 'f_bqsl',
                title: "本期水量",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_sqsl', {

                field: 'f_sqsl',
                title: "上期水量",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_qsqpjsl', {

                field: 'f_qsqpjsl',
                title: "前三期平均水量",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_qlqpjsl', {

                field: 'f_qlqpjsl',
                title: "前六期平均水量",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_cbyname', {

                field: 'f_cbyname',
                title: "抄表员",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_cbsj', {

                field: 'f_cbsj',
                title: "抄表时间",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                    if (value == "")
                    {
                        value = "1900-01-01 00:00:00";
                    }
                    var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                    if (resultStr == '1900-01-01 00:00:00')
                    {
                        resultStr = "&nbsp;&nbsp;";
                    }

                        return resultStr;
                    }
            });
            columnHashMap.put('f_bk', {

                field: 'f_bk',
                title: "表况",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_zt', {

                field: 'f_zt',
                title: "状态",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_ly', {

                field: 'f_ly',
                title: "来源",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_bz', {

                field: 'f_bz',
                title: "备注",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_sbbh', {

                field: 'f_sbbh',
                title: "水表编号",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_sblx', {
                field: 'f_sblx',
                title: "水表类型",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_yslx', {

                field: 'f_yslx',
                title: "用水类型",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_lxtkhh', {
                field: 'f_lxtkhh',
                title: "老系统客户号",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_cbbh', {

                field: 'f_cbbh',
                title: "抄本编号",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_cbmc', {
                field: 'f_cbmc',
                title: "抄本名称",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_yhbh', {
                    field: 'f_yhbh',
                title: "用户编号",
                                    "class": '',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;
                                        return resultStr;
                                    }
            });
            columnHashMap.put('f_yhm', {
                                    field: 'f_yhm',
                title: "用户名",
                                    "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;


                                        return resultStr;
                                    }
            });
            columnHashMap.put('f_jfm', {

                    field: 'f_jfm',
                title: "缴费名",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


                        return resultStr;
                    }
            });
            columnHashMap.put('f_dh', {

                    field: 'f_dh',
                title: "电话",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_dz', {

                    field: 'f_dz',
                title: "地址",
                    "class": '',



                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_dy', {
                field: 'f_dy',
                title: "地域",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_sc', {
                field: 'f_sc',
                title: "水厂",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_qy', {

                field: 'f_qy',
                title: "区域",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_pq', {
                field: 'f_pq',
                title: "片区",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_pgbh', {

                field: 'f_pgbh',
                title: "评估编号",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_pgr', {
                field: 'f_pgr',
                title: "评估人",
                             "class": '',
                             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                             formatter: function (value, row, index)
                             {
                                 var resultStr = value;
                                 return resultStr;
                             }
            });
            columnHashMap.put('f_pgpcmc', {
                field: 'f_pgpcmc',
                title: "评估批次名称",



                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_pgsj', {

                field: 'f_pgsj',
                title: "评估时间",
     "class": '',
     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                {
                    if (value == "")
                    {
                        value = "1900-01-01 00:00:00";
                    }
                    var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                    if (resultStr == '1900-01-01 00:00:00')
                    {
                        resultStr = "&nbsp;&nbsp;";
                    }
                        return resultStr;
                    }
            });
            columnHashMap.put('f_jfbh', {

                field: 'f_jfbh',
                title: "缴费编号",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_jfsj', {
                field: 'f_jfsj',
                title: "缴费时间",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                {
                    if (value == "")
                    {
                        value = "1900-01-01 00:00:00";
                    }
                    var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                    if (resultStr == '1900-01-01 00:00:00')
                {
                        resultStr = "&nbsp;&nbsp;";
                    }

                        return resultStr;
                    }
            });
            columnHashMap.put('f_bqje', {

                field: 'f_bqje',
                title: "本期金额",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {

                        if (row.f_ztid == '1')
                        {                       
                            return row.f_value1;
                        }
                        else
                        {
                            var resultStr = value;

                            return resultStr;
                        }
                    }
            });
            columnHashMap.put('f_kj', {

                field: 'f_kj',
                title: "口径",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
            });
            columnHashMap.put('f_ztkhh', {
                field: 'f_ztkhh',
                title: "旧客户号",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_ztsbh', {

                field: 'f_ztsbh',
                title: "旧水表号",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
            });
            columnHashMap.put('f_ztyhh', {

                field: 'f_ztyhh',
                title: "旧用户号",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;




                        return resultStr;
                    }
            });
            columnHashMap.put('f_rs', {




                field: 'f_rs',
                title: "人数",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


                        return resultStr;
                    }
            });
            columnHashMap.put('f_khfz', {

                field: 'f_khfz',
                title: "客户分组",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


                        return resultStr;
                    }
            });
            columnHashMap.put('f_sf', {

                field: 'f_sf',
                title: "水费",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (row.f_ztid == '1')
                        {
                            var sfstr = row.f_value2.split('|')[0];
                            var resultStr = sfstr.split('^')[0];
                            return resultStr;
                        }
                        else
                        {
                            var resultStr = value;

                            return resultStr;
                        }

                    }
            });
            columnHashMap.put('f_pwf', {

                field: 'f_pwf',
                title: "污水处理费",
                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {

                        if (row.f_ztid == '1')
                        {
                            var sfstr = row.f_value2.split('|')[0];
                            var resultStr = sfstr.split('^')[1];
                            return resultStr;
                        }
                        else
                        {
                            var resultStr = value;

                            return resultStr;
                        }
                    }
            });
            columnHashMap.put('f_sjljsyl', {

                field: 'f_sjljsyl',
                title: "年累计购量",



                "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


                        return resultStr;
                    }
            });
            columnHashMap.put('f_jmje', {
                field: 'f_jmje',
                title: "减免金额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jmbh', {
                field: 'f_jmbh',
                title: "减免编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfsfts', {
                field: 'f_sfsfts',
                title: "是否算费提示",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (value == "true")
                    {
                        value = '是';
                    }
                    else
                    {
                        value = '否';
                    }
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfjl', {
                field: 'f_sfjl',
                title: "算法记录",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            columnHashMap.put('f_dyjtsl', {
                field: 'f_dyjtsl',
                title: "第一阶梯水量",
                "class": 'jtsj',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            columnHashMap.put('f_dyjtsf', {
                field: 'f_dyjtsf',
                title: "第一阶梯水费",
                "class": 'jtsj',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            columnHashMap.put('f_dejtsl', {
                field: 'f_dejtsl',
                title: "第二阶梯水量",
                "class": 'jtsj',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            columnHashMap.put('f_dejtsf', {
                field: 'f_dejtsf',
                title: "第二阶梯水费",
                "class": 'jtsj',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            columnHashMap.put('f_dsjtsl', {
                field: 'f_dsjtsl',
                title: "第三阶梯水量",
                "class": 'jtsj',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            columnHashMap.put('f_dsjtsf', {
                field: 'f_dsjtsf',
                title: "第三阶梯水费",
                "class": 'jtsj',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            var column = getCookie("tbl_ld_cbreport_query_list_column");

            if (column != null && column != 'undefined' && column != "")
            {
                var ss = column.split(',');
                $.each(ss, function (i, u)
                {
                    var columnObj = columnHashMap.get(u.toLowerCase());
                    if (columnObj != undefined)
                    {
                        columnObj["class"] = '';
                        columnsarray.push(columnObj);
                    }

                });
            }
            else
            {

                var columnObj = columnHashMap.get('f_cb_cbbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_khbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_cbbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yhm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_jfm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_dh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_dz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sqzm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_bqzm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sqsl');
                columnObj["class"] = '';
                columnsarray.push(columnObj);


                columnObj = columnHashMap.get('f_bqsl');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                //columnObj = columnHashMap.get('f_qsqpjsl');
                //columnObj["class"] = '';
                //columnsarray.push(columnObj);

                //columnObj = columnHashMap.get('f_qlqpjsl');
                //columnObj["class"] = '';
                //columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sf');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_pwf');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_bqje');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                if (commonObj._jtsjflag)
                {
                    columnObj = columnHashMap.get('f_dyjtsl');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    columnObj = columnHashMap.get('f_dyjtsf');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    columnObj = columnHashMap.get('f_dejtsl');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    columnObj = columnHashMap.get('f_dejtsf');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    columnObj = columnHashMap.get('f_dsjtsl');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    columnObj = columnHashMap.get('f_dsjtsf');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);
                }
                else
                {

                }




                columnObj = columnHashMap.get('f_cbyname');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_cbsj');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_ly');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                //columnObj = columnHashMap.get('f_bz');
                //columnObj["class"] = '';
                //columnsarray.push(columnObj);


            }


            //根据页面情况设置Grid的高度
            var gridHeight = 0;
            if ($(window).width() < basePageObj._limSrceenWidth)
            {
                gridHeight = $(window).height() - 320;
                if (gridHeight < 950)
                {
                    gridHeight = 950;
                }
            }
            else
            {
                gridHeight = $(window).height() - 240;
            }


            $('#table_grid_tbl_ld_cbreport_list').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: _isPage,
                pageSize: _pageSize,
                pageList: [_pageSize],
                pageNumber: that._pr_gridpageindex,
                search: false,
                showColumns: false,
                showRefresh: false,
                clickToSelect: true,
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: columnsarray,
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function (row, index)
                {
                    if (row.f_sfsfts == 'true')
                    {
                        return { classes: 'danger' };
                    }
                    else
                    {
                        return {};
                    }
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};

                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
                    that.sumGrid();
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function (row)
                {
                    that._pr_gridselectids += '^' + row.sys_id;
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function (row)
                {
                    that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_cbreport_list').bootstrapTable('getSelections');
                    $.each(rows, function (i, u)
                    {
                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                        {
                        }
                        else
                        {
                            that._pr_gridselectids += '^' + rows[i].sys_id;
                        }
                    });
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_cbreport_list').bootstrapTable('getData');
                    $.each(rows, function (i, u)
                    {
                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                        {
                            that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + rows[i].sys_id + '^', '^');
                        }
                    });
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
            });

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initGrid执行失败<br/>' + ex.message, 'fail');
        }
    },

      //列显示弹出页
    initDetailControlShowColumn = function (callBackFunction)
    {
        try
        {

            var codeservice_cbiao = _baseCodeHashMap.get('codeservice_cbiao');
            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_cbreport_query_showcolumnlist', codeservice_cbiao, null);
            //controlObj.checklistinit('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist', codeservice_0814, null, { width: '120' });
            //模态窗口
            $('#div_modal_tbl_ld_cbreport_query_showcolumnlist').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControlShowColumn执行失败。<br/>' + ex.message, 'fail');
        }
    },

        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (callBackFunction)
    {
        var d = new Date();


        var json = {


            f_value1: '',


            f_value2: '',


            f_value3: '',


            f_value4: '',


            f_value5: '',


            f_value6: '',


            f_value7: '',


            f_value8: '',


            f_value9: '',


            f_value10: '',


            f_cb_cbbh: '',


            f_cb_cbbhid: '',


            f_khbh: '',

            f_khfz: '',
            f_khfzid: '',
            f_sf: '0',
            f_pwf: '',
            f_sjljsyl: '0',
            f_jmje: '0',
            f_jmbh: '',
            f_jmbhid: '',
            f_sfsfts: '',

            f_khbhid: '',


            f_sqzm: '',


            f_bqzm: '',

            f_bqsl: '',


            f_sqsl: '',


            f_qsqpjsl: '',


            f_qlqpjsl: '',


            f_cbyname: basePageObj._userInfoJson.sys_username,


            f_cbyid: basePageObj._userInfoJson.sys_userid,


            f_cbyphoto: '',

            f_cbsj: d.Format('yyyy-MM-dd hh:mm:ss'),

            f_bkid: '05430001',

            f_ztid: '0',

            f_lyid: '05450001',


            f_bz: '',


            f_sbbh: '',


            f_sbbhid: '',


            f_sblx: '',


            f_sblxid: '',


            f_yslx: '',


            f_yslxid: '',


            f_lxtkhh: '',


            f_cbbh: '',


            f_cbbhid: '',


            f_cbmc: '',


            f_yhbh: '',


            f_yhbhid: '',


            f_yhm: '',


            f_jfm: '',


            f_dh: '',


            f_dz: '',


            f_dy: '',


            f_dyid: '',


            f_sc: '',


            f_scid: '',


            f_qy: '',


            f_qyid: '',


            f_pq: '',


            f_pqid: '',


            f_pgbh: '',


            f_pgbhid: '',


            f_pgr: '',


            f_pgrid: '',


            f_pgpcmc: '',

            f_pgsj: '1900-01-01 00:00:00',


            f_jfbh: '',


            f_jfbhid: '',

            f_jfsj: '1900-01-01 00:00:00',

            f_bqje: '',
            f_kj: '',


            f_kjid: '',
            f_ztkhh: '',
            f_ztsbh: '',
            f_ztyhh: '',
            f_rs: '',

            f_dyjtsl: '',
            f_dyjtsf: '',
            f_dejtsl: '',
            f_dejtsf: '',
            f_dsjtsl: '',
            f_dsjtsf:'',




            sys_delflag: '0',
            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatusername: basePageObj._userInfoJson.sys_username,
            sys_creatuserid: basePageObj._userInfoJson.sys_userid
        };

        var data = {
            json: JSON.stringify(json),
            clientInf: _clientInf
        }

        doAjaxFunction(_serviceUrl, 'Add', data, {
            success: function (result)
            {
                callBackFunction.success(result);
            },
            fail: function (message)
            {
                callBackFunction.fail('Add:' + message);
            }
        });
    },
    end = function () { };


    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        //appcode
        _pr_appcode: '',
        //1：可编辑；2：只读
        _pr_listtype: '',
        //人员类型，如果是管理员显示全部抄表信息，抄表员只显示自己的抄表信息
        _pr_isadmin: '1',
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,

        //月份查询
        _pr_searchtime: '',

        //是否查询历史库
        _pr_searchhis: 'false',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
        init: function ()
        {

            try
            {
                _alertMessage = new alertMessage();
                _resultMessage = new resultMessage();
                _confirmMessage = new confirmMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show('程序加载中...', 'loading');
                basePageObj.initBasePage({
                    success: function ()
                    {
                        //初始化参数
                        initParameter({
                            success: function ()
                            {

                                creatWhereClause({
                                    success: function ()
                                    {
                                        initGrid({
                                            success: function ()
                                            {
                                                that.bindGrid({
                                                    success: function ()
                                                    {

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_cbreport_list');
                                                        _validateMessage_searchtime = new validateMessage('btn_modal_searchtime_tbl_ld_cbreport_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_cbreport_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_cbreport_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_cbreport_list');
                                                        _ladda_btn_command_his = Ladda.create('btn_command_his_tbl_ld_cbreport_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_cbreport_query_list');
                                                        switch (that._pr_listtype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                if (that._pr_isadmin == '0')
                                                                {
                                                                $('#btn_command_new_tbl_ld_cbreport_list').addClass('hidden');
                                                                } else
                                                                {
                                                                    $('#btn_command_new_tbl_ld_cbreport_list').removeClass('hidden');
                                                                }
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        if (that._pr_isadmin == '1')
                                                        {
                                                            $('#dd_search_f_cbyname_tbl_ld_cbreport_list').addClass("hidden");
                                                        }

                                                        _blockMessage.hidden();
                                                    },
                                                    fail: function (message)
                                                    {
                                                        _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                                                    }
                                                });
                                            }
                                        });

                                    }
                                });

                                //初始化search
                                initSearchBaseCode({
                                    success: function ()
                                    {
                                        initSearchControl({
                                            success: function ()
                                            {
                                                setSearchModel({
                                                    success: function ()
                                                    {


                                                    }
                                                });
                                            }
                                        });
                                        initDetailControlShowColumn({
                                            success: function ()
                                            {
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    },
                    fail: function (message)
                    {
                        _blockMessage.show(message, 'fail');
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },
        //---------------------------------------------------------------------------------
        // ---------------------------------grid------------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:bindGrid
        *  参数:callBackFunction
        *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
        */
        bindGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {
                $("#sumbqsl").html("");
                $("#sumsf").html("");
                $("#sumpwf").html("");
                $("#sumbqje").html("");

                $('#table_grid_tbl_ld_cbreport_list').bootstrapTable("showLoading");

                if (_whereClauseString == null || _whereClauseString == "")
                {
                    _whereClauseString += " 1=1 ";
                }
                
                if (that._pr_isadmin != '0')
                {   
                    _whereClauseString += " and f_cbyid ='" + basePageObj._userInfoJson.sys_userid + "'";
                }

                var orderByString = ' f_cbsj desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_khfz^f_khfzid^f_sf^f_pwf^f_sjljsyl^f_jmje^f_jmbh^f_jmbhid^f_sfsfts^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_yhbh^f_yhbhid^f_kj^f_kjid^f_ztkhh^f_ztsbh^f_ztyhh^f_rs^f_sfjl^sys_id^f_dyjtsl^f_dyjtsf^f_dejtsl^f_dejtsf^f_dsjtsl^f_dsjtsf';

               

                var data = {
                    whereString: _whereClauseString,
                    orderByString: orderByString,
                    columnsString: columnsString,
                    pageSizeString: _pageSize,
                    pageIndexString: that._pr_gridpageindex,
                    clientInf: _clientInf
                };

                if (that._pr_searchhis == 'false')
                {
                    data["cxzxsjString"] = "false";
                
                }
                else
                {
                    data["cxzxsjString"] = "true";
                }

                doAjaxFunction(_serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_ld_cbreport_list').bootstrapTable("hideLoading");
                        $('#table_grid_tbl_ld_cbreport_list').bootstrapTable("loadJson", messageJson);

                        gridSelectedChange();
                        if (callBackFunction != undefined && callBackFunction != null)
                        {
                            callBackFunction.success();
                        }
                    },
                    fail: function (message)
                    {
                        if (callBackFunction != undefined && callBackFunction != null)
                        {
                            callBackFunction.fail(message);
                        }
                    }
                });
            }, 0);
        },
        /* 
*  
*  方法:sumGrid
*  参数:callBackFunction
*  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
*/
        sumGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {

                if (_whereClauseString == null || _whereClauseString == "")
                {
                    _whereClauseString += " 1=1 ";
                }

                if (that._pr_isadmin != '0')
                {
                    _whereClauseString += " and f_cbyid ='" + basePageObj._userInfoJson.sys_userid + "'";
                }

                var sumString = 'f_sf^f_pwf^f_bqsl^f_bqje';

                var data = {
                    whereString: _whereClauseString,
                    sumString: sumString,
                    clientInf: _clientInf
                };

                if (that._pr_searchhis == 'false')
                {
                    data["cxzxsjString"] = "false";

                }
                else
                {
                    data["cxzxsjString"] = "true";
                }

                doAjaxFunction(_serviceUrl, 'SumList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();
                        $("#sumbqsl").html("<strong>本期水量合计:</strong>"+messageJson.f_bqsl);
                        $("#sumsf").html("<strong>水费合计:</strong>" + messageJson.f_sf);
                        $("#sumpwf").html("<strong>污水处理费合计:</strong>" + messageJson.f_pwf);
                        $("#sumbqje").html("<strong>本期金额合计:</strong>" + messageJson.f_bqje);

                    },
                    fail: function (message)
                    {
                        if (callBackFunction != undefined && callBackFunction != null)
                        {
                            callBackFunction.fail(message);
                        }
                    }
                });
            }, 0);
        },
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------


        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并打开DetailModel
        */
        btn_command_new_onclick: function ()
        {
            _ladda_btn_command_new.start();
            addDetailData({
                success: function (result)
                {
                    _ladda_btn_command_new.stop();
                    transToDetailPage(result, '1');

                }, fail: function (message)
                {
                    _ladda_btn_command_new.stop();
                    _alertMessage.show('addDetailData执行失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },


        /* 
        *  
        *  方法:btn_command_delete_onclick
        *  参数:
        *  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
        */
        btn_command_delete_onclick: function ()
        {
            var allcount = that._pr_gridselectids.split('^').length;

            if (that._pr_gridselectids == '')
            {
                _alertMessage.show('至少选择一条数据!', 'warning', 1000);
            }
            else
            {
                var currentcount = $('#table_grid_tbl_ld_cbreport_list').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条</h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('删除确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_delete.start();

                        var whereClause = "sys_id in (\'" + that._pr_gridselectids.toString().replaceAll("^", "\',\'") + "\')";

                        var data = {
                            clientInf: _clientInf,
                            whereString: whereClause
                        };
                        doAjaxFunction(_serviceUrl, 'Delete', data, {
                            success: function (result)
                            {
                                var data = {
                                    clientInf: _clientInf,
                                    whereString: _whereClauseString
                                };
                                if (that._pr_searchhis == 'false')
                                {
                                    data["cxzxsjString"] = "false";
                                }
                                else
                                {
                                    data["cxzxsjString"] = "true";
                                }
                                doAjaxFunction(_serviceUrl, 'GetCount', data, {
                                    success: function (result)
                                    {
                                        //判断当前页面是否有记录
                                        var count = parseInt(result);
                                        if (count < that._pr_gridpageindex * _pageSize)
                                        {
                                            that._pr_gridpageindex = Math.ceil(count / _pageSize);
                                        }
                                        if (that._pr_gridpageindex == 0)
                                        {
                                            that._pr_gridpageindex = 1;
                                        }
                                        //清空选择情况
                                        that._pr_gridselectids = '';
                                        that.bindGrid({
                                            success: function ()
                                            {
                                                _ladda_btn_command_delete.stop();
                                            },
                                            fail: function (message)
                                            {
                                                _alertMessage.show('数据删除完成，绑定数据失败', 'fail');
                                                _ladda_btn_command_delete.stop();
                                                _resultMessage.show(message);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('数据删除完成，获取数据条数失败', 'fail');
                                        _ladda_btn_command_delete.stop();
                                        _resultMessage.show(message);
                                    }
                                });

                            },
                            fail: function (message)
                            {
                                _alertMessage.show('数据删除失败', 'fail');
                                _ladda_btn_command_delete.stop();
                                _resultMessage.show(message);
                            }
                        });


                    },
                    cancle: function ()
                    {

                    }
                });
            }
        },

        /* 
        *  
        *  方法:btn_command_clearselect_onclick
        *  参数:
        *  清空选择内容
        *  
        */
        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_ld_cbreport_list').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            gridSelectedChange();
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_command_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“简单查询”按钮的事件
        */
        btn_command_search_onclick: function ()
        {
            try
            {
                switch (that._pr_searchtype)
                {
                    case "1":
                        getSearchModel({
                            success: function ()
                            {
                                creatWhereClause({
                                    success: function ()
                                    {
                                        clearSearchModel();
                                        that._pr_gridpageindex = '1';
                                        that._pr_gridselectids = '';
                                        that.bindGrid();
                                    }

                                });
                            },
                            fail: function (message)
                            {
                                _alertMessage.show('获取数据失败', 'fail');
                                _resultMessage.show(message);
                            }
                        });

                        break;
                    case "2":
                        that.btn_command_search_2_onclick();
                        break;
                }
            }
            catch (ex)
            {
                _alertMessage.show('查询失败', 'fail');
                _resultMessage.show(ex.message);
            }
        },

        /* 
        *  
        *  方法:btn_command_search_1_onclick
        *  参数:
        *  简单查询模式
        */
        btn_command_search_1_onclick: function ()
        {
            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_cbreport_list').html('简单查询');
            $('#txt_command_search_tbl_ld_cbreport_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_2_onclick
        *  参数:
        *  高级查询模式
        */
        btn_command_search_2_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_cbreport_list').html('高级查询');
            $('#txt_command_search_tbl_ld_cbreport_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cbreport_list').modal('show');
        },

        /* 
        *  
        *  方法:btn_search_modal_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“高级查询”按钮的事件
        */
        btn_search_modal_search_onclick: function ()
        {
            getSearchModel({
                success: function ()
                {
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {
                                    clearSearchModel();
                                    $('#div_search_modal_tbl_ld_cbreport_list').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if (message == '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }

                        }
                    });
                },
                fail: function (message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },
        /* 
        *  
        *  方法:btn_search_modal_cancle_onclick
        *  参数:
        *  关闭高级查询窗体
        *  
        */
        btn_search_modal_cancle_onclick: function ()
        {
            _validateMessage.hidden();
            $('#div_search_modal_tbl_ld_cbreport_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_cbreport_list').html('简单查询');
            $('#txt_command_search_tbl_ld_cbreport_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_xs_onclick
        *  参数:
        *  小屏幕模式下打开高级查询模式
        *  
        */

        btn_command_search_xs_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_cbreport_list').html('高级查询');
            $('#txt_command_search_tbl_ld_cbreport_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cbreport_list').modal('show');
        },
        //导出
        btn_command_report_onclick: function ()
        {
            _ladda_btn_command_exp.start();
            var column = getCookie('tbl_ld_cbreport_query_list_column');
            var columnname = getCookie('tbl_ld_cbreport_query_list_columnname');
            var where = '';
            if (_whereClauseString == "")
            {
                where = " 1=1";
            }
            else
            {
                where = _whereClauseString;
            }

            if (column != null && columnname != null && column != "" && columnname != "")
            {
                var columnsString = column;
                var colunmsName = columnname;
            }
            else
            {
            var columnsString = 'f_cb_cbbh,f_khbh,f_cbbh,f_yhm,f_jfm,f_dh,f_dz,f_sqzm,f_bqzm,f_sqsl,f_bqsl,f_bqje,f_dyjtsl,f_dyjtsf,f_dejtsl,f_dejtsf,f_dsjtsl,f_dsjtsf,f_qsqpjsl,f_qlqpjsl,f_cbyname,f_cbsj,f_ly,f_zt,f_bz,f_value10';
            var colunmsName = '抄表编号,客户编号,抄本编号,用户名,缴费名,电话,地址,上期止码,本期止码,上期水量,当月水量,本期金额,第一阶梯水量,第一阶梯水费,第二阶梯水量,第二阶梯水费,第三阶梯水量,第三阶梯水费,前三期平均水量,前六期平均水量,抄表员,抄表时间,来源,状态,备注,银行账号';
            }
            var orderByString = ' f_cbsj desc';
            var data = {
                whereString: where,
                orderByString:orderByString,
                column: columnsString,
                columnname: colunmsName,
                clientInf: _clientInf
            };

            if (that._pr_searchhis == 'false')
            {
                data["cxzxsjString"] = "false";
            }
            else
            {
                data["cxzxsjString"] = "true";
            }
            doAjaxFunction(_serviceUrl, 'Export', data, {
                success: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    window.open(message, "_blank", "");
                },
                fail: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                },
                error: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },
        //列显示
        btn_command_showcolunm_onclick: function ()
        {
            _ladda_btn_command_showcolunm.start();
            var column = getCookie('tbl_ld_cbreport_query_list_column');
            if (column != null && column != 'undefined' && column != "")
            {
                //controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist', column);
                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_cbreport_query_showcolumnlist', column);
            }
            $('#div_modal_tbl_ld_cbreport_query_showcolumnlist').modal('show');
        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {
            $('#div_modal_tbl_ld_cbreport_query_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();
        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {
           
            //var column = controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            //var columnname = controlObj.checklist('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_cbreport_query_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_cbreport_query_showcolumnlist');
            setCookieMinutes("tbl_ld_cbreport_query_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_cbreport_query_list_columnname", columnname, 5256000);
            $("#table_grid_tbl_ld_cbreport_list").bootstrapTable('destroy');
            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {
                            $('#div_modal_tbl_ld_cbreport_query_showcolumnlist').modal('hide');
                            _ladda_btn_command_showcolunm.stop();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                        }
                    });
                }
            });
        },
        //查询时间
        btn_showtime_search_onclick: function ()
        {
            $('#div_modal_tbl_ld_cbreport_list').modal('show');
        },
        btn_modal_ok_onclick: function ()
        {

            getSearchModel({
                success: function ()
                {
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {
                                    $('#div_modal_tbl_ld_cbreport_list').modal('hide');
                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if (message == '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                        }
                    });
                },
                fail: function (message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },
        btn_modal_cancle_onclick: function ()
        {
            _validateMessage_searchtime.hidden();
            $('#div_modal_tbl_ld_cbreport_list').modal('hide');
        },
        //历史库切换功能
        btn_command_his_onclick: function ()
        {
            if ($('#btn_command_his_tbl_ld_cbreport_list').hasClass('btn-default'))
            {
                $('#btn_command_his_tbl_ld_cbreport_list').removeClass('btn-default');
                $('#btn_command_his_tbl_ld_cbreport_list').addClass('btn-primary');
                $('#btn_command_his_tbl_ld_cbreport_list').text('含历史库数据');

                that._pr_searchhis = 'true';
            }
            else
            {
                $('#btn_command_his_tbl_ld_cbreport_list').removeClass('btn-primary');
                $('#btn_command_his_tbl_ld_cbreport_list').addClass('btn-default');
                $('#btn_command_his_tbl_ld_cbreport_list').text('不含历史库数据');

                that._pr_searchhis = 'false';
            }
            _ladda_btn_command_his.start();
            getSearchModel({
                success: function ()
                {
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {
            
                                    that.bindGrid({
                                        success: function ()
                                        {
                                            _ladda_btn_command_his.stop();
                                        }, fail: function (message)
                                        {
                                            _ladda_btn_command_his.stop();
                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if (message == '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                            _ladda_btn_command_his.stop();
                        }
                    });
                },
                fail: function (message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);
                    _ladda_btn_command_his.stop();
                }
            });
        },
        end: function ()
        {
        }

    };
    return that;
})();

$(document).ready(function ()
{
    tbl_ld_cbreport_list_Obj.init();
});



