
var tbl_app_version_html_modallist_Obj = ( function () {
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_version_html.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_scanall = null,
    _ladda_btn_command_scan = null,
        _ladda_btn_command_export_html = null,


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
    initParameter = function ( callBackFunction ) {
        try {
            if ( that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null' ) {
                that._pr_gridpageindex = 1;
            }
            else {
                that._pr_gridpageindex = Number( that._pr_gridpageindex );
            }

            if ( that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null' ) {
                that._pr_searchcontent = new Object();
            }
            else {
                that._pr_searchcontent = ( new Function( "", "return " + that._pr_searchcontent ) )();
            }

            if ( that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null' ) {
                that._pr_searchtype = '1';
            }

            switch ( that._pr_searchtype ) {
                case "1":
                    $( '#btn_command_search_tbl_app_version_html_modallist' ).html( '简单查询' );
                    $( '#txt_command_search_tbl_app_version_html_modallist' ).removeAttr( "disabled" );

                    break;
                case "2":
                    $( '#btn_command_search_tbl_app_version_html_modallist' ).html( '高级查询' );
                    $( '#txt_command_search_tbl_app_version_html_modallist' ).attr( "disabled", true );
                    break;
            }


            if ( that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null' ) {
                _blockMessage.show( 'listtype参数接收失败...', 'fail' );
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
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function ( callBackFunction ) {
        try {
            //根据页面情况设置Grid的高度
            var gridHeight = $( window ).height() - 400;
            

            $( '#table_grid_tbl_app_version_html_modallist' ).bootstrapTable( {
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
                    formatter: function ( value, row, index ) {
                        switch ( that._pr_listtype ) {
                            case "1":

                                if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + row.sys_id + '^' ) > -1 ) {
                                    return {
                                        disabled: false,
                                        checked: true
                                    }
                                }
                                return value;
                                break;
                            case "2":
                                if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + row.sys_id + '^' ) > -1 ) {
                                    return {
                                        disabled: true,
                                        checked: true
                                    }
                                }
                                else {
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
			        field: 'f_htmlname', title: 'html文件名称',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },


			    {
			        field: 'f_htmlversion', title: 'html版本',
			        "class": 'cc-hidden-sm  cc-hidden-xs',
			        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			        formatter: function ( value, row, index ) { return value; }
			    },




                {
                    field: '', title: '操作', "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function ( value, row, index ) {
                        switch ( that._pr_listtype ) {
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
                        'click .view': function ( e, value, row, index ) {

                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_version_html_modallist ) {
                                    bindDeitalModel( tbl_app_version_html_modallist, {
                                        success: function () {
                                            $( '#div_detail_modal_tbl_app_version_html_modallist' ).modal( 'show' );
                                        }
                                    } );
                                }
                            } );

                        },
                        'click .edit': function ( e, value, row, index ) {
                            _sys_id = row.sys_id;
                            getDetailData( {
                                success: function ( tbl_app_version_html_modallist ) {
                                    bindDeitalModel( tbl_app_version_html_modallist, {
                                        success: function () {
                                            $( '#div_detail_modal_tbl_app_version_html_modallist' ).modal( 'show' );
                                        }
                                    } );
                                }
                            } );
                        }
                    }
                }
                ],
                onPageChange: function ( size, number ) {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function ( row, index ) {
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function ( data ) {
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function ( row ) {
                    that._pr_gridselectids += '^' + row.sys_id;
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function ( row ) {
                    that._pr_gridselectids = ( '^' + that._pr_gridselectids + '^' ).replaceAll( '^' + row.sys_id + '^', '^' );
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function () {
                    var rows = $( '#table_grid_tbl_app_version_html_modallist' ).bootstrapTable( 'getSelections' );
                    $.each( rows, function ( i, u ) {
                        if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + rows[i].sys_id + '^' ) > -1 ) {

                        }
                        else {
                            that._pr_gridselectids += '^' + rows[i].sys_id;
                        }
                    } );
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheckAll: function () {
                    var rows = $( '#table_grid_tbl_app_version_html_modallist' ).bootstrapTable( 'getData' );
                    $.each( rows, function ( i, u ) {
                        if ( ( '^' + that._pr_gridselectids + '^' ).indexOf( '^' + rows[i].sys_id + '^' ) > -1 ) {
                            that._pr_gridselectids = ( '^' + that._pr_gridselectids + '^' ).replaceAll( '^' + rows[i].sys_id + '^', '^' );
                        }
                    } );

                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd( '^' );

                    gridSelectedChange();
                },
            } );

            callBackFunction.success();
        }
        catch ( ex ) {
            _blockMessage.show( 'initGrid执行失败<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDisable = function ( isDisable ) {


        controlObj.textdisable( 'detail_txt_f_htmlname_tbl_app_version_html_modallist', isDisable );

        controlObj.textdisable( 'detail_txt_f_htmlversion_tbl_app_version_html_modallist', isDisable );



        if ( isDisable ) {
            $( '#btn_detail_modal_save_tbl_app_version_html_modallist' ).addClass( 'hidden' );
            $( '#btn_command_scanall_tbl_app_version_html_modallist' ).addClass( 'hidden' );
            $( '#btn_command_scan_tbl_app_version_html_modallist' ).addClass( 'hidden' );

        }
        else {
            $( '#btn_detail_modal_save_tbl_app_version_html_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_scanall_tbl_app_version_html_modallist' ).removeClass( 'hidden' );
            $( '#btn_command_scan_tbl_app_version_html_modallist' ).removeClass( 'hidden' );

        }
    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function ( callBackFunction ) {
        commonObj.getCodeServiceJson( '0313', {
            success: function ( resultArray ) {
                try {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put( 'servicecode_0108', resultArray['0313'] );

                    _baseCodeHashMap.put( 'servicecode_array', ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] );

                    callBackFunction.success();
                }
                catch ( ex ) {
                    _blockMessage.show( 'initBaseCode执行失败。<br/>' + ex.message, 'fail' );
                }
            }
        } );

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
    initSearchControl = function ( callBackFunction ) {
        try {
            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get( 'servicecode_0108' );
            var toggleArray = [{ id: 'true', text: '开' }, { id: 'false', text: '关' }];



























            //模态窗口
            $( '#div_search_modal_tbl_app_version_html_modallist' ).modal( {
                keyboard: false,
                backdrop: 'static',
                show: false
            } );
            callBackFunction.success();
        }
        catch ( ex ) {
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
    setSearchModel = function ( callBackFunction ) {
        try {
            switch ( that._pr_searchtype ) {
                case "1":
                    if ( that._pr_searchcontent.type1 != undefined ) {
                        //简单查询
                        $( "#txt_command_search_tbl_app_version_html_modallist" ).val( that._pr_searchcontent.type1 );
                    }

                    break;
                case "2":
                    if ( that._pr_searchcontent.type2 != undefined ) {
                        //高级查询
                        var tbl_app_version_html_modallist = that._pr_searchcontent.type2;

                        controlObj.text( 'search_txt_f_value1_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value1 );

                        controlObj.text( 'search_txt_f_value2_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value2 );

                        controlObj.text( 'search_txt_f_value3_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value3 );

                        controlObj.text( 'search_txt_f_value4_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value4 );

                        controlObj.text( 'search_txt_f_value5_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value5 );

                        controlObj.text( 'search_txt_f_value6_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value6 );

                        controlObj.text( 'search_txt_f_value7_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value7 );

                        controlObj.text( 'search_txt_f_value8_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value8 );

                        controlObj.text( 'search_txt_f_value9_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value9 );

                        controlObj.text( 'search_txt_f_value10_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value10 );

                        controlObj.text( 'search_txt_f_htmlname_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_htmlname );

                        controlObj.text( 'search_txt_f_htmlversion_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_htmlversion );



                    }
                    break;
            }
            callBackFunction.success();
        }
        catch ( ex ) {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }

    },

    /* 
    *  
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取SearchModel的数据，存储到_pr_searchcontent
    */
    getSearchModel = function ( callBackFunction ) {
        try {
            switch ( that._pr_searchtype ) {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $( "#txt_command_search_tbl_app_version_html_modallist" ).val();
                    break;
                case "2":
                    var tbl_app_version_html_modallist = new Object();



                    tbl_app_version_html_modallist.f_value1 = controlObj.text( 'search_txt_f_value1_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value2 = controlObj.text( 'search_txt_f_value2_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value3 = controlObj.text( 'search_txt_f_value3_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value4 = controlObj.text( 'search_txt_f_value4_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value5 = controlObj.text( 'search_txt_f_value5_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value6 = controlObj.text( 'search_txt_f_value6_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value7 = controlObj.text( 'search_txt_f_value7_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value8 = controlObj.text( 'search_txt_f_value8_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value9 = controlObj.text( 'search_txt_f_value9_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_value10 = controlObj.text( 'search_txt_f_value10_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_htmlname = controlObj.text( 'search_txt_f_htmlname_tbl_app_version_html_modallist' );


                    tbl_app_version_html_modallist.f_htmlversion = controlObj.text( 'search_txt_f_htmlversion_tbl_app_version_html_modallist' );




                    that._pr_searchcontent.type2 = tbl_app_version_html_modallist;
                    break;
            }
            callBackFunction.success();
        }
        catch ( ex ) {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  对_pr_searchcontent的type2进行校验
    */
    checkSearchModel = function ( callBackFunction ) {
        try {
            var tbl_app_version_html_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();


            if ( tbl_app_version_html_modallist.f_value1.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value1_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value1_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value2.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value2_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value2_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value3.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value3_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value3_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value4.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value4_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value4_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value5.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value5_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value5_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value6.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value6_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value6_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value7.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value7_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value7_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value8.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value8_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value8_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value9.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value9_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value9_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value10.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_value10_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value10_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_htmlname.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_htmlname_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_htmlname_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_htmlversion.length > 100 ) {
                errorMessageHansMap.put( 'search_txt_f_htmlversion_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_htmlversion_tbl_app_version_html_modallist', 'top' );
            }




            if ( errorMessageHansMap.keys().length > 0 ) {
                _validateMessage_search.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else {
                _validateMessage_search.hidden();
                callBackFunction.success();
            }
        }
        catch ( ex ) {
            _blockMessage.show( 'checkSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }

    },

    /* 
    *  
    *  方法:clearSearchModel
    *  参数:
    *  清空SearchMode的数据,当切换查询模式时触发，切换成简单查询模式时清空高级查询内容，反之亦然
    */
    clearSearchModel = function () {
        switch ( that._pr_searchtype ) {
            case "1":
                if ( that._pr_searchcontent.type2 == undefined ) {
                    that._pr_searchcontent.type2 = new Object();
                }

                that._pr_searchcontent.type2.f_value1 = '';
                controlObj.text( 'search_txt_f_value1_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value1 );

                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text( 'search_txt_f_value2_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value2 );

                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text( 'search_txt_f_value3_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value3 );

                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text( 'search_txt_f_value4_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value4 );

                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text( 'search_txt_f_value5_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value5 );

                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text( 'search_txt_f_value6_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value6 );

                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text( 'search_txt_f_value7_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value7 );

                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text( 'search_txt_f_value8_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value8 );

                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text( 'search_txt_f_value9_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value9 );

                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text( 'search_txt_f_value10_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_value10 );

                that._pr_searchcontent.type2.f_htmlname = '';
                controlObj.text( 'search_txt_f_htmlname_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_htmlname );

                that._pr_searchcontent.type2.f_htmlversion = '';
                controlObj.text( 'search_txt_f_htmlversion_tbl_app_version_html_modallist', that._pr_searchcontent.type2.f_htmlversion );



                break;
            case "2":
                if ( that._pr_searchcontent.type1 == undefined ) {
                    that._pr_searchcontent.type1 = '';
                }

                $( "#txt_command_search_tbl_app_version_html_modallist" ).val( '' );
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
    creatWhereClause = function ( callBackFunction ) {

        var whereClause = '';
        switch ( that._pr_searchtype ) {
            case "1":
                {

                    if ( that._pr_searchcontent.type1 != undefined ) {
                        var vv = that._pr_searchcontent.type1.split( ' ' );
                        if ( vv.length > 0 ) {
                            for ( var i = 0; i < vv.length; i++ ) {
                                if ( vv[i] != '' ) {
                                    whereClause += "(";


                                    whereClause += " f_htmlname like '%" + vv[i] + "%' or ";

                                    whereClause += " f_htmlversion like '%" + vv[i] + "%' or ";




                                    if ( whereClause.length > 0 ) {
                                        whereClause = whereClause.substr( 0, whereClause.length - 3 );
                                    }
                                    whereClause += ") and ";
                                }
                            }
                            if ( whereClause.length > 0 ) {
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
                    if ( that._pr_searchcontent.type2 != undefined ) {

                        var tbl_app_version_html_modallist = that._pr_searchcontent.type2;


                        if ( tbl_app_version_html_modallist.f_htmlname.length > 0 ) {
                            whereClause += " f_htmlname like '%" + tbl_app_version_html_modallist.f_htmlname + "%' and ";
                        }


                        if ( tbl_app_version_html_modallist.f_htmlversion.length > 0 ) {
                            whereClause += " f_htmlversion like '%" + tbl_app_version_html_modallist.f_htmlversion + "%' and ";
                        }




                        if ( whereClause.length > 0 ) {
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
    gridSelectedChange = function () {
        if ( that._pr_gridselectids == '' ) {
            // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
            $( '#btn_command_clearselect_tbl_app_version_html_modallist' ).addClass( 'hidden' );

        }
        else {
            $( '#btn_command_clearselect_tbl_app_version_html_modallist' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_app_version_html_modallist' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_app_version_html_modallist .cc-badge-p' ).html( currentcount + '/' + allcount );
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
    initDetailControl = function ( callBackFunction ) {
        try {
            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get( 'servicecode_0108' );
            var toggleArray = [{ id: 'true', text: '开' }, { id: 'false', text: '关' }];
            var contentArray = _baseCodeHashMap.get( 'servicecode_array' );





























            //模态窗口
            $( '#div_detail_modal_tbl_app_version_html_modallist' ).modal( {
                keyboard: false,
                backdrop: 'static',
                show: false
            } );

            callBackFunction.success();
        }
        catch ( ex ) {
            _blockMessage.show( 'initDetailControl执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:bindDeitalModel
    *  参数:callBackFunction
    *  根据传入的tbl_app_version_html_modallist，绑定DetailModel
    */
    bindDeitalModel = function ( tbl_app_version_html_modallist, callBackFunction ) {

        controlObj.text( 'detail_txt_f_value1_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value1 );

        controlObj.text( 'detail_txt_f_value2_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value2 );

        controlObj.text( 'detail_txt_f_value3_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value3 );

        controlObj.text( 'detail_txt_f_value4_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value4 );

        controlObj.text( 'detail_txt_f_value5_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value5 );

        controlObj.text( 'detail_txt_f_value6_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value6 );

        controlObj.text( 'detail_txt_f_value7_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value7 );

        controlObj.text( 'detail_txt_f_value8_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value8 );

        controlObj.text( 'detail_txt_f_value9_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value9 );

        controlObj.text( 'detail_txt_f_value10_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value10 );

        controlObj.text( 'detail_txt_f_htmlname_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_htmlname );

        controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_htmlversion );



        callBackFunction.success();
    },
    /* 
    *  
    *  方法:getDetailModel
    *  参数:callBackFunction
    *  获取DetailMode的数据对象，返回数据对象
    */
    getDetailModel = function ( callBackFunction ) {
        try {
            //高级查询
            var tbl_app_version_html_modallist = new Object();

            tbl_app_version_html_modallist.f_value1 = controlObj.text( 'detail_txt_f_value1_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value2 = controlObj.text( 'detail_txt_f_value2_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value3 = controlObj.text( 'detail_txt_f_value3_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value4 = controlObj.text( 'detail_txt_f_value4_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value5 = controlObj.text( 'detail_txt_f_value5_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value6 = controlObj.text( 'detail_txt_f_value6_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value7 = controlObj.text( 'detail_txt_f_value7_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value8 = controlObj.text( 'detail_txt_f_value8_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value9 = controlObj.text( 'detail_txt_f_value9_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_value10 = controlObj.text( 'detail_txt_f_value10_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_htmlname = controlObj.text( 'detail_txt_f_htmlname_tbl_app_version_html_modallist' );

            tbl_app_version_html_modallist.f_htmlversion = controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_html_modallist' );



            callBackFunction.success( tbl_app_version_html_modallist );
        }
        catch ( ex ) {
            _blockMessage.show( 'setSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_app_version_html_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function ( tbl_app_version_html_modallist, callBackFunction ) {
        try {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if ( tbl_app_version_html_modallist.f_value1.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value1_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value1_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value2.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value2_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value2_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value3.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value3_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value3_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value4.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value4_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value4_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value5.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value5_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value5_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value6.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value6_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value6_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value7.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value7_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value7_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value8.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value8_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value8_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value9.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value9_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value9_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_value10.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_value10_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_value10_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_htmlname.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_htmlname_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_htmlname_tbl_app_version_html_modallist', 'top' );
            }


            if ( tbl_app_version_html_modallist.f_htmlversion.length > 100 ) {
                errorMessageHansMap.put( 'detail_txt_f_htmlversion_tbl_app_version_html_modallist', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'detail_txt_f_htmlversion_tbl_app_version_html_modallist', 'top' );
            }



            if ( errorMessageHansMap.keys().length > 0 ) {
                _validateMessage_detail.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else {
                _validateMessage_detail.hidden();
                callBackFunction.success( tbl_app_version_html_modallist );
            }
        }
        catch ( ex ) {
            _blockMessage.show( 'checkDetailModel执行失败。<br/>' + ex.message, 'fail' );
        }
    },

    /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_app_version_html_modallist
    *  清空数据对象
    */
    clearDetailModel = function ( tbl_app_version_html_modallist ) {





        tbl_app_version_html_modallist.f_value1 = '';
        controlObj.text( 'detail_txt_f_value1_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value1 );




        tbl_app_version_html_modallist.f_value2 = '';
        controlObj.text( 'detail_txt_f_value2_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value2 );




        tbl_app_version_html_modallist.f_value3 = '';
        controlObj.text( 'detail_txt_f_value3_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value3 );




        tbl_app_version_html_modallist.f_value4 = '';
        controlObj.text( 'detail_txt_f_value4_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value4 );




        tbl_app_version_html_modallist.f_value5 = '';
        controlObj.text( 'detail_txt_f_value5_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value5 );




        tbl_app_version_html_modallist.f_value6 = '';
        controlObj.text( 'detail_txt_f_value6_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value6 );




        tbl_app_version_html_modallist.f_value7 = '';
        controlObj.text( 'detail_txt_f_value7_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value7 );




        tbl_app_version_html_modallist.f_value8 = '';
        controlObj.text( 'detail_txt_f_value8_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value8 );




        tbl_app_version_html_modallist.f_value9 = '';
        controlObj.text( 'detail_txt_f_value9_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value9 );




        tbl_app_version_html_modallist.f_value10 = '';
        controlObj.text( 'detail_txt_f_value10_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_value10 );




        tbl_app_version_html_modallist.f_htmlname = '';
        controlObj.text( 'detail_txt_f_htmlname_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_htmlname );




        tbl_app_version_html_modallist.f_htmlversion = '';
        controlObj.text( 'detail_txt_f_htmlversion_tbl_app_version_html_modallist', tbl_app_version_html_modallist.f_htmlversion );







    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据_pr_sys_id ，返回数据对象
    */
    getDetailData = function ( callBackFunction ) {

        var whereClause = ' sys_id = \'' + _sys_id + '\'';
        var orderByString = ' sys_id desc';
        var columnsString = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_htmlname^f_htmlversion^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: '',
            pageIndexString: '',
            clientInf: _clientInf
        };
        doAjaxFunction( _serviceUrl, 'GetList', data, {
            success: function ( result ) {
                try {
                    var messageJson = ( new Function( "", "return " + result ) )();

                    callBackFunction.success( messageJson.rows[0] );
                }
                catch ( ex ) {
                    _blockMessage.show( 'getDetailData执行失败。<br/>' + ex.message, 'fail' );
                }
            },
            fail: function ( message ) {
                _blockMessage.show( 'getDetailData执行失败<br/>' + message, 'fail' );
            }
        } );


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_app_version_html_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function ( tbl_app_version_html_modallist, callbackFunction ) {
        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_htmlname^f_htmlversion^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _sys_id,


            f_value1: tbl_app_version_html_modallist.f_value1,

            f_value2: tbl_app_version_html_modallist.f_value2,

            f_value3: tbl_app_version_html_modallist.f_value3,

            f_value4: tbl_app_version_html_modallist.f_value4,

            f_value5: tbl_app_version_html_modallist.f_value5,

            f_value6: tbl_app_version_html_modallist.f_value6,

            f_value7: tbl_app_version_html_modallist.f_value7,

            f_value8: tbl_app_version_html_modallist.f_value8,

            f_value9: tbl_app_version_html_modallist.f_value9,

            f_value10: tbl_app_version_html_modallist.f_value10,

            f_htmlname: tbl_app_version_html_modallist.f_htmlname,

            f_htmlversion: tbl_app_version_html_modallist.f_htmlversion,



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
                callbackFunction.success( tbl_app_version_html_modallist );
            },
            fail: function ( message ) {
                callbackFunction.fail( message );
            },
            error: function ( message ) {
                _blockMessage.show( _serviceUrl + 'Update<br/>' + message, 'fail' );
            }
        } );
    }

    //=============================控件事件===================================
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

        init: function ( callBackFunction ) {
            try {
                //初始化参数
                initParameter( {
                    success: function () {
                        creatWhereClause( {
                            success: function () {
                                initGrid( {
                                    success: function () {
                                        that.bindGrid( {
                                            success: function () {

                                                _validateMessage_search = new validateMessage( 'btn_search_modal_search_tbl_app_version_html_modallist' );
                                                _validateMessage_detail = new validateMessage( 'btn_detail_modal_save_tbl_app_version_html_modallist' );

                                                _ladda_btn_command_scanall = Ladda.create( 'btn_command_scanall_tbl_app_version_html_modallist' );
                                                _ladda_btn_command_scan = Ladda.create( 'btn_command_scan_tbl_app_version_html_modallist' );
                                                _ladda_btn_command_export_html = Ladda.create( 'btn_command_export_tbl_app_version_html_modallist' );


                                                callBackFunction.success();
                                            }
                                        } );



                                    }
                                } );

                            }
                        } );


                        initBaseCode( {
                            success: function () {
                                initSearchControl( {
                                    success: function () {
                                        setSearchModel( {
                                            success: function () {


                                            }
                                        } );
                                    }
                                } );

                                initDetailControl( {
                                    success: function () {
                                        switch ( that._pr_listtype ) {
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
                    fail: function ( message ) {
                        _blockMessage.show( message, 'fail' );
                    }
                } );
            }
            catch ( ex ) {
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
        bindGrid: function ( callBackFunction ) {
            setTimeout( function () {
                var whereClause = _whereClauseString;
                var orderByString = ' f_htmlname asc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_htmlname^f_htmlversion^sys_id';

                var data = {
                    whereString: whereClause,
                    orderByString: orderByString,
                    columnsString: columnsString,
                    pageSizeString: _pageSize,
                    pageIndexString: that._pr_gridpageindex,
                    clientInf: _clientInf
                };
                doAjaxFunction( _serviceUrl, 'GetList', data, {
                    success: function ( result ) {
                        var messageJson = ( new Function( "", "return " + result ) )();
                        $( '#table_grid_tbl_app_version_html_modallist' ).bootstrapTable( "loadJson", messageJson );
                        gridSelectedChange();
                        if ( callBackFunction != undefined && callBackFunction != null ) {
                            callBackFunction.success();
                        }
                    },
                    fail: function ( message ) {
                        _blockMessage.show( 'that.bindGrid执行失败<br/>' + message, 'fail' );
                    }
                } );
            }, 0 );
        },


        /* 
        *  
        *  方法:btn_command_scanall_onclick
        *  参数:
        *  
        */
        btn_command_scanall_onclick: function () {
            _ladda_btn_command_scanall.start();

            var data = {
                clientInf: _clientInf
            };
            doAjaxFunction( _serviceUrl, 'ScanAllhtml', data, {
                success: function ( result ) {
                    _ladda_btn_command_scanall.stop();
                    that.bindGrid();

                },
                fail: function (message) {
                    //console.log(message);
                    _alertMessage.show( '扫描全部文件<br/>' + message, 'fail' );
                    _ladda_btn_command_scanall.stop();
                }
            } );
        },
        /* 
*  
*  方法:btn_command_scan_onclick
*  参数:
*/
        btn_command_scan_onclick: function () {

            var allcount = that._pr_gridselectids.split( '^' ).length;

            if ( that._pr_gridselectids == '' ) {
                _alertMessage.show( '至少选择一条数据!', 'warning', 1000 );
            }
            else {

                _ladda_btn_command_scan.start();

                var data = {
                    htmlIds: that._pr_gridselectids,
                    clientInf: _clientInf
                };
                doAjaxFunction( _serviceUrl, 'Scanhtml', data, {
                    success: function ( result ) {
                        _ladda_btn_command_scan.stop();
                        that.bindGrid();

                    },
                    fail: function ( message ) {
                        _alertMessage.show( '扫描文件失败<br/>' + message, 'fail' );
                        _ladda_btn_command_scan.stop();
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
        btn_command_clearselect_onclick: function () {
            $( '#table_grid_tbl_app_version_html_modallist' ).bootstrapTable( 'uncheckAll' );
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
        btn_command_search_onclick: function () {
            try {
                switch ( that._pr_searchtype ) {
                    case "1":
                        getSearchModel( {
                            success: function () {
                                creatWhereClause( {
                                    success: function () {
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
            catch ( ex ) {
                _alertMessage.show( '查询失败<br/>' + ex.message, 'fail' );
            }


        },

        /* 
        *  
        *  方法:btn_command_search_1_onclick
        *  参数:
        *  简单查询模式
        */
        btn_command_search_1_onclick: function () {
            that._pr_searchtype = '1';
            $( '#btn_command_search_tbl_app_version_html_modallist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_app_version_html_modallist' ).removeAttr( 'disabled' );
        },

        /* 
        *  
        *  方法:btn_command_search_2_onclick
        *  参数:
        *  高级查询模式
        */
        btn_command_search_2_onclick: function () {

            that._pr_searchtype = '2';
            $( '#btn_command_search_tbl_app_version_html_modallist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_app_version_html_modallist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_app_version_html_modallist' ).modal( 'show' );
        },

        /* 
        *  
        *  方法:btn_search_modal_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“高级查询”按钮的事件
        */
        btn_search_modal_search_onclick: function () {
            getSearchModel( {
                success: function () {

                    checkSearchModel( {
                        success: function () {
                            creatWhereClause( {
                                success: function () {

                                    clearSearchModel();

                                    $( '#div_search_modal_tbl_app_version_html_modallist' ).modal( 'hide' )
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            } );
                        },
                        fail: function () {
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
        btn_search_modal_cancle_onclick: function () {
            _validateMessage_search.hidden();
            $( '#div_search_modal_tbl_app_version_html_modallist' ).modal( 'hide' );

            that._pr_searchtype = '1';
            $( '#btn_command_search_tbl_app_version_html_modallist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_app_version_html_modallist' ).removeAttr( 'disabled' );

        },

        /* 
        *  
        *  方法:btn_command_search_xs_onclick
        *  参数:
        *  小屏幕模式下打开高级查询模式
        *  
        */
        btn_command_search_xs_onclick: function () {
            that._pr_searchtype = '2';
            $( '#btn_command_search_tbl_app_version_html_modallist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_app_version_html_modallist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_app_version_html_modallist' ).modal( 'show' );
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
        btn_detail_modal_save_onclick: function () {
            getDetailModel( {
                success: function ( tbl_app_version_html_modallist ) {
                    checkDetailModel( tbl_app_version_html_modallist, {
                        success: function ( tbl_app_version_html_modallist ) {

                            updateDetailData( tbl_app_version_html_modallist, {
                                success: function ( tbl_app_version_html_modallist ) {
                                    clearDetailModel( tbl_app_version_html_modallist );
                                    $( '#div_detail_modal_tbl_app_version_html_modallist' ).modal( 'hide' )
                                    that.bindGrid();
                                },
                                fail: function ( message ) {
                                    _alertMessage.show( '数据更新失败<br/>' + message, 'fail' );
                                }
                            } );

                        },
                        fail: function () {
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
        btn_detail_modal_cancle_onclick: function () {
            $( '#div_detail_modal_tbl_app_version_html_modallist' ).modal( 'hide' );
            _validateMessage_detail.hidden();

        },

        btn_command_export_html_onclick: function () {
            _ladda_btn_command_export_html.start();

            var data = {              
                clientInf: _clientInf
            };

            doAjaxFunction( _serviceUrl, 'Export', data, {
                success: function ( result ) {

                    _ladda_btn_command_export_html.stop();
                    $( '#download_html' ).html( '下载' )
                    $( '#download_html' ).attr( 'href', result + "?" + Math.random() * 10000 );

                },
                fail: function ( message ) {

                    _alertMessage.show( '文件创建失败<br/>' + message, 'fail' );
                    _ladda_btn_command_export_html.stop();
                }
            } );
        }
    };
    return that;
} )();



