


var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_report_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_report.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,


        _ladda_btn_command_save = null,
    _ladda_btn_command_submit = null,
      _ladda_btn_command_rollback = null,
       _ladda_btn_command_download = null,


    //where语句
    _whereClauseString = '',

    //当前正在编辑的ID
    _gridEditId = '',
    //上一次的滚动条位置
    _gridStatusScrollTop = 0,
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
            that._pr_searchcontent = requestQuery('searchcontent');

            that._pr_bblx = requestQuery('bblx');
            that._pr_isadmin = requestQuery('isadmin');
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

            if (that._pr_bblx == null || that._pr_bblx == '' || that._pr_bblx == 'null')
            {
                that._pr_bblx = '';
            }

            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '1';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_report_modallist').html('简单查询');
                    $('#txt_command_search_tbl_ld_report_modallist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_report_modallist').html('高级查询');
                    $('#txt_command_search_tbl_ld_report_modallist').attr("disabled", true);
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
            _blockMessage.show('initParameter执行失败' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDisable = function ()
    {
        var isDisable = false;

        if (that._pr_bblx == "08110001")
        {
            $('#div_detail_f_khfz_tbl_ld_report_modallist').removeClass('hidden');
        }
        else
        {
            $('#div_detail_f_khfz_tbl_ld_report_modallist').addClass('hidden');
        }


        var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist');
        switch (that._pr_listtype)
        {
            case "1":
                if (ztid == '0')
                {
                    isDisable = false;

                    $('#btn_detail_modal_save_tbl_ld_report_modallist').removeClass('hidden');
                    $('#btn_detail_modal_submit_tbl_ld_report_modallist').removeClass('hidden');

                    $('#btn_detail_modal_rollback_tbl_ld_report_modallist').addClass('hidden');

                    $('#btn_detail_modal_download_tbl_ld_report_modallist').addClass('hidden');
                    $("#tablepreview").addClass('hidden');

                }
                else
                {
                    isDisable = true;
                    $("#tablepreview").removeClass('hidden');
                    $('#btn_detail_modal_save_tbl_ld_report_modallist').addClass('hidden');
                    $('#btn_detail_modal_submit_tbl_ld_report_modallist').addClass('hidden');
                    if (that._pr_isadmin == '0')
                    {
                        $('#btn_detail_modal_rollback_tbl_ld_report_modallist').removeClass('hidden');
                    }
                    else
                    {
                        $('#btn_detail_modal_rollback_tbl_ld_report_modallist').addClass('hidden');
                    }

                    $('#btn_detail_modal_download_tbl_ld_report_modallist').removeClass('hidden');


                }
                break;
            case "2":
                isDisable = true;

                $('#btn_detail_modal_save_tbl_ld_report_modallist').addClass('hidden');
                $('#btn_detail_modal_submit_tbl_ld_report_modallist').addClass('hidden');
                $('#btn_detail_modal_rollback_tbl_ld_report_modallist').addClass('hidden');
                if (ztid == '0')
                {
                    $("#tablepreview").addClass('hidden');
                    $('#btn_detail_modal_rollback_tbl_ld_report_modallist').addClass('hidden');
                }
                else
                {
                    $("#tablepreview").removeClass('hidden');
                    $('#btn_detail_modal_download_tbl_ld_report_modallist').removeClass('hidden');
                }
                break;
        }



        controlObj.textdisable('detail_f_bbmc_tbl_ld_report_modallist', isDisable);

        controlObj.singledropdownlistdisable('detail_f_bblx_tbl_ld_report_modallist', true);

        controlObj.multidropdownlistdisable('detail_f_zbr_tbl_ld_report_modallist', isDisable);

        controlObj.multidropdownlistdisable('detail_f_khfz_tbl_ld_report_modallist', isDisable);

        //controlObj.singledropdownlistdisable('detail_f_zbrid_tbl_ld_report_modallist', isDisable);

        controlObj.datetimedisable('detail_f_zbsj_tbl_ld_report_modallist_date', 'detail_f_zbsj_tbl_ld_report_modallist_time', isDisable);


        controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_report_modallist', true);

        controlObj.textdisable('detail_f_bz_tbl_ld_report_modallist', isDisable);





    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {
        var codeServiceId = '';

        codeServiceId += "0811^";




        codeServiceId += "0812^";
        codeServiceId += "0813^";


        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    _baseCodeHashMap.put('codeservice_0811', resultArray['0811']);
                    _baseCodeHashMap.put('codeservice_0812', resultArray['0812']);

                    var sqlJson = {
                        "t_user": "select u_id as id,u_name as text from t_user",
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                    }
                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {
                            _baseCodeHashMap.put('codeservice_0813', messageJson["t_user"]);
                            _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                        }
                    })
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败<br/>' + ex.message, 'fail');
                }
            }
        });

    },


    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化SearchModel控件，_baseCodeHashMap作为Code数据源
    */
    initSearchControl = function (callBackFunction)
    {
        try
        {


            var codeService_0811 = _baseCodeHashMap.get('codeservice_0811');



            var codeService_0812 = _baseCodeHashMap.get('codeservice_0812');
            var codeService_0813 = _baseCodeHashMap.get('codeservice_0813');

            controlObj.multidropdownlistinit('search_f_bblx_tbl_ld_report_modallist', codeService_0811);

            controlObj.multidropdownlistinit('search_f_zbr_tbl_ld_report_modallist', codeService_0813);

            controlObj.datetimeinit('search_f_zbsj_tbl_ld_report_modallist_datefrom', 'search_f_zbsj_tbl_ld_report_modallist_timefrom');
            controlObj.datetimeinit('search_f_zbsj_tbl_ld_report_modallist_dateto', 'search_f_zbsj_tbl_ld_report_modallist_timeto');

            controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_datefrom', 'search_f_zbsj_tbl_ld_report_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_dateto', 'search_f_zbsj_tbl_ld_report_modallist_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_report_modallist', codeService_0812);


            //模态窗口
            $('#div_search_modal_tbl_ld_report_modallist').modal({
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

    //=============================Model操作===================================
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置SearchModel数据
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
                        $("#txt_command_search_tbl_ld_report_modallist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_report_modallist = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value10);

                        //  controlObj.text('search_f_zbrid_tbl_ld_report_modallist', tbl_ld_report_modallist.f_zbrid);

                        controlObj.text('search_f_bz_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bz);



                        controlObj.text('search_f_bbmc_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bbmc);

                        controlObj.multidropdownlistid('search_f_bblx_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bblxid);

                        controlObj.multidropdownlistid('search_f_zbr_tbl_ld_report_modallist', tbl_ld_report_modallist.f_zbrid);


                        controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_datefrom', 'search_f_zbsj_tbl_ld_report_modallist_timefrom', tbl_ld_report_modallist.f_zbsjfrom);
                        controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_dateto', 'search_f_zbsj_tbl_ld_report_modallist_timeto', tbl_ld_report_modallist.f_zbsjto);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_report_modallist', tbl_ld_report_modallist.f_ztid);


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
    *  获取SearchModel的数据，存储到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_report_modallist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_report_modallist = new Object();


                    tbl_ld_report_modallist.f_value1 = controlObj.text('search_f_value1_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value2 = controlObj.text('search_f_value2_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value3 = controlObj.text('search_f_value3_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value4 = controlObj.text('search_f_value4_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value5 = controlObj.text('search_f_value5_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value6 = controlObj.text('search_f_value6_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value7 = controlObj.text('search_f_value7_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value8 = controlObj.text('search_f_value8_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value9 = controlObj.text('search_f_value9_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_value10 = controlObj.text('search_f_value10_tbl_ld_report_modallist');


                    //tbl_ld_report_modallist.f_zbrid = controlObj.text('search_f_zbrid_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_bz = controlObj.text('search_f_bz_tbl_ld_report_modallist');





                    tbl_ld_report_modallist.f_bbmc = controlObj.text('search_f_bbmc_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_bblxid = controlObj.multidropdownlistid('search_f_bblx_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_zbrid = controlObj.multidropdownlistid('search_f_zbr_tbl_ld_report_modallist');


                    tbl_ld_report_modallist.f_zbsjfrom = controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_datefrom', 'search_f_zbsj_tbl_ld_report_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_report_modallist.f_zbsjto = controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_dateto', 'search_f_zbsj_tbl_ld_report_modallist_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_report_modallist.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_report_modallist');

                    that._pr_searchcontent.type2 = tbl_ld_report_modallist;
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
    *  对_pr_searchcontent的type2进行校验
    */
    checkSearchModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_report_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_report_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_zbrid.length > 200)
            {
                errorMessageHansMap.put('search_f_zbrid_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_report_modallist.f_bbmc.length > 200)
            {
                errorMessageHansMap.put('search_f_bbmc_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_bblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_bblx_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_zbrid.length > 200)
            {
                errorMessageHansMap.put('search_f_zbr_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_report_modallist.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_search.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_search.hidden();
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
    *  参数:
    *  清空SearchMode的数据,当切换查询模式时触发，切换成简单查询模式时清空高级查询内容，反之亦然
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
                controlObj.text('search_f_value1_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_zbrid = '';
                controlObj.text('search_f_zbrid_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_zbrid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_bz);





                that._pr_searchcontent.type2.f_bbmc = '';
                controlObj.text('search_f_bbmc_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_bbmc);


                that._pr_searchcontent.type2.f_bblxid = '';
                controlObj.multidropdownlistid('search_f_bblx_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_bblxid);


                that._pr_searchcontent.type2.f_zbrid = '';
                controlObj.multidropdownlistid('search_f_zbr_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_zbrid);


                that._pr_searchcontent.type2.f_zbsjfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_zbsjto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_datefrom', 'search_f_zbsj_tbl_ld_report_modallist_timefrom', that._pr_searchcontent.type2.f_zbsjfrom);
                controlObj.datetime('search_f_zbsj_tbl_ld_report_modallist_dateto', 'search_f_zbsj_tbl_ld_report_modallist_timeto', that._pr_searchcontent.type2.f_zbsjto);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_report_modallist', that._pr_searchcontent.type2.f_ztid);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_report_modallist").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Grid------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  根据_pr_searchcontent创建_whereClauseString
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

                                    whereClause += " f_zbrid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";



                                    whereClause += " f_bbmc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zbr like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_zbsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_report_modallist = that._pr_searchcontent.type2;



                        if (tbl_ld_report_modallist.f_zbrid.length > 0)
                        {
                            whereClause += " f_zbrid like '%" + tbl_ld_report_modallist.f_zbrid + "%' and ";
                        }


                        if (tbl_ld_report_modallist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_report_modallist.f_bz + "%' and ";
                        }





                        if (tbl_ld_report_modallist.f_bbmc.length > 0)
                        {
                            whereClause += " f_bbmc like '%" + tbl_ld_report_modallist.f_bbmc + "%' and ";
                        }


                        if (tbl_ld_report_modallist.f_bblxid.length > 0)
                        {
                            var elementArray = tbl_ld_report_modallist.f_bblxid.split(',');
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
                                whereClause += "((','||f_bblxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_report_modallist.f_zbrid.length > 0)
                        {
                            var elementArray = tbl_ld_report_modallist.f_zbrid.split(',');
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
                                whereClause += "((','||f_zbrid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        //if (tbl_ld_report_modallist.f_zbr.length > 0)
                        //{
                        //    whereClause += " f_zbr like '%" + tbl_ld_report_modallist.f_zbr + "%' and ";
                        //}


                        if (tbl_ld_report_modallist.f_zbsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_zbsj >= to_date('" + tbl_ld_report_modallist.f_zbsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_report_modallist.f_zbsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_zbsj <= to_date('" + tbl_ld_report_modallist.f_zbsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_report_modallist.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_report_modallist.f_ztid.split(',');
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
            $('#btn_command_clearselect_tbl_ld_report_modallist').addClass('hidden');


        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_report_modallist').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_report_modallist').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_report_modallist .cc-badge-p').html(currentcount + '/' + allcount);


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

            $('#table_grid_tbl_ld_report_modallist').bootstrapTable({
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
                    field: '_checkbox', checkbox: true,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":

                                switch (row.f_ztid)
                                {
                                    case "0":
                                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                        {
                                            return {
                                                disabled: false,
                                                checked: true
                                            }
                                        }
                                        else
                                        {
                                            return {
                                                disabled: false,
                                                checked: false
                                            }
                                        }
                                        break;
                                    case "1":
                                        return {
                                            disabled: true
                                        }
                                        break;
                                    case "9":
                                        return {
                                            disabled: true
                                        }
                                        break;

                                }

                                break;
                            case "2":
                                return {
                                    disabled: true
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


                {
                    field: 'f_value1',
                    title: '备用字段1',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value2',
                    title: '备用字段2',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value3',
                    title: '备用字段3',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value4',
                    title: '备用字段4',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value5',
                    title: '备用字段5',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value6',
                    title: '备用字段6',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value7',
                    title: '备用字段7',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value8',
                    title: '备用字段8',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value9',
                    title: '备用字段9',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value10',
                    title: '备用字段10',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_zbrid',
                    title: '制表人ID',
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
                    field: 'f_bz',
                    title: '备注',
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
                    field: 'f_bbmc',
                    title: '报表名称',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


                        return resultStr;
                    }
                },


                {
                    field: 'f_bblx',
                    title: '报表类型',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_bblxid',
                    title: '报表类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_zbr',
                    title: '制表人',
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
                    field: 'f_zbsj',
                    title: '制表时间',
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
                },


                {
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
                },


                {
                    field: 'f_ztid',
                    title: '状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },

                {
                    field: '', title: '操作', "class": 'gridcell-editcolumn',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":
                                switch (row.f_ztid)
                                {
                                    case "0":
                                        return [
                         '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                             '<i class="glyphicon glyphicon-edit"></i>',
                         '</a>'
                                        ].join('');
                                        break;
                                        break;
                                    case "1":

                                    case "9":

                                        return [
                          '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                              '<i class="glyphicon glyphicon-eye-open"></i>',
                          '</a>'
                                        ].join('');
                                        break;
                                }

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

                            _gridEditId = row.sys_id;
                            getDetailData({
                                success: function (tbl_ld_report_modallist)
                                {
                                    setDetailModel(tbl_ld_report_modallist, {
                                        success: function ()
                                        {
                                            setDisable();

                                            $('#div_detail_modal_tbl_ld_report_modallist').modal('show');
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('setDetailModel执行失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });

                        },
                        'click .edit': function (e, value, row, index)
                        {
                            _gridEditId = row.sys_id;
                            getDetailData({
                                success: function (tbl_ld_report_modallist)
                                {
                                    setDetailModel(tbl_ld_report_modallist, {
                                        success: function ()
                                        {
                                            setDisable();
                                            $('#div_detail_modal_tbl_ld_report_modallist').modal('show');
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('setDetailModel执行失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    bindGrid(true, {
                        success: function ()
                        {

                        }, fail: function (message)
                        {
                            _alertMessage.show('绑定失败', 'fail');
                            _resultMessage.show(message);
                        }
                    });
                },
                rowStyle: function (row, index)
                {
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function (data)
                {
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
                    var rows = $('#table_grid_tbl_ld_report_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_report_modallist').bootstrapTable('getData');
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
    *  方法:bindGrid
    *  参数:callBackFunction
    *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
    */
    bindGrid = function (isClearStatus, callBackFunction)
    {
        if (isClearStatus == true)
        {
            _gridEditId = '';
            _gridStatusScrollTop = 0;

        }
        else
        {
            //记录滚动情况
            _gridStatusScrollTop = $('#table_grid_tbl_ld_report_modallist').parent().scrollTop();
        }

        setTimeout(function ()
        {
            var whereClause = _whereClauseString;
            if (whereClause == "")
            {
                whereClause += " 1 = 1 ";
            }
            if (that._pr_isadmin == '1')
            {
                whereClause += " and sys_creatuserid = '" + basePageObj._userInfoJson.sys_userid + "'";
            }

            if (that._pr_bblx != '')
            {
                whereClause += " and f_bblxid = '" + that._pr_bblx + "'";
            }


            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_zbrid^f_bz^f_bbmc^f_bblx^f_bblxid^f_zbr^f_zbrid^f_zbsj^f_zt^f_ztid^sys_id';

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
                    $('#table_grid_tbl_ld_report_modallist').bootstrapTable("loadJson", messageJson);
                    //定位
                    $('#table_grid_tbl_ld_report_modallist').parent().scrollTop(_gridStatusScrollTop);
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
    // ---------------------------------DetailModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initDetailControl
    *  参数:
    *  初始化DetailModel控件，_baseCodeHashMap作为Code数据源
    */
    initDetailControl = function (callBackFunction)
    {
        try
        {
            
            var codeService_0811 = _baseCodeHashMap.get('codeservice_0811');

            var codeService_0812 = _baseCodeHashMap.get('codeservice_0812');

            var codeService_0813 = _baseCodeHashMap.get('codeservice_0813');

            var codeService_khfz = _baseCodeHashMap.get('codeservice_khfz');

            controlObj.singledropdownlistinit('detail_f_bblx_tbl_ld_report_modallist', codeService_0811, f_bblx_onchange);

            controlObj.datetimeinit('detail_f_zbsj_tbl_ld_report_modallist_date', 'detail_f_zbsj_tbl_ld_report_modallist_time', f_zbsj_date_onchange, f_zbsj_time_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_report_modallist', codeService_0812, f_zt_onchange);

            controlObj.multidropdownlistinit('detail_f_zbr_tbl_ld_report_modallist', codeService_0813, f_zbr_onchange);

            controlObj.multidropdownlistinit('detail_f_khfz_tbl_ld_report_modallist', codeService_khfz, "");


            //模态窗口
            $('#div_detail_modal_tbl_ld_report_modallist').modal({
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

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setDetailModel
    *  参数:callBackFunction
    *  根据传入的tbl_ld_report_modallist，绑定DetailModel
    */
    setDetailModel = function (tbl_ld_report_modallist, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value1);
            controlObj.text('detail_f_value2_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value2);


            controlObj.text('detail_f_value5_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value10);

            controlObj.text('detail_f_bbmc_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bbmc);

            controlObj.singledropdownlistid('detail_f_bblx_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bblxid);

            // controlObj.text('detail_f_zbr_tbl_ld_report_modallist', tbl_ld_report_modallist.f_zbr);

            controlObj.multidropdownlistid('detail_f_zbr_tbl_ld_report_modallist', tbl_ld_report_modallist.f_zbrid);

            controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value4);

            controlObj.datetime('detail_f_zbsj_tbl_ld_report_modallist_date', 'detail_f_zbsj_tbl_ld_report_modallist_time', tbl_ld_report_modallist.f_zbsj);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', tbl_ld_report_modallist.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bz.returnStringRN());


            if (tbl_ld_report_modallist.f_ztid == "1")
            {
                var tableobj = (new Function("", "return " + tbl_ld_report_modallist.f_content))();
                drawTable(tableobj, {
                    success: function ()
                    {
                        callBackFunction.success();
                    }
                })
            }
            else
            {
                //$("#tablepreview").addClass("hidden");
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
    *  方法:getDetailModel
    *  参数:callBackFunction
    *  获取DetailMode的数据对象，返回数据对象
    */
    getDetailModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_report_modallist = new Object();


            tbl_ld_report_modallist.f_value3 = controlObj.multidropdownlist('detail_f_khfz_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value4 = controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value1 = controlObj.text('detail_f_value1_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value2 = controlObj.text('detail_f_value2_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value5 = controlObj.text('detail_f_value5_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value6 = controlObj.text('detail_f_value6_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value7 = controlObj.text('detail_f_value7_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value8 = controlObj.text('detail_f_value8_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value9 = controlObj.text('detail_f_value9_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_value10 = controlObj.text('detail_f_value10_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_bbmc = controlObj.text('detail_f_bbmc_tbl_ld_report_modallist');

            tbl_ld_report_modallist.f_bblx = controlObj.singledropdownlist('detail_f_bblx_tbl_ld_report_modallist');
            tbl_ld_report_modallist.f_bblxid = controlObj.singledropdownlistid('detail_f_bblx_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_zbr = controlObj.multidropdownlist('detail_f_zbr_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_zbrid = controlObj.multidropdownlistid('detail_f_zbr_tbl_ld_report_modallist');

            tbl_ld_report_modallist.f_zbsj = controlObj.datetime('detail_f_zbsj_tbl_ld_report_modallist_date', 'detail_f_zbsj_tbl_ld_report_modallist_time');

            tbl_ld_report_modallist.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_report_modallist');
            tbl_ld_report_modallist.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist');


            tbl_ld_report_modallist.f_bz = controlObj.text('detail_f_bz_tbl_ld_report_modallist');




            callBackFunction.success(tbl_ld_report_modallist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_report_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ld_report_modallist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_report_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
           
            if (that._pr_bblx == "08110001")
            {
                if (tbl_ld_report_modallist.f_value4.length <1)
                {
                    errorMessageHansMap.put('detail_f_khfz_tbl_ld_report_modallist', '客户分组不能为空');
                }
            }


            if (tbl_ld_report_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_bbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_bbmc_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_bblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_bblx_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_zbr.length > 200)
            {
                errorMessageHansMap.put('detail_f_zbr_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_zbrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_zbrid_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_report_modallist.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_report_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_report_modallist.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_report_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }





            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ld_report_modallist);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_ld_report_modallist
    *  清空数据对象
    */
    clearDetailModel = function (tbl_ld_report_modallist)
    {


        tbl_ld_report_modallist.f_value3 = '';


        tbl_ld_report_modallist.f_value4 = '';
        controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value4);

        tbl_ld_report_modallist.f_value1 = '';
        controlObj.text('detail_f_value1_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value1);

        tbl_ld_report_modallist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value2);

        tbl_ld_report_modallist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value5);

        tbl_ld_report_modallist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value6);

        tbl_ld_report_modallist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value7);

        tbl_ld_report_modallist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value8);

        tbl_ld_report_modallist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value9);

        tbl_ld_report_modallist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ld_report_modallist', tbl_ld_report_modallist.f_value10);

        tbl_ld_report_modallist.f_bbmc = '';
        controlObj.text('detail_f_bbmc_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bbmc);

        tbl_ld_report_modallist.f_bblx = '';
        tbl_ld_report_modallist.f_bblxid = '';
        controlObj.singledropdownlistid('detail_f_bblx_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bblxid);

        tbl_ld_report_modallist.f_zbr = '';

        tbl_ld_report_modallist.f_zbrid = '';
        controlObj.multidropdownlistid('detail_f_zbr_tbl_ld_report_modallist', tbl_ld_report_modallist.f_zbrid);


        tbl_ld_report_modallist.f_zbsj = '1900-01-01';
        controlObj.datetime('detail_f_zbsj_tbl_ld_report_modallist_date', 'detail_f_zbsj_tbl_ld_report_modallist_time', tbl_ld_report_modallist.f_zbsj);

        tbl_ld_report_modallist.f_zt = '';
        tbl_ld_report_modallist.f_ztid = '';
        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', tbl_ld_report_modallist.f_ztid);

        tbl_ld_report_modallist.f_bz = '';
        controlObj.text('detail_f_bz_tbl_ld_report_modallist', tbl_ld_report_modallist.f_bz.returnStringRN());







    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据_gridEditId ，返回数据对象
    */
    getDetailData = function (callBackFunction)
    {

        var whereClause = ' sys_id = \'' + _gridEditId + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_zbrid^f_bz^f_content^f_contentid^f_bbmc^f_bblx^f_bblxid^f_zbr^f_zbrid^f_zbsj^f_zt^f_ztid^sys_id';

        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: '',
            pageIndexString: '',
            clientInf: _clientInf
        };
        doAjaxFunction(_serviceUrl, 'GetList', data, {
            success: function (result)
            {
                try
                {
                    var messageJson = (new Function("", "return " + result))();
                    callBackFunction.success(messageJson.rows[0]);
                }
                catch (ex)
                {
                    _blockMessage.show('getDetailData执行失败。<br/>' + ex.message, 'fail');
                }
            },
            fail: function (message)
            {
                _blockMessage.show('getDetailData执行失败<br/>' + message, 'fail');
            }
        });


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_ld_report_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (updateType, tbl_ld_report_modallist, callbackFunction)
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_zbrid^f_bz^f_bbmc^f_bblx^f_bblxid^f_zbr^f_zbrid^f_zbsj^f_zt^f_ztid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridEditId,


            f_value1: tbl_ld_report_modallist.f_value1,

            f_value2: tbl_ld_report_modallist.f_value2,

            f_value3: tbl_ld_report_modallist.f_value3,

            f_value4: tbl_ld_report_modallist.f_value4,

            f_value5: tbl_ld_report_modallist.f_value5,

            f_value6: tbl_ld_report_modallist.f_value6,

            f_value7: tbl_ld_report_modallist.f_value7,

            f_value8: tbl_ld_report_modallist.f_value8,

            f_value9: tbl_ld_report_modallist.f_value9,

            f_value10: tbl_ld_report_modallist.f_value10,

            f_bbmc: tbl_ld_report_modallist.f_bbmc,

            f_bblx: tbl_ld_report_modallist.f_bblx,
            f_bblxid: tbl_ld_report_modallist.f_bblxid,

            f_zbr: tbl_ld_report_modallist.f_zbr,

            f_zbrid: tbl_ld_report_modallist.f_zbrid,

            f_zbsj: tbl_ld_report_modallist.f_zbsj,

            f_zt: tbl_ld_report_modallist.f_zt,
            f_ztid: tbl_ld_report_modallist.f_ztid,

            f_bz: tbl_ld_report_modallist.f_bz.formatStringRN(),




            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')

        };

        var data = {
            updateType: updateType,
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json)
        };
        doAjaxFunction(_serviceUrl, 'Update', data, {
            success: function (message)
            {
                var tableobj = (new Function("", "return " + message))();
                callbackFunction.success(tableobj);
            },
            fail: function (message)
            {
                callbackFunction.fail(message);
            },
            error: function (message)
            {
                _blockMessage.show(_serviceUrl + 'Update<br/>' + message, 'fail');
            }
        });
    },

        /* 
    *  
    *  方法:drawTable
    *  参数:tableobj, callbackFunction
    *  绘制预览表格
    */
    drawTable = function (tableobj, callbackFunction)
    {


        $("#tablepreview").removeClass("hidden");
        var html = "";
        var bblxid= controlObj.singledropdownlistid('detail_f_bblx_tbl_ld_report_modallist')
        switch (bblxid)
        {
            case "08110001"://日结账报表
                {
                    html += "<tr>             ";
                    html += "  <th style='text-align:center'>类型</th>    ";
                    html += "  <th style='text-align:center'>水价</th>    ";
                    html += "  <th style='text-align:center'>水费</th>    ";
                    html += "  <th style='text-align:center'>水量</th>    ";
                    html += "  <th style='text-align:center'>排污费</th>  ";
                    html += "  <th style='text-align:center'>应收金额</th>";
                    html += "  <th style='text-align:center'>折让金额</th>";
                    html += "  <th style='text-align:center'>调价结转抵消</th>";
                    html += "  <th style='text-align:center'>绿化表押金抵消</th>";
                    html += "  <th style='text-align:center'>实收金额</th>";
                    html += "</tr>              ";
                    for (var i = 0; i < tableobj.length; i++)
                    {
                        html += "<tr>                           ";
                        html += "  <td style='text-align:center'>" + tableobj[i].lx + "</td>  ";
                        html += "  <td style='text-align:center'>" + tableobj[i].sj + "</td>  ";
                        html += "  <td style='text-align:center'>" + tableobj[i].sf + "</td>  ";
                        html += "  <td style='text-align:center'>" + tableobj[i].sl + "</td>  ";
                        html += "  <td style='text-align:center'>" + tableobj[i].pwf + "</td> ";
                        html += "  <td style='text-align:center'>" + tableobj[i].ysje + "</td>";
                        html += "  <td style='text-align:center'>" + tableobj[i].zrje + "</td>";
                        html += "  <td style='text-align:center'>" + tableobj[i].ycdx + "</td>";
                        html += "  <td style='text-align:center'>" + tableobj[i].xzyc + "</td>";
                        html += "  <td style='text-align:center'>" + tableobj[i].ssje + "</td>";
                        html += "</tr>                          ";
                    }
                }
                break;
            case "08110002"://经管部日结账报表
                {

                    html += "<tr>                                                  ";
                    html += "<td rowspan=\"2\">类型</td>";
                    html += "<td colspan=\"6\">当月</td>";
                    html += "<td colspan=\"3\">欠月</td>";
                    html += "<td colspan=\"3\">欠年</td>";
                    html += "<td colspan=\"4\">总计</td>";
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>单价</td>";
                    html += "<td>水费单价</td>";
                    html += "<td>水量</td>";
                    html += "<td>水费</td>";
                    html += "<td>排污费单价</td>";
                    html += "<td>排污费</td>";
                    html += "<td>水量</td>";
                    html += "<td>水费</td>";
                    html += "<td>排污费</td>";
                    html += "<td>水量</td>";
                    html += "<td>水费</td>";
                    html += "<td>排污费</td>";
                    html += "<td>水量</td>";
                    html += "<td>水费</td>";
                    html += "<td>排污费</td>";
                    html += "<td>总计</td>";
                    html += "</tr>";
                    for (var i = 0; i < tableobj.length; i++)
                    {
                        if (tableobj[i].lx == "商业用户")
                        {
                            var countsy = 1;
                            while (tableobj[i + countsy].lx == "")
                            {
                                countsy++;
                            }
                            html += "<tr>";
                            html += "<td rowspan=\""+countsy+"\">" + tableobj[i].lx + "</td>";
                            html += "<td>" + tableobj[i].dysfpwfdj + "</td>";
                            html += "<td>" + tableobj[i].dysfdj + "</td>";
                            html += "<td>" + tableobj[i].dysl + "</td>";
                            html += "<td>" + tableobj[i].dysf + "</td>";
                            html += "<td>" + tableobj[i].dypwfdj + "</td>";
                            html += "<td>" + tableobj[i].dypwf + "</td>";
                            html += "<td>" + tableobj[i].qysl + "</td>";
                            html += "<td>" + tableobj[i].qysf + "</td>";
                            html += "<td>" + tableobj[i].qypwf + "</td>";
                            html += "<td>" + tableobj[i].qnsl + "</td>";
                            html += "<td>" + tableobj[i].qnsf + "</td>";
                            html += "<td>" + tableobj[i].qnpwf + "</td>";
                            html += "<td>" + tableobj[i].sumsl + "</td>";
                            html += "<td>" + tableobj[i].zjsf.toString() + "</td>";
                            html += "<td>" + tableobj[i].zjpwf + "</td>";
                            html += "<td>" + tableobj[i].zjsl + "</td>";
                            html += "</tr>";
                        }
                        else if (tableobj[i].lx == "追缴水费" || (tableobj[i].lx == "居民用户" && tableobj[i + 1].lx == "") || (tableobj[i].lx == "IC卡用户" && tableobj[i + 1].lx == "") || (tableobj[i].lx == "商业邮储代收" && tableobj[i + 1].lx == "") || (tableobj[i].lx == "IC卡邮储代收" && tableobj[i + 1].lx == ""))
                        {
                            html += "<tr>";
                            html += "<td rowspan=\"2\">" + tableobj[i].lx + "</td>";
                            html += "<td>" + tableobj[i].dysfpwfdj + "</td>";
                            html += "<td>" + tableobj[i].dysfdj + "</td>";
                            html += "<td>" + tableobj[i].dysl + "</td>";
                            html += "<td>" + tableobj[i].dysf + "</td>";
                            html += "<td>" + tableobj[i].dypwfdj + "</td>";
                            html += "<td>" + tableobj[i].dypwf + "</td>";
                            html += "<td>" + tableobj[i].qysl + "</td>";
                            html += "<td>" + tableobj[i].qysf + "</td>";
                            html += "<td>" + tableobj[i].qypwf + "</td>";
                            html += "<td>" + tableobj[i].qnsl + "</td>";
                            html += "<td>" + tableobj[i].qnsf + "</td>";
                            html += "<td>" + tableobj[i].qnpwf + "</td>";
                            html += "<td>" + tableobj[i].sumsl + "</td>";
                            html += "<td>" + tableobj[i].zjsf.toString() + "</td>";
                            html += "<td>" + tableobj[i].zjpwf + "</td>";
                            html += "<td>" + tableobj[i].zjsl + "</td>";
                            html += "</tr>";


                        }
                        else
                        {
                            if (tableobj[i].lx == "")
                            {
                                html += "<tr>";
                                html += "<td>" + tableobj[i].dysfpwfdj + "</td>";
                                html += "<td>" + tableobj[i].dysfdj + "</td>";
                                html += "<td>" + tableobj[i].dysl + "</td>";
                                html += "<td>" + tableobj[i].dysf + "</td>";
                                html += "<td>" + tableobj[i].dypwfdj + "</td>";
                                html += "<td>" + tableobj[i].dypwf + "</td>";
                                html += "<td>" + tableobj[i].qysl + "</td>";
                                html += "<td>" + tableobj[i].qysf + "</td>";
                                html += "<td>" + tableobj[i].qypwf + "</td>";
                                html += "<td>" + tableobj[i].qnsl + "</td>";
                                html += "<td>" + tableobj[i].qnsf + "</td>";
                                html += "<td>" + tableobj[i].qnpwf + "</td>";
                                html += "<td>" + tableobj[i].sumsl + "</td>";
                                html += "<td>" + tableobj[i].zjsf.toString() + "</td>";
                                html += "<td>" + tableobj[i].zjpwf + "</td>";
                                html += "<td>" + tableobj[i].zjsl + "</td>";

                                html += "</tr>";
                            }
                            else
                            {
                                html += "<tr>";
                                html += "<td>" + tableobj[i].lx + "</td>";
                                html += "<td>" + tableobj[i].dysfpwfdj + "</td>";
                                html += "<td>" + tableobj[i].dysfdj + "</td>";
                                html += "<td>" + tableobj[i].dysl + "</td>";
                                html += "<td>" + tableobj[i].dysf + "</td>";
                                html += "<td>" + tableobj[i].dypwfdj + "</td>";
                                html += "<td>" + tableobj[i].dypwf + "</td>";
                                html += "<td>" + tableobj[i].qysl + "</td>";
                                html += "<td>" + tableobj[i].qysf + "</td>";
                                html += "<td>" + tableobj[i].qypwf + "</td>";
                                html += "<td>" + tableobj[i].qnsl + "</td>";
                                html += "<td>" + tableobj[i].qnsf + "</td>";
                                html += "<td>" + tableobj[i].qnpwf + "</td>";
                                html += "<td>" + tableobj[i].sumsl + "</td>";
                                html += "<td>" + tableobj[i].zjsf.toString() + "</td>";
                                html += "<td>" + tableobj[i].zjpwf + "</td>";
                                html += "<td>" + tableobj[i].zjsl + "</td>";

                                html += "</tr>";

                            }


                        }

                    }
                }
                break;
            case "08110003"://用户情况年度汇总表
                {
                    html += "<tr>";
                    html += "<td style=\"width:80px\"; rowspan=\"2\">用户类别</td>";
                    html += "<td style=\"width:80px\"; rowspan=\"2\">片区名称</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">1月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">2月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">3月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">4月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">5月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">6月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">7月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">8月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">9月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">10月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">11月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">12月份</td>";
                    html += "<td style=\"width:500px\"; colspan=\"5\">全年</td>";
                    html += "</tr>";

                    {
                        html += "<tr>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td >新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "<td>新增用户数</td>";
                        html += "<td>停用</td>";
                        html += "<td>销户</td>";
                        html += "<td>过户</td>";
                        html += "<td>用户总数</td>";
                        html += "</tr>";
                    }

                    {
                        html += "<tr>";
                        html += "<td rowspan=\"6\">居民用户</td>";
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>总表</td>";
                        $.each(tableobj[0], function (i, u)
                        {
                            html += "<td>" + tableobj[0][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>卡表</td>";
                        $.each(tableobj[1], function (i, u)
                        {
                            html += "<td>" + tableobj[1][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>远传表</td>";
                        $.each(tableobj[2], function (i, u)
                        {
                            html += "<td>" + tableobj[2][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>入户直收</td>";
                        $.each(tableobj[3], function (i, u)
                        {
                            html += "<td>" + tableobj[3][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>用户数小计</td>";
                        $.each(tableobj[4], function (i, u)
                        {
                            html += "<td>" + tableobj[4][i] + "</td>";
                        });
                        html += "</tr>";


                        html += "<tr>";
                        html += "<td rowspan=\"12\">大用户</td>";
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>A区（河东）</td>";
                        $.each(tableobj[5], function (i, u)
                        {
                            html += "<td>" + tableobj[5][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>B区（河西）</td>";
                        $.each(tableobj[6], function (i, u)
                        {
                            html += "<td>" + tableobj[6][i] + "</td>";
                        });
                        html += "</tr>";
                        html += "<tr>";
                        html += "<td>C区（茶淀）</td>";
                        $.each(tableobj[7], function (i, u)
                        {
                            html += "<td>" + tableobj[7][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>D区(玖龙)</td>";
                        $.each(tableobj[8], function (i, u)
                        {
                            html += "<td>" + tableobj[8][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>E区(杨家泊)</td>";
                        $.each(tableobj[9], function (i, u)
                        {
                            html += "<td>" + tableobj[9][i] + "</td>";
                        });
                        html += "</tr>";

                        html += "<tr>";
                        html += "<td>F区(北疆)</td>";
                        $.each(tableobj[10], function (i, u)
                        {
                            html += "<td>" + tableobj[10][i] + "</td>";
                        });
                        html += "</tr>";
                        html += "<tr>";
                        html += "<td>G区(中心渔港)</td>";
                        $.each(tableobj[11], function (i, u)
                        {
                            html += "<td>" + tableobj[11][i] + "</td>";
                        });
                        html += "</tr>";
                        html += "<tr>";
                        html += "<td>H区(开发区)</td>";
                        $.each(tableobj[12], function (i, u)
                        {
                            html += "<td>" + tableobj[12][i] + "</td>";
                        });
                        html += "</tr>";
                        html += "<tr>";
                        html += "<td>I区(生态城)</td>";
                        $.each(tableobj[13], function (i, u)
                        {
                            html += "<td>" + tableobj[13][i] + "</td>";
                        });
                        html += "</tr>";


                        html += "<tr>";
                        html += "<td>J区(旅游区)</td>";
                        $.each(tableobj[14], function (i, u)
                        {
                            html += "<td>" + tableobj[14][i] + "</td>";
                        });
                        html += "</tr>";
                        html += "<tr>";
                        html += "<td>用户数小计</td>";
                        $.each(tableobj[15], function (i, u)
                        {
                            html += "<td>" + tableobj[15][i] + "</td>";
                        });
                        html += "</tr>";
                    }

                    html += "<tr>";
                    html += "<td colspan=\"2\">用户数总计</td>";

                    $.each(tableobj[16], function (i, u)
                    {
                        html += "<td>" + tableobj[16][i] + "</td>";
                    });
                    html += "</tr>";

                }
                break;
            case "08110004"://年度销售收入情况表
                {
                    html += "<tr>";
                    html += "<td rowspan=\"3\" colspan=\"2\">用水类别/月份</td>";
                    html += "<td colspan=\"7\">1月份</td>";
                    html += "<td colspan=\"7\">2月份</td>";
                    html += "<td colspan=\"7\">3月份</td>";
                    html += "<td colspan=\"7\">4月份</td>";
                    html += "<td colspan=\"7\">5月份</td>";
                    html += "<td colspan=\"7\">6月份</td>";
                    html += "<td colspan=\"7\">7月份</td>";
                    html += "<td colspan=\"7\">8月份</td>";
                    html += "<td colspan=\"7\">9月份</td>";
                    html += "<td colspan=\"7\">10月份</td>";
                    html += "<td colspan=\"7\">11月份</td>";
                    html += "<td colspan=\"7\">12月份</td>";
                    html += "<td colspan=\"7\">全年</td>";
                    html += "</tr>";


                    html += "<tr>";
                    for (var i = 0; i < 13; i++)
                    {
                        html += "<td colspan=\"2\";>销售收入（应收）</td>";
                        html += "<td colspan=\"2\";>实收水费</td>";
                        html += "<td colspan=\"2\";>欠收金额</td>";
                        html += "<td rowspan=\"2\";>当月回款率</td>";

                    }
                    html += "</tr>";
                    html += "<tr>";
                    for (var i = 0; i < 13; i++)
                    {
                        html += "<td>水费</td>";
                        html += "<td>排污</td>";
                        html += "<td>水费</td>";
                        html += "<td>排污</td>";
                        html += "<td>水费</td>";
                        html += "<td>排污</td>";

                    }
                    html += "</tr>";

                    html += "<tr>";
                    html += "<td rowspan=\"6\">居民用户</td>";

                    html += "</tr>";

                    for (var j = 0; j < tableobj.length; j++)
                    {
                        html += "<tr>";
                        switch (j.toString())
                        {
                            case "0":
                                html += "<td>总表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "1":
                                html += "<td>卡表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "2":
                                html += "<td>远传表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "3":
                                html += "<td>入户直收</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "4":
                                html += "<td>销售量小计</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                html += "<tr>";
                                html += "<td rowspan=\"11\">大用户</td>";

                                html += "</tr>";
                                break;
                            case "5":
                                html += "<td>A区（河东）</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "6":
                                html += "<td>B区（河西）</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "7":
                                html += "<td>C区（茶淀）</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "8":
                                html += "<td>D区(玖龙)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "9":
                                html += "<td>E区(杨家泊)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "10":
                                html += "<td>F区(北疆)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "11":
                                html += "<td>G区(中心渔港)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "12":
                                html += "<td>H区(开发区)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "13":
                                html += "<td>I区(生态城)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "14":
                                html += "<td>J区(旅游区)</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "15":
                                html += "<td colspan=\"2\">销售水量小计</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;

                        }
                    }



                }
                break;
            case "08110005"://商业用水欠费统计表
                {



                    html += "<tr>                                                  ";
                    html += "<td colspan=\"2\">月份/年份</td>";
                    $.each(tableobj[0], function (i, u)
                    {
                        html += "<td>" + i + "</td>";
                    });
                    html += "</tr>";

                    for (var j = 0; j <= tableobj.length - 1; j++)
                    {
                        html += "<tr>";

                        if (j == 0 || j == tableobj.length - 1)
                        {

                        }
                        else
                        {
                            delete tableobj[j]["总计"];
                        }

                        switch (j.toString())
                        {
                            case "0":
                                html += "<td>1月</td>";
                                html += "<td rowspan=\"12\">所欠费用/元</td>";

                                $.each(tableobj[j], function (i, u)
                                {
                                    if (i == "总计")
                                    {
                                        html += "<td rowspan=\"13\">" + tableobj[j][i] + "</td>";


                                    }
                                    else
                                    {
                                        html += "<td>" + tableobj[j][i] + "</td>";

                                    }

                                });
                                html += "</tr>";

                                break;
                            case "1":
                                html += "<td>2月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "2":
                                html += "<td>3月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "3":
                                html += "<td>4月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "4":
                                html += "<td>5月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "5":
                                html += "<td>6月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "6":
                                html += "<td>7月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "7":
                                html += "<td>8月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "8":
                                html += "<td>9月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "9":
                                html += "<td>10月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "10":
                                html += "<td>11月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "11":
                                html += "<td>12月</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "12":
                                html += "<td colspan=\"2\">总计</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "13":
                                html += "<td colspan=\"2\">欠费占比</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;


                        }
                    }
                }
                break;
            case "08110006"://水表更换情况年度统计表
                {
                    html += "<tr>";
                    html += "<td rowspan=\"2\">用户类别</td>";
                    html += "<td rowspan=\"2\">水表类型</td>";
                    html += "<td rowspan=\"2\">水表总数</td>";

                    html += "<td colspan=\"4\">1月份</td>";
                    html += "<td colspan=\"4\">2月份</td>";
                    html += "<td colspan=\"4\">3月份</td>";
                    html += "<td colspan=\"4\">4月份</td>";
                    html += "<td colspan=\"4\">5月份</td>";
                    html += "<td colspan=\"4\">6月份</td>";
                    html += "<td colspan=\"4\">7月份</td>";
                    html += "<td colspan=\"4\">8月份</td>";
                    html += "<td colspan=\"4\">9月份</td>";
                    html += "<td colspan=\"4\">10月份</td>";
                    html += "<td colspan=\"4\">11月份</td>";
                    html += "<td colspan=\"4\">12月份</td>";
                    html += "<td colspan=\"4\">全年</td>";
                    html += "</tr>";

                    html += "<tr>";
                    for (var i = 0; i < 13; i++)
                    {
                        html += "<td>新装数量</td>";
                        html += "<td>维修更换数量</td>";
                        html += "<td>改造更换数量</td>";
                        html += "<td>小计</td>";
                    }
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td rowspan=\"6\">居民用户</td>";

                    html += "</tr>";

                    for (var j = 0; j < tableobj.length; j++)
                    {
                        html += "<tr>";
                        switch (j.toString())
                        {
                            case "0":

                                html += "<td>入户直收机械表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "1":
                                html += "<td>总表机械表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "2":
                                html += "<td>卡表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "3":
                                html += "<td>远传表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "4":
                                html += "<td>用户数小计</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                html += "<tr>";
                                html += "<td rowspan=\"4\">商业用户</td>";

                                html += "</tr>";
                                break;
                            case "5":
                                html += "<td>机械表</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "6":
                                html += "<td>IC卡商业</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "7":
                                html += "<td>用户数小计</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "8":
                                html += "<td>水表数总计</td>";
                                html += "<td></td>";

                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;

                        }
                    }
                }
                break;
            case "08110007"://收费情况年度统计表
                {
                    html += "<tr>";
                    html += "<td style=\"width:80px\" colspan=\"2\" rowspan=\"2\">月份</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">1月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">2月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">3月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">4月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">5月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">6月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">7月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">8月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">9月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">10月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">11月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">12月</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">全年</td>";
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "<td style=\"width:80px\">总户数</td>";
                    html += "<td style=\"width:80px\">实抄户数</td>";
                    html += "<td style=\"width:80px\">抄见率</td>";
                    html += "<td style=\"width:80px\">清费户数</td>";
                    html += "<td style=\"width:80px\">停水户数</td>";
                    html += "<td style=\"width:80px\">清费率</td>";
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\"  rowspan=\"8\">商业用户</td>";
                    html += "<td>DH014</td>";
                    $.each(tableobj[0], function (i, u)
                    {
                        html += "<td>" + tableobj[0][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>DH015</td>";
                    $.each(tableobj[1], function (i, u)
                    {
                        html += "<td>" + tableobj[1][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>DH016</td>";
                    $.each(tableobj[2], function (i, u)
                    {
                        html += "<td>" + tableobj[2][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>DH017</td>";
                    $.each(tableobj[3], function (i, u)
                    {
                        html += "<td>" + tableobj[3][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>DH018</td>";
                    $.each(tableobj[4], function (i, u)
                    {
                        html += "<td>" + tableobj[4][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>DH019</td>";
                    $.each(tableobj[5], function (i, u)
                    {
                        html += "<td>" + tableobj[5][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>IC卡表商业用户</td>";
                    $.each(tableobj[6], function (i, u)
                    {
                        html += "<td>" + tableobj[6][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>小计</td>";
                    $.each(tableobj[7], function (i, u)
                    {
                        html += "<td>" + tableobj[7][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\"  rowspan=\"52\">居民用户</td>";
                    html += "<td>J001A</td>";
                    $.each(tableobj[8], function (i, u)
                    {
                        html += "<td>" + tableobj[8][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J001B</td>";
                    $.each(tableobj[9], function (i, u)
                    {
                        html += "<td>" + tableobj[9][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J002A</td>";
                    $.each(tableobj[10], function (i, u)
                    {
                        html += "<td>" + tableobj[10][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J002B</td>";
                    $.each(tableobj[11], function (i, u)
                    {
                        html += "<td>" + tableobj[11][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J003A</td>";
                    $.each(tableobj[12], function (i, u)
                    {
                        html += "<td>" + tableobj[12][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J003B</td>";
                    $.each(tableobj[13], function (i, u)
                    {
                        html += "<td>" + tableobj[13][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J004A</td>";
                    $.each(tableobj[14], function (i, u)
                    {
                        html += "<td>" + tableobj[14][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J004B</td>";
                    $.each(tableobj[15], function (i, u)
                    {
                        html += "<td>" + tableobj[15][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J005A</td>";
                    $.each(tableobj[16], function (i, u)
                    {
                        html += "<td>" + tableobj[16][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J005B</td>";
                    $.each(tableobj[17], function (i, u)
                    {
                        html += "<td>" + tableobj[17][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J006A</td>";
                    $.each(tableobj[18], function (i, u)
                    {
                        html += "<td>" + tableobj[18][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J006B</td>";
                    $.each(tableobj[19], function (i, u)
                    {
                        html += "<td>" + tableobj[19][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J007A</td>";
                    $.each(tableobj[20], function (i, u)
                    {
                        html += "<td>" + tableobj[20][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J007B</td>";
                    $.each(tableobj[21], function (i, u)
                    {
                        html += "<td>" + tableobj[21][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J008A</td>";
                    $.each(tableobj[22], function (i, u)
                    {
                        html += "<td>" + tableobj[22][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J008B</td>";
                    $.each(tableobj[23], function (i, u)
                    {
                        html += "<td>" + tableobj[23][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J009A</td>";
                    $.each(tableobj[24], function (i, u)
                    {
                        html += "<td>" + tableobj[24][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J009B</td>";
                    $.each(tableobj[25], function (i, u)
                    {
                        html += "<td>" + tableobj[25][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J010A</td>";
                    $.each(tableobj[26], function (i, u)
                    {
                        html += "<td>" + tableobj[26][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J010B</td>";
                    $.each(tableobj[27], function (i, u)
                    {
                        html += "<td>" + tableobj[27][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J011A</td>";
                    $.each(tableobj[28], function (i, u)
                    {
                        html += "<td>" + tableobj[28][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J011B</td>";
                    $.each(tableobj[29], function (i, u)
                    {
                        html += "<td>" + tableobj[29][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J012A</td>";
                    $.each(tableobj[30], function (i, u)
                    {
                        html += "<td>" + tableobj[30][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J012B</td>";
                    $.each(tableobj[31], function (i, u)
                    {
                        html += "<td>" + tableobj[31][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J013A</td>";
                    $.each(tableobj[32], function (i, u)
                    {
                        html += "<td>" + tableobj[32][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>J013B</td>";
                    $.each(tableobj[33], function (i, u)
                    {
                        html += "<td>" + tableobj[33][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD04A</td>";
                    $.each(tableobj[34], function (i, u)
                    {
                        html += "<td>" + tableobj[34][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD04B</td>";
                    $.each(tableobj[35], function (i, u)
                    {
                        html += "<td>" + tableobj[35][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD05A</td>";
                    $.each(tableobj[36], function (i, u)
                    {
                        html += "<td>" + tableobj[36][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD05B</td>";
                    $.each(tableobj[37], function (i, u)
                    {
                        html += "<td>" + tableobj[37][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD06A</td>";
                    $.each(tableobj[38], function (i, u)
                    {
                        html += "<td>" + tableobj[38][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD06B</td>";
                    $.each(tableobj[39], function (i, u)
                    {
                        html += "<td>" + tableobj[39][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD07A</td>";
                    $.each(tableobj[40], function (i, u)
                    {
                        html += "<td>" + tableobj[40][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD07B</td>";
                    $.each(tableobj[41], function (i, u)
                    {
                        html += "<td>" + tableobj[41][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD08A</td>";
                    $.each(tableobj[42], function (i, u)
                    {
                        html += "<td>" + tableobj[42][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD08B</td>";
                    $.each(tableobj[43], function (i, u)
                    {
                        html += "<td>" + tableobj[43][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD09A</td>";
                    $.each(tableobj[44], function (i, u)
                    {
                        html += "<td>" + tableobj[44][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD09B</td>";
                    $.each(tableobj[45], function (i, u)
                    {
                        html += "<td>" + tableobj[45][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD10A</td>";
                    $.each(tableobj[46], function (i, u)
                    {
                        html += "<td>" + tableobj[46][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD10B</td>";
                    $.each(tableobj[47], function (i, u)
                    {
                        html += "<td>" + tableobj[47][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD11A</td>";
                    $.each(tableobj[48], function (i, u)
                    {
                        html += "<td>" + tableobj[48][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD11B</td>";
                    $.each(tableobj[49], function (i, u)
                    {
                        html += "<td>" + tableobj[49][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD12A</td>";
                    $.each(tableobj[50], function (i, u)
                    {
                        html += "<td>" + tableobj[50][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD12B</td>";
                    $.each(tableobj[51], function (i, u)
                    {
                        html += "<td>" + tableobj[51][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD13A</td>";
                    $.each(tableobj[52], function (i, u)
                    {
                        html += "<td>" + tableobj[52][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD13B</td>";
                    $.each(tableobj[53], function (i, u)
                    {
                        html += "<td>" + tableobj[53][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD14A</td>";
                    $.each(tableobj[54], function (i, u)
                    {
                        html += "<td>" + tableobj[54][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>JD14B</td>";
                    $.each(tableobj[55], function (i, u)
                    {
                        html += "<td>" + tableobj[55][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>总表用户</td>";
                    $.each(tableobj[56], function (i, u)
                    {
                        html += "<td>" + tableobj[56][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>IC卡表用户</td>";
                    $.each(tableobj[57], function (i, u)
                    {
                        html += "<td>" + tableobj[57][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>远传表用户</td>";
                    $.each(tableobj[58], function (i, u)
                    {
                        html += "<td>" + tableobj[58][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td>小计</td>";
                    $.each(tableobj[59], function (i, u)
                    {
                        html += "<td>" + tableobj[59][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\"  colspan=\"2\">合计</td>";
                    $.each(tableobj[60], function (i, u)
                    {
                        html += "<td>" + tableobj[60][i] + "</td>";
                    });
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\"  colspan=\"2\">全年平均抄见率</td>";
                    $.each(tableobj[61], function (i, u)
                    {
                        html += "<td>" + tableobj[61][i] + "</td>";
                    });
                    html += "</tr>";
                }
                break;
            case "08110008"://日结算报表
                {
                    html += "<tr>";
                    html += "<td style=\"width:600px\"; colspan=\"2\">日结算报表</td>";
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td width=\"100px\">结算方式</td>";
                    html += "<td width=\"100px\">金额</td>";
                    html += "</tr>";

                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 现金 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[0].je + "</td>  ";
                    html += "</tr>";

                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 支票 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[1].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> pose机 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[2].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 电汇 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[3].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 预存水费 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[4].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 预存结转 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[5].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 邮储划扣 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[6].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 预存消减 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[7].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 承兑 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[8].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 建行托收 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[9].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 支付宝 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[10].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 微信 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[11].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> e水生活缴费 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[12].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 邮储代缴大用户 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[13].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 光大银行网上缴费 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[14].je + "</td>  ";
                    html += "</tr>";
                    html += "<tr> ";
                    html += "  <td width=\"100px\"> 合计 </td>  ";
                    html += "  <td width=\"100px\">" + tableobj[15].je + "</td>  ";
                    html += "</tr>";
                }


                break;
            case "08110009"://节水办用户明细表
                {
                    html += "<tr>";
                    html += "<td style=\"width:80px\">序号</td>";
                    html += "<td style=\"width:80px\">水表注册号</td>";
                    html += "<td style=\"width:80px\">日期</td>";
                    html += "<td style=\"width:80px\">水表用户名称</td>";
                    html += "<td style=\"width:80px\">当月水量</td>";
                    html += "</tr>";
                    for (var ii = 0; ii < tableobj.length; ii++)
                    {
                        html += "<tr>";
                        $.each(tableobj[ii], function (i, u)
                        {
                            html += "<td>" + tableobj[ii][i] + "</td>";
                        });
                        html += "</tr>";
                    }
                }
                break;
            case "08110010"://节水办用户信息变更明细表
                {
                    html += "<tr>";
                    html += "<td style=\"width:80px\">序号</td>";
                    html += "<td style=\"width:80px\">表号</td>";
                    html += "<td style=\"width:80px\">水表名称</td>";
                    html += "<td style=\"width:80px\">水源类型</td>";
                    html += "<td style=\"width:80px\">单位地址</td>";
                    html += "<td style=\"width:80px\">水表位置</td>";
                    html += "<td style=\"width:80px\">联系人</td>";
                    html += "<td style=\"width:80px\">联系电话</td>";
                    html += "<td style=\"width:80px\">变更类型</td>";
                    html += "<td style=\"width:80px\">备注</td>";
                    html += "</tr>";
                    for (var ii = 0; ii < tableobj.length; ii++)
                    {
                        html += "<tr>";
                        $.each(tableobj[ii], function (i, u)
                        {
                            html += "<td>" + tableobj[ii][i] + "</td>";
                        });
                        html += "</tr>";
                    }
                }
                break;
            case "08110011"://月销售情况统计表
                {
                    html += "<tr>";
                    html += "<td style=\"width:80px\" rowspan=\"11\">自来水售水量</td>";
                    html += "<td style=\"width:80px\" rowspan=\"3\">类别/项目</td>";
                    html += "<td style=\"width:80px\" rowspan=\"3\">实收水费金额(元)</td>";
                    html += "<td style=\"width:80px\" rowspan=\"3\">不含排污费实收水费(元)</td>";
                    html += "<td style=\"width:80px\" colspan=\"6\">当月实收情况</td>";
                    html += "<td style=\"width:80px\" colspan=\"3\">当月污水处理费</td>";
                    html += "<td style=\"width:80px\" colspan=\"4\">收回欠费情况</td>";
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\" colspan=\"2\">应收数</td>";
                    html += "<td style=\"width:80px\" colspan=\"2\">实收数</td>";
                    html += "<td style=\"width:80px\" colspan=\"2\">欠收数</td>";
                    html += "<td style=\"width:80px\" rowspan=\"2\">实收排污费(元)</td>";
                    html += "<td style=\"width:80px\" rowspan=\"2\">欠收排污费(元)</td>";
                    html += "<td style=\"width:80px\" rowspan=\"2\">排污费合计(元)</td>";
                    html += "<td style=\"width:80px\" colspan=\"2\">本年度</td>";
                    html += "<td style=\"width:80px\" colspan=\"2\">上年度</td>";
                    html += "</tr>";
                    html += "<tr>";
                    html += "<td style=\"width:80px\"; >水费(元)</td>";
                    html += "<td style=\"width:80px\"; >水量(吨)</td>";
                    html += "<td style=\"width:80px\"; >水费(元)</td>";
                    html += "<td style=\"width:80px\"; >水量(吨)</td>";
                    html += "<td style=\"width:80px\"; >水费(元)</td>";
                    html += "<td style=\"width:80px\"; >水量(吨)</td>";
                    html += "<td style=\"width:80px\"; >水费(元)</td>";
                    html += "<td style=\"width:80px\"; >污水处理费(元)</td>";
                    html += "<td style=\"width:80px\"; >水费(元)</td>";
                    html += "<td style=\"width:80px\"; >污水处理费(元)</td>";
                    html += "</tr>";
                    for (var ii = 0; ii < tableobj.length; ii++)
                    {
                        html += "<tr>";
                        switch (ii.toString())
                        {
                            case "0":
                                html += "<td>居民生活</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "1":
                                html += "<td>学校/居委会</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "2":
                                html += "<td>生态城</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "3":
                                html += "<td>经营服务</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "4":
                                html += "<td>滨海旅游区</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "5":
                                html += "<td>游乐港</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "6":
                                html += "<td>偷盗用水</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "7":
                                html += "<td>合    计</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "8":
                                html += "<tr>";
                                html += "<td style=\"width:80px\" rowspan=\"6\">粗质水售水量</td>";
                                html += "<td style=\"width:80px\" rowspan=\"3\">类别/项目</td>";
                                html += "<td style=\"width:80px\" rowspan=\"3\" colspan=\"2\">实收水费</td>";
                                html += "<td style=\"width:80px\" colspan=\"6\">当月实收情况</td>";
                                html += "<td style=\"width:80px\" colspan=\"3\">当月污水处理费</td>";
                                html += "<td style=\"width:80px\" colspan=\"4\">收回欠费情况</td>";
                                html += "</tr>";
                                break;
                            case "9":
                                html += "<td style=\"width:80px\" colspan=\"2\">应收数</td>";
                                html += "<td style=\"width:80px\" colspan=\"2\">实收数</td>";
                                html += "<td style=\"width:80px\" colspan=\"2\">欠收数</td>";
                                html += "<td style=\"width:80px\" rowspan=\"2\">实收排污费(元)</td>";
                                html += "<td style=\"width:80px\" rowspan=\"2\">欠收排污费(元)</td>";
                                html += "<td style=\"width:80px\" rowspan=\"2\">排污费合计(元)</td>";
                                html += "<td style=\"width:80px\" colspan=\"2\">本年度</td>";
                                html += "<td style=\"width:80px\" colspan=\"2\">上年度</td>";
                                break;
                            case "10":
                                html += "<td style=\"width:80px\"; >水费(元)</td>";
                                html += "<td style=\"width:80px\"; >水量(吨)</td>";
                                html += "<td style=\"width:80px\"; >水费(元)</td>";
                                html += "<td style=\"width:80px\"; >水量(吨)</td>";
                                html += "<td style=\"width:80px\"; >水费(元)</td>";
                                html += "<td style=\"width:80px\"; >水量(吨)</td>";
                                html += "<td style=\"width:80px\"; >水费(元)</td>";
                                html += "<td style=\"width:80px\"; >污水处理费(元)</td>";
                                html += "<td style=\"width:80px\"; >水费(元)</td>";
                                html += "<td style=\"width:80px\"; >污水处理费(元)</td>";
                                break;
                            case "11":
                                html += "<td>玖龙纸业淡化水</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "12":
                                html += "<td>玖龙纸业粗制水</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                            case "13":
                                html += "<td>合    计</td>";
                                $.each(tableobj[ii], function (i, u)
                                {
                                    html += "<td>" + tableobj[ii][i] + "</td>";
                                });
                                break;
                        }
                        html += "</tr>";
                    }
                }
                break;
            case "08110012"://年水量及销售收入情况分析表
                {
                    html += "<tr>";
                    html += "<td colspan=\"2\">用水类别/月份</td>";
                    html += "<td>水费</td>";
                    html += "<td>排污费</td>";
                    html += "<td>单价</td>";
                    html += "<td>1月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>2月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>3月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>4月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>5月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>6月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>7月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>8月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>9月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>10月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>11月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>12月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>全年水量</td>";
                    html += "<td>所占比率</td>";
                    html += "</tr>";


                    html += "<tr>";
                    html += "<td rowspan=\"16\">自来水销售收入</td>";

                    html += "</tr>";

                    for (var j = 0; j < tableobj.length; j++)
                    {
                        html += "<tr>";
                        switch (j.toString())
                        {
                            case "0":
                                html += "<td>居民生活</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "1":
                                html += "<td>学校/居委会</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "2":
                                html += "<td>生态城</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "3":
                                html += "<td>经营服务</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "4":
                                html += "<td>滨海旅游区</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "5":
                                html += "<td>游乐港</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "6":
                                html += "<td>特种行业用水</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "7":
                                html += "<td>偷盗用水</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "8":
                                html += "<td>售水总量</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "9":
                                html += "<td>供水总量</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "10":
                                html += "<td>产销差率</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "11":
                                html += "<td>销售收入</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "12":
                                html += "<td>实收水费</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "13":
                                html += "<td>回款率</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "14":
                                html += "<td>收欠年欠款</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                html += "<tr>";
                                html += "<td rowspan=\"8\">玖龙粗质水</td>";

                                html += "</tr>";
                                break;
                            case "15":
                                html += "<td>玖龙粗制水售水量</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "16":
                                html += "<td>玖龙淡化水售水量</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "17":
                                html += "<td>玖龙供水量</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "18":
                                html += "<td>产销差率</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "19":
                                html += "<td>销售收入</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "20":
                                html += "<td>实收水费</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "21":
                                html += "<td>回款率</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                                


                        }
                    }



                }
                break;
            case "08110013"://年居民水量情况分析表
                {
                    html += "<tr>";
                    html += "<td colspan=\"2\">用水类别/月份</td>";
                    html += "<td>水费</td>";
                    html += "<td>排污费</td>";
                    html += "<td>单价</td>";
                    html += "<td>1月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>2月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>3月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>4月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>5月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>6月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>7月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>8月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>9月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>10月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>11月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>12月水量</td>";
                    html += "<td>所占比率</td>";
                    html += "<td>合计</td>";
                    html += "</tr>";


                    html += "<tr>";
                    html += "<td rowspan=\"6\">居民水量</td>";

                    html += "</tr>";

                    for (var j = 0; j < tableobj.length; j++)
                    {
                        html += "<tr>";
                        switch (j.toString())
                        {
                            case "0":
                                html += "<td>总表</td><td>3.95</td><td>0.95</td><td>4.9</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "1":
                                html += "<td>卡表</td><td>3.95</td><td>0.95</td><td>4.9</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "2":
                                html += "<td>远传表</td><td>3.95</td><td>0.95</td><td>4.9</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "3":
                                html += "<td>入户直收</td><td>3.95</td><td>0.95</td><td>4.9</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "4":
                                html += "<td>总计</td><td></td><td></td><td></td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;



                        }
                    }



                }
                break;
            case "08110014"://年销售水量情况汇总表
                {
                    html += "<tr>";
                    html += "<td colspan=\"2\" rowspan=\"2\">用水类别/月份</td>";
                    html += "<td rowspan=\"2\">单价</td>";
                    html += "<td colspan=\"4\">1月</td>";
                    html += "<td colspan=\"4\">2月</td>";
                    html += "<td colspan=\"4\">3月</td>";
                    html += "<td colspan=\"4\">4月</td>";
                    html += "<td colspan=\"4\">5月</td>";
                    html += "<td colspan=\"4\">6月</td>";
                    html += "<td colspan=\"4\">7月</td>";
                    html += "<td colspan=\"4\">8月</td>";
                    html += "<td colspan=\"4\">9月</td>";
                    html += "<td colspan=\"4\">10月</td>";
                    html += "<td colspan=\"4\">11月</td>";
                    html += "<td colspan=\"4\">12月</td>";
                    html += "<td colspan=\"4\">全年</td>";
                    html += "</tr>";
                    html += "<tr>";
                    for (var i = 0; i < 12; i++)
                    {
                        html += "<td>应收水量</td>";
                        html += "<td>实收水量</td>";
                        html += "<td>所占比率</td>";
                        html += "<td>欠收水量</td>";
                    }
                    html += "<td>应收水量</td>";
                    html += "<td>实收水量</td>";
                    html += "<td>欠收水量</td>";
                    html += "<td>所占比率</td>";

                    html += "</tr>";



                        html += "<tr>";
                        html += "<td rowspan=\"10\">居民用户</td>";

                        html += "</tr>";

                    for (var j = 0; j < tableobj.length; j++)
                    {
                        html += "<tr>";
                        switch (j.toString())
                        {
                            case "0":
                                html += "<td rowspan=\"2\">总表</td><td>4.2</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "1":
                                html += "<td>3.95</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                }); 
                                html += "</tr>";

                                break;
                            case "2":
                                html += "<td rowspan=\"2\">卡表</td><td>3.95</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "3":
                                html += "<td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "4":
                                html += "<td>远传表</td><td>3.95</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "5":
                                html += "<td rowspan=\"3\">入户直收</td><td>3.95</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "6":
                                html += "<td>5.25</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "7":
                                html += "<td>7.05</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "8":
                                html += "<td>销售水量小计</td><td></td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                html += "<tr>";
                                html += "<td rowspan=\"21\">大用户</td>";

                                html += "</tr>";
                                break;
                            case "9":
                                html += "<td rowspan=\"2\">A区(河东)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "10":
                                html += "<td>4.6</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "11":
                                html += "<td rowspan=\"2\">B区(河西)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "12":
                                html += "<td>4.6</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "13":
                                html += "<td rowspan=\"2\">C区(茶淀)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "14":
                                html += "<td>4.6</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "15":
                                html += "<td>E区(杨家泊)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "16":
                                html += "<td>F区(北疆)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "17":
                                html += "<td rowspan=\"2\">G区(中心渔港)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "18":
                                html += "<td>4.6</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "19":
                                html += "<td>H区(开发区)</td><td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "20":
                                html += "<td rowspan=\"2\">I区(生态城)</td><td>5.55</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "21":
                                html += "<td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "22":
                                html += "<td rowspan=\"3\">J区(旅游区)</td><td>4.85</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "23":
                                html += "<td>6.5</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;
                            case "24":
                                html += "<td>6.45</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";

                                break;

                            case "25":
                                html += "<td>自来水销售水量小计</td><td></td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "26":
                                html += "<td>D区(玖龙)粗制水</td><td>3.97</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "27":
                                html += "<td>【D区】玖龙淡化海水</td><td>7.44</td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "28":
                                html += "<td>玖龙销售水量小计</td><td></td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;
                            case "29":
                                html += "<td colspan=\"2\">销售水量总计</td><td></td>";
                                $.each(tableobj[j], function (i, u)
                                {
                                    html += "<td>" + tableobj[j][i] + "</td>";
                                });
                                html += "</tr>";
                                break;

                        }
                    }



                }
                break;
        }
        $("#reporttable").html(html);

        callbackFunction.success();

    },
        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (callBackFunction)
    {

        var codeService_0811 = _baseCodeHashMap.get('codeservice_0811');
        var bblxname = '';
        $.each(codeService_0811, function (i, u)
        {
            if (u['id'] == that._pr_bblx)
            {
                bblxname = u['text'];
            }
        });
        var d = new Date();

        var json = {


            f_value1: basePageObj._userInfoJson.sys_toporgan,


            f_value2: basePageObj._userInfoJson.sys_toporganname,


            f_value3: '',


            f_value4: '',


            f_value5: '',


            f_value6: '',


            f_value7: '',


            f_value8: '',


            f_value9: '',


            f_value10: '',


            f_bbmc: '新建' + basePageObj._userInfoJson.sys_toporganname + bblxname + '_' + d.Format('yyyyMMddhhmmss'),
            f_bblx: bblxname,
            f_bblxid: that._pr_bblx,


            f_zbr: basePageObj._userInfoJson.sys_username,


            f_zbrid: basePageObj._userInfoJson.sys_userid,

            f_zbsj: d.Format('yyyy-MM-dd hh:mm:ss'),
            f_zt: '新建',

            f_ztid: '0',


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
                _gridEditId = result;
                bindGrid(false, {
                    success: function ()
                    {
                        getDetailData({
                            success: function (tbl_ld_report_modallist)
                            {
                                setDetailModel(tbl_ld_report_modallist, {
                                    success: function ()
                                    {
                                        setDisable();
                                        $('#div_detail_modal_tbl_ld_report_modallist').modal('show');
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        callBackFunction.fail('setDetailModel:' + message);
                                    }
                                });

                            },
                            fail: function (message)
                            {
                                callBackFunction.fail('getDetailData:' + message);
                            }
                        });
                    },
                    fail: function (message)
                    {

                        callBackFunction.fail('bindGrid:' + message);
                    }
                });


            },
            fail: function (message)
            {
                callBackFunction.fail('Add:' + message);
            }
        });
    },

    //=============================控件事件===================================

            /* 
            *  
            *  方法:f_bblx_onchange
            *  参数:changeEventParameter
            *  报表类型onchange事件
            */
            f_bblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },






            /* 
            *  
            *  方法:f_zbsj_time_onchange
            *  参数:
            *  制表时间 onchange事件
            */
            f_zbsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
            /* 
            *  
            *  方法:f_zbsj_date_onchange
            *  参数:
            *  制表时间 onchange事件
            */
            f_zbsj_date_onchange = function (e)
            {
                var controlid = e.target.id
            },


            /* 
            *  
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_zt_onchange = function (e)
            {
                var controlid = e.target.id;
            },
            /* 
                   *  
                   *  方法:f_zbr_onchange
                   *  参数:changeEventParameter
                   *  状态onchange事件
                   */
            f_zbr_onchange = function (e)
            {
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
        _pr_appcode: '',

        _pr_isadmin: '',
        _pr_bblx: '',

        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function ()
        {
            try
            {
                _alertMessage = new alertMessage();
                _confirmMessage = new confirmMessage();
                _blockMessage = new blockMessage();
                _resultMessage = new resultMessage();
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
                                                bindGrid(false, {
                                                    success: function ()
                                                    {
                                                        _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_report_modallist');
                                                        _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_ld_report_modallist');
                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_report_modallist');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_report_modallist');


                                                        _ladda_btn_command_save = Ladda.create('btn_detail_modal_save_tbl_ld_report_modallist');
                                                        _ladda_btn_command_submit = Ladda.create('btn_detail_modal_submit_tbl_ld_report_modallist');
                                                        _ladda_btn_command_rollback = Ladda.create('btn_detail_modal_rollback_tbl_ld_report_modallist');

                                                        _ladda_btn_command_download = Ladda.create('btn_detail_modal_download_tbl_ld_report_modallist');


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


                                initBaseCode({
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

                                        initDetailControl({
                                            success: function ()
                                            {

                                                switch (that._pr_listtype)
                                                {
                                                    case "1":



                                                        $('#btn_command_delete_tbl_ld_report_modallist').removeClass('hidden');
                                                        if (that._pr_isadmin == '0')
                                                        {
                                                            $('#btn_command_new_tbl_ld_report_modallist').addClass('hidden');
                                                        }
                                                        else
                                                        {
                                                            $('#btn_command_new_tbl_ld_report_modallist').removeClass('hidden');
                                                        }

                                                        break;
                                                    case "2":



                                                        $('#btn_command_delete_tbl_ld_report_modallist').addClass('hidden');
                                                        $('#btn_command_new_tbl_ld_report_modallist').addClass('hidden');

                                                        break;
                                                }


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
                success: function ()
                {
                    _ladda_btn_command_new.stop();

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
                var currentcount = $('#table_grid_tbl_ld_report_modallist').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条<h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条<h5>';
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
                                        bindGrid(true, {
                                            success: function ()
                                            {
                                                _ladda_btn_command_delete.stop();
                                            }, fail: function (message)
                                            {
                                                _ladda_btn_command_delete.stop();
                                                _alertMessage.show('绑定失败', 'fail');
                                                _resultMessage.show(message);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_delete.stop();
                                        _alertMessage.show('数据删除完成，获取数据条数失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_delete.stop();
                                _alertMessage.show('数据删除失败', 'fail');
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
            $('#table_grid_tbl_ld_report_modallist').bootstrapTable('uncheckAll');
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
        *  简单查询时直接执行，高级查询时打开SearchModel
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
                                        bindGrid(true, {
                                            success: function ()
                                            {

                                            }, fail: function (message)
                                            {
                                                _alertMessage.show('绑定失败', 'fail');
                                                _resultMessage.show(message);
                                            }
                                        });
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
                _alertMessage.show('查询失败<br/>' + ex.message, 'fail');
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
            $('#btn_command_search_tbl_ld_report_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_report_modallist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_report_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_report_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_report_modallist').modal('show');
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
                                    $('#div_search_modal_tbl_ld_report_modallist').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    bindGrid(true, {
                                        success: function ()
                                        {

                                        }, fail: function (message)
                                        {
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
            _validateMessage_search.hidden();
            $('#div_search_modal_tbl_ld_report_modallist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_report_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_report_modallist').removeAttr('disabled');

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
            $('#btn_command_search_tbl_ld_report_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_report_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_report_modallist').modal('show');
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------DetailModel------------------------------------
        //---------------------------------------------------------------------------------





        /* 
        *  
        *  方法:btn_detail_modal_save_onclick
        *  参数:
        *  detailModel保存操作
        *  
        */
        btn_detail_modal_save_onclick: function ()
        {
            _ladda_btn_command_save.start();
            getDetailModel({
                success: function (tbl_ld_report_modallist)
                {
                    checkDetailModel(tbl_ld_report_modallist, {
                        success: function (tbl_ld_report_modallist)
                        {

                            updateDetailData('update', tbl_ld_report_modallist, {
                                success: function (tableobj)
                                {
                                    drawTable(tableobj, {
                                        success: function ()
                                        {
                                            bindGrid(false, {
                                                success: function ()
                                                {
                                                    _ladda_btn_command_save.stop();

                                                }, fail: function (message)
                                                {
                                                    _ladda_btn_command_save.stop();
                                                    _alertMessage.show('绑定失败', 'fail');
                                                    _resultMessage.show(message);
                                                }
                                            });
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _ladda_btn_command_save.stop();
                                    _alertMessage.show('数据更新失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });

                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_save.stop();
                            if (message != '')
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                            else
                            {
                                _alertMessage.show('校验未通过', 'warning');
                            }
                        }
                    });
                }, fail: function (message)
                {

                    _ladda_btn_command_save.stop();
                    _alertMessage.show('数据获取失败', 'warning');
                    _resultMessage.show(message);
                }
            });
        },

        /* 
      *  
      *  方法:btn_detail_modal_submit_onclick
      *  参数:
      *  detailModel提交操作
      *  
      */
        btn_detail_modal_submit_onclick: function ()
        {
            _ladda_btn_command_submit.start();

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '1');
            getDetailModel({
                success: function (tbl_ld_report_modallist)
                {
                    checkDetailModel(tbl_ld_report_modallist, {
                        success: function (tbl_ld_report_modallist)
                        {

                            updateDetailData('submit', tbl_ld_report_modallist, {
                                success: function (tableobj)
                                {
                                    drawTable(tableobj, {
                                        success: function ()
                                        {
                                            bindGrid(false, {
                                                success: function ()
                                                {
                                                    _ladda_btn_command_submit.stop();

                                                    setDisable();

                                                }, fail: function (message)
                                                {
                                                    _ladda_btn_command_submit.stop();

                                                    _alertMessage.show('绑定失败', 'fail');
                                                    _resultMessage.show(message);
                                                }
                                            });
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _ladda_btn_command_submit.stop();
                                    _alertMessage.show('数据更新失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });

                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_submit.stop();
                            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '0');
                            if (message != '')
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                            else
                            {
                                _alertMessage.show('校验未通过', 'warning');
                            }
                        }
                    });
                }, fail: function (message)
                {

                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '0');
                    _ladda_btn_command_submit.stop();
                    _alertMessage.show('数据获取失败', 'warning');
                    _resultMessage.show(message);
                }
            });


        },

        /* 
   *  
   *  方法:btn_detail_modal_download_onclick
   *  参数:
   *  detailModel下载操作
   *  
   */
        btn_detail_modal_download_onclick: function ()
        {
            _ladda_btn_command_download.start();


            var data = {
                sys_id: _gridEditId,
                clientInf: _clientInf

            };

            doAjaxFunction(_serviceUrl, 'DownLoad', data, {
                success: function (message)
                {

                    window.open(message, '_blank');

                    _ladda_btn_command_download.stop();
                },
                fail: function (message)
                {
                    _ladda_btn_command_download.stop();

                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                },
                error: function (message)
                {
                    _ladda_btn_command_download.stop();

                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);




                }
            });




        },
        /* 
      *  
      *  方法:btn_detail_modal_rollback_onclick
      *  参数:
      *  detailModel回滚操作
      *  
      */
        btn_detail_modal_rollback_onclick: function ()
        {

            _ladda_btn_command_rollback.start();

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '0');
            getDetailModel({
                success: function (tbl_ld_report_modallist)
                {
                    checkDetailModel(tbl_ld_report_modallist, {
                        success: function (tbl_ld_report_modallist)
                        {

                            updateDetailData('rollback', tbl_ld_report_modallist, {
                                success: function (tbl_ld_report_modallist)
                                {

                                    bindGrid(false, {
                                        success: function ()
                                        {
                                            _ladda_btn_command_rollback.stop();

                                            setDisable();

                                        }, fail: function (message)
                                        {
                                            _ladda_btn_command_rollback.stop();

                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _ladda_btn_command_rollback.stop();
                                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '1');
                                    _alertMessage.show('数据更新失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });

                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_rollback.stop();
                            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '1');
                            if (message != '')
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                            else
                            {
                                _alertMessage.show('校验未通过', 'warning');
                            }
                        }
                    });
                }, fail: function (message)
                {

                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_report_modallist', '1');
                    _ladda_btn_command_rollback.stop();
                    _alertMessage.show('数据获取失败', 'warning');
                    _resultMessage.show(message);
                }
            });

        },
        /* 
        *  
        *  方法:btn_detail_modal_cancle_onclick
        *  参数:
        *  detailModel关闭操作
        *  
        */
        btn_detail_modal_cancle_onclick: function ()
        {
            $('#div_detail_modal_tbl_ld_report_modallist').modal('hide');
            _validateMessage_detail.hidden();

        },
        end: function ()
        {
        }
    };
    return that;
})();



$(document).ready(function ()
{
    tbl_ld_report_modallist_Obj.init();
});





