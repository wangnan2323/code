


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_jmb_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jmb.asmx/',
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
            that._pr_isadmin = requestQuery('isadmin');
            that._pr_listtype = requestQuery('listtype');
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
            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '0';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_jmb_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_jmb_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_jmb_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_jmb_list').attr("disabled", true);
                    break;
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
                $('#btn_command_delete_tbl_ld_jmb_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_jmb_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_jmb_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_jmb_list').removeClass('hidden');
                switch (that._pr_isadmin)
                {
                    case '1':
                        break;
                    case '0':
                        // $('#btn_command_new_tbl_ld_jmb_list').removeClass('hidden');
                        $('#btn_command_new_tbl_ld_jmb_list').addClass('hidden');
                        break;
                }
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
        var url = '../tbl_ld_jmb/tbl_ld_jmb_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&isadmin=' + that._pr_isadmin + '';
        url += '&appcode=' + that._pr_appcode;
        url += '&fromurl=../tbl_ld_jmb/tbl_ld_jmb_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"isadmin":"' + that._pr_isadmin + '",';
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


        codeServiceId += "0562^";

        codeServiceId += "0563^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    var codenull = [];
                    _baseCodeHashMap.put('codeservice_0562', resultArray['0562']);

                    _baseCodeHashMap.put('codeservice_0563', resultArray['0563']);

                    _baseCodeHashMap.put('codeservice_0513', codenull);

                    _baseCodeHashMap.put('codeservice_0514', codenull);

                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    var columnsArray = [
                    { "id": "f_jmbh", "text": "减免编号" },
                    { "id": "f_khbh", "text": "客户编号" },
                    { "id": "f_sbbh", "text": "水表编号" },
                    { "id": "f_cbbh", "text": "抄表编号" },
                    { "id": "f_jmje", "text": "减免金额" },
                    { "id": "f_czr", "text": "操作人" },
                    { "id": "f_czsj", "text": "操作时间" },
                    { "id": "f_yhm", "text": "用户名" },
                    { "id": "f_jfm", "text": "缴费名" },
                    { "id": "f_sblx", "text": "水表类型" },
                    { "id": "f_yslx", "text": "用水类型" },
                    { "id": "f_khfz", "text": "客户分组" },
                    { "id": "f_cbenbh", "text": "抄本编号" },
                    { "id": "f_syqk", "text": "使用情况" },
                    { "id": "f_lxtkhh", "text": "老系统客户号" },
                    { "id": "f_yhbh", "text": "用户编号" },
                    { "id": "f_dz", "text": "地址" },
                    { "id": "f_dh", "text": "电话" },
                    { "id": "f_dy", "text": "地域" },
                    { "id": "f_sc", "text": "水厂" },
                    { "id": "f_qy", "text": "区域" },
                    { "id": "f_pq", "text": "片区" },
                    { "id": "f_zt", "text": "状态" },
                    { "id": "f_bz", "text": "备注" },
                    //{ "id": "f_cbenbhid", "text": "抄本编号id" },
                    //{ "id": "f_khbhid", "text": "客户编号id" },
                    //{ "id": "f_czrid", "text": "操作人id" },
                    //{ "id": "f_ztid", "text": "状态id" },
                    //{ "id": "f_yhbhid", "text": "用户编号id" },
                    //{ "id": "f_scid", "text": "水厂id" },
                    //{ "id": "f_dyid", "text": "地域id" },
                    //{ "id": "f_qyid", "text": "区域id" },
                    //{ "id": "f_pqid", "text": "片区id" },
                    //{ "id": "f_sbbhid", "text": "水表编号id" },
                    //{ "id": "f_sblxid", "text": "水表类型id" },
                    //{ "id": "f_yslxid", "text": "用水类型id" },
                    //{ "id": "f_cbbhid", "text": "抄表编号id" },
                    //{ "id": "f_khfzid", "text": "客户分组id" },
                    ];
                    _baseCodeHashMap.put('codeservice_0814', columnsArray);
                    var sqlJson = {
                        "tbl_ld_cben": "select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh",
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0' order by sys_id",
                        //"tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and length(sys_orderid)=4 order by sys_orderid",
                    }

                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {


                            //$.each(messageJson["tbl_ldbm_khfz"], function (i, u)
                            //{
                            //    if (messageJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                            //    {
                            //        messageJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                            //    }
                            //    else
                            //    {
                            //        messageJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                            //    }
                            //});
                            _baseCodeHashMap.put('codeservice_cben', messageJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
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
            var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
            //var codeService_0562 = _baseCodeHashMap.get('codeservice_0562');

            var codeService_0563 = _baseCodeHashMap.get('codeservice_0563');
            var codeservice_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');

            //controlObj.multidropdownlistinit('search_f_yy_tbl_ld_jmb_list', codeService_0562);
            controlObj.datetimeinit('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom');
            controlObj.datetimeinit('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto');

            controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_jmb_list', codeService_0563);

            controlObj.singledropdownlistinit('search_f_dy_tbl_ld_jmb_list', codeService_0512, f_dy_onchange);

            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_jmb_list', codeservice_khfz, f_khfz_onchange);
            controlObj.multidropdownlistinit('search_f_cbenbh_tbl_ld_jmb_list', codeservice_cben, f_cbenbh_onchange);

            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_jmb_list', codeService_0513, f_sc_onchange);

            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jmb_list', codeService_0514, f_qy_onchange);

            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', codeService_0515, f_pq_onchange);

            //模态窗口
            $('#div_search_modal_tbl_ld_jmb_list').modal({
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
                        $("#txt_command_search_tbl_ld_jmb_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_jmb_list = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value10);

                        controlObj.text('search_f_jmbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jmbh);

                        controlObj.text('search_f_khbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_khbh);

                        controlObj.text('search_f_khbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_khbhid);

                        controlObj.text('search_f_jmje_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jmje);

                        //controlObj.multidropdownlistid('search_f_yy_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yyid);

                        controlObj.text('search_f_czr_tbl_ld_jmb_list', tbl_ld_jmb_list.f_czr);

                        controlObj.text('search_f_czrid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_czrid);


                        controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom', tbl_ld_jmb_list.f_czsjfrom);
                        controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto', tbl_ld_jmb_list.f_czsjto);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_jmb_list', tbl_ld_jmb_list.f_ztid);

                        controlObj.text('search_f_bz_tbl_ld_jmb_list', tbl_ld_jmb_list.f_bz);

                        controlObj.text('search_f_jfbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jfbh);

                        controlObj.text('search_f_jfid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jfid);

                        controlObj.text('search_f_syqk_tbl_ld_jmb_list', tbl_ld_jmb_list.f_syqk);

                        controlObj.text('search_f_lxtkhh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_lxtkhh);

                        controlObj.text('search_f_yhbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yhbh);

                        controlObj.text('search_f_yhbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yhbhid);

                        controlObj.singledropdownlistid('search_f_dy_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dyid);

                        var dy = { "added": { "id": tbl_ld_jmb_list.f_dyid } };
                        var sc = { "added": { "id": tbl_ld_jmb_list.f_scid } };
                        var qy = { "added": { "id": tbl_ld_jmb_list.f_qyid } };
                        ////////;
                        f_dy_onchange(dy, {

                            success: function ()
                            {
                                controlObj.singledropdownlistid('search_f_sc_tbl_ld_jmb_list', tbl_ld_jmb_list.f_scid);
                                f_sc_onchange(sc, {
                                    success: function ()
                                    {
                                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list', tbl_ld_jmb_list.f_qyid);
                                        f_qy_onchange(qy, {
                                            success: function ()
                                            {
                                                controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', tbl_ld_jmb_list.f_pqid);
                                            }
                                        });
                                    }

                                });
                            }
                        });



                        controlObj.text('search_f_sbbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sbbh);

                        controlObj.text('search_f_sbbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sbbhid);

                        controlObj.text('search_f_sblx_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sblx);

                        controlObj.text('search_f_yslx_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yslx);

                        controlObj.text('search_f_sblxid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sblxid);

                        controlObj.text('search_f_yslxid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yslxid);

                        controlObj.text('search_f_yhm_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yhm);

                        controlObj.text('search_f_jfm_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jfm);

                        controlObj.text('search_f_dz_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dz);

                        controlObj.text('search_f_dh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dh);


                        controlObj.text('search_f_cbbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_cbbh);

                        controlObj.text('search_f_cbbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_cbbhid);

                        //controlObj.multidropdownlistid('search_f_khfzid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_khfzid);
                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_jmb_list', tbl_ld_jmb_list.f_khfzid);
                        controlObj.multidropdownlistid('search_f_cbenbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_cbenbhid);
                        //controlObj.singledropdownlistid('search_f_cbenbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_cbenbh);




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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_jmb_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_jmb_list = new Object();


                    tbl_ld_jmb_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_jmbh = controlObj.text('search_f_jmbh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_khbhid = controlObj.text('search_f_khbhid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_jmje = controlObj.text('search_f_jmje_tbl_ld_jmb_list');


                    //tbl_ld_jmb_list.f_yyid = controlObj.multidropdownlistid('search_f_yy_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_czr = controlObj.text('search_f_czr_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_czrid = controlObj.text('search_f_czrid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_czsjfrom = controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_jmb_list.f_czsjto = controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_jmb_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_bz = controlObj.text('search_f_bz_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_jfbh = controlObj.text('search_f_jfbh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_jfid = controlObj.text('search_f_jfid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_syqk = controlObj.text('search_f_syqk_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_lxtkhh = controlObj.text('search_f_lxtkhh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_jmb_list');

                    tbl_ld_jmb_list.f_dy = controlObj.singledropdownlistid('search_f_dy_tbl_ld_jmb_list');
                    tbl_ld_jmb_list.f_sc = controlObj.singledropdownlistid('search_f_sc_tbl_ld_jmb_list');
                    tbl_ld_jmb_list.f_qy = controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list');
                    tbl_ld_jmb_list.f_pq = controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list');

                    tbl_ld_jmb_list.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list');



                    tbl_ld_jmb_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_sbbhid = controlObj.text('search_f_sbbhid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_sblx = controlObj.text('search_f_sblx_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_jmb_list');

                    tbl_ld_jmb_list.f_sblxid = controlObj.text('search_f_sblxid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_yslxid = controlObj.text('search_f_yslxid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_dz = controlObj.text('search_f_dz_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_dh = controlObj.text('search_f_dh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_cbbh = controlObj.text('search_f_cbbh_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_cbbhid = controlObj.text('search_f_cbbhid_tbl_ld_jmb_list');


                    tbl_ld_jmb_list.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_jmb_list');

                    tbl_ld_jmb_list.f_cbenbhid = controlObj.multidropdownlistid('search_f_cbenbh_tbl_ld_jmb_list');

                    that._pr_searchcontent.type2 = tbl_ld_jmb_list;
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
            ////////;
            var tbl_ld_jmb_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if (tbl_ld_jmb_list.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_jmb_list.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_jmb_list.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_jmb_list.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_jmbh.length > 200)
            {
                errorMessageHansMap.put('search_f_jmbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_khbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_khbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_jmje.length > 200)
            {
                errorMessageHansMap.put('search_f_jmje_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_jmb_list.f_yyid.length > 200)
            //{
            //    errorMessageHansMap.put('search_f_yy_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            //}




            if (tbl_ld_jmb_list.f_czr.length > 200)
            {
                errorMessageHansMap.put('search_f_czr_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_czrid.length > 200)
            {
                errorMessageHansMap.put('search_f_czrid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_jmb_list.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_jfbh.length > 200)
            {
                errorMessageHansMap.put('search_f_jfbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_jfid.length > 200)
            {
                errorMessageHansMap.put('search_f_jfid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_syqk.length > 200)
            {
                errorMessageHansMap.put('search_f_syqk_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_lxtkhh.length > 200)
            {
                errorMessageHansMap.put('search_f_lxtkhh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_yhbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }





            if (tbl_ld_jmb_list.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_sbbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_sblx.length > 200)
            {
                errorMessageHansMap.put('search_f_sblx_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_yslx.length > 200)
            {
                errorMessageHansMap.put('search_f_yslx_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_jmb_list.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_sblxid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_yslxid.length > 200)
            {
                errorMessageHansMap.put('search_f_yslxid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_jmb_list.f_yhm.length > 200)
            {
                errorMessageHansMap.put('search_f_yhm_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_jfm.length > 200)
            {
                errorMessageHansMap.put('search_f_jfm_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_dz.length > 200)
            {
                errorMessageHansMap.put('search_f_dz_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_dh.length > 200)
            {
                errorMessageHansMap.put('search_f_dh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_jmb_list.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_jmb_list.f_khfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_khfz_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_jmb_list.f_cbenbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbenbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_jmb_list.f_dy.length > 200)
            {
                errorMessageHansMap.put('search_f_dyid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_sc.length > 200)
            {
                errorMessageHansMap.put('search_f_scid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_qy.length > 200)
            {
                errorMessageHansMap.put('search_f_qyid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_pq.length > 200)
            {
                errorMessageHansMap.put('search_f_pqid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_jmbh = '';
                controlObj.text('search_f_jmbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jmbh);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_khbhid = '';
                controlObj.text('search_f_khbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_khbhid);


                that._pr_searchcontent.type2.f_jmje = '';
                controlObj.text('search_f_jmje_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jmje);


                //that._pr_searchcontent.type2.f_yyid = '';
                //controlObj.multidropdownlistid('search_f_yy_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yyid);


                that._pr_searchcontent.type2.f_czr = '';
                controlObj.text('search_f_czr_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_czr);


                that._pr_searchcontent.type2.f_czrid = '';
                controlObj.text('search_f_czrid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_czrid);


                that._pr_searchcontent.type2.f_czsjfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_czsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom', that._pr_searchcontent.type2.f_czsjfrom);
                controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto', that._pr_searchcontent.type2.f_czsjto);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_bz);


                that._pr_searchcontent.type2.f_jfbh = '';
                controlObj.text('search_f_jfbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jfbh);


                that._pr_searchcontent.type2.f_jfid = '';
                controlObj.text('search_f_jfid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jfid);


                that._pr_searchcontent.type2.f_syqk = '';
                controlObj.text('search_f_syqk_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_syqk);


                that._pr_searchcontent.type2.f_lxtkhh = '';
                controlObj.text('search_f_lxtkhh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_lxtkhh);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_yhbhid = '';
                controlObj.text('search_f_yhbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yhbhid);


                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.singledropdownlistid('search_f_dy_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dyid);


                that._pr_searchcontent.type2.f_scid = '';
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_scid);


                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_pqid);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_sbbhid = '';
                controlObj.text('search_f_sbbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sbbhid);


                that._pr_searchcontent.type2.f_sblx = '';
                controlObj.text('search_f_sblx_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sblx);


                that._pr_searchcontent.type2.f_yslx = '';
                controlObj.text('search_f_yslx_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yslx);

                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.text('search_f_sblxid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sblxid);


                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.text('search_f_yslxid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yslxid);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jfm);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dz);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dh);

                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.text('search_f_cbbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_cbbhid);
                that._pr_searchcontent.type2.f_cbbh = '';
                controlObj.text('search_f_cbbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_cbbh);

                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_khfzid);

                that._pr_searchcontent.type2.f_cbenbhid = '';
                controlObj.multidropdownlistid('search_f_cbenbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_cbenbhid);

                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.text('search_f_dyid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dyid);


                that._pr_searchcontent.type2.f_scid = '';
                controlObj.text('search_f_scid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_scid);


                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.text('search_f_qyid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.text('search_f_pqid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_pqid);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_jmb_list").val('');
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

                                    whereClause += " f_jmbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jmje like '%" + vv[i] + "%' or ";

                                    //whereClause += " f_yy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_czr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_czrid like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_czsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_syqk like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                                    whereClause += " f_cbenbh like '%" + vv[i] + "%' or ";



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

                        var tbl_ld_jmb_list = that._pr_searchcontent.type2;



                        if (tbl_ld_jmb_list.f_jmbh.length > 0)
                        {
                            whereClause += " f_jmbh like '%" + tbl_ld_jmb_list.f_jmbh + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_jmb_list.f_khbh + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_khbhid.length > 0)
                        {
                            whereClause += " f_khbhid like '%" + tbl_ld_jmb_list.f_khbhid + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_jmje.length > 0)
                        {
                            whereClause += " f_jmje like '%" + tbl_ld_jmb_list.f_jmje + "%' and ";
                        }


                        //if (tbl_ld_jmb_list.f_yyid.length > 0)
                        //{
                        //    var elementArray = tbl_ld_jmb_list.f_yyid.split(',');
                        //    whereClause += '(';
                        //    $.each(elementArray, function (i, u)
                        //    {
                        //        if (i == 0)
                        //        {
                        //            whereClause += ' ';
                        //        }
                        //        else
                        //        {
                        //            whereClause += ' or ';
                        //        }
                        //        whereClause += "((','||f_yyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                        //    });
                        //    whereClause += ') and ';
                        //}


                        if (tbl_ld_jmb_list.f_czr.length > 0)
                        {
                            whereClause += " f_czr like '%" + tbl_ld_jmb_list.f_czr + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_czrid.length > 0)
                        {
                            whereClause += " f_czrid like '%" + tbl_ld_jmb_list.f_czrid + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_czsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_czsj >= to_date('" + tbl_ld_jmb_list.f_czsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_jmb_list.f_czsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_czsj <= to_date('" + tbl_ld_jmb_list.f_czsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_jmb_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_jmb_list.f_ztid.split(',');
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


                        if (tbl_ld_jmb_list.f_khfzid.length > 0)
                        {
                            var elementArray = tbl_ld_jmb_list.f_khfzid.split(',');
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

                        if (tbl_ld_jmb_list.f_cbenbhid.length > 0)
                        {
                            var elementArray = tbl_ld_jmb_list.f_cbenbhid.split(',');
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
                                whereClause += "((','||f_cbenbhid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_jmb_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_jmb_list.f_bz + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_jfbh.length > 0)
                        {
                            whereClause += " f_jfbh like '%" + tbl_ld_jmb_list.f_jfbh + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_jfid.length > 0)
                        {
                            whereClause += " f_jfid like '%" + tbl_ld_jmb_list.f_jfid + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_syqk.length > 0)
                        {
                            whereClause += " f_syqk like '%" + tbl_ld_jmb_list.f_syqk + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_lxtkhh.length > 0)
                        {
                            whereClause += " f_lxtkhh like '%" + tbl_ld_jmb_list.f_lxtkhh + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_jmb_list.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_yhbhid.length > 0)
                        {
                            whereClause += " f_yhbhid like '%" + tbl_ld_jmb_list.f_yhbhid + "%' and ";
                        }




                        if (tbl_ld_jmb_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_jmb_list.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_sbbhid.length > 0)
                        {
                            whereClause += " f_sbbhid like '%" + tbl_ld_jmb_list.f_sbbhid + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_sblx.length > 0)
                        {
                            whereClause += " f_sblx like '%" + tbl_ld_jmb_list.f_sblx + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_yslx.length > 0)
                        {
                            whereClause += " f_yslx like '%" + tbl_ld_jmb_list.f_yslx + "%' and ";
                        }

                        if (tbl_ld_jmb_list.f_sblxid.length > 0)
                        {
                            whereClause += " f_sblxid like '%" + tbl_ld_jmb_list.f_sblxid + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_yslxid.length > 0)
                        {
                            whereClause += " f_yslxid like '%" + tbl_ld_jmb_list.f_yslxid + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_jmb_list.f_yhm + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_jmb_list.f_jfm + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_jmb_list.f_dz + "%' and ";
                        }


                        if (tbl_ld_jmb_list.f_dh.length > 0)
                        {
                            whereClause += " f_dh like '%" + tbl_ld_jmb_list.f_dh + "%' and ";
                        }
                        if (tbl_ld_jmb_list.f_cbbh.length > 0)
                        {
                            whereClause += " f_cbbh like '%" + tbl_ld_jmb_list.f_cbbhid + "%' and ";
                        }



                        if (tbl_ld_jmb_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid = '" + tbl_ld_jmb_list.f_dyid + "' and ";
                        }


                        if (tbl_ld_jmb_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid = '" + tbl_ld_jmb_list.f_scid + "' and ";
                        }


                        if (tbl_ld_jmb_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid = '" + tbl_ld_jmb_list.f_qyid + "' and ";
                        }


                        if (tbl_ld_jmb_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid = '" + tbl_ld_jmb_list.f_pqid + "' and ";
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
            $('#btn_command_clearselect_tbl_ld_jmb_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_jmb_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_jmb_list .cc-badge-p').html(currentcount + '/' + allcount);

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
                    field: '_checkbox', checkbox: true,
                    formatter: function (value, row, index)
                    {


                        //根据gridselectids给Grid设置选中项
                        switch (that._pr_listtype)
                        {

                            //编辑模式
                            case "1":
                                {
                                    if (row.f_value10 == '1')
                                    {

                                        return {
                                            disabled: true
                                        }

                                    }
                                    switch (row.f_ztid)
                                    {
                                        case '0':
                                            return {
                                                disabled: false
                                            }
                                            break;
                                        case '1':
                                            return {
                                                disabled: true
                                            }
                                            break;
                                        case '9':
                                            return {
                                                disabled: true
                                            }
                                            break;
                                    }
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
                field: 'sys_id', title: 'sys_id', "class": 'gridcell-ordercolumn hidden',
                align: 'center',
                valign: 'middle',
                visible: true,
                sortable: false,
            }
            ];
            var columnHashMap = new hashMap();

            columnHashMap.put('f_jmbh',{
                field: 'f_jmbh',
                title: '减免编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_jmje',{
                field: 'f_jmje',
                title: '减免金额',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_khbh',{
                field: 'f_khbh',
                title: '客户编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_khbhid', {
                field: 'f_khbhid',
                title: '客户编号id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_yslx',{
                field: 'f_yslx',
                title: '用水类型',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_yslxid', {
                field: 'f_yslxid',
                title: '用水类型id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_jfbh',{
                field: 'f_jfbh',
                title: '缴费编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_jfid',{
                field: 'f_jfid',
                title: '缴费id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_syqk',{
                field: 'f_syqk',
                title: '使用情况',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_lxtkhh', {
                field: 'f_lxtkhh',
                title: '老系统客户号',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_yhbh', {
                field: 'f_yhbh',
                title: '用户编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_yhbhid', {
                field: 'f_yhbhid',
                title: '用户编号id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_yhm',{
                field: 'f_yhm',
                title: '用户名',
                "class": '',
                align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_jfm', {
                field: 'f_jfm',
                title: '缴费名',
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
                title: '地域',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_sc',{
                field: 'f_sc',
                title: '水厂',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_qy', {
                field: 'f_qy',
                title: '区域',
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
                title: '片区',
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
                title: '水表编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_sbbhid',{
                field: 'f_sbbhid',
                title: '水表编号id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_sblx', {
                field: 'f_sblx',
                title: '水表类型',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_sblxid', {
                field: 'f_sblxid',
                title: '水表类型id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_dz',{
                field: 'f_dz',
                title: '地址',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_dh',{
                field: 'f_dh',
                title: '电话',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_cbbhid', {
                field: 'f_cbbhid',
                title: '抄表编号id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });



            columnHashMap.put('f_cbenbhid', {
                field: 'f_cbenbhid',
                title: '抄本编号id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_cbenbh',{
                field: 'f_cbenbh',
                title: '抄本编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_khfz',{
                field: 'f_khfz',
                title: '客户分组',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_khfzid',{
                field: 'f_khfzid',
                title: '客户分组id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_dyid',{
                field: 'f_dyid',
                title: '地域id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_scid',{
                field: 'f_scid',
                title: '水厂id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_qyid',{
                field: 'f_qyid',
                title: '区域id',
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
            } );
            columnHashMap.put('f_pqid', {
                field: 'f_pqid',
                title: '片区id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_yy',{
                field: 'f_yy',
                title: '原因',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_yyid',{
                field: 'f_yyid',
                title: '原因id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            } );
            columnHashMap.put('f_czr',{
                field: 'f_czr',
                title: '操作人',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_czrid', {
                field: 'f_czrid',
                title: '操作人id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_czsj',{
                field: 'f_czsj',
                title: '操作时间',
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
            } );
            //columnHashMap.put('f_cbbh', {
            //    field: 'f_cbbh',
            //    title: '抄表编号',
            //    "class": '',
            //    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
            //    formatter: function (value, row, index)
            //    {
            //        var resultStr = value;
            //        return resultStr;
            //    }
            //});
            columnHashMap.put('f_cbbh',
           {
                field: 'f_cbbh',
                title: '抄表编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
           }
          );
            columnHashMap.put('f_value10', {
                field: 'f_value10',
                title: '来源',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            } );
            columnHashMap.put('f_zt',{
                field: 'f_zt',
                title: '状态',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            } );
            columnHashMap.put('f_ztid', {
                field: 'f_ztid',
                title: '状态id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_bz',{
                field: 'f_bz',
                title: '原因',
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
            } );
         
            var column = getCookie("tbl_ld_jmb_list_column");

            if (column != null && column != 'undefined' && column != "")
            {
                var ss = column.split(',');
                $.each(ss, function (i, u)
                {
                    var columnObj = columnHashMap.get(u.toLowerCase());
                    if (columnObj != undefined)
                    {
                        columnObj.class = '';
                        columnsarray.push(columnObj);
                    }

                });
            }
            else
            {

                var columnObj = columnHashMap.get('f_jmbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_jmje');
                columnObj["class"] = '';
                columnsarray.push(columnObj);


                var columnObj = columnHashMap.get('f_khbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_yslx');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_yhm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_jfm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_sblx');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_cbbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_khfz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_czr');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_czsj');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_value10');
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

                            switch (row.f_ztid)
                            {
                                case '0':
                                    return [
                                    '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                                    '<i class="glyphicon glyphicon-edit"></i>',
                                    '</a>'
                                    ].join('');
                                    break;
                                case '1':
                                    return [
                            '<a class="edit ml10" href="javascript:void(0)" title="浏览">',
                            '<i class="glyphicon glyphicon-eye-open"></i>',
                            '</a>'
                                    ].join('');
                                    break;
                                case '9':
                                    return [
                            '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                            '<i class="glyphicon glyphicon-eye-open"></i>',
                            '</a>'
                                    ].join('');
                                    break;
                            }
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


            $('#table_grid_tbl_ld_jmb_list').bootstrapTable({
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
                    var rows = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getData');
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



    getArea = function (id, callbackFunction)
    {
        ////////;
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

                /* 
            *  
            *  方法:f_khfz_onchange
            *  参数:changeEventParameter
            *  客户分组onchange事件
            */
            f_khfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },
                            /* 
            *  
            *  方法:f_cben_onchange
            *  参数:changeEventParameter
            *  客户分组onchange事件
            */
             f_cbenbh_onchange = function (e)
             {
                 var controlid = e.target.id;
             },

    //地域onchange事件
      f_dy_onchange = function (e, callbackfunction)
      {
          // //////;
          if (e.added != undefined)
          {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray)
                  {

                      controlObj.singledropdownlistinit('search_f_sc_tbl_ld_jmb_list', jsonArray, f_sc_onchange);
                      controlObj.singledropdownlistid('search_f_sc_tbl_ld_jmb_list', '-1');
                      // controlObj.singledropdownlist('search_f_sc_tbl_ld_jmb_list', '');


                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                      else
                      {
                          controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                          controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list', '-1');
                          // controlObj.singledropdownlist('search_f_qy_tbl_ld_jmb_list', '');

                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_jmb_list', '');

                      }
                  }
              })
          }
          else
          {

              controlObj.singledropdownlistinit('search_f_sc_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
              controlObj.singledropdownlistid('search_f_sc_tbl_ld_jmb_list', '-1');
              //controlObj.singledropdownlist('search_f_sc_tbl_ld_jmb_list', '');


              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list', '-1');
              // controlObj.singledropdownlist('search_f_qy_tbl_ld_jmb_list', '');

              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_jmb_list', '');
          }


      },

    //水厂onchange事件
      f_sc_onchange = function (e, callbackfunction)
      {
          // //////;
          if (e.added != undefined)
          {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray)
                  {

                      controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jmb_list', jsonArray, f_qy_onchange);
                      controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list', '-1');
                      //controlObj.singledropdownlist('search_f_qy_tbl_ld_jmb_list', '');

                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                      else
                      {


                          controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                          controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', '-1');
                          //controlObj.singledropdownlist('search_f_pq_tbl_ld_jmb_list', '');
                      }
                  }
              })
          }
          else
          {

              controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
              controlObj.singledropdownlistid('search_f_qy_tbl_ld_jmb_list', '-1');
              //  controlObj.singledropdownlist('search_f_qy_tbl_ld_jmb_list', '');

              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', '-1');
              // controlObj.singledropdownlist('search_f_pq_tbl_ld_jmb_list', '');
          }


      },

      //区域onchange事件
      f_qy_onchange = function (e, callbackfunction)
      {
          // //////;
          if (e.added != undefined)
          {
              var nodeid = e.added.id;
              getArea(nodeid, {
                  success: function (jsonArray)
                  {


                      controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', jsonArray, f_pq_onchange);
                      controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', '-1');
                      //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_jmb_list', '');

                      if (callbackfunction != undefined)
                      {
                          callbackfunction.success();
                      }
                  }
              })
          }
          else
          {
              controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jmb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
              controlObj.singledropdownlistid('search_f_pq_tbl_ld_jmb_list', '-1');
              //controlObj.singledropdownlist('search_f_pq_tbl_ld_jmb_list', '');
          }


      },

      //片区onchange事件
       f_pq_onchange = function (e)
       {
           var controlid = e.target.id;
       },

        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (callBackFunction)
    {
        ////////;

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


            f_jmbh: '',

            f_khbh: '',


            f_khbhid: '',

            //减免金额	
            f_jmje: '0',

            //f_yyid: '',


            f_czr: basePageObj._userInfoJson.sys_username,


            f_czrid: basePageObj._userInfoJson.sys_userid,
            //操作时间                   
            f_czsj: d.Format('yyyy-MM-dd hh:mm:ss'),

            f_ztid: '0',


            f_bz: '',


            f_jfbh: '',


            f_jfid: '',


            f_syqk: '',


            f_lxtkhh: '',


            f_yhbh: '',


            f_yhbhid: '',


            f_dy: '',


            f_dyid: '',


            f_sc: '',


            f_scid: '',


            f_qy: '',


            f_qyid: '',


            f_pq: '',


            f_pqid: '',


            f_yhm: '',


            f_jfm: '',


            f_dz: '',


            f_dh: '',

            f_cbbh: '',

            f_khfzid: '',
            f_cbenbhid: '',

            f_sbbh: '',


            f_sbbhid: '',


            f_sblx: '',


            f_yslx: '',

            f_sblxid: '',


            f_yslxid: '',



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
    //列显示弹出页
    initDetailControlShowColumn = function (callBackFunction)
    {
        try
        {

            var codeservice_0814 = _baseCodeHashMap.get('codeservice_0814');


            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_jmb_showcolumnlist', codeservice_0814, null);

            //模态窗口
            $('#div_modal_tbl_ld_jmb_sortlist').modal({
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
        //人员类型，0：是管理员可回滚减免  1：不能回滚减免
        _pr_isadmin: '',
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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_jmb_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_jmb_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_jmb_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_imb_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_jmb_list');
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
                                                        initDetailControlShowColumn({
                                                            success: function ()
                                                            {

                                                            }
                                                        });

                                                    }
                                                });
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
                $('#table_grid_tbl_ld_jmb_list').bootstrapTable("showLoading");
                var whereClause = _whereClauseString;
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jmbh^f_khbh^f_khbhid^f_jmje^f_czr^f_czrid^f_czsj^f_zt^f_ztid^f_bz^f_jfbh^f_jfid^f_syqk^f_lxtkhh^f_yhbh^f_yhbhid^f_dy^f_sc^f_qy^f_pq^f_sbbh^f_sbbhid^f_sblx^f_yslx^f_sblxid^f_yslxid^f_yhm^f_jfm^f_dz^f_dh^f_khbh^f_khbhid^f_cbenbh^f_cbenbhid^f_dyid^f_scid^f_qyid^f_pqid^f_cbbh^sys_id^f_khfz';

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

                        $('#table_grid_tbl_ld_jmb_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_jmb_list').bootstrapTable("loadJson", messageJson);

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
                var currentcount = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_jmb_list').bootstrapTable('uncheckAll');
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
            // //////;
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
            $('#btn_command_search_tbl_ld_jmb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_jmb_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_2_onclick
        *  参数:
        *  高级查询模式
        */
        btn_command_search_2_onclick: function ()
        {
            ////////;
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_jmb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_jmb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_jmb_list').modal('show');
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
            // //////;
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
                                    $('#div_search_modal_tbl_ld_jmb_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_jmb_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_jmb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_jmb_list').removeAttr('disabled');
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
            ////////;
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_jmb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_jmb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_jmb_list').modal('show');
        },
        //导出
        btn_command_report_onclick: function () {
            _ladda_btn_command_exp.start();
            //    var where = " 1=1";
            //}
            //else {
            //    var where = _whereClauseString;
            //}
            //var orderByString = ' sys_id desc';
            //var columnsString = 'f_jmbh,f_jmje,f_khbh,f_yslx,f_yhm,f_jfm,f_sblx,f_cbenbh,f_khfz,f_czr,f_czsj,f_zt,f_bz';
            //var colunmsName = '减免编号,减免金额,客户编号,用水类型,用户名,缴费名,水表类型,抄本编号,客户分组,操作人,操作时间,状态,原因';
                 
            var column = getCookie('tbl_ld_jmb_list_column');
            var columnname = getCookie('tbl_ld_jmb_list_columnname');
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
                var columnsString = 'f_jmbh,f_jmje,f_khbh,f_yslx,f_yhm,f_jfm,f_sblx,f_cbenbh,f_khfz,f_czr,f_czsj,f_zt,f_bz';
                var colunmsName = '减免编号,减免金额,客户编号,用水类型,用户名,缴费名,水表类型,抄本编号,客户分组,操作人,操作时间,状态,原因';
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
            var column = getCookie('tbl_ld_jmb_list_column');
            if (column != null && column != 'undefined' && column != "")
            {

                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_jmb_showcolumnlist', column);

            }
            $('#div_modal_tbl_ld_jmb_showcolumnlist').modal('show');

        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {

            $('#div_modal_tbl_ld_jmb_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();

        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {




            //var column = controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            //var columnname = controlObj.checklist('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');

            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_jmb_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_jmb_showcolumnlist');


            setCookieMinutes("tbl_ld_jmb_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_jmb_list_columnname", columnname, 5256000);

            $("#table_grid_tbl_ld_jmb_list").bootstrapTable('destroy');

            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {

                            $('#div_modal_tbl_ld_jmb_showcolumnlist').modal('hide');
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
    tbl_ld_jmb_list_Obj.init();
});
