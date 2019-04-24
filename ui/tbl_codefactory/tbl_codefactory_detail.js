var _pr_fromurl = '';
var _pr_fromurlparam = '';

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var tbl_codefactory_detail_Obj = ( function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//162.16.166.1/sara.dd.ldsw/service/service_tbl_codefactory.asmx/';
    var _baseCodeHashMap = null,
    _validateMessage = null,

    _ladda_btn_command_save = null,

    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function ( callBackFunction )
    {
        try
        {
            _pr_fromurl = requestQuery( 'fromurl' );
            _pr_fromurlparam = requestQuery( 'fromurlparam' );
            that._pr_sys_id = requestQuery( 'sys_id' );
            that._pr_pagetype = requestQuery( 'pagetype' );
            _pr_appcode = requestQuery( 'appcode' );

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

            if ( that._pr_sys_id == null || that._pr_sys_id == '' )
            {
                _blockMessage.show( '_pr_sys_id参数接收失败', 'fail' );
            }
            else if ( that._pr_pagetype == null || that._pr_pagetype == '' )
            {
                _blockMessage.show( '_pr_pagetype参数接收失败...', 'fail' );
            }
            else
            {
                callBackFunction.success();
            }
        }
        catch ( ex )
        {
            _blockMessage.show( 'initParameter执行失败' + ex.message, 'fail' );
        }

    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callbackFunction
    *  初始化code内容，存储在_baseCodeHashMap
    */
    initBaseCode = function ( callBackFunction )
    {

        commonObj.getCodeServiceJson( '0808', {
            success: function ( resultArray )
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put( 'servicecode_0108', resultArray['0808'] );

                    _baseCodeHashMap.put( 'servicecode_array', ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] );

                    callBackFunction.success();
                }
                catch ( ex )
                {
                    _blockMessage.show( 'initBaseCode执行失败。<br/>' + ex.message, 'fail' );
                }
            }
        } );

    },

    /* 
    *  
    *  方法:initControl
    *  参数:callbackFunction
    *  初始化控件，会使用到_baseCodeHashMap
    */
    initControl = function ( callBackFunction )
    {
        try
        {

            //单选下拉列表
            var resultArray = _baseCodeHashMap.get( 'servicecode_0108' );
            $.each( resultArray, function ( i, u )
            {
                if ( i == 3 )//通过此disabled属性可以设定某个选项不可被选中
                {
                    resultArray[i].disabled = true;
                    resultArray[i].locked = false;
                }

                if ( i == 5 )//通过此locked属性可以设定某个选项在复选中后不可关闭
                {
                    resultArray[i].disabled = false;
                    resultArray[i].locked = true;
                }
            } );

            var contentArray = _baseCodeHashMap.get( 'servicecode_array' );

            controlObj.placeholder( "detail_txt_f_text3_tbl_codefactory_detail", "9-aaa.999" );

            controlObj.singledropdownlistinit( 'detail_dropdown_f_singledropdownlist_tbl_codefactory_detail', resultArray, dropdown_f_singledropdownlist_onchange );

            controlObj.multidropdownlistinit( 'detail_dropdown_f_multidropdownlist_tbl_codefactory_detail', resultArray, dropdown_f_multidropdownlist_onchange );

            controlObj.itemlistinit( 'detail_list_f_itemlist_tbl_codefactory_detail', resultArray, list_f_itemlist_onclick );//, {repeatColumns:2,width:70});

            controlObj.toggleinit( 'detail_ck_f_toggle_tbl_codefactory_detail', ck_f_toggle_onswitchchange );

            controlObj.checklistinit( 'detail_list_f_checklist_tbl_codefactory_detail', resultArray, list_f_checklist_onclick );

            controlObj.radiolistinit( 'detail_list_f_radiolist_tbl_codefactory_detail', resultArray, list_f_radiolist_onclick );

            controlObj.autocompleteinit( 'detail_txt_f_autocomplete_tbl_codefactory_detail', contentArray, txt_f_autocomplete_onselected );

            controlObj.datetimeinit( 'detail_datetime_f_datetime_tbl_codefactory_detail_date', 'detail_datetime_f_datetime_tbl_codefactory_detail_time', datetime_f_datetime_date_onchange, datetime_f_datetime_time_onchange );

            controlObj.sliderinit( 'detail_slider_f_slider_tbl_codefactory_detail', slider_f_slider_onchange );

            controlObj.richtextinit( 'detail_txt_f_richtext_tbl_codefactory_detail', txt_f_richtext_onchange );

            controlObj.fileuploaderinit( 'detail_file_f_file_tbl_codefactory_detail', {}, file_f_file_onchange );

            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'initControl执行失败。<br/>' + ex.message, 'fail' );
        }
    },


    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件状态
    */
    setDisable = function ( isDisable )
    {
        try
        {
            controlObj.textdisable( 'detail_txt_f_text1_tbl_codefactory_detail', isDisable );

            controlObj.textdisable( 'detail_txt_f_text2_tbl_codefactory_detail', isDisable );

            if ( isDisable )
            {
                $( '#btn_detail_txt_f_text2_tbl_codefactory_detail' ).attr( 'disabled', 'disabled' );
            }
            else
            {
                $( '#btn_detail_txt_f_text2_tbl_codefactory_detail' ).removeAttr( 'disabled' );
            }

            controlObj.textdisable( 'detail_txt_f_text3_tbl_codefactory_detail', isDisable );


            controlObj.singledropdownlistdisable( 'detail_dropdown_f_singledropdownlist_tbl_codefactory_detail', isDisable );

            controlObj.multidropdownlistdisable( 'detail_dropdown_f_multidropdownlist_tbl_codefactory_detail', isDisable );

            controlObj.itemlistdisable( 'detail_list_f_itemlist_tbl_codefactory_detail', isDisable );


            controlObj.toggledisable( 'detail_ck_f_toggle_tbl_codefactory_detail', isDisable );


            controlObj.checklistdisable( 'detail_list_f_checklist_tbl_codefactory_detail', isDisable );


            controlObj.radiolistdisable( 'detail_list_f_radiolist_tbl_codefactory_detail', isDisable );

            controlObj.textdisable( 'detail_txt_f_autocomplete_tbl_codefactory_detail', isDisable );

            controlObj.datetimedisable( 'detail_datetime_f_datetime_tbl_codefactory_detail_date', 'detail_datetime_f_datetime_tbl_codefactory_detail_time', isDisable );

            controlObj.sliderdisable( 'detail_slider_f_slider_tbl_codefactory_detail', isDisable );

            controlObj.textdisable( 'detail_txt_f_textarea_tbl_codefactory_detail', isDisable );


            controlObj.richtextdisable( 'detail_txt_f_richtext_tbl_codefactory_detail', isDisable );

            controlObj.fileuploaderdisable( 'detail_file_f_file_tbl_codefactory_detail', isDisable );

            if ( isDisable )
            {
                $( '#btn_command_save_tbl_codefactory_detail' ).addClass( 'hidden' );
                $( '.btn-command-message' ).attr( 'disabled', 'disabled' );
            }
            else
            {
                $( '#btn_command_save_tbl_codefactory_detail' ).removeClass( 'hidden' );
                $( '.btn-command-message' ).removeAttr( 'disabled' );
            }
        }
        catch ( ex )
        {
            _blockMessage.show( 'setDisable执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Model操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:bindModel
    *  参数:tbl_codefactory_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    bindModel = function ( tbl_codefactory_detail, callBackFunction )
    {
        controlObj.text( 'detail_txt_f_value1_tbl_codefactory_detail', tbl_codefactory_detail.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_codefactory_detail', tbl_codefactory_detail.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_codefactory_detail', tbl_codefactory_detail.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_codefactory_detail', tbl_codefactory_detail.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_codefactory_detail', tbl_codefactory_detail.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_codefactory_detail', tbl_codefactory_detail.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_codefactory_detail', tbl_codefactory_detail.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_codefactory_detail', tbl_codefactory_detail.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_codefactory_detail', tbl_codefactory_detail.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_codefactory_detail', tbl_codefactory_detail.f_value10 );

        controlObj.text( 'detail_txt_f_text1_tbl_codefactory_detail', tbl_codefactory_detail.f_text1 );

        controlObj.text( 'detail_txt_f_text2_tbl_codefactory_detail', tbl_codefactory_detail.f_text2 );

        controlObj.text( 'detail_txt_f_text3_tbl_codefactory_detail', tbl_codefactory_detail.f_text3 );

        controlObj.singledropdownlistid( 'detail_dropdown_f_singledropdownlist_tbl_codefactory_detail', tbl_codefactory_detail.f_singledropdownlistid );

        controlObj.multidropdownlistid( 'detail_dropdown_f_multidropdownlist_tbl_codefactory_detail', tbl_codefactory_detail.f_multidropdownlistid );


        controlObj.itemlistid( 'detail_list_f_itemlist_tbl_codefactory_detail', tbl_codefactory_detail.f_itemlistid );

        controlObj.toggle( 'detail_ck_f_toggle_tbl_codefactory_detail', tbl_codefactory_detail.f_toggle );


        controlObj.checklistid( 'detail_list_f_checklist_tbl_codefactory_detail', tbl_codefactory_detail.f_checklistid );


        controlObj.radiolistid( 'detail_list_f_radiolist_tbl_codefactory_detail', tbl_codefactory_detail.f_radiolistid );

        controlObj.text( 'detail_txt_f_autocomplete_tbl_codefactory_detail', tbl_codefactory_detail.f_autocomplete );


        controlObj.datetime( 'detail_datetime_f_datetime_tbl_codefactory_detail_date', 'detail_datetime_f_datetime_tbl_codefactory_detail_time', tbl_codefactory_detail.f_datetime );

        controlObj.slider( 'detail_slider_f_slider_tbl_codefactory_detail', tbl_codefactory_detail.f_slider );

        controlObj.text( 'detail_txt_f_textarea_tbl_codefactory_detail', tbl_codefactory_detail.f_textarea.returnStringRN() );


        controlObj.richtext( 'detail_txt_f_richtext_tbl_codefactory_detail', tbl_codefactory_detail.f_richtext );

        controlObj.fileuploaderbind( 'detail_file_f_file_tbl_codefactory_detail', tbl_codefactory_detail.f_file );

        callBackFunction.success();
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_codefactory_detail
    */
    getModel = function ( callBackFunction )
    {
        try
        {
            var tbl_codefactory_detail = new Object();

            tbl_codefactory_detail.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_text1 = controlObj.text( 'detail_txt_f_text1_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_text2 = controlObj.text( 'detail_txt_f_text2_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_text3 = controlObj.text( 'detail_txt_f_text3_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_singledropdownlist = controlObj.singledropdownlist( 'detail_dropdown_f_singledropdownlist_tbl_codefactory_detail' );
            tbl_codefactory_detail.f_singledropdownlistid = controlObj.singledropdownlistid( 'detail_dropdown_f_singledropdownlist_tbl_codefactory_detail' );


            tbl_codefactory_detail.f_multidropdownlist = controlObj.multidropdownlist( 'detail_dropdown_f_multidropdownlist_tbl_codefactory_detail' );
            tbl_codefactory_detail.f_multidropdownlistid = controlObj.multidropdownlistid( 'detail_dropdown_f_multidropdownlist_tbl_codefactory_detail' );


            tbl_codefactory_detail.f_itemlist = controlObj.itemlist( 'detail_list_f_itemlist_tbl_codefactory_detail' );
            tbl_codefactory_detail.f_itemlistid = controlObj.itemlistid( 'detail_list_f_itemlist_tbl_codefactory_detail' );


            tbl_codefactory_detail.f_toggle = controlObj.toggle( 'detail_ck_f_toggle_tbl_codefactory_detail' );


            tbl_codefactory_detail.f_checklist = controlObj.checklist( 'detail_list_f_checklist_tbl_codefactory_detail' );
            tbl_codefactory_detail.f_checklistid = controlObj.checklistid( 'detail_list_f_checklist_tbl_codefactory_detail' );


            tbl_codefactory_detail.f_radiolist = controlObj.radiolist( 'detail_list_f_radiolist_tbl_codefactory_detail' );
            tbl_codefactory_detail.f_radiolistid = controlObj.radiolistid( 'detail_list_f_radiolist_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_autocomplete = controlObj.text( 'detail_txt_f_autocomplete_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_datetime = controlObj.datetime( 'detail_datetime_f_datetime_tbl_codefactory_detail_date', 'detail_datetime_f_datetime_tbl_codefactory_detail_time' );

            tbl_codefactory_detail.f_slider = controlObj.slider( 'detail_slider_f_slider_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_textarea = controlObj.text( 'detail_txt_f_textarea_tbl_codefactory_detail' );


            tbl_codefactory_detail.f_richtext = controlObj.richtext( 'detail_txt_f_richtext_tbl_codefactory_detail' );

            tbl_codefactory_detail.f_file = controlObj.fileuploaderid( 'detail_file_f_file_tbl_codefactory_detail' );




            callBackFunction.success( tbl_codefactory_detail );
        }
        catch ( ex )
        {
            _blockMessage.show( 'getData执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_codefactory_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function ( tbl_codefactory_detail, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if ( tbl_codefactory_detail.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_codefactory_detail', 'top' );
            }


            if ( tbl_codefactory_detail.f_text1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_text1_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_text1_tbl_codefactory_detail', 'top' );
            }

            if ( tbl_codefactory_detail.f_text2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_text2_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_codefactory_detail.f_text3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_text3_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_codefactory_detail.f_singledropdownlist.length > 100 || tbl_codefactory_detail.f_singledropdownlistid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_dropdown_f_singledropdownlist_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_codefactory_detail.f_multidropdownlist.length > 100 || tbl_codefactory_detail.f_multidropdownlistid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_dropdown_f_multidropdownlist_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_codefactory_detail.f_itemlist.length > 100 || tbl_codefactory_detail.f_itemlistid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_list_f_itemlist_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_codefactory_detail.f_checklist.length > 100 || tbl_codefactory_detail.f_checklistid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_list_f_checklist_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_codefactory_detail.f_radiolist.length > 100 || tbl_codefactory_detail.f_radiolistid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_list_f_radiolist_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_codefactory_detail.f_autocomplete.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_autocomplete_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_codefactory_detail.f_slider.length > 100 )
            {
                errorMessageHansMap.put( 'detail_slider_f_slider_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_codefactory_detail.f_textarea.length > 4000 )
            {
                errorMessageHansMap.put( 'detail_txt_f_textarea_tbl_codefactory_detail', '长度不能超过<a style="color:red">4000</a>' );
            }


            if ( tbl_codefactory_detail.f_file.length > 100 )
            {
                errorMessageHansMap.put( 'detail_file_f_file_tbl_codefactory_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage.show( errorMessageHansMap, errorMessagePlacementHansMap, true );

                callBackFunction.fail();
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success( tbl_codefactory_detail );
            }
        }
        catch ( ex )
        {
            _blockMessage.show( 'checkData执行失败。<br/>' + ex.message, 'fail' );
        }

    },



    //---------------------------------------------------------------------------------
    // ---------------------------------数据操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:getData
    *  参数:callbackFunction
    *  从数据库获取数据，根据that._pr_sys_id ，返回数据对象
    */
    getData = function ( callbackFunction )
    {
        //string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, string clientInf
        var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_text1^f_text2^f_text3^f_singledropdownlist^f_singledropdownlistid^f_multidropdownlist^f_multidropdownlistid^f_itemlist^f_itemlistid^f_toggle^f_checklist^f_checklistid^f_radiolist^f_radiolistid^f_autocomplete^f_datetime^f_slider^f_textarea^f_richtext^f_file^sys_id';
        var pageSizeString = '';
        var pageIndexString = '';
        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: pageSizeString,
            pageIndexString: pageIndexString,
            clientInf: _clientInf
        };
        doAjaxFunction( _serviceUrl, 'GetList', data, {
            success: function ( message )
            {
                var messageJson = ( new Function( "", "return " + message ) )();
                callbackFunction.success( messageJson.rows[0] );
            },
            fail: function ( message )
            {
                _blockMessage.show( _serviceUrl + 'GetList<br/>' + message, 'fail' );
            }
        } );
    },

    /* 
    *  
    *  方法:updateData
    *  参数:tbl_codefactory_detail, callbackFunction
    *  向数据库更新数据，根据数据对象
    */
    updateData = function ( tbl_codefactory_detail, callbackFunction )
    {

        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_text1^f_text2^f_text3^f_singledropdownlist^f_singledropdownlistid^f_multidropdownlist^f_multidropdownlistid^f_itemlist^f_itemlistid^f_toggle^f_checklist^f_checklistid^f_radiolist^f_radiolistid^f_autocomplete^f_datetime^f_slider^f_textarea^f_richtext^f_file^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: tbl_codefactory_detail.f_value1,

            f_value2: tbl_codefactory_detail.f_value2,

            f_value3: tbl_codefactory_detail.f_value3,

            f_value4: tbl_codefactory_detail.f_value4,

            f_value5: tbl_codefactory_detail.f_value5,

            f_value6: tbl_codefactory_detail.f_value6,

            f_value7: tbl_codefactory_detail.f_value7,

            f_value8: tbl_codefactory_detail.f_value8,

            f_value9: tbl_codefactory_detail.f_value9,

            f_value10: tbl_codefactory_detail.f_value10,

            f_text1: tbl_codefactory_detail.f_text1,

            f_text2: tbl_codefactory_detail.f_text2,


            f_text3: tbl_codefactory_detail.f_text3,

            f_singledropdownlist: tbl_codefactory_detail.f_singledropdownlist,
            f_singledropdownlistid: tbl_codefactory_detail.f_singledropdownlistid,

            f_multidropdownlist: tbl_codefactory_detail.f_multidropdownlist,
            f_multidropdownlistid: tbl_codefactory_detail.f_multidropdownlistid,

            f_itemlist: tbl_codefactory_detail.f_itemlist,
            f_itemlistid: tbl_codefactory_detail.f_itemlistid,

            f_toggle: tbl_codefactory_detail.f_toggle,

            f_checklist: tbl_codefactory_detail.f_checklist,
            f_checklistid: tbl_codefactory_detail.f_checklistid,

            f_radiolist: tbl_codefactory_detail.f_radiolist,
            f_radiolistid: tbl_codefactory_detail.f_radiolistid,


            f_autocomplete: tbl_codefactory_detail.f_autocomplete,

            f_datetime: tbl_codefactory_detail.f_datetime,

            f_slider: tbl_codefactory_detail.f_slider,

            f_textarea: tbl_codefactory_detail.f_textarea.formatStringRN(),

            f_richtext: tbl_codefactory_detail.f_richtext,


            f_file: tbl_codefactory_detail.f_file,



            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format( 'yyyy-MM-dd hh:mm:ss' )

        };

        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify( json )
        };
        doAjaxFunction( _serviceUrl, 'Update', data, {
            success: function ( message )
            {
                callbackFunction.success();
            },
            fail: function ( message )
            {
                callbackFunction.fail( message );
            },
            error: function ( message )
            {
                _blockMessage.show( _serviceUrl + 'Update<br/>' + message, 'fail' );
            }
        } );
    },


    //---------------------------------------------------------------------------------
    // ---------------------------------控件事件------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:dropdown_f_singledropdownlist_onchange
    *  参数:changeEventParameter
    *  单选下拉列表onchange事件
    */
    dropdown_f_singledropdownlist_onchange = function ( changeEventParameter )
    {

        var cc = _resultMessage.message();
        cc += '<br/>';
        // //;
        // val: e.val, added: e.added, removed: e.removed
        var isloadchild = false;
        if ( changeEventParameter.removed == undefined || changeEventParameter.added == undefined )
        {
            isloadchild = true;
        }
        else if ( changeEventParameter.added.id != changeEventParameter.removed.id )
        {
            isloadchild = true;
        }
        else
        {
            isloadchild = false;
        }
        if ( isloadchild )
        {
            cc += '单选下拉列表' + changeEventParameter.val;
        }
        else
        {
            cc += '单选下拉列表' + '无变化';
        }
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:dropdown_f_multidropdownlist_onchange
    *  参数:changeEventParameter
    *  复选下拉列表onchange事件
    */
    dropdown_f_multidropdownlist_onchange = function ( changeEventParameter )
    {

        var cc = _resultMessage.message();
        cc += '<br/>';
        var isloadchild = false;
        if ( changeEventParameter.removed == undefined || changeEventParameter.added == undefined )
        {
            isloadchild = true;
        }
        else if ( changeEventParameter.added.id != changeEventParameter.removed.id )
        {
            isloadchild = true;
        }
        else
        {
            isloadchild = false;
        }
        if ( isloadchild )
        {
            cc += '复选下拉列表' + changeEventParameter.val;
        }
        else
        {

            cc += '复选下拉列表' + '无变化';
        }
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:list_f_itemlist_onclick
    *  参数:e
    *  itemlist选中事件
    */
    list_f_itemlist_onclick = function ( e )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += 'listbox' + controlObj.itemlist( 'detail_list_f_itemlist_tbl_codefactory_detail' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:list_f_checklist_onclick
    *  参数:e
    *  checklist选中事件
    */
    list_f_checklist_onclick = function ( e )
    {

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '复选框列表' + controlObj.checklist( 'detail_list_f_checklist_tbl_codefactory_detail' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:list_f_radiolist_onclick
    *  参数:e
    *  radiolist选中事件
    */
    list_f_radiolist_onclick = function ( e )
    {

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '单选框列表' + controlObj.radiolist( 'detail_list_f_radiolist_tbl_codefactory_detail' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:ck_f_toggle_onswitchchange
    *  参数:event, state
    *  f_toggle切换事件
    */
    ck_f_toggle_onswitchchange = function ( event, state )
    {

        var cc = _resultMessage.message();
        cc += '<br/>';
        if ( state )
        {
            cc += '是否按钮' + '开';
        }
        else
        {
            cc += '是否按钮' + '关';
        }
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:txt_f_autocomplete_onselected
    *  参数:
    *  f_autocomplete选中事件
    */
    txt_f_autocomplete_onselected = function ()
    {

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '自动完成' + controlObj.text( 'detail_txt_f_autocomplete_tbl_codefactory_detail' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:datetime_f_datetime_time_onchange
    *  参数:
    *  f_datetime_time onchange事件
    */
    datetime_f_datetime_time_onchange = function ( e )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '日期和时间' + e.time.value;
        _resultMessage.message( cc );

    },

    /* 
    *  
    *  方法:datetime_f_datetime_date_onchange
    *  参数:
    *  f_datetime_date onchange事件
    */
    datetime_f_datetime_date_onchange = function ( ev )
    {
        var ddd = new Date( ev.date.valueOf() );

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '日期和时间' + ddd.Format( 'yyyy-MM-dd' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:slider_f_slider_onchange
    *  参数:
    *  f_slider onchange事件
    */
    slider_f_slider_onchange = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '滑动条' + controlObj.slider( 'detail_slider_f_slider_tbl_codefactory_detail' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:txt_f_richtext_onchange
    *  参数:contents, $editable
    *  f_richtext onchange事件
    */
    txt_f_richtext_onchange = function ( contents, $editable )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '富文本框' + contents;
        _resultMessage.message( cc );
    },
    /* 
    *  
    *  方法:file_f_file_onchange
    *  参数:
    *  f_file onchange事件
    */
    file_f_file_onchange = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '文件全部上传完成';
        _resultMessage.message( cc );
    }
    ;

    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        _pr_sys_id: '',
        _pr_pagetype: '',

        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        /* 
        *  
        *  方法:init
        *  参数:
        *  页面初始化方法
        */
        init: function ()
        {

            try
            {
                _alertMessage = new alertMessage();
                _confirmMessage = new confirmMessage();
                _resultMessage = new resultMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show( '程序加载中...', 'loading' );

                basePageObj.initBasePage( {
                    success: function ()
                    {
                        initParameter( {
                            success: function ()
                            {
                                //初始化页面控件的代码数据，放到hashmap中
                                initBaseCode( {
                                    success: function ()
                                    {
                                        //初始化页面控件
                                        initControl( {
                                            success: function ()
                                            {
                                                //绑定数据
                                                that.bindPage( {
                                                    success: function ()
                                                    {
                                                        _validateMessage = new validateMessage( 'btn_command_save_tbl_codefactory_detail' );

                                                        _ladda_btn_command_save = Ladda.create( 'btn_command_save_tbl_codefactory_detail' );

                                                        switch ( that._pr_pagetype )
                                                        {
                                                            case "1":
                                                                setDisable( false );
                                                                break;
                                                            case "2":
                                                                setDisable( true );
                                                                break;
                                                        }


                                                        _blockMessage.hidden();
                                                    }
                                                } );
                                            }
                                        } );
                                    }
                                } );
                            }
                        } );
                    },
                    fail: function ( message )
                    {
                        _blockMessage.show( message, 'fail' );
                    }
                } );
            }
            catch ( ex )
            {
                _blockMessage.show( '程序初始化失败。<br/>' + ex.message, 'fail' );
            }
        },

        /* 
        *  
        *  方法:bindPage
        *  参数:
        *  绑定页面
        */
        bindPage: function ( callBackFunction )
        {
            try
            {
                getData( {
                    success: function ( tbl_codefactory_detail )
                    {

                        bindModel( tbl_codefactory_detail, {
                            success: function ()
                            {
                                callBackFunction.success();
                            }
                        } );

                    }
                } );
            }
            catch ( ex )
            {
                _blockMessage.show( 'bindPage执行失败。<br/>' + ex.message, 'fail' );
            }
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------按钮事件---------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:btn_command_save_onclick
        *  参数:
        *  保存按钮
        */
        btn_command_save_onclick: function ()
        {
            try
            {
                _ladda_btn_command_save.start();
                getModel( {
                    success: function ( tbl_codefactory_detail )
                    {
                        checkModel( tbl_codefactory_detail, {
                            success: function ( tbl_codefactory_detail )
                            {
                                updateData( tbl_codefactory_detail, {
                                    success: function ()
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show( '保存成功', 'success', 2000 );
                                    },
                                    fail: function ( message )
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show( '保存失败<br/>' + message, 'fail' );
                                    }
                                } );
                            },
                            fail: function ()
                            {
                                _ladda_btn_command_save.stop();
                                _alertMessage.show( '校验未通过', 'warning' );
                            }
                        } );
                    }
                } );
            }
            catch ( ex )
            {
                _blockMessage.show( '保存程序异常。', 'fail' );
            }
        },

        /* 
        *  
        *  方法:btn_command_cancle_onclick
        *  参数:
        *  返回按钮
        */
        btn_command_cancle_onclick: function ()
        {
            var url = _pr_fromurl;
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;

            var fromurlJson = ( new Function( "", "return " + _pr_fromurlparam ) )();

            $.each( fromurlJson, function ( key, value )
            {
                if ( typeof value == 'object' )
                {
                    url += '&' + key + '=' + JSON.stringify( value );
                }
                else
                {
                    url += '&' + key + '=' + value;
                }

            } );

            commonObj.changeUrl( url, 'right-hide' );
        },

        /* 
        *  
        *  方法:btn_command_message_onclick
        *  参数:
        *  消息示例按钮
        */
        btn_command_message_onclick: function ( messagetype )
        {

            switch ( messagetype )
            {
                case "result":
                    _resultMessage.show();
                    break;
                case "alert":
                    _alertMessage.show( 'alert消息<br/>alert消息<br/>', 'warning' );
                    break;
                case "confirm":

                    _confirmMessage.show( '标题', '内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容',
                    {
                        confirm: function ()
                        {
                            _alertMessage.show( '确定', 'success' );
                        },
                        cancle: function ()
                        {
                            _alertMessage.show( '取消', 'fail' );
                        }
                    } );
                    break;
                case "block":
                    _blockMessage.show( 'block消息<br/>block消息<br/>', 'loadingcenter' );

                    setTimeout( function ()
                    {
                        _blockMessage.hidden();
                    }, 2000 );

                    break;
            }
        }


    };

    return that;
} )();

$( document ).ready( function ()
{
    tbl_codefactory_detail_Obj.init();
} );

