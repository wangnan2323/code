

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_khb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
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

        codeServiceId += "0554^";


        codeServiceId += "0555^";



        codeServiceId += "0556^";


        codeServiceId += "0557^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0554', resultArray['0554']);


                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);



                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);


                    _baseCodeHashMap.put('codeservice_0557', resultArray['0557']);

                    var jmsfArray = [
                        { "id": "0", "text": "0%" },
                        { "id": "10", "text": "10%" }];


                    var jmpwfArray = [
                        { "id": "0", "text": "0%" },
                        { "id": "100", "text": "100%" }];

                    _baseCodeHashMap.put('codeservice_jmsf', jmsfArray);
                    _baseCodeHashMap.put('codeservice_jmpwf', jmpwfArray);

                    //获取用水类型、抄本编号数据作为code下拉选项
                    var sqlStringsJson = {
                        "tbl_ld_cben": "select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc ,decode(f_ztid,'0','false','true') as disabled from tbl_ld_cben order by f_cbbh",
                       "tbl_ldbm_khfz":"select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {

                            $.each(resultJson["tbl_ldbm_khfz"], function (i, u)
                            {
                                if (resultJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
                            $.each(resultJson["tbl_ld_cben"], function (i, u)
                            {
                                if (resultJson["tbl_ld_cben"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ld_cben"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ld_cben"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);

                            callBackFunction.success();
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

            var codeService_0555 = _baseCodeHashMap.get('codeservice_0555');
            var codeservice_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');

            var codeService_0556 = _baseCodeHashMap.get('codeservice_0556');

            var codeService_jmsf = _baseCodeHashMap.get('codeservice_jmsf');
            var codeService_jmpwf = _baseCodeHashMap.get('codeservice_jmpwf');

            controlObj.singledropdownlistinit('detail_f_yslx_tbl_ld_khb_detail', codeService_0555, f_yslx_onchange);

            controlObj.multidropdownlistinit('detail_f_khfz_tbl_ld_khb_detail', codeservice_khfz, f_khfz_onchange);
            controlObj.singledropdownlistinit('detail_f_cbbh_tbl_ld_khb_detail', codeservice_cben, f_cbbh_onchange);

            controlObj.singledropdownlistinit('detail_f_yqjmsf_tbl_ld_khb_detail', codeService_jmsf, "");
            controlObj.singledropdownlistinit('detail_f_yqjmpwf_tbl_ld_khb_detail', codeService_jmpwf, "");

            controlObj.toggleinit('detail_f_sfjlbjf_tbl_ld_khb_detail', f_sfjlbjf_onchange);
            controlObj.toggleinit('detail_f_sfdxcs_tbl_ld_khb_detail', '');

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_khb_detail', codeService_0556, f_zt_onchange);


            controlObj.datetimeinit('detail_f_zhcbrq_tbl_ld_khb_detail', 'detail_f_zhcbrq_tbl_ld_khb_detail_time', f_zhcbrq_date_onchange, f_zhcbrq_time_onchange);
        
            //用户
            $('#div_container_tbl_ld_khb_detail').load('../tbl_ld_yhb/tbl_ld_yhb_detail_part.html', null, function ()
            {
                tbl_ld_yhb_detail_Obj._pr_pagetype = '2';              
                tbl_ld_yhb_detail_Obj.init({
                    success: function ()
                    {
                        $('#div_container_tbl_ld_khb_detail').css('display', '');


                        //水表
                        $('#div_container_tbl_ld_sbb_detail').load('../tbl_ld_sbb/tbl_ld_sbb_detail_part.html', null, function ()
                        {
                            tbl_ld_sbb_detail_Obj._pr_pagetype = '2';
                            tbl_ld_sbb_detail_Obj.init({
                                success: function ()
                                {
                                    $('#div_container_tbl_ld_sbb_detail').css('display', '');

                                    //停水水表
                                    $('#div_container_tbl_ld_tssb_detail').load('../tbl_ld_sbb/tbl_ld_sbb_treelist_part.html', null, function ()
                                    {
                                        tbl_ld_sbb_treelist_Obj._pr_listtype = '2';
                                        tbl_ld_sbb_treelist_Obj.init({
                                            success: function ()
                                            {
                                                $('#div_container_tbl_ld_tssb_detail').css('display', '');


                                                //日志
                                                $('#div_container_tbl_ld_log').load('../tbl_ld_log/tbl_ld_log_modallist_part.html', null, function ()
                                                {
                                                    tbl_ld_log_modallist_Obj._pr_tablename = 'tbl_ld_khb';
                                                    tbl_ld_log_modallist_Obj._pr_tableprikeyvalue = that._pr_sys_id;
                                                    tbl_ld_log_modallist_Obj.init({
                                                        success: function ()
                                                        {
                                                            $('#div_container_tbl_ld_log').css('display', '');

                                                            callBackFunction.success();
                                                        },
                                                        fail:function(message)
                                                        {
                                                            _blockMessage.show('加载日志执行失败<br/>' + ex.message, 'fail');
                                                        }

                                                    });
                                                });
                                            },                                            
                                                fail:function(message)
                                                {
                                                    _blockMessage.show('加载停水水表执行失败<br/>' + ex.message, 'fail');
                                                }
                                        });
                                    });
                                },
                                fail: function (message)
                                {
                                    _blockMessage.show('加载水表执行失败<br/>' + ex.message, 'fail');
                                }
                            });
                        });

                    },
                    fail: function (message)
                    {
                        _blockMessage.show('加载用户执行失败<br/>' + ex.message, 'fail');
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

            controlObj.textdisable('detail_f_khbh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_ztkhh_tbl_ld_khb_detail', isDisable);

            controlObj.multidropdownlistdisable('detail_f_khfz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_ycje_tbl_ld_khb_detail', isDisable);


            controlObj.textdisable('detail_f_ljqf_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_nljgl_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_tjjzpwf_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_tjjzsf_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_tssbbhid_tbl_ld_khb_detail', isDisable);
            controlObj.singledropdownlistdisable('detail_f_yslx_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_tbbh_tbl_ld_khb_detail', isDisable);


            controlObj.toggledisable('detail_f_sfjlbjf_tbl_ld_khb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_bz_tbl_ld_khb_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_f_cbbh_tbl_ld_khb_detail', isDisable);
            controlObj.singledropdownlistdisable('detail_f_yqjmsf_tbl_ld_khb_detail', isDisable);
            controlObj.singledropdownlistdisable('detail_f_yqjmpwf_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_cbxh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_cbyxm_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_cbyid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_cbzq_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_cbmc_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_yhbh_tbl_ld_khb_detail', isDisable);
            if (isDisable)
            {
                $('#btn_detail_f_yhbh_tbl_ld_khb_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_yhbh_tbl_ld_khb_detail').removeAttr('disabled');
            }

            controlObj.textdisable('detail_f_yhbhid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_jfm_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_yhfz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_yhfzid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_dz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sbdz_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_ye_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_dh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_dy_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_dyid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sc_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_scid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_qy_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_qyid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_pq_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_pqid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_tsyxzh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_hth_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sfzh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_khrq_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sbbh_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_txt_f_tssbbh_tbl_ld_khb_detail', isDisable);
            if (isDisable)
            {
                $('#btn_detail_f_sbbh_tbl_ld_khb_detail').attr('disabled', 'disabled');
                $('#btn_detail_txt_f_tssbbh_tbl_ld_khb_detail').attr('disabled', 'disabled');

                
            }
            else
            {
                $('#btn_detail_f_sbbh_tbl_ld_khb_detail').removeAttr('disabled');
                $('#btn_detail_txt_f_tssbbh_tbl_ld_khb_detail').removeAttr('disabled');
            }

            controlObj.textdisable('detail_f_sbbhid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_bqzm_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sqzm_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_bqsl_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sqsl_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_qsqpjsl_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_qlqpjsl_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_ljgl_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_lxth_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sblx_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sblxid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_jllx_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_jllxid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_tssbbh_tbl_ld_khb_detail', isDisable);

            //新增
            controlObj.datetimedisable('detail_f_zhcbrq_tbl_ld_khb_detail', 'detail_f_zhcbrq_tbl_ld_khb_detail_time', isDisable);

            controlObj.textdisable('detail_f_yhm_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_ztyhh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_wxwybz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_gdyhwybz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_zfbwybz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_rs_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_ztsbh_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sbfzid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sbfz_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sbkjid_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_sbkj_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_sqysl_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_jhysl_tbl_ld_khb_detail', isDisable);
            controlObj.textdisable('detail_f_ickljgl_tbl_ld_khb_detail', isDisable);

            controlObj.textdisable('detail_f_dxcsyy_tbl_ld_khb_detail', isDisable);


            controlObj.toggledisable('detail_f_sfdxcs_tbl_ld_khb_detail', isDisable);


            if (isDisable)
            {
                $('#btn_detail_f_tssbbh_tbl_ld_khb_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_tssbbh_tbl_ld_khb_detail').removeAttr('disabled');
            }

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_khb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_khb_detail').removeClass('hidden');
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
    *  参数:tbl_ld_khb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_khb_detail, callBackFunction)
    {
        try
        {
            //托收银行查询
            //获取用水类型、抄本编号数据作为code下拉选项
            var sqlStringsJson = {
                "count": "select count(*) as count from tbl_ldbm_expdata where ','||f_khbh||',' like '%," + tbl_ld_khb_detail.f_khbh + ",%'",
                "content": "select f_nr,f_lx from tbl_ldbm_expdata where ','||f_khbh||',' like '%," + tbl_ld_khb_detail.f_khbh + ",%'",
            };

            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    
                    if (parseInt(resultJson["count"][0]["count"]) > 0)
                    {
                        //托收中
                        controlObj.text('detail_f_tslx_tbl_ld_khb_detail', resultJson["content"][0]["f_lx"]);
                        controlObj.text('detail_f_tszh_tbl_ld_khb_detail', resultJson["content"][0]["f_nr"]);

                        $("#div_detail_f_tslx_tbl_ld_khb_detail").removeClass('hidden');
                        $("#div_detail_f_tszh_tbl_ld_khb_detail").removeClass('hidden');
                    }
                    else
                    {
                        //未托收
                        $("#div_detail_f_tslx_tbl_ld_khb_detail").addClass('hidden');
                        $("#div_detail_f_tszh_tbl_ld_khb_detail").addClass('hidden');
                    }
                }
            });
            controlObj.text('detail_f_value1_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_khb_detail', tbl_ld_khb_detail.f_value10);

            controlObj.text('detail_f_khbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_khbh);

            controlObj.text('detail_f_ztkhh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ztkhh);

            controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_khfzid);

            controlObj.text('detail_f_ycje_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ycje);

            controlObj.text('detail_f_ljqf_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ljqf);
            controlObj.text('detail_f_tssbbhid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_tssbbhid);
            controlObj.text('detail_f_nljgl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_nljgl);
            controlObj.text('detail_f_tjjzpwf_tbl_ld_khb_detail', tbl_ld_khb_detail.f_tjjzpwf);
            controlObj.text('detail_f_tjjzsf_tbl_ld_khb_detail', tbl_ld_khb_detail.f_tjjzsf);

            controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yslxid);

            controlObj.text('detail_f_tbbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_tbbh);

            controlObj.toggle('detail_f_sfjlbjf_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sfjlbjf);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_bz.returnStringRN());

            controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_cbbhid);

            controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yqjmsf);

            controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yqjmpwf);

            controlObj.text('detail_f_cbxh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_cbxh);

            controlObj.text('detail_f_cbyxm_tbl_ld_khb_detail', tbl_ld_khb_detail.f_cbyxm);

            controlObj.text('detail_f_cbyid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_cbyid);

            controlObj.text('detail_f_cbzq_tbl_ld_khb_detail', tbl_ld_khb_detail.f_cbzq);

            controlObj.text('detail_f_cbmc_tbl_ld_khb_detail', tbl_ld_khb_detail.f_cbmc);

            controlObj.text('detail_f_yhbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yhbh);

            controlObj.text('detail_f_yhbhid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yhbhid);

            controlObj.text('detail_f_jfm_tbl_ld_khb_detail', tbl_ld_khb_detail.f_jfm);

            controlObj.text('detail_f_yhfz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yhfz);

            controlObj.text('detail_f_yhfzid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yhfzid);

            controlObj.text('detail_f_dz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_dz);

            controlObj.text('detail_f_sbdz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbdz);
            controlObj.text('detail_f_ye_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ye);
            controlObj.text('detail_f_dh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_dh);

            controlObj.text('detail_f_dy_tbl_ld_khb_detail', tbl_ld_khb_detail.f_dy);

            controlObj.text('detail_f_dyid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_dyid);

            controlObj.text('detail_f_sc_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sc);

            controlObj.text('detail_f_scid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_scid);

            controlObj.text('detail_f_qy_tbl_ld_khb_detail', tbl_ld_khb_detail.f_qy);

            controlObj.text('detail_f_qyid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_qyid);

            controlObj.text('detail_f_pq_tbl_ld_khb_detail', tbl_ld_khb_detail.f_pq);

            controlObj.text('detail_f_pqid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_pqid);

            controlObj.text('detail_f_tsyxzh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_tsyxzh);

            controlObj.text('detail_f_hth_tbl_ld_khb_detail', tbl_ld_khb_detail.f_hth);

            controlObj.text('detail_f_sfzh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sfzh);

            controlObj.text('detail_f_khrq_tbl_ld_khb_detail', tbl_ld_khb_detail.f_khrq);

            controlObj.text('detail_f_sbbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbbh);

            controlObj.text('detail_f_sbbhid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbbhid);

            controlObj.text('detail_f_bqzm_tbl_ld_khb_detail', tbl_ld_khb_detail.f_bqzm);

            controlObj.text('detail_f_sqzm_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sqzm);

            controlObj.text('detail_f_bqsl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_bqsl);

            controlObj.text('detail_f_sqsl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sqsl);

            controlObj.text('detail_f_qsqpjsl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_qsqpjsl);

            controlObj.text('detail_f_qlqpjsl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_qlqpjsl);

            controlObj.text('detail_f_ljgl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ljgl);

            controlObj.text('detail_f_lxth_tbl_ld_khb_detail', tbl_ld_khb_detail.f_lxth);

            controlObj.text('detail_f_sblx_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sblx);

            controlObj.text('detail_f_sblxid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sblxid);

            controlObj.text('detail_f_jllx_tbl_ld_khb_detail', tbl_ld_khb_detail.f_jllx);

            controlObj.text('detail_f_jllxid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_jllxid);

            controlObj.text('detail_f_tssbbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_tssbbh.replaceAll("^", ","));
            //新增
            controlObj.datetime('detail_f_zhcbrq_tbl_ld_khb_detail', 'detail_f_zhcbrq_tbl_ld_khb_detail_time', tbl_ld_khb_detail.f_zhcbrq);

            controlObj.text('detail_f_yhm_tbl_ld_khb_detail', tbl_ld_khb_detail.f_yhm);

            controlObj.text('detail_f_ztyhh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ztyhh);

            controlObj.text('detail_f_wxwybz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_wxwybz);

            controlObj.text('detail_f_gdyhwybz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_gdyhwybz);

            controlObj.text('detail_f_zfbwybz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_zfbwybz);

            controlObj.text('detail_f_rs_tbl_ld_khb_detail', tbl_ld_khb_detail.f_rs);

            controlObj.text('detail_f_ztsbh_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ztsbh);

            controlObj.text('detail_f_sbfzid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbfzid);

            controlObj.text('detail_f_sbfz_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbfz);

            controlObj.text('detail_f_sbkjid_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbkjid);

            controlObj.text('detail_f_sbkj_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sbkj);
            controlObj.text('detail_f_sqysl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sqysl);
            controlObj.text('detail_f_jhysl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_jhysl);
            controlObj.text('detail_f_ickljgl_tbl_ld_khb_detail', tbl_ld_khb_detail.f_ickljgl);

            controlObj.text('detail_f_dxcsyy_tbl_ld_khb_detail', tbl_ld_khb_detail.f_dxcsyy);

            controlObj.toggle('detail_f_sfdxcs_tbl_ld_khb_detail', tbl_ld_khb_detail.f_sfdxcs);

            //初始化manyvalues控件
            that.initManyValuesDiv('detail_txt_f_tssbbh_tbl_ld_khb_detail', 'detail_f_tssbbh_tbl_ld_khb_detail', 'detail_div_f_tssbbh_tbl_ld_khb_detail');

            callBackFunction.success();
        }
        catch (ex)
        {
            _alertMessage.show('您选择的客户不存在', 'fail');
            that.btn_command_cancle_onclick();
        }
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_ld_khb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_khb_detail = new Object();


            tbl_ld_khb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_ztkhh = controlObj.text('detail_f_ztkhh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_khfz = controlObj.multidropdownlist('detail_f_khfz_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_khfzid = controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_ycje = controlObj.text('detail_f_ycje_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_tssbbhid = controlObj.text('detail_f_tssbbhid_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_nljgl = controlObj.text('detail_f_nljgl_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_tjjzpwf = controlObj.text('detail_f_tjjzpwf_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_tjjzsf = controlObj.text('detail_f_tjjzsf_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_ljqf = controlObj.text('detail_f_ljqf_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_yslx = controlObj.singledropdownlist('detail_f_yslx_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_yslxid = controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_yqjmsf = controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_yqjmpwf = controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_tbbh = controlObj.text('detail_f_tbbh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sfjlbjf = controlObj.toggle('detail_f_sfjlbjf_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_cbbh = controlObj.singledropdownlist('detail_f_cbbh_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_cbbhid = controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_cbxh = controlObj.text('detail_f_cbxh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_cbyxm = controlObj.text('detail_f_cbyxm_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_cbyid = controlObj.text('detail_f_cbyid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_cbzq = controlObj.text('detail_f_cbzq_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_cbmc = controlObj.text('detail_f_cbmc_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_yhfz = controlObj.text('detail_f_yhfz_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_yhfzid = controlObj.text('detail_f_yhfzid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_sbdz = controlObj.text('detail_f_sbdz_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_ye = controlObj.text('detail_f_ye_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_tsyxzh = controlObj.text('detail_f_tsyxzh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_hth = controlObj.text('detail_f_hth_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sfzh = controlObj.text('detail_f_sfzh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_khrq = controlObj.text('detail_f_khrq_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_bqzm = controlObj.text('detail_f_bqzm_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sqzm = controlObj.text('detail_f_sqzm_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_bqsl = controlObj.text('detail_f_bqsl_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sqsl = controlObj.text('detail_f_sqsl_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_qsqpjsl = controlObj.text('detail_f_qsqpjsl_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_qlqpjsl = controlObj.text('detail_f_qlqpjsl_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_ljgl = controlObj.text('detail_f_ljgl_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_lxth = controlObj.text('detail_f_lxth_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_jllx = controlObj.text('detail_f_jllx_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_jllxid = controlObj.text('detail_f_jllxid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_tssbbh = controlObj.text('detail_f_tssbbh_tbl_ld_khb_detail');


            //新增
            tbl_ld_khb_detail.f_zhcbrq = controlObj.datetime('detail_f_zhcbrq_tbl_ld_khb_detail', 'detail_f_zhcbrq_tbl_ld_khb_detail_time');

            tbl_ld_khb_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_ztyhh = controlObj.text('detail_f_ztyhh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_wxwybz = controlObj.text('detail_f_wxwybz_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_gdyhwybz = controlObj.text('detail_f_gdyhwybz_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_zfbwybz = controlObj.text('detail_f_zfbwybz_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_ztsbh = controlObj.text('detail_f_ztsbh_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sbfzid = controlObj.text('detail_f_sbfzid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sbfz = controlObj.text('detail_f_sbfz_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sbkjid = controlObj.text('detail_f_sbkjid_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sbkj = controlObj.text('detail_f_sbkj_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_sqysl = controlObj.text('detail_f_sqysl_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_jhysl = controlObj.text('detail_f_jhysl_tbl_ld_khb_detail');
            tbl_ld_khb_detail.f_ickljgl = controlObj.text('detail_f_ickljgl_tbl_ld_khb_detail');

            tbl_ld_khb_detail.f_dxcsyy = controlObj.text('detail_f_dxcsyy_tbl_ld_khb_detail');


            tbl_ld_khb_detail.f_sfdxcs = controlObj.toggle('detail_f_sfdxcs_tbl_ld_khb_detail');


            callBackFunction.success(tbl_ld_khb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_khb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_khb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_khb_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_khb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_khb_detail.f_ztkhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztkhh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_khfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_ycje != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_ycje))
            {
                errorMessageHansMap.put('detail_f_ycje_tbl_ld_khb_detail', '必须是数字');
            }


            if (tbl_ld_khb_detail.f_ycje.length > 200)
            {
                errorMessageHansMap.put('detail_f_ycje_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_khb_detail.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_nljgl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_nljgl))
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_khb_detail', '必须是数字');
            }
            if (tbl_ld_khb_detail.f_tssbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_tssbbhid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_tjjzpwf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_tjjzpwf))
            {
                errorMessageHansMap.put('detail_f_tjjzpwf_tbl_ld_khb_detail', '必须是数字');
            }
            if (tbl_ld_khb_detail.f_tjjzpwf.length > 200)
            {
                errorMessageHansMap.put('detail_f_tjjzpwf_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_tjjzsf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_tjjzsf))
            {
                errorMessageHansMap.put('detail_f_tjjzsf_tbl_ld_khb_detail', '必须是数字');
            }
            if (tbl_ld_khb_detail.f_tjjzsf.length > 200)
            {
                errorMessageHansMap.put('detail_f_tjjzsf_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_khb_detail.f_ljqf.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljqf_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_ljqf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_ljqf))
            {
                errorMessageHansMap.put('detail_f_ljqf_tbl_ld_khb_detail', '必须是数字');
            }
            if (tbl_ld_khb_detail.f_yslx.length > 200)
            {
                errorMessageHansMap.put('detail_f_yslx_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_yslx.length < 1)
            {
                errorMessageHansMap.put('detail_f_yslx_tbl_ld_khb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_khb_detail.f_tbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_tbbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sfjlbjf.length > 200)
            {
                errorMessageHansMap.put('detail_f_sfjlbjf_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_khb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_khb_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_khb_detail.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_cbxh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbxh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_cbxh.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbxh_tbl_ld_khb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            if (tbl_ld_khb_detail.f_cbxh != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_cbxh))
            {
                errorMessageHansMap.put('detail_f_cbxh_tbl_ld_khb_detail', '必须是数字');
            }


            if (tbl_ld_khb_detail.f_cbyxm.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyxm_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_cbyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_cbzq.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbzq_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbmc_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_yhbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_khb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_khb_detail.f_yhbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_yhbhid.length < 1)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_khb_detail', '请加载正确的用户后在进行保存');
            }




            if (tbl_ld_khb_detail.f_jfm.length > 200)
            {
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_yhfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhfz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_yhfzid.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhfzid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_dz.length > 200)
            {
                errorMessageHansMap.put('detail_f_dz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbdz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_khb_detail.f_ye != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_ye))
            {
                errorMessageHansMap.put('detail_f_ye_tbl_ld_khb_detail', '必须是数字');
            }

            if (tbl_ld_khb_detail.f_dh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_dy.length > 200)
            {
                errorMessageHansMap.put('detail_f_dy_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_dyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_dyid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sc.length > 200)
            {
                errorMessageHansMap.put('detail_f_sc_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_scid.length > 200)
            {
                errorMessageHansMap.put('detail_f_scid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_qy.length > 200)
            {
                errorMessageHansMap.put('detail_f_qy_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_qyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_qyid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_pq.length > 200)
            {
                errorMessageHansMap.put('detail_f_pq_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_pqid.length > 200)
            {
                errorMessageHansMap.put('detail_f_pqid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_tsyxzh.length > 200)
            {
                errorMessageHansMap.put('detail_f_tsyxzh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_hth.length > 200)
            {
                errorMessageHansMap.put('detail_f_hth_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sfzh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sfzh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_khrq.length > 200)
            {
                errorMessageHansMap.put('detail_f_khrq_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_sbbhid.length < 1)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_khb_detail', '请加载正确的水表后在进行保存');
            }




            if (tbl_ld_khb_detail.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_bqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_bqzm))
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_khb_detail', '必须是数字');
            }


            if (tbl_ld_khb_detail.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_lxth.length > 200)
            {
                errorMessageHansMap.put('detail_f_lxth_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblxid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_jllx.length > 200)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_jllxid.length > 200)
            {
                errorMessageHansMap.put('detail_f_jllxid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_tssbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_tssbbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            //新增

            if (tbl_ld_khb_detail.f_yhm.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_ztyhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztyhh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_wxwybz.length > 200)
            {
                errorMessageHansMap.put('detail_f_wxwybz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_gdyhwybz.length > 200)
            {
                errorMessageHansMap.put('detail_f_gdyhwybz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_zfbwybz.length > 200)
            {
                errorMessageHansMap.put('detail_f_zfbwybz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztsbh_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sbfzid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbfzid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sbfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbfz_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_khb_detail.f_sbkjid.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbkjid_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_dxcsyy.length > 200)
            {
                errorMessageHansMap.put('detail_f_dxcsyy_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_khb_detail.f_sbkj.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbkj_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_zhcbrq.length > 200)
            {
                errorMessageHansMap.put('detail_f_zhcbrq_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_khb_detail.f_zhcbrq.split(' ')[0].split('-')[2] != getLastDay(tbl_ld_khb_detail.f_zhcbrq.split('-')[0], tbl_ld_khb_detail.f_zhcbrq.split('-')[1]).toString())
            {
                errorMessageHansMap.put('detail_f_zhcbrq_tbl_ld_khb_detail', '最后抄表日期必须为本月的最后一天');
            }
            if (tbl_ld_khb_detail.f_sqysl.length > 200) {
                errorMessageHansMap.put('detail_f_sqysl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_sqysl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_sqysl)) {
                errorMessageHansMap.put('detail_f_sqysl_tbl_ld_khb_detail', '必须是数字');
            }
            if (tbl_ld_khb_detail.f_jhysl.length > 200) {
                errorMessageHansMap.put('detail_f_jhysl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_jhysl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_jhysl)) {
                errorMessageHansMap.put('detail_f_jhysl_tbl_ld_khb_detail', '必须是数字');
            }
            if (tbl_ld_khb_detail.f_ickljgl.length > 200) {
                errorMessageHansMap.put('detail_f_ickljgl_tbl_ld_khb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_khb_detail.f_ickljgl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_khb_detail.f_ickljgl)) {
                errorMessageHansMap.put('detail_f_ickljgl_tbl_ld_khb_detail', '必须是数字');
            }
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_khb_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_ycje^f_yslx^f_yslxid^f_tbbh^f_sfjlbjf^f_zt^f_ztid^f_bz^f_cbbh^f_cbbhid^f_cbxh^f_cbyxm^f_cbyid^f_cbzq^f_cbmc^f_yhbh^f_yhbhid^f_jfm^f_yhfz^f_yhfzid^f_dz^f_sbdz^f_ye^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_tsyxzh^f_hth^f_sfzh^f_khrq^f_sbbh^f_sbbhid^f_bqzm^f_sqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_ljgl^f_lxth^f_sblx^f_sblxid^f_jllx^f_jllxid^f_tssbbh^f_ztsbh^f_rs^f_sbkj^f_sbkjid^f_sbfz^f_sbfzid^f_ztyhh^f_wxwybz^f_zfbwybz^f_gdyhwybz^f_yhm^f_zhcbrq^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_sqysl^f_jhysl^f_ickljgl^sys_id^f_sfdxcs^f_dxcsyy^f_yqjmsf^f_yqjmpwf';
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
        *  参数:tbl_ld_khb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_khb_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_ycje^f_yslx^f_yslxid^f_tbbh^f_sfjlbjf^f_zt^f_ztid^f_bz^f_cbbh^f_cbbhid^f_cbxh^f_cbyxm^f_cbyid^f_cbzq^f_cbmc^f_yhbh^f_yhbhid^f_jfm^f_yhfz^f_yhfzid^f_dz^f_sbdz^f_ye^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_tsyxzh^f_hth^f_sfzh^f_khrq^f_sbbh^f_sbbhid^f_bqzm^f_sqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_ljgl^f_lxth^f_sblx^f_sblxid^f_jllx^f_jllxid^f_tssbbh^f_ztsbh^f_rs^f_sbkj^f_sbkjid^f_sbfz^f_sbfzid^f_ztyhh^f_wxwybz^f_zfbwybz^f_gdyhwybz^f_yhm^f_zhcbrq^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_sqysl^f_jhysl^f_ickljgl^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate^f_sfdxcs^f_dxcsyy^f_yqjmsf^f_yqjmpwf';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_khb_detail.f_value1,

                f_value2: tbl_ld_khb_detail.f_value2,

                f_value3: tbl_ld_khb_detail.f_value3,

                f_value4: tbl_ld_khb_detail.f_value4,

                f_value5: tbl_ld_khb_detail.f_value5,

                f_value6: tbl_ld_khb_detail.f_value6,

                f_value7: tbl_ld_khb_detail.f_value7,

                f_value8: tbl_ld_khb_detail.f_value8,

                f_value9: tbl_ld_khb_detail.f_value9,

                f_value10: tbl_ld_khb_detail.f_value10,

                f_khbh: tbl_ld_khb_detail.f_khbh,

                f_ztkhh: tbl_ld_khb_detail.f_ztkhh,

                f_khfz: tbl_ld_khb_detail.f_khfz,
                f_khfzid: tbl_ld_khb_detail.f_khfzid,

                f_ycje: tbl_ld_khb_detail.f_ycje,

                f_yslx: tbl_ld_khb_detail.f_yslx,
                f_yslxid: tbl_ld_khb_detail.f_yslxid,

                f_tbbh: tbl_ld_khb_detail.f_tbbh,

                f_sfjlbjf: tbl_ld_khb_detail.f_sfjlbjf,

                f_zt: tbl_ld_khb_detail.f_zt,
                f_ztid: tbl_ld_khb_detail.f_ztid,

                f_bz: tbl_ld_khb_detail.f_bz.formatStringRN(),

                f_cbbh: tbl_ld_khb_detail.f_cbbh,
                f_cbbhid: tbl_ld_khb_detail.f_cbbhid,

                f_cbxh: tbl_ld_khb_detail.f_cbxh,

                f_cbyxm: tbl_ld_khb_detail.f_cbyxm,

                f_cbyid: tbl_ld_khb_detail.f_cbyid,

                f_cbzq: tbl_ld_khb_detail.f_cbzq,

                f_cbmc: tbl_ld_khb_detail.f_cbmc,

                f_yhbh: tbl_ld_khb_detail.f_yhbh,

                f_yhbhid: tbl_ld_khb_detail.f_yhbhid,

                f_jfm: tbl_ld_khb_detail.f_jfm,

                f_yhfz: tbl_ld_khb_detail.f_yhfz,

                f_yhfzid: tbl_ld_khb_detail.f_yhfzid,

                f_dz: tbl_ld_khb_detail.f_dz,

                f_sbdz: tbl_ld_khb_detail.f_sbdz,
                f_ye: tbl_ld_khb_detail.f_ye,

                f_dh: tbl_ld_khb_detail.f_dh,

                f_dy: tbl_ld_khb_detail.f_dy,

                f_dyid: tbl_ld_khb_detail.f_dyid,

                f_sc: tbl_ld_khb_detail.f_sc,

                f_scid: tbl_ld_khb_detail.f_scid,

                f_qy: tbl_ld_khb_detail.f_qy,

                f_qyid: tbl_ld_khb_detail.f_qyid,

                f_pq: tbl_ld_khb_detail.f_pq,

                f_pqid: tbl_ld_khb_detail.f_pqid,

                f_tsyxzh: tbl_ld_khb_detail.f_tsyxzh,

                f_hth: tbl_ld_khb_detail.f_hth,

                f_sfzh: tbl_ld_khb_detail.f_sfzh,

                f_khrq: tbl_ld_khb_detail.f_khrq,

                f_sbbh: tbl_ld_khb_detail.f_sbbh,

                f_sbbhid: tbl_ld_khb_detail.f_sbbhid,

                f_bqzm: tbl_ld_khb_detail.f_bqzm,

                f_sqzm: tbl_ld_khb_detail.f_sqzm,

                f_bqsl: tbl_ld_khb_detail.f_bqsl,

                f_sqsl: tbl_ld_khb_detail.f_sqsl,

                f_qsqpjsl: tbl_ld_khb_detail.f_qsqpjsl,

                f_qlqpjsl: tbl_ld_khb_detail.f_qlqpjsl,

                f_ljgl: tbl_ld_khb_detail.f_ljgl,

                f_lxth: tbl_ld_khb_detail.f_lxth,

                f_sblx: tbl_ld_khb_detail.f_sblx,

                f_sblxid: tbl_ld_khb_detail.f_sblxid,

                f_jllx: tbl_ld_khb_detail.f_jllx,

                f_jllxid: tbl_ld_khb_detail.f_jllxid,

                f_tssbbh: tbl_ld_khb_detail.f_tssbbh,

                //新增

                f_ztsbh: tbl_ld_khb_detail.f_ztsbh,

                f_rs: tbl_ld_khb_detail.f_rs,

                f_sbkj: tbl_ld_khb_detail.f_sbkj,

                f_sbkjid: tbl_ld_khb_detail.f_sbkjid,

                f_sbfz: tbl_ld_khb_detail.f_sbfz,

                f_sbfzid: tbl_ld_khb_detail.f_sbfzid,

                f_ztyhh: tbl_ld_khb_detail.f_ztyhh,

                f_wxwybz: tbl_ld_khb_detail.f_wxwybz,

                f_zfbwybz: tbl_ld_khb_detail.f_zfbwybz,

                f_gdyhwybz: tbl_ld_khb_detail.f_gdyhwybz,

                f_yhm: tbl_ld_khb_detail.f_yhm,

                f_zhcbrq: tbl_ld_khb_detail.f_zhcbrq,

                f_ljqf: tbl_ld_khb_detail.f_ljqf,

                f_dxcsyy: tbl_ld_khb_detail.f_dxcsyy,

                f_sfdxcs: tbl_ld_khb_detail.f_sfdxcs,

                f_yqjmsf: tbl_ld_khb_detail.f_yqjmsf,

                f_yqjmpwf: tbl_ld_khb_detail.f_yqjmpwf,

                f_tjjzpwf: tbl_ld_khb_detail.f_tjjzpwf,
                f_tjjzsf: tbl_ld_khb_detail.f_tjjzsf,
                f_tssbbhid: tbl_ld_khb_detail.f_tssbbhid,
                f_nljgl: tbl_ld_khb_detail.f_nljgl,
                f_sqysl: tbl_ld_khb_detail.f_sqysl,
                f_jhysl: tbl_ld_khb_detail.f_jhysl,
                f_ickljgl: tbl_ld_khb_detail.f_ickljgl,
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
                    commonObj.updateLog(_serverModel, tbl_ld_khb_detail, 'tbl_ld_khb', that._pr_sys_id, 'tbl_ld_khb_detail', '水表信息修改程序', 'div_detail_【key】_【tablename】_detail', _clientInf, {
                        success: function ()
                        {
                            _serverModel = tbl_ld_khb_detail;
                        },
                        fail: function ()
                        {
                            _serverModel = tbl_ld_khb_detail;
                        }
                    });
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
            *  方法:f_khfz_onchange
            *  参数:changeEventParameter
            *  客户分组onchange事件
            */
            f_khfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },
             f_cbbh_onchange = function (e)
             {
                 var controlid = e.target.id;
             },




            /* 
            *  
            *  方法:f_yslx_onchange
            *  参数:changeEventParameter
            *  用水类型onchange事件
            */
            f_yslx_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            f_yhfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },


            /* 
            *  
            *  方法:f_sfjlbjf_onchange
            *  参数:event, state
            *  是否计量不计费切换事件
            */
            f_sfjlbjf_onchange = function (event, state)
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

            f_zhcbrq_date_onchange = function (e)
            {
                var controlid = e.target.id;
            },
            f_zhcbrq_time_onchange = function (e)
            {
                var controlid = e.target.id;
            },


            /* 
            *  
            *  方法:f_cbbh_onchange
            *  参数:changeEventParameter
            *  抄本编号onchange事件
            */
            f_cbbh_onchange = function (e)
            {


                controlObj.text('detail_f_cbyxm_tbl_ld_khb_detail', e.added.f_cbymc);

                controlObj.text('detail_f_cbyid_tbl_ld_khb_detail', e.added.f_cbyid);

                controlObj.text('detail_f_cbzq_tbl_ld_khb_detail', e.added.f_cbzq);

                controlObj.text('detail_f_cbmc_tbl_ld_khb_detail', e.added.f_cbmc);
            },
            //获取指定月份的最后一天
             getLastDay = function (year, month)
             {

                    var new_year = year;  //取当前的年份   
                    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）   
                    if(month>12)      //如果当前大于12月，则年份转到下一年   
                    {   
                        new_month -=12;    //月份减   
                        new_year++;      //年份增   
                    }   
                    var new_date = new Date(new_year,new_month, 1);        //取当年当月中的第一天
                    var ccc = (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
                    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期   

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
        _pr_khbh:'',
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_khb_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_khb_detail');

                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        $('#div_container_tbl_ld_pay_detail').load('../tbl_ld_jfb/tbl_ld_jfb_list_part.html', null, function ()
                                                        {
                                                      
                                                            tbl_ld_jfb_list_Obj._pr_listtype = '1';
                                                            tbl_ld_jfb_list_Obj._pr_khbhs = controlObj.text('detail_f_khbh_tbl_ld_khb_detail');
                                                            tbl_ld_jfb_list_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_container_tbl_ld_pay_detail').css('display', '');
                                                                },
                                                                fail: function (message)
                                                                {
                                                                    _blockMessage.show('加载缴费表执行失败<br/>' + ex.message, 'fail');
                                                                }
                                                            });
                                                        });


                                                        $('#div_container_tbl_ld_ickss_detail').load('../tbl_ld_ickss/tbl_ld_ickss_list_part.html', null, function ()
                                                        {
                                                            //tbl_ld_ickss_list_Obj._pr_searchcontent = null;
                                                            tbl_ld_ickss_list_Obj._pr_listtype = '1';
                                                            tbl_ld_ickss_list_Obj._pr_khbh = controlObj.text('detail_f_khbh_tbl_ld_khb_detail');
                                                            tbl_ld_ickss_list_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_container_tbl_ld_ickss_detail').css('display', '');
                                                                },
                                                                fail: function (message)
                                                                {
                                                                    _blockMessage.show('加载缴费表执行失败<br/>' + ex.message, 'fail');
                                                                }
                                                            });
                                                        });
                                                        $('#div_container_tbl_ld_cbiao_detail').load('../tbl_ld_cbiao/tbl_ld_cbiao_list_part.html', null, function ()
                                                        {
                                                            tbl_ld_cbiao_list_Obj._pr_listtype = '1';
                                                            tbl_ld_cbiao_list_Obj._pr_khbh = controlObj.text('detail_f_khbh_tbl_ld_khb_detail');
                                                            tbl_ld_cbiao_list_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_container_tbl_ld_cbiao_detail').css('display', '');
                                                                },
                                                                fail: function (message)
                                                                {
                                                                    _blockMessage.show('加载缴费表执行失败<br/>' + ex.message, 'fail');
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
                    success: function (tbl_ld_khb_detail)
                    {
                        _serverModel = tbl_ld_khb_detail;
                        setModel(tbl_ld_khb_detail, {
                            success: function ()
                            {


                                //完成part程序的呈现问题
                                //用户
                                var yhbsysid = controlObj.text('detail_f_yhbhid_tbl_ld_khb_detail');
                                if (yhbsysid != null && yhbsysid != "")
                                {
                                    tbl_ld_yhb_detail_Obj._pr_sys_id = yhbsysid;
                                    tbl_ld_yhb_detail_Obj.bindPage({
                                        success: function ()
                                        {
                                        }, fail: function () { }
                                    });
                                }

                                //水表
                                var sbbsysid = controlObj.text('detail_f_sbbhid_tbl_ld_khb_detail');
                                if (sbbsysid != null && sbbsysid != "")
                                {
                                    tbl_ld_sbb_detail_Obj._pr_sys_id = sbbsysid;
                                    tbl_ld_sbb_detail_Obj.bindPage({
                                        success: function ()
                                        {
                                        }, fail: function () { }
                                    });
                                }


                                //停水水表S
                                var tssbbh = controlObj.text('detail_f_tssbbh_tbl_ld_khb_detail');
                                if (tssbbh != null && tssbbh != "")
                                {
                                    tbl_ld_sbb_treelist_Obj._pr_sbbh = tssbbh;
                                    tbl_ld_sbb_treelist_Obj.bindTree({
                                        success: function ()
                                        {
                                        }, fail: function () { }
                                    });
                                }

                                //日志
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
                _ladda_btn_command_save.start();
                getModel({
                    success: function (tbl_ld_khb_detail)
                    {
                        checkModel(tbl_ld_khb_detail, {
                            success: function (tbl_ld_khb_detail)
                            {
                                updateData(tbl_ld_khb_detail, {
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
     *  方法:btn_command_log_onclick
     *  参数:
     *  查看日志按钮
     */
        btn_command_log_onclick: function ()
        {
            tbl_ld_log_modallist_Obj.bindGrid();

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
            //tbl_ld_kh_search_part_Obj.btn_command_search_onclick();
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
        end: function ()
        {
        },
        //显示或隐藏
        showHide: function (divid)
        {
            if ($('#li_' + divid).hasClass('menu-active'))
            {

            }
            else
            {
                $('.menu-active').removeClass('menu-active');
                $('.div-menu').addClass('hidden');
                $('#li_' + divid).addClass('menu-active')
                $('#' + divid).removeClass('hidden')
            }

        },
        showHideFValue: function (divid)
        {
            if ($('#' + divid).hasClass('hidden'))
            {
                $('#' + divid).removeClass('hidden')
            }
            else
            {
                $('#' + divid).addClass('hidden')
            }
        },
        //加载用户detail_part
        btn_detail_f_yhbh_onclick: function ()
        {
            var yhbh = controlObj.text('detail_f_yhbh_tbl_ld_khb_detail');
            if (yhbh.length <= 0)
            {
                _alertMessage.show('请先填写用户编号再进行加载', 'fail');
                return;
            }
            var k='';
            var querysql = {
                "tbl_ld_khb": "select count(*) count from TBL_LD_KHB  where sys_delflag='0' and f_ztid='0' and F_YHBH='" + yhbh + "'"
            };
            commonObj.querySqls(querysql, {
                success: function (count) {
                    k = count["tbl_ld_khb"][0];
                    if (k["count"] == 0) {
            //获取用水类型、抄本编号数据作为code下拉选项
            var sqlStringsJson = {
                            "tbl_ld_yhb": "select * from tbl_ld_yhb where sys_delflag='0' and (f_ztid='0' or f_ztid='1') and F_YHBH='" + yhbh + "'"
            };

            commonObj.querySqls(sqlStringsJson, {
                            success: function (resultJson) {
                                if (resultJson["tbl_ld_yhb"].length > 0) {
                        resultJson = resultJson["tbl_ld_yhb"][0];
                        controlObj.text('detail_f_yhbhid_tbl_ld_khb_detail', resultJson["sys_id"]);

                        controlObj.text('detail_f_jfm_tbl_ld_khb_detail', resultJson["f_jfm"]);

                        controlObj.text('detail_f_yhfz_tbl_ld_khb_detail', resultJson["f_yhfz"]);

                        controlObj.text('detail_f_yhfzid_tbl_ld_khb_detail', resultJson["f_yhfzid"]);

                        controlObj.text('detail_f_dz_tbl_ld_khb_detail', resultJson["f_dz"]);

                        controlObj.text('detail_f_sbdz_tbl_ld_khb_detail', resultJson["f_sbdz"]);
                        controlObj.text('detail_f_ye_tbl_ld_khb_detail', resultJson["f_ye"]);

                        controlObj.text('detail_f_dh_tbl_ld_khb_detail', resultJson["f_dh"]);

                        controlObj.text('detail_f_dy_tbl_ld_khb_detail', resultJson["f_dy"]);

                        controlObj.text('detail_f_dyid_tbl_ld_khb_detail', resultJson["f_dyid"]);

                        controlObj.text('detail_f_sc_tbl_ld_khb_detail', resultJson["f_sc"]);

                        controlObj.text('detail_f_scid_tbl_ld_khb_detail', resultJson["f_scid"]);

                        controlObj.text('detail_f_qy_tbl_ld_khb_detail', resultJson["f_qy"]);

                        controlObj.text('detail_f_qyid_tbl_ld_khb_detail', resultJson["f_qyid"]);

                        controlObj.text('detail_f_pq_tbl_ld_khb_detail', resultJson["f_pq"]);

                        controlObj.text('detail_f_pqid_tbl_ld_khb_detail', resultJson["f_pqid"]);

                        controlObj.text('detail_f_tsyxzh_tbl_ld_khb_detail', resultJson["f_tsyxzh"]);

                        controlObj.text('detail_f_hth_tbl_ld_khb_detail', resultJson["f_htbh"]);

                        controlObj.text('detail_f_sfzh_tbl_ld_khb_detail', resultJson["f_sfzh"]);

                        controlObj.text('detail_f_khrq_tbl_ld_khb_detail', resultJson["f_khrq"]);

                        //新增
                        controlObj.text('detail_f_yhm_tbl_ld_khb_detail', resultJson["f_yhm"]);

                        controlObj.text('detail_f_ztyhh_tbl_ld_khb_detail', resultJson["f_ztyhh"]);

                        controlObj.text('detail_f_wxwybz_tbl_ld_khb_detail', resultJson["f_wxwybz"]);

                        controlObj.text('detail_f_gdyhwybz_tbl_ld_khb_detail', resultJson["f_gdyxwybz"]);

                        controlObj.text('detail_f_zfbwybz_tbl_ld_khb_detail', resultJson["f_zfbwybz"]);

                        tbl_ld_yhb_detail_Obj._pr_sys_id = resultJson["sys_id"];
                        tbl_ld_yhb_detail_Obj.bindPage({
                            success: function ()
                            { }, fail: function () { }
                               
                        });                       

                                } else {
                        _alertMessage.show('您输入的用户编号不存在<br/>', 'fail');
                    }

                },
                            fail: function () {
                    _alertMessage.show('加载失败<br/>', 'fail');
                            }
                        });
                    } else {
                        _alertMessage.show('所选用户已被占用', 'fail');
                    }
                }
            });

        },

        //加载水表detail_part
        btn_detail_f_sbbh_onclick: function ()
        {
            
            var sbbh = controlObj.text('detail_f_sbbh_tbl_ld_khb_detail');
            if (sbbh.length <= 0)
            {
                _alertMessage.show('请先填写水表编号再进行加载', 'fail');
                return;
            }
            var k = '';
            var querysql = {
                "tbl_ld_sbb": "select count(*) count from TBL_LD_KHB  where F_SBBH='" + sbbh + "'"
            };
            commonObj.querySqls(querysql, {
                success: function (count) {
                    k = count["tbl_ld_sbb"][0];
                    if (k["count"] == 0) {
            //获取用水类型、抄本编号数据作为code下拉选项
                        var sqlStringsJson = {

                            "tbl_ld_sbb": "select * from tbl_ld_sbb where sys_delflag='0' and (f_ztid='0' or f_ztid='4')and F_SBBH='" + sbbh + "'"

                        };

            commonObj.querySqls(sqlStringsJson, {
                            success: function (resultJson) {
                                if (resultJson["tbl_ld_sbb"].length > 0) {
                        resultJson = resultJson["tbl_ld_sbb"][0];

                        controlObj.text('detail_f_sbbhid_tbl_ld_khb_detail', resultJson["sys_id"]);

                        controlObj.text('detail_f_bqzm_tbl_ld_khb_detail', resultJson["f_bqzm"]);

                        controlObj.text('detail_f_sqzm_tbl_ld_khb_detail', resultJson["f_sqzm"]);

                        controlObj.text('detail_f_bqsl_tbl_ld_khb_detail', resultJson["f_bqsl"]);

                        controlObj.text('detail_f_sqsl_tbl_ld_khb_detail', resultJson["f_sqsl"]);

                        controlObj.text('detail_f_qsqpjsl_tbl_ld_khb_detail', resultJson["f_qsqpjsl"]);

                        controlObj.text('detail_f_qlqpjsl_tbl_ld_khb_detail', resultJson["f_qlqpjsl"]);

                        //controlObj.text('detail_f_ljgl_tbl_ld_khb_detail', resultJson["f_ljgl"]);

                        controlObj.text('detail_f_lxth_tbl_ld_khb_detail', resultJson["f_lxth"]);

                        controlObj.text('detail_f_sblx_tbl_ld_khb_detail', resultJson["f_sblx"]);

                        controlObj.text('detail_f_sblxid_tbl_ld_khb_detail', resultJson["f_sblxid"]);

                        controlObj.text('detail_f_jllx_tbl_ld_khb_detail', resultJson["f_jllx"]);

                        controlObj.text('detail_f_jllxid_tbl_ld_khb_detail', resultJson["f_jllxid"]);

                        //新增


                        controlObj.text('detail_f_ztsbh_tbl_ld_khb_detail', resultJson["f_ztsbh"]);

                        controlObj.text('detail_f_rs_tbl_ld_khb_detail', resultJson["f_rs"]);

                        controlObj.text('detail_f_sbfz_tbl_ld_khb_detail', resultJson["f_sbfz"]);

                        controlObj.text('detail_f_sbdz_tbl_ld_khb_detail', resultJson["f_sbdz"]);
                        controlObj.text('detail_f_ye_tbl_ld_khb_detail', resultJson["f_ye"]);
                        controlObj.text('detail_f_sbfzid_tbl_ld_khb_detail', resultJson["f_sbfzid"]);

                        controlObj.text('detail_f_sbkj_tbl_ld_khb_detail', resultJson["f_sbkj"]);

                        controlObj.text('detail_f_sbkjid_tbl_ld_khb_detail', resultJson["f_sbkjid"]);
                        //controlObj.text('detail_f_nljgl_tbl_ld_khb_detail', resultJson["f_nljgl"]);
                        
                        tbl_ld_sbb_detail_Obj._pr_sys_id = resultJson["sys_id"];
                        //最后抄表底数

                        var cszm = resultJson["f_cszm"];
                        var bqzm = resultJson["f_bqzm"];
                        if (cszm > bqzm)
                        {
                            controlObj.text('detail_f_bqzm_tbl_ld_khb_detail', cszm);
                        }
                        else
                        {
                            controlObj.text('detail_f_bqzm_tbl_ld_khb_detail', bqzm);
                        }
                        tbl_ld_sbb_detail_Obj.bindPage({
                            success: function ()
                            {

                            }
                        });



                    } else
                    {
                        _alertMessage.show('您输入的水表编号不存在！<br/>', 'fail');
                    }

                },
                fail: function ()
                {
                    _alertMessage.show('加载失败<br/>', 'fail');
                            }
                        });
                    } else {
                        _alertMessage.show('所选水表已被占用', 'fail');
                    }
                }
            });

        },

        //加载停水水表treelist_part
        btn_detail_f_tssbbh_onclick: function ()
        {

            var tssbbh = controlObj.text('detail_f_tssbbh_tbl_ld_khb_detail');
            if (tssbbh.length <= 0)
            {
                _alertMessage.show('请先填写停水水表编号再进行加载', 'fail');
                return;
            }


            //获取用水类型、抄本编号数据作为code下拉选项
            var sqlStringsJson = {
                "tbl_ld_sbb": "select sys_id from tbl_ld_sbb where sys_delflag='0' and f_sbbh in (" + tssbbh + ")"
            };
            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    if (resultJson["tbl_ld_sbb"].length > 0)
                    {
                        var array = resultJson["tbl_ld_sbb"];
                        var sys_ids = '';
                        $.each(array, function (i, u)
                        {
                            sys_ids += u["sys_id"] + ",";
                        });
                        sys_ids = sys_ids.trimEnd(',');

                        controlObj.text('detail_f_tssbbhid_tbl_ld_khb_detail', sys_ids);

                    } else
                    {
                        _alertMessage.show('您输入的水表编号不存在！<br/>', 'fail');
                    }
                },
                fail: function ()
                {
                    _alertMessage.show('加载失败<br/>', 'fail');
                }
            });
            tbl_ld_sbb_treelist_Obj._pr_sbbh = tssbbh.replaceAll("^", ",");
            tbl_ld_sbb_treelist_Obj.bindTree({ success: function () { } });


        },
        //=========================补充代码=======================
        btn_manyvalues_save_onclick: function (valueInput, allValueInput, targetDiv, columnValue)
        {

            if (valueInput == '')
            {
                var value = columnValue;
                var cc = $('#' + allValueInput).val();
                //将'A,value,B'替换成'A,B'; 将'A,value'替换成'A';将'value,B'替换成'B';将'value'替换成''
                cc = cc.replaceAll(',' + value + ',', ',').replaceAll(',' + value, '').replaceAll(value + ',', '').replaceAll(value, '');
                $('#' + allValueInput).val(cc);
            }
            else
            {
                if ($('#' + valueInput).val() != '' && $('#' + allValueInput).val().indexOf($('#' + valueInput).val()) == -1)
                {
                    var cc = $('#' + allValueInput).val() == '' ? $('#' + valueInput).val() : ($('#' + allValueInput).val() + ',' + $('#' + valueInput).val());
                    $('#' + allValueInput).val(cc);
                    $('#' + valueInput).val('');
                }
            }
            that.initManyValuesDiv(valueInput, allValueInput, targetDiv);
            return;

        },
        initManyValuesDiv: function (valueInput, allValueInput, targetDiv)
        {

            var htmlStr = '';
            //$('#' + targetDiv).removeClass('');
            $('#' + targetDiv).html('');
            var values = $('#' + allValueInput).val();
            var cc = values.split(',');
            $.each(cc, function (i, u)
            {
                if (cc[i] != '' && that._pr_pagetype == '1')
                {
                    htmlStr += '<br/><span onclick="tbl_ld_khb_detail_Obj.btn_manyvalues_save_onclick(\'\',\'' + allValueInput + '\',\'' + targetDiv + '\',\'' + cc[i] + '\');"  class="alert-success div-my-manyvalues">' + cc[i] + '&times;</span>&nbsp;&nbsp;';
                } else
                {
                    htmlStr += '<br/><span disabled  class="alert-success div-my-manyvalues">' + cc[i] + '</span>&nbsp;&nbsp;';
                }
            });
            $('#' + targetDiv).html(htmlStr);
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_khb_detail_Obj.init();
});




