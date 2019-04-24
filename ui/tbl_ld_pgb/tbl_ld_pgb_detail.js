

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_pgb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_pgb.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_count = null,
    _ladda_btn_command_uncount = null,
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

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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


        codeServiceId += "0581^";

        codeServiceId += "0582^";

        codeServiceId += "0583^";


        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0581', resultArray['0581']);

                    _baseCodeHashMap.put('codeservice_0582', resultArray['0582']);

                    _baseCodeHashMap.put('codeservice_0583', resultArray['0583']);


                    var sqlStringsJson = {
                        "pgpcmc": 'select distinct(a.f_pgpcmc) as text,a.f_pgpcmc as id  from tbl_ld_pgb a where a.f_pgrid=\'' + basePageObj._userInfoJson.sys_userid + '\'and a.sys_delflag=\'0\' and a.f_pgpcmc is not null '

                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {
                            _baseCodeHashMap.put('servicecode_pgpcmc', resultJson['pgpcmc']);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('querySqls<br/>' + message, 'fail');
                        }
                    });

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


            var codeService_0581 = _baseCodeHashMap.get('codeservice_0581');

            var codeService_0582 = _baseCodeHashMap.get('codeservice_0582');

            var codeService_0583 = _baseCodeHashMap.get('codeservice_0583');

            var resultArraypgpcmc = _baseCodeHashMap.get('servicecode_pgpcmc');


            controlObj.datetimeinit('detail_f_pgsj_tbl_ld_pgb_detail_date', 'detail_f_pgsj_tbl_ld_pgb_detail_time');

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_pgb_detail', codeService_0581, f_zt_onchange);



            controlObj.autocompleteinit('detail_f_pgpcmc_tbl_ld_pgb_detail', resultArraypgpcmc, f_pgpcmc_onchange);


            controlObj.singledropdownlistinit('detail_f_ly_tbl_ld_pgb_detail', codeService_0583, f_ly_onchange);

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

            controlObj.textdisable('detail_f_pgr_tbl_ld_pgb_detail', isDisable);
            controlObj.textdisable('detail_f_pgbh_tbl_ld_pgb_detail', isDisable);

            controlObj.textdisable('detail_f_pgrid_tbl_ld_pgb_detail', isDisable);

            controlObj.datetimedisable('detail_f_pgsj_tbl_ld_pgb_detail_date', 'detail_f_pgsj_tbl_ld_pgb_detail_time', isDisable);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_pgb_detail', isDisable);

            controlObj.textdisable('detail_f_pgpcmc_tbl_ld_pgb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_ly_tbl_ld_pgb_detail', isDisable);

            controlObj.textdisable('detail_f_bz_tbl_ld_pgb_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_pgb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }

            //验证是不是可以回滚
            if ($('#btn_command_uncount_tbl_ld_pgb_detail').hasClass('hidden')) {
            }
            else {
                //ajax.IsCanRollBack.sys_id
                
                var data = {
                    sys_id: that._pr_sys_id,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'IsCanRollBack', data, {
                    success: function (message) {
                        if (message == 'true') {
                        }
                        else {
                            $('#btn_command_uncount_tbl_ld_pgb_detail').addClass('hidden');
                        }
                    },
                    fail: function (message) {
                        $('#btn_command_uncount_tbl_ld_pgb_detail').addClass('hidden');
                    }
                });
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
    *  参数:tbl_ld_pgb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_pgb_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_value10);

            controlObj.text('detail_f_pgbh_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_pgbh);
            controlObj.text('detail_f_pgr_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_pgr);

            controlObj.text('detail_f_pgrid_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_pgrid);


            controlObj.datetime('detail_f_pgsj_tbl_ld_pgb_detail_date', 'detail_f_pgsj_tbl_ld_pgb_detail_time', tbl_ld_pgb_detail.f_pgsj);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_ztid);
            if (tbl_ld_pgb_detail.f_ztid == "1")
            {
                $('#btn_command_uncount_tbl_ld_pgb_detail').removeClass('hidden');
            }
            else
            {
                $('#btn_command_uncount_tbl_ld_pgb_detail').addClass('hidden');
            }

            controlObj.text('detail_f_pgpcmc_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_pgpcmc);

            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_lyid);

            controlObj.text('detail_f_bz_tbl_ld_pgb_detail', tbl_ld_pgb_detail.f_bz.returnStringRN());

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
    *  获取页面数据，返回对象tbl_ld_pgb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_pgb_detail = new Object();


            tbl_ld_pgb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_pgb_detail');

            tbl_ld_pgb_detail.f_pgbh = controlObj.text('detail_f_pgbh_tbl_ld_pgb_detail');

            tbl_ld_pgb_detail.f_pgr = controlObj.text('detail_f_pgr_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_pgrid = controlObj.text('detail_f_pgrid_tbl_ld_pgb_detail');

            tbl_ld_pgb_detail.f_pgsj = controlObj.datetime('detail_f_pgsj_tbl_ld_pgb_detail_date', 'detail_f_pgsj_tbl_ld_pgb_detail_time');

            tbl_ld_pgb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_pgb_detail');
            tbl_ld_pgb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_pgb_detail');

            tbl_ld_pgb_detail.f_pgpcmc = controlObj.text('detail_f_pgpcmc_tbl_ld_pgb_detail');

            tbl_ld_pgb_detail.f_ly = controlObj.singledropdownlist('detail_f_ly_tbl_ld_pgb_detail');
            tbl_ld_pgb_detail.f_lyid = controlObj.singledropdownlistid('detail_f_ly_tbl_ld_pgb_detail');


            tbl_ld_pgb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_pgb_detail');

            callBackFunction.success(tbl_ld_pgb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_pgb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_pgb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_pgb_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_pgr.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgr_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            //if (tbl_ld_pgb_detail.f_pgr.length < 1) {
            //    errorMessageHansMap.put('detail_f_pgr_tbl_ld_pgb_detail', '长度不能小于<a style="color:red">1</a>个字');
            //}

            if (tbl_ld_pgb_detail.f_pgbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgbh_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_pgb_detail.f_pgrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgrid_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pgb_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pgb_detail.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_pgb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_pgb_detail.f_pgpcmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgpcmc_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pgb_detail.f_ly.length > 200)
            {
                errorMessageHansMap.put('detail_f_ly_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pgb_detail.f_ly.length < 1)
            {
                errorMessageHansMap.put('detail_f_ly_tbl_ld_pgb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_pgb_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_pgb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_pgb_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_pgr^f_pgrid^f_pgsj^f_pgpcmc^f_ly^f_lyid^f_bz^f_zt^f_ztid^f_pgbh^sys_id';
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
        *  参数:tbl_ld_pgb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_pgb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_pgr^f_pgrid^f_pgsj^f_pgpcmc^f_ly^f_lyid^f_bz^f_zt^f_ztid^sys_id^f_pgbh^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_pgb_detail.f_value1,

                f_value2: tbl_ld_pgb_detail.f_value2,

                f_value3: tbl_ld_pgb_detail.f_value3,

                f_value4: tbl_ld_pgb_detail.f_value4,

                f_value5: tbl_ld_pgb_detail.f_value5,

                f_value6: tbl_ld_pgb_detail.f_value6,

                f_value7: tbl_ld_pgb_detail.f_value7,

                f_value8: tbl_ld_pgb_detail.f_value8,

                f_value9: tbl_ld_pgb_detail.f_value9,

                f_value10: tbl_ld_pgb_detail.f_value10,

                f_pgbh: tbl_ld_pgb_detail.f_pgbh,
                f_pgr: tbl_ld_pgb_detail.f_pgr,

                f_pgrid: tbl_ld_pgb_detail.f_pgrid,

                f_pgsj: tbl_ld_pgb_detail.f_pgsj,

                f_zt: tbl_ld_pgb_detail.f_zt,
                f_ztid: tbl_ld_pgb_detail.f_ztid,


                f_pgpcmc: tbl_ld_pgb_detail.f_pgpcmc,

                f_ly: tbl_ld_pgb_detail.f_ly,
                f_lyid: tbl_ld_pgb_detail.f_lyid,

                f_bz: tbl_ld_pgb_detail.f_bz.formatStringRN(),

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
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_zt_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
            *  
            *  方法:f_pgpcmc_onchange
            *  参数:
            *  算费批次名称选中事件
            */
            f_pgpcmc_onchange = function (e)
            {

                var controlid = e;
            },


            /* 
            *  
            *  方法:f_ly_onchange
            *  参数:changeEventParameter
            *  来源onchange事件
            */
            f_ly_onchange = function (e)
            {
                var controlid = e.target.id;
            },


            updatePgData = function (callBackFunction)
            {


                getModel({
                    success: function (tbl_ld_pgb_detail)
                    {
                        checkModel(tbl_ld_pgb_detail, {
                            success: function (tbl_ld_pgb_detail)
                            {

                                updateData(tbl_ld_pgb_detail, {
                                    success: function ()
                                    {
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        callBackFunction.fail(message);

                                    }
                                });
                            },
                            fail: function (message)
                            {
                                callBackFunction.fail(message);


                            }
                        });
                    },
                    fail: function (message)
                    {
                        callBackFunction.fail(message);
                    }
                });
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_pgb_detail');
                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_pgb_detail');
                                                        _ladda_btn_command_count = Ladda.create('btn_command_count_tbl_ld_pgb_detail');
                                                        _ladda_btn_command_uncount = Ladda.create('btn_command_uncount_tbl_ld_pgb_detail');

                                                        var f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_pgb_detail');
                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                
                                                                        setDisable(true);


                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        //加载抄表信息
                                                        $('#div_tbl_ld_cbiao').load('../tbl_ld_cbiao/tbl_ld_cbiao_list_part4pg.html', null, function ()
                                                        {
                                                         var pgsj =   controlObj.datetime('detail_f_pgsj_tbl_ld_pgb_detail_date', 'detail_f_pgsj_tbl_ld_pgb_detail_time');
                                                            tbl_ld_cbiao_list_Obj._pr_listtype = that._pr_pagetype;
                                                            tbl_ld_cbiao_list_Obj._pr_pgid = that._pr_sys_id;
                                                            tbl_ld_cbiao_list_Obj._pr_pgztid = f_ztid;
                                                            tbl_ld_cbiao_list_Obj._pr_pgsj = pgsj;
                                                            
                                                            tbl_ld_cbiao_list_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_tbl_ld_cbiao').css('display', '');
                                                                    $('#div_loading_content').css('display', 'none');

                                                                    _blockMessage.hidden();
                                                                }
                                                            });

                                                        });

                                                        // _blockMessage.hidden();
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
                    success: function (tbl_ld_pgb_detail)
                    {
                        setModel(tbl_ld_pgb_detail, {
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


                updatePgData({
                    success: function ()
                    {
                        _ladda_btn_command_save.stop();
                        _alertMessage.show('保存成功', 'success', 2000);

                    }, fail: function (message)
                    {
                        _ladda_btn_command_save.stop();
                        _alertMessage.show('保存失败。', 'fail');
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
        *  方法:btn_command_count_onclick
        *  参数:
        *  算费通过按钮
        */
        btn_command_count_onclick: function ()
        {
            var cbiaoIds = tbl_ld_cbiao_list_Obj._pr_gridselectids;//选中的抄表号
            var pgId = that._pr_sys_id;//评估号
            if (cbiaoIds == '')
            {
                _alertMessage.show('至少选择一条数据!', 'warning', 1000);
            }
            else
            {
                var d = new Date();
                controlObj.text('detail_f_pgr_tbl_ld_pgb_detail', basePageObj._userInfoJson.sys_username);
                controlObj.text('detail_f_pgrid_tbl_ld_pgb_detail', basePageObj._userInfoJson.sys_userid);
                controlObj.datetime('detail_f_pgsj_tbl_ld_pgb_detail_date', 'detail_f_pgsj_tbl_ld_pgb_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));
                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_pgb_detail', '1');
                _ladda_btn_command_count.start();


                updatePgData({
                    success: function ()
                    {

                        var data = {
                            cbiaoIds: cbiaoIds,
                            pgId: pgId,
                            clientInf: _clientInf
                        };
                        doAjaxFunction(_serviceUrl, 'CountCbiao', data, {
                            success: function ()
                            {
                                _ladda_btn_command_count.stop();

                                $('#btn_command_save_tbl_ld_pgb_detail').addClass('hidden');
                                $('#btn_command_count_tbl_ld_pgb_detail').addClass('hidden');
                                $('#btn_command_uncount_tbl_ld_pgb_detail').removeClass('hidden');
                                controlObj.textdisable('detail_f_pgpcmc_tbl_ld_pgb_detail', true);
                                controlObj.textdisable('detail_f_bz_tbl_ld_pgb_detail', true);


                                tbl_ld_cbiao_list_Obj._pr_pgztid = '1';
                                tbl_ld_cbiao_list_Obj.bindGrid({
                                    success: function ()
                                    {

                                    }
                                });

                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_count.stop();
                                _alertMessage.show('算费失败。', 'fail');
                                _resultMessage.show(message);

                            }
                        });
                    }, fail: function (message)
                    {
                        _ladda_btn_command_count.stop();
                        _alertMessage.show('保存失败。', 'fail');
                        _resultMessage.show(message);
                    }
                });




            }

        },

        /* 
      *  
      *  方法:btn_command_count_onclick
      *  参数:
      *  算费回滚通过按钮
      */
        btn_command_uncount_onclick: function ()
        {

            var cb_count = tbl_ld_cbiao_list_Obj._pr_cb_count;
            if (cb_count == '0')
            {
                _alertMessage.show('当前没有数据!', 'warning', 1000);
                return;
            }
            var confirmContent = '<blockquote> ';
            confirmContent += '<h3>将对当前批次的<a style="color:red">' + cb_count + '</a>条抄表信息进行<a style="color:red">算费回滚</a></h3>';
            confirmContent += '<h5><a style="color:red">注意：回滚数据存在减免时，减免数据同时将被清除！</h5>';
            confirmContent += '</blockquote> ';
            _confirmMessage.destory();
            _confirmMessage.show('算费回滚确认？', confirmContent,
            {
                confirm: function ()
                {
            var pgId = that._pr_sys_id;//评估号 
            _ladda_btn_command_uncount.start();


                    var data = {
                        pgId: pgId,
                        clientInf: _clientInf
                    };
                    doAjaxFunction(_serviceUrl, 'CountRollback', data, {
                        success: function ()
                        {
                            setDisable(true);
                            that.bindPage(
                                {
                                    success: function ()
                                    {
                            tbl_ld_cbiao_list_Obj.bindGrid({
                                success: function ()
                                {
                                                _ladda_btn_command_uncount.stop();
                                                _alertMessage.show('算费回滚成功', 'success', 2000);
                                }
                            });
                                    },
                                    fail: function (message)
                                    {
                                    }
                                });
                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_uncount.stop();
                            _alertMessage.show('算费回滚失败', 'fail');
                            _resultMessage.show(message);
                        }
                    });
                },
                cancle: function ()
                {

                }
            });
        },
        end: function ()
        {
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_pgb_detail_Obj.init();
});




