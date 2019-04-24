var _pr_fromurl = '';
var _pr_fromurlparam = '';

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var tbl_app_version_detail_Obj = ( function () {
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_version.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_export = null,

    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function ( callBackFunction ) {
        try {
            _pr_fromurl = requestQuery( 'fromurl' );
            _pr_fromurlparam = requestQuery( 'fromurlparam' );
            that._pr_sys_id = requestQuery( 'sys_id' );
            that._pr_pagetype = requestQuery( 'pagetype' );
            _pr_appcode = requestQuery( 'appcode' );

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

            if ( that._pr_sys_id == null || that._pr_sys_id == '' ) {
                _blockMessage.show( '_pr_sys_id参数接收失败', 'fail' );
            }
            else if ( that._pr_pagetype == null || that._pr_pagetype == '' ) {
                _blockMessage.show( '_pr_pagetype参数接收失败...', 'fail' );
            }
            else {
                callBackFunction.success();
            }
        }
        catch ( ex ) {
            _blockMessage.show( 'initParameter执行失败' + ex.message, 'fail' );
        }

    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callbackFunction
    *  初始化code内容，存储在_baseCodeHashMap
    */
    initBaseCode = function ( callBackFunction ) {

        try {
            _baseCodeHashMap = new hashMap();

            _baseCodeHashMap.put( 'servicecode_01', [
                { id: 'ios', text: 'ios' },
                { id: 'android', text: 'android' }
            ] );

            _baseCodeHashMap.put( 'servicecode_02', [
                { id: '1', text: '开发' },
                { id: '2', text: '审核' },
                { id: '3', text: '发布' },
                { id: '4', text: '归档' }
            ] );

            callBackFunction.success();
        }
        catch ( ex ) {
            _blockMessage.show( 'initBaseCode执行失败。<br/>' + ex.message, 'fail' );
        }

    },

    /* 
    *  
    *  方法:initControl
    *  参数:callbackFunction
    *  初始化控件，会使用到_baseCodeHashMap
    */
    initControl = function ( callBackFunction ) {
        try {

            //单选下拉列表
            var resultArray1 = _baseCodeHashMap.get( 'servicecode_01' );
            var resultArray2 = _baseCodeHashMap.get( 'servicecode_02' );

            //controlObj.placeholder( "detail_txt_f_appversion_tbl_app_version_detail", "9.99.99" );
            //controlObj.placeholder( "detail_txt_f_htmlversion_tbl_app_version_detail", "9.99.99" );
            //controlObj.placeholder( "detail_txt_f_codeversion_tbl_app_version_detail", "9.99.99" );
            //controlObj.placeholder( "detail_txt_f_colorversion_tbl_app_version_detail", "9.99.99" );
            controlObj.toggleinit( 'detail_ck_f_status_tbl_app_version_detail', ck_f_status_onswitchchange );

            controlObj.singledropdownlistinit( 'detail_dropdown_f_apptype_tbl_app_version_detail', resultArray1, dropdown_f_apptype_onchange );
            controlObj.singledropdownlistinit( 'detail_dropdown_f_appstatus_tbl_app_version_detail', resultArray2, dropdown_f_appstatus_onchange );

            callBackFunction.success();
        }
        catch ( ex ) {
            _blockMessage.show( 'initControl执行失败。<br/>' + ex.message, 'fail' );
        }
    },


    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件状态
    */
    setDisable = function ( isDisable ) {
        try {

            controlObj.textdisable( 'detail_txt_f_appversion_tbl_app_version_detail', true );

            controlObj.textdisable( 'detail_txt_f_htmlversion_tbl_app_version_detail', true );

            controlObj.textdisable( 'detail_txt_f_codeversion_tbl_app_version_detail', true );

            controlObj.textdisable( 'detail_txt_f_colorversion_tbl_app_version_detail', true );

            controlObj.textdisable( 'detail_txt_f_comment_tbl_app_version_detail', isDisable );

            if ( controlObj.toggle( 'detail_ck_f_status_tbl_app_version_detail' ) == "true" ) {
                controlObj.toggledisable( 'detail_ck_f_status_tbl_app_version_detail', true );
            } else {
                controlObj.toggledisable( 'detail_ck_f_status_tbl_app_version_detail', isDisable );
            }



            controlObj.singledropdownlistdisable( 'detail_dropdown_f_apptype_tbl_app_version_detail', isDisable );


            controlObj.singledropdownlistdisable( 'detail_dropdown_f_appstatus_tbl_app_version_detail', isDisable );

            if ( isDisable ) {
                $( '#btn_command_save_tbl_app_version_detail' ).addClass( 'hidden' );
                $( '.btn-command-message' ).attr( 'disabled', 'disabled' );
            }
            else {
                $( '#btn_command_save_tbl_app_version_detail' ).removeClass( 'hidden' );
                $( '.btn-command-message' ).removeAttr( 'disabled' );
            }
        }
        catch ( ex ) {
            _blockMessage.show( 'setDisable执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Model操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:bindModel
    *  参数:tbl_app_version_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    bindModel = function ( tbl_app_version_detail, callBackFunction ) {
        controlObj.text( 'detail_txt_f_value1_tbl_app_version_detail', tbl_app_version_detail.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_app_version_detail', tbl_app_version_detail.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_app_version_detail', tbl_app_version_detail.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_app_version_detail', tbl_app_version_detail.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_app_version_detail', tbl_app_version_detail.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_app_version_detail', tbl_app_version_detail.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_app_version_detail', tbl_app_version_detail.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_app_version_detail', tbl_app_version_detail.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_app_version_detail', tbl_app_version_detail.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_app_version_detail', tbl_app_version_detail.f_value10 );

        controlObj.text( 'detail_txt_f_appversion_tbl_app_version_detail', tbl_app_version_detail.f_appversion );

        controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_detail', tbl_app_version_detail.f_htmlversion );

        controlObj.text( 'detail_txt_f_codeversion_tbl_app_version_detail', tbl_app_version_detail.f_codeversion );

        controlObj.text( 'detail_txt_f_colorversion_tbl_app_version_detail', tbl_app_version_detail.f_colorversion );

        controlObj.text( 'detail_txt_f_comment_tbl_app_version_detail', tbl_app_version_detail.f_comment );

        controlObj.toggle( 'detail_ck_f_status_tbl_app_version_detail', tbl_app_version_detail.f_status );

        controlObj.singledropdownlistid( 'detail_dropdown_f_apptype_tbl_app_version_detail', tbl_app_version_detail.f_apptypeid );

        controlObj.singledropdownlistid( 'detail_dropdown_f_appstatus_tbl_app_version_detail', tbl_app_version_detail.f_appstatusid );




        callBackFunction.success();
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_app_version_detail
    */
    getModel = function ( callBackFunction ) {
        try {
            var tbl_app_version_detail = new Object();

            tbl_app_version_detail.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_app_version_detail' );

            tbl_app_version_detail.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_app_version_detail' );


            tbl_app_version_detail.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_app_version_detail' );


            tbl_app_version_detail.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_app_version_detail' );


            tbl_app_version_detail.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_app_version_detail' );


            tbl_app_version_detail.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_app_version_detail' );


            tbl_app_version_detail.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_app_version_detail' );


            tbl_app_version_detail.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_app_version_detail' );


            tbl_app_version_detail.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_app_version_detail' );


            tbl_app_version_detail.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_app_version_detail' );


            tbl_app_version_detail.f_appversion = controlObj.text( 'detail_txt_f_appversion_tbl_app_version_detail' );


            tbl_app_version_detail.f_htmlversion = controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_detail' );


            tbl_app_version_detail.f_codeversion = controlObj.text( 'detail_txt_f_codeversion_tbl_app_version_detail' );


            tbl_app_version_detail.f_colorversion = controlObj.text( 'detail_txt_f_colorversion_tbl_app_version_detail' );


            tbl_app_version_detail.f_comment = controlObj.text( 'detail_txt_f_comment_tbl_app_version_detail' );


            tbl_app_version_detail.f_status = controlObj.toggle( 'detail_ck_f_status_tbl_app_version_detail' );

            tbl_app_version_detail.f_apptype = controlObj.singledropdownlist( 'detail_dropdown_f_apptype_tbl_app_version_detail' );
            tbl_app_version_detail.f_apptypeid = controlObj.singledropdownlistid( 'detail_dropdown_f_apptype_tbl_app_version_detail' );

            tbl_app_version_detail.f_appstatus = controlObj.singledropdownlist( 'detail_dropdown_f_appstatus_tbl_app_version_detail' );
            tbl_app_version_detail.f_appstatusid = controlObj.singledropdownlistid( 'detail_dropdown_f_appstatus_tbl_app_version_detail' );




            callBackFunction.success( tbl_app_version_detail );
        }
        catch ( ex ) {
            _blockMessage.show( 'getData执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_app_version_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function ( tbl_app_version_detail, callBackFunction ) {
        _resultMessage = new resultMessage();
        try {

            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            var patt = /^\d{1}\.\d{1,2}\.\d{1,2}$/;


            if ( tbl_app_version_detail.f_value1.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value2.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value3.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value4.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value5.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value6.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value7.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value8.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value9.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_value10.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_appversion.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_appversion_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_appversion_tbl_app_version_detail', 'top' );
            }

            if ( !( patt.test( tbl_app_version_detail.f_appversion ) ) ) {
                errorMessageHansMap.put( 'detail_txt_f_appversion_tbl_app_version_detail', '版本号格式错误。提示：<a style="color:red">1.0.0</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_appversion_tbl_app_version_detail', 'top' );
            }

            if ( tbl_app_version_detail.f_htmlversion.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_htmlversion_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_htmlversion_tbl_app_version_detail', 'top' );
            }

            if ( !( patt.test( tbl_app_version_detail.f_htmlversion ) ) ) {
                errorMessageHansMap.put( 'detail_txt_f_htmlversion_tbl_app_version_detail', '版本号格式错误。提示：<a style="color:red">1.0.0</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_htmlversion_tbl_app_version_detail', 'top' );
            }


            if ( tbl_app_version_detail.f_codeversion.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_codeversion_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_codeversion_tbl_app_version_detail', 'top' );
            }

            if ( !( patt.test( tbl_app_version_detail.f_codeversion ) ) ) {
                errorMessageHansMap.put( 'detail_txt_f_codeversion_tbl_app_version_detail', '版本号格式错误。提示：<a style="color:red">1.0.0</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_codeversion_tbl_app_version_detail', 'top' );
            }

            if ( tbl_app_version_detail.f_colorversion.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_colorversion_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_colorversion_tbl_app_version_detail', 'top' );
            }

            if ( !( patt.test( tbl_app_version_detail.f_colorversion ) ) ) {
                errorMessageHansMap.put( 'detail_txt_f_colorversion_tbl_app_version_detail', '版本号格式错误。提示：<a style="color:red">1.0.0</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_colorversion_tbl_app_version_detail', 'top' );
            }

            if ( tbl_app_version_detail.f_comment.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_comment_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_comment_tbl_app_version_detail', 'top' );
            }



            if ( tbl_app_version_detail.f_apptype.length > 100 || tbl_app_version_detail.f_apptypeid.length > 100 ) {
                errorMessageHansMap.put( 'detail_dropdown_f_apptype_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_app_version_detail.f_appstatus.length > 100 || tbl_app_version_detail.f_appstatusid.length > 100 ) {
                errorMessageHansMap.put( 'detail_dropdown_f_appstatus_tbl_app_version_detail', '长度不能超过<a style="color:red">100</a>' );
            }





            if ( errorMessageHansMap.keys().length > 0 ) {
                _validateMessage.show( errorMessageHansMap, errorMessagePlacementHansMap, true );
                callBackFunction.fail();
            }
            else {
                _validateMessage.hidden();
                callBackFunction.success( tbl_app_version_detail );
            }
        }
        catch ( ex ) {
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
    getData = function ( callbackFunction ) {

        var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_appversion^f_htmlversion^f_codeversion^f_colorversion^f_comment^f_status^f_apptype^f_apptypeid^f_appstatus^f_appstatusid^sys_id';
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
            success: function ( message ) {
                var messageJson = ( new Function( "", "return " + message ) )();
                callbackFunction.success( messageJson.rows[0] );
            },
            fail: function ( message ) {
                _blockMessage.show( _serviceUrl + 'GetList<br/>' + message, 'fail' );
            }
        } );
    },

    /* 
    *  
    *  方法:updateData
    *  参数:tbl_app_version_detail, callbackFunction
    *  向数据库更新数据，根据数据对象
    */
    updateData = function ( tbl_app_version_detail, callbackFunction ) {

        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_appversion^f_htmlversion^f_codeversion^f_colorversion^f_comment^f_status^f_apptype^f_apptypeid^f_appstatus^f_appstatusid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: tbl_app_version_detail.f_value1,

            f_value2: tbl_app_version_detail.f_value2,

            f_value3: tbl_app_version_detail.f_value3,

            f_value4: tbl_app_version_detail.f_value4,

            f_value5: tbl_app_version_detail.f_value5,

            f_value6: tbl_app_version_detail.f_value6,

            f_value7: tbl_app_version_detail.f_value7,

            f_value8: tbl_app_version_detail.f_value8,

            f_value9: tbl_app_version_detail.f_value9,

            f_value10: tbl_app_version_detail.f_value10,

            f_appversion: tbl_app_version_detail.f_appversion,

            f_htmlversion: tbl_app_version_detail.f_htmlversion,

            f_codeversion: tbl_app_version_detail.f_codeversion,

            f_colorversion: tbl_app_version_detail.f_colorversion,

            f_comment: tbl_app_version_detail.f_comment,

            f_status: tbl_app_version_detail.f_status,

            f_apptype: tbl_app_version_detail.f_apptype,
            f_apptypeid: tbl_app_version_detail.f_apptypeid,

            f_appstatus: tbl_app_version_detail.f_appstatus,
            f_appstatusid: tbl_app_version_detail.f_appstatusid,


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
            success: function ( message ) {
                callbackFunction.success();
            },
            fail: function ( message ) {
                callbackFunction.fail( message );
            },
            error: function ( message ) {
                _blockMessage.show( _serviceUrl + 'Update<br/>' + message, 'fail' );
            }
        } );
    },


    //---------------------------------------------------------------------------------
    // ---------------------------------控件事件------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:ck_f_status_onswitchchange
    *  参数:event, state
    *  状态/控件：toggle/数据库里边存true,false切换事件
    */
    ck_f_status_onswitchchange = function ( event, state ) {
        var cc = _resultMessage.message();
        cc += '<br/>';
        if ( state ) {

            cc += '状态/控件：toggle/数据库里边存true,false' + '开';
        }
        else {

            cc += '状态/控件：toggle/数据库里边存true,false' + '关';

        }
        _resultMessage.message( cc );
    },


	/* 
    *  
    *  方法:dropdown_f_apptype_onchange
    *  参数:changeEventParameter
    *  app类型：ios/androidonchange事件
    */
    dropdown_f_apptype_onchange = function ( changeEventParameter ) {
        var cc = _resultMessage.message();
        cc += '<br/>';
        // 
        // val: e.val, added: e.added, removed: e.removed
        var isloadchild = false;
        if ( changeEventParameter.removed == undefined || changeEventParameter.added == undefined ) {
            isloadchild = true;
        }
        else if ( changeEventParameter.added.id != changeEventParameter.removed.id ) {
            isloadchild = true;
        }
        else {
            isloadchild = false;
        }
        if ( isloadchild ) {
            cc += 'app类型：ios/android' + changeEventParameter.val;
        }
        else {
            cc += 'app类型：ios/android' + '无变化';
        }
        _resultMessage.message( cc );
    },


	/* 
    *  
    *  方法:dropdown_f_appstatus_onchange
    *  参数:changeEventParameter
    *  app状态：开发，审核，发布，归档onchange事件
    */
    dropdown_f_appstatus_onchange = function ( changeEventParameter ) {

        var cc = _resultMessage.message();
        cc += '<br/>';
        // 
        // val: e.val, added: e.added, removed: e.removed
        var isloadchild = false;
        if ( changeEventParameter.removed == undefined || changeEventParameter.added == undefined ) {
            isloadchild = true;
        }
        else if ( changeEventParameter.added.id != changeEventParameter.removed.id ) {
            isloadchild = true;
        }
        else {
            isloadchild = false;
        }
        if ( isloadchild ) {
            cc += 'app状态：开发，审核，发布，归档' + changeEventParameter.val;
        }
        else {
            cc += 'app状态：开发，审核，发布，归档' + '无变化';
        }
        _resultMessage.message( cc );
    };




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
        init: function () {

            try {
                _alertMessage = new alertMessage();
                _confirmMessage = new confirmMessage();
                _resultMessage = new resultMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show( '程序加载中...', 'loading' );

                basePageObj.initBasePage( {
                    success: function () {
                        initParameter( {
                            success: function () {
                                //初始化页面控件的代码数据，放到hashmap中
                                initBaseCode( {
                                    success: function () {
                                        //初始化页面控件
                                        initControl( {
                                            success: function () {
                                                //绑定数据
                                                that.bindPage( {
                                                    success: function () {
                                                        _validateMessage = new validateMessage( 'btn_command_save_tbl_app_version_detail' );

                                                        _ladda_btn_command_save = Ladda.create( 'btn_command_save_tbl_app_version_detail' );
                                                        _ladda_btn_command_export = Ladda.create( 'btn_command_export_tbl_app_version_detail' );

                                                        switch ( that._pr_pagetype ) {
                                                            case "1":
                                                                setDisable( false );
                                                                break;
                                                            case "2":
                                                                setDisable( true );
                                                                break;
                                                        }


                                                        $( '#div_color_tbl_app_version_color_content' ).load( '../tbl_app_version_color/tbl_app_version_color_modallist_part.html', null, function () {
                                                            tbl_app_version_color_modallist_Obj._pr_listtype = that._pr_pagetype;
                                                            tbl_app_version_color_modallist_Obj.init( {
                                                                success: function () {
                                                                    $( '#div_color_tbl_app_version_color_content' ).css( 'display', '' );
                                                                    $( '#div_loading_content' ).css( 'display', 'none' );


                                                                    //===================
                                                                    $( '#div_html_tbl_app_version_html' ).load( '../tbl_app_version_html/tbl_app_version_html_modallist_part.html', null, function () {
                                                                        tbl_app_version_html_modallist_Obj._pr_listtype = that._pr_pagetype;
                                                                        tbl_app_version_html_modallist_Obj.init( {
                                                                            success: function () {
                                                                                $( '#div_html_tbl_app_version_html' ).css( 'display', '' );
                                                                                $( '#div_loading_html_content' ).css( 'display', 'none' );

                                                                                _blockMessage.hidden();
                                                                            }
                                                                        } );

                                                                    } );


                                                                }
                                                            } );

                                                        } );


                                                    }
                                                } );
                                            }
                                        } );
                                    }
                                } );
                            }
                        } );
                    },
                    fail: function ( message ) {
                        _blockMessage.show( message, 'fail' );
                    }
                } );
            }
            catch ( ex ) {
                _blockMessage.show( '程序初始化失败。<br/>' + ex.message, 'fail' );
            }
        },

        /* 
        *  
        *  方法:bindPage
        *  参数:
        *  绑定页面
        */
        bindPage: function ( callBackFunction ) {

            try {
                getData( {
                    success: function ( tbl_app_version_detail ) {

                        bindModel( tbl_app_version_detail, {
                            success: function () {
                                callBackFunction.success();
                            }
                        } );

                    }
                } );
            }
            catch ( ex ) {
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
        btn_command_save_onclick: function () {
            try {
                _ladda_btn_command_save.start();
                getModel( {
                    success: function ( tbl_app_version_detail ) {
                        checkModel( tbl_app_version_detail, {
                            success: function ( tbl_app_version_detail ) {
                                updateData( tbl_app_version_detail, {
                                    success: function () {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show( '保存成功', 'success', 2000 );
                                    },
                                    fail: function ( message ) {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show( '保存失败<br/>' + message, 'fail' );
                                    }
                                } );


                            },
                            fail: function () {
                                _ladda_btn_command_save.stop();
                                _alertMessage.show( '校验未通过', 'warning' );
                                return;
                            }
                        } );
                    }
                } );
            }
            catch ( ex ) {
                _blockMessage.show( '保存程序异常。', 'fail' );
            }
        },

        /* 
        *  
        *  方法:btn_command_cancle_onclick
        *  参数:
        *  返回按钮
        */
        btn_command_cancle_onclick: function () {
            var url = _pr_fromurl;
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;

            var fromurlJson = ( new Function( "", "return " + _pr_fromurlparam ) )();

            $.each( fromurlJson, function ( key, value ) {
                if ( typeof value == 'object' ) {
                    url += '&' + key + '=' + JSON.stringify( value );
                }
                else {
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
        btn_command_message_onclick: function ( messagetype ) {

            switch ( messagetype ) {
                case "result":
                    _resultMessage.show();
                    break;
                case "alert":
                    _alertMessage.show( 'alert消息<br/>alert消息<br/>', 'warning' );
                    break;
                case "confirm":

                    _confirmMessage.show( '标题', '内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容',
                    {
                        confirm: function () {
                            _alertMessage.show( '确定', 'success' );
                        },
                        cancle: function () {
                            _alertMessage.show( '取消', 'fail' );
                        }
                    } );
                    break;
                case "block":
                    _blockMessage.show( 'block消息<br/>block消息<br/>', 'loadingcenter' );

                    setTimeout( function () {
                        _blockMessage.hidden();
                    }, 2000 );

                    break;
            }
        },


        /* 
        *  
        *  方法:btn__detail_txt_f_onclick
        *  参数:
        *  计算版本号
        */
        btn_detail_txt_f_htmlversion: function () {

            if ( controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ) == "" ) {
                _alertMessage.show( "请先选择app类型后再计算版本", 'fail', 2000 );
                return;
            }
            var data = {
                sysIdString: that._pr_sys_id,
                columnsString: "f_htmlversion",
                columnsValue: controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_detail' ),
                fileIdString: controlObj.text( 'detail_txt_f_value1_tbl_app_version_detail' ),
                appType: controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ),
                clientInf: _clientInf
            };
            doAjaxFunction( _serviceUrl, 'CalcVesion', data, {
                success: function ( message ) {
                    controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_detail', message.replaceAll( "^", "." ) );
                    _alertMessage.show( "html版本附件备份完毕，数据库更新完毕.", 'success', 2000 );
                },
                fail: function ( message ) {
                    _blockMessage.show( _serviceUrl + 'CalcVesion<br/>' + message, 'fail' );
                }
            } );

        },
        btn_detail_txt_f_codeversion: function () {
            if ( controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ) == "" ) {
                _alertMessage.show( "请先选择app类型后再计算版本", 'fail', 2000 );
                return;
            }
            var data = {
                sysIdString: that._pr_sys_id,
                columnsString: "f_codeversion",
                columnsValue: controlObj.text( 'detail_txt_f_codeversion_tbl_app_version_detail' ),
                fileIdString: controlObj.text( 'detail_txt_f_value1_tbl_app_version_detail' ),
                appType: controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ),
                clientInf: _clientInf
            };
            doAjaxFunction( _serviceUrl, 'CalcVesion', data, {
                success: function ( message ) {
                    controlObj.text( 'detail_txt_f_codeversion_tbl_app_version_detail', message.replaceAll( "^", "." ) );
                },
                fail: function ( message ) {
                    _blockMessage.show( _serviceUrl + 'CalcVesion<br/>' + message, 'fail' );
                }
            } );
        },
        btn_detail_txt_f_colorversion: function () {
            if ( controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ) == "" ) {
                _alertMessage.show( "请先选择app类型后再计算版本", 'fail', 2000 );
                return;
            }
            var data = {
                sysIdString: that._pr_sys_id,
                columnsString: "f_colorversion",
                columnsValue: controlObj.text( 'detail_txt_f_colorversion_tbl_app_version_detail' ),
                fileIdString: controlObj.text( 'detail_txt_f_value1_tbl_app_version_detail' ),
                appType: controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ),
                clientInf: _clientInf
            };
            doAjaxFunction( _serviceUrl, 'CalcVesion', data, {
                success: function ( message ) {
                    controlObj.text( 'detail_txt_f_colorversion_tbl_app_version_detail', message.replaceAll( "^", "." ) );
                },
                fail: function ( message ) {
                    _blockMessage.show( _serviceUrl + 'CalcVesion<br/>' + message, 'fail' );
                }
            } );
        },
        btn_detail_txt_f_appversion: function () {
            _resultMessage = new resultMessage();
            if ( controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ) == "" ) {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();

                errorMessageHansMap.put( 'detail_dropdown_f_apptype_tbl_app_version_detail', '不能为空' );

                _validateMessage.show( errorMessageHansMap, errorMessagePlacementHansMap, true );

            }
            else {
                _validateMessage.hidden();

                var data = {
                    sysIdString: that._pr_sys_id,
                    columnsString: "f_appversion",
                    columnsValue: controlObj.text( 'detail_txt_f_appversion_tbl_app_version_detail' ),
                    fileIdString: controlObj.text( 'detail_txt_f_value1_tbl_app_version_detail' ),
                    appType: controlObj.text( 'detail_dropdown_f_apptype_tbl_app_version_detail' ),
                    clientInf: _clientInf
                };
                doAjaxFunction( _serviceUrl, 'CalcVesion', data, {
                    success: function ( message ) {
                        controlObj.text( 'detail_txt_f_appversion_tbl_app_version_detail', message.replaceAll( "^", "." ) );
                    },
                    fail: function ( message ) {
                        _blockMessage.show( _serviceUrl + 'CalcVesion<br/>' + message, 'fail' );
                    }
                } );
            }

        },


        /*
        * 方法:btn_command_export_onclick
        * 导出code版本信息
        */
        btn_command_export_onclick: function () {
            _ladda_btn_command_export.start();
            var data = {
                clientInf: _clientInf
            };

            doAjaxFunction( _serviceUrl, 'ExportCode', data, {
                success: function ( result ) {
                    _ladda_btn_command_export.stop();

                    $( '#download_code' ).html( '下载' )
                    $( '#download_code' ).attr( 'href', result + "?" + Math.random() * 10000 );
                },
                fail: function ( message ) {
                    _alertMessage.show( 'code导出失败<br/>' + message, 'fail' );
                    _ladda_btn_command_delete.stop();
                }
            } )

        },
        /*
        * 方法：标题点击，内容显示或隐藏
        *
        *
        */
        showHide: function ( divid ) {
            if ( $( '#li_' + divid ).hasClass( 'menu-active' ) ) {

            }
            else {
                $( '.li-menu' ).removeClass( 'menu-active' );
                $( '.div-menu' ).addClass( 'hidden' );
                $( '#li_' + divid ).addClass( 'menu-active' );
                $( '#' + divid ).removeClass( 'hidden' );
            }
        }
    };

    return that;
} )();

$( document ).ready( function () {
    tbl_app_version_detail_Obj.init();
} );




