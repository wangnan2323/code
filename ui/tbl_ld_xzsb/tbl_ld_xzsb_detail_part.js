var _khJson = null;
var tbl_ld_xzsb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xzsb.asmx/',
        _serviceUrl_kh = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
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

        codeServiceId += "0524^";

        codeServiceId += "0523^";

        codeServiceId += "0818^";

        codeServiceId += "0525^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0818', resultArray['0818']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
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
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');

            var codeService_0818 = _baseCodeHashMap.get('codeservice_0818');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');

            controlObj.datetimeinit('detail_f_sqsj_tbl_ld_xzsb_detail_date', 'detail_f_sqsj_tbl_ld_xzsb_detail_time', f_sqsj_date_onchange, f_sqsj_time_onchange);


            controlObj.datetimeinit('detail_f_czsj_tbl_ld_xzsb_detail_date', 'detail_f_czsj_tbl_ld_xzsb_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);


            controlObj.multidropdownlistinit('detail_f_sbfz_tbl_ld_xzsb_detail', codeService_0522, f_sbfz_onchange);

            controlObj.datetimeinit('detail_f_azrq_tbl_ld_xzsb_detail_date', 'detail_f_azrq_tbl_ld_xzsb_detail_time', f_azrq_date_onchange, f_azrq_time_onchange);


            controlObj.singledropdownlistinit('detail_f_sblx_tbl_ld_xzsb_detail', codeService_0524, f_sblx_onchange);

            controlObj.singledropdownlistinit('detail_f_jllx_tbl_ld_xzsb_detail', codeService_0525, f_jllx_onchange);



            controlObj.singledropdownlistinit('detail_f_sbkj_tbl_ld_xzsb_detail', codeService_0523, f_sbkj_onchange);



            controlObj.toggleinit('detail_f_qfzt_tbl_ld_xzsb_detail', f_qfzt_onchange);

            controlObj.fileuploaderinit('detail_f_sbfj_tbl_ld_xzsb_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_sbfj_onchange);

            controlObj.fileuploaderinit('detail_f_lcfj_tbl_ld_xzsb_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_lcfj_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_xzsb_detail', codeService_0818, f_zt_onchange);



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

            controlObj.textdisable('detail_f_xzsbbh_tbl_ld_xzsb_detail', true);

            controlObj.textdisable('detail_f_xzsbmc_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_sqr_tbl_ld_xzsb_detail', true);

            controlObj.textdisable('detail_f_sqrid_tbl_ld_xzsb_detail', isDisable);

            controlObj.datetimedisable('detail_f_sqsj_tbl_ld_xzsb_detail_date', 'detail_f_sqsj_tbl_ld_xzsb_detail_time', true);

            controlObj.textdisable('detail_f_czr_tbl_ld_xzsb_detail', true);

            controlObj.textdisable('detail_f_czrid_tbl_ld_xzsb_detail', isDisable);

            controlObj.datetimedisable('detail_f_czsj_tbl_ld_xzsb_detail_date', 'detail_f_czsj_tbl_ld_xzsb_detail_time', true);

            controlObj.textdisable('detail_f_khbh_tbl_ld_xzsb_detail', true);
            if (isDisable)
            {
                $('#btn_detail_f_khbh_tbl_ld_xzsb_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_xzsb_detail').removeAttr('disabled');
            }

            controlObj.textdisable('detail_f_khbhid_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_khjbxx_tbl_ld_xzsb_detail', isDisable);


            controlObj.textdisable('detail_f_khjson_tbl_ld_xzsb_detail', isDisable);
           

            controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xzsb_detail', isDisable);

            controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_xzsb_detail', isDisable);

            controlObj.datetimedisable('detail_f_azrq_tbl_ld_xzsb_detail_date', 'detail_f_azrq_tbl_ld_xzsb_detail_time', isDisable);

            controlObj.textdisable('detail_f_sbpp_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_mph_tbl_ld_xzsb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_xzsb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_rs_tbl_ld_xzsb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_sbdz_tbl_ld_xzsb_detail', isDisable);


            controlObj.toggledisable('detail_f_qfzt_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_synx_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_cszm_tbl_ld_xzsb_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_sbfj_tbl_ld_xzsb_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_xzsb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_xzsb_detail', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_xzsb_detail', isDisable);

            controlObj.textdisable('detail_f_yhm_tbl_ld_xzsb_detail', true);
            controlObj.textdisable('detail_f_dz_tbl_ld_xzsb_detail', true);
            controlObj.textdisable('detail_f_dh_tbl_ld_xzsb_detail', true);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_xzsb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_xzsb_detail').removeClass('hidden');
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
    *  参数:tbl_ld_xzsb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_xzsb_detail, callBackFunction)
    {
        try
        {
    
            //f_khxx 取出用户名和地址
            var khxx_zx = tbl_ld_xzsb_detail.f_khjbxx;
            var khxx_zxArr = khxx_zx.split(",");
            if (khxx_zx != '' && khxx_zx != 'null')
            {
                controlObj.text('detail_f_yhm_tbl_ld_xzsb_detail', khxx_zxArr[0]);
                controlObj.text('detail_f_dz_tbl_ld_xzsb_detail', khxx_zxArr[1]);
                controlObj.text('detail_f_dh_tbl_ld_xzsb_detail', khxx_zxArr[2]);
            } else
            {
                controlObj.text('detail_f_yhm_tbl_ld_xzsb_detail', '');
                controlObj.text('detail_f_dz_tbl_ld_xzsb_detail', '');
                controlObj.text('detail_f_dh_tbl_ld_xzsb_detail', '');
            }

            controlObj.text('detail_f_value1_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_value10);

            controlObj.text('detail_f_xzsbbh_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_xzsbbh);

            controlObj.text('detail_f_xzsbmc_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_xzsbmc);

            controlObj.text('detail_f_sqr_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sqr);

            controlObj.text('detail_f_sqrid_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sqrid);


            controlObj.datetime('detail_f_sqsj_tbl_ld_xzsb_detail_date', 'detail_f_sqsj_tbl_ld_xzsb_detail_time', tbl_ld_xzsb_detail.f_sqsj);

            controlObj.text('detail_f_czr_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_czr);

            controlObj.text('detail_f_czrid_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_czrid);

            if (tbl_ld_xzsb_detail.f_czsj == '0001/1/1 0:00:00')
            {
                controlObj.datetime('detail_f_czsj_tbl_ld_xzsb_detail_date', 'detail_f_czsj_tbl_ld_xzsb_detail_time', "1900-01-01 00:00:00");
            } else
            {

                controlObj.datetime('detail_f_czsj_tbl_ld_xzsb_detail_date', 'detail_f_czsj_tbl_ld_xzsb_detail_time', tbl_ld_xzsb_detail.f_czsj);
            }
            controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_khbh);

            controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_khbhid);

            controlObj.text('detail_f_khjbxx_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_khjbxx);


            controlObj.text('detail_f_khjson_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_khjson);

            controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.fk_tbl_maintable_sys_id);

            controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sbfzid);


            controlObj.datetime('detail_f_azrq_tbl_ld_xzsb_detail_date', 'detail_f_azrq_tbl_ld_xzsb_detail_time', tbl_ld_xzsb_detail.f_azrq);

            controlObj.text('detail_f_sbpp_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sbpp);

            controlObj.text('detail_f_mph_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_mph);

            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sblxid);

            controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_jllxid);

            controlObj.text('detail_f_rs_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_rs);

            controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sbkjid);

            controlObj.text('detail_f_sbdz_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sbdz);

            controlObj.toggle('detail_f_qfzt_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_qfzt);

            controlObj.text('detail_f_synx_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_synx);

            controlObj.text('detail_f_cszm_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_cszm);

            controlObj.fileuploaderbind('detail_f_sbfj_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_sbfj);

            controlObj.fileuploaderbind('detail_f_lcfj_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_lcfj);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_xzsb_detail', tbl_ld_xzsb_detail.f_bz.returnStringRN());

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
    *  获取页面数据，返回对象tbl_ld_xzsb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
       
            var tbl_ld_xzsb_detail = new Object();


            tbl_ld_xzsb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_xzsbbh = controlObj.text('detail_f_xzsbbh_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_xzsbmc = controlObj.text('detail_f_xzsbmc_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_sqr = controlObj.text('detail_f_sqr_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_sqrid = controlObj.text('detail_f_sqrid_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_sqsj = controlObj.datetime('detail_f_sqsj_tbl_ld_xzsb_detail_date', 'detail_f_sqsj_tbl_ld_xzsb_detail_time');


            tbl_ld_xzsb_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_xzsb_detail_date', 'detail_f_czsj_tbl_ld_xzsb_detail_time');


            tbl_ld_xzsb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail');


            //tbl_ld_xzsb_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail');


            //tbl_ld_xzsb_detail.f_khjbxx = controlObj.text('detail_f_khjbxx_tbl_ld_xzsb_detail');


            //tbl_ld_xzsb_detail.f_khjson = controlObj.text('detail_f_khjson_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_sbfz = controlObj.multidropdownlist('detail_f_sbfz_tbl_ld_xzsb_detail');
            tbl_ld_xzsb_detail.f_sbfzid = controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_azrq = controlObj.datetime('detail_f_azrq_tbl_ld_xzsb_detail_date', 'detail_f_azrq_tbl_ld_xzsb_detail_time');


            tbl_ld_xzsb_detail.f_sbpp = controlObj.text('detail_f_sbpp_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_mph = controlObj.text('detail_f_mph_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_sblx = controlObj.singledropdownlist('detail_f_sblx_tbl_ld_xzsb_detail');
            tbl_ld_xzsb_detail.f_sblxid = controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_jllx = controlObj.singledropdownlist('detail_f_jllx_tbl_ld_xzsb_detail');
            tbl_ld_xzsb_detail.f_jllxid = controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_sbkj = controlObj.singledropdownlist('detail_f_sbkj_tbl_ld_xzsb_detail');
            tbl_ld_xzsb_detail.f_sbkjid = controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_sbdz = controlObj.text('detail_f_sbdz_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_qfzt = controlObj.toggle('detail_f_qfzt_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_synx = controlObj.text('detail_f_synx_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_cszm = controlObj.text('detail_f_cszm_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_sbfj = controlObj.fileuploaderid('detail_f_sbfj_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_lcfj = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_xzsb_detail');

            tbl_ld_xzsb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_xzsb_detail');
            tbl_ld_xzsb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_xzsb_detail');


            tbl_ld_xzsb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_xzsb_detail');

            callBackFunction.success(tbl_ld_xzsb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_xzsb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_xzsb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_xzsb_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_xzsbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_xzsbbh_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_xzsbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_xzsbmc_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_sqr.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqr_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_sqrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqrid_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xzsb_detail.f_czr.length > 200)
            {
                errorMessageHansMap.put('detail_f_czr_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_czrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_czrid_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xzsb_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_xzsb_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_xzsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            //if (tbl_ld_xzsb_detail.f_khbhid.length > 200)
            //{
            //    errorMessageHansMap.put('detail_f_khbhid_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            //}




            //if (tbl_ld_xzsb_detail.f_khjbxx.length > 200)
            //{
            //    errorMessageHansMap.put('detail_f_khjbxx_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            //}







            if (tbl_ld_xzsb_detail.fk_tbl_maintable_sys_id.length > 200)
            {
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_sbfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbfz_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_xzsb_detail.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbpp_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_mph.length > 200)
            {
                errorMessageHansMap.put('detail_f_mph_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xzsb_detail.f_sblxid.length < 1)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_xzsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_xzsb_detail.f_jllx.length > 200)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xzsb_detail.f_jllxid.length < 1)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_xzsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_xzsb_detail.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xzsb_detail.f_rs != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_xzsb_detail.f_rs))
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_xzsb_detail', '必须是数字');
            }
            if (tbl_ld_xzsb_detail.f_rs.length < 1)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_xzsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_xzsb_detail.f_sbkj.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbkj_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbdz_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_qfzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_qfzt_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_synx.length > 200)
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xzsb_detail.f_synx != "" && !/^[0-9]+$/.test(tbl_ld_xzsb_detail.f_synx))
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_xzsb_detail', '必须是数字');
            }
            if (tbl_ld_xzsb_detail.f_synx.length < 1)
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_xzsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_xzsb_detail.f_cszm.length > 200)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_xzsb_detail.f_cszm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_xzsb_detail.f_cszm))
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_xzsb_detail', '必须是数字');
            }

            if (tbl_ld_xzsb_detail.f_cszm.length < 1)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_xzsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_xzsb_detail.f_sbfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_sbfj_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_lcfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_lcfj_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_xzsb_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_xzsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            

            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_xzsb_detail);
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
            var whereClause = ' fk_tbl_maintable_sys_id = \'' + that._pr_fk_tbl_maintable_sys_id + '\'';
            var orderByString = '';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_lcfj^f_bz^f_khbhid^f_khjbxx^fk_tbl_maintable_sys_id^f_khbh^f_khjson^f_khjsonid^f_sbfz^f_sbfzid^f_azrq^f_sbpp^f_mph^f_sblx^f_sblxid^f_jllx^f_jllxid^f_rs^f_sbkj^f_sbkjid^f_sbdz^f_synx^f_sbfj^f_cszm^f_qfzt^f_xzsbbh^f_xzsbmc^f_sqr^f_sqrid^f_sqsj^f_czr^f_czrid^f_czsj^f_zt^f_ztid^sys_id';
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
        *  参数:tbl_ld_xzsb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
    updateData = function (tbl_ld_xzsb_detail, callbackFunction)
        {
     
            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_lcfj^f_bz^fk_tbl_maintable_sys_id^f_sbfz^f_sbfzid^f_azrq^f_sbpp^f_mph^f_sblx^f_sblxid^f_jllx^f_jllxid^f_rs^f_sbkj^f_sbkjid^f_sbdz^f_synx^f_sbfj^f_cszm^f_qfzt^f_xzsbbh^f_xzsbmc^f_sqr^f_sqrid^f_sqsj^f_czr^f_czrid^f_czsj^f_zt^f_ztid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: "已保存",

                f_value2: tbl_ld_xzsb_detail.f_value2,

                f_value3: tbl_ld_xzsb_detail.f_value3,

                f_value4: tbl_ld_xzsb_detail.f_value4,

                f_value5: tbl_ld_xzsb_detail.f_value5,

                f_value6: tbl_ld_xzsb_detail.f_value6,

                f_value7: tbl_ld_xzsb_detail.f_value7,

                f_value8: tbl_ld_xzsb_detail.f_value8,

                f_value9: tbl_ld_xzsb_detail.f_value9,

                f_value10: tbl_ld_xzsb_detail.f_value10,

                f_xzsbbh: tbl_ld_xzsb_detail.f_xzsbbh,

                f_xzsbmc: tbl_ld_xzsb_detail.f_xzsbmc,

                f_sqr: tbl_ld_xzsb_detail.f_sqr,

                f_sqrid: tbl_ld_xzsb_detail.f_sqrid,

                f_sqsj: tbl_ld_xzsb_detail.f_sqsj,

                f_czr: tbl_ld_xzsb_detail.f_czr,

                f_czrid: tbl_ld_xzsb_detail.f_czrid,

                f_czsj: tbl_ld_xzsb_detail.f_czsj,

                //f_khbh: tbl_ld_xzsb_detail.f_khbh,

                //f_khbhid: tbl_ld_xzsb_detail.f_khbhid,

                //f_khjbxx: tbl_ld_xzsb_detail.f_khjbxx,

                //f_khjson: tbl_ld_xzsb_detail.f_khjson,
                //f_khjsonid: tbl_ld_xzsb_detail.f_khjsonid,

                fk_tbl_maintable_sys_id: tbl_ld_xzsb_detail.fk_tbl_maintable_sys_id,

                f_sbfz: tbl_ld_xzsb_detail.f_sbfz,
                f_sbfzid: tbl_ld_xzsb_detail.f_sbfzid,

                f_azrq: tbl_ld_xzsb_detail.f_azrq,

                f_sbpp: tbl_ld_xzsb_detail.f_sbpp,

                f_mph: tbl_ld_xzsb_detail.f_mph,

                f_sblx: tbl_ld_xzsb_detail.f_sblx,
                f_sblxid: tbl_ld_xzsb_detail.f_sblxid,

                f_jllx: tbl_ld_xzsb_detail.f_jllx,
                f_jllxid: tbl_ld_xzsb_detail.f_jllxid,

                f_rs: tbl_ld_xzsb_detail.f_rs,

                f_sbkj: tbl_ld_xzsb_detail.f_sbkj,
                f_sbkjid: tbl_ld_xzsb_detail.f_sbkjid,

                f_sbdz: tbl_ld_xzsb_detail.f_sbdz,

                f_qfzt: tbl_ld_xzsb_detail.f_qfzt,

                f_synx: tbl_ld_xzsb_detail.f_synx,

                f_cszm: tbl_ld_xzsb_detail.f_cszm,


                f_sbfj: tbl_ld_xzsb_detail.f_sbfj,


                f_lcfj: tbl_ld_xzsb_detail.f_lcfj,

                f_zt: tbl_ld_xzsb_detail.f_zt,
                f_ztid: tbl_ld_xzsb_detail.f_ztid,

                f_bz: tbl_ld_xzsb_detail.f_bz.formatStringRN(),

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
        *  方法:f_azrq_time_onchange
        *  参数:
        *  安装日期 onchange事件
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
            *  方法:f_qfzt_onchange
            *  参数:event, state
            *  铅封状态切换事件
            */
   f_qfzt_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },



   /* 
        *  
        *  方法:f_sbfj_onchange
        *  参数:
        *  水表附件 onchange事件
        */
   f_sbfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_sbfj_tbl_ld_xzsb_detail');
            },

   /* 
        *  
        *  方法:f_lcfj_onchange
        *  参数:
        *  流程附件 onchange事件
        */
   f_lcfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_xzsb_detail');
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
        _pr_fk_tbl_maintable_sys_id: '',
        //区分居民和大客户（1 大客户，2 居民）
        _pr_iskhlx:'',
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
                                //绑定数据
                                that.bindPage({
                                    success: function ()
                                    {
                                        
                                _validateMessage = new validateMessage('btn_command_save_tbl_ld_xzsb_detail');

                                _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_xzsb_detail');

                                switch (that._pr_pagetype)
                                {
                                    case "1":
                                        setDisable(false);
                                        break;
                                    case "2":
                                        setDisable(true);
                                        break;
                                }
                                $('#div_container_tbl_ld_xzsb_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4lc.html', null, function ()
                                {
                                    //switch (that._pr_iskhlx)
                                    //{

                                    //    case '1':
                                    //        tbl_ld_khb_list_Obj._pr_where = " f_cbbhid in (select sys_id from tbl_ld_cben where f_value1='1')";
                                    //        break;
                                    //    case '2':
                                    //        tbl_ld_khb_list_Obj._pr_where = " f_cbbhid in (select sys_id from tbl_ld_cben where f_value1='2')";
                                    //        break;
                                    //}
                                    tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;        
                                            tbl_ld_khb_list_Obj._pr_f_value2 = that._pr_sys_id;
                                            tbl_ld_khb_list_Obj._pr_f_value1 = that._pr_iskhlx;
                                    tbl_ld_khb_list_Obj.init({
                                        success: function ()
                                        {
                                            $('#div_container_tbl_ld_xzsb_list').css('display', '');
                                            $('#div_loading_tbl_ld_xzsb_list').css('display', 'none');

                                            _blockMessage.hidden();
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
                    success: function (tbl_ld_xzsb_detail)
                    {
                        setModel(tbl_ld_xzsb_detail, {
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
                    success: function (tbl_ld_xzsb_detail)
                    {
                        checkModel(tbl_ld_xzsb_detail, {
                            success: function (tbl_ld_xzsb_detail)
                            {
                                updateData(tbl_ld_xzsb_detail, {
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
            tbl_ld_xzsb_list_Obj.bindGrid({
                success: function ()
                {
                    $('#div_content_part_tbl_ld_xzsb_list').css('display', '');
                    $('#div_content_part_tbl_ld_xzsb_detail').css('display', 'none');
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


        btn_command_opensearch_onclick: function ()
        {
            var khbh = controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail');

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
            $('#div_search_modal_tbl_ld_xzsb_detail').modal('show');
        },
        btn_search_modal_search_onclick: function (callBackFunction)
        {
          
            $('#div_search_modal_tbl_ld_xzsb_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                switch (that._pr_iskhlx)
                {
                    case '1':
                        var czlx = "新增水表_大客户" + "_" + basePageObj._userInfoJson.sys_username;
                        break;
                    case '2':
                        var czlx = "新增水表_居民" + "_" + basePageObj._userInfoJson.sys_username;
                        break;
                }

                var khbh = controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail');
                var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail');
                var clearKhbhString = khbh;
                //如果两个客户编号不相同   那么将第一个客户的f_value1和f_value2清空
                var json = {
                    sys_id: that._pr_sys_id,
                    sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                    sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                };
                var data = {
                    khidString: idArray[0],
                    czlxString: czlx,
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

                        tbl_ld_xzsb_detail_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                        tbl_ld_xzsb_detail_Obj._khJson["khxx"] = khxx[0];
                        tbl_ld_xzsb_detail_Obj._khJson["yhxx"] = yhxx[0];
                        tbl_ld_xzsb_detail_Obj._khJson["sbxx"] = sbxx[0];

                        var khbh = controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail');
                        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail');

                        controlObj.textdisable('detail_f_yhm_tbl_ld_xzsb_detail', true);
                        controlObj.textdisable('detail_f_dz_tbl_ld_xzsb_detail', true);
                        controlObj.textdisable('detail_f_dh_tbl_ld_xzsb_detail', true);
                        //客户信息
                        controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail', khxx[0].f_khbh);
                        controlObj.text('detail_f_yhm_tbl_ld_xzsb_detail', khxx[0].f_yhm);
                        controlObj.text('detail_f_dz_tbl_ld_xzsb_detail', khxx[0].f_dz);
                        controlObj.text('detail_f_dh_tbl_ld_xzsb_detail', khxx[0].f_dh);
                        controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail', khxx[0].sys_id);
                        //水表信息
                        controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_xzsb_detail', sbxx[0].f_sbfzid);
                        controlObj.text('detail_f_sbpp_tbl_ld_xzsb_detail', sbxx[0].f_sbpp);
                        controlObj.text('detail_f_mph_tbl_ld_xzsb_detail', sbxx[0].f_mph);
                        controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_xzsb_detail', sbxx[0].f_sblxid);
                        controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_xzsb_detail', sbxx[0].f_jllxid);
                        controlObj.text('detail_f_rs_tbl_ld_xzsb_detail', sbxx[0].f_rs);
                        controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_xzsb_detail', khxx[0].f_sbkjid);
                        controlObj.text('detail_f_sbdz_tbl_ld_xzsb_detail', sbxx[0].f_sbdz);
                        controlObj.toggle('detail_f_qfzt_tbl_ld_xzsb_detail', sbxx[0].f_qfzt);
                        controlObj.text('detail_f_synx_tbl_ld_xzsb_detail', sbxx[0].f_synx);
                        controlObj.text('detail_f_cszm_tbl_ld_xzsb_detail', sbxx[0].f_cszm);
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
                //var data = {
                //    khidString: idArray[0],
                //    czlxString: czlx,
                //    czidString: that._pr_sys_id,
                //    clientInf: _clientInf
                //};
                //doAjaxFunction(_serviceUrl_kh, 'GetKhxxJsonAndSetCzlx', data, {
                //    success: function (message)
                //    {
                //        var messageJson = (new Function("", "return " + message))();
                //        var khxx = (new Function("", "return " + messageJson["khxx"]))();
                //        var yhxx = (new Function("", "return " + messageJson["yhxx"]))()
                //        var sbxx = (new Function("", "return " + messageJson["sbxx"]))()
                //        tbl_ld_xzsb_detail_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                //        tbl_ld_xzsb_detail_Obj._khJson["khxx"] = khxx[0];
                //        tbl_ld_xzsb_detail_Obj._khJson["yhxx"] = yhxx[0];
                //        tbl_ld_xzsb_detail_Obj._khJson["sbxx"] = sbxx[0];
                //        var khbh = controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail');
                //        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail');
                //        controlObj.textdisable('detail_f_yhm_tbl_ld_xzsb_detail', true);
                //        controlObj.textdisable('detail_f_dz_tbl_ld_xzsb_detail', true);
                //        controlObj.textdisable('detail_f_dh_tbl_ld_xzsb_detail', true);
                //        //客户信息
                //        controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail', khxx[0].f_khbh);
                //        controlObj.text('detail_f_yhm_tbl_ld_xzsb_detail', khxx[0].f_yhm);
                //        controlObj.text('detail_f_dz_tbl_ld_xzsb_detail', khxx[0].f_dz);
                //        controlObj.text('detail_f_dh_tbl_ld_xzsb_detail', khxx[0].f_dh);
                //        controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail', khxx[0].sys_id);
                //        //水表信息
                //        controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_xzsb_detail', sbxx[0].f_sbfzid);
                //        controlObj.text('detail_f_sbpp_tbl_ld_xzsb_detail', sbxx[0].f_sbpp);
                //        controlObj.text('detail_f_mph_tbl_ld_xzsb_detail', sbxx[0].f_mph);
                //        controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_xzsb_detail', sbxx[0].f_sblxid);
                //        controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_xzsb_detail', sbxx[0].f_jllxid);
                //        controlObj.text('detail_f_rs_tbl_ld_xzsb_detail', sbxx[0].f_rs);
                //        controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_xzsb_detail', khxx[0].f_sbkjid);
                //        controlObj.text('detail_f_sbdz_tbl_ld_xzsb_detail', sbxx[0].f_sbdz);
                //        controlObj.toggle('detail_f_qfzt_tbl_ld_xzsb_detail', sbxx[0].f_qfzt);
                //        controlObj.text('detail_f_synx_tbl_ld_xzsb_detail', sbxx[0].f_synx);
                //        controlObj.text('detail_f_cszm_tbl_ld_xzsb_detail', sbxx[0].f_cszm);
                //        if (khbh == khxx[0].f_khbh)
                //        {
                //        }
                //        else
                //        {
                //            //如果两个客户编号不相同   那么将第一个客户的f_value1和f_value2清空
                //            var data = {
                //                khidString: khbhid,
                //                clientInf: _clientInf
                //            };
                //            doAjaxFunction(_serviceUrl_kh, 'ClearCzlx', data, {
                //                success: function (message)
                //                {
                //                },
                //                fail: function (message)
                //                {
                //                    _blockMessage.show('ClearCzlx执行失败<br/>' + message, 'fail');
                //                }
                //            });
                //        }
                //        //向数据库中插入四个字段---------------------------------------
                //        var columns = 'f_khbh^f_khbhid^f_khjbxx^f_khjson';
                //        var yhm = controlObj.text('detail_f_yhm_tbl_ld_xzsb_detail');
                //        var dz = controlObj.text('detail_f_dz_tbl_ld_xzsb_detail');
                //        var dh = controlObj.text('detail_f_dh_tbl_ld_xzsb_detail');
                //        var khxx = yhm + "," + dz + "," + dh;
                //        var khbh = controlObj.text('detail_f_khbh_tbl_ld_xzsb_detail');
                //        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xzsb_detail');
                //        var json = {
                //            sys_id: that._pr_sys_id,
                //            f_khbh: khbh,
                //            f_khbhid: khbhid,
                //            f_khjson: tbl_ld_xzsb_detail_Obj._khJson,
                //            f_khjbxx: khxx
                //        };
                //        var data = {
                //            columns: columns,
                //            clientInf: _clientInf,
                //            json: JSON.stringify(json),
                //        };
                //        doAjaxFunction(_serviceUrl, 'Update', data, {
                //            success: function (message)
                //            {
                //                //callbackFunction.success();
                //            },
                //            fail: function (message)
                //            {
                //                _alertMessage.show(message);
                //            }
                //        });

                //    },
                //    fail: function (message)
                //    {
                //        _blockMessage.show('GetKhxxJsonAndSetCzlx执行失败<br/>' + message, 'fail');
                //    }
                //});                
            }
            else
            {
                _alertMessage.show('必须选择一条记录', 'fail');
            }
        },
        btn_search_modal_cancle_onclick: function ()
        {
            $('#div_search_modal_tbl_ld_xzsb_detail').modal('hide')
        },

        save: function (callBackFunction)
        {
            try
            {                
                getModel({
                    success: function (tbl_ld_xzsb_detail)
                    {
                        checkModel(tbl_ld_xzsb_detail, {
                            success: function (tbl_ld_xzsb_detail)
                            {
                                updateData(tbl_ld_xzsb_detail, {
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
            try
            {

                controlObj.textdisable('detail_f_xzsbbh_tbl_ld_xzsb_detail', true);
                controlObj.textdisable('detail_f_xzsbmc_tbl_ld_xzsb_detail', true);
                controlObj.textdisable('detail_f_sqr_tbl_ld_xzsb_detail', true);
                controlObj.textdisable('detail_f_sqrid_tbl_ld_xzsb_detail', true);
                controlObj.datetimedisable('detail_f_sqsj_tbl_ld_xzsb_detail_date', 'detail_f_sqsj_tbl_ld_xzsb_detail_time', true);

                controlObj.textdisable('detail_f_czr_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_czrid_tbl_ld_xzsb_detail', true);

                controlObj.datetimedisable('detail_f_czsj_tbl_ld_xzsb_detail_date', 'detail_f_czsj_tbl_ld_xzsb_detail_time', true);

                controlObj.textdisable('detail_f_khbh_tbl_ld_xzsb_detail', true);
               
                $('#btn_detail_f_khbh_tbl_ld_xzsb_detail').attr('disabled', 'disabled');               

                controlObj.textdisable('detail_f_khbhid_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_khjbxx_tbl_ld_xzsb_detail', true);


                controlObj.textdisable('detail_f_khjson_tbl_ld_xzsb_detail', true);


                controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xzsb_detail', true);

                controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_xzsb_detail', true);

                controlObj.datetimedisable('detail_f_azrq_tbl_ld_xzsb_detail_date', 'detail_f_azrq_tbl_ld_xzsb_detail_time', true);

                controlObj.textdisable('detail_f_sbpp_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_mph_tbl_ld_xzsb_detail', true);


                controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_xzsb_detail', true);


                controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_rs_tbl_ld_xzsb_detail', true);


                controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_sbdz_tbl_ld_xzsb_detail', true);


                controlObj.toggledisable('detail_f_qfzt_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_synx_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_cszm_tbl_ld_xzsb_detail', true);

                controlObj.fileuploaderdisable('detail_f_sbfj_tbl_ld_xzsb_detail', true);

                controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_xzsb_detail', true);


                controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_bz_tbl_ld_xzsb_detail', true);

                controlObj.textdisable('detail_f_yhm_tbl_ld_xzsb_detail', true);
                controlObj.textdisable('detail_f_dz_tbl_ld_xzsb_detail', true);
                controlObj.textdisable('detail_f_dh_tbl_ld_xzsb_detail', true);

                $('#btn_command_save_tbl_ld_xzsb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
                
            }
            catch (ex)
            {
                _blockMessage.show('disabled执行失败<br/>' + ex.message, 'fail');
            }
        },
        end: function ()
        {
        }


    };

    return that;
})();


