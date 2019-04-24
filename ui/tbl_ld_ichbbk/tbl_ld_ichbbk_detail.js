

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_ichbbk_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_ichbbk.asmx/',
        _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
    _baseCodeHashMap = null,
    _validateMessage_read = null,
    _validateMessage_save = null,
    _validateMessage_write = null,

    _ladda_btn_command_read = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_write = null,
    //读写卡端口号
    _port='3',
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
        
        codeServiceId += "0759^";


        codeServiceId += "0760^";

        codeServiceId += "0761^";

        codeServiceId += "0762^";

        codeServiceId += "0763^";



        codeServiceId += "0764^";


        codeServiceId += "0765^";

        codeServiceId += "0766^";


        codeServiceId += "0767^";

        codeServiceId += "0768^";


        codeServiceId += "0769^";


        codeServiceId += "0770^";
        codeServiceId += "0497^";
        codeServiceId += "0523^";
        codeServiceId += "0524^";
        codeServiceId += "0525^";
        codeServiceId += "0797^";
        codeServiceId += "0799^";
        codeServiceId += "0564^";
        codeServiceId += "0810^";
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    
                    _baseCodeHashMap.put('codeservice_0759', resultArray['0759']);


                    _baseCodeHashMap.put('codeservice_0760', resultArray['0760']);

                    _baseCodeHashMap.put('codeservice_0761', resultArray['0761']);

                    _baseCodeHashMap.put('codeservice_0762', resultArray['0762']);

                    _baseCodeHashMap.put('codeservice_0763', resultArray['0763']);



                    _baseCodeHashMap.put('codeservice_0764', resultArray['0764']);

                    _baseCodeHashMap.put('codeservice_0765', resultArray['0765']);

                    _baseCodeHashMap.put('codeservice_0766', resultArray['0766']);


                    _baseCodeHashMap.put('codeservice_0767', resultArray['0767']);

                    _baseCodeHashMap.put('codeservice_0768', resultArray['0768']);


                    _baseCodeHashMap.put('codeservice_0769', resultArray['0769']);

                    _baseCodeHashMap.put('codeservice_0770', resultArray['0770']);
                    _baseCodeHashMap.put('codeservice_0497', resultArray['0497']);
                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);
                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);
                    _baseCodeHashMap.put('codeservice_0797', resultArray['0797']);
                    _baseCodeHashMap.put('codeservice_0799', resultArray['0799']);
                    _baseCodeHashMap.put('codeservice_0564', resultArray['0564']);
                    _baseCodeHashMap.put('codeservice_0810', resultArray['0810']);
                    
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
                            _baseCodeHashMap.put('codeservice_0766', messageJson["tbl_ldbm_sbfz"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('获取水表分组失败<br/>' + ex.message, 'fail');
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
            
            var codeService_0759 = _baseCodeHashMap.get('codeservice_0759');

            var codeService_0760 = _baseCodeHashMap.get('codeservice_0760');

            var codeService_0761 = _baseCodeHashMap.get('codeservice_0761');

            var codeService_0762 = _baseCodeHashMap.get('codeservice_0762');

            var codeService_0763 = _baseCodeHashMap.get('codeservice_0763');

            var codeService_0764 = _baseCodeHashMap.get('codeservice_0764');

            var codeService_0765 = _baseCodeHashMap.get('codeservice_0765');

            var codeService_0766 = _baseCodeHashMap.get('codeservice_0766');

            var codeService_0767 = _baseCodeHashMap.get('codeservice_0767');

            var codeService_0768 = _baseCodeHashMap.get('codeservice_0768');

            var codeService_0769 = _baseCodeHashMap.get('codeservice_0769');

            var codeService_0770 = _baseCodeHashMap.get('codeservice_0770');

            var codeService_0497 = _baseCodeHashMap.get('codeservice_0497');
            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');
            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');
            var codeService_0797 = _baseCodeHashMap.get('codeservice_0797');
            var codeService_0799 = _baseCodeHashMap.get('codeservice_0799');
            var codeService_0564 = _baseCodeHashMap.get('codeservice_0564');
            var codeService_0810 = _baseCodeHashMap.get('codeservice_0810');
            	
            controlObj.singledropdownlistinit('detail_f_n_sbfz_tbl_ld_ichbbk_detail', codeService_0766, f_n_sbfz_onchange);
          
            	
			          
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_n_sbkj_tbl_ld_ichbbk_detail', codeService_0523, f_n_sbkj_onchange);
          
            	
			          
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_n_sblx_tbl_ld_ichbbk_detail', codeService_0524, f_n_sblx_onchange);
          
            	
            controlObj.singledropdownlistinit('detail_f_n_jllx_tbl_ld_ichbbk_detail', codeService_0525, f_n_jllx_onchange);
          
            controlObj.singledropdownlistinit('detail_f_xkms_tbl_ld_ichbbk_detail', codeService_0797);


            controlObj.singledropdownlistinit('detail_f_gslb_tbl_ld_ichbbk_detail', codeService_0799);

            controlObj.singledropdownlistinit('detail_f_hbyy_tbl_ld_ichbbk_detail', codeService_0810);
			          
            	
            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_ichbbk_detail', codeService_0564, f_zt_onchange);
          
            
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
        if (that._pr_pagetype == "2")
        {
            var isDisable = true;
            $("#btn_command_read_tbl_ld_ichbbk_detail").addClass("hidden");
            $("#btn_command_save_tbl_ld_ichbbk_detail").addClass("hidden");
            $("#btn_command_write_tbl_ld_ichbbk_detail").addClass("hidden");
            $("#btn_detail_f_o_sbds_tbl_ld_ichbbk_detail").attr("disabled", "disabled");
        }
        else
        {
            var zt = controlObj.singledropdownlistid("detail_f_zt_tbl_ld_ichbbk_detail");
            var f_value10 = controlObj.text("detail_f_value10_tbl_ld_ichbbk_detail");

            switch (zt)
            {
                case "0":
                case "1":
                    $("#btn_command_read_tbl_ld_ichbbk_detail").removeClass("hidden");
                    $("#btn_command_save_tbl_ld_ichbbk_detail").removeClass("hidden");
                    $("#btn_command_write_tbl_ld_ichbbk_detail").removeClass("hidden");

                    $("#btn_detail_f_o_sbds_tbl_ld_ichbbk_detail").removeAttr("disabled");
                    var isDisable = false;
                    break;
                case "2":
                case "9":
                    $("#btn_command_read_tbl_ld_ichbbk_detail").addClass("hidden");
                    $("#btn_command_save_tbl_ld_ichbbk_detail").addClass("hidden");
                    $("#btn_command_write_tbl_ld_ichbbk_detail").addClass("hidden");
                    $("#btn_detail_f_o_sbds_tbl_ld_ichbbk_detail").attr("disabled", "disabled");
                    var isDisable = true;
                    break;
            }
            if (f_value10 == "1") {
                $("#btn_command_read_tbl_ld_ichbbk_detail").addClass("hidden");
                $("#btn_command_save_tbl_ld_ichbbk_detail").addClass("hidden");
                $("#btn_command_write_tbl_ld_ichbbk_detail").addClass("hidden");
            }
        }
        try
        {

            
					    controlObj.textdisable('detail_f_hbbh_tbl_ld_ichbbk_detail', true);          
            
					    controlObj.textdisable('detail_f_sjbh_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_khbh_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_yhm_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_jfm_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_lxth_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_dh_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_dz_tbl_ld_ichbbk_detail', true);

					    controlObj.textdisable('detail_f_value1_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_xunkr_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_xiekrid_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_yslxid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_dy_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_qy_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_xunkrid_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_xiekrq_tbl_ld_ichbbk_detail', true);          
            
					    controlObj.textdisable('detail_f_yhbh_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_dyid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_qyid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_xunkrq_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_khbhid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_yhbhid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_sc_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_pq_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_xiekr_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_yslx_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_khrq_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_scid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_pqid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbbh_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbfzid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_khbh_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sblx_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_cszm_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_ljgl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_jsbh_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbpp_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_rs_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sblxid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_bqzm_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_qsqpjsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_lxth_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_mph_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbkj_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_jllx_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sqzm_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_qlqpjsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbfz_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbdz_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sbkjid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_jllxid_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_sqsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_o_bqsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_sbbh_tbl_ld_ichbbk_detail', true);          
            
				       
					    controlObj.singledropdownlistdisable('detail_f_n_sbfz_tbl_ld_ichbbk_detail', true);
            
            controlObj.textdisable('detail_f_n_sbpp_tbl_ld_ichbbk_detail', isDisable);
            
					    controlObj.textdisable('detail_f_n_mph_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_rs_tbl_ld_ichbbk_detail', isDisable);          
            
				       
					    controlObj.singledropdownlistdisable('detail_f_n_sbkj_tbl_ld_ichbbk_detail', true);
            
            controlObj.textdisable('detail_f_n_jsbh_tbl_ld_ichbbk_detail', true);
            
            controlObj.textdisable('detail_f_n_lxth_tbl_ld_ichbbk_detail', true);
            
					    controlObj.textdisable('detail_f_n_khbh_tbl_ld_ichbbk_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_n_sblx_tbl_ld_ichbbk_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_n_jllx_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_ljgl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_cqzm_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_sqzm_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_bqzm_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_bqsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_qsqpjsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_qlqpjsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_sqsl_tbl_ld_ichbbk_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_n_sbdz_tbl_ld_ichbbk_detail', true);
            
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_ichbbk_detail', true);          
            
            controlObj.textdisable('detail_f_bz_tbl_ld_ichbbk_detail', isDisable);

            //新增
             
            controlObj.textdisable('detail_f_o_sbds_tbl_ld_ichbbk_detail', isDisable);

            controlObj.textdisable('detail_f_khfz_tbl_ld_ichbbk_detail', isDisable);

            controlObj.textdisable('detail_f_khfzid_tbl_ld_ichbbk_detail', isDisable);

            controlObj.textdisable('detail_f_cbbh_tbl_ld_ichbbk_detail', isDisable);

            controlObj.textdisable('detail_f_cbbhid_tbl_ld_ichbbk_detail', isDisable);

            controlObj.textdisable('detail_f_xklx_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_xkkh_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_xkgscs_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_xkbcgsl_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_xkljgl_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_xkjzlx_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_port_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_dkkh_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_dkbcgsl_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_dkgscs_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_dkljgl_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_lbljgl_tbl_ld_ichbbk_detail', true);
            controlObj.textdisable('detail_f_dkjzlx_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_dksbzt_tbl_ld_ichbbk_detail', true);

            controlObj.textdisable('detail_f_bssl_tbl_ld_ichbbk_detail', true);

            controlObj.singledropdownlistdisable('detail_f_gslb_tbl_ld_ichbbk_detail', isDisable);
            controlObj.singledropdownlistdisable('detail_f_hbyy_tbl_ld_ichbbk_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_xkms_tbl_ld_ichbbk_detail', isDisable);

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
    *  参数:tbl_ld_ichbbk_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_ichbbk_detail, callBackFunction)
   {
        try
        {
            
			        controlObj.text('detail_f_value1_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value1);          
		
			        controlObj.text('detail_f_value2_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value2);          
		
			        controlObj.text('detail_f_value3_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value3);          
		
			        controlObj.text('detail_f_value4_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value4);          
		
			        controlObj.text('detail_f_value5_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value5);          
		
			        controlObj.text('detail_f_value6_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value6);          
		
			        controlObj.text('detail_f_value7_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value7);          
		
			        controlObj.text('detail_f_value8_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value8);          
		
			        controlObj.text('detail_f_value9_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value9);          
		
			        controlObj.text('detail_f_value10_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_value10);          
		
			        controlObj.text('detail_f_hbbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_hbbh);          
		
			        controlObj.text('detail_f_sjbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_sjbh);          
		
			        controlObj.text('detail_f_khbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_khbh);          
		
			        controlObj.text('detail_f_yhm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_yhm);          
		
			        controlObj.text('detail_f_jfm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_jfm);          
		
			        controlObj.text('detail_f_lxth_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_lxth);          
		
			        controlObj.text('detail_f_dh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dh);          
		
			        controlObj.text('detail_f_dz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dz);          
		
			        controlObj.text('detail_f_xunkr_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xunkr);          
		
			        controlObj.text('detail_f_xiekrid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xiekrid);          
		
			        controlObj.text('detail_f_yslxid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_yslxid);          
		
			        controlObj.text('detail_f_dy_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dy);          
		
			        controlObj.text('detail_f_qy_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_qy);          
		
			        controlObj.text('detail_f_xunkrid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xunkrid);          
		
			        controlObj.text('detail_f_xiekrq_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xiekrq);          
		
			        controlObj.text('detail_f_yhbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_yhbh);          
		
			        controlObj.text('detail_f_dyid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dyid);          
		
			        controlObj.text('detail_f_qyid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_qyid);          
		
			        controlObj.text('detail_f_xunkrq_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xunkrq);          
		
			        controlObj.text('detail_f_khbhid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_khbhid);          
		
			        controlObj.text('detail_f_yhbhid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_yhbhid);          
		
			        controlObj.text('detail_f_sc_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_sc);          
		
			        controlObj.text('detail_f_pq_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_pq);          
		
			        controlObj.text('detail_f_xiekr_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xiekr);          
		
			        controlObj.text('detail_f_yslx_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_yslx);          
		
			        controlObj.text('detail_f_khrq_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_khrq);          
		
			        controlObj.text('detail_f_scid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_scid);          
		
			        controlObj.text('detail_f_pqid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_pqid);          
		
			        controlObj.text('detail_f_o_sbbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbbh);

			        controlObj.text('detail_f_o_sbbhid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbbhid);
		
			        controlObj.text('detail_f_o_sbfzid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbfzid);          
		
			        controlObj.text('detail_f_o_khbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_khbh);          
		
			        controlObj.text('detail_f_o_sblx_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sblx);          
		
			        controlObj.text('detail_f_o_cszm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_cszm);          
		
			        controlObj.text('detail_f_o_ljgl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_ljgl);          
		
			        controlObj.text('detail_f_o_jsbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_jsbh);          
		
			        controlObj.text('detail_f_o_sbpp_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbpp);          
		
			        controlObj.text('detail_f_o_rs_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_rs);          
		
			        controlObj.text('detail_f_o_sblxid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sblxid);          
		
			        controlObj.text('detail_f_o_bqzm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_bqzm);          
		
			        controlObj.text('detail_f_o_qsqpjsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_qsqpjsl);          
		
			        controlObj.text('detail_f_o_lxth_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_lxth);          
		
			        controlObj.text('detail_f_o_mph_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_mph);          
		
			        controlObj.text('detail_f_o_sbkj_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbkj);          
		
			        controlObj.text('detail_f_o_jllx_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_jllx);          
		
			        controlObj.text('detail_f_o_sqzm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sqzm);          
		
			        controlObj.text('detail_f_o_qlqpjsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_qlqpjsl);          
		
			        controlObj.text('detail_f_o_sbfz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbfz);          
		
			        controlObj.text('detail_f_o_sbdz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbdz);          
		
			        controlObj.text('detail_f_o_sbkjid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbkjid);          
		
			        controlObj.text('detail_f_o_jllxid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_jllxid);          
		
			        controlObj.text('detail_f_o_sqsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sqsl);          
		
			        controlObj.text('detail_f_o_bqsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_bqsl);          
		
			        controlObj.text('detail_f_n_sbbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sbbh);          
		
			        controlObj.singledropdownlistid('detail_f_n_sbfz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sbfzid);          
		
			        controlObj.text('detail_f_n_sbpp_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sbpp);          
		
			        controlObj.text('detail_f_n_mph_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_mph);          
		
			        controlObj.text('detail_f_n_rs_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_rs);          
		
			        controlObj.singledropdownlistid('detail_f_n_sbkj_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sbkjid);          
		
			        controlObj.text('detail_f_n_jsbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_jsbh);          
		
			        controlObj.text('detail_f_n_lxth_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_lxth);          
		
			        controlObj.text('detail_f_n_khbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_khbh);          
		
			        controlObj.singledropdownlistid('detail_f_n_sblx_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sblxid);          
		
			        controlObj.singledropdownlistid('detail_f_n_jllx_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_jllxid);          
		
			        controlObj.text('detail_f_n_ljgl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_ljgl);          
		
			        controlObj.text('detail_f_n_cqzm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_cqzm);          
		
			        controlObj.text('detail_f_n_sqzm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sqzm);          
		
			        controlObj.text('detail_f_n_bqzm_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_bqzm);          
		
			        controlObj.text('detail_f_n_bqsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_bqsl);          
		
			        controlObj.text('detail_f_n_qsqpjsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_qsqpjsl);          
		
			        controlObj.text('detail_f_n_qlqpjsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_qlqpjsl);          
		
			        controlObj.text('detail_f_n_sqsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sqsl);          
		
			        controlObj.text('detail_f_n_sbdz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_n_sbdz);          
		
			        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_ztid);          
		
			        controlObj.text('detail_f_bz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_bz.returnStringRN());

            //新增

			        controlObj.text('detail_f_o_sbds_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_o_sbds);

			        controlObj.text('detail_f_khfz_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_khfz);

			        controlObj.text('detail_f_khfzid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_khfzid);

			        controlObj.text('detail_f_cbbh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_cbbh);

			        controlObj.text('detail_f_cbbhid_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_cbbhid);

			        controlObj.text('detail_f_bssl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_bssl);

			        controlObj.singledropdownlistid('detail_f_hbyy_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_hbyy);
			        if(tbl_ld_ichbbk_detail.f_xklx == '0'){
			            controlObj.text('detail_f_xklx_tbl_ld_ichbbk_detail', '普通卡');
			        }
			        else
			        {
			            controlObj.text('detail_f_xklx_tbl_ld_ichbbk_detail','补卡');
			        }

			        

			        controlObj.text('detail_f_xkkh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xkkh);

			        controlObj.text('detail_f_xkgscs_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xkgscs);

			        controlObj.text('detail_f_xkbcgsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xkbcgsl);

			        controlObj.text('detail_f_xkljgl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xkljgl);

			        if(tbl_ld_ichbbk_detail.f_xkjzlx == '0')
			        {
			            controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '任意');
			        }
			        else
			        {
			            controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '冷水');
			        }
			        

			        controlObj.text('detail_f_port_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_port);

			        controlObj.text('detail_f_dkkh_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dkkh);

			        controlObj.text('detail_f_dkbcgsl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dkbcgsl);

			        controlObj.text('detail_f_dkgscs_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dkgscs);

			        controlObj.text('detail_f_dkljgl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dkljgl);
			        controlObj.text('detail_f_lbljgl_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_dkljgl);

			        if (tbl_ld_ichbbk_detail.f_dkjzlx == '0')
			        {
			            controlObj.text('detail_f_dkjzlx_tbl_ld_ichbbk_detail', '任意');
			        }
			        else
			        {
			            controlObj.text('detail_f_dkjzlx_tbl_ld_ichbbk_detail', '冷水');
			        }

			        if(tbl_ld_ichbbk_detail.f_dksbzt == '0')
			        {
			            controlObj.text('detail_f_dksbzt_tbl_ld_ichbbk_detail', '卡内有水，尚未读表');
			        }
			        else
			        {
			            controlObj.text('detail_f_dksbzt_tbl_ld_ichbbk_detail','卡已读表');
			        }
			        

			        controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_xkms);

			        controlObj.singledropdownlistid('detail_f_gslb_tbl_ld_ichbbk_detail', tbl_ld_ichbbk_detail.f_gslbid);
				
        callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');  
        }       
    },

        /* 
    *  
    *  方法:clearModel
    *  参数:tbl_ld_ichbbk_detail, callBackFunction
    *  清空页面
    */
    clearModel = function ()
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value2_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value3_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value4_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value5_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value6_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value7_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value8_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value9_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_value10_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_sjbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_khbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_yhm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_jfm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_lxth_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dz_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xunkr_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xiekrid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_yslxid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dy_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_qy_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xunkrid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xiekrq_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_yhbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dyid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_qyid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xunkrq_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_khbhid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_yhbhid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_sc_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_pq_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xiekr_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_yslx_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_khrq_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_scid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_pqid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbbhid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbfzid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_khbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sblx_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_cszm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_ljgl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_jsbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbpp_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_rs_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sblxid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_bqzm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_qsqpjsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_lxth_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_mph_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbkj_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_jllx_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sqzm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_qlqpjsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbfz_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbdz_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sbkjid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_jllxid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_sqsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_o_bqsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_sbbh_tbl_ld_ichbbk_detail', '');

            controlObj.singledropdownlistid('detail_f_n_sbfz_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_sbpp_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_mph_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_rs_tbl_ld_ichbbk_detail', '');

            controlObj.singledropdownlistid('detail_f_n_sbkj_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_jsbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_lxth_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_khbh_tbl_ld_ichbbk_detail', '');

            controlObj.singledropdownlistid('detail_f_n_sblx_tbl_ld_ichbbk_detail', '');

            controlObj.singledropdownlistid('detail_f_n_jllx_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_ljgl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_cqzm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_sqzm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_bqzm_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_bqsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_qsqpjsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_qlqpjsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_sqsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_n_sbdz_tbl_ld_ichbbk_detail', '');

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_bz_tbl_ld_ichbbk_detail', '');

            //新增

            controlObj.text('detail_f_o_sbds_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_khfz_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_khfzid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_cbbh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_cbbhid_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_bssl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_hbyy_tbl_ld_ichbbk_detail', '');

                controlObj.text('detail_f_xklx_tbl_ld_ichbbk_detail', '');




            controlObj.text('detail_f_xkkh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xkgscs_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xkbcgsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_xkljgl_tbl_ld_ichbbk_detail', '');


                controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '');
            


            controlObj.text('detail_f_port_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dkkh_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dkbcgsl_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dkgscs_tbl_ld_ichbbk_detail', '');

            controlObj.text('detail_f_dkljgl_tbl_ld_ichbbk_detail', '');
            controlObj.text('detail_f_lbljgl_tbl_ld_ichbbk_detail', '');


            controlObj.text('detail_f_dkjzlx_tbl_ld_ichbbk_detail', '');
            

           controlObj.text('detail_f_dksbzt_tbl_ld_ichbbk_detail', '');
            


            controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ichbbk_detail', '');

            //controlObj.singledropdownlistid('detail_f_gslb_tbl_ld_ichbbk_detail', '');

            
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
    *  获取页面数据，返回对象tbl_ld_ichbbk_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_ichbbk_detail = new Object();
            
					
            tbl_ld_ichbbk_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_hbbh = controlObj.text('detail_f_hbbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_sjbh = controlObj.text('detail_f_sjbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_lxth = controlObj.text('detail_f_lxth_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_xunkr = controlObj.text('detail_f_xunkr_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_xiekrid = controlObj.text('detail_f_xiekrid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_yslxid = controlObj.text('detail_f_yslxid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_xunkrid = controlObj.text('detail_f_xunkrid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_xiekrq = controlObj.text('detail_f_xiekrq_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_xunkrq = controlObj.text('detail_f_xunkrq_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_xiekr = controlObj.text('detail_f_xiekr_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_yslx = controlObj.text('detail_f_yslx_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_khrq = controlObj.text('detail_f_khrq_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sbbh = controlObj.text('detail_f_o_sbbh_tbl_ld_ichbbk_detail');

            tbl_ld_ichbbk_detail.f_o_sbbhid = controlObj.text('detail_f_o_sbbhid_tbl_ld_ichbbk_detail');
            
					
            tbl_ld_ichbbk_detail.f_o_sbfzid = controlObj.text('detail_f_o_sbfzid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_khbh = controlObj.text('detail_f_o_khbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sblx = controlObj.text('detail_f_o_sblx_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_cszm = controlObj.text('detail_f_o_cszm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_ljgl = controlObj.text('detail_f_o_ljgl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_jsbh = controlObj.text('detail_f_o_jsbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sbpp = controlObj.text('detail_f_o_sbpp_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_rs = controlObj.text('detail_f_o_rs_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sblxid = controlObj.text('detail_f_o_sblxid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_bqzm = controlObj.text('detail_f_o_bqzm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_qsqpjsl = controlObj.text('detail_f_o_qsqpjsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_lxth = controlObj.text('detail_f_o_lxth_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_mph = controlObj.text('detail_f_o_mph_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sbkj = controlObj.text('detail_f_o_sbkj_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_jllx = controlObj.text('detail_f_o_jllx_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sqzm = controlObj.text('detail_f_o_sqzm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_qlqpjsl = controlObj.text('detail_f_o_qlqpjsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sbfz = controlObj.text('detail_f_o_sbfz_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sbdz = controlObj.text('detail_f_o_sbdz_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sbkjid = controlObj.text('detail_f_o_sbkjid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_jllxid = controlObj.text('detail_f_o_jllxid_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_sqsl = controlObj.text('detail_f_o_sqsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_o_bqsl = controlObj.text('detail_f_o_bqsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_sbbh = controlObj.text('detail_f_n_sbbh_tbl_ld_ichbbk_detail');          
            
			            tbl_ld_ichbbk_detail.f_n_sbfz = controlObj.singledropdownlist('detail_f_n_sbfz_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_n_sbfzid = controlObj.singledropdownlistid('detail_f_n_sbfz_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_sbpp = controlObj.text('detail_f_n_sbpp_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_mph = controlObj.text('detail_f_n_mph_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_rs = controlObj.text('detail_f_n_rs_tbl_ld_ichbbk_detail');          
            
			            tbl_ld_ichbbk_detail.f_n_sbkj = controlObj.singledropdownlist('detail_f_n_sbkj_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_n_sbkjid = controlObj.singledropdownlistid('detail_f_n_sbkj_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_jsbh = controlObj.text('detail_f_n_jsbh_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_lxth = controlObj.text('detail_f_n_lxth_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_khbh = controlObj.text('detail_f_n_khbh_tbl_ld_ichbbk_detail');          
            
			            tbl_ld_ichbbk_detail.f_n_sblx = controlObj.singledropdownlist('detail_f_n_sblx_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_n_sblxid = controlObj.singledropdownlistid('detail_f_n_sblx_tbl_ld_ichbbk_detail');          
            
			            tbl_ld_ichbbk_detail.f_n_jllx = controlObj.singledropdownlist('detail_f_n_jllx_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_n_jllxid = controlObj.singledropdownlistid('detail_f_n_jllx_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_ljgl = controlObj.text('detail_f_n_ljgl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_cqzm = controlObj.text('detail_f_n_cqzm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_sqzm = controlObj.text('detail_f_n_sqzm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_bqzm = controlObj.text('detail_f_n_bqzm_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_bqsl = controlObj.text('detail_f_n_bqsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_qsqpjsl = controlObj.text('detail_f_n_qsqpjsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_qlqpjsl = controlObj.text('detail_f_n_qlqpjsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_sqsl = controlObj.text('detail_f_n_sqsl_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_n_sbdz = controlObj.text('detail_f_n_sbdz_tbl_ld_ichbbk_detail');          
            
			            tbl_ld_ichbbk_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ichbbk_detail');          
            
					
            tbl_ld_ichbbk_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_ichbbk_detail');

            //新增
            tbl_ld_ichbbk_detail.f_o_sbds = controlObj.text('detail_f_o_sbds_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_khfz = controlObj.text('detail_f_khfz_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_khfzid = controlObj.text('detail_f_khfzid_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_cbbhid = controlObj.text('detail_f_cbbhid_tbl_ld_ichbbk_detail');

            tbl_ld_ichbbk_detail.f_bssl = controlObj.text('detail_f_bssl_tbl_ld_ichbbk_detail');

            tbl_ld_ichbbk_detail.f_hbyy = controlObj.singledropdownlistid('detail_f_hbyy_tbl_ld_ichbbk_detail');
            var xklx = controlObj.text('detail_f_xklx_tbl_ld_ichbbk_detail');
            if (xklx == "普通卡")
            {
                tbl_ld_ichbbk_detail.f_xklx = '0';
            }
            else
            {
                tbl_ld_ichbbk_detail.f_xklx = '1';
            }
            

            tbl_ld_ichbbk_detail.f_xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_xkgscs = controlObj.text('detail_f_xkgscs_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_xkbcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_xkljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ichbbk_detail');

            var xkjzlx = controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail');

            if (xkjzlx == "冷水")
            {
                tbl_ld_ichbbk_detail.f_xkjzlx = '1';
            }
            else
            {
                tbl_ld_ichbbk_detail.f_xkjzlx = '0';
            }
            


            tbl_ld_ichbbk_detail.f_port = controlObj.text('detail_f_port_tbl_ld_ichbbk_detail');

            tbl_ld_ichbbk_detail.f_dkkh = controlObj.text('detail_f_dkkh_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_dkbcgsl = controlObj.text('detail_f_dkbcgsl_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_dkgscs = controlObj.text('detail_f_dkgscs_tbl_ld_ichbbk_detail');


            tbl_ld_ichbbk_detail.f_dkljgl = controlObj.text('detail_f_dkljgl_tbl_ld_ichbbk_detail');


            var dkjzlx = controlObj.text('detail_f_dkjzlx_tbl_ld_ichbbk_detail');

            if (dkjzlx == "冷水")
            {
                tbl_ld_ichbbk_detail.f_dkjzlx = '1';
            }
            else
            {
                tbl_ld_ichbbk_detail.f_dkjzlx = '0';
            }
            
            var dksbzt = controlObj.text('detail_f_dksbzt_tbl_ld_ichbbk_detail');

            if (dksbzt == "卡已读表")
            {
                tbl_ld_ichbbk_detail.f_dksbzt = '1';
            }
            else
            {
                tbl_ld_ichbbk_detail.f_dksbzt = '0';
            }

            
            tbl_ld_ichbbk_detail.f_bssl = controlObj.text('detail_f_bssl_tbl_ld_ichbbk_detail');
            //tbl_ld_ichbbk_detail.f_hbyy = controlObj.text('detail_f_hbyy_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_hbyy = controlObj.singledropdownlistid('detail_f_hbyy_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_hbyyname = controlObj.singledropdownlist('detail_f_hbyy_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_xkms = controlObj.singledropdownlist('detail_f_xkms_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_xkmsid = controlObj.singledropdownlistid('detail_f_xkms_tbl_ld_ichbbk_detail');

            tbl_ld_ichbbk_detail.f_gslb = controlObj.singledropdownlist('detail_f_gslb_tbl_ld_ichbbk_detail');
            tbl_ld_ichbbk_detail.f_gslbid = controlObj.singledropdownlistid('detail_f_gslb_tbl_ld_ichbbk_detail');
            		
            callBackFunction.success(tbl_ld_ichbbk_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_ichbbk_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_ichbbk_detail,validate, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_ichbbk_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_hbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_hbbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_sjbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sjbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_yhm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_jfm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_lxth.length > 200)
            {			
                errorMessageHansMap.put('detail_f_lxth_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_dh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_dz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_xunkr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_xunkr_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_xiekrid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_xiekrid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_yslxid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yslxid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_dy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dy_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_qy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_qy_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_xunkrid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_xunkrid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_xiekrq.length > 200)
            {			
                errorMessageHansMap.put('detail_f_xiekrq_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_yhbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_dyid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dyid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_qyid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_qyid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_xunkrq.length > 200)
            {			
                errorMessageHansMap.put('detail_f_xunkrq_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_khbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_yhbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_sc.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sc_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_pq.length > 200)
            {			
                errorMessageHansMap.put('detail_f_pq_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_xiekr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_xiekr_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_yslx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yslx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_khrq.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khrq_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_scid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_scid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_pqid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_pqid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         
            if (tbl_ld_ichbbk_detail.f_o_sbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_o_sbbhid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            		   
            if (tbl_ld_ichbbk_detail.f_o_sbfzid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbfzid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_khbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sblx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sblx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_cszm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_cszm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_ljgl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_ljgl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_jsbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_jsbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sbpp.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbpp_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_rs.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_rs_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sblxid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sblxid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_bqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_bqzm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_qsqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_qsqpjsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_lxth.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_lxth_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_mph.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_mph_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sbkj.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbkj_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_jllx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_jllx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sqzm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_qlqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_qlqpjsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sbfz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbfz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sbdz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbdz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sbkjid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sbkjid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_jllxid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_jllxid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_sqsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_sqsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_o_bqsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_o_bqsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sbbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sbfz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sbfz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sbpp.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sbpp_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_mph.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_mph_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_rs.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_rs_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sbkj.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sbkj_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_jsbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_jsbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_lxth.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_lxth_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_khbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sblx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sblx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_jllx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_jllx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_ljgl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_ljgl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_cqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_cqzm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sqzm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_bqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_bqzm_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_bqsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_bqsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_qsqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_qsqpjsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_qlqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_qlqpjsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sqsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sqsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_n_sbdz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_n_sbdz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ichbbk_detail.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		

            //新增

            if (tbl_ld_ichbbk_detail.f_o_sbds.length > 200)
            {
                errorMessageHansMap.put('detail_f_o_sbds_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_gslb.length > 200)
            {
                errorMessageHansMap.put('detail_f_gslb_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_gslbid.length > 200)
            {
                errorMessageHansMap.put('detail_f_gslb_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_khfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_khfzid.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfzid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbhid_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ichbbk_detail.f_xklx.length > 200)
            {
                errorMessageHansMap.put('detail_f_xklx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_xkkh.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_xkgscs.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkgscs_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_xkbcgsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkbcgsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_xkms.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkms_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_xkmsid.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkms_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_xkljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkljgl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ichbbk_detail.f_xkjzlx.length > 200)
            {
                errorMessageHansMap.put('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_port.length > 200)
            {
                errorMessageHansMap.put('detail_f_port_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_dkkh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dkkh_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_dkbcgsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_dkbcgsl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_dkgscs.length > 200)
            {
                errorMessageHansMap.put('detail_f_dkgscs_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_dkljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_dkljgl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_detail.f_dkjzlx.length > 200)
            {
                errorMessageHansMap.put('detail_f_dkjzlx_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ichbbk_detail.f_dksbzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_dksbzt_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ichbbk_detail.f_bssl.length > 200)
            {
                errorMessageHansMap.put('detail_f_bssl_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_ichbbk_detail.f_hbyy.length > 200)
            {
                errorMessageHansMap.put('detail_f_hbyy_tbl_ld_ichbbk_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                validate.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                validate.hidden();
                callBackFunction.success(tbl_ld_ichbbk_detail);
            }
            }
            catch (ex)
            {
                callBackFunction.fail( ex.message );
            }

    },

            /* 
    *  
    *  方法:writecheckModel
    *  参数:tbl_ld_ichbbk_detail，callbackFunction
    *  写卡时页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    writeCheckModel = function (tbl_ld_ichbbk_detail, validateMessage, callBackFunction)
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
                        var flag = true;

                        var filter = ",0000554,0000577,0001905,0001705,0001753,0002796,0002566,0002435,0002694,0004901,0002329,0003996,0005265,0000710,0001560,0001804,0001582,0001205,0002867,0004477,2000523,3000188,0001391,0001432,0001214,0002107,0000123,0005614,0002893,0005864,0002722,0001098,0001104,0000959,0001647,0001453,0000610,0005737,0005621,0004772,0004755,0004787,0001670,0002076,0003628,0004692,0002738,0200181,0007003,0000896,0000523,0000806,0001738,0002198,0002870,0002706,0001294,0004273,0005645,0000715,0001121,0001815,0001491,0002691,0004210,0003785,0002736,2000034,";
                        if (filter.indexOf("," + cardno + ",") != -1 && flag)
                        {
                            errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ichbbk_detail','老系统号重复，请联系管理员！');
                        }

                        if (cardno != tbl_ld_ichbbk_detail.f_xkkh)
                        {
                            errorMessageHansMap.put('detail_f_ssbh_tbl_ld_ickss_detail', '选择的售水数据与写卡卡号不一致，请重新选择');
                        }

                        if (tbl_ld_ichbbk_detail.f_xklx.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xklx_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        }


                        if (tbl_ld_ichbbk_detail.f_xkkh.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xkkh_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        }


                        if (tbl_ld_ichbbk_detail.f_xkgscs.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xkgscs_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        }


                        if (tbl_ld_ichbbk_detail.f_xkbcgsl.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xkbcgsl_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
                        //if (tbl_ld_ichbbk_detail.f_hbyy.length < 1)
                        //{
                        //    errorMessageHansMap.put('detail_f_hbyy_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        //}
                        if (tbl_ld_ichbbk_detail.f_hbyyname.length < 1)
            {
                errorMessageHansMap.put('detail_f_hbyy_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            if (tbl_ld_ichbbk_detail.f_gslb.length < 1)
            {
                errorMessageHansMap.put('detail_f_gslb_tbl_ld_ichbbk_detail', '长度不能少于<a style="color:red">1</a>个字');
            }
            if (tbl_ld_ichbbk_detail.f_o_sbds.length < 1)
            {
                errorMessageHansMap.put('detail_f_o_sbds_tbl_ld_ichbbk_detail', '长度不能少于<a style="color:red">1</a>个字');
                        }

                        if (tbl_ld_ichbbk_detail.f_xkms.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xkms_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        }


                        if (tbl_ld_ichbbk_detail.f_xkljgl.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xkljgl_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        }

                        if (tbl_ld_ichbbk_detail.f_xkjzlx.length < 1)
                        {
                            errorMessageHansMap.put('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '长度不能小于<a style="color:red">1</a>个字');
                        }

                        if (errorMessageHansMap.keys().length > 0)
                        {
                            validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                            callBackFunction.fail('');
                        }
                        else
                        {
                            validateMessage.hidden();
                            callBackFunction.success(tbl_ld_ichbbk_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_hbbh^f_sjbh^f_khbh^f_yhm^f_jfm^f_lxth^f_dh^f_dz^f_o_sbbh^f_o_sbbhid^f_o_jsbh^f_o_lxth^f_o_sbfz^f_o_sbfzid^f_o_sbpp^f_o_mph^f_o_sbdz^f_o_khbh^f_o_rs^f_o_sbkj^f_o_sbkjid^f_o_sblx^f_o_sblxid^f_o_jllx^f_o_jllxid^f_o_cszm^f_o_bqzm^f_o_sqzm^f_o_sqsl^f_o_ljgl^f_o_qsqpjsl^f_o_qlqpjsl^f_o_bqsl^f_n_sbbh^f_n_sbfz^f_n_sbfzid^f_n_sbpp^f_n_mph^f_n_rs^f_n_sbkj^f_n_sbkjid^f_n_sblx^f_n_sblxid^f_n_jllx^f_n_jllxid^f_n_ljgl^f_n_cqzm^f_n_sqzm^f_n_bqzm^f_n_jsbh^f_n_lxth^f_n_khbh^f_n_bqsl^f_n_qsqpjsl^f_n_qlqpjsl^f_n_sqsl^f_n_sbdz^f_zt^f_ztid^f_bz^f_xunkr^f_xunkrid^f_xunkrq^f_xiekr^f_xiekrid^f_xiekrq^f_khbhid^f_yslx^f_yslxid^f_yhbh^f_yhbhid^f_khrq^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_o_sbds^f_gslb^f_gslbid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_xklx^f_xkkh^f_xkgscs^f_xkbcgsl^f_xkms^f_xkmsid^f_xkljgl^f_xkjzlx^f_port^f_dkkh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_bssl^f_hbyy^sys_id';
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
        *  参数:tbl_ld_ichbbk_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_ichbbk_detail,type, callbackFunction)
            {

                var d = new Date();                
                var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_hbbh^f_sjbh^f_khbh^f_yhm^f_jfm^f_lxth^f_dh^f_dz^f_o_sbbh^f_o_sbbhid^f_o_jsbh^f_o_lxth^f_o_sbfz^f_o_sbfzid^f_o_sbpp^f_o_mph^f_o_sbdz^f_o_khbh^f_o_rs^f_o_sbkj^f_o_sbkjid^f_o_sblx^f_o_sblxid^f_o_jllx^f_o_jllxid^f_o_cszm^f_o_bqzm^f_o_sqzm^f_o_sqsl^f_o_ljgl^f_o_qsqpjsl^f_o_qlqpjsl^f_o_bqsl^f_n_sbbh^f_n_sbfz^f_n_sbfzid^f_n_sbpp^f_n_mph^f_n_rs^f_n_sbkj^f_n_sbkjid^f_n_sblx^f_n_sblxid^f_n_jllx^f_n_jllxid^f_n_ljgl^f_n_cqzm^f_n_sqzm^f_n_bqzm^f_n_jsbh^f_n_lxth^f_n_khbh^f_n_bqsl^f_n_qsqpjsl^f_n_qlqpjsl^f_n_sqsl^f_n_sbdz^f_zt^f_ztid^f_bz^f_xunkr^f_xunkrid^f_xunkrq^f_xiekr^f_xiekrid^f_xiekrq^f_khbhid^f_yslx^f_yslxid^f_yhbh^f_yhbhid^f_khrq^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_o_sbds^f_gslb^f_gslbid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_xklx^f_xkkh^f_xkgscs^f_xkbcgsl^f_xkms^f_xkmsid^f_xkljgl^f_xkjzlx^f_port^f_dkkh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_bssl^f_hbyy^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {
                    sys_id: that._pr_sys_id,
            
				                f_value1:tbl_ld_ichbbk_detail.f_value1 ,          
		        
				                f_value2:tbl_ld_ichbbk_detail.f_value2 ,          
		        
				                f_value3:tbl_ld_ichbbk_detail.f_value3 ,          
		        
				                f_value4:tbl_ld_ichbbk_detail.f_value4 ,          
		        
				                f_value5:tbl_ld_ichbbk_detail.f_value5 ,          
		        
				                f_value6:tbl_ld_ichbbk_detail.f_value6 ,          
		        
				                f_value7:tbl_ld_ichbbk_detail.f_value7 ,          
		        
				                f_value8:tbl_ld_ichbbk_detail.f_value8 ,          
		        
				                f_value9:tbl_ld_ichbbk_detail.f_value9 ,          
		        
				                f_value10:tbl_ld_ichbbk_detail.f_value10 ,          
		        
				                f_hbbh:tbl_ld_ichbbk_detail.f_hbbh ,          
		        
				                f_sjbh:tbl_ld_ichbbk_detail.f_sjbh ,          
		        
				                f_khbh:tbl_ld_ichbbk_detail.f_khbh ,          
		        
				                f_yhm:tbl_ld_ichbbk_detail.f_yhm ,          
		        
				                f_jfm:tbl_ld_ichbbk_detail.f_jfm ,          
		        
				                f_lxth:tbl_ld_ichbbk_detail.f_lxth ,          
		        
				                f_dh:tbl_ld_ichbbk_detail.f_dh ,          
		        
				                f_dz:tbl_ld_ichbbk_detail.f_dz ,          
		        
				                f_xunkr:tbl_ld_ichbbk_detail.f_xunkr ,          
		        
				                f_xiekrid:tbl_ld_ichbbk_detail.f_xiekrid ,          
		        
				                f_yslxid:tbl_ld_ichbbk_detail.f_yslxid ,          
		        
				                f_dy:tbl_ld_ichbbk_detail.f_dy ,          
		        
				                f_qy:tbl_ld_ichbbk_detail.f_qy ,          
		        
				                f_xunkrid:tbl_ld_ichbbk_detail.f_xunkrid ,          
		        
				                f_xiekrq:tbl_ld_ichbbk_detail.f_xiekrq ,          
		        
				                f_yhbh:tbl_ld_ichbbk_detail.f_yhbh ,          
		        
				                f_dyid:tbl_ld_ichbbk_detail.f_dyid ,          
		        
				                f_qyid:tbl_ld_ichbbk_detail.f_qyid ,          
		        
				                f_xunkrq:tbl_ld_ichbbk_detail.f_xunkrq ,          
		        
				                f_khbhid:tbl_ld_ichbbk_detail.f_khbhid ,          
		        
				                f_yhbhid:tbl_ld_ichbbk_detail.f_yhbhid ,          
		        
				                f_sc:tbl_ld_ichbbk_detail.f_sc ,          
		        
				                f_pq:tbl_ld_ichbbk_detail.f_pq ,          
		        
				                f_xiekr:tbl_ld_ichbbk_detail.f_xiekr ,          
		        
				                f_yslx:tbl_ld_ichbbk_detail.f_yslx ,          
		        
				                f_khrq:tbl_ld_ichbbk_detail.f_khrq ,          
		        
				                f_scid:tbl_ld_ichbbk_detail.f_scid ,          
		        
				                f_pqid:tbl_ld_ichbbk_detail.f_pqid ,          
		        
				                f_o_sbbh: tbl_ld_ichbbk_detail.f_o_sbbh,

				                f_o_sbbhid: tbl_ld_ichbbk_detail.f_o_sbbhid,
		        
				                f_o_sbfzid:tbl_ld_ichbbk_detail.f_o_sbfzid ,          
		        
				                f_o_khbh:tbl_ld_ichbbk_detail.f_o_khbh ,          
		        
				                f_o_sblx:tbl_ld_ichbbk_detail.f_o_sblx ,          
		        
				                f_o_cszm:tbl_ld_ichbbk_detail.f_o_cszm ,          
		        
				                f_o_ljgl:tbl_ld_ichbbk_detail.f_o_ljgl ,          
		        
				                f_o_jsbh:tbl_ld_ichbbk_detail.f_o_jsbh ,          
		        
				                f_o_sbpp:tbl_ld_ichbbk_detail.f_o_sbpp ,          
		        
				                f_o_rs:tbl_ld_ichbbk_detail.f_o_rs ,          
		        
				                f_o_sblxid:tbl_ld_ichbbk_detail.f_o_sblxid ,          
		        
				                f_o_bqzm:tbl_ld_ichbbk_detail.f_o_bqzm ,          
		        
				                f_o_qsqpjsl:tbl_ld_ichbbk_detail.f_o_qsqpjsl ,          
		        
				                f_o_lxth:tbl_ld_ichbbk_detail.f_o_lxth ,          
		        
				                f_o_mph:tbl_ld_ichbbk_detail.f_o_mph ,          
		        
				                f_o_sbkj:tbl_ld_ichbbk_detail.f_o_sbkj ,          
		        
				                f_o_jllx:tbl_ld_ichbbk_detail.f_o_jllx ,          
		        
				                f_o_sqzm:tbl_ld_ichbbk_detail.f_o_sqzm ,          
		        
				                f_o_qlqpjsl:tbl_ld_ichbbk_detail.f_o_qlqpjsl ,          
		        
				                f_o_sbfz:tbl_ld_ichbbk_detail.f_o_sbfz ,          
		        
				                f_o_sbdz:tbl_ld_ichbbk_detail.f_o_sbdz ,          
		        
				                f_o_sbkjid:tbl_ld_ichbbk_detail.f_o_sbkjid ,          
		        
				                f_o_jllxid:tbl_ld_ichbbk_detail.f_o_jllxid ,          
		        
				                f_o_sqsl:tbl_ld_ichbbk_detail.f_o_sqsl ,          
		        
				                f_o_bqsl:tbl_ld_ichbbk_detail.f_o_bqsl ,          
		        
				                f_n_sbbh:tbl_ld_ichbbk_detail.f_n_sbbh ,          
		        
			                    f_n_sbfz:tbl_ld_ichbbk_detail.f_n_sbfz ,
                    f_n_sbfzid:tbl_ld_ichbbk_detail.f_n_sbfzid,          
		        
				                f_n_sbpp:tbl_ld_ichbbk_detail.f_n_sbpp ,          
		        
				                f_n_mph:tbl_ld_ichbbk_detail.f_n_mph ,          
		        
				                f_n_rs:tbl_ld_ichbbk_detail.f_n_rs ,          
		        
			                    f_n_sbkj:tbl_ld_ichbbk_detail.f_n_sbkj ,
                    f_n_sbkjid:tbl_ld_ichbbk_detail.f_n_sbkjid,          
		        
				                f_n_jsbh:tbl_ld_ichbbk_detail.f_n_jsbh ,          
		        
				                f_n_lxth:tbl_ld_ichbbk_detail.f_n_lxth ,          
		        
				                f_n_khbh:tbl_ld_ichbbk_detail.f_n_khbh ,          
		        
			                    f_n_sblx:tbl_ld_ichbbk_detail.f_n_sblx ,
                    f_n_sblxid:tbl_ld_ichbbk_detail.f_n_sblxid,          
		        
			                    f_n_jllx:tbl_ld_ichbbk_detail.f_n_jllx ,
                    f_n_jllxid:tbl_ld_ichbbk_detail.f_n_jllxid,          
		        
				                f_n_ljgl:tbl_ld_ichbbk_detail.f_n_ljgl ,          
		        
				                f_n_cqzm:tbl_ld_ichbbk_detail.f_n_cqzm ,          
		        
				                f_n_sqzm:tbl_ld_ichbbk_detail.f_n_sqzm ,          
		        
				                f_n_bqzm:tbl_ld_ichbbk_detail.f_n_bqzm ,          
		        
				                f_n_bqsl:tbl_ld_ichbbk_detail.f_n_bqsl ,          
		        
				                f_n_qsqpjsl:tbl_ld_ichbbk_detail.f_n_qsqpjsl ,          
		        
				                f_n_qlqpjsl:tbl_ld_ichbbk_detail.f_n_qlqpjsl ,          
		        
				                f_n_sqsl:tbl_ld_ichbbk_detail.f_n_sqsl ,          
		        
				                f_n_sbdz:tbl_ld_ichbbk_detail.f_n_sbdz ,          
		        
			                    f_zt:tbl_ld_ichbbk_detail.f_zt ,
                    f_ztid:tbl_ld_ichbbk_detail.f_ztid,          
		        
                    f_bz: tbl_ld_ichbbk_detail.f_bz.formatStringRN(),

                    //新增

                    f_o_sbds: tbl_ld_ichbbk_detail.f_o_sbds,

                    f_gslb: tbl_ld_ichbbk_detail.f_gslb,

                    f_gslbid: tbl_ld_ichbbk_detail.f_gslbid,

                    f_khfz: tbl_ld_ichbbk_detail.f_khfz,

                    f_khfzid: tbl_ld_ichbbk_detail.f_khfzid,

                    f_cbbh: tbl_ld_ichbbk_detail.f_cbbh,

                    f_cbbhid: tbl_ld_ichbbk_detail.f_cbbhid,

                    f_xklx: tbl_ld_ichbbk_detail.f_xklx,

                    f_xkkh: tbl_ld_ichbbk_detail.f_xkkh,

                    f_xkgscs: tbl_ld_ichbbk_detail.f_xkgscs,

                    f_xkbcgsl: tbl_ld_ichbbk_detail.f_xkbcgsl,

                    f_xkms: tbl_ld_ichbbk_detail.f_xkms,

                    f_xkmsid: tbl_ld_ichbbk_detail.f_xkmsid,

                    f_xkljgl: tbl_ld_ichbbk_detail.f_xkljgl,

                    f_xkjzlx: tbl_ld_ichbbk_detail.f_xkjzlx,

                    f_port: tbl_ld_ichbbk_detail.f_port,

                    f_dkkh: tbl_ld_ichbbk_detail.f_dkkh,

                    f_dkbcgsl: tbl_ld_ichbbk_detail.f_dkbcgsl,

                    f_dkgscs: tbl_ld_ichbbk_detail.f_dkgscs,

                    f_dkljgl: tbl_ld_ichbbk_detail.f_dkljgl,

                    f_dkjzlx: tbl_ld_ichbbk_detail.f_dkjzlx,

                    f_dksbzt: tbl_ld_ichbbk_detail.f_dksbzt,

                    f_bssl: tbl_ld_ichbbk_detail.f_bssl,
                    f_hbyy: tbl_ld_ichbbk_detail.f_hbyy,
		        
			        sys_lasteditusername: basePageObj._userInfoJson.sys_username,
			        sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
			        sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
			};

        var data = {
            columns: columns,
            type:type,
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
            *  方法:f_n_sbfz_onchange
            *  参数:changeEventParameter
            *  新水表水表分组onchange事件
            */
            f_n_sbfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
          
    
          
    
	       
            /* 
            *  
            *  方法:f_n_sbkj_onchange
            *  参数:changeEventParameter
            *  新水表口径onchange事件
            */
            f_n_sbkj_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
          
    
          
    
	       
            /* 
            *  
            *  方法:f_n_sblx_onchange
            *  参数:changeEventParameter
            *  新水表类型onchange事件
            */
            f_n_sblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
	       
            /* 
            *  
            *  方法:f_n_jllx_onchange
            *  参数:changeEventParameter
            *  新水表计量类型onchange事件
            */
            f_n_jllx_onchange = function (e)
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
    
                      //写卡方法
                writeCardAndSetModel = function (tbl_ld_ichbbk_detail, callBackFunction)
                {
                    var date = new Date();
                    tbl_ld_ichbbk_detail.f_xiekr = basePageObj._userInfoJson.sys_username;
                    tbl_ld_ichbbk_detail.f_xiekrid = basePageObj._userInfoJson.sys_userid;
                    tbl_ld_ichbbk_detail.f_xiekrq = date.Format('yyyy-MM-dd');
                    tbl_ld_ichbbk_detail.f_ztid = 2;
                    tbl_ld_ichbbk_detail.f_zt = '写卡';
                    controlObj.text('detail_f_xiekr_tbl_ld_ichbbk_detail', basePageObj._userInfoJson.sys_username);
                    controlObj.text('detail_f_xiekrid_tbl_ld_ichbbk_detail', basePageObj._userInfoJson.sys_userid);
                    controlObj.text('detail_f_xiekrq_tbl_ld_ichbbk_detail', date.Format('yyyy-MM-dd'));
                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ichbbk_detail', '2'); //状态
                    callBackFunction.success(tbl_ld_ichbbk_detail);
                },
     
        end = function(){};
        //=================================================================================
        //                                      公有
        //=================================================================================
        var that = {

            //=================================================================================
            //                                      公有属性 
            //=================================================================================
            _pr_sys_id: '',
            _pr_pagetype: '',
            _pr_fromurl : '',
            _pr_fromurlparam : '',
            _pr_appcode : '',
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
                                                            _validateMessage_read = new validateMessage('btn_command_read_tbl_ld_ichbbk_detail');
                                                            _validateMessage_save = new validateMessage('btn_command_save_tbl_ld_ichbbk_detail');
                                                            _validateMessage_write = new validateMessage('btn_command_write_tbl_ld_ichbbk_detail');

                                                            _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_ichbbk_detail');
                                                            _ladda_btn_command_read = Ladda.create('btn_command_read_tbl_ld_ichbbk_detail');
                                                            _ladda_btn_command_write = Ladda.create('btn_command_write_tbl_ld_ichbbk_detail');
                                                            setDisable();

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

                                                            //加载弹出层

                                                            var sbbhid = controlObj.text("detail_f_o_sbbhid_tbl_ld_ichbbk_detail");
                                                            if (sbbhid != null && sbbhid != "")
                                                            {
                                                                $('#div_container_tbl_ld_sbb_detail').load('../tbl_ld_sbb/tbl_ld_sbb_detail_part.html', null, function ()
                                                                {

                                                                    tbl_ld_sbb_detail_Obj._pr_pagetype = '2';
                                                                    tbl_ld_sbb_detail_Obj._pr_sys_id = sbbhid;
                                                                    tbl_ld_sbb_detail_Obj.init({
                                                                        success: function ()
                                                                        {
                                                                            tbl_ld_sbb_detail_Obj.bindPage({
                                                                                success: function ()
                                                                                {
                                                                                    $('#div_container_tbl_ld_sbb_detail').css('display', '');
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                });
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
                        success: function (tbl_ld_ichbbk_detail)
                            {
                                setModel(tbl_ld_ichbbk_detail, {
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
                        success: function (tbl_ld_ichbbk_detail)
                            {
                            checkModel(tbl_ld_ichbbk_detail,_validateMessage_save, {
                                    success: function (tbl_ld_ichbbk_detail)
                                        {
                                            updateData(tbl_ld_ichbbk_detail,'pt', {
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
                                            if(message != '')
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
                            fail:function(message)
                            {
                                _ladda_btn_command_save.stop();
                                _alertMessage.show('数据获取失败', 'warning');
                                _resultMessage.show(message);
                            }
                        });
                }
                catch (ex)
                {
                    _alertMessage.show('保存程序异常。','fail');
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
            *  方法:btn_command_read_onclick
            *  参数:
            *  寻卡按钮
            */
            btn_command_read_onclick: function ()
            {
                clearModel();
                try
                {
                    _ladda_btn_command_read.start();
                    getModel({
                        success: function (tbl_ld_ichbbk_detail)
                        {
                            checkModel(tbl_ld_ichbbk_detail,_validateMessage_read, {
                                success: function (tbl_ld_ichbbk_detail)
                                {
                                    updateData(tbl_ld_ichbbk_detail,'pt', {
                                        success: function ()
                                        {
                                            iccard_part_Obj.command({ "commandName": "read", "port": _port }, {
                                                success: function (messageJson)
                                                {
                                                    if (messageJson.result == 'true')
                                                    {
                                                        controlObj.singledropdownlistid("detail_f_xkms_tbl_ld_ichbbk_detail", '2');
                                                        //{"mcardno":"22222222","mbcgsl":"22","mgscs":"0","mljgl":"333","Mediatype":"0","mstate":"1"}
                                                        var aaa = (new Function("", "return " + messageJson.message))();

                                                        var cardno = aaa.mcardno.substring(1, aaa.mcardno.length);
                                                        //读卡写卡信息
                                                        controlObj.text('detail_f_port_tbl_ld_ichbbk_detail', _port);//串口ok

                                                        controlObj.text('detail_f_xkkh_tbl_ld_ichbbk_detail', cardno);//写卡卡号ok

                                                        controlObj.text('detail_f_xkgscs_tbl_ld_ichbbk_detail', aaa.mgscs);//写卡购水次数ok

                                                        controlObj.text('detail_f_xklx_tbl_ld_ichbbk_detail', '普通卡');//写卡类型ok

                                                        

                                                        controlObj.text('detail_f_dkkh_tbl_ld_ichbbk_detail', cardno);//读卡卡号ok

                                                        controlObj.text('detail_f_dkgscs_tbl_ld_ichbbk_detail', aaa.mgscs);//读卡购水次数

                                                        controlObj.text('detail_f_dkbcgsl_tbl_ld_ichbbk_detail', aaa.mbcgsl);//读卡本次购水量


                                                        if (aaa.Mediatype == '0')
                                                        {
                                                            var Mediatype = '任意';
                                                        } else
                                                        {
                                                            var Mediatype = '冷水';
                                                        }
                                                        controlObj.text('detail_f_dkjzlx_tbl_ld_ichbbk_detail', Mediatype);//读卡介质类型

                                                        if (aaa.mstate == '0')
                                                        {
                                                            var mstate = '卡内有水，尚未读表';
                                                        } else
                                                        {
                                                            var mstate = '卡已读表';
                                                        }
                                                        controlObj.text('detail_f_dksbzt_tbl_ld_ichbbk_detail', mstate);//刷表状态

                                                        var mcard = aaa.mcardno;
                                                        while (mcard.length < 8)
                                                        {
                                                            mcard = "0" + mcard;
                                                        }
                                                        var card03 = "03" + mcard;
                                                        var card00 = "00" + mcard;

                                                        var sqlJson = {
                                                            "tbl_ld_khb_lxth": "select * from tbl_ld_khb where sys_delflag='0' and f_ztid='0'and f_lxth = '" + cardno + "' order by sys_id",
                                                            "tbl_ld_khb_sb03": "select * from tbl_ld_khb where sys_delflag='0' and f_ztid='0'and f_sbbh = '" + card03 + "' order by sys_id",
                                                            "tbl_ld_khb_sb00": "select * from tbl_ld_khb where sys_delflag='0' and f_ztid='0'and f_sbbh = '" + card00 + "' order by sys_id"
                                                        }
                                                        commonObj.querySqls(sqlJson, {
                                                            success: function (messageJson1)
                                                            {
                                                                var flag = true;
                                                                if (messageJson1["tbl_ld_khb_lxth"].length == 0 && messageJson1["tbl_ld_khb_sb03"].length == 0 && messageJson1["tbl_ld_khb_sb00"].length == 0)
                                                                {
                                                                    _ladda_btn_command_read.stop();
                                                                    _alertMessage.show('此水卡用户不存在，请联系管理员！', 'fail');
                                                                    flag = false;
                                                                } else if (messageJson1["tbl_ld_khb_lxth"].length == 1)
                                                                {
                                                                    _ladda_btn_command_read.stop();
                                                                    //初始化客户信息
                                                                    messageJson1 = messageJson1["tbl_ld_khb_lxth"][0];
                                                                } else if (messageJson1["tbl_ld_khb_sb03"].length == 1)
                                                                {
                                                                    _ladda_btn_command_read.stop();
                                                                    //初始化客户信息
                                                                    messageJson1 = messageJson1["tbl_ld_khb_sb03"][0];
                                                                } else if (messageJson1["tbl_ld_khb_sb00"].length == 1)
                                                                {
                                                                    _ladda_btn_command_read.stop();
                                                                    //初始化客户信息
                                                                    messageJson1 = messageJson1["tbl_ld_khb_sb00"][0];
                                                                } else
                                                                {
                                                                    _ladda_btn_command_read.stop();

                                                                    _alertMessage.show('此水卡对应多个用户' + cardno + '|' + card03 + '|' + card00 + '，请联系管理员！', 'fail');

                                                                    flag = false;

                                                                }

                                                                if(flag){


                                                                    var date = new Date();

                                                                    controlObj.text('detail_f_xkljgl_tbl_ld_ichbbk_detail', messageJson1["f_ickljgl"]);//写卡累计购水量 

                                                                    controlObj.text('detail_f_dkljgl_tbl_ld_ichbbk_detail', messageJson1["f_ickljgl"]);//读卡累计购水量 

                                                                    controlObj.text('detail_f_lbljgl_tbl_ld_ichbbk_detail', messageJson1["f_ickljgl"]);//老表累计购水量 

                                                                    controlObj.text('detail_f_khbh_tbl_ld_ichbbk_detail', messageJson1["f_khbh"]);//客户编号

                                                                    controlObj.text('detail_f_yhm_tbl_ld_ichbbk_detail', messageJson1["f_yhm"]);//用户名

                                                                    controlObj.text('detail_f_jfm_tbl_ld_ichbbk_detail', messageJson1["f_jfm"]);//缴费名

                                                                    controlObj.text('detail_f_lxth_tbl_ld_ichbbk_detail', cardno);//老系统号

                                                                    controlObj.text('detail_f_dh_tbl_ld_ichbbk_detail', messageJson1["f_dh"]);//电话

                                                                    controlObj.text('detail_f_dz_tbl_ld_ichbbk_detail', messageJson1["f_dz"]);//地址

                                                                    controlObj.text('detail_f_value1_tbl_ld_ichbbk_detail', messageJson1["f_sbdz"]);//地址

                                                                    controlObj.text('detail_f_xunkr_tbl_ld_ichbbk_detail', basePageObj._userInfoJson.sys_username);//寻卡人

                                                                    controlObj.text('detail_f_yslxid_tbl_ld_ichbbk_detail', messageJson1["f_yslxid"]);//用水类别id

                                                                    controlObj.text('detail_f_dy_tbl_ld_ichbbk_detail', messageJson1["f_dy"]);//地域

                                                                    controlObj.text('detail_f_qy_tbl_ld_ichbbk_detail', messageJson1["f_qy"]);//区域

                                                                    controlObj.text('detail_f_xunkrid_tbl_ld_ichbbk_detail', basePageObj._userInfoJson.sys_userid);//寻卡人id

                                                                    controlObj.text('detail_f_yhbh_tbl_ld_ichbbk_detail', messageJson1["f_yhbh"]);//用户编号

                                                                    controlObj.text('detail_f_dyid_tbl_ld_ichbbk_detail', messageJson1["f_dyid"]);//地域id

                                                                    controlObj.text('detail_f_qyid_tbl_ld_ichbbk_detail', messageJson1["f_qyid"]);//区域id

                                                                    controlObj.text('detail_f_xunkrq_tbl_ld_ichbbk_detail', date.Format('yyyy-MM-dd'));//寻卡日期

                                                                    controlObj.text('detail_f_khbhid_tbl_ld_ichbbk_detail', messageJson1["sys_id"]);//客户编号id

                                                                    controlObj.text('detail_f_yhbhid_tbl_ld_ichbbk_detail', messageJson1["f_yhbhid"]);//用户编号id

                                                                    controlObj.text('detail_f_sc_tbl_ld_ichbbk_detail', messageJson1["f_sc"]);//水厂

                                                                    controlObj.text('detail_f_pq_tbl_ld_ichbbk_detail', messageJson1["f_pq"]);//片区

                                                                    controlObj.text('detail_f_yslx_tbl_ld_ichbbk_detail', messageJson1["f_yslx"]);//用水类别

                                                                    controlObj.text('detail_f_khrq_tbl_ld_ichbbk_detail', messageJson1["f_khrq"]);//开户时间

                                                                    controlObj.text('detail_f_scid_tbl_ld_ichbbk_detail', messageJson1["f_scid"]);//水厂id

                                                                    controlObj.text('detail_f_pqid_tbl_ld_ichbbk_detail', messageJson1["f_pqid"]);//片区id

                                                                    //新增

                                                                    controlObj.text('detail_f_khfz_tbl_ld_ichbbk_detail', messageJson1["f_khfz"]);//客户分组

                                                                    controlObj.text('detail_f_khfzid_tbl_ld_ichbbk_detail', messageJson1["f_khfzid"]);//客户分组id

                                                                    controlObj.text('detail_f_cbbh_tbl_ld_ichbbk_detail', messageJson1["f_cbbh"]);//抄本编号

                                                                    controlObj.text('detail_f_cbbhid_tbl_ld_ichbbk_detail', messageJson1["f_cbbhid"]);//抄本编号id

                                                                    //获取老水表信息
                                                                    var sbbhid = messageJson1["f_sbbhid"];
                                                                    var sqlStringsJson = {
                                                                        "tbl_ld_sbb": "select * from TBL_LD_SBB where sys_delflag='0' and f_ztid='0'and SYS_ID='" + sbbhid + "'"
                                                                    };

                                                                    commonObj.querySqls(sqlStringsJson, {
                                                                        success: function (resultJson)
                                                                        {
                                                                            if (resultJson["tbl_ld_sbb"].length > 0)
                                                                            {
                                                                                resultJson = resultJson["tbl_ld_sbb"][0];

                                                                                //老水表赋值
                                                                                controlObj.text('detail_f_o_sbbh_tbl_ld_ichbbk_detail', resultJson["f_sbbh"]);

                                                                                controlObj.text('detail_f_o_sbbhid_tbl_ld_ichbbk_detail', resultJson["sys_id"]);

                                                                                controlObj.text('detail_f_o_sbfzid_tbl_ld_ichbbk_detail', resultJson["f_sbfzid"]);

                                                                                controlObj.text('detail_f_o_sblx_tbl_ld_ichbbk_detail', resultJson["f_sblx"]);


                                                                                controlObj.text('detail_f_o_khbh_tbl_ld_ichbbk_detail', resultJson["f_khbh"]);

                                                                                controlObj.text('detail_f_o_cszm_tbl_ld_ichbbk_detail', resultJson["f_cszm"]);

                                                                                controlObj.text('detail_f_o_ljgl_tbl_ld_ichbbk_detail', resultJson["f_ljgl"]);

                                                                                controlObj.text('detail_f_o_jsbh_tbl_ld_ichbbk_detail', resultJson["f_ztsbh"]);

                                                                                controlObj.text('detail_f_o_sbpp_tbl_ld_ichbbk_detail', resultJson["f_sbpp"]);

                                                                                controlObj.text('detail_f_o_rs_tbl_ld_ichbbk_detail', resultJson["f_rs"]);

                                                                                controlObj.text('detail_f_o_sblxid_tbl_ld_ichbbk_detail', resultJson["f_sblxid"]);

                                                                                controlObj.text('detail_f_o_bqzm_tbl_ld_ichbbk_detail', resultJson["f_bqzm"]);

                                                                                controlObj.text('detail_f_o_qsqpjsl_tbl_ld_ichbbk_detail', resultJson["f_qsqpjsl"]);

                                                                                controlObj.text('detail_f_o_lxth_tbl_ld_ichbbk_detail', resultJson["f_lxth"]);

                                                                                controlObj.text('detail_f_o_mph_tbl_ld_ichbbk_detail', resultJson["f_mph"]);

                                                                                controlObj.text('detail_f_o_sbkj_tbl_ld_ichbbk_detail', resultJson["f_sbkj"]);

                                                                                controlObj.text('detail_f_o_jllx_tbl_ld_ichbbk_detail', resultJson["f_jllx"]);

                                                                                controlObj.text('detail_f_o_sqzm_tbl_ld_ichbbk_detail', resultJson["f_sqzm"]);

                                                                                controlObj.text('detail_f_o_qlqpjsl_tbl_ld_ichbbk_detail', resultJson["f_qlqpjsl"]);

                                                                                controlObj.text('detail_f_o_sbfz_tbl_ld_ichbbk_detail', resultJson["f_sbfz"]);


                                                                                controlObj.text('detail_f_o_sbdz_tbl_ld_ichbbk_detail', resultJson["f_sbdz"]);

                                                                                controlObj.text('detail_f_o_sbkjid_tbl_ld_ichbbk_detail', resultJson["f_sbkjid"]);

                                                                                controlObj.text('detail_f_o_jllxid_tbl_ld_ichbbk_detail', resultJson["f_jllxid"]);

                                                                                controlObj.text('detail_f_o_sqsl_tbl_ld_ichbbk_detail', resultJson["f_sqsl"]);

                                                                                controlObj.text('detail_f_o_bqsl_tbl_ld_ichbbk_detail', resultJson["f_bqsl"]);

                                                                                ////新增
                                                                                //var sbds = '0';
                                                                                //if (resultJson["f_bqzm"] == null || resultJson["f_bqzm"] == "")
                                                                                //{
                                                                                //    if (resultJson["f_cszm"] != null || resultJson["f_cszm"] != "")
                                                                                //    {
                                                                                //        sbds = resultJson["f_cszm"];
                                                                                //    }
                                                                                //}
                                                                                //else
                                                                                //{
                                                                                //    sbds = resultJson["f_bqzm"];
                                                                                //}
                                                                                //controlObj.text('detail_f_o_sbds_tbl_ld_ichbbk_detail', sbds);//老水表底数

                                                                                if (resultJson["f_sblxid"] == '13')
                                                                                {
                                                                                    controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '冷水');//写卡介质类型
                                                                                }
                                                                                else
                                                                                {
                                                                                    controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail', '任意');//写卡介质类型
                                                                                }


                                                                                //新水表赋值

                                                                                //新水表编号
                                                                                var data = {
                                                                                    typeid: 'SB',
                                                                                    nodeid: '12'
                                                                                }
                                                                                doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                                                                                    success: function (message)
                                                                                    {
                                                                                        controlObj.text('detail_f_n_sbbh_tbl_ld_ichbbk_detail', message);

                                                                                    },
                                                                                    fail: function (message)
                                                                                    {
                                                                                        _blockMessage.show('获取最大业务表号失败' + message, 'fail');
                                                                                    }
                                                                                });




                                                                                controlObj.singledropdownlistid('detail_f_n_sbfz_tbl_ld_ichbbk_detail', resultJson["f_sbfzid"]);

                                                                                controlObj.text('detail_f_n_sbpp_tbl_ld_ichbbk_detail', resultJson["f_sbpp"]);

                                                                                controlObj.text('detail_f_n_mph_tbl_ld_ichbbk_detail', resultJson["f_mph"]);


                                                                                controlObj.text('detail_f_n_rs_tbl_ld_ichbbk_detail', resultJson["f_rs"]);

                                                                                controlObj.singledropdownlistid('detail_f_n_sbkj_tbl_ld_ichbbk_detail', resultJson["f_sbkjid"]);

                                                                                controlObj.text('detail_f_n_jsbh_tbl_ld_ichbbk_detail', resultJson["f_ztsbh"]);

                                                                                controlObj.text('detail_f_n_lxth_tbl_ld_ichbbk_detail', resultJson["f_lxth"]);

                                                                                controlObj.text('detail_f_n_khbh_tbl_ld_ichbbk_detail', resultJson["f_khbh"]);

                                                                                controlObj.singledropdownlistid('detail_f_n_sblx_tbl_ld_ichbbk_detail', resultJson["f_sblxid"]);

                                                                                controlObj.singledropdownlistid('detail_f_n_jllx_tbl_ld_ichbbk_detail', resultJson["f_jllxid"]);

                                                                                controlObj.text('detail_f_n_ljgl_tbl_ld_ichbbk_detail', resultJson["f_ljgl"]);

                                                                                controlObj.text('detail_f_n_cqzm_tbl_ld_ichbbk_detail', resultJson["f_cszm"]);

                                                                                controlObj.text('detail_f_n_sqzm_tbl_ld_ichbbk_detail', resultJson["f_sqzm"]);

                                                                                controlObj.text('detail_f_n_bqzm_tbl_ld_ichbbk_detail', resultJson["f_bqzm"]);

                                                                                controlObj.text('detail_f_n_bqsl_tbl_ld_ichbbk_detail', resultJson["f_bqsl"]);

                                                                                controlObj.text('detail_f_n_qsqpjsl_tbl_ld_ichbbk_detail', resultJson["f_qsqpjsl"]);

                                                                                controlObj.text('detail_f_n_qlqpjsl_tbl_ld_ichbbk_detail', resultJson["f_qlqpjsl"]);

                                                                                controlObj.text('detail_f_n_sqsl_tbl_ld_ichbbk_detail', resultJson["f_sqsl"]);

                                                                                controlObj.text('detail_f_n_sbdz_tbl_ld_ichbbk_detail', resultJson["f_sbdz"]);

                                                                                //加载弹出层
                                                                                $('#div_container_tbl_ld_sbb_detail').load('../tbl_ld_sbb/tbl_ld_sbb_detail_part.html', null, function ()
                                                                                {

                                                                                    tbl_ld_sbb_detail_Obj._pr_pagetype = '2';
                                                                                    tbl_ld_sbb_detail_Obj._pr_sys_id = sbbhid;
                                                                                    tbl_ld_sbb_detail_Obj.init({
                                                                                        success: function ()
                                                                                        {
                                                                                            tbl_ld_sbb_detail_Obj.bindPage({
                                                                                                success: function ()
                                                                                                {
                                                                                                    _ladda_btn_command_read.stop();
                                                                                                    controlObj.singledropdownlistid("detail_f_zt_tbl_ld_ichbbk_detail", '1');
                                                                                                    controlObj.singledropdownlistid("detail_f_xkms_tbl_ld_ichbbk_detail", '2');
                                                                                                    _alertMessage.show('读卡保存成功', 'success', 2000);
                                                                                                    $('#div_container_tbl_ld_sbb_detail').css('display', '');
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });

                                                                            } else
                                                                            {
                                                                                _ladda_btn_command_read.stop();
                                                                                _alertMessage.show('购水卡内水表id错误！<br/>', 'fail');
                                                                            }

                                                                        },
                                                                        fail: function ()
                                                                        {
                                                                            _ladda_btn_command_read.stop();
                                                                            _alertMessage.show('加载失败<br/>', 'fail');
                                                                        }
                                                                    });
                                                                }


                                                            },
                                                            fail: function (message)
                                                            {
                                                                _ladda_btn_command_read.stop();
                                                                _alertMessage.show('读卡失败！', 'fail');
                                                            }
                                                        })
                                                    }
                                                    else
                                                    {
                                                        _ladda_btn_command_read.stop();
                                                        _alertMessage.show('读卡失败,请使用IC卡工具进行端口设置。', 'fail');
                                                    }

                                                }, fail: function (message)
                                                {
                                                    _ladda_btn_command_read.stop();
                                                    _alertMessage.show('读卡失败！', 'fail');
                                                }
                                            })

                                        },
                                        fail: function (message)
                                        {
                                            _ladda_btn_command_read.stop();
                                            _alertMessage.show('保存失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _ladda_btn_command_read.stop();
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
                            _ladda_btn_command_read.stop();
                            _alertMessage.show('数据获取失败', 'warning');
                            _resultMessage.show(message);
                        }
                    });
                }
                catch (ex)
                {
                    _ladda_btn_command_read.stop();
                    _alertMessage.show('保存程序异常。', 'fail');
                    _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
                }
                
            },

            //写卡按钮
            btn_command_write_onclick: function ()
            {

                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对当前的页面进行<a style="color:red">写卡</a>操作</h3>';
                confirmContent += '<br/>';
                confirmContent += '<h5>写卡后的页面将丢失当前全部设置</h5>';
                confirmContent += '<h5>请确定执行此操作</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('写卡确认？', confirmContent,
                        {
                            confirm: function ()
                            {
                                try
                                {
                                    var sbzt = controlObj.text("detail_f_mstate_tbl_ld_ichbbk_detail");
                                    if (sbzt == "卡内有水，尚未读表")
                                    {
                                        _alertMessage.show('写卡失败,卡内有水，尚未读表不能再进行写卡', 'fail');

                                    }
                                    else
                                    {

                                        _ladda_btn_command_write.start();
                                        getModel({
                                            success: function (tbl_ld_ichbbk_detail)
                                            {
                                                checkModel(tbl_ld_ichbbk_detail, _validateMessage_write, {
                                                    success: function (tbl_ld_ichbbk_detail)
                                                    {
                                                        writeCheckModel(tbl_ld_ichbbk_detail, _validateMessage_write, {
                                                            success: function (tbl_ld_ichbbk_detail)
                                                            {
                                                                writeCardAndSetModel(tbl_ld_ichbbk_detail, {
                                                                    success: function (tbl_ld_ichbbk_detail)
                                                                    {
                                                                        updateData(tbl_ld_ichbbk_detail, 'hb', {
                                                                            success: function ()
                                                                            {

                                                                                var xklx = controlObj.text('detail_f_xklx_tbl_ld_ichbbk_detail');
                                                                                var xkkh = controlObj.text('detail_f_xkkh_tbl_ld_ichbbk_detail');
                                                                                var gscs = controlObj.text('detail_f_xkgscs_tbl_ld_ichbbk_detail');
                                                                                var bcgsl = controlObj.text('detail_f_xkbcgsl_tbl_ld_ichbbk_detail');
                                                                                var xkms = '2';
                                                                                var ljgl = controlObj.text('detail_f_xkljgl_tbl_ld_ichbbk_detail');
                                                                                var jzlx = controlObj.text('detail_f_xkjzlx_tbl_ld_ichbbk_detail');
                                                                               
                                                                                if (xkkh.length == 8)
                                                                                {
                                                                                    var tempkh = xkkh.substringsubstring(1,xkkh.length);
                                                                                }
                                                                                else
                                                                                {
                                                                                    var tempkh = xkkh;
                                                                                }
                                                                                var lsbbh = controlObj.text('detail_f_o_sbbh_tbl_ld_ichbbk_detail');
                                                                                lsbbh = lsbbh.substring(3, lsbbh.length);
                                                                                if (tempkh == lsbbh)
                                                                                {
                                                                                    tempkh = controlObj.text('detail_f_n_sbbh_tbl_ld_ichbbk_detail');
                                                                                    xkkh = tempkh.substring(3, tempkh.length);
                                                                                }
                                                                                if (jzlx == "任意")
                                                                                {
                                                                                    jzlx = '0';
                                                                                } else if (jzlx == "冷水")
                                                                                {
                                                                                    jzlx = '1';
                                                                                }
                                                                                if (xklx == "普通卡")
                                                                                {
                                                                                    xklx = '0';
                                                                                } else if (xklx == "补卡")
                                                                                {
                                                                                    xklx = '1';
                                                                                }
                                                                                iccard_part_Obj.command({ "commandName": "write", "port": _port, "xklx": xklx, "mcardno": xkkh, "mgscs": gscs, "mbcgsl": bcgsl, "mCzmode": xkms, "mljgl": ljgl, "Mediatype": jzlx }, {
                                                                                    success: function (messageJson)
                                                                                    {


                                                                                        if (messageJson.result == 'true')
                                                                                        {
                                                                                            _ladda_btn_command_write.stop();
                                                                                            _alertMessage.show('写卡成功', 'success', 3000);
                                                                                            setDisable();

                                                                                        } else
                                                                                        {
                                                                                            _ladda_btn_command_write.stop();
                                                                                            _alertMessage.show('写卡失败,请使用IC卡工具进行端口设置。', 'fail');
                                                                                        }

                                                                                    }, fail: function (message)
                                                                                    {
                                                                                        _ladda_btn_command_write.stop();
                                                                                        _alertMessage.show('写卡异常' + message, 'fail');
                                                                                    }
                                                                                });


                                                                            },
                                                                            fail: function (message)
                                                                            {
                                                                                _ladda_btn_command_write.stop();
                                                                                _alertMessage.show('提交失败', 'fail');
                                                                                _resultMessage.show(message);
                                                                            }
                                                                        });
                                                                    }
                                                                });

                                                            },
                                                            fail: function (message)
                                                            {
                                                                _ladda_btn_command_write.stop();
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
                                                        _ladda_btn_command_write.stop();
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
                                                _ladda_btn_command_write.stop();
                                                _alertMessage.show('数据获取失败', 'warning');
                                                _resultMessage.show(message);
                                            }
                                        });
                                    }

                                }
                                catch (ex)
                                {
                    _ladda_btn_command_write.stop();
                    _alertMessage.show('写卡程序异常。', 'fail');
                    _resultMessage.show('写卡程序异常<br/>' + ex.message, 'fail');
                                }
                            },
                            cancle: function ()
                            {

                            }
                        });






            },

            /* 
*  
*  方法:btn_command_bs_onclick
*  参数:
*  补水计算按钮
*/
            btn_command_jsbs_onclick: function ()
            {

                var lbds = controlObj.text("detail_f_o_sbds_tbl_ld_ichbbk_detail");
                
                if (lbds != null && lbds != "")
                {
                    var xkljgl = controlObj.text("detail_f_xkljgl_tbl_ld_ichbbk_detail");
                    var ljgl = controlObj.text("detail_f_dkljgl_tbl_ld_ichbbk_detail");
                    var bssl = parseInt(ljgl) - parseInt(lbds);
                    if (bssl < 0)
                    {
                        _alertMessage.show('老表底数大于购水水量，请先清欠', 'fail');
                    }
                    else
                    {
                        controlObj.text("detail_f_bssl_tbl_ld_ichbbk_detail", bssl);
                        controlObj.text("detail_f_xkbcgsl_tbl_ld_ichbbk_detail", bssl);
                        controlObj.text("detail_f_xkljgl_tbl_ld_ichbbk_detail", bssl);
                    }

                }
                else
                {
                    _alertMessage.show('老表底数不能为空', 'fail');
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
    tbl_ld_ichbbk_detail_Obj.init();
});




