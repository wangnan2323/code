

var tbl_ld_jmb_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jmb.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '',
        _isPage = false,
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
                    $('#btn_command_search_tbl_ld_jmb_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_jmb_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_jmb_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_jmb_list').attr("disabled", true);
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
                $('#btn_command_delete_tbl_ld_jmb_list').addClass('hidden');
                $( '#btn_command_new_tbl_ld_jmb_list' ).addClass( 'hidden' ); 
            }
            else
            {
                $('#btn_command_delete_tbl_ld_jmb_list').removeClass('hidden');
                $( '#btn_command_new_tbl_ld_jmb_list' ).removeClass( 'hidden' ); 
            }
        }
        catch(ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }
        
    },

    /* 
    *  
    *  方法:transToDetailPage
    *  参数:id, pagetype
    *  跳页方法
    */
    transToDetailPage = function (id, pagetype)
    {
        tbl_ld_jmb_detail_Obj._pr_sys_id = id;
        tbl_ld_jmb_detail_Obj.bindPage({
            success: function ()
            {
                $('#div_content_part_tbl_ld_jmb_list').css('display', 'none');
                $('#div_content_part_tbl_ld_jmb_detail').css('display', '');
            }
        });
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            var codeService_0562 = _baseCodeHashMap.get('codeservice_0562');
            
            
            
            
            var codeService_0563 = _baseCodeHashMap.get('codeservice_0563');
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                        
            	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
			            controlObj.multidropdownlistinit('search_f_yy_tbl_ld_jmb_list', codeService_0562); 
		    	
											 
		    	
											 
		    	
						controlObj.datetimeinit('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom');     
			controlObj.datetimeinit('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto');     
			
			controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto', '1900-01-01 00:00:00'); 
		    	
			            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_jmb_list', codeService_0563); 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    

            //模态窗口
            $('#div_search_modal_tbl_ld_jmb_list').modal({
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
                        $("#txt_command_search_tbl_ld_jmb_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_jmb_list = that._pr_searchcontent.type2;

                        	
						           controlObj.text('search_f_value1_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value1);                          	
		                	
						           controlObj.text('search_f_value2_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value2);                          	
		                	
						           controlObj.text('search_f_value3_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value3);                          	
		                	
						           controlObj.text('search_f_value4_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value4);                          	
		                	
						           controlObj.text('search_f_value5_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value5);                          	
		                	
						           controlObj.text('search_f_value6_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value6);                          	
		                	
						           controlObj.text('search_f_value7_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value7);                          	
		                	
						           controlObj.text('search_f_value8_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value8);                          	
		                	
						           controlObj.text('search_f_value9_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value9);                          	
		                	
						           controlObj.text('search_f_value10_tbl_ld_jmb_list', tbl_ld_jmb_list.f_value10);                          	
		                	
						           controlObj.text('search_f_jmbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jmbh);                          	
		                	
						           controlObj.text('search_f_khbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_khbh);                          	
		                	
						           controlObj.text('search_f_khbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_khbhid);                          	
		                	
						           controlObj.text('search_f_jmje_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jmje);                          	
		                	
						          controlObj.multidropdownlistid('search_f_yy_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yyid);                          	
		                	
						           controlObj.text('search_f_czr_tbl_ld_jmb_list', tbl_ld_jmb_list.f_czr);                          	
		                	
						           controlObj.text('search_f_czrid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_czrid);                          	
		                	
						
			          controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom', tbl_ld_jmb_list.f_czsjfrom);
			          controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto', tbl_ld_jmb_list.f_czsjto);                          	
		                	
						          controlObj.multidropdownlistid('search_f_zt_tbl_ld_jmb_list', tbl_ld_jmb_list.f_ztid);                          	
		                	
						           controlObj.text('search_f_bz_tbl_ld_jmb_list', tbl_ld_jmb_list.f_bz);                          	
		                	
						           controlObj.text('search_f_jfbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jfbh);                          	
		                	
						           controlObj.text('search_f_jfid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jfid);                          	
		                	
						           controlObj.text('search_f_syqk_tbl_ld_jmb_list', tbl_ld_jmb_list.f_syqk);                          	
		                	
						           controlObj.text('search_f_lxtkhh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_lxtkhh);                          	
		                	
						           controlObj.text('search_f_yhbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yhbh);                          	
		                	
						           controlObj.text('search_f_yhbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yhbhid);                          	
		                	
						           controlObj.text('search_f_dy_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dy);                          	
		                	
						           controlObj.text('search_f_sc_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sc);                          	
		                	
						           controlObj.text('search_f_qy_tbl_ld_jmb_list', tbl_ld_jmb_list.f_qy);                          	
		                	
						           controlObj.text('search_f_pq_tbl_ld_jmb_list', tbl_ld_jmb_list.f_pq);                          	
		                	
						           controlObj.text('search_f_sbbh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sbbh);                          	
		                	
						           controlObj.text('search_f_sbbhid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sbbhid);                          	
		                	
						           controlObj.text('search_f_sblx_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sblx);                          	
		                	
						           controlObj.text('search_f_yslb_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yslb);

						           controlObj.text('search_f_sblxid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_sblxid);

						           controlObj.text('search_f_yslbid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yslbid);
		                	
						           controlObj.text('search_f_yhm_tbl_ld_jmb_list', tbl_ld_jmb_list.f_yhm);                          	
		                	
						           controlObj.text('search_f_jfm_tbl_ld_jmb_list', tbl_ld_jmb_list.f_jfm);                          	
		                	
						           controlObj.text('search_f_dz_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dz);                          	
		                	
						           controlObj.text('search_f_dh_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dh);                          	
		                	
						           controlObj.text('search_f_dyid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_dyid);                          	
		                	
						           controlObj.text('search_f_scid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_scid);                          	
		                	
						           controlObj.text('search_f_qyid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_qyid);                          	
		                	
						           controlObj.text('search_f_pqid_tbl_ld_jmb_list', tbl_ld_jmb_list.f_pqid);                          	
		                 
                
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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_jmb_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_jmb_list = new Object();
				    				
										 
					tbl_ld_jmb_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_jmbh = controlObj.text('search_f_jmbh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_khbhid = controlObj.text('search_f_khbhid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_jmje = controlObj.text('search_f_jmje_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_yyid = controlObj.multidropdownlistid('search_f_yy_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_czr = controlObj.text('search_f_czr_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_czrid = controlObj.text('search_f_czrid_tbl_ld_jmb_list'); 
				    				
								
					tbl_ld_jmb_list.f_czsjfrom = controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_jmb_list.f_czsjto = controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto'); //dateto + ' ' + timeto;                 
				    				
										 
					tbl_ld_jmb_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_bz = controlObj.text('search_f_bz_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_jfbh = controlObj.text('search_f_jfbh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_jfid = controlObj.text('search_f_jfid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_syqk = controlObj.text('search_f_syqk_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_lxtkhh = controlObj.text('search_f_lxtkhh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_dy = controlObj.text('search_f_dy_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_sc = controlObj.text('search_f_sc_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_qy = controlObj.text('search_f_qy_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_pq = controlObj.text('search_f_pq_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_sbbhid = controlObj.text('search_f_sbbhid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_sblx = controlObj.text('search_f_sblx_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_yslb = controlObj.text('search_f_yslb_tbl_ld_jmb_list');


					tbl_ld_jmb_list.f_sblxid = controlObj.text('search_f_sblxid_tbl_ld_jmb_list');


					tbl_ld_jmb_list.f_yslbid = controlObj.text('search_f_yslbid_tbl_ld_jmb_list');

				    				
										 
					tbl_ld_jmb_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_dz = controlObj.text('search_f_dz_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_dh = controlObj.text('search_f_dh_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_dyid = controlObj.text('search_f_dyid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_scid = controlObj.text('search_f_scid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_qyid = controlObj.text('search_f_qyid_tbl_ld_jmb_list'); 
				    				
										 
					tbl_ld_jmb_list.f_pqid = controlObj.text('search_f_pqid_tbl_ld_jmb_list'); 
				     
                    that._pr_searchcontent.type2 = tbl_ld_jmb_list;
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
            var tbl_ld_jmb_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

        

            		   
            if (tbl_ld_jmb_list.f_value1.length > 200)
            {			
                errorMessageHansMap.put('search_f_value1_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value2.length > 200)
            {			
                errorMessageHansMap.put('search_f_value2_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value3.length > 200)
            {			
                errorMessageHansMap.put('search_f_value3_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value4.length > 200)
            {			
                errorMessageHansMap.put('search_f_value4_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value5.length > 200)
            {			
                errorMessageHansMap.put('search_f_value5_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value6.length > 200)
            {			
                errorMessageHansMap.put('search_f_value6_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value7.length > 200)
            {			
                errorMessageHansMap.put('search_f_value7_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value8.length > 200)
            {			
                errorMessageHansMap.put('search_f_value8_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value9.length > 200)
            {			
                errorMessageHansMap.put('search_f_value9_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_value10.length > 200)
            {			
                errorMessageHansMap.put('search_f_value10_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_jmbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_jmbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_khbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_khbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_khbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_jmje.length > 200)
            {			
                errorMessageHansMap.put('search_f_jmje_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_yyid.length > 200)
            {			
                errorMessageHansMap.put('search_f_yy_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_czr.length > 200)
            {			
                errorMessageHansMap.put('search_f_czr_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_czrid.length > 200)
            {			
                errorMessageHansMap.put('search_f_czrid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_jmb_list.f_ztid.length > 200)
            {			
                errorMessageHansMap.put('search_f_zt_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_bz.length > 200)
            {			
                errorMessageHansMap.put('search_f_bz_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_jfbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_jfbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_jfid.length > 200)
            {			
                errorMessageHansMap.put('search_f_jfid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_syqk.length > 200)
            {			
                errorMessageHansMap.put('search_f_syqk_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_lxtkhh.length > 200)
            {			
                errorMessageHansMap.put('search_f_lxtkhh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_yhbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_yhbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_dy.length > 200)
            {			
                errorMessageHansMap.put('search_f_dy_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_sc.length > 200)
            {			
                errorMessageHansMap.put('search_f_sc_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_qy.length > 200)
            {			
                errorMessageHansMap.put('search_f_qy_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_pq.length > 200)
            {			
                errorMessageHansMap.put('search_f_pq_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_sbbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_sbbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_sbbhid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_sblx.length > 200)
            {			
                errorMessageHansMap.put('search_f_sblx_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_yslb.length > 200)
            {			
                errorMessageHansMap.put('search_f_yslb_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
            if (tbl_ld_jmb_list.f_sblxid.length > 200) {
                errorMessageHansMap.put('search_f_sblxid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_jmb_list.f_yslbid.length > 200) {
                errorMessageHansMap.put('search_f_yslbid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            		   
            if (tbl_ld_jmb_list.f_yhm.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhm_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_jfm.length > 200)
            {			
                errorMessageHansMap.put('search_f_jfm_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_dz.length > 200)
            {			
                errorMessageHansMap.put('search_f_dz_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_dh.length > 200)
            {			
                errorMessageHansMap.put('search_f_dh_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_dyid.length > 200)
            {			
                errorMessageHansMap.put('search_f_dyid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_scid.length > 200)
            {			
                errorMessageHansMap.put('search_f_scid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_qyid.length > 200)
            {			
                errorMessageHansMap.put('search_f_qyid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_jmb_list.f_pqid.length > 200)
            {			
                errorMessageHansMap.put('search_f_pqid_tbl_ld_jmb_list', '长度不能超过<a style="color:red">200</a>个字');
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
				controlObj.text('search_f_value1_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value1);                          	
					      
								
									that._pr_searchcontent.type2.f_value2 = '';
				controlObj.text('search_f_value2_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value2);                          	
					      
								
									that._pr_searchcontent.type2.f_value3 = '';
				controlObj.text('search_f_value3_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value3);                          	
					      
								
									that._pr_searchcontent.type2.f_value4 = '';
				controlObj.text('search_f_value4_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value4);                          	
					      
								
									that._pr_searchcontent.type2.f_value5 = '';
				controlObj.text('search_f_value5_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value5);                          	
					      
								
									that._pr_searchcontent.type2.f_value6 = '';
				controlObj.text('search_f_value6_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value6);                          	
					      
								
									that._pr_searchcontent.type2.f_value7 = '';
				controlObj.text('search_f_value7_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value7);                          	
					      
								
									that._pr_searchcontent.type2.f_value8 = '';
				controlObj.text('search_f_value8_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value8);                          	
					      
								
									that._pr_searchcontent.type2.f_value9 = '';
				controlObj.text('search_f_value9_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value9);                          	
					      
								
									that._pr_searchcontent.type2.f_value10 = '';
				controlObj.text('search_f_value10_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_value10);                          	
					      
								
									that._pr_searchcontent.type2.f_jmbh = '';
				controlObj.text('search_f_jmbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jmbh);                          	
					      
								
									that._pr_searchcontent.type2.f_khbh = '';
				controlObj.text('search_f_khbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_khbh);                          	
					      
								
									that._pr_searchcontent.type2.f_khbhid = '';
				controlObj.text('search_f_khbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_khbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_jmje = '';
				controlObj.text('search_f_jmje_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jmje);                          	
					      
								
									that._pr_searchcontent.type2.f_yyid = '';
				controlObj.multidropdownlistid('search_f_yy_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yyid);                          	
					      
								
									that._pr_searchcontent.type2.f_czr = '';
				controlObj.text('search_f_czr_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_czr);                          	
					      
								
									that._pr_searchcontent.type2.f_czrid = '';
				controlObj.text('search_f_czrid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_czrid);                          	
					      
								
									that._pr_searchcontent.type2.f_czsjfrom = ('1900-01-01 00:00:00');
				that._pr_searchcontent.type2.f_czsjto = ('1900-01-01 00:00:00');						
				controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_datefrom', 'search_f_czsj_tbl_ld_jmb_list_timefrom', that._pr_searchcontent.type2.f_czsjfrom);
				controlObj.datetime('search_f_czsj_tbl_ld_jmb_list_dateto', 'search_f_czsj_tbl_ld_jmb_list_timeto', that._pr_searchcontent.type2.f_czsjto);                          	
					      
								
									that._pr_searchcontent.type2.f_ztid = '';
				controlObj.multidropdownlistid('search_f_zt_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_ztid);                          	
					      
								
									that._pr_searchcontent.type2.f_bz = '';
				controlObj.text('search_f_bz_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_bz);                          	
					      
								
									that._pr_searchcontent.type2.f_jfbh = '';
				controlObj.text('search_f_jfbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jfbh);                          	
					      
								
									that._pr_searchcontent.type2.f_jfid = '';
				controlObj.text('search_f_jfid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jfid);                          	
					      
								
									that._pr_searchcontent.type2.f_syqk = '';
				controlObj.text('search_f_syqk_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_syqk);                          	
					      
								
									that._pr_searchcontent.type2.f_lxtkhh = '';
				controlObj.text('search_f_lxtkhh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_lxtkhh);                          	
					      
								
									that._pr_searchcontent.type2.f_yhbh = '';
				controlObj.text('search_f_yhbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yhbh);                          	
					      
								
									that._pr_searchcontent.type2.f_yhbhid = '';
				controlObj.text('search_f_yhbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yhbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_dy = '';
				controlObj.text('search_f_dy_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dy);                          	
					      
								
									that._pr_searchcontent.type2.f_sc = '';
				controlObj.text('search_f_sc_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sc);                          	
					      
								
									that._pr_searchcontent.type2.f_qy = '';
				controlObj.text('search_f_qy_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_qy);                          	
					      
								
									that._pr_searchcontent.type2.f_pq = '';
				controlObj.text('search_f_pq_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_pq);                          	
					      
								
									that._pr_searchcontent.type2.f_sbbh = '';
				controlObj.text('search_f_sbbh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sbbh);                          	
					      
								
									that._pr_searchcontent.type2.f_sbbhid = '';
				controlObj.text('search_f_sbbhid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sbbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_sblx = '';
				controlObj.text('search_f_sblx_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sblx);                          	
					      
								
									that._pr_searchcontent.type2.f_yslb = '';
									controlObj.text('search_f_yslb_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yslb);

									that._pr_searchcontent.type2.f_sblxid = '';
									controlObj.text('search_f_sblxid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_sblxid);


									that._pr_searchcontent.type2.f_yslbid = '';
									controlObj.text('search_f_yslbid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yslbid);
					      
								
									that._pr_searchcontent.type2.f_yhm = '';
				controlObj.text('search_f_yhm_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_yhm);                          	
					      
								
									that._pr_searchcontent.type2.f_jfm = '';
				controlObj.text('search_f_jfm_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_jfm);                          	
					      
								
									that._pr_searchcontent.type2.f_dz = '';
				controlObj.text('search_f_dz_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dz);                          	
					      
								
									that._pr_searchcontent.type2.f_dh = '';
				controlObj.text('search_f_dh_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dh);                          	
					      
								
									that._pr_searchcontent.type2.f_dyid = '';
				controlObj.text('search_f_dyid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_dyid);                          	
					      
								
									that._pr_searchcontent.type2.f_scid = '';
				controlObj.text('search_f_scid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_scid);                          	
					      
								
									that._pr_searchcontent.type2.f_qyid = '';
				controlObj.text('search_f_qyid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_qyid);                          	
					      
								
									that._pr_searchcontent.type2.f_pqid = '';
				controlObj.text('search_f_pqid_tbl_ld_jmb_list', that._pr_searchcontent.type2.f_pqid);                          	
					      
				 

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_jmb_list").val('');
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
                       
														 	    whereClause += " f_jmbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khbhid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jmje like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yy like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_czr like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_czrid like '%" + vv[i] + "%' or ";
						
													
								    whereClause += " to_char(f_czsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_zt like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bz like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jfbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jfid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_syqk like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dy like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sc like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_qy like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pq like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sbbhid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sblx like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yslb like '%" + vv[i] + "%' or ";

														 	    whereClause += " f_sblxid like '%" + vv[i] + "%' or ";

														 	    whereClause += " f_yslbid like '%" + vv[i] + "%' or ";

						
														 	    whereClause += " f_yhm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jfm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dz like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dyid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_scid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_qyid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pqid like '%" + vv[i] + "%' or ";
						 
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

                        var tbl_ld_jmb_list = that._pr_searchcontent.type2;
             
        
			 			
				        if (tbl_ld_jmb_list.f_jmbh.length > 0)
                        {
                            whereClause += " f_jmbh like '%" + tbl_ld_jmb_list.f_jmbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_jmb_list.f_khbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_khbhid.length > 0)
                        {
                            whereClause += " f_khbhid like '%" + tbl_ld_jmb_list.f_khbhid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_jmje.length > 0)
                        {
                            whereClause += " f_jmje like '%" + tbl_ld_jmb_list.f_jmje + "%' and ";
                        }	
		
						
					    if (tbl_ld_jmb_list.f_yyid.length > 0)
                        {
                            var elementArray = tbl_ld_jmb_list.f_yyid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_yyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }
		
			 			
				        if (tbl_ld_jmb_list.f_czr.length > 0)
                        {
                            whereClause += " f_czr like '%" + tbl_ld_jmb_list.f_czr + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_czrid.length > 0)
                        {
                            whereClause += " f_czrid like '%" + tbl_ld_jmb_list.f_czrid + "%' and ";
                        }	
		
				
			 	        if (tbl_ld_jmb_list.f_czsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_czsj >= to_date('" + tbl_ld_jmb_list.f_czsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

			            if (tbl_ld_jmb_list.f_czsjto != '1900-01-01 00:00:00')
                        {
			                whereClause += " f_czsj <= to_date('" + tbl_ld_jmb_list.f_czsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }
		
						
					    if (tbl_ld_jmb_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_jmb_list.f_ztid.split(',');
                            whereClause += '(';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    whereClause += ' ';
                                }
                                else
                                {
                                    whereClause += ' or ';
                                }
                                whereClause += "((','||f_ztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }
		
			 			
				        if (tbl_ld_jmb_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_jmb_list.f_bz + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_jfbh.length > 0)
                        {
                            whereClause += " f_jfbh like '%" + tbl_ld_jmb_list.f_jfbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_jfid.length > 0)
                        {
                            whereClause += " f_jfid like '%" + tbl_ld_jmb_list.f_jfid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_syqk.length > 0)
                        {
                            whereClause += " f_syqk like '%" + tbl_ld_jmb_list.f_syqk + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_lxtkhh.length > 0)
                        {
                            whereClause += " f_lxtkhh like '%" + tbl_ld_jmb_list.f_lxtkhh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_jmb_list.f_yhbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_yhbhid.length > 0)
                        {
                            whereClause += " f_yhbhid like '%" + tbl_ld_jmb_list.f_yhbhid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_dy.length > 0)
                        {
                            whereClause += " f_dy like '%" + tbl_ld_jmb_list.f_dy + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_sc.length > 0)
                        {
                            whereClause += " f_sc like '%" + tbl_ld_jmb_list.f_sc + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_qy.length > 0)
                        {
                            whereClause += " f_qy like '%" + tbl_ld_jmb_list.f_qy + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_pq.length > 0)
                        {
                            whereClause += " f_pq like '%" + tbl_ld_jmb_list.f_pq + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_jmb_list.f_sbbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_sbbhid.length > 0)
                        {
                            whereClause += " f_sbbhid like '%" + tbl_ld_jmb_list.f_sbbhid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_sblx.length > 0)
                        {
                            whereClause += " f_sblx like '%" + tbl_ld_jmb_list.f_sblx + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_yslb.length > 0)
                        {
                            whereClause += " f_yslb like '%" + tbl_ld_jmb_list.f_yslb + "%' and ";
				        }


				        if (tbl_ld_jmb_list.f_sblxid.length > 0) {
				            whereClause += " f_sblxid like '%" + tbl_ld_jmb_list.f_sblxid + "%' and ";
				        }


				        if (tbl_ld_jmb_list.f_yslbid.length > 0) {
				            whereClause += " f_yslbid like '%" + tbl_ld_jmb_list.f_yslbid + "%' and ";
				        }
		
			 			
				        if (tbl_ld_jmb_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_jmb_list.f_yhm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_jmb_list.f_jfm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_jmb_list.f_dz + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_dh.length > 0)
                        {
                            whereClause += " f_dh like '%" + tbl_ld_jmb_list.f_dh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid like '%" + tbl_ld_jmb_list.f_dyid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid like '%" + tbl_ld_jmb_list.f_scid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid like '%" + tbl_ld_jmb_list.f_qyid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_jmb_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid like '%" + tbl_ld_jmb_list.f_pqid + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_jmb_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_jmb_list').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_jmb_list .cc-badge-p').html(currentcount + '/' + allcount); 
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
            //根据页面情况设置Grid的高度
            var gridHeight = 0;
            if ($(window).width() < basePageObj._limSrceenWidth)
            {
                gridHeight = $(window).height() - 320;
                if (gridHeight < 950)
                {
                    gridHeight = 950;
                }
            }
            else
            {
                gridHeight = $(window).height() - 240;
            }

            $('#table_grid_tbl_ld_jmb_list').bootstrapTable({
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
                    field: 'f_jmbh',
                    title: '减免编号', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
				{
				      field: 'f_jmje',
				      title: '减免金额',
				      "class": '',
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
                     field: 'f_yslb',
                     title: '用水类别',
                     "class": '',
                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                     formatter: function (value, row, index) {
                         var resultStr = value;



                         return resultStr;
                     }
                 },
						{
						    field: 'f_yhbh',
						    title: '用户编号',
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
                               field: 'f_jfm',
                               title: '缴费名',
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
                     field: 'f_sblx',
                     title: '水表类型',
                     "class": '',
                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                     formatter: function (value, row, index) {
                         var resultStr = value;
                         return resultStr;
                     }
                 },


                {
                    field: 'f_khbhid',
                    title: '客户编号id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                        
                        
                                                
                                
							
                {
                    field: 'f_yy',
                    title: '原因', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_yyid',
                    title: '原因id', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_czr',
                    title: '操作人', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_czrid',
                    title: '操作人id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
                {
                   field: 'f_czsj', 
                   title: '操作时间', 
                   "class": '',                 
                   align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                   formatter: function (value, row, index)
                   {
                           
                            if(value == "")
                            {
                                value = "1900-01-01 00:00:00";
                            }
                            var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                            if (resultStr == '1900-01-01 00:00:00')
                            {
                                resultStr = "&nbsp;&nbsp;";
                            } 
                            
                        
                                                    
                            return resultStr;          
                     
                   }
                },
                                
							
                {
                    field: 'f_zt',
                    title: '状态', 
                    "class": '',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_ztid',
                    title: '状态id', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                                                
                        return resultStr; 
                    }
                },
                                
							
               
                                
							
                {
                    field: 'f_jfbh',
                    title: '缴费编号', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_jfid',
                    title: '缴费id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_syqk',
                    title: '使用情况', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_lxtkhh',
                    title: '老系统客户号', 
                    "class": 'hidden',    
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                
                                
							
                {
                    field: 'f_yhbhid',
                    title: '用户编号id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_dy',
                    title: '地域', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_sc',
                    title: '水厂', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_qy',
                    title: '区域', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_pq',
                    title: '片区', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                 
                                
							
                {
                    field: 'f_sbbhid',
                    title: '水表编号id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                   {
                       field: 'f_sblxid',
                       title: '水表类型id',
                       "class": 'hidden',
                       align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                       formatter: function (value, row, index) {
                           var resultStr = value;



                           return resultStr;
                       }
                   },


                {
                    field: 'f_yslbid',
                    title: '用水类别id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;



                        return resultStr;
                    }
                },
							
                      
							
                {
                    field: 'f_dz',
                    title: '地址', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                    {
                        field: 'f_bz',
                        title: '备注',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) {
                            var resultStr = value;

                            if (resultStr.length > 10) {
                                resultStr = resultStr.substr(0, 10) + '...';
                            }

                            return resultStr;
                        }
                    },
							
                {
                    field: 'f_dh',
                    title: '电话', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_dyid',
                    title: '地域id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_scid',
                    title: '水厂id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
                                
							
                {
                    field: 'f_qyid',
                    title: '区域id', 
                    "class": 'hidden',
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
                    field: 'f_pqid',
                    title: '片区id', 
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { 
                        var resultStr = value;
                        
                        
                                                
                        return resultStr; 
                    }
                },
        
                {
                    field: '', title: '操作',
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
                    var rows = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getData');
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
                            
			
	    f_jmbh:'',                    
                            
		f_khbh:'',                    
                            
			
	    f_khbhid:'',                    
                            
			
	    f_jmje:'0',                    
                            
		f_yyid:'',                  
                            
			
		f_czr: basePageObj._userInfoJson.sys_username,
                            
			
		f_czrid: basePageObj._userInfoJson.sys_userid,
                            
		f_czsj:d.Format('yyyy-MM-dd'),                  
                            
		f_ztid:'0',                  
                            
				
	    f_bz:'',                   
                            
			
	    f_jfbh:'',                    
                            
			
	    f_jfid:'',                    
                            
			
	    f_syqk:'',                    
                            
			
	    f_lxtkhh:'',                    
                            
			
	    f_yhbh:'',                    
                            
			
	    f_yhbhid:'',                    
                            
			
	    f_dy:'',                    
                            
			
	    f_dyid:'',                    
                            
			
	    f_sc:'',                    
                            
			
	    f_scid:'',                    
                            
			
	    f_qy:'',                    
                            
			
	    f_qyid:'',                    
                            
			
	    f_pq:'',                    
                            
			
	    f_pqid:'',                    
                            
			
	    f_yhm:'',                    
                            
			
	    f_jfm:'',                    
                            
			
	    f_dz:'',                    
                            
			
	    f_dh:'',                    
                            
			
	    f_sbbh:'',                    
                            
			
	    f_sbbhid:'',                    
                            
			
	    f_sblx:'',                    
                            
			
	    f_yslb:'',                    
             
	    f_sblxid: '',


	    f_yslbid: '',
		 
 
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
                callBackFunction.success(result);
             },
             fail: function ( message )
             {
                 callBackFunction.fail( 'Add:' + message );
             }
         } );
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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_jmb_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_jmb_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_jmb_list');
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

                                $('#div_content_part_tbl_ld_jmb_detail').load('../tbl_ld_jmb/tbl_ld_jmb_detail_part.html', null, function ()
                                {

                                    tbl_ld_jmb_detail_Obj._pr_pagetype = that._pr_listtype;
                                    tbl_ld_jmb_detail_Obj.init({
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
            //////;
            $('#table_grid_tbl_ld_jmb_list').bootstrapTable("showLoading");
            var whereClause = _whereClauseString;

    
            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jmbh^f_khbh^f_khbhid^f_jmje^f_yy^f_yyid^f_czr^f_czrid^f_czsj^f_zt^f_ztid^f_bz^f_jfbh^f_jfid^f_syqk^f_lxtkhh^f_yhbh^f_yhbhid^f_dy^f_sc^f_qy^f_pq^f_sbbh^f_sbbhid^f_sblx^f_yslb^f_sblxid^f_yslbid^f_yhm^f_jfm^f_dz^f_dh^f_dyid^f_scid^f_qyid^f_pqid^sys_id';
	  
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
                    $('#table_grid_tbl_ld_jmb_list').bootstrapTable("hideLoading");

                    $('#table_grid_tbl_ld_jmb_list').bootstrapTable("loadJson", messageJson);

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
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并打开DetailModel
        */
        btn_command_new_onclick: function ()
        {
           _ladda_btn_command_new.start();
           addDetailData( {          
               success: function (result)
                {
                    _ladda_btn_command_new.stop();
                    transToDetailPage(result, '1');

                }, fail: function ( message )
                {
                    _ladda_btn_command_new.stop();
                    _alertMessage.show( 'addDetailData执行失败', 'fail' );
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
            var allcount = that._pr_gridselectids.split('^').length;

            if (that._pr_gridselectids == '')
            {
                _alertMessage.show('至少选择一条数据!', 'warning', 1000);
            }
            else
            {
                var currentcount = $('#table_grid_tbl_ld_jmb_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_jmb_list').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_jmb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_jmb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_jmb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_jmb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_jmb_list').modal('show');
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
                                    $('#div_search_modal_tbl_ld_jmb_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_jmb_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_jmb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_jmb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_jmb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_jmb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_jmb_list').modal('show');
        },
        end:function()
        {
        }

    };
    return that;
})();





