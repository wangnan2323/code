
var tbl_ld_xgsbds_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//162.16.166.1/sara.dd.ldsw/service/service_tbl_ld_xgsbds.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_analysis = null,

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

        codeServiceId += "0476^";
        codeServiceId += "0818^";
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0476', resultArray['0476']);
                    _baseCodeHashMap.put('codeservice_0818', resultArray['0818']);
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

            var codeService_0476 = _baseCodeHashMap.get('codeservice_0476');
            var codeservice_0818 = _baseCodeHashMap.get('codeservice_0818');

            controlObj.datetimeinit('detail_f_drsj_tbl_ld_xgsbds_detail_date', 'detail_f_drsj_tbl_ld_xgsbds_detail_time', f_drsj_date_onchange, f_drsj_time_onchange);

            controlObj.datetimeinit('detail_f_fxsj_tbl_ld_xgsbds_detail_date', 'detail_f_fxsj_tbl_ld_xgsbds_detail_time', f_fxsj_date_onchange, f_fxsj_time_onchange);

            controlObj.fileuploaderinit('detail_f_drwj_tbl_ld_xgsbds_detail', { "fileUploadExtnames": ";.xls;.xlsx;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_drwj_onchange);

            controlObj.fileuploaderinit('detail_f_bcfj_tbl_ld_xgsbds_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_bcfj_onchange);

            controlObj.fileuploaderinit('detail_f_lcfj_tbl_ld_xgsbds_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_lcfj_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_xgsbds_detail', codeservice_0818, f_zt_onchange);

            controlObj.datetimeinit('detail_f_sqsj_tbl_ld_xgsbds_detail_date', 'detail_f_sqsj_tbl_ld_xgsbds_detail_time', f_sqsj_date_onchange, f_sqsj_time_onchange);

            controlObj.datetimeinit('detail_f_czsj_tbl_ld_xgsbds_detail_date', 'detail_f_czsj_tbl_ld_xgsbds_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);

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

            controlObj.textdisable('detail_f_xgsbdsbh_tbl_ld_xgsbds_detail', true);

            controlObj.textdisable('detail_f_xgsbdsmc_tbl_ld_xgsbds_detail', isDisable);

            controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xgsbds_detail', isDisable);

            controlObj.textdisable('detail_f_drr_tbl_ld_xgsbds_detail', true);

            controlObj.textdisable('detail_f_drrid_tbl_ld_xgsbds_detail', isDisable);

            controlObj.datetimedisable('detail_f_drsj_tbl_ld_xgsbds_detail_date', 'detail_f_drsj_tbl_ld_xgsbds_detail_time', true);

            controlObj.textdisable('detail_f_drbh_tbl_ld_xgsbds_detail', isDisable);

            controlObj.datetimedisable('detail_f_fxsj_tbl_ld_xgsbds_detail_date', 'detail_f_fxsj_tbl_ld_xgsbds_detail_time', true);

            controlObj.fileuploaderdisable('detail_f_drwj_tbl_ld_xgsbds_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_bcfj_tbl_ld_xgsbds_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_xgsbds_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_xgsbds_detail', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_xgsbds_detail', isDisable);

            controlObj.textdisable('detail_f_sqr_tbl_ld_xgsbds_detail', true);

            controlObj.textdisable('detail_f_sqrid_tbl_ld_xgsbds_detail', isDisable);

            controlObj.datetimedisable('detail_f_sqsj_tbl_ld_xgsbds_detail_date', 'detail_f_sqsj_tbl_ld_xgsbds_detail_time', true);

            controlObj.textdisable('detail_f_czr_tbl_ld_xgsbds_detail', true);

            controlObj.textdisable('detail_f_czrid_tbl_ld_xgsbds_detail', isDisable);

            controlObj.datetimedisable('detail_f_czsj_tbl_ld_xgsbds_detail_date', 'detail_f_czsj_tbl_ld_xgsbds_detail_time', true);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_xgsbds_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_xgsbds_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }
            if (isDisable)
            {
                $('#btn_command_download_tbl_ld_xgsbds_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_download_tbl_ld_xgsbds_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }
            if (isDisable)
            {
                $('#btn_command_analysis_tbl_ld_xgsbds_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_analysis_tbl_ld_xgsbds_detail').removeClass('hidden');
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
    *  参数:tbl_ld_xgsbds_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_xgsbds_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_value10);

            controlObj.text('detail_f_xgsbdsbh_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_xgsbdsbh);

            controlObj.text('detail_f_xgsbdsmc_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_xgsbdsmc);

            controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.fk_tbl_maintable_sys_id);

            controlObj.text('detail_f_drr_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_drr);

            controlObj.text('detail_f_drrid_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_drrid);


            controlObj.datetime('detail_f_drsj_tbl_ld_xgsbds_detail_date', 'detail_f_drsj_tbl_ld_xgsbds_detail_time', tbl_ld_xgsbds_detail.f_drsj);

            controlObj.text('detail_f_drbh_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_drbh);


            controlObj.datetime('detail_f_fxsj_tbl_ld_xgsbds_detail_date', 'detail_f_fxsj_tbl_ld_xgsbds_detail_time', tbl_ld_xgsbds_detail.f_fxsj);

            controlObj.fileuploaderbind('detail_f_drwj_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_drwj);

            controlObj.fileuploaderbind('detail_f_bcfj_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_bcfj);

            controlObj.fileuploaderbind('detail_f_lcfj_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_lcfj);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_bz.returnStringRN());

            controlObj.text('detail_f_sqr_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_sqr);

            controlObj.text('detail_f_sqrid_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_sqrid);


            controlObj.datetime('detail_f_sqsj_tbl_ld_xgsbds_detail_date', 'detail_f_sqsj_tbl_ld_xgsbds_detail_time', tbl_ld_xgsbds_detail.f_sqsj);

            controlObj.text('detail_f_czr_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_czr);

            controlObj.text('detail_f_czrid_tbl_ld_xgsbds_detail', tbl_ld_xgsbds_detail.f_czrid);


            controlObj.datetime('detail_f_czsj_tbl_ld_xgsbds_detail_date', 'detail_f_czsj_tbl_ld_xgsbds_detail_time', tbl_ld_xgsbds_detail.f_czsj);

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
    *  获取页面数据，返回对象tbl_ld_xgsbds_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_xgsbds_detail = new Object();


            tbl_ld_xgsbds_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_xgsbdsbh = controlObj.text('detail_f_xgsbdsbh_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_xgsbdsmc = controlObj.text('detail_f_xgsbdsmc_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_drr = controlObj.text('detail_f_drr_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_drrid = controlObj.text('detail_f_drrid_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_drsj = controlObj.datetime('detail_f_drsj_tbl_ld_xgsbds_detail_date', 'detail_f_drsj_tbl_ld_xgsbds_detail_time');


            tbl_ld_xgsbds_detail.f_drbh = controlObj.text('detail_f_drbh_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_fxsj = controlObj.datetime('detail_f_fxsj_tbl_ld_xgsbds_detail_date', 'detail_f_fxsj_tbl_ld_xgsbds_detail_time');

            tbl_ld_xgsbds_detail.f_drwj = controlObj.fileuploaderid('detail_f_drwj_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_bcfj = controlObj.fileuploaderid('detail_f_bcfj_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_lcfj = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_xgsbds_detail');
            tbl_ld_xgsbds_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_sqr = controlObj.text('detail_f_sqr_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_sqrid = controlObj.text('detail_f_sqrid_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_sqsj = controlObj.datetime('detail_f_sqsj_tbl_ld_xgsbds_detail_date', 'detail_f_sqsj_tbl_ld_xgsbds_detail_time');


            tbl_ld_xgsbds_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_xgsbds_detail');


            tbl_ld_xgsbds_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_xgsbds_detail');

            tbl_ld_xgsbds_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_xgsbds_detail_date', 'detail_f_czsj_tbl_ld_xgsbds_detail_time');

            callBackFunction.success(tbl_ld_xgsbds_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_xgsbds_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_xgsbds_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_xgsbds_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_xgsbdsbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_xgsbdsbh_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_xgsbdsmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_xgsbdsmc_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.fk_tbl_maintable_sys_id.length > 200)
            {
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_drr.length > 200)
            {
                errorMessageHansMap.put('detail_f_drr_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_drrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_drrid_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xgsbds_detail.f_drbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_drbh_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xgsbds_detail.f_drwj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_drwj_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_bcfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bcfj_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_lcfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_lcfj_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_sqr.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqr_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_sqrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqrid_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xgsbds_detail.f_czr.length > 200)
            {
                errorMessageHansMap.put('detail_f_czr_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xgsbds_detail.f_czrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_czrid_tbl_ld_xgsbds_detail', '长度不能超过<a style="color:red">200</a>个字');
            }





            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_xgsbds_detail);
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
        ;
        //var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var whereClause = ' fk_tbl_maintable_sys_id = \'' + that._pr_fk_tbl_maintable_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_xgsbdsbh^f_xgsbdsmc^fk_tbl_maintable_sys_id^f_drr^f_drrid^f_drsj^f_drbh^f_fxsj^f_lcfj^f_drwj^f_bcfj^f_zt^f_ztid^f_bz^f_czr^f_czrid^f_czsj^f_sqr^f_sqrid^f_sqsj^sys_id';
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
     *  参数:tbl_ld_xgsbds_detail, callbackFunction
     *  向数据库更新数据，根据数据对象
     */
    updateData = function (tbl_ld_xgsbds_detail, callbackFunction)
    {

        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_xgsbdsbh^f_xgsbdsmc^fk_tbl_maintable_sys_id^f_drr^f_drrid^f_drsj^f_drbh^f_fxsj^f_lcfj^f_drwj^f_bcfj^f_zt^f_ztid^f_bz^f_czr^f_czrid^f_czsj^f_sqr^f_sqrid^f_sqsj^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: tbl_ld_xgsbds_detail.f_value1,

            f_value2: tbl_ld_xgsbds_detail.f_value2,

            f_value3: tbl_ld_xgsbds_detail.f_value3,

            f_value4: tbl_ld_xgsbds_detail.f_value4,

            f_value5: tbl_ld_xgsbds_detail.f_value5,

            f_value6: tbl_ld_xgsbds_detail.f_value6,

            f_value7: tbl_ld_xgsbds_detail.f_value7,

            f_value8: tbl_ld_xgsbds_detail.f_value8,

            f_value9: tbl_ld_xgsbds_detail.f_value9,

            f_value10: tbl_ld_xgsbds_detail.f_value10,

            f_xgsbdsbh: tbl_ld_xgsbds_detail.f_xgsbdsbh,

            f_xgsbdsmc: tbl_ld_xgsbds_detail.f_xgsbdsmc,

            fk_tbl_maintable_sys_id: tbl_ld_xgsbds_detail.fk_tbl_maintable_sys_id,

            f_drr: tbl_ld_xgsbds_detail.f_drr,

            f_drrid: tbl_ld_xgsbds_detail.f_drrid,

            f_drsj: tbl_ld_xgsbds_detail.f_drsj,

            f_drbh: tbl_ld_xgsbds_detail.f_drbh,

            f_fxsj: tbl_ld_xgsbds_detail.f_fxsj,


            f_drwj: tbl_ld_xgsbds_detail.f_drwj,


            f_bcfj: tbl_ld_xgsbds_detail.f_bcfj,


            f_lcfj: tbl_ld_xgsbds_detail.f_lcfj,

            f_zt: tbl_ld_xgsbds_detail.f_zt,
            f_ztid: tbl_ld_xgsbds_detail.f_ztid,

            f_bz: tbl_ld_xgsbds_detail.f_bz.formatStringRN(),

            f_sqr: tbl_ld_xgsbds_detail.f_sqr,

            f_sqrid: tbl_ld_xgsbds_detail.f_sqrid,

            f_sqsj: tbl_ld_xgsbds_detail.f_sqsj,

            f_czr: tbl_ld_xgsbds_detail.f_czr,

            f_czrid: tbl_ld_xgsbds_detail.f_czrid,

            f_czsj: tbl_ld_xgsbds_detail.f_czsj,

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
     *  方法:analysisData
     *  参数:tbl_ld_xgsbds_detail, callbackFunction
     *  向数据库更新数据，根据数据对象
     */
    analysisData = function (tbl_ld_xgsbds_detail, callbackFunction)
    {
        switch (that._pr_iskhlx)
        {
            case '1':
                var czlx = "修改水表底数_大客户" + "_" + basePageObj._userInfoJson.sys_username;
                break;
            case '2':
                var czlx = "修改水表底数_居民" + "_" + basePageObj._userInfoJson.sys_username;
                break;
        }
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_xgsbdsbh^f_xgsbdsmc^fk_tbl_maintable_sys_id^f_drr^f_drrid^f_drsj^f_drbh^f_fxsj^f_lcfj^f_drwj^f_bcfj^f_zt^f_ztid^f_bz^f_czr^f_czrid^f_czsj^f_sqr^f_sqrid^f_sqsj^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: "已保存",

            f_value2: tbl_ld_xgsbds_detail.f_value2,

            f_value3: tbl_ld_xgsbds_detail.f_value3,

            f_value4: tbl_ld_xgsbds_detail.f_value4,

            f_value5: tbl_ld_xgsbds_detail.f_value5,

            f_value6: tbl_ld_xgsbds_detail.f_value6,

            f_value7: tbl_ld_xgsbds_detail.f_value7,

            f_value8: tbl_ld_xgsbds_detail.f_value8,

            f_value9: tbl_ld_xgsbds_detail.f_value9,

            f_value10: tbl_ld_xgsbds_detail.f_value10,

            f_xgsbdsbh: tbl_ld_xgsbds_detail.f_xgsbdsbh,

            f_xgsbdsmc: tbl_ld_xgsbds_detail.f_xgsbdsmc,

            fk_tbl_maintable_sys_id: tbl_ld_xgsbds_detail.fk_tbl_maintable_sys_id,

            f_drr: tbl_ld_xgsbds_detail.f_drr,

            f_drrid: tbl_ld_xgsbds_detail.f_drrid,

            f_drsj: tbl_ld_xgsbds_detail.f_drsj,

            f_drbh: tbl_ld_xgsbds_detail.f_drbh,

            f_fxsj: d.Format('yyyy-MM-dd hh:mm:ss'),


            f_drwj: tbl_ld_xgsbds_detail.f_drwj,


            f_bcfj: tbl_ld_xgsbds_detail.f_bcfj,


            f_lcfj: tbl_ld_xgsbds_detail.f_lcfj,

            f_zt: tbl_ld_xgsbds_detail.f_zt,
            f_ztid: tbl_ld_xgsbds_detail.f_ztid,

            f_bz: tbl_ld_xgsbds_detail.f_bz.formatStringRN(),

            f_sqr: tbl_ld_xgsbds_detail.f_sqr,

            f_sqrid: tbl_ld_xgsbds_detail.f_sqrid,

            f_sqsj: tbl_ld_xgsbds_detail.f_sqsj,

            f_czr: tbl_ld_xgsbds_detail.f_czr,

            f_czrid: tbl_ld_xgsbds_detail.f_czrid,

            f_czsj: tbl_ld_xgsbds_detail.f_czsj,

            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
        };

        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json),
            czlx: czlx
        };
        doAjaxFunction(_serviceUrl, 'Analysis', data, {
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
        *  方法:f_drsj_time_onchange
        *  参数:
        *  导入时间 onchange事件
        */
        f_drsj_time_onchange = function (e)
        {
            var r = e.currentTarget.id
        },
    /* 
        *  
        *  方法:f_drsj_date_onchange
        *  参数:
        *  导入时间 onchange事件
        */
        f_drsj_date_onchange = function (ev)
        {
            var controlid = e.target.id
        },




    /* 
        *  
        *  方法:f_fxsj_time_onchange
        *  参数:
        *  分析时间 onchange事件
        */
        f_fxsj_time_onchange = function (e)
        {
            var r = e.currentTarget.id
        },
    /* 
        *  
        *  方法:f_fxsj_date_onchange
        *  参数:
        *  分析时间 onchange事件
        */
        f_fxsj_date_onchange = function (ev)
        {
            var controlid = e.target.id
        },

    /* 
        *  
        *  方法:f_drwj_onchange
        *  参数:
        *  导入文件(Excel表) onchange事件
        */
        f_drwj_onchange = function ()
        {
            var fileid = controlObj.fileuploaderid('detail_f_drwj_tbl_ld_xgsbds_detail');
        },

    /* 
        *  
        *  方法:f_bcfj_onchange
        *  参数:
        *  保存附件 onchange事件
        */
        f_bcfj_onchange = function ()
        {
            var fileid = controlObj.fileuploaderid('detail_f_bcfj_tbl_ld_xgsbds_detail');
        },

    /* 
        *  
        *  方法:f_lcfj_onchange
        *  参数:
        *  流程附件 onchange事件
        */
        f_lcfj_onchange = function ()
        {
            var fileid = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_xgsbds_detail');
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
        _pr_fk_tbl_maintable_sys_id: '',
        //区分居民和大客户（1 大客户，2 居民）
        //客户类型
        _pr_iskhlx: '',
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
                                //绑定数据
                                that.bindPage({
                                    success: function ()
                                    {
                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_xgsbds_detail');

                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_xgsbds_detail');

                                        _ladda_btn_command_analysis = Ladda.create('btn_command_analysis_tbl_ld_xgsbds_detail');
                                        switch (that._pr_pagetype)
                                        {
                                            case "1":
                                                setDisable(false);
                                                break;
                                            case "2":
                                                setDisable(true);
                                                break;
                                        }
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
                    success: function (tbl_ld_xgsbds_detail)
                    {
                        setModel(tbl_ld_xgsbds_detail, {
                            success: function ()
                            {

                                $('#div_container_tbl_ld_xgsbdszb_list').load('../tbl_ld_xgsbdszb/tbl_ld_xgsbdszb_list_part.html', null, function ()
                                {
                                    tbl_ld_xgsbdszb_list_Obj._pr_fk_tbl_ld_xgsbds_sys_id = that._pr_sys_id;
                                    tbl_ld_xgsbdszb_list_Obj._pr_listtype = that._pr_pagetype;
                                    tbl_ld_xgsbdszb_list_Obj.init({
                                        success: function ()
                                        {
                                            $('#div_container_tbl_ld_xgsbdszb_list').css('display', '');
                                            $('#div_loading_tbl_ld_xgsbdszb_list').css('display', 'none');
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
                    success: function (tbl_ld_xgsbds_detail)
                    {
                        checkModel(tbl_ld_xgsbds_detail, {
                            success: function (tbl_ld_xgsbds_detail)
                            {
                                updateData(tbl_ld_xgsbds_detail, {
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
            tbl_ld_xgsbds_list_Obj.bindGrid({
                success: function ()
                {
                    $('#div_content_part_tbl_ld_xgsbds_list').css('display', '');
                    $('#div_content_part_tbl_ld_xgsbds_detail').css('display', 'none');
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

        //下载按钮
        btn_command_download_onclick: function ()
        {
            window.location.href = html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/批量修改水表底数模板.xlsx';
        },

        /* 
*  
*  方法:btn_command_analysis_onclick
*  参数:
*  分析按钮
*/
        btn_command_analysis_onclick: function ()
        {
            try
            {
                ;
                _ladda_btn_command_analysis.start();

                getModel({
                    success: function (tbl_ld_xgsbds_detail)
                    {
                        checkModel(tbl_ld_xgsbds_detail, {
                            success: function (tbl_ld_xgsbds_detail)
                            {
                                analysisData(tbl_ld_xgsbds_detail, {
                                    success: function ()
                                    {
                                        _ladda_btn_command_analysis.stop();
                                        _alertMessage.show('分析成功', 'success', 2000);

                                        tbl_ld_xgsbdszb_list_Obj.bindGrid({
                                            success: function ()
                                            {

                                            }, fail: function ()
                                            {
                                                _ladda_btn_command_analysis.stop();
                                                _alertMessage.show('刷新预览列表失败', 'fail');
                                            }

                                        });
                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_analysis.stop();
                                        _alertMessage.show('分析失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_analysis.stop();
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
                        _ladda_btn_command_analysis.stop();
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

        end: function ()
        {
        }


    };

    return that;
})();



