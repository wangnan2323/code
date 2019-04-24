
var tbl_ld_xhhbt_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xhhbt.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,

    //=================================================================================
    //                                      私有方法 
    //=================================================================================

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callbackFunction
    *  初始化code内容，存储在_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {

        var codeServiceId = '';
        //状态
        codeServiceId += "0818^";

        codeServiceId += "0641^";

        codeServiceId = codeServiceId.trimEnd('^');

        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {

                try
                {

                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0818', resultArray['0818']);

                    _baseCodeHashMap.put('codeservice_0641', resultArray['0641']);

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
            var codeService_0818 = _baseCodeHashMap.get('codeservice_0818');

            var codeService_0641 = _baseCodeHashMap.get('codeservice_0641');

            controlObj.datetimeinit('detail_f_sqsj_tbl_ld_xhhbt_detail_date', 'detail_f_sqsj_tbl_ld_xhhbt_detail_time', f_sqsj_date_onchange, f_sqsj_time_onchange);

            controlObj.datetimeinit('detail_f_czsj_tbl_ld_xhhbt_detail_date', 'detail_f_czsj_tbl_ld_xhhbt_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_xhhbt_detail', codeService_0818, f_zt_onchange);

            controlObj.fileuploaderinit('detail_f_fj_tbl_ld_xhhbt_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_fj_onchange);

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

            controlObj.textdisable('detail_f_xhbh_tbl_ld_xhhbt_detail', true);

            controlObj.textdisable('detail_f_xhmc_tbl_ld_xhhbt_detail', isDisable);

            controlObj.textdisable('detail_f_sqr_tbl_ld_xhhbt_detail', true);

            controlObj.textdisable('detail_f_sqrid_tbl_ld_xhhbt_detail', isDisable);

            controlObj.datetimedisable('detail_f_sqsj_tbl_ld_xhhbt_detail_date', 'detail_f_sqsj_tbl_ld_xhhbt_detail_time', true);

            controlObj.textdisable('detail_f_czr_tbl_ld_xhhbt_detail', true);

            controlObj.textdisable('detail_f_czrid_tbl_ld_xhhbt_detail', isDisable);

            controlObj.datetimedisable('detail_f_czsj_tbl_ld_xhhbt_detail_date', 'detail_f_czsj_tbl_ld_xhhbt_detail_time', true);

            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_xhhbt_detail', true);

            controlObj.fileuploaderdisable('detail_f_fj_tbl_ld_xhhbt_detail', isDisable);

            controlObj.textdisable('detail_f_yy_tbl_ld_xhhbt_detail', isDisable);
            controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbt_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_xhhbt_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_xhhbt_detail').removeClass('hidden');
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
    *  参数:tbl_ld_xhhbt_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_xhhbt_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_value10);

            controlObj.text('detail_f_xhbh_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_xhbh);

            controlObj.text('detail_f_xhmc_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_xhmc);

            controlObj.text('detail_f_sqr_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_sqr);

            controlObj.text('detail_f_sqrid_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_sqrid);

            controlObj.datetime('detail_f_sqsj_tbl_ld_xhhbt_detail_date', 'detail_f_sqsj_tbl_ld_xhhbt_detail_time', tbl_ld_xhhbt_detail.f_sqsj);

            controlObj.text('detail_f_czr_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_czr);

            controlObj.text('detail_f_czrid_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_czrid);

            if (tbl_ld_xhhbt_detail.f_czsj != '0001/1/1 0:00:00')
            {
                controlObj.datetime('detail_f_czsj_tbl_ld_xhhbt_detail_date', 'detail_f_czsj_tbl_ld_xhhbt_detail_time', tbl_ld_xhhbt_detail.f_czsj);
            } else
            {
                controlObj.datetime('detail_f_czsj_tbl_ld_xhhbt_detail_date', 'detail_f_czsj_tbl_ld_xhhbt_detail_time', '1900-01-01 0:00:00');
            }
            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_ztid);

            controlObj.fileuploaderbind('detail_f_fj_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_fj);

            controlObj.text('detail_f_yy_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.f_yy.returnStringRN());

            controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbt_detail', tbl_ld_xhhbt_detail.fk_tbl_maintable_sys_id);
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
    *  获取页面数据，返回对象tbl_ld_xhhbt_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_xhhbt_detail = new Object();

            tbl_ld_xhhbt_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_xhbh = controlObj.text('detail_f_xhbh_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_xhmc = controlObj.text('detail_f_xhmc_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_sqr = controlObj.text('detail_f_sqr_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_sqrid = controlObj.text('detail_f_sqrid_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_sqsj = controlObj.datetime('detail_f_sqsj_tbl_ld_xhhbt_detail_date', 'detail_f_sqsj_tbl_ld_xhhbt_detail_time');

            tbl_ld_xhhbt_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_xhhbt_detail_date', 'detail_f_czsj_tbl_ld_xhhbt_detail_time');

            tbl_ld_xhhbt_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_fj = controlObj.fileuploaderid('detail_f_fj_tbl_ld_xhhbt_detail');

            tbl_ld_xhhbt_detail.f_yy = controlObj.text('detail_f_yy_tbl_ld_xhhbt_detail');
            tbl_ld_xhhbt_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbt_detail');

            callBackFunction.success(tbl_ld_xhhbt_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_xhhbt_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_xhhbt_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();

            var errorMessagePlacementHansMap = new hashMap();

            if (tbl_ld_xhhbt_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_xhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_xhbh_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_xhmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_xhmc_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_sqr.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqr_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_sqrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqrid_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_czr.length > 200)
            {
                errorMessageHansMap.put('detail_f_czr_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_czrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_czrid_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_fj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_fj_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            if (tbl_ld_xhhbt_detail.f_yy.length > 4000)
            {
                errorMessageHansMap.put('detail_f_yy_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            if (tbl_ld_xhhbt_detail.fk_tbl_maintable_sys_id.length > 200)
            {
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbt_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_xhhbt_detail);
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
        //var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var whereClause = ' fk_tbl_maintable_sys_id = \'' + that._pr_fk_tbl_maintable_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_xhbh^f_czr^f_czrid^f_czsj^f_fj^f_yy^f_sqr^f_sqrid^f_sqsj^f_xhmc^f_zt^f_ztid^fk_tbl_maintable_sys_id^sys_id';
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
                that._pr_sys_id = messageJson.rows[0]['sys_id'];
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
        *  参数:tbl_ld_xhhbt_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_xhhbt_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_xhbh^f_czr^f_czrid^f_czsj^f_fj^f_yy^f_sqr^f_sqrid^f_sqsj^f_xhmc^f_zt^f_ztid^fk_tbl_maintable_sys_id^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_xhhbt_detail.f_value1,

                f_value2: tbl_ld_xhhbt_detail.f_value2,

                f_value3: tbl_ld_xhhbt_detail.f_value3,

                f_value4: tbl_ld_xhhbt_detail.f_value4,

                f_value5: tbl_ld_xhhbt_detail.f_value5,

                f_value6: tbl_ld_xhhbt_detail.f_value6,

                f_value7: tbl_ld_xhhbt_detail.f_value7,

                f_value8: tbl_ld_xhhbt_detail.f_value8,

                f_value9: tbl_ld_xhhbt_detail.f_value9,

                f_value10: tbl_ld_xhhbt_detail.f_value10,

                f_xhbh: tbl_ld_xhhbt_detail.f_xhbh,

                f_xhmc: tbl_ld_xhhbt_detail.f_xhmc,

                f_sqr: tbl_ld_xhhbt_detail.f_sqr,

                f_sqrid: tbl_ld_xhhbt_detail.f_sqrid,

                f_sqsj: tbl_ld_xhhbt_detail.f_sqsj,

                f_czr: tbl_ld_xhhbt_detail.f_czr,

                f_czrid: tbl_ld_xhhbt_detail.f_czrid,

                f_czsj: tbl_ld_xhhbt_detail.f_czsj,

                f_zt: tbl_ld_xhhbt_detail.f_zt,
                f_ztid: tbl_ld_xhhbt_detail.f_ztid,


                f_fj: tbl_ld_xhhbt_detail.f_fj,

                f_yy: tbl_ld_xhhbt_detail.f_yy.formatStringRN(),
                fk_tbl_maintable_sys_id: tbl_ld_xhhbt_detail.fk_tbl_maintable_sys_id,

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
        *  方法:f_sqsj_time_onchange
        *  参数:
        *  申请时间 onchange事件
        */
            f_sqsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_sqsj_date_onchange
        *  参数:
        *  申请时间 onchange事件
        */
            f_sqsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

        /* 
        *  
        *  方法:f_czsj_time_onchange
        *  参数:
        *  操作时间 onchange事件
        */
            f_czsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_czsj_date_onchange
        *  参数:
        *  操作时间 onchange事件
        */
            f_czsj_date_onchange = function (ev)
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

        /* 
        *  
        *  方法:f_fj_onchange
        *  参数:
        *  附件 onchange事件
        */
            f_fj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_fj_tbl_ld_xhhbt_detail');
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
        _pr_fk_tbl_maintable_sys_id: '',
        _pr_lclx: '',//流程类型【1 是销户  2 是报停】
        //_pr_fromurl: '',
        //_pr_fromurlparam: '',
        //_pr_appcode: '',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        /* 
        *  
        *  方法:init
        *  参数:
        *  页面初始化方法
        */
        init: function (callBackFunction)
        {
            try
            {

                //初始化页面控件的代码数据，放到hashmap中
                initBaseCode({
                    success: function ()
                    {
                        //初始化页面控件
                        initControl({
                            success: function ()
                            {
                                that.bindPage({
                                    success: function ()
                                    {
                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_xhhbt_detail');

                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_xhhbt_detail');

                                        switch (that._pr_pagetype)
                                        {
                                            case "1":
                                                setDisable(false);
                                                break;
                                            case "2":
                                                setDisable(true);
                                                break;
                                        }
                                        $('#div_container_tbl_ld_xhhbtzb_treelist').load('../tbl_ld_xhhbtzb/tbl_ld_xhhbtzb_treelist_part.html', null, function ()
                                        {
                                            tbl_ld_xhhbtzb_treelist_Obj._pr_fk_tbl_ld_xhhbt_sys_id = that._pr_sys_id;
                                            tbl_ld_xhhbtzb_treelist_Obj._pr_listtype = that._pr_pagetype;
                                            tbl_ld_xhhbtzb_treelist_Obj._pr_lclx = that._pr_lclx;

                                            tbl_ld_xhhbtzb_treelist_Obj.init({
                                                success: function ()
                                                {
                                                    $('#div_container_tbl_ld_xhhbtzb_treelist').css('display', '');
                                                    $('#div_loading_tbl_ld_xhhbtzb_treelist').css('display', 'none');
                                                }
                                            });
                                        });
                                        callBackFunction.success();

                                    }
                                });
                            }
                        });
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
                    success: function (tbl_ld_xhhbt_detail)
                    {
                        setModel(tbl_ld_xhhbt_detail, {

                            success: function ()
                            {

                                $('#div_container_tbl_ld_xhhbtzb_treelist').load('../tbl_ld_xhhbtzb/tbl_ld_xhhbtzb_treelist_part.html', null, function ()
                                {
                                    tbl_ld_xhhbtzb_treelist_Obj._pr_fk_tbl_ld_xhhbt_sys_id = that._pr_sys_id;
                                    tbl_ld_xhhbtzb_treelist_Obj._pr_listtype = that._pr_pagetype;
                                    tbl_ld_xhhbtzb_treelist_Obj._pr_lclx = that._pr_lclx;
                                    tbl_ld_xhhbtzb_treelist_Obj.init({
                                        success: function ()
                                        {
                                            $('#div_container_tbl_ld_xhhbtzb_treelist').css('display', '');
                                            $('#div_loading_tbl_ld_xhhbtzb_treelist').css('display', 'none');
                                        }
                                    });
                                });

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

                    success: function (tbl_ld_xhhbt_detail)
                    {
                        checkModel(tbl_ld_xhhbt_detail, {
                            success: function (tbl_ld_xhhbt_detail)
                            {
                                updateData(tbl_ld_xhhbt_detail, {
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

            tbl_ld_xhhbt_list_Obj.bindGrid({

                success: function ()
                {

                    $('#div_content_part_tbl_ld_xhhbt_list').css('display', '');

                    $('#div_content_part_tbl_ld_xhhbt_detail').css('display', 'none');
                }
            });
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
        save: function (callBackFunction)
        {
            try
            {
                getModel({
                    success: function (tbl_ld_xhhbt_detail)
                    {
                        checkModel(tbl_ld_xhhbt_detail, {
                            success: function (tbl_ld_xhhbt_detail)
                            {
                                updateData(tbl_ld_xhhbt_detail, {
                                    success: function ()
                                    {
                                        //_alertMessage.show('保存成功', 'success', 2000);
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('保存失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
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
        disabled: function ()
        {
            controlObj.textdisable('detail_f_xhbh_tbl_ld_xhhbt_detail', true);
            controlObj.textdisable('detail_f_xhmc_tbl_ld_xhhbt_detail', true);
            controlObj.textdisable('detail_f_sqr_tbl_ld_xhhbt_detail', true);

            controlObj.textdisable('detail_f_sqrid_tbl_ld_xhhbt_detail', true);

            controlObj.datetimedisable('detail_f_sqsj_tbl_ld_xhhbt_detail_date', 'detail_f_sqsj_tbl_ld_xhhbt_detail_time', true);

            controlObj.textdisable('detail_f_czr_tbl_ld_xhhbt_detail', true);

            controlObj.textdisable('detail_f_czrid_tbl_ld_xhhbt_detail', true);

            controlObj.datetimedisable('detail_f_czsj_tbl_ld_xhhbt_detail_date', 'detail_f_czsj_tbl_ld_xhhbt_detail_time', true);

            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_xhhbt_detail', true);

            controlObj.fileuploaderdisable('detail_f_fj_tbl_ld_xhhbt_detail', true);

            controlObj.textdisable('detail_f_yy_tbl_ld_xhhbt_detail', true);
            controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbt_detail', true);
        },
        end: function ()
        {

        }

    };

    return that;
})();



