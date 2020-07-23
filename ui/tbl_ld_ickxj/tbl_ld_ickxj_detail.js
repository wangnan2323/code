

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_ickxj_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_ickxj.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _validateMessage_write = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_write = null,

    //读卡器端口号，默认为3
    _port = '3',

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
            //读取cookie设置端口号
            var port = getCookie('port');
            if (port != null && port != "")
            {
                _port = port;
            }
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











































        codeServiceId += "0815^";








        codeServiceId += "0816^";




        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();






                    var columnsArray = [
                      { "id": "水表编号", "text": "水表编号" },
                      { "id": "老系统号", "text": "老系统号" }
                    ];
                    _baseCodeHashMap.put('codeservice_value2', columnsArray);




































                    _baseCodeHashMap.put('codeservice_0815', resultArray['0815']);








                    _baseCodeHashMap.put('codeservice_0816', resultArray['0816']);




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




            var codeService_0815 = _baseCodeHashMap.get('codeservice_0815');








            var codeService_0816 = _baseCodeHashMap.get('codeservice_0816');



            var codeService_value2 = _baseCodeHashMap.get('codeservice_value2');


            controlObj.singledropdownlistinit('detail_f_czlx_tbl_ld_ickxj_detail', codeService_0815, f_czlx_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_ickxj_detail', codeService_0816, f_zt_onchange);


            controlObj.singledropdownlistinit('detail_f_value2_tbl_ld_ickxj_detail', codeService_value2, f_value2_onchange);

            controlObj.datetimeinit('detail_f_zkrq_tbl_ld_ickxj_detail_date', 'detail_f_zkrq_tbl_ld_ickxj_detail_time', f_zkrq_date_onchange, f_zkrq_time_onchange);


            //初始化选择客户的控件
            $('#div_container_tbl_ld_ickxj_list').load('../tbl_ld_khb/tbl_ld_khb_list_part.html', null, function ()
            {
                tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                tbl_ld_khb_list_Obj.init({
                    success: function ()
                    {
                        $('#div_container_tbl_ld_ickxj_list').css('display', '');
                        $('#div_loading_tbl_ld_ickxj_list').css('display', 'none');




                        callBackFunction.success();

                    },
                    fail: function (message)
                    {
                        _blockMessage.show('客户初始化执行失败<br/>' + message, 'fail');
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

            controlObj.textdisable('detail_f_khfz_tbl_ld_ickxj_detail', isDisable);
            
            controlObj.textdisable('detail_f_dz_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_value1_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_yslxid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_dy_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_qy_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_yhbh_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_khfzid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_dyid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_qyid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_khbhid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_yhbhid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_sc_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_cbbh_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_pq_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_yslx_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_khrq_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_scid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_pqid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_cbbhid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_sbbh_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_sbbhid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_kj_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_kjid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_sblx_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_sblxid_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_rs_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_ickxjbh_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_khbh_tbl_ld_ickxj_detail', isDisable);
            if (isDisable)
            {
                $('#btn_detail_f_khbh_tbl_ld_ickxj_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_ickxj_detail').removeAttr('disabled');
            }

            controlObj.textdisable('detail_f_yhm_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_jfm_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_dh_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_lxtkhh_tbl_ld_ickxj_detail', true);


            controlObj.singledropdownlistdisable('detail_f_czlx_tbl_ld_ickxj_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_value2_tbl_ld_ickxj_detail', isDisable);

            controlObj.textdisable('detail_f_xklx_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_xkkh_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_xkgscs_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_xkbcgsl_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_xkms_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_xkljgl_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_xkjz_tbl_ld_ickxj_detail', true);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_zkr_tbl_ld_ickxj_detail', true);

            controlObj.textdisable('detail_f_zkrid_tbl_ld_ickxj_detail', isDisable);

            controlObj.datetimedisable('detail_f_zkrq_tbl_ld_ickxj_detail_date', 'detail_f_zkrq_tbl_ld_ickxj_detail_time', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_ickxj_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_ickxj_detail').addClass('hidden');
                $('#btn_command_write_tbl_ld_ickxj_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_ickxj_detail').removeClass('hidden');
                $('#btn_command_write_tbl_ld_ickxj_detail').removeClass('hidden');
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
    *  参数:tbl_ld_ickxj_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_ickxj_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value1);


            controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value2);
            
            

            controlObj.text('detail_f_value3_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_value10);

            controlObj.text('detail_f_khfz_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_khfz);

            controlObj.text('detail_f_dz_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_dz);

            controlObj.text('detail_f_yslxid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_yslxid);

            controlObj.text('detail_f_dy_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_dy);

            controlObj.text('detail_f_qy_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_qy);

            controlObj.text('detail_f_yhbh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_yhbh);

            controlObj.text('detail_f_khfzid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_khfzid);

            controlObj.text('detail_f_dyid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_dyid);

            controlObj.text('detail_f_qyid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_qyid);

            controlObj.text('detail_f_khbhid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_khbhid);

            controlObj.text('detail_f_yhbhid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_yhbhid);

            controlObj.text('detail_f_sc_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_sc);

            controlObj.text('detail_f_cbbh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_cbbh);

            controlObj.text('detail_f_pq_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_pq);

            controlObj.text('detail_f_yslx_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_yslx);

            controlObj.text('detail_f_khrq_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_khrq);

            controlObj.text('detail_f_scid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_scid);

            controlObj.text('detail_f_pqid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_pqid);

            controlObj.text('detail_f_cbbhid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_cbbhid);

            controlObj.text('detail_f_sbbh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_sbbh);

            controlObj.text('detail_f_sbbhid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_sbbhid);

            controlObj.text('detail_f_kj_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_kj);

            controlObj.text('detail_f_kjid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_kjid);

            controlObj.text('detail_f_sblx_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_sblx);

            controlObj.text('detail_f_sblxid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_sblxid);

            controlObj.text('detail_f_rs_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_rs);

            controlObj.text('detail_f_ickxjbh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_ickxjbh);

            controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_khbh);

            controlObj.text('detail_f_yhm_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_yhm);

            controlObj.text('detail_f_jfm_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_jfm);

            controlObj.text('detail_f_dh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_dh);

            controlObj.text('detail_f_lxtkhh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_lxtkhh);

            controlObj.singledropdownlistid('detail_f_czlx_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_czlxid);

            controlObj.text('detail_f_xklx_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xklx);

            controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xkkh);

            controlObj.text('detail_f_xkgscs_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xkgscs);

            controlObj.text('detail_f_xkbcgsl_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xkbcgsl);

            controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xkms);

            controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xkljgl);

            controlObj.text('detail_f_xkjz_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_xkjz);

            var ztid = tbl_ld_ickxj_detail.f_ztid;

            //if (ztid == null || ztid == "")
            //{
            //    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickxj_detail', '08160001');

            //    controlObj.text('detail_f_zkr_tbl_ld_ickxj_detail', basePageObj._userInfoJson.sys_username);

            //    controlObj.text('detail_f_zkrid_tbl_ld_ickxj_detail', basePageObj._userInfoJson.sys_userid);

            //}
            //else
            //{
                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_ztid);

                controlObj.text('detail_f_zkr_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_zkr);

                controlObj.text('detail_f_zkrid_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_zkrid);

            //}

            controlObj.datetime('detail_f_zkrq_tbl_ld_ickxj_detail_date', 'detail_f_zkrq_tbl_ld_ickxj_detail_time', tbl_ld_ickxj_detail.f_zkrq);
            controlObj.text('detail_f_bz_tbl_ld_ickxj_detail', tbl_ld_ickxj_detail.f_bz.returnStringRN());

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
    *  获取页面数据，返回对象tbl_ld_ickxj_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_ickxj_detail = new Object();


            tbl_ld_ickxj_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value2 = controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_khfz = controlObj.text('detail_f_khfz_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_yslxid = controlObj.text('detail_f_yslxid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_khfzid = controlObj.text('detail_f_khfzid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_yslx = controlObj.text('detail_f_yslx_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_khrq = controlObj.text('detail_f_khrq_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_cbbhid = controlObj.text('detail_f_cbbhid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_kj = controlObj.text('detail_f_kj_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_kjid = controlObj.text('detail_f_kjid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_ickxjbh = controlObj.text('detail_f_ickxjbh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_lxtkhh = controlObj.text('detail_f_lxtkhh_tbl_ld_ickxj_detail');

            tbl_ld_ickxj_detail.f_czlx = controlObj.singledropdownlist('detail_f_czlx_tbl_ld_ickxj_detail');
            tbl_ld_ickxj_detail.f_czlxid = controlObj.singledropdownlistid('detail_f_czlx_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xklx = controlObj.text('detail_f_xklx_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xkgscs = controlObj.text('detail_f_xkgscs_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xkbcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xkms = controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xkljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_xkjz = controlObj.text('detail_f_xkjz_tbl_ld_ickxj_detail');

            tbl_ld_ickxj_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_ickxj_detail');
            tbl_ld_ickxj_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickxj_detail');


            tbl_ld_ickxj_detail.f_zkr = controlObj.text('detail_f_zkr_tbl_ld_ickxj_detail');

            tbl_ld_ickxj_detail.f_zkrid = controlObj.text('detail_f_zkrid_tbl_ld_ickxj_detail');

            tbl_ld_ickxj_detail.f_zkrq = controlObj.datetime('detail_f_zkrq_tbl_ld_ickxj_detail_date', 'detail_f_zkrq_tbl_ld_ickxj_detail_time');


            tbl_ld_ickxj_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_ickxj_detail');

            callBackFunction.success(tbl_ld_ickxj_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_ickxj_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_ickxj_detail,validateMessage, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_ickxj_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_khfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_dz.length > 200)
            {
                errorMessageHansMap.put('detail_f_dz_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_yslxid.length > 200)
            {
                errorMessageHansMap.put('detail_f_yslxid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_dy.length > 200)
            {
                errorMessageHansMap.put('detail_f_dy_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_qy.length > 200)
            {
                errorMessageHansMap.put('detail_f_qy_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_khfzid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfzid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_dyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_dyid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_qyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_qyid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_khbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_yhbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_sc.length > 200)
            {
                errorMessageHansMap.put('detail_f_sc_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_pq.length > 200)
            {
                errorMessageHansMap.put('detail_f_pq_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_yslx.length > 200)
            {
                errorMessageHansMap.put('detail_f_yslx_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_khrq.length > 200)
            {
                errorMessageHansMap.put('detail_f_khrq_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_scid.length > 200)
            {
                errorMessageHansMap.put('detail_f_scid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_pqid.length > 200)
            {
                errorMessageHansMap.put('detail_f_pqid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_sbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_kj.length > 200)
            {
                errorMessageHansMap.put('detail_f_kj_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_kjid.length > 200)
            {
                errorMessageHansMap.put('detail_f_kjid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblxid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_ickxjbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ickxjbh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_yhm.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_jfm.length > 200)
            {
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_dh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_lxtkhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_lxtkhh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_czlx.length > 200)
            {
                errorMessageHansMap.put('detail_f_czlx_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_czlx.length < 1)
            {
                errorMessageHansMap.put('detail_f_czlx_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_xklx.length > 200)
            {
                errorMessageHansMap.put('detail_f_xklx_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_xklx.length < 1)
            {
                errorMessageHansMap.put('detail_f_xklx_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_xkkh.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_xkkh.length < 1)
            {
                errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            var flag = true;
            var filter = ",0000554,0000577,0001905,0001705,0001753,0002796,0002566,0002435,0002694,0004901,0002329,0003996,0005265,0000710,0001560,0001804,0001582,0001205,0002867,0004477,2000523,3000188,0001391,0001432,0001214,0002107,0000123,0005614,0002893,0005864,0002722,0001098,0001104,0000959,0001647,0001453,0000610,0005737,0005621,0004772,0004755,0004787,0001670,0002076,0003628,0004692,0002738,0200181,0007003,0000896,0000523,0000806,0001738,0002198,0002870,0002706,0001294,0004273,0005645,0000715,0001121,0001815,0001491,0002691,0004210,0003785,0002736,2000034,";

            if (filter.indexOf("," + tbl_ld_ickxj_detail.f_xkkh.substring(1, tbl_ld_ickxj_detail.f_xkkh.length) + ",") != -1 && flag)
            {
                errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ickxj_detail', '老系统号重复，请联系管理员');
            }




            if (tbl_ld_ickxj_detail.f_xkgscs.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkgscs_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_xkbcgsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkbcgsl_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_xkbcgsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_xkbcgsl_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_xkms.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkms_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_xkms.length < 1)
            {
                errorMessageHansMap.put('detail_f_xkms_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_xkljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkljgl_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_xkljgl.length < 1)
            {
                errorMessageHansMap.put('detail_f_xkljgl_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_xkjz.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkjz_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_ickxj_detail.f_zkr.length > 200)
            {
                errorMessageHansMap.put('detail_f_zkr_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_zkrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_zkrid_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ickxj_detail.f_zkr.length < 1)
            {
                errorMessageHansMap.put('detail_f_zkr_tbl_ld_ickxj_detail', '长度不能小于<a style="color:red">1</a>个字');
            }







            if (tbl_ld_ickxj_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_ickxj_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                validateMessage.hidden();
                callBackFunction.success(tbl_ld_ickxj_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }

    },

        /* 
    *  
    *  清空控件
    */
    clearModel = function ()
    {
        try
        {

            controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_yhbh_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_sbbh_tbl_ld_ickxj_detail', '');


            controlObj.text('detail_f_jfm_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_yhm_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_dh_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_dz_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_value1_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_yslx_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_sblx_tbl_ld_ickxj_detail', '');


            controlObj.text('detail_f_khbhid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_yhbhid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_dy_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_dyid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_sc_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_scid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_qy_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_qyid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_pq_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_pqid_tbl_ld_ickxj_detail', '');


            controlObj.text('detail_f_sbbhid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_yslxid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_lxtkhh_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_sblxid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_rs_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_khfz_tbl_ld_ickxj_detail', '');
            controlObj.text('detail_f_khfzid_tbl_ld_ickxj_detail', '');
            controlObj.text('detail_f_cbbh_tbl_ld_ickxj_detail', '');
            controlObj.text('detail_f_cbbhid_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_kj_tbl_ld_ickxj_detail', '');
            controlObj.text('detail_f_kjid_tbl_ld_ickxj_detail', '');
            controlObj.text('detail_f_khrq_tbl_ld_ickxj_detail', '');


            controlObj.text('detail_f_xklx_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_xkgscs_tbl_ld_ickxj_detail', '');

            controlObj.text('detail_f_xkbcgsl_tbl_ld_ickxj_detail', '');


            controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', '');


            controlObj.text('detail_f_xkjz_tbl_ld_ickxj_detail', '');


            controlObj.singledropdownlistid('detail_f_czlx_tbl_ld_ickxj_detail', '');

            controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ickxj_detail', '');

            _validateMessage.hidden();


        }
        catch (ex)
        {
            _blockMessage.show('clearModel执行失败<br/>' + ex.message, 'fail');
        }
    },

            //写卡方法
                writeCardAndSetModel = function (tbl_ld_ickxj_detail, callBackFunction)
                {
                    var date = new Date();
                    tbl_ld_ickxj_detail.f_zkr = basePageObj._userInfoJson.sys_username;
                    tbl_ld_ickxj_detail.f_zkrid = basePageObj._userInfoJson.sys_userid;
                    tbl_ld_ickxj_detail.f_zkrq = date.Format('yyyy-MM-dd hh:mm:ss');
                    tbl_ld_ickxj_detail.f_ztid = "08160002";
                    tbl_ld_ickxj_detail.f_zt = '已完成';
                    controlObj.text('detail_f_zkr_tbl_ld_ickxj_detail', basePageObj._userInfoJson.sys_username);
                    controlObj.text('detail_f_zkrid_tbl_ld_ickxj_detail', basePageObj._userInfoJson.sys_userid);
                    controlObj.datetime('detail_f_zkrq_tbl_ld_ickxj_detail_date', 'detail_f_zkrq_tbl_ld_ickxj_detail_time', date.Format('yyyy-MM-dd hh:mm:ss'));
                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', '08160002'); //状态
                    callBackFunction.success(tbl_ld_ickxj_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_dz^f_yslxid^f_dy^f_qy^f_yhbh^f_dyid^f_qyid^f_khbhid^f_yhbhid^f_sc^f_pq^f_yslx^f_khrq^f_scid^f_pqid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_sbbh^f_sbbhid^f_kj^f_kjid^f_sblx^f_sblxid^f_rs^f_ickxjbh^f_khbh^f_yhm^f_jfm^f_dh^f_lxtkhh^f_czlx^f_czlxid^f_xklx^f_xkkh^f_xkgscs^f_xkbcgsl^f_xkms^f_xkljgl^f_xkjz^f_zt^f_ztid^f_zkr^f_zkrid^f_zkrq^f_bz^sys_id';
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
        *  参数:tbl_ld_ickxj_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_ickxj_detail, type, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_dz^f_yslxid^f_dy^f_qy^f_yhbh^f_dyid^f_qyid^f_khbhid^f_yhbhid^f_sc^f_pq^f_yslx^f_khrq^f_scid^f_pqid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_sbbh^f_sbbhid^f_kj^f_kjid^f_sblx^f_sblxid^f_rs^f_ickxjbh^f_khbh^f_yhm^f_jfm^f_dh^f_lxtkhh^f_czlx^f_czlxid^f_xklx^f_xkkh^f_xkgscs^f_xkbcgsl^f_xkms^f_xkljgl^f_xkjz^f_zt^f_ztid^f_zkr^f_zkrid^f_zkrq^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_ickxj_detail.f_value1,

                f_value2: tbl_ld_ickxj_detail.f_value2,

                f_value3: tbl_ld_ickxj_detail.f_value3,

                f_value4: tbl_ld_ickxj_detail.f_value4,

                f_value5: tbl_ld_ickxj_detail.f_value5,

                f_value6: tbl_ld_ickxj_detail.f_value6,

                f_value7: tbl_ld_ickxj_detail.f_value7,

                f_value8: tbl_ld_ickxj_detail.f_value8,

                f_value9: tbl_ld_ickxj_detail.f_value9,

                f_value10: tbl_ld_ickxj_detail.f_value10,

                f_khfz: tbl_ld_ickxj_detail.f_khfz,

                f_dz: tbl_ld_ickxj_detail.f_dz,

                f_yslxid: tbl_ld_ickxj_detail.f_yslxid,

                f_dy: tbl_ld_ickxj_detail.f_dy,

                f_qy: tbl_ld_ickxj_detail.f_qy,

                f_yhbh: tbl_ld_ickxj_detail.f_yhbh,

                f_khfzid: tbl_ld_ickxj_detail.f_khfzid,

                f_dyid: tbl_ld_ickxj_detail.f_dyid,

                f_qyid: tbl_ld_ickxj_detail.f_qyid,

                f_khbhid: tbl_ld_ickxj_detail.f_khbhid,

                f_yhbhid: tbl_ld_ickxj_detail.f_yhbhid,

                f_sc: tbl_ld_ickxj_detail.f_sc,

                f_cbbh: tbl_ld_ickxj_detail.f_cbbh,

                f_pq: tbl_ld_ickxj_detail.f_pq,

                f_yslx: tbl_ld_ickxj_detail.f_yslx,

                f_khrq: tbl_ld_ickxj_detail.f_khrq,

                f_scid: tbl_ld_ickxj_detail.f_scid,

                f_pqid: tbl_ld_ickxj_detail.f_pqid,

                f_cbbhid: tbl_ld_ickxj_detail.f_cbbhid,

                f_sbbh: tbl_ld_ickxj_detail.f_sbbh,

                f_sbbhid: tbl_ld_ickxj_detail.f_sbbhid,

                f_kj: tbl_ld_ickxj_detail.f_kj,

                f_kjid: tbl_ld_ickxj_detail.f_kjid,

                f_sblx: tbl_ld_ickxj_detail.f_sblx,

                f_sblxid: tbl_ld_ickxj_detail.f_sblxid,

                f_rs: tbl_ld_ickxj_detail.f_rs,

                f_ickxjbh: tbl_ld_ickxj_detail.f_ickxjbh,

                f_khbh: tbl_ld_ickxj_detail.f_khbh,

                f_yhm: tbl_ld_ickxj_detail.f_yhm,

                f_jfm: tbl_ld_ickxj_detail.f_jfm,

                f_dh: tbl_ld_ickxj_detail.f_dh,

                f_lxtkhh: tbl_ld_ickxj_detail.f_lxtkhh,

                f_czlx: tbl_ld_ickxj_detail.f_czlx,
                f_czlxid: tbl_ld_ickxj_detail.f_czlxid,

                f_xklx: tbl_ld_ickxj_detail.f_xklx,

                f_xkkh: tbl_ld_ickxj_detail.f_xkkh,

                f_xkgscs: tbl_ld_ickxj_detail.f_xkgscs,

                f_xkbcgsl: tbl_ld_ickxj_detail.f_xkbcgsl,

                f_xkms: tbl_ld_ickxj_detail.f_xkms,

                f_xkljgl: tbl_ld_ickxj_detail.f_xkljgl,

                f_xkjz: tbl_ld_ickxj_detail.f_xkjz,

                f_zt: tbl_ld_ickxj_detail.f_zt,
                f_ztid: tbl_ld_ickxj_detail.f_ztid,

                f_zkr: tbl_ld_ickxj_detail.f_zkr,

                f_zkrid: tbl_ld_ickxj_detail.f_zkrid,

                f_zkrq: tbl_ld_ickxj_detail.f_zkrq,

                f_bz: tbl_ld_ickxj_detail.f_bz.formatStringRN(),

                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = {
                columns: columns,
                clientInf: _clientInf,
                type: type,
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
            *  方法:f_czlx_onchange
            *  参数:changeEventParameter
            *  操作类型onchange事件
            */
            f_czlx_onchange = function (e)
            {

                var czlxid = controlObj.singledropdownlistid('detail_f_czlx_tbl_ld_ickxj_detail');
                if (czlxid == "08150001")
                {
                    controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail', '2');
                    controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', '0');
                }
                else if (czlxid == "08150002")
                {

                    controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail', '3');

                    var khbh = controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail');
                    if (khbh != null && khbh != "")
                    {
                        //获取客户信息
                        var sqlStringsJson = {
                            "tbl_ld_khb": "select * from TBL_LD_KHB where sys_delflag='0' and f_ztid='0' and f_khbh='" + khbh + "'"
                        };

                        commonObj.querySqls(sqlStringsJson, {
                            success: function (resultJson)
                            {
                                if (resultJson["tbl_ld_khb"].length > 0)
                                {

                                    resultJson = resultJson["tbl_ld_khb"][0];



                                    if (resultJson["f_ickljgl"] != null && resultJson["f_ickljgl"] != "")
                                    {
                                        controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', resultJson["f_ickljgl"]);
                                    }
                                    else
                                    {
                                        controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', '0');
                                    }




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


                }

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
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_value2_onchange = function (e)
            {
                
                var f_value2 = controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ickxj_detail');
                if (f_value2 == "水表编号")
                {
                    var khbh = controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail');

                    if (khbh != null && khbh != "")
                    {
                        //获取客户信息
                        var sqlStringsJson = {
                            "tbl_ld_khb": "select * from TBL_LD_KHB where sys_delflag='0' and f_ztid='0' and f_khbh='" + khbh + "'"
                        };

                        commonObj.querySqls(sqlStringsJson, {
                            success: function (resultJson)
                            {
                                if (resultJson["tbl_ld_khb"].length > 0)
                                {

                                    controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail', "0" + resultJson["tbl_ld_khb"][0]["f_sbbh"].substring(resultJson["tbl_ld_khb"][0]["f_sbbh"].length - 7));

                                }
                                else
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
                        _alertMessage.show("请先选择客户", "fail");
                    }

                    
                }
                else if (f_value2 == "老系统号")
                {
                    var khbh = controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail');

                    if (khbh != null && khbh != "")
                    {
                        //获取客户信息
                        var sqlStringsJson = {
                            "tbl_ld_khb": "select * from TBL_LD_KHB where sys_delflag='0' and f_ztid='0' and f_khbh='" + khbh + "'"
                        };

                        commonObj.querySqls(sqlStringsJson, {
                            success: function (resultJson)
                            {
                                if (resultJson["tbl_ld_khb"].length > 0)
                                {
                                    var lxth = resultJson["tbl_ld_khb"][0]["f_lxth"];
                                    if (lxth != null && lxth != "")
                                    {
                                        while (lxth.length < 8)
                                        {
                                            lxth = "0" + lxth;
                                        }
                                        controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail', lxth);
                                    }
                                    else
                                    {
                                        controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail', "");
                                        _alertMessage.show("该用户老系统号不存在", "fail");
                                    }
                                }
                                else
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
                        _alertMessage.show("请先选择客户", "fail");
                    }



                }
            },




        /* 
        *  
        *  方法:f_zkrq_time_onchange
        *  参数:
        *  制卡日期 onchange事件
        */
            f_zkrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_zkrq_date_onchange
        *  参数:
        *  制卡日期 onchange事件
        */
            f_zkrq_date_onchange = function (e)
            {
                var controlid = e.target.id
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_ickxj_detail');

                                                        _validateMessage_write = new validateMessage('btn_command_write_tbl_ld_ickxj_detail');
                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_ickxj_detail');
                                                        _ladda_btn_command_write = Ladda.create('btn_command_write_tbl_ld_ickxj_detail');

                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        $('#div_container_iccard').load('../iccard/iccard_part.html', null, function ()
                                                        {
                                                            iccard_part_Obj._pr_pagetype = that._pr_pagetype;
                                                            iccard_part_Obj.init({
                                                                success: function (message)
                                                                {
                                                                    $('#div_container_iccard').css('display', '');
                                                                    $('#div_loading_iccard').css('display', 'none');

                                                                    _blockMessage.hidden();
                                                                },
                                                                fail: function (message)
                                                                {
                                                                    _blockMessage.show(message, 'fail');
                                                                }
                                                            });

                                                        });


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
                    success: function (tbl_ld_ickxj_detail)
                    {
                        setModel(tbl_ld_ickxj_detail, {
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
                    success: function (tbl_ld_ickxj_detail)
                    {
                        checkModel(tbl_ld_ickxj_detail,_validateMessage, {
                            success: function (tbl_ld_ickxj_detail)
                            {
                                updateData(tbl_ld_ickxj_detail, 'pt', {
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


        //选择客户用的
        btn_command_opensearch_onclick: function ()
        {


            var khbh = controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail');

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
            //alert(khbh);
            $('#div_search_modal_tbl_ld_ickxj_detail').modal('show');

        },
        //选定用户
        btn_search_modal_search_onclick: function ()
        {

            clearModel();
            //$('#div_search_modal_tbl_ld_jfb_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                var khbh = idArray[0];

                //获取客户信息
                var sqlStringsJson = {
                    "tbl_ld_khb": "select * from TBL_LD_KHB where sys_delflag='0' and f_ztid='0' and SYS_ID='" + khbh + "'"
                };

                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        if (resultJson["tbl_ld_khb"].length > 0)
                        {

                            resultJson = resultJson["tbl_ld_khb"][0];

                            controlObj.text('detail_f_khbh_tbl_ld_ickxj_detail', resultJson["f_khbh"]);

                            controlObj.text('detail_f_yhbh_tbl_ld_ickxj_detail', resultJson["f_yhbh"]);

                            controlObj.text('detail_f_sbbh_tbl_ld_ickxj_detail', resultJson["f_sbbh"]);


                            controlObj.text('detail_f_jfm_tbl_ld_ickxj_detail', resultJson["f_jfm"]);

                            controlObj.text('detail_f_yhm_tbl_ld_ickxj_detail', resultJson["f_yhm"]);

                            controlObj.text('detail_f_dh_tbl_ld_ickxj_detail', resultJson["f_dh"]);

                            controlObj.text('detail_f_dz_tbl_ld_ickxj_detail', resultJson["f_dz"]);

                            controlObj.text('detail_f_value1_tbl_ld_ickxj_detail', resultJson["f_sbdz"]);

                            controlObj.text('detail_f_yslx_tbl_ld_ickxj_detail', resultJson["f_yslx"]);

                            controlObj.text('detail_f_sblx_tbl_ld_ickxj_detail', resultJson["f_sblx"]);


                            controlObj.text('detail_f_khbhid_tbl_ld_ickxj_detail', resultJson["sys_id"]);

                            controlObj.text('detail_f_yhbhid_tbl_ld_ickxj_detail', resultJson["f_yhbhid"]);

                            controlObj.text('detail_f_dy_tbl_ld_ickxj_detail', resultJson["f_dy"]);

                            controlObj.text('detail_f_dyid_tbl_ld_ickxj_detail', resultJson["f_dyid"]);

                            controlObj.text('detail_f_sc_tbl_ld_ickxj_detail', resultJson["f_sc"]);

                            controlObj.text('detail_f_scid_tbl_ld_ickxj_detail', resultJson["f_scid"]);

                            controlObj.text('detail_f_qy_tbl_ld_ickxj_detail', resultJson["f_qy"]);

                            controlObj.text('detail_f_qyid_tbl_ld_ickxj_detail', resultJson["f_qyid"]);

                            controlObj.text('detail_f_pq_tbl_ld_ickxj_detail', resultJson["f_pq"]);

                            controlObj.text('detail_f_pqid_tbl_ld_ickxj_detail', resultJson["f_pqid"]);


                            controlObj.text('detail_f_sbbhid_tbl_ld_ickxj_detail', resultJson["f_sbbhid"]);

                            controlObj.text('detail_f_yslxid_tbl_ld_ickxj_detail', resultJson["f_yslxid"]);

                            controlObj.text('detail_f_lxtkhh_tbl_ld_ickxj_detail', resultJson["f_lxth"]);

                            controlObj.text('detail_f_sblxid_tbl_ld_ickxj_detail', resultJson["f_sblxid"]);

                            controlObj.text('detail_f_rs_tbl_ld_ickxj_detail', resultJson["f_rs"]);

                            controlObj.text('detail_f_khfz_tbl_ld_ickxj_detail', resultJson["f_khfz"]);
                            controlObj.text('detail_f_khfzid_tbl_ld_ickxj_detail', resultJson["f_khfzid"]);
                            controlObj.text('detail_f_cbbh_tbl_ld_ickxj_detail', resultJson["f_cbbh"]);
                            controlObj.text('detail_f_cbbhid_tbl_ld_ickxj_detail', resultJson["f_cbbhid"]);

                            controlObj.text('detail_f_kj_tbl_ld_ickxj_detail', resultJson["f_sbkj"]);
                            controlObj.text('detail_f_kjid_tbl_ld_ickxj_detail', resultJson["f_sbkjid"]);
                            controlObj.text('detail_f_khrq_tbl_ld_ickxj_detail', resultJson["f_khrq"]);

                            controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ickxj_detail', "水表编号");

                            controlObj.text('detail_f_xklx_tbl_ld_ickxj_detail', '0');

                            controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail', "0" + resultJson["f_sbbh"].substring(resultJson["f_sbbh"].length - 7));

                            


                            controlObj.text('detail_f_xkgscs_tbl_ld_ickxj_detail', '0');

                            controlObj.text('detail_f_xkbcgsl_tbl_ld_ickxj_detail', '0');

                            if (resultJson["f_ickljgl"] != null && resultJson["f_ickljgl"] != "")
                            {
                                controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', resultJson["f_ickljgl"]);
                            }
                            else
                            {
                                controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', '0');
                            }


                            if (resultJson["f_sblxid"] == "12")
                            {
                                controlObj.text('detail_f_xkjz_tbl_ld_ickxj_detail', '0');
                            }
                            else if (resultJson["f_sblxid"] == "13")
                            {
                                controlObj.text('detail_f_xkjz_tbl_ld_ickxj_detail', '1');
                            }
                            else
                            {
                                _alertMessage.show('水表类型不是IC卡水表，不能执行新建操作', 'fail');
                            }

                            var czlx = controlObj.singledropdownlistid("detail_f_czlx_tbl_ld_ickxj_detail");
                            if (czlx != null && czlx != "")
                            {
                                if (czlx == "08150001")
                                {
                                    controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail', '2');
                                    controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail', '0');
                                }
                                else
                                {
                                    controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail', '3');
                                }

                            }


                            $('#div_search_modal_tbl_ld_ickxj_detail').modal('hide');


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

        btn_search_modal_cancle_onclick: function ()
        {
            $('#div_search_modal_tbl_ld_ickxj_detail').modal('hide');
        },

        //===================通用写卡方法、==================

        btn_command_write_onclick: function ()
        {

            var validate = _validateMessage_write;
            var ladda = _ladda_btn_command_write;

            try
            {
                ladda.start();
                getModel({
                    success: function (tbl_ld_ickxj_detail)
                    {
                        checkModel(tbl_ld_ickxj_detail, validate, {
                            success: function (tbl_ld_ickxj_detail)
                            {
                                writeCardAndSetModel(tbl_ld_ickxj_detail, {
                                    success: function (tbl_ld_ickxj_detail)
                                    {
                                        updateData(tbl_ld_ickxj_detail, 'xk', {
                                            success: function ()
                                            {

                                                var xklx = controlObj.text('detail_f_xklx_tbl_ld_ickxj_detail');
                                                var xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ickxj_detail');
                                                var gscs = controlObj.text('detail_f_xkgscs_tbl_ld_ickxj_detail');
                                                var bcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ickxj_detail');
                                                var xkms = controlObj.text('detail_f_xkms_tbl_ld_ickxj_detail');
                                                var ljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ickxj_detail');
                                                var jzlx = controlObj.text('detail_f_xkjz_tbl_ld_ickxj_detail');

                                                iccard_part_Obj.command({ "commandName": "write", "port": _port, "xklx": xklx, "mcardno": xkkh, "mgscs": gscs, "mbcgsl": bcgsl, "mCzmode": xkms, "mljgl": ljgl, "Mediatype": jzlx }, {
                                                    success: function (messageJson)
                                                    {

                                                        if (messageJson.result == 'true')
                                                        {



                                                            ladda.stop();
                                                            _alertMessage.show('新建IC卡成功', 'success', 2000);


                                                            setDisable(true);

                                                        } else
                                                        {
                                                            ladda.stop();
                                                            _alertMessage.show('新建IC卡失败,请使用IC卡工具进行端口设置', 'fail');
                                                        }

                                                    }, fail: function (message)
                                                    {
                                                        ladda.stop();
                                                        _alertMessage.show('新建IC卡异常' + message, 'fail');
                                                    }
                                                });


                                            },
                                            fail: function (message)
                                            {
                                                ladda.stop();
                                                _alertMessage.show('提交失败', 'fail');
                                                _resultMessage.show(message);
                                            }
                                        });
                                    }
                                });


                            },
                            fail: function (message)
                            {
                                ladda.stop();
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
                        ladda.stop();
                        _alertMessage.show('数据获取失败', 'warning');
                        _resultMessage.show(message);
                    }
                });
            }
            catch (ex)
            {
                ladda.stop();
                _alertMessage.show('提交程序异常。', 'fail');
                _resultMessage.show('提交程序异常<br/>' + ex.message, 'fail');
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
    tbl_ld_ickxj_detail_Obj.init();
});




