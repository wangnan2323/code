

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_cbiao_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_cbiao.asmx/',
    _baseCodeHashMap = null,
    _validateMessage_save = null,
    _validateMessage_submit = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_submit = null,
    _ladda_btn_command_rollback = null,

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

            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '1';
            }


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


        codeServiceId += "0543^";

        codeServiceId += "0544^";

        codeServiceId += "0545^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();


                    _baseCodeHashMap.put('codeservice_0543', resultArray['0543']);

                    _baseCodeHashMap.put('codeservice_0544', resultArray['0544']);

                    _baseCodeHashMap.put('codeservice_0545', resultArray['0545']);
                    var sqlStringsJson = {

                        "cby": 'select u.u_id as id,u.u_name as text from t_user u ,t_userrole_relation r where u.u_id = r.u_id and r.r_id=\'2019\''
                    };
                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {
                            _baseCodeHashMap.put('servicecode_cby', resultJson['cby']);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('querySqls<br/>' + message, 'fail');
                        }
                    });
                    //callBackFunction.success();
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


            var codeService_0543 = _baseCodeHashMap.get('codeservice_0543');

            var codeService_0544 = _baseCodeHashMap.get('codeservice_0544');

            var codeService_0545 = _baseCodeHashMap.get('codeservice_0545');
            var codeService_cby = _baseCodeHashMap.get('servicecode_cby');


            controlObj.datetimeinit('detail_f_cbsj_tbl_ld_cbiao_detail_date', 'detail_f_cbsj_tbl_ld_cbiao_detail_time', f_cbsj_date_onchange, f_cbsj_time_onchange);

            controlObj.singledropdownlistinit('detail_f_bk_tbl_ld_cbiao_detail', codeService_0543, f_bk_onchange);

            controlObj.singledropdownlistinit('detail_f_cbyname_tbl_ld_cbiao_detail', codeService_cby, f_cbyname_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_cbiao_detail', codeService_0544, f_zt_onchange);


            controlObj.singledropdownlistinit('detail_f_ly_tbl_ld_cbiao_detail', codeService_0545, f_ly_onchange);


            controlObj.datetimeinit('detail_f_pgsj_tbl_ld_cbiao_detail_date', 'detail_f_pgsj_tbl_ld_cbiao_detail_time', f_pgsj_date_onchange, f_pgsj_time_onchange);

            controlObj.datetimeinit('detail_f_jfsj_tbl_ld_cbiao_detail_date', 'detail_f_jfsj_tbl_ld_cbiao_detail_time', f_jfsj_date_onchange, f_jfsj_time_onchange);


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
        try
        {
            var isDisable = true;

            if (that._pr_pagetype == '2')
            {
                isDisable = true;

                $('#div_command_0').addClass('hidden');
                $('#div_command_1').addClass('hidden');
                $('#div_command_239').removeClass('hidden');
            }
            else
            {
                //设置按钮行
                var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cbiao_detail');
                switch (ztid)
                {
                    case "0":
                        {
                            isDisable = false;
                            $('#div_command_0').removeClass('hidden');
                            $('#div_command_1').addClass('hidden');
                            $('#div_command_239').addClass('hidden');
                        }
                        break;
                    case "1":
                        {
            
                            isDisable = true;
                            $('#div_command_0').addClass('hidden');
                            $('#div_command_1').removeClass('hidden');
                            $('#div_command_239').addClass('hidden');


                            if (that._pr_isadmin == '0')
                            {
                                $('#btn_command_rollback_tbl_ld_cbiao_detail').removeClass('hidden');
                            }
                            else
                            {
                                $('#btn_command_rollback_tbl_ld_cbiao_detail').addClass('hidden');
                            }
                        }

                        break;
                    case "2":
                    case "3":
                    case "9":
                        {
                            isDisable = true;
                      

                            $('#div_command_0').addClass('hidden');
                            $('#div_command_1').addClass('hidden');
                            $('#div_command_239').removeClass('hidden');
                        }
                        break;
                }
            }

            var ly = controlObj.singledropdownlistid("detail_f_ly_tbl_ld_cbiao_detail");
            if (ly == "05450003")
            {
                $('#btn_command_save_tbl_ld_cbiao_detail').addClass('hide');
                $('#btn_command_submit_tbl_ld_cbiao_detail').addClass('hide');
                $('#btn_command_rollback_tbl_ld_cbiao_detail').addClass('hide');

            }
            controlObj.textdisable('detail_f_cb_cbbh_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_sqzm_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_sqsl_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_qsqpjsl_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_qlqpjsl_tbl_ld_cbiao_detail', true);
            controlObj.singledropdownlistdisable('detail_f_cbyname_tbl_ld_cbiao_detail', true);
            controlObj.datetimedisable('detail_f_cbsj_tbl_ld_cbiao_detail_date', 'detail_f_cbsj_tbl_ld_cbiao_detail_time', true);
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_cbiao_detail', true);
            controlObj.singledropdownlistdisable('detail_f_ly_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_yhm_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_jfm_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_dh_tbl_ld_cbiao_detail', true);

            controlObj.textdisable('detail_f_dyjtsl_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_dyjtsf_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_dejtsl_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_dejtsf_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_dsjtsl_tbl_ld_cbiao_detail', true);
            controlObj.textdisable('detail_f_dsjtsf_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_khfz_tbl_ld_cbiao_detail', false);
            //controlObj.textdisable('detail_f_khfzid_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_sf_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_pwf_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_sjljsyl_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_jmje_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_jmbh_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_jmbhid_tbl_ld_cbiao_detail', true);
            //controlObj.textdisable('detail_f_sfsfts_tbl_ld_cbiao_detail', true);

            if (ly == "05450003")
            {
                controlObj.textdisable('detail_f_cb_cbbhid_tbl_ld_cbiao_detail', true);

                controlObj.textdisable('detail_f_khbh_tbl_ld_cbiao_detail', true);
                controlObj.textdisable('detail_f_khbhid_tbl_ld_cbiao_detail', true);
                controlObj.singledropdownlistdisable('detail_f_bk_tbl_ld_cbiao_detail', true);
                controlObj.textdisable('detail_f_bqzm_tbl_ld_cbiao_detail', true);
            }
            else
            {
            controlObj.textdisable('detail_f_cb_cbbhid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_khbh_tbl_ld_cbiao_detail', isDisable);
                controlObj.textdisable('detail_f_khbhid_tbl_ld_cbiao_detail', isDisable);
                controlObj.singledropdownlistdisable('detail_f_bk_tbl_ld_cbiao_detail', isDisable);
                controlObj.textdisable('detail_f_bqzm_tbl_ld_cbiao_detail', isDisable);
            }
            if (isDisable)
            {
                $('#btn_detail_f_khbh_tbl_ld_cbiao_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_cbiao_detail').removeAttr('disabled');
            }





            controlObj.textdisable('detail_f_bqsl_tbl_ld_cbiao_detail', true);
            if (isDisable)
            {
                $('#btn_detail_f_bqsl_tbl_ld_cbiao_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_bqsl_tbl_ld_cbiao_detail').removeAttr('disabled');
            }

            controlObj.textdisable('detail_f_cbyphoto_tbl_ld_cbiao_detail', isDisable);

          


            controlObj.textdisable('detail_f_bz_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_sbbh_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_sbbhid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_sblx_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_sblxid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_yslx_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_yslxid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_lxtkhh_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_cbbh_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_cbbhid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_cbmc_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_yhbh_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_yhbhid_tbl_ld_cbiao_detail', isDisable);

        

            controlObj.textdisable('detail_f_dz_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_dy_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_dyid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_sc_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_scid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_qy_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_qyid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pq_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pqid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pgbh_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pgbhid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pgr_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pgrid_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_pgpcmc_tbl_ld_cbiao_detail', isDisable);

            controlObj.datetimedisable('detail_f_pgsj_tbl_ld_cbiao_detail_date', 'detail_f_pgsj_tbl_ld_cbiao_detail_time', isDisable);

            controlObj.textdisable('detail_f_jfbh_tbl_ld_cbiao_detail', isDisable);

            controlObj.textdisable('detail_f_jfbhid_tbl_ld_cbiao_detail', isDisable);

            controlObj.datetimedisable('detail_f_jfsj_tbl_ld_cbiao_detail_date', 'detail_f_jfsj_tbl_ld_cbiao_detail_time', isDisable);

            controlObj.textdisable('detail_f_bqje_tbl_ld_cbiao_detail', isDisable);
            controlObj.textdisable('detail_f_kj_tbl_ld_cbiao_detail', isDisable);
            controlObj.textdisable('detail_f_kjid_tbl_ld_cbiao_detail', isDisable);
            controlObj.textdisable('detail_f_ztkhh_tbl_ld_cbiao_detail', isDisable);
            controlObj.textdisable('detail_f_ztsbh_tbl_ld_cbiao_detail', isDisable);
            controlObj.textdisable('detail_f_ztyhh_tbl_ld_cbiao_detail', isDisable);
            controlObj.textdisable('detail_f_rs_tbl_ld_cbiao_detail', isDisable);
            
            //验证是不是可以回滚
            if ($('#btn_command_rollback_tbl_ld_cbiao_detail').hasClass('hidden') || $('#div_command_1').hasClass('hidden'))
            {
            }
            else
            {
            //ajax.IsCanRollBack.sys_id
       
                var data = {
                    sys_id: that._pr_sys_id,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'IsCanRollBack', data, {
                    success: function (message)
                    {
                        if (message == 'true')
                        {
                        }
                        else
                        {
                            $('#btn_command_rollback_tbl_ld_cbiao_detail').addClass('hidden');
                        }
                    },
                    fail: function (message)
                    {
                        $('#btn_command_rollback_tbl_ld_cbiao_detail').addClass('hidden');
                    }
                });
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
    *  参数:tbl_ld_cbiao_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_cbiao_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_value10);

            controlObj.text('detail_f_cb_cbbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cb_cbbh);

            controlObj.text('detail_f_cb_cbbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cb_cbbhid);

            controlObj.text('detail_f_khbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_khbh);

            controlObj.text('detail_f_khbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_khbhid);

            controlObj.text('detail_f_sqzm_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sqzm);

            controlObj.text('detail_f_bqzm_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_bqzm);

            controlObj.text('detail_f_bqsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_bqsl);

            controlObj.text('detail_f_sqsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sqsl);

            controlObj.text('detail_f_qsqpjsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_qsqpjsl);

            controlObj.text('detail_f_qlqpjsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_qlqpjsl);

            //controlObj.text('detail_f_cbyname_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbyname);
            controlObj.singledropdownlistid('detail_f_cbyname_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbyid);

            //controlObj.text('detail_f_cbyid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbyid);

            controlObj.text('detail_f_cbyphoto_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbyphoto);


            controlObj.datetime('detail_f_cbsj_tbl_ld_cbiao_detail_date', 'detail_f_cbsj_tbl_ld_cbiao_detail_time', tbl_ld_cbiao_detail.f_cbsj);

            controlObj.singledropdownlistid('detail_f_bk_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_bkid);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_ztid);

            controlObj.singledropdownlistid('detail_f_ly_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_lyid);

            controlObj.text('detail_f_bz_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_bz.returnStringRN());

            controlObj.text('detail_f_sbbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sbbh);

            controlObj.text('detail_f_sbbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sbbhid);

            controlObj.text('detail_f_sblx_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sblx);

            controlObj.text('detail_f_sblxid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sblxid);

            controlObj.text('detail_f_yslx_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_yslx);

            controlObj.text('detail_f_yslxid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_yslxid);

            controlObj.text('detail_f_lxtkhh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_lxtkhh);

            controlObj.text('detail_f_cbbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbbh);

            controlObj.text('detail_f_cbbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbbhid);

            controlObj.text('detail_f_cbmc_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_cbmc);

            controlObj.text('detail_f_yhbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_yhbh);

            controlObj.text('detail_f_yhbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_yhbhid);

            controlObj.text('detail_f_yhm_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_yhm);

            controlObj.text('detail_f_jfm_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_jfm);

            controlObj.text('detail_f_dh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dh);

            controlObj.text('detail_f_khfz_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_khfz);
            controlObj.text('detail_f_khfzid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_khfzid);
            controlObj.text('detail_f_sf_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sf);
            controlObj.text('detail_f_pwf_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pwf);
            controlObj.text('detail_f_sjljsyl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sjljsyl);
            controlObj.text('detail_f_jmje_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_jmje);
            controlObj.text('detail_f_jmbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_jmbhid);
            controlObj.text('detail_f_jmbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_jmbh);
            controlObj.text('detail_f_sfsfts_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sfsfts);
            controlObj.text('detail_f_dz_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dz);

            controlObj.text('detail_f_dy_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dy);

            controlObj.text('detail_f_dyid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dyid);

            controlObj.text('detail_f_sc_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sc);

            controlObj.text('detail_f_scid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_scid);

            controlObj.text('detail_f_qy_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_qy);

            controlObj.text('detail_f_qyid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_qyid);

            controlObj.text('detail_f_pq_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pq);

            controlObj.text('detail_f_pqid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pqid);

            controlObj.text('detail_f_pgbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pgbh);

            controlObj.text('detail_f_pgbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pgbhid);

            controlObj.text('detail_f_pgr_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pgr);

            controlObj.text('detail_f_pgrid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pgrid);

            controlObj.text('detail_f_pgpcmc_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_pgpcmc);


            controlObj.datetime('detail_f_pgsj_tbl_ld_cbiao_detail_date', 'detail_f_pgsj_tbl_ld_cbiao_detail_time', tbl_ld_cbiao_detail.f_pgsj);

            controlObj.text('detail_f_jfbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_jfbh);

            controlObj.text('detail_f_jfbhid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_jfbhid);


            controlObj.datetime('detail_f_jfsj_tbl_ld_cbiao_detail_date', 'detail_f_jfsj_tbl_ld_cbiao_detail_time', tbl_ld_cbiao_detail.f_jfsj);

            controlObj.text('detail_f_bqje_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_bqje);
            controlObj.text('detail_f_kj_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_kj);
            controlObj.text('detail_f_kjid_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_kjid);
            controlObj.text('detail_f_ztkhh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_ztkhh);
            controlObj.text('detail_f_ztsbh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_ztsbh);
            controlObj.text('detail_f_ztyhh_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_ztyhh);
            controlObj.text('detail_f_rs_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_rs);

            controlObj.text('detail_f_sfjl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_sfjl);

            controlObj.text('detail_f_dyjtsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dyjtsl);
            controlObj.text('detail_f_dyjtsf_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dyjtsf);
            controlObj.text('detail_f_dejtsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dejtsl);
            controlObj.text('detail_f_dejtsf_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dejtsf);
            controlObj.text('detail_f_dsjtsl_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dsjtsl);
            controlObj.text('detail_f_dsjtsf_tbl_ld_cbiao_detail', tbl_ld_cbiao_detail.f_dsjtsf);

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
    *  获取页面数据，返回对象tbl_ld_cbiao_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_cbiao_detail = new Object();


            tbl_ld_cbiao_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_cb_cbbh = controlObj.text('detail_f_cb_cbbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_cb_cbbhid = controlObj.text('detail_f_cb_cbbhid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sqzm = controlObj.text('detail_f_sqzm_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_bqzm = controlObj.text('detail_f_bqzm_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_bqsl = controlObj.text('detail_f_bqsl_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sqsl = controlObj.text('detail_f_sqsl_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_qsqpjsl = controlObj.text('detail_f_qsqpjsl_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_qlqpjsl = controlObj.text('detail_f_qlqpjsl_tbl_ld_cbiao_detail');


            //tbl_ld_cbiao_detail.f_cbyname = controlObj.text('detail_f_cbyname_tbl_ld_cbiao_detail');


            //tbl_ld_cbiao_detail.f_cbyid = controlObj.text('detail_f_cbyid_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_cbyname = controlObj.singledropdownlist('detail_f_cbyname_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_cbyid = controlObj.singledropdownlistid('detail_f_cbyname_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_cbyphoto = controlObj.text('detail_f_cbyphoto_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_cbsj = controlObj.datetime('detail_f_cbsj_tbl_ld_cbiao_detail_date', 'detail_f_cbsj_tbl_ld_cbiao_detail_time');

            tbl_ld_cbiao_detail.f_bk = controlObj.singledropdownlist('detail_f_bk_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_bkid = controlObj.singledropdownlistid('detail_f_bk_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_ly = controlObj.singledropdownlist('detail_f_ly_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_lyid = controlObj.singledropdownlistid('detail_f_ly_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_yslx = controlObj.text('detail_f_yslx_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_yslxid = controlObj.text('detail_f_yslxid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_lxtkhh = controlObj.text('detail_f_lxtkhh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_cbbhid = controlObj.text('detail_f_cbbhid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_cbmc = controlObj.text('detail_f_cbmc_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_khfz = controlObj.text('detail_f_khfz_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_khfzid = controlObj.text('detail_f_khfzid_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_sf = controlObj.text('detail_f_sf_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_pwf = controlObj.text('detail_f_pwf_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_sjljsyl = controlObj.text('detail_f_sjljsyl_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_jmje = controlObj.text('detail_f_jmje_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_jmbh = controlObj.text('detail_f_jmbh_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_jmbhid = controlObj.text('detail_f_jmbhid_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_sfsfts = controlObj.text('detail_f_sfsfts_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pgbh = controlObj.text('detail_f_pgbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pgbhid = controlObj.text('detail_f_pgbhid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pgr = controlObj.text('detail_f_pgr_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pgrid = controlObj.text('detail_f_pgrid_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_pgpcmc = controlObj.text('detail_f_pgpcmc_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_pgsj = controlObj.datetime('detail_f_pgsj_tbl_ld_cbiao_detail_date', 'detail_f_pgsj_tbl_ld_cbiao_detail_time');


            tbl_ld_cbiao_detail.f_jfbh = controlObj.text('detail_f_jfbh_tbl_ld_cbiao_detail');


            tbl_ld_cbiao_detail.f_jfbhid = controlObj.text('detail_f_jfbhid_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_jfsj = controlObj.datetime('detail_f_jfsj_tbl_ld_cbiao_detail_date', 'detail_f_jfsj_tbl_ld_cbiao_detail_time');


            tbl_ld_cbiao_detail.f_bqje = controlObj.text('detail_f_bqje_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_kj = controlObj.text('detail_f_kj_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_kjid = controlObj.text('detail_f_kjid_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_ztkhh = controlObj.text('detail_f_ztkhh_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_ztsbh = controlObj.text('detail_f_ztsbh_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_ztyhh = controlObj.text('detail_f_ztyhh_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_sfjl = controlObj.text('detail_f_sfjl_tbl_ld_cbiao_detail');

            tbl_ld_cbiao_detail.f_dyjtsl = controlObj.text('detail_f_dyjtsl_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_dyjtsf = controlObj.text('detail_f_dyjtsf_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_dejtsl = controlObj.text('detail_f_dejtsl_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_dejtsf = controlObj.text('detail_f_dejtsf_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_dsjtsl = controlObj.text('detail_f_dsjtsl_tbl_ld_cbiao_detail');
            tbl_ld_cbiao_detail.f_dsjtsf = controlObj.text('detail_f_dsjtsf_tbl_ld_cbiao_detail');

            callBackFunction.success(tbl_ld_cbiao_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel_Save
    *  参数:tbl_ld_cbiao_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage_save，校验结果分success，fail
    */
    checkModel_Save = function (tbl_ld_cbiao_detail, validateMessage, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();


            if (tbl_ld_cbiao_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_cb_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cb_cbbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_cb_cbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cb_cbbhid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

           

            if (tbl_ld_cbiao_detail.f_khbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_sqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbiao_detail.f_sqzm))
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_cbiao_detail', '必须是数字');
            }

       




            if (tbl_ld_cbiao_detail.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_bqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbiao_detail.f_bqzm))
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_cbiao_detail', '必须是数字');
            }

         




            if (tbl_ld_cbiao_detail.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

         
            if (tbl_ld_cbiao_detail.f_bqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbiao_detail.f_bqsl))
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_cbiao_detail', '必须是数字');
            }




            if (tbl_ld_cbiao_detail.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_sqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbiao_detail.f_sqsl))
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_cbiao_detail', '必须是数字');
            }




            if (tbl_ld_cbiao_detail.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_qsqpjsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbiao_detail.f_qsqpjsl))
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_cbiao_detail', '必须是数字');
            }




            if (tbl_ld_cbiao_detail.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_qlqpjsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cbiao_detail.f_qlqpjsl))
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_cbiao_detail', '必须是数字');
            }




            if (tbl_ld_cbiao_detail.f_cbyname.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyname_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

         


            if (tbl_ld_cbiao_detail.f_cbyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_cbyphoto.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyphoto_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

           



            if (tbl_ld_cbiao_detail.f_bk.length > 200)
            {
                errorMessageHansMap.put('detail_f_bk_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

           



            if (tbl_ld_cbiao_detail.f_ly.length > 200)
            {
                errorMessageHansMap.put('detail_f_ly_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

         


            if (tbl_ld_cbiao_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (tbl_ld_cbiao_detail.f_lxtkhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_lxtkhh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbmc_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_yhbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_yhm.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_jfm.length > 200)
            {
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_dh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_dz.length > 200)
            {
                errorMessageHansMap.put('detail_f_dz_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_dy.length > 200)
            {
                errorMessageHansMap.put('detail_f_dy_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_dyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_dyid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_sc.length > 200)
            {
                errorMessageHansMap.put('detail_f_sc_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_scid.length > 200)
            {
                errorMessageHansMap.put('detail_f_scid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_qy.length > 200)
            {
                errorMessageHansMap.put('detail_f_qy_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_qyid.length > 200)
            {
                errorMessageHansMap.put('detail_f_qyid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pq.length > 200)
            {
                errorMessageHansMap.put('detail_f_pq_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pqid.length > 200)
            {
                errorMessageHansMap.put('detail_f_pqid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pgbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pgbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgbhid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pgr.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgr_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pgrid.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgrid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_pgpcmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_pgpcmc_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_cbiao_detail.f_jfbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_jfbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cbiao_detail.f_jfbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_jfbhid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_cbiao_detail.f_bqje.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqje_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_kj.length > 200)
            {
                errorMessageHansMap.put('detail_f_kj_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_kjid.length > 200)
            {
                errorMessageHansMap.put('detail_f_kjid_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_ztkhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztkhh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');

            }
            if (tbl_ld_cbiao_detail.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztsbh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_ztyhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztyhh_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_dyjtsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_dyjtsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_dyjtsf.length > 200)
            {
                errorMessageHansMap.put('detail_f_dyjtsf_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_dejtsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_dejtsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_dejtsf.length > 200)
            {
                errorMessageHansMap.put('detail_f_dejtsf_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cbiao_detail.f_dsjtsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_dsjtsl_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cbiao_detail.f_dsjtsf.length > 200)
            {
                errorMessageHansMap.put('detail_f_dsjtsf_tbl_ld_cbiao_detail', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (errorMessageHansMap.keys().length > 0)
            {
                validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                validateMessage.hidden();
                callBackFunction.success(tbl_ld_cbiao_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }

    },


        /* 
    *  
    *  方法:checkModel_Submit
    *  参数:tbl_ld_cbiao_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage_submit，校验结果分success，fail
    */
    checkModel_Submit = function (tbl_ld_cbiao_detail, validateMessage, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if (tbl_ld_cbiao_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_cbiao_detail.f_sqzm.length < 1)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_cbiao_detail.f_bqzm.length < 1)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            

            if (tbl_ld_cbiao_detail.f_bqsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            

            if (tbl_ld_cbiao_detail.f_cbyname.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbyname_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_cbiao_detail.f_cbsj.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbsj_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_cbiao_detail.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }



            if (tbl_ld_cbiao_detail.f_ly.length < 1)
            {
                errorMessageHansMap.put('detail_f_ly_tbl_ld_cbiao_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (parseFloat(tbl_ld_cbiao_detail.f_bqsl) != parseFloat(tbl_ld_cbiao_detail.f_bqzm - parseFloat(tbl_ld_cbiao_detail.f_sqzm) ))
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_cbiao_detail', '当月水量未进行计算');
            
            }


            if (errorMessageHansMap.keys().length > 0)
            {

                validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                validateMessage.hidden();
                callBackFunction.success(tbl_ld_cbiao_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_khfz^f_khfzid^f_sf^f_pwf^f_sjljsyl^f_jmje^f_jmbh^f_jmbhid^f_sfsfts^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_yhbh^f_yhbhid^f_kj^f_kjid^f_ztkhh^f_ztsbh^f_ztyhh^f_rs^f_sfjl^sys_id^f_dyjtsl^f_dyjtsf^f_dejtsl^f_dejtsf^f_dsjtsl^f_dsjtsf';
            var pageSizeString = '';
            var pageIndexString = '';
            var data = {
                whereString: whereClause,
                cxzxsjString: "true",
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
                    if (messageJson.rows.length > 0)
                    {
                        callbackFunction.success(messageJson.rows[0]);
                    }
                    else
                    {
                        _blockMessage.show('没有查询到指定的数据<br/>即将返回来源页面', 'fail');
                        setTimeout(function ()
                        {
                            that.btn_command_cancle_onclick();

                        }, 1000);
                    }
                    
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
        *  参数:tbl_ld_cbiao_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_cbiao_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_khfz^f_khfzid^f_sf^f_pwf^f_sjljsyl^f_jmje^f_jmbh^f_jmbhid^f_sfsfts^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_kj^f_kjid^f_ztkhh^f_ztsbh^f_ztyhh^f_rs^f_sfjl^f_yhbh^f_yhbhid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate^f_dyjtsl^f_dyjtsf^f_dejtsl^f_dejtsf^f_dsjtsl^f_dsjtsf';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_cbiao_detail.f_value1,

                f_value2: tbl_ld_cbiao_detail.f_value2,

                f_value3: tbl_ld_cbiao_detail.f_value3,

                f_value4: tbl_ld_cbiao_detail.f_value4,

                f_value5: tbl_ld_cbiao_detail.f_value5,

                f_value6: tbl_ld_cbiao_detail.f_value6,

                f_value7: tbl_ld_cbiao_detail.f_value7,

                f_value8: tbl_ld_cbiao_detail.f_value8,

                f_value9: tbl_ld_cbiao_detail.f_value9,

                f_value10: tbl_ld_cbiao_detail.f_value10,

                f_cb_cbbh: tbl_ld_cbiao_detail.f_cb_cbbh,

                f_cb_cbbhid: tbl_ld_cbiao_detail.f_cb_cbbhid,

                f_khbh: tbl_ld_cbiao_detail.f_khbh,

                f_khbhid: tbl_ld_cbiao_detail.f_khbhid,

                f_sqzm: tbl_ld_cbiao_detail.f_sqzm,

                f_bqzm: tbl_ld_cbiao_detail.f_bqzm,

                f_bqsl: tbl_ld_cbiao_detail.f_bqsl,

                f_sqsl: tbl_ld_cbiao_detail.f_sqsl,

                f_qsqpjsl: tbl_ld_cbiao_detail.f_qsqpjsl,

                f_qlqpjsl: tbl_ld_cbiao_detail.f_qlqpjsl,

                f_cbyname: tbl_ld_cbiao_detail.f_cbyname,

                f_cbyid: tbl_ld_cbiao_detail.f_cbyid,

                f_cbyphoto: tbl_ld_cbiao_detail.f_cbyphoto,

                f_cbsj: tbl_ld_cbiao_detail.f_cbsj,

                f_bk: tbl_ld_cbiao_detail.f_bk,
                f_bkid: tbl_ld_cbiao_detail.f_bkid,

                f_zt: tbl_ld_cbiao_detail.f_zt,
                f_ztid: tbl_ld_cbiao_detail.f_ztid,

                f_ly: tbl_ld_cbiao_detail.f_ly,
                f_lyid: tbl_ld_cbiao_detail.f_lyid,

                f_bz: tbl_ld_cbiao_detail.f_bz.formatStringRN(),

                f_sbbh: tbl_ld_cbiao_detail.f_sbbh,

                f_sbbhid: tbl_ld_cbiao_detail.f_sbbhid,

                f_sblx: tbl_ld_cbiao_detail.f_sblx,

                f_sblxid: tbl_ld_cbiao_detail.f_sblxid,

                f_yslx: tbl_ld_cbiao_detail.f_yslx,

                f_yslxid: tbl_ld_cbiao_detail.f_yslxid,

                f_lxtkhh: tbl_ld_cbiao_detail.f_lxtkhh,

                f_cbbh: tbl_ld_cbiao_detail.f_cbbh,

                f_cbbhid: tbl_ld_cbiao_detail.f_cbbhid,

                f_cbmc: tbl_ld_cbiao_detail.f_cbmc,

                f_yhbh: tbl_ld_cbiao_detail.f_yhbh,

                f_yhbhid: tbl_ld_cbiao_detail.f_yhbhid,

                f_yhm: tbl_ld_cbiao_detail.f_yhm,

                f_jfm: tbl_ld_cbiao_detail.f_jfm,

                f_dh: tbl_ld_cbiao_detail.f_dh,
                f_khfz: tbl_ld_cbiao_detail.f_khfz,
                f_khfzid: tbl_ld_cbiao_detail.f_khfzid,
                f_sf: tbl_ld_cbiao_detail.f_sf,
                f_pwf: tbl_ld_cbiao_detail.f_pwf,
                f_sjljsyl: tbl_ld_cbiao_detail.f_sjljsyl,
                f_jmje: tbl_ld_cbiao_detail.f_jmje,
                f_jmbh: tbl_ld_cbiao_detail.f_jmbh,
                f_jmbhid: tbl_ld_cbiao_detail.f_jmbhid,
                f_sfsfts: tbl_ld_cbiao_detail.f_sfsfts,

                f_dz: tbl_ld_cbiao_detail.f_dz,

                f_dy: tbl_ld_cbiao_detail.f_dy,

                f_dyid: tbl_ld_cbiao_detail.f_dyid,

                f_sc: tbl_ld_cbiao_detail.f_sc,

                f_scid: tbl_ld_cbiao_detail.f_scid,

                f_qy: tbl_ld_cbiao_detail.f_qy,

                f_qyid: tbl_ld_cbiao_detail.f_qyid,

                f_pq: tbl_ld_cbiao_detail.f_pq,

                f_pqid: tbl_ld_cbiao_detail.f_pqid,

                f_pgbh: tbl_ld_cbiao_detail.f_pgbh,

                f_pgbhid: tbl_ld_cbiao_detail.f_pgbhid,

                f_pgr: tbl_ld_cbiao_detail.f_pgr,

                f_pgrid: tbl_ld_cbiao_detail.f_pgrid,

                f_pgpcmc: tbl_ld_cbiao_detail.f_pgpcmc,

                f_pgsj: tbl_ld_cbiao_detail.f_pgsj,

                f_jfbh: tbl_ld_cbiao_detail.f_jfbh,

                f_jfbhid: tbl_ld_cbiao_detail.f_jfbhid,

                f_jfsj: tbl_ld_cbiao_detail.f_jfsj,

                f_bqje: tbl_ld_cbiao_detail.f_bqje,

                f_kj: tbl_ld_cbiao_detail.f_kj,
                f_kjid: tbl_ld_cbiao_detail.f_kjid,
                f_ztkhh: tbl_ld_cbiao_detail.f_ztkhh,
                f_ztsbh: tbl_ld_cbiao_detail.f_ztsbh,
                f_ztyhh: tbl_ld_cbiao_detail.f_ztyhh,
                f_rs: tbl_ld_cbiao_detail.f_rs,
                f_sfjl: tbl_ld_cbiao_detail.f_sfjl,

                f_dyjtsl: tbl_ld_cbiao_detail.f_dyjtsl,
                f_dyjtsf: tbl_ld_cbiao_detail.f_dyjtsf,
                f_dejtsl: tbl_ld_cbiao_detail.f_dejtsl,
                f_dejtsf: tbl_ld_cbiao_detail.f_dejtsf,
                f_dsjtsl: tbl_ld_cbiao_detail.f_dsjtsl,
                f_dsjtsf: tbl_ld_cbiao_detail.f_dsjtsf,

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
        *  方法:f_cbsj_time_onchange
        *  参数:
        *  抄表时间 onchange事件
        */
            f_cbsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_cbsj_date_onchange
        *  参数:
        *  抄表时间 onchange事件
        */
            f_cbsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },


            /* 
            *  
            *  方法:f_bk_onchange
            *  参数:changeEventParameter
            *  表况onchange事件
            */
            f_bk_onchange = function (e)
            {
                var controlid = e.target.id;
            },

    /* 
            *  
            *  方法:f_cbyname_onchange
            *  参数:changeEventParameter
            *  表况onchange事件
            */
    f_cbyname_onchange = function (e)
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



        /* 
        *  
        *  方法:f_pgsj_time_onchange
        *  参数:
        *  算费时间 onchange事件
        */
            f_pgsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_pgsj_date_onchange
        *  参数:
        *  算费时间 onchange事件
        */
            f_pgsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },
        /* 
        *  
        *  方法:f_jfsj_time_onchange
        *  参数:
        *  缴费时间 onchange事件
        */
            f_jfsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_jfsj_date_onchange
        *  参数:
        *  缴费时间 onchange事件
        */
            f_jfsj_date_onchange = function (ev)
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
        _pr_isadmin: '1',
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
                                                        _validateMessage_save = new validateMessage('btn_command_save_tbl_ld_cbiao_detail');
                                                        _validateMessage_submit = new validateMessage('btn_command_submit_tbl_ld_cbiao_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_cbiao_detail');
                                                        _ladda_btn_command_submit = Ladda.create('btn_command_submit_tbl_ld_cbiao_detail');
                                                        _ladda_btn_command_rollback = Ladda.create('btn_command_rollback_tbl_ld_cbiao_detail');

                                                        setDisable();

                                                        $('#div_container_tbl_ld_cbiao_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4jf.html', null, function ()
                                                        {
                                                            tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                                                            tbl_ld_khb_list_Obj.init({
                                                                success: function ()
                                                                {
                                                                    $('#div_container_tbl_ld_cbiao_list').css('display', '');
                                                                    $('#div_loading_tbl_ld_cbiao_list').css('display', 'none');

                                                                    _blockMessage.hidden();
                                                                }
                                                            });

                                                        });
                                                        //_blockMessage.hidden();
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
                    success: function (tbl_ld_cbiao_detail)
                    {
                        setModel(tbl_ld_cbiao_detail, {
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
                    success: function (tbl_ld_cbiao_detail)
                    {
                        checkModel_Save(tbl_ld_cbiao_detail,_validateMessage_save, {
                            success: function (tbl_ld_cbiao_detail)
                            {
                                updateData(tbl_ld_cbiao_detail, {
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
                        //???!!!
                        //设置按钮行
                        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cbiao_detail', '1');
                        _ladda_btn_command_submit.start();

                        getModel({
                            success: function (tbl_ld_cbiao_detail)
                            {
                                checkModel_Save(tbl_ld_cbiao_detail, _validateMessage_submit, {
                                    success: function (tbl_ld_cbiao_detail)
                                    {
                                        checkModel_Submit(tbl_ld_cbiao_detail, _validateMessage_submit, {
                                            success: function (tbl_ld_cbiao_detail)
                                            {
                                                updateData(tbl_ld_cbiao_detail, {
                                                    success: function ()
                                                    {                                                        
                                                        setDisable();
                                                        _ladda_btn_command_submit.stop();
                                                        _alertMessage.show('提交成功', 'success', 2000);                                                

                                                    },
                                                    fail: function (message)
                                                    {
                                                        _ladda_btn_command_submit.stop();
                                                        _alertMessage.show('提交失败', 'fail');
                                                        _resultMessage.show(message);
                                                    }
                                                });

                                            }, fail: function (message)
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
                _resultMessage.show('提交程序异常<br/>' + ex.message, 'fail');
            }
        },

        //回滚
        btn_command_rollback_onclick: function ()
        {

            try
            {
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对当前的数据进行<a style="color:red">回滚</a>操作</h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5>回滚后的数据将恢复到<a style="color:red">新建</a>状态可以<a style="color:red">编辑</a>和<a style="color:red">删除</a></h5>';
                confirmContent += '<h5>请确定执行此操作</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('回滚确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_rollback.start();
                        var data = {
                            sys_id: that._pr_sys_id,
                            clientInf: _clientInf
                        };
                        doAjaxFunction(_serviceUrl, 'RollBack', data, {
                            success: function (message)
                            {
                                //绑定数据
                                that.bindPage({
                                    success: function () {
                                setDisable();
                                _ladda_btn_command_rollback.stop();
                                _alertMessage.show('回滚成功', 'success', 2000);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_rollback.stop();
                                _alertMessage.show('回滚失败', 'fail', 2000);
                            },
                            error: function (message)
                            {
                                _ladda_btn_command_rollback.stop();
                               // _alertMessage.show(message);
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
        btn_command_opensearch_onclick: function ()
        {

            var khbh = controlObj.text('detail_f_khbh_tbl_ld_cbiao_detail');

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
            $('#div_search_modal_tbl_ld_cbiao_detail').modal('show');
        },
        btn_search_modal_search_onclick: function (callBackFunction)
        {
            $('#div_search_modal_tbl_ld_cbiao_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                var sqlStringsJson = {
                    "khxx": 'select f_khbh,sys_id,f_khfz,f_khfzid,f_sqzm,f_bqzm,f_bqsl,f_sqsl,f_qsqpjsl,f_qlqpjsl,f_cbyxm,f_cbyid,f_sbbh,f_sbbhid,f_sblx,f_sblxid,f_yslx,f_yslxid,f_lxth,f_cbbh,f_cbbhid,f_cbmc,f_yhbh,f_yhbhid,f_yhm,f_jfm,f_dh,f_dz,f_dy,f_dyid,f_sc,f_scid,f_qy,f_qyid,f_pq,f_pqid,f_sbkj,f_sbkjid,f_ztkhh,f_ztsbh,f_ztyhh,f_rs from tbl_ld_khb a where sys_id=\'' + idArray[0] + '\''
                  //  "jmxx":'select * from tbl_ld_jmb where sys_delflag='0' and f_ztid='0'and f_khbhid = '334128'
                };
                commonObj.querySqls(sqlStringsJson, {
                    success: function (resultJson)
                    {
                        var resultArrayyhxx = resultJson['khxx'];
                        controlObj.text('detail_f_khbh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_khbh);
                        controlObj.text('detail_f_khbhid_tbl_ld_cbiao_detail', resultArrayyhxx[0].sys_id);
                        controlObj.text('detail_f_sqzm_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_bqzm);
                        controlObj.text('detail_f_sqsl_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_bqsl);
                        controlObj.text('detail_f_qsqpjsl_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_qsqpjsl);
                        controlObj.text('detail_f_qlqpjsl_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_qlqpjsl);
                        controlObj.singledropdownlistid('detail_f_cbyname_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_cbyid);
                        //controlObj.text('detail_f_cbyid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_cbyid);
                        controlObj.text('detail_f_sbbh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sbbh);
                        controlObj.text('detail_f_sbbhid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sbbhid);
                        controlObj.text('detail_f_sblx_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sblx);
                        controlObj.text('detail_f_sblxid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sblxid);
                        controlObj.text('detail_f_yslx_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_yslx);
                        controlObj.text('detail_f_yslxid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_yslxid);
                        controlObj.text('detail_f_lxtkhh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_lxth);
                        controlObj.text('detail_f_cbbh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_cbbh);
                        controlObj.text('detail_f_cbbhid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_cbbhid);
                        controlObj.text('detail_f_cbmc_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_cbyxm);
                        controlObj.text('detail_f_yhbh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_yhbh);
                        controlObj.text('detail_f_yhbhid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_yhbhid);
                        controlObj.text('detail_f_yhm_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_yhm);
                        controlObj.text('detail_f_jfm_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_jfm);
                        controlObj.text('detail_f_dh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_dh);
                        controlObj.text('detail_f_khfz_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_khfz);
                        controlObj.text('detail_f_khfzid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_khfzid);
                        controlObj.text('detail_f_sf_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sf);
                        controlObj.text('detail_f_pwf_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_pwf);
                        controlObj.text('detail_f_sjljsyl_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_nljgl);//
                        controlObj.text('detail_f_jmje_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_jmje);
                        controlObj.text('detail_f_jmbh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_jmbh);
                        controlObj.text('detail_f_jmbhid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_jmbhid);
                        controlObj.text('detail_f_sfsfts_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sfsfts);
                        controlObj.text('detail_f_dz_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_dz);
                        controlObj.text('detail_f_dy_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_dy);
                        controlObj.text('detail_f_dyid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_dyid);
                        controlObj.text('detail_f_sc_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sc);
                        controlObj.text('detail_f_scid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_scid);
                        controlObj.text('detail_f_qy_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_qy);
                        controlObj.text('detail_f_qyid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_qyid);
                        controlObj.text('detail_f_pq_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_pq);
                        controlObj.text('detail_f_pqid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_pqid);
                        controlObj.text('detail_f_kj_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sbkj);
                        controlObj.text('detail_f_kjid_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_sbkjid);
                        controlObj.text('detail_f_ztkhh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_ztkhh);
                        controlObj.text('detail_f_ztsbh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_ztsbh);
                        controlObj.text('detail_f_ztyhh_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_ztyhh);
                        controlObj.text('detail_f_rs_tbl_ld_cbiao_detail', resultArrayyhxx[0].f_rs);
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('querySqls<br/>' + message, 'fail');
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
            $('#div_search_modal_tbl_ld_cbiao_detail').modal('hide')
        },
        //计算本期水量
        btn_command_count_onclick: function ()
        {
            var f_sqzm = controlObj.text('detail_f_sqzm_tbl_ld_cbiao_detail');
            var f_bqzm = controlObj.text('detail_f_bqzm_tbl_ld_cbiao_detail');
            if (f_bqzm == '')
            {
                _alertMessage.show('本期止码不能为空', 'fail');
            } else
            {
                if (f_bqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(f_bqzm))
                {
                    _alertMessage.show('本期止码和上期止码必须是数字', 'fail');
                } else if (f_bqzm != "" && parseFloat(f_bqzm) < parseFloat(f_sqzm))
                {
                    _alertMessage.show('输入的本期止码不能小于当前止码', 'fail');
                }
                else
                {
                    var f_bqsl = parseFloat(f_bqzm) - parseFloat(f_sqzm);
                    controlObj.text('detail_f_bqsl_tbl_ld_cbiao_detail', f_bqsl);
                }
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
    tbl_ld_cbiao_detail_Obj.init();
});




