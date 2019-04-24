

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_jfbimp_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jfbimp.asmx/',
        _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,

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
            //;
            that._pr_fromurl = requestQuery('fromurl');
            that._pr_fromurlparam = requestQuery('fromurlparam');
            that._pr_sys_id = requestQuery('sys_id');
            that._pr_pagetype = requestQuery('pagetype');
            that._pr_appcode = requestQuery('appcode');
            that._pr_imptype = requestQuery('imptype');

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
    
        codeServiceId += "0774^";
     
        codeServiceId += "0775^";
        
        codeServiceId += "0776^";
        
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
      
                    _baseCodeHashMap.put('codeservice_0774', resultArray['0774']);
                    
                    _baseCodeHashMap.put('codeservice_0775', resultArray['0775']);
                    
                    _baseCodeHashMap.put('codeservice_0776', resultArray['0776']);
                    //;
                    var sqlStringsJson = {
                        "drpcmc": 'select distinct(a.f_drpcmc) as text,a.f_drpcmc as id  from tbl_ld_jfbimp a where a.f_czrid=\'' + basePageObj._userInfoJson.sys_userid + '\'and a.sys_delflag=\'0\' and a.f_drpcmc is not null '

                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson) {
                            _baseCodeHashMap.put('servicecode_drpcmc', resultJson['drpcmc']);
                            callBackFunction.success();
                        },
                        fail: function (message) {
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
            
  
            var codeService_0774 = _baseCodeHashMap.get('codeservice_0774');
        
            var codeService_0775 = _baseCodeHashMap.get('codeservice_0775');
            
            var codeService_0776 = _baseCodeHashMap.get('codeservice_0776');
            var servicecode_drpcmc = _baseCodeHashMap.get('servicecode_drpcmc');

    						 
            controlObj.autocompleteinit('detail_f_drpcmc_tbl_ld_jfbimp_detail', servicecode_drpcmc, f_drpcmc_onchange);
          
            	
            controlObj.fileuploaderinit('detail_f_drfj_tbl_ld_jfbimp_detail', {"fileUploadExtnames":";.txt;","fileUploadCountMax":"1","isThumbnailImgShow":false}, f_drfj_onchange);          
    	
            controlObj.datetimeinit('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);          
            	
            controlObj.singledropdownlistinit('detail_f_lx_tbl_ld_jfbimp_detail', codeService_0775,f_lx_onchange);
          
            	
            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_jfbimp_detail', codeService_0776,f_zt_onchange);
          
            	
				
          
            
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
            
            controlObj.textdisable('detail_f_drbh_tbl_ld_jfbimp_detail', isDisable);          
            
            controlObj.textdisable('detail_f_drpcmc_tbl_ld_jfbimp_detail', isDisable);          
            
            controlObj.fileuploaderdisable('detail_f_drfj_tbl_ld_jfbimp_detail', isDisable);          
            
            controlObj.textdisable('detail_f_czr_tbl_ld_jfbimp_detail', isDisable);          
            
            controlObj.textdisable('detail_f_czrid_tbl_ld_jfbimp_detail', isDisable);          
            
            controlObj.datetimedisable('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_lx_tbl_ld_jfbimp_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_jfbimp_detail', isDisable);          
            
            controlObj.textdisable('detail_f_bz_tbl_ld_jfbimp_detail', isDisable);          
             
            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_jfbimp_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_jfbimp_detail').removeClass('hidden');
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
    *  参数:tbl_ld_jfbimp_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_jfbimp_detail, callBackFunction)
    {
        try
        {
            
            controlObj.text('detail_f_value1_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value1);          
		
            controlObj.text('detail_f_value2_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value2);          
		
            controlObj.text('detail_f_value3_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value3);          
		
            controlObj.text('detail_f_value4_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value4);          
		
            controlObj.text('detail_f_value5_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value5);          
		
            controlObj.text('detail_f_value6_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value6);          
		
            controlObj.text('detail_f_value7_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value7);          
		
            controlObj.text('detail_f_value8_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value8);          
		
            controlObj.text('detail_f_value9_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value9);          
		
            controlObj.text('detail_f_value10_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_value10);          
		
            controlObj.text('detail_f_drbh_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_drbh);          
		
            controlObj.text('detail_f_drpcmc_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_drpcmc);          
		
            controlObj.fileuploaderbind('detail_f_drfj_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_drfj);          
		
            controlObj.text('detail_f_czr_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_czr);          
		
            controlObj.text('detail_f_czrid_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_czrid);          
		
						
            controlObj.datetime('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', tbl_ld_jfbimp_detail.f_czsj);          
		
            controlObj.singledropdownlistid('detail_f_lx_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_lxid);          
		
            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_ztid);          
		
            controlObj.text('detail_f_bz_tbl_ld_jfbimp_detail', tbl_ld_jfbimp_detail.f_bz.returnStringRN());          
				
            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');  
        }       
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_ld_jfbimp_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_jfbimp_detail = new Object();
            
					
            tbl_ld_jfbimp_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_drbh = controlObj.text('detail_f_drbh_tbl_ld_jfbimp_detail');          
            
            tbl_ld_jfbimp_detail.f_drpcmc = controlObj.text('detail_f_drpcmc_tbl_ld_jfbimp_detail');          
            
            tbl_ld_jfbimp_detail.f_drfj = controlObj.fileuploaderid('detail_f_drfj_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_jfbimp_detail');          
            
            tbl_ld_jfbimp_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time');          
            
            tbl_ld_jfbimp_detail.f_lx = controlObj.singledropdownlist('detail_f_lx_tbl_ld_jfbimp_detail');
            tbl_ld_jfbimp_detail.f_lxid = controlObj.singledropdownlistid('detail_f_lx_tbl_ld_jfbimp_detail');          
            
            tbl_ld_jfbimp_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_jfbimp_detail');
            tbl_ld_jfbimp_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfbimp_detail');          
            
					
            tbl_ld_jfbimp_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_jfbimp_detail');          
            		
            callBackFunction.success(tbl_ld_jfbimp_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_jfbimp_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_jfbimp_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_jfbimp_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_drbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_drbh_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_jfbimp_detail.f_drbh.length < 1)
            {			
                errorMessageHansMap.put('detail_f_drbh_tbl_ld_jfbimp_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_drpcmc.length > 200)
            {			
                errorMessageHansMap.put('detail_f_drpcmc_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_drfj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_drfj_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_czr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_czr_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_czrid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_czrid_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_lx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_lx_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jfbimp_detail.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_jfbimp_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_jfbimp_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_drfj^f_drbh^f_drpcmc^f_czr^f_czrid^f_lx^f_lxid^f_zt^f_ztid^f_bz^f_czsj^sys_id';
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
        *  参数:tbl_ld_jfbimp_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_jfbimp_detail, callbackFunction)
        {

            var d = new Date();                
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_drfj^f_drbh^f_drpcmc^f_czr^f_czrid^f_lx^f_lxid^f_zt^f_ztid^f_bz^f_czsj^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,
            
                f_value1:tbl_ld_jfbimp_detail.f_value1 ,          
		        
                f_value2:tbl_ld_jfbimp_detail.f_value2 ,          
		        
                f_value3:tbl_ld_jfbimp_detail.f_value3 ,          
		        
                f_value4:tbl_ld_jfbimp_detail.f_value4 ,          
		        
                f_value5:tbl_ld_jfbimp_detail.f_value5 ,          
		        
                f_value6:tbl_ld_jfbimp_detail.f_value6 ,          
		        
                f_value7:tbl_ld_jfbimp_detail.f_value7 ,          
		        
                f_value8:tbl_ld_jfbimp_detail.f_value8 ,          
		        
                f_value9:tbl_ld_jfbimp_detail.f_value9 ,          
		        
                f_value10:tbl_ld_jfbimp_detail.f_value10 ,          
		        
                f_drbh:tbl_ld_jfbimp_detail.f_drbh ,          
		        
											 
                f_drpcmc:tbl_ld_jfbimp_detail.f_drpcmc ,          
		        
						
                f_drfj:tbl_ld_jfbimp_detail.f_drfj ,          
		        
                f_czr:tbl_ld_jfbimp_detail.f_czr ,          
		        
                f_czrid:tbl_ld_jfbimp_detail.f_czrid ,          
		        
                f_czsj:tbl_ld_jfbimp_detail.f_czsj ,          
		        
                f_lx:tbl_ld_jfbimp_detail.f_lx ,
                f_lxid:tbl_ld_jfbimp_detail.f_lxid,          
		        
                f_zt:tbl_ld_jfbimp_detail.f_zt ,
                f_ztid:tbl_ld_jfbimp_detail.f_ztid,          
		        
                f_bz:tbl_ld_jfbimp_detail.f_bz.formatStringRN() ,          
		        
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
            *  方法:f_drpcmc_onchange
            *  参数:
            *  导入批次名称选中事件
            */
            f_drpcmc_onchange = function (e)
            {
                var controlid = e;
            },          
    
        /* 
        *  
        *  方法:f_drfj_onchange
        *  参数:
        *  导入附件 onchange事件
        */
            f_drfj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_drfj_tbl_ld_jfbimp_detail' );
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
            *  方法:f_lx_onchange
            *  参数:changeEventParameter
            *  类型onchange事件
            */
            f_lx_onchange = function (e)
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
        _pr_appcode: '',
        _pr_imptype: '',
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
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_ld_jfbimp_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_jfbimp_detail');

                                                        switch (that._pr_pagetype)
                                                        {
                                                            case "1":
                                                                //;
                                                                switch (that._pr_imptype) {
                                                                    case '0':
                                                                        var d = new Date();
                                                                        controlObj.textdisable('detail_f_drbh_tbl_ld_jfbimp_detail', true);
                                                                        //controlObj.textdisable('detail_f_drpcmc_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.textdisable('detail_f_czr_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.textdisable('detail_f_czrid_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.datetimedisable('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', true);
                                                                        controlObj.singledropdownlistdisable('detail_f_lx_tbl_ld_jfbimp_detail', true);
                                                                        //controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.text('detail_f_czr_tbl_ld_jfbimp_detail', basePageObj._userInfoJson.sys_username);
                                                                        controlObj.text('detail_f_czrid_tbl_ld_jfbimp_detail', basePageObj._userInfoJson.sys_userid);
                                                                        controlObj.datetime('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));
                                                                        controlObj.singledropdownlistid('detail_f_lx_tbl_ld_jfbimp_detail', '0');
                                                                        //controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfbimp_detail', '0');
                                                                        break;
                                                                    case '1':
                                                                        var d = new Date();
                                                                        controlObj.textdisable('detail_f_drbh_tbl_ld_jfbimp_detail', true);
                                                                        //controlObj.textdisable('detail_f_drpcmc_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.textdisable('detail_f_czr_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.textdisable('detail_f_czrid_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.datetimedisable('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', true);
                                                                        controlObj.singledropdownlistdisable('detail_f_lx_tbl_ld_jfbimp_detail', true);
                                                                        //controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_jfbimp_detail', true);
                                                                        controlObj.text('detail_f_czr_tbl_ld_jfbimp_detail', basePageObj._userInfoJson.sys_username);
                                                                        controlObj.text('detail_f_czrid_tbl_ld_jfbimp_detail', basePageObj._userInfoJson.sys_userid);
                                                                        controlObj.datetime('detail_f_czsj_tbl_ld_jfbimp_detail_date', 'detail_f_czsj_tbl_ld_jfbimp_detail_time', d.Format('yyyy-MM-dd hh:mm:ss'));
                                                                        controlObj.singledropdownlistid('detail_f_lx_tbl_ld_jfbimp_detail', '1');
                                                                        //controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jfbimp_detail', '0');
                                                                        break;

                                                                }


                                                                    

                                                                //setDisable(false);
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
                    success: function (tbl_ld_jfbimp_detail)
                    {
                        setModel(tbl_ld_jfbimp_detail, {
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
                    success: function (tbl_ld_jfbimp_detail)
                    {
                        checkModel(tbl_ld_jfbimp_detail, {
                            success: function (tbl_ld_jfbimp_detail)
                            {
                                updateData(tbl_ld_jfbimp_detail, {
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
        end: function ()
        {
        }


    };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_jfbimp_detail_Obj.init();
});




