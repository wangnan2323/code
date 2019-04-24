
var tbl_app_version_color_modallist_Obj = ( function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_version_color.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    _ladda_btn_command_export_color = null,

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
            if ( that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null' )
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number( that._pr_gridpageindex );
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
            //根据页面情况设置Grid的高度
            var gridHeight = $(window).height() - 450;


            $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( {
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

                                if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + row.sys_id + '^' ) > -1 )
                                {
                                    return {
                                        disabled: false,
                                        checked: true
                                    }
                                }
                                return value;
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
			        field: 'f_resourcename', title: 'name',
			        "class": 'hidden',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_resourcekey', title: 'key',
			        "class": 'cc-hidden-sm  cc-hidden-xs ',
			        align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_resourcevalue', title: 'value',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },
                 {
                     field: 'f_resourcevalue', title: 'value',
                     "class": 'cc-hidden-sm  cc-hidden-xs',
                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                     formatter: function ( value, row, index )
                     {
                         
                         return '<span style="background-color:#' + value + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>';

                     }
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

                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_version_color_modallist )
                                {
                                    bindDeitalModel( tbl_app_version_color_modallist, {
                                        success: function ()
                                        {
                                            $( '#div_detail_modal_tbl_app_version_color_modallist' ).modal( 'show' );
                                        }
                                    } );
                                }
                            } );

                        },
                        'click .edit': function ( e, value, row, index )
                        {
                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_version_color_modallist )
                                {
                                    bindDeitalModel( tbl_app_version_color_modallist, {
                                        success: function ()
                                        {
                                            $( '#div_detail_modal_tbl_app_version_color_modallist' ).modal( 'show' );
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
                    var rows = $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( 'getSelections' );
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
                    var rows = $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( 'getData' );
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


        controlObj.textdisable( 'detail_txt_f_resourcename_tbl_app_version_color_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_resourcekey_tbl_app_version_color_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_resourcevalue_tbl_app_version_color_modallist', isDisable );

        if ( isDisable )
        {
            $( '#btn_detail_modal_save_tbl_app_version_color_modallist' ).addClass( 'hidden' );
            $( '#btn_command_new_tbl_app_version_color_modallist' ).addClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_version_color_modallist' ).addClass( 'hidden' );
        }
        else
        {
            $( '#btn_detail_modal_save_tbl_app_version_color_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_new_tbl_app_version_color_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_version_color_modallist' ).removeClass( 'hidden' );
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

        var data = {
            clientInf: _clientInf
        };
        doAjaxFunction( _serviceUrl, 'GetBaseCode', data, {
            success: function ( result )
            {
                try
                {


                    var codes = result.split( '^' );

                    var code1 = [];
                    var code2 = [];

                    for ( var i = 0; i < codes.length; i++ )
                    {
                        code1.push( { id: codes[i], text: codes[i] } );
                        code2.push( codes[i] );
                    }


                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put( 'servicecode_01', code1 );

                    _baseCodeHashMap.put( 'servicecode_array', code2 );

                    callBackFunction.success();
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


    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------


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
            // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
            $( '#btn_command_clearselect_tbl_app_version_color_modallist' ).addClass( 'hidden' );

        }
        else
        {
            $( '#btn_command_clearselect_tbl_app_version_color_modallist' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_app_version_color_modallist .cc-badge-p' ).html( currentcount + '/' + allcount );
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
            var resultArray = _baseCodeHashMap.get( 'servicecode_01' );
            var contentArray = _baseCodeHashMap.get( 'servicecode_array' );


            //初始化选择控件
            controlObj.singledropdownlistinit( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist', resultArray, dropdown_f_singledropdownlist_onchange );
            controlObj.autocompleteinit( 'detail_txt_f_resourcename_tbl_app_version_color_modallist', contentArray, detail_txt_f_resourcename_onselected );

            //模态窗口
            $( '#div_detail_modal_tbl_app_version_color_modallist' ).modal( {
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

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:bindDeitalModel
    *  参数:callBackFunction
    *  根据传入的tbl_app_version_color_modallist，绑定DetailModel
    */
    bindDeitalModel = function ( tbl_app_version_color_modallist, callBackFunction )
    {

        controlObj.text( 'detail_txt_f_value1_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value10 );

        controlObj.text( 'detail_txt_f_resourcename_tbl_app_version_color_modallist', controlObj.text( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist' ) );

        controlObj.text( 'detail_txt_f_resourcekey_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_resourcekey );

        controlObj.text( 'detail_txt_f_resourcevalue_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_resourcevalue );

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
            var tbl_app_version_color_modallist = new Object();

            tbl_app_version_color_modallist.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_resourcename = controlObj.text( 'detail_txt_f_resourcename_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_resourcekey = controlObj.text( 'detail_txt_f_resourcekey_tbl_app_version_color_modallist' );

            tbl_app_version_color_modallist.f_resourcevalue = controlObj.text( 'detail_txt_f_resourcevalue_tbl_app_version_color_modallist' );

            callBackFunction.success( tbl_app_version_color_modallist );
        }
        catch ( ex )
        {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

             /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_app_version_color_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function ( tbl_app_version_color_modallist, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if ( tbl_app_version_color_modallist.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_app_version_color_modallist', 'top' );
            }

            if ( tbl_app_version_color_modallist.f_resourcename.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_resourcename_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_app_version_color_modallist.f_resourcekey.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_resourcekey_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_resourcekey_tbl_app_version_color_modallist', 'top' );
            }


            if ( tbl_app_version_color_modallist.f_resourcevalue.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_resourcevalue_tbl_app_version_color_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_resourcevalue_tbl_app_version_color_modallist', 'top' );
            }

            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage_detail.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success( tbl_app_version_color_modallist );
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
    *  参数:tbl_app_version_color_modallist
    *  清空数据对象
    */
    clearDetailModel = function ( tbl_app_version_color_modallist )
    {





        tbl_app_version_color_modallist.f_value1 = '';
        controlObj.text( 'detail_txt_f_value1_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value1 );




        tbl_app_version_color_modallist.f_value2 = '';
        controlObj.text( 'detail_txt_f_value2_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value2 );




        tbl_app_version_color_modallist.f_value3 = '';
        controlObj.text( 'detail_txt_f_value3_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value3 );




        tbl_app_version_color_modallist.f_value4 = '';
        controlObj.text( 'detail_txt_f_value4_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value4 );




        tbl_app_version_color_modallist.f_value5 = '';
        controlObj.text( 'detail_txt_f_value5_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value5 );




        tbl_app_version_color_modallist.f_value6 = '';
        controlObj.text( 'detail_txt_f_value6_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value6 );




        tbl_app_version_color_modallist.f_value7 = '';
        controlObj.text( 'detail_txt_f_value7_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value7 );




        tbl_app_version_color_modallist.f_value8 = '';
        controlObj.text( 'detail_txt_f_value8_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value8 );




        tbl_app_version_color_modallist.f_value9 = '';
        controlObj.text( 'detail_txt_f_value9_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value9 );




        tbl_app_version_color_modallist.f_value10 = '';
        controlObj.text( 'detail_txt_f_value10_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_value10 );


        tbl_app_version_color_modallist.f_resourcename = '';
        controlObj.text( 'detail_txt_f_resourcename_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_resourcename );




        tbl_app_version_color_modallist.f_resourcekey = '';
        controlObj.text( 'detail_txt_f_resourcekey_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_resourcekey );




        tbl_app_version_color_modallist.f_resourcevalue = '';
        controlObj.text( 'detail_txt_f_resourcevalue_tbl_app_version_color_modallist', tbl_app_version_color_modallist.f_resourcevalue );


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
        var columnsString = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_resourcename^f_resourcekey^f_resourcevalue^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

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
    *  参数:tbl_app_version_color_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function ( tbl_app_version_color_modallist, callbackFunction )
    {
        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_resourcename^f_resourcekey^f_resourcevalue^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _sys_id,


            f_value1: tbl_app_version_color_modallist.f_value1,

            f_value2: tbl_app_version_color_modallist.f_value2,

            f_value3: tbl_app_version_color_modallist.f_value3,

            f_value4: tbl_app_version_color_modallist.f_value4,

            f_value5: tbl_app_version_color_modallist.f_value5,

            f_value6: tbl_app_version_color_modallist.f_value6,

            f_value7: tbl_app_version_color_modallist.f_value7,

            f_value8: tbl_app_version_color_modallist.f_value8,

            f_value9: tbl_app_version_color_modallist.f_value9,

            f_value10: tbl_app_version_color_modallist.f_value10,


            f_resourcename: tbl_app_version_color_modallist.f_resourcename,

            f_resourcekey: tbl_app_version_color_modallist.f_resourcekey,

            f_resourcevalue: tbl_app_version_color_modallist.f_resourcevalue,


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
                callbackFunction.success( tbl_app_version_color_modallist );
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
        that.bindGrid( {
            success: function ()
            {
            }
        } );
        _resultMessage.message( cc );
    },

			    /* 
    *  
    *  方法:detail_txt_f_resourcename_onselected
    *  参数:
    * 
    */
    detail_txt_f_resourcename_onselected = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += 'name' + controlObj.text( 'detail_txt_f_resourcename_tbl_app_version_color_modallist' );
        _resultMessage.message( cc );
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


        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function ( callBackFunction )
        {
            try
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

                                                _validateMessage_search = new validateMessage( 'btn_search_modal_search_tbl_app_version_color_modallist' );
                                                _validateMessage_detail = new validateMessage( 'btn_detail_modal_save_tbl_app_version_color_modallist' );

                                                _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_app_version_color_modallist' );
                                                _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_app_version_color_modallist' );
                                                _ladda_btn_command_export_color = Ladda.create( 'btn_command_export_tbl_app_version_color_modallist' );

                                                callBackFunction.success();
                                            }
                                        } );



                                    }
                                } );

                            }
                        } );


                        initBaseCode( {
                            success: function ()
                            {
                                initDetailControl( {
                                    success: function ()
                                    {
                                        switch ( that._pr_listtype )
                                        {
                                            case "1":
                                                setDisable( false );
                                                break;
                                            case "2":
                                                setDisable( true );
                                                break;
                                        }

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

                if ( controlObj.text( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist' ) == "" )
                {
                    var whereClause = '1=2';
                } else
                {
                    var whereClause = "f_resourcename='" + controlObj.text( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist' ) + "'";
                }


                var orderByString = ' f_resourcekey';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_resourcename^f_resourcekey^f_resourcevalue^sys_id';

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
                        $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( "loadJson", messageJson );
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
            var json = {
                //f_file: controlObj.fileuploadernewfileid(),
                f_resourcename: controlObj.text( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist' ),
                sys_delflag: "0",
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
            };
            doAjaxFunction( _serviceUrl, 'Add', data, {
                success: function ( result )
                {
                    _ladda_btn_command_new.stop();
                    _sys_id = result;
                    getDetailData( {
                        success: function ( tbl_app_version_color_modallist )
                        {
                            $( '#div_detail_modal_tbl_app_version_color_modallist' ).modal( 'show' );
                            bindDeitalModel( tbl_app_version_color_modallist, {
                                success: function ()
                                {
                                }
                            } );

                        }
                    } );

                },
                fail: function ( message )
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
                var currentcount = $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( 'getSelections' ).length;
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
                                                initBaseCode( {
                                                    success: function ()
                                                    {
                                                        initDetailControl( {
                                                            success: function ()
                                                            {
                                                                switch ( that._pr_listtype )
                                                                {
                                                                    case "1":
                                                                        setDisable( false );
                                                                        break;
                                                                    case "2":
                                                                        setDisable( true );
                                                                        break;
                                                                }

                                                            }
                                                        } );
                                                    }
                                                } );
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
*  方法:btn_command_delete_onclick
*  参数:
*  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
*/
        btn_command_export_color_onclick: function ()
        {
            if ( controlObj.text( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist' ) != "" )
            {
                _ladda_btn_command_export_color.start();

                var data = {
                    f_resourcename: controlObj.text( 'detail_dropdown_f_singledropdownlist_tbl_app_version_color_modallist' ),
                    clientInf: _clientInf
                };

                doAjaxFunction( _serviceUrl, 'Export', data, {
                    success: function ( result )
                    {
                       
                        _ladda_btn_command_export_color.stop();
                        $( '#download_color' ).html('下载')
                        $( '#download_color' ).attr( 'href', result + "?" + Math.random() * 10000 );
                        
                      

                    },
                    fail: function ( message )
                    {
                       
                        _alertMessage.show( '文件创建失败<br/>' + message, 'fail' );
                        _ladda_btn_command_export_color.stop();
                    }
                } );
            } else
            {
                _alertMessage.show( '请先选择类型后再导出数据。', 'fail' );
                _ladda_btn_command_export_color.stop();
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
            $( '#table_grid_tbl_app_version_color_modallist' ).bootstrapTable( 'uncheckAll' );
            that._pr_gridselectids = '';
            gridSelectedChange();
        },


        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------



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
                success: function ( tbl_app_version_color_modallist )
                {
                    checkDetailModel( tbl_app_version_color_modallist, {
                        success: function ( tbl_app_version_color_modallist )
                        {

                            updateDetailData( tbl_app_version_color_modallist, {
                                success: function ( tbl_app_version_color_modallist )
                                {
                                    clearDetailModel( tbl_app_version_color_modallist );
                                    $( '#div_detail_modal_tbl_app_version_color_modallist' ).modal( 'hide' )
                                    that.bindGrid();
                                   
                                    initBaseCode( {
                                        success: function ()
                                        {
                                            initDetailControl( {
                                                success: function ()
                                                {
                                                    switch ( that._pr_listtype )
                                                    {
                                                        case "1":
                                                            setDisable( false );
                                                            break;
                                                        case "2":
                                                            setDisable( true );
                                                            break;
                                                    }

                                                }
                                            } );
                                        }
                                    } );
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
            $( '#div_detail_modal_tbl_app_version_color_modallist' ).modal( 'hide' );
            _validateMessage_detail.hidden();

        }
    };
    return that;
} )();



