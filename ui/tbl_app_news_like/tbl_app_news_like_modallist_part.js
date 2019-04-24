
var tbl_app_news_like_modallist_Obj = ( function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_news_like.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '10',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

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
            var gridHeight = 300;


            $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( {
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
                    visible: false,
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
			        field: 'f_userimg', title: '用户头像',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        visible: true,
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index )
			        {

			            var url = commonObj.getUserPhotoUrlByFileName( value );
			            return [
                           '<img src="' + url + '" style="max-width:50px;max-height:50px;" />'
			            ].join( '' );
			            //return value;
			        }
			    },

			    {
			        field: 'f_username', title: '用户名',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },



			    {
			        field: 'f_liketype', title: '赞或踩',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },

                {
                    field: 'sys_lasteditdate', title: '操作时间',
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

                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_news_like_modallist )
                                {
                                    bindDeitalModel( tbl_app_news_like_modallist, {
                                        success: function ()
                                        {
                                            $( '#div_detail_modal_tbl_app_news_like_modallist' ).modal( 'show' );
                                        }
                                    } );
                                }
                            } );

                        },
                        'click .edit': function ( e, value, row, index )
                        {
                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_news_like_modallist )
                                {
                                    bindDeitalModel( tbl_app_news_like_modallist, {
                                        success: function ()
                                        {
                                            $( '#div_detail_modal_tbl_app_news_like_modallist' ).modal( 'show' );
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
                    var rows = $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( 'getSelections' );
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
                    var rows = $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( 'getData' );
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

        controlObj.textdisable( 'detail_txt_fk_t_user_id_tbl_app_news_like_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_username_tbl_app_news_like_modallist', isDisable );
        controlObj.textdisable( 'detail_txt_f_userimg_tbl_app_news_like_modallist', isDisable );

        controlObj.singledropdownlistdisable( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist', isDisable );

        controlObj.datetimedisable( 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_date', 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_time', isDisable );


        if ( isDisable )
        {
            $( '#btn_detail_modal_save_tbl_app_news_like_modallist' ).addClass( 'hidden' );
            $( '#btn_command_new_tbl_app_news_like_modallist' ).addClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_news_like_modallist' ).addClass( 'hidden' );
        }
        else
        {
            $( '#btn_detail_modal_save_tbl_app_news_like_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_new_tbl_app_news_like_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_news_like_modallist' ).removeClass( 'hidden' );
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

        try
        {
            _baseCodeHashMap = new hashMap();

            _baseCodeHashMap.put( 'servicecode_001', [
                { id: '1', text: '赞' },
                { id: '2', text: '踩' },
            ] );

            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'initBaseCode执行失败。<br/>' + ex.message, 'fail' );
        }

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
            $( '#btn_command_clearselect_tbl_app_news_like_modallist' ).addClass( 'hidden' );

        }
        else
        {
            $( '#btn_command_clearselect_tbl_app_news_like_modallist' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_app_news_like_modallist .cc-badge-p' ).html( currentcount + '/' + allcount );
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
            var resultArray = _baseCodeHashMap.get( 'servicecode_001' );

            controlObj.singledropdownlistinit( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist', resultArray, detail_dropdown_f_liketype_onchange );
            //controlObj.fileuploaderinit( 'detail_file_f_userimg_tbl_app_news_like_modallist', { isMultiple: !1, fileUploadExtnames: ";.bmp;.jpg;.gif;.png;", fileUploadCountMax: 1, fileUploadRootPath: "//127.0.0.1/sara.dd.ldsw.file/files_auth/", isImgThumbnail: !0, isRealName: !0, thumbnailWidthHeight: "250*150" }, file_f_userimg_onchange );

            controlObj.datetimeinit( 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_date', 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_time', datetime_sys_lasteditdate_date_onchange, datetime_sys_lasteditdate_time_onchange );

            //模态窗口
            $( '#div_detail_modal_tbl_app_news_like_modallist' ).modal( {
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
    *  根据传入的tbl_app_news_like_modallist，绑定DetailModel
    */
    bindDeitalModel = function ( tbl_app_news_like_modallist, callBackFunction )
    {

        controlObj.text( 'detail_txt_f_value1_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value10 );

        controlObj.text( 'detail_txt_fk_t_user_id_tbl_app_news_like_modallist', tbl_app_news_like_modallist.fk_t_user_id );

        controlObj.text( 'detail_txt_f_username_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_username );

        controlObj.singledropdownlistid( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_liketypeid );

        //controlObj.fileuploaderbind('detail_file_f_userimg_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_userimg);


        controlObj.text( 'detail_txt_f_userimg_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_userimg );
        $( '#detail_img_f_userimg_tbl_app_news_like_modallist' )[0].src = commonObj.getUserPhotoUrlByFileName( tbl_app_news_like_modallist.f_userimg );

        controlObj.datetime( 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_date', 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_time', tbl_app_news_like_modallist.sys_lasteditdate );

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
            var tbl_app_news_like_modallist = new Object();

            tbl_app_news_like_modallist.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_app_news_like_modallist' );


            tbl_app_news_like_modallist.fk_t_user_id = controlObj.text( 'detail_txt_fk_t_user_id_tbl_app_news_like_modallist' );
            tbl_app_news_like_modallist.f_username = controlObj.text( 'detail_txt_f_username_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_userimg = controlObj.text( 'detail_txt_f_userimg_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.f_liketype = controlObj.singledropdownlist( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist' );
            tbl_app_news_like_modallist.f_liketypeid = controlObj.singledropdownlistid( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist' );

            tbl_app_news_like_modallist.sys_lasteditdate = controlObj.datetime( 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_date', 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_time' );

            callBackFunction.success( tbl_app_news_like_modallist );
        }
        catch ( ex )
        {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

             /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_app_news_like_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function ( tbl_app_news_like_modallist, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if ( tbl_app_news_like_modallist.f_value1.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value2.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value3.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value4.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value5.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value6.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value7.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value8.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value9.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_value10.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.f_username.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_username_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_username_tbl_app_news_like_modallist', 'top' );
            }


            if ( tbl_app_news_like_modallist.fk_t_user_id.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_fk_t_user_id_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_fk_t_user_id_tbl_app_news_like_modallist', 'top' );
            }

            if ( tbl_app_news_like_modallist.f_userimg.length > 100 )
            {
                errorMessageHansMap.put( 'detail_txt_f_userimg_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_userimg_tbl_app_news_like_modallist', 'top' );
            }

            if ( tbl_app_news_like_modallist.f_liketype.length > 100 || tbl_app_news_like_modallist.f_liketypeid.length > 100 )
            {
                errorMessageHansMap.put( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage_detail.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success( tbl_app_news_like_modallist );
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
    *  参数:tbl_app_news_like_modallist
    *  清空数据对象
    */
    clearDetailModel = function ( tbl_app_news_like_modallist )
    {





        tbl_app_news_like_modallist.f_value1 = '';
        controlObj.text( 'detail_txt_f_value1_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value1 );




        tbl_app_news_like_modallist.f_value2 = '';
        controlObj.text( 'detail_txt_f_value2_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value2 );




        tbl_app_news_like_modallist.f_value3 = '';
        controlObj.text( 'detail_txt_f_value3_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value3 );




        tbl_app_news_like_modallist.f_value4 = '';
        controlObj.text( 'detail_txt_f_value4_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value4 );




        tbl_app_news_like_modallist.f_value5 = '';
        controlObj.text( 'detail_txt_f_value5_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value5 );




        tbl_app_news_like_modallist.f_value6 = '';
        controlObj.text( 'detail_txt_f_value6_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value6 );




        tbl_app_news_like_modallist.f_value7 = '';
        controlObj.text( 'detail_txt_f_value7_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value7 );




        tbl_app_news_like_modallist.f_value8 = '';
        controlObj.text( 'detail_txt_f_value8_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value8 );




        tbl_app_news_like_modallist.f_value9 = '';
        controlObj.text( 'detail_txt_f_value9_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value9 );




        tbl_app_news_like_modallist.f_value10 = '';
        controlObj.text( 'detail_txt_f_value10_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_value10 );



        tbl_app_news_like_modallist.fk_t_user_id = '';
        controlObj.text( 'detail_txt_fk_t_user_id_tbl_app_news_like_modallist', tbl_app_news_like_modallist.fk_t_user_id );


        tbl_app_news_like_modallist.f_username = '';
        controlObj.text( 'detail_txt_f_username_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_username );


        //tbl_app_news_like_modallist.f_userimg = '';
        //controlObj.text('detail_txt_f_userimg_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_userimg);


        tbl_app_news_like_modallist.f_liketypeid = '';
        controlObj.singledropdownlistid( 'detail_dropdown_f_liketype_tbl_app_news_like_modallist', tbl_app_news_like_modallist.f_liketypeid );


        //tbl_app_news_like_modallist.sys_lasteditdate = Date.parse("1900-1-1");
        controlObj.datetime( 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_date', 'detail_datetime_sys_lasteditdate_tbl_app_news_like_modallist_time', tbl_app_news_like_modallist.sys_lasteditdate );

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
        var columnsString = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_t_user_id^f_username^f_userimg^f_liketype^f_liketypeid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

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
    *  参数:tbl_app_news_like_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function ( tbl_app_news_like_modallist, callbackFunction )
    {
        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_t_user_id^f_username^f_userimg^f_liketype^f_liketypeid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _sys_id,


            f_value1: tbl_app_news_like_modallist.f_value1,

            f_value2: tbl_app_news_like_modallist.f_value2,

            f_value3: tbl_app_news_like_modallist.f_value3,

            f_value4: tbl_app_news_like_modallist.f_value4,

            f_value5: tbl_app_news_like_modallist.f_value5,

            f_value6: tbl_app_news_like_modallist.f_value6,

            f_value7: tbl_app_news_like_modallist.f_value7,

            f_value8: tbl_app_news_like_modallist.f_value8,

            f_value9: tbl_app_news_like_modallist.f_value9,

            f_value10: tbl_app_news_like_modallist.f_value10,

            fk_t_user_id: tbl_app_news_like_modallist.fk_t_user_id,

            f_username: tbl_app_news_like_modallist.f_username,

            f_userimg: tbl_app_news_like_modallist.f_userimg,

            f_liketype: tbl_app_news_like_modallist.f_liketype,
            f_liketypeid: tbl_app_news_like_modallist.f_liketypeid,


            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: tbl_app_news_like_modallist.sys_lasteditdate//d.Format('yyyy-MM-dd hh:mm:ss')

        };


        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify( json )
        };
        doAjaxFunction( _serviceUrl, 'Update', data, {
            success: function ( message )
            {
                callbackFunction.success( tbl_app_news_like_modallist );
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
    *  方法:file_f_userimg_onchange
    *  参数:
    *  用户头像 onchange事件
    */
    file_f_userimg_onchange = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '文件全部上传完成';
        _resultMessage.message( cc );
    },

    /* 
    *  
    *  方法:datetime_f_releasedate_time_onchange
    *  参数:
    *  发布日期 onchange事件
    */
    datetime_sys_lasteditdate_time_onchange = function ( e )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '发布日期' + e.time.value;
        _resultMessage.message( cc );

    },
        /* 
    *  
    *  方法:datetime_f_releasedate_date_onchange
    *  参数:
    *  发布日期 onchange事件
    */
    datetime_sys_lasteditdate_date_onchange = function ( ev )
    {
        var ddd = new Date( ev.date.valueOf() );

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '发布日期' + ddd.Format( 'yyyy-MM-dd' );
        _resultMessage.message( cc );
    },
    /* 
    *  
    *  方法:detail_dropdown_f_liketype_onchange
    *  参数:changeEventParameter
    * 
    */
    detail_dropdown_f_liketype_onchange = function ( changeEventParameter )
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
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
            cc += '赞或踩' + changeEventParameter.val;
        }
        else
        {
            cc += '赞或踩' + '无变化';
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
        //新闻表的主键，此表的新闻外键
        _pr_tbl_app_news_sys_id: '',
        //评论表的主键，此表的评论外键
        _pr_tbl_app_news_discuss_sys_id: '',
        //用户ID，此表的USERID外键
        _pr_t_user_id: '',
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

                                                _validateMessage_search = new validateMessage( 'btn_search_modal_search_tbl_app_news_like_modallist' );
                                                _validateMessage_detail = new validateMessage( 'btn_detail_modal_save_tbl_app_news_like_modallist' );

                                                _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_app_news_like_modallist' );
                                                _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_app_news_like_modallist' );

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
                var whereClause = _whereClauseString;

                if ( whereClause != "" )
                {
                    whereClause += " and "
                }
                whereClause += " fk_tbl_app_news_sys_id='" + that._pr_tbl_app_news_sys_id + "' ";

                whereClause += " and fk_tbl_app_news_discuss_sys_id is null ";


                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^sys_lasteditdate^f_username^f_userimg^f_liketype^sys_id';

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
                        $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( "loadJson", messageJson );
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

                fk_tbl_app_news_sys_id: that._pr_tbl_app_news_sys_id,
                fk_tbl_app_news_discuss_sys_id: that._pr_tbl_app_news_discuss_sys_id,

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
                        success: function ( tbl_app_news_like_modallist )
                        {
                            $( '#div_detail_modal_tbl_app_news_like_modallist' ).modal( 'show' );
                            bindDeitalModel( tbl_app_news_like_modallist, {
                                success: function ()
                                {
                                    that.bindGrid();
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
                var currentcount = $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( 'getSelections' ).length;
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
            $( '#table_grid_tbl_app_news_like_modallist' ).bootstrapTable( 'uncheckAll' );
            that._pr_gridselectids = '';
            gridSelectedChange();
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
                success: function ( tbl_app_news_like_modallist )
                {
                    checkDetailModel( tbl_app_news_like_modallist, {
                        success: function ( tbl_app_news_like_modallist )
                        {

                            updateDetailData( tbl_app_news_like_modallist, {
                                success: function ( tbl_app_news_like_modallist )
                                {
                                    clearDetailModel( tbl_app_news_like_modallist );
                                    $( '#div_detail_modal_tbl_app_news_like_modallist' ).modal( 'hide' )
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
            $( '#div_detail_modal_tbl_app_news_like_modallist' ).modal( 'hide' );
            _validateMessage_detail.hidden();

        }
    };
    return that;
} )();



