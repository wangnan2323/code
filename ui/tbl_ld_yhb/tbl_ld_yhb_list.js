


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_yhb_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_yhb.asmx/',
        _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '100',
        _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage = null,
    //按钮工具
    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    _ladda_btn_command_exp = null,
    _ladda_btn_command_showcolunm = null,
    //查询sql语句
    _whereClauseString = '',
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
            //sk??!!
            that._pr_ztids = requestQuery('ztids');

            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
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

            if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null')
            {
                that._pr_searchtype = '1';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_yhb_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_yhb_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_yhb_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_yhb_list').attr("disabled", true);
                    break;
            }
            //sk??!!
            if (that._pr_ztids == null || that._pr_ztids == '' || that._pr_ztids == 'null')
            {
                that._pr_ztids = '';
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
                $('#btn_command_delete_tbl_ld_yhb_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_yhb_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_yhb_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_yhb_list').removeClass('hidden');
            }
        }
        catch (ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:transToDetailPage
    *  参数:id, pagetype
    *  跳页方法
    */
    transToDetailPage = function (id, pagetype)
    {
        var url = '../tbl_ld_yhb/tbl_ld_yhb_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + that._pr_appcode;
        url += '&fromurl=../tbl_ld_yhb/tbl_ld_yhb_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"ztids":"' + that._pr_ztids + '",';//sk??!!
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
        url += '"searchtype":"' + that._pr_searchtype + '",';
        url += '"searchcontent":' + JSON.stringify(that._pr_searchcontent) + '';
        url += '}';
        commonObj.changeUrl(url, 'right-show');
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

        //codeServiceId += "0511^";

        //codeServiceId += "0512^";

        //codeServiceId += "0513^";

        //codeServiceId += "0514^";

        //codeServiceId += "0515^";

        codeServiceId += "0516^";

        codeServiceId += "0524^";
        codeServiceId += "0592^";

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

                    _baseCodeHashMap.put('codeservice_0516', resultArray['0516']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);

                    var columnsArray = [
                    { "id": "f_yhbh", "text": "	用户编号" },
                    { "id": "f_ztyhh", "text": "旧用户号" },
                    { "id": "f_yhm", "text": "用户名" },
                    { "id": "f_jfm", "text": "缴费名" },
                    { "id": "f_dz", "text": "地址" },
                    { "id": "f_yhfz", "text": "用户分组" },
                    { "id": "f_dh", "text": "电话" },
                    { "id": "f_dy", "text": "地域" },
                    { "id": "f_sc", "text": "水厂" },
                    { "id": "f_qy", "text": "区域" },
                    { "id": "f_pq", "text": "片区" },
                    { "id": "f_khrq", "text": "开户日期" },
                    { "id": "f_sfts", "text": "是否托收" },
                    { "id": "f_tsyx", "text": "	托收银行" },
                    { "id": "f_tsyxzh", "text": "托收银行账号" },
                    { "id": "f_htbh", "text": "	合同编号" },
                    //{ "id": "f_htfj", "text": "	合同附件" },
                    { "id": "f_sfzh", "text": "	身份证号" },
                    //{ "id": "f_sfzfj", "text": "身份证附件" },
                    { "id": "f_sfzzs", "text": "是否增值税" },
                    { "id": "f_zt", "text": "状态" },
                    { "id": "f_bz", "text": "备注" },
                    { "id": "f_khbh", "text": "	客户编号" },
                    //{ "id": "f_wxwybz", "text": "微信唯一标志      " },
                    //{ "id": "f_zfbwybz", "text": "支付宝唯一标志" },
                    //{ "id": "f_gdyxwybz", "text": "光大银行唯一标志" },
                    //{ "id": "f_qtfj", "text": "	其他附件" },
                    { "id": "f_htqdrq", "text": "合同签订 " }
                    ];

                    _baseCodeHashMap.put('codeservice_0814', columnsArray);

                    var sqlJson = {
                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0' order by sys_id",

                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and length(sys_orderid)=4 order by sys_orderid"
                    }

                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {

                            //$.each(messageJson["tbl_ldbm_yhfz"], function (i, u) {
                            //    if (messageJson["tbl_ldbm_yhfz"][i]["disabled"] == "true") {
                            //        messageJson["tbl_ldbm_yhfz"][i]["disabled"] = true;
                            //    }
                            //    else {
                            //        messageJson["tbl_ldbm_yhfz"][i]["disabled"] = false;
                            //    }
                            //});
                            _baseCodeHashMap.put('codeservice_0511', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_0512', messageJson["tbl_ldbm_dycq"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
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

            var codeService_0511 = _baseCodeHashMap.get('codeservice_0511');

            var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');

            var codeService_0516 = _baseCodeHashMap.get('codeservice_0516');

            var codeService_0592 = _baseCodeHashMap.get('codeservice_0592');
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            controlObj.multidropdownlistinit('search_f_yhfz_tbl_ld_yhb_list', codeService_0511);

            controlObj.datetimeinit('search_f_khrq_tbl_ld_yhb_list_datefrom', 'search_f_khrq_tbl_ld_yhb_list_timefrom');
            controlObj.datetimeinit('search_f_khrq_tbl_ld_yhb_list_dateto', 'search_f_khrq_tbl_ld_yhb_list_timeto');

            controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_datefrom', 'search_f_khrq_tbl_ld_yhb_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_dateto', 'search_f_khrq_tbl_ld_yhb_list_timeto', '1900-01-01 00:00:00');

            controlObj.singledropdownlistinit('search_f_dy_tbl_ld_yhb_list', codeService_0512, f_dy_onchange);

            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_yhb_list', codeService_0513, f_sc_onchange);

            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_yhb_list', codeService_0514, f_qy_onchange);

            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', codeService_0515, f_pq_onchange);

            controlObj.multidropdownlistinit('search_f_sfts_tbl_ld_yhb_list', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);

            controlObj.multidropdownlistinit('search_f_sfzzs_tbl_ld_yhb_list', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_yhb_list', codeService_0516);

            controlObj.multidropdownlistinit('search_f_tsyx_tbl_ld_yhb_list', codeService_0592);

            controlObj.datetimeinit('search_f_htqdrq_tbl_ld_yhb_list_datefrom', 'search_f_htqdrq_tbl_ld_yhb_list_timefrom');
            controlObj.datetimeinit('search_f_htqdrq_tbl_ld_yhb_list_dateto', 'search_f_htqdrq_tbl_ld_yhb_list_timeto');

            controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_datefrom', 'search_f_htqdrq_tbl_ld_yhb_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_dateto', 'search_f_htqdrq_tbl_ld_yhb_list_timeto', '1900-01-01 00:00:00');


            //模态窗口
            $('#div_search_modal_tbl_ld_yhb_list').modal({
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
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        //简单查询
                        $("#txt_command_search_tbl_ld_yhb_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_yhb_list = that._pr_searchcontent.type2;

                        // //
                        controlObj.text('search_f_value1_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_yhb_list', tbl_ld_yhb_list.f_value10);

                        controlObj.text('search_f_yhbh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_yhbh);

                        controlObj.text('search_f_ztyhh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_ztyhh);

                        controlObj.text('search_f_yhm_tbl_ld_yhb_list', tbl_ld_yhb_list.f_yhm);

                        controlObj.text('search_f_jfm_tbl_ld_yhb_list', tbl_ld_yhb_list.f_jfm);

                        controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_yhb_list', tbl_ld_yhb_list.f_yhfzid);

                        controlObj.text('search_f_dz_tbl_ld_yhb_list', tbl_ld_yhb_list.f_dz);

                        controlObj.text('search_f_dh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_dh);


                        controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_datefrom', 'search_f_khrq_tbl_ld_yhb_list_timefrom', tbl_ld_yhb_list.f_khrqfrom);
                        controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_dateto', 'search_f_khrq_tbl_ld_yhb_list_timeto', tbl_ld_yhb_list.f_khrqto);

                        controlObj.singledropdownlistid('search_f_dy_tbl_ld_yhb_list', tbl_ld_yhb_list.f_dyid);

                        var dy = { "added": { "id": tbl_ld_yhb_list.f_dyid } };
                        var sc = { "added": { "id": tbl_ld_yhb_list.f_scid } };
                        var qy = { "added": { "id": tbl_ld_yhb_list.f_qyid } };
                        ////
                        f_dy_onchange(dy, {

                            success: function ()
                            {
                                controlObj.singledropdownlistid('search_f_sc_tbl_ld_yhb_list', tbl_ld_yhb_list.f_scid);
                                f_sc_onchange(sc, {
                                    success: function ()
                                    {
                                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list', tbl_ld_yhb_list.f_qyid);


                                        f_qy_onchange(qy, {
                                            success: function ()
                                            {
                                                controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', tbl_ld_yhb_list.f_pqid);
                                            }
                                        });
                                    }
                                });
                            }
                        });

                        controlObj.multidropdownlistid('search_f_sfts_tbl_ld_yhb_list', tbl_ld_yhb_list.f_sftsid);

                        //controlObj.text('search_f_tsyx_tbl_ld_yhb_list', tbl_ld_yhb_list.f_tsyx);
                        //controlObj.text('search_f_tsyxid_tbl_ld_yhb_list', tbl_ld_yhb_list.f_tsyxid);

                        controlObj.text('search_f_tsyxzh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_tsyxzh);

                        controlObj.text('search_f_htbh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_htbh);

                        controlObj.text('search_f_sfzh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_sfzh);

                        controlObj.multidropdownlistid('search_f_sfzzs_tbl_ld_yhb_list', tbl_ld_yhb_list.f_sfzzsid);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_yhb_list', tbl_ld_yhb_list.f_ztid);

                        controlObj.multidropdownlistid('search_f_tsyx_tbl_ld_yhb_list', tbl_ld_yhb_list.f_tsyxid);

                        controlObj.text('search_f_bz_tbl_ld_yhb_list', tbl_ld_yhb_list.f_bz);

                        controlObj.text('search_f_khbh_tbl_ld_yhb_list', tbl_ld_yhb_list.f_khbh);

                        controlObj.text('search_f_wxwybz_tbl_ld_yhb_list', tbl_ld_yhb_list.f_wxwybz);

                        controlObj.text('search_f_zfbwybz_tbl_ld_yhb_list', tbl_ld_yhb_list.f_zfbwybz);

                        controlObj.text('search_f_gdyxwybz_tbl_ld_yhb_list', tbl_ld_yhb_list.f_gdyxwybz);

                        controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_datefrom', 'search_f_htqdrq_tbl_ld_yhb_list_timefrom', tbl_ld_yhb_list.f_htqdrqfrom);
                        controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_dateto', 'search_f_htqdrq_tbl_ld_yhb_list_timeto', tbl_ld_yhb_list.f_htqdrqto);

                        callBackFunction.success();

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
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_yhb_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_yhb_list = new Object();


                    tbl_ld_yhb_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_ztyhh = controlObj.text('search_f_ztyhh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_yhfzid = controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_dz = controlObj.text('search_f_dz_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_dh = controlObj.text('search_f_dh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_khrqfrom = controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_datefrom', 'search_f_khrq_tbl_ld_yhb_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_yhb_list.f_khrqto = controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_dateto', 'search_f_khrq_tbl_ld_yhb_list_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_yhb_list.f_dy = controlObj.singledropdownlistid('search_f_dy_tbl_ld_yhb_list');
                    tbl_ld_yhb_list.f_sc = controlObj.singledropdownlistid('search_f_sc_tbl_ld_yhb_list');
                    tbl_ld_yhb_list.f_qy = controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list');
                    tbl_ld_yhb_list.f_pq = controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_sftsid = controlObj.multidropdownlistid('search_f_sfts_tbl_ld_yhb_list');


                    //tbl_ld_yhb_list.f_tsyx = controlObj.text('search_f_tsyx_tbl_ld_yhb_list');

                    //tbl_ld_yhb_list.f_tsyxid = controlObj.text('search_f_tsyxid_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_tsyxzh = controlObj.text('search_f_tsyxzh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_htbh = controlObj.text('search_f_htbh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_sfzh = controlObj.text('search_f_sfzh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_sfzzsid = controlObj.multidropdownlistid('search_f_sfzzs_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_yhb_list');

                    tbl_ld_yhb_list.f_tsyxid = controlObj.multidropdownlistid('search_f_tsyx_tbl_ld_yhb_list');

                    tbl_ld_yhb_list.f_bz = controlObj.text('search_f_bz_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_wxwybz = controlObj.text('search_f_wxwybz_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_zfbwybz = controlObj.text('search_f_zfbwybz_tbl_ld_yhb_list');


                    tbl_ld_yhb_list.f_gdyxwybz = controlObj.text('search_f_gdyxwybz_tbl_ld_yhb_list');

                    tbl_ld_yhb_list.f_htqdrqfrom = controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_datefrom', 'search_f_htqdrq_tbl_ld_yhb_list_timefrom');
                    tbl_ld_yhb_list.f_htqdrqto = controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_dateto', 'search_f_htqdrq_tbl_ld_yhb_list_timeto');

                    that._pr_searchcontent.type2 = tbl_ld_yhb_list;
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
            var tbl_ld_yhb_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_yhb_list.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_ztyhh.length > 200)
            {
                errorMessageHansMap.put('search_f_ztyhh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_yhm.length > 200)
            {
                errorMessageHansMap.put('search_f_yhm_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_jfm.length > 200)
            {
                errorMessageHansMap.put('search_f_jfm_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_yhfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_yhfz_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_dz.length > 200)
            {
                errorMessageHansMap.put('search_f_dz_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_dh.length > 200)
            {
                errorMessageHansMap.put('search_f_dh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_yhb_list.f_dy.length > 200)
            {
                errorMessageHansMap.put('search_f_dy_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_sc.length > 200)
            {
                errorMessageHansMap.put('search_f_sc_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_qy.length > 200)
            {
                errorMessageHansMap.put('search_f_qy_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_pq.length > 200)
            {
                errorMessageHansMap.put('search_f_pq_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_sftsid.length > 200)
            {
                errorMessageHansMap.put('search_f_sfts_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_yhb_list.f_tsyx.length > 200) {
            //    errorMessageHansMap.put('search_f_tsyx_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            //}



            //if (tbl_ld_yhb_list.f_tsyxid.length > 200) {
            //    errorMessageHansMap.put('search_f_tsyxid_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            //}




            if (tbl_ld_yhb_list.f_tsyxzh.length > 200)
            {
                errorMessageHansMap.put('search_f_tsyxzh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_htbh.length > 200)
            {
                errorMessageHansMap.put('search_f_htbh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_sfzh.length > 200)
            {
                errorMessageHansMap.put('search_f_sfzh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_sfzzsid.length > 200)
            {
                errorMessageHansMap.put('search_f_sfzzs_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_yhb_list.f_tsyxid.length > 200)
            {
                errorMessageHansMap.put('search_f_tsyx_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_yhb_list.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_wxwybz.length > 200)
            {
                errorMessageHansMap.put('search_f_wxwybz_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_zfbwybz.length > 200)
            {
                errorMessageHansMap.put('search_f_zfbwybz_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_yhb_list.f_gdyxwybz.length > 200)
            {
                errorMessageHansMap.put('search_f_gdyxwybz_tbl_ld_yhb_list', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_ztyhh = '';
                controlObj.text('search_f_ztyhh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_ztyhh);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_jfm);


                that._pr_searchcontent.type2.f_yhfzid = '';
                controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_yhfzid);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_dz);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_dh);


                that._pr_searchcontent.type2.f_khrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_khrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_datefrom', 'search_f_khrq_tbl_ld_yhb_list_timefrom', that._pr_searchcontent.type2.f_khrqfrom);
                controlObj.datetime('search_f_khrq_tbl_ld_yhb_list_dateto', 'search_f_khrq_tbl_ld_yhb_list_timeto', that._pr_searchcontent.type2.f_khrqto);


                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.singledropdownlistid('search_f_dy_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_dyid);


                that._pr_searchcontent.type2.f_scid = '';
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_scid);


                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_pqid);


                that._pr_searchcontent.type2.f_sftsid = '';
                controlObj.multidropdownlistid('search_f_sfts_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_sftsid);


                //that._pr_searchcontent.type2.f_tsyx = '';
                //controlObj.text('search_f_tsyx_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_tsyx);


                //that._pr_searchcontent.type2.f_tsyxid = '';
                //controlObj.text('search_f_tsyxid_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_tsyxid);


                that._pr_searchcontent.type2.f_tsyxzh = '';
                controlObj.text('search_f_tsyxzh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_tsyxzh);


                that._pr_searchcontent.type2.f_htbh = '';
                controlObj.text('search_f_htbh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_htbh);


                that._pr_searchcontent.type2.f_sfzh = '';
                controlObj.text('search_f_sfzh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_sfzh);


                that._pr_searchcontent.type2.f_sfzzsid = '';
                controlObj.multidropdownlistid('search_f_sfzzs_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_sfzzsid);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_ztid);

                that._pr_searchcontent.type2.f_tsyxid = '';
                controlObj.multidropdownlistid('search_f_tsyx_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_tsyxid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_bz);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_wxwybz = '';
                controlObj.text('search_f_wxwybz_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_wxwybz);


                that._pr_searchcontent.type2.f_zfbwybz = '';
                controlObj.text('search_f_zfbwybz_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_zfbwybz);


                that._pr_searchcontent.type2.f_gdyxwybz = '';
                controlObj.text('search_f_gdyxwybz_tbl_ld_yhb_list', that._pr_searchcontent.type2.f_gdyxwybz);

                that._pr_searchcontent.type2.f_htqdrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_htqdrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_datefrom', 'search_f_htqdrq_tbl_ld_yhb_list_timefrom', that._pr_searchcontent.type2.f_htqdrqfrom);
                controlObj.datetime('search_f_htqdrq_tbl_ld_yhb_list_dateto', 'search_f_htqdrq_tbl_ld_yhb_list_timeto', that._pr_searchcontent.type2.f_htqdrqto);

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_yhb_list").val('');
                break;
        }

    },


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

                      controlObj.singledropdownlistinit('search_f_sc_tbl_ld_yhb_list', jsonArray, f_sc_onchange);
                      controlObj.singledropdownlistid('search_f_sc_tbl_ld_yhb_list', '-1');
                      // controlObj.singledropdownlist('search_f_sc_tbl_ld_yhb_list', '');


                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                      else
                      {
                          controlObj.singledropdownlistinit('search_f_qy_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                          controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list', '-1');
                          // controlObj.singledropdownlist('search_f_qy_tbl_ld_yhb_list', '');

                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_yhb_list', '');

                      }
                  }
              })
          }
          else
          {

              controlObj.singledropdownlistinit('search_f_sc_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
              controlObj.singledropdownlistid('search_f_sc_tbl_ld_yhb_list', '-1');
              //controlObj.singledropdownlist('search_f_sc_tbl_ld_yhb_list', '');


              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list', '-1');
              // controlObj.singledropdownlist('search_f_qy_tbl_ld_yhb_list', '');

              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_yhb_list', '');
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

                      controlObj.singledropdownlistinit('search_f_qy_tbl_ld_yhb_list', jsonArray, f_qy_onchange);
                      controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list', '-1');
                      //controlObj.singledropdownlist('search_f_qy_tbl_ld_yhb_list', '');

                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                      else
                      {


                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_yhb_list', '');
                      }
                  }
              })
          }
          else
          {

              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_yhb_list', '-1');
              //  controlObj.singledropdownlist('search_f_qy_tbl_ld_yhb_list', '');

              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_yhb_list', '');
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


                      controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', jsonArray, f_pq_onchange);
                      controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', '-1');
                      //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_yhb_list', '');

                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                  }
              })
          }
          else
          {
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_yhb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_yhb_list', '-1');
              //controlObj.singledropdownlist('search_f_pq_tbl_ld_yhb_list', '');
          }


      },

      //片区onchange事件
       f_pq_onchange = function (e)
       {
           var controlid = e.target.id;
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
    creatWhereClause = function (callBackFunction)
    {
        var whereClause = '';
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

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ztyhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dh like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_khrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfts like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tsyx like '%" + vv[i] + "%' or ";
                                    whereClause += " f_tsyxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tsyxzh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_htbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfzh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfzzs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_wxwybz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zfbwybz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_gdyxwybz like '%" + vv[i] + "%' or ";

                                    whereClause += " to_char(f_htqdrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    if (whereClause.length > 0)
                                    {
                                        whereClause = whereClause.substr(0, whereClause.length - 3);
                                    }
                                    whereClause += ") and ";
                                }
                            }
                            if (whereClause.length > 0)
                            {
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
                    if (that._pr_searchcontent.type2 != undefined)
                    {

                        var tbl_ld_yhb_list = that._pr_searchcontent.type2;



                        if (tbl_ld_yhb_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_yhb_list.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_ztyhh.length > 0)
                        {
                            whereClause += " f_ztyhh like '%" + tbl_ld_yhb_list.f_ztyhh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_yhb_list.f_yhm + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_yhb_list.f_jfm + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_yhfzid.length > 0)
                        {
                            var elementArray = tbl_ld_yhb_list.f_yhfzid.split(',');
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


                        if (tbl_ld_yhb_list.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_yhb_list.f_dz + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_dh.length > 0)
                        {
                            whereClause += " f_dh like '%" + tbl_ld_yhb_list.f_dh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_khrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_khrq >= to_date('" + tbl_ld_yhb_list.f_khrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_yhb_list.f_khrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_khrq <= to_date('" + tbl_ld_yhb_list.f_khrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_yhb_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid = '" + tbl_ld_yhb_list.f_dyid + "' and ";
                        }




                        if (tbl_ld_yhb_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid = '" + tbl_ld_yhb_list.f_scid + "' and ";
                        }




                        if (tbl_ld_yhb_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid = '" + tbl_ld_yhb_list.f_qyid + "' and ";
                        }




                        if (tbl_ld_yhb_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid = '" + tbl_ld_yhb_list.f_pqid + "' and ";

                        }


                        if (tbl_ld_yhb_list.f_sftsid.length > 0)
                        {
                            var elementArray = tbl_ld_yhb_list.f_sftsid.split(',');
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
                                whereClause += "((','||f_sfts||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }





                        //if (tbl_ld_yhb_list.f_tsyxid.length > 0) {
                        //    whereClause += " f_tsyxid like '%" + tbl_ld_yhb_list.f_tsyxid + "%' and ";
                        //}



                        if (tbl_ld_yhb_list.f_tsyxzh.length > 0)
                        {
                            whereClause += " f_tsyxzh like '%" + tbl_ld_yhb_list.f_tsyxzh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_htbh.length > 0)
                        {
                            whereClause += " f_htbh like '%" + tbl_ld_yhb_list.f_htbh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_sfzh.length > 0)
                        {
                            whereClause += " f_sfzh like '%" + tbl_ld_yhb_list.f_sfzh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_sfzzsid.length > 0)
                        {
                            var elementArray = tbl_ld_yhb_list.f_sfzzsid.split(',');
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
                                whereClause += "((','||f_sfzzs||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_yhb_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_yhb_list.f_ztid.split(',');
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

                        if (tbl_ld_yhb_list.f_tsyxid.length > 0)
                        {
                            var elementArray = tbl_ld_yhb_list.f_tsyxid.split(',');
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
                                whereClause += "((','||f_tsyxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_yhb_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_yhb_list.f_bz + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_yhb_list.f_khbh + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_wxwybz.length > 0)
                        {
                            whereClause += " f_wxwybz like '%" + tbl_ld_yhb_list.f_wxwybz + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_zfbwybz.length > 0)
                        {
                            whereClause += " f_zfbwybz like '%" + tbl_ld_yhb_list.f_zfbwybz + "%' and ";
                        }


                        if (tbl_ld_yhb_list.f_gdyxwybz.length > 0)
                        {
                            whereClause += " f_gdyxwybz like '%" + tbl_ld_yhb_list.f_gdyxwybz + "%' and ";
                        }

                        if (tbl_ld_yhb_list.f_htqdrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_htqdrq >= to_date('" + tbl_ld_yhb_list.f_htqdrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_yhb_list.f_htqdrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_htqdrq <= to_date('" + tbl_ld_yhb_list.f_htqdrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (whereClause.length > 0)
                        {
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
        if (that._pr_gridselectids == '')
        {
            $('#btn_command_clearselect_tbl_ld_yhb_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_yhb_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_yhb_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_yhb_list .cc-badge-p').html(currentcount + '/' + allcount);

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
            

            var columnsarray = [
             {
                 field: "_checkbox", checkbox: true,
                 formatter: function (value, row, index)
                 {
                     //根据gridselectids给Grid设置选中项
                     switch (that._pr_listtype)
                     {
                         //编辑模式
                         case "1":
                             {
                                 if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                 {
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
                                 if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                 {
                                     return {
                                         disabled: true,
                                         checked: true
                                     }
                                 }
                                 else
                                 {
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
             }
            ];

            var columnHashMap = new hashMap();
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
            columnHashMap.put('f_yhfz', {
                field: 'f_yhfz',
                title: "用户分组",
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
            columnHashMap.put('f_khrq', {
                field: 'f_khrq',
                title: "开户日期",
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
            columnHashMap.put('f_sfts', {
                field: 'f_sfts',
                title: "是否托收",
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
            columnHashMap.put('f_tsyx', {
                field: 'f_tsyx',
                title: "托收银行",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_tsyxzh', {
                field: 'f_tsyxzh',
                title: "托收银行账号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_htbh', {
                field: 'f_htbh',
                title: "合同编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_htfj', {
                field: 'f_htfj',
                title: "合同附件",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfzh', {
                field: 'f_sfzh',
                title: "身份证号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfzfj', {
                field: 'f_sfzfj',
                title: "身份证附件",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfzzs', {
                field: 'f_sfzzs',
                title: "是否增值税",
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
            columnHashMap.put('f_wxwybz', {
                field: 'f_wxwybz',
                title: "微信唯一标志",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_zfbwybz', {
                field: 'f_zfbwybz',
                title: "支付宝唯一标志",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_gdyxwybz', {
                field: 'f_gdyxwybz',
                title: "光大银行唯一标志",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_qtfj', {
                field: 'f_qtfj',
                title: "其他附件",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_htqdrq', {
                field: 'f_htqdrq',
                title: "合同签订日期",
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


            var column = getCookie("tbl_ld_yh_query_list_column");

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
                
                var columnObj = columnHashMap.get('f_yhbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yhm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_jfm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yhfz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_khrq');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_qy');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_pq');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_tsyxzh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_htbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sfzh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);


                columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_bz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

            }
            columnsarray.push({
                field: '', title: '操作',
                align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                formatter: function (value, row, index)
                {
                    switch (that._pr_listtype)
                    {
                        case "1":
                            return [
                            '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                            '<i class="glyphicon glyphicon-edit"></i>',
                            '</a>'
                            ].join('');
                            break;
                        case "2":
                            return [
                            '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                            '<i class="glyphicon glyphicon-eye-open"></i>',
                            '</a>'
                            ].join('');
                            break;
                    }
                },
                events: {
                    'click .view': function (e, value, row, index)
                    {
                        transToDetailPage(row.sys_id, '2');

                    },
                    'click .edit': function (e, value, row, index)
                    {
                        transToDetailPage(row.sys_id, '1');
                    }
                }
            });

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


            $('#table_grid_tbl_ld_yhb_list').bootstrapTable({
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
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
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
                    var rows = $('#table_grid_tbl_ld_yhb_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_yhb_list').bootstrapTable('getData');
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

     initDetailControl = function (callBackFunction)
     {
         try
         {
             var codeservice_sblx = _baseCodeHashMap.get('codeservice_0524');
            // messageJson["tbl_ldbm_yhfz"][i]["disabled"] = true;
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
             controlObj.singledropdownlistinit('detial_f_ysblx_tbl_ld_yhb_list', codeservice_sblx);
             //模态窗口
             $('#div_modal_tbl_ld_yhb_list').modal({
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

      //列显示弹出页
    initDetailControlShowColumn = function (callBackFunction)
    {
        try
        {

            var codeservice_0814 = _baseCodeHashMap.get('codeservice_0814');


            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_yh_query_showcolumnlist', codeservice_0814, null);
            //controlObj.checklistinit('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist', codeservice_0814, null, { width: '120' });

            //模态窗口
            $('#div_modal_tbl_ld_yh_query_showcolumnlist').modal({
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
    addDetailData = function (yhbh, callBackFunction)
    {
        // //
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


            f_yhbh: yhbh,


            f_ztyhh: '',


            f_yhm: '',


            f_jfm: '',


            f_dz: '',

            f_yhfzid: '',


            f_dh: '',

            f_dyid: '',

            f_scid: '',

            f_qyid: '',

            f_pqid: '',

            f_khrq: d.Format("yyyy-MM-dd"),

            f_sfts: 'false',


            f_tsyx: '',
            f_tsyxid: '',



            f_tsyxzh: '',


            f_htbh: '',

            f_htfj: controlObj.fileuploadernewfileid(),

            f_qtfj: controlObj.fileuploadernewfileid(),

            f_sfzh: '',

            f_sfzfj: controlObj.fileuploadernewfileid(),

            f_sfzzs: 'false',



            f_ztid: '0',


            f_bz: '',


            f_khbh: '',


            f_wxwybz: '',


            f_zfbwybz: '',


            f_gdyxwybz: '',

            f_htqdrq: d.Format("yyyy-MM-dd"),

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
        //状态IDs，如果状态为空，则显示全部数据，否则显示指定状态的数据
        _pr_ztids: '',
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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_yhb_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_yhb_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_yhb_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_yhb_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_yh_query_list');
                                                        switch (that._pr_listtype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
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
                                //根据不同用户菜单传递的ztids初始化查询detail的状态控件是不显示
                                switch (that._pr_ztids)
                                {
                                    case "0":
                                        $('#div_search_f_zt_tbl_ld_yhb_list').addClass("hidden");
                                        break;
                                    case "9":
                                        $('#div_search_f_zt_tbl_ld_yhb_list').addClass("hidden");
                                        break;
                                    case "1":
                                        $('#div_search_f_zt_tbl_ld_yhb_list').addClass("hidden");
                                        break;



                                }
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
                                                        initDetailControl({
                                                            success: function (result)
                                                            {

                                                            }
                                                        });

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
                $('#table_grid_tbl_ld_yhb_list').bootstrapTable("showLoading");

                var whereClause = _whereClauseString;

                //sk??!!
                if (that._pr_ztids != '')
                {
                    if (whereClause != "")
                    {
                        whereClause += " and ";
                    }
                    whereClause += " f_ztid in ('" + that._pr_ztids.replaceAll(',', '\',\'') + "')";
                }

                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_yhbh^f_ztyhh^f_yhm^f_jfm^f_yhfz^f_yhfzid^f_dz^f_dh^f_khrq^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sfts^f_tsyx^f_tsyxid^f_tsyxzh^f_htbh^f_qtfj^f_htfj^f_sfzh^f_sfzfj^f_sfzzs^f_zt^f_ztid^f_bz^f_khbh^f_wxwybz^f_zfbwybz^f_gdyxwybz^f_htqdrq^sys_id';

                var data = {
                    whereString: whereClause,
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

                        $('#table_grid_tbl_ld_yhb_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_yhb_list').bootstrapTable("loadJson", messageJson);

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

            $('#div_modal_tbl_ld_yhb_list').modal('show');


        },
        /* 
    *  
    *  方法:
    *  参数:
    *  新建时弹出modal 进行水表类型选择  
    */
        btn_modal_ok_onclick: function ()
        {
            var sblxid = controlObj.singledropdownlistid('detial_f_ysblx_tbl_ld_yhb_list');

            if (sblxid == '')
            {
                _alertMessage.show('水表类型不能为空', 'fail');

            }
            else
            {
                try
                {
                    var data = {
                        typeid: 'yh',
                        nodeid: sblxid
                    }
                    doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                        success: function (message)
                        {
                            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_khb_detail', '');
                            addDetailData(message, {
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
                        fail: function (message)
                        {
                            _blockMessage.show('获取水表表号失败' + message, 'fail');
                        }
                    });
                }
                catch (ex)
                {
                    _blockMessage.show('执行失败<br/>' + ex.message, 'fail');
                }
            }

        },
        /* 
       *  
       *  方法:
       *  参数:
       *  新建时弹出modal 进行水表类型选择  
       */
        btn_modal_cancle_onclick: function ()
        {
            $('#div_modal_tbl_ld_yhb_list').modal('hide');
            _ladda_btn_command_new.stop();
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
                var currentcount = $('#table_grid_tbl_ld_yhb_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_yhb_list').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_yhb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_yhb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_yhb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_yhb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_yhb_list').modal('show');
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
                    ////
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {
                                    clearSearchModel();
                                    $('#div_search_modal_tbl_ld_yhb_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_yhb_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_yhb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_yhb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_yhb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_yhb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_yhb_list').modal('show');
        },

        //导出
        btn_command_report_onclick: function ()
        {

            _ladda_btn_command_exp.start();

            var column = getCookie('tbl_ld_yh_query_list_column');
            var columnname = getCookie('tbl_ld_yh_query_list_columnname');

            if (_whereClauseString == "")
            {
                var where = " 1=1";
            }
            else
            {
                var where = _whereClauseString;
            }

            if (column != null && columnname != null && column != "" && columnname != "")
            {
                var columnsString = column;
                var colunmsName = columnname;
            }
            else
            {
                var columnsString = 'f_yhbh,f_yhm,f_jfm,f_yhfz,f_khrq,f_qy,f_pq,f_tsyxzh,f_htbh,f_sfzh,f_zt,f_bz';
                var colunmsName = '用户编号,用户名,缴费名,用户分组,开户日期,区域,片区,托收银行账号,合同编号,身份证号,状态,备注';
            }

            var orderByString = ' sys_id desc';            
            var data = {
                whereString: where,
                orderByString: orderByString,
                column: columnsString,
                columnname: colunmsName,
                clientInf: _clientInf
            };
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
            var column = getCookie('tbl_ld_yh_query_list_column');
            if (column != null && column != 'undefined' && column != "")
            {

                //controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist', column);

                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_yh_query_showcolumnlist', column);



            }
            $('#div_modal_tbl_ld_yh_query_showcolumnlist').modal('show');

        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {

            $('#div_modal_tbl_ld_yh_query_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();

        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {




            //var column = controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            //var columnname = controlObj.checklist('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');

            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_yh_query_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_yh_query_showcolumnlist');


            setCookieMinutes("tbl_ld_yh_query_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_yh_query_list_columnname", columnname, 5256000);

            $("#table_grid_tbl_ld_yhb_list").bootstrapTable('destroy');

            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {

                            $('#div_modal_tbl_ld_yh_query_showcolumnlist').modal('hide');
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
        end: function ()
        {
        }

    };
    return that;
})();

$(document).ready(function ()
{
    tbl_ld_yhb_list_Obj.init();
});



