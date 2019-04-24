

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_app_pushnotification_modallist_Obj = ( function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_pushnotification.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,
    _validateMessage_add = null,


    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    _ladda_btn_command_add = null,
    _ladda_btn_command_send = null,

    

    //where语句
    _whereClauseString = '',

    _sys_id = '',

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
            that._pr_searchtype = requestQuery( 'searchtype' );
            that._pr_searchcontent = requestQuery( 'searchcontent' );
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

            if ( that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null' )
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number( that._pr_gridpageindex );
            }

            if ( that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null' )
            {
                that._pr_searchcontent = new Object();
            }
            else
            {
                that._pr_searchcontent = ( new Function( "", "return " + that._pr_searchcontent ) )();
            }

            if ( that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null' )
            {
                that._pr_searchtype = '1';
            }

            switch ( that._pr_searchtype )
            {
                case "1":
                    $( '#btn_command_search_tbl_app_pushnotification_modallist' ).html( '简单查询' );
                    $( '#txt_command_search_tbl_app_pushnotification_modallist' ).removeAttr( "disabled" );

                    break;
                case "2":
                    $( '#btn_command_search_tbl_app_pushnotification_modallist' ).html( '高级查询' );
                    $( '#txt_command_search_tbl_app_pushnotification_modallist' ).attr( "disabled", true );
                    break;
            }


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

            $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( {
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
                        switch ( that._pr_listtype )
                        {
                            case "1":
                                {

                                    if ( row.f_statusid == '0' )
                                    {
                                        if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + row.sys_id + '^' ) > -1 )
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
                                    }
                                    else
                                    {
                                        return {
                                            disabled: true,
                                            checked: false
                                        }
                                    }
                                }



                                break;
                            case "2":
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
			        field: 'f_title', title: '标题',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_send_username', title: '发送人姓名',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },

						    {
						        field: 'f_send_datetime', title: '发送日期',
						        "class": 'cc-hidden-sm  cc-hidden-xs',
						        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
						        formatter: function ( value, row, index )
						        {
						            var d = value.toDateTime().Format( "yyyy-MM-dd hh:mm:ss" );
						            if ( d == '1900-01-01 00:00:00' )
						            {
						                return "&nbsp;&nbsp;";
						            }
						            else
						            {
						                return d;
						            }
						        }
						    },


			    {
			        field: 'f_recive_username', title: '接收人名称',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_recive_devicetype', title: '接收人设备类型',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },

			    {
			        field: 'f_businesstablename', title: '业务表名称',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_businesstablekeyname', title: '业务表主键名称',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_businesstablekeyvalue', title: '业务表主键值',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_status', title: '状态',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },
                 {
                     field: 'f_statusid', title: '状态',
                     "class": 'hidden',
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



                                if ( row.f_statusid == '0' )
                                {
                                    return [
                          '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                              '<i class="glyphicon glyphicon-edit"></i>',
                          '</a>'
                                    ].join( '' );
                                }
                                else
                                {
                                    return [
                          '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                              '<i class="glyphicon glyphicon-eye-open"></i>',
                          '</a>'
                                    ].join( '' );
                                }

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

                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_pushnotification_modallist )
                                {
                                    bindDeitalModel( tbl_app_pushnotification_modallist, {
                                        success: function ()
                                        {
                                            setDisable( true );
                                            $( '#div_detail_modal_tbl_app_pushnotification_modallist' ).modal( 'show' );
                                        }
                                    } );
                                }
                            } );

                        },
                        'click .edit': function ( e, value, row, index )
                        {
                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_pushnotification_modallist )
                                {
                                    bindDeitalModel( tbl_app_pushnotification_modallist, {
                                        success: function ()
                                        {
                                            setDisable(false);
                                            $( '#div_detail_modal_tbl_app_pushnotification_modallist' ).modal( 'show' );
                                        }
                                    } );
                                }
                            } );
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
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function ( data )
                {
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
                    var rows = $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( 'getSelections' );
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
                    var rows = $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( 'getData' );
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
    *  设置detailModel是否只读
    */
    setDisable = function ( isDisable )
    {


        controlObj.textdisable( 'detail_txt_f_title_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_content_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_send_username_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_send_userid_tbl_app_pushnotification_modallist', isDisable );

        controlObj.datetimedisable( 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time', isDisable );

        controlObj.textdisable( 'detail_txt_f_recive_username_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_recive_userid_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_recive_deviceid_tbl_app_pushnotification_modallist', isDisable );


        controlObj.singledropdownlistdisable( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_recive_devicetypeid_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_recive_certificate_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_businesstablename_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', isDisable );


        controlObj.singledropdownlistdisable( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist', isDisable );

        if ( isDisable )
        {
            $( '#btn_detail_modal_save_tbl_app_pushnotification_modallist' ).addClass( 'hidden' );
           
        }
        else
        {
            $( '#btn_detail_modal_save_tbl_app_pushnotification_modallist' ).removeClass( 'hidden' );

         
        }
    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function ( callBackFunction )
    {
        //commonObj.getCodeServiceJson( '0313', {
        //    success: function ( resultArray )
        //    {
        //        try
        //        {
        //            _baseCodeHashMap = new hashMap();

        //            _baseCodeHashMap.put( 'servicecode_0108', resultArray['0313'] );

        //            _baseCodeHashMap.put( 'servicecode_array', ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] );

        //            callBackFunction.success();
        //        }
        //        catch ( ex )
        //        {
        //            _blockMessage.show( 'initBaseCode执行失败。<br/>' + ex.message, 'fail' );
        //        }
        //    }
        //} );
        _baseCodeHashMap = new hashMap();
        _baseCodeHashMap.put( 'servicecode_devicetype', [
            { id: 'ios', text: 'ios' },
            { id: 'android', text: 'android' }
        ] );
        _baseCodeHashMap.put( 'servicecode_status', [
           { id: '0', text: '未发送' },
           { id: '1', text: '已发送' },
           { id: '2', text: '已接受' }
        ] );

        callBackFunction.success();

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
    initSearchControl = function ( callBackFunction )
    {
        try
        {
            //单选下拉列表--采用复选模式
            var statusArray = _baseCodeHashMap.get( 'servicecode_status' );

            controlObj.multidropdownlistinit( 'search_dropdown_f_status_tbl_app_pushnotification_modallist', statusArray );

            //模态窗口
            $( '#div_search_modal_tbl_app_pushnotification_modallist' ).modal( {
                keyboard: false,
                backdrop: 'static',
                show: false
            } );
            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'initSearchControl执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    //=============================Model操作===================================
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置SearchModel数据
    */
    setSearchModel = function ( callBackFunction )
    {
        try
        {
            switch ( that._pr_searchtype )
            {
                case "1":
                    if ( that._pr_searchcontent.type1 != undefined )
                    {
                        //简单查询
                        $( "#txt_command_search_tbl_app_pushnotification_modallist" ).val( that._pr_searchcontent.type1 );
                    }

                    break;
                case "2":
                    if ( that._pr_searchcontent.type2 != undefined )
                    {
                        //高级查询
                        var tbl_app_pushnotification_modallist = that._pr_searchcontent.type2;

                        controlObj.text( 'search_txt_f_value1_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value1 );

                        controlObj.text( 'search_txt_f_value2_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value2 );

                        controlObj.text( 'search_txt_f_value3_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value3 );

                        controlObj.text( 'search_txt_f_value4_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value4 );

                        controlObj.text( 'search_txt_f_value5_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value5 );

                        controlObj.text( 'search_txt_f_value6_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value6 );

                        controlObj.text( 'search_txt_f_value7_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value7 );

                        controlObj.text( 'search_txt_f_value8_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value8 );

                        controlObj.text( 'search_txt_f_value9_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value9 );

                        controlObj.text( 'search_txt_f_value10_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value10 );

                        controlObj.text( 'search_txt_f_title_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_title );

                        controlObj.text( 'search_txt_f_send_username_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_send_username );

                        controlObj.text( 'search_txt_f_recive_username_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_username );

                        controlObj.text( 'search_txt_f_businesstablename_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablename );

                        controlObj.text( 'search_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablekeyname );

                        controlObj.multidropdownlistid( 'search_dropdown_f_status_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_statusid );

                    }
                    break;
            }
            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }

    },

    /* 
    *  
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取SearchModel的数据，存储到_pr_searchcontent
    */
    getSearchModel = function ( callBackFunction )
    {
        try
        {
            switch ( that._pr_searchtype )
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $( "#txt_command_search_tbl_app_pushnotification_modallist" ).val();
                    break;
                case "2":
                    var tbl_app_pushnotification_modallist = new Object();



                    tbl_app_pushnotification_modallist.f_value1 = controlObj.text( 'search_txt_f_value1_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value2 = controlObj.text( 'search_txt_f_value2_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value3 = controlObj.text( 'search_txt_f_value3_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value4 = controlObj.text( 'search_txt_f_value4_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value5 = controlObj.text( 'search_txt_f_value5_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value6 = controlObj.text( 'search_txt_f_value6_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value7 = controlObj.text( 'search_txt_f_value7_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value8 = controlObj.text( 'search_txt_f_value8_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value9 = controlObj.text( 'search_txt_f_value9_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_value10 = controlObj.text( 'search_txt_f_value10_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_title = controlObj.text( 'search_txt_f_title_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_send_username = controlObj.text( 'search_txt_f_send_username_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_recive_username = controlObj.text( 'search_txt_f_recive_username_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_businesstablename = controlObj.text( 'search_txt_f_businesstablename_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_businesstablekeyname = controlObj.text( 'search_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist' );


                    tbl_app_pushnotification_modallist.f_statusid = controlObj.multidropdownlistid( 'search_dropdown_f_status_tbl_app_pushnotification_modallist' );

                    that._pr_searchcontent.type2 = tbl_app_pushnotification_modallist;
                    break;
            }
            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  对_pr_searchcontent的type2进行校验
    */
    checkSearchModel = function ( callBackFunction )
    {
        try
        {
            var tbl_app_pushnotification_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();


            if ( tbl_app_pushnotification_modallist.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value1_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value1_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value2_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value2_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value3_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value3_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value4_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value4_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value5_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value5_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value6_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value6_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value7_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value7_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value8_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value8_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value9_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value9_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value10_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value10_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_title.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_title_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_title_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_send_username.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_send_username_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_send_username_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_recive_username.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_recive_username_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_recive_username_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_businesstablename.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_businesstablename_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_businesstablename_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_businesstablekeyname.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_statusid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_status_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage_search.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_search.hidden();
                callBackFunction.success();
            }
        }
        catch ( ex )
        {
            _blockMessage.show( 'checkSearchModel执行失败。<br/>' + ex.message, 'fail' );
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
        switch ( that._pr_searchtype )
        {
            case "1":
                if ( that._pr_searchcontent.type2 == undefined )
                {
                    that._pr_searchcontent.type2 = new Object();
                }

                that._pr_searchcontent.type2.f_value1 = '';
                controlObj.text( 'search_txt_f_value1_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value1 );

                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text( 'search_txt_f_value2_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value2 );

                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text( 'search_txt_f_value3_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value3 );

                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text( 'search_txt_f_value4_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value4 );

                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text( 'search_txt_f_value5_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value5 );

                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text( 'search_txt_f_value6_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value6 );

                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text( 'search_txt_f_value7_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value7 );

                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text( 'search_txt_f_value8_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value8 );

                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text( 'search_txt_f_value9_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value9 );

                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text( 'search_txt_f_value10_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_value10 );

                that._pr_searchcontent.type2.f_title = '';
                controlObj.text( 'search_txt_f_title_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_title );

                that._pr_searchcontent.type2.f_send_username = '';
                controlObj.text( 'search_txt_f_send_username_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_send_username );

                that._pr_searchcontent.type2.f_recive_username = '';
                controlObj.text( 'search_txt_f_recive_username_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_recive_username );

                that._pr_searchcontent.type2.f_businesstablename = '';
                controlObj.text( 'search_txt_f_businesstablename_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_businesstablename );

                that._pr_searchcontent.type2.f_businesstablekeyname = '';
                controlObj.text( 'search_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_businesstablekeyname );


                that._pr_searchcontent.type2.f_statusid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_status_tbl_app_pushnotification_modallist', that._pr_searchcontent.type2.f_statusid );

                break;
            case "2":
                if ( that._pr_searchcontent.type1 == undefined )
                {
                    that._pr_searchcontent.type1 = '';
                }

                $( "#txt_command_search_tbl_app_pushnotification_modallist" ).val( '' );
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
    creatWhereClause = function ( callBackFunction )
    {

        var whereClause = '';
        switch ( that._pr_searchtype )
        {
            case "1":
                {

                    if ( that._pr_searchcontent.type1 != undefined )
                    {
                        var vv = that._pr_searchcontent.type1.split( ' ' );
                        if ( vv.length > 0 )
                        {
                            for ( var i = 0; i < vv.length; i++ )
                            {
                                if ( vv[i] != '' )
                                {
                                    whereClause += "(";


                                    whereClause += " f_title like '%" + vv[i] + "%' or ";

                                    whereClause += " f_send_username like '%" + vv[i] + "%' or ";

                                    whereClause += " f_recive_username like '%" + vv[i] + "%' or ";

                                    whereClause += " f_businesstablename like '%" + vv[i] + "%' or ";

                                    whereClause += " f_businesstablekeyname like '%" + vv[i] + "%' or ";

                                    whereClause += " f_status like '%" + vv[i] + "%' or ";


                                    if ( whereClause.length > 0 )
                                    {
                                        whereClause = whereClause.substr( 0, whereClause.length - 3 );
                                    }
                                    whereClause += ") and ";
                                }
                            }
                            if ( whereClause.length > 0 )
                            {
                                whereClause = whereClause.substr( 0, whereClause.length - 4 );
                            }
                        }
                        _whereClauseString = whereClause;
                    }


                    callBackFunction.success();
                }
                break;
            case "2":
                {
                    if ( that._pr_searchcontent.type2 != undefined )
                    {

                        var tbl_app_pushnotification_modallist = that._pr_searchcontent.type2;


                        if ( tbl_app_pushnotification_modallist.f_title.length > 0 )
                        {
                            whereClause += " f_title like '%" + tbl_app_pushnotification_modallist.f_title + "%' and ";
                        }


                        if ( tbl_app_pushnotification_modallist.f_send_username.length > 0 )
                        {
                            whereClause += " f_send_username like '%" + tbl_app_pushnotification_modallist.f_send_username + "%' and ";
                        }


                        if ( tbl_app_pushnotification_modallist.f_recive_username.length > 0 )
                        {
                            whereClause += " f_recive_username like '%" + tbl_app_pushnotification_modallist.f_recive_username + "%' and ";
                        }


                        if ( tbl_app_pushnotification_modallist.f_businesstablename.length > 0 )
                        {
                            whereClause += " f_businesstablename like '%" + tbl_app_pushnotification_modallist.f_businesstablename + "%' and ";
                        }


                        if ( tbl_app_pushnotification_modallist.f_businesstablekeyname.length > 0 )
                        {
                            whereClause += " f_businesstablekeyname like '%" + tbl_app_pushnotification_modallist.f_businesstablekeyname + "%' and ";
                        }


                        if ( tbl_app_pushnotification_modallist.f_statusid.length > 0 )
                        {
                            var elementArray = tbl_app_pushnotification_modallist.f_statusid.split( ',' );
                            whereClause += '(';
                            $.each( elementArray, function ( i, u )
                            {
                                if ( i == 0 )
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "(('^'||f_statusid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }

                        if ( whereClause.length > 0 )
                        {
                            whereClause = whereClause.substr( 0, whereClause.length - 4 );
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
        if ( that._pr_gridselectids == '' )
        {
            // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
            $( '#btn_command_clearselect_tbl_app_pushnotification_modallist' ).addClass( 'hidden' );

        }
        else
        {
            $( '#btn_command_clearselect_tbl_app_pushnotification_modallist' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_app_pushnotification_modallist .cc-badge-p' ).html( currentcount + '/' + allcount );
        }
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
    initDetailControl = function ( callBackFunction )
    {
        try
        {
            //单选下拉列表--采用复选模式
            var statusArray = _baseCodeHashMap.get( 'servicecode_status' );
            var devicetypeArray = _baseCodeHashMap.get( 'servicecode_devicetype' );

            controlObj.datetimeinit( 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time', detail_datetime_f_send_datetime_date_onchange, detail_datetime_f_send_datetime_time_onchange );

            controlObj.singledropdownlistinit( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist', devicetypeArray, detail_dropdown_f_recive_devicetype_onchange );

            controlObj.singledropdownlistinit( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist', statusArray, detail_dropdown_f_status_onchange );

            //模态窗口
            $( '#div_detail_modal_tbl_app_pushnotification_modallist' ).modal( {
                keyboard: false,
                backdrop: 'static',
                show: false
            } );

            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'initDetailControl执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------AddModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initDetailControl
    *  参数:
    *  初始化DetailModel控件，_baseCodeHashMap作为Code数据源
    */
    initAddControl = function ( callBackFunction )
    {
        try
        {

            var statusArray = _baseCodeHashMap.get( 'servicecode_status' );
            controlObj.datetimeinit( 'add_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'add_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time' );


            //模态窗口
            $( '#div_add_modal_tbl_app_pushnotification_modallist' ).modal( {
                keyboard: false,
                backdrop: 'static',
                show: false
            } );

            $( '#div_add_selectuser_tbl_app_pushnotification_modallist' ).load( '../commonselectuser/commonselectuser_part.html', null, function ()
            {
                commonselectuser_Obj.containerId = 'div_add_selectuser_tbl_app_pushnotification_modallist';
                commonselectuser_Obj.selectUserIdsControlId = 'add_txt_selectuserids_tbl_app_pushnotification_modallist';
                commonselectuser_Obj.selectUserNamesControlId = 'add_txt_selectusernames_tbl_app_pushnotification_modallist';
                commonselectuser_Obj.selectUserPotourlsControlId = 'add_txt_selectuserphotourls_tbl_app_pushnotification_modallist';
                commonselectuser_Obj.showText = '接收人';
                commonselectuser_Obj.controlType = that._pr_listtype;
                commonselectuser_Obj.searchTabArray = ['username', 'role', 'position', 'usergroup', 'organ'];//username,role,position,usergroup,organ；空就是没有
                commonselectuser_Obj.maxSelectedUser = '0';
                commonselectuser_Obj.init( {
                    success: function ()
                    {
                        callBackFunction.success();
                    }
                } );
            } )

        }
        catch ( ex )
        {
            _blockMessage.show( 'initAddControl执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:bindDeitalModel
    *  参数:callBackFunction
    *  根据传入的tbl_app_pushnotification_modallist，绑定DetailModel
    */
    bindDeitalModel = function ( tbl_app_pushnotification_modallist, callBackFunction )
    {

        controlObj.text( 'detail_txt_f_value1_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value10 );

        controlObj.text( 'detail_txt_f_title_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_title );

        controlObj.text( 'detail_txt_f_content_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_content.returnStringRN() );

        controlObj.text( 'detail_txt_f_send_username_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_send_username );

        controlObj.text( 'detail_txt_f_send_userid_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_send_userid );


        controlObj.datetime( 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time', tbl_app_pushnotification_modallist.f_send_datetime );

        controlObj.text( 'detail_txt_f_recive_username_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_username );

        controlObj.text( 'detail_txt_f_recive_userid_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_userid );

        controlObj.text( 'detail_txt_f_recive_deviceid_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_deviceid );

        controlObj.singledropdownlistid( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_devicetypeid );

        controlObj.text( 'detail_txt_f_recive_certificate_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_certificate );

        controlObj.text( 'detail_txt_f_businesstablename_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablename );

        controlObj.text( 'detail_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablekeyname );

        controlObj.text( 'detail_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablekeyvalue );

        controlObj.singledropdownlistid( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_statusid );

        callBackFunction.success();
    },

    /* 
    *  
    *  方法:getDetailModel
    *  参数:callBackFunction
    *  获取DetailMode的数据对象，返回数据对象
    */
    getDetailModel = function ( callBackFunction )
    {
        try
        {
            //高级查询
            var tbl_app_pushnotification_modallist = new Object();

            tbl_app_pushnotification_modallist.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_title = controlObj.text( 'detail_txt_f_title_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_content = controlObj.text( 'detail_txt_f_content_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_send_username = controlObj.text( 'detail_txt_f_send_username_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_send_userid = controlObj.text( 'detail_txt_f_send_userid_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_send_datetime = controlObj.datetime( 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time' );

            tbl_app_pushnotification_modallist.f_recive_username = controlObj.text( 'detail_txt_f_recive_username_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_recive_userid = controlObj.text( 'detail_txt_f_recive_userid_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_recive_deviceid = controlObj.text( 'detail_txt_f_recive_deviceid_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_recive_devicetype = controlObj.singledropdownlist( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist' );
            tbl_app_pushnotification_modallist.f_recive_devicetypeid = controlObj.singledropdownlistid( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_recive_certificate = controlObj.text( 'detail_txt_f_recive_certificate_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_businesstablename = controlObj.text( 'detail_txt_f_businesstablename_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_businesstablekeyname = controlObj.text( 'detail_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_businesstablekeyvalue = controlObj.text( 'detail_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist' );

            tbl_app_pushnotification_modallist.f_status = controlObj.singledropdownlist( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist' );
            tbl_app_pushnotification_modallist.f_statusid = controlObj.singledropdownlistid( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist' );

            callBackFunction.success( tbl_app_pushnotification_modallist );
        }
        catch ( ex )
        {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_app_pushnotification_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function ( tbl_app_pushnotification_modallist, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if ( tbl_app_pushnotification_modallist.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_title.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_title_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_title_tbl_app_pushnotification_modallist', 'top' );
            }

            if ( tbl_app_pushnotification_modallist.f_content.length > 4000 )
            {
                errorMessageHansMap.put( 'detail_txt_f_content_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">4000</a>' );
            }


            if ( tbl_app_pushnotification_modallist.f_send_username.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_send_username_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_send_username_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_send_userid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_send_userid_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_send_userid_tbl_app_pushnotification_modallist', 'top' );
            }




            if ( tbl_app_pushnotification_modallist.f_recive_username.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_recive_username_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_recive_username_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_recive_userid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_recive_userid_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_recive_userid_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_recive_deviceid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_recive_deviceid_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_recive_deviceid_tbl_app_pushnotification_modallist', 'top' );
            }

            if ( tbl_app_pushnotification_modallist.f_recive_devicetype.length > 100 || tbl_app_pushnotification_modallist.f_recive_devicetypeid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_app_pushnotification_modallist.f_recive_certificate.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_recive_certificate_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_recive_certificate_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_businesstablename.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_businesstablename_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_businesstablename_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_businesstablekeyname.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', 'top' );
            }


            if ( tbl_app_pushnotification_modallist.f_businesstablekeyvalue.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', 'top' );
            }

            if ( tbl_app_pushnotification_modallist.f_status.length > 100 || tbl_app_pushnotification_modallist.f_statusid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage_detail.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success( tbl_app_pushnotification_modallist );
            }
        }
        catch ( ex )
        {
            _blockMessage.show( 'checkDetailModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_app_pushnotification_modallist
    *  清空数据对象
    */
    clearDetailModel = function ( tbl_app_pushnotification_modallist )
    {

        tbl_app_pushnotification_modallist.f_value1 = '';
        controlObj.text( 'detail_txt_f_value1_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value1 );




        tbl_app_pushnotification_modallist.f_value2 = '';
        controlObj.text( 'detail_txt_f_value2_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value2 );




        tbl_app_pushnotification_modallist.f_value3 = '';
        controlObj.text( 'detail_txt_f_value3_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value3 );




        tbl_app_pushnotification_modallist.f_value4 = '';
        controlObj.text( 'detail_txt_f_value4_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value4 );




        tbl_app_pushnotification_modallist.f_value5 = '';
        controlObj.text( 'detail_txt_f_value5_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value5 );




        tbl_app_pushnotification_modallist.f_value6 = '';
        controlObj.text( 'detail_txt_f_value6_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value6 );




        tbl_app_pushnotification_modallist.f_value7 = '';
        controlObj.text( 'detail_txt_f_value7_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value7 );




        tbl_app_pushnotification_modallist.f_value8 = '';
        controlObj.text( 'detail_txt_f_value8_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value8 );




        tbl_app_pushnotification_modallist.f_value9 = '';
        controlObj.text( 'detail_txt_f_value9_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value9 );




        tbl_app_pushnotification_modallist.f_value10 = '';
        controlObj.text( 'detail_txt_f_value10_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_value10 );




        tbl_app_pushnotification_modallist.f_title = '';
        controlObj.text( 'detail_txt_f_title_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_title );




        tbl_app_pushnotification_modallist.f_content = '';
        controlObj.text( 'detail_txt_f_content_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_content );




        tbl_app_pushnotification_modallist.f_send_username = '';
        controlObj.text( 'detail_txt_f_send_username_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_send_username );




        tbl_app_pushnotification_modallist.f_send_userid = '';
        controlObj.text( 'detail_txt_f_send_userid_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_send_userid );



        tbl_app_pushnotification_modallist.f_send_datetime = ( '1900-01-01 00:00:00' );
        controlObj.datetime( 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'detail_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time', tbl_app_pushnotification_modallist.f_send_datetime );




        tbl_app_pushnotification_modallist.f_recive_username = '';
        controlObj.text( 'detail_txt_f_recive_username_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_username );




        tbl_app_pushnotification_modallist.f_recive_userid = '';
        controlObj.text( 'detail_txt_f_recive_userid_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_userid );




        tbl_app_pushnotification_modallist.f_recive_deviceid = '';
        controlObj.text( 'detail_txt_f_recive_deviceid_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_deviceid );




        tbl_app_pushnotification_modallist.f_recive_devicetype = '';
        tbl_app_pushnotification_modallist.f_recive_devicetypeid = '';
        controlObj.singledropdownlist( 'detail_dropdown_f_recive_devicetype_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_devicetypeid );




        tbl_app_pushnotification_modallist.f_recive_certificate = '';
        controlObj.text( 'detail_txt_f_recive_certificate_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_recive_certificate );




        tbl_app_pushnotification_modallist.f_businesstablename = '';
        controlObj.text( 'detail_txt_f_businesstablename_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablename );




        tbl_app_pushnotification_modallist.f_businesstablekeyname = '';
        controlObj.text( 'detail_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablekeyname );




        tbl_app_pushnotification_modallist.f_businesstablekeyvalue = '';
        controlObj.text( 'detail_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_businesstablekeyvalue );


        tbl_app_pushnotification_modallist.f_status = '';
        tbl_app_pushnotification_modallist.f_statusid = '';
        controlObj.singledropdownlist( 'detail_dropdown_f_status_tbl_app_pushnotification_modallist', tbl_app_pushnotification_modallist.f_statusid );


    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据_pr_sys_id ，返回数据对象
    */
    getDetailData = function ( callBackFunction )
    {

        var whereClause = ' sys_id = \'' + _sys_id + '\'';
        var orderByString = ' sys_id desc';
        var columnsString = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_content^f_send_username^f_send_userid^f_send_datetime^f_recive_username^f_recive_userid^f_recive_deviceid^f_recive_devicetype^f_recive_devicetypeid^f_recive_certificate^f_businesstablename^f_businesstablekeyname^f_businesstablekeyvalue^f_status^f_statusid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: '',
            pageIndexString: '',
            clientInf: _clientInf
        };
        doAjaxFunction( _serviceUrl, 'GetList', data, {
            success: function ( result )
            {
                try
                {
                    var messageJson = ( new Function( "", "return " + result ) )();

                    callBackFunction.success( messageJson.rows[0] );
                }
                catch ( ex )
                {
                    _blockMessage.show( 'getDetailData执行失败。<br/>' + ex.message, 'fail' );
                }
            },
            fail: function ( message )
            {
                _blockMessage.show( 'getDetailData执行失败<br/>' + message, 'fail' );
            }
        } );


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_app_pushnotification_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function ( tbl_app_pushnotification_modallist, callbackFunction )
    {
        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_content^f_send_username^f_send_userid^f_send_datetime^f_recive_username^f_recive_userid^f_recive_deviceid^f_recive_devicetype^f_recive_devicetypeid^f_recive_certificate^f_businesstablename^f_businesstablekeyname^f_businesstablekeyvalue^f_status^f_statusid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _sys_id,


            f_value1: tbl_app_pushnotification_modallist.f_value1,

            f_value2: tbl_app_pushnotification_modallist.f_value2,

            f_value3: tbl_app_pushnotification_modallist.f_value3,

            f_value4: tbl_app_pushnotification_modallist.f_value4,

            f_value5: tbl_app_pushnotification_modallist.f_value5,

            f_value6: tbl_app_pushnotification_modallist.f_value6,

            f_value7: tbl_app_pushnotification_modallist.f_value7,

            f_value8: tbl_app_pushnotification_modallist.f_value8,

            f_value9: tbl_app_pushnotification_modallist.f_value9,

            f_value10: tbl_app_pushnotification_modallist.f_value10,

            f_title: tbl_app_pushnotification_modallist.f_title,

            f_content: tbl_app_pushnotification_modallist.f_content.formatStringRN(),

            f_send_username: tbl_app_pushnotification_modallist.f_send_username,

            f_send_userid: tbl_app_pushnotification_modallist.f_send_userid,

            f_send_datetime: tbl_app_pushnotification_modallist.f_send_datetime,

            f_recive_username: tbl_app_pushnotification_modallist.f_recive_username,

            f_recive_userid: tbl_app_pushnotification_modallist.f_recive_userid,

            f_recive_deviceid: tbl_app_pushnotification_modallist.f_recive_deviceid,

            f_recive_devicetype: tbl_app_pushnotification_modallist.f_recive_devicetype,
            f_recive_devicetypeid: tbl_app_pushnotification_modallist.f_recive_devicetypeid,

            f_recive_certificate: tbl_app_pushnotification_modallist.f_recive_certificate,

            f_businesstablename: tbl_app_pushnotification_modallist.f_businesstablename,

            f_businesstablekeyname: tbl_app_pushnotification_modallist.f_businesstablekeyname,

            f_businesstablekeyvalue: tbl_app_pushnotification_modallist.f_businesstablekeyvalue,

            f_status: tbl_app_pushnotification_modallist.f_status,
            f_statusid: tbl_app_pushnotification_modallist.f_statusid,


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
                callbackFunction.success( tbl_app_pushnotification_modallist );
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

    //=============================控件事件===================================

    /* 
    *  
    *  方法:detail_datetime_f_send_datetime_time_onchange
    *  参数:e
    * 
    */
    detail_datetime_f_send_datetime_time_onchange = function ( e )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '发送日期' + e.time.value;
        _resultMessage.message( cc );

    },

    /* 
    *  
    *  方法:detail_datetime_f_send_datetime_date_onchange
    *  参数:ev
    * 
    */
    detail_datetime_f_send_datetime_date_onchange = function ( ev )
    {
        var ddd = new Date( ev.date.valueOf() );

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '发送日期' + ddd.Format( 'yyyy-MM-dd' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:detail_dropdown_f_recive_devicetype_onchange
    *  参数:changeEventParameter
    * 
    */
    detail_dropdown_f_recive_devicetype_onchange = function ( changeEventParameter )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        //
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
            cc += '接收人设备类型：ios；android' + changeEventParameter.val;
        }
        else
        {
            cc += '接收人设备类型：ios；android' + '无变化';
        }
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:detail_dropdown_f_status_onchange
    *  参数:changeEventParameter
    * 
    */
    detail_dropdown_f_status_onchange = function ( changeEventParameter )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        //
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
            cc += '状态：0：未发送；1：已发送；2：已接受' + changeEventParameter.val;
        }
        else
        {
            cc += '状态：0：未发送；1：已发送；2：已接受' + '无变化';
        }
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

                                                        _validateMessage_search = new validateMessage( 'btn_search_modal_search_tbl_app_pushnotification_modallist' );
                                                        _validateMessage_detail = new validateMessage( 'btn_detail_modal_save_tbl_app_pushnotification_modallist' );
                                                        _validateMessage_add = new validateMessage( 'btn_add_modal_creat_tbl_app_pushnotification_modallist' );
                                                        

                                                        _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_app_pushnotification_modallist' );
                                                        _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_app_pushnotification_modallist' );
                                                        _ladda_btn_command_add = Ladda.create( 'btn_add_modal_creat_tbl_app_pushnotification_modallist' );
                                                        
                                                        _ladda_btn_command_send = Ladda.create( 'btn_command_send_tbl_app_pushnotification_modallist' );

                                                        _blockMessage.hidden();
                                                    }
                                                } );



                                            }
                                        } );
                                    }
                                } );

                                initBaseCode( {
                                    success: function ()
                                    {
                                        initSearchControl( {
                                            success: function ()
                                            {
                                                setSearchModel( {
                                                    success: function ()
                                                    {


                                                    }
                                                } );
                                            }
                                        } );

                                        initDetailControl( {
                                            success: function ()
                                            {
                                                switch ( that._pr_listtype )
                                                {
                                                    case "1":
                                                        setDisable( false );                                                       
                                                        $( '#btn_command_send_tbl_app_pushnotification_modallist' ).removeClass( 'hidden' );
                                                        $( '#btn_command_new_tbl_app_pushnotification_modallist' ).removeClass( 'hidden' );
                                                        $( '#btn_command_delete_tbl_app_pushnotification_modallist' ).removeClass( 'hidden' );
                                                        break;
                                                    case "2":
                                                        setDisable( true );
                                                        $( '#btn_command_send_tbl_app_pushnotification_modallist' ).addClass( 'hidden' );
                                                        $( '#btn_command_new_tbl_app_pushnotification_modallist' ).addClass( 'hidden' );
                                                        $( '#btn_command_delete_tbl_app_pushnotification_modallist' ).addClass( 'hidden' );
                                                        break;
                                                }
                                            }
                                        } );

                                        initAddControl( {
                                            success: function ()
                                            {

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
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_send_username^f_send_datetime^f_recive_username^f_recive_devicetype^f_recive_devicetypeid^f_businesstablename^f_businesstablekeyname^f_businesstablekeyvalue^f_status^f_statusid^sys_id';

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
                        $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( "loadJson", messageJson );
                        gridSelectedChange();
                        if ( callBackFunction != undefined && callBackFunction != null )
                        {
                            callBackFunction.success();
                        }
                    },
                    fail: function ( message )
                    {
                        _blockMessage.show( 'that.bindGrid执行失败<br/>' + message, 'fail' );
                    }
                } );
            }, 0 );
        },


        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并打开DetailModel
        */
        btn_command_new_onclick: function ()
        {
            _ladda_btn_command_new.start();

            var d = new Date();
            controlObj.text( 'add_txt_f_title_tbl_app_pushnotification_modallist', '新建推送消息' );
            controlObj.text( 'add_txt_f_content_tbl_app_pushnotification_modallist', '' );
            controlObj.text( 'add_txt_f_send_username_tbl_app_pushnotification_modallist', basePageObj._userInfoJson.sys_username );
            controlObj.text( 'add_txt_f_send_userid_tbl_app_pushnotification_modallist', basePageObj._userInfoJson.sys_userid );
            controlObj.datetime( 'add_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'add_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time', d.Format( 'yyyy-MM-dd hh:mm:ss' ) );



            $( '#div_add_modal_tbl_app_pushnotification_modallist' ).modal( 'show' );
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
                var currentcount = $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( 'getSelections' ).length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条<h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条<h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show( '删除确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_delete.start();

                        var whereClause = "sys_id in (\'" + that._pr_gridselectids.toString().replaceAll( "^", "\',\'" ) + "\')";

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
        *  方法:btn_command_send_onclick
        *  参数:
        *  发送数据
        */
        btn_command_send_onclick: function ()
        {
            if ( that._pr_gridselectids == '' )
            {
                _alertMessage.show( '至少选择一条数据!', 'warning', 1000 );
            }
            else
            {
                var allcount = that._pr_gridselectids.split( '^' ).length;
                var currentcount = $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( 'getSelections' ).length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">发送</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条<h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条<h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show( '发送确认？', confirmContent,
               {
                   confirm: function ()
                   {
                       _ladda_btn_command_send.start();

                       var data = {
                           clientInf: _clientInf,
                           sendIds: that._pr_gridselectids
                       };
                       doAjaxFunction( _serviceUrl, 'SendNotification', data, {
                           success: function ( result )
                           {
                               that._pr_gridselectids = '';
                               that.bindGrid( {
                                   success: function ()
                                   {
                                       _ladda_btn_command_send.stop();
                                   }
                               } );
                           },
                           fail: function ( message )
                           {
                               _alertMessage.show( '数据发送失败<br/>' + message, 'fail' );
                               _ladda_btn_command_send.stop();
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
            $( '#table_grid_tbl_app_pushnotification_modallist' ).bootstrapTable( 'uncheckAll' );
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
                switch ( that._pr_searchtype )
                {
                    case "1":
                        getSearchModel( {
                            success: function ()
                            {
                                creatWhereClause( {
                                    success: function ()
                                    {
                                        clearSearchModel();

                                        that._pr_gridpageindex = '1';
                                        that._pr_gridselectids = '';
                                        that.bindGrid();
                                    }
                                } );
                            }
                        } );

                        break;
                    case "2":
                        that.btn_command_search_2_onclick();
                        break;
                }
            }
            catch ( ex )
            {
                _alertMessage.show( '查询失败<br/>' + ex.message, 'fail' );
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
            $( '#btn_command_search_tbl_app_pushnotification_modallist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_app_pushnotification_modallist' ).removeAttr( 'disabled' );
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
            $( '#btn_command_search_tbl_app_pushnotification_modallist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_app_pushnotification_modallist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_app_pushnotification_modallist' ).modal( 'show' );
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
            getSearchModel( {
                success: function ()
                {

                    checkSearchModel( {
                        success: function ()
                        {
                            creatWhereClause( {
                                success: function ()
                                {

                                    clearSearchModel();

                                    $( '#div_search_modal_tbl_app_pushnotification_modallist' ).modal( 'hide' )
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            } );
                        },
                        fail: function ()
                        {
                            //查询失败--高级查询控件输入内容错误                           
                        }
                    } );

                }
            } );


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
            $( '#div_search_modal_tbl_app_pushnotification_modallist' ).modal( 'hide' );

            that._pr_searchtype = '1';
            $( '#btn_command_search_tbl_app_pushnotification_modallist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_app_pushnotification_modallist' ).removeAttr( 'disabled' );

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
            $( '#btn_command_search_tbl_app_pushnotification_modallist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_app_pushnotification_modallist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_app_pushnotification_modallist' ).modal( 'show' );
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
            getDetailModel( {
                success: function ( tbl_app_pushnotification_modallist )
                {
                    checkDetailModel( tbl_app_pushnotification_modallist, {
                        success: function ( tbl_app_pushnotification_modallist )
                        {

                            updateDetailData( tbl_app_pushnotification_modallist, {
                                success: function ( tbl_app_pushnotification_modallist )
                                {
                                    clearDetailModel( tbl_app_pushnotification_modallist );
                                    $( '#div_detail_modal_tbl_app_pushnotification_modallist' ).modal( 'hide' )
                                    that.bindGrid();
                                },
                                fail: function ( message )
                                {
                                    _alertMessage.show( '数据更新失败<br/>' + message, 'fail' );
                                }
                            } );

                        },
                        fail: function ()
                        {
                            //数据校验失败，容错
                        }
                    } );
                }
            } );
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
            $( '#div_detail_modal_tbl_app_pushnotification_modallist' ).modal( 'hide' );
            _validateMessage_detail.hidden();

        },

        //---------------------------------------------------------------------------------
        // ---------------------------------AddModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
       *  
       *  方法:btn_add_modal_creat_onclick
       *  参数:
       *  
       */
        btn_add_modal_creat_onclick: function ()
        {
            _ladda_btn_command_add.start();

            var userIdArray = controlObj.text( 'add_txt_selectuserids_tbl_app_pushnotification_modallist' ).trimStartEnd( '^' ).split( '^' );
            var userNameArray = controlObj.text( 'add_txt_selectusernames_tbl_app_pushnotification_modallist' ).trimStartEnd( '^' ).split( '^' );

            var businesstablename = controlObj.text( 'add_txt_f_businesstablename_tbl_app_pushnotification_modallist' );
            var businesstablekeyname = controlObj.text( 'add_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist' );
            var businesstablekeyvalue = controlObj.text( 'add_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist' );

            var title = controlObj.text( 'add_txt_f_title_tbl_app_pushnotification_modallist' );
            var content = controlObj.text( 'add_txt_f_content_tbl_app_pushnotification_modallist' );
            var send_username = controlObj.text( 'add_txt_f_send_username_tbl_app_pushnotification_modallist' );
            var send_userid = controlObj.text( 'add_txt_f_send_userid_tbl_app_pushnotification_modallist' );
            var send_datetime = controlObj.datetime( 'add_datetime_f_send_datetime_tbl_app_pushnotification_modallist_date', 'add_datetime_f_send_datetime_tbl_app_pushnotification_modallist_time' );
            
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();
            var $thatSelectUser = $( '#div_add_txt_selectusernames_tbl_app_pushnotification_modallist >label.control-label' );
            if ( userIdArray.length == 0 || ( userIdArray.length == 1 && userIdArray[0] == "" ) )
            {
                errorMessageHansMap.put( 'div_add_selectuser_tbl_app_pushnotification_modallist', '不能为空' );
                errorMessagePlacementHansMap.put( 'div_add_selectuser_tbl_app_pushnotification_modallist', 'top' );

                $thatSelectUser.html( "<a style='color:red'>接收人姓名不能为空</a>" );

            }
            else
            {
                $thatSelectUser.html( "接收人姓名" );
            }
            
            if ( businesstablename.length > 100 )
            {
                errorMessageHansMap.put( 'add_txt_f_businesstablename_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'add_txt_f_businesstablename_tbl_app_pushnotification_modallist', 'top' );
            }
            
            if ( businesstablekeyname.length > 100 )
            {
                errorMessageHansMap.put( 'add_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'add_txt_f_businesstablekeyname_tbl_app_pushnotification_modallist', 'top' );
            }
            
            if ( businesstablekeyvalue.length > 100 )
            {
                errorMessageHansMap.put( 'add_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'add_txt_f_businesstablekeyvalue_tbl_app_pushnotification_modallist', 'top' );
            }
            
            if ( title.length > 100 )
            {
                errorMessageHansMap.put( 'add_txt_f_title_tbl_app_pushnotification_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'add_txt_f_title_tbl_app_pushnotification_modallist', 'top' );
            }

            if ( title.length == 0 )
            {
                errorMessageHansMap.put( 'add_txt_f_title_tbl_app_pushnotification_modallist', '不能为空' );
                errorMessagePlacementHansMap.put( 'add_txt_f_title_tbl_app_pushnotification_modallist', 'top' );
            }
            
            if ( errorMessageHansMap.keys().length > 0 )
            {
                _ladda_btn_command_add.stop();
                _validateMessage_add.show( errorMessageHansMap, errorMessagePlacementHansMap, false );

            }
            else
            {
                _validateMessage_add.hidden();


                var d = new Date();

                var jsonArray = [];
                $.each( userIdArray, function ( i, u )
                {

                    var json = {
                        f_title: title,
                        f_content: content,
                        f_send_username: send_username,
                        f_send_userid: send_userid,
                        f_send_datetime: send_datetime,
                        f_recive_username: userNameArray[i],
                        f_recive_userid: userIdArray[i],
                        f_businesstablename: businesstablename,
                        f_businesstablekeyname: businesstablekeyname,
                        f_businesstablekeyvalue: businesstablekeyvalue,
                        f_status: '未发送',
                        f_statusid: '0',
                        f_file: controlObj.fileuploadernewfileid(),
                        sys_delflag: "0",
                        sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                        sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                        sys_lasteditdate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
                        sys_creatdate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
                        sys_creatusername: basePageObj._userInfoJson.sys_username,
                        sys_creatuserid: basePageObj._userInfoJson.sys_userid
                    };

                    jsonArray.push( json );
                } );


                var data = {
                    json: JSON.stringify( jsonArray ),
                    clientInf: _clientInf
                };
                doAjaxFunction( _serviceUrl, 'AddList', data, {
                    success: function ( result )
                    {
                        that._pr_gridselectids = result;
                        that.bindGrid( {
                            success: function ()
                            {
                                _ladda_btn_command_new.stop();
                                _ladda_btn_command_add.stop();
                                $( '#div_add_modal_tbl_app_pushnotification_modallist' ).modal( 'hide' );
                            }
                        } );
                    },
                    fail: function ( message )
                    {
                        _ladda_btn_command_add.stop();
                        _alertMessage.show( '新建数据执行失败<br/>' + message, 'fail' );
                    }
                } );

            }
        },


        /* 
        *  
        *  方法:btn_add_modal_cancle_onclick
        *  参数:
        *  
        */
        btn_add_modal_cancle_onclick: function ()
        {
            _ladda_btn_command_new.stop();
            $( '#div_add_modal_tbl_app_pushnotification_modallist' ).modal( 'hide' );

        }


    };
    return that;
} )();



$( document ).ready( function ()
{
    tbl_app_pushnotification_modallist_Obj.init();
} );





