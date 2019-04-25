var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_ickss_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_ickss.asmx/',
        _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
        _baseCodeHashMap = null,

        _validate_read2 = null,
        _validate_read3 = null,
        _validate_write2 = null,

        _validate_print3 = null,

        _validate_write4 = null,
        _validate_reload3 = null,


        _ladda_btn_command3_print = null,


        _ladda_btn_command2_read = null,
        _ladda_btn_command2_reload = null,
        _ladda_btn_command2_write = null,
        _ladda_btn_command3_read = null,
        _ladda_btn_command3_reload = null,
        _ladda_btn_command4_write = null,
        _ladda_btn_command1_rollback = null,
        _ladda_btn_command4_rollback = null,
        _ladda_btn_command5_rollback = null,
        _local_sys_id = "",
        //可见性标志 	1:只能看到自己的数据，0：能看到全部数据
        _isadmin = '',
        //是否邮储标志	0:是邮储，1不是邮储
        _isyouchu = '',
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
                _isadmin = requestQuery('isadmin');
                _isyouchu = requestQuery('isyouchu');
                //读取cookie设置端口号
                var port = getCookie('port');
                if (port != null && port != "")
                {
                    _port = port;
                }

                _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';
                if (that._pr_pagetype == null || that._pr_pagetype == '')
                {
                    _blockMessage.show('_pr_pagetype参数接收失败...', 'fail');
                }
                else
                {
                    if (that._pr_pagetype == '0')
                    {
                        callBackFunction.success();
                    } else
                    {
                        if (that._pr_sys_id == null || that._pr_sys_id == '')
                        {

                            _blockMessage.show('_pr_sys_id参数接收失败', 'fail');
                        }
                        else
                        {
                            callBackFunction.success();
                        }
                    }
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

            codeServiceId += "0564^";

            codeServiceId += "0593^";
            codeServiceId += "0574^";
            codeServiceId += "0797^";
            codeServiceId += "0798^";
            codeServiceId = codeServiceId.trimEnd('^');
            commonObj.getCodeServiceJson(codeServiceId, {
                success: function (resultArray)
                {
                    try
                    {
                        _baseCodeHashMap = new hashMap();
                        _baseCodeHashMap.put('codeservice_0564', resultArray['0564']);
                        _baseCodeHashMap.put('codeservice_0593', resultArray['0593']);
                        _baseCodeHashMap.put('codeservice_0574', resultArray['0574']);
                        _baseCodeHashMap.put('codeservice_0797', resultArray['0797']);
                        _baseCodeHashMap.put('codeservice_0798', resultArray['0798']);
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

                var codeService_0564 = _baseCodeHashMap.get('codeservice_0564');
                var codeService_0593 = _baseCodeHashMap.get('codeservice_0593');
                var codeService_0574 = _baseCodeHashMap.get('codeservice_0574');
                var codeService_0798 = _baseCodeHashMap.get('codeservice_0798');
                var codeService_0797 = _baseCodeHashMap.get('codeservice_0797');
                controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_ickss_detail', codeService_0564, f_zt_onchange);
                controlObj.singledropdownlistinit('detail_f_ly_tbl_ld_ickss_detail', codeService_0593);
                controlObj.singledropdownlistinit('detail_f_jffs_tbl_ld_ickss_detail', codeService_0574);
                controlObj.singledropdownlistinit('detail_f_xkms_tbl_ld_ickss_detail', codeService_0797);
                controlObj.singledropdownlistinit('detail_f_kplb_tbl_ld_ickss_detail', codeService_0798);
                controlObj.toggleinit('detail_f_sfsyye_tbl_ld_ickss_detail', f_sfsyye_onchange);
                controlObj.toggleinit('detail_f_sfsytjjz_tbl_ld_ickss_detail', '');

                controlObj.datetimeinit('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time', '', '');
                controlObj.datetimeinit('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time', '', '');

                controlObj.datetime('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time', '1900-01-01 00:00:00');
                controlObj.datetime('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time', '1900-01-01 00:00:00');

                //模态窗口
                $('#div_print_modal_tbl_ld_ickss_detail').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });
                //加载listpart
                $('#div_container_tbl_ld_ickss_list').load('../tbl_ld_ickss/tbl_ld_ickss_list_part4ickss.html', null, function ()
                {
                    tbl_ld_ickss_list_part4ickss_Obj._pr_listtype = '2';
                    tbl_ld_ickss_list_part4ickss_Obj.init({
                        success: function ()
                        {
                            $('#div_container_tbl_ld_ickss_list').css('display', '');
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
        setDisable = function ()
        {
            var isDisable = false;
            try
            {
                //不管什么状态都锁死
                controlObj.textdisable('detail_f_khbh_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_dh_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_dz_tbl_ld_ickss_detail', true);
                controlObj.textdisable('detail_f_value7_tbl_ld_ickss_detail', true);
                controlObj.textdisable('detail_f_value8_tbl_ld_ickss_detail', true);
                controlObj.textdisable('detail_f_value6_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_yhm_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_lxtkhh_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_jfm_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_sf_tbl_ld_ickss_detail', true);

                controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_ickss_detail', true);

                controlObj.singledropdownlistdisable('detail_f_ly_tbl_ld_ickss_detail', true);

                var ly = controlObj.singledropdownlistid("detail_f_ly_tbl_ld_ickss_detail");
                if (ly == "05930004")
                {
                    $('#btn_command5_rollback_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command5_bprint_tbl_ld_ickss_detail').addClass('hide');

                    $('#btn_command4_write_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command4_bprint_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command4_rollback_tbl_ld_ickss_detail').addClass('hide');

                    $('#btn_command3_print_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command3_read_tbl_ld_ickss_detail').addClass('hide');


                    $('#btn_command2_read_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command2_write_tbl_ld_ickss_detail').addClass('hide');



                    $('#btn_command1_rollback_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command1_print_tbl_ld_ickss_detail').addClass('hide');

                }
                controlObj.textdisable('detail_f_ssbh_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_xkljgl_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_xkgscs_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_xkbcgsl_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_mbcgsl_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_mgscs_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_mljgl_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_mstate_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_dj_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_pwf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_ysje_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_jmhysje_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_khytjjzsf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_khytjjzpwf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_sytjjzsf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_sytjjzpwf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_syhtjjzsf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_syhtjjzpwf_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_khyye_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_syye_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_yhye_tbl_ld_ickss_detail ', true);

                controlObj.textdisable('detail_f_shys_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_shssdx_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_shzl_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_yyt_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_xkr_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_xkrid_tbl_ld_ickss_detail', true);

                controlObj.datetimedisable('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time', true);


                controlObj.textdisable('detail_f_xiekr_tbl_ld_ickss_detail', true);

                controlObj.textdisable('detail_f_xiekrid_tbl_ld_ickss_detail', true);

                controlObj.datetimedisable('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time', true);


                controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_ickss_detail', true);

                controlObj.toggledisable('detail_f_sfsytjjz_tbl_ld_ickss_detail', true);
                //通过状态控制
                var ztid = controlObj.singledropdownlistid("detail_f_zt_tbl_ld_ickss_detail");

                switch (ztid)
                {
                    case "1":
                        //寻卡
                        $('.read').addClass('hidden');
                        $('.rollback').addClass('hidden');
                        $('.print').removeClass('hidden');
                        $('.write').removeClass('hidden');
                        $('.print1').addClass('hidden');
                        if (_isyouchu == '0')
                        {
                            $('#div_row_jfdh').removeClass('hidden');

                        }
                        else
                        {
                            $('#div_row_jfdh').addClass('hidden');

                        }

                        //读卡写卡信息可见性
                        $('#div_row_dkxx').removeClass('hidden');
                        $('#div_row_xkxx').removeClass('hidden');
                        //水量可否修改 
                        controlObj.textdisable('detail_f_sl_tbl_ld_ickss_detail', false);
                        //缴费流水号可见性
                        //缴费信息可见性
                        isDisable = false;
                        //写卡人可见性
                        $('#div_row_xk').removeClass('hidden');

                        break;
                    case "2":
                        //写卡
                        $('.read').addClass('hidden');
                        $('.print').addClass('hidden');
                        $('.write').addClass('hidden');
                        $('.print1').removeClass('hidden');
                        $('.rollback').removeClass('hidden');
                        if (_isyouchu == '0')
                        {
                            $('#div_row_jfdh').removeClass('hidden');
                        }
                        else
                        {
                            $('#div_row_jfdh').addClass('hidden');
                        }

                        //读卡写卡信息可见性
                        $('#div_row_dkxx').addClass('hidden');
                        $('#div_row_xkxx').removeClass('hidden');
                        //水量可否修改 
                        controlObj.textdisable('detail_f_sl_tbl_ld_ickss_detail', true);
                        //缴费流水号可见性
                        //缴费信息可见性
                        isDisable = true;
                        //写卡人可见性
                        $('#div_row_xk').removeClass('hidden');

                        break;
                    case "0":
                        //新建
                        $('.read').removeClass('hidden');
                        $('.print').addClass('hidden');
                        $('.write').addClass('hidden');
                        $('.rollback').addClass('hidden');
                        $('#div_row_jfdh').addClass('hidden');
                        //读卡写卡信息可见性
                        $('#div_row_dkxx').removeClass('hidden');
                        $('#div_row_xkxx').addClass('hidden');
                        //缴费流水号可见性
                        $('#div_row_jfdh').addClass('hidden');
                        //缴费信息部分
                        isDisable = true;
                        //写卡人可见性
                        $('#div_row_xk').addClass('hidden');
                        if (_isyouchu == '0')
                        {
                            $('#div_detail_f_xkms_tbl_ld_ickss_detail').addClass('hidden');
                            $('#div_detail_f_zt_tbl_ld_ickss_detail').addClass('hidden');
                            $('#div_detail_f_ly_tbl_ld_ickss_detail').addClass('hidden');
                            $('#div_detail_f_xkr_tbl_ld_ickss_detail').addClass('hidden');
                            $('#div_detail_f_xkrq_tbl_ld_ickss_detail_date').addClass('hidden');
                        } else
                        {
                            $('#div_detail_f_xkms_tbl_ld_ickss_detail').removeClass('hidden');
                            $('#div_detail_f_zt_tbl_ld_ickss_detail').removeClass('hidden');
                            $('#div_detail_f_ly_tbl_ld_ickss_detail').removeClass('hidden');
                            $('#div_detail_f_xkr_tbl_ld_ickss_detail').removeClass('hidden');
                            $('#div_detail_f_xkrq_tbl_ld_ickss_detail_date').removeClass('hidden');
                        }
                        break;
                    case "3":
                    case "4":
                    case "9":
                        //作废
                        $('.read').addClass('hidden');
                        $('.print').addClass('hidden');
                        $('.print1').addClass('hidden');
                        $('.write').addClass('hidden');
                        $('.rollback').addClass('hidden');
                        break;
                }


                if (that._pr_pagetype == '2')
                {
                    isDisable = true;
                    controlObj.textdisable('detail_f_bz_tbl_ld_ickss_detail', isDisable);

                    $('#btn_command4_write_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command4_bprint_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command4_rollback_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command3_print_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command3_read_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command2_read_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command2_write_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command1_rollback_tbl_ld_ickss_detail').addClass('hide');
                    $('#btn_command1_print_tbl_ld_ickss_detail').addClass('hide');
                }

                //缴费信息部分
                controlObj.singledropdownlistdisable('detail_f_xkms_tbl_ld_ickss_detail', isDisable);
                controlObj.singledropdownlistdisable('detail_f_kplb_tbl_ld_ickss_detail', isDisable);
                controlObj.singledropdownlistdisable('detail_f_jffs_tbl_ld_ickss_detail', isDisable);
                controlObj.textdisable('detail_f_jfdh_tbl_ld_ickss_detail', isDisable);
                controlObj.toggledisable('detail_f_sfsyye_tbl_ld_ickss_detail', isDisable);
                controlObj.textdisable('detail_f_shss_tbl_ld_ickss_detail', isDisable);

                //水量可否修改 
                controlObj.textdisable('detail_f_sl_tbl_ld_ickss_detail', isDisable);

                if (isDisable)
                {
                    $('#btn_detail_f_shss_tbl_ld_ickss_detail').attr('disabled', 'disabled');
                    $('#btn_calc_tbl_ld_ickss_detail').addClass('hidden');
                }
                else
                {
                    $('#btn_detail_f_shss_tbl_ld_ickss_detail').removeAttr('disabled');
                    $('#btn_calc_tbl_ld_ickss_detail').removeClass('hidden');
                }
                //按钮行设置
                switch (that._pr_pagetype)
                {
                    case "0":
                        switch (_isyouchu)
                        {
                            case "1":
                                //营业厅前台IC卡售水
                                //按钮行设置
                                $('#div_rowbtn1').addClass('hidden');
                                $('#div_rowbtn2').removeClass('hidden');
                                $('#div_rowbtn3').addClass('hidden');
                                $('#div_rowbtn4').addClass('hidden');
                                $('#div_rowbtn5').addClass('hidden');
                                break;


                            case "0":
                                //邮储前台寻卡
                                //按钮行设置
                                $('#div_rowbtn1').addClass('hidden');
                                $('#div_rowbtn2').addClass('hidden');
                                $('#div_rowbtn3').removeClass('hidden');
                                $('#div_rowbtn4').addClass('hidden');
                                $('#div_rowbtn5').addClass('hidden');
                                break;
                        }
                        break;
                    case "1":

                        //邮储前台售水
                        //按钮行设置
                        $('#div_rowbtn1').addClass('hidden');
                        $('#div_rowbtn2').addClass('hidden');
                        $('#div_rowbtn3').addClass('hidden');
                        $('#div_rowbtn4').removeClass('hidden');
                        $('#div_rowbtn5').addClass('hidden');
                        break;
                    case "2":
                        if (_isadmin == "0")
                        {
                            //管理员售水记录
                            //按钮行设置
                            $('#div_rowbtn1').removeClass('hidden');
                            $('#div_rowbtn2').addClass('hidden');
                            $('#div_rowbtn3').addClass('hidden');
                            $('#div_rowbtn4').addClass('hidden');
                            $('#div_rowbtn5').addClass('hidden');

                        }
                        else
                        {
                            //营业员售水记录情况
                            //按钮行设置
                            $('#div_rowbtn1').addClass('hidden');
                            $('#div_rowbtn2').addClass('hidden');
                            $('#div_rowbtn3').addClass('hidden');
                            $('#div_rowbtn4').addClass('hidden');
                            $('#div_rowbtn5').removeClass('hidden');

                            switch (_isyouchu)
                            {
                                case "1":
                                    //营业厅前台IC卡售水
                                    //按钮行设置
                                    $('#btn_command5_rollback_tbl_ld_ickss_detail').removeClass('hide');
                                    break;


                                case "0":
                                    //邮储前台寻卡
                                    //按钮行设置
                                    $('#btn_command5_rollback_tbl_ld_ickss_detail').addClass('hide');
                                    break;
                            }

                        }
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
        *  参数:tbl_ld_ickss_detail, callBackFunction
        *  根据数据对象，绑定数据对象到页面控件
        */
        setModel = function (tbl_ld_ickss_detail, callBackFunction)
        {
            try
            {
                controlObj.text('detail_f_value1_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value1);

                controlObj.text('detail_f_value2_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value2);

                controlObj.text('detail_f_value3_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value3);

                controlObj.text('detail_f_value4_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value4);

                controlObj.text('detail_f_value5_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value5);

                controlObj.text('detail_f_value6_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value6);

                controlObj.text('detail_f_value7_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value7);

                controlObj.text('detail_f_value8_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value8);

                controlObj.text('detail_f_value9_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value9);

                controlObj.text('detail_f_value10_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_value10);

                controlObj.text('detail_f_khbh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khbh);

                controlObj.text('detail_f_khbhid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khbhid);

                controlObj.text('detail_f_yhbh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_yhbh);

                controlObj.text('detail_f_dz_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dz);

                controlObj.text('detail_f_sc_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sc);

                controlObj.text('detail_f_pq_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_pq);

                controlObj.text('detail_f_sblx_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sblx);

                controlObj.text('detail_f_yslx_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_yslx);

                controlObj.text('detail_f_kj_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_kj);

                controlObj.text('detail_f_yhbhid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_yhbhid);

                controlObj.text('detail_f_dh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dh);

                controlObj.text('detail_f_scid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_scid);

                controlObj.text('detail_f_pqid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_pqid);

                controlObj.text('detail_f_sblxid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sblxid);

                controlObj.text('detail_f_yslxid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_yslxid);


                controlObj.text('detail_f_khrq_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khrq);

                controlObj.text('detail_f_dy_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dy);

                controlObj.text('detail_f_yhm_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_yhm);

                controlObj.text('detail_f_qy_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_qy);

                controlObj.text('detail_f_sbbh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sbbh);

                controlObj.text('detail_f_lxtkhh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_lxtkhh);

                controlObj.text('detail_f_jfm_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_jfm);

                controlObj.text('detail_f_dyid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dyid);

                controlObj.text('detail_f_qyid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_qyid);

                controlObj.text('detail_f_sbbhid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sbbhid);

                controlObj.text('detail_f_rs_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_rs);

                controlObj.text('detail_f_sf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sf);

                controlObj.text('detail_f_sl_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sl);

                controlObj.text('detail_f_jfdh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_jfdh);

                controlObj.text('detail_f_jfje_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_jfje);

                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_ztid);

                controlObj.text('detail_f_bz_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_bz.returnStringRN());

                controlObj.text('detail_f_xkr_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkr);

                controlObj.text('detail_f_xkrid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkrid);

                controlObj.datetime('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time', tbl_ld_ickss_detail.f_xkrq);


                controlObj.text('detail_f_xiekr_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xiekr);

                controlObj.text('detail_f_xiekrid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xiekrid);

                controlObj.datetime('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time', tbl_ld_ickss_detail.f_xiekrq);


                //新增

                controlObj.text('detail_f_port_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_port);

                //controlObj.text('detail_f_xkms_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkms);

                if (tbl_ld_ickss_detail.f_xkjzlx == '0')
                {
                    controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail', '任意');
                } else
                {
                    controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail', '冷水');
                }

                controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkljgl);

                controlObj.text('detail_f_xkgscs_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkgscs);

                controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkbcgsl);

                controlObj.text('detail_f_xklx_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xklx);

                controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_xkkh);

                controlObj.text('detail_f_ssbh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_ssbh);

                controlObj.text('detail_f_sjbh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sjbh);

                controlObj.text('detail_f_mbcgsl_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dkbcgsl);

                controlObj.text('detail_f_mgscs_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dkgscs);

                controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_dkljgl);

                if (tbl_ld_ickss_detail.f_dkjzlx == '0')
                {
                    controlObj.text('detail_f_Mediatype_tbl_ld_ickss_detail', '任意');
                } else
                {
                    controlObj.text('detail_f_Mediatype_tbl_ld_ickss_detail', '冷水');
                }


                if (tbl_ld_ickss_detail.f_dksbzt == '0')
                {
                    controlObj.text('detail_f_mstate_tbl_ld_ickss_detail', '卡内有水，尚未读表');
                } else
                {
                    controlObj.text('detail_f_mstate_tbl_ld_ickss_detail', '卡已读表');
                }

                controlObj.text('detail_f_kjid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_kjid);


                controlObj.singledropdownlistid('detail_f_ly_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_lyid);

                //第二次新增

                controlObj.text('detail_f_dj_tbl_ld_ickss_detail ', tbl_ld_ickss_detail.f_dj);

                controlObj.text('detail_f_pwf_tbl_ld_ickss_detail  ', tbl_ld_ickss_detail.f_pwf);

                controlObj.text('detail_f_khfz_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khfz);

                controlObj.text('detail_f_khfzid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khfzid);

                controlObj.text('detail_f_cbbh_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_cbbh);

                controlObj.text('detail_f_cbbhid_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_cbbhid);

                controlObj.text('detail_f_ysje_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_ysje);

                controlObj.text('detail_f_jmhysje_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_jmhysje);

                controlObj.text('detail_f_khytjjzsf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khytjjzsf);

                controlObj.text('detail_f_khytjjzpwf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khytjjzpwf);

                controlObj.text('detail_f_sytjjzsf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sytjjzsf);

                controlObj.text('detail_f_sytjjzpwf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sytjjzpwf);

                controlObj.text('detail_f_syhtjjzsf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_syhtjjzsf);

                controlObj.text('detail_f_syhtjjzpwf_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_syhtjjzpwf);

                controlObj.text('detail_f_khyye_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_khyye);

                controlObj.text('detail_f_syye_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_syye);

                controlObj.text('detail_f_yhye_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_yhye);
                if (tbl_ld_ickss_detail.f_syye != null && tbl_ld_ickss_detail.f_syye != "" && parseFloat(tbl_ld_ickss_detail.f_syye) > 0)
                {
                    controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(tbl_ld_ickss_detail.f_shys) + parseFloat(tbl_ld_ickss_detail.f_syye)).toFixed(2));
                }
                else
                {
                    controlObj.text('detail_f_shys_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_shys);
                }

                controlObj.text('detail_f_shss_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_shss);

                controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_shssdx);

                controlObj.text('detail_f_shzl_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_shzl);

                controlObj.text('detail_f_yyt_tbl_ld_ickss_detail ', tbl_ld_ickss_detail.f_yyt);

                controlObj.text('detail_f_yytid_tbl_ld_ickss_detail ', tbl_ld_ickss_detail.f_yytid);

                controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_jffsid);
                controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail', '3');
                controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_kplbid);

                controlObj.toggle('detail_f_sfsyye_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sfsyye);
                controlObj.toggle('detail_f_sfsytjjz_tbl_ld_ickss_detail', tbl_ld_ickss_detail.f_sfsytjjz);

                controlObj.text('detail_f_sfjl_tbl_ld_ickss_detail ', tbl_ld_ickss_detail.f_sfjl);
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
        *  获取页面数据，返回对象tbl_ld_ickss_detail
        */
        getModel = function (callBackFunction)
        {
            try
            {

                var tbl_ld_ickss_detail = new Object();


                tbl_ld_ickss_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_yslx = controlObj.text('detail_f_yslx_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_kj = controlObj.text('detail_f_kj_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_yslxid = controlObj.text('detail_f_yslxid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_khrq = controlObj.text('detail_f_khrq_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_lxtkhh = controlObj.text('detail_f_lxtkhh_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_dkkh = controlObj.text('detail_f_lxtkhh_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_ickss_detail');



                tbl_ld_ickss_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sf = controlObj.text('detail_f_sf_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_sl = controlObj.text('detail_f_sl_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_jfdh = controlObj.text('detail_f_jfdh_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_jfje = controlObj.text('detail_f_jfje_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail');


                tbl_ld_ickss_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xkr = controlObj.text('detail_f_xkr_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xkrid = controlObj.text('detail_f_xkrid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xkrq = controlObj.datetime('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time');


                tbl_ld_ickss_detail.f_xiekr = controlObj.text('detail_f_xiekr_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xiekrid = controlObj.text('detail_f_xiekrid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xiekrq = controlObj.datetime('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time');


                //新增

                tbl_ld_ickss_detail.f_port = controlObj.text('detail_f_port_tbl_ld_ickss_detail');

                //tbl_ld_ickss_detail.f_xkms = controlObj.text('detail_f_xkms_tbl_ld_ickss_detail');

                var xkjzlx = controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail');
                if (xkjzlx == '冷水')
                {
                    tbl_ld_ickss_detail.f_xkjzlx = '1';
                } else
                {
                    tbl_ld_ickss_detail.f_xkjzlx = '0';
                }

                tbl_ld_ickss_detail.f_xkljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xkgscs = controlObj.text('detail_f_xkgscs_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xkbcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xklx = controlObj.text('detail_f_xklx_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_ssbh = controlObj.text('detail_f_ssbh_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_sjbh = controlObj.text('detail_f_sjbh_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_dkbcgsl = controlObj.text('detail_f_mbcgsl_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_dkgscs = controlObj.text('detail_f_mgscs_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_dkljgl = controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail');

                var dkjzlx = controlObj.text('detail_f_Mediatype_tbl_ld_ickss_detail');
                if (dkjzlx == '冷水')
                {
                    tbl_ld_ickss_detail.f_dkjzlx = '1';
                } else
                {
                    tbl_ld_ickss_detail.f_dkjzlx = '0';
                }


                var dksbzt = controlObj.text('detail_f_mstate_tbl_ld_ickss_detail');
                if (dksbzt == '卡内有水，尚未读表')
                {
                    tbl_ld_ickss_detail.f_dksbzt = '0';
                } else
                {
                    tbl_ld_ickss_detail.f_dksbzt = '1';
                }


                tbl_ld_ickss_detail.f_kjid = controlObj.text('detail_f_kjid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_ly = controlObj.singledropdownlist('detail_f_ly_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_lyid = controlObj.singledropdownlistid('detail_f_ly_tbl_ld_ickss_detail');

                //第二次新增

                tbl_ld_ickss_detail.f_dj = controlObj.text('detail_f_dj_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_pwf = controlObj.text('detail_f_pwf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_khfz = controlObj.text('detail_f_khfz_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_khfzid = controlObj.text('detail_f_khfzid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_cbbhid = controlObj.text('detail_f_cbbhid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_ysje = controlObj.text('detail_f_ysje_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_jmhysje = controlObj.text('detail_f_jmhysje_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_khytjjzsf = controlObj.text('detail_f_khytjjzsf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_khytjjzpwf = controlObj.text('detail_f_khytjjzpwf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_sytjjzsf = controlObj.text('detail_f_sytjjzsf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_sytjjzpwf = controlObj.text('detail_f_sytjjzpwf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_syhtjjzsf = controlObj.text('detail_f_syhtjjzsf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_syhtjjzpwf = controlObj.text('detail_f_syhtjjzpwf_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_khyye = controlObj.text('detail_f_khyye_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_syye = controlObj.text('detail_f_syye_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_yhye = controlObj.text('detail_f_yhye_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_shss = controlObj.text('detail_f_shss_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_shssdx = controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_shzl = controlObj.text('detail_f_shzl_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_yyt = controlObj.text('detail_f_yyt_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_yytid = controlObj.text('detail_f_yytid_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_jffs = controlObj.singledropdownlist('detail_f_jffs_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_jffsid = controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_xkms = controlObj.singledropdownlist('detail_f_xkms_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_xkmsid = controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_kplb = controlObj.singledropdownlist('detail_f_kplb_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_kplbid = controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_sfsyye = controlObj.toggle('detail_f_sfsyye_tbl_ld_ickss_detail');
                tbl_ld_ickss_detail.f_sfsytjjz = controlObj.toggle('detail_f_sfsytjjz_tbl_ld_ickss_detail');

                tbl_ld_ickss_detail.f_sfjl = controlObj.text('detail_f_sfjl_tbl_ld_ickss_detail');
                callBackFunction.success(tbl_ld_ickss_detail);
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }
        },

        /* 
        *  
        *  方法:checkModel
        *  参数:tbl_ld_ickss_detail，callbackFunction
        *  基本数据库验证，会用到_validateMessage，校验结果分success，fail
        */
        checkModel = function (tbl_ld_ickss_detail, validateMessage, callBackFunction)
        {

            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();

                if (tbl_ld_ickss_detail.f_value1.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value1_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value2.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value2_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value3.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value3_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value4.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value4_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value5.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value5_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value6.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value6_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value7.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value7_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value8.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value8_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value9.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value9_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_value10.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value10_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_khbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khbh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_khbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khbhid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yhbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhbh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dz.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dz_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sc.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sc_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_pq.length > 200)
                {
                    errorMessageHansMap.put('detail_f_pq_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sblx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sblx_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yslx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yslx_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_kj.length > 200)
                {
                    errorMessageHansMap.put('detail_f_kj_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yhbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_scid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_scid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_pqid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_pqid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sblxid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sblxid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yslxid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yslxid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dy.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dy_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yhm.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhm_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_qy.length > 200)
                {
                    errorMessageHansMap.put('detail_f_qy_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sbbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sbbh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_ickss_detail.f_lxtkhh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_lxtkhh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_jfm.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jfm_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dyid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dyid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_qyid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_qyid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sbbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_rs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_rs_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }



                if (tbl_ld_ickss_detail.f_sl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sl_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_ickss_detail.f_jfdh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jfdh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_jfje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jfje_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_ickss_detail.f_zt.length > 200)
                {
                    errorMessageHansMap.put('detail_f_zt_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_ickss_detail.f_bz.length > 4000)
                {
                    errorMessageHansMap.put('detail_f_bz_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">4000</a>个字');
                }

                //新增

                if (tbl_ld_ickss_detail.f_port.length > 200)
                {
                    errorMessageHansMap.put('detail_f_port_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkms.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkms_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkjzlx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkjzlx_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkljgl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkljgl_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkgscs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkgscs_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkbcgsl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkbcgsl_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xklx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xklx_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkkh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_ssbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_ssbh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sjbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sjbh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dkbcgsl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_mbcgsl_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dkgscs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_mgscs_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dkljgl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_mljgl_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dkjzlx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_Mediatype_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dksbzt.length > 200)
                {
                    errorMessageHansMap.put('detail_f_mstate_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_ly.length > 200)
                {
                    errorMessageHansMap.put('detail_f_ly_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_kjid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_kjid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkr.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkr_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkrid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkrid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xkrq.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xkrq_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xiekr.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xiekr_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xiekrid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xiekrid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_xiekrq.length > 200)
                {
                    errorMessageHansMap.put('detail_f_xiekrq_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                //第二次新增

                if (tbl_ld_ickss_detail.f_khfz.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khfz_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_jffs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jffs_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                //if (tbl_ld_ickss_detail.f_xkms.length > 200)
                //{
                //    errorMessageHansMap.put('detail_f_xkms_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                //}

                if (tbl_ld_ickss_detail.f_kplb.length > 200)
                {
                    errorMessageHansMap.put('detail_f_kplb_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sfsyye.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sfsyye_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sfsytjjz.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sfsytjjz_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_dj.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dj_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_pwf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_pwf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_khfzid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khfzid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_cbbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_cbbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_ysje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_ysje_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_jmhysje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jmhysje_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_khytjjzsf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khytjjzsf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_khytjjzpwf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khytjjzpwf_tbl_ld_ickss_detail ', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sytjjzsf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sytjjzsf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sytjjzpwf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sytjjzpwf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_syhtjjzsf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_syhtjjzsf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_syhtjjzpwf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_syhtjjzpwf_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_khyye.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khyye_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_syye.length > 200)
                {
                    errorMessageHansMap.put('detail_f_syye_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yhye.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhye_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_shys.length > 200)
                {
                    errorMessageHansMap.put('detail_f_shys_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_shss.length > 200)
                {
                    errorMessageHansMap.put('detail_f_shss_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_shssdx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_shssdx_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_shzl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_shzl_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yyt.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yyt_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_detail.f_yytid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yytid_tbl_ld_ickss_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (errorMessageHansMap.keys().length > 0)
                {
                    validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    validateMessage.hidden();
                    callBackFunction.success(tbl_ld_ickss_detail);
                }
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }

        },


        /* 
    *  
    *  方法:writecheckModel
    *  参数:tbl_ld_ickss_detail，callbackFunction
    *  写卡时页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
        writeCheckModel = function (tbl_ld_ickss_detail, validateMessage, callBackFunction)
        {

            try
            {
                //检查是否写卡的卡与写入卡号信息一致

                iccard_part_Obj.command({ "commandName": "read", "port": _port }, {
                    success: function (messageJson)
                    {
                        if (messageJson.result == 'true')
                        {
                            //{"mcardno":"22222222","mbcgsl":"22","mgscs":"0","mljgl":"333","Mediatype":"0","mstate":"1"}
                            var aaa = (new Function("", "return " + messageJson.message))();

                            var cardno = aaa.mcardno.substring(1, aaa.mcardno.length);

                            var errorMessageHansMap = new hashMap();
                            var errorMessagePlacementHansMap = new hashMap();

                            if (cardno != tbl_ld_ickss_detail.f_xkkh)
                            {
                                errorMessageHansMap.put('detail_f_ssbh_tbl_ld_ickss_detail', '选择的售水数据与写卡卡号不一致，请重新选择');
                            }

                            if (tbl_ld_ickss_detail.f_sf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ickss_detail.f_sf))
                            {
                                errorMessageHansMap.put('detail_f_sf_tbl_ld_ickss_detail', '必须是数字');
                            }

                            if (tbl_ld_ickss_detail.f_sf.length < 1)
                            {
                                errorMessageHansMap.put('detail_f_sf_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                            }

                            if (tbl_ld_ickss_detail.f_sl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ickss_detail.f_sl))
                            {
                                errorMessageHansMap.put('detail_f_sl_tbl_ld_ickss_detail', '必须是数字');
                            }

                            if (tbl_ld_ickss_detail.f_sl.length < 1)
                            {
                                errorMessageHansMap.put('detail_f_sl_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                            }
                            if (tbl_ld_ickss_detail.f_shss != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ickss_detail.f_shss))
                            {
                                errorMessageHansMap.put('detail_f_shss_tbl_ld_ickss_detail', '必须是数字');
                            }

                            if (tbl_ld_ickss_detail.f_shss.length < 1)
                            {
                                errorMessageHansMap.put('detail_f_shss_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                            }

                            if (_isyouchu == '0')
                            {
                                if (tbl_ld_ickss_detail.f_jfdh.length < 1)
                                {
                                    errorMessageHansMap.put('detail_f_jfdh_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                                }
                            }

                            if (tbl_ld_ickss_detail.f_xkmsid.length < 1)
                            {
                                errorMessageHansMap.put('detail_f_xkms_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                            }

                            if (tbl_ld_ickss_detail.f_jffs.length < 1)
                            {
                                errorMessageHansMap.put('detail_f_jffs_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                            }


                            if (tbl_ld_ickss_detail.f_kplb.length < 1)
                            {
                                errorMessageHansMap.put('detail_f_kplb_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                            }


                            if (errorMessageHansMap.keys().length > 0)
                            {
                                validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                                callBackFunction.fail('');
                            }
                            else
                            {
                                validateMessage.hidden();
                                callBackFunction.success(tbl_ld_ickss_detail);
                            }
                        }
                        else
                        {

                            callBackFunction.fail("读卡失败,请使用IC工具进行端口设置");
                        }



                    }, fail: function (message)
                    {
                        callBackFunction.fail("读卡异常" + message);
                    }
                });
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }

        },

        /* 
*  
*  方法:commitcheckModel
*  参数:tbl_ld_ickss_detail，callbackFunction
*  提交时页面数据校验，会用到_validateMessage，校验结果分success，fail
*/
        commitCheckModel = function (tbl_ld_ickss_detail, validateMessage, callBackFunction)
        {

            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();

                if (tbl_ld_ickss_detail.f_sf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ickss_detail.f_sf))
                {
                    errorMessageHansMap.put('detail_f_sf_tbl_ld_ickss_detail', '必须是数字');
                }

                if (tbl_ld_ickss_detail.f_sf.length < 1)
                {
                    errorMessageHansMap.put('detail_f_sf_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                }

                if (tbl_ld_ickss_detail.f_sl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ickss_detail.f_sl))
                {
                    errorMessageHansMap.put('detail_f_sl_tbl_ld_ickss_detail', '必须是数字');
                }

                if (tbl_ld_ickss_detail.f_sl.length < 1)
                {
                    errorMessageHansMap.put('detail_f_sl_tbl_ld_ickss_detail', '长度不能小于<a style="color:red">1</a>个字');
                }

                if (errorMessageHansMap.keys().length > 0)
                {
                    validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    validateMessage.hidden();
                    callBackFunction.success(tbl_ld_ickss_detail);
                }
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }

        },
        clearModel = function ()
        {

            controlObj.text('detail_f_value1_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value2_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value3_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value4_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value5_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value6_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value7_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value8_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value9_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_value10_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khbh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khbhid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yhbh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yhbhid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yhm_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_jfm_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_dz_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_dh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_dy_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_dyid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sc_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_scid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_qy_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_qyid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_pq_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_pqid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sbbh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sbbhid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sblx_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sblxid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yslx_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yslxid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_lxtkhh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_rs_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_kj_tbl_ld_ickss_detail', '');

            controlObj.datetime('detail_f_khrq_tbl_ld_ickss_detail', ('1900-01-01 00:00:00'));

            controlObj.text('detail_f_sf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sl_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_jfdh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_jfje_tbl_ld_ickss_detail', '');




            controlObj.text('detail_f_bz_tbl_ld_ickss_detail', '');

            //新增
            controlObj.text('detail_f_port_tbl_ld_ickss_detail', '');

            //controlObj.text('detail_f_xkms_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xkgscs_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xklx_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_ssbh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sjbh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_mbcgsl_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_mgscs_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_Mediatype_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_mstate_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_kjid_tbl_ld_ickss_detail', '');



            controlObj.text('detail_f_xkr_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xkrid_tbl_ld_ickss_detail', '');



            controlObj.text('detail_f_xiekr_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_xiekrid_tbl_ld_ickss_detail', '');


            controlObj.datetime('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time', '1900-01-01 00:00:00');
            controlObj.datetime('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time', '1900-01-01 00:00:00');

            //新增2
            controlObj.text('detail_f_shys_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_shss_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_shzl_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yyt_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yytid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_dj_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_pwf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khfz_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khfzid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_cbbh_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_cbbhid_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_ysje_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_jmhysje_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khytjjzsf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khytjjzpwf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sytjjzsf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_sytjjzpwf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_syhtjjzsf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_syhtjjzpwf_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_khyye_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_syye_tbl_ld_ickss_detail', '');

            controlObj.text('detail_f_yhye_tbl_ld_ickss_detail', '');

            controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_ickss_detail', '');
            controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail', '');
            controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_ickss_detail', '');

            controlObj.toggle('detail_f_sfsyye_tbl_ld_ickss_detail', 'false');
            controlObj.toggle('detail_f_sfsytjjz_tbl_ld_ickss_detail', 'false');

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', '0');

            controlObj.text('detail_f_sfjl_tbl_ld_ickss_detail', '');
            //part程序处理
            tbl_ld_ickss_list_part4ickss_Obj._pr_khbhid = '-1';
            tbl_ld_ickss_list_part4ickss_Obj.bindGrid({
                success: function ()
                {

                }, fail: function () { }
            });

            try
            {
                var data = {
                    typeid: 'IC',
                    nodeid: ''
                }
                doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                    success: function (message)
                    {
                        controlObj.text('detail_f_yyt_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_toporganname);
                        controlObj.text('detail_f_yytid_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_toporgan);
                        controlObj.text('detail_f_ssbh_tbl_ld_ickss_detail', message);
                        if (_isyouchu == '0')
                        {
                            //controlObj.singledropdownlist('detail_f_ly_tbl_ld_ickss_detail', '启用');
                            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_ickss_detail', '05930001');
                        } else
                        {
                            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_ickss_detail', '05930002');
                        }

                    },
                    fail: function (message)
                    {
                        _blockMessage.show('获取最大业务表号失败' + message, 'fail');
                    }
                });

            }
            catch (ex)
            {
                _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');
            }

            _validate_read2.hidden();
            _validate_read3.hidden();
            _validate_write2.hidden();
            _validate_print3.hidden();
            _validate_write4.hidden();
            _validate_reload3.hidden();





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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_yslx^f_yslxid^f_lxtkhh^f_rs^f_kj^f_khrq^f_sf^f_sl^f_jfdh^f_zt^f_ztid^f_bz^f_xkr^f_xkrid^f_xkrq^f_xiekr^f_xiekrid^f_xiekrq^f_port^f_xkms^f_xkjzlx^f_xkljgl^f_xkgscs^f_xkbcgsl^f_xklx^f_xkkh^f_ssbh^f_sjbh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_ly^f_lyid^f_dkkh^f_kjid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_dj^f_pwf^f_ysje^f_jmhysje^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_shzl^f_shssdx^f_jffs^f_jffsid^f_xkmsid^f_yyt^f_yytid^f_sfjl^f_kplb^f_kplbid^sys_id';
            var pageSizeString = '';
            var pageIndexString = '';
            var data = {
                whereString: whereClause,
                cxzxsjString: 'true',
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
        *  参数:tbl_ld_ickss_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_ickss_detail, type, callbackFunction)
        {
            if (type == "tg")
            {

                var d = new Date();

                tbl_ld_ickss_detail.f_sf = "-" + tbl_ld_ickss_detail.f_sf;

                tbl_ld_ickss_detail.f_sl = "-" + tbl_ld_ickss_detail.f_sl;

                tbl_ld_ickss_detail.f_zt = "退购";
                tbl_ld_ickss_detail.f_ztid = "3";
                tbl_ld_ickss_detail.f_xkr = tbl_ld_ickss_detail.f_xiekr;
                tbl_ld_ickss_detail.f_xkrid = tbl_ld_ickss_detail.f_xiekrid;
                tbl_ld_ickss_detail.f_xkrq = tbl_ld_ickss_detail.f_xiekrq;

                tbl_ld_ickss_detail.f_xiekr = basePageObj._userInfoJson.sys_username;
                tbl_ld_ickss_detail.f_xiekrid = basePageObj._userInfoJson.sys_userid;

                tbl_ld_ickss_detail.f_xiekrq = d.Format('yyyy-MM-dd hh:mm:ss');

                var xkljgl = tbl_ld_ickss_detail.f_xkljgl;

                tbl_ld_ickss_detail.f_xkljgl = tbl_ld_ickss_detail.f_dkljgl;

                var xkgscs = tbl_ld_ickss_detail.f_xkgscs;
                tbl_ld_ickss_detail.f_xkgscs = tbl_ld_ickss_detail.f_dkgscs;

                var xkbcgsl = tbl_ld_ickss_detail.f_xkbcgsl;
                tbl_ld_ickss_detail.f_xkbcgsl = "0";


                tbl_ld_ickss_detail.f_dkbcgsl = xkbcgsl;

                tbl_ld_ickss_detail.f_dkgscs = xkgscs;

                tbl_ld_ickss_detail.f_dkljgl = xkljgl;


                tbl_ld_ickss_detail.f_pwf = "-" + tbl_ld_ickss_detail.f_pwf;


                tbl_ld_ickss_detail.f_ysje = "-" + tbl_ld_ickss_detail.f_ysje;


                tbl_ld_ickss_detail.f_jmhysje = "-" + tbl_ld_ickss_detail.f_jmhysje;

                var khytjjzsf = tbl_ld_ickss_detail.f_khytjjzsf;
                tbl_ld_ickss_detail.f_khytjjzsf = tbl_ld_ickss_detail.f_syhtjjzsf;
                var khytjjzpwf = tbl_ld_ickss_detail.f_khytjjzpwf;
                tbl_ld_ickss_detail.f_khytjjzpwf = tbl_ld_ickss_detail.f_syhtjjzpwf;

                if (tbl_ld_ickss_detail.f_sytjjzsf != null && tbl_ld_ickss_detail.f_sytjjzsf != "" && tbl_ld_ickss_detail.f_sytjjzsf != "0")
                {
                    tbl_ld_ickss_detail.f_sytjjzsf = "-" + tbl_ld_ickss_detail.f_sytjjzsf;
                }

                if (tbl_ld_ickss_detail.f_sytjjzpwf != null && tbl_ld_ickss_detail.f_sytjjzpwf != "" && tbl_ld_ickss_detail.f_sytjjzpwf != "0")
                {
                    tbl_ld_ickss_detail.f_sytjjzpwf = "-" + tbl_ld_ickss_detail.f_sytjjzpwf;
                }



                tbl_ld_ickss_detail.f_syhtjjzsf = khytjjzsf;
                tbl_ld_ickss_detail.f_syhtjjzpwf = khytjjzpwf;

                var khyye = tbl_ld_ickss_detail.f_khyye;
                tbl_ld_ickss_detail.f_khyye = tbl_ld_ickss_detail.f_yhye;

                if (tbl_ld_ickss_detail.f_syye != null && tbl_ld_ickss_detail.f_syye != "" && tbl_ld_ickss_detail.f_syye != "0")
                {
                    tbl_ld_ickss_detail.f_syye = "-" + tbl_ld_ickss_detail.f_syye;
                }

                tbl_ld_ickss_detail.f_yhye = khyye;


                tbl_ld_ickss_detail.f_shys = "-" + tbl_ld_ickss_detail.f_shys;


                tbl_ld_ickss_detail.f_shss = tbl_ld_ickss_detail.f_shys;

                tbl_ld_ickss_detail.f_shzl = "0";


                tbl_ld_ickss_detail.f_shssdx = "负" + tbl_ld_ickss_detail.f_shssdx;

                tbl_ld_ickss_detail.f_tgly = that._pr_sys_id;
                tbl_ld_ickss_detail.sys_id = "";
                tbl_ld_ickss_detail.sys_delflag = '0';
                tbl_ld_ickss_detail.sys_lasteditusername = basePageObj._userInfoJson.sys_username;
                tbl_ld_ickss_detail.sys_lastedituserid = basePageObj._userInfoJson.sys_userid;
                tbl_ld_ickss_detail.sys_lasteditdate = d.Format('yyyy-MM-dd hh:mm:ss');
                tbl_ld_ickss_detail.sys_creatdate = d.Format('yyyy-MM-dd hh:mm:ss');
                tbl_ld_ickss_detail.sys_creatusername = basePageObj._userInfoJson.sys_username;
                tbl_ld_ickss_detail.sys_creatuserid = basePageObj._userInfoJson.sys_userid;

                var sfjl = tbl_ld_ickss_detail.f_sfjl.split("^");
                tbl_ld_ickss_detail.f_sfjl = sfjl[0] + "^" + sfjl[1] + "^-" + sfjl[2];

                var data = {
                    json: JSON.stringify(tbl_ld_ickss_detail),
                    type: type,
                    clientInf: _clientInf
                }

                doAjaxFunction(_serviceUrl, 'Add', data, {
                    success: function (result)
                    {
                        callbackFunction.success();
                    },
                    fail: function (message)
                    {
                        callBackFunction.fail('Add:' + message);
                    }
                });

            }
            else
            {
                var d = new Date();
                var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_yslx^f_yslxid^f_lxtkhh^f_rs^f_kj^f_khrq^f_sf^f_sl^f_jfdh^f_zt^f_ztid^f_bz^f_xkr^f_xkrid^f_xkrq^f_xiekr^f_xiekrid^f_xiekrq^f_port^f_xkms^f_xkjzlx^f_xkljgl^f_xkgscs^f_xkbcgsl^f_xklx^f_xkkh^f_ssbh^f_sjbh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_ly^f_lyid^f_dkkh^f_kjid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_dj^f_pwf^f_ysje^f_jmhysje^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_shzl^f_shssdx^f_jffs^f_jffsid^f_xkmsid^f_yyt^f_yytid^f_sfjl^f_kplb^f_kplbid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {


                    f_value1: tbl_ld_ickss_detail.f_value1,

                    f_value2: tbl_ld_ickss_detail.f_value2,

                    f_value3: tbl_ld_ickss_detail.f_value3,

                    f_value4: tbl_ld_ickss_detail.f_value4,

                    f_value5: tbl_ld_ickss_detail.f_value5,

                    f_value6: tbl_ld_ickss_detail.f_value6,

                    f_value7: tbl_ld_ickss_detail.f_value7,

                    f_value8: tbl_ld_ickss_detail.f_value8,

                    f_value9: tbl_ld_ickss_detail.f_value9,

                    f_value10: tbl_ld_ickss_detail.f_value10,

                    f_khbh: tbl_ld_ickss_detail.f_khbh,

                    f_khbhid: tbl_ld_ickss_detail.f_khbhid,

                    f_yhbh: tbl_ld_ickss_detail.f_yhbh,

                    f_dz: tbl_ld_ickss_detail.f_dz,

                    f_sc: tbl_ld_ickss_detail.f_sc,

                    f_pq: tbl_ld_ickss_detail.f_pq,

                    f_sblx: tbl_ld_ickss_detail.f_sblx,

                    f_yslx: tbl_ld_ickss_detail.f_yslx,

                    f_kj: tbl_ld_ickss_detail.f_kj,

                    f_yhbhid: tbl_ld_ickss_detail.f_yhbhid,

                    f_dh: tbl_ld_ickss_detail.f_dh,

                    f_scid: tbl_ld_ickss_detail.f_scid,

                    f_pqid: tbl_ld_ickss_detail.f_pqid,

                    f_sblxid: tbl_ld_ickss_detail.f_sblxid,

                    f_yslxid: tbl_ld_ickss_detail.f_yslxid,

                    f_khrq: tbl_ld_ickss_detail.f_khrq,

                    f_dy: tbl_ld_ickss_detail.f_dy,

                    f_yhm: tbl_ld_ickss_detail.f_yhm,

                    f_qy: tbl_ld_ickss_detail.f_qy,

                    f_sbbh: tbl_ld_ickss_detail.f_sbbh,

                    f_lxtkhh: tbl_ld_ickss_detail.f_lxtkhh,

                    f_dkkh: tbl_ld_ickss_detail.f_lxtkhh,

                    f_jfm: tbl_ld_ickss_detail.f_jfm,

                    f_dyid: tbl_ld_ickss_detail.f_dyid,

                    f_qyid: tbl_ld_ickss_detail.f_qyid,

                    f_sbbhid: tbl_ld_ickss_detail.f_sbbhid,

                    f_rs: tbl_ld_ickss_detail.f_rs,

                    f_sf: tbl_ld_ickss_detail.f_sf,

                    f_sl: tbl_ld_ickss_detail.f_sl,

                    f_jfdh: tbl_ld_ickss_detail.f_jfdh,

                    f_jfje: tbl_ld_ickss_detail.f_jfje,

                    f_zt: tbl_ld_ickss_detail.f_zt,
                    f_ztid: tbl_ld_ickss_detail.f_ztid,

                    f_bz: tbl_ld_ickss_detail.f_bz.formatStringRN(),

                    f_xkr: tbl_ld_ickss_detail.f_xkr,

                    f_xkrid: tbl_ld_ickss_detail.f_xkrid,

                    f_xkrq: tbl_ld_ickss_detail.f_xkrq,

                    f_xiekr: tbl_ld_ickss_detail.f_xiekr,

                    f_xiekrid: tbl_ld_ickss_detail.f_xiekrid,

                    f_xiekrq: tbl_ld_ickss_detail.f_xiekrq,

                    //新增

                    f_port: tbl_ld_ickss_detail.f_port,

                    f_xkms: tbl_ld_ickss_detail.f_xkms,

                    f_xkjzlx: tbl_ld_ickss_detail.f_xkjzlx,

                    f_xkljgl: tbl_ld_ickss_detail.f_xkljgl,

                    f_xkgscs: tbl_ld_ickss_detail.f_xkgscs,

                    f_xkbcgsl: tbl_ld_ickss_detail.f_xkbcgsl,

                    f_xklx: tbl_ld_ickss_detail.f_xklx,

                    f_xkkh: tbl_ld_ickss_detail.f_xkkh,

                    f_ssbh: tbl_ld_ickss_detail.f_ssbh,

                    f_sjbh: tbl_ld_ickss_detail.f_sjbh,

                    f_dkbcgsl: tbl_ld_ickss_detail.f_dkbcgsl,

                    f_dkgscs: tbl_ld_ickss_detail.f_dkgscs,

                    f_dkljgl: tbl_ld_ickss_detail.f_dkljgl,

                    f_dkjzlx: tbl_ld_ickss_detail.f_dkjzlx,

                    f_dksbzt: tbl_ld_ickss_detail.f_dksbzt,

                    f_kjid: tbl_ld_ickss_detail.f_kjid,

                    f_ly: tbl_ld_ickss_detail.f_ly,
                    f_lyid: tbl_ld_ickss_detail.f_lyid,

                    //新增2
                    f_khfz: tbl_ld_ickss_detail.f_khfz,


                    f_khfzid: tbl_ld_ickss_detail.f_khfzid,


                    f_cbbh: tbl_ld_ickss_detail.f_cbbh,


                    f_cbbhid: tbl_ld_ickss_detail.f_cbbhid,


                    f_dj: tbl_ld_ickss_detail.f_dj,


                    f_pwf: tbl_ld_ickss_detail.f_pwf,


                    f_ysje: tbl_ld_ickss_detail.f_ysje,


                    f_jmhysje: tbl_ld_ickss_detail.f_jmhysje,


                    f_khytjjzsf: tbl_ld_ickss_detail.f_khytjjzsf,


                    f_khytjjzpwf: tbl_ld_ickss_detail.f_khytjjzpwf,

                    f_sfsytjjz: tbl_ld_ickss_detail.f_sfsytjjz,


                    f_sytjjzsf: tbl_ld_ickss_detail.f_sytjjzsf,


                    f_sytjjzpwf: tbl_ld_ickss_detail.f_sytjjzpwf,


                    f_syhtjjzsf: tbl_ld_ickss_detail.f_syhtjjzsf,


                    f_khyye: tbl_ld_ickss_detail.f_khyye,


                    f_sfsyye: tbl_ld_ickss_detail.f_sfsyye,


                    f_syye: tbl_ld_ickss_detail.f_syye,


                    f_yhye: tbl_ld_ickss_detail.f_yhye,


                    f_shys: tbl_ld_ickss_detail.f_shys,


                    f_shss: tbl_ld_ickss_detail.f_shss,

                    f_shzl: tbl_ld_ickss_detail.f_shzl,


                    f_shssdx: tbl_ld_ickss_detail.f_shssdx,


                    f_jffs: tbl_ld_ickss_detail.f_jffs,

                    f_jffsid: tbl_ld_ickss_detail.f_jffsid,


                    f_xkmsid: tbl_ld_ickss_detail.f_xkmsid,


                    f_yyt: tbl_ld_ickss_detail.f_yyt,

                    f_yytid: tbl_ld_ickss_detail.f_yytid,

                    f_kplb: tbl_ld_ickss_detail.f_kplb,


                    f_kplbid: tbl_ld_ickss_detail.f_kplbid,

                    f_syhtjjzpwf: tbl_ld_ickss_detail.f_syhtjjzpwf,

                    f_sfjl: tbl_ld_ickss_detail.f_sfjl,
                    sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                    sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                    sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
                };


                if (that._pr_pagetype == '0')
                {
                    json.sys_id = _local_sys_id;
                }
                else
                {
                    json.sys_id = that._pr_sys_id;
                }

                var data = {
                    type: type,
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
            }
        },
        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
        addDetailData = function (tbl_ld_ickss_detail, type, callBackFunction)
        {
            var d = new Date();

            tbl_ld_ickss_detail.sys_id = "";
            tbl_ld_ickss_detail.sys_delflag = '0';
            tbl_ld_ickss_detail.sys_lasteditusername = basePageObj._userInfoJson.sys_username;
            tbl_ld_ickss_detail.sys_lastedituserid = basePageObj._userInfoJson.sys_userid;
            tbl_ld_ickss_detail.sys_lasteditdate = d.Format('yyyy-MM-dd hh:mm:ss');
            tbl_ld_ickss_detail.sys_creatdate = d.Format('yyyy-MM-dd hh:mm:ss');
            tbl_ld_ickss_detail.sys_creatusername = basePageObj._userInfoJson.sys_username;
            tbl_ld_ickss_detail.sys_creatuserid = basePageObj._userInfoJson.sys_userid;

            var data = {
                json: JSON.stringify(tbl_ld_ickss_detail),
                type: type,
                clientInf: _clientInf
            }

            doAjaxFunction(_serviceUrl, 'Add', data, {
                success: function (result)
                {
                    callBackFunction.success(result);
                },
                fail: function (message)
                {
                    callBackFunction.fail('Add:' + message);
                }
            });
        },


        //---------------------------------------------------------------------------------
        // ---------------------------------控件事件------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:f_khrq_time_onchange
        *  参数:
        *  开户时间 onchange事件
        */
        f_khrq_time_onchange = function (e)
        {
            var r = e.currentTarget.id
        },
        /* 
        *  
        *  方法:f_khrq_date_onchange
        *  参数:
        *  开户时间 onchange事件
        */
        f_khrq_date_onchange = function (ev)
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
        *  方法:f_sfykfp_onchange
        *  参数:event, state
        *  是否使用余额切换事件
        */
        f_sfsyye_onchange = function (event, state)
        {

            //原绿化表押金
            var yycje = controlObj.text('detail_f_khyye_tbl_ld_ickss_detail');
            //使用绿化表押金
            var syycje = controlObj.text('detail_f_syye_tbl_ld_ickss_detail');
            //用后绿化表押金
            var yhycje = controlObj.text('detail_f_yhye_tbl_ld_ickss_detail');
            if (state)
            {
                //改为使用 绿化表押金
                //绿化表押金部分，默认使用绿化表押金
                //2.判断是否存在绿化表押金
                if (yycje != null && yycje !== "" && parseFloat(yycje) > 0)
                {
                    //2.1存在绿化表押金情况
                    var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                    //2.2判断绿化表押金是否大于算后应收
                    if (parseFloat(yycje) > parseFloat(shys))
                    {
                        //2.2.1使用算后金额
                        var syycje = parseFloat(shys).toFixed(2);
                        controlObj.text('detail_f_syye_tbl_ld_ickss_detail', syycje);//使用绿化表押金
                        controlObj.text('detail_f_yhye_tbl_ld_ickss_detail', (parseFloat(yycje) - parseFloat(syycje)).toFixed(2));//使用后绿化表押金
                        controlObj.text('detail_f_shys_tbl_ld_ickss_detail', '0'); //算后应收更新
                        controlObj.text('detail_f_shss_tbl_ld_ickss_detail', '0'); //算后实收更新



                    }
                    else
                    {
                        //2.2.2使用绿化表押金
                        var syycje = parseFloat(yycje).toFixed(2);
                        controlObj.text('detail_f_syye_tbl_ld_ickss_detail', syycje);//使用绿化表押金
                        controlObj.text('detail_f_yhye_tbl_ld_ickss_detail', '0');//使用后调价结转水费
                        controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(syycje)).toFixed(2)); //算后应收更新
                        controlObj.text('detail_f_shss_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(syycje)).toFixed(2)); //算后实收更新

                    }

                }


            }
            else
            {
                //改为不使用绿化表押金
                //判断是否使用了绿化表押金
                if (syycje != null && syycje !== "" && parseFloat(syycje) > 0)
                {
                    var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                    controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(shys) + parseFloat(syycje)).toFixed(2)); //算后应收更新
                    controlObj.text('detail_f_shss_tbl_ld_ickss_detail', (parseFloat(shys) + parseFloat(syycje)).toFixed(2)); //算后实收更新
                    controlObj.text('detail_f_syye_tbl_ld_ickss_detail', '0');//使用绿化表押金
                    controlObj.text('detail_f_yhye_tbl_ld_ickss_detail', yycje);//使用后调价结转水费


                }

            }
            //算后应收大写转中文
            var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
            controlObj.text('detail_f_shss_tbl_ld_ickss_detail', shys); //算后实收
            controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail', autoChinese(shys));
        },
        //读卡方法
        readCardAndGetData = function (callBackFunction)
        {

            iccard_part_Obj.command({ "commandName": "read", "port": _port }, {
                success: function (messageJson)
                {
                    if (messageJson.result == 'true')
                    {
                        //{"mcardno":"22222222","mbcgsl":"22","mgscs":"0","mljgl":"333","Mediatype":"0","mstate":"1"}
                        var aaa = (new Function("", "return " + messageJson.message))();

                        var cardno = aaa.mcardno.substring(1, aaa.mcardno.length);
                        var flag = true;
                        var filter = ",0000554,0000577,0001905,0001705,0001753,0002796,0002566,0002435,0002694,0004901,0002329,0003996,0005265,0000710,0001560,0001804,0001582,0001205,0002867,0004477,2000523,3000188,0001391,0001432,0001214,0002107,0000123,0005614,0002893,0005864,0002722,0001098,0001104,0000959,0001647,0001453,0000610,0005737,0005621,0004772,0004755,0004787,0001670,0002076,0003628,0004692,0002738,0200181,0007003,0000896,0000523,0000806,0001738,0002198,0002870,0002706,0001294,0004273,0005645,0000715,0001121,0001815,0001491,0002691,0004210,0003785,0002736,2000034,";
                        if (filter.indexOf("," + cardno + ",") != -1 && flag)
                        {
                            _alertMessage.show("老系统号重复，请联系管理员！", 'fail');
                        }
                        else
                        {
                            var mcard = aaa.mcardno;
                            while (mcard.length < 8)
                            {
                                mcard = "0" + mcard;
                            }
                            var card03 = "03" + mcard;
                            var card00 = "00" + mcard;
                            var sqlJson = {
                                "tbl_ld_khb_lxth": "select t.*,(select f_mph from tbl_ld_sbb where f_khbh=t.f_khbh and sys_delflag='0' and f_ztid='0')as f_mph from (select * from tbl_ld_khb where sys_delflag='0' and f_ztid='0'and f_lxth = '" + cardno + "' and f_cbbh like ('IC%') order by sys_id) t",
                                "tbl_ld_khb_sb03": "select t.*,(select f_mph from tbl_ld_sbb where f_khbh=t.f_khbh and sys_delflag='0' and f_ztid='0')as f_mph from (select * from tbl_ld_khb where sys_delflag='0' and f_ztid='0'and f_sbbh = '" + card03 + "' and f_cbbh like ('IC%') order by sys_id) t",
                                "tbl_ld_khb_sb00": "select t.*,(select f_mph from tbl_ld_sbb where f_khbh=t.f_khbh and sys_delflag='0' and f_ztid='0')as f_mph from (select * from tbl_ld_khb where sys_delflag='0' and f_ztid='0'and f_sbbh = '" + card00 + "' and f_cbbh like ('IC%') order by sys_id) t"
                            }
                            commonObj.querySqls(sqlJson, {
                                success: function (messageJson1)
                                {
                                    var khobj = "";
                                    var flag = true;
                                    if (messageJson1["tbl_ld_khb_lxth"].length == 1)
                                    {
                                        khobj = messageJson1["tbl_ld_khb_lxth"][0];

                                    } else if (messageJson1["tbl_ld_khb_sb03"].length == 1)
                                    {
                                        khobj = messageJson1["tbl_ld_khb_sb03"][0];

                                    }
                                    else if (messageJson1["tbl_ld_khb_sb00"].length == 1)
                                    {
                                        khobj = messageJson1["tbl_ld_khb_sb00"][0];

                                    }
                                    else
                                    {
                                        _alertMessage.show('此水卡对应多个用户' + cardno + '|' + card03 + '|' + card00 + '，请联系管理员！', 'fail');
                                        flag = false;
                                        callBackFunction.fail();
                                    }
                                    if (flag)
                                    {
                                        controlObj.text('detail_f_value7_tbl_ld_ickss_detail', khobj.f_sbbh);//水表编号
                                        controlObj.text('detail_f_value8_tbl_ld_ickss_detail', khobj.f_sbdz);//水表地址
                                        controlObj.text('detail_f_value6_tbl_ld_ickss_detail', khobj.f_mph);//铭牌号

                                        controlObj.text('detail_f_khbh_tbl_ld_ickss_detail', khobj.f_khbh);//客户编号

                                        controlObj.text('detail_f_khbhid_tbl_ld_ickss_detail', khobj.sys_id);//客户编号id

                                        controlObj.text('detail_f_yhbh_tbl_ld_ickss_detail', khobj.f_yhbh);//用户编号

                                        controlObj.text('detail_f_yhbhid_tbl_ld_ickss_detail', khobj.f_yhbhid);//用户编号id

                                        controlObj.text('detail_f_dz_tbl_ld_ickss_detail', khobj.f_dz);//地址

                                        controlObj.text('detail_f_sc_tbl_ld_ickss_detail', khobj.f_sc);//水厂

                                        controlObj.text('detail_f_pq_tbl_ld_ickss_detail', khobj.f_pq);//片区

                                        controlObj.text('detail_f_sblx_tbl_ld_ickss_detail', khobj.f_sblx);//水表类型

                                        controlObj.text('detail_f_yslx_tbl_ld_ickss_detail', khobj.f_yslx);//用水类型

                                        controlObj.text('detail_f_kj_tbl_ld_ickss_detail', khobj.f_sbkj);//口径

                                        controlObj.text('detail_f_kjid_tbl_ld_ickss_detail', khobj.f_sbkjid);//口径id

                                        controlObj.text('detail_f_yhbhid_tbl_ld_ickss_detail', khobj.f_yhbhid);//用户编号

                                        controlObj.text('detail_f_dh_tbl_ld_ickss_detail', khobj.f_dh);//电话

                                        controlObj.text('detail_f_scid_tbl_ld_ickss_detail', khobj.f_scid);//水厂id

                                        controlObj.text('detail_f_pqid_tbl_ld_ickss_detail', khobj.f_pqid);//片区id

                                        controlObj.text('detail_f_sblxid_tbl_ld_ickss_detail', khobj.f_sblxid);//水表类型id

                                        controlObj.text('detail_f_yslxid_tbl_ld_ickss_detail', khobj.f_yslxid);//用水类型id

                                        controlObj.text('detail_f_khrq_tbl_ld_ickss_detail', khobj.f_khrq);//开户时间

                                        controlObj.text('detail_f_dy_tbl_ld_ickss_detail', khobj.f_dy);//地域

                                        controlObj.text('detail_f_yhm_tbl_ld_ickss_detail', khobj.f_yhm);//用户名

                                        controlObj.text('detail_f_qy_tbl_ld_ickss_detail', khobj.f_qy);//区域

                                        controlObj.text('detail_f_sbbh_tbl_ld_ickss_detail', khobj.f_sbbh);//水表编号

                                        controlObj.text('detail_f_lxtkhh_tbl_ld_ickss_detail', cardno);//老系统号

                                        controlObj.text('detail_f_jfm_tbl_ld_ickss_detail', khobj.f_jfm);//缴费名

                                        controlObj.text('detail_f_dyid_tbl_ld_ickss_detail', khobj.f_dyid);//地域id

                                        controlObj.text('detail_f_qyid_tbl_ld_ickss_detail', khobj.f_qyid);//区域id

                                        controlObj.text('detail_f_sbbhid_tbl_ld_ickss_detail', khobj.f_sbbhid);//水表编号id

                                        controlObj.text('detail_f_rs_tbl_ld_ickss_detail', khobj.f_rs);//人数

                                        controlObj.text('detail_f_mbcgsl_tbl_ld_ickss_detail', aaa.mbcgsl);//本次购水量

                                        controlObj.text('detail_f_mgscs_tbl_ld_ickss_detail', aaa.mgscs);//购水次数

                                        if (khobj.f_ickljgl != null && khobj.f_ickljgl != "")
                                        {
                                            controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail', khobj.f_ickljgl);//累计购水量
                                        }
                                        else
                                        {
                                            controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail', "0");//累计购水量
                                        }



                                        //新增
                                        controlObj.text('detail_f_port_tbl_ld_ickss_detail', _port);//串口

                                        controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail', cardno);//写卡卡号

                                        controlObj.text('detail_f_xklx_tbl_ld_ickss_detail', '0');//写卡类型

                                        controlObj.text('detail_f_xkgscs_tbl_ld_ickss_detail', parseInt(aaa.mgscs) + 1);//写卡购水次数

                                        controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail', '3');//写卡模式

                                        //新增2
                                        controlObj.text('detail_f_khfz_tbl_ld_ickss_detail', khobj.f_khfz);//客户分组

                                        controlObj.text('detail_f_khfzid_tbl_ld_ickss_detail', khobj.f_khfzid);//客户分组id

                                        controlObj.text('detail_f_cbbh_tbl_ld_ickss_detail', khobj.f_cbbh);//抄表编号

                                        controlObj.text('detail_f_cbbhid_tbl_ld_ickss_detail', khobj.f_cbbhid);//抄本编号id

                                        controlObj.text('detail_f_khytjjzsf_tbl_ld_ickss_detail', khobj.f_tjjzsf);//客户原调价结转水费

                                        controlObj.text('detail_f_khytjjzpwf_tbl_ld_ickss_detail', khobj.f_tjjzpwf);//客户原调价结转排污费

                                        controlObj.text('detail_f_khyye_tbl_ld_ickss_detail', khobj.f_ycje);//绿化表押金
                                        //IC卡新建购水状态
                                        controlObj.text('detail_f_value9_tbl_ld_ickss_detail', khobj.f_value9);

                                        if (aaa.Mediatype == '0')
                                        {
                                            var Mediatype = '任意';
                                        } else
                                        {
                                            var Mediatype = '冷水';
                                        }
                                        controlObj.text('detail_f_Mediatype_tbl_ld_ickss_detail', Mediatype);//介质类型

                                        controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail', Mediatype);//写卡介质类型

                                        if (aaa.mstate == '0')
                                        {
                                            var mstate = '卡内有水，尚未读表';
                                        } else
                                        {
                                            var mstate = '卡已读表';
                                        }
                                        controlObj.text('detail_f_mstate_tbl_ld_ickss_detail', mstate);//刷表状态
                                        var date = new Date();
                                        controlObj.text('detail_f_xkr_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_username);//寻卡人
                                        controlObj.text('detail_f_xkrid_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_userid);//寻卡人id
                                        controlObj.datetime('detail_f_xkrq_tbl_ld_ickss_detail_date', 'detail_f_xkrq_tbl_ld_ickss_detail_time', date.Format('yyyy-MM-dd hh:mm:ss'));//寻卡日期
                                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', '1'); //状态

                                        //if (_isyouchu == "0")
                                        //{
                                        controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_ickss_detail', '05740001');
                                        if (khobj.f_value3 != null && khobj.f_value3 != "")
                                        {
                                            controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_ickss_detail', khobj.f_value3);
                                        }
                                        else
                                        {
                                            controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_ickss_detail', '07980003');
                                        }

                                        //}
                                        if (mstate == '卡内有水，尚未读表' && (khobj.f_value9 == null || khobj.f_value9 == ""))
                                        {
                                            callBackFunction.warning();

                                        }
                                        else if (mstate == '卡内有水，尚未读表' && (khobj.f_value9 != null && khobj.f_value9 != ""))
                                        {
                                            callBackFunction.success('unnormal');

                                        }
                                        else
                                        {
                                            callBackFunction.success('normal');
                                        }



                                    }


                                },
                                fail: function (message)
                                {
                                    callBackFunction.fail();
                                }
                            });
                        }


                    }
                    else
                    {
                        _alertMessage.show("读卡失败,请使用IC工具进行端口设置");
                        callBackFunction.fail();
                    }



                }, fail: function (message)
                {
                    _alertMessage.show("读卡异常" + message);
                    callBackFunction.fail();
                }
            })
        },
        //读卡退购方法
        readCardAndRollBack = function (callBackFunction)
        {

            iccard_part_Obj.command({ "commandName": "read", "port": _port }, {
                success: function (messageJson)
                {

                    if (messageJson.result == 'true')
                    {
                        //{"mcardno":"22222222","mbcgsl":"22","mgscs":"0","mljgl":"333","Mediatype":"0","mstate":"1"}
                        var aaa = (new Function("", "return " + messageJson.message))();

                        var cardno = aaa.mcardno.substring(1, aaa.mcardno.length);
                        if (aaa.Mediatype == '0')
                        {
                            var Mediatype = '任意';
                        } else
                        {
                            var Mediatype = '冷水';
                        }

                        var xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail');//写卡卡号
                        var xkbcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail');//写卡本次购水量
                        var xkgscs = controlObj.text('detail_f_xkgscs_tbl_ld_ickss_detail');//写卡购水次数
                        var xkljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail');//写卡累积购量
                        var xkjzlx = controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail');//写卡介质类型
                        //数据匹配比较
                        //if (cardno == xkkh && aaa.mbcgsl == xkbcgsl && aaa.mgscs == xkgscs && aaa.mljgl == xkljgl && xkjzlx == Mediatype && aaa.mstate == 0)
                        if (cardno == xkkh && aaa.mbcgsl == xkbcgsl && aaa.mgscs == xkgscs && aaa.mljgl == xkljgl && xkjzlx == Mediatype && aaa.mstate == 0)
                        {
                            callBackFunction.success();
                        }
                        else
                        {
                            _alertMessage.show("选择的退购信息与卡内信息不匹配，请重新选择。");
                            callBackFunction.fail();
                        }

                    }
                    else
                    {
                        _alertMessage.show("读卡失败，请到IC卡工具中重新设置端口。" + messageJson.message);
                        callBackFunction.fail();
                    }



                }, fail: function (message)
                {
                    _alertMessage.show("读卡异常" + message);
                    callBackFunction.fail();
                }
            })
        },
        //写卡方法
        writeCardAndSetModel = function (tbl_ld_ickss_detail, callBackFunction)
        {
            var date = new Date();
            tbl_ld_ickss_detail.f_xiekr = basePageObj._userInfoJson.sys_username;
            tbl_ld_ickss_detail.f_xiekrid = basePageObj._userInfoJson.sys_userid;
            tbl_ld_ickss_detail.f_xiekrq = date.Format('yyyy-MM-dd hh:mm:ss');
            tbl_ld_ickss_detail.f_ztid = 2;
            tbl_ld_ickss_detail.f_zt = '写卡';
            controlObj.text('detail_f_xiekr_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_username);
            controlObj.text('detail_f_xiekrid_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_userid);

            controlObj.datetime('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time', date.Format('yyyy-MM-dd hh:mm:ss'));
            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', '2'); //状态
            callBackFunction.success(tbl_ld_ickss_detail);
        },
        autoChinese = function (numberValue)
        {
            debugger
            var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
            var chineseValue = ""; // 转换后的汉字金额
            var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
            var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
            var len = numberValue.length; // numberValue 的字符串长度
            var Ch1; // 数字的汉语读法
            var Ch2; // 数字位的汉字读法
            var nZero = 0; // 用来计算连续的零值的个数
            var String3; // 指定位置的数值
            if (len > 15)
            {
                alert("超出计算范围");
                return "";
            }
            if (numberValue == 0)
            {
                chineseValue = "零元整";
                return chineseValue;
            }
            String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
            for (var i = 0; i < len; i++)
            {
                String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
                if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15))
                {
                    if (String3 == 0)
                    {
                        Ch1 = "";
                        Ch2 = "";
                        nZero = nZero + 1;
                    }
                    else if (String3 != 0 && nZero != 0)
                    {
                        Ch1 = "零" + String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else
                    {
                        Ch1 = String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                }
                else
                { // 该位是万亿，亿，万，元位等关键位
                    if (String3 != 0 && nZero != 0)
                    {
                        Ch1 = "零" + String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else if (String3 != 0 && nZero == 0)
                    {
                        Ch1 = String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else if (String3 == 0 && nZero >= 3)
                    {
                        Ch1 = "";
                        Ch2 = "";
                        nZero = nZero + 1;
                    }
                    else
                    {
                        Ch1 = "";
                        Ch2 = String2.substr(i, 1);
                        nZero = nZero + 1;
                    }
                    if (i == (len - 11) || i == (len - 3))
                    { // 如果该位是亿位或元位，则必须写上
                        Ch2 = String2.substr(i, 1);
                    }
                }
                chineseValue = chineseValue + Ch1 + Ch2;
            }
            if (String3 == 0)
            { // 最后一位（分）为0时，加上“整”
                chineseValue = chineseValue + "整";
            }
            return chineseValue;
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
                                                        _validate_read2 = new validateMessage('btn_command2_read_tbl_ld_ickss_detail');
                                                        _validate_read3 = new validateMessage('btn_command3_read_tbl_ld_ickss_detail');

                                                        _validate_write2 = new validateMessage('btn_command2_write_tbl_ld_ickss_detail');

                                                        _validate_print3 = new validateMessage('btn_command3_print_tbl_ld_ickss_detail');

                                                        _validate_reload3 = new validateMessage('btn_command3_reload_tbl_ld_ickss_detail');

                                                        _validate_write4 = new validateMessage('btn_command4_write_tbl_ld_ickss_detail');

                                                        _ladda_btn_command3_print = Ladda.create('btn_command3_print_tbl_ld_ickss_detail');

                                                        _ladda_btn_command2_read = Ladda.create('btn_command2_read_tbl_ld_ickss_detail');
                                                        _ladda_btn_command2_reload = Ladda.create('btn_command2_reload_tbl_ld_ickss_detail');

                                                        _ladda_btn_command2_write = Ladda.create('btn_command2_write_tbl_ld_ickss_detail');
                                                        _ladda_btn_command3_read = Ladda.create('btn_command3_read_tbl_ld_ickss_detail');
                                                        _ladda_btn_command3_reload = Ladda.create('btn_command3_reload_tbl_ld_ickss_detail');

                                                        _ladda_btn_command4_write = Ladda.create('btn_command4_write_tbl_ld_ickss_detail');

                                                        _ladda_btn_command1_rollback = Ladda.create('btn_command1_rollback_tbl_ld_ickss_detail');
                                                        _ladda_btn_command4_rollback = Ladda.create('btn_command4_rollback_tbl_ld_ickss_detail');
                                                        _ladda_btn_command5_rollback = Ladda.create('btn_command5_rollback_tbl_ld_ickss_detail');

                                                        setDisable();

                                                        /* 增加回车计算功能 */
                                                        $('#detail_f_sl_tbl_ld_ickss_detail').bind('keyup', function (event)
                                                        {
                                                            if (event.keyCode == '13')
                                                            {
                                                                that.btn_command_getsf_onclick();
                                                            }

                                                        });

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

            if (that._pr_pagetype == '0')
            {
                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', '0');
                controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail', '3');

                var data = {
                    typeid: 'IC',
                    nodeid: ''
                }
                doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                    success: function (message)
                    {
                        controlObj.text('detail_f_yyt_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_toporganname);
                        controlObj.text('detail_f_yytid_tbl_ld_ickss_detail', basePageObj._userInfoJson.sys_toporgan);
                        controlObj.text('detail_f_ssbh_tbl_ld_ickss_detail', message);
                        if (_isyouchu == '0')
                        {
                            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_ickss_detail', '05930001');
                        } else
                        {
                            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_ickss_detail', '05930002');
                        }
                    }
                });
                callBackFunction.success();
            }
            else
            {
                try
                {
                    getData({
                        success: function (tbl_ld_ickss_detail)
                        {
                            setModel(tbl_ld_ickss_detail, {
                                success: function ()
                                {
                                    var khbhid = controlObj.text("detail_f_khbhid_tbl_ld_ickss_detail");
                                    if (khbhid != null && khbhid != "")
                                    {
                                        tbl_ld_ickss_list_part4ickss_Obj._pr_khbhid = khbhid;
                                        tbl_ld_ickss_list_part4ickss_Obj.bindGrid({
                                            success: function ()
                                            {
                                            }, fail: function () { }
                                        });
                                    }
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
            }

        },

        //---------------------------------------------------------------------------------
        // ---------------------------------按钮事件---------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_command_cancle_onclick
        *  参数:
        *  返回按钮--通用方法
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

        //水量转水费
        btn_command_getsf_onclick: function ()
        {

            var sl = controlObj.text('detail_f_sl_tbl_ld_ickss_detail');
            var ljgl = controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail');
            var khid = controlObj.text('detail_f_khbhid_tbl_ld_ickss_detail');
            if (sl.length < 1)
            {
                _alertMessage.show('运算错误，请填写水量', 'fail');
            }
            else if (khid.length < 1)
            {
                _alertMessage.show('运算错误，客户信息未加载', 'fail');
            }
            else
            {
                var sqlJson = {
                    "sf": "select f_waterrent('" + khid + "'," + sl + ",'2') as sf from dual",
                }
                commonObj.querySqls(sqlJson, {
                    success: function (messageJson)
                    {
                        var aa = messageJson.sf[0].sf.indexOf("|") + 1;
                        controlObj.text('detail_f_sfjl_tbl_ld_ickss_detail ', messageJson.sf[0].sf.substring(aa));
                        var sfquery = messageJson.sf[0].sf.split('|')[0];
                        var sf = sfquery.split("^")[0];//水费
                        var pwf = sfquery.split("^")[1];//排污费
                        var ysje = (parseFloat(sf) + parseFloat(pwf)).toFixed(2);//应收金额
                        var dj = (parseFloat(ysje) / parseFloat(sl)).toFixed(2);//单价
                        controlObj.text('detail_f_sf_tbl_ld_ickss_detail', parseFloat(sf).toFixed(2));  //水费
                        controlObj.text('detail_f_pwf_tbl_ld_ickss_detail', parseFloat(pwf).toFixed(2));  //排污费
                        controlObj.text('detail_f_ysje_tbl_ld_ickss_detail', ysje);  //应收金额
                        controlObj.text('detail_f_dj_tbl_ld_ickss_detail', dj);  //单价
                        controlObj.text('detail_f_shys_tbl_ld_ickss_detail', ysje);  //算后应收
                        controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail', parseInt(sl));//本次购水量
                        controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail', parseInt(sl) + parseInt(ljgl));//写卡累积购水量

                        //1.判断是否可以调价
                        var tjsf = controlObj.text('detail_f_khytjjzsf_tbl_ld_ickss_detail'); //客户原调价水费
                        var tjpwf = controlObj.text('detail_f_khytjjzpwf_tbl_ld_ickss_detail'); //客户原调价排污费
                        var jmjelj = controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail'); //减免金额累计
                        var sytjsf = 0;//使用调价水费
                        var sytjpwf = 0; //使用调价排污费
                        if (tjsf != null && tjsf !== "" && parseFloat(tjsf) > 0 && (jmjelj == null || jmjelj == "" || parseFloat(jmjelj) == 0))
                        {
                            //1.1存在调价水费
                            controlObj.toggle('detail_f_sfsytjjz_tbl_ld_ickss_detail', 'true');
                            if (parseFloat(tjsf) > parseFloat(sf))
                            {
                                //1.1.1调价水费比水费多使用水费
                                sytjsf = parseFloat(sf).toFixed(2);
                                controlObj.text('detail_f_sytjjzsf_tbl_ld_ickss_detail', sytjsf);//使用调价水费
                                controlObj.text('detail_f_syhtjjzsf_tbl_ld_ickss_detail', (parseFloat(tjsf) - parseFloat(sytjsf)).toFixed(2));//使用后调价结转水费
                                var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                                controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjsf)).toFixed(2)); //算后应收更新
                                controlObj.text('detail_f_shss_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjsf)).toFixed(2)); //算后实收更新

                            }
                            else
                            {
                                //1.1.2调价水费比水费少使用调价水费
                                sytjsf = parseFloat(tjsf).toFixed(2);
                                controlObj.text('detail_f_sytjjzsf_tbl_ld_ickss_detail', sytjsf);//使用调价水费
                                controlObj.text('detail_f_syhtjjzsf_tbl_ld_ickss_detail', '0');//使用后调价结转水费
                                var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                                controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjsf)).toFixed(2)); //算后应收更新
                                controlObj.text('detail_f_shss_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjsf)).toFixed(2)); //算后实收更新
                            }

                        }
                        if (tjpwf != null && tjpwf !== "" && parseFloat(tjpwf) > 0 && (jmjelj == null || jmjelj == "" || parseFloat(jmjelj) == 0))
                        {
                            //1.2存在调价排污费
                            controlObj.toggle('detail_f_sfsytjjz_tbl_ld_ickss_detail', 'true');
                            if (parseFloat(tjpwf) > parseFloat(pwf))
                            {
                                //1.2.1调价排污费比排污费费多使用排污费费
                                sytjpwf = parseFloat(pwf).toFixed(2);
                                controlObj.text('detail_f_sytjjzpwf_tbl_ld_ickss_detail', sytjpwf);//使用调价排污费
                                controlObj.text('detail_f_syhtjjzpwf_tbl_ld_ickss_detail', (parseFloat(tjpwf) - parseFloat(sytjpwf)).toFixed(2));//使用后调价结转排污费
                                var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                                controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjpwf)).toFixed(2)); //算后应收更新
                                controlObj.text('detail_f_shss_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjpwf)).toFixed(2)); //算后实收更新

                            }
                            else
                            {
                                //1.2.2调价水费比水费少使用调价水费
                                sytjpwf = parseFloat(tjpwf).toFixed(2);
                                controlObj.text('detail_f_sytjjzpwf_tbl_ld_ickss_detail', sytjpwf);//使用调价水费
                                controlObj.text('detail_f_syhtjjzpwf_tbl_ld_ickss_detail', '0');//使用后调价结转水费
                                var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                                controlObj.text('detail_f_shys_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjpwf)).toFixed(2)); //算后应收更新
                                controlObj.text('detail_f_shss_tbl_ld_ickss_detail', (parseFloat(shys) - parseFloat(sytjpwf)).toFixed(2)); //算后实收更新
                            }
                        }

                        //绿化表押金部分，默认使用绿化表押金
                        //2.判断是否存在绿化表押金
                        var ycje = controlObj.text('detail_f_khyye_tbl_ld_ickss_detail'); //绿化表押金
                        if (ycje != null && ycje !== "" && parseFloat(ycje) > 0)
                        {
                            //2.1存在绿化表押金情况
                            //打开绿化表押金开关
                            controlObj.toggle('detail_f_sfsyye_tbl_ld_ickss_detail', 'true');
                            //自动触发toggle的事件，所以以下计算不需要了
                        }

                        //算后应收大写转中文
                        var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
                        controlObj.text('detail_f_shss_tbl_ld_ickss_detail', shys); //算后实收
                        controlObj.text('detail_f_shzl_tbl_ld_ickss_detail', '0'); //算后找零
                        controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail', autoChinese(shys));

                        //水量可否修改 
                        controlObj.textdisable('detail_f_sl_tbl_ld_ickss_detail', true);

                        if (dj != '4.90')
                        {
                            _alertMessage.show('请注意，此用户为大用户', 'warning', 8000);
                        }
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('获取阶梯水价失败<br/>' + message, 'fail');
                    }
                });
            }

        },

        /* 
        *  
        *  方法:btn_command_zl_onclick
        *  参数:
        *  计算找零的方法
        */
        btn_command_zl_onclick: function ()
        {
            var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail'); //算后应收
            var shss = controlObj.text('detail_f_shss_tbl_ld_ickss_detail'); //算后实收
            if (shss == "" || !/^[0-9]+\.?[0-9]*$/.test(shss))
            {
                _alertMessage.show('算后实收必须是数字且不能为空可以为0', 'fail');
            }
            else if (parseFloat(shss) < parseFloat(shys))
            {
                _alertMessage.show('算后实收必须大于算后应收', 'fail');
            }
            else
            {
                var num = new Number((parseFloat(shss) - parseFloat(shys)).toFixed(2));
                var res = num.toLocaleString();
                res = res.replaceAll(",", "");
                controlObj.text("detail_f_shzl_tbl_ld_ickss_detail", res);
            }
        },



        //===================通用读卡方法、==================
        //2:营业厅
        //3:邮储
        btn_command_read_onclick: function (readstr)
        {
            var validate = null;
            var ladda = null;
            switch (readstr)
            {

                case "2":
                    validate = _validate_read2;
                    ladda = _ladda_btn_command2_read;
                    break;
                case "3":
                    validate = _validate_read3;
                    ladda = _ladda_btn_command3_read;
                    break;

            }

            try
            {
                ladda.start();
                //读卡
                readCardAndGetData({
                    success: function (type)
                    {

                        getModel({
                            success: function (tbl_ld_ickss_detail)
                            {
                                checkModel(tbl_ld_ickss_detail, validate, {
                                    success: function (tbl_ld_ickss_detail)
                                    {

                                        if (_local_sys_id == '')
                                        {
                                            addDetailData(tbl_ld_ickss_detail, 'pt', {
                                                success: function (message)
                                                {
                                                    ladda.stop();
                                                    _local_sys_id = message;

                                                    if (type == "unnormal")
                                                    {
                                                        _alertMessage.show('此卡刚刚进行过IC卡退购、换表补卡、补卡、新建卡等操作', 'success', 8000);

                                                    }
                                                    else
                                                    {
                                                        _alertMessage.show('新建读卡成功', 'success', 8000);

                                                    }
                                                    setDisable();
                                                    var khbhid = controlObj.text("detail_f_khbhid_tbl_ld_ickss_detail");
                                                    if (khbhid != null && khbhid != "")
                                                    {
                                                        tbl_ld_ickss_list_part4ickss_Obj._pr_khbhid = khbhid;
                                                        tbl_ld_ickss_list_part4ickss_Obj.bindGrid({
                                                            success: function ()
                                                            {


                                                            }, fail: function () { }
                                                        });
                                                    }



                                                },
                                                fail: function (message)
                                                {
                                                    ladda.stop();
                                                    _alertMessage.show('新建读卡失败', 'fail');
                                                    _resultMessage.show(message);
                                                }
                                            });
                                        } else
                                        {
                                            updateData(tbl_ld_ickss_detail, 'pt', {
                                                success: function ()
                                                {
                                                    ladda.stop();
                                                    _alertMessage.show('保存读卡成功', 'success', 2000);
                                                    setDisable();
                                                },
                                                fail: function (message)
                                                {
                                                    ladda.stop();
                                                    _alertMessage.show('保存读卡失败', 'fail');
                                                    _resultMessage.show(message);
                                                }
                                            });
                                        }

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
                    },
                    fail: function ()
                    {
                        ladda.stop();
                        _alertMessage.show('读卡失败。', 'fail');
                    },
                    warning: function ()
                    {
                        ladda.stop();
                        _alertMessage.show("卡内有水，不能购水", 'warning');
                        var khbhid = controlObj.text("detail_f_khbhid_tbl_ld_ickss_detail");
                        if (khbhid != null && khbhid != "")
                        {
                            tbl_ld_ickss_list_part4ickss_Obj._pr_khbhid = khbhid;
                            tbl_ld_ickss_list_part4ickss_Obj.bindGrid({
                                success: function ()
                                {


                                }, fail: function () { }
                            });
                        }
                    }
                });


            }
            catch (ex)
            {
                ladda.stop();
                _alertMessage.show('保存程序异常。', 'fail');
                _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
            }


        },


        //===================通用写卡方法、==================
        //2:营业厅
        //4：邮储
        btn_command_write_onclick: function (writestr)
        {
            var validate = null;
            var ladda = null;
            switch (writestr)
            {

                case "2":
                    validate = _validate_write2;
                    ladda = _ladda_btn_command2_write;
                    break;
                case "4":
                    validate = _validate_write4;
                    ladda = _ladda_btn_command4_write;
                    break;

            }
            var sbzt = controlObj.text("detail_f_mstate_tbl_ld_ickss_detail");
            var xjzt = controlObj.text("detail_f_value9_tbl_ld_ickss_detail");
            if (sbzt != "卡内有水，尚未读表" || (xjzt != null && xjzt != ""))
            {
                try
                {
                    ladda.start();
                    getModel({
                        success: function (tbl_ld_ickss_detail)
                        {
                            checkModel(tbl_ld_ickss_detail, validate, {
                                success: function (tbl_ld_ickss_detail)
                                {
                                    writeCheckModel(tbl_ld_ickss_detail, validate, {
                                        success: function (tbl_ld_ickss_detail)
                                        {
                                            writeCardAndSetModel(tbl_ld_ickss_detail, {
                                                success: function (tbl_ld_ickss_detail)
                                                {
                                                    updateData(tbl_ld_ickss_detail, 'xk', {
                                                        success: function ()
                                                        {

                                                            var xklx = controlObj.text('detail_f_xklx_tbl_ld_ickss_detail');
                                                            var xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail');
                                                            var gscs = controlObj.text('detail_f_xkgscs_tbl_ld_ickss_detail');

                                                            var scgsl = controlObj.text('detail_f_mbcgsl_tbl_ld_ickss_detail');
                                                            var bcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail');
                                                            var xjzt = controlObj.text("detail_f_value9_tbl_ld_ickss_detail");
                                                            if (xjzt != null && xjzt != "" && (xjzt == "1" || xjzt == "3"))
                                                            {
                                                                var xkms = '2';
                                                                if (xjzt == '3')
                                                                {
                                                                    bcgsl = parseInt(bcgsl) + parseInt(scgsl);
                                                                }
                                                            }
                                                            else
                                                            {
                                                                var xkms = controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail');
                                                            }
                                                            var ljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail');
                                                            var jzlx = controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail');
                                                            if (jzlx == "任意")
                                                            {
                                                                jzlx = '0';
                                                            }
                                                            else if (jzlx == "冷水")
                                                            {
                                                                jzlx = '1';
                                                            }
                                                            iccard_part_Obj.command({ "commandName": "write", "port": _port, "xklx": xklx, "mcardno": xkkh, "mgscs": gscs, "mbcgsl": bcgsl, "mCzmode": xkms, "mljgl": ljgl, "Mediatype": jzlx }, {
                                                                success: function (messageJson)
                                                                {

                                                                    if (messageJson.result == 'true')
                                                                    {

                                                                        //调用补打印方法，代码相同
                                                                        tbl_ld_ickss_detail_Obj.btn_command_bprint_onclick('0');

                                                                        ladda.stop();
                                                                        _alertMessage.show('写卡成功', 'success', 2000);

                                                                        switch (writestr)
                                                                        {

                                                                            case "2":
                                                                                //清空
                                                                                clearModel();
                                                                                _local_sys_id = '';
                                                                                break;
                                                                            case "4":
                                                                                //等待返回不需要重载
                                                                                break;

                                                                        }

                                                                        setDisable();

                                                                    } else
                                                                    {
                                                                        ladda.stop();
                                                                        _alertMessage.show('写卡失败,请使用IC卡工具进行端口设置', 'fail');
                                                                    }

                                                                }, fail: function (message)
                                                                {
                                                                    ladda.stop();
                                                                    _alertMessage.show('写卡异常' + message, 'fail');
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
            }
            else
            {
                _alertMessage.show('卡内有水状态不能进行写卡操作。', 'fail');
            }




        },


        //补打印
        //0:打印
        //1：打印
        btn_command_bprint_onclick: function (printstr)
        {

            var mydate = new Date(); //获取当前时间
            var str = "" + mydate.getFullYear() + "/";
            str += (mydate.getMonth() + 1) + "/";
            str += mydate.getDate();
            str += "&nbsp;&nbsp;&nbsp;"
            str += mydate.getHours() + ":";
            str += mydate.getMinutes() + ":";
            str += mydate.getSeconds();
            var sjbh = controlObj.text('detail_f_sjbh_tbl_ld_ickss_detail');//收据编号
            var khbh = controlObj.text('detail_f_khbh_tbl_ld_ickss_detail');//客户编号
            var mc = controlObj.text('detail_f_yhm_tbl_ld_ickss_detail');//用户名
            var dz = controlObj.text('detail_f_dz_tbl_ld_ickss_detail');//用户地址
            var kprq = controlObj.datetime('detail_f_xiekrq_tbl_ld_ickss_detail_date', 'detail_f_xiekrq_tbl_ld_ickss_detail_time');//本次购水日期
            var bclj = controlObj.text('detail_f_xkljgl_tbl_ld_ickss_detail');//本次累计
            var bcgsds = controlObj.text('detail_f_xkbcgsl_tbl_ld_ickss_detail');//本次购水吨数
            var sclj = bclj - bcgsds;//上次累计                                                                   
            var yhlb = controlObj.text('detail_f_yslx_tbl_ld_ickss_detail');//用户类别
            var sf = controlObj.text('detail_f_sf_tbl_ld_ickss_detail');//水费/吨
            var lsh = controlObj.text('detail_f_jfdh_tbl_ld_ickss_detail');//流水号
            var pwf = controlObj.text('detail_f_pwf_tbl_ld_ickss_detail');//排污费/吨
            var sfdj = (parseFloat(sf) / parseFloat(bcgsds)).toFixed(2);
            var pwfdj = (parseFloat(pwf) / parseFloat(bcgsds)).toFixed(2);
            var dx = controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail');//大写
            var xx = controlObj.text('detail_f_shys_tbl_ld_ickss_detail');//小写
            var kpr = controlObj.text('detail_f_xiekr_tbl_ld_ickss_detail');//收费员
            var jffs = controlObj.singledropdownlist('detail_f_jffs_tbl_ld_ickss_detail');//缴费方式
            var yyt = controlObj.text('detail_f_yyt_tbl_ld_ickss_detail');//营业厅
            var kplb = controlObj.singledropdownlist('detail_f_kplb_tbl_ld_ickss_detail');//开票类型

            switch (yhlb)
            {
                case "居民生活用水":
                    yhlb = '居民';
                    break;
                case "学校、福利、居委会":
                    yhlb = '学校及福利机构';
                    break;
                case "旅游区趸售水":
                    yhlb = '旅游区水务';
                    break;
                case "生态城趸售水":
                    yhlb = '生态城趸售水';
                    break;
                case "经营服务用水":
                    yhlb = '经营服务用水';
                    break;
                case "航母游乐港":
                    yhlb = '航母用水';
                    break;
                case "玖龙粗制水":
                    yhlb = '玖龙粗制水';
                    break;
                case "玖龙淡化水":
                    yhlb = '玖龙淡化水';
                    break;
                case "特种行业用水":
                    yhlb = '特种行业用水';
                    break;
            }
            //2、识别浏览器
            //3、如果是IE浏览器则打开弹出层
            //4、否则，直接调用打印方法
            var html = "";//, str = "";
            var currentVersion = getBrowerVersion();
            var currentVersionStr = currentVersion.browser + '_' + currentVersion.version;

            //str = "" + mydate.getFullYear() + "年";
            //str += (mydate.getMonth() + 1) + "月";
            //str += mydate.getDate() + "日";

            html += '<table align="center" style="width:720px;padding-bottom:0px;border:{borderpx}px #000000 solid;" cellpadding="0" cellspacing="0" >';
            html += '<tr>';
            //if (printstr != '0')
            //{
            //    html += '<td colspan="3" style="padding-left:10px;font-size:16px;width:720px;height:20px;">收据编号：' + sjbh + '</td>';
            //}
            //else
            //{
            html += '<td colspan="3" style="padding-left:10px;font-size:16px;font-weight:bold;width:720px;height:20px;"></td>';
            //}
            //html += '<td  colspan="2"  style="text-align:right;padding-right:70px;font-size:16px;font-weight:bold;width:390px;height:20px;">单位：吨/元</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td   style="padding-left:10px;font-size:16px;font-weight:bold;height:20px;width:170px;">支付方式：' + jffs + '</td>';
            html += '<td   style="padding-left:0px;font-size:16px;font-weight:bold;height:20px;width:170px;">开票类型：' + kplb + '</td>';
            html += '<td   style="padding-left:0px;font-size:16px;font-weight:bold;height:20px;width:380px;">用户类别：' + yhlb + '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td   style="padding-left:10px;font-size:16px;font-weight:bold;height:25px;width:170px;">客户编号：' + khbh + '</td>';
            html += '<td   style="padding-left:0px;font-size:16px;font-weight:bold;height:25px;width:170px;">付款方名称：' + mc + '</td>';
            html += '<td   style="padding-left:0px;font-size:16px;font-weight:bold;height:25px;width:380px">';
            html += '地址：' + dz + '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td colspan="3"  style="text-align:left;padding-left:10px;width:720px;height:70px; " >';
            html += '<table  style="width:520px;height:70px;border:0px #000000 solid;margin-right:200px" cellpadding="0" cellspacing="0" >';
            html += '<tr>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:130px;height:40px;">水费/排污费单价<br/>（元/吨）</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:40px;">本次购水量<br/>（吨）</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:40px;">水费合计<br/>（元）</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:40px;">排污费合计<br/>（元）</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:90px;height:40px;">金额<br/>（元）</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:130px;height:30px;">' + sfdj + '/' + pwfdj + '</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:30px;">' + bcgsds + '</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:30px;">' + sf + '</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:30px;">' + pwf + '</td>';
            html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:90px;height:30px;">' + xx + '</td>';
            html += '</tr>';
            //html += '<tr>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:160px;height:32px;">本次累积购水量：</td>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:100px;height:32px;">' + bclj + '</td>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:160px;height:32px;">水费合计（元）：</td>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:100px;height:32px;">'+sf+'</td>';
            //html += '</tr>';
            //html += '<tr>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:160px;height:32px;">本次购水吨数：</td>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:100px;height:32px;">' + bcgsds + '</td>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:160px;height:32px;">排污费合计（元）：</td>';
            //html += '<td style="text-align:left;font-size:16px;font-weight:bold;width:100px;height:32px;">'+pwf+'</td>';
            //html += '</tr>';

            html += '</table>';
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td style="font-size:16px;font-weight:bold;text-align:left;width:240px;padding-left:10px;height:15px;">上次累积购水量（吨）：' + sclj + '</td>';
            html += '<td colspan="2" style="font-size:16px;font-weight:bold;text-align:left;width:480px;padding-left:0px;height:15px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '</tr>';
            html += '<tr>';


            html += '<td style="font-size:16px;font-weight:bold;text-align:left;width:240px;padding-left:10px;height:15px;">本次累积购水量（吨）：' + bclj + '</td>';



            html += '<td style="font-size:16px;font-weight:bold;text-align:left;width:200px;left;padding-left:0px;height:15px;"></td>';



            html += '<td style="font-size:16px;font-weight:bold;text-align:left;width:280px;padding-left:0px;height:35px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>';




            html += '</tr>';

            html += '<tr>';
            html += '<td  style="font-size:16px;font-weight:bold;text-align:left;padding-left:130px;height:35px;"  colspan="4">';
            html += xx;
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td style="font-size:16px;font-weight:bold;text-align:left;padding-left:130px;height:35px;" colspan="4">';
            html += dx;
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td  colspan="3" style="font-size:16px;font-weight:bold;text-align:left;padding-left:10px;height:20px;">备注：如有开票意向用户请在3个月内到大厅办理换票业务。</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td  style="font-size:16px;font-weight:bold;text-align:left;padding-left:10px;height:20px;">营业厅：' + yyt + '</td>';
            html += '<td  style="font-size:16px;font-weight:bold;text-align:left;padding-left:0px;height:20px;">开票人:' + kpr + '</td>';
            html += '<td  style="font-size:16px;font-weight:bold;text-align:left;padding-left:0px;height:20px;">开票日期：' + kprq.split(' ')[0] + '</td>';

            html += '</tr>';

            html += '</table>';


            $("#div_print").html(html.replaceAll('{borderpx}', '0').replaceAll('{fontsize}', '16'));//打印
            $("#div_print_xs").html(html.replaceAll('{borderpx}', '1').replaceAll('{fontsize}', '16'));
            $('#div_print_modal_tbl_ld_ickss_detail').modal('show');
            //取消预览
            //$("#div_print").print({
            //    //Use Global styles
            //    globalStyles: false,
            //    //Add link with attrbute media=print
            //    mediaPrint: false,
            //    //Print in a hidden iframe
            //    iframe: true,
            //    //Don't print this
            //    noPrintSelector: ".avoid-this",
            //    //Add this at top
            //    prepend: "",
            //    //Add this on bottom
            //    append: ""
            //});


        },

        //邮储第一阶段打印
        //3：邮储
        btn_command_print_yc_onclick: function (printstr)
        {
            var validate = null;
            var ladda = null;
            switch (printstr)
            {
                case "1":
                    validate = _validate_print1;
                    ladda = _ladda_btn_command1_print;
                    break;
                case "2":
                    validate = _validate_print2;
                    ladda = _ladda_btn_command2_print;
                    break;
                case "3":
                    validate = _validate_print3;
                    ladda = _ladda_btn_command3_print;
                    break;
                case "4":
                    validate = _validate_print4;
                    ladda = _ladda_btn_command4_print;
                    break;
            }

            ladda.start();
            getModel({
                success: function (tbl_ld_ickss_detail)
                {
                    checkModel(tbl_ld_ickss_detail, validate, {
                        success: function (tbl_ld_ickss_detail)
                        {
                            commitCheckModel(tbl_ld_ickss_detail, validate, {
                                success: function (tbl_ld_ickss_detail)
                                {
                                    updateData(tbl_ld_ickss_detail, 'pt', {
                                        success: function ()
                                        {
                                            tbl_ld_ickss_detail_Obj.btn_command_bprint_yc_onclick();

                                            ladda.stop();
                                            _alertMessage.show('打印并保存成功', 'success', 2000);

                                            clearModel();
                                            setDisable();
                                            _local_sys_id = '';


                                        },
                                        fail: function (message)
                                        {
                                            ladda.stop();
                                            _alertMessage.show('打印失败', 'fail');
                                            _resultMessage.show(message);
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

        },


        btn_command_bprint_yc_onclick: function ()
        {
            var mydate = new Date(); //获取当前时间
            var year = "" + mydate.getFullYear();
            var month = (mydate.getMonth() + 1);
            var date = mydate.getDate();
            var khbh = controlObj.text('detail_f_khbh_tbl_ld_ickss_detail');//客户编号
            var xm = controlObj.text('detail_f_yhm_tbl_ld_ickss_detail');//姓名
            var dz = controlObj.text('detail_f_dz_tbl_ld_ickss_detail');//地址
            var sfdj = controlObj.text('detail_f_dj_tbl_ld_ickss_detail');//水费单价
            var rmbdx = controlObj.text('detail_f_shssdx_tbl_ld_ickss_detail');//人名币大写
            var hs = controlObj.text('detail_f_rs_tbl_ld_ickss_detail');//户数
            var sf = controlObj.text('detail_f_sf_tbl_ld_ickss_detail');//水费
            var sl = controlObj.text('detail_f_sl_tbl_ld_ickss_detail');//水量
            var pw = controlObj.text('detail_f_pwf_tbl_ld_ickss_detail');//排污
            var xkr = controlObj.text('detail_f_xkr_tbl_ld_ickss_detail');//寻卡人
            var jkr = controlObj.text('detail_f_jfm_tbl_ld_ickss_detail');//交款人
            var je = controlObj.text('detail_f_shys_tbl_ld_ickss_detail');//金额

            var html = "";
            html += '<div style="margin-top:6px;">';
            html += '<h3 style="text-align:center;">天津龙达水务有限公司水费交款单</h3>';
            html += '<div style="width: 250px;float:left;margin-left: 80px;">客户编号：' + khbh + '</div>';
            html += '<div style="width: 140px;float:left;margin-left: 20px;">' + year + '年' + month + '月' + date + '日</div>';
            html += '<div style="width: 190px;float:right; margin-right:20px">水费单价：' + sfdj + '</div>';
            html += '</div>';
            html += '<div style="text-align:center">';
            html += '<table align="center" cellpadding="0" cellspacing="0" style="border:2px #000000 solid;width:700px;height:200px;">';
            html += '    <tr>';
            html += '<td width="100px" rowspan="2" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;">人民币大写</td>';
            html += '<td rowspan="2" width="300px" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;text-align:left;padding-left:10px;">' + rmbdx + '</td>';
            html += '<td height="20px" width="80px" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;text-align:center;">户数</td>';
            html += '<td width="150px" rowspan="2" colspan="9" style="border-bottom:1px #000000 solid ;text-align:center;">金&nbsp;&nbsp;&nbsp;&nbsp;额</td>';
            html += '    </tr>';
            html += '<tr>';
            html += '<td height="20px" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;text-align:center;">' + hs + '</td>';
            html += '    </tr>';
            html += '<tr>';
            html += '<td height="180px" rowspan="4" colspan="3" align="left" style="border-right:1px #000000 solid ;">';
            html += '<table>';
            html += '<tr style="line-height:80px;">';
            html += '<td style="width:50px;text-align:left;padding-left:5px;" valign="top">姓名：</td>';
            html += '<td style="width:100px;text-align:left;" valign="top">' + xm + '</td>';
            html += '<td style="width:50px;text-align:left;margin-left:90px;" valign="top">地址：</td>';
            html += '<td style="width:200px;text-align:left;" valign="top">' + dz + '</td>';
            html += '    </tr>';
            html += '<tr>';
            html += '<td style="width:50px;text-align:left;padding-left:5px;" valign="top">居民：</td>';
            html += '<td style="width:100px;text-align:left;" valign="top">' + sf + '</td>';
            html += '<td style="width:50px;text-align:left;margin-left:90px;" valign="top">水量：</td>';
            html += '<td style="width:100px;text-align:left;" valign="top">' + sl + '</td>';
            html += '    </tr>';
            html += '<tr>';
            html += '<td style="line-height:80px;padding-left:5px;">排污：</td>';
            html += '<td>' + pw + '</td>';
            html += '    </tr>';
            html += '</div>';
            html += '</table>';
            html += '</td>';
            html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ; " valign="middle">百</td>';
            html += '<td style="border-left:1px #000000 solid ;border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">十</td>';
            html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">万</td>';
            html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">千</td>';
            html += '<td style="border-left:1px #000000 solid ;border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">百</td>';
            html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">十</td>';
            html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">元</td>';
            html += '<td style="border-left:1px #000000 solid ;border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">角</td>';
            html += '<td style="border-bottom:1px #000000 solid ;" valign="middle">分</td>';
            html += '</tr>';
            html += '<tr>';
            var num = '';
            function PrefixInteger(num, length)
            {
                return (Array(length).join('0') + num).slice(-length);
            }
            num = PrefixInteger(je, 10);
            var je_n = num.split(".");
            var str = je_n[0], result = "";
            for (var i = 0, len = str.length; i < len; i++)
            {
                result += str[i];
                if (i % 2 == 1) result += ',';
            }
            result = result.split(",");
            html += '<td height="90%;" style="border-right:1px #000000 solid ;text-align:center; ">' + result[0][0] + '</td>';
            html += '<td  style="text-align:center; border-left:1px #000000 solid ;border-right:1px #000000 solid ;">' + result[0][1] + '</td>';
            html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[1][0] + '</td>';
            html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[1][1] + '</td>';
            html += '<td  style="text-align:center; border-left:1px #000000 solid ;border-right:1px #000000 solid ;">' + result[2][0] + '</td>';
            html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[2][1] + '</td>';
            html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[3][0] + '</td>';
            html += '<td  style="text-align:center; border-left:1px #000000 solid ;border-right:1px #000000 solid ;">' + je_n[1][0] + '</td>';
            html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + je_n[1][1] + '</td>';
            html += '    </tr>';
            html += '</table>';
            html += '<div style="width: 700px; position:absolute; margin-left:40px;margin-top:10px;">';
            html += '<div style="width: 250px;float:left;">寻卡人：' + xkr + '</div>';
            html += '<div style="width: 190px;float:left;">交款人：' + jkr + '</div>';
            html += '</div>';
            html += '</div>';
            $("#div_print").html(html);
            var _html = "";
            _html += '<h3 style="text-align:center;">天津龙达水务有限公司水费交款单</h3>';
            _html += '<div style="width: 140px;float:left;margin-left: 100px;">客户编号：' + khbh + '</div>';
            _html += '<div style="width: 140px;float:left;margin-left: 200px;">' + year + '年' + month + '月' + date + '日</div>';
            _html += '<div style="width: 190px;float:right; margin-right:20px">水费单价：' + sfdj + '</div>';
            _html += '</div>';
            _html += '<div style="text-align:center">';
            _html += '<table align="center" cellpadding="0" cellspacing="0" style="border:2px #000000 solid;width:700px;height:220px;">';
            _html += '    <tr>';
            _html += '<td width="100px" rowspan="2" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;">人民币大写</td>';
            _html += '<td rowspan="2" width="300px" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;text-align:left;padding-left:10px;">' + rmbdx + '</td>';
            _html += '<td height="20px" width="80px" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;text-align:center;">户数</td>';
            _html += '<td width="150px" rowspan="2" colspan="9" style="border-bottom:1px #000000 solid ;text-align:center;">金&nbsp;&nbsp;&nbsp;&nbsp;额</td>';
            _html += '    </tr>';
            _html += '<tr>';
            _html += '<td height="20px" style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;text-align:center;">' + hs + '</td>';
            _html += '    </tr>';
            _html += '<tr>';
            _html += '<td height="180px" rowspan="4" colspan="3" align="left" style="border-right:1px #000000 solid ;">';
            _html += '<table>';
            _html += '<tr style="line-height:80px;">';
            _html += '<td style="width:50px;text-align:left;padding-left:5px;" valign="top">姓名：</td>';
            _html += '<td style="width:100px;text-align:left;" valign="top">' + xm + '</td>';
            _html += '<td style="width:50px;text-align:left;margin-left:90px;" valign="top">地址：</td>';
            _html += '<td style="width:100px;text-align:left;" valign="top">' + dz + '</td>';
            _html += '    </tr>';
            _html += '<tr>';
            _html += '<td style="width:50px;text-align:left;padding-left:5px;" valign="top">居民：</td>';
            _html += '<td style="width:100px;text-align:left;" valign="top">' + sf + '</td>';
            _html += '<td style="width:50px;text-align:left;margin-left:90px;" valign="top">水量：</td>';
            _html += '<td style="width:100px;text-align:left;" valign="top">' + sl + '</td>';
            _html += '    </tr>';
            _html += '<tr>';
            _html += '<td style="line-height:80px;padding-left:5px;">排污：</td>';
            _html += '<td>' + pw + '</td>';
            _html += '    </tr>';
            _html += '</div>';
            _html += '</table>';
            _html += '</td>';
            _html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ; " valign="middle">百</td>';
            _html += '<td style="border-left:1px #000000 solid ;border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">十</td>';
            _html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">万</td>';
            _html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">千</td>';
            _html += '<td style="border-left:1px #000000 solid ;border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">百</td>';
            _html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">十</td>';
            _html += '<td style="border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">元</td>';
            _html += '<td style="border-left:1px #000000 solid ;border-right:1px #000000 solid ;border-bottom:1px #000000 solid ;" valign="middle">角</td>';
            _html += '<td style="border-bottom:1px #000000 solid ;" valign="middle">分</td>';
            _html += '</tr>';
            _html += '<tr>';
            var num = '';
            function PrefixInteger(num, length)
            {
                return (Array(length).join('0') + num).slice(-length);
            }
            num = PrefixInteger(je, 10);
            var je_n = num.split(".");
            var str = je_n[0], result = "";
            for (var i = 0, len = str.length; i < len; i++)
            {
                result += str[i];
                if (i % 2 == 1) result += ',';
            }
            result = result.split(",");
            _html += '<td height="90%;" style="border-right:1px #000000 solid ;text-align:center; ">' + result[0][0] + '</td>';
            _html += '<td  style="text-align:center; border-left:1px #000000 solid ;border-right:1px #000000 solid ;">' + result[0][1] + '</td>';
            _html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[1][0] + '</td>';
            _html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[1][1] + '</td>';
            _html += '<td  style="text-align:center; border-left:1px #000000 solid ;border-right:1px #000000 solid ;">' + result[2][0] + '</td>';
            _html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[2][1] + '</td>';
            _html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + result[3][0] + '</td>';
            _html += '<td  style="text-align:center; border-left:1px #000000 solid ;border-right:1px #000000 solid ;">' + je_n[1][0] + '</td>';
            _html += '<td  style="text-align:center; border-right:1px #000000 solid ;">' + je_n[1][1] + '</td>';
            _html += '    </tr>';
            _html += '</table>';
            _html += '<div style="width: 700px; position:absolute; margin-left:40px;margin-top:10px;">';
            _html += '<div style="width: 250px;float:left;">寻卡人：' + xkr + '</div>';
            _html += '<div style="width: 190px;float:left;">交款人：' + jkr + '</div>';
            _html += '</div>';
            $("#div_print_xs").html(_html);
            $('#div_print_modal_tbl_ld_ickss_detail').modal('show');
        },


        //===================通用重载方法、==================
        //营业厅
        //邮储
        btn_command_reoload_onclick: function ()
        {

            var confirmContent = '<blockquote> ';
            confirmContent += '<h3>将对当前的页面进行<a style="color:red">重载</a>操作</h3>';
            confirmContent += '<br/>';
            confirmContent += '<h5>重载后的页面将丢失当前全部设置</h5>';
            confirmContent += '<h5>请确定执行此操作</h5>';
            confirmContent += '</blockquote> ';

            _confirmMessage.destory();
            _confirmMessage.show('重载确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        try
                        {
                            clearModel();
                            setDisable();
                            _local_sys_id = '';
                        }
                        catch (ex)
                        {
                            _alertMessage.show('重载程序异常。', 'fail');
                            _resultMessage.show('重载程序异常<br/>' + ex.message, 'fail');
                        }
                    },
                    cancle: function ()
                    {

                    }
                });



        },



        //===================通用退购方法、==================
        //1:管理员
        //4:邮储
        //5:营业厅
        btn_command_rollback_onclick: function (rollbackstr)
        {

            var ladda = null;
            switch (rollbackstr)
            {

                case "1":
                    ladda = _ladda_btn_command1_rollback;
                    break;
                case "4":
                    ladda = _ladda_btn_command4_rollback;
                    break;
                case "5":
                    ladda = _ladda_btn_command5_rollback;
                    break;

            }
            //读取卡内信息，核对卡内信息是否一致
            try
            {
                ladda.start();
                //读卡

                readCardAndRollBack({
                    success: function ()
                    {
                        var shys = controlObj.text('detail_f_shys_tbl_ld_ickss_detail');//算后应收
                        var sytjjzsf = controlObj.text('detail_f_sytjjzsf_tbl_ld_ickss_detail');//使用调价结转水费
                        var sytjjzpwf = controlObj.text('detail_f_sytjjzpwf_tbl_ld_ickss_detail');//使用调价结转排污费
                        var syycje = controlObj.text('detail_f_syye_tbl_ld_ickss_detail');//使用绿化表押金
                        //信息匹配，确认退购信息
                        var confirmContent = '<blockquote> ';
                        confirmContent += '<h3>将对当前卡进行<a style="color:red">退购</a>操作</h3>';
                        confirmContent += '<br/>';
                        confirmContent += '<h5>退购后的卡内<a style="color:red">水量将归0</a>，将<a style="color:red">退还客户' + shys + '元</a></h5>';
                        if (sytjjzsf != null && sytjjzsf != "" && parseFloat(sytjjzsf) > 0)
                        {
                            confirmContent += '<h5>退购后的客户的调价结转水费' + sytjjzsf + '元将归还至客户账户</h5>';
                        }
                        if (sytjjzpwf != null && sytjjzpwf != "" && parseFloat(sytjjzpwf) > 0)
                        {
                            confirmContent += '<h5>退购后的客户的调价结转排污费' + sytjjzpwf + '元将归还至客户账户</h5>';
                        }
                        if (syycje != null && syycje != "" && parseFloat(syycje) > 0)
                        {
                            confirmContent += '<h5>退购后的客户的绿化表押金' + syycje + '元将归还至客户账户</h5>';
                        }
                        confirmContent += '<h5><a style="color:red">确认时请不要把卡拿开！</a></h5>';
                        confirmContent += '<h5>请确定执行此操作</h5>';
                        confirmContent += '</blockquote> ';
                        _confirmMessage.destory();
                        _confirmMessage.show('退购确认？', confirmContent,
                            {
                                confirm: function ()
                                {
                                    //确认后进行退购写卡
                                    try
                                    {

                                        var xklx = controlObj.text('detail_f_xklx_tbl_ld_ickss_detail');//写卡类型
                                        var xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ickss_detail');//写卡卡号
                                        var gscs = controlObj.text('detail_f_mgscs_tbl_ld_ickss_detail');//购水次水-1
                                        var bcgsl = '0';//本次购水量
                                        var xkms = controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ickss_detail');//写卡模式
                                        var ljgl = controlObj.text('detail_f_mljgl_tbl_ld_ickss_detail');//累积购量退回
                                        var jzlx = controlObj.text('detail_f_xkjzlx_tbl_ld_ickss_detail');
                                        if (jzlx == "任意")
                                        {
                                            jzlx = '0';
                                        } else if (jzlx == "冷水")
                                        {
                                            jzlx = '1';
                                        }
                                        iccard_part_Obj.command({ "commandName": "write", "port": _port, "xklx": xklx, "mcardno": xkkh, "mgscs": gscs, "mbcgsl": bcgsl, "mCzmode": xkms, "mljgl": ljgl, "Mediatype": jzlx }, {
                                            success: function (messageJson)
                                            {

                                                if (messageJson.result == 'true')
                                                {
                                                    //退购写卡成功，开始保存数据。
                                                    getModel({
                                                        success: function (tbl_ld_ickss_detail)
                                                        {

                                                            updateData(tbl_ld_ickss_detail, 'tg', {
                                                                success: function ()
                                                                {

                                                                    ladda.stop();
                                                                    _alertMessage.show('退购成功', 'success', 2000);
                                                                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ickss_detail', '4');
                                                                    setDisable();

                                                                },
                                                                fail: function (message)
                                                                {
                                                                    ladda.stop();
                                                                    _alertMessage.show('提交失败', 'fail');
                                                                    _resultMessage.show(message);
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

                                                } else
                                                {
                                                    ladda.stop();
                                                    _alertMessage.show('写卡失败,请使用IC卡工具进行端口设置。', 'fail');
                                                }

                                            }, fail: function (message)
                                            {
                                                ladda.stop();
                                                _alertMessage.show('写卡异常' + message, 'fail');
                                            }
                                        });

                                    }
                                    catch (ex)
                                    {
                                        ladda.stop();
                                        _alertMessage.show('退购写卡时程序异常。', 'fail');
                                        _resultMessage.show('退购写卡时程序异常<br/>' + ex.message, 'fail');
                                    }
                                },
                                cancle: function ()
                                {
                                    ladda.stop();
                                }
                            });

                    },
                    fail: function ()
                    {
                        ladda.stop();
                    }
                });


            }
            catch (ex)
            {
                ladda.stop();
                _alertMessage.show('退购程序异常。', 'fail');
                _resultMessage.show('退购程序异常<br/>' + ex.message, 'fail');
            }




        },



        //================打印容器的打印和取消按钮===============
        btn_print_modal_cancle_onclick: function ()
        {
            $('#div_print_modal_tbl_ld_ickss_detail').modal('hide');
        },

        btn_print_modal_onclick: function ()
        {
            $('#div_print_modal_tbl_ld_ickss_detail').modal('hide');
            $("#div_print").print({
                //Use Global styles
                globalStyles: false,
                //Add link with attrbute media=print
                mediaPrint: false,
                //Print in a hidden iframe
                iframe: true,
                //Don't print this
                noPrintSelector: ".avoid-this",
                //Add this at top
                prepend: "",
                //Add this on bottom
                append: ""
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
    tbl_ld_ickss_detail_Obj.init();

});




