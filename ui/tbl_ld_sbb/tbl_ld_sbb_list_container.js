
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;
var tbl_ld_sbb_list_container_Obj = ( function ()
{
    'use strict';
    var start = function () { },
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
            that._pr_appcode = requestQuery( 'appcode' );
            that._pr_gridselectids = requestQuery( 'gridselectids' );
            that._pr_gridpageindex = requestQuery( 'gridpageIndex' );
            that._pr_searchtype = requestQuery( 'searchtype' );
            that._pr_searchcontent = requestQuery( 'searchcontent' );
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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

    end = function () { };

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
        _pr_appcode: '',

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

                                $( '#div_container_tbl_ld_sbb_list' ).load( '../tbl_ld_sbb/tbl_ld_sbb_list_part.html', null, function ()
                                {
                                    tbl_ld_sbb_list_Obj._pr_listtype = that._pr_listtype;
                                    tbl_ld_sbb_list_Obj.init( {
                                        success: function ()
                                        {
                                            $( '#div_container_tbl_ld_sbb_list' ).css( 'display', '' );
                                            $( '#div_loading_tbl_ld_sbb_list' ).css( 'display', 'none' );

                                            _blockMessage.hidden();
                                        }
                                    } );

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
        end: function ()
        {

        }
    };
    return that;
} )();



$( document ).ready( function ()
{
    tbl_ld_sbb_list_container_Obj.init();
} );






