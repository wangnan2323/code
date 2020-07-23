

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_jfb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jfb.asmx/',
        _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
        _baseCodeHashMap = null,
        _validateMessage_save = null,
        _validateMessage_printsubmit0 = null,
        _validateMessage_printsubmit1 = null,
        _ladda_btn_command_save = null,
        _ladda_btn_command_printsubmit0 = null,
        _ladda_btn_command_printsubmit1 = null,
        //_ladda_btn_command_rollback = null,

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

                if (that._pr_pagetype == null || that._pr_pagetype == '')
                {
                    _blockMessage.show('_pr_pagetype参数接收失败...', 'fail');
                }
                else
                {

                    if ((that._pr_sys_id == null || that._pr_sys_id == '') && that._pr_pagetype != '0')
                    {
                        _blockMessage.show('_pr_sys_id参数接收失败', 'fail');
                    }
                    else
                    {
                        callBackFunction.success();
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

            codeServiceId += "0574^";

            codeServiceId += "0575^";

            codeServiceId += "0576^";

            codeServiceId += "0798^";
            codeServiceId += "0808^";
            codeServiceId = codeServiceId.trimEnd('^');
            commonObj.getCodeServiceJson(codeServiceId, {
                success: function (resultArray)
                {
                    try
                    {
                        _baseCodeHashMap = new hashMap();

                        _baseCodeHashMap.put('codeservice_0574', resultArray['0574']);

                        _baseCodeHashMap.put('codeservice_0575', resultArray['0575']);

                        _baseCodeHashMap.put('codeservice_0576', resultArray['0576']);
                        _baseCodeHashMap.put('codeservice_0798', resultArray['0798']);
                        _baseCodeHashMap.put('codeservice_0808', resultArray['0808']);

                        var jmsfArray = [
                            { "id": "0", "text": "0%" },
                            { "id": "10", "text": "10%" }];


                        var jmpwfArray = [
                            { "id": "0", "text": "0%" },
                            { "id": "100", "text": "100%" }];

                        _baseCodeHashMap.put('codeservice_jmsf', jmsfArray);
                        _baseCodeHashMap.put('codeservice_jmpwf', jmpwfArray);

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
               

                var codeService_0574 = _baseCodeHashMap.get('codeservice_0574');


                var codeService_0575 = _baseCodeHashMap.get('codeservice_0575');

                var codeService_0576 = _baseCodeHashMap.get('codeservice_0576');
                var codeService_0798 = _baseCodeHashMap.get('codeservice_0798');
                var codeService_0808 = _baseCodeHashMap.get('codeservice_0808');

                var codeService_jmsf = _baseCodeHashMap.get('codeservice_jmsf');
                var codeService_jmpwf = _baseCodeHashMap.get('codeservice_jmpwf');

                controlObj.datetimeinit('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', f_jfrq_date_onchange, f_jfrq_time_onchange);

                controlObj.singledropdownlistinit('detail_f_jffs_tbl_ld_jfb_detail', codeService_0574, f_jffs_onchange);




                controlObj.singledropdownlistinit('detail_f_jcfs_tbl_ld_jfb_detail', codeService_0575, f_jcfs_onchange);

                controlObj.singledropdownlistinit('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', codeService_jmsf, "");
                controlObj.singledropdownlistinit('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', codeService_jmpwf, "");

                controlObj.singledropdownlistinit('detail_f_yqjmsf_tbl_ld_jfb_detail', codeService_jmsf, "");
                controlObj.singledropdownlistinit('detail_f_yqjmpwf_tbl_ld_jfb_detail', codeService_jmpwf, "");


                controlObj.datetimeinit('detail_f_czsj_tbl_ld_jfb_detail_date', 'detail_f_czsj_tbl_ld_jfb_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);

                controlObj.toggleinit('detail_f_sfykfp_tbl_ld_jfb_detail', f_sfykfp_onchange);


                controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_jfb_detail', codeService_0576, f_zt_onchange);

                //新增
                controlObj.singledropdownlistinit('detail_f_kplb_tbl_ld_jfb_detail', codeService_0798, f_kplb_onchange);

                controlObj.singledropdownlistinit('detail_f_ly_tbl_ld_jfb_detail', codeService_0808);


                    controlObj.toggleinit('detail_f_sfsytjjz_tbl_ld_jfb_detail', f_sfsytjjz_onchange);//是否使用调价结转
                    controlObj.toggleinit('detail_f_sfsyye_tbl_ld_jfb_detail', f_sfsyye_onchange);//是否使用绿化表押金

                    controlObj.toggleinit('detail_f_sfsyycje_tbl_ld_jfb_detail', f_sfsyycje_onchange);//是否使用余额
                

                //模态窗口
                $('#div_search_modal_tbl_ld_jfb_detail').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });

                //模态窗口
                $('#div_print_modal_tbl_ld_jfb_detail').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });
                //初始化选择客户的控件
                $('#div_container_tbl_ld_jfb_list').load('../tbl_ld_khb/tbl_ld_khb_list_part.html', null, function ()
                {
                    tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                    tbl_ld_khb_list_Obj.init({
                        success: function ()
                        {
                            $('#div_container_tbl_ld_jfb_list').css('display', '');
                            $('#div_loading_tbl_ld_jfb_list').css('display', 'none');



                            $('#div_container_tbl_ld_cbiao_list').load('../tbl_ld_cbiao/tbl_ld_cbiao_list_part4jf.html', null, function ()
                            {
                                tbl_ld_cbiao_list_Obj._pr_listtype = that._pr_pagetype;

                                tbl_ld_cbiao_list_Obj.onGridSelecteChanged = function (cbbhids, cbbhs, bqsl, sf, pwf, bqje, jmje, sfjl,dyjtsl,dyjtsf,dejtsl,dejtsf,dsjtsl,dsjtsf)
                                {
                                    controlObj.text('detail_f_sfjl_tbl_ld_jfb_detail', sfjl);
                                    //清空计算信息
                                    controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_shss_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_syye_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', '0');
                                    controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail', 'false');
                                    controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', 'false');
                                    controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', 'false');
                                    controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', '');

                                    controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail', cbbhs);
                                    controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail', cbbhids);
                                    controlObj.text('detail_f_sflj_tbl_ld_jfb_detail', sf.toFixed(2));//水费累计
                                    controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail', pwf.toFixed(2));//污水处理费累计
                                    controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail', jmje);//减免金额累计
                                    controlObj.text('detail_f_sllj_tbl_ld_jfb_detail', bqsl);//本期水量
                                    controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail', bqje.toFixed(2));//抄表应收累计

                                    //阶梯水价
                                    controlObj.text('detail_f_dyjtsl_tbl_ld_jfb_detail', dyjtsl.toFixed(0));
                                    controlObj.text('detail_f_dyjtsf_tbl_ld_jfb_detail', dyjtsf.toFixed(2));
                                    controlObj.text('detail_f_dejtsl_tbl_ld_jfb_detail', dejtsl.toFixed(0));
                                    controlObj.text('detail_f_dejtsf_tbl_ld_jfb_detail', dejtsf.toFixed(2));
                                    controlObj.text('detail_f_dsjtsl_tbl_ld_jfb_detail', dsjtsl.toFixed(0));
                                    controlObj.text('detail_f_dsjtsf_tbl_ld_jfb_detail', dsjtsf.toFixed(2));

                                    //疫情减免归0
                                    controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '0');
                                    controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '0');
                                    controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '');
                                    controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '');

                                    if (parseInt(bqsl) == 0)
                                    {
                                        controlObj.text('detail_f_dj_tbl_ld_jfb_detail', "0");//单价
                                    }
                                    else
                                    {
                                        controlObj.text('detail_f_dj_tbl_ld_jfb_detail', (parseFloat(bqje) / parseFloat(bqsl)).toFixed(2));//单价
                                    }

                                    controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail', (parseFloat(bqje) - parseFloat(jmje)).toFixed(2));//减免后应收累计
                                    controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(bqje) - parseFloat(jmje)).toFixed(2));//算后应收


                                    that.btn_command_receivable_onclick();
                                };

                                tbl_ld_cbiao_list_Obj.init({
                                    success: function ()
                                    {
                                        $('#div_container_tbl_ld_cbiao_list').css('display', '');
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        _blockMessage.show('抄表初始化执行失败<br/>' + message, 'fail');
                                    }
                                });
                            });
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
        setDisable = function ()
        {
            try
            {
                var isDisable = false;
                var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail');
                var lyid = controlObj.singledropdownlistid('detail_f_ly_tbl_ld_jfb_detail');
                switch (that._pr_pagetype)
                {
                    case "0":
                        {
                            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_jfb_detail', true);
                            switch (ztid)
                            {
                                case "0":
                                    {
                                        isDisable = false;
                                        $('#div_command_0').removeClass('hidden');
                                        $('#div_command_1').addClass('hidden');
                                        $('#div_command_2').addClass('hidden');
                                        $('#div_command_3').addClass('hidden');
                                    }
                                    break;

                            }
                        }
                        break;
                    case "1":
                        {
                            switch (ztid)
                            {
                                case "0":
                                    {
                                        isDisable = false;
                                        $('#div_command_0').addClass('hidden');
                                        $('#div_command_1').removeClass('hidden');
                                        $('#div_command_2').addClass('hidden');
                                        $('#div_command_3').addClass('hidden');
                                    }
                                    break;
                                case "1"://已经打印
                                case "2"://已提交
                                    {
                                        isDisable = true;
                                        $('#div_command_0').addClass('hidden');
                                        $('#div_command_1').addClass('hidden');
                                        $('#div_command_2').removeClass('hidden');
                                        $('#div_command_3').addClass('hidden');

                                        //if (that._pr_isadmin == '0')
                                        //{
                                        //    $('#btn_command_rollback_tbl_ld_jfb_detail').removeClass('hidden');
                                        //}
                                        //else
                                        //{
                                        //    $('#btn_command_rollback_tbl_ld_jfb_detail').addClass('hidden');
                                        //}

                                    }
                                    break;
                                case "9":
                                    {
                                        isDisable = true;
                                        $('#div_command_0').addClass('hidden');
                                        $('#div_command_1').addClass('hidden');
                                        $('#div_command_2').addClass('hidden');
                                        $('#div_command_3').removeClass('hidden');
                                    }
                                    break;

                            }
                            if (lyid == '08080005')
                            {
                                //$('#btn_command_rollback_tbl_ld_jfb_detail').addClass('hidden');
                                $('#btn_command_print_tbl_ld_jfb_detail').addClass('hidden');
                                $('#btn_command_save_tbl_ld_jfb_detail').addClass('hidden');
                                $('#btn_command_printsubmit1_tbl_ld_jfb_detail').addClass('hidden');
                            }

                        }
                        break;
                    case "2":
                        {
                            isDisable = true;
                            $('#div_command_0').addClass('hidden');
                            $('#div_command_1').addClass('hidden');
                            $('#div_command_2').addClass('hidden');
                            $('#div_command_3').removeClass('hidden');
                        }
                        break;
                }



                controlObj.textdisable('detail_f_dj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_cbyslj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_sllj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_sflj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_pwflj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_jmhyslj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_jmjelj_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_khytjjzsf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_khytjjzpwf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_sytjjzsf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_hszl_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_shssdx_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_shys_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_ljqf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_khyye_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_jfbh_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yhbh_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_sbbh_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_jfm_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_sbbh_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yhm_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_jfm_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_dz_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_dh_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yslx_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_sblx_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_cbbh_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yyy_tbl_ld_jfb_detail', true);

                controlObj.datetimedisable('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', true);
                controlObj.datetimedisable('detail_f_czsj_tbl_ld_jfb_detail_date', 'detail_f_czsj_tbl_ld_jfb_detail_time', true);
                controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_jfb_detail', true);
                controlObj.singledropdownlistdisable('detail_f_yqjmsf_tbl_ld_jfb_detail', true);
                controlObj.singledropdownlistdisable('detail_f_yqjmpwf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yyt_tbl_ld_jfb_detail', true);

                controlObj.textdisable('detail_f_sytjjzpwf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_syhtjjzsf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_syye_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yhye_tbl_ld_jfb_detail', true);
                controlObj.singledropdownlistdisable('detail_f_ly_tbl_ld_jfb_detail', true);
                controlObj.toggledisable('detail_f_sfykfp_tbl_ld_jfb_detail', true);


                controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', isDisable);
                controlObj.toggledisable('detail_f_sfsytjjz_tbl_ld_jfb_detail', true);
                controlObj.singledropdownlistdisable('detail_f_jffs_tbl_ld_jfb_detail', isDisable);
                controlObj.singledropdownlistdisable('detail_f_jcfs_tbl_ld_jfb_detail', isDisable);
                controlObj.singledropdownlistdisable('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', isDisable);
                controlObj.singledropdownlistdisable('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_yyyid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_yqjmsfje_tbl_ld_jfb_detail', true);
                controlObj.textdisable('detail_f_yqjmpwfje_tbl_ld_jfb_detail', true);


                controlObj.toggledisable('detail_f_sfsyye_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_bz_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_khbh_tbl_ld_jfb_detail', isDisable);
                if (isDisable)
                {
                    $('#btn_detail_f_khbh_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                }
                else
                {
                    $('#btn_detail_f_khbh_tbl_ld_jfb_detail').removeAttr('disabled');
                }

                if (isDisable)
                {
                    $('#btn_detail_f_shss_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                }
                else
                {
                    $('#btn_detail_f_shss_tbl_ld_jfb_detail').removeAttr('disabled');
                }


                if (isDisable)
                {
                    $('#btn_detail_f_shys_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                }
                else
                {
                    $('#btn_detail_f_shys_tbl_ld_jfb_detail').removeAttr('disabled');
                }
                if (isDisable)
                {
                    $('#btn_detail_f_hszl_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                }
                else
                {
                    $('#btn_detail_f_hszl_tbl_ld_jfb_detail').removeAttr('disabled');
                }
                if (isDisable)
                {
                    $('#btn_detail_f_shssdx_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                    $('#btn_detail_f_yqjmsfbfb_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                    $('#btn_detail_f_yqjmpwfbfb_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                }
                else
                {
                    $('#btn_detail_f_shssdx_tbl_ld_jfb_detail').removeAttr('disabled');
                    $('#btn_detail_f_yqjmsfbfb_tbl_ld_jfb_detail').removeAttr('disabled');
                    $('#btn_detail_f_yqjmpwfbfb_tbl_ld_jfb_detail').removeAttr('disabled');
                }

                controlObj.textdisable('detail_f_khbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_yhbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_sbbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_yslxid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_lxtkhh_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_sblxid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_rs_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_cbbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_znjbh_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_znjbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_znjje_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_fjbh_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_fjbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_fjje_tbl_ld_jfb_detail', isDisable);

                //新增
                controlObj.textdisable('detail_f_yytid_tbl_ld_jfb_detail', isDisable); //营业厅id           

                controlObj.textdisable('detail_f_sfsyye_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_shss_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_khfz_tbl_ld_jfb_detail', isDisable);
                controlObj.textdisable('detail_f_khfzid_tbl_ld_jfb_detail', isDisable);
                controlObj.textdisable('detail_f_cbenbh_tbl_ld_jfb_detail', isDisable);
                controlObj.textdisable('detail_f_cbenbhid_tbl_ld_jfb_detail', isDisable);

                controlObj.textdisable('detail_f_kplb_tbl_ld_jfb_detail', isDisable);

            controlObj.textdisable('detail_f_dyjtsl_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_dyjtsf_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_dejtsl_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_dejtsf_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_dsjtsl_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_dsjtsf_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_khyycje_tbl_ld_jfb_detail', true);
            controlObj.toggledisable('detail_f_sfsyycje_tbl_ld_jfb_detail', isDisable);
            controlObj.textdisable('detail_f_syycje_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_yhycje_tbl_ld_jfb_detail', true);
            controlObj.textdisable('detail_f_dszycje_tbl_ld_jfb_detail', true);


                if (isDisable == true)
                {
                    tbl_ld_cbiao_list_Obj._pr_listtype = '2';
                }
                else
                {
                    tbl_ld_cbiao_list_Obj._pr_listtype = '1';
                }
                if (lyid == '08080002' && ztid == '0')
                {
                    controlObj.datetimedisable('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', isDisable);

                    $('#btn_command_save_tbl_ld_jfb_detail').addClass('hidden');
                    controlObj.textdisable('detail_f_khbh_tbl_ld_jfb_detail', true);
                    $('#btn_detail_f_khbh_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                    $('#btn_detail_f_shys_tbl_ld_jfb_detail').attr('disabled', 'disabled');
                    controlObj.textdisable('detail_f_shss_tbl_ld_jfb_detail', true);
                    tbl_ld_cbiao_list_Obj._pr_listtype = '2';
                }

                //在这个地方必须要执行bindgrid，否则disable状态不好用
                tbl_ld_cbiao_list_Obj.bindGrid({
                    success: function ()
                    {
                    }, fail: function (message)
                    {
                        _alertMessage.show('清空抄表信息失败', 'fail');
                    }
                });


                //if ($('#btn_command_rollback_tbl_ld_jfb_detail').hasClass('hidden') || $('#div_command_2').hasClass('hidden'))
                //{
                //}
                //else
                //{
                //    //ajax.IsCanRollBack.sys_id
                //    var data = {
                //        sys_id: that._pr_sys_id,
                //        clientInf: _clientInf
                //    };
                //    doAjaxFunction(_serviceUrl, 'IsCanRollBack', data, {
                //        success: function (message)
                //        {
                //            if (message == 'true')
                //            {


                //            }
                //            else
                //            {

                //                $('#btn_command_rollback_tbl_ld_jfb_detail').addClass('hidden');
                //            }
                //        },
                //        fail: function (message)
                //        {

                //            $('#btn_command_rollback_tbl_ld_jfb_detail').addClass('hidden');
                //        }
                //    });
                //}



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
        *  参数:tbl_ld_jfb_detail, callBackFunction
        *  根据数据对象，绑定数据对象到页面控件
        */
        setModel = function (tbl_ld_jfb_detail, callBackFunction)
        {
            try
            {

                controlObj.text('detail_f_value1_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value1);

                controlObj.text('detail_f_value2_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value2);

                controlObj.text('detail_f_value3_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value3);

                controlObj.text('detail_f_value4_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value4);

                controlObj.text('detail_f_value5_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value5);

                controlObj.text('detail_f_value6_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value6);

                controlObj.text('detail_f_value7_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value7);

                controlObj.text('detail_f_value8_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value8);

                controlObj.text('detail_f_value9_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value9);

                controlObj.text('detail_f_value10_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_value10);

                controlObj.text('detail_f_jfbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_jfbh);

                controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sjbh);

                if (tbl_ld_jfb_detail.f_lyid == '08080002' && tbl_ld_jfb_detail.f_ztid == '0')
                {
                    var d = new Date();
                    controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));
                }
                else
                {
                    controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', tbl_ld_jfb_detail.f_jfrq);

                }

                controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_jffsid);


                controlObj.singledropdownlistid('detail_f_jcfs_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_jcfsid);

                controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yqjmsfbfb);


                controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yqjmpwfbfb);

                controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yqjmsf);


                controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yqjmpwf);



                controlObj.text('detail_f_yyy_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yyy);

                controlObj.text('detail_f_yyyid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yyyid);

                controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yqjmsfje);

                controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yqjmpwfje);




                controlObj.datetime('detail_f_czsj_tbl_ld_jfb_detail_date', 'detail_f_czsj_tbl_ld_jfb_detail_time', tbl_ld_jfb_detail.f_czsj);

                controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sfykfp);

                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_ztid);

                controlObj.text('detail_f_bz_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_bz.returnStringRN());

                controlObj.text('detail_f_khbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khbh);

                controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khbhid);

                controlObj.text('detail_f_yhbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yhbh);

                controlObj.text('detail_f_yhbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yhbhid);

                controlObj.text('detail_f_yhm_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yhm);

                controlObj.text('detail_f_jfm_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_jfm);

                controlObj.text('detail_f_dz_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dz);

                controlObj.text('detail_f_dh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dh);

                controlObj.text('detail_f_dy_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dy);

                controlObj.text('detail_f_dyid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dyid);

                controlObj.text('detail_f_sc_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sc);

                controlObj.text('detail_f_scid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_scid);

                controlObj.text('detail_f_qy_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_qy);

                controlObj.text('detail_f_qyid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_qyid);

                controlObj.text('detail_f_pq_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_pq);

                controlObj.text('detail_f_pqid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_pqid);

                controlObj.text('detail_f_sbbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sbbh);

                controlObj.text('detail_f_sbbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sbbhid);

                controlObj.text('detail_f_yslx_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yslx);

                controlObj.text('detail_f_yslxid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yslxid);

                controlObj.text('detail_f_lxtkhh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_lxtkhh);

                controlObj.text('detail_f_sblx_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sblx);

                controlObj.text('detail_f_sblxid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sblxid);

                controlObj.text('detail_f_rs_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_rs);

                controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_cbbh);

                controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_cbbhid);





                controlObj.text('detail_f_znjbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_znjbh);

                controlObj.text('detail_f_znjbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_znjbhid);

                controlObj.text('detail_f_znjje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_znjje);

                controlObj.text('detail_f_fjbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_fjbh);

                controlObj.text('detail_f_fjbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_fjbhid);

                controlObj.text('detail_f_fjje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_fjje);

                controlObj.text('detail_f_sfjl_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sfjl);
                //新增
                controlObj.text('detail_f_yyt_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yyt);
                controlObj.text('detail_f_yytid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yytid);
                controlObj.text('detail_f_dj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dj);
                controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_cbyslj);
                controlObj.text('detail_f_sllj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sllj);
                controlObj.text('detail_f_sflj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sflj);
                controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_pwflj);
                controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_jmhyslj);
                controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_jmjelj);
                controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khytjjzsf);
                controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khytjjzpwf);

                controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sfsytjjz);

                controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sytjjzsf);
                controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sytjjzpwf);
                controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_syhtjjzsf);
                controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sfsyye);
                controlObj.text('detail_f_syye_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_syye);
                controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yhye);
                controlObj.text('detail_f_shys_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_shys);
                controlObj.text('detail_f_shss_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_shss);
                controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_hszl);
                controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_shssdx);
                controlObj.text('detail_f_khfz_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khfz);
                controlObj.text('detail_f_khfzid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khfzid);
                controlObj.text('detail_f_cbenbh_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_cbenbh);
                controlObj.text('detail_f_cbenbhid_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_cbenbhid);
                controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_ljqf);
                controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_kplbid);
                controlObj.text('detail_f_khyye_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khyye);
                controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_syhtjjzpwf);
                //阶梯水价
            controlObj.text('detail_f_dyjtsl_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dyjtsl);
            controlObj.text('detail_f_dyjtsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dyjtsf);
            controlObj.text('detail_f_dejtsl_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dejtsl);
            controlObj.text('detail_f_dejtsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dejtsf);
            controlObj.text('detail_f_dsjtsl_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dsjtsl);
                controlObj.text('detail_f_dsjtsf_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dsjtsf);
                //余额
            controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_khyycje);
            controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_sfsyycje);
            controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_syycje);
            controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_yhycje);
            controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_dszycje);
                controlObj.singledropdownlistid('detail_f_ly_tbl_ld_jfb_detail', tbl_ld_jfb_detail.f_lyid);
                if (tbl_ld_jfb_detail.f_lyid != '08080002')
                {
                    var querysql = {
                        "tbl_ld_jfb": "select count(*) count from TBL_LD_JFB  where f_lyid='08080002' and f_ztid='0' and f_khbh='" + tbl_ld_jfb_detail.f_khbh + "'"
                    };
                    commonObj.querySqls(querysql, {
                        success: function (count)
                        {
                            var k = count["tbl_ld_jfb"][0];
                            if (k["count"] > 0)
                            {
                                $("#div_detail_f_jhts_tbl_ld_jfb_detail").removeClass("hidden");
                            }
                            callBackFunction.success();
                        }
                    });
                } else
                {
                    callBackFunction.success();
                }
            }
            catch (ex)
            {
                _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');
            }
        },

        /* 
    *  
    *  方法:setModelDirect
    *  参数:tbl_ld_jfb_detail, callBackFunction
    *  前台缴费根据数据对象，绑定数据对象到页面控件
    */
        setModelDirect = function (callBackFunction)
        {

            try
            {

                var data = {
                    typeid: 'JF',
                    nodeid: ''
                }
                doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                    success: function (message)
                    {
                        controlObj.text('detail_f_value1_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value2_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value3_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value4_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value5_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value6_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value7_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value8_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value9_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value10_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_jfbh_tbl_ld_jfb_detail', message);

                        controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', '');

                        var d = new Date();


                        controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));

                        //controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_jfb_detail', '05740001');


                        controlObj.singledropdownlistid('detail_f_jcfs_tbl_ld_jfb_detail', '05750002');



                        controlObj.text('detail_f_yyy_tbl_ld_jfb_detail', basePageObj._userInfoJson.sys_username);

                        controlObj.text('detail_f_yyyid_tbl_ld_jfb_detail', basePageObj._userInfoJson.sys_userid);




                        controlObj.datetime('detail_f_czsj_tbl_ld_jfb_detail_date', 'detail_f_czsj_tbl_ld_jfb_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));

                        controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'false');

                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_jfb_detail', '0');

                        controlObj.text('detail_f_yyt_tbl_ld_jfb_detail', basePageObj._userInfoJson.sys_toporganname);
                        controlObj.text('detail_f_yytid_tbl_ld_jfb_detail', basePageObj._userInfoJson.sys_toporgan);

                        controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '0');

                        controlObj.text('detail_f_dj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sllj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sflj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_shss_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_khyye_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_syye_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dyjtsl_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dyjtsf_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dejtsl_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dejtsf_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dsjtsl_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dsjtsf_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', '0');
                    controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', 'false');
                    controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', '0');
                    controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail', '0');

                        controlObj.singledropdownlistid('detail_f_ly_tbl_ld_jfb_detail', '08080003');



                        callBackFunction.success();

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
        },
        /* 
    *  
    *  清空全部控件
    */
        clearModel = function ()
        {
            try
            {

                controlObj.text('detail_f_value1_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value2_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value3_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value4_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value5_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value6_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value7_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value8_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value9_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_value10_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_jfbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', '');


                controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time', '1900-01-01 00:00:00');

                controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_jfb_detail', '');


                controlObj.singledropdownlistid('detail_f_jcfs_tbl_ld_jfb_detail', '');



                controlObj.text('detail_f_yyy_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_yyyid_tbl_ld_jfb_detail', '');




                controlObj.datetime('detail_f_czsj_tbl_ld_jfb_detail_date', 'detail_f_czsj_tbl_ld_jfb_detail_time', '1900-01-01 00:00:00');

                controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', '');

                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_bz_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_khbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_yhbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_yhbhid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_yhm_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_jfm_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_dz_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_dh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_dy_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_dyid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sc_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_scid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_qy_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_qyid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_pq_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_pqid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sbbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sbbhid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_yslx_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_yslxid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_lxtkhh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sblx_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sblxid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_rs_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail', '');





                controlObj.text('detail_f_znjbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_znjbhid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_znjje_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_fjbh_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_fjbhid_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_fjje_tbl_ld_jfb_detail', '');


                //新增
                controlObj.text('detail_f_yyt_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_yytid_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_dj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_sllj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_sflj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail', '');

                controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', '');

                controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', '');
                controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_syye_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_shss_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_khfz_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_khfzid_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_cbenbh_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_cbenbhid_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail', '');
                controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_jfb_detail', '');
                controlObj.singledropdownlistid('detail_f_ly_tbl_ld_jfb_detail', '08080003');
                controlObj.text('detail_f_khyye_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', '');
                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail', '0');
                controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '0');
                controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '0');
                controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_jfb_detail', '0');
                controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_jfb_detail', '0');

                controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '');
                controlObj.text('detail_f_sfjl_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dyjtsl_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dyjtsf_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dejtsl_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dejtsf_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dsjtsl_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dsjtsf_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', '');
            controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', '');
            controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail', '');
                //part程序，,让传入khbhid = -1, bindGrid
                //清空part程序的其他参数
                tbl_ld_cbiao_list_Obj._pr_set_jfrq = '';
                tbl_ld_cbiao_list_Obj._pr_set_khbhid = "-1";
                tbl_ld_cbiao_list_Obj.bindGrid({
                    success: function ()
                    {
                    }, fail: function (message)
                    {
                        _alertMessage.show('清空抄表信息失败', 'fail');
                    }
                });

                $("#div_detail_f_jhts_tbl_ld_jfb_detail").addClass("hidden");
                _validateMessage_save.hidden();
                _validateMessage_printsubmit0.hidden();
                _validateMessage_printsubmit1.hidden();

            }
            catch (ex)
            {
                _blockMessage.show('clearModel执行失败<br/>' + ex.message, 'fail');
            }
        },
        //清理计算数据
        clearJs = function ()
        {
            try
            {
                tbl_ld_cbiao_list_Obj.destorygGrid({
                    success: function ()
                    {
                        controlObj.text('detail_f_value1_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value2_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value3_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value4_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value5_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value6_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value7_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value8_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value9_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_value10_tbl_ld_jfb_detail', '');



                        controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', '');








                        controlObj.text('detail_f_bz_tbl_ld_jfb_detail', '');


                        controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_yhbh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_yhbhid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_yhm_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_jfm_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_dz_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_dh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_dy_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_dyid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_sc_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_scid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_qy_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_qyid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_pq_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_pqid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_sbbh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_sbbhid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_yslx_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_yslxid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_lxtkhh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_sblx_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_sblxid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_rs_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail', '');





                        controlObj.text('detail_f_znjbh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_znjbhid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_znjje_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_fjbh_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_fjbhid_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_fjje_tbl_ld_jfb_detail', '');


                        //新增

                        controlObj.text('detail_f_dj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sllj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sflj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail', '0');

                        controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', '');

                        controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', '0');
                        controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_syye_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_shss_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_khfz_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_khfzid_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_cbenbh_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_cbenbhid_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail', '0');


                        controlObj.text('detail_f_khyye_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '');
                        controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_sfjl_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_dyjtsl_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_dyjtsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_dejtsl_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_dejtsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_dsjtsl_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_dsjtsf_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', '0');
                        controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', '');
                        controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', '0');
                        controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail', '0');

                        $("#div_detail_f_jhts_tbl_ld_jfb_detail").addClass("hidden");
                        _validateMessage_save.hidden();
                        _validateMessage_printsubmit0.hidden();
                        _validateMessage_printsubmit1.hidden();
                    },
                    fail: function (message)
                    {
                        _alertMessage.show('重载抄表表失败<br/>', 'fail');
                    }
                });

                

            }
            catch (ex)
            {
                _blockMessage.show('clearModel执行失败<br/>' + ex.message, 'fail');
            }

        },
        /* 
        *  
        *  方法:getModel
        *  参数:callbackFunction
        *  获取页面数据，返回对象tbl_ld_jfb_detail
        */
        getModel = function (callBackFunction)
        {
            try
            {
                var tbl_ld_jfb_detail = new Object();


                tbl_ld_jfb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_jfbh = controlObj.text('detail_f_jfbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_sjbh = controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_jfrq = controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time');

                tbl_ld_jfb_detail.f_jffs = controlObj.singledropdownlist('detail_f_jffs_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_jffsid = controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_jfb_detail');



                tbl_ld_jfb_detail.f_jcfs = controlObj.singledropdownlist('detail_f_jcfs_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_jcfsid = controlObj.singledropdownlistid('detail_f_jcfs_tbl_ld_jfb_detail');




                tbl_ld_jfb_detail.f_yyy = controlObj.text('detail_f_yyy_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_yyyid = controlObj.text('detail_f_yyyid_tbl_ld_jfb_detail');






                tbl_ld_jfb_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_jfb_detail_date', 'detail_f_czsj_tbl_ld_jfb_detail_time');


                tbl_ld_jfb_detail.f_sfykfp = controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_yqjmsfbfb = controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_yqjmpwfbfb = controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_yqjmsf = controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_yqjmpwf = controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_yqjmsfje = controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_yqjmpwfje = controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_yslx = controlObj.text('detail_f_yslx_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_yslxid = controlObj.text('detail_f_yslxid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_lxtkhh = controlObj.text('detail_f_lxtkhh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_cbbhid = controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail');








                tbl_ld_jfb_detail.f_znjbh = controlObj.text('detail_f_znjbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_znjbhid = controlObj.text('detail_f_znjbhid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_znjje = controlObj.text('detail_f_znjje_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_fjbh = controlObj.text('detail_f_fjbh_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_fjbhid = controlObj.text('detail_f_fjbhid_tbl_ld_jfb_detail');


                tbl_ld_jfb_detail.f_fjje = controlObj.text('detail_f_fjje_tbl_ld_jfb_detail');

                //新增

                tbl_ld_jfb_detail.f_yyt = controlObj.text('detail_f_yyt_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_yytid = controlObj.text('detail_f_yytid_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_dj = controlObj.text('detail_f_dj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_cbyslj = controlObj.text('detail_f_cbyslj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_sllj = controlObj.text('detail_f_sllj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_sflj = controlObj.text('detail_f_sflj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_pwflj = controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_jmhyslj = controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_jmjelj = controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_khytjjzsf = controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_khytjjzpwf = controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_sfsytjjz = controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail');

                tbl_ld_jfb_detail.f_sytjjzsf = controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_sytjjzpwf = controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_syhtjjzsf = controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_sfsyye = controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_syye = controlObj.text('detail_f_syye_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_yhye = controlObj.text('detail_f_yhye_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_shss = controlObj.text('detail_f_shss_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_hszl = controlObj.text('detail_f_hszl_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_shssdx = controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_khfz = controlObj.text('detail_f_khfz_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_khfzid = controlObj.text('detail_f_khfzid_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_cbenbh = controlObj.text('detail_f_cbenbh_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_cbenbhid = controlObj.text('detail_f_cbenbhid_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_ljqf = controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_kplbid = controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_kplb = controlObj.singledropdownlist('detail_f_kplb_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_khyye = controlObj.text('detail_f_khyye_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_syhtjjzpwf = controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_lyid = controlObj.singledropdownlistid('detail_f_ly_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_ly = controlObj.singledropdownlist('detail_f_ly_tbl_ld_jfb_detail');
                tbl_ld_jfb_detail.f_sfjl = controlObj.text('detail_f_sfjl_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dyjtsl = controlObj.text('detail_f_dyjtsl_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dyjtsf = controlObj.text('detail_f_dyjtsf_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dejtsl = controlObj.text('detail_f_dejtsl_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dejtsf = controlObj.text('detail_f_dejtsf_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dsjtsl = controlObj.text('detail_f_dsjtsl_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dsjtsf = controlObj.text('detail_f_dsjtsf_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_khyycje = controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_sfsyycje = controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_syycje = controlObj.text('detail_f_syycje_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_yhycje = controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail');
            tbl_ld_jfb_detail.f_dszycje = controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail');
                callBackFunction.success(tbl_ld_jfb_detail);
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }
        },

        /* 
        *  
        *  方法:checkModel
        *  参数:tbl_ld_jfb_detail，callbackFunction
        *  页面数据校验，会用到_validateMessage_save，校验结果分success，fail
        */
        checkModel_save = function (tbl_ld_jfb_detail, validateMessage, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();

                if (tbl_ld_jfb_detail.f_value1.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value1_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_value2.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value2_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value3.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value3_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value4.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value4_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value5.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value5_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value6.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value6_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value7.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value7_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value8.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value8_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value9.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value9_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_value10.length > 200)
                {
                    errorMessageHansMap.put('detail_f_value10_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_jfbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jfbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_sjbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sjbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }







                if (tbl_ld_jfb_detail.f_jffs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jffs_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }









                if (tbl_ld_jfb_detail.f_jcfs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jcfs_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yyy.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yyy_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yyyid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yyyid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }








                if (tbl_ld_jfb_detail.f_sfykfp.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sfykfp_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_zt.length > 200)
                {
                    errorMessageHansMap.put('detail_f_zt_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_bz.length > 4000)
                {
                    errorMessageHansMap.put('detail_f_bz_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">4000</a>个字');
                }




                if (tbl_ld_jfb_detail.f_khbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_khbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khbhid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yhbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yhbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yhm.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhm_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_jfm.length > 200)
                {
                    errorMessageHansMap.put('detail_f_jfm_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_dz.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dz_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_dh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_dy.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dy_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_dyid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dyid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_sc.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sc_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_scid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_scid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_qy.length > 200)
                {
                    errorMessageHansMap.put('detail_f_qy_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_qyid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_qyid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_pq.length > 200)
                {
                    errorMessageHansMap.put('detail_f_pq_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_pqid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_pqid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_sbbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sbbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_sbbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yslx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yslx_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_yslxid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yslxid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_lxtkhh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_lxtkhh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_sblx.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sblx_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_sblxid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sblxid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_rs.length > 200)
                {
                    errorMessageHansMap.put('detail_f_rs_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_cbbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_cbbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }






                if (tbl_ld_jfb_detail.f_znjbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_znjbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_znjbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_znjbhid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_znjje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_znjje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_fjbh.length > 200)
                {
                    errorMessageHansMap.put('detail_f_fjbh_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_fjbhid.length > 200)
                {
                    errorMessageHansMap.put('detail_f_fjbhid_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_jfb_detail.f_fjje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_fjje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dyjtsl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dyjtsl_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dyjtsf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dyjtsf_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dejtsl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dejtsl_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dejtsf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dejtsf_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dsjtsl.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dsjtsl_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dsjtsf.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dsjtsf_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_khyycje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_khyycje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_jfb_detail.f_sfsyycje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_sfsyycje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_syycje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_syycje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_yhycje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_yhycje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_jfb_detail.f_dszycje.length > 200)
                {
                    errorMessageHansMap.put('detail_f_dszycje_tbl_ld_jfb_detail', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (errorMessageHansMap.keys().length > 0)
                {
                    validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    validateMessage.hidden();
                    callBackFunction.success(tbl_ld_jfb_detail);
                }
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }

        },

        /* 
    *  
    *  方法:checkModel_validateMessage_printsubmit0
    *  参数:tbl_ld_jfb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage_save，校验结果分success，fail
    */
        checkModel_printsubmit0 = function (tbl_ld_jfb_detail, validateMessage, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();


                if (tbl_ld_jfb_detail.f_sjbh.length < 1)
                {
                    errorMessageHansMap.put('detail_f_sjbh_tbl_ld_jfb_detail', '长度不能少于<a style="color:red">1</a>个字');
                }

                if (tbl_ld_jfb_detail.f_khbh.length < 1)
                {
                    errorMessageHansMap.put('detail_f_khbh_tbl_ld_jfb_detail', '长度不能少于<a style="color:red">1</a>个字');
                }
                if (tbl_ld_jfb_detail.f_yqjmsf == null || tbl_ld_jfb_detail.f_yqjmsf == "")
                {
                    tbl_ld_jfb_detail.f_yqjmsf = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmsfbfb == null || tbl_ld_jfb_detail.f_yqjmsfbfb == "")
                {
                    tbl_ld_jfb_detail.f_yqjmsfbfb = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmpwf == null || tbl_ld_jfb_detail.f_yqjmpwf == "")
                {
                    tbl_ld_jfb_detail.f_yqjmpwf = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmpwfbfb == null || tbl_ld_jfb_detail.f_yqjmpwfbfb == "")
                {
                    tbl_ld_jfb_detail.f_yqjmpwfbfb = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmsf !=  tbl_ld_jfb_detail.f_yqjmsfbfb)
                {
                    errorMessageHansMap.put('detail_f_yqjmsf_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if (tbl_ld_jfb_detail.f_yqjmpwf != tbl_ld_jfb_detail.f_yqjmpwfbfb)
                {
                    errorMessageHansMap.put('detail_f_yqjmpwf_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if (tbl_ld_jfb_detail.f_yqjmsfbfb != '0' && tbl_ld_jfb_detail.f_yqjmsfje.length < 1)
                {
                    errorMessageHansMap.put('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if (tbl_ld_jfb_detail.f_yqjmpwfbfb != '0' && tbl_ld_jfb_detail.f_yqjmpwfje.length < 1)
                {
                    errorMessageHansMap.put('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmsfje == null || tbl_ld_jfb_detail.f_yqjmsfje == "" || tbl_ld_jfb_detail.f_yqjmsfje == "0") && tbl_ld_jfb_detail.f_yqjmsfbfb != '0')
                {
                    errorMessageHansMap.put('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmsfje != null && tbl_ld_jfb_detail.f_yqjmsfje != "" && tbl_ld_jfb_detail.f_yqjmsfje != "0") && (tbl_ld_jfb_detail.f_yqjmsfbfb == '0' || tbl_ld_jfb_detail.f_yqjmsfbfb == ''))
                {
                    errorMessageHansMap.put('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmpwfje == null || tbl_ld_jfb_detail.f_yqjmpwfje == "" || tbl_ld_jfb_detail.f_yqjmpwfje == "0") && tbl_ld_jfb_detail.f_yqjmpwfbfb != '0')
                {
                    errorMessageHansMap.put('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmpwfje != null && tbl_ld_jfb_detail.f_yqjmpwfje != "" && tbl_ld_jfb_detail.f_yqjmpwfje != "0") && (tbl_ld_jfb_detail.f_yqjmpwfbfb == '0' || tbl_ld_jfb_detail.f_yqjmpwfbfb == ''))
                {
                    errorMessageHansMap.put('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                //if (tbl_ld_jfb_detail.f_cbbh.length < 1)
                //{
                //    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_jfb_detail', '长度不能少于<a style="color:red">1</a>个字');
                //}

                if (parseFloat(tbl_ld_jfb_detail.f_jmhyslj) < parseFloat(tbl_ld_jfb_detail.f_shys))
                {
                    errorMessageHansMap.put('detail_f_shys_tbl_ld_jfb_detail', '未进行算后应收计算');
                }

                if ((parseFloat(tbl_ld_jfb_detail.f_shys) + parseFloat(tbl_ld_jfb_detail.f_dszycje)).toFixed(2) != parseFloat(tbl_ld_jfb_detail.f_shss).toFixed(2))
                {
                    errorMessageHansMap.put('detail_f_shss_tbl_ld_jfb_detail', '多收转余额未进行算后实收计算');
                }

                if (tbl_ld_jfb_detail.f_shssdx.length < 1)
                {
                    errorMessageHansMap.put('detail_f_shys_tbl_ld_jfb_detail', '请先进行算后应收计算');
                }


                if (errorMessageHansMap.keys().length > 0)
                {
                    validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    validateMessage.hidden();
                    callBackFunction.success(tbl_ld_jfb_detail);
                }
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }

        },

        /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_jfb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage_save，校验结果分success，fail
    */
        checkModel_printsubmit1 = function (tbl_ld_jfb_detail, validateMessage, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();


                if (tbl_ld_jfb_detail.f_sjbh.length < 1)
                {
                    errorMessageHansMap.put('detail_f_sjbh_tbl_ld_jfb_detail', '长度不能少于<a style="color:red">1</a>个字');
                }

                if (tbl_ld_jfb_detail.f_khbh.length < 1)
                {
                    errorMessageHansMap.put('detail_f_khbh_tbl_ld_jfb_detail', '长度不能少于<a style="color:red">1</a>个字');
                }
                if (tbl_ld_jfb_detail.f_yqjmsf == null || tbl_ld_jfb_detail.f_yqjmsf == "")
                {
                    tbl_ld_jfb_detail.f_yqjmsf = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmsfbfb == null || tbl_ld_jfb_detail.f_yqjmsfbfb == "")
                {
                    tbl_ld_jfb_detail.f_yqjmsfbfb = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmpwf == null || tbl_ld_jfb_detail.f_yqjmpwf == "")
                {
                    tbl_ld_jfb_detail.f_yqjmpwf = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmpwfbfb == null || tbl_ld_jfb_detail.f_yqjmpwfbfb == "")
                {
                    tbl_ld_jfb_detail.f_yqjmpwfbfb = "0";
                }

                if (tbl_ld_jfb_detail.f_yqjmsf != tbl_ld_jfb_detail.f_yqjmsfbfb)
                {
                    errorMessageHansMap.put('detail_f_yqjmsf_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if (tbl_ld_jfb_detail.f_yqjmpwf != tbl_ld_jfb_detail.f_yqjmpwfbfb)
                {
                    errorMessageHansMap.put('detail_f_yqjmpwf_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if (tbl_ld_jfb_detail.f_yqjmsfbfb != '0' && tbl_ld_jfb_detail.f_yqjmsfje.length < 1)
                {
                    errorMessageHansMap.put('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if (tbl_ld_jfb_detail.f_yqjmpwfbfb != '0' && tbl_ld_jfb_detail.f_yqjmpwfje.length < 1)
                {
                    errorMessageHansMap.put('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmsfje == null || tbl_ld_jfb_detail.f_yqjmsfje == "" || tbl_ld_jfb_detail.f_yqjmsfje == "0") && tbl_ld_jfb_detail.f_yqjmsfbfb != '0')
                {
                    errorMessageHansMap.put('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmsfje != null && tbl_ld_jfb_detail.f_yqjmsfje != "" && tbl_ld_jfb_detail.f_yqjmsfje != "0") && (tbl_ld_jfb_detail.f_yqjmsfbfb == '0' || tbl_ld_jfb_detail.f_yqjmsfbfb == ''))
                {
                    errorMessageHansMap.put('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmpwfje == null || tbl_ld_jfb_detail.f_yqjmpwfje == "" || tbl_ld_jfb_detail.f_yqjmpwfje == "0") && tbl_ld_jfb_detail.f_yqjmpwfbfb != '0')
                {
                    errorMessageHansMap.put('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                if ((tbl_ld_jfb_detail.f_yqjmpwfje != null && tbl_ld_jfb_detail.f_yqjmpwfje != "" && tbl_ld_jfb_detail.f_yqjmpwfje != "0") && (tbl_ld_jfb_detail.f_yqjmpwfbfb == '0' || tbl_ld_jfb_detail.f_yqjmpwfbfb == ''))
                {
                    errorMessageHansMap.put('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '未进行疫情减免计算');
                }

                //if (tbl_ld_jfb_detail.f_cbbh.length < 1)
                //{
                //    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_jfb_detail', '长度不能少于<a style="color:red">1</a>个字');
                //}


                if ((parseFloat(tbl_ld_jfb_detail.f_shys) + parseFloat(tbl_ld_jfb_detail.f_dszycje)).toFixed(2) != parseFloat(tbl_ld_jfb_detail.f_shss).toFixed(2))
                {
                    errorMessageHansMap.put('detail_f_hszl_tbl_ld_jfb_detail', '多收转余额未进行计算');
                }

                if (tbl_ld_jfb_detail.f_shssdx.length < 1)
                {
                    errorMessageHansMap.put('detail_f_shys_tbl_ld_jfb_detail', '请先进行算后应收计算');
                }

                if (errorMessageHansMap.keys().length > 0)
                {
                    validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    validateMessage.hidden();
                    callBackFunction.success(tbl_ld_jfb_detail);
                }
            }
            catch (ex)
            {
                callBackFunction.fail(ex.message);
            }

        },

        /* 
     *  
     *  方法:checkShyj
     *  参数:校验水量累计字段是否和list中选中的水量累计的累加和相同，
     *  防止偶发页面上选中了，但是数据没有带过来的bug
     */
        checkSllj = function ()
        {
            var sllj = controlObj.text('detail_f_sllj_tbl_ld_jfb_detail'); //水量累计
            if (sllj == undefined || sllj == null || sllj == "")
            {
                sllj = 0;
            }
            else
            {
                sllj = Number(sllj);
            }
            var bqslTotal = 0;
            var selectedRowArray = $('#table_grid_tbl_ld_cbiao_list').find('tbody>tr.selected');
            $.each(selectedRowArray, function (i, u)
            {
                var selectedRow = $(u);
                var id = selectedRow.attr('id');
                var bqsl = $('#' + id + '_td_36_f_bqsl').text();
                if (bqsl != undefined && bqsl != null && bqsl != "")
                {
                    bqslTotal += Number(bqsl);
                }
            });


            if (bqslTotal == sllj)
            {
                return true;
            }
            else
            {
                return false;
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jfbh^f_sjbh^f_jfrq^f_yyy^f_yyyid^f_zt^f_ztid^f_bz^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_yslx^f_yslxid^f_lxtkhh^f_sblx^f_sblxid^f_rs^f_cbbh^f_cbbhid^f_znjbh^f_znjbhid^f_znjje^f_fjbh^f_fjbhid^f_fjje^f_jffs^f_jffsid^f_jcfs^f_jcfsid^f_czsj^f_sfykfp^f_yyt^f_yytid^f_dj^f_cbyslj^f_sllj^f_sflj^f_pwflj^f_jmjelj^f_jmhyslj^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_hszl^f_shssdx^f_khfz^f_khfzid^f_cbenbh^f_cbenbhid^f_ljqf^f_kplb^f_kplbid^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_ly^f_lyid^f_sfjl^sys_id^f_khyycje^f_sfsyycje^f_syycje^f_yhycje^f_dszycje^f_dyjtsl^f_dyjtsf^f_dejtsl^f_dejtsf^f_dsjtsl^f_dsjtsf^f_yqjmsfbfb^f_yqjmpwfbfb^f_yqjmsfje^f_yqjmpwfje^f_yqjmsf^f_yqjmpwf';
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
            *  参数:tbl_ld_jfb_detail, callbackFunction
            *  向数据库更新数据，根据数据对象
            */
        updateData = function (tbl_ld_jfb_detail, type, callbackFunction)
        {
            ////;
            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jfbh^f_sjbh^f_jfrq^f_yyy^f_yyyid^f_zt^f_ztid^f_bz^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_yslx^f_yslxid^f_lxtkhh^f_sblx^f_sblxid^f_rs^f_cbbh^f_cbbhid^f_znjbh^f_znjbhid^f_znjje^f_fjbh^f_fjbhid^f_fjje^f_jffs^f_jffsid^f_jcfs^f_jcfsid^f_czsj^f_sfykfp^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate^f_yyt^f_yytid^f_dj^f_cbyslj^f_sllj^f_sflj^f_pwflj^f_jmjelj^f_jmhyslj^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_hszl^f_shssdx^f_khfz^f_khfzid^f_cbenbh^f_cbenbhid^f_ljqf^f_kplb^f_kplbid^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_ly^f_lyid^f_sfjl^f_khyycje^f_sfsyycje^f_syycje^f_yhycje^f_dszycje^f_dyjtsl^f_dyjtsf^f_dejtsl^f_dejtsf^f_dsjtsl^f_dsjtsf^f_yqjmsfbfb^f_yqjmpwfbfb^f_yqjmsfje^f_yqjepwfje^f_yqjmsf^f_yqjepwf';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_jfb_detail.f_value1,

                f_value2: tbl_ld_jfb_detail.f_value2,

                f_value3: tbl_ld_jfb_detail.f_value3,

                f_value4: tbl_ld_jfb_detail.f_value4,

                f_value5: tbl_ld_jfb_detail.f_value5,

                f_value6: tbl_ld_jfb_detail.f_value6,

                f_value7: tbl_ld_jfb_detail.f_value7,

                f_value8: tbl_ld_jfb_detail.f_value8,

                f_value9: tbl_ld_jfb_detail.f_value9,

                f_value10: tbl_ld_jfb_detail.f_value10,

                f_jfbh: tbl_ld_jfb_detail.f_jfbh,

                f_sjbh: tbl_ld_jfb_detail.f_sjbh,

                f_jfrq: tbl_ld_jfb_detail.f_jfrq,

                f_jffs: tbl_ld_jfb_detail.f_jffs,
                f_jffsid: tbl_ld_jfb_detail.f_jffsid,


                f_jcfs: tbl_ld_jfb_detail.f_jcfs,
                f_jcfsid: tbl_ld_jfb_detail.f_jcfsid,



                f_yyy: tbl_ld_jfb_detail.f_yyy,

                f_yyyid: tbl_ld_jfb_detail.f_yyyid,




                f_czsj: tbl_ld_jfb_detail.f_czsj,

                f_sfykfp: tbl_ld_jfb_detail.f_sfykfp,

                f_zt: tbl_ld_jfb_detail.f_zt,
                f_ztid: tbl_ld_jfb_detail.f_ztid,

                f_bz: tbl_ld_jfb_detail.f_bz.formatStringRN(),

                f_khbh: tbl_ld_jfb_detail.f_khbh,

                f_khbhid: tbl_ld_jfb_detail.f_khbhid,

                f_yhbh: tbl_ld_jfb_detail.f_yhbh,

                f_yhbhid: tbl_ld_jfb_detail.f_yhbhid,

                f_yhm: tbl_ld_jfb_detail.f_yhm,

                f_jfm: tbl_ld_jfb_detail.f_jfm,

                f_dz: tbl_ld_jfb_detail.f_dz,

                f_dh: tbl_ld_jfb_detail.f_dh,

                f_dy: tbl_ld_jfb_detail.f_dy,

                f_dyid: tbl_ld_jfb_detail.f_dyid,

                f_sc: tbl_ld_jfb_detail.f_sc,

                f_scid: tbl_ld_jfb_detail.f_scid,

                f_qy: tbl_ld_jfb_detail.f_qy,

                f_qyid: tbl_ld_jfb_detail.f_qyid,

                f_pq: tbl_ld_jfb_detail.f_pq,

                f_pqid: tbl_ld_jfb_detail.f_pqid,

                f_sbbh: tbl_ld_jfb_detail.f_sbbh,

                f_sbbhid: tbl_ld_jfb_detail.f_sbbhid,

                f_yslx: tbl_ld_jfb_detail.f_yslx,

                f_yslxid: tbl_ld_jfb_detail.f_yslxid,

                f_lxtkhh: tbl_ld_jfb_detail.f_lxtkhh,

                f_sblx: tbl_ld_jfb_detail.f_sblx,

                f_sblxid: tbl_ld_jfb_detail.f_sblxid,

                f_rs: tbl_ld_jfb_detail.f_rs,

                f_cbbh: tbl_ld_jfb_detail.f_cbbh,

                f_cbbhid: tbl_ld_jfb_detail.f_cbbhid,



                f_znjbh: tbl_ld_jfb_detail.f_znjbh,

                f_znjbhid: tbl_ld_jfb_detail.f_znjbhid,

                f_znjje: tbl_ld_jfb_detail.f_znjje,

                f_fjbh: tbl_ld_jfb_detail.f_fjbh,

                f_fjbhid: tbl_ld_jfb_detail.f_fjbhid,

                f_fjje: tbl_ld_jfb_detail.f_fjje,
                f_sfjl: tbl_ld_jfb_detail.f_sfjl,



                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),

                //新增
                f_yyt: tbl_ld_jfb_detail.f_yyt,
                f_yytid: tbl_ld_jfb_detail.f_yytid,
                f_dj: tbl_ld_jfb_detail.f_dj,
                f_cbyslj: tbl_ld_jfb_detail.f_cbyslj,
                f_sllj: tbl_ld_jfb_detail.f_sllj,
                f_sflj: tbl_ld_jfb_detail.f_sflj,
                f_pwflj: tbl_ld_jfb_detail.f_pwflj,
                f_jmhyslj: tbl_ld_jfb_detail.f_jmhyslj,
                f_jmjelj: tbl_ld_jfb_detail.f_jmjelj,
                f_khytjjzsf: tbl_ld_jfb_detail.f_khytjjzsf,
                f_khytjjzpwf: tbl_ld_jfb_detail.f_khytjjzpwf,
                f_sfsytjjz: tbl_ld_jfb_detail.f_sfsytjjz,
                f_khyye: tbl_ld_jfb_detail.f_khyye,
                f_sfsyye: tbl_ld_jfb_detail.f_sfsyye,
                f_syye: tbl_ld_jfb_detail.f_syye,
                f_yhye: tbl_ld_jfb_detail.f_yhye,
                f_shys: tbl_ld_jfb_detail.f_shys,
                f_shss: tbl_ld_jfb_detail.f_shss,
                f_hszl: tbl_ld_jfb_detail.f_hszl,
                f_shssdx: tbl_ld_jfb_detail.f_shssdx,
                f_khfz: tbl_ld_jfb_detail.f_khfz,
                f_khfzid: tbl_ld_jfb_detail.f_khfzid,
                f_cbenbh: tbl_ld_jfb_detail.f_cbenbh,
                f_cbenbhid: tbl_ld_jfb_detail.f_cbenbhid,
                f_ljqf: tbl_ld_jfb_detail.f_ljqf,
                f_kplb: tbl_ld_jfb_detail.f_kplb,
                f_kplbid: tbl_ld_jfb_detail.f_kplbid,
                f_sytjjzsf: tbl_ld_jfb_detail.f_sytjjzsf,
                f_sytjjzpwf: tbl_ld_jfb_detail.f_sytjjzpwf,
                f_syhtjjzsf: tbl_ld_jfb_detail.f_syhtjjzsf,
                f_syhtjjzpwf: tbl_ld_jfb_detail.f_syhtjjzpwf,
                f_ly: tbl_ld_jfb_detail.f_ly,
                f_lyid: tbl_ld_jfb_detail.f_lyid,

                //阶梯水价
                f_dyjtsl: tbl_ld_jfb_detail.f_dyjtsl,
                f_dyjtsf: tbl_ld_jfb_detail.f_dyjtsf,
                f_dejtsl: tbl_ld_jfb_detail.f_dejtsl,
                f_dejtsf: tbl_ld_jfb_detail.f_dejtsf,
                f_dsjtsl: tbl_ld_jfb_detail.f_dsjtsl,
                f_dsjtsf: tbl_ld_jfb_detail.f_dsjtsf,
                //余额
                f_khyycje: tbl_ld_jfb_detail.f_khyycje,
                f_sfsyycje: tbl_ld_jfb_detail.f_sfsyycje,
                f_syycje: tbl_ld_jfb_detail.f_syycje,
                f_yhycje: tbl_ld_jfb_detail.f_yhycje,
                f_dszycje: tbl_ld_jfb_detail.f_dszycje,

                //疫情减免
                f_yqjmsf: tbl_ld_jfb_detail.f_yqjmsf,
                f_yqjmpwf: tbl_ld_jfb_detail.f_yqjmpwf,
                f_yqjmsfbfb: tbl_ld_jfb_detail.f_yqjmsfbfb,
                f_yqjmpwfbfb: tbl_ld_jfb_detail.f_yqjmpwfbfb,
                f_yqjmsfje: tbl_ld_jfb_detail.f_yqjmsfje,
                f_yqjmpwfje: tbl_ld_jfb_detail.f_yqjmpwfje
            };

            var data = {
                columns: columns,
                type: type,
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
    *  方法:addDetailData
    *  参数: callbackFunction
    *  新建数据
    */
        addDetailData = function (tbl_ld_jfb_detail, type, callBackFunction)
        {
            
            var d = new Date();

            var json = {


                f_value1: tbl_ld_jfb_detail.f_value1,

                f_value2: tbl_ld_jfb_detail.f_value2,

                f_value3: tbl_ld_jfb_detail.f_value3,

                f_value4: tbl_ld_jfb_detail.f_value4,

                f_value5: tbl_ld_jfb_detail.f_value5,

                f_value6: tbl_ld_jfb_detail.f_value6,

                f_value7: tbl_ld_jfb_detail.f_value7,

                f_value8: tbl_ld_jfb_detail.f_value8,

                f_value9: tbl_ld_jfb_detail.f_value9,

                f_value10: tbl_ld_jfb_detail.f_value10,


                f_jfbh: tbl_ld_jfb_detail.f_jfbh,

                f_sjbh: tbl_ld_jfb_detail.f_sjbh,

                f_jfrq: tbl_ld_jfb_detail.f_jfrq,

                f_jffs: tbl_ld_jfb_detail.f_jffs,
                f_jffsid: tbl_ld_jfb_detail.f_jffsid,


                f_jcfs: tbl_ld_jfb_detail.f_jcfs,
                f_jcfsid: tbl_ld_jfb_detail.f_jcfsid,





                f_yyy: tbl_ld_jfb_detail.f_yyy,

                f_yyyid: tbl_ld_jfb_detail.f_yyyid,




                f_czsj: tbl_ld_jfb_detail.f_czsj,

                f_sfykfp: tbl_ld_jfb_detail.f_sfykfp,

                f_zt: tbl_ld_jfb_detail.f_zt,
                f_ztid: tbl_ld_jfb_detail.f_ztid,

                f_bz: tbl_ld_jfb_detail.f_bz.formatStringRN(),

                f_khbh: tbl_ld_jfb_detail.f_khbh,

                f_khbhid: tbl_ld_jfb_detail.f_khbhid,

                f_yhbh: tbl_ld_jfb_detail.f_yhbh,

                f_yhbhid: tbl_ld_jfb_detail.f_yhbhid,

                f_yhm: tbl_ld_jfb_detail.f_yhm,

                f_jfm: tbl_ld_jfb_detail.f_jfm,

                f_dz: tbl_ld_jfb_detail.f_dz,

                f_dh: tbl_ld_jfb_detail.f_dh,

                f_dy: tbl_ld_jfb_detail.f_dy,

                f_dyid: tbl_ld_jfb_detail.f_dyid,

                f_sc: tbl_ld_jfb_detail.f_sc,

                f_scid: tbl_ld_jfb_detail.f_scid,

                f_qy: tbl_ld_jfb_detail.f_qy,

                f_qyid: tbl_ld_jfb_detail.f_qyid,


                f_pq: tbl_ld_jfb_detail.f_pq,

                f_pqid: tbl_ld_jfb_detail.f_pqid,

                f_sbbh: tbl_ld_jfb_detail.f_sbbh,

                f_sbbhid: tbl_ld_jfb_detail.f_sbbhid,

                f_yslx: tbl_ld_jfb_detail.f_yslx,

                f_yslxid: tbl_ld_jfb_detail.f_yslxid,

                f_lxtkhh: tbl_ld_jfb_detail.f_lxtkhh,

                f_sblx: tbl_ld_jfb_detail.f_sblx,

                f_sblxid: tbl_ld_jfb_detail.f_sblxid,

                f_rs: tbl_ld_jfb_detail.f_rs,

                f_cbbh: tbl_ld_jfb_detail.f_cbbh,

                f_cbbhid: tbl_ld_jfb_detail.f_cbbhid,


                f_znjbh: tbl_ld_jfb_detail.f_znjbh,

                f_znjbhid: tbl_ld_jfb_detail.f_znjbhid,

                f_znjje: tbl_ld_jfb_detail.f_znjje,

                f_fjbh: tbl_ld_jfb_detail.f_fjbh,

                f_fjbhid: tbl_ld_jfb_detail.f_fjbhid,

                f_fjje: tbl_ld_jfb_detail.f_fjje,

                f_sfjl: tbl_ld_jfb_detail.f_sfjl,


                sys_delflag: '0',
                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),
                sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
                sys_creatusername: basePageObj._userInfoJson.sys_username,
                sys_creatuserid: basePageObj._userInfoJson.sys_userid,


                //新增
                f_yyt: tbl_ld_jfb_detail.f_yyt,
                f_yytid: tbl_ld_jfb_detail.f_yytid,
                f_dj: tbl_ld_jfb_detail.f_dj,
                f_cbyslj: tbl_ld_jfb_detail.f_cbyslj,
                f_sllj: tbl_ld_jfb_detail.f_sllj,
                f_sflj: tbl_ld_jfb_detail.f_sflj,
                f_pwflj: tbl_ld_jfb_detail.f_pwflj,
                f_jmhyslj: tbl_ld_jfb_detail.f_jmhyslj,
                f_jmjelj: tbl_ld_jfb_detail.f_jmjelj,
                f_khytjjzsf: tbl_ld_jfb_detail.f_khytjjzsf,
                f_khytjjzpwf: tbl_ld_jfb_detail.f_khytjjzpwf,
                f_sfsytjjz: tbl_ld_jfb_detail.f_sfsytjjz,
                f_khyye: tbl_ld_jfb_detail.f_khyye,
                f_sfsyye: tbl_ld_jfb_detail.f_sfsyye,
                f_syye: tbl_ld_jfb_detail.f_syye,
                f_yhye: tbl_ld_jfb_detail.f_yhye,
                f_shys: tbl_ld_jfb_detail.f_shys,
                f_shss: tbl_ld_jfb_detail.f_shss,
                f_hszl: tbl_ld_jfb_detail.f_hszl,
                f_shssdx: tbl_ld_jfb_detail.f_shssdx,
                f_khfz: tbl_ld_jfb_detail.f_khfz,
                f_khfzid: tbl_ld_jfb_detail.f_khfzid,
                f_cbenbh: tbl_ld_jfb_detail.f_cbenbh,
                f_cbenbhid: tbl_ld_jfb_detail.f_cbenbhid,
                f_ljqf: tbl_ld_jfb_detail.f_ljqf,
                f_kplb: tbl_ld_jfb_detail.f_kplb,
                f_kplbid: tbl_ld_jfb_detail.f_kplbid,
                f_sytjjzsf: tbl_ld_jfb_detail.f_sytjjzsf,
                f_sytjjzpwf: tbl_ld_jfb_detail.f_sytjjzpwf,
                f_syhtjjzsf: tbl_ld_jfb_detail.f_syhtjjzsf,
                f_syhtjjzpwf: tbl_ld_jfb_detail.f_syhtjjzpwf,
                f_ly: tbl_ld_jfb_detail.f_ly,
                f_lyid: tbl_ld_jfb_detail.f_lyid,
                //阶梯水价
                f_dyjtsl: tbl_ld_jfb_detail.f_dyjtsl,
                f_dyjtsf: tbl_ld_jfb_detail.f_dyjtsf,
                f_dejtsl: tbl_ld_jfb_detail.f_dejtsl,
                f_dejtsf: tbl_ld_jfb_detail.f_dejtsf,
                f_dsjtsl: tbl_ld_jfb_detail.f_dsjtsl,
                f_dsjtsf: tbl_ld_jfb_detail.f_dsjtsf,
                //余额
                f_khyycje: tbl_ld_jfb_detail.f_khyycje,
                f_sfsyycje: tbl_ld_jfb_detail.f_sfsyycje,
                f_syycje: tbl_ld_jfb_detail.f_syycje,
                f_yhycje: tbl_ld_jfb_detail.f_yhycje,
                f_dszycje: tbl_ld_jfb_detail.f_dszycje,

                //疫情减免
                f_yqjmsf: tbl_ld_jfb_detail.f_yqjmsf,
                f_yqjmpwf: tbl_ld_jfb_detail.f_yqjmpwf,
                f_yqjmsfbfb: tbl_ld_jfb_detail.f_yqjmsfbfb,
                f_yqjmpwfbfb: tbl_ld_jfb_detail.f_yqjmpwfbfb,
                f_yqjmsfje: tbl_ld_jfb_detail.f_yqjmsfje,
                f_yqjmpwfje: tbl_ld_jfb_detail.f_yqjmpwfje

                
            };

            var data = {
                json: JSON.stringify(json),
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
            *  方法:f_jfrq_time_onchange
            *  参数:
            *  缴费日期 onchange事件
            */
        f_jfrq_time_onchange = function (e)
        {
            var r = e.currentTarget.id
        },

        /* 
            *  
            *  方法:f_jfrq_date_onchange
            *  参数:
            *  缴费日期 onchange事件
            */
        f_jfrq_date_onchange = function (ev)
        {
            var controlid = e.target.id
        },

        /* 
                *  
                *  方法:f_jffs_onchange
                *  参数:changeEventParameter
                *  缴费方式onchange事件
                */
        f_jffs_onchange = function (e)
        {
            var controlid = e.target.id;
        },

        /* 
                *  
                *  方法:f_jcfs_onchange
                *  参数:changeEventParameter
                *  缴存方式onchange事件
                */
        f_jcfs_onchange = function (e)
        {
            var controlid = e.target.id;
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
                *  方法:f_sfykfp_onchange
                *  参数:event, state
                *  是否已开发票切换事件
                */
        f_sfykfp_onchange = function (event, state)
        {
            var controlid = event.currentTarget.id;
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


        //新增
        /* 
         *  
         *  方法:f_kplb_onchange
         *  参数:changeEventParameter
         *  开票类型onchange事件
         */
        f_kplb_onchange = function (callBackFunction, e)
        {

            var kplb = controlObj.text('detail_f_kplb_tbl_ld_jfb_detail');
            var uid = basePageObj._userInfoJson.sys_userid;

            //判断 如果为专票，则收据编号显示88888888，并且锁定
            //普票或收据时  显示上次收据编号+1
            if (kplb == '07980002')
            {
                controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', '88888888');
                controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', true);
            }
            else
            {
                controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', false);
                var sqlStringsJson = {

                    "sjbh": 'select sjbh from (select t.f_sjbh as sjbh from tbl_ld_jfb t where sys_creatuserid=\'' + uid + '\' and t.f_sjbh <> \'88888888\' order by sys_lasteditdate desc) where rownum = 1 '
                };
                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        var sjbh = '';
                        if (resultJson["sjbh"].length > 0)
                        {
                            sjbh = resultJson["sjbh"][0].sjbh;
                        }

                        if (sjbh == null || sjbh == "" || !/^[0-9]+$/.test(sjbh))
                        {
                            controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', "00000001");
                        }
                        else
                        {
                            sjbh = (parseInt(sjbh) + 1).toString();
                            while (sjbh.length < 8)
                            {
                                sjbh = "0" + sjbh;
                            }
                            controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', sjbh);
                        }
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('querySqls<br/>' + message, 'fail');
                    }
                });
            }
            switch (kplb)
            {
                case '07980001':
                    controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'true');
                    break;
                case '07980002':
                    controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'true');
                    break;
                default:
                    controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'false');
                    break;
            }
        },
        /* 
        *  
        *  方法:f_sfsytjjz_onchange
        *  参数:event, state
        *   是否使用调价结转切换事件
        */
        f_sfsytjjz_onchange = function (event, state)
        {
            var controlid = event.currentTarget.id;
        },
        /* 
        *  
        *  方法:f_sfsyye_onchange
        *  参数:event, state
        *  是否使用绿化表押金切换事件
        */
        f_sfsyye_onchange = function (event, state)
        {
            var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail');
            if (ztid != '2')
            {
                //原绿化表押金
                var yycje = controlObj.text('detail_f_khyye_tbl_ld_jfb_detail');
                //使用绿化表押金
                var syycje = controlObj.text('detail_f_syye_tbl_ld_jfb_detail');
                //用后绿化表押金
                var yhycje = controlObj.text('detail_f_yhye_tbl_ld_jfb_detail');
                if (state)
                {
                    //改为使用 绿化表押金
                    //绿化表押金部分，默认使用绿化表押金
                    //2.判断是否存在绿化表押金
                    if (yycje != null && yycje !== "" && parseFloat(yycje) > 0)
                    {
                        //2.1存在绿化表押金情况
                        var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                        //2.2判断绿化表押金是否大于算后应收
                        if (parseFloat(yycje) > parseFloat(shys))
                        {
                            //2.2.1使用算后金额
                            var syycje = parseFloat(shys).toFixed(2);
                            controlObj.text('detail_f_syye_tbl_ld_jfb_detail', syycje);//使用绿化表押金
                            controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', (parseFloat(yycje) - parseFloat(syycje)).toFixed(2));//使用后绿化表押金
                            controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0'); //算后应收更新



                        }
                        else
                        {
                            //2.2.2使用绿化表押金
                            var syycje = parseFloat(yycje).toFixed(2);
                            controlObj.text('detail_f_syye_tbl_ld_jfb_detail', syycje);//使用绿化表押金
                            controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', '0');//使用后调价结转水费
                            controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(shys) - parseFloat(syycje)).toFixed(2)); //算后应收更新

                        }

                    }


                }
                else
                {
                    //改为不使用绿化表押金
                    //判断是否使用了绿化表押金
                    if (syycje != null && syycje !== "" && parseFloat(syycje) > 0)
                    {
                        var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(shys) + parseFloat(syycje)).toFixed(2)); //算后应收更新
                        controlObj.text('detail_f_syye_tbl_ld_jfb_detail', '0');//使用绿化表押金
                        controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', yycje);//使用后调价结转水费


                    }

                }
                //算后应收大写转中文
                var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                controlObj.text('detail_f_shss_tbl_ld_jfb_detail', shys);
                //controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', autoChinese(shys));
            }
        },

        /* 
*  
*  方法:f_sfsyycje_onchange
*  参数:event, state
*  是否使用余额切换事件
*/
        f_sfsyycje_onchange = function (event, state)
        {
            var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail');
            if (ztid != '2')
            {
                //原余额
                var yye = controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail');
                //使用余额
                var syye = controlObj.text('detail_f_syycje_tbl_ld_jfb_detail');
                //用后余额
                var yhye = controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail');
                //多收转余额
                var dszye = controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail');
                if (state)
                {
                    //改为使用 绿化表押金
                    //绿化表押金部分，默认使用绿化表押金
                    //2.判断是否存在余额
                    if (yye != null && yye !== "" && parseFloat(yye) > 0)
                    {
                        //2.1存在绿化表押金情况
                        var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                        //2.2判断绿化表押金是否大于算后应收
                        if (parseFloat(yye) > parseFloat(shys))
                        {
                            //2.2.1使用算后金额
                            var syye = parseFloat(shys).toFixed(2);
                            controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', syye);//使用余额
                            controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', (parseFloat(yye) - parseFloat(syye) + parseFloat(dszye)).toFixed(2));//使用后余额
                            controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0'); //算后应收更新



                        }
                        else
                        {
                            //2.2.2使用绿化表押金
                            var syye = parseFloat(yye).toFixed(2);
                            controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', syye);//使用余额
                            controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', parseFloat(dszye));//使用后余额
                            controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(shys) - parseFloat(syye)).toFixed(2)); //算后应收更新

                        }

                    }


                }
                else
                {
                    //改为不使用绿化表押金
                    //判断是否使用了绿化表押金
                    if (syye != null && syye !== "" && parseFloat(syye) > 0)
                    {
                        var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(shys) + parseFloat(syye)).toFixed(2)); //算后应收更新
                        controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', '0');//使用余额
                        controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', yye);//使用后余额


                    }


                }
                //算后应收大写转中文
                var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                controlObj.text('detail_f_shss_tbl_ld_jfb_detail', shys);
                that.btn_command_receipt_onclick();
            //controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', autoChinese(shys));
            }
            

        },

        //金额小写转大写
        autoChinese = function (numberValue)
        {

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

        quickSearch = function ()
        {

            clearJs();

            var khbh = controlObj.text('detail_f_khbh_tbl_ld_jfb_detail');

            if (khbh != null && khbh != "")
            {
                while (khbh.length < 10)
                {
                    khbh = "0" + khbh;
                }

                //获取客户信息
                var sqlStringsJson = {
                    "tbl_ld_khb": "select * from TBL_LD_KHB where sys_delflag='0' and f_ztid in('0','4','2') and f_khbh='" + khbh + "' and f_cbbh not like 'YC%'"
                };
                try
                {
                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {
                            if (resultJson["tbl_ld_khb"].length == 1)
                            {

                                resultJson = resultJson["tbl_ld_khb"][0];

                                controlObj.text('detail_f_khbh_tbl_ld_jfb_detail', resultJson["f_khbh"]);

                                controlObj.text('detail_f_yhbh_tbl_ld_jfb_detail', resultJson["f_yhbh"]);

                                controlObj.text('detail_f_sbbh_tbl_ld_jfb_detail', resultJson["f_sbbh"]);

                                controlObj.text('detail_f_yhfzid_tbl_ld_khb_detail', resultJson["f_yhfzid"]);

                                controlObj.text('detail_f_jfm_tbl_ld_jfb_detail', resultJson["f_jfm"]);

                                controlObj.text('detail_f_yhm_tbl_ld_jfb_detail', resultJson["f_yhm"]);

                                controlObj.text('detail_f_dh_tbl_ld_jfb_detail', resultJson["f_dh"]);

                                controlObj.text('detail_f_dz_tbl_ld_jfb_detail', resultJson["f_dz"]);

                                controlObj.text('detail_f_yslx_tbl_ld_jfb_detail', resultJson["f_yslx"]);

                                controlObj.text('detail_f_sblx_tbl_ld_jfb_detail', resultJson["f_sblx"]);


                                controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail', resultJson["sys_id"]);

                                controlObj.text('detail_f_yhbhid_tbl_ld_jfb_detail', resultJson["f_yhbhid"]);

                                controlObj.text('detail_f_dy_tbl_ld_jfb_detail', resultJson["f_dy"]);

                                controlObj.text('detail_f_dyid_tbl_ld_jfb_detail', resultJson["f_dyid"]);

                                controlObj.text('detail_f_sc_tbl_ld_jfb_detail', resultJson["f_sc"]);

                                controlObj.text('detail_f_scid_tbl_ld_jfb_detail', resultJson["f_scid"]);

                                controlObj.text('detail_f_qy_tbl_ld_jfb_detail', resultJson["f_qy"]);

                                controlObj.text('detail_f_qyid_tbl_ld_jfb_detail', resultJson["f_qyid"]);

                                controlObj.text('detail_f_pq_tbl_ld_jfb_detail', resultJson["f_pq"]);

                                controlObj.text('detail_f_pqid_tbl_ld_jfb_detail', resultJson["f_pqid"]);


                                controlObj.text('detail_f_sbbhid_tbl_ld_jfb_detail', resultJson["f_sbbhid"]);

                                controlObj.text('detail_f_yslxid_tbl_ld_jfb_detail', resultJson["f_yslxid"]);

                                controlObj.text('detail_f_lxtkhh_tbl_ld_jfb_detail', resultJson["f_lxtkhh"]);

                                controlObj.text('detail_f_sblxid_tbl_ld_jfb_detail', resultJson["f_sblxid"]);

                                controlObj.text('detail_f_rs_tbl_ld_jfb_detail', resultJson["f_rs"]);

                                controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail', resultJson["f_tjjzsf"]);
                                controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail', resultJson["f_tjjzpwf"]);
                                controlObj.text('detail_f_khyye_tbl_ld_jfb_detail', resultJson["f_ycje"]);
                                controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail', resultJson["f_ljqf"]);
                                controlObj.text('detail_f_khfz_tbl_ld_jfb_detail', resultJson["f_khfz"]);
                                controlObj.text('detail_f_khfzid_tbl_ld_jfb_detail', resultJson["f_khfzid"]);
                                controlObj.text('detail_f_cbenbh_tbl_ld_jfb_detail', resultJson["f_cbbh"]);
                                controlObj.text('detail_f_cbenbhid_tbl_ld_jfb_detail', resultJson["f_cbbhid"]);

                                controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_jfb_detail', resultJson["f_yqjmsf"]);
                                controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_jfb_detail', resultJson["f_yqjmpwf"]);

                                //余额
                                if (resultJson["f_ye"] != null && resultJson["f_ye"] != "")
                                {
                                    controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', resultJson["f_ye"]);
                                }
                                else
                                {
                                    controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', "0");
                                }
                                

                                if (resultJson["f_value4"] != null && resultJson["f_value4"] != "")
                                {
                                    controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_jfb_detail', resultJson["f_value4"]);//缴费方式

                                }

                                if (resultJson["f_value3"] != null && resultJson["f_value3"] != "")
                                {

                                    controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_jfb_detail', resultJson["f_value3"]);//开票类型

                                    var kplb = resultJson["f_value3"];
                                    var uid = basePageObj._userInfoJson.sys_userid;

                                    //判断 如果为专票，则收据编号显示88888888，并且锁定
                                    //普票或收据时  显示上次收据编号+1
                                    if (kplb == '07980002')
                                    {
                                        controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', '88888888');
                                        controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', true);
                                    }
                                    else
                                    {
                                        controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', false);
                                        var sqlStringsJson = {

                                            "sjbh": 'select sjbh from (select t.f_sjbh as sjbh from tbl_ld_jfb t where sys_creatuserid=\'' + uid + '\' and t.f_sjbh <> \'88888888\' order by sys_lasteditdate desc) where rownum = 1 '
                                        };
                                        commonObj.querySqls(sqlStringsJson, {
                                            success: function (resultJson)
                                            {
                                                var sjbh = '';
                                                if (resultJson["sjbh"].length > 0)
                                                {
                                                    sjbh = resultJson["sjbh"][0].sjbh;
                                                }

                                                if (sjbh == null || sjbh == "" || !/^[0-9]+$/.test(sjbh))
                                                {
                                                    controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', "00000001");
                                                }
                                                else
                                                {
                                                    sjbh = (parseInt(sjbh) + 1).toString();
                                                    while (sjbh.length < 8)
                                                    {
                                                        sjbh = "0" + sjbh;
                                                    }
                                                    controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', sjbh);
                                                }
                                            },
                                            fail: function (message)
                                            {
                                                _blockMessage.show('querySqls<br/>' + message, 'fail');
                                            }
                                        });
                                    }
                                    switch (kplb)
                                    {
                                        case '07980001':
                                            controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'true');
                                            break;
                                        case '07980002':
                                            controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'true');
                                            break;
                                        default:
                                            controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'false');
                                            break;
                                    }

                                }


                                controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail', '');
                                controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail', '');
                                //清空
                                tbl_ld_cbiao_list_Obj._pr_set_jfrq = controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time'),

                                    tbl_ld_cbiao_list_Obj._pr_set_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail');
                                tbl_ld_cbiao_list_Obj._pr_set_cbhhids = '';
                                tbl_ld_cbiao_list_Obj._pr_set_cbhhs = '';
                                tbl_ld_cbiao_list_Obj._pr_set_bqsl = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_sf = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_pwf = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_bqje = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_jmje = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_dyjtsl = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_dyjtsf = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_dejtsl = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_dejtsf = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_dsjtsl = 0;
                                tbl_ld_cbiao_list_Obj._pr_set_dsjtsf = 0;


                                tbl_ld_cbiao_list_Obj._pr_set_sfjl = '';



                                        tbl_ld_cbiao_list_Obj.bindGrid({
                                            success: function ()
                                            {

                                                var f_khbh = resultJson["f_khbh"];
                                                var querysql = {
                                                    "tbl_ld_jfb": "select count(*) count from TBL_LD_JFB  where f_lyid='08080002' and f_ztid='0' and f_khbh='" + f_khbh + "'"
                                                };
                                                commonObj.querySqls(querysql, {
                                                    success: function (count)
                                                    {
                                                        controlObj.text('detail_f_shss_tbl_ld_jfb_detail', '0');
                                                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0');
                                                        controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', '0');
                                                        controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', '');
                                                        var k = count["tbl_ld_jfb"][0];
                                                        if (k["count"] > 0)
                                                        {
                                                            $("#div_detail_f_jhts_tbl_ld_jfb_detail").removeClass("hidden");
                                                        }
                                                    }
                                                });


                                            },
                                            fail: function (message)
                                            {
                                                _alertMessage.show('获取抄表信息失败<br/>', 'fail');
                                            }
                                        });







                            } else
                            {
                                _alertMessage.show('获取客户信息不存在，请使用选择工具<br/>', 'fail');
                            }

                        },
                        fail: function ()
                        {
                            _alertMessage.show('输入了不正确的客户编号<br/>', 'fail');
                        }
                    });
                }
                catch (ex)
                {
                    _alertMessage.show('输入了不正确的客户编号<br/>', 'fail');
                }

            }
            else
            {
                _alertMessage.show('必须输入客户编号', 'fail');
            }

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
                                                        /* 增加回车快速选择客户功能 */
                                                        $('#detail_f_khbh_tbl_ld_jfb_detail').bind('keyup', function (event)
                                                        {
                                                            if (event.keyCode == '13')
                                                            {
                                                                quickSearch();
                                                            }

                                                        });

                                                        _validateMessage_save = new validateMessage('btn_command_save_tbl_ld_jfb_detail');
                                                        _validateMessage_printsubmit0 = new validateMessage('btn_command_printsubmit0_tbl_ld_jfb_detail');
                                                        _validateMessage_printsubmit1 = new validateMessage('btn_command_printsubmit1_tbl_ld_jfb_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_jfb_detail');
                                                        _ladda_btn_command_printsubmit0 = Ladda.create('btn_command_printsubmit0_tbl_ld_jfb_detail');
                                                        _ladda_btn_command_printsubmit1 = Ladda.create('btn_command_printsubmit1_tbl_ld_jfb_detail');
                                                        //_ladda_btn_command_rollback = Ladda.create('btn_command_rollback_tbl_ld_jfb_detail');

                                                        setDisable();
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
            ////;
            if (that._pr_pagetype == '0')
            {
                setModelDirect({
                    success: function ()
                    {

                        callBackFunction.success();
                    }
                });
            }
            else
            {
                try
                {
                    getData({
                        success: function (tbl_ld_jfb_detail)
                        {
                            setModel(tbl_ld_jfb_detail, {
                                success: function ()
                                {

                                    //设置缴费日期，作为查询抄表运行库还是历史库的条件
                                    tbl_ld_cbiao_list_Obj._pr_set_jfrq = tbl_ld_jfb_detail.f_jfrq;

                                    tbl_ld_cbiao_list_Obj._pr_set_khbhid = tbl_ld_jfb_detail.f_khbhid;
                                    tbl_ld_cbiao_list_Obj._pr_set_cbhhids = tbl_ld_jfb_detail.f_cbbhid;
                                    tbl_ld_cbiao_list_Obj._pr_set_sfjl = tbl_ld_jfb_detail.f_sfjl;
                                    tbl_ld_cbiao_list_Obj._pr_set_cbhhs = tbl_ld_jfb_detail.f_cbbh;

                                    if (tbl_ld_jfb_detail.f_sllj == '')
                                    {
                                        tbl_ld_jfb_detail.f_sllj = 0;
                                    }
                                    tbl_ld_cbiao_list_Obj._pr_set_bqsl = Number(tbl_ld_jfb_detail.f_sllj);
                                    if (tbl_ld_jfb_detail.f_sflj == '')
                                    {
                                        tbl_ld_jfb_detail.f_sflj = 0;
                                    }
                                    tbl_ld_cbiao_list_Obj._pr_set_sf = Number(tbl_ld_jfb_detail.f_sflj);
                                    if (tbl_ld_jfb_detail.f_pwflj == '')
                                    {
                                        tbl_ld_jfb_detail.f_pwflj = 0;
                                    }
                                    tbl_ld_cbiao_list_Obj._pr_set_pwf = Number(tbl_ld_jfb_detail.f_pwflj);
                                    if (tbl_ld_jfb_detail.f_cbyslj == '')
                                    {
                                        tbl_ld_jfb_detail.f_cbyslj = 0;
                                    }
                                    tbl_ld_cbiao_list_Obj._pr_set_bqje = Number(tbl_ld_jfb_detail.f_cbyslj);
                                    if (tbl_ld_jfb_detail.f_jmjelj == '')
                                    {
                                        tbl_ld_jfb_detail.f_jmjelj = 0;
                                    }
                                    tbl_ld_cbiao_list_Obj._pr_set_jmje = Number(tbl_ld_jfb_detail.f_jmjelj);



                                    tbl_ld_cbiao_list_Obj.bindGrid({
                                        success: function ()
                                        {

                                            callBackFunction.success();

                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('抄表失败', 'fail');
                                        }
                                    });

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

        saveData: function (tbl_ld_jfb_detail, type, callBackFunction)
        {

            if (that._pr_sys_id == '' || that._pr_sys_id == null)
            {
                addDetailData(tbl_ld_jfb_detail, type, {
                    success: function (result)
                    {
                        that._pr_sys_id = result;

                        callBackFunction.success('新建成功', result);


                    }, fail: function (message)
                    {
                        callBackFunction.fail('新建失败', message);
                    }
                });
            }
            else
            {
                updateData(tbl_ld_jfb_detail, type, {
                    success: function ()
                    {
                        callBackFunction.success('更新成功', '');

                    },
                    fail: function (message)
                    {

                        callBackFunction.fail('更新失败', message);
                    }
                });
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
            _ladda_btn_command_save.start();

            getModel({
                success: function (tbl_ld_jfb_detail)
                {
                    checkModel_save(tbl_ld_jfb_detail, _validateMessage_save, {
                        success: function (tbl_ld_jfb_detail)
                        {
                            that.saveData(tbl_ld_jfb_detail, "pt", {
                                success: function (name, message)
                                {
                                    _ladda_btn_command_save.stop();
                                    _alertMessage.show(name, 'success');


                                }, fail: function (name, message)
                                {
                                    _ladda_btn_command_save.stop();
                                    _alertMessage.show(name, 'fail');
                                    if (message != '')
                                    {
                                        _resultMessage.show(message);
                                    }
                                }
                            });

                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_save.stop();
                            _alertMessage.show('校验失败', 'fail');
                            if (message != '')
                            {
                                _resultMessage.show(message);
                            }
                        }
                    });
                },
                fail: function (message)
                {
                    _ladda_btn_command_save.stop();
                    _alertMessage.show('数据获取失败', 'fail');
                    _resultMessage.show(message);
                }
            });


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

        btn_print_modal_cancle_onclick: function ()
        {
            $('#div_print_modal_tbl_ld_jfb_detail').modal('hide');
        },


        //选择客户用的
        btn_command_opensearch_onclick: function ()
        {


            var khbh = controlObj.text('detail_f_khbh_tbl_ld_jfb_detail');

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
            $('#div_search_modal_tbl_ld_jfb_detail').modal('show');

        },

        btn_search_modal_search_onclick: function ()
        {

            clearJs();
            //$('#div_search_modal_tbl_ld_jfb_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                var khbh = idArray[0];

                //获取客户信息
                var sqlStringsJson = {
                    "tbl_ld_khb": "select * from TBL_LD_KHB where sys_delflag='0' and f_ztid in('0','4','2') and SYS_ID='" + khbh + "' and f_cbbh not like 'YC%'"
                };

                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        if (resultJson["tbl_ld_khb"].length > 0)
                        {

                            resultJson = resultJson["tbl_ld_khb"][0];

                            controlObj.text('detail_f_khbh_tbl_ld_jfb_detail', resultJson["f_khbh"]);

                            controlObj.text('detail_f_yhbh_tbl_ld_jfb_detail', resultJson["f_yhbh"]);

                            controlObj.text('detail_f_sbbh_tbl_ld_jfb_detail', resultJson["f_sbbh"]);

                            controlObj.text('detail_f_yhfzid_tbl_ld_khb_detail', resultJson["f_yhfzid"]);

                            controlObj.text('detail_f_jfm_tbl_ld_jfb_detail', resultJson["f_jfm"]);

                            controlObj.text('detail_f_yhm_tbl_ld_jfb_detail', resultJson["f_yhm"]);

                            controlObj.text('detail_f_dh_tbl_ld_jfb_detail', resultJson["f_dh"]);

                            controlObj.text('detail_f_dz_tbl_ld_jfb_detail', resultJson["f_dz"]);

                            controlObj.text('detail_f_yslx_tbl_ld_jfb_detail', resultJson["f_yslx"]);

                            controlObj.text('detail_f_sblx_tbl_ld_jfb_detail', resultJson["f_sblx"]);


                            controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail', resultJson["sys_id"]);

                            controlObj.text('detail_f_yhbhid_tbl_ld_jfb_detail', resultJson["f_yhbhid"]);

                            controlObj.text('detail_f_dy_tbl_ld_jfb_detail', resultJson["f_dy"]);

                            controlObj.text('detail_f_dyid_tbl_ld_jfb_detail', resultJson["f_dyid"]);

                            controlObj.text('detail_f_sc_tbl_ld_jfb_detail', resultJson["f_sc"]);

                            controlObj.text('detail_f_scid_tbl_ld_jfb_detail', resultJson["f_scid"]);

                            controlObj.text('detail_f_qy_tbl_ld_jfb_detail', resultJson["f_qy"]);

                            controlObj.text('detail_f_qyid_tbl_ld_jfb_detail', resultJson["f_qyid"]);

                            controlObj.text('detail_f_pq_tbl_ld_jfb_detail', resultJson["f_pq"]);

                            controlObj.text('detail_f_pqid_tbl_ld_jfb_detail', resultJson["f_pqid"]);


                            controlObj.text('detail_f_sbbhid_tbl_ld_jfb_detail', resultJson["f_sbbhid"]);

                            controlObj.text('detail_f_yslxid_tbl_ld_jfb_detail', resultJson["f_yslxid"]);

                            controlObj.text('detail_f_lxtkhh_tbl_ld_jfb_detail', resultJson["f_lxtkhh"]);

                            controlObj.text('detail_f_sblxid_tbl_ld_jfb_detail', resultJson["f_sblxid"]);

                            controlObj.text('detail_f_rs_tbl_ld_jfb_detail', resultJson["f_rs"]);

                            controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail', resultJson["f_tjjzsf"]);
                            controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail', resultJson["f_tjjzpwf"]);
                            controlObj.text('detail_f_khyye_tbl_ld_jfb_detail', resultJson["f_ycje"]);
                            controlObj.text('detail_f_ljqf_tbl_ld_jfb_detail', resultJson["f_ljqf"]);
                            controlObj.text('detail_f_khfz_tbl_ld_jfb_detail', resultJson["f_khfz"]);
                            controlObj.text('detail_f_khfzid_tbl_ld_jfb_detail', resultJson["f_khfzid"]);
                            controlObj.text('detail_f_cbenbh_tbl_ld_jfb_detail', resultJson["f_cbbh"]);
                            controlObj.text('detail_f_cbenbhid_tbl_ld_jfb_detail', resultJson["f_cbbhid"]);

                            controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_jfb_detail', resultJson["f_yqjmsf"]);
                            controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_jfb_detail', resultJson["f_yqjmpwf"]);

                            //余额
                            if (resultJson["f_ye"] != null && resultJson["f_ye"] != "")
                            {
                                controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', resultJson["f_ye"]);
                            }
                            else
                            {
                                controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail', "0");
                            }
                            

                            if (resultJson["f_value4"] != null && resultJson["f_value4"] != "")
                            {
                                controlObj.singledropdownlistid('detail_f_jffs_tbl_ld_jfb_detail', resultJson["f_value4"]);//缴费方式

                            }

                            if (resultJson["f_value3"] != null && resultJson["f_value3"] != "")
                            {

                                controlObj.singledropdownlistid('detail_f_kplb_tbl_ld_jfb_detail', resultJson["f_value3"]);//开票类型

                                var kplb = resultJson["f_value3"];
                                var uid = basePageObj._userInfoJson.sys_userid;

                                //判断 如果为专票，则收据编号显示88888888，并且锁定
                                //普票或收据时  显示上次收据编号+1
                                if (kplb == '07980002')
                                {
                                    controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', '88888888');
                                    controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', true);
                                }
                                else
                                {
                                    controlObj.textdisable('detail_f_sjbh_tbl_ld_jfb_detail', false);
                                    var sqlStringsJson = {

                                        "sjbh": 'select sjbh from (select t.f_sjbh as sjbh from tbl_ld_jfb t where sys_creatuserid=\'' + uid + '\' and t.f_sjbh <> \'88888888\' order by sys_lasteditdate desc) where rownum = 1 '
                                    };
                                    commonObj.querySqls(sqlStringsJson, {
                                        success: function (resultJson)
                                        {
                                            var sjbh = '';
                                            if (resultJson["sjbh"].length > 0)
                                            {
                                                sjbh = resultJson["sjbh"][0].sjbh;
                                            }

                                            if (sjbh == null || sjbh == "" || !/^[0-9]+$/.test(sjbh))
                                            {
                                                controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', "00000001");
                                            }
                                            else
                                            {
                                                sjbh = (parseInt(sjbh) + 1).toString();
                                                while (sjbh.length < 8)
                                                {
                                                    sjbh = "0" + sjbh;
                                                }
                                                controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail', sjbh);
                                            }
                                        },
                                        fail: function (message)
                                        {
                                            _blockMessage.show('querySqls<br/>' + message, 'fail');
                                        }
                                    });
                                }
                                switch (kplb)
                                {
                                    case '07980001':
                                        controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'true');
                                        break;
                                    case '07980002':
                                        controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'true');
                                        break;
                                    default:
                                        controlObj.toggle('detail_f_sfykfp_tbl_ld_jfb_detail', 'false');
                                        break;
                                }

                            }


                            controlObj.text('detail_f_cbbh_tbl_ld_jfb_detail', '');
                            controlObj.text('detail_f_cbbhid_tbl_ld_jfb_detail', '');
                            //清空
                            tbl_ld_cbiao_list_Obj._pr_set_jfrq = controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time'),

                                tbl_ld_cbiao_list_Obj._pr_set_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_jfb_detail');
                            tbl_ld_cbiao_list_Obj._pr_set_cbhhids = '';
                            tbl_ld_cbiao_list_Obj._pr_set_cbhhs = '';
                            tbl_ld_cbiao_list_Obj._pr_set_bqsl = 0;
                            tbl_ld_cbiao_list_Obj._pr_set_sf = 0;
                            tbl_ld_cbiao_list_Obj._pr_set_pwf = 0;
                            tbl_ld_cbiao_list_Obj._pr_set_bqje = 0;
                            tbl_ld_cbiao_list_Obj._pr_set_jmje = 0;
                            tbl_ld_cbiao_list_Obj._pr_set_sfjl = '';


                            tbl_ld_cbiao_list_Obj.destorygGrid({
                                success: function ()
                                {

                                    tbl_ld_cbiao_list_Obj.bindGrid({
                                        success: function ()
                                        {
                                            $('#div_search_modal_tbl_ld_jfb_detail').modal('hide');

                                            var f_khbh = resultJson["f_khbh"];
                                            var querysql = {
                                                "tbl_ld_jfb": "select count(*) count from TBL_LD_JFB  where f_lyid='08080002' and f_ztid='0' and f_khbh='" + f_khbh + "'"
                                            };
                                            commonObj.querySqls(querysql, {
                                                success: function (count)
                                                {
                                                    var k = count["tbl_ld_jfb"][0];
                                                    if (k["count"] > 0)
                                                    {
                                                        $("#div_detail_f_jhts_tbl_ld_jfb_detail").removeClass("hidden");
                                                    }
                                                }
                                            });

                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('获取抄表信息失败<br/>', 'fail');
                                        }
                                    });


                                },
                                fail: function (message)
                                {
                                    _alertMessage.show('重载抄表表失败<br/>', 'fail');
                                }
                            });





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
            $('#div_search_modal_tbl_ld_jfb_detail').modal('hide')
        },



        ////计算应收btn_command_receivable_onclick
        btn_command_receivable_onclick: function ()
        {

            controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_hszl_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_shss_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_shys_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_syye_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_yhye_tbl_ld_jfb_detail', '0');
            controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail', 'false');
            controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', 'false');
            //余额
            
            controlObj.text('detail_f_syycje_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail', '0');
            controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail', '0');
            controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', 'false');


            var sf = controlObj.text('detail_f_sflj_tbl_ld_jfb_detail');//水费累积
            var pwf = controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail');//污水处理费累积

            var jmhys = controlObj.text('detail_f_jmhyslj_tbl_ld_jfb_detail');//减免后应收

            //1.判断是否可以调价
            var tjsf = controlObj.text('detail_f_khytjjzsf_tbl_ld_jfb_detail'); //客户原调价水费
            var tjpwf = controlObj.text('detail_f_khytjjzpwf_tbl_ld_jfb_detail'); //客户原调价污水处理费
            var jmjelj = controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail'); //减免金额累计
            var sytjsf = 0;//使用调价水费
            var sytjpwf = 0; //使用调价污水处理费
            if (tjsf != null && tjsf !== "" && parseFloat(tjsf) > 0 && (jmjelj == null || jmjelj == "" || parseFloat(jmjelj) == 0))
            {
                //1.1存在调价水费
                controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', 'true');
                if (parseFloat(tjsf) > parseFloat(sf))
                {
                    //1.1.1调价水费比水费多使用水费
                    sytjsf = parseFloat(sf).toFixed(2);
                    controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', sytjsf);//使用调价水费
                    controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', (parseFloat(tjsf) - parseFloat(sytjsf)).toFixed(2));//使用后调价结转水费
                    jmhys = (parseFloat(jmhys) - parseFloat(sytjsf)).toFixed(2)
                }
                else
                {
                    //1.1.2调价水费比水费少使用调价水费
                    sytjsf = parseFloat(tjsf).toFixed(2);
                    controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail', sytjsf);//使用调价水费
                    controlObj.text('detail_f_syhtjjzsf_tbl_ld_jfb_detail', '0');//使用后调价结转水费
                    jmhys = (parseFloat(jmhys) - parseFloat(sytjsf)).toFixed(2)
                }

            }
            if (tjpwf != null && tjpwf !== "" && parseFloat(tjpwf) > 0 && (jmjelj == null || jmjelj == "" || parseFloat(jmjelj) == 0))
            {
                //1.2存在调价污水处理费
                controlObj.toggle('detail_f_sfsytjjz_tbl_ld_jfb_detail', 'true');
                if (parseFloat(tjpwf) > parseFloat(pwf))
                {
                    //1.2.1调价污水处理费比污水处理费费多使用污水处理费费
                    sytjpwf = parseFloat(pwf).toFixed(2);
                    controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', sytjpwf);//使用调价污水处理费
                    controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', (parseFloat(tjpwf) - parseFloat(sytjpwf)).toFixed(2));//使用后调价结转污水处理费
                    jmhys = (parseFloat(jmhys) - parseFloat(sytjpwf)).toFixed(2)
                }
                else
                {
                    //1.2.2调价水费比水费少使用调价水费
                    sytjpwf = parseFloat(tjpwf).toFixed(2);
                    controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail', sytjpwf);//使用调价水费
                    controlObj.text('detail_f_syhtjjzpwf_tbl_ld_jfb_detail', '0');//使用后调价结转水费
                    jmhys = (parseFloat(jmhys) - parseFloat(sytjpwf)).toFixed(2)
                }
            }
            //回刷算后应收
            controlObj.text('detail_f_shys_tbl_ld_jfb_detail', jmhys);//算后应收
            //绿化表押金部分，默认使用绿化表押金
            //2.判断是否存在绿化表押金
            var ycje = controlObj.text('detail_f_khyye_tbl_ld_jfb_detail'); //绿化表押金
            if (ycje != null && ycje !== "" && parseFloat(ycje) > 0 && parseFloat(jmhys) > 0)
            {
                //2.1存在绿化表押金情况
                //打开绿化表押金开关


                controlObj.toggle('detail_f_sfsyye_tbl_ld_jfb_detail', 'true');


            }

            //3.判断是否存在余额
            var ye = controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail'); //余额
            if (ye != null && ye !== "" && parseFloat(ye) > 0 && parseFloat(jmhys) > 0)
            {
                //3.1存在余额打开开关
                


                controlObj.toggle('detail_f_sfsyycje_tbl_ld_jfb_detail', 'true');


            }
            //算后应收大写转中文
            var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
            controlObj.text('detail_f_shss_tbl_ld_jfb_detail', shys);

            var shssdx = autoChinese(shys);
            shssdx = shssdx.replaceAll("点零零", "圆整");
            controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', shssdx);

        },

        //算后实收
        btn_command_receipt_onclick: function ()
        {

            var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
            var shss = controlObj.text('detail_f_shss_tbl_ld_jfb_detail'); //算后实收
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

                var yye = controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail');//客户原余额
                var syye = controlObj.text('detail_f_syycje_tbl_ld_jfb_detail');//使用余额
                var dszye = (parseFloat(shss) - parseFloat(shys)).toFixed(2); //多收转余额
                //多收转余额
                controlObj.text("detail_f_dszycje_tbl_ld_jfb_detail", dszye);
                //用后余额
                controlObj.text("detail_f_yhycje_tbl_ld_jfb_detail", (parseFloat(yye) - parseFloat(syye) + parseFloat(dszye)).toFixed(2));
                //算后实收大写
                controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail', autoChinese(shss));



                //var num = new Number((parseFloat(shss) - parseFloat(shys)).toFixed(2));
                //var res = num.toLocaleString();
                //res = res.replaceAll(",", "");
                //controlObj.text("detail_f_hszl_tbl_ld_jfb_detail", res);
            }
        },
        //NumToChinese方法实现数字转中文


        //提交并打印按钮0事件
        btn_command_printsubmit0_onclick: function ()
        {

            try
            {
                if (checkSllj())
                {
                    if ($('#div_detail_f_jhts_tbl_ld_jfb_detail').hasClass('hidden'))
                    {
                        var confirmContent = '<blockquote> ';
                        confirmContent += '<h3>将对当前的页面进行<a style="color:red">提交</a>操作</h3>';
                        confirmContent += '<br/>';
                        confirmContent += '<h5>提交后的数据将不能修改</h5>';
                        confirmContent += '<h5>请确定执行此操作</h5>';
                        confirmContent += '</blockquote> ';

                        _confirmMessage.destory();
                        _confirmMessage.show('提交确认？', confirmContent,
                            {
                                confirm: function ()
                                {

                                    _ladda_btn_command_printsubmit0.start();



                                    getModel({
                                        success: function (tbl_ld_jfb_detail)
                                        {
                                            checkModel_save(tbl_ld_jfb_detail, _validateMessage_printsubmit0, {
                                                success: function (tbl_ld_jfb_detail)
                                                {

                                                    checkModel_printsubmit0(tbl_ld_jfb_detail, _validateMessage_printsubmit0, {
                                                        success: function (tbl_ld_jfb_detail)
                                                        {

                                                            tbl_ld_jfb_detail.f_zt = "已提交";
                                                            tbl_ld_jfb_detail.f_ztid = "2";
                                                            that.saveData(tbl_ld_jfb_detail, "jf", {
                                                                success: function (name, message)
                                                                {

                                                                    that.btn_command_print_onclick("1", {
                                                                        success: function ()
                                                                        {
                                                                            that._pr_sys_id = '';
                                                                            clearModel();

                                                                            tbl_ld_cbiao_list_Obj.destorygGrid({
                                                                                success: function ()
                                                                                {
                                                                                    setModelDirect({
                                                                                        success: function ()
                                                                                        {
                                                                                            setDisable();
                                                                                            _ladda_btn_command_printsubmit0.stop();
                                                                                            _alertMessage.show('提交成功', 'success');
                                                                                        }
                                                                                    });


                                                                                },
                                                                                fail: function (message)
                                                                                {
                                                                                    _alertMessage.show('重载失败<br/>', 'fail');
                                                                                }
                                                                            });

                                                                           
                                                                        }
                                                                    });

                                                                },
                                                                fail: function (name, message)
                                                                {
                                                                    _ladda_btn_command_printsubmit0.stop();
                                                                    _alertMessage.show('提交失败', 'fail');
                                                                    if (message != '')
                                                                    {
                                                                        _resultMessage.show(message);
                                                                    }
                                                                }
                                                            });
                                                        },
                                                        fail: function (message)
                                                        {
                                                            _ladda_btn_command_printsubmit0.stop();
                                                            _alertMessage.show('校验失败', 'fail');
                                                            if (message != '')
                                                            {
                                                                _resultMessage.show(message);
                                                            }
                                                        }
                                                    });


                                                },
                                                fail: function (message)
                                                {
                                                    _ladda_btn_command_printsubmit0.stop();
                                                    _alertMessage.show('校验失败', 'fail');
                                                    if (message != '')
                                                    {
                                                        _resultMessage.show(message);
                                                    }
                                                }
                                            });
                                        },
                                        fail: function (message)
                                        {
                                            _ladda_btn_command_printsubmit0.stop();
                                            _alertMessage.show('数据获取失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });





                                },
                                cancle: function ()
                                {
                                    _ladda_btn_command_printsubmit0.stop();
                                }
                            });
                    }
                    else
                    {
                        _alertMessage.show('已在建行托收的客户无法在营业厅缴费。', 'fail');
                    }
                }
                else
                {
                    _alertMessage.show('选中的本期水量累加和与累计水量不符，请刷新后重新操作。', 'fail');
                }
            }
            catch (ex)
            {
                _alertMessage.show('保存程序异常。', 'fail');
                _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
            }
        },

        //前台缴费重载按钮事件
        btn_command_reload_onclick: function ()
        {
            try
            {
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对当前的页面进行<a style="color:red">重载</a>操作</h3>';
                confirmContent += '<br/>';
                confirmContent += '<h5>重载后的页面将丢失当前全部设置</h5>';
                confirmContent += '<h5>请确定执行此操作</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('重载确认？', confirmContent, {
                    confirm: function ()
                    {
                        controlObj.textdisable('detail_f_khbh_tbl_ld_jfb_detail', true);
                        clearModel();

                        tbl_ld_cbiao_list_Obj.destorygGrid({
                            success: function ()
                            {
                                setModelDirect({
                                    success: function ()
                                    {
                                        setDisable();
                                    }
                                });


                            },
                            fail: function (message)
                            {
                                _alertMessage.show('获取抄表信息失败<br/>', 'fail');
                            }
                        });

                    },
                    cancle: function ()
                    {
                    }
                });
            } catch (ex)
            {
            }
        },

        //提交并打印按钮1事件        
        btn_command_printsubmit1_onclick: function ()
        {
            if (checkSllj())
            {
                _ladda_btn_command_printsubmit1.start();
                if ($('#div_detail_f_jhts_tbl_ld_jfb_detail').hasClass('hidden'))
                {
                    try
                    {
                        var confirmContent = '<blockquote> ';
                        confirmContent += '<h3>将对当前的页面进行<a style="color:red">提交</a>操作</h3>';
                        confirmContent += '<br/>';
                        confirmContent += '<h5>提交后的数据将不能修改</h5>';
                        confirmContent += '<h5>请确定执行此操作</h5>';
                        confirmContent += '</blockquote> ';
                        _confirmMessage.destory();
                        _confirmMessage.show('提交确认？', confirmContent,
                            {
                                confirm: function ()
                                {


                                    _ladda_btn_command_printsubmit1.start();


                                    getModel({
                                        success: function (tbl_ld_jfb_detail)
                                        {
                                            checkModel_save(tbl_ld_jfb_detail, _validateMessage_printsubmit1, {
                                                success: function (tbl_ld_jfb_detail)
                                                {

                                                    checkModel_printsubmit1(tbl_ld_jfb_detail, _validateMessage_printsubmit1, {
                                                        success: function (tbl_ld_jfb_detail)
                                                        {
                                                            tbl_ld_jfb_detail.f_zt = "已提交";
                                                            tbl_ld_jfb_detail.f_ztid = "2";
                                                            that.saveData(tbl_ld_jfb_detail, "jf", {
                                                                success: function (name, message)
                                                                {
                                                                    controlObj.singledropdownlistid("detail_f_zt_tbl_ld_jfb_detail", "2");
                                                                    _ladda_btn_command_printsubmit1.stop();

                                                                    that.btn_command_print_onclick("1", {
                                                                        success: function ()
                                                                        {
                                                                            clearModel();

                                                                            tbl_ld_cbiao_list_Obj.destorygGrid({
                                                                                success: function ()
                                                                                {
                                                                                    setModelDirect({
                                                                                        success: function ()
                                                                                        {
                                                                                            setDisable();
                                                                                            _alertMessage.show('提交成功', 'success');
                                                                                        }
                                                                                    });


                                                                                },
                                                                                fail: function (message)
                                                                                {
                                                                                    _alertMessage.show('重载失败<br/>', 'fail');
                                                                                }
                                                                            });

                                                                        }
                                                                    });

                                                                },
                                                                fail: function (name, message)
                                                                {
                                                                    _ladda_btn_command_printsubmit1.stop();
                                                                    _alertMessage.show('提交失败', 'fail');
                                                                    if (message != '')
                                                                    {
                                                                        _resultMessage.show(message);
                                                                    }
                                                                }
                                                            });
                                                        },
                                                        fail: function (message)
                                                        {
                                                            _ladda_btn_command_printsubmit1.stop();
                                                            _alertMessage.show('校验失败', 'fail');
                                                            if (message != '')
                                                            {
                                                                _resultMessage.show(message);
                                                            }
                                                        }
                                                    });


                                                },
                                                fail: function (message)
                                                {
                                                    _ladda_btn_command_printsubmit1.stop();
                                                    _alertMessage.show('校验失败', 'fail');
                                                    if (message != '')
                                                    {
                                                        _resultMessage.show(message);
                                                    }
                                                }
                                            });
                                        },
                                        fail: function (message)
                                        {
                                            _ladda_btn_command_printsubmit1.stop();
                                            _alertMessage.show('数据获取失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });

                                },
                                cancle: function ()
                                {
                                    _ladda_btn_command_printsubmit1.stop();
                                }
                            });
                    }
                    catch (ex)
                    {
                        _alertMessage.show('保存程序异常。', 'fail');
                        _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
                    }
                }
                else
                {
                    _ladda_btn_command_printsubmit1.stop();
                    _alertMessage.show('已在建行托收的客户无法在营业厅进行缴费。', 'fail');
                }
            }
            else
            {
                _alertMessage.show('选中的本期水量累加和与累计水量不符，请刷新后重新操作。', 'fail');
            }
        },

        ////补打印按钮
        btn_command_print_onclick: function (type, callBackFunction)
        {
            try
            {

                var mydate = new Date(); //获取当前时间
                var khbh = controlObj.text('detail_f_khbh_tbl_ld_jfb_detail');//客户编号
                var dz = controlObj.text('detail_f_dz_tbl_ld_jfb_detail');//地址
                var mc = controlObj.text('detail_f_jfm_tbl_ld_jfb_detail');//名称


                var sl = controlObj.text('detail_f_sllj_tbl_ld_jfb_detail');//实收水量
                var jm = controlObj.text('detail_f_jmjelj_tbl_ld_jfb_detail');//减免
                var sytjjzsf = controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail');//使用调价结转水费
                var sytjjzpwf = controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail');//使用调价结转污水处理费
                var syye = controlObj.text('detail_f_syye_tbl_ld_jfb_detail');//使用绿化表押金
                var dx = controlObj.text('detail_f_shssdx_tbl_ld_jfb_detail');//大写
                var xx = controlObj.text('detail_f_shss_tbl_ld_jfb_detail');//小写               
                var kpr = controlObj.text('detail_f_yyy_tbl_ld_jfb_detail');//开票人
                var syycje = controlObj.text('detail_f_syycje_tbl_ld_jfb_detail');//使用余额
                var yycje = controlObj.text('detail_f_khyycje_tbl_ld_jfb_detail');//原余额
                var yhycje = controlObj.text('detail_f_yhycje_tbl_ld_jfb_detail');//用后余额
                var dszycje = controlObj.text('detail_f_dszycje_tbl_ld_jfb_detail'); //多收转余额
                var yhlb = controlObj.text('detail_f_yslx_tbl_ld_jfb_detail');

                var yqjmsf = controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail');//疫情减免水费
                var yqjmpwf = controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail');//疫情减免污水处理费

                if (yqjmsf == null || yqjmsf == "")
                {
                    yqjmsf = "0";
                }
                if (yqjmpwf == null || yqjmpwf == "")
                {
                    yqjmpwf = "0";
                }

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



                var sjbh = controlObj.text('detail_f_sjbh_tbl_ld_jfb_detail');//收据编号

                var jfrq = controlObj.datetime('detail_f_jfrq_tbl_ld_jfb_detail_date', 'detail_f_jfrq_tbl_ld_jfb_detail_time'); //缴费日期
                var sfjls = controlObj.text('detail_f_sfjl_tbl_ld_jfb_detail').split('|');//算法记录
                var cbiaolist = $('#table_grid_tbl_ld_cbiao_list').find('tbody').children();
                var kplx = controlObj.singledropdownlist('detail_f_kplb_tbl_ld_jfb_detail');//开票类型
                var jffs = controlObj.singledropdownlist('detail_f_jffs_tbl_ld_jfb_detail');//缴费方式
                var yyt = controlObj.text('detail_f_yyt_tbl_ld_jfb_detail');
                var sqzm = '';
                var bqzm = '';

                if (cbiaolist.length > 0 && $(cbiaolist[0]).attr("class") != "no-records-found")
                {
                    $.each(cbiaolist, function (i, u)
                    {
                        if ($(u).find('.bs-checkbox>input')[0].checked == true)
                        {
                            var rowid = u.id;
                            var tdid = ''
                            if (sqzm == '')
                            {
                                tdid = rowid + '_td_34_f_sqzm';
                                sqzm = $('#' + tdid).text();
                            }
                            tdid = rowid + '_td_35_f_bqzm';
                            bqzm = $('#' + tdid).text();
                        }
                    });
                }

                var sfjl_hashmap = new hashMap();

                if (sfjls != null && sfjls != "")
                {
                    
                    //去重复
                    $.each(sfjls, function (i, u)
                    {
                        var key = sfjls[i].split('^')[0] + "^" + sfjls[i].split('^')[1];
                        var value = sfjls[i].split('^')[2];
                        if (sfjl_hashmap.containsKey(key))
                        {
                            value = parseFloat(value) + parseFloat(sfjl_hashmap.get(key));
                        }
                        sfjl_hashmap.put(key, value);
                    });
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

                html += '<table align="center" style="width:650px;padding-bottom:0px;border:0px #000000 solid;" cellpadding="0" cellspacing="0" >';
                html += '<tr>';


                html += '<td   style="padding-left:10px;font-size:{fontsize}px;font-weight:bold;height:20px;width:160px;">支付方式：' + jffs + '</td>';
                html += '<td   style="padding-left:0px;font-size:{fontsize}px;font-weight:bold;height:20px;width:120px;">开票类型：' + kplx + '</td>';
                html += '<td   style="padding-left:0px;font-size:{fontsize}px;font-weight:bold;height:20px;width:240px;">用户类别：' + yhlb + '</td>';
                html += '</tr>';
                html += '</table>';
                html += '<table align="center" style="width:650px;padding-bottom:0px;border:{borderpx}px #000000 solid;" cellpadding="0" cellspacing="0" >';
                html += '<tr>';
                html += '<td  style="padding-left:10px;font-size:{fontsize}px;font-weight:bold;height:20px;width:200px;">客户编号：' + khbh + '</td>';
                html += '<td  colspan="2"  style="padding-left:0px;font-size:12px;font-weight:bold;height:20px;width:450px;">地址：' + dz + '</td>';
                html += '</tr>';

                html += '<tr>';
                html += '<td colspan="3" style="padding-left:10px;text-align:left;font-weight:bold;font-size:{fontsize}px;width:650px;height:25px;">付款方名称：' + mc + '';
                html += '</td>';
                html += '</tr>';

                html += '<tr>';
                html += '<td colspan="3"  style="text-align:left;padding-left:10px;width:650px;height:75px; " >';
                html += '<table  style="height:75px;border:0px #000000 solid;margin-right:0px" cellpadding="0" cellspacing="0" >';
                html += '<tr>';
                html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:120px;height:35px;">水费/污水处理费单价<br/>（元/吨）</td>';
                html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:60px;height:35px;">水量<br/>（吨）</td>';
                html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:35px;">水费合计<br/>（元）</td>';
                html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:100px;height:35px;">污水处理费合计<br/>（元）</td>';
                html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;width:80px;height:35px;">金额<br/>（元）</td>';
                html += '</tr>';

                if (sfjls != null && sfjls != "")
                {
                    //拼接html
                    var keysArray = sfjl_hashmap.keys();
                    var rowheight = 40 / keysArray.lenght;
                    $.each(keysArray, function (i, u)
                    {
                        var key = keysArray[i];

                        var sfdj = parseFloat(key.split('^')[0]);
                        var pwfdj = parseFloat(key.split('^')[1]);
                        if (sfdj == 7 && pwfdj == 0)
                        {
                            sfdj = 6.996;
                        }
                        var sl = parseFloat(sfjl_hashmap.get(key));
                        var je = ((sfdj + pwfdj) * sl).toFixed(2);

                        var sfhj = (sfdj * sl).toFixed(2);
                        var pwfhj = (pwfdj * sl).toFixed(2);
                        html += '<tr >';
                        html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;height:' + rowheight + 'px;">' + sfdj + '/' + pwfdj + '</td>';

                        html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;height:' + rowheight + 'px;">' + sl + '</td>';
                        html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;height:' + rowheight + 'px;">' + sfhj + '</td>';
                        html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;height:' + rowheight + 'px;">' + pwfhj + '</td>';
                        html += '<td style="text-align:center;font-size:{fontsize}px;font-weight:bold;height:' + rowheight + 'px;">' + je + '</td>';
                        html += '</tr>';
                    });
                }

                html += '</table>';
                html += '</td>';
                html += '</tr>';

                html += '<tr>';
                html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:200px;padding-left:10px;height:15px;">上期止码：' + sqzm + '</td>';
                html += '<td colspan="2" style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:450px;padding-left:0px;height:15px;">本期止码：' + bqzm + '</td>';
                html += '</tr>';
                html += '<tr>';

                if (syycje != '0' || dszycje != '0')
                {
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:180px;padding-left:10px;height:15px;">客户原余额（元）：' + yycje + '</td>';
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:230px;left;padding-left:0px;height:15px;">使用余额（元）：' + syycje + '</td>';
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:240px;padding-left:0px;height:15px;">使用后余额（元）：' + yhycje + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                }


                if (jm == '0' && yqjmsf == '0' && yqjmpwf == '0')
                {
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:180px;padding-left:10px;height:15px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>';
                }
                else
                {
                    var str = "";
                    if (jm != "0")
                    {
                        str += "使用减免（元）：" + jm + ",<br/>";
                    }
                    if (yqjmsf != "0")
                    {
                        str += "疫情减免水费（元）：" + yqjmsf + ",<br/>";
                    }


                    str = str.trimEnd(">").trimEnd("/").trimEnd("r").trimEnd("b").trimEnd("<").trimEnd(",");
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:180px;padding-left:10px;height:15px;">' + str + '</td>';
                }


                if (sytjjzsf == '0')
                {
                    if (yqjmpwf != "0")
                    {
                        html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:230px;left;padding-left:0px;height:15px;">疫情减免污水处理费（元）：' + yqjmpwf + '</td>';
                    }
                    else
                    {
                        html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:230px;left;padding-left:0px;height:15px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>';
                    }
                    

                }
                else
                {
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:230px;left;padding-left:0px;height:15px;">使用调价结转水费（元）：' + sytjjzsf + '</td>';
                }


                if (sytjjzpwf == '0')
                {
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:240px;padding-left:0px;height:15px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>';

                }
                else
                {
                    html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;width:240px;padding-left:0px;height:15px;">使用调价结转污水处理费（元）：' + sytjjzpwf + '</td>';

                }


                html += '</tr>';

                html += '<tr>';
                html += '<td  style="font-size:{fontsize}px;font-weight:bold;text-align:left;padding-left:130px;height:35px;"  colspan="4">';
                html += xx;
                html += '</td>';
                html += '</tr>';

                html += '<tr>';
                html += '<td style="font-size:{fontsize}px;font-weight:bold;text-align:left;padding-left:130px;height:35px;" colspan="4">';
                html += dx;
                html += '</td>';
                html += '</tr>';

                html += '<tr>';
                html += '<td  colspan="3" style="font-size:{fontsize}px;font-weight:bold;text-align:left;padding-left:10px;height:20px;">备注：如有开票意向用户请在3个月内到大厅办理换票业务。</td>';
                html += '</tr>';

                html += '<tr>';
                html += '<td  style="font-size:{fontsize}px;font-weight:bold;text-align:left;padding-left:10px;height:20px;">营业厅：' + yyt + '</td>';
                html += '<td  style="font-size:{fontsize}px;font-weight:bold;text-align:left;padding-left:0px;height:20px;">开票人:' + kpr + '</td>';
                html += '<td  style="font-size:{fontsize}px;font-weight:bold;text-align:left;padding-left:0px;height:20px;">开票日期：' + jfrq.split(' ')[0] + '</td>';

                html += '</tr>';

                html += '</table>';

                if (currentVersion.browser == "IE")
                {
                    $("#div_print").html(html.replaceAll('{borderpx}', '0').replaceAll('{fontsize}', '16'));//打印
                    $("#div_print_xs").html(html.replaceAll('{borderpx}', '1').replaceAll('{fontsize}', '16'));
                    //不弹出预览弹出层直接打印
                    //$('#div_print_modal_tbl_ld_jfb_detail').modal('show');

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


                }
                else
                {


                    $("#div_print").html(html.replaceAll('{borderpx}', '0').replaceAll('{fontsize}', '12'));//打印

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
                }

                if (callBackFunction != undefined)
                {
                    callBackFunction.success();
                }
            }
            catch (ex)
            {
                if (callBackFunction != undefined)
                {
                    callBackFunction.success();
                }

            }

        },



        btn_print_modal_onclick: function ()
        {
            $('#div_print_modal_tbl_ld_jfb_detail').modal('hide');
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

        //计算疫情减免水费
        btn_command_yqjmsf_onclick: function ()
        {
            debugger
            var yqjmsf = controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail');//疫情减免水费百分比
            var sf = controlObj.text('detail_f_sflj_tbl_ld_jfb_detail');//水费累积
            if (yqjmsf == "0")
            {
                //减免0%
                var currentyqjmsfje = controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail');
                if (currentyqjmsfje != null && currentyqjmsfje != "" && currentyqjmsfje != "0")
                {
                    var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                    controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(currentyqjmsfje) + parseFloat(shys)).toFixed(2));
                    controlObj.text('detail_f_shss_tbl_ld_jfb_detail', (parseFloat(currentyqjmsfje) + parseFloat(shys)).toFixed(2));
                    that.btn_command_receipt_onclick();
                }

                    controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '0');
                
                
                

            }
            else if (yqjmsf == "10")
            {
                var currentyqjmsfje = controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail');
                if (currentyqjmsfje == null || currentyqjmsfje == "" || currentyqjmsfje == "0")
                {
                    //减免10%
                    var jmsfje = (parseFloat(sf) * 0.1).toFixed(2);
                    var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                    var tjjzsf = controlObj.text('detail_f_sytjjzsf_tbl_ld_jfb_detail'); //调价结转水费
                    if (tjjzsf == null || tjjzsf == "")
                    {
                        tjjzsf = "0";
                    }

                    if (parseFloat(shys) - parseFloat(tjjzsf) - parseFloat(jmsfje) >= 0)
                    {
                        controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', jmsfje);

                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(parseFloat(shys) - jmsfje).toFixed(2)));
                        controlObj.text('detail_f_shss_tbl_ld_jfb_detail', (parseFloat(parseFloat(shys) - jmsfje).toFixed(2)));
                        that.btn_command_receipt_onclick();
                    }
                    else
                    {
                        controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmsfbfb_tbl_ld_jfb_detail', '0');
                        _alertMessage.show('疫情减免金额大于应收金额', 'fail');
                    }


                }

            }
            else
            {
                var currentyqjmsfje = controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail');
                if (currentyqjmsfje != null && currentyqjmsfje != "" && currentyqjmsfje != "0")
                {
                    var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                    controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(currentyqjmsfje) + parseFloat(shys)).toFixed(2));
                    controlObj.text('detail_f_shss_tbl_ld_jfb_detail', (parseFloat(currentyqjmsfje) + parseFloat(shys)).toFixed(2));
                    that.btn_command_receipt_onclick();
                }

                    controlObj.text('detail_f_yqjmsfje_tbl_ld_jfb_detail', '');
                
                
            }

        },

        //计算疫情减免污水处理费
        btn_command_yqjmpwf_onclick: function ()
        {
            debugger
            var yqjmpwf = controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail');//疫情减免污水处理费百分比
            var pwf = controlObj.text('detail_f_pwflj_tbl_ld_jfb_detail');//污水处理费累积
            if (yqjmpwf == "0")
            {

                //减免0%
                var currentyqjmpwfje = controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail');
                if (currentyqjmpwfje != null && currentyqjmpwfje != "" && currentyqjmpwfje != "0")
                {
                    var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                    controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(currentyqjmpwfje) + parseFloat(shys)).toFixed(2));
                    controlObj.text('detail_f_shss_tbl_ld_jfb_detail', (parseFloat(currentyqjmpwfje) + parseFloat(shys)).toFixed(2));
                    that.btn_command_receipt_onclick();
                }

                    controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '0');
                

            }
            else if (yqjmpwf == "100")
            {
                //减免100%
                var currentyqjmpwfje = controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail');
                if (currentyqjmpwfje == null || currentyqjmpwfje == "" || currentyqjmpwfje == "0")
                {
                    var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                    var tjjzpwf = controlObj.text('detail_f_sytjjzpwf_tbl_ld_jfb_detail'); //调价结转污水处理费

                    if (tjjzpwf == null || tjjzpwf == "")
                    {
                        tjjzpwf = "0";
                    }

                    if (parseFloat(shys) - parseFloat(tjjzpwf) - parseFloat(pwf) >= 0)
                    {
                        controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', pwf);

                        controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(parseFloat(shys) - parseFloat(pwf)).toFixed(2)));
                        controlObj.text('detail_f_shss_tbl_ld_jfb_detail', (parseFloat(parseFloat(shys) - parseFloat(pwf)).toFixed(2)));
                        that.btn_command_receipt_onclick();
                    }
                    else
                    {
                        controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '0');
                        controlObj.singledropdownlistid('detail_f_yqjmpwfbfb_tbl_ld_jfb_detail', '0');
                        _alertMessage.show('疫情减免金额大于应收金额', 'fail');
                    }


                }
                
                
            }
            else
            {
                var currentyqjmpwfje = controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail');
                if (currentyqjmpwfje != null && currentyqjmpwfje != "" && currentyqjmpwfje != "0")
                {
                    var shys = controlObj.text('detail_f_shys_tbl_ld_jfb_detail'); //算后应收
                    controlObj.text('detail_f_shys_tbl_ld_jfb_detail', (parseFloat(currentyqjmpwfje) + parseFloat(shys)).toFixed(2));
                    controlObj.text('detail_f_shss_tbl_ld_jfb_detail', (parseFloat(currentyqjmpwfje) + parseFloat(shys)).toFixed(2));
                    that.btn_command_receipt_onclick();
                }

                    controlObj.text('detail_f_yqjmpwfje_tbl_ld_jfb_detail', '');
                
            }

        },


        //回滚按钮事件
        //btn_command_rollback_onclick: function ()
        //{
        //    _ladda_btn_command_rollback.start();
        //    try
        //    {
        //        var confirmContent = '<blockquote> ';
        //        confirmContent += '<h4>确定要进行回滚操作吗？</h4>';
        //        confirmContent += '<br/>';
        //        confirmContent += '<h5>回滚后的数据将可以修改</h5>';
        //        confirmContent += '<h5>请确定执行此操作</h5>';
        //        confirmContent += '</blockquote> ';
        //        _confirmMessage.destory();
        //        _confirmMessage.show('回滚确认？', confirmContent, {
        //            confirm: function ()
        //            {
        //                _ladda_btn_command_rollback.start();
        //                controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfb_detail', '0');
        //                getModel({
        //                    success: function (tbl_ld_jfb_detail)
        //                    {
        //                        that.saveData(tbl_ld_jfb_detail, "hg", {
        //                            success: function (name, message)
        //                            {
        //                                setDisable();
        //                                _ladda_btn_command_rollback.stop();
        //                                _alertMessage.show('回滚成功', 'success');


        //                            }, fail: function (name, message)
        //                            {
        //                                _ladda_btn_command_rollback.stop();
        //                                _alertMessage.show('回滚失败', 'fail');
        //                                if (message != '')
        //                                {
        //                                    _resultMessage.show(message);
        //                                }
        //                            }
        //                        });
        //                    },
        //                    fail: function (message)
        //                    {
        //                        _ladda_btn_command_printsubmit1.stop();
        //                        _alertMessage.show('数据获取失败', 'fail');
        //                        _resultMessage.show(message);
        //                    }
        //                });
        //            },
        //            cancle: function ()
        //            {
        //                _ladda_btn_command_rollback.stop();
        //            }
        //        });
        //    }
        //    catch (ex)
        //    {
        //    }
        //},




        end: function ()
        {
        },



    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_jfb_detail_Obj.init();
});



