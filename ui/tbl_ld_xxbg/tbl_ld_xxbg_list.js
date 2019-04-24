


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_xxbg_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xxbg.asmx/',
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
    _ladda_btn_command_showcolunm = null,
    _ladda_btn_command_exp = null,
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
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_bglxid = requestQuery('bglxid');
            that._pr_bglx = requestQuery('bglx');
            that._pr_isadmin = requestQuery('isadmin');

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
            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '0';
            }

            if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null')
            {
                that._pr_searchtype = '1';
            }
            if (that._pr_bglxid == null || that._pr_bglxid == '' || that._pr_bglxid == 'null')
            {
                that._pr_bglxid = '0';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_xxbg_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_xxbg_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_xxbg_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_xxbg_list').attr("disabled", true);
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
                $('#btn_command_delete_tbl_ld_xxbg_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_xxbg_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_xxbg_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_xxbg_list').removeClass('hidden');
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
        var url = '../tbl_ld_xxbg/tbl_ld_xxbg_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + that._pr_appcode;
        url += '&bglxid=' + that._pr_bglxid + '';
        url += '&bglx=' + that._pr_bglx + '';
        url += '&isadmin=' + that._pr_isadmin + '';

        url += '&fromurl=../tbl_ld_xxbg/tbl_ld_xxbg_list.html';
        url += '&fromurlparam={';
        url += '"bglxid":"' + that._pr_bglxid + '",';
        url += '"bglx":"' + that._pr_bglx + '",';
        url += '"isadmin":"' + that._pr_isadmin + '",';

        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
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


        codeServiceId += "0470^";


        codeServiceId += "0472^";

        codeServiceId += "0471^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0470', resultArray['0470']);


                    _baseCodeHashMap.put('codeservice_0472', resultArray['0472']);

                    _baseCodeHashMap.put('codeservice_0471', resultArray['0471']);

                    var columnsArray = [
                    { "id": "f_bgyy", "text": "变更原因" },
                    { "id": "f_fqr", "text": "发起人" },
                    { "id": "f_fqsj", "text": "发起时间" },
                    { "id": "f_xgr", "text": "修改人" },
                    { "id": "f_xgsj", "text": "修改时间" },
                    { "id": "f_zt", "text": "状态" },
                    { "id": "f_ly", "text": "来源" },
                    { "id": "f_bz", "text": "备注" },
                    { "id": "f_khbh", "text": "客户编号" },
                    ]
                    _baseCodeHashMap.put('codeservice_0814', columnsArray);
                    callBackFunction.success();
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

            var codeService_0470 = _baseCodeHashMap.get('codeservice_0470');


            var codeService_0472 = _baseCodeHashMap.get('codeservice_0472');

            var codeService_0471 = _baseCodeHashMap.get('codeservice_0471');

            controlObj.datetimeinit('search_f_fqsj_tbl_ld_xxbg_list_datefrom', 'search_f_fqsj_tbl_ld_xxbg_list_timefrom');
            controlObj.datetimeinit('search_f_fqsj_tbl_ld_xxbg_list_dateto', 'search_f_fqsj_tbl_ld_xxbg_list_timeto');

            controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_datefrom', 'search_f_fqsj_tbl_ld_xxbg_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_dateto', 'search_f_fqsj_tbl_ld_xxbg_list_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_bglx_tbl_ld_xxbg_list', codeService_0470);

            controlObj.multidropdownlistinit('search_f_ly_tbl_ld_xxbg_list', codeService_0472);

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_xxbg_list', codeService_0471);


            controlObj.datetimeinit('search_f_xgsj_tbl_ld_xxbg_list_datefrom', 'search_f_xgsj_tbl_ld_xxbg_list_timefrom');
            controlObj.datetimeinit('search_f_xgsj_tbl_ld_xxbg_list_dateto', 'search_f_xgsj_tbl_ld_xxbg_list_timeto');

            controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_datefrom', 'search_f_xgsj_tbl_ld_xxbg_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_dateto', 'search_f_xgsj_tbl_ld_xxbg_list_timeto', '1900-01-01 00:00:00');
            controlObj.multidropdownlistdisable('search_f_bglx_tbl_ld_xxbg_list', true);
            controlObj.multidropdownlistdisable('search_f_ly_tbl_ld_xxbg_list', true);

            //模态窗口
            $('#div_search_modal_tbl_ld_xxbg_list').modal({
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
                        $("#txt_command_search_tbl_ld_xxbg_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_xxbg_list = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_khbh);
                        controlObj.text('search_f_fqr_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_fqr);

                        controlObj.text('search_f_fqrid_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_fqrid);


                        controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_datefrom', 'search_f_fqsj_tbl_ld_xxbg_list_timefrom', tbl_ld_xxbg_list.f_fqsjfrom);
                        controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_dateto', 'search_f_fqsj_tbl_ld_xxbg_list_timeto', tbl_ld_xxbg_list.f_fqsjto);

                        controlObj.multidropdownlistid('search_f_bglx_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_bglxid);

                        controlObj.text('search_f_bgyy_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_bgyy);

                        controlObj.multidropdownlistid('search_f_ly_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_lyid);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_ztid);

                        controlObj.text('search_fk_tbl_maintable_sys_id_tbl_ld_xxbg_list', tbl_ld_xxbg_list.fk_tbl_maintable_sys_id);

                        controlObj.text('search_f_bz_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_bz);

                        controlObj.text('search_f_xgr_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_xgr);

                        controlObj.text('search_f_xgrid_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_xgrid);
                        controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_datefrom', 'search_f_xgsj_tbl_ld_xxbg_list_timefrom', tbl_ld_xxbg_list.f_xgsjfrom);
                        controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_dateto', 'search_f_xgsj_tbl_ld_xxbg_list_timeto', tbl_ld_xxbg_list.f_xgsjto);

                        controlObj.text('search_f_bgmc_tbl_ld_xxbg_list', tbl_ld_xxbg_list.f_bgmc);


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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_xxbg_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_xxbg_list = new Object();


                    tbl_ld_xxbg_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_xxbg_list');

                    tbl_ld_xxbg_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_xxbg_list');

                    tbl_ld_xxbg_list.f_fqr = controlObj.text('search_f_fqr_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_fqrid = controlObj.text('search_f_fqrid_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_fqsjfrom = controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_datefrom', 'search_f_fqsj_tbl_ld_xxbg_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_xxbg_list.f_fqsjto = controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_dateto', 'search_f_fqsj_tbl_ld_xxbg_list_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_xxbg_list.f_bglxid = controlObj.multidropdownlistid('search_f_bglx_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_bgyy = controlObj.text('search_f_bgyy_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_lyid = controlObj.multidropdownlistid('search_f_ly_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.fk_tbl_maintable_sys_id = controlObj.text('search_fk_tbl_maintable_sys_id_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_bz = controlObj.text('search_f_bz_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_xgr = controlObj.text('search_f_xgr_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_xgrid = controlObj.text('search_f_xgrid_tbl_ld_xxbg_list');


                    tbl_ld_xxbg_list.f_xgsjfrom = controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_datefrom', 'search_f_xgsj_tbl_ld_xxbg_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_xxbg_list.f_xgsjto = controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_dateto', 'search_f_xgsj_tbl_ld_xxbg_list_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_xxbg_list.f_bgmc = controlObj.text('search_f_bgmc_tbl_ld_xxbg_list');

                    that._pr_searchcontent.type2 = tbl_ld_xxbg_list;
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
            var tbl_ld_xxbg_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();
            if (tbl_ld_xxbg_list.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xxbg_list.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_xxbg_list.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_fqr.length > 200)
            {
                errorMessageHansMap.put('search_f_fqr_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_fqrid.length > 200)
            {
                errorMessageHansMap.put('search_f_fqrid_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_xxbg_list.f_bglxid.length > 200)
            {
                errorMessageHansMap.put('search_f_bglx_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_xxbg_list.f_bgyy.length > 200)
            {
                errorMessageHansMap.put('search_f_bgyy_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_lyid.length > 200)
            {
                errorMessageHansMap.put('search_f_ly_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.fk_tbl_maintable_sys_id.length > 200)
            {
                errorMessageHansMap.put('search_fk_tbl_maintable_sys_id_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_xgr.length > 200)
            {
                errorMessageHansMap.put('search_f_xgr_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_list.f_xgrid.length > 200)
            {
                errorMessageHansMap.put('search_f_xgrid_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_xxbg_list.f_bgmc.length > 200)
            {
                errorMessageHansMap.put('search_f_bgmc_tbl_ld_xxbg_list', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_value10);

                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_khbh);

                that._pr_searchcontent.type2.f_fqr = '';
                controlObj.text('search_f_fqr_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_fqr);


                that._pr_searchcontent.type2.f_fqrid = '';
                controlObj.text('search_f_fqrid_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_fqrid);


                that._pr_searchcontent.type2.f_fqsjfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_fqsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_datefrom', 'search_f_fqsj_tbl_ld_xxbg_list_timefrom', that._pr_searchcontent.type2.f_fqsjfrom);
                controlObj.datetime('search_f_fqsj_tbl_ld_xxbg_list_dateto', 'search_f_fqsj_tbl_ld_xxbg_list_timeto', that._pr_searchcontent.type2.f_fqsjto);


                that._pr_searchcontent.type2.f_bglxid = '';
                controlObj.multidropdownlistid('search_f_bglx_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_bglxid);


                that._pr_searchcontent.type2.f_bgyy = '';
                controlObj.text('search_f_bgyy_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_bgyy);


                that._pr_searchcontent.type2.f_lyid = '';
                controlObj.multidropdownlistid('search_f_ly_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_lyid);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.fk_tbl_maintable_sys_id = '';
                controlObj.text('search_fk_tbl_maintable_sys_id_tbl_ld_xxbg_list', that._pr_searchcontent.type2.fk_tbl_maintable_sys_id);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_bz);


                that._pr_searchcontent.type2.f_xgr = '';
                controlObj.text('search_f_xgr_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_xgr);


                that._pr_searchcontent.type2.f_xgrid = '';
                controlObj.text('search_f_xgrid_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_xgrid);


                that._pr_searchcontent.type2.f_xgsjfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_xgsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_datefrom', 'search_f_xgsj_tbl_ld_xxbg_list_timefrom', that._pr_searchcontent.type2.f_xgsjfrom);
                controlObj.datetime('search_f_xgsj_tbl_ld_xxbg_list_dateto', 'search_f_xgsj_tbl_ld_xxbg_list_timeto', that._pr_searchcontent.type2.f_xgsjto);


                that._pr_searchcontent.type2.f_bgmc = '';
                controlObj.text('search_f_bgmc_tbl_ld_xxbg_list', that._pr_searchcontent.type2.f_bgmc);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_xxbg_list").val('');
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

                                    whereClause += " f_fqr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_fqrid like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_fqsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bglx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bgyy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ly like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " fk_tbl_maintable_sys_id like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xgr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xgrid like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_xgsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bgmc like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_xxbg_list = that._pr_searchcontent.type2;



                        if (tbl_ld_xxbg_list.f_fqr.length > 0)
                        {
                            whereClause += " f_fqr like '%" + tbl_ld_xxbg_list.f_fqr + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_fqrid.length > 0)
                        {
                            whereClause += " f_fqrid like '%" + tbl_ld_xxbg_list.f_fqrid + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_fqsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_fqsj >= to_date('" + tbl_ld_xxbg_list.f_fqsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_xxbg_list.f_fqsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_fqsj <= to_date('" + tbl_ld_xxbg_list.f_fqsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_xxbg_list.f_bglxid.length > 0)
                        {
                            var elementArray = tbl_ld_xxbg_list.f_bglxid.split(',');
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
                                whereClause += "((','||f_bglxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_xxbg_list.f_bgyy.length > 0)
                        {
                            whereClause += " f_bgyy like '%" + tbl_ld_xxbg_list.f_bgyy + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_lyid.length > 0)
                        {
                            var elementArray = tbl_ld_xxbg_list.f_lyid.split(',');
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


                        if (tbl_ld_xxbg_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_xxbg_list.f_ztid.split(',');
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


                        if (tbl_ld_xxbg_list.fk_tbl_maintable_sys_id.length > 0)
                        {
                            whereClause += " fk_tbl_maintable_sys_id like '%" + tbl_ld_xxbg_list.fk_tbl_maintable_sys_id + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_xxbg_list.f_bz + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_xgr.length > 0)
                        {
                            whereClause += " f_xgr like '%" + tbl_ld_xxbg_list.f_xgr + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_xgrid.length > 0)
                        {
                            whereClause += " f_xgrid like '%" + tbl_ld_xxbg_list.f_xgrid + "%' and ";
                        }


                        if (tbl_ld_xxbg_list.f_xgsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_xgsj >= to_date('" + tbl_ld_xxbg_list.f_xgsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_xxbg_list.f_xgsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_xgsj <= to_date('" + tbl_ld_xxbg_list.f_xgsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_xxbg_list.f_bgmc.length > 0)
                        {
                            whereClause += " f_bgmc like '%" + tbl_ld_xxbg_list.f_bgmc + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_xxbg_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_xxbg_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_xxbg_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_xxbg_list .cc-badge-p').html(currentcount + '/' + allcount);

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
                                 
                                      if (row.f_ztid == '1')
                                      {
                                        return {
                                            disabled: true
                                        }
                                    }
                                    else
                                    {
                                        return {
                                            disabled: false,
                                            checked: false
                                        }
                                    }
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
                },


            ]

            var columnHashMap = new hashMap();
            columnHashMap.put('f_khbh', {
                       field: 'f_khbh',
                       title: '客户编号',
                       "class": '',
                       align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                       formatter: function (value, row, index)
                       {
                           var resultStr = value;

                           return resultStr;
                       }

            });
            columnHashMap.put('f_bgmc', {
                        field: 'f_bgmc',
                        title: '变更名称',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }

            });
            columnHashMap.put('f_bglx', {
                    field: 'f_bglx',
                    title: '变更类型',
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
            });
            columnHashMap.put('f_fqr', {
                    field: 'f_fqr',
                    title: '发起人',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }

            });
            columnHashMap.put('f_fqrid', {
                    field: 'f_fqrid',
                    title: '发起人id',
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
            });
            columnHashMap.put('f_fqsj', {

                    field: 'f_fqsj',
                    title: '发起时间',
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
            columnHashMap.put('f_bglxid', {





                    field: 'f_bglxid',
                    title: '变更类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }

            });
            columnHashMap.put('fk_tbl_maintable_sys_id', {






                    field: 'fk_tbl_maintable_sys_id',
                    title: 'maintable外键',
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

            });
            columnHashMap.put('f_xgr', {

                    field: 'f_xgr',
                    title: '修改人',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
            });
            columnHashMap.put('f_xgrid', {

                    field: 'f_xgrid',
                    title: '修改人id',
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
            });
            columnHashMap.put('f_xgsj', {
                    field: 'f_xgsj',
                    title: '修改时间',
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
            columnHashMap.put('f_bgyy', {
                field: 'f_bgyy',
                title: '变更原因',
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

            });
            columnHashMap.put('f_ly', {

                field: 'f_ly',
                title: '来源',
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
            });
            columnHashMap.put('f_lyid', {
                field: 'f_lyid',
                title: '来源id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }

            });
            columnHashMap.put('f_zt', {
                field: 'f_zt',
                title: '状态',
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

            });
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
            columnHashMap.put('f_bz', {
                field: 'f_bz',
                title: '备注',
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

            });
          
            var column = getCookie("tbl_ld_xxbg_list_column");

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
                var columnObj = columnHashMap.get('f_khbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_bgmc');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_bglx');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_fqr');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_fqsj');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_xgr');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_xgsj');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_bgyy');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_ly');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_bz');
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
                                if (row.f_ztid == '1')
                                {
                                return [
                                  '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                                  '<i class="glyphicon glyphicon-eye-open"></i>',
                                  '</a>'
                                    ].join('');
                                }
                                else
                                {
                                    return [
                                '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                                '<i class="glyphicon glyphicon-edit"></i>',
                                '</a>'
                                ].join('');
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

            $('#table_grid_tbl_ld_xxbg_list').bootstrapTable({
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
                    var rows = $('#table_grid_tbl_ld_xxbg_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_xxbg_list').bootstrapTable('getData');
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



        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (callBackFunction)
    {
        var codeService_0470 = _baseCodeHashMap.get('codeservice_0470');
        var bgmc = '';
        $.each(codeService_0470, function (i, u)
        {
            
            if (u['id'] == that._pr_bglxid)
            {
                bgmc = u['text'];
            }
        });
        
        that._pr_bglx = bgmc;
        var d = new Date();

        var lyid = '';
        switch (that._pr_isadmin)
        {
            case "0":
                lyid = '04720002';

                break;

            case "1":
                lyid = '04720001';
                
                break;
        }

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



            f_bgmc: '新建_' + basePageObj._userInfoJson.sys_username + '_' + bgmc + '_' + d.Format('yyyyMMddhhmmss'),

            f_bglxid: that._pr_bglxid,


            fk_tbl_maintable_sys_id: '',


            f_bgyy: '',

            f_bgyj: controlObj.fileuploadernewfileid(),


            f_fqr: basePageObj._userInfoJson.sys_username,


            f_fqrid: basePageObj._userInfoJson.sys_userid,

            f_fqsj: d.Format('yyyy-MM-dd hh:mm:ss'),


            f_xgr: '',


            f_xgrid: '',

            f_xgsj: '1900-01-01 00:00:00',

            f_ztid: '0',

            f_zt: '新建',

            f_lyid: lyid,


            f_bz: '',



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


            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_xxbg_showcolumnlist', codeservice_0814, null);

            //模态窗口
            $('#div_modal_tbl_ld_xxbg_sortlist').modal({
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
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,

        _pr_bglxid: '',

        _pr_bglx: '',
        //来源：管理员04720002   营业厅04720001
        _pr_isadmin: '',

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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_xxbg_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_xxbg_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_xxbg_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_xxbg_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_xxbg_list');
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
                var whereClause = _whereClauseString;
                if (whereClause == "")
                {
                    whereClause += " 1 = 1 ";
                }
                whereClause += " and  f_bglxid  = '" + that._pr_bglxid + "'";
                if (("^" + basePageObj._userInfoJson.sys_roles + "^").indexOf('^2022^') <= -1)
                {
                    whereClause += " and sys_creatuserid = '" + basePageObj._userInfoJson.sys_userid + "'";
                }
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_fqr^f_fqrid^f_fqsj^f_bglx^f_bglxid^f_bgyj^f_bgyy^f_ly^f_lyid^f_zt^f_ztid^fk_tbl_maintable_sys_id^f_bz^f_khxx^f_khjson^f_khbh^f_khbhid^f_xgr^f_xgrid^f_xgsj^f_bgmc^sys_id';

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


                        $('#table_grid_tbl_ld_xxbg_list').bootstrapTable("loadJson", messageJson);

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
                var currentcount = $('#table_grid_tbl_ld_xxbg_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_xxbg_list').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_xxbg_list').html('简单查询');
            $('#txt_command_search_tbl_ld_xxbg_list').removeAttr('disabled');
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
            controlObj.multidropdownlistid('search_f_bglx_tbl_ld_xxbg_list', that._pr_bglxid);
            if (that._pr_isadmin == '0')//管理员
            {
                controlObj.multidropdownlistid('search_f_ly_tbl_ld_xxbg_list', '04720002');
            } else if (that._pr_isadmin == '1')
            {
                controlObj.multidropdownlistid('search_f_ly_tbl_ld_xxbg_list', '04720001');
            }
            $('#btn_command_search_tbl_ld_xxbg_list').html('高级查询');
            $('#txt_command_search_tbl_ld_xxbg_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_xxbg_list').modal('show');
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
                                    $('#div_search_modal_tbl_ld_xxbg_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_xxbg_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_xxbg_list').html('简单查询');
            $('#txt_command_search_tbl_ld_xxbg_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_xxbg_list').html('高级查询');
            $('#txt_command_search_tbl_ld_xxbg_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_xxbg_list').modal('show');
        },
        //导出
        btn_command_report_onclick: function ()
        {

            _ladda_btn_command_exp.start();
            var column = getCookie('tbl_ld_xxbg_list_column');
            var columnname = getCookie('tbl_ld_xxbg_list_columnname');
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
                var columnsString = 'f_bgyy,f_fqr,f_fqsj,f_xgr,f_xgsj,f_zt,f_ly,f_bz,f_khbh';

                var colunmsName = '变更原因,发起人,发起时间,修改人,修改时间,状态,来源,备注,客户编号';

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
            var column = getCookie('tbl_ld_xxbg_list_column');
            if (column != null && column != 'undefined' && column != "")
            {

                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_xxbg_showcolumnlist', column);

            }
            $('#div_modal_tbl_ld_xxbg_showcolumnlist').modal('show');

        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {

            $('#div_modal_tbl_ld_xxbg_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();

        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {
            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_xxbg_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_xxbg_showcolumnlist');

            setCookieMinutes("tbl_ld_xxbg_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_xxbg_list_columnname", columnname, 5256000);

            $("#table_grid_tbl_ld_xxbg_list").bootstrapTable('destroy');

            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {

                            $('#div_modal_tbl_ld_xxbg_showcolumnlist').modal('hide');
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
    tbl_ld_xxbg_list_Obj.init();
});



