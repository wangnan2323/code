

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_expjhts_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_expjhts.asmx/',
        _exportJHTSRootPath = '//127.0.0.1/sara.dd.ldsw.file/files_exportjhts/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_exp = null,
    _ladda_btn_command_rollback = null,

    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function (callBackFunction)
    {
        try
        {
            that._pr_fromurl = requestQuery('fromurl');
            that._pr_fromurlparam = requestQuery('fromurlparam');
            that._pr_sys_id = requestQuery('sys_id');
            that._pr_pagetype = requestQuery('pagetype');
            that._pr_appcode = requestQuery('appcode');
            that._pr_isadmin = requestQuery('isadmin');

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';
            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '1';
            }

            if (that._pr_sys_id == null || that._pr_sys_id == '')
            {
                _blockMessage.show('_pr_sys_id参数接收失败', 'fail');
            }
            else if (that._pr_pagetype == null || that._pr_pagetype == '')
            {
                _blockMessage.show('_pr_pagetype参数接收失败...', 'fail');
            }
            else
            {
                callBackFunction.success();
            }
        }
        catch (ex)
        {
            _blockMessage.show('initParameter执行失败<br/>' + ex.message, 'fail');

        }

    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callbackFunction
    *  初始化code内容，存储在_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {
        var codeServiceId = '';
        codeServiceId += "0809^";


        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0809', resultArray['0809']);


                    callBackFunction.success();
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败<br/>' + ex.message, 'fail');
                }
            }
        });

    },

    /* 
    *  
    *  方法:initControl
    *  参数:callbackFunction
    *  初始化控件，会使用到_baseCodeHashMap
    */
    initControl = function (callBackFunction)
    {
        try
        {

            var codeService_0809 = _baseCodeHashMap.get('codeservice_0809');


            controlObj.datetimeinit('detail_f_dcsj_tbl_ld_expjhts_detail_date', 'detail_f_dcsj_tbl_ld_expjhts_detail_time', f_dcsj_date_onchange, f_dcsj_time_onchange);
            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_expjhts_detail', codeService_0809, f_zt_onchange);
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initControl执行失败<br/>' + ex.message, 'fail');
        }
    },


    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件状态
    */
    setDisable = function (isDisable)
    {
        try
        {

            if (that._pr_pagetype == '2')
            {
                isDisable = true;
                $('#div_command_0').addClass('hidden');
                $('#div_command_1').addClass('hidden');
            }
            else
            {
                //设置按钮行
                var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_expjhts_detail');
                switch (ztid)
                {
                    case "0":
                        {
                            isDisable = false;
                            $('#div_command_0').removeClass('hidden');
                            $('#div_command_1').addClass('hidden');
                            $('#div_command_9').addClass('hidden');
                        }
                        break;
                    case "1":
                        {
                            isDisable = true;
                            if (that._pr_isadmin == 0)
                            {
                            $('#div_command_0').addClass('hidden');
                            $('#div_command_1').removeClass('hidden');
                            $('#div_command_9').addClass('hidden');
                            } else
                            {
                                $('#div_command_0').addClass('hidden');
                                $('#div_command_1').removeClass('hidden');
                                $('#div_command_9').addClass('hidden');
                                $('#btn_command_rollback_tbl_ld_expjhts_detail').addClass('hidden');                                
                            }
                        }
                        break;
                    case "9":
                        {
                            isDisable = true;
                            $('#div_command_0').addClass('hidden');
                            $('#div_command_1').addClass('hidden');
                            $('#div_command_9').removeClass('hidden');
                        }
                        break;
                }
            }

            controlObj.datetimedisable('detail_f_dcsj_tbl_ld_expjhts_detail_date', 'detail_f_dcsj_tbl_ld_expjhts_detail_time', true);

            controlObj.textdisable('detail_f_dcr_tbl_ld_expjhts_detail', true);

            controlObj.textdisable('detail_f_dcrid_tbl_ld_expjhts_detail', true);

            controlObj.textdisable('detail_f_dcpcmc_tbl_ld_expjhts_detail', true);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_expjhts_detail', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_expjhts_detail', true);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_expjhts_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_expjhts_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }
        }
        catch (ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Model操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:setModel
    *  参数:tbl_ld_expjhts_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_expjhts_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_value10);


            controlObj.datetime('detail_f_dcsj_tbl_ld_expjhts_detail_date', 'detail_f_dcsj_tbl_ld_expjhts_detail_time', tbl_ld_expjhts_detail.f_dcsj);

            controlObj.text('detail_f_dcr_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_dcr);

            controlObj.text('detail_f_dcrid_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_dcrid);

            controlObj.text('detail_f_dcpcmc_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_dcpcmc);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_expjhts_detail', tbl_ld_expjhts_detail.f_bz);


            $('#a_export').attr('href', _exportJHTSRootPath + tbl_ld_expjhts_detail.f_dcpcmc + '.txt');

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');
        }
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_ld_expjhts_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_expjhts_detail = new Object();


            tbl_ld_expjhts_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_expjhts_detail');

            tbl_ld_expjhts_detail.f_dcsj = controlObj.datetime('detail_f_dcsj_tbl_ld_expjhts_detail_date', 'detail_f_dcsj_tbl_ld_expjhts_detail_time');


            tbl_ld_expjhts_detail.f_dcr = controlObj.text('detail_f_dcr_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_dcrid = controlObj.text('detail_f_dcrid_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_dcpcmc = controlObj.text('detail_f_dcpcmc_tbl_ld_expjhts_detail');

            tbl_ld_expjhts_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_expjhts_detail');
            tbl_ld_expjhts_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_expjhts_detail');


            tbl_ld_expjhts_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_expjhts_detail');

            callBackFunction.success(tbl_ld_expjhts_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_expjhts_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_expjhts_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_expjhts_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_expjhts_detail.f_dcr.length > 200)
            {
                errorMessageHansMap.put('detail_f_dcr_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_dcrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_dcrid_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_dcpcmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_dcpcmc_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_expjhts_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_expjhts_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_expjhts_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
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
    getData = function (callbackFunction)
    {
        var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_dcrid^f_dcsj^f_dcr^f_dcpcmc^f_zt^f_ztid^f_bz^sys_id';
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
        doAjaxFunction(_serviceUrl, 'GetList', data, {
            success: function (message)
            {
                var messageJson = (new Function("", "return " + message))();
                callbackFunction.success(messageJson.rows[0]);
            },
            fail: function (message)
            {
                _blockMessage.show('GetList执行失败<br/>' + message, 'fail');
            }
        });
    },

    /* 
        *  
        *  方法:updateData
        *  参数:tbl_ld_expjhts_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
    updateData = function (tbl_ld_expjhts_detail, callbackFunction)
    {

        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_dcrid^f_dcsj^f_dcr^f_dcpcmc^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: tbl_ld_expjhts_detail.f_value1,

            f_value2: tbl_ld_expjhts_detail.f_value2,

            f_value3: tbl_ld_expjhts_detail.f_value3,

            f_value4: tbl_ld_expjhts_detail.f_value4,

            f_value5: tbl_ld_expjhts_detail.f_value5,

            f_value6: tbl_ld_expjhts_detail.f_value6,

            f_value7: tbl_ld_expjhts_detail.f_value7,

            f_value8: tbl_ld_expjhts_detail.f_value8,

            f_value9: tbl_ld_expjhts_detail.f_value9,

            f_value10: tbl_ld_expjhts_detail.f_value10,

            f_dcsj: tbl_ld_expjhts_detail.f_dcsj,

            f_dcr: tbl_ld_expjhts_detail.f_dcr,

            f_dcrid: tbl_ld_expjhts_detail.f_dcrid,

            f_dcpcmc: tbl_ld_expjhts_detail.f_dcpcmc,

            f_zt: tbl_ld_expjhts_detail.f_zt,
            f_ztid: tbl_ld_expjhts_detail.f_ztid,

            f_bz: tbl_ld_expjhts_detail.f_bz,

            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
        };

        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json)
        };
        doAjaxFunction(_serviceUrl, 'Update', data, {
            success: function (message)
            {
                callbackFunction.success();
            },
            fail: function (message)
            {
                callbackFunction.fail(message);
            },
            error: function (message)
            {
                callbackFunction.fail(message);
            }
        });
    },


    //---------------------------------------------------------------------------------
    // ---------------------------------控件事件------------------------------------
    //---------------------------------------------------------------------------------


    /* 
        *  
        *  方法:f_dcsj_time_onchange
        *  参数:
        *  导出时间 onchange事件
        */
    f_dcsj_time_onchange = function (e)
    {
        var r = e.currentTarget.id
    },
    /* 
        *  
        *  方法:f_dcsj_date_onchange
        *  参数:
        *  导出时间 onchange事件
        */
    f_dcsj_date_onchange = function (ev)
    {
        var controlid = e.target.id
    },

    /* 
            *  
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
    f_zt_onchange = function (e)
    {
        var controlid = e.target.id;
    },



        end = function () { };
    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        _pr_sys_id: '',
        _pr_pagetype: '',
        _pr_fromurl: '',
        _pr_fromurlparam: '',
        _pr_appcode: '',
        _pr_isadmin: '1',
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
                _blockMessage.show('程序加载中...', 'loading');

                basePageObj.initBasePage({
                    success: function ()
                    {
                        initParameter({
                            success: function ()
                            {
                                //初始化页面控件的代码数据，放到hashmap中
                                initBaseCode({
                                    success: function ()
                                    {
                                        //初始化页面控件
                                        initControl({
                                            success: function ()
                                            {
                                                //绑定数据
                                                that.bindPage({
                                                    success: function ()
                                                    {
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_expjhts_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_expjhts_detail');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_exp_tbl_ld_expjhts_detail');
                                                        _ladda_btn_command_rollback = Ladda.create('btn_command_rollback_tbl_ld_expjhts_detail');

                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }



                                                        _blockMessage.hidden();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('initBasePage执行失败<br/>' + message, 'fail');

                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败<br/>' + ex.message, 'fail');
            }
        },

        /* 
        *  
        *  方法:bindPage
        *  参数:
        *  绑定页面
        */
        bindPage: function (callBackFunction)
        {
            try
            {
                getData({
                    success: function (tbl_ld_expjhts_detail)
                    {
                        setModel(tbl_ld_expjhts_detail, {
                            success: function ()
                            {
                                callBackFunction.success();
                            }
                        });

                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('bindPage执行失败<br/>' + ex.message, 'fail');
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
                getModel({
                    success: function (tbl_ld_expjhts_detail)
                    {
                        checkModel(tbl_ld_expjhts_detail, {
                            success: function (tbl_ld_expjhts_detail)
                            {
                                updateData(tbl_ld_expjhts_detail, {
                                    success: function ()
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show('保存成功', 'success', 2000);
                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show('保存失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_save.stop();
                                if (message != '')
                                {
                                    _alertMessage.show('校验失败', 'fail');
                                    _resultMessage.show(message);
                                }
                                else
                                {
                                    _alertMessage.show('校验未通过', 'warning');
                                }

                            }
                        });
                    },
                    fail: function (message)
                    {
                        _ladda_btn_command_save.stop();
                        _alertMessage.show('数据获取失败', 'warning');
                        _resultMessage.show(message);
                    }
                });
            }
            catch (ex)
            {
                _alertMessage.show('保存程序异常。', 'fail');
                _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
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
            var url = that._pr_fromurl;
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;
            var fromurlJson = (new Function("", "return " + that._pr_fromurlparam))();
            $.each(fromurlJson, function (key, value)
            {
                if (typeof value == 'object')
                {
                    url += '&' + key + '=' + JSON.stringify(value);
                }
                else
                {
                    url += '&' + key + '=' + value;
                }

            });

            commonObj.changeUrl(url, 'right-hide');
        },

        /* 
        *  
        *  方法:btn_command_message_onclick
        *  参数:
        *  消息示例按钮
        */
        btn_command_message_onclick: function (messagetype)
        {

            switch (messagetype)
            {
                case "result":
                    _resultMessage.show();
                    break;
                case "alert":
                    _alertMessage.show('alert消息<br/>alert消息<br/>', 'warning');
                    break;
                case "confirm":

                    _confirmMessage.show('标题', '内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容',
                    {
                        confirm: function ()
                        {
                            _alertMessage.show('确定', 'success');
                        },
                        cancle: function ()
                        {
                            _alertMessage.show('取消', 'fail');
                        }
                    });
                    break;
                case "block":
                    _blockMessage.show('block消息<br/>block消息<br/>', 'loadingcenter');

                    setTimeout(function ()
                    {
                        _blockMessage.hidden();
                    }, 2000);

                    break;
            }
        },

        /* 
        *  
        *  方法:btn_command_exp_onclick
        *  参数:
        *  导出按钮
        */
        btn_command_exp_onclick: function ()
        {


            try
            {
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对当前的数据进行<a style="color:red">导出</a>操作</h3>';
                confirmContent += '<br/>';
                confirmContent += '<h5>导出后的数据不能<a style="color:red">删除</a>和<a style="color:red">编辑</a></h5>';
                confirmContent += '<h5>请确定执行此操作</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('提交确认', confirmContent,
                {
                    confirm: function ()
                    {
                     
                        _ladda_btn_command_exp.start();
                        getModel({
                            success: function (tbl_ld_expjhts_detail)
                            {
                                updateData(tbl_ld_expjhts_detail, {
                                    success: function ()
                                    {
                        var json = {

                        }
                        var data = {
                            sys_id: that._pr_sys_id,
                            json: JSON.stringify(json),
                            clientInf: _clientInf
                        };

                                        doAjaxFunction(_serviceUrl, 'Export', data, {
                                            success: function (message)
                                            {
                                                that.bindPage({
                                                    success: function ()
                                                    {
                                                setDisable();
                                                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_expjhts_detail', '1');
                                                var name = controlObj.text('detail_f_dcpcmc_tbl_ld_expjhts_detail') + '.txt';
                                                $('#a_export').attr('href', _exportJHTSRootPath + name);
                                                controlObj.text('detail_f_bz_tbl_ld_expjhts_detail', message);
                                                _ladda_btn_command_exp.stop();
                                                _alertMessage.show('导出成功', 'success', 2000);
                                                    }
                                                });

                                            },
                                            fail: function (message)
                                            {
                                                _ladda_btn_command_exp.stop();
                                                _resultMessage.show(message);
                                            },
                                            error: function (message)
                                            {
                                                _ladda_btn_command_exp.stop();
                                                _resultMessage.show(message);
                                            }
                                        });
                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_exp.stop();
                                        _alertMessage.show('导出失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_exp.stop();
                                _alertMessage.show('数据获取失败', 'warning');
                                _resultMessage.show(message);
                            }
                        });
                    }, cancle: function ()
                    {
                    }
                });
            }
            catch (ex)
            {
                _alertMessage.show('提交程序异常。', 'fail');
                //_resultMessage.show('提交程序异常<br/>' + ex.message, 'fail');
            }
            // }
            //catch (ex) {
            //    _resultMessage.show('导出程序异常<br/>' + ex.message, 'fail');
            //}
        },

        /* 
        *  
        *  方法:btn_command_rollback_onclick
        *  参数:
        *  回滚按钮
        */
        btn_command_rollback_onclick: function ()
        {
            try
            {
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对当前的数据进行<a style="color:red">回滚</a>操作</h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5>回滚后的数据将恢复到<a style="color:red">新建</a>状态可以<a style="color:red">编辑</a>和<a style="color:red">删除</a></h5>';
                confirmContent += '<h5>请确定执行此操作</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('回滚确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_expjhts_detail', '0');
                        _ladda_btn_command_rollback.start();
                        getModel({
                            success: function (tbl_ld_expjhts_detail)
                            {
                                updateData(tbl_ld_expjhts_detail, {
                                    success: function ()
                                    {
                                        var json = {
                                        }
                                        var data = {
                                            sys_id: that._pr_sys_id,
                                            json: JSON.stringify(json),
                                            clientInf: _clientInf
                                        };
                                        doAjaxFunction(_serviceUrl, 'RollBack', data, {
                                            success: function (message)
                                            {
                                        setDisable();
                                                controlObj.text('detail_f_bz_tbl_ld_expjhts_detail', '');
                                        _ladda_btn_command_rollback.stop();
                                        _alertMessage.show('回滚成功', 'success', 2000);
                                            },
                                            fail: function (message)
                                            {
                                                _ladda_btn_command_rollback.stop();
                                                _resultMessage.show(message);
                                            },
                                            error: function (message)
                                            {
                                                _ladda_btn_command_rollback.stop();
                                                _resultMessage.show(message);
                                            }
                                        });
                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_rollback.stop();
                                        _alertMessage.show('回滚失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_rollback.stop()
                                _alertMessage.show('回滚失败', 'fail');
                                _resultMessage.show(message);
                            }
                        });


                    }, cancle: function ()
                    {
                    }
                });
            }
            catch (ex)
            {
                _alertMessage.show('保存程序异常。', 'fail');
                _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
            }
        },
        end: function ()
        {
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_expjhts_detail_Obj.init();
});




