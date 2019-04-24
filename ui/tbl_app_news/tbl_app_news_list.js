
var _pr_appcode = '';
var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_app_news_list_Obj = ( function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_news.asmx/',
    _serviceUrlUserGroup = "//127.0.0.1/sara.dd.ldsw/sara.platform.operation/auth/service/service_t_usergroup.asmx/",

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
            that._pr_searchtype = requestQuery( 'searchtype' );
            that._pr_searchcontent = requestQuery( 'searchcontent' );
            that._pr_newstype = requestQuery( 'newstype' );
            that._pr_newstypeactive = requestQuery( 'newstypeactive' );
            that._pr_titletypeactive = requestQuery( 'titletypeactive' );
            that._pr_contenttypeactive = requestQuery( 'contenttypeactive' );
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
                    $( '#btn_command_search_tbl_app_news_list' ).html( '简单查询' );
                    $( '#txt_command_search_tbl_app_news_list' ).removeAttr( "disabled" );

                    break;
                case "2":
                    $( '#btn_command_search_tbl_app_news_list' ).html( '高级查询' );
                    $( '#txt_command_search_tbl_app_news_list' ).attr( "disabled", true );
                    break;
            }


            if ( that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null' )
            {
                _blockMessage.show( 'listtype参数接收失败...', 'fail' );
            }
            else if ( that._pr_newstype == null || that._pr_newstype == '' || that._pr_newstype == 'null' )
            {
                _blockMessage.show( '_pr_newstype参数接收失败...', 'fail' );
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

            $( '#table_grid_tbl_app_news_list' ).bootstrapTable( {
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
                     field: 'sys_orderid', title: '序号',
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
			     formatter: function ( value, row, index )
			     {
			         if ( value.length > 20 )
			         {
			             return value.substr( 0, 20 ) + '...';
			         }
			         else
			         {
			             return value
			         }

			     }
			 },



			 {
			     field: 'f_titleresource', title: '标题资源',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_titletype', title: '标题类型',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_content', title: '内容',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     visible: false,
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value.substr( 0, 10 ) + "..."; }
			 },



			 {
			     field: 'f_contentresource', title: '内容资源',
			     visible: false,
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_contenttype', title: '内容类型',
			     "class": 'cc-hidden-sm  cc-hidden-xs',

			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_viewrange', title: '可见范围',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_discussrange', title: '评论范围',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_isdiscuss', title: '可否评论',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index )
			     {
			         var r = "";
			         switch ( value )
			         {
			             case "true":
			                 r = "是";
			                 break;
			             case "false":
			                 r = "否";
			                 break;
			         }
			         return r;
			     }
			 },



			 {
			     field: 'f_isviewdiscussrange', title: '限制评论可见范围',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     visible: false,
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_isrelease', title: '可否发布',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index )
			     {
			         var r = "";
			         switch ( value )
			         {
			             case "true":
			                 r = "是";
			                 break;
			             case "false":
			                 r = "否";
			                 break;
			         }
			         return r;
			     }
			 },


			{
			    field: 'f_releasedate', title: '发布日期',
			    "class": 'cc-hidden-sm  cc-hidden-xs',
			    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			    formatter: function ( value, row, index )
			    {
			        //如果日期为1900-1-1则默认显示为空
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
			     field: 'f_newstype', title: '新闻类型',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_tag', title: '标签',
			     "class": 'cc-hidden-sm  cc-hidden-xs',
			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
			     formatter: function ( value, row, index ) { return value; }
			 },



			 {
			     field: 'f_resume', title: '简述',
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

                    return {};
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
                    var rows = $( '#table_grid_tbl_app_news_list' ).bootstrapTable( 'getSelections' );
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
                    var rows = $( '#table_grid_tbl_app_news_list' ).bootstrapTable( 'getData' );
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
            $( '#btn_command_new_tbl_app_news_list' ).addClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_news_list' ).addClass( 'hidden' );
        }
        else
        {

            $( '#btn_command_new_tbl_app_news_list' ).removeClass( 'hidden' );
            $( '#btn_command_delete_tbl_app_news_list' ).removeClass( 'hidden' );
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

        var url = '../tbl_app_news/tbl_app_news_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + _pr_appcode;
        url += '&newstype=' + that._pr_newstype;
        url += '&newstypeactive=' + that._pr_newstypeactive;
        url += '&titletypeactive=' + that._pr_titletypeactive;
        url += '&contenttypeactive=' + that._pr_contenttypeactive;
        url += '&fromurl=../tbl_app_news/tbl_app_news_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + _pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
        url += '"newstype":"' + that._pr_newstype + '",';
        url += '"newstypeactive":"' + that._pr_newstypeactive + '",';
        url += '"titletypeactive":"' + that._pr_titletypeactive + '",';
        url += '"contenttypeactive":"' + that._pr_contenttypeactive + '",';
        url += '"searchtype":"' + that._pr_searchtype + '",';
        url += '"searchcontent":' + JSON.stringify( that._pr_searchcontent ) + '';
        url += '}';

        commonObj.changeUrl( url, 'right-show' );
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchBaseCode
    *  参数:callBackFunction
    *  初始化高级查询model用到Code内容，存储在_baseCodeHashMap中
    */
    initSearchBaseCode = function ( callBackFunction )
    {
        commonObj.getCodeServiceJson( that._pr_newstype, {
            success: function ( resultArray )
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    var array01 = [
                        { id: '1', text: '标题+简述+状态' },
                        { id: '2', text: '标题+N张小图并排+状态' },
                        { id: '3', text: '标题+N张大图滚动+图片描述+状态' },
                        { id: '4', text: '标题+简述+小图九宫+状态' },
                        { id: '5', text: '标题+1张小图在右侧+状态' },
                        { id: '6', text: '标题+1张小图在左侧+状态' },
                        { id: '7', text: '标题+1张大图-首页置顶用' },
                        { id: '8', text: '标题+1张小图-首页中部横向滚动用' },

                    ]
                    if ( that._pr_titletypeactive != '' )
                    {
                        var array010 = [];
                        var str = "^" + that._pr_titletypeactive + "^";
                        for ( var i = 0; i < array01.length; i++ )
                        {
                            if ( str.indexOf( "^" + array01[i]["id"] + "^" ) > -1 )
                            {
                                array010.push( array01[i] );
                            }
                        }
                        _baseCodeHashMap.put( 'servicecode_01', array010 );
                    }
                    else
                    {
                        _baseCodeHashMap.put( 'servicecode_01', array01 );
                    }

                    var array02 =  [
                        { id: '1', text: '图文混排' },
                        { id: '2', text: '大图+文字描述' },
                        { id: '3', text: '无' },
                        { id: '4', text: '指定程序' }
                    ]
                    if ( that._pr_contenttypeactive != '' )
                    {
                        var array020 = [];
                        var str = "^" + that._pr_contenttypeactive + "^";
                        for ( var i = 0; i < array02.length; i++ )
                        {
                            if ( str.indexOf( "^" + array02[i]["id"] + "^" ) > -1 )
                            {
                                array020.push( array02[i] );
                            }
                        }
                        _baseCodeHashMap.put( 'servicecode_02', array020 );
                    }
                    else
                    {
                        _baseCodeHashMap.put( 'servicecode_02', array02 );
                    }

                    _baseCodeHashMap.put( 'servicecode_sf', [
                        { id: 'true', text: '是' },
                        { id: 'false', text: '否' }
                    ] );


                    if ( that._pr_newstypeactive != "" )
                    {
                        var array = resultArray[that._pr_newstype];
                        var array1 = [];
                        var str = "^" + that._pr_newstypeactive + "^";
                        for ( var i = 0; i < array.length; i++ )
                        {
                            if ( str.indexOf( "^" + array[i]["id"] + "^" ) > -1 )
                            {
                                array1.push( array[i] );
                            }
                        }
                        _baseCodeHashMap.put( 'servicecode_newstype', array1 );
                    }
                    else
                    {
                        _baseCodeHashMap.put( 'servicecode_newstype', resultArray[that._pr_newstype] );
                    }

                    //获取用户组
                    var data = { whereString: " f_value1 = 'news'", orderByString: "g_id desc", columnsString: "g_name^g_id", pageSizeString: "", pageIndexString: "", clientInf: _clientInf };
                    doAjaxFunction( _serviceUrlUserGroup, 'GetList', data, {
                        success: function ( result )
                        {
                            try
                            {
                                var messageJsonObject = ( new Function( "", "return " + result ) )();

                                var resultArray = new Array();
                                for ( var i = 0; i < messageJsonObject.rows.length; i++ )
                                {
                                    var ob = new Object();
                                    ob.id = messageJsonObject.rows[i].g_id;
                                    ob.text = messageJsonObject.rows[i].g_name;
                                    resultArray.push( ob );

                                }

                                _baseCodeHashMap.put( 'servicecode_usergroup', resultArray );

                                //获取标签tag
                                var data = { clientInf: _clientInf };
                                doAjaxFunction( _serviceUrl, 'GetTags', data, {
                                    success: function ( result )
                                    {
                                        _baseCodeHashMap.put( 'servicecode_array', result.split( '^' ) );
                                        callBackFunction.success();
                                    }
                                } );


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
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化高级查询model控件，会用到_baseCodeHashMap
    */
    initSearchControl = function ( callBackFunction )
    {
        try
        {
            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get( 'servicecode_newstype' );
            var resultArray1 = _baseCodeHashMap.get( 'servicecode_01' );
            var resultArray2 = _baseCodeHashMap.get( 'servicecode_02' );
            var resultArrayusergroup = _baseCodeHashMap.get( 'servicecode_usergroup' );
            var resultArraysf = _baseCodeHashMap.get( 'servicecode_sf' )


            controlObj.multidropdownlistinit( 'search_dropdown_f_titletype_tbl_app_news_list', resultArray1 );

            controlObj.multidropdownlistinit( 'search_dropdown_f_contenttype_tbl_app_news_list', resultArray2 );

            controlObj.multidropdownlistinit( 'search_dropdown_f_viewrange_tbl_app_news_list', resultArrayusergroup );

            controlObj.multidropdownlistinit( 'search_dropdown_f_discussrange_tbl_app_news_list', resultArrayusergroup );

            controlObj.multidropdownlistinit( 'search_ck_f_isdiscuss_tbl_app_news_list', resultArraysf );

            controlObj.multidropdownlistinit( 'search_ck_f_isviewdiscussrange_tbl_app_news_list', resultArraysf );

            controlObj.multidropdownlistinit( 'search_ck_f_isrelease_tbl_app_news_list', resultArraysf );

            controlObj.datetimeinit( 'search_datetime_f_releasedate_tbl_app_news_list_datefrom', 'search_datetime_f_releasedate_tbl_app_news_list_timefrom' );
            controlObj.datetimeinit( 'search_datetime_f_releasedate_tbl_app_news_list_dateto', 'search_datetime_f_releasedate_tbl_app_news_list_timeto' );

            controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_datefrom', 'search_datetime_f_releasedate_tbl_app_news_list_timefrom', '1900-01-01 00:00:00' );
            controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_dateto', 'search_datetime_f_releasedate_tbl_app_news_list_timeto', '1900-01-01 00:00:00' );

            controlObj.multidropdownlistinit( 'search_dropdown_f_newstype_tbl_app_news_list', resultArray );

            //模态窗口
            $( '#div_search_modal_tbl_app_news_list' ).modal( {
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

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置查询model的内容
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
                        $( "#txt_command_search_tbl_app_news_list" ).val( that._pr_searchcontent.type1 );
                    }

                    break;
                case "2":
                    if ( that._pr_searchcontent.type2 != undefined )
                    {
                        //高级查询
                        var tbl_app_news_list = that._pr_searchcontent.type2;


                        controlObj.text( 'search_txt_f_value1_tbl_app_news_list', tbl_app_news_list.f_value1 );

                        controlObj.text( 'search_txt_f_value2_tbl_app_news_list', tbl_app_news_list.f_value2 );

                        controlObj.text( 'search_txt_f_value3_tbl_app_news_list', tbl_app_news_list.f_value3 );

                        controlObj.text( 'search_txt_f_value4_tbl_app_news_list', tbl_app_news_list.f_value4 );

                        controlObj.text( 'search_txt_f_value5_tbl_app_news_list', tbl_app_news_list.f_value5 );

                        controlObj.text( 'search_txt_f_value6_tbl_app_news_list', tbl_app_news_list.f_value6 );

                        controlObj.text( 'search_txt_f_value7_tbl_app_news_list', tbl_app_news_list.f_value7 );

                        controlObj.text( 'search_txt_f_value8_tbl_app_news_list', tbl_app_news_list.f_value8 );

                        controlObj.text( 'search_txt_f_value9_tbl_app_news_list', tbl_app_news_list.f_value9 );

                        controlObj.text( 'search_txt_f_value10_tbl_app_news_list', tbl_app_news_list.f_value10 );

                        controlObj.text( 'search_txt_f_title_tbl_app_news_list', tbl_app_news_list.f_title );

                        controlObj.text( 'search_txt_f_titleresource_tbl_app_news_list', tbl_app_news_list.f_titleresource );

                        controlObj.multidropdownlistid( 'search_dropdown_f_titletype_tbl_app_news_list', tbl_app_news_list.f_titletypeid );

                        controlObj.text( 'search_txt_f_content_tbl_app_news_list', tbl_app_news_list.f_content );

                        controlObj.text( 'search_txt_f_contentresource_tbl_app_news_list', tbl_app_news_list.f_contentresource );

                        controlObj.multidropdownlistid( 'search_dropdown_f_contenttype_tbl_app_news_list', tbl_app_news_list.f_contenttypeid );

                        controlObj.multidropdownlistid( 'search_dropdown_f_viewrange_tbl_app_news_list', tbl_app_news_list.f_viewrangeid );

                        controlObj.multidropdownlistid( 'search_dropdown_f_discussrange_tbl_app_news_list', tbl_app_news_list.f_discussrangeid );

                        controlObj.multidropdownlistid( 'search_ck_f_isdiscuss_tbl_app_news_list', tbl_app_news_list.f_isdiscuss );

                        controlObj.multidropdownlistid( 'search_ck_f_isviewdiscussrange_tbl_app_news_list', tbl_app_news_list.f_isviewdiscussrange );

                        controlObj.multidropdownlistid( 'search_ck_f_isrelease_tbl_app_news_list', tbl_app_news_list.f_isrelease );


                        controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_datefrom', 'search_datetime_f_releasedate_tbl_app_news_listtimefrom', tbl_app_news_list.f_releasedatefrom );
                        controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_dateto', 'search_datetime_f_releasedate_tbl_app_news_list_timeto', tbl_app_news_list.f_releasedateto );


                        controlObj.multidropdownlistid( 'search_dropdown_f_newstype_tbl_app_news_list', tbl_app_news_list.f_newstypeid );

                        controlObj.text( 'search_txt_f_tag_tbl_app_news_list', tbl_app_news_list.f_tag );

                        controlObj.text( 'search_txt_f_resume_tbl_app_news_list', tbl_app_news_list.f_resume );


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
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function ( callBackFunction )
    {
        try
        {
            switch ( that._pr_searchtype )
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $( "#txt_command_search_tbl_app_news_list" ).val();

                    break;
                case "2":

                    //高级查询
                    var tbl_app_news_list = new Object();



                    tbl_app_news_list.f_value1 = controlObj.text( 'search_txt_f_value1_tbl_app_news_list' );



                    tbl_app_news_list.f_value2 = controlObj.text( 'search_txt_f_value2_tbl_app_news_list' );



                    tbl_app_news_list.f_value3 = controlObj.text( 'search_txt_f_value3_tbl_app_news_list' );



                    tbl_app_news_list.f_value4 = controlObj.text( 'search_txt_f_value4_tbl_app_news_list' );



                    tbl_app_news_list.f_value5 = controlObj.text( 'search_txt_f_value5_tbl_app_news_list' );



                    tbl_app_news_list.f_value6 = controlObj.text( 'search_txt_f_value6_tbl_app_news_list' );



                    tbl_app_news_list.f_value7 = controlObj.text( 'search_txt_f_value7_tbl_app_news_list' );



                    tbl_app_news_list.f_value8 = controlObj.text( 'search_txt_f_value8_tbl_app_news_list' );



                    tbl_app_news_list.f_value9 = controlObj.text( 'search_txt_f_value9_tbl_app_news_list' );



                    tbl_app_news_list.f_value10 = controlObj.text( 'search_txt_f_value10_tbl_app_news_list' );



                    tbl_app_news_list.f_title = controlObj.text( 'search_txt_f_title_tbl_app_news_list' );



                    tbl_app_news_list.f_titleresource = controlObj.text( 'search_txt_f_titleresource_tbl_app_news_list' );


                    tbl_app_news_list.f_titletypeid = controlObj.multidropdownlistid( 'search_dropdown_f_titletype_tbl_app_news_list' );




                    tbl_app_news_list.f_content = controlObj.text( 'search_txt_f_content_tbl_app_news_list' );



                    tbl_app_news_list.f_contentresource = controlObj.text( 'search_txt_f_contentresource_tbl_app_news_list' );


                    tbl_app_news_list.f_contenttypeid = controlObj.multidropdownlistid( 'search_dropdown_f_contenttype_tbl_app_news_list' );



                    tbl_app_news_list.f_viewrangeid = controlObj.multidropdownlistid( 'search_dropdown_f_viewrange_tbl_app_news_list' );



                    tbl_app_news_list.f_discussrangeid = controlObj.multidropdownlistid( 'search_dropdown_f_discussrange_tbl_app_news_list' );



                    tbl_app_news_list.f_isdiscuss = controlObj.multidropdownlistid( 'search_ck_f_isdiscuss_tbl_app_news_list' );


                    tbl_app_news_list.f_isviewdiscussrange = controlObj.multidropdownlistid( 'search_ck_f_isviewdiscussrange_tbl_app_news_list' );


                    tbl_app_news_list.f_isrelease = controlObj.multidropdownlistid( 'search_ck_f_isrelease_tbl_app_news_list' );



                    tbl_app_news_list.f_releasedatefrom = controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_datefrom', 'search_datetime_f_releasedate_tbl_app_news_list_timefrom' ); // datefrom + ' ' + timefrom;
                    tbl_app_news_list.f_releasedateto = controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_dateto', 'search_datetime_f_releasedate_tbl_app_news_list_timeto' ); //dateto + ' ' + timeto;



                    tbl_app_news_list.f_newstypeid = controlObj.multidropdownlistid( 'search_dropdown_f_newstype_tbl_app_news_list' );



                    tbl_app_news_list.f_tag = controlObj.text( 'search_txt_f_tag_tbl_app_news_list' );



                    tbl_app_news_list.f_resume = controlObj.text( 'search_txt_f_resume_tbl_app_news_list' );


                    that._pr_searchcontent.type2 = tbl_app_news_list;
                    break;

            }

            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'getSearchModel执行失败。<br/>' + ex.message, 'fail' );
        }


    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  针对_pr_searchcontent.type2进行验证
    */
    checkSearchModel = function ( callBackFunction )
    {
        try
        {
            var tbl_app_news_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if ( tbl_app_news_list.f_value1.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value1_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value1_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value2.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value2_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value2_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value3.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value3_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value3_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value4.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value4_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value4_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value5.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value5_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value5_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value6.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value6_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value6_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value7.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value7_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value7_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value8.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value8_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value8_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value9.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value9_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value9_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_value10.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_value10_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_value10_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_title.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_title_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_title_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_titleresource.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_titleresource_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_titleresource_tbl_app_news_list', 'top' );
            }

            if ( tbl_app_news_list.f_titletypeid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_titletype_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_app_news_list.f_content.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_content_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_content_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_contentresource.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_contentresource_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_contentresource_tbl_app_news_list', 'top' );
            }

            if ( tbl_app_news_list.f_contenttypeid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_contenttype_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_app_news_list.f_viewrangeid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_viewrange_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_app_news_list.f_discussrangeid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_discussrange_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
            }

            if ( tbl_app_news_list.f_newstypeid.length > 100 )
            {
                errorMessageHansMap.put( 'search_dropdown_f_newstype_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
            }


            if ( tbl_app_news_list.f_tag.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_tag_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_tag_tbl_app_news_list', 'top' );
            }


            if ( tbl_app_news_list.f_resume.length > 100 )
            {

                errorMessageHansMap.put( 'search_txt_f_resume_tbl_app_news_list', '长度不能超过<a style="color:red">100</a>' );
                errorMessagePlacementHansMap.put( 'search_txt_f_resume_tbl_app_news_list', 'top' );
            }

            if ( errorMessageHansMap.keys().length > 0 )
            {
                _validateMessage.show( errorMessageHansMap, errorMessagePlacementHansMap, false );
                callBackFunction.fail();
            }
            else
            {
                _validateMessage.hidden();
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
    *  参数:callBackFunction
    *  清空_pr_searchtype和searchModel
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
                controlObj.text( 'search_txt_f_value1_tbl_app_news_list', that._pr_searchcontent.type2.f_value1 );


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text( 'search_txt_f_value2_tbl_app_news_list', that._pr_searchcontent.type2.f_value2 );


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text( 'search_txt_f_value3_tbl_app_news_list', that._pr_searchcontent.type2.f_value3 );


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text( 'search_txt_f_value4_tbl_app_news_list', that._pr_searchcontent.type2.f_value4 );


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text( 'search_txt_f_value5_tbl_app_news_list', that._pr_searchcontent.type2.f_value5 );


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text( 'search_txt_f_value6_tbl_app_news_list', that._pr_searchcontent.type2.f_value6 );


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text( 'search_txt_f_value7_tbl_app_news_list', that._pr_searchcontent.type2.f_value7 );


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text( 'search_txt_f_value8_tbl_app_news_list', that._pr_searchcontent.type2.f_value8 );


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text( 'search_txt_f_value9_tbl_app_news_list', that._pr_searchcontent.type2.f_value9 );


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text( 'search_txt_f_value10_tbl_app_news_list', that._pr_searchcontent.type2.f_value10 );


                that._pr_searchcontent.type2.f_title = '';
                controlObj.text( 'search_txt_f_title_tbl_app_news_list', that._pr_searchcontent.type2.f_title );


                that._pr_searchcontent.type2.f_titleresource = '';
                controlObj.text( 'search_txt_f_titleresource_tbl_app_news_list', that._pr_searchcontent.type2.f_titleresource );


                that._pr_searchcontent.type2.f_titletypeid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_titletype_tbl_app_news_list', that._pr_searchcontent.type2.f_titletypeid );


                that._pr_searchcontent.type2.f_content = '';
                controlObj.text( 'search_txt_f_content_tbl_app_news_list', that._pr_searchcontent.type2.f_content );


                that._pr_searchcontent.type2.f_contentresource = '';
                controlObj.text( 'search_txt_f_contentresource_tbl_app_news_list', that._pr_searchcontent.type2.f_contentresource );


                that._pr_searchcontent.type2.f_contenttypeid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_contenttype_tbl_app_news_list', that._pr_searchcontent.type2.f_contenttypeid );


                that._pr_searchcontent.type2.f_viewrangeid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_viewrange_tbl_app_news_list', that._pr_searchcontent.type2.f_viewrangeid );


                that._pr_searchcontent.type2.f_discussrangeid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_discussrange_tbl_app_news_list', that._pr_searchcontent.type2.f_discussrangeid );


                that._pr_searchcontent.type2.f_isdiscuss = '';
                controlObj.multidropdownlistid( 'search_ck_f_isdiscuss_tbl_app_news_list', that._pr_searchcontent.type2.f_isdiscuss );



                that._pr_searchcontent.type2.f_isviewdiscussrange = '';
                controlObj.multidropdownlistid( 'search_ck_f_isviewdiscussrange_tbl_app_news_list', that._pr_searchcontent.type2.f_isviewdiscussrange );



                that._pr_searchcontent.type2.f_isrelease = '';
                controlObj.multidropdownlistid( 'search_ck_f_isrelease_tbl_app_news_list', that._pr_searchcontent.type2.f_isrelease );



                that._pr_searchcontent.type2.f_releasedatefrom = ( '1900-01-01 00:00:00' );
                that._pr_searchcontent.type2.f_releasedateto = ( '1900-01-01 00:00:00' );

                controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_datefrom', 'search_datetime_f_releasedate_tbl_app_news_list_timefrom', that._pr_searchcontent.type2.f_releasedatefrom );
                controlObj.datetime( 'search_datetime_f_releasedate_tbl_app_news_list_dateto', 'search_datetime_f_releasedate_tbl_app_news_list_timeto', that._pr_searchcontent.type2.f_releasedateto );



                that._pr_searchcontent.type2.f_newstypeid = '';
                controlObj.multidropdownlistid( 'search_dropdown_f_newstype_tbl_app_news_list', that._pr_searchcontent.type2.f_newstypeid );


                that._pr_searchcontent.type2.f_tag = '';
                controlObj.text( 'search_txt_f_tag_tbl_app_news_list', that._pr_searchcontent.type2.f_tag );


                that._pr_searchcontent.type2.f_resume = '';
                controlObj.text( 'search_txt_f_resume_tbl_app_news_list', that._pr_searchcontent.type2.f_resume );


                break;
            case "2":
                if ( that._pr_searchcontent.type1 == undefined )
                {
                    that._pr_searchcontent.type1 = '';
                }

                $( "#txt_command_search_tbl_app_news_list" ).val( '' );
                break;
        }

    },

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

                                    whereClause += " f_titletype like '%" + vv[i] + "%' or ";

                                    whereClause += " f_content like '%" + vv[i] + "%' or ";

                                    whereClause += " f_contenttype like '%" + vv[i] + "%' or ";

                                    whereClause += " f_viewrange like '%" + vv[i] + "%' or ";

                                    whereClause += " f_discussrange like '%" + vv[i] + "%' or ";

                                    whereClause += " f_isdiscuss like '%" + vv[i] + "%' or ";

                                    whereClause += " f_isviewdiscussrange like '%" + vv[i] + "%' or ";

                                    whereClause += " f_isrelease like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_releasedate,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_newstype like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tag like '%" + vv[i] + "%' or ";

                                    whereClause += " f_resume like '%" + vv[i] + "%' or ";


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

                        var tbl_app_news_list = that._pr_searchcontent.type2;

                        if ( tbl_app_news_list.f_title.length > 0 )
                        {
                            whereClause += " f_title like '%" + tbl_app_news_list.f_title + "%' and ";
                        }

                        if ( tbl_app_news_list.f_titletypeid.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_titletypeid.split( ',' );
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
                                whereClause += "(('^'||f_titletypeid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }

                        if ( tbl_app_news_list.f_content.length > 0 )
                        {
                            whereClause += " f_content like '%" + tbl_app_news_list.f_content + "%' and ";
                        }

                        if ( tbl_app_news_list.f_contenttypeid.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_contenttypeid.split( ',' );
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
                                whereClause += "(('^'||f_contenttypeid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }

                        if ( tbl_app_news_list.f_viewrangeid.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_viewrangeid.split( ',' );
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
                                whereClause += "(('^'||f_viewrangeid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }

                        if ( tbl_app_news_list.f_discussrangeid.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_discussrangeid.split( ',' );
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
                                whereClause += "(('^'||f_discussrangeid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }


                        if ( tbl_app_news_list.f_isdiscuss.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_isdiscuss.split( ',' );
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
                                whereClause += "(('^'||f_isdiscuss||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }


                        if ( tbl_app_news_list.f_isviewdiscussrange.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_isviewdiscussrange.split( ',' );
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
                                whereClause += "(('^'||f_isviewdiscussrange||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }

                        if ( tbl_app_news_list.f_isrelease.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_isrelease.split( ',' );
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
                                whereClause += "(('^'||f_isrelease||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }


                        if ( tbl_app_news_list.f_releasedatefrom != '1900-01-01 00:00:00' )
                        {
                            whereClause += " f_releasedate >= to_date('" + tbl_app_news_list.f_releasedatefrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if ( tbl_app_news_list.f_releasedateto != '1900-01-01 00:00:00' )
                        {
                            whereClause += " f_releasedate <= to_date('" + tbl_app_news_list.f_releasedateto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if ( tbl_app_news_list.f_newstypeid.length > 0 )
                        {
                            var elementArray = tbl_app_news_list.f_newstypeid.split( ',' );
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
                                whereClause += "(('^'||f_newstypeid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            } );
                            whereClause += ') and ';
                        }



                        if ( tbl_app_news_list.f_tag.length > 0 )
                        {
                            whereClause += " f_tag like '%" + tbl_app_news_list.f_tag + "%' and ";
                        }


                        if ( tbl_app_news_list.f_resume.length > 0 )
                        {
                            whereClause += " f_resume like '%" + tbl_app_news_list.f_resume + "%' and ";
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
            $( '#btn_command_clearselect_tbl_app_news_list' ).addClass( 'hidden' );
        }
        else
        {
            $( '#btn_command_clearselect_tbl_app_news_list' ).removeClass( 'hidden' );
            var allcount = that._pr_gridselectids.split( '^' ).length;
            var currentcount = $( '#table_grid_tbl_app_news_list' ).bootstrapTable( 'getSelections' ).length;
            $( '#btn_command_clearselect_tbl_app_news_list .cc-badge-p' ).html( currentcount + '/' + allcount );
        }
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
        _pr_newstype: '',//新闻大类
        _pr_newstypeactive: '',//新闻大类中用户可见的小类的ID，用^分割
        _pr_titletypeactive:'',//标题类型中用户可见的小类ID，用^分割
        _pr_contenttypeactive: '',//内容类型中用户可见的小类ID，用^分割
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

                                                        _validateMessage = new validateMessage( 'btn_search_modal_search_tbl_app_news_list' );

                                                        _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_app_news_list' );
                                                        _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_app_news_list' );

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

                                //初始化search
                                initSearchBaseCode( {
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
                    whereClause += " and ";
                }
                whereClause += " f_newstypeid like '" + that._pr_newstype + "%'";
                if ( that._pr_newstypeactive != "" )
                {
                    whereClause += " and  '^'||'" + that._pr_newstypeactive + "'||'^' like '%^'||f_newstypeid||'^%'";
                }


                var orderByString = 'to_number(sys_orderid) desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_titleresource^f_titletype^f_contentresource^f_contenttype^f_viewrange^f_discussrange^f_isdiscuss^f_isrelease^f_releasedate^f_newstype^f_tag^f_resume^sys_id^sys_orderid';
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

                        $( '#table_grid_tbl_app_news_list' ).bootstrapTable( "loadJson", messageJson );

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



            //_pr_titletypeactive:'',//标题类型中用户可见的小类ID，用^分割
            //_pr_contenttypeactive: '',//内容类型中用户可见的小类ID，用^分割

            var f_titletypeid = '';
            if ( that._pr_titletypeactive != '' )
            {
                f_titletypeid = that._pr_titletypeactive.split( '^' )[0];
            }
            var f_contenttypeid = '';
            if ( that._pr_contenttypeactive != '' )
            {
                f_contenttypeid = that._pr_contenttypeactive.split( '^' )[0];
            }

            var codeJson = _baseCodeHashMap.get( 'servicecode_newstype' )[0];
            var newstype = codeJson["text"];
            var newstypeid = codeJson["id"];
            var json = {
                f_title: '新建【' + newstype + '】类型新闻标题',
                f_newstype: newstype,
                f_newstypeid: newstypeid,
                f_titletypeid: f_titletypeid,
                f_contenttypeid: f_contenttypeid,
                f_value2: 'true',
                f_value1: basePageObj._userInfoJson.sys_photourl,
                f_titleresource: controlObj.fileuploadernewfileid(),
                f_contentresource: controlObj.fileuploadernewfileid(),
                f_releasedate: d.Format( 'yyyy-MM-dd hh:mm:ss' ),
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
                var currentcount = $( '#table_grid_tbl_app_news_list' ).bootstrapTable( 'getSelections' ).length;
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
            $( '#table_grid_tbl_app_news_list' ).bootstrapTable( 'uncheckAll' );
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
        *  主要是响应“简单查询”按钮的事件
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
            $( '#btn_command_search_tbl_app_news_list' ).html( '简单查询' );
            $( '#txt_command_search_tbl_app_news_list' ).removeAttr( 'disabled' );
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
            $( '#btn_command_search_tbl_app_news_list' ).html( '高级查询' );
            $( '#txt_command_search_tbl_app_news_list' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_app_news_list' ).modal( 'show' );
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

                                    $( '#div_search_modal_tbl_app_news_list' ).modal( 'hide' )
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
            _validateMessage.hidden();
            $( '#div_search_modal_tbl_app_news_list' ).modal( 'hide' );

            that._pr_searchtype = '1';
            $( '#btn_command_search_tbl_app_news_list' ).html( '简单查询' );
            $( '#txt_command_search_tbl_app_news_list' ).removeAttr( 'disabled' );
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
            $( '#btn_command_search_tbl_app_news_list' ).html( '高级查询' );
            $( '#txt_command_search_tbl_app_news_list' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_app_news_list' ).modal( 'show' );
        }



    };
    return that;
} )();

$( document ).ready( function ()
{

    tbl_app_news_list_Obj.init();
} );



