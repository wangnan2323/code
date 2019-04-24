
var tbl_ld_jmb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jmb.asmx/',
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        codeServiceId += "0562^";
        
        
        
        
        codeServiceId += "0563^";
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    _baseCodeHashMap.put('codeservice_0562', resultArray['0562']);
                    
                    
                    
                    
                    _baseCodeHashMap.put('codeservice_0563', resultArray['0563']);
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                                       
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            var codeService_0562 = _baseCodeHashMap.get('codeservice_0562');
            
            
            
            
            var codeService_0563 = _baseCodeHashMap.get('codeservice_0563');
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
             
        
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
						controlObj.singledropdownlistinit('detail_f_yy_tbl_ld_jmb_detail', codeService_0562,f_yy_onchange);          
            	
			          
            	
			          
            	
			            controlObj.datetimeinit('detail_f_czsj_tbl_ld_jmb_detail_date', 'detail_f_czsj_tbl_ld_jmb_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);          
            	
						controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_jmb_detail', codeService_0563,f_zt_onchange);          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            
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
            
					    controlObj.textdisable('detail_f_jmbh_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_khbh_tbl_ld_jmb_detail', isDisable);			
		    if(isDisable)
		    {
                $('#btn_detail_f_khbh_tbl_ld_jmb_detail').attr('disabled', 'disabled');				
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_jmb_detail').removeAttr('disabled');				
            }               
            
					    controlObj.textdisable('detail_f_khbhid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_jmje_tbl_ld_jmb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_yy_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_czr_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_czrid_tbl_ld_jmb_detail', isDisable);          
            
			            controlObj.datetimedisable('detail_f_czsj_tbl_ld_jmb_detail_date', 'detail_f_czsj_tbl_ld_jmb_detail_time', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_jmb_detail', isDisable);          
            
			            controlObj.textdisable('detail_f_bz_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_jfbh_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_jfid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_syqk_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_lxtkhh_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_yhbh_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_yhbhid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_dy_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_dyid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_sc_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_scid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_qy_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_qyid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_pq_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_pqid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_yhm_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_jfm_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_dz_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_dh_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_sbbh_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_sbbhid_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_sblx_tbl_ld_jmb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_yslb_tbl_ld_jmb_detail', isDisable);

					    controlObj.textdisable('detail_f_sblxid_tbl_ld_jmb_detail', isDisable);

					    controlObj.textdisable('detail_f_yslbid_tbl_ld_jmb_detail', isDisable);
             
            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_jmb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_jmb_detail').removeClass('hidden');
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
    *  参数:tbl_ld_jmb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_jmb_detail, callBackFunction)
   {
        try
        {
            
			        controlObj.text('detail_f_value1_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value1);          
		
			        controlObj.text('detail_f_value2_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value2);          
		
			        controlObj.text('detail_f_value3_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value3);          
		
			        controlObj.text('detail_f_value4_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value4);          
		
			        controlObj.text('detail_f_value5_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value5);          
		
			        controlObj.text('detail_f_value6_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value6);          
		
			        controlObj.text('detail_f_value7_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value7);          
		
			        controlObj.text('detail_f_value8_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value8);          
		
			        controlObj.text('detail_f_value9_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value9);          
		
			        controlObj.text('detail_f_value10_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_value10);          
		
			        controlObj.text('detail_f_jmbh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_jmbh);          
		
			        controlObj.text('detail_f_khbh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_khbh);          
		
			        controlObj.text('detail_f_khbhid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_khbhid);          
		
			        controlObj.text('detail_f_jmje_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_jmje);          
		
			        controlObj.singledropdownlistid('detail_f_yy_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_yyid);          
		
			        controlObj.text('detail_f_czr_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_czr);          
		
			        controlObj.text('detail_f_czrid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_czrid);          
		
						
        controlObj.datetime('detail_f_czsj_tbl_ld_jmb_detail_date', 'detail_f_czsj_tbl_ld_jmb_detail_time', tbl_ld_jmb_detail.f_czsj);          
		
			        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_ztid);          
		
			        controlObj.text('detail_f_bz_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_bz.returnStringRN());          
		
			        controlObj.text('detail_f_jfbh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_jfbh);          
		
			        controlObj.text('detail_f_jfid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_jfid);          
		
			        controlObj.text('detail_f_syqk_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_syqk);          
		
			        controlObj.text('detail_f_lxtkhh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_lxtkhh);          
		
			        controlObj.text('detail_f_yhbh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_yhbh);          
		
			        controlObj.text('detail_f_yhbhid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_yhbhid);          
		
			        controlObj.text('detail_f_dy_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_dy);          
		
			        controlObj.text('detail_f_dyid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_dyid);          
		
			        controlObj.text('detail_f_sc_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_sc);          
		
			        controlObj.text('detail_f_scid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_scid);          
		
			        controlObj.text('detail_f_qy_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_qy);          
		
			        controlObj.text('detail_f_qyid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_qyid);          
		
			        controlObj.text('detail_f_pq_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_pq);          
		
			        controlObj.text('detail_f_pqid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_pqid);          
		
			        controlObj.text('detail_f_yhm_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_yhm);          
		
			        controlObj.text('detail_f_jfm_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_jfm);          
		
			        controlObj.text('detail_f_dz_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_dz);          
		
			        controlObj.text('detail_f_dh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_dh);          
		
			        controlObj.text('detail_f_sbbh_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_sbbh);          
		
			        controlObj.text('detail_f_sbbhid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_sbbhid);          
		
			        controlObj.text('detail_f_sblx_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_sblx);          
		
			        controlObj.text('detail_f_yslb_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_yslb);

			        controlObj.text('detail_f_sblxid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_sblxid);

			        controlObj.text('detail_f_yslbid_tbl_ld_jmb_detail', tbl_ld_jmb_detail.f_yslbid);
				
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
    *  获取页面数据，返回对象tbl_ld_jmb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_jmb_detail = new Object();
            
					
            tbl_ld_jmb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_jmbh = controlObj.text('detail_f_jmbh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_jmje = controlObj.text('detail_f_jmje_tbl_ld_jmb_detail');          
            
			            tbl_ld_jmb_detail.f_yy = controlObj.singledropdownlist('detail_f_yy_tbl_ld_jmb_detail');
            tbl_ld_jmb_detail.f_yyid = controlObj.singledropdownlistid('detail_f_yy_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_jmb_detail');          
            
			            tbl_ld_jmb_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_jmb_detail_date', 'detail_f_czsj_tbl_ld_jmb_detail_time');          
            
			            tbl_ld_jmb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_jmb_detail');
            tbl_ld_jmb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_jfbh = controlObj.text('detail_f_jfbh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_jfid = controlObj.text('detail_f_jfid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_syqk = controlObj.text('detail_f_syqk_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_lxtkhh = controlObj.text('detail_f_lxtkhh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_yhbhid = controlObj.text('detail_f_yhbhid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_dy = controlObj.text('detail_f_dy_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_dyid = controlObj.text('detail_f_dyid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_sc = controlObj.text('detail_f_sc_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_scid = controlObj.text('detail_f_scid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_qy = controlObj.text('detail_f_qy_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_qyid = controlObj.text('detail_f_qyid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_pq = controlObj.text('detail_f_pq_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_pqid = controlObj.text('detail_f_pqid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_sbbhid = controlObj.text('detail_f_sbbhid_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_sblx = controlObj.text('detail_f_sblx_tbl_ld_jmb_detail');          
            
					
            tbl_ld_jmb_detail.f_yslb = controlObj.text('detail_f_yslb_tbl_ld_jmb_detail');


            tbl_ld_jmb_detail.f_sblxid = controlObj.text('detail_f_sblxid_tbl_ld_jmb_detail');


            tbl_ld_jmb_detail.f_yslbid = controlObj.text('detail_f_yslbid_tbl_ld_jmb_detail');
            		
            callBackFunction.success(tbl_ld_jmb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_jmb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_jmb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_jmb_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_jmbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jmbh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_jmb_detail.f_jmbh.length < 1)
            {			
                errorMessageHansMap.put('detail_f_jmbh_tbl_ld_jmb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_jmb_detail.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_jmb_detail.f_khbh.length < 1)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_jmb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_jmb_detail.f_khbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_jmje.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jmje_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_jmb_detail.f_jmje !="" && !/^[0-9]+\.?[0-9]*$/.test( tbl_ld_jmb_detail.f_jmje ) )            
            {			
                errorMessageHansMap.put('detail_f_jmje_tbl_ld_jmb_detail', '必须是数字');
            }
            		   
            if (tbl_ld_jmb_detail.f_jmje.length < 1)
            {			
                errorMessageHansMap.put('detail_f_jmje_tbl_ld_jmb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_jmb_detail.f_yy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yy_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_czr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_czr_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_czrid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_czrid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_jmb_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_jfbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jfbh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_jfid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jfid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_syqk.length > 200)
            {			
                errorMessageHansMap.put('detail_f_syqk_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_lxtkhh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_lxtkhh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_yhbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_yhbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhbhid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_dy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dy_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_dyid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dyid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_sc.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sc_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_scid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_scid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_qy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_qy_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_qyid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_qyid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_pq.length > 200)
            {			
                errorMessageHansMap.put('detail_f_pq_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_pqid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_pqid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_yhm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_jfm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_dz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dz_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_dh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_sbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_sbbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sbbhid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_sblx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_detail.f_yslb.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yslb_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_jmb_detail.f_sblxid.length > 200) {
                errorMessageHansMap.put('detail_f_sblxid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_detail.f_yslbid.length > 200) {
                errorMessageHansMap.put('detail_f_yslbid_tbl_ld_jmb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_jmb_detail);
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
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jmbh^f_khbh^f_khbhid^f_jmje^f_yy^f_yyid^f_czr^f_czrid^f_czsj^f_zt^f_ztid^f_bz^f_jfbh^f_jfid^f_syqk^f_lxtkhh^f_yhbh^f_yhbhid^f_dy^f_sc^f_qy^f_pq^f_sbbh^f_sbbhid^f_sblx^f_yslb^f_sblxid^f_yslbid^f_yhm^f_jfm^f_dz^f_dh^f_dyid^f_scid^f_qyid^f_pqid^sys_id';
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
        *  参数:tbl_ld_jmb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_jmb_detail, callbackFunction)
            {

                var d = new Date();                
                var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jmbh^f_khbh^f_khbhid^f_jmje^f_yy^f_yyid^f_czr^f_czrid^f_czsj^f_zt^f_ztid^f_bz^f_jfbh^f_jfid^f_syqk^f_lxtkhh^f_yhbh^f_yhbhid^f_dy^f_sc^f_qy^f_pq^f_sbbh^f_sbbhid^f_sblx^f_yslb^f_sblxid^f_yslbid^f_yhm^f_jfm^f_dz^f_dh^f_dyid^f_scid^f_qyid^f_pqid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {
                    sys_id: that._pr_sys_id,
            
				                f_value1:tbl_ld_jmb_detail.f_value1 ,          
		        
				                f_value2:tbl_ld_jmb_detail.f_value2 ,          
		        
				                f_value3:tbl_ld_jmb_detail.f_value3 ,          
		        
				                f_value4:tbl_ld_jmb_detail.f_value4 ,          
		        
				                f_value5:tbl_ld_jmb_detail.f_value5 ,          
		        
				                f_value6:tbl_ld_jmb_detail.f_value6 ,          
		        
				                f_value7:tbl_ld_jmb_detail.f_value7 ,          
		        
				                f_value8:tbl_ld_jmb_detail.f_value8 ,          
		        
				                f_value9:tbl_ld_jmb_detail.f_value9 ,          
		        
				                f_value10:tbl_ld_jmb_detail.f_value10 ,          
		        
				                f_jmbh:tbl_ld_jmb_detail.f_jmbh ,          
		        
				                f_khbh:tbl_ld_jmb_detail.f_khbh ,          
		        
				                f_khbhid:tbl_ld_jmb_detail.f_khbhid ,          
		        
				                f_jmje:tbl_ld_jmb_detail.f_jmje ,          
		        
			                    f_yy:tbl_ld_jmb_detail.f_yy ,
                    f_yyid:tbl_ld_jmb_detail.f_yyid,          
		        
				                f_czr:tbl_ld_jmb_detail.f_czr ,          
		        
				                f_czrid:tbl_ld_jmb_detail.f_czrid ,          
		        
			                    f_czsj:tbl_ld_jmb_detail.f_czsj ,          
		        
			                    f_zt:tbl_ld_jmb_detail.f_zt ,
                    f_ztid:tbl_ld_jmb_detail.f_ztid,          
		        
				                f_bz:tbl_ld_jmb_detail.f_bz.formatStringRN() ,          
		        
				                f_jfbh:tbl_ld_jmb_detail.f_jfbh ,          
		        
				                f_jfid:tbl_ld_jmb_detail.f_jfid ,          
		        
				                f_syqk:tbl_ld_jmb_detail.f_syqk ,          
		        
				                f_lxtkhh:tbl_ld_jmb_detail.f_lxtkhh ,          
		        
				                f_yhbh:tbl_ld_jmb_detail.f_yhbh ,          
		        
				                f_yhbhid:tbl_ld_jmb_detail.f_yhbhid ,          
		        
				                f_dy:tbl_ld_jmb_detail.f_dy ,          
		        
				                f_dyid:tbl_ld_jmb_detail.f_dyid ,          
		        
				                f_sc:tbl_ld_jmb_detail.f_sc ,          
		        
				                f_scid:tbl_ld_jmb_detail.f_scid ,          
		        
				                f_qy:tbl_ld_jmb_detail.f_qy ,          
		        
				                f_qyid:tbl_ld_jmb_detail.f_qyid ,          
		        
				                f_pq:tbl_ld_jmb_detail.f_pq ,          
		        
				                f_pqid:tbl_ld_jmb_detail.f_pqid ,          
		        
				                f_yhm:tbl_ld_jmb_detail.f_yhm ,          
		        
				                f_jfm:tbl_ld_jmb_detail.f_jfm ,          
		        
				                f_dz:tbl_ld_jmb_detail.f_dz ,          
		        
				                f_dh:tbl_ld_jmb_detail.f_dh ,          
		        
				                f_sbbh:tbl_ld_jmb_detail.f_sbbh ,          
		        
				                f_sbbhid:tbl_ld_jmb_detail.f_sbbhid ,          
		        
				                f_sblx:tbl_ld_jmb_detail.f_sblx ,          
		        
				                f_yslb: tbl_ld_jmb_detail.f_yslb,
				                f_sblxid: tbl_ld_jmb_detail.f_sblxid,

				                f_yslbid: tbl_ld_jmb_detail.f_yslbid,
		        
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
            *  方法:f_yy_onchange
            *  参数:changeEventParameter
            *  原因onchange事件
            */
            f_yy_onchange = function (e)
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
                                                   
                                                            _validateMessage = new validateMessage('btn_command_save_tbl_ld_jmb_detail');

                                                            _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_jmb_detail');

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
                        success: function (tbl_ld_jmb_detail)
                            {
                                setModel(tbl_ld_jmb_detail, {
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
                        success: function (tbl_ld_jmb_detail)
                            {
                                checkModel(tbl_ld_jmb_detail, {
                                    success: function (tbl_ld_jmb_detail)
                                        {
                                            updateData(tbl_ld_jmb_detail, {
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
                tbl_ld_jmb_list_Obj.bindGrid({
                    success: function ()
                    {
                        $('#div_content_part_tbl_ld_jmb_list').css('display', '');
                        $('#div_content_part_tbl_ld_jmb_detail').css('display', 'none');
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
            end: function ()
            {
            }


        };

    return that;
})();



