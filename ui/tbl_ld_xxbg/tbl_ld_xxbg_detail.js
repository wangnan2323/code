

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;
var _khJson = null;
var _khbh = null;
var tbl_ld_xxbg_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xxbg.asmx/',
         _serviceUrl_kh = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _validateMessage_submit = null,

    _ladda_btn_command_save = null,
    _ladda_btn_command_submit = null,
         //_khxx = null,
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
            that._pr_bglxid = requestQuery('bglxid');
            that._pr_bglx = requestQuery('bglx');
            that._pr_isadmin = requestQuery('isadmin');

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

        codeServiceId += "0470^";


        codeServiceId += "0471^";

        codeServiceId += "0472^";


        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();



                    _baseCodeHashMap.put('codeservice_0470', resultArray['0470']);


                    _baseCodeHashMap.put('codeservice_0471', resultArray['0471']);

                    _baseCodeHashMap.put('codeservice_0472', resultArray['0472']);


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












            var codeService_0470 = _baseCodeHashMap.get('codeservice_0470');










            var codeService_0471 = _baseCodeHashMap.get('codeservice_0471');

            var codeService_0472 = _baseCodeHashMap.get('codeservice_0472');


























            controlObj.singledropdownlistinit('detail_f_bglx_tbl_ld_xxbg_detail', codeService_0470, f_bglx_onchange);







            controlObj.fileuploaderinit('detail_f_bgyj_tbl_ld_xxbg_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_bgyj_onchange);





            controlObj.datetimeinit('detail_f_fqsj_tbl_ld_xxbg_detail_date', 'detail_f_fqsj_tbl_ld_xxbg_detail_time', f_fqsj_date_onchange, f_fqsj_time_onchange);





            controlObj.datetimeinit('detail_f_xgsj_tbl_ld_xxbg_detail_date', 'detail_f_xgsj_tbl_ld_xxbg_detail_time', f_xgsj_date_onchange, f_xgsj_time_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_xxbg_detail', codeService_0471, f_zt_onchange);


            controlObj.singledropdownlistinit('detail_f_ly_tbl_ld_xxbg_detail', codeService_0472, f_ly_onchange);





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
            var isDisable = false;
            var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xxbg_detail');
            switch (ztid)
            {
                //新建
                case "0":
                    break;
                    //提交
                case "1":
                    $('#btn_command_save_tbl_ld_xxbg_detail').addClass('hidden');
                    $('#btn_command_submit_tbl_ld_xxbg_detail').addClass('hidden');
                    isDisable = true;
                    break;
            }



            controlObj.textdisable('detail_f_khbh_tbl_ld_xxbg_detail', true);
            controlObj.textdisable('detail_f_khbhid_tbl_ld_xxbg_detail', isDisable);
            controlObj.textdisable('detail_f_yhm_tbl_ld_xxbg_detail', true);
            controlObj.textdisable('detail_f_dz_tbl_ld_xxbg_detail', true);
            controlObj.textdisable('detail_f_sbdz_tbl_ld_xxbg_detail', true);
            controlObj.textdisable('detail_f_bgmc_tbl_ld_xxbg_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_bglx_tbl_ld_xxbg_detail', true);


            controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xxbg_detail', isDisable);

            controlObj.textdisable('detail_f_bgyy_tbl_ld_xxbg_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_bgyj_tbl_ld_xxbg_detail', isDisable);

            controlObj.textdisable('detail_f_fqr_tbl_ld_xxbg_detail', true);

            controlObj.textdisable('detail_f_fqrid_tbl_ld_xxbg_detail', true);

            controlObj.datetimedisable('detail_f_fqsj_tbl_ld_xxbg_detail_date', 'detail_f_fqsj_tbl_ld_xxbg_detail_time', true);

            controlObj.textdisable('detail_f_xgr_tbl_ld_xxbg_detail', true);

            controlObj.textdisable('detail_f_xgrid_tbl_ld_xxbg_detail', true);

            controlObj.datetimedisable('detail_f_xgsj_tbl_ld_xxbg_detail_date', 'detail_f_xgsj_tbl_ld_xxbg_detail_time', true);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_xxbg_detail', true);


            controlObj.singledropdownlistdisable('detail_f_ly_tbl_ld_xxbg_detail', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_xxbg_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_xxbg_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_xxbg_detail').removeClass('hidden');
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
    *  参数:tbl_ld_xxbg_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_xxbg_detail, callBackFunction)
    {
        try
        {
            //f_khxx 取出用户名和地址
            var khxx_zx = tbl_ld_xxbg_detail.f_khxx;
            var khxx_zxArr = khxx_zx.split(",");
            controlObj.text('detail_f_yhm_tbl_ld_xxbg_detail', khxx_zxArr[0]);
            controlObj.text('detail_f_dz_tbl_ld_xxbg_detail', khxx_zxArr[1]);
            controlObj.text('detail_f_sbdz_tbl_ld_xxbg_detail', khxx_zxArr[2]);
            ////如果setmodel 时  客户编号的值不为空，取出数据库中的json值
            if (khxx_zx != null && khxx_zx != "" && tbl_ld_xxbg_detail.f_khjson != "")
            {
                var messageJson = (new Function("", "return " + tbl_ld_xxbg_detail.f_khjson))();

                var khxx = (new Function("", "return " + messageJson["khxx"]))();
                var yhxx = (new Function("", "return " + messageJson["yhxx"]))();
                var sbxx = (new Function("", "return " + messageJson["sbxx"]))();

                tbl_ld_xxbg_detail_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                tbl_ld_xxbg_detail_Obj._khJson["khxx"] = khxx[0];
                tbl_ld_xxbg_detail_Obj._khJson["yhxx"] = yhxx[0];
                tbl_ld_xxbg_detail_Obj._khJson["sbxx"] = sbxx[0];
            }
            var khbh = tbl_ld_xxbg_detail.f_khbh;
            if (khbh != "" && khbh != null)
            {
                tbl_ld_xxbg_detail_Obj._khbh = khbh;
            }
            controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_khbh);
            controlObj.text('detail_f_khbhid_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_khbhid);

            controlObj.text('detail_f_value1_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_value10);

            controlObj.text('detail_f_bgmc_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_bgmc);

            controlObj.singledropdownlistid('detail_f_bglx_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_bglxid);

            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_lyid);

            controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.fk_tbl_maintable_sys_id);

            controlObj.text('detail_f_bgyy_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_bgyy.returnStringRN());

            controlObj.fileuploaderbind('detail_f_bgyj_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_bgyj);

            controlObj.text('detail_f_fqr_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_fqr);

            controlObj.text('detail_f_fqrid_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_fqrid);


            controlObj.datetime('detail_f_fqsj_tbl_ld_xxbg_detail_date', 'detail_f_fqsj_tbl_ld_xxbg_detail_time', tbl_ld_xxbg_detail.f_fqsj);

            controlObj.text('detail_f_xgr_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_xgr);

            controlObj.text('detail_f_xgrid_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_xgrid);


            controlObj.datetime('detail_f_xgsj_tbl_ld_xxbg_detail_date', 'detail_f_xgsj_tbl_ld_xxbg_detail_time', tbl_ld_xxbg_detail.f_xgsj);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_ztid);


            controlObj.text('detail_f_bz_tbl_ld_xxbg_detail', tbl_ld_xxbg_detail.f_bz.returnStringRN());

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
    *  获取页面数据，返回对象tbl_ld_xxbg_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_xxbg_detail = new Object();
            tbl_ld_xxbg_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_bgmc = controlObj.text('detail_f_bgmc_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_bglx = controlObj.singledropdownlist('detail_f_bglx_tbl_ld_xxbg_detail');
            tbl_ld_xxbg_detail.f_bglxid = controlObj.singledropdownlistid('detail_f_bglx_tbl_ld_xxbg_detail');
        

            tbl_ld_xxbg_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_bgyy = controlObj.text('detail_f_bgyy_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_bgyj = controlObj.fileuploaderid('detail_f_bgyj_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_fqr = controlObj.text('detail_f_fqr_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_fqrid = controlObj.text('detail_f_fqrid_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_fqsj = controlObj.datetime('detail_f_fqsj_tbl_ld_xxbg_detail_date', 'detail_f_fqsj_tbl_ld_xxbg_detail_time');


            tbl_ld_xxbg_detail.f_xgr = controlObj.text('detail_f_xgr_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_xgrid = controlObj.text('detail_f_xgrid_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_xgsj = controlObj.datetime('detail_f_xgsj_tbl_ld_xxbg_detail_date', 'detail_f_xgsj_tbl_ld_xxbg_detail_time');

            tbl_ld_xxbg_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_xxbg_detail');
            tbl_ld_xxbg_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xxbg_detail');

            tbl_ld_xxbg_detail.f_ly = controlObj.singledropdownlist('detail_f_ly_tbl_ld_xxbg_detail');
            tbl_ld_xxbg_detail.f_lyid = controlObj.singledropdownlistid('detail_f_ly_tbl_ld_xxbg_detail');


            tbl_ld_xxbg_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_xxbg_detail');

            callBackFunction.success(tbl_ld_xxbg_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_xxbg_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel_Save = function (tbl_ld_xxbg_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if (tbl_ld_xxbg_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            //{
            //    errorMessageHansMap.put('detail_f_khbh_tbl_ld_xxbg_detail', '不能为空');
            //}
            if (tbl_ld_xxbg_detail.f_khbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_xxbg_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_bgmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_bgmc_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xxbg_detail.f_bgmc.length < 1)
            {
                errorMessageHansMap.put('detail_f_bgmc_tbl_ld_xxbg_detail', '不能为空');
            }




            if (tbl_ld_xxbg_detail.f_bglx.length > 200)
            {
                errorMessageHansMap.put('detail_f_bglx_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xxbg_detail.f_bglx.length < 1)
            {
                errorMessageHansMap.put('detail_f_bglx_tbl_ld_xxbg_detail', '不能为空');
            }



            if (tbl_ld_xxbg_detail.fk_tbl_maintable_sys_id.length > 200)
            {
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_bgyy.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bgyy_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_bgyj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bgyj_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_fqr.length > 200)
            {
                errorMessageHansMap.put('detail_f_fqr_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_fqrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_fqrid_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xxbg_detail.f_xgr.length > 200)
            {
                errorMessageHansMap.put('detail_f_xgr_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_xgrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_xgrid_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xxbg_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_ly.length > 200)
            {
                errorMessageHansMap.put('detail_f_ly_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xxbg_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_xxbg_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }
            //var khbh = controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail')
            //{
            //    errorMessageHansMap.put('detail_f_khbh_tbl_ld_xxbg_detail', '不能为空');
            //}
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_xxbg_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }

    },
    checkModel_Submit = function (tbl_ld_xxbg_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();
            if (tbl_ld_xxbg_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_xxbg_detail', '不能为空');
            }

            var bglxid = controlObj.singledropdownlistid('detail_f_bglx_tbl_ld_xxbg_detail');
      
            if (bglxid == '0')
            {
                var bgyjid = tbl_ld_xxbg_detail.f_bgyj;
                var sqlStringsJson = {
                    "bgyj": "select * from TBL_FILE_CONTENT where menuid = '" + bgyjid + "'"
                };
                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        //var resultArrayFj = resultJson['bgyj'];
                        //if (resultArrayFj.length == 0)
                        //{
                        //    errorMessageHansMap.put('detail_f_bgyj_tbl_ld_xxbg_detail', '更改过户信息需上传凭证');

                        //}

                        if (errorMessageHansMap.keys().length > 0)
                        {
                            _validateMessage_submit.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                            callBackFunction.fail('');
                        }
                        else
                        {
                            _validateMessage_submit.hidden();
                            callBackFunction.success(tbl_ld_xxbg_detail);
                        }

                    }, fail: function (message)
                    {
                        callBackFunction.fail(message);
                    }
                });
            }
            else
            {
                if (errorMessageHansMap.keys().length > 0)
                {
                    _validateMessage_submit.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    _validateMessage_submit.hidden();
                    callBackFunction.success(tbl_ld_xxbg_detail);
                }
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
        var columnsString = 'f_khbh^f_khbhid^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_fqr^f_fqrid^f_fqsj^f_bglx^f_bglxid^f_bgyj^f_bgyy^f_ly^f_lyid^f_zt^f_ztid^fk_tbl_maintable_sys_id^f_bz^f_khxx^f_khjson^f_xgr^f_xgrid^f_xgsj^f_bgmc^sys_id';
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
        *  参数:tbl_ld_xxbg_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
    updateData = function (tbl_ld_xxbg_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_fqr^f_fqrid^f_fqsj^f_bglx^f_bglxid^f_bgyj^f_bgyy^f_ly^f_lyid^f_zt^f_ztid^fk_tbl_maintable_sys_id^f_bz^f_xgr^f_xgrid^f_xgsj^f_bgmc^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_xxbg_detail.f_value1,

                f_value2: tbl_ld_xxbg_detail.f_value2,

                f_value3: tbl_ld_xxbg_detail.f_value3,

                f_value4: tbl_ld_xxbg_detail.f_value4,

                f_value5: tbl_ld_xxbg_detail.f_value5,

                f_value6: tbl_ld_xxbg_detail.f_value6,

                f_value7: tbl_ld_xxbg_detail.f_value7,

                f_value8: tbl_ld_xxbg_detail.f_value8,

                f_value9: tbl_ld_xxbg_detail.f_value9,

                f_value10: tbl_ld_xxbg_detail.f_value10,

                f_bgmc: tbl_ld_xxbg_detail.f_bgmc,

                f_bglx: tbl_ld_xxbg_detail.f_bglx,
                f_bglxid: tbl_ld_xxbg_detail.f_bglxid,

                fk_tbl_maintable_sys_id: tbl_ld_xxbg_detail.fk_tbl_maintable_sys_id,

                f_bgyy: tbl_ld_xxbg_detail.f_bgyy.formatStringRN(),


                f_bgyj: tbl_ld_xxbg_detail.f_bgyj,

                f_fqr: tbl_ld_xxbg_detail.f_fqr,

                f_fqrid: tbl_ld_xxbg_detail.f_fqrid,

                f_fqsj: tbl_ld_xxbg_detail.f_fqsj,

                f_xgr: tbl_ld_xxbg_detail.f_xgr,

                f_xgrid: tbl_ld_xxbg_detail.f_xgrid,

                f_xgsj: tbl_ld_xxbg_detail.f_xgsj,

                f_zt: tbl_ld_xxbg_detail.f_zt,
                f_ztid: tbl_ld_xxbg_detail.f_ztid,

                f_ly: tbl_ld_xxbg_detail.f_ly,
                f_lyid: tbl_ld_xxbg_detail.f_lyid,

                f_bz: tbl_ld_xxbg_detail.f_bz.formatStringRN(),

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
    //---------------------------------控件事件----------------------------------------
    //--------------------------------------------------------------------------------- 

            /* 
            *  
            *  方法:f_bglx_onchange
            *  参数:changeEventParameter
            *  变更类型onchange事件
            */
            f_bglx_onchange = function (e)
            {
                
            },
        /* 
        *  
        *  方法:f_bgyj_onchange
        *  参数:
        *  变更依据 onchange事件
        */
            f_bgyj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_bgyj_tbl_ld_xxbg_detail');
            },
        /* 
        *  
        *  方法:f_fqsj_time_onchange
        *  参数:
        *  发起时间 onchange事件
        */
            f_fqsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_fqsj_date_onchange
        *  参数:
        *  发起时间 onchange事件
        */
            f_fqsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

        /* 
        *  
        *  方法:f_xgsj_time_onchange
        *  参数:
        *  修改时间 onchange事件
        */
            f_xgsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_xgsj_date_onchange
        *  参数:
        *  修改时间 onchange事件
        */
            f_xgsj_date_onchange = function (ev)
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
            *  方法:f_ly_onchange
            *  参数:changeEventParameter
            *  来源onchange事件
            */
            f_ly_onchange = function (e)
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

        //变更类型id
        _pr_bglxid:'',
        // _khxx :null,
        _pr_bglx: '',
        //来源：管理员04720002   营业厅04720001
        _pr_isadmin: '',
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_xxbg_detail');
                                                        _validateMessage_submit = new validateMessage('btn_command_submit_tbl_ld_xxbg_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_xxbg_detail');
                                                        _ladda_btn_command_submit = Ladda.create('btn_command_submit_tbl_ld_xxbg_detail');

                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }



                                                        $('#div_container_tbl_ld_xxbgnr_modallist').load('../tbl_ld_xxbgnr/tbl_ld_xxbgnr_modallist_part.html', null, function ()
                                                        {
                                                            tbl_ld_xxbgnr_modallist_Obj._pr_fk_tbl_ld_xxbg_sys_id = that._pr_sys_id;
                                                            tbl_ld_xxbgnr_modallist_Obj._pr_listtype = that._pr_pagetype;
                                                            tbl_ld_xxbgnr_modallist_Obj._pr_bglxid = that._pr_bglxid;

                                                            tbl_ld_xxbgnr_modallist_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_container_tbl_ld_xxbgnr_modallist').css('display', '');
                                                                    $('#div_loading_tbl_ld_xxbgnr_modallist').css('display', 'none');
                                                                }
                                                            });
                                                        });

                                                        $('#div_container_tbl_ld_xxbg_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4xxbg.html', null, function ()
                                                        {
                                                            tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                                                            tbl_ld_khb_list_Obj._pr_bglxid = that._pr_bglxid;

                                                            tbl_ld_khb_list_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_container_tbl_ld_xxbg_list').css('display', '');
                                                                    $('#div_loading_tbl_ld_xxbg_list').css('display', 'none');

                                                                    _blockMessage.hidden();
                                                                }
                                                            });

                                                        });

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
                    success: function (tbl_ld_xxbg_detail)
                    {
                        setModel(tbl_ld_xxbg_detail, {
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
                    success: function (tbl_ld_xxbg_detail)
                    {
                        checkModel_Save(tbl_ld_xxbg_detail, {
                            success: function (tbl_ld_xxbg_detail)
                            {
                                updateData(tbl_ld_xxbg_detail, {
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


        //提交
        btn_command_submit_onclick: function ()
        {
            try
            {

                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对当前的数据进行<a style="color:red">提交</a>操作</h3>';
                confirmContent += '<br/>';
                confirmContent += '<h5>提交后的数据不能<a style="color:red">删除</a>和<a style="color:red">编辑</a></h5>';
                confirmContent += '<h5>请确定执行此操作</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('提交确认', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_submit.start();
                        //提交时为修改人赋值
                        var d = new Date();
                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xxbg_detail', '1');
                        controlObj.text('detail_f_xgr_tbl_ld_xxbg_detail', basePageObj._userInfoJson.sys_username);
                        controlObj.text('detail_f_xgrid_tbl_ld_xxbg_detail', basePageObj._userInfoJson.sys_userid);
                        controlObj.datetime('detail_f_xgsj_tbl_ld_xxbg_detail_date', 'detail_f_xgsj_tbl_ld_xxbg_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));
                        getModel({
                            success: function (tbl_ld_xxbg_detail)
                            {

                                checkModel_Save(tbl_ld_xxbg_detail, {
                                    success: function (tbl_ld_xxbg_detail)
                                    {

                                        checkModel_Submit(tbl_ld_xxbg_detail, {
                                            success: function (tbl_ld_xxbg_detail)
                                            {

                                                //count为0时，不进行提交
                                                if (tbl_ld_xxbgnr_modallist_Obj._pr_count == '0')
                                                {
                                                    _ladda_btn_command_submit.stop();
                                                    _alertMessage.show('未对该客户进行任何信息更改，不能进行提交', 'warning');
                                                }
                                                else
                                                {
                                                    var d = new Date();
                                                    tbl_ld_xxbg_detail.sys_id = that._pr_sys_id;
                                                    tbl_ld_xxbg_detail.sys_lasteditusername = basePageObj._userInfoJson.sys_username;
                                                    tbl_ld_xxbg_detail.sys_lastedituserid = basePageObj._userInfoJson.sys_userid;
                                                    tbl_ld_xxbg_detail.sys_lasteditdate = d.Format('yyyy-MM-dd hh:mm:ss');

                                                    var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_fqr^f_fqrid^f_fqsj^f_bglx^f_bglxid^f_bgyj^f_bgyy^f_ly^f_lyid^f_zt^f_ztid^fk_tbl_maintable_sys_id^f_bz^f_xgr^f_xgrid^f_xgsj^f_bgmc^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

                                                    var sbidString = controlObj.text('detail_f_sbbhid_tbl_ld_xxbg_detail');
                                                    var yhidString = controlObj.text('detail_f_yhbhid_tbl_ld_xxbg_detail');
                                                    var data = {
                                                        sbidString: sbidString,
                                                        yhidString: yhidString,
                                                        khidString: tbl_ld_xxbg_detail.f_khbhid,
                                                        columns: columns,
                                                        clientInf: _clientInf,
                                                        json: JSON.stringify(tbl_ld_xxbg_detail)
                                                    };
                                                    doAjaxFunction(_serviceUrl, 'Submit', data, {
                                                        success: function (message)
                                                        {
                                                            setDisable();
                                                            _ladda_btn_command_submit.stop();
                                                            _alertMessage.show('提交成功', 'success', 2000);
                                                            
                                                            $('#div_container_tbl_ld_xxbgnr_modallist').load('../tbl_ld_xxbgnr/tbl_ld_xxbgnr_modallist_part.html', null, function ()
                                                    {
                                                        tbl_ld_xxbgnr_modallist_Obj._pr_fk_tbl_ld_xxbg_sys_id = that._pr_sys_id;
                                                        tbl_ld_xxbgnr_modallist_Obj._pr_listtype = '2';
                                                        tbl_ld_xxbgnr_modallist_Obj._pr_bglxid = that._pr_bglxid;
                                                        tbl_ld_xxbgnr_modallist_Obj.init({
                                                            success: function ()
                                                            {
                                                                $('#div_container_tbl_ld_xxbgnr_modallist').css('display', '');
                                                                $('#div_loading_tbl_ld_xxbgnr_modallist').css('display', 'none');
                                                            }
                                                        });
                                                    });



                                                            },
                                                            fail: function (message)
                                                            {
                                                            _ladda_btn_command_submit.stop();

                                                            _alertMessage.show(message, 'warning');

                                                            //_blockMessage.show('Submit执行失败<br/>' + message, 'fail');
                                                    }
                                                });
                                                }
                                            },
                                            fail: function (message)
                                            {
                                                _ladda_btn_command_submit.stop();
                                                if (message != '')
                                                {
                                                    _alertMessage.show('提交校验不通过', 'fail');
                                                    _resultMessage.show(message);
                                                }
                                                else
                                                {
                                                    _alertMessage.show('提交校验未通过', 'warning');
                                                }
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_submit.stop();
                                        if (message != '')
                                        {
                                            _alertMessage.show('校验不通过', 'fail');
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
                                _ladda_btn_command_submit.stop();

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
                // _resultMessage.show('提交程序异常<br/>' + ex.message, 'fail');
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


        btn_command_opensearch_onclick: function ()
        {

            var khbh = controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail');

            tbl_ld_khb_list_Obj._pr_khbh = khbh;
            if (tbl_ld_xxbgnr_modallist_Obj._pr_count == "0")
            {
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
                $('#div_search_modal_tbl_ld_xxbg_detail').modal('show');
            }
            else
            {
                _alertMessage.show('当前客户存在变更记录，不能更换客户', 'warning');
            }
        },
        btn_search_modal_search_onclick: function (callBackFunction)
        {

            $('#div_search_modal_tbl_ld_xxbg_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');

            var bglxid = controlObj.singledropdownlistid('detail_f_bglx_tbl_ld_xxbg_detail');
            var bglx = controlObj.singledropdownlist('detail_f_bglx_tbl_ld_xxbg_detail');

            if (idArray.length == 1 && idArray[0] != '')
            {


                var khbh = controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail');
                var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xxbg_detail');
                var clearKhbhString = khbh;
                //如果两个客户编号不相同   那么将第一个客户的f_value1和f_value2清空
                var json = {
                    sys_id: that._pr_sys_id,
                    sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                    sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                };
                var data = {
                    khidString: idArray[0],
                    czlxString: bglx + "_" + basePageObj._userInfoJson.sys_username,
                    czidString: that._pr_sys_id,
                    clientInf: _clientInf,
                    clearKhbhString: clearKhbhString,
                    json: JSON.stringify(json)
                };
                doAjaxFunction(_serviceUrl, 'GetKhJsonAndUpdate', data, {
                    success: function (message)
                    {
                        var messageJson = (new Function("", "return " + message))();
                        var khxx = (new Function("", "return " + messageJson["khxx"]))();
                        var yhxx = (new Function("", "return " + messageJson["yhxx"]))()
                        var sbxx = (new Function("", "return " + messageJson["sbxx"]))()

                        tbl_ld_xxbg_detail_Obj._khbh = khxx[0].f_khbh
                        tbl_ld_xxbg_detail_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                        tbl_ld_xxbg_detail_Obj._khJson["khxx"] = khxx[0];
                        tbl_ld_xxbg_detail_Obj._khJson["yhxx"] = yhxx[0];
                        tbl_ld_xxbg_detail_Obj._khJson["sbxx"] = sbxx[0];


                        var khbh = controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail');
                        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xxbg_detail');


                        controlObj.text('detail_f_khbh_tbl_ld_xxbg_detail', khxx[0].f_khbh);
                        controlObj.text('detail_f_khbhid_tbl_ld_xxbg_detail', khxx[0].sys_id);

                        controlObj.text('detail_f_yhm_tbl_ld_xxbg_detail', khxx[0].f_yhm);
                        controlObj.text('detail_f_dz_tbl_ld_xxbg_detail', khxx[0].f_dz);
                        controlObj.text('detail_f_sbdz_tbl_ld_xxbg_detail', khxx[0].f_sbdz);
                        //暂时存放水表编号id 和 用户编号id 在提交时写日志会取水表id和用户id
                        controlObj.text('detail_f_sbbhid_tbl_ld_xxbg_detail', sbxx[0].sys_id);
                        controlObj.text('detail_f_yhbhid_tbl_ld_xxbg_detail', yhxx[0].sys_id);
                    },
                    fail: function (message)
                    {
                        if (message != '')
                        {
                            _alertMessage.show('GetKhJsonAndUpdate执行失败', 'fail');
                            _resultMessage.show(message);
                        }
                        else
                        {
                            _alertMessage.show('GetKhJsonAndUpdate执行失败', 'warning');
                        }
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
            $('#div_search_modal_tbl_ld_xxbg_detail').modal('hide')
        },
        end: function ()
        {
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_xxbg_detail_Obj.init();
});




