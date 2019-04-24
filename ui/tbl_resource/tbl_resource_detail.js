var _pr_fromurl = '';
var _pr_fromurlparam = '';

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var tbl_resource_detail_Obj = ( function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_resource.asmx/',
             _serviceFileUrl = '//127.0.0.1/sara.dd.ldsw.file/service/fileupload/service_fileuploaddo.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _fileid = '',
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

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

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

        //var data = { clientInf: _clientInf };
        //doAjaxFunction( _serviceUrl, 'GetGroup', data, {
        //    success: function ( result )
        //    {
        //        var messageJsonArray = ( new Function( "", "return " + result ) )();
        //        _baseCodeHashMap = new hashMap();
        //        _baseCodeHashMap.put( 'group', messageJsonArray );
        //        callBackFunction.success();
        //    },
        //    fail: function ( message )
        //    {
        //        _blockMessage.show( 'initSearchBaseCode执行失败<br/>' + message, 'fail' );
        //    }
        //} );
        callBackFunction.success();
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
            //var resultArray = _baseCodeHashMap.get( 'group' );

            controlObj.richtextinit( 'detail_txt_f_content_tbl_resource_detail', txt_f_content_onchange );


            controlObj.fileuploaderinit( 'detail_file_f_file_tbl_resource_detail', {
                onDeleteEnd: function ( filerealname, msg )
                {
                    file_f_file_onchange();
                }
            }, file_f_file_onchange );


            //controlObj.multidropdownlistinit( 'detail_dropdown_f_group_tbl_resource_detail', resultArray, dropdown_f_group_onchange );

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

            controlObj.textdisable( 'detail_txt_f_title_tbl_resource_detail', isDisable );


            controlObj.richtextdisable( 'detail_txt_f_content_tbl_resource_detail', isDisable );

            controlObj.fileuploaderdisable( 'detail_file_f_file_tbl_resource_detail', isDisable );

            //controlObj.multidropdownlistdisable( 'detail_dropdown_f_group_tbl_resource_detail', isDisable );

            if ( isDisable )
            {
                $( '#btn_command_save_tbl_resource_detail' ).addClass( 'hidden' );
                $( '.btn-command-message' ).attr( 'disabled', 'disabled' );
            }
            else
            {
                $( '#btn_command_save_tbl_resource_detail' ).removeClass( 'hidden' );
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
    *  参数:tbl_resource_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    bindModel = function ( tbl_resource_detail, callBackFunction )
    {

        controlObj.text( 'detail_txt_f_value1_tbl_resource_detail', tbl_resource_detail.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_resource_detail', tbl_resource_detail.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_resource_detail', tbl_resource_detail.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_resource_detail', tbl_resource_detail.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_resource_detail', tbl_resource_detail.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_resource_detail', tbl_resource_detail.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_resource_detail', tbl_resource_detail.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_resource_detail', tbl_resource_detail.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_resource_detail', tbl_resource_detail.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_resource_detail', tbl_resource_detail.f_value10 );

        controlObj.text( 'detail_txt_f_title_tbl_resource_detail', tbl_resource_detail.f_title );


        controlObj.richtext( 'detail_txt_f_content_tbl_resource_detail', tbl_resource_detail.f_content );

        controlObj.fileuploaderbind( 'detail_file_f_file_tbl_resource_detail', tbl_resource_detail.f_file );

        _fileid = tbl_resource_detail.f_file;
        file_f_file_onchange();

        //controlObj.multidropdownlistid( 'detail_dropdown_f_group_tbl_resource_detail', tbl_resource_detail.f_groupid );
        controlObj.text( 'detail_dropdown_f_groupuserid_tbl_resource_detail', tbl_resource_detail.f_groupid.replaceAll( ',', '^' ) );

        controlObj.text( 'detail_dropdown_f_groupusername_tbl_resource_detail', tbl_resource_detail.f_group.replaceAll( ',', '^' ) );

        $( '#detail_dropdown_f_group_tbl_resource_detail' ).load( '../commonselectuser/commonselectuser_part.html', null, function ()
        {
            commonselectuser_Obj.containerId = 'detail_dropdown_f_group_tbl_resource_detail';
            commonselectuser_Obj.selectUserIdsControlId = 'detail_dropdown_f_groupuserid_tbl_resource_detail';
            commonselectuser_Obj.selectUserNamesControlId = 'detail_dropdown_f_groupusername_tbl_resource_detail';
            commonselectuser_Obj.selectUserPotourlsControlId = 'detail_dropdown_f_groupuserphotourl_tbl_resource_detail';
            commonselectuser_Obj.showText = '';
            commonselectuser_Obj.controlType = that._pr_pagetype;
            commonselectuser_Obj.searchTabArray = ['username', 'role', 'position', 'usergroup', 'organ'];//username,role,position,usergroup,organ；空就是没有
            commonselectuser_Obj.maxSelectedUser = '0';
            commonselectuser_Obj.init( {
                success: function ()
                {
                    callBackFunction.success();
                }
            } );
        } )

        //callBackFunction.success();
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_resource_detail
    */
    getModel = function ( callBackFunction )
    {
        try
        {
            var tbl_resource_detail = new Object();



            tbl_resource_detail.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_resource_detail' );


            tbl_resource_detail.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_resource_detail' );


            tbl_resource_detail.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_resource_detail' );


            tbl_resource_detail.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_resource_detail' );


            tbl_resource_detail.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_resource_detail' );


            tbl_resource_detail.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_resource_detail' );


            tbl_resource_detail.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_resource_detail' );


            tbl_resource_detail.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_resource_detail' );


            tbl_resource_detail.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_resource_detail' );


            tbl_resource_detail.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_resource_detail' );


            tbl_resource_detail.f_title = controlObj.text( 'detail_txt_f_title_tbl_resource_detail' );


            tbl_resource_detail.f_content = controlObj.richtext( 'detail_txt_f_content_tbl_resource_detail' );

            tbl_resource_detail.f_file = controlObj.fileuploaderid( 'detail_file_f_file_tbl_resource_detail' );


            //tbl_resource_detail.f_group = controlObj.multidropdownlist( 'detail_dropdown_f_group_tbl_resource_detail' );
            //tbl_resource_detail.f_groupid = controlObj.multidropdownlistid( 'detail_dropdown_f_group_tbl_resource_detail' );


            tbl_resource_detail.f_group = controlObj.text( 'detail_dropdown_f_groupusername_tbl_resource_detail' ).replaceAll( '^', ',' );
            tbl_resource_detail.f_groupid = controlObj.text( 'detail_dropdown_f_groupuserid_tbl_resource_detail' ).replaceAll( '^', ',' );


            callBackFunction.success( tbl_resource_detail );
        }
        catch ( ex )
        {
            _blockMessage.show( 'getData执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_resource_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function ( tbl_resource_detail, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if ( tbl_resource_detail.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_resource_detail', 'top' );
            }


            if ( tbl_resource_detail.f_title.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_title_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_title_tbl_resource_detail', 'top' );
            }




            if ( tbl_resource_detail.f_file.length > 100 )
            {
                errorMessageHansMap.put( 'detail_file_f_file_tbl_resource_detail', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_resource_detail.f_group.length > 4000 || tbl_resource_detail.f_groupid.length > 4000 )
            {
                errorMessageHansMap.put( 'div_detail_dropdown_f_group_tbl_resource_detail', '长度不能超过<a style="color:red">4000</a>' );
            }



            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage.show( errorMessageHansMap, errorMessagePlacementHansMap, true );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success( tbl_resource_detail );
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
        var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_content^f_file^f_group^f_groupid^sys_id';
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
    *  参数:tbl_resource_detail, callbackFunction
    *  向数据库更新数据，根据数据对象
    */
    updateData = function ( tbl_resource_detail, callbackFunction )
    {

        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_content^f_file^f_group^f_groupid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: tbl_resource_detail.f_value1,

            f_value2: tbl_resource_detail.f_value2,

            f_value3: tbl_resource_detail.f_value3,

            f_value4: tbl_resource_detail.f_value4,

            f_value5: tbl_resource_detail.f_value5,

            f_value6: tbl_resource_detail.f_value6,

            f_value7: tbl_resource_detail.f_value7,

            f_value8: tbl_resource_detail.f_value8,

            f_value9: tbl_resource_detail.f_value9,

            f_value10: tbl_resource_detail.f_value10,

            f_title: tbl_resource_detail.f_title,

            f_content: tbl_resource_detail.f_content,


            f_file: tbl_resource_detail.f_file,

            f_group: tbl_resource_detail.f_group,
            f_groupid: tbl_resource_detail.f_groupid,


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
    *  方法:txt_f_content_onchange
    *  参数:contents, $editable
    *  内容 onchange事件
    */
    txt_f_content_onchange = function ( contents, $editable )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '内容' + contents;
        _resultMessage.message( cc );
    },

			    /* 
    *  
    *  方法:file_f_file_onchange
    *  参数:
    *  附件 onchange事件
    */
    file_f_file_onchange = function ()
    {
        var data = { fileid: _fileid };
        doAjaxFunction( _serviceFileUrl, 'getFileListByFileid', data, {
            success: function ( result )
            {
                try
                {
                    //fileuploadname,filerealname,filesize
                    var messageJsonArray = ( new Function( "", "return " + result ) )();
                    var html = '';
                    $.each( messageJsonArray, function ( i, u )
                    {
                        var fileJson = messageJsonArray[i];

                        var nameArr = fileJson["fileuploadname"].split( '.' );
                        var fileextname = nameArr[nameArr.length - 1];
                        if ( ',jpg,jpeg,gif,png,bmp,'.indexOf(( ',' + fileextname + ',' ).toLowerCase() ) > -1 )
                        {
                            html += '<div class="div_imgtorich" onclick="tbl_resource_detail_Obj.insertIntoContent(\'' + fileJson["fileuploadname"] + '\',\'' + fileJson["filerealname"] + '\',\'' + fileextname + '\')">';
                            html += fileJson["filerealname"];
                            html += '<img width="100" height="60" alt="' + fileJson["filerealname"] + '" src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileJson["fileuploadname"] + '"/>';
                            html += '</div><br/>';
                        }
                        else
                        {
                            html += '<div class="div_filetorich" onclick="tbl_resource_detail_Obj.insertIntoContent(\'' + fileJson["fileuploadname"] + '\',\'' + fileJson["filerealname"] + '\',\'' + fileextname + '\')">';
                            html += '<a>' + fileJson["filerealname"] + '</a>';
                            html += '</div><br/>';
                        }
                    } );


                    var $img = $( '#detail_imgs_tbl_resource_detail' );

                    $img.html( html );

                }
                catch ( ex )
                {
                    _blockMessage.show( 'getFileListByFileid执行失败。<br/>' + ex.message, 'fail' );
                }
            },
            fail: function ( message )
            {
                _blockMessage.show( 'getFileListByFileid执行失败<br/>' + message, 'fail' );
            }
        } );
    },

				/* 
    *  
    *  方法:dropdown_f_group_onchange
    *  参数:changeEventParameter
    *  范围onchange事件
    */
    dropdown_f_group_onchange = function ( changeEventParameter )
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
            cc += '范围' + changeEventParameter.val;
        }
        else
        {

            cc += '范围' + '无变化';
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
                                                        _validateMessage = new validateMessage( 'btn_command_save_tbl_resource_detail' );

                                                        _ladda_btn_command_save = Ladda.create( 'btn_command_save_tbl_resource_detail' );

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
                    success: function ( tbl_resource_detail )
                    {

                        bindModel( tbl_resource_detail, {
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

        //==========================

        insertIntoContent: function ( fileuploadname, filerealname, fileextname )
        {

            switch ( fileextname.toLowerCase() )
            {
                case "png":
                case "gif":
                case "jpg":
                case "jpeg":
                case "bmp":
                    {
                        controlObj.richtext( 'detail_txt_f_content_tbl_resource_detail', '<br/><img src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '" style="position:static;max-width: 100%;"/>' + controlObj.richtext( 'detail_txt_f_content_tbl_resource_detail' ) );
                    }
                    break;
                default:
                    {
                        controlObj.richtext( 'detail_txt_f_content_tbl_resource_detail', '<br/><a href = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '">' + filerealname + '</a>' + controlObj.richtext( 'detail_txt_f_content_tbl_resource_detail' ) );
                    }
                    break;
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
                    success: function ( tbl_resource_detail )
                    {
                        checkModel( tbl_resource_detail, {
                            success: function ( tbl_resource_detail )
                            {
                                updateData( tbl_resource_detail, {
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
    tbl_resource_detail_Obj.init();
} );




