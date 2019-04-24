

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_task_modallist_Obj = ( function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_task.asmx/',
        _serviceFileUrl = '//127.0.0.1/sara.dd.ldsw.file/service/fileupload/service_fileuploaddo.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

    //where语句
    _whereClauseString = '',

    _sys_id = '',

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
                    $( '#btn_command_search_tbl_task_modallist' ).html( '简单查询' );
                    $( '#txt_command_search_tbl_task_modallist' ).removeAttr( "disabled" );

                    break;
                case "2":
                    $( '#btn_command_search_tbl_task_modallist' ).html( '高级查询' );
                    $( '#txt_command_search_tbl_task_modallist' ).attr( "disabled", true );
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

            $( '#table_grid_tbl_task_modallist' ).bootstrapTable( {
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
			     field: 'f_value1', title: '备用字段1',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value2', title: '备用字段2',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value3', title: '备用字段3',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value4', title: '备用字段4',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value5', title: '备用字段5',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value6', title: '备用字段6',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value7', title: '备用字段7',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value8', title: '备用字段8',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value9', title: '备用字段9',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
			 {
			     field: 'f_value10', title: '备用字段10',
			     visible: false,
			     class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
              {
                  field: 'f_content', title: '标题',
                  //class: 'cc-hidden-sm  cc-hidden-xs',
                  align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                  formatter: function ( value, row, index ) { return value; }
              },
			 {
			     field: 'f_tag', title: '关键字',
			     //class: 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },
             {
                 field: 'f_startdate', title: '开始日期',
                 class: 'cc-hidden-sm  cc-hidden-xs',
                 align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                 formatter: function ( value, row, index )
                 {
                     var d = value.toDateTime().Format( "yyyy-MM-dd" );
                     if ( d == '1900-01-01' )
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
                 field: 'f_edndate', title: '结束日期',
                 class: 'cc-hidden-sm  cc-hidden-xs',
                 align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                 formatter: function ( value, row, index )
                 {
                     var d = value.toDateTime().Format( "yyyy-MM-dd" );
                     if ( d == '1900-01-01' )
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
                 field: 'f_group', title: '范围',
                 //class: 'cc-hidden-sm  cc-hidden-xs',
                 align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                 formatter: function ( value, row, index ) { return value; }
             },
             {
                 field: 'f_status', title: '状态',
                 class: 'cc-hidden-sm  cc-hidden-xs',
                 align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                 formatter: function ( value, row, index )
                 {
                     return value;
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
                             success: function ( tbl_task_modallist )
                             {
                                 bindDeitalModel( tbl_task_modallist, {
                                     success: function ()
                                     {
                                         $( '#div_detail_modal_tbl_task_modallist' ).modal( 'show' );
                                     }
                                 } );
                             }
                         } );

                     },
                     'click .edit': function ( e, value, row, index )
                     {
                         _sys_id = row.sys_id;
                         getDetailData( {
                             success: function ( tbl_task_modallist )
                             {
                                 bindDeitalModel( tbl_task_modallist, {
                                     success: function ()
                                     {
                                         $( '#div_detail_modal_tbl_task_modallist' ).modal( 'show' );
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
                    //如果当前任务正在运行，且在预计时间内，则info
                    //如果当前任务正在运行，且已经超期，则danger
                    //如果当前任务已经挂起，则warning
                    //如果当前任务已经完结，则success

                    switch ( row.f_statusid )
                    {
                        case "0":
                            {
                                var currentd = new Date();
                                var enddate = new Date( row.f_edndate.toDateTime() );
                                enddate.setDate( enddate.getDate() + 1 );

                                if ( currentd <= enddate && currentd >= row.f_startdate.toDateTime() )
                                {
                                    return { classes: 'info' };
                                }
                                else
                                {
                                    return { classes: 'danger' };
                                }
                            }
                            break;
                        case "1":
                            {
                                return { classes: 'warning' };
                            }
                            break;
                        case "2":
                            {
                                return { classes: 'success' };
                            }
                            break;
                    }



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
                    var rows = $( '#table_grid_tbl_task_modallist' ).bootstrapTable( 'getSelections' );
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
                    var rows = $( '#table_grid_tbl_task_modallist' ).bootstrapTable( 'getData' );
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


        controlObj.textdisable( 'detail_txt_f_tag_tbl_task_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_content_tbl_task_modallist', isDisable );

        controlObj.fileuploaderdisable( 'detail_file_f_file_tbl_task_modallist', isDisable );

        controlObj.datetimedisable( 'detail_datetime_f_startdate_tbl_task_modallist_date', 'detail_datetime_f_startdate_tbl_task_modallist_time', isDisable );

        controlObj.datetimedisable( 'detail_datetime_f_edndate_tbl_task_modallist_date', 'detail_datetime_f_edndate_tbl_task_modallist_time', isDisable );

        controlObj.multidropdownlistdisable( 'detail_dropdown_f_group_tbl_task_modallist', isDisable );


        controlObj.singledropdownlistdisable( 'detail_dropdown_f_status_tbl_task_modallist', isDisable );


        controlObj.richtextdisable( 'detail_txt_f_comment_tbl_task_modallist', isDisable );

        if ( isDisable )
        {
            $( '#btn_detail_modal_save_tbl_task_modallist' ).addClass( 'hidden' );
            $( '#btn_command_new_tbl_task_modallist' ).addClass( 'hidden' );
            $( '#btn_command_delete_tbl_task_modallist' ).addClass( 'hidden' );
        }
        else
        {
            $( '#btn_detail_modal_save_tbl_task_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_new_tbl_task_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_delete_tbl_task_modallist' ).removeClass( 'hidden' );
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
        //var data = { clientInf: _clientInf };
        //doAjaxFunction( _serviceUrl, 'GetGroup', data, {
        //    success: function ( result )
        //    {
        //        var messageJsonArray = ( new Function( "", "return " + result ) )();
        //        _baseCodeHashMap = new hashMap();
        //        _baseCodeHashMap.put( 'group', messageJsonArray );
        //        _baseCodeHashMap.put( 'status', [{ id: "0", text: "发起" }, { id: "1", text: "挂起" }, { id: "2", text: "完结" }, ] );
        //        callBackFunction.success();
        //    },
        //    fail: function ( message )
        //    {
        //        _blockMessage.show( 'initSearchBaseCode执行失败<br/>' + message, 'fail' );
        //    }
        //} );

        _baseCodeHashMap = new hashMap();

        _baseCodeHashMap.put( 'status', [{ id: "0", text: "发起" }, { id: "1", text: "挂起" }, { id: "2", text: "完结" }, ] );
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
            //var resultArray = _baseCodeHashMap.get( 'group' );
            var toggleArray = _baseCodeHashMap.get( 'status' );

            controlObj.datetimeinit( 'search_datetime_f_startdate_tbl_task_modallist_datefrom', 'search_datetime_f_startdate_tbl_task_modallist_timefrom' );
            controlObj.datetimeinit( 'search_datetime_f_startdate_tbl_task_modallist_dateto', 'search_datetime_f_startdate_tbl_task_modallist_timeto' );

            controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_datefrom', 'search_datetime_f_startdate_tbl_task_modallist_timefrom', '1900-01-01 00:00:00' );
            controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_dateto', 'search_datetime_f_startdate_tbl_task_modallist_timeto', '1900-01-01 00:00:00' );

            controlObj.datetimeinit( 'search_datetime_f_edndate_tbl_task_modallist_datefrom', 'search_datetime_f_edndate_tbl_task_modallist_timefrom' );
            controlObj.datetimeinit( 'search_datetime_f_edndate_tbl_task_modallist_dateto', 'search_datetime_f_edndate_tbl_task_modallist_timeto' );

            controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_datefrom', 'search_datetime_f_edndate_tbl_task_modallist_timefrom', '1900-01-01 00:00:00' );
            controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_dateto', 'search_datetime_f_edndate_tbl_task_modallist_timeto', '1900-01-01 00:00:00' );

            //controlObj.multidropdownlistinit( 'search_dropdown_f_group_tbl_task_modallist', resultArray );

            controlObj.multidropdownlistinit( 'search_dropdown_f_status_tbl_task_modallist', toggleArray );

            //模态窗口
            $( '#div_search_modal_tbl_task_modallist' ).modal( {
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
                        $( "#txt_command_search_tbl_task_modallist" ).val( that._pr_searchcontent.type1 );
                    }

                    break;
                case "2":
                    if ( that._pr_searchcontent.type2 != undefined )
                    {
                        //高级查询
                        var tbl_task_modallist = that._pr_searchcontent.type2;


                        controlObj.text( 'search_txt_f_value1_tbl_task_modallist', tbl_task_modallist.f_value1 );

                        controlObj.text( 'search_txt_f_value2_tbl_task_modallist', tbl_task_modallist.f_value2 );

                        controlObj.text( 'search_txt_f_value3_tbl_task_modallist', tbl_task_modallist.f_value3 );

                        controlObj.text( 'search_txt_f_value4_tbl_task_modallist', tbl_task_modallist.f_value4 );

                        controlObj.text( 'search_txt_f_value5_tbl_task_modallist', tbl_task_modallist.f_value5 );

                        controlObj.text( 'search_txt_f_value6_tbl_task_modallist', tbl_task_modallist.f_value6 );

                        controlObj.text( 'search_txt_f_value7_tbl_task_modallist', tbl_task_modallist.f_value7 );

                        controlObj.text( 'search_txt_f_value8_tbl_task_modallist', tbl_task_modallist.f_value8 );

                        controlObj.text( 'search_txt_f_value9_tbl_task_modallist', tbl_task_modallist.f_value9 );

                        controlObj.text( 'search_txt_f_value10_tbl_task_modallist', tbl_task_modallist.f_value10 );

                        controlObj.text( 'search_txt_f_tag_tbl_task_modallist', tbl_task_modallist.f_tag );

                        controlObj.text( 'search_txt_f_content_tbl_task_modallist', tbl_task_modallist.f_content );


                        controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_datefrom', 'search_datetime_f_startdate_tbl_task_modallisttimefrom', tbl_task_modallist.f_startdatefrom );
                        controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_dateto', 'search_datetime_f_startdate_tbl_task_modallist_timeto', tbl_task_modallist.f_startdateto );



                        controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_datefrom', 'search_datetime_f_edndate_tbl_task_modallisttimefrom', tbl_task_modallist.f_edndatefrom );
                        controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_dateto', 'search_datetime_f_edndate_tbl_task_modallist_timeto', tbl_task_modallist.f_edndateto );


                        //controlObj.multidropdownlistid( 'search_dropdown_f_group_tbl_task_modallist', tbl_task_modallist.f_groupid );

                        controlObj.multidropdownlistid( 'search_dropdown_f_status_tbl_task_modallist', tbl_task_modallist.f_statusid );


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
                    that._pr_searchcontent.type1 = $( "#txt_command_search_tbl_task_modallist" ).val();

                    break;
                case "2":

                    var tbl_task_modallist = new Object();



                    tbl_task_modallist.f_value1 = controlObj.text( 'search_txt_f_value1_tbl_task_modallist' );


                    tbl_task_modallist.f_value2 = controlObj.text( 'search_txt_f_value2_tbl_task_modallist' );


                    tbl_task_modallist.f_value3 = controlObj.text( 'search_txt_f_value3_tbl_task_modallist' );


                    tbl_task_modallist.f_value4 = controlObj.text( 'search_txt_f_value4_tbl_task_modallist' );


                    tbl_task_modallist.f_value5 = controlObj.text( 'search_txt_f_value5_tbl_task_modallist' );


                    tbl_task_modallist.f_value6 = controlObj.text( 'search_txt_f_value6_tbl_task_modallist' );


                    tbl_task_modallist.f_value7 = controlObj.text( 'search_txt_f_value7_tbl_task_modallist' );


                    tbl_task_modallist.f_value8 = controlObj.text( 'search_txt_f_value8_tbl_task_modallist' );


                    tbl_task_modallist.f_value9 = controlObj.text( 'search_txt_f_value9_tbl_task_modallist' );


                    tbl_task_modallist.f_value10 = controlObj.text( 'search_txt_f_value10_tbl_task_modallist' );


                    tbl_task_modallist.f_tag = controlObj.text( 'search_txt_f_tag_tbl_task_modallist' );


                    tbl_task_modallist.f_content = controlObj.text( 'search_txt_f_content_tbl_task_modallist' );


                    tbl_task_modallist.f_startdatefrom = controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_datefrom', 'search_datetime_f_startdate_tbl_task_modallist_timefrom' ); // datefrom + ' ' + timefrom;
                    tbl_task_modallist.f_startdateto = controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_dateto', 'search_datetime_f_startdate_tbl_task_modallist_timeto' ); //dateto + ' ' + timeto;          


                    tbl_task_modallist.f_edndatefrom = controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_datefrom', 'search_datetime_f_edndate_tbl_task_modallist_timefrom' ); // datefrom + ' ' + timefrom;
                    tbl_task_modallist.f_edndateto = controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_dateto', 'search_datetime_f_edndate_tbl_task_modallist_timeto' ); //dateto + ' ' + timeto;          


                    //tbl_task_modallist.f_groupid = controlObj.multidropdownlistid( 'search_dropdown_f_group_tbl_task_modallist' );


                    tbl_task_modallist.f_statusid = controlObj.multidropdownlistid( 'search_dropdown_f_status_tbl_task_modallist' );

                    that._pr_searchcontent.type2 = tbl_task_modallist;
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
            var tbl_task_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if ( tbl_task_modallist.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value1_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value1_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value2_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value2_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value3_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value3_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value4_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value4_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value5_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value5_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value6_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value6_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value7_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value7_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value8_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value8_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value9_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value9_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_value10_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value10_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_tag.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_tag_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_tag_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_content.length > 100 )
            {
                errorMessageHansMap.put( 'search_txt_f_content_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_content_tbl_task_modallist', 'top' );
            }






            //if ( tbl_task_modallist.f_groupid.length > 100 )
            //{
            //    errorMessageHansMap.put( 'search_dropdown_f_group_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
            //}


            if ( tbl_task_modallist.f_statusid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_status_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
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
                controlObj.text( 'search_txt_f_value1_tbl_task_modallist', that._pr_searchcontent.type2.f_value1 );

                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text( 'search_txt_f_value2_tbl_task_modallist', that._pr_searchcontent.type2.f_value2 );

                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text( 'search_txt_f_value3_tbl_task_modallist', that._pr_searchcontent.type2.f_value3 );

                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text( 'search_txt_f_value4_tbl_task_modallist', that._pr_searchcontent.type2.f_value4 );

                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text( 'search_txt_f_value5_tbl_task_modallist', that._pr_searchcontent.type2.f_value5 );

                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text( 'search_txt_f_value6_tbl_task_modallist', that._pr_searchcontent.type2.f_value6 );

                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text( 'search_txt_f_value7_tbl_task_modallist', that._pr_searchcontent.type2.f_value7 );

                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text( 'search_txt_f_value8_tbl_task_modallist', that._pr_searchcontent.type2.f_value8 );

                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text( 'search_txt_f_value9_tbl_task_modallist', that._pr_searchcontent.type2.f_value9 );

                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text( 'search_txt_f_value10_tbl_task_modallist', that._pr_searchcontent.type2.f_value10 );

                that._pr_searchcontent.type2.f_tag = '';
                controlObj.text( 'search_txt_f_tag_tbl_task_modallist', that._pr_searchcontent.type2.f_tag );

                that._pr_searchcontent.type2.f_content = '';
                controlObj.text( 'search_txt_f_content_tbl_task_modallist', that._pr_searchcontent.type2.f_content );


                that._pr_searchcontent.type2.f_startdatefrom = ( '1900-01-01 00:00:00' );
                that._pr_searchcontent.type2.f_startdateto = ( '1900-01-01 00:00:00' );

                controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_datefrom', 'search_datetime_f_startdate_tbl_task_modallist_timefrom', that._pr_searchcontent.type2.f_startdatefrom );
                controlObj.datetime( 'search_datetime_f_startdate_tbl_task_modallist_dateto', 'search_datetime_f_startdate_tbl_task_modallist_timeto', that._pr_searchcontent.type2.f_startdateto );



                that._pr_searchcontent.type2.f_edndatefrom = ( '1900-01-01 00:00:00' );
                that._pr_searchcontent.type2.f_edndateto = ( '1900-01-01 00:00:00' );

                controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_datefrom', 'search_datetime_f_edndate_tbl_task_modallist_timefrom', that._pr_searchcontent.type2.f_edndatefrom );
                controlObj.datetime( 'search_datetime_f_edndate_tbl_task_modallist_dateto', 'search_datetime_f_edndate_tbl_task_modallist_timeto', that._pr_searchcontent.type2.f_edndateto );



                //that._pr_searchcontent.type2.f_groupid = '';
                //controlObj.multidropdownlistid( 'search_dropdown_f_group_tbl_task_modallist', that._pr_searchcontent.type2.f_groupid );


                that._pr_searchcontent.type2.f_statusid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_status_tbl_task_modallist', that._pr_searchcontent.type2.f_statusid );

                break;
            case "2":
                if ( that._pr_searchcontent.type1 == undefined )
                {
                    that._pr_searchcontent.type1 = '';
                }

                $( "#txt_command_search_tbl_task_modallist" ).val( '' );
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


                                    whereClause += " f_tag like '%" + vv[i] + "%' or ";

                                    whereClause += " f_content like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_startdate,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_edndate,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_group like '%" + vv[i] + "%' or ";

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

                        var tbl_task_modallist = that._pr_searchcontent.type2;




                        if ( tbl_task_modallist.f_tag.length > 0 )
                        {
                            whereClause += " f_tag like '%" + tbl_task_modallist.f_tag + "%' and ";
                        }


                        if ( tbl_task_modallist.f_content.length > 0 )
                        {
                            whereClause += " f_content like '%" + tbl_task_modallist.f_content + "%' and ";
                        }


                        if ( tbl_task_modallist.f_startdatefrom != '1900-01-01 00:00:00' )
                        {
                            whereClause += " f_startdate >= to_date('" + tbl_task_modallist.f_startdatefrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if ( tbl_task_modallist.f_startdateto != '1900-01-01 00:00:00' )
                        {
                            whereClause += " f_startdate <= to_date('" + tbl_task_modallist.f_startdateto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if ( tbl_task_modallist.f_edndatefrom != '1900-01-01 00:00:00' )
                        {
                            whereClause += " f_edndate >= to_date('" + tbl_task_modallist.f_edndatefrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if ( tbl_task_modallist.f_edndateto != '1900-01-01 00:00:00' )
                        {
                            whereClause += " f_edndate <= to_date('" + tbl_task_modallist.f_edndateto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        //if ( tbl_task_modallist.f_groupid.length > 0 )
                        //{
                        //    var elementArray = tbl_task_modallist.f_groupid.split( ',' );
                        //    whereClause += '(';
                        //    $.each( elementArray, function ( i, u )
                        //    {
                        //        if ( i == 0 )
                        //        {
                        //            whereClause += ' ';
                        //        }
                        //        else
                        //        {
                        //            whereClause += ' or ';
                        //        }
                        //        whereClause += "(('^'||f_groupid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                        //    } );
                        //    whereClause += ') and ';
                        //}


                        if ( tbl_task_modallist.f_statusid.length > 0 )
                        {
                            var elementArray = tbl_task_modallist.f_statusid.split( ',' );
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
            $( '#btn_command_clearselect_tbl_task_modallist' ).addClass( 'hidden' );

        }
        else
        {
            $( '#btn_command_clearselect_tbl_task_modallist' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_task_modallist' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_task_modallist .cc-badge-p' ).html( currentcount + '/' + allcount );
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
            //var resultArray = _baseCodeHashMap.get( 'group' );
            var toggleArray = _baseCodeHashMap.get( 'status' );


            controlObj.fileuploaderinit( 'detail_file_f_file_tbl_task_modallist', {
                onDeleteEnd: function ( filerealname, msg )
                {
                    detail_file_f_file_onchange();
                }
            }, detail_file_f_file_onchange );


            controlObj.datetimeinit( 'detail_datetime_f_startdate_tbl_task_modallist_date', 'detail_datetime_f_startdate_tbl_task_modallist_time', detail_datetime_f_startdate_date_onchange, detail_datetime_f_startdate_time_onchange );


            controlObj.datetimeinit( 'detail_datetime_f_edndate_tbl_task_modallist_date', 'detail_datetime_f_edndate_tbl_task_modallist_time', detail_datetime_f_edndate_date_onchange, detail_datetime_f_edndate_time_onchange );


            //controlObj.multidropdownlistinit( 'detail_dropdown_f_group_tbl_task_modallist', resultArray, detail_dropdown_f_group_onchange );


            controlObj.singledropdownlistinit( 'detail_dropdown_f_status_tbl_task_modallist', toggleArray, detail_dropdown_f_status_onchange );


            controlObj.richtextinit( 'detail_txt_f_comment_tbl_task_modallist', detail_txt_f_comment_onchange, {
                height: 300
            } );

            //模态窗口
            $( '#div_detail_modal_tbl_task_modallist' ).modal( {
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
    *  根据传入的tbl_task_modallist，绑定DetailModel
    */
    bindDeitalModel = function ( tbl_task_modallist, callBackFunction )
    {

        controlObj.text( 'detail_txt_f_value1_tbl_task_modallist', tbl_task_modallist.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_task_modallist', tbl_task_modallist.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_task_modallist', tbl_task_modallist.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_task_modallist', tbl_task_modallist.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_task_modallist', tbl_task_modallist.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_task_modallist', tbl_task_modallist.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_task_modallist', tbl_task_modallist.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_task_modallist', tbl_task_modallist.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_task_modallist', tbl_task_modallist.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_task_modallist', tbl_task_modallist.f_value10 );

        controlObj.text( 'detail_txt_f_tag_tbl_task_modallist', tbl_task_modallist.f_tag );

        controlObj.text( 'detail_txt_f_content_tbl_task_modallist', tbl_task_modallist.f_content.returnStringRN() );

        controlObj.fileuploaderbind( 'detail_file_f_file_tbl_task_modallist', tbl_task_modallist.f_file );
        _fileid = tbl_task_modallist.f_file;
        detail_file_f_file_onchange();
        controlObj.datetime( 'detail_datetime_f_startdate_tbl_task_modallist_date', 'detail_datetime_f_startdate_tbl_task_modallist_time', tbl_task_modallist.f_startdate );


        controlObj.datetime( 'detail_datetime_f_edndate_tbl_task_modallist_date', 'detail_datetime_f_edndate_tbl_task_modallist_time', tbl_task_modallist.f_edndate );

        

        controlObj.singledropdownlistid( 'detail_dropdown_f_status_tbl_task_modallist', tbl_task_modallist.f_statusid );

        //controlObj.multidropdownlistid( 'detail_dropdown_f_group_tbl_task_modallist', tbl_task_modallist.f_groupid );
        
        controlObj.text( 'detail_dropdown_f_groupuserid_tbl_task_modallist', tbl_task_modallist.f_groupid.replaceAll( ',', '^' ) );

        controlObj.text( 'detail_dropdown_f_groupusername_tbl_task_modallist', tbl_task_modallist.f_group.replaceAll( ',', '^' ) );

        $( '#detail_dropdown_f_group_tbl_task_modallist' ).load( '../commonselectuser/commonselectuser_part.html', null, function ()
        {
            commonselectuser_Obj.containerId = 'detail_dropdown_f_group_tbl_task_modallist';
            commonselectuser_Obj.selectUserIdsControlId = 'detail_dropdown_f_groupuserid_tbl_task_modallist';
            commonselectuser_Obj.selectUserNamesControlId = 'detail_dropdown_f_groupusername_tbl_task_modallist';
            commonselectuser_Obj.selectUserPotourlsControlId = 'detail_dropdown_f_groupuserphotourl_tbl_task_modallist';
            commonselectuser_Obj.showText = '';
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


        controlObj.richtext( 'detail_txt_f_comment_tbl_task_modallist', tbl_task_modallist.f_comment );


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
            var tbl_task_modallist = new Object();


            tbl_task_modallist.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_task_modallist' );

            tbl_task_modallist.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_task_modallist' );

            tbl_task_modallist.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_task_modallist' );

            tbl_task_modallist.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_task_modallist' );

            tbl_task_modallist.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_task_modallist' );

            tbl_task_modallist.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_task_modallist' );

            tbl_task_modallist.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_task_modallist' );

            tbl_task_modallist.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_task_modallist' );

            tbl_task_modallist.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_task_modallist' );

            tbl_task_modallist.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_task_modallist' );

            tbl_task_modallist.f_tag = controlObj.text( 'detail_txt_f_tag_tbl_task_modallist' );

            tbl_task_modallist.f_content = controlObj.text( 'detail_txt_f_content_tbl_task_modallist' );

            tbl_task_modallist.f_file = controlObj.fileuploaderid( 'detail_file_f_file_tbl_task_modallist' );

            tbl_task_modallist.f_startdate = controlObj.datetime( 'detail_datetime_f_startdate_tbl_task_modallist_date', 'detail_datetime_f_startdate_tbl_task_modallist_time' );

            tbl_task_modallist.f_edndate = controlObj.datetime( 'detail_datetime_f_edndate_tbl_task_modallist_date', 'detail_datetime_f_edndate_tbl_task_modallist_time' );


            //tbl_task_modallist.f_group = controlObj.multidropdownlist( 'detail_dropdown_f_group_tbl_task_modallist' );
            //tbl_task_modallist.f_groupid = controlObj.multidropdownlistid( 'detail_dropdown_f_group_tbl_task_modallist' );

            tbl_task_modallist.f_group = controlObj.text( 'detail_dropdown_f_groupusername_tbl_task_modallist' ).replaceAll( '^', ',' );
            tbl_task_modallist.f_groupid = controlObj.text( 'detail_dropdown_f_groupuserid_tbl_task_modallist' ).replaceAll( '^', ',' );

            tbl_task_modallist.f_status = controlObj.singledropdownlist( 'detail_dropdown_f_status_tbl_task_modallist' );
            tbl_task_modallist.f_statusid = controlObj.singledropdownlistid( 'detail_dropdown_f_status_tbl_task_modallist' );


            tbl_task_modallist.f_comment = controlObj.richtext( 'detail_txt_f_comment_tbl_task_modallist' );

            callBackFunction.success( tbl_task_modallist );
        }
        catch ( ex )
        {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_task_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function ( tbl_task_modallist, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if ( tbl_task_modallist.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_task_modallist', 'top' );
            }


            if ( tbl_task_modallist.f_tag.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_tag_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_tag_tbl_task_modallist', 'top' );
            }

            if ( tbl_task_modallist.f_content.length > 4000 )
            {
                errorMessageHansMap.put( 'detail_txt_f_content_tbl_task_modallist', '长度不能超过<a style="color:red">4000</a>' );
            }

            if ( tbl_task_modallist.f_file.length > 100 )
            {
                errorMessageHansMap.put( 'detail_file_f_file_tbl_task_modallist', '长度不能超过<a style="color:red">100</a>' );
            }






            if ( tbl_task_modallist.f_group.length > 4000 || tbl_task_modallist.f_groupid.length > 4000 )
            {
                errorMessageHansMap.put( 'div_detail_dropdown_f_group_tbl_task_modallist', '长度不能超过<a style="color:red">4000</a>' );
            }

            if ( tbl_task_modallist.f_status.length > 4000 || tbl_task_modallist.f_statusid.length > 4000 )
            {
                errorMessageHansMap.put( 'div_detail_dropdown_f_group_tbl_task_modallist', '长度不能超过<a style="color:red">4000</a>' );
            }



            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage_detail.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success( tbl_task_modallist );
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
    *  参数:tbl_task_modallist
    *  清空数据对象
    */
    clearDetailModel = function ( tbl_task_modallist )
    {





        tbl_task_modallist.f_value1 = '';
        controlObj.text( 'detail_txt_f_value1_tbl_task_modallist', tbl_task_modallist.f_value1 );




        tbl_task_modallist.f_value2 = '';
        controlObj.text( 'detail_txt_f_value2_tbl_task_modallist', tbl_task_modallist.f_value2 );




        tbl_task_modallist.f_value3 = '';
        controlObj.text( 'detail_txt_f_value3_tbl_task_modallist', tbl_task_modallist.f_value3 );




        tbl_task_modallist.f_value4 = '';
        controlObj.text( 'detail_txt_f_value4_tbl_task_modallist', tbl_task_modallist.f_value4 );




        tbl_task_modallist.f_value5 = '';
        controlObj.text( 'detail_txt_f_value5_tbl_task_modallist', tbl_task_modallist.f_value5 );




        tbl_task_modallist.f_value6 = '';
        controlObj.text( 'detail_txt_f_value6_tbl_task_modallist', tbl_task_modallist.f_value6 );




        tbl_task_modallist.f_value7 = '';
        controlObj.text( 'detail_txt_f_value7_tbl_task_modallist', tbl_task_modallist.f_value7 );




        tbl_task_modallist.f_value8 = '';
        controlObj.text( 'detail_txt_f_value8_tbl_task_modallist', tbl_task_modallist.f_value8 );




        tbl_task_modallist.f_value9 = '';
        controlObj.text( 'detail_txt_f_value9_tbl_task_modallist', tbl_task_modallist.f_value9 );




        tbl_task_modallist.f_value10 = '';
        controlObj.text( 'detail_txt_f_value10_tbl_task_modallist', tbl_task_modallist.f_value10 );




        tbl_task_modallist.f_tag = '';
        controlObj.text( 'detail_txt_f_tag_tbl_task_modallist', tbl_task_modallist.f_tag );




        tbl_task_modallist.f_content = '';
        controlObj.text( 'detail_txt_f_content_tbl_task_modallist', tbl_task_modallist.f_content );




        tbl_task_modallist.f_file = '';
        controlObj.text( 'detail_txt_f_file_tbl_task_modallist', tbl_task_modallist.f_file );



        tbl_task_modallist.f_startdate = ( '1900-01-01 00:00:00' );
        controlObj.datetime( 'detail_datetime_f_startdate_tbl_task_modallist_date', 'detail_datetime_f_startdate_tbl_task_modallist_time', tbl_task_modallist.f_startdate );



        tbl_task_modallist.f_edndate = ( '1900-01-01 00:00:00' );
        controlObj.datetime( 'detail_datetime_f_edndate_tbl_task_modallist_date', 'detail_datetime_f_edndate_tbl_task_modallist_time', tbl_task_modallist.f_edndate );



        tbl_task_modallist.f_groupid = '';
        //controlObj.multidropdownlistid( 'detail_dropdown_f_group_tbl_task_modallist', tbl_task_modallist.f_groupid );
        $( '#detail_dropdown_f_group_tbl_task_modallist' ).html( '' );


        tbl_task_modallist.f_statusid = '';
        controlObj.multidropdownlistid( 'detail_dropdown_f_status_tbl_task_modallist', tbl_task_modallist.f_statusid );




        tbl_task_modallist.f_comment = '';
        controlObj.text( 'detail_txt_f_comment_tbl_task_modallist', tbl_task_modallist.f_comment );


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
        var columnsString = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_tag^f_content^f_file^f_startdate^f_edndate^f_group^f_groupid^f_status^f_statusid^f_comment^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

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
    *  参数:tbl_task_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function ( tbl_task_modallist, callbackFunction )
    {
        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_tag^f_content^f_file^f_startdate^f_edndate^f_group^f_groupid^f_status^f_statusid^f_comment^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _sys_id,


            f_value1: tbl_task_modallist.f_value1,

            f_value2: tbl_task_modallist.f_value2,

            f_value3: tbl_task_modallist.f_value3,

            f_value4: tbl_task_modallist.f_value4,

            f_value5: tbl_task_modallist.f_value5,

            f_value6: tbl_task_modallist.f_value6,

            f_value7: tbl_task_modallist.f_value7,

            f_value8: tbl_task_modallist.f_value8,

            f_value9: tbl_task_modallist.f_value9,

            f_value10: tbl_task_modallist.f_value10,

            f_tag: tbl_task_modallist.f_tag,

            f_content: tbl_task_modallist.f_content.formatStringRN(),

            f_file: tbl_task_modallist.f_file,

            f_startdate: tbl_task_modallist.f_startdate,

            f_edndate: tbl_task_modallist.f_edndate,

            f_group: tbl_task_modallist.f_group,
            f_groupid: tbl_task_modallist.f_groupid,

            f_status: tbl_task_modallist.f_status,
            f_statusid: tbl_task_modallist.f_statusid,

            f_comment: tbl_task_modallist.f_comment,


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
                callbackFunction.success( tbl_task_modallist );
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
    *  方法:detail_file_f_file_onchange
    *  参数:
    * 
    */
    detail_file_f_file_onchange = function ()
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
                            html += '<div class="div_imgtorich" onclick="tbl_task_modallist_Obj.insertIntoContent(\'' + fileJson["fileuploadname"] + '\',\'' + fileJson["filerealname"] + '\',\'' + fileextname + '\')">';
                            html += fileJson["filerealname"];
                            html += '<img width="100" height="60" alt="' + fileJson["filerealname"] + '" src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileJson["fileuploadname"] + '"/>';
                            html += '</div><br/>';
                        }
                        else
                        {
                            html += '<div class="div_filetorich" onclick="tbl_task_modallist_Obj.insertIntoContent(\'' + fileJson["fileuploadname"] + '\',\'' + fileJson["filerealname"] + '\',\'' + fileextname + '\')">';
                            html += '<a>' + fileJson["filerealname"] + '</a>';
                            html += '</div><br/>';
                        }
                    } );


                    var $img = $( '#detail_imgs_tbl_task_modallist' );

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
    *  方法:detail_datetime_f_startdate_time_onchange
    *  参数:e
    * 
    */
    detail_datetime_f_startdate_time_onchange = function ( e )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '开始日期' + e.time.value;
        _resultMessage.message( cc );

    },

    /* 
    *  
    *  方法:detail_datetime_f_startdate_date_onchange
    *  参数:ev
    * 
    */
    detail_datetime_f_startdate_date_onchange = function ( ev )
    {
        var ddd = new Date( ev.date.valueOf() );

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '开始日期' + ddd.Format( 'yyyy-MM-dd' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:detail_datetime_f_edndate_time_onchange
    *  参数:e
    * 
    */
    detail_datetime_f_edndate_time_onchange = function ( e )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '结束日期' + e.time.value;
        _resultMessage.message( cc );

    },

    /* 
    *  
    *  方法:detail_datetime_f_edndate_date_onchange
    *  参数:ev
    * 
    */
    detail_datetime_f_edndate_date_onchange = function ( ev )
    {
        var ddd = new Date( ev.date.valueOf() );

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '结束日期' + ddd.Format( 'yyyy-MM-dd' );
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:detail_dropdown_f_group_onchange
    *  参数:changeEventParameter
    * 
    */
    detail_dropdown_f_group_onchange = function ( changeEventParameter )
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
            cc += '状态：0：发起，1：挂起，2：完结' + changeEventParameter.val;
        }
        else
        {
            cc += '状态：0：发起，1：挂起，2：完结' + '无变化';
        }
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:detail_txt_f_comment_onchange
    *  参数:contents, $editable
    * 
    */
    detail_txt_f_comment_onchange = function ( contents, $editable )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '描述' + contents;
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

                                                        _validateMessage_search = new validateMessage( 'btn_search_modal_search_tbl_task_modallist' );
                                                        _validateMessage_detail = new validateMessage( 'btn_detail_modal_save_tbl_task_modallist' );

                                                        _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_task_modallist' );
                                                        _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_task_modallist' );


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
                                                        break;
                                                    case "2":
                                                        setDisable( true );
                                                        break;
                                                }
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
                if ( whereClause == '' )
                {
                    whereClause = '1=1';
                }
                whereClause += " and sys_creatuserid = '" + basePageObj._userInfoJson.sys_userid + "'";
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_content^f_tag^f_startdate^f_edndate^f_group^f_status^f_statusid^sys_id';

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
                        $( '#table_grid_tbl_task_modallist' ).bootstrapTable( "loadJson", messageJson );
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
                f_file: controlObj.fileuploadernewfileid(),
                f_content: '新建任务',
                f_statusid: '0',
                f_status: '发起',
                f_startdate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
                f_edndate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
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
                        success: function ( tbl_task_modallist )
                        {
                            $( '#div_detail_modal_tbl_task_modallist' ).modal( 'show' );
                            bindDeitalModel( tbl_task_modallist, {
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
                var currentcount = $( '#table_grid_tbl_task_modallist' ).bootstrapTable( 'getSelections' ).length;
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
    *  方法:btn_command_clearselect_onclick
    *  参数:
    *  清空选择内容
    *  
    */
        btn_command_clearselect_onclick: function ()
        {
            $( '#table_grid_tbl_task_modallist' ).bootstrapTable( 'uncheckAll' );
            that._pr_gridselectids = '';
            gridSelectedChange();
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
                        controlObj.richtext( 'detail_txt_f_comment_tbl_task_modallist', '<br/><img src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '" style="position:static;max-width: 100%;"/>' + controlObj.richtext( 'detail_txt_f_comment_tbl_task_modallist' ) );
                    }
                    break;
                default:
                    {
                        controlObj.richtext( 'detail_txt_f_comment_tbl_task_modallist', '<br/><a href = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '">' + filerealname + '</a>' + controlObj.richtext( 'detail_txt_f_comment_tbl_task_modallist' ) );
                    }
                    break;
            }




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
            $( '#btn_command_search_tbl_task_modallist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_task_modallist' ).removeAttr( 'disabled' );
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
            $( '#btn_command_search_tbl_task_modallist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_task_modallist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_task_modallist' ).modal( 'show' );
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

                                    $( '#div_search_modal_tbl_task_modallist' ).modal( 'hide' )
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
            $( '#div_search_modal_tbl_task_modallist' ).modal( 'hide' );

            that._pr_searchtype = '1';
            $( '#btn_command_search_tbl_task_modallist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_task_modallist' ).removeAttr( 'disabled' );

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
            $( '#btn_command_search_tbl_task_modallist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_task_modallist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_task_modallist' ).modal( 'show' );
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
                success: function ( tbl_task_modallist )
                {
                    checkDetailModel( tbl_task_modallist, {
                        success: function ( tbl_task_modallist )
                        {

                            updateDetailData( tbl_task_modallist, {
                                success: function ( tbl_task_modallist )
                                {
                                    clearDetailModel( tbl_task_modallist );
                                    $( '#div_detail_modal_tbl_task_modallist' ).modal( 'hide' )
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
            $( '#div_detail_modal_tbl_task_modallist' ).modal( 'hide' );
            _validateMessage_detail.hidden();

        }
    };
    return that;
} )();



$( document ).ready( function ()
{
    tbl_task_modallist_Obj.init();
} );





