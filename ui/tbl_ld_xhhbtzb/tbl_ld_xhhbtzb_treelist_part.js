

var _khJson = null;
var tbl_ld_xhhbtzb_treelist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xhhbtzb.asmx/',
        _serviceUrl_kh = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = true,
    _pageHeight = 950,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    _ladda_btn_command_save = null,

    //where语句
    _whereClauseString = '',

    //上一次的滚动条位置
    _gridStatusScrollTop = 0,
    //被选中的ID
    _gridStatusSelectid = '',




    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function ( callBackFunction )
    {
        try
        {
           

            if ( that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null' )
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number( that._pr_gridpageindex );
            }

            if ( that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null' )
            {
                that._pr_searchcontent = new Object();
            }
            else
            {
                that._pr_searchcontent = ( new Function( "", "return " + that._pr_searchcontent ) )();
            }

            if ( that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null' )
            {
                that._pr_searchtype = '1';
            }

            switch (that._pr_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_xhhbtzb_treelist').html('简单查询');
                    $('#txt_command_search_tbl_ld_xhhbtzb_treelist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_xhhbtzb_treelist').html('高级查询');
                    $('#txt_command_search_tbl_ld_xhhbtzb_treelist').attr("disabled", true);
                    break;
            }


            if ( that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null' )
            {
                _blockMessage.show( 'listtype参数接收失败...', 'fail' );
            }
            else
            {
                callBackFunction.success();
            }
        }
        catch ( ex )
        {
            _blockMessage.show( 'initParameter执行失败' + ex.message, 'fail' );
        }

    },  

   setButtonDisable = function(isDisable)
    {
        if ( that._pr_listtype == '1' )
        {  
            if ( isDisable == true )
            {
                $( '#btn_command_save_tbl_ld_xhhbtzb_treelist' ).addClass( 'hidden' );
                $( '#btn_command_delete_tbl_ld_xhhbtzb_treelist' ).addClass( 'hidden' );               

                var rows = $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).bootstrapTable( 'getData' );
                if(rows.length > 0)
                {
                    $( '#btn_command_new_tbl_ld_xhhbtzb_treelist' ).addClass( 'hidden' ); 
                }
                else
                {
                    $( '#btn_command_new_tbl_ld_xhhbtzb_treelist' ).removeClass( 'hidden' ); 
                }
                
            }
            else
            {
                $( '#btn_command_save_tbl_ld_xhhbtzb_treelist' ).removeClass( 'hidden' );
                $( '#btn_command_delete_tbl_ld_xhhbtzb_treelist' ).removeClass( 'hidden' );
                $( '#btn_command_new_tbl_ld_xhhbtzb_treelist' ).removeClass( 'hidden' ); 
            }
        }
        else
        {
            $( '#btn_command_save_tbl_ld_xhhbtzb_treelist' ).addClass( 'hidden' );
            $( '#btn_command_delete_tbl_ld_xhhbtzb_treelist' ).addClass( 'hidden' );
           $( '#btn_command_new_tbl_ld_xhhbtzb_treelist' ).addClass( 'hidden' ); 
        }
    }, 

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function ( callBackFunction )
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
                    _blockMessage.show('initBaseCode执行失败<br/>' + ex.message, 'fail');  
                }
            }
        });

    },


    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化SearchModel控件，_baseCodeHashMap作为Code数据源
    */
    initSearchControl = function ( callBackFunction )
    {
         try
        {
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                        
            	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    

            //模态窗口
            $('#div_search_modal_tbl_ld_xhhbtzb_treelist').modal({
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

    //=============================Model操作===================================
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置SearchModel数据
    */
    setSearchModel = function ( callBackFunction )
    {
         try
        {
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        //简单查询
                        $("#txt_command_search_tbl_ld_xhhbtzb_treelist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_xhhbtzb_treelist = that._pr_searchcontent.type2;

                        	
						           controlObj.text('search_f_value1_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value1);                          	
		                	
						           controlObj.text('search_f_value2_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value2);                          	
		                	
						           controlObj.text('search_f_value3_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value3);                          	
		                	
						           controlObj.text('search_f_value4_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value4);                          	
		                	
						           controlObj.text('search_f_value5_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value5);                          	
		                	
						           controlObj.text('search_f_value6_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value6);                          	
		                	
						           controlObj.text('search_f_value7_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value7);                          	
		                	
						           controlObj.text('search_f_value8_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value8);                          	
		                	
						           controlObj.text('search_f_value9_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value9);                          	
		                	
						           controlObj.text('search_f_value10_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value10);                          	
		                	
						           controlObj.text('search_f_khbhid_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khbhid);                          	
		                	
						           controlObj.text('search_f_khxx_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khxx);                          	
		                	
						           controlObj.text('search_f_khjson_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khjson);                          	
		                	
						           controlObj.text('search_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id);                          	
		                	
						           controlObj.text('search_f_bz_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_bz);                          	
		                	
						           controlObj.text('search_f_khbh_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khbh);                          	
		                 
                
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
    *  获取SearchModel的数据，存储到_pr_searchcontent
    */
    getSearchModel = function ( callBackFunction )
    {
        try
        {
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_xhhbtzb_treelist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_xhhbtzb_treelist = new Object();
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value1 = controlObj.text('search_f_value1_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value2 = controlObj.text('search_f_value2_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value3 = controlObj.text('search_f_value3_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value4 = controlObj.text('search_f_value4_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value5 = controlObj.text('search_f_value5_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value6 = controlObj.text('search_f_value6_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value7 = controlObj.text('search_f_value7_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value8 = controlObj.text('search_f_value8_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value9 = controlObj.text('search_f_value9_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_value10 = controlObj.text('search_f_value10_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_khbhid = controlObj.text('search_f_khbhid_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_khxx = controlObj.text('search_f_khxx_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_khjson = controlObj.text('search_f_khjson_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id = controlObj.text('search_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_bz = controlObj.text('search_f_bz_tbl_ld_xhhbtzb_treelist'); 
				    				
										 
					tbl_ld_xhhbtzb_treelist.f_khbh = controlObj.text('search_f_khbh_tbl_ld_xhhbtzb_treelist'); 
				     
                    that._pr_searchcontent.type2 = tbl_ld_xhhbtzb_treelist;
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
    *  对_pr_searchcontent的type2进行校验
    */
    checkSearchModel = function ( callBackFunction )
    {
        try
        {
            var tbl_ld_xhhbtzb_treelist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

        

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value1.length > 200)
            {			
                errorMessageHansMap.put('search_f_value1_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value2.length > 200)
            {			
                errorMessageHansMap.put('search_f_value2_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value3.length > 200)
            {			
                errorMessageHansMap.put('search_f_value3_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value4.length > 200)
            {			
                errorMessageHansMap.put('search_f_value4_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value5.length > 200)
            {			
                errorMessageHansMap.put('search_f_value5_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value6.length > 200)
            {			
                errorMessageHansMap.put('search_f_value6_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value7.length > 200)
            {			
                errorMessageHansMap.put('search_f_value7_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value8.length > 200)
            {			
                errorMessageHansMap.put('search_f_value8_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value9.length > 200)
            {			
                errorMessageHansMap.put('search_f_value9_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value10.length > 200)
            {			
                errorMessageHansMap.put('search_f_value10_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_khbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_khbhid_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_khxx.length > 200)
            {			
                errorMessageHansMap.put('search_f_khxx_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id.length > 200)
            {			
                errorMessageHansMap.put('search_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_bz.length > 200)
            {			
                errorMessageHansMap.put('search_f_bz_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_khbh_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_search.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_search.hidden();
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
    *  参数:
    *  清空SearchMode的数据,当切换查询模式时触发，切换成简单查询模式时清空高级查询内容，反之亦然
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
				controlObj.text('search_f_value1_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value1);                          	
					      
								
									that._pr_searchcontent.type2.f_value2 = '';
				controlObj.text('search_f_value2_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value2);                          	
					      
								
									that._pr_searchcontent.type2.f_value3 = '';
				controlObj.text('search_f_value3_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value3);                          	
					      
								
									that._pr_searchcontent.type2.f_value4 = '';
				controlObj.text('search_f_value4_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value4);                          	
					      
								
									that._pr_searchcontent.type2.f_value5 = '';
				controlObj.text('search_f_value5_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value5);                          	
					      
								
									that._pr_searchcontent.type2.f_value6 = '';
				controlObj.text('search_f_value6_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value6);                          	
					      
								
									that._pr_searchcontent.type2.f_value7 = '';
				controlObj.text('search_f_value7_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value7);                          	
					      
								
									that._pr_searchcontent.type2.f_value8 = '';
				controlObj.text('search_f_value8_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value8);                          	
					      
								
									that._pr_searchcontent.type2.f_value9 = '';
				controlObj.text('search_f_value9_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value9);                          	
					      
								
									that._pr_searchcontent.type2.f_value10 = '';
				controlObj.text('search_f_value10_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_value10);                          	
					      
								
									that._pr_searchcontent.type2.f_khbhid = '';
				controlObj.text('search_f_khbhid_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_khbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_khxx = '';
				controlObj.text('search_f_khxx_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_khxx);                          	
					      
								
									that._pr_searchcontent.type2.f_khjson = '';
				controlObj.text('search_f_khjson_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_khjson);                          	
					      
								
									that._pr_searchcontent.type2.fk_tbl_maintable_sys_id = '';
				controlObj.text('search_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.fk_tbl_maintable_sys_id);                          	
					      
								
									that._pr_searchcontent.type2.f_bz = '';
				controlObj.text('search_f_bz_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_bz);                          	
					      
								
									that._pr_searchcontent.type2.f_khbh = '';
				controlObj.text('search_f_khbh_tbl_ld_xhhbtzb_treelist', that._pr_searchcontent.type2.f_khbh);                          	
					      
				 

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_xhhbtzb_treelist").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Grid------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function ( callBackFunction )
    {
        try
        {
            $('#table_grid_tbl_ld_xhhbtzb_treelist').bootstrapTable({
                showHeader: false,
                cache: false,
                height: _pageHeight,
               
                striped: false,
                pagination: _isPage,
                pageSize: _pageSize,
                pageList: [_pageSize],
                pageNumber: that._pr_gridpageindex,
                search: false,
                showColumns: false,
                showRefresh: false,
                clickToSelect: true,
                singleSelect: true,
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [
                {
                    field: 'sys_id', title: 'sys_id',       
                    align: 'left',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
                    clickToSelect: true,
                    formatter: function ( value, row, index )
                    {
                        var resultHtml = "";
                        var value = "";
                        resultHtml += "<div class=\"gridcell-divtable\">";
                        
                         //内容
                        {
                            resultHtml += "<div class=\"gridcell-divcell gridcell-content\" >";
                             
                       
                             
                       
                             
                       
                             
                       
                             
                       
                             
                       
                             
                       
                             
                       
                             
                       
                             
                       
                             
                
                            //==客户编号
                                            {
                                value = row.f_khbh;
                                                
                                                if(value.length > 10)
                                                {
                                                    value = value.substr(0,10)+'...';
                                                }                        
                                                                    
                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">客户编号：</span>" + value + "</div>";
                                                }                       
                             
                
                            //==用户名
                                            {
                                var value1 = row.f_khxx.split(",");
                                                
                                value = value1[0];

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">用户名：</span>" + value + "</div>";
                            }
                            //==电话
                                                {

                                var value1 = row.f_khxx.split(",");
                                if (value1 == "")
                                {
                                    value = "";
                                } else
                                {
                                    value = value1[2];
                                                }                        
                                                                    
                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">电话：</span>" + value + "</div>";
                                                }                       
                             
                            //==地址
                             
                       
                             
                
                                            {

                                var value1 = row.f_khxx.split(",");
                                                
                                if (value1 == "")
                                                {
                                    value = "";
                                } else
                                {
                                    value = value1[1];
                                                }                        
                                                                    
                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">地址：</span>" + value + "</div>";
                                                }                       
                             
                       
                             
                
                                            //==备注
                                            {
                                                value = row.f_bz;
                                                
                                                if(value.length > 10)
                                                {
                                                    value = value.substr(0,10)+'...';
                                                }                        
                                                                    
                                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">备注：</span>" + value + "</div>"; 
                                                }                       
                             
                
                                                
                                                                    
                            
                            resultHtml += "</div>";
                        }
                        //编辑按钮
                        {
                            resultHtml += "<div  class=\"gridcell-divcell gridcell-edit\" >";
                            resultHtml += "<a class=\"edit ml10\" href=\"javascript:void(0)\"><i class=\"glyphicon glyphicon-edit\"></i></a>";
                            resultHtml += "</div>";
                        }
                        resultHtml += "</div>";
                        return resultHtml;
                    }, events: {
                        'click .edit': function ( e, value, row, index )
                        {
                            if ( _gridStatusSelectid != row.sys_id )
                            {
                                $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).find( 'tr.success' ).removeClass( 'success' );
                                $( e.target ).parent().parent().parent().parent().parent().addClass( 'success' );

                                _gridStatusSelectid = row.sys_id;
                                bindDetailControl( {
                                    success: function ()
                                    {
                                    }, fail: function ( message )
                                    {
                                        _alertMessage.show( 'bindDetailControl执行失败', 'fail' );
                                        _resultMessage.show( message );
                                    }
                                } );
                            }
                        },
                    }
                },


                                
							
                {
                    field: 'f_value1', 
                    title: '备用字段1',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value2', 
                    title: '备用字段2',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value3', 
                    title: '备用字段3',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value4', 
                    title: '备用字段4',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value5', 
                    title: '备用字段5',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value6', 
                    title: '备用字段6',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value7', 
                    title: '备用字段7',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value8', 
                    title: '备用字段8',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value9', 
                    title: '备用字段9',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_value10', 
                    title: '备用字段10',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_khbhid', 
                    title: '客户编号id',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_khxx', 
                    title: '客户信息',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_khjson', 
                    title: '客户json',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_khjsonid', 
                    title: '客户jsonid',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'fk_tbl_maintable_sys_id', 
                    title: 'fk_tbl_maintable_sys_id',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_fj', 
                    title: '附件',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_bz', 
                    title: '备注',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
                                
							
                {
                    field: 'f_khbh', 
                    title: '客户编号',
                    "class": 'hidden',                           
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;                     
                    }
                },             
        
                
                ],
                onPageChange: function ( size, number )
                {
                    that._pr_gridpageindex = number;

                    bindGrid(true, {
                        success: function ()
                        {
                            bindDetailControl( {
                                success: function () { }, fail: function ( message )
                                {
                                    _alertMessage.show( 'bindDetailControl执行失败', 'fail' );
                                    _resultMessage.show( message );
                                }
                            } );
                        }, fail: function (message)
                        {
                            _alertMessage.show( 'bindDetailControl执行失败', 'fail' );
                            _resultMessage.show( message );
                        }
                    } );
                },
                rowStyle: function ( row, index )
                {
                    return {};
                },
                onLoadSuccess: function ( data )
                {
                },
                //当列头复选框被选中时，触发此事件，
                onCheck: function ( row )
                {

                },
                //当列头复选框被反选中时，触发此事件，
                onUncheck: function ( row )
                {

                },
                //当列头复选框被全选中时，触发此事件，
                onCheckAll: function ()
                {

                },
                //当列头复选框被全反选中时，触发此事件，
                onUncheckAll: function ()
                {
                },
            } );

            callBackFunction.success();
        }
        catch ( ex )
        {
            _blockMessage.show( 'initGrid执行失败<br/>' + ex.message, 'fail' );
        }
    },
    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  根据_pr_searchcontent创建_whereClauseString
    */
    creatWhereClause = function ( callBackFunction )
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
                       
														 	    whereClause += " f_khbhid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khxx like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khjson like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " fk_tbl_maintable_sys_id like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bz like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khbh like '%" + vv[i] + "%' or ";
						 
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

                        var tbl_ld_xhhbtzb_treelist = that._pr_searchcontent.type2;
             
        
			 			
				        if (tbl_ld_xhhbtzb_treelist.f_khbhid.length > 0)
                        {
                            whereClause += " f_khbhid like '%" + tbl_ld_xhhbtzb_treelist.f_khbhid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_xhhbtzb_treelist.f_khxx.length > 0)
                        {
                            whereClause += " f_khxx like '%" + tbl_ld_xhhbtzb_treelist.f_khxx + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_xhhbtzb_treelist.f_khjson.length > 0)
                        {
                            whereClause += " f_khjson like '%" + tbl_ld_xhhbtzb_treelist.f_khjson + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id.length > 0)
                        {
                            whereClause += " fk_tbl_maintable_sys_id like '%" + tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_xhhbtzb_treelist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_xhhbtzb_treelist.f_bz + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_xhhbtzb_treelist.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_xhhbtzb_treelist.f_khbh + "%' and ";
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
    *  方法:bindGrid
    *  参数:callBackFunction
    *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据,
    *  并完成在_gridStatusSelectid为空的情况下，指定要打开的数据
    *  为数据源计算ishaschild
    *  折叠行的显示情况
    *  定位滚动条
    */
    bindGrid = function ( isClearStatus,callBackFunction )
    {
        if ( isClearStatus == true )
        {
            _gridStatusSelectid = '';
            _gridStatusScrollTop = 0;
           
        }
        else
        {          
            //记录滚动情况
            _gridStatusScrollTop = $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).parent().scrollTop();
        }
       
        setTimeout( function ()
        {
            var whereClause = _whereClauseString;
                if ( whereClause == "" )
                {
                    whereClause = " 1 = 1 ";
                }
                whereClause += " and fk_tbl_ld_xhhbt_sys_id = '" + that._pr_fk_tbl_ld_xhhbt_sys_id + "'";    
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_khxx^f_khjson^f_khjsonid^fk_tbl_maintable_sys_id^f_fj^f_bz^f_khbh^sys_id';
  
            var data = {
                whereString: whereClause,
                orderByString: orderByString,
                columnsString: columnsString,
                pageSizeString: _pageSize,
                pageIndexString: that._pr_gridpageindex,
                clientInf: _clientInf
            };
            doAjaxFunction( _serviceUrl, 'GetList', data, {
                success: function ( result )
                {
                    var messageJson = ( new Function( "", "return " + result ) )();
                    //绑定数据
                    $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).bootstrapTable( "loadJson", messageJson );

                    //如果尚未指定打开哪条数据，则在此处指定
                    if ( _gridStatusSelectid == '' )
                    {
                        if ( messageJson.rows.length > 0 )
                        {
                            _gridStatusSelectid = messageJson.rows[0]["sys_id"];
                        }
                    }
                    $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).find( 'tr.success' ).removeClass( 'success' );
                    $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).find( '#tr_' + _gridStatusSelectid ).addClass( 'success' );
                   

                    //定位
                    $( '#table_grid_tbl_ld_xhhbtzb_treelist' ).parent().scrollTop( _gridStatusScrollTop );
                    callBackFunction.success();
                },
                fail: function ( message )
                {
                    callBackFunction.fail( message );
                }
            } );
        }, 0 );
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------DetailModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initDetailControl
    *  参数:
    *  初始化DetailModel控件，_baseCodeHashMap作为Code数据源
    */
    initDetailControl = function ( callBackFunction )
    {

        try
        {
            //计算页面高度
            $( '#div_detail_control_container_tbl_ld_xhhbtzb' ).css( 'min-height', _pageHeight );
            $( '#div_list_container_tbl_ld_xhhbtzb' ).css( 'min-height', _pageHeight );
           
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
             
        
            	
				          
            	
				          
            	
				          
            	
				          
            	
				          
            	
				          
            	
				          
            	
				          
            	
				          
            	
				          
            	
			          
            	
				          
            	
				          
            	
            //controlObj.richtextinit('detail_f_khjson_tbl_ld_xhhbtzb_treelist', f_khjson_onchange);
            //controlObj.fileuploaderinit('detail_f_khjson_file_tbl_ld_xhhbtzb_treelist', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "isThumbnailImgShow": false, onDeleteEnd: function (filerealname, msg) { f_khjson_file_onchange(); } }, f_khjson_file_onchange);
            	
				          
            	
			            controlObj.fileuploaderinit('detail_f_fj_tbl_ld_xhhbtzb_treelist', {"fileUploadExtnames":";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;","fileUploadCountMax":"0","isThumbnailImgShow":true}, f_fj_onchange);          
            	
											 						          
            
           

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControl执行失败。<br/>' + ex.message, 'fail');
        }      
    },
    /* 
    *  
    *  方法:bindDetailControl
    *  参数:
    *  根据_gridStatusSelectid绑定数据
    */
    bindDetailControl = function ( callBackFunction )
    {
        if ( _gridStatusSelectid != "" )
        {
            $( '#div_detail_tbl_ld_xhhbtzb' ).removeClass( 'hidden' );
		setButtonDisable( false );


            getDetailData( {
                success: function ( tbl_ld_xhhbtzb_treelist )
                {
                    setDetailModel( tbl_ld_xhhbtzb_treelist, {
                        success: function ()
                        {
                            callBackFunction.success();

                        }, fail: function ( message )
                        {
                            callBackFunction.fail( message );
                        }
                    } );
                }, fail: function ( message )
                {
                    callBackFunction.fail( message );
                }
             } );
        }
        else
        {
            clearDetailModel();
            $( '#div_detail_tbl_ld_xhhbtzb' ).addClass( 'hidden' );
	setButtonDisable( true );

            callBackFunction.success();
        }

    },
    /* 
    *  
    *  方法:setDetailDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDetailDisable = function ( isDisable )
    {
        
					    controlObj.textdisable('detail_f_khbh_tbl_ld_xhhbtzb_treelist', true);			
		    if(isDisable)
		    {
                $('#btn_detail_f_khbh_tbl_ld_xhhbtzb_treelist').attr('disabled', 'disabled');				
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_xhhbtzb_treelist').removeAttr('disabled');				
            }               
            
					    controlObj.textdisable('detail_f_khbhid_tbl_ld_xhhbtzb_treelist', isDisable);          
            
					    controlObj.textdisable('detail_f_khxx_tbl_ld_xhhbtzb_treelist', isDisable);          
            
						 
        controlObj.textdisable('detail_f_khjson_tbl_ld_xhhbtzb_treelist', isDisable);
        //controlObj.fileuploaderdisable('detail_f_khjson_file_tbl_ld_xhhbtzb_treelist', isDisable);
        //if (isDisable)
        //{
        //    $('#detail_f_khjson_resource_tbl_ld_xhhbtzb_treelist').parent().addClass('hidden');
        //    $('#detail_f_khjson_file_tbl_ld_xhhbtzb_treelist').parent().addClass('hidden');
        //}
        //else
        //{
        //    $('#detail_f_khjson_resource_tbl_ld_xhhbtzb_treelist').parent().removeClass('hidden');
        //    $('#detail_f_khjson_file_tbl_ld_xhhbtzb_treelist').parent().removeClass('hidden');
        //}
            
					    controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', isDisable);          
            
			            controlObj.fileuploaderdisable('detail_f_fj_tbl_ld_xhhbtzb_treelist', isDisable);          
            
			            controlObj.textdisable('detail_f_bz_tbl_ld_xhhbtzb_treelist', isDisable);          
             
        controlObj.textdisable('detail_f_yhm_tbl_ld_xhhbtzb_treelist', true);
        controlObj.textdisable('detail_f_dz_tbl_ld_xhhbtzb_treelist', true);
        controlObj.textdisable('detail_f_dh_tbl_ld_xhhbtzb_treelist', true);
                   
    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setDetailModel
    *  参数:callBackFunction
    *  根据传入的tbl_ld_xhhbtzb_treelist，绑定DetailModel
    */
    setDetailModel = function ( tbl_ld_xhhbtzb_treelist, callBackFunction )
    {
         try
        {
            
            var khxx_zx = tbl_ld_xhhbtzb_treelist.f_khxx;
            if (khxx_zx != "")
            {
            var khxx_zxArr = khxx_zx.split(",");
            controlObj.text('detail_f_yhm_tbl_ld_xhhbtzb_treelist', khxx_zxArr[0]);
            controlObj.text('detail_f_dz_tbl_ld_xhhbtzb_treelist', khxx_zxArr[1]);
            controlObj.text('detail_f_dh_tbl_ld_xhhbtzb_treelist', khxx_zxArr[2]);
            } else
            {
                controlObj.text('detail_f_yhm_tbl_ld_xhhbtzb_treelist', "");
                controlObj.text('detail_f_dz_tbl_ld_xhhbtzb_treelist', "");
                controlObj.text('detail_f_dh_tbl_ld_xhhbtzb_treelist', "");
            }
			        controlObj.text('detail_f_value1_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value1);          
		
			        controlObj.text('detail_f_value2_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value2);          
		
			        controlObj.text('detail_f_value3_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value3);          
		
			        controlObj.text('detail_f_value4_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value4);          
		
			        controlObj.text('detail_f_value5_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value5);          
		
			        controlObj.text('detail_f_value6_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value6);          
		
			        controlObj.text('detail_f_value7_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value7);          
		
			        controlObj.text('detail_f_value8_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value8);          
		
			        controlObj.text('detail_f_value9_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value9);          
		
			        controlObj.text('detail_f_value10_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value10);          
		
			        controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khbh);          
		
			        controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khbhid);          
		
			        controlObj.text('detail_f_khxx_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khxx);          
		
				
            controlObj.text('detail_f_khjson_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khjson);
            //controlObj.fileuploaderbind('detail_f_khjson_file_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khjsonid);
            //f_khjson_file_onchange();
		
			        controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id);          
		
			        controlObj.fileuploaderbind('detail_f_fj_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_fj);          
		
			        controlObj.text('detail_f_bz_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_bz.returnStringRN());          
				
        callBackFunction.success();
        }
        catch ( ex )
        {
            callBackFunction.fail( ex.message);
            
        } 
    },
    /* 
    *  
    *  方法:getDetailModel
    *  参数:callBackFunction
    *  获取DetailMode的数据对象，返回数据对象
    */
    getDetailModel = function ( callBackFunction )
    {
         try
        {
            var tbl_ld_xhhbtzb_treelist = new Object();
            
					
            tbl_ld_xhhbtzb_treelist.f_value1 = controlObj.text('detail_f_value1_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value2 = controlObj.text('detail_f_value2_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value3 = controlObj.text('detail_f_value3_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value4 = controlObj.text('detail_f_value4_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value5 = controlObj.text('detail_f_value5_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value6 = controlObj.text('detail_f_value6_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value7 = controlObj.text('detail_f_value7_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value8 = controlObj.text('detail_f_value8_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value9 = controlObj.text('detail_f_value9_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_value10 = controlObj.text('detail_f_value10_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_khxx = controlObj.text('detail_f_khxx_tbl_ld_xhhbtzb_treelist');          
            
						 
            tbl_ld_xhhbtzb_treelist.f_khjson = controlObj.text('detail_f_khjson_tbl_ld_xhhbtzb_treelist');
            //tbl_ld_xhhbtzb_treelist.f_khjsonid = controlObj.fileuploaderid('detail_f_khjson_file_tbl_ld_xhhbtzb_treelist');
            
					
            tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist');          
            
			            tbl_ld_xhhbtzb_treelist.f_fj = controlObj.fileuploaderid('detail_f_fj_tbl_ld_xhhbtzb_treelist');          
            
					
            tbl_ld_xhhbtzb_treelist.f_bz = controlObj.text('detail_f_bz_tbl_ld_xhhbtzb_treelist');          
            		
            callBackFunction.success(tbl_ld_xhhbtzb_treelist);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_xhhbtzb_treelist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function ( tbl_ld_xhhbtzb_treelist, callBackFunction )
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_khbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_khxx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khxx_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id.length > 200)
            {			
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_fj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_fj_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_xhhbtzb_treelist.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_xhhbtzb_treelist', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ld_xhhbtzb_treelist);
            }
            }
            catch (ex)
            {
                callBackFunction.fail( ex.message );
            }
    },

    /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_ld_xhhbtzb_treelist
    *  清空数据对象
    */
    clearDetailModel = function ()
    {
        var tbl_ld_xhhbtzb_treelist = {};

       
			            tbl_ld_xhhbtzb_treelist.f_value1 = '';
        controlObj.text('detail_f_value1_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value1);          
		
			            tbl_ld_xhhbtzb_treelist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value2);          
		
			            tbl_ld_xhhbtzb_treelist.f_value3 = '';
        controlObj.text('detail_f_value3_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value3);          
		
			            tbl_ld_xhhbtzb_treelist.f_value4 = '';
        controlObj.text('detail_f_value4_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value4);          
		
			            tbl_ld_xhhbtzb_treelist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value5);          
		
			            tbl_ld_xhhbtzb_treelist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value6);          
		
			            tbl_ld_xhhbtzb_treelist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value7);          
		
			            tbl_ld_xhhbtzb_treelist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value8);          
		
			            tbl_ld_xhhbtzb_treelist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value9);          
		
			            tbl_ld_xhhbtzb_treelist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_value10);          
		
			                tbl_ld_xhhbtzb_treelist.f_khbh = '';
        controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khbh);          
		
			            tbl_ld_xhhbtzb_treelist.f_khbhid = '';
        controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khbhid);          
		
			            tbl_ld_xhhbtzb_treelist.f_khxx = '';
        controlObj.text('detail_f_khxx_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khxx);          
		
				
                tbl_ld_xhhbtzb_treelist.f_khjson = '';
        //tbl_ld_xhhbtzb_treelist.f_khjsonid = '';
        controlObj.text('detail_f_khjson_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khjson);
        //controlObj.fileuploaderbind('detail_f_khjson_file_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_khjsonid);
        //f_khjson_file_onchange();
		
			            tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id = '';
        controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id);          
		
			                 tbl_ld_xhhbtzb_treelist.f_fj = '';
        controlObj.fileuploaderbind('detail_f_fj_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_fj);          
		
			                tbl_ld_xhhbtzb_treelist.f_bz = '';
        controlObj.text('detail_f_bz_tbl_ld_xhhbtzb_treelist', tbl_ld_xhhbtzb_treelist.f_bz.returnStringRN());          
			

    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据__gridStatusSelectid ，返回数据对象
    */
    getDetailData = function ( callBackFunction )
    {

        var whereClause = ' sys_id = \'' + _gridStatusSelectid + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_khxx^f_khjson^f_khjsonid^fk_tbl_maintable_sys_id^f_fj^f_bz^f_khbh^sys_id';

        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: '',
            pageIndexString: '',
            clientInf: _clientInf
        };
        doAjaxFunction( _serviceUrl, 'GetList', data, {
            success: function ( result )
            {
                try
                {
                    var messageJson = ( new Function( "", "return " + result ) )();
                    callBackFunction.success( messageJson.rows[0] );
                }
                catch ( ex )
                {
                    callBackFunction.fail( ex.message )
                }
            },
            fail: function ( message )
            {
                callBackFunction.fail( message )
            }
        } );


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_ld_xhhbtzb_treelist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function ( tbl_ld_xhhbtzb_treelist, callbackFunction )
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_tbl_maintable_sys_id^f_fj^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridStatusSelectid,

 
				                f_value1:tbl_ld_xhhbtzb_treelist.f_value1 ,          
		        
				                f_value2:tbl_ld_xhhbtzb_treelist.f_value2 ,          
		        
				                f_value3:tbl_ld_xhhbtzb_treelist.f_value3 ,          
		        
				                f_value4:tbl_ld_xhhbtzb_treelist.f_value4 ,          
		        
				                f_value5:tbl_ld_xhhbtzb_treelist.f_value5 ,          
		        
				                f_value6:tbl_ld_xhhbtzb_treelist.f_value6 ,          
		        
				                f_value7:tbl_ld_xhhbtzb_treelist.f_value7 ,          
		        
				                f_value8:tbl_ld_xhhbtzb_treelist.f_value8 ,          
		        
				                f_value9:tbl_ld_xhhbtzb_treelist.f_value9 ,          
		        
				                f_value10:tbl_ld_xhhbtzb_treelist.f_value10 ,          
		        
            //f_khbh: tbl_ld_xhhbtzb_treelist.f_khbh,
		        
            //f_khbhid: tbl_ld_xhhbtzb_treelist.f_khbhid,
		        
            //f_khxx: tbl_ld_xhhbtzb_treelist.f_khxx,
		        
            //f_khjson: tbl_ld_xhhbtzb_treelist.f_khjson,
                    f_khjsonid:tbl_ld_xhhbtzb_treelist.f_khjsonid,          
		        
				                fk_tbl_maintable_sys_id:tbl_ld_xhhbtzb_treelist.fk_tbl_maintable_sys_id ,          
		        
						
                    f_fj:tbl_ld_xhhbtzb_treelist.f_fj ,          
		        
				                f_bz:tbl_ld_xhhbtzb_treelist.f_bz.formatStringRN() ,          
		        

            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')

        };


        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify( json )
        };
        doAjaxFunction( _serviceUrl, 'Update', data, {
            success: function ( message )
            {
                callbackFunction.success( tbl_ld_xhhbtzb_treelist );
            },
            fail: function ( message )
            {
                callbackFunction.fail( message );
            },
            error: function ( message )
            {
                _blockMessage.show( _serviceUrl + 'Update<br/>' + message, 'fail' );
            }
        } );
    },


        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function(callBackFunction)
    {
        var d = new Date();
        var json = {                
                            
	
            f_value1:'',                    
                            
	
            f_value2:'',                    
                            
	
            f_value3:'',                    
                            
	
            f_value4:'',                    
                            
	
            f_value5:'',                    
                            
	
            f_value6:'',                    
                            
	
            f_value7:'',                    
                            
	
            f_value8:'',                    
                            
	
            f_value9:'',                    
                            
	
            f_value10:'',                    
                            
            f_khbh:'',                    
                            
	
            f_khbhid:'',                    
                            
	
            f_khxx:'',                    
                            
            //f_khjsonid: controlObj.fileuploadernewfileid(),
            f_khjson:'',                  
                            
	
            fk_tbl_maintable_sys_id:'',                    
                            
            f_fj: controlObj.fileuploadernewfileid(),                  
                            
		
            f_bz:'',                   
             
           
            fk_tbl_ld_xhhbt_sys_id:that._pr_fk_tbl_ld_xhhbt_sys_id,   
 
            sys_delflag: '0',
            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatusername: basePageObj._userInfoJson.sys_username,
            sys_creatuserid: basePageObj._userInfoJson.sys_userid
            };

        var data = {
            json: JSON.stringify( json ),
            clientInf: _clientInf
        }
        doAjaxFunction( _serviceUrl, 'Add', data, {
            success: function ( result )
            {
                _gridStatusSelectid = result;
                bindGrid(false, {
                    success: function ()
                    {
                        bindDetailControl( {
                            success: function ()
                            {
                                callBackFunction.success();
                            }, fail: function ( message )
                            {
                                callBackFunction.fail( 'bindDetailControl:' + message );
                            }
                        } );

                    }, fail: function ()
                    {
                        callBackFunction.fail( 'bindGrid:' + message );
                    }
                } );


            }, fail: function ( message )
            {
                callBackFunction.fail( 'Add:' + message );
            }
        } );           
  
    },  
   
    //=============================控件事件===================================

     //=============================控件事件===================================
  
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
			 
            /* 
            *  
            *  方法:f_khjson_onchange
            *  参数:contents, $editable
            *  客户json onchange事件
            */
     //f_khjson_onchange = function (contents, e)
         //{
         //    var controlid = e.context.id;
         //},
         //f_khjson_file_onchange = function ()
         //{
         //    var fileid = controlObj.fileuploaderid('detail_f_khjson_file_tbl_ld_xhhbtzb_treelist');
         //    var serviceFileUrl = '//127.0.0.1/sara.dd.ldsw.file/service/fileupload/service_fileuploaddo.asmx/';
         //    var data = { fileid: fileid };
         //    doAjaxFunction(serviceFileUrl, 'getFileListByFileid', data, {
         //        success: function (result)
         //        {
         //            try
         //            {
         //                var messageJsonArray = (new Function("", "return " + result))();
         //                var html = '';
         //                $.each(messageJsonArray, function (i, u)
         //                {
         //                    var fileJson = messageJsonArray[i];
         //                    var nameArr = fileJson["fileuploadname"].split('.');
         //                    var fileextname = nameArr[nameArr.length - 1];
         //                    if (',jpg,jpeg,gif,png,bmp,'.indexOf((',' + fileextname + ',').toLowerCase()) > -1)
         //                    {
         //                        html += '<div class="div_imgtorich" fileuploadname="' + fileJson["fileuploadname"] + '" filerealname="' + fileJson["filerealname"] + '"   fileextname = "' + fileextname + '">';
         //                        html += fileJson["filerealname"];
         //                        html += '<img width="100" height="50" alt="' + fileJson["filerealname"] + '" src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileJson["fileuploadname"] + '"/>';
         //                        html += '</div>';
         //                    }
         //                    else
         //                    {
         //                        html += '<div class="div_filetorich" fileuploadname="' + fileJson["fileuploadname"] + '" filerealname="' + fileJson["filerealname"] + '"   fileextname = "' + fileextname + '" >';
         //                        html += '<a>' + fileJson["filerealname"] + '</a>';
         //                        html += '</div>';
         //                    }
         //                });
         //                var $resource = $('#detail_f_khjson_resource_tbl_ld_xhhbtzb_treelist');
         //                $resource.html(html);
         //                $resource.find('.div_imgtorich,.div_filetorich').on('click', function (e)
         //                {
         //                    var $div = $(e.target.parentElement);
         //                    var fileuploadname = $div.attr('fileuploadname');
         //                    var filerealname = $div.attr('filerealname');
         //                    var fileextname = $div.attr('fileextname');

     //                    switch (fileextname.toLowerCase())
        //                    {
        //                        case "png":
        //                        case "gif":
        //                        case "jpg":
        //                        case "jpeg":
        //                        case "bmp":
        //                            {
        //                                controlObj.richtext('detail_f_khjson_tbl_ld_xhhbtzb_treelist', '<br/><img src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '" style="position:static;max-width: 100%;"/>' + controlObj.richtext('detail_f_khjson_tbl_ld_xhhbtzb_treelist'));
        //                            }
        //                            break;
        //                        default:
        //                            {
        //                                controlObj.richtext('detail_f_khjson_tbl_ld_xhhbtzb_treelist', '<br/><a href = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '">' + filerealname + '</a>' + controlObj.richtext('detail_f_khjson_tbl_ld_xhhbtzb_treelist'));
        //                            }
        //                            break;


     //                });
       //            }
       //            catch (ex)
       //                _alertMessage.show('getFileListByFileid执行失败。', 'fail');
       //                _resultMessage.show('getFileListByFileid执行失败<br/>' + ex.message, 'fail');
       //            }
       //        },
       //        fail: function (message)
       //        {
       //            _alertMessage.show('getFileListByFileid执行失败。', 'fail');
       //            _resultMessage.show('getFileListByFileid执行失败<br/>' + message, 'fail');
       //        }
       //    });
       //},
    
          
    
            /* 
            *  
            *  方法:f_fj_onchange
            *  参数:
            *  附件 onchange事件
            */
            f_fj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_fj_tbl_ld_xhhbtzb_treelist' );
            },          
    
          
     

    end = function () { };

    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {


        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        //1：可编辑；2：只读
        _pr_listtype: '',
        //当前被选中的行的ID
        _pr_gridselectid: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,
        _pr_appcode: '',
        _pr_fk_tbl_ld_xhhbt_sys_id: '',  
        _pr_lclx: '',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function (callBackFunction)
        {
            try
            {
               
                        //初始化参数
                        initParameter( {
                            success: function ()
                            {
                                //计算页面高度                             
                                     _pageHeight = 300;

                                _ladda_btn_command_new = Ladda.create( 'btn_command_new_tbl_ld_xhhbtzb_treelist' );
                                _ladda_btn_command_delete = Ladda.create( 'btn_command_delete_tbl_ld_xhhbtzb_treelist' );
                                _ladda_btn_command_save = Ladda.create( 'btn_command_save_tbl_ld_xhhbtzb_treelist' );
                                _validateMessage_search = new validateMessage( 'btn_search_modal_search_tbl_ld_xhhbtzb_treelist' );
                                _validateMessage_detail = new validateMessage( 'btn_command_save_tbl_ld_xhhbtzb_treelist' );

                                creatWhereClause( {
                                    success: function ()
                                    {
                                        initGrid( {
                                            success: function ()
                                            {
                                                bindGrid( false,{
                                                    success: function ()
                                                    {
                                                        initBaseCode( {
                                                            success: function ()
                                                            {
                                                                initSearchControl( {
                                                                    success: function ()
                                                                    {
                                                                        setSearchModel( {
                                                                            success: function ()
                                                                            {


                                                                            }
                                                                        } );
                                                                    }
                                                                } );

                                                                initDetailControl( {
                                                                    success: function ()
                                                                    {
                                                                       switch ( that._pr_listtype )
                                                                        {
                                                                            case "1":
                                                                                setDetailDisable( false );
                                                                                setButtonDisable( false );
                                                                                break;
                                                                            case "2":
                                                                                setDetailDisable( true );
                                                                                setButtonDisable( true );
                                                                                break;
                                                                        }
                                                                        bindDetailControl( {
                                                                            success: function ()
                                                                            {
                                                                                callBackFunction.success();
                                                                            },
                                                                            fail: function ()
                                                                            {
                                                                                _blockMessage.show( 'bindDetailControl执行失败<br/>' + message, 'fail' );
                                                                            }
                                                                });
                                                                $('#div_container_tbl_ld_xhhbtzb_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4lc.html', null, function ()
                                                                {
                                                                    //switch (that._pr_lclx)
                                                                    //{
                                                                    //    case '1':
                                                                    //        tbl_ld_khb_list_Obj._pr_where = " f_cbbhid in (select sys_id from tbl_ld_cben where f_value1='1')";
                                                                    //        break;
                                                                    //    case '2':
                                                                    //        tbl_ld_khb_list_Obj._pr_where = " f_cbbhid in (select sys_id from tbl_ld_cben where f_value1='1')";
                                                                    //        break;
                                                                    //}
                                                                    tbl_ld_khb_list_Obj._pr_listtype = that._pr_listtype;
                                                                    //tbl_ld_khb_list_Obj._pr_f_value2 = _gridStatusSelectid;
                                                                    tbl_ld_khb_list_Obj._pr_f_value1 = 1;
                                                                    tbl_ld_khb_list_Obj.init({
                                                                        success: function ()
                                                                        {
                                                                            $('#div_container_tbl_ld_xhhbtzb_list').css('display', '');
                                                                            $('#div_loading_tbl_ld_xhhbtzb_list').css('display', 'none');
                                                                            _blockMessage.hidden();
                                                                        }
                                                                    });
                                                                        } );
                                                                    }
                                                                } );
                                                            }
                                                        } );
                                                    },
                                                    fail: function ( message )
                                                    {
                                                        _blockMessage.show( 'bindGrid执行失败<br/>' + message, 'fail' );
                                                    }
                                                } );
                                            }
                                        } );
                                    }
                                } );                       

                    },
                    fail: function ( message )
                    {
                        _blockMessage.show( message, 'fail' );
                    }
                } );
               
            }
            catch ( ex )
            {
                _blockMessage.show( '程序初始化失败。<br/>' + ex.message, 'fail' );
            }
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------新建按钮------------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:新建数据
        *  参数:
        *  
        */
        btn_command_new_onclick: function ()
        {
            _ladda_btn_command_new.start();
            addDetailData( {            
                success: function ()
                {
                    _ladda_btn_command_new.stop();

                }, fail: function ( message )
                {
                    _ladda_btn_command_new.stop();
                    _alertMessage.show( 'addDetailData执行失败', 'fail' );
                    _resultMessage.show( message );
                }
            } );
          
        },
       

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_command_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  简单查询时直接执行，高级查询时打开SearchModel
        */
        btn_command_search_onclick: function ()
        {
            try
            {
                switch ( that._pr_searchtype )
                {
                    case "1":
                        getSearchModel( {
                            success: function ()
                            {
                                creatWhereClause( {
                                    success: function ()
                                    {
                                        clearSearchModel();

                                        that._pr_gridpageindex = '1';
                                     
                                        bindGrid( true,{
                                            success: function ()
                                            {
                                                bindDetailControl( {
                                                    success: function ()
                                                    {

                                                    }, fail: function ( message )
                                                    {
                                                        _alertMessage.show( 'bindDetailControl执行失败', 'fail' );
                                                        _resultMessage.show( message );
                                                    }
                                                } );

                                            }, fail: function ()
                                            {
                                                _alertMessage.show( 'bindGrid执行失败', 'fail' );
                                                _resultMessage.show( message );
                                            }
                                        } );
                                    }
                                } );
                            },
                            fail: function ( message )
                            {
                                _alertMessage.show( '获取数据失败', 'fail' );
                                _resultMessage.show( message );
                            }
                        } );

                        break;
                    case "2":
                        that.btn_command_search_2_onclick();
                        break;
                }
            }
            catch ( ex )
            {
                _alertMessage.show( '查询失败<br/>' + ex.message, 'fail' );
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
            $( '#btn_command_search_tbl_ld_xhhbtzb_treelist' ).html( '简单查询' );
            $( '#txt_command_search_tbl_ld_xhhbtzb_treelist' ).removeAttr( 'disabled' );
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
            $( '#btn_command_search_tbl_ld_xhhbtzb_treelist' ).html( '高级查询' );
            $( '#txt_command_search_tbl_ld_xhhbtzb_treelist' ).attr( 'disabled', 'disabled' );

            $( '#div_search_modal_tbl_ld_xhhbtzb_treelist' ).modal( 'show' );
        },

        /* 
        *  
        *  方法:btn_search_modal_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“高级查询”按钮的事件
        */
        //btn_search_modal_search_onclick: function ()
        //{
        //    getSearchModel({
        //        success: function ()
        //        {
        //            checkSearchModel({
        //                success: function ()
        //                {
        //                    creatWhereClause({
        //                        success: function ()
        //                        {
        //                            clearSearchModel();
        //                            $('#div_search_modal_tbl_ld_xhhbtzb_treelist').modal('hide')
        //                            that._pr_gridpageindex = '1';
                                   
        //                            bindGrid(true, {
        //                                success: function ()
        //                                {
        //                                    bindDetailControl({
        //                                        success: function ()
        //                                        {

        //                                        }, fail: function (message)
        //                                        {
        //                                            _alertMessage.show('bindDetailControl执行失败', 'fail');
        //                                            _resultMessage.show(message);
        //                                        }
        //                                    });

        //                                }, fail: function ()
        //                                {
        //                                    _alertMessage.show('bindGrid执行失败', 'fail');
        //                                    _resultMessage.show(message);
        //                                }
        //                            });
        //                        }
        //                    });
        //                },
        //                fail: function (message)
        //                {
        //                    if (message == '')
        //                    {
        //                        _alertMessage.show('校验不通过', 'warning');
        //                    }
        //                    else
        //                    {
        //                        _alertMessage.show('校验失败', 'fail');
        //                        _resultMessage.show(message);
        //                    }

        //                }
        //            });
        //        },
        //        fail: function (message)
        //        {
        //            _alertMessage.show('获取数据失败', 'fail');
        //            _resultMessage.show(message);
        //        }
        //    });


        //},

        /* 
        *  
        *  方法:btn_search_modal_cancle_onclick
        *  参数:
        *  关闭高级查询窗体
        *  
        */
        //btn_search_modal_cancle_onclick: function ()
        //{
        //    _validateMessage_search.hidden();
        //    $('#div_search_modal_tbl_ld_xhhbtzb_treelist').modal('hide');

        //    that._pr_searchtype = '1';
        //    $('#btn_command_search_tbl_ld_xhhbtzb_treelist').html('简单查询');
        //    $('#txt_command_search_tbl_ld_xhhbtzb_treelist').removeAttr('disabled');

        //},


        //---------------------------------------------------------------------------------
        // ---------------------------------DetailModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_command_save_onclick
        *  参数:
        *  detailModel保存操作
        *  
        */
        btn_command_save_onclick: function ()
        {
            getDetailModel( {
                success: function ( tbl_ld_xhhbtzb_treelist )
                {
                    checkDetailModel( tbl_ld_xhhbtzb_treelist, {
                        success: function ( tbl_ld_xhhbtzb_treelist )
                        {
                            updateDetailData( tbl_ld_xhhbtzb_treelist, {
                                success: function ( tbl_ld_xhhbtzb_treelist )
                                {
                                    bindGrid( false,{
                                        success: function ()
                                        {
                                            _alertMessage.show( '保存成功', 'success','2000' );
                                        }, fail: function ( message )
                                        {
                                            _alertMessage.show( 'bindGrid失败', 'fail' );
                                            _resultMessage.show( message );
                                        }
                                    } );
                                },
                                fail: function ( message )
                                {
                                    _alertMessage.show( '数据更新失败', 'fail' );
                                    _resultMessage.show( message );
                                }
                            } );

                        },
                        fail: function ( message )
                        {
                            if ( message != '' )
                            {
                                _alertMessage.show( '校验失败', 'fail' );
                                _resultMessage.show( message );
                            }
                            else
                            {
                                _alertMessage.show( '校验未通过', 'warning' );
                            }
                        }
                    } );
                }, fail: function ( message )
                {
                    _alertMessage.show( '数据获取失败', 'warning' );
                    _resultMessage.show( message );
                }
            } );
        },

        /* 
        *  
        *  方法:btn_command_delete_onclick
        *  参数:
        *  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
        */
btn_command_delete_onclick: function ()
{

    if ( _gridStatusSelectid == '' )
    {
        _alertMessage.show( '请选择一条数据!', 'warning', 1000 );
    }
    else
    {
                
               
            {                
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>请确认删除当前选中数据</h3>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show( '删除确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_delete.start();

                        var whereClause = "sys_id in (\'" + _gridStatusSelectid.toString().replaceAll( "^", "\',\'" ) + "\')";

                        var data = {
                            clientInf: _clientInf,
                            whereString: whereClause
                        };

                        doAjaxFunction( _serviceUrl, 'Delete', data, {
                            success: function ( result )
                            {
                                var data = {
                                    clientInf: _clientInf,
                                    whereString: _whereClauseString
                                };
                                doAjaxFunction( _serviceUrl, 'GetCount', data, {
                                    success: function ( result )
                                    {
                                        //判断当前页面是否有记录
                                        var count = parseInt( result );
                                        if ( count < that._pr_gridpageindex * _pageSize )
                                        {
                                            that._pr_gridpageindex = Math.ceil( count / _pageSize );
                                        }
                                        if ( that._pr_gridpageindex == 0 )
                                        {
                                            that._pr_gridpageindex = 1;
                                        }                            
                                        bindGrid(true,  {
                                            success: function ()
                                            {
                                                bindDetailControl( {
                                                    success: function ()
                                                    {
                                                        _ladda_btn_command_delete.stop();
                                                    }, fail: function ( message )
                                                    {
                                                        _ladda_btn_command_delete.stop();
                                                        _alertMessage.show( 'bindDetailControl失败', 'fail' );
                                                        _resultMessage.show( message );
                                                    }
                                                } );

                                            }, fail: function ( message )
                                            {
                                                _ladda_btn_command_delete.stop();
                                                _alertMessage.show( 'bindGrid失败', 'fail' );
                                                _resultMessage.show( message );
                                            }
                                        } );

                                    },
                                    fail: function ( message )
                                    {
                                        _ladda_btn_command_delete.stop();
                                        _alertMessage.show( '数据删除完成，获取数据条数失败', 'fail' );
                                        _resultMessage.show( message );
                                    }
                                } );
                            },
                            fail: function ( message )
                            {
                                _ladda_btn_command_delete.stop();
                                _alertMessage.show( '数据删除失败', 'fail' );
                                _resultMessage.show( message );
                            }
                        } );
                    },
                    cancle: function ()
                    {

                    }
                } );
                }
            }
        },

        btn_command_opensearch_onclick: function ()
        {
         
            var khbh = controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist');
            tbl_ld_khb_list_Obj._pr_khbh = khbh;
            tbl_ld_khb_list_Obj._pr_f_value2 = _gridStatusSelectid;
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
            $('#div_search_modal_tbl_ld_xhhbtzb_detail').modal('show');
        },
        btn_search_modal_search_onclick: function (callBackFunction)
        {
            
            $('#div_search_modal_tbl_ld_xhhbtzb_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                switch (that._pr_lclx)
                {
                    case '1':
                        var czlx = "销户_大客户" + "_" + basePageObj._userInfoJson.sys_username;
                        break;
                    case '2':
                        var czlx = "报停_大客户" + "_" + basePageObj._userInfoJson.sys_username;
                        break;
                }
                var khbh = controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist');
                var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist');

                var clearKhbhString = khbh;

                //如果两个客户编号不相同   那么将第一个客户的f_value1和f_value2清空

                var json = {
                    sys_id: _gridStatusSelectid,

                    sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                    sys_lastedituserid: basePageObj._userInfoJson.sys_userid,

                };
                var data = {
                    khidString: idArray[0],
                    czlxString: czlx,
                    czidString: _gridStatusSelectid,
                    clientInf: _clientInf,
                    clearKhbhString: clearKhbhString,
                    json: JSON.stringify(json)
                };
                doAjaxFunction(_serviceUrl, 'GetKhJsonAndUpdate', data, {
                    success: function (message)
                    {
                        var messageJson = (new Function("", "return " + message))();
                        var khxx = (new Function("", "return " + messageJson["khxx"]))();
                        var yhxx = (new Function("", "return " + messageJson["yhxx"]))()
                        var sbxx = (new Function("", "return " + messageJson["sbxx"]))()
                        tbl_ld_xhhbtzb_treelist_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                        tbl_ld_xhhbtzb_treelist_Obj._khJson["khxx"] = khxx[0];
                        tbl_ld_xhhbtzb_treelist_Obj._khJson["yhxx"] = yhxx[0];
                        tbl_ld_xhhbtzb_treelist_Obj._khJson["sbxx"] = sbxx[0];
                              
                        //客户信息
                        controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist', khxx[0].f_khbh);
                        controlObj.text('detail_f_yhm_tbl_ld_xhhbtzb_treelist', khxx[0].f_yhm);
                        controlObj.text('detail_f_dz_tbl_ld_xhhbtzb_treelist', khxx[0].f_dz);
                        controlObj.text('detail_f_dh_tbl_ld_xhhbtzb_treelist', khxx[0].f_dh);
                        controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist', khxx[0].sys_id);
                    },
                    fail: function (message)
                    {
                        if (message != '')
                        {
                            _alertMessage.show('GetKhJsonAndUpdate执行失败', 'fail');
                            _resultMessage.show(message);
                        }
                        else
                        {
                            _alertMessage.show('GetKhJsonAndUpdate执行失败', 'warning');
                        }
                    }
                });
                //var data = {
                //    khidString: idArray[0],
                //    czlxString: czlx,
                //    czidString: _gridStatusSelectid,
                //    clientInf: _clientInf
                //};
                //doAjaxFunction(_serviceUrl_kh, 'GetKhxxJsonAndSetCzlx', data, {
                //    success: function (message)
                //    {
                //        var messageJson = (new Function("", "return " + message))();
                //        var khxx = (new Function("", "return " + messageJson["khxx"]))();
                //        var yhxx = (new Function("", "return " + messageJson["yhxx"]))()
                //        var sbxx = (new Function("", "return " + messageJson["sbxx"]))()
                //        tbl_ld_xhhbtzb_treelist_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                //        tbl_ld_xhhbtzb_treelist_Obj._khJson["khxx"] = khxx[0];
                //        tbl_ld_xhhbtzb_treelist_Obj._khJson["yhxx"] = yhxx[0];
                //        tbl_ld_xhhbtzb_treelist_Obj._khJson["sbxx"] = sbxx[0];
                //        var khbh = controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist');
                //        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist');
                //        //客户信息
                //        controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist', khxx[0].f_khbh);
                //        controlObj.text('detail_f_yhm_tbl_ld_xhhbtzb_treelist', khxx[0].f_yhm);
                //        controlObj.text('detail_f_dz_tbl_ld_xhhbtzb_treelist', khxx[0].f_dz);
                //        controlObj.text('detail_f_dh_tbl_ld_xhhbtzb_treelist', khxx[0].f_dh);
                //        controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist', khxx[0].sys_id);
                //        if (khbh == khxx[0].f_khbh)
                //        {
                //        }
                //        else
                //        {
                //            //如果两个客户编号不相同   那么将第一个客户的f_value1和f_value2清空
                //            var data = {
                //                khidString: khbhid,
                //                clientInf: _clientInf
                //            };
                //            doAjaxFunction(_serviceUrl_kh, 'ClearCzlx', data, {
                //                success: function (message)
                //                {
                //                },
                //                fail: function (message)
                //                {
                //                    _blockMessage.show('ClearCzlx执行失败<br/>' + message, 'fail');
                //                }
                //            });
                //        }
                //        //向数据库中插入四个字段---------------------------------------
                //        var columns = 'f_khbh^f_khbhid^f_khxx^f_khjson';
                //        var yhm = controlObj.text('detail_f_yhm_tbl_ld_xhhbtzb_treelist');
                //        var dz = controlObj.text('detail_f_dz_tbl_ld_xhhbtzb_treelist');
                //        var dh = controlObj.text('detail_f_dh_tbl_ld_xhhbtzb_treelist');
                //        var khxx = yhm + "," + dz + "," + dh;
                //        var khbh = controlObj.text('detail_f_khbh_tbl_ld_xhhbtzb_treelist');
                //        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_xhhbtzb_treelist');
                //        var json = {
                //            sys_id: _gridStatusSelectid,
                //            f_khbh: khbh,
                //            f_khbhid: khbhid,
                //            f_khjson: tbl_ld_xhhbtzb_treelist_Obj._khJson,
                //            f_khxx: khxx
                //        };
                //        var data = {
                //            columns: columns,
                //            clientInf: _clientInf,
                //            json: JSON.stringify(json),
                //        };
                //        doAjaxFunction(_serviceUrl, 'Update', data, {
                //            success: function (message)
                //            {
                //                //callbackFunction.success();
                //            },
                //            fail: function (message)
                //            {
                //                _alertMessage.show(message);
                //            }
                //        });
                //    },
                //    fail: function (message)
                //    {
                //        _blockMessage.show('GetKhxxJsonAndSetCzlx执行失败<br/>' + message, 'fail');
                //    }
                //});
            }
            else
            {
                _alertMessage.show('必须选择一条记录', 'fail');
            }
        },
        btn_search_modal_cancle_onclick: function ()
        {
            $('#div_search_modal_tbl_ld_xhhbtzb_detail').modal('hide')
        },
        end: function ()
        {
        }
    };
    return that;
} )();







