

var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_qfts_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_qfts.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_analysis = null,
    _ladda_btn_command_import = null,
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        codeServiceId += "0817^";
        
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();               
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    _baseCodeHashMap.put('codeservice_0817', resultArray['0817']);
                    
                                       
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            var codeService_0817 = _baseCodeHashMap.get('codeservice_0817');
            
             
        
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			            controlObj.datetimeinit('detail_f_fxsj_tbl_ld_qfts_detail_date', 'detail_f_fxsj_tbl_ld_qfts_detail_time', f_fxsj_date_onchange, f_fxsj_time_onchange);          
            	
			            controlObj.datetimeinit('detail_f_drsj_tbl_ld_qfts_detail_date', 'detail_f_drsj_tbl_ld_qfts_detail_time', f_drsj_date_onchange, f_drsj_time_onchange);          
            	
			            controlObj.fileuploaderinit('detail_f_drwj_tbl_ld_qfts_detail', {"fileUploadExtnames":";.x;.xls;.xlsx;","fileUploadCountMax":"1","isThumbnailImgShow":false}, f_drwj_onchange);          
            	
			            controlObj.fileuploaderinit('detail_f_bcfj_tbl_ld_qfts_detail', {"fileUploadExtnames":";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;","fileUploadCountMax":"0","isThumbnailImgShow":true}, f_bcfj_onchange);          
            	
						controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_qfts_detail', codeService_0817,f_zt_onchange);
          
            	
				
          
            
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

            var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_qfts_detail');
            if (ztid == '2')
            {
                isDisable = true;
            }
            controlObj.textdisable('detail_f_drbh_tbl_ld_qfts_detail', true);          
            
            controlObj.datetimedisable('detail_f_fxsj_tbl_ld_qfts_detail_date', 'detail_f_fxsj_tbl_ld_qfts_detail_time', true);
            
            controlObj.textdisable('detail_f_drr_tbl_ld_qfts_detail', true);
            
            controlObj.datetimedisable('detail_f_drsj_tbl_ld_qfts_detail_date', 'detail_f_drsj_tbl_ld_qfts_detail_time', true);
                       
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_qfts_detail', true);
            
            controlObj.fileuploaderdisable('detail_f_drwj_tbl_ld_qfts_detail', isDisable);          
            
            controlObj.fileuploaderdisable('detail_f_bcfj_tbl_ld_qfts_detail', isDisable);          
            
            controlObj.textdisable('detail_f_bz_tbl_ld_qfts_detail', isDisable);          
             
            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_qfts_detail').addClass('hidden');
                $('#btn_command_analysis_tbl_ld_qfts_detail').addClass('hidden');
                $('#btn_command_import_tbl_ld_qfts_detail').addClass('hidden');
                $('#btn_command_download_tbl_ld_qfts_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_qfts_detail').removeClass('hidden');
                $('#btn_command_analysis_tbl_ld_qfts_detail').removeClass('hidden');
                $('#btn_command_import_tbl_ld_qfts_detail').removeClass('hidden');
                $('#btn_command_download_tbl_ld_qfts_detail').removeClass('hidden');
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
    *  参数:tbl_ld_qfts_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_qfts_detail, callBackFunction)
   {
        try
        {
            
			        controlObj.text('detail_f_value1_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value1);          
		
			        controlObj.text('detail_f_value2_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value2);          
		
			        controlObj.text('detail_f_value3_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value3);          
		
			        controlObj.text('detail_f_value4_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value4);          
		
			        controlObj.text('detail_f_value5_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value5);          
		
			        controlObj.text('detail_f_value6_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value6);          
		
			        controlObj.text('detail_f_value7_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value7);          
		
			        controlObj.text('detail_f_value8_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value8);          
		
			        controlObj.text('detail_f_value9_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value9);          
		
			        controlObj.text('detail_f_value10_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_value10);          
		
			        controlObj.text('detail_f_drbh_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_drbh);          
		
			        controlObj.text('detail_f_drr_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_drr);          
		
						
        controlObj.datetime('detail_f_fxsj_tbl_ld_qfts_detail_date', 'detail_f_fxsj_tbl_ld_qfts_detail_time', tbl_ld_qfts_detail.f_fxsj);          
		
						
        controlObj.datetime('detail_f_drsj_tbl_ld_qfts_detail_date', 'detail_f_drsj_tbl_ld_qfts_detail_time', tbl_ld_qfts_detail.f_drsj);          
		
			        controlObj.fileuploaderbind('detail_f_drwj_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_drwj);          
		
			        controlObj.fileuploaderbind('detail_f_bcfj_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_bcfj);          
		
			        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_ztid);          
		
			        controlObj.text('detail_f_bz_tbl_ld_qfts_detail', tbl_ld_qfts_detail.f_bz.returnStringRN());          
				
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
    *  获取页面数据，返回对象tbl_ld_qfts_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_qfts_detail = new Object();
            
					
            tbl_ld_qfts_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_drbh = controlObj.text('detail_f_drbh_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_drr = controlObj.text('detail_f_drr_tbl_ld_qfts_detail');          
            
			            tbl_ld_qfts_detail.f_fxsj = controlObj.datetime('detail_f_fxsj_tbl_ld_qfts_detail_date', 'detail_f_fxsj_tbl_ld_qfts_detail_time');          
            
			            tbl_ld_qfts_detail.f_drsj = controlObj.datetime('detail_f_drsj_tbl_ld_qfts_detail_date', 'detail_f_drsj_tbl_ld_qfts_detail_time');          
            
			            tbl_ld_qfts_detail.f_drwj = controlObj.fileuploaderid('detail_f_drwj_tbl_ld_qfts_detail');          
            
			            tbl_ld_qfts_detail.f_bcfj = controlObj.fileuploaderid('detail_f_bcfj_tbl_ld_qfts_detail');          
            
			            tbl_ld_qfts_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_qfts_detail');
            tbl_ld_qfts_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_qfts_detail');          
            
					
            tbl_ld_qfts_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_qfts_detail');          
            		
            callBackFunction.success(tbl_ld_qfts_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_qfts_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_qfts_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_qfts_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_drbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_drbh_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_drr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_drr_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		
         

            		   
            if (tbl_ld_qfts_detail.f_drwj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_drwj_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_bcfj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bcfj_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qfts_detail.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_qfts_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_qfts_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_drbh^f_drr^f_fxsj^f_drsj^f_drwj^f_bcfj^f_zt^f_ztid^f_bz^sys_id';
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
        *  参数:tbl_ld_qfts_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_qfts_detail, callbackFunction)
            {

                var d = new Date();                
                var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_drbh^f_drr^f_fxsj^f_drsj^f_drwj^f_bcfj^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {
                    sys_id: that._pr_sys_id,
            
				                f_value1:tbl_ld_qfts_detail.f_value1 ,          
		        
				                f_value2:tbl_ld_qfts_detail.f_value2 ,          
		        
				                f_value3:tbl_ld_qfts_detail.f_value3 ,          
		        
				                f_value4:tbl_ld_qfts_detail.f_value4 ,          
		        
				                f_value5:tbl_ld_qfts_detail.f_value5 ,          
		        
				                f_value6:tbl_ld_qfts_detail.f_value6 ,          
		        
				                f_value7:tbl_ld_qfts_detail.f_value7 ,          
		        
				                f_value8:tbl_ld_qfts_detail.f_value8 ,          
		        
				                f_value9:tbl_ld_qfts_detail.f_value9 ,          
		        
				                f_value10:tbl_ld_qfts_detail.f_value10 ,          
		        
				                f_drbh:tbl_ld_qfts_detail.f_drbh ,          
		        
				                f_drr:tbl_ld_qfts_detail.f_drr ,          
		        
			                    f_fxsj:tbl_ld_qfts_detail.f_fxsj ,          
		        
			                    f_drsj:tbl_ld_qfts_detail.f_drsj ,          
		        
						
                    f_drwj:tbl_ld_qfts_detail.f_drwj ,          
		        
						
                    f_bcfj:tbl_ld_qfts_detail.f_bcfj ,          
		        
			                    f_zt:tbl_ld_qfts_detail.f_zt ,
                    f_ztid:tbl_ld_qfts_detail.f_ztid,          
		        
				                f_bz:tbl_ld_qfts_detail.f_bz.formatStringRN() ,          
		        
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
        *  参数:tbl_ld_qfts_detail, callbackFunction
        *  向数据库更新数据并分析数据，根据数据对象
        */
        analysisData = function (tbl_ld_qfts_detail, callbackFunction)
        {
            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_drbh^f_drr^f_fxsj^f_drsj^f_drwj^f_bcfj^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_qfts_detail.f_value1,

                f_value2: tbl_ld_qfts_detail.f_value2,

                f_value3: tbl_ld_qfts_detail.f_value3,

                f_value4: tbl_ld_qfts_detail.f_value4,

                f_value5: tbl_ld_qfts_detail.f_value5,

                f_value6: tbl_ld_qfts_detail.f_value6,

                f_value7: tbl_ld_qfts_detail.f_value7,

                f_value8: tbl_ld_qfts_detail.f_value8,

                f_value9: tbl_ld_qfts_detail.f_value9,

                f_value10: tbl_ld_qfts_detail.f_value10,

                f_drbh: tbl_ld_qfts_detail.f_drbh,

                f_drr: tbl_ld_qfts_detail.f_drr,

                f_fxsj: d.Format('yyyy-MM-dd hh:mm:ss'),

                f_drsj: tbl_ld_qfts_detail.f_drsj,


                f_drwj: tbl_ld_qfts_detail.f_drwj,


                f_bcfj: tbl_ld_qfts_detail.f_bcfj,

                f_zt: '已分析',
                f_ztid: '1',

                f_bz: tbl_ld_qfts_detail.f_bz.formatStringRN(),

                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = {
                columns: columns,
                clientInf: _clientInf,
                json: JSON.stringify(json)
            };
            doAjaxFunction(_serviceUrl, 'Analysis', data, {
                success: function (message)
                {
                    var now = new Date();

                    controlObj.datetime('detail_f_fxsj_tbl_ld_qfts_detail_date', 'detail_f_fxsj_tbl_ld_qfts_detail_time', now.Format('yyyy-MM-dd hh:mm:ss'));
                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_qfts_detail', '1');
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
        *  方法:importData
        *  参数:tbl_ld_qfts_detail, callbackFunction
        *  向数据库批量导入数据数据，根据数据对象
        */
        importData = function (tbl_ld_qfts_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_zt^f_ztid^f_drsj';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: tbl_ld_qfts_detail.f_value1,

                f_value2: tbl_ld_qfts_detail.f_value2,

                f_value3: tbl_ld_qfts_detail.f_value3,

                f_value4: tbl_ld_qfts_detail.f_value4,

                f_value5: tbl_ld_qfts_detail.f_value5,

                f_value6: tbl_ld_qfts_detail.f_value6,

                f_value7: tbl_ld_qfts_detail.f_value7,

                f_value8: tbl_ld_qfts_detail.f_value8,

                f_value9: tbl_ld_qfts_detail.f_value9,

                f_value10: tbl_ld_qfts_detail.f_value10,

                f_drbh: tbl_ld_qfts_detail.f_drbh,

                f_drr: tbl_ld_qfts_detail.f_drr,

                f_fxsj: tbl_ld_qfts_detail.f_fxsj,

                f_drsj: d.Format('yyyy-MM-dd hh:mm:ss'),


                f_drwj: tbl_ld_qfts_detail.f_drwj,


                f_bcfj: tbl_ld_qfts_detail.f_bcfj,

                f_zt: '已导入',
                f_ztid: '2',

                f_bz: tbl_ld_qfts_detail.f_bz.formatStringRN(),

                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = {
                columns: columns,
                clientInf: _clientInf,
                json: JSON.stringify(json)
            };
            doAjaxFunction(_serviceUrl, 'Import', data, {
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
        *  方法:f_drwj_onchange
        *  参数:
        *   导入文件（Excel表） onchange事件
        */
            f_drwj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_drwj_tbl_ld_qfts_detail' );
            },          
    
        /* 
        *  
        *  方法:f_bcfj_onchange
        *  参数:
        *  保存附件 onchange事件
        */
            f_bcfj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_bcfj_tbl_ld_qfts_detail' );
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
                                                            _validateMessage = new validateMessage('btn_command_save_tbl_ld_qfts_detail');

                                                            _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_qfts_detail');
                                                            _ladda_btn_command_analysis = Ladda.create('btn_command_analysis_tbl_ld_qfts_detail');
                                                            _ladda_btn_command_import = Ladda.create('btn_command_import_tbl_ld_qfts_detail');
                                                            switch (that._pr_pagetype)
                                                            {
                                                                case "1":
                                                                    setDisable(false);
                                                                    break;
                                                                case "2":
                                                                    setDisable(true);
                                                                    break;
                                                            }

                                                            
                                                                                    
                                                           $( '#div_container_tbl_ld_qftsyl_list' ).load( '../tbl_ld_qftsyl/tbl_ld_qftsyl_list_part.html', null, function ()
                                                           {
                                                               tbl_ld_qftsyl_list_Obj._pr_fk_tbl_ld_qfts_sys_id = that._pr_sys_id;
                                                               var ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_qfts_detail');
                                                               if (ztid == '2')
                                                               {
                                                                   tbl_ld_qftsyl_list_Obj._pr_listtype = '2';
                                                               }
                                                               else
                                                               {
                                                                   tbl_ld_qftsyl_list_Obj._pr_listtype = that._pr_pagetype;
                                                               }
                                                               tbl_ld_qftsyl_list_Obj.init( {
                                                                   success: function ()
                                                                   {
                                                                       $( '#div_container_tbl_ld_qftsyl_list' ).css( 'display', '' );
                                                                       $( '#div_loading_tbl_ld_qftsyl_list' ).css( 'display', 'none' );
                                                                   }
                                                               } );
                                                           } );
                                                                      

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
                        success: function (tbl_ld_qfts_detail)
                            {
                                setModel(tbl_ld_qfts_detail, {
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
                        success: function (tbl_ld_qfts_detail)
                            {
                                checkModel(tbl_ld_qfts_detail, {
                                    success: function (tbl_ld_qfts_detail)
                                        {
                                            updateData(tbl_ld_qfts_detail, {
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
            *  方法:btn_command_analysis_onclick
            *  参数:
            *  分析按钮
            */
    btn_command_analysis_onclick: function ()
    {
        try
        {
            _ladda_btn_command_analysis.start();

            getModel({
                success: function (tbl_ld_qfts_detail)
                {
                    checkModel(tbl_ld_qfts_detail, {
                        success: function (tbl_ld_qfts_detail)
                        {
                            analysisData(tbl_ld_qfts_detail, {
                                success: function ()
                                {
                                    _ladda_btn_command_analysis.stop();
                                    _alertMessage.show('分析成功', 'success', 2000);

                                    tbl_ld_qftsyl_list_Obj.bindGrid({
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

            /* 
*  
*  方法:btn_command_import_onclick
*  参数:
*  导入按钮
*/
    btn_command_import_onclick: function ()
    {
        try
        {
            _ladda_btn_command_import.start();


            getModel({
                success: function (tbl_ld_qfts_detail)
                {
                    checkModel(tbl_ld_qfts_detail, {
                        success: function (tbl_ld_qfts_detail)
                        {
                            importData(tbl_ld_qfts_detail, {
                                success: function ()
                                {
                                    _ladda_btn_command_import.stop();
                                    _alertMessage.show('导入成功', 'success', 2000);
                                    //改状态和导入时间
                                    var now = new Date();
                                    controlObj.datetime('detail_f_drsj_tbl_ld_qfts_detail_date', 'detail_f_drsj_tbl_ld_qfts_detail_time', now.Format('yyyy-MM-dd hh:mm:ss'));
                                    controlObj.singledropdownlistid('detail_f_zt_tbl_ld_qfts_detail', '2');
                                    setDisable(true);
                                    //子表固定为只读
                                    $('#div_container_tbl_ld_qftsyl_list').load('../tbl_ld_qftsyl/tbl_ld_qftsyl_list_part.html', null, function ()
                                    {
                                        tbl_ld_qftsyl_list_Obj._pr_fk_tbl_ld_qfts_sys_id = that._pr_sys_id;
                                        tbl_ld_qftsyl_list_Obj._pr_listtype = '2';
                                        tbl_ld_qftsyl_list_Obj.init({
                                            success: function ()
                                            {
                                                $('#div_container_tbl_ld_qftsyl_list').css('display', '');
                                                $('#div_loading_tbl_ld_qftsyl_list').css('display', 'none');
                                            }
                                        });
                                    });
                                },
                                fail: function (message)
                                {
                                    _ladda_btn_command_import.stop();
                                    _alertMessage.show('导入失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });
                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_import.stop();
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
                    _ladda_btn_command_import.stop();
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

            //下载按钮
    btn_command_download_onclick: function ()
    {
        window.location.href = html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/欠费停水模板.xlsx';
    },

            end: function ()
            {
            }


        };

    return that;
})();

$(document).ready(function ()
{
    tbl_ld_qfts_detail_Obj.init();
});




