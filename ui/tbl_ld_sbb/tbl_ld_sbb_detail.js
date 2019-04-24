

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_sbb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_sbb.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _serverModel = null,
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

        codeServiceId += "0522^";

        codeServiceId += "0523^";

        codeServiceId += "0524^";

        codeServiceId += "0525^";

        codeServiceId += "0526^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    //_baseCodeHashMap.put('codeservice_0522', resultArray['0522']);

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    _baseCodeHashMap.put('codeservice_0526', resultArray['0526']);

                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
                    //select sys_id as id, f_fzbm||'_'||f_fzmc as text from tbl_ldbm_yhfz where sys_delflag='0' and f_ztid='0'
                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {

                            $.each(messageJson["tbl_ldbm_sbfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_sbfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_sbfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_sbfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_0522', messageJson["tbl_ldbm_sbfz"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                        }
                    })

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

            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');

            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            controlObj.multidropdownlistinit('detail_f_sbfz_tbl_ld_sbb_detail', codeService_0522, f_sbfz_onchange);

            controlObj.singledropdownlistinit('detail_f_sbkj_tbl_ld_sbb_detail', codeService_0523, f_sbkj_onchange);

            controlObj.singledropdownlistinit('detail_f_sblx_tbl_ld_sbb_detail', codeService_0524, f_sblx_onchange);

            controlObj.singledropdownlistinit('detail_f_jllx_tbl_ld_sbb_detail', codeService_0525, f_jllx_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_sbb_detail', codeService_0526, f_zt_onchange);

            controlObj.datetimeinit('detail_f_azrq_tbl_ld_sbb_detail_date', 'detail_f_azrq_tbl_ld_sbb_detail_date', f_azrq_date_onchange, f_azrq_time_onchange);
            controlObj.toggleinit('detail_f_qfzt_tbl_ld_sbb_detail', f_qfzt_onchange);
            controlObj.fileuploaderinit('detail_f_fj_tbl_ld_sbb_detail', {}, f_fj_onchange);
            $('#div_container_tbl_ld_log').load('../tbl_ld_log/tbl_ld_log_modallist_part.html', null, function ()
            {
                tbl_ld_log_modallist_Obj._pr_tablename = 'tbl_ld_sbb';
                tbl_ld_log_modallist_Obj._pr_tableprikeyvalue = that._pr_sys_id;
                tbl_ld_log_modallist_Obj.init({
                    success: function ()
                    {
                        $('#div_container_tbl_ld_log').css('display', '');
                        $('#tbl_ld_log').css('display', '');

                        callBackFunction.success();
                    }
                });
            });
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

            controlObj.textdisable('detail_f_sbbh_tbl_ld_sbb_detail', true);

            controlObj.textdisable('detail_f_ztsbh_tbl_ld_sbb_detail', true);

            controlObj.textdisable('detail_f_lxth_tbl_ld_sbb_detail', isDisable);

            controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_sbpp_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_mph_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_sbdz_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_khbh_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_rs_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_synx_tbl_ld_sbb_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_sbb_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_sbb_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_cszm_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_bqzm_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_sqzm_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_sqsl_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_ljgl_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_nljgl_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_qsqpjsl_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_qlqpjsl_tbl_ld_sbb_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_sbb_detail', isDisable);

            controlObj.textdisable('detail_f_bz_tbl_ld_sbb_detail', isDisable);
            controlObj.datetimedisable('detail_f_azrq_tbl_ld_sbb_detail_date', 'detail_f_azrq_tbl_ld_sbb_detail_date', isDisable);
            controlObj.toggledisable('detail_f_qfzt_tbl_ld_sbb_detail', isDisable);
            controlObj.fileuploaderdisable('detail_f_fj_tbl_ld_sbb_detail', isDisable);
            controlObj.textdisable('detail_f_bqsl_tbl_ld_sbb_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_sbb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_sbb_detail').removeClass('hidden');
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
    *  参数:tbl_ld_sbb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_sbb_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_value10);

            controlObj.text('detail_f_sbbh_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sbbh);

            controlObj.text('detail_f_ztsbh_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_ztsbh);

            controlObj.text('detail_f_lxth_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_lxth);

            controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sbfzid);

            controlObj.text('detail_f_sbpp_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sbpp);

            controlObj.text('detail_f_mph_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_mph);

            controlObj.text('detail_f_sbdz_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sbdz);

            controlObj.text('detail_f_khbh_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_khbh);

            controlObj.text('detail_f_rs_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_rs);

            controlObj.text('detail_f_synx_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_synx);

            controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sbkjid);

            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sblxid);

            controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_jllxid);

            controlObj.text('detail_f_cszm_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_cszm);

            controlObj.text('detail_f_bqzm_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_bqzm);

            controlObj.text('detail_f_sqzm_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sqzm);

            controlObj.text('detail_f_sqsl_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_sqsl);

            controlObj.text('detail_f_bqsl_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_bqsl);

            controlObj.text('detail_f_ljgl_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_ljgl);

            controlObj.text('detail_f_nljgl_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_nljgl);

            controlObj.text('detail_f_qsqpjsl_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_qsqpjsl);

            controlObj.text('detail_f_qlqpjsl_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_qlqpjsl);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_bz.returnStringRN());
            controlObj.datetime('detail_f_azrq_tbl_ld_sbb_detail_date', 'detail_f_azrq_tbl_ld_sbb_detail_date', tbl_ld_sbb_detail.f_azrq);
            controlObj.toggle('detail_f_qfzt_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_qfzt);
            controlObj.fileuploaderbind('detail_f_fj_tbl_ld_sbb_detail', tbl_ld_sbb_detail.f_fj);

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
    *  获取页面数据，返回对象tbl_ld_sbb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_sbb_detail = new Object();


            tbl_ld_sbb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_ztsbh = controlObj.text('detail_f_ztsbh_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_lxth = controlObj.text('detail_f_lxth_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_sbfz = controlObj.multidropdownlist('detail_f_sbfz_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_sbfzid = controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_sbpp = controlObj.text('detail_f_sbpp_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_mph = controlObj.text('detail_f_mph_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_sbdz = controlObj.text('detail_f_sbdz_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_synx = controlObj.text('detail_f_synx_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_sbkj = controlObj.singledropdownlist('detail_f_sbkj_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_sbkjid = controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_sblx = controlObj.singledropdownlist('detail_f_sblx_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_sblxid = controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_jllx = controlObj.singledropdownlist('detail_f_jllx_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_jllxid = controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_cszm = controlObj.text('detail_f_cszm_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_bqzm = controlObj.text('detail_f_bqzm_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_sqzm = controlObj.text('detail_f_sqzm_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_sqsl = controlObj.text('detail_f_sqsl_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_bqsl = controlObj.text('detail_f_bqsl_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_ljgl = controlObj.text('detail_f_ljgl_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_nljgl = controlObj.text('detail_f_nljgl_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_qsqpjsl = controlObj.text('detail_f_qsqpjsl_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_qlqpjsl = controlObj.text('detail_f_qlqpjsl_tbl_ld_sbb_detail');

            tbl_ld_sbb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_sbb_detail');


            tbl_ld_sbb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_azrq = controlObj.datetime('detail_f_azrq_tbl_ld_sbb_detail_date', 'detail_f_azrq_tbl_ld_sbb_detail_date');
            tbl_ld_sbb_detail.f_qfzt = controlObj.toggle('detail_f_qfzt_tbl_ld_sbb_detail');
            tbl_ld_sbb_detail.f_fj = controlObj.fileuploaderid('detail_f_fj_tbl_ld_sbb_detail');

            callBackFunction.success(tbl_ld_sbb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_sbb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_sbb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if (tbl_ld_sbb_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sbbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztsbh_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_sbb_detail.f_lxth.length < 1)
            {
                errorMessageHansMap.put('detail_f_lxth_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            if (tbl_ld_sbb_detail.f_lxth.length > 200)
            {
                errorMessageHansMap.put('detail_f_lxth_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sbfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbfz_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbpp_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_mph.length > 200)
            {
                errorMessageHansMap.put('detail_f_mph_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbdz_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_rs != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_rs))
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_rs.length < 1)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_synx.length > 200)
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_synx != "" && !/^[0-9]+$/.test(tbl_ld_sbb_detail.f_synx))
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_synx.length < 1)
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sbkj.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbkj_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sblx.length < 1)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_jllx.length > 200)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_jllxid.length < 1)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_cszm.length > 200)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_cszm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_cszm))
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_cszm.length < 1)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_bqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_bqzm))
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_bqzm.length < 1)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sqzm.length < 1)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_sqzm))
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_sqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_sqsl))
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_sqsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_bqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_bqsl))
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_bqsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_ljgl.length < 1)
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_ljgl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_ljgl))
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_nljgl.length < 1)
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_nljgl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_nljgl))
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_sbb_detail', '必须是数字');
            }


            if (tbl_ld_sbb_detail.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_qsqpjsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_qsqpjsl))
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_qsqpjsl.length < 1) {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            if (tbl_ld_sbb_detail.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_qlqpjsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_detail.f_qlqpjsl))
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_sbb_detail', '必须是数字');
            }

            if (tbl_ld_sbb_detail.f_qlqpjsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_detail.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_sbb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            if (tbl_ld_sbb_detail.f_qfzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_qfzt_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_sbb_detail.f_fj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_fj_tbl_ld_sbb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_sbb_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_synx^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_bqsl^f_ljgl^f_nljgl^f_qsqpjsl^f_qlqpjsl^f_zt^f_ztid^f_bz^f_azrq^f_fj^f_qfzt^sys_id';
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
        *  参数:tbl_ld_sbb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_sbb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_synx^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_bqsl^f_ljgl^f_nljgl^f_qsqpjsl^f_qlqpjsl^f_zt^f_ztid^f_bz^f_bqsl^f_azrq^f_qfzt^f_fj^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_sbb_detail.f_value1,

                f_value2: tbl_ld_sbb_detail.f_value2,

                f_value3: tbl_ld_sbb_detail.f_value3,

                f_value4: tbl_ld_sbb_detail.f_value4,

                f_value5: tbl_ld_sbb_detail.f_value5,

                f_value6: tbl_ld_sbb_detail.f_value6,

                f_value7: tbl_ld_sbb_detail.f_value7,

                f_value8: tbl_ld_sbb_detail.f_value8,

                f_value9: tbl_ld_sbb_detail.f_value9,

                f_value10: tbl_ld_sbb_detail.f_value10,

                f_sbbh: tbl_ld_sbb_detail.f_sbbh,

                f_ztsbh: tbl_ld_sbb_detail.f_ztsbh,

                f_lxth: tbl_ld_sbb_detail.f_lxth,

                f_sbfz: tbl_ld_sbb_detail.f_sbfz,
                f_sbfzid: tbl_ld_sbb_detail.f_sbfzid,

                f_sbpp: tbl_ld_sbb_detail.f_sbpp,

                f_mph: tbl_ld_sbb_detail.f_mph,

                f_sbdz: tbl_ld_sbb_detail.f_sbdz,

                f_khbh: tbl_ld_sbb_detail.f_khbh,

                f_rs: tbl_ld_sbb_detail.f_rs,

                f_synx: tbl_ld_sbb_detail.f_synx,

                f_sbkj: tbl_ld_sbb_detail.f_sbkj,
                f_sbkjid: tbl_ld_sbb_detail.f_sbkjid,

                f_sblx: tbl_ld_sbb_detail.f_sblx,
                f_sblxid: tbl_ld_sbb_detail.f_sblxid,

                f_jllx: tbl_ld_sbb_detail.f_jllx,
                f_jllxid: tbl_ld_sbb_detail.f_jllxid,

                f_cszm: tbl_ld_sbb_detail.f_cszm,

                f_bqzm: tbl_ld_sbb_detail.f_bqzm,

                f_sqzm: tbl_ld_sbb_detail.f_sqzm,

                f_sqsl: tbl_ld_sbb_detail.f_sqsl,

                f_ljgl: tbl_ld_sbb_detail.f_ljgl,

                f_nljgl: tbl_ld_sbb_detail.f_nljgl,

                f_qsqpjsl: tbl_ld_sbb_detail.f_qsqpjsl,

                f_qlqpjsl: tbl_ld_sbb_detail.f_qlqpjsl,

                f_zt: tbl_ld_sbb_detail.f_zt,
                f_ztid: tbl_ld_sbb_detail.f_ztid,
                f_bqsl: tbl_ld_sbb_detail.f_bqsl,

                f_azrq: tbl_ld_sbb_detail.f_azrq,
                f_qfzt: tbl_ld_sbb_detail.f_qfzt,
                f_fj: tbl_ld_sbb_detail.f_fj,
                f_bz: tbl_ld_sbb_detail.f_bz.formatStringRN(),

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
                    //commonObj.updateLog(_serverModel, tbl_ld_sbb_detail, 'tbl_ld_sbb', that._pr_sys_id, 'tbl_ld_sbb_detail', '水表信息修改程序', 'div_detail_【key】_【tablename】_detail', _clientInf, {
                    //    success: function ()
                    //    {
                            _serverModel = tbl_ld_sbb_detail;
                    //    },
                    //    fail: function ()
                    //    {
                    //        _serverModel = tbl_ld_sbb_detail;
                    //    }
                    //});
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
            *  方法:f_sbfz_onchange
            *  参数:changeEventParameter
            *  水表分组onchange事件
            */

            f_sbfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },
            /* 
            *  
            *  方法:f_sbkj_onchange
            *  参数:changeEventParameter
            *  水表口径onchange事件
            */
            f_sbkj_onchange = function (e)
            {
                var controlid = e.target.id;
            },


            /* 
            *  
            *  方法:f_sblx_onchange
            *  参数:changeEventParameter
            *  水表类型onchange事件
            */
            f_sblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },

        /* 
        *  
        *  方法:f_azrq_time_onchange
        *  参数:
        *  
        安装日期 onchange事件
        */
            f_azrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_azrq_date_onchange
        *  参数:
        *  安装日期 onchange事件
        */
            f_azrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },
        /* 
        *  
        *  方法:f_qfzt_onchange
        *  参数:event, state
        *  是否增值税切换事件
        */
            f_qfzt_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },
                           /* 
        *  
        *  方法:f_fj_onchange
        *  参数:
        *  附件 onchange事件
        */
            f_fj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_fj_tbl_ld_sbb_detail');
            },

            /* 
            *  
            *  方法:f_jllx_onchange
            *  参数:changeEventParameter
            *  计量类型onchange事件
            */
            f_jllx_onchange = function (e)
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_sbb_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_sbb_detail');

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
                    success: function (tbl_ld_sbb_detail)
                    {

                        _serverModel = tbl_ld_sbb_detail;
                        setModel(tbl_ld_sbb_detail, {
                            success: function ()
                            {

                                tbl_ld_log_modallist_Obj.bindGrid();
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
                ;
                _ladda_btn_command_save.start();
                getModel({
                    success: function (tbl_ld_sbb_detail)
                    {
                        checkModel(tbl_ld_sbb_detail, {
                            success: function (tbl_ld_sbb_detail)
                            {
                                updateData(tbl_ld_sbb_detail, {
                                    success: function ()
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show('保存成功', 'success', 2000);

                                        tbl_ld_log_modallist_Obj.bindGrid();
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
      *  方法:btn_command_log_onclick
      *  参数:
      *  查看日志按钮
      */
        btn_command_log_onclick: function ()
        {


            tbl_ld_log_modallist_Obj.bindGrid();

        },
        end: function ()
        {
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_sbb_detail_Obj.init();
});




