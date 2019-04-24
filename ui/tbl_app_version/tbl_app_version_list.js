
var _pr_appcode = '';
var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_app_version_list_Obj = ( function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_version.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '10',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

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
    initParameter = function ( callBackFunction )
    {
        try
        {
            that._pr_listtype = requestQuery( 'listtype' );

            _pr_appcode = requestQuery( 'appcode' );
            that._pr_gridselectids = requestQuery( 'gridselectids' );
            that._pr_gridpageindex = requestQuery( 'gridpageIndex' );
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

            if ( that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null' )
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number( that._pr_gridpageindex );
            }

            that._pr_showtype = requestQuery( 'showtype' );
            if ( that._pr_showtype == null || that._pr_showtype == '' || that._pr_showtype == 'null' )
            {
                that._pr_showtype = "false";
            }
            else
            {
                if ( that._pr_showtype == "false" )
                {
                    that._pr_showtype = "false";
                }
                else
                {
                    that._pr_showtype = "true";

                }
            }

            controlObj.toggleinit( 'detail_ck_showtype_tbl_app_version_list', ck_showtype_onswitchchange );
            controlObj.toggle( 'detail_ck_showtype_tbl_app_version_list', that._pr_showtype );

            if ( that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null' )
            {
                _blockMessage.show( 'listtype参数接收失败...', 'fail' );
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
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function ( callBackFunction )
    {
        try
        {
            //根据页面情况设置Grid的高度
            var gridHeight = 0;
            if ( $( window ).width() < basePageObj._limSrceenWidth )
            {
                gridHeight = $( window ).height() - 320;
                if ( gridHeight < 950 )
                {
                    gridHeight = 950;
                }
            }
            else
            {
                gridHeight = $( window ).height() - 240;
            }

            $( '#table_grid_tbl_app_version_list' ).bootstrapTable( {
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: true,
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
                    formatter: function ( value, row, index )
                    {
                        //根据gridselectids给Grid设置选中项
                        switch ( that._pr_listtype )
                        {
                            //编辑模式
                            case "1":
                                {
                                    if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + row.sys_id + '^' ) > -1 )
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
                                    if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + row.sys_id + '^' ) > -1 )
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
                    valign: 'middle',
                    visible: true,
                    sortable: true
                },



			 {
			     field: 'f_value1', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value2', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value3', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value4', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value5', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value6', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value7', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value8', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value9', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_value10', title: '',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },

             {
                 field: 'f_status', title: '启用状态',
                 "class": 'cc-hidden-sm  cc-hidden-xs',
                 align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                 formatter: function ( value, row, index ) { return value; }
             },

            {
                field: 'f_apptype', title: 'app类型',
                "class": 'cc-hidden-sm  cc-hidden-xs',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function ( value, row, index ) { return value; }
            },

            {
                field: 'f_appstatusid', title: '',
                "class": 'hidden',

                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function ( value, row, index ) { return value; }
            },

			 {
			     field: 'f_appstatus', title: 'app状态',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index )
			     {
			         if ( row.f_appstatusid == "2" )
			         {
			             return "<a style=\"color:red\">" + value + "</a>";
			         }
			         else
			         {
			             return value;
			         }

			     }
			 },

			 {
			     field: 'f_appversion', title: 'app版本',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_htmlversion', title: 'html版本',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_codeversion', title: 'code版本',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_colorversion', title: 'color版本',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_comment', title: '说明',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },

                {
                    field: '', title: '操作',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function ( value, row, index )
                    {
                        switch ( that._pr_listtype )
                        {
                            case "1":
                                return [
                                '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                                '<i class="glyphicon glyphicon-edit"></i>',
                                '</a>'
                                ].join( '' );
                                break;
                            case "2":
                                return [
                                '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                                '<i class="glyphicon glyphicon-eye-open"></i>',
                                '</a>'
                                ].join( '' );
                                break;
                        }
                    },
                    events: {
                        'click .view': function ( e, value, row, index )
                        {
                            transToDetailPage( row.sys_id, '2' );

                        },
                        'click .edit': function ( e, value, row, index )
                        {
                            transToDetailPage( row.sys_id, '1' );
                        }
                    }
                }
                ],
                onPageChange: function ( size, number )
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function ( row, index )
                {
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    if ( row.f_status == "true" )
                    {
                        return { classes: 'info' };//'success'//'info'//'warning' //'danger'};
                    }
                    else
                    {
                        return {};//'success'//'info'//'warning' //'danger'};
                    }
                    //return {};
                },
                onLoadSuccess: function ( data )
                {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function ( row )
                {
                    that._pr_gridselectids += '^' + row.sys_id;
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function ( row )
                {
                    that._pr_gridselectids = ( '^' + that._pr_gridselectids + '^' ).replaceAll( '^' + row.sys_id + '^', '^' );
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function ()
                {
                    //获取当前grid中全部选中的行
                    var rows = $( '#table_grid_tbl_app_version_list' ).bootstrapTable( 'getSelections' );
                    $.each( rows, function ( i, u )
                    {
                        if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + rows[i].sys_id + '^' ) > -1 )
                        {

                        }
                        else
                        {
                            that._pr_gridselectids += '^' + rows[i].sys_id;
                        }
                    } );
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheckAll: function ()
                {
                    var rows = $( '#table_grid_tbl_app_version_list' ).bootstrapTable( 'getData' );
                    $.each( rows, function ( i, u )
                    {
                        if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + rows[i].sys_id + '^' ) > -1 )
                        {
                            that._pr_gridselectids = ( '^' + that._pr_gridselectids + '^' ).replaceAll( '^' + rows[i].sys_id + '^', '^' );
                        }
                    } );

                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
            } );

            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'initGrid执行失败<br/>' + ex.message, 'fail' );
        }


    },

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function ( isDisable )
    {
        if ( isDisable )
        {
            $( '#btn_command_new_tbl_app_version_list' ).addClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_version_list' ).addClass( 'hidden' );
        }
        else
        {

            $( '#btn_command_new_tbl_app_version_list' ).removeClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_version_list' ).removeClass( 'hidden' );
        }
    },

    /* 
    *  
    *  方法:transToDetailPage
    *  参数:id, pagetype
    *  跳页方法
    */
    transToDetailPage = function ( id, pagetype )
    {


        var url = '../tbl_app_version/tbl_app_version_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + _pr_appcode;
        url += '&fromurl=../tbl_app_version/tbl_app_version_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + _pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
        url += '"searchtype":"' + that._pr_searchtype + '",';
        url += '"showtype":"' + that._pr_showtype + '",';
        url += '"searchcontent":' + JSON.stringify( that._pr_searchcontent ) + '';
        url += '}';
        commonObj.changeUrl( url, 'right-show' );
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------


    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function ( callBackFunction )
    {
        if ( that._pr_showtype == 'true' )
        {
            _whereClauseString = " f_apptype='ios'";
        } else
        {
            _whereClauseString = " f_apptype='android'";
        }

        callBackFunction.success();
    },
    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
        if ( that._pr_gridselectids == '' )
        {
            $( '#btn_command_clearselect_tbl_app_version_list' ).addClass( 'hidden' );
        }
        else
        {
            $( '#btn_command_clearselect_tbl_app_version_list' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_app_version_list' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_app_version_list .cc-badge-p' ).html( currentcount + '/' + allcount );
        }
    },


    ck_showtype_onswitchchange = function ( event, state )
    {
        if ( state == true )
        {
            that._pr_showtype = 'true';
        }
        else
        {
            that._pr_showtype = 'false';
        }

        creatWhereClause( {
            success: function ()
            {
                that.bindGrid( {
                    success: function ()
                    {
                    }
                } );

            }
        } );
    };
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
        //显示模式
        _pr_showtype: 'true',

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
                _blockMessage.show( '程序加载中...', 'loading' );
                basePageObj.initBasePage( {
                    success: function ()
                    {
                        //初始化参数
                        initParameter( {
                            success: function ()
                            {

                                creatWhereClause( {
                                    success: function ()
                                    {
                                        initGrid( {
                                            success: function ()
                                            {
                                                that.bindGrid( {
                                                    success: function ()
                                                    {

                                                        _validateMessage = new validateMessage( 'btn_search_modal_search_tbl_app_version_list' );

                                                        _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_app_version_list' );
                                                        _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_app_version_list' );

                                                        switch ( that._pr_listtype )
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

        //---------------------------------------------------------------------------------
        // ---------------------------------grid------------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:bindGrid
        *  参数:callBackFunction
        *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
        */
        bindGrid: function ( callBackFunction )
        {
            setTimeout( function ()
            {
                var whereClause = _whereClauseString;
                var orderByString = ' f_appversion desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_appversion^f_htmlversion^f_codeversion^f_colorversion^f_comment^f_status^f_apptype^f_appstatus^f_appstatusid^sys_id';
                var data = {
                    whereString: whereClause,
                    orderByString: orderByString,
                    columnsString: columnsString,
                    pageSizeString: _pageSize,
                    pageIndexString: that._pr_gridpageindex,
                    clientInf: _clientInf
                };
                doAjaxFunction( _serviceUrl, 'GetList', data, {
                    success: function ( result )
                    {
                        var messageJson = ( new Function( "", "return " + result ) )();

                        $( '#table_grid_tbl_app_version_list' ).bootstrapTable( "loadJson", messageJson );

                        gridSelectedChange();
                        if ( callBackFunction != undefined && callBackFunction != null )
                        {
                            callBackFunction.success();
                        }
                    },
                    fail: function ( message )
                    {
                        _blockMessage.show( 'bindGrid执行失败<br/>' + message, 'fail' );
                    }
                } );
            }, 0 );
        },

        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并跳转到detail页面
        */
        btn_command_new_onclick: function ()
        {

            _ladda_btn_command_new.start();
            var d = new Date();

            var f_apptype = 'ios';
            var f_apptypeid = 'ios';

            if ( controlObj.toggle( 'detail_ck_showtype_tbl_app_version_list' ) == "false" )
            {
                f_apptype = 'android';
                f_apptypeid = 'android';
            }

           
            var json = {
                f_status:'false',
                f_appstatus:'开发',
                f_appstatusid:'1',
                f_apptype: f_apptype,
                f_apptypeid: f_apptypeid,
                f_value1: controlObj.fileuploadernewfileid(),
                sys_delflag: '0',
                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
                sys_creatdate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
                sys_creatusername: basePageObj._userInfoJson.sys_username,
                sys_creatuserid: basePageObj._userInfoJson.sys_userid
            };

            var data = {
                json: JSON.stringify( json ),
                clientInf: _clientInf
            }

            doAjaxFunction( _serviceUrl, 'Add', data, {
                success: function ( result )
                {
                    _ladda_btn_command_new.stop();
                    transToDetailPage( result, '1' );

                }, fail: function ( message )
                {
                    _alertMessage.show( '新建数据执行失败<br/>' + message, 'fail' );
                    _ladda_btn_command_new.stop();
                }
            } );
        },

        /* 
        *  
        *  方法:btn_command_delete_onclick
        *  参数:
        *  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
        */
        btn_command_delete_onclick: function ()
        {
            var allcount = that._pr_gridselectids.split( '^' ).length;

            if ( that._pr_gridselectids == '' )
            {
                _alertMessage.show( '至少选择一条数据!', 'warning', 1000 );
            }
            else
            {
                var currentcount = $( '#table_grid_tbl_app_version_list' ).bootstrapTable( 'getSelections' ).length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条</h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show( '删除确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_delete.start();
                        var whereClause = "sys_id in (\'" + that._pr_gridselectids.toString().replaceAll( "^", "\',\'" ) + "\')";
                        var orderByString = '';
                        var columnsString = 'f_status';
                        var data2 = {
                            whereString: whereClause,
                            orderByString: orderByString,
                            columnsString: columnsString,
                            pageSizeString: '',
                            pageIndexString: '',
                            clientInf: _clientInf
                        };
                        doAjaxFunction( _serviceUrl, 'GetList', data2, {
                            success: function ( result )
                            {
                                var messageJson = ( new Function( "", "return " + result ) )();
                                for ( var i = 0; i < messageJson.rows.length; i++ )
                                {
                                    if ( messageJson.rows[i].f_status == "true" )
                                    {

                                        _alertMessage.show( '不能将状态为true的信息删除！', '删除失败', 5000 );
                                        _ladda_btn_command_delete.stop();
                                        break;
                                    } else if ( i == messageJson.rows.length - 1 )
                                    {
                                        var data = {
                                            clientInf: _clientInf,
                                            whereString: whereClause
                                        };
                                        doAjaxFunction( _serviceUrl, 'Delete', data, {
                                            success: function ( result )
                                            {
                                                var data = {
                                                    clientInf: _clientInf,
                                                    whereString: _whereClauseString
                                                };
                                                doAjaxFunction( _serviceUrl, 'GetCount', data, {
                                                    success: function ( result )
                                                    {
                                                        //判断当前页面是否有记录
                                                        var count = parseInt( result );
                                                        if ( count < that._pr_gridpageindex * _pageSize )
                                                        {
                                                            that._pr_gridpageindex = Math.ceil( count / _pageSize );
                                                        }
                                                        if ( that._pr_gridpageindex == 0 )
                                                        {
                                                            that._pr_gridpageindex = 1;
                                                        }
                                                        //清空选择情况
                                                        that._pr_gridselectids = '';
                                                        that.bindGrid( {
                                                            success: function ()
                                                            {
                                                                _ladda_btn_command_delete.stop();
                                                            }
                                                        } );

                                                    },
                                                    fail: function ( message )
                                                    {
                                                        _alertMessage.show( '数据删除完成，获取数据条数失败<br/>' + message, 'fail' );
                                                        _ladda_btn_command_delete.stop();
                                                    }
                                                } );

                                            },
                                            fail: function ( message )
                                            {
                                                _alertMessage.show( '数据删除失败<br/>' + message, 'fail' );
                                                _ladda_btn_command_delete.stop();
                                            }
                                        } );
                                    }
                                }

                            },
                            fail: function ( message )
                            {
                                _blockMessage.show( '检查删除状态时出现错误<br/>' + message, 'fail' );
                            }
                        } );

                    },
                    cancle: function ()
                    {
                        _alertMessage.show( '操作已取消', 'success', 1000 );
                    }
                } );
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
            $( '#table_grid_tbl_app_version_list' ).bootstrapTable( 'uncheckAll' );
            that._pr_gridselectids = '';
            gridSelectedChange();
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------


    };
    return that;
} )();

$( document ).ready( function ()
{

    tbl_app_version_list_Obj.init();
} );



