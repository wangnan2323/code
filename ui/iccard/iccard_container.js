
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;
var iccard_container_Obj = ( function ()
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

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';


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

                                $( '#div_container_iccard' ).load( '../iccard/iccard_part.html', null, function ()
                                {
                                    iccard_part_Obj._pr_pagetype = that._pr_listtype;
                                    iccard_part_Obj.init( {
                                        success: function ( message )
                                        {
                                            $( '#div_container_iccard' ).css( 'display', '' );
                                            $( '#div_loading_iccard' ).css( 'display', 'none' );

                                            _blockMessage.hidden();

                                            if ( message == 'true' )
                                            {
                                                $( '#div_command_iccard_container' ).removeClass( 'hidden' );
                                            }
                                            else
                                            {
                                                $( '#div_command_iccard_container' ).addClass( 'hidden' );
                                            }

                                        },
                                        fail: function ( message )
                                        {
                                            _blockMessage.show( message, 'fail' );
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

        button_click: function ( command )
        {
            switch ( command )
            {
                case "port":

                    iccard_part_Obj.command( { "commandName": "port" }, {
                        success: function ( messageJson )
                        {
                            $( '#div_commandresult_iccard_container' ).html( messageJson.message );
                        }, fail: function ( message )
                        {
                        }
                    } );


                    break;
                case "read":
                    iccard_part_Obj.command( { "commandName": "read", "port": "3" }, {
                        success: function ( messageJson )
                        {

                            $( '#div_commandresult_iccard_container' ).html( messageJson.message );
                        }, fail: function ( message )
                        {
                        }
                    } );

                    break;
                case "write":
                    /// <summary>
                    ///
                    /// </summary>
                    /// <param name="port">读卡器所使用的串口号，从1开始。</param>
                    /// <param name="xklx">写卡操作类型 0普通卡1补卡，在DLL内部无实际用处。</param>
                    /// <param name="mcardno">卡号，最多8位，全数字格式。</param>
                    /// <param name="mgscs">购水次数，每次售水顺序递增即可。</param>
                    /// <param name="mbcgsl">本次购水量，最大99999。</param>
                    /// <param name="mCzmode">1：用户卡注册（在表上只能回读，不能充值，给后续写卡充值作准备）。2：开户充值：智能表裸表第1次购水或换表操作。3：续费充值：再次购水操作，各种补水操作也使用此命令。</param>
                    /// <param name="mljgl">累计购水量，最大值：999999</param>
                    /// <param name="Mediatype">介质类型，0->任意,1->冷水</param>
                    /// <returns>true:成功，其他：失败原因</returns>
                    /*
                    四、	在智能表上读卡出现充值失败故障后的处理办法：
a)	对于介质类型为0的表具，使用写卡函数将上次购水量重新写一次即可，同时保持累计购水量、购水次数、介质类型不变。
b)	对于介质类型为1的表具：
1.	若是第1次充值，且充值失败，则保持累计购水量、本次购水量、购水次数、介质类型不变，同时mCzmode=2（开户充值）即可。
2.	若不是第1次充值，则保持累计购水量、本次购水量、购水次数、介质类型不变，同时mCzmode=3（续费充值）即可。

                    */



                    iccard_part_Obj.command( { "commandName": "write", "port": "3", "xklx": "0", "mcardno": "22222222", "mgscs": "1", "mbcgsl": "22", "mCzmode": "1", "mljgl": "333", "Mediatype": "0" }, {
                        success: function ( messageJson )
                        {

                            $( '#div_commandresult_iccard_container' ).html( messageJson.message );
                        }, fail: function ( message )
                        {

                        }
                    } );

                    break;
                case "clear":
                    iccard_part_Obj.command({ "commandName": "clear", "port": "3" }, {
                        success: function ( messageJson )
                        {

                            $( '#div_commandresult_iccard_container' ).html( messageJson.message );
                        }, fail: function ( message )
                        {
                        }
                    } );

                    break;
                case "debug1":
                    iccard_part_Obj.command({ "commandName": "WriteWorkCard", "port": "3", "cardtype": "1" }, {
                        success: function (messageJson)
                        {

                            $('#div_commandresult_iccard_container').html(messageJson.message);
                        }, fail: function (message)
                        {
                        }
                    });

                    break;
                case "debug2":
                    iccard_part_Obj.command({ "commandName": "WriteWorkCard", "port": "3", "cardtype": "2" }, {
                        success: function (messageJson)
                        {

                            $('#div_commandresult_iccard_container').html(messageJson.message);
                        }, fail: function (message)
                        {
                        }
                    });

                    break;
                case "debug3":
                    iccard_part_Obj.command({ "commandName": "WriteWorkCard", "port": "3", "cardtype": "3" }, {
                        success: function (messageJson)
                        {

                            $('#div_commandresult_iccard_container').html(messageJson.message);
                        }, fail: function (message)
                        {
                        }
                    });

                    break;
                case "debug4":
                    iccard_part_Obj.command({ "commandName": "WriteWorkCard", "port": "3", "cardtype": "4" }, {
                        success: function (messageJson)
                        {

                            $('#div_commandresult_iccard_container').html(messageJson.message);
                        }, fail: function (message)
                        {
                        }
                    });

                    break;

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
    iccard_container_Obj.init();
} );






