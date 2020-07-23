
var tbl_ld_yqjm_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_yqjm.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
_resultMsg = "",
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
        
        
        codeServiceId += "0818^";
        

        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    
                    var jmsfArray = [
                        { "id": "0", "text": "0%" },
                        { "id": "10", "text": "10%" }];


                    var jmpwfArray = [
                        { "id": "0", "text": "0%" },
                        { "id": "100", "text": "100%" }];

                    _baseCodeHashMap.put('codeservice_jmsf', jmsfArray);
                    _baseCodeHashMap.put('codeservice_jmpwf', jmpwfArray);                 
                    
                    _baseCodeHashMap.put('codeservice_0818', resultArray['0818']);
                                       
                    callBackFunction.success();
                }
                catch (ex)
                {
                       _resultMsg += 'initBaseCode执行失败。' + ex.message + '<br/>';
                    _resultMessage.show(_resultMsg);
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            var codeService_0818 = _baseCodeHashMap.get('codeservice_0818');
            
            var codeService_jmsf = _baseCodeHashMap.get('codeservice_jmsf');
            
            
            var codeService_jmpwf = _baseCodeHashMap.get('codeservice_jmpwf');
             
        
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_yqjmsf_tbl_ld_yqjm_detail', codeService_jmsf,f_yqjmsf_onchange);          
            	
            controlObj.singledropdownlistinit('detail_f_yqjmpwf_tbl_ld_yqjm_detail', codeService_jmpwf,f_yqjmpwf_onchange);          
            	
			            controlObj.fileuploaderinit('detail_f_fj_tbl_ld_yqjm_detail', {"fileUploadExtnames":";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;","fileUploadCountMax":"0","isThumbnailImgShow":true}, f_fj_onchange);          
            	
            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_yqjm_detail', codeService_0818, f_zt_onchange);   


            
            callBackFunction.success();
        }
        catch (ex)
        {
               _resultMsg += 'initControl执行失败。' + ex.message + '<br/>';
            _resultMessage.show(_resultMsg);
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
            
					    controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_yqjm_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_khbh_tbl_ld_yqjm_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_yqjmsf_tbl_ld_yqjm_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_yqjmpwf_tbl_ld_yqjm_detail', isDisable);   
            
            var projectclass = requestQuery('projectclassdtl1');
            if (projectclass == "100")
            {
                controlObj.fileuploaderdisable('detail_f_fj_tbl_ld_yqjm_detail', isDisable);
            }
            else
            {
                controlObj.fileuploaderdisable('detail_f_fj_tbl_ld_yqjm_detail', false); 
            }
            
			                     
            
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_yqjm_detail', true);          
             
            if (isDisable)
            {
                $('#btn_detail_f_khbh_tbl_ld_yqjm_detail').attr('disabled', 'disabled');
                $('#btn_command_save_tbl_ld_yqjm_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_yqjm_detail').removeAttr('disabled');
                $('#btn_command_save_tbl_ld_yqjm_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }
        }
        catch (ex)
        {
    _resultMsg += 'setDisable执行失败。' + ex.message + '<br/>';
            _resultMessage.show(_resultMsg);			
        }
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Model操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:setModel
    *  参数:tbl_ld_yqjm_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_yqjm_detail, callBackFunction)
   {
        try
        {
            
			        controlObj.text('detail_f_value1_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value1);          
		
			        controlObj.text('detail_f_value2_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value2);          
		
			        controlObj.text('detail_f_value3_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value3);          
		
			        controlObj.text('detail_f_value4_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value4);          
		
			        controlObj.text('detail_f_value5_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value5);          
		
			        controlObj.text('detail_f_value6_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value6);          
		
			        controlObj.text('detail_f_value7_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value7);          
		
			        controlObj.text('detail_f_value8_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value8);          
		
			        controlObj.text('detail_f_value9_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value9);          
		
			        controlObj.text('detail_f_value10_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_value10);          
		
			        controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.fk_tbl_maintable_sys_id);          
		
			        controlObj.text('detail_f_khbh_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_khbh);          
		
			        controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_yqjmsf);          
		
			        controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_yqjmpwf);          
		
			        controlObj.fileuploaderbind('detail_f_fj_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_fj);          
		
			        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_yqjm_detail', tbl_ld_yqjm_detail.f_ztid);          
				
        callBackFunction.success();
        }
        catch ( ex )
        {
			  _resultMsg += 'setModel执行失败。' + ex.message + '<br/>';
            _resultMessage.show(_resultMsg);	
        }       
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_ld_yqjm_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_yqjm_detail = new Object();
            
					
            tbl_ld_yqjm_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_yqjm_detail');          
            
					
            tbl_ld_yqjm_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_yqjm_detail');          
            

            tbl_ld_yqjm_detail.f_yqjmsf = controlObj.singledropdownlistid('detail_f_yqjmsf_tbl_ld_yqjm_detail');          
            

            tbl_ld_yqjm_detail.f_yqjmpwf = controlObj.singledropdownlistid('detail_f_yqjmpwf_tbl_ld_yqjm_detail');          
            
			            tbl_ld_yqjm_detail.f_fj = controlObj.fileuploaderid('detail_f_fj_tbl_ld_yqjm_detail');          
            
			            tbl_ld_yqjm_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_yqjm_detail');
            tbl_ld_yqjm_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_yqjm_detail');          
            		
            callBackFunction.success(tbl_ld_yqjm_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_yqjm_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_yqjm_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_yqjm_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.fk_tbl_maintable_sys_id.length > 200)
            {			
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_khbh.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            if (tbl_ld_yqjm_detail.f_khbh.length <10)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_yqjm_detail', '请填写客户编号');
            }
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_yqjmsf.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yqjmsf_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_yqjm_detail.f_yqjmsf.length <0 )
            {
                errorMessageHansMap.put('detail_f_yqjmsf_tbl_ld_yqjm_detail', '疫情减免水费不能为空');
            }
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_yqjmpwf.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yqjmpwf_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            if (tbl_ld_yqjm_detail.f_yqjmpwf.length < 0)
            {
                errorMessageHansMap.put('detail_f_yqjmpwf_tbl_ld_yqjm_detail', '疫情减免污水处理费不能为空');
            }	
         

            		   
            if (tbl_ld_yqjm_detail.f_fj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_fj_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yqjm_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_yqjm_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_yqjm_detail);
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
            var whereClause = ' fk_tbl_maintable_sys_id = \'' + that._pr_fk_tbl_maintable_sys_id + '\'';
            var orderByString = '';            
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_tbl_maintable_sys_id^f_khbh^f_yqjmsf^f_yqjmpwf^f_fj^f_zt^f_ztid^sys_id';
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
                    that._pr_sys_id = messageJson.rows[0]['sys_id'];
                    callbackFunction.success(messageJson.rows[0]);
                },
                fail: function (message)
                {
				  _resultMsg += 'GetList执行失败。' + message + '<br/>';
            _resultMessage.show(_resultMsg);
                }
            });
        },

        /* 
        *  
        *  方法:updateData
        *  参数:tbl_ld_yqjm_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_yqjm_detail, callbackFunction)
            {

                var d = new Date();                
                var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_tbl_maintable_sys_id^f_khbh^f_yqjmsf^f_yqjmpwf^f_fj^f_zt^f_ztid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {
                    sys_id: that._pr_sys_id,
            
				                f_value1:tbl_ld_yqjm_detail.f_value1 ,          
		        
				                f_value2:tbl_ld_yqjm_detail.f_value2 ,          
		        
				                f_value3:tbl_ld_yqjm_detail.f_value3 ,          
		        
				                f_value4:tbl_ld_yqjm_detail.f_value4 ,          
		        
				                f_value5:tbl_ld_yqjm_detail.f_value5 ,          
		        
				                f_value6:tbl_ld_yqjm_detail.f_value6 ,          
		        
				                f_value7:tbl_ld_yqjm_detail.f_value7 ,          
		        
				                f_value8:tbl_ld_yqjm_detail.f_value8 ,          
		        
				                f_value9:tbl_ld_yqjm_detail.f_value9 ,          
		        
				                f_value10:tbl_ld_yqjm_detail.f_value10 ,          
		        
				                fk_tbl_maintable_sys_id:tbl_ld_yqjm_detail.fk_tbl_maintable_sys_id ,          
		        
				                f_khbh:tbl_ld_yqjm_detail.f_khbh ,          
		        
			                    f_yqjmsf:tbl_ld_yqjm_detail.f_yqjmsf ,
         
		        
			                    f_yqjmpwf:tbl_ld_yqjm_detail.f_yqjmpwf ,       
		        
						
                    f_fj:tbl_ld_yqjm_detail.f_fj ,          
		        
			                    f_zt:tbl_ld_yqjm_detail.f_zt ,
                    f_ztid:tbl_ld_yqjm_detail.f_ztid,          
		        
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
            *  方法:f_yqjmsf_onchange
            *  参数:changeEventParameter
            *  疫情减免水费onchange事件
            */
            f_yqjmsf_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
	       
            /* 
            *  
            *  方法:f_yqjmpwf_onchange
            *  参数:changeEventParameter
            *  疫情减免污水处理费onchange事件
            */
            f_yqjmpwf_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
        /* 
        *  
        *  方法:f_fj_onchange
        *  参数:
        *  附件 onchange事件
        */
            f_fj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_fj_tbl_ld_yqjm_detail' );
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
            _pr_fk_tbl_maintable_sys_id:'',
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
                                                            _validateMessage = new validateMessage('btn_command_save_tbl_ld_yqjm_detail');

                                                            _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_yqjm_detail');

                                                            switch (that._pr_pagetype)
                                                            {
                                                                case "1":
                                                                    setDisable(false);
                                                                    break;
                                                                case "2":
                                                                    setDisable(true);
                                                                    break;
                                                            }

                                                            //初始化客户列表的控件
                                                            $('#div_container_tbl_ld_yqjm_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4yqjm.html', null, function ()
                                                            {
                                                                var khbh = controlObj.text('detail_f_khbh_tbl_ld_yqjm_detail');  

                                                                tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                                                                tbl_ld_khb_list_Obj._pr_khbh = khbh;
                                                                tbl_ld_khb_list_Obj.init({
                                                                    success: function ()
                                                                    {
                                                                        $('#div_container_tbl_ld_yqjm_list').css('display', '');
                                                                        $('#div_loading_tbl_ld_yqjm_list').css('display', 'none');
                                                                        callBackFunction.success();
                                                                    },
                                                                    fail: function (message)
                                                                    {
                                                                        _blockMessage.show('客户初始化执行失败<br/>' + message, 'fail');
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
                catch (ex)
                {
				  _resultMsg += '程序初始化失败。' + ex.message + '<br/>';
            _resultMessage.show(_resultMsg);
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
                        success: function (tbl_ld_yqjm_detail)
                            {
                                setModel(tbl_ld_yqjm_detail, {
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
 _resultMsg += 'bindPage执行失败。' + ex.message + '<br/>';
            _resultMessage.show(_resultMsg);               
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
                        success: function (tbl_ld_yqjm_detail)
                            {
                                checkModel(tbl_ld_yqjm_detail, {
                                    success: function (tbl_ld_yqjm_detail)
                                        {
                                            updateData(tbl_ld_yqjm_detail, {
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
                tbl_ld_yqjm_list_Obj.bindGrid({
                    success: function ()
                    {
                        $('#div_content_part_tbl_ld_yqjm_list').css('display', '');
                        $('#div_content_part_tbl_ld_yqjm_detail').css('display', 'none');
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
        /*
*
*  方法:btn_command_load_onclick
*  参数:
*  加载客户列表
*/
            btn_command_load_onclick: function ()
            {
                try
                {
                    
                    getModel({
                        success: function (tbl_ld_yqjm_detail)
                        {
                            checkModel(tbl_ld_yqjm_detail, {
                                success: function (tbl_ld_yqjm_detail)
                                {
                                    var count = tbl_ld_yqjm_detail.f_khbh.split(',').length;
                                    tbl_ld_khb_list_Obj._pr_khbh = tbl_ld_yqjm_detail.f_khbh;
                                    tbl_ld_khb_list_Obj.bindGrid({
                                        success: function (messageJson)
                                        {
                                            
                                            _alertMessage.show('填写申请客户数量:' + count + '<br/>加载成功客户数量:' + messageJson.total, 'success', 10000);
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
            end: function ()
            {
            }


        };

    return that;
})();



