


var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_log_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_log.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

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
                    $('#btn_command_search_tbl_ld_log_modallist').html('简单查询');
                    $('#txt_command_search_tbl_ld_log_modallist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_log_modallist').html('高级查询');
                    $('#txt_command_search_tbl_ld_log_modallist').attr("disabled", true);
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
    setDisable = function (isDisable)
    {


        controlObj.textdisable('detail_f_businesstablename_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_businesstableprikeyvalue_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_editusername_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_edituserloginname_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_edituserid_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_edituserip_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_editusermac_tbl_ld_log_modallist', isDisable);

        controlObj.datetimedisable('detail_f_editdatetime_tbl_ld_log_modallist_date', 'detail_f_editdatetime_tbl_ld_log_modallist_time', isDisable);

        controlObj.textdisable('detail_f_edittype_tbl_ld_log_modallist', isDisable);

        controlObj.textdisable('detail_f_editsource_tbl_ld_log_modallist', isDisable);


        controlObj.richtextdisable('detail_f_editcontent_tbl_ld_log_modallist', isDisable);
        controlObj.fileuploaderdisable('detail_f_editcontent_file_tbl_ld_log_modallist', isDisable);
        if (isDisable)
        {
            $('#detail_f_editcontent_resource_tbl_ld_log_modallist').parent().addClass('hidden');
            $('#detail_f_editcontent_file_tbl_ld_log_modallist').parent().addClass('hidden');
        }
        else
        {
            $('#detail_f_editcontent_resource_tbl_ld_log_modallist').parent().removeClass('hidden');
            $('#detail_f_editcontent_file_tbl_ld_log_modallist').parent().removeClass('hidden');
        }

        controlObj.textdisable('detail_f_bz_tbl_ld_log_modallist', isDisable);

        if (isDisable)
        {
            $('#btn_detail_modal_save_tbl_ld_log_modallist').addClass('hidden');
            $('#btn_command_delete_tbl_ld_log_modallist').addClass('hidden');
            $('#btn_command_new_tbl_ld_log_modallist').addClass('hidden');
        }
        else
        {
            $('#btn_detail_modal_save_tbl_ld_log_modallist').removeClass('hidden');
            $('#btn_command_delete_tbl_ld_log_modallist').removeClass('hidden');
            $('#btn_command_new_tbl_ld_log_modallist').removeClass('hidden');
        }
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

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    callBackFunction.success();
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

            controlObj.datetimeinit('search_f_editdatetime_tbl_ld_log_modallist_datefrom', 'search_f_editdatetime_tbl_ld_log_modallist_timefrom');
            controlObj.datetimeinit('search_f_editdatetime_tbl_ld_log_modallist_dateto', 'search_f_editdatetime_tbl_ld_log_modallist_timeto');

            controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_datefrom', 'search_f_editdatetime_tbl_ld_log_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_dateto', 'search_f_editdatetime_tbl_ld_log_modallist_timeto', '1900-01-01 00:00:00');

            //模态窗口
            $('#div_search_modal_tbl_ld_log_modallist').modal({
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
                        $("#txt_command_search_tbl_ld_log_modallist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_log_modallist = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value10);

                        controlObj.text('search_f_businesstablename_tbl_ld_log_modallist', tbl_ld_log_modallist.f_businesstablename);

                        controlObj.text('search_f_businesstableprikeyvalue_tbl_ld_log_modallist', tbl_ld_log_modallist.f_businesstableprikeyvalue);

                        controlObj.text('search_f_editusername_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editusername);

                        controlObj.text('search_f_edituserloginname_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserloginname);

                        controlObj.text('search_f_edituserid_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserid);

                        controlObj.text('search_f_edituserip_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserip);

                        controlObj.text('search_f_editusermac_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editusermac);


                        controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_datefrom', 'search_f_editdatetime_tbl_ld_log_modallist_timefrom', tbl_ld_log_modallist.f_editdatetimefrom);
                        controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_dateto', 'search_f_editdatetime_tbl_ld_log_modallist_timeto', tbl_ld_log_modallist.f_editdatetimeto);

                        controlObj.text('search_f_edittype_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edittype);

                        controlObj.text('search_f_editsource_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editsource);

                        controlObj.text('search_f_editcontent_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editcontent);

                        controlObj.text('search_f_bz_tbl_ld_log_modallist', tbl_ld_log_modallist.f_bz);


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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_log_modallist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_log_modallist = new Object();


                    tbl_ld_log_modallist.f_value1 = controlObj.text('search_f_value1_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value2 = controlObj.text('search_f_value2_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value3 = controlObj.text('search_f_value3_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value4 = controlObj.text('search_f_value4_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value5 = controlObj.text('search_f_value5_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value6 = controlObj.text('search_f_value6_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value7 = controlObj.text('search_f_value7_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value8 = controlObj.text('search_f_value8_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value9 = controlObj.text('search_f_value9_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_value10 = controlObj.text('search_f_value10_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_businesstablename = controlObj.text('search_f_businesstablename_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_businesstableprikeyvalue = controlObj.text('search_f_businesstableprikeyvalue_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_editusername = controlObj.text('search_f_editusername_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_edituserloginname = controlObj.text('search_f_edituserloginname_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_edituserid = controlObj.text('search_f_edituserid_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_edituserip = controlObj.text('search_f_edituserip_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_editusermac = controlObj.text('search_f_editusermac_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_editdatetimefrom = controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_datefrom', 'search_f_editdatetime_tbl_ld_log_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_log_modallist.f_editdatetimeto = controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_dateto', 'search_f_editdatetime_tbl_ld_log_modallist_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_log_modallist.f_edittype = controlObj.text('search_f_edittype_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_editsource = controlObj.text('search_f_editsource_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_editcontent = controlObj.text('search_f_editcontent_tbl_ld_log_modallist');


                    tbl_ld_log_modallist.f_bz = controlObj.text('search_f_bz_tbl_ld_log_modallist');

                    that._pr_searchcontent.type2 = tbl_ld_log_modallist;
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
            var tbl_ld_log_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_log_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_businesstablename.length > 200)
            {
                errorMessageHansMap.put('search_f_businesstablename_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_businesstableprikeyvalue.length > 200)
            {
                errorMessageHansMap.put('search_f_businesstableprikeyvalue_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_editusername.length > 200)
            {
                errorMessageHansMap.put('search_f_editusername_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_edituserloginname.length > 200)
            {
                errorMessageHansMap.put('search_f_edituserloginname_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_edituserid.length > 200)
            {
                errorMessageHansMap.put('search_f_edituserid_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_edituserip.length > 200)
            {
                errorMessageHansMap.put('search_f_edituserip_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_editusermac.length > 200)
            {
                errorMessageHansMap.put('search_f_editusermac_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_log_modallist.f_edittype.length > 200)
            {
                errorMessageHansMap.put('search_f_edittype_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_editsource.length > 200)
            {
                errorMessageHansMap.put('search_f_editsource_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_log_modallist.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_businesstablename = '';
                controlObj.text('search_f_businesstablename_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_businesstablename);


                that._pr_searchcontent.type2.f_businesstableprikeyvalue = '';
                controlObj.text('search_f_businesstableprikeyvalue_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_businesstableprikeyvalue);


                that._pr_searchcontent.type2.f_editusername = '';
                controlObj.text('search_f_editusername_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_editusername);


                that._pr_searchcontent.type2.f_edituserloginname = '';
                controlObj.text('search_f_edituserloginname_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_edituserloginname);


                that._pr_searchcontent.type2.f_edituserid = '';
                controlObj.text('search_f_edituserid_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_edituserid);


                that._pr_searchcontent.type2.f_edituserip = '';
                controlObj.text('search_f_edituserip_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_edituserip);


                that._pr_searchcontent.type2.f_editusermac = '';
                controlObj.text('search_f_editusermac_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_editusermac);


                that._pr_searchcontent.type2.f_editdatetimefrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_editdatetimeto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_datefrom', 'search_f_editdatetime_tbl_ld_log_modallist_timefrom', that._pr_searchcontent.type2.f_editdatetimefrom);
                controlObj.datetime('search_f_editdatetime_tbl_ld_log_modallist_dateto', 'search_f_editdatetime_tbl_ld_log_modallist_timeto', that._pr_searchcontent.type2.f_editdatetimeto);


                that._pr_searchcontent.type2.f_edittype = '';
                controlObj.text('search_f_edittype_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_edittype);


                that._pr_searchcontent.type2.f_editsource = '';
                controlObj.text('search_f_editsource_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_editsource);


                that._pr_searchcontent.type2.f_editcontent = '';
                controlObj.text('search_f_editcontent_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_editcontent);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_log_modallist', that._pr_searchcontent.type2.f_bz);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_log_modallist").val('');
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

                                    whereClause += " f_businesstablename like '%" + vv[i] + "%' or ";

                                    whereClause += " f_businesstableprikeyvalue like '%" + vv[i] + "%' or ";

                                    whereClause += " f_editusername like '%" + vv[i] + "%' or ";

                                    whereClause += " f_edituserloginname like '%" + vv[i] + "%' or ";

                                    whereClause += " f_edituserid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_edituserip like '%" + vv[i] + "%' or ";

                                    whereClause += " f_editusermac like '%" + vv[i] + "%' or ";

                                    whereClause += " to_char(f_editdatetime,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_edittype like '%" + vv[i] + "%' or ";

                                    whereClause += " f_editsource like '%" + vv[i] + "%' or ";

                                    whereClause += " f_editcontent like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_log_modallist = that._pr_searchcontent.type2;



                        if (tbl_ld_log_modallist.f_businesstablename.length > 0)
                        {
                            whereClause += " f_businesstablename like '%" + tbl_ld_log_modallist.f_businesstablename + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_businesstableprikeyvalue.length > 0)
                        {
                            whereClause += " f_businesstableprikeyvalue like '%" + tbl_ld_log_modallist.f_businesstableprikeyvalue + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_editusername.length > 0)
                        {
                            whereClause += " f_editusername like '%" + tbl_ld_log_modallist.f_editusername + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_edituserloginname.length > 0)
                        {
                            whereClause += " f_edituserloginname like '%" + tbl_ld_log_modallist.f_edituserloginname + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_edituserid.length > 0)
                        {
                            whereClause += " f_edituserid like '%" + tbl_ld_log_modallist.f_edituserid + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_edituserip.length > 0)
                        {
                            whereClause += " f_edituserip like '%" + tbl_ld_log_modallist.f_edituserip + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_editusermac.length > 0)
                        {
                            whereClause += " f_editusermac like '%" + tbl_ld_log_modallist.f_editusermac + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_editdatetimefrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_editdatetime >= to_date('" + tbl_ld_log_modallist.f_editdatetimefrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_log_modallist.f_editdatetimeto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_editdatetime <= to_date('" + tbl_ld_log_modallist.f_editdatetimeto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_log_modallist.f_edittype.length > 0)
                        {
                            whereClause += " f_edittype like '%" + tbl_ld_log_modallist.f_edittype + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_editsource.length > 0)
                        {
                            whereClause += " f_editsource like '%" + tbl_ld_log_modallist.f_editsource + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_editcontent.length > 0)
                        {
                            whereClause += " f_editcontent like '%" + tbl_ld_log_modallist.f_editcontent + "%' and ";
                        }


                        if (tbl_ld_log_modallist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_log_modallist.f_bz + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_log_modallist').addClass('hidden');


        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_log_modallist').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_log_modallist').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_log_modallist .cc-badge-p').html(currentcount + '/' + allcount);


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

            $('#table_grid_tbl_ld_log_modallist').bootstrapTable({
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

                                if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                {
                                    return {
                                        disabled: false,
                                        checked: true
                                    }
                                }
                                return value;
                                break;
                            case "2":
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
                                break;
                        }
                    }
                },
                {
                    field: 'sys_id', title: 'sys_id', "class": 'hidden',
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
                    field: 'f_businesstablename',
                    title: '业务表名称',
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
                    field: 'f_businesstableprikeyvalue',
                    title: '业务表主键值',
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
                    field: 'f_editusername',
                    title: '修改人姓名',
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
                    field: 'f_edituserloginname',
                    title: '修改人登录名',
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
                    field: 'f_edituserid',
                    title: '修改人ID',
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
                    field: 'f_edituserip',
                    title: '修改人IP地址',
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
                    field: 'f_editusermac',
                    title: '修改人MAC地址',
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
                    field: 'f_editdatetime',
                    title: '修改时间',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_edittype',
                    title: '修改类型',
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
                    field: 'f_editsource',
                    title: '修改来源',
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
                    field: 'f_editcontentid',
                    title: '修改内容id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
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
                },

                {
                    field: '', title: '操作', "class": 'gridcell-editcolumn',
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

                            _gridEditId = row.sys_id;
                            getDetailData({
                                success: function (tbl_ld_log_modallist)
                                {
                                    setDetailModel(tbl_ld_log_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_ld_log_modallist').modal('show');
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
                                success: function (tbl_ld_log_modallist)
                                {
                                    setDetailModel(tbl_ld_log_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_ld_log_modallist').modal('show');
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
                    var rows = $('#table_grid_tbl_ld_log_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_log_modallist').bootstrapTable('getData');
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
            _gridStatusScrollTop = $('#table_grid_tbl_ld_log_modallist').parent().scrollTop();
        }

        setTimeout(function ()
        {
            var whereClause = _whereClauseString;
            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_businesstablename^f_businesstableprikeyvalue^f_editusername^f_edituserloginname^f_edituserid^f_edituserip^f_editusermac^f_editdatetime^f_edittype^f_editsource^f_editcontent^f_editcontentid^f_bz^sys_id';

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
                    $('#table_grid_tbl_ld_log_modallist').bootstrapTable("loadJson", messageJson);
                    //定位
                    $('#table_grid_tbl_ld_log_modallist').parent().scrollTop(_gridStatusScrollTop);
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

            controlObj.datetimeinit('detail_f_editdatetime_tbl_ld_log_modallist_date', 'detail_f_editdatetime_tbl_ld_log_modallist_time', f_editdatetime_date_onchange, f_editdatetime_time_onchange);

            controlObj.richtextinit('detail_f_editcontent_tbl_ld_log_modallist', f_editcontent_onchange);
            controlObj.fileuploaderinit('detail_f_editcontent_file_tbl_ld_log_modallist', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "isThumbnailImgShow": false, onDeleteEnd: function (filerealname, msg) { f_editcontent_file_onchange(); } }, f_editcontent_file_onchange);



            //模态窗口
            $('#div_detail_modal_tbl_ld_log_modallist').modal({
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
    *  根据传入的tbl_ld_log_modallist，绑定DetailModel
    */
    setDetailModel = function (tbl_ld_log_modallist, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value10);

            controlObj.text('detail_f_businesstablename_tbl_ld_log_modallist', tbl_ld_log_modallist.f_businesstablename);

            controlObj.text('detail_f_businesstableprikeyvalue_tbl_ld_log_modallist', tbl_ld_log_modallist.f_businesstableprikeyvalue);

            controlObj.text('detail_f_editusername_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editusername);

            controlObj.text('detail_f_edituserloginname_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserloginname);

            controlObj.text('detail_f_edituserid_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserid);

            controlObj.text('detail_f_edituserip_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserip);

            controlObj.text('detail_f_editusermac_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editusermac);


            controlObj.datetime('detail_f_editdatetime_tbl_ld_log_modallist_date', 'detail_f_editdatetime_tbl_ld_log_modallist_time', tbl_ld_log_modallist.f_editdatetime);

            controlObj.text('detail_f_edittype_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edittype);

            controlObj.text('detail_f_editsource_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editsource);


            controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editcontent);
            controlObj.fileuploaderbind('detail_f_editcontent_file_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editcontentid);
            f_editcontent_file_onchange();

            controlObj.text('detail_f_bz_tbl_ld_log_modallist', tbl_ld_log_modallist.f_bz.returnStringRN());


            callBackFunction.success();
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
            var tbl_ld_log_modallist = new Object();


            tbl_ld_log_modallist.f_value1 = controlObj.text('detail_f_value1_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value2 = controlObj.text('detail_f_value2_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value3 = controlObj.text('detail_f_value3_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value4 = controlObj.text('detail_f_value4_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value5 = controlObj.text('detail_f_value5_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value6 = controlObj.text('detail_f_value6_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value7 = controlObj.text('detail_f_value7_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value8 = controlObj.text('detail_f_value8_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value9 = controlObj.text('detail_f_value9_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_value10 = controlObj.text('detail_f_value10_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_businesstablename = controlObj.text('detail_f_businesstablename_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_businesstableprikeyvalue = controlObj.text('detail_f_businesstableprikeyvalue_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_editusername = controlObj.text('detail_f_editusername_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_edituserloginname = controlObj.text('detail_f_edituserloginname_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_edituserid = controlObj.text('detail_f_edituserid_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_edituserip = controlObj.text('detail_f_edituserip_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_editusermac = controlObj.text('detail_f_editusermac_tbl_ld_log_modallist');

            tbl_ld_log_modallist.f_editdatetime = controlObj.datetime('detail_f_editdatetime_tbl_ld_log_modallist_date', 'detail_f_editdatetime_tbl_ld_log_modallist_time');


            tbl_ld_log_modallist.f_edittype = controlObj.text('detail_f_edittype_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_editsource = controlObj.text('detail_f_editsource_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_editcontent = controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist');
            tbl_ld_log_modallist.f_editcontentid = controlObj.fileuploaderid('detail_f_editcontent_file_tbl_ld_log_modallist');


            tbl_ld_log_modallist.f_bz = controlObj.text('detail_f_bz_tbl_ld_log_modallist');

            callBackFunction.success(tbl_ld_log_modallist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_log_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ld_log_modallist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_log_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_businesstablename.length > 200)
            {
                errorMessageHansMap.put('detail_f_businesstablename_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_businesstableprikeyvalue.length > 200)
            {
                errorMessageHansMap.put('detail_f_businesstableprikeyvalue_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_editusername.length > 200)
            {
                errorMessageHansMap.put('detail_f_editusername_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_edituserloginname.length > 200)
            {
                errorMessageHansMap.put('detail_f_edituserloginname_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_edituserid.length > 200)
            {
                errorMessageHansMap.put('detail_f_edituserid_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_edituserip.length > 200)
            {
                errorMessageHansMap.put('detail_f_edituserip_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_log_modallist.f_editusermac.length > 200)
            {
                errorMessageHansMap.put('detail_f_editusermac_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_log_modallist.f_edittype.length > 200)
            {
                errorMessageHansMap.put('detail_f_edittype_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_log_modallist.f_editsource.length > 200)
            {
                errorMessageHansMap.put('detail_f_editsource_tbl_ld_log_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_log_modallist.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_log_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ld_log_modallist);
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
    *  参数:tbl_ld_log_modallist
    *  清空数据对象
    */
    clearDetailModel = function (tbl_ld_log_modallist)
    {


        tbl_ld_log_modallist.f_value1 = '';
        controlObj.text('detail_f_value1_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value1);

        tbl_ld_log_modallist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value2);

        tbl_ld_log_modallist.f_value3 = '';
        controlObj.text('detail_f_value3_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value3);

        tbl_ld_log_modallist.f_value4 = '';
        controlObj.text('detail_f_value4_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value4);

        tbl_ld_log_modallist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value5);

        tbl_ld_log_modallist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value6);

        tbl_ld_log_modallist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value7);

        tbl_ld_log_modallist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value8);

        tbl_ld_log_modallist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value9);

        tbl_ld_log_modallist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ld_log_modallist', tbl_ld_log_modallist.f_value10);

        tbl_ld_log_modallist.f_businesstablename = '';
        controlObj.text('detail_f_businesstablename_tbl_ld_log_modallist', tbl_ld_log_modallist.f_businesstablename);

        tbl_ld_log_modallist.f_businesstableprikeyvalue = '';
        controlObj.text('detail_f_businesstableprikeyvalue_tbl_ld_log_modallist', tbl_ld_log_modallist.f_businesstableprikeyvalue);

        tbl_ld_log_modallist.f_editusername = '';
        controlObj.text('detail_f_editusername_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editusername);

        tbl_ld_log_modallist.f_edituserloginname = '';
        controlObj.text('detail_f_edituserloginname_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserloginname);

        tbl_ld_log_modallist.f_edituserid = '';
        controlObj.text('detail_f_edituserid_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserid);

        tbl_ld_log_modallist.f_edituserip = '';
        controlObj.text('detail_f_edituserip_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edituserip);

        tbl_ld_log_modallist.f_editusermac = '';
        controlObj.text('detail_f_editusermac_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editusermac);


        tbl_ld_log_modallist.f_editdatetime = '1900-01-01';
        controlObj.datetime('detail_f_editdatetime_tbl_ld_log_modallist_date', 'detail_f_editdatetime_tbl_ld_log_modallist_time', tbl_ld_log_modallist.f_editdatetime);

        tbl_ld_log_modallist.f_edittype = '';
        controlObj.text('detail_f_edittype_tbl_ld_log_modallist', tbl_ld_log_modallist.f_edittype);

        tbl_ld_log_modallist.f_editsource = '';
        controlObj.text('detail_f_editsource_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editsource);


        tbl_ld_log_modallist.f_editcontent = '';
        tbl_ld_log_modallist.f_editcontentid = '';
        controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editcontent);
        controlObj.fileuploaderbind('detail_f_editcontent_file_tbl_ld_log_modallist', tbl_ld_log_modallist.f_editcontentid);
        f_editcontent_file_onchange();

        tbl_ld_log_modallist.f_bz = '';
        controlObj.text('detail_f_bz_tbl_ld_log_modallist', tbl_ld_log_modallist.f_bz.returnStringRN());


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
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_businesstablename^f_businesstableprikeyvalue^f_editusername^f_edituserloginname^f_edituserid^f_edituserip^f_editusermac^f_editdatetime^f_edittype^f_editsource^f_editcontent^f_editcontentid^f_bz^sys_id';

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
    *  参数:tbl_ld_log_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_ld_log_modallist, callbackFunction)
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_businesstablename^f_businesstableprikeyvalue^f_editusername^f_edituserloginname^f_edituserid^f_edituserip^f_editusermac^f_editdatetime^f_edittype^f_editsource^f_editcontent^f_editcontentid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridEditId,


            f_value1: tbl_ld_log_modallist.f_value1,

            f_value2: tbl_ld_log_modallist.f_value2,

            f_value3: tbl_ld_log_modallist.f_value3,

            f_value4: tbl_ld_log_modallist.f_value4,

            f_value5: tbl_ld_log_modallist.f_value5,

            f_value6: tbl_ld_log_modallist.f_value6,

            f_value7: tbl_ld_log_modallist.f_value7,

            f_value8: tbl_ld_log_modallist.f_value8,

            f_value9: tbl_ld_log_modallist.f_value9,

            f_value10: tbl_ld_log_modallist.f_value10,

            f_businesstablename: tbl_ld_log_modallist.f_businesstablename,

            f_businesstableprikeyvalue: tbl_ld_log_modallist.f_businesstableprikeyvalue,

            f_editusername: tbl_ld_log_modallist.f_editusername,

            f_edituserloginname: tbl_ld_log_modallist.f_edituserloginname,

            f_edituserid: tbl_ld_log_modallist.f_edituserid,

            f_edituserip: tbl_ld_log_modallist.f_edituserip,

            f_editusermac: tbl_ld_log_modallist.f_editusermac,

            f_editdatetime: tbl_ld_log_modallist.f_editdatetime,

            f_edittype: tbl_ld_log_modallist.f_edittype,

            f_editsource: tbl_ld_log_modallist.f_editsource,

            f_editcontent: tbl_ld_log_modallist.f_editcontent,
            f_editcontentid: tbl_ld_log_modallist.f_editcontentid,

            f_bz: tbl_ld_log_modallist.f_bz.formatStringRN(),


            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')

        };


        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json)
        };
        doAjaxFunction(_serviceUrl, 'Update', data, {
            success: function (message)
            {
                callbackFunction.success(tbl_ld_log_modallist);
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


            f_businesstablename: '',


            f_businesstableprikeyvalue: '',


            f_editusername: '',


            f_edituserloginname: '',


            f_edituserid: '',


            f_edituserip: '',


            f_editusermac: '',

            f_editdatetime: '1900-01-01 00:00:00',


            f_edittype: '',


            f_editsource: '',

            f_editcontentid: controlObj.fileuploadernewfileid(),
            f_editcontent: '',


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
                            success: function (tbl_ld_log_modallist)
                            {
                                setDetailModel(tbl_ld_log_modallist, {
                                    success: function ()
                                    {
                                        $('#div_detail_modal_tbl_ld_log_modallist').modal('show');
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
            *  方法:f_editdatetime_time_onchange
            *  参数:
            *  修改时间 onchange事件
            */
            f_editdatetime_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
            /* 
            *  
            *  方法:f_editdatetime_date_onchange
            *  参数:
            *  修改时间 onchange事件
            */
            f_editdatetime_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },






            /* 
            *  
            *  方法:f_editcontent_onchange
            *  参数:contents, $editable
            *  修改内容 onchange事件
            */
            f_editcontent_onchange = function (contents, e)
            {
                var controlid = e.context.id;
            },
            f_editcontent_file_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_editcontent_file_tbl_ld_log_modallist');
                var serviceFileUrl = '//118.190.153.57/sara.dd.ldsw.file/service/fileupload/service_fileuploaddo.asmx/';
                var data = { fileid: fileid };
                doAjaxFunction(serviceFileUrl, 'getFileListByFileid', data, {
                    success: function (result)
                    {
                        try
                        {
                            var messageJsonArray = (new Function("", "return " + result))();
                            var html = '';
                            $.each(messageJsonArray, function (i, u)
                            {
                                var fileJson = messageJsonArray[i];
                                var nameArr = fileJson["fileuploadname"].split('.');
                                var fileextname = nameArr[nameArr.length - 1];
                                if (',jpg,jpeg,gif,png,bmp,'.indexOf((',' + fileextname + ',').toLowerCase()) > -1)
                                {
                                    html += '<div class="div_imgtorich" fileuploadname="' + fileJson["fileuploadname"] + '" filerealname="' + fileJson["filerealname"] + '"   fileextname = "' + fileextname + '">';
                                    html += fileJson["filerealname"];
                                    html += '<img width="100" height="50" alt="' + fileJson["filerealname"] + '" src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileJson["fileuploadname"] + '"/>';
                                    html += '</div>';
                                }
                                else
                                {
                                    html += '<div class="div_filetorich" fileuploadname="' + fileJson["fileuploadname"] + '" filerealname="' + fileJson["filerealname"] + '"   fileextname = "' + fileextname + '" >';
                                    html += '<a>' + fileJson["filerealname"] + '</a>';
                                    html += '</div>';
                                }
                            });
                            var $resource = $('#detail_f_editcontent_resource_tbl_ld_log_modallist');
                            $resource.html(html);
                            $resource.find('.div_imgtorich,.div_filetorich').on('click', function (e)
                            {
                                var $div = $(e.target.parentElement);
                                var fileuploadname = $div.attr('fileuploadname');
                                var filerealname = $div.attr('filerealname');
                                var fileextname = $div.attr('fileextname');

                                switch (fileextname.toLowerCase())
                                {
                                    case "png":
                                    case "gif":
                                    case "jpg":
                                    case "jpeg":
                                    case "bmp":
                                        {
                                            controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist', '<br/><img src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '" style="position:static;max-width: 100%;"/>' + controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist'));
                                        }
                                        break;
                                    default:
                                        {
                                            controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist', '<br/><a href = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '">' + filerealname + '</a>' + controlObj.richtext('detail_f_editcontent_tbl_ld_log_modallist'));
                                        }
                                        break;
                                }

                            });
                        }
                        catch (ex)
                        {
                            _alertMessage.show('getFileListByFileid执行失败。', 'fail');
                            _resultMessage.show('getFileListByFileid执行失败<br/>' + ex.message, 'fail');
                        }
                    },
                    fail: function (message)
                    {
                        _alertMessage.show('getFileListByFileid执行失败。', 'fail');
                        _resultMessage.show('getFileListByFileid执行失败<br/>' + message, 'fail');
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
                                                        _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_log_modallist');
                                                        _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_ld_log_modallist');
                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_log_modallist');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_log_modallist');
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
                                                        setDisable(false);
                                                        break;
                                                    case "2":
                                                        setDisable(true);
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
                var currentcount = $('#table_grid_tbl_ld_log_modallist').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_log_modallist').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_log_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_log_modallist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_log_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_log_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_log_modallist').modal('show');
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
                                    $('#div_search_modal_tbl_ld_log_modallist').modal('hide')
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
            $('#div_search_modal_tbl_ld_log_modallist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_log_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_log_modallist').removeAttr('disabled');

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
            $('#btn_command_search_tbl_ld_log_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_log_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_log_modallist').modal('show');
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
            getDetailModel({
                success: function (tbl_ld_log_modallist)
                {
                    checkDetailModel(tbl_ld_log_modallist, {
                        success: function (tbl_ld_log_modallist)
                        {

                            updateDetailData(tbl_ld_log_modallist, {
                                success: function (tbl_ld_log_modallist)
                                {
                                    clearDetailModel(tbl_ld_log_modallist);
                                    $('#div_detail_modal_tbl_ld_log_modallist').modal('hide')
                                    bindGrid(false, {
                                        success: function ()
                                        {

                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _alertMessage.show('数据更新失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });

                        },
                        fail: function (message)
                        {
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
            $('#div_detail_modal_tbl_ld_log_modallist').modal('hide');
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
    tbl_ld_log_modallist_Obj.init();
});





