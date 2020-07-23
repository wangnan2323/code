


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_qftj_list_Obj = (function () {
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
                _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage = null,
    //按钮工具
    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    _ladda_btn_command_exp = null,
    //查询sql语句
    _whereClauseString = '',
    _whereclause = '',
    _sblxid = '',
    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function (callBackFunction) {
        try {
            that._pr_listtype = requestQuery('listtype');

            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

            if (that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null') {
                that._pr_gridpageindex = 1;
            }
            else {
                that._pr_gridpageindex = Number(that._pr_gridpageindex);
            }

            if (that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null') {
                that._pr_searchcontent = new Object();
            }
            else {
                that._pr_searchcontent = (new Function("", "return " + that._pr_searchcontent))();
            }

            if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null') {
                that._pr_searchtype = '1';
            }

            switch (that._pr_searchtype) {
                case "1":
                    $('#btn_command_search_tbl_ld_qftj_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_qftj_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_qftj_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_qftj_list').attr("disabled", true);
                    break;
            }



            if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null') {
                _blockMessage.show('listtype参数接收失败...', 'fail');
            }
            else {
                callBackFunction.success();
            }
        }
        catch (ex) {
            _blockMessage.show('initParameter执行失败<br/>' + ex.message, 'fail');
        }

    },
    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function (isDisable) {
        try {
            if (isDisable) {
                $('#btn_command_delete_tbl_ld_qftj_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_qftj_list').addClass('hidden');
            }
            else {
                $('#btn_command_delete_tbl_ld_qftj_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_qftj_list').removeClass('hidden');
            }
        }
        catch (ex) {
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
    initSearchBaseCode = function (callBackFunction) {
        var codeServiceId = '0524^';
        codeServiceId += "0556^";
        codeServiceId += "0555^";
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray) {
                try {
                    _baseCodeHashMap = new hashMap();
                    var codenull = [];
                    _baseCodeHashMap.put('codeservice_0513', codenull);
                    _baseCodeHashMap.put('codeservice_0514', codenull);
                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);
                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);
                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);
                    var sqlJson = {
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',
                        'tbl_ldbm_khfz': "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                    }
                    commonObj.querySqls(sqlJson, {
                        success: function (resultJson) {
                            $.each(resultJson["tbl_ldbm_khfz"], function (i, u) {
                                if (resultJson["tbl_ldbm_khfz"][i]["disabled"] == "true") {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_0512', resultJson["tbl_ldbm_dycq"]);
                            _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);
                            callBackFunction.success();
                        },
                        fail: function (message) {
                        }
                    })
                }
                catch (ex) {
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
    initSearchControl = function (callBackFunction) {
        try {
            var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');
            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');
            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');
            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
            var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');
            var codeService_0556 = _baseCodeHashMap.get('codeservice_0556');
            var codeService_0555 = _baseCodeHashMap.get('codeservice_0555');
            var codeservice_khfz = _baseCodeHashMap.get('codeservice_khfz');
            controlObj.singledropdownlistinit('search_f_dy_tbl_ld_qftj_list', codeService_0512, f_dy_onchange);
            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_qftj_list', codeService_0513, f_sc_onchange);
            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_qftj_list', codeService_0514, f_qy_onchange);
            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', codeService_0515, f_pq_onchange);
            controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_qftj_list', codeservice_cben);
            controlObj.multidropdownlistinit('search_f_sblx_tbl_ld_qftj_list', codeService_0524);
            controlObj.multidropdownlistinit('search_f_yslx_tbl_ld_qftj_list', codeService_0555);
            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_qftj_list', codeservice_khfz);
            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_qftj_list', codeService_0556);
            controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_qftj_list_datefrom', 'search_f_zhcbrq_tbl_ld_qftj_list_timefrom');
            controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_qftj_list_dateto', 'search_f_zhcbrq_tbl_ld_qftj_list_timeto');
            controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_datefrom', 'search_f_zhcbrq_tbl_ld_qftj_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_dateto', 'search_f_zhcbrq_tbl_ld_qftj_list_timeto', '1900-01-01 00:00:00');

            //模态窗口
            $('#div_search_modal_tbl_ld_qftj_list').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });

            callBackFunction.success();
        }
        catch (ex) {
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
    setSearchModel = function (callBackFunction) {
        try {
            switch (that._pr_searchtype) {
                case "1":
                    if (that._pr_searchcontent.type1 != undefined) {
                        //简单查询
                        $("#txt_command_search_tbl_ld_qftj_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined) {
                        //高级查询
                        var tbl_ld_qftj_list = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_qftj_list', tbl_ld_qftj_list.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_khbh);

                        controlObj.text('search_f_ztkhh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_ztkhh);

                        controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_cbbhid);

                        controlObj.text('search_f_cbyxm_tbl_ld_qftj_list', tbl_ld_qftj_list.f_cbyxm);

                        controlObj.text('search_f_yhbh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_yhbh);

                        controlObj.text('search_f_jfm_tbl_ld_qftj_list', tbl_ld_qftj_list.f_jfm);

                        controlObj.text('search_f_dz_tbl_ld_qftj_list', tbl_ld_qftj_list.f_dz);

                        controlObj.text('search_f_dh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_dh);

                        controlObj.text('search_f_ljqf_tbl_ld_qftj_list', tbl_ld_qftj_list.f_ljqf);
                        controlObj.text('search_f_tjjzpwf_tbl_ld_qftj_list', tbl_ld_qftj_list.f_tjjzpwf);
                        controlObj.text('search_f_tjjzsf_tbl_ld_qftj_list', tbl_ld_qftj_list.f_tjjzsf);
                        controlObj.text('search_f_tssbbhid_tbl_ld_qftj_list', tbl_ld_qftj_list.f_tssbbhid);
                        controlObj.text('search_f_nljgl_tbl_ld_qftj_list', tbl_ld_qftj_list.f_nljgl);
                        controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_qftj_list_date', 'search_f_zhcbrq_tbl_ld_qftj_list_time');
                        controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_datefrom', 'search_f_zhcbrq_tbl_ld_qftj_list_timefrom', tbl_ld_qftj_list.f_zhcbrqfrom);
                        controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_dateto', 'search_f_zhcbrq_tbl_ld_qftj_list_timeto', tbl_ld_qftj_list.f_zhcbrqto);
                        controlObj.singledropdownlistid('search_f_dy_tbl_ld_qftj_list', tbl_ld_qftj_list.f_dyid);
                        var dy = { "added": { "id": tbl_ld_qftj_list.f_dyid } };
                        var sc = { "added": { "id": tbl_ld_qftj_list.f_scid } };
                        var qy = { "added": { "id": tbl_ld_qftj_list.f_qyid } };
                        ////
                        f_dy_onchange(dy, {

                            success: function () {
                                controlObj.singledropdownlistid('search_f_sc_tbl_ld_qftj_list', tbl_ld_qftj_list.f_scid);
                                f_sc_onchange(sc, {
                                    success: function () {
                                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list', tbl_ld_qftj_list.f_qyid);
                                        f_qy_onchange(qy, {
                                            success: function () {
                                                controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', tbl_ld_qftj_list.f_pqid);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        controlObj.text('search_f_tsyxzh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_tsyxzh);

                        controlObj.text('search_f_hth_tbl_ld_qftj_list', tbl_ld_qftj_list.f_hth);

                        controlObj.text('search_f_sfzh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_sfzh);

                        controlObj.text('search_f_sbbh_tbl_ld_qftj_list', tbl_ld_qftj_list.f_sbbh);

                        controlObj.text('search_f_lxth_tbl_ld_qftj_list', tbl_ld_qftj_list.f_lxth);

                        controlObj.multidropdownlistid('search_f_sblx_tbl_ld_qftj_list', tbl_ld_qftj_list.f_sblxid);

                        controlObj.multidropdownlistid('search_f_yslx_tbl_ld_qftj_list', tbl_ld_qftj_list.f_yslxid);
                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_qftj_list', tbl_ld_qftj_list.f_khfzid);
                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_qftj_list', tbl_ld_qftj_list.f_ztid);
                        controlObj.text('search_f_bz_tbl_ld_qftj_list', tbl_ld_qftj_list.f_bz);

                    }
                    break;
            }
            callBackFunction.success();
        }
        catch (ex) {
            _blockMessage.show('setSearchModel执行失败<br/>' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction) {
        try
        {
            switch (that._pr_searchtype) {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_qftj_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_qftj_list = new Object();


                    tbl_ld_qftj_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_ztkhh = controlObj.text('search_f_ztkhh_tbl_ld_qftj_list');

                    //
                    tbl_ld_qftj_list.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_cbyxm = controlObj.text('search_f_cbyxm_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_dz = controlObj.text('search_f_dz_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_dh = controlObj.text('search_f_dh_tbl_ld_qftj_list');

                    tbl_ld_qftj_list.f_ljqf = controlObj.text('search_f_ljqf_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_tjjzpwf = controlObj.text('search_f_tjjzpwf_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_tjjzsf = controlObj.text('search_f_tjjzsf_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_tssbbhid = controlObj.text('search_f_tssbbhid_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_nljgl = controlObj.text('search_f_nljgl_tbl_ld_qftj_list');

                    tbl_ld_qftj_list.f_dy = controlObj.singledropdownlist('search_f_dy_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_sc = controlObj.singledropdownlist('search_f_sc_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_qy = controlObj.singledropdownlist('search_f_qy_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_pq = controlObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_tsyxzh = controlObj.text('search_f_tsyxzh_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_hth = controlObj.text('search_f_hth_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_sfzh = controlObj.text('search_f_sfzh_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_lxth = controlObj.text('search_f_lxth_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_yslxid = controlObj.multidropdownlistid('search_f_yslx_tbl_ld_qftj_list');


                    tbl_ld_qftj_list.f_sblxid = controlObj.multidropdownlistid('search_f_sblx_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_khfz = controlObj.multidropdownlist('search_f_khfz_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_zt = controlObj.multidropdownlist('search_f_zt_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_qftj_list');

                    tbl_ld_qftj_list.f_bz = controlObj.text('search_f_bz_tbl_ld_qftj_list');
                    tbl_ld_qftj_list.f_zhcbrqfrom = controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_datefrom', 'search_f_zhcbrq_tbl_ld_qftj_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_qftj_list.f_zhcbrqto = controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_dateto', 'search_f_zhcbrq_tbl_ld_qftj_list_timeto'); //dateto + ' ' + timeto;                 
                    that._pr_searchcontent.type2 = tbl_ld_qftj_list;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex) {
            callBackFunction.fail(ex.message);
        }


    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  针对_pr_searchcontent.type2进行验证
    */
    checkSearchModel = function (callBackFunction) {
        try
        {
            var tbl_ld_qftj_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_qftj_list.f_value1.length > 200) {
                errorMessageHansMap.put('search_f_value1_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value2.length > 200) {
                errorMessageHansMap.put('search_f_value2_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value3.length > 200) {
                errorMessageHansMap.put('search_f_value3_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value4.length > 200) {
                errorMessageHansMap.put('search_f_value4_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value5.length > 200) {
                errorMessageHansMap.put('search_f_value5_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value6.length > 200) {
                errorMessageHansMap.put('search_f_value6_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value7.length > 200) {
                errorMessageHansMap.put('search_f_value7_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value8.length > 200) {
                errorMessageHansMap.put('search_f_value8_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value9.length > 200) {
                errorMessageHansMap.put('search_f_value9_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_value10.length > 200) {
                errorMessageHansMap.put('search_f_value10_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_khbh.length > 200) {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_ztkhh.length > 200) {
                errorMessageHansMap.put('search_f_ztkhh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_cbbhid.length > 200) {
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_cbyxm.length > 200) {
                errorMessageHansMap.put('search_f_cbyxm_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_yhbh.length > 200) {
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_jfm.length > 200) {
                errorMessageHansMap.put('search_f_jfm_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_dz.length > 200) {
                errorMessageHansMap.put('search_f_dz_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_dh.length > 200) {
                errorMessageHansMap.put('search_f_dh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_qftj_list.f_ljqf.length > 200)
            {
                errorMessageHansMap.put('search_f_ljqf_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_qftj_list.f_tjjzpwf.length > 200)
            {
                errorMessageHansMap.put('search_f_tjjzpwf_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_qftj_list.f_tssbbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_tssbbhid_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_qftj_list.f_tjjzsf.length > 200)
            {
                errorMessageHansMap.put('search_f_tjjzsf_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_qftj_list.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_nljgl_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_dy.length > 200) {
                errorMessageHansMap.put('search_f_dy_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_qftj_list.f_dyid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_dyid_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_qftj_list.f_sc.length > 200) {
                errorMessageHansMap.put('search_f_sc_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_qftj_list.f_scid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_scid_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_qftj_list.f_qy.length > 200) {
                errorMessageHansMap.put('search_f_qy_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_qftj_list.f_qyid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_qyid_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_qftj_list.f_pq.length > 200) {
                errorMessageHansMap.put('search_f_pq_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_qftj_list.f_pqid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_pqid_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_qftj_list.f_tsyxzh.length > 200) {
                errorMessageHansMap.put('search_f_tsyxzh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_hth.length > 200) {
                errorMessageHansMap.put('search_f_hth_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_sfzh.length > 200) {
                errorMessageHansMap.put('search_f_sfzh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_sbbh.length > 200) {
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_lxth.length > 200) {
                errorMessageHansMap.put('search_f_lxth_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_qftj_list.f_sblxid.length > 200) {
                errorMessageHansMap.put('search_f_sblx_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_qftj_list.f_yslxid.length > 200)
            {
                errorMessageHansMap.put('search_f_yslx_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_qftj_list.f_bz.length > 200) {
                errorMessageHansMap.put('search_f_bz_tbl_ld_qftj_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (errorMessageHansMap.keys().length > 0) {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail('');
            }
            else {
                _validateMessage.hidden();
                callBackFunction.success();
            }
        }
        catch (ex) {
            callBackFunction.fail(ex.message);
        }

    },

    /* 
    *  
    *  方法:clearSearchModel
    *  参数:callBackFunction
    *  清空_pr_searchtype和searchModel
    */
    clearSearchModel = function () {


        switch (that._pr_searchtype) {
            case "1":
                if (that._pr_searchcontent.type2 == undefined) {
                    that._pr_searchcontent.type2 = new Object();
                }

                that._pr_searchcontent.type2.f_value1 = '';
                controlObj.text('search_f_value1_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_ztkhh = '';
                controlObj.text('search_f_ztkhh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_ztkhh);


                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_cbbhid);


                that._pr_searchcontent.type2.f_cbyxm = '';
                controlObj.text('search_f_cbyxm_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_cbyxm);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_jfm);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_dz);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_dh);

                that._pr_searchcontent.type2.f_ljqf = '';
                controlObj.text('search_f_ljqf_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_ljqf);

               
                that._pr_searchcontent.type2.f_tjjzpwf = '';
                controlObj.text('search_f_tjjzpwf_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_tjjzpwf);
                that._pr_searchcontent.type2.f_tjjzsf = '';
                controlObj.text('search_f_tjjzsf_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_tjjzsf);
                that._pr_searchcontent.type2.f_tssbbhid = '';
                controlObj.text('search_f_tssbbhid_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_tssbbhid);
                that._pr_searchcontent.type2.f_nljgl = '';
                controlObj.text('search_f_nljgl_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_nljgl);




                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.singledropdownlistid('search_f_dy_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_dyid);




                that._pr_searchcontent.type2.f_scid = '';
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_scid);




                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_qyid);




                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_pqid);


                that._pr_searchcontent.type2.f_tsyxzh = '';
                controlObj.text('search_f_tsyxzh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_tsyxzh);


                that._pr_searchcontent.type2.f_hth = '';
                controlObj.text('search_f_hth_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_hth);


                that._pr_searchcontent.type2.f_sfzh = '';
                controlObj.text('search_f_sfzh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_sfzh);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_lxth = '';
                controlObj.text('search_f_lxth_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_lxth);


                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.multidropdownlistid('search_f_sblx_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_sblxid);
                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.multidropdownlistid('search_f_yslx_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_yslxid);
                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_khfzid);

                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_ztid);
                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_qftj_list', that._pr_searchcontent.type2.f_bz);

                that._pr_searchcontent.type2.f_zhcbrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_zhcbrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_datefrom', 'search_f_zhcbrq_tbl_ld_qftj_list_timefrom', that._pr_searchcontent.type2.f_zhcbrqfrom);
                controlObj.datetime('search_f_zhcbrq_tbl_ld_qftj_list_dateto', 'search_f_zhcbrq_tbl_ld_qftj_list_timeto', that._pr_searchcontent.type2.f_zhcbrqto);

                //缺少水表类型控件的代码--sk??!!

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined) {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_qftj_list").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction) {
        var whereClause = '';
        //
        switch (that._pr_searchtype)
        {
            case "1":
                {

                    if (that._pr_searchcontent.type1 != undefined) {
                        var vv = that._pr_searchcontent.type1.split(' ');
                        if (vv.length > 0) {
                            for (var i = 0; i < vv.length; i++) {
                                if (vv[i] != '') {
                                    whereClause += "(";

                                    whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ztkhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbyxm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_ljqf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tjjzpwf like '%" + vv[i] + "%' or ";
                                    whereClause += " f_tjjzsf like '%" + vv[i] + "%' or ";
                                    whereClause += " f_tssbbhid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_nljgl like '%" + vv[i] + "%' or ";


                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_scid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tsyxzh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_hth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfzh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";
                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";
                                    whereClause += " f_zhcbrq like '%" + vv[i] + "%' or ";
                                    if (whereClause.length > 0) {
                                        whereClause = whereClause.substr(0, whereClause.length - 3);
                                    }
                                    whereClause += ") and ";
                                }
                            }
                            if (whereClause.length > 0) {
                                whereClause = whereClause.substr(0, whereClause.length - 4);
                            }
                        }
                        _whereClauseString = whereClause;
                    }


                    callBackFunction.success();
                }
                break;
            case "2":
                {
                    if (that._pr_searchcontent.type2 != undefined) {

                        var tbl_ld_qftj_list = that._pr_searchcontent.type2;



                        if (tbl_ld_qftj_list.f_khbh.length > 0) {
                            whereClause += " f_khbh like '%" + tbl_ld_qftj_list.f_khbh + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_ztkhh.length > 0) {
                            whereClause += " f_ztkhh like '%" + tbl_ld_qftj_list.f_ztkhh + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_cbbhid.length > 0) {
                            var elementArray = tbl_ld_qftj_list.f_cbbhid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u) {
                                if (i == 0) {
                                    whereClause += ' ';
                                }
                                else {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_cbbhid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_qftj_list.f_cbyxm.length > 0) {
                            whereClause += " f_cbyxm like '%" + tbl_ld_qftj_list.f_cbyxm + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_yhbh.length > 0) {
                            whereClause += " f_yhbh like '%" + tbl_ld_qftj_list.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_jfm.length > 0) {
                            whereClause += " f_jfm like '%" + tbl_ld_qftj_list.f_jfm + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_dz.length > 0) {
                            whereClause += " f_dz like '%" + tbl_ld_qftj_list.f_dz + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_dh.length > 0) {
                            whereClause += " f_dh like '%" + tbl_ld_qftj_list.f_dh + "%' and ";
                        }

                        if (tbl_ld_qftj_list.f_ljqf.length > 0)
                        {
                            whereClause += " f_ljqf like '%" + tbl_ld_qftj_list.f_ljqf + "%' and ";
                        }

                        if (tbl_ld_qftj_list.f_tjjzpwf.length > 0)
                        {
                            whereClause += " f_tjjzpwf like '%" + tbl_ld_qftj_list.f_tjjzpwf + "%' and ";
                        }
                        if (tbl_ld_qftj_list.f_tjjzsf.length > 0)
                        {
                            whereClause += " f_tjjzsf like '%" + tbl_ld_qftj_list.f_tjjzsf + "%' and ";
                        }
                        if (tbl_ld_qftj_list.f_tssbbhid.length > 0)
                        {
                            whereClause += " f_tssbbhid like '%" + tbl_ld_qftj_list.f_tssbbhid + "%' and ";
                        }
                        if (tbl_ld_qftj_list.f_nljgl.length > 0)
                        {
                            whereClause += " f_nljgl like '%" + tbl_ld_qftj_list.f_nljgl + "%' and ";
                        }

                        if (tbl_ld_qftj_list.f_dyid.length > 0) {
                            whereClause += " f_dyid = '" + tbl_ld_qftj_list.f_dyid + "' and ";
                        }





                        if (tbl_ld_qftj_list.f_scid.length > 0) {
                            whereClause += " f_scid = '" + tbl_ld_qftj_list.f_scid + "' and ";
                        }





                        if (tbl_ld_qftj_list.f_qyid.length > 0) {
                            whereClause += " f_qyid = '" + tbl_ld_qftj_list.f_qyid + "' and ";
                        }




                        if (tbl_ld_qftj_list.f_pqid.length > 0) {
                            whereClause += " f_pqid = '" + tbl_ld_qftj_list.f_pqid + "' and ";
                        }




                        if (tbl_ld_qftj_list.f_tsyxzh.length > 0) {
                            whereClause += " f_tsyxzh like '%" + tbl_ld_qftj_list.f_tsyxzh + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_hth.length > 0) {
                            whereClause += " f_hth like '%" + tbl_ld_qftj_list.f_hth + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_sfzh.length > 0) {
                            whereClause += " f_sfzh like '%" + tbl_ld_qftj_list.f_sfzh + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_sbbh.length > 0) {
                            whereClause += " f_sbbh like '%" + tbl_ld_qftj_list.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_qftj_list.f_lxth.length > 0) {
                            whereClause += " f_lxth like '%" + tbl_ld_qftj_list.f_lxth + "%' and ";
                        }

                        if (tbl_ld_qftj_list.f_zhcbrqfrom != '1900-01-01 00:00:00') {
                            whereClause += " f_zhcbrq >= to_date('" + tbl_ld_qftj_list.f_zhcbrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }
                        if (tbl_ld_qftj_list.f_zhcbrqto != '1900-01-01 00:00:00') {
                            whereClause += " f_zhcbrq <= to_date('" + tbl_ld_qftj_list.f_zhcbrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_qftj_list.f_sblxid.length > 0) {
                            var elementArray = tbl_ld_qftj_list.f_sblxid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u) {
                                if (i == 0) {
                                    whereClause += ' ';
                                }
                                else {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_sblxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_qftj_list.f_yslxid.length > 0)
                        {
                            var elementArray = tbl_ld_qftj_list.f_yslxid.split(',');
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
                        if (tbl_ld_qftj_list.f_khfzid.length > 0) {
                            var elementArray = tbl_ld_qftj_list.f_khfzid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u) {
                                if (i == 0) {
                                    whereClause += ' ';
                                }
                                else {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_khfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_qftj_list.f_ztid.length > 0) {
                            var elementArray = tbl_ld_qftj_list.f_ztid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u) {
                                if (i == 0) {
                                    whereClause += ' ';
                                }
                                else {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_ztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_qftj_list.f_bz.length > 0) {
                            whereClause += " f_bz like '%" + tbl_ld_qftj_list.f_bz + "%' and ";
                        }

                        if (whereClause.length > 0) {
                            whereClause = whereClause.substr(0, whereClause.length - 4);
                        }
                    }
                    _whereClauseString = whereClause;
                    callBackFunction.success();
                }
                break;
        }
    },
    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
        //;
        if (that._pr_gridselectids == '') {
            $('#btn_command_clearselect_tbl_ld_qftj_list').addClass('hidden');
        }
        else {
            $('#btn_command_clearselect_tbl_ld_qftj_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_qftj_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_qftj_list .cc-badge-p').html(currentcount + '/' + allcount);

        }
    },
    /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function (callBackFunction) {
        try {

            //根据页面情况设置Grid的高度
            var gridHeight = 0;
            if ($(window).width() < basePageObj._limSrceenWidth) {
                gridHeight = $(window).height() - 320;
                if (gridHeight < 950) {
                    gridHeight = 950;
                }
            }
            else {
                gridHeight = $(window).height() - 240;
            }


            $('#table_grid_tbl_ld_qftj_list').bootstrapTable({
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
                columns: [
                {
                    field: "_checkbox", checkbox: true,
                    formatter: function (value, row, index) {
                        //根据gridselectids给Grid设置选中项
                        switch (that._pr_listtype) {
                            //编辑模式
                            case "1":
                                {
                                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1) {
                                        return {
                                            disabled: false,
                                            checked: true
                                        }
                                    }
                                    return value;
                                }
                                break;
                                //制度模式
                            case "2":
                                {
                                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1) {
                                        return {
                                            disabled: true,
                                            checked: true
                                        }
                                    }
                                    else {
                                        return {
                                            disabled: true
                                        }
                                    }
                                }
                                break;
                        }
                    }
                },
                {
                    field: 'sys_id', title: 'sys_id',
                    align: 'center',
                    "class": 'hidden',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
                },


                {
                    field: 'f_value1',
                    title: '备用字段1',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value2',
                    title: '备用字段2',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value3',
                    title: '备用字段3',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value4',
                    title: '备用字段4',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value5',
                    title: '备用字段5',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value6',
                    title: '备用字段6',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value7',
                    title: '备用字段7',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value8',
                    title: '备用字段8',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value9',
                    title: '备用字段9',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value10',
                    title: '备用字段10',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_khbh',
                    title: "客户编号",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                     

                        return resultStr;
                    }
                },


                {
                    field: 'f_ztkhh',
                    title: "旧客户号",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 8) {
                            resultStr = resultStr.substr(0, 8) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_khfz',
                    title: '客户分组',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_khfzid',
                    title: '客户分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_ycje',
                    title: "绿化表押金",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yslx',
                    title: '用水类型',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_yslxid',
                    title: '用水类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_tbbh',
                    title: '套表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sfjlbjf',
                    title: "计量不计费",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        if (value == "true") {
                            value = '是';
                        }
                        else {
                            value = '否';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        "";
                        return resultStr;
                    }
                },





                {
                    field: 'f_cbbh',
                    title: '抄本编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbbhid',
                    title: '抄本编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbxh',
                    title: '抄本序号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbyxm',
                    title: "抄表员姓名",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },
                {
                    field: 'f_zhcbrq',
                    title: "最后抄表日期",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },

           
                {
                    field: 'f_cbyid',
                    title: '抄表员id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbzq',
                    title: "抄表周期",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_cbmc',
                    title: "抄本名称",



                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;

                    }
                },
                                                 {
                                                     field: 'f_yhm',
                                                     title: "用户名",
                                                     "class": '',
                                                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                                     formatter: function (value, row, index) {
                                                         var resultStr = value;

                                                         if (resultStr.length > 10) {
                                                             resultStr = resultStr.substr(0, 10) + '...';
                                                         }


                                                         return resultStr;
                                                     }
                                                 },
                {
                    field: 'f_yhbh',
                    title: "用户编号",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                       
                        return resultStr;
                    }
                },
                                                 {
                                                     field: 'f_ztyhh',
                                                     title: "旧用户号",
                                                     "class": 'hidden',
                                                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                                     formatter: function (value, row, index) {
                                                         var resultStr = value;
                                                         if (resultStr.length > 10) {
                                                             resultStr = resultStr.substr(0, 10) + '...';
                                                         }
                                                         return resultStr;
                                                     }
                                                 },

                {
                    field: 'f_yhbhid',
                    title: '用户编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jfm',
                    title: "缴费名",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhfz',
                    title: '用户分组',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhfzid',
                    title: '用户分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_dz',
                    title: "地址",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_dh',
                    title: "电话",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;



                        return resultStr;
                    }
                },

               
                {
                    field: 'f_tjjzpwf',
                    title: "调价结转污水处理费",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },
                {
                    field: 'f_tjjzsf',
                    title: "调价结转水费",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },
                {
                    field: 'f_tssbbhid',
                    title: "停水水表编号id",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },
                {
                    field: 'f_nljgl',
                    title: "年用水量",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },
                {
                    field: 'f_ljqf',
                    title: "累计欠费",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },

                {
                    field: 'f_dy',
                    title: "地域",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_dyid',
                    title: '地域id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sc',
                    title: "水厂",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_scid',
                    title: '水厂id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qy',
                    title: "区域",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_qyid',
                    title: '区域id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pq',
                    title: "片区",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_pqid',
                    title: '片区id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_tsyxzh',
                    title: '托收银行账号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_hth',
                    title: '合同号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sfzh',
                    title: '身份证号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_khrq',
                    title: '开户日期',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbbh',
                    title: "水表编号",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                      


                        return resultStr;
                    }
                },


                {
                    field: 'f_sbbhid',
                    title: '水表编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_bqzm',
                    title: '本期止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sqzm',
                    title: '上期止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_bqsl',
                    title: '本期水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sqsl',
                    title: '上期水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qsqpjsl',
                    title: '前三期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qlqpjsl',
                    title: '前六期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_ljgl',
                    title: '累积购量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_lxth',
                    title: "老系统号",
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_sblx',
                    title: "水表类型",
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }


                        return resultStr;
                    }
                },


                {
                    field: 'f_sblxid',
                    title: '水表类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jllx',
                    title: '计量类型',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jllxid',
                    title: '计量类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_tssbbh',
                    title: '停水水表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;

                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                                {
                                    field: 'f_ztsbh',
                                    title: "旧水表号",
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }


                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_rs',
                                    title: '人数',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_ztsbh',
                                    title: '水表口径',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sbkjid',
                                    title: '水表口径id',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sbfz',
                                    title: '水表分组',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sbfzid',
                                    title: '水表分组id',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },

                                {
                                    field: 'f_zfbwybz',
                                    title: '支付宝唯一标志',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_gdyhwybz',
                                    title: '光大银行唯一标志',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_wxwybz',
                                    title: '微信唯一标志',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index) {
                                        var resultStr = value;

                                        if (resultStr.length > 10) {
                                            resultStr = resultStr.substr(0, 10) + '...';
                                        }
                                        return resultStr;
                                    }
                                },
                                 {
                                     field: 'f_zt',
                                     title: "状态",
                                     "class": '',
                                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                     formatter: function (value, row, index) {
                                         var resultStr = value;
                                         if (resultStr.length > 10) {
                                             resultStr = resultStr.substr(0, 10) + '...';
                                         }

                                         return resultStr;
                                     }
                                 },
                {
                    field: 'f_ztid',
                    title: '状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_bz',
                    title: '备注',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                        if (resultStr.length > 10) {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                }
                ],
                onPageChange: function (size, number) {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function (row, index) {
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function (data) {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function (row) {
                    that._pr_gridselectids += '^' + row.sys_id;
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function (row) {
                    that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function () {
                    var rows = $('#table_grid_tbl_ld_qftj_list').bootstrapTable('getSelections');
                    $.each(rows, function (i, u) {
                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1) {
                        }
                        else {
                            that._pr_gridselectids += '^' + rows[i].sys_id;
                        }
                    });
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheckAll: function () {
                    var rows = $('#table_grid_tbl_ld_qftj_list').bootstrapTable('getData');
                    $.each(rows, function (i, u) {
                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1) {
                            that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + rows[i].sys_id + '^', '^');
                        }
                    });
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
            });

            callBackFunction.success();
        }
        catch (ex) {
            _blockMessage.show('initGrid执行失败<br/>' + ex.message, 'fail');
        }
    },

    getArea = function (id, callbackFunction) {
        var sqlString = '';
        sqlString += "select sys_id as id, f_mc as text ";
        sqlString += "from tbl_ldbm_dycq  ";
        sqlString += "where sys_delflag = '0' ";
        sqlString += "and f_ztid = '0' ";
        sqlString += "and length(sys_orderid) =  ";
        sqlString += "    (select length(sys_orderid) + 4 from tbl_ldbm_dycq where sys_id = '" + id + "') ";
        sqlString += "and sys_orderid like ";
        sqlString += "    (select sys_orderid || '%' from tbl_ldbm_dycq where sys_id = '" + id + "') ";
        sqlString += "order by sys_orderid ";
        var sqlJson = {

            "tbl_ldbm_dycq": sqlString
        }
        commonObj.querySqls(sqlJson, {
            success: function (messageJson) {
                callbackFunction.success(messageJson["tbl_ldbm_dycq"]);
            },
            fail: function (message) {
            }
        })
    },
    //地域onchange事件
      f_dy_onchange = function (e, callbackfunction) {
          // //
          if (e.added != undefined) {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray) {
                      controlObj.singledropdownlistinit('search_f_sc_tbl_ld_qftj_list', jsonArray, f_sc_onchange);
                      controlObj.singledropdownlistid('search_f_sc_tbl_ld_qftj_list', '-1');
                      // controlObj.singledropdownlist('search_f_sc_tbl_ld_qftj_list', '');
                      if (callbackfunction != undefined) {
                          callbackfunction.success();
                      }
                      else {
                          controlObj.singledropdownlistinit('search_f_qy_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                          controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list', '-1');
                          // controlObj.singledropdownlist('search_f_qy_tbl_ld_qftj_list', '');
                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list', '');
                      }
                  }
              })
          }
          else {
              controlObj.singledropdownlistinit('search_f_sc_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
              controlObj.singledropdownlistid('search_f_sc_tbl_ld_qftj_list', '-1');
              //controlObj.singledropdownlist('search_f_sc_tbl_ld_qftj_list', '');
              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list', '-1');
              // controlObj.singledropdownlist('search_f_qy_tbl_ld_qftj_list', '');
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list', '');
          }
      },
    //水厂onchange事件
      f_sc_onchange = function (e, callbackfunction) {
          // //
          if (e.added != undefined) {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray) {
                      controlObj.singledropdownlistinit('search_f_qy_tbl_ld_qftj_list', jsonArray, f_qy_onchange);
                      controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list', '-1');
                      //controlObj.singledropdownlist('search_f_qy_tbl_ld_qftj_list', '');
                      if (callbackfunction != undefined) {
                          callbackfunction.success();
                      }
                      else {
                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list', '');
                      }
                  }
              })
          }
          else {
              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_qftj_list', '-1');
              //  controlObj.singledropdownlist('search_f_qy_tbl_ld_qftj_list', '');
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list', '');
          }
      },
      //区域onchange事件
      f_qy_onchange = function (e, callbackfunction) {
          // //
          if (e.added != undefined) {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray) {
                      controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', jsonArray, f_pq_onchange);
                      controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', '-1');
                      //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list', '');
                      if (callbackfunction != undefined) {
                          callbackfunction.success();
                      }
                  }
              })
          }
          else {
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_qftj_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_qftj_list', '-1');
              //controlObj.singledropdownlist('search_f_pq_tbl_ld_qftj_list', '');
          }
      },
      //片区onchange事件
       f_pq_onchange = function (e) {
           var controlid = e.target.id;
       },


    /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化
    */
    initDetailControl = function (callBackFunction)
    {
        try
        {
            // 
            var codeservice_sblx = _baseCodeHashMap.get('codeservice_0524');
            $.each(codeservice_sblx, function (i, u)
            {
                switch (codeservice_sblx[i]["id"])
                {
                    case "7":
                    case "16":
                    case "12":
                    case "13":
                    case "99":
                    case "19":
                    case "100":
                        codeservice_sblx[i]["disabled"] = false;
                        break;
                    default:
                        codeservice_sblx[i]["disabled"] = true;
                        break;
                }
            });
            controlObj.singledropdownlistinit('detial_f_fsblx_tbl_ld_qftj_list', codeservice_sblx);
            //模态窗口
            $('#div_modal_tbl_ld_qftj_list').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControl执行失败。<br/>' + ex.message, 'fail');
        }
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
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,


        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
        init: function () {
            try {
                _alertMessage = new alertMessage();
                _resultMessage = new resultMessage();
                _confirmMessage = new confirmMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show('程序加载中...', 'loading');
                basePageObj.initBasePage({
                    success: function () {
                        //初始化参数
                        initParameter({
                            success: function () {

                                creatWhereClause({
                                    success: function () {
                                        initGrid({
                                            success: function () {
                                                that.bindGrid({
                                                    success: function () {

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_qftj_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_qftj_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_qftj_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_qftj_list');
                                                        switch (that._pr_listtype) {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        _blockMessage.hidden();
                                                    },
                                                    fail: function (message) {
                                                        _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                                                    }
                                                });
                                            }
                                        });

                                    }
                                });

                                //初始化search
                                initSearchBaseCode({
                                    success: function () {
                                        initSearchControl({
                                            success: function () {
                                                setSearchModel({
                                                    success: function () {


                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    },
                    fail: function (message) {
                        _blockMessage.show(message, 'fail');
                    }
                });
            }
            catch (ex) {
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
            setTimeout(function () {
                $('#table_grid_tbl_ld_qftj_list').bootstrapTable("showLoading");

                _whereclause = _whereClauseString;
                if (_whereclause != '')
                {
                    _whereclause += ' and ';
                    }
                _whereclause += " f_ljqf>0";


                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_ycje^f_yslx^f_yslxid^f_tbbh^f_sfjlbjf^f_zt^f_ztid^f_bz^f_cbbh^f_cbbhid^f_cbxh^f_cbyxm^f_cbyid^f_cbzq^f_cbmc^f_yhbh^f_yhbhid^f_jfm^f_yhfz^f_yhfzid^f_dz^f_dh^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_tsyxzh^f_hth^f_sfzh^f_khrq^f_sbbh^f_sbbhid^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_bqzm^f_sqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_ljgl^f_lxth^f_sblx^f_sblxid^f_jllx^f_jllxid^f_tssbbh^f_ztsbh^f_rs^f_sbkj^f_sbkjid^f_sbfz^f_sbfzid^f_ztyhh^f_wxwybz^f_zfbwybz^f_gdyhwybz^f_yhm^f_zhcbrq^sys_id';

                var data = {
                    whereString: _whereclause,
                    orderByString: orderByString,
                    columnsString: columnsString,
                    pageSizeString: _pageSize,
                    pageIndexString: that._pr_gridpageindex,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_ld_qftj_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_qftj_list').bootstrapTable("loadJson", messageJson);

                        gridSelectedChange();
                        if (callBackFunction != undefined && callBackFunction != null) {
                            callBackFunction.success();
                        }
                    },
                    fail: function (message)
                    {
                        if (callBackFunction != undefined && callBackFunction != null) {
                            callBackFunction.fail(message);
                        }
                    }
                });
            }, 0);
        },
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------




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
        btn_command_search_onclick: function () {
            try {
                switch (that._pr_searchtype) {
                    case "1":
                        getSearchModel({
                            success: function () {
                                creatWhereClause({
                                    success: function () {
                                        clearSearchModel();

                                        that._pr_gridpageindex = '1';
                                        that._pr_gridselectids = '';
                                        that.bindGrid();
                                    }

                                });
                            },
                            fail: function (message) {
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
            catch (ex) {
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
        btn_command_search_1_onclick: function () {
            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_qftj_list').html('简单查询');
            $('#txt_command_search_tbl_ld_qftj_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_qftj_list').html('高级查询');
            $('#txt_command_search_tbl_ld_qftj_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_qftj_list').modal('show');

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
            //
            getSearchModel({
                success: function ()
                {
                    //
                    checkSearchModel({
                        success: function ()
                        {
                           //
                            creatWhereClause({
                                success: function () {
                                    clearSearchModel();
                                    $('#div_search_modal_tbl_ld_qftj_list').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function (message) {
                            if (message == '') {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }

                        }
                    });
                },
                fail: function (message) {
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
        btn_search_modal_cancle_onclick: function () {
            _validateMessage.hidden();
            $('#div_search_modal_tbl_ld_qftj_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_qftj_list').html('简单查询');
            $('#txt_command_search_tbl_ld_qftj_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_xs_onclick
        *  参数:
        *  小屏幕模式下打开高级查询模式
        *  
        */

        btn_command_search_xs_onclick: function () {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_qftj_list').html('高级查询');
            $('#txt_command_search_tbl_ld_qftj_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_qftj_list').modal('show');
        },
        /* 
*  
*  方法:btn_command_report_onclick
*  参数:
*  导出
*/
        btn_command_report_onclick: function ()
        {
            _ladda_btn_command_exp.start();
            var data = {
                whereString: _whereclause,
                clientInf: _clientInf
            };
            doAjaxFunction(_serviceUrl, 'ReportList', data, {
                success: function (result)
                {
                    _ladda_btn_command_exp.stop();
                    window.open(result, "_blank", "");
                },
                fail: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('导出失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },
        end: function () {
        }

    };
    return that;
})();

$(document).ready(function () {
    tbl_ld_qftj_list_Obj.init();
});



