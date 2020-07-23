

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_rwb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_rwb.asmx/',
    _baseCodeHashMap = null,
        _validateMessage = null,
        _validatestartMessage = null,
        _ladda_btn_command_save = null,
        _ladda_btn_command_start = null,
        _ladda_btn_command_check = null,
        _ladda_btn_command_cancel = null,

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
        codeServiceId += "0823^";

        codeServiceId += "0824^";


        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    _baseCodeHashMap.put('codeservice_0823', resultArray['0823']);

                    _baseCodeHashMap.put('codeservice_0824', resultArray['0824']);


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


            var codeService_0823 = _baseCodeHashMap.get('codeservice_0823');

            var codeService_0824 = _baseCodeHashMap.get('codeservice_0824');


            controlObj.datetimeinit('detail_f_yjzxsj_tbl_ld_rwb_detail_date', 'detail_f_yjzxsj_tbl_ld_rwb_detail_time', f_yjzxsj_date_onchange, f_yjzxsj_time_onchange);

            controlObj.datetimeinit('detail_f_sjzxsj_tbl_ld_rwb_detail_date', 'detail_f_sjzxsj_tbl_ld_rwb_detail_time', f_sjzxsj_date_onchange, f_sjzxsj_time_onchange);

            controlObj.singledropdownlistinit('detail_f_ml_tbl_ld_rwb_detail', codeService_0824, f_ml_onchange);


            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_rwb_detail', codeService_0823, f_zt_onchange);
            //模态窗口
            $('#div_search_modal_tbl_ld_jfb_detail').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            //初始化选择客户的控件
            $('#div_container_tbl_ld_rwb_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4rw.html', null, function ()
            {
                tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                tbl_ld_khb_list_Obj.init({
                    success: function ()
                    {
                        $('#div_container_tbl_ld_rwb_list').css('display', '');
                        $('#div_loading_tbl_ld_rwb_list').css('display', 'none');
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('客户初始化执行失败<br/>' + message, 'fail');
                    }
                });
            });

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

            var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_rwb_detail');

            if (ztid != "0")
            {
                isDisable = true;
            }

            controlObj.textdisable('detail_f_khbh_tbl_ld_rwb_detail', isDisable);
            if (isDisable)
            {
                $('#btn_detail_f_khbh_tbl_ld_rwb_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_rwb_detail').removeAttr('disabled');
            }

            controlObj.textdisable('detail_f_khbhid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_yhbh_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_yhbhid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_yhm_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_dh_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_ljqf_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_dz_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_khfz_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_khfzid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_cbbh_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_cbbhid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_cbmc_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_sbbh_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_sbbhid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_sblx_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_sblxid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_rwid_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_rwmc_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_sm_tbl_ld_rwb_detail', isDisable);

            controlObj.datetimedisable('detail_f_yjzxsj_tbl_ld_rwb_detail_date', 'detail_f_yjzxsj_tbl_ld_rwb_detail_time', true);

            controlObj.datetimedisable('detail_f_sjzxsj_tbl_ld_rwb_detail_date', 'detail_f_sjzxsj_tbl_ld_rwb_detail_time', true);


            controlObj.singledropdownlistdisable('detail_f_ml_tbl_ld_rwb_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_rwb_detail', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_rwb_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_rwb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_rwb_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }

            switch (ztid)
            {
                case "0":
                    $('#btn_command_start_tbl_ld_rwb_detail').removeClass('hidden');
                    $('#btn_command_check_tbl_ld_rwb_detail').addClass('hidden');
                    $('#btn_command_cancel_tbl_ld_rwb_detail').addClass('hidden');
                    break;
                case "1":
                    $('#btn_command_start_tbl_ld_rwb_detail').addClass('hidden');
                    $('#btn_command_check_tbl_ld_rwb_detail').removeClass('hidden');
                    $('#btn_command_cancel_tbl_ld_rwb_detail').removeClass('hidden');
                    break;
                case "2":
                    $('#btn_command_start_tbl_ld_rwb_detail').addClass('hidden');
                    $('#btn_command_check_tbl_ld_rwb_detail').removeClass('hidden');
                    $('#btn_command_cancel_tbl_ld_rwb_detail').addClass('hidden');
                    break;
                case "3":
                    $('#btn_command_start_tbl_ld_rwb_detail').addClass('hidden');
                    $('#btn_command_check_tbl_ld_rwb_detail').addClass('hidden');
                    $('#btn_command_cancel_tbl_ld_rwb_detail').addClass('hidden');
                    break;
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
    *  参数:tbl_ld_rwb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_rwb_detail, callBackFunction)
    {
        try
        {
            debugger
            controlObj.text('detail_f_value1_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_value10);

            controlObj.text('detail_f_khbh_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_khbh);

            controlObj.text('detail_f_khbhid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_khbhid);

            controlObj.text('detail_f_yhbh_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_yhbh);

            controlObj.text('detail_f_yhbhid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_yhbhid);

            controlObj.text('detail_f_yhm_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_yhm);

            controlObj.text('detail_f_dh_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_dh);

            controlObj.text('detail_f_ljqf_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_ljqf);

            controlObj.text('detail_f_dz_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_dz);

            controlObj.text('detail_f_khfz_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_khfz);

            controlObj.text('detail_f_khfzid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_khfzid);

            controlObj.text('detail_f_cbbh_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_cbbh);

            controlObj.text('detail_f_cbbhid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_cbbhid);

            controlObj.text('detail_f_cbmc_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_cbmc);

            controlObj.text('detail_f_sbbh_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_sbbh);

            controlObj.text('detail_f_sbbhid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_sbbhid);

            controlObj.text('detail_f_sblx_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_sblx);

            controlObj.text('detail_f_sblxid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_sblxid);

            controlObj.text('detail_f_rwid_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_rwid);

            controlObj.text('detail_f_rwmc_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_rwmc);

            controlObj.text('detail_f_sm_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_sm);


            controlObj.datetime('detail_f_yjzxsj_tbl_ld_rwb_detail_date', 'detail_f_yjzxsj_tbl_ld_rwb_detail_time', tbl_ld_rwb_detail.f_yjzxsj);


            controlObj.datetime('detail_f_sjzxsj_tbl_ld_rwb_detail_date', 'detail_f_sjzxsj_tbl_ld_rwb_detail_time', tbl_ld_rwb_detail.f_sjzxsj);

            controlObj.singledropdownlistid('detail_f_ml_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_mlid);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_rwb_detail', tbl_ld_rwb_detail.f_bz.returnStringRN());

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
    *  获取页面数据，返回对象tbl_ld_rwb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_rwb_detail = new Object();


            tbl_ld_rwb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_ljqf = controlObj.text('detail_f_ljqf_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_khfz = controlObj.text('detail_f_khfz_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_khfzid = controlObj.text('detail_f_khfzid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_cbbhid = controlObj.text('detail_f_cbbhid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_cbmc = controlObj.text('detail_f_cbmc_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_rwid = controlObj.text('detail_f_rwid_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_rwmc = controlObj.text('detail_f_rwmc_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_sm = controlObj.text('detail_f_sm_tbl_ld_rwb_detail');

            tbl_ld_rwb_detail.f_yjzxsj = controlObj.datetime('detail_f_yjzxsj_tbl_ld_rwb_detail_date', 'detail_f_yjzxsj_tbl_ld_rwb_detail_time');

            tbl_ld_rwb_detail.f_sjzxsj = controlObj.datetime('detail_f_sjzxsj_tbl_ld_rwb_detail_date', 'detail_f_sjzxsj_tbl_ld_rwb_detail_time');

            tbl_ld_rwb_detail.f_ml = controlObj.singledropdownlist('detail_f_ml_tbl_ld_rwb_detail');
            tbl_ld_rwb_detail.f_mlid = controlObj.singledropdownlistid('detail_f_ml_tbl_ld_rwb_detail');

            tbl_ld_rwb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_rwb_detail');
            tbl_ld_rwb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_rwb_detail');


            tbl_ld_rwb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_rwb_detail');

            callBackFunction.success(tbl_ld_rwb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_rwb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_rwb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            if (tbl_ld_rwb_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_rwb_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_rwb_detail', '客户编号不能为空');
            }


            if (tbl_ld_rwb_detail.f_khbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_yhbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_yhm.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_dh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_ljqf.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljqf_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_dz.length > 200)
            {
                errorMessageHansMap.put('detail_f_dz_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_khfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_khfzid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfzid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbmc_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_rwb_detail.f_sbbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_rwb_detail.f_sbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblxid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_rwid.length > 200)
            {
                errorMessageHansMap.put('detail_f_rwid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_rwmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_rwmc_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_rwb_detail.f_sm.length > 200)
            {
                errorMessageHansMap.put('detail_f_sm_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }



            //if (tbl_ld_rwb_detail.f_yjzxsj == "1900-01-01 00:00:00")
            //{
            //    errorMessageHansMap.put('detail_f_yjzxsj_tbl_ld_rwb_detail_date', '预计执行时间不能为空');

            //}




            if (tbl_ld_rwb_detail.f_ml.length > 200)
            {
                errorMessageHansMap.put('detail_f_ml_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_rwb_detail.f_ml.length < 1)
            {
                errorMessageHansMap.put('detail_f_ml_tbl_ld_rwb_detail', '命令不能为空');
            }



            if (tbl_ld_rwb_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_rwb_detail.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_rwb_detail', '状态不能为空');
            }


            if (tbl_ld_rwb_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_rwb_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }

        },

        /* 
    *  
    *  方法:checkstartModel
    *  参数:tbl_ld_rwb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
        checkstartModel = function (tbl_ld_rwb_detail, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();



                if (tbl_ld_rwb_detail.f_value1.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value1_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value2.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value2_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value3.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value3_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value4.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value4_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value5.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value5_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value6.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value6_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value7.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value7_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value8.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value8_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value9.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value9_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_value10.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value10_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_khbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_rwb_detail.f_khbh.length < 1)
                {
                    errorMessageHansMap.put('detail_f_khbh_tbl_ld_rwb_detail', '客户编号不能为空');
                }




                if (tbl_ld_rwb_detail.f_khbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_yhbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_yhbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_yhm.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhm_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_dh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_ljqf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_ljqf_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_dz.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dz_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_khfz.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khfz_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_khfzid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khfzid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_cbbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_cbbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_cbmc.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbmc_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_sbbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sbbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_rwb_detail.f_sbbh.length < 1)
                {
                    errorMessageHansMap.put('detail_f_sbbh_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_rwb_detail.f_sbbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_sblx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sblx_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_sblxid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sblxid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_rwid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_rwid_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_rwmc.length > 200)
                {
                    errorMessageHansMap.put('detail_f_rwmc_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_rwb_detail.f_sm.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sm_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }



                //if (tbl_ld_rwb_detail.f_yjzxsj == "1900-01-01 00:00:00")
                //{
                //    errorMessageHansMap.put('detail_f_yjzxsj_tbl_ld_rwb_detail_date', '预计执行时间不能为空');

                //}




                if (tbl_ld_rwb_detail.f_ml.length > 200)
                {
                    errorMessageHansMap.put('detail_f_ml_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_rwb_detail.f_ml.length < 1)
                {
                    errorMessageHansMap.put('detail_f_ml_tbl_ld_rwb_detail', '命令不能为空');
                }



                if (tbl_ld_rwb_detail.f_zt.length > 200)
                {
                    errorMessageHansMap.put('detail_f_zt_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_rwb_detail.f_zt.length < 1)
                {
                    errorMessageHansMap.put('detail_f_zt_tbl_ld_rwb_detail', '状态不能为空');
                }


                if (tbl_ld_rwb_detail.f_bz.length > 4000)
                {
                    errorMessageHansMap.put('detail_f_bz_tbl_ld_rwb_detail', '长度不能超过<a style="color:red">4000</a>个字');
                }
                var sqlJson = {
                    "rwcount": "select count(f_khbh) as count from tbl_ld_rwb where f_khbh= '" + tbl_ld_rwb_detail.f_khbh+"' and (f_ztid ='1' or f_ztid = '2')"
                }
                commonObj.querySqls(sqlJson, {

                    success: function (messageJson)
                    {
                        var count = messageJson["rwcount"];
                        if (parseInt(count[0].count) > 0)
                        {
                            errorMessageHansMap.put('detail_f_khbh_tbl_ld_rwb_detail', '该客户存在未完成任务');
                        }

                        if (errorMessageHansMap.keys().length > 0)
                        {
                            _validatestartMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                            callBackFunction.fail('');
                        }
                        else
                        {
                            _validatestartMessage.hidden();
                            callBackFunction.success(tbl_ld_rwb_detail);
                        }

                    },
                    fail: function (message)
                    {
                        _blockMessage.show('querySqls<br/>' + message, 'fail');
                    }
                })


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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_dh^f_ljqf^f_dz^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_cbmc^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_rwid^f_rwmc^f_sm^f_yjzxsj^f_sjzxsj^f_ml^f_mlid^f_zt^f_ztid^f_bz^sys_id';
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
        *  参数:tbl_ld_rwb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_rwb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_dh^f_ljqf^f_dz^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_cbmc^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_rwid^f_rwmc^f_sm^f_yjzxsj^f_sjzxsj^f_ml^f_mlid^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_rwb_detail.f_value1,

                f_value2: tbl_ld_rwb_detail.f_value2,

                f_value3: tbl_ld_rwb_detail.f_value3,

                f_value4: tbl_ld_rwb_detail.f_value4,

                f_value5: tbl_ld_rwb_detail.f_value5,

                f_value6: tbl_ld_rwb_detail.f_value6,

                f_value7: tbl_ld_rwb_detail.f_value7,

                f_value8: tbl_ld_rwb_detail.f_value8,

                f_value9: tbl_ld_rwb_detail.f_value9,

                f_value10: tbl_ld_rwb_detail.f_value10,

                f_khbh: tbl_ld_rwb_detail.f_khbh,

                f_khbhid: tbl_ld_rwb_detail.f_khbhid,

                f_yhbh: tbl_ld_rwb_detail.f_yhbh,

                f_yhbhid: tbl_ld_rwb_detail.f_yhbhid,

                f_yhm: tbl_ld_rwb_detail.f_yhm,

                f_dh: tbl_ld_rwb_detail.f_dh,

                f_ljqf: tbl_ld_rwb_detail.f_ljqf,

                f_dz: tbl_ld_rwb_detail.f_dz,

                f_khfz: tbl_ld_rwb_detail.f_khfz,

                f_khfzid: tbl_ld_rwb_detail.f_khfzid,

                f_cbbh: tbl_ld_rwb_detail.f_cbbh,

                f_cbbhid: tbl_ld_rwb_detail.f_cbbhid,

                f_cbmc: tbl_ld_rwb_detail.f_cbmc,

                f_sbbh: tbl_ld_rwb_detail.f_sbbh,

                f_sbbhid: tbl_ld_rwb_detail.f_sbbhid,

                f_sblx: tbl_ld_rwb_detail.f_sblx,

                f_sblxid: tbl_ld_rwb_detail.f_sblxid,

                f_rwid: tbl_ld_rwb_detail.f_rwid,

                f_rwmc: tbl_ld_rwb_detail.f_rwmc,

                f_sm: tbl_ld_rwb_detail.f_sm,

                f_yjzxsj: tbl_ld_rwb_detail.f_yjzxsj,

                f_sjzxsj: tbl_ld_rwb_detail.f_sjzxsj,

                f_ml: tbl_ld_rwb_detail.f_ml,
                f_mlid: tbl_ld_rwb_detail.f_mlid,

                f_zt: tbl_ld_rwb_detail.f_zt,
                f_ztid: tbl_ld_rwb_detail.f_ztid,

                f_bz: tbl_ld_rwb_detail.f_bz.formatStringRN(),

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

        /* 
*  
*  方法:startrw
*  参数:tbl_ld_rwb_detail, callbackFunction
*  向数据库更新数据，并在水表数据中心创建任务
*/
        startrw = function (tbl_ld_rwb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_dh^f_ljqf^f_dz^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_cbmc^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_rwid^f_rwmc^f_sm^f_yjzxsj^f_sjzxsj^f_ml^f_mlid^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_rwb_detail.f_value1,

                f_value2: tbl_ld_rwb_detail.f_value2,

                f_value3: tbl_ld_rwb_detail.f_value3,

                f_value4: tbl_ld_rwb_detail.f_value4,

                f_value5: tbl_ld_rwb_detail.f_value5,

                f_value6: tbl_ld_rwb_detail.f_value6,

                f_value7: tbl_ld_rwb_detail.f_value7,

                f_value8: tbl_ld_rwb_detail.f_value8,

                f_value9: tbl_ld_rwb_detail.f_value9,

                f_value10: tbl_ld_rwb_detail.f_value10,

                f_khbh: tbl_ld_rwb_detail.f_khbh,

                f_khbhid: tbl_ld_rwb_detail.f_khbhid,

                f_yhbh: tbl_ld_rwb_detail.f_yhbh,

                f_yhbhid: tbl_ld_rwb_detail.f_yhbhid,

                f_yhm: tbl_ld_rwb_detail.f_yhm,

                f_dh: tbl_ld_rwb_detail.f_dh,

                f_ljqf: tbl_ld_rwb_detail.f_ljqf,

                f_dz: tbl_ld_rwb_detail.f_dz,

                f_khfz: tbl_ld_rwb_detail.f_khfz,

                f_khfzid: tbl_ld_rwb_detail.f_khfzid,

                f_cbbh: tbl_ld_rwb_detail.f_cbbh,

                f_cbbhid: tbl_ld_rwb_detail.f_cbbhid,

                f_cbmc: tbl_ld_rwb_detail.f_cbmc,

                f_sbbh: tbl_ld_rwb_detail.f_sbbh,

                f_sbbhid: tbl_ld_rwb_detail.f_sbbhid,

                f_sblx: tbl_ld_rwb_detail.f_sblx,

                f_sblxid: tbl_ld_rwb_detail.f_sblxid,

                f_rwid: tbl_ld_rwb_detail.f_rwid,

                f_rwmc: tbl_ld_rwb_detail.f_rwmc,

                f_sm: tbl_ld_rwb_detail.f_sm,

                f_yjzxsj: tbl_ld_rwb_detail.f_yjzxsj,

                f_sjzxsj: tbl_ld_rwb_detail.f_sjzxsj,

                f_ml: tbl_ld_rwb_detail.f_ml,
                f_mlid: tbl_ld_rwb_detail.f_mlid,

                f_zt: tbl_ld_rwb_detail.f_zt,
                f_ztid: tbl_ld_rwb_detail.f_ztid,

                f_bz: tbl_ld_rwb_detail.f_bz.formatStringRN(),

                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = {
                columns: columns,
                clientInf: _clientInf,
                json: JSON.stringify(json)
            };
            doAjaxFunction(_serviceUrl, 'Startrw', data, {
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

        /* 
*  
*  方法:checkrw
*  参数:tbl_ld_rwb_detail, callbackFunction
*  向水表数据中心查询任务并根据状态刷新本地任务状态
*/
        checkrw = function (tbl_ld_rwb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_dh^f_ljqf^f_dz^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_cbmc^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_rwid^f_rwmc^f_sm^f_yjzxsj^f_sjzxsj^f_ml^f_mlid^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_rwb_detail.f_value1,

                f_value2: tbl_ld_rwb_detail.f_value2,

                f_value3: tbl_ld_rwb_detail.f_value3,

                f_value4: tbl_ld_rwb_detail.f_value4,

                f_value5: tbl_ld_rwb_detail.f_value5,

                f_value6: tbl_ld_rwb_detail.f_value6,

                f_value7: tbl_ld_rwb_detail.f_value7,

                f_value8: tbl_ld_rwb_detail.f_value8,

                f_value9: tbl_ld_rwb_detail.f_value9,

                f_value10: tbl_ld_rwb_detail.f_value10,

                f_khbh: tbl_ld_rwb_detail.f_khbh,

                f_khbhid: tbl_ld_rwb_detail.f_khbhid,

                f_yhbh: tbl_ld_rwb_detail.f_yhbh,

                f_yhbhid: tbl_ld_rwb_detail.f_yhbhid,

                f_yhm: tbl_ld_rwb_detail.f_yhm,

                f_dh: tbl_ld_rwb_detail.f_dh,

                f_ljqf: tbl_ld_rwb_detail.f_ljqf,

                f_dz: tbl_ld_rwb_detail.f_dz,

                f_khfz: tbl_ld_rwb_detail.f_khfz,

                f_khfzid: tbl_ld_rwb_detail.f_khfzid,

                f_cbbh: tbl_ld_rwb_detail.f_cbbh,

                f_cbbhid: tbl_ld_rwb_detail.f_cbbhid,

                f_cbmc: tbl_ld_rwb_detail.f_cbmc,

                f_sbbh: tbl_ld_rwb_detail.f_sbbh,

                f_sbbhid: tbl_ld_rwb_detail.f_sbbhid,

                f_sblx: tbl_ld_rwb_detail.f_sblx,

                f_sblxid: tbl_ld_rwb_detail.f_sblxid,

                f_rwid: tbl_ld_rwb_detail.f_rwid,

                f_rwmc: tbl_ld_rwb_detail.f_rwmc,

                f_sm: tbl_ld_rwb_detail.f_sm,

                f_yjzxsj: tbl_ld_rwb_detail.f_yjzxsj,

                f_sjzxsj: tbl_ld_rwb_detail.f_sjzxsj,

                f_ml: tbl_ld_rwb_detail.f_ml,
                f_mlid: tbl_ld_rwb_detail.f_mlid,

                f_zt: tbl_ld_rwb_detail.f_zt,
                f_ztid: tbl_ld_rwb_detail.f_ztid,

                f_bz: tbl_ld_rwb_detail.f_bz.formatStringRN(),

                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = {
                columns: columns,
                clientInf: _clientInf,
                json: JSON.stringify(json)
            };
            doAjaxFunction(_serviceUrl, 'Checkrw', data, {
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

        /* 
*  
*  方法:cancelrw
*  参数:tbl_ld_rwb_detail, callbackFunction
*  向水表数据中心查询任务并根据状态刷新本地任务状态
*/
        cancelrw = function (tbl_ld_rwb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_dh^f_ljqf^f_dz^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_cbmc^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_rwid^f_rwmc^f_sm^f_yjzxsj^f_sjzxsj^f_ml^f_mlid^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_rwb_detail.f_value1,

                f_value2: tbl_ld_rwb_detail.f_value2,

                f_value3: tbl_ld_rwb_detail.f_value3,

                f_value4: tbl_ld_rwb_detail.f_value4,

                f_value5: tbl_ld_rwb_detail.f_value5,

                f_value6: tbl_ld_rwb_detail.f_value6,

                f_value7: tbl_ld_rwb_detail.f_value7,

                f_value8: tbl_ld_rwb_detail.f_value8,

                f_value9: tbl_ld_rwb_detail.f_value9,

                f_value10: tbl_ld_rwb_detail.f_value10,

                f_khbh: tbl_ld_rwb_detail.f_khbh,

                f_khbhid: tbl_ld_rwb_detail.f_khbhid,

                f_yhbh: tbl_ld_rwb_detail.f_yhbh,

                f_yhbhid: tbl_ld_rwb_detail.f_yhbhid,

                f_yhm: tbl_ld_rwb_detail.f_yhm,

                f_dh: tbl_ld_rwb_detail.f_dh,

                f_ljqf: tbl_ld_rwb_detail.f_ljqf,

                f_dz: tbl_ld_rwb_detail.f_dz,

                f_khfz: tbl_ld_rwb_detail.f_khfz,

                f_khfzid: tbl_ld_rwb_detail.f_khfzid,

                f_cbbh: tbl_ld_rwb_detail.f_cbbh,

                f_cbbhid: tbl_ld_rwb_detail.f_cbbhid,

                f_cbmc: tbl_ld_rwb_detail.f_cbmc,

                f_sbbh: tbl_ld_rwb_detail.f_sbbh,

                f_sbbhid: tbl_ld_rwb_detail.f_sbbhid,

                f_sblx: tbl_ld_rwb_detail.f_sblx,

                f_sblxid: tbl_ld_rwb_detail.f_sblxid,

                f_rwid: tbl_ld_rwb_detail.f_rwid,

                f_rwmc: tbl_ld_rwb_detail.f_rwmc,

                f_sm: tbl_ld_rwb_detail.f_sm,

                f_yjzxsj: tbl_ld_rwb_detail.f_yjzxsj,

                f_sjzxsj: tbl_ld_rwb_detail.f_sjzxsj,

                f_ml: tbl_ld_rwb_detail.f_ml,
                f_mlid: tbl_ld_rwb_detail.f_mlid,

                f_zt: tbl_ld_rwb_detail.f_zt,
                f_ztid: tbl_ld_rwb_detail.f_ztid,

                f_bz: tbl_ld_rwb_detail.f_bz.formatStringRN(),

                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = {
                columns: columns,
                clientInf: _clientInf,
                json: JSON.stringify(json)
            };
            doAjaxFunction(_serviceUrl, 'Cancelrw', data, {
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
        *  方法:f_yjzxsj_time_onchange
        *  参数:
        *  预计执行时间 onchange事件
        */
            f_yjzxsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_yjzxsj_date_onchange
        *  参数:
        *  预计执行时间 onchange事件
        */
            f_yjzxsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },


        /* 
        *  
        *  方法:f_sjzxsj_time_onchange
        *  参数:
        *  实际执行时间 onchange事件
        */
            f_sjzxsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_sjzxsj_date_onchange
        *  参数:
        *  实际执行时间 onchange事件
        */
            f_sjzxsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },


            /* 
            *  
            *  方法:f_ml_onchange
            *  参数:changeEventParameter
            *  命令onchange事件
            */
            f_ml_onchange = function (e)
            {
                var controlid = e.target.id;
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_rwb_detail');
                                                        _validatestartMessage = new validateMessage('btn_command_start_tbl_ld_rwb_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_rwb_detail');
                                                        _ladda_btn_command_start = Ladda.create('btn_command_start_tbl_ld_rwb_detail');
                                                        _ladda_btn_command_check = Ladda.create('btn_command_check_tbl_ld_rwb_detail');
                                                        _ladda_btn_command_cancel = Ladda.create('btn_command_cancel_tbl_ld_rwb_detail');

                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        var khbh = controlObj.text('detail_f_khbh_tbl_ld_rwb_detail');
                                                        var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_rwb_detail');
                                                        if (khbh != null && khbh != "" & ztid == "0")
                                                        {
                                                            that.quick_search_onclick(khbh);
                                                            _blockMessage.hidden();
                                                        }
                                                        else
                                                        {
                                                            _blockMessage.hidden();
                                                        }
                                                        
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
                    success: function (tbl_ld_rwb_detail)
                    {
                        setModel(tbl_ld_rwb_detail, {
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
                    success: function (tbl_ld_rwb_detail)
                    {
                        checkModel(tbl_ld_rwb_detail, {
                            success: function (tbl_ld_rwb_detail)
                            {
                                updateData(tbl_ld_rwb_detail, {
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
*  方法:btn_command_start_onclick
*  参数:
*  下达任务按钮
*/
        btn_command_start_onclick: function ()
        {
            try
            {
                _ladda_btn_command_start.start();
                getModel({
                    success: function (tbl_ld_rwb_detail)
                    {
                        checkstartModel(tbl_ld_rwb_detail, {
                            success: function (tbl_ld_rwb_detail)
                            {
                                startrw(tbl_ld_rwb_detail, {
                                    success: function ()
                                    {
                                        //绑定数据
                                        that.bindPage({
                                            success: function ()
                                            {
                                                switch (that._pr_pagetype)
                                                {
                                                    case "1":
                                                        setDisable(false);
                                                        break;
                                                    case "2":
                                                        setDisable(true);
                                                        break;
                                                }

                                                _ladda_btn_command_start.stop();
                                                _alertMessage.show('任务创建成功', 'success', 2000);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_start.stop();
                                        _alertMessage.show('任务创建失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_start.stop();
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
                        _ladda_btn_command_start.stop();
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
*  方法:btn_command_check_onclick
*  参数:
*  查询任务按钮
*/
        btn_command_check_onclick: function ()
        {
            try
            {
                _ladda_btn_command_check.start();
                getModel({
                    success: function (tbl_ld_rwb_detail)
                    {

                                checkrw(tbl_ld_rwb_detail, {
                                    success: function ()
                                    {
                                        //绑定数据
                                        that.bindPage({
                                            success: function ()
                                            {
                                                switch (that._pr_pagetype)
                                                {
                                                    case "1":
                                                        setDisable(false);
                                                        break;
                                                    case "2":
                                                        setDisable(true);
                                                        break;
                                                }

                                                _ladda_btn_command_check.stop();
                                                _alertMessage.show('查询成功', 'success', 2000);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_check.stop();
                                        _alertMessage.show('查询失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });

                    },
                    fail: function (message)
                    {
                        _ladda_btn_command_check.stop();
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
*  方法:btn_command_check_onclick
*  参数:
*  查询任务按钮
*/
        btn_command_cancel_onclick: function ()
        {
            try
            {
                _ladda_btn_command_cancel.start();
                getModel({
                    success: function (tbl_ld_rwb_detail)
                    {

                        cancelrw(tbl_ld_rwb_detail, {
                            success: function ()
                            {
                                //绑定数据
                                that.bindPage({
                                    success: function ()
                                    {
                                        switch (that._pr_pagetype)
                                        {
                                            case "1":
                                                setDisable(false);
                                                break;
                                            case "2":
                                                setDisable(true);
                                                break;
                                        }

                                        _ladda_btn_command_cancel.stop();
                                        _alertMessage.show('任务撤销成功', 'success', 2000);
                                    }
                                });

                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_cancel.stop();
                                //绑定数据
                                that.bindPage({
                                    success: function ()
                                    {
                                        switch (that._pr_pagetype)
                                        {
                                            case "1":
                                                setDisable(false);
                                                break;
                                            case "2":
                                                setDisable(true);
                                                break;
                                        }

                                        _ladda_btn_command_cancel.stop();
                                        _alertMessage.show('任务撤销失败', 'fail', 2000);
                                        _resultMessage.show(message);
                                    }
                                });
                                
                            }
                        });

                    },
                    fail: function (message)
                    {
                        _ladda_btn_command_cancel.stop();
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

        //弹出选择客户part
        btn_command_opensearch_onclick: function ()
        {


            var khbh = controlObj.text('detail_f_khbh_tbl_ld_rwb_detail');

            tbl_ld_khb_list_Obj._pr_khbh = khbh;
            tbl_ld_khb_list_Obj.openSearch({
                success: function ()
                {
                },
                fail: function (message)
                {
                    _alertMessage.show('传入参数失败', 'fail');
                    _resultMessage.show(message);
                }
            });
            $('#div_search_modal_tbl_ld_rwb_detail').modal('show');

        },

        btn_search_modal_search_onclick: function ()
        {
           
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                var khbh = idArray[0];

                //获取客户信息
                var sqlStringsJson = {
                    "tbl_ld_khb": "select * from TBL_LD_KHB where sys_id='" + khbh + "' and sys_delflag='0' and f_ztid in('0','4','2')  "
                };

                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        if (resultJson["tbl_ld_khb"].length > 0)
                        {

                            resultJson = resultJson["tbl_ld_khb"][0];

                            controlObj.text('detail_f_khbh_tbl_ld_rwb_detail', resultJson["f_khbh"]);//客户编号
                            controlObj.text('detail_f_khbhid_tbl_ld_rwb_detail', resultJson["sys_id"]);//客户编号id

                            controlObj.text('detail_f_yhbh_tbl_ld_rwb_detail', resultJson["f_yhbh"]);//用户编号
                            controlObj.text('detail_f_yhbhid_tbl_ld_rwb_detail', resultJson["f_yhbhid"]);//用户编号id
                            controlObj.text('detail_f_yhm_tbl_ld_rwb_detail', resultJson["f_yhm"]);//用户名

                            controlObj.text('detail_f_dh_tbl_ld_rwb_detail', resultJson["f_dh"]);//电话

                            controlObj.text('detail_f_dz_tbl_ld_rwb_detail', resultJson["f_dz"]);//地址
                            controlObj.text('detail_f_ljqf_tbl_ld_rwb_detail', resultJson["f_ljqf"]);//累计欠费
                            controlObj.text('detail_f_khfz_tbl_ld_rwb_detail', resultJson["f_khfz"]);//客户分组
                            controlObj.text('detail_f_khfzid_tbl_ld_rwb_detail', resultJson["f_khfzid"]);//客户分组id
                            controlObj.text('detail_f_cbbh_tbl_ld_rwb_detail', resultJson["f_cbbh"]);//抄本编号
                            controlObj.text('detail_f_cbbhid_tbl_ld_rwb_detail', resultJson["f_cbbhid"]);//抄本编号id
                            controlObj.text('detail_f_cbmc_tbl_ld_rwb_detail', resultJson["f_cbmc"]);//抄本名称
                            controlObj.text('detail_f_sbbh_tbl_ld_rwb_detail', resultJson["f_sbbh"]);//水表编号
                            controlObj.text('detail_f_sbbhid_tbl_ld_rwb_detail', resultJson["f_sbbhid"]);//水表编号id
                            controlObj.text('detail_f_sblx_tbl_ld_rwb_detail', resultJson["f_sblx"]);//水表类型
                            controlObj.text('detail_f_sblxid_tbl_ld_rwb_detail', resultJson["f_sblxid"]);//水表类型id

                            $('#div_search_modal_tbl_ld_rwb_detail').modal('hide')
                            


                        } else
                        {
                            _alertMessage.show('获取客户信息失败<br/>', 'fail');
                        }

                    },
                    fail: function ()
                    {
                        _alertMessage.show('加载失败<br/>', 'fail');
                    }
                });
            }
            else
            {
                _alertMessage.show('必须选择一条记录', 'fail');

            }

        },

        quick_search_onclick: function (khbh)
        {

                //获取客户信息
                var sqlStringsJson = {
                    "tbl_ld_khb": "select * from TBL_LD_KHB where f_khbh='" + khbh + "' and sys_delflag='0' and f_ztid in('0','4','2')  "
                };

                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        if (resultJson["tbl_ld_khb"].length > 0)
                        {

                            resultJson = resultJson["tbl_ld_khb"][0];

                            controlObj.text('detail_f_khbh_tbl_ld_rwb_detail', resultJson["f_khbh"]);//客户编号
                            controlObj.text('detail_f_khbhid_tbl_ld_rwb_detail', resultJson["sys_id"]);//客户编号id

                            controlObj.text('detail_f_yhbh_tbl_ld_rwb_detail', resultJson["f_yhbh"]);//用户编号
                            controlObj.text('detail_f_yhbhid_tbl_ld_rwb_detail', resultJson["f_yhbhid"]);//用户编号id
                            controlObj.text('detail_f_yhm_tbl_ld_rwb_detail', resultJson["f_yhm"]);//用户名

                            controlObj.text('detail_f_dh_tbl_ld_rwb_detail', resultJson["f_dh"]);//电话

                            controlObj.text('detail_f_dz_tbl_ld_rwb_detail', resultJson["f_dz"]);//地址
                            controlObj.text('detail_f_ljqf_tbl_ld_rwb_detail', resultJson["f_ljqf"]);//累计欠费
                            controlObj.text('detail_f_khfz_tbl_ld_rwb_detail', resultJson["f_khfz"]);//客户分组
                            controlObj.text('detail_f_khfzid_tbl_ld_rwb_detail', resultJson["f_khfzid"]);//客户分组id
                            controlObj.text('detail_f_cbbh_tbl_ld_rwb_detail', resultJson["f_cbbh"]);//抄本编号
                            controlObj.text('detail_f_cbbhid_tbl_ld_rwb_detail', resultJson["f_cbbhid"]);//抄本编号id
                            controlObj.text('detail_f_cbmc_tbl_ld_rwb_detail', resultJson["f_cbmc"]);//抄本名称
                            controlObj.text('detail_f_sbbh_tbl_ld_rwb_detail', resultJson["f_sbbh"]);//水表编号
                            controlObj.text('detail_f_sbbhid_tbl_ld_rwb_detail', resultJson["f_sbbhid"]);//水表编号id
                            controlObj.text('detail_f_sblx_tbl_ld_rwb_detail', resultJson["f_sblx"]);//水表类型
                            controlObj.text('detail_f_sblxid_tbl_ld_rwb_detail', resultJson["f_sblxid"]);//水表类型id




                        } else
                        {
                            _alertMessage.show('获取客户信息失败<br/>', 'fail');
                        }

                    },
                    fail: function ()
                    {
                        _alertMessage.show('加载失败<br/>', 'fail');
                    }
                });

        },

        btn_search_modal_cancle_onclick: function ()
        {
            $('#div_search_modal_tbl_ld_rwb_detail').modal('hide');
        },
        end: function ()
        {
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_rwb_detail_Obj.init();
});




