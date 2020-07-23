




var tbl_ld_kh_search_part_Obj = (function () {
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
    _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',

    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage = null,

    //查询sql语句
    _whereClauseString = '',
    //用于记录当前的查询语句
    _whereclause = '',

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
                    $('#btn_command_search_tbl_ld_kh_search_part').html('简单查询');
                    $('#txt_command_search_tbl_ld_kh_search_part').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_kh_search_part').html('高级查询');
                    $('#txt_command_search_tbl_ld_kh_search_part').attr("disabled", true);
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
        codeServiceId += "0814^";
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray) {
                try {
                    
                    _baseCodeHashMap = new hashMap();
                    var codenull = [];
                    var px = [{ id: 'desc', text: '倒序' }, { id: 'asc', text: '正序' }];
                    var cbgx = [{ id: '0', text: '' }, { id: '1', text: '>' }, { id: '2', text: '>=' }, { id: '3', text: '<' }, { id: '4', text: '<=' }, { id: '5', text: '=' }];
                    _baseCodeHashMap.put('codeservice_0513', codenull);
                    _baseCodeHashMap.put('codeservice_0514', codenull);
                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);
                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);
                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);
                    _baseCodeHashMap.put('codeservice_0814', resultArray['0814']);
                    _baseCodeHashMap.put('codeservice_cbgx', cbgx);
                    _baseCodeHashMap.put('codeservice_px', px);
                    var sqlJson = {
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',
                        'tbl_ldbm_khfz': "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",
                    }
                    commonObj.querySqls(sqlJson, {
                        success: function (resultJson) {
                            
                            _baseCodeHashMap.put('codeservice_0512', resultJson["tbl_ldbm_dycq"]);
                            _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_sbfz', resultJson["tbl_ldbm_sbfz"]);
                            _baseCodeHashMap.put('codeservice_yhfz', resultJson["tbl_ldbm_yhfz"]);
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
            var codeservice_cbgx = _baseCodeHashMap.get('codeservice_cbgx');
            var codeservice_sbfz = _baseCodeHashMap.get('codeservice_sbfz');
            var codeservice_yhfz = _baseCodeHashMap.get('codeservice_yhfz');
            controlObj.singledropdownlistinit('search_f_dy_tbl_ld_kh_search_part', codeService_0512, f_dy_onchange);
            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_kh_search_part', codeService_0513, f_sc_onchange);
            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_kh_search_part', codeService_0514, f_qy_onchange);
            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', codeService_0515, f_pq_onchange);
            controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_kh_search_part', codeservice_cben);
            controlObj.multidropdownlistinit('search_f_sblx_tbl_ld_kh_search_part', codeService_0524);
            controlObj.multidropdownlistinit('search_f_yslx_tbl_ld_kh_search_part', codeService_0555);
            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_kh_search_part', codeservice_khfz);
            controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_kh_search_part', codeservice_sbfz);
            controlObj.multidropdownlistinit('search_f_yhfz_tbl_ld_kh_search_part', codeservice_yhfz);
            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_kh_search_part', codeService_0556);
            controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_kh_search_part_datefrom', 'search_f_zhcbrq_tbl_ld_kh_search_part_timefrom');
            controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_kh_search_part_dateto', 'search_f_zhcbrq_tbl_ld_kh_search_part_timeto');
            controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_datefrom', 'search_f_zhcbrq_tbl_ld_kh_search_part_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_dateto', 'search_f_zhcbrq_tbl_ld_kh_search_part_timeto', '1900-01-01 00:00:00');
            controlObj.datetimeinit('search_f_cbsj_tbl_ld_kh_search_part_datefrom', 'search_f_cbsj_tbl_ld_kh_search_part_timefrom');
            controlObj.datetimeinit('search_f_cbsj_tbl_ld_kh_search_part_dateto', 'search_f_cbsj_tbl_ld_kh_search_part_timeto');
            controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_datefrom', 'search_f_cbsj_tbl_ld_kh_search_part_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_dateto', 'search_f_cbsj_tbl_ld_kh_search_part_timeto', '1900-01-01 00:00:00');
            controlObj.singledropdownlistinit('search_f_cbgx_tbl_ld_kh_search_part', codeservice_cbgx, null);

            controlObj.singledropdownlistinit('search_f_sfqf_tbl_ld_kh_search_part', [{ id: 'true', text: '显示欠费' }, { id: 'false', text: '显示全部' }]);
            controlObj.singledropdownlistinit('search_f_ye_tbl_ld_kh_search_part', [{ id: 'true', text: '存在余额' }, { id: 'false', text: '不存在余额' }]);


            //模态窗口
            $('#div_search_modal_tbl_ld_kh_search_part').modal({
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
                        $("#txt_command_search_tbl_ld_kh_search_part").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined) {
                        //高级查询
                        var tbl_ld_kh_search_part = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_khbh);

                        controlObj.text('search_f_ztkhh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_ztkhh);

                        controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_cbbhid);

                        controlObj.text('search_f_cbyxm_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_cbyxm);

                        controlObj.text('search_f_yhbh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_yhbh);

                        controlObj.text('search_f_yhm_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_yhm);

                        controlObj.text('search_f_dz_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_dz);

                        controlObj.text('search_f_sbdz_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sbdz);

                        controlObj.text('search_f_dh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_dh);

                        controlObj.text('search_f_ljqf_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_ljqf);
                        controlObj.text('search_f_tjjzpwf_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_tjjzpwf);
                        controlObj.text('search_f_tjjzsf_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_tjjzsf);
                        controlObj.text('search_f_tssbbhid_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_tssbbhid);
                        controlObj.text('search_f_nljgl_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_nljgl);
                        controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_kh_search_part_date', 'search_f_zhcbrq_tbl_ld_kh_search_part_time');
                        controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_datefrom', 'search_f_zhcbrq_tbl_ld_kh_search_part_timefrom', tbl_ld_kh_search_part.f_zhcbrqfrom);
                        controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_dateto', 'search_f_zhcbrq_tbl_ld_kh_search_part_timeto', tbl_ld_kh_search_part.f_zhcbrqto);
                        controlObj.singledropdownlistid('search_f_dy_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_dyid);
                        var dy = { "added": { "id": tbl_ld_kh_search_part.f_dyid } };
                        var sc = { "added": { "id": tbl_ld_kh_search_part.f_scid } };
                        var qy = { "added": { "id": tbl_ld_kh_search_part.f_qyid } };
                        ////
                        f_dy_onchange(dy, {

                            success: function () {
                                controlObj.singledropdownlistid('search_f_sc_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_scid);
                                f_sc_onchange(sc, {
                                    success: function () {
                                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_qyid);
                                        f_qy_onchange(qy, {
                                            success: function () {
                                                controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_pqid);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        controlObj.text('search_f_tsyxzh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_tsyxzh);

                        controlObj.text('search_f_hth_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_hth);

                        controlObj.text('search_f_sfzh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sfzh);

                        controlObj.text('search_f_sbbh_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sbbh);

                        controlObj.text('search_f_lxth_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_lxth);

                        controlObj.multidropdownlistid('search_f_sblx_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sblxid);

                        controlObj.multidropdownlistid('search_f_yslx_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_yslxid);
                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_khfzid);
                        controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sbfzid);
                        controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_yhfzid);
                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_ztid);
                        controlObj.text('search_f_bz_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_bz);

                        controlObj.singledropdownlistid('search_f_sfqf_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sfqf);
                        controlObj.singledropdownlistid('search_f_ye_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_ye);
                        controlObj.text('search_f_sqysl_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_sqysl);
                        controlObj.text('search_f_jhysl_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_jhysl);
                        controlObj.text('search_f_ickljgl_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_ickljgl);

                        controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_datefrom', 'search_f_cbsj_tbl_ld_kh_search_part_timefrom', tbl_ld_kh_search_part.f_cbsjfrom);
                        controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_dateto', 'search_f_cbsj_tbl_ld_kh_search_part_timeto', tbl_ld_kh_search_part.f_cbsjto);
                        controlObj.singledropdownlistid('search_f_cbgx_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_cbgxid);
                        controlObj.text('search_f_cbsl_tbl_ld_kh_search_part', tbl_ld_kh_search_part.f_cbsl);
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
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_kh_search_part").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_kh_search_part = new Object();


                    tbl_ld_kh_search_part.f_value1 = controlObj.text('search_f_value1_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value2 = controlObj.text('search_f_value2_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value3 = controlObj.text('search_f_value3_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value4 = controlObj.text('search_f_value4_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value5 = controlObj.text('search_f_value5_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value6 = controlObj.text('search_f_value6_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value7 = controlObj.text('search_f_value7_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value8 = controlObj.text('search_f_value8_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value9 = controlObj.text('search_f_value9_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_value10 = controlObj.text('search_f_value10_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_khbh = controlObj.text('search_f_khbh_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_ztkhh = controlObj.text('search_f_ztkhh_tbl_ld_kh_search_part');

                    //
                    tbl_ld_kh_search_part.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_cbyxm = controlObj.text('search_f_cbyxm_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_yhm = controlObj.text('search_f_yhm_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_dz = controlObj.text('search_f_dz_tbl_ld_kh_search_part');

                    tbl_ld_kh_search_part.f_sbdz = controlObj.text('search_f_sbdz_tbl_ld_kh_search_part');

                    tbl_ld_kh_search_part.f_dh = controlObj.text('search_f_dh_tbl_ld_kh_search_part');

                    tbl_ld_kh_search_part.f_ljqf = controlObj.text('search_f_ljqf_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_tjjzpwf = controlObj.text('search_f_tjjzpwf_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_tjjzsf = controlObj.text('search_f_tjjzsf_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_tssbbhid = controlObj.text('search_f_tssbbhid_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_nljgl = controlObj.text('search_f_nljgl_tbl_ld_kh_search_part');

                    tbl_ld_kh_search_part.f_dy = controlObj.singledropdownlist('search_f_dy_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_sc = controlObj.singledropdownlist('search_f_sc_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_qy = controlObj.singledropdownlist('search_f_qy_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_pq = controlObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_tsyxzh = controlObj.text('search_f_tsyxzh_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_hth = controlObj.text('search_f_hth_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_sfzh = controlObj.text('search_f_sfzh_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_lxth = controlObj.text('search_f_lxth_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_yslxid = controlObj.multidropdownlistid('search_f_yslx_tbl_ld_kh_search_part');


                    tbl_ld_kh_search_part.f_sblxid = controlObj.multidropdownlistid('search_f_sblx_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_khfz = controlObj.multidropdownlist('search_f_khfz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_sbfz = controlObj.multidropdownlist('search_f_sbfz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_yhfz = controlObj.multidropdownlist('search_f_yhfz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_yhfzid = controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_zt = controlObj.multidropdownlist('search_f_zt_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_kh_search_part');

                    tbl_ld_kh_search_part.f_bz = controlObj.text('search_f_bz_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_zhcbrqfrom = controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_datefrom', 'search_f_zhcbrq_tbl_ld_kh_search_part_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_kh_search_part.f_zhcbrqto = controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_dateto', 'search_f_zhcbrq_tbl_ld_kh_search_part_timeto'); //dateto + ' ' + timeto; 

                    tbl_ld_kh_search_part.f_sfqf = controlObj.singledropdownlistid('search_f_sfqf_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_ye = controlObj.singledropdownlistid('search_f_ye_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_sqysl=controlObj.text('search_f_sqysl_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_jhysl=controlObj.text('search_f_jhysl_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_ickljgl=controlObj.text('search_f_ickljgl_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_cbsjfrom = controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_datefrom', 'search_f_cbsj_tbl_ld_kh_search_part_timefrom');
                    tbl_ld_kh_search_part.f_cbsjto = controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_dateto', 'search_f_cbsj_tbl_ld_kh_search_part_timeto');
                    tbl_ld_kh_search_part.f_cbgxid = controlObj.singledropdownlistid('search_f_cbgx_tbl_ld_kh_search_part');
                    tbl_ld_kh_search_part.f_cbsl = controlObj.text('search_f_cbsl_tbl_ld_kh_search_part');
                    that._pr_searchcontent.type2 = tbl_ld_kh_search_part;
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
            var tbl_ld_kh_search_part = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_kh_search_part.f_value1.length > 200) {
                errorMessageHansMap.put('search_f_value1_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value2.length > 200) {
                errorMessageHansMap.put('search_f_value2_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value3.length > 200) {
                errorMessageHansMap.put('search_f_value3_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value4.length > 200) {
                errorMessageHansMap.put('search_f_value4_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value5.length > 200) {
                errorMessageHansMap.put('search_f_value5_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value6.length > 200) {
                errorMessageHansMap.put('search_f_value6_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value7.length > 200) {
                errorMessageHansMap.put('search_f_value7_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value8.length > 200) {
                errorMessageHansMap.put('search_f_value8_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value9.length > 200) {
                errorMessageHansMap.put('search_f_value9_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_value10.length > 200) {
                errorMessageHansMap.put('search_f_value10_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_khbh.length > 200) {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_ztkhh.length > 200) {
                errorMessageHansMap.put('search_f_ztkhh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_cbbhid.length > 200) {
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_cbyxm.length > 200) {
                errorMessageHansMap.put('search_f_cbyxm_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_yhbh.length > 200) {
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_yhm.length > 200) {
                errorMessageHansMap.put('search_f_yhm_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_dz.length > 200) {
                errorMessageHansMap.put('search_f_dz_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_kh_search_part.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('search_f_sbdz_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_kh_search_part.f_dh.length > 200) {
                errorMessageHansMap.put('search_f_dh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_ljqf.length > 200)
            {
                errorMessageHansMap.put('search_f_ljqf_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_kh_search_part.f_tjjzpwf.length > 200)
            {
                errorMessageHansMap.put('search_f_tjjzpwf_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_tssbbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_tssbbhid_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_tjjzsf.length > 200)
            {
                errorMessageHansMap.put('search_f_tjjzsf_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_nljgl_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_dy.length > 200) {
                errorMessageHansMap.put('search_f_dy_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_kh_search_part.f_dyid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_dyid_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_kh_search_part.f_sc.length > 200) {
                errorMessageHansMap.put('search_f_sc_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_kh_search_part.f_scid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_scid_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_kh_search_part.f_qy.length > 200) {
                errorMessageHansMap.put('search_f_qy_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_kh_search_part.f_qyid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_qyid_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_kh_search_part.f_pq.length > 200) {
                errorMessageHansMap.put('search_f_pq_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_kh_search_part.f_pqid.length > 200)
            //{			
            //    errorMessageHansMap.put('search_f_pqid_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            //}		




            if (tbl_ld_kh_search_part.f_tsyxzh.length > 200) {
                errorMessageHansMap.put('search_f_tsyxzh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_hth.length > 200) {
                errorMessageHansMap.put('search_f_hth_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_sfzh.length > 200) {
                errorMessageHansMap.put('search_f_sfzh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_sbbh.length > 200) {
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_lxth.length > 200) {
                errorMessageHansMap.put('search_f_lxth_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_kh_search_part.f_sblxid.length > 200) {
                errorMessageHansMap.put('search_f_sblx_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_kh_search_part.f_yslxid.length > 200)
            {
                errorMessageHansMap.put('search_f_yslx_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_bz.length > 200) {
                errorMessageHansMap.put('search_f_bz_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_kh_search_part.f_sqysl.length > 200) {
                errorMessageHansMap.put('search_f_sqysl_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_jhysl.length > 200) {
                errorMessageHansMap.put('search_f_jhysl_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_ickljgl.length > 200) {
                errorMessageHansMap.put('search_f_ickljgl_tbl_ld_kh_search_part', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_kh_search_part.f_cbsjfrom == "1900-01-01 00:00:00"
                && tbl_ld_kh_search_part.f_cbsjto == "1900-01-01 00:00:00"
                && (tbl_ld_kh_search_part.f_cbgxid.length == 0 || tbl_ld_kh_search_part.f_cbgxid == '0')
                && tbl_ld_kh_search_part.f_cbsl.length == 0)
            {
            }
            else if (tbl_ld_kh_search_part.f_cbsjfrom != "1900-01-01 00:00:00"
                && tbl_ld_kh_search_part.f_cbsjto != "1900-01-01 00:00:00"
                && tbl_ld_kh_search_part.f_cbgxid.length != 0
                 && tbl_ld_kh_search_part.f_cbgxid != '0'
                && tbl_ld_kh_search_part.f_cbsl.length != 0)
            {
                if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_kh_search_part.f_cbsl))
                {
                    errorMessageHansMap.put('search_f_cbsl_tbl_ld_kh_search_part', '必须填写数字');
                }
            }
            else
            {
                if (tbl_ld_kh_search_part.f_cbsjfrom == "1900-01-01 00:00:00")
                {
                    errorMessageHansMap.put('search_f_cbsj_tbl_ld_kh_search_part_datefrom', '不能为空');
                }
                if (tbl_ld_kh_search_part.f_cbsjto == "1900-01-01 00:00:00")
                {
                    errorMessageHansMap.put('search_f_cbsj_tbl_ld_kh_search_part_dateto', '不能为空');
                }
                if (tbl_ld_kh_search_part.f_cbgxid.length == 0 || tbl_ld_kh_search_part.f_cbgxid == '0')
                {
                    errorMessageHansMap.put('search_f_cbgx_tbl_ld_kh_search_part', '不能为空');
                }
                if (tbl_ld_kh_search_part.f_cbsl.length == 0)
                {
                    errorMessageHansMap.put('search_f_cbsl_tbl_ld_kh_search_part', '不能为空');
                }
                if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_kh_search_part.f_cbsl))
                {
                    errorMessageHansMap.put('search_f_cbsl_tbl_ld_kh_search_part', '必须填写数字');
                }
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
                controlObj.text('search_f_value1_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_ztkhh = '';
                controlObj.text('search_f_ztkhh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_ztkhh);


                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_cbbhid);


                that._pr_searchcontent.type2.f_cbyxm = '';
                controlObj.text('search_f_cbyxm_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_cbyxm);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_dz);

                that._pr_searchcontent.type2.f_sbdz = '';
                controlObj.text('search_f_sbdz_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sbdz);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_dh);

                that._pr_searchcontent.type2.f_ljqf = '';
                controlObj.text('search_f_ljqf_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_ljqf);

               
                that._pr_searchcontent.type2.f_tjjzpwf = '';
                controlObj.text('search_f_tjjzpwf_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_tjjzpwf);
                that._pr_searchcontent.type2.f_tjjzsf = '';
                controlObj.text('search_f_tjjzsf_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_tjjzsf);
                that._pr_searchcontent.type2.f_tssbbhid = '';
                controlObj.text('search_f_tssbbhid_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_tssbbhid);
                that._pr_searchcontent.type2.f_nljgl = '';
                controlObj.text('search_f_nljgl_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_nljgl);




                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.singledropdownlistid('search_f_dy_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_dyid);




                that._pr_searchcontent.type2.f_scid = '';
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_scid);




                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_qyid);




                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_pqid);


                that._pr_searchcontent.type2.f_tsyxzh = '';
                controlObj.text('search_f_tsyxzh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_tsyxzh);


                that._pr_searchcontent.type2.f_hth = '';
                controlObj.text('search_f_hth_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_hth);


                that._pr_searchcontent.type2.f_sfzh = '';
                controlObj.text('search_f_sfzh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sfzh);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_lxth = '';
                controlObj.text('search_f_lxth_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_lxth);


                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.multidropdownlistid('search_f_sblx_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sblxid);
                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.multidropdownlistid('search_f_yslx_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_yslxid);
                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_khfzid);
                that._pr_searchcontent.type2.f_sbfzid = '';
                controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sbfzid);
                that._pr_searchcontent.type2.f_yhfzid = '';
                controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_yhfzid);
                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_ztid);
                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_bz);

                that._pr_searchcontent.type2.f_zhcbrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_zhcbrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_datefrom', 'search_f_zhcbrq_tbl_ld_kh_search_part_timefrom', that._pr_searchcontent.type2.f_zhcbrqfrom);
                controlObj.datetime('search_f_zhcbrq_tbl_ld_kh_search_part_dateto', 'search_f_zhcbrq_tbl_ld_kh_search_part_timeto', that._pr_searchcontent.type2.f_zhcbrqto);


                that._pr_searchcontent.type2.f_sfqf = '';
                controlObj.singledropdownlistid('search_f_sfqf_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sfqf);

                that._pr_searchcontent.type2.f_ye = '';
                controlObj.singledropdownlistid('search_f_ye_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_ye);
                that._pr_searchcontent.type2.f_sqysl = '';
                controlObj.text('search_f_sqysl_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_sqysl);
                that._pr_searchcontent.type2.f_jhysl = '';
                controlObj.text('search_f_jhysl_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_jhysl);
                that._pr_searchcontent.type2.f_ickljgl = '';
                controlObj.text('search_f_ickljgl_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_ickljgl);
                //缺少水表类型控件的代码--sk??!!

                that._pr_searchcontent.type2.f_cbsjfrom = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_datefrom', 'search_f_cbsj_tbl_ld_kh_search_part_timefrom', that._pr_searchcontent.type2.f_cbsjfrom);

                that._pr_searchcontent.type2.f_cbsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_cbsj_tbl_ld_kh_search_part_dateto', 'search_f_cbsj_tbl_ld_kh_search_part_timeto', that._pr_searchcontent.type2.f_cbsjto);

                that._pr_searchcontent.type2.f_cbgxid = '';
                controlObj.singledropdownlistid('search_f_cbgx_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_cbgxid);

                that._pr_searchcontent.type2.f_cbsl = '';
                controlObj.text('search_f_cbsl_tbl_ld_kh_search_part', that._pr_searchcontent.type2.f_cbsl);


                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined) {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_kh_search_part").val('');
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
                                    //whereClause += " f_ycje like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_cbmc like '%" + vv[i] + "%' or ";
                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_ljqf like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_sbkj like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_cbyxm like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_dh like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_ljqf like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_tjjzpwf like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_tjjzsf like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_tssbbhid like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_nljgl like '%" + vv[i] + "%' or ";


                                    //whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_scid like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_tsyxzh like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_hth like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_sfzh like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_lxth like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_zt like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_bz like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_yslx like '%" + vv[i] + "%' or ";
                                    //whereClause += " f_zhcbrq like '%" + vv[i] + "%' or ";
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
                        that._pr_whereClause = whereClause;
                    }


                    callBackFunction.success();
                }
                break;
            case "2":
                {
                    if (that._pr_searchcontent.type2 != undefined) {

                        var tbl_ld_kh_search_part = that._pr_searchcontent.type2;



                        if (tbl_ld_kh_search_part.f_khbh.length > 0) {
                            whereClause += " f_khbh like '%" + tbl_ld_kh_search_part.f_khbh + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_ztkhh.length > 0) {
                            whereClause += " f_ztkhh like '%" + tbl_ld_kh_search_part.f_ztkhh + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_cbbhid.length > 0) {
                            var elementArray = tbl_ld_kh_search_part.f_cbbhid.split(',');
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


                        if (tbl_ld_kh_search_part.f_cbyxm.length > 0) {
                            whereClause += " f_cbyxm like '%" + tbl_ld_kh_search_part.f_cbyxm + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_yhbh.length > 0) {
                            whereClause += " f_yhbh like '%" + tbl_ld_kh_search_part.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_yhm.length > 0) {
                            whereClause += " f_yhm like '%" + tbl_ld_kh_search_part.f_yhm + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_dz.length > 0) {
                            whereClause += " f_dz like '%" + tbl_ld_kh_search_part.f_dz + "%' and ";
                        }

                        if (tbl_ld_kh_search_part.f_sbdz.length > 0)
                        {
                            whereClause += " f_sbdz like '%" + tbl_ld_kh_search_part.f_sbdz + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_dh.length > 0) {
                            whereClause += " f_dh like '%" + tbl_ld_kh_search_part.f_dh + "%' and ";
                        }

                        if (tbl_ld_kh_search_part.f_ljqf.length > 0)
                        {
                            whereClause += " f_ljqf like '%" + tbl_ld_kh_search_part.f_ljqf + "%' and ";
                        }

                        if (tbl_ld_kh_search_part.f_tjjzpwf.length > 0)
                        {
                            whereClause += " f_tjjzpwf like '%" + tbl_ld_kh_search_part.f_tjjzpwf + "%' and ";
                        }
                        if (tbl_ld_kh_search_part.f_tjjzsf.length > 0)
                        {
                            whereClause += " f_tjjzsf like '%" + tbl_ld_kh_search_part.f_tjjzsf + "%' and ";
                        }
                        if (tbl_ld_kh_search_part.f_tssbbhid.length > 0)
                        {
                            whereClause += " f_tssbbhid like '%" + tbl_ld_kh_search_part.f_tssbbhid + "%' and ";
                        }
                        if (tbl_ld_kh_search_part.f_nljgl.length > 0)
                        {
                            whereClause += " f_nljgl like '%" + tbl_ld_kh_search_part.f_nljgl + "%' and ";
                        }

                        if (tbl_ld_kh_search_part.f_dyid.length > 0) {
                            whereClause += " f_dyid = '" + tbl_ld_kh_search_part.f_dyid + "' and ";
                        }





                        if (tbl_ld_kh_search_part.f_scid.length > 0) {
                            whereClause += " f_scid = '" + tbl_ld_kh_search_part.f_scid + "' and ";
                        }





                        if (tbl_ld_kh_search_part.f_qyid.length > 0) {
                            whereClause += " f_qyid = '" + tbl_ld_kh_search_part.f_qyid + "' and ";
                        }




                        if (tbl_ld_kh_search_part.f_pqid.length > 0) {
                            whereClause += " f_pqid = '" + tbl_ld_kh_search_part.f_pqid + "' and ";
                        }




                        if (tbl_ld_kh_search_part.f_tsyxzh.length > 0) {
                            whereClause += " f_tsyxzh like '%" + tbl_ld_kh_search_part.f_tsyxzh + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_hth.length > 0) {
                            whereClause += " f_hth like '%" + tbl_ld_kh_search_part.f_hth + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_sfzh.length > 0) {
                            whereClause += " f_sfzh like '%" + tbl_ld_kh_search_part.f_sfzh + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_sbbh.length > 0) {
                            whereClause += " f_sbbh like '%" + tbl_ld_kh_search_part.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_kh_search_part.f_lxth.length > 0) {
                            whereClause += " f_lxth like '%" + tbl_ld_kh_search_part.f_lxth + "%' and ";
                        }

                        if (tbl_ld_kh_search_part.f_zhcbrqfrom != '1900-01-01 00:00:00') {
                            whereClause += " f_zhcbrq >= to_date('" + tbl_ld_kh_search_part.f_zhcbrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }
                        if (tbl_ld_kh_search_part.f_zhcbrqto != '1900-01-01 00:00:00') {
                            whereClause += " f_zhcbrq <= to_date('" + tbl_ld_kh_search_part.f_zhcbrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_kh_search_part.f_sblxid.length > 0) {
                            var elementArray = tbl_ld_kh_search_part.f_sblxid.split(',');
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
                        if (tbl_ld_kh_search_part.f_yslxid.length > 0)
                        {
                            var elementArray = tbl_ld_kh_search_part.f_yslxid.split(',');
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
                        if (tbl_ld_kh_search_part.f_khfzid.length > 0) {
                            var elementArray = tbl_ld_kh_search_part.f_khfzid.split(',');
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
                        if (tbl_ld_kh_search_part.f_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_kh_search_part.f_sbfzid.split(',');
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
                                whereClause += "((','||f_sbfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_kh_search_part.f_yhfzid.length > 0)
                        {
                            var elementArray = tbl_ld_kh_search_part.f_yhfzid.split(',');
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
                                whereClause += "((','||f_yhfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_kh_search_part.f_ztid.length > 0) {
                            var elementArray = tbl_ld_kh_search_part.f_ztid.split(',');
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
                        if (tbl_ld_kh_search_part.f_bz.length > 0) {
                            whereClause += " f_bz like '%" + tbl_ld_kh_search_part.f_bz + "%' and ";
                        }
                        if (tbl_ld_kh_search_part.f_sfqf.length > 0 && tbl_ld_kh_search_part.f_sfqf == "true") {
                            whereClause += " f_ljqf > '0' and ";
                        }
                        if (tbl_ld_kh_search_part.f_ye.length > 0 && tbl_ld_kh_search_part.f_ye == "true")
                        {
                            whereClause += " f_ye is not null and to_number(f_ye) > 0 and ";
                        }
                        if (tbl_ld_kh_search_part.f_ye.length > 0 && tbl_ld_kh_search_part.f_ye == "false")
                        {
                            whereClause += " (f_ye = '0' or f_ye is null) and";
                        }
                        if (tbl_ld_kh_search_part.f_sqysl.length > 0) {
                            whereClause += " f_sqysl like '%" + tbl_ld_kh_search_part.f_sqysl + "%' and ";
                        }
                        if (tbl_ld_kh_search_part.f_jhysl.length > 0) {
                            whereClause += " f_jhysl like '%" + tbl_ld_kh_search_part.f_jhysl + "%' and ";
                        }
                        if (tbl_ld_kh_search_part.f_ickljgl.length > 0) {
                            whereClause += " f_ickljgl like '%" + tbl_ld_kh_search_part.f_ickljgl + "%' and ";
                        }

                        if (tbl_ld_kh_search_part.f_cbsjfrom != "1900-01-01 00:00:00"
                  && tbl_ld_kh_search_part.f_cbsjto != "1900-01-01 00:00:00"
                  && tbl_ld_kh_search_part.f_cbgxid.length != 0 && tbl_ld_kh_search_part.f_cbgxid !="0"
                  && tbl_ld_kh_search_part.f_cbsl.length != 0)
                        {
                            //if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_kh_search_part.f_cbsl))
                            //{
                            //    errorMessageHansMap.put('search_f_cbsl_tbl_ld_kh_search_part', '必须填写数字');
                            //}
                            //where f_khbh in (select f_khbh from tbl_ld_cbiao where  f_cbsj  between to_date('2018-10-01','yyyy-MM-dd hh24:mi:ss') and to_date('2018-12-30','yyyy-MM-dd hh24:mi:ss') and f_bqsl > 1000)
                            whereClause += " f_khbh in (select f_khbh from tbl_ld_cbiao where f_cbsj   ";
                            whereClause += " between to_date('" + tbl_ld_kh_search_part.f_cbsjfrom + "','yyyy-MM-dd hh24:mi:ss') and to_date('" + tbl_ld_kh_search_part.f_cbsjto + "','yyyy-MM-dd hh24:mi:ss') ";
                            whereClause += " and f_bqsl  ";

                            switch(tbl_ld_kh_search_part.f_cbgxid)
                            {
                                case "0":
                                    whereClause += " ";
                                    break;
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

                            whereClause += " " + tbl_ld_kh_search_part.f_cbsl + ")";
                            whereClause+= " and ";
                        }
                        if (whereClause.length > 0) {
                            whereClause = whereClause.substr(0, whereClause.length - 4);
                        }
                    }
                    that._pr_whereClause = whereClause;
                    callBackFunction.success();
                }
                break;
        }
    },



    getArea = function (id, callbackFunction) {
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
                      controlObj.singledropdownlistinit('search_f_sc_tbl_ld_kh_search_part', jsonArray, f_sc_onchange);
                      controlObj.singledropdownlistid('search_f_sc_tbl_ld_kh_search_part', '-1');
                      // controlObj.singledropdownlist('search_f_sc_tbl_ld_kh_search_part', '');
                      if (callbackfunction != undefined) {
                          callbackfunction.success();
                      }
                      else {
                          //controlObj.singledropdownlistinit('search_f_qy_tbl_ld_kh_search_part', _baseCodeHashMap.getWhereClause('codeservice_0514'), f_qy_onchange);
                          controlObj.singledropdownlistinit('search_f_qy_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                          controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part', '-1');
                          // controlObj.singledropdownlist('search_f_qy_tbl_ld_kh_search_part', '');
                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part', '');
                      }
                  }
              })
          }
          else {
              controlObj.singledropdownlistinit('search_f_sc_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
              controlObj.singledropdownlistid('search_f_sc_tbl_ld_kh_search_part', '-1');
              //controlObj.singledropdownlist('search_f_sc_tbl_ld_kh_search_part', '');
              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part', '-1');
              // controlObj.singledropdownlist('search_f_qy_tbl_ld_kh_search_part', '');
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part', '');
          }
      },
    //水厂onchange事件
      f_sc_onchange = function (e, callbackfunction) {
          // //
          if (e.added != undefined) {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray) {
                      controlObj.singledropdownlistinit('search_f_qy_tbl_ld_kh_search_part', jsonArray, f_qy_onchange);
                      controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part', '-1');
                      //controlObj.singledropdownlist('search_f_qy_tbl_ld_kh_search_part', '');
                      if (callbackfunction != undefined) {
                          callbackfunction.success();
                      }
                      else {
                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part', '');
                      }
                  }
              })
          }
          else {
              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_kh_search_part', '-1');
              //  controlObj.singledropdownlist('search_f_qy_tbl_ld_kh_search_part', '');
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part', '');
          }
      },
      //区域onchange事件
      f_qy_onchange = function (e, callbackfunction) {
          // //
          if (e.added != undefined) {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray) {
                      controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', jsonArray, f_pq_onchange);
                      controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', '-1');
                      //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part', '');
                      if (callbackfunction != undefined) {
                          callbackfunction.success();
                      }
                  }
              })
          }
          else {
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_kh_search_part', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_kh_search_part', '-1');
              //controlObj.singledropdownlist('search_f_pq_tbl_ld_kh_search_part', '');
          }
      },
      //片区onchange事件
       f_pq_onchange = function (e) {
           var controlid = e.target.id;
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
        //生成好的查询条件
        _pr_whereClause:'',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
        init: function (callbackfunction) {
            try {
                _blockMessage.show('程序加载中...', 'loading');
                        //初始化参数
                        initParameter({
                            success: function () {
                                _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_kh_search_part');

                                //初始化search
                                initSearchBaseCode({
                                    success: function () {

                                        
                                        initSearchControl({
                                            success: function () {
                                                setSearchModel({
                                                    success: function () {
                                                callbackfunction.success();

                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                });
            }
            catch (ex) {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------

        getWhereClause: function (callbackfunction) {
          
            setSearchModel({
                success: function () {
                    creatWhereClause({
                        success: function () {

                            callbackfunction.success(that._pr_whereClause);
                        },
                        fail: function (message) {
                            callbackfunction.fail(message);
                        }

                    });
                },
                fail: function (message) {
                    callbackfunction.fail(message);
                }
            });
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------
        //开始查询方法，用于调用层重写
        doSearch: function (whereClause)
        {

        },
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
                                    success: function ()
                                    {
                                       
                                        clearSearchModel();
                                        that.doSearch(that._pr_whereClause);
                                        that._pr_gridpageindex = '1';
                                        that._pr_gridselectids = '';
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
            $('#btn_command_search_tbl_ld_kh_search_part').html('简单查询');
            $('#txt_command_search_tbl_ld_kh_search_part').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_kh_search_part').html('高级查询');
            $('#txt_command_search_tbl_ld_kh_search_part').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_kh_search_part').modal('show');
            

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
                                    that.doSearch(that._pr_whereClause);
                                    $('#div_search_modal_tbl_ld_kh_search_part').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';

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
            $('#div_search_modal_tbl_ld_kh_search_part').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_kh_search_part').html('简单查询');
            $('#txt_command_search_tbl_ld_kh_search_part').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_kh_search_part').html('高级查询');
            $('#txt_command_search_tbl_ld_kh_search_part').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_kh_search_part').modal('show');


        },

        end: function () {
        }

    };
    return that;
})();

//$(document).ready(function () {
//    tbl_ld_kh_search_part_Obj.init();
//});






