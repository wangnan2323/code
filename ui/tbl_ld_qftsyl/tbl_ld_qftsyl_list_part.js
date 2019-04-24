

var tbl_ld_qftsyl_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_qftsyl.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage = null,
    //按钮工具
    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    //查询sql语句
    _whereClauseString = '',
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
           
            if (that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null')
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number(that._pr_gridpageindex);
            }

            if (that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null')
            {
                that._pr_searchcontent = new Object();
            }
            else
            {
                that._pr_searchcontent = (new Function("", "return " + that._pr_searchcontent))();
            }

            if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null')
            {
                that._pr_searchtype = '1';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_qftsyl_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_qftsyl_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_qftsyl_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_qftsyl_list').attr("disabled", true);
                    break;
            }


            if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null')
            {
                _blockMessage.show('listtype参数接收失败...', 'fail');
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
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function (isDisable)
    {
        try
        {
            if (isDisable)
            {
                $('#btn_command_delete_tbl_ld_qftsyl_list').addClass('hidden');
                $( '#btn_command_new_tbl_ld_qftsyl_list' ).addClass( 'hidden' ); 
            }
            else
            {
                $('#btn_command_delete_tbl_ld_qftsyl_list').removeClass('hidden');
                $( '#btn_command_new_tbl_ld_qftsyl_list' ).removeClass( 'hidden' ); 
            }
        }
        catch(ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }
        
    },



    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchBaseCode
    *  参数:callBackFunction
    *  初始化高级查询model用到Code内容，存储在_baseCodeHashMap中
    */
    initSearchBaseCode = function (callBackFunction)
    {       

        var codeServiceId = '';
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    callBackFunction.success();
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败。<br/>' + ex.message, 'fail');
                }
            }
        });
    },

    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化高级查询model控件，会用到_baseCodeHashMap
    */
    initSearchControl = function (callBackFunction)
    {
        try
        {
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                        
            	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    

            //模态窗口
            $('#div_search_modal_tbl_ld_qftsyl_list').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initSearchControl执行失败。<br/>' + ex.message, 'fail');
        }
    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置查询model的内容
    */
    setSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        //简单查询
                        $("#txt_command_search_tbl_ld_qftsyl_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_qftsyl_list = that._pr_searchcontent.type2;

                        	
						           controlObj.text('search_f_value1_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value1);                          	
		                	
						           controlObj.text('search_f_value2_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value2);                          	
		                	
						           controlObj.text('search_f_value3_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value3);                          	
		                	
						           controlObj.text('search_f_value4_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value4);                          	
		                	
						           controlObj.text('search_f_value5_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value5);                          	
		                	
						           controlObj.text('search_f_value6_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value6);                          	
		                	
						           controlObj.text('search_f_value7_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value7);                          	
		                	
						           controlObj.text('search_f_value8_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value8);                          	
		                	
						           controlObj.text('search_f_value9_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value9);                          	
		                	
						           controlObj.text('search_f_value10_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_value10);                          	
		                	
						           controlObj.text('search_f_khbh_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_khbh);                          	
		                	
						           controlObj.text('search_f_yhm_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_yhm);                          	
		                	
						           controlObj.text('search_f_khfz_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_khfz);                          	
		                	
						           controlObj.text('search_f_yslx_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_yslx);                          	
		                	
						           controlObj.text('search_f_khzt_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_khzt);                          	
		                	
						           controlObj.text('search_f_sbbh_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_sbbh);                          	
		                	
						           controlObj.text('search_f_dh_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_dh);                          	
		                	
						           controlObj.text('search_f_dz_tbl_ld_qftsyl_list', tbl_ld_qftsyl_list.f_dz);                          	
		                 
                
                    }
                    break;
            }
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败<br/>' + ex.message, 'fail');          
        }

    },

    /* 
    *  
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_qftsyl_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_qftsyl_list = new Object();
				    				
										 
					tbl_ld_qftsyl_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_khfz = controlObj.text('search_f_khfz_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_khzt = controlObj.text('search_f_khzt_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_dh = controlObj.text('search_f_dh_tbl_ld_qftsyl_list'); 
				    				
										 
					tbl_ld_qftsyl_list.f_dz = controlObj.text('search_f_dz_tbl_ld_qftsyl_list'); 
				     
                    that._pr_searchcontent.type2 = tbl_ld_qftsyl_list;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }


    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  针对_pr_searchcontent.type2进行验证
    */
    checkSearchModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_qftsyl_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

        

            		   
            if (tbl_ld_qftsyl_list.f_value1.length > 200)
            {			
                errorMessageHansMap.put('search_f_value1_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value2.length > 200)
            {			
                errorMessageHansMap.put('search_f_value2_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value3.length > 200)
            {			
                errorMessageHansMap.put('search_f_value3_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value4.length > 200)
            {			
                errorMessageHansMap.put('search_f_value4_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value5.length > 200)
            {			
                errorMessageHansMap.put('search_f_value5_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value6.length > 200)
            {			
                errorMessageHansMap.put('search_f_value6_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value7.length > 200)
            {			
                errorMessageHansMap.put('search_f_value7_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value8.length > 200)
            {			
                errorMessageHansMap.put('search_f_value8_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value9.length > 200)
            {			
                errorMessageHansMap.put('search_f_value9_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_value10.length > 200)
            {			
                errorMessageHansMap.put('search_f_value10_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_khbh_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_yhm.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhm_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_khfz.length > 200)
            {			
                errorMessageHansMap.put('search_f_khfz_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_yslx.length > 200)
            {			
                errorMessageHansMap.put('search_f_yslx_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_khzt.length > 200)
            {			
                errorMessageHansMap.put('search_f_khzt_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_sbbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_dh.length > 200)
            {			
                errorMessageHansMap.put('search_f_dh_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_qftsyl_list.f_dz.length > 200)
            {			
                errorMessageHansMap.put('search_f_dz_tbl_ld_qftsyl_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success();
            }
        }
        catch (ex)
        {   
            callBackFunction.fail(ex.message);
        }

    },

    /* 
    *  
    *  方法:clearSearchModel
    *  参数:callBackFunction
    *  清空_pr_searchtype和searchModel
    */
    clearSearchModel = function ()
    {


        switch (that._pr_searchtype)
        {
            case "1":
                if (that._pr_searchcontent.type2 == undefined)
                {
                    that._pr_searchcontent.type2 = new Object();
                }
            				
									that._pr_searchcontent.type2.f_value1 = '';
				controlObj.text('search_f_value1_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value1);                          	
					      
								
									that._pr_searchcontent.type2.f_value2 = '';
				controlObj.text('search_f_value2_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value2);                          	
					      
								
									that._pr_searchcontent.type2.f_value3 = '';
				controlObj.text('search_f_value3_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value3);                          	
					      
								
									that._pr_searchcontent.type2.f_value4 = '';
				controlObj.text('search_f_value4_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value4);                          	
					      
								
									that._pr_searchcontent.type2.f_value5 = '';
				controlObj.text('search_f_value5_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value5);                          	
					      
								
									that._pr_searchcontent.type2.f_value6 = '';
				controlObj.text('search_f_value6_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value6);                          	
					      
								
									that._pr_searchcontent.type2.f_value7 = '';
				controlObj.text('search_f_value7_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value7);                          	
					      
								
									that._pr_searchcontent.type2.f_value8 = '';
				controlObj.text('search_f_value8_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value8);                          	
					      
								
									that._pr_searchcontent.type2.f_value9 = '';
				controlObj.text('search_f_value9_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value9);                          	
					      
								
									that._pr_searchcontent.type2.f_value10 = '';
				controlObj.text('search_f_value10_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_value10);                          	
					      
								
									that._pr_searchcontent.type2.f_khbh = '';
				controlObj.text('search_f_khbh_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_khbh);                          	
					      
								
									that._pr_searchcontent.type2.f_yhm = '';
				controlObj.text('search_f_yhm_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_yhm);                          	
					      
								
									that._pr_searchcontent.type2.f_khfz = '';
				controlObj.text('search_f_khfz_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_khfz);                          	
					      
								
									that._pr_searchcontent.type2.f_yslx = '';
				controlObj.text('search_f_yslx_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_yslx);                          	
					      
								
									that._pr_searchcontent.type2.f_khzt = '';
				controlObj.text('search_f_khzt_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_khzt);                          	
					      
								
									that._pr_searchcontent.type2.f_sbbh = '';
				controlObj.text('search_f_sbbh_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_sbbh);                          	
					      
								
									that._pr_searchcontent.type2.f_dh = '';
				controlObj.text('search_f_dh_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_dh);                          	
					      
								
									that._pr_searchcontent.type2.f_dz = '';
				controlObj.text('search_f_dz_tbl_ld_qftsyl_list', that._pr_searchcontent.type2.f_dz);                          	
					      
				 

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_qftsyl_list").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {
        var whereClause = '';
        switch (that._pr_searchtype)
        {
            case "1":
                {

                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        var vv = that._pr_searchcontent.type1.split(' ');
                        if (vv.length > 0)
                        {
                            for (var i = 0; i < vv.length; i++)
                            {
                                if (vv[i] != '')
                                {
                                    whereClause += "(";
                       
														 	    whereClause += " f_khbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yhm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khfz like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yslx like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khzt like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dz like '%" + vv[i] + "%' or ";
						 
                                    if (whereClause.length > 0)
                                    {
                                        whereClause = whereClause.substr(0, whereClause.length - 3);
                                    }
                                    whereClause += ") and ";
                                }
                            }
                            if (whereClause.length > 0)
                            {
                                whereClause = whereClause.substr(0, whereClause.length - 4);
                            }
                        }
                        _whereClauseString = whereClause;
                    }


                    callBackFunction.success();
                }
                break;
            case "2":
                {
                    if (that._pr_searchcontent.type2 != undefined)
                    {

                        var tbl_ld_qftsyl_list = that._pr_searchcontent.type2;
             
        
			 			
				        if (tbl_ld_qftsyl_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_qftsyl_list.f_khbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_qftsyl_list.f_yhm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_khfz.length > 0)
                        {
                            whereClause += " f_khfz like '%" + tbl_ld_qftsyl_list.f_khfz + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_yslx.length > 0)
                        {
                            whereClause += " f_yslx like '%" + tbl_ld_qftsyl_list.f_yslx + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_khzt.length > 0)
                        {
                            whereClause += " f_khzt like '%" + tbl_ld_qftsyl_list.f_khzt + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_qftsyl_list.f_sbbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_dh.length > 0)
                        {
                            whereClause += " f_dh like '%" + tbl_ld_qftsyl_list.f_dh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_qftsyl_list.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_qftsyl_list.f_dz + "%' and ";
                        }	
		    

                        if (whereClause.length > 0)
                        {
                            whereClause = whereClause.substr(0, whereClause.length - 4);
                        }
                    }
                    _whereClauseString = whereClause;
                    callBackFunction.success();
                }
                break;
        }
    },
    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
        if (that._pr_gridselectids == '')
        {
            $('#btn_command_clearselect_tbl_ld_qftsyl_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_qftsyl_list').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_qftsyl_list .cc-badge-p').html(currentcount + '/' + allcount); 
        }
    },
     /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function (callBackFunction)
    {
        try
        {
             var gridHeight = 300;

            $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: _isPage,
                pageSize: _pageSize,
                pageList: [_pageSize],
                pageNumber: that._pr_gridpageindex,
                search: false,
                showColumns: false,
                showRefresh: false,
                clickToSelect: true,
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [
                {
                    field: '_checkbox', checkbox: true,
                    formatter: function (value, row, index)
                    {
                        //根据gridselectids给Grid设置选中项
                        switch (that._pr_listtype)
                        {
                            //编辑模式
                            case "1":
                                {
                                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                    {
                                        return {
                                            disabled: false,
                                            checked: true
                                        }
                                    }
                                    return value;
                                }
                                break;
                                //制度模式
                            case "2":
                                {
                                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                    {
                                        return {
                                            disabled: true,
                                            checked: true
                                        }
                                    }
                                    else
                                    {
                                        return {
                                            disabled: true
                                        }
                                    }
                                }
                                break;
                        }
                    }
                },
                {
                    field: 'sys_id', title: 'sys_id',"class": 'gridcell-ordercolumn hidden',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
                },
                                
							
                {
                    field: 'f_value1',
                    title: '备用字段1', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value2',
                    title: '备用字段2', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value3',
                    title: '备用字段3', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value4',
                    title: '备用字段4', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value5',
                    title: '备用字段5', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value6',
                    title: '备用字段6', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value7',
                    title: '备用字段7', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value8',
                    title: '备用字段8', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value9',
                    title: '备用字段9', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_value10',
                    title: '备用字段10', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_khbh',
                    title: '客户编号', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_yhm',
                    title: '用户名', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_khfz',
                    title: '客户分组', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_yslx',
                    title: '用水类型', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_khzt',
                    title: '客户状态', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_sbbh',
                    title: '水表编号', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_dh',
                    title: '电话', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                           if(resultStr.length > 10)
                            {
                                resultStr = resultStr.substr(0,10)+'...';
                            }                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_dz',
                    title: '地址', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                           if(resultStr.length > 10)
                            {
                                resultStr = resultStr.substr(0,10)+'...';
                            }                        
                                                
                        return resultStr; 
                    }
                },
        
                {
                    field: '', title: '操作',
                    "class":"hidden",
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":
                                return [
                                '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                                '<i class="glyphicon glyphicon-edit"></i>',
                                '</a>'
                                ].join('');
                                break;
                            case "2":
                                return [
                                '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                                '<i class="glyphicon glyphicon-eye-open"></i>',
                                '</a>'
                                ].join('');
                                break;
                        }
                    },
                    events: {
                        'click .view': function (e, value, row, index)
                        {
                            transToDetailPage(row.sys_id, '2');

                        },
                        'click .edit': function (e, value, row, index)
                        {
                            transToDetailPage(row.sys_id, '1');
                        }
                    }
                }
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function (row, index)
                {
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function (row)
                {
                    that._pr_gridselectids += '^' + row.sys_id;
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');    
                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function (row)
                {
                    that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');    
                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable('getSelections');
                    $.each(rows, function (i, u)
                    {
                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                        {

                        }
                        else
                        {
                            that._pr_gridselectids += '^' + rows[i].sys_id;
                        }
                    });
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                    gridSelectedChange();    
                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable('getData');
                    $.each(rows, function (i, u)
                    {
                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                        {
                            that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + rows[i].sys_id + '^', '^');
                        }
                    });

                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                    gridSelectedChange();    
                },
            });

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initGrid执行失败<br/>' + ex.message, 'fail');
        }
    },
    

    end = function(){};


    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        //appcode
        _pr_appcode : '',
        //1：可编辑；2：只读
        _pr_listtype: '',
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,
        _pr_fk_tbl_ld_qfts_sys_id: '',    

        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
        init: function (callBackFunction)
        {
            try
            {

                        //初始化参数
                        initParameter({
                            success: function ()
                            {

                                creatWhereClause({
                                    success: function ()
                                    {
                                        initGrid({
                                            success: function ()
                                            {
                                                that.bindGrid({
                                                    success: function ()
                                                    {

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_qftsyl_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_qftsyl_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_qftsyl_list');
                                                        switch (that._pr_listtype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        callBackFunction.success();
                                                    },
                                                    fail:function(message)
                                                    {
                                                        _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                                                    }
                                                });
                                            }
                                        });

                                    }
                                });

                                //初始化search
                                initSearchBaseCode({
                                    success: function ()
                                    {
                                        initSearchControl({
                                            success: function ()
                                            {
                                                setSearchModel({
                                                    success: function ()
                                                    {


                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                                $('#div_content_part_tbl_ld_qftsyl_detail').load('../tbl_ld_qftsyl/tbl_ld_qftsyl_detail_part.html', null, function ()
                                {

                                    tbl_ld_qftsyl_detail_Obj._pr_pagetype = that._pr_listtype;
                                    tbl_ld_qftsyl_detail_Obj.init({
                                        success: function ()
                                        {

                                        }
                                    });
                                });
                            }
                        });

                    
            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },
//---------------------------------------------------------------------------------
// ---------------------------------grid------------------------------------------
//---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:bindGrid
    *  参数:callBackFunction
    *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
    */
    bindGrid : function (callBackFunction)
    {
        setTimeout(function ()
        {
            var whereClause = _whereClauseString;
            if ( whereClause == "" )
            {
                whereClause += " 1 = 1 ";
            }              
            whereClause += " and sys_creatuserid = '" + basePageObj._userInfoJson.sys_userid + "'";

            if ( whereClause == "" )
            {
                whereClause = " 1 = 1 ";
            }
            whereClause += " and fk_tbl_ld_qfts_sys_id = '" + that._pr_fk_tbl_ld_qfts_sys_id + "'";    
            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_yhm^f_khfz^f_yslx^f_khzt^f_sbbh^f_dh^f_dz^sys_id';
	  
            var data = {
                whereString: whereClause,
                orderByString: orderByString,
                columnsString: columnsString,
                pageSizeString: _pageSize,
                pageIndexString: that._pr_gridpageindex,
                clientInf: _clientInf
            };
            doAjaxFunction(_serviceUrl, 'GetList', data, {
                success: function (result)
                {
                    var messageJson = (new Function("", "return " + result))();

                    $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable("loadJson", messageJson);

                    gridSelectedChange();
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.success();
                    }
                },
                fail: function (message)
                {
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.fail(message);
                    }                       
                }
            });
        }, 0);
    },
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------
       

        


        /* 
        *  
        *  方法:btn_command_delete_onclick
        *  参数:
        *  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
        */
        btn_command_delete_onclick: function ()
        {
            var allcount = that._pr_gridselectids.split('^').length;

            if (that._pr_gridselectids == '')
            {
                _alertMessage.show('至少选择一条数据!', 'warning', 1000);
            }
            else
            {
                var currentcount = $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条</h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条</h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('删除确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_delete.start();

                        var whereClause = "sys_id in (\'" + that._pr_gridselectids.toString().replaceAll("^", "\',\'") + "\')";

                        var data = {
                            clientInf: _clientInf,
                            whereString: whereClause
                        };
                        doAjaxFunction(_serviceUrl, 'Delete', data, {
                            success: function (result)
                            {
                                var data = {
                                    clientInf: _clientInf,
                                    whereString: _whereClauseString
                                };
                                doAjaxFunction(_serviceUrl, 'GetCount', data, {
                                    success: function (result)
                                    {
                                        //判断当前页面是否有记录
                                        var count = parseInt(result);
                                        if (count < that._pr_gridpageindex * _pageSize)
                                        {
                                            that._pr_gridpageindex = Math.ceil(count / _pageSize);
                                        }
                                        if (that._pr_gridpageindex == 0)
                                        {
                                            that._pr_gridpageindex = 1;
                                        }
                                        //清空选择情况
                                        that._pr_gridselectids = '';
                                        that.bindGrid({
                                            success: function ()
                                            {
                                                _ladda_btn_command_delete.stop();
                                            },
                                            fail:function(message)
                                            {
                                                _alertMessage.show('数据删除完成，绑定数据失败', 'fail');
                                                _ladda_btn_command_delete.stop();
                                                _resultMessage.show(message);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('数据删除完成，获取数据条数失败', 'fail');
                                        _ladda_btn_command_delete.stop();
                                        _resultMessage.show(message);
                                    }
                                });

                            },
                            fail: function (message)
                            {
                                _alertMessage.show('数据删除失败', 'fail');
                                _ladda_btn_command_delete.stop();
                                _resultMessage.show(message);
                            }
                        });


                    },
                    cancle: function ()
                    {
                       
                    }
                });
            }
        },

        /* 
        *  
        *  方法:btn_command_clearselect_onclick
        *  参数:
        *  清空选择内容
        *  
        */
        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_ld_qftsyl_list').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            gridSelectedChange();
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_command_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“简单查询”按钮的事件
        */
        btn_command_search_onclick: function ()
        {
            try
            {
                switch (that._pr_searchtype)
                {
                    case "1":
                        getSearchModel({
                            success: function ()
                            {
                                creatWhereClause({
                                    success: function ()
                                    {
                                        clearSearchModel();

                                        that._pr_gridpageindex = '1';
                                        that._pr_gridselectids = '';
                                        that.bindGrid();
                                    }

                                });
                            },
                            fail:function(message)
                            {
                                _alertMessage.show('获取数据失败', 'fail');
                                _resultMessage.show(message);
                            }
                        });

                        break;
                    case "2":
                        that.btn_command_search_2_onclick();
                        break;
                }
            }
            catch (ex)
            {
                _alertMessage.show('查询失败', 'fail');
                _resultMessage.show(ex.message);
            }
        },

        /* 
        *  
        *  方法:btn_command_search_1_onclick
        *  参数:
        *  简单查询模式
        */
        btn_command_search_1_onclick: function ()
        {
            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_qftsyl_list').html('简单查询');
            $('#txt_command_search_tbl_ld_qftsyl_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_2_onclick
        *  参数:
        *  高级查询模式
        */
        btn_command_search_2_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_qftsyl_list').html('高级查询');
            $('#txt_command_search_tbl_ld_qftsyl_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_qftsyl_list').modal('show');
        },

        /* 
        *  
        *  方法:btn_search_modal_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“高级查询”按钮的事件
        */
        btn_search_modal_search_onclick: function ()
        {
            getSearchModel({
                success: function ()
                {
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {
                                    clearSearchModel();
                                    $('#div_search_modal_tbl_ld_qftsyl_list').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if(message== '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                         
                        }
                    });
                },
                fail:function(message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },
        /* 
        *  
        *  方法:btn_search_modal_cancle_onclick
        *  参数:
        *  关闭高级查询窗体
        *  
        */
        btn_search_modal_cancle_onclick: function ()
        {
            _validateMessage.hidden();
            $('#div_search_modal_tbl_ld_qftsyl_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_qftsyl_list').html('简单查询');
            $('#txt_command_search_tbl_ld_qftsyl_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_xs_onclick
        *  参数:
        *  小屏幕模式下打开高级查询模式
        *  
        */

        btn_command_search_xs_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_qftsyl_list').html('高级查询');
            $('#txt_command_search_tbl_ld_qftsyl_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_qftsyl_list').modal('show');
        },
        end:function()
        {
        }

    };
    return that;
})();





